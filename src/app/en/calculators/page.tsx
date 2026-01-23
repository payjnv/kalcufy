"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { calculators, getPopularCalculators, getCategoryCount } from "@/config/calculators";

export default function CalculatorsPage() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const counts = getCategoryCount();
  const popularCalcs = getPopularCalculators();

  // Get search param from URL
  useEffect(() => {
    const search = searchParams.get("search");
    const category = searchParams.get("category");
    if (search) setSearchQuery(search);
    if (category) setActiveCategory(category);
  }, [searchParams]);

  // Filter calculators
  const filteredCalculators = calculators.filter((calc) => {
    const matchesSearch = searchQuery === "" || 
      calc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      calc.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = activeCategory === "all" || calc.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  const financeCalcs = filteredCalculators.filter(c => c.category === "finance");
  const healthCalcs = filteredCalculators.filter(c => c.category === "health");

  const categories = [
    { id: "all", name: "All Calculators", count: counts.all },
    { id: "finance", name: "Finance", count: counts.finance },
    { id: "health", name: "Health & Fitness", count: counts.health },
  ];

  return (
    <>
      <Header />

      <main className="pt-20 bg-slate-50 min-h-screen">
        <div className="container py-8">
          <div className="flex gap-8">
            
            {/* Sidebar */}
            <aside className="w-64 flex-shrink-0 hidden lg:block">
              <div className="sticky top-24">
                {/* Search */}
                <div className="relative mb-6">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                    className="w-full px-4 py-2.5 pl-10 border border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none bg-white text-sm"
                  />
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>

                {/* Categories */}
                <div className="mb-8">
                  <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Categories</h3>
                  <nav className="space-y-1">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all ${
                          activeCategory === cat.id 
                            ? "bg-blue-50 text-blue-600 font-medium" 
                            : "text-slate-600 hover:bg-slate-100"
                        }`}
                      >
                        <span>{cat.name}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          activeCategory === cat.id ? "bg-blue-100" : "bg-slate-100"
                        }`}>
                          {cat.count}
                        </span>
                      </button>
                    ))}
                  </nav>
                </div>

                {/* Popular */}
                <div>
                  <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Popular</h3>
                  <nav className="space-y-1">
                    {popularCalcs.map((calc) => (
                      <Link
                        key={calc.slug}
                        href={`/en/${calc.slug}`}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-600 hover:bg-slate-100 transition-all"
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${calc.category === "finance" ? "bg-blue-500" : "bg-emerald-500"}`}></span>
                        <span>{calc.name}</span>
                      </Link>
                    ))}
                  </nav>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {/* Mobile Search */}
              <div className="lg:hidden mb-6">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search calculators..."
                    className="w-full px-4 py-3 pl-11 border border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none bg-white"
                  />
                  <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                
                {/* Mobile Category Tabs */}
                <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                        activeCategory === cat.id 
                          ? "bg-blue-600 text-white" 
                          : "bg-white text-slate-600 border border-slate-200"
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Search Results Info */}
              {searchQuery && (
                <div className="flex items-center justify-between mb-6">
                  <p className="text-slate-500 text-sm">
                    Found {filteredCalculators.length} result{filteredCalculators.length !== 1 ? "s" : ""} for "{searchQuery}"
                  </p>
                  <button 
                    onClick={() => setSearchQuery("")}
                    className="text-blue-600 text-sm font-medium hover:underline"
                  >
                    Clear
                  </button>
                </div>
              )}

              {/* No Results */}
              {filteredCalculators.length === 0 && (
                <div className="text-center py-16 bg-white rounded-xl border border-slate-200">
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">No calculators found</h3>
                  <p className="text-slate-500 mb-4">Try a different search term</p>
                  <button 
                    onClick={() => { setSearchQuery(""); setActiveCategory("all"); }}
                    className="text-blue-600 font-medium hover:underline"
                  >
                    Clear filters
                  </button>
                </div>
              )}

              {/* Finance Calculators */}
              {(activeCategory === "all" || activeCategory === "finance") && financeCalcs.length > 0 && (
                <div className="mb-10">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    <h2 className="text-lg font-bold text-slate-900">Finance</h2>
                    <span className="text-slate-400 text-sm">({financeCalcs.length})</span>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {financeCalcs.map((calc) => (
                      <Link
                        key={calc.slug}
                        href={`/en/${calc.slug}`}
                        className="bg-white rounded-xl p-4 border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all group"
                      >
                        <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 mb-1 text-sm">
                          {calc.name}
                        </h3>
                        <p className="text-slate-400 text-xs line-clamp-2">{calc.description}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Health Calculators */}
              {(activeCategory === "all" || activeCategory === "health") && healthCalcs.length > 0 && (
                <div className="mb-10">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <h2 className="text-lg font-bold text-slate-900">Health & Fitness</h2>
                    <span className="text-slate-400 text-sm">({healthCalcs.length})</span>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {healthCalcs.map((calc) => (
                      <Link
                        key={calc.slug}
                        href={`/en/${calc.slug}`}
                        className="bg-white rounded-xl p-4 border border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all group"
                      >
                        <h3 className="font-semibold text-slate-900 group-hover:text-emerald-600 mb-1 text-sm">
                          {calc.name}
                        </h3>
                        <p className="text-slate-400 text-xs line-clamp-2">{calc.description}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
