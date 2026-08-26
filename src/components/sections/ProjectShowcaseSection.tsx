"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, CheckCircle2, PlayCircle, X } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { PROJECTS_DATA } from "@/data/projects";

export function ProjectShowcaseSection() {
  const [activeVideo, setActiveVideo] = useState<{ title: string; url: string } | null>(null);

  const featuredProjects = PROJECTS_DATA.filter((p) => p.featured);
  const otherProjects = PROJECTS_DATA.filter((p) => !p.featured);

  return (
    <section className="py-20 md:py-32 border-t border-slate-200/80 dark:border-slate-800/80 bg-[#FFFFFF] dark:bg-[#020817] relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl space-y-4">
            <Badge variant="blue" size="sm" className="font-semibold text-xs tracking-widest">
              PROJECT SHOWCASE
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0F172A] dark:text-white tracking-tight font-heading leading-tight">
              Technical Proof. Real Business Results.
            </h2>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              We prove our capabilities through concrete production systems. Explore our AI agents, automation pipelines, and enterprise integrations operating in real environments.
            </p>
          </div>
          <Button
            variant="secondary"
            size="md"
            href="/projects"
            icon={<ArrowRight className="w-4 h-4" />}
            className="shrink-0 self-start md:self-auto font-semibold"
          >
            View All 8 Case Studies
          </Button>
        </div>

        {/* Featured Production Systems (Detailed Multi-Column Cards) */}
        <div className="space-y-12 mb-16">
          {featuredProjects.map((project) => (
            <div
              key={project.slug}
              className="rounded-3xl bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800/90 dark:border-slate-800 shadow-sm dark:shadow-none overflow-hidden hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-lg transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-0"
            >
              {/* Visual Preview (Left 7 cols on lg) */}
              <div className="lg:col-span-7 bg-slate-50/80 dark:bg-slate-900/50 p-6 sm:p-8 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-slate-200/80 dark:border-slate-800 relative min-h-[280px] sm:min-h-[360px]">
                <div className="w-full max-w-xl aspect-[16/9] relative rounded-xl overflow-hidden shadow-md border border-slate-200 dark:border-slate-800 dark:border-slate-700 bg-white dark:bg-slate-800 group">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover object-top"
                  />
                  {project.videoUrl && (
                    <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        onClick={() => setActiveVideo({ title: project.title, url: project.videoUrl! })}
                        className="px-4 py-2 rounded-xl bg-white/95 dark:bg-slate-900/95 text-slate-900 dark:text-white font-semibold text-xs flex items-center gap-2 shadow-lg hover:bg-white dark:hover:bg-slate-800 transition-all transform group-hover:scale-105"
                      >
                        <PlayCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        <span>Watch Demo Video</span>
                      </button>
                    </div>
                  )}
                </div>

                {project.videoUrl && (
                  <div className="mt-4 flex items-center gap-2 text-xs text-blue-600 dark:text-blue-400 font-semibold cursor-pointer" onClick={() => setActiveVideo({ title: project.title, url: project.videoUrl! })}>
                    <PlayCircle className="w-4 h-4" />
                    <span>Video Demonstration Available</span>
                  </div>
                )}
              </div>

              {/* Information & Technical Proof (Right 5 cols on lg) */}
              <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge variant="cyan" size="sm" className="font-semibold text-xs">
                      {project.categoryLabel}
                    </Badge>
                    {project.status && (
                      <span className="text-xs font-heading text-slate-500 dark:text-slate-400 font-semibold">
                        {project.status}
                      </span>
                    )}
                  </div>

                  <h3 className="text-2xl font-bold text-[#0F172A] dark:text-white font-heading">
                    {project.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {project.summary}
                  </p>

                  {/* Business Value Highlights */}
                  <div className="pt-2 space-y-2">
                    <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-widest font-heading">
                      Measurable Business Value:
                    </div>
                    {project.valueDelivered.slice(0, 3).map((val, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                        <span className="leading-snug">{val}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 5).map((tech) => (
                      <span
                        key={tech}
                        className="text-xs font-heading px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 dark:border-slate-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                  >
                    <span>Read Full Case Study</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Secondary Project Cards Grid (5 additional projects = 8 total) */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
            <h3 className="text-xl font-bold text-[#0F172A] dark:text-white font-heading">
              Additional Production Systems &amp; Case Studies
            </h3>
            <span className="text-xs font-heading text-slate-500 dark:text-slate-400 font-semibold">
              Showing {otherProjects.length} Systems
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherProjects.map((project) => (
              <div
                key={project.slug}
                className="rounded-2xl bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800/90 dark:border-slate-800 shadow-sm dark:shadow-none p-6 flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md transition-all duration-200 group"
              >
                <div className="space-y-4">
                  <div className="aspect-[16/9] relative rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge variant="blue" size="sm" className="font-semibold text-xs">
                      {project.categoryLabel}
                    </Badge>
                    {project.status && (
                      <span className="text-xs font-heading text-slate-500 dark:text-slate-400 font-medium">
                        {project.status}
                      </span>
                    )}
                  </div>
                  <h4 className="text-lg font-bold text-[#0F172A] dark:text-white font-heading group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                    {project.summary}
                  </p>

                  <div className="pt-1 flex flex-wrap gap-1">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="text-xs font-heading px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 dark:border-slate-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 mt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                  >
                    <span>View Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Video Player Modal */}
        {activeVideo && (
          <div
            className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
            onClick={() => setActiveVideo(null)}
            role="dialog"
            aria-modal="true"
            aria-label={`Demo: ${activeVideo.title}`}
          >
            <div
              className="bg-white dark:bg-[#0b1120] rounded-2xl max-w-3xl w-full p-6 shadow-2xl space-y-4 border border-slate-200 dark:border-slate-800"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <PlayCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <h4 className="text-base font-bold text-[#0F172A] dark:text-white font-heading">
                    {activeVideo.title} — System Demo
                  </h4>
                </div>
                <button
                  onClick={() => setActiveVideo(null)}
                  aria-label="Close video demo"
                  className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Video Player */}
              <div className="aspect-[16/9] w-full bg-slate-900 rounded-xl overflow-hidden">
                {activeVideo.url.includes("youtube.com") || activeVideo.url.includes("youtu.be") ? (
                  <iframe
                    src={activeVideo.url.replace("watch?v=", "embed/")}
                    title={`${activeVideo.title} demo`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                ) : activeVideo.url.match(/\.(mp4|webm|ogg)$/i) ? (
                  <video
                    src={activeVideo.url}
                    controls
                    autoPlay
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white text-center p-8">
                    <div className="space-y-3">
                      <PlayCircle className="w-12 h-12 text-blue-400 mx-auto animate-pulse" />
                      <p className="text-sm font-semibold">Live System Demonstration</p>
                      <a
                        href={activeVideo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-400 hover:text-blue-300 underline"
                      >
                        Open in new tab
                      </a>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end pt-2">
                <Button variant="secondary" size="sm" onClick={() => setActiveVideo(null)}>
                  Close Preview
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
