"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface BlogCategory {
  id: string;
  slug: string;
  nameEn: string;
  icon: string;
  color: string;
  _count?: { posts: number };
}

interface Post {
  id: string;
  titleEn: string;
  titleEs: string | null;
  titlePt: string | null;
  slugEn: string;
  excerptEn: string | null;
  featuredImage: string | null;
  category: BlogCategory | null;
  status: "DRAFT" | "PUBLISHED" | "SCHEDULED" | "ARCHIVED";
  views: number;
  readingTime: number;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
  author: { name: string; image: string | null } | null;
}

interface Stats {
  total: number;
  published: number;
  drafts: number;
  scheduled: number;
  totalViews: number;
  viewsThisMonth: number;
  viewsLastMonth: number;
  avgReadingTime: number;
  topPost: Post | null;
  recentActivity: { type: string; post: string; date: string }[];
  viewsByDay: { date: string; views: number }[];
}

const statusConfig = {
  DRAFT: { label: "Draft", color: "bg-amber-100 text-amber-800", dot: "bg-amber-500", icon: "✏️" },
  PUBLISHED: { label: "Published", color: "bg-emerald-100 text-emerald-700", dot: "bg-emerald-500", icon: "✅" },
  SCHEDULED: { label: "Scheduled", color: "bg-blue-100 text-blue-700", dot: "bg-blue-500", icon: "📅" },
  ARCHIVED: { label: "Archived", color: "bg-slate-100 text-slate-700", dot: "bg-slate-500", icon: "📦" },
};

const colorClasses: Record<string, string> = {
  blue: "bg-blue-100 text-blue-700",
  green: "bg-emerald-100 text-emerald-700",
  purple: "bg-purple-100 text-purple-700",
  amber: "bg-amber-100 text-amber-800",
  red: "bg-red-100 text-red-700",
  indigo: "bg-indigo-100 text-indigo-700",
  cyan: "bg-cyan-100 text-cyan-700",
  pink: "bg-pink-100 text-pink-700",
};

export default function AdminBlogPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [selectedPosts, setSelectedPosts] = useState<string[]>([]);
  const [stats, setStats] = useState<Stats>({
    total: 0,
    published: 0,
    drafts: 0,
    scheduled: 0,
    totalViews: 0,
    viewsThisMonth: 0,
    viewsLastMonth: 0,
    avgReadingTime: 0,
    topPost: null,
    recentActivity: [],
    viewsByDay: [],
  });

  useEffect(() => {
    fetchData();
  }, [statusFilter, categoryFilter]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const postsRes = await fetch(`/api/admin/blog?status=${statusFilter}&category=${categoryFilter}`, { credentials: "include" });
      const postsData = await postsRes.json();
      setPosts(postsData.posts || []);
      
      // Enhanced stats - in real app this would come from API
      const published = (postsData.posts || []).filter((p: Post) => p.status === "PUBLISHED").length;
      const drafts = (postsData.posts || []).filter((p: Post) => p.status === "DRAFT").length;
      const scheduled = (postsData.posts || []).filter((p: Post) => p.status === "SCHEDULED").length;
      const totalViews = (postsData.posts || []).reduce((sum: number, p: Post) => sum + p.views, 0);
      const avgReadingTime = (postsData.posts || []).length > 0 
        ? Math.round((postsData.posts || []).reduce((sum: number, p: Post) => sum + (p.readingTime || 5), 0) / (postsData.posts || []).length)
        : 0;
      
      // Find top post
      const sortedByViews = [...(postsData.posts || [])].sort((a: Post, b: Post) => b.views - a.views);
      
      setStats({
        total: postsData.stats?.total || (postsData.posts || []).length,
        published,
        drafts,
        scheduled,
        totalViews,
        viewsThisMonth: postsData.stats?.viewsThisMonth || Math.round(totalViews * 0.3),
        viewsLastMonth: postsData.stats?.viewsLastMonth || Math.round(totalViews * 0.25),
        avgReadingTime,
        topPost: sortedByViews[0] || null,
        recentActivity: postsData.stats?.recentActivity || [],
        viewsByDay: postsData.stats?.viewsByDay || generateMockViewsData(),
      });

      const catsRes = await fetch("/api/admin/blog/categories", { credentials: "include" });
      const catsData = await catsRes.json();
      setCategories(catsData.categories || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  // Generate mock views data for the chart
  const generateMockViewsData = () => {
    const data = [];
    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      data.push({
        date: date.toISOString().split('T')[0],
        views: Math.floor(Math.random() * 100) + 10,
      });
    }
    return data;
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    try {
      await fetch(`/api/admin/blog/${id}`, { credentials: "include", method: "DELETE" });
      fetchData();
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleBulkAction = async (action: string) => {
    if (selectedPosts.length === 0) return;
    if (!confirm(`Are you sure you want to ${action} ${selectedPosts.length} posts?`)) return;
    
    try {
      for (const id of selectedPosts) {
        if (action === "delete") {
          await fetch(`/api/admin/blog/${id}`, { credentials: "include", method: "DELETE" });
        } else {
          await fetch(`/api/admin/blog/${id}`, {
            credentials: "include",
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: action.toUpperCase() }),
          });
        }
      }
      setSelectedPosts([]);
      fetchData();
    } catch (error) {
      console.error("Error performing bulk action:", error);
    }
  };

  const handleDuplicate = async (post: Post) => {
    try {
      await fetch("/api/admin/blog", {
        credentials: "include",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...post,
          titleEn: `${post.titleEn} (Copy)`,
          slugEn: `${post.slugEn}-copy-${Date.now()}`,
          status: "DRAFT",
        }),
      });
      fetchData();
    } catch (error) {
      console.error("Error duplicating post:", error);
    }
  };

  const togglePostSelection = (id: string) => {
    setSelectedPosts(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const toggleAllPosts = () => {
    if (selectedPosts.length === filteredPosts.length) {
      setSelectedPosts([]);
    } else {
      setSelectedPosts(filteredPosts.map(p => p.id));
    }
  };

  const filteredPosts = posts.filter((post) =>
    post.titleEn.toLowerCase().includes(search.toLowerCase())
  );

  const formatDate = (date: string | null) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatRelativeDate = (date: string | null) => {
    if (!date) return "-";
    const now = new Date();
    const d = new Date(date);
    const diff = now.getTime() - d.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days === 0) return "Today";
    if (days === 1) return "Yesterday";
    if (days < 7) return `${days} days ago`;
    if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
    return formatDate(date);
  };

  const formatViews = (views: number) => {
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
    if (views >= 1000) return `${(views / 1000).toFixed(1)}k`;
    return views.toString();
  };

  const getPercentageChange = (current: number, previous: number) => {
    if (previous === 0) return current > 0 ? 100 : 0;
    return Math.round(((current - previous) / previous) * 100);
  };

  const viewsChange = getPercentageChange(stats.viewsThisMonth, stats.viewsLastMonth);

  // Simple sparkline component
  const Sparkline = ({ data }: { data: { views: number }[] }) => {
    const max = Math.max(...data.map(d => d.views));
    const min = Math.min(...data.map(d => d.views));
    const range = max - min || 1;
    
    return (
      <div className="flex items-end gap-0.5 h-8">
        {data.slice(-14).map((d, i) => (
          <div
            key={i}
            className="flex-1 bg-blue-500 rounded-sm min-w-[3px] transition-all hover:bg-blue-600"
            style={{ height: `${((d.views - min) / range) * 100}%`, minHeight: '4px' }}
            title={`${d.views} views`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Content Management</h1>
          <p className="text-slate-600 mt-1">Manage your blog posts, analytics, and content strategy</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/en/admin/blog/categories"
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-medium"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            Categories
          </Link>
          <Link
            href="/en/admin/blog/new"
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Post
          </Link>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Posts */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Total Posts</p>
              <p className="text-3xl font-bold text-slate-900 mt-1">{stats.total}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
          </div>
          <div className="flex items-center gap-4 mt-4 pt-4 border-t border-slate-100">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="text-sm text-slate-600">{stats.published} published</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              <span className="text-sm text-slate-600">{stats.drafts} drafts</span>
            </div>
          </div>
        </div>

        {/* Total Views */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Total Views</p>
              <p className="text-3xl font-bold text-slate-900 mt-1">{formatViews(stats.totalViews)}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">This month</span>
              <div className="flex items-center gap-1">
                <span className={`text-sm font-medium ${viewsChange >= 0 ? 'text-emerald-700' : 'text-red-600'}`}>
                  {viewsChange >= 0 ? '↑' : '↓'} {Math.abs(viewsChange)}%
                </span>
              </div>
            </div>
            <div className="mt-2">
              <Sparkline data={stats.viewsByDay} />
            </div>
          </div>
        </div>

        {/* Avg Reading Time */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Avg. Reading Time</p>
              <p className="text-3xl font-bold text-slate-900 mt-1">{stats.avgReadingTime}<span className="text-lg font-normal text-slate-400"> min</span></p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100">
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-600">Based on {stats.total} posts</span>
            </div>
          </div>
        </div>

        {/* Scheduled */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Scheduled</p>
              <p className="text-3xl font-bold text-slate-900 mt-1">{stats.scheduled}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100">
            <span className="text-sm text-slate-600">Posts waiting to publish</span>
          </div>
        </div>
      </div>

      {/* Top Performing Post & Quick Actions */}
      <div className="grid lg:grid-cols-3 gap-4">
        {/* Top Performing Post */}
        {stats.topPost && (
          <div className="lg:col-span-2 bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-6 text-white">
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-500/20 text-amber-300 rounded-full text-xs font-medium">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  Top Performing
                </span>
              </div>
              <span className="text-3xl font-bold">{formatViews(stats.topPost.views)}</span>
            </div>
            <h3 className="text-xl font-bold mb-2 line-clamp-2">{stats.topPost.titleEn}</h3>
            <p className="text-slate-400 text-sm mb-4 line-clamp-2">{stats.topPost.excerptEn || "No excerpt available"}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-slate-400">
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {stats.topPost.readingTime || 5} min read
                </span>
                <span>{formatRelativeDate(stats.topPost.publishedAt)}</span>
              </div>
              <Link
                href={`/en/admin/blog/${stats.topPost.id}`}
                className="flex items-center gap-1 text-blue-400 hover:text-blue-300 font-medium text-sm"
              >
                View Analytics
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="font-semibold text-slate-900 mb-4">Quick Actions</h3>
          <div className="space-y-2">
            <Link
              href="/en/admin/blog/new"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors group"
            >
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-slate-900">Write New Post</p>
                <p className="text-xs text-slate-600">Create a new blog article</p>
              </div>
            </Link>
            <Link
              href="/en/admin/blog/categories"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors group"
            >
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                <svg className="w-5 h-5 text-purple-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-slate-900">Manage Categories</p>
                <p className="text-xs text-slate-600">Add or edit categories</p>
              </div>
            </Link>
            <button
              onClick={() => router.push("/en/admin/blog?status=DRAFT")}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors group w-full text-left"
            >
              <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center group-hover:bg-amber-200 transition-colors">
                <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-slate-900">Review Drafts</p>
                <p className="text-xs text-slate-600">{stats.drafts} drafts pending</p>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Categories Overview */}
      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-slate-900">Categories</h3>
          <Link href="/en/admin/blog/categories" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            Manage Categories
          </Link>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoryFilter(cat.slug === categoryFilter ? "all" : cat.slug)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                categoryFilter === cat.slug
                  ? "ring-2 ring-offset-2 ring-blue-500"
                  : ""
              } ${colorClasses[cat.color] || colorClasses.blue}`}
            >
              <span>{cat.icon}</span>
              <span>{cat.nameEn}</span>
              <span className="px-1.5 py-0.5 bg-white/50 rounded text-xs">{cat._count?.posts || 0}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Filters & Actions Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-3 flex-1 w-full lg:w-auto">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search posts..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-50"
              />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-50"
            >
              <option value="all">All Status</option>
              <option value="PUBLISHED">✅ Published</option>
              <option value="DRAFT">✏️ Draft</option>
              <option value="SCHEDULED">📅 Scheduled</option>
              <option value="ARCHIVED">📦 Archived</option>
            </select>

            {/* Category Filter */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-50"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.slug}>
                  {cat.icon} {cat.nameEn}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            {/* Bulk Actions */}
            {selectedPosts.length > 0 && (
              <div className="flex items-center gap-2 mr-2 pr-2 border-r border-slate-200">
                <span className="text-sm text-slate-600">{selectedPosts.length} selected</span>
                <button
                  onClick={() => handleBulkAction("published")}
                  className="px-3 py-1.5 bg-emerald-100 text-emerald-700 rounded-lg text-sm font-medium hover:bg-emerald-200"
                >
                  Publish
                </button>
                <button
                  onClick={() => handleBulkAction("delete")}
                  className="px-3 py-1.5 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200"
                >
                  Delete
                </button>
              </div>
            )}

            {/* View Mode Toggle */}
            <div className="flex items-center bg-slate-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode("table")}
                className={`p-2 rounded-md transition-colors ${viewMode === "table" ? "bg-white shadow-sm" : "hover:bg-slate-200"}`}
                title="Table view"
              >
                <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-md transition-colors ${viewMode === "grid" ? "bg-white shadow-sm" : "hover:bg-slate-200"}`}
                title="Grid view"
              >
                <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Posts List */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <div className="w-10 h-10 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-slate-600 mt-3">Loading posts...</p>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-1">No posts found</h3>
            <p className="text-slate-600 mb-4">Get started by creating your first blog post</p>
            <Link
              href="/en/admin/blog/new"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create your first post
            </Link>
          </div>
        ) : viewMode === "table" ? (
          /* Table View */
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="w-12 py-3 px-4">
                    <input
                      type="checkbox"
                      checked={selectedPosts.length === filteredPosts.length && filteredPosts.length > 0}
                      onChange={toggleAllPosts}
                      className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Post</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Category</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Views</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Date</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-slate-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredPosts.map((post) => (
                  <tr key={post.id} className={`hover:bg-slate-50 transition-colors ${selectedPosts.includes(post.id) ? 'bg-blue-50' : ''}`}>
                    <td className="py-3 px-4">
                      <input
                        type="checkbox"
                        checked={selectedPosts.includes(post.id)}
                        onChange={() => togglePostSelection(post.id)}
                        className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      />
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        {post.featuredImage ? (
                          <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">
                            <Image src={post.featuredImage} alt="" width={48} height={48} className="w-full h-full object-cover" />
                          </div>
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center flex-shrink-0">
                            <span className="text-xl">{post.category?.icon || "📝"}</span>
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="font-medium text-slate-900 truncate max-w-xs">{post.titleEn}</p>
                          <p className="text-sm text-slate-600 truncate max-w-xs">/{post.slugEn}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      {post.category ? (
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-sm font-medium ${colorClasses[post.category.color] || colorClasses.blue}`}>
                          <span>{post.category.icon}</span>
                          {post.category.nameEn}
                        </span>
                      ) : (
                        <span className="text-slate-400">-</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-sm font-medium ${statusConfig[post.status].color}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${statusConfig[post.status].dot}`}></span>
                        {statusConfig[post.status].label}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        <span className="font-medium text-slate-700">{formatViews(post.views)}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-slate-600">{formatRelativeDate(post.publishedAt || post.createdAt)}</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={`/en/blog/${post.slugEn}`}
                          target="_blank"
                          className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                          title="View"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </Link>
                        <button
                          onClick={() => handleDuplicate(post)}
                          className="p-2 text-slate-400 hover:text-purple-700 hover:bg-purple-50 rounded-lg transition-colors"
                          title="Duplicate"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        </button>
                        <Link
                          href={`/en/admin/blog/${post.id}`}
                          className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </Link>
                        <button
                          onClick={() => handleDelete(post.id)}
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          /* Grid View */
          <div className="p-4">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredPosts.map((post) => (
                <div key={post.id} className={`bg-white border rounded-xl overflow-hidden hover:shadow-md transition-all ${selectedPosts.includes(post.id) ? 'ring-2 ring-blue-500' : 'border-slate-200'}`}>
                  <div className="relative">
                    {post.featuredImage ? (
                      <Image src={post.featuredImage} alt="" width={300} height={160} className="w-full h-40 object-cover" />
                    ) : (
                      <div className="w-full h-40 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                        <span className="text-4xl">{post.category?.icon || "📝"}</span>
                      </div>
                    )}
                    <div className="absolute top-2 left-2">
                      <input
                        type="checkbox"
                        checked={selectedPosts.includes(post.id)}
                        onChange={() => togglePostSelection(post.id)}
                        className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      />
                    </div>
                    <div className="absolute top-2 right-2">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${statusConfig[post.status].color}`}>
                        {statusConfig[post.status].label}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-slate-900 line-clamp-2 mb-2">{post.titleEn}</h3>
                    <div className="flex items-center justify-between text-sm text-slate-600 mb-3">
                      <span>{formatViews(post.views)} views</span>
                      <span>{formatRelativeDate(post.publishedAt || post.createdAt)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/en/admin/blog/${post.id}`}
                        className="flex-1 py-2 px-3 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium text-center hover:bg-slate-200 transition-colors"
                      >
                        Edit
                      </Link>
                      <Link
                        href={`/en/blog/${post.slugEn}`}
                        target="_blank"
                        className="py-2 px-3 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200 transition-colors"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredPosts.length > 0 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-600">
            Showing <span className="font-medium">{filteredPosts.length}</span> of <span className="font-medium">{stats.total}</span> posts
          </p>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50" disabled>
              Previous
            </button>
            <button className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50" disabled>
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
