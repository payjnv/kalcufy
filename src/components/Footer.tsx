"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

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
        <nav 
          aria-label="Footer navigation"
          role="navigation"
          className="mb-6"
        >
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-slate-400 list-none p-0 m-0">
            <li>
              <Link 
                href={`/${locale}/calculators`} 
                className="hover:text-white focus:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-900 rounded px-1"
              >
                {t("calculators")}
              </Link>
            </li>
            <li>
              <Link 
                href={`/${locale}/blog`} 
                className="hover:text-white focus:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-900 rounded px-1"
              >
                {t("blog")}
              </Link>
            </li>
            <li>
              <Link 
                href={`/${locale}/about`} 
                className="hover:text-white focus:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-900 rounded px-1"
              >
                {t("about")}
              </Link>
            </li>
            <li>
              <Link 
                href={`/${locale}/privacy`} 
                className="hover:text-white focus:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-900 rounded px-1"
              >
                {t("privacy")}
              </Link>
            </li>
            <li>
              <Link 
                href={`/${locale}/terms`} 
                className="hover:text-white focus:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-900 rounded px-1"
              >
                {t("terms")}
              </Link>
            </li>
            <li>
              <Link 
                href={`/${locale}/cookies`} 
                className="hover:text-white focus:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-900 rounded px-1"
              >
                {t("cookies")}
              </Link>
            </li>
            <li>
              <Link 
                href={`/${locale}/accessibility`} 
                className="hover:text-white focus:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-900 rounded px-1"
              >
                {t("accessibility")}
              </Link>
            </li>
          </ul>
        </nav>

        <div className="pt-6 border-t border-slate-800 text-center text-slate-500 text-sm">
          <p>© {currentYear} Kalcufy. {t("allRightsReserved")}</p>
        </div>
      </div>
    </footer>
  );
}
