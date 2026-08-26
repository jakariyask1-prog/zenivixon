import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { PROJECTS_DATA } from "@/data/projects";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { CheckCircle2, ArrowLeft, ArrowRight, ArrowUpRight, Layers, Cpu, ShieldCheck, PlayCircle } from "lucide-react";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return PROJECTS_DATA.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS_DATA.find((p) => p.slug === slug);
  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: `${project.title} | Case Study`,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = PROJECTS_DATA.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <PageHeader
        badge={project.categoryLabel}
        title={project.title}
        description={project.subtitle}
        breadcrumbs={[
          { label: "Projects", href: "/projects" },
          { label: project.title },
        ]}
      />

      <div className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Top Back Link */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Projects</span>
        </Link>

        {/* Media Demonstration Area (Supports Image or Video) */}
        <div className="rounded-3xl bg-white border border-slate-200 dark:border-slate-800 p-4 sm:p-8 shadow-md overflow-hidden">
          <div className="aspect-[16/9] w-full relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-50">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover object-top"
              priority
            />
          </div>
          {project.videoUrl && (
            <div className="mt-4 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
              <span className="inline-flex items-center gap-1.5 text-blue-600 font-semibold">
                <PlayCircle className="w-4 h-4" />
                Live Video Demonstration Available
              </span>
            </div>
          )}
        </div>

        {/* Case Study Grid (Problem & Solution) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Body (8 cols) */}
          <div className="lg:col-span-8 space-y-12">
            {/* Summary */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white font-heading">
                Executive Overview
              </h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-base">
                {project.summary}
              </p>
            </div>

            {/* Problem Statement */}
            <div className="p-8 rounded-2xl bg-white border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-rose-600 text-xs font-heading font-bold uppercase tracking-widest">
                <Layers className="w-4 h-4" />
                <span>The Challenge</span>
              </div>
              <h3 className="text-xl font-bold text-[#0F172A] dark:text-white font-heading">
                Operational Problem &amp; Inefficiency
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                {project.problem}
              </p>
            </div>

            {/* Solution Architecture */}
            <div className="p-8 rounded-2xl bg-white border border-blue-200 bg-gradient-to-br from-blue-50/40 via-white to-white shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-blue-700 text-xs font-heading font-bold uppercase tracking-widest">
                <Cpu className="w-4 h-4" />
                <span>The Solution</span>
              </div>
              <h3 className="text-xl font-bold text-[#0F172A] dark:text-white font-heading">
                Engineered AI Architecture &amp; Execution
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                {project.solution}
              </p>
            </div>

            {/* Deliverables */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-[#0F172A] dark:text-white font-heading">
                Key Deliverables
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.deliverables.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-slate-50 border border-slate-200 dark:border-slate-800/80 flex items-start gap-3"
                  >
                    <div className="w-5 h-5 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                    </div>
                    <span className="text-xs text-slate-800 font-semibold">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Meta (4 cols) */}
          <div className="lg:col-span-4 space-y-8">
            {/* Value Delivered Box */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-widest font-heading">
                Business Value Delivered
              </h4>
              <div className="space-y-3">
                {project.valueDelivered.map((val, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                    <ShieldCheck className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technologies Used */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-widest font-heading">
                Technology Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs font-heading px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200 dark:border-slate-800 font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Box */}
            <div className="p-6 rounded-2xl bg-[#F7F9FC] dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800 space-y-4 text-center">
              <h4 className="text-base font-bold text-[#0F172A] dark:text-white font-heading">
                Need a similar system?
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Tell us about your requirements and we will review your current workflow to provide a practical solution proposal.
              </p>
              <Button
                variant="primary"
                size="md"
                href="/start-a-project"
                icon={<ArrowRight className="w-4 h-4" />}
                className="w-full justify-center shadow-sm"
              >
                Start a Project
              </Button>
            </div>
          </div>
        </div>

        {/* More Case Studies */}
        <div className="pt-12 border-t border-slate-200 space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <Badge variant="blue" size="sm">
                EXPLORE MORE
              </Badge>
              <h3 className="text-2xl font-bold text-[#0F172A] dark:text-white font-heading mt-1">
                Other Case Studies
              </h3>
            </div>
            <Button variant="secondary" size="sm" href="/projects" icon={<ArrowRight className="w-3.5 h-3.5" />}>
              All Projects
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PROJECTS_DATA.filter((p) => p.slug !== slug).slice(0, 3).map((other) => (
              <div
                key={other.slug}
                className="rounded-2xl bg-white border border-slate-200 dark:border-slate-800/90 shadow-sm p-6 flex flex-col justify-between hover:border-slate-300 hover:shadow-md transition-all duration-200 group"
              >
                <div className="space-y-4">
                  <div className="aspect-[16/9] relative rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-50">
                    <Image
                      src={other.image}
                      alt={other.title}
                      fill
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <Badge variant="blue" size="sm">
                    {other.categoryLabel}
                  </Badge>
                  <h4 className="text-lg font-bold text-[#0F172A] dark:text-white font-heading group-hover:text-blue-600 transition-colors">
                    {other.title}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2">
                    {other.summary}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-slate-100">
                  <Link
                    href={`/projects/${other.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 group-hover:text-blue-700 transition-colors"
                  >
                    <span>View Case Study</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
