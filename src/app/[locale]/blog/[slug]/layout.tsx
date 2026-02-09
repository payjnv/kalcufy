import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://kalcufy.com";

type SlugField = "slugEn" | "slugEs" | "slugPt" | "slugFr" | "slugDe";
type TitleField = "titleEn" | "titleEs" | "titlePt" | "titleFr" | "titleDe";
type ExcerptField = "excerptEn" | "excerptEs" | "excerptPt" | "excerptFr" | "excerptDe";

const localeToSlugField: Record<string, SlugField> = {
  en: "slugEn", es: "slugEs", pt: "slugPt", fr: "slugFr", de: "slugDe",
};
const localeToTitleField: Record<string, TitleField> = {
  en: "titleEn", es: "titleEs", pt: "titlePt", fr: "titleFr", de: "titleDe",
};
const localeToExcerptField: Record<string, ExcerptField> = {
  en: "excerptEn", es: "excerptEs", pt: "excerptPt", fr: "excerptFr", de: "excerptDe",
};

async function getPostBySlug(slug: string, locale: string) {
  try {
    const slugField = localeToSlugField[locale] || "slugEn";
    const post = await prisma.post.findFirst({
      where: { [slugField]: slug, status: "PUBLISHED" },
      select: {
        slugEn: true, slugEs: true, slugPt: true, slugFr: true, slugDe: true,
        titleEn: true, titleEs: true, titlePt: true, titleFr: true, titleDe: true,
        excerptEn: true, excerptEs: true, excerptPt: true, excerptFr: true, excerptDe: true,
        metaTitleEn: true, metaTitleEs: true, metaTitlePt: true, metaTitleFr: true, metaTitleDe: true,
        metaDescriptionEn: true, metaDescriptionEs: true, metaDescriptionPt: true, metaDescriptionFr: true, metaDescriptionDe: true,
        featuredImage: true, ogImage: true,
        publishedAt: true, updatedAt: true,
        readingTime: true,
        author: { select: { name: true, image: true } },
        category: { select: { nameEn: true, slug: true } },
      },
    });
    return post;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getPostBySlug(slug, locale);
  if (!post) return { title: "Article Not Found" };

  const titleField = `metaTitle${locale.charAt(0).toUpperCase() + locale.slice(1)}` as keyof typeof post;
  const descField = `metaDescription${locale.charAt(0).toUpperCase() + locale.slice(1)}` as keyof typeof post;
  const localeTitleField = localeToTitleField[locale] || "titleEn";
  const localeExcerptField = localeToExcerptField[locale] || "excerptEn";

  const title = (post[titleField] as string) || (post[localeTitleField] as string) || (post.titleEn as string) || "Blog";
  const description = (post[descField] as string) || (post[localeExcerptField] as string) || (post.excerptEn as string) || "";
  const image = post.ogImage || post.featuredImage;
  const url = `${BASE_URL}/${locale}/blog/${slug}`;

  // Build hreflang alternates
  const languages: Record<string, string> = {};
  if (post.slugEn) languages.en = `${BASE_URL}/en/blog/${post.slugEn}`;
  if (post.slugEs) languages.es = `${BASE_URL}/es/blog/${post.slugEs}`;
  if (post.slugPt) languages.pt = `${BASE_URL}/pt/blog/${post.slugPt}`;
  if (post.slugFr) languages.fr = `${BASE_URL}/fr/blog/${post.slugFr}`;
  if (post.slugDe) languages.de = `${BASE_URL}/de/blog/${post.slugDe}`;

  return {
    title: `${title} | Kalcufy Blog`,
    description,
    alternates: {
      canonical: url,
      languages,
    },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      siteName: "Kalcufy",
      publishedTime: post.publishedAt?.toISOString(),
      modifiedTime: post.updatedAt?.toISOString(),
      authors: post.author?.name ? [post.author.name] : undefined,
      images: image ? [{ url: image, width: 1200, height: 630, alt: title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

// JSON-LD schemas for blog posts
function buildArticleSchema(post: Record<string, unknown>, title: string, description: string, url: string, locale: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url,
    inLanguage: locale,
    datePublished: (post.publishedAt as Date)?.toISOString(),
    dateModified: (post.updatedAt as Date)?.toISOString(),
    author: {
      "@type": "Person",
      name: (post.author as { name: string })?.name || "Kalcufy Team",
    },
    publisher: {
      "@type": "Organization",
      name: "Kalcufy",
      url: "https://kalcufy.com",
      logo: { "@type": "ImageObject", url: "https://kalcufy.com/favicon.png" },
    },
    ...(post.featuredImage && {
      image: { "@type": "ImageObject", url: post.featuredImage },
    }),
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };
}

function buildBreadcrumbSchema(locale: string, title: string, url: string, categoryName?: string) {
  const items = [
    { name: "Home", url: `${BASE_URL}/${locale}` },
    { name: "Blog", url: `${BASE_URL}/${locale}/blog` },
  ];
  if (categoryName) {
    items.push({ name: categoryName, url: `${BASE_URL}/${locale}/blog?category=${categoryName.toLowerCase()}` });
  }
  items.push({ name: title, url });

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export default async function BlogPostLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = await getPostBySlug(slug, locale);

  if (!post) return <>{children}</>;

  const localeTitleField = localeToTitleField[locale] || "titleEn";
  const localeExcerptField = localeToExcerptField[locale] || "excerptEn";
  const title = (post[localeTitleField] as string) || (post.titleEn as string) || "Blog Post";
  const description = (post[localeExcerptField] as string) || (post.excerptEn as string) || "";
  const url = `${BASE_URL}/${locale}/blog/${slug}`;
  const categoryName = (post.category?.nameEn as string) || undefined;

  const schemas = [
    buildArticleSchema(post as unknown as Record<string, unknown>, title, description, url, locale),
    buildBreadcrumbSchema(locale, title, url, categoryName),
  ];

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={`blog-schema-${i}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      {children}
    </>
  );
}
