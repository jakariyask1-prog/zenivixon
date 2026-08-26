import React from "react";
import { Database, Triangle, Hexagon, Network, Workflow, MessageCircle, Mail, Users, Zap, Plug, ShieldCheck } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const integrationsData = [
  {
    category: "AI & Compute",
    title: "Intelligence & Infra",
    badge: { text: "Pay per use • your account", icon: <Zap className="w-3.5 h-3.5 text-yellow-500" /> },
    tools: [
      {
        name: "OpenAI / Claude",
        description: "Advanced LLM reasoning & agentic workflows.",
        icon: <Hexagon className="w-6 h-6 text-black dark:text-white" />,
        bgColor: "bg-slate-100 dark:bg-slate-800",
      },
      {
        name: "Supabase",
        description: "Postgres + auth + vector embeddings in one.",
        icon: <Database className="w-6 h-6 text-emerald-500" />,
        bgColor: "bg-emerald-50 dark:bg-emerald-950/30",
      },
      {
        name: "Vercel",
        description: "Edge deploys in seconds for global latency.",
        icon: <Triangle className="w-6 h-6 text-black dark:text-white fill-current" />,
        bgColor: "bg-slate-100 dark:bg-slate-800",
      },
    ],
  },
  {
    category: "Automation",
    title: "Workflows & Logic",
    badge: { text: "Seamless data pipelines", icon: <Workflow className="w-3.5 h-3.5 text-blue-500" /> },
    tools: [
      {
        name: "n8n",
        description: "Fair-code workflow automation at scale.",
        icon: <Network className="w-6 h-6 text-rose-500" />,
        bgColor: "bg-rose-50 dark:bg-rose-950/30",
      },
      {
        name: "Make",
        description: "Visual logic for complex API orchestrations.",
        icon: <Workflow className="w-6 h-6 text-purple-600" />,
        bgColor: "bg-purple-50 dark:bg-purple-950/30",
      },
      {
        name: "Custom APIs",
        description: "Bespoke Python/Node.js microservices.",
        icon: <Plug className="w-6 h-6 text-blue-600" />,
        bgColor: "bg-blue-50 dark:bg-blue-950/30",
      },
    ],
  },
  {
    category: "Outbound & CRM",
    title: "Customer & Sales",
    badge: { text: "Plug into your accounts", icon: <ShieldCheck className="w-3.5 h-3.5 text-slate-500" /> },
    tools: [
      {
        name: "HubSpot",
        description: "CRM hygiene, deal pipelines, and tracking.",
        icon: <Users className="w-6 h-6 text-orange-500" />,
        bgColor: "bg-orange-50 dark:bg-orange-950/30",
      },
      {
        name: "Apollo / Clay",
        description: "Lead enrichment and outbound at scale.",
        icon: <Mail className="w-6 h-6 text-yellow-500" />,
        bgColor: "bg-yellow-50 dark:bg-yellow-950/30",
      },
      {
        name: "Intercom",
        description: "AI support handoffs and customer chats.",
        icon: <MessageCircle className="w-6 h-6 text-blue-500" />,
        bgColor: "bg-blue-50 dark:bg-blue-950/30",
      },
    ],
  },
];

export function IntegrationsSection() {
  return (
    <section className="py-20 md:py-32 bg-[#FCFDFE] dark:bg-[#020817]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <ScrollReveal direction="up" delay={0.1}>
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#0F172A] dark:text-white font-heading tracking-tight mb-6">
              The Tools We Use & Integrate
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              We don&apos;t lock you into proprietary ecosystems. We build on top of industry-standard, scalable infrastructure and plug directly into the tools you already love.
            </p>
          </ScrollReveal>
        </div>

        <div className="space-y-16 md:space-y-24 max-w-5xl mx-auto">
          {integrationsData.map((section, idx) => (
            <div key={section.title} className="flex flex-col md:flex-row gap-8 md:gap-16">
              
              {/* Category Header */}
              <div className="md:w-1/3 flex flex-col items-start">
                <ScrollReveal direction="left" delay={0.1}>
                  <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-slate-500 dark:text-slate-400 mb-3 block font-heading">
                    CATEGORY
                  </span>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-[#0F172A] dark:text-white font-heading mb-4">
                    {section.title}
                  </h3>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300">
                    {section.badge.icon}
                    {section.badge.text}
                  </div>
                </ScrollReveal>
              </div>

              {/* Cards Grid */}
              <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {section.tools.map((tool, toolIdx) => (
                  <ScrollReveal key={tool.name} direction="up" delay={0.1 + toolIdx * 0.1}>
                    <div className="p-5 md:p-6 rounded-xl bg-white dark:bg-[#0b1120] border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group h-full">
                      <div className={`w-12 h-12 rounded-lg ${tool.bgColor} flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}>
                        {tool.icon}
                      </div>
                      <h4 className="text-base font-bold text-[#0F172A] dark:text-slate-100 font-heading mb-2">
                        {tool.name}
                      </h4>
                      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                        {tool.description}
                      </p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>

            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
