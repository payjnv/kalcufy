"use client";

import { useState, useEffect } from "react";
import { useLocale } from "next-intl";
import Link from "next/link";
import { Languages, CheckCircle, AlertCircle, XCircle, Search, RefreshCw, FileText } from "lucide-react";

interface CalcLocale {
  count: number;
  total: number;
  percent: number;
  status: "complete" | "partial" | "missing";
}

interface CalcItem {
  id: string;
  name: string;
  category: string;
  hasFile: boolean;
  locales: Record<string, CalcLocale>;
}

interface TranslationStats {
  totalCalculators: number;
  fullyTranslated: number;
  partiallyTranslated: number;
  missingTranslations: number;
  overallProgress: Record<string, number>;
  calculators: CalcItem[];
}

const LANGS = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "es", label: "Spanish", flag: "🇪🇸" },
  { code: "pt", label: "Portuguese", flag: "🇧🇷" },
  { code: "fr", label: "French", flag: "🇫🇷" },
  { code: "de", label: "German", flag: "🇩🇪" },
];

const statusIcon = (status: string) => {
  switch (status) {
    case "complete": return <CheckCircle className="w-5 h-5 text-green-500" />;
    case "partial": return <AlertCircle className="w-5 h-5 text-amber-500" />;
    case "missing": return <XCircle className="w-5 h-5 text-red-400" />;
    default: return <div className="w-5 h-5 rounded-full border-2 border-slate-300" />;
  }
};

const categoryColors: Record<string, string> = {
  health: "bg-red-100 text-red-700",
  finance: "bg-blue-100 text-blue-700",
  math: "bg-purple-100 text-purple-700",
  everyday: "bg-green-100 text-green-700",
};

export default function TranslationsDashboard() {
  const locale = useLocale();
  const [stats, setStats] = useState<TranslationStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "complete" | "incomplete" | "missing">("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  useEffect(() => { fetchStats(); }, []);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/translations");
      if (res.ok) setStats(await res.json());
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCalculators = stats?.calculators.filter(calc => {
    if (search && !calc.name.toLowerCase().includes(search.toLowerCase()) && !calc.id.includes(search.toLowerCase())) return false;
    if (categoryFilter !== "all" && calc.category !== categoryFilter) return false;
    if (statusFilter === "complete" && !LANGS.every(l => calc.locales[l.code]?.status === "complete")) return false;
    if (statusFilter === "incomplete" && LANGS.every(l => calc.locales[l.code]?.status === "complete")) return false;
    if (statusFilter === "missing" && !LANGS.some(l => calc.locales[l.code]?.status === "missing")) return false;
    return true;
  }) || [];

  const categories = [...new Set(stats?.calculators.map(c => c.category) || [])];

  if (loading) {
    return (
      <div className="space-y-4 sm:space-y-6">
        <div className="h-8 w-64 bg-slate-200 rounded animate-pulse" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[1,2,3,4].map(i => <div key={i} className="h-24 bg-slate-200 rounded-xl animate-pulse" />)}
        </div>
        <div className="h-96 bg-slate-200 rounded-xl animate-pulse" />
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-lg sm:text-lg sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Languages className="w-6 h-6 text-blue-500" />
            Translations
          </h1>
          <p className="text-slate-500 text-sm mt-1">V4 calculator translation status across all languages</p>
        </div>
        <button onClick={fetchStats} className="p-2 hover:bg-slate-100 rounded-lg transition-colors" title="Refresh">
          <RefreshCw className="w-5 h-5 text-slate-600" />
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg"><FileText className="w-5 h-5 text-blue-500" /></div>
            <div>
              <p className="text-lg sm:text-lg sm:text-xl sm:text-2xl font-bold text-slate-900">{stats?.totalCalculators}</p>
              <p className="text-sm text-slate-500">Total</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-50 rounded-lg"><CheckCircle className="w-5 h-5 text-green-500" /></div>
            <div>
              <p className="text-lg sm:text-lg sm:text-xl sm:text-2xl font-bold text-green-600">{stats?.fullyTranslated}</p>
              <p className="text-sm text-slate-500">Complete</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-50 rounded-lg"><AlertCircle className="w-5 h-5 text-amber-500" /></div>
            <div>
              <p className="text-lg sm:text-lg sm:text-xl sm:text-2xl font-bold text-amber-600">{stats?.partiallyTranslated}</p>
              <p className="text-sm text-slate-500">Partial</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-50 rounded-lg"><XCircle className="w-5 h-5 text-red-400" /></div>
            <div>
              <p className="text-lg sm:text-lg sm:text-xl sm:text-2xl font-bold text-red-500">{stats?.missingTranslations}</p>
              <p className="text-sm text-slate-500">Missing</p>
            </div>
          </div>
        </div>
      </div>

      {/* Overall Progress */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Overall Progress by Language</h2>
        <div className="space-y-3">
          {LANGS.map(lang => {
            const pct = stats?.overallProgress[lang.code] || 0;
            return (
              <div key={lang.code} className="flex items-center gap-4">
                <span className="w-28 text-sm font-medium text-slate-700">{lang.flag} {lang.label}</span>
                <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${pct >= 90 ? "bg-green-500" : pct >= 50 ? "bg-amber-400" : pct > 0 ? "bg-red-400" : "bg-slate-200"}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className={`text-sm font-semibold w-12 text-right ${pct >= 90 ? "text-green-600" : pct >= 50 ? "text-amber-600" : "text-red-500"}`}>
                  {pct}%
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search calculators..."
            className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value as typeof statusFilter)}
          className="px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Status</option>
          <option value="complete">✅ Complete</option>
          <option value="incomplete">⚠️ Incomplete</option>
          <option value="missing">❌ Missing</option>
        </select>
        <select
          value={categoryFilter}
          onChange={e => setCategoryFilter(e.target.value)}
          className="px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Categories</option>
          {categories.map(c => (
            <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-left px-4 py-3 text-sm font-semibold text-slate-700">Calculator</th>
                {LANGS.map(lang => (
                  <th key={lang.code} className="text-center px-3 py-3 text-sm font-semibold text-slate-700">
                    {lang.flag} {lang.code.toUpperCase()}
                  </th>
                ))}
                <th className="text-center px-4 py-3 text-sm font-semibold text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCalculators.map(calc => (
                <tr key={calc.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium text-slate-900 text-sm">{calc.name}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-slate-400 font-mono">{calc.id}</span>
                        <span className={`text-xs px-1.5 py-0.5 rounded ${categoryColors[calc.category] || "bg-slate-100 text-slate-600"}`}>
                          {calc.category}
                        </span>
                      </div>
                    </div>
                  </td>
                  {LANGS.map(lang => {
                    const loc = calc.locales[lang.code];
                    return (
                      <td key={lang.code} className="text-center px-3 py-3">
                        <div className="flex flex-col items-center gap-0.5">
                          {statusIcon(loc?.status || "missing")}
                          <span className="text-xs text-slate-400">
                            {loc?.count || 0}/{loc?.total || 0}
                          </span>
                        </div>
                      </td>
                    );
                  })}
                  <td className="text-center px-4 py-3">
                    <div className="flex justify-center gap-1">
                      {LANGS.filter(l => l.code !== "en").map(lang => (
                        <Link
                          key={lang.code}
                          href={`/${locale}/admin/translations/${calc.id}?lang=${lang.code}`}
                          className="px-2 py-1 text-xs font-medium text-blue-600 hover:bg-blue-50 rounded transition-colors"
                          title={`View ${lang.label} translations`}
                        >
                          {lang.code.toUpperCase()}
                        </Link>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredCalculators.length === 0 && (
          <div className="text-center py-12">
            <Languages className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 text-sm">No calculators match your filters</p>
          </div>
        )}

        <div className="px-4 py-3 bg-slate-50 border-t border-slate-200">
          <p className="text-xs text-slate-500">
            Showing {filteredCalculators.length} of {stats?.totalCalculators || 0} calculators
          </p>
        </div>
      </div>
    </div>
  );
}

