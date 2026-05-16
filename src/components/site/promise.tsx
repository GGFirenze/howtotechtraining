export function Promise() {
  return (
    <section className="border-border-subtle bg-background-elevated border-t px-6 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto max-w-4xl">
        <p className="text-brand-cyan-bright text-sm font-semibold tracking-widest uppercase">
          Why this matters
        </p>

        <h2 className="text-foreground mt-4 text-3xl leading-tight font-bold tracking-tight text-balance sm:text-4xl md:text-5xl">
          Account Executives sell contracts.{" "}
          <span className="text-brand-gradient">
            Trainers help renew, save, and consolidate them.
          </span>
        </h2>

        <div className="text-foreground-muted mt-8 space-y-5 text-lg leading-8">
          <p>
            Done well, technical training drives adoption, prevents churn, and saves million-dollar
            accounts. Done poorly, it&apos;s two hours of slides nobody remembers &mdash; and a
            customer who silently disengages.
          </p>
          <p>
            This guide is the playbook of a senior trainer who&apos;s helped renew major contracts
            and shaped technical enablement at global SaaS companies. No fluff, no AI-generated
            filler. Just real stories, real templates, and the lessons learned the hard way over two
            decades on stage.
          </p>
        </div>

        <figure className="border-border-soft bg-background mt-12 rounded-2xl border p-6 sm:p-8">
          <blockquote className="text-foreground text-xl leading-relaxed font-medium text-balance sm:text-2xl">
            &ldquo;The perfect presentation is not one where the presenter reads off of their screen
            and only leaves 5 minutes for the live demo.&rdquo;
          </blockquote>
          <figcaption className="text-foreground-subtle mt-4 text-sm">
            — From the introduction
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
