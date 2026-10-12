"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  Activity,
  Server,
  ShieldCheck,
  Zap,
  Cpu,
  Wifi,
  Sparkles,
  CheckCircle2,
  Clock,
  Layers,
} from "lucide-react";

interface NodeData {
  id: string;
  name: string;
  region: string;
  city: string;
  flag: string;
  latencyBase: number;
  uptime: string;
  activeAgents: number;
  throughput: string;
  status: "OPTIMAL" | "SYNCHRONIZED";
  services: string[];
}

const NODES: NodeData[] = [
  {
    id: "us-east",
    name: "North America Hub",
    region: "us-east-1",
    city: "Northern Virginia, USA",
    flag: "🇺🇸",
    latencyBase: 18,
    uptime: "99.994%",
    activeAgents: 48,
    throughput: "42,800 req/min",
    status: "OPTIMAL",
    services: ["LLM Inference Gateway", "Vector Index Cluster", "Enterprise CRM Sync"],
  },
  {
    id: "eu-central",
    name: "European Central Hub",
    region: "eu-central-1",
    city: "Frankfurt, Germany",
    flag: "🇩🇪",
    latencyBase: 24,
    uptime: "99.998%",
    activeAgents: 36,
    throughput: "31,450 req/min",
    status: "OPTIMAL",
    services: ["GDPR Guardrail Proxy", "Document OCR Pipeline", "ERP Event Stream"],
  },
  {
    id: "ap-southeast",
    name: "Asia-Pacific Gateway",
    region: "ap-southeast-1",
    city: "Singapore",
    flag: "🇸🇬",
    latencyBase: 32,
    uptime: "99.991%",
    activeAgents: 29,
    throughput: "26,120 req/min",
    status: "OPTIMAL",
    services: ["Omnichannel WhatsApp Bot", "Real-time Voice Synthesis", "Live Lead Triage"],
  },
  {
    id: "uk-london",
    name: "UK & Atlantic Node",
    region: "eu-west-2",
    city: "London, United Kingdom",
    flag: "🇬🇧",
    latencyBase: 21,
    uptime: "99.996%",
    activeAgents: 33,
    throughput: "28,900 req/min",
    status: "SYNCHRONIZED",
    services: ["Zero-Trust Tool Sandbox", "Finance PO Matcher", "Autonomous Scheduler"],
  },
];

export function GlobalSystemTelemetrySection() {
  const [activeNodeId, setActiveNodeId] = useState<string>("us-east");
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [liveLatency, setLiveLatency] = useState<number>(18);
  const [totalProcessedUnits, setTotalProcessedUnits] = useState<number>(184200);

  const activeNode = NODES.find((n) => n.id === activeNodeId) || NODES[0];

  // Auto-cycle through global nodes every 4.5 seconds unless user hovers
  useEffect(() => {
    if (isHovered) return;

    const cycleInterval = setInterval(() => {
      setActiveNodeId((prevId) => {
        const currIdx = NODES.findIndex((n) => n.id === prevId);
        const nextIdx = (currIdx + 1) % NODES.length;
        return NODES[nextIdx].id;
      });
    }, 4500);

    return () => clearInterval(cycleInterval);
  }, [isHovered]);

  // Perpetual micro-fluctuation of latency & live operations counter
  useEffect(() => {
    const jitterInterval = setInterval(() => {
      setLiveLatency(activeNode.latencyBase + Math.floor(Math.random() * 5) - 2);
      setTotalProcessedUnits((prev) => prev + Math.floor(Math.random() * 8) + 4);
    }, 900);

    return () => clearInterval(jitterInterval);
  }, [activeNode.latencyBase]);

  return (
    <section
      id="global-telemetry"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="py-16 md:py-24 relative overflow-hidden bg-[#F8FAFC] dark:bg-[#050914] border-y border-slate-200/80 dark:border-slate-800/80 transition-colors duration-300"
    >
      {/* Background Matrix & Radar Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(#0284c7_1px,transparent_1px)] dark:bg-[radial-gradient(#0369a1_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.14] pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[450px] bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-indigo-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100/80 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-widest font-heading mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 animate-pulse" />
            <span>24/7 INFOGRAPHIC TELEMETRY</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0F172A] dark:text-white tracking-tight font-heading leading-tight">
            Autonomous Global Infrastructure <br className="hidden sm:block" />
            <span className="text-gradient-animated">&amp; Real-Time System Health</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
            Every ZENIVIXON enterprise AI workflow is powered by an always-on, multi-region cluster with self-healing
            failovers, sub-30ms response times, and 99.99% operational reliability.
          </p>

          {/* Node Selector Pills with onMouseEnter & onClick */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            <span className="text-xs font-heading font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mr-1">
              Select Edge Node:
            </span>
            {NODES.map((node) => {
              const isActive = node.id === activeNodeId;
              return (
                <button
                  key={node.id}
                  onClick={() => setActiveNodeId(node.id)}
                  onMouseEnter={() => setActiveNodeId(node.id)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-heading font-semibold transition-all duration-300 flex items-center gap-2 border cursor-pointer ${
                    isActive
                      ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/25 scale-105"
                      : "bg-white dark:bg-[#0b1120] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500 hover:scale-102"
                  }`}
                >
                  <span className="text-sm">{node.flag}</span>
                  <span>{node.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* TELEMETRY COCKPIT: TWO-COLUMN MOTION-GRAPHIC INFOGRAPHIC CARDS */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          {/* LEFT COLUMN: ACTIVE NODE MISSION CONTROL (7 cols) */}
          <div className="lg:col-span-7 rounded-3xl bg-white dark:bg-[#0b1120] border-2 border-blue-200 dark:border-blue-900/60 p-6 sm:p-8 shadow-xl shadow-blue-500/5 flex flex-col justify-between space-y-6 relative overflow-hidden group">
            {/* Ambient scanner beam across top */}
            <motion.div
              animate={{ x: ["-100%", "200%"] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: "linear" }}
              className="absolute top-0 left-0 w-1/3 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent pointer-events-none"
            />

            <div className="space-y-6">
              {/* Header with Node Identity and Real-Time Pulse */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-800 flex items-center justify-center text-2xl shadow-xs">
                    {activeNode.flag}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono uppercase font-bold text-blue-600 dark:text-blue-400">
                        {activeNode.region}
                      </span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 text-[10px] font-mono font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                        {activeNode.status}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white font-heading">
                      {activeNode.city}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono">
                  <Clock className="w-3.5 h-3.5 text-blue-500 animate-spin" />
                  <span className="text-slate-600 dark:text-slate-300">
                    Cycle: <strong>Auto-Scanning</strong>
                  </span>
                </div>
              </div>

              {/* 4 Dynamic Metric HUD Tiles */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#070c18] border border-slate-200/80 dark:border-slate-800 text-center">
                  <span className="text-[10px] font-mono uppercase font-bold text-slate-500 dark:text-slate-400 block mb-1">
                    P95 Latency
                  </span>
                  <div className="text-xl font-extrabold text-blue-600 dark:text-blue-400 font-mono flex items-center justify-center gap-1">
                    <Wifi className="w-4 h-4" />
                    <span>{liveLatency} ms</span>
                  </div>
                  <span className="text-[9px] text-emerald-600 dark:text-emerald-400 font-mono font-medium">
                    Ultra-Low Jitter
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#070c18] border border-slate-200/80 dark:border-slate-800 text-center">
                  <span className="text-[10px] font-mono uppercase font-bold text-slate-500 dark:text-slate-400 block mb-1">
                    System Uptime
                  </span>
                  <div className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
                    {activeNode.uptime}
                  </div>
                  <span className="text-[9px] text-slate-500 dark:text-slate-400 font-mono">
                    365-Day SLA
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#070c18] border border-slate-200/80 dark:border-slate-800 text-center">
                  <span className="text-[10px] font-mono uppercase font-bold text-slate-500 dark:text-slate-400 block mb-1">
                    Active Agents
                  </span>
                  <div className="text-xl font-extrabold text-indigo-600 dark:text-indigo-400 font-mono flex items-center justify-center gap-1">
                    <Cpu className="w-4 h-4" />
                    <span>{activeNode.activeAgents}</span>
                  </div>
                  <span className="text-[9px] text-indigo-500 dark:text-indigo-400 font-mono">
                    Concurrent Pools
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#070c18] border border-slate-200/80 dark:border-slate-800 text-center">
                  <span className="text-[10px] font-mono uppercase font-bold text-slate-500 dark:text-slate-400 block mb-1">
                    Throughput
                  </span>
                  <div className="text-base sm:text-lg font-extrabold text-cyan-600 dark:text-cyan-400 font-mono">
                    {activeNode.throughput}
                  </div>
                  <span className="text-[9px] text-cyan-500 dark:text-cyan-400 font-mono">
                    Stream Balance
                  </span>
                </div>
              </div>

              {/* Real-time Animated Heartbeat Waveform */}
              <div className="p-4 rounded-2xl bg-slate-900 text-white border border-blue-500/30 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
                    Live Pulse Telemetry Stream:
                  </span>
                  <strong className="text-cyan-400 font-bold">
                    {(liveLatency * 1.05).toFixed(1)}ms moving avg
                  </strong>
                </div>

                {/* Animated SVG Stream Wave */}
                <div className="h-16 w-full relative overflow-hidden flex items-center">
                  <svg viewBox="0 0 400 60" className="w-full h-full preserve-3d" preserveAspectRatio="none">
                    <motion.path
                      d="M 0 30 Q 30 10 60 30 T 120 30 T 180 15 T 240 45 T 300 25 T 360 30 T 400 30"
                      fill="none"
                      stroke="#06b6d4"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      animate={{
                        d: [
                          "M 0 30 Q 30 10 60 30 T 120 30 T 180 15 T 240 45 T 300 25 T 360 30 T 400 30",
                          "M 0 30 Q 30 45 60 30 T 120 20 T 180 40 T 240 10 T 300 35 T 360 20 T 400 30",
                          "M 0 30 Q 30 10 60 30 T 120 30 T 180 15 T 240 45 T 300 25 T 360 30 T 400 30",
                        ],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 3.2,
                        ease: "easeInOut",
                      }}
                      className="drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]"
                    />
                  </svg>
                </div>
              </div>

              {/* Active Micro-Services Hosted on this Node */}
              <div>
                <span className="text-xs font-mono uppercase font-bold text-slate-500 dark:text-slate-400 block mb-2">
                  Autonomous Workload Services Deployed:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {activeNode.services.map((svc, i) => (
                    <div
                      key={i}
                      className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                      <span className="truncate">{svc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Failover Assurance */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                Zero Single Point of Failure (Multi-AZ Self-Healing)
              </span>
              <span className="hidden sm:inline">Active Telemetry Sync</span>
            </div>
          </div>

          {/* RIGHT COLUMN: ENTERPRISE GLOBAL RADAR & LIVE TERMINAL (5 cols) */}
          <div className="lg:col-span-5 rounded-3xl bg-gradient-to-b from-[#060b17] via-[#091124] to-[#040711] text-white border-2 border-cyan-500/40 p-6 sm:p-8 shadow-2xl shadow-cyan-500/10 flex flex-col justify-between space-y-6 relative overflow-hidden group">
            <div className="space-y-6 relative z-10">
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-400">
                    <Globe className="w-5 h-5 animate-spin" style={{ animationDuration: "25s" }} />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase font-bold tracking-widest text-cyan-400 block">
                      GLOBAL EVENT LOG
                    </span>
                    <h3 className="text-lg font-bold text-white font-heading">
                      Live Telemetry Terminal
                    </h3>
                  </div>
                </div>

                <span className="text-[11px] font-mono font-bold px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 flex items-center gap-1.5 animate-pulse">
                  <Zap className="w-3 h-3 fill-current" />
                  ONLINE
                </span>
              </div>

              {/* Total Processed Counter */}
              <div className="p-4 rounded-2xl bg-black/40 border border-cyan-500/20 space-y-1">
                <span className="text-[11px] font-mono uppercase text-slate-400 block">
                  Total Autonomous Operations Today:
                </span>
                <div className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400 font-mono">
                  {totalProcessedUnits.toLocaleString()} units
                </div>
                <div className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                  <span>▲ +100% Deterministic Guarantee</span>
                  <span className="text-slate-500">• Zero Unhandled Timeouts</span>
                </div>
              </div>

              {/* Terminal Logs Window */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Server className="w-3.5 h-3.5 text-blue-400" />
                    Edge Ingestion Stream:
                  </span>
                  <span className="text-[10px] text-emerald-400">200 OK</span>
                </div>

                <div className="p-4 rounded-2xl bg-[#030712] border border-slate-800 text-xs font-mono space-y-2.5 h-56 overflow-hidden relative">
                  <motion.div
                    animate={{ y: [0, -40] }}
                    transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                    className="space-y-2 text-[11px]"
                  >
                    <div className="text-cyan-400">
                      <span className="text-slate-500">[00:18:22 UTC]</span>{" "}
                      <span className="text-emerald-400">NODE_US_EAST:</span> 48/48 worker pools healthy.
                    </div>
                    <div className="text-slate-300">
                      <span className="text-slate-500">[00:18:24 UTC]</span>{" "}
                      <span className="text-blue-400">NODE_EU_CENTRAL:</span> Vector memory cache synchronized in 14ms.
                    </div>
                    <div className="text-slate-300">
                      <span className="text-slate-500">[00:18:28 UTC]</span>{" "}
                      <span className="text-indigo-400">NODE_AP_GATEWAY:</span> 1,200 WhatsApp webhooks resolved.
                    </div>
                    <div className="text-emerald-400">
                      <span className="text-slate-500">[00:18:31 UTC]</span>{" "}
                      <span className="text-cyan-400">NODE_UK_LONDON:</span> Financial invoice OCR ledger posted.
                    </div>
                    <div className="text-slate-300">
                      <span className="text-slate-500">[00:18:35 UTC]</span>{" "}
                      <span className="text-emerald-400">CLUSTER_SYNC:</span> Zero latency drift across regions.
                    </div>
                    <div className="text-cyan-400">
                      <span className="text-slate-500">[00:18:40 UTC]</span>{" "}
                      <span className="text-blue-400">HEARTBEAT:</span> 99.99% SLA verified by automated synthetic probes.
                    </div>
                  </motion.div>

                  {/* Terminal bottom glow gradient */}
                  <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#030712] to-transparent pointer-events-none" />
                </div>
              </div>

              {/* 3 Value Pillars */}
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Isolated VPC</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>SOC2 &amp; GDPR Ready</span>
                </div>
              </div>
            </div>

            {/* Bottom Info Bar */}
            <div className="pt-4 border-t border-white/10 text-xs font-mono text-slate-400 flex items-center justify-between">
              <span>Automatic Failover: Ready</span>
              <span className="text-cyan-400 font-semibold">100% Redundant</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
