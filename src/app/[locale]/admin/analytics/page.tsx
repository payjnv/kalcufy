"use client";

import { useState, useEffect } from "react";
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Eye,
  Calculator,
  Users,
  Globe,
  Smartphone,
  Monitor,
  Tablet,
  ArrowUpRight,
  ArrowDownRight,
  Activity
} from "lucide-react";

interface AnalyticsData {
  overview: {
    totalViews: number;
    viewsChange: number;
    totalCalculations: number;
    calcsChange: number;
    conversionRate: number;
    uniqueUsers: number;
  };
  topCalculators: { slug: string; views: number; calculations: number; conversion: string }[];
  byCountry: { country: string; count: number }[];
  byDevice: { device: string; count: number }[];
  byLanguage: { language: string; count: number }[];
  dailyStats: { date: string; views: number; calculations: number }[];
  recentActivity: any[];
}

const countryFlags: Record<string, string> = {
  "US": "🇺🇸", "MX": "🇲🇽", "ES": "🇪🇸", "BR": "🇧🇷", "AR": "🇦🇷",
  "CO": "🇨🇴", "PE": "🇵🇪", "CL": "🇨🇱", "VE": "🇻🇪", "EC": "🇪🇨",
  "GB": "🇬🇧", "CA": "🇨🇦", "DE": "🇩🇪", "FR": "🇫🇷", "IT": "🇮🇹",
  "Unknown": "🌍"
};

const langNames: Record<string, string> = {
  "en": "English", "es": "Spanish", "pt": "Portuguese"
};

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState<"7d" | "30d" | "90d">("30d");

  useEffect(() => {
    fetchAnalytics();
  }, [period]);

  async function fetchAnalytics() {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/calculator-usage?period=${period}`);
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Failed to fetch analytics:", error);
    } finally {
      setLoading(false);
    }
  }

  const StatCard = ({ 
    title, 
    value, 
    change, 
    icon: Icon, 
    color 
  }: { 
    title: string; 
    value: string | number; 
    change?: number; 
    icon: any; 
    color: string;
  }) => (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="text-3xl font-bold text-slate-900 mt-2">
            {typeof value === "number" ? value.toLocaleString() : value}
          </p>
          {change !== undefined && (
            <div className={`flex items-center gap-1 mt-2 text-sm font-medium ${
              change >= 0 ? "text-emerald-600" : "text-red-600"
            }`}>
              {change >= 0 ? (
                <ArrowUpRight className="w-4 h-4" />
              ) : (
                <ArrowDownRight className="w-4 h-4" />
              )}
              <span>{Math.abs(change)}% vs last period</span>
            </div>
          )}
        </div>
        <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-slate-200 rounded w-48 mb-2"></div>
          <div className="h-4 bg-slate-200 rounded w-64"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl border border-slate-200 p-6 h-32 animate-pulse">
              <div className="h-4 bg-slate-200 rounded w-24 mb-4"></div>
              <div className="h-8 bg-slate-200 rounded w-32"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const totalDevices = data?.byDevice?.reduce((sum, d) => sum + d.count, 0) || 1;
  const totalLangs = data?.byLanguage?.reduce((sum, l) => sum + l.count, 0) || 1;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Analytics</h1>
          <p className="text-slate-600">Monitor your calculator performance and user engagement</p>
        </div>
        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-lg">
          {(["7d", "30d", "90d"] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                period === p
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {p === "7d" ? "7 Days" : p === "30d" ? "30 Days" : "90 Days"}
            </button>
          ))}
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Views"
          value={data?.overview?.totalViews || 0}
          change={data?.overview?.viewsChange}
          icon={Eye}
          color="bg-blue-500"
        />
        <StatCard
          title="Calculations"
          value={data?.overview?.totalCalculations || 0}
          change={data?.overview?.calcsChange}
          icon={Calculator}
          color="bg-emerald-500"
        />
        <StatCard
          title="Conversion Rate"
          value={`${data?.overview?.conversionRate || 0}%`}
          icon={TrendingUp}
          color="bg-purple-500"
        />
        <StatCard
          title="Unique Visitors"
          value={data?.overview?.uniqueUsers || 0}
          icon={Users}
          color="bg-amber-500"
        />
      </div>

      {/* Chart Section */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-slate-900">Traffic Overview</h2>
          <div className="flex items-center gap-4 text-sm">
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-500"></span>
              Views
            </span>
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
              Calculations
            </span>
          </div>
        </div>
        
        {/* Simple Bar Chart */}
        <div className="h-64 flex items-end gap-1">
          {data?.dailyStats?.slice(-30).map((day, i) => {
            const maxViews = Math.max(...(data.dailyStats?.map(d => d.views) || [1]));
            const viewHeight = (day.views / maxViews) * 100;
            const calcHeight = (day.calculations / maxViews) * 100;
            
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-1 group relative">
                <div 
                  className="w-full bg-blue-500 rounded-t-sm transition-all group-hover:bg-blue-600"
                  style={{ height: `${viewHeight}%`, minHeight: day.views > 0 ? "4px" : "0" }}
                />
                <div 
                  className="w-full bg-emerald-500 rounded-t-sm transition-all group-hover:bg-emerald-600"
                  style={{ height: `${calcHeight}%`, minHeight: day.calculations > 0 ? "4px" : "0" }}
                />
                {/* Tooltip */}
                <div className="absolute bottom-full mb-2 hidden group-hover:block bg-slate-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10">
                  {new Date(day.date).toLocaleDateString()}: {day.views} views, {day.calculations} calcs
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex justify-between mt-2 text-xs text-slate-400">
          <span>{data?.dailyStats?.[0]?.date ? new Date(data.dailyStats[0].date).toLocaleDateString() : ""}</span>
          <span>{data?.dailyStats?.[data.dailyStats.length - 1]?.date ? new Date(data.dailyStats[data.dailyStats.length - 1].date).toLocaleDateString() : ""}</span>
        </div>
      </div>

      {/* Top Calculators */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">Top Performing Calculators</h2>
          <span className="text-sm text-slate-500">{data?.topCalculators?.length || 0} calculators</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Rank</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Calculator</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Views</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Calculations</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Conversion</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Performance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data?.topCalculators?.map((calc, index) => {
                const maxViews = Math.max(...(data.topCalculators?.map(c => c.views) || [1]));
                const barWidth = (calc.views / maxViews) * 100;
                
                return (
                  <tr key={calc.slug} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        index === 0 ? "bg-gradient-to-br from-amber-400 to-amber-500 text-white" :
                        index === 1 ? "bg-gradient-to-br from-slate-300 to-slate-400 text-white" :
                        index === 2 ? "bg-gradient-to-br from-orange-400 to-orange-500 text-white" :
                        "bg-slate-100 text-slate-600"
                      }`}>
                        {index + 1}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-medium text-slate-900 capitalize">
                        {calc.slug.replace(/-/g, " ")}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right font-medium text-slate-900">
                      {calc.views.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-right font-medium text-slate-900">
                      {calc.calculations.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${
                        parseFloat(calc.conversion) >= 50 
                          ? "bg-emerald-100 text-emerald-700"
                          : parseFloat(calc.conversion) >= 25
                          ? "bg-amber-100 text-amber-700"
                          : "bg-slate-100 text-slate-600"
                      }`}>
                        {calc.conversion}%
                      </span>
                    </td>
                    <td className="px-6 py-4 w-40">
                      <div className="w-full bg-slate-100 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all"
                          style={{ width: `${barWidth}%` }}
                        />
                      </div>
                    </td>
                  </tr>
                );
              }) || (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                    No calculator data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Three Column Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* By Country */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100">
            <h3 className="font-semibold text-slate-900 flex items-center gap-2">
              <Globe className="w-5 h-5 text-purple-500" />
              Top Countries
            </h3>
          </div>
          <div className="p-4 space-y-3">
            {data?.byCountry?.slice(0, 6).map((item, i) => {
              const percentage = ((item.count / (data.overview?.totalViews || 1)) * 100).toFixed(1);
              return (
                <div key={item.country} className="flex items-center gap-3">
                  <span className="text-xl">{countryFlags[item.country] || "🌍"}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-slate-700">{item.country}</span>
                      <span className="text-sm text-slate-500">{item.count.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1.5">
                      <div 
                        className="bg-purple-500 h-1.5 rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            }) || <p className="text-slate-500 text-sm py-4 text-center">No data available</p>}
          </div>
        </div>

        {/* By Device */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100">
            <h3 className="font-semibold text-slate-900 flex items-center gap-2">
              <Monitor className="w-5 h-5 text-green-500" />
              Devices
            </h3>
          </div>
          <div className="p-6">
            <div className="flex items-center justify-center gap-8">
              {data?.byDevice?.map((item) => {
                const percentage = ((item.count / totalDevices) * 100).toFixed(0);
                const Icon = item.device === "mobile" ? Smartphone : 
                            item.device === "tablet" ? Tablet : Monitor;
                return (
                  <div key={item.device} className="text-center">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-3 ${
                      item.device === "mobile" ? "bg-blue-100" :
                      item.device === "tablet" ? "bg-purple-100" : "bg-emerald-100"
                    }`}>
                      <Icon className={`w-8 h-8 ${
                        item.device === "mobile" ? "text-blue-600" :
                        item.device === "tablet" ? "text-purple-600" : "text-emerald-600"
                      }`} />
                    </div>
                    <p className="text-2xl font-bold text-slate-900">{percentage}%</p>
                    <p className="text-sm text-slate-500 capitalize">{item.device || "Desktop"}</p>
                    <p className="text-xs text-slate-400">{item.count.toLocaleString()} visits</p>
                  </div>
                );
              }) || <p className="text-slate-500 text-sm">No data</p>}
            </div>
          </div>
        </div>

        {/* By Language */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100">
            <h3 className="font-semibold text-slate-900 flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-500" />
              Languages
            </h3>
          </div>
          <div className="p-4 space-y-4">
            {data?.byLanguage?.map((item) => {
              const percentage = ((item.count / totalLangs) * 100).toFixed(0);
              return (
                <div key={item.language}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-700">
                      {langNames[item.language] || item.language.toUpperCase()}
                    </span>
                    <span className="text-sm font-semibold text-slate-900">{percentage}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2.5">
                    <div 
                      className={`h-2.5 rounded-full ${
                        item.language === "en" ? "bg-blue-500" :
                        item.language === "es" ? "bg-amber-500" : "bg-emerald-500"
                      }`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{item.count.toLocaleString()} visits</p>
                </div>
              );
            }) || <p className="text-slate-500 text-sm py-4 text-center">No data available</p>}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
            <Activity className="w-5 h-5 text-slate-400" />
            Recent Activity
          </h2>
        </div>
        <div className="divide-y divide-slate-100 max-h-80 overflow-y-auto">
          {data?.recentActivity?.slice(0, 15).map((activity, i) => (
            <div key={i} className="px-6 py-3 flex items-center justify-between hover:bg-slate-50">
              <div className="flex items-center gap-3">
                <span className={`w-2 h-2 rounded-full ${
                  activity.type === "VIEW" ? "bg-blue-500" : "bg-emerald-500"
                }`} />
                <span className="font-medium text-slate-700 capitalize">
                  {activity.calculatorSlug.replace(/-/g, " ")}
                </span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  activity.type === "VIEW" 
                    ? "bg-blue-100 text-blue-700" 
                    : "bg-emerald-100 text-emerald-700"
                }`}>
                  {activity.type === "VIEW" ? "View" : "Calculation"}
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm text-slate-500">
                <span>{countryFlags[activity.country] || "🌍"}</span>
                <span className="capitalize">{activity.device || "desktop"}</span>
                <span>{new Date(activity.createdAt).toLocaleTimeString()}</span>
              </div>
            </div>
          )) || (
            <div className="px-6 py-8 text-center text-slate-500">
              No recent activity
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
