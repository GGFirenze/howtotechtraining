import Image from "next/image";

export function Author() {
  return (
    <section id="author" className="border-border-subtle border-t px-6 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-[1fr_2fr] md:items-start md:gap-16">
        <div>
          <div className="border-border-soft bg-background-elevated relative aspect-[2/3] w-full max-w-[260px] overflow-hidden rounded-2xl border shadow-[0_0_40px_-12px_rgba(34,211,238,0.25)]">
            <Image
              src="/brand/giuliano.png"
              alt="Giuliano Giannini, author of the guide"
              fill
              priority={false}
              sizes="(max-width: 768px) 260px, 260px"
              className="object-cover"
            />
          </div>
        </div>

        <div>
          <p className="text-brand-cyan-bright text-sm font-semibold tracking-widest uppercase">
            About the author
          </p>
          <h2 className="text-foreground mt-4 text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            Giuliano Giannini.{" "}
            <span className="text-foreground-muted">Two decades on stage, written down.</span>
          </h2>

          <div className="text-foreground-muted mt-8 space-y-5 text-lg leading-8">
            <p>
              Technical Trainer in B2B Tech since 2020, transitioning to Sr. Customer Success
              Architect in 2025. He has trained product teams around the world &mdash; from VoIP at
              scale, through SaaS onboarding, to product analytics &mdash; and helped renew
              million-dollar accounts through training alone.
            </p>
            <p>
              Public speaking has been a thread for two decades &mdash; from high school as Young
              Peace Ambassador of the UNESCO Club of Florence, to commercial diplomacy at the
              Italian Chamber of Commerce in Rosario, Argentina, and years travelling as a Product
              Trainer for an Italian corporation before settling into tech. This guide distils two
              years of writing and hundreds of real customer CSATs into one practical playbook.
            </p>
          </div>

          <dl className="border-border-subtle mt-10 grid grid-cols-2 gap-6 border-t pt-8 text-sm sm:grid-cols-4">
            <div>
              <dt className="text-foreground-subtle">Years on stage</dt>
              <dd className="text-foreground mt-1 text-2xl font-semibold">20+</dd>
            </div>
            <div>
              <dt className="text-foreground-subtle">In tech training</dt>
              <dd className="text-foreground mt-1 text-2xl font-semibold">6+</dd>
            </div>
            <div>
              <dt className="text-foreground-subtle">Pages</dt>
              <dd className="text-foreground mt-1 text-2xl font-semibold">130</dd>
            </div>
            <div>
              <dt className="text-foreground-subtle">Years writing it</dt>
              <dd className="text-foreground mt-1 text-2xl font-semibold">2</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
