const FEATURES = [
  "130-page PDF guide, instant download",
  "8 chapters from mindset to follow-up",
  "Ready-to-use email & Slack templates",
  "POC discovery-call framework",
  "Audience design and engagement playbook",
  "Free updates to future revisions",
  "One-time payment — no subscription",
];

export function Pricing() {
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

        <div className="border-border-soft bg-background mx-auto mt-12 max-w-md rounded-3xl border p-8 shadow-[0_0_60px_rgba(34,211,238,0.06)] sm:p-10">
          <div className="flex items-baseline gap-2">
            <span className="text-foreground text-5xl font-bold">£29</span>
            <span className="text-foreground-muted text-base font-medium">one-time</span>
          </div>
          <p className="text-foreground-subtle mt-2 text-sm">
            VAT handled at checkout · payable in your local currency
          </p>

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

          <button
            type="button"
            disabled
            aria-disabled="true"
            className="bg-foreground/30 text-background mt-10 inline-flex h-12 w-full items-center justify-center rounded-full px-7 text-sm font-semibold opacity-60"
            title="Checkout opens at launch"
          >
            Checkout opens at launch
          </button>

          <p className="text-foreground-subtle mt-3 text-center text-xs">
            Powered by Lemon Squeezy &mdash; tax and invoices handled for you.
          </p>
        </div>
      </div>
    </section>
  );
}
