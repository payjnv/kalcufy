"use client";

/**
 * COPY RESULTS BUTTON V4
 * 
 * A modern "Copy Results" button that copies all calculator results
 * to the clipboard in a beautifully formatted way.
 * 
 * Features:
 * - Copies rich formatted text (looks great when pasted in WhatsApp, iMessage, Notes, etc.)
 * - Animated feedback (icon morphs from clipboard → checkmark)
 * - Works on all mobile browsers
 * - Translatable labels
 * - Sits alongside "Share Results" button
 * 
 * Usage in CalculatorEngineV4:
 *   <CopyResultsButton
 *     results={results}
 *     resultConfigs={config.results}
 *     calculatorName={translations.name}
 *     t={t}
 *   />
 */

import { useState, useCallback } from "react";

interface ResultConfig {
  id: string;
  label: string;
  type: "primary" | "secondary";
  format?: string;
  suffix?: string;
  prefix?: string;
}

interface CalculatorResults {
  values: Record<string, unknown>;
  formatted: Record<string, string>;
  summary?: string;
  isValid?: boolean;
}

interface CopyResultsButtonProps {
  results: CalculatorResults | null;
  resultConfigs: ResultConfig[];
  calculatorName: string;
  t: (key: string, fallback?: string) => string;
  locale?: string;
}

export default function CopyResultsButton({
  results,
  resultConfigs,
  calculatorName,
  t,
}: CopyResultsButtonProps) {
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied">("idle");

  const buildCopyText = useCallback((): string => {
    if (!results || !results.isValid) return "";

    const lines: string[] = [];

    // Header with calculator name
    lines.push(`📊 ${calculatorName}`);
    lines.push("─".repeat(28));

    // Primary result first (big number)
    const primaryConfig = resultConfigs.find((r) => r.type === "primary");
    if (primaryConfig) {
      const primaryValue = results.formatted[primaryConfig.id] || "";
      const primaryLabel = t(
        `results.${primaryConfig.id}.label`,
        primaryConfig.label
      );
      lines.push(`✦ ${primaryLabel}: ${primaryValue}`);
    }

    // Secondary results
    const secondaryConfigs = resultConfigs.filter(
      (r) => r.type === "secondary"
    );
    if (secondaryConfigs.length > 0) {
      lines.push("");
      secondaryConfigs.forEach((config) => {
        const value = results.formatted[config.id];
        if (value) {
          const label = t(`results.${config.id}.label`, config.label);
          lines.push(`• ${label}: ${value}`);
        }
      });
    }

    // Summary
    if (results.summary) {
      lines.push("");
      lines.push(`💬 ${results.summary}`);
    }

    // Footer
    lines.push("");
    lines.push("─".repeat(28));
    lines.push(`${t("share.calculatedWith", "Calculated with Kalcufy.com")}`);
    lines.push(typeof window !== "undefined" ? window.location.href : "");

    return lines.join("\n");
  }, [results, resultConfigs, calculatorName, t]);

  const handleCopy = useCallback(async () => {
    const text = buildCopyText();
    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);
      setCopyStatus("copied");
      setTimeout(() => setCopyStatus("idle"), 2200);
    } catch {
      // Fallback for older browsers / HTTP
      try {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        textArea.style.top = "-9999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        setCopyStatus("copied");
        setTimeout(() => setCopyStatus("idle"), 2200);
      } catch {
        // Silent fail
      }
    }
  }, [buildCopyText]);

  if (!results || !results.isValid) return null;

  const isCopied = copyStatus === "copied";

  return (
    <button
      onClick={handleCopy}
      className={`
        w-full py-3 flex items-center justify-center gap-2.5
        rounded-xl text-sm font-medium
        transition-all duration-300 ease-out
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        ${
          isCopied
            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
            : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-slate-300 active:scale-[0.98]"
        }
      `}
      aria-label={
        isCopied
          ? t("buttons.copied", "Copied!")
          : t("buttons.copyResults", "Copy Results")
      }
    >
      {/* Icon with morph animation */}
      <span className="relative w-5 h-5 flex-shrink-0">
        {/* Clipboard icon (default) */}
        <svg
          className={`absolute inset-0 w-5 h-5 transition-all duration-300 ${
            isCopied
              ? "opacity-0 scale-50 rotate-12"
              : "opacity-100 scale-100 rotate-0"
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={1.8}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
          />
        </svg>

        {/* Checkmark icon (copied) */}
        <svg
          className={`absolute inset-0 w-5 h-5 transition-all duration-300 ${
            isCopied
              ? "opacity-100 scale-100 rotate-0"
              : "opacity-0 scale-50 -rotate-12"
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={2.2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </span>

      {/* Label with crossfade */}
      <span className="relative overflow-hidden" style={{ minWidth: "100px" }}>
        <span
          className={`block transition-all duration-300 ${
            isCopied
              ? "opacity-0 -translate-y-4"
              : "opacity-100 translate-y-0"
          }`}
        >
          {t("buttons.copyResults", "Copy Results")}
        </span>
        <span
          className={`absolute inset-0 flex items-center transition-all duration-300 ${
            isCopied
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
        >
          {t("buttons.copied", "Copied!")}
        </span>
      </span>
    </button>
  );
}
