"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import {
  Play,
  Sparkles,
  MessageSquare,
  Clock,
  ArrowUpRight,
  ShieldCheck,
  Video as VideoIcon,
} from "lucide-react";
import { CLIENT_CONVERSATION_VIDEOS } from "@/data/clientVideos";
import { ClientConversationVideo } from "@/types/clientVideo";
import { VideoModal } from "@/components/about/videos/VideoModal";
import { AboutVideo } from "@/types/aboutVideo";

export function ClientVideoMarqueeSection() {
  const [activeModalVideo, setActiveModalVideo] = useState<AboutVideo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenVideo = (item: ClientConversationVideo) => {
    // Map ClientConversationVideo to AboutVideo schema for the unified VideoModal
    const mapped: AboutVideo = {
      id: item.id,
      category: "Co-Founder", // placeholder category for badge
      title: item.topicTitle,
      name: `${item.flag} ${item.clientName}`,
      role: `${item.role} • ${item.companyOrIndustry}`,
      description: item.keyTakeaway,
      thumbnail: item.thumbnail,
      videoUrl: item.videoUrl || "",
      duration: item.duration,
      tags: [item.country, item.tag],
    };
    setActiveModalVideo(mapped);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Duplicate list once to create an infinite, seamless continuous rail
  const marqueeItems = [...CLIENT_CONVERSATION_VIDEOS, ...CLIENT_CONVERSATION_VIDEOS];

  return (
    <section
      id="client-conversations"
      aria-label="Real Client Conversations and Video Reviews"
      className="py-14 md:py-20 relative overflow-hidden bg-gradient-to-b from-transparent via-slate-50/60 dark:via-slate-900/40 to-transparent border-y border-slate-200/80 dark:border-slate-800/80 transition-colors duration-300"
    >
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-blue-500/5 dark:bg-blue-600/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold font-heading uppercase tracking-widest shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 animate-pulse" />
              <span>REAL CLIENT DIALOGUE &amp; REVIEWS</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F172A] dark:text-white font-heading tracking-tight leading-tight">
              Authentic Conversations.{" "}
              <span className="text-gradient-animated">Real Enterprise Scoping.</span>
            </h2>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              Listen in on genuine discovery meetings, architectural evaluations, and post-sprint reviews with international CTOs and operations leaders across the US, UK, and Europe.
            </p>
          </div>

          {/* Interactive Hint Indicator */}
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 text-xs font-heading font-medium shadow-xs self-start md:self-auto shrink-0">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Hover card to pause &bull; Click to watch</span>
          </div>
        </div>
      </div>

      {/* Marquee Scroller with Smooth Left & Right Gradient Fade Mask */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
        }}
      >
        <div className="marquee-track gap-6 py-4 px-4">
          {marqueeItems.map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              onClick={() => handleOpenVideo(item)}
              className="w-[310px] sm:w-[350px] shrink-0 rounded-3xl bg-white dark:bg-slate-900/95 border border-slate-200/90 dark:border-slate-800/90 shadow-md hover:shadow-2xl hover:border-blue-400/80 dark:hover:border-blue-600/80 p-5 flex flex-col justify-between transition-all duration-300 group cursor-pointer hover:-translate-y-1.5 select-none relative overflow-hidden"
            >
              {/* Subtle top hover gradient glow */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/5 dark:bg-blue-500/15 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />

              <div className="space-y-4 relative z-10">
                {/* 16:9 Video Thumbnail Viewport */}
                <div className="aspect-video w-full relative rounded-2xl bg-slate-950 overflow-hidden shadow-sm border border-slate-200/60 dark:border-slate-800 group/thumb">
                  <Image
                    src={item.thumbnail}
                    alt={item.topicTitle}
                    fill
                    sizes="(max-width: 768px) 310px, 350px"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100"
                  />

                  {/* Dark Vignette Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent pointer-events-none" />

                  {/* Play Button Pill */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-blue-600/90 text-white flex items-center justify-center shadow-lg shadow-blue-600/40 border border-blue-400/40 group-hover:scale-110 group-hover:bg-blue-500 transition-all duration-300">
                      <Play className="w-5 h-5 ml-0.5 fill-white" />
                    </div>
                  </div>

                  {/* Top-Right Duration Badge */}
                  <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-slate-950/80 backdrop-blur-md border border-white/10 text-[10px] font-mono text-white flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-300" />
                    <span>{item.duration}</span>
                  </div>

                  {/* Bottom-Left Tag Pill */}
                  <div className="absolute bottom-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-blue-600/85 backdrop-blur-md text-[10px] font-heading font-bold text-white shadow-xs">
                    {item.tag}
                  </div>
                </div>

                {/* Client Identity & Country Flag */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-heading">
                    <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <span className="text-sm">{item.flag}</span>
                      <span>{item.clientName}</span>
                    </span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                      {item.country}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                    {item.role} &bull; {item.companyOrIndustry}
                  </p>
                </div>

                {/* Discussion Topic Title */}
                <h3 className="text-sm font-bold text-[#0F172A] dark:text-slate-100 font-heading line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                  {item.topicTitle}
                </h3>

                {/* Key Takeaway Quote */}
                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                  &ldquo;{item.keyTakeaway}&rdquo;
                </p>
              </div>

              {/* Card Footer Link */}
              <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-heading font-semibold text-blue-600 dark:text-blue-400 relative z-10">
                <span className="flex items-center gap-1.5 text-[11px]">
                  <VideoIcon className="w-3.5 h-3.5" />
                  Watch Video Recording
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Shared Fullscreen Lightbox Modal */}
      <VideoModal
        video={activeModalVideo}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
}
