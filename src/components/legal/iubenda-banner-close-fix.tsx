"use client";

import { useEffect } from "react";

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
 * The likely cause is a CSS / animation interaction between Iubenda's
 * slide-out animation and our root `<body class="flex flex-col">`
 * layout — the `transitionend` handler that should remove the
 * `iubenda-cs-visible` class never fires reliably.
 *
 * Implementation: a long-running 500 ms poll that, on each tick:
 *
 *   1. Reads `_iub.cs.api.getPreferences()` (safe, idempotent).
 *   2. If the returned record has an `id` field (= consent expressed,
 *      either accepted or rejected), force-hides the banner element
 *      with inline `display: none` and removes the
 *      `iubenda-cs-visible` class.
 *
 * Why a pure poll rather than Iubenda's `consent_given` event:
 *
 * - Subscribing to events relies on `_iub.cs.on` already existing at
 *   the moment we attach. With Next.js `<Script strategy="afterInteractive">`,
 *   the iubenda widget boots a few hundred ms AFTER our useEffect runs;
 *   if we subscribe before iubenda is ready, the subscription is a
 *   no-op and we never hear about consent.
 * - We could re-attempt the subscription periodically, but at that
 *   point we're already polling, and a single "check the consent
 *   state directly" loop is simpler and more robust.
 * - The cost is negligible: two function calls every 500 ms is well
 *   below the noise floor of any analytics workload, and the loop is
 *   cleaned up on unmount.
 *
 * Renders `null`. Mount once near the root of the app; idempotent.
 */
const BANNER_SELECTOR = "#iubenda-cs-banner, .iubenda-cs-banner, [id^='iubenda-cs-banner']";

function getBanner(): HTMLElement | null {
  const el = document.querySelector(BANNER_SELECTOR);
  return el instanceof HTMLElement ? el : null;
}

function hideIubendaBanner(banner: HTMLElement): void {
  banner.classList.remove("iubenda-cs-visible", "iubenda-cs-slidein");
  banner.style.display = "none";
}

function consentHasBeenGiven(): boolean {
  if (typeof window === "undefined") return false;
  const iub = window._iub;
  if (!iub || Array.isArray(iub)) return false;
  const cs = iub.cs as
    | {
        api?: {
          getPreferences?: () => unknown;
        };
      }
    | undefined;
  let prefs: unknown;
  try {
    prefs = cs?.api?.getPreferences?.();
  } catch {
    return false;
  }
  if (!prefs || typeof prefs !== "object") return false;
  // Iubenda returns `{}` before consent and a populated record (with
  // `id`) after either Accept or Reject — both states should hide the
  // banner because consent has been *expressed* either way.
  return "id" in prefs && Boolean((prefs as { id?: unknown }).id);
}

export function IubendaBannerCloseFix() {
  useEffect(() => {
    const tick = () => {
      if (!consentHasBeenGiven()) return;
      const banner = getBanner();
      if (!banner) return;
      // Avoid an extra reflow/paint when the banner is already hidden.
      if (banner.style.display === "none") return;
      hideIubendaBanner(banner);
    };

    // Run immediately for the returning-visitor case (consent already
    // in storage from a previous session — Iubenda may still leave the
    // banner visible at first paint).
    tick();

    const interval = window.setInterval(tick, 500);
    return () => window.clearInterval(interval);
  }, []);

  return null;
}
