"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Volume1,
  Maximize2,
  Sparkles,
  User,
  Clock,
  Radio,
  ArrowLeft,
} from "lucide-react";
import { AboutVideo } from "@/types/aboutVideo";
import { Badge } from "@/components/ui/Badge";

interface VideoModalProps {
  video: AboutVideo | null;
  isOpen: boolean;
  onClose: () => void;
}

export function VideoModal({ video, isOpen, onClose }: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(1); // Standard native volume (0 to 1)
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [showControls, setShowControls] = useState<boolean>(true);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Synchronize native volume and mute state directly with video element
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = isMuted ? 0 : volume;
      videoRef.current.muted = isMuted;
    }
  }, [volume, isMuted]);

  const togglePlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;

    if (v.paused) {
      v.play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    } else {
      v.pause();
      setIsPlaying(false);
    }
  }, []);

  const toggleMute = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    v.muted = newMuted;
  }, [isMuted]);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (newVol > 0 && isMuted) {
      setIsMuted(false);
      if (videoRef.current) videoRef.current.muted = false;
    }
  };

  // Close on Escape key or toggle on Space / M
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === " " && videoRef.current) {
        e.preventDefault();
        togglePlay();
      } else if (e.key.toLowerCase() === "m" && videoRef.current) {
        e.preventDefault();
        toggleMute();
      }
    },
    [onClose, togglePlay, toggleMute]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
      if (videoRef.current) {
        videoRef.current.pause();
      }
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [isOpen, handleKeyDown]);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
      videoRef.current.volume = isMuted ? 0 : volume;
      videoRef.current.muted = isMuted;
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetTime = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = targetTime;
      setCurrentTime(targetTime);
    }
  };

  const toggleFullscreen = () => {
    const container = containerRef.current;
    if (!container) return;
    if (!document.fullscreenElement) {
      container.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 2800);
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return "00:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <AnimatePresence>
      {isOpen && video && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 md:p-10"
          role="dialog"
          aria-modal="true"
          aria-label={`Playing ${video.title}`}
        >
          {/* Backdrop with frosted dark glass */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-slate-950/85 backdrop-blur-xl"
            onClick={onClose}
          />

          {/* Floating Exit Button in top-right corner of screen */}
          <button
            onClick={onClose}
            aria-label="Exit video"
            className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-slate-900/90 hover:bg-red-600 text-white border border-slate-700 hover:border-red-500 transition-all text-xs font-heading font-bold shadow-2xl backdrop-blur-md cursor-pointer hover:scale-105 active:scale-95"
          >
            <X className="w-4 h-4" />
            <span>Exit</span>
          </button>

          {/* Modal Content Box */}
          <motion.div
            ref={containerRef}
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onMouseMove={handleMouseMove}
            className="relative z-10 w-full max-w-5xl overflow-hidden rounded-2xl md:rounded-3xl bg-slate-950 border border-slate-800 shadow-2xl shadow-blue-950/50 flex flex-col"
          >
            {/* Modal Top Bar - Clean and outside of video */}
            <div className="flex items-center justify-between px-3 sm:px-6 py-3 border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md gap-3">
              <div className="flex items-center gap-2.5 overflow-hidden">
                <button
                  onClick={onClose}
                  aria-label="Back to about page"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-heading font-semibold border border-slate-700 hover:border-slate-600 transition-all cursor-pointer shadow-sm hover:scale-[1.02] active:scale-[0.98] shrink-0"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
                <Badge variant="blue" size="sm" className="font-semibold text-[11px] shrink-0">
                  {video.category}
                </Badge>
                {video.name && (
                  <div className="flex items-center gap-1.5 text-xs text-slate-300 font-heading truncate">
                    <User className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span className="font-semibold">{video.name}</span>
                    {video.role && <span className="text-slate-500 hidden sm:inline">&bull; {video.role}</span>}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={onClose}
                  aria-label="Close video"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/90 hover:bg-red-600/90 text-slate-300 hover:text-white border border-slate-700 hover:border-red-500 transition-all text-xs font-semibold cursor-pointer shadow-sm"
                >
                  <X className="w-4 h-4" />
                  <span className="hidden sm:inline">Close</span>
                </button>
              </div>
            </div>

            {/* Video Viewport - 100% UNCLUTTERED: NO TEXT ON TOP OF VIDEO */}
            <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden">
              {video.videoUrl ? (
                <>
                  <video
                    ref={videoRef}
                    src={video.videoUrl}
                    poster={video.thumbnail}
                    className="w-full h-full object-contain cursor-pointer"
                    playsInline
                    loop
                    onClick={togglePlay}
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata}
                  />

                  {/* Clean Center Play button on pause (No text) */}
                  {!isPlaying && (
                    <div
                      onClick={togglePlay}
                      className="absolute inset-0 flex items-center justify-center bg-slate-950/30 cursor-pointer backdrop-blur-[1px] transition-all"
                    >
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.92 }}
                        className="w-16 sm:w-20 h-16 sm:h-20 rounded-full bg-blue-600/90 text-white flex items-center justify-center shadow-xl shadow-blue-600/40 border border-blue-400/40"
                      >
                        <Play className="w-7 sm:w-8 h-7 sm:h-8 ml-1" fill="white" />
                      </motion.div>
                    </div>
                  )}

                  {/* Interactive Video Bottom Controls Bar with Sound Boost & Volume Options */}
                  <div
                    className={`absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950/95 via-slate-950/70 to-transparent p-3 sm:p-5 transition-opacity duration-300 z-20 ${
                      showControls ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                  >
                    {/* Scrub progress bar */}
                    <div className="space-y-1 mb-2.5">
                      <input
                        type="range"
                        min="0"
                        max={duration || 100}
                        step="0.1"
                        value={currentTime}
                        onChange={handleSeek}
                        aria-label="Video progress scrubber"
                        className="w-full h-1.5 bg-slate-700/80 accent-blue-500 rounded-lg appearance-none cursor-pointer transition-all"
                      />
                    </div>

                    <div className="flex items-center justify-between gap-3 text-white">
                      {/* Left: Play/Pause, Volume, Audio Boost, Time */}
                      <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                        {/* Play/Pause */}
                        <button
                          onClick={togglePlay}
                          aria-label={isPlaying ? "Pause video" : "Play video"}
                          className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                        >
                          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                        </button>

                        {/* Mute/Unmute */}
                        <button
                          onClick={toggleMute}
                          aria-label={isMuted ? "Unmute audio" : "Mute audio"}
                          className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                        >
                          {isMuted ? (
                            <VolumeX className="w-4 h-4 text-red-400" />
                          ) : volume > 0.5 ? (
                            <Volume2 className="w-4 h-4 text-white" />
                          ) : (
                            <Volume1 className="w-4 h-4 text-white" />
                          )}
                        </button>

                        {/* Volume Slider (0% - 100%) */}
                        <div className="hidden sm:flex items-center gap-1.5">
                          <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.05"
                            value={isMuted ? 0 : volume}
                            onChange={handleVolumeChange}
                            aria-label="Volume slider"
                            className="w-16 md:w-20 h-1.5 bg-slate-700 accent-blue-400 rounded-lg appearance-none cursor-pointer"
                          />
                          <span className="text-[10px] font-mono text-slate-400 w-7 text-right">
                            {isMuted ? "0%" : `${Math.round(volume * 100)}%`}
                          </span>
                        </div>


                        {/* Timestamp */}
                        <div className="text-xs font-mono text-slate-300 select-none pl-1">
                          {formatTime(currentTime)} / {formatTime(duration || 0)}
                        </div>
                      </div>

                      {/* Right: Fullscreen & Exit */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={toggleFullscreen}
                          aria-label="Toggle fullscreen"
                          className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                        >
                          <Maximize2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={onClose}
                          aria-label="Exit video"
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-red-600/80 hover:bg-red-600 text-white text-xs font-heading font-semibold transition-colors cursor-pointer shadow-sm"
                        >
                          <X className="w-3.5 h-3.5" />
                          <span>Exit</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                /* Clean Waiting-for-Video State when videoUrl is blank */
                <div className="relative w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950/40 overflow-hidden">
                  {video.thumbnail && (
                    <div className="absolute inset-0 opacity-20 filter blur-xl scale-110 pointer-events-none">
                      <Image
                        src={video.thumbnail}
                        alt=""
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="relative z-10 flex flex-col items-center max-w-lg">
                    <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/30 text-blue-400 flex items-center justify-center mb-4 shadow-lg shadow-blue-500/10">
                      <Radio className="w-8 h-8 animate-pulse text-blue-400" />
                    </div>
                    <Badge variant="cyan" size="sm" className="mb-3">
                      AUTHENTIC VIDEO &bull; STREAMING SOON
                    </Badge>
                    <h3 className="text-xl sm:text-2xl font-bold text-white font-heading mb-2">
                      {video.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 max-w-md mb-6 leading-relaxed">
                      An authentic, unscripted clip featuring {video.name || "the ZENIVIXON team"}. Real recordings of our engineering processes and client conversations will stream directly here.
                    </p>
                    <div className="flex items-center gap-2 text-xs text-blue-300 font-mono bg-blue-950/60 px-3.5 py-1.5 rounded-full border border-blue-800/60">
                      <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                      <span>{video.name || "ZENIVIXON"} &bull; Real Conversation</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Bottom Metadata info - Placed BELOW the video frame */}
            <div className="p-4 sm:p-6 bg-slate-900/90 border-t border-slate-800 text-left space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-lg sm:text-xl font-bold text-white font-heading">
                  {video.title}
                </h2>
                {video.duration && (
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{video.duration}</span>
                  </div>
                )}
              </div>

              {video.description && (
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
                  {video.description}
                </p>
              )}

              {video.tags && video.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {video.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-heading font-medium px-2.5 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Bottom Navigation Buttons */}
              <div className="pt-4 mt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={onClose}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-heading font-semibold border border-slate-700 transition-all cursor-pointer shadow-sm hover:scale-[1.02] active:scale-[0.98]"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to About Page</span>
                </button>

                <button
                  onClick={onClose}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-red-600/90 text-slate-300 hover:text-white border border-slate-700 hover:border-red-500 text-xs font-heading font-semibold transition-all cursor-pointer shadow-sm"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Exit Video</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
