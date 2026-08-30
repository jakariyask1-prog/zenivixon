import React from "react";
import { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { COMPANY_INFO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy Policy for ${COMPANY_INFO.formalName}.`,
};

export default function PrivacyPage() {
  const lastUpdated = "August 31, 2026";

  return (
    <>
      <PageHeader
        badge="LEGAL"
        title="Privacy Policy"
        description={`How ${COMPANY_INFO.formalName} collects, protects, and processes your information.`}
        breadcrumbs={[{ label: "Privacy Policy" }]}
      />

      <div className="py-16 md:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
        
        <div className="text-sm font-medium text-slate-500">
          Last Updated: {lastUpdated}
        </div>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white font-heading">
            1. Introduction
          </h2>
          <p>
            Welcome to {COMPANY_INFO.formalName} (&ldquo;ZENIVIXON,&rdquo; &ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;). We are committed to protecting your personal information and your right to privacy. This Privacy Policy governs the privacy policies and practices of our website, services, and any associated applications.
          </p>
          <p>
            By accessing our website or utilizing our AI automation and software development services, you consent to the data practices described in this policy.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white font-heading">
            2. Information We Collect
          </h2>
          <p>
            We collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products and Services, when you participate in activities on the Website, or otherwise when you contact us.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Personal Information Provided by You:</strong> We collect names, phone numbers, email addresses, job titles, company names, project requirements, and other similar information.</li>
            <li><strong>Technical and Usage Data:</strong> We automatically collect certain information when you visit, use, or navigate the Website. This information does not reveal your specific identity but may include device and usage information, such as your IP address, browser and device characteristics, operating system, language preferences, referring URLs, device name, country, location, and information about how and when you use our Website.</li>
            <li><strong>Cookies and Similar Technologies:</strong> We may use cookies and similar tracking technologies to access or store information to improve user experience and analyze website traffic.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white font-heading">
            3. How We Use Your Information
          </h2>
          <p>
            We use personal information collected via our Website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>To review your technical requirements and prepare architecture proposals.</li>
            <li>To facilitate account creation and logon process.</li>
            <li>To fulfill and manage your service requests, engineering projects, and support inquiries.</li>
            <li>To send administrative information to you, such as updates to our terms, conditions, and policies.</li>
            <li>To enforce our terms, conditions, and policies for business purposes, to comply with legal and regulatory requirements or in connection with our contract.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white font-heading">
            4. Data Sharing and Disclosure
          </h2>
          <p>
            We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations. We may process or share your data that we hold based on the following legal basis:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Vendors, Consultants, and Other Third-Party Service Providers:</strong> We may share your data with third-party vendors, service providers, contractors, or agents who perform services for us or on our behalf and require access to such information to do that work (e.g., cloud hosting providers, analytics services).</li>
            <li><strong>Business Transfers:</strong> We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</li>
            <li><strong>Legal Obligations:</strong> We may disclose your information where we are legally required to do so in order to comply with applicable law, governmental requests, a judicial proceeding, court order, or legal process.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white font-heading">
            5. Data Confidentiality &amp; Security
          </h2>
          <p>
            We enforce strict data governance and confidentiality. Any workflow architectures, system credentials, API keys, or proprietary documents shared during discovery or active development are strictly protected. Where applicable, these are safeguarded under mutual non-disclosure agreements (NDAs) and Enterprise Master Services Agreements (MSAs). 
          </p>
          <p>
            We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white font-heading">
            6. Your Privacy Rights
          </h2>
          <p>
            Depending on your geographic location, you may have the right to request access to the personal information we collect from you, change that information, or delete it in some circumstances. To request to review, update, or delete your personal information, please submit a request to our contact email below.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white font-heading">
            7. International Data Transfers
          </h2>
          <p>
            {COMPANY_INFO.formalName} is based in Bangladesh and serves a global clientele. Your information may be transferred to, stored, and processed in countries other than the country in which you reside. By using our Services, you consent to the transfer of information to countries outside of your country of residence, which may have different data protection rules than those of your country.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white font-heading">
            8. Changes to This Privacy Policy
          </h2>
          <p>
            We may update this privacy notice from time to time. The updated version will be indicated by an updated &ldquo;Last Updated&rdquo; date and the updated version will be effective as soon as it is accessible. We encourage you to review this privacy notice frequently to be informed of how we are protecting your information.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white font-heading">
            9. Contact Us
          </h2>
          <p>
            If you have questions or comments about this notice, you may email us at{" "}
            <a href={`mailto:${COMPANY_INFO.channels.email}`} className="text-blue-600 dark:text-blue-400 underline font-medium">
              {COMPANY_INFO.channels.email}
            </a>{" "}
            or contact us via WhatsApp at{" "}
            <a href={COMPANY_INFO.channels.whatsapp} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline font-medium">
              {COMPANY_INFO.channels.whatsappNumber}
            </a>.
          </p>
        </section>
      </div>
    </>
  );
}
