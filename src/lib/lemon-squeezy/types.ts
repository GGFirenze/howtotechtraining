/**
 * Loose Lemon Squeezy webhook payload types.
 *
 * Intentionally NOT exhaustive: LS payloads are large and version their
 * shape independently from us. We type only the fields we actually read,
 * with `unknown` / `Record<string, unknown>` for the rest, and keep the
 * raw payload in the database for post-mortem.
 *
 * Reference: https://docs.lemonsqueezy.com/api/webhooks
 */

/**
 * Names of the Lemon Squeezy webhook events we currently handle.
 * Other event names received by the route are logged for idempotency
 * and otherwise no-op (200 OK so LS does not retry forever).
 */
export type LemonSqueezyKnownEventName = "order_created" | "order_refunded";

/** Catch-all union: known events plus any future name. */
export type LemonSqueezyEventName = LemonSqueezyKnownEventName | (string & {});

/** Custom data echoed back from the checkout (set via checkout[custom][...]). */
export type LemonSqueezyCustomData = {
  device_id?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
};

export type LemonSqueezyWebhookMeta = {
  event_name: LemonSqueezyEventName;
  test_mode?: boolean;
  /** Stable per-delivery identifier used as our idempotency key. */
  webhook_id?: string;
  /**
   * Custom data the checkout was initialised with. Lemon Squeezy echoes
   * the keys you set under `checkout[custom][...]` back here on the
   * webhook payload.
   */
  custom_data?: LemonSqueezyCustomData;
};

export type LemonSqueezyOrderAttributes = {
  store_id: number;
  customer_id: number;
  identifier: string;
  order_number: number;
  user_name: string;
  user_email: string;
  currency: string;
  /** Total in subunits (cents/pence). */
  total: number;
  status: "pending" | "paid" | "void" | "refunded";
  refunded: boolean;
  refunded_at: string | null;
  tax_country?: string | null;
  created_at: string;
  updated_at: string;
};

export type LemonSqueezyWebhookPayload = {
  meta: LemonSqueezyWebhookMeta;
  data: {
    type: string;
    id: string | number;
    attributes: LemonSqueezyOrderAttributes;
    relationships?: Record<string, unknown>;
  };
};
