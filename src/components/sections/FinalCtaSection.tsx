"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, MessageSquare, Clock, ShieldCheck, Mail, Sparkles, Send } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { COMPANY_INFO } from "@/lib/constants";

export function FinalCtaSection() {
  const router = useRouter();
  const [problemSummary, setProblemSummary] = useState("");

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (problemSummary.trim()) {
      router.push(`/start-a-project?problem=${encodeURIComponent(problemSummary.trim())}`);
    } else {
      router.push("/start-a-project");
    }
  };

  return (
    <section className="py-20 md:py-32 border-t border-slate-200/80 dark:border-slate-800/80 bg-[#F1F5F9] dark:bg-[#020817] relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Section Heading */}
          <div className="text-center space-y-5">
            <Badge variant="blue" size="md" className="font-semibold text-xs tracking-widest">
              PROBLEM-FIRST INTAKE
            </Badge>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0F172A] dark:text-white tracking-tight font-heading leading-tight">
              Tell Us What You&apos;re Trying to Solve.
            </h2>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed font-normal">
              You don&apos;t need to figure out the AI models, frameworks, or architecture first. Simply tell us your operational challenge, workflow bottleneck, or automation goal—we will design the right system for you.
            </p>
          </div>

          {/* Direct Interactive Problem Launcher Box */}
          <div className="rounded-3xl bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800 p-6 sm:p-8 md:p-10 shadow-lg shadow-slate-200/60 dark:shadow-none max-w-3xl mx-auto transition-colors duration-300">
            <form onSubmit={handleQuickSubmit} className="space-y-4">
              <label htmlFor="problem-input" className="block text-sm font-bold text-[#0F172A] dark:text-white font-heading">
                Describe your business bottleneck, manual process, or AI idea:
              </label>
              <div className="relative">
                <textarea
                  id="problem-input"
                  rows={3}
                  value={problemSummary}
                  onChange={(e) => setProblemSummary(e.target.value)}
                  placeholder="e.g. Our operations team spends 20 hours a week extracting supplier invoice line items and manually entering them into NetSuite..."
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 p-4 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 dark:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all resize-none font-sans"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                  <span>We evaluate requirements &amp; respond with a practical architecture plan.</span>
                </div>
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  icon={<Send className="w-4 h-4" />}
                  className="w-full sm:w-auto font-semibold px-6 py-3 shrink-0"
                >
                  Start Your AI Project
                </Button>
              </div>
            </form>
          </div>

          {/* 5-Step Frictionless Journey Flow */}
          <div className="max-w-3xl mx-auto pt-4">
            <div className="text-center mb-6">
              <span className="text-xs font-heading font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                How The Process Works
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800/80 dark:border-slate-800 shadow-xs">
                <span className="text-xs font-heading font-bold text-blue-600 dark:text-blue-400 block mb-1">01</span>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 font-heading block">Describe</span>
                <span className="text-xs text-slate-500 dark:text-slate-400 leading-tight block mt-0.5">Your problem</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800/80 dark:border-slate-800 shadow-xs">
                <span className="text-xs font-heading font-bold text-cyan-600 dark:text-cyan-400 block mb-1">02</span>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 font-heading block">Review</span>
                <span className="text-xs text-slate-500 dark:text-slate-400 leading-tight block mt-0.5">By engineers</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800/80 dark:border-slate-800 shadow-xs">
                <span className="text-xs font-heading font-bold text-indigo-600 dark:text-indigo-400 block mb-1">03</span>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 font-heading block">Response</span>
                <span className="text-xs text-slate-500 dark:text-slate-400 leading-tight block mt-0.5">&lt; 24h turnaround</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800/80 dark:border-slate-800 shadow-xs">
                <span className="text-xs font-heading font-bold text-purple-600 dark:text-purple-400 block mb-1">04</span>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 font-heading block">Discussion</span>
                <span className="text-xs text-slate-500 dark:text-slate-400 leading-tight block mt-0.5">Architecture call</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800/80 dark:border-slate-800 shadow-xs col-span-2 sm:col-span-1">
                <span className="text-xs font-heading font-bold text-emerald-600 dark:text-emerald-400 block mb-1">05</span>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 font-heading block">Solution</span>
                <span className="text-xs text-slate-500 dark:text-slate-400 leading-tight block mt-0.5">Working system</span>
              </div>
            </div>
          </div>

          {/* Alternative Quick Contact Channels */}
          <div className="pt-6 text-center space-y-4 max-w-xl mx-auto">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <Button
                variant="whatsapp"
                size="lg"
                href={COMPANY_INFO.channels.whatsapp}
                external
                icon={<MessageSquare className="w-4 h-4" />}
                iconPosition="left"
                className="w-full sm:w-auto text-sm px-6 py-3.5 shadow-md shadow-emerald-600/20 font-semibold"
              >
                Chat on WhatsApp Business
              </Button>
              <Button
                variant="secondary"
                size="lg"
                href="/contact"
                icon={<ArrowRight className="w-4 h-4" />}
                className="w-full sm:w-auto text-sm px-6 py-3.5 font-semibold"
              >
                Direct Inquiry Form
              </Button>
            </div>

            {/* Direct Channels Quick List */}
            <div className="pt-6 border-t border-slate-200/90 dark:border-slate-800 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                <span>Fast human response within 24 hours</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>Strict NDA &amp; data privacy</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                <a href={`mailto:${COMPANY_INFO.channels.email}`} className="hover:text-blue-600 dark:hover:text-blue-400 underline font-medium">
                  {COMPANY_INFO.channels.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
