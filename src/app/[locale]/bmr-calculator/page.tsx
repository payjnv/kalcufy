"use client";

import { useLocale } from "next-intl";
import { CalculatorEngineV3 } from "@/engine/v3";
import { bmrCalculatorConfig, calculateBMR } from "@/config/calculators/v3/bmr.config";
import { useCalcTranslations } from "@/lib/useCalcTranslations";

// =============================================================================
// PAGE COMPONENT
// =============================================================================
export default function BMRCalculatorPage() {
  const locale = useLocale();
  const { t } = useCalcTranslations(locale, "bmr-calculator");

  return (
    <CalculatorEngineV3
      config={bmrCalculatorConfig}
      calculate={calculateBMR}
      t={t}
    />
  );
}
