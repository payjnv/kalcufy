"use client";

import { useLocale } from "next-intl";
import { CalculatorEngineV3 } from "@/engine/v3";
import { weightLossCalculatorConfig, calculateWeightLoss } from "@/config/calculators/v3/weight-loss-calculator.config";
import { useCalcTranslations } from "@/lib/useCalcTranslations";

export default function WeightLossCalculatorPage() {
  const locale = useLocale();
  const { t } = useCalcTranslations(locale, "weight-loss-calculator");

  return (
    <CalculatorEngineV3
      config={weightLossCalculatorConfig}
      calculate={calculateWeightLoss}
      t={t}
    />
  );
}
