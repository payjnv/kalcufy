// src/app/[locale]/admin/calculators/page.tsx
// REEMPLAZA tu archivo actual con este
// CAMBIO PRINCIPAL: toggleActive ahora llama a la API para guardar en BD

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
    everydayCount: number;
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
  const [toggling, setToggling] = useState<string | null>(null);

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

  // ============================================
  // NUEVO: Toggle que guarda en la base de datos
  // ============================================
  const toggleActive = async (slug: string) => {
    if (!data || toggling) return;
    
    setToggling(slug);
    
    try {
      const res = await fetch(`/api/admin/calculators/${slug}/toggle`, {
        method: "POST",
      });
      
      if (res.ok) {
        const result = await res.json();
        
        // Update local state
        setData({
          ...data,
          calculators: data.calculators.map((calc) =>
            calc.slug === slug ? { ...calc, isActive: result.isActive } : calc
          ),
          totals: {
            ...data.totals,
            activeCalculators: data.calculators.filter(c => 
              c.slug === slug ? result.isActive : c.isActive
            ).length,
          },
        });
        
        // Update selected calc if open
        if (selectedCalc?.slug === slug) {
          setSelectedCalc({ ...selectedCalc, isActive: result.isActive });
        }
      } else {
        console.error("Failed to toggle calculator status");
        alert("Failed to update calculator status. Please try again.");
      }
    } catch (error) {
      console.error("Error toggling calculator:", error);
      alert("Error updating calculator status. Please try again.");
    } finally {
      setToggling(null);
    }
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

  // Toggle Switch Component
  const ToggleSwitch = ({ calc }: { calc: Calculator }) => {
    const isLoading = toggling === calc.slug;
    
    return (
      <button
        onClick={() => toggleActive(calc.slug)}
        disabled={isLoading}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          isLoading ? "opacity-50 cursor-wait" : ""
        } ${calc.isActive ? "bg-green-500" : "bg-gray-200"}`}
      >
        {isLoading ? (
          <span className="absolute inset-0 flex items-center justify-center">
            <svg className="animate-spin h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </span>
        ) : (
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform ${
              calc.isActive ? "translate-x-6" : "translate-x-1"
            }`}
          />
        )}
      </button>
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
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      {!loading && data && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <p className="text-sm text-gray-500 mb-1">Total Calculators</p>
            <p className="text-2xl font-bold text-gray-900">{data.totals.totalCalculators}</p>
            <p className="text-xs text-gray-400 mt-1">
              {data.totals.activeCalculators} active
            </p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <p className="text-sm text-gray-500 mb-1">Total Views</p>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold text-gray-900">{data.totals.totalViews.toLocaleString()}</p>
              <ChangeIndicator value={data.totals.totalViewsChange} size="md" />
            </div>
            <p className="text-xs text-gray-400 mt-1">{getPrevPeriodLabel(period)}</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <p className="text-sm text-gray-500 mb-1">Total Calculations</p>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold text-gray-900">{data.totals.totalCalculations.toLocaleString()}</p>
              <ChangeIndicator value={data.totals.totalCalcsChange} size="md" />
            </div>
            <p className="text-xs text-gray-400 mt-1">{getPrevPeriodLabel(period)}</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <p className="text-sm text-gray-500 mb-1">Conversion Rate</p>
            <p className="text-2xl font-bold text-gray-900">{data.totals.overallConversionRate}%</p>
            <p className="text-xs text-gray-400 mt-1">Views → Calculations</p>
          </div>
        </div>
      )}

      {/* Filters */}
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
            className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex gap-2">
          {["all", "finance", "health", "everyday"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                filter === f
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <svg className="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/50">
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Calculator</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Views</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Calculations</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Conv. Rate</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredCalculators.map((calc) => (
                    <tr key={calc.id} className={`hover:bg-gray-50/50 transition-colors ${!calc.isActive ? 'opacity-50' : ''}`}>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-900">{calc.name}</p>
                          <p className="text-xs text-gray-400">{calc.slug}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full ${
                          calc.category === "Finance" 
                            ? "bg-blue-50 text-blue-700"
                            : calc.category === "Health"
                            ? "bg-green-50 text-green-700"
                            : "bg-purple-50 text-purple-700"
                        }`}>
                          {calc.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900">{calc.views.toLocaleString()}</span>
                          <ChangeIndicator value={calc.viewsChange} />
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900">{calc.calculations.toLocaleString()}</span>
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
                            />
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
                        <ToggleSwitch calc={calc} />
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
                <span className="text-green-600 font-medium">{data?.totals.activeCalculators || 0} active</span>
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
                    : selectedCalc.category === "Health"
                    ? "bg-gradient-to-br from-green-500 to-green-600"
                    : "bg-gradient-to-br from-purple-500 to-purple-600"
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
                <ToggleSwitch calc={selectedCalc} />
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
