"use client";
// @ts-ignore
import Lottie from "lottie-react";
import { useEffect, useState } from "react";

interface LottiePlayerProps {
  src: string;
  className?: string;
  loop?: boolean;
  autoplay?: boolean;
}

export function LottiePlayer({ src, className = "", loop = true, autoplay = true }: LottiePlayerProps) {
  const [animationData, setAnimationData] = useState<object | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    fetch(src)
      .then((r) => r.json())
      .then(setAnimationData)
      .catch(() => setError(true));
  }, [src]);

  if (error || !animationData) return null;

  return <Lottie animationData={animationData} loop={loop} autoplay={autoplay} className={className} />;
}