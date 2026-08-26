import React from "react";
import { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { ProjectsCatalog } from "@/components/sections/ProjectsCatalog";
import { Button } from "@/components/ui/Button";
import { COMPANY_INFO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Projects & Case Studies | Real-World AI Systems in Production",
  description:
    "Explore ZENIVIXON's portfolio of deployed AI agents, intelligent document extraction pipelines, and enterprise software integrations.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        badge="PROJECT SHOWCASE"
        title="Real Work. Practical AI Systems."
        description="Explore our portfolio of AI agents, intelligent document automation pipelines, and custom enterprise software integrations."
        breadcrumbs={[{ label: "Projects" }]}
      />

      <div className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <ProjectsCatalog />

        {/* Bottom CTA */}
        <div className="rounded-2xl bg-[#F7F9FC] dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800 p-8 sm:p-12 text-center space-y-6 shadow-sm mt-16">
          <h3 className="text-2xl font-bold text-[#0F172A] dark:text-white font-heading">
            Have a project in mind?
          </h3>
          <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto text-sm leading-relaxed">
            Tell us about your requirements and we will review your current workflow to provide a clear, practical implementation proposal.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Button variant="primary" size="md" href="/start-a-project">
              Tell Us About Your Project
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
