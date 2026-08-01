"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Logo } from "@/components/logo";
import { trackEvent } from "@/lib/analytics/events";
import { smoothScrollToAnchor } from "@/lib/scroll";

type AnchorTarget = "whats-inside" | "author" | "faq" | "pricing" | "services";
type NavEventName =
  | "Whats Inside Clicked"
  | "Author Clicked"
  | "FAQ Clicked"
  | "Get Guide Clicked"
  | "Services Clicked";

/**
 * Header navigation with smooth-scroll handling for same-page anchor
 * clicks.
 *
 * Why the click handler is non-trivial:
 *
 *   The plain `<Link href="/#pricing">` flow has a Next.js routing
 *   quirk: when a user is already at `crackvilt.com/#pricing` and
 *   clicks the same link again (e.g. they scrolled away manually),
 *   `next/link` treats it as same-URL navigation and does nothing.
 *   The browser stays where it is, the user perceives the button as
 *   broken, and we lose engagement.
 *
 *   We saw this in the wild: an Amplitude session showed five
 *   `Get Guide Clicked` events in 16 seconds from the same device,
 *   with only the first one producing an actual scroll. The other
 *   four were UX dead clicks even though they fired the event
 *   correctly.
 *
 * What the handler does:
 *
 *   - On the home page (where the anchor target exists in the DOM)
 *     it intercepts the click with `preventDefault`, fires the
 *     existing Amplitude event, and calls `smoothScrollToAnchor`
 *     to force a DOM mutation + smooth scroll + visible cyan pulse
 *     on the target section.
 *   - On any other page (legal pages, future routes), it leaves
 *     the click alone so `next/link` can handle the cross-route
 *     navigation as before — go to `/`, then the browser scrolls
 *     to the anchor on landing.
 *
 * The plain `href="/#anchor"` is preserved on every Link so SEO
 * crawlers, screen readers, and JS-disabled visitors still see
 * functional link destinations.
 */
export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const handleNavClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    anchor: AnchorTarget,
    eventName: NavEventName,
  ): void => {
    trackEvent(eventName, { click_location: "nav_menu" });

    if (isHome) {
      event.preventDefault();
      smoothScrollToAnchor(anchor);
    }
    /* On non-home routes, let next/link handle cross-page navigation. */
  };

  return (
    <header className="absolute inset-x-0 top-0 z-20 px-6 py-6 sm:px-10">
      <nav className="mx-auto flex max-w-6xl items-center justify-between">
        <Link href="/" aria-label="CrackVILT - home" className="inline-flex items-center">
          <Logo width={150} priority />
        </Link>

        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            href="/#whats-inside"
            onClick={(e) => handleNavClick(e, "whats-inside", "Whats Inside Clicked")}
            className="text-foreground-muted hover:text-foreground hidden text-sm font-medium transition-colors sm:inline-block"
          >
            What&apos;s inside
          </Link>
          <Link
            href="/#author"
            onClick={(e) => handleNavClick(e, "author", "Author Clicked")}
            className="text-foreground-muted hover:text-foreground hidden text-sm font-medium transition-colors sm:inline-block"
          >
            Author
          </Link>
          <Link
            href="/#services"
            onClick={(e) => handleNavClick(e, "services", "Services Clicked")}
            className="text-foreground-muted hover:text-foreground hidden text-sm font-medium transition-colors sm:inline-block"
          >
            Services
          </Link>
          <Link
            href="/#faq"
            onClick={(e) => handleNavClick(e, "faq", "FAQ Clicked")}
            className="text-foreground-muted hover:text-foreground hidden text-sm font-medium transition-colors sm:inline-block"
          >
            FAQ
          </Link>
          <Link
            href="/#pricing"
            onClick={(e) => handleNavClick(e, "pricing", "Get Guide Clicked")}
            className="bg-foreground text-background hover:bg-foreground-muted rounded-full px-4 py-2 text-sm font-semibold transition-colors"
          >
            Get the guide
          </Link>
        </div>
      </nav>
    </header>
  );
}
