"use client";

import type { CalculationMode, TranslationFn } from "../types/engine.types";

interface ModeSelectorProps {
  modes: CalculationMode[];
  currentMode: string;
  onChange: (modeId: string) => void;
  style?: 'tabs' | 'buttons' | 'dropdown';
  t: TranslationFn;
}

export default function ModeSelector({ modes, currentMode, onChange, style = 'buttons', t }: ModeSelectorProps) {
  // Buttons style (cards with icons)
  if (style === 'buttons') {
    return (
      <div className="mb-5">
        <label className="block font-medium text-slate-700 mb-2">
          {t("calculator.mode", "Calculate")}
        </label>
        <div 
          className="grid gap-2" 
          style={{ gridTemplateColumns: `repeat(${Math.min(modes.length, 3)}, 1fr)` }}
        >
          {modes.map((mode) => (
            <button
              key={mode.id}
              type="button"
              onClick={() => onChange(mode.id)}
              className={`p-3 rounded-xl border text-center transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                currentMode === mode.id
                  ? "border-blue-500 bg-blue-50"
                  : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              {mode.icon && <span className="text-xl block mb-1">{mode.icon}</span>}
              <span className="text-xs font-medium text-slate-700">
                {t(`modes.${mode.id}.label`, mode.label)}
              </span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Tabs style
  if (style === 'tabs') {
    return (
      <div className="mb-5">
        <div className="flex border-b border-slate-200 overflow-x-auto">
          {modes.map((mode) => (
            <button
              key={mode.id}
              type="button"
              onClick={() => onChange(mode.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-all whitespace-nowrap ${
                currentMode === mode.id
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300"
              }`}
            >
              {mode.icon && <span>{mode.icon}</span>}
              {t(`modes.${mode.id}.label`, mode.label)}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Dropdown style
  if (style === 'dropdown') {
    return (
      <div className="mb-5">
        <label className="block font-medium text-slate-700 mb-2">
          {t("calculator.mode", "Calculate")}
        </label>
        <div className="relative">
          <select
            value={currentMode}
            onChange={(e) => onChange(e.target.value)}
            className="w-full bg-slate-100 rounded-xl px-4 py-3 pr-10 font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
          >
            {modes.map((mode) => (
              <option key={mode.id} value={mode.id}>
                {mode.icon ? `${mode.icon} ` : ""}{t(`modes.${mode.id}.label`, mode.label)}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
