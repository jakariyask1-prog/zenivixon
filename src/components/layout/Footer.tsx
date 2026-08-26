import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FOOTER_LINKS } from "@/data/navigation";
import { COMPANY_INFO } from "@/lib/constants";
import { ArrowUpRight, Mail, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#020817] text-sm mt-auto relative z-10 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 py-20 lg:py-24">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12">
          
          {/* Left Column: Get In Touch & Newsletter (Col-span 4) */}
          <div className="lg:col-span-4 space-y-16">
            
            {/* Stay Tuned / Newsletter */}
            <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-6 md:p-8 border border-slate-200/60 dark:border-slate-800">
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-500 mb-4 block font-heading">
                STAY UPDATED
              </span>
              <h3 className="text-xl font-bold text-[#0F172A] dark:text-white font-heading mb-3">
                Stay tuned
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 leading-relaxed">
                Get the latest automation insights, playbooks, and case studies delivered to your inbox. No spam, ever.
              </p>
              <form className="flex items-center gap-2 mb-4" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="flex-1 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-blue-500 transition-colors"
                />
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white p-2.5 rounded-lg transition-colors">
                  <Mail className="w-5 h-5" />
                </button>
              </form>
              <p className="text-xs text-slate-500">
                Read by ops and engineering leads • Weekly • Unsubscribe anytime
              </p>
            </div>

            {/* Get In Touch / Founders */}
            <div>
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-500 mb-6 block font-heading">
                GET IN TOUCH
              </span>
              <div className="space-y-6">
                {/* Founder 1 */}
                <div className="flex items-center gap-4">
                  <Image src="/images/team/md-sazib-hossain.jpeg" alt="Sazib Hossain" width={56} height={56} className="rounded-full bg-slate-200 object-cover w-14 h-14" />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-base font-bold text-[#0F172A] dark:text-white font-heading">Sazib Hossain</h4>
                      <CheckCircle2 className="w-4 h-4 text-blue-500" />
                    </div>
                    <p className="text-sm text-slate-500">Founder & CEO</p>
                  </div>
                </div>
                {/* Founder 2 */}
                <div className="flex items-center gap-4">
                  <Image src="/images/team/sabbir-ahmed.png" alt="Sabbir Ahmed" width={56} height={56} className="rounded-full bg-slate-200 object-cover w-14 h-14" />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-base font-bold text-[#0F172A] dark:text-white font-heading">Sabbir Ahmed</h4>
                      <CheckCircle2 className="w-4 h-4 text-blue-500" />
                    </div>
                    <p className="text-sm text-slate-500">B2B Sales & Development</p>
                  </div>
                </div>
              </div>
              <a href="mailto:sazibhossain9142@gmail.com" className="inline-flex items-center gap-2 mt-8 text-slate-700 dark:text-slate-300 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <Mail className="w-5 h-5" />
                sazibhossain9142@gmail.com
              </a>
            </div>

          </div>

          {/* Right Columns: Massive Sitemap Grid (Col-span 8) */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-8 gap-y-16">
            
            {/* Free Tools */}
            <div className="space-y-4">
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-500 block font-heading">
                FREE TOOLS
              </span>
              <ul className="space-y-3.5">
                {[
                  "Free AI Models Directory",
                  "AI Model Comparison",
                  "AI Model Pricing Index",
                  "ROI Calculator",
                  "AI Readiness Assessment",
                  "AI Budget Planner",
                  "Workflow Audit",
                  "AI Maturity Quiz",
                  "AI Use Case Generator",
                  "AI Tool Selector",
                  "Job Description Generator"
                ].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="#" className="text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-wider mt-2 inline-block">
                    + 5 MORE FREE TOOLS ↗
                  </Link>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div className="space-y-4">
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-500 block font-heading">
                SERVICES
              </span>
              <ul className="space-y-3.5">
                {[
                  "All Services",
                  "AI Strategy Consulting",
                  "AI Agent Development",
                  "Workflow Automation",
                  "Custom Automation",
                  "RAG Pipeline Development",
                  "SaaS MVP Development",
                  "AI Workshops",
                  "Engineer Placement",
                  "Custom Training",
                  "Maintenance & Support"
                ].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Platform Agencies */}
            <div className="space-y-4">
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-500 block font-heading">
                PLATFORM AGENCIES
              </span>
              <ul className="space-y-3.5">
                {[
                  "n8n Agency",
                  "Claude Code Agency",
                  "Cursor Agency",
                  "Codex Agency",
                  "Lovable Agency",
                  "Bubble Agency",
                  "Framer Agency",
                  "Supabase Agency",
                  "FlutterFlow Agency",
                  "Replit Agency",
                  "v0 Agency"
                ].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div className="space-y-4">
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-500 block font-heading">
                RESOURCES
              </span>
              <ul className="space-y-3.5">
                {[
                  "Workflows",
                  "Industries",
                  "Blog",
                  "Case Studies",
                  "Playbooks",
                  "Courses",
                  "FAQ",
                  "Contact Us",
                  "Careers"
                ].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="pt-8">
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-500 block font-heading mb-4">
                  COMPANY
                </span>
                <Link href="/" className="flex items-center gap-2.5 mb-4">
                  <div className="flex items-center justify-center">
                    <Image 
                      src="/logo.png" 
                      alt="ZENIVIXON Logo" 
                      width={32} 
                      height={32} 
                      className="object-contain rounded-md"
                    />
                  </div>
                  <span className="font-bold text-lg tracking-widest text-[#0F172A] dark:text-white font-heading">
                    {COMPANY_INFO.name}
                  </span>
                </Link>
                <p className="text-xs text-slate-500 leading-relaxed max-w-[200px]">
                  {COMPANY_INFO.positioning}
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Bar with Legal */}
        <div className="mt-20 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} {COMPANY_INFO.formalName}. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            {FOOTER_LINKS.legal.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="hover:text-blue-600 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
