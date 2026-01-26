"use client";

import { useLocale } from "next-intl";
import { CalculatorEngineV3 } from "@/engine/v3";
import { bmiCalculatorConfig, calculateBMI } from "@/config/calculators/v3/bmi.config";
import { useCalcTranslations } from "@/lib/useCalcTranslations";

export default function BMICalculatorPage() {
  const locale = useLocale();
  const { t } = useCalcTranslations(locale, "bmi-calculator");

  return (
    <CalculatorEngineV3
      config={bmiCalculatorConfig}
      calculate={calculateBMI}
      t={t}
    />
  );
}
