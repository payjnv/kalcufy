"use client";

import { useLocale } from "next-intl";
import { CalculatorEngineV3 } from "@/engine/v3";
import { caloriesBurnedConfig, calculateCaloriesBurned } from "@/config/calculators/v3/calories-burned.config";
import { useCalcTranslations } from "@/lib/useCalcTranslations";

export default function CaloriesBurnedCalculatorPage() {
  const locale = useLocale();
  const { t } = useCalcTranslations(locale, "calories-burned-calculator");

  return (
    <CalculatorEngineV3
      config={caloriesBurnedConfig}
      calculate={calculateCaloriesBurned}
      t={t}
    />
  );
}
