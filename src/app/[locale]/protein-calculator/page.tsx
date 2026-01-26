"use client";

import { useLocale } from "next-intl";
import { CalculatorEngineV3 } from "@/engine/v3";
import { proteinCalculatorConfig, calculateProtein } from "@/config/calculators/v3/protein.config";
import { useCalcTranslations } from "@/lib/useCalcTranslations";

export default function ProteinCalculatorPage() {
  const locale = useLocale();
  const { t } = useCalcTranslations(locale, "protein-calculator");

  return (
    <CalculatorEngineV3
      config={proteinCalculatorConfig}
      calculate={calculateProtein}
      t={t}
    />
  );
}
