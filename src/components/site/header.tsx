import Link from "next/link";
import { Logo } from "@/components/logo";

export function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-20 px-6 py-6 sm:px-10">
      <nav className="mx-auto flex max-w-6xl items-center justify-between">
        <Link href="/" aria-label="CrackVILT — home" className="inline-flex items-center">
          <Logo width={150} priority />
        </Link>

        <div className="flex items-center gap-2 sm:gap-4">
          <a
            href="#whats-inside"
            className="text-foreground-muted hover:text-foreground hidden text-sm font-medium transition-colors sm:inline-block"
          >
            What&apos;s inside
          </a>
          <a
            href="#author"
            className="text-foreground-muted hover:text-foreground hidden text-sm font-medium transition-colors sm:inline-block"
          >
            Author
          </a>
          <a
            href="#faq"
            className="text-foreground-muted hover:text-foreground hidden text-sm font-medium transition-colors sm:inline-block"
          >
            FAQ
          </a>
          <a
            href="#pricing"
            className="bg-foreground text-background hover:bg-foreground-muted rounded-full px-4 py-2 text-sm font-semibold transition-colors"
          >
            Get the guide
          </a>
        </div>
      </nav>
    </header>
  );
}
