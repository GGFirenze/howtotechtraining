# CrackVILT — Project Log

> Last updated: **12 July 2026**
> Maintained by: Giuliano Giannini

---

## TL;DR

CrackVILT is a **two-product brand**:

1. A 130-page practical guide on Virtual Instructor-Led Training (VILT), launched **2 June 2026** at £29, currently in a **30-day price test at £15**.
2. A **B2B services tier** launched **12 July 2026** offering three engagements aimed at teams that already deliver training: Strategy Call (£120), VILT Delivery Pack (£2,500 per workshop, 25-50 participants), and Train the Trainer (£3,000, two-day programme, up to 6 in-house trainers).

The strategic direction is shifting from _"sell the PDF as the primary product"_ to _"the PDF is credibility + entry; services are the primary revenue engine"_. That pivot is not yet reflected in the site's information architecture — the home page still leads with the PDF pricing card and treats services as a follow-on section. Restructure is gated on 2-3 weeks of services-inbound data.

Google Ads was **paused** in early July after the 14-day kill-criteria window closed with zero paid conversions on the £29 SKU. The price test at £15 also has not (yet) produced a paid conversion, and the launch bonus (30-min coaching call for first 50 buyers) has been **suspended for the duration of the test** to isolate the pricing variable.

The next 2-4 weeks are effectively a **product-market fit probe**: does the services tier draw B2B inbound from LinkedIn organic + the site? If yes, the site restructures around services and the guide moves to a supporting role. If no, the strategy pivots again toward a warmer channel (Sales Navigator outreach, targeted meta ads, or LinkedIn thought-leadership).

---

## Product

**What:** _Crack the secret to a successful VILT session_ — a 130-page guide on designing and delivering Virtual Instructor-Led Training that engages, retains, and lands. Written for engineers, dev advocates, technical trainers, customer success architects, and consultants who teach live.

**Author:** Giuliano Giannini. Trainer since 2014 across multiple industries (fashion, telecom, tech). Currently Senior Customer Success Architect.

**Site:** [crackvilt.com](https://crackvilt.com)

**Brand positioning:** _"Practitioner-written content on technical training, customer success, and product analytics."_

**Pricing — guide:**

- **£15** one-time, instant PDF download _(currently in a 30-day price test; original price £29)_
- VAT handled at checkout (Lemon Squeezy as Merchant of Record)
- Launch bonus (30-min coaching call for first 50 buyers) **suspended** during the price test to keep the variable clean; concept preserved for possible reintroduction post-test

**Pricing — services tier (launched 12 July 2026):**

| Tier               | Price  | Format                                                                                                  | Intake                                                               |
| ------------------ | ------ | ------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| Strategy Call      | £120   | 60-min video call + written recap within 48h                                                            | Direct Lemon Squeezy checkout (planned) / Cal.com fallback (current) |
| VILT Delivery Pack | £2,500 | 1 full-day virtual workshop, 25-50 participants, scoping + content adaptation + post-training resources | Cal.com "Intro call — services" (15 min free scoping)                |
| Train the Trainer  | £3,000 | 2-day live programme for up to 6 in-house trainers, follow-up call + shadowing + internal-use rights    | Cal.com "Intro call — services" (15 min free scoping)                |

The two higher tiers intentionally route to a free 15-minute intro call rather than direct checkout: no company wires £2,500-£3,000 without a scoping conversation, and direct checkout on custom-scoped engagements would create refund risk. The Strategy Call is small enough (£120) and standardised enough to justify direct checkout — but the Lemon Squeezy product for it does not yet exist. Until it does, the CTA falls back to the same Cal.com link.

**Brand palette:**

- Background: `#0A0E1A` (dark charcoal)
- Accent: `#22D3EE` (cyan)
- Gradient (wordmark): emerald → cyan
- Typography: Geist Sans (body) + Playfair Display (display/wordmark) + JetBrains Mono (technical)

---

## Stack

| Layer           | Choice                             | Rationale                                                     |
| --------------- | ---------------------------------- | ------------------------------------------------------------- |
| Framework       | Next.js 16 + React 19              | Latest stable, App Router, Turbopack                          |
| Styling         | Tailwind CSS v4                    | Industry standard, fast iteration                             |
| Hosting         | Vercel                             | Best Next.js DX, automatic CDN, preview deployments           |
| Database        | Supabase (Postgres)                | Free tier sufficient, RLS for security                        |
| Payments        | Lemon Squeezy                      | Merchant of Record handles VAT/sales tax globally             |
| Analytics       | Amplitude (browser + server)       | Identity stitching, session replay, server-side events        |
| Ad attribution  | Google Ads gtag.js (consent-gated) | GCLID capture for paid traffic optimization                   |
| DNS / domain    | Cloudflare (DNS only, NOT proxied) | Vercel + Cloudflare proxy = problems; DNS-only is recommended |
| Email aliases   | Cloudflare Email Routing           | Free, info@crackvilt.com → personal inbox                     |
| Booking         | Cal.com (free tier)                | Services intro calls + parked launch-bonus coaching-call slot |
| Email (planned) | Resend                             | Not yet activated; reserved for M5 if/when needed             |

---

## Build timeline

### Phase 1 — Foundation (M1-M2)

Bootstrapped Next.js 16 + Tailwind v4 + ESLint + Prettier + CI. Built landing page skeleton: hero, promise, what's inside, TOC preview, author bio, pricing card, FAQ, footer. Custom brand color tokens, Logo component, dark theme.

### Phase 2 — Backend & Payments (M3-M4)

Supabase schema with `purchases` and `webhook_events` tables, RLS deny-by-default. Lemon Squeezy webhook integration with HMAC-SHA256 verification, idempotency, server-side Amplitude event firing on order completion. Pricing CTA wired with device_id propagation for identity stitching.

### Phase 3 — Analytics (M8)

Amplitude browser SDK + Node SDK, typed event taxonomy, consent-gated client init, session replay plugin, engagement plugin. Server-side `Order Placed` event fires from webhook for fraud-resistant attribution.

### Phase 4 — Compliance (M9)

Cookie banner (custom React, replaced Iubenda after integration issues), Privacy Policy and Cookie Policy hosted natively on `/privacy` and `/cookies` (Iubenda subscription cancelled). Cookie preferences re-openable from footer. Email infrastructure: Cloudflare Email Routing (info@crackvilt.com), DMARC + SPF + DKIM records.

### Phase 5 — SEO & Brand polish

`robots.txt`, `sitemap.xml`, JSON-LD structured data (Book / Person / Organization / WebSite). Logo cleaned (Recraft.ai vector remake). Author headshot integrated. Favicon variants. Em-dash density reduced to avoid AI-generated content tells.

### Phase 6 — Paid acquisition (Google Ads, June 2026)

Performance Max campaign launched 2 June. Initial throttle phase recognised; global gtag.js installed 6 June (consent-gated, no conversion event firing yet). PMax recovered: CTR climbed from 1.27% to 2.17%, CPC dropped from 2.78 to 1.55 RON.

### Phase 7 — Launch bonus offer (7 June)

Bundle introduction: £29 guide + 30-min coaching call for first 50 buyers. Delivered via Cal.com booking, link sent in Lemon Squeezy post-purchase email. A/B test running on Amplitude G&S banner (Variant A: "Learn more" → `/#faq`, Variant B: "Claim my spot" → `/#pricing`).

### Phase 8 — Dead-click fixes and copy polish (mid-June to early July)

Amplitude flagged repeated dead clicks on hero and header anchor CTAs. Root cause: `next/link` treats a same-URL navigation as a no-op, so clicks that fired the analytics event produced no scroll or visible feedback and looked broken. Session replay confirmed the pattern (five `Get Guide Clicked` events in 16 seconds from a single device, only the first producing a scroll — all subsequent from paid ad traffic).

Fix: `smoothScrollToAnchor` helper with cyan pulse animation + `scroll-margin-top` respect + `history.pushState` for bookmarkability, wired into header, footer, hero, and TOC anchor links. Follow-on cleanup: FAQ email placeholder replaced, redundant `TocPreview` component removed, cursor states fixed for buttons under Tailwind v4's new default, em-dash density reduced further.

### Phase 9 — Price test at £15 (late June onward)

After Google Ads paused (see below) and volume stayed near zero at £29, dropped the price to £15 for a 30-day test. Launch bonus paragraph removed from the pricing card and the Lemon Squeezy product description to keep the pricing variable isolated. Snap-back plan: revert to £29 with the launch bonus reinstated if the £15 test does not produce a meaningful volume delta by day 30.

### Phase 10 — Services tier launch (12 July 2026)

Introduced three service tiers on the home page under a "Working with Giuliano" section between Pricing and FAQ:

- **Strategy Call** (£120) — 60-minute call with written recap
- **VILT Delivery Pack** (£2,500) — training outsourcing, 25-50 participants per session
- **Train the Trainer** (£3,000) — 2-day programme for up to 6 in-house trainers, positioned around **lifting CSAT and session effectiveness** (not "learn training from scratch")

Two new public env vars introduced:

- `NEXT_PUBLIC_CAL_URL` — set to `https://cal.com/giuliano-giannini/intro-call-services` (a dedicated Cal.com event: 15 min, free, buffer 30 min, booking form asks company + tier of interest + training challenge)
- `NEXT_PUBLIC_STRATEGY_CALL_CHECKOUT_URL` — not yet configured (Lemon Squeezy Strategy Call product not yet created; Strategy Call CTA falls back to Cal.com in the meantime)

Analytics taxonomy extended with `Services Clicked` (nav events) and `Service Tier Clicked` (with `tier` + `intake` properties covering `checkout` / `calendar` / `email` fallback states). JSON-LD graph gained three `schema.org/Service` entities with `Offer` prices, enabling rich-result eligibility and AI-overview surfacing at the tier level.

FAQ "Do you offer team licences?" rewritten to point to the new services section instead of the old "not yet, on the roadmap" placeholder.

Delivered via four PRs (#35 initial section, #36 copy review + cohort widening, #37 Train the Trainer CSAT repositioning, this one for the log). The multi-PR split reflects a real-time editorial iteration on the copy, not a technical constraint.

---

## Current state — what's live

- [x] Site live at [crackvilt.com](https://crackvilt.com)
- [x] Lemon Squeezy checkout active
- [x] Webhook → Supabase → Amplitude (purchase tracking)
- [x] Cookie banner + privacy + cookie policies (GDPR/UK PECR compliant)
- [x] Email (info@crackvilt.com via Cloudflare Email Routing)
- [x] Email auth records (DMARC, SPF, DKIM)
- [x] Amplitude analytics (client + server, consent-gated)
- [x] Google Ads global tag (consent-gated, GCLID capture)
- [x] SEO foundations (robots.txt, sitemap, JSON-LD, canonicals)
- [x] Brand assets (logo wordmark, square icon, favicon)
- [x] Author headshot on site
- [x] LinkedIn personal launch post published
- [x] LinkedIn Company Page setup
- [x] Cal.com booking system for coaching calls _(reused for services intro calls, dedicated event since 12 July)_
- [x] Business cards delivered and in use
- [x] Services tier live on home page (Strategy Call, Delivery Pack, Train the Trainer)
- [x] Cal.com "Intro call — services" event live (15 min, free, buffer 30 min)
- [x] `NEXT_PUBLIC_CAL_URL` set on Vercel (Production + Preview)
- [x] Amplitude events for services funnel wired (`Services Clicked`, `Service Tier Clicked` with tier + intake properties)
- [x] JSON-LD `Service` entities in home graph for rich results / AI overviews
- [x] Guide price test at £15 (30-day)
- [x] LinkedIn post #2 published (early July)

## Current state — open / pending

- [ ] Wait for services-inbound signal (2-3 weeks minimum from 12 July → target window ~2 August)
- [ ] LinkedIn post announcing services (draft prepared 12 July, to be published)
- [ ] Amplitude funnel dashboard for services (`Services Clicked` → `Service Tier Clicked` → Cal.com click/LS conversion, split by tier + intake) — build once data starts flowing
- [ ] Decide day-30 of price test: keep £15, revert £29, or restructure entirely around services
- [ ] Real testimonials (currently zero — friends-bought sales don't count for testimonials)
- [ ] Home restructure to promote services (deferred — data-gated, see roadmap)

## Deferred (not now, maybe later)

- **Thank-you page on crackvilt.com** with conversion event firing → wait until 10+ purchases/week to justify the LS redirect-config + dedicated page
- **Server-side Google Ads Conversion API via webhook** → requires Developer Token (1-3 days approval) + OAuth setup; defer until conversion volume justifies
- **Resend transactional email** (M5) → not needed yet; LS handles post-purchase email delivery
- **Custom download flow with watermarked PDFs** (M6) → defer; LS native download is sufficient
- **Custom success page** (M7) → see thank-you page above
- **Rate limiting + Sentry** (M10) → low priority at current traffic
- **E2E Playwright tests** (M11) → low priority for solo project at this stage

---

## Key strategic decisions (the WHYs)

**Why Lemon Squeezy not Stripe.** LS is Merchant of Record and handles VAT/sales tax globally, including reverse-charge for EU B2B. Saves ~10-20 hours/year of accounting overhead at the expense of LS taking ~5% on top of Stripe's 2.9%. For a low-volume digital product the math favours simplicity.

**Why £29.** Sits between "impulse buy" (<£20) and "considered purchase" (>£50). To revisit at day 30 with more data.

**Why launch bonus is a coaching call, not a discount.** Discount trains audience to wait for sales and erodes price floor. Bonus value-add (coaching) preserves price perception while differentiating against generic PDFs. Capped at first 50 buyers limits operational commitment to ~25 hours.

**Why custom cookie banner, not Iubenda.** Iubenda's banner had a UX bug (didn't close visually on Accept/Reject) that we couldn't reproduce-fix. Built a custom React component with localStorage + `useSyncExternalStore`. Iubenda subscription cancelled.

**Why dark mode brand.** Editorial / "literary" feel matches the "practitioner-written guide" positioning. Cyan→emerald gradient on the brand mark provides accent without breaking the dark palette.

**Why no global gtag.js initially.** Initial decision was to skip and use Amplitude alone for measurement. Reversed on 6 June after PMax entered throttle phase due to no conversion signal back to Google Ads. Global tag now installed (still consent-gated, no conversion event firing yet).

**Why CrackVILT positioning is broader than the first guide.** Tagline mentions "technical training, customer success, and product analytics" — leaves room for future publications and (eventually) advisory services without rebrand.

**Why hide price from CTA buttons.** After validation that the pricing card displays £29 prominently, repeating it on the Buy now button was visual redundancy. Removing it lowers friction at the hero CTA (visitors explore content before encountering price). Price stays visible on the pricing card itself.

**Why em-dash cleanup.** Em-dash density is a known AI-generated content tell in 2026. Reduced from ~80% to ~25% of contexts to make site copy read more human. Citation markers (`— From the introduction`) and SEO title separators (`Brand — Tagline`) deliberately preserved.

**Why CrackVILT is NOT linked as Experience on personal LinkedIn.** Listing it under personal Experience surfaced it above the day-job employer in profile rankings. Replaced with `Publications` entry + `Featured` post. Cleaner separation, no risk of HR/manager questions.

**Why introduce services now.** Two signals: (a) the "Do you offer team licences?" FAQ was one of the more-clicked FAQ items in Amplitude, suggesting real B2B intent behind the guide traffic, and (b) the £15 price test on the PDF has not produced meaningful volume, so the guide alone is unlikely to reach the revenue target that the long-term consultancy ambition requires. Adding a services tier lets the site capture the higher-intent visitors immediately rather than waiting on a PDF flywheel that may never spin up.

**Why the two higher tiers route to a Cal.com intro call, not direct checkout.** Delivery Pack (£2,500) and Train the Trainer (£3,000) are custom-scoped engagements. Direct checkout on custom work creates refund risk once scope is negotiated and asymmetries emerge. A 15-minute free intro call de-risks both sides: it filters serious leads, aligns scope, and produces a paper trail before an invoice goes out. The friction of "book a call" is a feature, not a bug, at this ticket size.

**Why the Strategy Call CTA can direct-checkout in principle but does not today.** The Strategy Call is small enough (£120) and standardised enough (60 min + 48h recap) that a buyer can safely wire it without a call. Building the Lemon Squeezy product is deferred deliberately: the first 2-3 Strategy Calls will be free via Cal.com, treated as customer discovery — they teach what buyers actually ask for and what the recap deliverable should look like. Only then is the LS product built with a receipt-embedded Cal.com booking link. Optimising the checkout for an offering that hasn't been proven is wasted effort.

**Why the Delivery Pack cohort is 25-50 per session, not "up to 20".** The initial bullet said "Up to 20 participants" — internally consistent with the guide's own "20-30 beats 100" chapter, but a hard 20-cap signalled a scope too small for typical corporate enablement cohorts (15-40 people) and priced out the mid-market buyer. Widening to 25-50 covers real B2B cohorts, and the paired bullet "Larger cohorts split across multiple sessions to keep engagement high" preserves the engagement-focused positioning of the guide _and_ converts >50-participant cohorts into multiple invoices rather than a hard no.

**Why "lift your team's CSAT and session effectiveness" replaced "design and deliver on its own" for Train the Trainer.** The old framing implied the trainees start from zero — not the actual buyer profile. T3 is sold to enablement leaders whose team already delivers training but wants measurably better outcomes. Naming the outcome (CSAT + effectiveness) is more sellable than promising a capability the team already has.

**Why the home page is NOT immediately restructured around services.** The temptation after launching the services section is to promote it to the top of the home page. That would be blind: the section is 30 minutes old at time of writing, zero data, zero booked calls. Restructuring the information architecture before knowing whether services actually pull inbound is premature optimisation. Decision gate: 2-3 weeks of Amplitude data + LinkedIn services post response → then decide.

**Why launch bonus was suspended during the £15 price test.** Two variables (price drop + bonus removal) at once is intentional: the launch bonus experiment ran for ~4 weeks with no attributable conversions and had operational overhead (coaching-call logistics for a hypothetical first 50 buyers who never materialised). Removing it during the price test isolates pricing as the sole variable. If £15 doesn't move volume, the bonus wasn't the missing ingredient at £29 either — the diagnosis is deeper (audience fit, channel, or product-market).

---

## Marketing channels — what's been tried

| Channel                                      | Status                                      | Outcome so far                                                                                   |
| -------------------------------------------- | ------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| LinkedIn personal launch post                | Post #1 (early June) + Post #2 (early July) | Generated site visits, no attributable sales. Cadence still below the 1-2/week target            |
| Google Ads Performance Max                   | **Paused** early July                       | 0 paid sales across the full 14-day evaluation window; kill criteria triggered                   |
| Amplitude G&S launch bonus banner (A/B test) | Concluded / **suspended**                   | No conversions on either arm during runtime; banner removed with launch bonus                    |
| Personal network (friends)                   | 2 sales at £29 in early June                | Validated checkout works mechanically; no signal on cold conversion                              |
| Business cards                               | Delivered, in use                           | Anecdotal handouts; too early for measurable lead attribution                                    |
| LinkedIn Company Page posts                  | 1 post                                      | Building follower base                                                                           |
| Email outreach to existing contacts          | Not yet attempted                           | Deferred pending services launch — outreach for services likely higher-leverage than for £15 PDF |
| Services tier on the site                    | Live 12 July 2026                           | Just launched; measurement window opens now                                                      |
| LinkedIn services post                       | Draft prepared 12 July                      | Not yet published                                                                                |

---

## Open experiments (running)

### Price test at £15 (guide)

- **Started**: late June 2026
- **Duration**: 30 days
- **Change**: price dropped from £29 to £15; launch bonus removed
- **Success criterion**: meaningful volume delta versus baseline (baseline: 2 friends-bought sales at £29 across ~4 weeks)
- **Snap-back plan**: revert to £29 with launch bonus if no volume signal by day 30
- **Confounding variable**: Google Ads paused during the test, so the £15 vs £29 A/B is not clean paid-side — the test measures organic + LinkedIn traffic response only

### Services tier — inbound signal probe

- **Started**: 12 July 2026
- **Duration**: 3-week measurement window (target review ~2 August 2026)
- **Channels feeding it**: LinkedIn organic (post pending), site organic, direct traffic from existing PDF buyers
- **Success signal (any of the following)**:
  - ≥3 Cal.com "Intro call — services" bookings
  - ≥1 completed intro call with expressed interest in Delivery Pack or Train the Trainer
  - ≥15 `Service Tier Clicked` events in Amplitude with `intake: calendar` (i.e. buyer engaged past the CTA)
- **If signal present**: proceed with home restructure (services above the fold, guide as supporting product)
- **If no signal**: pivot channel strategy toward warmer outbound (LinkedIn Sales Navigator, direct outreach to 20-30 target enablement leaders)

## Closed experiments

### Google Ads Performance Max

- **Ran**: 2 June → early July 2026
- **Geo**: UK + Ireland
- **Daily budget**: ~30 RON (~£5)
- **Outcome**: **paused after kill criteria triggered.** 0 paid conversions across the full evaluation window despite reasonable CTR (climbed 1.27% → 2.17%) and dropping CPC (2.78 → 1.55 RON). Diagnosis: cold PMax traffic to a £29 impulse PDF without trust signals (testimonials, warm audience) is structurally difficult; the click-to-conversion gap was too large to close at the volume budgeted
- **Learning captured for future campaigns**: warm audience first (LinkedIn organic + PDF buyers as retargeting seed), then paid. Search Ads on high-intent B2B keywords ("technical training consultancy UK", "VILT training delivery") is a more likely fit than PMax for the services tier

### Launch bonus banner A/B test (Amplitude G&S)

- **Ran**: 7 June to late June 2026
- **Result**: 0 attributable conversions on either variant during runtime, so the pricing card was more of a bottleneck than the banner variant. Bonus and banner both retired for the £15 price test

---

## Honest learnings so far

**What worked**

- Iterative architecture choices (each milestone shippable independently)
- Consent-gated tracking from day one (no GDPR retrofit)
- Bot detection in Amplitude (`66.249.x.x` Google crawler IPs were polluting bounce rate data — once filtered, real human bounce rate looks healthy)
- Dead-click diagnosis via Amplitude session replay → `smoothScrollToAnchor` fix produced measurable engagement lift on anchor CTAs
- Editorial iteration on services copy in-flight (three PRs #35/#36/#37 rewrote the tier positioning after each round of user review) — the multi-PR history is more valuable than a single "big" PR because git blame reads like a decision log
- Decision to defer Resend / thank-you page / Developer Token until volume justifies

**What didn't work / surprises**

- LinkedIn launch post was not a silver bullet (expected); organic content cadence is the real leverage and cadence never reached the 1-2/week target
- Initial AI-drafted LinkedIn post #2 fabricated content from a marketing tagline (caught and discarded before publishing — material for posts must come from real guide content)
- Google Ads throttle was an unfamiliar pattern; took bot-pollution diagnosis to understand the apparent "high bounce rate"
- Cold paid traffic to a £29 PDF without warm audience first is essentially impossible — Google Ads paused after full 14-day window with 0 paid sales
- The launch bonus (30-min coaching call for first 50 buyers) never had a chance to be tested at meaningful volume: no volume, no bonus claims, no signal on whether the bonus itself moved conversion
- **The £15 price test has not (as of 12 July) produced meaningful volume either.** Interim signal: the problem is not the price at £29-vs-£15 granularity, it's the channel / audience gap
- **Ops discipline miss.** PR #35 was merged before the copy-review commits (later PRs #36 and #37) landed on the branch. Production site briefly showed a version with copy the author had already asked to change. Guardrail added: agent to explicitly signal when a PR is ready-to-merge vs when new commits are in flight

**Unresolved / open**

- Is the £15 PDF a viable cold-conversion product, or is it structurally too narrow for anonymous traffic and requires warm-audience seeding (LinkedIn cadence, testimonials, network)?
- Will the services tier draw B2B inbound? Reviewing at ~2 August 2026 with 3 weeks of data
- Is "CrackVILT" too narrow as a brand if consulting expands beyond VILT? The FAQ, services copy, and JSON-LD all lean into a broader "technical training / customer success / consulting" positioning that outgrows the "VILT" acronym
- What does the eventual site information architecture look like — services-primary with guide as entry product, or guide-primary with services as expansion?

---

## Roadmap

### Next 14 days (from 12 July 2026)

- **Publish LinkedIn services post** (draft prepared 12 July)
- **Measure**: Amplitude services funnel (`Services Clicked` → `Service Tier Clicked` → Cal.com click), volume of `mailto:` clicks in the `intake: email` bucket, any Cal.com bookings
- Continue LinkedIn cadence, ideally 1-2 posts per week — one on services, one on guide content
- **Do NOT** create the Lemon Squeezy Strategy Call product yet — first 2-3 Strategy Calls run free via Cal.com as customer discovery

### 15-30 days (services-inbound review window closes ~2 August 2026)

- If ≥3 Cal.com bookings or comparable Amplitude signal → **restructure home page**: services section moves above the fold / above pricing, hero copy updated to reflect the two-product positioning, Strategy Call LS product created and direct-checkout enabled
- If no signal → pivot channel strategy: LinkedIn Sales Navigator outreach to 20-30 target enablement leaders (UK/EU mid-market SaaS with in-house training teams), evaluate targeted Meta or LinkedIn Ads to warm audience

### 30-60 days

- Second Google Ads campaign — **not** PMax this time, likely **Search Ads** on high-intent B2B keywords like "technical training consultancy UK", "VILT training delivery", "corporate training outsourcing". Search delivers warmer intent than PMax and matches the services buyer better than the £15-PDF buyer
- Real testimonials from 5-10 contacts (services delivery, not PDF sales — a single completed Delivery Pack testimonial is worth more than 30 PDF reviews)
- Consider whether "CrackVILT" needs a companion brand for consulting or whether the brand stretches naturally

### 60-90 days

- Repricing decision on the guide based on services traction (if services take off, guide can go back to £29 without pressure; if services don't take off, £15 or free lead-magnet becomes the plausible move)
- Second deliverable evaluation: extension chapter, newsletter, or a live in-person workshop tied to the Train the Trainer format

### 6-12 months

- Independent consulting operation branded under CrackVILT (or successor brand if the acronym doesn't stretch)
- Bilingual presence (LinkedIn organic in both Italian and English networks)
- Possible second product: book, cohort-based course, or a public "Train the Trainer" cohort programme (open registration, not just corporate B2B)

---

## Operational metadata

- **Version control**: GitHub `GGFirenze/howtotechtraining`
- **CI/CD**: GitHub Actions → Vercel automatic deploy on `main`
- **Monitoring**: Amplitude (analytics + funnel), Vercel Analytics (page perf), Google Ads dashboard (paid)
- **Domain**: `crackvilt.com` (Cloudflare DNS, DNS-only mode, no proxy)
- **Email**: `info@crackvilt.com` → forwards to personal inbox via Cloudflare Email Routing
- **Backup**: Git repository serves as code backup; Supabase has automatic point-in-time recovery on paid tier (currently free tier)
- **Booking**: Cal.com personal account
  - Original event: 30-min coaching call for launch bonus (now dormant during price test)
  - New event (12 July 2026): "Intro call — services" — 15 min free, buffer 30 min, booking form asks company + tier of interest + training challenge. URL: `https://cal.com/giuliano-giannini/intro-call-services`. Exposed to the site via `NEXT_PUBLIC_CAL_URL`

---

_This log is a snapshot in time. Update it after major changes in scope, pricing, or strategy. The git history of this file is the long-form changelog._
