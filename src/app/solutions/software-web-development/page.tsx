import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { SOLUTIONS_DATA } from "@/data/solutions";
import { PROJECTS_DATA } from "@/data/projects";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Globe, CheckCircle2, ArrowRight, ArrowUpRight } from "lucide-react";
import { COMPANY_INFO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Custom Software & Modern Web Development | AI Applications",
  description:
    "Design and build bespoke software applications, modern Next.js/React web platforms, and AI-powered SaaS interfaces engineered for speed, security, and scalability.",
};

export default function SoftwareWebDevPage() {
  const solution = SOLUTIONS_DATA.find((s) => s.slug === "software-web-development")!;
  const relevantProjects = PROJECTS_DATA.filter((p) => p.category === "software-web-development" || p.category === "ai-agents");

  return (
    <>
      <PageHeader
        badge="CORE PILLAR 03"
        title="Custom Software & Modern Web Development"
        description="High-performance modern web platforms, custom SaaS applications, client portals, and AI-native software architectures built for long-term growth."
        breadcrumbs={[
          { label: "Solutions", href: "/solutions" },
          { label: "Software & Web Development" },
        ]}
        actions={
          <div className="flex flex-wrap gap-3">
            <Button variant="primary" size="md" href="/start-a-project">
              Start a Software Project
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
          <div className="p-8 rounded-3xl bg-white border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="text-xs font-heading text-rose-600 font-bold uppercase tracking-widest">
              The Digital Challenge
            </div>
            <h3 className="text-2xl font-bold text-[#0F172A] dark:text-white font-heading">
              Why Slow Legacy Web &amp; Fragmented Code Fails
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {solution.problemStatement}
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-blue-200 bg-gradient-to-br from-blue-50/40 via-white to-white shadow-sm space-y-4">
            <div className="text-xs font-heading text-blue-700 font-bold uppercase tracking-widest">
              The Zenivixon Approach
            </div>
            <h3 className="text-2xl font-bold text-[#0F172A] dark:text-white font-heading">
              Full-Stack Modern Web Engineering + Embedded AI
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {solution.solutionApproach}
            </p>
          </div>
        </div>

        {/* Feature Capabilities Grid */}
        <div className="space-y-10">
          <div className="space-y-3">
            <Badge variant="blue" size="sm" className="font-semibold text-xs tracking-widest">
              CAPABILITIES
            </Badge>
            <h2 className="text-3xl font-bold text-[#0F172A] dark:text-white font-heading">
              Software &amp; Web Systems We Build
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {solution.features.map((feature, idx) => (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-white border border-slate-200 dark:border-slate-800 shadow-sm hover:border-slate-300 hover:shadow-md transition-all space-y-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
                    <Globe className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-[#0F172A] dark:text-white font-heading">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
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
                <Badge variant="blue" size="sm" className="font-semibold text-xs tracking-widest">
                  PROVEN WORK
                </Badge>
                <h2 className="text-3xl font-bold text-[#0F172A] dark:text-white font-heading">
                  Web &amp; Software Projects in Production
                </h2>
              </div>
              <Button variant="secondary" size="sm" href="/projects" icon={<ArrowRight className="w-3.5 h-3.5" />}>
                All Projects
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relevantProjects.slice(0, 2).map((project) => (
                <div
                  key={project.slug}
                  className="rounded-3xl bg-white border border-slate-200 dark:border-slate-800 shadow-sm p-6 flex flex-col justify-between hover:border-slate-300 hover:shadow-md transition-all group"
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

        {/* Engineering Process Steps */}
        <div className="space-y-10">
          <div className="space-y-3">
            <Badge variant="cyan" size="sm" className="font-semibold text-xs tracking-widest">
              DEVELOPMENT LIFECYCLE
            </Badge>
            <h2 className="text-3xl font-bold text-[#0F172A] dark:text-white font-heading">
              From Concept to Scalable Software
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {solution.process.map((step) => (
              <div
                key={step.step}
                className="p-6 rounded-2xl bg-white border border-slate-200 dark:border-slate-800 shadow-sm space-y-3"
              >
                <span className="text-xs font-heading text-blue-600 font-bold">
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
        <div className="rounded-3xl bg-[#F7F9FC] dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800 p-8 sm:p-12 text-center space-y-6 shadow-sm">
          <h3 className="text-2xl sm:text-3xl font-bold text-[#0F172A] dark:text-white font-heading">
            Need a custom software application or modern web platform?
          </h3>
          <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto text-sm leading-relaxed">
            Tell us about your digital product requirements, target audience, and feature roadmap. We will architect a clean, scalable solution proposal.
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
