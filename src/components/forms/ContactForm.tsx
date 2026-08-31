"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submittedName, setSubmittedName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError("Please fill in all required fields (Name, Email, Message).");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setError("Please provide a valid email address.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          company: formData.company.trim(),
          service: formData.service.trim(),
          message: formData.message.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to send message. Please try again.");
      }

      setSubmittedName(formData.name.trim());
      setFormData({
        name: "",
        email: "",
        company: "",
        service: "",
        message: "",
      });
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
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
            setError(null);
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
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      {error && (
        <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/50 text-red-700 dark:text-red-300 text-xs flex items-center gap-2 border border-red-200 dark:border-red-900">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
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
            required
            autoComplete="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. Alex Morgan"
            className="w-full px-4 py-3 rounded-xl bg-[#F8FAFC] dark:bg-[#070e1e] border border-slate-200 dark:border-slate-800 text-[#0F172A] dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 focus:bg-white dark:focus:bg-[#0b1120] transition-all placeholder:text-slate-400"
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="contact-email" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            Business Email *
          </label>
          <input
            id="contact-email"
            type="email"
            required
            autoComplete="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="alex@company.com"
            className="w-full px-4 py-3 rounded-xl bg-[#F8FAFC] dark:bg-[#070e1e] border border-slate-200 dark:border-slate-800 text-[#0F172A] dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 focus:bg-white dark:focus:bg-[#0b1120] transition-all placeholder:text-slate-400"
          />
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
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            placeholder="e.g. Acme Technologies Ltd"
            className="w-full px-4 py-3 rounded-xl bg-[#F8FAFC] dark:bg-[#070e1e] border border-slate-200 dark:border-slate-800 text-[#0F172A] dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 focus:bg-white dark:focus:bg-[#0b1120] transition-all placeholder:text-slate-400"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="contact-service" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            Service / Interest
          </label>
          <select
            id="contact-service"
            value={formData.service}
            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
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
        </div>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="contact-message" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
          How can we help? *
        </label>
        <textarea
          id="contact-message"
          required
          maxLength={5000}
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Describe what you are trying to solve..."
          className="w-full px-4 py-3 rounded-xl bg-[#F8FAFC] dark:bg-[#070e1e] border border-slate-200 dark:border-slate-800 text-[#0F172A] dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 focus:bg-white dark:focus:bg-[#0b1120] transition-all resize-none placeholder:text-slate-400"
        />
      </div>

      <Button
        type="submit"
        variant="primary"
        size="md"
        disabled={loading}
        icon={loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
        className="w-full justify-center shadow-md shadow-blue-600/15 cursor-pointer disabled:opacity-70"
      >
        {loading ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
