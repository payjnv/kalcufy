"use client";

import type { TranslationFn } from "../types/engine.types";

interface ReferenceItem {
  id?: string;
  label: string;
  value: string | number;
  highlight?: boolean;
  icon?: string;
}

interface ReferenceGridProps {
  title: string;
  icon?: string;
  items: ReferenceItem[];
  columns?: 2 | 3 | 4 | 5 | 6;
  highlightValue?: string | number;
  className?: string;
  t?: TranslationFn;
  refId?: string;
}

export default function ReferenceGrid({
  title,
  icon,
  items,
  columns = 4,
  highlightValue,
  className = "",
  t,
  refId,
}: ReferenceGridProps) {
  if (!items || items.length === 0) return null;

  const gridCols: Record<number, string> = {
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
    5: "grid-cols-5",
    6: "grid-cols-6",
  };

  // Get translated label
  const getLabel = (item: ReferenceItem, index: number) => {
    if (t && refId) {
      const key = item.id || index;
      return t(`reference.${refId}.items.${key}`, item.label);
    }
    return item.label;
  };

  return (
    <div className={`bg-white rounded-2xl border border-slate-200 p-5 ${className}`}>
      <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
        {icon && <span>{icon}</span>}
        {title}
      </h3>
      <div className={`grid ${gridCols[columns]} gap-2 text-sm`}>
        {items.map((item, index) => {
          const isHighlighted = item.highlight || item.label === highlightValue || item.value === highlightValue;
          
          return (
            <div 
              key={index} 
              className={`rounded-lg p-2 text-center transition-all ${
                isHighlighted 
                  ? "bg-blue-100 ring-2 ring-blue-500" 
                  : "bg-slate-50"
              }`}
            >
              {item.icon && <span className="block text-lg mb-1">{item.icon}</span>}
              <span className="font-bold text-blue-600">{getLabel(item, index)}</span>
              <span className="text-slate-600 ml-1">= {item.value}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
