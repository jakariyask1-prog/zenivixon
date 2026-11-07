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

      <div className="py-12 sm:py-16 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* 🌟 01. Flagship Production Projects Catalog (Clean, Neat & Attractive) */}
        <ProjectsCatalog />

        {/* 📊 02. Technical Benchmark: Human vs Autonomous AI Performance */}
        <div className="pt-8 border-t border-slate-200/80 dark:border-slate-800/80">
          <HumanVsAiBenchmarkSection />
        </div>

        {/* 03. Bottom High-Conversion CTA */}
        <div className="rounded-3xl bg-gradient-to-b from-[#F7F9FC] to-white dark:from-[#0b1120] dark:to-[#070d1d] border border-slate-200/90 dark:border-slate-800/90 p-8 sm:p-14 text-center space-y-6 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 inset-x-12 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] dark:text-white font-heading tracking-tight">
            Have an Enterprise Workflow in Mind?
          </h3>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Tell us about your requirements. We will analyze your operational bottlenecks and provide a concrete, production-grade implementation architecture.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Button variant="primary" size="lg" href="/start-a-project" className="shadow-lg shadow-blue-600/20 font-semibold">
              Start Your AI Project
            </Button>
            <Button variant="whatsapp" size="lg" href={COMPANY_INFO.channels.whatsapp} external className="font-semibold">
              Chat on WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
