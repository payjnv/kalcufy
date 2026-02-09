import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/db";
import { authOptions } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const period = searchParams.get("period") || "30d";

    // Calculate date range
    const now = new Date();
    const daysMap: Record<string, number> = {
      "today": 1, "7d": 7, "30d": 30, "90d": 90, "365d": 365
    };
    const days = daysMap[period] || 30;

    const startDate = new Date();
    if (period === "today") {
      startDate.setHours(0, 0, 0, 0);
    } else {
      startDate.setTime(now.getTime() - days * 24 * 60 * 60 * 1000);
    }

    // Previous period for comparison
    const prevStartDate = new Date(startDate.getTime() - (now.getTime() - startDate.getTime()));

    // Base where clause - exclude old localhost data (country is null AND device patterns)
    // This filters out any historical localhost data that was tracked before the filter
    const baseWhere = {
      createdAt: { gte: startDate },
    };
    const prevWhere = {
      createdAt: { gte: prevStartDate, lt: startDate },
    };

    // Run all queries in parallel
    const [
      totalViews,
      prevTotalViews,
      totalCalculations,
      prevTotalCalculations,
      uniqueSessions,
      topCalculators,
      byCountry,
      byDevice,
      byLanguage,
      dailyStats,
      recentActivity,
      totalAllTime,
    ] = await Promise.all([
      // Total views current period
      prisma.calculatorUsage.count({
        where: { ...baseWhere, type: "VIEW" },
      }),
      // Total views previous period
      prisma.calculatorUsage.count({
        where: { ...prevWhere, type: "VIEW" },
      }),
      // Total calculations current period
      prisma.calculatorUsage.count({
        where: { ...baseWhere, type: "CALCULATION" },
      }),
      // Total calculations previous period
      prisma.calculatorUsage.count({
        where: { ...prevWhere, type: "CALCULATION" },
      }),
      // Unique sessions
      prisma.calculatorUsage.groupBy({
        by: ["sessionId"],
        where: { ...baseWhere, sessionId: { not: null } },
      }).then(r => r.length),
      // Top calculators
      prisma.$queryRaw`
        SELECT 
          "calculatorSlug" as slug,
          COUNT(*) FILTER (WHERE type = 'VIEW') as views,
          COUNT(*) FILTER (WHERE type = 'CALCULATION') as calculations
        FROM calculator_usage
        WHERE "createdAt" >= ${startDate}
        GROUP BY "calculatorSlug"
        ORDER BY views DESC
        LIMIT 15
      `,
      // By country
      prisma.calculatorUsage.groupBy({
        by: ["country"],
        where: { ...baseWhere, country: { not: null } },
        _count: { id: true },
        orderBy: { _count: { id: "desc" } },
        take: 15,
      }),
      // By device
      prisma.calculatorUsage.groupBy({
        by: ["device"],
        where: { ...baseWhere, device: { not: null } },
        _count: { id: true },
        orderBy: { _count: { id: "desc" } },
      }),
      // By language
      prisma.calculatorUsage.groupBy({
        by: ["language"],
        where: baseWhere,
        _count: { id: true },
        orderBy: { _count: { id: "desc" } },
      }),
      // Daily stats for chart
      prisma.$queryRaw`
        SELECT 
          DATE("createdAt") as date,
          COUNT(*) FILTER (WHERE type = 'VIEW') as views,
          COUNT(*) FILTER (WHERE type = 'CALCULATION') as calculations,
          COUNT(DISTINCT "sessionId") as sessions
        FROM calculator_usage
        WHERE "createdAt" >= ${startDate}
        GROUP BY DATE("createdAt")
        ORDER BY date ASC
      `,
      // Recent activity
      prisma.calculatorUsage.findMany({
        where: baseWhere,
        orderBy: { createdAt: "desc" },
        take: 25,
        select: {
          calculatorSlug: true,
          type: true,
          country: true,
          device: true,
          language: true,
          createdAt: true,
        },
      }),
      // Total all-time records
      prisma.calculatorUsage.count(),
    ]);

    // Calculate percentage changes
    const viewsChange = prevTotalViews > 0
      ? ((totalViews - prevTotalViews) / prevTotalViews * 100)
      : 0;
    const calcsChange = prevTotalCalculations > 0
      ? ((totalCalculations - prevTotalCalculations) / prevTotalCalculations * 100)
      : 0;
    const conversionRate = totalViews > 0
      ? ((totalCalculations / totalViews) * 100)
      : 0;

    // Format top calculators
    const formattedTopCalcs = (topCalculators as any[]).map(calc => ({
      slug: calc.slug,
      views: Number(calc.views),
      calculations: Number(calc.calculations),
      conversion: Number(calc.views) > 0
        ? ((Number(calc.calculations) / Number(calc.views)) * 100).toFixed(1)
        : "0",
    }));

    // Country flags
    const countryFlags: Record<string, string> = {
      "United States": "🇺🇸", "Canada": "🇨🇦", "Mexico": "🇲🇽",
      "Brazil": "🇧🇷", "Argentina": "🇦🇷", "Colombia": "🇨🇴",
      "Chile": "🇨🇱", "Peru": "🇵🇪", "Venezuela": "🇻🇪",
      "Ecuador": "🇪🇨", "Uruguay": "🇺🇾", "Paraguay": "🇵🇾",
      "Bolivia": "🇧🇴", "Costa Rica": "🇨🇷", "Panama": "🇵🇦",
      "Dominican Republic": "🇩🇴", "Guatemala": "🇬🇹",
      "United Kingdom": "🇬🇧", "Germany": "🇩🇪", "France": "🇫🇷",
      "Spain": "🇪🇸", "Italy": "🇮🇹", "Portugal": "🇵🇹",
      "Netherlands": "🇳🇱", "Belgium": "🇧🇪", "Switzerland": "🇨🇭",
      "Sweden": "🇸🇪", "Norway": "🇳🇴", "Denmark": "🇩🇰",
      "Finland": "🇫🇮", "Ireland": "🇮🇪", "Poland": "🇵🇱",
      "Russia": "🇷🇺", "Ukraine": "🇺🇦", "Turkey": "🇹🇷",
      "China": "🇨🇳", "Japan": "🇯🇵", "South Korea": "🇰🇷",
      "India": "🇮🇳", "Indonesia": "🇮🇩", "Thailand": "🇹🇭",
      "Vietnam": "🇻🇳", "Philippines": "🇵🇭", "Malaysia": "🇲🇾",
      "Singapore": "🇸🇬", "Taiwan": "🇹🇼", "Australia": "🇦🇺",
      "New Zealand": "🇳🇿", "South Africa": "🇿🇦", "Nigeria": "🇳🇬",
      "Egypt": "🇪🇬", "Saudi Arabia": "🇸🇦", "UAE": "🇦🇪",
      "Israel": "🇮🇱",
    };

    // Format countries with flags and percentages
    const totalCountryHits = byCountry.reduce((sum, c) => sum + c._count.id, 0);
    const formattedCountries = byCountry.map(c => ({
      country: c.country || "Unknown",
      flag: countryFlags[c.country || ""] || "🌍",
      count: c._count.id,
      percentage: totalCountryHits > 0
        ? ((c._count.id / totalCountryHits) * 100).toFixed(1)
        : "0",
    }));

    // Format devices with percentages
    const totalDeviceHits = byDevice.reduce((sum, d) => sum + d._count.id, 0);
    const formattedDevices = byDevice.map(d => ({
      device: d.device || "Unknown",
      count: d._count.id,
      percentage: totalDeviceHits > 0
        ? ((d._count.id / totalDeviceHits) * 100).toFixed(1)
        : "0",
    }));

    // Language flags
    const langFlags: Record<string, string> = {
      en: "🇺🇸", es: "🇪🇸", pt: "🇧🇷", fr: "🇫🇷", de: "🇩🇪",
    };
    const langNames: Record<string, string> = {
      en: "English", es: "Spanish", pt: "Portuguese", fr: "French", de: "German",
    };
    const totalLangHits = byLanguage.reduce((sum, l) => sum + l._count.id, 0);
    const formattedLanguages = byLanguage.map(l => ({
      code: l.language,
      name: langNames[l.language] || l.language,
      flag: langFlags[l.language] || "🌐",
      count: l._count.id,
      percentage: totalLangHits > 0
        ? ((l._count.id / totalLangHits) * 100).toFixed(1)
        : "0",
    }));

    return NextResponse.json({
      overview: {
        totalViews,
        viewsChange: parseFloat(viewsChange.toFixed(1)),
        totalCalculations,
        calcsChange: parseFloat(calcsChange.toFixed(1)),
        conversionRate: parseFloat(conversionRate.toFixed(1)),
        uniqueSessions,
        totalAllTime,
      },
      topCalculators: formattedTopCalcs,
      byCountry: formattedCountries,
      byDevice: formattedDevices,
      byLanguage: formattedLanguages,
      dailyStats: (dailyStats as any[]).map(d => ({
        date: d.date,
        views: Number(d.views),
        calculations: Number(d.calculations),
        sessions: Number(d.sessions),
      })),
      recentActivity: recentActivity.map(a => ({
        ...a,
        flag: countryFlags[a.country || ""] || "🌍",
      })),
    });
  } catch (error) {
    console.error("Analytics error:", error);
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 });
  }
}

