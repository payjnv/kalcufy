"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

interface BlogCategory {
  id: string;
  slug: string;
  nameEn: string;
  nameEs: string | null;
  namePt: string | null;
  icon: string;
  color: string;
}

interface PostFormData {
  titleEn: string;
  titleEs: string;
  titlePt: string;
  slugEn: string;
  slugEs: string;
  slugPt: string;
  excerptEn: string;
  excerptEs: string;
  excerptPt: string;
  contentEn: string;
  contentEs: string;
  contentPt: string;
  metaTitleEn: string;
  metaTitleEs: string;
  metaTitlePt: string;
  metaDescriptionEn: string;
  metaDescriptionEs: string;
  metaDescriptionPt: string;
  featuredImage: string;
  ogImage: string;
  categoryId: string;
  tags: string[];
  relatedCalculator: string;
  status: "DRAFT" | "PUBLISHED" | "SCHEDULED" | "ARCHIVED";
  scheduledAt: string;
  readingTime: number;
}

const calculators = [
  { slug: "compound-interest-calculator", name: "Compound Interest Calculator" },
  { slug: "mortgage-calculator", name: "Mortgage Calculator" },
  { slug: "loan-calculator", name: "Loan Calculator" },
  { slug: "auto-loan-calculator", name: "Auto Loan Calculator" },
  { slug: "savings-calculator", name: "Savings Calculator" },
  { slug: "retirement-calculator", name: "Retirement Calculator" },
  { slug: "credit-card-payoff-calculator", name: "Credit Card Payoff Calculator" },
  { slug: "bmi-calculator", name: "BMI Calculator" },
  { slug: "calorie-calculator", name: "Calorie Calculator" },
];

const colorClasses: Record<string, string> = {
  blue: "bg-blue-100 text-blue-700 border-blue-200",
  green: "bg-emerald-100 text-emerald-700 border-emerald-200",
  purple: "bg-purple-100 text-purple-700 border-purple-200",
  amber: "bg-amber-100 text-amber-800 border-amber-200",
  red: "bg-red-100 text-red-700 border-red-200",
  indigo: "bg-indigo-100 text-indigo-700 border-indigo-200",
  cyan: "bg-cyan-100 text-cyan-700 border-cyan-200",
  pink: "bg-pink-100 text-pink-700 border-pink-200",
};

export default function AdminBlogEditorPage() {
  const router = useRouter();
  const params = useParams();
  const isEditing = params?.id && params.id !== "new";
  
  const [activeTab, setActiveTab] = useState<"en" | "es" | "pt">("en");
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [newTag, setNewTag] = useState("");
  
  const [form, setForm] = useState<PostFormData>({
    titleEn: "",
    titleEs: "",
    titlePt: "",
    slugEn: "",
    slugEs: "",
    slugPt: "",
    excerptEn: "",
    excerptEs: "",
    excerptPt: "",
    contentEn: "",
    contentEs: "",
    contentPt: "",
    metaTitleEn: "",
    metaTitleEs: "",
    metaTitlePt: "",
    metaDescriptionEn: "",
    metaDescriptionEs: "",
    metaDescriptionPt: "",
    featuredImage: "",
    ogImage: "",
    categoryId: "",
    tags: [],
    relatedCalculator: "",
    status: "DRAFT",
    scheduledAt: "",
    readingTime: 5,
  });

  useEffect(() => {
    fetchCategories();
    if (isEditing) {
      fetchPost();
    }
  }, [isEditing]);

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/admin/blog/categories");
      const data = await res.json();
      setCategories(data.categories || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchPost = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/blog/${params?.id}`);
      const data = await res.json();
      if (data.post) {
        setForm({
          ...data.post,
          categoryId: data.post.categoryId || "",
          tags: data.post.tags || [],
          scheduledAt: data.post.scheduledAt || "",
        });
      }
    } catch (error) {
      console.error("Error fetching post:", error);
    }
    setLoading(false);
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[áàäâ]/g, "a")
      .replace(/[éèëê]/g, "e")
      .replace(/[íìïî]/g, "i")
      .replace(/[óòöô]/g, "o")
      .replace(/[úùüû]/g, "u")
      .replace(/ñ/g, "n")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  };

  const handleTitleChange = (lang: "en" | "es" | "pt", value: string) => {
    const titleKey = `title${lang.charAt(0).toUpperCase() + lang.slice(1)}` as keyof PostFormData;
    const slugKey = `slug${lang.charAt(0).toUpperCase() + lang.slice(1)}` as keyof PostFormData;
    
    setForm((prev) => ({
      ...prev,
      [titleKey]: value,
      [slugKey]: generateSlug(value),
    }));
  };

  const handleChange = (field: keyof PostFormData, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const addTag = () => {
    if (newTag.trim() && !form.tags.includes(newTag.trim())) {
      setForm((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim().toLowerCase()],
      }));
      setNewTag("");
    }
  };

  const removeTag = (tag: string) => {
    setForm((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  };

  const calculateReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute) || 1;
  };

  const handleSave = async (asDraft = false) => {
    setSaving(true);
    try {
      const payload = {
        ...form,
        status: asDraft ? "DRAFT" : form.status,
        readingTime: calculateReadingTime(form.contentEn),
      };

      const url = isEditing ? `/api/admin/blog/${params?.id}` : "/api/admin/blog";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        router.push("/en/admin/blog");
      } else {
        const error = await res.json();
        alert(error.message || "Error saving post");
      }
    } catch (error) {
      console.error("Error saving post:", error);
      alert("Error saving post");
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-4">
          <Link
            href="/en/admin/blog"
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">
              {isEditing ? "Edit Post" : "New Post"}
            </h1>
            <p className="text-slate-600 mt-1">
              {isEditing ? "Update your blog article" : "Create a new blog article"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleSave(true)}
            disabled={saving}
            className="px-4 py-2.5 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-medium disabled:opacity-50"
          >
            Save Draft
          </button>
          <button
            onClick={() => handleSave(false)}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50"
          >
            {saving && (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            )}
            {form.status === "PUBLISHED" ? "Update" : "Publish"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          {/* Language Tabs */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="flex border-b border-slate-200">
              {[
                { code: "en", label: "🇺🇸 English", flag: "🇺🇸" },
                { code: "es", label: "🇪🇸 Español", flag: "🇪🇸" },
                { code: "pt", label: "🇧🇷 Português", flag: "🇧🇷" },
              ].map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setActiveTab(lang.code as "en" | "es" | "pt")}
                  className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                    activeTab === lang.code
                      ? "bg-blue-50 text-blue-600 border-b-2 border-blue-600"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>

            <div className="p-5 space-y-4">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Title {activeTab === "en" && <span className="text-red-500">*</span>}
                </label>
                <input
                  type="text"
                  value={form[`title${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}` as keyof PostFormData] as string}
                  onChange={(e) => handleTitleChange(activeTab, e.target.value)}
                  placeholder={`Enter title in ${activeTab === "en" ? "English" : activeTab === "es" ? "Spanish" : "Portuguese"}`}
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Slug */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  URL Slug
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 text-sm">/blog/</span>
                  <input
                    type="text"
                    value={form[`slug${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}` as keyof PostFormData] as string}
                    onChange={(e) => handleChange(`slug${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}` as keyof PostFormData, e.target.value)}
                    className="flex-1 px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Excerpt
                </label>
                <textarea
                  value={form[`excerpt${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}` as keyof PostFormData] as string}
                  onChange={(e) => handleChange(`excerpt${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}` as keyof PostFormData, e.target.value)}
                  placeholder="Brief summary of the article..."
                  rows={3}
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Content (Markdown)
                </label>
                <div className="border border-slate-300 rounded-lg overflow-hidden">
                  {/* Toolbar */}
                  <div className="flex items-center gap-1 p-2 bg-slate-50 border-b border-slate-200">
                    <button className="p-2 text-slate-600 hover:bg-slate-200 rounded" title="Bold">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                        <path d="M6 4h8a4 4 0 014 4 4 4 0 01-4 4H6z M6 12h9a4 4 0 014 4 4 4 0 01-4 4H6z" />
                      </svg>
                    </button>
                    <button className="p-2 text-slate-600 hover:bg-slate-200 rounded" title="Italic">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path d="M19 4h-9 M14 20H5 M15 4L9 20" />
                      </svg>
                    </button>
                    <div className="w-px h-5 bg-slate-300 mx-1"></div>
                    <button className="p-2 text-slate-600 hover:bg-slate-200 rounded text-sm font-bold" title="Heading 1">
                      H1
                    </button>
                    <button className="p-2 text-slate-600 hover:bg-slate-200 rounded text-sm font-bold" title="Heading 2">
                      H2
                    </button>
                    <button className="p-2 text-slate-600 hover:bg-slate-200 rounded text-sm font-bold" title="Heading 3">
                      H3
                    </button>
                    <div className="w-px h-5 bg-slate-300 mx-1"></div>
                    <button className="p-2 text-slate-600 hover:bg-slate-200 rounded" title="Link">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                    </button>
                    <button className="p-2 text-slate-600 hover:bg-slate-200 rounded" title="Image">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </button>
                    <button className="p-2 text-slate-600 hover:bg-slate-200 rounded" title="List">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                      </svg>
                    </button>
                  </div>
                  <textarea
                    value={form[`content${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}` as keyof PostFormData] as string}
                    onChange={(e) => handleChange(`content${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}` as keyof PostFormData, e.target.value)}
                    placeholder="Write your content using Markdown..."
                    rows={15}
                    className="w-full px-4 py-3 focus:outline-none resize-none font-mono text-sm"
                  />
                </div>
                <p className="text-xs text-slate-400 mt-1.5">
                  Supports Markdown: **bold**, *italic*, ## heading, [link](url), ![image](url)
                </p>
              </div>

              {/* SEO Fields */}
              <div className="pt-4 border-t border-slate-200">
                <h3 className="text-sm font-medium text-slate-700 mb-3">SEO Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-slate-600 mb-1.5">Meta Title</label>
                    <input
                      type="text"
                      value={form[`metaTitle${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}` as keyof PostFormData] as string}
                      onChange={(e) => handleChange(`metaTitle${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}` as keyof PostFormData, e.target.value)}
                      placeholder="SEO title (max 60 characters)"
                      maxLength={60}
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-600 mb-1.5">Meta Description</label>
                    <textarea
                      value={form[`metaDescription${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}` as keyof PostFormData] as string}
                      onChange={(e) => handleChange(`metaDescription${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}` as keyof PostFormData, e.target.value)}
                      placeholder="SEO description (max 155 characters)"
                      maxLength={155}
                      rows={2}
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4 sm:space-y-6">
          {/* Status & Publish */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h3 className="font-medium text-slate-900 mb-4">Publish</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-slate-600 mb-1.5">Status</label>
                <select
                  value={form.status}
                  onChange={(e) => handleChange("status", e.target.value)}
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                >
                  <option value="DRAFT">Draft</option>
                  <option value="PUBLISHED">Published</option>
                  <option value="SCHEDULED">Scheduled</option>
                  <option value="ARCHIVED">Archived</option>
                </select>
              </div>

              {form.status === "SCHEDULED" && (
                <div>
                  <label className="block text-sm text-slate-600 mb-1.5">Schedule Date</label>
                  <input
                    type="datetime-local"
                    value={form.scheduledAt}
                    onChange={(e) => handleChange("scheduledAt", e.target.value)}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm text-slate-600 mb-1.5">Reading Time (min)</label>
                <input
                  type="number"
                  value={form.readingTime}
                  onChange={(e) => handleChange("readingTime", parseInt(e.target.value) || 1)}
                  min={1}
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Category */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-slate-900">Category</h3>
              <Link
                href="/en/admin/blog/categories"
                className="text-xs text-blue-600 hover:text-blue-700"
              >
                Manage
              </Link>
            </div>
            <div className="space-y-2">
              {categories.map((cat) => (
                <label
                  key={cat.id}
                  className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                    form.categoryId === cat.id
                      ? `${colorClasses[cat.color]} border-current`
                      : "border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <input
                    type="radio"
                    name="category"
                    value={cat.id}
                    checked={form.categoryId === cat.id}
                    onChange={(e) => handleChange("categoryId", e.target.value)}
                    className="sr-only"
                  />
                  <span className="text-lg">{cat.icon}</span>
                  <span className="font-medium">{cat.nameEn}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Featured Image */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h3 className="font-medium text-slate-900 mb-4">Featured Image</h3>
            <div className="space-y-3">
              {form.featuredImage ? (
                <div className="relative">
                  <img
                    src={form.featuredImage}
                    alt="Featured"
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => handleChange("featuredImage", "")}
                    className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center">
                  <svg className="w-8 h-8 text-slate-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-sm text-slate-600">No image selected</p>
                </div>
              )}
              <input
                type="text"
                value={form.featuredImage}
                onChange={(e) => handleChange("featuredImage", e.target.value)}
                placeholder="Image URL (e.g., https://unsplash.com/...)"
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
          </div>

          {/* Related Calculator */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h3 className="font-medium text-slate-900 mb-4">Related Calculator</h3>
            <select
              value={form.relatedCalculator}
              onChange={(e) => handleChange("relatedCalculator", e.target.value)}
              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              <option value="">None</option>
              {calculators.map((calc) => (
                <option key={calc.slug} value={calc.slug}>
                  {calc.name}
                </option>
              ))}
            </select>
          </div>

          {/* Tags */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h3 className="font-medium text-slate-900 mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2 mb-3">
              {form.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg text-sm"
                >
                  {tag}
                  <button
                    onClick={() => removeTag(tag)}
                    className="text-slate-400 hover:text-slate-600"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                placeholder="Add tag..."
                className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
              <button
                onClick={addTag}
                className="px-3 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
