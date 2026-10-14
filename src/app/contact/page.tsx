import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { ContactForm } from "@/components/forms/ContactForm";
import { SupportPortalBanner } from "@/components/contact/SupportPortalBanner";
import { COMPANY_INFO } from "@/lib/constants";
import { Badge } from "@/components/ui/Badge";
import { MessageSquare, Mail, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us | Direct Communication & Inquiries",
  description:
    "Connect directly with ZENIVIXON TECHNOLOGIES via WhatsApp Business, Business Email, LinkedIn, or send us a project brief.",
};

export default function ContactPage() {
  const whatsappUrl = `${COMPANY_INFO.channels.whatsapp}?text=${encodeURIComponent(
    "Hi ZENIVIXON team, I would like to discuss an AI/technology inquiry for our business."
  )}`;

  return (
    <>
      <PageHeader
        badge="GET IN TOUCH"
        title="Direct Communication. Fast Human Response."
        description="Whether you have an immediate AI automation requirement or want to explore potential AI agent opportunities, we are ready to discuss your business needs."
        breadcrumbs={[{ label: "Contact" }]}
      />

      <div className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Details & Channels (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <Badge variant="blue" size="sm">
                COMMUNICATION CHANNELS
              </Badge>
              <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white font-heading">
                Reach Us Directly
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                We maintain direct, responsive communication channels for business clients worldwide.
              </p>
            </div>

            {/* Direct Channel Cards */}
            <div className="space-y-4">
              {/* WhatsApp */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 rounded-2xl bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800 shadow-sm hover:border-emerald-500 hover:shadow-md transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#0F172A] dark:text-white font-heading group-hover:text-emerald-600 transition-colors">
                      WhatsApp Business
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {COMPANY_INFO.channels.whatsappNumber} &bull; Fastest Response
                    </p>
                  </div>
                </div>
                <span className="text-xs font-heading text-emerald-600 dark:text-emerald-400 font-bold shrink-0">
                  Open Chat &rarr;
                </span>
              </a>

              {/* Email */}
              <a
                href={`mailto:${COMPANY_INFO.channels.email}`}
                className="p-5 rounded-2xl bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800 shadow-sm hover:border-blue-500 hover:shadow-md transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#0F172A] dark:text-white font-heading group-hover:text-blue-600 transition-colors">
                      Business Email
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {COMPANY_INFO.channels.email}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-heading text-blue-600 dark:text-blue-400 font-bold shrink-0">
                  Send Email &rarr;
                </span>
              </a>

              {/* LinkedIn */}
              <a
                href={COMPANY_INFO.channels.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 rounded-2xl bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800 shadow-sm hover:border-blue-400 hover:shadow-md transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-400 flex items-center justify-center shrink-0">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76c.96 0 1.74-.78 1.74-1.74 0-.96-.78-1.74-1.74-1.74-.96 0-1.74.78-1.74 1.74 0 .96.78 1.74 1.74 1.74m1.39 9.74v-8.37H5.07v8.37h2.78Z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#0F172A] dark:text-white font-heading group-hover:text-blue-700 transition-colors">
                      LinkedIn
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Corporate presence &amp; updates
                    </p>
                  </div>
                </div>
                <span className="text-xs font-heading text-blue-600 dark:text-blue-400 font-bold shrink-0">
                  Follow &rarr;
                </span>
              </a>

              {/* Facebook */}
              <a
                href={COMPANY_INFO.channels.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 rounded-2xl bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800 shadow-sm hover:border-slate-400 hover:shadow-md transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 flex items-center justify-center shrink-0">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02Z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#0F172A] dark:text-white font-heading group-hover:text-slate-900 transition-colors">
                      Facebook
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Brand page &amp; announcements
                    </p>
                  </div>
                </div>
                <span className="text-xs font-heading text-slate-600 dark:text-slate-400 font-bold shrink-0">
                  Visit &rarr;
                </span>
              </a>
            </div>

            {/* Response Commitment */}
            <div className="p-5 rounded-2xl bg-[#F8FAFC] dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 space-y-2 shadow-xs">
              <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-bold">
                <Clock className="w-4 h-4 text-cyan-600" />
                <span>Response Time SLA</span>
              </div>
              <p className="leading-relaxed">
                All business inquiries receive a response within 24 hours during standard business days.
              </p>
            </div>
          </div>

          {/* Inquiry Form (7 cols) */}
          <div className="lg:col-span-7 bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800 rounded-3xl p-8 sm:p-10 shadow-xl flex flex-col justify-between">
            <div>
              <div className="space-y-2 mb-6">
                <h3 className="text-xl font-bold text-[#0F172A] dark:text-white font-heading">
                  Send a Direct Message
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Provide a brief summary of what you are trying to solve.
                </p>
              </div>
              <ContactForm />
            </div>

            {/* Cross-Link to Project Intake Wizard */}
            <div className="mt-8 pt-5 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <span className="text-slate-500 dark:text-slate-400">
                Planning a specific system, budget, or timeline?
              </span>
              <Link
                href="/start-a-project"
                className="font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 shrink-0"
              >
                <span>Submit Full Project Brief</span>
                <span>&rarr;</span>
              </Link>
            </div>
          </div>
        </div>

        {/* AI Support Portal Banner */}
        <div className="mt-16 sm:mt-20">
          <SupportPortalBanner />
        </div>
      </div>
    </>
  );
}
