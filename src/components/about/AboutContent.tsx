"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { COMPANY_INFO } from "@/lib/constants";
import { COMPANY_VALUES, TEAM_MEMBERS } from "@/data/team";
import { Department, TeamMember } from "@/types/team";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { AmbientOrbs } from "@/components/ui/AmbientOrbs";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { BusinessLegalSection } from "@/components/about/BusinessLegalSection";
import {
  CheckCircle2,
  ArrowUpRight,
  ShieldCheck,
  Award,
  Sparkles,
  Mail,
  ChevronRight,
  Layers,
  Cpu,
  ShieldAlert,
  Clock,
  Briefcase,
  Users,
  Compass,
  XCircle,
  Zap,
  Target,
} from "lucide-react";

function LinkedInIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

function FacebookIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

const STATS_DATA = [
  {
    icon: <Layers className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
    value: 100,
    suffix: "%",
    label: "Problem-First Architecture",
    description: "Grounded & Validated AI, deterministic software design",
  },
  {
    icon: <Cpu className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />,
    value: 99,
    suffix: ".8%",
    label: "Enterprise Uptime & SLA",
    description: "Resilient cloud infrastructure with active telemetry",
  },
  {
    icon: <Clock className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
    value: 24,
    suffix: "/7",
    label: "Autonomous AI Operations",
    description: "Continuous self-healing automated workflows",
  },
  {
    icon: <ShieldAlert className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
    value: 14,
    suffix: "-Day",
    label: "Pilot Sprints",
    description: "Rapid production-grade MVP deployment",
  },
];

type FilterCategory = "All" | Department;

export function AboutContent() {
  const [selectedDept, setSelectedDept] = useState<FilterCategory>("All");

  const founder = TEAM_MEMBERS.find((m) => m.id === "founder-ceo")!;
  const allSpecialists = TEAM_MEMBERS.filter((m) => m.id !== "founder-ceo");

  const departments: FilterCategory[] = [
    "All",
    "AI & Engineering",
    "Product & Design",
    "Operations",
    "Leadership",
  ];

  const filteredSpecialists =
    selectedDept === "All"
      ? allSpecialists
      : allSpecialists.filter((m) => m.department === selectedDept);

  return (
    <div className="relative overflow-hidden bg-[#FCFDFE] dark:bg-[#020817] text-[#0F172A] dark:text-slate-100 transition-colors duration-300">
      {/* Ambient background lights */}
      <AmbientOrbs />

      {/* Hero / Page Header Section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 border-b border-slate-200/80 dark:border-slate-800/80 bg-gradient-to-b from-[#F1F5F9]/80 via-[#F8FAFC]/50 to-[#FCFDFE] dark:from-[#0f172a]/80 dark:via-[#070d1d]/60 dark:to-[#020817]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb Navigation */}
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-6 font-medium"
          >
            <Link
              href="/"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1"
            >
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
            <span className="text-blue-600 dark:text-blue-400 font-semibold">About</span>
          </motion.nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
            <div className="lg:col-span-8 space-y-5">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold font-heading uppercase tracking-widest shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 animate-pulse" />
                ABOUT ZENIVIXON TECHNOLOGIES
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0F172A] dark:text-white tracking-tight leading-[1.12] font-heading"
              >
                Focused on Practical AI &amp;{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 dark:from-blue-400 dark:via-cyan-300 dark:to-indigo-400">
                  Reliable Engineering.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed"
              >
                We are an AI-first technology company built on a single conviction: enterprise software and AI must solve real business problems, operate with deterministic reliability, and integrate with your existing systems.
              </motion.p>
            </div>

            {/* Quick Live Status Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="lg:col-span-4 p-5 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 shadow-md shadow-slate-200/50 dark:shadow-none space-y-2"
            >
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-bold uppercase tracking-wider font-heading text-slate-800 dark:text-slate-200">
                  Global Delivery Hub
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Serving forward-thinking enterprises &amp; B2B clients across the US, UK, Europe, Canada &amp; Australia.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Animated Metrics Strip */}
      <section className="py-12 md:py-16 border-b border-slate-200/80 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS_DATA.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="p-6 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-700/60 transition-all group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                    {stat.icon}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 font-heading">
                    METRIC 0{idx + 1}
                  </span>
                </div>
                <div className="text-3xl font-extrabold text-[#0F172A] dark:text-white font-heading mb-1">
                  <AnimatedCounter to={stat.value} suffix={stat.suffix} duration={2} />
                </div>
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 font-heading mb-1">
                  {stat.label}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                  {stat.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="py-20 md:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32">
        {/* Mission & Positioning */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <ScrollReveal direction="left" className="lg:col-span-7 space-y-6">
            <Badge variant="blue" size="sm" className="font-semibold text-xs tracking-widest">
              OUR POSITIONING
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] dark:text-white font-heading leading-tight">
              An AI-First Technology Partner for International Business.
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
              ZENIVIXON was founded to bridge the gap between abstract AI research and practical enterprise operations. While large agencies offer generic retainers and superficial chatbots, we focus deeply on autonomous customer support agents, workflow automation, custom software, and system integrations.
            </p>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
              We serve business owners, CTOs, and operations leaders across the United States, United Kingdom, Europe, Canada, Australia, and other global markets who require focused, expert execution without corporate bureaucracy.
            </p>
          </ScrollReveal>

          <ScrollReveal direction="right" className="lg:col-span-5">
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none space-y-6 relative overflow-hidden group"
            >
              {/* Subtle top gradient aura */}
              <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-blue-500/10 dark:bg-blue-500/20 blur-3xl pointer-events-none group-hover:scale-150 transition-transform duration-700" />

              <div className="text-xs font-heading text-cyan-600 dark:text-cyan-400 uppercase tracking-widest font-bold flex items-center gap-1.5">
                <Compass className="w-4 h-4" />
                <span>Engineering Philosophy</span>
              </div>
              <p className="text-lg sm:text-xl font-bold text-[#0F172A] dark:text-white font-heading leading-snug">
                &ldquo;{COMPANY_INFO.philosophy}&rdquo;
              </p>
              <div className="space-y-3.5 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                  <span>Start by understanding the exact business bottleneck</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
                  <span>Enforce deterministic validation and sandboxed tools</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                  <span>Embed directly into your existing software stack</span>
                </div>
              </div>
            </motion.div>
          </ScrollReveal>
        </div>

        {/* Founder & CEO Executive Showcase with Glow Aura */}
        <section className="space-y-8">
          <ScrollReveal direction="up">
            <div className="space-y-3">
              <Badge variant="blue" size="sm" className="font-semibold text-xs tracking-widest">
                EXECUTIVE LEADERSHIP
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] dark:text-white font-heading">
                Founder &amp; Chief Executive Officer
              </h2>
              <p className="text-base text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
                Driving ZENIVIXON&apos;s strategic vision, engineering quality, and direct international client collaborations.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.1}>
            <div className="relative rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 sm:p-10 md:p-12 shadow-xl shadow-slate-200/60 dark:shadow-none grid grid-cols-1 lg:grid-cols-12 gap-10 items-center overflow-hidden">
              {/* Animated decorative glow aura behind card */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-500/10 via-cyan-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

              {/* Founder Large Portrait (5 cols) */}
              <div className="lg:col-span-5 flex flex-col items-center">
                <div className="w-full max-w-md aspect-[5/6] relative rounded-3xl shadow-xl bg-slate-950 group overflow-hidden">
                  {/* Live Rotating Animation Border */}
                  <div className="absolute -inset-[50%] z-0 animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0_180deg,#3b82f6_270deg,#06b6d4_360deg)]" />
                  <div className="absolute inset-[3px] rounded-[22px] bg-slate-950 z-10 overflow-hidden">
                    <Image
                      src={founder.image}
                      alt={founder.name}
                      fill
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      priority
                    />
                    {/* Subtle gradient vignette overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2 text-xs font-heading text-slate-600 dark:text-slate-300 font-semibold px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>Verified Executive Profile &bull; ZENIVIXON</span>
                </div>
              </div>

              {/* Founder Details, Qualities & Socials (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <Badge variant="blue" size="sm" className="font-bold text-xs">
                      {founder.role}
                    </Badge>
                    {founder.titleBadge && (
                      <span className="text-xs font-heading text-cyan-700 dark:text-cyan-300 bg-cyan-50 dark:bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-200 dark:border-cyan-800 font-semibold">
                        {founder.titleBadge}
                      </span>
                    )}
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] dark:text-white font-heading">
                    {founder.name}
                  </h3>
                </div>

                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                  {founder.bio}
                </p>

                {/* Leadership Qualities & Credentials */}
                <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-widest font-heading flex items-center gap-2">
                    <Award className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span>Strategic Leadership &amp; Core Qualities:</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {founder.qualities?.map((qual, idx) => (
                      <motion.div
                        key={idx}
                        whileHover={{ x: 3 }}
                        className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300 font-medium"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span className="leading-snug">{qual}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Strategic Expertise Tags */}
                <div className="space-y-2.5 pt-2">
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-widest font-heading">
                    Core Strategic Domains:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {founder.expertise.map((exp) => (
                      <motion.span
                        key={exp}
                        whileHover={{ scale: 1.05 }}
                        className="text-xs font-heading px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 font-semibold transition-colors"
                      >
                        {exp}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Founder Direct Social Links */}
                <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center gap-3">
                  {founder.linkedin && (
                    <motion.a
                      whileHover={{ scale: 1.04, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      href={founder.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0A66C2] text-white text-xs font-semibold hover:bg-[#084e96] transition-colors shadow-sm"
                    >
                      <LinkedInIcon className="w-4 h-4" />
                      <span>LinkedIn Profile</span>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-80" />
                    </motion.a>
                  )}
                  {founder.facebook && (
                    <motion.a
                      whileHover={{ scale: 1.04, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      href={founder.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1877F2] text-white text-xs font-semibold hover:bg-[#125ec2] transition-colors shadow-sm"
                    >
                      <FacebookIcon className="w-4 h-4" />
                      <span>Facebook Profile</span>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-80" />
                    </motion.a>
                  )}
                  {founder.email && (
                    <motion.a
                      whileHover={{ scale: 1.04, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      href={`mailto:${founder.email}`}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                    >
                      <Mail className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                      <span>Direct Email</span>
                    </motion.a>
                  )}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* Engineering & Technical Specialists with Department Filtering */}
        <section className="space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <Badge variant="cyan" size="sm" className="font-semibold text-xs tracking-widest">
                ENGINEERING &amp; SPECIALISTS
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] dark:text-white font-heading">
                Technical Specialists &amp; Systems Engineers
              </h2>
              <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                Standardized, high-density engineering profiles. Our clients work directly with the technical specialists architecting and deploying their systems.
              </p>
            </div>

            {/* Department Filter Navigation Pills */}
            <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-fit">
              {departments.map((dept) => {
                const isSelected = selectedDept === dept;
                return (
                  <button
                    key={dept}
                    onClick={() => setSelectedDept(dept)}
                    className={`relative px-4 py-2 text-xs font-heading font-semibold rounded-xl transition-all duration-200 ${
                      isSelected
                        ? "text-white shadow-sm"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    {isSelected && (
                      <motion.div
                        layoutId="activeDeptPill"
                        className="absolute inset-0 bg-blue-600 dark:bg-blue-600 rounded-xl"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{dept}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Animated Filtered Cards Grid */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredSpecialists.map((member: TeamMember, index: number) => (
                <motion.div
                  key={member.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md hover:shadow-2xl hover:border-blue-300 dark:hover:border-blue-700/70 p-8 sm:p-10 flex flex-col justify-between transition-all group relative overflow-hidden"
                >
                  {/* Subtle hover gradient glow */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />

                  <div className="space-y-6 relative z-10">
                    {/* Large Standard Portrait & Role Header */}
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                      <div className="sm:col-span-5 aspect-[5/6] relative rounded-2xl bg-slate-950 shadow-sm overflow-hidden group/member">
                        {/* Live Rotating Animation Border */}
                        <div className="absolute -inset-[50%] z-0 animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0_180deg,#3b82f6_270deg,#06b6d4_360deg)]" />
                        <div className="absolute inset-[3px] rounded-[14px] bg-slate-950 z-10 overflow-hidden">
                          <Image
                            src={member.image}
                            alt={member.name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover/member:scale-105"
                          />
                        </div>
                      </div>
                      <div className="sm:col-span-7 space-y-2">
                        <Badge variant="blue" size="sm" className="font-semibold text-xs">
                          {member.department}
                        </Badge>
                        <h3 className="text-xl font-bold text-[#0F172A] dark:text-white font-heading group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {member.name}
                        </h3>
                        <p className="text-xs font-heading text-blue-600 dark:text-blue-400 font-semibold">
                          {member.role}
                        </p>
                        {member.titleBadge && (
                          <p className="text-xs font-heading text-slate-500 dark:text-slate-400">
                            {member.titleBadge}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Bio */}
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {member.bio}
                    </p>

                    {/* Professional Qualities */}
                    {member.qualities && (
                      <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                        <div className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-widest font-heading flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                          <span>Core Qualities:</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                          {member.qualities.map((qual, idx) => (
                            <div
                              key={idx}
                              className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                              <span className="leading-snug">{qual}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Expertise Tags */}
                    <div className="space-y-2 pt-2">
                      <div className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-widest font-heading">
                        Technical Stack &amp; Skills:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {member.expertise.map((exp) => (
                          <span
                            key={exp}
                            className="text-xs font-heading px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 font-medium group-hover:border-slate-300 dark:group-hover:border-slate-600 transition-colors"
                          >
                            {exp}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Social Profiles & Verified Badge */}
                  <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 relative z-10">
                    <div className="flex items-center gap-2">
                      {member.linkedin && (
                        <motion.a
                          whileHover={{ scale: 1.08 }}
                          whileTap={{ scale: 0.95 }}
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0A66C2] text-white text-xs font-semibold hover:bg-[#084e96] transition-colors"
                        >
                          <LinkedInIcon className="w-3.5 h-3.5" />
                          <span>LinkedIn</span>
                        </motion.a>
                      )}
                      {member.facebook && (
                        <motion.a
                          whileHover={{ scale: 1.08 }}
                          whileTap={{ scale: 0.95 }}
                          href={member.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1877F2] text-white text-xs font-semibold hover:bg-[#125ec2] transition-colors"
                        >
                          <FacebookIcon className="w-3.5 h-3.5" />
                          <span>Facebook</span>
                        </motion.a>
                      )}
                    </div>
                    <span className="text-xs font-heading text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800/80">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      Verified Specialist
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </section>

        {/* The ZENIVIXON Advantage: Why Choose Us vs Legacy Agencies */}
        <section className="space-y-10">
          <ScrollReveal direction="up">
            <div className="max-w-3xl space-y-3">
              <Badge variant="blue" size="sm" className="font-semibold text-xs tracking-widest">
                THE ZENIVIXON ADVANTAGE
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] dark:text-white font-heading">
                Why Emerging &amp; Global Enterprises Choose Us Over Big Agencies.
              </h2>
              <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                As a high-density, focused AI engineering company, we strip away the bloated overhead, non-technical middlemen, and months of delay common in traditional consulting firms.
              </p>
            </div>
          </ScrollReveal>

          {/* Comparison Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-blue-300 dark:hover:border-blue-700 transition-all space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-[#0F172A] dark:text-white font-heading">
                  Direct Engineer Access
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  No layers of non-technical sales reps or junior outsourcing. You work directly with the senior architects and engineers writing your code.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-xs font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                100% Transparent Technical Alignment
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-blue-300 dark:hover:border-blue-700 transition-all space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-100 dark:border-emerald-900 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-[#0F172A] dark:text-white font-heading">
                  14-Day Pilot
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Start with a focused pilot before committing to a larger implementation. We prove our value on your actual business problem.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                14-Day Pilot • Measurable Value
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-blue-300 dark:hover:border-blue-700 transition-all space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-100 dark:border-cyan-900 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-[#0F172A] dark:text-white font-heading">
                  3x Faster Production Velocity
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Using cutting-edge AI engineering workflows and modern modular stacks, we ship in 1–2 weeks what legacy consultancies spend months debating.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-xs font-semibold text-cyan-600 dark:text-cyan-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                Agile Sprints • Live In Days, Not Quarters
              </div>
            </div>
          </div>
        </section>

        {/* Company Principles with Number Indicators */}
        <section className="space-y-10">
          <ScrollReveal direction="up">
            <div className="max-w-2xl space-y-3">
              <Badge variant="blue" size="sm" className="font-semibold text-xs tracking-widest">
                CORE PRINCIPLES
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] dark:text-white font-heading">
                How We Approach Every Engineering Engagement
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {COMPANY_VALUES.map((val, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-blue-300 dark:hover:border-blue-700 transition-all space-y-4 relative overflow-hidden group"
              >
                {/* Top shining line on hover */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="text-xs font-heading text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800">
                    PRINCIPLE 0{idx + 1}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[#0F172A] dark:text-white font-heading group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {val.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {val.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Business & Legal Section */}
        <BusinessLegalSection />

        {/* Scalable Growth Statement CTA Banner */}
        <ScrollReveal direction="up">
          <motion.div
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.3 }}
            className="rounded-3xl bg-gradient-to-b from-[#F8FAFC] to-[#EFF6FF] dark:from-[#0b1120] dark:to-[#070d1d] border border-blue-200/80 dark:border-blue-900/60 p-8 sm:p-12 md:p-16 text-center space-y-6 shadow-xl shadow-blue-500/5 relative overflow-hidden"
          >
            {/* Background glowing circular flare */}
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

            <span className="text-xs font-heading uppercase tracking-widest text-blue-600 dark:text-blue-400 font-bold px-3.5 py-1 rounded-full bg-blue-100/80 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800 inline-block">
              Focused today. Built for tomorrow.
            </span>

            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F172A] dark:text-white font-heading max-w-3xl mx-auto">
              Partner with ZENIVIXON for your AI &amp; Software initiatives.
            </h3>

            <p className="text-slate-600 dark:text-slate-300 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
              Let us review your workflow and discuss how practical AI systems and modern software can elevate your business efficiency.
            </p>

            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Button
                variant="glowing"
                size="lg"
                href="/start-a-project"
                className="shadow-lg shadow-blue-600/20"
              >
                Start Your AI Project
              </Button>
              <Button
                variant="whatsapp"
                size="lg"
                href={COMPANY_INFO.channels.whatsapp}
                external
              >
                Chat on WhatsApp
              </Button>
            </div>
          </motion.div>
        </ScrollReveal>
      </div>
    </div>
  );
}
