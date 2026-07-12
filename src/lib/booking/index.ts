/**
 * Booking / intake URL helpers for the services section.
 *
 * The three service tiers on the site use different intake mechanisms:
 *
 *   - Strategy Call (£120)        → direct Lemon Squeezy checkout
 *                                    (low ticket, no scoping needed)
 *   - VILT Delivery Pack (£2,500) → Cal.com intro call
 *                                    (needs scoping, then invoice)
 *   - Train the Trainer (£3,000)  → Cal.com intro call
 *                                    (needs scoping, then invoice)
 *
 * Each URL is optional at build time: if the corresponding env var is
 * not set (e.g. before the Cal.com link is published, or before the
 * Strategy Call product is created in Lemon Squeezy), the CTA renders
 * in a graceful fallback state instead of throwing.
 *
 * All URLs are public — they end up in the rendered HTML — so they use
 * the NEXT_PUBLIC_ prefix.
 */

const RAW_CAL_URL = process.env.NEXT_PUBLIC_CAL_URL;
const RAW_STRATEGY_CHECKOUT = process.env.NEXT_PUBLIC_STRATEGY_CALL_CHECKOUT_URL;

/**
 * Fallback email address used when a booking URL is not yet configured.
 * We open the mail client with a subject line pre-filled so the lead is
 * still trivially convertible even in the degraded state.
 */
const FALLBACK_EMAIL = "info@crackvilt.com";

function trimmedOrNull(value: string | undefined): string | null {
  if (!value) return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

/**
 * The public Cal.com booking URL for scoping calls. Used by the two
 * higher tiers (Delivery Pack and Train the Trainer) so the buyer can
 * book a 15-minute intro before we agree scope and send an invoice.
 */
export function getCalIntroUrl(): string | null {
  return trimmedOrNull(RAW_CAL_URL);
}

export function isCalConfigured(): boolean {
  return getCalIntroUrl() !== null;
}

/**
 * The Lemon Squeezy direct-checkout URL for the £120 Strategy Call.
 * Kept separate from the £15 guide checkout because it is a distinct
 * product in Lemon Squeezy with its own tax category, fulfilment
 * (Cal.com link in the receipt), and pricing.
 */
export function getStrategyCallCheckoutUrl(): string | null {
  return trimmedOrNull(RAW_STRATEGY_CHECKOUT);
}

export function isStrategyCallConfigured(): boolean {
  return getStrategyCallCheckoutUrl() !== null;
}

/**
 * Build a `mailto:` link with a subject line tailored to the tier the
 * user was trying to reach. Used as the final fallback when neither
 * Cal.com nor the Strategy Call checkout are configured yet.
 */
export function buildEnquiryMailto(subject: string): string {
  const params = new URLSearchParams({ subject });
  return `mailto:${FALLBACK_EMAIL}?${params.toString()}`;
}

export const BOOKING_FALLBACK_EMAIL = FALLBACK_EMAIL;
