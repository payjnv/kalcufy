"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useLocale } from "next-intl";
import AdBlock from "@/components/ads/AdBlock";

// ============================================================================
// INTERFACES
// ============================================================================
interface CalculatorSidebarProps {
  currentCalculator?: string;
  category?: "health" | "finance" | "all";
  showCTA?: boolean;
  ctaTitle?: string;
  ctaDescription?: string;
  ctaLink?: string;
  ctaLinkText?: string;
  relatedTags?: string[];
}

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  publishedAt: string;
}

// ============================================================================
// CALCULATOR DATA WITH DESCRIPTIONS
// ============================================================================
const healthCalculators = [
  { name: "BMI", slug: "bmi-calculator", icon: "📊", desc: "Body Mass Index", popular: true },
  { name: "Calorie", slug: "calorie-calculator", icon: "🔥", desc: "Daily calorie needs", popular: true },
  { name: "BMR", slug: "bmr-calculator", icon: "⚡", desc: "Basal metabolic rate" },
  { name: "TDEE", slug: "tdee-calculator", icon: "🏃", desc: "Total daily energy" },
  { name: "Body Fat", slug: "body-fat-calculator", icon: "📏", desc: "Body fat percentage" },
  { name: "Macro", slug: "macro-calculator", icon: "🥗", desc: "Protein, carbs & fats" },
  { name: "Ideal Weight", slug: "ideal-weight-calculator", icon: "⚖️", desc: "Target weight range" },
];

const financeCalculators = [
  { name: "Mortgage", slug: "mortgage-calculator", icon: "🏠", desc: "Home loan payments", popular: true },
  { name: "Loan", slug: "loan-calculator", icon: "💳", desc: "Personal loan calc" },
  { name: "Compound Interest", slug: "compound-interest-calculator", icon: "📈", desc: "Investment growth", popular: true },
  { name: "Auto Loan", slug: "auto-loan-calculator", icon: "🚗", desc: "Car financing" },
  { name: "Retirement", slug: "retirement-calculator", icon: "🏖️", desc: "Retirement planning" },
  { name: "Savings", slug: "savings-calculator", icon: "💰", desc: "Savings goals" },
];

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export default function CalculatorSidebar({
  currentCalculator,
  category = "all",
  showCTA = true,
  ctaTitle = "📏 Check Your Body Fat",
  ctaDescription = "Body fat percentage is often more meaningful than weight alone.",
  ctaLink,
  ctaLinkText = "Try Body Fat Calculator →",
  relatedTags = [],
}: CalculatorSidebarProps) {
  const locale = useLocale();
  const [searchQuery, setSearchQuery] = useState("");
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [postsLoading, setPostsLoading] = useState(false);

  // ─────────────────────────────────────────────────────────────────────────
  // FETCH RELATED BLOG POSTS
  // ─────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    const fetchRelatedPosts = async () => {
      return; // Temporarily disabled
      
      setPostsLoading(true);
      try {
        const queryParams = new URLSearchParams();
        if (relatedTags.length > 0) {
          queryParams.set("tags", relatedTags.join(","));
        }
        if (currentCalculator) {
          queryParams.set("calculator", currentCalculator);
        }
        queryParams.set("limit", "3");
        queryParams.set("locale", locale);

        const res = await fetch(`/api/blog/related?${queryParams.toString()}`);
        if (res.ok) {
          const data = await res.json();
          setRelatedPosts(data.posts || []);
        }
      } catch {
        // Silent fail
      } finally {
        setPostsLoading(false);
      }
    };

    fetchRelatedPosts();
  }, [relatedTags, currentCalculator, locale]);

  // ─────────────────────────────────────────────────────────────────────────
  // FILTER CALCULATORS
  // ─────────────────────────────────────────────────────────────────────────
  const filteredHealth = healthCalculators.filter(
    (c) =>
      c.slug !== currentCalculator &&
      c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredFinance = financeCalculators.filter(
    (c) =>
      c.slug !== currentCalculator &&
      c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const showHealth = category === "all" || category === "health";
  const showFinance = category === "all" || category === "finance";

  // ─────────────────────────────────────────────────────────────────────────
  // RENDER CALCULATOR ITEM
  // ─────────────────────────────────────────────────────────────────────────
  const renderCalculatorItem = (calc: typeof healthCalculators[0], colorClass: string) => (
    <li key={calc.slug}>
      <Link
        href={`/${locale}/${calc.slug}`}
        className="group flex items-center gap-3 py-2.5 px-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        <span 
          className={`w-9 h-9 ${colorClass} rounded-xl flex items-center justify-center text-base flex-shrink-0 group-hover:scale-110 transition-transform`}
          aria-hidden="true"
        >
          {calc.icon}
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
              {calc.name} Calculator
            </span>
            {calc.popular && (
              <span className="px-1.5 py-0.5 bg-amber-100 text-amber-700 text-[10px] font-bold rounded-full uppercase">
                Popular
              </span>
            )}
          </div>
          <span className="text-xs text-slate-500 block truncate">
            {calc.desc}
          </span>
        </div>
        <svg 
          className="w-4 h-4 text-slate-300 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all flex-shrink-0" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </li>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────────────────────
  return (
    <aside 
      className="space-y-6" 
      aria-label="Sidebar with related calculators and resources"
      role="complementary"
    >
      {/* ═══════════════════════════════════════════════════════════════════
          1. SEARCH BAR - FIRST!
      ═══════════════════════════════════════════════════════════════════ */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
        <label htmlFor="calc-search" className="sr-only">
          Search calculators
        </label>
        <div className="relative">
          <div 
            className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
            aria-hidden="true"
          >
            <svg
              className="h-4 w-4 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="calc-search"
            placeholder="Search calculators..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
            aria-describedby="search-hint"
          />
        </div>
        <p id="search-hint" className="sr-only">
          Type to filter the calculator list below
        </p>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          2. AD BLOCK - After search
      ═══════════════════════════════════════════════════════════════════ */}
      <div className="hidden md:block">
        <AdBlock slot="Calculator Sidebar" />
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          3. HEALTH CALCULATORS
      ═══════════════════════════════════════════════════════════════════ */}
      {showHealth && filteredHealth.length > 0 && (
        <nav
          className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm"
          aria-labelledby="health-calc-heading"
        >
          <h3
            id="health-calc-heading"
            className="font-bold text-slate-900 mb-3 flex items-center gap-2 px-1"
          >
            <span
              className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center text-sm shadow-sm"
              aria-hidden="true"
            >
              💪
            </span>
            <span>Health Calculators</span>
            <span className="ml-auto text-xs font-normal text-slate-400">
              {filteredHealth.length}
            </span>
          </h3>
          <ul className="space-y-1" role="list">
            {filteredHealth.map((calc) => renderCalculatorItem(calc, "bg-green-50"))}
          </ul>
        </nav>
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          4. FINANCE CALCULATORS
      ═══════════════════════════════════════════════════════════════════ */}
      {showFinance && filteredFinance.length > 0 && (
        <nav
          className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm"
          aria-labelledby="finance-calc-heading"
        >
          <h3
            id="finance-calc-heading"
            className="font-bold text-slate-900 mb-3 flex items-center gap-2 px-1"
          >
            <span
              className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center text-sm shadow-sm"
              aria-hidden="true"
            >
              💰
            </span>
            <span>Financial Calculators</span>
            <span className="ml-auto text-xs font-normal text-slate-400">
              {filteredFinance.length}
            </span>
          </h3>
          <ul className="space-y-1" role="list">
            {filteredFinance.map((calc) => renderCalculatorItem(calc, "bg-amber-50"))}
          </ul>
        </nav>
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          5. RELATED BLOG POSTS
      ═══════════════════════════════════════════════════════════════════ */}
      {(relatedPosts.length > 0 || postsLoading) && (
        <section
          className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm"
          aria-labelledby="related-posts-heading"
        >
          <h3
            id="related-posts-heading"
            className="font-bold text-slate-900 mb-3 flex items-center gap-2 px-1"
          >
            <span
              className="w-8 h-8 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-lg flex items-center justify-center text-sm shadow-sm"
              aria-hidden="true"
            >
              📝
            </span>
            Related Articles
          </h3>
          
          {postsLoading ? (
            <div className="space-y-3 px-1" aria-busy="true" aria-label="Loading related articles">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-slate-100 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
            <ul className="space-y-2" role="list">
              {relatedPosts.map((post) => (
                <li key={post.id}>
                  <Link
                    href={`/${locale}/blog/${post.slug}`}
                    className="block group p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    <h4 className="text-sm font-medium text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {post.title}
                    </h4>
                    {post.excerpt && (
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                        {post.excerpt}
                      </p>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          )}
          
          <Link
            href={`/${locale}/blog`}
            className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 font-medium mt-3 px-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
          >
            View all articles
            <svg 
              className="w-4 h-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          6. CTA BLOCK
      ═══════════════════════════════════════════════════════════════════ */}
      {showCTA && (
        <div
          className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-5 text-white shadow-lg"
          role="region"
          aria-labelledby="cta-heading"
        >
          <h3 id="cta-heading" className="font-bold mb-2 text-lg">
            {ctaTitle}
          </h3>
          <p className="text-blue-100 text-sm mb-4 leading-relaxed">
            {ctaDescription}
          </p>
          <Link
            href={ctaLink || `/${locale}/body-fat-calculator`}
            className="inline-block bg-white text-blue-600 font-semibold px-4 py-2.5 rounded-xl hover:bg-blue-50 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-500"
          >
            {ctaLinkText}
          </Link>
        </div>
      )}
    </aside>
  );
}
