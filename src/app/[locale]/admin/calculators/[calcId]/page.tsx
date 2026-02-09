"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, ExternalLink, AlertCircle, Check, RefreshCw, Globe, Eye, Type, Link2 } from "lucide-react";

interface CalculatorData {
  id: string;
  slug: string;
  name: string;
  category: string;
  isActive: boolean;
  translationKey: string | null;
  slugs: { en: string; es: string; pt: string; fr: string; de: string };
  names: { en: string; es: string; pt: string; fr: string; de: string };
}

const LANGUAGES = [
  { code: "en", label: "English", flag: "🇺🇸", color: "bg-blue-100 text-blue-700" },
  { code: "es", label: "Spanish", flag: "🇪🇸", color: "bg-green-100 text-green-700" },
  { code: "pt", label: "Portuguese", flag: "🇧🇷", color: "bg-amber-100 text-amber-700" },
  { code: "fr", label: "French", flag: "🇫🇷", color: "bg-purple-100 text-purple-700" },
  { code: "de", label: "German", flag: "🇩🇪", color: "bg-red-100 text-red-700" },
];

export default function CalculatorEditor() {
  const params = useParams();
  const router = useRouter();
  const calcId = params.calcId as string;

  const [data, setData] = useState<CalculatorData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [changes, setChanges] = useState<string[]>([]);

  const [slugs, setSlugs] = useState({ en: "", es: "", pt: "", fr: "", de: "" });
  const [names, setNames] = useState({ en: "", es: "", pt: "", fr: "", de: "" });
  const [isActive, setIsActive] = useState(true);

  // Track if anything changed
  const [originalSlugs, setOriginalSlugs] = useState({ en: "", es: "", pt: "", fr: "", de: "" });
  const [originalNames, setOriginalNames] = useState({ en: "", es: "", pt: "", fr: "", de: "" });
  const [originalActive, setOriginalActive] = useState(true);

  const hasChanges =
    JSON.stringify(slugs) !== JSON.stringify(originalSlugs) ||
    JSON.stringify(names) !== JSON.stringify(originalNames) ||
    isActive !== originalActive;

  useEffect(() => { fetchData(); }, [calcId]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/calculators/${calcId}`);
      if (res.ok) {
        const json = await res.json();
        setData(json);
        setSlugs(json.slugs);
        setNames(json.names);
        setIsActive(json.isActive);
        setOriginalSlugs({ ...json.slugs });
        setOriginalNames({ ...json.names });
        setOriginalActive(json.isActive);
      } else {
        setError("Calculator not found");
      }
    } catch {
      setError("Error loading calculator");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    setChanges([]);
    try {
      const res = await fetch(`/api/admin/calculators/${calcId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slugs, names, isActive }),
      });

      if (res.ok) {
        const result = await res.json();
        setSaved(true);
        setChanges(result.changes || []);
        setTimeout(() => setSaved(false), 3000);
        fetchData();
      } else {
        const err = await res.json();
        setError(err.error || "Failed to save");
      }
    } catch {
      setError("Error saving calculator");
    } finally {
      setSaving(false);
    }
  };

  const validateSlug = (slug: string): boolean => {
    return /^[a-z0-9-]+$/.test(slug) && slug.length >= 3;
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-64 bg-slate-200 rounded animate-pulse" />
        <div className="h-64 bg-slate-200 rounded-xl animate-pulse" />
        <div className="h-64 bg-slate-200 rounded-xl animate-pulse" />
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
        <p className="text-slate-600 mb-2">{error}</p>
        <Link href="/admin/calculators" className="text-blue-600 hover:underline">← Back to list</Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/calculators" className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{data?.name}</h1>
            <p className="text-slate-500 text-sm font-mono">{data?.id}</p>
          </div>
        </div>
        <button
          onClick={handleSave}
          disabled={saving || !hasChanges}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all ${
            saved
              ? "bg-green-500 text-white"
              : hasChanges
              ? "bg-blue-600 text-white hover:bg-blue-700 shadow-sm"
              : "bg-slate-100 text-slate-400 cursor-not-allowed"
          }`}
        >
          {saving ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : saved ? (
            <Check className="w-4 h-4" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          {saving ? "Saving..." : saved ? "Saved!" : "Save Changes"}
        </button>
      </div>

      {/* Success banner */}
      {saved && changes.length > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-green-800 font-medium">✅ Updated: {changes.join(", ")}</p>
          <p className="text-green-600 text-sm mt-1">Restart dev server to see slug changes on the site.</p>
        </div>
      )}

      {/* Error Alert */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {/* Status Toggle */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Status</h2>
            <p className="text-slate-500 text-sm">
              {isActive ? "Calculator is visible on the site" : "Calculator is hidden from the site"}
            </p>
          </div>
          <button
            onClick={() => setIsActive(!isActive)}
            className={`relative w-14 h-8 rounded-full transition-colors ${isActive ? "bg-green-500" : "bg-slate-300"}`}
          >
            <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-sm transition-transform ${isActive ? "left-7" : "left-1"}`} />
          </button>
        </div>
      </div>

      {/* Names by Language */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-1 flex items-center gap-2">
          <Type className="w-5 h-5 text-blue-500" />
          Calculator Name
        </h2>
        <p className="text-slate-500 text-sm mb-5">The visible name shown to users in each language</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {LANGUAGES.map((lang) => {
            const value = names[lang.code as keyof typeof names];
            const changed = value !== originalNames[lang.code as keyof typeof originalNames];
            return (
              <div key={lang.code}>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-1.5">
                  <span>{lang.flag}</span>
                  <span>{lang.label}</span>
                  {changed && <span className="text-xs text-amber-500 font-normal">(modified)</span>}
                </label>
                <input
                  type="text"
                  value={value}
                  onChange={(e) => setNames({ ...names, [lang.code]: e.target.value })}
                  className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                    changed ? "border-amber-300 bg-amber-50/30" : "border-slate-200"
                  }`}
                  placeholder={`Name in ${lang.label}`}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Slugs / URLs by Language */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-1 flex items-center gap-2">
          <Link2 className="w-5 h-5 text-green-500" />
          URL Slugs
        </h2>
        <p className="text-slate-500 text-sm mb-5">
          The URL path for each language. Only lowercase letters, numbers, and hyphens.
        </p>

        <div className="space-y-4">
          {LANGUAGES.map((lang) => {
            const value = slugs[lang.code as keyof typeof slugs];
            const changed = value !== originalSlugs[lang.code as keyof typeof originalSlugs];
            const valid = validateSlug(value);

            return (
              <div key={lang.code} className="grid grid-cols-1 md:grid-cols-[1fr,1fr] gap-4 items-start">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-1.5">
                    <span>{lang.flag}</span>
                    <span>{lang.label} Slug</span>
                    {changed && <span className="text-xs text-amber-500 font-normal">(modified)</span>}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={value}
                      onChange={(e) =>
                        setSlugs({
                          ...slugs,
                          [lang.code]: e.target.value
                            .toLowerCase()
                            .replace(/[^a-z0-9-]/g, ""),
                        })
                      }
                      className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8 font-mono text-sm transition-colors ${
                        changed
                          ? valid
                            ? "border-amber-300 bg-amber-50/30"
                            : "border-red-300 bg-red-50/30"
                          : valid
                          ? "border-slate-200"
                          : "border-red-300"
                      }`}
                    />
                    <span
                      className={`absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium ${
                        valid ? "text-green-600" : "text-red-500"
                      }`}
                    >
                      {valid ? "✓" : "!"}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Preview</label>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 px-4 py-2.5 bg-slate-50 rounded-lg text-sm text-slate-500 font-mono truncate border border-slate-100">
                      kalcufy.com/<span className="text-slate-700">{lang.code}</span>/<span className="text-blue-600">{value || "..."}</span>
                    </div>
                    {value && (
                      <Link
                        href={`/${lang.code}/${value}`}
                        target="_blank"
                        className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Open in new tab"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Info Card */}
      <div className="bg-blue-50/50 rounded-xl border border-blue-100 p-5">
        <p className="text-blue-800 text-sm">
          <strong>Note:</strong> Saving updates the registry, V4 config file, and messages/*.json. 
          After changing slugs, restart the dev server (<code className="bg-blue-100 px-1.5 py-0.5 rounded text-xs">rm -rf .next && npm run dev</code>) to see changes on the site.
        </p>
      </div>
    </div>
  );
}
