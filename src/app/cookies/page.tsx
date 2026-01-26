"use client";

import Link from 'next/link';
import { useParams } from 'next/navigation';
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function CookiesPage() {
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
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Cookie Policy</h1>
            <p className="text-slate-600">Last updated: {currentDate}</p>
          </div>

          {/* Content */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-12">
            <div className="prose prose-slate max-w-none">
              
              {/* Introduction */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">What Are Cookies?</h2>
                <p className="text-slate-600 leading-relaxed">
                  Cookies are small text files that are stored on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to website owners.
                </p>
                <p className="text-slate-600 leading-relaxed mt-4">
                  This Cookie Policy explains what cookies are, how Kalcufy uses them, and your choices regarding cookies.
                </p>
              </section>

              {/* How We Use Cookies */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">How We Use Cookies</h2>
                <p className="text-slate-600 leading-relaxed">
                  Kalcufy uses cookies for various purposes:
                </p>
                <ul className="list-disc pl-6 mt-4 text-slate-600 space-y-2">
                  <li>To enable certain functions of the website</li>
                  <li>To provide analytics and understand how you use our website</li>
                  <li>To store your preferences</li>
                  <li>To enable advertisements delivery and measure their effectiveness</li>
                  <li>To keep you signed in to your account</li>
                </ul>
              </section>

              {/* Types of Cookies */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Types of Cookies We Use</h2>
                
                {/* Essential Cookies */}
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 mb-6">
                  <h3 className="text-xl font-semibold text-emerald-800 mb-3">Essential Cookies (Required)</h3>
                  <p className="text-emerald-900 mb-4">
                    These cookies are necessary for the website to function properly. They cannot be disabled.
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-emerald-200">
                          <th className="text-left py-2 text-emerald-800">Cookie</th>
                          <th className="text-left py-2 text-emerald-800">Purpose</th>
                          <th className="text-left py-2 text-emerald-800">Duration</th>
                        </tr>
                      </thead>
                      <tbody className="text-emerald-900">
                        <tr className="border-b border-emerald-100">
                          <td className="py-2">next-auth.session-token</td>
                          <td className="py-2">User authentication</td>
                          <td className="py-2">Session</td>
                        </tr>
                        <tr className="border-b border-emerald-100">
                          <td className="py-2">next-auth.csrf-token</td>
                          <td className="py-2">Security (CSRF protection)</td>
                          <td className="py-2">Session</td>
                        </tr>
                        <tr className="border-b border-emerald-100">
                          <td className="py-2">NEXT_LOCALE</td>
                          <td className="py-2">Language preference</td>
                          <td className="py-2">1 year</td>
                        </tr>
                        <tr>
                          <td className="py-2">cookie_consent</td>
                          <td className="py-2">Remember consent choice</td>
                          <td className="py-2">1 year</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Analytics Cookies */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
                  <h3 className="text-xl font-semibold text-blue-800 mb-3">Analytics Cookies</h3>
                  <p className="text-blue-900 mb-4">
                    These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-blue-200">
                          <th className="text-left py-2 text-blue-800">Cookie</th>
                          <th className="text-left py-2 text-blue-800">Provider</th>
                          <th className="text-left py-2 text-blue-800">Purpose</th>
                          <th className="text-left py-2 text-blue-800">Duration</th>
                        </tr>
                      </thead>
                      <tbody className="text-blue-900">
                        <tr className="border-b border-blue-100">
                          <td className="py-2">_ga</td>
                          <td className="py-2">Google Analytics</td>
                          <td className="py-2">Distinguish users</td>
                          <td className="py-2">2 years</td>
                        </tr>
                        <tr className="border-b border-blue-100">
                          <td className="py-2">_ga_*</td>
                          <td className="py-2">Google Analytics</td>
                          <td className="py-2">Persist session state</td>
                          <td className="py-2">2 years</td>
                        </tr>
                        <tr>
                          <td className="py-2">_gid</td>
                          <td className="py-2">Google Analytics</td>
                          <td className="py-2">Distinguish users</td>
                          <td className="py-2">24 hours</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Advertising Cookies */}
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-6">
                  <h3 className="text-xl font-semibold text-amber-800 mb-3">Advertising Cookies</h3>
                  <p className="text-amber-900 mb-4">
                    These cookies are used to deliver advertisements that are relevant to you and your interests. They also help measure the effectiveness of advertising campaigns.
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-amber-200">
                          <th className="text-left py-2 text-amber-800">Cookie</th>
                          <th className="text-left py-2 text-amber-800">Provider</th>
                          <th className="text-left py-2 text-amber-800">Purpose</th>
                          <th className="text-left py-2 text-amber-800">Duration</th>
                        </tr>
                      </thead>
                      <tbody className="text-amber-900">
                        <tr className="border-b border-amber-100">
                          <td className="py-2">IDE</td>
                          <td className="py-2">Google AdSense</td>
                          <td className="py-2">Ad targeting</td>
                          <td className="py-2">1 year</td>
                        </tr>
                        <tr className="border-b border-amber-100">
                          <td className="py-2">NID</td>
                          <td className="py-2">Google</td>
                          <td className="py-2">Ad personalization</td>
                          <td className="py-2">6 months</td>
                        </tr>
                        <tr>
                          <td className="py-2">__gads</td>
                          <td className="py-2">Google AdSense</td>
                          <td className="py-2">Ad serving</td>
                          <td className="py-2">13 months</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Preference Cookies */}
                <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-purple-800 mb-3">Preference Cookies</h3>
                  <p className="text-purple-900 mb-4">
                    These cookies allow the website to remember choices you make (such as your preferred language or theme) and provide enhanced features.
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-purple-200">
                          <th className="text-left py-2 text-purple-800">Cookie</th>
                          <th className="text-left py-2 text-purple-800">Purpose</th>
                          <th className="text-left py-2 text-purple-800">Duration</th>
                        </tr>
                      </thead>
                      <tbody className="text-purple-900">
                        <tr className="border-b border-purple-100">
                          <td className="py-2">theme</td>
                          <td className="py-2">Remember theme preference</td>
                          <td className="py-2">1 year</td>
                        </tr>
                        <tr>
                          <td className="py-2">calculator_settings</td>
                          <td className="py-2">Remember calculator defaults</td>
                          <td className="py-2">1 year</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>

              {/* Your Cookie Choices */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Your Cookie Choices</h2>
                <p className="text-slate-600 leading-relaxed">
                  You have several options to manage cookies:
                </p>
                
                <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">Browser Settings</h3>
                <p className="text-slate-600 leading-relaxed">
                  Most web browsers allow you to control cookies through their settings. You can typically find these in the "Options" or "Preferences" menu. Here are links to cookie settings for common browsers:
                </p>
                <ul className="list-disc pl-6 mt-4 text-slate-600 space-y-2">
                  <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google Chrome</a></li>
                  <li><a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Mozilla Firefox</a></li>
                  <li><a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Safari</a></li>
                  <li><a href="https://support.microsoft.com/en-us/windows/microsoft-edge-browsing-data-and-privacy-bb8174ba-9d73-dcf2-9b4a-c582b4e640dd" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Microsoft Edge</a></li>
                </ul>

                <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">Opt-Out of Interest-Based Advertising</h3>
                <p className="text-slate-600 leading-relaxed">
                  You can opt out of interest-based advertising from participating companies at:
                </p>
                <ul className="list-disc pl-6 mt-4 text-slate-600 space-y-2">
                  <li><a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Digital Advertising Alliance (DAA)</a></li>
                  <li><a href="https://www.youronlinechoices.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">European Interactive Digital Advertising Alliance (EDAA)</a></li>
                  <li><a href="https://optout.networkadvertising.org/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Network Advertising Initiative (NAI)</a></li>
                </ul>

                <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">Google Analytics Opt-Out</h3>
                <p className="text-slate-600 leading-relaxed">
                  You can opt out of Google Analytics by installing the{" "}
                  <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    Google Analytics Opt-out Browser Add-on
                  </a>.
                </p>
              </section>

              {/* Impact of Disabling Cookies */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Impact of Disabling Cookies</h2>
                <p className="text-slate-600 leading-relaxed">
                  Please note that if you choose to disable cookies, some features of Kalcufy may not function properly:
                </p>
                <ul className="list-disc pl-6 mt-4 text-slate-600 space-y-2">
                  <li>You may not be able to stay signed in</li>
                  <li>Your language preference may not be saved</li>
                  <li>Some features may not work as expected</li>
                  <li>Calculator settings may not be remembered</li>
                </ul>
              </section>

              {/* Updates to This Policy */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Updates to This Cookie Policy</h2>
                <p className="text-slate-600 leading-relaxed">
                  We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our data practices. When we make changes, we will update the "Last updated" date at the top of this page.
                </p>
              </section>

              {/* Contact */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Contact Us</h2>
                <p className="text-slate-600 leading-relaxed">
                  If you have any questions about our use of cookies, please contact us:
                </p>
                <div className="mt-4 p-4 bg-slate-100 rounded-lg">
                  <p className="text-slate-700">
                    <strong>Email:</strong> privacy@kalcufy.com<br />
                    <strong>Website:</strong> kalcufy.com
                  </p>
                </div>
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
              href={`/${locale}/privacy`}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Privacy Policy →
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
