# CrackVILT — Project Log

> Last updated: **1 September 2026**
> Maintained by: Giuliano Giannini

---

## TL;DR

CrackVILT is a **two-product brand**:

1. A 130-page practical guide on Virtual Instructor-Led Training (VILT), launched **2 June 2026** at £29, tested at £15 through July 2026, currently **£15** (status of the 30-day test outcome needs confirmation — see Information gaps below).
2. A **B2B services tier** launched **12 July 2026** and restructured **1 August 2026** to offer a single entry point: a **free 15-minute exploratory Cal.com call** for every service tier. Pricing is no longer displayed on the site and is discussed after scoping.

The strategic direction has shifted from _"sell the PDF as the primary product"_ to _"the PDF is a low-friction credibility marker; services are the revenue engine"_. The home page hero was updated on **1 August 2026** to reflect both products.

Google Ads was **paused in early July 2026** after the 14-day kill-criteria window closed with zero paid conversions on the £29 SKU. The launch bonus (30-min coaching call for first 50 buyers) has been **suspended** since the price test began. No paid advertising is currently active.

A **security incident** occurred on **1 August 2026**: phishing emails received from `zeexethicalar@gmail.com` with hidden links to suspicious third-party domains. An infrastructure audit confirmed the site, database, and accounts were not compromised.

As of the last documented update (**1 August 2026**), the services tier had generated **clicks but zero bookings or sales**. The price test at £15 had also not produced paid conversions. The next strategic review depends on outcomes from August 2026 that are not yet captured in this log (see Information gaps).

---

## Product

**What:** _Crack the secret to a successful VILT session_ — a 130-page guide on designing and delivering Virtual Instructor-Led Training that engages, retains, and lands. Written for engineers, dev advocates, technical trainers, customer success architects, and consultants who teach live.

**Author:** Giuliano Giannini. Trainer since 2014 across multiple industries (fashion, telecom, tech). Currently Senior Customer Success Architect.

**Site:** [crackvilt.com](https://crackvilt.com)

**Brand positioning:** _"Practitioner-written content on technical training, customer success, and product analytics."_

**Pricing — guide:**

- **£15** one-time, instant PDF download _(price test started late June 2026; original price £29; 30-day window closed late July 2026 — outcome not yet documented)_
- VAT handled at checkout (Lemon Squeezy as Merchant of Record)
- Launch bonus (30-min coaching call for first 50 buyers) **suspended** during the price test to keep the variable clean; concept preserved for possible reintroduction if the price test is deemed successful

**Pricing — services tier (as of 1 August 2026):**

No fixed prices are displayed on the site. Every service begins with a **free 15-minute exploratory Cal.com call**. Pricing is scoped after the conversation.

| Tier               | Entry point           | What is delivered                                                                                                                                  |
| ------------------ | --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Strategy Call      | Free exploratory call | 60-minute video call (Zoom/Meet) focused on one specific training problem; written recap with action items within 48 hours                         |
| VILT Delivery Pack | Free exploratory call | Training outsourcing: one virtual workshop up to a full day, 25-50 participants per session, scoping + content adaptation, post-training resources |
| Train the Trainer  | Free exploratory call | 2-day live programme for up to 6 in-house trainers, follow-up call, shadowing session, internal-use rights to CrackVILT playbook and templates     |

**Brand palette:**

- Background: `#0A0E1A` (dark charcoal)
- Accent: `#22D3EE` (cyan)
- Gradient (wordmark): emerald → cyan
- Typography: Geist Sans (body) + Playfair Display (display/wordmark) + JetBrains Mono (technical)

---

## Stack

| Layer           | Choice                             | Rationale                                                      |
| --------------- | ---------------------------------- | -------------------------------------------------------------- |
| Framework       | Next.js 16 + React 19              | Latest stable, App Router, Turbopack                           |
| Styling         | Tailwind CSS v4                    | Industry standard, fast iteration                              |
| Hosting         | Vercel                             | Best Next.js DX, automatic CDN, preview deployments            |
| Database        | Supabase (Postgres)                | Free tier sufficient, RLS for security                         |
| Payments        | Lemon Squeezy                      | Merchant of Record handles VAT/sales tax globally              |
| Analytics       | Amplitude (browser + server)       | Identity stitching, session replay, server-side events         |
| Ad attribution  | Google Ads gtag.js (consent-gated) | GCLID capture for paid traffic optimization (currently paused) |
| DNS / domain    | Cloudflare (DNS only, NOT proxied) | Vercel + Cloudflare proxy = problems; DNS-only is recommended  |
| Email aliases   | Cloudflare Email Routing           | Free, info@crackvilt.com → personal inbox                      |
| Booking         | Cal.com (free tier)                | Free exploratory calls for all service tiers                   |
| Email (planned) | Resend                             | Not yet activated; reserved for M5 if/when needed              |

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

`robots.txt`, `sitemap.xml`, JSON-LD structured data (Book / Person / Organization / WebSite). Logo cleaned (Recraft.ai vector remake). Author headshot integrated. Favicon variants. Em-dash density reduced in user-facing copy to avoid AI-generated content tells.

### Phase 6 — Paid acquisition (Google Ads, June 2026)

Performance Max campaign launched 2 June. Initial throttle phase recognised; global gtag.js installed 6 June (consent-gated, no conversion event firing). PMax recovered: CTR climbed from 1.27% to 2.17%, CPC dropped from 2.78 to 1.55 RON. **Paused in early July after 14-day kill criteria triggered with 0 paid conversions.**

### Phase 7 — Launch bonus offer (7 June)

Bundle introduction: £29 guide + 30-min coaching call for first 50 buyers. Delivered via Cal.com booking, link sent in Lemon Squeezy post-purchase email. A/B test running on Amplitude G&S banner (Variant A: "Learn more" → `/#faq`, Variant B: "Claim my spot" → `/#pricing`). Bonus and banner later suspended to isolate the price-test variable.

### Phase 8 — Dead-click fixes and copy polish (mid-June to early July)

Amplitude flagged repeated dead clicks on hero and header anchor CTAs. Root cause: `next/link` treats a same-URL navigation as a no-op, so clicks that fired the analytics event produced no scroll or visible feedback and looked broken. Session replay confirmed the pattern (five `Get Guide Clicked` events in 16 seconds from a single device, only the first producing a scroll — all subsequent from paid ad traffic).

Fix: `smoothScrollToAnchor` helper with cyan pulse animation + `scroll-margin-top` respect + `history.pushState` for bookmarkability, wired into header, footer, hero, and TOC anchor links. Follow-on cleanup: FAQ email placeholder replaced, redundant `TocPreview` component removed, cursor states fixed for buttons under Tailwind v4's new default, em-dash density reduced in visible strings.

### Phase 9 — Price test at £15 (late June to late July 2026)

After Google Ads paused and volume stayed near zero at £29, dropped the price to £15 for a 30-day test. Launch bonus paragraph removed from the pricing card and the Lemon Squeezy product description to keep the pricing variable isolated. **30-day window closed late July 2026; outcome not yet documented** (see Information gaps).

### Phase 10 — Services tier launch (12 July 2026)

Introduced three service tiers on the home page under a "Working with Giuliano" section between Pricing and FAQ:

- **Strategy Call** (£120) — 60-minute call with written recap
- **VILT Delivery Pack** (£2,500) — training outsourcing, 25-50 participants per session
- **Train the Trainer** (£3,000) — 2-day programme for up to 6 in-house trainers

Two new public env vars introduced:

- `NEXT_PUBLIC_CAL_URL` — set to a private Cal.com event slug (15 min, free, buffer 30 min, booking form asks company + tier of interest + training challenge). The exact URL is not documented here to avoid exposing it in a public repository; it is stored in Vercel env vars.
- `NEXT_PUBLIC_STRATEGY_CALL_CHECKOUT_URL` — configured briefly, then retired as the Strategy Call moved to a free exploratory call

Analytics taxonomy extended with `Services Clicked` (nav events) and `Service Tier Clicked` (with `tier` + `intake` properties). JSON-LD graph initially gained three `schema.org/Service` entities with fixed-price `Offer` blocks; these were later removed (see Phase 11).

FAQ "Do you offer team licences?" rewritten to point to the new services section instead of the old "not yet, on the roadmap" placeholder.

### Phase 11 — Free exploratory call pivot (1 August 2026)

After 2-3 weeks live, the services tier showed clicks but **zero bookings and zero sales**. Hypothesis: even a £120 Strategy Call or a 15-minute "intro call" for a £2,500-3,000 service was too much commitment from cold traffic.

Restructured every service tier to a single entry point: a **free 15-minute exploratory Cal.com call**. Changes:

- Removed all prices from the service cards
- Removed the Lemon Squeezy checkout fallback for the Strategy Call
- Every card CTA became "Book a free exploratory call"
- All CTAs route to the same Cal.com intro-call link
- Analytics `intake` values simplified to `calendar` / `email` only (removed `checkout`)
- Fixed-price `Offer` blocks removed from the three `schema.org/Service` entities in JSON-LD
- Updated the section intro to explain that every service starts with a free exploratory call and pricing is scoped afterwards

Delivered via PR #42.

### Phase 12 — Hero update and em dash cleanup (1 August 2026)

The hero was still entirely guide-focused (eyebrow said "The Technical Trainer's Playbook · 130 pages", subheadline only described the guide, trust line listed PDF-only benefits). Updated to reflect the two-product positioning:

- Eyebrow: `Guide + Services for Technical Trainers`
- Subheadline: mentions both the guide and "hands-on services and training outsourcing"
- Trust line: `Guide: £15 one-time · Services: free exploratory call`

Also replaced remaining em dashes in user-visible strings with regular hyphens across metadata, JSON-LD, FAQ, header/footer aria-labels, and analytics fallbacks. Code comments and Iubenda-generated legal pages were left untouched.

Delivered via PR #43.

### Phase 13 — Security incident: phishing emails (1 August 2026)

Received multiple emails from `zeexethicalar@gmail.com` claiming to have found security issues with the site. The emails contained hidden links pointing to suspicious third-party domains (`planningpod.com`, `lartweb.pl`, `atomate.com.au`, `capefoxx.com`). This is a classic scare-and-phish pattern.

Infrastructure audit confirmed:

- No compromise of the site, Vercel, GitHub, Supabase, or Lemon Squeezy accounts
- Webhook HMAC verification working; no unauthorized payloads processed
- Server-only env vars (`LEMONSQUEEZY_WEBHOOK_SECRET`, `SUPABASE_SERVICE_ROLE_KEY`, etc.) not exposed to the browser
- DMARC/SPF/DKIM records in place on Cloudflare for `info@crackvilt.com`

Action taken: emails reported as spam/phishing; no links clicked; no credentials shared.

---

## Current state — what's live

- [x] Site live at [crackvilt.com](https://crackvilt.com)
- [x] Lemon Squeezy checkout active for the £15 guide
- [x] Webhook → Supabase → Amplitude (purchase tracking) with `product_type` resolution for guide vs Strategy Call
- [x] Cookie banner + privacy + cookie policies (GDPR/UK PECR compliant)
- [x] Email (info@crackvilt.com via Cloudflare Email Routing)
- [x] Email auth records (DMARC, SPF, DKIM)
- [x] Amplitude analytics (client + server, consent-gated)
- [x] Google Ads global tag (consent-gated, GCLID capture) — **campaign paused**
- [x] SEO foundations (robots.txt, sitemap, JSON-LD, canonicals)
- [x] Brand assets (logo wordmark, square icon, favicon)
- [x] Author headshot on site
- [x] LinkedIn personal launch post published
- [x] LinkedIn Company Page setup
- [x] Cal.com "Intro call — services" event live (15 min, free, buffer 30 min)
- [x] Services tier live on home page with free exploratory call entry point for all tiers
- [x] Hero updated to reflect both guide and services
- [x] Amplitude events for services funnel wired (`Services Clicked`, `Service Tier Clicked` with tier + intake properties)
- [x] JSON-LD `Service` entities in home graph (no fixed prices)
- [x] Business cards delivered and in use

## Current state — open / pending

- [ ] Confirm outcome of the £15 price test (ended late July 2026): keep £15, revert to £29, or restructure?
- [ ] Confirm services-inbound signal from August 2026: any Cal.com bookings, completed exploratory calls, or interest in Delivery Pack / Train the Trainer?
- [ ] Publish LinkedIn services post (draft was prepared 1 August 2026)
- [ ] Build Amplitude funnel dashboard for services if/when meaningful data exists
- [ ] Real testimonials (currently zero — friends-bought sales don't count for testimonials)
- [ ] Decide whether to restructure the home page further (services above the fold, guide as supporting product)
- [ ] Consider a contact form to reduce spam exposure of `info@crackvilt.com`

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

**Why £15 price test.** The £29 price point produced zero paid conversions from cold traffic. Dropping to £15 was a 30-day experiment to test whether the price was the bottleneck or whether the problem was channel/audience fit. The test window closed late July 2026; outcome pending.

**Why launch bonus is a coaching call, not a discount.** Discount trains audience to wait for sales and erodes price floor. Bonus value-add (coaching) preserves price perception while differentiating against generic PDFs. Capped at first 50 buyers limits operational commitment to ~25 hours. Suspended during the £15 price test to isolate the pricing variable.

**Why custom cookie banner, not Iubenda.** Iubenda's banner had a UX bug (didn't close visually on Accept/Reject) that we couldn't reproduce-fix. Built a custom React component with localStorage + `useSyncExternalStore`. Iubenda subscription cancelled.

**Why dark mode brand.** Editorial / "literary" feel matches the "practitioner-written guide" positioning. Cyan→emerald gradient on the brand mark provides accent without breaking the dark palette.

**Why no global gtag.js initially.** Initial decision was to skip and use Amplitude alone for measurement. Reversed on 6 June after PMax entered throttle phase due to no conversion signal back to Google Ads. Global tag now installed (still consent-gated, no conversion event firing yet). Campaign paused in early July after zero paid conversions.

**Why CrackVILT positioning is broader than the first guide.** Tagline mentions "technical training, customer success, and product analytics" — leaves room for future publications and advisory services without rebrand.

**Why hide price from CTA buttons.** After validation that the pricing card displays the price prominently, repeating it on the button is visual redundancy. Removing it lowers friction; price stays visible on the card itself.

**Why em-dash cleanup in user-facing strings.** Em-dash density is a known AI-generated content tell. Replaced em dashes with regular hyphens in visible copy, metadata, and JSON-LD. Code comments and Iubenda-generated legal text were left untouched.

**Why CrackVILT is NOT linked as Experience on personal LinkedIn.** Listing it under personal Experience surfaced it above the day-job employer in profile rankings. Replaced with `Publications` entry + `Featured` post. Cleaner separation, no risk of HR/manager questions.

**Why introduce services now.** Two signals: (a) the "Do you offer team licences?" FAQ was one of the more-clicked FAQ items in Amplitude, suggesting real B2B intent behind the guide traffic, and (b) the PDF alone was not producing meaningful volume. Adding a services tier captures higher-intent visitors immediately rather than waiting on a PDF flywheel that may never spin up.

**Why the two higher tiers originally routed to a Cal.com intro call, not direct checkout.** Delivery Pack (£2,500) and Train the Trainer (£3,000) are custom-scoped engagements. Direct checkout on custom work creates refund risk once scope is negotiated. A free exploratory call de-risks both sides and filters serious leads.

**Why all services became free exploratory calls.** After 2-3 weeks live, the services tier showed clicks but zero bookings or sales. The hypothesis was that even a £120 Strategy Call or a 15-minute intro call required too much commitment from cold traffic. Removing every price and making every tier a free call lowers the barrier to the first conversation.

**Why the Delivery Pack cohort is 25-50 per session.** A hard "up to 20" cap signalled a scope too small for typical corporate enablement cohorts (15-40 people). Widening to 25-50 covers real B2B cohorts while the paired bullet "Larger cohorts split across multiple sessions" preserves the engagement-focused positioning and converts larger cohorts into multiple invoices rather than a hard no.

**Why "lift your team's CSAT and session effectiveness" for Train the Trainer.** The old framing "design and deliver on its own" implied the trainees start from zero — not the actual buyer profile. T3 is sold to enablement leaders whose team already delivers training but wants measurably better outcomes. Naming the outcome is more sellable than promising a capability the team already has.

**Why the home page was restructured only partially.** The hero was updated to reflect both products, but the full information architecture (services above the fold, guide as supporting product) was deferred until services produce inbound signal. Restructuring before knowing whether services pull inbound is premature optimisation.

**Why launch bonus was suspended during the £15 price test.** The bonus experiment had no attributable conversions over ~4 weeks and created operational overhead. Removing it during the price test isolates pricing as the sole variable. If £15 doesn't move volume, the bonus wasn't the missing ingredient at £29 either.

---

## Marketing channels — what's been tried

| Channel                                      | Status                                      | Outcome so far                                                                                   |
| -------------------------------------------- | ------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| LinkedIn personal launch post                | Post #1 (early June) + Post #2 (early July) | Generated site visits, no attributable sales. Cadence still below the 1-2/week target            |
| Google Ads Performance Max                   | **Paused** early July 2026                  | 0 paid sales across the full 14-day evaluation window; kill criteria triggered                   |
| Amplitude G&S launch bonus banner (A/B test) | Concluded / **suspended**                   | No conversions on either arm during runtime; banner removed with launch bonus                    |
| Personal network (friends)                   | 2 sales at £29 in early June 2026           | Validated checkout works mechanically; no signal on cold conversion                              |
| Business cards                               | Delivered, in use                           | Anecdotal handouts; too early for measurable lead attribution                                    |
| LinkedIn Company Page posts                  | 1 post                                      | Building follower base                                                                           |
| Email outreach to existing contacts          | Not yet attempted                           | Deferred pending services launch — outreach for services likely higher-leverage than for £15 PDF |
| Services tier on the site                    | Live 1 August 2026 (free call model)        | Clicks observed; zero bookings/sales as of last documented review (1 August 2026)                |
| LinkedIn services post                       | Draft prepared 1 August 2026                | Not yet published as of last update                                                              |
| Phishing/scam emails                         | Incident 1 August 2026                      | No compromise; emails reported as spam                                                           |

---

## Open experiments (running or awaiting review)

### Price test at £15 (guide)

- **Started**: late June 2026
- **Duration**: 30 days (window closed late July 2026)
- **Change**: price dropped from £29 to £15; launch bonus removed
- **Status**: **awaiting outcome confirmation**
- **Possible decisions**: keep £15, revert to £29 with bonus reinstated, or make the guide free as a lead magnet if services traction is strong
- **Confounding variable**: Google Ads paused during the test, so the £15 vs £29 comparison measures organic + LinkedIn traffic only

### Services tier — inbound signal probe

- **Started**: 12 July 2026
- **Initial model**: fixed prices (£120 / £2,500 / £3,000)
- **Pivot**: 1 August 2026 → free exploratory call for all tiers
- **Status**: **awaiting outcome confirmation** (any bookings in August 2026?)
- **Success signal**: any Cal.com booking, completed exploratory call, or expressed interest in Delivery Pack / Train the Trainer
- **If signal present**: proceed with home restructure (services above the fold, guide as supporting product)
- **If no signal**: pivot channel strategy toward warmer outbound (LinkedIn Sales Navigator, direct outreach to 20-30 target enablement leaders)

---

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
- Editorial iteration on services copy in-flight (multiple PRs rewrote the tier positioning after each round of user review) — the multi-PR history is more valuable than a single "big" PR because git blame reads like a decision log
- Rapid pivot to free exploratory calls when the data showed clicks but no bookings — low ego, data-driven
- Security awareness: the phishing incident was correctly identified and handled without clicking links or sharing credentials
- Decision to defer Resend / thank-you page / Developer Token until volume justifies

**What didn't work / surprises**

- LinkedIn launch post was not a silver bullet (expected); organic content cadence is the real leverage and cadence never reached the 1-2/week target
- Initial AI-drafted LinkedIn post #2 fabricated content from a marketing tagline (caught and discarded before publishing — material for posts must come from real guide content)
- Google Ads throttle was an unfamiliar pattern; took bot-pollution diagnosis to understand the apparent "high bounce rate"
- Cold paid traffic to a £29 PDF without warm audience first is essentially impossible — Google Ads paused after full 14-day window with 0 paid sales
- The launch bonus (30-min coaching call for first 50 buyers) never had a chance to be tested at meaningful volume: no volume, no bonus claims, no signal on whether the bonus itself moved conversion
- The £15 price test did not produce paid conversions as of the last documented review (1 August 2026)
- The services tier produced clicks but zero bookings/sales as of the last documented review, even after moving to free exploratory calls
- **Ops discipline miss.** PR #35 was merged before the copy-review commits (later PRs #36 and #37) landed on the branch. Production site briefly showed a version with copy the author had already asked to change. Guardrail added: agent to explicitly signal when a PR is ready-to-merge vs when new commits are in flight

**Unresolved / open**

- Is the £15 PDF a viable cold-conversion product, or is it structurally too narrow for anonymous traffic and requires warm-audience seeding?
- Will the free exploratory call model for services produce bookings? Outcome from August 2026 not yet documented
- Is "CrackVILT" too narrow as a brand if consulting expands beyond VILT? The FAQ, services copy, and JSON-LD all lean into a broader "technical training / customer success / consulting" positioning that outgrows the "VILT" acronym
- What does the eventual site information architecture look like — services-primary with guide as entry product, or guide-primary with services as expansion?
- How to reduce spam exposure of `info@crackvilt.com` while keeping it easy for legitimate leads to reach out?

---

## Roadmap

### Next 14 days (from 1 September 2026)

- **Review August 2026 data**: did any services bookings or sales happen? Did the £15 price test show any signal?
- **Publish LinkedIn services post** if not yet published (draft was ready 1 August 2026)
- **Continue LinkedIn cadence**, ideally 1-2 posts per week — one on services, one on concrete training failures observed in real work (the "why before how", "story vs checklist", "confidence rating without follow-up" angles)
- **Do NOT** create the Lemon Squeezy Strategy Call product until the free exploratory call model has validated demand

### 15-30 days

- If services produce ≥1 meaningful exploratory call → restructure home page (services above the fold, guide as supporting product), add a mini case study or testimonial placeholder, and begin scoping the first paid engagement
- If services still produce no signal → pivot to warm outbound: LinkedIn Sales Navigator outreach to 20-30 target enablement leaders (UK/EU mid-market SaaS with in-house training teams)
- Decide on guide pricing: keep £15, revert to £29 with bonus, or make it a free lead magnet

### 30-60 days

- Consider a second Google Ads campaign only after warm-audience seeding (LinkedIn organic + PDF buyers). If relaunched, use **Search Ads** on high-intent B2B keywords like "technical training consultancy UK", "VILT training delivery", "corporate training outsourcing" rather than Performance Max
- Real testimonials from 5-10 contacts (services delivery, not PDF sales — a single completed Delivery Pack testimonial is worth more than 30 PDF reviews)
- Consider whether "CrackVILT" needs a companion brand for consulting or whether the brand stretches naturally

### 60-90 days

- Repricing decision on the guide based on services traction
- Second deliverable evaluation: extension chapter, newsletter, or a live in-person workshop tied to the Train the Trainer format

### 6-12 months

- Independent consulting operation branded under CrackVILT (or successor brand if the acronym doesn't stretch)
- Bilingual presence (LinkedIn organic in both Italian and English networks)
- Possible second product: book, cohort-based course, or a public "Train the Trainer" cohort programme (open registration, not just corporate B2B)

---

## Information gaps (needs user input)

This log was last updated on **1 August 2026** during a live session. The following outcomes from August 2026 are not yet captured and should be filled in at the next review:

1. **£15 price test outcome** (window closed late July 2026): Did it produce any paid conversions? Was the price kept at £15, reverted to £29, or changed again?
2. **Services inbound signal in August 2026**: Did the free exploratory call model produce any Cal.com bookings, completed calls, or interest in Delivery Pack / Train the Trainer?
3. **LinkedIn services post**: Was it published? Did it generate any engagement, site visits, or leads?
4. **Traffic and Amplitude**: What did the services funnel look like in August (`Services Clicked` → `Service Tier Clicked` → Cal.com click)?
5. **Any new sales or refunds** on the guide or services?
6. **Spam/phishing follow-up**: Did the scammer emails stop after reporting? Any new variants?
7. **Any new strategic decisions or pivots** made during August 2026?

---

## Operational metadata

- **Version control**: GitHub `GGFirenze/howtotechtraining`
- **CI/CD**: GitHub Actions → Vercel automatic deploy on `main`
- **Monitoring**: Amplitude (analytics + funnel), Vercel Analytics (page perf), Google Ads dashboard (paid, currently paused)
- **Domain**: `crackvilt.com` (Cloudflare DNS, DNS-only mode, no proxy)
- **Email**: `info@crackvilt.com` → forwards to personal inbox via Cloudflare Email Routing
- **Backup**: Git repository serves as code backup; Supabase has automatic point-in-time recovery on paid tier (currently free tier)
- **Booking**: Cal.com personal account
  - Original event: 30-min coaching call for launch bonus (now dormant)
  - Current event: "Intro call — services" — 15 min free, buffer 30 min, booking form asks company + tier of interest + training challenge. The exact Cal.com URL is stored in Vercel env vars and not in this public document.
- **Security posture**: Webhook HMAC verification, Supabase RLS deny-by-default, server-only secrets, DMARC/SPF/DKIM on email. No compromises detected as of 1 August 2026.

---

_This log is a snapshot in time. Update it after major changes in scope, pricing, or strategy. The git history of this file is the long-form changelog._
