"use client";

import { useState, useEffect, useCallback } from "react";
import {
  BarChart3, Eye, Calculator, Globe, Monitor, Smartphone,
  Tablet, TrendingUp, TrendingDown, Activity, Clock,
  RefreshCw, ArrowUpRight, ArrowDownRight, Languages,
  Zap, MousePointerClick, Users
} from "lucide-react";

interface AnalyticsData {
  overview: {
    totalViews: number;
    viewsChange: number;
    totalCalculations: number;
    calcsChange: number;
    conversionRate: number;
    uniqueSessions: number;
    totalAllTime: number;
  };
  topCalculators: {
    slug: string;
    views: number;
    calculations: number;
    conversion: string;
  }[];
  byCountry: {
    country: string;
    flag: string;
    count: number;
    percentage: string;
  }[];
  byDevice: {
    device: string;
    count: number;
    percentage: string;
  }[];
  byLanguage: {
    code: string;
    name: string;
    flag: string;
    count: number;
    percentage: string;
  }[];
  dailyStats: {
    date: string;
    views: number;
    calculations: number;
    sessions: number;
  }[];
  recentActivity: {
    calculatorSlug: string;
    type: string;
    country: string | null;
    flag: string;
    device: string | null;
    language: string;
    createdAt: string;
  }[];
}

const PERIODS = [
  { value: "today", label: "Today" },
  { value: "7d", label: "7 Days" },
  { value: "30d", label: "30 Days" },
  { value: "90d", label: "90 Days" },
  { value: "365d", label: "1 Year" },
];

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState("30d");
  const [chartMode, setChartMode] = useState<"views" | "calculations">("views");

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/calculator-usage?period=${period}`);
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch (e) {
      console.error("Analytics fetch error:", e);
    } finally {
      setLoading(false);
    }
  }, [period]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const formatNumber = (n: number) => {
    if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
    if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
    return n.toLocaleString();
  };

  const formatSlug = (slug: string) => {
    return slug
      .replace(/-calculator$/, "")
      .replace(/-/g, " ")
      .replace(/\b\w/g, c => c.toUpperCase());
  };

  const timeAgo = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "just now";
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  // SVG Area Chart
  const AreaChart = ({ dailyData }: { dailyData: AnalyticsData["dailyStats"] }) => {
    if (!dailyData || dailyData.length === 0) {
      return (
        <div className="h-[200px] sm:h-[300px] flex items-center justify-center text-slate-400">
          <div className="text-center">
            <BarChart3 className="w-12 h-12 mx-auto mb-2 opacity-30" />
            <p className="text-sm">No data for this period</p>
          </div>
        </div>
      );
    }

    const values = dailyData.map(d => chartMode === "views" ? d.views : d.calculations);
    const maxVal = Math.max(...values, 1);
    const w = 900;
    const h = 260;
    const padX = 45;
    const padY = 20;
    const chartW = w - padX * 2;
    const chartH = h - padY * 2;

    const points = values.map((v, i) => ({
      x: padX + (i / Math.max(values.length - 1, 1)) * chartW,
      y: padY + chartH - (v / maxVal) * chartH,
    }));

    // Smooth curve
    const linePath = points.map((p, i) => {
      if (i === 0) return `M ${p.x} ${p.y}`;
      const prev = points[i - 1];
      const cpx = (prev.x + p.x) / 2;
      return `C ${cpx} ${prev.y} ${cpx} ${p.y} ${p.x} ${p.y}`;
    }).join(" ");

    const areaPath = `${linePath} L ${points[points.length - 1].x} ${h - padY} L ${points[0].x} ${h - padY} Z`;

    // Y-axis labels
    const yLabels = [0, 0.25, 0.5, 0.75, 1].map(pct => ({
      value: Math.round(maxVal * pct),
      y: padY + chartH - pct * chartH,
    }));

    // X-axis labels (show ~7 labels)
    const step = Math.max(1, Math.floor(dailyData.length / 7));
    const xLabels = dailyData.filter((_, i) => i % step === 0 || i === dailyData.length - 1).map((d, idx) => {
      const originalIdx = dailyData.indexOf(d);
      return {
        label: new Date(d.date).toLocaleDateString("en", { month: "short", day: "numeric" }),
        x: padX + (originalIdx / Math.max(dailyData.length - 1, 1)) * chartW,
      };
    });

    const color = chartMode === "views" ? "#3b82f6" : "#10b981";
    const colorLight = chartMode === "views" ? "#3b82f620" : "#10b98120";

    return (
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-[200px] sm:h-[300px]">
        <defs>
          <linearGradient id={`grad-${chartMode}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {yLabels.map((yl, i) => (
          <g key={i}>
            <line x1={padX} y1={yl.y} x2={w - padX} y2={yl.y} stroke="#e2e8f0" strokeWidth="1" strokeDasharray={i === 0 ? "0" : "4 4"} />
            <text x={padX - 8} y={yl.y + 4} textAnchor="end" fill="#94a3b8" fontSize="11">{formatNumber(yl.value)}</text>
          </g>
        ))}

        {/* Area + Line */}
        <path d={areaPath} fill={`url(#grad-${chartMode})`} />
        <path d={linePath} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" />

        {/* Data points */}
        {points.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r="3" fill="white" stroke={color} strokeWidth="2" />
            <title>{`${new Date(dailyData[i].date).toLocaleDateString()}: ${values[i]}`}</title>
          </g>
        ))}

        {/* X-axis labels */}
        {xLabels.map((xl, i) => (
          <text key={i} x={xl.x} y={h - 2} textAnchor="middle" fill="#94a3b8" fontSize="11">{xl.label}</text>
        ))}
      </svg>
    );
  };

  // Device icon helper
  const DeviceIcon = ({ device }: { device: string }) => {
    switch (device.toLowerCase()) {
      case "mobile": return <Smartphone className="w-5 h-5 text-blue-500" />;
      case "tablet": return <Tablet className="w-5 h-5 text-purple-500" />;
      default: return <Monitor className="w-5 h-5 text-emerald-500" />;
    }
  };

  const deviceColors: Record<string, string> = {
    desktop: "bg-emerald-500",
    mobile: "bg-blue-500",
    tablet: "bg-purple-500",
  };

  if (loading && !data) {
    return (
      <div className="space-y-4 sm:space-y-6">
        <div className="h-8 w-40 sm:w-56 bg-slate-200 rounded-lg animate-pulse" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-28 bg-slate-200 rounded-xl animate-pulse" />
          ))}
        </div>
        <div className="h-80 bg-slate-200 rounded-xl animate-pulse" />
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-lg sm:text-lg sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-blue-500" />
            Analytics
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Production traffic only · Localhost excluded
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchData}
            disabled={loading}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            title="Refresh"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
          <div className="flex bg-slate-100 rounded-lg p-0.5">
            {PERIODS.map(p => (
              <button
                key={p.value}
                onClick={() => setPeriod(p.value)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  period === p.value
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Page Views",
            value: data?.overview.totalViews || 0,
            change: data?.overview.viewsChange || 0,
            icon: <Eye className="w-5 h-5" />,
            color: "text-blue-600 bg-blue-50",
          },
          {
            label: "Calculations",
            value: data?.overview.totalCalculations || 0,
            change: data?.overview.calcsChange || 0,
            icon: <Calculator className="w-5 h-5" />,
            color: "text-emerald-600 bg-emerald-50",
          },
          {
            label: "Conversion Rate",
            value: data?.overview.conversionRate || 0,
            change: null,
            icon: <MousePointerClick className="w-5 h-5" />,
            color: "text-purple-600 bg-purple-50",
            suffix: "%",
          },
          {
            label: "All-Time Events",
            value: data?.overview.totalAllTime || 0,
            change: null,
            icon: <Zap className="w-5 h-5" />,
            color: "text-amber-600 bg-amber-50",
          },
        ].map((card, i) => (
          <div key={i} className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-slate-500">{card.label}</span>
              <div className={`p-2 rounded-lg ${card.color}`}>{card.icon}</div>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-lg sm:text-lg sm:text-xl sm:text-2xl font-bold text-slate-900">
                {card.suffix ? `${card.value}${card.suffix}` : formatNumber(card.value as number)}
              </span>
              {card.change !== null && card.change !== 0 && (
                <span className={`flex items-center gap-0.5 text-xs font-medium px-1.5 py-0.5 rounded-full ${
                  card.change > 0
                    ? "text-green-700 bg-green-50"
                    : "text-red-700 bg-red-50"
                }`}>
                  {card.change > 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {Math.abs(card.change).toFixed(1)}%
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-3 sm:px-3 sm:px-6 py-2.5 sm:py-3 sm:py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-semibold text-slate-900 flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-500" />
            Traffic Over Time
          </h3>
          <div className="flex bg-slate-100 rounded-lg p-0.5">
            {(["views", "calculations"] as const).map(mode => (
              <button
                key={mode}
                onClick={() => setChartMode(mode)}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                  chartMode === mode
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {mode === "views" ? "Views" : "Calculations"}
              </button>
            ))}
          </div>
        </div>
        <div className="p-2 sm:p-4">
          <AreaChart dailyData={data?.dailyStats || []} />
        </div>
      </div>

      {/* Top Calculators Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-3 sm:px-3 sm:px-6 py-2.5 sm:py-3 sm:py-4 border-b border-slate-100">
          <h3 className="font-semibold text-slate-900 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-500" />
            Top Calculators
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50/80">
                <th className="text-left px-3 sm:px-6 py-2.5 sm:py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">#</th>
                <th className="text-left px-3 sm:px-6 py-2.5 sm:py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Calculator</th>
                <th className="text-right px-3 sm:px-6 py-2.5 sm:py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Views</th>
                <th className="text-right px-3 sm:px-6 py-2.5 sm:py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Calculations</th>
                <th className="text-right px-3 sm:px-6 py-2.5 sm:py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Conversion</th>
                <th className="px-3 sm:px-6 py-2.5 sm:py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Bar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data?.topCalculators?.map((calc, i) => {
                const maxViews = data.topCalculators[0]?.views || 1;
                const barWidth = (calc.views / maxViews) * 100;
                return (
                  <tr key={calc.slug} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-3 sm:px-6 py-2.5 sm:py-3.5 text-sm text-slate-400 font-medium">{i + 1}</td>
                    <td className="px-3 sm:px-6 py-2.5 sm:py-3.5">
                      <span className="text-sm font-medium text-slate-900">{formatSlug(calc.slug)}</span>
                      <span className="text-xs text-slate-400 block">{calc.slug}</span>
                    </td>
                    <td className="px-3 sm:px-6 py-2.5 sm:py-3.5 text-right text-sm font-semibold text-slate-700">{calc.views.toLocaleString()}</td>
                    <td className="px-3 sm:px-6 py-2.5 sm:py-3.5 text-right text-sm text-slate-600">{calc.calculations.toLocaleString()}</td>
                    <td className="px-3 sm:px-6 py-2.5 sm:py-3.5 text-right">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                        parseFloat(calc.conversion) >= 50
                          ? "bg-green-100 text-green-700"
                          : parseFloat(calc.conversion) >= 25
                          ? "bg-amber-100 text-amber-700"
                          : "bg-slate-100 text-slate-600"
                      }`}>
                        {calc.conversion}%
                      </span>
                    </td>
                    <td className="px-3 sm:px-6 py-2.5 sm:py-3.5 w-40">
                      <div className="w-full bg-slate-100 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${barWidth}%` }}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
              {(!data?.topCalculators || data.topCalculators.length === 0) && (
                <tr>
                  <td colSpan={6} className="px-3 sm:px-6 py-8 sm:py-12 text-center text-slate-400">
                    <BarChart3 className="w-10 h-10 mx-auto mb-2 opacity-30" />
                    <p className="text-sm">No calculator data yet</p>
                    <p className="text-xs mt-1">Data appears once visitors use calculators in production</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Three Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Countries */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-3 sm:px-3 sm:px-6 py-2.5 sm:py-3 sm:py-4 border-b border-slate-100">
            <h3 className="font-semibold text-slate-900 flex items-center gap-2">
              <Globe className="w-5 h-5 text-purple-500" />
              Top Countries
            </h3>
          </div>
          <div className="p-4 space-y-2.5">
            {data?.byCountry?.slice(0, 8).map((item) => (
              <div key={item.country} className="flex items-center gap-3">
                <span className="text-lg flex-shrink-0">{item.flag}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-slate-700 truncate">{item.country}</span>
                    <span className="text-xs text-slate-500 ml-2 flex-shrink-0">
                      {item.count.toLocaleString()} ({item.percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5">
                    <div
                      className="bg-purple-500 h-1.5 rounded-full transition-all duration-500"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
            {(!data?.byCountry || data.byCountry.length === 0) && (
              <div className="text-center py-8 text-slate-400">
                <Globe className="w-8 h-8 mx-auto mb-2 opacity-30" />
                <p className="text-sm">No country data yet</p>
                <p className="text-xs mt-1">Countries detected from production traffic</p>
              </div>
            )}
          </div>
        </div>

        {/* Devices */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-3 sm:px-3 sm:px-6 py-2.5 sm:py-3 sm:py-4 border-b border-slate-100">
            <h3 className="font-semibold text-slate-900 flex items-center gap-2">
              <Monitor className="w-5 h-5 text-emerald-500" />
              Devices
            </h3>
          </div>
          <div className="p-3 sm:p-6">
            {data?.byDevice && data.byDevice.length > 0 ? (
              <>
                {/* Visual breakdown */}
                <div className="flex items-center gap-1 mb-6 h-4 rounded-full overflow-hidden">
                  {data.byDevice.map(d => (
                    <div
                      key={d.device}
                      className={`h-full ${deviceColors[d.device.toLowerCase()] || "bg-slate-300"} transition-all duration-500`}
                      style={{ width: `${d.percentage}%` }}
                      title={`${d.device}: ${d.percentage}%`}
                    />
                  ))}
                </div>

                {/* Device list */}
                <div className="space-y-4">
                  {data.byDevice.map(d => (
                    <div key={d.device} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <DeviceIcon device={d.device} />
                        <div>
                          <p className="text-sm font-medium text-slate-700 capitalize">{d.device}</p>
                          <p className="text-xs text-slate-400">{d.count.toLocaleString()} events</p>
                        </div>
                      </div>
                      <span className="text-lg font-bold text-slate-900">{d.percentage}%</span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-8 text-slate-400">
                <Monitor className="w-8 h-8 mx-auto mb-2 opacity-30" />
                <p className="text-sm">No device data yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Languages */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-3 sm:px-3 sm:px-6 py-2.5 sm:py-3 sm:py-4 border-b border-slate-100">
            <h3 className="font-semibold text-slate-900 flex items-center gap-2">
              <Languages className="w-5 h-5 text-amber-500" />
              Languages
            </h3>
          </div>
          <div className="p-4 space-y-3">
            {data?.byLanguage?.map(lang => (
              <div key={lang.code} className="flex items-center gap-3">
                <span className="text-lg flex-shrink-0">{lang.flag}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-slate-700">{lang.name}</span>
                    <span className="text-xs text-slate-500">
                      {lang.count.toLocaleString()} ({lang.percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5">
                    <div
                      className="bg-amber-500 h-1.5 rounded-full transition-all duration-500"
                      style={{ width: `${lang.percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
            {(!data?.byLanguage || data.byLanguage.length === 0) && (
              <div className="text-center py-8 text-slate-400">
                <Languages className="w-8 h-8 mx-auto mb-2 opacity-30" />
                <p className="text-sm">No language data yet</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-3 sm:px-3 sm:px-6 py-2.5 sm:py-3 sm:py-4 border-b border-slate-100">
          <h3 className="font-semibold text-slate-900 flex items-center gap-2">
            <Clock className="w-5 h-5 text-slate-500" />
            Recent Activity
          </h3>
        </div>
        <div className="divide-y divide-slate-50">
          {data?.recentActivity?.slice(0, 15).map((event, i) => (
            <div key={i} className="px-3 sm:px-6 py-2.5 sm:py-3 flex items-center gap-4 hover:bg-slate-50/50 transition-colors">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                event.type === "CALCULATION"
                  ? "bg-emerald-100 text-emerald-600"
                  : "bg-blue-100 text-blue-600"
              }`}>
                {event.type === "CALCULATION"
                  ? <Calculator className="w-4 h-4" />
                  : <Eye className="w-4 h-4" />
                }
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-slate-700">
                  <span className="font-medium">{formatSlug(event.calculatorSlug)}</span>
                  <span className="text-slate-400 ml-1">
                    — {event.type === "CALCULATION" ? "calculated" : "viewed"}
                  </span>
                </p>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                {event.country && (
                  <span className="text-sm" title={event.country}>{event.flag}</span>
                )}
                <span className="text-xs text-slate-400 capitalize">{event.device || ""}</span>
                <span className="text-xs text-slate-400 w-16 text-right">{timeAgo(event.createdAt)}</span>
              </div>
            </div>
          ))}
          {(!data?.recentActivity || data.recentActivity.length === 0) && (
            <div className="px-3 sm:px-6 py-8 sm:py-12 text-center text-slate-400">
              <Activity className="w-10 h-10 mx-auto mb-2 opacity-30" />
              <p className="text-sm">No activity recorded yet</p>
              <p className="text-xs mt-1">Events appear when users visit calculators in production</p>
            </div>
          )}
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 flex items-start gap-3">
        <div className="bg-blue-100 rounded-lg p-2 flex-shrink-0">
          <Globe className="w-4 h-4 text-blue-600" />
        </div>
        <div>
          <p className="text-sm font-medium text-blue-900">About Analytics Data</p>
          <p className="text-xs text-blue-700 mt-0.5">
            Only production traffic is tracked. Localhost visits are automatically excluded.
            Country detection uses Vercel/Cloudflare headers. Data persists across deployments in your Neon PostgreSQL database.
          </p>
        </div>
      </div>
    </div>
  );
}

