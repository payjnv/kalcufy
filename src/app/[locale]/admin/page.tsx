"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Eye, Calculator, Users, CreditCard, Mail, Globe,
  Monitor, Smartphone, Tablet, TrendingUp, TrendingDown,
  Activity, Clock, RefreshCw, ArrowUpRight, ArrowDownRight,
  MousePointerClick, Zap, FileText, BarChart3, Languages,
  Newspaper, MessageSquare, DollarSign, ChevronRight,
  Sparkles, Target, UserPlus, CalendarDays, Flame
} from "lucide-react";

// ─────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────
interface DashboardData {
  kpi: {
    totalUsers: number; proUsers: number;
    usersThisWeek: number; usersWeekChange: number;
    totalViews: number; viewsToday: number; viewsYesterday: number;
    viewsThisWeek: number; viewsWeekChange: number;
    totalCalculations: number; calcsToday: number; calcsYesterday: number;
    calcsThisWeek: number; calcsWeekChange: number;
    conversionRate: number;
    newsletterSubscribers: number; unreadMessages: number;
    activeSubscriptions: number; totalBlogPosts: number;
    monthlyRevenue: number;
  };
  dailyStats: { date: string; views: number; calculations: number }[];
  hourlyToday: { hour: number; count: number }[];
  topCalculators: { slug: string; views: number; calculations: number; conversion: number }[];
  byCountry: { country: string; flag: string; count: number }[];
  byDevice: { device: string; count: number }[];
  byLanguage: { code: string; name: string; flag: string; count: number }[];
  recentUsers: {
    id: string; name: string | null; email: string;
    image: string | null; isPro: boolean; createdAt: string;
  }[];
  recentActivity: {
    calculatorSlug: string; type: string; country: string | null;
    flag: string; device: string | null; language: string; createdAt: string;
  }[];
}

// ─────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────
const fmt = (n: number) => {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toLocaleString();
};

const slugToName = (s: string) =>
  s.replace(/-calculator$/, "").replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());

const timeAgo = (d: string) => {
  const diff = Date.now() - new Date(d).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "now";
  if (m < 60) return `${m}m`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h`;
  return `${Math.floor(h / 24)}d`;
};

// ─────────────────────────────────────────────────
// SVG COMPONENTS
// ─────────────────────────────────────────────────
function Sparkline({ data, color = "#3b82f6", height = 32, width = 100 }: {
  data: number[]; color?: string; height?: number; width?: number;
}) {
  if (!data.length) return null;
  const max = Math.max(...data, 1);
  const pts = data.map((v, i) => ({
    x: (i / Math.max(data.length - 1, 1)) * width,
    y: height - (v / max) * (height - 4) - 2,
  }));
  const d = pts.map((p, i) => {
    if (i === 0) return `M ${p.x} ${p.y}`;
    const prev = pts[i - 1];
    const cpx = (prev.x + p.x) / 2;
    return `C ${cpx} ${prev.y} ${cpx} ${p.y} ${p.x} ${p.y}`;
  }).join(" ");
  const area = `${d} L ${pts[pts.length - 1].x} ${height} L 0 ${height} Z`;
  return (
    <svg width={width} height={height} className="shrink-0">
      <defs>
        <linearGradient id={`sg-${color.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#sg-${color.replace("#", "")})`} />
      <path d={d} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function AreaChart({ data, mode }: {
  data: DashboardData["dailyStats"]; mode: "views" | "calculations";
}) {
  if (!data.length) {
    return (
      <div className="h-[220px] flex items-center justify-center text-slate-300">
        <div className="text-center">
          <BarChart3 className="w-10 h-10 mx-auto mb-1 opacity-40" />
          <p className="text-xs">Waiting for data...</p>
        </div>
      </div>
    );
  }
  const vals = data.map(d => mode === "views" ? d.views : d.calculations);
  const maxV = Math.max(...vals, 1);
  const W = 680, H = 200, PX = 40, PY = 15;
  const cW = W - PX * 2, cH = H - PY * 2;

  const pts = vals.map((v, i) => ({
    x: PX + (i / Math.max(vals.length - 1, 1)) * cW,
    y: PY + cH - (v / maxV) * cH,
  }));
  const line = pts.map((p, i) => {
    if (i === 0) return `M ${p.x} ${p.y}`;
    const prev = pts[i - 1];
    const cpx = (prev.x + p.x) / 2;
    return `C ${cpx} ${prev.y} ${cpx} ${p.y} ${p.x} ${p.y}`;
  }).join(" ");
  const area = `${line} L ${pts[pts.length - 1].x} ${H - PY} L ${pts[0].x} ${H - PY} Z`;

  const yLabels = [0, 0.5, 1].map(pct => ({
    val: Math.round(maxV * pct), y: PY + cH - pct * cH,
  }));
  const step = Math.max(1, Math.floor(data.length / 6));
  const xLabels = data.filter((_, i) => i % step === 0).map(d => {
    const idx = data.indexOf(d);
    return {
      label: new Date(d.date).toLocaleDateString("en", { month: "short", day: "numeric" }),
      x: PX + (idx / Math.max(data.length - 1, 1)) * cW,
    };
  });

  const c = mode === "views" ? "#3b82f6" : "#10b981";
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-[220px]">
      <defs>
        <linearGradient id={`area-${mode}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={c} stopOpacity="0.2" />
          <stop offset="100%" stopColor={c} stopOpacity="0.01" />
        </linearGradient>
      </defs>
      {yLabels.map((yl, i) => (
        <g key={i}>
          <line x1={PX} y1={yl.y} x2={W - PX} y2={yl.y} stroke="#f1f5f9" strokeWidth="1" />
          <text x={PX - 6} y={yl.y + 3} textAnchor="end" fill="#94a3b8" fontSize="10">{fmt(yl.val)}</text>
        </g>
      ))}
      <path d={area} fill={`url(#area-${mode})`} />
      <path d={line} fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" />
      {pts.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="2.5" fill="white" stroke={c} strokeWidth="1.5">
          <title>{`${new Date(data[i].date).toLocaleDateString()}: ${vals[i]}`}</title>
        </circle>
      ))}
      {xLabels.map((xl, i) => (
        <text key={i} x={xl.x} y={H - 1} textAnchor="middle" fill="#94a3b8" fontSize="9">{xl.label}</text>
      ))}
    </svg>
  );
}

function HourlyBars({ data }: { data: DashboardData["hourlyToday"] }) {
  const hours = Array.from({ length: 24 }, (_, i) => {
    const found = data.find(d => d.hour === i);
    return found ? found.count : 0;
  });
  const maxH = Math.max(...hours, 1);
  const currentHour = new Date().getHours();
  return (
    <div className="flex items-end gap-[3px] h-16">
      {hours.map((h, i) => (
        <div
          key={i}
          className={`flex-1 rounded-t transition-all duration-300 ${
            i === currentHour ? "bg-blue-500" : i < currentHour ? "bg-blue-200" : "bg-slate-100"
          }`}
          style={{ height: `${Math.max((h / maxH) * 100, 4)}%` }}
          title={`${i}:00 — ${h} events`}
        />
      ))}
    </div>
  );
}

function DeviceDonut({ data }: { data: DashboardData["byDevice"] }) {
  const total = data.reduce((s, d) => s + d.count, 0) || 1;
  const colors: Record<string, string> = {
    desktop: "#10b981", mobile: "#3b82f6", tablet: "#8b5cf6",
  };
  let offset = 0;
  const segments = data.map(d => {
    const pct = d.count / total;
    const seg = { ...d, pct, offset, color: colors[d.device.toLowerCase()] || "#94a3b8" };
    offset += pct;
    return seg;
  });
  const R = 40, C = 2 * Math.PI * R;
  return (
    <div className="flex items-center gap-5">
      <svg width="100" height="100" viewBox="0 0 100 100" className="shrink-0">
        <circle cx="50" cy="50" r={R} fill="none" stroke="#f1f5f9" strokeWidth="12" />
        {segments.map((s, i) => (
          <circle
            key={i} cx="50" cy="50" r={R} fill="none"
            stroke={s.color} strokeWidth="12"
            strokeDasharray={`${s.pct * C} ${C}`}
            strokeDashoffset={-s.offset * C}
            transform="rotate(-90 50 50)"
            strokeLinecap="round"
          />
        ))}
        <text x="50" y="50" textAnchor="middle" dominantBaseline="central"
          fill="#0f172a" fontSize="16" fontWeight="bold">{fmt(total)}</text>
      </svg>
      <div className="space-y-2">
        {segments.map(s => (
          <div key={s.device} className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: s.color }} />
            <span className="text-xs text-slate-600 capitalize">{s.device}</span>
            <span className="text-xs font-semibold text-slate-900 ml-auto">{(s.pct * 100).toFixed(0)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────
// CHANGE BADGE
// ─────────────────────────────────────────────────
function ChangeBadge({ value, label }: { value: number; label?: string }) {
  if (value === 0) return label ? <span className="text-[10px] text-slate-400">{label}</span> : null;
  const up = value > 0;
  return (
    <span className={`inline-flex items-center gap-0.5 text-[11px] font-semibold px-1.5 py-0.5 rounded-full ${
      up ? "text-emerald-700 bg-emerald-50" : "text-red-600 bg-red-50"
    }`}>
      {up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
      {Math.abs(value).toFixed(1)}%
    </span>
  );
}

// ─────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────
export default function AdminDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [chartMode, setChartMode] = useState<"views" | "calculations">("views");
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "en";

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/stats");
      if (res.ok) setData(await res.json());
    } catch (e) {
      console.error("Dashboard fetch error:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  // Auto-refresh every 60s
  useEffect(() => {
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, [fetchData]);

  const kpi = data?.kpi;
  const sparkViews = data?.dailyStats?.map(d => d.views) || [];
  const sparkCalcs = data?.dailyStats?.map(d => d.calculations) || [];

  // ─────────────────────────────────────────────────
  // SKELETON
  // ─────────────────────────────────────────────────
  if (loading && !data) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 w-64 bg-slate-200 rounded-lg" />
        <div className="grid grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => <div key={i} className="h-[120px] bg-slate-200 rounded-2xl" />)}
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2 h-72 bg-slate-200 rounded-2xl" />
          <div className="h-72 bg-slate-200 rounded-2xl" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[...Array(2)].map((_, i) => <div key={i} className="h-64 bg-slate-200 rounded-2xl" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* ═══════════ HEADER ═══════════ */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            Dashboard
          </h1>
          <p className="text-slate-500 text-sm mt-0.5">Welcome back, Jhon. Here&apos;s your overview.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={fetchData}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-700 bg-white border border-slate-200 rounded-lg hover:border-slate-300 transition-all"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
          <span className="text-[10px] text-slate-400 bg-slate-50 px-2 py-1 rounded-full">
            Auto-refresh 60s
          </span>
        </div>
      </div>

      {/* ═══════════ KPI CARDS ROW 1 ═══════════ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Views */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-md hover:border-slate-300 transition-all group">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                <Eye className="w-[18px] h-[18px] text-blue-600" />
              </div>
              <span className="text-xs font-medium text-slate-500">Page Views</span>
            </div>
            <ChangeBadge value={kpi?.viewsWeekChange || 0} />
          </div>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-2xl font-bold text-slate-900">{fmt(kpi?.viewsThisWeek || 0)}</p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {kpi?.viewsToday || 0} today · {fmt(kpi?.totalViews || 0)} all-time
              </p>
            </div>
            <Sparkline data={sparkViews} color="#3b82f6" />
          </div>
        </div>

        {/* Calculations */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-md hover:border-slate-300 transition-all group">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
                <Calculator className="w-[18px] h-[18px] text-emerald-600" />
              </div>
              <span className="text-xs font-medium text-slate-500">Calculations</span>
            </div>
            <ChangeBadge value={kpi?.calcsWeekChange || 0} />
          </div>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-2xl font-bold text-slate-900">{fmt(kpi?.calcsThisWeek || 0)}</p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {kpi?.calcsToday || 0} today · {fmt(kpi?.totalCalculations || 0)} all-time
              </p>
            </div>
            <Sparkline data={sparkCalcs} color="#10b981" />
          </div>
        </div>

        {/* Users */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-md hover:border-slate-300 transition-all group">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-purple-50 flex items-center justify-center group-hover:bg-purple-100 transition-colors">
                <Users className="w-[18px] h-[18px] text-purple-600" />
              </div>
              <span className="text-xs font-medium text-slate-500">Users</span>
            </div>
            <ChangeBadge value={kpi?.usersWeekChange || 0} />
          </div>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-2xl font-bold text-slate-900">{kpi?.totalUsers || 0}</p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {kpi?.proUsers || 0} PRO · {kpi?.usersThisWeek || 0} new this week
              </p>
            </div>
            <div className="flex items-center gap-1">
              {kpi?.proUsers ? (
                <span className="text-[10px] font-semibold text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded-full">
                  {((kpi.proUsers / (kpi.totalUsers || 1)) * 100).toFixed(0)}% PRO
                </span>
              ) : null}
            </div>
          </div>
        </div>

        {/* Revenue */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-md hover:border-slate-300 transition-all group">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center group-hover:bg-amber-100 transition-colors">
                <DollarSign className="w-[18px] h-[18px] text-amber-600" />
              </div>
              <span className="text-xs font-medium text-slate-500">Revenue</span>
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-900">${kpi?.monthlyRevenue?.toFixed(2) || "0.00"}</p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              {kpi?.activeSubscriptions || 0} subscriptions × $2.99/mo
            </p>
          </div>
        </div>
      </div>

      {/* ═══════════ CHART + ACTIVITY ═══════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
              <Activity className="w-4 h-4 text-blue-500" />
              Last 14 Days
            </h3>
            <div className="flex bg-slate-100 rounded-lg p-0.5">
              {(["views", "calculations"] as const).map(m => (
                <button
                  key={m}
                  onClick={() => setChartMode(m)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
                    chartMode === m ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"
                  }`}
                >
                  {m === "views" ? "Views" : "Calculations"}
                </button>
              ))}
            </div>
          </div>
          <div className="p-4">
            <AreaChart data={data?.dailyStats || []} mode={chartMode} />
          </div>
        </div>

        {/* Today Pulse + Quick Stats */}
        <div className="space-y-4">
          {/* Today Pulse */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2 mb-3">
              <Flame className="w-4 h-4 text-orange-500" />
              Today&apos;s Pulse
            </h3>
            <HourlyBars data={data?.hourlyToday || []} />
            <div className="flex justify-between mt-2">
              <span className="text-[10px] text-slate-400">12am</span>
              <span className="text-[10px] text-slate-400">12pm</span>
              <span className="text-[10px] text-slate-400">11pm</span>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="bg-blue-50/60 rounded-xl p-3 text-center">
                <p className="text-lg font-bold text-blue-700">{kpi?.viewsToday || 0}</p>
                <p className="text-[10px] text-blue-500 font-medium">Views today</p>
              </div>
              <div className="bg-emerald-50/60 rounded-xl p-3 text-center">
                <p className="text-lg font-bold text-emerald-700">{kpi?.calcsToday || 0}</p>
                <p className="text-[10px] text-emerald-500 font-medium">Calcs today</p>
              </div>
            </div>
          </div>

          {/* Conversion */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-5 text-white">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-medium text-slate-300">Conversion Rate</span>
            </div>
            <p className="text-3xl font-bold">{kpi?.conversionRate || 0}%</p>
            <p className="text-[11px] text-slate-400 mt-1">Views → Calculations this week</p>
            <div className="w-full bg-slate-700 rounded-full h-1.5 mt-3">
              <div
                className="bg-gradient-to-r from-cyan-400 to-blue-400 h-1.5 rounded-full transition-all"
                style={{ width: `${Math.min(kpi?.conversionRate || 0, 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════ TOP CALCULATORS ═══════════ */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-500" />
            Top Calculators
            <span className="text-[10px] text-slate-400 font-normal ml-1">Last 30 days</span>
          </h3>
          <Link href={`/${locale}/admin/analytics`} className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-0.5">
            Full Analytics <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50/60">
                <th className="text-left px-5 py-2.5 text-[10px] font-semibold text-slate-400 uppercase tracking-wider w-8">#</th>
                <th className="text-left px-5 py-2.5 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Calculator</th>
                <th className="text-right px-5 py-2.5 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Views</th>
                <th className="text-right px-5 py-2.5 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Calcs</th>
                <th className="text-right px-5 py-2.5 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Conv.</th>
                <th className="px-5 py-2.5 text-[10px] font-semibold text-slate-400 uppercase tracking-wider w-28"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {data?.topCalculators?.slice(0, 8).map((calc, i) => {
                const maxV = data.topCalculators[0]?.views || 1;
                return (
                  <tr key={calc.slug} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-5 py-2.5 text-xs text-slate-400 font-medium">{i + 1}</td>
                    <td className="px-5 py-2.5">
                      <p className="text-sm font-medium text-slate-900">{slugToName(calc.slug)}</p>
                    </td>
                    <td className="px-5 py-2.5 text-right text-sm font-semibold text-slate-700">{calc.views.toLocaleString()}</td>
                    <td className="px-5 py-2.5 text-right text-sm text-slate-600">{calc.calculations.toLocaleString()}</td>
                    <td className="px-5 py-2.5 text-right">
                      <span className={`text-xs font-semibold px-1.5 py-0.5 rounded-full ${
                        calc.conversion >= 50 ? "bg-emerald-50 text-emerald-700"
                        : calc.conversion >= 25 ? "bg-amber-50 text-amber-700"
                        : "bg-slate-50 text-slate-600"
                      }`}>{calc.conversion}%</span>
                    </td>
                    <td className="px-5 py-2.5">
                      <div className="w-full bg-slate-100 rounded-full h-1.5">
                        <div className="bg-blue-400 h-1.5 rounded-full transition-all" style={{ width: `${(calc.views / maxV) * 100}%` }} />
                      </div>
                    </td>
                  </tr>
                );
              })}
              {(!data?.topCalculators?.length) && (
                <tr><td colSpan={6} className="px-5 py-10 text-center text-sm text-slate-400">No calculator data yet</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ═══════════ 3-COLUMN: GEO + DEVICES + LANGUAGES ═══════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Countries */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100">
            <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
              <Globe className="w-4 h-4 text-purple-500" />
              Top Countries
            </h3>
          </div>
          <div className="p-4 space-y-2">
            {data?.byCountry?.length ? data.byCountry.slice(0, 6).map((c, i) => {
              const total = data.byCountry.reduce((s, x) => s + x.count, 0) || 1;
              const pct = ((c.count / total) * 100).toFixed(0);
              return (
                <div key={c.country} className="flex items-center gap-2.5">
                  <span className="text-base shrink-0">{c.flag}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between mb-0.5">
                      <span className="text-xs font-medium text-slate-700 truncate">{c.country}</span>
                      <span className="text-[10px] text-slate-400 ml-1">{c.count} ({pct}%)</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1">
                      <div className="bg-purple-400 h-1 rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                </div>
              );
            }) : (
              <div className="text-center py-6 text-slate-400">
                <Globe className="w-8 h-8 mx-auto mb-1 opacity-30" />
                <p className="text-xs">No country data</p>
              </div>
            )}
          </div>
        </div>

        {/* Devices */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100">
            <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
              <Monitor className="w-4 h-4 text-emerald-500" />
              Devices
            </h3>
          </div>
          <div className="p-5 flex items-center justify-center min-h-[160px]">
            {data?.byDevice?.length ? (
              <DeviceDonut data={data.byDevice} />
            ) : (
              <div className="text-center text-slate-400">
                <Monitor className="w-8 h-8 mx-auto mb-1 opacity-30" />
                <p className="text-xs">No device data</p>
              </div>
            )}
          </div>
        </div>

        {/* Languages */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100">
            <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
              <Languages className="w-4 h-4 text-amber-500" />
              Languages
            </h3>
          </div>
          <div className="p-4 space-y-3">
            {data?.byLanguage?.length ? data.byLanguage.map(l => {
              const total = data.byLanguage.reduce((s, x) => s + x.count, 0) || 1;
              const pct = ((l.count / total) * 100).toFixed(0);
              return (
                <div key={l.code} className="flex items-center gap-2.5">
                  <span className="text-base shrink-0">{l.flag}</span>
                  <div className="flex-1">
                    <div className="flex justify-between mb-0.5">
                      <span className="text-xs font-medium text-slate-700">{l.name}</span>
                      <span className="text-[10px] text-slate-400">{l.count} ({pct}%)</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1">
                      <div className="bg-amber-400 h-1 rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                </div>
              );
            }) : (
              <div className="text-center py-6 text-slate-400">
                <Languages className="w-8 h-8 mx-auto mb-1 opacity-30" />
                <p className="text-xs">No language data</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ═══════════ RECENT USERS + ACTIVITY ═══════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recent Users */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
              <UserPlus className="w-4 h-4 text-purple-500" />
              Recent Users
            </h3>
            <Link href={`/${locale}/admin/users`} className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-0.5">
              View all <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="divide-y divide-slate-50">
            {data?.recentUsers?.slice(0, 5).map(u => (
              <div key={u.id} className="px-5 py-3 flex items-center gap-3 hover:bg-slate-50/50 transition-colors">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                  {u.name?.substring(0, 2).toUpperCase() || u.email.substring(0, 2).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900 truncate">{u.name || "No name"}</p>
                  <p className="text-[11px] text-slate-400 truncate">{u.email}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                    u.isPro ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-500"
                  }`}>{u.isPro ? "PRO" : "FREE"}</span>
                  <span className="text-[10px] text-slate-400">{timeAgo(u.createdAt)}</span>
                </div>
              </div>
            )) || (
              <div className="px-5 py-8 text-center text-slate-400 text-xs">No users yet</div>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
              <Activity className="w-4 h-4 text-slate-500" />
              Live Activity
            </h3>
            <Link href={`/${locale}/admin/analytics`} className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-0.5">
              Analytics <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="divide-y divide-slate-50">
            {data?.recentActivity?.slice(0, 6).map((e, i) => (
              <div key={i} className="px-5 py-2.5 flex items-center gap-3 hover:bg-slate-50/50 transition-colors">
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                  e.type === "CALCULATION" ? "bg-emerald-100 text-emerald-600" : "bg-blue-100 text-blue-600"
                }`}>
                  {e.type === "CALCULATION" ? <Calculator className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-slate-700">
                    <span className="font-medium">{slugToName(e.calculatorSlug)}</span>
                    <span className="text-slate-400"> — {e.type === "CALCULATION" ? "calc" : "view"}</span>
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {e.country && <span className="text-sm" title={e.country}>{e.flag}</span>}
                  <span className="text-[10px] text-slate-400">{timeAgo(e.createdAt)}</span>
                </div>
              </div>
            )) || (
              <div className="px-5 py-8 text-center text-slate-400 text-xs">No activity yet</div>
            )}
          </div>
        </div>
      </div>

      {/* ═══════════ BOTTOM STATS BAR ═══════════ */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Newsletter", value: kpi?.newsletterSubscribers || 0, icon: Newspaper, color: "text-pink-600 bg-pink-50" },
          { label: "Unread Messages", value: kpi?.unreadMessages || 0, icon: MessageSquare, color: "text-orange-600 bg-orange-50" },
          { label: "Blog Posts", value: kpi?.totalBlogPosts || 0, icon: FileText, color: "text-sky-600 bg-sky-50" },
          { label: "PRO Subs", value: kpi?.activeSubscriptions || 0, icon: CreditCard, color: "text-violet-600 bg-violet-50" },
        ].map((item) => (
          <div key={item.label} className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-3">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${item.color}`}>
              <item.icon className="w-4 h-4" />
            </div>
            <div>
              <p className="text-lg font-bold text-slate-900">{typeof item.value === "number" ? item.value.toLocaleString() : item.value}</p>
              <p className="text-[11px] text-slate-500">{item.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ═══════════ QUICK ACTIONS ═══════════ */}
      <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Quick Actions</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { label: "View Analytics", href: `/${locale}/admin/analytics`, icon: BarChart3 },
            { label: "Manage Users", href: `/${locale}/admin/users`, icon: Users },
            { label: "Blog Posts", href: `/${locale}/admin/blog`, icon: FileText },
            { label: "Messages", href: `/${locale}/admin/messages`, icon: MessageSquare },
          ].map(a => (
            <Link
              key={a.label}
              href={a.href}
              className="flex items-center gap-2 px-3 py-2.5 bg-white rounded-xl border border-slate-200 hover:border-blue-200 hover:bg-blue-50/30 transition-all text-sm text-slate-700 font-medium"
            >
              <a.icon className="w-4 h-4 text-slate-400" />
              {a.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

