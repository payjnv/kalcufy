"use client";
import { Suspense } from "react";
import { useLocale } from "next-intl";
import { CalculatorEngineV4 } from "@/engine/v4";
import { rentVsBuyCalculatorConfig, calculateRentVsBuy } from "@/calculators/rent-vs-buy-calculator";

function RentVsBuyInner() {
  const locale = useLocale();
  return <CalculatorEngineV4 config={rentVsBuyCalculatorConfig} calculate={calculateRentVsBuy} locale={locale} />;
}

export default function RentVsBuyPage() {
  return (
    <Suspense fallback={null}>
      <RentVsBuyInner />
    </Suspense>
  );
}
