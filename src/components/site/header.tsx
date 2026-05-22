"use client";

import Link from "next/link";

import { Logo } from "@/components/logo";
import { trackEvent } from "@/lib/analytics/events";

export function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-20 px-6 py-6 sm:px-10">
      <nav className="mx-auto flex max-w-6xl items-center justify-between">
        <Link href="/" aria-label="CrackVILT — home" className="inline-flex items-center">
          <Logo width={150} priority />
        </Link>

        {/*
          All section links use absolute paths like '/#author' rather
          than bare '#author'. Bare fragments only work when the
          target section exists on the current route — they break
          silently from /privacy and /cookies, which do NOT contain
          those sections. The leading slash makes the link route to
          the home page first, where the section exists, and scroll
          to it. On the home page itself the browser handles the
          fragment-only change as a same-page scroll, so behaviour
          there is unchanged.
        */}
        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            href="/#whats-inside"
            onClick={() => trackEvent("Whats Inside Clicked", { click_location: "nav_menu" })}
            className="text-foreground-muted hover:text-foreground hidden text-sm font-medium transition-colors sm:inline-block"
          >
            What&apos;s inside
          </Link>
          <Link
            href="/#author"
            onClick={() => trackEvent("Author Clicked", { click_location: "nav_menu" })}
            className="text-foreground-muted hover:text-foreground hidden text-sm font-medium transition-colors sm:inline-block"
          >
            Author
          </Link>
          <Link
            href="/#faq"
            onClick={() => trackEvent("FAQ Clicked", { click_location: "nav_menu" })}
            className="text-foreground-muted hover:text-foreground hidden text-sm font-medium transition-colors sm:inline-block"
          >
            FAQ
          </Link>
          <Link
            href="/#pricing"
            onClick={() => trackEvent("Get Guide Clicked", { click_location: "nav_menu" })}
            className="bg-foreground text-background hover:bg-foreground-muted rounded-full px-4 py-2 text-sm font-semibold transition-colors"
          >
            Get the guide
          </Link>
        </div>
      </nav>
    </header>
  );
}
