import React from "react";
import { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { COMPANY_INFO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: `Cookie Policy for ${COMPANY_INFO.formalName}.`,
};

export default function CookiePolicyPage() {
  return (
    <>
      <PageHeader
        badge="LEGAL"
        title="Cookie Policy"
        description={`Information regarding cookies and telemetry on the ${COMPANY_INFO.name} website.`}
        breadcrumbs={[{ label: "Cookie Policy" }]}
      />

      <div className="py-16 md:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-slate-600 text-sm leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-[#0F172A] font-heading">
            1. What Are Cookies
          </h2>
          <p>
            Cookies are small text files placed on your device to assist in site navigation, preserve session preferences, and understand website performance.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-[#0F172A] font-heading">
            2. How We Use Cookies
          </h2>
          <p>
            We utilize only essential cookies necessary for site functionality and privacy-compliant anonymous analytics to evaluate user traffic from international markets.
          </p>
        </section>
      </div>
    </>
  );
}
