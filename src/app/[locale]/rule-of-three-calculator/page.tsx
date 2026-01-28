"use client";
import { useLocale } from "next-intl";
import { CalculatorEngineV3 } from "@/engine/v3";
import { ruleOfThreeCalculatorConfig, calculateRuleOfThree } from "@/config/calculators/v3/rule-of-three-calculator.config";
import { useCalcTranslations } from "@/lib/useCalcTranslations";

export default function RuleOfThreeCalculatorPage() {
  const locale = useLocale();
  const { t } = useCalcTranslations(locale, "rule-of-three-calculator");
  
  return (
    <CalculatorEngineV3
      config={ruleOfThreeCalculatorConfig}
      calculate={calculateRuleOfThree}
      t={t}
    />
  );
}
