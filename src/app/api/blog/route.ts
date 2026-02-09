import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// GET /api/blog - Get published posts (public)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get("locale") || "en";
    const category = searchParams.get("category");
    const limit = parseInt(searchParams.get("limit") || "100");

    const where: any = {
      status: "PUBLISHED",
      publishedAt: { not: null },
    };

    if (category && category !== "all") {
      where.category = { slug: category };
    }

    const posts = await prisma.post.findMany({
      where,
      include: {
        category: true,
        author: {
          select: { name: true, image: true },
        },
      },
      orderBy: { publishedAt: "desc" },
      take: limit,
    });

    // Transform posts to return correct language content
    const transformedPosts = posts.map((post) => {
      let title, excerpt, slug;

      switch (locale) {
        case "es":
          title = post.titleEs || post.titleEn;
          excerpt = post.excerptEs || post.excerptEn;
          slug = post.slugEs || post.slugEn;
          break;
        case "pt":
          title = post.titlePt || post.titleEn;
          excerpt = post.excerptPt || post.excerptEn;
          slug = post.slugPt || post.slugEn;
          break;
        case "fr":
          title = post.titleFr || post.titleEn;
          excerpt = post.excerptFr || post.excerptEn;
          slug = post.slugFr || post.slugEn;
          break;
        case "de":
          title = post.titleDe || post.titleEn;
          excerpt = post.excerptDe || post.excerptEn;
          slug = post.slugDe || post.slugEn;
          break;
        default:
          title = post.titleEn;
          excerpt = post.excerptEn;
          slug = post.slugEn;
      }

      return {
        id: post.id,
        slug,
        title,
        excerpt,
        featuredImage: post.featuredImage,
        category: post.category,
        tags: post.tags,
        publishedAt: post.publishedAt?.toISOString(),
        readingTime: post.readingTime,
        author: post.author,
      };
    });

    return NextResponse.json({ posts: transformedPosts });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
