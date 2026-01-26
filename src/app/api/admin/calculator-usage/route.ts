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
    const daysMap: Record<string, number> = { "7d": 7, "30d": 30, "90d": 90 };
    const days = daysMap[period] || 30;
    const startDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);

    // Previous period for comparison
    const prevStartDate = new Date(startDate.getTime() - days * 24 * 60 * 60 * 1000);

    // Run all queries in parallel
    const [
      totalViews,
      prevTotalViews,
      totalCalculations,
      prevTotalCalculations,
      uniqueUsers,
      topCalculators,
      byCountry,
      byDevice,
      byLanguage,
      dailyStats,
      recentActivity
    ] = await Promise.all([
      // Total views current period
      prisma.calculatorUsage.count({
        where: { createdAt: { gte: startDate }, type: "VIEW" }
      }),
      // Total views previous period
      prisma.calculatorUsage.count({
        where: { createdAt: { gte: prevStartDate, lt: startDate }, type: "VIEW" }
      }),
      // Total calculations current period
      prisma.calculatorUsage.count({
        where: { createdAt: { gte: startDate }, type: "CALCULATION" }
      }),
      // Total calculations previous period
      prisma.calculatorUsage.count({
        where: { createdAt: { gte: prevStartDate, lt: startDate }, type: "CALCULATION" }
      }),
      // Unique users/sessions
      prisma.calculatorUsage.groupBy({
        by: ["sessionId"],
        where: { createdAt: { gte: startDate }, sessionId: { not: null } },
      }).then(r => r.length),
      // Top calculators with views and calculations
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
        where: { createdAt: { gte: startDate } },
        _count: { id: true },
        orderBy: { _count: { id: "desc" } },
        take: 10
      }),
      // By device
      prisma.calculatorUsage.groupBy({
        by: ["device"],
        where: { createdAt: { gte: startDate } },
        _count: { id: true },
        orderBy: { _count: { id: "desc" } }
      }),
      // By language
      prisma.calculatorUsage.groupBy({
        by: ["language"],
        where: { createdAt: { gte: startDate } },
        _count: { id: true },
        orderBy: { _count: { id: "desc" } }
      }),
      // Daily stats for chart
      prisma.$queryRaw`
        SELECT 
          DATE("createdAt") as date,
          COUNT(*) FILTER (WHERE type = 'VIEW') as views,
          COUNT(*) FILTER (WHERE type = 'CALCULATION') as calculations
        FROM calculator_usage
        WHERE "createdAt" >= ${startDate}
        GROUP BY DATE("createdAt")
        ORDER BY date ASC
      `,
      // Recent activity
      prisma.calculatorUsage.findMany({
        where: { createdAt: { gte: startDate } },
        orderBy: { createdAt: "desc" },
        take: 20,
        select: {
          calculatorSlug: true,
          type: true,
          country: true,
          device: true,
          language: true,
          createdAt: true
        }
      })
    ]);

    // Calculate percentage changes
    const viewsChange = prevTotalViews > 0 
      ? ((totalViews - prevTotalViews) / prevTotalViews * 100).toFixed(1)
      : "0";
    const calcsChange = prevTotalCalculations > 0
      ? ((totalCalculations - prevTotalCalculations) / prevTotalCalculations * 100).toFixed(1)
      : "0";
    
    // Calculate conversion rate
    const conversionRate = totalViews > 0 
      ? ((totalCalculations / totalViews) * 100).toFixed(1)
      : "0";

    // Format top calculators
    const formattedTopCalcs = (topCalculators as any[]).map(calc => ({
      slug: calc.slug,
      views: Number(calc.views),
      calculations: Number(calc.calculations),
      conversion: calc.views > 0 
        ? ((Number(calc.calculations) / Number(calc.views)) * 100).toFixed(1)
        : "0"
    }));

    return NextResponse.json({
      overview: {
        totalViews,
        viewsChange: parseFloat(viewsChange),
        totalCalculations,
        calcsChange: parseFloat(calcsChange),
        conversionRate: parseFloat(conversionRate),
        uniqueUsers,
        avgSessionDuration: "2m 34s" // Placeholder - would need session tracking
      },
      topCalculators: formattedTopCalcs,
      byCountry: byCountry.map(c => ({ 
        country: c.country || "Unknown", 
        count: c._count.id 
      })),
      byDevice: byDevice.map(d => ({ 
        device: d.device || "Unknown", 
        count: d._count.id 
      })),
      byLanguage: byLanguage.map(l => ({ 
        language: l.language || "en", 
        count: l._count.id 
      })),
      dailyStats: (dailyStats as any[]).map(d => ({
        date: d.date,
        views: Number(d.views),
        calculations: Number(d.calculations)
      })),
      recentActivity
    });
  } catch (error) {
    console.error("Analytics error:", error);
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 });
  }
}
