import { AboutSection } from "@/components/AboutSection";
import { Footer } from "@/components/Footer";
import { FaqSection } from "@/components/FaqSection";
import { FinalCta } from "@/components/FinalCta";
import { Hero } from "@/components/Hero";
import { MasterclassSection } from "@/components/MasterclassSection";
import { Navbar } from "@/components/Navbar";
import { PortfolioGrid } from "@/components/PortfolioGrid";
import { ReelTicker } from "@/components/ReelTicker";
import { ServicesSection } from "@/components/ServicesSection";

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <PortfolioGrid />
      <ReelTicker />
      <ServicesSection />
      <MasterclassSection />
      <AboutSection />
      <FaqSection />
      <FinalCta />
      <Footer />
    </main>
  );
}
