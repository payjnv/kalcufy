"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

// ── Types ──────────────────────────────────────────────────────────────────
interface BlogCategory {
  id: string;
  slug: string;
  nameEn: string;
  nameEs: string | null;
  namePt: string | null;
  nameFr: string | null;
  nameDe: string | null;
  icon: string;
  color: string;
}

interface PostFormData {
  titleEn: string; titleEs: string; titlePt: string; titleFr: string; titleDe: string;
  slugEn: string; slugEs: string; slugPt: string; slugFr: string; slugDe: string;
  excerptEn: string; excerptEs: string; excerptPt: string; excerptFr: string; excerptDe: string;
  contentEn: string; contentEs: string; contentPt: string; contentFr: string; contentDe: string;
  metaTitleEn: string; metaTitleEs: string; metaTitlePt: string; metaTitleFr: string; metaTitleDe: string;
  metaDescriptionEn: string; metaDescriptionEs: string; metaDescriptionPt: string; metaDescriptionFr: string; metaDescriptionDe: string;
  featuredImage: string;
  ogImage: string;
  categoryId: string;
  tags: string[];
  relatedCalculator: string;
  status: "DRAFT" | "PUBLISHED" | "SCHEDULED" | "ARCHIVED";
  scheduledAt: string;
  readingTime: number;
}

type Lang = "en" | "es" | "pt" | "fr" | "de";

// ── Constants ──────────────────────────────────────────────────────────────
const LANGS: { code: Lang; label: string; flag: string; name: string }[] = [
  { code: "en", label: "English", flag: "🇺🇸", name: "English" },
  { code: "es", label: "Español", flag: "🇪🇸", name: "Spanish" },
  { code: "pt", label: "Português", flag: "🇧🇷", name: "Portuguese" },
  { code: "fr", label: "Français", flag: "🇫🇷", name: "French" },
  { code: "de", label: "Deutsch", flag: "🇩🇪", name: "German" },
];

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

const statusOptions = [
  { value: "DRAFT", label: "Draft", icon: "✏️", color: "bg-amber-100 text-amber-800" },
  { value: "PUBLISHED", label: "Published", icon: "✅", color: "bg-emerald-100 text-emerald-700" },
  { value: "SCHEDULED", label: "Scheduled", icon: "📅", color: "bg-blue-100 text-blue-700" },
  { value: "ARCHIVED", label: "Archived", icon: "📦", color: "bg-slate-100 text-slate-700" },
];

/** Capitalize: "en" → "En", "fr" → "Fr" */
function cap(s: string) { return s.charAt(0).toUpperCase() + s.slice(1); }

/** Get form field by lang suffix */
function langField(prefix: string, lang: Lang): keyof PostFormData {
  return `${prefix}${cap(lang)}` as keyof PostFormData;
}

// ── Component ──────────────────────────────────────────────────────────────
export default function AdminBlogEditorPage() {
  const router = useRouter();
  const params = useParams();
  const isEditing = params?.id && params.id !== "new";

  const [activeTab, setActiveTab] = useState<Lang>("en");
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [newTag, setNewTag] = useState("");
  const [showSeoPanel, setShowSeoPanel] = useState(false);

  const [form, setForm] = useState<PostFormData>({
    titleEn: "", titleEs: "", titlePt: "", titleFr: "", titleDe: "",
    slugEn: "", slugEs: "", slugPt: "", slugFr: "", slugDe: "",
    excerptEn: "", excerptEs: "", excerptPt: "", excerptFr: "", excerptDe: "",
    contentEn: "", contentEs: "", contentPt: "", contentFr: "", contentDe: "",
    metaTitleEn: "", metaTitleEs: "", metaTitlePt: "", metaTitleFr: "", metaTitleDe: "",
    metaDescriptionEn: "", metaDescriptionEs: "", metaDescriptionPt: "", metaDescriptionFr: "", metaDescriptionDe: "",
    featuredImage: "", ogImage: "", categoryId: "", tags: [],
    relatedCalculator: "", status: "DRAFT", scheduledAt: "", readingTime: 5,
  });

  // ── Data fetching ──
  useEffect(() => {
    fetchCategories();
    if (isEditing) fetchPost();
  }, [isEditing]);

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/admin/blog/categories");
      const data = await res.json();
      setCategories(data.categories || []);
    } catch (error) { console.error("Error fetching categories:", error); }
  };

  const fetchPost = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/blog/${params?.id}`);
      const data = await res.json();
      if (data.post) {
        setForm((prev) => ({
          ...prev,
          ...data.post,
          categoryId: data.post.categoryId || "",
          tags: data.post.tags || [],
          scheduledAt: data.post.scheduledAt || "",
          ...Object.fromEntries(
            LANGS.flatMap((l) =>
              ["title", "slug", "excerpt", "content", "metaTitle", "metaDescription"].map((f) => [
                `${f}${cap(l.code)}`,
                data.post[`${f}${cap(l.code)}`] || "",
              ])
            )
          ),
        }));
      }
    } catch (error) { console.error("Error fetching post:", error); }
    setLoading(false);
  };

  // ── Helpers ──
  const generateSlug = (title: string) =>
    title.toLowerCase()
      .replace(/[áàäâã]/g, "a").replace(/[éèëê]/g, "e").replace(/[íìïî]/g, "i")
      .replace(/[óòöôõ]/g, "o").replace(/[úùüûũ]/g, "u").replace(/ñ/g, "n")
      .replace(/ç/g, "c").replace(/ß/g, "ss")
      .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  const handleTitleChange = (lang: Lang, value: string) => {
    setForm((prev) => ({
      ...prev,
      [langField("title", lang)]: value,
      [langField("slug", lang)]: generateSlug(value),
    }));
  };

  const handleChange = (field: keyof PostFormData, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const addTag = () => {
    if (newTag.trim() && !form.tags.includes(newTag.trim())) {
      setForm((prev) => ({ ...prev, tags: [...prev.tags, newTag.trim().toLowerCase()] }));
      setNewTag("");
    }
  };

  const removeTag = (tag: string) => {
    setForm((prev) => ({ ...prev, tags: prev.tags.filter((t) => t !== tag) }));
  };

  const calculateReadingTime = (content: string) => {
    const words = content.trim().split(/\s+/).length;
    return Math.ceil(words / 200) || 1;
  };

  const wordCount = (form[langField("content", activeTab)] as string).trim().split(/\s+/).filter(Boolean).length;

  // ── Translation stats ──
  function langStatus(lang: Lang): "complete" | "partial" | "empty" {
    const t = form[langField("title", lang)] as string;
    const c = form[langField("content", lang)] as string;
    if (t && c) return "complete";
    if (t || c) return "partial";
    return "empty";
  }

  const translationCount = LANGS.filter((l) => langStatus(l.code) === "complete").length;

  // ── SEO score ──
  function seoScore(): { score: number; issues: string[] } {
    const issues: string[] = [];
    let score = 0;
    if (form.featuredImage) score += 20; else issues.push("No featured image");
    const excerpt = form[langField("excerpt", activeTab)] as string;
    if (excerpt && excerpt.length >= 50) score += 20; else issues.push("Excerpt too short or missing");
    const metaTitle = form[langField("metaTitle", activeTab)] as string;
    if (metaTitle && metaTitle.length >= 30) score += 20; else issues.push("Meta title too short or missing");
    const metaDesc = form[langField("metaDescription", activeTab)] as string;
    if (metaDesc && metaDesc.length >= 80) score += 20; else issues.push("Meta description too short or missing");
    if (translationCount >= 3) score += 20; else issues.push(`Only ${translationCount}/5 languages`);
    return { score, issues };
  }

  const { score: currentSeoScore, issues: seoIssues } = seoScore();

  // ── Save ──
  const handleSave = async (asDraft = false) => {
    if (!form.titleEn.trim()) { alert("English title is required"); return; }
    setSaving(true);
    try {
      const payload = {
        ...form,
        status: asDraft ? "DRAFT" : form.status,
        readingTime: calculateReadingTime(form.contentEn),
      };
      const url = isEditing ? `/api/admin/blog/${params?.id}` : "/api/admin/blog";
      const method = isEditing ? "PUT" : "POST";
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (res.ok) {
        setSaveSuccess(true);
        setTimeout(() => router.push("/en/admin/blog"), 800);
      } else {
        const error = await res.json();
        alert(error.message || "Error saving post");
      }
    } catch (error) { console.error("Error saving post:", error); alert("Error saving post"); }
    setSaving(false);
  };

  // ── Markdown toolbar ──
  const insertMarkdown = (before: string, after = "") => {
    const textarea = document.getElementById("content-editor") as HTMLTextAreaElement;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = form[langField("content", activeTab)] as string;
    const selected = text.substring(start, end);
    const newText = text.substring(0, start) + before + selected + after + text.substring(end);
    handleChange(langField("content", activeTab), newText);
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, start + before.length + selected.length);
    }, 0);
  };

  // ── Loading ──
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-3">
        <div className="w-10 h-10 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-600">Loading post...</p>
      </div>
    );
  }

  // ── Save success flash ──
  if (saveSuccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-3">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-lg font-semibold text-slate-900">Post saved successfully!</p>
        <p className="text-slate-500">Redirecting...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link
            href="/en/admin/blog"
            className="p-2.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <div>
            <h1 className="text-lg sm:text-lg sm:text-xl sm:text-2xl font-bold text-slate-900">
              {isEditing ? "Edit Post" : "New Post"}
            </h1>
            <p className="text-slate-500 mt-0.5 text-sm">
              {isEditing ? "Update your blog article across 5 languages" : "Create a new multilingual blog article"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {/* Translation progress mini */}
          <div className="hidden md:flex items-center gap-1.5 px-3 py-2 bg-slate-50 rounded-lg border border-slate-200">
            {LANGS.map((l) => {
              const s = langStatus(l.code);
              return (
                <span
                  key={l.code}
                  className={`text-sm transition-opacity ${s === "complete" ? "opacity-100" : s === "partial" ? "opacity-50" : "opacity-20 grayscale"}`}
                  title={`${l.name}: ${s}`}
                >
                  {l.flag}
                </span>
              );
            })}
            <span className="text-xs text-slate-500 ml-1">{translationCount}/5</span>
          </div>
          <button
            onClick={() => handleSave(true)}
            disabled={saving}
            className="px-4 py-2.5 border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors font-medium disabled:opacity-50"
          >
            Save Draft
          </button>
          <button
            onClick={() => handleSave(false)}
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 shadow-sm"
          >
            {saving && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>}
            {isEditing ? (form.status === "PUBLISHED" ? "Update" : "Publish") : "Publish"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* ══════════════════ MAIN CONTENT (2/3) ══════════════════ */}
        <div className="xl:col-span-2 space-y-4 sm:space-y-6">

          {/* ── Language Tabs ── */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            {/* Tab bar */}
            <div className="flex border-b border-slate-200 bg-slate-50/50">
              {LANGS.map((lang) => {
                const s = langStatus(lang.code);
                return (
                  <button
                    key={lang.code}
                    onClick={() => setActiveTab(lang.code)}
                    className={`relative flex-1 py-3.5 px-2 text-sm font-medium transition-all ${
                      activeTab === lang.code
                        ? "bg-white text-blue-600 shadow-sm"
                        : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center justify-center gap-1.5">
                      <span className="text-base">{lang.flag}</span>
                      <span className="hidden sm:inline">{lang.label}</span>
                      <span className="sm:hidden text-xs uppercase">{lang.code}</span>
                      {/* Status dot */}
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        s === "complete" ? "bg-emerald-500" : s === "partial" ? "bg-amber-400" : "bg-slate-300"
                      }`} />
                    </div>
                    {activeTab === lang.code && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Content area */}
            <div className="p-6 space-y-5">
              {/* Title */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                  Title
                  {activeTab === "en" && <span className="text-xs font-normal text-red-500 bg-red-50 px-1.5 py-0.5 rounded">Required</span>}
                  {activeTab !== "en" && langStatus(activeTab) === "empty" && (
                    <span className="text-xs font-normal text-slate-400">Optional — use translation script</span>
                  )}
                </label>
                <input
                  type="text"
                  value={form[langField("title", activeTab)] as string}
                  onChange={(e) => handleTitleChange(activeTab, e.target.value)}
                  placeholder={`Enter title in ${LANGS.find((l) => l.code === activeTab)?.name}...`}
                  className="w-full px-4 py-3 text-lg border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white placeholder:text-slate-300"
                />
              </div>

              {/* Slug */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">URL Slug</label>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-400 bg-slate-50 px-3 py-2.5 rounded-l-xl border border-r-0 border-slate-200">
                    /{activeTab}/blog/
                  </span>
                  <input
                    type="text"
                    value={form[langField("slug", activeTab)] as string}
                    onChange={(e) => handleChange(langField("slug", activeTab), e.target.value)}
                    className="flex-1 px-4 py-2.5 border border-slate-200 rounded-r-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                  />
                </div>
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Excerpt</label>
                <textarea
                  value={form[langField("excerpt", activeTab)] as string}
                  onChange={(e) => handleChange(langField("excerpt", activeTab), e.target.value)}
                  placeholder="Brief summary — appears in blog listing and social shares..."
                  rows={3}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none placeholder:text-slate-300"
                />
              </div>

              {/* Content Editor */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-semibold text-slate-700">Content (Markdown)</label>
                  <span className="text-xs text-slate-400">{wordCount} words · ~{Math.ceil(wordCount / 200)} min read</span>
                </div>
                <div className="border border-slate-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent">
                  {/* Toolbar */}
                  <div className="flex items-center gap-0.5 p-2 bg-slate-50 border-b border-slate-200">
                    <button onClick={() => insertMarkdown("**", "**")} className="p-2 text-slate-600 hover:bg-white hover:shadow-sm rounded-lg transition-all" title="Bold">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24"><path d="M6 4h8a4 4 0 014 4 4 4 0 01-4 4H6z M6 12h9a4 4 0 014 4 4 4 0 01-4 4H6z" /></svg>
                    </button>
                    <button onClick={() => insertMarkdown("*", "*")} className="p-2 text-slate-600 hover:bg-white hover:shadow-sm rounded-lg transition-all" title="Italic">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M19 4h-9 M14 20H5 M15 4L9 20" /></svg>
                    </button>
                    <div className="w-px h-5 bg-slate-300 mx-1" />
                    <button onClick={() => insertMarkdown("# ")} className="p-2 text-slate-600 hover:bg-white hover:shadow-sm rounded-lg transition-all text-xs font-bold" title="H1">H1</button>
                    <button onClick={() => insertMarkdown("## ")} className="p-2 text-slate-600 hover:bg-white hover:shadow-sm rounded-lg transition-all text-xs font-bold" title="H2">H2</button>
                    <button onClick={() => insertMarkdown("### ")} className="p-2 text-slate-600 hover:bg-white hover:shadow-sm rounded-lg transition-all text-xs font-bold" title="H3">H3</button>
                    <div className="w-px h-5 bg-slate-300 mx-1" />
                    <button onClick={() => insertMarkdown("[", "](url)")} className="p-2 text-slate-600 hover:bg-white hover:shadow-sm rounded-lg transition-all" title="Link">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                    </button>
                    <button onClick={() => insertMarkdown("![alt](", ")")} className="p-2 text-slate-600 hover:bg-white hover:shadow-sm rounded-lg transition-all" title="Image">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    </button>
                    <button onClick={() => insertMarkdown("- ")} className="p-2 text-slate-600 hover:bg-white hover:shadow-sm rounded-lg transition-all" title="List">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
                    </button>
                    <button onClick={() => insertMarkdown("> ")} className="p-2 text-slate-600 hover:bg-white hover:shadow-sm rounded-lg transition-all" title="Quote">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
                    </button>
                    <button onClick={() => insertMarkdown("```\n", "\n```")} className="p-2 text-slate-600 hover:bg-white hover:shadow-sm rounded-lg transition-all" title="Code Block">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                    </button>
                  </div>
                  <textarea
                    id="content-editor"
                    value={form[langField("content", activeTab)] as string}
                    onChange={(e) => handleChange(langField("content", activeTab), e.target.value)}
                    placeholder={`Write your content in ${LANGS.find((l) => l.code === activeTab)?.name} using Markdown...`}
                    rows={18}
                    className="w-full px-5 py-4 focus:outline-none resize-none font-mono text-sm leading-relaxed placeholder:text-slate-300"
                  />
                </div>
              </div>

              {/* SEO Fields (collapsible) */}
              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setShowSeoPanel(!showSeoPanel)}
                  className="flex items-center justify-between w-full p-4 bg-slate-50 hover:bg-slate-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">🔍</span>
                    <div className="text-left">
                      <p className="font-semibold text-slate-700 text-sm">SEO Settings</p>
                      <p className="text-xs text-slate-500">Meta title & description for {LANGS.find((l) => l.code === activeTab)?.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {/* SEO score badge */}
                    <span className={`px-2 py-1 rounded-lg text-xs font-semibold ${
                      currentSeoScore >= 80 ? "bg-emerald-100 text-emerald-700" :
                      currentSeoScore >= 50 ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"
                    }`}>
                      {currentSeoScore}%
                    </span>
                    <svg className={`w-5 h-5 text-slate-400 transition-transform ${showSeoPanel ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
                {showSeoPanel && (
                  <div className="p-5 space-y-4 border-t border-slate-200">
                    {seoIssues.length > 0 && (
                      <div className="flex flex-wrap gap-2 pb-3 border-b border-slate-100">
                        {seoIssues.map((issue, i) => (
                          <span key={i} className="text-xs px-2 py-1 bg-amber-50 text-amber-700 rounded-lg">⚠️ {issue}</span>
                        ))}
                      </div>
                    )}
                    <div>
                      <label className="flex items-center justify-between text-sm text-slate-600 mb-1.5">
                        <span>Meta Title</span>
                        <span className={`text-xs ${(form[langField("metaTitle", activeTab)] as string).length > 55 ? "text-red-500" : "text-slate-400"}`}>
                          {(form[langField("metaTitle", activeTab)] as string).length}/60
                        </span>
                      </label>
                      <input
                        type="text"
                        value={form[langField("metaTitle", activeTab)] as string}
                        onChange={(e) => handleChange(langField("metaTitle", activeTab), e.target.value)}
                        placeholder="SEO title (max 60 characters)"
                        maxLength={60}
                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="flex items-center justify-between text-sm text-slate-600 mb-1.5">
                        <span>Meta Description</span>
                        <span className={`text-xs ${(form[langField("metaDescription", activeTab)] as string).length > 150 ? "text-red-500" : "text-slate-400"}`}>
                          {(form[langField("metaDescription", activeTab)] as string).length}/155
                        </span>
                      </label>
                      <textarea
                        value={form[langField("metaDescription", activeTab)] as string}
                        onChange={(e) => handleChange(langField("metaDescription", activeTab), e.target.value)}
                        placeholder="SEO description (max 155 characters)"
                        maxLength={155}
                        rows={2}
                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      />
                    </div>
                    {/* Google preview */}
                    <div className="p-4 bg-slate-50 rounded-xl">
                      <p className="text-xs text-slate-400 mb-2">Google Preview</p>
                      <p className="text-blue-700 text-base font-medium truncate">
                        {(form[langField("metaTitle", activeTab)] as string) || "Post title will appear here"}
                      </p>
                      <p className="text-emerald-700 text-xs truncate mt-0.5">
                        kalcufy.com/{activeTab}/blog/{(form[langField("slug", activeTab)] as string) || "your-post-slug"}
                      </p>
                      <p className="text-slate-600 text-sm mt-1 line-clamp-2">
                        {(form[langField("metaDescription", activeTab)] as string) || "Your meta description will appear here in Google search results..."}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ── Translation Overview Card ── */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
            <h3 className="font-semibold text-slate-900 mb-4">Translation Status</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {LANGS.map((lang) => {
                const s = langStatus(lang.code);
                const title = form[langField("title", lang.code)] as string;
                const content = form[langField("content", lang.code)] as string;
                const contentWords = content.trim().split(/\s+/).filter(Boolean).length;
                return (
                  <button
                    key={lang.code}
                    onClick={() => setActiveTab(lang.code)}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      activeTab === lang.code
                        ? "border-blue-300 bg-blue-50 ring-1 ring-blue-200"
                        : s === "complete" ? "border-emerald-200 bg-emerald-50 hover:bg-emerald-100"
                        : s === "partial" ? "border-amber-200 bg-amber-50 hover:bg-amber-100"
                        : "border-slate-200 bg-slate-50 hover:bg-slate-100"
                    }`}
                  >
                    <span className="text-2xl block mb-1">{lang.flag}</span>
                    <p className="text-xs font-semibold text-slate-700">{lang.code.toUpperCase()}</p>
                    <p className={`text-xs mt-1 ${
                      s === "complete" ? "text-emerald-600" : s === "partial" ? "text-amber-600" : "text-slate-400"
                    }`}>
                      {s === "complete" ? `✓ ${contentWords}w` : s === "partial" ? "Partial" : "Empty"}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ══════════════════ SIDEBAR (1/3) ══════════════════ */}
        <div className="space-y-5">

          {/* Status & Publish */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
            <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Publish
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-slate-600 mb-1.5">Status</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {statusOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => handleChange("status", opt.value)}
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                        form.status === opt.value
                          ? `${opt.color} border-current ring-1 ring-current/20`
                          : "border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <span>{opt.icon}</span>
                      <span>{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {form.status === "SCHEDULED" && (
                <div>
                  <label className="block text-sm text-slate-600 mb-1.5">Schedule Date</label>
                  <input
                    type="datetime-local"
                    value={form.scheduledAt}
                    onChange={(e) => handleChange("scheduledAt", e.target.value)}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm text-slate-600 mb-1.5">Reading Time</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={form.readingTime}
                    onChange={(e) => handleChange("readingTime", parseInt(e.target.value) || 1)}
                    min={1}
                    className="w-20 px-3 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center"
                  />
                  <span className="text-sm text-slate-500">minutes</span>
                  <button
                    onClick={() => handleChange("readingTime", calculateReadingTime(form.contentEn))}
                    className="ml-auto text-xs text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Auto-calculate
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Category */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>
                Category
              </h3>
              <Link href="/en/admin/blog/categories" className="text-xs text-blue-600 hover:text-blue-700 font-medium">Manage</Link>
            </div>
            <div className="space-y-2">
              {categories.map((cat) => (
                <label
                  key={cat.id}
                  className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                    form.categoryId === cat.id
                      ? `${colorClasses[cat.color]} border-current ring-1 ring-current/20`
                      : "border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <input type="radio" name="category" value={cat.id} checked={form.categoryId === cat.id} onChange={(e) => handleChange("categoryId", e.target.value)} className="sr-only" />
                  <span className="text-lg">{cat.icon}</span>
                  <span className="font-medium text-sm">{cat.nameEn}</span>
                </label>
              ))}
              {categories.length === 0 && (
                <p className="text-sm text-slate-400 text-center py-4">No categories yet</p>
              )}
            </div>
          </div>

          {/* Featured Image */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
            <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              Featured Image
            </h3>
            {form.featuredImage ? (
              <div className="relative group">
                <img src={form.featuredImage} alt="Featured" className="w-full h-36 object-cover rounded-xl" />
                <button
                  onClick={() => handleChange("featuredImage", "")}
                  className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center">
                <svg className="w-8 h-8 text-slate-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                <p className="text-xs text-slate-400">Paste image URL below</p>
              </div>
            )}
            <input
              type="text"
              value={form.featuredImage}
              onChange={(e) => handleChange("featuredImage", e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="w-full mt-3 px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>

          {/* Related Calculator */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
            <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
              Related Calculator
            </h3>
            <select
              value={form.relatedCalculator}
              onChange={(e) => handleChange("relatedCalculator", e.target.value)}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm"
            >
              <option value="">None</option>
              {calculators.map((calc) => (
                <option key={calc.slug} value={calc.slug}>{calc.name}</option>
              ))}
            </select>
          </div>

          {/* Tags */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
            <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" /></svg>
              Tags
            </h3>
            {form.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {form.tags.map((tag) => (
                  <span key={tag} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium">
                    {tag}
                    <button onClick={() => removeTag(tag)} className="text-slate-400 hover:text-red-500 transition-colors">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </span>
                ))}
              </div>
            )}
            <div className="flex gap-2">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                placeholder="Add tag..."
                className="flex-1 px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
              <button onClick={addTag} className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors font-medium text-sm">
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
