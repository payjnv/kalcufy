"use client";

import { useMemo } from "react";

/**
 * DistributionBarsV4 - Barras de distribución visual
 * Diseño idéntico a V3, lee datos directamente
 */

interface DistributionItem {
  id: string;
  label: string;
  value: number;
  max?: number;
  color?: string;
  displayValue?: string;
}

interface DistributionBarsV4Props {
  title: string;
  items: DistributionItem[];
  icon?: string;
  maxValue?: number;
  showPercentage?: boolean;
  gradient?: boolean;
}

// Generate gradient colors from blue to green
function getGradientColor(index: number, total: number): string {
  const colors = [
    'bg-blue-500',
    'bg-blue-400',
    'bg-cyan-500',
    'bg-teal-500',
    'bg-green-500',
    'bg-green-400',
    'bg-emerald-500',
    'bg-emerald-400',
  ];
  return colors[index % colors.length];
}

export default function DistributionBarsV4({ 
  title, 
  items, 
  icon,
  maxValue,
  showPercentage = true,
  gradient = true
}: DistributionBarsV4Props) {
  // Calculate the actual max value for scaling
  const calculatedMax = useMemo(() => {
    if (maxValue) return maxValue;
    return Math.max(...items.map(item => item.max || item.value), 1);
  }, [items, maxValue]);

  if (!items || items.length === 0) return null;

  return (
    <div 
      className="bg-white rounded-2xl border border-slate-200 p-5"
      role="region"
      aria-labelledby="distribution-section"
    >
      <h3 
        id="distribution-section"
        className="font-bold text-slate-900 mb-4 flex items-center gap-2"
      >
        {icon && <span aria-hidden="true">{icon}</span>}
        {title}
      </h3>
      
      <div className="space-y-3">
        {items.map((item, index) => {
          const itemMax = item.max || calculatedMax;
          const percentage = itemMax > 0 ? (item.value / itemMax) * 100 : 0;
          const barColor = item.color || (gradient ? getGradientColor(index, items.length) : 'bg-blue-500');
          
          return (
            <div key={item.id || index} className="space-y-1">
              {/* Label row */}
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-700 font-medium">{item.label}</span>
                <span className="text-slate-900 font-semibold">
                  {item.displayValue || item.value.toLocaleString()}
                  {showPercentage && itemMax && (
                    <span className="text-slate-400 text-xs ml-1">
                      ({percentage.toFixed(0)}%)
                    </span>
                  )}
                </span>
              </div>
              
              {/* Bar */}
              <div 
                className="h-3 bg-slate-100 rounded-full overflow-hidden"
                role="progressbar"
                aria-valuenow={item.value}
                aria-valuemin={0}
                aria-valuemax={itemMax}
                aria-label={`${item.label}: ${item.value}`}
              >
                <div
                  className={`h-full rounded-full transition-all duration-500 ease-out ${barColor}`}
                  style={{ width: `${Math.min(percentage, 100)}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
