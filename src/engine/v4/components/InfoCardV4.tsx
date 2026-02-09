"use client";

import { useMemo } from "react";

/**
 * InfoCardV4 - Tarjeta de información con valores dinámicos
 * Diseño idéntico a V3, lee traducciones directamente
 * 
 * Tipos:
 * - list: Muestra items con labels y valores de resultados
 * - horizontal: Muestra tips/consejos en grid
 * - grid: Similar a horizontal pero con más columnas
 */

interface InfoCardItem {
  label: string;
  valueKey?: string;
  value?: string;
  icon?: string;
  color?: 'default' | 'green' | 'blue' | 'amber' | 'red';
  isCurrency?: boolean;
}

interface CalculatorResults {
  values: Record<string, unknown>;
  formatted: Record<string, string>;
}

interface InfoCardV4Props {
  cardId: string;
  title: string;
  items: InfoCardItem[];
  type: 'list' | 'horizontal' | 'grid';
  icon?: string;
  columns?: number;
  results?: CalculatorResults | null;
}

const COLOR_CLASSES: Record<string, string> = {
  default: 'text-slate-600',
  green: 'text-green-600',
  blue: 'text-blue-600',
  amber: 'text-amber-600',
  red: 'text-red-600',
};

export default function InfoCardV4({ 
  cardId,
  title, 
  items, 
  type,
  icon,
  columns = 2,
  results
}: InfoCardV4Props) {
  // Process items with result values
  const processedItems = useMemo(() => {
    return items.map(item => {
      let displayValue = item.value;
      
      // If there's a valueKey, get the value from results
      if (item.valueKey && results) {
        displayValue = results.formatted[item.valueKey] || 
                       String(results.values[item.valueKey] || '--');
      }
      
      return {
        ...item,
        displayValue
      };
    });
  }, [items, results]);

  if (!items || items.length === 0) return null;

  // TYPE: LIST - Shows items with labels and values from results
  if (type === 'list') {
    return (
      <div 
        className="bg-white rounded-2xl border border-slate-200 p-5"
        role="region"
        aria-labelledby={`infocard-${cardId}`}
      >
        <h3 
          id={`infocard-${cardId}`}
          className="font-bold text-slate-900 mb-4 flex items-center gap-2"
        >
          {icon && <span aria-hidden="true">{icon}</span>}
          {title}
        </h3>
        <div className="space-y-3">
          {processedItems.map((item, index) => (
            <div 
              key={index} 
              className="flex justify-between items-center py-2 border-b border-slate-100 last:border-0"
            >
              <span className={`text-sm ${COLOR_CLASSES[item.color || 'default']}`}>
                {item.icon && <span className="mr-2">{item.icon}</span>}
                {item.label}
              </span>
              {item.displayValue && (
                <span className="font-semibold text-slate-900">
                  {item.displayValue}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // TYPE: HORIZONTAL - Shows tips/advice in a gradient card
  if (type === 'horizontal') {
    const gridCols: Record<number, string> = {
      2: 'grid-cols-1 sm:grid-cols-2',
      3: 'grid-cols-1 sm:grid-cols-3',
      4: 'grid-cols-2 sm:grid-cols-4',
    };

    return (
      <div 
        className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 p-5"
        role="region"
        aria-labelledby={`infocard-${cardId}`}
      >
        <h3 
          id={`infocard-${cardId}`}
          className="font-bold text-slate-900 mb-4 flex items-center gap-2"
        >
          {icon && <span aria-hidden="true">{icon}</span>}
          {title}
        </h3>
        <div className={`grid ${gridCols[columns]} gap-3`}>
          {processedItems.map((item, index) => (
            <div 
              key={index} 
              className="flex items-start gap-2 text-sm text-slate-700"
            >
              <span className="text-blue-500 mt-0.5 flex-shrink-0" aria-hidden="true">
                {item.icon || '•'}
              </span>
              <span className="leading-relaxed">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // TYPE: GRID - Similar to horizontal but different styling
  if (type === 'grid') {
    const gridCols: Record<number, string> = {
      2: 'grid-cols-2',
      3: 'grid-cols-3',
      4: 'grid-cols-2 md:grid-cols-4',
    };

    return (
      <div 
        className="bg-white rounded-2xl border border-slate-200 p-5"
        role="region"
        aria-labelledby={`infocard-${cardId}`}
      >
        <h3 
          id={`infocard-${cardId}`}
          className="font-bold text-slate-900 mb-4 flex items-center gap-2"
        >
          {icon && <span aria-hidden="true">{icon}</span>}
          {title}
        </h3>
        <div className={`grid ${gridCols[columns]} gap-4`}>
          {processedItems.map((item, index) => (
            <div 
              key={index} 
              className="bg-slate-50 rounded-xl p-3 text-center"
            >
              {item.icon && (
                <span className="text-2xl block mb-1" aria-hidden="true">
                  {item.icon}
                </span>
              )}
              <p className="text-xs text-slate-500 mb-1">{item.label}</p>
              {item.displayValue && (
                <p className="font-bold text-slate-900">{item.displayValue}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
}
