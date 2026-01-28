"use client";

import { useState } from "react";

export interface TableColumn {
  id: string;
  label: string;
  align?: "left" | "center" | "right";
  highlight?: boolean; // Color especial (ej: verde para interest)
}

export interface DetailedTableConfig {
  id: string;
  buttonLabel: string;
  buttonIcon?: string;
  modalTitle: string;
  columns: TableColumn[];
  // Los datos se pasan dinámicamente desde calculate()
}

interface DetailedTableModalProps {
  config: DetailedTableConfig;
  data: Record<string, string | number>[];
  isPro?: boolean;
}

export default function DetailedTableModal({ config, data, isPro = false }: DetailedTableModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (!config || !data || data.length === 0) return null;

  return (
    <>
      {/* Botón para abrir */}
      <button
        onClick={() => setIsOpen(true)}
        className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-700 font-medium transition-colors"
      >
        {config.buttonIcon && <span>{config.buttonIcon}</span>}
        {config.buttonLabel}
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
              <h3 className="text-xl font-bold text-slate-900">{config.modalTitle}</h3>
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
                        {col.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, idx) => (
                    <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50">
                      {config.columns.map((col) => (
                        <td 
                          key={col.id}
                          className={`py-3 px-4 text-sm ${
                            col.align === "right" ? "text-right" : col.align === "center" ? "text-center" : "text-left"
                          } ${col.highlight ? "text-emerald-600 font-medium" : "text-slate-700"}`}
                        >
                          {row[col.id]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer con botones PRO */}
            <div className="flex items-center justify-center gap-4 p-6 border-t border-slate-200 bg-slate-50 rounded-b-2xl">
              <button className="flex items-center gap-2 px-6 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download PDF
                <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded font-medium">PRO</span>
              </button>
              <button className="flex items-center gap-2 px-6 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download Excel
                <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded font-medium">PRO</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
