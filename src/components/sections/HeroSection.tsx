import React from "react";
import Image from "next/image";
import { ArrowRight, Database, Bot, Cpu, TrendingUp, CheckCircle2, ArrowUpRight, Sparkles, Globe, Headphones } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden bg-[#FCFDFE]">
      {/* Background Subtle Depth Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_10%,#000_70%,transparent_100%)] opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-6">
          {/* Enhanced Premium Eyebrow Badge */}
          <div className="inline-flex items-center gap-2.5 px-5 py-2 sm:px-6 sm:py-2.5 rounded-full bg-blue-50/90 border border-blue-200/90 text-blue-800 shadow-sm shadow-blue-500/10 hover:border-blue-300 transition-all">
            <div className="w-5 h-5 rounded-full bg-blue-600/10 flex items-center justify-center text-blue-600">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs sm:text-sm font-bold uppercase tracking-widest font-heading">
              AI-FIRST TECHNOLOGY COMPANY
            </span>
          </div>

          {/* Locked Core Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0F172A] tracking-tight leading-[1.15] font-heading">
            Automate Your Business. Engage Customers 24/7. Scale with AI.
          </h1>

          {/* Core Message / Subheadline */}
          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl leading-relaxed font-normal">
            ZENIVIXON builds high-performance <strong>modern web applications</strong>, <strong>intelligent workflow automations</strong>, <strong>24/7 AI customer support agents</strong>, and custom integrations that connect seamlessly into your existing business software.
          </p>

          {/* Locked Conversion CTAs */}
          <div className="pt-4 flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto">
            <Button
              variant="primary"
              size="lg"
              href="/start-a-project"
              icon={<ArrowRight className="w-4 h-4" />}
              className="w-full sm:w-auto text-base px-8 py-4 shadow-lg shadow-blue-600/20 font-semibold"
            >
              Start Your AI Project
            </Button>
            <Button
              variant="secondary"
              size="lg"
              href="/solutions"
              icon={<ArrowUpRight className="w-4 h-4" />}
              className="w-full sm:w-auto text-base px-7 py-4 text-slate-700 font-semibold"
            >
              Explore Solutions
            </Button>
          </div>

          {/* Trust & Focus Pillars */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-y-3 gap-x-6 text-xs sm:text-sm text-slate-600 font-medium">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Modern Web &amp; App Development</span>
            </div>
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-600 shrink-0" />
              <span>AI Workflow Automation</span>
            </div>
            <div className="flex items-center gap-2">
              <Headphones className="w-4 h-4 text-indigo-600 shrink-0" />
              <span>24/7 AI Customer Support</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Existing System Integration</span>
            </div>
          </div>
        </div>

        {/* Premium Cover Photo Section */}
        <div className="mt-16 w-full max-w-6xl mx-auto rounded-3xl overflow-hidden shadow-2xl shadow-blue-900/10 border border-slate-200/60 group relative">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />
          <Image
            src="/cover-photo.png"
            alt="ZENIVIXON Platform Integration"
            width={1200}
            height={675}
            className="w-full h-auto object-cover transform group-hover:scale-[1.02] transition-transform duration-700 ease-in-out"
            priority
          />
        </div>

        {/* Premium System Flow Visualization: Business Systems → AI → Automation → Outcome */}
        <div className="mt-20 md:mt-28 max-w-5xl mx-auto">
          <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-7 md:p-8 shadow-xl shadow-slate-200/50">
            {/* Top Bar Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-100 pb-4 mb-6 gap-2">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                <span className="text-xs font-heading text-slate-500 ml-2 font-medium">
                  enterprise_transformation_architecture
                </span>
              </div>
              <div className="text-xs font-heading text-cyan-700 bg-cyan-50 px-2.5 py-1 rounded-full border border-cyan-200 font-semibold">
                SYSTEM TOPOLOGY: DETERMINISTIC
              </div>
            </div>

            {/* 4-Stage Connected Pipeline Flow */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-0 relative">
              {/* Stage 1: Business Systems */}
              <div className="relative">
                <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200 flex flex-col justify-between hover:bg-white hover:border-slate-300 hover:shadow-sm transition-all duration-200">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-heading text-slate-500 font-bold uppercase tracking-widest">
                        Stage 01
                      </span>
                      <div className="w-8 h-8 rounded-lg bg-slate-200/70 flex items-center justify-center text-slate-700">
                        <Database className="w-4 h-4" />
                      </div>
                    </div>
                    <h3 className="text-sm font-bold text-[#0F172A] font-heading">
                      Business Systems
                    </h3>
                    <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                      Existing CRMs, ERPs, databases, websites, customer support inboxes, and APIs.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-200/80 text-xs font-heading text-slate-600 font-medium">
                    &bull; Zero Disruption to Stack
                  </div>
                </div>
                {/* Arrow Connector → */}
                <div className="hidden md:flex absolute -right-3.5 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-white border border-slate-200 shadow-sm items-center justify-center text-xs text-cyan-600 font-bold">
                  →
                </div>
                {/* Mobile down arrow */}
                <div className="md:hidden flex justify-center py-2 text-cyan-600 text-sm font-bold">↓</div>
              </div>

              {/* Stage 2: AI Intelligence */}
              <div className="relative">
                <div className="p-5 rounded-2xl bg-blue-50/50 border border-blue-200 flex flex-col justify-between hover:bg-blue-50/80 hover:border-blue-300 hover:shadow-sm transition-all duration-200">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-heading text-blue-700 font-bold uppercase tracking-widest">
                        Stage 02
                      </span>
                      <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-700">
                        <Bot className="w-4 h-4" />
                      </div>
                    </div>
                    <h3 className="text-sm font-bold text-[#0F172A] font-heading">
                      AI Intelligence
                    </h3>
                    <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                      Support agents, multi-model reasoning, web interfaces, and validation schemas.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-blue-200/80 text-xs font-heading text-blue-700 font-semibold">
                    &bull; 24/7 Context &amp; Triage
                  </div>
                </div>
                {/* Arrow Connector → */}
                <div className="hidden md:flex absolute -right-3.5 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-white border border-blue-200 shadow-sm items-center justify-center text-xs text-cyan-600 font-bold">
                  →
                </div>
                <div className="md:hidden flex justify-center py-2 text-cyan-600 text-sm font-bold">↓</div>
              </div>

              {/* Stage 3: Automation */}
              <div className="relative">
                <div className="p-5 rounded-2xl bg-cyan-50/50 border border-cyan-200 flex flex-col justify-between hover:bg-cyan-50/80 hover:border-cyan-300 hover:shadow-sm transition-all duration-200">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-heading text-cyan-700 font-bold uppercase tracking-widest">
                        Stage 03
                      </span>
                      <div className="w-8 h-8 rounded-lg bg-cyan-100 flex items-center justify-center text-cyan-700">
                        <Cpu className="w-4 h-4" />
                      </div>
                    </div>
                    <h3 className="text-sm font-bold text-[#0F172A] font-heading">
                      Automation
                    </h3>
                    <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                      Automated document parsing, ERP sync, email replies, and webhook routing.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-cyan-200/80 text-xs font-heading text-cyan-800 font-semibold">
                    &bull; Continuous Execution
                  </div>
                </div>
                {/* Arrow Connector → */}
                <div className="hidden md:flex absolute -right-3.5 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-white border border-cyan-200 shadow-sm items-center justify-center text-xs text-cyan-600 font-bold">
                  →
                </div>
                <div className="md:hidden flex justify-center py-2 text-cyan-600 text-sm font-bold">↓</div>
              </div>

              {/* Stage 4: Measurable Outcome */}
              <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-200 flex flex-col justify-between hover:bg-emerald-50/80 hover:border-emerald-300 hover:shadow-sm transition-all duration-200">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-heading text-emerald-700 font-bold uppercase tracking-widest">
                      Stage 04
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700">
                      <TrendingUp className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="text-sm font-bold text-[#0F172A] font-heading">
                    Business Outcome
                  </h3>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    Sub-minute customer support, zero manual rekeying, and modern web software.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-emerald-200/80 text-xs font-heading text-emerald-700 font-semibold">
                  &bull; Scalable Business Advantage
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
