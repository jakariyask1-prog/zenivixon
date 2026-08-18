import React from "react";
import { Badge } from "@/components/ui/Badge";
import { Target, Wrench, Sliders, MessageCircle, FastForward, Shield } from "lucide-react";

const reasons = [
  {
    title: "Focused Expert Team",
    icon: <Target className="w-5 h-5 text-blue-600" />,
    description:
      "We do not dilute our attention across generic digital marketing or legacy software packages. We focus exclusively on practical AI agents, intelligent automations, and custom AI integrations.",
  },
  {
    title: "Direct Technical Communication",
    icon: <MessageCircle className="w-5 h-5 text-cyan-600" />,
    description:
      "You communicate and collaborate directly with the engineers architecting and building your AI systems. No layers of non-technical account managers or communication bottlenecks.",
  },
  {
    title: "Practical AI Implementation",
    icon: <Wrench className="w-5 h-5 text-indigo-600" />,
    description:
      "We do not build AI for novelty or hype. Every system we design is directly tied to an operational bottleneck—reducing manual work hours, preventing errors, and accelerating processing speed.",
  },
  {
    title: "Custom Solutions for Your Stack",
    icon: <Sliders className="w-5 h-5 text-purple-600" />,
    description:
      "Every company operates with distinct data formats, permission tiers, and software tools. We engineer tailor-made architectures designed specifically for your exact business requirements.",
  },
  {
    title: "Business-First Approach",
    icon: <Shield className="w-5 h-5 text-emerald-600" />,
    description:
      "We start with your business problem, workflow, and measurable objectives—not with abstract model hype. We engineer deterministic systems with guardrails that deliver real value.",
  },
  {
    title: "Focused & Agile Execution",
    icon: <FastForward className="w-5 h-5 text-amber-600" />,
    description:
      "Without the bureaucratic inertia of giant consulting firms, we move rapidly from problem discovery to working prototypes, sandbox validation, and live production deployment.",
  },
];

export function WhyZenivixonSection() {
  return (
    <section className="py-20 md:py-32 border-t border-slate-200/80 bg-[#F7F9FC] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl space-y-4 mb-16 md:mb-20">
          <Badge variant="blue" size="sm" className="font-semibold text-xs tracking-widest">
            WHY ZENIVIXON
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0F172A] tracking-tight font-heading leading-tight">
            Focused Expertise. Practical AI. Real Business Value.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Large enterprise consultancies offer broad, expensive retainers with layers of bureaucracy. ZENIVIXON gives you direct access to specialized engineers dedicated to building practical, working AI systems.
          </p>
        </div>

        {/* 6 Grid Value Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((item, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:border-slate-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-[#0F172A] font-heading">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Truthful Credibility Positioning Callout */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm text-center max-w-2xl mx-auto space-y-2">
          <p className="text-xs font-heading uppercase tracking-widest text-slate-500 font-bold">
            High-Density Engineering Advantage
          </p>
          <p className="text-sm text-slate-700 leading-relaxed font-medium">
            Focused &rarr; Direct &rarr; Responsive &rarr; Technical. We engineer solutions that solve real business challenges from day one.
          </p>
        </div>
      </div>
    </section>
  );
}
