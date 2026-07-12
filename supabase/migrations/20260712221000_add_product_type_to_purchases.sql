-- =============================================================================
-- CrackVILT — add product_type to purchases
-- =============================================================================
-- Introduces a `product_type` column on the purchases table so we can
-- distinguish between the PDF guide (crackvilt-guide) and consulting
-- services (strategy-call, and any future SKUs added on Lemon Squeezy).
--
-- The value is resolved server-side by the webhook handler from the
-- payload's first_order_item.product_id, mapped through two env vars:
--   - LEMONSQUEEZY_GUIDE_PRODUCT_ID
--   - LEMONSQUEEZY_STRATEGY_CALL_PRODUCT_ID
--
-- Column is left nullable so unmapped orders (unknown SKUs added on LS
-- before code deploy) still land in the table with product_type=null
-- for later cleanup, rather than being rejected at insert time.
--
-- Apply via Supabase dashboard SQL editor, or `supabase db push`.
-- =============================================================================

-- ---------------------------------------------------------------------------
-- Column
-- ---------------------------------------------------------------------------
alter table public.purchases
  add column if not exists product_type text;

-- ---------------------------------------------------------------------------
-- Backfill
-- Every purchase before this migration was the PDF guide (the only
-- product live at the time). Tag them explicitly rather than leaving
-- them null, so revenue-by-product queries return sensible totals for
-- historical data too.
-- ---------------------------------------------------------------------------
update public.purchases
  set product_type = 'crackvilt-guide'
  where product_type is null;

-- ---------------------------------------------------------------------------
-- Index
-- Small cardinality (2-3 distinct values in the medium term) but
-- important for reporting queries like:
--   select product_type, count(*), sum(amount_cents)
--   from purchases where status = 'paid' group by product_type;
-- ---------------------------------------------------------------------------
create index if not exists purchases_product_type_idx
  on public.purchases (product_type);
