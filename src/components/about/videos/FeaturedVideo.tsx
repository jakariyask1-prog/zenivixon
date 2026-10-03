"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Play, Sparkles, Volume2, VolumeX } from "lucide-react";
import { AboutVideo } from "@/types/aboutVideo";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

interface FeaturedVideoProps {
  video: AboutVideo;
  onPlay: (video: AboutVideo) => void;
  className?: string;
}

export function FeaturedVideo({ video, onPlay, className = "" }: FeaturedVideoProps) {
  const shouldReduceMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);
  const [isPreviewMuted, setIsPreviewMuted] = useState(true);
  const previewVideoRef = useRef<HTMLVideoElement>(null);

  const handlePlayClick = () => {
    onPlay(video);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (previewVideoRef.current && video.videoUrl) {
      previewVideoRef.current.currentTime = 0;
      previewVideoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (previewVideoRef.current) {
      previewVideoRef.current.pause();
    }
  };

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (previewVideoRef.current) {
      previewVideoRef.current.muted = !previewVideoRef.current.muted;
      setIsPreviewMuted(previewVideoRef.current.muted);
    }
  };

  return (
    <motion.div
      layout={!shouldReduceMotion}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl shadow-blue-900/10 overflow-hidden flex flex-col group",
        className
      )}
    >
      {/* Decorative ambient aura behind featured video */}
      <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-blue-500/15 dark:bg-blue-500/25 blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />

      {/* Main Video Viewport (16:9 aspect) - COMPLETELY CLEAN: NO TEXT OVER VIDEO */}
      <div
        className="relative aspect-video w-full overflow-hidden bg-slate-950 cursor-pointer"
        onClick={handlePlayClick}
      >
        {/* Subtle Conic Animated Border Accent on top edge */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-600 via-cyan-400 to-indigo-600 z-10" />

        {/* Poster Image (Zero text, completely clean) */}
        <Image
          src={video.thumbnail}
          alt={video.title}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 65vw"
          className={cn(
            "object-cover transition-transform duration-700 ease-out group-hover:scale-105",
            isHovered && video.videoUrl ? "opacity-0" : "opacity-100"
          )}
        />

        {/* Video Preview on Hover (Muted, clean preview) */}
        {video.videoUrl && (
          <video
            ref={previewVideoRef}
            src={video.videoUrl}
            muted={isPreviewMuted}
            playsInline
            loop
            preload="none"
            className={cn(
              "absolute inset-0 w-full h-full object-cover transition-opacity duration-500",
              isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
            )}
          />
        )}

        {/* Minimal sound toggle button when hovering preview */}
        {video.videoUrl && isHovered && (
          <div className="absolute top-4 right-4 z-20">
            <button
              onClick={toggleSound}
              aria-label={isPreviewMuted ? "Unmute preview" : "Mute preview"}
              className="p-2 rounded-xl bg-slate-950/70 backdrop-blur-md text-white border border-white/20 hover:bg-slate-900 transition-colors cursor-pointer"
            >
              {isPreviewMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>
        )}

        {/* Center Play Button (No text over video) */}
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <motion.div
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            className="relative flex items-center justify-center"
          >
            {/* Pulsing ring aura */}
            <div className="absolute w-20 h-20 rounded-full bg-blue-600/30 animate-ping pointer-events-none" />
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePlayClick();
              }}
              aria-label={`Play featured video: ${video.title}`}
              className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-blue-600 text-white shadow-2xl shadow-blue-600/60 border-2 border-blue-300/40 flex items-center justify-center transition-transform duration-300 group-hover:scale-105 pointer-events-auto cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-400"
            >
              <Play className="w-7 sm:w-8 h-7 sm:h-8 ml-1" fill="white" />
            </button>
          </motion.div>
        </div>
      </div>

      {/* Narrative Details Placed CLEANLY BELOW the Video - Nothing on the video screen */}
      <div className="p-6 sm:p-8 flex flex-col justify-between flex-1 gap-6 bg-gradient-to-b from-white to-slate-50/50 dark:from-slate-900 dark:to-slate-950">
        <div className="space-y-3">
          {/* Header Row: Category, Speaker Name, and Duration */}
          <div className="flex flex-wrap items-center justify-between gap-2.5">
            <div className="flex items-center gap-2">
              <Badge variant="blue" size="sm" className="font-semibold text-xs tracking-wider">
                {video.category}
              </Badge>
              {video.name && (
                <span className="text-xs font-heading font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full border border-slate-200 dark:border-slate-700">
                  {video.name} {video.role && <span className="text-slate-500 font-normal">&bull; {video.role}</span>}
                </span>
              )}
            </div>

            {video.duration && (
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800/80">
                {video.duration}
              </span>
            )}
          </div>

          {/* Clean Prominent Video Title */}
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] dark:text-white font-heading tracking-tight leading-snug">
            {video.title}
          </h3>

          {/* Description */}
          {video.description && (
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              {video.description}
            </p>
          )}

          {/* Tags */}
          {video.tags && video.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {video.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-heading font-semibold px-2.5 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200/80 dark:border-blue-800/60"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Interactive Action Bar */}
        <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-heading">
            <Sparkles className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            <span>
              {video.videoUrl
                ? "Full unscripted address • Enhanced audio enabled"
                : "Real unscripted conversation • Click to preview"}
            </span>
          </div>

          <button
            onClick={handlePlayClick}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-heading font-semibold text-xs sm:text-sm shadow-md shadow-blue-600/25 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>{video.videoUrl ? "Watch Video" : "Watch Preview"}</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
