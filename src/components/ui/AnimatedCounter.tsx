"use client";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface AnimatedCounterProps {
  from?: number;
  to: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export function AnimatedCounter({ from = 0, to, duration = 2, suffix = "", prefix = "", className = "" }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [value, setValue] = useState(from);
  const startedRef = useRef(false);

  useEffect(() => {
    // Fallback: If not triggered within a reasonable time after mount, just set the value.
    const fallbackTimer = setTimeout(() => {
      if (!startedRef.current) {
        setValue(to);
        startedRef.current = true;
      }
    }, Math.max(3000, duration * 1000 + 1000));

    if (!isInView || startedRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setValue(to); startedRef.current = true; return; }
    startedRef.current = true;
    
    const startTime = performance.now();
    const range = to - from;
    const tick = (now: number) => {
      const elapsed = (now - startTime) / (duration * 1000);
      const progress = Math.min(elapsed, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(from + range * eased));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);

    return () => clearTimeout(fallbackTimer);
  }, [isInView, from, to, duration]);

  return <span ref={ref} className={className}>{prefix}{value}{suffix}</span>;
}