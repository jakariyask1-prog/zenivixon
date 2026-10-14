import React, { Suspense } from "react";
import { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { StartProjectWizard } from "@/components/forms/StartProjectWizard";
import { AutonomousAgentTerminalSection } from "@/components/sections/AutonomousAgentTerminalSection";
import { MessageSquare, Loader2 } from "lucide-react";
import { COMPANY_INFO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Start a Project | Tell Us What You're Trying to Solve",
  description:
    "Submit your project brief to ZENIVIXON TECHNOLOGIES. Describe your operational bottleneck, current systems, and desired AI solution.",
};

export default function StartAProjectPage() {
  return (
    <>
      <PageHeader
        badge="PROJECT INTAKE"
        title="Tell Us What You're Trying to Solve."
        description="Share your current manual bottlenecks, workflows, or AI integration goals. We will review your systems and provide a structured technical approach."
        breadcrumbs={[{ label: "Start a Project" }]}
      />

      {/* Quick Jump Bar for Returning/Direct Visitors */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 mb-2 flex justify-end">
        <a
          href="#start-project-form"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/80 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors shadow-xs"
        >
          <span>Skip Simulator &amp; Fill Intake Form</span>
          <span>&darr;</span>
        </a>
      </div>

      {/* Live AI Architecture Dispatcher & Scoping Simulator */}
      <AutonomousAgentTerminalSection />

      <div id="start-project-form" className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Process Roadmap Explainer */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800 shadow-sm space-y-1.5">
            <span className="text-xs font-heading text-blue-600 font-bold">STAGE 01</span>
            <h4 className="text-xs font-bold text-[#0F172A] dark:text-white">Submit Project Brief</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">Describe the problem, tools, and budget.</p>
          </div>
          <div className="p-5 rounded-2xl bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800 shadow-sm space-y-1.5">
            <span className="text-xs font-heading text-cyan-600 font-bold">STAGE 02</span>
            <h4 className="text-xs font-bold text-[#0F172A] dark:text-white">Technical Audit</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">ZENIVIXON reviews workflow feasibility.</p>
          </div>
          <div className="p-5 rounded-2xl bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800 shadow-sm space-y-1.5">
            <span className="text-xs font-heading text-indigo-600 font-bold">STAGE 03</span>
            <h4 className="text-xs font-bold text-[#0F172A] dark:text-white">Architecture Proposal</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">Clear roadmap, deliverables, and timeline.</p>
          </div>
          <div className="p-5 rounded-2xl bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800 shadow-sm space-y-1.5">
            <span className="text-xs font-heading text-emerald-600 font-bold">STAGE 04</span>
            <h4 className="text-xs font-bold text-[#0F172A] dark:text-white">Engineering Kickoff</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">Sandbox build, validation, and live deploy.</p>
          </div>
        </div>

        {/* Multi-step Project Intake Wizard */}
        <Suspense
          fallback={
            <div className="p-12 text-center text-slate-500 flex items-center justify-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Loading Project Wizard...</span>
            </div>
          }
        >
          <StartProjectWizard />
        </Suspense>

        {/* Quick Fast-Track Notice */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800 max-w-xl mx-auto flex items-center justify-between gap-4 text-xs text-slate-600 dark:text-slate-400 shadow-sm">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Need an immediate consultation?</span>
          </div>
          <a
            href={COMPANY_INFO.channels.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-600 hover:underline font-bold"
          >
            Chat on WhatsApp &rarr;
          </a>
        </div>
      </div>
    </>
  );
}
