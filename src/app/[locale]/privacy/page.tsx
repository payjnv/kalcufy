// src/app/[locale]/privacy/page.tsx
// WCAG 2.1 AA Compliant Version

import { useTranslations, useLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: "legal" });
  return {
    title: `${t("privacy.title")} | Kalcufy`,
    description: t("privacy.metaDescription"),
  };
}

export default function PrivacyPage() {
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
              Privacy Policy
            </h1>
            <p className="text-slate-600">
              <time dateTime="2026-01-24">Last updated: January 24, 2026</time>
            </p>
          </header>

          {/* Content */}
          <article className="bg-white rounded-xl shadow-sm p-6 md:p-10">
            {/* Introduction */}
            <section aria-labelledby="intro-heading" className="mb-10">
              <h2 id="intro-heading" className="text-xl font-bold text-slate-900 mb-4">
                Introduction
              </h2>
              <p className="text-slate-600 mb-4 leading-relaxed">
                Kalcufy ("we", "us", or "our") respects your privacy and is committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy, please do not access the site.
              </p>
            </section>

            {/* Section 1 */}
            <section aria-labelledby="section-1-heading" className="mb-10">
              <h2 id="section-1-heading" className="text-xl font-bold text-slate-900 mb-4">
                1. Information We Collect
              </h2>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                1.1 Information You Provide
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-6" role="list">
                <li>
                  <strong className="text-slate-800">Account Information:</strong> Name, email address, and password when you create an account
                </li>
                <li>
                  <strong className="text-slate-800">Payment Information:</strong> Billing address and payment method details (processed securely by Stripe)
                </li>
                <li>
                  <strong className="text-slate-800">Calculator Inputs:</strong> Data you enter into our calculators (saved only if you choose to save calculations)
                </li>
                <li>
                  <strong className="text-slate-800">Communications:</strong> Information you provide when contacting us
                </li>
              </ul>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                1.2 Information Collected Automatically
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-6" role="list">
                <li>
                  <strong className="text-slate-800">Device Information:</strong> Browser type, operating system, device type
                </li>
                <li>
                  <strong className="text-slate-800">Usage Data:</strong> Pages visited, time spent, clicks, and interactions
                </li>
                <li>
                  <strong className="text-slate-800">IP Address:</strong> Your internet protocol address
                </li>
                <li>
                  <strong className="text-slate-800">Cookies:</strong> Small data files stored on your device (see Cookie Policy)
                </li>
                <li>
                  <strong className="text-slate-800">Analytics:</strong> Aggregated usage statistics through Google Analytics
                </li>
              </ul>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                1.3 Information from Third Parties
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-slate-600" role="list">
                <li>
                  <strong className="text-slate-800">Social Login:</strong> If you sign in with Google or GitHub, we receive your name and email
                </li>
                <li>
                  <strong className="text-slate-800">Payment Processors:</strong> Transaction confirmations from Stripe
                </li>
              </ul>
            </section>

            {/* Section 2 */}
            <section aria-labelledby="section-2-heading" className="mb-10">
              <h2 id="section-2-heading" className="text-xl font-bold text-slate-900 mb-4">
                2. How We Use Your Information
              </h2>
              <p className="text-slate-600 mb-4">We use the information we collect to:</p>
              <ul className="list-disc pl-6 space-y-2 text-slate-600" role="list">
                <li>Provide, maintain, and improve our services</li>
                <li>Process your transactions and manage your account</li>
                <li>Save your calculations and preferences</li>
                <li>Send you service-related communications</li>
                <li>Respond to your inquiries and provide customer support</li>
                <li>Analyze usage patterns to improve user experience</li>
                <li>Detect, prevent, and address technical issues or fraud</li>
                <li>Comply with legal obligations</li>
                <li>Display relevant advertisements (through Google AdSense)</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section aria-labelledby="section-3-heading" className="mb-10">
              <h2 id="section-3-heading" className="text-xl font-bold text-slate-900 mb-4">
                3. Legal Basis for Processing (GDPR)
              </h2>
              <p className="text-slate-600 mb-4">
                If you are in the European Economic Area (EEA), we process your personal data based on:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-600" role="list">
                <li>
                  <strong className="text-slate-800">Contract Performance:</strong> To provide services you requested
                </li>
                <li>
                  <strong className="text-slate-800">Legitimate Interests:</strong> To improve our services and prevent fraud
                </li>
                <li>
                  <strong className="text-slate-800">Consent:</strong> For marketing communications and non-essential cookies
                </li>
                <li>
                  <strong className="text-slate-800">Legal Obligation:</strong> To comply with applicable laws
                </li>
              </ul>
            </section>

            {/* Section 4 */}
            <section aria-labelledby="section-4-heading" className="mb-10">
              <h2 id="section-4-heading" className="text-xl font-bold text-slate-900 mb-4">
                4. Sharing Your Information
              </h2>
              <p className="text-slate-600 mb-4">
                We do not sell your personal information. We may share your information with:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-6" role="list">
                <li>
                  <strong className="text-slate-800">Service Providers:</strong> Third parties that help us operate our services (hosting, analytics, payments)
                </li>
                <li>
                  <strong className="text-slate-800">Advertising Partners:</strong> Google AdSense for displaying ads (anonymized data)
                </li>
                <li>
                  <strong className="text-slate-800">Legal Requirements:</strong> When required by law or to protect our rights
                </li>
                <li>
                  <strong className="text-slate-800">Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets
                </li>
              </ul>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Our Service Providers Include:
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-slate-600" role="list">
                <li><strong className="text-slate-800">Vercel:</strong> Website hosting</li>
                <li><strong className="text-slate-800">Neon:</strong> Database services</li>
                <li><strong className="text-slate-800">Stripe:</strong> Payment processing</li>
                <li><strong className="text-slate-800">Google Analytics:</strong> Website analytics</li>
                <li><strong className="text-slate-800">Google AdSense:</strong> Advertising</li>
              </ul>
            </section>

            {/* Section 5 */}
            <section aria-labelledby="section-5-heading" className="mb-10">
              <h2 id="section-5-heading" className="text-xl font-bold text-slate-900 mb-4">
                5. Cookies and Tracking Technologies
              </h2>
              <p className="text-slate-600 mb-4">
                We use cookies and similar tracking technologies to collect and track information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
              </p>
              <p className="text-slate-600">
                For more details, please see our{" "}
                <Link
                  href={`/${locale}/cookies`}
                  className="text-blue-600 hover:text-blue-700 underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                >
                  Cookie Policy
                </Link>
                .
              </p>
            </section>

            {/* Section 6 */}
            <section aria-labelledby="section-6-heading" className="mb-10">
              <h2 id="section-6-heading" className="text-xl font-bold text-slate-900 mb-4">
                6. Data Security
              </h2>
              <p className="text-slate-600 mb-4">
                We implement appropriate technical and organizational security measures to protect your personal data:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-4" role="list">
                <li>SSL/TLS encryption for data in transit</li>
                <li>Encrypted database storage</li>
                <li>Regular security assessments</li>
                <li>Access controls and authentication</li>
                <li>Secure payment processing through Stripe (PCI compliant)</li>
              </ul>
              <p className="text-slate-600">
                However, no method of transmission over the Internet is 100% secure. While we strive to protect your data, we cannot guarantee absolute security.
              </p>
            </section>

            {/* Section 7 */}
            <section aria-labelledby="section-7-heading" className="mb-10">
              <h2 id="section-7-heading" className="text-xl font-bold text-slate-900 mb-4">
                7. Data Retention
              </h2>
              <p className="text-slate-600 mb-4">
                We retain your personal data only for as long as necessary:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-600" role="list">
                <li>
                  <strong className="text-slate-800">Account Data:</strong> Until you delete your account
                </li>
                <li>
                  <strong className="text-slate-800">Saved Calculations:</strong> Until you delete them or your account
                </li>
                <li>
                  <strong className="text-slate-800">Transaction Records:</strong> 7 years (for tax and legal compliance)
                </li>
                <li>
                  <strong className="text-slate-800">Analytics Data:</strong> 26 months (Google Analytics default)
                </li>
              </ul>
            </section>

            {/* Section 8 */}
            <section aria-labelledby="section-8-heading" className="mb-10">
              <h2 id="section-8-heading" className="text-xl font-bold text-slate-900 mb-4">
                8. Your Privacy Rights (GDPR)
              </h2>
              <p className="text-slate-600 mb-4">
                If you are in the EEA, UK, or Switzerland, you have the following rights:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-4" role="list">
                <li><strong className="text-slate-800">Right to Access:</strong> Request copies of your personal data</li>
                <li><strong className="text-slate-800">Right to Rectification:</strong> Request correction of inaccurate data</li>
                <li><strong className="text-slate-800">Right to Erasure:</strong> Request deletion of your personal data</li>
                <li><strong className="text-slate-800">Right to Restrict Processing:</strong> Request limitation of data processing</li>
                <li><strong className="text-slate-800">Right to Data Portability:</strong> Request transfer of your data</li>
                <li><strong className="text-slate-800">Right to Object:</strong> Object to processing based on legitimate interests</li>
                <li><strong className="text-slate-800">Right to Withdraw Consent:</strong> Withdraw consent at any time</li>
              </ul>
              <p className="text-slate-600">
                To exercise these rights, contact us at{" "}
                <a
                  href="mailto:privacy@kalcufy.com"
                  className="text-blue-600 hover:text-blue-700 underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                >
                  privacy@kalcufy.com
                </a>
                . We will respond within 30 days.
              </p>
            </section>

            {/* Section 9 */}
            <section aria-labelledby="section-9-heading" className="mb-10">
              <h2 id="section-9-heading" className="text-xl font-bold text-slate-900 mb-4">
                9. California Privacy Rights (CCPA)
              </h2>
              <p className="text-slate-600 mb-4">
                If you are a California resident, you have additional rights:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-4" role="list">
                <li><strong className="text-slate-800">Right to Know:</strong> What personal information we collect, use, and share</li>
                <li><strong className="text-slate-800">Right to Delete:</strong> Request deletion of your personal information</li>
                <li><strong className="text-slate-800">Right to Opt-Out:</strong> Opt-out of the sale of personal information (we do not sell your data)</li>
                <li><strong className="text-slate-800">Right to Non-Discrimination:</strong> We will not discriminate against you for exercising your rights</li>
              </ul>
              <p className="text-slate-600">
                <strong className="text-slate-800">Do Not Sell My Personal Information:</strong> We do not sell personal information. However, some data sharing with advertising partners may be considered a "sale" under CCPA.
              </p>
            </section>

            {/* Section 10 */}
            <section aria-labelledby="section-10-heading" className="mb-10">
              <h2 id="section-10-heading" className="text-xl font-bold text-slate-900 mb-4">
                10. Children's Privacy
              </h2>
              <p className="text-slate-600">
                Our Service is not intended for children under 18 years of age. We do not knowingly collect personal information from children. If you become aware that a child has provided us with personal data, please contact us.
              </p>
            </section>

            {/* Section 11 */}
            <section aria-labelledby="section-11-heading" className="mb-10">
              <h2 id="section-11-heading" className="text-xl font-bold text-slate-900 mb-4">
                11. International Data Transfers
              </h2>
              <p className="text-slate-600 mb-4">
                Your information may be transferred to and processed in countries other than your country of residence. We ensure appropriate safeguards:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-600" role="list">
                <li>Standard Contractual Clauses approved by the European Commission</li>
                <li>Data Processing Agreements with all service providers</li>
                <li>Compliance with applicable data protection frameworks</li>
              </ul>
            </section>

            {/* Section 12 */}
            <section aria-labelledby="section-12-heading" className="mb-10">
              <h2 id="section-12-heading" className="text-xl font-bold text-slate-900 mb-4">
                12. Third-Party Links
              </h2>
              <p className="text-slate-600">
                Our Service may contain links to third-party websites. We are not responsible for the privacy practices of these websites. We encourage you to read their privacy policies.
              </p>
            </section>

            {/* Section 13 */}
            <section aria-labelledby="section-13-heading" className="mb-10">
              <h2 id="section-13-heading" className="text-xl font-bold text-slate-900 mb-4">
                13. Changes to This Privacy Policy
              </h2>
              <p className="text-slate-600 mb-4">
                We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
              </p>
              <p className="text-slate-600">
                We encourage you to review this Privacy Policy periodically for any changes.
              </p>
            </section>

            {/* Section 14 - Contact */}
            <section aria-labelledby="section-14-heading" className="mb-10">
              <h2 id="section-14-heading" className="text-xl font-bold text-slate-900 mb-4">
                14. Contact Us
              </h2>
              <p className="text-slate-600 mb-4">
                If you have questions about this Privacy Policy or want to exercise your privacy rights, please contact us:
              </p>
              <address className="not-italic text-slate-600 space-y-2">
                <p>
                  <strong className="text-slate-800">Email:</strong>{" "}
                  <a
                    href="mailto:privacy@kalcufy.com"
                    className="text-blue-600 hover:text-blue-700 underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                  >
                    privacy@kalcufy.com
                  </a>
                </p>
                <p>
                  <strong className="text-slate-800">General Inquiries:</strong>{" "}
                  <a
                    href="mailto:support@kalcufy.com"
                    className="text-blue-600 hover:text-blue-700 underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                  >
                    support@kalcufy.com
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
              <p className="text-slate-600 mt-4">
                If you are in the EEA and believe we have not adequately addressed your concerns, you have the right to lodge a complaint with your local data protection authority.
              </p>
            </section>

            {/* Acknowledgment */}
            <section className="p-4 bg-slate-50 rounded-lg">
              <p className="text-slate-600 text-center">
                By using Kalcufy, you acknowledge that you have read and understood this Privacy Policy.
              </p>
            </section>
          </article>

          {/* Related Links */}
          <nav aria-label="Related legal pages" className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link
              href={`/${locale}/terms`}
              className="flex-1 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow text-center font-medium text-slate-700 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Terms of Service →
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
