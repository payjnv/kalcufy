import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// GET /api/admin/blog/categories - List all categories
export async function GET(request: NextRequest) {
  try {
    const categories = await prisma.blogCategory.findMany({
      orderBy: { sortOrder: "asc" },
      include: {
        _count: {
          select: { posts: true },
        },
      },
    });

    return NextResponse.json({ categories });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST /api/admin/blog/categories - Create new category
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    if (!body.nameEn || !body.slug) {
      return NextResponse.json(
        { error: "Name and slug are required" },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const existingCategory = await prisma.blogCategory.findUnique({
      where: { slug: body.slug },
    });

    if (existingCategory) {
      return NextResponse.json(
        { error: "A category with this slug already exists" },
        { status: 400 }
      );
    }

    // Get the highest sort order
    const lastCategory = await prisma.blogCategory.findFirst({
      orderBy: { sortOrder: "desc" },
    });

    const category = await prisma.blogCategory.create({
      data: {
        slug: body.slug,
        nameEn: body.nameEn,
        nameEs: body.nameEs || null,
        namePt: body.namePt || null,
        icon: body.icon || "💰",
        color: body.color || "blue",
        isActive: body.isActive ?? true,
        sortOrder: body.sortOrder ?? (lastCategory?.sortOrder || 0) + 1,
      },
      include: {
        _count: {
          select: { posts: true },
        },
      },
    });

    return NextResponse.json({ category }, { status: 201 });
  } catch (error) {
    console.error("Error creating category:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
