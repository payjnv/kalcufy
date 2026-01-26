"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Users,
  Calculator,
  CreditCard,
  Mail,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

interface DashboardStats {
  totalUsers: number;
  proUsers: number;
  calculationsToday: number;
  calculationsTotal: number;
  activeSubscriptions: number;
  unreadMessages: number;
  newsletterSubscribers: number;
  recentUsers: Array<{
    id: string;
    name: string | null;
    email: string;
    isPro: boolean;
    createdAt: string;
  }>;
  popularCalculators: Array<{
    slug: string;
    views: number;
    calculations: number;
  }>;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/admin/stats");
        const data = await res.json();
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 bg-slate-200 rounded animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl border border-slate-200 p-6 h-32 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  const statCards = [
    {
      name: "Total Users",
      value: stats?.totalUsers || 0,
      icon: Users,
      change: "+12%",
      changeType: "positive" as const,
      href: "/admin/users",
    },
    {
      name: "PRO Users",
      value: stats?.proUsers || 0,
      icon: CreditCard,
      change: `${((stats?.proUsers || 0) / (stats?.totalUsers || 1) * 100).toFixed(1)}%`,
      changeType: "positive" as const,
      href: "/admin/subscriptions",
    },
    {
      name: "Calculations Today",
      value: stats?.calculationsToday || 0,
      icon: Calculator,
      change: "+8%",
      changeType: "positive" as const,
      href: "/admin/calculator-usage",
    },
    {
      name: "Unread Messages",
      value: stats?.unreadMessages || 0,
      icon: Mail,
      change: stats?.unreadMessages ? "Action needed" : "All read",
      changeType: stats?.unreadMessages ? ("negative" as const) : ("positive" as const),
      href: "/admin/contact-messages",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-600">Welcome back! Here is what is happening with Kalcufy.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <Link
            key={stat.name}
            href={stat.href}
            className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-md hover:border-slate-300 transition-all group"
          >
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                <stat.icon className="w-6 h-6 text-blue-600" />
              </div>
              <span className={`flex items-center gap-1 text-sm font-medium ${stat.changeType === "positive" ? "text-green-600" : "text-red-600"}`}>
                {stat.changeType === "positive" ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                {stat.change}
              </span>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold text-slate-900">{typeof stat.value === "number" ? stat.value.toLocaleString() : stat.value}</p>
              <p className="text-sm text-slate-600">{stat.name}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-900">Recent Users</h2>
            <Link href="/admin/users" className="text-sm text-blue-600 hover:text-blue-700 font-medium">View all →</Link>
          </div>
          <div className="space-y-4">
            {stats?.recentUsers?.slice(0, 5).map((user) => (
              <div key={user.id} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-medium text-sm">
                  {user.name?.substring(0, 2).toUpperCase() || user.email.substring(0, 2).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900 truncate">{user.name || "No name"}</p>
                  <p className="text-xs text-slate-500 truncate">{user.email}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full shrink-0 ${user.isPro ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-600"}`}>
                  {user.isPro ? "PRO" : "FREE"}
                </span>
              </div>
            )) || <p className="text-slate-500 text-sm">No recent users</p>}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-900">Popular Calculators</h2>
            <Link href="/admin/calculator-usage" className="text-sm text-blue-600 hover:text-blue-700 font-medium">View all →</Link>
          </div>
          <div className="space-y-3">
            {stats?.popularCalculators?.slice(0, 5).map((calc, index) => (
              <div key={calc.slug} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-xs font-medium text-slate-600">{index + 1}</span>
                  <div>
                    <p className="text-sm font-medium text-slate-900 capitalize">{calc.slug.replace(/-/g, " ")}</p>
                    <p className="text-xs text-slate-500">{calc.calculations.toLocaleString()} calculations</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-slate-900">{calc.views.toLocaleString()}</p>
                  <p className="text-xs text-slate-500">views</p>
                </div>
              </div>
            )) || <p className="text-slate-500 text-sm">No data yet</p>}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <p className="text-sm text-slate-600">Total Calculations</p>
          <p className="text-xl font-bold text-slate-900">{stats?.calculationsTotal?.toLocaleString() || 0}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <p className="text-sm text-slate-600">Newsletter Subscribers</p>
          <p className="text-xl font-bold text-slate-900">{stats?.newsletterSubscribers?.toLocaleString() || 0}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <p className="text-sm text-slate-600">Active Subscriptions</p>
          <p className="text-xl font-bold text-slate-900">{stats?.activeSubscriptions || 0}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <p className="text-sm text-slate-600">Est. Monthly Revenue</p>
          <p className="text-xl font-bold text-slate-900">${((stats?.activeSubscriptions || 0) * 2.99).toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}
