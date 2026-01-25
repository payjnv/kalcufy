"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Stats {
  summary: {
    uniqueVisitors: number;
    uniqueVisitorsChange: number;
    pageViews: number;
    pageViewsChange: number;
    calculations: number;
    calculationsChange: number;
  };
  topCalculators: { slug: string; name: string; count: number }[];
  devices: { device: string; count: number; percentage: number }[];
  countries: { country: string; flag: string; count: number; percentage: number }[];
  dailyStats: { date: string; views: number; calculations: number; uniqueSessions: number }[];
  blog: { totalPosts: number; totalViews: number; topPost: { title: string; views: number; slug: string } | null };
  recentActivity: { calculator: string; type: string; country: string; device: string; time: string }[];
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [range, setRange] = useState<"today" | "week" | "month">("month");

  useEffect(() => {
    fetchStats();
  }, [range]);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/analytics?range=${range}`, { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
    setLoading(false);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toLocaleString();
  };

  // Smooth Area Chart
  const AreaChart = ({ data }: { data: { views: number; calculations: number }[] }) => {
    if (!data.length) return <div className="h-[280px] bg-slate-50 rounded-xl animate-pulse" />;
    
    const maxVal = Math.max(...data.map(d => d.views), 1);
    const h = 280;
    const w = 100;
    const pad = 2;
    
    const createPath = (values: number[]) => {
      return values.map((v, i) => {
        const x = pad + (i / (values.length - 1)) * (w - pad * 2);
        const y = h - pad - ((v / maxVal) * (h - pad * 2) * 0.85);
        return `${x},${y}`;
      }).join(" ");
    };

    const viewsPath = createPath(data.map(d => d.views));
    const calcsPath = createPath(data.map(d => d.calculations));
    const areaPath = `${pad},${h - pad} ${viewsPath} ${w - pad},${h - pad}`;

    return (
      <div className="relative h-[280px]">
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="areaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#2563eb" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
            </linearGradient>
          </defs>
          
          {/* Grid */}
          {[0, 1, 2, 3].map(i => (
            <line key={i} x1={pad} y1={pad + i * (h - pad * 2) / 3} x2={w - pad} y2={pad + i * (h - pad * 2) / 3} stroke="#f1f5f9" strokeWidth="0.3" />
          ))}
          
          {/* Area */}
          <polygon fill="url(#areaGrad)" points={areaPath} />
          
          {/* Lines */}
          <polyline fill="none" stroke="#2563eb" strokeWidth="0.4" strokeLinecap="round" strokeLinejoin="round" points={viewsPath} />
          <polyline fill="none" stroke="#06b6d4" strokeWidth="0.4" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="1,0.5" points={calcsPath} />
        </svg>
        
        {/* Labels */}
        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-[2px] bg-blue-600 rounded-full" />
            <span className="text-xs text-slate-600">Views</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-[2px] bg-cyan-500 rounded-full opacity-70" />
            <span className="text-xs text-slate-600">Calculations</span>
          </div>
        </div>
      </div>
    );
  };

  // Metric Card
  const MetricCard = ({ 
    label, 
    value, 
    change,
    icon
  }: { 
    label: string; 
    value: string | number; 
    change?: number;
    icon: React.ReactNode;
  }) => (
    <div className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md hover:shadow-slate-100 transition-all">
      <div className="flex items-center justify-between mb-3">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white">
          {icon}
        </div>
        {change !== undefined && (
          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
            change >= 0 ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-600"
          }`}>
            {change >= 0 ? "+" : ""}{change}%
          </span>
        )}
      </div>
      <p className="text-2xl font-bold text-slate-900">{value}</p>
      <p className="text-sm text-slate-600 mt-0.5">{label}</p>
    </div>
  );

  // Progress Row
  const ProgressRow = ({ 
    rank, 
    label, 
    value, 
    maxValue, 
    showMedal = false 
  }: { 
    rank: number; 
    label: string; 
    value: number; 
    maxValue: number;
    showMedal?: boolean;
  }) => {
    const percentage = (value / maxValue) * 100;
    const medalColors = ["from-amber-400 to-amber-500", "from-slate-300 to-slate-400", "from-orange-400 to-orange-500"];
    
    return (
      <div className="flex items-center gap-3 py-3 group">
        <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
          showMedal && rank <= 3 
            ? `bg-gradient-to-br ${medalColors[rank - 1] || "from-slate-100 to-slate-200"} text-white` 
            : "bg-slate-100 text-slate-600"
        }`}>
          {rank}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-sm font-medium text-slate-700 truncate group-hover:text-blue-600 transition-colors">{label}</span>
            <span className="text-sm font-semibold text-slate-900 ml-2">{formatNumber(value)}</span>
          </div>
          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full transition-all duration-700"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      </div>
    );
  };

  if (loading && !stats) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 rounded-full border-4 border-slate-100" />
            <div className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin" />
          </div>
          <p className="text-slate-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  const conversionRate = stats && stats.summary.pageViews > 0 
    ? ((stats.summary.calculations / stats.summary.pageViews) * 100).toFixed(1) 
    : "0";

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Analytics</h1>
          <p className="text-slate-600 text-sm">Real-time insights for your calculator platform</p>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Time Range Pills */}
          <div className="inline-flex items-center bg-slate-100 rounded-lg p-1">
            {(["today", "week", "month"] as const).map((r) => (
              <button
                key={r}
                onClick={() => setRange(r)}
                className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
                  range === r 
                    ? "bg-white text-slate-900 shadow-sm" 
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {r === "today" ? "Today" : r === "week" ? "7D" : "30D"}
              </button>
            ))}
          </div>
          
          {/* Refresh */}
          <button 
            onClick={() => fetchStats()}
            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Unique Visitors"
          value={formatNumber(stats?.summary.uniqueVisitors || 0)}
          change={stats?.summary.uniqueVisitorsChange}
          icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
        />
        <MetricCard
          label="Page Views"
          value={formatNumber(stats?.summary.pageViews || 0)}
          change={stats?.summary.pageViewsChange}
          icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>}
        />
        <MetricCard
          label="Calculations"
          value={formatNumber(stats?.summary.calculations || 0)}
          change={stats?.summary.calculationsChange}
          icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>}
        />
        <MetricCard
          label="Conversion Rate"
          value={`${conversionRate}%`}
          icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>}
        />
      </div>

      {/* Chart + Sources */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Traffic Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-semibold text-slate-900">Traffic Overview</h2>
              <p className="text-sm text-slate-600">Views and calculations over time</p>
            </div>
          </div>
          <AreaChart data={stats?.dailyStats || []} />
        </div>

        {/* Sources */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="font-semibold text-slate-900 mb-1">Traffic Sources</h2>
          <p className="text-sm text-slate-600 mb-4">Where visitors come from</p>
          
          <div className="space-y-4">
            {[
              { source: "Google Search", percentage: 54, color: "#2563eb" },
              { source: "Direct", percentage: 28, color: "#06b6d4" },
              { source: "Social", percentage: 12, color: "#8b5cf6" },
              { source: "Referral", percentage: 6, color: "#f59e0b" },
            ].map((item) => (
              <div key={item.source}>
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <span className="text-slate-600">{item.source}</span>
                  <span className="font-semibold text-slate-900">{item.percentage}%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${item.percentage}%`, backgroundColor: item.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Calculators + Sidebar */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Top Calculators */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-slate-900">Top Calculators</h2>
              <p className="text-sm text-slate-600">Most popular by usage</p>
            </div>
            <Link href="/en/calculators" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              View all →
            </Link>
          </div>
          <div className="px-6 py-2 divide-y divide-slate-100">
            {stats?.topCalculators.slice(0, 8).map((calc, i) => (
              <ProgressRow
                key={calc.slug}
                rank={i + 1}
                label={calc.name}
                value={calc.count}
                maxValue={stats.topCalculators[0]?.count || 1}
                showMedal
              />
            ))}
            {!stats?.topCalculators.length && (
              <p className="py-8 text-center text-slate-600 text-sm">No data available</p>
            )}
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Devices */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="font-semibold text-slate-900 mb-4">Devices</h2>
            <div className="space-y-3">
              {(stats?.devices.length ? stats.devices : [{ device: "desktop", percentage: 100, count: 0 }]).map((d) => {
                const icons: Record<string, React.ReactNode> = {
                  desktop: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
                  mobile: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>,
                  tablet: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>,
                };
                return (
                  <div key={d.device} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400">{icons[d.device] || icons.desktop}</span>
                      <span className="text-sm text-slate-600 capitalize">{d.device}</span>
                    </div>
                    <span className="text-sm font-semibold text-slate-900">{d.percentage}%</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Countries */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="font-semibold text-slate-900 mb-4">Top Countries</h2>
            {stats?.countries.length ? (
              <div className="space-y-3">
                {stats.countries.slice(0, 5).map((c) => (
                  <div key={c.country} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{c.flag}</span>
                      <span className="text-sm text-slate-600">{c.country}</span>
                    </div>
                    <span className="text-sm font-semibold text-slate-900">{c.percentage}%</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-2">
                  <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                  </svg>
                </div>
                <p className="text-sm text-slate-600">No location data yet</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <h2 className="font-semibold">Live Activity</h2>
            </div>
            <span className="text-xs text-slate-400">Last 24h</span>
          </div>
          
          <div className="space-y-3">
            {stats?.recentActivity.slice(0, 5).map((activity, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-white/10 last:border-0">
                <div className="flex items-center gap-3">
                  <span className="text-lg">{activity.country}</span>
                  <div>
                    <p className="text-sm text-white/90">{activity.calculator}</p>
                    <p className="text-xs text-white/50 capitalize">{activity.type.toLowerCase()}</p>
                  </div>
                </div>
                <span className="text-xs text-white/40">{activity.time}</span>
              </div>
            )) || (
              <p className="text-center text-white/50 py-4">No recent activity</p>
            )}
          </div>
        </div>

        {/* Blog Performance */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold text-slate-900">Blog Performance</h2>
            <Link href="/en/admin/blog" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              Manage →
            </Link>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-100">
              <p className="text-2xl font-bold text-slate-900">{stats?.blog.totalPosts || 0}</p>
              <p className="text-sm text-slate-600">Published</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-100">
              <p className="text-2xl font-bold text-slate-900">{formatNumber(stats?.blog.totalViews || 0)}</p>
              <p className="text-sm text-slate-600">Total Views</p>
            </div>
          </div>
          
          {stats?.blog.topPost && (
            <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl p-4 text-white">
              <div className="flex items-center gap-1.5 mb-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-xs font-medium text-white/80">TOP POST</span>
              </div>
              <p className="font-medium line-clamp-1">{stats.blog.topPost.title}</p>
              <p className="text-sm text-white/70 mt-0.5">{stats.blog.topPost.views} views</p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="font-semibold text-slate-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { href: "/en/admin/blog/new", icon: "✏️", label: "New Post" },
            { href: "/en/admin/blog", icon: "📝", label: "All Posts" },
            { href: "/en/admin/blog/categories", icon: "🏷️", label: "Categories" },
            { href: "/en/admin/users", icon: "👥", label: "Users" },
            { href: "/en/calculators", icon: "🧮", label: "Calculators" },
            { href: "/en/admin/settings", icon: "⚙️", label: "Settings" },
          ].map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="flex flex-col items-center gap-2 p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 transition-all group"
            >
              <span className="text-2xl group-hover:scale-110 transition-transform">{action.icon}</span>
              <span className="text-sm font-medium text-slate-600 group-hover:text-blue-600">{action.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
