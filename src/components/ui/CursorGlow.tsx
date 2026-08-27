"use client";
import { useEffect, useRef } from "react";

export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const glow = glowRef.current;
    if (!glow) return;
    let animId: number;
    let mouseX = -1000, mouseY = -1000, currentX = -1000, currentY = -1000;
    const handleMouseMove = (e: MouseEvent) => { mouseX = e.clientX; mouseY = e.clientY; };
    const animate = () => {
      currentX += (mouseX - currentX) * 0.08;
      currentY += (mouseY - currentY) * 0.08;
      if (glow) glow.style.transform = `translate(${currentX - 200}px, ${currentY - 200}px)`;
      animId = requestAnimationFrame(animate);
    };
    window.addEventListener("mousemove", handleMouseMove);
    animate();
    return () => { window.removeEventListener("mousemove", handleMouseMove); cancelAnimationFrame(animId); };
  }, []);

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed top-0 left-0 z-[9] w-[400px] h-[400px] rounded-full opacity-[0.06] dark:opacity-[0.12]"
      style={{ background: "radial-gradient(circle, rgba(37,99,235,1) 0%, rgba(6,182,212,0.4) 40%, transparent 70%)", willChange: "transform" }}
      aria-hidden="true"
    />
  );
}