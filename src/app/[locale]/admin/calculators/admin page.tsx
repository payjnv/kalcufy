"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Calculator {
  id: string;
  slug: string;
  name: string;
  category: string;
  isActive: boolean;
  views: number;
  prevViews: number;
  viewsChange: number;
  allTimeViews: number;
  calculations: number;
  prevCalculations: number;
  calcsChange: number;
  conversionRate: number;
  lastUpdated: string;
}

interface LanguageStat {
  language: string;
  views: number;
  percentage: number;
}

interface StatsData {
  calculators: Calculator[];
  totals: {
    totalCalculators: number;
    activeCalculators: number;
    totalViews: number;
    prevTotalViews: number;
    totalViewsChange: number;
    totalCalculations: number;
    prevTotalCalculations: number;
    totalCalcsChange: number;
    overallConversionRate: number;
    financeCount: number;
    healthCount: number;
  };
  languageBreakdown: LanguageStat[];
  topPerformers: Calculator[];
  bottomPerformers: Calculator[];
  topByConversion: Calculator[];
  period: string;
}

export default function AdminCalculatorsPage() {
  const [data, setData] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");
  const [search, setSearch] = useState<string>("");
  const [period, setPeriod] = useState<string>("month");
  const [selectedCalc, setSelectedCalc] = useState<Calculator | null>(null);

  useEffect(() => {
    fetchData();
  }, [period]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/calculators?period=${period}`);
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCalculators = data?.calculators.filter((calc) => {
    const matchesFilter = filter === "all" || calc.category.toLowerCase() === filter;
    const matchesSearch = calc.name.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  }) || [];

  const toggleActive = (id: string) => {
    if (!data) return;
    setData({
      ...data,
      calculators: data.calculators.map((calc) =>
        calc.id === id ? { ...calc, isActive: !calc.isActive } : calc
      ),
    });
  };

  const getPeriodLabel = (p: string) => {
    switch (p) {
      case "today": return "Today";
      case "week": return "This Week";
      case "month": return "This Month";
      case "year": return "This Year";
      default: return "This Month";
    }
  };

  const getPrevPeriodLabel = (p: string) => {
    switch (p) {
      case "today": return "vs Yesterday";
      case "week": return "vs Last Week";
      case "month": return "vs Last Month";
      case "year": return "vs Last Year";
      default: return "vs Last Month";
    }
  };

  const getLanguageFlag = (lang: string) => {
    switch (lang?.toLowerCase()) {
      case "en": return "🇺🇸";
      case "es": return "🇪🇸";
      case "pt": return "🇧🇷";
      default: return "🌐";
    }
  };

  const getLanguageName = (lang: string) => {
    switch (lang?.toLowerCase()) {
      case "en": return "English";
      case "es": return "Spanish";
      case "pt": return "Portuguese";
      default: return lang || "Unknown";
    }
  };

  // Export to CSV
  const exportToCSV = () => {
    if (!data) return;
    
    const headers = ["Name", "Slug", "Category", "Views", "Calculations", "Conversion Rate", "Views Change", "Status"];
    const rows = data.calculators.map(calc => [
      calc.name,
      calc.slug,
      calc.category,
      calc.views,
      calc.calculations,
      `${calc.conversionRate}%`,
      `${calc.viewsChange >= 0 ? '+' : ''}${calc.viewsChange}%`,
      calc.isActive ? "Active" : "Inactive"
    ]);
    
    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.join(","))
    ].join("\n");
    
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `calculators-stats-${period}-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const ChangeIndicator = ({ value, size = "sm" }: { value: number; size?: "sm" | "md" }) => {
    if (value === 0) return <span className="text-gray-400 text-xs">—</span>;
    const isPositive = value > 0;
    const textSize = size === "md" ? "text-sm" : "text-xs";
    return (
      <span className={`inline-flex items-center gap-0.5 ${textSize} ${isPositive ? "text-green-600" : "text-red-500"}`}>
        {isPositive ? "↑" : "↓"} {Math.abs(value)}%
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Calculators</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your calculators and track performance</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Export Button */}
          <button
            onClick={exportToCSV}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export CSV
          </button>
          {/* Period Selector */}
          <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
            {["today", "week", "month", "year"].map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                  period === p ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {p === "today" ? "Today" : p === "week" ? "Week" : p === "month" ? "Month" : "Year"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Grid - Row 1: Main Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white rounded-xl p-5 border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-semibold text-gray-900">{loading ? "—" : data?.totals.totalCalculators}</p>
              <p className="text-sm text-gray-500">Calculators</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
              <svg className="w-5 h-5 text-purple-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="text-2xl font-semibold text-gray-900">{loading ? "—" : data?.totals.totalViews.toLocaleString()}</p>
                {!loading && data && <ChangeIndicator value={data.totals.totalViewsChange} size="md" />}
              </div>
              <p className="text-sm text-gray-500">Views</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
              <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="text-2xl font-semibold text-gray-900">{loading ? "—" : data?.totals.totalCalculations.toLocaleString()}</p>
                {!loading && data && <ChangeIndicator value={data.totals.totalCalcsChange} size="md" />}
              </div>
              <p className="text-sm text-gray-500">Calculations</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-semibold text-green-600">{loading ? "—" : `${data?.totals.overallConversionRate}%`}</p>
              <p className="text-sm text-gray-500">Conversion Rate</p>
            </div>
          </div>
        </div>

        {/* Language Stats Mini */}
        <div className="bg-white rounded-xl p-5 border border-gray-200 hover:shadow-md transition-shadow">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">By Language</p>
          {loading ? (
            <p className="text-gray-400">—</p>
          ) : data?.languageBreakdown && data.languageBreakdown.length > 0 ? (
            <div className="space-y-2">
              {data.languageBreakdown.slice(0, 3).map((lang) => (
                <div key={lang.language} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span>{getLanguageFlag(lang.language)}</span>
                    <span className="text-sm text-gray-600">{getLanguageName(lang.language)}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{lang.percentage}%</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400">No data</p>
          )}
        </div>
      </div>

      {/* Top/Bottom Performers */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Top Performers */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg">🏆</span>
            <h3 className="font-semibold text-gray-900">Top Performers</h3>
          </div>
          {loading ? (
            <div className="space-y-3">
              {[1,2,3].map(i => <div key={i} className="h-8 bg-gray-100 rounded animate-pulse"></div>)}
            </div>
          ) : (
            <div className="space-y-3">
              {data?.topPerformers.map((calc, i) => (
                <div key={calc.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                      i === 0 ? "bg-yellow-100 text-yellow-700" :
                      i === 1 ? "bg-gray-100 text-gray-600" :
                      i === 2 ? "bg-orange-100 text-orange-700" :
                      "bg-gray-50 text-gray-500"
                    }`}>
                      {i + 1}
                    </span>
                    <span className="text-sm text-gray-700 truncate max-w-[140px]">{calc.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-900">{calc.views}</span>
                    <ChangeIndicator value={calc.viewsChange} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Best Conversion */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg">⚡</span>
            <h3 className="font-semibold text-gray-900">Best Conversion</h3>
          </div>
          {loading ? (
            <div className="space-y-3">
              {[1,2,3].map(i => <div key={i} className="h-8 bg-gray-100 rounded animate-pulse"></div>)}
            </div>
          ) : data?.topByConversion && data.topByConversion.length > 0 ? (
            <div className="space-y-3">
              {data.topByConversion.map((calc, i) => (
                <div key={calc.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                      i === 0 ? "bg-green-100 text-green-700" : "bg-gray-50 text-gray-500"
                    }`}>
                      {i + 1}
                    </span>
                    <span className="text-sm text-gray-700 truncate max-w-[140px]">{calc.name}</span>
                  </div>
                  <span className="text-sm font-medium text-green-600">{calc.conversionRate}%</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400">Need more data</p>
          )}
        </div>

        {/* Needs Attention */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg">📉</span>
            <h3 className="font-semibold text-gray-900">Needs Attention</h3>
          </div>
          {loading ? (
            <div className="space-y-3">
              {[1,2,3].map(i => <div key={i} className="h-8 bg-gray-100 rounded animate-pulse"></div>)}
            </div>
          ) : (
            <div className="space-y-3">
              {data?.bottomPerformers.map((calc, i) => (
                <div key={calc.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold bg-red-50 text-red-500">
                      {data.calculators.length - i}
                    </span>
                    <span className="text-sm text-gray-700 truncate max-w-[140px]">{calc.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-500">{calc.views}</span>
                    <ChangeIndicator value={calc.viewsChange} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search calculators..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2aa6ff]/50 focus:border-[#2aa6ff]"
            />
          </div>
          <div className="flex items-center gap-2">
            {[
              { key: "all", label: "All", count: data?.totals.totalCalculators || 0 },
              { key: "finance", label: "Finance", count: data?.totals.financeCount || 0 },
              { key: "health", label: "Health", count: data?.totals.healthCount || 0 },
            ].map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  filter === f.key
                    ? "bg-[#2aa6ff] text-white shadow-sm"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {f.label}
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                  filter === f.key ? "bg-white/20" : "bg-gray-200"
                }`}>
                  {f.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-2 border-[#2aa6ff] border-t-transparent rounded-full animate-spin"></div>
              <p className="text-sm text-gray-500">Loading calculators...</p>
            </div>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Calculator</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Views
                      <span className="ml-1 font-normal normal-case text-gray-400">({getPeriodLabel(period)})</span>
                    </th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Calculations</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Conv. Rate</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="text-right px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredCalculators.map((calc, index) => (
                    <tr key={calc.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-xs font-medium text-gray-500">
                            {index + 1}
                          </div>
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            calc.category === "Finance" 
                              ? "bg-gradient-to-br from-blue-500 to-blue-600" 
                              : "bg-gradient-to-br from-rose-500 to-rose-600"
                          }`}>
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{calc.name}</p>
                            <p className="text-sm text-gray-500">{calc.slug}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                          calc.category === "Finance"
                            ? "bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-600/20"
                            : "bg-rose-50 text-rose-700 ring-1 ring-inset ring-rose-600/20"
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            calc.category === "Finance" ? "bg-blue-500" : "bg-rose-500"
                          }`}></span>
                          {calc.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-900 font-medium">{calc.views.toLocaleString()}</span>
                          <ChangeIndicator value={calc.viewsChange} />
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-900 font-medium">{calc.calculations.toLocaleString()}</span>
                          <ChangeIndicator value={calc.calcsChange} />
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${
                                calc.conversionRate >= 50 ? "bg-green-500" :
                                calc.conversionRate >= 25 ? "bg-yellow-500" :
                                "bg-red-400"
                              }`}
                              style={{ width: `${Math.min(calc.conversionRate, 100)}%` }}
                            ></div>
                          </div>
                          <span className={`text-sm font-medium ${
                            calc.conversionRate >= 50 ? "text-green-600" :
                            calc.conversionRate >= 25 ? "text-yellow-600" :
                            "text-red-500"
                          }`}>
                            {calc.conversionRate}%
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => toggleActive(calc.id)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            calc.isActive ? "bg-green-500" : "bg-gray-200"
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform ${
                              calc.isActive ? "translate-x-6" : "translate-x-1"
                            }`}
                          />
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-1">
                          <Link
                            href={`/en/${calc.slug}`}
                            target="_blank"
                            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                            title="View"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </Link>
                          <button
                            onClick={() => setSelectedCalc(calc)}
                            className="p-2 text-gray-400 hover:text-[#2aa6ff] hover:bg-blue-50 rounded-lg transition-colors"
                            title="Details"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Empty State */}
            {filteredCalculators.length === 0 && (
              <div className="text-center py-12">
                <svg className="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <p className="text-gray-500">No calculators found</p>
              </div>
            )}

            {/* Table Footer */}
            <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/50">
              <p className="text-sm text-gray-500">
                Showing <span className="font-medium text-gray-900">{filteredCalculators.length}</span> of{" "}
                <span className="font-medium text-gray-900">{data?.totals.totalCalculators || 0}</span> calculators
                <span className="mx-2 text-gray-300">•</span>
                <span className="text-gray-400">{getPrevPeriodLabel(period)}</span>
              </p>
              <button
                onClick={fetchData}
                className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh
              </button>
            </div>
          </>
        )}
      </div>

      {/* Details Modal */}
      {selectedCalc && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Calculator Details</h2>
                <button
                  onClick={() => setSelectedCalc(null)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  selectedCalc.category === "Finance" 
                    ? "bg-gradient-to-br from-blue-500 to-blue-600" 
                    : "bg-gradient-to-br from-rose-500 to-rose-600"
                }`}>
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{selectedCalc.name}</p>
                  <p className="text-sm text-gray-500">{selectedCalc.slug}</p>
                </div>
              </div>
              
              {/* Stats Grid in Modal */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-purple-50 rounded-xl">
                  <p className="text-sm text-purple-700 mb-1">Views ({getPeriodLabel(period)})</p>
                  <div className="flex items-center gap-2">
                    <p className="text-2xl font-bold text-purple-700">{selectedCalc.views.toLocaleString()}</p>
                    <ChangeIndicator value={selectedCalc.viewsChange} size="md" />
                  </div>
                </div>
                <div className="p-4 bg-amber-50 rounded-xl">
                  <p className="text-sm text-amber-600 mb-1">Calculations</p>
                  <div className="flex items-center gap-2">
                    <p className="text-2xl font-bold text-amber-800">{selectedCalc.calculations.toLocaleString()}</p>
                    <ChangeIndicator value={selectedCalc.calcsChange} size="md" />
                  </div>
                </div>
                <div className="p-4 bg-green-50 rounded-xl">
                  <p className="text-sm text-green-600 mb-1">Conversion Rate</p>
                  <p className={`text-2xl font-bold ${
                    selectedCalc.conversionRate >= 50 ? "text-green-700" :
                    selectedCalc.conversionRate >= 25 ? "text-yellow-600" :
                    "text-red-500"
                  }`}>{selectedCalc.conversionRate}%</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-xl">
                  <p className="text-sm text-blue-600 mb-1">All-Time Views</p>
                  <p className="text-2xl font-bold text-blue-700">{selectedCalc.allTimeViews.toLocaleString()}</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <p className="font-medium text-gray-900">Active Status</p>
                  <p className="text-sm text-gray-500">Calculator is visible on the site</p>
                </div>
                <button
                  onClick={() => {
                    setSelectedCalc({ ...selectedCalc, isActive: !selectedCalc.isActive });
                    toggleActive(selectedCalc.id);
                  }}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    selectedCalc.isActive ? "bg-green-500" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform ${
                      selectedCalc.isActive ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>
            <div className="p-6 border-t border-gray-100 flex items-center justify-between bg-gray-50">
              <Link
                href={`/en/${selectedCalc.slug}`}
                target="_blank"
                className="inline-flex items-center gap-2 text-sm text-[#2aa6ff] hover:underline"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Open Calculator
              </Link>
              <button
                onClick={() => setSelectedCalc(null)}
                className="px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
