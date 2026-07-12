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

/**
 * Where on the page the user interacted with a navigational element.
 *
 * - hero_section: the hero CTAs at the top of the page
 * - nav_menu: the header nav at the top right
 * - footer: the link columns at the bottom of the page (Product section)
 * - pricing: the conversion CTA inside the pricing card itself
 * - services: the "Working with Giuliano" services section
 */
export type ClickLocation = "hero_section" | "nav_menu" | "footer" | "pricing" | "services";

/**
 * The three service tiers offered on the site.
 *
 * The values are chosen for readability in Amplitude — Snake case
 * survives grouping and copy/paste better than camel or spaces.
 */
export type ServiceTier = "strategy_call" | "delivery_pack" | "train_the_trainer";

/** Discriminated map: event name → required property shape. */
export type EventMap = {
  "Get Guide Clicked": { click_location: ClickLocation };
  "Whats Inside Clicked": { click_location: ClickLocation };
  "Author Clicked": { click_location: ClickLocation };
  "FAQ Clicked": { click_location: ClickLocation };
  "FAQ Expanded": { faq_name: string };
  "Services Clicked": { click_location: ClickLocation };
  "Service Tier Clicked": {
    tier: ServiceTier;
    /**
     * How the CTA was resolved at click time. Lets us split funnels for
     * "hot" tiers (checkout / calendar loaded) vs. "cold" tiers (email
     * fallback because the URL was not yet configured), which is a
     * meaningful distinction during early launch.
     */
    intake: "checkout" | "calendar" | "email";
  };
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
