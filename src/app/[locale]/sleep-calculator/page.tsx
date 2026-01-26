"use client";

import { useLocale } from "next-intl";
import { CalculatorEngineV3 } from "@/engine/v3";
import { sleepCalculatorConfig, calculateSleep } from "@/config/calculators/v3/sleep.config";
import { useCalcTranslations } from "@/lib/useCalcTranslations";
import type { CalculatorResults } from "@/engine/v3/types/engine.types";

export default function SleepCalculatorPage() {
  const locale = useLocale();
  const { t } = useCalcTranslations(locale, "sleep-calculator");

  // Custom results display with all sleep time options
  const getCustomResultsComponent = (results: CalculatorResults) => {
    if (!results?.metadata?.allTimes) return null;
    
    const allTimes = results.metadata.allTimes as Array<{
      time: string;
      label: string;
      quality: string;
      isOptimal: boolean;
    }>;
    
    const modeLabel = results.metadata.modeLabel as string;
    
    return (
      <div className="mt-4 space-y-2">
        <h4 className="text-sm font-medium text-slate-600">{modeLabel} Options:</h4>
        <div className="grid gap-2">
          {allTimes.map((option, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg border ${
                option.isOptimal
                  ? "border-green-300 bg-green-50"
                  : option.quality === "Good"
                  ? "border-blue-200 bg-blue-50"
                  : option.quality === "Acceptable"
                  ? "border-yellow-200 bg-yellow-50"
                  : "border-slate-200 bg-slate-50"
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-900">{option.time}</span>
                <span
                  className={`text-xs px-2 py-1 rounded-full font-medium ${
                    option.isOptimal
                      ? "bg-green-200 text-green-800"
                      : option.quality === "Good"
                      ? "bg-blue-200 text-blue-800"
                      : option.quality === "Acceptable"
                      ? "bg-yellow-200 text-yellow-800"
                      : "bg-slate-200 text-slate-600"
                  }`}
                >
                  {option.quality}
                </span>
              </div>
              <span className="text-sm text-slate-600">{option.label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <CalculatorEngineV3
      config={sleepCalculatorConfig}
      calculate={calculateSleep}
      t={t}
      getCustomResultsComponent={getCustomResultsComponent}
    />
  );
}
