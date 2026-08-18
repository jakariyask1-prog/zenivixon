import React from "react";
import Link from "next/link";
import { Bot, Cpu, Network, Globe, ArrowRight, Check } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { SOLUTIONS_DATA } from "@/data/solutions";

const iconMap: Record<string, React.ReactNode> = {
  "ai-agents": <Bot className="w-6 h-6 text-blue-600" />,
  "ai-automation": <Cpu className="w-6 h-6 text-cyan-600" />,
  "software-web-development": <Globe className="w-6 h-6 text-indigo-600" />,
  "ai-integration": <Network className="w-6 h-6 text-purple-600" />,
};

export function CoreSolutionsSection() {
  return (
    <section className="py-20 md:py-32 border-t border-slate-200/80 bg-[#FFFFFF] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl space-y-4 mb-16">
          <Badge variant="blue" size="sm" className="font-semibold text-xs tracking-widest">
            WHAT WE BUILD
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0F172A] tracking-tight font-heading leading-tight">
            AI Solutions Built Around Your Business.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            We engineer bespoke software, modern web platforms, automated workflows, and 24/7 intelligent customer support agents designed specifically for your business operations.
          </p>
        </div>

        {/* 4 Core Solutions Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SOLUTIONS_DATA.map((solution, idx) => (
            <div
              key={solution.slug}
              className="rounded-3xl bg-white border border-slate-200/90 shadow-sm p-7 flex flex-col justify-between group hover:border-slate-300 hover:shadow-md transition-all duration-300 relative"
            >
              <div className="space-y-5">
                {/* Header with Icon & Index */}
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center">
                    {iconMap[solution.slug] || <Bot className="w-6 h-6 text-blue-600" />}
                  </div>
                  <span className="text-xs font-heading text-slate-500 font-bold">
                    0{idx + 1}
                  </span>
                </div>

                {/* Title & Tagline */}
                <div>
                  <h3 className="text-xl font-bold text-[#0F172A] font-heading group-hover:text-blue-600 transition-colors">
                    {solution.title}
                  </h3>
                  <p className="text-xs font-heading text-cyan-700 mt-1 font-semibold">
                    {solution.positioning}
                  </p>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-600 leading-relaxed">
                  {solution.description}
                </p>

                {/* Structured Feature Capabilities */}
                <div className="space-y-2.5 pt-2 border-t border-slate-100">
                  <div className="text-xs font-bold text-slate-700 uppercase tracking-widest font-heading">
                    Core Capabilities:
                  </div>
                  {solution.features.slice(0, 3).map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-700">
                      <div className="mt-0.5 w-3.5 h-3.5 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0">
                        <Check className="w-2 h-2 text-blue-600" />
                      </div>
                      <span className="leading-snug text-xs">{feat.title}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Link */}
              <div className="pt-6 mt-4 border-t border-slate-100">
                <Link
                  href={`/solutions/${solution.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 group-hover:text-blue-700 transition-colors"
                >
                  <span>Explore {solution.shortTitle}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
