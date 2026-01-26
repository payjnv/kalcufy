"use client";

import { useLocale } from "next-intl";
import { CalculatorEngineV3 } from "@/engine/v3";
import { budgetCalculatorConfig, calculateBudget } from "@/config/calculators/v3/budget.config";
import { useCalcTranslations } from "@/lib/useCalcTranslations";

// =============================================================================
// PAGE COMPONENT
// =============================================================================
export default function BudgetCalculatorPage() {
  const locale = useLocale();
  const { t } = useCalcTranslations(locale, "budget-calculator");

  return (
    <CalculatorEngineV3
      config={budgetCalculatorConfig}
      calculate={calculateBudget}
      t={t}
    />
  );
}
