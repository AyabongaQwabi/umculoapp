import { Suspense } from "react";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { RealWebsiteSection } from "@/components/RealWebsiteSection";
import { PricingSection } from "@/components/PricingSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { WhatsIncludedSection } from "@/components/WhatsIncludedSection";
import { SignupFormSection } from "@/components/SignupFormSection";
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
        <PricingSection />
        <Suspense fallback={null}>
          <SignupFormSection />
        </Suspense>
        <HowItWorksSection />
        <WhatsIncludedSection />
        <FaqSection />
      </main>
      <Footer />
    </>
  );
}
