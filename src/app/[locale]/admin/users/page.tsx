"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Download, Eye, Pencil, Trash2, ChevronLeft, ChevronRight, Crown } from "lucide-react";

interface User {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  isPro: boolean;
  role: string;
  createdAt: string;
  _count: { history: number; favorites: number };
}

export default function UsersListPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "pro" | "free">("all");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  useEffect(() => { fetchUsers(); }, [page, search, filter]);

  async function fetchUsers() {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        _start: String((page - 1) * pageSize),
        _end: String(page * pageSize),
        _sort: "createdAt",
        _order: "desc",
      });
      if (search) params.append("q", search);
      if (filter === "pro") params.append("isPro", "true");
      if (filter === "free") params.append("isPro", "false");

      const res = await fetch(`/api/admin/users?${params}`);
      const data = await res.json();
      setUsers(data.data);
      setTotal(data.total);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      await fetch(`/api/admin/users/${id}`, { method: "DELETE" });
      fetchUsers();
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  }

  async function togglePro(id: string, currentStatus: boolean) {
    try {
      await fetch(`/api/admin/users/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPro: !currentStatus }),
      });
      fetchUsers();
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  }

  const pageCount = Math.ceil(total / pageSize);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Users</h1>
          <p className="text-slate-600">Manage all registered users ({total} total)</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
          <Download className="w-4 h-4" /> Export CSV
        </button>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="relative flex-1 max-w-md w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center gap-2">
          {["all", "pro", "free"].map((f) => (
            <button
              key={f}
              onClick={() => { setFilter(f as any); setPage(1); }}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize ${filter === f ? "bg-slate-900 text-white" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">User</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Plan</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Role</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Activity</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Joined</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-slate-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i}><td colSpan={6} className="px-6 py-4"><div className="h-10 bg-slate-100 rounded animate-pulse" /></td></tr>
                ))
              ) : users.length === 0 ? (
                <tr><td colSpan={6} className="px-6 py-12 text-center text-slate-500">No users found</td></tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {user.image ? (
                          <img src={user.image} alt="" className="w-10 h-10 rounded-full" />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-medium text-sm">
                            {user.name?.substring(0, 2).toUpperCase() || user.email.substring(0, 2).toUpperCase()}
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-slate-900">{user.name || "No name"}</p>
                          <p className="text-sm text-slate-500">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => togglePro(user.id, user.isPro)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full ${user.isPro ? "bg-blue-100 text-blue-700 hover:bg-blue-200" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
                      >
                        {user.isPro && <Crown className="w-3 h-3" />}
                        {user.isPro ? "PRO" : "FREE"}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${user.role === "ADMIN" ? "bg-purple-100 text-purple-700" : "bg-slate-100 text-slate-600"}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      <div><span className="font-medium">{user._count.history}</span> calculations</div>
                      <div className="text-xs text-slate-400">{user._count.favorites} favorites</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <Link href={`/admin/users/${user.id}`} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"><Eye className="w-4 h-4" /></Link>
                        <Link href={`/admin/users/${user.id}/edit`} className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg"><Pencil className="w-4 h-4" /></Link>
                        <button onClick={() => handleDelete(user.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {total > pageSize && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200">
            <p className="text-sm text-slate-600">Showing {(page - 1) * pageSize + 1} to {Math.min(page * pageSize, total)} of {total}</p>
            <div className="flex items-center gap-2">
              <button onClick={() => setPage(page - 1)} disabled={page === 1} className="p-2 border border-slate-200 rounded-lg disabled:opacity-50 hover:bg-slate-50"><ChevronLeft className="w-4 h-4" /></button>
              <span className="px-4 py-2 text-sm text-slate-600">Page {page} of {pageCount}</span>
              <button onClick={() => setPage(page + 1)} disabled={page === pageCount} className="p-2 border border-slate-200 rounded-lg disabled:opacity-50 hover:bg-slate-50"><ChevronRight className="w-4 h-4" /></button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
