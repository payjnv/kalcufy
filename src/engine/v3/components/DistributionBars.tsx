"use client";

import type { TranslationFn } from "../types/engine.types";

interface DistributionItem {
  id?: string;
  label: string;
  value: number;
  displayValue?: string;
  max?: number;
  color?: string;
}

interface DistributionBarsProps {
  title: string;
  icon?: string;
  items: DistributionItem[];
  maxValue?: number;
  showPercentage?: boolean;
  gradient?: boolean;
  className?: string;
  t?: TranslationFn;
  vizId?: string;
}

export default function DistributionBars({
  title,
  icon,
  items,
  maxValue,
  showPercentage = false,
  gradient = true,
  className = "",
  t,
  vizId,
}: DistributionBarsProps) {
  if (!items || items.length === 0) return null;

  const effectiveMax = maxValue || Math.max(...items.map(i => i.max || i.value)) || 1;

  // Get translated label
  const getLabel = (item: DistributionItem, index: number) => {
    if (t && vizId) {
      const key = item.id || index;
      return t(`visualizations.${vizId}.items.${key}`, item.label);
    }
    return item.label;
  };

  return (
    <div className={`bg-white rounded-2xl border border-slate-200 p-5 ${className}`}>
      <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
        {icon && <span>{icon}</span>}
        {title}
      </h3>
      <div className="space-y-3">
        {items.map((item, index) => {
          const itemMax = item.max || effectiveMax;
          const percentage = itemMax > 0 ? (item.value / itemMax) * 100 : 0;
          
          return (
            <div key={item.id || index} className="flex items-center gap-3">
              {/* Label - wider for longer text */}
              <span 
                className="min-w-[100px] w-28 text-sm text-slate-600 flex-shrink-0" 
                title={getLabel(item, index)}
              >
                {getLabel(item, index)}
              </span>
              
              {/* Bar */}
              <div className="flex-1 h-3 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    item.color 
                      ? item.color 
                      : gradient 
                        ? "bg-gradient-to-r from-blue-500 to-cyan-500" 
                        : "bg-blue-500"
                  }`}
                  style={{ width: `${Math.min(percentage, 100)}%` }}
                />
              </div>
              
              {/* Value - wider for text like "Complete" or "Week 16/13" */}
              <span className="min-w-[70px] text-sm font-semibold text-blue-600 text-right flex-shrink-0">
                {item.displayValue || (showPercentage ? `${Math.round(percentage)}%` : item.value.toFixed(1))}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
