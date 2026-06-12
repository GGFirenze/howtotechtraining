# CrackVILT — Project Log

> Last updated: **7 June 2026**
> Maintained by: Giuliano Giannini

---

## TL;DR

CrackVILT is a 130-page practical guide on Virtual Instructor-Led Training (VILT), launched **2 June 2026** at £29 as a digital download via Lemon Squeezy. As of 7 June 2026 the system is fully live: payment, delivery, analytics, GDPR/UK PECR compliance, SEO foundations, brand assets, paid acquisition (Google Ads), and a launch bonus offer (first 50 buyers receive a 30-min coaching call with the author).

Two sales recorded so far, both from personal network. The cold-traffic experiment is underway via Google Ads + a bonus-driven A/B test, with kill criteria set at day 14 (19 June 2026).

---

## Product

**What:** _Crack the secret to a successful VILT session_ — a 130-page guide on designing and delivering Virtual Instructor-Led Training that engages, retains, and lands. Written for engineers, dev advocates, technical trainers, customer success architects, and consultants who teach live.

**Author:** Giuliano Giannini. Trainer since 2014 across multiple industries (fashion, telecom, tech). Currently Senior Customer Success Architect.

**Site:** [crackvilt.com](https://crackvilt.com)

**Brand positioning:** _"Practitioner-written content on technical training, customer success, and product analytics."_

**Pricing:**

- £29 one-time, instant PDF download
- VAT handled at checkout (Lemon Squeezy as Merchant of Record)
- **Launch bonus** (first 50 buyers): complimentary 30-min coaching call with the author, redeemable within 60 days

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
| Booking         | Cal.com (free tier)                | Used for launch bonus coaching calls                          |
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
- [x] Google Ads Performance Max campaign live (UK + Ireland geo)
- [x] A/B test on launch bonus banner via Amplitude G&S
- [x] Cal.com booking system for coaching calls
- [x] Launch bonus FAQ + pricing card callout
- [x] Business cards designed (Canva, soft-touch lamination, ordered via Moo)

## Current state — open / pending

- [ ] Business cards in transit (delivery 5-7 days)
- [ ] Day 14 review of Google Ads (kill criteria: 19 June 2026)
- [ ] LinkedIn content cadence — only post #1 published; post #2 onwards needs real source material from the guide
- [ ] Outreach to 10-15 contacts with free copies in exchange for honest feedback
- [ ] Real testimonials (currently zero — friends-bought sales don't count for testimonials)

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

---

## Marketing channels — what's been tried

| Channel                                      | Status                                    | Outcome so far                                               |
| -------------------------------------------- | ----------------------------------------- | ------------------------------------------------------------ |
| LinkedIn personal launch post                | 1 post published                          | Generated initial site visits, no direct sales attributed    |
| Google Ads Performance Max                   | Active, day 5 of 14-day evaluation window | 0 paid sales (within statistical expectation at this volume) |
| Amplitude G&S launch bonus banner (A/B test) | Just activated 7 June                     | Too early to measure                                         |
| Personal network (friends)                   | 2 sales                                   | Validated checkout works mechanically                        |
| Business cards                               | Designed, awaiting delivery               | Will deploy at local meetups                                 |
| LinkedIn Company Page posts                  | 1 post                                    | Building follower base                                       |
| Email outreach to existing contacts          | Not yet attempted                         | Highest-leverage organic move pending                        |

---

## Open experiments (running)

### Google Ads Performance Max

- **Started**: 2 June 2026
- **Geo**: UK + Ireland
- **Daily budget**: 30 RON (~£5)
- **Bidding**: Maximize Conversions (no Target CPA)
- **Kill criteria** (review on 19 June 2026):
  - Day 14 with 0 conversions paid + no positive A/B signal → pause
  - Cumulative spend > 600 RON (~£100) with 0 conversions → pause
  - CPC > 3 RON for 3 consecutive days → investigate

### Launch bonus banner A/B test (Amplitude G&S)

- **Variant A** (control): "Learn more" → `/#faq` (educate before buy)
- **Variant B** (treatment): "Claim my spot" → `/#pricing` (shorter path to buy)
- **Targeting**: non-buyers (`Order Placed = 0`)
- **Trigger**: page load, max 1× per session
- **Success metric**: `Banner Shown → Banner Clicked → Order Placed` funnel, segmented by variant
- **Min run time**: 14 days

---

## Honest learnings so far

**What worked**

- Iterative architecture choices (each milestone shippable independently)
- Consent-gated tracking from day one (no GDPR retrofit)
- Bot detection in Amplitude (`66.249.x.x` Google crawler IPs were polluting bounce rate data — once filtered, real human bounce rate looks healthy)
- Quick recovery from Google Ads throttle after global tag install
- Decision to defer Resend / thank-you page / Developer Token until volume justifies

**What didn't work / surprises**

- LinkedIn launch post was not a silver bullet (but expected); organic content cadence is the real leverage and we haven't built it yet
- Initial AI-drafted LinkedIn post #2 fabricated content from a marketing tagline (caught and discarded before publishing — material for posts must come from real guide content)
- Google Ads throttle was an unfamiliar pattern; took bot-pollution diagnosis to understand the apparent "high bounce rate"
- Cold paid traffic to a £29 PDF without warm audience first is essentially impossible — needs trust signals (testimonials, content cadence, organic visibility) before paid scales

**Unresolved / open**

- Will the launch bonus + A/B test actually move paid conversion?
- Is the £29 PDF the actual product, or a lead magnet for future consulting?
- Is "CrackVILT" too narrow as a brand if consulting expands beyond VILT?
- What does the post-50-buyer model look like? Bonus closes; is the £29 PDF alone enough to drive cold conversion long-term?

---

## Roadmap

### Next 14 days (provisional, depends on data)

- Watch A/B test data converge
- Day 14 (19 June 2026): Google Ads kill-or-continue decision
- Real testimonials from 5-10 contacts who get the guide via outreach
- LinkedIn post #2 (real content from guide, not fabricated)

### 30-60 days

- Continue LinkedIn cadence (1-2 posts/week)
- Attend local meetup, distribute business cards
- Iterate based on what the data says (more bonus framing? Drop paid? Pivot pricing?)

### 60-90 days

- Decision point: is the £29 PDF a viable cold-paid product on its own, or pivots to lead magnet + consulting funnel?
- Consider second deliverable (extension chapter, follow-up newsletter, in-person workshop)

### 6-12 months

- Independent consulting offering aligned with CrackVILT brand
- Bilingual presence (LinkedIn organic in both Italian and English networks)
- Possible second product (book, course, or training program)

---

## Operational metadata

- **Version control**: GitHub `GGFirenze/howtotechtraining`
- **CI/CD**: GitHub Actions → Vercel automatic deploy on `main`
- **Monitoring**: Amplitude (analytics + funnel), Vercel Analytics (page perf), Google Ads dashboard (paid)
- **Domain**: `crackvilt.com` (Cloudflare DNS, DNS-only mode, no proxy)
- **Email**: `info@crackvilt.com` → forwards to personal inbox via Cloudflare Email Routing
- **Backup**: Git repository serves as code backup; Supabase has automatic point-in-time recovery on paid tier (currently free tier)
- **Booking**: Cal.com personal account for the launch-bonus coaching calls

---

_This log is a snapshot in time. Update it after major changes in scope, pricing, or strategy. The git history of this file is the long-form changelog._
