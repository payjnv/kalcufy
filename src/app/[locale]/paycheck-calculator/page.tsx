"use client";

import { useLocale } from "next-intl";
import { CalculatorEngineV3 } from "@/engine/v3";
import { paycheckCalculatorConfig, calculatePaycheck } from "@/config/calculators/v3/paycheck.config";
import { useCalcTranslations } from "@/lib/useCalcTranslations";

export default function PaycheckCalculatorPage() {
  const locale = useLocale();
  const { t } = useCalcTranslations(locale, "paycheck-calculator");

  return (
    <CalculatorEngineV3
      config={paycheckCalculatorConfig}
      calculate={calculatePaycheck}
      t={t}
    />
  );
}
