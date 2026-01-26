"use client";

import { useLocale } from "next-intl";
import { CalculatorEngineV3 } from "@/engine/v3";
import { netWorthCalculatorConfig, calculateNetWorth } from "@/config/calculators/v3/net-worth-calculator.config";
import { useCalcTranslations } from "@/lib/useCalcTranslations";

export default function NetWorthCalculatorPage() {
  const locale = useLocale();
  const { t } = useCalcTranslations(locale, "net-worth-calculator");

  return (
    <CalculatorEngineV3
      config={netWorthCalculatorConfig}
      calculate={calculateNetWorth}
      t={t}
    />
  );
}
