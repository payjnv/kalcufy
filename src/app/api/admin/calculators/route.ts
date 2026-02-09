// src/app/api/admin/calculators/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { SLUG_REGISTRY } from "@/engine/v4/slugs/registry";

export async function GET(request: NextRequest) {
  try {
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

    // Get status from database (includes subcategoryId and deletedAt)
    const statuses = await prisma.calculatorStatus.findMany();
    const statusMap = new Map(
      statuses.map((s) => [s.slug, { isActive: s.isActive, subcategoryId: s.subcategoryId, deletedAt: s.deletedAt }])
    );

    // Read directly from registry
    const calculators = SLUG_REGISTRY.map((entry) => {
      const slug = entry.slugs.en;
      const name =
        slug
          .replace(/-calculator$/, "")
          .replace(/-/g, " ")
          .replace(/\b\w/g, (l: string) => l.toUpperCase()) + " Calculator";

      const status = statusMap.get(slug);

      return {
        id: entry.id,
        slug: slug,
        name: name,
        category: entry.category,
        isActive: status?.isActive ?? true,
        subcategoryId: status?.subcategoryId || null,
        deletedAt: status?.deletedAt || null,
      };
    });

    return NextResponse.json({
      calculators,
      totals: {
        totalCalculators: calculators.length,
        activeCalculators: calculators.filter((c) => c.isActive).length,
      },
    });
  } catch (error) {
    console.error("Error fetching admin calculators:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
