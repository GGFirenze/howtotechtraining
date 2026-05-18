import "server-only";

import * as amplitudeNode from "@amplitude/analytics-node";

import { AMPLITUDE_FLUSH_INTERVAL_MS, AMPLITUDE_SERVER_ZONE } from "./config";

let serverInitialized = false;

/**
 * Initialise the Amplitude Node SDK on first use.
 *
 * Returns `true` if Amplitude is ready to accept events, `false` if no API
 * key is configured (in which case server events should be silently
 * skipped so missing analytics never breaks a payment / email flow).
 */
function ensureServerInit(): boolean {
  if (serverInitialized) return true;

  // Same project API key used by the browser SDK — Amplitude has a single
  // project-wide ingestion key, so we read the same env var server-side.
  // Reading a NEXT_PUBLIC_-prefixed var on the server is fine; it just
  // means the value is also available to the browser bundle.
  const apiKey = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;
  if (!apiKey) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "[Amplitude] NEXT_PUBLIC_AMPLITUDE_API_KEY is not set — server events will be skipped.",
      );
    }
    return false;
  }

  amplitudeNode.init(apiKey, {
    serverZone: AMPLITUDE_SERVER_ZONE,
    flushIntervalMillis: AMPLITUDE_FLUSH_INTERVAL_MS,
  });

  serverInitialized = true;
  return true;
}

/**
 * Identifiers used to stitch a server-side event onto the right user
 * journey. At least one of `userId` / `deviceId` must be provided so
 * Amplitude can attach the event to the correct timeline.
 */
export type ServerEventIdentity = {
  userId?: string;
  deviceId?: string;
};

/**
 * Track an event from the server (route handler, webhook, cron job, …).
 *
 * Designed to be safe to call from anywhere: it never throws, and if
 * Amplitude is not configured it just no-ops. Callers do not have to
 * worry about analytics failure breaking their critical path.
 *
 * Will get exercised properly in M4 (webhook → `Order Placed`) once we
 * have a real taxonomy. Until then this is a typed shell waiting for use.
 */
export async function trackServerEvent({
  eventType,
  identity,
  eventProperties,
  userProperties,
}: {
  eventType: string;
  identity: ServerEventIdentity;
  eventProperties?: Record<string, unknown>;
  userProperties?: Record<string, unknown>;
}): Promise<void> {
  if (!ensureServerInit()) return;
  if (!identity.userId && !identity.deviceId) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        `[Amplitude] trackServerEvent('${eventType}') called without userId or deviceId — skipping.`,
      );
    }
    return;
  }

  try {
    await amplitudeNode.track(eventType, eventProperties, {
      user_id: identity.userId,
      device_id: identity.deviceId,
      user_properties: userProperties,
    } as amplitudeNode.Types.EventOptions).promise;
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.warn(`[Amplitude] failed to track '${eventType}':`, err);
    }
  }
}

/**
 * Force-flush any queued server events. Call at the end of a short-lived
 * request handler if you need the event to be sent before the function
 * returns (Lemon Squeezy webhook, for example).
 */
export async function flushServerEvents(): Promise<void> {
  if (!serverInitialized) return;
  try {
    await amplitudeNode.flush().promise;
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[Amplitude] flush failed:", err);
    }
  }
}
