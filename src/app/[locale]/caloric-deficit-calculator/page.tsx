"use client";

import { useLocale } from "next-intl";
import { CalculatorEngineV3 } from "@/engine/v3";
import { caloricDeficitConfig, calculateCaloricDeficit } from "@/config/calculators/v3/caloric-deficit.config";
import { useCalcTranslations } from "@/lib/useCalcTranslations";

export default function CaloricDeficitCalculatorPage() {
  const locale = useLocale();
  const { t } = useCalcTranslations(locale, "caloric-deficit-calculator");

  return (
    <CalculatorEngineV3
      config={caloricDeficitConfig}
      calculate={calculateCaloricDeficit}
      t={t}
    />
  );
}
