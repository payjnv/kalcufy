"use client";

import { useLocale } from "next-intl";
import { CalculatorEngineV3 } from "@/engine/v3";
import { timeZoneCalculatorConfig, calculateTimeZone } from "@/config/calculators/v3/time-zone.config";
import { useCalcTranslations } from "@/lib/useCalcTranslations";

export default function TimeZoneCalculatorPage() {
  const locale = useLocale();
  const { t } = useCalcTranslations(locale, "time-zone-calculator");

  return (
    <CalculatorEngineV3
      config={timeZoneCalculatorConfig}
      calculate={calculateTimeZone}
      t={t}
    />
  );
}
