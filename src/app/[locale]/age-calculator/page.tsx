"use client";

import { useLocale } from "next-intl";
import { CalculatorEngineV3 } from "@/engine/v3";
import { ageCalculatorConfig, calculateAge_V3 } from "@/config/calculators/v3/age.config";
import { useCalcTranslations } from "@/lib/useCalcTranslations";

// =============================================================================
// PAGE COMPONENT
// =============================================================================
export default function AgeCalculatorPage() {
  const locale = useLocale();
  const { t } = useCalcTranslations(locale, "age-calculator");

  return (
    <CalculatorEngineV3
      config={ageCalculatorConfig}
      calculate={calculateAge_V3}
      t={t}
    />
  );
}
