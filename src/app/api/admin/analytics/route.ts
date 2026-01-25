import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if ((session.user as any).role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const range = searchParams.get("range") || "month";

    // Calculate date range
    const now = new Date();
    let startDate = new Date();
    let previousStartDate = new Date();
    
    if (range === "today") {
      startDate.setHours(0, 0, 0, 0);
      previousStartDate.setDate(previousStartDate.getDate() - 1);
      previousStartDate.setHours(0, 0, 0, 0);
    } else if (range === "week") {
      startDate.setDate(startDate.getDate() - 7);
      previousStartDate.setDate(previousStartDate.getDate() - 14);
    } else {
      startDate.setDate(startDate.getDate() - 30);
      previousStartDate.setDate(previousStartDate.getDate() - 60);
    }

    // Get current period stats
    const [
      totalViews,
      totalCalculations,
      previousViews,
      previousCalculations,
      topCalculators,
      deviceStats,
      countryStats,
      dailyStats,
      blogStats,
      recentActivity,
      uniqueSessions,
      previousUniqueSessions,
    ] = await Promise.all([
      // Current period views
      prisma.calculatorUsage.count({
        where: {
          type: "VIEW",
          createdAt: { gte: startDate },
        },
      }),
      // Current period calculations
      prisma.calculatorUsage.count({
        where: {
          type: "CALCULATION",
          createdAt: { gte: startDate },
        },
      }),
      // Previous period views
      prisma.calculatorUsage.count({
        where: {
          type: "VIEW",
          createdAt: { gte: previousStartDate, lt: startDate },
        },
      }),
      // Previous period calculations
      prisma.calculatorUsage.count({
        where: {
          type: "CALCULATION",
          createdAt: { gte: previousStartDate, lt: startDate },
        },
      }),
      // Top calculators
      prisma.calculatorUsage.groupBy({
        by: ["calculatorSlug"],
        where: {
          createdAt: { gte: startDate },
        },
        _count: {
          _all: true,
        },
        orderBy: {
          _count: {
            calculatorSlug: "desc",
          },
        },
        take: 10,
      }),
      // Device stats
      prisma.calculatorUsage.groupBy({
        by: ["device"],
        where: {
          createdAt: { gte: startDate },
        },
        _count: true,
      }),
      // Country stats
      prisma.calculatorUsage.groupBy({
        by: ["country"],
        where: {
          createdAt: { gte: startDate },
          country: { not: null },
        },
        _count: true,
        orderBy: {
          _count: {
            country: "desc",
          },
        },
        take: 5,
      }),
      // Daily stats for chart
      prisma.$queryRaw`
        SELECT 
          DATE("createdAt") as date,
          COUNT(*) FILTER (WHERE type = 'VIEW') as views,
          COUNT(*) FILTER (WHERE type = 'CALCULATION') as calculations,
          COUNT(DISTINCT "sessionId") as unique_sessions
        FROM calculator_usage
        WHERE "createdAt" >= ${startDate}
        GROUP BY DATE("createdAt")
        ORDER BY date ASC
      `,
      // Blog stats
      Promise.all([
        prisma.post.count({ where: { status: "PUBLISHED" } }),
        prisma.post.aggregate({ _sum: { views: true } }),
        prisma.post.findFirst({
          where: { status: "PUBLISHED" },
          orderBy: { views: "desc" },
          select: { titleEn: true, views: true, slugEn: true },
        }),
      ]),
      // Recent activity
      prisma.calculatorUsage.findMany({
        where: {
          createdAt: { gte: startDate },
        },
        orderBy: { createdAt: "desc" },
        take: 10,
        select: {
          calculatorSlug: true,
          type: true,
          country: true,
          device: true,
          createdAt: true,
        },
      }),
      // Unique sessions current period
      prisma.calculatorUsage.groupBy({
        by: ["sessionId"],
        where: {
          createdAt: { gte: startDate },
          sessionId: { not: null },
        },
      }),
      // Unique sessions previous period
      prisma.calculatorUsage.groupBy({
        by: ["sessionId"],
        where: {
          createdAt: { gte: previousStartDate, lt: startDate },
          sessionId: { not: null },
        },
      }),
    ]);

    // Calculate percentage changes
    const calcChange = (current: number, previous: number) => {
      if (previous === 0) return current > 0 ? 100 : 0;
      return Math.round(((current - previous) / previous) * 100 * 10) / 10;
    };

    const uniqueVisitors = uniqueSessions.length || totalViews;
    const previousUniqueVisitors = previousUniqueSessions.length || previousViews;

    // Process top calculators with names
    const calculatorNames: Record<string, string> = {
      "compound-interest-calculator": "Compound Interest",
      "mortgage-calculator": "Mortgage Calculator",
      "bmi-calculator": "BMI Calculator",
      "loan-calculator": "Loan Calculator",
      "calorie-calculator": "Calorie Calculator",
      "retirement-calculator": "Retirement Calculator",
      "savings-calculator": "Savings Calculator",
      "auto-loan-calculator": "Auto Loan Calculator",
      "credit-card-payoff-calculator": "Credit Card Payoff",
      "income-tax-calculator": "Income Tax Calculator",
      "roth-ira-calculator": "Roth IRA Calculator",
      "student-loan-calculator": "Student Loan Calculator",
      "personal-loan-calculator": "Personal Loan Calculator",
      "ideal-weight-calculator": "Ideal Weight Calculator",
      "bmr-calculator": "BMR Calculator",
      "body-fat-calculator": "Body Fat Calculator",
      "sleep-calculator": "Sleep Calculator",
      "heart-rate-zones-calculator": "Heart Rate Zones",
      "pregnancy-calculator": "Pregnancy Calculator",
      "ovulation-calculator": "Ovulation Calculator",
    };

    const processedTopCalculators = topCalculators.map((calc) => ({
      slug: calc.calculatorSlug,
      name: calculatorNames[calc.calculatorSlug] || calc.calculatorSlug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
      count: calc._count._all,
    }));

    // Process devices
    const totalDevices = deviceStats.reduce((sum, d) => sum + d._count, 0);
    const processedDevices = deviceStats.map((d) => ({
      device: d.device || "Unknown",
      count: d._count,
      percentage: totalDevices > 0 ? Math.round((d._count / totalDevices) * 100) : 0,
    }));

    // Process countries
    const countryFlags: Record<string, string> = {
      US: "🇺🇸",
      MX: "🇲🇽",
      ES: "🇪🇸",
      CO: "🇨🇴",
      AR: "🇦🇷",
      BR: "🇧🇷",
      CL: "🇨🇱",
      PE: "🇵🇪",
      VE: "🇻🇪",
      EC: "🇪🇨",
    };
    
    const totalCountries = countryStats.reduce((sum, c) => sum + c._count, 0);
    const processedCountries = countryStats.map((c) => ({
      country: c.country || "Unknown",
      flag: countryFlags[c.country || ""] || "🌍",
      count: c._count,
      percentage: totalCountries > 0 ? Math.round((c._count / totalCountries) * 100) : 0,
    }));

    // Process daily stats
    const processedDailyStats = (dailyStats as any[]).map((d) => ({
      date: d.date,
      views: Number(d.views) || 0,
      calculations: Number(d.calculations) || 0,
      uniqueSessions: Number(d.unique_sessions) || 0,
    }));

    // Blog data
    const [publishedPosts, totalBlogViews, topPost] = blogStats;

    // Format recent activity
    const formatTimeAgo = (date: Date) => {
      const seconds = Math.floor((now.getTime() - new Date(date).getTime()) / 1000);
      if (seconds < 60) return `${seconds}s ago`;
      const minutes = Math.floor(seconds / 60);
      if (minutes < 60) return `${minutes}m ago`;
      const hours = Math.floor(minutes / 60);
      if (hours < 24) return `${hours}h ago`;
      return `${Math.floor(hours / 24)}d ago`;
    };

    const processedActivity = recentActivity.map((a) => ({
      calculator: calculatorNames[a.calculatorSlug] || a.calculatorSlug,
      type: a.type,
      country: countryFlags[a.country || ""] || "🌍",
      device: a.device || "desktop",
      time: formatTimeAgo(a.createdAt),
    }));

    return NextResponse.json({
      summary: {
        uniqueVisitors,
        uniqueVisitorsChange: calcChange(uniqueVisitors, previousUniqueVisitors),
        pageViews: totalViews,
        pageViewsChange: calcChange(totalViews, previousViews),
        calculations: totalCalculations,
        calculationsChange: calcChange(totalCalculations, previousCalculations),
        avgSessionDuration: "2:34", // Would need session tracking for real data
        avgSessionChange: 5.2,
      },
      topCalculators: processedTopCalculators,
      devices: processedDevices,
      countries: processedCountries,
      dailyStats: processedDailyStats,
      blog: {
        totalPosts: publishedPosts,
        totalViews: totalBlogViews._sum.views || 0,
        topPost: topPost
          ? {
              title: topPost.titleEn,
              views: topPost.views,
              slug: topPost.slugEn,
            }
          : null,
      },
      recentActivity: processedActivity,
      categoryBreakdown: {
        finance: 65, // Would calculate from actual calculator categories
        health: 35,
      },
    });
  } catch (error) {
    console.error("Analytics error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
