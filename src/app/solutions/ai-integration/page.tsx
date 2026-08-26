import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { SOLUTIONS_DATA } from "@/data/solutions";
import { PROJECTS_DATA } from "@/data/projects";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Network, CheckCircle2, ArrowRight, ArrowUpRight } from "lucide-react";
import { COMPANY_INFO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "AI Integration & Custom Solutions | Embed AI in Existing Software",
  description:
    "Integrate AI capabilities into the systems your business already uses. Custom vector search, RAG pipelines, API middleware, and database intelligence.",
};

export default function AiIntegrationPage() {
  const solution = SOLUTIONS_DATA.find((s) => s.slug === "ai-integration")!;
  const relevantProjects = PROJECTS_DATA.filter((p) => p.category === "ai-integration");

  return (
    <>
      <PageHeader
        badge="CORE PILLAR 03"
        title="AI Integration & Custom AI Solutions"
        description="Integrate AI into the systems your business already uses. No costly platform rewrites—just clean, secure API adapters and vector pipelines."
        breadcrumbs={[
          { label: "Solutions", href: "/solutions" },
          { label: "AI Integration" },
        ]}
        actions={
          <div className="flex flex-wrap gap-3">
            <Button variant="primary" size="md" href="/start-a-project">
              Integrate AI Into Your Stack
            </Button>
            <Button variant="whatsapp" size="md" href={COMPANY_INFO.channels.whatsapp} external>
              Chat on WhatsApp
            </Button>
          </div>
        }
      />

      <div className="py-20 md:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        {/* Problem vs Solution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-2xl bg-white border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="text-xs font-heading text-rose-600 font-bold uppercase tracking-widest">
              The Migration Trap
            </div>
            <h3 className="text-2xl font-bold text-[#0F172A] dark:text-white font-heading">
              Why You Shouldn&apos;t Replace Your Core Tech Stack
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {solution.problemStatement}
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white border border-indigo-200 bg-gradient-to-br from-indigo-50/40 via-white to-white shadow-sm space-y-4">
            <div className="text-xs font-heading text-indigo-700 font-bold uppercase tracking-widest">
              The Zenivixon Approach
            </div>
            <h3 className="text-2xl font-bold text-[#0F172A] dark:text-white font-heading">
              Modular Middleware &amp; Domain-Grounded RAG
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {solution.solutionApproach}
            </p>
          </div>
        </div>

        {/* Capabilities */}
        <div className="space-y-10">
          <div className="space-y-3">
            <Badge variant="blue" size="sm">
              INTEGRATION SERVICES
            </Badge>
            <h2 className="text-3xl font-bold text-[#0F172A] dark:text-white font-heading">
              Custom AI Architecture Capabilities
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {solution.features.map((feature, idx) => (
              <div
                key={idx}
                className="p-8 rounded-2xl bg-white border border-slate-200 dark:border-slate-800 shadow-sm hover:border-slate-300 hover:shadow-md transition-all space-y-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600">
                    <Network className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-[#0F172A] dark:text-white font-heading">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
                <div className="pt-2 flex items-center gap-2 text-xs font-heading text-indigo-700 font-semibold">
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
                <h2 className="text-3xl font-bold text-[#0F172A] dark:text-white font-heading">
                  AI Integration Case Studies in Production
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
                  className="rounded-2xl bg-white border border-slate-200 dark:border-slate-800 shadow-sm p-6 flex flex-col justify-between hover:border-slate-300 hover:shadow-md transition-all group"
                >
                  <div className="space-y-4">
                    <div className="aspect-[16/9] relative rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-50">
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
                    <h3 className="text-xl font-bold text-[#0F172A] dark:text-white font-heading group-hover:text-blue-600 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
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

        {/* Process */}
        <div className="space-y-10">
          <div className="space-y-3">
            <Badge variant="cyan" size="sm">
              INTEGRATION STAGES
            </Badge>
            <h2 className="text-3xl font-bold text-[#0F172A] dark:text-white font-heading">
              How We Connect AI to Your Infrastructure
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {solution.process.map((step) => (
              <div
                key={step.step}
                className="p-6 rounded-2xl bg-white border border-slate-200 dark:border-slate-800 shadow-sm space-y-3"
              >
                <span className="text-xs font-heading text-indigo-600 font-bold">
                  STEP {step.step}
                </span>
                <h4 className="text-base font-bold text-[#0F172A] dark:text-white font-heading">
                  {step.title}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="rounded-2xl bg-[#F7F9FC] dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800 p-8 sm:p-12 text-center space-y-6 shadow-sm">
          <h3 className="text-2xl sm:text-3xl font-bold text-[#0F172A] dark:text-white font-heading">
            Connect AI to your databases and software.
          </h3>
          <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto text-sm leading-relaxed">
            Tell us about your existing databases, web applications, or CRM tools. We will show you how to embed AI intelligence securely.
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
