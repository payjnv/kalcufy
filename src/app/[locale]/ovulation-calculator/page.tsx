"use client";

import { useLocale } from "next-intl";
import { CalculatorEngineV3 } from "@/engine/v3";
import { ovulationCalculatorConfig, calculateOvulation } from "@/config/calculators/v3/ovulation.config";
import { useCalcTranslations } from "@/lib/useCalcTranslations";

export default function OvulationCalculatorPage() {
  const locale = useLocale();
  const { t } = useCalcTranslations(locale, "ovulation-calculator");

  return (
    <CalculatorEngineV3
      config={ovulationCalculatorConfig}
      calculate={calculateOvulation}
      t={t}
    />
  );
}
