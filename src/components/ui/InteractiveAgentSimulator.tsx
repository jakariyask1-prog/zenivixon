"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  FileSpreadsheet,
  Users,
  Play,
  CheckCircle2,
  Cpu,
  Database,
  Zap,
  Clock,
  ShieldCheck,
  TrendingUp,
  MessageSquare,
  Sparkles,
} from "lucide-react";

interface Scenario {
  id: string;
  name: string;
  shortLabel: string;
  icon: React.ReactNode;
  badgeColor: string;
  triggerInput: {
    channel: string;
    sender: string;
    payload: string;
  };
  stages: {
    stage1: { title: string; desc: string; icon: React.ReactNode; tech: string };
    stage2: { title: string; desc: string; icon: React.ReactNode; tech: string };
    stage3: { title: string; desc: string; icon: React.ReactNode; tech: string };
    stage4: { title: string; desc: string; icon: React.ReactNode; tech: string };
  };
  outputPreview: {
    title: string;
    summary: string;
    actionsTaken: string[];
    speed: string;
    humanTimeSaved: string;
    cost: string;
  };
}

const SCENARIOS: Scenario[] = [
  {
    id: "support-agent",
    name: "24/7 AI Customer Support Triage",
    shortLabel: "Support Triage",
    icon: <MessageSquare className="w-4 h-4 text-blue-600 dark:text-blue-400" />,
    badgeColor: "bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800",
    triggerInput: {
      channel: "WhatsApp & Web Chat",
      sender: "Enterprise Customer (London, UK)",
      payload: '"Our API rate limit was hit unexpectedly. Can we upgrade our quota immediately without downtime?"',
    },
    stages: {
      stage1: {
        title: "Intent & Security Triage",
        desc: "Classifies severity: Urgent Tier-1 Quota Escalation. Verifies customer token & organization ID.",
        icon: <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />,
        tech: "Pydantic Schema Guard",
      },
      stage2: {
        title: "Autonomous Tool Calling",
        desc: "Queries Qdrant vector KB + calls Stripe & billing API to confirm active enterprise plan.",
        icon: <Bot className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />,
        tech: "LangGraph Multi-Agent",
      },
      stage3: {
        title: "Deterministic Execution",
        desc: "Increases rate limit quota by 5x in Redis database + updates HubSpot customer health tag.",
        icon: <Database className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />,
        tech: "Redis / Async REST API",
      },
      stage4: {
        title: "Verified Resolution",
        desc: "Sends empathetic, professional resolution message in WhatsApp + logs audit telemetry.",
        icon: <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />,
        tech: "Sub-Second Dispatch",
      },
    },
    outputPreview: {
      title: "Automated WhatsApp Resolution Delivered",
      summary: "Your API rate limit has been raised to 2,500 req/sec immediately. Zero service interruption experienced.",
      actionsTaken: [
        "Rate limit quota scaled 5x in production Redis",
        "CRM ticket auto-resolved with full audit logs",
        "Slack notification sent to on-call infrastructure lead",
      ],
      speed: "0.82 seconds",
      humanTimeSaved: "35 mins saved",
      cost: "$0.0014 token cost",
    },
  },
  {
    id: "invoice-pipeline",
    name: "Automated Invoice & Document Pipeline",
    shortLabel: "Invoice Pipeline",
    icon: <FileSpreadsheet className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />,
    badgeColor: "bg-cyan-50 dark:bg-cyan-950/40 text-cyan-700 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800",
    triggerInput: {
      channel: "Billing Inbox (PDF Attachment)",
      sender: "Hardware Logistics Supplier (Germany)",
      payload: "12-page vendor invoice received with 48 line items, VAT breakdown, and international IBAN details.",
    },
    stages: {
      stage1: {
        title: "Vision & OCR Parsing",
        desc: "Multi-modal neural parser splits complex nested tables, line quantities, and tax totals.",
        icon: <FileSpreadsheet className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />,
        tech: "Multi-Modal Extraction",
      },
      stage2: {
        title: "Strict Schema Validation",
        desc: "Deterministic Python logic recalculates mathematical sums and cross-checks PO #8419.",
        icon: <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />,
        tech: "Instructor / Pydantic",
      },
      stage3: {
        title: "ERP & Accounting Sync",
        desc: "Pushes validated voucher into QuickBooks / SAP ledger via authenticated webhook pipeline.",
        icon: <Database className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />,
        tech: "n8n / Enterprise Webhook",
      },
      stage4: {
        title: "Zero-Error Confirmation",
        desc: "Finance manager receives Slack alert with reconciled invoice link. Zero human data entry.",
        icon: <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />,
        tech: "100% Deterministic Flow",
      },
    },
    outputPreview: {
      title: "Invoice #INV-2026-904 Verified & Posted",
      summary: "All 48 line items mathematically reconciled with PO #8419. Ledger updated with 0% error.",
      actionsTaken: [
        "Extracted $28,450.00 total across 48 line items",
        "Discrepancies detected: 0 (matched procurement contract)",
        "Auto-posted to ERP ledger; payment voucher queued",
      ],
      speed: "1.14 seconds",
      humanTimeSaved: "45 mins typing saved",
      cost: "$0.0028 token cost",
    },
  },
  {
    id: "lead-enrichment",
    name: "Inbound Lead Triage & CRM Enrichment",
    shortLabel: "Lead Qualification",
    icon: <Users className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />,
    badgeColor: "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800",
    triggerInput: {
      channel: "Web Demo Intake Form",
      sender: "VP of Engineering @ 450-person Fintech",
      payload: '"Looking to deploy autonomous document automation and support agents across our customer portal."',
    },
    stages: {
      stage1: {
        title: "Data Enrichment Lookup",
        desc: "Autonomous agent enriches company headcount, annual revenue, and engineering tech stack.",
        icon: <Users className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />,
        tech: "Apollo / Clearbit API",
      },
      stage2: {
        title: "Predictive Intent Scoring",
        desc: "Assigns lead score: 98/100 (Tier-1 Enterprise). Evaluates budget alignment and urgency.",
        icon: <TrendingUp className="w-4 h-4 text-blue-600 dark:text-blue-400" />,
        tech: "Custom AI Reasoning",
      },
      stage3: {
        title: "CRM Auto-Provisioning",
        desc: "Creates deal in HubSpot, assigns lead owner, and pre-generates tailored architecture deck.",
        icon: <Database className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />,
        tech: "HubSpot / Salesforce Sync",
      },
      stage4: {
        title: "Instant Executive Outreach",
        desc: "Dispatches personalized email with tailored calendar slot in under 60 seconds of submission.",
        icon: <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />,
        tech: "Sub-Minute Conversion",
      },
    },
    outputPreview: {
      title: "Tier-1 Enterprise Deal Qualified",
      summary: "Lead score 98/100. Enriched with $20M+ revenue data. Executive personalized proposal delivered.",
      actionsTaken: [
        "Enriched tech stack: PostgreSQL, AWS, React, Python",
        "Deal created in HubSpot with custom executive notes",
        "Auto-scheduled 7-day pilot sprint discovery call",
      ],
      speed: "0.65 seconds",
      humanTimeSaved: "Instant response (<1m)",
      cost: "$0.0011 token cost",
    },
  },
];

export function InteractiveAgentSimulator() {
  const [activeScenarioId, setActiveScenarioId] = useState<string>("support-agent");
  const [activeStage, setActiveStage] = useState<number>(4);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [userHasSelected, setUserHasSelected] = useState<boolean>(false);

  const scenario = SCENARIOS.find((s) => s.id === activeScenarioId) || SCENARIOS[0];
  const timerRefs = useRef<NodeJS.Timeout[]>([]);

  const clearAllTimers = useCallback(() => {
    timerRefs.current.forEach((t) => clearTimeout(t));
    timerRefs.current = [];
  }, []);

  const triggerSimulation = useCallback(
    (stageDelay = 1000) => {
      clearAllTimers();
      setIsRunning(true);
      setActiveStage(1);

      const t1 = setTimeout(() => setActiveStage(2), stageDelay);
      const t2 = setTimeout(() => setActiveStage(3), stageDelay * 2);
      const t3 = setTimeout(() => {
        setActiveStage(4);
        setIsRunning(false);
      }, stageDelay * 3);

      timerRefs.current.push(t1, t2, t3);
    },
    [clearAllTimers]
  );

  // Trigger once on initial mount so visitors immediately see the pipeline execute
  useEffect(() => {
    const initialTimer = setTimeout(() => {
      triggerSimulation(1000);
    }, 200);

    return () => {
      clearTimeout(initialTimer);
      clearAllTimers();
    };
  }, [triggerSimulation, clearAllTimers]);

  // Automatic looping: cycles through scenarios & auto-runs every 8.5 seconds when not hovered
  useEffect(() => {
    if (isHovered || userHasSelected) return;

    const interval = setInterval(() => {
      setActiveScenarioId((prevId) => {
        const currentIndex = SCENARIOS.findIndex((s) => s.id === prevId);
        const nextIndex = (currentIndex + 1) % SCENARIOS.length;
        return SCENARIOS[nextIndex].id;
      });
      triggerSimulation(1000);
    }, 8500);

    return () => clearInterval(interval);
  }, [isHovered, userHasSelected, triggerSimulation]);

  // Handle cursor hover over any workflow pill
  const handleWorkflowHover = (id: string) => {
    if (id !== activeScenarioId || !isRunning) {
      setActiveScenarioId(id);
      triggerSimulation(900);
    }
  };

  // Handle explicit click
  const handleWorkflowClick = (id: string) => {
    setUserHasSelected(true);
    setActiveScenarioId(id);
    triggerSimulation(900);
  };

  const getStageStatusText = () => {
    if (activeStage === 1) return "⚡ Step 1/4: Ingesting Webhook & Intent Analysis...";
    if (activeStage === 2) return "🧠 Step 2/4: Reasoning with Qdrant Vector & Tool Calls...";
    if (activeStage === 3) return "🔄 Step 3/4: Deterministic Database & CRM Synchronization...";
    return "✅ Step 4/4: Verified Autonomous Resolution Delivered in Sub-Seconds";
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="rounded-3xl bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none p-5 sm:p-7 md:p-8 transition-colors duration-300 relative group"
    >
      {/* Top Bar: macOS window aesthetic + Mode indicator */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-100 dark:border-slate-800/80 pb-4 mb-6 gap-3">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-rose-400 dark:bg-rose-500" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400 dark:bg-amber-500" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 dark:bg-emerald-500" />
          <span className="text-xs font-heading text-slate-500 dark:text-slate-400 ml-2 font-semibold tracking-wide">
            interactive_agent_simulator.ts
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <div className="text-xs font-heading text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800 font-semibold flex items-center gap-1.5 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{isRunning ? "AUTONOMOUS EXECUTING..." : "LIVE ENGINE READY"}</span>
          </div>

          <button
            onClick={() => triggerSimulation(900)}
            disabled={isRunning}
            className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-xs font-heading font-semibold flex items-center gap-1.5 transition-all shadow-md shadow-blue-600/20 cursor-pointer active:scale-95"
            aria-label="Replay simulation"
          >
            {isRunning ? (
              <>
                <Cpu className="w-3.5 h-3.5 animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Re-run Simulation</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Scenario Selector Pills (Hover & Click Supported) */}
      <div className="mb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-heading text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider mr-1">
            Select Workflow:
          </span>
          {SCENARIOS.map((s) => {
            const isActive = s.id === activeScenarioId;
            return (
              <button
                key={s.id}
                onMouseEnter={() => handleWorkflowHover(s.id)}
                onClick={() => handleWorkflowClick(s.id)}
                className={`px-4 py-2 rounded-xl text-xs font-heading font-semibold flex items-center gap-2 border transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/25 scale-[1.03]"
                    : "bg-slate-50 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-950/20"
                }`}
              >
                <span>{s.icon}</span>
                <span>{s.shortLabel}</span>
                {isActive && isRunning && (
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping ml-1" />
                )}
              </button>
            );
          })}
        </div>
        <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-2 font-mono flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 text-blue-500" />
          <span>Hover over any workflow button to automatically trigger the 4-stage AI execution process.</span>
        </p>
      </div>

      {/* Trigger Event Banner (Simulated Incoming Payload) */}
      <div className="mb-6 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800/80 transition-all duration-300">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2 text-xs font-heading">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest text-[11px]">
              Incoming Trigger:
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 font-semibold text-[11px]">
              {scenario.triggerInput.channel}
            </span>
          </div>
          <span className="text-slate-500 dark:text-slate-400 text-xs">
            From: <strong className="text-slate-700 dark:text-slate-300">{scenario.triggerInput.sender}</strong>
          </span>
        </div>
        <p className="text-sm font-mono text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-950 p-3 rounded-xl border border-slate-200/70 dark:border-slate-800/80 leading-relaxed shadow-xs">
          {scenario.triggerInput.payload}
        </p>
      </div>

      {/* Live Animated Pipeline Progress Bar */}
      <div className="mb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono mb-2 gap-1">
          <span className={`font-semibold transition-colors duration-300 ${isRunning ? "text-blue-600 dark:text-blue-400" : "text-emerald-600 dark:text-emerald-400"}`}>
            {getStageStatusText()}
          </span>
          <span className="text-slate-400 dark:text-slate-500 font-bold self-end sm:self-auto">
            {activeStage * 25}%
          </span>
        </div>
        <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden relative">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 shadow-sm shadow-blue-500/50"
            initial={{ width: "25%" }}
            animate={{ width: `${activeStage * 25}%` }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
        </div>
      </div>

      {/* 4-Stage Animated Connected Flow Matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 relative mb-6">
        {/* Connected laser guide line behind cards on desktop/laptop */}
        <div className="hidden lg:block absolute top-10 left-8 right-8 h-0.5 bg-gradient-to-r from-blue-500/30 via-cyan-400/30 to-emerald-400/30 -z-0 pointer-events-none" />

        {/* Stage 1 */}
        <motion.div
          animate={{
            scale: activeStage === 1 ? 1.02 : 1,
            borderColor:
              activeStage === 1
                ? "rgba(59, 130, 246, 1)"
                : activeStage > 1
                ? "rgba(59, 130, 246, 0.4)"
                : undefined,
          }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className={`p-4 rounded-2xl border transition-all duration-300 flex flex-col justify-between relative z-10 ${
            activeStage >= 1
              ? "bg-white dark:bg-[#0d1527] border-blue-300 dark:border-blue-800/80 shadow-md shadow-blue-500/10"
              : "bg-slate-50/50 dark:bg-slate-900/30 border-slate-200/50 dark:border-slate-800/40 opacity-40"
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-[11px] font-heading font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
                01. Ingestion
              </span>
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${
                  activeStage === 1
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/30 scale-110"
                    : "bg-blue-50 dark:bg-blue-950/60"
                }`}
              >
                {scenario.stages.stage1.icon}
              </div>
            </div>
            <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-heading">
              {scenario.stages.stage1.title}
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
              {scenario.stages.stage1.desc}
            </p>
          </div>
          <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800/80 text-[11px] font-mono text-slate-500 dark:text-slate-400">
            &bull; {scenario.stages.stage1.tech}
          </div>
        </motion.div>

        {/* Stage 2 */}
        <motion.div
          animate={{
            scale: activeStage === 2 ? 1.02 : 1,
            borderColor:
              activeStage === 2
                ? "rgba(6, 182, 212, 1)"
                : activeStage > 2
                ? "rgba(6, 182, 212, 0.4)"
                : undefined,
          }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className={`p-4 rounded-2xl border transition-all duration-300 flex flex-col justify-between relative z-10 ${
            activeStage >= 2
              ? "bg-white dark:bg-[#0d1527] border-cyan-300 dark:border-cyan-800/80 shadow-md shadow-cyan-500/10"
              : "bg-slate-50/50 dark:bg-slate-900/30 border-slate-200/50 dark:border-slate-800/40 opacity-40"
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-[11px] font-heading font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">
                02. Reasoning
              </span>
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${
                  activeStage === 2
                    ? "bg-cyan-500 text-white shadow-md shadow-cyan-500/30 scale-110"
                    : "bg-cyan-50 dark:bg-cyan-950/60"
                }`}
              >
                {scenario.stages.stage2.icon}
              </div>
            </div>
            <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-heading">
              {scenario.stages.stage2.title}
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
              {scenario.stages.stage2.desc}
            </p>
          </div>
          <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800/80 text-[11px] font-mono text-slate-500 dark:text-slate-400">
            &bull; {scenario.stages.stage2.tech}
          </div>
        </motion.div>

        {/* Stage 3 */}
        <motion.div
          animate={{
            scale: activeStage === 3 ? 1.02 : 1,
            borderColor:
              activeStage === 3
                ? "rgba(99, 102, 241, 1)"
                : activeStage > 3
                ? "rgba(99, 102, 241, 0.4)"
                : undefined,
          }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className={`p-4 rounded-2xl border transition-all duration-300 flex flex-col justify-between relative z-10 ${
            activeStage >= 3
              ? "bg-white dark:bg-[#0d1527] border-indigo-300 dark:border-indigo-800/80 shadow-md shadow-indigo-500/10"
              : "bg-slate-50/50 dark:bg-slate-900/30 border-slate-200/50 dark:border-slate-800/40 opacity-40"
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-[11px] font-heading font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
                03. Execution
              </span>
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${
                  activeStage === 3
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/30 scale-110"
                    : "bg-indigo-50 dark:bg-indigo-950/60"
                }`}
              >
                {scenario.stages.stage3.icon}
              </div>
            </div>
            <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-heading">
              {scenario.stages.stage3.title}
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
              {scenario.stages.stage3.desc}
            </p>
          </div>
          <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800/80 text-[11px] font-mono text-slate-500 dark:text-slate-400">
            &bull; {scenario.stages.stage3.tech}
          </div>
        </motion.div>

        {/* Stage 4 */}
        <motion.div
          animate={{
            scale: activeStage === 4 ? 1.02 : 1,
            borderColor: activeStage === 4 ? "rgba(16, 185, 129, 1)" : undefined,
          }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className={`p-4 rounded-2xl border transition-all duration-300 flex flex-col justify-between relative z-10 ${
            activeStage >= 4
              ? "bg-white dark:bg-[#0d1527] border-emerald-300 dark:border-emerald-800/80 shadow-md shadow-emerald-500/10"
              : "bg-slate-50/50 dark:bg-slate-900/30 border-slate-200/50 dark:border-slate-800/40 opacity-40"
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-[11px] font-heading font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                04. Outcome
              </span>
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${
                  activeStage === 4
                    ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/30 scale-110"
                    : "bg-emerald-50 dark:bg-emerald-950/60"
                }`}
              >
                {scenario.stages.stage4.icon}
              </div>
            </div>
            <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-heading">
              {scenario.stages.stage4.title}
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
              {scenario.stages.stage4.desc}
            </p>
          </div>
          <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800/80 text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
            &bull; {scenario.stages.stage4.tech}
          </div>
        </motion.div>
      </div>

      {/* Output Resolution Box + Real Telemetry */}
      <AnimatePresence mode="wait">
        <motion.div
          key={scenario.id + activeStage}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="rounded-2xl p-5 bg-gradient-to-r from-blue-50/50 via-slate-50 to-emerald-50/40 dark:from-blue-950/20 dark:via-slate-900/60 dark:to-emerald-950/20 border border-slate-200 dark:border-slate-800"
        >
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-slate-200/70 dark:border-slate-800/80 pb-4 mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <h4 className="text-sm font-bold text-slate-900 dark:text-white font-heading">
                  {scenario.outputPreview.title}
                </h4>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
                {scenario.outputPreview.summary}
              </p>
            </div>

            {/* Live Metrics Pills */}
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 shadow-xs">
                <Zap className="w-3.5 h-3.5 text-emerald-500" />
                {scenario.outputPreview.speed}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 shadow-xs">
                <Clock className="w-3.5 h-3.5 text-blue-500" />
                {scenario.outputPreview.humanTimeSaved}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 shadow-xs">
                {scenario.outputPreview.cost}
              </span>
            </div>
          </div>

          {/* Action Logs List */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-heading">
            {scenario.outputPreview.actionsTaken.map((action, aIdx) => (
              <div
                key={aIdx}
                className="flex items-start gap-2 p-2.5 rounded-xl bg-white/80 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800/60 text-slate-700 dark:text-slate-300"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                <span className="leading-snug">{action}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
