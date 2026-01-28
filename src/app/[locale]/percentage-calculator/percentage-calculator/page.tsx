"use client";
import { useLocale } from "next-intl";
import { CalculatorEngineV3 } from "@/engine/v3";
import { percentageCalculatorConfig, calculatePercentage } from "@/config/calculators/v3/percentage.config";
import { useCalcTranslations } from "@/lib/useCalcTranslations";

export default function PercentageCalculatorPage() {
  const locale = useLocale();
  const { t } = useCalcTranslations(locale, "percentage-calculator");
  return (
    <CalculatorEngineV3
      config={percentageCalculatorConfig}
      calculate={calculatePercentage}
      t={t}
    />
  );
}
