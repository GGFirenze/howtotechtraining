"use client";

import { getAmplitudeDeviceId } from "@/lib/analytics/client";
import { trackEvent } from "@/lib/analytics/events";
import { buildCheckoutUrl, isCheckoutConfigured } from "@/lib/lemon-squeezy";

const FEATURES = [
  "130-page PDF guide, instant download",
  "8 chapters from mindset to follow-up",
  "Ready-to-use email & Slack templates",
  "POC discovery-call framework",
  "Audience design and engagement playbook",
  "Free updates to future revisions",
  "One-time payment, no subscription",
];

export function Pricing() {
  // Inline env access so Next.js statically substitutes it on the client.
  // When the LS shop is not yet activated we render the CTA in its
  // "Checkout opens at launch" disabled state.
  const checkoutLive = isCheckoutConfigured();

  const handleBuyClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    trackEvent("Get Guide Clicked", { click_location: "pricing" });

    // Build the URL just-in-time so we capture the freshest device_id —
    // the SDK might still have been initialising during the render pass.
    const url = buildCheckoutUrl({ device_id: getAmplitudeDeviceId() });
    if (url) {
      window.location.href = url;
    }
  };

  return (
    <section
      id="pricing"
      className="border-border-subtle bg-background-elevated border-t px-6 py-24 sm:px-10 sm:py-32"
    >
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <p className="text-brand-cyan-bright text-sm font-semibold tracking-widest uppercase">
            Get the guide
          </p>
          <h2 className="text-foreground mt-4 text-3xl font-bold tracking-tight text-balance sm:text-4xl md:text-5xl">
            One book. One purchase. Use it for the rest of your career.
          </h2>
        </div>

        <div className="bg-background border-border-soft mx-auto mt-12 max-w-md rounded-3xl border p-8 shadow-[0_0_60px_rgba(34,211,238,0.06)] sm:p-10">
          <div className="flex items-baseline gap-2">
            <span className="text-foreground text-5xl font-bold">£29</span>
            <span className="text-foreground-muted text-base font-medium">one-time</span>
          </div>
          <p className="text-foreground-subtle mt-2 text-sm">
            VAT handled at checkout · payable in your local currency
          </p>

          {/*
            Launch bonus callout. Sits between the price and the feature
            bullets so it reads as 'and here is something extra' rather
            than blending in with the standard feature list. Cyan border
            and brand-cyan-bright text tie it to the brand accent without
            screaming. Will be removed once the first 50 buyers redeem
            (or the bonus window otherwise closes).
          */}
          <div className="border-brand-cyan-bright/30 bg-brand-cyan-bright/5 mt-6 rounded-2xl border p-4">
            <p className="text-brand-cyan-bright text-xs font-semibold tracking-widest uppercase">
              Launch bonus · first 50 buyers
            </p>
            <p className="text-foreground mt-2 text-sm leading-relaxed">
              Includes a complimentary 30-minute coaching call with the author. Bring a real
              session, problem, or topic from your work, redeemable within 60 days of purchase.
            </p>
          </div>

          <ul className="mt-8 space-y-3">
            {FEATURES.map((f) => (
              <li key={f} className="text-foreground flex items-start gap-3 text-sm">
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
                <span>{f}</span>
              </li>
            ))}
          </ul>

          {checkoutLive ? (
            <button
              type="button"
              onClick={handleBuyClick}
              className="bg-foreground text-background hover:bg-foreground-muted mt-10 inline-flex h-12 w-full cursor-pointer items-center justify-center rounded-full px-7 text-sm font-semibold transition-colors"
            >
              Buy now
            </button>
          ) : (
            <button
              type="button"
              disabled
              aria-disabled="true"
              className="bg-foreground/30 text-background mt-10 inline-flex h-12 w-full cursor-not-allowed items-center justify-center rounded-full px-7 text-sm font-semibold opacity-60"
              title="Checkout opens at launch"
            >
              Checkout opens at launch
            </button>
          )}

          <p className="text-foreground-subtle mt-3 text-center text-xs">
            Powered by Lemon Squeezy. Tax and invoices handled for you.
          </p>
        </div>
      </div>
    </section>
  );
}
