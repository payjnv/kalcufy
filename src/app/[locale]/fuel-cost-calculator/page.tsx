"use client";

import { useLocale } from "next-intl";
import { CalculatorEngineV3 } from "@/engine/v3";
import { fuelCostConfig, calculateFuelCost } from "@/config/calculators/v3/fuel-cost.config";
import { useCalcTranslations } from "@/lib/useCalcTranslations";

export default function FuelCostCalculatorV3Page() {
  const locale = useLocale();
  const { t } = useCalcTranslations(locale, "fuel-cost-calculator");

  return (
    <CalculatorEngineV3
      config={fuelCostConfig}
      calculate={calculateFuelCost}
      t={t}
    />
  );
}
