"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Bot, Cpu, Network, Sparkles, CheckCircle2, ArrowRight, ArrowLeft, Send, Globe, Loader2, AlertCircle } from "lucide-react";
import { COMPANY_INFO } from "@/lib/constants";

const projectTypes = [
  {
    id: "ai-agents",
    title: "AI Agents & 24/7 Customer Support",
    desc: "Autonomous agents handling customer support, internal knowledge, or lead triage.",
    icon: <Bot className="w-5 h-5 text-blue-600" />,
  },
  {
    id: "ai-automation",
    title: "Intelligent AI Workflow Automation",
    desc: "Automating document pipelines, invoices, ERP reconciliation, and reporting.",
    icon: <Cpu className="w-5 h-5 text-cyan-600" />,
  },
  {
    id: "software-web-development",
    title: "Custom Software & Web Development",
    desc: "Modern Next.js/React web platforms, custom SaaS applications, and AI software.",
    icon: <Globe className="w-5 h-5 text-indigo-600" />,
  },
  {
    id: "ai-integration",
    title: "AI Integration & Vector RAG",
    desc: "Embedding RAG, vector search, or AI capabilities into existing CRM/databases.",
    icon: <Network className="w-5 h-5 text-purple-600" />,
  },
  {
    id: "custom-system",
    title: "Comprehensive Architecture Audit",
    desc: "Consultation on identifying AI opportunities across multiple business workflows.",
    icon: <Sparkles className="w-5 h-5 text-emerald-600" />,
  },
];

export function StartProjectWizard() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    projectType: "ai-agents",
    problemDescription: "",
    currentTools: "",
    timeline: "1-2 Months",
    name: "",
    email: "",
    company: "",
    preferredChannel: "Email",
  });

  const handleNext = () => setStep((s) => s + 1);
  const handleBack = () => setStep((s) => s - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/project-brief", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit brief.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200 dark:border-slate-800 text-center space-y-6 max-w-2xl mx-auto shadow-xl">
        <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <Badge variant="emerald" size="sm">
          BRIEF SUBMITTED
        </Badge>
        <h3 className="text-2xl sm:text-3xl font-bold text-[#0F172A] dark:text-white font-heading">
          Thank you, {formData.name}.
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-lg mx-auto">
          We have received your project requirements. A technical architect from ZENIVIXON will review your current workflow and respond with an actionable solution proposal within 24 hours.
        </p>

        <div className="pt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 space-y-1 text-left">
          <div className="font-semibold text-slate-800">Summary of your brief:</div>
          <div>&bull; Focus Area: {projectTypes.find((p) => p.id === formData.projectType)?.title}</div>
          <div>&bull; Preferred Contact: {formData.email}</div>
          <div>&bull; Timeline: {formData.timeline}</div>
        </div>

        <div className="pt-4 flex flex-wrap justify-center gap-3">
          <Button
            variant="whatsapp"
            size="md"
            href={COMPANY_INFO.channels.whatsapp}
            external
          >
            Fast Track via WhatsApp
          </Button>
          <Button
            variant="secondary"
            size="md"
            onClick={() => {
              setFormData({
                projectType: "ai-agents",
                problemDescription: "",
                currentTools: "",
                timeline: "1-2 Months",
                name: "",
                email: "",
                company: "",
                preferredChannel: "Email",
              });
              setStep(1);
              setSubmitted(false);
            }}
          >
            Submit Another Brief
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl bg-white border border-slate-200 dark:border-slate-800 p-6 sm:p-10 max-w-3xl mx-auto shadow-xl">
      {/* Visual Step Progress Bar */}
      <div className="flex gap-2 mb-6">
        {[1, 2, 3].map((n) => (
          <div
            key={n}
            className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
              n <= step ? "bg-blue-600" : "bg-slate-200"
            }`}
          />
        ))}
      </div>

      {/* Step Indicator */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-6 mb-8" aria-live="polite">
        <div className="flex items-center gap-3">
          <span className="w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">
            {step}
          </span>
          <span className="text-sm font-bold text-[#0F172A] dark:text-white font-heading">
            {step === 1 && "Select Focus Area"}
            {step === 2 && "Describe Your Problem & Current Tools"}
            {step === 3 && "Contact & Timeline Details"}
          </span>
        </div>
        <span className="text-xs font-heading text-slate-500 dark:text-slate-400 font-semibold">Step {step} of 3</span>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="mb-4 flex items-start gap-2.5 p-4 rounded-xl bg-rose-50 border border-rose-200 text-sm text-rose-700">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Step 1: Select Type */}
        {step === 1 && (
          <div className="space-y-6">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              What primary AI capability are you looking to build or integrate?
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" role="radiogroup" aria-label="Project Type Selection">
              {projectTypes.map((type) => {
                const isSelected = formData.projectType === type.id;
                return (
                  <div
                    key={type.id}
                    role="radio"
                    aria-checked={isSelected}
                    tabIndex={0}
                    onClick={() => setFormData({ ...formData, projectType: type.id })}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setFormData({ ...formData, projectType: type.id });
                      }
                    }}
                    className={`p-5 rounded-2xl border cursor-pointer transition-all duration-200 flex flex-col justify-between focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                      isSelected
                        ? "bg-blue-50/50 border-blue-600 text-[#0F172A] dark:text-white shadow-sm ring-1 ring-blue-600"
                        : "bg-[#F8FAFC] border-slate-200 text-slate-800 hover:border-slate-300 hover:bg-white"
                    }`}
                  >
                    <div>
                      <div className="mb-3">{type.icon}</div>
                      <h4 className="text-sm font-bold font-heading mb-1 text-[#0F172A] dark:text-white">
                        {type.title}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                        {type.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="pt-4 flex justify-end">
              <Button
                type="button"
                variant="primary"
                size="md"
                onClick={handleNext}
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Next Step
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Problem Description */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="wizard-problem" className="text-sm font-semibold text-slate-800">
                What problem are you trying to solve? *
              </label>
              <textarea
                id="wizard-problem"
                required
                rows={4}
                value={formData.problemDescription}
                onChange={(e) =>
                  setFormData({ ...formData, problemDescription: e.target.value })
                }
                placeholder="Describe your current manual bottleneck, repetitive task, or what you want the AI system to accomplish..."
                className="w-full px-4 py-3 rounded-xl bg-[#F8FAFC] border border-slate-200 dark:border-slate-800 text-[#0F172A] dark:text-white text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-all resize-none placeholder:text-slate-400"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="wizard-tools" className="text-sm font-semibold text-slate-800">
                What tools or databases does your team currently use?
              </label>
              <input
                id="wizard-tools"
                type="text"
                value={formData.currentTools}
                onChange={(e) =>
                  setFormData({ ...formData, currentTools: e.target.value })
                }
                placeholder="e.g. HubSpot, PostgreSQL, Zendesk, Slack, internal custom CRM..."
                className="w-full px-4 py-3 rounded-xl bg-[#F8FAFC] border border-slate-200 dark:border-slate-800 text-[#0F172A] dark:text-white text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-all placeholder:text-slate-400"
              />
            </div>

            <div className="pt-4 flex items-center justify-between">
              <Button
                type="button"
                variant="ghost"
                size="md"
                onClick={handleBack}
                icon={<ArrowLeft className="w-4 h-4" />}
                iconPosition="left"
              >
                Back
              </Button>
              <Button
                type="button"
                variant="primary"
                size="md"
                onClick={handleNext}
                disabled={!formData.problemDescription.trim()}
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Next Step
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Contact & Submit */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="wizard-name" className="text-xs font-semibold text-slate-700">
                  Your Name *
                </label>
                <input
                  id="wizard-name"
                  type="text"
                  required
                  autoComplete="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Sarah Jenkins"
                  className="w-full px-4 py-3 rounded-xl bg-[#F8FAFC] border border-slate-200 dark:border-slate-800 text-[#0F172A] dark:text-white text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-all placeholder:text-slate-400"
                />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="wizard-email" className="text-xs font-semibold text-slate-700">
                  Business Email *
                </label>
                <input
                  id="wizard-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="sarah@enterprise.com"
                  className="w-full px-4 py-3 rounded-xl bg-[#F8FAFC] border border-slate-200 dark:border-slate-800 text-[#0F172A] dark:text-white text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-all placeholder:text-slate-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="wizard-company" className="text-xs font-semibold text-slate-700">
                  Company Name
                </label>
                <input
                  id="wizard-company"
                  type="text"
                  autoComplete="organization"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="e.g. Apex Logistics"
                  className="w-full px-4 py-3 rounded-xl bg-[#F8FAFC] border border-slate-200 dark:border-slate-800 text-[#0F172A] dark:text-white text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-all placeholder:text-slate-400"
                />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="wizard-timeline" className="text-xs font-semibold text-slate-700">
                  Target Timeline
                </label>
                <select
                  id="wizard-timeline"
                  value={formData.timeline}
                  onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#F8FAFC] border border-slate-200 dark:border-slate-800 text-[#0F172A] dark:text-white text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
                >
                  <option value="Urgent (< 1 month)">Urgent (&lt; 1 month)</option>
                  <option value="1-2 Months">1-2 Months</option>
                  <option value="3+ Months">3+ Months</option>
                  <option value="Flexible / Discovery">Flexible / Discovery</option>
                </select>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <Button
                type="button"
                variant="ghost"
                size="md"
                onClick={handleBack}
                icon={<ArrowLeft className="w-4 h-4" />}
                iconPosition="left"
              >
                Back
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="md"
                disabled={loading}
                icon={loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              >
                {loading ? "Submitting..." : "Submit Project Brief"}
              </Button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
