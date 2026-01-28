"use client";

import { useState, useRef, useEffect } from "react";
import type { CalculatorResults, ResultConfig, TranslationFn } from "../types/engine.types";

interface MobileResultsBarProps {
  results: CalculatorResults | null;
  hasCalculated: boolean;
  primaryLabel: string;
  primaryValue: string;
  primaryUnit?: string;
  t: TranslationFn;
  onSave?: () => void;
  saveStatus?: "idle" | "saving" | "saved" | "error";
  isLoggedIn?: boolean;
  resultConfigs?: ResultConfig[];
}

export default function MobileResultsBar({
  results,
  hasCalculated,
  primaryLabel,
  primaryValue,
  primaryUnit,
  t,
  onSave,
  saveStatus = "idle",
  isLoggedIn,
  resultConfigs = [],
}: MobileResultsBarProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [shareStatus, setShareStatus] = useState<"idle" | "sharing" | "copied">("idle");
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  const secondaryResults = resultConfigs.filter(r => r.type === "secondary");

  // Measure content height dynamically
  useEffect(() => {
    if (contentRef.current && isExpanded) {
      const height = contentRef.current.scrollHeight;
      setContentHeight(height);
    }
  }, [results, secondaryResults.length, isExpanded]);

  if (!results || !hasCalculated) return null;

  // Calculate optimal sheet height - fit content, max 85vh
  const headerHeight = 88;
  const shareButtonHeight = 72;
  const maxExpandedHeight = typeof window !== "undefined" ? window.innerHeight * 0.85 : 700;
  const idealExpandedHeight = headerHeight + contentHeight + shareButtonHeight + 16; // 16px padding
  const expandedHeight = Math.min(idealExpandedHeight, maxExpandedHeight);
  const needsScroll = idealExpandedHeight > maxExpandedHeight;

  const handleShare = async () => {
    setShareStatus("sharing");
    
    let shareText = `${primaryLabel}: ${primaryValue}${primaryUnit || ""}`;
    
    secondaryResults.forEach((config) => {
      const value = results.formatted[config.id];
      if (value) {
        shareText += `\n${config.label}: ${value}${config.suffix || ""}`;
      }
    });
    
    if (results.summary) {
      shareText += `\n\n${results.summary}`;
    }
    
    shareText += `\n\nCalculated with Kalcufy.com`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: primaryLabel,
          text: shareText,
          url: window.location.href,
        });
        setShareStatus("copied");
      } catch (err) {
        try {
          await navigator.clipboard.writeText(shareText + `\n${window.location.href}`);
          setShareStatus("copied");
        } catch {
          setShareStatus("idle");
        }
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareText + `\n${window.location.href}`);
        setShareStatus("copied");
      } catch (err) {
        console.error("Failed to copy");
        setShareStatus("idle");
      }
    }
    
    setTimeout(() => setShareStatus("idle"), 2000);
  };

  return (
    <>
      {/* Bottom Sheet Overlay */}
      {isExpanded && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsExpanded(false)}
          aria-hidden="true"
        />
      )}

      {/* Bottom Sheet - Dynamic height based on content */}
      <div 
        className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl z-50 md:hidden transition-all duration-300 ease-out"
        style={{ 
          height: isExpanded ? expandedHeight : headerHeight,
        }}
        role="region"
        aria-label={t("accessibility.mobileResults", "Results summary")}
      >
        {/* Drag Handle */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full py-3 flex justify-center cursor-pointer focus:outline-none"
          aria-label={isExpanded ? t("buttons.collapseResults", "Collapse results") : t("buttons.expandResults", "Expand results")}
          aria-expanded={isExpanded}
        >
          <div className="w-12 h-1.5 bg-slate-300 rounded-full" />
        </button>

        {/* Collapsed View - Always visible */}
        <div className="px-5 pb-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1">
              <p className="text-xs text-slate-500">{primaryLabel}</p>
              <p className="text-2xl font-bold text-slate-900" aria-live="polite">
                {primaryValue}
                {primaryUnit && <span className="text-base font-normal text-slate-500 ml-1">{primaryUnit}</span>}
              </p>
            </div>
            <div className="flex gap-2">
              {isLoggedIn && onSave && (
                <button
                  onClick={onSave}
                  disabled={saveStatus === "saving"}
                  className="w-11 h-11 flex items-center justify-center bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50"
                  aria-label={t("buttons.saveResults", "Save results")}
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
                className="w-11 h-11 flex items-center justify-center border border-slate-200 rounded-xl text-slate-700 hover:bg-slate-50 transition-colors"
                aria-label={isExpanded ? t("buttons.hideDetails", "Hide details") : t("buttons.showDetails", "Show details")}
              >
                <svg 
                  className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Expanded Content */}
        <div 
          className={`flex flex-col transition-opacity duration-300 ${
            isExpanded ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          style={{ 
            height: isExpanded ? expandedHeight - headerHeight : 0,
            overflow: "hidden"
          }}
        >
          {/* Content Area - scrollable only if needed */}
          <div 
            ref={contentRef}
            className={`flex-1 px-5 border-t border-slate-100 ${needsScroll ? "overflow-y-auto" : ""}`}
          >
            {/* Secondary Results Grid */}
            {secondaryResults.length > 0 && (
              <div className="grid grid-cols-2 gap-3 pt-4">
                {secondaryResults.map((config) => {
                  const value = results.formatted[config.id];
                  if (!value) return null;
                  return (
                    <div 
                      key={config.id} 
                      className="bg-slate-50 rounded-xl p-4 text-center"
                    >
                      <p className="text-xs text-slate-500 mb-1">{config.label}</p>
                      <p className="text-lg font-bold text-slate-800">
                        {config.icon && <span className="mr-1">{config.icon}</span>}
                        {config.prefix && <span>{config.prefix}</span>}
                        {value}
                        {config.suffix && <span className="text-sm font-normal text-slate-500 ml-1">{config.suffix}</span>}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Summary */}
            {results.summary && (
              <div className="mt-4 p-4 bg-blue-50 rounded-xl">
                <p className="text-sm text-blue-800">{results.summary}</p>
              </div>
            )}
          </div>

          {/* Share Button - Always at bottom, no extra space */}
          <div className="flex-shrink-0 px-5 py-4 bg-white border-t border-slate-100">
            <button
              onClick={handleShare}
              disabled={shareStatus === "sharing"}
              className="w-full py-3.5 flex items-center justify-center gap-2 bg-white border border-slate-200 rounded-xl text-slate-700 hover:bg-slate-50 transition-colors disabled:opacity-50"
              aria-label={t("buttons.shareResults", "Share results")}
            >
              {shareStatus === "sharing" ? (
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              ) : shareStatus === "copied" ? (
                <>
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="font-medium text-green-600">{t("buttons.copied", "Copied!")}</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  <span className="font-medium">{t("buttons.shareResults", "Share Results")}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Spacer */}
      <div className="h-24 md:hidden" />
    </>
  );
}
