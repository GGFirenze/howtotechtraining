"use client";

import { useEffect } from "react";

import { onConsentChange } from "@/lib/analytics/iubenda-consent";

/**
 * Workaround for an Iubenda integration bug observed in production:
 *
 * After the user clicks Accept (or Reject) on the cookie banner,
 * Iubenda correctly persists the consent — `_iub.cs.api.getPreferences()`
 * returns the full record (id, cons, timestamp, purposes), the consent
 * POST returns 201, and the telemetry hit returns 204. However, the
 * banner DOM element retains the class `iubenda-cs-visible` and stays
 * visible, so from the user's perspective "nothing happens".
 *
 * The likely cause is a CSS/animation interaction between Iubenda's
 * slide-out animation and our root `<body class="flex flex-col">`
 * layout — the `transitionend` handler that normally removes the
 * `iubenda-cs-visible` class never fires reliably.
 *
 * This component subscribes to Iubenda's consent lifecycle events
 * (preferences_first_expressed + consent_given) and force-hides the
 * banner element with inline `display: none`, plus removes the
 * visible class so any further iubenda CSS rules cooperate.
 *
 * Also runs an immediate check on mount: if the user is a returning
 * visitor whose consent was already persisted by Iubenda, the banner
 * shouldn't show at all on subsequent visits, but if it does (because
 * of the same UI bug), we hide it.
 *
 * Renders `null`. Mount once near the root of the app; idempotent.
 */
const BANNER_SELECTOR = "#iubenda-cs-banner, .iubenda-cs-banner, [id^='iubenda-cs-banner']";

function hideIubendaBannerIfPresent(): void {
  const banner = document.querySelector(BANNER_SELECTOR);
  if (!(banner instanceof HTMLElement)) return;
  banner.classList.remove("iubenda-cs-visible", "iubenda-cs-slidein");
  banner.style.display = "none";
}

function consentHasBeenGiven(): boolean {
  if (typeof window === "undefined") return false;
  const iub = window._iub;
  if (!iub || Array.isArray(iub)) return false;
  // Loose access: Iubenda's runtime types aren't published, and
  // `getPreferences()` returns an empty object before consent and a
  // populated record (with `id`) once consent has been expressed.
  const cs = iub.cs as
    | {
        api?: {
          getPreferences?: () => unknown;
        };
      }
    | undefined;
  const prefs = cs?.api?.getPreferences?.();
  if (!prefs || typeof prefs !== "object") return false;
  return "id" in prefs && Boolean((prefs as { id?: unknown }).id);
}

export function IubendaBannerCloseFix() {
  useEffect(() => {
    const handleConsent = () => {
      // Defer one frame so iubenda's own DOM mutations have a chance
      // to run first; we only step in if they didn't.
      requestAnimationFrame(hideIubendaBannerIfPresent);
    };

    // Subscribe to iubenda consent events. onConsentChange handles the
    // case where iubenda hasn't booted yet (it returns a no-op cleanup).
    const unsubscribe = onConsentChange(handleConsent);

    // Returning visitor: consent already persisted. Hide immediately
    // (with a small delay to let iubenda render its own DOM first so
    // we hide the right element, not a stale earlier banner).
    const returningVisitorCheck = window.setTimeout(() => {
      if (consentHasBeenGiven()) {
        hideIubendaBannerIfPresent();
      }
    }, 600);

    // Belt and braces: poll for ~6s after mount in case iubenda's
    // events fail to fire entirely. Stops as soon as banner is hidden
    // OR after the timeout, whichever first. 300ms is fast enough that
    // a stuck banner disappears within one human reaction time.
    let attempts = 0;
    const poll = window.setInterval(() => {
      attempts += 1;
      if (consentHasBeenGiven()) {
        hideIubendaBannerIfPresent();
      }
      if (attempts > 20) {
        window.clearInterval(poll);
      }
    }, 300);

    return () => {
      window.clearTimeout(returningVisitorCheck);
      window.clearInterval(poll);
      unsubscribe();
    };
  }, []);

  return null;
}
