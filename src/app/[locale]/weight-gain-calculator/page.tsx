"use client";

import { useLocale } from "next-intl";
import { CalculatorEngineV3 } from "@/engine/v3";
import { weightGainCalculatorConfig, calculateWeightGain } from "@/config/calculators/v3/weight-gain-calculator.config";
import { useCalcTranslations } from "@/lib/useCalcTranslations";

export default function WeightGainCalculatorPage() {
  const locale = useLocale();
  const { t } = useCalcTranslations(locale, "weight-gain-calculator");

  return (
    <CalculatorEngineV3
      config={weightGainCalculatorConfig}
      calculate={calculateWeightGain}
      t={t}
    />
  );
}
