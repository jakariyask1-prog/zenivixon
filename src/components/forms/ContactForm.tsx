"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { contactFormSchema, type ContactFormData } from "@/lib/validations";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submittedName, setSubmittedName] = useState("");
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      service: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setApiError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const resData = await response.json();

      if (!response.ok || !resData.success) {
        throw new Error(resData.error || "Failed to send message. Please try again.");
      }

      setSubmittedName(data.name);
      reset();
      setSubmitted(true);
    } catch (err) {
      setApiError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  if (submitted) {
    return (
      <div className="p-8 rounded-2xl bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800 text-center space-y-4 shadow-sm">
        <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold text-[#0F172A] dark:text-white font-heading">
          Message Received
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
          Thank you for reaching out, {submittedName || "there"}. An engineer from ZENIVIXON will review your inquiry and get back to you within 24 hours.
        </p>
        <button
          type="button"
          onClick={() => {
            setApiError(null);
            setSubmitted(false);
          }}
          className="text-xs text-blue-600 dark:text-blue-400 hover:underline pt-2 font-medium cursor-pointer"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      {apiError && (
        <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/50 text-red-700 dark:text-red-300 text-xs flex items-center gap-2 border border-red-200 dark:border-red-900">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{apiError}</span>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label htmlFor="contact-name" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            Your Name *
          </label>
          <input
            id="contact-name"
            type="text"
            autoComplete="name"
            placeholder="e.g. Alex Morgan"
            {...register("name")}
            className="w-full px-4 py-3 rounded-xl bg-[#F8FAFC] dark:bg-[#070e1e] border border-slate-200 dark:border-slate-800 text-[#0F172A] dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 focus:bg-white dark:focus:bg-[#0b1120] transition-all placeholder:text-slate-400"
          />
          {errors.name && <span className="text-[10px] text-red-500">{errors.name.message}</span>}
        </div>
        <div className="space-y-1.5">
          <label htmlFor="contact-email" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            Business Email *
          </label>
          <input
            id="contact-email"
            type="email"
            autoComplete="email"
            placeholder="alex@company.com"
            {...register("email")}
            className="w-full px-4 py-3 rounded-xl bg-[#F8FAFC] dark:bg-[#070e1e] border border-slate-200 dark:border-slate-800 text-[#0F172A] dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 focus:bg-white dark:focus:bg-[#0b1120] transition-all placeholder:text-slate-400"
          />
          {errors.email && <span className="text-[10px] text-red-500">{errors.email.message}</span>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label htmlFor="contact-company" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            Company Name
          </label>
          <input
            id="contact-company"
            type="text"
            autoComplete="organization"
            placeholder="e.g. Acme Technologies Ltd"
            {...register("company")}
            className="w-full px-4 py-3 rounded-xl bg-[#F8FAFC] dark:bg-[#070e1e] border border-slate-200 dark:border-slate-800 text-[#0F172A] dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 focus:bg-white dark:focus:bg-[#0b1120] transition-all placeholder:text-slate-400"
          />
          {errors.company && <span className="text-[10px] text-red-500">{errors.company.message}</span>}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="contact-service" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            Service / Interest
          </label>
          <select
            id="contact-service"
            {...register("service")}
            className="w-full px-4 py-3 rounded-xl bg-[#F8FAFC] dark:bg-[#070e1e] border border-slate-200 dark:border-slate-800 text-[#0F172A] dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 focus:bg-white dark:focus:bg-[#0b1120] transition-all"
          >
            <option value="" className="text-slate-400 bg-white dark:bg-[#070e1e]">Select a service / topic...</option>
            <option value="AI Agents & 24/7 Support" className="bg-white dark:bg-[#070e1e]">AI Agents &amp; 24/7 Support</option>
            <option value="AI Workflow & Business Automation" className="bg-white dark:bg-[#070e1e]">AI Workflow &amp; Business Automation</option>
            <option value="Custom Software & Web Development" className="bg-white dark:bg-[#070e1e]">Custom Software &amp; Web Development</option>
            <option value="AI System Integration & Vector RAG" className="bg-white dark:bg-[#070e1e]">AI System Integration &amp; Vector RAG</option>
            <option value="Architecture Audit & Consultation" className="bg-white dark:bg-[#070e1e]">Architecture Audit &amp; Consultation</option>
            <option value="Other Inquiry" className="bg-white dark:bg-[#070e1e]">Other Inquiry</option>
          </select>
          {errors.service && <span className="text-[10px] text-red-500">{errors.service.message}</span>}
        </div>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="contact-message" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
          How can we help? *
        </label>
        <textarea
          id="contact-message"
          maxLength={5000}
          rows={4}
          placeholder="Describe what you are trying to solve..."
          {...register("message")}
          className="w-full px-4 py-3 rounded-xl bg-[#F8FAFC] dark:bg-[#070e1e] border border-slate-200 dark:border-slate-800 text-[#0F172A] dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 focus:bg-white dark:focus:bg-[#0b1120] transition-all resize-none placeholder:text-slate-400"
        />
        {errors.message && <span className="text-[10px] text-red-500">{errors.message.message}</span>}
      </div>

      <Button
        type="submit"
        variant="primary"
        size="md"
        disabled={isSubmitting}
        icon={isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
        className="w-full justify-center shadow-md shadow-blue-600/15 cursor-pointer disabled:opacity-70"
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
