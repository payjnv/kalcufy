// src/app/api/calculators/active/route.ts
// API to get only active V4 calculators (excludes drafts and inactive)
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { SLUG_REGISTRY } from "@/engine/v4/slugs/registry";

export const dynamic = "force-dynamic";
export const revalidate = 60;

interface V4Calculator {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  isNew?: boolean;
}

async function loadV4Calculators(locale: string = "en"): Promise<V4Calculator[]> {
  const calculators: V4Calculator[] = [];
  
  // Get inactive calculators from DB
  const inactiveStatuses = await prisma.calculatorStatus.findMany({
    where: { isActive: false },
    select: { slug: true },
  });
  const inactiveSlugs = new Set(inactiveStatuses.map((s) => s.slug));

  // Filter registry: exclude drafts and inactive
  const activeEntries = SLUG_REGISTRY.filter((entry) => {
    if (entry.category === "drafts") return false;
    const slug = entry.slugs.en;
    if (inactiveSlugs.has(slug)) return false;
    return true;
  });

  for (const entry of activeEntries) {
    try {
      const module = await import(`@/calculators/${entry.id}/index`);
      const configKey = Object.keys(module).find(k => k.includes("Config") || k.includes("config"));
      if (!configKey) continue;
      
      const config = module[configKey];
      const t = config.t?.[locale] || config.t?.en;
      
      if (t) {
        calculators.push({
          id: entry.id,
          slug: entry.slugs[locale as keyof typeof entry.slugs] || entry.slugs.en,
          name: t.name || entry.id,
          description: t.subtitle || t.seo?.description?.slice(0, 100) || "",
          icon: config.icon || "🧮",
          category: entry.category,
          isNew: true,
        });
      }
    } catch (e) {
      console.log(`Could not load V4 calculator: ${entry.id}`, e);
    }
  }
  
  return calculators;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get("locale") || "en";
    
    const calculators = await loadV4Calculators(locale);
    
    const finance = calculators.filter((c) => c.category === "finance");
    const health = calculators.filter((c) => c.category === "health");
    const math = calculators.filter((c) => c.category === "math");
    const everyday = calculators.filter((c) => c.category === "everyday");

    return NextResponse.json({
      calculators,
      counts: {
        total: calculators.length,
        finance: finance.length,
        health: health.length,
        math: math.length,
        everyday: everyday.length,
      },
      byCategory: {
        finance,
        health,
        math,
        everyday,
      },
    });
  } catch (error) {
    console.error("Error fetching active calculators:", error);
    return NextResponse.json({
      calculators: [],
      counts: { total: 0, finance: 0, health: 0, math: 0, everyday: 0 },
      byCategory: { finance: [], health: [], math: [], everyday: [] },
    });
  }
}
