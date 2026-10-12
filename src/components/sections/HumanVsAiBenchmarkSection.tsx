"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  DollarSign,
  ShieldAlert,
  ShieldCheck,
  Zap,
  TrendingDown,
  CheckCircle2,
  XCircle,
  Users,
  Bot,
  FileSpreadsheet,
  MessageSquare,
  Play,
  RotateCcw,
  Gauge,
  Activity,
} from "lucide-react";

interface BenchmarkCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  manual: {
    speedLabel: string;
    speedSub: string;
    speedGaugeAngle: number; // in degrees for gauge needle (-90 to +90)
    monthlyCost: string;
    costDetail: string;
    errorRate: string;
    availability: string;
    bottleneck: string;
    taskSpeedMs: number;
  };
  ai: {
    speedLabel: string;
    speedSub: string;
    speedGaugeAngle: number;
    monthlyCost: string;
    costDetail: string;
    errorRate: string;
    availability: string;
    benefit: string;
    taskSpeedMs: number;
  };
  impact: {
    timeReduction: string;
    annualSavedDollars: string;
    throughputBoost: string;
  };
}

const BENCHMARKS: BenchmarkCategory[] = [
  {
    id: "support",
    name: "Customer Support & Ticket Triage",
    icon: <MessageSquare className="w-4 h-4 text-blue-500" />,
    manual: {
      speedLabel: "4 to 8 Hours",
      speedSub: "Queue wait time & human rep routing",
      speedGaugeAngle: -65,
      monthlyCost: "$7,500 / mo",
      costDetail: "3 full-time tier-1 support specialists",
      errorRate: "6.8% Missed SLA",
      availability: "Office Hours Only (40 hrs/wk)",
      bottleneck: "Ticket backlogs spike during nights and weekends",
      taskSpeedMs: 3200,
    },
    ai: {
      speedLabel: "1.18 Seconds",
      speedSub: "Grounded RAG search + tool dispatch",
      speedGaugeAngle: 85,
      monthlyCost: "$165 / mo",
      costDetail: "Direct token costs for 5,000+ customer inquiries",
      errorRate: "0% Missed SLA",
      availability: "24/7/365 Continuous Uptime",
      benefit: "Sub-second resolution in 50+ languages",
      taskSpeedMs: 120,
    },
    impact: {
      timeReduction: "99.9% Faster First-Response",
      annualSavedDollars: "$88,020 Saved / Year",
      throughputBoost: "Instant 24/7 Scalability",
    },
  },
  {
    id: "invoices",
    name: "Invoice & Financial Document Extraction",
    icon: <FileSpreadsheet className="w-4 h-4 text-cyan-500" />,
    manual: {
      speedLabel: "35 to 50 Minutes",
      speedSub: "Manual re-typing line items into ERP/QuickBooks",
      speedGaugeAngle: -55,
      monthlyCost: "$6,200 / mo",
      costDetail: "Accounts payable staff typing 400+ vendor PDFs",
      errorRate: "4.2% Typo & VAT Errors",
      availability: "Batch Processed (End of Week)",
      bottleneck: "Delayed vendor payouts & accounting ledger mismatches",
      taskSpeedMs: 2800,
    },
    ai: {
      speedLabel: "1.42 Seconds",
      speedSub: "Neural OCR + 3-way PO verification",
      speedGaugeAngle: 82,
      monthlyCost: "$120 / mo",
      costDetail: "Zero manual data-entry expense",
      errorRate: "99.98% Accuracy",
      availability: "Real-Time Event Processing",
      benefit: "Auto-posted into ledger with deterministic audit trail",
      taskSpeedMs: 140,
    },
    impact: {
      timeReduction: "98.5% Hours Reclaimed",
      annualSavedDollars: "$72,960 Saved / Year",
      throughputBoost: "Zero Typo Discrepancies",
    },
  },
  {
    id: "leads",
    name: "Inbound Lead Qualification & CRM Sync",
    icon: <Users className="w-4 h-4 text-indigo-500" />,
    manual: {
      speedLabel: "12 to 24 Hours",
      speedSub: "Reps manually researching LinkedIn & Apollo",
      speedGaugeAngle: -72,
      monthlyCost: "$8,400 / mo",
      costDetail: "BDR staff spending 40% time on copy-pasting",
      errorRate: "12% Stale / Missing Fields",
      availability: "Slow follow-up cadence",
      bottleneck: "60% of inbound demo leads go cold before first outreach",
      taskSpeedMs: 3500,
    },
    ai: {
      speedLabel: "0.85 Seconds",
      speedSub: "Firmographic API + ICP AI Scorer",
      speedGaugeAngle: 88,
      monthlyCost: "$190 / mo",
      costDetail: "Autonomous pipeline enrichment",
      errorRate: "100% Complete Records",
      availability: "Under 60s Lead Outreach",
      benefit: "Executive calendar booked before lead leaves page",
      taskSpeedMs: 90,
    },
    impact: {
      timeReduction: "99.2% Faster Outreach",
      annualSavedDollars: "$98,520 Saved / Year",
      throughputBoost: "3.4x Higher Demo Conversions",
    },
  },
];

export function HumanVsAiBenchmarkSection() {
  const [activeBenchmarkId, setActiveBenchmarkId] = useState<string>("support");
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [aiProgress, setAiProgress] = useState<number>(1000);
  const [humanProgress, setHumanProgress] = useState<number>(3);
  const [isRacing, setIsRacing] = useState<boolean>(false);

  const activeBenchmark =
    BENCHMARKS.find((b) => b.id === activeBenchmarkId) || BENCHMARKS[0];

  // Continuous perpetual race loop:
  useEffect(() => {
    let raceTimeout: NodeJS.Timeout;
    let aiInterval: NodeJS.Timeout;
    let humanInterval: NodeJS.Timeout;

    const startPerpetualRace = () => {
      setIsRacing(true);
      setAiProgress(0);
      setHumanProgress(0);

      let aiCount = 0;
      aiInterval = setInterval(() => {
        aiCount += 125;
        if (aiCount >= 1000) {
          setAiProgress(1000);
          clearInterval(aiInterval);
          setIsRacing(false);

          // Hold completed state for 3.2 seconds, then auto-advance to next workflow and re-race!
          raceTimeout = setTimeout(() => {
            if (!isHovered) {
              setActiveBenchmarkId((prevId) => {
                const currIdx = BENCHMARKS.findIndex((b) => b.id === prevId);
                const nextIdx = (currIdx + 1) % BENCHMARKS.length;
                return BENCHMARKS[nextIdx].id;
              });
            }
          }, 3200);
        } else {
          setAiProgress(aiCount);
        }
      }, 120);

      let humanCount = 0;
      humanInterval = setInterval(() => {
        humanCount += 1;
        setHumanProgress(humanCount);
        if (humanCount >= 3) {
          clearInterval(humanInterval);
        }
      }, 550);
    };

    const initialDelay = setTimeout(() => {
      startPerpetualRace();
    }, 200);

    return () => {
      clearTimeout(initialDelay);
      clearInterval(aiInterval);
      clearInterval(humanInterval);
      clearTimeout(raceTimeout);
    };
  }, [activeBenchmarkId, isHovered]);

  const triggerManualRace = () => {
    setAiProgress(0);
    setHumanProgress(0);
    setIsRacing(true);

    let aiCount = 0;
    const aiInterval = setInterval(() => {
      aiCount += 125;
      if (aiCount >= 1000) {
        setAiProgress(1000);
        clearInterval(aiInterval);
        setIsRacing(false);
      } else {
        setAiProgress(aiCount);
      }
    }, 120);

    let humanCount = 0;
    const humanInterval = setInterval(() => {
      humanCount += 1;
      setHumanProgress(humanCount);
      if (humanCount >= 3) {
        clearInterval(humanInterval);
      }
    }, 550);
  };

  return (
    <section
      id="human-vs-ai-benchmark"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="py-16 md:py-24 relative overflow-hidden bg-[#F8FAFC] dark:bg-[#060b17] border-y border-slate-200/80 dark:border-slate-800/80 transition-colors duration-300"
    >
      {/* Background Subtle Tech Matrix & Glowing Radial Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] dark:bg-[radial-gradient(#1e3a8a_1px,transparent_1px)] [background-size:28px_28px] opacity-[0.16] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-r from-rose-500/10 via-blue-500/10 to-emerald-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100/80 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-widest font-heading mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 animate-pulse" />
            <span>ANIMATED INFOGRAPHIC BENCHMARK</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0F172A] dark:text-white tracking-tight font-heading leading-tight">
            Manual Operations vs. <br className="hidden sm:block" />
            <span className="text-gradient-animated">ZENIVIXON Autonomous AI</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
            Watch our live animated velocity cards compare slow human queues with instant AI processing. See how
            autonomous multi-agent workflows recover thousands of operational hours.
          </p>

          {/* Workflow Switcher Tabs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            <span className="text-xs font-heading font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mr-1">
              Select Workflow:
            </span>
            {BENCHMARKS.map((bm) => {
              const isActive = bm.id === activeBenchmarkId;
              return (
                <button
                  key={bm.id}
                  onClick={() => setActiveBenchmarkId(bm.id)}
                  onMouseEnter={() => setActiveBenchmarkId(bm.id)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-heading font-semibold transition-all duration-300 flex items-center gap-2 border cursor-pointer ${
                    isActive
                      ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/25 scale-105"
                      : "bg-white dark:bg-[#0b1120] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500 hover:scale-102"
                  }`}
                >
                  <span>{bm.icon}</span>
                  <span>{bm.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Live Race Replay Bar */}
        <div className="max-w-4xl mx-auto mb-8 p-3 rounded-2xl bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
            <Activity className="w-4 h-4 text-blue-500 animate-pulse" />
            <span>
              LIVE RACE SIMULATION: <strong>1,000 Production Workload Units</strong>
            </span>
          </div>

          <button
            onClick={triggerManualRace}
            disabled={isRacing}
            className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold flex items-center gap-1.5 shadow-md shadow-blue-500/20 hover:opacity-90 transition-all cursor-pointer disabled:opacity-50 text-xs"
          >
            {isRacing ? (
              <>
                <RotateCcw className="w-3.5 h-3.5 animate-spin" />
                <span>Simulating Race...</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Re-run Speed Race</span>
              </>
            )}
          </button>
        </div>

        {/* ========================================================================= */}
        {/* SIDE-BY-SIDE ANIMATED INFOGRAPHIC CARDS: MANUAL CHAOS VS. AI PRECISION */}
        {/* ========================================================================= */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeBenchmark.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-stretch">
              {/* ---------------- LEFT INFOGRAPHIC CARD: TRADITIONAL MANUAL WORK ---------------- */}
              <div className="rounded-3xl bg-white dark:bg-[#0d1322] border-2 border-rose-200/80 dark:border-rose-950/60 p-6 sm:p-8 shadow-md flex flex-col justify-between space-y-6 relative overflow-hidden group">
                <div className="space-y-6">
                  {/* Card Header with macOS Status Badges */}
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900 flex items-center justify-center text-rose-600 dark:text-rose-400">
                        <Users className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono uppercase font-bold tracking-widest text-rose-600 dark:text-rose-400 block">
                          TRADITIONAL APPROACH
                        </span>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading">
                          Manual Human Operations
                        </h3>
                      </div>
                    </div>

                    <span className="text-[11px] font-mono font-bold px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900">
                      HIGH FRICTION
                    </span>
                  </div>

                  {/* 🏎️ ANIMATED INFOGRAPHIC: Sluggish Gauge & Live Race Counter */}
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                        <Gauge className="w-4 h-4 text-rose-500" />
                        Live Velocity Gauge:
                      </span>
                      <strong className="text-rose-600 dark:text-rose-400 font-bold">
                        {activeBenchmark.manual.speedLabel}
                      </strong>
                    </div>

                    {/* SVG Speedometer Semi-Circle Gauge */}
                    <div className="flex items-center justify-center py-2 relative">
                      <svg viewBox="0 0 120 70" className="w-36 h-20 overflow-visible">
                        {/* Gauge Arc */}
                        <path
                          d="M 10 60 A 50 50 0 0 1 110 60"
                          fill="none"
                          stroke="#e2e8f0"
                          strokeWidth="8"
                          strokeLinecap="round"
                          className="dark:stroke-slate-800"
                        />
                        <path
                          d="M 10 60 A 50 50 0 0 1 35 25"
                          fill="none"
                          stroke="#f43f5e"
                          strokeWidth="8"
                          strokeLinecap="round"
                        />
                        {/* Needle */}
                        <motion.g
                          animate={{
                            rotate: [
                              activeBenchmark.manual.speedGaugeAngle - 4,
                              activeBenchmark.manual.speedGaugeAngle + 2,
                              activeBenchmark.manual.speedGaugeAngle - 3,
                            ],
                          }}
                          transition={{
                            duration: 2.8,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                          style={{ originX: "60px", originY: "60px" }}
                        >
                          <line x1="60" y1="60" x2="60" y2="15" stroke="#f43f5e" strokeWidth="3" strokeLinecap="round" />
                          <circle cx="60" cy="60" r="5" fill="#f43f5e" />
                        </motion.g>
                      </svg>
                      <div className="absolute bottom-1 text-center font-mono">
                        <span className="text-[11px] font-bold text-rose-600 dark:text-rose-400 block">
                          18% VELOCITY
                        </span>
                      </div>
                    </div>

                    {/* Live Race Completed Counter & Progress Bar */}
                    <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800 space-y-2">
                      <div className="text-xs font-mono flex items-center justify-between">
                        <span className="text-slate-500 dark:text-slate-400">Processed in race:</span>
                        <strong className="text-rose-600 dark:text-rose-400">
                          {humanProgress} / 1,000 tasks (Backlog queued)
                        </strong>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-rose-500 h-full rounded-full transition-all duration-300"
                          style={{ width: `${Math.max(2, (humanProgress / 1000) * 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Metric 2: Monthly Cost Infographic Bar */}
                  <div className="p-4 rounded-2xl bg-rose-50/40 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/50 space-y-1">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                        <DollarSign className="w-3.5 h-3.5 text-rose-500" />
                        Staffing Expense:
                      </span>
                      <strong className="text-rose-600 dark:text-rose-400 text-base font-bold">
                        {activeBenchmark.manual.monthlyCost}
                      </strong>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      {activeBenchmark.manual.costDetail}
                    </p>
                  </div>

                  {/* Supporting Friction Points */}
                  <div className="space-y-3 pt-2 text-xs">
                    <div className="flex items-start gap-2.5">
                      <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-slate-800 dark:text-slate-200">Error Frequency: </strong>
                        <span className="text-slate-600 dark:text-slate-400">{activeBenchmark.manual.errorRate}</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-slate-800 dark:text-slate-200">Operating Window: </strong>
                        <span className="text-slate-600 dark:text-slate-400">{activeBenchmark.manual.availability}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Bottleneck Warning */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-2 text-xs font-mono text-rose-600 dark:text-rose-400">
                  <ShieldAlert className="w-4 h-4 shrink-0" />
                  <span>{activeBenchmark.manual.bottleneck}</span>
                </div>
              </div>

              {/* ---------------- RIGHT INFOGRAPHIC CARD: ZENIVIXON AUTONOMOUS AI ---------------- */}
              <div className="rounded-3xl bg-gradient-to-b from-[#0b1528] via-[#081020] to-[#040813] text-white border-2 border-emerald-500/60 p-6 sm:p-8 shadow-xl shadow-emerald-500/10 flex flex-col justify-between space-y-6 relative overflow-hidden group">
                {/* Glowing Emerald Aura Backdrop */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

                <div className="space-y-6 relative z-10">
                  {/* Card Header with Turbo Badge */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 shadow-md shadow-emerald-500/20">
                        <Bot className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono uppercase font-bold tracking-widest text-emerald-400 block">
                          ENGINEERED AI SOLUTION
                        </span>
                        <h3 className="text-lg font-bold text-white font-heading">
                          ZENIVIXON Autonomous Pipeline
                        </h3>
                      </div>
                    </div>

                    <span className="text-[11px] font-mono font-bold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 shadow-sm shadow-emerald-500/30 flex items-center gap-1.5 animate-pulse">
                      <Zap className="w-3 h-3 fill-current" />
                      100x VELOCITY
                    </span>
                  </div>

                  {/* 🚀 ANIMATED INFOGRAPHIC: Neon Turbo Gauge & Live Fast Counter */}
                  <div className="p-4 rounded-2xl bg-slate-900/80 border border-emerald-500/30 space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-300 flex items-center gap-1.5">
                        <Gauge className="w-4 h-4 text-emerald-400" />
                        Live Velocity Gauge:
                      </span>
                      <strong className="text-emerald-400 font-bold">
                        {activeBenchmark.ai.speedLabel}
                      </strong>
                    </div>

                    {/* SVG Speedometer Semi-Circle Gauge (Turbo Zone) */}
                    <div className="flex items-center justify-center py-2 relative">
                      <svg viewBox="0 0 120 70" className="w-36 h-20 overflow-visible">
                        {/* Gauge Arc */}
                        <path
                          d="M 10 60 A 50 50 0 0 1 110 60"
                          fill="none"
                          stroke="#1e293b"
                          strokeWidth="8"
                          strokeLinecap="round"
                        />
                        <path
                          d="M 10 60 A 50 50 0 0 1 110 60"
                          fill="none"
                          stroke="url(#ai-gradient)"
                          strokeWidth="8"
                          strokeLinecap="round"
                          className="drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]"
                        />
                        <defs>
                          <linearGradient id="ai-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#3b82f6" />
                            <stop offset="50%" stopColor="#06b6d4" />
                            <stop offset="100%" stopColor="#10b981" />
                          </linearGradient>
                        </defs>
                        {/* Needle pinned in Turbo Zone with continuous revving oscillation */}
                        <motion.g
                          animate={{
                            rotate: [
                              activeBenchmark.ai.speedGaugeAngle - 4,
                              activeBenchmark.ai.speedGaugeAngle + 3,
                              activeBenchmark.ai.speedGaugeAngle - 2,
                              activeBenchmark.ai.speedGaugeAngle,
                            ],
                          }}
                          transition={{
                            duration: 1.8,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                          style={{ originX: "60px", originY: "60px" }}
                        >
                          <line x1="60" y1="60" x2="60" y2="15" stroke="#10b981" strokeWidth="3" strokeLinecap="round" />
                          <circle cx="60" cy="60" r="5" fill="#10b981" />
                        </motion.g>
                      </svg>
                      <div className="absolute bottom-1 text-center font-mono">
                        <span className="text-[11px] font-bold text-emerald-400 block animate-pulse">
                          MAX WARP VELOCITY (100%)
                        </span>
                      </div>
                    </div>

                    {/* Live Race Completed Counter & Glowing Progress Bar */}
                    <div className="pt-2 border-t border-slate-800 space-y-2">
                      <div className="text-xs font-mono flex items-center justify-between">
                        <span className="text-slate-400">Processed in race:</span>
                        <strong className="text-emerald-400 font-bold">
                          {aiProgress} / 1,000 tasks ({Math.round((aiProgress / 1000) * 100)}% Completed)
                        </strong>
                      </div>
                      <div className="w-full bg-slate-800/80 h-2 rounded-full overflow-hidden relative">
                        <div
                          className="bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 h-full rounded-full transition-all duration-150 shadow-[0_0_10px_rgba(16,185,129,0.8)]"
                          style={{ width: `${(aiProgress / 1000) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Metric 2: Monthly API Cost */}
                  <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 space-y-1">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-300 flex items-center gap-1.5">
                        <TrendingDown className="w-3.5 h-3.5 text-emerald-400" />
                        Operational Cost:
                      </span>
                      <div className="flex items-baseline gap-2">
                        <strong className="text-emerald-400 text-base font-bold">
                          {activeBenchmark.ai.monthlyCost}
                        </strong>
                        <span className="text-[10px] text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded-md font-bold">
                          ~97% Savings
                        </span>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      {activeBenchmark.ai.costDetail}
                    </p>
                  </div>

                  {/* Supporting Strengths */}
                  <div className="space-y-3 pt-2 text-xs">
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white">Validation Standard: </strong>
                        <span className="text-slate-300">{activeBenchmark.ai.errorRate}</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white">Operating Window: </strong>
                        <span className="text-slate-300">{activeBenchmark.ai.availability}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Value Highlight */}
                <div className="pt-4 border-t border-white/10 flex items-center gap-2 text-xs font-mono text-emerald-300 relative z-10">
                  <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-400" />
                  <span>{activeBenchmark.ai.benefit}</span>
                </div>
              </div>
            </div>

            {/* Bottom 3 Aggregate Value Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-4 rounded-2xl bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800 text-center shadow-xs">
                <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 uppercase font-bold block mb-1">
                  Speed Acceleration
                </span>
                <span className="text-sm sm:text-base font-extrabold text-blue-600 dark:text-blue-400 font-heading">
                  {activeBenchmark.impact.timeReduction}
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800 text-center shadow-xs">
                <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 uppercase font-bold block mb-1">
                  Bottom-Line Recovery
                </span>
                <span className="text-sm sm:text-base font-extrabold text-emerald-600 dark:text-emerald-400 font-heading">
                  {activeBenchmark.impact.annualSavedDollars}
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800 text-center shadow-xs">
                <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 uppercase font-bold block mb-1">
                  System Scalability
                </span>
                <span className="text-sm sm:text-base font-extrabold text-indigo-600 dark:text-indigo-400 font-heading">
                  {activeBenchmark.impact.throughputBoost}
                </span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
