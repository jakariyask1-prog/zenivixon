"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Play,
  Sparkles,
  ShieldCheck,
  Clock,
  ArrowUpRight,
  Video as VideoIcon,
  MessageSquare,
  Crown,
  Cpu,
  Layers,
} from "lucide-react";
import { AboutVideo } from "@/types/aboutVideo";
import { ABOUT_VIDEOS } from "@/data/aboutVideos";
import { VideoModal } from "./VideoModal";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function AboutVideoSection() {
  const [modalVideo, setModalVideo] = useState<AboutVideo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (video: AboutVideo) => {
    setModalVideo(video);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Duplicate the 3 leadership videos once to create a seamless, continuous perpetual rail
  const marqueeItems = [...ABOUT_VIDEOS, ...ABOUT_VIDEOS];

  return (
    <section
      id="people-behind-zenivixon"
      aria-label="Meet the Leadership Behind ZENIVIXON"
      className="relative py-12 md:py-18 space-y-10 overflow-hidden"
    >
      {/* Decorative ambient background glows */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-500/10 dark:bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 -right-32 w-96 h-96 bg-cyan-500/10 dark:bg-cyan-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Section Header */}
      <div className="space-y-6">
        <ScrollReveal direction="up">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold font-heading uppercase tracking-widest shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 animate-pulse" />
                <span>EXECUTIVE LEADERSHIP &amp; CORE DIRECTORS</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0F172A] dark:text-white font-heading tracking-tight leading-tight">
                Meet the Leadership{" "}
                <span className="text-gradient-animated">Behind ZENIVIXON</span>
              </h2>

              <p className="text-base sm:text-lg font-medium text-blue-600 dark:text-blue-400 font-heading">
                Direct insights. Real conversations. Real engineering.
              </p>

              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
                We believe AI should be personal, grounded, and transparent. Watch architectural discussions and direct video addresses from our Founder, Co-Founder, and Team Leadership.
              </p>
            </div>

            {/* Smart Status & Interaction Badge */}
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm max-w-xs space-y-1.5 shrink-0">
              <div className="flex items-center gap-2 text-xs font-heading font-bold text-slate-800 dark:text-slate-200">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>Smart Kinetic Glide</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                Hover any card to pause motion &bull; Click to watch full recording.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Quick-Watch Director Selector Bar */}
        <div className="pt-2 flex flex-wrap items-center gap-2">
          <span className="text-xs font-heading font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mr-2 hidden sm:inline">
            Direct Watch:
          </span>
          {ABOUT_VIDEOS.map((item) => {
            const getIcon = () => {
              if (item.category === "Founder & CEO") return <Crown className="w-3.5 h-3.5 text-amber-500" />;
              if (item.category === "Co-Founder") return <Cpu className="w-3.5 h-3.5 text-cyan-500" />;
              return <Layers className="w-3.5 h-3.5 text-blue-500" />;
            };

            return (
              <button
                key={item.id}
                onClick={() => handleOpenModal(item)}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-heading font-semibold rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all cursor-pointer shadow-xs hover:scale-105 active:scale-95"
              >
                {getIcon()}
                <span>{item.name} ({item.category})</span>
                <Play className="w-2.5 h-2.5 ml-0.5 fill-current opacity-70" />
              </button>
            );
          })}
        </div>
      </div>

      {/* Cinematic Panoramic Moving Marquee Rail */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
        }}
      >
        <div className="marquee-leadership-track gap-8 py-6 px-4">
          {marqueeItems.map((video, idx) => (
            <div
              key={`${video.id}-${idx}`}
              onClick={() => handleOpenModal(video)}
              className="w-[350px] sm:w-[440px] md:w-[480px] shrink-0 rounded-3xl bg-white/95 dark:bg-[#0b1120] border border-slate-200/90 dark:border-slate-800/90 shadow-xl hover:shadow-2xl hover:border-blue-400 dark:hover:border-blue-500 p-6 flex flex-col justify-between transition-all duration-300 group cursor-pointer hover:-translate-y-2 select-none relative overflow-hidden"
            >
              {/* Animated Aurora Backdrop on Card Hover */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-500/10 via-cyan-500/10 to-transparent rounded-full blur-3xl pointer-events-none group-hover:scale-150 transition-transform duration-700" />

              <div className="space-y-5 relative z-10">
                {/* 16:9 Cinematic Video Viewport with Conic Glow Border */}
                <div className="aspect-video w-full relative rounded-2xl bg-slate-950 overflow-hidden shadow-md group/viewport">
                  {/* Rotating Conic Gradient Beam */}
                  <div className="absolute -inset-[50%] z-0 animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0_180deg,#3b82f6_270deg,#06b6d4_360deg)] opacity-60 group-hover:opacity-100 transition-opacity" />

                  {/* Inner Container */}
                  <div className="absolute inset-[2.5px] rounded-[14px] bg-slate-950 z-10 overflow-hidden">
                    <Image
                      src={video.thumbnail}
                      alt={video.title}
                      fill
                      sizes="(max-width: 768px) 350px, 480px"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100"
                    />

                    {/* Dark Vignette Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/30 pointer-events-none" />

                    {/* Center Glowing Play Beacon Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-blue-600/90 text-white flex items-center justify-center shadow-xl shadow-blue-600/40 border border-blue-400/50 group-hover:scale-115 group-hover:bg-blue-500 transition-all duration-300">
                        <Play className="w-6 h-6 ml-1 fill-white" />
                      </div>
                    </div>

                    {/* Top-Left Category Badge */}
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/15 text-[10px] font-heading font-extrabold uppercase tracking-wider text-blue-300 shadow-sm flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                      <span>{video.category}</span>
                    </div>

                    {/* Top-Right Duration Badge */}
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-md border border-white/15 text-[10px] font-mono text-white flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-300" />
                      <span>{video.duration}</span>
                    </div>
                  </div>
                </div>

                {/* Director Identity & Verified Badge */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg sm:text-xl font-extrabold text-[#0F172A] dark:text-white font-heading group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {video.name}
                    </h3>
                    <span className="text-[10px] font-heading text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800/80">
                      <ShieldCheck className="w-3 h-3" />
                      Verified Leader
                    </span>
                  </div>

                  <p className="text-xs font-heading text-blue-600 dark:text-blue-400 font-semibold">
                    {video.role}
                  </p>
                </div>

                {/* Address Title */}
                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 font-heading line-clamp-2 leading-snug">
                  {video.title}
                </h4>

                {/* Director Quote / Overview */}
                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                  &ldquo;{video.description}&rdquo;
                </p>

                {/* Tags */}
                {video.tags && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {video.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-heading px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Card Footer Action */}
              <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-heading font-bold text-blue-600 dark:text-blue-400 relative z-10">
                <span className="flex items-center gap-1.5">
                  <VideoIcon className="w-4 h-4 text-blue-500" />
                  Watch Video Address
                </span>
                <div className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Open Video</span>
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Subtle End CTA connecting with ZENIVIXON's existing action system */}
      <ScrollReveal direction="up">
        <div className="mt-8 pt-8 border-t border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6 p-6 sm:p-8 rounded-3xl bg-slate-50/70 dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800">
          <div className="space-y-1.5 text-center sm:text-left">
            <h3 className="text-lg sm:text-xl font-bold text-[#0F172A] dark:text-white font-heading">
              Want to build something with us?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Speak directly with our engineering founders to scope your AI agents and automation systems.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Button
              variant="primary"
              size="md"
              href="/start-a-project"
              icon={<MessageSquare className="w-4 h-4" />}
            >
              Let&apos;s Talk
            </Button>
          </div>
        </div>
      </ScrollReveal>

      {/* Fullscreen / Lightbox Video Player Modal */}
      <VideoModal
        video={modalVideo}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
}
