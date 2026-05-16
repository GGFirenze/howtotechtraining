type QA = { q: string; a: string };

const QUESTIONS: QA[] = [
  {
    q: "Is this only for VILT, or does it cover in-person training too?",
    a: "The guide is written from the lens of Virtual Instructor-Led Training because that's the dominant format in B2B Tech today, but most of the material — discovery calls, audience design, storytelling, follow-up — applies equally to in-person workshops and conference talks.",
  },
  {
    q: "I'm new to technical training — is this for me?",
    a: "Yes. The guide is explicitly written for engineers, dev advocates, and consultants moving into training delivery, as well as trainers who want to lift their CSAT. Nothing is gatekept behind years of experience.",
  },
  {
    q: "I'm a seasoned trainer. Will I learn anything new?",
    a: "Probably. The author has been training tech audiences since 2014 and the guide reflects that depth — the angle on schema theory, the trusted-advisor career arc, and the specific templates are designed to give experienced trainers something to take away, not to teach the basics again.",
  },
  {
    q: "What format do I get?",
    a: "An instant PDF download (130 pages). Readable on any device. Free updates to future revisions of this edition.",
  },
  {
    q: "Can I expense it through my company?",
    a: "Yes — Lemon Squeezy handles invoicing automatically and supports adding your company name and VAT/GST number at checkout. The receipt is generated immediately and emailed to you.",
  },
  {
    q: "What if it's not what I expected?",
    a: "Email [email protected] within 14 days of purchase and we'll process a refund. No questions asked.",
  },
  {
    q: "Do you offer team licences?",
    a: "Not yet, but it's on the roadmap. If you need bulk access for an enablement team, email [email protected] and we'll work something out.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="border-border-subtle border-t px-6 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <p className="text-brand-cyan-bright text-sm font-semibold tracking-widest uppercase">
            FAQ
          </p>
          <h2 className="text-foreground mt-4 text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            Questions before you buy.
          </h2>
        </div>

        <div className="divide-border-subtle border-border-subtle mt-12 divide-y border-y">
          {QUESTIONS.map((qa) => (
            <details key={qa.q} className="group py-6">
              <summary className="text-foreground hover:text-brand-cyan-bright flex cursor-pointer list-none items-start justify-between gap-6 text-left text-base font-semibold transition-colors sm:text-lg">
                <span className="flex-1">{qa.q}</span>
                <svg
                  aria-hidden
                  viewBox="0 0 20 20"
                  fill="none"
                  className="text-foreground-subtle mt-1 size-5 flex-shrink-0 transition-transform duration-200 group-open:rotate-45"
                >
                  <path
                    d="M10 4v12M4 10h12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </summary>
              <p className="text-foreground-muted mt-4 text-base leading-relaxed">{qa.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
