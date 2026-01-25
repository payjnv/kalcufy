"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdBlock from "@/components/ads/AdBlock";

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
  featuredImage: string | null;
  category: BlogCategory | null;
  tags: string[];
  publishedAt: string;
  readingTime: number;
  author: { name: string; image: string | null } | null;
}

const colorClasses: Record<string, { color: string; gradient: string }> = {
  blue: { color: "bg-blue-100 text-blue-700", gradient: "from-blue-500 to-cyan-500" },
  green: { color: "bg-emerald-100 text-emerald-700", gradient: "from-emerald-500 to-teal-500" },
  amber: { color: "bg-amber-100 text-amber-800", gradient: "from-amber-500 to-orange-500" },
  purple: { color: "bg-purple-100 text-purple-700", gradient: "from-purple-500 to-pink-500" },
  indigo: { color: "bg-indigo-100 text-indigo-700", gradient: "from-indigo-500 to-blue-500" },
  red: { color: "bg-red-100 text-red-700", gradient: "from-red-500 to-rose-500" },
  cyan: { color: "bg-cyan-100 text-cyan-700", gradient: "from-cyan-500 to-blue-500" },
  pink: { color: "bg-pink-100 text-pink-700", gradient: "from-pink-500 to-rose-500" },
};

export default function BlogPage() {
  const locale = useLocale();
  const t = useTranslations("blog");
  
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch posts and categories from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch posts
        const postsRes = await fetch(`/api/blog?locale=${locale}`);
        const postsData = await postsRes.json();
        setPosts(postsData.posts || []);
        setFilteredPosts(postsData.posts || []);

        // Fetch categories
        const catsRes = await fetch("/api/blog/categories");
        const catsData = await catsRes.json();
        setCategories(catsData.categories || []);
      } catch (error) {
        console.error("Error fetching blog data:", error);
      }
      setLoading(false);
    };

    fetchData();
  }, [locale]);

  // Filter posts when category or search changes
  useEffect(() => {
    let result = posts;
    
    if (selectedCategory !== "ALL") {
      result = result.filter(post => post.category?.slug === selectedCategory);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(post => 
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    setFilteredPosts(result);
  }, [posts, selectedCategory, searchQuery]);

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

  const featuredPost = posts[0];
  const remainingPosts = filteredPosts.filter(p => p.id !== featuredPost?.id);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        {/* Hero */}
        <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 text-white py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-xl">📝</span>
                <span className="text-blue-200 font-medium">{t("title")}</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                {t("heroTitle1")}
                <span className="block text-cyan-300">{t("heroTitle2")}</span>
              </h1>
              <p className="text-lg md:text-xl text-blue-100 max-w-2xl">{t("heroSubtitle")}</p>
            </div>
          </div>
        </section>

        {/* Ad Block - After Hero */}
        <AdBlock slot="blog-hero" className="max-w-7xl mx-auto px-4 py-6" />

        {/* Search & Filter */}
        <section className="py-8 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="relative w-full md:w-96">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder={t("searchPlaceholder")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Dynamic Categories */}
              <div className="flex flex-wrap gap-2 justify-center">
                <button
                  onClick={() => setSelectedCategory("ALL")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === "ALL"
                      ? "bg-slate-900 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {t("allPosts")}
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1.5 ${
                      selectedCategory === cat.slug
                        ? "bg-slate-900 text-white"
                        : `${getCategoryStyle(cat).color} hover:opacity-80`
                    }`}
                  >
                    <span>{cat.icon}</span>
                    {getCategoryName(cat)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Loading State */}
        {loading && (
          <div className="py-20 text-center">
            <div className="w-12 h-12 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-slate-600 mt-4">{t("loading") || "Loading..."}</p>
          </div>
        )}

        {/* No Posts */}
        {!loading && posts.length === 0 && (
          <div className="py-20 text-center">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center">
              <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">{t("noArticles")}</h3>
            <p className="text-slate-600">{t("noArticlesDesc") || "Check back soon for new articles!"}</p>
          </div>
        )}

        {/* Featured Post */}
        {!loading && featuredPost && selectedCategory === "ALL" && !searchQuery && (
          <section className="py-12">
            <div className="max-w-7xl mx-auto px-4">
              <Link href={`/${locale}/blog/${featuredPost.slug}`}>
                <article className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200">
                  <div className="grid md:grid-cols-2 gap-0">
                    <div className={`relative h-64 md:h-96 bg-gradient-to-br ${getCategoryStyle(featuredPost.category).gradient}`}>
                      {featuredPost.featuredImage ? (
                        <Image 
                          src={featuredPost.featuredImage} 
                          alt={featuredPost.title} 
                          fill 
                          className="object-cover group-hover:scale-105 transition-transform duration-500" 
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-8xl opacity-30">{featuredPost.category?.icon || "📊"}</span>
                        </div>
                      )}
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 rounded-full text-sm font-medium bg-white/90 text-slate-900">
                          ⭐ {t("featured")}
                        </span>
                      </div>
                    </div>
                    <div className="p-8 md:p-12 flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-4">
                        {featuredPost.category && (
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryStyle(featuredPost.category).color}`}>
                            {featuredPost.category.icon} {getCategoryName(featuredPost.category)}
                          </span>
                        )}
                        <span className="text-slate-400 text-sm">{featuredPost.readingTime} {t("minRead")}</span>
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
                        {featuredPost.title}
                      </h2>
                      <p className="text-slate-600 mb-6 line-clamp-3">{featuredPost.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                            K
                          </div>
                          <div>
                            <p className="font-medium text-slate-900">{featuredPost.author?.name || "Kalcufy"}</p>
                            <p className="text-sm text-slate-600">{formatDate(featuredPost.publishedAt)}</p>
                          </div>
                        </div>
                        <span className="flex items-center gap-2 text-blue-600 font-medium group-hover:gap-3 transition-all">
                          {t("readMore")}
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            </div>
          </section>
        )}

        {/* Posts Grid */}
        {!loading && filteredPosts.length > 0 && (
          <section className="py-12">
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-slate-900">
                  {selectedCategory === "ALL" 
                    ? t("latestArticles") 
                    : categories.find(c => c.slug === selectedCategory)?.nameEn || ""
                  }
                </h2>
                <span className="text-slate-600">{filteredPosts.length} {t("articles") || "articles"}</span>
              </div>

              {filteredPosts.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center">
                    <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">{t("noArticles")}</h3>
                  <p className="text-slate-600">{t("noArticlesDesc")}</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {(selectedCategory === "ALL" && !searchQuery ? remainingPosts : filteredPosts).map((post, index) => (
                    <div key={post.id} className="contents">
                      {/* Ad Block - Between Posts (after every 3rd post) */}
                      {index > 0 && index % 3 === 0 && (
                        <div className="col-span-full">
                          <AdBlock slot="blog-between" className="py-4" />
                        </div>
                      )}
                      <Link href={`/${locale}/blog/${post.slug}`}>
                        <article className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-200 h-full flex flex-col">
                          <div className={`relative h-48 bg-gradient-to-br ${getCategoryStyle(post.category).gradient}`}>
                            {post.featuredImage ? (
                              <Image 
                                src={post.featuredImage} 
                                alt={post.title} 
                                fill 
                                className="object-cover group-hover:scale-105 transition-transform duration-500" 
                              />
                            ) : (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-6xl opacity-30">{post.category?.icon || "📊"}</span>
                              </div>
                            )}
                          </div>
                          <div className="p-6 flex flex-col flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              {post.category && (
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryStyle(post.category).color}`}>
                                  {getCategoryName(post.category)}
                                </span>
                              )}
                              <span className="text-slate-400 text-xs">{post.readingTime} min</span>
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                              {post.title}
                            </h3>
                            <p className="text-slate-600 text-sm mb-4 line-clamp-2 flex-1">{post.excerpt}</p>
                            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                              <span className="text-sm text-slate-600">{formatDate(post.publishedAt)}</span>
                              <span className="text-blue-600 font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                                {t("read") || "Read"}
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </span>
                            </div>
                          </div>
                        </article>
                      </Link>
                    </div>
                  ))}
                </div>
              )}

              {filteredPosts.length > 6 && (
                <div className="text-center mt-12">
                  <button className="px-8 py-3 rounded-xl bg-slate-900 text-white font-medium hover:bg-slate-800 transition-colors">
                    {t("loadMore")}
                  </button>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Ad Block - Before Newsletter */}
        <AdBlock slot="blog-sidebar" className="max-w-7xl mx-auto px-4 py-8" />

        {/* Newsletter */}
        <section className="py-16 bg-gradient-to-br from-blue-600 to-cyan-600">
          <div className="max-w-7xl mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("newsletter.title")}</h2>
              <p className="text-blue-100 mb-8">{t("newsletter.subtitle")}</p>
              <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder={t("newsletter.placeholder")} 
                  className="flex-1 px-4 py-3 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-white/50" 
                />
                <button 
                  type="submit" 
                  className="px-6 py-3 rounded-xl bg-slate-900 text-white font-medium hover:bg-slate-800 transition-colors whitespace-nowrap"
                >
                  {t("newsletter.button")}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
