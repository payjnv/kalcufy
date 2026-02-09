"use client";

/**
 * ModeSelectorV4 - Selector de modos de cálculo
 * Diseño idéntico a V3, lee traducciones directamente
 */

interface ModeOption {
  id: string;
  label: string;
  icon?: string;
  description?: string;
}

interface ModeSelectorV4Props {
  modes: ModeOption[];
  currentMode: string;
  onChange: (modeId: string) => void;
  style?: 'tabs' | 'buttons' | 'dropdown';
}

export default function ModeSelectorV4({ 
  modes, 
  currentMode, 
  onChange,
  style = 'buttons'
}: ModeSelectorV4Props) {
  if (!modes || modes.length === 0) return null;

  if (style === 'dropdown') {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-4">
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Calculation Mode
        </label>
        <select
          value={currentMode}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
        >
          {modes.map((mode) => (
            <option key={mode.id} value={mode.id}>
              {mode.icon && `${mode.icon} `}{mode.label}
            </option>
          ))}
        </select>
      </div>
    );
  }

  if (style === 'tabs') {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-2">
        <div className="flex" role="tablist">
          {modes.map((mode) => (
            <button
              key={mode.id}
              role="tab"
              aria-selected={currentMode === mode.id}
              onClick={() => onChange(mode.id)}
              className={`flex-1 py-3 px-4 text-sm font-medium transition-all rounded-xl ${
                currentMode === mode.id
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {mode.icon && <span className="mr-2">{mode.icon}</span>}
              {mode.label}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Default: buttons grid
  const gridCols: Record<number, string> = {
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4">
      <div 
        className={`grid ${gridCols[modes.length] || 'grid-cols-3'} gap-2`}
        role="radiogroup"
        aria-label="Calculation mode"
      >
        {modes.map((mode) => (
          <button
            key={mode.id}
            role="radio"
            aria-checked={currentMode === mode.id}
            onClick={() => onChange(mode.id)}
            className={`py-3 px-4 rounded-xl text-sm font-medium transition-all ${
              currentMode === mode.id
                ? "bg-blue-600 text-white shadow-lg scale-[1.02]"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200 hover:scale-[1.01]"
            }`}
          >
            {mode.icon && <span className="mr-2">{mode.icon}</span>}
            {mode.label}
          </button>
        ))}
      </div>
      {/* Show description of selected mode */}
      {modes.find(m => m.id === currentMode)?.description && (
        <p className="mt-3 text-xs text-slate-500 text-center">
          {modes.find(m => m.id === currentMode)?.description}
        </p>
      )}
    </div>
  );
}
