"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Logo } from "@/components/logo";
import { trackEvent } from "@/lib/analytics/events";
import { clearConsent } from "@/lib/consent";
import { smoothScrollToAnchor } from "@/lib/scroll";

type AnchorTarget = "whats-inside" | "author" | "faq" | "pricing" | "services";
type FooterEventName =
  | "Whats Inside Clicked"
  | "Author Clicked"
  | "FAQ Clicked"
  | "Get Guide Clicked"
  | "Services Clicked";

export function Footer() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  /*
   * Same rationale as Header.handleNavClick: on the home page, intercept
   * the click and use smoothScrollToAnchor so the user gets a real
   * scroll + visible cyan pulse + DOM mutation, bypassing the next/link
   * same-href no-op behaviour. On other pages, let next/link handle
   * cross-page navigation.
   */
  const handleNavClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    anchor: AnchorTarget,
    eventName: FooterEventName,
  ): void => {
    trackEvent(eventName, { click_location: "footer" });

    if (isHome) {
      event.preventDefault();
      smoothScrollToAnchor(anchor);
    }
  };

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
            {/*
              Section links use absolute paths like '/#whats-inside'
              instead of bare '#whats-inside'. Bare fragments only
              work when the target section exists on the current
              route, so they break silently from /privacy and
              /cookies. The absolute form routes to the home page
              first and then scrolls to the fragment.
            */}
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  href="/#whats-inside"
                  onClick={(e) => handleNavClick(e, "whats-inside", "Whats Inside Clicked")}
                  className="text-foreground-muted hover:text-foreground transition-colors"
                >
                  What&apos;s inside
                </Link>
              </li>
              <li>
                <Link
                  href="/#author"
                  onClick={(e) => handleNavClick(e, "author", "Author Clicked")}
                  className="text-foreground-muted hover:text-foreground transition-colors"
                >
                  About the author
                </Link>
              </li>
              <li>
                <Link
                  href="/#pricing"
                  onClick={(e) => handleNavClick(e, "pricing", "Get Guide Clicked")}
                  className="text-foreground-muted hover:text-foreground transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/#services"
                  onClick={(e) => handleNavClick(e, "services", "Services Clicked")}
                  className="text-foreground-muted hover:text-foreground transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/#faq"
                  onClick={(e) => handleNavClick(e, "faq", "FAQ Clicked")}
                  className="text-foreground-muted hover:text-foreground transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-foreground-subtle text-xs font-semibold tracking-widest uppercase">
              Legal
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  href="/privacy"
                  className="text-foreground-muted hover:text-foreground transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/cookies"
                  className="text-foreground-muted hover:text-foreground transition-colors"
                >
                  Cookie Policy
                </Link>
              </li>
              <li>
                {/*
                  Reopens our custom cookie banner. Calls clearConsent()
                  which removes the localStorage record and dispatches
                  the consent-changed event; CookieBanner sees the
                  null state and re-renders. UK ICO / EDPB requirement
                  that withdrawing consent must be as easy as giving it.
                */}
                <button
                  type="button"
                  onClick={() => clearConsent()}
                  className="text-foreground-muted hover:text-foreground cursor-pointer bg-transparent p-0 text-left text-sm transition-colors"
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
                  href="mailto:info@crackvilt.com"
                  className="text-foreground-muted hover:text-foreground transition-colors"
                >
                  info@crackvilt.com
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/company/crackvilt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground-muted hover:text-foreground transition-colors"
                >
                  LinkedIn
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
