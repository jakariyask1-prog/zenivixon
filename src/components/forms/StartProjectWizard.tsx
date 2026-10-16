"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Bot, Cpu, Network, Sparkles, CheckCircle2, ArrowRight, ArrowLeft, Send, Globe, Loader2, AlertCircle } from "lucide-react";
import { COMPANY_INFO } from "@/lib/constants";
import { projectBriefSchema, type ProjectBriefFormData } from "@/lib/validations";

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
  const searchParams = useSearchParams();
  const problemParam = searchParams?.get("problem") || "";
  
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    trigger,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ProjectBriefFormData>({
    resolver: zodResolver(projectBriefSchema),
    defaultValues: {
      projectType: "ai-agents",
      problemDescription: problemParam,
      currentTools: "",
      budget: "Open to Discussion / Discovery",
      timeline: "1-2 Months",
      projectFileUrl: "",
      name: "",
      email: "",
      phone: "",
      company: "",
      preferredChannel: "Email",
    },
    mode: "onTouched",
  });

  const projectType = useWatch({ control, name: "projectType" });
  const name = useWatch({ control, name: "name" });
  const email = useWatch({ control, name: "email" });
  const phone = useWatch({ control, name: "phone" });
  const budget = useWatch({ control, name: "budget" });
  const timeline = useWatch({ control, name: "timeline" });
  const preferredChannel = useWatch({ control, name: "preferredChannel" });
  const currentToolsValue = useWatch({ control, name: "currentTools" });

  const handleNext = async () => {
    let isStepValid = false;
    
    if (step === 1) {
      isStepValid = await trigger(["projectType"]);
    } else if (step === 2) {
      isStepValid = await trigger(["problemDescription", "currentTools", "projectFileUrl"]);
    }

    if (isStepValid) {
      setStep((s) => s + 1);
    }
  };

  const handleBack = () => setStep((s) => s - 1);

  const onSubmit = async (data: ProjectBriefFormData) => {
    setApiError(null);
    try {
      const res = await fetch("/api/project-brief", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const resData = await res.json();
      if (!res.ok || !resData.success) {
        throw new Error(resData.error || "Something went wrong. Please try again.");
      }
      setSubmitted(true);
    } catch (err) {
      setApiError(err instanceof Error ? err.message : "Failed to submit brief.");
    }
  };

  if (submitted) {
    return (
      <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800 text-center space-y-6 max-w-2xl mx-auto shadow-xl">
        <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <Badge variant="emerald" size="sm">
          BRIEF SUBMITTED
        </Badge>
        <h3 className="text-2xl sm:text-3xl font-bold text-[#0F172A] dark:text-white font-heading">
          Thank you, {name}.
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-lg mx-auto">
          We have received your project requirements. A technical architect from ZENIVIXON will review your current workflow and respond with an actionable solution proposal within 24 hours.
        </p>

        <div className="pt-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 space-y-1.5 text-left">
          <div className="font-semibold text-slate-900 dark:text-white">Summary of your brief:</div>
          <div>&bull; Focus Area: <span className="font-medium text-slate-800 dark:text-slate-200">{projectTypes.find((p) => p.id === projectType)?.title}</span></div>
          <div>&bull; Preferred Contact: <span className="font-medium text-slate-800 dark:text-slate-200">{preferredChannel || "Email"} ({email}{phone ? ` • ${phone}` : ""})</span></div>
          <div>&bull; Target Budget: <span className="font-medium text-slate-800 dark:text-slate-200">{budget || "Open to Discussion"}</span></div>
          <div>&bull; Timeline: <span className="font-medium text-slate-800 dark:text-slate-200">{timeline}</span></div>
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
              reset();
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
    <div className="rounded-3xl bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800 p-6 sm:p-10 max-w-3xl mx-auto shadow-xl">
      {/* Visual Step Progress Bar */}
      <div className="flex gap-2 mb-6">
        {[1, 2, 3].map((n) => (
          <div
            key={n}
            className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
              n <= step ? "bg-blue-600" : "bg-slate-200 dark:bg-slate-800"
            }`}
          />
        ))}
      </div>

      {/* Step Indicator */}
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-6 mb-8" aria-live="polite">
        <div className="flex items-center gap-3">
          <span className="w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">
            {step}
          </span>
          <span className="text-sm font-bold text-[#0F172A] dark:text-white font-heading">
            {step === 1 && "Select Focus Area"}
            {step === 2 && "Describe Your Problem & Current Tools"}
            {step === 3 && "Budget, Timeline & Contact Details"}
          </span>
        </div>
        <span className="text-xs font-heading text-slate-500 dark:text-slate-400 font-semibold">Step {step} of 3</span>
      </div>

      {/* Error Banner */}
      {apiError && (
        <div className="mb-4 flex items-start gap-2.5 p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-sm text-rose-700 dark:text-rose-300">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{apiError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Step 1: Select Type */}
        {step === 1 && (
          <div className="space-y-6">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              What primary AI capability are you looking to build or integrate?
            </p>
            
            <Controller
              name="projectType"
              control={control}
              render={({ field }) => (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" role="radiogroup" aria-label="Project Type Selection">
                  {projectTypes.map((type) => {
                    const isSelected = field.value === type.id;
                    return (
                      <div
                        key={type.id}
                        role="radio"
                        aria-checked={isSelected}
                        tabIndex={isSelected ? 0 : -1}
                        onClick={() => field.onChange(type.id)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            field.onChange(type.id);
                          }
                          const radios = Array.from(e.currentTarget.parentElement?.querySelectorAll('[role="radio"]') || []);
                          const index = radios.indexOf(e.currentTarget);
                          if (e.key === "ArrowDown" || e.key === "ArrowRight") {
                            e.preventDefault();
                            const next = radios[(index + 1) % radios.length] as HTMLElement;
                            next?.focus();
                            next?.click();
                          }
                          if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
                            e.preventDefault();
                            const prev = radios[(index - 1 + radios.length) % radios.length] as HTMLElement;
                            prev?.focus();
                            prev?.click();
                          }
                        }}
                        className={`p-5 rounded-2xl border cursor-pointer transition-all duration-200 flex flex-col justify-between focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                          isSelected
                            ? "bg-blue-50/50 dark:bg-blue-950/40 border-blue-600 text-[#0F172A] dark:text-white shadow-sm ring-1 ring-blue-600"
                            : "bg-[#F8FAFC] dark:bg-[#070e1e] border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-white dark:hover:bg-[#0b1120]"
                        }`}
                      >
                        <div>
                          <div className="mb-3">{type.icon}</div>
                          <h4 className="text-base font-bold font-heading mb-1 text-[#0F172A] dark:text-white">
                            {type.title}
                          </h4>
                          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                            {type.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            />
            {errors.projectType && <span className="text-xs text-red-500 font-medium">{errors.projectType.message}</span>}
            
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
              <label htmlFor="wizard-problem" className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                What problem are you trying to solve? *
              </label>
              <textarea
                id="wizard-problem"
                rows={4}
                placeholder="Describe your current manual bottleneck, repetitive task, or what you want the AI system to accomplish..."
                {...register("problemDescription")}
                className="w-full px-4 py-3 rounded-xl bg-[#F8FAFC] dark:bg-[#070e1e] border border-slate-200 dark:border-slate-800 text-[#0F172A] dark:text-white text-sm focus:outline-none focus:border-blue-600 focus:bg-white dark:focus:bg-[#0b1120] transition-all resize-none placeholder:text-slate-400"
              />
              {errors.problemDescription && <span className="text-xs text-red-500 font-medium">{errors.problemDescription.message}</span>}
            </div>

            <div className="space-y-2">
              <label htmlFor="wizard-tools" className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                What tools or databases does your team currently use?
              </label>
              <input
                id="wizard-tools"
                type="text"
                placeholder="e.g. HubSpot, PostgreSQL, Zendesk, Slack, internal custom CRM..."
                {...register("currentTools")}
                className="w-full px-4 py-3 rounded-xl bg-[#F8FAFC] dark:bg-[#070e1e] border border-slate-200 dark:border-slate-800 text-[#0F172A] dark:text-white text-sm focus:outline-none focus:border-blue-600 focus:bg-white dark:focus:bg-[#0b1120] transition-all placeholder:text-slate-400"
              />
              {/* Quick tool selector chips */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-xs text-slate-400 dark:text-slate-500 mr-1">Quick Add:</span>
                {["HubSpot", "PostgreSQL", "Zendesk", "Slack", "Shopify", "Salesforce", "Supabase", "Google Sheets"].map((tool) => (
                  <button
                    key={tool}
                    type="button"
                    onClick={() => {
                      const current = currentToolsValue || "";
                      if (!current.toLowerCase().includes(tool.toLowerCase())) {
                        const updated = current ? `${current}, ${tool}` : tool;
                        setValue("currentTools", updated, { shouldDirty: true });
                      }
                    }}
                    className="px-2.5 py-1 rounded-md text-xs bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
                  >
                    + {tool}
                  </button>
                ))}
              </div>
              {errors.currentTools && <span className="text-xs text-red-500 font-medium">{errors.currentTools.message}</span>}
            </div>

            <div className="space-y-2">
              <label htmlFor="wizard-file-url" className="text-sm font-semibold text-slate-800 dark:text-slate-200 flex items-center justify-between">
                <span>Project Specs / Figma / Drive Link</span>
                <span className="text-xs font-normal text-slate-400 dark:text-slate-500">Optional</span>
              </label>
              <input
                id="wizard-file-url"
                type="url"
                placeholder="e.g. https://drive.google.com/... or https://figma.com/..."
                {...register("projectFileUrl")}
                className="w-full px-4 py-3 rounded-xl bg-[#F8FAFC] dark:bg-[#070e1e] border border-slate-200 dark:border-slate-800 text-[#0F172A] dark:text-white text-sm focus:outline-none focus:border-blue-600 focus:bg-white dark:focus:bg-[#0b1120] transition-all placeholder:text-slate-400"
              />
              {errors.projectFileUrl && <span className="text-xs text-red-500 font-medium">{errors.projectFileUrl.message}</span>}
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
                <label htmlFor="wizard-name" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Your Name *
                </label>
                <input
                  id="wizard-name"
                  type="text"
                  autoComplete="name"
                  placeholder="e.g. Sarah Jenkins"
                  {...register("name")}
                  className="w-full px-4 py-3 rounded-xl bg-[#F8FAFC] dark:bg-[#070e1e] border border-slate-200 dark:border-slate-800 text-[#0F172A] dark:text-white text-sm focus:outline-none focus:border-blue-600 focus:bg-white dark:focus:bg-[#0b1120] transition-all placeholder:text-slate-400"
                />
                {errors.name && <span className="text-xs text-red-500 font-medium">{errors.name.message}</span>}
              </div>
              <div className="space-y-1.5">
                <label htmlFor="wizard-email" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Business Email *
                </label>
                <input
                  id="wizard-email"
                  type="email"
                  autoComplete="email"
                  placeholder="sarah@enterprise.com"
                  {...register("email")}
                  className="w-full px-4 py-3 rounded-xl bg-[#F8FAFC] dark:bg-[#070e1e] border border-slate-200 dark:border-slate-800 text-[#0F172A] dark:text-white text-sm focus:outline-none focus:border-blue-600 focus:bg-white dark:focus:bg-[#0b1120] transition-all placeholder:text-slate-400"
                />
                {errors.email && <span className="text-xs text-red-500 font-medium">{errors.email.message}</span>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="wizard-phone" className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                  <span>Phone / WhatsApp</span>
                  <span className="text-[10px] font-normal text-slate-400 dark:text-slate-500">Optional</span>
                </label>
                <input
                  id="wizard-phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="+1 (555) 000-0000 or +880 1..."
                  {...register("phone")}
                  className="w-full px-4 py-3 rounded-xl bg-[#F8FAFC] dark:bg-[#070e1e] border border-slate-200 dark:border-slate-800 text-[#0F172A] dark:text-white text-sm focus:outline-none focus:border-blue-600 focus:bg-white dark:focus:bg-[#0b1120] transition-all placeholder:text-slate-400"
                />
                {errors.phone && <span className="text-xs text-red-500 font-medium">{errors.phone.message}</span>}
              </div>

              <div className="space-y-1.5">
                <label htmlFor="wizard-company" className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                  <span>Company Name</span>
                  <span className="text-[10px] font-normal text-slate-400 dark:text-slate-500">Optional</span>
                </label>
                <input
                  id="wizard-company"
                  type="text"
                  autoComplete="organization"
                  placeholder="e.g. Apex Logistics"
                  {...register("company")}
                  className="w-full px-4 py-3 rounded-xl bg-[#F8FAFC] dark:bg-[#070e1e] border border-slate-200 dark:border-slate-800 text-[#0F172A] dark:text-white text-sm focus:outline-none focus:border-blue-600 focus:bg-white dark:focus:bg-[#0b1120] transition-all placeholder:text-slate-400"
                />
                {errors.company && <span className="text-xs text-red-500 font-medium">{errors.company.message}</span>}
              </div>
            </div>

            {/* Budget & Timeline */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="wizard-budget" className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                  <span>Estimated Budget</span>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">Discussion &amp; Flexible</span>
                </label>
                <select
                  id="wizard-budget"
                  {...register("budget")}
                  className="w-full px-4 py-3 rounded-xl bg-[#F8FAFC] dark:bg-[#070e1e] border border-slate-200 dark:border-slate-800 text-[#0F172A] dark:text-white text-sm focus:outline-none focus:border-blue-600 focus:bg-white dark:focus:bg-[#0b1120] transition-all"
                >
                  <option value="Open to Discussion / Discovery" className="bg-white dark:bg-[#070e1e]">
                    Open to Discussion / Free Discovery (Recommended)
                  </option>
                  <option value="< $500" className="bg-white dark:bg-[#070e1e]">
                    &lt; $500 (Starter POC / Small Automation / Script)
                  </option>
                  <option value="$500 - $1,500" className="bg-white dark:bg-[#070e1e]">
                    $500 - $1,500 (MVP / Business Workflow Automation)
                  </option>
                  <option value="$1,500 - $3,000" className="bg-white dark:bg-[#070e1e]">
                    $1,500 - $3,000 (Custom AI Agents &amp; Modern Web App)
                  </option>
                  <option value="$3,000 - $5,000+" className="bg-white dark:bg-[#070e1e]">
                    $3,000 - $5,000+ (Full System Integration &amp; Scaling)
                  </option>
                  <option value="Flexible / Scope-based" className="bg-white dark:bg-[#070e1e]">
                    Flexible / Based on Technical Scope
                  </option>
                </select>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  No fixed commitment required. We discuss and finalize the best price during discovery.
                </p>
                {errors.budget && <span className="text-xs text-red-500 font-medium">{errors.budget.message}</span>}
              </div>

              <div className="space-y-1.5">
                <label htmlFor="wizard-timeline" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Target Timeline
                </label>
                <select
                  id="wizard-timeline"
                  {...register("timeline")}
                  className="w-full px-4 py-3 rounded-xl bg-[#F8FAFC] dark:bg-[#070e1e] border border-slate-200 dark:border-slate-800 text-[#0F172A] dark:text-white text-sm focus:outline-none focus:border-blue-600 focus:bg-white dark:focus:bg-[#0b1120] transition-all"
                >
                  <option value="Urgent (< 1 month)" className="bg-white dark:bg-[#070e1e]">Urgent (&lt; 1 month)</option>
                  <option value="1-2 Months" className="bg-white dark:bg-[#070e1e]">1-2 Months</option>
                  <option value="3+ Months" className="bg-white dark:bg-[#070e1e]">3+ Months</option>
                  <option value="Flexible / Discovery" className="bg-white dark:bg-[#070e1e]">Flexible / Discovery</option>
                </select>
                {errors.timeline && <span className="text-xs text-red-500 font-medium">{errors.timeline.message}</span>}
              </div>
            </div>

            {/* Preferred Contact Channel */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
                Preferred Contact Channel
              </label>
              <Controller
                name="preferredChannel"
                control={control}
                render={({ field }) => (
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: "Email", label: "Email" },
                      { id: "WhatsApp", label: "WhatsApp" },
                      { id: "Phone Call", label: "Phone" },
                    ].map((ch) => (
                      <button
                        key={ch.id}
                        type="button"
                        onClick={() => field.onChange(ch.id)}
                        className={`py-3 px-2 rounded-xl border text-xs font-medium flex items-center justify-center gap-1 transition-all cursor-pointer ${
                          field.value === ch.id
                            ? "bg-blue-50 dark:bg-blue-950/50 border-blue-600 text-blue-700 dark:text-blue-300 font-bold shadow-xs ring-1 ring-blue-600"
                            : "bg-[#F8FAFC] dark:bg-[#070e1e] border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-[#0b1120]"
                        }`}
                      >
                        <span>{ch.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              />
              {errors.preferredChannel && <span className="text-xs text-red-500 font-medium">{errors.preferredChannel.message}</span>}
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
                disabled={isSubmitting}
                icon={isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              >
                {isSubmitting ? "Submitting..." : "Submit Project Brief"}
              </Button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
