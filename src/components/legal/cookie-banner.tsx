"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";

import { type ConsentChoice, onConsentChange, readConsent, writeConsent } from "@/lib/consent";

/**
 * Custom GDPR / UK PECR cookie consent banner.
 *
 * Replaces the (broken) Iubenda Privacy Controls banner. Same compliance
 * properties — Accept and Reject equally prominent, no auto-acceptance,
 * persistent until the user expresses a choice, reopenable from the
 * footer — but rendered with our own design system so it integrates
 * cleanly with the dark brand and the rest of the layout.
 *
 * The cookie policy link still points at the Iubenda-hosted document
 * (the IubendaPolicyLoader script in the layout makes that link open
 * as an in-page modal) because that's where the actual compliant
 * legal text lives. Building the banner ourselves but keeping their
 * policies as the source of truth is the right division of labour
 * for our scale.
 *
 * State sync uses `useSyncExternalStore` so the banner stays in lock-
 * step with localStorage across tabs and avoids the React 19
 * `react-hooks/set-state-in-effect` lint rule (no setState calls in
 * useEffect).
 *
 * State machine:
 *
 *   null       → no choice in localStorage; show banner
 *   "accepted" → consent given; render nothing
 *   "rejected" → consent denied; render nothing
 *
 * SSR snapshot returns `null` — banner is rendered on the server for
 * first-time visitors. For returning visitors React reconciles the
 * client snapshot ("accepted"/"rejected") and removes the banner on
 * first paint of hydration. There may be a sub-frame flash but it is
 * acceptable UX, and far better than showing a stale/incorrect state.
 */
const subscribe = (callback: () => void): (() => void) => onConsentChange(() => callback());

const getSnapshot = (): ConsentChoice | null => readConsent();

const getServerSnapshot = (): ConsentChoice | null => null;

export function CookieBanner() {
  const consent = useSyncExternalStore<ConsentChoice | null>(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  if (consent !== null) return null;

  return (
    <>
      {/*
        Decorative backdrop blur. NOT a cookie wall — pointer-events-none
        keeps the underlying page fully scrollable and clickable while
        the user makes their choice. Under EDPB guidelines (2020) consent
        must be 'freely given', which means we cannot condition access
        to the site on giving it. A non-blocking visual blur is fine
        because it doesn't prevent the user from using the site without
        consenting first; it just nudges focus toward the banner.
      */}
      <div
        aria-hidden
        className="bg-background/40 pointer-events-none fixed inset-0 z-[9998] backdrop-blur-sm"
      />
      <div
        role="dialog"
        aria-labelledby="cookie-banner-title"
        aria-describedby="cookie-banner-description"
        className="border-border-soft bg-background-elevated/95 fixed inset-x-0 bottom-0 z-[9999] border-t px-6 py-5 shadow-[0_-8px_32px_rgba(0,0,0,0.4)] backdrop-blur sm:px-10 sm:py-6"
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1">
            <h2 id="cookie-banner-title" className="text-foreground text-base font-semibold">
              🍪 Cookies on CrackVILT
            </h2>
            <p
              id="cookie-banner-description"
              className="text-foreground-muted mt-2 text-sm leading-relaxed"
            >
              We use cookies to improve your experience on the site. You can accept or reject at any
              time. See our{" "}
              <Link
                href="/cookies"
                className="text-foreground hover:text-brand-cyan-bright underline transition-colors"
              >
                cookie policy
              </Link>{" "}
              for details.
            </p>
          </div>

          <div className="flex flex-shrink-0 gap-3">
            {/*
              Accept and Reject must be given equal prominence (UK ICO and
              EDPB guidance, 2024). They render with the same height,
              same horizontal padding, and visually-balanced styling — the
              only difference is the primary CTA being filled and Reject
              being outlined, which is acceptable as long as both are
              equally easy to click.
            */}
            <button
              type="button"
              onClick={() => writeConsent("rejected")}
              className="border-border-soft text-foreground hover:bg-background inline-flex h-10 items-center justify-center rounded-full border px-5 text-sm font-medium transition-colors"
            >
              Reject
            </button>
            <button
              type="button"
              onClick={() => writeConsent("accepted")}
              className="bg-foreground text-background hover:bg-foreground-muted inline-flex h-10 items-center justify-center rounded-full px-5 text-sm font-semibold transition-colors"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
