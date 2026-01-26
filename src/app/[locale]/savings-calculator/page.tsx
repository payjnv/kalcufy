"use client";

import { useLocale } from "next-intl";
import { CalculatorEngineV3 } from "@/engine/v3";
import { savingsCalculatorConfig, calculateSavings } from "@/config/calculators/v3/savings.config";
import { useCalcTranslations } from "@/lib/useCalcTranslations";
import type { CalculatorResults } from "@/engine/v3/types/engine.types";

export default function SavingsCalculatorPage() {
  const locale = useLocale();
  const { t } = useCalcTranslations(locale, "savings-calculator");

  // Get distribution bars for savings breakdown visualization
  const getDistributionBars = (results: CalculatorResults) => {
    if (!results?.metadata?.breakdown) return [];
    return results.metadata.breakdown as Array<{
      id: string;
      label: string;
      value: number;
      displayValue: string;
    }>;
  };

  // Get dynamic info card data (savings stats)
  const getInfoCardData = (results: CalculatorResults, cardId: string) => {
    if (cardId === "savingsStats" && results?.metadata?.savingsStats) {
      return results.metadata.savingsStats as Array<{
        label: string;
        value: string;
        color: string;
      }>;
    }
    return null;
  };

  // Filter results based on current mode
  const getVisibleResults = (results: CalculatorResults) => {
    const mode = results?.metadata?.mode || "growth";
    
    if (mode === "emergency") {
      return ["emergencyGoal", "amountNeeded", "monthsToFund"];
    }
    if (mode === "goal") {
      return ["yearsToGoal", "goalDate", "futureValue", "totalContributions", "totalInterest"];
    }
    // growth mode
    return ["futureValue", "totalContributions", "totalInterest", "effectiveAPY", "inflationAdjusted"];
  };

  return (
    <CalculatorEngineV3
      config={savingsCalculatorConfig}
      calculate={calculateSavings}
      t={t}
      getDistributionBars={getDistributionBars}
      getInfoCardData={getInfoCardData}
      getVisibleResults={getVisibleResults}
    />
  );
}
