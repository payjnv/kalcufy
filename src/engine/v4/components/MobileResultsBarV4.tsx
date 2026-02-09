"use client";
/**
 * MOBILE RESULTS BAR V4 — Design C
 *
 * Same pattern for ALL calculators:
 * Collapsed: Primary number + mini gauge (if zones)
 * Expanded: Full gauge + 3-col grid + 💡 insight (or summary)
 *
 * Keeps: drag to dismiss, share, save
 * Removed: RadialProgress, composition, metrics, context badges
 * Bug fix: Removed isCurrencyField auto-detection
 */

import { useState, useRef, useEffect } from "react";
import type { ResultConfig, TranslationFn } from "@/engine/v4/types/engine.types";
import { useCurrency } from "@/lib/currency-helper";
import { translateText } from "@/engine/v4/utils/common-translations";
import CopyResultsButton from "./CopyResultsButton";

/* ═══════════════════════════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════════════════════════ */

interface Zone {
  start: number;
  end: number;
  label: string;
  color: string;
}

interface CalculatorResults {
  values: Record<string, unknown>;
  formatted: Record<string, string>;
  summary?: string;
  isValid?: boolean;
  zones?: Zone[];
  gaugeValue?: number;
  gaugeMin?: number;
  gaugeMax?: number;
  insight?: string;
  metadata?: { [key: string]: unknown };
  // Keep in type so old code doesn't break
  composition?: unknown;
  context?: unknown;
  metrics?: unknown;
}

interface MobileResultsBarV4Props {
  results: CalculatorResults | null;
  hasCalculated: boolean;
  primaryLabel: string;
  primaryValue: string;
  primaryUnit?: string;
  t: TranslationFn;
  locale?: string;
  onSave?: () => void;
  saveStatus?: "idle" | "saving" | "saved" | "error";
  isLoggedIn?: boolean;
  resultConfigs?: ResultConfig[];
  calculatorName?: string;
}

/* ═══════════════════════════════════════════════════════════════
   MINI GAUGE — compact for collapsed bar
   ═══════════════════════════════════════════════════════════════ */

function MiniGauge({ value, min, max, zones }: { value: number; min: number; max: number; zones: Zone[] }) {
  const pct = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));
  const activeZone = zones.find((z) => value >= z.start && value < z.end) || zones[zones.length - 1];

  return (
    <div className="w-full h-2 rounded-full overflow-hidden bg-slate-100 relative">
      {zones.map((zone, i) => {
        const left = ((zone.start - min) / (max - min)) * 100;
        const width = ((zone.end - zone.start) / (max - min)) * 100;
        return (
          <div key={i} className="absolute top-0 h-full"
            style={{ left: `${left}%`, width: `${width}%`, backgroundColor: zone.color, opacity: 0.18 }} />
        );
      })}
      <div className="absolute top-0 left-0 h-full rounded-full transition-all duration-700 ease-out"
        style={{ width: `${pct}%`, backgroundColor: activeZone.color }} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   FULL GAUGE — for expanded view
   ═══════════════════════════════════════════════════════════════ */

function FullGauge({ value, min, max, zones, t }: { value: number; min: number; max: number; zones: Zone[]; t: TranslationFn }) {
  const pct = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));
  const activeZone = zones.find((z) => value >= z.start && value < z.end) || zones[zones.length - 1];
  const translate = typeof t === "function" ? t : (_k: string, fb?: string) => fb || _k;

  return (
    <div className="w-full">
      <div className="relative h-2.5 rounded-full overflow-hidden bg-slate-100">
        {zones.map((zone, i) => {
          const left = ((zone.start - min) / (max - min)) * 100;
          const width = ((zone.end - zone.start) / (max - min)) * 100;
          return (
            <div key={i} className="absolute top-0 h-full"
              style={{ left: `${left}%`, width: `${width}%`, backgroundColor: zone.color, opacity: 0.18 }} />
          );
        })}
        <div className="absolute top-0 left-0 h-full rounded-full transition-all duration-700 ease-out"
          style={{ width: `${pct}%`, backgroundColor: activeZone.color }} />
        <div className="absolute top-1/2 w-3.5 h-3.5 rounded-full border-2 border-white shadow-md transition-all duration-700 ease-out"
          style={{ left: `${pct}%`, transform: "translate(-50%, -50%)", backgroundColor: activeZone.color }} />
      </div>
      <div className="flex justify-between mt-1.5 px-0.5">
        {zones.map((zone, i) => (
          <span key={i} className="text-[10px] font-semibold tracking-wide"
            style={{ color: zone.color, opacity: value >= zone.start && value < zone.end ? 1 : 0.3 }}>
            {translate(`values.${zone.label}`, zone.label)}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN MOBILE RESULTS BAR
   ═══════════════════════════════════════════════════════════════ */

export default function MobileResultsBarV4({
  results, hasCalculated, primaryLabel, primaryValue, primaryUnit, t,
  locale = "en", onSave, saveStatus = "idle", isLoggedIn, resultConfigs = [],
  calculatorName = "",
}: MobileResultsBarV4Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragY, setDragY] = useState(0);
  const [shareStatus, setShareStatus] = useState<"idle" | "sharing" | "copied">("idle");
  const [contentHeight, setContentHeight] = useState(0);

  const { format: formatCurrency } = useCurrency();
  const translate = typeof t === "function" ? t : (key: string, fallback?: string) => fallback || key;

  const contentRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const startY = useRef(0);
  const currentY = useRef(0);

  const secondaryResults = resultConfigs.filter((r) => r.type === "secondary");
  const hasZones = !!(results?.zones?.length && results.gaugeValue !== undefined);
  const hasInsight = !!results?.insight;

  const translateDynamic = (value: unknown) => {
    if (!value || typeof value !== "string") return value || "";
    let translated = value.replace(
      /\{\{t:([^|}]+)(?:\|([^}]+))?\}\}/g,
      (_, key, fallback) => translate(key, fallback || key)
    );
    translated = translateText(translated, locale);
    return translated;
  };

  const formatValue = (value: unknown, config: { id: string; label: string; format?: string }): string => {
    if (value === null || value === undefined) return "--";
    if (results?.formatted && results.formatted[config.id]) return results.formatted[config.id];
    if (typeof value === "string") return translateDynamic(value) as string;
    const num = Number(value);
    if (isNaN(num)) return String(value);
    switch (config.format) {
      case "currency": return formatCurrency(num, { decimals: 2 });
      case "percentage": return `${num.toFixed(2)}%`;
      default:
        if (Math.abs(num) >= 1000) return num.toLocaleString("en-US", { maximumFractionDigits: 2 });
        return num % 1 === 0 ? String(num) : num.toFixed(2);
    }
  };

  // Measure content
  useEffect(() => {
    if (contentRef.current && isExpanded) setContentHeight(contentRef.current.scrollHeight);
  }, [results, secondaryResults.length, isExpanded]);

  // Lock body scroll
  useEffect(() => {
    if (isExpanded) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isExpanded]);

  if (!results || !hasCalculated) return null;

  // Heights
  const headerHeight = hasZones ? 100 : 88;
  const shareButtonHeight = 130; // Copy + Share buttons
  const maxExpandedHeight = typeof window !== "undefined" ? window.innerHeight * 0.85 : 700;
  const idealExpandedHeight = headerHeight + contentHeight + shareButtonHeight + 16;
  const expandedHeight = Math.min(idealExpandedHeight, maxExpandedHeight);
  const needsScroll = idealExpandedHeight > maxExpandedHeight;

  // Drag handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    startY.current = e.touches[0].clientY;
    currentY.current = 0;
    setIsDragging(true);
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const deltaY = e.touches[0].clientY - startY.current;
    currentY.current = deltaY;
    if (isExpanded && deltaY > 0) setDragY(deltaY * 0.5);
    else if (!isExpanded && deltaY < 0) setDragY(deltaY * 0.3);
  };
  const handleTouchEnd = () => {
    setIsDragging(false);
    const threshold = 50;
    if (isExpanded && currentY.current > threshold) setIsExpanded(false);
    else if (!isExpanded && currentY.current < -threshold) setIsExpanded(true);
    setDragY(0);
  };

  // Share
  const handleShare = async () => {
    setShareStatus("sharing");
    let shareText = `${primaryLabel}: ${primaryValue}${primaryUnit || ""}`;
    secondaryResults.forEach((config) => {
      const fv = formatValue(results.values[config.id], config);
      if (fv && fv !== "--") shareText += `\n${config.label}: ${fv}`;
    });
    if (results.insight) shareText += `\n\n${results.insight}`;
    else if (results.summary) shareText += `\n\n${translateDynamic(results.summary)}`;
    shareText += `\n\n${translate("share.calculatedWith", "Calculated with Kalcufy.com")}`;

    const shareData = { title: primaryLabel, text: shareText, url: window.location.href };
    try {
      if (navigator.share) await navigator.share(shareData);
      else await navigator.clipboard.writeText(shareText + `\n${window.location.href}`);
      setShareStatus("copied");
    } catch {
      try {
        await navigator.clipboard.writeText(shareText + `\n${window.location.href}`);
        setShareStatus("copied");
      } catch { setShareStatus("idle"); }
    }
    setTimeout(() => setShareStatus("idle"), 2000);
  };

  const getCurrentHeight = () => {
    if (isDragging) {
      const baseHeight = isExpanded ? expandedHeight : headerHeight;
      return Math.max(headerHeight, baseHeight - dragY);
    }
    return isExpanded ? expandedHeight : headerHeight;
  };

  /* ═══════════════════════════════════════════════════════════════
     RENDER
     ═══════════════════════════════════════════════════════════════ */
  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ease-out ${
          isExpanded ? "bg-black/40 backdrop-blur-sm pointer-events-auto" : "bg-transparent pointer-events-none"
        }`}
        onClick={() => setIsExpanded(false)}
        aria-hidden="true"
      />

      {/* Bottom Sheet */}
      <div
        ref={sheetRef}
        className={`fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white rounded-t-3xl shadow-2xl ${
          isDragging ? "" : "transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
        }`}
        style={{ height: getCurrentHeight() }}
        role="region"
        aria-label={translate("accessibility.mobileResults", "Results summary")}
      >
        {/* Drag Handle */}
        <div
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full py-3 flex justify-center cursor-grab active:cursor-grabbing touch-none"
        >
          <div className={`w-10 h-1 rounded-full transition-all duration-200 ${isDragging ? "bg-slate-400 w-14" : "bg-slate-300"}`} />
        </div>

        {/* ─── Collapsed: Primary + Mini Gauge ─── */}
        <div className="px-5 pb-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              <p className="text-xs text-slate-500 truncate mb-0.5">
                {translate("results.primary", primaryLabel)}
              </p>
              <p className="text-2xl font-bold text-slate-900 truncate" aria-live="polite">
                {primaryValue}
                {primaryUnit && (
                  <span className="text-base font-normal text-slate-500 ml-1">{primaryUnit}</span>
                )}
              </p>
              {hasZones && (
                <div className="mt-2">
                  <MiniGauge
                    value={results.gaugeValue!}
                    min={results.gaugeMin ?? results.zones![0].start}
                    max={results.gaugeMax ?? results.zones![results.zones!.length - 1].end}
                    zones={results.zones!}
                  />
                </div>
              )}
            </div>
            <div className="flex gap-2 flex-shrink-0">
              {isLoggedIn && onSave && (
                <button
                  onClick={onSave}
                  disabled={saveStatus === "saving"}
                  className={`w-11 h-11 flex items-center justify-center rounded-xl transition-all duration-200 active:scale-95 ${
                    saveStatus === "saved" ? "bg-green-600 text-white" : "bg-blue-600 text-white hover:bg-blue-700"
                  } disabled:opacity-50`}
                  aria-label={translate("buttons.saveResults", "Save results")}
                >
                  {saveStatus === "saving" ? (
                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                  ) : saveStatus === "saved" ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                    </svg>
                  )}
                </button>
              )}
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-11 h-11 flex items-center justify-center border border-slate-200 rounded-xl text-slate-700 hover:bg-slate-50 transition-all duration-200 active:scale-95"
                aria-label={isExpanded ? translate("buttons.hideDetails", "Hide details") : translate("buttons.showDetails", "Show details")}
              >
                <svg className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* ─── Expanded Content ─── */}
        <div
          className={`flex flex-col transition-opacity duration-200 ${
            isExpanded ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          style={{ height: isExpanded ? expandedHeight - headerHeight : 0, overflow: "hidden" }}
        >
          <div
            ref={contentRef}
            className={`flex-1 px-5 border-t border-slate-100 ${needsScroll ? "overflow-y-auto" : ""}`}
          >
            {/* Full Gauge */}
            {hasZones && (
              <div className="pt-4 pb-2">
                <FullGauge
                  value={results.gaugeValue!}
                  min={results.gaugeMin ?? results.zones![0].start}
                  max={results.gaugeMax ?? results.zones![results.zones!.length - 1].end}
                  zones={results.zones!}
                  t={t}
                />
              </div>
            )}

            {/* 3-col grid */}
            {secondaryResults.length > 0 && (
              <div className={`grid gap-2 pt-3 ${
                secondaryResults.length === 1 ? "grid-cols-1" :
                secondaryResults.length === 2 ? "grid-cols-2" :
                "grid-cols-3"
              }`}>
                {secondaryResults.map((config) => {
                  const value = formatValue(results.values[config.id], config);
                  if (!value || value === "--") return null;
                  return (
                    <div key={config.id} className="bg-slate-50 rounded-xl p-2.5">
                      <p className="text-[10px] text-slate-400 font-medium mb-0.5">
                        {translate(`results.${config.id}`, config.label)}
                      </p>
                      <p className="text-sm font-bold text-slate-800">{value}</p>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Insight 💡 or Summary */}
            {hasInsight ? (
              <div className="pt-3 pb-2">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-3.5 border border-blue-100/80">
                  <div className="flex gap-2.5">
                    <span className="text-lg flex-shrink-0">💡</span>
                    <p className="text-[12px] text-slate-700 leading-relaxed">{results.insight}</p>
                  </div>
                </div>
              </div>
            ) : results.summary ? (
              <div className="pt-3 pb-2">
                <div className="bg-blue-50 rounded-xl p-3">
                  <p className="text-xs text-blue-700 leading-relaxed">{translateDynamic(results.summary)}</p>
                </div>
              </div>
            ) : null}
          </div>

          {/* Copy & Share Buttons */}
          <div className="flex-shrink-0 px-5 py-4 bg-white border-t border-slate-100 space-y-2.5">
            {/* Copy Results */}
            <CopyResultsButton
              results={results}
              resultConfigs={resultConfigs}
              calculatorName={calculatorName || primaryLabel}
              t={t}
              locale={locale}
            />
            {/* Share Results */}
            <button
              onClick={handleShare}
              disabled={shareStatus === "sharing"}
              className={`w-full py-3.5 flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 active:scale-[0.98] ${
                shareStatus === "copied"
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
              } disabled:opacity-50`}
              aria-label={translate("buttons.shareResults", "Share results")}
            >
              {shareStatus === "sharing" ? (
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              ) : shareStatus === "copied" ? (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{translate("buttons.copied", "Copied!")}</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  <span>{translate("buttons.shareResults", "Share Results")}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
