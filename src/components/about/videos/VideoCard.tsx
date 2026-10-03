"use client";

import React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Play, Sparkles } from "lucide-react";
import { AboutVideo } from "@/types/aboutVideo";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

interface VideoCardProps {
  video: AboutVideo;
  isActive?: boolean;
  onPlay: (video: AboutVideo) => void;
  onSelect?: (video: AboutVideo) => void;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function VideoCard({
  video,
  isActive = false,
  onPlay,
  onSelect,
  className = "",
  size = "md",
}: VideoCardProps) {
  const shouldReduceMotion = useReducedMotion();

  const handleCardClick = () => {
    if (onSelect) {
      onSelect(video);
    } else {
      onPlay(video);
    }
  };

  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onPlay(video);
  };

  return (
    <motion.div
      layout={!shouldReduceMotion}
      whileHover={shouldReduceMotion ? undefined : { y: -4, scale: 1.01 }}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onPlay(video);
        }
      }}
      aria-label={`Video: ${video.title} by ${video.name || video.category}`}
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-2xl md:rounded-3xl border transition-all cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
        isActive
          ? "bg-blue-50/50 dark:bg-blue-950/20 border-blue-400 dark:border-blue-600 shadow-xl shadow-blue-500/10"
          : "bg-white dark:bg-slate-900/90 border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-blue-300 dark:hover:border-blue-700/60",
        className
      )}
    >
      {/* Thumbnail Aspect Container - COMPLETELY CLEAN: ZERO TEXT OVER IMAGE */}
      <div
        className={cn(
          "relative w-full overflow-hidden bg-slate-950",
          size === "sm" ? "aspect-[16/10]" : "aspect-[16/10] sm:aspect-[16/9]"
        )}
      >
        <Image
          src={video.thumbnail}
          alt={video.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Center Play Button (No text over image) */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <button
            onClick={handlePlayClick}
            aria-label={`Play ${video.title}`}
            className="w-12 h-12 rounded-full bg-blue-600/90 hover:bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-600/40 border border-blue-400/40 transition-transform duration-300 group-hover:scale-110 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <Play className="w-5 h-5 ml-0.5" fill="white" />
          </button>
        </div>
      </div>

      {/* Card Content Footer - All metadata placed cleanly below the image */}
      <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 gap-2.5">
        <div className="space-y-1.5">
          {/* Metadata Row: Category & Speaker */}
          <div className="flex flex-wrap items-center justify-between gap-1.5">
            <Badge variant="blue" size="sm" className="text-[10px] tracking-wider uppercase font-semibold">
              {video.category}
            </Badge>

            {video.name && (
              <span className="text-[11px] font-heading font-medium text-slate-600 dark:text-slate-400 truncate">
                {video.name}
              </span>
            )}
          </div>

          <h4 className="text-sm sm:text-base font-bold text-[#0F172A] dark:text-white font-heading leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
            {video.title}
          </h4>

          {video.description && (
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2">
              {video.description}
            </p>
          )}
        </div>

        {/* Quick action bar */}
        <div className="pt-2 flex items-center justify-between border-t border-slate-100 dark:border-slate-800/80 text-[11px] font-heading font-semibold text-blue-600 dark:text-blue-400">
          <span className="inline-flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            {video.videoUrl ? "Live Video" : "Real Preview"}
          </span>
          <span className="text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all">
            Watch clip &rarr;
          </span>
        </div>
      </div>
    </motion.div>
  );
}
