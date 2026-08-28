"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, CheckCircle2, ArrowRight, Loader2, Video, ShieldCheck } from "lucide-react";
import { Button } from "./Button";
import { Badge } from "./Badge";

interface FreeAuditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FreeAuditModal({ isOpen, onClose }: FreeAuditModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [currentTools, setCurrentTools] = useState("");
  const [problemDescription, setProblemDescription] = useState("");

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !problemDescription.trim()) {
      setErrorMsg("Please fill in your name, work email, and main workflow bottleneck.");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/project-brief", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectType: "FREE 3-MIN VIDEO AUDIT & BLUEPRINT",
          name,
          email,
          company,
          currentTools,
          problemDescription,
          timeline: "Within 24 Hours",
          preferredChannel: "Email Video Teardown",
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        setErrorMsg(data.error || "Failed to submit. Please try again.");
      }
    } catch {
      setErrorMsg("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setCompany("");
    setCurrentTools("");
    setProblemDescription("");
    setSubmitted(false);
    setErrorMsg("");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-md transition-opacity"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg bg-white dark:bg-[#0b1120] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden z-10 my-8"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors z-20 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              <div className="p-8 sm:p-10 text-center space-y-6">
                <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-[#0F172A] dark:text-white font-heading">
                    Audit Request Received!
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-sm mx-auto">
                    Our lead AI engineer will analyze your workflow bottlenecks and record your custom <strong>3-minute Loom video teardown</strong> within 24 hours.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#070e1e] border border-slate-200/80 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 flex items-center justify-center gap-2">
                  <Video className="w-4 h-4 text-blue-500" />
                  Sent directly to: <span className="font-mono font-bold text-slate-700 dark:text-slate-200">{email}</span>
                </div>

                <Button variant="primary" size="md" className="w-full" onClick={handleReset}>
                  Done
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
                {/* Header */}
                <div className="space-y-2 pr-8">
                  <Badge variant="blue" size="sm" className="font-semibold text-xs gap-1.5">
                    <Video className="w-3.5 h-3.5" />
                    FREE 3-MIN VIDEO AUDIT
                  </Badge>
                  <h3 className="text-2xl font-bold text-[#0F172A] dark:text-white font-heading">
                    Get Your Custom Automation Teardown
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    Share your current workflow bottleneck. We&apos;ll record a bespoke 3-minute video showing where AI agents can save you 10+ hours/week.
                  </p>
                </div>

                {errorMsg && (
                  <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 text-xs font-medium">
                    {errorMsg}
                  </div>
                )}

                {/* Form Fields */}
                <div className="space-y-3.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Alex Morgan"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl text-sm bg-slate-50 dark:bg-[#070e1e] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="alex@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl text-sm bg-slate-50 dark:bg-[#070e1e] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        Company / Website
                      </label>
                      <input
                        type="text"
                        placeholder="company.com"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl text-sm bg-slate-50 dark:bg-[#070e1e] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        Current Tools Used
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. HubSpot, Slack, Sheets"
                        value={currentTools}
                        onChange={(e) => setCurrentTools(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl text-sm bg-slate-50 dark:bg-[#070e1e] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      What repetitive task or bottleneck is slowing your team down? *
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder="e.g. Manually qualifying leads from our forms, copying invoice details into accounting, answering repetitive tickets..."
                      value={problemDescription}
                      onChange={(e) => setProblemDescription(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl text-sm bg-slate-50 dark:bg-[#070e1e] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none"
                    />
                  </div>
                </div>

                {/* Trust Note */}
                <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>100% Free. No spam, no sales pitch. 24-hour turnaround.</span>
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  variant="glowing"
                  size="md"
                  disabled={loading}
                  className="w-full justify-center cursor-pointer"
                  icon={loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
                >
                  {loading ? "Submitting Request..." : "Get Free 3-Min Video Teardown"}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
