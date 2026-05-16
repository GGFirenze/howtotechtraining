const CHAPTERS = [
  {
    num: "01",
    title: "What good looks like",
    excerpt: "Real CSAT excerpts and the bar to aim for.",
  },
  {
    num: "02",
    title: "Have the right attitude",
    excerpt: "Curiosity, the trainer's most underrated trait.",
  },
  {
    num: "03",
    title: "Know your audience",
    excerpt: "How to study the room before you ever join the call.",
  },
  {
    num: "04",
    title: "Time to prep",
    excerpt: "POC outreach, discovery calls, invite structure, pre-work.",
  },
  {
    num: "05",
    title: "Delivering the content",
    excerpt: "Storytelling, ethos / logos / pathos, handling questions live.",
  },
  {
    num: "06",
    title: "Follow-up",
    excerpt: "Email and Slack templates that turn a session into adoption.",
  },
  { num: "07", title: "Conclusions", excerpt: "What to remember when the cameras are off." },
  {
    num: "08",
    title: "Acknowledgements",
    excerpt: "Two years of writing, a wife, and customers who endured my training.",
  },
];

export function TocPreview() {
  return (
    <section className="border-border-subtle bg-background-elevated border-t px-6 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <div className="max-w-3xl">
          <p className="text-brand-cyan-bright text-sm font-semibold tracking-widest uppercase">
            Table of contents
          </p>
          <h2 className="text-foreground mt-4 text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            A clear arc, from mindset to follow-up.
          </h2>
        </div>

        <ol className="mt-12 grid gap-3 sm:gap-2">
          {CHAPTERS.map((c) => (
            <li
              key={c.num}
              className="hover:bg-background grid grid-cols-[3rem_1fr] items-baseline gap-4 rounded-xl px-4 py-4 transition-colors sm:grid-cols-[3.5rem_1fr_auto] sm:gap-6 sm:px-6"
            >
              <span className="text-foreground-subtle font-mono text-sm font-medium">{c.num}</span>
              <div>
                <h3 className="text-foreground text-base font-semibold sm:text-lg">{c.title}</h3>
                <p className="text-foreground-muted mt-1 text-sm">{c.excerpt}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
