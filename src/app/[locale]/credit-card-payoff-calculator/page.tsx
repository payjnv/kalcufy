"use client";

import { useLocale } from "next-intl";
import { CalculatorEngineV3 } from "@/engine/v3";
import { creditCardPayoffCalculatorConfig, calculateCreditCardPayoff } from "@/config/calculators/v3/credit-card-payoff-calculator.config";
import { useCalcTranslations } from "@/lib/useCalcTranslations";

export default function CreditCardPayoffCalculatorPage() {
  const locale = useLocale();
  const { t } = useCalcTranslations(locale, "credit-card-payoff-calculator");

  return (
    <CalculatorEngineV3
      config={creditCardPayoffCalculatorConfig}
      calculate={calculateCreditCardPayoff}
      t={t}
    />
  );
}
