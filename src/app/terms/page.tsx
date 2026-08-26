import React from "react";
import { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { COMPANY_INFO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: `Terms of Use for ${COMPANY_INFO.formalName}.`,
};

export default function TermsPage() {
  return (
    <>
      <PageHeader
        badge="LEGAL"
        title="Terms of Use"
        description={`General terms governing your use of the ${COMPANY_INFO.name} website and services.`}
        breadcrumbs={[{ label: "Terms of Use" }]}
      />

      <div className="py-16 md:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-[#0F172A] dark:text-white font-heading">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing or using the website of {COMPANY_INFO.formalName} (&ldquo;ZENIVIXON&rdquo;), you agree to comply with and be bound by these Terms of Use.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-[#0F172A] dark:text-white font-heading">
            2. Intellectual Property
          </h2>
          <p>
            All content, system architectures, brand logos, code snippets, and engineering documentation published on this website are the property of {COMPANY_INFO.formalName} unless otherwise indicated.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-[#0F172A] dark:text-white font-heading">
            3. Engineering Engagement
          </h2>
          <p>
            All custom software development, AI agent implementation, and workflow automation services are governed by separate Master Services Agreements (MSAs) and Statements of Work (SOWs).
          </p>
        </section>
      </div>
    </>
  );
}
