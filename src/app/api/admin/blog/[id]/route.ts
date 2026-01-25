import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// GET /api/admin/blog/[id] - Get single post
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        category: true,
        author: {
          select: { name: true, image: true },
        },
      },
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ post });
  } catch (error) {
    console.error("Error fetching post:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// PUT /api/admin/blog/[id] - Update post
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    // Check if post exists
    const existingPost = await prisma.post.findUnique({
      where: { id },
    });

    if (!existingPost) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Check if new slug conflicts with another post
    if (body.slugEn && body.slugEn !== existingPost.slugEn) {
      const slugConflict = await prisma.post.findUnique({
        where: { slugEn: body.slugEn },
      });
      if (slugConflict) {
        return NextResponse.json(
          { error: "A post with this slug already exists" },
          { status: 400 }
        );
      }
    }

    // Determine publishedAt
    let publishedAt = existingPost.publishedAt;
    if (body.status === "PUBLISHED" && !existingPost.publishedAt) {
      publishedAt = new Date();
    } else if (body.status !== "PUBLISHED") {
      publishedAt = null;
    }

    const post = await prisma.post.update({
      where: { id },
      data: {
        titleEn: body.titleEn ?? existingPost.titleEn,
        titleEs: body.titleEs ?? existingPost.titleEs,
        titlePt: body.titlePt ?? existingPost.titlePt,
        slugEn: body.slugEn ?? existingPost.slugEn,
        slugEs: body.slugEs ?? existingPost.slugEs,
        slugPt: body.slugPt ?? existingPost.slugPt,
        excerptEn: body.excerptEn ?? existingPost.excerptEn,
        excerptEs: body.excerptEs ?? existingPost.excerptEs,
        excerptPt: body.excerptPt ?? existingPost.excerptPt,
        contentEn: body.contentEn ?? existingPost.contentEn,
        contentEs: body.contentEs ?? existingPost.contentEs,
        contentPt: body.contentPt ?? existingPost.contentPt,
        metaTitleEn: body.metaTitleEn ?? existingPost.metaTitleEn,
        metaTitleEs: body.metaTitleEs ?? existingPost.metaTitleEs,
        metaTitlePt: body.metaTitlePt ?? existingPost.metaTitlePt,
        metaDescriptionEn: body.metaDescriptionEn ?? existingPost.metaDescriptionEn,
        metaDescriptionEs: body.metaDescriptionEs ?? existingPost.metaDescriptionEs,
        metaDescriptionPt: body.metaDescriptionPt ?? existingPost.metaDescriptionPt,
        featuredImage: body.featuredImage ?? existingPost.featuredImage,
        ogImage: body.ogImage ?? existingPost.ogImage,
        categoryId: body.categoryId ?? existingPost.categoryId,
        tags: body.tags ?? existingPost.tags,
        relatedCalculator: body.relatedCalculator ?? existingPost.relatedCalculator,
        status: body.status ?? existingPost.status,
        scheduledAt: body.scheduledAt ? new Date(body.scheduledAt) : existingPost.scheduledAt,
        publishedAt,
        readingTime: body.readingTime ?? existingPost.readingTime,
      },
      include: {
        category: true,
        author: {
          select: { name: true, image: true },
        },
      },
    });

    return NextResponse.json({ post });
  } catch (error) {
    console.error("Error updating post:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// PATCH /api/admin/blog/[id] - Partial update (e.g., status change)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    const existingPost = await prisma.post.findUnique({
      where: { id },
    });

    if (!existingPost) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Handle status change
    const updateData: any = { ...body };
    if (body.status === "PUBLISHED" && !existingPost.publishedAt) {
      updateData.publishedAt = new Date();
    }

    const post = await prisma.post.update({
      where: { id },
      data: updateData,
      include: {
        category: true,
      },
    });

    return NextResponse.json({ post });
  } catch (error) {
    console.error("Error patching post:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// DELETE /api/admin/blog/[id] - Delete post
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const existingPost = await prisma.post.findUnique({
      where: { id },
    });

    if (!existingPost) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    await prisma.post.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
