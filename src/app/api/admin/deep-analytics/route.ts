// src/app/api/admin/deep-analytics/route.ts
// ═══════════════════════════════════════════════════════════════
// DEEP ANALYTICS ENTERPRISE — ONE API TO RULE THEM ALL
// Replaces: /api/admin/analytics + /api/admin/calculator-usage + /api/admin/stats
// 5 tabs: overview | realtime | geographic | calculators | audience
// ═══════════════════════════════════════════════════════════════
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// ── HELPERS ──
const pct = (curr: number, prev: number) => {
  if (prev === 0) return curr > 0 ? 100 : 0;
  return Math.round(((curr - prev) / prev) * 100 * 10) / 10;
};

const COUNTRY_FLAGS: Record<string, string> = {
  "United States": "🇺🇸", "Canada": "🇨🇦", "Mexico": "🇲🇽",
  "Brazil": "🇧🇷", "Argentina": "🇦🇷", "Colombia": "🇨🇴",
  "Chile": "🇨🇱", "Peru": "🇵🇪", "Venezuela": "🇻🇪",
  "Ecuador": "🇪🇨", "Uruguay": "🇺🇾", "Paraguay": "🇵🇾",
  "Bolivia": "🇧🇴", "Costa Rica": "🇨🇷", "Panama": "🇵🇦",
  "Dominican Republic": "🇩🇴", "Guatemala": "🇬🇹", "Honduras": "🇭🇳",
  "El Salvador": "🇸🇻", "Nicaragua": "🇳🇮", "Cuba": "🇨🇺",
  "Puerto Rico": "🇵🇷", "Trinidad and Tobago": "🇹🇹",
  "United Kingdom": "🇬🇧", "Germany": "🇩🇪", "France": "🇫🇷",
  "Spain": "🇪🇸", "Italy": "🇮🇹", "Portugal": "🇵🇹",
  "Netherlands": "🇳🇱", "Belgium": "🇧🇪", "Switzerland": "🇨🇭",
  "Sweden": "🇸🇪", "Norway": "🇳🇴", "Denmark": "🇩🇰",
  "Finland": "🇫🇮", "Ireland": "🇮🇪", "Poland": "🇵🇱",
  "Austria": "🇦🇹", "Czech Republic": "🇨🇿", "Romania": "🇷🇴",
  "Greece": "🇬🇷", "Hungary": "🇭🇺",
  "Russia": "🇷🇺", "Ukraine": "🇺🇦", "Turkey": "🇹🇷",
  "China": "🇨🇳", "Japan": "🇯🇵", "South Korea": "🇰🇷",
  "India": "🇮🇳", "Indonesia": "🇮🇩", "Thailand": "🇹🇭",
  "Vietnam": "🇻🇳", "Philippines": "🇵🇭", "Malaysia": "🇲🇾",
  "Singapore": "🇸🇬", "Taiwan": "🇹🇼", "Pakistan": "🇵🇰",
  "Bangladesh": "🇧🇩", "Sri Lanka": "🇱🇰",
  "Australia": "🇦🇺", "New Zealand": "🇳🇿",
  "South Africa": "🇿🇦", "Nigeria": "🇳🇬", "Egypt": "🇪🇬",
  "Kenya": "🇰🇪", "Ghana": "🇬🇭", "Morocco": "🇲🇦",
  "Saudi Arabia": "🇸🇦", "UAE": "🇦🇪", "Israel": "🇮🇱",
  "Qatar": "🇶🇦", "Kuwait": "🇰🇼",
};

const LANG_META: Record<string, { name: string; flag: string }> = {
  en: { name: "English", flag: "🇺🇸" },
  es: { name: "Spanish", flag: "🇪🇸" },
  pt: { name: "Portuguese", flag: "🇧🇷" },
  fr: { name: "French", flag: "🇫🇷" },
  de: { name: "German", flag: "🇩🇪" },
};

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || (session.user as any).role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const tab = searchParams.get("tab") || "overview";
    const range = searchParams.get("range") || "30d";

    // ── DATE RANGES ──
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    let startDate = new Date();
    let prevStart = new Date();

    const daysMap: Record<string, number> = { today: 0, "7d": 7, "30d": 30, "90d": 90 };
    const days = daysMap[range] ?? 30;

    if (range === "today") {
      startDate = new Date(todayStart);
      prevStart = new Date(todayStart);
      prevStart.setDate(prevStart.getDate() - 1);
    } else {
      startDate = new Date(now.getTime() - days * 86400000);
      prevStart = new Date(startDate.getTime() - days * 86400000);
    }
    const prevEnd = new Date(startDate);

    const baseW = { createdAt: { gte: startDate } };
    const prevW = { createdAt: { gte: prevStart, lt: prevEnd } };

    // ═══════════════════════════════════════
    // TAB: OVERVIEW
    // ═══════════════════════════════════════
    if (tab === "overview") {
      const [
        totalViews, totalCalcs, prevViews, prevCalcs,
        uniqueSessions, prevUniqueSessions,
        todayViews, todayCalcs,
        dailyStats, hourlyStats,
        sessionViewCounts,
        countryCount,
        totalAllTime,
      ] = await Promise.all([
        prisma.calculatorUsage.count({ where: { ...baseW, type: "VIEW" } }),
        prisma.calculatorUsage.count({ where: { ...baseW, type: "CALCULATION" } }),
        prisma.calculatorUsage.count({ where: { ...prevW, type: "VIEW" } }),
        prisma.calculatorUsage.count({ where: { ...prevW, type: "CALCULATION" } }),
        prisma.calculatorUsage.groupBy({ by: ["sessionId"], where: { ...baseW, sessionId: { not: null } } }).then(r => r.length),
        prisma.calculatorUsage.groupBy({ by: ["sessionId"], where: { ...prevW, sessionId: { not: null } } }).then(r => r.length),
        prisma.calculatorUsage.count({ where: { type: "VIEW", createdAt: { gte: todayStart } } }),
        prisma.calculatorUsage.count({ where: { type: "CALCULATION", createdAt: { gte: todayStart } } }),
        // Daily trend
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
        // Hourly distribution
        prisma.$queryRaw`
          SELECT EXTRACT(HOUR FROM "createdAt") as hour, COUNT(*) as count
          FROM calculator_usage
          WHERE "createdAt" >= ${startDate} AND type = 'VIEW'
          GROUP BY EXTRACT(HOUR FROM "createdAt")
          ORDER BY hour ASC
        `,
        // Session view counts for bounce rate
        prisma.calculatorUsage.groupBy({
          by: ["sessionId"],
          where: { ...baseW, type: "VIEW", sessionId: { not: null } },
          _count: true,
        }),
        // Active countries
        prisma.calculatorUsage.groupBy({
          by: ["country"],
          where: { ...baseW, country: { not: null } },
        }).then(r => r.length),
        // All time total
        prisma.calculatorUsage.count(),
      ]);

      const convRate = totalViews > 0 ? parseFloat(((totalCalcs / totalViews) * 100).toFixed(1)) : 0;
      const prevConv = prevViews > 0 ? parseFloat(((prevCalcs / prevViews) * 100).toFixed(1)) : 0;
      const singleView = sessionViewCounts.filter(s => s._count === 1).length;
      const bounceRate = sessionViewCounts.length > 0 ? Math.round((singleView / sessionViewCounts.length) * 100) : 0;

      // Avg calcs per session
      const calcSessions = await prisma.calculatorUsage.groupBy({
        by: ["sessionId"],
        where: { ...baseW, type: "CALCULATION", sessionId: { not: null } },
        _count: true,
      });
      const avgCalcsPerSession = calcSessions.length > 0
        ? (calcSessions.reduce((s, x) => s + x._count, 0) / calcSessions.length).toFixed(1)
        : "0";

      // Hourly array (0-23)
      const hourly = Array.from({ length: 24 }, (_, i) => {
        const found = (hourlyStats as any[]).find(h => Number(h.hour) === i);
        return { hour: i, count: found ? Number(found.count) : 0 };
      });

      return NextResponse.json({
        stats: {
          totalViews, totalCalcs, uniqueSessions, conversionRate: convRate,
          todayViews, todayCalcs,
          viewsChange: pct(totalViews, prevViews),
          calcsChange: pct(totalCalcs, prevCalcs),
          sessionsChange: pct(uniqueSessions, prevUniqueSessions),
          conversionChange: parseFloat((convRate - prevConv).toFixed(1)),
          totalAllTime,
        },
        dailyTrend: (dailyStats as any[]).map(d => ({
          date: new Date(d.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
          views: Number(d.views),
          calcs: Number(d.calculations),
          sessions: Number(d.sessions),
        })),
        hourly,
        bottom: { bounceRate, activeCountries: countryCount, calcsPerSession: avgCalcsPerSession },
      });
    }

    // ═══════════════════════════════════════
    // TAB: REALTIME
    // ═══════════════════════════════════════
    if (tab === "realtime") {
      const fiveMinAgo = new Date(now.getTime() - 5 * 60 * 1000);
      const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);

      const [activeNow, lastHourViews, lastHourCalcs, recentEvents, minuteRaw] = await Promise.all([
        prisma.calculatorUsage.groupBy({
          by: ["sessionId"],
          where: { createdAt: { gte: fiveMinAgo }, sessionId: { not: null } },
        }).then(r => r.length),
        prisma.calculatorUsage.count({ where: { type: "VIEW", createdAt: { gte: oneHourAgo } } }),
        prisma.calculatorUsage.count({ where: { type: "CALCULATION", createdAt: { gte: oneHourAgo } } }),
        prisma.calculatorUsage.findMany({
          where: { createdAt: { gte: oneHourAgo } },
          orderBy: { createdAt: "desc" },
          take: 50,
          select: { calculatorSlug: true, type: true, country: true, device: true, language: true, createdAt: true },
        }),
        prisma.$queryRaw`
          SELECT DATE_TRUNC('minute', "createdAt") as minute, COUNT(*) as count
          FROM calculator_usage
          WHERE "createdAt" >= ${oneHourAgo}
          GROUP BY DATE_TRUNC('minute', "createdAt")
          ORDER BY minute ASC
        `,
      ]);

      return NextResponse.json({
        activeNow,
        lastHourViews,
        lastHourCalcs,
        recentEvents: recentEvents.map(e => ({
          ...e,
          flag: COUNTRY_FLAGS[e.country || ""] || "🌍",
          createdAt: (e.createdAt as Date).toISOString(),
        })),
        minuteTrend: (minuteRaw as any[]).map(m => ({
          time: new Date(m.minute).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
          count: Number(m.count),
        })),
      });
    }

    // ═══════════════════════════════════════
    // TAB: GEOGRAPHIC (with city-level dots)
    // ═══════════════════════════════════════
    if (tab === "geographic") {
      const [byCountry, byLanguage, byDevice] = await Promise.all([
        prisma.calculatorUsage.groupBy({
          by: ["country"],
          where: { ...baseW, country: { not: null } },
          _count: { id: true },
          orderBy: { _count: { id: "desc" } },
          take: 25,
        }),
        prisma.calculatorUsage.groupBy({
          by: ["language"],
          where: baseW,
          _count: { id: true },
          orderBy: { _count: { id: "desc" } },
        }),
        prisma.calculatorUsage.groupBy({
          by: ["device"],
          where: { ...baseW, device: { not: null } },
          _count: { id: true },
          orderBy: { _count: { id: "desc" } },
        }),
      ]);

      // 🆕 City-level dots for the map
      let cityDots: Array<{
        city: string; region: string | null; country: string | null;
        lat: number; lng: number; count: number;
      }> = [];

      try {
        const rawCityDots = await prisma.$queryRaw<Array<{
          city: string; region: string | null; country: string | null;
          lat: number; lng: number; count: bigint;
        }>>`
          SELECT 
            city,
            region,
            country,
            AVG(latitude)::float as lat,
            AVG(longitude)::float as lng,
            COUNT(*)::bigint as count
          FROM calculator_usage
          WHERE created_at >= ${dateFrom}
            AND city IS NOT NULL
            AND latitude IS NOT NULL
            AND longitude IS NOT NULL
          GROUP BY city, region, country
          ORDER BY count DESC
          LIMIT 200
        `;
        cityDots = rawCityDots.map(d => ({
          city: d.city,
          region: d.region,
          country: d.country,
          lat: Number(d.lat),
          lng: Number(d.lng),
          count: Number(d.count),
        }));
      } catch (e) {
        // If city columns don't exist yet (pre-migration), return empty
        console.warn("cityDots query failed (fields may not exist yet):", e);
      }

      const totalC = byCountry.reduce((s, c) => s + c._count.id, 0);
      const totalL = byLanguage.reduce((s, l) => s + l._count.id, 0);
      const totalD = byDevice.reduce((s, d) => s + d._count.id, 0);

      return NextResponse.json({
        countries: byCountry.map(c => ({
          country: c.country || "Unknown",
          flag: COUNTRY_FLAGS[c.country || ""] || "🌍",
          count: c._count.id,
          pct: totalC > 0 ? parseFloat(((c._count.id / totalC) * 100).toFixed(1)) : 0,
        })),
        cityDots,  // 🆕 Array of { city, region, country, lat, lng, count }
        languages: byLanguage.map(l => ({
          code: l.language,
          name: LANG_META[l.language]?.name || l.language,
          flag: LANG_META[l.language]?.flag || "🌐",
          count: l._count.id,
          pct: totalL > 0 ? parseFloat(((l._count.id / totalL) * 100).toFixed(1)) : 0,
        })),
        devices: byDevice.map(d => ({
          device: d.device || "Unknown",
          count: d._count.id,
          pct: totalD > 0 ? parseFloat(((d._count.id / totalD) * 100).toFixed(1)) : 0,
        })),
      });
    }

    // ═══════════════════════════════════════
    // TAB: CALCULATORS
    // ═══════════════════════════════════════
    if (tab === "calculators") {
      const topCalcs = await prisma.$queryRaw`
        SELECT
          "calculatorSlug" as slug,
          COUNT(*) as total,
          COUNT(*) FILTER (WHERE type = 'VIEW') as views,
          COUNT(*) FILTER (WHERE type = 'CALCULATION') as calculations
        FROM calculator_usage
        WHERE "createdAt" >= ${startDate}
        GROUP BY "calculatorSlug"
        ORDER BY views DESC
        LIMIT 30
      `;

      // Get daily trend for TOP calculator (for sparkline)
      const formatted = (topCalcs as any[]).map(c => {
        const v = Number(c.views);
        const calc = Number(c.calculations);
        return {
          slug: c.slug,
          total: Number(c.total),
          views: v,
          calcs: calc,
          conversionRate: v > 0 ? parseFloat(((calc / v) * 100).toFixed(1)) : 0,
        };
      });

      // Category-level breakdown via subcategory → category
      const categoryMap: Record<string, string> = {};
      try {
        const catAssignments = await prisma.calculatorStatus.findMany({
          where: { subcategoryId: { not: null } },
          select: { slug: true, subcategory: { select: { category: { select: { nameEn: true } } } } },
        });
        catAssignments.forEach((ca: any) => {
          if (ca.subcategory?.category?.nameEn) categoryMap[ca.slug] = ca.subcategory.category.nameEn;
        });
      } catch { /* relation may not exist */ }

      const withCategory = formatted.map(c => ({
        ...c,
        category: categoryMap[c.slug] || "Uncategorized",
      }));

      // Category aggregate
      const catAgg: Record<string, { views: number; calcs: number }> = {};
      withCategory.forEach(c => {
        if (!catAgg[c.category]) catAgg[c.category] = { views: 0, calcs: 0 };
        catAgg[c.category].views += c.views;
        catAgg[c.category].calcs += c.calcs;
      });

      return NextResponse.json({
        calculators: withCategory,
        byCategory: Object.entries(catAgg)
          .map(([cat, data]) => ({ category: cat, ...data, conversion: data.views > 0 ? parseFloat(((data.calcs / data.views) * 100).toFixed(1)) : 0 }))
          .sort((a, b) => b.views - a.views),
      });
    }

    // ═══════════════════════════════════════
    // TAB: AUDIENCE
    // ═══════════════════════════════════════
    if (tab === "audience") {
      const [
        totalUsers, proUsers, newUsers, prevNewUsers,
        totalSubs, subsByLang,
        recentUsers, unreadMessages,
        userGrowthRaw,
      ] = await Promise.all([
        prisma.user.count(),
        prisma.user.count({ where: { isPro: true } }),
        prisma.user.count({ where: { createdAt: { gte: startDate } } }),
        prisma.user.count({ where: { createdAt: { gte: prevStart, lt: prevEnd } } }),
        prisma.newsletter.count({ where: { isActive: true } }).catch(() => 0),
        prisma.newsletter.groupBy({
          by: ["language"],
          where: { isActive: true },
          _count: { id: true },
          orderBy: { _count: { id: "desc" } },
        }).catch(() => []),
        prisma.user.findMany({
          take: 10,
          orderBy: { createdAt: "desc" },
          select: { id: true, name: true, email: true, image: true, isPro: true, createdAt: true },
        }),
        prisma.contactMessage.count({ where: { read: false } }).catch(() => 0),
        prisma.$queryRaw`
          SELECT DATE("createdAt") as date, COUNT(*) as count
          FROM users
          WHERE "createdAt" >= ${startDate}
          GROUP BY DATE("createdAt")
          ORDER BY date ASC
        `.catch(() => []),
      ]);

      // Blog stats
      let blogStats = { totalPosts: 0, totalViews: 0 };
      try {
        const [postCount, viewSum] = await Promise.all([
          prisma.post.count({ where: { status: "PUBLISHED" } }),
          prisma.post.aggregate({ _sum: { views: true } }),
        ]);
        blogStats = { totalPosts: postCount, totalViews: viewSum._sum.views || 0 };
      } catch { /* post model might differ */ }

      const monthlyRevenue = parseFloat((proUsers * 2.99).toFixed(2));

      return NextResponse.json({
        totalUsers, proUsers, newUsers,
        newUsersChange: pct(newUsers, prevNewUsers),
        totalSubscribers: totalSubs,
        subscribersByLang: (subsByLang as any[]).map((s: any) => ({
          code: s.language,
          name: LANG_META[s.language]?.name || s.language,
          flag: LANG_META[s.language]?.flag || "🌐",
          count: s._count?.id || s._count || 0,
        })),
        recentUsers: recentUsers.map(u => ({
          ...u, createdAt: u.createdAt.toISOString(),
        })),
        unreadMessages,
        blog: blogStats,
        monthlyRevenue,
        userGrowth: (userGrowthRaw as any[]).map((d: any) => ({
          date: new Date(d.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
          count: Number(d.count),
        })),
      });
    }

    return NextResponse.json({ error: "Unknown tab" }, { status: 400 });
  } catch (error) {
    console.error("Deep analytics error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
