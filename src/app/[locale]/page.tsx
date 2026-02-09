import { Metadata } from 'next';
import { generateHomepageMetadata } from '@/lib/homepage-metadata';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import HomeSearchBar from './HomeSearchBar';
import HomeCategoriesSection from './HomeCategoriesSection';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generateHomepageMetadata(locale);
}

export default async function Home({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");

  return (
    <>
      {/* Hero Section - Server rendered for instant LCP */}
      <section 
        className="pt-16 pb-16 bg-gradient-to-b from-blue-50 to-white"
        aria-labelledby="hero-heading"
      >
        <div className="container text-center">
          <div 
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-100 text-blue-700 text-base font-semibold mb-8"
            role="status"
            aria-live="polite"
          >
            <span 
              className="w-2.5 h-2.5 rounded-full bg-blue-500 motion-safe:animate-pulse"
              aria-hidden="true"
            />
            <span>10+ {t("badge")}</span>
          </div>

          <h1 
            id="hero-heading"
            className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-5"
          >
            {t("title1")}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
              {t("title2")}
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>

          {/* Search bar - hydrates after hero is visible */}
          <HomeSearchBar />
        </div>
      </section>

      {/* Categories - client component loads data dynamically */}
      <HomeCategoriesSection />

      {/* CTA Section - Server rendered */}
      <section 
        className="py-16 bg-gradient-to-r from-blue-600 to-cyan-500"
        aria-labelledby="cta-heading"
      >
        <div className="container text-center">
          <h2 
            id="cta-heading"
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            {t("cta.title")}
          </h2>
          <p className="text-blue-100 mb-8">
            {t("cta.subtitle")}
          </p>
          <Link
            href={`/${locale}/calculators`}
            className="inline-block px-8 py-4 text-lg font-bold text-blue-600 bg-white rounded-xl hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 shadow-lg transition-colors"
          >
            {t("exploreButton")}
          </Link>
        </div>
      </section>
    </>
  );
}
