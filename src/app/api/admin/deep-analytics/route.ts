// src/app/api/admin/deep-analytics/route.ts
// ═══════════════════════════════════════════════════════════════
// DEEP ANALYTICS V3 — GOD MODE DASHBOARD API
// 6 tabs: overview | realtime | geographic | calculators | audience | insights
// New: browser, OS, referrer, duration, city-level geo, funnel analysis
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

    const daysMap: Record<string, number> = { today: 0, "7d": 7, "30d": 30, "90d": 90, "365d": 365 };
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
        avgDuration,
        topReferrers,
        topBrowsers,
        topOS,
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
        // Hourly heatmap
        prisma.$queryRaw`
          SELECT EXTRACT(HOUR FROM "createdAt") as hour, 
                 EXTRACT(DOW FROM "createdAt") as dow,
                 COUNT(*) as count
          FROM calculator_usage
          WHERE "createdAt" >= ${startDate} AND type = 'VIEW'
          GROUP BY EXTRACT(HOUR FROM "createdAt"), EXTRACT(DOW FROM "createdAt")
          ORDER BY dow, hour
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
        // Average duration
        prisma.calculatorUsage.aggregate({
          _avg: { durationSeconds: true },
          where: { ...baseW, durationSeconds: { not: null, gt: 0 } },
        }),
        // Top referrers
        prisma.calculatorUsage.groupBy({
          by: ["referrer"],
          where: { ...baseW, referrer: { not: null } },
          _count: { id: true },
          orderBy: { _count: { id: "desc" } },
          take: 10,
        }),
        // Top browsers
        prisma.calculatorUsage.groupBy({
          by: ["browser"],
          where: { ...baseW, browser: { not: null } },
          _count: { id: true },
          orderBy: { _count: { id: "desc" } },
          take: 6,
        }),
        // Top OS
        prisma.calculatorUsage.groupBy({
          by: ["os"],
          where: { ...baseW, os: { not: null } },
          _count: { id: true },
          orderBy: { _count: { id: "desc" } },
          take: 6,
        }),
      ]);

      const convRate = totalViews > 0 ? parseFloat(((totalCalcs / totalViews) * 100).toFixed(1)) : 0;
      const prevConv = prevViews > 0 ? parseFloat(((prevCalcs / prevViews) * 100).toFixed(1)) : 0;
      const singleView = sessionViewCounts.filter(s => s._count === 1).length;
      const bounceRate = sessionViewCounts.length > 0 ? Math.round((singleView / sessionViewCounts.length) * 100) : 0;

      const avgDur = avgDuration._avg.durationSeconds || 0;
      const avgDurFormatted = avgDur > 0 ? `${Math.floor(avgDur / 60)}:${String(Math.round(avgDur % 60)).padStart(2, "0")}` : "0:00";

      // Hourly heatmap (7 days x 24 hours)
      const heatmap = Array.from({ length: 7 }, () => Array(24).fill(0));
      (hourlyStats as any[]).forEach(h => {
        const dow = Number(h.dow);
        const hour = Number(h.hour);
        heatmap[dow][hour] = Number(h.count);
      });

      const totalBrowsers = topBrowsers.reduce((s, b) => s + b._count.id, 0);
      const totalOS = topOS.reduce((s, o) => s + o._count.id, 0);

      return NextResponse.json({
        stats: {
          totalViews, totalCalcs, uniqueSessions, conversionRate: convRate,
          todayViews, todayCalcs,
          viewsChange: pct(totalViews, prevViews),
          calcsChange: pct(totalCalcs, prevCalcs),
          sessionsChange: pct(uniqueSessions, prevUniqueSessions),
          conversionChange: parseFloat((convRate - prevConv).toFixed(1)),
          totalAllTime,
          avgDuration: avgDurFormatted,
          bounceRate,
        },
        dailyTrend: (dailyStats as any[]).map(d => ({
          date: new Date(d.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
          views: Number(d.views),
          calcs: Number(d.calculations),
          sessions: Number(d.sessions),
        })),
        heatmap,
        referrers: topReferrers.map(r => ({
          source: r.referrer || "Direct",
          count: r._count.id,
        })),
        browsers: topBrowsers.map(b => ({
          name: b.browser || "Unknown",
          count: b._count.id,
          pct: totalBrowsers > 0 ? parseFloat(((b._count.id / totalBrowsers) * 100).toFixed(1)) : 0,
        })),
        operatingSystems: topOS.map(o => ({
          name: o.os || "Unknown",
          count: o._count.id,
          pct: totalOS > 0 ? parseFloat(((o._count.id / totalOS) * 100).toFixed(1)) : 0,
        })),
        bottom: { bounceRate, activeCountries: countryCount },
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
          select: {
            calculatorSlug: true, type: true, country: true, city: true,
            device: true, browser: true, os: true, language: true, referrer: true,
            createdAt: true,
          },
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
          location: [e.city, e.country].filter(Boolean).join(", "),
          createdAt: (e.createdAt as Date).toISOString(),
        })),
        minuteTrend: (minuteRaw as any[]).map(m => ({
          time: new Date(m.minute).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
          count: Number(m.count),
        })),
      });
    }

    // ═══════════════════════════════════════
    // TAB: GEOGRAPHIC
    // ═══════════════════════════════════════
    if (tab === "geographic") {
      const [byCountry, byCity, byLanguage, byDevice, cityDots] = await Promise.all([
        prisma.calculatorUsage.groupBy({
          by: ["country", "countryCode"],
          where: { ...baseW, country: { not: null } },
          _count: { id: true },
          orderBy: { _count: { id: "desc" } },
          take: 25,
        }),
        // Top cities
        prisma.calculatorUsage.groupBy({
          by: ["city", "country"],
          where: { ...baseW, city: { not: null } },
          _count: { id: true },
          orderBy: { _count: { id: "desc" } },
          take: 20,
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
        // City dots for map
        prisma.$queryRaw`
          SELECT 
            city, region, country,
            AVG(latitude)::float as lat,
            AVG(longitude)::float as lng,
            COUNT(*)::int as count
          FROM calculator_usage
          WHERE "createdAt" >= ${startDate}
            AND city IS NOT NULL
            AND latitude IS NOT NULL
            AND longitude IS NOT NULL
          GROUP BY city, region, country
          ORDER BY count DESC
          LIMIT 200
        `.catch(() => []),
      ]);

      const totalC = byCountry.reduce((s, c) => s + c._count.id, 0);
      const totalL = byLanguage.reduce((s, l) => s + l._count.id, 0);
      const totalD = byDevice.reduce((s, d) => s + d._count.id, 0);

      return NextResponse.json({
        countries: byCountry.map(c => ({
          country: c.country || "Unknown",
          code: c.countryCode || "",
          flag: COUNTRY_FLAGS[c.country || ""] || "🌍",
          count: c._count.id,
          pct: totalC > 0 ? parseFloat(((c._count.id / totalC) * 100).toFixed(1)) : 0,
        })),
        cities: byCity.map(c => ({
          city: c.city || "Unknown",
          country: c.country || "",
          flag: COUNTRY_FLAGS[c.country || ""] || "🌍",
          count: c._count.id,
        })),
        cityDots: (cityDots as any[]).map(d => ({
          city: d.city, region: d.region, country: d.country,
          lat: Number(d.lat), lng: Number(d.lng), count: Number(d.count),
        })),
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
      const [topCalcs, topByDuration] = await Promise.all([
        prisma.$queryRaw`
          SELECT
            "calculatorSlug" as slug,
            COUNT(*) as total,
            COUNT(*) FILTER (WHERE type = 'VIEW') as views,
            COUNT(*) FILTER (WHERE type = 'CALCULATION') as calculations,
            AVG(duration_seconds) FILTER (WHERE duration_seconds > 0) as avg_duration
          FROM calculator_usage
          WHERE "createdAt" >= ${startDate}
          GROUP BY "calculatorSlug"
          ORDER BY views DESC
          LIMIT 30
        `,
        // Top by engagement (duration)
        prisma.$queryRaw`
          SELECT
            "calculatorSlug" as slug,
            AVG(duration_seconds)::int as avg_duration,
            COUNT(*) as total
          FROM calculator_usage
          WHERE "createdAt" >= ${startDate}
            AND duration_seconds > 0
            AND duration_seconds < 3600
          GROUP BY "calculatorSlug"
          HAVING COUNT(*) >= 3
          ORDER BY avg_duration DESC
          LIMIT 10
        `,
      ]);

      const formatted = (topCalcs as any[]).map(c => {
        const v = Number(c.views);
        const calc = Number(c.calculations);
        const dur = c.avg_duration ? Number(c.avg_duration) : 0;
        return {
          slug: c.slug,
          total: Number(c.total),
          views: v,
          calcs: calc,
          conversionRate: v > 0 ? parseFloat(((calc / v) * 100).toFixed(1)) : 0,
          avgDuration: dur > 0 ? `${Math.floor(dur / 60)}:${String(Math.round(dur % 60)).padStart(2, "0")}` : "-",
        };
      });

      const mostEngaging = (topByDuration as any[]).map(c => ({
        slug: c.slug,
        avgDuration: `${Math.floor(Number(c.avg_duration) / 60)}:${String(Math.round(Number(c.avg_duration) % 60)).padStart(2, "0")}`,
        total: Number(c.total),
      }));

      return NextResponse.json({
        calculators: formatted,
        mostEngaging,
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

    // ═══════════════════════════════════════
    // TAB: INSIGHTS (NEW — AI-powered)
    // ═══════════════════════════════════════
    if (tab === "insights") {
      const [
        topReferrers,
        browserBreakdown,
        osBreakdown,
        topByConversion,
        lowConversion,
        avgDurationByCalc,
        peakHours,
        growthTrend,
      ] = await Promise.all([
        // Where traffic comes from
        prisma.calculatorUsage.groupBy({
          by: ["referrer"],
          where: { ...baseW, referrer: { not: null } },
          _count: { id: true },
          orderBy: { _count: { id: "desc" } },
          take: 15,
        }),
        // Browser market share
        prisma.calculatorUsage.groupBy({
          by: ["browser"],
          where: { ...baseW, browser: { not: null } },
          _count: { id: true },
          orderBy: { _count: { id: "desc" } },
        }),
        // OS market share
        prisma.calculatorUsage.groupBy({
          by: ["os"],
          where: { ...baseW, os: { not: null } },
          _count: { id: true },
          orderBy: { _count: { id: "desc" } },
        }),
        // Top converting calculators
        prisma.$queryRaw`
          SELECT
            "calculatorSlug" as slug,
            COUNT(*) FILTER (WHERE type = 'VIEW') as views,
            COUNT(*) FILTER (WHERE type = 'CALCULATION') as calcs,
            CASE WHEN COUNT(*) FILTER (WHERE type = 'VIEW') > 0
              THEN ROUND((COUNT(*) FILTER (WHERE type = 'CALCULATION')::numeric / COUNT(*) FILTER (WHERE type = 'VIEW')::numeric) * 100, 1)
              ELSE 0
            END as conversion_rate
          FROM calculator_usage
          WHERE "createdAt" >= ${startDate}
          GROUP BY "calculatorSlug"
          HAVING COUNT(*) FILTER (WHERE type = 'VIEW') >= 5
          ORDER BY conversion_rate DESC
          LIMIT 10
        `,
        // Lowest converting (opportunity)
        prisma.$queryRaw`
          SELECT
            "calculatorSlug" as slug,
            COUNT(*) FILTER (WHERE type = 'VIEW') as views,
            COUNT(*) FILTER (WHERE type = 'CALCULATION') as calcs,
            CASE WHEN COUNT(*) FILTER (WHERE type = 'VIEW') > 0
              THEN ROUND((COUNT(*) FILTER (WHERE type = 'CALCULATION')::numeric / COUNT(*) FILTER (WHERE type = 'VIEW')::numeric) * 100, 1)
              ELSE 0
            END as conversion_rate
          FROM calculator_usage
          WHERE "createdAt" >= ${startDate}
          GROUP BY "calculatorSlug"
          HAVING COUNT(*) FILTER (WHERE type = 'VIEW') >= 5
          ORDER BY conversion_rate ASC
          LIMIT 10
        `,
        // Average time on page by calculator
        prisma.$queryRaw`
          SELECT
            "calculatorSlug" as slug,
            AVG(duration_seconds)::int as avg_seconds,
            COUNT(*) as sample_size
          FROM calculator_usage
          WHERE "createdAt" >= ${startDate}
            AND duration_seconds > 2 AND duration_seconds < 3600
          GROUP BY "calculatorSlug"
          HAVING COUNT(*) >= 3
          ORDER BY avg_seconds DESC
          LIMIT 15
        `,
        // Peak traffic hours
        prisma.$queryRaw`
          SELECT EXTRACT(HOUR FROM "createdAt")::int as hour, COUNT(*)::int as count
          FROM calculator_usage
          WHERE "createdAt" >= ${startDate} AND type = 'VIEW'
          GROUP BY EXTRACT(HOUR FROM "createdAt")
          ORDER BY count DESC
          LIMIT 5
        `,
        // Weekly growth trend
        prisma.$queryRaw`
          SELECT
            DATE_TRUNC('week', "createdAt") as week,
            COUNT(*) FILTER (WHERE type = 'VIEW') as views,
            COUNT(*) FILTER (WHERE type = 'CALCULATION') as calcs
          FROM calculator_usage
          WHERE "createdAt" >= ${new Date(now.getTime() - 90 * 86400000)}
          GROUP BY DATE_TRUNC('week', "createdAt")
          ORDER BY week ASC
        `,
      ]);

      const totalBrowsers = browserBreakdown.reduce((s, b) => s + b._count.id, 0);
      const totalOS = osBreakdown.reduce((s, o) => s + o._count.id, 0);

      return NextResponse.json({
        referrers: topReferrers.map(r => ({
          source: r.referrer || "Direct",
          count: r._count.id,
        })),
        browsers: browserBreakdown.map(b => ({
          name: b.browser || "Unknown",
          count: b._count.id,
          pct: totalBrowsers > 0 ? parseFloat(((b._count.id / totalBrowsers) * 100).toFixed(1)) : 0,
        })),
        operatingSystems: osBreakdown.map(o => ({
          name: o.os || "Unknown",
          count: o._count.id,
          pct: totalOS > 0 ? parseFloat(((o._count.id / totalOS) * 100).toFixed(1)) : 0,
        })),
        topConverting: (topByConversion as any[]).map(c => ({
          slug: c.slug,
          views: Number(c.views),
          calcs: Number(c.calcs),
          rate: Number(c.conversion_rate),
        })),
        lowConverting: (lowConversion as any[]).map(c => ({
          slug: c.slug,
          views: Number(c.views),
          calcs: Number(c.calcs),
          rate: Number(c.conversion_rate),
        })),
        engagement: (avgDurationByCalc as any[]).map(c => ({
          slug: c.slug,
          avgSeconds: Number(c.avg_seconds),
          avgFormatted: `${Math.floor(Number(c.avg_seconds) / 60)}:${String(Math.round(Number(c.avg_seconds) % 60)).padStart(2, "0")}`,
          sampleSize: Number(c.sample_size),
        })),
        peakHours: (peakHours as any[]).map(h => ({
          hour: Number(h.hour),
          label: `${Number(h.hour) % 12 || 12}${Number(h.hour) < 12 ? "am" : "pm"}`,
          count: Number(h.count),
        })),
        growthTrend: (growthTrend as any[]).map(w => ({
          week: new Date(w.week).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
          views: Number(w.views),
          calcs: Number(w.calcs),
        })),
      });
    }

    return NextResponse.json({ error: "Unknown tab" }, { status: 400 });
  } catch (error) {
    console.error("Deep analytics error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
