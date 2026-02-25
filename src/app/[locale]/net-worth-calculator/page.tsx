"use client";
import { Suspense } from "react";
import { useLocale } from "next-intl";
import { CalculatorEngineV4 } from "@/engine/v4";
import { netWorthCalculatorConfig, calculateNetWorth } from "@/calculators/net-worth-calculator";

function NetWorthCalculatorInner() {
  const locale = useLocale();
  return <CalculatorEngineV4 config={netWorthCalculatorConfig} calculate={calculateNetWorth} locale={locale} />;
}

export default function NetWorthCalculatorPage() {
  return (
    <Suspense fallback={null}>
      <NetWorthCalculatorInner />
    </Suspense>
  );
}
