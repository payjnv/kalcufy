"use client";
import { useLocale } from "next-intl";
import { CalculatorEngineV3 } from "@/engine/v3";
import { squareRootCalculatorConfig, calculateSquareRoot } from "@/config/calculators/v3/square-root-calculator.config";
import { useCalcTranslations } from "@/lib/useCalcTranslations";

export default function SquareRootCalculatorPage() {
  const locale = useLocale();
  const { t } = useCalcTranslations(locale, "square-root-calculator");
  
  return (
    <CalculatorEngineV3
      config={squareRootCalculatorConfig}
      calculate={calculateSquareRoot}
      t={t}
    />
  );
}
