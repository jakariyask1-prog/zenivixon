"use client";

import React, { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { MessageSquare, Video as VideoIcon, Users } from "lucide-react";
import { AboutVideo, VideoCategory } from "@/types/aboutVideo";
import { ABOUT_VIDEOS, VIDEO_CATEGORIES } from "@/data/aboutVideos";
import { FeaturedVideo } from "./FeaturedVideo";
import { VideoCard } from "./VideoCard";
import { VideoModal } from "./VideoModal";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function AboutVideoSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Scroll parallax for floating satellite cards on desktop
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const parallaxSlow = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [20, -25]);
  const parallaxFast = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [-15, 30]);

  // Selected category filter
  const [selectedCategory, setSelectedCategory] = useState<"All" | VideoCategory>("All");

  // Active featured video
  const [featuredVideo, setFeaturedVideo] = useState<AboutVideo>(
    ABOUT_VIDEOS.find((v) => v.featured) || ABOUT_VIDEOS[0]
  );

  // Lightbox modal state
  const [modalVideo, setModalVideo] = useState<AboutVideo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleOpenModal = (video: AboutVideo) => {
    setModalVideo(video);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSelectFeatured = (video: AboutVideo) => {
    setFeaturedVideo(video);
  };

  // Filtered videos based on category
  const filteredVideos = useMemo(() => {
    if (selectedCategory === "All") return ABOUT_VIDEOS;
    return ABOUT_VIDEOS.filter((v) => v.category === selectedCategory);
  }, [selectedCategory]);

  // Satellite videos (excluding currently featured video)
  const satelliteVideos = useMemo(() => {
    return filteredVideos.filter((v) => v.id !== featuredVideo.id);
  }, [filteredVideos, featuredVideo.id]);

  // Top satellite cards (first 2 for side placement)
  const sideSatellites = satelliteVideos.slice(0, 2);
  // Bottom editorial cards (remaining videos)
  const remainingSatellites = satelliteVideos.slice(2);

  return (
    <section
      ref={containerRef}
      id="people-behind-zenivixon"
      aria-label="Meet the People Behind ZENIVIXON"
      className="relative py-12 md:py-16 space-y-12"
    >
      {/* Decorative ambient background glows */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-500/10 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 -right-32 w-96 h-96 bg-cyan-500/10 dark:bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Section Header */}
      <div className="space-y-6">
        <ScrollReveal direction="up">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <Badge variant="blue" size="sm" className="font-semibold text-xs tracking-widest">
                THE PEOPLE BEHIND ZENIVIXON
              </Badge>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0F172A] dark:text-white font-heading tracking-tight leading-tight">
                Meet the People Behind ZENIVIXON
              </h2>
              <p className="text-base sm:text-lg font-medium text-blue-600 dark:text-blue-400 font-heading">
                Real people. Real conversations. Real work.
              </p>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
                We believe AI should be personal, grounded, and transparent. Watch unscripted discussions, architectural walkthroughs, and behind-the-scenes moments from the team architecting your systems.
              </p>
            </div>

            {/* Authentic Live Note */}
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm max-w-xs space-y-1.5 shrink-0">
              <div className="flex items-center gap-2 text-xs font-heading font-bold text-slate-800 dark:text-slate-200">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>Unfiltered Engineering</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                Direct insights from our founder, engineers, and real enterprise discovery conversations.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Category Filter Pills */}
        <div className="pt-2 flex flex-wrap items-center gap-2">
          {VIDEO_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`relative px-4 py-2 text-xs font-heading font-semibold rounded-xl transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "text-white shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60"
                }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="activeVideoCategory"
                    className="absolute inset-0 bg-blue-600 dark:bg-blue-600 rounded-xl"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Interactive Editorial Video Composition */}
      <div className="space-y-8">
        {/* Main Composition Layer: Featured dominant video + Side floating satellites */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Dominant Featured Video (7 cols on Desktop) */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <FeaturedVideo
                key={featuredVideo.id}
                video={featuredVideo}
                onPlay={handleOpenModal}
              />
            </AnimatePresence>
          </div>

          {/* Staggered Floating Satellite Cards (5 cols on Desktop) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center justify-between pb-1 border-b border-slate-200/80 dark:border-slate-800">
              <span className="text-xs font-bold uppercase tracking-wider font-heading text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                <VideoIcon className="w-3.5 h-3.5 text-blue-500" />
                Featured Stories &bull; Click to Feature or Play
              </span>
              <span className="text-[11px] font-mono text-slate-400">
                {satelliteVideos.length} more clips
              </span>
            </div>

            <div className="space-y-6">
              {sideSatellites.map((video, idx) => (
                <motion.div
                  key={video.id}
                  style={idx === 1 ? { y: parallaxSlow } : { y: parallaxFast }}
                  className="transition-transform duration-300"
                >
                  <VideoCard
                    video={video}
                    size="sm"
                    onPlay={handleOpenModal}
                    onSelect={handleSelectFeatured}
                  />
                </motion.div>
              ))}

              {sideSatellites.length === 0 && (
                <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-2">
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Currently displaying the featured video for this category.
                  </p>
                  <button
                    onClick={() => setSelectedCategory("All")}
                    className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    View all videos &rarr;
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Secondary Editorial Row: Remaining Authentic Moments */}
        {remainingSatellites.length > 0 && (
          <div className="pt-6 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-600 dark:text-slate-400 font-heading">
              <Users className="w-3.5 h-3.5 text-cyan-500" />
              <span>Behind The Work &amp; Specialized Architecture</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {remainingSatellites.map((video) => (
                <VideoCard
                  key={video.id}
                  video={video}
                  size="md"
                  onPlay={handleOpenModal}
                  onSelect={handleSelectFeatured}
                />
              ))}
            </div>
          </div>
        )}
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
