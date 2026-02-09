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

    const now = new Date();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const prevWeek = new Date(weekAgo.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const prevMonth = new Date(monthAgo.getTime() - 30 * 24 * 60 * 60 * 1000);

    const [
      totalUsers,
      proUsers,
      usersThisWeek,
      usersPrevWeek,

      totalViews,
      viewsToday,
      viewsYesterday,
      viewsThisWeek,
      viewsPrevWeek,

      totalCalculations,
      calcsToday,
      calcsYesterday,
      calcsThisWeek,
      calcsPrevWeek,

      newsletterSubscribers,
      unreadMessages,
      activeSubscriptions,
      totalBlogPosts,

      recentUsers,

      topCalculators,

      byCountry,
      byDevice,
      byLanguage,

      dailyStats,

      recentActivity,

      hourlyToday,
    ] = await Promise.all([
      // Users
      prisma.user.count(),
      prisma.user.count({ where: { isPro: true } }),
      prisma.user.count({ where: { createdAt: { gte: weekAgo } } }),
      prisma.user.count({ where: { createdAt: { gte: prevWeek, lt: weekAgo } } }),

      // Views
      prisma.calculatorUsage.count({ where: { type: "VIEW" } }),
      prisma.calculatorUsage.count({ where: { type: "VIEW", createdAt: { gte: today } } }),
      prisma.calculatorUsage.count({ where: { type: "VIEW", createdAt: { gte: yesterday, lt: today } } }),
      prisma.calculatorUsage.count({ where: { type: "VIEW", createdAt: { gte: weekAgo } } }),
      prisma.calculatorUsage.count({ where: { type: "VIEW", createdAt: { gte: prevWeek, lt: weekAgo } } }),

      // Calculations
      prisma.calculatorUsage.count({ where: { type: "CALCULATION" } }),
      prisma.calculatorUsage.count({ where: { type: "CALCULATION", createdAt: { gte: today } } }),
      prisma.calculatorUsage.count({ where: { type: "CALCULATION", createdAt: { gte: yesterday, lt: today } } }),
      prisma.calculatorUsage.count({ where: { type: "CALCULATION", createdAt: { gte: weekAgo } } }),
      prisma.calculatorUsage.count({ where: { type: "CALCULATION", createdAt: { gte: prevWeek, lt: weekAgo } } }),

      // Other counts
      prisma.newsletter.count({ where: { isActive: true } }).catch(() => 0),
      prisma.contactMessage.count({ where: { read: false } }).catch(() => 0),
      prisma.user.count({ where: { isPro: true } }),
      prisma.post.count({ where: { status: "PUBLISHED" } }).catch(() => 0),

      // Recent users
      prisma.user.findMany({
        take: 8,
        orderBy: { createdAt: "desc" },
        select: {
          id: true, name: true, email: true, image: true,
          isPro: true, createdAt: true,
        },
      }),

      // Top calculators (last 30 days)
      prisma.$queryRaw`
        SELECT
          "calculatorSlug" as slug,
          COUNT(*) FILTER (WHERE type = 'VIEW') as views,
          COUNT(*) FILTER (WHERE type = 'CALCULATION') as calculations
        FROM calculator_usage
        WHERE "createdAt" >= ${monthAgo}
        GROUP BY "calculatorSlug"
        ORDER BY views DESC
        LIMIT 10
      `,

      // By country (last 30 days)
      prisma.calculatorUsage.groupBy({
        by: ["country"],
        where: { createdAt: { gte: monthAgo }, country: { not: null } },
        _count: { id: true },
        orderBy: { _count: { id: "desc" } },
        take: 10,
      }),

      // By device
      prisma.calculatorUsage.groupBy({
        by: ["device"],
        where: { createdAt: { gte: monthAgo }, device: { not: null } },
        _count: { id: true },
        orderBy: { _count: { id: "desc" } },
      }),

      // By language
      prisma.calculatorUsage.groupBy({
        by: ["language"],
        where: { createdAt: { gte: monthAgo } },
        _count: { id: true },
        orderBy: { _count: { id: "desc" } },
      }),

      // Daily stats (last 14 days for sparkline)
      prisma.$queryRaw`
        SELECT
          DATE("createdAt") as date,
          COUNT(*) FILTER (WHERE type = 'VIEW') as views,
          COUNT(*) FILTER (WHERE type = 'CALCULATION') as calculations
        FROM calculator_usage
        WHERE "createdAt" >= ${new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000)}
        GROUP BY DATE("createdAt")
        ORDER BY date ASC
      `,

      // Recent activity
      prisma.calculatorUsage.findMany({
        where: { createdAt: { gte: weekAgo } },
        orderBy: { createdAt: "desc" },
        take: 15,
        select: {
          calculatorSlug: true, type: true, country: true,
          device: true, language: true, createdAt: true,
        },
      }),

      // Hourly today
      prisma.$queryRaw`
        SELECT
          EXTRACT(HOUR FROM "createdAt") as hour,
          COUNT(*) as count
        FROM calculator_usage
        WHERE "createdAt" >= ${today}
        GROUP BY EXTRACT(HOUR FROM "createdAt")
        ORDER BY hour ASC
      `,
    ]);

    // Calculate changes
    const viewsWeekChange = viewsPrevWeek > 0
      ? ((viewsThisWeek - viewsPrevWeek) / viewsPrevWeek * 100) : 0;
    const calcsWeekChange = calcsPrevWeek > 0
      ? ((calcsThisWeek - calcsPrevWeek) / calcsPrevWeek * 100) : 0;
    const usersWeekChange = usersPrevWeek > 0
      ? ((usersThisWeek - usersPrevWeek) / usersPrevWeek * 100) : 0;
    const conversionRate = viewsThisWeek > 0
      ? ((calcsThisWeek / viewsThisWeek) * 100) : 0;

    // Country flags
    const countryFlags: Record<string, string> = {
      "United States": "🇺🇸", "Canada": "🇨🇦", "Mexico": "🇲🇽",
      "Brazil": "🇧🇷", "Argentina": "🇦🇷", "Colombia": "🇨🇴",
      "Chile": "🇨🇱", "Peru": "🇵🇪", "Spain": "🇪🇸",
      "United Kingdom": "🇬🇧", "Germany": "🇩🇪", "France": "🇫🇷",
      "Italy": "🇮🇹", "Portugal": "🇵🇹", "India": "🇮🇳",
      "Japan": "🇯🇵", "China": "🇨🇳", "Australia": "🇦🇺",
      "Netherlands": "🇳🇱", "South Korea": "🇰🇷", "Turkey": "🇹🇷",
      "Russia": "🇷🇺", "Indonesia": "🇮🇩", "Thailand": "🇹🇭",
      "Vietnam": "🇻🇳", "Philippines": "🇵🇭", "Malaysia": "🇲🇾",
      "Singapore": "🇸🇬", "UAE": "🇦🇪", "Saudi Arabia": "🇸🇦",
      "South Africa": "🇿🇦", "Nigeria": "🇳🇬", "Egypt": "🇪🇬",
      "Sweden": "🇸🇪", "Norway": "🇳🇴", "Denmark": "🇩🇰",
      "Poland": "🇵🇱", "Switzerland": "🇨🇭", "Ireland": "🇮🇪",
    };

    const langNames: Record<string, string> = {
      en: "English", es: "Spanish", pt: "Portuguese", fr: "French",
    };
    const langFlags: Record<string, string> = {
      en: "🇺🇸", es: "🇪🇸", pt: "🇧🇷", fr: "🇫🇷",
    };

    return NextResponse.json({
      // KPI
      kpi: {
        totalUsers,
        proUsers,
        usersThisWeek,
        usersWeekChange: parseFloat(usersWeekChange.toFixed(1)),

        totalViews,
        viewsToday,
        viewsYesterday,
        viewsThisWeek,
        viewsWeekChange: parseFloat(viewsWeekChange.toFixed(1)),

        totalCalculations,
        calcsToday,
        calcsYesterday,
        calcsThisWeek,
        calcsWeekChange: parseFloat(calcsWeekChange.toFixed(1)),

        conversionRate: parseFloat(conversionRate.toFixed(1)),

        newsletterSubscribers,
        unreadMessages,
        activeSubscriptions,
        totalBlogPosts,
        monthlyRevenue: parseFloat((activeSubscriptions * 2.99).toFixed(2)),
      },

      // Charts
      dailyStats: (dailyStats as any[]).map(d => ({
        date: d.date,
        views: Number(d.views),
        calculations: Number(d.calculations),
      })),
      hourlyToday: (hourlyToday as any[]).map(h => ({
        hour: Number(h.hour),
        count: Number(h.count),
      })),

      // Top calculators
      topCalculators: (topCalculators as any[]).map(c => ({
        slug: c.slug,
        views: Number(c.views),
        calculations: Number(c.calculations),
        conversion: Number(c.views) > 0
          ? parseFloat(((Number(c.calculations) / Number(c.views)) * 100).toFixed(1))
          : 0,
      })),

      // Geo
      byCountry: byCountry.map(c => ({
        country: c.country || "Unknown",
        flag: countryFlags[c.country || ""] || "🌍",
        count: c._count.id,
      })),

      // Device
      byDevice: byDevice.map(d => ({
        device: d.device || "Unknown",
        count: d._count.id,
      })),

      // Language
      byLanguage: byLanguage.map(l => ({
        code: l.language,
        name: langNames[l.language] || l.language,
        flag: langFlags[l.language] || "🌐",
        count: l._count.id,
      })),

      // Recent
      recentUsers: recentUsers.map(u => ({
        ...u,
        createdAt: u.createdAt.toISOString(),
      })),
      recentActivity: recentActivity.map(a => ({
        ...a,
        flag: countryFlags[a.country || ""] || "🌍",
        createdAt: (a.createdAt as Date).toISOString(),
      })),
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}

