"use client";

import React from "react";
import { InteractiveAgentSimulator } from "@/components/ui/InteractiveAgentSimulator";
import { Sparkles } from "lucide-react";

export function AgentSimulatorSection() {
  return (
    <section
      id="live-agent-simulator"
      className="py-16 md:py-24 relative overflow-hidden bg-[#F8FAFC] dark:bg-[#070c18] border-y border-slate-200/80 dark:border-slate-800/80 transition-colors duration-300"
    >
      {/* Background Subtle Tech Grid & Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] dark:bg-[radial-gradient(#1e3a8a_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.18] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-500/10 dark:bg-blue-600/15 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Prominent Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100/80 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-widest font-heading mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 animate-pulse" />
            <span>Interactive Live AI Agent Simulator</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0F172A] dark:text-white tracking-tight font-heading leading-tight">
            Experience Autonomous AI <br className="hidden sm:block" />
            <span className="text-gradient-animated">In Real-Time Action</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
            Don&apos;t just read theory. Select any enterprise workflow below and click{" "}
            <strong className="text-blue-600 dark:text-blue-400">“Run Live Simulation”</strong> to watch our
            autonomous multi-agent pipeline ingest requests, reason with tools, update databases, and deliver verified
            results in sub-seconds.
          </p>

          <div className="mt-4 inline-flex items-center gap-4 text-xs font-mono text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              Real Pipeline Emulation
            </span>
            <span>&bull;</span>
            <span>3 Enterprise Use Cases</span>
            <span>&bull;</span>
            <span>Zero Human Intervention</span>
          </div>
        </div>

        {/* Live Simulator Widget */}
        <InteractiveAgentSimulator />
      </div>
    </section>
  );
}
