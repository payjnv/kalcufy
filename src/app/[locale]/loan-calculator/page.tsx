"use client";

import { useLocale } from "next-intl";
import { CalculatorEngineV3 } from "@/engine/v3";
import { loanCalculatorConfig, calculateLoan } from "@/config/calculators/v3/loan.config";
import { useCalcTranslations } from "@/lib/useCalcTranslations";

export default function LoanCalculatorPage() {
  const locale = useLocale();
  const { t } = useCalcTranslations(locale, "loan-calculator");

  return (
    <CalculatorEngineV3
      config={loanCalculatorConfig}
      calculate={calculateLoan}
      t={t}
    />
  );
}
