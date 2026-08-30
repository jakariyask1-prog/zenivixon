import React from "react";
import { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { COMPANY_INFO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: `Terms of Use for ${COMPANY_INFO.formalName}.`,
};

export default function TermsPage() {
  const lastUpdated = "August 31, 2026";

  return (
    <>
      <PageHeader
        badge="LEGAL"
        title="Terms of Use"
        description={`General terms governing your use of the ${COMPANY_INFO.name} website and services.`}
        breadcrumbs={[{ label: "Terms of Use" }]}
      />

      <div className="py-16 md:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
        
        <div className="text-sm font-medium text-slate-500">
          Last Updated: {lastUpdated}
        </div>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white font-heading">
            1. Agreement to Terms
          </h2>
          <p>
            These Terms of Use constitute a legally binding agreement made between you, whether personally or on behalf of an entity (&ldquo;you&rdquo;), and {COMPANY_INFO.formalName} (&ldquo;ZENIVIXON,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;), concerning your access to and use of our website as well as any other media form, media channel, or mobile website related, linked, or otherwise connected thereto.
          </p>
          <p>
            By accessing or using the website and our services, you agree that you have read, understood, and agreed to be bound by all of these Terms of Use. If you do not agree with all of these Terms of Use, then you are expressly prohibited from using the site and must discontinue use immediately.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white font-heading">
            2. Intellectual Property Rights
          </h2>
          <p>
            Unless otherwise indicated, the website and its original content, features, and functionality are owned by {COMPANY_INFO.formalName} and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws. 
          </p>
          <p>
            You may not copy, reproduce, aggregate, republish, upload, post, publicly display, encode, translate, transmit, distribute, sell, license, or otherwise exploit for any commercial purpose whatsoever, any part of our website or its content without our express prior written permission.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white font-heading">
            3. Engineering Engagement &amp; Client Services
          </h2>
          <p>
            While this website outlines our capabilities—including custom software development, AI agent implementation, and workflow automation—the actual provision of these services is governed by separate, project-specific Master Services Agreements (MSAs) and Statements of Work (SOWs).
          </p>
          <p>
            Any pilot programs, including our 14-Day Pilot, are subject to explicit evaluation criteria agreed upon by both parties prior to commencement. Estimates provided by calculators on this website (e.g., ROI calculators) are illustrative estimates only and do not constitute a financial guarantee.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white font-heading">
            4. User Representations
          </h2>
          <p>
            By using the Site, you represent and warrant that: (1) you have the legal capacity and you agree to comply with these Terms of Use; (2) you are not a minor in the jurisdiction in which you reside; (3) you will not access the Site through automated or non-human means, whether through a bot, script, or otherwise, without our permission; and (4) your use of the Site will not violate any applicable law or regulation.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white font-heading">
            5. Disclaimers and Warranties
          </h2>
          <p>
            THE SITE IS PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. YOU AGREE THAT YOUR USE OF THE SITE AND OUR SERVICES WILL BE AT YOUR SOLE RISK. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, IN CONNECTION WITH THE SITE AND YOUR USE THEREOF.
          </p>
          <p>
            We make no warranties or representations about the accuracy or completeness of the site’s content or the content of any websites linked to the site. We assume no liability or responsibility for any (1) errors, mistakes, or inaccuracies of content and materials, (2) personal injury or property damage, of any nature whatsoever, resulting from your access to and use of the site, or (3) any unauthorized access to or use of our secure servers and/or any and all personal information and/or financial information stored therein.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white font-heading">
            6. Limitation of Liability
          </h2>
          <p>
            IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFIT, LOST REVENUE, LOSS OF DATA, OR OTHER DAMAGES ARISING FROM YOUR USE OF THE SITE, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white font-heading">
            7. Governing Law and Jurisdiction
          </h2>
          <p>
            These Terms shall be governed by and defined following the laws of Bangladesh. {COMPANY_INFO.formalName} and yourself irrevocably consent that the courts of Bangladesh shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these terms.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white font-heading">
            8. Modifications and Interruptions
          </h2>
          <p>
            We reserve the right to change, modify, or remove the contents of the Site at any time or for any reason at our sole discretion without notice. We also reserve the right to modify or discontinue all or part of the Site without notice at any time. We will not be liable to you or any third party for any modification, price change, suspension, or discontinuance of the Site.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white font-heading">
            9. Contact Information
          </h2>
          <p>
            In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at:
          </p>
          <div className="pt-2">
            <p className="font-semibold text-slate-800 dark:text-slate-200">{COMPANY_INFO.formalName}</p>
            <p>Khulna, Bangladesh</p>
            <p>Email: <a href={`mailto:${COMPANY_INFO.channels.email}`} className="text-blue-600 dark:text-blue-400 underline font-medium">{COMPANY_INFO.channels.email}</a></p>
            <p>WhatsApp: <a href={COMPANY_INFO.channels.whatsapp} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline font-medium">{COMPANY_INFO.channels.whatsappNumber}</a></p>
          </div>
        </section>
      </div>
    </>
  );
}
