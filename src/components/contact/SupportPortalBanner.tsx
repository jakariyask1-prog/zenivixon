import React from "react";
import { COMPANY_INFO } from "@/lib/constants";
import { ArrowRight, Sparkles } from "lucide-react";

export function SupportPortalBanner() {
  const supportUrl = COMPANY_INFO.channels.supportPortal || "https://support.zenivixon.com";

  return (
    <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800 p-8 sm:p-12 text-center shadow-xl shadow-slate-200/50 dark:shadow-2xl dark:shadow-slate-950/30 transition-all duration-300">
      {/* Background ambient lighting */}
      <div 
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/10 dark:bg-blue-600/15 rounded-full blur-3xl transition-colors duration-300" 
      />
      <div 
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 right-10 w-72 h-72 bg-indigo-600/5 dark:bg-indigo-600/10 rounded-full blur-3xl transition-colors duration-300" 
      />

      <div className="relative z-10 max-w-3xl mx-auto space-y-5">
        {/* Status Indicator Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 text-xs font-semibold shadow-sm transition-colors duration-300">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 dark:bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-heading tracking-wide uppercase text-[11px] text-emerald-600 dark:text-emerald-400 font-bold transition-colors duration-300">24/7 Live AI Engine</span>
          <span className="text-slate-300 dark:text-slate-600 transition-colors duration-300">|</span>
          <span className="text-slate-700 dark:text-slate-300 flex items-center gap-1 transition-colors duration-300">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400 transition-colors duration-300" />
            Instant Ticket Resolution
          </span>
        </div>

        {/* Heading */}
        <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] dark:text-white tracking-tight font-heading leading-snug transition-colors duration-300">
          জরুরি টেকনিক্যাল সাপোর্ট বা টিকেট সাবমিট করতে চান?
        </h3>

        {/* Description */}
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto transition-colors duration-300">
          আমাদের স্বয়ংক্রিয় এআই সাপোর্ট ইঞ্জিনের মাধ্যমে সাথে সাথে সমাধান ও টিকেট ট্র্যাক করুন।
        </p>

        {/* Action Button */}
        <div className="pt-2">
          <a
            href={supportUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-sm sm:text-base shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] transition-all duration-200 border border-blue-400/20"
          >
            <span className="text-base" role="img" aria-label="ticket">🎫</span>
            <span>Go to ZENIVIXON Support Portal</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </div>
  );
}
