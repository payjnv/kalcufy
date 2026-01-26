"use client";

import { useLocale } from "next-intl";
import { CalculatorEngineV3 } from "@/engine/v3";
import { runningPaceCalculatorConfig, calculateRunningPace } from "@/config/calculators/v3/running-pace.config";
import { useCalcTranslations } from "@/lib/useCalcTranslations";

export default function RunningPaceCalculatorPage() {
  const locale = useLocale();
  const { t } = useCalcTranslations(locale, "running-pace-calculator");

  return (
    <CalculatorEngineV3
      config={runningPaceCalculatorConfig}
      calculate={calculateRunningPace}
      t={t}
    />
  );
}
