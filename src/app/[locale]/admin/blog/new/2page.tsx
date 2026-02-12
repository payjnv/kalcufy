"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

// ═══════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════
interface BlogCategory {
  id: string; slug: string; nameEn: string; nameEs: string | null; namePt: string | null; nameFr: string | null; nameDe: string | null; icon: string; color: string;
}

interface PostFormData {
  titleEn: string; titleEs: string; titlePt: string; titleFr: string; titleDe: string;
  slugEn: string; slugEs: string; slugPt: string; slugFr: string; slugDe: string;
  excerptEn: string; excerptEs: string; excerptPt: string; excerptFr: string; excerptDe: string;
  contentEn: string; contentEs: string; contentPt: string; contentFr: string; contentDe: string;
  metaTitleEn: string; metaTitleEs: string; metaTitlePt: string; metaTitleFr: string; metaTitleDe: string;
  metaDescriptionEn: string; metaDescriptionEs: string; metaDescriptionPt: string; metaDescriptionFr: string; metaDescriptionDe: string;
  featuredImage: string; ogImage: string; categoryId: string; tags: string[];
  relatedCalculator: string; status: "DRAFT" | "PUBLISHED" | "SCHEDULED" | "ARCHIVED"; scheduledAt: string; readingTime: number;
}

type Lang = "en" | "es" | "pt" | "fr" | "de";
type EditorMode = "write" | "preview" | "split" | "html";

// ═══════════════════════════════════════════════════════════════════════════
// CONSTANTS
// ═══════════════════════════════════════════════════════════════════════════
const LANGS: { code: Lang; label: string; flag: string; name: string }[] = [
  { code: "en", label: "English", flag: "🇺🇸", name: "English" },
  { code: "es", label: "Español", flag: "🇪🇸", name: "Spanish" },
  { code: "pt", label: "Português", flag: "🇧🇷", name: "Portuguese" },
  { code: "fr", label: "Français", flag: "🇫🇷", name: "French" },
  { code: "de", label: "Deutsch", flag: "🇩🇪", name: "German" },
];

const calculators = [
  { slug: "compound-interest", name: "Compound Interest", icon: "💰" },
  { slug: "mortgage", name: "Mortgage Calculator", icon: "🏠" },
  { slug: "loan", name: "Loan Calculator", icon: "💳" },
  { slug: "auto-loan", name: "Auto Loan Calculator", icon: "🚗" },
  { slug: "savings", name: "Savings Calculator", icon: "🐷" },
  { slug: "retirement", name: "Retirement Calculator", icon: "👴" },
  { slug: "credit-card-payoff", name: "Credit Card Payoff", icon: "💳" },
  { slug: "bmi", name: "BMI Calculator", icon: "⚖️" },
  { slug: "calorie", name: "Calorie Calculator", icon: "🔥" },
  { slug: "body-fat", name: "Body Fat Calculator", icon: "📊" },
  { slug: "ideal-weight", name: "Ideal Weight", icon: "🎯" },
  { slug: "one-rep-max", name: "One Rep Max", icon: "🏋️" },
];

const colorClasses: Record<string, string> = {
  blue: "bg-blue-100 text-blue-700 border-blue-200", green: "bg-emerald-100 text-emerald-700 border-emerald-200",
  purple: "bg-purple-100 text-purple-700 border-purple-200", amber: "bg-amber-100 text-amber-800 border-amber-200",
  red: "bg-red-100 text-red-700 border-red-200", indigo: "bg-indigo-100 text-indigo-700 border-indigo-200",
  cyan: "bg-cyan-100 text-cyan-700 border-cyan-200", pink: "bg-pink-100 text-pink-700 border-pink-200",
};

const statusOpts = [
  { value: "DRAFT", label: "Draft", icon: "✏️", cls: "bg-amber-100 text-amber-800" },
  { value: "PUBLISHED", label: "Published", icon: "✅", cls: "bg-emerald-100 text-emerald-700" },
  { value: "SCHEDULED", label: "Scheduled", icon: "📅", cls: "bg-blue-100 text-blue-700" },
  { value: "ARCHIVED", label: "Archived", icon: "📦", cls: "bg-slate-100 text-slate-700" },
];

function cap(s: string) { return s.charAt(0).toUpperCase() + s.slice(1); }
function lf(prefix: string, lang: Lang): keyof PostFormData { return `${prefix}${cap(lang)}` as keyof PostFormData; }

function markdownToHtml(md: string): string {
  if (!md) return "<p class='text-slate-400 italic'>Start writing to see preview...</p>";
  let h = md
    .replace(/```(\w*)\n([\s\S]*?)```/g, '<pre class="bg-slate-900 text-green-400 p-4 rounded-xl overflow-x-auto text-sm my-4"><code>$2</code></pre>')
    .replace(/`([^`]+)`/g, '<code class="bg-slate-100 text-pink-600 px-1.5 py-0.5 rounded text-sm font-mono">$1</code>')
    .replace(/^### (.+)$/gm, '<h3 class="text-lg font-bold text-slate-900 mt-6 mb-2">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-xl font-bold text-slate-900 mt-8 mb-3">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 class="text-lg sm:text-lg sm:text-2xl font-bold text-slate-900 mt-8 mb-4">$1</h1>')
    .replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em class="italic">$1</em>')
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="rounded-xl max-w-full my-4 shadow-sm" />')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 underline hover:text-blue-800" target="_blank">$1</a>')
    .replace(/^> (.+)$/gm, '<blockquote class="border-l-4 border-blue-400 pl-4 py-1 my-4 text-slate-600 italic bg-blue-50/50 rounded-r-lg">$1</blockquote>')
    .replace(/^---$/gm, '<hr class="my-8 border-slate-200" />')
    .replace(/^- (.+)$/gm, '<li class="ml-4 list-disc text-slate-700">$1</li>')
    .replace(/^\d+\. (.+)$/gm, '<li class="ml-4 list-decimal text-slate-700">$1</li>')
    .replace(/\[calculator:([^\]]+)\]/g, '<div class="p-4 my-4 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl flex items-center gap-3"><span class="text-2xl">🧮</span><div><p class="font-semibold text-blue-900">Embedded Calculator</p><p class="text-sm text-blue-700">$1</p></div></div>')
    .replace(/\n\n/g, '</p><p class="text-slate-700 leading-relaxed my-3">')
    .replace(/\n/g, '<br />');
  h = h.replace(/((<li[^>]*>.*?<\/li>\s*)+)/g, '<ul class="my-4 space-y-1">$1</ul>');
  return `<p class="text-slate-700 leading-relaxed my-3">${h}</p>`;
}

// ═══════════════════════════════════════════════════════════════════════════
// MODAL COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════
const Overlay = ({ children, onClose }: { children: React.ReactNode; onClose: () => void }) => (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md" onClick={(e) => e.stopPropagation()}>{children}</div>
  </div>
);

const ModalHeader = ({ title, onClose }: { title: string; onClose: () => void }) => (
  <div className="flex items-center justify-between p-5 pb-0">
    <h3 className="text-lg font-bold text-slate-900">{title}</h3>
    <button onClick={onClose} className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
  </div>
);

function LinkModal({ open, onClose, onInsert }: { open: boolean; onClose: () => void; onInsert: (t: string, u: string) => void }) {
  const [text, setText] = useState("");
  const [url, setUrl] = useState("https://");
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => { if (open) { setText(""); setUrl("https://"); setTimeout(() => ref.current?.focus(), 100); } }, [open]);
  if (!open) return null;
  const valid = url && url !== "https://";
  return (
    <Overlay onClose={onClose}>
      <ModalHeader title="🔗 Insert Link" onClose={onClose} />
      <div className="p-5 space-y-4">
        <div><label className="block text-sm font-medium text-slate-700 mb-1">Link Text</label><input ref={ref} type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Click here" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" onKeyDown={(e) => { if (e.key === "Enter" && valid) { onInsert(text || url, url); onClose(); } }} /></div>
        <div><label className="block text-sm font-medium text-slate-700 mb-1">URL</label><input type="url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://example.com" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm" onKeyDown={(e) => { if (e.key === "Enter" && valid) { onInsert(text || url, url); onClose(); } }} /></div>
        {valid && <div className="p-3 bg-slate-50 rounded-xl text-sm"><span className="text-slate-500">Preview: </span><a href={url} className="text-blue-600 underline">{text || url}</a></div>}
        <div className="flex justify-end gap-3"><button onClick={onClose} className="px-4 py-2.5 text-slate-600 hover:bg-slate-100 rounded-xl font-medium">Cancel</button><button onClick={() => { onInsert(text || url, url); onClose(); }} disabled={!valid} className="px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-medium disabled:opacity-40">Insert</button></div>
      </div>
    </Overlay>
  );
}

function ImageModal({ open, onClose, onInsert }: { open: boolean; onClose: () => void; onInsert: (a: string, u: string) => void }) {
  const [alt, setAlt] = useState("");
  const [url, setUrl] = useState("");
  useEffect(() => { if (open) { setAlt(""); setUrl(""); } }, [open]);
  if (!open) return null;
  return (
    <Overlay onClose={onClose}>
      <ModalHeader title="🖼️ Insert Image" onClose={onClose} />
      <div className="p-5 space-y-4">
        <div><label className="block text-sm font-medium text-slate-700 mb-1">Image URL</label><input type="url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://images.unsplash.com/..." className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm" /></div>
        <div><label className="block text-sm font-medium text-slate-700 mb-1">Alt Text (SEO)</label><input type="text" value={alt} onChange={(e) => setAlt(e.target.value)} placeholder="Description of image" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" /></div>
        {url && <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-50"><img src={url} alt={alt} className="w-full h-40 object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} /></div>}
        <div className="flex justify-end gap-3"><button onClick={onClose} className="px-4 py-2.5 text-slate-600 hover:bg-slate-100 rounded-xl font-medium">Cancel</button><button onClick={() => { onInsert(alt, url); onClose(); }} disabled={!url} className="px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-medium disabled:opacity-40">Insert</button></div>
      </div>
    </Overlay>
  );
}

function CalcEmbedModal({ open, onClose, onInsert }: { open: boolean; onClose: () => void; onInsert: (s: string) => void }) {
  const [search, setSearch] = useState("");
  const filtered = calculators.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()));
  useEffect(() => { if (open) setSearch(""); }, [open]);
  if (!open) return null;
  return (
    <Overlay onClose={onClose}>
      <ModalHeader title="🧮 Embed Calculator" onClose={onClose} />
      <div className="p-5 space-y-3">
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search calculators..." className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <div className="max-h-64 overflow-y-auto space-y-1">
          {filtered.map((c) => (<button key={c.slug} onClick={() => { onInsert(c.slug); onClose(); }} className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-blue-50 transition-colors text-left"><span className="text-xl">{c.icon}</span><div><p className="font-medium text-slate-900 text-sm">{c.name}</p><p className="text-xs text-slate-400">/{c.slug}</p></div></button>))}
          {filtered.length === 0 && <p className="text-sm text-slate-400 text-center py-4">No calculators found</p>}
        </div>
      </div>
    </Overlay>
  );
}

function PostPreviewModal({ open, onClose, form, lang }: { open: boolean; onClose: () => void; form: PostFormData; lang: Lang }) {
  if (!open) return null;
  const title = form[lf("title", lang)] as string;
  const content = form[lf("content", lang)] as string;
  const excerpt = form[lf("excerpt", lang)] as string;
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-5 border-b border-slate-200 bg-slate-50 shrink-0">
          <div className="flex items-center gap-3"><span className="text-lg">👁️</span><div><h3 className="font-bold text-slate-900">Post Preview</h3><p className="text-xs text-slate-500">{LANGS.find((l) => l.code === lang)?.name} version</p></div></div>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-xl"><svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
        </div>
        <div className="overflow-y-auto flex-1 p-8">
          {form.featuredImage && <img src={form.featuredImage} alt="" className="w-full h-56 object-cover rounded-2xl mb-8" />}
          <article className="max-w-2xl mx-auto">
            <h1 className="text-xl sm:text-xl sm:text-3xl font-bold text-slate-900 mb-4 leading-tight">{title || "Untitled Post"}</h1>
            {excerpt && <p className="text-lg text-slate-500 mb-8 leading-relaxed">{excerpt}</p>}
            <hr className="mb-8 border-slate-200" />
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: markdownToHtml(content) }} />
          </article>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════
export default function AdminBlogEditorPage() {
  const router = useRouter();
  const params = useParams();
  const isEditing = params?.id && params.id !== "new";
  const editorRef = useRef<HTMLTextAreaElement>(null);

  const [activeTab, setActiveTab] = useState<Lang>("en");
  const [editorMode, setEditorMode] = useState<EditorMode>("split");
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [newTag, setNewTag] = useState("");
  const [showSeo, setShowSeo] = useState(false);
  const [translating, setTranslating] = useState(false);
  const [translateMsg, setTranslateMsg] = useState("");

  const [showLinkM, setShowLinkM] = useState(false);
  const [showImgM, setShowImgM] = useState(false);
  const [showCalcM, setShowCalcM] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const emptyForm: PostFormData = {
    titleEn: "", titleEs: "", titlePt: "", titleFr: "", titleDe: "",
    slugEn: "", slugEs: "", slugPt: "", slugFr: "", slugDe: "",
    excerptEn: "", excerptEs: "", excerptPt: "", excerptFr: "", excerptDe: "",
    contentEn: "", contentEs: "", contentPt: "", contentFr: "", contentDe: "",
    metaTitleEn: "", metaTitleEs: "", metaTitlePt: "", metaTitleFr: "", metaTitleDe: "",
    metaDescriptionEn: "", metaDescriptionEs: "", metaDescriptionPt: "", metaDescriptionFr: "", metaDescriptionDe: "",
    featuredImage: "", ogImage: "", categoryId: "", tags: [],
    relatedCalculator: "", status: "DRAFT", scheduledAt: "", readingTime: 5,
  };
  const [form, setForm] = useState<PostFormData>(emptyForm);

  useEffect(() => { fetchCategories(); if (isEditing) fetchPost(); }, [isEditing]);

  const fetchCategories = async () => {
    try { const r = await fetch("/api/admin/blog/categories"); const d = await r.json(); setCategories(d.categories || []); } catch (e) { console.error(e); }
  };

  const fetchPost = async () => {
    setLoading(true);
    try {
      const r = await fetch(`/api/admin/blog/${params?.id}`);
      const d = await r.json();
      if (d.post) {
        setForm((p) => ({
          ...p, ...d.post, categoryId: d.post.categoryId || "", tags: d.post.tags || [], scheduledAt: d.post.scheduledAt || "",
          ...Object.fromEntries(LANGS.flatMap((l) => ["title", "slug", "excerpt", "content", "metaTitle", "metaDescription"].map((f) => [`${f}${cap(l.code)}`, d.post[`${f}${cap(l.code)}`] || ""]))),
        }));
      }
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  const genSlug = (t: string) => t.toLowerCase().replace(/[áàäâã]/g, "a").replace(/[éèëê]/g, "e").replace(/[íìïî]/g, "i").replace(/[óòöôõ]/g, "o").replace(/[úùüûũ]/g, "u").replace(/ñ/g, "n").replace(/ç/g, "c").replace(/ß/g, "ss").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  const handleTitleChange = (lang: Lang, v: string) => { setForm((p) => ({ ...p, [lf("title", lang)]: v, [lf("slug", lang)]: genSlug(v) })); };
  const set = (field: keyof PostFormData, v: any) => { setForm((p) => ({ ...p, [field]: v })); };
  const addTag = () => { if (newTag.trim() && !form.tags.includes(newTag.trim())) { setForm((p) => ({ ...p, tags: [...p.tags, newTag.trim().toLowerCase()] })); setNewTag(""); } };
  const removeTag = (t: string) => { setForm((p) => ({ ...p, tags: p.tags.filter((x) => x !== t) })); };
  const calcRT = (c: string) => Math.ceil(c.trim().split(/\s+/).length / 200) || 1;

  const content = form[lf("content", activeTab)] as string;
  const wc = content.trim().split(/\s+/).filter(Boolean).length;

  function ls(lang: Lang): "complete" | "partial" | "empty" {
    const t = form[lf("title", lang)] as string;
    const c = form[lf("content", lang)] as string;
    if (t && c) return "complete";
    if (t || c) return "partial";
    return "empty";
  }
  const trCount = LANGS.filter((l) => ls(l.code) === "complete").length;

  function seoScore() {
    const iss: string[] = [];
    let s = 0;
    if (form.featuredImage) s += 20; else iss.push("No featured image");
    if (((form[lf("excerpt", activeTab)] as string) || "").length >= 50) s += 20; else iss.push("Excerpt too short");
    if (((form[lf("metaTitle", activeTab)] as string) || "").length >= 30) s += 20; else iss.push("Meta title too short");
    if (((form[lf("metaDescription", activeTab)] as string) || "").length >= 80) s += 20; else iss.push("Meta desc too short");
    if (trCount >= 3) s += 20; else iss.push(`Only ${trCount}/5 langs`);
    return { s, iss };
  }
  const { s: seoS, iss: seoIss } = seoScore();

  const ins = useCallback((before: string, after = "") => {
    const ta = editorRef.current;
    if (!ta) return;
    const st = ta.selectionStart, en = ta.selectionEnd;
    const sel = content.substring(st, en);
    set(lf("content", activeTab), content.substring(0, st) + before + sel + after + content.substring(en));
    setTimeout(() => { ta.focus(); ta.setSelectionRange(st + before.length, st + before.length + sel.length); }, 0);
  }, [activeTab, content]);

  const handleSave = async (draft = false) => {
    if (!form.titleEn.trim()) { alert("English title is required"); return; }
    setSaving(true);
    try {
      const payload = { ...form, status: draft ? "DRAFT" : form.status, readingTime: calcRT(form.contentEn) };
      const url = isEditing ? `/api/admin/blog/${params?.id}` : "/api/admin/blog";
      const res = await fetch(url, { method: isEditing ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (res.ok) { setSaveSuccess(true); setTimeout(() => router.push("/en/admin/blog"), 800); }
      else { const e = await res.json(); alert(e.message || "Error saving"); }
    } catch (e) { console.error(e); alert("Error saving"); }
    setSaving(false);
  };

  const handleTranslate = async () => {
    if (!form.titleEn || !form.contentEn) { alert("Write English version first"); return; }
    if (!confirm("Translate EN to all empty languages using AI?")) return;
    setTranslating(true); setTranslateMsg("Translating...");
    const empty = LANGS.filter((l) => l.code !== "en" && ls(l.code) !== "complete");
    if (!empty.length) { setTranslating(false); setTranslateMsg("All languages complete!"); setTimeout(() => setTranslateMsg(""), 3000); return; }
    try {
      let pid = params?.id as string;
      if (!isEditing) {
        setTranslateMsg("Saving draft...");
        const sr = await fetch("/api/admin/blog", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, status: "DRAFT", readingTime: calcRT(form.contentEn) }) });
        if (!sr.ok) { alert("Save failed"); setTranslating(false); return; }
        const sd = await sr.json(); pid = sd.post?.id;
      } else {
        setTranslateMsg("Saving...");
        await fetch(`/api/admin/blog/${pid}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, readingTime: calcRT(form.contentEn) }) });
      }
      setTranslateMsg(`Translating to ${empty.map((l) => l.code.toUpperCase()).join(", ")}...`);
      const tr = await fetch("/api/admin/blog/translate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ postId: pid }) });
      if (tr.ok) {
        setTranslateMsg("✅ Done! Reloading...");
        const pr = await fetch(`/api/admin/blog/${pid}`); const pd = await pr.json();
        if (pd.post) setForm((p) => ({ ...p, ...pd.post, categoryId: pd.post.categoryId || "", tags: pd.post.tags || [], scheduledAt: pd.post.scheduledAt || "", ...Object.fromEntries(LANGS.flatMap((l) => ["title", "slug", "excerpt", "content", "metaTitle", "metaDescription"].map((f) => [`${f}${cap(l.code)}`, pd.post[`${f}${cap(l.code)}`] || ""]))) }));
        if (!isEditing && pid) router.replace(`/en/admin/blog/${pid}`);
      } else { const e = await tr.json(); setTranslateMsg(`❌ ${e.message || "Failed"}`); }
    } catch (e) { console.error(e); setTranslateMsg("❌ Request failed"); }
    setTranslating(false); setTimeout(() => setTranslateMsg(""), 5000);
  };

  if (loading) return <div className="flex flex-col items-center justify-center min-h-[400px] gap-3"><div className="w-10 h-10 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" /><p className="text-slate-600">Loading...</p></div>;
  if (saveSuccess) return <div className="flex flex-col items-center justify-center min-h-[400px] gap-3"><div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center"><svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg></div><p className="text-lg font-semibold text-slate-900">Saved!</p></div>;

  // ═════ Toolbar Button ═════
  const TB = ({ onClick, title, children, cls = "" }: { onClick: () => void; title: string; children: React.ReactNode; cls?: string }) => (
    <button onClick={onClick} title={title} className={`p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-800 rounded-lg transition-colors ${cls}`}>{children}</button>
  );

  return (
    <div className="space-y-4 sm:space-y-6">
      <LinkModal open={showLinkM} onClose={() => setShowLinkM(false)} onInsert={(t, u) => ins(`[${t}](${u})`)} />
      <ImageModal open={showImgM} onClose={() => setShowImgM(false)} onInsert={(a, u) => ins(`![${a}](${u})\n`)} />
      <CalcEmbedModal open={showCalcM} onClose={() => setShowCalcM(false)} onInsert={(s) => ins(`\n[calculator:${s}]\n`)} />
      <PostPreviewModal open={showPreview} onClose={() => setShowPreview(false)} form={form} lang={activeTab} />

      {/* ── HEADER ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/en/admin/blog" className="p-2.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </Link>
          <div><h1 className="text-lg sm:text-lg sm:text-xl sm:text-2xl font-bold text-slate-900">{isEditing ? "Edit Post" : "New Post"}</h1><p className="text-slate-500 text-sm mt-0.5">5-language blog editor</p></div>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <div className="hidden lg:flex items-center gap-1 px-3 py-2 bg-slate-50 rounded-xl border border-slate-200">
            {LANGS.map((l) => { const st = ls(l.code); return <span key={l.code} className={`text-sm ${st === "complete" ? "" : st === "partial" ? "opacity-50" : "opacity-20 grayscale"}`} title={`${l.name}: ${st}`}>{l.flag}</span>; })}
            <span className="text-xs text-slate-500 ml-1.5">{trCount}/5</span>
          </div>
          <button onClick={() => setShowPreview(true)} className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 font-medium text-sm">👁️ Preview</button>
          <button onClick={() => handleSave(true)} disabled={saving} className="px-4 py-2.5 border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 font-medium text-sm disabled:opacity-50">Save Draft</button>
          <button onClick={() => handleSave(false)} disabled={saving} className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-medium text-sm disabled:opacity-50 shadow-sm">
            {saving && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
            {isEditing ? "Update" : "Publish"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* ═══════ MAIN (2/3) ═══════ */}
        <div className="xl:col-span-2 space-y-5">

          {/* Language tabs + title/slug/excerpt */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="flex border-b border-slate-200 bg-slate-50/50">
              {LANGS.map((l) => {
                const st = ls(l.code);
                return (
                  <button key={l.code} onClick={() => setActiveTab(l.code)} className={`relative flex-1 py-3.5 px-1 text-sm font-medium transition-all ${activeTab === l.code ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700 hover:bg-white/50"}`}>
                    <div className="flex items-center justify-center gap-1.5">
                      <span className="text-base">{l.flag}</span>
                      <span className="hidden sm:inline">{l.label}</span>
                      <span className="sm:hidden text-xs">{l.code.toUpperCase()}</span>
                      <span className={`w-1.5 h-1.5 rounded-full ${st === "complete" ? "bg-emerald-500" : st === "partial" ? "bg-amber-400" : "bg-slate-300"}`} />
                    </div>
                    {activeTab === l.code && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />}
                  </button>
                );
              })}
            </div>
            <div className="p-6 space-y-5">
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">Title{activeTab === "en" && <span className="text-xs font-normal text-red-500 bg-red-50 px-1.5 py-0.5 rounded">Required</span>}</label>
                <input type="text" value={form[lf("title", activeTab)] as string} onChange={(e) => handleTitleChange(activeTab, e.target.value)} placeholder={`Title in ${LANGS.find((l) => l.code === activeTab)?.name}...`} className="w-full px-4 py-3 text-lg border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-slate-300" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">URL Slug</label>
                <div className="flex items-center"><span className="text-sm text-slate-400 bg-slate-50 px-3 py-2.5 rounded-l-xl border border-r-0 border-slate-200 whitespace-nowrap">/{activeTab}/blog/</span><input type="text" value={form[lf("slug", activeTab)] as string} onChange={(e) => set(lf("slug", activeTab), e.target.value)} className="flex-1 px-4 py-2.5 border border-slate-200 rounded-r-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm" /></div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Excerpt</label>
                <textarea value={form[lf("excerpt", activeTab)] as string} onChange={(e) => set(lf("excerpt", activeTab), e.target.value)} placeholder="Brief summary for listings and social shares..." rows={2} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none placeholder:text-slate-300" />
              </div>
            </div>
          </div>

          {/* ── CONTENT EDITOR ── */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="border-b border-slate-200">
              <div className="flex items-center justify-between px-4 pt-3 pb-0">
                <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-0.5">
                  {([{ m: "write" as EditorMode, l: "✏️ Write" }, { m: "split" as EditorMode, l: "📐 Split" }, { m: "preview" as EditorMode, l: "👁️ Preview" }, { m: "html" as EditorMode, l: "</> HTML" }]).map((x) => (
                    <button key={x.m} onClick={() => setEditorMode(x.m)} className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${editorMode === x.m ? "bg-white shadow-sm text-slate-900" : "text-slate-500 hover:text-slate-700"}`}>{x.l}</button>
                  ))}
                </div>
                <span className="text-xs text-slate-400">{wc} words · ~{calcRT(content)} min</span>
              </div>
              {(editorMode === "write" || editorMode === "split") && (
                <div className="flex items-center gap-0.5 p-2 px-4 flex-wrap">
                  <TB onClick={() => ins("**", "**")} title="Bold"><svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24"><path d="M6 4h8a4 4 0 014 4 4 4 0 01-4 4H6z M6 12h9a4 4 0 014 4 4 4 0 01-4 4H6z" /></svg></TB>
                  <TB onClick={() => ins("*", "*")} title="Italic"><svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M19 4h-9 M14 20H5 M15 4L9 20" /></svg></TB>
                  <div className="w-px h-5 bg-slate-200 mx-1" />
                  <TB onClick={() => ins("# ")} title="H1"><span className="text-xs font-bold">H1</span></TB>
                  <TB onClick={() => ins("## ")} title="H2"><span className="text-xs font-bold">H2</span></TB>
                  <TB onClick={() => ins("### ")} title="H3"><span className="text-xs font-bold">H3</span></TB>
                  <div className="w-px h-5 bg-slate-200 mx-1" />
                  <TB onClick={() => setShowLinkM(true)} title="Insert Link" cls="hover:!bg-blue-50 hover:!text-blue-600"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg></TB>
                  <TB onClick={() => setShowImgM(true)} title="Insert Image" cls="hover:!bg-purple-50 hover:!text-purple-600"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg></TB>
                  <TB onClick={() => setShowCalcM(true)} title="Embed Calculator" cls="hover:!bg-amber-50 hover:!text-amber-600"><span className="text-sm">🧮</span></TB>
                  <div className="w-px h-5 bg-slate-200 mx-1" />
                  <TB onClick={() => ins("- ")} title="List"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg></TB>
                  <TB onClick={() => ins("> ")} title="Quote"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg></TB>
                  <TB onClick={() => ins("```\n", "\n```")} title="Code"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg></TB>
                  <TB onClick={() => ins("\n---\n")} title="Divider"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" /></svg></TB>
                </div>
              )}
            </div>

            <div className={editorMode === "split" ? "grid grid-cols-2 divide-x divide-slate-200" : ""} style={{ minHeight: 480 }}>
              {(editorMode === "write" || editorMode === "split") && (
                <textarea ref={editorRef} value={content} onChange={(e) => set(lf("content", activeTab), e.target.value)}
                  placeholder={`Write in ${LANGS.find((l) => l.code === activeTab)?.name} using Markdown...\n\n# Heading\n**Bold** *italic*\n[Link](url)\n![Image](url)\n- List\n> Quote`}
                  className="w-full h-full min-h-[480px] px-5 py-4 focus:outline-none resize-none font-mono text-sm leading-relaxed placeholder:text-slate-300"
                  onKeyDown={(e) => {
                    if (e.key === "b" && (e.ctrlKey || e.metaKey)) { e.preventDefault(); ins("**", "**"); }
                    if (e.key === "i" && (e.ctrlKey || e.metaKey)) { e.preventDefault(); ins("*", "*"); }
                    if (e.key === "k" && (e.ctrlKey || e.metaKey)) { e.preventDefault(); setShowLinkM(true); }
                    if (e.key === "Tab") { e.preventDefault(); ins("  "); }
                  }}
                />
              )}
              {(editorMode === "preview" || editorMode === "split") && (
                <div className="overflow-y-auto p-6" style={{ minHeight: 480, maxHeight: 700 }}>
                  {editorMode === "split" && <p className="text-xs text-slate-400 mb-4 uppercase tracking-wider font-semibold">Preview</p>}
                  <div dangerouslySetInnerHTML={{ __html: markdownToHtml(content) }} />
                </div>
              )}
              {editorMode === "html" && (
                <div className="p-4" style={{ minHeight: 480 }}>
                  <p className="text-xs text-slate-400 mb-3 uppercase tracking-wider font-semibold">HTML Output (read-only)</p>
                  <pre className="bg-slate-900 text-green-400 p-4 rounded-xl text-xs overflow-auto font-mono leading-relaxed" style={{ maxHeight: 600 }}>
                    {markdownToHtml(content).replace(/></g, ">\n<").replace(/<(\/?(h[1-3]|p|div|ul|li|blockquote|pre|hr|img|a))/g, "\n<$1")}
                  </pre>
                </div>
              )}
            </div>
          </div>

          {/* ── SEO ── */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <button onClick={() => setShowSeo(!showSeo)} className="flex items-center justify-between w-full p-4 hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-3"><span className="text-lg">🔍</span><div className="text-left"><p className="font-semibold text-slate-700 text-sm">SEO Settings</p><p className="text-xs text-slate-400">{LANGS.find((l) => l.code === activeTab)?.name}</p></div></div>
              <div className="flex items-center gap-3">
                <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${seoS >= 80 ? "bg-emerald-100 text-emerald-700" : seoS >= 50 ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"}`}>{seoS}%</span>
                <svg className={`w-5 h-5 text-slate-400 transition-transform ${showSeo ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </div>
            </button>
            {showSeo && (
              <div className="p-5 space-y-4 border-t border-slate-100">
                {seoIss.length > 0 && <div className="flex flex-wrap gap-2 pb-3">{seoIss.map((i, x) => <span key={x} className="text-xs px-2 py-1 bg-amber-50 text-amber-700 rounded-lg">⚠️ {i}</span>)}</div>}
                <div>
                  <label className="flex justify-between text-sm text-slate-600 mb-1"><span>Meta Title</span><span className={`text-xs ${((form[lf("metaTitle", activeTab)] as string) || "").length > 55 ? "text-red-500" : "text-slate-400"}`}>{((form[lf("metaTitle", activeTab)] as string) || "").length}/60</span></label>
                  <input type="text" value={form[lf("metaTitle", activeTab)] as string} onChange={(e) => set(lf("metaTitle", activeTab), e.target.value)} maxLength={60} placeholder="SEO title (max 60)" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="flex justify-between text-sm text-slate-600 mb-1"><span>Meta Description</span><span className={`text-xs ${((form[lf("metaDescription", activeTab)] as string) || "").length > 150 ? "text-red-500" : "text-slate-400"}`}>{((form[lf("metaDescription", activeTab)] as string) || "").length}/155</span></label>
                  <textarea value={form[lf("metaDescription", activeTab)] as string} onChange={(e) => set(lf("metaDescription", activeTab), e.target.value)} maxLength={155} rows={2} placeholder="SEO description (max 155)" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
                </div>
                <div className="p-4 bg-slate-50 rounded-xl"><p className="text-xs text-slate-400 mb-2">Google Preview</p><p className="text-blue-700 text-base font-medium truncate">{(form[lf("metaTitle", activeTab)] as string) || "Post title"}</p><p className="text-emerald-700 text-xs truncate mt-0.5">kalcufy.com/{activeTab}/blog/{(form[lf("slug", activeTab)] as string) || "slug"}</p><p className="text-slate-600 text-sm mt-1 line-clamp-2">{(form[lf("metaDescription", activeTab)] as string) || "Meta description..."}</p></div>
              </div>
            )}
          </div>

          {/* ── Translation status ── */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-900">Translations</h3>
              <button onClick={handleTranslate} disabled={translating} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${translating ? "bg-slate-100 text-slate-400" : "bg-gradient-to-r from-violet-600 to-blue-600 text-white hover:from-violet-700 hover:to-blue-700 shadow-sm"}`}>
                {translating ? <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" /> : <span>🤖</span>}
                {translating ? "Working..." : "Auto-Translate"}
              </button>
            </div>
            {translateMsg && <div className={`mb-4 p-3 rounded-xl text-sm font-medium ${translateMsg.startsWith("✅") ? "bg-emerald-50 text-emerald-700" : translateMsg.startsWith("❌") ? "bg-red-50 text-red-700" : "bg-blue-50 text-blue-700"}`}>{translateMsg}</div>}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {LANGS.map((l) => {
                const st = ls(l.code); const c = form[lf("content", l.code)] as string; const cw = c.trim().split(/\s+/).filter(Boolean).length;
                return (
                  <button key={l.code} onClick={() => setActiveTab(l.code)} className={`p-3 rounded-xl border text-center transition-all ${activeTab === l.code ? "border-blue-300 bg-blue-50 ring-1 ring-blue-200" : st === "complete" ? "border-emerald-200 bg-emerald-50 hover:bg-emerald-100" : st === "partial" ? "border-amber-200 bg-amber-50 hover:bg-amber-100" : "border-slate-200 bg-slate-50 hover:bg-slate-100"}`}>
                    <span className="text-2xl block mb-1">{l.flag}</span>
                    <p className="text-xs font-bold text-slate-700">{l.code.toUpperCase()}</p>
                    <p className={`text-xs mt-1 ${st === "complete" ? "text-emerald-600" : st === "partial" ? "text-amber-600" : "text-slate-400"}`}>{st === "complete" ? `✓ ${cw}w` : st === "partial" ? "Partial" : "Empty"}</p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ═══════ SIDEBAR (1/3) ═══════ */}
        <div className="space-y-5">
          {/* Status */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
            <h3 className="font-semibold text-slate-900 mb-4">📋 Publish</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
              {statusOpts.map((o) => (<button key={o.value} onClick={() => set("status", o.value)} className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm font-medium transition-all ${form.status === o.value ? `${o.cls} border-current ring-1 ring-current/20` : "border-slate-200 text-slate-600 hover:bg-slate-50"}`}><span>{o.icon}</span>{o.label}</button>))}
            </div>
            {form.status === "SCHEDULED" && <div className="mb-4"><label className="block text-sm text-slate-600 mb-1">Schedule</label><input type="datetime-local" value={form.scheduledAt} onChange={(e) => set("scheduledAt", e.target.value)} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" /></div>}
            <div><label className="block text-sm text-slate-600 mb-1">Reading Time</label><div className="flex items-center gap-2"><input type="number" value={form.readingTime} onChange={(e) => set("readingTime", parseInt(e.target.value) || 1)} min={1} className="w-20 px-3 py-2.5 border border-slate-200 rounded-xl text-center focus:outline-none focus:ring-2 focus:ring-blue-500" /><span className="text-sm text-slate-500">min</span><button onClick={() => set("readingTime", calcRT(form.contentEn))} className="ml-auto text-xs text-blue-600 font-medium">Auto</button></div></div>
          </div>

          {/* Category */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4"><h3 className="font-semibold text-slate-900">🏷️ Category</h3><Link href="/en/admin/blog/categories" className="text-xs text-blue-600 font-medium">Manage</Link></div>
            <div className="space-y-2 max-h-56 overflow-y-auto">
              {categories.map((c) => (<label key={c.id} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${form.categoryId === c.id ? `${colorClasses[c.color]} border-current ring-1 ring-current/20` : "border-slate-200 hover:bg-slate-50"}`}><input type="radio" name="cat" value={c.id} checked={form.categoryId === c.id} onChange={() => set("categoryId", c.id)} className="sr-only" /><span className="text-lg">{c.icon}</span><span className="font-medium text-sm">{c.nameEn}</span></label>))}
              {!categories.length && <p className="text-sm text-slate-400 text-center py-3">No categories</p>}
            </div>
          </div>

          {/* Featured Image */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
            <h3 className="font-semibold text-slate-900 mb-4">🖼️ Featured Image</h3>
            {form.featuredImage ? (
              <div className="relative group mb-3"><img src={form.featuredImage} alt="" className="w-full h-36 object-cover rounded-xl" /><button onClick={() => set("featuredImage", "")} className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button></div>
            ) : (
              <div className="border-2 border-dashed border-slate-200 rounded-xl p-5 text-center mb-3"><span className="text-3xl block mb-1">📷</span><p className="text-xs text-slate-400">Paste URL below</p></div>
            )}
            <input type="text" value={form.featuredImage} onChange={(e) => set("featuredImage", e.target.value)} placeholder="https://images.unsplash.com/..." className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
          </div>

          {/* OG Image */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
            <h3 className="font-semibold text-slate-900 mb-3">🌐 OG Image</h3>
            <p className="text-xs text-slate-400 mb-3">Social preview (uses featured if empty)</p>
            {form.ogImage && <img src={form.ogImage} alt="" className="w-full h-28 object-cover rounded-xl mb-3" />}
            <input type="text" value={form.ogImage} onChange={(e) => set("ogImage", e.target.value)} placeholder="https://..." className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
          </div>

          {/* Calculator */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
            <h3 className="font-semibold text-slate-900 mb-4">🧮 Related Calculator</h3>
            <select value={form.relatedCalculator} onChange={(e) => set("relatedCalculator", e.target.value)} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm">
              <option value="">None</option>
              {calculators.map((c) => <option key={c.slug} value={c.slug}>{c.icon} {c.name}</option>)}
            </select>
          </div>

          {/* Tags */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
            <h3 className="font-semibold text-slate-900 mb-4"># Tags</h3>
            {form.tags.length > 0 && <div className="flex flex-wrap gap-2 mb-3">{form.tags.map((t) => <span key={t} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium">{t}<button onClick={() => removeTag(t)} className="text-slate-400 hover:text-red-500"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button></span>)}</div>}
            <div className="flex gap-2"><input type="text" value={newTag} onChange={(e) => setNewTag(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())} placeholder="Add tag..." className="flex-1 px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" /><button onClick={addTag} className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 font-medium text-sm">Add</button></div>
          </div>
        </div>
      </div>
    </div>
  );
}
