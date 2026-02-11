"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

// ═══════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════
interface BlogCategory { id: string; slug: string; nameEn: string; nameEs: string | null; namePt: string | null; nameFr: string | null; nameDe: string | null; icon: string; color: string; }
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
// Editor modes: md=markdown source, html=html source, preview=rendered preview, split-md, split-html
type EditorMode = "md" | "html" | "preview" | "split-md" | "split-html";

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
  { slug: "compound-interest", name: "Compound Interest", icon: "💰" }, { slug: "mortgage", name: "Mortgage", icon: "🏠" },
  { slug: "loan", name: "Loan Calculator", icon: "💳" }, { slug: "auto-loan", name: "Auto Loan", icon: "🚗" },
  { slug: "savings", name: "Savings", icon: "🐷" }, { slug: "retirement", name: "Retirement", icon: "👴" },
  { slug: "bmi", name: "BMI Calculator", icon: "⚖️" }, { slug: "calorie", name: "Calorie", icon: "🔥" },
  { slug: "body-fat", name: "Body Fat", icon: "📊" }, { slug: "ideal-weight", name: "Ideal Weight", icon: "🎯" },
  { slug: "one-rep-max", name: "One Rep Max", icon: "🏋️" }, { slug: "credit-card-payoff", name: "Credit Card Payoff", icon: "💳" },
];
const colorCls: Record<string, string> = {
  blue: "bg-blue-100 text-blue-700 border-blue-200", green: "bg-emerald-100 text-emerald-700 border-emerald-200",
  purple: "bg-purple-100 text-purple-700 border-purple-200", amber: "bg-amber-100 text-amber-800 border-amber-200",
  red: "bg-red-100 text-red-700 border-red-200", indigo: "bg-indigo-100 text-indigo-700 border-indigo-200",
  cyan: "bg-cyan-100 text-cyan-700 border-cyan-200", pink: "bg-pink-100 text-pink-700 border-pink-200",
};
const statusOpts = [
  { v: "DRAFT", l: "Draft", i: "✏️", c: "bg-amber-100 text-amber-800" },
  { v: "PUBLISHED", l: "Published", i: "✅", c: "bg-emerald-100 text-emerald-700" },
  { v: "SCHEDULED", l: "Scheduled", i: "📅", c: "bg-blue-100 text-blue-700" },
  { v: "ARCHIVED", l: "Archived", i: "📦", c: "bg-slate-100 text-slate-700" },
];

function cap(s: string) { return s.charAt(0).toUpperCase() + s.slice(1); }
function lf(pre: string, lang: Lang): keyof PostFormData { return `${pre}${cap(lang)}` as keyof PostFormData; }

// ═══════════════════════════════════════════════════════════════════════════
// MARKDOWN → HTML (simple but good enough for preview)
// ═══════════════════════════════════════════════════════════════════════════
function md2html(md: string): string {
  if (!md) return '<p class="text-slate-400 italic">Start writing...</p>';
  let h = md
    .replace(/```(\w*)\n([\s\S]*?)```/g, '<pre class="bg-slate-900 text-green-400 p-4 rounded-xl overflow-x-auto text-sm my-4 font-mono"><code>$2</code></pre>')
    .replace(/`([^`]+)`/g, '<code class="bg-slate-100 text-pink-600 px-1.5 py-0.5 rounded text-sm font-mono">$1</code>')
    .replace(/^#### (.+)$/gm, '<h4 class="text-base font-bold text-slate-800 mt-5 mb-1.5">$1</h4>')
    .replace(/^### (.+)$/gm, '<h3 class="text-lg font-bold text-slate-900 mt-6 mb-2">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-xl font-bold text-slate-900 mt-8 mb-3">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 class="text-2xl font-bold text-slate-900 mt-8 mb-4">$1</h1>')
    .replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/~~(.+?)~~/g, '<del class="text-slate-400">$1</del>')
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="rounded-xl max-w-full my-4 shadow-sm border" />')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 underline decoration-blue-300 hover:text-blue-800 hover:decoration-blue-500" target="_blank">$1</a>')
    .replace(/^> (.+)$/gm, '<blockquote class="border-l-4 border-blue-400 pl-4 py-2 my-4 text-slate-600 italic bg-blue-50/50 rounded-r-lg">$1</blockquote>')
    .replace(/^---$/gm, '<hr class="my-8 border-slate-200" />')
    .replace(/^- \[x\] (.+)$/gm, '<div class="flex items-center gap-2 my-1"><span class="text-emerald-500">☑</span><span class="line-through text-slate-400">$1</span></div>')
    .replace(/^- \[ \] (.+)$/gm, '<div class="flex items-center gap-2 my-1"><span class="text-slate-300">☐</span><span>$1</span></div>')
    .replace(/^- (.+)$/gm, '<li class="ml-5 list-disc text-slate-700 leading-relaxed">$1</li>')
    .replace(/^\d+\. (.+)$/gm, '<li class="ml-5 list-decimal text-slate-700 leading-relaxed">$1</li>')
    .replace(/\[calculator:([^\]]+)\]/g, '<div class="p-4 my-4 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl flex items-center gap-3"><span class="text-2xl">🧮</span><div><p class="font-semibold text-blue-900">Calculator: $1</p><p class="text-xs text-blue-600">Will embed on publish</p></div></div>')
    .replace(/\n\n/g, '</p><p class="text-slate-700 leading-relaxed my-3">')
    .replace(/\n/g, '<br/>');
  h = h.replace(/((<li[^>]*>.*?<\/li>\s*(<br\/>)?)+)/g, '<ul class="my-3 space-y-0.5">$1</ul>');
  return `<div class="prose-custom"><p class="text-slate-700 leading-relaxed my-3">${h}</p></div>`;
}

// ═══════════════════════════════════════════════════════════════════════════
// MODALS
// ═══════════════════════════════════════════════════════════════════════════
const Overlay = ({ children, onClose }: { children: React.ReactNode; onClose: () => void }) => (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-150" onClick={onClose}>
    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md animate-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>{children}</div>
  </div>
);
const MH = ({ title, onClose }: { title: string; onClose: () => void }) => (
  <div className="flex items-center justify-between p-5 pb-0"><h3 className="text-lg font-bold text-slate-900">{title}</h3><button onClick={onClose} className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button></div>
);

function LinkModal({ open, onClose, onInsert, mode }: { open: boolean; onClose: () => void; onInsert: (t: string, u: string) => void; mode: string }) {
  const [text, setText] = useState(""); const [url, setUrl] = useState("https://"); const ref = useRef<HTMLInputElement>(null);
  useEffect(() => { if (open) { setText(""); setUrl("https://"); setTimeout(() => ref.current?.focus(), 100); } }, [open]);
  if (!open) return null;
  const ok = url && url !== "https://";
  const submit = () => { if (ok) { onInsert(text || url, url); onClose(); } };
  return (
    <Overlay onClose={onClose}><MH title="🔗 Insert Link" onClose={onClose} />
      <div className="p-5 space-y-4">
        <div><label className="block text-sm font-medium text-slate-700 mb-1">Link Text</label><input ref={ref} type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Click here" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" onKeyDown={(e) => e.key === "Enter" && submit()} /></div>
        <div><label className="block text-sm font-medium text-slate-700 mb-1">URL</label><input type="url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://www.kalcufy.com/en/..." className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm" onKeyDown={(e) => e.key === "Enter" && submit()} /></div>
        {ok && <div className="p-3 bg-slate-50 rounded-xl text-sm font-mono text-slate-600">{mode === "html" ? `<a href="${url}">${text || url}</a>` : `[${text || url}](${url})`}</div>}
        <div className="flex justify-end gap-3"><button onClick={onClose} className="px-4 py-2.5 text-slate-600 hover:bg-slate-100 rounded-xl font-medium">Cancel</button><button onClick={submit} disabled={!ok} className="px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-medium disabled:opacity-40 shadow-sm">Insert</button></div>
      </div>
    </Overlay>
  );
}

function ImageModal({ open, onClose, onInsert, mode }: { open: boolean; onClose: () => void; onInsert: (a: string, u: string) => void; mode: string }) {
  const [alt, setAlt] = useState(""); const [url, setUrl] = useState(""); const [err, setErr] = useState(false);
  useEffect(() => { if (open) { setAlt(""); setUrl(""); setErr(false); } }, [open]);
  if (!open) return null;
  return (
    <Overlay onClose={onClose}><MH title="🖼️ Insert Image" onClose={onClose} />
      <div className="p-5 space-y-4">
        <div><label className="block text-sm font-medium text-slate-700 mb-1">Image URL</label><input type="url" value={url} onChange={(e) => { setUrl(e.target.value); setErr(false); }} placeholder="https://images.unsplash.com/..." className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm" /></div>
        <div><label className="block text-sm font-medium text-slate-700 mb-1">Alt Text (SEO)</label><input type="text" value={alt} onChange={(e) => setAlt(e.target.value)} placeholder="Descriptive text for accessibility" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" /></div>
        {url && !err && <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-50"><img src={url} alt={alt} className="w-full h-40 object-cover" onError={() => setErr(true)} /></div>}
        {err && <p className="text-sm text-red-500">⚠️ Image failed to load. Check the URL.</p>}
        {url && <div className="p-3 bg-slate-50 rounded-xl text-xs font-mono text-slate-600 break-all">{mode === "html" ? `<img src="${url}" alt="${alt}" />` : `![${alt}](${url})`}</div>}
        <div className="flex justify-end gap-3"><button onClick={onClose} className="px-4 py-2.5 text-slate-600 hover:bg-slate-100 rounded-xl font-medium">Cancel</button><button onClick={() => { onInsert(alt, url); onClose(); }} disabled={!url} className="px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-medium disabled:opacity-40 shadow-sm">Insert</button></div>
      </div>
    </Overlay>
  );
}

function CalcModal({ open, onClose, onInsert }: { open: boolean; onClose: () => void; onInsert: (s: string) => void }) {
  const [q, setQ] = useState(""); const list = calculators.filter((c) => c.name.toLowerCase().includes(q.toLowerCase()));
  useEffect(() => { if (open) setQ(""); }, [open]);
  if (!open) return null;
  return (
    <Overlay onClose={onClose}><MH title="🧮 Embed Calculator" onClose={onClose} />
      <div className="p-5 space-y-3">
        <input type="text" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search..." className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" autoFocus />
        <div className="max-h-64 overflow-y-auto space-y-1">{list.map((c) => (<button key={c.slug} onClick={() => { onInsert(c.slug); onClose(); }} className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-blue-50 transition-colors text-left"><span className="text-xl">{c.icon}</span><div><p className="font-medium text-sm">{c.name}</p><p className="text-xs text-slate-400">/{c.slug}</p></div></button>))}{!list.length && <p className="text-sm text-slate-400 text-center py-4">No results</p>}</div>
      </div>
    </Overlay>
  );
}

function PreviewModal({ open, onClose, form, lang }: { open: boolean; onClose: () => void; form: PostFormData; lang: Lang }) {
  if (!open) return null;
  const title = form[lf("title", lang)] as string; const content = form[lf("content", lang)] as string; const excerpt = form[lf("excerpt", lang)] as string;
  // Detect if content is HTML or Markdown
  const isHtml = content.trimStart().startsWith("<");
  const rendered = isHtml ? content : md2html(content);
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[92vh] overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-5 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white shrink-0">
          <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center"><span className="text-white text-lg">👁️</span></div><div><h3 className="font-bold text-slate-900">Full Post Preview</h3><p className="text-xs text-slate-500">{LANGS.find((l) => l.code === lang)?.flag} {LANGS.find((l) => l.code === lang)?.name} · {isHtml ? "HTML" : "Markdown"}</p></div></div>
          <button onClick={onClose} className="p-2.5 hover:bg-slate-100 rounded-xl transition-colors"><svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
        </div>
        <div className="overflow-y-auto flex-1 p-8 bg-white">
          {form.featuredImage && <img src={form.featuredImage} alt="" className="w-full h-64 object-cover rounded-2xl mb-8 shadow-lg" />}
          <article className="max-w-2xl mx-auto">
            <h1 className="text-4xl font-extrabold text-slate-900 mb-4 leading-tight tracking-tight">{title || "Untitled Post"}</h1>
            {excerpt && <p className="text-xl text-slate-500 mb-8 leading-relaxed font-light">{excerpt}</p>}
            <div className="flex items-center gap-4 text-sm text-slate-400 mb-8 pb-8 border-b border-slate-100"><span>📖 {form.readingTime} min read</span><span>·</span><span>{form.tags.slice(0, 3).map((t) => `#${t}`).join(" ")}</span></div>
            <div dangerouslySetInnerHTML={{ __html: rendered }} />
          </article>
        </div>
      </div>
    </div>
  );
}

function FindReplace({ open, onClose, content, onReplace }: { open: boolean; onClose: () => void; content: string; onReplace: (n: string) => void }) {
  const [find, setFind] = useState(""); const [replace, setReplace] = useState(""); const ref = useRef<HTMLInputElement>(null);
  useEffect(() => { if (open) { setFind(""); setReplace(""); setTimeout(() => ref.current?.focus(), 100); } }, [open]);
  if (!open) return null;
  const count = find ? (content.split(find).length - 1) : 0;
  const doReplace = () => { if (find) { onReplace(content.replaceAll(find, replace)); onClose(); } };
  return (
    <div className="absolute top-2 right-2 z-40 bg-white rounded-xl shadow-2xl border border-slate-200 p-4 w-80 space-y-3">
      <div className="flex items-center justify-between"><span className="text-sm font-semibold text-slate-700">🔍 Find & Replace</span><button onClick={onClose} className="p-1 hover:bg-slate-100 rounded text-slate-400"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button></div>
      <div><input ref={ref} type="text" value={find} onChange={(e) => setFind(e.target.value)} placeholder="Find..." className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />{find && <p className="text-xs text-slate-400 mt-1">{count} match{count !== 1 ? "es" : ""}</p>}</div>
      <input type="text" value={replace} onChange={(e) => setReplace(e.target.value)} placeholder="Replace with..." className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" onKeyDown={(e) => e.key === "Enter" && doReplace()} />
      <div className="flex justify-end gap-2"><button onClick={onClose} className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 rounded-lg text-sm">Close</button><button onClick={doReplace} disabled={!find || !count} className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-medium disabled:opacity-40">Replace All ({count})</button></div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════
export default function AdminBlogEditorPage() {
  const router = useRouter(); const params = useParams(); const isEditing = params?.id && params.id !== "new";
  const editorRef = useRef<HTMLTextAreaElement>(null);

  const [tab, setTab] = useState<Lang>("en");
  const [mode, setMode] = useState<EditorMode>("split-md");
  const [cats, setCats] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [newTag, setNewTag] = useState("");
  const [showSeo, setShowSeo] = useState(false);
  const [translating, setTranslating] = useState(false);
  const [trMsg, setTrMsg] = useState("");
  const [fullscreen, setFullscreen] = useState(false);
  const [showFind, setShowFind] = useState(false);

  const [showLinkM, setShowLinkM] = useState(false);
  const [showImgM, setShowImgM] = useState(false);
  const [showCalcM, setShowCalcM] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const empty: PostFormData = {
    titleEn: "", titleEs: "", titlePt: "", titleFr: "", titleDe: "",
    slugEn: "", slugEs: "", slugPt: "", slugFr: "", slugDe: "",
    excerptEn: "", excerptEs: "", excerptPt: "", excerptFr: "", excerptDe: "",
    contentEn: "", contentEs: "", contentPt: "", contentFr: "", contentDe: "",
    metaTitleEn: "", metaTitleEs: "", metaTitlePt: "", metaTitleFr: "", metaTitleDe: "",
    metaDescriptionEn: "", metaDescriptionEs: "", metaDescriptionPt: "", metaDescriptionFr: "", metaDescriptionDe: "",
    featuredImage: "", ogImage: "", categoryId: "", tags: [],
    relatedCalculator: "", status: "DRAFT", scheduledAt: "", readingTime: 5,
  };
  const [form, setForm] = useState<PostFormData>(empty);

  useEffect(() => { fetchCats(); if (isEditing) fetchPost(); }, [isEditing]);

  const fetchCats = async () => { try { const r = await fetch("/api/admin/blog/categories"); const d = await r.json(); setCats(d.categories || []); } catch (e) { console.error(e); } };
  const fetchPost = async () => {
    setLoading(true);
    try {
      const r = await fetch(`/api/admin/blog/${params?.id}`); const d = await r.json();
      if (d.post) setForm((p) => ({ ...p, ...d.post, categoryId: d.post.categoryId || "", tags: d.post.tags || [], scheduledAt: d.post.scheduledAt || "",
        ...Object.fromEntries(LANGS.flatMap((l) => ["title", "slug", "excerpt", "content", "metaTitle", "metaDescription"].map((f) => [`${f}${cap(l.code)}`, d.post[`${f}${cap(l.code)}`] || ""]))) }));
    } catch (e) { console.error(e); } setLoading(false);
  };

  const slug = (t: string) => t.toLowerCase().replace(/[áàäâã]/g, "a").replace(/[éèëê]/g, "e").replace(/[íìïî]/g, "i").replace(/[óòöôõ]/g, "o").replace(/[úùüûũ]/g, "u").replace(/ñ/g, "n").replace(/ç/g, "c").replace(/ß/g, "ss").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const setTitle = (lang: Lang, v: string) => setForm((p) => ({ ...p, [lf("title", lang)]: v, [lf("slug", lang)]: slug(v) }));
  const set = (f: keyof PostFormData, v: any) => setForm((p) => ({ ...p, [f]: v }));
  const addTag = () => { if (newTag.trim() && !form.tags.includes(newTag.trim())) { setForm((p) => ({ ...p, tags: [...p.tags, newTag.trim().toLowerCase()] })); setNewTag(""); } };
  const rmTag = (t: string) => setForm((p) => ({ ...p, tags: p.tags.filter((x) => x !== t) }));
  const calcRT = (c: string) => Math.ceil(c.trim().split(/\s+/).length / 200) || 1;

  const content = form[lf("content", tab)] as string;
  const wc = content.trim().split(/\s+/).filter(Boolean).length;
  const charCount = content.length;
  const isHtmlContent = content.trimStart().startsWith("<");
  const currentSourceMode = mode.includes("html") ? "html" : "md";

  function ls(lang: Lang): "complete" | "partial" | "empty" {
    const t = form[lf("title", lang)] as string; const c = form[lf("content", lang)] as string;
    if (t && c) return "complete"; if (t || c) return "partial"; return "empty";
  }
  const trCount = LANGS.filter((l) => ls(l.code) === "complete").length;

  function seoScore() {
    const iss: string[] = []; let s = 0;
    if (form.featuredImage) s += 20; else iss.push("No image");
    if (((form[lf("excerpt", tab)] as string) || "").length >= 50) s += 20; else iss.push("Excerpt short");
    if (((form[lf("metaTitle", tab)] as string) || "").length >= 30) s += 20; else iss.push("Meta title short");
    if (((form[lf("metaDescription", tab)] as string) || "").length >= 80) s += 20; else iss.push("Meta desc short");
    if (trCount >= 3) s += 20; else iss.push(`${trCount}/5 langs`);
    return { s, iss };
  }
  const { s: seoS, iss: seoI } = seoScore();

  // Insert at cursor for both MD and HTML
  const ins = useCallback((before: string, after = "") => {
    const ta = editorRef.current; if (!ta) return;
    const st = ta.selectionStart, en = ta.selectionEnd, sel = content.substring(st, en);
    const nv = content.substring(0, st) + before + sel + after + content.substring(en);
    set(lf("content", tab), nv);
    setTimeout(() => { ta.focus(); ta.setSelectionRange(st + before.length, st + before.length + sel.length); }, 0);
  }, [tab, content]);

  // Smart insert: Markdown or HTML depending on mode
  const insLink = (t: string, u: string) => { if (currentSourceMode === "html") ins(`<a href="${u}">`, `${t}</a>`); else ins(`[${t}](${u})`); };
  const insImg = (a: string, u: string) => { if (currentSourceMode === "html") ins(`<img src="${u}" alt="${a}" />\n`); else ins(`![${a}](${u})\n`); };
  const insCalc = (s: string) => { ins(`\n[calculator:${s}]\n`); };

  // MD toolbar actions
  const mdBold = () => ins("**", "**");
  const mdItalic = () => ins("*", "*");
  const mdStrike = () => ins("~~", "~~");
  const mdH1 = () => ins("# "); const mdH2 = () => ins("## "); const mdH3 = () => ins("### ");
  const mdList = () => ins("- "); const mdOl = () => ins("1. ");
  const mdQuote = () => ins("> "); const mdCode = () => ins("```\n", "\n```"); const mdHr = () => ins("\n---\n");
  const mdCheck = () => ins("- [ ] ");

  // HTML toolbar actions
  const htBold = () => ins("<strong>", "</strong>");
  const htItalic = () => ins("<em>", "</em>");
  const htStrike = () => ins("<del>", "</del>");
  const htH1 = () => ins("<h1>", "</h1>"); const htH2 = () => ins("<h2>", "</h2>"); const htH3 = () => ins("<h3>", "</h3>");
  const htP = () => ins("<p>", "</p>"); const htUl = () => ins("<ul>\n  <li>", "</li>\n</ul>"); const htOl = () => ins("<ol>\n  <li>", "</li>\n</ol>");
  const htQuote = () => ins("<blockquote>", "</blockquote>"); const htCode = () => ins("<pre><code>", "</code></pre>");
  const htHr = () => ins("\n<hr />\n"); const htDiv = () => ins('<div class="">', "</div>");
  const htSpan = () => ins('<span class="">', "</span>"); const htBr = () => ins("<br />\n");

  const save = async (draft = false) => {
    if (!form.titleEn.trim()) { alert("English title required"); return; }
    setSaving(true);
    try {
      const p = { ...form, status: draft ? "DRAFT" : form.status, readingTime: calcRT(form.contentEn) };
      const u = isEditing ? `/api/admin/blog/${params?.id}` : "/api/admin/blog";
      const r = await fetch(u, { method: isEditing ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(p) });
      if (r.ok) { setSaved(true); setTimeout(() => router.push("/en/admin/blog"), 800); }
      else { const e = await r.json(); alert(e.message || "Error"); }
    } catch (e) { console.error(e); alert("Error saving"); } setSaving(false);
  };

  const translate = async () => {
    if (!form.titleEn || !form.contentEn) { alert("Write English first"); return; }
    if (!confirm("Translate EN → all empty languages?")) return;
    setTranslating(true); setTrMsg("Starting...");
    const empties = LANGS.filter((l) => l.code !== "en" && ls(l.code) !== "complete");
    if (!empties.length) { setTranslating(false); setTrMsg("✅ All complete!"); setTimeout(() => setTrMsg(""), 3000); return; }
    try {
      let pid = params?.id as string;
      if (!isEditing) {
        setTrMsg("Saving draft..."); const sr = await fetch("/api/admin/blog", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, status: "DRAFT", readingTime: calcRT(form.contentEn) }) });
        if (!sr.ok) { alert("Save failed"); setTranslating(false); return; } const sd = await sr.json(); pid = sd.post?.id;
      } else { setTrMsg("Saving..."); await fetch(`/api/admin/blog/${pid}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, readingTime: calcRT(form.contentEn) }) }); }
      setTrMsg(`Translating → ${empties.map((l) => l.flag).join(" ")}...`);
      const tr = await fetch("/api/admin/blog/translate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ postId: pid }) });
      if (tr.ok) {
        setTrMsg("✅ Done!"); const pr = await fetch(`/api/admin/blog/${pid}`); const pd = await pr.json();
        if (pd.post) setForm((p) => ({ ...p, ...pd.post, categoryId: pd.post.categoryId || "", tags: pd.post.tags || [], scheduledAt: pd.post.scheduledAt || "", ...Object.fromEntries(LANGS.flatMap((l) => ["title", "slug", "excerpt", "content", "metaTitle", "metaDescription"].map((f) => [`${f}${cap(l.code)}`, pd.post[`${f}${cap(l.code)}`] || ""]))) }));
        if (!isEditing && pid) router.replace(`/en/admin/blog/${pid}`);
      } else { const e = await tr.json(); setTrMsg(`❌ ${e.message || "Failed"}`); }
    } catch (e) { console.error(e); setTrMsg("❌ Error"); } setTranslating(false); setTimeout(() => setTrMsg(""), 5000);
  };

  if (loading) return <div className="flex flex-col items-center justify-center min-h-[400px] gap-3"><div className="w-10 h-10 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" /><p className="text-slate-600">Loading...</p></div>;
  if (saved) return <div className="flex flex-col items-center justify-center min-h-[400px] gap-3"><div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center"><svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg></div><p className="text-lg font-semibold">Saved!</p></div>;

  // ═════ Toolbar Button ═════
  const B = ({ onClick, title, children, accent = "" }: { onClick: () => void; title: string; children: React.ReactNode; accent?: string }) => (
    <button onClick={onClick} title={title} className={`p-1.5 rounded-md transition-colors ${accent || "text-slate-500 hover:bg-slate-100 hover:text-slate-800"}`}>{children}</button>
  );
  const Sep = () => <div className="w-px h-5 bg-slate-200 mx-0.5" />;
  const Lbl = ({ children }: { children: React.ReactNode }) => <span className="text-[10px] font-bold leading-none">{children}</span>;

  const editorHeight = fullscreen ? "calc(100vh - 120px)" : "520px";
  const editorWrapCls = fullscreen ? "fixed inset-0 z-40 bg-white flex flex-col" : "bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden";

  // Rendered preview
  const previewHtml = isHtmlContent ? content : md2html(content);

  return (
    <div className={fullscreen ? "" : "space-y-6"}>
      <LinkModal open={showLinkM} onClose={() => setShowLinkM(false)} onInsert={insLink} mode={currentSourceMode} />
      <ImageModal open={showImgM} onClose={() => setShowImgM(false)} onInsert={insImg} mode={currentSourceMode} />
      <CalcModal open={showCalcM} onClose={() => setShowCalcM(false)} onInsert={insCalc} />
      <PreviewModal open={showPreview} onClose={() => setShowPreview(false)} form={form} lang={tab} />

      {/* ── HEADER ── */}
      {!fullscreen && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href="/en/admin/blog" className="p-2.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg></Link>
            <div><h1 className="text-2xl font-bold text-slate-900">{isEditing ? "Edit Post" : "New Post"}</h1><p className="text-slate-500 text-sm">Markdown + HTML · 5 languages</p></div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <div className="hidden lg:flex items-center gap-1 px-3 py-2 bg-slate-50 rounded-xl border border-slate-200">{LANGS.map((l) => { const st = ls(l.code); return <span key={l.code} className={`text-sm ${st === "complete" ? "" : st === "partial" ? "opacity-50" : "opacity-20 grayscale"}`} title={`${l.name}: ${st}`}>{l.flag}</span>; })}<span className="text-xs text-slate-500 ml-1.5">{trCount}/5</span></div>
            <button onClick={() => setShowPreview(true)} className="flex items-center gap-1.5 px-3 py-2.5 border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 font-medium text-sm">👁️ Preview</button>
            <button onClick={() => save(true)} disabled={saving} className="px-4 py-2.5 border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 font-medium text-sm disabled:opacity-50">Save Draft</button>
            <button onClick={() => save(false)} disabled={saving} className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-medium text-sm disabled:opacity-50 shadow-sm">{saving && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}{isEditing ? "Update" : "Publish"}</button>
          </div>
        </div>
      )}

      <div className={fullscreen ? "flex flex-col h-screen" : "grid grid-cols-1 xl:grid-cols-3 gap-6"}>
        {/* ═══════ MAIN ═══════ */}
        <div className={fullscreen ? "flex-1 flex flex-col overflow-hidden" : "xl:col-span-2 space-y-5"}>

          {/* Lang tabs + title/slug/excerpt */}
          {!fullscreen && (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="flex border-b border-slate-200 bg-slate-50/50">{LANGS.map((l) => { const st = ls(l.code); return (<button key={l.code} onClick={() => setTab(l.code)} className={`relative flex-1 py-3.5 text-sm font-medium transition-all ${tab === l.code ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700 hover:bg-white/50"}`}><div className="flex items-center justify-center gap-1.5"><span className="text-base">{l.flag}</span><span className="hidden sm:inline">{l.label}</span><span className="sm:hidden text-xs">{l.code.toUpperCase()}</span><span className={`w-1.5 h-1.5 rounded-full ${st === "complete" ? "bg-emerald-500" : st === "partial" ? "bg-amber-400" : "bg-slate-300"}`} /></div>{tab === l.code && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />}</button>); })}</div>
              <div className="p-6 space-y-5">
                <div><label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">Title{tab === "en" && <span className="text-xs font-normal text-red-500 bg-red-50 px-1.5 py-0.5 rounded">Required</span>}</label><input type="text" value={form[lf("title", tab)] as string} onChange={(e) => setTitle(tab, e.target.value)} placeholder={`Title in ${LANGS.find((l) => l.code === tab)?.name}...`} className="w-full px-4 py-3 text-lg border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-300" /></div>
                <div><label className="block text-sm font-semibold text-slate-700 mb-2">Slug</label><div className="flex items-center"><span className="text-sm text-slate-400 bg-slate-50 px-3 py-2.5 rounded-l-xl border border-r-0 border-slate-200 whitespace-nowrap">/{tab}/blog/</span><input type="text" value={form[lf("slug", tab)] as string} onChange={(e) => set(lf("slug", tab), e.target.value)} className="flex-1 px-4 py-2.5 border border-slate-200 rounded-r-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm" /></div></div>
                <div><label className="block text-sm font-semibold text-slate-700 mb-2">Excerpt</label><textarea value={form[lf("excerpt", tab)] as string} onChange={(e) => set(lf("excerpt", tab), e.target.value)} placeholder="Summary for listings and social..." rows={2} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none placeholder:text-slate-300" /></div>
              </div>
            </div>
          )}

          {/* ── EDITOR ── */}
          <div className={editorWrapCls}>
            <div className="border-b border-slate-200 shrink-0">
              {/* Mode switcher + info */}
              <div className="flex items-center justify-between px-3 pt-2.5 pb-0 gap-2 flex-wrap">
                <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-0.5">
                  {([
                    { m: "split-md" as EditorMode, l: "📐 MD Split" }, { m: "split-html" as EditorMode, l: "📐 HTML Split" },
                    { m: "md" as EditorMode, l: "✏️ Markdown" }, { m: "html" as EditorMode, l: "</> HTML" },
                    { m: "preview" as EditorMode, l: "👁️ Preview" },
                  ]).map((x) => (<button key={x.m} onClick={() => setMode(x.m)} className={`px-2.5 py-1.5 rounded-md text-xs font-medium transition-all whitespace-nowrap ${mode === x.m ? "bg-white shadow-sm text-slate-900" : "text-slate-500 hover:text-slate-700"}`}>{x.l}</button>))}
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span>{wc} words</span><span>·</span><span>{charCount.toLocaleString()} chars</span><span>·</span><span>~{calcRT(content)} min</span>
                  {isHtmlContent && <span className="px-1.5 py-0.5 bg-orange-100 text-orange-700 rounded text-[10px] font-bold">HTML</span>}
                  <button onClick={() => setFullscreen(!fullscreen)} className="p-1 hover:bg-slate-100 rounded" title={fullscreen ? "Exit fullscreen" : "Fullscreen"}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">{fullscreen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />}</svg>
                  </button>
                </div>
              </div>

              {/* Toolbar — Markdown */}
              {(mode === "md" || mode === "split-md") && (
                <div className="flex items-center gap-0.5 p-2 px-3 flex-wrap">
                  <B onClick={mdBold} title="Bold (⌘B)"><Lbl>B</Lbl></B>
                  <B onClick={mdItalic} title="Italic (⌘I)"><Lbl><em>I</em></Lbl></B>
                  <B onClick={mdStrike} title="Strikethrough"><Lbl><s>S</s></Lbl></B>
                  <Sep />
                  <B onClick={mdH1} title="H1"><Lbl>H1</Lbl></B><B onClick={mdH2} title="H2"><Lbl>H2</Lbl></B><B onClick={mdH3} title="H3"><Lbl>H3</Lbl></B>
                  <Sep />
                  <B onClick={() => setShowLinkM(true)} title="Link (⌘K)" accent="text-blue-500 hover:bg-blue-50"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg></B>
                  <B onClick={() => setShowImgM(true)} title="Image" accent="text-purple-500 hover:bg-purple-50"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg></B>
                  <B onClick={() => setShowCalcM(true)} title="Calculator" accent="text-amber-500 hover:bg-amber-50"><span className="text-sm">🧮</span></B>
                  <Sep />
                  <B onClick={mdList} title="Bullet list"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg></B>
                  <B onClick={mdOl} title="Numbered list"><Lbl>1.</Lbl></B>
                  <B onClick={mdCheck} title="Checkbox"><Lbl>☑</Lbl></B>
                  <B onClick={mdQuote} title="Quote"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg></B>
                  <B onClick={mdCode} title="Code block"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg></B>
                  <B onClick={mdHr} title="Divider"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" /></svg></B>
                  <Sep />
                  <B onClick={() => setShowFind(!showFind)} title="Find & Replace (⌘H)"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg></B>
                </div>
              )}

              {/* Toolbar — HTML */}
              {(mode === "html" || mode === "split-html") && (
                <div className="flex items-center gap-0.5 p-2 px-3 flex-wrap">
                  <B onClick={htBold} title="<strong>"><Lbl>&lt;b&gt;</Lbl></B>
                  <B onClick={htItalic} title="<em>"><Lbl>&lt;i&gt;</Lbl></B>
                  <B onClick={htStrike} title="<del>"><Lbl>&lt;del&gt;</Lbl></B>
                  <Sep />
                  <B onClick={htH1} title="<h1>"><Lbl>h1</Lbl></B><B onClick={htH2} title="<h2>"><Lbl>h2</Lbl></B><B onClick={htH3} title="<h3>"><Lbl>h3</Lbl></B>
                  <B onClick={htP} title="<p>"><Lbl>&lt;p&gt;</Lbl></B>
                  <Sep />
                  <B onClick={() => setShowLinkM(true)} title="<a href>" accent="text-blue-500 hover:bg-blue-50"><Lbl>&lt;a&gt;</Lbl></B>
                  <B onClick={() => setShowImgM(true)} title="<img>" accent="text-purple-500 hover:bg-purple-50"><Lbl>&lt;img&gt;</Lbl></B>
                  <B onClick={() => setShowCalcM(true)} title="Calculator" accent="text-amber-500 hover:bg-amber-50"><span className="text-sm">🧮</span></B>
                  <Sep />
                  <B onClick={htUl} title="<ul>"><Lbl>&lt;ul&gt;</Lbl></B>
                  <B onClick={htOl} title="<ol>"><Lbl>&lt;ol&gt;</Lbl></B>
                  <B onClick={htQuote} title="<blockquote>"><Lbl>&lt;bq&gt;</Lbl></B>
                  <B onClick={htCode} title="<pre><code>"><Lbl>&lt;pre&gt;</Lbl></B>
                  <B onClick={htHr} title="<hr>"><Lbl>&lt;hr&gt;</Lbl></B>
                  <B onClick={htDiv} title="<div>"><Lbl>&lt;div&gt;</Lbl></B>
                  <B onClick={htSpan} title="<span>"><Lbl>&lt;span&gt;</Lbl></B>
                  <B onClick={htBr} title="<br>"><Lbl>&lt;br&gt;</Lbl></B>
                  <Sep />
                  <B onClick={() => setShowFind(!showFind)} title="Find & Replace"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg></B>
                </div>
              )}
            </div>

            {/* Editor body */}
            <div className={`relative ${mode.startsWith("split") ? "grid grid-cols-2 divide-x divide-slate-200" : ""}`} style={{ minHeight: editorHeight, height: fullscreen ? editorHeight : undefined }}>
              {showFind && <FindReplace open={showFind} onClose={() => setShowFind(false)} content={content} onReplace={(n) => set(lf("content", tab), n)} />}

              {/* Source pane (md or html) */}
              {mode !== "preview" && (
                <textarea
                  ref={editorRef}
                  value={content}
                  onChange={(e) => set(lf("content", tab), e.target.value)}
                  placeholder={mode.includes("html")
                    ? `<h1>Your Title</h1>\n<p>Write HTML here...</p>\n<a href="https://...">Link</a>\n<img src="..." alt="..." />`
                    : `# Heading\n**Bold** *italic* ~~strike~~\n[Link](url) ![Image](url)\n- Bullet\n1. Numbered\n> Quote\n\`\`\`code\`\`\``
                  }
                  className={`w-full h-full px-5 py-4 focus:outline-none resize-none text-sm leading-relaxed placeholder:text-slate-300 ${mode.includes("html") ? "font-mono text-slate-800 bg-slate-50/30" : "font-mono"}`}
                  style={{ minHeight: editorHeight }}
                  spellCheck={!mode.includes("html")}
                  onKeyDown={(e) => {
                    if (e.key === "b" && (e.ctrlKey || e.metaKey)) { e.preventDefault(); mode.includes("html") ? htBold() : mdBold(); }
                    if (e.key === "i" && (e.ctrlKey || e.metaKey)) { e.preventDefault(); mode.includes("html") ? htItalic() : mdItalic(); }
                    if (e.key === "k" && (e.ctrlKey || e.metaKey)) { e.preventDefault(); setShowLinkM(true); }
                    if (e.key === "h" && (e.ctrlKey || e.metaKey)) { e.preventDefault(); setShowFind(true); }
                    if (e.key === "s" && (e.ctrlKey || e.metaKey)) { e.preventDefault(); save(true); }
                    if (e.key === "Tab") { e.preventDefault(); ins("  "); }
                    if (e.key === "Escape" && fullscreen) setFullscreen(false);
                  }}
                />
              )}

              {/* Preview pane */}
              {(mode === "preview" || mode.startsWith("split")) && (
                <div className="overflow-y-auto p-6" style={{ minHeight: editorHeight, maxHeight: fullscreen ? editorHeight : "700px" }}>
                  {mode.startsWith("split") && <div className="flex items-center gap-2 mb-4"><span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Live Preview</span>{isHtmlContent && <span className="text-[10px] px-1.5 py-0.5 bg-orange-100 text-orange-700 rounded font-bold">HTML</span>}</div>}
                  <div dangerouslySetInnerHTML={{ __html: previewHtml }} />
                </div>
              )}
            </div>
          </div>

          {/* SEO + Translations (not in fullscreen) */}
          {!fullscreen && (<>
            {/* SEO */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <button onClick={() => setShowSeo(!showSeo)} className="flex items-center justify-between w-full p-4 hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3"><span className="text-lg">🔍</span><div className="text-left"><p className="font-semibold text-slate-700 text-sm">SEO</p><p className="text-xs text-slate-400">{LANGS.find((l) => l.code === tab)?.name}</p></div></div>
                <div className="flex items-center gap-3"><span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${seoS >= 80 ? "bg-emerald-100 text-emerald-700" : seoS >= 50 ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"}`}>{seoS}%</span><svg className={`w-5 h-5 text-slate-400 transition-transform ${showSeo ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg></div>
              </button>
              {showSeo && (
                <div className="p-5 space-y-4 border-t border-slate-100">
                  {seoI.length > 0 && <div className="flex flex-wrap gap-2 pb-3">{seoI.map((i, x) => <span key={x} className="text-xs px-2 py-1 bg-amber-50 text-amber-700 rounded-lg">⚠️ {i}</span>)}</div>}
                  <div><label className="flex justify-between text-sm text-slate-600 mb-1"><span>Meta Title</span><span className={`text-xs ${((form[lf("metaTitle", tab)] as string) || "").length > 55 ? "text-red-500" : "text-slate-400"}`}>{((form[lf("metaTitle", tab)] as string) || "").length}/60</span></label><input type="text" value={form[lf("metaTitle", tab)] as string} onChange={(e) => set(lf("metaTitle", tab), e.target.value)} maxLength={60} placeholder="SEO title" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" /></div>
                  <div><label className="flex justify-between text-sm text-slate-600 mb-1"><span>Meta Description</span><span className={`text-xs ${((form[lf("metaDescription", tab)] as string) || "").length > 150 ? "text-red-500" : "text-slate-400"}`}>{((form[lf("metaDescription", tab)] as string) || "").length}/155</span></label><textarea value={form[lf("metaDescription", tab)] as string} onChange={(e) => set(lf("metaDescription", tab), e.target.value)} maxLength={155} rows={2} placeholder="SEO description" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" /></div>
                  <div className="p-4 bg-slate-50 rounded-xl"><p className="text-xs text-slate-400 mb-2">Google Preview</p><p className="text-blue-700 text-base font-medium truncate">{(form[lf("metaTitle", tab)] as string) || "Title"}</p><p className="text-emerald-700 text-xs truncate mt-0.5">kalcufy.com/{tab}/blog/{(form[lf("slug", tab)] as string) || "slug"}</p><p className="text-slate-600 text-sm mt-1 line-clamp-2">{(form[lf("metaDescription", tab)] as string) || "Description..."}</p></div>
                </div>
              )}
            </div>

            {/* Translations */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-slate-900">Translations</h3>
                <button onClick={translate} disabled={translating} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${translating ? "bg-slate-100 text-slate-400" : "bg-gradient-to-r from-violet-600 to-blue-600 text-white hover:from-violet-700 hover:to-blue-700 shadow-sm"}`}>{translating ? <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" /> : <span>🤖</span>}{translating ? "Working..." : "Auto-Translate"}</button>
              </div>
              {trMsg && <div className={`mb-4 p-3 rounded-xl text-sm font-medium ${trMsg.startsWith("✅") ? "bg-emerald-50 text-emerald-700" : trMsg.startsWith("❌") ? "bg-red-50 text-red-700" : "bg-blue-50 text-blue-700"}`}>{trMsg}</div>}
              <div className="grid grid-cols-5 gap-3">{LANGS.map((l) => { const st = ls(l.code); const c = form[lf("content", l.code)] as string; const cw = c.trim().split(/\s+/).filter(Boolean).length; return (<button key={l.code} onClick={() => setTab(l.code)} className={`p-3 rounded-xl border text-center transition-all ${tab === l.code ? "border-blue-300 bg-blue-50 ring-1 ring-blue-200" : st === "complete" ? "border-emerald-200 bg-emerald-50 hover:bg-emerald-100" : st === "partial" ? "border-amber-200 bg-amber-50 hover:bg-amber-100" : "border-slate-200 bg-slate-50 hover:bg-slate-100"}`}><span className="text-2xl block mb-1">{l.flag}</span><p className="text-xs font-bold text-slate-700">{l.code.toUpperCase()}</p><p className={`text-xs mt-1 ${st === "complete" ? "text-emerald-600" : st === "partial" ? "text-amber-600" : "text-slate-400"}`}>{st === "complete" ? `✓ ${cw}w` : st === "partial" ? "Partial" : "Empty"}</p></button>); })}</div>
            </div>
          </>)}
        </div>

        {/* ═══════ SIDEBAR ═══════ */}
        {!fullscreen && (
          <div className="space-y-5">
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm"><h3 className="font-semibold text-slate-900 mb-4">📋 Publish</h3><div className="grid grid-cols-2 gap-2 mb-4">{statusOpts.map((o) => (<button key={o.v} onClick={() => set("status", o.v)} className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm font-medium transition-all ${form.status === o.v ? `${o.c} border-current ring-1 ring-current/20` : "border-slate-200 text-slate-600 hover:bg-slate-50"}`}><span>{o.i}</span>{o.l}</button>))}</div>{form.status === "SCHEDULED" && <div className="mb-4"><label className="block text-sm text-slate-600 mb-1">Schedule</label><input type="datetime-local" value={form.scheduledAt} onChange={(e) => set("scheduledAt", e.target.value)} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" /></div>}<div><label className="block text-sm text-slate-600 mb-1">Reading Time</label><div className="flex items-center gap-2"><input type="number" value={form.readingTime} onChange={(e) => set("readingTime", parseInt(e.target.value) || 1)} min={1} className="w-20 px-3 py-2.5 border border-slate-200 rounded-xl text-center focus:outline-none focus:ring-2 focus:ring-blue-500" /><span className="text-sm text-slate-500">min</span><button onClick={() => set("readingTime", calcRT(form.contentEn))} className="ml-auto text-xs text-blue-600 font-medium">Auto</button></div></div></div>
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm"><div className="flex items-center justify-between mb-4"><h3 className="font-semibold text-slate-900">🏷️ Category</h3><Link href="/en/admin/blog/categories" className="text-xs text-blue-600 font-medium">Manage</Link></div><div className="space-y-2 max-h-52 overflow-y-auto">{cats.map((c) => (<label key={c.id} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${form.categoryId === c.id ? `${colorCls[c.color]} border-current ring-1 ring-current/20` : "border-slate-200 hover:bg-slate-50"}`}><input type="radio" name="cat" value={c.id} checked={form.categoryId === c.id} onChange={() => set("categoryId", c.id)} className="sr-only" /><span className="text-lg">{c.icon}</span><span className="font-medium text-sm">{c.nameEn}</span></label>))}{!cats.length && <p className="text-sm text-slate-400 text-center py-3">No categories</p>}</div></div>
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm"><h3 className="font-semibold text-slate-900 mb-4">🖼️ Featured Image</h3>{form.featuredImage ? <div className="relative group mb-3"><img src={form.featuredImage} alt="" className="w-full h-36 object-cover rounded-xl" /><button onClick={() => set("featuredImage", "")} className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button></div> : <div className="border-2 border-dashed border-slate-200 rounded-xl p-5 text-center mb-3"><span className="text-3xl block mb-1">📷</span><p className="text-xs text-slate-400">Paste URL</p></div>}<input type="text" value={form.featuredImage} onChange={(e) => set("featuredImage", e.target.value)} placeholder="https://images.unsplash.com/..." className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" /></div>
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm"><h3 className="font-semibold text-slate-900 mb-3">🌐 OG Image</h3><p className="text-xs text-slate-400 mb-3">Social preview (uses featured if empty)</p>{form.ogImage && <img src={form.ogImage} alt="" className="w-full h-28 object-cover rounded-xl mb-3" />}<input type="text" value={form.ogImage} onChange={(e) => set("ogImage", e.target.value)} placeholder="https://..." className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" /></div>
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm"><h3 className="font-semibold text-slate-900 mb-4">🧮 Calculator</h3><select value={form.relatedCalculator} onChange={(e) => set("relatedCalculator", e.target.value)} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm"><option value="">None</option>{calculators.map((c) => <option key={c.slug} value={c.slug}>{c.icon} {c.name}</option>)}</select></div>
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm"><h3 className="font-semibold text-slate-900 mb-4"># Tags</h3>{form.tags.length > 0 && <div className="flex flex-wrap gap-2 mb-3">{form.tags.map((t) => <span key={t} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium">{t}<button onClick={() => rmTag(t)} className="text-slate-400 hover:text-red-500"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button></span>)}</div>}<div className="flex gap-2"><input type="text" value={newTag} onChange={(e) => setNewTag(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())} placeholder="Add tag..." className="flex-1 px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" /><button onClick={addTag} className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 font-medium text-sm">Add</button></div></div>
          </div>
        )}
      </div>
    </div>
  );
}
