"use client";

import { useLocale } from "next-intl";
import { CalculatorEngineV3 } from "@/engine/v3";
import { incomeTaxConfig, calculateIncomeTax } from "@/config/calculators/v3/income-tax.config";
import { useCalcTranslations } from "@/lib/useCalcTranslations";

export default function IncomeTaxCalculatorPage() {
  const locale = useLocale();
  const { t } = useCalcTranslations(locale, "income-tax-calculator");

  return (
    <CalculatorEngineV3
      config={incomeTaxConfig}
      calculate={calculateIncomeTax}
      t={t}
    />
  );
}
