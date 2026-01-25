// src/app/[locale]/cookies/page.tsx
// WCAG 2.1 AA Compliant Version

import { useTranslations, useLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: "legal" });
  return {
    title: `${t("cookies.title")} | Kalcufy`,
    description: t("cookies.metaDescription"),
  };
}

export default function CookiesPage() {
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
              Cookie Policy
            </h1>
            <p className="text-slate-600">
              <time dateTime="2026-01-24">Last updated: January 24, 2026</time>
            </p>
          </header>

          {/* Content */}
          <article className="bg-white rounded-xl shadow-sm p-6 md:p-10">
            {/* What Are Cookies */}
            <section aria-labelledby="what-are-cookies" className="mb-10">
              <h2 id="what-are-cookies" className="text-xl font-bold text-slate-900 mb-4">
                What Are Cookies?
              </h2>
              <p className="text-slate-600 mb-4 leading-relaxed">
                Cookies are small text files that are stored on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to website owners.
              </p>
              <p className="text-slate-600 leading-relaxed">
                This Cookie Policy explains what cookies are, how Kalcufy uses them, and your choices regarding cookies.
              </p>
            </section>

            {/* How We Use Cookies */}
            <section aria-labelledby="how-we-use" className="mb-10">
              <h2 id="how-we-use" className="text-xl font-bold text-slate-900 mb-4">
                How We Use Cookies
              </h2>
              <p className="text-slate-600 mb-4">
                Kalcufy uses cookies for various purposes:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-600" role="list">
                <li>To enable certain functions of the website</li>
                <li>To provide analytics and understand how you use our website</li>
                <li>To store your preferences</li>
                <li>To enable advertisements delivery and measure their effectiveness</li>
                <li>To keep you signed in to your account</li>
              </ul>
            </section>

            {/* Types of Cookies */}
            <section aria-labelledby="types-of-cookies" className="mb-10">
              <h2 id="types-of-cookies" className="text-xl font-bold text-slate-900 mb-6">
                Types of Cookies We Use
              </h2>

              {/* Essential Cookies */}
              <div className="mb-8 p-6 bg-green-50 border border-green-200 rounded-xl">
                <h3 className="text-lg font-bold text-green-800 mb-3">
                  Essential Cookies (Required)
                </h3>
                <p className="text-green-700 mb-4">
                  These cookies are necessary for the website to function properly. They cannot be disabled.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm" aria-label="Essential cookies used by Kalcufy">
                    <thead>
                      <tr className="border-b border-green-300">
                        <th scope="col" className="text-left py-2 pr-4 font-semibold text-green-800">Cookie</th>
                        <th scope="col" className="text-left py-2 pr-4 font-semibold text-green-800">Purpose</th>
                        <th scope="col" className="text-left py-2 font-semibold text-green-800">Duration</th>
                      </tr>
                    </thead>
                    <tbody className="text-green-700">
                      <tr className="border-b border-green-200">
                        <td className="py-2 pr-4 font-mono text-xs">next-auth.session-token</td>
                        <td className="py-2 pr-4">User authentication</td>
                        <td className="py-2">Session</td>
                      </tr>
                      <tr className="border-b border-green-200">
                        <td className="py-2 pr-4 font-mono text-xs">next-auth.csrf-token</td>
                        <td className="py-2 pr-4">Security (CSRF protection)</td>
                        <td className="py-2">Session</td>
                      </tr>
                      <tr className="border-b border-green-200">
                        <td className="py-2 pr-4 font-mono text-xs">NEXT_LOCALE</td>
                        <td className="py-2 pr-4">Language preference</td>
                        <td className="py-2">1 year</td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-4 font-mono text-xs">cookie_consent</td>
                        <td className="py-2 pr-4">Remember consent choice</td>
                        <td className="py-2">1 year</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Analytics Cookies */}
              <div className="mb-8 p-6 bg-blue-50 border border-blue-200 rounded-xl">
                <h3 className="text-lg font-bold text-blue-800 mb-3">
                  Analytics Cookies
                </h3>
                <p className="text-blue-700 mb-4">
                  These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm" aria-label="Analytics cookies used by Kalcufy">
                    <thead>
                      <tr className="border-b border-blue-300">
                        <th scope="col" className="text-left py-2 pr-4 font-semibold text-blue-800">Cookie</th>
                        <th scope="col" className="text-left py-2 pr-4 font-semibold text-blue-800">Provider</th>
                        <th scope="col" className="text-left py-2 pr-4 font-semibold text-blue-800">Purpose</th>
                        <th scope="col" className="text-left py-2 font-semibold text-blue-800">Duration</th>
                      </tr>
                    </thead>
                    <tbody className="text-blue-700">
                      <tr className="border-b border-blue-200">
                        <td className="py-2 pr-4 font-mono text-xs">_ga</td>
                        <td className="py-2 pr-4">Google Analytics</td>
                        <td className="py-2 pr-4">Distinguish users</td>
                        <td className="py-2">2 years</td>
                      </tr>
                      <tr className="border-b border-blue-200">
                        <td className="py-2 pr-4 font-mono text-xs">_ga_*</td>
                        <td className="py-2 pr-4">Google Analytics</td>
                        <td className="py-2 pr-4">Persist session state</td>
                        <td className="py-2">2 years</td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-4 font-mono text-xs">_gid</td>
                        <td className="py-2 pr-4">Google Analytics</td>
                        <td className="py-2 pr-4">Distinguish users</td>
                        <td className="py-2">24 hours</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Advertising Cookies */}
              <div className="mb-8 p-6 bg-amber-50 border border-amber-200 rounded-xl">
                <h3 className="text-lg font-bold text-amber-800 mb-3">
                  Advertising Cookies
                </h3>
                <p className="text-amber-800 mb-4">
                  These cookies are used to deliver advertisements that are relevant to you and your interests. They also limit the number of times you see an advertisement.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm" aria-label="Advertising cookies used by Kalcufy">
                    <thead>
                      <tr className="border-b border-amber-300">
                        <th scope="col" className="text-left py-2 pr-4 font-semibold text-amber-800">Cookie</th>
                        <th scope="col" className="text-left py-2 pr-4 font-semibold text-amber-800">Provider</th>
                        <th scope="col" className="text-left py-2 pr-4 font-semibold text-amber-800">Purpose</th>
                        <th scope="col" className="text-left py-2 font-semibold text-amber-800">Duration</th>
                      </tr>
                    </thead>
                    <tbody className="text-amber-800">
                      <tr className="border-b border-amber-200">
                        <td className="py-2 pr-4 font-mono text-xs">IDE</td>
                        <td className="py-2 pr-4">Google AdSense</td>
                        <td className="py-2 pr-4">Ad targeting</td>
                        <td className="py-2">1 year</td>
                      </tr>
                      <tr className="border-b border-amber-200">
                        <td className="py-2 pr-4 font-mono text-xs">NID</td>
                        <td className="py-2 pr-4">Google</td>
                        <td className="py-2 pr-4">Ad personalization</td>
                        <td className="py-2">6 months</td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-4 font-mono text-xs">__gads</td>
                        <td className="py-2 pr-4">Google AdSense</td>
                        <td className="py-2 pr-4">Ad serving</td>
                        <td className="py-2">13 months</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Preference Cookies */}
              <div className="p-6 bg-purple-50 border border-purple-200 rounded-xl">
                <h3 className="text-lg font-bold text-purple-800 mb-3">
                  Preference Cookies
                </h3>
                <p className="text-purple-700 mb-4">
                  These cookies allow the website to remember choices you make (such as your preferred language or theme) to provide a more personalized experience.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm" aria-label="Preference cookies used by Kalcufy">
                    <thead>
                      <tr className="border-b border-purple-300">
                        <th scope="col" className="text-left py-2 pr-4 font-semibold text-purple-800">Cookie</th>
                        <th scope="col" className="text-left py-2 pr-4 font-semibold text-purple-800">Purpose</th>
                        <th scope="col" className="text-left py-2 font-semibold text-purple-800">Duration</th>
                      </tr>
                    </thead>
                    <tbody className="text-purple-700">
                      <tr className="border-b border-purple-200">
                        <td className="py-2 pr-4 font-mono text-xs">theme</td>
                        <td className="py-2 pr-4">Remember theme preference</td>
                        <td className="py-2">1 year</td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-4 font-mono text-xs">calculator_settings</td>
                        <td className="py-2 pr-4">Remember calculator defaults</td>
                        <td className="py-2">1 year</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* Your Cookie Choices */}
            <section aria-labelledby="cookie-choices" className="mb-10">
              <h2 id="cookie-choices" className="text-xl font-bold text-slate-900 mb-4">
                Your Cookie Choices
              </h2>
              <p className="text-slate-600 mb-4">
                You have several options to manage cookies:
              </p>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Browser Settings
              </h3>
              <p className="text-slate-600 mb-4">
                Most web browsers allow you to control cookies through their settings. You can typically find these options in your browser's "Privacy" or "Security" settings:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-6" role="list">
                <li>
                  <a
                    href="https://support.google.com/chrome/answer/95647"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                  >
                    Google Chrome
                    <span className="sr-only"> (opens in new tab)</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                  >
                    Mozilla Firefox
                    <span className="sr-only"> (opens in new tab)</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                  >
                    Safari
                    <span className="sr-only"> (opens in new tab)</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://support.microsoft.com/en-us/windows/microsoft-edge-browsing-data-and-privacy-bb8174ba-9d73-dcf2-9b4a-c582b4e640dd"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                  >
                    Microsoft Edge
                    <span className="sr-only"> (opens in new tab)</span>
                  </a>
                </li>
              </ul>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Opt-Out of Interest-Based Advertising
              </h3>
              <p className="text-slate-600 mb-4">
                You can opt out of interest-based advertising from participating companies at:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-6" role="list">
                <li>
                  <a
                    href="https://www.aboutads.info/choices/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                  >
                    Digital Advertising Alliance (DAA)
                    <span className="sr-only"> (opens in new tab)</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.youronlinechoices.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                  >
                    European Interactive Digital Advertising Alliance (EDAA)
                    <span className="sr-only"> (opens in new tab)</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://optout.networkadvertising.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                  >
                    Network Advertising Initiative (NAI)
                    <span className="sr-only"> (opens in new tab)</span>
                  </a>
                </li>
              </ul>

              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Google Analytics Opt-Out
              </h3>
              <p className="text-slate-600">
                You can opt out of Google Analytics by installing the{" "}
                <a
                  href="https://tools.google.com/dlpage/gaoptout"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                >
                  Google Analytics Opt-out Browser Add-on
                  <span className="sr-only"> (opens in new tab)</span>
                </a>
                .
              </p>
            </section>

            {/* Impact of Disabling Cookies */}
            <section aria-labelledby="impact" className="mb-10">
              <h2 id="impact" className="text-xl font-bold text-slate-900 mb-4">
                Impact of Disabling Cookies
              </h2>
              <p className="text-slate-600 mb-4">
                Please note that if you choose to disable cookies, some features of Kalcufy may not function properly:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-600" role="list">
                <li>You may not be able to stay signed in</li>
                <li>Your language preference may not be saved</li>
                <li>Some features may not work as expected</li>
                <li>Calculator settings may not be remembered</li>
              </ul>
            </section>

            {/* Updates */}
            <section aria-labelledby="updates" className="mb-10">
              <h2 id="updates" className="text-xl font-bold text-slate-900 mb-4">
                Updates to This Cookie Policy
              </h2>
              <p className="text-slate-600 leading-relaxed">
                We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our practices. We encourage you to check this page periodically for the latest information about our cookie practices.
              </p>
            </section>

            {/* Contact */}
            <section aria-labelledby="contact" className="mb-10">
              <h2 id="contact" className="text-xl font-bold text-slate-900 mb-4">
                Contact Us
              </h2>
              <p className="text-slate-600 mb-4">
                If you have any questions about our use of cookies, please contact us:
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
              href={`/${locale}/privacy`}
              className="flex-1 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow text-center font-medium text-slate-700 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Privacy Policy →
            </Link>
          </nav>
        </div>
      </main>

      <Footer />
    </>
  );
}
