"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
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
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProjectBriefFormData>({
    resolver: zodResolver(projectBriefSchema),
    defaultValues: {
      projectType: "ai-agents",
      problemDescription: problemParam,
      currentTools: "",
      timeline: "1-2 Months",
      name: "",
      email: "",
      company: "",
      preferredChannel: "Email",
    },
    mode: "onTouched",
  });

  const projectType = watch("projectType");
  const name = watch("name");
  const email = watch("email");
  const timeline = watch("timeline");

  const handleNext = async () => {
    let isStepValid = false;
    
    if (step === 1) {
      isStepValid = await trigger(["projectType"]);
    } else if (step === 2) {
      isStepValid = await trigger(["problemDescription", "currentTools"]);
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
      <div className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200 dark:border-slate-800 text-center space-y-6 max-w-2xl mx-auto shadow-xl">
        <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto">
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

        <div className="pt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 space-y-1 text-left">
          <div className="font-semibold text-slate-800">Summary of your brief:</div>
          <div>&bull; Focus Area: {projectTypes.find((p) => p.id === projectType)?.title}</div>
          <div>&bull; Preferred Contact: {email}</div>
          <div>&bull; Timeline: {timeline}</div>
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
      {apiError && (
        <div className="mb-4 flex items-start gap-2.5 p-4 rounded-xl bg-rose-50 border border-rose-200 text-sm text-rose-700">
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
                            ? "bg-blue-50/50 border-blue-600 text-[#0F172A] dark:text-white shadow-sm ring-1 ring-blue-600"
                            : "bg-[#F8FAFC] dark:bg-[#070e1e] border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-white dark:hover:bg-[#0b1120]"
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
              )}
            />
            {errors.projectType && <span className="text-[10px] text-red-500">{errors.projectType.message}</span>}
            
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
                rows={4}
                placeholder="Describe your current manual bottleneck, repetitive task, or what you want the AI system to accomplish..."
                {...register("problemDescription")}
                className="w-full px-4 py-3 rounded-xl bg-[#F8FAFC] dark:bg-[#070e1e] border border-slate-200 dark:border-slate-800 text-[#0F172A] dark:text-white text-sm focus:outline-none focus:border-blue-600 focus:bg-white dark:focus:bg-[#0b1120] transition-all resize-none placeholder:text-slate-400"
              />
              {errors.problemDescription && <span className="text-[10px] text-red-500">{errors.problemDescription.message}</span>}
            </div>

            <div className="space-y-2">
              <label htmlFor="wizard-tools" className="text-sm font-semibold text-slate-800">
                What tools or databases does your team currently use?
              </label>
              <input
                id="wizard-tools"
                type="text"
                placeholder="e.g. HubSpot, PostgreSQL, Zendesk, Slack, internal custom CRM..."
                {...register("currentTools")}
                className="w-full px-4 py-3 rounded-xl bg-[#F8FAFC] dark:bg-[#070e1e] border border-slate-200 dark:border-slate-800 text-[#0F172A] dark:text-white text-sm focus:outline-none focus:border-blue-600 focus:bg-white dark:focus:bg-[#0b1120] transition-all placeholder:text-slate-400"
              />
              {errors.currentTools && <span className="text-[10px] text-red-500">{errors.currentTools.message}</span>}
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
                <label htmlFor="wizard-name" className="text-xs font-semibold text-slate-700">
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
                {errors.name && <span className="text-[10px] text-red-500">{errors.name.message}</span>}
              </div>
              <div className="space-y-1.5">
                <label htmlFor="wizard-email" className="text-xs font-semibold text-slate-700">
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
                {errors.email && <span className="text-[10px] text-red-500">{errors.email.message}</span>}
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
                  placeholder="e.g. Apex Logistics"
                  {...register("company")}
                  className="w-full px-4 py-3 rounded-xl bg-[#F8FAFC] dark:bg-[#070e1e] border border-slate-200 dark:border-slate-800 text-[#0F172A] dark:text-white text-sm focus:outline-none focus:border-blue-600 focus:bg-white dark:focus:bg-[#0b1120] transition-all placeholder:text-slate-400"
                />
                {errors.company && <span className="text-[10px] text-red-500">{errors.company.message}</span>}
              </div>
              <div className="space-y-1.5">
                <label htmlFor="wizard-timeline" className="text-xs font-semibold text-slate-700">
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
                {errors.timeline && <span className="text-[10px] text-red-500">{errors.timeline.message}</span>}
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
