"use client";

import { useLocale } from "next-intl";
import CalculatorEngineV3 from "@/engine/v3/CalculatorEngineV3";
import { gpaCalculatorConfig, calculateGPA } from "@/config/calculators/v3/gpa.config";
import { useCalcTranslations } from "@/lib/useCalcTranslations";

export default function GPACalculatorPage() {
  const locale = useLocale();
  const { t } = useCalcTranslations(locale, "gpa-calculator");

  return (
    <CalculatorEngineV3
      config={gpaCalculatorConfig}
      calculate={calculateGPA}
      t={t}
    />
  );
}
