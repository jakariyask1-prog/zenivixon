import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { SOLUTIONS_DATA } from "@/data/solutions";
import { PROJECTS_DATA } from "@/data/projects";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Bot, Cpu, Globe, Database, CheckCircle2, ArrowRight, ArrowUpRight } from "lucide-react";
import { COMPANY_INFO } from "@/lib/constants";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return SOLUTIONS_DATA.map((solution) => ({
    slug: solution.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const solution = SOLUTIONS_DATA.find((s) => s.slug === slug);
  
  if (!solution) {
    return { title: "Solution Not Found" };
  }

  return {
    title: `${solution.title} | ZENIVIXON`,
    description: solution.description,
  };
}

export default async function SolutionPage({ params }: Props) {
  const { slug } = await params;
  const solution = SOLUTIONS_DATA.find((s) => s.slug === slug);

  if (!solution) {
    notFound();
  }

  const relevantProjects = PROJECTS_DATA.filter((p) => p.category === slug);

  // Map icons and specific texts based on slug
  const getIcon = () => {
    switch (slug) {
      case "ai-agents": return <Bot className="w-5 h-5" />;
      case "ai-automation": return <Cpu className="w-5 h-5" />;
      case "ai-integration": return <Database className="w-5 h-5" />;
      case "software-web-development": return <Globe className="w-5 h-5" />;
      default: return <CheckCircle2 className="w-5 h-5" />;
    }
  };

  const getPillarNumber = () => {
    switch (slug) {
      case "ai-agents": return "CORE PILLAR 01";
      case "ai-automation": return "CORE PILLAR 02";
      case "ai-integration": return "CORE PILLAR 03";
      case "software-web-development": return "CORE PILLAR 04";
      default: return "SOLUTION";
    }
  };

  const getProblemTitle = () => {
    switch (slug) {
      case "ai-agents": return "Why Traditional Chatbots Fail in Enterprise Workflows";
      case "ai-automation": return "The High Cost of Human 'Data Glue'";
      case "ai-integration": return "The High Cost of Rip-and-Replace Projects";
      case "software-web-development": return "Why Slow Legacy Web & Fragmented Code Fails";
      default: return "The Operational Problem";
    }
  };

  const getSolutionTitle = () => {
    switch (slug) {
      case "ai-agents": return "Deterministic, Tool-Augmented Agent Swarms";
      case "ai-automation": return "Semantic Document & Event Pipelines";
      case "ai-integration": return "Seamless API Adapters & Embedded AI";
      case "software-web-development": return "Full-Stack Modern Web Engineering + Embedded AI";
      default: return "The Zenivixon Approach";
    }
  };

  return (
    <>
      <PageHeader
        badge={getPillarNumber()}
        title={solution.title}
        description={solution.description}
        breadcrumbs={[
          { label: "Solutions", href: "/solutions" },
          { label: solution.shortTitle },
        ]}
        actions={
          <div className="flex flex-wrap gap-3">
            <Button variant="primary" size="md" href="/start-a-project">
              Start Your Project
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
          <div className="p-8 rounded-2xl bg-white border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="text-xs font-heading text-rose-600 font-bold uppercase tracking-widest">
              The Operational Problem
            </div>
            <h3 className="text-2xl font-bold text-[#0F172A] dark:text-white font-heading">
              {getProblemTitle()}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {solution.problemStatement}
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white border border-blue-200 bg-gradient-to-br from-blue-50/40 via-white to-white shadow-sm space-y-4">
            <div className="text-xs font-heading text-blue-700 font-bold uppercase tracking-widest">
              The Zenivixon Approach
            </div>
            <h3 className="text-2xl font-bold text-[#0F172A] dark:text-white font-heading">
              {getSolutionTitle()}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
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
            <h2 className="text-3xl font-bold text-[#0F172A] dark:text-white font-heading">
              Specialized Solutions We Engineer
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {solution.features.map((feature, idx) => (
              <div
                key={idx}
                className="p-8 rounded-2xl bg-white border border-slate-200 dark:border-slate-800 shadow-sm hover:border-slate-300 hover:shadow-md transition-all space-y-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
                    {getIcon()}
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
                <Badge variant="blue" size="sm">
                  PROVEN WORK
                </Badge>
                <h2 className="text-3xl font-bold text-[#0F172A] dark:text-white font-heading">
                  Case Studies in Production
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

        {/* Engineering Process Steps */}
        <div className="space-y-10">
          <div className="space-y-3">
            <Badge variant="cyan" size="sm">
              IMPLEMENTATION ROADMAP
            </Badge>
            <h2 className="text-3xl font-bold text-[#0F172A] dark:text-white font-heading">
              How We Build &amp; Deploy
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
        <div className="rounded-2xl bg-[#F7F9FC] dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800 p-8 sm:p-12 text-center space-y-6 shadow-sm">
          <h3 className="text-2xl sm:text-3xl font-bold text-[#0F172A] dark:text-white font-heading">
            Ready to upgrade your business operations?
          </h3>
          <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto text-sm leading-relaxed">
            Tell us about your requirements and we will architect a scalable solution proposal tailored to your workflow.
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
