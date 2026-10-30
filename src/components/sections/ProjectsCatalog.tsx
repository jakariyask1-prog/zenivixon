"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PROJECTS_DATA } from "@/data/projects";
import { Badge } from "@/components/ui/Badge";
import { ArrowUpRight, PlayCircle, X } from "lucide-react";
import { SolutionCategory } from "@/types/project";
import { getYoutubeEmbedUrl } from "@/lib/utils";

const categories: { label: string; value: "all" | SolutionCategory }[] = [
  { label: "All Projects", value: "all" },
  { label: "AI Agents & Support", value: "ai-agents" },
  { label: "AI Automation", value: "ai-automation" },
  { label: "Software & Web Dev", value: "software-web-development" },
  { label: "AI Integration & RAG", value: "ai-integration" },
];

export function ProjectsCatalog() {
  const [activeCategory, setActiveCategory] = useState<"all" | SolutionCategory>("all");
  const [activeVideo, setActiveVideo] = useState<{ title: string; url: string } | null>(null);

  const filteredProjects =
    activeCategory === "all"
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter((p) => p.category === activeCategory);

  return (
    <div className="space-y-12">
      {/* Category Filter Bar */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-6" role="tablist" aria-label="Project Categories">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.value;
          return (
            <button
              key={cat.value}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-widest transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                isActive
                  ? "bg-blue-600 text-white shadow-sm shadow-blue-600/20"
                  : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.length === 0 && (
          <div className="col-span-full text-center py-20 space-y-3">
            <p className="text-slate-400 text-sm font-medium">No projects in this category yet.</p>
            <a
              href="/contact"
              className="inline-flex items-center text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold transition-colors"
            >
              Get in touch to discuss a project →
            </a>
          </div>
        )}
        {filteredProjects.map((project) => (
          <div
            key={project.slug}
            className="rounded-2xl bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800/90 dark:border-slate-800 shadow-sm dark:shadow-none p-6 flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md transition-all duration-300 group"
          >
            <div className="space-y-4">
              {/* Visual Preview */}
              <div className="aspect-[16/9] relative rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 group/img">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />

                {project.videoUrl && (
                  <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      onClick={() => setActiveVideo({ title: project.title, url: project.videoUrl! })}
                      className="px-4 py-2 rounded-xl bg-white/95 dark:bg-slate-900/95 text-slate-900 dark:text-white font-semibold text-xs flex items-center gap-2 shadow-lg hover:bg-white dark:hover:bg-slate-800 transition-all transform hover:scale-105 cursor-pointer"
                    >
                      <PlayCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      <span>Watch Demo Video</span>
                    </button>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between">
                <Badge variant="blue" size="sm">
                  {project.categoryLabel}
                </Badge>
                <div className="flex items-center gap-1.5">
                  {project.videoUrl && (
                    <button
                      onClick={() => setActiveVideo({ title: project.title, url: project.videoUrl! })}
                      className="text-[10px] font-heading font-semibold px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900 flex items-center gap-1 cursor-pointer transition-colors"
                      title="Watch video demo"
                    >
                      <PlayCircle className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                      <span>Video Demo</span>
                    </button>
                  )}
                  {project.downloadUrl && (
                    <span className="text-[10px] font-heading font-semibold px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
                      Desktop Software
                    </span>
                  )}
                  {project.status && (
                    <span className="text-xs font-heading text-slate-500 dark:text-slate-400 font-semibold">
                      {project.status}
                    </span>
                  )}
                </div>
              </div>

              <h3 className="text-xl font-bold text-[#0F172A] dark:text-white font-heading group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {project.title}
              </h3>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                {project.summary}
              </p>

              {/* Tech Badges */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {project.technologies.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="text-xs font-heading px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 dark:border-slate-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Link */}
            <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <Link
                href={`/projects/${project.slug}`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors"
              >
                <span>Read Full Case Study</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              {project.videoUrl && (
                <button
                  onClick={() => setActiveVideo({ title: project.title, url: project.videoUrl! })}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                >
                  <PlayCircle className="w-3.5 h-3.5" />
                  <span>Demo</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Video Demonstration Modal */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 animate-in fade-in duration-200"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl p-4 sm:p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <PlayCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-heading">
                  {activeVideo.title} — Demonstration
                </h4>
              </div>
              <button
                onClick={() => setActiveVideo(null)}
                aria-label="Close video demo"
                className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Player */}
            <div className="aspect-[16/9] w-full bg-slate-900 rounded-xl overflow-hidden">
              {activeVideo.url.includes("youtube.com") || activeVideo.url.includes("youtu.be") ? (
                <iframe
                  src={getYoutubeEmbedUrl(activeVideo.url)}
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
              <button
                onClick={() => setActiveVideo(null)}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
