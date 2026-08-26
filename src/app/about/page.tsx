import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/layout/PageHeader";
import { COMPANY_INFO } from "@/lib/constants";
import { COMPANY_VALUES, TEAM_MEMBERS } from "@/data/team";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, ArrowUpRight, ShieldCheck, Award, Sparkles, Mail } from "lucide-react";

function LinkedInIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
  );
}

function FacebookIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}

export const metadata: Metadata = {
  title: "About Us | Leadership & AI-First Technology Team",
  description:
    "Meet the leadership and engineering team behind ZENIVIXON TECHNOLOGIES: our problem-first engineering philosophy, Founder & CEO profile, and technical specialists delivering practical AI systems.",
};

export default function AboutPage() {
  const founder = TEAM_MEMBERS.find((m) => m.id === "founder-ceo")!;
  const engineeringTeam = TEAM_MEMBERS.filter((m) => m.id !== "founder-ceo");

  return (
    <>
      <PageHeader
        badge="ABOUT ZENIVIXON"
        title="Focused on Practical AI & Software Engineering."
        description="We are an AI-first technology company built on a single conviction: enterprise software and AI must solve real business problems, operate with deterministic reliability, and integrate with your existing systems."
        breadcrumbs={[{ label: "About" }]}
      />

      <div className="py-20 md:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-28">
        {/* Mission & Positioning */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <Badge variant="blue" size="sm" className="font-semibold text-xs tracking-widest">
              OUR POSITIONING
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] dark:text-white font-heading leading-tight">
              An AI-First Technology Partner for International Business.
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed">
              ZENIVIXON was founded to bridge the gap between abstract AI research and practical enterprise operations. While large agencies offer generic retainers and superficial chatbots, we focus deeply on autonomous customer support agents, workflow automation, custom software, and system integrations.
            </p>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
              We serve business owners, CTOs, and operations leaders across the United States, United Kingdom, Europe, Canada, Australia, and other global markets who require focused, expert execution without corporate bureaucracy.
            </p>
          </div>

          <div className="lg:col-span-5 p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 dark:border-slate-800 shadow-md space-y-6">
            <div className="text-xs font-heading text-cyan-700 uppercase tracking-widest font-bold">
              Engineering Philosophy
            </div>
            <p className="text-lg font-bold text-[#0F172A] dark:text-white font-heading leading-snug">
              &ldquo;{COMPANY_INFO.philosophy}&rdquo;
            </p>
            <div className="space-y-3 pt-4 border-t border-slate-100 text-xs text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Start by understanding the exact business bottleneck</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0" />
                <span>Enforce deterministic validation and sandboxed tools</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>Embed directly into your existing software stack</span>
              </div>
            </div>
          </div>
        </div>

        {/* Founder & CEO Executive Showcase */}
        <div className="space-y-8">
          <div className="space-y-3">
            <Badge variant="blue" size="sm" className="font-semibold text-xs tracking-widest">
              EXECUTIVE LEADERSHIP
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] dark:text-white font-heading">
              Founder &amp; Chief Executive Officer
            </h2>
            <p className="text-base text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
              Driving ZENIVIXON&apos;s strategic vision, engineering quality, and direct international client collaborations.
            </p>
          </div>

          <div className="rounded-3xl bg-white border border-slate-200 dark:border-slate-800/90 p-8 sm:p-10 md:p-12 shadow-lg shadow-slate-200/50 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Founder Large Portrait (5 cols) */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="w-full max-w-md aspect-[5/6] relative rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md bg-slate-900 group">
                <Image
                  src={founder.image}
                  alt={founder.name}
                  fill
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  priority
                />
              </div>
              <div className="mt-4 flex items-center gap-2 text-xs font-heading text-slate-500 dark:text-slate-400 font-semibold">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>Verified Executive Profile &bull; ZENIVIXON</span>
              </div>
            </div>

            {/* Founder Details, Qualities & Socials (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2.5">
                  <Badge variant="blue" size="sm" className="font-bold text-xs">
                    {founder.role}
                  </Badge>
                  {founder.titleBadge && (
                    <span className="text-xs font-heading text-cyan-700 bg-cyan-50 px-2.5 py-0.5 rounded-full border border-cyan-200 font-semibold">
                      {founder.titleBadge}
                    </span>
                  )}
                </div>
                <h3 className="text-3xl font-extrabold text-[#0F172A] dark:text-white font-heading">
                  {founder.name}
                </h3>
              </div>

              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                {founder.bio}
              </p>

              {/* Leadership Qualities & Credentials */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <div className="text-xs font-bold text-slate-800 uppercase tracking-widest font-heading flex items-center gap-2">
                  <Award className="w-4 h-4 text-blue-600" />
                  <span>Strategic Leadership &amp; Core Qualities:</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {founder.qualities?.map((qual, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="leading-snug">{qual}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Strategic Expertise Tags */}
              <div className="space-y-2 pt-2">
                <div className="text-xs font-bold text-slate-800 uppercase tracking-widest font-heading">
                  Core Strategic Domains:
                </div>
                <div className="flex flex-wrap gap-2">
                  {founder.expertise.map((exp) => (
                    <span
                      key={exp}
                      className="text-xs font-heading px-3 py-1 rounded-lg bg-slate-100 text-slate-800 border border-slate-200 dark:border-slate-800 font-semibold"
                    >
                      {exp}
                    </span>
                  ))}
                </div>
              </div>

              {/* Founder Direct Social Links */}
              <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center gap-3">
                {founder.linkedin && (
                  <a
                    href={founder.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0A66C2] text-white text-xs font-semibold hover:bg-[#084e96] transition-colors shadow-sm"
                  >
                    <LinkedInIcon className="w-4 h-4" />
                    <span>LinkedIn Profile</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-80" />
                  </a>
                )}
                {founder.facebook && (
                  <a
                    href={founder.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1877F2] text-white text-xs font-semibold hover:bg-[#125ec2] transition-colors shadow-sm"
                  >
                    <FacebookIcon className="w-4 h-4" />
                    <span>Facebook Profile</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-80" />
                  </a>
                )}
                {founder.email && (
                  <a
                    href={`mailto:${founder.email}`}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200 dark:border-slate-800 hover:bg-slate-200 hover:text-slate-900 transition-colors"
                  >
                    <Mail className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                    <span>Direct Email</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Engineering & Technical Specialists Profiles */}
        <div className="space-y-10">
          <div className="space-y-3">
            <Badge variant="cyan" size="sm" className="font-semibold text-xs tracking-widest">
              ENGINEERING LEADERSHIP &amp; SPECIALISTS
            </Badge>
            <h2 className="text-3xl font-extrabold text-[#0F172A] dark:text-white font-heading">
              Technical Specialists &amp; Systems Engineers
            </h2>
            <p className="text-base text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
              Standardized, high-density engineering profiles. Our clients work directly with the technical specialists architecting their systems.
            </p>
          </div>

          {/* Large Standard Portrait Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {engineeringTeam.map((member) => (
              <div
                key={member.id}
                className="rounded-3xl bg-white border border-slate-200 dark:border-slate-800/90 shadow-md p-8 sm:p-10 flex flex-col justify-between hover:border-slate-300 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="space-y-6">
                  {/* Large Standard Portrait & Role Header */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                    <div className="sm:col-span-5 aspect-[5/6] relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-900 shadow-sm">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="sm:col-span-7 space-y-2">
                      <Badge variant="blue" size="sm" className="font-semibold text-xs">
                        {member.department}
                      </Badge>
                      <h3 className="text-xl font-bold text-[#0F172A] dark:text-white font-heading group-hover:text-blue-600 transition-colors">
                        {member.name}
                      </h3>
                      <p className="text-xs font-heading text-blue-600 font-semibold">
                        {member.role}
                      </p>
                      {member.titleBadge && (
                        <p className="text-xs font-heading text-cyan-700">
                          {member.titleBadge}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {member.bio}
                  </p>

                  {/* Professional Qualities */}
                  {member.qualities && (
                    <div className="space-y-2 pt-2 border-t border-slate-100">
                      <div className="text-xs font-bold text-slate-800 uppercase tracking-widest font-heading flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                        <span>Core Engineering Qualities:</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                        {member.qualities.map((qual, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 shrink-0 mt-0.5" />
                            <span className="leading-snug">{qual}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Expertise Tags */}
                  <div className="space-y-2 pt-2">
                    <div className="text-xs font-bold text-slate-800 uppercase tracking-widest font-heading">
                      Technical Stack &amp; Skills:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {member.expertise.map((exp) => (
                        <span
                          key={exp}
                          className="text-xs font-heading px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 border border-slate-200 dark:border-slate-800 font-medium"
                        >
                          {exp}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Social Profiles & Verified Badge */}
                <div className="pt-6 mt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0A66C2] text-white text-xs font-semibold hover:bg-[#084e96] transition-colors"
                      >
                        <LinkedInIcon className="w-3.5 h-3.5" />
                        <span>LinkedIn</span>
                      </a>
                    )}
                    {member.facebook && (
                      <a
                        href={member.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1877F2] text-white text-xs font-semibold hover:bg-[#125ec2] transition-colors"
                      >
                        <FacebookIcon className="w-3.5 h-3.5" />
                        <span>Facebook</span>
                      </a>
                    )}
                  </div>
                  <span className="text-xs font-heading text-emerald-600 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Verified Specialist
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Company Principles */}
        <div className="space-y-10">
          <div className="max-w-2xl space-y-3">
            <Badge variant="blue" size="sm" className="font-semibold text-xs tracking-widest">
              CORE PRINCIPLES
            </Badge>
            <h2 className="text-3xl font-bold text-[#0F172A] dark:text-white font-heading">
              How We Approach Every Engineering Engagement
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {COMPANY_VALUES.map((val, idx) => (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-white border border-slate-200 dark:border-slate-800/90 shadow-sm hover:border-slate-300 hover:shadow-md transition-all space-y-3"
              >
                <div className="text-xs font-heading text-slate-500 dark:text-slate-400 font-bold">
                  PRINCIPLE 0{idx + 1}
                </div>
                <h3 className="text-xl font-bold text-[#0F172A] dark:text-white font-heading">
                  {val.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {val.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Scalable Growth Statement */}
        <div className="rounded-3xl bg-[#F7F9FC] dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800 p-8 sm:p-12 text-center space-y-6 shadow-sm">
          <p className="text-xs font-heading uppercase tracking-widest text-slate-500 dark:text-slate-400 font-bold">
            &ldquo;Focused today. Built for tomorrow.&rdquo;
          </p>
          <h3 className="text-2xl sm:text-3xl font-bold text-[#0F172A] dark:text-white font-heading">
            Partner with ZENIVIXON for your AI &amp; Software initiatives.
          </h3>
          <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto text-sm leading-relaxed">
            Let us review your workflow and discuss how practical AI systems and modern software can elevate your business efficiency.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Button variant="primary" size="lg" href="/start-a-project">
              Start Your AI Project
            </Button>
            <Button variant="whatsapp" size="lg" href={COMPANY_INFO.channels.whatsapp} external>
              Chat on WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
