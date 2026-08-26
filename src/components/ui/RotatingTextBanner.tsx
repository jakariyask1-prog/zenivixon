"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

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
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % STATEMENTS.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center w-full">
      <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 sm:px-5 sm:py-2.5 rounded-full bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-md shadow-sm transition-all duration-300">
        
        {/* Pulsing Dot + Label */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600 dark:bg-blue-500"></span>
          </span>
          <span className="text-[10px] sm:text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider font-heading">
            Live
          </span>
        </div>

        {/* Divider */}
        <div className="w-[1px] h-3.5 bg-slate-300 dark:bg-slate-700 shrink-0"></div>

        {/* Rotating Text Container */}
        <div className="relative flex items-center overflow-hidden">
          {/* Invisible text to define max width and prevent layout shifts */}
          <span className="text-[13px] sm:text-[15px] font-semibold invisible whitespace-nowrap font-heading px-1 pointer-events-none">
            Smarter Technology. Faster Growth.
          </span>
          
          <AnimatePresence>
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -25 }}
              transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
              className="absolute inset-0 flex items-center px-1"
            >
              <span className="text-[13px] sm:text-[15px] font-semibold text-blue-700 dark:text-blue-400 whitespace-nowrap font-heading">
                {STATEMENTS[index]}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
