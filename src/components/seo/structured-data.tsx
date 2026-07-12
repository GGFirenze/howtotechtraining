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
const SERVICE_STRATEGY_ID = `${SITE_URL}/#service-strategy-call`;
const SERVICE_DELIVERY_ID = `${SITE_URL}/#service-vilt-delivery-pack`;
const SERVICE_T3_ID = `${SITE_URL}/#service-train-the-trainer`;

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
          "Technical Trainer in B2B Tech since 2020, transitioning to Senior Customer Success Architect in 2025. Has trained product teams worldwide, from VoIP at scale through SaaS onboarding to product analytics, helping renew million-dollar accounts through training alone.",
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
          "The 130-page practical guide to designing and delivering Virtual Instructor-Led Training that actually sticks. Built for engineers, dev advocates, technical trainers, and consultants who teach live.",
        about: [
          "Virtual Instructor-Led Training",
          "Training Design",
          "Training Delivery",
          "Technical Training",
        ],
        offers: {
          "@type": "Offer",
          price: "15.00",
          priceCurrency: "GBP",
          availability: "https://schema.org/InStock",
          url: SITE_URL,
          seller: { "@id": ORGANIZATION_ID },
          category: "DigitalProduct",
        },
      },
      /*
       * Consulting service tiers. We model them as schema.org Service
       * entities rather than Products because they are delivered live
       * (not shipped) and priced per engagement. Each carries an Offer
       * so eligible SERPs (and AI overviews) can surface the price.
       *
       * `areaServed: "GB"` reflects the fact that the invoicing entity
       * is UK-based; delivery itself is remote-first, so international
       * clients are welcome — the area is a business/tax hint, not a
       * geographic restriction.
       */
      {
        "@type": "Service",
        "@id": SERVICE_STRATEGY_ID,
        name: "Strategy Call",
        serviceType: "Consulting",
        provider: { "@id": ORGANIZATION_ID },
        areaServed: "GB",
        url: `${SITE_URL}/#services`,
        description:
          "A focused 60-minute call to unblock one specific technical-training problem — a struggling session, a curriculum review, or the design of a first VILT — with a written recap of action items delivered within 48 hours.",
        offers: {
          "@type": "Offer",
          price: "120.00",
          priceCurrency: "GBP",
          availability: "https://schema.org/InStock",
          url: `${SITE_URL}/#services`,
          seller: { "@id": ORGANIZATION_ID },
          category: "ProfessionalService",
        },
      },
      {
        "@type": "Service",
        "@id": SERVICE_DELIVERY_ID,
        name: "VILT Delivery Pack",
        serviceType: "Training Delivery",
        provider: { "@id": ORGANIZATION_ID },
        areaServed: "GB",
        url: `${SITE_URL}/#services`,
        description:
          "End-to-end delivery of one of your training programmes: scoping, content adaptation, dry run, one full-day virtual workshop for up to 20 participants, branded slides and workbook, plus two recap calls within four weeks.",
        offers: {
          "@type": "Offer",
          price: "2500.00",
          priceCurrency: "GBP",
          availability: "https://schema.org/InStock",
          url: `${SITE_URL}/#services`,
          seller: { "@id": ORGANIZATION_ID },
          category: "ProfessionalService",
        },
      },
      {
        "@type": "Service",
        "@id": SERVICE_T3_ID,
        name: "Train the Trainer",
        serviceType: "Professional Development",
        provider: { "@id": ORGANIZATION_ID },
        areaServed: "GB",
        url: `${SITE_URL}/#services`,
        description:
          "A two-day live programme that trains up to six of your in-house trainers on the CrackVILT method. Includes one 60-minute follow-up call at four weeks, a shadowing session on a real delivery with written feedback, and internal-use rights to the playbook and session templates.",
        offers: {
          "@type": "Offer",
          price: "3000.00",
          priceCurrency: "GBP",
          availability: "https://schema.org/InStock",
          url: `${SITE_URL}/#services`,
          seller: { "@id": ORGANIZATION_ID },
          category: "ProfessionalService",
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
