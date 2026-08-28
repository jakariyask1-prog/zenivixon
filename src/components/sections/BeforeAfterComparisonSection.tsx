"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { AmbientOrbs } from "@/components/ui/AmbientOrbs";
import {
  Sparkles,
  XCircle,
  CheckCircle2,
  Clock,
  DollarSign,
  AlertTriangle,
  Zap,
  ArrowRight,
  Bot,
  FileSpreadsheet,
  Database,
} from "lucide-react";

interface WorkflowData {
  id: string;
  title: string;
  icon: React.ReactNode;
  category: string;
  before: {
    title: string;
    metrics: string;
    points: { label: string; detail: string }[];
    bottomNote: string;
  };
  after: {
    title: string;
    metrics: string;
    points: { label: string; detail: string }[];
    bottomNote: string;
  };
  stats: {
    speedBoost: string;
    costReduction: string;
    accuracy: string;
  };
}

const workflows: WorkflowData[] = [
  {
    id: "support-triage",
    title: "Customer Support & Lead Triage",
    category: "Support & Sales Ops",
    icon: <Bot className="w-4 h-4" />,
    before: {
      title: "Traditional Manual Triage",
      metrics: "Avg. 4 - 8 Hours Lag",
      points: [
        {
          label: "Delayed First Response",
          detail: "Leads wait hours for triage, leading to high bounce rates and lost inbound deals.",
        },
        {
          label: "Expensive Human Tier-1 Queue",
          detail: "3 dedicated reps answering the same 20 repetitive questions all day ($7,500/mo).",
        },
        {
          label: "Night & Weekend Coverage Gap",
          detail: "Zero instant responses outside business hours, losing international customers.",
        },
        {
          label: "Inconsistent CRM Data Entry",
          detail: "Reps forget to update lead stages, notes, and custom attributes correctly.",
        },
      ],
      bottomNote: "High overhead, slow response, missed high-intent buyers.",
    },
    after: {
      title: "ZENIVIXON Autonomous AI Agent",
      metrics: "Under 3 Seconds Execution",
      points: [
        {
          label: "Sub-3-Second Intelligent Reply",
          detail: "Autonomous agent reads knowledge base, diagnoses question, and resolves or routes instantly.",
        },
        {
          label: "90% Cost Reduction",
          detail: "Handles 5,000+ tickets/mo autonomously for under $200 in API tokens.",
        },
        {
          label: "24/7/365 Global Uptime",
          detail: "Instant multilingual customer qualification and calendar scheduling in any timezone.",
        },
        {
          label: "Zero-Error CRM Auto-Sync",
          detail: "Automatically updates HubSpot/Salesforce with conversation summaries and deal tags.",
        },
      ],
      bottomNote: "Instant satisfaction, 10x pipeline velocity, fractional cost.",
    },
    stats: {
      speedBoost: "480x Faster",
      costReduction: "-92% Cost",
      accuracy: "99.8% Precision",
    },
  },
  {
    id: "doc-processing",
    title: "Invoices, Receipts & Doc Extraction",
    category: "Finance & Operations",
    icon: <FileSpreadsheet className="w-4 h-4" />,
    before: {
      title: "Manual Copy-Paste Extraction",
      metrics: "15 - 30 Mins per Doc",
      points: [
        {
          label: "Painful Manual Transcription",
          detail: "Staff spends hours downloading PDFs and typing line items into ERP/QuickBooks.",
        },
        {
          label: "Frequent Typing & Decimal Errors",
          detail: "7-12% human error rate on invoices, causing billing disputes and audit nightmares.",
        },
        {
          label: "Format & Schema Chaos",
          detail: "Each supplier sends invoices in different formats, breaking legacy OCR templates.",
        },
        {
          label: "Slow Month-End Closing",
          detail: "Accounting team delayed by 5-7 business days reconciling receipts and POs.",
        },
      ],
      bottomNote: "Fatiguing manual drudgery with high compliance risk.",
    },
    after: {
      title: "ZENIVIXON Vision-AI Pipeline",
      metrics: "< 1.5 Seconds per Document",
      points: [
        {
          label: "Instant Multi-Modal Extraction",
          detail: "Extracts table lines, tax IDs, and totals from any messy PDF, scan, or photo.",
        },
        {
          label: "Deterministic Validation Guardrails",
          detail: "Cross-checks mathematical sums and PO numbers before committing to ERP.",
        },
        {
          label: "Adaptive Schema Normalization",
          detail: "Zero template training required—automatically adapts to new vendor formats.",
        },
        {
          label: "Instant Reconciliation & Slack Alert",
          detail: "Auto-approves valid invoices and pings manager only when an anomaly is detected.",
        },
      ],
      bottomNote: "100% automated flow, zero manual typos, seamless accounting.",
    },
    stats: {
      speedBoost: "120x Faster",
      costReduction: "-88% Cost",
      accuracy: "99.9% Verified",
    },
  },
  {
    id: "crm-sync",
    title: "Multi-App CRM & Database Sync",
    category: "Engineering & Growth",
    icon: <Database className="w-4 h-4" />,
    before: {
      title: "Fragmented Zapier / Manual Sync",
      metrics: "Constant Breakages & Lag",
      points: [
        {
          label: "Brittle Webhook Connectors",
          detail: "Basic no-code zaps constantly time out on rate limits and drop customer payload data.",
        },
        {
          label: "Siloed Information Across Apps",
          detail: "Stripe, Slack, Notion, and PostgreSQL have conflicting customer data states.",
        },
        {
          label: "No Failure Recovery or Logging",
          detail: "When a sync fails silently, sales reps pitch outdated leads or duplicate records.",
        },
        {
          label: "Exorbitant Monthly Task Fees",
          detail: "Paying thousands of dollars per month on SaaS automation task quotas.",
        },
      ],
      bottomNote: "Data discrepancies, silent failures, mounting SaaS bills.",
    },
    after: {
      title: "ZENIVIXON n8n & Custom Event Mesh",
      metrics: "Real-Time Event Streams",
      points: [
        {
          label: "Enterprise n8n / Python Orchestration",
          detail: "Self-hosted high-throughput event queues with automatic retries and dead-letter queues.",
        },
        {
          label: "Single Source of Truth Synchronization",
          detail: "Bi-directional instant sync across database, CRM, Stripe, and internal communication.",
        },
        {
          label: "Full Audit Logs & Automated Alerts",
          detail: "Detailed execution logs with automated Slack alerts on anomalies or edge cases.",
        },
        {
          label: "Zero Per-Task Tax",
          detail: "Scales to millions of executions without scaling platform licensing fees.",
        },
      ],
      bottomNote: "Rock-solid data pipeline, complete ownership, infinite scale.",
    },
    stats: {
      speedBoost: "Real-time",
      costReduction: "-75% Tool Cost",
      accuracy: "100% Guaranteed",
    },
  },
];

export function BeforeAfterComparisonSection() {
  const [selectedWorkflow, setSelectedWorkflow] = useState<string>("support-triage");

  const current = workflows.find((w) => w.id === selectedWorkflow) || workflows[0];

  return (
    <section className="py-20 md:py-32 border-t border-slate-200/80 dark:border-slate-800/80 bg-[#F7F9FC] dark:bg-[#070d1d] relative transition-colors duration-300 overflow-hidden">
      <AmbientOrbs />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12 md:mb-16">
          <Badge variant="cyan" size="sm" className="font-semibold text-xs tracking-widest gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            WORKFLOW TRANSFORMATION
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0F172A] dark:text-white tracking-tight font-heading leading-tight">
            See the Difference: Manual Chaos vs. AI Precision
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
            Select a critical business workflow to see how replacing manual busywork with ZENIVIXON autonomous AI changes your operational velocity.
          </p>
        </div>

        {/* Workflow Tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
          {workflows.map((wf) => {
            const isActive = wf.id === selectedWorkflow;
            return (
              <button
                key={wf.id}
                onClick={() => setSelectedWorkflow(wf.id)}
                className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/20 font-bold scale-[1.02]"
                    : "bg-white dark:bg-[#0b1120] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                }`}
              >
                {wf.icon}
                <span>{wf.title}</span>
              </button>
            );
          })}
        </div>

        {/* Before vs After Split Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="space-y-6 max-w-6xl mx-auto"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-stretch">
              {/* LEFT CARD: BEFORE (Traditional / Manual) */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0b1120] border-2 border-red-200/60 dark:border-red-950/40 shadow-sm flex flex-col justify-between space-y-6 relative overflow-hidden">
                <div className="space-y-6">
                  {/* Card Header */}
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 pb-4">
                    <div className="space-y-1">
                      <span className="text-[11px] font-bold tracking-widest uppercase text-red-600 dark:text-red-400 font-mono flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5" /> Traditional Approach
                      </span>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white font-heading">
                        {current.before.title}
                      </h3>
                    </div>
                    <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-red-50 dark:bg-red-950/60 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-900">
                      {current.before.metrics}
                    </span>
                  </div>

                  {/* Pain Points List */}
                  <div className="space-y-4">
                    {current.before.points.map((pt, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                        <div className="space-y-0.5">
                          <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                            {pt.label}
                          </h4>
                          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                            {pt.detail}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Footer */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 text-xs font-medium text-red-600/90 dark:text-red-400/90 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{current.before.bottomNote}</span>
                </div>
              </div>

              {/* RIGHT CARD: AFTER (Zenivixon Autonomous AI) */}
              <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#020817] to-[#0b1120] text-white border-2 border-emerald-500/50 shadow-xl flex flex-col justify-between space-y-6 relative overflow-hidden">
                {/* Glowing Aura Effect */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

                <div className="space-y-6 relative z-10">
                  {/* Card Header */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div className="space-y-1">
                      <span className="text-[11px] font-bold tracking-widest uppercase text-emerald-400 font-mono flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5" /> The ZENIVIXON Advantage
                      </span>
                      <h3 className="text-xl font-bold text-white font-heading">
                        {current.after.title}
                      </h3>
                    </div>
                    <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      {current.after.metrics}
                    </span>
                  </div>

                  {/* Transformation Points */}
                  <div className="space-y-4">
                    {current.after.points.map((pt, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                        <div className="space-y-0.5">
                          <h4 className="text-sm font-bold text-white">
                            {pt.label}
                          </h4>
                          <p className="text-xs text-slate-300 leading-relaxed">
                            {pt.detail}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Footer */}
                <div className="pt-4 border-t border-white/10 text-xs font-medium text-emerald-400 flex items-center gap-2 relative z-10">
                  <Sparkles className="w-4 h-4 shrink-0" />
                  <span>{current.after.bottomNote}</span>
                </div>
              </div>
            </div>

            {/* Impact Metric Strip */}
            <div className="p-4 sm:p-6 rounded-2xl bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-6 divide-x divide-slate-200 dark:divide-slate-800 text-center sm:text-left">
                <div className="pr-4 space-y-0.5">
                  <div className="text-[11px] font-mono uppercase text-slate-500 dark:text-slate-400">Velocity</div>
                  <div className="text-lg sm:text-xl font-extrabold text-blue-600 dark:text-blue-400 font-heading">
                    {current.stats.speedBoost}
                  </div>
                </div>
                <div className="px-4 space-y-0.5">
                  <div className="text-[11px] font-mono uppercase text-slate-500 dark:text-slate-400">Overhead</div>
                  <div className="text-lg sm:text-xl font-extrabold text-emerald-600 dark:text-emerald-400 font-heading">
                    {current.stats.costReduction}
                  </div>
                </div>
                <div className="pl-4 space-y-0.5">
                  <div className="text-[11px] font-mono uppercase text-slate-500 dark:text-slate-400">Reliability</div>
                  <div className="text-lg sm:text-xl font-extrabold text-purple-600 dark:text-purple-400 font-heading">
                    {current.stats.accuracy}
                  </div>
                </div>
              </div>

              <Button
                variant="primary"
                size="sm"
                href="/start-a-project"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Transform This Workflow
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
