// src/app/[locale]/admin/calculators/page.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Eye, Pencil, Trash2, RefreshCw, Download } from "lucide-react";

interface Calculator {
  id: string;
  slug: string;
  name: string;
  category: string;
  isActive: boolean;
  subcategoryId: string | null;
  deletedAt: string | null;
}

interface Category {
  id: string;
  slug: string;
  nameEn: string;
  icon: string | null;
  color: string;
  sortOrder?: number;
}

interface Subcategory {
  id: string;
  slug: string;
  nameEn: string;
  categoryId: string;
  sortOrder: number;
  isActive: boolean;
}

export default function AdminCalculatorsPage() {
  const [calculators, setCalculators] = useState<Calculator[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [tab, setTab] = useState<"active" | "trash">("active");
  const [toggling, setToggling] = useState<string | null>(null);
  const [changingCategory, setChangingCategory] = useState<string | null>(null);
  const [changingSubcategory, setChangingSubcategory] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [calcRes, catRes, subRes] = await Promise.all([
        fetch("/api/admin/calculators?period=month"),
        fetch("/api/admin/calculator-categories"),
        fetch("/api/admin/calculator-subcategories"),
      ]);
      if (calcRes.ok) {
        const json = await calcRes.json();
        setCalculators(json.calculators || []);
      }
      if (catRes.ok) {
        const cats = await catRes.json();
        setCategories(cats);
      }
      if (subRes.ok) {
        const subs = await subRes.json();
        setSubcategories(subs);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Derived counts
  const nonTrashed = calculators.filter((c) => !c.deletedAt);
  const activeCalcs = nonTrashed.filter((c) => c.isActive);
  const inactiveCalcs = nonTrashed.filter((c) => !c.isActive);
  const trashedCalcs = calculators.filter((c) => c.deletedAt);
  const draftCalcs = nonTrashed.filter((c) => c.category === "drafts");

  const displayCalcs = tab === "trash" ? trashedCalcs : nonTrashed;

  const filteredCalculators = displayCalcs.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.slug.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = filterCategory === "all" || c.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleActive = async (slug: string) => {
    if (toggling) return;
    setToggling(slug);
    try {
      const res = await fetch(`/api/admin/calculators/${slug}/toggle`, { method: "POST" });
      if (res.ok) {
        const result = await res.json();
        setCalculators((prev) =>
          prev.map((c) => (c.slug === slug ? { ...c, isActive: result.isActive } : c))
        );
      }
    } catch (error) {
      console.error("Error toggling:", error);
    } finally {
      setToggling(null);
    }
  };

  const changeCategory = async (calcSlug: string, newCategory: string) => {
    setChangingCategory(calcSlug);
    try {
      const res = await fetch(`/api/admin/calculators/${calcSlug}/category`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category: newCategory }),
      });
      if (res.ok) {
        setCalculators((prev) =>
          prev.map((c) =>
            c.slug === calcSlug ? { ...c, category: newCategory, subcategoryId: null } : c
          )
        );
      }
    } catch (error) {
      console.error("Error changing category:", error);
    } finally {
      setChangingCategory(null);
    }
  };

  const changeSubcategory = async (calcSlug: string, subcategoryId: string) => {
    setChangingSubcategory(calcSlug);
    try {
      const res = await fetch(`/api/admin/calculators/${calcSlug}/subcategory`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subcategoryId: subcategoryId || null }),
      });
      if (res.ok) {
        setCalculators((prev) =>
          prev.map((c) =>
            c.slug === calcSlug ? { ...c, subcategoryId: subcategoryId || null } : c
          )
        );
      }
    } catch (error) {
      console.error("Error changing subcategory:", error);
    } finally {
      setChangingSubcategory(null);
    }
  };

  const getSubcategoriesForCategory = (categorySlug: string): Subcategory[] => {
    const cat = categories.find((c) => c.slug === categorySlug);
    if (!cat) return [];
    return subcategories
      .filter((s) => s.categoryId === cat.id && s.isActive)
      .sort((a, b) => a.sortOrder - b.sortOrder);
  };

  const getCategoryColor = (categorySlug: string): string => {
    const colorMap: Record<string, string> = {
      finance: "bg-blue-100 text-blue-700 border-blue-200",
      health: "bg-green-100 text-green-700 border-green-200",
      math: "bg-purple-100 text-purple-700 border-purple-200",
      everyday: "bg-amber-100 text-amber-700 border-amber-200",
      technology: "bg-cyan-100 text-cyan-700 border-cyan-200",
      conversion: "bg-orange-100 text-orange-700 border-orange-200",
      home: "bg-teal-100 text-teal-700 border-teal-200",
      drafts: "bg-slate-100 text-slate-600 border-slate-200",
    };
    return colorMap[categorySlug] || "bg-slate-100 text-slate-600 border-slate-200";
  };

  const getCategoryName = (slug: string): string => {
    const cat = categories.find((c) => c.slug === slug);
    return cat?.nameEn || slug.charAt(0).toUpperCase() + slug.slice(1);
  };

  const getSubcategoryName = (subId: string | null): string => {
    if (!subId) return "";
    const sub = subcategories.find((s) => s.id === subId);
    return sub?.nameEn || "";
  };

  const exportToCSV = () => {
    const headers = ["Name", "Slug", "Category", "Subcategory", "Status"];
    const rows = calculators.map((c) => [
      c.name, c.slug, getCategoryName(c.category), getSubcategoryName(c.subcategoryId), c.isActive ? "Active" : "Inactive",
    ]);
    const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `calculators-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  const activeCategories = categories
    .filter((c) => c.slug !== "drafts")
    .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));

  const ToggleSwitch = ({ calc }: { calc: Calculator }) => {
    const isLoading = toggling === calc.slug;
    return (
      <button
        onClick={() => toggleActive(calc.slug)}
        disabled={isLoading}
        className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
          isLoading ? "opacity-50 cursor-wait" : "cursor-pointer"
        } ${calc.isActive ? "bg-green-500" : "bg-slate-300"}`}
      >
        {isLoading ? (
          <span className="absolute inset-0 flex items-center justify-center">
            <RefreshCw className="w-3.5 h-3.5 text-white animate-spin" />
          </span>
        ) : (
          <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${
            calc.isActive ? "translate-x-6" : "translate-x-1"
          }`} />
        )}
      </button>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Calculators</h1>
          <p className="text-sm text-slate-500 mt-1">Manage calculator settings, categories and URLs</p>
        </div>
        <button
          onClick={fetchData}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {/* 5 Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
            <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-900">{calculators.length}</p>
            <p className="text-sm text-slate-500">Total</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
            <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-900">{activeCalcs.length}</p>
            <p className="text-sm text-slate-500">Active</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center">
            <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-900">{inactiveCalcs.length}</p>
            <p className="text-sm text-slate-500">Inactive</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center">
            <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-900">{draftCalcs.length}</p>
            <p className="text-sm text-slate-500">Drafts</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center">
            <Trash2 className="w-6 h-6 text-red-400" />
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-900">{trashedCalcs.length}</p>
            <p className="text-sm text-slate-500">Trash</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setTab("active")}
          className={`inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-lg transition-colors ${
            tab === "active" ? "bg-blue-600 text-white shadow-sm" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
          Calculators ({nonTrashed.length})
        </button>
        <button
          onClick={() => setTab("trash")}
          className={`inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-lg transition-colors ${
            tab === "trash" ? "bg-red-600 text-white shadow-sm" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          <Trash2 className="w-4 h-4" />
          Trash ({trashedCalcs.length})
        </button>
      </div>

      {/* Search + Category Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search calculators..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-4 py-2.5 border border-slate-200 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[180px]"
        >
          <option value="all">All Categories</option>
          {activeCategories.map((cat) => (
            <option key={cat.slug} value={cat.slug}>{cat.nameEn}</option>
          ))}
          <option value="drafts">Drafts</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/50">
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Calculator</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Subcategory</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredCalculators.map((calc) => {
                    const availableSubs = getSubcategoriesForCategory(calc.category);
                    return (
                      <tr key={calc.id} className={`hover:bg-slate-50/50 transition-colors ${!calc.isActive && tab !== "trash" ? "opacity-60" : ""}`}>
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium text-slate-900">{calc.name}</p>
                            <p className="text-xs text-slate-400 font-mono">{calc.slug}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {tab === "trash" ? (
                            <span className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full border ${getCategoryColor(calc.category)}`}>
                              {getCategoryName(calc.category)}
                            </span>
                          ) : (
                            <select
                              value={calc.category}
                              onChange={(e) => changeCategory(calc.slug, e.target.value)}
                              disabled={changingCategory === calc.slug}
                              className={`text-xs font-medium rounded-full px-3 py-1.5 border cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none ${getCategoryColor(calc.category)} ${changingCategory === calc.slug ? "opacity-50" : ""}`}
                              style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 8px center", paddingRight: "24px" }}
                            >
                              {activeCategories.map((cat) => (
                                <option key={cat.slug} value={cat.slug}>{cat.nameEn}</option>
                              ))}
                              <option value="drafts">Drafts</option>
                            </select>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          {tab === "trash" ? (
                            <span className="text-xs text-slate-400">{getSubcategoryName(calc.subcategoryId) || "—"}</span>
                          ) : availableSubs.length > 0 ? (
                            <select
                              value={calc.subcategoryId || ""}
                              onChange={(e) => changeSubcategory(calc.slug, e.target.value)}
                              disabled={changingSubcategory === calc.slug}
                              className={`text-xs text-slate-600 bg-white border border-slate-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 ${changingSubcategory === calc.slug ? "opacity-50" : ""}`}
                            >
                              <option value="">— None —</option>
                              {availableSubs.map((sub) => (
                                <option key={sub.id} value={sub.id}>{sub.nameEn}</option>
                              ))}
                            </select>
                          ) : (
                            <span className="text-xs text-slate-300">No subs</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          {tab === "trash" ? (
                            <span className="text-xs text-red-500 font-medium">Trashed</span>
                          ) : (
                            <ToggleSwitch calc={calc} />
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-1">
                            {tab === "trash" ? (
                              <button className="px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                                Restore
                              </button>
                            ) : (
                              <>
                                <Link href={`/en/admin/calculators/${calc.id}`} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit">
                                  <Pencil className="w-4 h-4" />
                                </Link>
                                <Link href={`/en/${calc.slug}`} target="_blank" className="p-2 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="View">
                                  <Eye className="w-4 h-4" />
                                </Link>
                                <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Move to Trash">
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {filteredCalculators.length === 0 && (
              <div className="text-center py-12">
                {tab === "trash" ? (
                  <><Trash2 className="w-12 h-12 text-slate-300 mx-auto mb-4" /><p className="text-slate-500">Trash is empty</p></>
                ) : (
                  <><svg className="w-12 h-12 text-slate-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg><p className="text-slate-500">No calculators found</p></>
                )}
              </div>
            )}

            <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
              <p className="text-sm text-slate-500">
                Showing <span className="font-medium text-slate-900">{filteredCalculators.length}</span> of{" "}
                <span className="font-medium text-slate-900">{calculators.length}</span> calculators
              </p>
              <button onClick={exportToCSV} className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700">
                <Download className="w-4 h-4" />
                Export CSV
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
