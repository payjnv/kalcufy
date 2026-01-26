import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/db";
import { authOptions } from "@/lib/auth";

// GET all categories
export async function GET() {
  try {
    const categories = await prisma.calculatorCategory.findMany({
      orderBy: { sortOrder: "asc" },
      include: {
        _count: { select: { calculators: true } },
      },
    });
    return NextResponse.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

// POST create category
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { slug, nameEn, nameEs, namePt, icon, color, description, showInMenu, showInHome, sortOrder } = body;

    if (!slug || !nameEn) {
      return NextResponse.json({ error: "Slug and nameEn are required" }, { status: 400 });
    }

    const category = await prisma.calculatorCategory.create({
      data: {
        slug,
        nameEn,
        nameEs,
        namePt,
        icon,
        color: color || "blue",
        description,
        showInMenu: showInMenu ?? true,
        showInHome: showInHome ?? true,
        sortOrder: sortOrder || 0,
      },
    });

    return NextResponse.json(category);
  } catch (error: any) {
    if (error.code === "P2002") {
      return NextResponse.json({ error: "Category slug already exists" }, { status: 400 });
    }
    console.error("Error creating category:", error);
    return NextResponse.json({ error: "Failed to create" }, { status: 500 });
  }
}
