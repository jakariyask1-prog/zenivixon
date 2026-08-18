import React from "react";
import { Badge } from "@/components/ui/Badge";
import { Search, Compass, Code2, Layers, TrendingUp } from "lucide-react";

const steps = [
  {
    step: "01",
    title: "Discover",
    subtitle: "Audit Problem & Systems",
    icon: <Search className="w-5 h-5 text-blue-600" />,
    description:
      "We begin by understanding your exact business challenge, current operational workflows, data silos, and the software tools your team already uses.",
  },
  {
    step: "02",
    title: "Design",
    subtitle: "Architect Safe AI Logic",
    icon: <Compass className="w-5 h-5 text-cyan-600" />,
    description:
      "We design a targeted AI and system architecture with clear deterministic guardrails, structured validation schemas, and safe escalation paths.",
  },
  {
    step: "03",
    title: "Build",
    subtitle: "Engineer & Validate",
    icon: <Code2 className="w-5 h-5 text-indigo-600" />,
    description:
      "We engineer the actual AI agents, automation pipelines, or integration adapters, testing rigorously against real operational business data.",
  },
  {
    step: "04",
    title: "Integrate",
    subtitle: "Connect Live Ecosystem",
    icon: <Layers className="w-5 h-5 text-purple-600" />,
    description:
      "We connect the solution directly into your existing business ecosystem (CRMs, ERPs, databases, and APIs) with zero operational disruption.",
  },
  {
    step: "05",
    title: "Improve",
    subtitle: "Iterate & Scale Value",
    icon: <TrendingUp className="w-5 h-5 text-emerald-600" />,
    description:
      "We monitor live telemetry, gather real-world operator feedback, and continuously refine performance, accuracy, and throughput as you scale.",
  },
];

export function HowWeWorkSection() {
  return (
    <section className="py-20 md:py-32 border-t border-slate-200/80 bg-[#F7F9FC] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl space-y-4 mb-16 md:mb-20">
          <Badge variant="blue" size="sm" className="font-semibold text-xs tracking-widest">
            HOW WE WORK
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0F172A] tracking-tight font-heading leading-tight">
            From Business Challenge to Working AI.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            We don&apos;t start with abstract technology or trendy models—we start with your business problem. Here is how we take you from operational bottleneck to a reliable, production AI system.
          </p>
        </div>

        {/* 5-Step Process Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {steps.map((item) => (
            <div
              key={item.step}
              className="rounded-2xl bg-white border border-slate-200/90 shadow-sm p-6 flex flex-col justify-between hover:border-slate-300 hover:shadow-md transition-all duration-200"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <span className="text-xs font-heading text-slate-500 font-bold">
                    STEP {item.step}
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#0F172A] font-heading">
                  {item.title}
                </h3>
                <p className="text-xs font-heading text-cyan-700 mt-1 mb-2.5 font-semibold">
                  {item.subtitle}
                </p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Psychological Commitment Box */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-white border border-blue-100 shadow-sm max-w-3xl mx-auto text-center space-y-2">
          <p className="text-xs font-heading uppercase tracking-widest text-blue-700 font-bold">
            Our Core Engineering Promise
          </p>
          <p className="text-base font-semibold text-[#0F172A] font-heading leading-snug">
            &ldquo;We won&apos;t just build something with AI. We understand what your business actually needs and engineer systems that work.&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
}
