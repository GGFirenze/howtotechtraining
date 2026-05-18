# CrackVILT

> Crack the secret to a successful VILT session.

Landing page + checkout + delivery for **"Crack the Secret to a Successful VILT Session"** by Giuliano Giannini — a paid digital guide on delivering effective technical training.

## Stack

- **Framework**: Next.js 16 (App Router) + React 19 + TypeScript (strict)
- **Styling**: Tailwind CSS v4
- **DB / Storage**: Supabase (Postgres + Storage with private bucket + signed URLs)
- **Payments**: Lemon Squeezy (Merchant of Record — handles VAT/sales tax globally)
- **Email**: Resend (transactional delivery + React Email templates)
- **Analytics**: Amplitude (typed events, client + server-side)
- **Hosting**: Vercel
- **CI**: GitHub Actions (lint, typecheck, build)

## Local development

Requires Node.js 22 (see `.nvmrc`) and pnpm 10.

```bash
pnpm install
cp .env.example .env.local   # fill in real values when integrating providers
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command             | Description                          |
| ------------------- | ------------------------------------ |
| `pnpm dev`          | Start Next.js dev server (Turbopack) |
| `pnpm build`        | Production build                     |
| `pnpm start`        | Run the production build             |
| `pnpm lint`         | Run ESLint                           |
| `pnpm typecheck`    | Run TypeScript in `--noEmit` mode    |
| `pnpm format`       | Format with Prettier                 |
| `pnpm format:check` | Verify formatting                    |

## Project structure

```
src/
  app/                # App Router pages, layouts, route handlers
    api/              # /api/* route handlers (checkout, webhook, download)
    layout.tsx
    page.tsx
  components/         # Shared UI components
  lib/                # Domain helpers (analytics, supabase, lemon-squeezy, email)
public/               # Static assets
supabase/             # Database migrations + seed data
  migrations/         # Versioned SQL migrations applied to the Postgres DB
```

## Database migrations

The Postgres schema lives in `supabase/migrations/*.sql` as versioned files.
Two ways to apply them to your Supabase project:

**Dashboard (simplest, recommended for occasional changes):**

1. Open the Supabase dashboard for your project.
2. SQL Editor → New query.
3. Paste the contents of the latest migration file.
4. Run.

**CLI (recommended once changes get frequent):**

```bash
# One-time: install Supabase CLI (https://supabase.com/docs/guides/cli)
brew install supabase/tap/supabase

# Link the local repo to your hosted project (asks for the project ref + DB password)
supabase link --project-ref <your-project-ref>

# Apply pending migrations
supabase db push
```

## Environment variables

See `.env.example` for the full list. None of these are required to run the dev server with the current scaffold; they will become required as we integrate Supabase, Lemon Squeezy, Resend, and Amplitude.

## Roadmap

The build is broken into independent milestones, each shipped as a separate PR:

- [x] **M1** — Bootstrap (Next.js + Tailwind + ESLint + Prettier + CI)
- [ ] **M2** — Landing skeleton (hero, sections, OG tags, deploy-ready)
- [ ] **M3** — Supabase schema + private storage bucket + RLS
- [ ] **M4** — Lemon Squeezy: checkout + webhook + idempotency
- [ ] **M5** — Resend transactional email + React Email templates
- [ ] **M6** — Download flow: signed URLs + token validation + PDF watermarking
- [ ] **M7** — Success page + resend endpoint + error pages
- [ ] **M8** — Analytics layer: typed events, identity stitching, consent-gated client SDK
- [ ] **M9** — Compliance: cookie banner, ToS, Privacy, Refund, withdrawal-of-rights checkbox
- [ ] **M10** — Hardening: rate limiting, Sentry, webhook health checks
- [ ] **M11** — Smoke E2E (Playwright) + green CI on main

## License

Proprietary — all rights reserved.
