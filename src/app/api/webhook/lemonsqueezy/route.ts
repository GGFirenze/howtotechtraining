import { NextResponse } from "next/server";

import { flushServerEvents, trackServerEvent } from "@/lib/analytics/server";
import type { LemonSqueezyOrderAttributes, LemonSqueezyWebhookPayload } from "@/lib/lemon-squeezy";
import { verifyLemonSqueezySignature } from "@/lib/lemon-squeezy/webhook";
import { getSupabaseAdmin } from "@/lib/supabase/server";

// We use Node's `crypto` for HMAC verification, so this route must run on
// the Node.js runtime (not Edge).
export const runtime = "nodejs";

// Webhooks are POST-only and inherently dynamic; never cache.
export const dynamic = "force-dynamic";

const PROVIDER = "lemonsqueezy";

/**
 * Lemon Squeezy webhook receiver.
 *
 * Flow:
 * 1. Read raw body and verify HMAC signature.
 * 2. Parse the payload, extract event_name + webhook_id.
 * 3. Insert into webhook_events for idempotency. Unique violation =
 *    LS retried a delivery we already processed → return 200 "duplicate".
 * 4. Dispatch on event_name (order_created / order_refunded). Other
 *    events are logged but otherwise no-op so LS does not retry forever.
 * 5. Mark the row as processed.
 * 6. Flush queued Amplitude events before returning so the short-lived
 *    serverless function does not get killed mid-flight.
 *
 * Configure in the LS dashboard: webhook URL =
 *   https://<your-domain>/api/webhook/lemonsqueezy
 * Subscribe at minimum to `order_created` and `order_refunded`.
 */
export async function POST(req: Request): Promise<Response> {
  const rawBody = await req.text();
  const signature = req.headers.get("x-signature");

  const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;
  if (!secret) {
    console.error("[lemonsqueezy webhook] LEMONSQUEEZY_WEBHOOK_SECRET not set");
    return NextResponse.json({ error: "Webhook not configured" }, { status: 500 });
  }

  if (!verifyLemonSqueezySignature({ rawBody, signature, secret })) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  let payload: LemonSqueezyWebhookPayload;
  try {
    payload = JSON.parse(rawBody) as LemonSqueezyWebhookPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const eventName = payload.meta?.event_name;
  // `webhook_id` is set by LS on every delivery and is the canonical
  // idempotency key. We accept the `x-event-id` header as a fallback in
  // case LS rotates conventions.
  const eventId = payload.meta?.webhook_id ?? req.headers.get("x-event-id") ?? null;

  if (!eventName || !eventId) {
    return NextResponse.json({ error: "Missing event metadata" }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();

  // Idempotency guard. If LS retries the same webhook delivery, the
  // unique (provider, event_id) constraint fires and we 200 OK.
  const { error: logError } = await supabase.from("webhook_events").insert({
    provider: PROVIDER,
    event_id: eventId,
    event_name: eventName,
    payload: payload as never,
  });

  if (logError) {
    if (logError.code === "23505") {
      return NextResponse.json({ status: "duplicate" }, { status: 200 });
    }
    console.error("[lemonsqueezy webhook] Failed to log event:", logError);
    return NextResponse.json({ error: "Failed to log event" }, { status: 500 });
  }

  try {
    switch (eventName) {
      case "order_created":
        await processOrderCreated(payload);
        break;
      case "order_refunded":
        await processOrderRefunded(payload);
        break;
      default:
        // Unknown / unsubscribed event: idempotency row is logged, no action.
        break;
    }

    await supabase
      .from("webhook_events")
      .update({ processed_at: new Date().toISOString() })
      .eq("provider", PROVIDER)
      .eq("event_id", eventId);

    // Flush queued Amplitude events before the function exits — serverless
    // environments don't keep background tasks alive after the response.
    await flushServerEvents();

    return NextResponse.json({ status: "ok" });
  } catch (err) {
    console.error("[lemonsqueezy webhook] Processing error:", err);
    // We do NOT update processed_at, leaving the event row in an
    // unprocessed state for visibility. A 5xx response also tells LS to
    // retry the delivery, which is the right behaviour on transient
    // failures.
    return NextResponse.json({ error: "Processing error" }, { status: 500 });
  }
}

/**
 * Persist a new order and emit `Order Placed` to Amplitude (server-side).
 *
 * We use insert-then-update-on-duplicate instead of Postgres ON CONFLICT
 * because the unique index on (provider, provider_order_id) is partial
 * (WHERE provider_order_id IS NOT NULL) and PostgREST's `onConflict`
 * helper does not currently support specifying the predicate. The two
 * round-trips happen only on the rare collision path.
 */
async function processOrderCreated(payload: LemonSqueezyWebhookPayload): Promise<void> {
  const supabase = getSupabaseAdmin();
  const order = payload.data;
  const attrs = order.attributes;

  const customData = payload.meta.custom_data ?? {};
  const status = mapLemonSqueezyStatus(attrs.status);

  const purchaseRow = {
    email: attrs.user_email,
    country: attrs.tax_country ?? null,
    amount_cents: attrs.total,
    currency: attrs.currency,
    provider: PROVIDER,
    provider_order_id: String(order.id),
    status,
    amplitude_device_id: customData.device_id ?? null,
    utm_source: customData.utm_source ?? null,
    utm_medium: customData.utm_medium ?? null,
    utm_campaign: customData.utm_campaign ?? null,
    raw_payload: payload as never,
  };

  const { error: insertError } = await supabase.from("purchases").insert(purchaseRow);

  if (insertError) {
    if (insertError.code === "23505") {
      // Row exists already (resend before idempotency caught it, or some
      // other race) — update the existing row with the latest payload.
      const { error: updateError } = await supabase
        .from("purchases")
        .update(purchaseRow)
        .eq("provider", PROVIDER)
        .eq("provider_order_id", String(order.id));
      if (updateError) throw updateError;
    } else {
      throw insertError;
    }
  }

  // Only emit `Order Placed` for paid orders — pending / void should not
  // count as conversions in Amplitude.
  if (status === "paid") {
    await trackServerEvent({
      eventType: "Order Placed",
      identity: {
        deviceId: customData.device_id,
        userId: attrs.user_email,
      },
      eventProperties: {
        revenue: attrs.total / 100,
        currency: attrs.currency,
        order_id: String(order.id),
        product: "crackvilt-guide",
        country: attrs.tax_country ?? undefined,
        provider: PROVIDER,
        utm_source: customData.utm_source,
        utm_medium: customData.utm_medium,
        utm_campaign: customData.utm_campaign,
      },
    });
  }
}

/**
 * Mark an existing purchase as refunded and emit `Order Refunded` with
 * negative revenue so Amplitude charts net the impact correctly.
 */
async function processOrderRefunded(payload: LemonSqueezyWebhookPayload): Promise<void> {
  const supabase = getSupabaseAdmin();
  const order = payload.data;
  const attrs = order.attributes;

  const { error: updateError } = await supabase
    .from("purchases")
    .update({
      status: "refunded",
      raw_payload: payload as never,
    })
    .eq("provider", PROVIDER)
    .eq("provider_order_id", String(order.id));

  if (updateError) throw updateError;

  await trackServerEvent({
    eventType: "Order Refunded",
    identity: {
      userId: attrs.user_email,
    },
    eventProperties: {
      revenue: -attrs.total / 100,
      currency: attrs.currency,
      order_id: String(order.id),
      product: "crackvilt-guide",
      provider: PROVIDER,
    },
  });
}

function mapLemonSqueezyStatus(
  status: LemonSqueezyOrderAttributes["status"],
): "pending" | "paid" | "refunded" | "failed" {
  switch (status) {
    case "paid":
      return "paid";
    case "refunded":
      return "refunded";
    case "void":
      return "failed";
    case "pending":
    default:
      return "pending";
  }
}
