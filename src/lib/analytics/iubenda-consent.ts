/**
 * Helpers to interact with the Iubenda Privacy Controls consent state
 * from our own analytics layer.
 *
 * Iubenda exposes a global `_iub.cs` API once the banner widget has
 * finished initialising. We treat consent for purpose 4 (Targeting /
 * Advertising in this project's Iubenda configuration) as the gate for
 * Amplitude — the auto-blocker already maps `*.amplitude.com` to that
 * purpose, so we stay consistent.
 *
 * If Iubenda is not configured (`NEXT_PUBLIC_IUBENDA_DISABLED=1`, or
 * the widget script failed to load), we fail OPEN — i.e. we treat
 * consent as not given and Amplitude stays blocked. Better to lose
 * analytics than to fire trackers without consent.
 */

/** Iubenda purpose mapping — must match the Iubenda project's config. */
export const IUBENDA_PURPOSE_ANALYTICS = 4;

/**
 * Minimal type surface of the Iubenda runtime we depend on. Iubenda's
 * own typings aren't published, so we capture only what we read.
 */
type IubendaRuntime = {
  cs?: {
    api?: {
      isConsentGiven?: (purposeId: number) => boolean;
    };
    on?: (event: string, callback: () => void) => void;
  };
};

declare global {
  interface Window {
    _iub?: IubendaRuntime | unknown[];
  }
}

/** Returns the Iubenda runtime if it has booted, otherwise undefined. */
function getIubRuntime(): IubendaRuntime | undefined {
  if (typeof window === "undefined") return undefined;
  const iub = window._iub;
  // Iubenda starts as `_iub = []` and is replaced by the runtime object
  // when the widget script executes. Guard against the array form.
  if (!iub || Array.isArray(iub)) return undefined;
  return iub;
}

/**
 * True if the Iubenda runtime is loaded and exposes its consent API.
 * Use this before calling any of the helpers below.
 */
export function isIubendaReady(): boolean {
  const iub = getIubRuntime();
  return Boolean(iub?.cs?.api?.isConsentGiven);
}

/**
 * True if the user has granted consent for the analytics purpose.
 *
 * Returns false when:
 * - Iubenda hasn't booted yet (treat as no consent — fail closed)
 * - The user explicitly rejected the analytics purpose
 * - Iubenda is misconfigured and the API is unavailable
 */
export function hasAnalyticsConsent(): boolean {
  const iub = getIubRuntime();
  const api = iub?.cs?.api;
  if (!api?.isConsentGiven) return false;
  try {
    return Boolean(api.isConsentGiven(IUBENDA_PURPOSE_ANALYTICS));
  } catch {
    return false;
  }
}

/**
 * Subscribe to Iubenda's consent lifecycle events. The provided callback
 * fires whenever consent is first expressed or subsequently changed,
 * which is when our analytics layer should re-check `hasAnalyticsConsent()`
 * and (re)initialise.
 *
 * Returns a no-op cleanup function for symmetry with React effect hooks
 * (Iubenda's API does not expose unsubscribe; the events fire at most a
 * handful of times per session so leaking the listener is fine).
 */
export function onConsentChange(callback: () => void): () => void {
  const iub = getIubRuntime();
  const on = iub?.cs?.on;
  if (typeof on !== "function") return () => {};

  // The two events Iubenda fires that matter for our gate:
  // - preferences_first_expressed: user clicked Accept / Reject for the
  //   first time on this device.
  // - consent_given:               user granted at least one purpose.
  // Both can be relevant, so subscribe to both.
  on("callback.preferences_first_expressed", callback);
  on("callback.consent_given", callback);

  return () => {
    /* iubenda has no off() — see comment above */
  };
}
