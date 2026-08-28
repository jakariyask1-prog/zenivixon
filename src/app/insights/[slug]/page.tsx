import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { INSIGHTS_DATA } from "@/data/insights";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Clock, CheckCircle2, ArrowLeft, Calendar, User, ArrowRight } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { COMPANY_INFO } from "@/lib/constants";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return INSIGHTS_DATA.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = INSIGHTS_DATA.find((a) => a.slug === slug);
  if (!article) {
    return { title: "Article Not Found | ZENIVIXON" };
  }

  return {
    title: `${article.title} | ZENIVIXON Insights`,
    description: article.summary,
  };
}

export default async function InsightDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = INSIGHTS_DATA.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  return (
    <>
      <PageHeader
        badge={article.category}
        title={article.title}
        description={article.summary}
        breadcrumbs={[
          { label: "Insights", href: "/insights" },
          { label: article.title },
        ]}
      />

      <div className="py-16 md:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Back navigation & Metadata row */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-slate-200 dark:border-slate-800">
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Insights
          </Link>
          <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 font-medium">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {formatDate(article.publishDate)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {article.readingTime}
            </span>
            <span className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" />
              {article.author.name}
            </span>
          </div>
        </div>

        {/* Key Takeaways Box */}
        {article.keyTakeaways && article.keyTakeaways.length > 0 && (
          <div className="p-6 sm:p-8 rounded-3xl bg-blue-50/50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/60 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 font-heading">
              Key Strategic Takeaways
            </span>
            <div className="space-y-3">
              {article.keyTakeaways.map((takeaway, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed font-medium">{takeaway}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Main Article Content Sections */}
        <article className="space-y-10 text-slate-700 dark:text-slate-300">
          {article.content.map((sec, idx) => (
            <section key={idx} className="space-y-3.5">
              <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white font-heading">
                {sec.heading}
              </h2>
              <p className="text-base leading-relaxed text-slate-600 dark:text-slate-300">
                {sec.body}
              </p>
            </section>
          ))}
        </article>

        {/* Bottom Author & Share Box */}
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-sm font-bold text-[#0F172A] dark:text-white font-heading">
              Written by {article.author.name}
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {article.author.role} • ZENIVIXON TECHNOLOGIES
            </p>
          </div>
          <Button variant="primary" size="sm" href="/start-a-project" icon={<ArrowRight className="w-4 h-4" />}>
            Discuss Your AI Architecture
          </Button>
        </div>
      </div>
    </>
  );
}
