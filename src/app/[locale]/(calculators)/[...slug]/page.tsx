import { notFound, permanentRedirect } from "next/navigation";
import type { Metadata } from "next";
import { SLUG_REGISTRY, getEntryBySlug } from "@/engine/v4/slugs/registry";
import CalculatorClient from "./client";
import Link from "next/link";

type Params = { locale: string; slug: string[] };
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://www.kalcufy.com";
const LOCALES = ["en", "es", "pt", "fr", "de"] as const;

// Common translations for breadcrumbs
const BREADCRUMB_HOME: Record<string, string> = {
  en: "Home", es: "Inicio", pt: "Início", fr: "Accueil", de: "Startseite",
};
const BREADCRUMB_CALCS: Record<string, string> = {
  en: "Calculators", es: "Calculadoras", pt: "Calculadoras", fr: "Calculateurs", de: "Rechner",
};

// --- Helper: find entry by slug in ANY locale, return entry + which locale it matched ---
function findEntryInAnyLocale(slug: string): { entry: (typeof SLUG_REGISTRY)[number]; matchedLocale: string } | null {
  for (const entry of SLUG_REGISTRY) {
    for (const loc of LOCALES) {
      if (entry.slugs[loc as keyof typeof entry.slugs] === slug) {
        return { entry, matchedLocale: loc };
      }
    }
  }
  return null;
}

// --- SEO: Generate metadata from calculator config ---
export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!slug || slug.length !== 1) return {};
  const entry = getEntryBySlug(slug[0], locale);
  if (!entry) return {};
  try {
    const mod = await import(`@/calculators/${entry.id}/index`);
    // Find the config export
    const config =
      mod.config ||
      mod.default ||
      Object.values(mod).find(
        (v: unknown): v is Record<string, unknown> =>
          v !== null &&
          typeof v === "object" &&
          "id" in (v as Record<string, unknown>)
      );
    if (!config || typeof config !== "object") return {};
    const c = config as Record<string, unknown>;
    // V4 format: t.{locale}.seo
    const t = c.t as Record<string, Record<string, unknown>> | undefined;
    const localeT = t?.[locale] || t?.en;
    const seo = localeT?.seo as
      | { title?: string; description?: string; shortDescription?: string; keywords?: string[] }
      | undefined;
    const name = (localeT?.name as string) || entry.id;
    if (seo) {
      // Build hreflang alternates
      const languages: Record<string, string> = {};
      for (const loc of LOCALES) {
        const locSlug = entry.slugs[loc as keyof typeof entry.slugs] || entry.slugs.en;
        languages[loc] = `${BASE_URL}/${loc}/${locSlug}`;
      }
      // x-default points to English version
      languages["x-default"] = `${BASE_URL}/en/${entry.slugs.en}`;
      const canonicalSlug = entry.slugs[locale as keyof typeof entry.slugs] || entry.slugs.en;
      const canonicalUrl = `${BASE_URL}/${locale}/${canonicalSlug}`;
      return {
        title: seo.title,
        description: seo.description,
        keywords: seo.keywords,
        alternates: {
          canonical: canonicalUrl,
          languages,
        },
        openGraph: {
          title: seo.title,
          description: seo.shortDescription || seo.description,
          url: canonicalUrl,
          type: "website",
          siteName: "Kalcufy",
          images: [{
            url: `${BASE_URL}/api/og?title=${encodeURIComponent(name)}&subtitle=${encodeURIComponent((seo.shortDescription || seo.description || "").slice(0, 100))}&icon=${encodeURIComponent((c as any).icon || "🧮")}&category=${entry.category}`,
            width: 1200,
            height: 630,
          }],
        },
        twitter: {
          card: "summary_large_image",
          title: seo.title,
          description: seo.shortDescription || seo.description,
        },
      };
    }
  } catch {
    // Calculator module not yet created — return minimal metadata
  }
  // Fallback: generate title from entry id
  const name = entry.id
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l: string) => l.toUpperCase());
  return { title: `${name} Calculator | Kalcufy` };
}
// --- Static params for build (all calculator slugs × all locales) ---
export async function generateStaticParams() {
  return SLUG_REGISTRY.flatMap((entry) =>
    LOCALES.map((locale) => ({
      slug: [entry.slugs[locale]],
    }))
  );
}

// --- Helper: extract calculator info server-side ---
async function getCalcInfo(entryId: string, locale: string) {
  let name = entryId
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l: string) => l.toUpperCase());
  let subtitle = "";

  try {
    const mod = await import(`@/calculators/${entryId}/index`);
    const config =
      mod.config ||
      mod.default ||
      Object.values(mod).find(
        (v: unknown): v is Record<string, unknown> =>
          v !== null &&
          typeof v === "object" &&
          "id" in (v as Record<string, unknown>)
      );
    if (config && typeof config === "object") {
      const c = config as Record<string, unknown>;
      const t = c.t as Record<string, Record<string, unknown>> | undefined;
      const localeT = t?.[locale] || t?.en;
      if (localeT) {
        name = (localeT.name as string) || name;
        subtitle = (localeT.subtitle as string) || "";
      }
    }
  } catch {}

  return { name, subtitle };
}

// --- Page component ---
export default async function CalculatorCatchAllPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { locale, slug } = await params;
  // Only handle single-segment slugs (calculator URLs)
  if (!slug || slug.length !== 1) {
    notFound();
  }
  const entry = getEntryBySlug(slug[0], locale);
  if (!entry) {
    // --- SEO FIX: If slug exists in another locale, 301 redirect to correct slug ---
    const found = findEntryInAnyLocale(slug[0]);
    if (found) {
      const correctSlug = found.entry.slugs[locale as keyof typeof found.entry.slugs] || found.entry.slugs.en;
      permanentRedirect(`/${locale}/${correctSlug}`);
    }
    notFound();
  }

  // Server-side: get calculator name & subtitle for SSR hero
  const { name, subtitle } = await getCalcInfo(entry.id, locale);

  return (
    <>
      {/* Server-rendered hero — STAYS permanently for LCP */}
      <section className="bg-gradient-to-b from-blue-50 to-white pt-4 pb-0 md:py-6 overflow-hidden">
        <div className="container mx-auto px-2 sm:px-4 max-w-6xl">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="hidden md:flex items-center gap-2 text-sm text-slate-600 mb-3 md:mb-4">
            <Link href={`/${locale}`} className="hover:text-blue-600 transition-colors">
              {BREADCRUMB_HOME[locale] || "Home"}
            </Link>
            <span className="text-slate-400">/</span>
            <Link href={`/${locale}/calculators`} className="hover:text-blue-600 transition-colors">
              {BREADCRUMB_CALCS[locale] || "Calculators"}
            </Link>
            <span className="text-slate-400">/</span>
            <span className="text-slate-900 font-medium">{name}</span>
          </nav>

          {/* Title */}
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-900">
            {name}
          </h1>
          {subtitle && (
            <p className="hidden md:block text-slate-600 mt-1">{subtitle}</p>
          )}
        </div>
      </section>

      {/* Skeleton — gets REMOVED when client mounts */}
      <div id="calc-ssr-skeleton">
        <section className="py-4 overflow-hidden">
          <div className="container mx-auto px-2 sm:px-4 max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Left: Input skeleton */}
              <div className="space-y-4">
                <div className="bg-white rounded-2xl border border-slate-200 p-6">
                  <div className="animate-pulse space-y-4">
                    <div className="h-5 bg-slate-200 rounded w-2/5" />
                    <div className="h-11 bg-slate-100 rounded-lg" />
                    <div className="h-5 bg-slate-200 rounded w-1/3" />
                    <div className="h-11 bg-slate-100 rounded-lg" />
                    <div className="h-5 bg-slate-200 rounded w-2/5" />
                    <div className="h-11 bg-slate-100 rounded-lg" />
                    <div className="h-12 bg-blue-100 rounded-xl mt-2" />
                  </div>
                </div>
              </div>
              {/* Right: Results skeleton */}
              <div>
                <div className="bg-white rounded-2xl border border-slate-200 p-6">
                  <div className="animate-pulse space-y-4">
                    <div className="h-5 bg-slate-200 rounded w-1/4" />
                    <div className="h-16 bg-slate-100 rounded-lg" />
                    <div className="h-4 bg-slate-100 rounded w-3/4" />
                    <div className="h-4 bg-slate-100 rounded w-1/2" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Client-rendered calculator (hides skeleton on mount) */}
      <CalculatorClient calcId={entry.id} locale={locale} />
    </>
  );
}
