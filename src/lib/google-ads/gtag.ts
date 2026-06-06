"use client";

/**
 * Google Ads gtag.js client integration.
 *
 * What this gives Google Ads:
 *
 *   - Sets the `_gcl_aw` cookie that captures the GCLID parameter from
 *     incoming ad clicks and persists it across subsequent navigation.
 *   - Surfaces page-load and basic engagement signals back to Google Ads
 *     so Performance Max has something to optimise against. Without
 *     these signals PMax falls into a throttle pattern after 2-3 days
 *     of exploration because it cannot tell which clicks produced any
 *     downstream value.
 *
 * What this does NOT do (deliberately, for now):
 *
 *   - Fire a `purchase` conversion event. The actual sale completes on
 *     lemonsqueezy.com (a different domain). Adding conversion event
 *     firing requires a thank-you page that Lemon Squeezy redirects to
 *     after successful payment, plus a small redirect-config step in
 *     the LS dashboard. We are deferring that work until the campaign
 *     produces enough volume (10+ purchases/week) for the extra
 *     plumbing to be worth it. For now, the source-of-truth for sales
 *     stays the M4 webhook (LS -> Supabase -> Amplitude), and the
 *     global tag here gives Google AI enough engagement signal to keep
 *     delivering ads.
 *
 * Consent gating:
 *
 *   This module is only ever called from `<GoogleAdsInit />`, which
 *   guards on the same `readConsent()` API used to gate Amplitude. The
 *   `_gcl_aw` cookie is therefore only written after the user accepts
 *   the cookie banner. The function is also idempotent so it is safe
 *   to call on every render of the component.
 *
 * The conversion ID is read from `NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID`
 * (e.g. "AW-18205808017"). When the env var is missing the function
 * logs a single dev warning and stays silent — exactly the same
 * pattern as the Amplitude client.
 */

let initialized = false;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function initGoogleAdsClient(): void {
  if (initialized) return;
  if (typeof window === "undefined") return;

  const conversionId = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID;
  if (!conversionId) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "[GoogleAds] NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID is not set — skipping client init.",
      );
    }
    return;
  }

  // Inject the canonical gtag.js loader. Placed in <head> so it loads
  // as early as possible after consent; `async` keeps it off the
  // critical render path.
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(conversionId)}`;
  document.head.appendChild(script);

  // The standard gtag.js bootstrap. dataLayer is the queue Google
  // reads; gtag() pushes onto it and is callable before the async
  // loader has finished downloading the actual library.
  window.dataLayer = window.dataLayer ?? [];
  // The canonical gtag stub uses `arguments` (not rest params) so that
  // it works correctly when called before the real loader has finished
  // downloading. The IArguments object is what the loaded library
  // re-plays back as real ga4 / Ads tag commands.
  window.gtag = function gtag(): void {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };

  window.gtag("js", new Date());
  window.gtag("config", conversionId);

  initialized = true;
}
