"use client";
import { useLocale } from "next-intl";
import { CalculatorEngineV3 } from "@/engine/v3";
import { restDayCalculatorConfig, calculateRestDay } from "@/config/calculators/v3/rest-day-calculator.config";
import { useCalcTranslations } from "@/lib/useCalcTranslations";

export default function RestDayCalculatorPage() {
  const locale = useLocale();
  const { t } = useCalcTranslations(locale, "rest-day-calculator");
  return (
    <CalculatorEngineV3
      config={restDayCalculatorConfig}
      calculate={calculateRestDay}
      t={t}
    />
  );
}
