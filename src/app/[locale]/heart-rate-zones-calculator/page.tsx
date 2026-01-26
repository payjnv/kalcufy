"use client";

import { useLocale } from "next-intl";
import { CalculatorEngineV3 } from "@/engine/v3";
import { heartRateZonesConfig, calculateHeartRateZones } from "@/config/calculators/v3/heart-rate-zones.config";
import { useCalcTranslations } from "@/lib/useCalcTranslations";
import type { CalculatorResults } from "@/engine/v3/types/engine.types";

// =============================================================================
// ZONE VISUALIZATION (5 colored bars)
// =============================================================================
function getZoneVisualization(results: CalculatorResults) {
  if (!results?.metadata?.zones) return null;

  const zones = results.metadata.zones as Array<{
    zone: number;
    name: string;
    min: number;
    max: number;
    pct: number[];
    color: string;
  }>;

  const colors = ["bg-gray-400", "bg-blue-500", "bg-green-500", "bg-yellow-500", "bg-red-500"];
  
  // Distribution percentages (80/20 rule)
  const distribution = [10, 70, 10, 8, 2];

  return zones.map((z, i) => ({
    label: `Z${z.zone} ${z.name}`,
    value: z.max - z.min,
    percentage: distribution[i],
    color: colors[i],
    icon: "",
  }));
}

// =============================================================================
// VISIBLE RESULTS
// =============================================================================
function getVisibleResults(
  results: CalculatorResults,
  state: Record<string, unknown>
) {
  return [
    "maxHR",
    "restingHRResult",
    "hrReserve",
    "zone1",
    "zone2",
    "zone3",
    "zone4",
    "zone5",
    "rhrAnalysis",
  ];
}

// =============================================================================
// PAGE COMPONENT
// =============================================================================
export default function HeartRateZonesCalculatorPage() {
  const locale = useLocale();
  const { t } = useCalcTranslations(locale, "heart-rate-zones-calculator");

  return (
    <CalculatorEngineV3
      config={heartRateZonesConfig}
      calculate={calculateHeartRateZones}
      t={t}
      getDistributionBars={getZoneVisualization}
      getVisibleResults={getVisibleResults}
    />
  );
}
