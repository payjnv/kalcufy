'use client';

import { CalculatorConfig } from '@/types/calculator.types';

interface ResultRendererProps {
  results: Record<string, unknown> | null;
  config: CalculatorConfig;
  isCalculating?: boolean;
}

export function ResultRenderer({ results, config, isCalculating }: ResultRendererProps) {
  // Loading state
  if (isCalculating) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
          <svg
            className="animate-spin w-10 h-10 text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </div>
        <p className="text-slate-500">Calculating...</p>
      </div>
    );
  }

  // Empty state
  if (!results || !results.isValid) {
    return (
      <div className="text-center py-12" id="calculator-results">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
            />
          </svg>
        </div>
        <p className="text-slate-500">Enter values to see results</p>
      </div>
    );
  }

  const formatted = results.formatted as Record<string, string> | undefined;
  const values = results.values as Record<string, unknown> | undefined;
  const summary = results.summary as string | undefined;
  const metadata = results.metadata as Record<string, unknown> | undefined;

  // Get color based on category
  const getColorClass = () => {
    const colorCategory = metadata?.colorCategory as string;
    switch (colorCategory) {
      case 'success':
        return 'text-emerald-600 bg-emerald-50 border-emerald-200';
      case 'warning':
        return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'danger':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-blue-600 bg-blue-50 border-blue-200';
    }
  };

  return (
    <div className="space-y-6" id="calculator-results">
      {/* Primary Result */}
      {formatted && Object.keys(formatted).length > 0 && (
        <div className="text-center py-6">
          {/* Main Value */}
          {formatted.bmi && (
            <>
              <p className="text-sm font-medium text-slate-500 mb-2 uppercase tracking-wide">
                Your BMI
              </p>
              <p className="text-5xl font-bold text-slate-900 mb-2">
                {formatted.bmi}
              </p>
            </>
          )}
          
          {/* Category Badge */}
          {formatted.category && (
            <div className="mt-4">
              <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold border ${getColorClass()}`}>
                {formatted.category}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Secondary Results Grid */}
      {formatted && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {formatted.healthyRange && (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-center">
              <p className="text-xl font-bold text-slate-900">{formatted.healthyRange}</p>
              <p className="text-sm text-slate-600 mt-1">Healthy Weight Range</p>
            </div>
          )}
          
          {formatted.weightDifference && (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-center">
              <p className="text-xl font-bold text-slate-900">{formatted.weightDifference}</p>
              <p className="text-sm text-slate-600 mt-1">Weight Adjustment</p>
            </div>
          )}
          
          {formatted.bmiPrime && (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-center">
              <p className="text-xl font-bold text-slate-900">{formatted.bmiPrime}</p>
              <p className="text-sm text-slate-600 mt-1">BMI Prime</p>
            </div>
          )}
          
          {formatted.ponderal && (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-center">
              <p className="text-xl font-bold text-slate-900">{formatted.ponderal}</p>
              <p className="text-sm text-slate-600 mt-1">Ponderal Index</p>
            </div>
          )}
        </div>
      )}

      {/* Summary */}
      {summary && (
        <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
          <p className="text-sm text-blue-800">{summary}</p>
        </div>
      )}
    </div>
  );
}

export default ResultRenderer;
