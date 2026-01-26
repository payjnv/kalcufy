"use client";

import { CalculatorEngineV3 } from "@/engine/v3";
import { idealWeightConfig, calculateIdealWeight } from "@/config/calculators/v3/ideal-weight.config";
import { useCalcTranslations } from "@/lib/useCalcTranslations";
import { useLocale } from "next-intl";
import type { CalculatorResults } from "@/engine/v3/types/engine.types";

export default function IdealWeightCalculatorV3Page() {
  const locale = useLocale();
  const { t } = useCalcTranslations(locale, "ideal-weight-calculator");

  const getFormulaResults = (results: CalculatorResults) => {
    if (!results?.metadata?.formulaResults) return [];
    return results.metadata.formulaResults as Array<{ name: string; value: number; description?: string }>;
  };

  const getRangeVisualization = (results: CalculatorResults, state: any) => {
    if (!results?.values) return null;
    return {
      current: results.values.currentWeight as number,
      ideal: results.values.idealWeight as number,
      min: 100,
      max: 300,
      rangeMin: results.values.healthyMin as number,
      rangeMax: results.values.healthyMax as number,
      unit: "lbs",
    };
  };

  const getFrameSizeData = (results: CalculatorResults) => {
    if (!results?.values) return undefined;
    return {
      current: results.values.frameSize as string,
      gender: results.values.gender as string,
    };
  };

  return (
    <CalculatorEngineV3
      config={idealWeightConfig}
      calculate={calculateIdealWeight}
      t={t}
      getFormulaResults={getFormulaResults}
      getRangeVisualization={getRangeVisualization}
      getFrameSizeData={getFrameSizeData}
    />
  );
}
