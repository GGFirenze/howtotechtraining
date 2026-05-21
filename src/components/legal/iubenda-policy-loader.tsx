import Script from "next/script";

/**
 * Loads `cdn.iubenda.com/iubenda.js`, the helper script that converts
 * `<a class="iubenda-embed">` links into modal triggers when clicked.
 *
 * Used by:
 *   - the footer Privacy / Cookie Policy links
 *   - the inline "cookie policy" link inside our custom CookieBanner
 *
 * so the legal documents (which still live on Iubenda) open as in-page
 * modals instead of full-page navigations away from crackvilt.com.
 *
 * History note: this file used to also include the Iubenda Privacy
 * Controls (cookie banner) widget script. We replaced that with a
 * custom CookieBanner component because the Iubenda banner had a
 * UI bug where the banner did not visually close after Accept — the
 * consent was correctly persisted, but the `iubenda-cs-visible` class
 * stayed on the DOM (likely a CSS / animation interaction with our
 * root `<body class='flex flex-col'>` layout). Multiple workarounds
 * (event subscription, polling) failed to fix it reliably, so we
 * dropped Iubenda for the banner and kept it only for the policies.
 *
 * The Iubenda subscription is therefore still useful — the Privacy
 * Policy and Cookie Policy documents themselves are auto-generated and
 * auto-updated by Iubenda, which is the part that's hard to replicate.
 */
const IUBENDA_EMBED_LOADER = "https://cdn.iubenda.com/iubenda.js";

export function IubendaPolicyLoader() {
  return (
    <Script id="iubenda-embed-loader" src={IUBENDA_EMBED_LOADER} strategy="afterInteractive" />
  );
}
