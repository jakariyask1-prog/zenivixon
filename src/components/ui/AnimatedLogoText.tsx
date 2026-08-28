"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const WORD = "ZENIVIXON";
const LETTERS = WORD.split("");

export function AnimatedLogoText() {
  const [key, setKey] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;
    const timer = setInterval(() => {
      setKey((prev) => prev + 1);
    }, 5500); // 5.5s loop (spells out, pauses, exits, restarts)
    return () => clearInterval(timer);
  }, [shouldReduceMotion]);

  if (shouldReduceMotion) {
    return (
      <span className="font-extrabold text-lg tracking-widest text-[#0F172A] dark:text-white font-heading">
        {WORD}
      </span>
    );
  }

  const containerVariants: import("framer-motion").Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15 }
    },
    exit: {
      transition: { staggerChildren: 0.08, staggerDirection: 1 }
    }
  };

  const letterVariants: import("framer-motion").Variants = {
    hidden: { 
      opacity: 0, 
      x: -25, 
      y: 15, 
      rotate: -60,
      filter: "blur(6px)"
    },
    visible: { 
      opacity: 1, 
      x: 0, 
      y: 0,
      rotate: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 120,
      }
    },
    exit: {
      opacity: 0,
      x: 20,
      filter: "blur(4px)",
      transition: { duration: 0.4 }
    }
  };

  return (
    <div className="relative flex items-center h-6 overflow-visible w-[140px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={key}
          className="flex"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={containerVariants}
        >
          {LETTERS.map((char, i) => (
            <motion.span
              key={i}
              className="inline-block font-extrabold text-lg tracking-widest text-[#0F172A] dark:text-white font-heading"
              variants={letterVariants}
            >
              {char}
            </motion.span>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
