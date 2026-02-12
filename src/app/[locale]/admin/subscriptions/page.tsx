"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Download, Eye, ChevronLeft, ChevronRight, Crown, CreditCard, Calendar, CheckCircle } from "lucide-react";

interface Subscription {
  id: string;
  userId: string;
  status: string;
  plan: string;
  stripeSubscriptionId: string | null;
  currentPeriodEnd: string | null;
  cancelAtPeriodEnd: boolean;
  createdAt: string;
  user: { id: string; name: string | null; email: string };
}

export default function SubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "active" | "cancelled">("all");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  useEffect(() => { fetchSubscriptions(); }, [page, filter]);

  async function fetchSubscriptions() {
    setLoading(true);
    try {
      const params = new URLSearchParams({ _start: String((page - 1) * pageSize), _end: String(page * pageSize), _sort: "createdAt", _order: "desc" });
      if (filter !== "all") params.append("status", filter.toUpperCase());
      const res = await fetch(`/api/admin/subscriptions?${params}`);
      const data = await res.json();
      setSubscriptions(data.data);
      setTotal(data.total);
    } catch (error) {
      console.error("Failed to fetch subscriptions:", error);
    } finally {
      setLoading(false);
    }
  }

  const pageCount = Math.ceil(total / pageSize);
  const getStatusColor = (status: string) => {
    switch (status.toUpperCase()) {
      case "ACTIVE": return "bg-green-100 text-green-700";
      case "CANCELLED": case "CANCELED": return "bg-red-100 text-red-700";
      default: return "bg-slate-100 text-slate-600";
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-lg sm:text-lg sm:text-xl sm:text-2xl font-bold text-slate-900">Subscriptions</h1>
          <p className="text-slate-600">Manage PRO subscriptions ({total} total)</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
          <Download className="w-4 h-4" /> Export CSV
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center"><CheckCircle className="w-5 h-5 text-green-600" /></div>
            <div>
              <p className="text-lg sm:text-lg sm:text-xl sm:text-2xl font-bold text-slate-900">{subscriptions.filter(s => s.status === "ACTIVE").length}</p>
              <p className="text-sm text-slate-600">Active</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center"><Calendar className="w-5 h-5 text-amber-600" /></div>
            <div>
              <p className="text-lg sm:text-lg sm:text-xl sm:text-2xl font-bold text-slate-900">{subscriptions.filter(s => s.cancelAtPeriodEnd).length}</p>
              <p className="text-sm text-slate-600">Cancelling</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center"><CreditCard className="w-5 h-5 text-blue-600" /></div>
            <div>
              <p className="text-lg sm:text-lg sm:text-xl sm:text-2xl font-bold text-slate-900">${(subscriptions.filter(s => s.status === "ACTIVE").length * 2.99).toFixed(2)}</p>
              <p className="text-sm text-slate-600">MRR</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {["all", "active", "cancelled"].map((f) => (
          <button key={f} onClick={() => { setFilter(f as any); setPage(1); }} className={`px-4 py-2 rounded-lg text-sm font-medium capitalize ${filter === f ? "bg-slate-900 text-white" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"}`}>{f}</button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-3 sm:px-6 py-2.5 sm:py-3 text-left text-xs font-semibold text-slate-600 uppercase">User</th>
                <th className="px-3 sm:px-6 py-2.5 sm:py-3 text-left text-xs font-semibold text-slate-600 uppercase">Plan</th>
                <th className="px-3 sm:px-6 py-2.5 sm:py-3 text-left text-xs font-semibold text-slate-600 uppercase">Status</th>
                <th className="px-3 sm:px-6 py-2.5 sm:py-3 text-left text-xs font-semibold text-slate-600 uppercase">Period Ends</th>
                <th className="px-3 sm:px-6 py-2.5 sm:py-3 text-left text-xs font-semibold text-slate-600 uppercase">Started</th>
                <th className="px-3 sm:px-6 py-2.5 sm:py-3 text-right text-xs font-semibold text-slate-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                [...Array(5)].map((_, i) => <tr key={i}><td colSpan={6} className="px-3 sm:px-3 sm:px-6 py-2.5 sm:py-3 sm:py-4"><div className="h-10 bg-slate-100 rounded animate-pulse" /></td></tr>)
              ) : subscriptions.length === 0 ? (
                <tr><td colSpan={6} className="px-3 sm:px-6 py-8 sm:py-12 text-center text-slate-500">No subscriptions found</td></tr>
              ) : (
                subscriptions.map((sub) => (
                  <tr key={sub.id} className="hover:bg-slate-50">
                    <td className="px-3 sm:px-3 sm:px-6 py-2.5 sm:py-3 sm:py-4">
                      <p className="font-medium text-slate-900">{sub.user.name || "No name"}</p>
                      <p className="text-sm text-slate-500">{sub.user.email}</p>
                    </td>
                    <td className="px-3 sm:px-3 sm:px-6 py-2.5 sm:py-3 sm:py-4">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700"><Crown className="w-3 h-3" />{sub.plan}</span>
                    </td>
                    <td className="px-3 sm:px-3 sm:px-6 py-2.5 sm:py-3 sm:py-4">
                      <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${getStatusColor(sub.status)}`}>{sub.status}</span>
                      {sub.cancelAtPeriodEnd && <span className="text-xs text-amber-600 ml-2">(cancels at period end)</span>}
                    </td>
                    <td className="px-3 sm:px-3 sm:px-6 py-2.5 sm:py-3 sm:py-4 text-sm text-slate-600">{sub.currentPeriodEnd ? new Date(sub.currentPeriodEnd).toLocaleDateString() : "-"}</td>
                    <td className="px-3 sm:px-3 sm:px-6 py-2.5 sm:py-3 sm:py-4 text-sm text-slate-600">{new Date(sub.createdAt).toLocaleDateString()}</td>
                    <td className="px-3 sm:px-3 sm:px-6 py-2.5 sm:py-3 sm:py-4">
                      <Link href={`/admin/users/${sub.userId}`} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg inline-block"><Eye className="w-4 h-4" /></Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {total > pageSize && (
          <div className="flex items-center justify-between px-3 sm:px-3 sm:px-6 py-2.5 sm:py-3 sm:py-4 border-t border-slate-200">
            <p className="text-sm text-slate-600">Page {page} of {pageCount}</p>
            <div className="flex items-center gap-2">
              <button onClick={() => setPage(page - 1)} disabled={page === 1} className="p-2 border border-slate-200 rounded-lg disabled:opacity-50 hover:bg-slate-50"><ChevronLeft className="w-4 h-4" /></button>
              <button onClick={() => setPage(page + 1)} disabled={page === pageCount} className="p-2 border border-slate-200 rounded-lg disabled:opacity-50 hover:bg-slate-50"><ChevronRight className="w-4 h-4" /></button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
