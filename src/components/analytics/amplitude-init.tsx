"use client";

import { useEffect } from "react";

import { initAmplitudeClient } from "@/lib/analytics/client";
import { hasAnalyticsConsent, onConsentChange } from "@/lib/analytics/iubenda-consent";

/**
 * Side-effect-only client component that initialises the Amplitude browser
 * SDK on mount, gated by Iubenda consent.
 *
 * Behaviour:
 * - On mount, polls for the Iubenda runtime to be ready (the widget loads
 *   `beforeInteractive` so it should be ready almost immediately, but we
 *   poll for up to ~5s to be defensive against slow networks / blockers).
 * - When ready, checks `hasAnalyticsConsent()`. If granted (returning
 *   visitor whose consent persists in iubenda's storage), initialises
 *   Amplitude immediately.
 * - Subscribes to consent change events. If the user accepts later
 *   (first visit, clicks Accept on the banner), we initialise then.
 * - The underlying `initAmplitudeClient()` is idempotent, so multiple
 *   calls (e.g. from poll + event) are safe.
 *
 * Renders `null` — exists purely so the layout can include analytics
 * setup without leaking client APIs into a Server Component.
 *
 * Mounted once near the root of the app (in `app/layout.tsx`).
 */
export function AmplitudeInit() {
  useEffect(() => {
    let cancelled = false;

    const tryInit = (): boolean => {
      if (cancelled) return true; // stop the poll
      if (hasAnalyticsConsent()) {
        initAmplitudeClient();
        return true;
      }
      return false;
    };

    // Try immediately — covers the case where Iubenda already booted
    // (e.g. fast network or page navigation within the SPA).
    if (tryInit()) {
      // We still subscribe below so we react to consent withdrawal /
      // re-grant flows. initAmplitudeClient() is idempotent.
    }

    // Subscribe to Iubenda lifecycle events. If Iubenda isn't ready
    // yet, onConsentChange returns a no-op and we'll catch up via the
    // poll. We re-attach when iubenda finally appears (poll path).
    let unsubscribe = onConsentChange(tryInit);

    // Poll for Iubenda runtime readiness. Stops as soon as the
    // subscription has been attached to the real iubenda runtime, or
    // after ~5 seconds to bound loop work.
    let attempts = 0;
    const poll = window.setInterval(() => {
      attempts += 1;
      // Re-attempt subscription each tick — once iubenda has booted
      // this attaches real listeners. After that we can stop polling.
      const reAttach = onConsentChange(tryInit);
      if (typeof reAttach === "function" && reAttach !== unsubscribe) {
        unsubscribe = reAttach;
      }
      if (tryInit() || attempts > 50) {
        window.clearInterval(poll);
      }
    }, 100);

    return () => {
      cancelled = true;
      window.clearInterval(poll);
      unsubscribe();
    };
  }, []);

  return null;
}
