"use client";

import Link from "next/link";

import { Logo } from "@/components/logo";
import { trackEvent } from "@/lib/analytics/events";

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
                  onClick={() => trackEvent("Whats Inside Clicked", { click_location: "footer" })}
                  className="text-foreground-muted hover:text-foreground transition-colors"
                >
                  What&apos;s inside
                </a>
              </li>
              <li>
                <a
                  href="#author"
                  onClick={() => trackEvent("Author Clicked", { click_location: "footer" })}
                  className="text-foreground-muted hover:text-foreground transition-colors"
                >
                  About the author
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  onClick={() => trackEvent("Get Guide Clicked", { click_location: "footer" })}
                  className="text-foreground-muted hover:text-foreground transition-colors"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  onClick={() => trackEvent("FAQ Clicked", { click_location: "footer" })}
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
                {/*
                  Iubenda modal embed: the iubenda-embed class makes the
                  cdn.iubenda.com/iubenda.js loader (mounted globally in
                  the layout) attach a click handler that opens the
                  policy in a modal. Falls back to a normal navigation
                  to the iubenda-hosted page if JS is disabled.
                */}
                <a
                  href="https://www.iubenda.com/privacy-policy/88166144"
                  className="iubenda-white iubenda-noiframe iubenda-embed text-foreground-muted hover:text-foreground transition-colors"
                  title="Privacy Policy"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="https://www.iubenda.com/privacy-policy/88166144/cookie-policy"
                  className="iubenda-white iubenda-noiframe iubenda-embed text-foreground-muted hover:text-foreground transition-colors"
                  title="Cookie Policy"
                >
                  Cookie Policy
                </a>
              </li>
              <li>
                {/*
                  iubenda exposes a global helper to reopen the cookie
                  banner from anywhere — useful so visitors can change
                  their preferences after the first dismiss (a GDPR
                  requirement). Guarded so a no-JS visitor doesn't see
                  a dead button.
                */}
                <button
                  type="button"
                  onClick={() => {
                    if (
                      typeof window !== "undefined" &&
                      window._iub &&
                      !Array.isArray(window._iub) &&
                      window._iub.cs
                    ) {
                      // Iubenda exposes openPreferences on the global API at runtime;
                      // we narrow the loose runtime type here.
                      const cs = window._iub.cs as {
                        api?: { openPreferences?: () => void };
                      };
                      cs.api?.openPreferences?.();
                    }
                  }}
                  className="text-foreground-muted hover:text-foreground bg-transparent p-0 text-left text-sm transition-colors"
                >
                  Cookie preferences
                </button>
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
