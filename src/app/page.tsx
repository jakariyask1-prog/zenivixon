import React from "react";
import { HeroSection } from "@/components/sections/HeroSection";
import { WhatWeDoSection } from "@/components/sections/WhatWeDoSection";
import { CapabilitiesSection } from "@/components/sections/CapabilitiesSection";
import { HowWeWorkSection } from "@/components/sections/HowWeWorkSection";
import { ProjectShowcaseSection } from "@/components/sections/ProjectShowcaseSection";
import { WhyZenivixonSection } from "@/components/sections/WhyZenivixonSection";
import { IntegrationsSection } from "@/components/sections/IntegrationsSection";
import { EngineeringStackSection } from "@/components/sections/EngineeringStackSection";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";
import { VideoShowcaseSection } from "@/components/sections/VideoShowcaseSection";
import { BeforeAfterComparisonSection } from "@/components/sections/BeforeAfterComparisonSection";
import { RoiCalculatorSection } from "@/components/sections/RoiCalculatorSection";
import { PilotSprintSection } from "@/components/sections/PilotSprintSection";

export default function HomePage() {
  return (
    <>
      {/* 01. Hero Section */}
      <div data-aos="fade-up">
        <HeroSection />
      </div>

      {/* 02. What We Do */}
      <div data-aos="fade-up">
        <WhatWeDoSection />
      </div>

      {/* 03. ⚡ Core Architecture & Engineering Stack Ecosystem */}
      <EngineeringStackSection />

      {/* 04. 🚀 Before vs After Workflow Transformation */}
      <div data-aos="fade-up">
        <BeforeAfterComparisonSection />
      </div>

      {/* 05. Capabilities (Mockups & Checklists) */}
      <div data-aos="fade-up">
        <CapabilitiesSection />
      </div>

      {/* 06. Integrations / Tech Stack */}
      <div data-aos="fade-up">
        <IntegrationsSection />
      </div>

      {/* 07. 💰 Interactive ROI & Cost-Savings Calculator */}
      <div data-aos="fade-up">
        <RoiCalculatorSection />
      </div>

      {/* 08. How We Work */}
      <div data-aos="fade-up">
        <HowWeWorkSection />
      </div>

      {/* 09. Project Showcase */}
      <div data-aos="fade-up">
        <ProjectShowcaseSection />
      </div>

      {/* 10. 🎬 Video Showcase + Animated Stats */}
      <div data-aos="fade-up">
        <VideoShowcaseSection />
      </div>

      {/* 11. 🛡️ NEW: 14-Day Pilot Sprint */}
      <div data-aos="fade-up">
        <PilotSprintSection />
      </div>

      {/* 12. Why ZENIVIXON */}
      <div data-aos="fade-up">
        <WhyZenivixonSection />
      </div>

      {/* 13. Final CTA */}
      <div data-aos="fade-up">
        <FinalCtaSection />
      </div>
    </>
  );
}
