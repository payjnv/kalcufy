"use client";

import { useState, useEffect, useMemo, useRef } from "react";

/**
 * V4 Internal Components - PERFORMANCE OPTIMIZED
 * 
 * Changes:
 * - CollapsibleSection: REMOVED useEffect/window.innerWidth check (caused CLS 0.22)
 *   Since this component is ONLY used inside <div className="md:hidden">,
 *   it always renders on mobile. No need for JS-based mobile detection.
 */

// =============================================================================
// PRESET SELECTOR
// =============================================================================
interface PresetConfig {
  id: string;
  icon?: string;
  values: Record<string, unknown>;
}

interface PresetTranslation {
  label: string;
  description?: string;
}

interface PresetSelectorProps {
  presets: PresetConfig[];
  translations: Record<string, PresetTranslation>;
  onApply: (values: Record<string, unknown>) => void;
  title?: string;
}

export function PresetSelector({
  presets,
  translations,
  onApply,
  title = "Quick Start:"
}: PresetSelectorProps) {
  const [activePreset, setActivePreset] = useState<string | null>(null);
  
  if (!presets || presets.length === 0) return null;

  const handlePresetClick = (preset: PresetConfig) => {
    setActivePreset(preset.id);
    onApply(preset.values);
    setTimeout(() => setActivePreset(null), 400);
  };

  return (
    <div className="mb-4">
      <p className="text-xs font-medium text-slate-500 mb-2">{title}</p>
      <div className="flex flex-wrap gap-1.5">
        {presets.map((preset) => {
          const t = translations[preset.id] || { label: preset.id };
          const isActive = activePreset === preset.id;
          
          return (
            <button
              key={preset.id}
              onClick={() => handlePresetClick(preset)}
              className={`
                inline-flex items-center gap-1 px-2.5 py-1.5
                rounded-lg text-xs font-medium
                transition-all duration-150 ease-out
                ${isActive 
                  ? "bg-blue-600 text-white scale-95" 
                  : "bg-slate-100 text-slate-600 hover:bg-blue-100 hover:text-blue-700 active:scale-95"
                }
              `}
              title={t.description}
            >
              {preset.icon && <span>{preset.icon}</span>}
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// =============================================================================
// COMPARE BUTTON
// =============================================================================
interface CompareButtonProps {
  onClick: () => void;
  label?: string;
}

export function CompareButton({ onClick, label = "Compare Scenarios" }: CompareButtonProps) {
  return (
    <button
      onClick={onClick}
      className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl font-medium transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
    >
      <span>⚖️</span>
      {label}
    </button>
  );
}

// =============================================================================
// COMPARE PANEL
// =============================================================================
interface CalculatorResults {
  values: Record<string, unknown>;
  formatted: Record<string, string>;
  summary?: string;
  isValid: boolean;
}

interface ComparePanelProps {
  isOpen: boolean;
  onClose: () => void;
  scenarioA: Record<string, unknown>;
  scenarioB: Record<string, unknown>;
  resultConfigs: Array<{ id: string; type: string; label: string }>;
  calculate: (data: { values: Record<string, unknown>; units: Record<string, string>; unitSystem: string }) => CalculatorResults;
  labels?: { title?: string; scenarioA?: string; scenarioB?: string; difference?: string; close?: string };
}

export function ComparePanel({
  isOpen,
  onClose,
  scenarioA,
  scenarioB,
  resultConfigs,
  calculate,
  labels = {}
}: ComparePanelProps) {
  const [valuesA, setValuesA] = useState(scenarioA);
  const [valuesB, setValuesB] = useState(scenarioB);

  const resultsA = useMemo(() => {
    try {
      return calculate({ values: valuesA, units: {}, unitSystem: "metric" });
    } catch {
      return null;
    }
  }, [valuesA, calculate]);

  const resultsB = useMemo(() => {
    try {
      return calculate({ values: valuesB, units: {}, unitSystem: "metric" });
    } catch {
      return null;
    }
  }, [valuesB, calculate]);

  if (!isOpen) return null;

  const primaryResult = resultConfigs.find(r => r.type === "primary");
  const primaryId = primaryResult?.id;

  const valueA = primaryId && resultsA ? Number(resultsA.values[primaryId]) : 0;
  const valueB = primaryId && resultsB ? Number(resultsB.values[primaryId]) : 0;
  const diff = valueB - valueA;
  const diffPercent = valueA !== 0 ? ((diff / valueA) * 100).toFixed(1) : "0";

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-200 p-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">
            ⚖️ {labels.title || "Compare Scenarios"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Scenario A */}
            <div className="bg-blue-50 rounded-xl p-4">
              <h3 className="font-semibold text-blue-800 mb-3">
                {labels.scenarioA || "Scenario A"}
              </h3>
              <div className="text-center py-4">
                <p className="text-3xl font-bold text-blue-600">
                  {resultsA?.formatted[primaryId || ""] || "--"}
                </p>
              </div>
            </div>

            {/* Scenario B */}
            <div className="bg-green-50 rounded-xl p-4">
              <h3 className="font-semibold text-green-800 mb-3">
                {labels.scenarioB || "Scenario B"}
              </h3>
              <div className="text-center py-4">
                <p className="text-3xl font-bold text-green-600">
                  {resultsB?.formatted[primaryId || ""] || "--"}
                </p>
              </div>
            </div>
          </div>

          {/* Difference */}
          <div className="mt-6 bg-slate-100 rounded-xl p-4 text-center">
            <p className="text-sm text-slate-600 mb-1">
              {labels.difference || "Difference"}
            </p>
            <p className={`text-2xl font-bold ${diff >= 0 ? "text-green-600" : "text-red-600"}`}>
              {diff >= 0 ? "+" : ""}{diff.toFixed(2)} ({diffPercent}%)
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 p-4">
          <button
            onClick={onClose}
            className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-medium transition-colors"
          >
            {labels.close || "Close"}
          </button>
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// SENSITIVITY CHART
// =============================================================================
interface SensitivityConfig {
  inputId: string;
  resultId: string;
  steps?: number;
  rangePercent?: number;
}

interface SensitivityChartProps {
  config: SensitivityConfig;
  currentValues: Record<string, unknown>;
  calculate: (data: { values: Record<string, unknown>; units: Record<string, string>; unitSystem: string }) => CalculatorResults;
  inputLabel?: string;
  resultLabel?: string;
  title?: string;
}

export function SensitivityChart({
  config,
  currentValues,
  calculate,
  inputLabel,
  resultLabel,
  title = "Sensitivity Analysis",
}: SensitivityChartProps) {
  const { inputId, resultId, steps = 10, rangePercent = 50 } = config;
  const currentValue = Number(currentValues[inputId]) || 0;
  if (currentValue === 0) return null;

  const minVal = currentValue * (1 - rangePercent / 100);
  const maxVal = currentValue * (1 + rangePercent / 100);
  const stepSize = (maxVal - minVal) / steps;

  const dataPoints: { input: number; result: number }[] = [];
  
  for (let i = 0; i <= steps; i++) {
    const inputVal = minVal + stepSize * i;
    try {
      const result = calculate({
        values: { ...currentValues, [inputId]: inputVal },
        units: {},
        unitSystem: "metric",
      });
      dataPoints.push({
        input: inputVal,
        result: Number(result.values[resultId]) || 0,
      });
    } catch {
      // Skip invalid calculations
    }
  }

  if (dataPoints.length === 0) return null;

  const maxResult = Math.max(...dataPoints.map(d => d.result));
  const minResult = Math.min(...dataPoints.map(d => d.result));

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4">
      <h3 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
        📈 {title}
      </h3>
      <p className="text-xs text-slate-500 mb-4">
        How {inputLabel || inputId} affects {resultLabel || resultId}
      </p>
      
      {/* Simple bar chart */}
      <div className="space-y-1">
        {dataPoints.map((point, i) => {
          const width = maxResult > minResult 
            ? ((point.result - minResult) / (maxResult - minResult)) * 100 
            : 50;
          const isCurrent = Math.abs(point.input - currentValue) < stepSize / 2;
          
          return (
            <div key={i} className="flex items-center gap-2 text-xs">
              <span className={`w-12 text-right ${isCurrent ? "font-bold text-blue-600" : "text-slate-500"}`}>
                {point.input.toFixed(1)}
              </span>
              <div className="flex-1 bg-slate-100 rounded h-4 overflow-hidden">
                <div
                  className={`h-full rounded transition-all ${isCurrent ? "bg-blue-500" : "bg-slate-300"}`}
                  style={{ width: `${Math.max(5, width)}%` }}
                />
              </div>
              <span className={`w-16 ${isCurrent ? "font-bold text-blue-600" : "text-slate-600"}`}>
                {point.result.toFixed(0)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// =============================================================================
// COLLAPSIBLE SECTION (Mobile) — PERFORMANCE FIX
// =============================================================================
// BEFORE: Used useState(false) + useEffect(window.innerWidth) which caused:
//   1. First render: isMobile=false → renders desktop layout
//   2. useEffect: isMobile=true → re-renders as mobile
//   3. This shift = CLS 0.22 on PageSpeed
//
// AFTER: Always renders as collapsible (no JS mobile detection needed)
// This component is ONLY used inside <div className="md:hidden"> containers,
// so it's always on mobile. CSS handles desktop visibility at the parent level.
// =============================================================================
interface CollapsibleSectionProps {
  title: string;
  icon?: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
}

export function CollapsibleSection({
  title,
  icon,
  children,
  defaultExpanded = false,
}: CollapsibleSectionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  // Always render as collapsible — parent container handles responsive visibility
  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50 transition-colors"
        aria-expanded={isExpanded}
      >
        <div className="flex items-center gap-2">
          {icon && <span className="text-lg">{icon}</span>}
          <span className="font-semibold text-slate-900">{title}</span>
        </div>
        <svg 
          className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div 
        className={`
          transition-all duration-300 ease-out overflow-hidden
          ${isExpanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        <div className="p-4 pt-0 border-t border-slate-100">
          {children}
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// LAZY SECTION
// =============================================================================
interface LazySectionProps {
  children: React.ReactNode;
  minHeight?: string;
  rootMargin?: string;
}

export function LazySection({ 
  children, 
  minHeight = "200px",
  rootMargin = "100px"
}: LazySectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref} style={{ minHeight: isVisible ? 'auto' : minHeight }}>
      {isVisible ? children : (
        <div className="flex items-center justify-center h-full text-slate-400">
          <div className="w-6 h-6 border-2 border-slate-200 border-t-slate-400 rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}

// =============================================================================
// SHARE WITH VALUES (URL encoding)
// =============================================================================
interface ShareWithValuesProps {
  values: Record<string, unknown>;
  calculatorSlug: string;
  locale: string;
  onShare?: () => void;
  buttonLabel?: string;
  copiedLabel?: string;
}

export function ShareWithValues({
  values,
  calculatorSlug,
  locale,
  onShare,
  buttonLabel = "Share Results",
  copiedLabel = "Copied!"
}: ShareWithValuesProps) {
  const [copied, setCopied] = useState(false);

  const generateShareUrl = () => {
    if (typeof window === 'undefined') return '';
    
    const baseUrl = `${window.location.origin}/${locale}/${calculatorSlug}`;
    const encoded = btoa(JSON.stringify(values));
    return `${baseUrl}?v=${encoded}`;
  };

  const handleShare = async () => {
    const url = generateShareUrl();
    
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      onShare?.();
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleShare}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
        copied 
          ? "bg-green-100 text-green-700" 
          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
      }`}
    >
      {copied ? `✓ ${copiedLabel}` : `🔗 ${buttonLabel}`}
    </button>
  );
}

// Parse values from URL
export function parseValuesFromUrl(searchParams: URLSearchParams | null): Record<string, unknown> | null {
  if (!searchParams) return null;
  
  const encoded = searchParams.get('v');
  if (!encoded) return null;
  
  try {
    return JSON.parse(atob(encoded));
  } catch {
    return null;
  }
}
