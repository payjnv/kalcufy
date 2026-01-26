"use client";

import { useLocale } from "next-intl";
import { CalculatorEngineV3 } from "@/engine/v3";
import { carLeaseCalculatorConfig, calculateCarLease } from "@/config/calculators/v3/car-lease.config";
import { useCalcTranslations } from "@/lib/useCalcTranslations";

export default function CarLeaseCalculatorPage() {
  const locale = useLocale();
  const { t } = useCalcTranslations(locale, "car-lease-calculator");

  return (
    <CalculatorEngineV3
      config={carLeaseCalculatorConfig}
      calculate={calculateCarLease}
      t={t}
    />
  );
}
