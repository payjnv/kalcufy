// src/app/api/admin/newsletter/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const langNames: Record<string, string> = {
  en: "English", es: "Spanish", pt: "Portuguese", fr: "French", de: "German",
};
const langFlags: Record<string, string> = {
  en: "🇺🇸", es: "🇪🇸", pt: "🇧🇷", fr: "🇫🇷", de: "🇩🇪",
};

// GET - List subscribers with search/filter/pagination + stats
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "all";
    const language = searchParams.get("language") || "all";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");

    // Build where clause
    const where: any = {};
    if (search) {
      where.OR = [
        { email: { contains: search, mode: "insensitive" } },
        { name: { contains: search, mode: "insensitive" } },
      ];
    }
    if (status === "active") where.isActive = true;
    if (status === "inactive") where.isActive = false;
    if (language !== "all") where.language = language;

    // Fetch subscribers + stats in parallel
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const [subscribers, total, totalAll, active, inactive, newThisWeek, newThisMonth, byLanguage] =
      await Promise.all([
        prisma.newsletter.findMany({
          where,
          orderBy: { createdAt: "desc" },
          skip: (page - 1) * limit,
          take: limit,
        }),
        prisma.newsletter.count({ where }),
        prisma.newsletter.count(),
        prisma.newsletter.count({ where: { isActive: true } }),
        prisma.newsletter.count({ where: { isActive: false } }),
        prisma.newsletter.count({ where: { createdAt: { gte: weekAgo } } }),
        prisma.newsletter.count({ where: { createdAt: { gte: monthAgo } } }),
        prisma.newsletter.groupBy({
          by: ["language"],
          _count: { id: true },
          orderBy: { _count: { id: "desc" } },
        }),
      ]);

    return NextResponse.json({
      subscribers,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
      stats: {
        total: totalAll,
        active,
        inactive,
        newThisWeek,
        newThisMonth,
        byLanguage: byLanguage.map((l) => ({
          language: l.language,
          name: langNames[l.language] || l.language,
          flag: langFlags[l.language] || "🌐",
          count: l._count.id,
        })),
      },
    });
  } catch (error) {
    console.error("Newsletter API error:", error);
    return NextResponse.json({ error: "Failed to fetch subscribers" }, { status: 500 });
  }
}

// POST - Add subscriber manually
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { email, name, language } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }

    const subscriber = await prisma.newsletter.upsert({
      where: { email: email.toLowerCase().trim() },
      update: { name, language: language || "en", isActive: true, source: "admin" },
      create: {
        email: email.toLowerCase().trim(),
        name: name || null,
        language: language || "en",
        isActive: true,
        source: "admin",
      },
    });

    return NextResponse.json({ success: true, subscriber });
  } catch (error) {
    console.error("Add subscriber error:", error);
    return NextResponse.json({ error: "Failed to add subscriber" }, { status: 500 });
  }
}

// DELETE - Remove subscriber(s)
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { ids } = await request.json();

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ error: "No IDs provided" }, { status: 400 });
    }

    await prisma.newsletter.deleteMany({
      where: { id: { in: ids } },
    });

    return NextResponse.json({ success: true, deleted: ids.length });
  } catch (error) {
    console.error("Delete subscriber error:", error);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}

// PATCH - Toggle active/inactive
export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id, isActive } = await request.json();

    if (!id) {
      return NextResponse.json({ error: "ID required" }, { status: 400 });
    }

    const updated = await prisma.newsletter.update({
      where: { id },
      data: { isActive },
    });

    return NextResponse.json({ success: true, subscriber: updated });
  } catch (error) {
    console.error("Toggle subscriber error:", error);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}
