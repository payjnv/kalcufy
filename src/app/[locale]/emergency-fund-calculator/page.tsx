"use client";

import { useLocale } from "next-intl";
import { CalculatorEngineV3 } from "@/engine/v3";
import { emergencyFundCalculatorConfig, calculateEmergencyFund } from "@/config/calculators/v3/emergency-fund-calculator.config";
import { useCalcTranslations } from "@/lib/useCalcTranslations";

export default function EmergencyFundCalculatorPage() {
  const locale = useLocale();
  const { t } = useCalcTranslations(locale, "emergency-fund-calculator");

  return (
    <CalculatorEngineV3
      config={emergencyFundCalculatorConfig}
      calculate={calculateEmergencyFund}
      t={t}
    />
  );
}
