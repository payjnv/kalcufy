"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLocale } from "next-intl";
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

// Traducciones inline
const translations: Record<string, Record<string, string>> = {
  en: {
    contents: "Contents",
    tryCalculator: "Related Calculator",
    openCalculator: "Open Calculator",
    subscribe: "Stay Updated",
    subscribeDescription: "Get weekly tips directly to your inbox.",
    emailPlaceholder: "Enter your email",
    subscribeButton: "Subscribe",
    shareArticle: "Share this article",
    backToBlog: "Back to Blog",
    minRead: "min read",
    articleNotFound: "Article Not Found",
    loading: "Loading...",
  },
  es: {
    contents: "Contenido",
    tryCalculator: "Calculadora Relacionada",
    openCalculator: "Abrir Calculadora",
    subscribe: "Mantente Actualizado",
    subscribeDescription: "Recibe consejos semanales en tu correo.",
    emailPlaceholder: "Tu correo electrónico",
    subscribeButton: "Suscribirse",
    shareArticle: "Comparte este artículo",
    backToBlog: "Volver al Blog",
    minRead: "min de lectura",
    articleNotFound: "Artículo No Encontrado",
    loading: "Cargando...",
  },
  pt: {
    contents: "Conteúdo",
    tryCalculator: "Calculadora Relacionada",
    openCalculator: "Abrir Calculadora",
    subscribe: "Fique Atualizado",
    subscribeDescription: "Receba dicas semanais no seu email.",
    emailPlaceholder: "Seu email",
    subscribeButton: "Inscrever-se",
    shareArticle: "Compartilhe este artigo",
    backToBlog: "Voltar ao Blog",
    minRead: "min de leitura",
    articleNotFound: "Artigo Não Encontrado",
    loading: "Carregando...",
  },
};

export default function BlogPostPage() {
  const locale = useLocale();
  const params = useParams();
  const slug = params.slug as string;

  const txt = translations[locale] || translations.en;

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
        
        // Extract TOC from content
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
      .replace(/^\|(.+)\|$/gim, (match) => {
        const cells = match.split('|').filter(c => c.trim());
        const isHeader = cells.some(c => c.includes('---'));
        if (isHeader) return '';
        return `<tr>${cells.map(c => `<td class="border border-slate-200 px-4 py-2">${c.trim()}</td>`).join('')}</tr>`;
      })
      .replace(/^\- (.*$)/gim, '<li class="ml-6 mb-2 text-slate-700 list-disc">$1</li>')
      .replace(/^\d+\. (.*$)/gim, '<li class="ml-6 mb-2 text-slate-700 list-decimal">$1</li>')
      .replace(/\n\n/g, '</p><p class="mb-6 text-slate-700 leading-relaxed text-[17px]">')
      .replace(/\n/g, '<br/>');

    return `<p class="mb-6 text-slate-700 leading-relaxed text-[17px]">${html}</p>`;
  };

  // Verificar si el post tiene calculadora válida
  const hasValidCalculator = post?.relatedCalculator && isValidCalculator(post.relatedCalculator);
  const calculatorDisplayName = hasValidCalculator ? getCalculatorName(post.relatedCalculator!, locale) : null;

  if (loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-white pt-20">
          <div className="max-w-2xl mx-auto px-4 text-center py-20">
            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-slate-500">{txt.loading}</p>
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
        <main className="min-h-screen bg-white pt-20">
          <div className="max-w-2xl mx-auto px-4 text-center py-20">
            <h1 className="text-2xl font-bold text-slate-900 mb-4">{txt.articleNotFound}</h1>
            <Link href={`/${locale}/blog`} className="text-blue-600 hover:underline">
              ← {txt.backToBlog}
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      
      <main className="min-h-screen bg-white">
        {/* Hero con imagen */}
        <section className="relative h-[60vh] min-h-[400px] max-h-[600px]">
          {post.featuredImage ? (
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-cyan-500" />
          )}
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
          
          <div className="absolute inset-0 flex items-end">
            <div className="max-w-4xl mx-auto px-4 pb-12 w-full">
              {post.category && (
                <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-white/20 backdrop-blur-sm text-white mb-4">
                  {post.category.icon} {getCategoryName(post.category)}
                </span>
              )}
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                {post.title}
              </h1>
              
              <div className="flex items-center gap-4 text-white/80 text-sm">
                <span>{post.author?.name || "Kalcufy"}</span>
                <span>·</span>
                <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                <span>·</span>
                <span>{post.readingTime} {txt.minRead}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Content + Sidebar */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Article */}
            <article className="flex-1 min-w-0 max-w-3xl">
              <p className="text-xl text-slate-600 mb-10 pb-10 border-b border-slate-200 leading-relaxed">
                {post.excerpt}
              </p>

              <div 
                className="prose prose-slate max-w-none"
                dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }} 
              />

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
                  <span className="font-medium text-slate-700">{txt.shareArticle}</span>
                  <div className="flex items-center gap-2">
                    <a 
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}`} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="w-9 h-9 rounded-lg bg-white flex items-center justify-center text-slate-600 hover:bg-slate-900 hover:text-white transition-all border border-slate-200"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </a>
                    <a 
                      href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="w-9 h-9 rounded-lg bg-white flex items-center justify-center text-slate-600 hover:bg-blue-600 hover:text-white transition-all border border-slate-200"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Link href={`/${locale}/blog`} className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-600 font-medium">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  {txt.backToBlog}
                </Link>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="w-full lg:w-80 flex-shrink-0">
              <div className="lg:sticky lg:top-24 space-y-6">
                
                {/* Table of Contents */}
                {tableOfContents.length > 0 && (
                  <nav className="bg-slate-50 rounded-xl p-5">
                    <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                      <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                      </svg>
                      {txt.contents}
                    </h3>
                    <ul className="space-y-2">
                      {tableOfContents.filter(h => h.level <= 2).slice(0, 8).map((heading, index) => (
                        <li key={index}>
                          <a 
                            href={`#${heading.id}`} 
                            className={`block text-sm text-slate-600 hover:text-blue-600 transition-colors ${heading.level === 1 ? 'font-medium' : 'pl-3'}`}
                          >
                            {heading.text}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                )}

                {/* ============================================
                    CALCULATOR WIDGET - DISEÑO LIMPIO
                ============================================ */}
                {hasValidCalculator && (
                  <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                    <div className="px-5 py-4 border-b border-slate-100">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 font-medium">{txt.tryCalculator}</p>
                          <h4 className="font-semibold text-slate-900">{calculatorDisplayName}</h4>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-5">
                      <Link 
                        href={`/${locale}/${post.relatedCalculator}`}
                        className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-cyan-600 transition-all shadow-sm"
                      >
                        {txt.openCalculator}
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                )}

                {/* Ad */}
                <AdBlock slot="article-sidebar" className="rounded-xl overflow-hidden" />

                {/* Newsletter */}
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                  <div className="px-5 py-4 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-slate-900 flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900">{txt.subscribe}</h3>
                        <p className="text-xs text-slate-500">{txt.subscribeDescription}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                      <input 
                        type="email" 
                        placeholder={txt.emailPlaceholder}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
                      />
                      <button 
                        type="submit" 
                        className="w-full py-2.5 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 transition-all text-sm"
                      >
                        {txt.subscribeButton}
                      </button>
                    </form>
                  </div>
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
