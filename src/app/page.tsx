import type { Metadata } from "next";

import { HomeStructuredData } from "@/components/seo/structured-data";
import { Author } from "@/components/site/author";
import { Faq } from "@/components/site/faq";
import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import { Hero } from "@/components/site/hero";
import { Pricing } from "@/components/site/pricing";
import { Promise as PromiseSection } from "@/components/site/promise";
import { TocPreview } from "@/components/site/toc-preview";
import { WhatsInside } from "@/components/site/whats-inside";

/**
 * Home page metadata. The default title/description live in
 * RootLayout, but we add an explicit canonical here so the version
 * with no trailing slash and no query params is treated as the
 * single source-of-truth URL by search engines. This matters
 * because the same page can be reached via several mediums (links
 * with query params for tracking, bookmarks, social shares) — we
 * want all of them to consolidate ranking signal on the bare URL.
 */
export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <>
      <HomeStructuredData />
      <Header />
      <main className="relative">
        <Hero />
        <PromiseSection />
        <WhatsInside />
        <TocPreview />
        <Author />
        <Pricing />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
