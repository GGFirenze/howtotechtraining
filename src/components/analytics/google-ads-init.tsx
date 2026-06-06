"use client";

import { useSyncExternalStore } from "react";

import { initGoogleAdsClient } from "@/lib/google-ads/gtag";
import { type ConsentChoice, onConsentChange, readConsent } from "@/lib/consent";

/**
 * Side-effect-only client component that loads Google Ads gtag.js when
 * (and only when) the user has accepted analytics consent. Mirrors the
 * pattern used by `<AmplitudeInit />` so both trackers share a single
 * consent-gating mechanism — the user accepts once, both trackers come
 * online; if they reject, neither tracker writes a cookie.
 *
 * Why this is needed:
 *
 *   Performance Max campaigns on Google Ads enter a "throttle" phase
 *   after 2-3 days of exploration when the algorithm has no signal to
 *   tell which clicks are producing value. The cheapest fix is to load
 *   the global gtag, which automatically captures the GCLID, sets the
 *   `_gcl_aw` cookie, and reports basic engagement back to Google. No
 *   conversion event is fired here — that is intentional and documented
 *   in `src/lib/google-ads/gtag.ts`.
 *
 * State: same React-19-safe `useSyncExternalStore` pattern used by
 * AmplitudeInit. No setState-in-effect, no infinite loops.
 *
 * Renders `null`.
 */
const subscribe = (callback: () => void): (() => void) => onConsentChange(() => callback());

const getSnapshot = (): ConsentChoice | null => readConsent();

const getServerSnapshot = (): ConsentChoice | null => null;

export function GoogleAdsInit() {
  const consent = useSyncExternalStore<ConsentChoice | null>(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  if (consent === "accepted") {
    initGoogleAdsClient();
  }

  return null;
}
