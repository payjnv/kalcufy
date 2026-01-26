"use client";

import Link from 'next/link';
import { useParams } from 'next/navigation';
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function TermsPage() {
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
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Terms of Service</h1>
            <p className="text-slate-600">Last updated: {currentDate}</p>
          </div>

          {/* Content */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-12">
            <div className="prose prose-slate max-w-none">
              
              {/* 1. Agreement */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Agreement to Terms</h2>
                <p className="text-slate-600 leading-relaxed">
                  By accessing or using Kalcufy ("Service", "Website", "we", "us", or "our"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of these terms, you do not have permission to access the Service.
                </p>
                <p className="text-slate-600 leading-relaxed mt-4">
                  These Terms apply to all visitors, users, and others who access or use the Service. By using the Service, you represent that you are at least 18 years of age. If you are under 18, you may not use the Service under any circumstances.
                </p>
              </section>

              {/* 2. Description of Service */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Description of Service</h2>
                <p className="text-slate-600 leading-relaxed">
                  Kalcufy provides online calculators for financial planning, health metrics, and other computational tools. Our Service includes free calculators and optional premium features ("PRO") available through paid subscriptions.
                </p>
              </section>

              {/* 3. IMPORTANT DISCLAIMER */}
              <section className="mb-10 bg-amber-50 border border-amber-200 rounded-xl p-6">
                <h2 className="text-2xl font-bold text-amber-800 mb-4">3. Important Disclaimer - READ CAREFULLY</h2>
                <div className="text-amber-900 space-y-4">
                  <p className="font-semibold">
                    THE CALCULATORS AND TOOLS PROVIDED BY KALCUFY ARE FOR INFORMATIONAL AND EDUCATIONAL PURPOSES ONLY.
                  </p>
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

              {/* 4. Limitation of Liability */}
              <section className="mb-10 bg-red-50 border border-red-200 rounded-xl p-6">
                <h2 className="text-2xl font-bold text-red-800 mb-4">4. Limitation of Liability</h2>
                <div className="text-red-900 space-y-4">
                  <p>
                    TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL KALCUFY, ITS OWNERS, DIRECTORS, EMPLOYEES, PARTNERS, AGENTS, SUPPLIERS, OR AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Loss of profits, revenue, or data</li>
                    <li>Financial losses based on calculator results</li>
                    <li>Health decisions made using our tools</li>
                    <li>Investment or business decisions</li>
                    <li>Any other losses or damages</li>
                  </ul>
                  <p className="font-semibold mt-4">
                    OUR TOTAL LIABILITY FOR ANY CLAIMS ARISING FROM OR RELATED TO THE SERVICE SHALL NOT EXCEED THE AMOUNT YOU PAID US IN THE TWELVE (12) MONTHS PRIOR TO THE CLAIM, OR ZERO DOLLARS ($0.00) IF YOU HAVE NOT MADE ANY PAYMENTS.
                  </p>
                  <p>
                    YOU ACKNOWLEDGE THAT YOU USE THE SERVICE AT YOUR OWN RISK AND THAT THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS.
                  </p>
                </div>
              </section>

              {/* 5. Indemnification */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Indemnification</h2>
                <p className="text-slate-600 leading-relaxed">
                  You agree to defend, indemnify, and hold harmless Kalcufy and its owners, directors, employees, contractors, agents, licensors, suppliers, successors, and assigns from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising out of or relating to:
                </p>
                <ul className="list-disc pl-6 mt-4 text-slate-600 space-y-2">
                  <li>Your violation of these Terms</li>
                  <li>Your use of the Service</li>
                  <li>Decisions you make based on calculator results</li>
                  <li>Your violation of any third-party rights</li>
                  <li>Any content you submit or transmit through the Service</li>
                </ul>
              </section>

              {/* 6. Accounts */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">6. User Accounts</h2>
                <p className="text-slate-600 leading-relaxed">
                  When you create an account with us, you must provide accurate, complete, and current information. Failure to do so constitutes a breach of these Terms.
                </p>
                <p className="text-slate-600 leading-relaxed mt-4">
                  You are responsible for safeguarding your account password and for any activities or actions under your account. You must notify us immediately of any unauthorized access or security breaches.
                </p>
                <p className="text-slate-600 leading-relaxed mt-4">
                  <strong>Account Termination:</strong> We reserve the right to suspend or terminate your account at any time, for any reason, with or without notice, including but not limited to violation of these Terms. Upon termination, your right to use the Service will immediately cease.
                </p>
              </section>

              {/* 7. PRO Subscriptions */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">7. PRO Subscriptions & Payments</h2>
                <p className="text-slate-600 leading-relaxed">
                  Some features of the Service require a paid subscription ("PRO"). By subscribing to PRO:
                </p>
                <ul className="list-disc pl-6 mt-4 text-slate-600 space-y-2">
                  <li>You authorize us to charge your payment method on a recurring basis</li>
                  <li>Subscriptions automatically renew unless cancelled before the renewal date</li>
                  <li>Prices may change with 30 days notice</li>
                  <li>Refunds are provided at our sole discretion</li>
                  <li>You may cancel your subscription at any time through your account settings</li>
                </ul>
                <p className="text-slate-600 leading-relaxed mt-4">
                  All fees are exclusive of applicable taxes, which you are responsible for paying.
                </p>
              </section>

              {/* 8. Intellectual Property */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Intellectual Property</h2>
                <p className="text-slate-600 leading-relaxed">
                  The Service and its original content, features, and functionality are and will remain the exclusive property of Kalcufy. The Service is protected by copyright, trademark, and other laws. Our trademarks may not be used without prior written consent.
                </p>
              </section>

              {/* 9. Prohibited Uses */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">9. Prohibited Uses</h2>
                <p className="text-slate-600 leading-relaxed">You agree not to:</p>
                <ul className="list-disc pl-6 mt-4 text-slate-600 space-y-2">
                  <li>Use the Service for any unlawful purpose</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Interfere with or disrupt the Service</li>
                  <li>Scrape, data mine, or harvest information from the Service</li>
                  <li>Use automated systems to access the Service without permission</li>
                  <li>Impersonate any person or entity</li>
                  <li>Transmit viruses, malware, or other harmful code</li>
                  <li>Circumvent any security features</li>
                </ul>
              </section>

              {/* 10. Dispute Resolution */}
              <section className="mb-10 bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h2 className="text-2xl font-bold text-blue-800 mb-4">10. Dispute Resolution & Arbitration</h2>
                <div className="text-blue-900 space-y-4">
                  <p>
                    <strong>PLEASE READ THIS SECTION CAREFULLY. IT AFFECTS YOUR LEGAL RIGHTS.</strong>
                  </p>
                  <p>
                    <strong>Binding Arbitration:</strong> Any dispute, controversy, or claim arising out of or relating to these Terms or the Service shall be resolved by binding arbitration, rather than in court, except that you may assert claims in small claims court if your claims qualify.
                  </p>
                  <p>
                    <strong>No Class Actions:</strong> YOU AND KALCUFY AGREE THAT EACH MAY BRING CLAIMS AGAINST THE OTHER ONLY IN YOUR OR ITS INDIVIDUAL CAPACITY, AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS OR REPRESENTATIVE PROCEEDING.
                  </p>
                  <p>
                    <strong>Arbitration Rules:</strong> The arbitration will be conducted by a neutral arbitrator in accordance with the American Arbitration Association's rules. The arbitrator's decision will be final and binding.
                  </p>
                  <p>
                    <strong>Opt-Out:</strong> You may opt out of this arbitration agreement by sending written notice within 30 days of first using the Service.
                  </p>
                </div>
              </section>

              {/* 11. Governing Law */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">11. Governing Law</h2>
                <p className="text-slate-600 leading-relaxed">
                  These Terms shall be governed by and construed in accordance with the laws of the United States, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
                </p>
              </section>

              {/* 12. Severability */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">12. Severability</h2>
                <p className="text-slate-600 leading-relaxed">
                  If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect. The invalid or unenforceable provision will be modified to the minimum extent necessary to make it valid and enforceable.
                </p>
              </section>

              {/* 13. Changes to Terms */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">13. Changes to Terms</h2>
                <p className="text-slate-600 leading-relaxed">
                  We reserve the right to modify or replace these Terms at any time. We will provide notice of any material changes by posting the new Terms on this page and updating the "Last updated" date. Your continued use of the Service after any changes constitutes acceptance of the new Terms.
                </p>
              </section>

              {/* 14. Contact */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">14. Contact Us</h2>
                <p className="text-slate-600 leading-relaxed">
                  If you have any questions about these Terms, please contact us at:
                </p>
                <div className="mt-4 p-4 bg-slate-100 rounded-lg">
                  <p className="text-slate-700">
                    <strong>Email:</strong> legal@kalcufy.com<br />
                    <strong>Website:</strong> kalcufy.com
                  </p>
                </div>
              </section>

              {/* Acknowledgment */}
              <section className="mt-12 pt-8 border-t border-slate-200">
                <p className="text-slate-600 text-center italic">
                  By using Kalcufy, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
                </p>
              </section>

            </div>
          </div>

          {/* Related Links */}
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link 
              href={`/${locale}/privacy`}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Privacy Policy →
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
