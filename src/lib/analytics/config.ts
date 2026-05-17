/**
 * Shared Amplitude configuration used by both the browser and Node SDKs.
 *
 * Kept in one file so client and server stay aligned (server zone, tracking
 * defaults, flush behaviour). Anything that should be the same on both ends
 * goes here; anything client- or server-specific lives in client.ts /
 * server.ts.
 */

/**
 * Data residency. MUST match the region of the Amplitude project this
 * key belongs to — events sent to the wrong zone are dropped silently.
 *
 * Allowed values: "US" or "EU".
 */
export const AMPLITUDE_SERVER_ZONE = "US" as const;

/**
 * Default auto-tracking options for the browser SDK.
 *
 * We deliberately disable most auto-tracking and prefer explicit, typed
 * events. Auto-tracking creates noisy and inconsistent data which defeats
 * the purpose of a curated taxonomy.
 *
 * - sessions: keep on. Required for retention/funnel analyses.
 * - pageViews: off. We will track `Page Viewed` manually with explicit
 *   properties (page_path, referrer, utm_*).
 * - attribution: off. UTM and referrer captured manually as event/user
 *   properties on `Page Viewed`, in line with the curated approach.
 * - formInteractions: off. No forms on the landing yet.
 * - fileDownloads: off. PDF delivery is server-side via the webhook.
 */
export const AMPLITUDE_DEFAULT_TRACKING = {
  sessions: true,
  pageViews: false,
  attribution: false,
  formInteractions: false,
  fileDownloads: false,
} as const;

/**
 * How often (ms) the browser SDK flushes batched events to Amplitude.
 * 1000ms is a reasonable default — short enough that events appear quickly
 * during dev, long enough to batch network calls during heavy interaction.
 */
export const AMPLITUDE_FLUSH_INTERVAL_MS = 1000;
