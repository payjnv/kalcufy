"use client";

import { useState, useRef, useEffect } from "react";
import { VALID_CALCULATORS, ValidCalculator } from "@/lib/valid-calculators";

interface CalculatorSelectorProps {
  value: string | null;
  onChange: (value: string | null) => void;
  locale?: string;
  label?: string;
  placeholder?: string;
  error?: string;
}

export default function CalculatorSelector({
  value,
  onChange,
  locale = "en",
  label = "Related Calculator",
  placeholder = "Select a calculator (optional)",
  error,
}: CalculatorSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Get calculator name based on locale
  const getCalcName = (calc: ValidCalculator): string => {
    switch (locale) {
      case "es":
        return calc.nameEs;
      case "pt":
        return calc.namePt;
      default:
        return calc.nameEn;
    }
  };

  // Filter calculators based on search
  const filteredCalculators = VALID_CALCULATORS.filter((calc) => {
    const searchLower = search.toLowerCase();
    return (
      calc.nameEn.toLowerCase().includes(searchLower) ||
      calc.nameEs.toLowerCase().includes(searchLower) ||
      calc.namePt.toLowerCase().includes(searchLower) ||
      calc.slug.toLowerCase().includes(searchLower)
    );
  });

  // Group calculators by category
  const financeCalcs = filteredCalculators.filter((c) => c.category === "finance");
  const healthCalcs = filteredCalculators.filter((c) => c.category === "health");

  // Get selected calculator
  const selectedCalc = value ? VALID_CALCULATORS.find((c) => c.slug === value) : null;

  return (
    <div className="space-y-1.5" ref={containerRef}>
      {/* Label */}
      {label && (
        <label className="block text-sm font-medium text-slate-700">
          {label}
        </label>
      )}

      {/* Selector Button */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full flex items-center justify-between gap-2 px-4 py-2.5 bg-white border rounded-lg text-left transition-colors ${
            error
              ? "border-red-300 focus:border-red-500 focus:ring-red-500"
              : "border-slate-300 hover:border-slate-400 focus:border-blue-500 focus:ring-blue-500"
          } focus:outline-none focus:ring-2 focus:ring-opacity-20`}
        >
          {selectedCalc ? (
            <span className="flex items-center gap-2">
              <span>{selectedCalc.icon}</span>
              <span className="text-slate-900">{getCalcName(selectedCalc)}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                selectedCalc.category === "finance" 
                  ? "bg-blue-100 text-blue-700" 
                  : "bg-emerald-100 text-emerald-700"
              }`}>
                {selectedCalc.category === "finance" ? "Finance" : "Health"}
              </span>
            </span>
          ) : (
            <span className="text-slate-400">{placeholder}</span>
          )}
          <svg
            className={`w-5 h-5 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Dropdown */}
        {isOpen && (
          <div className="absolute z-50 mt-1 w-full bg-white border border-slate-200 rounded-lg shadow-lg overflow-hidden">
            {/* Search */}
            <div className="p-2 border-b border-slate-100">
              <input
                type="text"
                placeholder="Search calculators..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:border-blue-500"
                autoFocus
              />
            </div>

            {/* Options */}
            <div className="max-h-64 overflow-y-auto">
              {/* Clear option */}
              <button
                type="button"
                onClick={() => {
                  onChange(null);
                  setIsOpen(false);
                  setSearch("");
                }}
                className="w-full px-4 py-2.5 text-left text-sm text-slate-500 hover:bg-slate-50 flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                No calculator (clear selection)
              </button>

              {/* Finance Section */}
              {financeCalcs.length > 0 && (
                <>
                  <div className="px-4 py-2 text-xs font-semibold text-slate-400 uppercase bg-slate-50">
                    💰 Finance
                  </div>
                  {financeCalcs.map((calc) => (
                    <button
                      key={calc.slug}
                      type="button"
                      onClick={() => {
                        onChange(calc.slug);
                        setIsOpen(false);
                        setSearch("");
                      }}
                      className={`w-full px-4 py-2.5 text-left text-sm hover:bg-blue-50 flex items-center gap-2 ${
                        value === calc.slug ? "bg-blue-50 text-blue-700" : "text-slate-700"
                      }`}
                    >
                      <span>{calc.icon}</span>
                      <span className="flex-1">{getCalcName(calc)}</span>
                      {value === calc.slug && (
                        <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>
                  ))}
                </>
              )}

              {/* Health Section */}
              {healthCalcs.length > 0 && (
                <>
                  <div className="px-4 py-2 text-xs font-semibold text-slate-400 uppercase bg-slate-50">
                    🏥 Health
                  </div>
                  {healthCalcs.map((calc) => (
                    <button
                      key={calc.slug}
                      type="button"
                      onClick={() => {
                        onChange(calc.slug);
                        setIsOpen(false);
                        setSearch("");
                      }}
                      className={`w-full px-4 py-2.5 text-left text-sm hover:bg-emerald-50 flex items-center gap-2 ${
                        value === calc.slug ? "bg-emerald-50 text-emerald-700" : "text-slate-700"
                      }`}
                    >
                      <span>{calc.icon}</span>
                      <span className="flex-1">{getCalcName(calc)}</span>
                      {value === calc.slug && (
                        <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>
                  ))}
                </>
              )}

              {/* No results */}
              {filteredCalculators.length === 0 && (
                <div className="px-4 py-6 text-center text-sm text-slate-400">
                  No calculators found
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Error message */}
      {error && <p className="text-sm text-red-600">{error}</p>}

      {/* Hint */}
      {selectedCalc && (
        <p className="text-xs text-slate-500">
          Slug: <code className="bg-slate-100 px-1 py-0.5 rounded">{selectedCalc.slug}</code>
        </p>
      )}
    </div>
  );
}
