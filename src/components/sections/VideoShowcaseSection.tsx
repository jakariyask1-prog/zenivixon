"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, Maximize2, Bot, Cpu, Globe, Network } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { AmbientOrbs } from "@/components/ui/AmbientOrbs";

const stats = [
  { value: 98, suffix: "%", label: "Client Satisfaction", color: "text-blue-600 dark:text-blue-400" },
  { value: 24, suffix: "/7", label: "AI Agent Uptime", color: "text-cyan-600 dark:text-cyan-400" },
  { value: 10, suffix: "x", label: "Faster Than Manual", color: "text-indigo-600 dark:text-indigo-400" },
  { value: 100, suffix: "%", label: "Custom-Built Systems", color: "text-emerald-600 dark:text-emerald-400" },
];

const features = [
  { icon: <Bot className="w-4 h-4" />, text: "AI Agents & Customer Support", color: "bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800" },
  { icon: <Cpu className="w-4 h-4" />, text: "Intelligent Workflow Automation", color: "bg-cyan-50 dark:bg-cyan-950/30 text-cyan-700 dark:text-cyan-400 border-cyan-200 dark:border-cyan-800" },
  { icon: <Globe className="w-4 h-4" />, text: "Modern Web Development", color: "bg-indigo-50 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800" },
  { icon: <Network className="w-4 h-4" />, text: "AI Integration & RAG Systems", color: "bg-purple-50 dark:bg-purple-950/30 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-800" },
];

export function VideoShowcaseSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-15%" });
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isInView && !hasInteracted) {
      video.play().then(() => setPlaying(true)).catch(() => {});
    }
  }, [isInView, hasInteracted]);

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
      className="py-20 md:py-32 border-t border-slate-200/80 dark:border-slate-800/80 bg-[#F7F9FC] dark:bg-[#070d1d] relative overflow-hidden transition-colors duration-300"
    >
      <AmbientOrbs />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.17, 0.55, 0.55, 1] }}
        >
          <Badge variant="blue" size="sm" className="font-semibold text-xs tracking-widest mb-4">
            LIVE SYSTEM DEMO
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0F172A] dark:text-white tracking-tight font-heading leading-tight mb-4">
            See ZENIVIXON{" "}
            <span className="text-gradient-animated">In Action</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Watch a live demonstration of our AI Studio — real intelligent agents, automations, and integrations operating in a production environment.
          </p>
        </motion.div>

        {/* Video Player */}
        <motion.div
          className="relative max-w-5xl mx-auto mb-16"
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.17, 0.55, 0.55, 1] }}
        >
          {/* Glow behind video */}
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-cyan-400/15 to-purple-500/20 blur-3xl rounded-full scale-90 opacity-60 pointer-events-none" />

          <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl shadow-blue-900/20 group">
            {/* Video */}
            <video
              ref={videoRef}
              src="/videos/ai_studio.mp4"
              className="w-full h-auto object-cover block"
              muted
              loop
              playsInline
              preload="metadata"
            />

            {/* Overlay controls */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 sm:p-6">
              <div className="flex items-center gap-3 w-full">
                <button
                  onClick={togglePlay}
                  className="p-2.5 rounded-xl bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/20 text-white transition-all"
                  aria-label={playing ? "Pause" : "Play"}
                >
                  {playing ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </button>
                <button
                  onClick={toggleMute}
                  className="p-2.5 rounded-xl bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/20 text-white transition-all"
                  aria-label={muted ? "Unmute" : "Mute"}
                >
                  {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>
                <div className="flex-1" />
                <button
                  onClick={openFullscreen}
                  className="p-2.5 rounded-xl bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/20 text-white transition-all"
                  aria-label="Fullscreen"
                >
                  <Maximize2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Center play button (shows when paused) */}
            {!playing && (
              <div
                className="absolute inset-0 flex items-center justify-center cursor-pointer"
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

            {/* Top badge */}
            <div className="absolute top-4 left-4">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/70 backdrop-blur-sm border border-white/10 text-white text-xs font-bold font-heading tracking-wider">
                <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                LIVE SYSTEM DEMO
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              className="p-6 rounded-2xl bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800 text-center stat-card-glow transition-all duration-300 glow-border"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.35 + idx * 0.08 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <div className={`text-4xl font-extrabold font-heading ${stat.color}`}>
                <AnimatedCounter to={stat.value} suffix={stat.suffix} duration={2} />
              </div>
              <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1 font-heading uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Features Pills */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-3"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {features.map((f, idx) => (
            <motion.div
              key={f.text}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-semibold font-heading ${f.color}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.55 + idx * 0.07 }}
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