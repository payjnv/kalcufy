// Calculator configuration V4 - Dynamic from SLUG_REGISTRY
import { SLUG_REGISTRY } from "@/engine/v4/slugs/registry";

export interface CalculatorV4 {
  slug: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  isNew?: boolean;
  isPro?: boolean;
}

export interface CategoryStat {
  id: string;
  icon: string;
  color: string;
  count: number;
  status?: "active" | "coming-soon";
}

// V4 Calculator IDs - read from registry (excludes drafts)
export const V4_CALCULATOR_IDS = SLUG_REGISTRY
  .filter(entry => entry.category !== "drafts")
  .map(entry => entry.id) as string[];

// Color by category
const CATEGORY_COLORS: Record<string, string> = {
  finance: "blue",
  health: "green",
  math: "violet",
  everyday: "purple",
};

// Build calculator list from registry
export function getV4Calculators(locale: string = "en"): CalculatorV4[] {
  return SLUG_REGISTRY
    .filter(entry => entry.category !== "drafts")
    .map(entry => ({
      slug: entry.slugs[locale as keyof typeof entry.slugs] || entry.slugs.en,
      name: entry.id.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase()),
      description: "",
      icon: "🧮",
      category: entry.category,
      isNew: true,
      isPro: false,
    }));
}

// Get all V4 calculators
export const ALL_CALCULATORS_V4 = getV4Calculators();

// Helper functions
export function getCalculatorBySlug(slug: string): CalculatorV4 | undefined {
  return ALL_CALCULATORS_V4.find(c => c.slug === slug || c.slug === `${slug}-calculator`);
}

export function getCalculatorsByCategory(category: string): CalculatorV4[] {
  return ALL_CALCULATORS_V4.filter(c => c.category === category);
}

export function getActiveCalculators(): CalculatorV4[] {
  return ALL_CALCULATORS_V4;
}

export function getTotalActiveCalculators(): number {
  return ALL_CALCULATORS_V4.length;
}

export function getCategoryStats(): CategoryStat[] {
  const categories = ["finance", "health", "math", "everyday"];
  return categories.map(cat => ({
    id: cat,
    icon: cat === "finance" ? "💰" : cat === "health" ? "💪" : cat === "math" ? "🔢" : "🧮",
    color: CATEGORY_COLORS[cat],
    count: ALL_CALCULATORS_V4.filter(c => c.category === cat).length,
    status: "active" as const,
  }));
}

export function slugToTranslationKey(slug: string): string {
  let key = slug.replace(/-calculator$/, "").replace(/-generator$/, "");
  key = key.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
  return key;
}

export const CALCULATOR_COUNTS = {
  total: ALL_CALCULATORS_V4.length,
  finance: ALL_CALCULATORS_V4.filter(c => c.category === "finance").length,
  health: ALL_CALCULATORS_V4.filter(c => c.category === "health").length,
  math: ALL_CALCULATORS_V4.filter(c => c.category === "math").length,
  everyday: ALL_CALCULATORS_V4.filter(c => c.category === "everyday").length,
};
