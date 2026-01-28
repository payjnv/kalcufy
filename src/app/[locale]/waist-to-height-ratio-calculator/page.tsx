"use client";
import { useLocale } from "next-intl";
import { CalculatorEngineV3 } from "@/engine/v3";
import { waistToHeightRatioCalculatorConfig, calculateWaistToHeightRatio } from "@/config/calculators/v3/waist-to-height-ratio-calculator.config";
import { useCalcTranslations } from "@/lib/useCalcTranslations";

export default function WaistToHeightRatioCalculatorPage() {
  const locale = useLocale();
  const { t } = useCalcTranslations(locale, "waist-to-height-ratio-calculator");
  return (
    <CalculatorEngineV3
      config={waistToHeightRatioCalculatorConfig}
      calculate={calculateWaistToHeightRatio}
      t={t}
    />
  );
}
