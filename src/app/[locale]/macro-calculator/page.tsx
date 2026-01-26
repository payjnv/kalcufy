"use client";

import { useLocale } from "next-intl";
import { CalculatorEngineV3 } from "@/engine/v3";
import { macroCalculatorConfig, calculateMacros } from "@/config/calculators/v3/macro.config";
import { useCalcTranslations } from "@/lib/useCalcTranslations";
import type { CalculatorResults } from "@/engine/v3/types/engine.types";

// =============================================================================
// MACRO DISTRIBUTION VISUALIZATION
// =============================================================================
function getMacroDistribution(results: CalculatorResults) {
  if (!results?.values) return null;
  
  const { proteinGrams, carbsGrams, fatGrams, proteinPercent, carbsPercent, fatPercent } = results.values;
  
  if (!proteinGrams || !carbsGrams || !fatGrams) return null;

  return [
    {
      label: "Protein",
      value: proteinGrams as number,
      percentage: (proteinPercent as number) || 30,
      color: "bg-red-500",
      icon: "🥩",
    },
    {
      label: "Carbs",
      value: carbsGrams as number,
      percentage: (carbsPercent as number) || 40,
      color: "bg-amber-500",
      icon: "🍞",
    },
    {
      label: "Fat",
      value: fatGrams as number,
      percentage: (fatPercent as number) || 30,
      color: "bg-green-500",
      icon: "🥑",
    },
  ];
}

// =============================================================================
// INFO CARD DATA
// =============================================================================
function getInfoCardData(results: CalculatorResults) {
  if (!results?.values) return null;

  const { 
    targetCalories, 
    proteinGrams, 
    proteinPerLb, 
    mealProtein,
    mealsPerDay 
  } = results.values;

  // Calculate protein per kg
  const proteinPerKg = ((proteinPerLb as number) || 0) * 2.20462;

  return {
    title: "Nutrition Summary",
    icon: "📊",
    stats: [
      {
        label: "Daily Calories",
        value: (targetCalories as number)?.toLocaleString() || "—",
        unit: "cal",
      },
      {
        label: "Protein/lb",
        value: ((proteinPerLb as number) || 0).toFixed(2),
        unit: "g/lb",
      },
      {
        label: "Protein/kg",
        value: proteinPerKg.toFixed(1),
        unit: "g/kg",
      },
      {
        label: "Per Meal Protein",
        value: (mealProtein as number)?.toString() || "—",
        unit: "g",
      },
    ],
  };
}

// =============================================================================
// VISIBLE RESULTS BASED ON STATE
// =============================================================================
function getVisibleResults(
  results: CalculatorResults,
  state: Record<string, unknown>
) {
  // Always show main results
  const visibleIds = [
    "targetCalories",
    "proteinGrams",
    "carbsGrams",
    "fatGrams",
    "bmr",
    "tdee",
    "fiber",
    "proteinPerLb",
  ];

  // Show meal breakdown if meals > 1
  const mealsPerDay = parseInt((state.mealsPerDay as string) || "4", 10);
  if (mealsPerDay > 1) {
    visibleIds.push("mealCalories", "mealProtein");
  }

  return visibleIds;
}

// =============================================================================
// PAGE COMPONENT
// =============================================================================
export default function MacroCalculatorPage() {
  const locale = useLocale();
  const { t } = useCalcTranslations(locale, "macro-calculator");

  return (
    <CalculatorEngineV3
      config={macroCalculatorConfig}
      calculate={calculateMacros}
      t={t}
      getDistributionBars={getMacroDistribution}
      getInfoCardData={getInfoCardData}
      getVisibleResults={getVisibleResults}
    />
  );
}
