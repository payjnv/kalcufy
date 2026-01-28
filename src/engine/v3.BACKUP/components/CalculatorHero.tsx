"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import AdBlock from "@/components/ads/AdBlock";
import MobileAdContainer from "@/components/ads/MobileAdContainer";
import type { TranslationFn } from "../types/engine.types";

// ============================================================================
// INTERFACES
// ============================================================================
interface CalculatorHeroProps {
  name: string;
  description: string;
  category: "health" | "finance";
  icon: string;
  badge?: string;
  rating?: {
    average: number;
    count: number;
  };
  t: TranslationFn;
  showMobileAd?: boolean;
}

// ============================================================================
// STAR RATING COMPONENT
// ============================================================================
function StarRating({ rating, count }: { rating: number; count: number }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  
  return (
    <div className="flex items-center gap-2">
      <div className="flex" aria-label={`Rating: ${rating} out of 5 stars`}>
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-5 h-5 ${
              i < fullStars
                ? "text-yellow-400 fill-current"
                : i === fullStars && hasHalfStar
                ? "text-yellow-400 fill-current"
                : "text-slate-300 fill-current"
            }`}
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <span className="text-sm text-slate-500">
        {rating.toFixed(1)} ({count.toLocaleString()} {count === 1 ? "calculation" : "calculations"})
      </span>
    </div>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export default function CalculatorHero({
  name,
  description,
  category,
  icon,
  badge,
  rating,
  t,
  showMobileAd = true,
}: CalculatorHeroProps) {
  const locale = useLocale();
  
  const categoryColors = {
    health: "bg-emerald-100 text-emerald-700",
    finance: "bg-blue-100 text-blue-700",
  };
  
  const categoryLabels = {
    health: t("categories.health", "Health"),
    finance: t("categories.finance", "Finance"),
  };

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10" aria-hidden="true">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="container mx-auto px-4 py-8 md:py-12 relative">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-blue-200">
              <li>
                <Link
                  href={`/${locale}`}
                  className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 rounded"
                >
                  {t("breadcrumbs.home", "Home")}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link
                  href={`/${locale}/calculators`}
                  className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 rounded"
                >
                  {t("breadcrumbs.calculators", "Calculators")}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <span className="text-white font-medium" aria-current="page">
                  {name}
                </span>
              </li>
            </ol>
          </nav>

          {/* Title & Description */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="flex-1">
              {/* Category Badge */}
              <div className="flex items-center gap-3 mb-3">
                <span className="text-4xl" role="img" aria-hidden="true">
                  {icon}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${categoryColors[category]}`}
                >
                  {badge || categoryLabels[category]}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">
                {name}
              </h1>

              {/* Description */}
              <p className="text-lg text-blue-100 max-w-2xl mb-4">
                {description}
              </p>

              {/* Rating */}
              {rating && (
                <div className="flex items-center gap-2">
                  <StarRating rating={rating.average} count={rating.count} />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          MOBILE AD - After Hero (Mobile Only)
      ═══════════════════════════════════════════════════════════════════ */}
      {showMobileAd && (
        <div className="md:hidden bg-slate-50 py-3">
          <div className="container mx-auto px-4">
            <MobileAdContainer slot="calculator-mobile-hero" position="inline" />
          </div>
        </div>
      )}
    </>
  );
}
