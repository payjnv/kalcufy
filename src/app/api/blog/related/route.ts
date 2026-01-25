import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

// ============================================================================
// GET /api/blog/related - Get related blog posts
// ============================================================================
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const tags = searchParams.get("tags")?.split(",").filter(Boolean) || [];
    const calculator = searchParams.get("calculator");
    const limit = Math.min(parseInt(searchParams.get("limit") || "3"), 10);
    const locale = searchParams.get("locale") || "en";

    // Build where clause
    const whereClause: Record<string, unknown> = {
      published: true,
      locale: locale,
    };

    // If tags provided, filter by tags
    if (tags.length > 0) {
      whereClause.tags = {
        hasSome: tags,
      };
    }

    // If calculator provided, search in content or tags
    if (calculator) {
      const calcName = calculator.replace(/-calculator$/, "").replace(/-/g, " ");
      whereClause.OR = [
        { tags: { has: calculator } },
        { tags: { has: calcName } },
        { title: { contains: calcName, mode: "insensitive" } },
      ];
    }

    // Fetch posts
    const posts = await prisma.blogPost.findMany({
      where: whereClause,
      select: {
        id: true,
        slug: true,
        title: true,
        excerpt: true,
        publishedAt: true,
      },
      orderBy: {
        publishedAt: "desc",
      },
      take: limit,
    });

    return NextResponse.json({ posts });
  } catch (error) {
    console.error("Error fetching related posts:", error);
    return NextResponse.json({ posts: [] });
  }
}
