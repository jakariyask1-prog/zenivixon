import React from "react";
import { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { SOLUTIONS_DATA } from "@/data/solutions";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Bot, Cpu, Network, Globe, ArrowRight, CheckCircle2 } from "lucide-react";
import { COMPANY_INFO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Solutions | AI Agents, AI Automation, Web Development & AI Integration",
  description:
    "Explore ZENIVIXON's core AI solutions: Autonomous AI Agents & Customer Support, Intelligent Workflow Automation, Custom Software & Web Development, and Enterprise AI Integration.",
};

const iconMap: Record<string, React.ReactNode> = {
  "ai-agents": <Bot className="w-8 h-8 text-blue-600" />,
  "ai-automation": <Cpu className="w-8 h-8 text-cyan-600" />,
  "software-web-development": <Globe className="w-8 h-8 text-indigo-600" />,
  "ai-integration": <Network className="w-8 h-8 text-purple-600" />,
};

export default function SolutionsPage() {
  return (
    <>
      <PageHeader
        badge="SOLUTIONS OVERVIEW"
        title="Practical AI & Software Systems Engineered for Business."
        description="We focus on four core pillars: 24/7 AI customer support agents, intelligent workflow automation, modern web and custom software development, and seamless enterprise system integration."
        breadcrumbs={[{ label: "Solutions" }]}
      />

      <div className="py-20 md:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Solution Pillar Cards */}
        <div className="space-y-16">
          {SOLUTIONS_DATA.map((solution, idx) => (
            <div
              key={solution.slug}
              id={solution.slug}
              className="rounded-3xl bg-white border border-slate-200 dark:border-slate-800 p-8 sm:p-12 shadow-sm transition-all hover:border-slate-300 hover:shadow-lg relative overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Left Overview */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200 dark:border-slate-800 flex items-center justify-center">
                    {iconMap[solution.slug] || <Bot className="w-8 h-8 text-blue-600" />}
                  </div>

                  <div>
                    <span className="text-xs font-heading text-slate-500 dark:text-slate-400 font-bold uppercase">
                      PILLAR 0{idx + 1}
                    </span>
                    <h2 className="text-3xl font-bold text-[#0F172A] dark:text-white font-heading mt-1">
                      {solution.title}
                    </h2>
                    <p className="text-sm font-heading text-cyan-700 mt-1 font-semibold">
                      {solution.positioning}
                    </p>
                  </div>

                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {solution.description}
                  </p>

                  <div className="pt-2">
                    <Button
                      variant="primary"
                      size="md"
                      href={`/solutions/${solution.slug}`}
                      icon={<ArrowRight className="w-4 h-4" />}
                    >
                      Explore {solution.shortTitle} Details
                    </Button>
                  </div>
                </div>

                {/* Right Capabilities Grid */}
                <div className="lg:col-span-7 bg-slate-50/70 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800/80 space-y-6">
                  <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest font-heading">
                    Core Capabilities &amp; Features
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {solution.features.map((feature, fIdx) => (
                      <div
                        key={fIdx}
                        className="p-4 rounded-xl bg-white border border-slate-200 dark:border-slate-800/80 shadow-xs space-y-2"
                      >
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0" />
                          <h4 className="text-sm font-bold text-[#0F172A] dark:text-white font-heading">
                            {feature.title}
                          </h4>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Target Use Cases */}
                  <div className="pt-4 border-t border-slate-200">
                    <span className="text-xs font-heading text-slate-500 dark:text-slate-400 uppercase tracking-widest font-semibold">
                      Ideal for:
                    </span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {solution.useCases.map((uc, uIdx) => (
                        <Badge key={uIdx} variant="slate" size="sm">
                          {uc.title}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Box */}
        <div className="rounded-3xl bg-[#F7F9FC] dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800 p-8 sm:p-12 text-center space-y-6 shadow-sm">
          <h3 className="text-2xl sm:text-3xl font-bold text-[#0F172A] dark:text-white font-heading">
            Need a custom AI architecture or software platform?
          </h3>
          <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto text-sm leading-relaxed">
            Tell us about your current workflow and operational bottlenecks. We provide a structured technical assessment and implementation roadmap.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Button variant="primary" size="lg" href="/start-a-project">
              Start Your AI Project
            </Button>
            <Button variant="whatsapp" size="lg" href={COMPANY_INFO.channels.whatsapp} external>
              Chat on WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
