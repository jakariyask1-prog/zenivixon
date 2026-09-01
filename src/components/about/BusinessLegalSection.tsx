"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Button } from "@/components/ui/Button";
import { DocumentViewerModal } from "@/components/ui/DocumentViewerModal";
import { ShieldCheck, FileText, Building2, CheckCircle2 } from "lucide-react";

export function BusinessLegalSection() {
  const [activeDocument, setActiveDocument] = useState<{
    src: string;
    title: string;
    alt: string;
  } | null>(null);

  const openDocument = (src: string, title: string, alt: string) => {
    setActiveDocument({ src, title, alt });
  };

  const closeDocument = () => {
    setActiveDocument(null);
  };

  return (
    <section className="space-y-12">
      <ScrollReveal direction="up">
        <div className="space-y-3">
          <Badge variant="blue" size="sm" className="font-semibold text-xs tracking-widest">
            BUSINESS & LEGAL
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] dark:text-white font-heading">
            Legally Licensed Business in Bangladesh
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
            ZENIVIXON operates as a legally licensed business in Bangladesh under a valid Trade License issued by Khulna City Corporation. For transparency and client due diligence, relevant business documentation is available for verification.
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.1}>
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h3 className="text-xl sm:text-2xl font-bold text-[#0F172A] dark:text-white font-heading">
              Official Business Documents
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Trade License Card */}
            <motion.div
              whileHover={{ y: -4 }}
              className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-blue-300 dark:hover:border-blue-700 transition-all flex flex-col justify-between h-full group relative overflow-hidden"
            >
              {/* Subtle hover gradient */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl pointer-events-none group-hover:scale-150 transition-transform duration-500" />
              
              <div className="space-y-4 relative z-10">
                <div className="flex items-start justify-between mb-2">
                  <div className="p-3 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900 text-blue-600 dark:text-blue-400">
                    <FileText className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800/80 flex items-center gap-1.5">
                    <ShieldCheck className="w-3 h-3" />
                    Official Document
                  </span>
                </div>
                
                <div>
                  <h4 className="text-xl font-bold text-[#0F172A] dark:text-white font-heading mb-1">
                    Trade License
                  </h4>
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">
                    Issuer: Khulna City Corporation
                  </p>
                  
                  <div 
                    className="w-full h-24 sm:h-40 relative rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 mb-5 bg-slate-100 dark:bg-slate-800 group-hover:border-blue-400 dark:group-hover:border-blue-500 transition-colors cursor-pointer shadow-inner"
                    onClick={() => openDocument('/documents/trade.jpeg', 'Trade License', 'ZENIVIXON Trade License issued by Khulna City Corporation')}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src="/documents/trade.jpeg" 
                      alt="Trade License Preview" 
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" 
                    />
                    {/* Add a blur at the bottom to obscure potential personal details in the thumbnail, keeping focus on the top company header */}
                    <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-20 bg-gradient-to-t from-white dark:from-slate-900 to-transparent backdrop-blur-md" />
                  </div>

                  <div className="space-y-2 text-sm text-slate-700 dark:text-slate-300 border-l-2 border-blue-500 dark:border-blue-500 pl-3.5 py-1 mb-2">
                    <p className="flex items-center gap-2"><strong className="text-slate-900 dark:text-slate-100 font-bold min-w-[100px]">Entity Name:</strong> ZENIVIXON TECHNOLOGIES</p>
                    <p className="flex items-center gap-2"><strong className="text-slate-900 dark:text-slate-100 font-bold min-w-[100px]">Location:</strong> Gollamari - Sonadanga Bypass Rd, Khulna, Bangladesh</p>
                    <p className="flex items-center gap-2"><strong className="text-slate-900 dark:text-slate-100 font-bold min-w-[100px]">Status:</strong> Active / Verified</p>
                  </div>
                </div>
              </div>
              
              <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 relative z-10">
                <Button 
                  variant="outline" 
                  className="w-full justify-center group-hover:bg-blue-50 dark:group-hover:bg-blue-950/40 group-hover:text-blue-700 dark:group-hover:text-blue-300 group-hover:border-blue-200 dark:group-hover:border-blue-800 transition-colors"
                  onClick={() => openDocument('/documents/trade.jpeg', 'Trade License', 'ZENIVIXON Trade License issued by Khulna City Corporation')}
                >
                  View Document
                </Button>
              </div>
            </motion.div>

            {/* e-TIN Certificate Card */}
            <motion.div
              whileHover={{ y: -4 }}
              className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-blue-300 dark:hover:border-blue-700 transition-all flex flex-col justify-between h-full group relative overflow-hidden"
            >
              {/* Subtle hover gradient */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl pointer-events-none group-hover:scale-150 transition-transform duration-500" />
              
              <div className="space-y-4 relative z-10">
                <div className="flex items-start justify-between mb-2">
                  <div className="p-3 rounded-2xl bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-100 dark:border-cyan-900 text-cyan-600 dark:text-cyan-400">
                    <FileText className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800/80 flex items-center gap-1.5">
                    <ShieldCheck className="w-3 h-3" />
                    Official Document
                  </span>
                </div>
                
                <div>
                  <h4 className="text-xl font-bold text-[#0F172A] dark:text-white font-heading mb-1">
                    e-TIN Certificate
                  </h4>
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">
                    Issuer: National Board of Revenue (NBR), Bangladesh
                  </p>

                  <div 
                    className="w-full h-24 sm:h-40 relative rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 mb-5 bg-slate-100 dark:bg-slate-800 group-hover:border-cyan-400 dark:group-hover:border-cyan-500 transition-colors cursor-pointer shadow-inner"
                    onClick={() => openDocument('/documents/tin.jpeg', 'e-TIN Certificate', 'ZENIVIXON e-TIN Certificate')}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src="/documents/tin.jpeg" 
                      alt="e-TIN Certificate Preview" 
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" 
                    />
                    {/* Add a blur at the bottom to obscure potential personal details in the thumbnail, keeping focus on the top company header */}
                    <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-20 bg-gradient-to-t from-white dark:from-slate-900 to-transparent backdrop-blur-md" />
                  </div>

                  <div className="space-y-2 text-sm text-slate-700 dark:text-slate-300 border-l-2 border-cyan-500 dark:border-cyan-500 pl-3.5 py-1 mb-2">
                    <p className="flex items-center gap-2"><strong className="text-slate-900 dark:text-slate-100 font-bold min-w-[100px]">Entity Name:</strong> ZENIVIXON TECHNOLOGIES</p>
                    <p className="flex items-center gap-2"><strong className="text-slate-900 dark:text-slate-100 font-bold min-w-[100px]">Tax Region:</strong> Taxes Zone - Khulna</p>
                    <p className="flex items-center gap-2"><strong className="text-slate-900 dark:text-slate-100 font-bold min-w-[100px]">Status:</strong> Active / Verified</p>
                  </div>
                </div>
              </div>
              
              <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 relative z-10">
                <Button 
                  variant="outline" 
                  className="w-full justify-center group-hover:bg-cyan-50 dark:group-hover:bg-cyan-950/40 group-hover:text-cyan-700 dark:group-hover:text-cyan-300 group-hover:border-cyan-200 dark:group-hover:border-cyan-800 transition-colors"
                  onClick={() => openDocument('/documents/tin.jpeg', 'e-TIN Certificate', 'ZENIVIXON e-TIN Certificate')}
                >
                  View Document
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </ScrollReveal>

      {/* Optional Document Request CTA */}
      <ScrollReveal direction="up" delay={0.2}>
        <div className="mt-8 p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="mt-1 hidden sm:block">
              <CheckCircle2 className="w-5 h-5 text-slate-400 dark:text-slate-500" />
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
              Additional business documentation may be provided to clients for legitimate compliance, vendor onboarding, or due-diligence purposes upon request.
            </p>
          </div>
          <Button 
            variant="outline" 
            href="/contact" 
            className="shrink-0 w-full sm:w-auto"
          >
            Request Verification Documents
          </Button>
        </div>
      </ScrollReveal>

      {/* Document Viewer Modal */}
      <DocumentViewerModal
        isOpen={activeDocument !== null}
        onClose={closeDocument}
        documentSrc={activeDocument?.src || ''}
        documentTitle={activeDocument?.title || ''}
        documentAlt={activeDocument?.alt || ''}
      />
    </section>
  );
}
