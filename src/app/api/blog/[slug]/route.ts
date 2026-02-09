import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// ── Localhost detection ──
function isLocalhost(request: NextRequest): boolean {
  // In Vercel production, never localhost
  const vercelEnv = process.env.VERCEL_ENV;
  if (vercelEnv === "production" || vercelEnv === "preview") return false;

  const host = request.headers.get("host") || "";
  const forwardedFor = request.headers.get("x-forwarded-for") || "";
  const realIp = request.headers.get("x-real-ip") || "";

  const localhostIPs = ["127.0.0.1", "::1", "localhost"];
  const isLocalIP = localhostIPs.some(ip => forwardedFor.includes(ip) || realIp.includes(ip));
  const isLocalHost = host.includes("localhost") || host.includes("127.0.0.1");

  return isLocalIP || isLocalHost;
}

// GET /api/blog/[slug] - Get single post by slug (public)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get("locale") || "en";

    // Find post by any slug (en, es, pt, fr, de)
    const post = await prisma.post.findFirst({
      where: {
        OR: [
          { slugEn: slug },
          { slugEs: slug },
          { slugPt: slug },
          { slugFr: slug },
          { slugDe: slug },
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

    // Increment views ONLY in production (skip localhost)
    if (!isLocalhost(request)) {
      await prisma.post.update({
        where: { id: post.id },
        data: { views: { increment: 1 } },
      });
    }

    // Transform post to return correct language content
    let title, excerpt, content, metaTitle, metaDescription, currentSlug;

    switch (locale) {
      case "es":
        title = post.titleEs || post.titleEn;
        excerpt = post.excerptEs || post.excerptEn;
        content = post.contentEs || post.contentEn;
        metaTitle = post.metaTitleEs || post.metaTitleEn;
        metaDescription = post.metaDescriptionEs || post.metaDescriptionEn;
        currentSlug = post.slugEs || post.slugEn;
        break;
      case "pt":
        title = post.titlePt || post.titleEn;
        excerpt = post.excerptPt || post.excerptEn;
        content = post.contentPt || post.contentEn;
        metaTitle = post.metaTitlePt || post.metaTitleEn;
        metaDescription = post.metaDescriptionPt || post.metaDescriptionEn;
        currentSlug = post.slugPt || post.slugEn;
        break;
      case "fr":
        title = post.titleFr || post.titleEn;
        excerpt = post.excerptFr || post.excerptEn;
        content = post.contentFr || post.contentEn;
        metaTitle = post.metaTitleFr || post.metaTitleEn;
        metaDescription = post.metaDescriptionFr || post.metaDescriptionEn;
        currentSlug = post.slugFr || post.slugEn;
        break;
      case "de":
        title = post.titleDe || post.titleEn;
        excerpt = post.excerptDe || post.excerptEn;
        content = post.contentDe || post.contentEn;
        metaTitle = post.metaTitleDe || post.metaTitleEn;
        metaDescription = post.metaDescriptionDe || post.metaDescriptionEn;
        currentSlug = post.slugDe || post.slugEn;
        break;
      default:
        title = post.titleEn;
        excerpt = post.excerptEn;
        content = post.contentEn;
        metaTitle = post.metaTitleEn;
        metaDescription = post.metaDescriptionEn;
        currentSlug = post.slugEn;
    }

    // Get alternate language slugs for hreflang
    const alternates = {
      en: post.slugEn,
      es: post.slugEs || post.slugEn,
      pt: post.slugPt || post.slugEn,
      fr: post.slugFr || post.slugEn,
      de: post.slugDe || post.slugEn,
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
