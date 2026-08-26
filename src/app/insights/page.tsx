import React from "react";
import { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { INSIGHTS_DATA } from "@/data/insights";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Clock, CheckCircle2 } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { COMPANY_INFO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Insights & Technical Perspectives | Practical AI Engineering",
  description:
    "Practical articles, engineering breakdowns, and architectural guides on deploying autonomous AI agents, enterprise workflow automation, and custom RAG systems.",
};

export default function InsightsPage() {
  return (
    <>
      <PageHeader
        badge="ENGINEERING INSIGHTS"
        title="Practical Perspectives on Enterprise AI."
        description="Clear, hype-free analyses on autonomous agent architectures, intelligent document processing pipelines, and enterprise integration patterns."
        breadcrumbs={[{ label: "Insights" }]}
      />

      <div className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {INSIGHTS_DATA.map((article) => (
            <div
              key={article.slug}
              className="rounded-2xl bg-white border border-slate-200 dark:border-slate-800/90 shadow-sm p-8 flex flex-col justify-between hover:border-slate-300 hover:shadow-md transition-all duration-300 group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="blue" size="sm">
                    {article.category}
                  </Badge>
                  <div className="flex items-center gap-1.5 text-xs font-heading text-slate-500 dark:text-slate-400 font-semibold">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{article.readingTime}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-[#0F172A] dark:text-white font-heading leading-snug group-hover:text-blue-600 transition-colors">
                  {article.title}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {article.summary}
                </p>

                {/* Key Takeaways */}
                <div className="pt-2 space-y-2 border-t border-slate-100">
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-widest font-heading">
                    Core Insights:
                  </span>
                  {article.keyTakeaways.slice(0, 2).map((takeaway, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 shrink-0 mt-0.5" />
                      <span className="leading-snug">{takeaway}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Author, Date & CTA */}
              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-xs font-medium">
                <span className="text-slate-500 dark:text-slate-400">{article.author.name} · {formatDate(article.publishDate)}</span>
                <a
                  href={`/insights/${article.slug}`}
                  className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                >
                  Read Article →
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="rounded-2xl bg-[#F7F9FC] dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800 p-8 sm:p-12 text-center space-y-6 shadow-sm">
          <h3 className="text-2xl font-bold text-[#0F172A] dark:text-white font-heading">
            Want to discuss these concepts for your company?
          </h3>
          <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto text-sm leading-relaxed">
            Schedule a technical consultation to explore how these architectural patterns apply to your workflow.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Button variant="primary" size="md" href="/start-a-project">
              Start a Project
            </Button>
            <Button variant="whatsapp" size="md" href={COMPANY_INFO.channels.whatsapp} external>
              Chat on WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
