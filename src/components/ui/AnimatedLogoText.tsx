"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WORD = "ZENIVIXON";
const LETTERS = WORD.split("");

export function AnimatedLogoText() {
  const [key, setKey] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setKey((prev) => prev + 1);
    }, 4500); // 4.5s loop
    return () => clearInterval(timer);
  }, []);

  const containerVariants: import("framer-motion").Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 } // one by one
    },
    exit: {
      opacity: 0,
      transition: { staggerChildren: 0.05, staggerDirection: -1 } // back to front
    }
  };

  const letterVariants: import("framer-motion").Variants = {
    hidden: { 
      opacity: 0, 
      x: -20, // comes from left
      y: 15,  // comes from slightly below
      rotateY: 90, // 3D spin
      rotateZ: -20, // tilted
      filter: "blur(5px)"
    },
    visible: { 
      opacity: 1, 
      x: 0, 
      y: 0,
      rotateY: 0,
      rotateZ: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 100,
      }
    },
    exit: {
      opacity: 0,
      y: -15,
      x: 20,
      rotateY: -90,
      filter: "blur(5px)",
      transition: { duration: 0.4 }
    }
  };

  return (
    <div className="relative flex items-center h-6 overflow-visible w-[140px]" style={{ perspective: "1000px" }}>
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
              className="inline-block font-extrabold text-lg tracking-widest text-[#0F172A] dark:text-white font-heading origin-center"
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
