"use client";

import { useLocale } from "next-intl";
import { CalculatorEngineV3 } from "@/engine/v3";
import { maintenanceCaloriesCalculatorConfig, calculateMaintenanceCalories } from "@/config/calculators/v3/maintenance-calories.config";
import { useCalcTranslations } from "@/lib/useCalcTranslations";

export default function MaintenanceCaloriesCalculatorPage() {
  const locale = useLocale();
  const { t } = useCalcTranslations(locale, "maintenance-calories");

  return (
    <CalculatorEngineV3
      config={maintenanceCaloriesCalculatorConfig}
      calculate={calculateMaintenanceCalories}
      t={t}
    />
  );
}
