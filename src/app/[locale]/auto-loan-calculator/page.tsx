"use client";

import { useLocale } from "next-intl";
import { CalculatorEngineV3 } from "@/engine/v3";
import { autoLoanConfig, calculateAutoLoan } from "@/config/calculators/v3/auto-loan.config";
import { useCalcTranslations } from "@/lib/useCalcTranslations";
import type { CalculatorResults } from "@/engine/v3/types/engine.types";

export default function AutoLoanCalculatorPage() {
  const locale = useLocale();
  const { t } = useCalcTranslations(locale, "auto-loan-calculator");

  // Get distribution bars for cost breakdown visualization
  const getDistributionBars = (results: CalculatorResults) => {
    if (!results?.metadata?.breakdown) return [];
    return results.metadata.breakdown as Array<{
      id: string;
      label: string;
      value: number;
      displayValue: string;
    }>;
  };

  // Get dynamic info card data (loan summary)
  const getInfoCardData = (results: CalculatorResults, cardId: string) => {
    if (cardId === "loanSummary" && results?.metadata?.loanSummary) {
      return results.metadata.loanSummary as Array<{
        label: string;
        value: string;
        color: string;
      }>;
    }
    return null;
  };

  return (
    <CalculatorEngineV3
      config={autoLoanConfig}
      calculate={calculateAutoLoan}
      t={t}
      getDistributionBars={getDistributionBars}
      getInfoCardData={getInfoCardData}
    />
  );
}
