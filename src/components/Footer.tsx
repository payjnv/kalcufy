"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

// ============================================================================
// FOOTER - WCAG 2.1 AA COMPLIANT
// ✅ 1.1.1 Non-text Content - SVG has aria-hidden
// ✅ 1.3.1 Info and Relationships - Semantic structure, role="contentinfo"
// ✅ 1.4.3 Contrast - slate-400 on slate-900 meets 4.5:1
// ✅ 2.4.4 Link Purpose - Descriptive link text
// ✅ 2.4.7 Focus Visible - Clear focus indicators
// ✅ 4.1.2 Name, Role, Value - Proper nav labeling
// ============================================================================

export default function Footer() {
  const locale = useLocale();
  const t = useTranslations("common");

  const currentYear = new Date().getFullYear();

  return (
    <footer 
      className="bg-slate-900 text-white py-8"
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-6">
          {/* Brand */}
          <Link 
            href={`/${locale}`}
            className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-900 rounded-lg w-fit"
            aria-label="Kalcufy - Go to homepage"
          >
            <div 
              className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center"
              aria-hidden="true"
            >
              <svg 
                className="w-4 h-4 text-white" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                aria-hidden="true"
                focusable="false"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" 
                />
              </svg>
            </div>
            <span className="text-lg font-bold">
              Kalc<span className="text-blue-400">ufy</span>
            </span>
          </Link>

          {/* Navigation Links */}
          <nav 
            aria-label="Footer navigation"
            role="navigation"
          >
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-400 list-none p-0 m-0">
              <li>
                <Link 
                  href={`/${locale}/calculators`} 
                  className="hover:text-white focus:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-900 rounded px-1"
                >
                  {t("calculators") || "Calculators"}
                </Link>
              </li>
              <li>
                <Link 
                  href={`/${locale}/blog`} 
                  className="hover:text-white focus:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-900 rounded px-1"
                >
                  {t("blog") || "Blog"}
                </Link>
              </li>
              <li>
                <Link 
                  href={`/${locale}/about`} 
                  className="hover:text-white focus:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-900 rounded px-1"
                >
                  {t("about") || "About"}
                </Link>
              </li>
              <li>
                <Link 
                  href={`/${locale}/privacy`} 
                  className="hover:text-white focus:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-900 rounded px-1"
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link 
                  href={`/${locale}/terms`} 
                  className="hover:text-white focus:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-900 rounded px-1"
                >
                  Terms
                </Link>
              </li>
              <li>
                <Link 
                  href={`/${locale}/cookies`} 
                  className="hover:text-white focus:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-900 rounded px-1"
                >
                  Cookies
                </Link>
              </li>
              <li>
                <Link 
                  href={`/${locale}/accessibility`} 
                  className="hover:text-white focus:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-900 rounded px-1"
                >
                  Accessibility
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Copyright */}
        <div className="pt-6 border-t border-slate-800 text-center text-slate-500 text-sm">
          <p>© {currentYear} Kalcufy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
