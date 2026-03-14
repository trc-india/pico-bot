import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TrustBadges from "@/components/TrustBadges";
import MarqueeBanner from "@/components/MarqueeBanner";
import KitsSection from "@/components/KitsSection";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorks from "@/components/HowItWorks";
import VideoShowcase from "@/components/VideoShowcase";
import ReviewsSection from "@/components/ReviewsSection";
import ContactStrip from "@/components/ContactStrip";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div style={{ overflow: "clip", width: "100%", maxWidth: "100%", position: "relative" }}>
      <Navbar />
      <main>
        <HeroSection />
        <TrustBadges />
        <MarqueeBanner />
        <KitsSection />
        <FeaturesSection />
        <HowItWorks />
        <VideoShowcase />
        <ReviewsSection />
        <ContactStrip />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
