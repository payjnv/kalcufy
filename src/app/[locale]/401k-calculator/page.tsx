"use client";

import { useLocale } from "next-intl";
import { CalculatorEngineV3 } from "@/engine/v3";
import { calculator401kConfig, calculate401k } from "@/config/calculators/v3/401k.config";
import { useCalcTranslations } from "@/lib/useCalcTranslations";

// =============================================================================
// PAGE COMPONENT
// =============================================================================
export default function Calculator401kPage() {
  const locale = useLocale();
  const { t } = useCalcTranslations(locale, "401k-calculator");

  return (
    <CalculatorEngineV3
      config={calculator401kConfig}
      calculate={calculate401k}
      t={t}
    />
  );
}
