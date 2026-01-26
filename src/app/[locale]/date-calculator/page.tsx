"use client";

import { useLocale } from "next-intl";
import { CalculatorEngineV3 } from "@/engine/v3";
import { dateCalculatorConfig, calculateDate } from "@/config/calculators/v3/date.config";
import { useCalcTranslations } from "@/lib/useCalcTranslations";

export default function DateCalculatorPage() {
  const locale = useLocale();
  const { t } = useCalcTranslations(locale, "date-calculator");

  return (
    <CalculatorEngineV3
      config={dateCalculatorConfig}
      calculate={calculateDate}
      t={t}
    />
  );
}
