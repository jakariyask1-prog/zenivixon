import React from "react";
import Link from "next/link";
import { ArrowRight, RefreshCw, Unplug, Headphones, Globe, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

const pathways = [
  {
    problem: "Customer Support Delays",
    problemDesc: "High inquiry volumes, delayed response times, and repetitive tier-1 customer tickets straining your support team.",
    solution: "AI Customer Support Agents",
    solutionDesc: "Autonomous, tool-using support agents resolving routine inquiries, querying records, and routing edge cases 24/7.",
    value: "24/7 Instant Resolution",
    valueDesc: "Sub-minute response times, zero missed inquiries, and automatic escalation to human staff.",
    icon: <Headphones className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
    badgeVariant: "blue" as const,
    link: "/solutions/ai-agents",
  },
  {
    problem: "Repetitive Manual Work",
    problemDesc: "Staff spends hours manually extracting document data, retyping invoices, processing spreadsheets, and updating CRMs.",
    solution: "AI Workflow Automation",
    solutionDesc: "Deterministic extraction pipelines, automated schema validations, and webhook-driven event workflows.",
    value: "Operational Efficiency",
    valueDesc: "Eliminates manual rekeying, reduces cycle time from hours to seconds, and cuts operational friction.",
    icon: <RefreshCw className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />,
    badgeVariant: "cyan" as const,
    link: "/solutions/ai-automation",
  },
  {
    problem: "Legacy / Custom Web Needs",
    problemDesc: "Businesses need modern, responsive web applications, client portals, and SaaS interfaces with native AI capabilities.",
    solution: "Modern Web & AI Development",
    solutionDesc: "High-performance Next.js/React web applications, interactive dashboards, and custom embedded AI copilots.",
    value: "High-Performance Growth",
    valueDesc: "Blazing fast web speed, modern accessible design, and intelligent interactive user experiences.",
    icon: <Globe className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
    badgeVariant: "indigo" as const,
    link: "/solutions/software-web-development",
  },
  {
    problem: "Disconnected Tech Stacks",
    problemDesc: "Valuable company data remains trapped across isolated databases, legacy software, and disparate cloud tools.",
    solution: "AI System Integration & RAG",
    solutionDesc: "Clean API adapters, custom vector retrieval (RAG) layers, and microservices connecting AI into existing tools.",
    value: "Unified Intelligence",
    valueDesc: "Connects your software ecosystem with zero platform disruption or expensive rip-and-replace.",
    icon: <Unplug className="w-5 h-5 text-purple-600 dark:text-purple-400" />,
    badgeVariant: "purple" as const,
    link: "/solutions/ai-integration",
  },
];

export function WhatWeDoSection() {
  return (
    <section className="py-20 md:py-32 border-t border-slate-200/80 dark:border-slate-800/80 bg-[#F7F9FC] dark:bg-[#070d1d] relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl space-y-4 mb-16 md:mb-20">
          <Badge variant="blue" size="sm" className="font-semibold text-xs tracking-widest">
            AI FOR REAL BUSINESS
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0F172A] dark:text-white tracking-tight font-heading leading-tight">
            Turn AI Into an Advantage.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
            We don&apos;t build AI for hype or novelty. We solve concrete operational bottlenecks by converting business challenges into practical, reliable, and automated AI web systems.
          </p>
        </div>

        {/* 4 Problem-to-Value Pathways Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative mb-16">
          {pathways.map((item, idx) => (
            <div
              key={idx}
              className="p-7 rounded-3xl bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800/90 dark:border-slate-800 shadow-sm dark:shadow-none flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md transition-all duration-200 group relative"
            >
              <div className="space-y-5">
                {/* Header with Icon & Category */}
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 dark:border-slate-700 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <span className="text-xs font-heading text-slate-500 dark:text-slate-400 font-bold">
                    PATHWAY 0{idx + 1}
                  </span>
                </div>

                {/* Problem Box */}
                <div>
                  <div className="text-xs font-heading text-rose-600 dark:text-rose-400 uppercase font-bold tracking-widest">
                    Business Problem:
                  </div>
                  <h3 className="text-lg font-bold text-[#0F172A] dark:text-white font-heading mt-0.5">
                    {item.problem}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
                    {item.problemDesc}
                  </p>
                </div>

                {/* Arrow Divider */}
                <div className="flex items-center gap-2 text-xs font-heading text-slate-400 dark:text-slate-600 dark:text-slate-400 font-medium py-1">
                  <span className="w-full h-px bg-slate-100 dark:bg-slate-800" />
                  <span>&darr;</span>
                  <span className="w-full h-px bg-slate-100 dark:bg-slate-800" />
                </div>

                {/* Solution & Value */}
                <div>
                  <div className="text-xs font-heading text-blue-700 dark:text-blue-400 uppercase font-bold tracking-widest">
                    AI Solution:
                  </div>
                  <div className="text-sm font-bold text-[#0F172A] dark:text-white font-heading">
                    {item.solution}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                    {item.solutionDesc}
                  </p>
                </div>

                {/* Business Value Highlight */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>Value: {item.value}</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-snug">
                    {item.valueDesc}
                  </p>
                </div>
              </div>

              {/* Action Link */}
              <div className="pt-6 mt-4 border-t border-slate-100 dark:border-slate-800">
                <Link
                  href={item.link}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors"
                >
                  <span>Explore {item.solution}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Primary V1 Focus Callout Banner */}
        <div className="rounded-3xl bg-white dark:bg-[#0b1120] border border-blue-100 dark:border-blue-900/40 p-8 md:p-10 shadow-sm dark:shadow-none flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-600" />
              <span className="text-xs font-heading font-bold text-blue-700 dark:text-blue-400 uppercase tracking-widest">
                Our Core Services &bull; Practical Execution
              </span>
            </div>
            <h4 className="text-xl font-bold text-[#0F172A] dark:text-white font-heading">
              Web Development + AI Automation + AI Customer Support + Custom Integration.
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Whether you need a full-scale AI-powered web platform, automated backend workflows, or 24/7 intelligent customer support agents—we deliver deterministic systems designed around your real operational needs.
            </p>
          </div>
          <Button
            variant="primary"
            size="md"
            href="/start-a-project"
            icon={<ArrowRight className="w-4 h-4" />}
            className="shrink-0 font-semibold"
          >
            Start Your AI Project
          </Button>
        </div>
      </div>
    </section>
  );
}
