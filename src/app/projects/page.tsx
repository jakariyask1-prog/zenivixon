import React from "react";
import { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { HumanVsAiBenchmarkSection } from "@/components/sections/HumanVsAiBenchmarkSection";
import { ProjectsCatalog } from "@/components/sections/ProjectsCatalog";
import { Button } from "@/components/ui/Button";
import { COMPANY_INFO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Projects & Case Studies | Real-World AI Systems in Production",
  description:
    "Explore ZENIVIXON's portfolio of deployed AI agents, intelligent document extraction pipelines, and enterprise software integrations.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        badge="ENTERPRISE PORTFOLIO"
        title="Real Work. Proven AI Systems."
        description="Explore our flagship engineering portfolio: deployed AI agents, intelligent workflow automation pipelines, and custom enterprise software integrations."
        breadcrumbs={[{ label: "Projects" }]}
      />

      {/* 🌟 01. Flagship Production Projects Catalog */}
      <section className="py-10 sm:py-14 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProjectsCatalog />
        </div>
      </section>

      {/* 📊 02. Technical Benchmark: Human vs Autonomous AI Performance (Edge-to-edge section with full background) */}
      <HumanVsAiBenchmarkSection />

      {/* 03. Bottom High-Conversion CTA */}
      <section className="py-14 sm:py-18 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-b from-[#F7F9FC] to-white dark:from-[#0b1120] dark:to-[#070d1d] border border-slate-200/90 dark:border-slate-800/90 p-6 sm:p-10 md:p-14 text-center space-y-6 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 inset-x-12 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
            <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#0F172A] dark:text-white font-heading tracking-tight">
              Have an Enterprise Workflow in Mind?
            </h3>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-xs sm:text-sm md:text-base leading-relaxed">
              Tell us about your requirements. We will analyze your operational bottlenecks and provide a concrete, production-grade implementation architecture.
            </p>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 pt-2">
              <Button variant="primary" size="lg" href="/start-a-project" className="shadow-lg shadow-blue-600/20 font-semibold text-xs sm:text-sm">
                Start Your AI Project
              </Button>
              <Button variant="whatsapp" size="lg" href={COMPANY_INFO.channels.whatsapp} external className="font-semibold text-xs sm:text-sm">
                Chat on WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
