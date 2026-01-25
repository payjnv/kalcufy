// src/app/[locale]/terms/page.tsx
// WCAG 2.1 AA Compliant Version

import { useTranslations, useLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: "legal" });
  return {
    title: `${t("terms.title")} | Kalcufy`,
    description: t("terms.metaDescription"),
  };
}

export default function TermsPage() {
  const t = useTranslations("legal");
  const locale = useLocale();

  return (
    <>
      {/* Skip to main content link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Skip to main content
      </a>

      <Header />

      <main id="main-content" className="pt-24 pb-16 min-h-screen bg-slate-50">
        <div className="container max-w-4xl">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <Link
              href={`/${locale}`}
              className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
                focusable="false"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
            </Link>
          </nav>

          {/* Page Header */}
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
              Terms of Service
            </h1>
            <p className="text-slate-600">
              <time dateTime="2026-01-24">Last updated: January 24, 2026</time>
            </p>
          </header>

          {/* Content */}
          <article className="bg-white rounded-xl shadow-sm p-6 md:p-10">
            {/* Section 1 */}
            <section aria-labelledby="section-1-heading" className="mb-10">
              <h2 id="section-1-heading" className="text-xl font-bold text-slate-900 mb-4">
                1. Agreement to Terms
              </h2>
              <p className="text-slate-600 mb-4 leading-relaxed">
                By accessing or using Kalcufy ("Service", "Website", "we", "us", or "our"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of these terms, you do not have permission to access the Service.
              </p>
              <p className="text-slate-600 leading-relaxed">
                These Terms apply to all visitors, users, and others who access or use the Service. By using the Service, you represent that you are at least 18 years of age. If you are under 18, you may not use the Service under any circumstances.
              </p>
            </section>

            {/* Section 2 */}
            <section aria-labelledby="section-2-heading" className="mb-10">
              <h2 id="section-2-heading" className="text-xl font-bold text-slate-900 mb-4">
                2. Description of Service
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Kalcufy provides online calculators for financial planning, health metrics, and other computational tools. Our Service includes free calculators and optional premium features ("PRO") available through paid subscriptions.
              </p>
            </section>

            {/* Section 3 - Important Disclaimer */}
            <section 
              aria-labelledby="section-3-heading" 
              className="mb-10 p-6 bg-amber-50 border border-amber-200 rounded-xl"
              role="alert"
            >
              <h2 id="section-3-heading" className="text-xl font-bold text-amber-800 mb-4">
                3. Important Disclaimer - READ CAREFULLY
              </h2>
              <p className="text-amber-900 font-semibold mb-4">
                THE CALCULATORS AND TOOLS PROVIDED BY KALCUFY ARE FOR INFORMATIONAL AND EDUCATIONAL PURPOSES ONLY.
              </p>
              <div className="space-y-4 text-amber-800">
                <p>
                  <strong>NOT PROFESSIONAL ADVICE:</strong> The results, calculations, projections, and information provided by our Service do NOT constitute financial advice, investment advice, tax advice, legal advice, medical advice, or any other form of professional advice.
                </p>
                <p>
                  <strong>ESTIMATES ONLY:</strong> All calculations are estimates based on the information you provide and general formulas. Actual results may vary significantly due to factors not considered by our calculators, including but not limited to: market conditions, individual circumstances, changes in laws or regulations, and mathematical rounding.
                </p>
                <p>
                  <strong>SEEK PROFESSIONAL GUIDANCE:</strong> Before making any financial, health, or other important decisions, you should consult with qualified professionals such as certified financial planners, accountants, lawyers, doctors, or other licensed advisors.
                </p>
                <p>
                  <strong>NO GUARANTEE OF ACCURACY:</strong> While we strive to provide accurate calculations, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the calculations or information provided.
                </p>
              </div>
            </section>

            {/* Section 4 */}
            <section aria-labelledby="section-4-heading" className="mb-10">
              <h2 id="section-4-heading" className="text-xl font-bold text-slate-900 mb-4">
                4. User Accounts
              </h2>
              <p className="text-slate-600 mb-4 leading-relaxed">
                When you create an account with us, you must provide accurate, complete, and current information. Failure to do so constitutes a breach of the Terms.
              </p>
              <p className="text-slate-600 mb-4 leading-relaxed">
                You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password.
              </p>
              <p className="text-slate-600 leading-relaxed">
                You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
              </p>
            </section>

            {/* Section 5 */}
            <section aria-labelledby="section-5-heading" className="mb-10">
              <h2 id="section-5-heading" className="text-xl font-bold text-slate-900 mb-4">
                5. Subscriptions and Payments
              </h2>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                5.1 Free and Paid Services
              </h3>
              <p className="text-slate-600 mb-4 leading-relaxed">
                Some parts of the Service are available for free. Other parts require a paid subscription ("PRO Plan"). By subscribing to a PRO Plan, you agree to pay the subscription fees indicated for that plan.
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                5.2 Billing
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-4" role="list">
                <li>Subscription fees are billed in advance on a monthly or annual basis</li>
                <li>All payments are processed securely through Stripe</li>
                <li>Prices are subject to change with reasonable notice</li>
                <li>You are responsible for all applicable taxes</li>
              </ul>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                5.3 Cancellation
              </h3>
              <p className="text-slate-600 leading-relaxed">
                You may cancel your subscription at any time through your account settings. Upon cancellation, your subscription will remain active until the end of the current billing period. No refunds will be provided for partial months or unused time.
              </p>
            </section>

            {/* Section 6 */}
            <section aria-labelledby="section-6-heading" className="mb-10">
              <h2 id="section-6-heading" className="text-xl font-bold text-slate-900 mb-4">
                6. Intellectual Property
              </h2>
              <p className="text-slate-600 mb-4 leading-relaxed">
                The Service and its original content, features, and functionality are and will remain the exclusive property of Kalcufy and its licensors. The Service is protected by copyright, trademark, and other laws.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Our trademarks and trade dress may not be used in connection with any product or service without our prior written consent.
              </p>
            </section>

            {/* Section 7 */}
            <section aria-labelledby="section-7-heading" className="mb-10">
              <h2 id="section-7-heading" className="text-xl font-bold text-slate-900 mb-4">
                7. User Content
              </h2>
              <p className="text-slate-600 mb-4 leading-relaxed">
                When you save calculations or other data to our Service, you retain ownership of that content. However, by saving content to our Service, you grant us a license to store, backup, and display that content to you.
              </p>
              <p className="text-slate-600 leading-relaxed">
                We do not claim ownership of your saved calculations or personal data. You may delete your data at any time through your account settings.
              </p>
            </section>

            {/* Section 8 */}
            <section aria-labelledby="section-8-heading" className="mb-10">
              <h2 id="section-8-heading" className="text-xl font-bold text-slate-900 mb-4">
                8. Prohibited Uses
              </h2>
              <p className="text-slate-600 mb-4">
                You agree not to use the Service:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-600" role="list">
                <li>For any unlawful purpose or to violate any laws</li>
                <li>To harass, abuse, or harm another person</li>
                <li>To impersonate or attempt to impersonate another user or person</li>
                <li>To interfere with or disrupt the Service or servers</li>
                <li>To introduce viruses, malware, or other malicious code</li>
                <li>To scrape, data mine, or extract data without permission</li>
                <li>To use automated systems (bots) to access the Service</li>
                <li>To attempt to gain unauthorized access to any portion of the Service</li>
                <li>To use the Service in any way that could damage or overburden our infrastructure</li>
              </ul>
            </section>

            {/* Section 9 */}
            <section aria-labelledby="section-9-heading" className="mb-10">
              <h2 id="section-9-heading" className="text-xl font-bold text-slate-900 mb-4">
                9. Third-Party Services
              </h2>
              <p className="text-slate-600 mb-4 leading-relaxed">
                Our Service may contain links to third-party websites or services that are not owned or controlled by Kalcufy. We use the following third-party services:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-4" role="list">
                <li><strong className="text-slate-800">Stripe:</strong> Payment processing</li>
                <li><strong className="text-slate-800">Google Analytics:</strong> Usage analytics</li>
                <li><strong className="text-slate-800">Google AdSense:</strong> Advertising</li>
                <li><strong className="text-slate-800">Google/GitHub:</strong> Authentication (optional)</li>
              </ul>
              <p className="text-slate-600 leading-relaxed">
                We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services.
              </p>
            </section>

            {/* Section 10 */}
            <section aria-labelledby="section-10-heading" className="mb-10">
              <h2 id="section-10-heading" className="text-xl font-bold text-slate-900 mb-4">
                10. Limitation of Liability
              </h2>
              <p className="text-slate-600 mb-4 leading-relaxed">
                IN NO EVENT SHALL KALCUFY, ITS DIRECTORS, EMPLOYEES, PARTNERS, AGENTS, SUPPLIERS, OR AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-4" role="list">
                <li>Loss of profits, revenue, data, or use</li>
                <li>Financial losses based on calculator results</li>
                <li>Health decisions based on calculator results</li>
                <li>Business interruption</li>
                <li>Any other intangible losses</li>
              </ul>
              <p className="text-slate-600 leading-relaxed">
                This applies whether based on warranty, contract, tort, negligence, strict liability, or any other legal theory, even if we have been advised of the possibility of such damages.
              </p>
            </section>

            {/* Section 11 */}
            <section aria-labelledby="section-11-heading" className="mb-10">
              <h2 id="section-11-heading" className="text-xl font-bold text-slate-900 mb-4">
                11. Disclaimer of Warranties
              </h2>
              <p className="text-slate-600 mb-4 leading-relaxed">
                THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. KALCUFY MAKES NO WARRANTIES, EXPRESSED OR IMPLIED, AND HEREBY DISCLAIMS ALL WARRANTIES INCLUDING:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-600" role="list">
                <li>Merchantability and fitness for a particular purpose</li>
                <li>Non-infringement of third-party rights</li>
                <li>Accuracy or reliability of any calculations or results</li>
                <li>Uninterrupted or error-free operation</li>
                <li>Security of data or communications</li>
              </ul>
            </section>

            {/* Section 12 */}
            <section aria-labelledby="section-12-heading" className="mb-10">
              <h2 id="section-12-heading" className="text-xl font-bold text-slate-900 mb-4">
                12. Indemnification
              </h2>
              <p className="text-slate-600 leading-relaxed">
                You agree to defend, indemnify, and hold harmless Kalcufy and its licensees, employees, contractors, agents, officers, and directors from any claims, damages, obligations, losses, liabilities, costs, or expenses arising from your use of the Service or violation of these Terms.
              </p>
            </section>

            {/* Section 13 */}
            <section aria-labelledby="section-13-heading" className="mb-10">
              <h2 id="section-13-heading" className="text-xl font-bold text-slate-900 mb-4">
                13. Termination
              </h2>
              <p className="text-slate-600 mb-4 leading-relaxed">
                We may terminate or suspend your account immediately, without prior notice or liability, for any reason, including breach of these Terms.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Upon termination, your right to use the Service will immediately cease. If you wish to terminate your account, you may do so through your account settings or by contacting us.
              </p>
            </section>

            {/* Section 14 */}
            <section aria-labelledby="section-14-heading" className="mb-10">
              <h2 id="section-14-heading" className="text-xl font-bold text-slate-900 mb-4">
                14. Governing Law
              </h2>
              <p className="text-slate-600 leading-relaxed">
                These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which Kalcufy operates, without regard to its conflict of law provisions.
              </p>
            </section>

            {/* Section 15 */}
            <section aria-labelledby="section-15-heading" className="mb-10">
              <h2 id="section-15-heading" className="text-xl font-bold text-slate-900 mb-4">
                15. Changes to Terms
              </h2>
              <p className="text-slate-600 mb-4 leading-relaxed">
                We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect.
              </p>
              <p className="text-slate-600 leading-relaxed">
                By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.
              </p>
            </section>

            {/* Section 16 - Contact */}
            <section aria-labelledby="section-16-heading" className="mb-10">
              <h2 id="section-16-heading" className="text-xl font-bold text-slate-900 mb-4">
                16. Contact Us
              </h2>
              <p className="text-slate-600 mb-4">
                If you have any questions about these Terms, please contact us:
              </p>
              <address className="not-italic text-slate-600 space-y-2">
                <p>
                  <strong className="text-slate-800">Email:</strong>{" "}
                  <a
                    href="mailto:legal@kalcufy.com"
                    className="text-blue-600 hover:text-blue-700 underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                  >
                    legal@kalcufy.com
                  </a>
                </p>
                <p>
                  <strong className="text-slate-800">Website:</strong>{" "}
                  <a
                    href="https://kalcufy.com"
                    className="text-blue-600 hover:text-blue-700 underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                  >
                    kalcufy.com
                  </a>
                </p>
              </address>
            </section>

            {/* Acknowledgment */}
            <section className="p-4 bg-slate-50 rounded-lg">
              <p className="text-slate-600 text-center">
                By using Kalcufy, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
              </p>
            </section>
          </article>

          {/* Related Links */}
          <nav aria-label="Related legal pages" className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link
              href={`/${locale}/privacy`}
              className="flex-1 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow text-center font-medium text-slate-700 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Privacy Policy →
            </Link>
            <Link
              href={`/${locale}/cookies`}
              className="flex-1 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow text-center font-medium text-slate-700 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Cookie Policy →
            </Link>
          </nav>
        </div>
      </main>

      <Footer />
    </>
  );
}
