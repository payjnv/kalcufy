"use client";

import { useLocale } from "next-intl";
import { CalculatorEngineV3 } from "@/engine/v3";
import { mortgageCalculatorConfig, calculateMortgage } from "@/config/calculators/v3/mortgage.config";
import { useCalcTranslations } from "@/lib/useCalcTranslations";

export default function MortgageCalculatorPage() {
  const locale = useLocale();
  const { t } = useCalcTranslations(locale, "mortgage-calculator");

  return (
    <CalculatorEngineV3
      config={mortgageCalculatorConfig}
      calculate={calculateMortgage}
      t={t}
    />
  );
}
