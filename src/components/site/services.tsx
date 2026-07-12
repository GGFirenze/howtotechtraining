"use client";

import {
  BOOKING_FALLBACK_EMAIL,
  buildEnquiryMailto,
  getCalIntroUrl,
  getStrategyCallCheckoutUrl,
} from "@/lib/booking";
import { trackEvent } from "@/lib/analytics/events";
import type { ServiceTier } from "@/lib/analytics/events";

type IntakeKind = "checkout" | "calendar" | "email";

type ResolvedIntake = {
  href: string;
  kind: IntakeKind;
  /** Label used on the CTA button. */
  ctaLabel: string;
  /** Whether the URL is external (opens in new tab). */
  external: boolean;
};

type Tier = {
  id: ServiceTier;
  eyebrow: string;
  name: string;
  price: string;
  cadence: string;
  summary: string;
  bullets: string[];
  paymentNote: string;
  highlighted?: boolean;
  /**
   * Resolve the click target at render time so the fallback chain
   * (checkout → calendar → email) reflects whichever URLs happen to
   * be configured in the current environment.
   */
  resolveIntake: (ctx: { cal: string | null; strategyCheckout: string | null }) => ResolvedIntake;
};

const TIERS: Tier[] = [
  {
    id: "strategy_call",
    eyebrow: "Entry",
    name: "Strategy Call",
    price: "£120",
    cadence: "one hour",
    summary:
      "A focused 60-minute call to unblock one specific training problem, with a written recap.",
    bullets: [
      "60-minute video call (Zoom or Google Meet)",
      "One clear problem: struggling session, curriculum review, first VILT design",
      "Written recap with action items within 48 hours",
      "No prep call, just book and go",
    ],
    paymentNote: "Payment upfront. Booking link in your receipt.",
    resolveIntake: ({ cal, strategyCheckout }) => {
      if (strategyCheckout) {
        return {
          href: strategyCheckout,
          kind: "checkout",
          ctaLabel: "Book & pay, £120",
          external: false,
        };
      }
      if (cal) {
        return {
          href: cal,
          kind: "calendar",
          ctaLabel: "Book a Strategy Call",
          external: true,
        };
      }
      return {
        href: buildEnquiryMailto("Strategy Call, booking enquiry"),
        kind: "email",
        ctaLabel: `Email ${BOOKING_FALLBACK_EMAIL}`,
        external: false,
      };
    },
  },
  {
    id: "delivery_pack",
    eyebrow: "Most requested",
    name: "VILT Delivery Pack",
    price: "£2,500",
    cadence: "per workshop",
    summary:
      "Training outsourcing. I take one of your programmes and deliver it (prep, session, follow-up) directly to your customers.",
    bullets: [
      "1 virtual workshop, up to a full day (6 hours effective, breaks included)",
      "25 to 50 participants per session",
      "Larger cohorts split across multiple sessions to keep engagement high",
      "Scoping and content adaptation before delivery",
      "Materials: slide deck, recap quiz, post-training resources",
    ],
    paymentNote: "50% deposit at signature, 50% on delivery. UK VAT applied at invoice.",
    highlighted: true,
    resolveIntake: ({ cal }) => {
      if (cal) {
        return {
          href: cal,
          kind: "calendar",
          ctaLabel: "Book an intro call",
          external: true,
        };
      }
      return {
        href: buildEnquiryMailto("VILT Delivery Pack, scoping enquiry"),
        kind: "email",
        ctaLabel: `Email ${BOOKING_FALLBACK_EMAIL}`,
        external: false,
      };
    },
  },
  {
    id: "train_the_trainer",
    eyebrow: "Premium",
    name: "Train the Trainer",
    price: "£3,000",
    cadence: "two-day programme",
    summary:
      "I train up to 6 of your in-house trainers on the CrackVILT method so your team can design and deliver technical training on its own.",
    bullets: [
      "2 full days of live training (remote or on-site)",
      "Up to 6 in-house trainers",
      "1 follow-up group call at 4 weeks (60 min)",
      "1 shadowing session on a real delivery, with written feedback",
      "CrackVILT playbook, session templates, internal-use rights",
    ],
    paymentNote:
      "50% deposit at signature, 50% on completion. Travel and accommodation billed at cost when on-site.",
    resolveIntake: ({ cal }) => {
      if (cal) {
        return {
          href: cal,
          kind: "calendar",
          ctaLabel: "Book an intro call",
          external: true,
        };
      }
      return {
        href: buildEnquiryMailto("Train the Trainer, scoping enquiry"),
        kind: "email",
        ctaLabel: `Email ${BOOKING_FALLBACK_EMAIL}`,
        external: false,
      };
    },
  },
];

export function Services() {
  const cal = getCalIntroUrl();
  const strategyCheckout = getStrategyCallCheckoutUrl();

  const handleTierClick = (tier: Tier, intake: ResolvedIntake) => {
    trackEvent("Service Tier Clicked", { tier: tier.id, intake: intake.kind });
  };

  return (
    <section id="services" className="border-border-subtle border-t px-6 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="text-brand-cyan-bright text-sm font-semibold tracking-widest uppercase">
            Working with Giuliano
          </p>
          <h2 className="text-foreground mt-4 text-3xl leading-tight font-bold tracking-tight text-balance sm:text-4xl md:text-5xl">
            Beyond the guide,{" "}
            <span className="text-brand-gradient">
              hands-on help for teams that deliver training.
            </span>
          </h2>
          <p className="text-foreground-muted mt-6 text-lg leading-8">
            The guide is the playbook. When you need someone to run the workshop, coach your
            trainers, or unblock one specific session, pick the tier that fits and book a call.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {TIERS.map((tier) => {
            const intake = tier.resolveIntake({ cal, strategyCheckout });
            const isFeatured = tier.highlighted === true;

            return (
              <article
                key={tier.id}
                className={
                  isFeatured
                    ? "border-brand-cyan-bright/40 bg-background-elevated relative flex flex-col rounded-3xl border p-8 shadow-[0_0_60px_rgba(34,211,238,0.08)] sm:p-10"
                    : "border-border-subtle bg-background-elevated hover:border-border-soft flex flex-col rounded-3xl border p-8 transition-colors sm:p-10"
                }
              >
                <div className="flex items-center justify-between gap-3">
                  <p
                    className={
                      isFeatured
                        ? "text-brand-cyan-bright text-xs font-semibold tracking-widest uppercase"
                        : "text-foreground-subtle text-xs font-semibold tracking-widest uppercase"
                    }
                  >
                    {tier.eyebrow}
                  </p>
                </div>

                <h3 className="text-foreground mt-4 text-2xl leading-tight font-bold tracking-tight">
                  {tier.name}
                </h3>

                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-foreground text-4xl font-bold">{tier.price}</span>
                  <span className="text-foreground-muted text-sm font-medium">{tier.cadence}</span>
                </div>

                <p className="text-foreground-muted mt-4 text-sm leading-relaxed">{tier.summary}</p>

                <ul className="mt-6 space-y-3">
                  {tier.bullets.map((b) => (
                    <li key={b} className="text-foreground flex items-start gap-3 text-sm">
                      <svg
                        aria-hidden
                        viewBox="0 0 20 20"
                        fill="none"
                        className="text-brand-emerald-bright mt-0.5 size-5 flex-shrink-0"
                      >
                        <path
                          d="m5 10 3.5 3.5L15 7"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-col gap-3">
                  <a
                    href={intake.href}
                    target={intake.external ? "_blank" : undefined}
                    rel={intake.external ? "noopener noreferrer" : undefined}
                    onClick={() => handleTierClick(tier, intake)}
                    className={
                      isFeatured
                        ? "bg-foreground text-background hover:bg-foreground-muted inline-flex h-12 w-full cursor-pointer items-center justify-center rounded-full px-6 text-sm font-semibold transition-colors"
                        : "border-border-soft text-foreground hover:border-foreground inline-flex h-12 w-full cursor-pointer items-center justify-center rounded-full border bg-transparent px-6 text-sm font-semibold transition-colors"
                    }
                  >
                    {intake.ctaLabel}
                  </a>
                  <p className="text-foreground-subtle text-center text-xs leading-relaxed">
                    {tier.paymentNote}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        <p className="text-foreground-subtle mx-auto mt-12 max-w-3xl text-center text-sm leading-relaxed">
          Prefer to talk before committing? Email{" "}
          <a
            href={buildEnquiryMailto("CrackVILT services, general enquiry")}
            className="text-foreground-muted hover:text-foreground underline underline-offset-4 transition-colors"
          >
            {BOOKING_FALLBACK_EMAIL}
          </a>{" "}
          and we&apos;ll find a fit. Bespoke curricula, larger cohorts, and multi-day programmes on
          request.
        </p>
      </div>
    </section>
  );
}
