"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Eye, Calculator, Users, Globe, Monitor, Smartphone, Tablet,
  TrendingUp, Activity, Clock, RefreshCw, ArrowUpRight, ArrowDownRight,
  Zap, FileText, BarChart3, Languages, ChevronRight, Target, UserPlus,
  Flame, Mail, DollarSign, Crown, ExternalLink, Lightbulb, AlertTriangle,
  Timer, Star, MessageSquare, Newspaper, CreditCard, Wifi, WifiOff,
  LayoutGrid, MapPin,
} from "lucide-react";

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

type TabId = "overview" | "realtime" | "geographic" | "calculators" | "audience" | "insights";
type RangeId = "today" | "7d" | "30d" | "90d" | "365d";

function ChangeBadge({ value }: { value: number }) {
  if (value === 0) return null;
  const up = value > 0;
  return (
    <span className={`inline-flex items-center gap-0.5 text-[11px] font-semibold px-1.5 py-0.5 rounded-full ${up ? "text-emerald-700 bg-emerald-50" : "text-red-600 bg-red-50"}`}>
      {up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
      {Math.abs(value).toFixed(1)}%
    </span>
  );
}

function AreaChart({ data, mode }: { data: { date: string; views: number; calcs: number }[]; mode: "views" | "calcs" }) {
  if (!data.length) return (<div className="h-[220px] flex items-center justify-center text-slate-300"><div className="text-center"><BarChart3 className="w-10 h-10 mx-auto mb-1 opacity-40" /><p className="text-xs">Waiting for data...</p></div></div>);
  const vals = data.map(d => mode === "views" ? d.views : d.calcs);
  const maxV = Math.max(...vals, 1);
  const W = 680, H = 200, PX = 40, PY = 15, cW = W - PX * 2, cH = H - PY * 2;
  const pts = vals.map((v, i) => ({ x: PX + (i / Math.max(vals.length - 1, 1)) * cW, y: PY + cH - (v / maxV) * cH }));
  const line = pts.map((p, i) => { if (i === 0) return `M ${p.x} ${p.y}`; const prev = pts[i-1]; const cpx = (prev.x + p.x) / 2; return `C ${cpx} ${prev.y} ${cpx} ${p.y} ${p.x} ${p.y}`; }).join(" ");
  const area = `${line} L ${pts[pts.length-1].x} ${H-PY} L ${pts[0].x} ${H-PY} Z`;
  const yLabels = [0, 0.5, 1].map(pct => ({ val: Math.round(maxV * pct), y: PY + cH - pct * cH }));
  const step = Math.max(1, Math.floor(data.length / 6));
  const xLabels = data.filter((_, i) => i % step === 0).map(d => ({ label: d.date, x: PX + (data.indexOf(d) / Math.max(data.length - 1, 1)) * cW }));
  const c = mode === "views" ? "#3b82f6" : "#10b981";
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-[220px]">
      <defs><linearGradient id={`da-${mode}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={c} stopOpacity="0.2" /><stop offset="100%" stopColor={c} stopOpacity="0.01" /></linearGradient></defs>
      {yLabels.map((yl, i) => (<g key={i}><line x1={PX} y1={yl.y} x2={W-PX} y2={yl.y} stroke="#f1f5f9" strokeWidth="1" /><text x={PX-6} y={yl.y+3} textAnchor="end" fill="#94a3b8" fontSize="10">{fmt(yl.val)}</text></g>))}
      <path d={area} fill={`url(#da-${mode})`} /><path d={line} fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" />
      {pts.map((p, i) => (<circle key={i} cx={p.x} cy={p.y} r="2.5" fill="white" stroke={c} strokeWidth="1.5"><title>{`${data[i].date}: ${vals[i]}`}</title></circle>))}
      {xLabels.map((xl, i) => (<text key={i} x={xl.x} y={H-1} textAnchor="middle" fill="#94a3b8" fontSize="9">{xl.label}</text>))}
    </svg>
  );
}

function HourlyBars({ data }: { data: number[][] }) {
  const hours = Array.from({ length: 24 }, (_, i) => !data?.length ? 0 : data.reduce((s, day) => s + (day[i] || 0), 0));
  const maxH = Math.max(...hours, 1);
  return (<div className="flex items-end gap-[3px] h-16">{hours.map((h, i) => (<div key={i} className={`flex-1 rounded-t transition-all ${h > 0 ? "bg-blue-300 hover:bg-blue-400" : "bg-slate-100"}`} style={{ height: `${Math.max((h / maxH) * 100, 4)}%` }} title={`${i}:00 — ${h}`} />))}</div>);
}

function Heatmap({ data }: { data: number[][] }) {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const max = Math.max(...data.flat(), 1);
  return (
    <div className="overflow-x-auto"><div className="min-w-[500px]">
      <div className="flex gap-[2px] mb-[2px] ml-8">{Array.from({ length: 24 }, (_, i) => (<div key={i} className="flex-1 text-[8px] text-slate-300 text-center font-mono">{i % 4 === 0 ? `${i}` : ""}</div>))}</div>
      {data.map((row, di) => (<div key={di} className="flex items-center gap-[2px] mb-[2px]"><div className="w-7 text-[9px] text-slate-400 text-right pr-1">{days[di]}</div>
        {row.map((v, hi) => { const t = v / max; const bg = t === 0 ? "bg-slate-50" : t < 0.2 ? "bg-blue-100" : t < 0.4 ? "bg-blue-200" : t < 0.6 ? "bg-blue-400" : t < 0.8 ? "bg-blue-500" : "bg-blue-600"; return <div key={hi} className={`flex-1 aspect-square rounded-[2px] ${bg} hover:ring-1 hover:ring-blue-400 cursor-crosshair`} title={`${days[di]} ${hi}:00 — ${v}`} />; })}
      </div>))}
      <div className="flex items-center justify-end gap-1 mt-2"><span className="text-[8px] text-slate-400">Less</span>{["bg-slate-50","bg-blue-100","bg-blue-300","bg-blue-500","bg-blue-600"].map((c,i)=>(<div key={i} className={`w-2.5 h-2.5 rounded-[2px] ${c}`} />))}<span className="text-[8px] text-slate-400">More</span></div>
    </div></div>
  );
}

function DeviceDonut({ data }: { data: { device: string; count: number; pct: number }[] }) {
  const total = data.reduce((s, d) => s + d.count, 0) || 1;
  const colors: Record<string, string> = { desktop: "#10b981", mobile: "#3b82f6", tablet: "#8b5cf6" };
  let offset = 0;
  const segments = data.map(d => { const pct = d.count / total; const seg = { ...d, pctCalc: pct, offset, color: colors[d.device?.toLowerCase()] || "#94a3b8" }; offset += pct; return seg; });
  const R = 40, C = 2 * Math.PI * R;
  return (
    <div className="flex items-center gap-5">
      <svg width="100" height="100" viewBox="0 0 100 100" className="shrink-0">
        <circle cx="50" cy="50" r={R} fill="none" stroke="#f1f5f9" strokeWidth="12" />
        {segments.map((s, i) => (<circle key={i} cx="50" cy="50" r={R} fill="none" stroke={s.color} strokeWidth="12" strokeDasharray={`${s.pctCalc * C} ${C}`} strokeDashoffset={-s.offset * C} transform="rotate(-90 50 50)" strokeLinecap="round" />))}
        <text x="50" y="50" textAnchor="middle" dominantBaseline="central" fill="#0f172a" fontSize="16" fontWeight="bold">{fmt(total)}</text>
      </svg>
      <div className="space-y-2">{segments.map(s => (<div key={s.device} className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: s.color }} /><span className="text-xs text-slate-600 capitalize">{s.device}</span><span className="text-xs font-semibold text-slate-900 ml-auto">{(s.pctCalc * 100).toFixed(0)}%</span></div>))}</div>
    </div>
  );
}

function LiveDot() {
  return (<span className="relative flex h-2.5 w-2.5 ml-1"><span className="animate-ping absolute h-full w-full rounded-full bg-emerald-400 opacity-60" /><span className="relative rounded-full h-2.5 w-2.5 bg-emerald-500" /></span>);
}

export default function DeepAnalyticsPage() {
  const [tab, setTab] = useState<TabId>("overview");
  const [range, setRange] = useState<RangeId>("30d");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [chartMode, setChartMode] = useState<"views" | "calcs">("views");
  const [autoRefresh, setAutoRefresh] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "en";

  const fetchData = useCallback(async () => {
    try { setLoading(true); const res = await fetch(`/api/admin/deep-analytics?tab=${tab}&range=${range}`); if (res.ok) setData(await res.json()); } catch (e) { console.error(e); } finally { setLoading(false); }
  }, [tab, range]);

  useEffect(() => { fetchData(); }, [fetchData]);
  useEffect(() => { if (autoRefresh && tab === "realtime") intervalRef.current = setInterval(fetchData, 10000); return () => { if (intervalRef.current) clearInterval(intervalRef.current); }; }, [autoRefresh, tab, fetchData]);

  const tabs: { id: TabId; label: string; icon: any }[] = [
    { id: "overview", label: "Overview", icon: BarChart3 }, { id: "realtime", label: "Real-time", icon: Activity },
    { id: "geographic", label: "Geographic", icon: Globe }, { id: "calculators", label: "Calculators", icon: Calculator },
    { id: "audience", label: "Audience", icon: Users }, { id: "insights", label: "Insights", icon: Lightbulb },
  ];
  const ranges: { id: RangeId; label: string }[] = [
    { id: "today", label: "Today" }, { id: "7d", label: "7 days" }, { id: "30d", label: "30 days" }, { id: "90d", label: "90 days" }, { id: "365d", label: "1 year" },
  ];

  if (loading && !data) return (<div className="space-y-6 animate-pulse"><div className="h-8 w-64 bg-slate-200 rounded-lg" /><div className="grid grid-cols-4 gap-4">{[...Array(4)].map((_, i) => <div key={i} className="h-[120px] bg-slate-200 rounded-2xl" />)}</div><div className="grid grid-cols-3 gap-4"><div className="col-span-2 h-72 bg-slate-200 rounded-2xl" /><div className="h-72 bg-slate-200 rounded-2xl" /></div></div>);

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center"><BarChart3 className="w-4 h-4 text-white" /></div>
            Deep Analytics {tab === "realtime" && <LiveDot />}
          </h1>
          <p className="text-slate-500 text-sm mt-0.5">Advanced analytics &amp; insights for Kalcufy.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex bg-slate-100 rounded-lg p-0.5">{ranges.map(r => (<button key={r.id} onClick={() => setRange(r.id)} className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${range === r.id ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"}`}>{r.label}</button>))}</div>
          {tab === "realtime" && (<button onClick={() => setAutoRefresh(!autoRefresh)} className={`flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium border rounded-lg transition-all ${autoRefresh ? "bg-emerald-50 border-emerald-200 text-emerald-600" : "bg-white border-slate-200 text-slate-400"}`}>{autoRefresh ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}{autoRefresh ? "Live" : "Paused"}</button>)}
          <button onClick={fetchData} disabled={loading} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-700 bg-white border border-slate-200 rounded-lg hover:border-slate-300 transition-all"><RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />Refresh</button>
          <span className="text-[10px] text-slate-400 bg-slate-50 px-2 py-1 rounded-full">Auto-refresh 60s</span>
        </div>
      </div>

      {/* TABS */}
      <div className="flex gap-1 border-b border-slate-200 -mt-2">
        {tabs.map(t => (<button key={t.id} onClick={() => { setTab(t.id); setData(null); }} className={`flex items-center gap-1.5 px-3 py-2.5 text-xs font-medium border-b-2 -mb-px transition-all ${tab === t.id ? "border-blue-500 text-blue-600" : "border-transparent text-slate-400 hover:text-slate-600"}`}><t.icon className="w-3.5 h-3.5" />{t.label}</button>))}
      </div>

      {/* ═══ OVERVIEW ═══ */}
      {tab === "overview" && data && (<>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: Eye, label: "Page Views", value: data.stats?.totalViews || 0, change: data.stats?.viewsChange, color: "bg-blue-50 text-blue-600", sub: `${data.stats?.todayViews || 0} today · ${data.stats?.totalAllTime || 0} all-time` },
            { icon: Calculator, label: "Calculations", value: data.stats?.totalCalcs || 0, change: data.stats?.calcsChange, color: "bg-emerald-50 text-emerald-600", sub: `${data.stats?.todayCalcs || 0} today` },
            { icon: Users, label: "Sessions", value: data.stats?.uniqueSessions || 0, change: data.stats?.sessionsChange, color: "bg-purple-50 text-purple-600" },
            { icon: DollarSign, label: "Revenue", value: "$0.00", color: "bg-amber-50 text-amber-600", sub: "0 subscriptions × $2.99/mo" },
          ].map((kpi, i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-md hover:border-slate-300 transition-all group">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform ${kpi.color}`}><kpi.icon className="w-[18px] h-[18px]" /></div>
                  <span className="text-xs font-medium text-slate-500">{kpi.label}</span>
                </div>
                {kpi.change !== undefined && <ChangeBadge value={kpi.change} />}
              </div>
              <p className="text-2xl font-bold text-slate-900">{typeof kpi.value === "number" ? kpi.value.toLocaleString() : kpi.value}</p>
              {kpi.sub && <p className="text-[11px] text-slate-400 mt-0.5">{kpi.sub}</p>}
            </div>
          ))}
        </div>

        {/* Chart + Pulse */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2"><Activity className="w-4 h-4 text-blue-500" />Daily Trend</h3>
              <div className="flex bg-slate-100 rounded-lg p-0.5">{(["views","calcs"] as const).map(m => (<button key={m} onClick={() => setChartMode(m)} className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${chartMode === m ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"}`}>{m === "views" ? "Views" : "Calculations"}</button>))}</div>
            </div>
            <div className="p-4"><AreaChart data={data.dailyTrend || []} mode={chartMode} /></div>
          </div>
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200 p-5">
              <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2 mb-3"><Flame className="w-4 h-4 text-orange-500" />Traffic Pulse</h3>
              <HourlyBars data={data.heatmap || []} />
              <div className="flex justify-between mt-2"><span className="text-[10px] text-slate-400">12am</span><span className="text-[10px] text-slate-400">12pm</span><span className="text-[10px] text-slate-400">11pm</span></div>
              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="bg-blue-50/60 rounded-xl p-3 text-center"><p className="text-lg font-bold text-blue-700">{data.stats?.todayViews || 0}</p><p className="text-[10px] text-blue-500 font-medium">Views today</p></div>
                <div className="bg-emerald-50/60 rounded-xl p-3 text-center"><p className="text-lg font-bold text-emerald-700">{data.stats?.todayCalcs || 0}</p><p className="text-[10px] text-emerald-500 font-medium">Calcs today</p></div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-5 text-white">
              <div className="flex items-center gap-2 mb-2"><Target className="w-4 h-4 text-cyan-400" /><span className="text-xs font-medium text-slate-300">Conversion Rate</span></div>
              <p className="text-3xl font-bold">{data.stats?.conversionRate || 0}%</p>
              <p className="text-[11px] text-slate-400 mt-1">Views → Calculations</p>
              <div className="w-full bg-slate-700 rounded-full h-1.5 mt-3"><div className="bg-gradient-to-r from-cyan-400 to-blue-400 h-1.5 rounded-full" style={{ width: `${Math.min(data.stats?.conversionRate || 0, 100)}%` }} /></div>
            </div>
          </div>
        </div>

        {/* Heatmap + Referrers */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100"><h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2"><LayoutGrid className="w-4 h-4 text-violet-500" />Traffic Heatmap<span className="text-[10px] text-slate-400 font-normal ml-1">Day × Hour</span></h3></div>
            <div className="p-5">{data.heatmap ? <Heatmap data={data.heatmap} /> : <div className="py-8 text-center text-slate-300"><BarChart3 className="w-8 h-8 mx-auto mb-1 opacity-30" /><p className="text-xs">No heatmap data yet</p></div>}</div>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100"><h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2"><ExternalLink className="w-4 h-4 text-cyan-500" />Top Referrers</h3></div>
            <div className="p-4 space-y-2.5">
              {(data.referrers || []).slice(0, 8).map((r: any, i: number) => { const mx = Math.max(...(data.referrers || []).map((x: any) => x.count), 1); return (<div key={i} className="flex items-center gap-2.5"><span className="text-xs font-medium text-slate-700 w-28 truncate">{r.source}</span><div className="flex-1 bg-slate-100 rounded-full h-1"><div className="bg-cyan-400 h-1 rounded-full" style={{ width: `${(r.count / mx) * 100}%` }} /></div><span className="text-[10px] text-slate-400 w-8 text-right">{r.count}</span></div>); })}
              {(!data.referrers?.length) && <div className="text-center py-6 text-slate-400"><ExternalLink className="w-8 h-8 mx-auto mb-1 opacity-30" /><p className="text-xs">Appears after deploy</p></div>}
            </div>
          </div>
        </div>

        {/* Browsers + OS + Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100"><h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2"><Monitor className="w-4 h-4 text-blue-500" />Browsers</h3></div>
            <div className="p-4 space-y-3">
              {(data.browsers || []).length ? data.browsers.map((b: any, i: number) => (<div key={i} className="flex items-center gap-2.5"><div className="flex-1"><div className="flex justify-between mb-0.5"><span className="text-xs font-medium text-slate-700">{b.name}</span><span className="text-[10px] text-slate-400">{b.count} ({b.pct}%)</span></div><div className="w-full bg-slate-100 rounded-full h-1"><div className="bg-blue-400 h-1 rounded-full" style={{ width: `${b.pct}%` }} /></div></div></div>)) : <div className="text-center py-6 text-slate-400"><Monitor className="w-8 h-8 mx-auto mb-1 opacity-30" /><p className="text-xs">No browser data</p></div>}
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100"><h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2"><Smartphone className="w-4 h-4 text-emerald-500" />Operating Systems</h3></div>
            <div className="p-4 space-y-3">
              {(data.operatingSystems || []).length ? data.operatingSystems.map((o: any, i: number) => (<div key={i} className="flex items-center gap-2.5"><div className="flex-1"><div className="flex justify-between mb-0.5"><span className="text-xs font-medium text-slate-700">{o.name}</span><span className="text-[10px] text-slate-400">{o.count} ({o.pct}%)</span></div><div className="w-full bg-slate-100 rounded-full h-1"><div className="bg-emerald-400 h-1 rounded-full" style={{ width: `${o.pct}%` }} /></div></div></div>)) : <div className="text-center py-6 text-slate-400"><Smartphone className="w-8 h-8 mx-auto mb-1 opacity-30" /><p className="text-xs">No OS data</p></div>}
            </div>
          </div>
          <div className="space-y-4">
            {[
              { label: "Avg. Duration", value: data.stats?.avgDuration || "0:00", icon: Timer, color: "text-orange-600 bg-orange-50" },
              { label: "Bounce Rate", value: `${data.stats?.bounceRate || 0}%`, icon: ArrowDownRight, color: "text-red-600 bg-red-50" },
              { label: "Active Countries", value: data.bottom?.activeCountries || 0, icon: Globe, color: "text-sky-600 bg-sky-50" },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${item.color}`}><item.icon className="w-4 h-4" /></div>
                <div><p className="text-lg font-bold text-slate-900">{typeof item.value === "number" ? item.value.toLocaleString() : item.value}</p><p className="text-[11px] text-slate-500">{item.label}</p></div>
              </div>
            ))}
          </div>
        </div>
      </>)}

      {/* ═══ REALTIME ═══ */}
      {tab === "realtime" && data && (<>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: Zap, label: "Active Now (5min)", value: data.activeNow || 0, color: "bg-emerald-50 text-emerald-600" },
            { icon: Eye, label: "Views (1h)", value: data.lastHourViews || 0, color: "bg-blue-50 text-blue-600" },
            { icon: Calculator, label: "Calcs (1h)", value: data.lastHourCalcs || 0, color: "bg-purple-50 text-purple-600" },
          ].map((kpi, i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-md transition-all group">
              <div className="flex items-center gap-2 mb-3"><div className={`w-9 h-9 rounded-xl flex items-center justify-center ${kpi.color}`}><kpi.icon className="w-[18px] h-[18px]" /></div><span className="text-xs font-medium text-slate-500">{kpi.label}</span></div>
              <p className="text-2xl font-bold text-slate-900">{kpi.value.toLocaleString()}</p>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-2"><Activity className="w-4 h-4 text-emerald-500" /><h3 className="text-sm font-semibold text-slate-900">Last 60 Minutes</h3><LiveDot /></div>
          <div className="p-5"><div className="flex items-end gap-[2px] h-28">{(data.minuteTrend || []).map((m: any, i: number) => { const mx = Math.max(...(data.minuteTrend || []).map((x: any) => x.count), 1); return (<div key={i} className="flex-1 bg-emerald-300 hover:bg-emerald-400 rounded-t transition-all cursor-pointer" style={{ height: `${Math.max((m.count / mx) * 100, m.count ? 3 : 0)}%` }} title={`${m.time}: ${m.count}`} />); })}</div></div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-2"><Activity className="w-4 h-4 text-slate-500" /><h3 className="text-sm font-semibold text-slate-900">Live Feed</h3></div>
          <div className="divide-y divide-slate-50 max-h-[500px] overflow-y-auto">
            {(data.recentEvents || []).map((e: any, i: number) => (
              <div key={i} className="px-5 py-2.5 flex items-center gap-3 hover:bg-slate-50/50 transition-colors">
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${e.type === "CALCULATION" ? "bg-emerald-100 text-emerald-600" : "bg-blue-100 text-blue-600"}`}>{e.type === "CALCULATION" ? <Calculator className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}</div>
                <div className="flex-1 min-w-0"><p className="text-xs text-slate-700"><span className="font-medium">{slugToName(e.calculatorSlug)}</span><span className="text-slate-400"> — {e.type === "CALCULATION" ? "calc" : "view"}</span></p></div>
                <span className="text-slate-400 text-xs hidden sm:inline">{e.location || e.flag}</span>
                {e.browser && <span className="text-[10px] text-slate-300 hidden md:inline">{e.browser}</span>}
                <span className="text-[10px] text-slate-400 shrink-0">{timeAgo(e.createdAt)}</span>
              </div>
            ))}
            {(!data.recentEvents?.length) && <div className="px-5 py-8 text-center text-slate-400 text-xs">No events in the last hour</div>}
          </div>
        </div>
      </>)}

      {/* ═══ GEOGRAPHIC ═══ */}
      {tab === "geographic" && data && (<>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100"><h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2"><Globe className="w-4 h-4 text-purple-500" />Top Countries</h3></div>
            <div className="p-4 space-y-2 max-h-[400px] overflow-y-auto">
              {(data.countries || []).length ? data.countries.map((c: any, i: number) => (<div key={i} className="flex items-center gap-2.5"><span className="text-base shrink-0">{c.flag}</span><div className="flex-1 min-w-0"><div className="flex justify-between mb-0.5"><span className="text-xs font-medium text-slate-700 truncate">{c.country}</span><span className="text-[10px] text-slate-400 ml-1">{c.count} ({c.pct}%)</span></div><div className="w-full bg-slate-100 rounded-full h-1"><div className="bg-purple-400 h-1 rounded-full" style={{ width: `${c.pct}%` }} /></div></div></div>)) : <div className="text-center py-6 text-slate-400"><Globe className="w-8 h-8 mx-auto mb-1 opacity-30" /><p className="text-xs">No country data</p></div>}
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100"><h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2"><Monitor className="w-4 h-4 text-emerald-500" />Devices</h3></div>
            <div className="p-5 flex items-center justify-center min-h-[160px]">
              {(data.devices || []).length ? <DeviceDonut data={data.devices} /> : <div className="text-center text-slate-400"><Monitor className="w-8 h-8 mx-auto mb-1 opacity-30" /><p className="text-xs">No device data</p></div>}
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100"><h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2"><Languages className="w-4 h-4 text-amber-500" />Languages</h3></div>
            <div className="p-4 space-y-3">
              {(data.languages || []).length ? data.languages.map((l: any, i: number) => (<div key={i} className="flex items-center gap-2.5"><span className="text-base shrink-0">{l.flag}</span><div className="flex-1"><div className="flex justify-between mb-0.5"><span className="text-xs font-medium text-slate-700">{l.name}</span><span className="text-[10px] text-slate-400">{l.count} ({l.pct}%)</span></div><div className="w-full bg-slate-100 rounded-full h-1"><div className="bg-amber-400 h-1 rounded-full" style={{ width: `${l.pct}%` }} /></div></div></div>)) : <div className="text-center py-6 text-slate-400"><Languages className="w-8 h-8 mx-auto mb-1 opacity-30" /><p className="text-xs">No language data</p></div>}
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100"><h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2"><MapPin className="w-4 h-4 text-rose-500" />Top Cities</h3></div>
          <div className="overflow-x-auto"><table className="w-full"><thead><tr className="bg-slate-50/60"><th className="text-left px-5 py-2.5 text-[10px] font-semibold text-slate-400 uppercase tracking-wider w-8">#</th><th className="text-left px-5 py-2.5 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">City</th><th className="text-left px-5 py-2.5 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Country</th><th className="text-right px-5 py-2.5 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Events</th></tr></thead>
            <tbody className="divide-y divide-slate-50">{(data.cities || []).slice(0, 15).map((c: any, i: number) => (<tr key={i} className="hover:bg-slate-50/50 transition-colors"><td className="px-5 py-2.5 text-xs text-slate-400">{i+1}</td><td className="px-5 py-2.5 text-sm font-medium text-slate-900">{c.city}</td><td className="px-5 py-2.5 text-xs text-slate-500">{c.flag} {c.country}</td><td className="px-5 py-2.5 text-right text-sm font-semibold text-slate-700">{c.count}</td></tr>))}
              {(!data.cities?.length) && <tr><td colSpan={4} className="px-5 py-10 text-center text-sm text-slate-400">City data appears after deploy</td></tr>}
            </tbody></table></div>
        </div>
      </>)}

      {/* ═══ CALCULATORS ═══ */}
      {tab === "calculators" && data && (<>
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between"><h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2"><TrendingUp className="w-4 h-4 text-emerald-500" />Calculator Performance<span className="text-[10px] text-slate-400 font-normal ml-1">Top 30</span></h3></div>
          <div className="overflow-x-auto"><table className="w-full"><thead><tr className="bg-slate-50/60"><th className="text-left px-5 py-2.5 text-[10px] font-semibold text-slate-400 uppercase tracking-wider w-8">#</th><th className="text-left px-5 py-2.5 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Calculator</th><th className="text-right px-5 py-2.5 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Views</th><th className="text-right px-5 py-2.5 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Calcs</th><th className="text-right px-5 py-2.5 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Conv.</th><th className="text-right px-5 py-2.5 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Avg Time</th><th className="px-5 py-2.5 w-28"></th></tr></thead>
            <tbody className="divide-y divide-slate-50">
              {(data.calculators || []).map((c: any, i: number) => { const maxV = data.calculators[0]?.views || 1; return (<tr key={i} className="hover:bg-slate-50/50 transition-colors"><td className="px-5 py-2.5 text-xs text-slate-400 font-medium">{i+1}</td><td className="px-5 py-2.5"><p className="text-sm font-medium text-slate-900">{slugToName(c.slug)}</p></td><td className="px-5 py-2.5 text-right text-sm font-semibold text-slate-700">{c.views.toLocaleString()}</td><td className="px-5 py-2.5 text-right text-sm text-slate-600">{c.calcs.toLocaleString()}</td><td className="px-5 py-2.5 text-right"><span className={`text-xs font-semibold px-1.5 py-0.5 rounded-full ${c.conversionRate >= 50 ? "bg-emerald-50 text-emerald-700" : c.conversionRate >= 25 ? "bg-amber-50 text-amber-700" : "bg-slate-50 text-slate-600"}`}>{c.conversionRate}%</span></td><td className="px-5 py-2.5 text-right text-xs text-slate-500">{c.avgDuration}</td><td className="px-5 py-2.5"><div className="w-full bg-slate-100 rounded-full h-1.5"><div className="bg-blue-400 h-1.5 rounded-full" style={{ width: `${(c.views / maxV) * 100}%` }} /></div></td></tr>); })}
              {(!data.calculators?.length) && <tr><td colSpan={7} className="px-5 py-10 text-center text-sm text-slate-400">No calculator data yet</td></tr>}
            </tbody></table></div>
        </div>
      </>)}

      {/* ═══ AUDIENCE ═══ */}
      {tab === "audience" && data && (<>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: Users, label: "Total Users", value: data.totalUsers || 0, color: "bg-blue-50 text-blue-600" },
            { icon: Crown, label: "PRO Users", value: data.proUsers || 0, color: "bg-amber-50 text-amber-600" },
            { icon: UserPlus, label: "New Users", value: data.newUsers || 0, change: data.newUsersChange, color: "bg-emerald-50 text-emerald-600" },
            { icon: DollarSign, label: "Monthly Revenue", value: `$${data.monthlyRevenue || 0}`, color: "bg-purple-50 text-purple-600" },
          ].map((kpi, i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-md transition-all group">
              <div className="flex items-center justify-between mb-3"><div className="flex items-center gap-2"><div className={`w-9 h-9 rounded-xl flex items-center justify-center ${kpi.color}`}><kpi.icon className="w-[18px] h-[18px]" /></div><span className="text-xs font-medium text-slate-500">{kpi.label}</span></div>{kpi.change !== undefined && <ChangeBadge value={kpi.change} />}</div>
              <p className="text-2xl font-bold text-slate-900">{typeof kpi.value === "number" ? kpi.value.toLocaleString() : kpi.value}</p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between"><h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2"><UserPlus className="w-4 h-4 text-purple-500" />Recent Users</h3><Link href={`/${locale}/admin/users`} className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-0.5">View all <ChevronRight className="w-3 h-3" /></Link></div>
            <div className="divide-y divide-slate-50">
              {(data.recentUsers || []).slice(0, 5).map((u: any) => (<div key={u.id} className="px-5 py-3 flex items-center gap-3 hover:bg-slate-50/50 transition-colors"><div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-xs font-bold shrink-0">{(u.name || u.email || "?").substring(0, 2).toUpperCase()}</div><div className="flex-1 min-w-0"><p className="text-sm font-medium text-slate-900 truncate">{u.name || "No name"}</p><p className="text-[11px] text-slate-400 truncate">{u.email}</p></div><span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${u.isPro ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-500"}`}>{u.isPro ? "PRO" : "FREE"}</span><span className="text-[10px] text-slate-400">{timeAgo(u.createdAt)}</span></div>))}
              {(!data.recentUsers?.length) && <div className="px-5 py-8 text-center text-slate-400 text-xs">No users yet</div>}
            </div>
          </div>
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-100"><h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2"><Mail className="w-4 h-4 text-pink-500" />Newsletter ({data.totalSubscribers || 0})</h3></div>
              <div className="p-4 space-y-3">{(data.subscribersByLang || []).map((s: any, i: number) => (<div key={i} className="flex items-center gap-2.5"><span className="text-base shrink-0">{s.flag}</span><div className="flex-1"><div className="flex justify-between mb-0.5"><span className="text-xs font-medium text-slate-700">{s.name}</span><span className="text-[10px] text-slate-400">{s.count}</span></div><div className="w-full bg-slate-100 rounded-full h-1"><div className="bg-pink-400 h-1 rounded-full" style={{ width: `${(s.count / Math.max(data.totalSubscribers, 1)) * 100}%` }} /></div></div></div>))}</div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[{ label: "Blog Posts", value: data.blog?.totalPosts || 0, icon: FileText, color: "text-sky-600 bg-sky-50" }, { label: "Blog Views", value: (data.blog?.totalViews || 0).toLocaleString(), icon: Eye, color: "text-violet-600 bg-violet-50" }].map((item, i) => (
                <div key={i} className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-3"><div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${item.color}`}><item.icon className="w-4 h-4" /></div><div><p className="text-lg font-bold text-slate-900">{item.value}</p><p className="text-[11px] text-slate-500">{item.label}</p></div></div>
              ))}
            </div>
          </div>
        </div>
      </>)}

      {/* ═══ INSIGHTS ═══ */}
      {tab === "insights" && data && (<>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100"><h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2"><ExternalLink className="w-4 h-4 text-cyan-500" />Traffic Sources</h3></div>
            <div className="p-4 space-y-2.5">
              {(data.referrers || []).slice(0, 10).map((r: any, i: number) => { const mx = Math.max(...(data.referrers || []).map((x: any) => x.count), 1); const ic = r.source.includes("google") ? "🔍" : r.source.includes("twitter") || r.source.includes("x.com") ? "𝕏" : r.source.includes("reddit") ? "🤖" : "🌐"; return (<div key={i} className="flex items-center gap-2.5"><span className="text-sm w-5 text-center">{ic}</span><span className="text-xs font-medium text-slate-700 flex-1 truncate">{r.source}</span><div className="w-24 bg-slate-100 rounded-full h-1"><div className="bg-cyan-400 h-1 rounded-full" style={{ width: `${(r.count / mx) * 100}%` }} /></div><span className="text-[10px] text-slate-400 w-8 text-right">{r.count}</span></div>); })}
              {(!data.referrers?.length) && <div className="text-center py-6 text-slate-400"><ExternalLink className="w-8 h-8 mx-auto mb-1 opacity-30" /><p className="text-xs">Appears after deploy</p></div>}
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100"><h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2"><TrendingUp className="w-4 h-4 text-emerald-500" />Weekly Growth (90d)</h3></div>
            <div className="p-5"><div className="flex items-end gap-2 h-32">{(data.growthTrend || []).map((w: any, i: number) => { const mx = Math.max(...(data.growthTrend || []).map((x: any) => x.views), 1); return (<div key={i} className="flex-1 bg-emerald-300 hover:bg-emerald-400 rounded-t transition-all cursor-pointer" style={{ height: `${Math.max((w.views / mx) * 100, 3)}%` }} title={`${w.week}: ${w.views} views`} />); })}</div></div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100"><h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2"><Star className="w-4 h-4 text-emerald-500" />Top Converting</h3></div>
            <div className="divide-y divide-slate-50">{(data.topConverting || []).slice(0, 8).map((c: any, i: number) => (<div key={i} className="px-5 py-2.5 flex items-center gap-3 hover:bg-slate-50/50"><span className="text-xs text-slate-400 w-4">{i+1}</span><span className="text-sm font-medium text-slate-900 flex-1 truncate">{slugToName(c.slug)}</span><span className="text-xs font-semibold px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700">{c.rate}%</span><span className="text-[10px] text-slate-400">{c.views}v</span></div>))}{(!data.topConverting?.length) && <div className="px-5 py-8 text-center text-slate-400 text-xs">No data yet</div>}</div>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100"><h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-amber-500" />Needs Improvement</h3></div>
            <div className="divide-y divide-slate-50">{(data.lowConverting || []).slice(0, 8).map((c: any, i: number) => (<div key={i} className="px-5 py-2.5 flex items-center gap-3 hover:bg-slate-50/50"><span className="text-xs text-slate-400 w-4">{i+1}</span><span className="text-sm font-medium text-slate-900 flex-1 truncate">{slugToName(c.slug)}</span><span className="text-xs font-semibold px-1.5 py-0.5 rounded-full bg-amber-50 text-amber-700">{c.rate}%</span><span className="text-[10px] text-slate-400">{c.views}v</span></div>))}{(!data.lowConverting?.length) && <div className="px-5 py-8 text-center text-slate-400 text-xs">No data yet</div>}</div>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Avg Duration", value: data.engagement?.[0]?.avgFormatted || "-", icon: Timer, color: "text-orange-600 bg-orange-50" },
            { label: "Peak Hour", value: data.peakHours?.[0]?.label || "-", icon: Clock, color: "text-amber-600 bg-amber-50" },
            { label: "Top Browser", value: data.browsers?.[0]?.name || "-", icon: Monitor, color: "text-blue-600 bg-blue-50" },
            { label: "Top OS", value: data.operatingSystems?.[0]?.name || "-", icon: Smartphone, color: "text-emerald-600 bg-emerald-50" },
          ].map((item) => (
            <div key={item.label} className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-3"><div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${item.color}`}><item.icon className="w-4 h-4" /></div><div><p className="text-lg font-bold text-slate-900">{item.value}</p><p className="text-[11px] text-slate-500">{item.label}</p></div></div>
          ))}
        </div>
      </>)}
    </div>
  );
}
