import React from "react";
import dynamic from "next/dynamic";
import { HeroSection } from "@/components/sections/HeroSection";

// High-performance dynamic code splitting: Below-the-fold sections load asynchronously
const AgentSimulatorSection = dynamic(
  () => import("@/components/sections/AgentSimulatorSection").then((m) => m.AgentSimulatorSection)
);
const WhatWeDoSection = dynamic(
  () => import("@/components/sections/WhatWeDoSection").then((m) => m.WhatWeDoSection)
);
const EngineeringStackSection = dynamic(
  () => import("@/components/sections/EngineeringStackSection").then((m) => m.EngineeringStackSection)
);
const BeforeAfterComparisonSection = dynamic(
  () => import("@/components/sections/BeforeAfterComparisonSection").then((m) => m.BeforeAfterComparisonSection)
);
const RoiCalculatorSection = dynamic(
  () => import("@/components/sections/RoiCalculatorSection").then((m) => m.RoiCalculatorSection)
);
const HowWeWorkSection = dynamic(
  () => import("@/components/sections/HowWeWorkSection").then((m) => m.HowWeWorkSection)
);
const ProjectShowcaseSection = dynamic(
  () => import("@/components/sections/ProjectShowcaseSection").then((m) => m.ProjectShowcaseSection)
);
const VideoShowcaseSection = dynamic(
  () => import("@/components/sections/VideoShowcaseSection").then((m) => m.VideoShowcaseSection)
);
const PilotSprintSection = dynamic(
  () => import("@/components/sections/PilotSprintSection").then((m) => m.PilotSprintSection)
);
const WhyZenivixonSection = dynamic(
  () => import("@/components/sections/WhyZenivixonSection").then((m) => m.WhyZenivixonSection)
);
const FinalCtaSection = dynamic(
  () => import("@/components/sections/FinalCtaSection").then((m) => m.FinalCtaSection)
);

export default function HomePage() {
  return (
    <>
      {/* 01. Hero Section (Immediate Above-the-fold Render) */}
      <HeroSection />

      {/* 02. 🤖 Interactive Live AI Agent Simulator */}
      <AgentSimulatorSection />

      {/* 03. What We Do */}
      <div data-aos="fade-up">
        <WhatWeDoSection />
      </div>

      {/* 04. ⚡ Core Architecture & Engineering Stack Ecosystem */}
      <EngineeringStackSection />

      {/* 05. 🚀 Before vs After Workflow Transformation */}
      <div data-aos="fade-up">
        <BeforeAfterComparisonSection />
      </div>

      {/* 06. 💰 Interactive ROI & Cost-Savings Calculator */}
      <div data-aos="fade-up">
        <RoiCalculatorSection />
      </div>

      {/* 07. How We Work */}
      <div data-aos="fade-up">
        <HowWeWorkSection />
      </div>

      {/* 08. Project Showcase */}
      <div data-aos="fade-up">
        <ProjectShowcaseSection />
      </div>

      {/* 09. 🎬 Video Showcase + Animated Stats */}
      <div data-aos="fade-up">
        <VideoShowcaseSection />
      </div>

      {/* 10. 🛡️ 7-Day Pilot Sprint */}
      <div data-aos="fade-up">
        <PilotSprintSection />
      </div>

      {/* 11. Why ZENIVIXON */}
      <div data-aos="fade-up">
        <WhyZenivixonSection />
      </div>

      {/* 12. Final CTA */}
      <div data-aos="fade-up">
        <FinalCtaSection />
      </div>
    </>
  );
}
