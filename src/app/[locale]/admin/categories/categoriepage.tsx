"use client";

import { useState, useEffect, useRef } from "react";
import { Plus, Edit2, Trash2, GripVertical, Home, Menu } from "lucide-react";

interface Category {
  id: string;
  slug: string;
  nameEn: string;
  nameEs: string | null;
  namePt: string | null;
  icon: string | null;
  color: string;
  description: string | null;
  isActive: boolean;
  showInMenu: boolean;
  showInHome: boolean;
  sortOrder: number;
  _count: { calculators: number };
}

const COLORS = [
  { name: "Blue", value: "blue", bg: "bg-blue-500" },
  { name: "Green", value: "green", bg: "bg-green-500" },
  { name: "Purple", value: "purple", bg: "bg-purple-500" },
  { name: "Red", value: "red", bg: "bg-red-500" },
  { name: "Orange", value: "orange", bg: "bg-orange-500" },
  { name: "Cyan", value: "cyan", bg: "bg-cyan-500" },
  { name: "Pink", value: "pink", bg: "bg-pink-500" },
  { name: "Amber", value: "amber", bg: "bg-amber-500" },
];

const ICONS = ["💰", "🏥", "📊", "🏠", "💳", "📈", "⚖️", "🎯", "🔢", "⏱️", "💪", "🍎", "🧮", "📱"];

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);
  const [saving, setSaving] = useState(false);

  // Drag and drop state
  const [draggedItem, setDraggedItem] = useState<Category | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);
  const [savingOrder, setSavingOrder] = useState(false);

  // Form state
  const [form, setForm] = useState({
    slug: "",
    nameEn: "",
    nameEs: "",
    namePt: "",
    icon: "",
    color: "blue",
    description: "",
    showInMenu: true,
    showInHome: true,
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/admin/calculator-categories");
      if (res.ok) {
        const data = await res.json();
        // Sort by sortOrder
        data.sort((a: Category, b: Category) => a.sortOrder - b.sortOrder);
        setCategories(data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  // Drag and Drop handlers
  const handleDragStart = (e: React.DragEvent, category: Category) => {
    setDraggedItem(category);
    e.dataTransfer.effectAllowed = "move";
    // Add a slight delay to show the drag effect
    setTimeout(() => {
      const element = document.getElementById(`category-${category.id}`);
      if (element) element.style.opacity = "0.5";
    }, 0);
  };

  const handleDragEnd = () => {
    if (draggedItem) {
      const element = document.getElementById(`category-${draggedItem.id}`);
      if (element) element.style.opacity = "1";
    }
    setDraggedItem(null);
    setDragOverId(null);
  };

  const handleDragOver = (e: React.DragEvent, category: Category) => {
    e.preventDefault();
    if (draggedItem && draggedItem.id !== category.id) {
      setDragOverId(category.id);
    }
  };

  const handleDragLeave = () => {
    setDragOverId(null);
  };

  const handleDrop = async (e: React.DragEvent, targetCategory: Category) => {
    e.preventDefault();
    
    if (!draggedItem || draggedItem.id === targetCategory.id) {
      setDragOverId(null);
      return;
    }

    // Reorder the categories
    const newCategories = [...categories];
    const draggedIndex = newCategories.findIndex(c => c.id === draggedItem.id);
    const targetIndex = newCategories.findIndex(c => c.id === targetCategory.id);

    // Remove dragged item and insert at new position
    newCategories.splice(draggedIndex, 1);
    newCategories.splice(targetIndex, 0, draggedItem);

    // Update sortOrder
    const updatedCategories = newCategories.map((cat, index) => ({
      ...cat,
      sortOrder: index,
    }));

    setCategories(updatedCategories);
    setDragOverId(null);

    // Save the new order to the server
    await saveOrder(updatedCategories);
  };

  const saveOrder = async (orderedCategories: Category[]) => {
    setSavingOrder(true);
    try {
      const res = await fetch("/api/admin/calculator-categories/reorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          order: orderedCategories.map((c, index) => ({ id: c.id, sortOrder: index })),
        }),
      });
      if (!res.ok) {
        // Revert on error
        fetchCategories();
      }
    } catch (error) {
      console.error("Error saving order:", error);
      fetchCategories();
    } finally {
      setSavingOrder(false);
    }
  };

  // Move up/down buttons as alternative
  const moveCategory = async (category: Category, direction: "up" | "down") => {
    const index = categories.findIndex(c => c.id === category.id);
    if (direction === "up" && index === 0) return;
    if (direction === "down" && index === categories.length - 1) return;

    const newCategories = [...categories];
    const swapIndex = direction === "up" ? index - 1 : index + 1;
    [newCategories[index], newCategories[swapIndex]] = [newCategories[swapIndex], newCategories[index]];

    const updatedCategories = newCategories.map((cat, i) => ({
      ...cat,
      sortOrder: i,
    }));

    setCategories(updatedCategories);
    await saveOrder(updatedCategories);
  };

  const openModal = (category?: Category) => {
    if (category) {
      setEditing(category);
      setForm({
        slug: category.slug,
        nameEn: category.nameEn,
        nameEs: category.nameEs || "",
        namePt: category.namePt || "",
        icon: category.icon || "",
        color: category.color,
        description: category.description || "",
        showInMenu: category.showInMenu,
        showInHome: category.showInHome,
      });
    } else {
      setEditing(null);
      setForm({
        slug: "",
        nameEn: "",
        nameEs: "",
        namePt: "",
        icon: "",
        color: "blue",
        description: "",
        showInMenu: true,
        showInHome: true,
      });
    }
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!form.slug || !form.nameEn) return;
    setSaving(true);

    try {
      const url = editing
        ? `/api/admin/calculator-categories/${editing.id}`
        : "/api/admin/calculator-categories";
      const method = editing ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        fetchCategories();
        setShowModal(false);
      } else {
        const error = await res.json();
        alert(error.error || "Error saving category");
      }
    } catch (error) {
      console.error("Error saving:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (category: Category) => {
    if (!confirm(`Delete "${category.nameEn}"? This will remove all calculator assignments.`)) return;

    try {
      const res = await fetch(`/api/admin/calculator-categories/${category.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchCategories();
      }
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  const toggleField = async (category: Category, field: "isActive" | "showInMenu" | "showInHome") => {
    try {
      const res = await fetch(`/api/admin/calculator-categories/${category.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [field]: !category[field] }),
      });
      if (res.ok) {
        setCategories(prev =>
          prev.map(c => (c.id === category.id ? { ...c, [field]: !c[field] } : c))
        );
      }
    } catch (error) {
      console.error("Error toggling:", error);
    }
  };

  const getColorClass = (color: string) => {
    const colorMap: Record<string, string> = {
      blue: "bg-blue-500",
      green: "bg-green-500",
      purple: "bg-purple-500",
      red: "bg-red-500",
      orange: "bg-orange-500",
      cyan: "bg-cyan-500",
      pink: "bg-pink-500",
      amber: "bg-amber-500",
    };
    return colorMap[color] || "bg-blue-500";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Calculator Categories</h1>
          <p className="text-slate-600">Organize your calculators into categories. Drag to reorder.</p>
        </div>
        <div className="flex items-center gap-3">
          {savingOrder && (
            <span className="text-sm text-blue-600 flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
              Saving...
            </span>
          )}
          <button
            onClick={() => openModal()}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            New Category
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-slate-200">
          <p className="text-sm text-slate-600">Total Categories</p>
          <p className="text-2xl font-bold text-slate-900">{categories.length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-slate-200">
          <p className="text-sm text-slate-600">Active</p>
          <p className="text-2xl font-bold text-emerald-600">{categories.filter(c => c.isActive).length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-slate-200">
          <p className="text-sm text-slate-600">In Menu</p>
          <p className="text-2xl font-bold text-blue-600">{categories.filter(c => c.showInMenu).length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-slate-200">
          <p className="text-sm text-slate-600">On Homepage</p>
          <p className="text-2xl font-bold text-purple-600">{categories.filter(c => c.showInHome).length}</p>
        </div>
      </div>

      {/* Categories List */}
      {loading ? (
        <div className="text-center py-12">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex items-center gap-2 text-sm text-slate-600">
            <GripVertical className="w-4 h-4" />
            <span>Drag categories to reorder them</span>
          </div>
          <div className="divide-y divide-slate-100">
            {categories.map((category, index) => (
              <div
                key={category.id}
                id={`category-${category.id}`}
                draggable
                onDragStart={(e) => handleDragStart(e, category)}
                onDragEnd={handleDragEnd}
                onDragOver={(e) => handleDragOver(e, category)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, category)}
                className={`p-4 transition-all ${
                  dragOverId === category.id
                    ? "bg-blue-50 border-t-2 border-blue-500"
                    : "hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {/* Drag Handle */}
                    <div className="cursor-grab active:cursor-grabbing text-slate-400 hover:text-slate-600 flex flex-col items-center">
                      <GripVertical className="w-5 h-5" />
                      <span className="text-[10px] text-slate-400">{index + 1}</span>
                    </div>

                    {/* Category Icon */}
                    <div className={`w-12 h-12 rounded-xl ${getColorClass(category.color)} flex items-center justify-center`}>
                      {category.icon ? (
                        <span className="text-2xl">{category.icon}</span>
                      ) : (
                        <span className="w-4 h-4 rounded-full bg-white/30"></span>
                      )}
                    </div>

                    {/* Category Info */}
                    <div>
                      <h3 className="font-semibold text-slate-900">{category.nameEn}</h3>
                      <p className="text-sm text-slate-500">
                        {category.slug} • {category._count.calculators} calculators
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Move buttons */}
                    <div className="flex flex-col gap-1">
                      <button
                        onClick={() => moveCategory(category, "up")}
                        disabled={index === 0}
                        className="p-1 text-slate-400 hover:text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed"
                        title="Move up"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                      </button>
                      <button
                        onClick={() => moveCategory(category, "down")}
                        disabled={index === categories.length - 1}
                        className="p-1 text-slate-400 hover:text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed"
                        title="Move down"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    </div>

                    <div className="w-px h-8 bg-slate-200" />

                    {/* Show in Menu */}
                    <button
                      onClick={() => toggleField(category, "showInMenu")}
                      className={`p-2 rounded-lg transition-colors ${
                        category.showInMenu
                          ? "bg-blue-100 text-blue-600"
                          : "bg-slate-100 text-slate-400"
                      }`}
                      title={category.showInMenu ? "Visible in menu" : "Hidden from menu"}
                    >
                      <Menu className="w-4 h-4" />
                    </button>

                    {/* Show in Home */}
                    <button
                      onClick={() => toggleField(category, "showInHome")}
                      className={`p-2 rounded-lg transition-colors ${
                        category.showInHome
                          ? "bg-purple-100 text-purple-600"
                          : "bg-slate-100 text-slate-400"
                      }`}
                      title={category.showInHome ? "Visible on homepage" : "Hidden from homepage"}
                    >
                      <Home className="w-4 h-4" />
                    </button>

                    {/* Active Toggle */}
                    <button
                      onClick={() => toggleField(category, "isActive")}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        category.isActive ? "bg-emerald-500" : "bg-slate-200"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          category.isActive ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>

                    {/* Edit */}
                    <button
                      onClick={() => openModal(category)}
                      className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => handleDelete(category)}
                      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {categories.length === 0 && (
              <div className="p-12 text-center text-slate-500">
                No categories yet. Click "New Category" to create one.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200">
              <h2 className="text-lg font-semibold text-slate-900">
                {editing ? "Edit Category" : "New Category"}
              </h2>
            </div>

            <div className="p-6 space-y-4">
              {/* Slug */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Slug *</label>
                <input
                  type="text"
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value.toLowerCase().replace(/\s+/g, "-") })}
                  placeholder="finance"
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  disabled={!!editing}
                />
              </div>

              {/* Name EN */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Name (English) *</label>
                <input
                  type="text"
                  value={form.nameEn}
                  onChange={(e) => setForm({ ...form, nameEn: e.target.value })}
                  placeholder="Finance"
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Name ES & PT */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Name (Spanish)</label>
                  <input
                    type="text"
                    value={form.nameEs}
                    onChange={(e) => setForm({ ...form, nameEs: e.target.value })}
                    placeholder="Finanzas"
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Name (Portuguese)</label>
                  <input
                    type="text"
                    value={form.namePt}
                    onChange={(e) => setForm({ ...form, namePt: e.target.value })}
                    placeholder="Finanças"
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Color */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Color</label>
                <div className="flex flex-wrap gap-2">
                  {COLORS.map((color) => (
                    <button
                      key={color.value}
                      type="button"
                      onClick={() => setForm({ ...form, color: color.value })}
                      className={`w-10 h-10 rounded-lg ${color.bg} transition-all ${
                        form.color === color.value ? "ring-2 ring-offset-2 ring-slate-900" : ""
                      }`}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Calculate your finances..."
                  rows={2}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Toggles */}
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.showInMenu}
                    onChange={(e) => setForm({ ...form, showInMenu: e.target.checked })}
                    className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-slate-700">Show in Menu</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.showInHome}
                    onChange={(e) => setForm({ ...form, showInHome: e.target.checked })}
                    className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-slate-700">Show on Homepage</span>
                </label>
              </div>
            </div>

            <div className="p-6 border-t border-slate-200 flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving || !form.slug || !form.nameEn}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {saving ? "Saving..." : editing ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
