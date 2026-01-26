"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Calculation {
  id: string;
  calculatorSlug: string;
  calculatorName: string;
  inputs: any;
  results: any;
  createdAt: string;
  user: {
    name: string | null;
    email: string;
  } | null;
}

export default function CalculationsPage() {
  const [calculations, setCalculations] = useState<Calculation[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const pageSize = 20;

  useEffect(() => {
    fetchCalculations();
  }, [page]);

  async function fetchCalculations() {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        _start: String((page - 1) * pageSize),
        _end: String(page * pageSize),
      });
      const response = await fetch(`/api/admin/calculator-history?${params}`);
      const data = await response.json();
      setCalculations(data.data || []);
      setTotal(data.total || 0);
    } catch (error) {
      console.error("Failed to fetch calculations:", error);
    } finally {
      setLoading(false);
    }
  }

  const pageCount = Math.ceil(total / pageSize);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Calculations</h1>
        <p className="text-slate-600">User calculation history ({total} total)</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Calculator</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">User</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              [...Array(5)].map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td className="px-6 py-4"><div className="h-4 bg-slate-200 rounded w-32"></div></td>
                  <td className="px-6 py-4"><div className="h-4 bg-slate-200 rounded w-48"></div></td>
                  <td className="px-6 py-4"><div className="h-4 bg-slate-200 rounded w-24"></div></td>
                </tr>
              ))
            ) : calculations.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-6 py-12 text-center text-slate-500">
                  No calculations yet
                </td>
              </tr>
            ) : (
              calculations.map((calc) => (
                <tr key={calc.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <span className="font-medium text-slate-900 capitalize">
                      {calc.calculatorName || calc.calculatorSlug.replace(/-/g, " ")}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {calc.user?.email || "Anonymous"}
                  </td>
                  <td className="px-6 py-4 text-slate-500 text-sm">
                    {new Date(calc.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {pageCount > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 bg-slate-50">
            <p className="text-sm text-slate-600">Page {page} of {pageCount}</p>
            <div className="flex items-center gap-2">
              <button onClick={() => setPage(page - 1)} disabled={page === 1} className="p-2 border border-slate-200 rounded-lg disabled:opacity-50 hover:bg-white">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button onClick={() => setPage(page + 1)} disabled={page === pageCount} className="p-2 border border-slate-200 rounded-lg disabled:opacity-50 hover:bg-white">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
