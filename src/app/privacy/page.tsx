import React from "react";
import { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { COMPANY_INFO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy Policy for ${COMPANY_INFO.formalName}.`,
};

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        badge="LEGAL"
        title="Privacy Policy"
        description={`How ${COMPANY_INFO.formalName} collects, protects, and processes your information.`}
        breadcrumbs={[{ label: "Privacy Policy" }]}
      />

      <div className="py-16 md:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-[#0F172A] dark:text-white font-heading">
            1. Information We Collect
          </h2>
          <p>
            When you submit an inquiry or project brief through {COMPANY_INFO.formalName} (&ldquo;ZENIVIXON&rdquo;), we collect business contact details such as your name, corporate email address, company name, and project requirements.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-[#0F172A] dark:text-white font-heading">
            2. How We Use Your Information
          </h2>
          <p>
            We use the information provided solely to review your technical requirements, prepare architecture proposals, communicate regarding project consultations, and execute engineering services requested by you.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-[#0F172A] dark:text-white font-heading">
            3. Data Confidentiality &amp; Security
          </h2>
          <p>
            We enforce strict data governance and confidentiality. Any workflow architectures, system credentials, or proprietary documents shared during discovery are protected under mutual non-disclosure agreements (NDAs).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-[#0F172A] dark:text-white font-heading">
            4. Contact
          </h2>
          <p>
            For privacy-related inquiries, contact us at{" "}
            <a href={`mailto:${COMPANY_INFO.channels.email}`} className="text-blue-600 underline font-medium">
              {COMPANY_INFO.channels.email}
            </a>.
          </p>
        </section>
      </div>
    </>
  );
}
