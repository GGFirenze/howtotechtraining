/**
 * Shared Amplitude configuration used by both the browser and Node SDKs.
 *
 * Anything that should stay aligned across client and server (server zone,
 * flush behaviour) lives here. Client-only autocapture / plugin config also
 * lives here so it stays in one inspectable place.
 */

/**
 * Data residency. MUST match the region of the Amplitude project this
 * key belongs to — events sent to the wrong zone are dropped silently.
 *
 * Allowed values: "US" or "EU".
 */
export const AMPLITUDE_SERVER_ZONE = "US" as const;

/**
 * Browser-side autocapture configuration.
 *
 * Mirrors the explicit configuration the author wants applied at runtime,
 * matching the snippet they specified for the project. Each flag is
 * intentional:
 *
 * - attribution: capture UTM, referrer, and search engine source as user
 *   properties automatically.
 * - pageViews: emit a Page Viewed event on every route change.
 * - sessions: OFF — sessions are managed via the Session Replay plugin
 *   and any custom session logic; we do not want auto session_start /
 *   session_end events on top.
 * - formInteractions / fileDownloads / elementInteractions: OFF — would
 *   add noisy events not in the curated taxonomy.
 * - webVitals: capture Core Web Vitals (LCP, FID, CLS) so performance
 *   correlates with engagement.
 * - frustrationInteractions: capture rage clicks, dead clicks, error
 *   clicks — useful UX-friction signal.
 */
export const AMPLITUDE_AUTOCAPTURE = {
  attribution: true,
  pageViews: true,
  sessions: false,
  formInteractions: false,
  fileDownloads: false,
  elementInteractions: false,
  webVitals: true,
  frustrationInteractions: true,
} as const;

/**
 * If true, the SDK fetches remote configuration from the Amplitude project
 * on init (autocapture rules, sampling, etc., configured in the Amplitude
 * UI under Settings → Remote Config).
 *
 * Safe to leave true even when no remote config is set up: the SDK will
 * attempt to fetch and silently fall back to the local options above.
 */
export const AMPLITUDE_FETCH_REMOTE_CONFIG = true;

/**
 * Session Replay sample rate. 1 = capture every session. Lower this if
 * volumes grow and Session Replay quota becomes a concern.
 */
export const AMPLITUDE_SESSION_REPLAY_SAMPLE_RATE = 1;

/**
 * How often (ms) the SDKs flush batched events to Amplitude.
 * 1000ms is short enough that events appear quickly during dev, long
 * enough to batch network calls during heavy interaction.
 */
export const AMPLITUDE_FLUSH_INTERVAL_MS = 1000;
