"use client";

import type { ComparisonScenario, ResultConfig, TranslationFn } from "../types/engine.types";

interface ComparisonViewProps {
  scenarios: ComparisonScenario[];
  results: Map<string, Record<string, unknown>>;
  resultConfigs: ResultConfig[];
  compareFields: string[];
  highlightField?: string;
  highlightMode?: 'highest' | 'lowest';
  showDifference?: boolean;
  onAddScenario: () => void;
  onRemoveScenario: (id: string) => void;
  onUpdateScenario: (id: string, values: Record<string, unknown>) => void;
  maxScenarios: number;
  t: TranslationFn;
}

export default function ComparisonView({
  scenarios,
  results,
  resultConfigs,
  compareFields,
  highlightField,
  highlightMode = 'highest',
  showDifference = true,
  onAddScenario,
  onRemoveScenario,
  maxScenarios,
  t,
}: ComparisonViewProps) {
  // Find best scenario for highlighting
  const findBestScenario = (): string | null => {
    if (!highlightField) return null;
    
    let bestId: string | null = null;
    let bestValue = highlightMode === 'highest' ? -Infinity : Infinity;

    scenarios.forEach(scenario => {
      const result = results.get(scenario.id);
      if (result) {
        const value = Number(result[highlightField]) || 0;
        if (highlightMode === 'highest' && value > bestValue) {
          bestValue = value;
          bestId = scenario.id;
        } else if (highlightMode === 'lowest' && value < bestValue) {
          bestValue = value;
          bestId = scenario.id;
        }
      }
    });

    return bestId;
  };

  const bestScenarioId = findBestScenario();

  return (
    <div className="space-y-4">
      {/* Scenario Headers */}
      <div className="flex gap-4 overflow-x-auto pb-2">
        {scenarios.map((scenario, index) => {
          const isBest = scenario.id === bestScenarioId;
          
          return (
            <div 
              key={scenario.id}
              className={`flex-1 min-w-[200px] p-4 rounded-xl border-2 transition-all ${
                isBest 
                  ? "border-green-500 bg-green-50" 
                  : "border-slate-200 bg-white"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: scenario.color || `hsl(${index * 60}, 70%, 50%)` }}
                  />
                  <span className="font-semibold text-slate-800">
                    {scenario.label || `${t("comparison.scenario", "Scenario")} ${index + 1}`}
                  </span>
                  {isBest && (
                    <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">
                      {t("comparison.best", "Best")}
                    </span>
                  )}
                </div>
                {scenarios.length > 1 && (
                  <button
                    onClick={() => onRemoveScenario(scenario.id)}
                    className="p-1 text-slate-400 hover:text-red-500 rounded transition-colors"
                    aria-label={t("comparison.remove", "Remove scenario")}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>

              {/* Results for this scenario */}
              <div className="space-y-2">
                {compareFields.map(fieldId => {
                  const config = resultConfigs.find(r => r.id === fieldId);
                  const result = results.get(scenario.id);
                  const value = result ? result[fieldId] : null;
                  
                  if (!config || value === null || value === undefined) return null;

                  return (
                    <div key={fieldId} className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">{config.label}</span>
                      <span className="font-semibold text-slate-900">
                        {config.prefix}{String(value)}{config.suffix}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* Add Scenario Button */}
        {scenarios.length < maxScenarios && (
          <button
            onClick={onAddScenario}
            className="flex-1 min-w-[200px] p-4 rounded-xl border-2 border-dashed border-slate-300 hover:border-blue-400 hover:bg-blue-50 transition-all flex flex-col items-center justify-center gap-2 text-slate-500 hover:text-blue-600"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span className="text-sm font-medium">
              {t("comparison.addScenario", "Add Scenario")}
            </span>
          </button>
        )}
      </div>

      {/* Difference Summary */}
      {showDifference && scenarios.length > 1 && highlightField && (
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
          <h4 className="font-medium text-slate-700 mb-2">
            {t("comparison.summary", "Comparison Summary")}
          </h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            {scenarios.map((scenario, index) => {
              if (index === 0) return null;
              const baseResult = results.get(scenarios[0].id);
              const currentResult = results.get(scenario.id);
              
              if (!baseResult || !currentResult) return null;
              
              const baseValue = Number(baseResult[highlightField]) || 0;
              const currentValue = Number(currentResult[highlightField]) || 0;
              const diff = currentValue - baseValue;
              const percentDiff = baseValue !== 0 ? (diff / baseValue) * 100 : 0;
              
              return (
                <div key={scenario.id} className="flex items-center justify-between">
                  <span className="text-slate-600">
                    {scenario.label} vs {scenarios[0].label}
                  </span>
                  <span className={`font-semibold ${diff >= 0 ? "text-green-600" : "text-red-600"}`}>
                    {diff >= 0 ? "+" : ""}{diff.toFixed(2)} ({percentDiff.toFixed(1)}%)
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
