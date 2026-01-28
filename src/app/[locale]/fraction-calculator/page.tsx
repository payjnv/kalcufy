"use client";

import { useLocale } from "next-intl";
import { CalculatorEngineV3 } from "@/engine/v3";
import { fractionCalculatorConfig, calculateFraction } from "@/config/calculators/v3/fraction-calculator.config";
import { useCalcTranslations } from "@/lib/useCalcTranslations";

export default function FractionCalculatorPage() {
  const locale = useLocale();
  const { t } = useCalcTranslations(locale, "fraction-calculator");

  return (
    <CalculatorEngineV3
      config={fractionCalculatorConfig}
      calculate={calculateFraction}
      t={t}
    />
  );
}
