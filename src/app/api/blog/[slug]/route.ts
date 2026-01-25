import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// GET /api/blog/[slug] - Get single post by slug (public)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get("locale") || "en";

    // Find post by any slug (en, es, or pt)
    const post = await prisma.post.findFirst({
      where: {
        OR: [
          { slugEn: slug },
          { slugEs: slug },
          { slugPt: slug },
        ],
        status: "PUBLISHED",
      },
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

    // Increment views
    await prisma.post.update({
      where: { id: post.id },
      data: { views: { increment: 1 } },
    });

    // Transform post to return correct language content
    let title = post.titleEn;
    let excerpt = post.excerptEn;
    let content = post.contentEn;
    let metaTitle = post.metaTitleEn;
    let metaDescription = post.metaDescriptionEn;
    let currentSlug = post.slugEn;

    if (locale === "es") {
      title = post.titleEs || post.titleEn;
      excerpt = post.excerptEs || post.excerptEn;
      content = post.contentEs || post.contentEn;
      metaTitle = post.metaTitleEs || post.metaTitleEn;
      metaDescription = post.metaDescriptionEs || post.metaDescriptionEn;
      currentSlug = post.slugEs || post.slugEn;
    } else if (locale === "pt") {
      title = post.titlePt || post.titleEn;
      excerpt = post.excerptPt || post.excerptEn;
      content = post.contentPt || post.contentEn;
      metaTitle = post.metaTitlePt || post.metaTitleEn;
      metaDescription = post.metaDescriptionPt || post.metaDescriptionEn;
      currentSlug = post.slugPt || post.slugEn;
    }

    // Get alternate language slugs for hreflang
    const alternates = {
      en: post.slugEn,
      es: post.slugEs || post.slugEn,
      pt: post.slugPt || post.slugEn,
    };

    const transformedPost = {
      id: post.id,
      slug: currentSlug,
      title,
      excerpt,
      content,
      featuredImage: post.featuredImage,
      ogImage: post.ogImage,
      category: post.category,
      tags: post.tags,
      relatedCalculator: post.relatedCalculator,
      publishedAt: post.publishedAt?.toISOString(),
      readingTime: post.readingTime,
      views: post.views,
      author: post.author,
      seo: {
        metaTitle: metaTitle || title,
        metaDescription: metaDescription || excerpt,
      },
      alternates,
    };

    return NextResponse.json({ post: transformedPost });
  } catch (error) {
    console.error("Error fetching post:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
