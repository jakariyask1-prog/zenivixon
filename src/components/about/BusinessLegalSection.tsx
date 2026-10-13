"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Button } from "@/components/ui/Button";
import { COMPANY_INFO } from "@/lib/constants";
import {
  ShieldCheck,
  Building2,
  CheckCircle2,
  Lock,
  MessageSquare,
  Mail,
  ArrowUpRight,
  X,
  FileText,
  FileCheck,
} from "lucide-react";

interface DocumentMeta {
  id: string;
  title: string;
  issuer: string;
  entityName: string;
  detailsLabel: string;
  detailsValue: string;
  status: string;
  badgeVariant: "blue" | "cyan";
}

const LEGAL_DOCUMENTS: DocumentMeta[] = [
  {
    id: "trade-license",
    title: "Trade License",
    issuer: "Khulna City Corporation",
    entityName: "ZENIVIXON TECHNOLOGIES",
    detailsLabel: "Registered Location",
    detailsValue: "Gollamari - Sonadanga Bypass Rd, Khulna, Bangladesh",
    status: "Active / Verified Government Registration",
    badgeVariant: "blue",
  },
  {
    id: "tin-certificate",
    title: "e-TIN Tax Certificate",
    issuer: "National Board of Revenue (NBR), Bangladesh",
    entityName: "ZENIVIXON TECHNOLOGIES",
    detailsLabel: "Tax Jurisdiction",
    detailsValue: "Taxes Zone - Khulna, Bangladesh",
    status: "Active / Verified Tax Entity",
    badgeVariant: "cyan",
  },
];

export function BusinessLegalSection() {
  const [selectedDoc, setSelectedDoc] = useState<DocumentMeta | null>(null);

  const openRequestModal = (doc: DocumentMeta) => {
    setSelectedDoc(doc);
  };

  const closeRequestModal = () => {
    setSelectedDoc(null);
  };

  const getWhatsAppUrl = (docTitle: string) => {
    const text = `Hello ZENIVIXON Team, we are conducting vendor due diligence and would like to request an official copy of your ${docTitle} / corporate registration documentation.`;
    return `${COMPANY_INFO.channels.whatsapp}?text=${encodeURIComponent(text)}`;
  };

  const getMailtoUrl = (docTitle: string) => {
    const subject = `Vendor Due Diligence: Request for ${docTitle} - ZENIVIXON TECHNOLOGIES`;
    const body = `Hi ZENIVIXON Team,\n\nWe are reviewing compliance and vendor due diligence. We would like to request an official verified copy of your ${docTitle} for our records.\n\nCompany Name:\nContact Person:\nCountry / Jurisdiction:\nProject / Inquiry Details:`;
    return `mailto:${COMPANY_INFO.channels.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section className="space-y-12">
      <ScrollReveal direction="up">
        <div className="space-y-3">
          <Badge variant="blue" size="sm" className="font-semibold text-xs tracking-widest">
            BUSINESS &amp; LEGAL
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] dark:text-white font-heading">
            Legally Licensed Business in Bangladesh
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
            ZENIVIXON operates as a legally licensed enterprise in Bangladesh under a valid Trade License issued by Khulna City Corporation and a valid e-TIN from the National Board of Revenue (NBR). Official documentation is provided directly to clients during vendor due diligence.
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.1}>
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h3 className="text-xl sm:text-2xl font-bold text-[#0F172A] dark:text-white font-heading">
              Official Corporate Registrations
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {LEGAL_DOCUMENTS.map((doc) => (
              <motion.div
                key={doc.id}
                whileHover={{ y: -4 }}
                className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-blue-300 dark:hover:border-blue-700 transition-all flex flex-col justify-between h-full group relative overflow-hidden"
              >
                {/* Subtle hover gradient glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl pointer-events-none group-hover:scale-150 transition-transform duration-500" />

                <div className="space-y-4 relative z-10">
                  <div className="flex items-start justify-between mb-2">
                    <div className="p-3 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900 text-blue-600 dark:text-blue-400">
                      <FileCheck className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800/80 flex items-center gap-1.5">
                      <ShieldCheck className="w-3 h-3" />
                      Legally Registered
                    </span>
                  </div>

                  <div>
                    <h4 className="text-xl font-bold text-[#0F172A] dark:text-white font-heading mb-1">
                      {doc.title}
                    </h4>
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">
                      Issuer: {doc.issuer}
                    </p>

                    {/* Protected Document Container (No open scraping) */}
                    <div
                      onClick={() => openRequestModal(doc)}
                      className="w-full h-28 sm:h-36 relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 mb-5 bg-gradient-to-br from-slate-100 via-slate-50 to-slate-200 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex flex-col items-center justify-center p-4 text-center group-hover:border-blue-400 dark:group-hover:border-blue-500 transition-all cursor-pointer shadow-inner relative select-none"
                    >
                      {/* Security Grid Pattern Overlay */}
                      <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none" />

                      <div className="relative z-10 flex flex-col items-center space-y-2">
                        <div className="w-10 h-10 rounded-xl bg-blue-600/10 dark:bg-blue-500/20 border border-blue-200 dark:border-blue-700/60 flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-sm group-hover:scale-110 transition-transform">
                          <Lock className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-heading font-bold text-slate-800 dark:text-slate-200">
                          Protected Corporate Document
                        </span>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                          Available upon Client Due Diligence Request
                        </span>
                      </div>
                    </div>

                    {/* Verified Corporate Metadata */}
                    <div className="space-y-2 text-sm text-slate-700 dark:text-slate-300 border-l-2 border-blue-500 pl-3.5 py-1 mb-2">
                      <p className="flex items-center gap-2">
                        <strong className="text-slate-900 dark:text-slate-100 font-bold min-w-[110px]">
                          Entity Name:
                        </strong>{" "}
                        {doc.entityName}
                      </p>
                      <p className="flex items-center gap-2">
                        <strong className="text-slate-900 dark:text-slate-100 font-bold min-w-[110px]">
                          {doc.detailsLabel}:
                        </strong>{" "}
                        {doc.detailsValue}
                      </p>
                      <p className="flex items-center gap-2">
                        <strong className="text-slate-900 dark:text-slate-100 font-bold min-w-[110px]">
                          Status:
                        </strong>{" "}
                        <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                          {doc.status}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Request Document Button */}
                <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 relative z-10">
                  <Button
                    variant="outline"
                    className="w-full justify-center group-hover:bg-blue-50 dark:group-hover:bg-blue-950/40 group-hover:text-blue-700 dark:group-hover:text-blue-300 group-hover:border-blue-200 dark:group-hover:border-blue-800 transition-colors font-semibold"
                    icon={<Lock className="w-4 h-4 text-blue-600 dark:text-blue-400" />}
                    onClick={() => openRequestModal(doc)}
                  >
                    Request Official Document
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* Due Diligence Notice Banner */}
      <ScrollReveal direction="up" delay={0.2}>
        <div className="mt-8 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="mt-1 hidden sm:block">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
              To protect corporate registration records from unauthorized scraping, certified unredacted copies of our <strong>Trade License</strong> and <strong>e-TIN Tax Certificate</strong> are shared directly with verified enterprise clients during formal vendor onboarding or procurement reviews.
            </p>
          </div>
          <Button
            variant="outline"
            href="/contact?subject=Vendor%20Due%20Diligence%20%26%20Legal%20Compliance"
            className="shrink-0 w-full sm:w-auto"
          >
            Request Due Diligence Package
          </Button>
        </div>
      </ScrollReveal>

      {/* Corporate Due Diligence Request Modal */}
      <AnimatePresence>
        {selectedDoc && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-8">
            {/* Dark Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeRequestModal}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm cursor-pointer"
              aria-hidden="true"
            />

            {/* Modal Dialog Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.45, bounce: 0 }}
              className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden z-10 p-6 sm:p-8 space-y-6"
              role="dialog"
              aria-modal="true"
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                    <Lock className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-heading font-extrabold uppercase tracking-widest text-blue-600 dark:text-blue-400">
                      VENDOR DUE DILIGENCE POLICY
                    </span>
                    <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white">
                      Request {selectedDoc.title}
                    </h3>
                  </div>
                </div>

                <button
                  onClick={closeRequestModal}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  aria-label="Close dialog"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Explanatory Policy */}
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                To prevent corporate identity duplication and public web scraping, unredacted certified copies of our <strong>{selectedDoc.title}</strong> ({selectedDoc.issuer}) are provided directly to enterprise clients and procurement officers upon verified request.
              </p>

              {/* Verified Legal Entity Details Box */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
                <div className="flex items-center justify-between pb-1.5 border-b border-slate-200/60 dark:border-slate-800 text-slate-500 dark:text-slate-400">
                  <span>Registered Entity:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200 font-heading">
                    {selectedDoc.entityName}
                  </span>
                </div>
                <div className="flex items-center justify-between pb-1.5 border-b border-slate-200/60 dark:border-slate-800 text-slate-500 dark:text-slate-400">
                  <span>Licensing Authority:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {selectedDoc.issuer}
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
                  <span>Status:</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Verified Active Registration
                  </span>
                </div>
              </div>

              {/* Action Buttons for Client */}
              <div className="space-y-3 pt-2">
                <a
                  href={getWhatsAppUrl(selectedDoc.title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-heading font-bold shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Request Instantly via WhatsApp Business</span>
                  <ArrowUpRight className="w-4 h-4 opacity-80" />
                </a>

                <a
                  href={getMailtoUrl(selectedDoc.title)}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-heading font-semibold border border-slate-200 dark:border-slate-700 transition-all"
                >
                  <Mail className="w-4 h-4 text-blue-500" />
                  <span>Request Official PDF via Corporate Email</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
