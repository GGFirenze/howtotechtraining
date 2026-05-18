-- =============================================================================
-- CrackVILT — initial schema
-- =============================================================================
-- Phase 1 (MVP): persist every purchase received from the Lemon Squeezy
-- webhook, plus an idempotency log so retried webhook deliveries do not
-- create duplicates. Lemon Squeezy still hosts the PDF and emails the
-- buyer in this phase.
--
-- Phase 2 (custom delivery, conditional): the columns marked "(phase 2)"
-- become populated when we replace LS hosted delivery with our own
-- signed-URL flow. They are nullable now so adding phase 2 requires no
-- migration — only fresh writes.
--
-- Apply this migration via Supabase dashboard SQL editor, or via the
-- Supabase CLI: `supabase db push`.
-- =============================================================================


-- -----------------------------------------------------------------------------
-- purchases
-- One row per attempted/completed checkout. Created on `order_created`
-- webhook delivery, mutated by subsequent events (`order_refunded`, etc.).
-- -----------------------------------------------------------------------------
create table if not exists public.purchases (
  id                     uuid primary key default gen_random_uuid(),

  -- Buyer
  email                  text not null,
  country                text,                       -- ISO 3166-1 alpha-2

  -- Money
  amount_cents           integer not null check (amount_cents >= 0),
  currency               text not null,              -- ISO 4217 (e.g. 'GBP')

  -- Provider linkage
  provider               text not null default 'lemonsqueezy',
  provider_order_id      text,                       -- LS order id
  provider_session_id    text,                       -- LS checkout session id

  -- State machine
  status                 text not null default 'pending'
                         check (status in ('pending', 'paid', 'refunded', 'failed')),

  -- Analytics stitching: device_id captured at checkout-start so the
  -- server-side `Order Placed` event lands on the same anonymous timeline
  -- as the pre-purchase browser events. UTM properties captured similarly.
  amplitude_device_id    text,
  utm_source             text,
  utm_medium             text,
  utm_campaign           text,

  -- (phase 2) Custom download flow
  download_token         uuid,                       -- one-shot opaque token
  download_expires_at    timestamptz,                -- token TTL
  download_count         integer not null default 0,
  download_limit         integer not null default 5,

  -- Debugging: latest provider payload that touched this row. Useful for
  -- post-mortem on weird states without re-fetching from LS.
  raw_payload            jsonb,

  created_at             timestamptz not null default now(),
  updated_at             timestamptz not null default now()
);

-- Provider-side dedup: (provider, provider_order_id) must be unique when
-- the order id is present. Partial unique index supports the nullable case.
create unique index if not exists purchases_provider_order_uniq
  on public.purchases (provider, provider_order_id)
  where provider_order_id is not null;

create unique index if not exists purchases_provider_session_uniq
  on public.purchases (provider, provider_session_id)
  where provider_session_id is not null;

-- (phase 2) Download token must be globally unique when present.
create unique index if not exists purchases_download_token_uniq
  on public.purchases (download_token)
  where download_token is not null;

-- Lookup indexes
create index if not exists purchases_email_idx       on public.purchases (email);
create index if not exists purchases_status_idx      on public.purchases (status);
create index if not exists purchases_created_at_idx  on public.purchases (created_at desc);


-- -----------------------------------------------------------------------------
-- webhook_events
-- Idempotency log. Lemon Squeezy will retry failed webhook deliveries,
-- so before we process an event we insert into this table with a UNIQUE
-- constraint on (provider, event_id). A duplicate insert means we've
-- already processed this delivery and the handler can no-op.
-- -----------------------------------------------------------------------------
create table if not exists public.webhook_events (
  id            uuid primary key default gen_random_uuid(),
  provider      text not null,
  event_id      text not null,        -- LS x-event-id header value
  event_name    text not null,        -- e.g. 'order_created', 'order_refunded'
  received_at   timestamptz not null default now(),
  processed_at  timestamptz,          -- set when the handler completes successfully
  payload       jsonb,                -- raw provider payload, retained for debugging

  unique (provider, event_id)
);

create index if not exists webhook_events_received_at_idx
  on public.webhook_events (received_at desc);

create index if not exists webhook_events_event_name_idx
  on public.webhook_events (event_name);


-- -----------------------------------------------------------------------------
-- updated_at auto-touch
-- One generic trigger function reused across tables; here only purchases
-- uses it because webhook_events is append-only.
-- -----------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists purchases_set_updated_at on public.purchases;
create trigger purchases_set_updated_at
  before update on public.purchases
  for each row execute function public.set_updated_at();


-- -----------------------------------------------------------------------------
-- Row Level Security
-- Default deny for the anon role and the authenticated role. Application
-- code MUST use the service_role key (which bypasses RLS) from server-only
-- code paths to touch these tables. Any leakage of these tables to the
-- browser would be a security incident — RLS is the second line of defence.
-- -----------------------------------------------------------------------------
alter table public.purchases       enable row level security;
alter table public.webhook_events  enable row level security;

-- No policies are created intentionally: with RLS enabled and no policies,
-- every non-service-role query is denied. The service_role bypasses RLS by
-- design and operates with full access.
