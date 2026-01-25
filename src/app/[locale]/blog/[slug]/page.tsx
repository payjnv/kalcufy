"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdBlock from "@/components/ads/AdBlock";
import { isValidCalculator } from "@/lib/valid-calculators";

// ============================================================================
// BLOG POST - ESTILO MAGAZINE
// Hero full-width con título overlay, sidebar derecho sticky
// ============================================================================

interface BlogCategory {
  id: string;
  slug: string;
  nameEn: string;
  nameEs: string | null;
  namePt: string | null;
  icon: string;
  color: string;
}

interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImage: string | null;
  ogImage: string | null;
  category: BlogCategory | null;
  tags: string[];
  publishedAt: string;
  readingTime: number;
  views: number;
  relatedCalculator: string | null;
  author: { name: string; image: string | null } | null;
  seo: { metaTitle: string; metaDescription: string };
  alternates: { en: string; es: string; pt: string };
}

const colorClasses: Record<string, { bg: string; text: string; border: string; gradient: string }> = {
  blue: { bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-200", gradient: "from-blue-600 to-cyan-500" },
  green: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", gradient: "from-emerald-600 to-teal-500" },
  amber: { bg: "bg-amber-50", text: "text-amber-600", border: "border-amber-200", gradient: "from-amber-600 to-orange-500" },
  purple: { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200", gradient: "from-purple-600 to-pink-500" },
  indigo: { bg: "bg-indigo-50", text: "text-indigo-600", border: "border-indigo-200", gradient: "from-indigo-600 to-blue-500" },
  red: { bg: "bg-red-50", text: "text-red-600", border: "border-red-200", gradient: "from-red-600 to-rose-500" },
  cyan: { bg: "bg-cyan-50", text: "text-cyan-600", border: "border-cyan-200", gradient: "from-cyan-600 to-blue-500" },
  pink: { bg: "bg-pink-50", text: "text-pink-600", border: "border-pink-200", gradient: "from-pink-600 to-rose-500" },
};

export default function BlogPostPage() {
  const locale = useLocale();
  const t = useTranslations("blog");
  const params = useParams();
  const slug = params.slug as string;

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [tableOfContents, setTableOfContents] = useState<{ id: string; text: string; level: number }[]>([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/blog/${slug}?locale=${locale}`);
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        const data = await res.json();
        setPost(data.post);
        
        if (data.post?.content) {
          const headings: { id: string; text: string; level: number }[] = [];
          const regex = /^(#{1,3})\s+(.+)$/gm;
          let match;
          while ((match = regex.exec(data.post.content)) !== null) {
            const level = match[1].length;
            const text = match[2];
            const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
            headings.push({ id, text, level });
          }
          setTableOfContents(headings);
        }
      } catch (err) {
        console.error("Error fetching post:", err);
        setError(true);
      }
      setLoading(false);
    };

    if (slug) fetchPost();
  }, [slug, locale]);

  const getCategoryName = (cat: BlogCategory) => {
    if (locale === "es" && cat.nameEs) return cat.nameEs;
    if (locale === "pt" && cat.namePt) return cat.namePt;
    return cat.nameEn;
  };

  const getCategoryStyle = (cat: BlogCategory | null) => {
    if (!cat) return colorClasses.blue;
    return colorClasses[cat.color] || colorClasses.blue;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(
      locale === "es" ? "es-ES" : locale === "pt" ? "pt-BR" : "en-US",
      { year: "numeric", month: "long", day: "numeric" }
    );
  };

  const renderMarkdown = (content: string) => {
    let html = content
      .replace(/^### (.*$)/gim, (_, text) => {
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        return `<h3 id="${id}" class="text-xl font-bold text-slate-800 mt-10 mb-4 scroll-mt-24">${text}</h3>`;
      })
      .replace(/^## (.*$)/gim, (_, text) => {
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        return `<h2 id="${id}" class="text-2xl font-bold text-slate-900 mt-12 mb-5 scroll-mt-24">${text}</h2>`;
      })
      .replace(/^# (.*$)/gim, (_, text) => {
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        return `<h1 id="${id}" class="text-3xl font-bold text-slate-900 mt-12 mb-6 scroll-mt-24">${text}</h1>`;
      })
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-slate-900">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 hover:text-blue-800 underline">$1</a>')
      .replace(/^\- (.*$)/gim, '<li class="ml-6 mb-2 text-slate-700 list-disc">$1</li>')
      .replace(/^\d+\. (.*$)/gim, '<li class="ml-6 mb-2 text-slate-700 list-decimal">$1</li>')
      .replace(/\n\n/g, '</p><p class="mb-6 text-slate-700 leading-relaxed text-[17px]">')
      .replace(/\n/g, '<br/>');

    return `<p class="mb-6 text-slate-700 leading-relaxed text-[17px]">${html}</p>`;
  };

  const categoryStyle = getCategoryStyle(post?.category || null);
  const hasValidCalculator = post?.relatedCalculator && isValidCalculator(post.relatedCalculator);

  if (loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-white py-20">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (error || !post) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-white py-20">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold text-slate-900 mb-4">Article Not Found</h1>
            <Link href={`/${locale}/blog`} className="text-blue-600 hover:underline">← Back to Blog</Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <a href="#article-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg">
        Skip to article content
      </a>

      <Header />
      
      <main className="min-h-screen bg-white">
        {/* Hero con imagen full-width */}
        <section className="relative h-[70vh] min-h-[500px] max-h-[700px]">
          {post.featuredImage ? (
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className={`absolute inset-0 bg-gradient-to-br ${categoryStyle.gradient}`} />
          )}
          
          {/* Overlay oscuro */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
          
          {/* Contenido sobre la imagen */}
          <div className="absolute inset-0 flex items-end">
            <div className="max-w-4xl mx-auto px-4 pb-16 w-full">
              {/* Category */}
              {post.category && (
                <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-white/20 backdrop-blur-sm text-white mb-4">
                  {post.category.icon} {getCategoryName(post.category)}
                </span>
              )}
              
              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                {post.title}
              </h1>
              
              {/* Meta */}
              <div className="flex items-center gap-4 text-white/80">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white font-bold">
                    {post.author?.name?.[0] || "K"}
                  </div>
                  <span className="font-medium">{post.author?.name || "Kalcufy"}</span>
                </div>
                <span>·</span>
                <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                <span>·</span>
                <span>{post.readingTime} min read</span>
              </div>
            </div>
          </div>
        </section>

        {/* Content + Sidebar */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Article */}
            <article id="article-content" className="flex-1 min-w-0 max-w-3xl">
              {/* Excerpt */}
              <p className="text-xl text-slate-600 mb-10 pb-10 border-b border-slate-200 leading-relaxed">
                {post.excerpt}
              </p>

              {/* Content */}
              <div dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }} />

              {/* Ad */}
              <AdBlock slot="article-middle" className="my-10" />

              {/* Tags */}
              {post.tags.length > 0 && (
                <div className="mt-10 pt-8 border-t border-slate-200">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-sm">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Share */}
              <div className="mt-8 p-6 bg-slate-50 rounded-xl">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-slate-700">Share this article</span>
                  <div className="flex items-center gap-2">
                    <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}`} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white flex items-center justify-center text-slate-600 hover:bg-slate-900 hover:text-white transition-all border border-slate-200" aria-label="Share on X">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                    </a>
                    <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white flex items-center justify-center text-slate-600 hover:bg-blue-600 hover:text-white transition-all border border-slate-200" aria-label="Share on LinkedIn">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                    </a>
                  </div>
                </div>
              </div>

              {/* Back */}
              <div className="mt-8">
                <Link href={`/${locale}/blog`} className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-600 font-medium">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                  Back to Blog
                </Link>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="w-full lg:w-80 flex-shrink-0">
              <div className="lg:sticky lg:top-24 space-y-6">
                {/* TOC */}
                {tableOfContents.length > 0 && (
                  <nav className="bg-slate-50 rounded-xl p-5">
                    <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                      <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" /></svg>
                      Contents
                    </h3>
                    <ul className="space-y-2">
                      {tableOfContents.filter(h => h.level <= 2).slice(0, 8).map((heading, index) => (
                        <li key={index}>
                          <a href={`#${heading.id}`} className={`block text-sm text-slate-600 hover:text-blue-600 transition-colors ${heading.level === 1 ? 'font-medium' : 'pl-3'}`}>
                            {heading.text}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                )}

                {/* Calculator CTA */}
                {hasValidCalculator && (
                  <div className={`rounded-xl border p-5 ${categoryStyle.bg} ${categoryStyle.border}`}>
                    <h3 className="font-bold text-slate-900 mb-2">📊 Try the Calculator</h3>
                    <p className="text-sm text-slate-600 mb-4">Put what you learned into practice.</p>
                    <Link href={`/${locale}/${post.relatedCalculator}`} className="block w-full py-2.5 px-4 bg-white text-center font-semibold text-slate-900 rounded-lg hover:bg-slate-50 transition-colors border border-slate-200">
                      Open Calculator →
                    </Link>
                  </div>
                )}

                {/* Ad */}
                <AdBlock slot="article-sidebar" className="rounded-xl overflow-hidden" />

                {/* Newsletter */}
                <div className="bg-slate-900 rounded-xl p-5 text-white">
                  <h3 className="font-bold mb-2">Subscribe</h3>
                  <p className="text-sm text-slate-400 mb-4">Get weekly financial tips.</p>
                  <form className="space-y-3">
                    <input type="email" placeholder="Your email" className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 text-sm" />
                    <button type="submit" className="w-full py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-sm">
                      Subscribe
                    </button>
                  </form>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
}
