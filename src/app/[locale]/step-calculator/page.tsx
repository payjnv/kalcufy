"use client";
import { useLocale } from "next-intl";
import { CalculatorEngineV3 } from "@/engine/v3";
import { stepCalculatorConfig, calculateSteps } from "@/config/calculators/v3/step-calculator.config";
import { useCalcTranslations } from "@/lib/useCalcTranslations";

export default function StepCalculatorPage() {
  const locale = useLocale();
  const { t } = useCalcTranslations(locale, "step-calculator");
  return (
    <CalculatorEngineV3
      config={stepCalculatorConfig}
      calculate={calculateSteps}
      t={t}
    />
  );
}
