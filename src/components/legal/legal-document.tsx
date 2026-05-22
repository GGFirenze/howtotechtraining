import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";

/**
 * Shared layout for legal/policy pages (`/privacy`, `/cookies`).
 *
 * Wraps the document content in:
 *   - the site header (so visitors keep brand context)
 *   - a `max-w-3xl` reading column with prose-friendly typography
 *     applied via Tailwind descendant selectors (no plugin needed)
 *   - the site footer
 *
 * The descendant-selector approach keeps each page file readable —
 * `<h2>`, `<h3>`, `<p>`, `<ul>` etc. inside `children` are styled
 * automatically without sprinkling utility classes on every element.
 */
export function LegalDocument({
  children,
  title,
  intro,
  lastUpdate,
}: {
  children: React.ReactNode;
  title: string;
  intro: string;
  lastUpdate: string;
}) {
  return (
    <>
      <Header />
      <main className="bg-background relative pt-32 pb-16 sm:pt-40 sm:pb-24">
        <article
          className={[
            "mx-auto max-w-3xl px-6 sm:px-10",
            "[&_h2]:text-foreground [&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:text-2xl [&_h2]:font-semibold",
            "[&_h3]:text-foreground [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:text-lg [&_h3]:font-semibold",
            "[&_h4]:text-foreground [&_h4]:mt-6 [&_h4]:mb-2 [&_h4]:text-base [&_h4]:font-semibold",
            "[&_p]:text-foreground-muted [&_p]:my-4 [&_p]:leading-relaxed",
            "[&_ul]:text-foreground-muted [&_ul]:my-4 [&_ul]:ml-6 [&_ul]:list-disc [&_ul]:space-y-2",
            "[&_ol]:text-foreground-muted [&_ol]:my-4 [&_ol]:ml-6 [&_ol]:list-decimal [&_ol]:space-y-2",
            "[&_li]:leading-relaxed",
            "[&_a]:text-brand-cyan-bright [&_a]:underline [&_a]:transition-colors",
            "[&_a:hover]:text-brand-emerald-bright",
            "[&_strong]:text-foreground",
            "[&_address]:text-foreground-muted [&_address]:not-italic",
            "[&_dl]:my-4",
            "[&_dt]:text-foreground [&_dt]:mt-4 [&_dt]:font-semibold",
            "[&_dd]:text-foreground-muted [&_dd]:ml-0 [&_dd]:leading-relaxed",
          ].join(" ")}
        >
          <header className="border-border-subtle mb-12 border-b pb-8">
            <h1 className="text-foreground text-4xl font-bold tracking-tight sm:text-5xl">
              {title}
            </h1>
            <p className="text-foreground-muted mt-6 text-lg leading-relaxed">{intro}</p>
            <p className="text-foreground-subtle mt-6 text-sm">Latest update: {lastUpdate}</p>
          </header>
          {children}
        </article>
      </main>
      <Footer />
    </>
  );
}
