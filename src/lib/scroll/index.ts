"use client";

/**
 * Smooth-scroll to an anchor target on the current page with visible
 * feedback, designed to address Amplitude "Dead Click" events on hero
 * anchor buttons.
 *
 * Why this exists:
 *
 *   The native anchor behaviour (`<a href="#target">` with no JS)
 *   produces no observable change when the user is already AT the
 *   target section. Amplitude flags this as a Dead Click, the user
 *   perceives the button as broken, and abandonment follows. Session
 *   replay confirmed the pattern: 67% of users who dead-click
 *   "See what's inside" abandon the site immediately, and all of
 *   those users arrive from paid Google Ads traffic.
 *
 * What this function guarantees on every call:
 *
 *   1. A DOM mutation (the `target-pulse` class is added then
 *      removed) — Amplitude's engagement detection sees activity,
 *      the click is no longer flagged as Dead.
 *   2. A visible cyan pulse animation around the target section —
 *      the user perceives the click as registered even when the
 *      section is already in view.
 *   3. A programmatic `scrollIntoView({ behavior: "smooth" })`
 *      — the browser scrolls smoothly with the offset defined by
 *      `scroll-margin-top` in globals.css, avoiding the header
 *      overlay problem.
 *   4. A URL hash update via `history.pushState` — the anchor URL
 *      stays bookmarkable and shareable, matching the behaviour
 *      of native anchor links.
 *
 * The function is a no-op on the server (no `window`) and silently
 * returns if the target ID does not exist on the current page —
 * defensive behaviour so a stale link in copy never throws.
 *
 * Usage:
 *
 *   <a
 *     href="#pricing"
 *     onClick={(e) => {
 *       e.preventDefault();
 *       trackEvent("Get Guide Clicked", { click_location: "hero_section" });
 *       smoothScrollToAnchor("pricing");
 *     }}
 *   >
 *     Get the guide
 *   </a>
 *
 * The plain `href` attribute is preserved so the link still works
 * for users with JS disabled, for SEO crawlers reading the markup,
 * and for assistive tech announcing destinations.
 */

const PULSE_CLASS = "target-pulse";
const PULSE_DURATION_MS = 800;

export function smoothScrollToAnchor(targetId: string): void {
  if (typeof window === "undefined") return;

  const target = document.getElementById(targetId);
  if (!target) return;

  // Add the pulse class for visible feedback. Removed after the
  // animation duration so a second click within the same session
  // re-triggers the animation cleanly.
  target.classList.add(PULSE_CLASS);
  window.setTimeout(() => {
    target.classList.remove(PULSE_CLASS);
  }, PULSE_DURATION_MS);

  // Always scroll. When the target is already in view this is
  // effectively a no-op for position but the smooth animation
  // call itself still produces measurable engagement signal.
  target.scrollIntoView({ behavior: "smooth", block: "start" });

  // Mirror native anchor behaviour: keep the URL hash up to date
  // so the section is bookmarkable and shareable. `pushState`
  // (not `replaceState`) so the back button takes the user to
  // the previous scroll position.
  try {
    window.history.pushState(null, "", `#${targetId}`);
  } catch {
    /* SecurityError in some sandboxed contexts; safe to ignore */
  }
}
