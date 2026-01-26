"use client";

import { useLocale } from "next-intl";
import { CalculatorEngineV3 } from "@/engine/v3";
import { retirementCalculatorConfig, calculateRetirement } from "@/config/calculators/v3/retirement.config";
import { useCalcTranslations } from "@/lib/useCalcTranslations";

export default function RetirementCalculatorPage() {
  const locale = useLocale();
  const { t } = useCalcTranslations(locale, "retirement-calculator");

  return (
    <CalculatorEngineV3
      config={retirementCalculatorConfig}
      calculate={calculateRetirement}
      t={t}
    />
  );
}
