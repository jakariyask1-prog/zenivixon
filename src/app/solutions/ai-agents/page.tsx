import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { SOLUTIONS_DATA } from "@/data/solutions";
import { PROJECTS_DATA } from "@/data/projects";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Bot, CheckCircle2, ArrowRight, ArrowUpRight } from "lucide-react";
import { COMPANY_INFO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "AI Agent Development | Autonomous Business Agents",
  description:
    "Build autonomous AI agents that execute real business tasks, interact with internal software, process complex data, and assist human operators without fragility.",
};

export default function AiAgentsPage() {
  const solution = SOLUTIONS_DATA.find((s) => s.slug === "ai-agents")!;
  const relevantProjects = PROJECTS_DATA.filter((p) => p.category === "ai-agents");

  return (
    <>
      <PageHeader
        badge="CORE PILLAR 01"
        title="AI Agent Development"
        description="Build AI agents that handle real business tasks across your workflow. Deterministic tool execution, safe sandboxing, and human-in-the-loop oversight."
        breadcrumbs={[
          { label: "Solutions", href: "/solutions" },
          { label: "AI Agents" },
        ]}
        actions={
          <div className="flex flex-wrap gap-3">
            <Button variant="primary" size="md" href="/start-a-project">
              Build an AI Agent
            </Button>
            <Button variant="whatsapp" size="md" href={COMPANY_INFO.channels.whatsapp} external>
              Chat on WhatsApp
            </Button>
          </div>
        }
      />

      <div className="py-20 md:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        {/* Problem vs Solution Framing */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="text-xs font-heading text-rose-600 font-bold uppercase tracking-widest">
              The Operational Problem
            </div>
            <h3 className="text-2xl font-bold text-[#0F172A] font-heading">
              Why Traditional Chatbots Fail in Enterprise Workflows
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {solution.problemStatement}
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white border border-blue-200 bg-gradient-to-br from-blue-50/40 via-white to-white shadow-sm space-y-4">
            <div className="text-xs font-heading text-blue-700 font-bold uppercase tracking-widest">
              The Zenivixon Approach
            </div>
            <h3 className="text-2xl font-bold text-[#0F172A] font-heading">
              Deterministic, Tool-Augmented Agent Swarms
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {solution.solutionApproach}
            </p>
          </div>
        </div>

        {/* Feature Capabilities Grid */}
        <div className="space-y-10">
          <div className="space-y-3">
            <Badge variant="blue" size="sm">
              CAPABILITIES
            </Badge>
            <h2 className="text-3xl font-bold text-[#0F172A] font-heading">
              Specialized Agent Types We Engineer
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {solution.features.map((feature, idx) => (
              <div
                key={idx}
                className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-slate-300 hover:shadow-md transition-all space-y-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
                    <Bot className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-[#0F172A] font-heading">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
                <div className="pt-2 flex items-center gap-2 text-xs font-heading text-blue-700 font-semibold">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Outcome: {feature.outcome}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Relevant Case Studies */}
        {relevantProjects.length > 0 && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <Badge variant="blue" size="sm">
                  PROVEN WORK
                </Badge>
                <h2 className="text-3xl font-bold text-[#0F172A] font-heading">
                  AI Agent Case Studies in Production
                </h2>
              </div>
              <Button variant="secondary" size="sm" href="/projects" icon={<ArrowRight className="w-3.5 h-3.5" />}>
                All Projects
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relevantProjects.map((project) => (
                <div
                  key={project.slug}
                  className="rounded-2xl bg-white border border-slate-200 shadow-sm p-6 flex flex-col justify-between hover:border-slate-300 hover:shadow-md transition-all group"
                >
                  <div className="space-y-4">
                    <div className="aspect-[16/9] relative rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <Badge variant="blue" size="sm">
                      {project.categoryLabel}
                    </Badge>
                    <h3 className="text-xl font-bold text-[#0F172A] font-heading group-hover:text-blue-600 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {project.summary}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-100">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 group-hover:text-blue-700 transition-colors"
                    >
                      <span>Read Case Study</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Engineering Process Steps */}
        <div className="space-y-10">
          <div className="space-y-3">
            <Badge variant="cyan" size="sm">
              IMPLEMENTATION ROADMAP
            </Badge>
            <h2 className="text-3xl font-bold text-[#0F172A] font-heading">
              How We Build &amp; Deploy Your Agent
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {solution.process.map((step) => (
              <div
                key={step.step}
                className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3"
              >
                <span className="text-xs font-heading text-blue-600 font-bold">
                  STEP {step.step}
                </span>
                <h4 className="text-base font-bold text-[#0F172A] font-heading">
                  {step.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="rounded-2xl bg-[#F7F9FC] border border-slate-200 p-8 sm:p-12 text-center space-y-6 shadow-sm">
          <h3 className="text-2xl sm:text-3xl font-bold text-[#0F172A] font-heading">
            Ready to deploy autonomous AI agents in your business?
          </h3>
          <p className="text-slate-600 max-w-xl mx-auto text-sm leading-relaxed">
            Tell us which manual steps or customer workflows you would like to automate. We will design an agent architecture tailored to your tools.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Button variant="primary" size="lg" href="/start-a-project">
              Start a Project
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
