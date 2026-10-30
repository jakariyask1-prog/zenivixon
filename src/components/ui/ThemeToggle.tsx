"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-full bg-slate-200/50 dark:bg-slate-800/50 animate-pulse" />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <div className="relative flex items-center justify-center">
      {/* 🌟 1. Ambient Eye-Catching Glowing Aura around the Toggle Button */}
      <div
        className={`absolute -inset-1 rounded-full blur-sm transition-all duration-700 animate-pulse pointer-events-none ${
          isDark
            ? "bg-gradient-to-r from-cyan-500/30 via-blue-500/25 to-indigo-500/30 opacity-70 group-hover:opacity-100"
            : "bg-gradient-to-r from-amber-400/35 via-orange-400/30 to-yellow-400/35 opacity-70 group-hover:opacity-100"
        }`}
      />

      {/* 🌟 2. Interactive Animated Toggle Button */}
      <button
        type="button"
        onClick={() => setTheme(isDark ? "light" : "dark")}
        className={`relative group flex items-center justify-center w-9 h-9 rounded-full border transition-all duration-300 active:scale-90 hover:scale-105 cursor-pointer overflow-hidden shadow-sm backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-offset-1 ${
          isDark
            ? "bg-slate-900/90 border-cyan-500/40 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.25)] hover:border-cyan-400 hover:shadow-[0_0_18px_rgba(6,182,212,0.45)] focus:ring-cyan-400 focus:ring-offset-slate-950"
            : "bg-white/95 border-amber-400/50 text-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.25)] hover:border-amber-500 hover:shadow-[0_0_18px_rgba(245,158,11,0.45)] focus:ring-amber-400 focus:ring-offset-white"
        }`}
        aria-label={isDark ? "Switch to Day Mode (Light)" : "Switch to Night Mode (Dark)"}
        title={isDark ? "☀️ Switch to Day Mode" : "🌙 Switch to Night Mode"}
      >
        {/* Subtle hover shine sweep */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-12 pointer-events-none" />

        {/* 🌞 Sun Container (Day Mode) */}
        <div
          className={`absolute flex items-center justify-center transition-all duration-500 transform ${
            isDark
              ? "rotate-90 scale-0 opacity-0"
              : "rotate-0 scale-100 opacity-100"
          }`}
        >
          {/* Rotating Sun Rays with warm glow */}
          <Sun className="w-[18px] h-[18px] text-amber-500 animate-[spin_10s_linear_infinite]" />
        </div>

        {/* 🌙 Moon Container (Night Mode) */}
        <div
          className={`absolute flex items-center justify-center transition-all duration-500 transform ${
            isDark
              ? "rotate-0 scale-100 opacity-100"
              : "-rotate-90 scale-0 opacity-0"
          }`}
        >
          <Moon className="w-[18px] h-[18px] text-cyan-300 animate-[pulse_3s_ease-in-out_infinite] -rotate-12 group-hover:rotate-0 transition-transform duration-300" />
          {/* Ambient micro-star twinkling */}
          <span className="absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full bg-cyan-300 animate-ping opacity-75" />
        </div>

        {/* Live Active Mode Indicator Micro Dot */}
        <span
          className={`absolute bottom-0.5 right-0.5 w-1.5 h-1.5 rounded-full transition-colors duration-500 ${
            isDark
              ? "bg-cyan-400 shadow-[0_0_6px_#22d3ee]"
              : "bg-amber-400 shadow-[0_0_6px_#fbbf24]"
          }`}
        />
      </button>
    </div>
  );
}
