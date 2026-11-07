"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { PROJECTS_DATA } from "@/data/projects";
import { ArrowRight, ArrowUpRight, CheckCircle2, Play, PlayCircle, X } from "lucide-react";
import { SolutionCategory } from "@/types/project";
import { getYoutubeEmbedUrl } from "@/lib/utils";

const categories: { label: string; value: "all" | SolutionCategory }[] = [
  { label: "All Portfolio", value: "all" },
  { label: "AI Agents", value: "ai-agents" },
  { label: "Workflow Automation", value: "ai-automation" },
  { label: "Software & Web Platforms", value: "software-web-development" },
  { label: "Vector RAG & Sync", value: "ai-integration" },
];

export function ProjectsCatalog() {
  const [activeCategory, setActiveCategory] = useState<"all" | SolutionCategory>("all");
  const [activeVideo, setActiveVideo] = useState<{ title: string; url: string; image?: string } | null>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    setIsVideoLoaded(false);
    if (!activeVideo) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveVideo(null);
      }
    };

    // Prevent background scrolling while modal is open
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeVideo]);

  const filteredProjects =
    activeCategory === "all"
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter((p) => p.category === activeCategory);

  const getCategoryCount = (catValue: "all" | SolutionCategory) => {
    if (catValue === "all") return PROJECTS_DATA.length;
    return PROJECTS_DATA.filter((p) => p.category === catValue).length;
  };

  return (
    <div className="space-y-8 sm:space-y-10 md:space-y-12">
      {/* 🌟 Segmented Luxury Category Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 dark:border-slate-800/80 pb-5 sm:pb-6">
        <div
          className="w-full sm:w-auto min-w-0 max-w-full flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none no-scrollbar touch-pan-x"
          role="tablist"
          aria-label="Project Categories"
        >
          {categories.map((cat) => {
            const isActive = activeCategory === cat.value;
            const count = getCategoryCount(cat.value);
            return (
              <button
                key={cat.value}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveCategory(cat.value)}
                className={`px-3.5 sm:px-4 py-2 rounded-full text-xs font-semibold font-heading transition-all duration-200 shrink-0 flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30 ring-2 ring-blue-500/40"
                    : "bg-white dark:bg-slate-900/90 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/60"
                }`}
              >
                <span className="whitespace-nowrap">{cat.label}</span>
                <span
                  className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono font-bold leading-none ${
                    isActive
                      ? "bg-white/25 text-white"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Portfolio Live Counter */}
        <div className="text-xs font-mono text-slate-500 dark:text-slate-400 flex items-center gap-2 shrink-0 self-start sm:self-auto">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
          <span>Showing {filteredProjects.length} Verified Deliveries</span>
        </div>
      </div>

      {/* 🌟 Ultra-Clean & Attractive Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 md:gap-8">
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
            className="group relative rounded-3xl bg-white dark:bg-[#070d1d] border border-slate-200/80 dark:border-slate-800/80 p-5 sm:p-6 flex flex-col justify-between h-full transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 hover:border-blue-500/40 hover:-translate-y-1.5"
          >
            {/* Top ambient illumination line on hover */}
            <div className="absolute top-0 inset-x-8 h-[2px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-t-3xl" />

            <div className="space-y-4 flex-1 flex flex-col">
              {/* 🌟 Premium Thumbnail Showcase Card */}
              <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-900/90 border border-slate-200/60 dark:border-slate-800/60 group/thumb shadow-xs">
                <Link
                  href={`/projects/${project.slug}`}
                  className="block w-full h-full relative"
                  aria-label={`View ${project.title}`}
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-top transition-transform duration-700 ease-out group-hover/thumb:scale-105"
                  />
                </Link>

                {/* Floating Glass Badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-20 pointer-events-none">
                  {/* Category Pill */}
                  <span className="px-2.5 py-1 rounded-full bg-slate-950/75 backdrop-blur-md border border-white/15 text-white text-[10px] sm:text-[11px] font-semibold tracking-wide shadow-sm truncate max-w-[130px] sm:max-w-none">
                    {project.categoryLabel}
                  </span>

                  {/* Live Video Indicator Pill */}
                  {project.videoUrl && (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setActiveVideo({ title: project.title, url: project.videoUrl!, image: project.image });
                      }}
                      className="pointer-events-auto px-2.5 py-1 rounded-full bg-blue-600/90 hover:bg-blue-600 text-white backdrop-blur-md border border-blue-400/30 text-[10px] sm:text-[10.5px] font-bold tracking-wider uppercase flex items-center gap-1.5 shadow-md shadow-blue-600/30 transition-transform active:scale-95 cursor-pointer"
                      title="Watch live system demonstration"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                      <span>Live Demo</span>
                    </button>
                  )}
                </div>

                {/* Desktop Hover Play / Explore Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/40 to-transparent opacity-0 group-hover/thumb:opacity-100 transition-all duration-300 hidden md:flex items-center justify-center p-4 z-10 pointer-events-none group-hover/thumb:pointer-events-auto">
                  {project.videoUrl ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveVideo({ title: project.title, url: project.videoUrl!, image: project.image });
                      }}
                      className="px-4 py-2 rounded-xl bg-white text-slate-950 font-bold text-xs flex items-center gap-2 shadow-2xl hover:scale-105 transition-transform cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 fill-current text-blue-600" />
                      <span>Watch Demonstration</span>
                    </button>
                  ) : (
                    <Link
                      href={`/projects/${project.slug}`}
                      className="px-4 py-2 rounded-xl bg-white text-slate-950 font-bold text-xs flex items-center gap-2 shadow-2xl hover:scale-105 transition-transform"
                    >
                      <span>Explore Case Study</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-blue-600" />
                    </Link>
                  )}
                </div>
              </div>

              {/* Status & Subtitle Line */}
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-semibold tracking-wider uppercase truncate">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                  <span className="truncate">{project.categoryLabel}</span>
                </span>
                {project.status && (
                  <span className="text-[10.5px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1 shrink-0 ml-2">
                    <CheckCircle2 className="w-3 h-3 shrink-0" />
                    <span>{project.status.split(" ")[0]} Active</span>
                  </span>
                )}
              </div>

              {/* Title with Consistent Minimum Height for Perfect Grid Symmetry */}
              <Link href={`/projects/${project.slug}`} className="block group/title">
                <h3 className="text-base sm:text-lg md:text-[19px] font-bold text-slate-900 dark:text-white font-heading tracking-tight leading-snug group-hover/title:text-blue-600 dark:group-hover/title:text-blue-400 transition-colors line-clamp-2 min-h-[2.75rem] sm:min-h-[3.25rem]">
                  {project.title}
                </h3>
              </Link>

              {/* Summary with line-clamp */}
              <p className="text-xs sm:text-[13px] text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2 min-h-[2.4rem]">
                {project.summary}
              </p>

              {/* Clean Tech Stack Badges */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1 mt-auto min-h-[1.75rem]">
                {project.technologies.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="text-[10.5px] font-mono px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border border-slate-200/70 dark:border-slate-800"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 3 && (
                  <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 px-1.5">
                    +{project.technologies.length - 3} more
                  </span>
                )}
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-4 mt-5 border-t border-slate-100 dark:border-slate-800/90 flex items-center justify-between gap-2">
              <Link
                href={`/projects/${project.slug}`}
                className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors group/link truncate"
              >
                <span>Read Full Case Study</span>
                <ArrowRight className="w-3.5 h-3.5 shrink-0 group-hover/link:translate-x-1 transition-transform" />
              </Link>

              {project.videoUrl && (
                <button
                  onClick={() => setActiveVideo({ title: project.title, url: project.videoUrl!, image: project.image })}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/60 transition-colors cursor-pointer shrink-0"
                  title="Watch Video Demonstration"
                >
                  <PlayCircle className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                  <span>Demo</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 🌟 Ultra-Fast Instant Video Demonstration Modal */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-3 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="relative w-full max-w-4xl max-h-[94vh] flex flex-col bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl p-4 sm:p-6 space-y-4 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 gap-3">
              <div className="flex items-center gap-2 min-w-0">
                <PlayCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
                <h4 className="text-sm sm:text-base md:text-lg font-bold text-slate-900 dark:text-white font-heading truncate">
                  {activeVideo.title} — Demonstration
                </h4>
              </div>
              <button
                onClick={() => setActiveVideo(null)}
                aria-label="Close video demo"
                className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 transition-colors cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Player with Instant High-Res Poster + Loading Indicator */}
            <div className="aspect-[16/9] w-full bg-slate-950 rounded-xl overflow-hidden relative shadow-inner">
              {!isVideoLoaded && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-950 overflow-hidden">
                  {activeVideo.image && (
                    <Image
                      src={activeVideo.image}
                      alt={activeVideo.title}
                      fill
                      className="object-cover object-top opacity-30 blur-xs scale-105"
                      priority
                    />
                  )}
                  <div className="relative z-20 flex flex-col items-center gap-3 p-4 text-center">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full border-2 border-blue-500/20 border-t-blue-500 animate-spin" />
                      <PlayCircle className="w-6 h-6 text-blue-400 absolute inset-0 m-auto animate-pulse" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs sm:text-sm font-bold text-white font-heading tracking-wide">
                        Loading Live Demonstration...
                      </p>
                      <p className="text-[11px] text-slate-400 font-mono">
                        Connecting to high-speed stream
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeVideo.url.includes("youtube.com") || activeVideo.url.includes("youtu.be") ? (
                <iframe
                  src={getYoutubeEmbedUrl(activeVideo.url)}
                  title={`${activeVideo.title} demo`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="eager"
                  onLoad={() => setIsVideoLoaded(true)}
                  className={`w-full h-full border-0 transition-opacity duration-300 ${isVideoLoaded ? "opacity-100" : "opacity-0"}`}
                />
              ) : activeVideo.url.match(/\.(mp4|webm|ogg)$/i) ? (
                <video
                  src={activeVideo.url}
                  controls
                  autoPlay
                  onLoadedData={() => setIsVideoLoaded(true)}
                  className={`w-full h-full object-contain transition-opacity duration-300 ${isVideoLoaded ? "opacity-100" : "opacity-0"}`}
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
