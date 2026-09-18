"use client";

import React, { useRef, useEffect, useState, useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Sparkles, Move } from "lucide-react";

const emptySubscribe = () => () => {};

export interface SkillCategory {
  id: string;
  name: string;
  iconName: string;
  color: string;
  darkColor: string;
}

export const CATEGORIES: SkillCategory[] = [
  { id: "all", name: "All Ecosystem (27)", iconName: "Layers", color: "#2563EB", darkColor: "#60A5FA" },
  { id: "agents", name: "1. Agents & Orchestration", iconName: "Cpu", color: "#4F46E5", darkColor: "#818CF8" },
  { id: "vectordb", name: "2. Vector DB & RAG", iconName: "Database", color: "#059669", darkColor: "#34D399" },
  { id: "guardrails", name: "3. Guardrails & Validation", iconName: "ShieldCheck", color: "#D97706", darkColor: "#FBBF24" },
  { id: "automation", name: "4. Automation & Streaming", iconName: "Workflow", color: "#E11D48", darkColor: "#FB7185" },
  { id: "inference", name: "5. Local LLMs & Inference", iconName: "Server", color: "#7C3AED", darkColor: "#A78BFA" },
  { id: "cloud", name: "6. Databases & Cloud", iconName: "Database", color: "#0284C7", darkColor: "#38BDF8" },
  { id: "tracing", name: "7. AI Monitoring & Tracing", iconName: "Activity", color: "#0D9488", darkColor: "#2DD4BF" },
];

interface SkillNode {
  id: string;
  name: string;
  category: string;
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

const ALL_SKILLS = [
  // 1. AI Agents & Orchestration
  { id: "langgraph", name: "LangGraph", category: "agents", tag: "Cyclic Multi-Agent", color: "#4F46E5", darkColor: "#818CF8", connections: ["langchain", "crewai", "python"] },
  { id: "langchain", name: "LangChain", category: "agents", tag: "Agent Tooling", color: "#3B82F6", darkColor: "#60A5FA", connections: ["langgraph", "llamaindex", "rag", "qdrant"] },
  { id: "crewai", name: "CrewAI", category: "agents", tag: "Role-Playing Teams", color: "#6366F1", darkColor: "#A5B4FC", connections: ["langgraph", "ollama", "python"] },
  { id: "llamaindex", name: "LlamaIndex", category: "agents", tag: "Data Indexing", color: "#4338CA", darkColor: "#818CF8", connections: ["langchain", "rag", "pgvector"] },

  // 2. Vector DB & RAG
  { id: "qdrant", name: "Qdrant", category: "vectordb", tag: "Fast Vector Engine", color: "#059669", darkColor: "#34D399", connections: ["rag", "langchain", "python"] },
  { id: "pinecone", name: "Pinecone", category: "vectordb", tag: "Serverless Vector", color: "#10B981", darkColor: "#6EE7B7", connections: ["rag", "llamaindex"] },
  { id: "pgvector", name: "pgvector", category: "vectordb", tag: "PostgreSQL Vector", color: "#047857", darkColor: "#34D399", connections: ["postgres", "rag"] },
  { id: "chromadb", name: "ChromaDB", category: "vectordb", tag: "Embedded Store", color: "#059669", darkColor: "#10B981", connections: ["rag", "ollama"] },
  { id: "rag", name: "RAG", category: "vectordb", tag: "Context Retrieval", color: "#0284C7", darkColor: "#38BDF8", connections: ["qdrant", "pinecone", "pgvector", "langchain"] },

  // 3. Guardrails & Validation (Structured Output)
  { id: "pydantic", name: "Pydantic", category: "guardrails", tag: "Strict Data Schemas", color: "#D97706", darkColor: "#FBBF24", connections: ["fastapi", "instructor", "python"] },
  { id: "zod", name: "Zod", category: "guardrails", tag: "TS Schema Guard", color: "#B45309", darkColor: "#FCD34D", connections: ["pydantic", "fastapi"] },
  { id: "instructor", name: "Instructor", category: "guardrails", tag: "Structured Outputs", color: "#EA580C", darkColor: "#FB923C", connections: ["pydantic", "langgraph", "ollama"] },

  // 4. Automation & Streaming
  { id: "n8n", name: "n8n", category: "automation", tag: "Workflow Engine", color: "#E11D48", darkColor: "#FB7185", connections: ["fastapi", "docker", "redis"] },
  { id: "fastapi", name: "FastAPI", category: "automation", tag: "Async REST API", color: "#0D9488", darkColor: "#2DD4BF", connections: ["python", "pydantic", "n8n", "docker"] },
  { id: "websockets", name: "WebSockets / SSE", category: "automation", tag: "Real-Time Streaming", color: "#BE123C", darkColor: "#F43F5E", connections: ["fastapi", "redis"] },
  { id: "redis", name: "Redis / Upstash", category: "automation", tag: "Message Queues", color: "#DC2626", darkColor: "#F87171", connections: ["fastapi", "websockets", "n8n"] },

  // 5. Local LLMs & Inference
  { id: "ollama", name: "Ollama", category: "inference", tag: "Local Model Host", color: "#7C3AED", darkColor: "#A78BFA", connections: ["vllm", "langchain", "fastapi", "crewai"] },
  { id: "vllm", name: "vLLM", category: "inference", tag: "High-Throughput GPU", color: "#9333EA", darkColor: "#C084FC", connections: ["ollama", "huggingface", "docker"] },
  { id: "huggingface", name: "Hugging Face", category: "inference", tag: "Transformers Hub", color: "#6D28D9", darkColor: "#A78BFA", connections: ["vllm", "tensorflow", "python"] },
  { id: "tensorflow", name: "TensorFlow", category: "inference", tag: "Neural Networks", color: "#7E22CE", darkColor: "#C084FC", connections: ["python", "huggingface"] },

  // 6. Databases & Cloud
  { id: "python", name: "Python", category: "cloud", tag: "Core AI Language", color: "#2563EB", darkColor: "#60A5FA", connections: ["fastapi", "langgraph", "docker", "qdrant"] },
  { id: "postgres", name: "PostgreSQL / Supabase", category: "cloud", tag: "Relational & Auth", color: "#0284C7", darkColor: "#38BDF8", connections: ["pgvector", "python", "docker"] },
  { id: "docker", name: "Docker & Compose", category: "cloud", tag: "Containerization", color: "#0891B2", darkColor: "#22D3EE", connections: ["fastapi", "postgres", "github-actions"] },
  { id: "github-actions", name: "GitHub Actions", category: "cloud", tag: "CI/CD Deployment", color: "#0369A1", darkColor: "#38BDF8", connections: ["docker", "python"] },

  // 7. AI Monitoring & Tracing
  { id: "langfuse", name: "Langfuse", category: "tracing", tag: "LLM Observability", color: "#0D9488", darkColor: "#2DD4BF", connections: ["langgraph", "rag", "langsmith"] },
  { id: "langsmith", name: "LangSmith", category: "tracing", tag: "Agent Telemetry", color: "#0F766E", darkColor: "#5EEAD4", connections: ["langchain", "langfuse"] },
  { id: "ragas", name: "Ragas", category: "tracing", tag: "RAG Evaluation", color: "#14B8A6", darkColor: "#2DD4BF", connections: ["rag", "langfuse"] },
];

export function EngineeringStackSection() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { resolvedTheme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeSkill, setActiveSkill] = useState<string | null>(null);

  const activeSkillRef = useRef<string | null>(null);
  const selectedCategoryRef = useRef<string>("all");

  useEffect(() => {
    activeSkillRef.current = activeSkill;
  }, [activeSkill]);

  useEffect(() => {
    selectedCategoryRef.current = selectedCategory;
  }, [selectedCategory]);

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
    const nodes: SkillNode[] = ALL_SKILLS.map((s) => ({
      ...s,
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      baseX: 0,
      baseY: 0,
      width: 120,
      height: 36,
    }));

    // Mouse state
    const mouse = {
      x: -1000,
      y: -1000,
      isDown: false,
      draggedNode: null as SkillNode | null,
      hoveredNode: null as SkillNode | null,
    };

    // Calculate cluster centers and layout positions
    const setupLayout = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      const isMobile = width < 768;
      height = isMobile
        ? Math.max(540, Math.min(rect.width * 1.35, 620))
        : Math.max(580, Math.min(rect.width * 0.62, 680));

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);

      const centerX = width / 2;
      const centerY = height / 2;

      // 7 Category cluster anchor points around the canvas
      const categoryKeys = ["agents", "vectordb", "guardrails", "automation", "inference", "cloud", "tracing"];
      const clusterCenters: Record<string, { x: number; y: number }> = {};

      const clusterRadiusX = isMobile ? width * 0.32 : width * 0.36;
      const clusterRadiusY = isMobile ? height * 0.36 : height * 0.35;

      categoryKeys.forEach((cat, idx) => {
        const angle = (idx / categoryKeys.length) * Math.PI * 2 - Math.PI / 2;
        clusterCenters[cat] = {
          x: centerX + Math.cos(angle) * clusterRadiusX,
          y: centerY + Math.sin(angle) * clusterRadiusY,
        };
      });

      // Group nodes by category to arrange them in local sub-orbits
      const grouped: Record<string, SkillNode[]> = {};
      nodes.forEach((n) => {
        if (!grouped[n.category]) grouped[n.category] = [];
        grouped[n.category].push(n);
      });

      Object.entries(grouped).forEach(([cat, catNodes]) => {
        const center = clusterCenters[cat] || { x: centerX, y: centerY };
        const localRadius = isMobile ? 48 : 65;

        catNodes.forEach((node, i) => {
          const localAngle = (i / catNodes.length) * Math.PI * 2;
          const bx = center.x + Math.cos(localAngle) * localRadius;
          const by = center.y + Math.sin(localAngle) * (localRadius * 0.85);

          node.baseX = bx;
          node.baseY = by;
          if (node.x === 0 && node.y === 0) {
            node.x = bx;
            node.y = by;
          }

          // Measure pill dimensions dynamically
          ctx.font = isMobile ? "bold 10px var(--font-heading, Manrope, sans-serif)" : "bold 11px var(--font-heading, Manrope, sans-serif)";
          const textMetrics = ctx.measureText(node.name);
          ctx.font = isMobile ? "8px var(--font-body, Inter, sans-serif)" : "8.5px var(--font-body, Inter, sans-serif)";
          const tagMetrics = ctx.measureText(node.tag);
          node.width = isMobile
            ? Math.max(98, Math.max(textMetrics.width, tagMetrics.width) + 28)
            : Math.max(116, Math.max(textMetrics.width, tagMetrics.width) + 34);
          node.height = isMobile ? 32 : 36;
        });
      });
    };

    setupLayout();

    const handleResize = () => {
      setupLayout();
    };
    window.addEventListener("resize", handleResize);

    // Coordinate helpers
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
      const currentCategory = selectedCategoryRef.current;
      const currentSkill = activeSkillRef.current;

      const activeNode = currentSkill
        ? nodes.find((n) => n.name.toLowerCase() === currentSkill.toLowerCase())
        : null;
      const effectiveHovered = mouse.hoveredNode || activeNode;

      const lineColor = isNight ? "rgba(96, 165, 250, 0.12)" : "rgba(37, 99, 235, 0.10)";
      const lineActiveColor = isNight ? "rgba(56, 189, 248, 0.75)" : "rgba(37, 99, 235, 0.7)";

      // Draw subtle background radial glow from active node or center
      const focalX = effectiveHovered ? effectiveHovered.x : width / 2;
      const focalY = effectiveHovered ? effectiveHovered.y : height / 2;
      const bgGrad = ctx.createRadialGradient(focalX, focalY, 20, focalX, focalY, width * 0.65);
      if (isNight) {
        bgGrad.addColorStop(0, "rgba(37, 99, 235, 0.09)");
        bgGrad.addColorStop(0.5, "rgba(6, 182, 212, 0.03)");
        bgGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      } else {
        bgGrad.addColorStop(0, "rgba(37, 99, 235, 0.06)");
        bgGrad.addColorStop(0.5, "rgba(6, 182, 212, 0.02)");
        bgGrad.addColorStop(1, "rgba(255, 255, 255, 0)");
      }
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // 1. Physics update: spring to anchor + gentle floating oscillation + cursor interaction
      nodes.forEach((node, i) => {
        if (mouse.draggedNode !== node) {
          // Gentle floating sine-wave motion
          const floatX = Math.cos(time + i * 0.7) * 6;
          const floatY = Math.sin(time + i * 0.7) * 6;
          const targetX = node.baseX + floatX;
          const targetY = node.baseY + floatY;

          // Elastic spring force to target
          const k = 0.025;
          const damp = 0.85;
          const fx = (targetX - node.x) * k;
          const fy = (targetY - node.y) * k;

          node.vx = (node.vx + fx) * damp;
          node.vy = (node.vy + fy) * damp;

          // Cursor repulsion / proximity interaction
          const dx = node.x - mouse.x;
          const dy = node.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxRepelDist = 95;
          if (dist < maxRepelDist && dist > 1) {
            const force = ((maxRepelDist - dist) / maxRepelDist) * 2.8;
            node.vx += (dx / dist) * force;
            node.vy += (dy / dist) * force;
          }

          node.x += node.vx;
          node.y += node.vy;
        }
      });

      // 2. Collision avoidance: gently push neighboring nodes apart so pills never awkwardly overlap
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const cdx = b.x - a.x;
          const cdy = b.y - a.y;
          const dist = Math.sqrt(cdx * cdx + cdy * cdy);
          const minDist = (a.width + b.width) / 2 * 0.74 + 8;
          if (dist < minDist && dist > 0.01) {
            const overlap = (minDist - dist) * 0.06;
            const nx = cdx / dist;
            const ny = cdy / dist;
            if (mouse.draggedNode !== a) {
              a.x -= nx * overlap;
              a.y -= ny * overlap;
            }
            if (mouse.draggedNode !== b) {
              b.x += nx * overlap;
              b.y += ny * overlap;
            }
          }
        }
      }

      // Container boundary clamp
      nodes.forEach((node) => {
        const halfW = node.width / 2;
        const halfH = node.height / 2;
        node.x = Math.max(halfW + 8, Math.min(width - halfW - 8, node.x));
        node.y = Math.max(halfH + 8, Math.min(height - halfH - 8, node.y));
      });

      // 3. Draw Connecting Lines
      nodes.forEach((node) => {
        node.connections.forEach((targetId) => {
          const target = nodes.find((n) => n.id === targetId);
          if (!target) return;

          const isConnectedToHovered =
            effectiveHovered &&
            (effectiveHovered.id === node.id || effectiveHovered.id === target.id);

          const isCategoryActive =
            currentCategory === "all" ||
            node.category === currentCategory ||
            target.category === currentCategory;

          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(target.x, target.y);

          if (isConnectedToHovered) {
            ctx.strokeStyle = lineActiveColor;
            ctx.lineWidth = 2.2;
            ctx.setLineDash([4, 4]);
            ctx.lineDashOffset = -time * 16;
          } else if (isCategoryActive) {
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = 1;
            ctx.setLineDash([]);
          } else {
            ctx.strokeStyle = isNight ? "rgba(255, 255, 255, 0.03)" : "rgba(0, 0, 0, 0.03)";
            ctx.lineWidth = 0.8;
            ctx.setLineDash([]);
          }
          ctx.stroke();
          ctx.setLineDash([]);
        });
      });

      // 4. Draw Pill-Shaped Nodes
      nodes.forEach((node) => {
        const isHovered = effectiveHovered?.id === node.id;
        const isConnected =
          effectiveHovered &&
          (effectiveHovered.id === node.id ||
            effectiveHovered.connections.includes(node.id) ||
            node.connections.includes(effectiveHovered.id));

        const isCategoryMatch = currentCategory === "all" || node.category === currentCategory;
        const isDimmed = !isCategoryMatch && !isConnected && !isHovered;

        const halfW = node.width / 2;
        const halfH = node.height / 2;
        const px = node.x - halfW;
        const py = node.y - halfH;
        const accentColor = isNight ? node.darkColor : node.color;

        ctx.save();
        ctx.globalAlpha = isDimmed ? 0.28 : 1.0;

        // Glow effect when hovered or active
        if (isHovered) {
          ctx.shadowColor = accentColor;
          ctx.shadowBlur = 18;
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 0;
        }

        // Draw Pill Container
        ctx.beginPath();
        ctx.roundRect(px, py, node.width, node.height, 18);

        // Pill background
        if (isNight) {
          ctx.fillStyle = isHovered
            ? "rgba(15, 23, 42, 0.96)"
            : isConnected
            ? "rgba(11, 17, 32, 0.92)"
            : "rgba(11, 17, 32, 0.78)";
        } else {
          ctx.fillStyle = isHovered
            ? "rgba(255, 255, 255, 0.98)"
            : isConnected
            ? "rgba(248, 250, 252, 0.95)"
            : "rgba(255, 255, 255, 0.88)";
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
          ctx.strokeStyle = isNight ? "rgba(51, 65, 85, 0.75)" : "rgba(203, 213, 225, 0.75)";
          ctx.lineWidth = 1;
        }
        ctx.stroke();
        ctx.restore();

        // Glowing indicator dot
        ctx.save();
        ctx.globalAlpha = isDimmed ? 0.28 : 1.0;
        const dotX = px + 12;
        const dotY = node.y;
        ctx.beginPath();
        ctx.arc(dotX, dotY, isHovered ? 4 : 3, 0, Math.PI * 2);
        ctx.fillStyle = accentColor;
        ctx.fill();

        // Node Title Text
        const isMobile = width < 768;
        ctx.font = isMobile ? "bold 10px var(--font-heading, Manrope, sans-serif)" : "bold 11px var(--font-heading, Manrope, sans-serif)";
        ctx.fillStyle = isNight ? (isHovered ? "#FFFFFF" : "#F1F5F9") : (isHovered ? "#0F172A" : "#1E293B");
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.fillText(node.name, dotX + 8, node.y - 5);

        // Node Subtitle / Tag Text
        ctx.font = isMobile ? "500 7.5px var(--font-body, Inter, sans-serif)" : "500 8.5px var(--font-body, Inter, sans-serif)";
        ctx.fillStyle = isNight ? (isHovered ? accentColor : "#94A3B8") : (isHovered ? accentColor : "#64748B");
        ctx.fillText(node.tag, dotX + 8, node.y + 7);
        ctx.restore();
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
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-widest mb-4 font-heading shadow-sm">
            <Sparkles className="w-3.5 h-3.5 animate-pulse text-blue-600 dark:text-blue-400" />
            <span>CORE ARCHITECTURE &amp; ECOSYSTEM</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0F172A] dark:text-white tracking-tight font-heading leading-tight mb-4">
            Engineering Stack &amp; Ecosystem
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
            The full-spectrum modern AI stack powering our autonomous agents, deterministic workflows, and production integrations.
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
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-200/70 dark:border-slate-800/80 text-xs font-heading">
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                ACTIVE MULTI-AGENT TOPOLOGY (27 CORE TECHNOLOGIES)
              </span>
            </div>

            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 bg-white/80 dark:bg-slate-900/60 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-800 shadow-sm text-[11px] font-medium">
              <Move className="w-3.5 h-3.5 text-blue-500 animate-pulse" />
              <span>Drag nodes or click categories to explore connections</span>
            </div>
          </div>

          {/* Category Filter Tabs */}
          <div className="relative z-10 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-4">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setActiveSkill(null);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-heading font-semibold transition-all duration-200 flex items-center gap-1.5 border cursor-pointer ${
                    isActive
                      ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20 scale-105"
                      : "bg-white/80 dark:bg-slate-900/70 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-600"
                  }`}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: isDark ? cat.darkColor : cat.color }}
                  />
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>

          {/* Canvas Interactive Graph */}
          <div className="relative w-full overflow-hidden flex items-center justify-center">
            <canvas
              ref={canvasRef}
              className="block w-full touch-none select-none rounded-2xl"
              style={{ minHeight: "520px" }}
            />
          </div>

          {/* Bottom Skills Summary Pill Bar */}
          <div className="relative z-10 mt-6 pt-4 border-t border-slate-200/70 dark:border-slate-800/80">
            <div className="text-center mb-3">
              <span className="text-[11px] font-heading font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                Quick Highlight Skills (Click to Focus):
              </span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
              {ALL_SKILLS.map((skill) => {
                const isActive = activeSkill === skill.name;
                return (
                  <button
                    key={skill.id}
                    onClick={() => setActiveSkill((prev) => (prev === skill.name ? null : skill.name))}
                    className={`px-2.5 py-1 rounded-full text-[11px] font-heading font-medium transition-all duration-200 flex items-center gap-1 border cursor-pointer ${
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
      </div>
    </section>
  );
}
