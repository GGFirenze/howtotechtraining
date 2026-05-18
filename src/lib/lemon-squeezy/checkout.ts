import type { LemonSqueezyCustomData } from "./types";

/**
 * Returns true when a Lemon Squeezy checkout URL has been configured for
 * the current environment. When false, the Pricing CTA should render in
 * its disabled "Checkout opens at launch" state.
 */
export function isCheckoutConfigured(): boolean {
  // Inline env access so Next.js can statically replace it at build time
  // for the client bundle.
  return Boolean(process.env.NEXT_PUBLIC_LEMONSQUEEZY_CHECKOUT_URL);
}

/**
 * Build a Lemon Squeezy checkout URL with custom data appended via
 * `checkout[custom][key]=value` query params. LS echoes these back on the
 * webhook payload under `meta.custom_data`, which lets us stitch the
 * server-side `Order Placed` Amplitude event onto the same anonymous
 * device_id / session as the pre-purchase events.
 *
 * Returns null when no base URL is configured (i.e. during launch prep
 * before the LS shop is activated). Callers should guard accordingly.
 */
export function buildCheckoutUrl(custom?: LemonSqueezyCustomData): string | null {
  const base = process.env.NEXT_PUBLIC_LEMONSQUEEZY_CHECKOUT_URL;
  if (!base) return null;

  let url: URL;
  try {
    url = new URL(base);
  } catch {
    return null;
  }

  if (custom) {
    for (const [key, value] of Object.entries(custom)) {
      if (typeof value !== "string" || value.length === 0) continue;
      url.searchParams.set(`checkout[custom][${key}]`, value);
    }
  }

  return url.toString();
}
