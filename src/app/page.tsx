import { Author } from "@/components/site/author";
import { Faq } from "@/components/site/faq";
import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import { Hero } from "@/components/site/hero";
import { Pricing } from "@/components/site/pricing";
import { Promise as PromiseSection } from "@/components/site/promise";
import { TocPreview } from "@/components/site/toc-preview";
import { WhatsInside } from "@/components/site/whats-inside";

export default function Home() {
  return (
    <>
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
