"use client";

import React from "react";
import { motion } from "framer-motion";
import { Bot, Database, Sparkles, Cpu, Cloud, Layers, Blocks } from "lucide-react";

const FloatingElement = ({
  children,
  delay = 0,
  duration = 5,
  yOffset = 20,
  xOffset = 10,
  className = "",
  initialX = 0,
  initialY = 0,
}: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
  xOffset?: number;
  className?: string;
  initialX?: number | string;
  initialY?: number | string;
}) => {
  return (
    <motion.div
      className={`absolute ${className}`}
      initial={{ x: initialX, y: initialY, opacity: 0, scale: 0.8 }}
      animate={{
        y: [initialY as number, (initialY as number) - yOffset, initialY as number],
        x: [initialX as number, (initialX as number) + xOffset, initialX as number],
        opacity: [0.7, 1, 0.7],
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
        delay: delay,
      }}
    >
      {children}
    </motion.div>
  );
};

export function LiveFloatingElements() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {/* 3D Glassmorphism Icons Floating Around */}
      
      {/* Top Left Area */}
      <FloatingElement initialX="15vw" initialY="15vh" delay={0} duration={6} className="hidden md:block">
        <div className="p-3.5 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md rounded-2xl border border-white/60 dark:border-white/10 shadow-xl shadow-blue-500/10 text-blue-600 dark:text-blue-400">
          <Bot className="w-6 h-6" />
        </div>
      </FloatingElement>

      <FloatingElement initialX="8vw" initialY="45vh" delay={1.2} duration={7} yOffset={30} xOffset={-20} className="hidden lg:block">
        <div className="p-3 bg-white/30 dark:bg-slate-900/30 backdrop-blur-md rounded-2xl border border-white/40 dark:border-white/5 shadow-lg shadow-cyan-500/5 text-cyan-600 dark:text-cyan-400 opacity-60">
          <Blocks className="w-5 h-5" />
        </div>
      </FloatingElement>

      {/* Top Right Area */}
      <FloatingElement initialX="80vw" initialY="20vh" delay={0.5} duration={7} yOffset={25} className="hidden md:block">
        <div className="p-3 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md rounded-2xl border border-white/60 dark:border-white/10 shadow-xl shadow-indigo-500/10 text-indigo-600 dark:text-indigo-400">
          <Cpu className="w-6 h-6" />
        </div>
      </FloatingElement>

      {/* Bottom Left Area */}
      <FloatingElement initialX="20vw" initialY="75vh" delay={1} duration={6.5} yOffset={-20}>
        <div className="p-4 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md rounded-2xl border border-white/60 dark:border-white/10 shadow-xl shadow-emerald-500/10 text-emerald-600 dark:text-emerald-400">
          <Database className="w-7 h-7" />
        </div>
      </FloatingElement>

      {/* Bottom Right Area */}
      <FloatingElement initialX="75vw" initialY="65vh" delay={1.5} duration={5.5} yOffset={-15} className="hidden md:block">
        <div className="p-3.5 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md rounded-2xl border border-white/60 dark:border-white/10 shadow-xl shadow-purple-500/10 text-purple-600 dark:text-purple-400">
          <Cloud className="w-6 h-6" />
        </div>
      </FloatingElement>

      <FloatingElement initialX="88vw" initialY="40vh" delay={2} duration={8} yOffset={35} xOffset={15} className="hidden lg:block">
         <div className="p-3 bg-white/30 dark:bg-slate-900/30 backdrop-blur-md rounded-2xl border border-white/40 dark:border-white/5 shadow-lg shadow-pink-500/5 text-pink-600 dark:text-pink-400 opacity-50">
          <Layers className="w-5 h-5" />
        </div>
      </FloatingElement>

      {/* Center Left / Right Subtle Sparks */}
      <FloatingElement initialX="35vw" initialY="30vh" delay={0.8} duration={4} yOffset={10}>
        <div className="text-yellow-500/50 dark:text-yellow-400/50">
          <Sparkles className="w-4 h-4" />
        </div>
      </FloatingElement>

      <FloatingElement initialX="65vw" initialY="50vh" delay={2.5} duration={5} yOffset={15}>
        <div className="text-blue-500/50 dark:text-blue-400/50">
          <Sparkles className="w-5 h-5" />
        </div>
      </FloatingElement>
    </div>
  );
}
