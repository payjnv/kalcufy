import { Metadata } from 'next';
import { generateHomepageMetadata } from '@/lib/homepage-metadata';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import HomeSearchBar from './HomeSearchBar';
import HomeCategoriesSection from './HomeCategoriesSection';
import { SLUG_REGISTRY } from '@/engine/v4/slugs/registry';

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
  const calcCount = SLUG_REGISTRY.filter(e => e.category !== "drafts").length;

  return (
    <>
      {/* Hero Section - Compact mobile, spacious desktop */}
      <section 
        className="pt-6 pb-6 md:pt-16 md:pb-16 bg-gradient-to-b from-blue-50 to-white"
        aria-labelledby="hero-heading"
      >
        <div className="container text-center px-5 md:px-4">
          {/* Badge */}
          <div 
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 md:gap-2 md:px-5 md:py-2.5 rounded-full bg-green-50 border border-green-200 text-green-700 text-xs md:text-base font-semibold mb-4 md:mb-8"
            role="status"
            aria-live="polite"
          >
            <span 
              className="w-1.5 h-1.5 md:w-2.5 md:h-2.5 rounded-full bg-green-500 motion-safe:animate-pulse"
              aria-hidden="true"
            />
            <span>{calcCount}+ {t("badge")}</span>
          </div>

          {/* Heading */}
          <h1 
            id="hero-heading"
            className="text-[26px] leading-tight md:text-5xl font-extrabold text-slate-900 mb-4 md:mb-5"
          >
            {t("title1")}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-500">
              {t("title2")}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="hidden md:block text-xl text-slate-500 mb-8 max-w-2xl mx-auto leading-relaxed">
            {t("subtitle")}
          </p>

          {/* Search bar */}
          <HomeSearchBar />
        </div>
      </section>

      {/* Categories + Popular */}
      <HomeCategoriesSection />

      {/* CTA Section */}
      <section 
        className="py-10 md:py-16 bg-gradient-to-r from-blue-600 to-violet-500"
        aria-labelledby="cta-heading"
      >
        <div className="container text-center px-5 md:px-4">
          <h2 
            id="cta-heading"
            className="text-2xl md:text-4xl font-bold text-white mb-3 md:mb-4"
          >
            {t("cta.title")}
          </h2>
          <p className="text-blue-100 text-sm md:text-base mb-6 md:mb-8">
            {t("cta.subtitle")}
          </p>
          <Link
            href={`/${locale}/calculators`}
            className="inline-block px-6 py-3 md:px-8 md:py-4 text-base md:text-lg font-bold text-blue-600 bg-white rounded-xl hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 shadow-lg transition-colors"
          >
            {t("exploreButton")}
          </Link>
        </div>
      </section>
    </>
  );
}
