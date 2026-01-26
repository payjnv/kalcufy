"use client";

import { useLocale } from "next-intl";
import { CalculatorEngineV3 } from "@/engine/v3";
import { tdeeCalculatorConfig, calculateTDEE } from "@/config/calculators/v3/tdee.config";
import { useCalcTranslations } from "@/lib/useCalcTranslations";
import type { CalculatorResults } from "@/engine/v3/types/engine.types";

// =============================================================================
// TDEE BREAKDOWN VISUALIZATION
// =============================================================================
function getTDEEBreakdown(results: CalculatorResults) {
  if (!results?.values) return null;

  const { tdee, bmr, activityCalories } = results.values;

  if (!tdee || !bmr) return null;

  // Calculate TEF (approximately 10% of calories eaten, which is roughly TDEE)
  const tef = Math.round((tdee as number) * 0.1);
  // Adjust activity to account for TEF
  const adjustedActivity = (activityCalories as number) - tef;

  const bmrPercent = Math.round(((bmr as number) / (tdee as number)) * 100);
  const activityPercent = Math.round((adjustedActivity / (tdee as number)) * 100);
  const tefPercent = 100 - bmrPercent - activityPercent;

  return [
    {
      label: "BMR (Rest)",
      value: bmr as number,
      percentage: bmrPercent,
      color: "bg-blue-500",
      icon: "🛋️",
    },
    {
      label: "Activity",
      value: adjustedActivity,
      percentage: activityPercent,
      color: "bg-green-500",
      icon: "🏃",
    },
    {
      label: "TEF (Digestion)",
      value: tef,
      percentage: tefPercent,
      color: "bg-amber-500",
      icon: "🍽️",
    },
  ];
}

// =============================================================================
// VISIBLE RESULTS
// =============================================================================
function getVisibleResults(
  results: CalculatorResults,
  state: Record<string, unknown>
) {
  // Always show these results
  return [
    "tdee",
    "bmr",
    "loseWeight",
    "loseFast",
    "gainWeight",
    "gainMuscle",
    "activityCalories",
    "weeklyTdee",
  ];
}

// =============================================================================
// PAGE COMPONENT
// =============================================================================
export default function TDEECalculatorPage() {
  const locale = useLocale();
  const { t } = useCalcTranslations(locale, "tdee-calculator");

  return (
    <CalculatorEngineV3
      config={tdeeCalculatorConfig}
      calculate={calculateTDEE}
      t={t}
      getDistributionBars={getTDEEBreakdown}
      getVisibleResults={getVisibleResults}
    />
  );
}
