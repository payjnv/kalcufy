"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface BlogCategory {
  id: string;
  slug: string;
  nameEn: string;
  nameEs: string | null;
  namePt: string | null;
  icon: string | null;
  color: string;
  isActive: boolean;
  sortOrder: number;
  _count?: { posts: number };
  createdAt: string;
}

const colorOptions = [
  { value: "blue", label: "Blue", class: "bg-blue-100 text-blue-700 border-blue-300" },
  { value: "green", label: "Green", class: "bg-emerald-100 text-emerald-700 border-emerald-300" },
  { value: "purple", label: "Purple", class: "bg-purple-100 text-purple-700 border-purple-300" },
  { value: "amber", label: "Amber", class: "bg-amber-100 text-amber-800 border-amber-300" },
  { value: "red", label: "Red", class: "bg-red-100 text-red-700 border-red-300" },
  { value: "indigo", label: "Indigo", class: "bg-indigo-100 text-indigo-700 border-indigo-300" },
  { value: "cyan", label: "Cyan", class: "bg-cyan-100 text-cyan-700 border-cyan-300" },
  { value: "pink", label: "Pink", class: "bg-pink-100 text-pink-700 border-pink-300" },
];

const iconOptions = ["💰", "💪", "💡", "📰", "📚", "🎯", "⚡", "🔥", "✨", "📊", "🏦", "❤️", "🧮", "📈", "🎓"];

const colorClasses: Record<string, string> = {
  blue: "bg-blue-100 text-blue-700",
  green: "bg-emerald-100 text-emerald-700",
  purple: "bg-purple-100 text-purple-700",
  amber: "bg-amber-100 text-amber-800",
  red: "bg-red-100 text-red-700",
  indigo: "bg-indigo-100 text-indigo-700",
  cyan: "bg-cyan-100 text-cyan-700",
  pink: "bg-pink-100 text-pink-700",
};

export default function AdminBlogCategoriesPage() {
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<BlogCategory | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  
  const [form, setForm] = useState({
    nameEn: "",
    nameEs: "",
    namePt: "",
    slug: "",
    icon: "💰",
    color: "blue",
    isActive: true,
    sortOrder: 0,
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/admin/blog/categories");
      const data = await res.json();
      setCategories(data.categories || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
    setLoading(false);
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  };

  const handleNameChange = (value: string) => {
    setForm(prev => ({
      ...prev,
      nameEn: value,
      slug: generateSlug(value),
    }));
  };

  const openCreateModal = () => {
    setEditingCategory(null);
    setForm({
      nameEn: "",
      nameEs: "",
      namePt: "",
      slug: "",
      icon: "💰",
      color: "blue",
      isActive: true,
      sortOrder: categories.length,
    });
    setShowModal(true);
  };

  const openEditModal = (category: BlogCategory) => {
    setEditingCategory(category);
    setForm({
      nameEn: category.nameEn,
      nameEs: category.nameEs || "",
      namePt: category.namePt || "",
      slug: category.slug,
      icon: category.icon || "💰",
      color: category.color,
      isActive: category.isActive,
      sortOrder: category.sortOrder,
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!form.nameEn || !form.slug) {
      alert("Name and slug are required");
      return;
    }

    setSaving(true);
    try {
      const url = editingCategory 
        ? `/api/admin/blog/categories/${editingCategory.id}`
        : "/api/admin/blog/categories";
      
      const method = editingCategory ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Failed to save category");
      }

      setShowModal(false);
      fetchCategories();
    } catch (error: any) {
      alert(error.message);
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/blog/categories/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Failed to delete category");
      }

      setDeleteConfirm(null);
      fetchCategories();
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleToggleActive = async (category: BlogCategory) => {
    try {
      await fetch(`/api/admin/blog/categories/${category.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...category, isActive: !category.isActive }),
      });
      fetchCategories();
    } catch (error) {
      console.error("Error toggling category:", error);
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <Link href="/en/admin/blog" className="text-slate-400 hover:text-slate-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <h1 className="text-2xl font-bold text-slate-900">Blog Categories</h1>
          </div>
          <p className="text-slate-600">Manage categories for your blog posts</p>
        </div>
        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Category
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{categories.length}</p>
              <p className="text-sm text-slate-600">Total Categories</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
              <svg className="w-5 h-5 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{categories.filter(c => c.isActive).length}</p>
              <p className="text-sm text-slate-600">Active</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
              <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{categories.reduce((sum, c) => sum + (c._count?.posts || 0), 0)}</p>
              <p className="text-sm text-slate-600">Total Posts</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
              <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{categories.filter(c => !c.isActive).length}</p>
              <p className="text-sm text-slate-600">Inactive</p>
            </div>
          </div>
        </div>
      </div>

      {/* Categories List */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <div className="w-10 h-10 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-slate-600 mt-3">Loading categories...</p>
          </div>
        ) : categories.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-1">No categories yet</h3>
            <p className="text-slate-600 mb-4">Create your first category to organize your blog posts</p>
            <button
              onClick={openCreateModal}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create your first category
            </button>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Category</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Slug</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-slate-600">Posts</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-slate-600">Status</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Created</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-slate-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {categories.map((category) => (
                <tr key={category.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <span className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg ${colorClasses[category.color] || colorClasses.blue}`}>
                        {category.icon || "📁"}
                      </span>
                      <div>
                        <p className="font-medium text-slate-900">{category.nameEn}</p>
                        {category.nameEs && (
                          <p className="text-xs text-slate-600">ES: {category.nameEs}</p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <code className="text-sm bg-slate-100 px-2 py-1 rounded text-slate-600">/{category.slug}</code>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="inline-flex items-center justify-center min-w-[2rem] px-2 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-medium">
                      {category._count?.posts || 0}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => handleToggleActive(category)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-sm font-medium transition-colors ${
                        category.isActive
                          ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${category.isActive ? "bg-emerald-500" : "bg-slate-400"}`}></span>
                      {category.isActive ? "Active" : "Inactive"}
                    </button>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-slate-600 text-sm">{formatDate(category.createdAt)}</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => openEditModal(category)}
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      {deleteConfirm === category.id ? (
                        <div className="flex items-center gap-1 bg-red-50 rounded-lg p-1">
                          <button
                            onClick={() => handleDelete(category.id)}
                            className="px-2 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700 font-medium"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(null)}
                            className="px-2 py-1 text-xs text-slate-600 hover:text-slate-800 font-medium"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeleteConfirm(category.id)}
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                          disabled={(category._count?.posts || 0) > 0}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Note about deleting */}
      {categories.some(c => (c._count?.posts || 0) > 0) && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-amber-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div>
              <p className="font-medium text-amber-800">Categories with posts cannot be deleted</p>
              <p className="text-sm text-amber-800 mt-1">Move or delete all posts from a category before deleting it.</p>
            </div>
          </div>
        </div>
      )}

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200">
              <h2 className="text-xl font-bold text-slate-900">
                {editingCategory ? "Edit Category" : "New Category"}
              </h2>
            </div>
            
            <div className="p-6 space-y-5">
              {/* Name EN */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Name (English) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.nameEn}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="e.g. Finance"
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Slug */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Slug <span className="text-red-500">*</span>
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 bg-slate-100 border border-r-0 border-slate-300 rounded-l-lg text-slate-600 text-sm">
                    /blog/category/
                  </span>
                  <input
                    type="text"
                    value={form.slug}
                    onChange={(e) => setForm(prev => ({ ...prev, slug: e.target.value }))}
                    placeholder="finance"
                    className="flex-1 px-4 py-2.5 border border-slate-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Name ES & PT */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Name (Spanish)</label>
                  <input
                    type="text"
                    value={form.nameEs}
                    onChange={(e) => setForm(prev => ({ ...prev, nameEs: e.target.value }))}
                    placeholder="e.g. Finanzas"
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Name (Portuguese)</label>
                  <input
                    type="text"
                    value={form.namePt}
                    onChange={(e) => setForm(prev => ({ ...prev, namePt: e.target.value }))}
                    placeholder="e.g. Finanças"
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Icon */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Icon</label>
                <div className="flex flex-wrap gap-2">
                  {iconOptions.map((icon) => (
                    <button
                      key={icon}
                      type="button"
                      onClick={() => setForm(prev => ({ ...prev, icon }))}
                      className={`w-10 h-10 rounded-lg border-2 text-xl flex items-center justify-center transition-all ${
                        form.icon === icon
                          ? "border-blue-500 bg-blue-50"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Color</label>
                <div className="flex flex-wrap gap-2">
                  {colorOptions.map((color) => (
                    <button
                      key={color.value}
                      type="button"
                      onClick={() => setForm(prev => ({ ...prev, color: color.value }))}
                      className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all ${color.class} ${
                        form.color === color.value
                          ? "ring-2 ring-offset-2 ring-blue-500"
                          : ""
                      }`}
                    >
                      {color.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Preview */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Preview</label>
                <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg">
                  <span className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg ${colorClasses[form.color] || colorClasses.blue}`}>
                    {form.icon}
                  </span>
                  <span className={`px-3 py-1.5 rounded-lg text-sm font-medium ${colorClasses[form.color] || colorClasses.blue}`}>
                    {form.nameEn || "Category Name"}
                  </span>
                </div>
              </div>

              {/* Active */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setForm(prev => ({ ...prev, isActive: !prev.isActive }))}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    form.isActive ? "bg-blue-600" : "bg-slate-300"
                  }`}
                >
                  <span
                    className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      form.isActive ? "left-7" : "left-1"
                    }`}
                  />
                </button>
                <span className="text-sm text-slate-700">Active (visible on blog)</span>
              </div>
            </div>

            <div className="p-6 border-t border-slate-200 flex items-center justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2.5 text-slate-700 hover:bg-slate-100 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors disabled:opacity-50"
              >
                {saving ? "Saving..." : editingCategory ? "Update Category" : "Create Category"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
