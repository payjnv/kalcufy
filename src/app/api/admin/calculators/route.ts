// src/app/api/admin/calculators/route.ts
// REEMPLAZA tu archivo actual con este

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { ALL_CALCULATORS } from "@/config/calculators-config";

export async function GET(request: NextRequest) {
  try {
    // Check admin auth
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const period = searchParams.get("period") || "month";

    // Get date ranges based on period
    const now = new Date();
    let startDate: Date;
    let prevStartDate: Date;
    let prevEndDate: Date;

    switch (period) {
      case "today":
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        prevStartDate = new Date(startDate);
        prevStartDate.setDate(prevStartDate.getDate() - 1);
        prevEndDate = new Date(startDate);
        break;
      case "week":
        startDate = new Date(now);
        startDate.setDate(now.getDate() - 7);
        prevStartDate = new Date(startDate);
        prevStartDate.setDate(prevStartDate.getDate() - 7);
        prevEndDate = new Date(startDate);
        break;
      case "year":
        startDate = new Date(now.getFullYear(), 0, 1);
        prevStartDate = new Date(now.getFullYear() - 1, 0, 1);
        prevEndDate = new Date(now.getFullYear(), 0, 1);
        break;
      case "month":
      default:
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        prevStartDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        prevEndDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
    }

    // Get calculator statuses from database
    const calculatorStatuses = await prisma.calculatorStatus.findMany();
    const statusMap = new Map(calculatorStatuses.map(s => [s.slug, s.isActive]));

    // Get usage data for current period
    const currentUsage = await prisma.calculatorUsage.groupBy({
      by: ["calculatorSlug", "type"],
      where: {
        createdAt: { gte: startDate },
      },
      _count: true,
    });

    // Get usage data for previous period
    const prevUsage = await prisma.calculatorUsage.groupBy({
      by: ["calculatorSlug", "type"],
      where: {
        createdAt: {
          gte: prevStartDate,
          lt: prevEndDate,
        },
      },
      _count: true,
    });

    // Get all-time usage
    const allTimeUsage = await prisma.calculatorUsage.groupBy({
      by: ["calculatorSlug", "type"],
      _count: true,
    });

    // Get language breakdown
    const languageData = await prisma.calculatorUsage.groupBy({
      by: ["language"],
      where: {
        createdAt: { gte: startDate },
      },
      _count: true,
    });

    // Process calculator data
    const calculators = ALL_CALCULATORS.map((calc) => {
      // Current period
      const views = currentUsage.find(
        (u) => u.calculatorSlug === calc.slug && u.type === "VIEW"
      )?._count || 0;
      const calculations = currentUsage.find(
        (u) => u.calculatorSlug === calc.slug && u.type === "CALCULATE"
      )?._count || 0;

      // Previous period
      const prevViews = prevUsage.find(
        (u) => u.calculatorSlug === calc.slug && u.type === "VIEW"
      )?._count || 0;
      const prevCalculations = prevUsage.find(
        (u) => u.calculatorSlug === calc.slug && u.type === "CALCULATE"
      )?._count || 0;

      // All time
      const allTimeViews = allTimeUsage.find(
        (u) => u.calculatorSlug === calc.slug && u.type === "VIEW"
      )?._count || 0;

      // Calculate changes
      const viewsChange = prevViews > 0 
        ? Math.round(((views - prevViews) / prevViews) * 100) 
        : views > 0 ? 100 : 0;
      const calcsChange = prevCalculations > 0 
        ? Math.round(((calculations - prevCalculations) / prevCalculations) * 100) 
        : calculations > 0 ? 100 : 0;

      // Conversion rate
      const conversionRate = views > 0 
        ? Math.round((calculations / views) * 100) 
        : 0;

      // Get active status from database (default to true if not in DB)
      const isActive = statusMap.get(calc.slug) ?? true;

      return {
        id: calc.slug,
        slug: calc.slug,
        name: calc.name,
        category: calc.category.charAt(0).toUpperCase() + calc.category.slice(1),
        isActive,
        views,
        prevViews,
        viewsChange,
        allTimeViews,
        calculations,
        prevCalculations,
        calcsChange,
        conversionRate,
        lastUpdated: now.toISOString(),
      };
    });

    // Sort by views descending
    calculators.sort((a, b) => b.views - a.views);

    // Calculate totals
    const activeCalculators = calculators.filter(c => c.isActive);
    const totalViews = calculators.reduce((sum, c) => sum + c.views, 0);
    const prevTotalViews = calculators.reduce((sum, c) => sum + c.prevViews, 0);
    const totalCalculations = calculators.reduce((sum, c) => sum + c.calculations, 0);
    const prevTotalCalculations = calculators.reduce((sum, c) => sum + c.prevCalculations, 0);

    const totalViewsChange = prevTotalViews > 0
      ? Math.round(((totalViews - prevTotalViews) / prevTotalViews) * 100)
      : totalViews > 0 ? 100 : 0;
    const totalCalcsChange = prevTotalCalculations > 0
      ? Math.round(((totalCalculations - prevTotalCalculations) / prevTotalCalculations) * 100)
      : totalCalculations > 0 ? 100 : 0;

    // Language breakdown
    const totalLangViews = languageData.reduce((sum, l) => sum + l._count, 0);
    const languageBreakdown = languageData.map((l) => ({
      language: l.language || "unknown",
      views: l._count,
      percentage: totalLangViews > 0 ? Math.round((l._count / totalLangViews) * 100) : 0,
    }));

    // Top/bottom performers
    const topPerformers = [...calculators].sort((a, b) => b.views - a.views).slice(0, 5);
    const bottomPerformers = [...calculators]
      .filter(c => c.isActive)
      .sort((a, b) => a.views - b.views)
      .slice(0, 5);
    const topByConversion = [...calculators]
      .filter(c => c.views >= 10)
      .sort((a, b) => b.conversionRate - a.conversionRate)
      .slice(0, 5);

    return NextResponse.json({
      calculators,
      totals: {
        totalCalculators: calculators.length,
        activeCalculators: activeCalculators.length,
        totalViews,
        prevTotalViews,
        totalViewsChange,
        totalCalculations,
        prevTotalCalculations,
        totalCalcsChange,
        overallConversionRate: totalViews > 0 
          ? Math.round((totalCalculations / totalViews) * 100) 
          : 0,
        financeCount: calculators.filter(c => c.category === "Finance").length,
        healthCount: calculators.filter(c => c.category === "Health").length,
        everydayCount: calculators.filter(c => c.category === "Everyday").length,
      },
      languageBreakdown,
      topPerformers,
      bottomPerformers,
      topByConversion,
      period,
    });
  } catch (error) {
    console.error("Error in admin calculators API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
