"use client";

import { useLocale } from "next-intl";
import { CalculatorEngineV3 } from "@/engine/v3";
import { bodyFatCalculatorConfig, calculateBodyFat } from "@/config/calculators/v3/body-fat.config";
import { useCalcTranslations } from "@/lib/useCalcTranslations";
import type { CalculatorResults } from "@/engine/v3/types/engine.types";

export default function BodyFatCalculatorPage() {
  const locale = useLocale();
  const { t } = useCalcTranslations(locale, "body-fat-calculator");

  // Get distribution bars data for body fat scale visualization
  const getDistributionBars = (results: CalculatorResults) => {
    if (!results?.metadata?.categoryScale) return [];
    return results.metadata.categoryScale as Array<{
      id: string;
      label: string;
      value: number;
      displayValue: string;
    }>;
  };

  return (
    <CalculatorEngineV3
      config={bodyFatCalculatorConfig}
      calculate={calculateBodyFat}
      t={t}
      getDistributionBars={getDistributionBars}
    />
  );
}
