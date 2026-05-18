/**
 * Public entry point for the Supabase module.
 *
 * Server-only client lives in ./server (protected by `import "server-only"`)
 * — types live in ./types and are safe to import from anywhere.
 */

export type {
  Database,
  Json,
  PurchaseInsert,
  PurchaseRow,
  PurchaseStatus,
  PurchaseUpdate,
  WebhookEventInsert,
  WebhookEventRow,
  WebhookEventUpdate,
} from "./types";
