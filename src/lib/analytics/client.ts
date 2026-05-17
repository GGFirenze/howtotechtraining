"use client";

import * as amplitude from "@amplitude/analytics-browser";
import { plugin as engagementPlugin } from "@amplitude/engagement-browser";
import { sessionReplayPlugin } from "@amplitude/plugin-session-replay-browser";

import {
  AMPLITUDE_AUTOCAPTURE,
  AMPLITUDE_FETCH_REMOTE_CONFIG,
  AMPLITUDE_FLUSH_INTERVAL_MS,
  AMPLITUDE_SERVER_ZONE,
  AMPLITUDE_SESSION_REPLAY_SAMPLE_RATE,
} from "./config";

let initialized = false;

/**
 * Initialise the Amplitude browser SDK with the configured plugins.
 *
 * Idempotent: subsequent calls are no-ops, so it is safe to render the
 * <AmplitudeInit /> component multiple times or remount during HMR.
 *
 * Behaviour:
 * - Returns immediately on the server (no `window`).
 * - When `NEXT_PUBLIC_AMPLITUDE_API_KEY` is missing, logs a single dev
 *   warning and stays silent — the rest of the app keeps working without
 *   analytics.
 * - When the key is present, registers the Session Replay and Engagement
 *   plugins *before* `init()` (the SDK requires plugins to be added prior
 *   to init for autocapture and remote config to apply to them) and then
 *   initialises with the project's autocapture flags.
 *
 * Consent gating: this function is *not* yet gated by a cookie banner.
 * Banner integration arrives with M9 (compliance). Until then, init runs
 * whenever the API key is present.
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

  amplitude.add(sessionReplayPlugin({ sampleRate: AMPLITUDE_SESSION_REPLAY_SAMPLE_RATE }));
  amplitude.add(engagementPlugin());

  amplitude.init(apiKey, {
    serverZone: AMPLITUDE_SERVER_ZONE,
    autocapture: AMPLITUDE_AUTOCAPTURE,
    fetchRemoteConfig: AMPLITUDE_FETCH_REMOTE_CONFIG,
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
