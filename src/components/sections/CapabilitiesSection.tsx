"use client";

import React from "react";
import { Search, TrendingUp, CheckCircle2, ChevronRight, PenTool, Users, ArrowUpRight } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function CapabilitiesSection() {
  return (
    <section className="py-24 md:py-32 bg-[#FCFDFE] dark:bg-[#020817]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <ScrollReveal direction="up" delay={0.1}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold uppercase tracking-[0.2em] mb-6 font-heading">
              <div className="w-2 h-2 rounded-full bg-blue-600" />
              OUR CAPABILITIES
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-[#0F172A] dark:text-white font-heading tracking-tight mb-6">
              5 Ways We Automate<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Your Business Growth</span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Transform repetitive tasks into intelligent workflows. Automate what matters most and scale what delivers results.
            </p>
          </ScrollReveal>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          
          {/* Feature 1: AI Agent Development (Mockup UI) */}
          <ScrollReveal direction="up" delay={0.2} className="h-full">
            <div className="p-8 md:p-10 rounded-3xl bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none h-full flex flex-col justify-between group">
              <div>
                <h3 className="text-2xl md:text-3xl font-extrabold text-[#0F172A] dark:text-white font-heading mb-4">
                  AI Agent Development
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                  Custom AI agents that intelligently handle customer inquiries, qualify leads, and close deals automatically around the clock.
                </p>
              </div>
              
              {/* Fake UI Mockup */}
              <div className="mt-auto bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-6 border border-slate-100 dark:border-slate-800 transition-transform duration-500 group-hover:-translate-y-2">
                <div className="flex items-center gap-3 bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm mb-4">
                  <Search className="w-5 h-5 text-slate-400" />
                  <span className="text-slate-400 font-medium text-sm flex-1">Research anything...</span>
                  <div className="bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider">
                    Research
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-500/50 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3 text-slate-700 dark:text-slate-200 font-semibold text-sm">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                        <PenTool className="w-4 h-4" />
                      </div>
                      Software & app industry
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-blue-500" />
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-500/50 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3 text-slate-700 dark:text-slate-200 font-semibold text-sm">
                      <div className="w-8 h-8 rounded-lg bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                        <Users className="w-4 h-4" />
                      </div>
                      High Converting customers
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-purple-500" />
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Feature 2: AI Strategy Consulting (Checklists) */}
          <ScrollReveal direction="up" delay={0.3} className="h-full">
            <div className="p-8 md:p-10 rounded-3xl bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none h-full flex flex-col justify-between group">
              <div>
                <h3 className="text-2xl md:text-3xl font-extrabold text-[#0F172A] dark:text-white font-heading mb-4">
                  AI Strategy Consulting
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                  Expert guidance on where and how to start becoming a leader in AI adoption. A ranked, scoped AI roadmap designed by experts.
                </p>
                
                {/* Checklist */}
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0" />
                    <span className="text-slate-700 dark:text-slate-300 font-medium text-lg">Strategic AI roadmap</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0" />
                    <span className="text-slate-700 dark:text-slate-300 font-medium text-lg">Technology assessment</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0" />
                    <span className="text-slate-700 dark:text-slate-300 font-medium text-lg">ROI analysis</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0" />
                    <span className="text-slate-700 dark:text-slate-300 font-medium text-lg">Best practice implementation</span>
                  </li>
                </ul>
              </div>
              
              {/* Fake Analytics Mockup */}
              <div className="mt-auto bg-slate-900 rounded-2xl p-6 border border-slate-800 transition-transform duration-500 group-hover:-translate-y-2 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 blur-3xl rounded-full" />
                <div className="flex items-end gap-3 h-24">
                  <div className="w-1/6 bg-blue-500/40 rounded-t-sm h-1/4"></div>
                  <div className="w-1/6 bg-blue-500/60 rounded-t-sm h-2/4"></div>
                  <div className="w-1/6 bg-blue-500/80 rounded-t-sm h-3/4"></div>
                  <div className="w-1/6 bg-cyan-400 rounded-t-sm h-full relative">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_10px_2px_rgba(255,255,255,0.8)]" />
                  </div>
                  <div className="w-1/6 bg-blue-500/40 rounded-t-sm h-2/3"></div>
                </div>
                <div className="mt-4 flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>PREDICTION: TRENDING UP</span>
                  <TrendingUp className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
