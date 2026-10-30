import React from "react";
import { HeroSection } from "@/components/sections/HeroSection";
import { AgentSimulatorSection } from "@/components/sections/AgentSimulatorSection";
import { WhatWeDoSection } from "@/components/sections/WhatWeDoSection";
import { HowWeWorkSection } from "@/components/sections/HowWeWorkSection";
import { ProjectShowcaseSection } from "@/components/sections/ProjectShowcaseSection";
import { WhyZenivixonSection } from "@/components/sections/WhyZenivixonSection";
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
      <HeroSection />

      {/* 02. 🤖 Interactive Live AI Agent Simulator */}
      <AgentSimulatorSection />

      {/* 03. What We Do */}
      <div data-aos="fade-up">
        <WhatWeDoSection />
      </div>

      {/* 03. ⚡ Core Architecture & Engineering Stack Ecosystem */}
      <EngineeringStackSection />

      {/* 04. 🚀 Before vs After Workflow Transformation */}
      <div data-aos="fade-up">
        <BeforeAfterComparisonSection />
      </div>

      {/* 05. 💰 Interactive ROI & Cost-Savings Calculator */}
      <div data-aos="fade-up">
        <RoiCalculatorSection />
      </div>

      {/* 06. How We Work */}
      <div data-aos="fade-up">
        <HowWeWorkSection />
      </div>

      {/* 07. Project Showcase */}
      <div data-aos="fade-up">
        <ProjectShowcaseSection />
      </div>

      {/* 08. 🎬 Video Showcase + Animated Stats */}
      <div data-aos="fade-up">
        <VideoShowcaseSection />
      </div>

      {/* 09. 🛡️ 7-Day Pilot Sprint */}
      <div data-aos="fade-up">
        <PilotSprintSection />
      </div>

      {/* 10. Why ZENIVIXON */}
      <div data-aos="fade-up">
        <WhyZenivixonSection />
      </div>

      {/* 11. Final CTA */}
      <div data-aos="fade-up">
        <FinalCtaSection />
      </div>
    </>
  );
}
