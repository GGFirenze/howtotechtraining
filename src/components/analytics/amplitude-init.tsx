"use client";

import { useSyncExternalStore } from "react";

import { initAmplitudeClient } from "@/lib/analytics/client";
import { type ConsentChoice, onConsentChange, readConsent } from "@/lib/consent";

/**
 * Side-effect-only client component that initialises the Amplitude
 * browser SDK when (and only when) the user has accepted analytics
 * consent (see `src/lib/consent`).
 *
 * Implementation uses `useSyncExternalStore` so the consent state is
 * read on each render instead of stored in a `useState` that would
 * require setState-in-effect (forbidden by the React 19 lint rule
 * `react-hooks/set-state-in-effect`). We then call
 * `initAmplitudeClient()` directly during render when consent is
 * "accepted".
 *
 * `initAmplitudeClient()` is idempotent — calling it many times during
 * re-renders is safe; only the first call actually starts the SDK.
 *
 * Lifecycle:
 *
 *   - First-paint, no prior consent → consent = null → SDK off.
 *   - User clicks Accept → writeConsent("accepted") → onConsentChange
 *     fires → useSyncExternalStore re-reads → consent = "accepted" →
 *     this component re-renders → init() runs.
 *   - User clicks Reject or revokes → consent != "accepted" → SDK
 *     stays uninitialised. We do NOT call amplitude.reset() mid-session;
 *     the next page load simply does not init it.
 *
 * Renders `null` — no DOM impact, no styling.
 */
const subscribe = (callback: () => void): (() => void) => onConsentChange(() => callback());

const getSnapshot = (): ConsentChoice | null => readConsent();

const getServerSnapshot = (): ConsentChoice | null => null;

export function AmplitudeInit() {
  const consent = useSyncExternalStore<ConsentChoice | null>(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  if (consent === "accepted") {
    initAmplitudeClient();
  }

  return null;
}
