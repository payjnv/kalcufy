"use client";

import { useLocale } from "next-intl";
import { CalculatorEngineV3 } from "@/engine/v3";
import { waterIntakeCalculatorConfig, calculateWaterIntake } from "@/config/calculators/v3/water-intake.config";
import { useCalcTranslations } from "@/lib/useCalcTranslations";

export default function WaterIntakeCalculatorPage() {
  const locale = useLocale();
  const { t } = useCalcTranslations(locale, "water-intake-calculator");

  return (
    <CalculatorEngineV3
      config={waterIntakeCalculatorConfig}
      calculate={calculateWaterIntake}
      t={t}
    />
  );
}
