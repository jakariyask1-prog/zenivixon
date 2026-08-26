import React from "react";
import { HeroSection } from "@/components/sections/HeroSection";
import { WhatWeDoSection } from "@/components/sections/WhatWeDoSection";
import { CoreSolutionsSection } from "@/components/sections/CoreSolutionsSection";
import { HowWeWorkSection } from "@/components/sections/HowWeWorkSection";
import { ProjectShowcaseSection } from "@/components/sections/ProjectShowcaseSection";
import { WhyZenivixonSection } from "@/components/sections/WhyZenivixonSection";
import { CapabilitiesSection } from "@/components/sections/CapabilitiesSection";
import { IntegrationsSection } from "@/components/sections/IntegrationsSection";
import { AutomationGatewaySection } from "@/components/sections/AutomationGatewaySection";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";

export default function HomePage() {
  return (
    <>
      {/* 01. Hero Section */}
      <HeroSection />

      {/* 02. What We Do */}
      <WhatWeDoSection />

      {/* 03. Capabilities (Mockups & Checklists) */}
      <CapabilitiesSection />

      {/* 04. How We Work */}
      <HowWeWorkSection />

      {/* Integrations / Tech Stack */}
      <IntegrationsSection />

      {/* 05. Project Showcase */}
      <ProjectShowcaseSection />

      {/* Automation Gateway CTA */}
      <AutomationGatewaySection />

      {/* 06. Why ZENIVIXON */}
      <WhyZenivixonSection />

      {/* 07. Final CTA */}
      <FinalCtaSection />
    </>
  );
}
