"use client";

import React, { useState } from "react";
import { HeroSection } from "@/components/sections/HeroSection";
import { WhatWeDoSection } from "@/components/sections/WhatWeDoSection";
import { CapabilitiesSection } from "@/components/sections/CapabilitiesSection";
import { HowWeWorkSection } from "@/components/sections/HowWeWorkSection";
import { ProjectShowcaseSection } from "@/components/sections/ProjectShowcaseSection";
import { WhyZenivixonSection } from "@/components/sections/WhyZenivixonSection";
import { IntegrationsSection } from "@/components/sections/IntegrationsSection";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";
import { VideoShowcaseSection } from "@/components/sections/VideoShowcaseSection";
import { BeforeAfterComparisonSection } from "@/components/sections/BeforeAfterComparisonSection";
import { RoiCalculatorSection } from "@/components/sections/RoiCalculatorSection";
import { PilotSprintSection } from "@/components/sections/PilotSprintSection";
import { FreeAuditModal } from "@/components/ui/FreeAuditModal";

export default function HomePage() {
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);

  const openAuditModal = () => setIsAuditModalOpen(true);
  const closeAuditModal = () => setIsAuditModalOpen(false);

  return (
    <>
      {/* 01. Hero Section */}
      <HeroSection />

      {/* 02. What We Do */}
      <WhatWeDoSection />

      {/* 03. 🚀 NEW: Before vs After Workflow Transformation */}
      <BeforeAfterComparisonSection />

      {/* 04. Capabilities (Mockups & Checklists) */}
      <CapabilitiesSection />

      {/* 05. Integrations / Tech Stack */}
      <IntegrationsSection />

      {/* 06. 💰 NEW: Interactive ROI & Cost-Savings Calculator */}
      <RoiCalculatorSection onOpenAuditModal={openAuditModal} />

      {/* 07. How We Work */}
      <HowWeWorkSection />

      {/* 08. Project Showcase */}
      <ProjectShowcaseSection />

      {/* 09. 🎬 Video Showcase + Animated Stats */}
      <VideoShowcaseSection />

      {/* 10. 🛡️ NEW: Zero-Risk 14-Day Pilot Sprint Guarantee */}
      <PilotSprintSection onOpenAuditModal={openAuditModal} />

      {/* 11. Why ZENIVIXON */}
      <WhyZenivixonSection />

      {/* 12. Final CTA */}
      <FinalCtaSection />

      {/* 🎁 Global 3-Minute Free Video Audit Modal */}
      <FreeAuditModal isOpen={isAuditModalOpen} onClose={closeAuditModal} />
    </>
  );
}
