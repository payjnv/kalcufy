"use client";

import { useLocale } from "next-intl";
import { CalculatorEngineV3 } from "@/engine/v3";
import { compoundInterestConfig, calculateCompoundInterest } from "@/config/calculators/v3/compound-interest.config";
import { useCalcTranslations } from "@/lib/useCalcTranslations";
import type { CalculatorResults } from "@/engine/v3/types/engine.types";

export default function CompoundInterestCalculatorPage() {
  const locale = useLocale();
  const { t } = useCalcTranslations(locale, "compound-interest-calculator");

  // Get distribution bars for investment breakdown visualization
  const getDistributionBars = (results: CalculatorResults) => {
    if (!results?.metadata?.breakdown) return [];
    return results.metadata.breakdown as Array<{
      id: string;
      label: string;
      value: number;
      displayValue: string;
    }>;
  };

  // Get dynamic info card data (growth stats)
  const getInfoCardData = (results: CalculatorResults, cardId: string) => {
    if (cardId === "growthStats" && results?.metadata?.growthStats) {
      return results.metadata.growthStats as Array<{
        label: string;
        value: string;
        color: string;
      }>;
    }
    return null;
  };

  return (
    <CalculatorEngineV3
      config={compoundInterestConfig}
      calculate={calculateCompoundInterest}
      t={t}
      getDistributionBars={getDistributionBars}
      getInfoCardData={getInfoCardData}
    />
  );
}
