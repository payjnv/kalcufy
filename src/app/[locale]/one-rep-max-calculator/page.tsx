"use client";

import { useLocale } from "next-intl";
import { CalculatorEngineV3 } from "@/engine/v3";
import { oneRepMaxCalculatorConfig, calculateOneRepMax } from "@/config/calculators/v3/one-rep-max.config";
import { useCalcTranslations } from "@/lib/useCalcTranslations";

export default function OneRepMaxCalculatorPage() {
  const locale = useLocale();
  const { t } = useCalcTranslations(locale, "one-rep-max-calculator");

  return (
    <CalculatorEngineV3
      config={oneRepMaxCalculatorConfig}
      calculate={calculateOneRepMax}
      t={t}
    />
  );
}
