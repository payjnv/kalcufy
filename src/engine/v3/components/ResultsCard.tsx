"use client";

import { useSession } from "next-auth/react";
import type { ResultConfig, CalculatorResults, TranslationFn, DetailedTableConfig } from "../types/engine.types";
import DetailedTableModal from "./DetailedTableModal";

interface ResultsCardProps {
  results: CalculatorResults | null;
  resultConfigs: ResultConfig[];
  isCalculating: boolean;
  hasCalculated: boolean;
  t: TranslationFn;
  showActions?: boolean;
  formulaResults?: Array<{ name: string; value: number; description?: string }>;
  rangeVisualization?: {
    current: number;
    ideal: number;
    min: number;
    max: number;
    rangeMin: number;
    rangeMax: number;
    unit: string;
  } | null;
  frameSizeData?: { current: string; gender: string };
  weightUnit?: string;
  // NEW: Detailed Table support
  detailedTable?: DetailedTableConfig;
  detailedTableData?: Record<string, string | number>[];
}

export default function ResultsCard({
  results,
  resultConfigs,
  isCalculating,
  hasCalculated,
  t,
  showActions = true,
  formulaResults,
  rangeVisualization,
  frameSizeData,
  weightUnit = "lbs",
  detailedTable,
  detailedTableData,
}: ResultsCardProps) {
  const { data: session } = useSession();

  if (isCalculating) {
    return (
      <div className="bg-slate-50 rounded-2xl border border-slate-200 p-8 text-center" role="status" aria-live="polite">
        <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4" aria-hidden="true" />
        <p className="text-slate-600">{t("results.calculating", "Calculating...")}</p>
      </div>
    );
  }

  if (!results || !hasCalculated) {
    return (
      <div className="bg-slate-50 rounded-2xl border border-slate-200 p-8 text-center" role="status">
        <div className="text-4xl mb-4" aria-hidden="true">🧮</div>
        <p className="text-slate-600">{t("results.enterValues", "Enter values to see results")}</p>
      </div>
    );
  }

  const primaryResult = resultConfigs.find(r => r.type === "primary");
  const secondaryResults = resultConfigs.filter(r => r.type === "secondary");
  const primaryValue = primaryResult ? results.formatted[primaryResult.id] : null;
  
  // Determine if this is a weight calculator (for backward compatibility)
  const isWeightCalculator = primaryResult?.format === "number" && primaryResult?.suffix?.includes("lb");
  const weightDiff = results.values.weightDifference as number | undefined;
  const needsToLose = weightDiff && weightDiff > 0;

  // Get unit to display
  const getUnit = (config: ResultConfig) => {
    if (config.format === "date") return "";
    if (config.suffix) return config.suffix;
    if (config.format === "number" && isWeightCalculator) return weightUnit;
    return "";
  };

  return (
    <div className="space-y-4" role="region" aria-labelledby="results-title">
      <h2 id="results-title" className="sr-only">{t("results.title", "Your Results")}</h2>
      
      {/* Main Result Card */}
      <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 md:p-8">
        {/* FIX: Changed from <p> to <h3> for proper heading hierarchy */}
        <h3 className="text-sm text-slate-500 mb-1 font-normal" id="primary-result-label">
          {t(`results.${primaryResult?.id}`, primaryResult?.label || t("results.primaryResult", "Result"))}
        </h3>
        <p className="text-2xl md:text-3xl font-bold text-slate-900 mb-4" aria-labelledby="primary-result-label">
          {primaryValue}
          {primaryResult && getUnit(primaryResult) && (
            <span className="text-2xl font-normal text-slate-500 ml-2">{getUnit(primaryResult)}</span>
          )}
        </p>
        
        {/* Secondary Results Grid */}
        {secondaryResults.length > 0 && (
          <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-slate-200">
            {secondaryResults.map((config) => {
              const value = results.formatted[config.id];
              if (!value) return null;
              return (
                <div key={config.id} className="text-center p-3 bg-white rounded-xl">
                  {/* FIX: Changed from <p> text-xs to <h4> text-sm for proper heading + size */}
                  <h4 className="text-sm text-slate-500 mb-1 font-normal">{t(`results.${config.id}`, config.label)}</h4>
                  <p className="text-lg font-bold text-slate-800">
                    {config.icon && <span className="mr-1" aria-hidden="true">{config.icon}</span>}
                    {value}
                    {config.suffix && <span className="text-sm font-normal text-slate-500 ml-1">{config.suffix}</span>}
                  </p>
                </div>
              );
            })}
          </div>
        )}

        {/* Weight Difference Box (only for weight calculators) */}
        {isWeightCalculator && typeof weightDiff === "number" && (
          <div 
            className={`p-4 rounded-xl mt-4 ${
              needsToLose 
                ? "bg-amber-50 border border-amber-200" 
                : weightDiff < 0 
                  ? "bg-blue-50 border border-blue-200" 
                  : "bg-green-50 border border-green-200"
            }`}
            role="status"
            aria-live="polite"
          >
            <div className="flex items-center justify-between">
              <div>
                {/* FIX: Changed from <p> text-sm to proper semantic element */}
                <span className="text-sm text-slate-600 block">
                  {needsToLose 
                    ? t("results.weightToLose", "Weight to Lose") 
                    : weightDiff < 0 
                      ? t("results.weightToGain", "Weight to Gain") 
                      : t("results.atIdealWeight", "At Ideal Weight!")}
                </span>
                <span className={`text-2xl font-bold block ${
                  needsToLose 
                    ? "text-amber-700" 
                    : weightDiff < 0 
                      ? "text-blue-700" 
                      : "text-green-700"
                }`}>
                  {weightDiff === 0 ? "✓" : `${Math.abs(weightDiff).toFixed(1)} ${weightUnit}`}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Range Visualization */}
        {rangeVisualization && (
          <div className="mt-6 pt-6 border-t border-slate-200">
            {/* FIX: Changed from <p> to <h4> for proper heading hierarchy */}
            <h4 className="text-sm text-slate-600 mb-3 font-medium">{t("results.weightRange", "Weight Range Visualization")}</h4>
            <div 
              className="relative h-8 bg-slate-200 rounded-full overflow-hidden"
              role="img"
              aria-label={`Weight range from ${rangeVisualization.min} to ${rangeVisualization.max} ${rangeVisualization.unit}. Healthy range is ${rangeVisualization.rangeMin} to ${rangeVisualization.rangeMax}. Your current weight is ${rangeVisualization.current} and ideal is ${rangeVisualization.ideal}.`}
            >
              {/* Healthy Range */}
              <div 
                className="absolute h-full bg-green-200"
                style={{
                  left: `${((rangeVisualization.rangeMin - rangeVisualization.min) / (rangeVisualization.max - rangeVisualization.min)) * 100}%`,
                  width: `${((rangeVisualization.rangeMax - rangeVisualization.rangeMin) / (rangeVisualization.max - rangeVisualization.min)) * 100}%`,
                }}
              />
              {/* Current Weight Marker */}
              <div 
                className="absolute top-0 w-1 h-full bg-blue-600"
                style={{
                  left: `${((rangeVisualization.current - rangeVisualization.min) / (rangeVisualization.max - rangeVisualization.min)) * 100}%`,
                }}
              />
              {/* Ideal Weight Marker */}
              <div 
                className="absolute top-0 w-1 h-full bg-green-600"
                style={{
                  left: `${((rangeVisualization.ideal - rangeVisualization.min) / (rangeVisualization.max - rangeVisualization.min)) * 100}%`,
                }}
              />
            </div>
            {/* FIX: Changed text-xs to text-sm for WCAG compliance */}
            <div className="flex justify-between text-sm text-slate-500 mt-1" aria-hidden="true">
              <span>{rangeVisualization.min}</span>
              <span>{rangeVisualization.max}</span>
            </div>
          </div>
        )}

        {/* Formula Results Table */}
        {formulaResults && formulaResults.length > 0 && (
          <div className="mt-6 pt-6 border-t border-slate-200">
            {/* FIX: Changed from <p> to <h4> for proper heading hierarchy */}
            <h4 className="text-sm text-slate-600 mb-3 font-medium">{t("results.formulaComparison", "Formula Comparison")}</h4>
            <table className="w-full text-sm" role="table">
              <caption className="sr-only">{t("results.formulaComparisonTable", "Comparison of different weight formulas")}</caption>
              <thead>
                <tr className="text-left text-slate-500">
                  <th scope="col" className="pb-2">{t("results.formula", "Formula")}</th>
                  <th scope="col" className="pb-2 text-right">{t("results.result", "Result")}</th>
                </tr>
              </thead>
              <tbody>
                {formulaResults.map((formula, index) => (
                  <tr key={index} className="border-t border-slate-100">
                    <td className="py-2 font-medium text-slate-700">{formula.name}</td>
                    <td className="py-2 text-right text-slate-800">{formula.value.toFixed(1)} {weightUnit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Frame Size Indicator */}
        {frameSizeData && (
          <div className="mt-6 pt-6 border-t border-slate-200">
            {/* FIX: Changed from <p> to <h4> for proper heading hierarchy */}
            <h4 className="text-sm text-slate-600 mb-2 font-medium">{t("results.bodyFrame", "Body Frame Size")}</h4>
            <div 
              className="flex gap-2"
              role="figure"
              aria-label={`Your body frame size is ${frameSizeData.current}`}
            >
              {["Small", "Medium", "Large"].map((size) => (
                <div
                  key={size}
                  className={`flex-1 py-2 rounded-lg text-center text-sm font-medium ${
                    frameSizeData.current === size.toLowerCase()
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {size}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Detailed Table Button (Week-by-Week, Year-by-Year, etc.) */}
        {detailedTable && detailedTableData && detailedTableData.length > 0 && (
          <div className="mt-6 pt-6 border-t border-slate-200">
            <DetailedTableModal config={detailedTable} data={detailedTableData} />
          </div>
        )}
      </div>

      {/* Action Buttons */}
      {showActions && (
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => {}}
            disabled={!session}
            aria-describedby={!session ? "pdf-pro-status" : undefined}
            aria-label={t("buttons.exportPDF", "Export to PDF")}
            className="flex items-center justify-center gap-2 py-4 px-4 bg-white rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <span aria-hidden="true">📄</span>
            <span className="font-medium">PDF</span>
            {!session && (
              <span id="pdf-pro-status" className="text-sm bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">PRO</span>
            )}
          </button>
          <button
            onClick={() => {}}
            disabled={!session}
            aria-describedby={!session ? "excel-pro-status" : undefined}
            aria-label={t("buttons.exportExcel", "Export to Excel")}
            className="flex items-center justify-center gap-2 py-4 px-4 bg-white rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <span aria-hidden="true">📊</span>
            <span className="font-medium">Excel</span>
            {!session && (
              <span id="excel-pro-status" className="text-sm bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">PRO</span>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
