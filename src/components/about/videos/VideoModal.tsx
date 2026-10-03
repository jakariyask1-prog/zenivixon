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
  Zap,
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
  const [volume, setVolume] = useState<number>(1); // 0 to 1
  const [boostLevel, setBoostLevel] = useState<number>(2.0); // 2.0x boost default for crystal clear loud speech!
  const [showBoostMenu, setShowBoostMenu] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [showControls, setShowControls] = useState<boolean>(true);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Web Audio API refs for sound amplification / audio boost
  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const isAudioGraphReadyRef = useRef<boolean>(false);

  // Initialize Web Audio API Gain Node on user interaction to boost volume beyond 100%
  const setupAudioGraph = useCallback(() => {
    if (!videoRef.current || isAudioGraphReadyRef.current) {
      if (audioContextRef.current && audioContextRef.current.state === "suspended") {
        audioContextRef.current.resume().catch(() => {});
      }
      return;
    }

    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;

      const ctx = new AudioCtx();
      const source = ctx.createMediaElementSource(videoRef.current);
      const gainNode = ctx.createGain();

      const initialGain = isMuted ? 0 : volume * boostLevel;
      gainNode.gain.setValueAtTime(initialGain, ctx.currentTime);

      source.connect(gainNode);
      gainNode.connect(ctx.destination);

      audioContextRef.current = ctx;
      gainNodeRef.current = gainNode;
      isAudioGraphReadyRef.current = true;
    } catch {
      // Fallback to native volume if Web Audio API is restricted
    }
  }, [isMuted, volume, boostLevel]);

  // Synchronize gain node whenever volume, mute, or boost level changes
  useEffect(() => {
    if (audioContextRef.current && audioContextRef.current.state === "suspended") {
      audioContextRef.current.resume().catch(() => {});
    }

    if (gainNodeRef.current && audioContextRef.current) {
      const targetGain = isMuted ? 0 : volume * boostLevel;
      gainNodeRef.current.gain.setTargetAtTime(
        targetGain,
        audioContextRef.current.currentTime,
        0.05
      );
    } else if (videoRef.current) {
      videoRef.current.volume = isMuted ? 0 : Math.min(volume, 1);
    }
  }, [volume, boostLevel, isMuted]);

  const togglePlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    setupAudioGraph();

    if (v.paused) {
      v.play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    } else {
      v.pause();
      setIsPlaying(false);
    }
  }, [setupAudioGraph]);

  const toggleMute = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    setupAudioGraph();
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    v.muted = newMuted;
  }, [isMuted, setupAudioGraph]);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setupAudioGraph();
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (newVol > 0 && isMuted) {
      setIsMuted(false);
      if (videoRef.current) videoRef.current.muted = false;
    }
  };

  const handleSetBoost = (level: number) => {
    setupAudioGraph();
    setBoostLevel(level);
    setShowBoostMenu(false);
  };

  const cycleBoostLevel = () => {
    setupAudioGraph();
    const levels = [1.0, 1.5, 2.0, 2.5, 3.0];
    const currentIndex = levels.indexOf(boostLevel);
    const nextIndex = (currentIndex + 1) % levels.length;
    setBoostLevel(levels[nextIndex]);
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
      if (audioContextRef.current && audioContextRef.current.state === "running") {
        audioContextRef.current.suspend().catch(() => {});
      }
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
      if (videoRef.current) {
        videoRef.current.pause();
      }
      if (audioContextRef.current && audioContextRef.current.state === "running") {
        audioContextRef.current.suspend().catch(() => {});
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
      setupAudioGraph();
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
      if (isPlaying && !showBoostMenu) {
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
            <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md">
              <div className="flex items-center gap-2.5 overflow-hidden">
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

              <div className="flex items-center gap-2">
                <button
                  onClick={onClose}
                  aria-label="Close modal"
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 cursor-pointer"
                >
                  <X className="w-5 h-5" />
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

                        {/* Sound Boost Option Button & Selector */}
                        <div
                          className="relative"
                          onMouseLeave={() => setShowBoostMenu(false)}
                        >
                          <div className="flex items-center gap-1">
                            <button
                              onClick={cycleBoostLevel}
                              onContextMenu={(e) => {
                                e.preventDefault();
                                setShowBoostMenu(!showBoostMenu);
                              }}
                              title="Click to cycle sound boost (2x Loud, 3x Max Boost, 1x Normal)"
                              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-heading font-semibold transition-all cursor-pointer ${
                                boostLevel > 1
                                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/50 hover:bg-amber-500/30 shadow-sm shadow-amber-500/10"
                                  : "bg-white/10 text-slate-300 border border-white/10 hover:bg-white/20"
                              }`}
                            >
                              <Zap className={`w-3.5 h-3.5 ${boostLevel > 1 ? "text-amber-400 animate-pulse" : "text-slate-400"}`} />
                              <span>Sound Boost: {Math.round(boostLevel * 100)}%</span>
                            </button>

                            <button
                              onClick={() => setShowBoostMenu(!showBoostMenu)}
                              aria-label="Open sound boost options"
                              className="px-1.5 py-1 text-slate-400 hover:text-white rounded bg-white/5 hover:bg-white/15 text-[10px] font-mono"
                            >
                              ▼
                            </button>
                          </div>

                          {/* Sound Boost Options Dropdown Menu */}
                          {showBoostMenu && (
                            <div className="absolute bottom-full left-0 mb-2 p-2 rounded-xl bg-slate-900 border border-slate-700 shadow-xl space-y-1 z-30 min-w-[170px]">
                              <div className="text-[10px] uppercase font-bold text-slate-400 px-2 py-1 border-b border-slate-800">
                                Audio Amplification
                              </div>
                              {[
                                { level: 1.0, label: "100% (Standard)" },
                                { level: 1.5, label: "150% (Enhanced)" },
                                { level: 2.0, label: "200% (2x Loud Boost)" },
                                { level: 2.5, label: "250% (Extra Loud)" },
                                { level: 3.0, label: "300% (Max Boost)" },
                              ].map((opt) => (
                                <button
                                  key={opt.level}
                                  onClick={() => handleSetBoost(opt.level)}
                                  className={`w-full text-left px-2.5 py-1 rounded-md text-xs font-heading flex items-center justify-between transition-colors ${
                                    boostLevel === opt.level
                                      ? "bg-blue-600 text-white font-bold"
                                      : "text-slate-300 hover:bg-slate-800"
                                  }`}
                                >
                                  <span>{opt.label}</span>
                                  {boostLevel === opt.level && <span>✓</span>}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Timestamp */}
                        <div className="text-xs font-mono text-slate-300 select-none pl-1">
                          {formatTime(currentTime)} / {formatTime(duration || 0)}
                        </div>
                      </div>

                      {/* Right: Fullscreen */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={toggleFullscreen}
                          aria-label="Toggle fullscreen"
                          className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                        >
                          <Maximize2 className="w-4 h-4" />
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
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
