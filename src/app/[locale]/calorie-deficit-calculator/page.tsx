"use client";

import { useLocale } from "next-intl";
import { CalculatorEngineV3 } from "@/engine/v3";
import { calorieDeficitCalculatorConfig, calculateCalorieDeficit } from "@/config/calculators/v3/calorie-deficit.config";
import { useCalcTranslations } from "@/lib/useCalcTranslations";

export default function CalorieDeficitCalculatorPage() {
  const locale = useLocale();
  const { t } = useCalcTranslations(locale, "calorie-deficit");

  return (
    <CalculatorEngineV3
      config={calorieDeficitCalculatorConfig}
      calculate={calculateCalorieDeficit}
      t={t}
    />
  );
}
