"use client";

import React from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { AmbientOrbs } from "@/components/ui/AmbientOrbs";
import {
  ShieldCheck,
  Zap,
  MessageSquare,
  RefreshCw,
  ArrowRight,
  Sparkles,
  Lock,
  CheckCircle2,
} from "lucide-react";

export function PilotSprintSection({
  onOpenAuditModal,
}: {
  onOpenAuditModal?: () => void;
}) {
  return (
    <section className="py-20 md:py-32 border-t border-slate-200/80 dark:border-slate-800/80 bg-[#FCFDFE] dark:bg-[#060b18] relative transition-colors duration-300 overflow-hidden">
      <AmbientOrbs />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Pilot Banner Container */}
        <div className="relative rounded-3xl p-8 sm:p-12 lg:p-16 bg-gradient-to-b from-[#0F172A] via-[#0b1120] to-[#020817] text-white border-2 border-yellow-400/40 shadow-2xl overflow-hidden max-w-6xl mx-auto">
          {/* Background Glows */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-12 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-400/10 text-yellow-300 border border-yellow-400/30 text-xs font-bold font-mono uppercase tracking-widest">
              <ShieldCheck className="w-4 h-4 text-yellow-400" />
              14-Day Pilot
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-heading leading-tight">
              Test Our Engineering with a{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-200 to-yellow-400">
                14-Day Pilot Sprint
              </span>
            </h2>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              We don&apos;t expect you to commit to long retainers with an agency you just discovered. See real, working AI automations deployed in your environment first.
            </p>
          </div>

          {/* 3 Pillars of the Pilot */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10 mb-12">
            {/* Pillar 1 */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-4 hover:border-yellow-400/30 transition-all">
              <div className="w-12 h-12 rounded-xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center text-yellow-400 font-bold">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white font-heading">
                1. Shipped in 14 Days
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                We design, build, and deploy your first high-impact automated AI workflow or custom agent in under two weeks.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-4 hover:border-yellow-400/30 transition-all">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-cyan-400 font-bold">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white font-heading">
                2. Direct Slack/Teams Access
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Collaborate directly with senior AI automation engineers. Zero account managers, zero bureaucratic delay.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-4 hover:border-yellow-400/30 transition-all">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold">
                <RefreshCw className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white font-heading">
                3. Performance Benchmarks
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                If the deployed automation doesn&apos;t meet your agreed velocity and accuracy benchmarks, you owe $0.
              </p>
            </div>
          </div>

          {/* Action Bar & Badges */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
            <div className="space-y-1 text-center sm:text-left">
              <div className="text-sm font-bold text-white flex items-center justify-center sm:justify-start gap-2">
                <Lock className="w-4 h-4 text-yellow-400" />
                No Long-Term Lock-in Required
              </div>
              <div className="text-xs text-slate-400">
                You own 100% of all generated code, n8n workflows, and data pipelines.
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Button
                variant="glowing"
                size="lg"
                href="/start-a-project"
                icon={<ArrowRight className="w-4 h-4" />}
                className="w-full sm:w-auto justify-center"
              >
                Claim Your 14-Day Pilot Sprint
              </Button>
              {onOpenAuditModal && (
                <Button
                  variant="outline"
                  size="lg"
                  onClick={onOpenAuditModal}
                  className="w-full sm:w-auto justify-center text-white border-white/20 hover:bg-white/10 cursor-pointer"
                >
                  Request Video Audit First
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
