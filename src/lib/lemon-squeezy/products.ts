import "server-only";

import type { ProductType } from "@/lib/supabase/types";

import type { LemonSqueezyOrderItem, LemonSqueezyWebhookPayload } from "./types";

/**
 * Resolved product info for a Lemon Squeezy order.
 *
 * `type` is the internal identifier used for analytics grouping and
 * revenue splits (persisted in `purchases.product_type`).
 * `displayName` is the human-readable name from the LS payload, kept
 * separate so UI / receipts can show the exact product string the
 * buyer purchased even if the mapping changes.
 */
export type ResolvedProduct = {
  type: ProductType;
  displayName: string;
};

const DISPLAY_NAME_FALLBACK: Record<ProductType, string> = {
  "crackvilt-guide": "CrackVILT — the guide",
  "strategy-call": "Strategy Call — 60 minutes",
  unknown: "Unknown product",
};

function trimmedOrNull(value: string | undefined): string | null {
  if (!value) return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function displayName(item: LemonSqueezyOrderItem | null | undefined, type: ProductType): string {
  const fromPayload = item?.product_name?.trim();
  return fromPayload && fromPayload.length > 0 ? fromPayload : DISPLAY_NAME_FALLBACK[type];
}

/**
 * Resolve a Lemon Squeezy order payload to our internal product type.
 *
 * Lookup path:
 *
 *   1. Extract `first_order_item.product_id` from the payload (numeric).
 *   2. Stringify it to compare cleanly with the env-var values, which
 *      are always strings. Loose `==` comparison across types is a
 *      foot-gun we prefer to make explicit.
 *   3. Compare against the two configured env vars in strictest-match
 *      order (Strategy Call first, then Guide).
 *   4. If neither matches and the Guide env var is unset, fall back to
 *      `crackvilt-guide` — this preserves the analytics reporting for
 *      every order that was made before this feature landed, when the
 *      only product live was the guide.
 *   5. Otherwise, tag `unknown` so the row lands in Supabase but is
 *      easy to find and re-label later.
 *
 * Never throws: LS payloads are versioned independently from us, so we
 * treat missing fields defensively and always return a valid product
 * type.
 */
export function resolveProductFromOrder(payload: LemonSqueezyWebhookPayload): ResolvedProduct {
  const item = payload.data?.attributes?.first_order_item ?? null;
  const rawId = item?.product_id;
  const productIdStr = rawId != null ? String(rawId) : null;

  const guideId = trimmedOrNull(process.env.LEMONSQUEEZY_GUIDE_PRODUCT_ID);
  const strategyCallId = trimmedOrNull(process.env.LEMONSQUEEZY_STRATEGY_CALL_PRODUCT_ID);

  if (strategyCallId && productIdStr === strategyCallId) {
    return { type: "strategy-call", displayName: displayName(item, "strategy-call") };
  }

  if (guideId && productIdStr === guideId) {
    return { type: "crackvilt-guide", displayName: displayName(item, "crackvilt-guide") };
  }

  // Backward compat: when the Guide env var is unset, assume every
  // order is the guide. This preserves the pre-feature analytics
  // behaviour if the migration is deployed before the env vars are
  // populated on Vercel.
  if (!guideId) {
    return { type: "crackvilt-guide", displayName: displayName(item, "crackvilt-guide") };
  }

  return { type: "unknown", displayName: displayName(item, "unknown") };
}
