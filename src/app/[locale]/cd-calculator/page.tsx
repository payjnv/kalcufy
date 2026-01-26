"use client";

import { useLocale } from "next-intl";
import { CalculatorEngineV3 } from "@/engine/v3";
import { cdCalculatorConfig, calculateCD } from "@/config/calculators/v3/cd-calculator.config";
import { useCalcTranslations } from "@/lib/useCalcTranslations";

export default function CDCalculatorPage() {
  const locale = useLocale();
  const { t } = useCalcTranslations(locale, "cd-calculator");

  return (
    <CalculatorEngineV3
      config={cdCalculatorConfig}
      calculate={calculateCD}
      t={t}
    />
  );
}
