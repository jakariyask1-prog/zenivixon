"use client";
import React from "react";
import Image from "next/image";
import { ArrowRight, Database, Bot, Cpu, TrendingUp, CheckCircle2, ArrowUpRight, Sparkles, Globe, Headphones } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { NeuralNetworkAnimation } from "@/components/ui/NeuralNetworkAnimation";
import { RotatingTextBanner } from "@/components/ui/RotatingTextBanner";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { motion } from "framer-motion";
import { FluidAuroraBackground } from "@/components/ui/FluidAuroraBackground";

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden bg-transparent transition-colors duration-300">
      {/* 🚀 NEW: Premium Fluid Aurora Background */}
      <FluidAuroraBackground />

      {/* Background Subtle Depth Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_10%,#000_70%,transparent_100%)] opacity-40 pointer-events-none z-0" />

      {/* Premium Neural Network Background Animation */}
      <NeuralNetworkAnimation />

      {/* Full Width Marquee Ticker */}
      <div className="relative z-10 w-full mb-8">
        <RotatingTextBanner />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-6">
          <ScrollReveal direction="up" delay={0.1}>
            {/* Enhanced Premium Eyebrow Badge */}
            <div className="inline-flex items-center justify-center gap-2.5 px-5 py-2 sm:px-6 sm:py-2.5 rounded-full bg-blue-50/90 dark:bg-blue-950/40 border border-blue-200/90 dark:border-blue-800/80 text-blue-800 dark:text-blue-300 shadow-sm shadow-blue-500/10 hover:border-blue-300 dark:hover:border-blue-700 transition-all">
              <div className="w-5 h-5 rounded-full bg-blue-600/10 dark:bg-blue-400/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs sm:text-sm font-bold uppercase tracking-widest font-heading">
                AI-FIRST TECHNOLOGY COMPANY
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2}>
            {/* Locked Core Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0F172A] dark:text-white tracking-tight leading-[1.15] font-heading">
              Automate Your Business. Engage Customers 24/7. <br className="hidden sm:block" />
              <span className="text-gradient-animated">Scale with AI.</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.3}>
            {/* Core Message / Subheadline */}
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed font-normal mx-auto">
              ZENIVIXON builds high-performance <strong>modern web applications</strong>, <strong>intelligent workflow automations</strong>, <strong>24/7 AI customer support agents</strong>, and custom integrations that connect seamlessly into your existing business software.
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.4}>
            {/* Locked Conversion CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto">
              <Button
                variant="glowing"
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
                className="w-full sm:w-auto text-base px-7 py-4 font-semibold"
              >
                Explore Solutions
              </Button>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.5}>
            {/* Trust & Focus Pillars */}
            <div className="pt-6 flex flex-wrap items-center justify-center gap-y-3 gap-x-6 text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                <span>Modern Web &amp; App Development</span>
              </div>
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
                <span>AI Workflow Automation</span>
              </div>
              <div className="flex items-center gap-2">
                <Headphones className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                <span>24/7 AI Customer Support</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Existing System Integration</span>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Premium Cover Photo Section */}
        <motion.div className="mt-24 sm:mt-32 w-full max-w-6xl mx-auto relative group px-4 sm:px-6 lg:px-8">
          {/* Animated Glowing Aurora Backdrop */}
          <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-blue-500/30 via-cyan-400/30 to-indigo-500/30 blur-2xl rounded-[3rem] opacity-70 animate-[glow_4s_ease-in-out_infinite_alternate] z-0" />
          
          {/* Levitating Glass Container */}
          <div className="p-2 sm:p-3 rounded-[2.5rem] bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border border-white/60 dark:border-white/10 shadow-2xl shadow-blue-900/20 relative z-10 animate-[float_6s_ease-in-out_infinite]">
            <div className="rounded-3xl overflow-hidden relative border border-slate-200/50 dark:border-slate-800/50 bg-slate-100 dark:bg-slate-900">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />
              <Image
                src="/cover-photo.png"
                alt="ZENIVIXON Platform Integration"
                width={1200}
                height={675}
                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                priority
              />
            </div>
          </div>
        </motion.div>

        {/* Premium System Flow Visualization: Business Systems → AI → Automation → Outcome */}
        <div className="mt-20 md:mt-28 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800/90 dark:border-slate-800 p-5 sm:p-7 md:p-8 shadow-xl shadow-slate-200/50 dark:shadow-none transition-colors duration-300">
            {/* Top Bar Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4 mb-6 gap-2">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700" />
                <div className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700" />
                <div className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700" />
                <span className="text-xs font-heading text-slate-500 dark:text-slate-400 ml-2 font-medium">
                  enterprise_transformation_architecture
                </span>
              </div>
              <div className="text-xs font-heading text-cyan-700 dark:text-cyan-300 bg-cyan-50 dark:bg-cyan-950/40 px-2.5 py-1 rounded-full border border-cyan-200 dark:border-cyan-800 font-semibold">
                SYSTEM TOPOLOGY: DETERMINISTIC
              </div>
            </div>

            {/* 4-Stage Connected Pipeline Flow */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-0 relative">
              {/* Stage 1: Business Systems */}
              <div className="relative">
                <SpotlightCard className="p-5 bg-slate-50/80 dark:bg-slate-900/50 flex flex-col justify-between hover:bg-white dark:hover:bg-slate-850 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-sm" spotlightColor="rgba(148, 163, 184, 0.15)">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-heading text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest">
                        Stage 01
                      </span>
                      <div className="w-8 h-8 rounded-lg bg-slate-200/70 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300">
                        <Database className="w-4 h-4" />
                      </div>
                    </div>
                    <h3 className="text-sm font-bold text-[#0F172A] dark:text-white font-heading">
                      Business Systems
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
                      Existing CRMs, ERPs, databases, websites, customer support inboxes, and APIs.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-200/80 dark:border-slate-800 text-xs font-heading text-slate-600 dark:text-slate-400 font-medium">
                    &bull; Zero Disruption to Stack
                  </div>
                </SpotlightCard>
                {/* Arrow Connector → */}
                <div className="hidden md:flex absolute -right-3.5 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-800 dark:border-slate-700 shadow-sm items-center justify-center text-xs text-cyan-600 dark:text-cyan-400 font-bold">
                  →
                </div>
                {/* Mobile down arrow */}
                <div className="md:hidden flex justify-center py-2 text-cyan-600 dark:text-cyan-400 text-sm font-bold">↓</div>
              </div>

              {/* Stage 2: AI Intelligence */}
              <div className="relative">
                <SpotlightCard className="p-5 bg-blue-50/50 dark:bg-blue-950/20 flex flex-col justify-between hover:bg-blue-50/80 dark:hover:bg-blue-950/40 hover:border-blue-300 dark:hover:border-blue-800 hover:shadow-sm" spotlightColor="rgba(59, 130, 246, 0.15)">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-heading text-blue-700 dark:text-blue-400 font-bold uppercase tracking-widest">
                        Stage 02
                      </span>
                      <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-700 dark:text-blue-400">
                        <Bot className="w-4 h-4" />
                      </div>
                    </div>
                    <h3 className="text-sm font-bold text-[#0F172A] dark:text-white font-heading">
                      AI Intelligence
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
                      Support agents, multi-model reasoning, web interfaces, and validation schemas.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-blue-200/80 dark:border-blue-900/50 text-xs font-heading text-blue-700 dark:text-blue-400 font-semibold">
                    &bull; 24/7 Context &amp; Triage
                  </div>
                </SpotlightCard>
                {/* Arrow Connector → */}
                <div className="hidden md:flex absolute -right-3.5 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-white dark:bg-slate-800 border border-blue-200 dark:border-blue-800 shadow-sm items-center justify-center text-xs text-cyan-600 dark:text-cyan-400 font-bold">
                  →
                </div>
                <div className="md:hidden flex justify-center py-2 text-cyan-600 dark:text-cyan-400 text-sm font-bold">↓</div>
              </div>

              {/* Stage 3: Automation */}
              <div className="relative">
                <SpotlightCard className="p-5 bg-cyan-50/50 dark:bg-cyan-950/20 flex flex-col justify-between hover:bg-cyan-50/80 dark:hover:bg-cyan-950/40 hover:border-cyan-300 dark:hover:border-cyan-800 hover:shadow-sm" spotlightColor="rgba(6, 182, 212, 0.15)">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-heading text-cyan-700 dark:text-cyan-400 font-bold uppercase tracking-widest">
                        Stage 03
                      </span>
                      <div className="w-8 h-8 rounded-lg bg-cyan-100 dark:bg-cyan-900/50 flex items-center justify-center text-cyan-700 dark:text-cyan-400">
                        <Cpu className="w-4 h-4" />
                      </div>
                    </div>
                    <h3 className="text-sm font-bold text-[#0F172A] dark:text-white font-heading">
                      Automation
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
                      Automated document parsing, ERP sync, email replies, and webhook routing.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-cyan-200/80 dark:border-cyan-900/50 text-xs font-heading text-cyan-800 dark:text-cyan-400 font-semibold">
                    &bull; Continuous Execution
                  </div>
                </SpotlightCard>
                {/* Arrow Connector → */}
                <div className="hidden md:flex absolute -right-3.5 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-white dark:bg-slate-800 border border-cyan-200 dark:border-cyan-800 shadow-sm items-center justify-center text-xs text-cyan-600 dark:text-cyan-400 font-bold">
                  →
                </div>
                <div className="md:hidden flex justify-center py-2 text-cyan-600 dark:text-cyan-400 text-sm font-bold">↓</div>
              </div>

              {/* Stage 4: Measurable Outcome */}
              <SpotlightCard className="p-5 bg-emerald-50/50 dark:bg-emerald-950/20 flex flex-col justify-between hover:bg-emerald-50/80 dark:hover:bg-emerald-950/40 hover:border-emerald-300 dark:hover:border-emerald-800 hover:shadow-sm" spotlightColor="rgba(16, 185, 129, 0.15)">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-heading text-emerald-700 dark:text-emerald-400 font-bold uppercase tracking-widest">
                      Stage 04
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-700 dark:text-emerald-400">
                      <TrendingUp className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="text-sm font-bold text-[#0F172A] dark:text-white font-heading">
                    Business Outcome
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
                    Sub-minute customer support, zero manual rekeying, and modern web software.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-emerald-200/80 dark:border-emerald-900/50 text-xs font-heading text-emerald-700 dark:text-emerald-400 font-semibold">
                  &bull; Scalable Business Advantage
                </div>
              </SpotlightCard>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

