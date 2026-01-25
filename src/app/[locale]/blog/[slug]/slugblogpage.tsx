"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdBlock from "@/components/ads/AdBlock";
import { isValidCalculator, getCalculatorName } from "@/lib/valid-calculators";

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

const colorClasses: Record<string, { bg: string; text: string; border: string }> = {
  blue: { bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-200" },
  green: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
  amber: { bg: "bg-amber-50", text: "text-amber-600", border: "border-amber-200" },
  purple: { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200" },
  indigo: { bg: "bg-indigo-50", text: "text-indigo-600", border: "border-indigo-200" },
  red: { bg: "bg-red-50", text: "text-red-600", border: "border-red-200" },
  cyan: { bg: "bg-cyan-50", text: "text-cyan-600", border: "border-cyan-200" },
  pink: { bg: "bg-pink-50", text: "text-pink-600", border: "border-pink-200" },
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
        
        // Extract table of contents from content
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

  // Enhanced markdown renderer
  const renderMarkdown = (content: string) => {
    let html = content
      .replace(/^### (.*$)/gim, (_, text) => {
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        return `<h3 id="${id}" class="text-xl font-bold text-slate-800 mt-8 mb-4 scroll-mt-24">${text}</h3>`;
      })
      .replace(/^## (.*$)/gim, (_, text) => {
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        return `<h2 id="${id}" class="text-2xl font-bold text-slate-900 mt-10 mb-4 pb-2 border-b border-slate-200 scroll-mt-24">${text}</h2>`;
      })
      .replace(/^# (.*$)/gim, (_, text) => {
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        return `<h1 id="${id}" class="text-3xl font-bold text-slate-900 mt-10 mb-6 scroll-mt-24">${text}</h1>`;
      })
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-slate-900">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 hover:text-blue-800 underline font-medium">$1</a>')
      .replace(/^\- (.*$)/gim, '<li class="ml-6 mb-2 text-slate-600 list-disc">$1</li>')
      .replace(/^\d+\. (.*$)/gim, '<li class="ml-6 mb-2 text-slate-600 list-decimal">$1</li>')
      .replace(/\|(.+)\|/g, (match) => {
        const cells = match.split('|').filter(cell => cell.trim());
        if (cells.every(cell => cell.trim().match(/^-+$/))) return '';
        return `<tr class="border-b border-slate-200 hover:bg-slate-50">${cells.map(cell => 
          `<td class="px-4 py-3 text-sm text-slate-600">${cell.trim()}</td>`
        ).join('')}</tr>`;
      })
      .replace(/\n\n/g, '</p><p class="mb-5 text-slate-600 leading-relaxed text-[17px]">')
      .replace(/\n/g, '<br/>');

    return `<p class="mb-5 text-slate-600 leading-relaxed text-[17px]">${html}</p>`;
  };

  // Loading
  if (loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-white py-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Not found
  if (error || !post) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-white py-20">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h1 className="text-3xl font-bold text-slate-900 mb-4">
              {locale === "es" ? "Artículo No Encontrado" : locale === "pt" ? "Artigo Não Encontrado" : "Article Not Found"}
            </h1>
            <Link href={`/${locale}/blog`} className="text-blue-600 hover:underline">
              ← {locale === "es" ? "Volver al Blog" : locale === "pt" ? "Voltar ao Blog" : "Back to Blog"}
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const categoryStyle = getCategoryStyle(post.category);
  
  // ✅ VALIDAR si la calculadora relacionada existe en el sistema
  const hasValidCalculator = isValidCalculator(post.relatedCalculator);
  const calculatorDisplayName = hasValidCalculator 
    ? getCalculatorName(post.relatedCalculator!, locale) 
    : null;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <nav className="flex items-center gap-2 text-sm text-slate-600">
              <Link href={`/${locale}`} className="hover:text-blue-600">
                {locale === "es" ? "Inicio" : locale === "pt" ? "Início" : "Home"}
              </Link>
              <span>/</span>
              <Link href={`/${locale}/blog`} className="hover:text-blue-600">Blog</Link>
              <span>/</span>
              <span className="text-slate-900 truncate max-w-[200px]">{post.title}</span>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Article Content - Left */}
            <article className="flex-1 min-w-0">
              {/* Article Card */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                {/* Featured Image */}
                {post.featuredImage && (
                  <div className="relative h-[300px] md:h-[400px]">
                    <Image
                      src={post.featuredImage}
                      alt={post.title}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                )}

                {/* Content */}
                <div className="p-6 md:p-10">
                  {/* Meta */}
                  <div className="flex flex-wrap items-center gap-3 mb-6">
                    {post.category && (
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${categoryStyle.bg} ${categoryStyle.text}`}>
                        {post.category.icon} {getCategoryName(post.category)}
                      </span>
                    )}
                    <span className="text-slate-400 text-sm">•</span>
                    <span className="text-slate-600 text-sm">{post.readingTime} min {locale === "es" ? "de lectura" : locale === "pt" ? "de leitura" : "read"}</span>
                    <span className="text-slate-400 text-sm">•</span>
                    <span className="text-slate-600 text-sm">{post.views.toLocaleString()} {locale === "es" ? "vistas" : locale === "pt" ? "visualizações" : "views"}</span>
                  </div>

                  {/* Title */}
                  <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 leading-tight">
                    {post.title}
                  </h1>

                  {/* Excerpt */}
                  <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                    {post.excerpt}
                  </p>

                  {/* Author & Date */}
                  <div className="flex items-center gap-4 pb-8 mb-8 border-b border-slate-200">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                      {post.author?.name?.[0] || "K"}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">{post.author?.name || "Kalcufy Team"}</p>
                      <p className="text-sm text-slate-600">{formatDate(post.publishedAt)}</p>
                    </div>
                  </div>

                  {/* Article Body */}
                  <div 
                    className="prose-article"
                    dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
                  />

                  {/* Tags */}
                  {post.tags.length > 0 && (
                    <div className="mt-10 pt-8 border-t border-slate-200">
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1.5 bg-slate-100 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-200 transition-colors"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Share */}
                  <div className="mt-8 pt-8 border-t border-slate-200">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-700">
                        {locale === "es" ? "Compartir artículo" : locale === "pt" ? "Compartilhar artigo" : "Share article"}
                      </span>
                      <div className="flex items-center gap-2">
                        <a
                          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-900 hover:text-white transition-all"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                        </a>
                        <a
                          href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-blue-600 hover:text-white transition-all"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                        </a>
                        <a
                          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-blue-500 hover:text-white transition-all"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Back to Blog */}
              <div className="mt-6">
                <Link
                  href={`/${locale}/blog`}
                  className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-600 font-medium transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  {locale === "es" ? "Volver al Blog" : locale === "pt" ? "Voltar ao Blog" : "Back to Blog"}
                </Link>
              </div>
            </article>

            {/* Sidebar - Right */}
            <aside className="w-full lg:w-80 flex-shrink-0">
              <div className="lg:sticky lg:top-24 space-y-6">
                {/* Table of Contents */}
                {tableOfContents.length > 0 && (
                  <div className="bg-white rounded-xl border border-slate-200 p-5">
                    <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                      <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                      </svg>
                      {locale === "es" ? "Contenido" : locale === "pt" ? "Conteúdo" : "Contents"}
                    </h3>
                    <nav className="space-y-2">
                      {tableOfContents.filter(h => h.level <= 2).slice(0, 8).map((heading, index) => (
                        <a
                          key={index}
                          href={`#${heading.id}`}
                          className={`block text-sm text-slate-600 hover:text-blue-600 transition-colors ${heading.level === 1 ? 'font-medium' : 'pl-3'}`}
                        >
                          {heading.text}
                        </a>
                      ))}
                    </nav>
                  </div>
                )}

                {/* Calculator CTA - ✅ SOLO SE MUESTRA SI LA CALCULADORA ES VÁLIDA */}
                {hasValidCalculator && (
                  <div className={`rounded-xl border p-5 ${categoryStyle.bg} ${categoryStyle.border}`}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-10 h-10 rounded-lg bg-white flex items-center justify-center ${categoryStyle.text}`}>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <h3 className="font-bold text-slate-900">
                        {locale === "es" ? "Calculadora" : locale === "pt" ? "Calculadora" : "Calculator"}
                      </h3>
                    </div>
                    <p className="text-sm text-slate-600 mb-4">
                      {locale === "es" ? "Pon en práctica lo que aprendiste." : locale === "pt" ? "Coloque em prática o que aprendeu." : "Put what you learned into practice."}
                    </p>
                    <Link
                      href={`/${locale}/${post.relatedCalculator}`}
                      className="block w-full py-2.5 px-4 bg-white text-center font-semibold text-slate-900 rounded-lg hover:bg-slate-50 transition-colors border border-slate-200"
                    >
                      {locale === "es" ? "Abrir Calculadora →" : locale === "pt" ? "Abrir Calculadora →" : "Open Calculator →"}
                    </Link>
                  </div>
                )}

                {/* Ad Block */}
                <AdBlock slot="blog-sidebar" className="rounded-xl overflow-hidden" />

                {/* Newsletter */}
                <div className="bg-slate-900 rounded-xl p-5 text-white">
                  <h3 className="font-bold mb-2">
                    {locale === "es" ? "Suscríbete" : locale === "pt" ? "Inscreva-se" : "Subscribe"}
                  </h3>
                  <p className="text-sm text-slate-400 mb-4">
                    {locale === "es" ? "Recibe tips financieros semanales." : locale === "pt" ? "Receba dicas financeiras semanais." : "Get weekly financial tips."}
                  </p>
                  <form className="space-y-3">
                    <input
                      type="email"
                      placeholder={locale === "es" ? "Tu email" : locale === "pt" ? "Seu email" : "Your email"}
                      className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500"
                    />
                    <button
                      type="submit"
                      className="w-full py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-sm"
                    >
                      {locale === "es" ? "Suscribirse" : locale === "pt" ? "Inscrever-se" : "Subscribe"}
                    </button>
                  </form>
                </div>

                {/* Author Card */}
                <div className="bg-white rounded-xl border border-slate-200 p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                      {post.author?.name?.[0] || "K"}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">{post.author?.name || "Kalcufy Team"}</p>
                      <p className="text-xs text-slate-600">
                        {locale === "es" ? "Autor" : locale === "pt" ? "Autor" : "Author"}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600">
                    {locale === "es" 
                      ? "Expertos en finanzas personales y bienestar." 
                      : locale === "pt" 
                      ? "Especialistas em finanças pessoais e bem-estar." 
                      : "Personal finance and wellness experts."}
                  </p>
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
