"use client";

import { useState, useEffect } from "react";
import {
  Settings, Globe, Search, Share2, Bot, Map, Shield, Save,
  CheckCircle, AlertCircle, Eye, EyeOff, RefreshCw, ExternalLink,
  FileText, Code, Link2, Hash, Image, Mail, Calendar, Languages
} from "lucide-react";

interface SiteSettings {
  site: { name: string; tagline: string; url: string; logo: string; favicon: string };
  seo: { titleTemplate: string; defaultTitle: string; defaultDescription: string; defaultOgImage: string; defaultLocale: string; canonicalBase: string };
  google: { searchConsoleId: string; analyticsId: string; adsenseId: string; tagManagerId: string };
  social: { twitter: string; facebook: string; linkedin: string; github: string; youtube: string };
  schema: { organizationName: string; organizationLogo: string; contactEmail: string; foundingDate: string; sameAs: string[] };
  robots: { allowAll: boolean; disallowPaths: string[]; customRules: string };
  sitemap: { autoGenerate: boolean; changeFrequency: string; priority: string; excludePaths: string[] };
  indexing: { noindexDrafts: boolean; noindexPagination: boolean; forceTrailingSlash: boolean; hreflangEnabled: boolean; activeLanguages: string[] };
}

type SectionKey = "site" | "seo" | "google" | "social" | "schema" | "robots" | "sitemap" | "indexing";

const SECTIONS: { key: SectionKey; label: string; icon: React.ReactNode; description: string }[] = [
  { key: "site", label: "Site Identity", icon: <Globe className="w-4 h-4" />, description: "Name, URL, logo" },
  { key: "seo", label: "Meta Defaults", icon: <Search className="w-4 h-4" />, description: "Titles, descriptions, OG" },
  { key: "google", label: "Google", icon: <Code className="w-4 h-4" />, description: "Analytics, AdSense, Search Console" },
  { key: "social", label: "Social Profiles", icon: <Share2 className="w-4 h-4" />, description: "Links for schema.org" },
  { key: "schema", label: "Schema.org", icon: <Bot className="w-4 h-4" />, description: "Organization structured data" },
  { key: "robots", label: "Robots.txt", icon: <Shield className="w-4 h-4" />, description: "Crawl rules" },
  { key: "sitemap", label: "Sitemap", icon: <Map className="w-4 h-4" />, description: "XML sitemap config" },
  { key: "indexing", label: "Indexing", icon: <Languages className="w-4 h-4" />, description: "Languages, hreflang, noindex" },
];

export default function SettingsPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [original, setOriginal] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionKey>("seo");
  const [previewTitle, setPreviewTitle] = useState("");

  useEffect(() => { fetchSettings(); }, []);

  useEffect(() => {
    if (settings) {
      const t = settings.seo.titleTemplate.replace("%s", "BMI Calculator");
      setPreviewTitle(t);
    }
  }, [settings?.seo.titleTemplate]);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/settings");
      if (res.ok) {
        const data = await res.json();
        setSettings(data);
        setOriginal(JSON.stringify(data));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const hasChanges = settings && JSON.stringify(settings) !== original;

  const saveSettings = async () => {
    if (!settings) return;
    setSaving(true);
    setSaved(false);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      if (res.ok) {
        const data = await res.json();
        setSettings(data.settings);
        setOriginal(JSON.stringify(data.settings));
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  const update = (section: SectionKey, key: string, value: unknown) => {
    if (!settings) return;
    setSettings({
      ...settings,
      [section]: { ...settings[section], [key]: value },
    });
  };

  const InputField = ({ section, field, label, icon, placeholder, helpText, type = "text" }: {
    section: SectionKey; field: string; label: string; icon?: React.ReactNode; placeholder?: string; helpText?: string; type?: string;
  }) => {
    const val = (settings?.[section] as Record<string, unknown>)?.[field] as string || "";
    const origVal = original ? (JSON.parse(original)?.[section] as Record<string, unknown>)?.[field] as string || "" : "";
    const changed = val !== origVal;
    return (
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-1.5">
          {icon}
          {label}
          {changed && <span className="w-2 h-2 bg-amber-400 rounded-full" title="Modified" />}
        </label>
        {type === "textarea" ? (
          <textarea
            value={val}
            onChange={e => update(section, field, e.target.value)}
            placeholder={placeholder}
            rows={3}
            className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
              changed ? "border-amber-300 bg-amber-50/30" : "border-slate-200"
            }`}
          />
        ) : (
          <input
            type={type}
            value={val}
            onChange={e => update(section, field, e.target.value)}
            placeholder={placeholder}
            className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              changed ? "border-amber-300 bg-amber-50/30" : "border-slate-200"
            }`}
          />
        )}
        {helpText && <p className="text-xs text-slate-400 mt-1">{helpText}</p>}
      </div>
    );
  };

  const Toggle = ({ section, field, label, helpText }: {
    section: SectionKey; field: string; label: string; helpText?: string;
  }) => {
    const val = (settings?.[section] as Record<string, unknown>)?.[field] as boolean;
    return (
      <div className="flex items-center justify-between py-2">
        <div>
          <p className="text-sm font-medium text-slate-700">{label}</p>
          {helpText && <p className="text-xs text-slate-400">{helpText}</p>}
        </div>
        <button
          onClick={() => update(section, field, !val)}
          className={`relative w-11 h-6 rounded-full transition-colors ${val ? "bg-blue-500" : "bg-slate-200"}`}
        >
          <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform shadow ${val ? "translate-x-5" : ""}`} />
        </button>
      </div>
    );
  };

  const ArrayField = ({ section, field, label, helpText }: {
    section: SectionKey; field: string; label: string; helpText?: string;
  }) => {
    const arr = ((settings?.[section] as Record<string, unknown>)?.[field] as string[]) || [];
    return (
      <div>
        <label className="text-sm font-medium text-slate-700">{label}</label>
        {helpText && <p className="text-xs text-slate-400 mb-2">{helpText}</p>}
        <div className="space-y-1.5 mt-1.5">
          {arr.map((item, i) => (
            <div key={i} className="flex gap-2">
              <input
                value={item}
                onChange={e => {
                  const newArr = [...arr];
                  newArr[i] = e.target.value;
                  update(section, field, newArr);
                }}
                className="flex-1 px-3 py-1.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={() => update(section, field, arr.filter((_, j) => j !== i))}
                className="px-2 py-1.5 text-red-500 hover:bg-red-50 rounded-lg text-sm"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            onClick={() => update(section, field, [...arr, ""])}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            + Add
          </button>
        </div>
      </div>
    );
  };

  const renderSection = () => {
    if (!settings) return null;

    switch (activeSection) {
      case "site":
        return (
          <div className="space-y-5">
            <InputField section="site" field="name" label="Site Name" icon={<Globe className="w-4 h-4 text-slate-400" />} placeholder="Kalcufy" />
            <InputField section="site" field="tagline" label="Tagline" icon={<FileText className="w-4 h-4 text-slate-400" />} placeholder="Free Online Calculators" />
            <InputField section="site" field="url" label="Site URL" icon={<Link2 className="w-4 h-4 text-slate-400" />} placeholder="https://kalcufy.com" helpText="Used for canonical URLs and OG tags" />
            <InputField section="site" field="logo" label="Logo Path" icon={<Image className="w-4 h-4 text-slate-400" />} placeholder="/logo.svg" />
            <InputField section="site" field="favicon" label="Favicon Path" icon={<Image className="w-4 h-4 text-slate-400" />} placeholder="/favicon.ico" />
          </div>
        );

      case "seo":
        return (
          <div className="space-y-5">
            <InputField section="seo" field="titleTemplate" label="Title Template" icon={<Hash className="w-4 h-4 text-slate-400" />}
              placeholder="%s | Kalcufy" helpText="Use %s as placeholder for calculator name" />

            {/* Live Preview */}
            <div className="bg-white border border-slate-200 rounded-xl p-4">
              <p className="text-xs font-semibold text-slate-500 mb-3 flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5" /> Google Search Preview
              </p>
              <div className="bg-slate-50 rounded-lg p-4 space-y-1">
                <p className="text-blue-700 text-lg font-normal truncate">{previewTitle}</p>
                <p className="text-green-700 text-sm">{settings.seo.canonicalBase}/en/bmi-calculator</p>
                <p className="text-slate-600 text-sm leading-relaxed line-clamp-2">{settings.seo.defaultDescription}</p>
              </div>
            </div>

            <InputField section="seo" field="defaultTitle" label="Default Title (homepage)" icon={<Search className="w-4 h-4 text-slate-400" />}
              placeholder="Kalcufy - Free Online Calculators" />
            <InputField section="seo" field="defaultDescription" label="Default Meta Description" type="textarea"
              icon={<FileText className="w-4 h-4 text-slate-400" />}
              helpText={`${settings.seo.defaultDescription.length}/160 characters recommended`} />
            <InputField section="seo" field="defaultOgImage" label="Default OG Image" icon={<Image className="w-4 h-4 text-slate-400" />}
              placeholder="/og-default.png" helpText="1200x630px recommended" />
            <InputField section="seo" field="canonicalBase" label="Canonical Base URL" icon={<Link2 className="w-4 h-4 text-slate-400" />}
              placeholder="https://kalcufy.com" helpText="Without trailing slash" />

            {/* OG Preview */}
            <div className="bg-white border border-slate-200 rounded-xl p-4">
              <p className="text-xs font-semibold text-slate-500 mb-3 flex items-center gap-1.5">
                <Share2 className="w-3.5 h-3.5" /> Social Share Preview
              </p>
              <div className="border border-slate-200 rounded-lg overflow-hidden max-w-md">
                <div className="bg-slate-100 h-40 flex items-center justify-center text-slate-400">
                  <Image className="w-8 h-8" />
                  <span className="ml-2 text-sm">{settings.seo.defaultOgImage || "No OG image set"}</span>
                </div>
                <div className="p-3 bg-white">
                  <p className="text-xs text-slate-400 uppercase">{settings.site.url?.replace("https://", "")}</p>
                  <p className="font-semibold text-slate-900 text-sm mt-0.5">{settings.seo.defaultTitle}</p>
                  <p className="text-slate-500 text-xs mt-0.5 line-clamp-2">{settings.seo.defaultDescription}</p>
                </div>
              </div>
            </div>
          </div>
        );

      case "google":
        return (
          <div className="space-y-5">
            <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-3 mb-2">
              <p className="text-blue-800 text-sm">Paste your IDs here. They'll be injected into the site <code className="bg-blue-100 px-1 rounded text-xs">{'<head>'}</code> automatically.</p>
            </div>
            <InputField section="google" field="searchConsoleId" label="Search Console Verification"
              icon={<Search className="w-4 h-4 text-slate-400" />}
              placeholder="google-site-verification=abc123..."
              helpText="Content value from the meta tag Google gives you" />
            <InputField section="google" field="analyticsId" label="Google Analytics 4 ID"
              icon={<Code className="w-4 h-4 text-slate-400" />}
              placeholder="G-XXXXXXXXXX" />
            <InputField section="google" field="adsenseId" label="AdSense Publisher ID"
              icon={<Code className="w-4 h-4 text-slate-400" />}
              placeholder="ca-pub-XXXXXXXXXX" />
            <InputField section="google" field="tagManagerId" label="Tag Manager ID"
              icon={<Code className="w-4 h-4 text-slate-400" />}
              placeholder="GTM-XXXXXXX" helpText="Optional - use if you prefer GTM over direct GA4" />
          </div>
        );

      case "social":
        return (
          <div className="space-y-5">
            <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-3 mb-2">
              <p className="text-blue-800 text-sm">These links appear in Schema.org Organization markup and your site footer.</p>
            </div>
            <InputField section="social" field="twitter" label="Twitter / X" placeholder="https://x.com/kalcufy" />
            <InputField section="social" field="facebook" label="Facebook" placeholder="https://facebook.com/kalcufy" />
            <InputField section="social" field="linkedin" label="LinkedIn" placeholder="https://linkedin.com/company/kalcufy" />
            <InputField section="social" field="github" label="GitHub" placeholder="https://github.com/kalcufy" />
            <InputField section="social" field="youtube" label="YouTube" placeholder="https://youtube.com/@kalcufy" />
          </div>
        );

      case "schema":
        return (
          <div className="space-y-5">
            <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-3 mb-2">
              <p className="text-blue-800 text-sm">Schema.org Organization data helps Google understand your site. Shows in Knowledge Panel.</p>
            </div>
            <InputField section="schema" field="organizationName" label="Organization Name" icon={<Globe className="w-4 h-4 text-slate-400" />} />
            <InputField section="schema" field="organizationLogo" label="Organization Logo URL" icon={<Image className="w-4 h-4 text-slate-400" />}
              placeholder="https://kalcufy.com/logo.svg" helpText="Full URL — min 112x112px" />
            <InputField section="schema" field="contactEmail" label="Contact Email" icon={<Mail className="w-4 h-4 text-slate-400" />}
              placeholder="hello@kalcufy.com" />
            <InputField section="schema" field="foundingDate" label="Founding Year" icon={<Calendar className="w-4 h-4 text-slate-400" />}
              placeholder="2024" />

            {/* Preview */}
            <div className="bg-slate-50 rounded-lg p-4 font-mono text-xs text-slate-600 overflow-x-auto">
              <pre>{JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Organization",
                name: settings.schema.organizationName,
                url: settings.site.url,
                logo: settings.schema.organizationLogo,
                email: settings.schema.contactEmail,
                foundingDate: settings.schema.foundingDate,
              }, null, 2)}</pre>
            </div>
          </div>
        );

      case "robots":
        return (
          <div className="space-y-5">
            <Toggle section="robots" field="allowAll" label="Allow all crawlers" helpText="When off, only specific paths are allowed" />
            <ArrayField section="robots" field="disallowPaths" label="Disallow Paths" helpText="Paths blocked from crawling" />
            <InputField section="robots" field="customRules" label="Custom Rules" type="textarea"
              placeholder="User-agent: GPTBot&#10;Disallow: /"
              helpText="Additional robots.txt rules (appended at the end)" />

            {/* Preview */}
            <div className="bg-white border border-slate-200 rounded-xl p-4">
              <p className="text-xs font-semibold text-slate-500 mb-2 flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5" /> robots.txt Preview
              </p>
              <pre className="bg-slate-50 rounded-lg p-4 text-xs text-slate-600 font-mono whitespace-pre-wrap">
{`User-agent: *
${settings.robots.allowAll ? "Allow: /" : "Disallow: /"}
${settings.robots.disallowPaths.map(p => `Disallow: ${p}`).join("\n")}

Sitemap: ${settings.site.url}/sitemap.xml${settings.robots.customRules ? "\n\n" + settings.robots.customRules : ""}`}
              </pre>
            </div>
          </div>
        );

      case "sitemap":
        return (
          <div className="space-y-5">
            <Toggle section="sitemap" field="autoGenerate" label="Auto-generate sitemap" helpText="Automatically creates sitemap.xml from active calculators" />
            <div>
              <label className="text-sm font-medium text-slate-700">Change Frequency</label>
              <select
                value={settings.sitemap.changeFrequency}
                onChange={e => update("sitemap", "changeFrequency", e.target.value)}
                className="w-full mt-1.5 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                {["always", "hourly", "daily", "weekly", "monthly", "yearly", "never"].map(f => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">Default Priority</label>
              <select
                value={settings.sitemap.priority}
                onChange={e => update("sitemap", "priority", e.target.value)}
                className="w-full mt-1.5 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                {["1.0", "0.9", "0.8", "0.7", "0.6", "0.5", "0.4", "0.3", "0.2", "0.1"].map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
            <ArrayField section="sitemap" field="excludePaths" label="Exclude Paths" helpText="Paths excluded from sitemap" />
          </div>
        );

      case "indexing":
        return (
          <div className="space-y-5">
            <Toggle section="indexing" field="hreflangEnabled" label="Enable hreflang tags"
              helpText="Adds alternate language links for multilingual SEO" />
            <Toggle section="indexing" field="noindexDrafts" label="Noindex draft calculators"
              helpText="Prevents incomplete calculators from being indexed" />
            <Toggle section="indexing" field="noindexPagination" label="Noindex pagination pages"
              helpText="Prevents /page/2, /page/3 etc from being indexed" />
            <Toggle section="indexing" field="forceTrailingSlash" label="Force trailing slash"
              helpText="Redirects /calculator to /calculator/" />

            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">Active Languages</label>
              <p className="text-xs text-slate-400 mb-3">Languages included in hreflang tags and sitemap</p>
              <div className="flex flex-wrap gap-2">
                {[
                  { code: "en", flag: "🇺🇸", label: "English" },
                  { code: "es", flag: "🇪🇸", label: "Spanish" },
                  { code: "pt", flag: "🇧🇷", label: "Portuguese" },
                  { code: "fr", flag: "🇫🇷", label: "French" },
                  { code: "de", flag: "🇩🇪", label: "German" },
                ].map(lang => {
                  const active = settings.indexing.activeLanguages.includes(lang.code);
                  return (
                    <button
                      key={lang.code}
                      onClick={() => {
                        const langs = active
                          ? settings.indexing.activeLanguages.filter(l => l !== lang.code)
                          : [...settings.indexing.activeLanguages, lang.code];
                        update("indexing", "activeLanguages", langs);
                      }}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        active
                          ? "bg-blue-100 text-blue-700 border-2 border-blue-300"
                          : "bg-slate-100 text-slate-500 border-2 border-transparent hover:bg-slate-200"
                      }`}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.label}</span>
                      {active ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        );
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 bg-slate-200 rounded animate-pulse" />
        <div className="h-96 bg-slate-200 rounded-xl animate-pulse" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Settings className="w-6 h-6 text-blue-500" />
            Settings
          </h1>
          <p className="text-slate-500 text-sm mt-1">SEO, Google integrations & site configuration</p>
        </div>
        <div className="flex items-center gap-3">
          {saved && (
            <span className="flex items-center gap-1.5 text-green-600 text-sm font-medium animate-in fade-in">
              <CheckCircle className="w-4 h-4" /> Saved!
            </span>
          )}
          <button
            onClick={saveSettings}
            disabled={!hasChanges || saving}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              hasChanges
                ? "bg-blue-600 text-white hover:bg-blue-700 shadow-sm"
                : "bg-slate-100 text-slate-400 cursor-not-allowed"
            }`}
          >
            <Save className="w-4 h-4" />
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      {/* Unsaved Warning */}
      {hasChanges && (
        <div className="flex items-center gap-2 px-4 py-2.5 bg-amber-50 border border-amber-200 rounded-lg">
          <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0" />
          <p className="text-amber-700 text-sm">You have unsaved changes</p>
        </div>
      )}

      {/* Layout */}
      <div className="flex gap-6">
        {/* Sidebar */}
        <div className="w-56 flex-shrink-0">
          <nav className="space-y-1 sticky top-6">
            {SECTIONS.map(section => (
              <button
                key={section.key}
                onClick={() => setActiveSection(section.key)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
                  activeSection === section.key
                    ? "bg-blue-50 text-blue-700"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <span className={activeSection === section.key ? "text-blue-500" : "text-slate-400"}>
                  {section.icon}
                </span>
                <div>
                  <p className="text-sm font-medium">{section.label}</p>
                  <p className="text-xs text-slate-400">{section.description}</p>
                </div>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
            {SECTIONS.find(s => s.key === activeSection)?.icon}
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                {SECTIONS.find(s => s.key === activeSection)?.label}
              </h2>
              <p className="text-sm text-slate-400">
                {SECTIONS.find(s => s.key === activeSection)?.description}
              </p>
            </div>
          </div>
          {renderSection()}
        </div>
      </div>
    </div>
  );
}

