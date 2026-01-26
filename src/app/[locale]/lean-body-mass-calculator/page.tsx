"use client";

import { useLocale } from "next-intl";
import { CalculatorEngineV3 } from "@/engine/v3";
import { leanBodyMassCalculatorConfig, calculateLeanBodyMass } from "@/config/calculators/v3/lean-body-mass.config";
import { useCalcTranslations } from "@/lib/useCalcTranslations";

export default function LeanBodyMassCalculatorPage() {
  const locale = useLocale();
  const { t } = useCalcTranslations(locale, "lean-body-mass-calculator");

  return (
    <CalculatorEngineV3
      config={leanBodyMassCalculatorConfig}
      calculate={calculateLeanBodyMass}
      t={t}
    />
  );
}
