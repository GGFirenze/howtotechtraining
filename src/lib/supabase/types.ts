/**
 * Hand-written Supabase types for the CrackVILT schema.
 *
 * Mirrors `supabase/migrations/20260518210000_initial_schema.sql`. Kept
 * hand-written for now because the schema is small enough that the
 * cognitive overhead of running `supabase gen types` per change is not
 * worth the precision gain. If the schema grows we should switch to
 * generated types.
 *
 * The shape follows the `Database<{ public: { Tables: { ... } } }>`
 * convention used by `@supabase/supabase-js`, so passing this type as
 * the generic parameter to `createClient<Database>()` gives the
 * client typed `.from('purchases')` access end-to-end.
 */

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type PurchaseStatus = "pending" | "paid" | "refunded" | "failed";

/**
 * Internal product identifier stored on each purchase row and echoed
 * into the server-side Amplitude `Order Placed` / `Order Refunded`
 * events. Values are string literals (not a database enum) so future
 * SKUs can be added without a migration; `unknown` is emitted when
 * the LS product ID cannot be mapped via the env-var lookup.
 */
export type ProductType = "crackvilt-guide" | "strategy-call" | "unknown";

export type PurchaseRow = {
  id: string;
  email: string;
  country: string | null;
  amount_cents: number;
  currency: string;
  provider: string;
  provider_order_id: string | null;
  provider_session_id: string | null;
  status: PurchaseStatus;
  /**
   * Which product was purchased. Null on rows written before the
   * migration that introduced the column, backfilled to
   * 'crackvilt-guide' where historically applicable.
   */
  product_type: ProductType | null;
  amplitude_device_id: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  /** Phase 2 — null until custom delivery flow is enabled. */
  download_token: string | null;
  /** Phase 2 — null until custom delivery flow is enabled. */
  download_expires_at: string | null;
  download_count: number;
  download_limit: number;
  raw_payload: Json | null;
  created_at: string;
  updated_at: string;
};

export type PurchaseInsert = {
  id?: string;
  email: string;
  country?: string | null;
  amount_cents: number;
  currency: string;
  provider?: string;
  provider_order_id?: string | null;
  provider_session_id?: string | null;
  status?: PurchaseStatus;
  product_type?: ProductType | null;
  amplitude_device_id?: string | null;
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  download_token?: string | null;
  download_expires_at?: string | null;
  download_count?: number;
  download_limit?: number;
  raw_payload?: Json | null;
  created_at?: string;
  updated_at?: string;
};

export type PurchaseUpdate = Partial<PurchaseInsert>;

export type WebhookEventRow = {
  id: string;
  provider: string;
  event_id: string;
  event_name: string;
  received_at: string;
  processed_at: string | null;
  payload: Json | null;
};

export type WebhookEventInsert = {
  id?: string;
  provider: string;
  event_id: string;
  event_name: string;
  received_at?: string;
  processed_at?: string | null;
  payload?: Json | null;
};

export type WebhookEventUpdate = Partial<WebhookEventInsert>;

export type Database = {
  public: {
    Tables: {
      purchases: {
        Row: PurchaseRow;
        Insert: PurchaseInsert;
        Update: PurchaseUpdate;
        Relationships: [];
      };
      webhook_events: {
        Row: WebhookEventRow;
        Insert: WebhookEventInsert;
        Update: WebhookEventUpdate;
        Relationships: [];
      };
    };
    Views: { [_ in never]: never };
    Functions: { [_ in never]: never };
    Enums: { [_ in never]: never };
    CompositeTypes: { [_ in never]: never };
  };
};
