"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FOOTER_LINKS } from "@/data/navigation";
import { COMPANY_INFO } from "@/lib/constants";
import { ArrowUpRight, Mail, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { motion, useReducedMotion } from "framer-motion";
import { AnimatedLogoText } from "@/components/ui/AnimatedLogoText";

// ─── Newsletter Form ──────────────────────────────────────────────────────────
function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        throw new Error("Server error. Please try again.");
      }
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
        setErrorMsg(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <div className="flex items-center gap-2 mb-4 p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 text-sm font-medium">
        <CheckCircle2 className="w-4 h-4 shrink-0" />
        You&apos;re subscribed! We&apos;ll be in touch soon.
      </div>
    );
  }

  return (
    <form className="flex items-center gap-2 mb-4" onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
        disabled={status === "loading"}
        className="flex-1 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-blue-500 transition-colors disabled:opacity-60"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        aria-label="Subscribe to newsletter"
        className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white p-2.5 rounded-lg transition-colors"
      >
        {status === "loading" ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <Mail className="w-5 h-5" />
        )}
      </button>
      {status === "error" && (
        <p className="text-xs text-red-500 mt-1 absolute">{errorMsg}</p>
      )}
    </form>
  );
}

export function Footer() {
  const shouldReduceMotion = useReducedMotion();
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#020817] text-sm mt-auto relative z-10 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 py-20 lg:py-24">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12">
          
          {/* Left Column: Get In Touch & Newsletter (Col-span 4) */}
          <div className="lg:col-span-4 space-y-16">
            
            {/* Stay Tuned / Newsletter */}
            <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-6 md:p-8 border border-slate-200 dark:border-slate-800/60 dark:border-slate-800">
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-500 dark:text-slate-400 mb-4 block font-heading">
                STAY UPDATED
              </span>
              <h3 className="text-xl font-bold text-[#0F172A] dark:text-white font-heading mb-3">
                Stay tuned
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 leading-relaxed">
                Get the latest automation insights, playbooks, and case studies delivered to your inbox. No spam, ever.
              </p>
              <NewsletterForm />
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Read by ops and engineering leads • Weekly • Unsubscribe anytime
              </p>
            </div>

            {/* Get In Touch / Founders */}
            <div>
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-500 dark:text-slate-400 mb-6 block font-heading">
                  GET IN TOUCH
                </span>
                <a href={`mailto:${COMPANY_INFO.channels.email}`} className="inline-flex items-center gap-2 mt-2 text-slate-700 dark:text-slate-300 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  <Mail className="w-5 h-5" />
                  {COMPANY_INFO.channels.email}
                </a>
              </div>

          </div>

          {/* Right Columns: Massive Sitemap Grid (Col-span 8) */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-8 gap-y-16">
            
            {/* Free Tools */}
            <div className="space-y-4">
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-500 dark:text-slate-400 block font-heading">
                FREE TOOLS
              </span>
              <ul className="space-y-3.5">
                <li>
                  <Link href="/#roi-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline flex items-center gap-1.5 transition-colors">
                    ROI &amp; Savings Calculator
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                      FREE
                    </span>
                  </Link>
                </li>
                {[
                  "Free AI Models Directory",
                  "AI Model Comparison",
                  "AI Model Pricing Index",
                  "AI Readiness Assessment",
                  "AI Budget Planner",
                  "Workflow Audit",
                  "AI Maturity Quiz",
                  "AI Use Case Generator",
                  "AI Tool Selector",
                  "Job Description Generator"
                ].map((item) => (
                  <li key={item}>
                    <span className="text-slate-400 dark:text-slate-500 font-medium cursor-default" title="Coming soon">
                      {item}
                    </span>
                  </li>
                ))}
                <li>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 dark:text-blue-500 mt-2 inline-block px-2 py-0.5 rounded-full border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/30">
                    COMING SOON
                  </span>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div className="space-y-4">
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-500 dark:text-slate-400 block font-heading">
                SERVICES
              </span>
              <ul className="space-y-3.5">
                {[
                  { label: "All Services", href: "/solutions" },
                  { label: "AI Strategy Consulting", href: "/solutions/ai-agents" },
                  { label: "AI Agent Development", href: "/solutions/ai-agents" },
                  { label: "Workflow Automation", href: "/solutions/ai-automation" },
                  { label: "Custom Automation", href: "/solutions/ai-automation" },
                  { label: "RAG Pipeline Development", href: "/solutions/ai-integration" },
                  { label: "SaaS MVP Development", href: "/solutions/software-web-development" },
                ].map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">
                      {item.label}
                    </Link>
                  </li>
                ))}
                {[
                  "AI Workshops",
                  "Engineer Placement",
                  "Custom Training",
                  "Maintenance & Support"
                ].map((item) => (
                  <li key={item}>
                    <span className="text-slate-400 dark:text-slate-500 font-medium cursor-default" title="Coming soon">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Platform Agencies */}
            <div className="space-y-4">
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-500 dark:text-slate-400 block font-heading">
                PLATFORM AGENCIES
              </span>
              <ul className="space-y-3.5">
                {[
                  "n8n Agency",
                  "Claude Code Agency",
                  "Cursor Agency",
                  "Codex Agency",
                  "Lovable Agency",
                  "Bubble Agency",
                  "Framer Agency",
                  "Supabase Agency",
                  "FlutterFlow Agency",
                  "Replit Agency",
                  "v0 Agency"
                ].map((item) => (
                  <li key={item}>
                    <span className="text-slate-400 dark:text-slate-500 font-medium cursor-default" title="Coming soon">
                      {item}
                    </span>
                  </li>
                ))}
                <li>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 dark:text-blue-500 mt-2 inline-block px-2 py-0.5 rounded-full border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/30">
                    COMING SOON
                  </span>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div className="space-y-4">
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-500 dark:text-slate-400 block font-heading">
                RESOURCES
              </span>
              <ul className="space-y-3.5">
                {[
                  { label: "Insights", href: "/insights" },
                  { label: "Contact Us", href: "/contact" },
                ].map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">
                      {item.label}
                    </Link>
                  </li>
                ))}
                {[
                  "Workflows",
                  "Industries",
                  "Blog",
                  "Case Studies",
                  "Playbooks",
                  "Courses",
                  "FAQ",
                  "Careers",
                ].map((item) => (
                  <li key={item}>
                    <span className="text-slate-400 dark:text-slate-500 font-medium cursor-default" title="Coming soon">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="pt-8">
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-500 dark:text-slate-400 block font-heading mb-4">
                  COMPANY
                </span>
                <Link href="/" className="flex items-center gap-2.5 mb-4 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-lg w-fit">
                  <motion.div 
                    initial={{ opacity: shouldReduceMotion ? 1 : 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="flex items-center justify-center transition-transform group-hover:scale-105"
                  >
                    <Image 
                      src="/logo.png" 
                      alt="ZENIVIXON Logo" 
                      width={32} 
                      height={32} 
                      className="object-contain rounded-md shadow-sm"
                    />
                  </motion.div>
                  <div className="py-1 -my-1">
                    <AnimatedLogoText />
                  </div>
                </Link>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-[200px]">
                  {COMPANY_INFO.positioning}
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Bar with Legal */}
        <div className="mt-20 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-slate-500 dark:text-slate-400">
          <div>
            &copy; {new Date().getFullYear()} {COMPANY_INFO.formalName}. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            {FOOTER_LINKS.legal.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="hover:text-blue-600 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
