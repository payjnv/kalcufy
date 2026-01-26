"use client";

import { useState } from "react";
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
  // New props for detailed results
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

  if (!results || !hasCalculated) return null;

  const secondaryResults = resultConfigs.filter(r => r.type === "secondary");

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

      {/* Bottom Sheet */}
      <div 
        className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl z-50 md:hidden transition-transform duration-300 ease-out ${
          isExpanded ? "translate-y-0" : "translate-y-[calc(100%-88px)]"
        }`}
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
          className={`overflow-hidden transition-all duration-300 ${
            isExpanded ? "max-h-[60vh] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-5 pb-6 border-t border-slate-100">
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

            {/* Share Button */}
            <button
              onClick={async () => {
                if (navigator.share) {
                  try {
                    await navigator.share({
                      title: primaryLabel,
                      text: `${primaryLabel}: ${primaryValue}${primaryUnit || ""}`,
                      url: window.location.href,
                    });
                  } catch (err) {
                    console.log("Share cancelled");
                  }
                } else {
                  try {
                    await navigator.clipboard.writeText(
                      `${primaryLabel}: ${primaryValue}${primaryUnit || ""} - ${window.location.href}`
                    );
                    alert(t("buttons.copiedToClipboard", "Copied to clipboard!"));
                  } catch (err) {
                    console.error("Failed to copy");
                  }
                }
              }}
              className="w-full mt-4 py-3 flex items-center justify-center gap-2 bg-white border border-slate-200 rounded-xl text-slate-700 hover:bg-slate-50 transition-colors"
              aria-label={t("buttons.shareResults", "Share results")}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              <span className="font-medium">{t("buttons.share", "Share Results")}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Spacer to prevent content from being hidden behind the bar */}
      <div className="h-24 md:hidden" />
    </>
  );
}
