"use client";

import React from "react";

const STATEMENTS = [
  "AI Agents That Work 24/7",
  "Intelligent Workflow Automation",
  "Custom AI Solutions",
  "Modern Web Applications",
  "Seamless Business Integrations",
  "AI-Powered Software & SaaS",
  "Smarter Technology. Faster Growth.",
];

export function RotatingTextBanner() {
  return (
    <div className="w-full overflow-hidden relative flex items-center py-2.5 sm:py-3.5 bg-blue-50/40 dark:bg-blue-950/20 border-y border-blue-100/50 dark:border-blue-900/30 backdrop-blur-md">
      {/* Gradient Masks for fading edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#FCFDFE] dark:from-[#020817] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#FCFDFE] dark:from-[#020817] to-transparent z-10 pointer-events-none" />

      {/* Scrolling Container */}
      <div className="flex whitespace-nowrap items-center w-max animate-marquee hover:[animation-play-state:paused] will-change-transform [backface-visibility:hidden]">
        {/* We duplicate the array to create a seamless infinite loop */}
        {[...STATEMENTS, ...STATEMENTS].map((text, idx) => (
          <div key={idx} className="flex items-center">
            <span className="text-[12px] sm:text-[14px] font-semibold text-blue-700/80 dark:text-blue-400/80 uppercase tracking-widest font-heading px-6 sm:px-10">
              {text}
            </span>
            {/* Elegant Separator */}
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500/40 dark:bg-blue-400/40 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
          </div>
        ))}
      </div>
    </div>
  );
}
