"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const LOGO_TEXTS = ["ZENIVIXON", "ZENIVIXON", "ZENIVIXON"];

export function AnimatedLogoText() {
  const [index, setIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % LOGO_TEXTS.length);
    }, 2500);
    return () => clearInterval(timer);
  }, [shouldReduceMotion]);

  if (shouldReduceMotion) {
    return (
      <span className="font-extrabold text-lg tracking-widest text-[#0F172A] dark:text-white font-heading">
        ZENIVIXON
      </span>
    );
  }

  return (
    <div className="relative h-6 w-[120px] flex items-center overflow-hidden" style={{ perspective: "1000px" }}>
      <AnimatePresence mode="popLayout">
        <motion.span
          key={index}
          initial={{ y: 25, opacity: 0, rotateX: -90 }}
          animate={{ y: 0, opacity: 1, rotateX: 0 }}
          exit={{ y: -25, opacity: 0, rotateX: 90 }}
          transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
          className="block font-extrabold text-lg tracking-widest text-[#0F172A] dark:text-white font-heading origin-center"
        >
          {LOGO_TEXTS[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
