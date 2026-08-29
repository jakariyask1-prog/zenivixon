"use client";

import React, { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

export function NeuralNetworkAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    // Respect user's motion preference
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    class Node {
      x: number = 0;
      y: number = 0;
      z: number = 0;
      ox: number;
      oy: number;
      oz: number;
      basePhase: number;

      constructor() {
        // Random point on a sphere surface or volume
        const theta = Math.random() * 2 * Math.PI;
        const phi = Math.acos(Math.random() * 2 - 1);
        const r = Math.cbrt(Math.random());
        this.ox = r * Math.sin(phi) * Math.cos(theta);
        this.oy = r * Math.sin(phi) * Math.sin(theta);
        this.oz = r * Math.cos(phi);
        this.basePhase = Math.random() * Math.PI * 2;
      }
    }

    const numNodes = width < 768 ? 40 : 70;
    const nodes = Array.from({ length: numNodes }, () => new Node());

    class Packet {
      progress: number;
      speed: number;
      from: Node;
      to: Node;

      constructor(from: Node, to: Node) {
        this.from = from;
        this.to = to;
        this.progress = 0;
        this.speed = 0.015 + Math.random() * 0.02; // Faster data packets
      }
    }

    const packets: Packet[] = [];
    const connections: [Node, Node][] = [];

    // Pre-calculate connections
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].ox - nodes[j].ox;
        const dy = nodes[i].oy - nodes[j].oy;
        const dz = nodes[i].oz - nodes[j].oz;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        // Connect nodes that are relatively close
        if (dist < 0.6) {
          connections.push([nodes[i], nodes[j]]);
        }
      }
    }

    let time = 0;
    let animationFrameId: number;

    const render = () => {
      time += 0.005; // Increased speed
      ctx.clearRect(0, 0, width, height);

      const isDark = resolvedTheme === "dark";
      // Elegant blue/cyan colors
      const lineColor = isDark ? "rgba(14, 165, 233, " : "rgba(2, 132, 199, "; // sky-500 / sky-600
      const particleColor = isDark ? "#38bdf8" : "#0284c7"; // sky-400 / sky-600

      const radiusX = Math.min(width, 1600) * 0.55;
      const radiusY = Math.min(height, 800) * 0.45;
      const cx = width / 2;
      const cy = (height / 2) + 320; // Shifted further down to perfectly align with the new mt-56 cover photo

      // Global rotation
      const cosY = Math.cos(time);
      const sinY = Math.sin(time);
      const cosX = Math.cos(time * 0.5);
      const sinX = Math.sin(time * 0.5);

      nodes.forEach((node) => {
        // Subtle morphing
        const morph = Math.sin(time * 3 + node.basePhase) * 0.05;
        const mx = node.ox * (1 + morph);
        const my = node.oy * (1 + morph);
        const mz = node.oz * (1 + morph);

        // Rotate Y
        const rx = mx * cosY - mz * sinY;
        const rz = mx * sinY + mz * cosY;

        // Rotate X
        const ry = my * cosX - rz * sinX;
        const finalZ = my * sinX + rz * cosX;

        const perspective = 2 / (2.5 - finalZ);
        node.x = cx + rx * radiusX * perspective;
        node.y = cy + ry * radiusY * perspective;
        node.z = finalZ;
      });

      // Draw connections
      ctx.lineWidth = 1.0; // Thicker lines
      connections.forEach(([n1, n2]) => {
        const dx = n1.x - n2.x;
        const dy = n1.y - n2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = Math.max(radiusX, radiusY);

        if (dist < maxDist) {
          const alpha = (1 - dist / maxDist) * 0.6 * ((n1.z + n2.z + 2) / 2); // Deeper clarity
          ctx.strokeStyle = `${lineColor}${alpha})`;
          ctx.beginPath();
          ctx.moveTo(n1.x, n1.y);
          ctx.lineTo(n2.x, n2.y);
          ctx.stroke();
        }
      });

      // Spawn data particles
      if (Math.random() < 0.3 && connections.length > 0) { // More frequent particles
        const conn = connections[Math.floor(Math.random() * connections.length)];
        packets.push(new Packet(conn[0], conn[1]));
      }

      // Draw packets
      ctx.fillStyle = particleColor;
      for (let i = packets.length - 1; i >= 0; i--) {
        const p = packets[i];
        p.progress += p.speed;
        if (p.progress >= 1) {
          packets.splice(i, 1);
          continue;
        }

        const px = p.from.x + (p.to.x - p.from.x) * p.progress;
        const py = p.from.y + (p.to.y - p.from.y) * p.progress;
        
        ctx.beginPath();
        ctx.arc(px, py, 1.8, 0, Math.PI * 2); // Larger particles
        ctx.fill();
      }

      // Draw nodes
      nodes.forEach((node) => {
        const alpha = 0.4 + ((node.z + 1) / 2) * 0.6; // Brighter nodes
        ctx.fillStyle = `${lineColor}${alpha})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 2.0, 0, Math.PI * 2); // Slightly larger nodes
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [resolvedTheme]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none flex items-center justify-center opacity-100">
      {/* Optional: Add a subtle radial gradient mask so the network fades out at the edges */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_70%,transparent_30%,#FCFDFE_80%)] dark:bg-[radial-gradient(ellipse_at_50%_70%,transparent_30%,#020817_80%)] z-10" />
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}
