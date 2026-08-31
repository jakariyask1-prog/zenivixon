"use client";

import React from "react";
import { motion } from "framer-motion";

export function FluidAuroraBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-white dark:bg-[#020817] z-[-1]" />
      
      {/* 
        We use framer-motion to create a slow, fluid, Apple-like animated mesh gradient.
        Multiple glowing blurred orbs moving seamlessly around the screen.
      */}
      
      <motion.div
        animate={{
          x: ["0%", "15%", "-10%", "0%"],
          y: ["0%", "-15%", "10%", "0%"],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full blur-[100px] sm:blur-[140px] opacity-60 bg-blue-400/30 dark:bg-blue-600/30 mix-blend-multiply dark:mix-blend-screen"
      />
      
      <motion.div
        animate={{
          x: ["0%", "-20%", "15%", "0%"],
          y: ["0%", "20%", "-10%", "0%"],
          scale: [1, 1.1, 1.3, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-[20%] -right-[10%] w-[40%] h-[60%] rounded-full blur-[100px] sm:blur-[140px] opacity-60 bg-cyan-300/40 dark:bg-cyan-600/20 mix-blend-multiply dark:mix-blend-screen"
      />
      
      <motion.div
        animate={{
          x: ["0%", "25%", "-15%", "0%"],
          y: ["0%", "-25%", "15%", "0%"],
          scale: [1, 1.3, 0.8, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute -bottom-[20%] left-[20%] w-[60%] h-[50%] rounded-full blur-[100px] sm:blur-[140px] opacity-50 bg-indigo-400/30 dark:bg-indigo-600/30 mix-blend-multiply dark:mix-blend-screen"
      />

      <motion.div
        animate={{
          x: ["0%", "-15%", "10%", "0%"],
          y: ["0%", "15%", "-10%", "0%"],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="absolute top-[40%] left-[10%] w-[35%] h-[35%] rounded-full blur-[90px] sm:blur-[120px] opacity-40 bg-purple-300/40 dark:bg-purple-600/20 mix-blend-multiply dark:mix-blend-screen"
      />
    </div>
  );
}
