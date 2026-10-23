import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { PROJECTS_DATA } from "@/data/projects";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { CheckCircle2, ArrowLeft, ArrowRight, ArrowUpRight, Layers, Cpu, ShieldCheck, PlayCircle, Download } from "lucide-react";
import { getYoutubeEmbedUrl } from "@/lib/utils";

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

        {/* Media Demonstration Area */}
        <div className="rounded-3xl bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800 p-4 sm:p-8 shadow-md overflow-hidden">
          {project.videoUrl && project.videoUrl.match(/\.(mp4|webm|ogg)$/i) ? (
            <div className="aspect-[16/9] w-full relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-900">
              <video
                src={project.videoUrl}
                poster={project.image}
                controls
                className="w-full h-full object-contain"
              />
            </div>
          ) : project.videoUrl && (project.videoUrl.includes("youtube.com") || project.videoUrl.includes("youtu.be")) ? (
            <div className="aspect-[16/9] w-full relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-900">
              <iframe
                src={getYoutubeEmbedUrl(project.videoUrl)}
                title={`${project.title} demo`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>
          ) : (
            <div className="aspect-[16/9] w-full relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover object-top"
                priority
              />
            </div>
          )}
          {project.videoUrl && (
            <div className="mt-4 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
              <span className="inline-flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-semibold">
                <PlayCircle className="w-4 h-4" />
                Live Video Demonstration Included
              </span>
            </div>
          )}
        </div>

        {/* Software Download Banner (if available) */}
        {project.downloadUrl && (
          <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-xl shadow-blue-600/10 flex flex-col sm:flex-row items-center justify-between gap-6 border border-white/20">
            <div className="space-y-2 text-center sm:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-bold tracking-wider uppercase backdrop-blur-sm">
                <ShieldCheck className="w-4 h-4 text-emerald-300" />
                <span>Verified Release &bull; Windows .exe</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-heading">
                Download {project.title}
              </h3>
              <p className="text-xs sm:text-sm text-blue-100 max-w-xl leading-relaxed">
                Download the standalone Windows setup package and run {project.title} directly on your machine.
              </p>
              {project.downloadChecksum && (
                <div className="pt-1 flex flex-wrap items-center gap-1.5 text-[11px] text-blue-200/90 font-mono">
                  <span className="font-semibold text-white/90">SHA-256:</span>
                  <span className="select-all break-all opacity-90">{project.downloadChecksum}</span>
                </div>
              )}
            </div>
            <a
              href={project.downloadUrl}
              download
              className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-white text-blue-600 hover:bg-blue-50 font-bold text-sm sm:text-base shadow-lg hover:shadow-2xl hover:scale-105 active:scale-95 transition-all shrink-0 cursor-pointer group"
            >
              <Download className="w-5 h-5 text-blue-600 transition-transform group-hover:translate-y-0.5" />
              <span>{project.downloadLabel || "Download Software (.exe)"}</span>
            </a>
          </div>
        )}

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
            <div className="p-8 rounded-2xl bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 text-xs font-heading font-bold uppercase tracking-widest">
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
            <div className="p-8 rounded-2xl bg-white dark:bg-[#0b1120] border border-blue-200 dark:border-blue-900/50 bg-gradient-to-br from-blue-50/40 via-white to-white dark:from-blue-950/20 dark:via-[#0b1120] dark:to-[#0b1120] shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400 text-xs font-heading font-bold uppercase tracking-widest">
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
                    className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800/80 flex items-start gap-3"
                  >
                    <div className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <span className="text-xs text-slate-800 dark:text-slate-200 font-semibold">
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
            <div className="p-6 rounded-2xl bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-widest font-heading">
                Business Value Delivered
              </h4>
              <div className="space-y-3">
                {project.valueDelivered.map((val, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                    <ShieldCheck className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technologies Used */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-widest font-heading">
                Technology Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs font-heading px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Software Download Sidebar Card */}
            {project.downloadUrl && (
              <div className="p-6 rounded-2xl bg-white dark:bg-[#0b1120] border-2 border-blue-500/40 dark:border-blue-500/50 shadow-md space-y-4 text-center">
                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto">
                  <Download className="w-6 h-6 animate-bounce" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-[#0F172A] dark:text-white font-heading">
                    Official Software Setup
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mt-1">
                    Direct standalone executable installer for Windows (.exe).
                  </p>
                </div>
                <a
                  href={project.downloadUrl}
                  download
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-md shadow-blue-600/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>{project.downloadLabel || "Download Setup"}</span>
                </a>
                {project.downloadChecksum && (
                  <div className="pt-1 text-[10px] text-slate-500 dark:text-slate-400 font-mono text-left bg-slate-50 dark:bg-slate-900/60 p-2 rounded-lg border border-slate-200 dark:border-slate-800 break-all select-all">
                    <span className="font-semibold block text-slate-700 dark:text-slate-300 mb-0.5">SHA-256 Checksum:</span>
                    {project.downloadChecksum}
                  </div>
                )}
              </div>
            )}

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
        <div className="pt-12 border-t border-slate-200 dark:border-slate-800 space-y-8">
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
                className="rounded-2xl bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800 shadow-sm p-6 flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md transition-all duration-200 group"
              >
                <div className="space-y-4">
                  <div className="aspect-[16/9] relative rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
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
                  <h4 className="text-lg font-bold text-[#0F172A] dark:text-white font-heading group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {other.title}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2">
                    {other.summary}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-slate-100 dark:border-slate-800">
                  <Link
                    href={`/projects/${other.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors"
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
