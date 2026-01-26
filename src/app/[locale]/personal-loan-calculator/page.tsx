"use client";

import { useLocale } from "next-intl";
import { CalculatorEngineV3 } from "@/engine/v3";
import { personalLoanCalculatorConfig, calculatePersonalLoan } from "@/config/calculators/v3/personal-loan.config";
import { useCalcTranslations } from "@/lib/useCalcTranslations";

export default function PersonalLoanCalculatorPage() {
  const locale = useLocale();
  const { t } = useCalcTranslations(locale, "personal-loan-calculator");

  return (
    <CalculatorEngineV3
      config={personalLoanCalculatorConfig}
      calculate={calculatePersonalLoan}
      t={t}
    />
  );
}
