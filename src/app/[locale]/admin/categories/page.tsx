// src/app/[locale]/admin/categories/page.tsx
"use client";

import { useState, useEffect } from "react";
import {
  Plus, Edit2, Trash2, GripVertical, Home, Menu, Tag, ChevronRight, X, Eye, EyeOff,
  Folder, Layers, CheckCircle2, Search, ArrowUp, ArrowDown,
} from "lucide-react";

interface Category {
  id: string;
  slug: string;
  nameEn: string;
  nameEs: string | null;
  namePt: string | null;
  icon: string | null;
  color: string;
  description: string | null;
  isActive: boolean;
  showInMenu: boolean;
  showInHome: boolean;
  sortOrder: number;
  _count: { calculators: number };
}

interface Subcategory {
  id: string;
  slug: string;
  nameEn: string;
  nameEs: string | null;
  namePt: string | null;
  nameFr: string | null;
  nameDe: string | null;
  categoryId: string;
  sortOrder: number;
  isActive: boolean;
}

const COLORS = [
  { name: "Blue", value: "blue", bg: "bg-blue-500", ring: "ring-blue-300" },
  { name: "Green", value: "green", bg: "bg-green-500", ring: "ring-green-300" },
  { name: "Purple", value: "purple", bg: "bg-purple-500", ring: "ring-purple-300" },
  { name: "Red", value: "red", bg: "bg-red-500", ring: "ring-red-300" },
  { name: "Orange", value: "orange", bg: "bg-orange-500", ring: "ring-orange-300" },
  { name: "Cyan", value: "cyan", bg: "bg-cyan-500", ring: "ring-cyan-300" },
  { name: "Pink", value: "pink", bg: "bg-pink-500", ring: "ring-pink-300" },
  { name: "Amber", value: "amber", bg: "bg-amber-500", ring: "ring-amber-300" },
  { name: "Teal", value: "teal", bg: "bg-teal-500", ring: "ring-teal-300" },
];

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);
  const [saving, setSaving] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [showSubModal, setShowSubModal] = useState(false);
  const [editingSub, setEditingSub] = useState<Subcategory | null>(null);
  const [subForm, setSubForm] = useState({ slug: "", nameEn: "", nameEs: "", namePt: "", nameFr: "", nameDe: "", categoryId: "" });
  const [savingSub, setSavingSub] = useState(false);
  const [draggedItem, setDraggedItem] = useState<Category | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);
  const [savingOrder, setSavingOrder] = useState(false);
  const [form, setForm] = useState({ slug: "", nameEn: "", nameEs: "", namePt: "", icon: "", color: "blue", description: "", showInMenu: true, showInHome: true });

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const [catRes, subRes] = await Promise.all([fetch("/api/admin/calculator-categories"), fetch("/api/admin/calculator-subcategories")]);
      if (catRes.ok) { const d = await catRes.json(); d.sort((a: Category, b: Category) => a.sortOrder - b.sortOrder); setCategories(d); }
      if (subRes.ok) { setSubcategories(await subRes.json()); }
    } catch (e) { console.error(e); } finally { setLoading(false); }
  };

  const getSubsForCategory = (id: string) => subcategories.filter(s => s.categoryId === id).sort((a, b) => a.sortOrder - b.sortOrder);

  const handleDragStart = (e: React.DragEvent, c: Category) => { setDraggedItem(c); e.dataTransfer.effectAllowed = "move"; setTimeout(() => { const el = document.getElementById(`cat-${c.id}`); if (el) el.style.opacity = "0.4"; }, 0); };
  const handleDragEnd = () => { if (draggedItem) { const el = document.getElementById(`cat-${draggedItem.id}`); if (el) el.style.opacity = "1"; } setDraggedItem(null); setDragOverId(null); };
  const handleDragOver = (e: React.DragEvent, c: Category) => { e.preventDefault(); if (draggedItem && draggedItem.id !== c.id) setDragOverId(c.id); };
  const handleDrop = async (e: React.DragEvent, t: Category) => {
    e.preventDefault(); if (!draggedItem || draggedItem.id === t.id) { setDragOverId(null); return; }
    const a = [...categories]; const di = a.findIndex(c => c.id === draggedItem.id); const ti = a.findIndex(c => c.id === t.id);
    a.splice(di, 1); a.splice(ti, 0, draggedItem); const u = a.map((c, i) => ({ ...c, sortOrder: i })); setCategories(u); setDragOverId(null); await saveOrder(u);
  };
  const saveOrder = async (o: Category[]) => { setSavingOrder(true); try { const r = await fetch("/api/admin/calculator-categories/reorder", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ order: o.map((c, i) => ({ id: c.id, sortOrder: i })) }) }); if (!r.ok) fetchData(); } catch { fetchData(); } finally { setSavingOrder(false); } };
  const moveCategory = async (c: Category, d: "up" | "down") => { const i = categories.findIndex(x => x.id === c.id); if (d === "up" && i === 0) return; if (d === "down" && i === categories.length - 1) return; const a = [...categories]; const s = d === "up" ? i - 1 : i + 1; [a[i], a[s]] = [a[s], a[i]]; const u = a.map((x, j) => ({ ...x, sortOrder: j })); setCategories(u); await saveOrder(u); };

  const openModal = (c?: Category) => { if (c) { setEditing(c); setForm({ slug: c.slug, nameEn: c.nameEn, nameEs: c.nameEs || "", namePt: c.namePt || "", icon: c.icon || "", color: c.color, description: c.description || "", showInMenu: c.showInMenu, showInHome: c.showInHome }); } else { setEditing(null); setForm({ slug: "", nameEn: "", nameEs: "", namePt: "", icon: "", color: "blue", description: "", showInMenu: true, showInHome: true }); } setShowModal(true); };
  const handleSave = async () => { if (!form.slug || !form.nameEn) return; setSaving(true); try { const u = editing ? `/api/admin/calculator-categories/${editing.id}` : "/api/admin/calculator-categories"; const r = await fetch(u, { method: editing ? "PATCH" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) }); if (r.ok) { fetchData(); setShowModal(false); } else { const e = await r.json(); alert(e.error || "Error"); } } catch { } finally { setSaving(false); } };
  const handleDelete = async (c: Category) => { if (!confirm(`Delete "${c.nameEn}"?`)) return; try { const r = await fetch(`/api/admin/calculator-categories/${c.id}`, { method: "DELETE" }); if (r.ok) fetchData(); } catch { } };
  const toggleField = async (c: Category, f: "isActive" | "showInMenu" | "showInHome") => { try { const r = await fetch(`/api/admin/calculator-categories/${c.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ [f]: !c[f] }) }); if (r.ok) setCategories(p => p.map(x => x.id === c.id ? { ...x, [f]: !x[f] } : x)); } catch { } };

  const openSubModal = (catId: string, s?: Subcategory) => { if (s) { setEditingSub(s); setSubForm({ slug: s.slug, nameEn: s.nameEn, nameEs: s.nameEs || "", namePt: s.namePt || "", nameFr: s.nameFr || "", nameDe: s.nameDe || "", categoryId: s.categoryId }); } else { setEditingSub(null); setSubForm({ slug: "", nameEn: "", nameEs: "", namePt: "", nameFr: "", nameDe: "", categoryId: catId }); } setShowSubModal(true); };
  const handleSaveSub = async () => { if (!subForm.slug || !subForm.nameEn) return; setSavingSub(true); try { const u = editingSub ? `/api/admin/calculator-subcategories/${editingSub.id}` : "/api/admin/calculator-subcategories"; const r = await fetch(u, { method: editingSub ? "PATCH" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(subForm) }); if (r.ok) { fetchData(); setShowSubModal(false); } else { const e = await r.json(); alert(e.error || "Error"); } } catch { } finally { setSavingSub(false); } };
  const handleDeleteSub = async (s: Subcategory) => { if (!confirm(`Delete "${s.nameEn}"?`)) return; try { const r = await fetch(`/api/admin/calculator-subcategories/${s.id}`, { method: "DELETE" }); if (r.ok) fetchData(); } catch { } };
  const toggleSubActive = async (s: Subcategory) => { try { const r = await fetch(`/api/admin/calculator-subcategories/${s.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ isActive: !s.isActive }) }); if (r.ok) setSubcategories(p => p.map(x => x.id === s.id ? { ...x, isActive: !x.isActive } : x)); } catch { } };

  const cc = (color: string) => {
    const m: Record<string, { bg: string; light: string; text: string; border: string; dot: string }> = {
      blue: { bg: "bg-blue-500", light: "bg-blue-50", text: "text-blue-700", border: "border-blue-200", dot: "bg-blue-400" },
      green: { bg: "bg-green-500", light: "bg-green-50", text: "text-green-700", border: "border-green-200", dot: "bg-green-400" },
      purple: { bg: "bg-purple-500", light: "bg-purple-50", text: "text-purple-700", border: "border-purple-200", dot: "bg-purple-400" },
      red: { bg: "bg-red-500", light: "bg-red-50", text: "text-red-700", border: "border-red-200", dot: "bg-red-400" },
      orange: { bg: "bg-orange-500", light: "bg-orange-50", text: "text-orange-700", border: "border-orange-200", dot: "bg-orange-400" },
      cyan: { bg: "bg-cyan-500", light: "bg-cyan-50", text: "text-cyan-700", border: "border-cyan-200", dot: "bg-cyan-400" },
      pink: { bg: "bg-pink-500", light: "bg-pink-50", text: "text-pink-700", border: "border-pink-200", dot: "bg-pink-400" },
      amber: { bg: "bg-amber-500", light: "bg-amber-50", text: "text-amber-700", border: "border-amber-200", dot: "bg-amber-400" },
      teal: { bg: "bg-teal-500", light: "bg-teal-50", text: "text-teal-700", border: "border-teal-200", dot: "bg-teal-400" },
    };
    return m[color] || m.blue;
  };

  const filtered = search ? categories.filter(c => c.nameEn.toLowerCase().includes(search.toLowerCase()) || c.slug.includes(search.toLowerCase())) : categories;
  const totalCalcs = categories.reduce((s, c) => s + c._count.calculators, 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-lg sm:text-lg sm:text-2xl font-bold text-slate-900 tracking-tight">Categories</h1>
          <p className="text-sm text-slate-500 mt-1">Manage calculator categories and subcategories</p>
        </div>
        <button onClick={() => openModal()} className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white text-sm font-medium rounded-xl hover:bg-slate-800 transition-all shadow-sm hover:shadow-md active:scale-[0.98]">
          <Plus className="w-4 h-4" />
          New Category
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Categories", value: categories.length, icon: <Folder className="w-5 h-5" />, color: "text-blue-600 bg-blue-50" },
          { label: "Subcategories", value: subcategories.length, icon: <Tag className="w-5 h-5" />, color: "text-purple-600 bg-purple-50" },
          { label: "Active", value: categories.filter(c => c.isActive).length, icon: <CheckCircle2 className="w-5 h-5" />, color: "text-emerald-600 bg-emerald-50" },
          { label: "Calculators", value: totalCalcs, icon: <Layers className="w-5 h-5" />, color: "text-amber-600 bg-amber-50" },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl border border-slate-200/60 p-5 shadow-sm">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.color} mb-3`}>{s.icon}</div>
            <p className="text-lg sm:text-lg sm:text-2xl font-bold text-slate-900 tracking-tight">{s.value}</p>
            <p className="text-xs text-slate-500 mt-0.5 font-medium uppercase tracking-wider">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input type="text" placeholder="Filter categories..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2 text-sm border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-300" />
        </div>
        {savingOrder && <span className="text-xs text-blue-600 flex items-center gap-1.5 bg-blue-50 px-3 py-1.5 rounded-full"><div className="w-3 h-3 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />Saving...</span>}
      </div>

      {/* List */}
      {loading ? (
        <div className="flex items-center justify-center py-20"><div className="w-8 h-8 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" /></div>
      ) : (
        <div className="space-y-3">
          {filtered.map((cat, idx) => {
            const subs = getSubsForCategory(cat.id);
            const exp = expandedCategory === cat.id;
            const c = cc(cat.color);
            return (
              <div key={cat.id} id={`cat-${cat.id}`} className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden ${dragOverId === cat.id ? "border-blue-400 shadow-md ring-2 ring-blue-100" : exp ? "border-slate-200 shadow-md" : "border-slate-200/60 shadow-sm hover:shadow-md hover:border-slate-300"}`}>
                <div draggable onDragStart={e => handleDragStart(e, cat)} onDragEnd={handleDragEnd} onDragOver={e => handleDragOver(e, cat)} onDragLeave={() => setDragOverId(null)} onDrop={e => handleDrop(e, cat)} className="p-4 sm:p-5">
                  <div className="flex items-center gap-4">
                    <div className="cursor-grab active:cursor-grabbing text-slate-300 hover:text-slate-500 transition-colors flex-shrink-0"><GripVertical className="w-5 h-5" /></div>
                    <button onClick={() => setExpandedCategory(exp ? null : cat.id)} className={`flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-md transition-all duration-200 ${exp ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-400 hover:bg-slate-200"}`}>
                      <ChevronRight className={`w-3.5 h-3.5 transition-transform duration-200 ${exp ? "rotate-90" : ""}`} />
                    </button>
                    <div className={`w-11 h-11 rounded-xl ${c.bg} flex items-center justify-center flex-shrink-0 shadow-sm`}>
                      {cat.icon ? <span className="text-xl leading-none">{cat.icon}</span> : <Folder className="w-5 h-5 text-white/80" />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2.5">
                        <h3 className="font-semibold text-slate-900 truncate">{cat.nameEn}</h3>
                        <span className={`text-[10px] px-2 py-0.5 rounded-md font-semibold uppercase tracking-wider ${c.light} ${c.text} ${c.border} border`}>{cat.slug}</span>
                      </div>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-slate-400">{cat._count.calculators} calculator{cat._count.calculators !== 1 ? "s" : ""}</span>
                        <span className="text-slate-200">·</span>
                        <span className="text-xs text-slate-400">{subs.length} subcategor{subs.length !== 1 ? "ies" : "y"}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button onClick={() => setExpandedCategory(exp ? null : cat.id)} className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 rounded-lg transition-colors ${subs.length > 0 ? `${c.light} ${c.text} hover:opacity-80` : "bg-slate-50 text-slate-400"}`}>
                        <Tag className="w-3 h-3" />{subs.length}
                      </button>
                      <div className="flex flex-col -space-y-px">
                        <button onClick={() => moveCategory(cat, "up")} disabled={idx === 0} className="p-1 text-slate-300 hover:text-slate-600 disabled:opacity-20 transition-colors"><ArrowUp className="w-3.5 h-3.5" /></button>
                        <button onClick={() => moveCategory(cat, "down")} disabled={idx === categories.length - 1} className="p-1 text-slate-300 hover:text-slate-600 disabled:opacity-20 transition-colors"><ArrowDown className="w-3.5 h-3.5" /></button>
                      </div>
                      <div className="w-px h-7 bg-slate-100 mx-1" />
                      <button onClick={() => toggleField(cat, "showInMenu")} className={`p-2 rounded-lg transition-all ${cat.showInMenu ? "bg-blue-50 text-blue-600 shadow-sm" : "text-slate-300 hover:text-slate-500 hover:bg-slate-50"}`} title={cat.showInMenu ? "In menu" : "Hidden"}><Menu className="w-4 h-4" /></button>
                      <button onClick={() => toggleField(cat, "showInHome")} className={`p-2 rounded-lg transition-all ${cat.showInHome ? "bg-purple-50 text-purple-600 shadow-sm" : "text-slate-300 hover:text-slate-500 hover:bg-slate-50"}`} title={cat.showInHome ? "On homepage" : "Hidden"}><Home className="w-4 h-4" /></button>
                      <button onClick={() => toggleField(cat, "isActive")} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${cat.isActive ? "bg-emerald-500" : "bg-slate-200"}`}>
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-200 ${cat.isActive ? "translate-x-6" : "translate-x-1"}`} />
                      </button>
                      <div className="w-px h-7 bg-slate-100 mx-1" />
                      <button onClick={() => openModal(cat)} className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"><Edit2 className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(cat)} className="p-2 text-slate-300 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                </div>

                {exp && (
                  <div className="border-t border-slate-100 bg-slate-50/50">
                    <div className="px-5 sm:px-3 sm:px-3 sm:px-6 py-2.5 sm:py-3 sm:py-4">
                      <div className="ml-[72px]">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-sm font-semibold text-slate-700">Subcategories for {cat.nameEn}</h4>
                          <button onClick={() => openSubModal(cat.id)} className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 px-3.5 py-2 rounded-lg transition-all shadow-sm active:scale-[0.98]">
                            <Plus className="w-3.5 h-3.5" />Add Subcategory
                          </button>
                        </div>
                        {subs.length === 0 ? (
                          <div className="text-center py-8 bg-white rounded-xl border border-dashed border-slate-200">
                            <Tag className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                            <p className="text-sm text-slate-400">No subcategories yet</p>
                            <button onClick={() => openSubModal(cat.id)} className="text-xs text-blue-600 hover:text-blue-700 font-medium mt-2 inline-block">Create the first one →</button>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            {subs.map(sub => (
                              <div key={sub.id} className={`group flex items-center justify-between bg-white rounded-xl px-4 py-3 border transition-all hover:shadow-sm ${sub.isActive ? "border-slate-200" : "border-slate-100 opacity-60"}`}>
                                <div className="flex items-center gap-3">
                                  <div className={`w-2 h-2 rounded-full ${c.dot}`} />
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <span className="text-sm font-medium text-slate-800">{sub.nameEn}</span>
                                      <span className="text-[10px] text-slate-400 font-mono bg-slate-50 px-1.5 py-0.5 rounded">{sub.slug}</span>
                                    </div>
                                    {sub.nameEs && <span className="text-xs text-slate-400 mt-0.5 block">{sub.nameEs}</span>}
                                  </div>
                                </div>
                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <button onClick={() => toggleSubActive(sub)} className={`p-1.5 rounded-lg transition-colors ${sub.isActive ? "text-emerald-500 hover:bg-emerald-50" : "text-slate-400 hover:bg-slate-50"}`}>{sub.isActive ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}</button>
                                  <button onClick={() => openSubModal(cat.id, sub)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Edit2 className="w-3.5 h-3.5" /></button>
                                  <button onClick={() => handleDeleteSub(sub)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
          {filtered.length === 0 && !loading && (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-200/60">
              <Folder className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500 font-medium">{search ? "No categories match your search" : "No categories yet"}</p>
              {!search && <button onClick={() => openModal()} className="text-sm text-blue-600 hover:text-blue-700 font-medium mt-2">Create your first category →</button>}
            </div>
          )}
        </div>
      )}

      {/* Category Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">{editing ? "Edit Category" : "New Category"}</h2>
              <button onClick={() => setShowModal(false)} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-5">
              <div><label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Slug *</label><input type="text" value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value.toLowerCase().replace(/\s+/g, "-") })} placeholder="finance" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900/10 focus:border-slate-300 text-sm" disabled={!!editing} /></div>
              <div><label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Name (English) *</label><input type="text" value={form.nameEn} onChange={e => setForm({ ...form, nameEn: e.target.value })} placeholder="Finance" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900/10 focus:border-slate-300 text-sm" /></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Spanish</label><input type="text" value={form.nameEs} onChange={e => setForm({ ...form, nameEs: e.target.value })} placeholder="Finanzas" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900/10 focus:border-slate-300 text-sm" /></div>
                <div><label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Portuguese</label><input type="text" value={form.namePt} onChange={e => setForm({ ...form, namePt: e.target.value })} placeholder="Finanças" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900/10 focus:border-slate-300 text-sm" /></div>
              </div>
              <div><label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Color</label><div className="flex flex-wrap gap-2">{COLORS.map(cl => (<button key={cl.value} type="button" onClick={() => setForm({ ...form, color: cl.value })} className={`w-9 h-9 rounded-xl ${cl.bg} transition-all ${form.color === cl.value ? `ring-2 ring-offset-2 ${cl.ring} scale-110` : "hover:scale-105"}`} title={cl.name} />))}</div></div>
              <div><label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Description</label><textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Calculate your finances..." rows={2} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900/10 focus:border-slate-300 text-sm resize-none" /></div>
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={form.showInMenu} onChange={e => setForm({ ...form, showInMenu: e.target.checked })} className="w-4 h-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900/20" /><span className="text-sm text-slate-700">Show in Menu</span></label>
                <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={form.showInHome} onChange={e => setForm({ ...form, showInHome: e.target.checked })} className="w-4 h-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900/20" /><span className="text-sm text-slate-700">Show on Homepage</span></label>
              </div>
            </div>
            <div className="p-6 border-t border-slate-100 flex justify-end gap-3">
              <button onClick={() => setShowModal(false)} className="px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 rounded-xl">Cancel</button>
              <button onClick={handleSave} disabled={saving || !form.slug || !form.nameEn} className="px-5 py-2.5 bg-slate-900 text-white text-sm font-medium rounded-xl hover:bg-slate-800 disabled:opacity-50 shadow-sm">{saving ? "Saving..." : editing ? "Update Category" : "Create Category"}</button>
            </div>
          </div>
        </div>
      )}

      {/* Subcategory Modal */}
      {showSubModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setShowSubModal(false)}>
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">{editingSub ? "Edit Subcategory" : "New Subcategory"}</h2>
              <button onClick={() => setShowSubModal(false)} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-5">
              <div><label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Slug *</label><input type="text" value={subForm.slug} onChange={e => setSubForm({ ...subForm, slug: e.target.value.toLowerCase().replace(/\s+/g, "-") })} placeholder="loans" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900/10 focus:border-slate-300 text-sm" disabled={!!editingSub} /></div>
              <div><label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Name (English) *</label><input type="text" value={subForm.nameEn} onChange={e => setSubForm({ ...subForm, nameEn: e.target.value })} placeholder="Loans & Mortgages" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900/10 focus:border-slate-300 text-sm" /></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Spanish</label><input type="text" value={subForm.nameEs} onChange={e => setSubForm({ ...subForm, nameEs: e.target.value })} placeholder="Préstamos" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900/10 focus:border-slate-300 text-sm" /></div>
                <div><label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Portuguese</label><input type="text" value={subForm.namePt} onChange={e => setSubForm({ ...subForm, namePt: e.target.value })} placeholder="Empréstimos" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900/10 focus:border-slate-300 text-sm" /></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">French</label><input type="text" value={subForm.nameFr} onChange={e => setSubForm({ ...subForm, nameFr: e.target.value })} placeholder="Prêts" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900/10 focus:border-slate-300 text-sm" /></div>
                <div><label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">German</label><input type="text" value={subForm.nameDe} onChange={e => setSubForm({ ...subForm, nameDe: e.target.value })} placeholder="Darlehen" className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900/10 focus:border-slate-300 text-sm" /></div>
              </div>
            </div>
            <div className="p-6 border-t border-slate-100 flex justify-end gap-3">
              <button onClick={() => setShowSubModal(false)} className="px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 rounded-xl">Cancel</button>
              <button onClick={handleSaveSub} disabled={savingSub || !subForm.slug || !subForm.nameEn} className="px-5 py-2.5 bg-slate-900 text-white text-sm font-medium rounded-xl hover:bg-slate-800 disabled:opacity-50 shadow-sm">{savingSub ? "Saving..." : editingSub ? "Update" : "Create Subcategory"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
