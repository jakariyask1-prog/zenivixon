import React from "react";
import { Badge } from "@/components/ui/Badge";
import {
  Target,
  Wrench,
  Sliders,
  MessageCircle,
  Zap,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { StaggerContainer, StaggerItem } from "@/components/ui/StaggerContainer";
import { AmbientOrbs } from "@/components/ui/AmbientOrbs";
import { Button } from "@/components/ui/Button";

const comparisonData = [
  {
    feature: "Team & Communication",
    legacy: "Account managers & outsourced junior devs",
    zenivixon: "Direct access to Senior AI Architects & Engineers",
  },
  {
    feature: "Time to First Working MVP",
    legacy: "3 to 6 months of corporate bureaucracy",
    zenivixon: "7 to 14 days rapid production sprint",
  },
  {
    feature: "Risk & Commitment",
    legacy: "$30k–$60k locked upfront contracts",
    zenivixon: "14-Day Pilot",
  },
  {
    feature: "AI Architecture Safety",
    legacy: "Generic chat wrappers that hallucinate",
    zenivixon: "Deterministic guardrails & schema validation",
  },
  {
    feature: "Software Stack Integration",
    legacy: "Costly 'rip-and-replace' migrations",
    zenivixon: "Zero lock-in; plugs into your existing tools",
  },
  {
    feature: "Pricing Model",
    legacy: "Bloated hourly billing & change fees",
    zenivixon: "Clear, transparent milestone-based pricing",
  },
];

const reasons = [
  {
    title: "Direct Engineer Access",
    badge: "NO MIDDLEMEN",
    icon: <MessageCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
    description:
      "You collaborate directly with the AI architects and senior engineers building your system. No non-technical account managers, no communication bottlenecks, and zero outsourcing.",
  },
  {
    title: "14-Day Pilot",
    badge: "EVALUATION PILOT",
    icon: <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
    description:
      "Start with a focused pilot before committing to a larger implementation. We deploy a working proof-of-concept on your actual workflow in 14 days.",
  },
  {
    title: "3x Faster Velocity",
    badge: "RAPID DELIVERY",
    icon: <Zap className="w-5 h-5 text-amber-600 dark:text-amber-400" />,
    description:
      "Using modern AI-native engineering pipelines and clean modular architectures, we deliver production-ready systems in weeks that legacy consultancies take months to plan.",
  },
  {
    title: "Grounded & Validated AI",
    badge: "DETERMINISTIC",
    icon: <Wrench className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
    description:
      "We don't build toys or naive wrappers. We engineer deterministic systems with strict Pydantic schemas, isolated sandboxes, and human-in-the-loop escalation paths for mission-critical reliability.",
  },
  {
    title: "Works With Your Existing Stack",
    badge: "NO MIGRATIONS",
    icon: <Sliders className="w-5 h-5 text-purple-600 dark:text-purple-400" />,
    description:
      "No costly platform replacements. Our lightweight API adapters seamlessly embed AI agents and automations directly into your current CRM, ERP, databases, and internal tools.",
  },
  {
    title: "Focused Problem-First Alignment",
    badge: "MEASURABLE ROI",
    icon: <Target className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />,
    description:
      "Every line of code is tied to a measurable business outcome—reclaiming staff hours, eliminating processing errors, and accelerating response turnaround for quantifiable ROI.",
  },
];

export function WhyZenivixonSection() {
  return (
    <section className="py-20 md:py-32 border-t border-slate-200/80 dark:border-slate-800/80 bg-[#F7F9FC] dark:bg-[#070d1d] relative transition-colors duration-300 overflow-hidden">
      <AmbientOrbs />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-20">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <Badge variant="blue" size="sm" className="font-semibold text-xs tracking-widest">
            THE ZENIVIXON ADVANTAGE
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0F172A] dark:text-white tracking-tight font-heading leading-tight">
            Why Forward-Thinking Businesses Choose Us Over Legacy Agencies.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
            Large traditional agencies carry massive overhead, bloated retainers, and layers of corporate bureaucracy. ZENIVIXON gives you an agile, high-density AI engineering team that executes with speed, precision, and zero fluff.
          </p>
        </div>

        {/* 🥊 High-Impact Comparison Matrix */}
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
          <div className="p-6 sm:p-8 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold font-heading uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1">
                <Sparkles className="w-4 h-4" />
                DIRECT HEAD-TO-HEAD COMPARISON
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#0F172A] dark:text-white font-heading">
                Big Reputed Agencies vs. ZENIVIXON
              </h3>
            </div>
            <span className="text-xs font-heading font-semibold px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 w-fit">
              100% Transparent Execution
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-xs uppercase tracking-wider font-heading text-slate-500 dark:text-slate-400 bg-slate-50/40 dark:bg-slate-900/40">
                  <th className="py-4 px-6 font-bold">Key Consideration</th>
                  <th className="py-4 px-6 font-bold text-red-600/90 dark:text-red-400/90">
                    ❌ Traditional Big Agencies
                  </th>
                  <th className="py-4 px-6 font-bold text-emerald-600 dark:text-emerald-400 bg-blue-50/50 dark:bg-blue-950/20">
                    ✅ ZENIVIXON Technologies
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                {comparisonData.map((row, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors"
                  >
                    <td className="py-4 px-6 font-bold text-slate-800 dark:text-slate-200 font-heading">
                      {row.feature}
                    </td>
                    <td className="py-4 px-6 text-slate-500 dark:text-slate-400">
                      <div className="flex items-center gap-2">
                        <XCircle className="w-4 h-4 text-red-500 shrink-0" />
                        <span>{row.legacy}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 font-semibold text-slate-900 dark:text-white bg-blue-50/30 dark:bg-blue-950/10">
                      <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>{row.zenivixon}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 6 High-Density Value Pillars */}
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-[#0F172A] dark:text-white font-heading">
              Our 6 Core Engineering Pillars
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Why fast-growing companies trust ZENIVIXON with mission-critical systems.
            </p>
          </div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reasons.map((item, idx) => (
              <StaggerItem key={idx}>
                <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full group relative overflow-hidden">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-11 h-11 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900 flex items-center justify-center group-hover:scale-110 transition-transform">
                        {item.icon}
                      </div>
                      <span className="text-[10px] font-bold font-heading px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                        {item.badge}
                      </span>
                    </div>
                    <h4 className="text-xl font-bold text-[#0F172A] dark:text-white font-heading group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        {/* 🛡️ Risk Reversal Bottom Banner */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="space-y-2 text-center md:text-left z-10">
            <span className="text-xs font-bold uppercase tracking-widest font-heading px-3 py-1 rounded-full bg-white/20 border border-white/30 inline-block">
              Zero Commitment • Free Assessment
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-heading">
              Ready to see how much manual work AI can save you?
            </h3>
            <p className="text-blue-100 text-sm max-w-xl leading-relaxed">
              Book a 15-minute technical discovery session or request a free 3-minute workflow audit. No sales pressure, ever.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0 z-10">
            <Button
              variant="secondary"
              size="lg"
              href="/start-a-project"
              icon={<ArrowRight className="w-4 h-4" />}
              className="bg-white text-slate-900 hover:bg-slate-100 font-bold shadow-lg"
            >
              Start Your AI Project
            </Button>
          </div>
        </div>

      </div>
    </section>
  );
}
