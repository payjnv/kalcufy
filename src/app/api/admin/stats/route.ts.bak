import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/db";
import { authOptions } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    // Check admin auth
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Parallel queries for better performance
    const [
      totalUsers,
      proUsers,
      totalCalculations,
      todayCalculations,
      totalViews,
      todayViews,
      newsletterSubscribers,
      unreadMessages,
      recentUsers,
      recentCalculations,
      topCalculators,
    ] = await Promise.all([
      // Total users
      prisma.user.count(),
      
      // PRO users
      prisma.user.count({ where: { isPro: true } }),
      
      // Total calculations
      prisma.calculatorUsage.count({ where: { type: "CALCULATION" } }),
      
      // Today's calculations
      prisma.calculatorUsage.count({
        where: {
          type: "CALCULATION",
          createdAt: { gte: today },
        },
      }),
      
      // Total views
      prisma.calculatorUsage.count({ where: { type: "VIEW" } }),
      
      // Today's views
      prisma.calculatorUsage.count({
        where: {
          type: "VIEW",
          createdAt: { gte: today },
        },
      }),
      
      // Newsletter subscribers
      prisma.newsletter.count({ where: { isActive: true } }),
      
      // Unread messages
      prisma.contactMessage.count({ where: { read: false } }),
      
      // Recent users
      prisma.user.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
          isPro: true,
          createdAt: true,
        },
      }),
      
      // Recent calculations (from history)
      prisma.calculatorHistory.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: {
          user: {
            select: { email: true, name: true },
          },
        },
      }),
      
      // Top calculators by views
      prisma.calculatorUsage.groupBy({
        by: ["calculatorSlug"],
        _count: true,
        where: { type: "VIEW" },
        orderBy: { _count: { calculatorSlug: "desc" } },
        take: 10,
      }),
    ]);

    return NextResponse.json({
      totalUsers,
      proUsers,
      totalCalculations,
      todayCalculations,
      totalViews,
      todayViews,
      newsletterSubscribers,
      unreadMessages,
      recentUsers,
      recentCalculations,
      topCalculators: topCalculators.map((t) => ({
        calculatorSlug: t.calculatorSlug,
        _count: t._count,
      })),
    });
  } catch (error) {
    console.error("Stats error:", error);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
