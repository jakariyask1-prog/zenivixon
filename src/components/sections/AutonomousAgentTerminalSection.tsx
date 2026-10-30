"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Terminal,
  Cpu,
  Sparkles,
  CheckCircle2,
  Code2,
  Bot,
  Activity,
  ArrowRight,
} from "lucide-react";

interface ScopingTemplate {
  id: string;
  name: string;
  badge: string;
  clientInput: string;
  stack: string[];
  stages: {
    title: string;
    detail: string;
    status: string;
  }[];
  specOutput: {
    architecture: string;
    pilotDelivery: string;
    estimatedCostReduction: string;
    accuracyTarget: string;
  };
}

const SCOPING_TEMPLATES: ScopingTemplate[] = [
  {
    id: "support-agent",
    name: "Autonomous Support Agent",
    badge: "OMNICHANNEL BOT",
    clientInput: "Automate 5,000+ support tickets/month with Zendesk & Shopify sync.",
    stack: ["Claude 3.5 Sonnet", "Pinecone Vector RAG", "Zendesk API", "Shopify Webhooks"],
    stages: [
      {
        title: "Ingestion & RAG Indexing",
        detail: "Ingested 1,200 help-center docs & past solved tickets with vector embeddings.",
        status: "COMPLETED",
      },
      {
        title: "Deterministic Tool Guardrails",
        detail: "Restricted refund mutations to maximum $150 threshold without human approval.",
        status: "VERIFIED",
      },
      {
        title: "Sub-Second Latency Benchmark",
        detail: "Mean response latency verified at 680ms across 200 synthetic stress inquiries.",
        status: "OPTIMAL",
      },
      {
        title: "Pilot Readiness Handover",
        detail: "Zero downtime webhook listener ready for staging rollout in 10 business days.",
        status: "READY FOR SPRINT",
      },
    ],
    specOutput: {
      architecture: "Multi-Agent Supervisor + Tool Sandbox",
      pilotDelivery: "10-14 Business Days",
      estimatedCostReduction: "88% Less Rep Workload",
      accuracyTarget: "99.4% Factual Grounding",
    },
  },
  {
    id: "invoice-pipeline",
    name: "Financial Invoice Parser",
    badge: "ERP AUTOMATION",
    clientInput: "Extract line-items, tax & VAT from 400+ monthly vendor invoice PDFs into QuickBooks.",
    stack: ["Neural Vision OCR", "Pydantic Schema Validator", "QuickBooks Online SDK", "PostgreSQL"],
    stages: [
      {
        title: "Visual Layout & OCR Ingestion",
        detail: "Scanned table grids, multi-page line items, and varied vendor formatting.",
        status: "COMPLETED",
      },
      {
        title: "3-Way PO Deterministic Validation",
        detail: "Matched line totals against existing purchase orders with exact cent precision.",
        status: "VERIFIED",
      },
      {
        title: "ERP Ledger Auto-Drafting",
        detail: "Generated ledger journal entries with complete VAT attribution ready for audit.",
        status: "OPTIMAL",
      },
      {
        title: "Pilot Readiness Handover",
        detail: "Live webhook dispatch connected to QuickBooks sandbox in 8 business days.",
        status: "READY FOR SPRINT",
      },
    ],
    specOutput: {
      architecture: "Deterministic OCR + Schema Guardrail",
      pilotDelivery: "7-10 Business Days",
      estimatedCostReduction: "95% Reclaimed Accounting Hours",
      accuracyTarget: "99.98% Cent Precision",
    },
  },
  {
    id: "lead-enrichment",
    name: "Inbound Lead Qualification Engine",
    badge: "CRM ACCELERATOR",
    clientInput: "Qualify high-intent inbound demo leads within 60 seconds and auto-book sales calendars.",
    stack: ["Firmographic Enriched APIs", "ICP Scoring Agent", "HubSpot CRM", "Cal.com Webhook"],
    stages: [
      {
        title: "Instant Lead Webhook Trigger",
        detail: "Captured form fill from website and fetched Apollo/LinkedIn company data.",
        status: "COMPLETED",
      },
      {
        title: "ICP Scoring & Territory Routing",
        detail: "Calculated annual revenue fit ($5M+) and routed to Enterprise Account Executive.",
        status: "VERIFIED",
      },
      {
        title: "Hyper-Personalized First Touch",
        detail: "Synthesized tailored 3-bullet value brief and dispatched direct booking invite.",
        status: "OPTIMAL",
      },
      {
        title: "Pilot Readiness Handover",
        detail: "Full bi-directional HubSpot pipeline sync ready in 10 business days.",
        status: "READY FOR SPRINT",
      },
    ],
    specOutput: {
      architecture: "Event-Driven Enrichment & Dispatcher",
      pilotDelivery: "10 Business Days",
      estimatedCostReduction: "3.2x Faster Deal Velocity",
      accuracyTarget: "100% CRM Record Hygiene",
    },
  },
];

export function AutonomousAgentTerminalSection() {
  const [activeTemplateId, setActiveTemplateId] = useState<string>("support-agent");
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(3);

  const activeTemplate =
    SCOPING_TEMPLATES.find((t) => t.id === activeTemplateId) || SCOPING_TEMPLATES[0];

  // Auto-advance through templates every 7.5 seconds unless user hovers
  useEffect(() => {
    if (isHovered) return;

    const timer = setInterval(() => {
      setActiveTemplateId((prevId) => {
        const currIdx = SCOPING_TEMPLATES.findIndex((t) => t.id === prevId);
        const nextIdx = (currIdx + 1) % SCOPING_TEMPLATES.length;
        return SCOPING_TEMPLATES[nextIdx].id;
      });
    }, 7500);

    return () => clearInterval(timer);
  }, [isHovered]);

  // Perpetual stepped simulation when template changes
  useEffect(() => {
    let step = 0;
    const resetTimer = setTimeout(() => {
      setCurrentStepIndex(0);
    }, 0);

    const stepInterval = setInterval(() => {
      step += 1;
      if (step < 4) {
        setCurrentStepIndex(step);
      } else {
        clearInterval(stepInterval);
      }
    }, 900);

    return () => {
      clearTimeout(resetTimer);
      clearInterval(stepInterval);
    };
  }, [activeTemplateId]);

  return (
    <section
      id="ai-scoping-terminal"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="py-16 md:py-24 relative overflow-hidden bg-[#F8FAFC] dark:bg-[#060b17] border-y border-slate-200/80 dark:border-slate-800/80 transition-colors duration-300"
    >
      {/* Background Matrix & Subtle Cyber Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(#2563eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1d4ed8_1px,transparent_1px)] [background-size:28px_28px] opacity-[0.15] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-r from-blue-600/10 via-cyan-500/10 to-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100/80 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-widest font-heading mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 animate-pulse" />
            <span>LIVE ARCHITECTURE DISPATCHER</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0F172A] dark:text-white tracking-tight font-heading leading-tight">
            How We Architect Your AI Solution <br className="hidden sm:block" />
            <span className="text-gradient-animated">Before We Write A Single Line Of Code</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
            Every client brief runs through our structured engineering simulator. Watch our live dispatch terminal
            evaluate requirements, enforce guardrails, and specify concrete sprint deliverables.
          </p>

          {/* Scoping Template Selector Pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            <span className="text-xs font-heading font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mr-1">
              Simulate Architecture:
            </span>
            {SCOPING_TEMPLATES.map((tmpl) => {
              const isActive = tmpl.id === activeTemplateId;
              return (
                <button
                  key={tmpl.id}
                  onClick={() => setActiveTemplateId(tmpl.id)}
                  onMouseEnter={() => setActiveTemplateId(tmpl.id)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-heading font-semibold transition-all duration-300 flex items-center gap-2 border cursor-pointer ${
                    isActive
                      ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/25 scale-105"
                      : "bg-white dark:bg-[#0b1120] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500 hover:scale-102"
                  }`}
                >
                  <Bot className={`w-3.5 h-3.5 ${isActive ? "text-white" : "text-blue-500"}`} />
                  <span>{tmpl.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* INTERACTIVE MOTION-GRAPHIC TERMINAL & SPECIFICATION COCKPIT */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          {/* LEFT: LIVE RUNNING TERMINAL EMULATOR (7 cols) */}
          <div className="lg:col-span-7 rounded-3xl bg-[#030712] text-white border-2 border-slate-800 shadow-2xl p-5 sm:p-7 flex flex-col justify-between space-y-5 relative overflow-hidden font-mono group">
            {/* Ambient cyber line scanner */}
            <motion.div
              animate={{ y: ["0%", "100%"] }}
              transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
              className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-blue-500/5 via-cyan-500/10 to-transparent pointer-events-none"
            />

            <div className="space-y-4 relative z-10">
              {/* macOS Window Controls & Title Bar */}
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-xs text-slate-400 font-semibold flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                    zenivixon-dispatcher-v2.6
                  </span>
                </div>

                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-cyan-950/80 text-cyan-300 border border-cyan-800/80 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                  ONLINE
                </span>
              </div>

              {/* Client Intake Prompt */}
              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
                  <Activity className="w-3 h-3 text-blue-400" />
                  Client Requirement Brief:
                </span>
                <p className="text-xs text-cyan-200 leading-relaxed font-sans font-medium">
                  &ldquo;{activeTemplate.clientInput}&rdquo;
                </p>
              </div>

              {/* Stack Chips */}
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400">
                  Target Technology Integration:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeTemplate.stack.map((item, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-200 text-[11px] border border-slate-700/80"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Animated 4-Stage Scoping Pipeline */}
              <div className="space-y-2.5 pt-2">
                <span className="text-[10px] uppercase font-bold text-slate-400">
                  Autonomous Pre-Flight Scoping Verification:
                </span>
                <div className="space-y-2">
                  {activeTemplate.stages.map((stage, idx) => {
                    const isPassed = idx <= currentStepIndex;
                    return (
                      <div
                        key={idx}
                        className={`p-3 rounded-xl border transition-all duration-300 ${
                          isPassed
                            ? "bg-slate-900/80 border-cyan-500/40 text-slate-200"
                            : "bg-slate-950/40 border-slate-800/40 text-slate-600 opacity-40"
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs mb-1">
                          <div className="flex items-center gap-2">
                            {isPassed ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                            ) : (
                              <div className="w-3.5 h-3.5 rounded-full border border-slate-700 shrink-0" />
                            )}
                            <strong className="text-slate-100 font-semibold">{stage.title}</strong>
                          </div>
                          <span
                            className={`text-[9px] font-bold px-2 py-0.5 rounded ${
                              isPassed
                                ? "bg-cyan-500/20 text-cyan-300"
                                : "bg-slate-800 text-slate-500"
                            }`}
                          >
                            {stage.status}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 pl-5.5 font-sans leading-snug">
                          {stage.detail}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Terminal Footer */}
            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500 relative z-10">
              <span className="flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-blue-400" />
                Deterministic Validation Engine
              </span>
              <span className="text-cyan-400 font-bold">100% Type-Safe</span>
            </div>
          </div>

          {/* RIGHT: SPECIFICATION OUTPUT & ESTIMATES (5 cols) */}
          <div className="lg:col-span-5 rounded-3xl bg-white dark:bg-[#0b1120] border-2 border-blue-200 dark:border-blue-900/60 p-6 sm:p-8 shadow-xl shadow-blue-500/5 flex flex-col justify-between space-y-6 relative overflow-hidden group">
            <div className="space-y-6">
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-800 flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-xs">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase font-bold tracking-widest text-blue-600 dark:text-blue-400 block">
                      ARCHITECTURAL SPEC
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading">
                      Sprint Deliverables
                    </h3>
                  </div>
                </div>

                <span className="text-[11px] font-mono font-bold px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                  {activeTemplate.badge}
                </span>
              </div>

              {/* 4 Deliverable Value Badges */}
              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-1">
                  <span className="text-[10px] font-mono uppercase font-bold text-slate-500 dark:text-slate-400 block">
                    Core Architecture Model:
                  </span>
                  <div className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-heading">
                    {activeTemplate.specOutput.architecture}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/60 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase font-bold text-slate-600 dark:text-slate-400">
                      Pilot Working MVP Timeline:
                    </span>
                    <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                      Guaranteed Sprints
                    </span>
                  </div>
                  <div className="text-base sm:text-lg font-extrabold text-emerald-600 dark:text-emerald-400 font-heading">
                    {activeTemplate.specOutput.pilotDelivery}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-blue-50/50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/60 space-y-1">
                  <span className="text-[10px] font-mono uppercase font-bold text-slate-600 dark:text-slate-400 block">
                    Projected Impact:
                  </span>
                  <div className="text-base sm:text-lg font-extrabold text-blue-600 dark:text-blue-400 font-heading">
                    {activeTemplate.specOutput.estimatedCostReduction}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/60 space-y-1">
                  <span className="text-[10px] font-mono uppercase font-bold text-slate-600 dark:text-slate-400 block">
                    Target Verification Standard:
                  </span>
                  <div className="text-base sm:text-lg font-extrabold text-indigo-600 dark:text-indigo-400 font-heading">
                    {activeTemplate.specOutput.accuracyTarget}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Action Link */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
              <a
                href="#start-project-form"
                className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-heading font-semibold text-xs sm:text-sm shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Submit Your Requirements in Form Below</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <span className="text-[11px] text-center text-slate-500 dark:text-slate-400 block">
                Technical feasibility audit returned within 24 hours.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
