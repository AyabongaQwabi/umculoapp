import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { RealWebsiteSection } from "@/components/RealWebsiteSection";
import { ArtistSlotsSection } from "@/components/ArtistSlotsSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { WhatsIncludedSection } from "@/components/WhatsIncludedSection";
import { ApplySection } from "@/components/ApplySection";
import { FaqSection } from "@/components/FaqSection";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";

export default function HomePage() {
  return (
    <>
      <JsonLd />
      <Nav />
      <main id="main-content">
        <Hero />
        <RealWebsiteSection />
        <ArtistSlotsSection />
        <HowItWorksSection />
        <WhatsIncludedSection />
        <ApplySection />
        <FaqSection />
      </main>
      <Footer />
    </>
  );
}
