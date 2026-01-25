import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// GET /api/blog/categories - Get active categories (public)
export async function GET() {
  try {
    const categories = await prisma.blogCategory.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
      select: {
        id: true,
        slug: true,
        nameEn: true,
        nameEs: true,
        namePt: true,
        icon: true,
        color: true,
      },
    });

    return NextResponse.json({ categories });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
