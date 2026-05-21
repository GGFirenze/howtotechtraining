import Script from "next/script";

/**
 * Loads the Iubenda Privacy Controls and Cookie Solution banner plus
 * the embed-link helper.
 *
 * The widget URL bundles the cookie banner config, the auto-blocker, and
 * Google Consent Mode v2 setup into a single script. Iubenda's UI is
 * driven by the configuration stored under the widget UUID — we don't
 * need to inline any `_iub.csConfiguration` JSON here.
 *
 * The widget UUID corresponds to the author's Iubenda Privacy Controls
 * project (siteId 4538134, Cookie Policy 88166144). It's not secret —
 * it ends up in the page source for any visitor anyway.
 *
 * Loading strategy: `afterInteractive` for both scripts.
 *
 * Note on timing: ideally the banner would load `beforeInteractive` so
 * the auto-blocker can intercept third-party CDN scripts before they
 * execute. In Next.js App Router that strategy is not supported outside
 * `pages/_document.js` — and that constraint is acceptable here, because
 *
 *   1. The third-party trackers we care about (Amplitude, Session
 *      Replay, Engagement) are bundled via npm and live inside our own
 *      JS, so the auto-blocker's CDN-script interception wouldn't apply
 *      to them anyway.
 *   2. Our analytics layer (`<AmplitudeInit />` + `iubenda-consent.ts`)
 *      waits for the Iubenda runtime and only calls `amplitude.init()`
 *      once consent for the analytics purpose is granted. The consent
 *      gate is enforced at the call-site rather than via auto-blocking.
 *   3. The Iubenda widget runs in the same `afterInteractive` phase as
 *      the rest of the page bundle; AmplitudeInit polls for it and
 *      catches it within a few hundred milliseconds at worst.
 */
const IUBENDA_BANNER_WIDGET =
  "https://embeds.iubenda.com/widgets/c652d57e-04f2-47c1-b3b3-0d9116d03e06.js";

/**
 * Loads `cdn.iubenda.com/iubenda.js`, the helper script that converts
 * `<a class="iubenda-embed">` links into modal triggers when clicked.
 *
 * Used by the footer Privacy / Cookie Policy links so they open the
 * iubenda-hosted policies as in-page modals instead of navigating
 * away from crackvilt.com.
 */
const IUBENDA_EMBED_LOADER = "https://cdn.iubenda.com/iubenda.js";

export function IubendaBanner() {
  return (
    <>
      <Script id="iubenda-cs-banner" src={IUBENDA_BANNER_WIDGET} strategy="afterInteractive" />
      <Script id="iubenda-embed-loader" src={IUBENDA_EMBED_LOADER} strategy="afterInteractive" />
    </>
  );
}
