"use client";

import * as amplitude from "@amplitude/analytics-browser";

/**
 * Curated event taxonomy for CrackVILT.
 *
 * Keeping the spec in TypeScript types (rather than runtime constants)
 * means every call site is compile-time checked: a typo in the event
 * name, a missing required property, or a property with the wrong type
 * all fail at build, not at production.
 *
 * To add a new event: add a key to `EventMap` below with its property
 * shape and `trackEvent` automatically picks it up.
 */

/** Where on the page the user interacted with a navigational element. */
export type ClickLocation = "hero_section" | "nav_menu";

/** Discriminated map: event name → required property shape. */
export type EventMap = {
  "Get Guide Clicked": { click_location: ClickLocation };
  "Whats Inside Clicked": { click_location: ClickLocation };
  "Author Clicked": { click_location: ClickLocation };
  "FAQ Clicked": { click_location: ClickLocation };
  "FAQ Expanded": { faq_name: string };
};

/** Union of every event name in the taxonomy. */
export type AnalyticsEventName = keyof EventMap;

/** Properties expected for a given event. */
export type AnalyticsEventProperties<N extends AnalyticsEventName> = EventMap[N];

/**
 * Track a curated event.
 *
 * Type-safe by construction:
 *   trackEvent("Get Guide Clicked", { click_location: "hero_section" }); // ok
 *   trackEvent("Get Guide Clicked", { click_location: "elsewhere" });    // ts error
 *   trackEvent("FAQ Expanded", { faq_name: "Format?" });                 // ok
 *   trackEvent("FAQ Expanded", { click_location: "nav_menu" });          // ts error
 *
 * Safe to call before Amplitude has been initialised: the underlying SDK
 * queues events and dispatches them once `amplitude.init(...)` has run.
 * Never throws — analytics failure can never break a user-facing flow.
 */
export function trackEvent<N extends AnalyticsEventName>(
  name: N,
  properties: AnalyticsEventProperties<N>,
): void {
  if (typeof window === "undefined") return;
  try {
    amplitude.track(name, properties);
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.warn(`[Amplitude] failed to track '${name}':`, err);
    }
  }
}
