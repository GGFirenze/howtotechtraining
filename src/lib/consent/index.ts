"use client";

/**
 * First-party cookie consent state.
 *
 * Persisted in localStorage under a single versioned key so we can
 * evolve the schema without losing prior consents. Two events are
 * dispatched on change so other parts of the app can react:
 *
 *   - `crackvilt-consent-changed` (custom event, same tab)
 *   - native `storage` event (fired by the browser, cross-tab)
 *
 * AmplitudeInit listens to both so the analytics layer turns on
 * within ~1 frame of the user clicking Accept, and stays in sync if
 * the user opens a second tab and changes their mind there.
 */

const STORAGE_KEY = "crackvilt-cookie-consent";
const CURRENT_VERSION = 1;

export type ConsentChoice = "accepted" | "rejected";

/** Custom DOM event name dispatched on consent change in the same tab. */
export const CONSENT_CHANGED_EVENT = "crackvilt-consent-changed";

type StoredConsent = {
  version: number;
  choice: ConsentChoice;
  timestamp: string;
};

/**
 * Read the persisted consent choice. Returns `null` if the user has
 * not yet expressed consent in this browser, or if the stored value is
 * malformed / from an older schema version.
 */
export function readConsent(): ConsentChoice | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<StoredConsent>;
    if (parsed.version !== CURRENT_VERSION) return null;
    if (parsed.choice !== "accepted" && parsed.choice !== "rejected") return null;
    return parsed.choice;
  } catch {
    return null;
  }
}

/**
 * Persist a consent choice and notify listeners (same-tab and cross-tab).
 *
 * Fail-silent on storage write errors (private browsing modes can throw
 * SecurityError on `localStorage.setItem`). In that case the banner
 * will keep re-showing on each page load — annoying but compliance-safe
 * (we err on the side of not running trackers).
 */
export function writeConsent(choice: ConsentChoice): void {
  if (typeof window === "undefined") return;
  try {
    const value: StoredConsent = {
      version: CURRENT_VERSION,
      choice,
      timestamp: new Date().toISOString(),
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    window.dispatchEvent(new CustomEvent(CONSENT_CHANGED_EVENT, { detail: { choice } }));
  } catch {
    /* localStorage unavailable; safe to silently no-op */
  }
}

/**
 * Clear the persisted consent. Used by the footer "Cookie preferences"
 * button so the banner re-appears and the user can change their mind.
 */
export function clearConsent(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new CustomEvent(CONSENT_CHANGED_EVENT, { detail: { choice: null } }));
  } catch {
    /* same as writeConsent */
  }
}

/**
 * Subscribe to consent state changes. Fires on:
 *
 *   - The same tab calling `writeConsent` or `clearConsent`
 *   - Another tab updating the localStorage key (browser `storage`
 *     event), which keeps consent in sync across multiple open tabs.
 *
 * Returns an unsubscribe function.
 */
export function onConsentChange(callback: (choice: ConsentChoice | null) => void): () => void {
  if (typeof window === "undefined") return () => {};

  const sameTabHandler = (event: Event) => {
    const detail = (event as CustomEvent<{ choice: ConsentChoice | null }>).detail;
    callback(detail?.choice ?? null);
  };

  const crossTabHandler = (event: StorageEvent) => {
    if (event.key !== STORAGE_KEY) return;
    callback(readConsent());
  };

  window.addEventListener(CONSENT_CHANGED_EVENT, sameTabHandler);
  window.addEventListener("storage", crossTabHandler);

  return () => {
    window.removeEventListener(CONSENT_CHANGED_EVENT, sameTabHandler);
    window.removeEventListener("storage", crossTabHandler);
  };
}
