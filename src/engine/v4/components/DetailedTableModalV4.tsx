"use client";
/**
 * DETAILED TABLE MODAL V4
 * Expandable button → modal with data table
 * Use cases: formula comparisons, payment schedules, amortization tables, etc.
 * 
 * Ported from V3 DetailedTableModal with V4 translation support.
 */

import { useState } from "react";

export interface DetailedTableColumn {
  id: string;
  label: string;
  align?: "left" | "center" | "right";
  highlight?: boolean;
  format?: "number" | "currency" | "percentage" | "text" | "date";
}

export interface DetailedTableConfig {
  id: string;
  buttonLabel: string;
  buttonIcon?: string;
  modalTitle: string;
  columns: DetailedTableColumn[];
  exportEnabled?: boolean;
}

interface DetailedTableModalV4Props {
  config: DetailedTableConfig;
  data: Record<string, string | number>[];
  t?: (key: string, fallback?: string) => string;
}

export default function DetailedTableModalV4({ config, data, t }: DetailedTableModalV4Props) {
  const [isOpen, setIsOpen] = useState(false);

  const translate = typeof t === "function" ? t : (_key: string, fallback?: string) => fallback || _key;

  if (!config || !data || data.length === 0) return null;

  return (
    <>
      {/* Button to open */}
      <button
        onClick={() => setIsOpen(true)}
        className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-white hover:bg-slate-50 rounded-2xl border border-slate-200 shadow-sm text-slate-700 font-medium transition-colors"
      >
        {config.buttonIcon && <span>{config.buttonIcon}</span>}
        {translate(`detailedTable.${config.id}.button`, config.buttonLabel)}
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Modal Content */}
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <h3 className="text-xl font-bold text-slate-900">
                {translate(`detailedTable.${config.id}.title`, config.modalTitle)}
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                aria-label="Close"
              >
                <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Table */}
            <div className="flex-1 overflow-auto p-6">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    {config.columns.map((col) => (
                      <th
                        key={col.id}
                        className={`py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider ${
                          col.align === "right" ? "text-right" : col.align === "center" ? "text-center" : "text-left"
                        }`}
                      >
                        {translate(`detailedTable.${config.id}.columns.${col.id}`, col.label)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, idx) => (
                    <tr key={idx} className={`border-b border-slate-100 hover:bg-slate-50 ${idx === data.length - 1 ? "bg-blue-50/50 font-medium" : ""}`}>
                      {config.columns.map((col) => (
                        <td
                          key={col.id}
                          className={`py-3 px-4 text-sm ${
                            col.align === "right" ? "text-right" : col.align === "center" ? "text-center" : "text-left"
                          } ${col.highlight ? "text-blue-600 font-semibold" : "text-slate-700"}`}
                        >
                          {row[col.id]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end p-4 border-t border-slate-200 bg-slate-50 rounded-b-2xl">
              <button
                onClick={() => setIsOpen(false)}
                className="px-6 py-2.5 bg-slate-200 hover:bg-slate-300 rounded-lg text-slate-700 font-medium transition-colors"
              >
                {translate("accessibility.closeModal", "Close")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
