/**
 * Schema.org JSON-LD payloads for the home page.
 *
 * We render four interlinked entities so search engines can understand
 * what the site is selling, who is selling it, and who wrote it:
 *
 *   - Book          → the guide itself (the product)
 *   - Person        → the author (Giuliano Giannini)
 *   - Organization  → the publisher (CrackVILT)
 *   - WebSite       → the site root, used by Google for sitelinks
 *                     search box and as a hub linking the above
 *
 * The Book schema is preferred over a generic Product because the
 * artefact is a 130-page written guide. Book is a recognised type
 * by Google's structured-data validators, and the `bookFormat:
 * EBook` field plus `Offer` price block lets eligible search results
 * display the price directly under the title in SERPs.
 *
 * @id values are stable URIs so the entities can be cross-referenced
 * across multiple JSON-LD blocks without ambiguity.
 *
 * Exported as a single component that emits one <script
 * type="application/ld+json"> block. Rendered server-side only — no
 * client JS, no hydration cost.
 */

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://crackvilt.com";

const PERSON_ID = `${SITE_URL}/#person-giuliano`;
const ORGANIZATION_ID = `${SITE_URL}/#organization-crackvilt`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const BOOK_ID = `${SITE_URL}/#book-crackvilt`;

export function HomeStructuredData() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": PERSON_ID,
        name: "Giuliano Giannini",
        url: `${SITE_URL}/#author`,
        image: `${SITE_URL}/brand/giuliano.png`,
        jobTitle: "Senior Customer Success Architect",
        description:
          "Technical Trainer in B2B Tech since 2020, transitioning to Senior Customer Success Architect in 2025. Has trained product teams worldwide — from VoIP at scale to SaaS onboarding to product analytics — and helped renew million-dollar accounts through training alone.",
        knowsAbout: [
          "Virtual Instructor-Led Training",
          "Technical Training",
          "Customer Success",
          "Product Analytics",
          "SaaS Onboarding",
        ],
      },
      {
        "@type": "Organization",
        "@id": ORGANIZATION_ID,
        name: "CrackVILT",
        url: SITE_URL,
        logo: `${SITE_URL}/brand/logo.png`,
        founder: { "@id": PERSON_ID },
        email: "info@crackvilt.com",
        sameAs: [],
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: SITE_URL,
        name: "CrackVILT",
        publisher: { "@id": ORGANIZATION_ID },
        inLanguage: "en-GB",
      },
      {
        "@type": "Book",
        "@id": BOOK_ID,
        name: "CrackVILT — Crack the secret to a successful VILT session",
        alternateName: "The Technical Trainer's Playbook",
        bookFormat: "https://schema.org/EBook",
        numberOfPages: 130,
        inLanguage: "en",
        author: { "@id": PERSON_ID },
        publisher: { "@id": ORGANIZATION_ID },
        url: SITE_URL,
        image: `${SITE_URL}/opengraph-image.png`,
        description:
          "The 130-page practical guide to designing and delivering Virtual Instructor-Led Training that actually sticks — for engineers, dev advocates, technical trainers, and consultants who teach live.",
        about: [
          "Virtual Instructor-Led Training",
          "Training Design",
          "Training Delivery",
          "Technical Training",
        ],
        offers: {
          "@type": "Offer",
          price: "29.00",
          priceCurrency: "GBP",
          availability: "https://schema.org/InStock",
          url: SITE_URL,
          seller: { "@id": ORGANIZATION_ID },
          category: "DigitalProduct",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
