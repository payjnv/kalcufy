import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// GET /api/admin/blog - List all posts
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    // Check authentication
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check admin role
    if ((session.user as any).role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden: Admin access required" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const category = searchParams.get("category");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");

    const where: any = {};

    if (status && status !== "all") {
      where.status = status;
    }

    if (category && category !== "all") {
      where.category = {
        slug: category,
      };
    }

    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where,
        include: {
          category: true,
          author: {
            select: { name: true, image: true },
          },
        },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.post.count({ where }),
    ]);

    // Calculate stats
    const [published, drafts, scheduled, totalViews] = await Promise.all([
      prisma.post.count({ where: { status: "PUBLISHED" } }),
      prisma.post.count({ where: { status: "DRAFT" } }),
      prisma.post.count({ where: { status: "SCHEDULED" } }),
      prisma.post.aggregate({ _sum: { views: true } }),
    ]);

    return NextResponse.json({
      posts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
      stats: {
        total,
        published,
        drafts,
        scheduled,
        totalViews: totalViews._sum.views || 0,
      },
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST /api/admin/blog - Create new post
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    // Check authentication
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check admin role
    if ((session.user as any).role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden: Admin access required" }, { status: 403 });
    }

    const body = await request.json();

    // Validate required fields
    if (!body.titleEn || !body.slugEn || !body.contentEn) {
      return NextResponse.json(
        { error: "Title, slug, and content in English are required" },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const existingPost = await prisma.post.findUnique({
      where: { slugEn: body.slugEn },
    });

    if (existingPost) {
      return NextResponse.json(
        { error: "A post with this slug already exists" },
        { status: 400 }
      );
    }

    const post = await prisma.post.create({
      data: {
        titleEn: body.titleEn,
        titleEs: body.titleEs || null,
        titlePt: body.titlePt || null,
        slugEn: body.slugEn,
        slugEs: body.slugEs || null,
        slugPt: body.slugPt || null,
        excerptEn: body.excerptEn || null,
        excerptEs: body.excerptEs || null,
        excerptPt: body.excerptPt || null,
        contentEn: body.contentEn,
        contentEs: body.contentEs || null,
        contentPt: body.contentPt || null,
        metaTitleEn: body.metaTitleEn || null,
        metaTitleEs: body.metaTitleEs || null,
        metaTitlePt: body.metaTitlePt || null,
        metaDescriptionEn: body.metaDescriptionEn || null,
        metaDescriptionEs: body.metaDescriptionEs || null,
        metaDescriptionPt: body.metaDescriptionPt || null,
        featuredImage: body.featuredImage || null,
        ogImage: body.ogImage || null,
        categoryId: body.categoryId || null,
        tags: body.tags || [],
        relatedCalculator: body.relatedCalculator || null,
        status: body.status || "DRAFT",
        scheduledAt: body.scheduledAt ? new Date(body.scheduledAt) : null,
        publishedAt: body.status === "PUBLISHED" ? new Date() : null,
        readingTime: body.readingTime || 5,
        authorId: (session.user as any).id,
      },
      include: {
        category: true,
        author: {
          select: { name: true, image: true },
        },
      },
    });

    return NextResponse.json({ post }, { status: 201 });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
