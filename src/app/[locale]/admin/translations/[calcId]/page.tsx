"use client";

import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { useLocale } from "next-intl";
import Link from "next/link";
import { ArrowLeft, CheckCircle, XCircle, ChevronDown, ChevronRight, Globe, RefreshCw } from "lucide-react";

interface TranslationItem {
  key: string;
  section: string;
  en: string;
  target: string;
  status: "translated" | "missing";
}

interface TranslationDetail {
  id: string;
  name: string;
  category: string;
  targetLang: string;
  availableLanguages: string[];
  totalKeys: number;
  translatedKeys: number;
  missingKeys: number;
  percent: number;
  sections: Record<string, TranslationItem[]>;
}

const LANG_INFO: Record<string, { label: string; flag: string }> = {
  en: { label: "English", flag: "🇺🇸" },
  es: { label: "Spanish", flag: "🇪🇸" },
  pt: { label: "Portuguese", flag: "🇧🇷" },
  fr: { label: "French", flag: "🇫🇷" },
  de: { label: "German", flag: "🇩🇪" },
};

export default function TranslationDetailPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const locale = useLocale();
  const calcId = params.calcId as string;
  const initialLang = searchParams.get("lang") || "es";

  const [data, setData] = useState<TranslationDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedLang, setSelectedLang] = useState(initialLang);
  const [showFilter, setShowFilter] = useState<"all" | "missing" | "translated">("all");
  const [collapsedSections, setCollapsedSections] = useState<Set<string>>(new Set());

  useEffect(() => { fetchData(); }, [calcId, selectedLang]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/translations/${calcId}?lang=${selectedLang}`);
      if (res.ok) {
        setData(await res.json());
      } else {
        const err = await res.json();
        setError(err.error || "Failed to load");
      }
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  const toggleSection = (section: string) => {
    setCollapsedSections(prev => {
      const next = new Set(prev);
      if (next.has(section)) next.delete(section);
      else next.add(section);
      return next;
    });
  };

  const filteredSections = data?.sections
    ? Object.entries(data.sections).reduce((acc, [section, items]) => {
        const filtered = items.filter(item => {
          if (showFilter === "missing") return item.status === "missing";
          if (showFilter === "translated") return item.status === "translated";
          return true;
        });
        if (filtered.length > 0) acc[section] = filtered;
        return acc;
      }, {} as Record<string, TranslationItem[]>)
    : {};

  const totalFiltered = Object.values(filteredSections).reduce((sum, items) => sum + items.length, 0);
  const langInfo = LANG_INFO[selectedLang] || { label: selectedLang, flag: "🌐" };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-64 bg-slate-200 rounded animate-pulse" />
        <div className="h-24 bg-slate-200 rounded-xl animate-pulse" />
        <div className="h-96 bg-slate-200 rounded-xl animate-pulse" />
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="text-center py-12">
        <XCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
        <p className="text-slate-600 mb-2">{error}</p>
        <Link href={`/${locale}/admin/translations`} className="text-blue-600 hover:underline text-sm">← Back to Translations</Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href={`/${locale}/admin/translations`} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{data?.name}</h1>
            <p className="text-slate-500 text-sm font-mono">{data?.id}</p>
          </div>
        </div>
        <button onClick={fetchData} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
          <RefreshCw className="w-5 h-5 text-slate-600" />
        </button>
      </div>

      {/* Language Selector + Stats */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-1">
            {(data?.availableLanguages || []).filter(l => l !== "en").map(lang => {
              const info = LANG_INFO[lang] || { label: lang, flag: "🌐" };
              return (
                <button
                  key={lang}
                  onClick={() => setSelectedLang(lang)}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    selectedLang === lang ? "bg-white text-blue-600 shadow-sm" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {info.flag} {lang.toUpperCase()}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-4 ml-auto">
            <div className="text-right">
              <p className="text-sm text-slate-500">
                {langInfo.flag} {langInfo.label}: <span className="font-semibold text-slate-900">{data?.translatedKeys}/{data?.totalKeys}</span> keys
              </p>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${(data?.percent || 0) >= 90 ? "bg-green-500" : (data?.percent || 0) >= 50 ? "bg-amber-400" : "bg-red-400"}`}
                    style={{ width: `${data?.percent || 0}%` }}
                  />
                </div>
                <span className="text-sm font-semibold text-slate-700">{data?.percent}%</span>
              </div>
            </div>
            {data?.missingKeys ? (
              <span className="px-2.5 py-1 bg-red-50 text-red-600 rounded-full text-xs font-semibold">{data.missingKeys} missing</span>
            ) : (
              <span className="px-2.5 py-1 bg-green-50 text-green-600 rounded-full text-xs font-semibold">✓ Complete</span>
            )}
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-2">
        <Globe className="w-4 h-4 text-slate-400" />
        <span className="text-sm text-slate-500">Show:</span>
        {[
          { value: "all", label: `All (${data?.totalKeys || 0})` },
          { value: "missing", label: `Missing (${data?.missingKeys || 0})` },
          { value: "translated", label: `Translated (${data?.translatedKeys || 0})` },
        ].map(opt => (
          <button
            key={opt.value}
            onClick={() => setShowFilter(opt.value as typeof showFilter)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
              showFilter === opt.value ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {opt.label}
          </button>
        ))}
        <span className="text-xs text-slate-400 ml-2">({totalFiltered} shown)</span>
      </div>

      {/* Sections */}
      {Object.entries(filteredSections).map(([section, items]) => {
        const isCollapsed = collapsedSections.has(section);
        const missingInSection = items.filter(i => i.status === "missing").length;

        return (
          <div key={section} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <button
              onClick={() => toggleSection(section)}
              className="w-full flex items-center justify-between px-5 py-3 bg-slate-50 hover:bg-slate-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                {isCollapsed ? <ChevronRight className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                <h3 className="text-sm font-semibold text-slate-700">{section}</h3>
                <span className="text-xs text-slate-400">{items.length} keys</span>
              </div>
              {missingInSection > 0 && (
                <span className="px-2 py-0.5 bg-red-50 text-red-600 rounded-full text-xs font-medium">{missingInSection} missing</span>
              )}
            </button>

            {!isCollapsed && (
              <div className="divide-y divide-slate-100">
                <div className="grid grid-cols-[180px,1fr,1fr,50px] gap-2 px-5 py-2 bg-slate-50/50 text-xs font-semibold text-slate-500">
                  <span>Key</span>
                  <span>🇺🇸 English</span>
                  <span>{langInfo.flag} {langInfo.label}</span>
                  <span className="text-center">✓</span>
                </div>
                {items.map((item, idx) => (
                  <div
                    key={idx}
                    className={`grid grid-cols-[180px,1fr,1fr,50px] gap-2 px-5 py-2.5 text-sm ${item.status === "missing" ? "bg-red-50/30" : ""}`}
                  >
                    <span className="font-mono text-xs text-slate-400 truncate pt-0.5" title={item.key}>{item.key}</span>
                    <span className="text-slate-700 break-words text-xs leading-relaxed">
                      {item.en.length > 150 ? item.en.slice(0, 150) + "..." : item.en}
                    </span>
                    <span className={`break-words text-xs leading-relaxed ${item.target ? "text-slate-700" : "text-red-400 italic"}`}>
                      {item.target ? (item.target.length > 150 ? item.target.slice(0, 150) + "..." : item.target) : "— missing —"}
                    </span>
                    <div className="flex justify-center pt-0.5">
                      {item.status === "translated" ? <CheckCircle className="w-4 h-4 text-green-500" /> : <XCircle className="w-4 h-4 text-red-400" />}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}

      {Object.keys(filteredSections).length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
          <CheckCircle className="w-10 h-10 text-green-400 mx-auto mb-3" />
          <p className="text-slate-500">{showFilter === "missing" ? "No missing translations! 🎉" : "No translations match this filter."}</p>
        </div>
      )}

      <div className="bg-blue-50/50 rounded-xl border border-blue-100 p-4">
        <p className="text-blue-800 text-sm">
          <strong>Note:</strong> Translations are read directly from the <code className="bg-blue-100 px-1 py-0.5 rounded text-xs">t.{selectedLang}</code> block
          in <code className="bg-blue-100 px-1 py-0.5 rounded text-xs">src/calculators/{data?.id}/index.ts</code>.
          English (EN) is always the reference — all other languages are compared against it.
        </p>
      </div>
    </div>
  );
}

