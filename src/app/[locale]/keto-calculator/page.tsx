"use client";

import { useLocale } from "next-intl";
import { CalculatorEngineV3 } from "@/engine/v3";
import { ketoCalculatorConfig, calculateKeto } from "@/config/calculators/v3/keto.config";
import { useCalcTranslations } from "@/lib/useCalcTranslations";

export default function KetoCalculatorPage() {
  const locale = useLocale();
  const { t } = useCalcTranslations(locale, "keto-calculator");

  return (
    <CalculatorEngineV3
      config={ketoCalculatorConfig}
      calculate={calculateKeto}
      t={t}
    />
  );
}
