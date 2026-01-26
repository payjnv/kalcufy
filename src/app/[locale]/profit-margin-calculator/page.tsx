"use client";

import { useLocale } from "next-intl";
import { CalculatorEngineV3 } from "@/engine/v3";
import { 
  profitMarginConfig, 
  calculateProfitMargin, 
  getProfitMarginVisibleResults 
} from "@/config/calculators/v3/profit-margin.config";
import { useCalcTranslations } from "@/lib/useCalcTranslations";

// =============================================================================
// PAGE COMPONENT
// =============================================================================
export default function ProfitMarginCalculatorPage() {
  const locale = useLocale();
  const { t } = useCalcTranslations(locale, "profit-margin-calculator");

  return (
    <CalculatorEngineV3
      config={profitMarginConfig}
      calculate={calculateProfitMargin}
      t={t}
      getVisibleResults={getProfitMarginVisibleResults}
    />
  );
}
