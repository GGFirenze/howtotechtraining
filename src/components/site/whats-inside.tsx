type Item = {
  title: string;
  description: string;
};

const ITEMS: Item[] = [
  {
    title: "The mindset that separates seasoned trainers from PowerPoint readers",
    description:
      "Why curiosity is the single most underrated trait in technical enablement, and how to keep it alive after years in the role.",
  },
  {
    title: "A pre-session POC playbook",
    description:
      "Email templates that warm up your champion before the kickoff, plus a discovery-call framework that surfaces what the audience actually cares about.",
  },
  {
    title: "Audience design that holds attention",
    description:
      "Why 20–30 beats 100, and the gamification levers that turn first-cohort attendees into product ambassadors.",
  },
  {
    title: "Flipped-classroom and blended-learning patterns",
    description:
      "How to handle dense technical topics without losing the room, including pre-work formats that lift show-up rates.",
  },
  {
    title: "Invite, agenda, and pre-work that earn attendance",
    description:
      "The exact structure of a meeting invite that survives the inbox, with clear expectations and resources baked in.",
  },
  {
    title: "Follow-up templates that drive adoption",
    description:
      "Ready-to-use email and Slack messages to close the loop after the session, including how to handle the “take it offline” questions.",
  },
  {
    title: "The classical-rhetoric backbone",
    description:
      "Ethos, logos, pathos &mdash; Cicero’s De Oratore applied to product training, plus the science of how new memory builds on existing knowledge (Bartlett, Sweller).",
  },
  {
    title: "The trusted-advisor career arc",
    description:
      "How great technical training opens the door to Sales Engineer, Solutions Architect, and Customer Success Architect roles &mdash; and what it takes to make the jump.",
  },
];

export function WhatsInside() {
  return (
    <section
      id="whats-inside"
      className="border-border-subtle border-t px-6 py-24 sm:px-10 sm:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="text-brand-cyan-bright text-sm font-semibold tracking-widest uppercase">
            What&apos;s inside
          </p>
          <h2 className="text-foreground mt-4 text-3xl font-bold tracking-tight text-balance sm:text-4xl md:text-5xl">
            Eight chapters of practical playbook, not theory.
          </h2>
          <p className="text-foreground-muted mt-6 text-lg leading-8">
            Includes ready-to-use email and Slack templates you can put to work this week. Every
            chapter ends in something you can do, not just something you&apos;ve read.
          </p>
        </div>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2">
          {ITEMS.map((item) => (
            <li
              key={item.title}
              className="border-border-subtle bg-background-elevated hover:border-border-soft rounded-2xl border p-6 transition-colors"
            >
              <h3 className="text-foreground text-base leading-snug font-semibold">{item.title}</h3>
              <p
                className="text-foreground-muted mt-3 text-sm leading-relaxed"
                dangerouslySetInnerHTML={{ __html: item.description }}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
