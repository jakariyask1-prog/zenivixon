"use client";

import React, { useRef, useEffect, useState, useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Sparkles, Move } from "lucide-react";

const emptySubscribe = () => () => {};

interface SkillNode {
  id: string;
  name: string;
  tag: string;
  color: string;
  darkColor: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseX: number;
  baseY: number;
  width: number;
  height: number;
  connections: string[];
}

const INITIAL_SKILLS = [
  { id: "python", name: "Python", tag: "Core AI Engine", color: "#2563EB", darkColor: "#60A5FA", connections: ["fastapi", "langchain", "tensorflow", "docker"] },
  { id: "vector-db", name: "Vector DB", tag: "Semantic Retrieval", color: "#059669", darkColor: "#34D399", connections: ["rag", "langchain", "python"] },
  { id: "fastapi", name: "FastAPI", tag: "High-Speed Async API", color: "#0D9488", darkColor: "#2DD4BF", connections: ["python", "docker", "ollama"] },
  { id: "tensorflow", name: "TensorFlow", tag: "Neural Architectures", color: "#EA580C", darkColor: "#FB923C", connections: ["python", "ollama"] },
  { id: "ollama", name: "Ollama", tag: "Local LLM Inference", color: "#7C3AED", darkColor: "#A78BFA", connections: ["rag", "fastapi", "langchain"] },
  { id: "rag", name: "RAG", tag: "Context Augmentation", color: "#0284C7", darkColor: "#38BDF8", connections: ["vector-db", "langchain", "ollama"] },
  { id: "docker", name: "Docker", tag: "Containerization", color: "#0891B2", darkColor: "#22D3EE", connections: ["fastapi", "python"] },
  { id: "langchain", name: "Langchain", tag: "Agentic Orchestration", color: "#16A34A", darkColor: "#4ADE80", connections: ["python", "rag", "vector-db", "ollama"] },
];

export function EngineeringStackSection() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { resolvedTheme } = useTheme();
  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  const activeSkillRef = useRef<string | null>(null);

  useEffect(() => {
    activeSkillRef.current = activeSkill;
  }, [activeSkill]);

  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const isDark = mounted ? resolvedTheme === "dark" : false;

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    // Node state
    const nodes: SkillNode[] = INITIAL_SKILLS.map((s) => ({
      ...s,
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      baseX: 0,
      baseY: 0,
      width: 140,
      height: 38,
    }));

    // Mouse state
    const mouse = {
      x: -1000,
      y: -1000,
      isDown: false,
      draggedNode: null as SkillNode | null,
      hoveredNode: null as SkillNode | null,
    };

    // Calculate layout positions
    const setupLayout = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      const isMobile = width < 640;
      height = isMobile
        ? Math.max(400, Math.min(rect.width * 0.95, 480))
        : Math.max(460, Math.min(rect.width * 0.58, 560));

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);

      const centerX = width / 2;
      const centerY = height / 2;
      const rx = isMobile ? Math.min(width * 0.35, 150) : Math.min(width * 0.38, 360);
      const ry = isMobile ? Math.min(height * 0.34, 140) : Math.min(height * 0.36, 170);

      nodes.forEach((node, i) => {
        const angle = (i / nodes.length) * Math.PI * 2 - Math.PI / 2;
        // Inner and outer orbits for natural visual balance
        const currentRx = i % 2 === 0 ? rx : rx * (isMobile ? 0.72 : 0.65);
        const currentRy = i % 2 === 0 ? ry : ry * (isMobile ? 0.72 : 0.65);

        const bx = centerX + Math.cos(angle) * currentRx;
        const by = centerY + Math.sin(angle) * currentRy;

        node.baseX = bx;
        node.baseY = by;
        if (node.x === 0 && node.y === 0) {
          node.x = bx;
          node.y = by;
        }

        // Measure pill width dynamically based on text
        ctx.font = isMobile ? "bold 11px var(--font-heading, Manrope, sans-serif)" : "bold 12px var(--font-heading, Manrope, sans-serif)";
        const textMetrics = ctx.measureText(node.name);
        ctx.font = isMobile ? "8.5px var(--font-body, Inter, sans-serif)" : "9px var(--font-body, Inter, sans-serif)";
        const tagMetrics = ctx.measureText(node.tag);
        node.width = isMobile
          ? Math.max(115, Math.max(textMetrics.width, tagMetrics.width) + 38)
          : Math.max(130, Math.max(textMetrics.width, tagMetrics.width) + 48);
        node.height = isMobile ? 38 : 42;
      });
    };

    setupLayout();

    const handleResize = () => {
      setupLayout();
    };
    window.addEventListener("resize", handleResize);

    // Event handlers
    const getPos = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      if ("touches" in e) {
        if (e.touches.length > 0) {
          return {
            x: e.touches[0].clientX - rect.left,
            y: e.touches[0].clientY - rect.top,
          };
        }
      } else {
        return {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        };
      }
      return { x: -1000, y: -1000 };
    };

    const findNodeAt = (px: number, py: number): SkillNode | null => {
      for (let i = nodes.length - 1; i >= 0; i--) {
        const n = nodes[i];
        const halfW = n.width / 2;
        const halfH = n.height / 2;
        if (
          px >= n.x - halfW &&
          px <= n.x + halfW &&
          py >= n.y - halfH &&
          py <= n.y + halfH
        ) {
          return n;
        }
      }
      return null;
    };

    const onMouseDown = (e: MouseEvent) => {
      const pos = getPos(e);
      mouse.x = pos.x;
      mouse.y = pos.y;
      mouse.isDown = true;
      const hit = findNodeAt(pos.x, pos.y);
      if (hit) {
        mouse.draggedNode = hit;
        setActiveSkill(hit.name);
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      const pos = getPos(e);
      mouse.x = pos.x;
      mouse.y = pos.y;

      if (mouse.draggedNode) {
        mouse.draggedNode.x = Math.max(mouse.draggedNode.width / 2, Math.min(width - mouse.draggedNode.width / 2, pos.x));
        mouse.draggedNode.y = Math.max(mouse.draggedNode.height / 2, Math.min(height - mouse.draggedNode.height / 2, pos.y));
        mouse.draggedNode.vx = 0;
        mouse.draggedNode.vy = 0;
      } else {
        const hit = findNodeAt(pos.x, pos.y);
        mouse.hoveredNode = hit;
        canvas.style.cursor = hit ? "grab" : "default";
        if (hit) {
          setActiveSkill(hit.name);
        }
      }
    };

    const onMouseUp = () => {
      mouse.isDown = false;
      mouse.draggedNode = null;
      canvas.style.cursor = mouse.hoveredNode ? "grab" : "default";
    };

    const onMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
      mouse.isDown = false;
      mouse.draggedNode = null;
      mouse.hoveredNode = null;
      canvas.style.cursor = "default";
    };

    // Touch events for mobile
    const onTouchStart = (e: TouchEvent) => {
      const pos = getPos(e);
      mouse.x = pos.x;
      mouse.y = pos.y;
      mouse.isDown = true;
      const hit = findNodeAt(pos.x, pos.y);
      if (hit) {
        mouse.draggedNode = hit;
        setActiveSkill(hit.name);
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      const pos = getPos(e);
      mouse.x = pos.x;
      mouse.y = pos.y;
      if (mouse.draggedNode) {
        e.preventDefault();
        mouse.draggedNode.x = Math.max(mouse.draggedNode.width / 2, Math.min(width - mouse.draggedNode.width / 2, pos.x));
        mouse.draggedNode.y = Math.max(mouse.draggedNode.height / 2, Math.min(height - mouse.draggedNode.height / 2, pos.y));
      }
    };

    const onTouchEnd = () => {
      mouse.isDown = false;
      mouse.draggedNode = null;
    };

    canvas.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    canvas.addEventListener("mouseleave", onMouseLeave);
    canvas.addEventListener("touchstart", onTouchStart, { passive: false });
    canvas.addEventListener("touchmove", onTouchMove, { passive: false });
    canvas.addEventListener("touchend", onTouchEnd);

    // Animation Loop
    let time = 0;
    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      // Determine current theme colors
      const isNight = document.documentElement.classList.contains("dark");
      const lineColor = isNight ? "rgba(96, 165, 250, 0.16)" : "rgba(37, 99, 235, 0.12)";
      const lineActiveColor = isNight ? "rgba(56, 189, 248, 0.75)" : "rgba(37, 99, 235, 0.7)";

      const activeNode = activeSkillRef.current
        ? nodes.find((n) => n.name.toLowerCase() === activeSkillRef.current?.toLowerCase())
        : null;
      const effectiveHovered = mouse.hoveredNode || activeNode;

      // Draw subtle background radial glow from active node or center
      const focalX = effectiveHovered ? effectiveHovered.x : width / 2;
      const focalY = effectiveHovered ? effectiveHovered.y : height / 2;
      const bgGrad = ctx.createRadialGradient(focalX, focalY, 20, focalX, focalY, width * 0.6);
      if (isNight) {
        bgGrad.addColorStop(0, "rgba(37, 99, 235, 0.08)");
        bgGrad.addColorStop(0.5, "rgba(6, 182, 212, 0.03)");
        bgGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      } else {
        bgGrad.addColorStop(0, "rgba(37, 99, 235, 0.05)");
        bgGrad.addColorStop(0.5, "rgba(6, 182, 212, 0.02)");
        bgGrad.addColorStop(1, "rgba(255, 255, 255, 0)");
      }
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Physics update: spring to base + gentle oscillation + cursor interaction
      nodes.forEach((node, i) => {
        if (mouse.draggedNode !== node) {
          // Gentle floating oscillation
          const floatX = Math.cos(time + i * 0.8) * 8;
          const floatY = Math.sin(time + i * 0.8) * 8;
          const targetX = node.baseX + floatX;
          const targetY = node.baseY + floatY;

          // Spring force to target
          const k = 0.03;
          const damp = 0.82;
          const fx = (targetX - node.x) * k;
          const fy = (targetY - node.y) * k;

          node.vx = (node.vx + fx) * damp;
          node.vy = (node.vy + fy) * damp;

          // Cursor repulsion / proximity interaction
          const dx = node.x - mouse.x;
          const dy = node.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxRepelDist = 120;
          if (dist < maxRepelDist && dist > 1) {
            const force = ((maxRepelDist - dist) / maxRepelDist) * 3.5;
            node.vx += (dx / dist) * force;
            node.vy += (dy / dist) * force;
          }

          node.x += node.vx;
          node.y += node.vy;

          // Keep within container bounds
          const halfW = node.width / 2;
          const halfH = node.height / 2;
          node.x = Math.max(halfW + 10, Math.min(width - halfW - 10, node.x));
          node.y = Math.max(halfH + 10, Math.min(height - halfH - 10, node.y));
        }
      });

      // 1. Draw Connecting Lines
      nodes.forEach((node) => {
        node.connections.forEach((targetId) => {
          const target = nodes.find((n) => n.id === targetId);
          if (!target) return;

          const isConnectedToHovered =
            effectiveHovered &&
            (effectiveHovered.id === node.id || effectiveHovered.id === target.id);

          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(target.x, target.y);

          if (isConnectedToHovered) {
            ctx.strokeStyle = lineActiveColor;
            ctx.lineWidth = 2;
            ctx.setLineDash([4, 4]);
            ctx.lineDashOffset = -time * 15;
          } else {
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = 1;
            ctx.setLineDash([]);
          }
          ctx.stroke();
          ctx.setLineDash([]);
        });
      });

      // 2. Draw Pill-Shaped Nodes
      nodes.forEach((node) => {
        const isHovered = effectiveHovered?.id === node.id;
        const isConnected =
          effectiveHovered &&
          (effectiveHovered.id === node.id ||
            effectiveHovered.connections.includes(node.id) ||
            node.connections.includes(effectiveHovered.id));

        const halfW = node.width / 2;
        const halfH = node.height / 2;
        const px = node.x - halfW;
        const py = node.y - halfH;
        const accentColor = isNight ? node.darkColor : node.color;

        ctx.save();

        // Glow effect when hovered
        if (isHovered) {
          ctx.shadowColor = accentColor;
          ctx.shadowBlur = 18;
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 0;
        }

        // Draw Pill Container (roundRect)
        ctx.beginPath();
        ctx.roundRect(px, py, node.width, node.height, 21);

        // Pill background
        if (isNight) {
          ctx.fillStyle = isHovered
            ? "rgba(15, 23, 42, 0.95)"
            : isConnected
            ? "rgba(11, 17, 32, 0.90)"
            : "rgba(11, 17, 32, 0.75)";
        } else {
          ctx.fillStyle = isHovered
            ? "rgba(255, 255, 255, 0.98)"
            : isConnected
            ? "rgba(248, 250, 252, 0.95)"
            : "rgba(255, 255, 255, 0.85)";
        }
        ctx.fill();

        // Pill Border
        if (isHovered) {
          ctx.strokeStyle = accentColor;
          ctx.lineWidth = 2;
        } else if (isConnected) {
          ctx.strokeStyle = accentColor;
          ctx.lineWidth = 1.4;
        } else {
          ctx.strokeStyle = isNight ? "rgba(51, 65, 85, 0.8)" : "rgba(203, 213, 225, 0.8)";
          ctx.lineWidth = 1;
        }
        ctx.stroke();
        ctx.restore();

        // Glowing indicator dot
        const dotX = px + 16;
        const dotY = node.y;
        ctx.beginPath();
        ctx.arc(dotX, dotY, isHovered ? 4.5 : 3.5, 0, Math.PI * 2);
        ctx.fillStyle = accentColor;
        ctx.fill();

        // Node Title Text
        ctx.font = "bold 12px var(--font-heading, Manrope, sans-serif)";
        ctx.fillStyle = isNight ? (isHovered ? "#FFFFFF" : "#F1F5F9") : (isHovered ? "#0F172A" : "#1E293B");
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.fillText(node.name, dotX + 10, node.y - 6);

        // Node Subtitle / Tag Text
        ctx.font = "500 9.5px var(--font-body, Inter, sans-serif)";
        ctx.fillStyle = isNight ? (isHovered ? accentColor : "#94A3B8") : (isHovered ? accentColor : "#64748B");
        ctx.fillText(node.tag, dotX + 10, node.y + 8);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      canvas.removeEventListener("mouseleave", onMouseLeave);
      canvas.removeEventListener("touchstart", onTouchStart);
      canvas.removeEventListener("touchmove", onTouchMove);
      canvas.removeEventListener("touchend", onTouchEnd);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mounted, isDark]);

  return (
    <section
      data-aos="fade-up"
      className="py-20 md:py-32 bg-[#FCFDFE] dark:bg-[#020817] transition-colors duration-300 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-widest mb-4 font-heading shadow-sm">
            <Sparkles className="w-3.5 h-3.5 animate-pulse text-blue-600 dark:text-blue-400" />
            <span>CORE ARCHITECTURE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0F172A] dark:text-white tracking-tight font-heading leading-tight mb-4">
            Engineering Stack &amp; Ecosystem
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
            The modern, battle-tested technologies power our autonomous AI agents, deterministic workflows, and production integrations.
          </p>
        </div>

        {/* Adaptive Day & Night Mode Rounded Container */}
        <div
          ref={containerRef}
          className="relative rounded-3xl bg-slate-50/90 dark:bg-[#030712] border border-slate-200/90 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-2xl dark:shadow-blue-950/20 p-4 sm:p-8 backdrop-blur-xl overflow-hidden transition-all duration-300 group"
        >
          {/* Subtle Grid Pattern Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-30 dark:opacity-40 pointer-events-none" />

          {/* Top Bar Status / Interactive Instruction */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pb-4 mb-2 border-b border-slate-200/70 dark:border-slate-800/80 text-xs font-heading">
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                ACTIVE AI ENGINE TOPOLOGY
              </span>
            </div>

            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 bg-white/80 dark:bg-slate-900/60 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-800 shadow-sm text-[11px] font-medium">
              <Move className="w-3.5 h-3.5 text-blue-500 animate-pulse" />
              <span>Hover or drag nodes to inspect connections</span>
            </div>
          </div>

          {/* Canvas Interactive Graph */}
          <div className="relative w-full overflow-hidden flex items-center justify-center">
            <canvas
              ref={canvasRef}
              className="block w-full touch-none select-none rounded-2xl"
              style={{ minHeight: "440px" }}
            />
          </div>

          {/* Bottom Skills Summary Pill Bar */}
          <div className="relative z-10 mt-6 pt-4 border-t border-slate-200/70 dark:border-slate-800/80 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {INITIAL_SKILLS.map((skill) => {
              const isActive = activeSkill === skill.name;
              return (
                <button
                  key={skill.id}
                  onClick={() => setActiveSkill((prev) => (prev === skill.name ? null : skill.name))}
                  className={`px-3 py-1.5 rounded-full text-xs font-heading font-semibold transition-all duration-200 flex items-center gap-1.5 border ${
                    isActive
                      ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20 scale-105"
                      : "bg-white/80 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-600"
                  }`}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: isDark ? skill.darkColor : skill.color }}
                  />
                  <span>{skill.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
