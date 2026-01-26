"use client";

import { useLocale } from "next-intl";
import { CalculatorEngineV3 } from "@/engine/v3";
import { tipCalculatorConfig, calculateTip } from "@/config/calculators/v3/tip.config";
import { useCalcTranslations } from "@/lib/useCalcTranslations";

export default function TipCalculatorPage() {
  const locale = useLocale();
  const { t } = useCalcTranslations(locale, "tip-calculator");

  return (
    <CalculatorEngineV3
      config={tipCalculatorConfig}
      calculate={calculateTip}
      t={t}
    />
  );
}
