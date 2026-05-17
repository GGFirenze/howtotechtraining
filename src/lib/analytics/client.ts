"use client";

import * as amplitude from "@amplitude/analytics-browser";

import {
  AMPLITUDE_DEFAULT_TRACKING,
  AMPLITUDE_FLUSH_INTERVAL_MS,
  AMPLITUDE_SERVER_ZONE,
} from "./config";

let initialized = false;

/**
 * Initialise the Amplitude browser SDK.
 *
 * Idempotent: safe to call multiple times. Subsequent calls are no-ops.
 *
 * Behaviour:
 * - On the server (no `window`) it returns immediately.
 * - When `NEXT_PUBLIC_AMPLITUDE_API_KEY` is missing it logs a single warning
 *   in development and otherwise stays silent — the rest of the app keeps
 *   working, just without analytics.
 * - When the key is present, the SDK is initialised with EU server zone,
 *   sessions on, page views and attribution off (we will track those
 *   manually with curated properties).
 *
 * Consent gating: this function is *not* gated by a consent banner yet.
 * That arrives with the cookie banner in M9. Until then, init runs on
 * every page load.
 */
export function initAmplitudeClient(): void {
  if (initialized) return;
  if (typeof window === "undefined") return;

  const apiKey = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;
  if (!apiKey) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[Amplitude] NEXT_PUBLIC_AMPLITUDE_API_KEY is not set — skipping client init.");
    }
    return;
  }

  amplitude.init(apiKey, {
    serverZone: AMPLITUDE_SERVER_ZONE,
    defaultTracking: AMPLITUDE_DEFAULT_TRACKING,
    flushIntervalMillis: AMPLITUDE_FLUSH_INTERVAL_MS,
  });

  initialized = true;
}

/**
 * Returns the Amplitude device ID assigned by the browser SDK.
 *
 * Useful for stitching identities across the client / server boundary —
 * we will pass this into Lemon Squeezy checkout metadata so server-side
 * `Order Placed` events (M4) carry the same device_id and Amplitude can
 * merge anonymous → identified user journeys without losing sessions.
 *
 * Returns `undefined` if the SDK has not been initialised yet.
 */
export function getAmplitudeDeviceId(): string | undefined {
  if (!initialized) return undefined;
  return amplitude.getDeviceId();
}
