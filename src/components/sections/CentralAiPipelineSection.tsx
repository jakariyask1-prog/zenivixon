"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Cpu,
  Sparkles,
  MessageSquare,
  FileSpreadsheet,
  Database,
  Send,
  CheckCircle2,
  TrendingUp,
  Activity,
} from "lucide-react";

interface PipelineStream {
  id: string;
  name: string;
  shortLabel: string;
  color: string;
  accentHex: string;
  source: {
    title: string;
    sub: string;
    icon: React.ReactNode;
    samplePayload: string;
  };
  processing: {
    agentName: string;
    engine: string;
    latency: string;
    validation: string;
  };
  destination: {
    title: string;
    sub: string;
    icon: React.ReactNode;
    outcomeMetric: string;
  };
}

const PIPELINE_STREAMS: PipelineStream[] = [
  {
    id: "support-stream",
    name: "Customer Support & Triage Highway",
    shortLabel: "24/7 Support Agent",
    color: "blue",
    accentHex: "#3B82F6",
    source: {
      title: "Inbound Customer Chat",
      sub: "WhatsApp, Intercom, Web",
      icon: <MessageSquare className="w-5 h-5 text-blue-500" />,
      samplePayload: '"API rate limit hit during flash sale. Need emergency bump."',
    },
    processing: {
      agentName: "Autonomous Triage Agent",
      engine: "LangGraph + Qdrant Vector RAG",
      latency: "380ms",
      validation: "Pydantic SLA Guardrail Verified",
    },
    destination: {
      title: "Instant Resolution & CRM Sync",
      sub: "WhatsApp Dispatch + HubSpot",
      icon: <Send className="w-5 h-5 text-emerald-500" />,
      outcomeMetric: "Resolved in 0.8s • Zero Human Rep",
    },
  },
  {
    id: "invoice-stream",
    name: "Intelligent Document & Invoice Flow",
    shortLabel: "Invoice Pipeline",
    color: "cyan",
    accentHex: "#06B6D4",
    source: {
      title: "Supplier PDF & Scans",
      sub: "Billing Inbox & Shared Drive",
      icon: <FileSpreadsheet className="w-5 h-5 text-cyan-500" />,
      samplePayload: "Vendor Invoice #INV-8419 with 48 lines, VAT & IBAN details",
    },
    processing: {
      agentName: "Multi-Modal Extraction Engine",
      engine: "LayoutLM + Python Deterministic Validator",
      latency: "840ms",
      validation: "100% Math Reconciliation vs Contract",
    },
    destination: {
      title: "ERP & Accounting Ledger",
      sub: "SAP, QuickBooks, Xero",
      icon: <Database className="w-5 h-5 text-blue-500" />,
      outcomeMetric: "$28,450.00 Reconciled & Queued",
    },
  },
  {
    id: "crm-stream",
    name: "Inbound Lead Qualification & Routing",
    shortLabel: "Lead Qualification",
    color: "indigo",
    accentHex: "#6366F1",
    source: {
      title: "Web Intake Form / Demo Request",
      sub: "Landing Page & High-Intent Visitors",
      icon: <TrendingUp className="w-5 h-5 text-indigo-500" />,
      samplePayload: 'VP of Eng @ 450-person SaaS: "Looking for multi-agent support"',
    },
    processing: {
      agentName: "Firmographic Enrichment Agent",
      engine: "Apollo / Clearbit + ICP Scorer",
      latency: "460ms",
      validation: "Enterprise Score: 98/100 (Tier-1 Fit)",
    },
    destination: {
      title: "Executive Calendar & Deal Stage",
      sub: "HubSpot Deal + Slack Hot-Alert",
      icon: <CheckCircle2 className="w-5 h-5 text-purple-500" />,
      outcomeMetric: "Discovery call booked in <60s",
    },
  },
];

export function CentralAiPipelineSection() {
  const [activeStreamId, setActiveStreamId] = useState<string>("support-stream");
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const activeStream =
    PIPELINE_STREAMS.find((s) => s.id === activeStreamId) || PIPELINE_STREAMS[0];

  // Auto-cycle through streams every 8 seconds when user is not hovering
  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      setActiveStreamId((prevId) => {
        const currIdx = PIPELINE_STREAMS.findIndex((s) => s.id === prevId);
        const nextIdx = (currIdx + 1) % PIPELINE_STREAMS.length;
        return PIPELINE_STREAMS[nextIdx].id;
      });
    }, 7500);

    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <section
      id="data-flow-pipeline"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="py-16 md:py-24 relative overflow-hidden bg-slate-50/60 dark:bg-[#070c18] border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-300"
    >
      {/* Background Tech Mesh & Radial Aura */}
      <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] dark:bg-[radial-gradient(#1e3a8a_1px,transparent_1px)] [background-size:28px_28px] opacity-[0.18] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-r from-blue-500/10 via-cyan-400/10 to-indigo-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100/80 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-widest font-heading mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 animate-pulse" />
            <span>REAL-TIME DATA-FLOW ARCHITECTURE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0F172A] dark:text-white tracking-tight font-heading leading-tight">
            Animated Data-Flow Pipeline: <br className="hidden sm:block" />
            <span className="text-gradient-animated">How AI Powers Your Stack</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
            See how the <strong>ZENIVIXON Autonomous AI Hub</strong> connects directly with your existing business
            software—ingesting requests, executing deterministic reasoning, and dispatching verified outcomes across
            your tools in real time.
          </p>

          {/* Interactive Pipeline Tabs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            <span className="text-xs font-heading font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mr-1">
              Select Pipeline:
            </span>
            {PIPELINE_STREAMS.map((stream) => {
              const isActive = stream.id === activeStreamId;
              return (
                <button
                  key={stream.id}
                  onClick={() => setActiveStreamId(stream.id)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-heading font-semibold transition-all duration-300 flex items-center gap-2 border cursor-pointer ${
                    isActive
                      ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/25 scale-105"
                      : "bg-white dark:bg-[#0b1120] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500"
                  }`}
                >
                  <span
                    className="w-2 h-2 rounded-full animate-ping"
                    style={{ backgroundColor: stream.accentHex }}
                  />
                  <span>{stream.shortLabel}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* INTERACTIVE 3-TIER PIPELINE DIAGRAM: SOURCE -> ZENIVIXON HUB -> DESTINATION */}
        {/* ========================================================================= */}
        <div className="relative rounded-3xl bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none p-6 sm:p-10 transition-colors duration-300">
          {/* Top Status Bar with Live Telemetry */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-100 dark:border-slate-800/80 pb-4 mb-8 gap-3 text-xs font-mono">
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                ACTIVE DATA PIPELINE: {activeStream.name.toUpperCase()}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-[11px] text-slate-500 dark:text-slate-400">
              <span className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-bold">
                Throughput: <strong className="text-blue-600 dark:text-blue-400">1,840 events/min</strong>
              </span>
              <span className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-bold">
                Avg Latency: <strong className="text-emerald-600 dark:text-emerald-400">{activeStream.processing.latency}</strong>
              </span>
            </div>
          </div>

          {/* Connected Grid Architecture */}
          <div className="grid grid-cols-1 lg:grid-cols-11 gap-6 sm:gap-8 items-center relative">
            {/* ---------------- 01. SOURCE EVENT NODE ---------------- */}
            <div className="lg:col-span-3 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-heading font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                  Step 01: Inbound Source
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900">
                  Raw Event
                </span>
              </div>

              <motion.div
                key={activeStream.id + "-source"}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500 transition-all shadow-sm group relative"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center shadow-xs">
                    {activeStream.source.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white font-heading">
                      {activeStream.source.title}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {activeStream.source.sub}
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 text-xs font-mono text-slate-700 dark:text-slate-300 leading-relaxed">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                    Payload Snippet:
                  </span>
                  {activeStream.source.samplePayload}
                </div>
              </motion.div>
            </div>

            {/* ---------------- CONNECTOR BEAM 1 (Source -> Hub) ---------------- */}
            <div className="lg:col-span-1 hidden lg:flex flex-col items-center justify-center relative">
              <div className="w-full h-1 bg-slate-100 dark:bg-slate-800 relative rounded-full overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 w-8 bg-gradient-to-r from-transparent via-blue-500 to-transparent"
                  animate={{ left: ["-20%", "120%"] }}
                  transition={{ repeat: Infinity, duration: 1.6, ease: "linear" }}
                />
              </div>
              <span className="text-[10px] font-mono font-bold text-blue-500 mt-2 uppercase tracking-wider">
                Ingest
              </span>
            </div>

            {/* ---------------- 02. CENTRAL ZENIVIXON AI ENGINE HUB ---------------- */}
            <div className="lg:col-span-3 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-heading font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5" /> Step 02: Core Engine
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900">
                  Sub-Second
                </span>
              </div>

              <div className="p-6 rounded-3xl bg-gradient-to-b from-blue-900/10 via-slate-900/40 to-cyan-900/10 dark:from-blue-950/50 dark:via-slate-900/90 dark:to-cyan-950/50 border-2 border-blue-500/50 dark:border-blue-400/40 shadow-xl shadow-blue-500/10 relative overflow-hidden text-center group">
                {/* Concentric Glow Halo */}
                <div className="absolute inset-0 bg-radial-gradient from-blue-500/10 via-transparent to-transparent pointer-events-none" />

                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center text-white mx-auto mb-3 shadow-lg shadow-blue-500/30 animate-pulse">
                  <Cpu className="w-7 h-7" />
                </div>

                <h3 className="text-base font-extrabold text-slate-900 dark:text-white font-heading">
                  ZENIVIXON AI ENGINE
                </h3>
                <p className="text-xs font-mono text-blue-600 dark:text-blue-400 font-semibold mt-0.5">
                  {activeStream.processing.agentName}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-200/80 dark:border-slate-800/90 text-left space-y-2 text-xs">
                  <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                    <span>Architecture:</span>
                    <strong className="text-slate-800 dark:text-slate-200 font-mono text-[11px]">
                      {activeStream.processing.engine}
                    </strong>
                  </div>
                  <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                    <span>Guardrails:</span>
                    <strong className="text-emerald-600 dark:text-emerald-400 font-mono text-[11px]">
                      {activeStream.processing.validation}
                    </strong>
                  </div>
                </div>
              </div>
            </div>

            {/* ---------------- CONNECTOR BEAM 2 (Hub -> Destination) ---------------- */}
            <div className="lg:col-span-1 hidden lg:flex flex-col items-center justify-center relative">
              <div className="w-full h-1 bg-slate-100 dark:bg-slate-800 relative rounded-full overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 w-8 bg-gradient-to-r from-transparent via-emerald-500 to-transparent"
                  animate={{ left: ["-20%", "120%"] }}
                  transition={{ repeat: Infinity, duration: 1.6, ease: "linear", delay: 0.8 }}
                />
              </div>
              <span className="text-[10px] font-mono font-bold text-emerald-500 mt-2 uppercase tracking-wider">
                Dispatch
              </span>
            </div>

            {/* ---------------- 03. DESTINATION OUTCOME NODE ---------------- */}
            <div className="lg:col-span-3 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-heading font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                  Step 03: Verified Target
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900">
                  100% Synced
                </span>
              </div>

              <motion.div
                key={activeStream.id + "-dest"}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-emerald-400 dark:hover:border-emerald-500 transition-all shadow-sm group relative"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center shadow-xs">
                    {activeStream.destination.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white font-heading">
                      {activeStream.destination.title}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {activeStream.destination.sub}
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-900 text-xs font-mono text-emerald-700 dark:text-emerald-300 leading-relaxed font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
                  <span>{activeStream.destination.outcomeMetric}</span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Bottom Connectivity Matrix: Supported Platforms */}
          <div className="mt-10 pt-6 border-t border-slate-100 dark:border-slate-800/80">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-heading">
              <span className="font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Integrated Software Ecosystem:
              </span>

              <div className="flex flex-wrap items-center justify-center gap-2">
                {[
                  "WhatsApp API",
                  "HubSpot CRM",
                  "Salesforce",
                  "SAP / QuickBooks",
                  "PostgreSQL / Redis",
                  "Slack / Webhooks",
                  "Stripe / Billing",
                ].map((platform, pIdx) => (
                  <span
                    key={pIdx}
                    className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 text-[11px] font-mono"
                  >
                    {platform}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
