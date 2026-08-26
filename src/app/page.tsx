import React from "react";
import { HeroSection } from "@/components/sections/HeroSection";
import { WhatWeDoSection } from "@/components/sections/WhatWeDoSection";
import { CoreSolutionsSection } from "@/components/sections/CoreSolutionsSection";
import { HowWeWorkSection } from "@/components/sections/HowWeWorkSection";
import { ProjectShowcaseSection } from "@/components/sections/ProjectShowcaseSection";
import { WhyZenivixonSection } from "@/components/sections/WhyZenivixonSection";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";
import { IntegrationsSection } from "@/components/sections/IntegrationsSection";

export default function HomePage() {
  return (
    <>
      {/* 01. Hero Section */}
      <HeroSection />

      {/* 02. What We Do */}
      <WhatWeDoSection />

      {/* 03. Core Solutions */}
      <CoreSolutionsSection />

      {/* 04. How We Work */}
      <HowWeWorkSection />

      {/* Integrations / Tech Stack */}
      <IntegrationsSection />

      {/* 05. Project Showcase */}
      <ProjectShowcaseSection />

      {/* 06. Why ZENIVIXON */}
      <WhyZenivixonSection />

      {/* 07. Final CTA */}
      <FinalCtaSection />
    </>
  );
}
