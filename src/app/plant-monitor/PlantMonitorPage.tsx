"use client";
import PlantNavbar from "./PlantNavbar";
import PlantHero from "./PlantHero";
import PlantInfoBanner from "./PlantInfoBanner";
import { PlantTrustBadges, PlantMarquee, PlantCTA, PlantContactStrip } from "./PlantSections";
import PlantComponents from "./PlantComponents";
import PlantFeatures from "./PlantFeatures";
import PlantHowItWorks from "./PlantHowItWorks";
import PlantGallery from "./PlantGallery";
import PlantFooter from "./PlantFooter";

export default function PlantMonitorPage() {
  return (
    <div style={{ overflow: "clip", width: "100%", maxWidth: "100%", position: "relative" }}>
      <PlantNavbar />
      <main>
        <PlantHero />
        <PlantInfoBanner />
        <PlantTrustBadges />
        <PlantMarquee />
        <PlantComponents />
        <PlantFeatures />
        <PlantHowItWorks />
        <PlantGallery />
        <PlantContactStrip />
        <PlantCTA />
      </main>
      <PlantFooter />
    </div>
  );
}
