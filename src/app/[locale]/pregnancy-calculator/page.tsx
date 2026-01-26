"use client";
import { CalculatorEngineV3 } from "@/engine/v3";
import { pregnancyConfig, calculatePregnancy } from "@/config/calculators/v3/pregnancy.config";
import { useCalcTranslations } from "@/lib/useCalcTranslations";
import { useLocale } from "next-intl";

export default function PregnancyCalculatorV3Page() {
  const locale = useLocale();
  const { t, loading } = useCalcTranslations(locale, "pregnancy-calculator");

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <CalculatorEngineV3
      config={pregnancyConfig}
      calculate={calculatePregnancy}
      t={t}
    />
  );
}
