"use client";

import { useLocale } from "next-intl";
import { CalculatorEngineV3 } from "@/engine/v3";
import { rothIraCalculatorConfig, calculateRothIRA } from "@/config/calculators/v3/roth-ira.config";
import { useCalcTranslations } from "@/lib/useCalcTranslations";

export default function RothIRACalculatorPage() {
  const locale = useLocale();
  const { t } = useCalcTranslations(locale, "roth-ira-calculator");

  return (
    <CalculatorEngineV3
      config={rothIraCalculatorConfig}
      calculate={calculateRothIRA}
      t={t}
    />
  );
}
