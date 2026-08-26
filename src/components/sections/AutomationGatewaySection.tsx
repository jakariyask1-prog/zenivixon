"use client";

import React from "react";
import { ArrowUpRight, Zap, Workflow, Hexagon, Database, Cpu, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function AutomationGatewaySection() {
  return (
    <section className="relative py-24 md:py-40 bg-white dark:bg-[#020817] overflow-hidden border-t border-slate-100 dark:border-slate-900/50 transition-colors duration-300">
      
      {/* Scanline / Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]"></div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl flex items-center justify-center animate-[bounce_4s_infinite] opacity-70">
        <Workflow className="w-5 h-5 text-blue-500" />
      </div>
      <div className="absolute top-1/3 right-1/4 translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl flex items-center justify-center animate-[bounce_5s_infinite_0.5s] opacity-70">
        <Hexagon className="w-7 h-7 text-emerald-500" />
      </div>
      <div className="absolute bottom-1/4 left-1/3 -translate-x-1/2 translate-y-1/2 w-10 h-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl flex items-center justify-center animate-[bounce_3s_infinite_1s] opacity-70">
        <Database className="w-4 h-4 text-purple-500" />
      </div>
      <div className="absolute bottom-1/3 right-1/3 translate-x-1/2 translate-y-1/2 w-14 h-14 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl flex items-center justify-center animate-[bounce_4.5s_infinite_0.2s] opacity-70">
        <Cpu className="w-6 h-6 text-orange-500" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center">
        
        <ScrollReveal direction="up" delay={0.1}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50 text-blue-700 dark:text-blue-400 text-xs font-bold uppercase tracking-[0.2em] mb-8 font-heading">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            AUTOMATION GATEWAY
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.2}>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-[#0F172A] dark:text-white font-heading tracking-tight leading-none mb-6">
            DEPLOY<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">AUTOMATION</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.3}>
          <div className="flex items-center gap-2 text-sm md:text-base font-mono font-medium text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-900/80 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 mb-6">
            <span className="text-emerald-500">&gt;</span> System status: 
            <span className="font-bold text-emerald-600 dark:text-emerald-400">READY_FOR_DEPLOYMENT</span>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.4}>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mb-12">
            Transform your business operations today. Eliminate manual work, reduce costs, and scale infinitely with our custom AI infrastructure.
          </p>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.5}>
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Button
              variant="glowing"
              size="lg"
              href="/start-a-project"
              className="w-full sm:w-auto h-14 px-8 text-base tracking-wide"
            >
              <span className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                INITIALIZE AUTOMATION
                <ArrowUpRight className="w-5 h-5" />
              </span>
            </Button>
            <Button
              variant="secondary"
              size="lg"
              href="/contact"
              className="w-full sm:w-auto h-14 px-8 text-base tracking-wide uppercase font-bold text-slate-600 dark:text-slate-300 border-2"
            >
              <span className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                BOOK FREE CALL
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </Button>
          </div>
        </ScrollReveal>
        
      </div>
    </section>
  );
}
