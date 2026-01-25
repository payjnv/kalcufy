"use client";

import { useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";

interface TrackingOptions {
  calculatorSlug: string;
  calculatorName: string;
}

export function useCalculatorTracking({ calculatorSlug, calculatorName }: TrackingOptions) {
  const { data: session } = useSession();
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  const hasTrackedView = useRef(false);
  const hasTrackedCalculation = useRef(false);

  // Track VIEW on page load (once)
  useEffect(() => {
    if (hasTrackedView.current) return;
    hasTrackedView.current = true;

    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        calculatorSlug,
        language: locale,
        type: "VIEW",
      }),
    }).catch(console.error);
  }, [calculatorSlug, locale]);

  // Function to track calculation (call this when user calculates)
  const trackCalculation = () => {
    if (hasTrackedCalculation.current) return;
    hasTrackedCalculation.current = true;

    // Track in statistics (for everyone)
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        calculatorSlug,
        language: locale,
        type: "CALCULATION",
      }),
    }).catch(console.error);
  };

  // Function to save to history (only if logged in)
  const saveToHistory = (inputs: Record<string, unknown>, results: Record<string, unknown>) => {
    if (!session?.user) return; // Only save if logged in

    fetch("/api/history", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        calculatorSlug,
        calculatorName,
        inputs,
        results,
      }),
    }).catch(console.error);
  };

  return {
    trackCalculation,
    saveToHistory,
    isLoggedIn: !!session?.user,
  };
}
