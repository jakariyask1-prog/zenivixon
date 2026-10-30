"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, Maximize2, Bot, Cpu, Globe, Network, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { AmbientOrbs } from "@/components/ui/AmbientOrbs";
import { PROJECTS_DATA } from "@/data/projects";
import { getYoutubeEmbedUrl } from "@/lib/utils";

const features = [
  { icon: <Bot className="w-4 h-4" />, text: "AI Agents & Autonomous Loops", color: "bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800" },
  { icon: <Cpu className="w-4 h-4" />, text: "Intelligent Workflow Automation", color: "bg-cyan-50 dark:bg-cyan-950/30 text-cyan-700 dark:text-cyan-400 border-cyan-200 dark:border-cyan-800" },
  { icon: <Globe className="w-4 h-4" />, text: "Modern Web & SaaS Development", color: "bg-indigo-50 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800" },
  { icon: <Network className="w-4 h-4" />, text: "Enterprise Vector RAG & CRM Sync", color: "bg-purple-50 dark:bg-purple-950/30 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-800" },
];

export function VideoShowcaseSection() {
  const videoProjects = PROJECTS_DATA.filter((p) => p.featured && Boolean(p.videoUrl));
  const [selectedSlug, setSelectedSlug] = useState<string>(videoProjects[0]?.slug || "jakariya-ai-studio");
  
  const activeProject = videoProjects.find((p) => p.slug === selectedSlug) || videoProjects[0];
  const isDirectVideo = Boolean(activeProject?.videoUrl?.match(/\.(mp4|webm|ogg)$/i));

  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-15%" });
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Play direct video when scrolled into view
  useEffect(() => {
    if (isDirectVideo) {
      const video = videoRef.current;
      if (!video) return;
      if (isInView && !hasInteracted) {
        video.play().then(() => setPlaying(true)).catch(() => {});
      }
    }
  }, [isInView, hasInteracted, isDirectVideo, selectedSlug]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    setHasInteracted(true);
    if (playing) {
      video.pause();
      setPlaying(false);
    } else {
      video.play();
      setPlaying(true);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  };

  const openFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.requestFullscreen) video.requestFullscreen();
  };

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 border-t border-slate-200/80 dark:border-slate-800/80 bg-[#F7F9FC] dark:bg-[#070d1d] relative overflow-hidden transition-colors duration-300"
    >
      <AmbientOrbs />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-10 md:mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.17, 0.55, 0.55, 1] }}
        >
          <Badge variant="blue" size="sm" className="font-semibold text-xs tracking-widest mb-4">
            LIVE SYSTEM DEMONSTRATIONS
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0F172A] dark:text-white tracking-tight font-heading leading-tight mb-4">
            See ZENIVIXON{" "}
            <span className="text-gradient-animated">In Action</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Watch real-time live demonstrations of our deployed systems — explore our desktop AI workstations, enterprise web platforms, semantic RAG pipelines, and autonomous swarms operating in production.
          </p>
        </motion.div>

        {/* Project Selector Tab Bar */}
        <motion.div
          className="flex items-center justify-start lg:justify-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none px-2"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          role="tablist"
          aria-label="Live Demo Projects"
        >
          {videoProjects.map((p, idx) => {
            const isSelected = p.slug === activeProject.slug;
            return (
              <button
                key={p.slug}
                role="tab"
                aria-selected={isSelected}
                onClick={() => {
                  setSelectedSlug(p.slug);
                  setHasInteracted(true);
                }}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold font-heading transition-all shrink-0 flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30 ring-2 ring-blue-500/50 scale-[1.02]"
                    : "bg-white dark:bg-slate-900/90 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${isSelected ? "bg-white animate-pulse" : "bg-blue-500"}`} />
                <span className="font-mono text-[11px] opacity-75">0{idx + 1}.</span>
                <span className="truncate max-w-[150px] sm:max-w-none">{p.title}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Video Player Main Container */}
        <motion.div
          className="relative max-w-5xl mx-auto mb-8"
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.17, 0.55, 0.55, 1] }}
        >
          {/* Glowing Ambient Light behind video */}
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-cyan-400/15 to-purple-500/20 blur-3xl rounded-3xl scale-95 opacity-60 pointer-events-none" />

          <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl shadow-blue-900/20 group bg-slate-950 aspect-[16/9]">
            
            {/* Top Badge Overlay */}
            <div className="absolute top-4 left-4 z-20 flex items-center gap-2 pointer-events-none">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/85 backdrop-blur-md border border-white/10 text-white text-xs font-bold font-heading tracking-wider shadow-lg">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span>LIVE SYSTEM DEMO</span>
              </div>
              <span className="hidden sm:inline-block px-3 py-1.5 rounded-full bg-blue-950/80 backdrop-blur-md border border-blue-500/30 text-blue-300 text-xs font-semibold">
                {activeProject.categoryLabel}
              </span>
            </div>

            {/* Video Player Display: Direct MP4 or YouTube Embed */}
            {isDirectVideo ? (
              <>
                <video
                  ref={videoRef}
                  key={activeProject.videoUrl}
                  src={activeProject.videoUrl}
                  poster={activeProject.image}
                  className="w-full h-full object-contain block"
                  muted={muted}
                  loop
                  playsInline
                  autoPlay
                />

                {/* Direct Video Overlay controls */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 sm:p-6 z-20">
                  <div className="flex items-center gap-3 w-full">
                    <button
                      onClick={togglePlay}
                      className="p-2.5 rounded-xl bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/20 text-white transition-all cursor-pointer"
                      aria-label={playing ? "Pause" : "Play"}
                    >
                      {playing ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                    </button>
                    <button
                      onClick={toggleMute}
                      className="p-2.5 rounded-xl bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/20 text-white transition-all cursor-pointer"
                      aria-label={muted ? "Unmute" : "Mute"}
                    >
                      {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                    </button>
                    <div className="flex-1" />
                    <button
                      onClick={openFullscreen}
                      className="p-2.5 rounded-xl bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/20 text-white transition-all cursor-pointer"
                      aria-label="Fullscreen"
                    >
                      <Maximize2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Center play button (shows when paused) */}
                {!playing && (
                  <div
                    className="absolute inset-0 flex items-center justify-center cursor-pointer z-10"
                    onClick={togglePlay}
                  >
                    <motion.div
                      className="relative w-18 h-18 flex items-center justify-center"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="absolute w-20 h-20 rounded-full bg-blue-600/30 animate-ping" />
                      <div className="relative w-16 h-16 rounded-full bg-blue-600 shadow-lg shadow-blue-600/40 flex items-center justify-center">
                        <Play className="w-7 h-7 text-white ml-1" fill="white" />
                      </div>
                    </motion.div>
                  </div>
                )}
              </>
            ) : (
              <iframe
                key={activeProject.videoUrl}
                src={getYoutubeEmbedUrl(activeProject.videoUrl!, true)}
                title={`${activeProject.title} Live Demonstration`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0 block"
              />
            )}
          </div>

          {/* Active Project Info Card Below Video */}
          <div className="mt-4 p-5 rounded-2xl bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1 max-w-2xl">
              <div className="flex items-center gap-2">
                <Badge variant="cyan" size="sm" className="font-semibold text-[10px]">
                  {activeProject.categoryLabel}
                </Badge>
                {activeProject.status && (
                  <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    {activeProject.status}
                  </span>
                )}
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#0F172A] dark:text-white font-heading">
                {activeProject.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                {activeProject.summary}
              </p>
            </div>

            <Link
              href={`/projects/${activeProject.slug}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-md shadow-blue-600/20 shrink-0 self-start md:self-auto transition-all transform hover:scale-[1.02]"
            >
              <span>Explore Case Study</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>

        {/* Features Pills */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-3 pt-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {features.map((f, idx) => (
            <motion.div
              key={f.text}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-semibold font-heading ${f.color}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.45 + idx * 0.05 }}
              whileHover={{ scale: 1.05 }}
            >
              {f.icon}
              {f.text}
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
