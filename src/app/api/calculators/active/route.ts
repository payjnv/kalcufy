// src/app/api/calculators/active/route.ts
// API to get only active calculators for frontend pages

import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { ALL_CALCULATORS, type Calculator } from "@/config/calculators-config";

export const dynamic = "force-dynamic";
export const revalidate = 60; // Revalidate every 60 seconds

export async function GET() {
  try {
    // Get all calculator statuses from database
    const statuses = await prisma.calculatorStatus.findMany({
      where: {
        isActive: false, // Only get inactive ones to filter out
      },
      select: {
        slug: true,
      },
    });

    // Create a Set of inactive slugs for fast lookup
    const inactiveSlugs = new Set(statuses.map((s) => s.slug));

    // Filter out inactive calculators
    const activeCalculators = ALL_CALCULATORS.filter(
      (calc) => !inactiveSlugs.has(calc.slug)
    );

    // Group by category
    const finance = activeCalculators.filter((c) => c.category === "finance");
    const health = activeCalculators.filter((c) => c.category === "health");
    const everyday = activeCalculators.filter((c) => c.category === "everyday");

    return NextResponse.json({
      calculators: activeCalculators,
      counts: {
        total: activeCalculators.length,
        finance: finance.length,
        health: health.length,
        everyday: everyday.length,
      },
      byCategory: {
        finance,
        health,
        everyday,
      },
    });
  } catch (error) {
    console.error("Error fetching active calculators:", error);
    
    // Fallback to all calculators on error
    return NextResponse.json({
      calculators: ALL_CALCULATORS,
      counts: {
        total: ALL_CALCULATORS.length,
        finance: ALL_CALCULATORS.filter((c) => c.category === "finance").length,
        health: ALL_CALCULATORS.filter((c) => c.category === "health").length,
        everyday: ALL_CALCULATORS.filter((c) => c.category === "everyday").length,
      },
      byCategory: {
        finance: ALL_CALCULATORS.filter((c) => c.category === "finance"),
        health: ALL_CALCULATORS.filter((c) => c.category === "health"),
        everyday: ALL_CALCULATORS.filter((c) => c.category === "everyday"),
      },
    });
  }
}
