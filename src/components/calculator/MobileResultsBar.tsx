'use client';

import { useState } from 'react';

interface MobileResultsBarProps {
  results?: Record<string, unknown>;
  isVisible?: boolean;
  primaryResult?: {
    label: string;
    value: string | number;
    unit?: string;
  };
  translations?: {
    viewResults?: string;
    hideResults?: string;
  };
}

export function MobileResultsBar({ 
  results, 
  isVisible = true,
  primaryResult,
  translations 
}: MobileResultsBarProps) {
  const [expanded, setExpanded] = useState(false);
  
  const viewResultsText = translations?.viewResults || 'View Results';
  const hideResultsText = translations?.hideResults || 'Hide Results';
  
  if (!isVisible || !results) {
    return null;
  }

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-lg z-30">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-4"
        aria-expanded={expanded}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          {primaryResult ? (
            <div>
              <p className="text-xs text-slate-500">{primaryResult.label}</p>
              <p className="font-bold text-slate-900">
                {primaryResult.value} {primaryResult.unit || ''}
              </p>
            </div>
          ) : (
            <span className="font-medium text-slate-900">
              {expanded ? hideResultsText : viewResultsText}
            </span>
          )}
        </div>
        <svg
          className={`w-5 h-5 text-slate-400 transition-transform ${expanded ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      </button>
      
      {expanded && (
        <div className="p-4 pt-0 border-t border-slate-100 max-h-64 overflow-y-auto">
          <div className="space-y-2">
            {Object.entries(results).map(([key, value]) => {
              if (key === 'isValid' || typeof value === 'object') return null;
              return (
                <div key={key} className="flex justify-between text-sm">
                  <span className="text-slate-500">{key}</span>
                  <span className="font-medium text-slate-900">{String(value)}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default MobileResultsBar;
