"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { AmbientOrbs } from "@/components/ui/AmbientOrbs";
import {
  Calculator,
  TrendingUp,
  Clock,
  Zap,
  ArrowRight,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export function RoiCalculatorSection({
  onOpenAuditModal,
}: {
  onOpenAuditModal?: () => void;
}) {
  const [teamSize, setTeamSize] = useState<number>(8);
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(12);
  const [hourlyRate, setHourlyRate] = useState<number>(35);

  const calculations = useMemo(() => {
    const totalWeeklyHours = teamSize * hoursPerWeek;
    const totalAnnualHours = totalWeeklyHours * 52;
    // 75% average automatable workload with autonomous AI & workflow bots
    const annualHoursSaved = Math.round(totalAnnualHours * 0.75);
    const monthlyHoursSaved = Math.round(annualHoursSaved / 12);

    const grossAnnualCost = totalAnnualHours * hourlyRate;
    const annualSavings = Math.round(annualHoursSaved * hourlyRate);
    const monthlySavings = Math.round(annualSavings / 12);

    // Equivalent full-time headcount freed up
    const fteEquivalent = (annualHoursSaved / 2080).toFixed(1);

    return {
      annualHoursSaved,
      monthlyHoursSaved,
      annualSavings,
      monthlySavings,
      grossAnnualCost,
      fteEquivalent,
    };
  }, [teamSize, hoursPerWeek, hourlyRate]);

  return (
    <section
      id="roi-calculator"
      className="py-20 md:py-32 border-t border-slate-200/80 dark:border-slate-800/80 bg-[#FCFDFE] dark:bg-[#060b18] relative transition-colors duration-300 overflow-hidden"
    >
      <AmbientOrbs />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 md:mb-20">
          <Badge variant="emerald" size="sm" className="font-semibold text-xs tracking-widest gap-1.5">
            <Calculator className="w-3.5 h-3.5" />
            ROI & SAVINGS CALCULATOR
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0F172A] dark:text-white tracking-tight font-heading leading-tight">
            Calculate How Much AI Automation Saves Your Business
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
            Estimate the exact annual dollars and manual hours ZENIVIXON autonomous agents and workflow pipelines will recover for your team.
          </p>
        </div>

        {/* Calculator Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-6xl mx-auto">
          {/* Left Column: Interactive Sliders */}
          <div className="lg:col-span-6 bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                <span className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-heading">
                  Your Team Parameters
                </span>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
                  Live Estimate
                </span>
              </div>

              {/* Slider 1: Team Size */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm font-semibold">
                  <label htmlFor="team-size" className="text-slate-800 dark:text-slate-200 flex items-center gap-2">
                    Team Members in Operations / Admin
                  </label>
                  <span className="text-blue-600 dark:text-blue-400 font-bold font-mono text-base bg-blue-50 dark:bg-blue-950/80 px-2.5 py-0.5 rounded-lg border border-blue-100 dark:border-blue-900">
                    {teamSize} {teamSize === 1 ? "person" : "people"}
                  </span>
                </div>
                <input
                  id="team-size"
                  type="range"
                  min="1"
                  max="50"
                  step="1"
                  value={teamSize}
                  onChange={(e) => setTeamSize(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600 focus:outline-none"
                />
                <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                  <span>1 person</span>
                  <span>25 people</span>
                  <span>50+ people</span>
                </div>
              </div>

              {/* Slider 2: Hours per Week */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm font-semibold">
                  <label htmlFor="hours-per-week" className="text-slate-800 dark:text-slate-200 flex items-center gap-2">
                    Repetitive Work Hours / Week (per person)
                  </label>
                  <span className="text-cyan-600 dark:text-cyan-400 font-bold font-mono text-base bg-cyan-50 dark:bg-cyan-950/80 px-2.5 py-0.5 rounded-lg border border-cyan-100 dark:border-cyan-900">
                    {hoursPerWeek} hrs/week
                  </span>
                </div>
                <input
                  id="hours-per-week"
                  type="range"
                  min="2"
                  max="35"
                  step="1"
                  value={hoursPerWeek}
                  onChange={(e) => setHoursPerWeek(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-600 focus:outline-none"
                />
                <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                  <span>2 hrs</span>
                  <span>15 hrs (typical)</span>
                  <span>35 hrs</span>
                </div>
              </div>

              {/* Slider 3: Hourly Rate */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm font-semibold">
                  <label htmlFor="hourly-rate" className="text-slate-800 dark:text-slate-200 flex items-center gap-2">
                    Average Hourly Cost / Salary ($)
                  </label>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold font-mono text-base bg-emerald-50 dark:bg-emerald-950/80 px-2.5 py-0.5 rounded-lg border border-emerald-100 dark:border-emerald-900">
                    ${hourlyRate}/hr
                  </span>
                </div>
                <input
                  id="hourly-rate"
                  type="range"
                  min="15"
                  max="120"
                  step="5"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-600 focus:outline-none"
                />
                <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                  <span>$15/hr</span>
                  <span>$50/hr</span>
                  <span>$120/hr</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#070e1e] border border-slate-200/80 dark:border-slate-800 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Calculations are based on <strong>75% realistic automation coverage</strong> across customer triage, data syncing, lead enrichment, and document ops using custom AI pipelines.
              </p>
            </div>
          </div>

          {/* Right Column: Dynamic Projected Impact Card */}
          <div className="lg:col-span-6 bg-gradient-to-b from-[#0F172A] to-[#020817] text-white border border-blue-500/20 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col justify-between relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-cyan-600/15 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10 space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4" /> Projected ROI Matrix
                </span>
                <span className="text-xs bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full border border-emerald-500/30 font-semibold">
                  High Impact
                </span>
              </div>

              {/* Big Savings Number */}
              <div className="space-y-1">
                <div className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Estimated Annual Cost Saved
                </div>
                <div className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-300 to-blue-400 font-heading tracking-tight">
                  ${calculations.annualSavings.toLocaleString()}
                  <span className="text-base sm:text-lg font-normal text-slate-400">/yr</span>
                </div>
                <p className="text-xs text-slate-400 font-mono">
                  ≈ ${calculations.monthlySavings.toLocaleString()} recovered every month
                </p>
                <p className="text-[10px] text-slate-500/80 mt-1.5 leading-snug">
                  Illustrative estimate. Actual savings vary based on workflow, volume, labor cost, and automation coverage.
                </p>
              </div>

              {/* 3 Metric Breakdown Grid */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-1">
                  <div className="text-slate-400 text-xs flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" /> Annual Hours Saved
                  </div>
                  <div className="text-2xl font-bold font-heading text-white">
                    {calculations.annualHoursSaved.toLocaleString()} <span className="text-xs text-slate-400 font-normal">hrs</span>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    ≈ {calculations.monthlyHoursSaved} hrs/mo freed
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-1">
                  <div className="text-slate-400 text-xs flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-yellow-400" /> Staff Capacity Boost
                  </div>
                  <div className="text-2xl font-bold font-heading text-white">
                    +{calculations.fteEquivalent} <span className="text-xs text-slate-400 font-normal">FTEs</span>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Without hiring extra headcount
                  </div>
                </div>
              </div>

              {/* Proof / Trust Quote */}
              <div className="flex items-center gap-3 pt-2 text-xs text-slate-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  Typical Zenivixon client achieves <strong>full payback in under 30 days</strong> of deployment.
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div className="relative z-10 pt-8 mt-6 border-t border-white/10 flex flex-col sm:flex-row gap-3">
              <Button
                variant="glowing"
                size="md"
                className="w-full sm:flex-1 justify-center cursor-pointer"
                onClick={onOpenAuditModal}
                href={onOpenAuditModal ? undefined : "/contact"}
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Claim Free 3-Min Video Audit
              </Button>
              <Button
                variant="outline"
                size="md"
                className="w-full sm:w-auto text-white border-white/20 hover:bg-white/10"
                href="/start-a-project"
              >
                Scope Project
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
