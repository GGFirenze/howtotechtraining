import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://crackvilt.com";

/**
 * sitemap.xml is served from /sitemap.xml at runtime via Next.js
 * Metadata Routes. Listed here are the canonical, indexable
 * top-level pages of the site. Anchored sections of the home page
 * (#author, #pricing, #faq, #whats-inside) are deliberately NOT
 * listed: search engines treat fragment URLs as the same canonical
 * URL as the host page, and listing them as separate sitemap
 * entries would split signal and confuse the canonicals.
 *
 * Priorities reflect intent rather than authority:
 *   - Home is the conversion page → 1.0
 *   - Legal pages exist for compliance and trust → 0.3 (still
 *     indexable, still part of the trust surface, but no goal of
 *     ranking them)
 *
 * lastModified should be a real date that changes when the page
 * content changes; we set it to the policies' "Latest update"
 * stamp for the legal pages, and to deploy time for the home page
 * (good enough for a small-cardinality site that redeploys often).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const lastLegalUpdate = new Date("2026-05-22");

  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: lastLegalUpdate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/cookies`,
      lastModified: lastLegalUpdate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
