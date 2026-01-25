import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// GET /api/admin/blog/categories/[id] - Get single category
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const category = await prisma.blogCategory.findUnique({
      where: { id },
      include: {
        _count: {
          select: { posts: true },
        },
      },
    });

    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    return NextResponse.json({ category });
  } catch (error) {
    console.error("Error fetching category:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// PUT /api/admin/blog/categories/[id] - Update category
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check admin role
    if ((session.user as any).role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden: Admin access required" }, { status: 403 });
    }

    const body = await request.json();

    // Check if category exists
    const existingCategory = await prisma.blogCategory.findUnique({
      where: { id },
    });

    if (!existingCategory) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    // Check if new slug conflicts with another category
    if (body.slug && body.slug !== existingCategory.slug) {
      const slugConflict = await prisma.blogCategory.findUnique({
        where: { slug: body.slug },
      });

      if (slugConflict) {
        return NextResponse.json(
          { error: "A category with this slug already exists" },
          { status: 400 }
        );
      }
    }

    const category = await prisma.blogCategory.update({
      where: { id },
      data: {
        slug: body.slug || existingCategory.slug,
        nameEn: body.nameEn || existingCategory.nameEn,
        nameEs: body.nameEs !== undefined ? body.nameEs : existingCategory.nameEs,
        namePt: body.namePt !== undefined ? body.namePt : existingCategory.namePt,
        icon: body.icon || existingCategory.icon,
        color: body.color || existingCategory.color,
        isActive: body.isActive !== undefined ? body.isActive : existingCategory.isActive,
        sortOrder: body.sortOrder !== undefined ? body.sortOrder : existingCategory.sortOrder,
      },
      include: {
        _count: {
          select: { posts: true },
        },
      },
    });

    return NextResponse.json({ category });
  } catch (error) {
    console.error("Error updating category:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// DELETE /api/admin/blog/categories/[id] - Delete category
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check admin role
    if ((session.user as any).role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden: Admin access required" }, { status: 403 });
    }

    // Check if category exists and has posts
    const category = await prisma.blogCategory.findUnique({
      where: { id },
      include: {
        _count: {
          select: { posts: true },
        },
      },
    });

    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    // Prevent deletion if category has posts
    if (category._count.posts > 0) {
      return NextResponse.json(
        { error: `Cannot delete category with ${category._count.posts} posts. Move or delete posts first.` },
        { status: 400 }
      );
    }

    await prisma.blogCategory.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting category:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
