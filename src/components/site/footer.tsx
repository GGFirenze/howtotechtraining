import Link from "next/link";
import { Logo } from "@/components/logo";

export function Footer() {
  return (
    <footer className="border-border-subtle bg-background-elevated border-t px-6 py-12 sm:px-10 sm:py-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-4">
          <Link href="/" aria-label="CrackVILT — home" className="inline-flex">
            <Logo width={140} />
          </Link>
          <p className="text-foreground-muted max-w-sm text-sm leading-relaxed">
            A practical guide to delivering Virtual Instructor-Led Training that actually sticks. By
            Giuliano Giannini.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-x-12 gap-y-8 text-sm sm:grid-cols-3">
          <div>
            <h3 className="text-foreground-subtle text-xs font-semibold tracking-widest uppercase">
              Product
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href="#whats-inside"
                  className="text-foreground-muted hover:text-foreground transition-colors"
                >
                  What&apos;s inside
                </a>
              </li>
              <li>
                <a
                  href="#author"
                  className="text-foreground-muted hover:text-foreground transition-colors"
                >
                  About the author
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="text-foreground-muted hover:text-foreground transition-colors"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  className="text-foreground-muted hover:text-foreground transition-colors"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-foreground-subtle text-xs font-semibold tracking-widest uppercase">
              Legal
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href="/terms"
                  className="text-foreground-muted hover:text-foreground transition-colors"
                >
                  Terms
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  className="text-foreground-muted hover:text-foreground transition-colors"
                >
                  Privacy
                </a>
              </li>
              <li>
                <a
                  href="/refund"
                  className="text-foreground-muted hover:text-foreground transition-colors"
                >
                  Refund policy
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-foreground-subtle text-xs font-semibold tracking-widest uppercase">
              Contact
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href="mailto:[email protected]"
                  className="text-foreground-muted hover:text-foreground transition-colors"
                >
                  [email protected]
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-border-subtle text-foreground-subtle mx-auto mt-12 flex max-w-6xl flex-col gap-2 border-t pt-8 text-xs sm:flex-row sm:items-center sm:justify-between">
        <p>&copy; {new Date().getFullYear()} CrackVILT. All rights reserved.</p>
        <p>Built in the UK.</p>
      </div>
    </footer>
  );
}
