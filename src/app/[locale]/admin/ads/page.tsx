"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Info } from "lucide-react";

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
  
  // New ad creation state
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newAdName, setNewAdName] = useState("");
  const [newAdLocation, setNewAdLocation] = useState("");
  const [newAdCode, setNewAdCode] = useState("");
  const [creating, setCreating] = useState(false);

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

  const createNewAd = async () => {
    if (!newAdName.trim()) return;
    setCreating(true);
    try {
      const res = await fetch("/api/admin/ads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newAdName,
          location: newAdLocation || newAdName,
          adCode: newAdCode || null,
          isActive: true,
        }),
      });
      if (res.ok) {
        const newAd = await res.json();
        setAdSlots((prev) => [...prev, newAd]);
        setShowCreateModal(false);
        setNewAdName("");
        setNewAdLocation("");
        setNewAdCode("");
      } else {
        const error = await res.json();
        alert(error.error || "Error creating ad");
      }
    } catch (error) {
      console.error("Error creating ad:", error);
      alert("Error creating ad");
    } finally {
      setCreating(false);
    }
  };

  const deleteAd = async (slot: AdSlot) => {
    if (!confirm(`Are you sure you want to delete "${slot.name}"?`)) return;
    try {
      const res = await fetch(`/api/admin/ads/${slot.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setAdSlots((prev) => prev.filter((s) => s.id !== slot.id));
      }
    } catch (error) {
      console.error("Error deleting ad:", error);
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
      "calculator-after-results": "🖥️ Calculator - After Results (Desktop)",
      "calculator-sidebar": "Calculator - Sidebar",
      "calculator-mobile-top": "📱 Calculator - Mobile Top",
      "calculator-mobile-bottom": "📱 Calculator - Mobile Bottom",
      "calculator-mobile-content-1": "📱 Calculator - Mobile Content 1",
      "calculator-mobile-content-2": "📱 Calculator - Mobile Content 2",
    };
    return labels[location] || location;
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Ad Management</h1>
          <p className="text-slate-600">Manage your advertisement slots and AdSense codes</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Create Ad
        </button>
      </div>

      {/* Info Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex gap-3">
          <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-blue-800 font-medium">How to add Google AdSense</p>
            <p className="text-sm text-blue-600 mt-1">Paste your AdSense code in the editor for each slot. The ad will appear on the site when you activate the slot.</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-4 border border-slate-200">
          <p className="text-sm text-slate-600">Total Slots</p>
          <p className="text-2xl font-bold text-slate-900">{adSlots.length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-slate-200">
          <p className="text-sm text-slate-600">Active</p>
          <p className="text-2xl font-bold text-emerald-600">{adSlots.filter((s) => s.isActive).length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-slate-200">
          <p className="text-sm text-slate-600">With Code</p>
          <p className="text-2xl font-bold text-blue-600">{adSlots.filter((s) => s.adCode).length}</p>
        </div>
      </div>

      {/* Ad Slots List */}
      {loading ? (
        <div className="text-center py-12">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-slate-600 mt-2">Loading ad slots...</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="divide-y divide-slate-100">
            {adSlots.map((slot) => (
              <div key={slot.id} className="p-4 hover:bg-slate-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${slot.isActive && slot.adCode ? "bg-emerald-100" : "bg-slate-100"}`}>
                      <svg className={`w-6 h-6 ${slot.isActive && slot.adCode ? "text-emerald-600" : "text-slate-400"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-slate-900">{slot.name}</h3>
                      <p className="text-sm text-slate-500">{getLocationLabel(slot.location)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${slot.adCode ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-600"}`}>
                      {slot.adCode ? "✓ Code Added" : "No Code"}
                    </span>

                    {/* Toggle */}
                    <button
                      onClick={() => toggleActive(slot)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        slot.isActive ? "bg-emerald-500" : "bg-slate-200"
                      }`}
                      aria-label={slot.isActive ? "Deactivate" : "Activate"}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          slot.isActive ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>

                    {/* Edit */}
                    <button
                      onClick={() => openEditor(slot)}
                      className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      aria-label="Edit"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => deleteAd(slot)}
                      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      aria-label="Delete"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {adSlots.length === 0 && (
              <div className="p-12 text-center text-slate-500">
                No ad slots yet. Click "Create Ad" to add your first slot.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Edit Ad Modal */}
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
              <textarea 
                value={adCode} 
                onChange={(e) => setAdCode(e.target.value)} 
                placeholder="Paste your AdSense code here..." 
                className="w-full h-64 p-4 border border-slate-200 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" 
              />
              <p className="text-xs text-slate-400 mt-2">Paste the complete ad code including &lt;script&gt; tags</p>
            </div>
            <div className="p-6 border-t border-slate-200 flex justify-end gap-3">
              <button onClick={() => setEditingSlot(null)} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">Cancel</button>
              <button onClick={saveAdCode} disabled={saving} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50">
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Ad Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-900">Create New Ad Slot</h2>
                <button onClick={() => setShowCreateModal(false)} className="p-2 text-slate-400 hover:text-slate-600 rounded-lg">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Ad Slot Name *</label>
                <input
                  type="text"
                  value={newAdName}
                  onChange={(e) => setNewAdName(e.target.value)}
                  placeholder="e.g., calculator-mobile-content-1"
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-slate-400 mt-1">Use lowercase with hyphens (e.g., calculator-mobile-content-1)</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Location / Description</label>
                <input
                  type="text"
                  value={newAdLocation}
                  onChange={(e) => setNewAdLocation(e.target.value)}
                  placeholder="e.g., Mobile inline ad after export buttons"
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Ad Code (optional)</label>
                <textarea
                  value={newAdCode}
                  onChange={(e) => setNewAdCode(e.target.value)}
                  placeholder="Paste your AdSense or custom HTML code here..."
                  className="w-full h-40 p-4 border border-slate-200 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>
            </div>
            <div className="p-6 border-t border-slate-200 flex justify-end gap-3">
              <button onClick={() => setShowCreateModal(false)} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">Cancel</button>
              <button
                onClick={createNewAd}
                disabled={creating || !newAdName.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {creating ? "Creating..." : "Create Ad Slot"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
