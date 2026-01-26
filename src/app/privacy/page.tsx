"use client";

import Link from 'next/link';
import { useParams } from 'next/navigation';
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
  const params = useParams();
  const locale = params.locale as string || 'en';
  
  const currentDate = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-50 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4">
          {/* Header */}
          <div className="mb-12">
            <Link 
              href={`/${locale}`}
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
            </Link>
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Privacy Policy</h1>
            <p className="text-slate-600">Last updated: {currentDate}</p>
          </div>

          {/* Content */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-12">
            <div className="prose prose-slate max-w-none">
              
              {/* Introduction */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Introduction</h2>
                <p className="text-slate-600 leading-relaxed">
                  Kalcufy ("we", "us", or "our") respects your privacy and is committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.
                </p>
                <p className="text-slate-600 leading-relaxed mt-4">
                  Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy, please do not access the site.
                </p>
              </section>

              {/* 1. Information We Collect */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Information We Collect</h2>
                
                <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">1.1 Information You Provide</h3>
                <ul className="list-disc pl-6 text-slate-600 space-y-2">
                  <li><strong>Account Information:</strong> Name, email address, and password when you create an account</li>
                  <li><strong>Payment Information:</strong> Billing address and payment method details (processed securely by Stripe)</li>
                  <li><strong>Calculator Inputs:</strong> Data you enter into our calculators (saved only if you choose to save calculations)</li>
                  <li><strong>Communications:</strong> Information you provide when contacting us</li>
                </ul>

                <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">1.2 Information Collected Automatically</h3>
                <ul className="list-disc pl-6 text-slate-600 space-y-2">
                  <li><strong>Device Information:</strong> Browser type, operating system, device type</li>
                  <li><strong>Usage Data:</strong> Pages visited, time spent, clicks, and interactions</li>
                  <li><strong>IP Address:</strong> Your internet protocol address</li>
                  <li><strong>Cookies:</strong> Small data files stored on your device (see Cookie Policy)</li>
                  <li><strong>Analytics:</strong> Aggregated usage statistics through Google Analytics</li>
                </ul>

                <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">1.3 Information from Third Parties</h3>
                <ul className="list-disc pl-6 text-slate-600 space-y-2">
                  <li><strong>Social Login:</strong> If you sign in with Google or GitHub, we receive your name and email</li>
                  <li><strong>Payment Processors:</strong> Transaction confirmations from Stripe</li>
                </ul>
              </section>

              {/* 2. How We Use Your Information */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">2. How We Use Your Information</h2>
                <p className="text-slate-600 leading-relaxed">We use the information we collect to:</p>
                <ul className="list-disc pl-6 mt-4 text-slate-600 space-y-2">
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

              {/* 3. Legal Basis for Processing (GDPR) */}
              <section className="mb-10 bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h2 className="text-2xl font-bold text-blue-800 mb-4">3. Legal Basis for Processing (GDPR)</h2>
                <p className="text-blue-900 mb-4">
                  If you are in the European Economic Area (EEA), we process your personal data based on:
                </p>
                <ul className="list-disc pl-6 text-blue-900 space-y-2">
                  <li><strong>Contract Performance:</strong> To provide services you requested</li>
                  <li><strong>Legitimate Interests:</strong> To improve our services and prevent fraud</li>
                  <li><strong>Consent:</strong> For marketing communications and non-essential cookies</li>
                  <li><strong>Legal Obligation:</strong> To comply with applicable laws</li>
                </ul>
              </section>

              {/* 4. Sharing Your Information */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Sharing Your Information</h2>
                <p className="text-slate-600 leading-relaxed">
                  We do not sell your personal information. We may share your information with:
                </p>
                <ul className="list-disc pl-6 mt-4 text-slate-600 space-y-2">
                  <li><strong>Service Providers:</strong> Third parties that help us operate our services (hosting, analytics, payments)</li>
                  <li><strong>Advertising Partners:</strong> Google AdSense for displaying ads (anonymized data)</li>
                  <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                  <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
                </ul>

                <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">Our Service Providers Include:</h3>
                <div className="bg-slate-100 rounded-lg p-4 mt-4">
                  <ul className="text-slate-700 space-y-2">
                    <li><strong>Vercel:</strong> Website hosting</li>
                    <li><strong>Neon:</strong> Database services</li>
                    <li><strong>Stripe:</strong> Payment processing</li>
                    <li><strong>Google Analytics:</strong> Website analytics</li>
                    <li><strong>Google AdSense:</strong> Advertising</li>
                  </ul>
                </div>
              </section>

              {/* 5. Cookies and Tracking */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Cookies and Tracking Technologies</h2>
                <p className="text-slate-600 leading-relaxed">
                  We use cookies and similar tracking technologies to collect and track information. You can instruct your browser to refuse all cookies or indicate when a cookie is being sent.
                </p>
                
                <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">Types of Cookies We Use:</h3>
                <ul className="list-disc pl-6 text-slate-600 space-y-2">
                  <li><strong>Essential Cookies:</strong> Required for the website to function</li>
                  <li><strong>Authentication Cookies:</strong> To keep you signed in</li>
                  <li><strong>Preference Cookies:</strong> To remember your settings</li>
                  <li><strong>Analytics Cookies:</strong> To understand how visitors use our site</li>
                  <li><strong>Advertising Cookies:</strong> To deliver relevant advertisements</li>
                </ul>
                <p className="text-slate-600 mt-4">
                  For more details, please see our <Link href={`/${locale}/cookies`} className="text-blue-600 hover:underline">Cookie Policy</Link>.
                </p>
              </section>

              {/* 6. Data Security */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Data Security</h2>
                <p className="text-slate-600 leading-relaxed">
                  We implement appropriate technical and organizational security measures to protect your personal data, including:
                </p>
                <ul className="list-disc pl-6 mt-4 text-slate-600 space-y-2">
                  <li>SSL/TLS encryption for data in transit</li>
                  <li>Encrypted database storage</li>
                  <li>Regular security assessments</li>
                  <li>Access controls and authentication</li>
                  <li>Secure payment processing through Stripe (PCI compliant)</li>
                </ul>
                <p className="text-slate-600 mt-4">
                  However, no method of transmission over the Internet is 100% secure. While we strive to protect your data, we cannot guarantee its absolute security.
                </p>
              </section>

              {/* 7. Data Retention */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Data Retention</h2>
                <p className="text-slate-600 leading-relaxed">
                  We retain your personal data only for as long as necessary for the purposes set out in this Privacy Policy:
                </p>
                <ul className="list-disc pl-6 mt-4 text-slate-600 space-y-2">
                  <li><strong>Account Data:</strong> Until you delete your account</li>
                  <li><strong>Saved Calculations:</strong> Until you delete them or your account</li>
                  <li><strong>Transaction Records:</strong> 7 years (for tax and legal compliance)</li>
                  <li><strong>Analytics Data:</strong> 26 months (Google Analytics default)</li>
                </ul>
              </section>

              {/* 8. Your Rights (GDPR) */}
              <section className="mb-10 bg-emerald-50 border border-emerald-200 rounded-xl p-6">
                <h2 className="text-2xl font-bold text-emerald-800 mb-4">8. Your Privacy Rights (GDPR)</h2>
                <p className="text-emerald-900 mb-4">
                  If you are in the EEA, UK, or Switzerland, you have the following rights:
                </p>
                <ul className="list-disc pl-6 text-emerald-900 space-y-2">
                  <li><strong>Right to Access:</strong> Request copies of your personal data</li>
                  <li><strong>Right to Rectification:</strong> Request correction of inaccurate data</li>
                  <li><strong>Right to Erasure:</strong> Request deletion of your personal data</li>
                  <li><strong>Right to Restrict Processing:</strong> Request limitation of data processing</li>
                  <li><strong>Right to Data Portability:</strong> Request transfer of your data</li>
                  <li><strong>Right to Object:</strong> Object to processing based on legitimate interests</li>
                  <li><strong>Right to Withdraw Consent:</strong> Withdraw consent at any time</li>
                </ul>
                <p className="text-emerald-900 mt-4">
                  To exercise these rights, contact us at <strong>privacy@kalcufy.com</strong>. We will respond within 30 days.
                </p>
              </section>

              {/* 9. California Privacy Rights (CCPA) */}
              <section className="mb-10 bg-purple-50 border border-purple-200 rounded-xl p-6">
                <h2 className="text-2xl font-bold text-purple-800 mb-4">9. California Privacy Rights (CCPA)</h2>
                <p className="text-purple-900 mb-4">
                  If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA):
                </p>
                <ul className="list-disc pl-6 text-purple-900 space-y-2">
                  <li><strong>Right to Know:</strong> What personal information we collect, use, and share</li>
                  <li><strong>Right to Delete:</strong> Request deletion of your personal information</li>
                  <li><strong>Right to Opt-Out:</strong> Opt-out of the sale of personal information (we do not sell your data)</li>
                  <li><strong>Right to Non-Discrimination:</strong> We will not discriminate against you for exercising your rights</li>
                </ul>
                <p className="text-purple-900 mt-4">
                  <strong>Do Not Sell My Personal Information:</strong> We do not sell personal information. However, some data sharing with advertising partners may be considered a "sale" under CCPA. You can opt-out through our cookie settings.
                </p>
              </section>

              {/* 10. Children's Privacy */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">10. Children's Privacy</h2>
                <p className="text-slate-600 leading-relaxed">
                  Our Service is not intended for children under 18 years of age. We do not knowingly collect personal information from children under 18. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately. We will take steps to delete such information.
                </p>
              </section>

              {/* 11. International Data Transfers */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">11. International Data Transfers</h2>
                <p className="text-slate-600 leading-relaxed">
                  Your information may be transferred to and processed in countries other than your country of residence. These countries may have different data protection laws. When we transfer data internationally, we implement appropriate safeguards, including:
                </p>
                <ul className="list-disc pl-6 mt-4 text-slate-600 space-y-2">
                  <li>Standard Contractual Clauses approved by the European Commission</li>
                  <li>Data Processing Agreements with all service providers</li>
                  <li>Compliance with applicable data protection frameworks</li>
                </ul>
              </section>

              {/* 12. Third-Party Links */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">12. Third-Party Links</h2>
                <p className="text-slate-600 leading-relaxed">
                  Our Service may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to read their privacy policies before providing any personal information.
                </p>
              </section>

              {/* 13. Changes to Privacy Policy */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">13. Changes to This Privacy Policy</h2>
                <p className="text-slate-600 leading-relaxed">
                  We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last updated" date. For significant changes, we may also send you an email notification.
                </p>
                <p className="text-slate-600 mt-4">
                  We encourage you to review this Privacy Policy periodically for any changes.
                </p>
              </section>

              {/* 14. Contact Us */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">14. Contact Us</h2>
                <p className="text-slate-600 leading-relaxed">
                  If you have questions about this Privacy Policy or want to exercise your privacy rights, please contact us:
                </p>
                <div className="mt-4 p-4 bg-slate-100 rounded-lg">
                  <p className="text-slate-700">
                    <strong>Email:</strong> privacy@kalcufy.com<br />
                    <strong>General Inquiries:</strong> support@kalcufy.com<br />
                    <strong>Website:</strong> kalcufy.com
                  </p>
                </div>
                <p className="text-slate-600 mt-4">
                  If you are in the EEA and believe we have not adequately addressed your concerns, you have the right to lodge a complaint with your local data protection authority.
                </p>
              </section>

              {/* Acknowledgment */}
              <section className="mt-12 pt-8 border-t border-slate-200">
                <p className="text-slate-600 text-center italic">
                  By using Kalcufy, you acknowledge that you have read and understood this Privacy Policy.
                </p>
              </section>

            </div>
          </div>

          {/* Related Links */}
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link 
              href={`/${locale}/terms`}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Terms of Service →
            </Link>
            <Link 
              href={`/${locale}/cookies`}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Cookie Policy →
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
