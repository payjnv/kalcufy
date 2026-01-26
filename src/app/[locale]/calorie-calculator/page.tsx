"use client";

import { useLocale } from "next-intl";
import { CalculatorEngineV3 } from "@/engine/v3";
import { calorieCalculatorConfig, calculateCalories } from "@/config/calculators/v3/calorie.config";
import { useCalcTranslations } from "@/lib/useCalcTranslations";

export default function CalorieCalculatorPage() {
  const locale = useLocale();
  const { t } = useCalcTranslations(locale, "calorie-calculator");

  return (
    <CalculatorEngineV3
      config={calorieCalculatorConfig}
      calculate={calculateCalories}
      t={t}
    />
  );
}
