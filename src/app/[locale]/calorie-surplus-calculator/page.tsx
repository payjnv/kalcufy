"use client";

import { useLocale } from "next-intl";
import { CalculatorEngineV3 } from "@/engine/v3";
import { calorieSurplusCalculatorConfig, calculateCalorieSurplus } from "@/config/calculators/v3/calorie-surplus.config";
import { useCalcTranslations } from "@/lib/useCalcTranslations";

export default function CalorieSurplusCalculatorPage() {
  const locale = useLocale();
  const { t } = useCalcTranslations(locale, "calorie-surplus");

  return (
    <CalculatorEngineV3
      config={calorieSurplusCalculatorConfig}
      calculate={calculateCalorieSurplus}
      t={t}
    />
  );
}
