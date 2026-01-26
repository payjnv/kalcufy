"use client";

import { useLocale } from "next-intl";
import { CalculatorEngineV3 } from "@/engine/v3";
import { discountCalculatorConfig, calculateDiscount } from "@/config/calculators/v3/discount.config";
import { useCalcTranslations } from "@/lib/useCalcTranslations";

export default function DiscountCalculatorPage() {
  const locale = useLocale();
  const { t } = useCalcTranslations(locale, "discount-calculator");

  return (
    <CalculatorEngineV3
      config={discountCalculatorConfig}
      calculate={calculateDiscount}
      t={t}
    />
  );
}
