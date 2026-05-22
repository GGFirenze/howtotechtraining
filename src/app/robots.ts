import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://crackvilt.com";

/**
 * robots.txt is served from /robots.txt at runtime via Next.js
 * Metadata Routes. Using the typed config (instead of a static
 * file under public/) means the sitemap URL is always derived from
 * the same NEXT_PUBLIC_SITE_URL we use everywhere else — no risk of
 * a stale hardcoded host slipping into the file.
 *
 * Policy:
 *   - Crawlers may index the entire public site.
 *   - /api/ is disallowed: those routes are server-only handlers
 *     (Lemon Squeezy webhook today; more later) with no value to
 *     search engines and a small risk of accidental indexing of
 *     error responses.
 *   - The sitemap URL points crawlers at the structured list of
 *     canonical pages we generate from sitemap.ts.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: "/api/",
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
