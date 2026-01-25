"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface AdSlot {
  id: string;
  name: string;
  location: string;
  adCode: string | null;
  isActive: boolean;
  updatedAt: string;
}

export default function AdminAdsPage() {
  const [adSlots, setAdSlots] = useState<AdSlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingSlot, setEditingSlot] = useState<AdSlot | null>(null);
  const [adCode, setAdCode] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchAdSlots();
  }, []);

  const fetchAdSlots = async () => {
    try {
      const res = await fetch("/api/admin/ads");
      if (res.ok) {
        const data = await res.json();
        setAdSlots(data);
      }
    } catch (error) {
      console.error("Error fetching ads:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleActive = async (slot: AdSlot) => {
    try {
      const res = await fetch(`/api/admin/ads/${slot.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !slot.isActive }),
      });
      if (res.ok) {
        setAdSlots((prev) =>
          prev.map((s) => (s.id === slot.id ? { ...s, isActive: !s.isActive } : s))
        );
      }
    } catch (error) {
      console.error("Error toggling ad:", error);
    }
  };

  const openEditor = (slot: AdSlot) => {
    setEditingSlot(slot);
    setAdCode(slot.adCode || "");
  };

  const saveAdCode = async () => {
    if (!editingSlot) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/ads/${editingSlot.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adCode }),
      });
      if (res.ok) {
        setAdSlots((prev) =>
          prev.map((s) => (s.id === editingSlot.id ? { ...s, adCode } : s))
        );
        setEditingSlot(null);
      }
    } catch (error) {
      console.error("Error saving ad:", error);
    } finally {
      setSaving(false);
    }
  };

  const getLocationLabel = (location: string) => {
    const labels: Record<string, string> = {
      "blog-hero": "Blog - After Hero",
      "blog-between": "Blog - Between Posts",
      "blog-sidebar": "Blog - Sidebar",
      "article-top": "Article - Top",
      "article-middle": "Article - Middle",
      "article-sidebar": "Article - Sidebar",
      "article-bottom": "Article - Bottom",
      "calculator-top": "Calculator - Top",
      "calculator-bottom": "Calculator - Bottom",
      "calculator-sidebar": "Calculator - Sidebar",
      "calculator-mobile-top": "📱 Calculator - Mobile Top",
      "calculator-mobile-bottom": "📱 Calculator - Mobile Bottom",
    };
    return labels[location] || location;
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/en/admin" className="text-slate-400 hover:text-slate-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <h1 className="text-xl font-semibold text-slate-900">Ad Management</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8">
          <div className="flex gap-3">
            <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="text-sm text-blue-800 font-medium">How to add Google AdSense</p>
              <p className="text-sm text-blue-600 mt-1">Paste your AdSense code in the editor for each slot. The ad will appear on the site when you activate the slot.</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 border border-slate-200">
            <p className="text-sm text-slate-600">Total Slots</p>
            <p className="text-2xl font-bold text-slate-900">{adSlots.length}</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-slate-200">
            <p className="text-sm text-slate-600">Active</p>
            <p className="text-2xl font-bold text-emerald-700">{adSlots.filter((s) => s.isActive).length}</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-slate-200">
            <p className="text-sm text-slate-600">With Code</p>
            <p className="text-2xl font-bold text-blue-600">{adSlots.filter((s) => s.adCode).length}</p>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-slate-600 mt-2">Loading ad slots...</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {adSlots.map((slot) => (
              <div key={slot.id} className="bg-white rounded-xl border border-slate-200 p-4 hover:border-slate-300 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${slot.isActive && slot.adCode ? "bg-emerald-100" : "bg-slate-100"}`}>
                      <svg className={`w-6 h-6 ${slot.isActive && slot.adCode ? "text-emerald-700" : "text-slate-400"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-slate-900">{slot.name}</h3>
                      <p className="text-sm text-slate-600">{getLocationLabel(slot.location)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${slot.adCode ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-600"}`}>
                      {slot.adCode ? "Code Added" : "No Code"}
                    </span>
                    <button onClick={() => toggleActive(slot)} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${slot.isActive ? "bg-emerald-500" : "bg-slate-200"}`}>
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${slot.isActive ? "translate-x-6" : "translate-x-1"}`} />
                    </button>
                    <button onClick={() => openEditor(slot)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {editingSlot && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-900">Edit Ad Code</h2>
                <button onClick={() => setEditingSlot(null)} className="p-2 text-slate-400 hover:text-slate-600 rounded-lg">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-sm text-slate-600 mt-1">{editingSlot.name} - {getLocationLabel(editingSlot.location)}</p>
            </div>
            <div className="p-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">AdSense / Custom HTML Code</label>
              <textarea value={adCode} onChange={(e) => setAdCode(e.target.value)} placeholder="Paste your AdSense code here..." className="w-full h-64 p-4 border border-slate-200 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
              <p className="text-xs text-slate-400 mt-2">Paste the complete ad code including &lt;script&gt; tags</p>
            </div>
            <div className="p-6 border-t border-slate-200 flex justify-end gap-3">
              <button onClick={() => setEditingSlot(null)} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">Cancel</button>
              <button onClick={saveAdCode} disabled={saving} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50">{saving ? "Saving..." : "Save Changes"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
