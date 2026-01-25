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
  allTimeViews: number;
  calculations: number;
  lastUpdated: string;
}

interface StatsData {
  calculators: Calculator[];
  totals: {
    totalCalculators: number;
    activeCalculators: number;
    totalViews: number;
    totalCalculations: number;
    financeCount: number;
    healthCount: number;
  };
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

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Calculators</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your calculators and track performance</p>
        </div>
        <div className="flex items-center gap-3">
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

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-semibold text-gray-900">{loading ? "—" : data?.totals.totalCalculators}</p>
              <p className="text-sm text-gray-500">Total Calculators</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-semibold text-green-600">{loading ? "—" : data?.totals.activeCalculators}</p>
              <p className="text-sm text-gray-500">Active</p>
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
              <p className="text-2xl font-semibold text-gray-900">{loading ? "—" : data?.totals.totalViews.toLocaleString()}</p>
              <p className="text-sm text-gray-500">Views ({getPeriodLabel(period)})</p>
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
              <p className="text-2xl font-semibold text-gray-900">{loading ? "—" : data?.totals.totalCalculations.toLocaleString()}</p>
              <p className="text-sm text-gray-500">Calculations</p>
            </div>
          </div>
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
                          {calc.allTimeViews > 0 && calc.views > 0 && (
                            <span className="text-xs text-green-600 bg-green-50 px-1.5 py-0.5 rounded">
                              {Math.round((calc.views / (data?.totals.totalViews || 1)) * 100)}% of total
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-900 font-medium">{calc.calculations.toLocaleString()}</span>
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
                            title="Edit"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
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

      {/* Edit Modal */}
      {selectedCalc && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Edit Calculator</h2>
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Name</label>
                <input
                  type="text"
                  defaultValue={selectedCalc.name}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2aa6ff]/50 focus:border-[#2aa6ff]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Slug</label>
                <input
                  type="text"
                  defaultValue={selectedCalc.slug}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2aa6ff]/50 focus:border-[#2aa6ff] bg-gray-50"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Category</label>
                <select
                  defaultValue={selectedCalc.category}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2aa6ff]/50 focus:border-[#2aa6ff]"
                >
                  <option value="Finance">Finance</option>
                  <option value="Health">Health</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-500">Total Views</p>
                  <p className="text-lg font-semibold text-gray-900">{selectedCalc.allTimeViews.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Calculations</p>
                  <p className="text-lg font-semibold text-gray-900">{selectedCalc.calculations.toLocaleString()}</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
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
            <div className="p-6 border-t border-gray-100 flex items-center justify-end gap-3 bg-gray-50">
              <button
                onClick={() => setSelectedCalc(null)}
                className="px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setSelectedCalc(null)}
                className="px-4 py-2.5 text-sm font-medium text-white bg-[#2aa6ff] hover:bg-[#1488f5] rounded-lg transition-colors shadow-sm"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
