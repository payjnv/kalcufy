"use client";

import { useLocale } from "next-intl";
import { CalculatorEngineV3 } from "@/engine/v3";
import { investmentCalculatorConfig, calculateInvestment } from "@/config/calculators/v3/investment.config";
import { useCalcTranslations } from "@/lib/useCalcTranslations";
import type { CalculatorResults } from "@/engine/v3/types/engine.types";

export default function InvestmentCalculatorPage() {
  const locale = useLocale();
  const { t } = useCalcTranslations(locale, "investment-calculator");

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

  // Get dynamic info card data (investment stats)
  const getInfoCardData = (results: CalculatorResults, cardId: string) => {
    if (cardId === "investmentStats" && results?.metadata?.investmentStats) {
      return results.metadata.investmentStats as Array<{
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
    
    if (mode === "compare") {
      return ["scenarioA", "scenarioB", "difference", "totalContributions"];
    }
    if (mode === "goal") {
      return ["futureValue", "yearsToGoal", "monthlyNeeded", "effectiveAPY"];
    }
    // growth mode
    return ["futureValue", "totalContributions", "totalEarnings", "effectiveAPY", "inflationAdjusted", "afterTaxValue"];
  };

  return (
    <CalculatorEngineV3
      config={investmentCalculatorConfig}
      calculate={calculateInvestment}
      t={t}
      getDistributionBars={getDistributionBars}
      getInfoCardData={getInfoCardData}
      getVisibleResults={getVisibleResults}
    />
  );
}
