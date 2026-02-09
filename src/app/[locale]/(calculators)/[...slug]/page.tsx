import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SLUG_REGISTRY, getEntryBySlug } from "@/engine/v4/slugs/registry";
import CalculatorClient from "./client";

type Params = { locale: string; slug: string[] };

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://kalcufy.com";
const LOCALES = ["en", "es", "pt", "fr", "de"] as const;

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
    notFound();
  }

  return <CalculatorClient calcId={entry.id} locale={locale} />;
}
