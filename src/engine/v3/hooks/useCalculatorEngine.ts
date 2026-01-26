"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import type { 
  CalculatorConfigV3, 
  CalculatorState, 
  CalculatorResults,
  InputConfig 
} from "../types/engine.types";

// ============================================================================
// INTERFACES
// ============================================================================
interface UseCalculatorEngineProps {
  config: CalculatorConfigV3;
  calculate: (data: {
    values: Record<string, unknown>;
    units: Record<string, string>;
    unitSystem: "metric" | "imperial";
  }) => CalculatorResults;
  locale: string;
}

interface UseCalculatorEngineReturn {
  state: CalculatorState;
  results: CalculatorResults | null;
  // Actions
  setValue: (id: string, value: unknown) => void;
  setUnit: (id: string, unit: string) => void;
  setUnitSystem: (system: "metric" | "imperial") => void;
  calculateResults: () => void;
  resetCalculator: () => void;
  // Save/Share
  saveToHistory: () => Promise<void>;
  saveStatus: "idle" | "saving" | "saved" | "error";
  // Favorites
  isFavorite: boolean;
  toggleFavorite: () => void;
}

// ============================================================================
// HELPER: Initialize default values from config
// ============================================================================
function initializeValues(inputs: InputConfig[]): Record<string, unknown> {
  const values: Record<string, unknown> = {};
  inputs.forEach((input) => {
    values[input.id] = input.defaultValue ?? (input.type === "number" || input.type === "slider" || input.type === "unit-input" ? 0 : "");
  });
  return values;
}

function initializeUnits(inputs: InputConfig[]): Record<string, string> {
  const units: Record<string, string> = {};
  inputs.forEach((input) => {
    if (input.units && input.units.length > 0) {
      units[input.id] = input.defaultUnit || input.units[0].value;
    }
  });
  return units;
}

// ============================================================================
// MAIN HOOK
// ============================================================================
export default function useCalculatorEngine({
  config,
  calculate,
  locale,
}: UseCalculatorEngineProps): UseCalculatorEngineReturn {
  const hasTrackedView = useRef(false);
  const hasTrackedCalculation = useRef(false);

  // ─────────────────────────────────────────────────────────────────────────
  // STATE
  // ─────────────────────────────────────────────────────────────────────────
  const [state, setState] = useState<CalculatorState>(() => ({
    values: initializeValues(config.inputs),
    units: initializeUnits(config.inputs),
    unitSystem: config.unitSystem?.default || "metric",
    errors: {},
    isCalculating: false,
    hasCalculated: false,
  }));

  const [results, setResults] = useState<CalculatorResults | null>(null);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [isFavorite, setIsFavorite] = useState(false);

  // ─────────────────────────────────────────────────────────────────────────
  // TRACKING - View
  // ─────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (hasTrackedView.current) return;
    hasTrackedView.current = true;

    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        calculatorSlug: config.slug,
        language: locale,
        type: "VIEW",
      }),
    }).catch(console.error);
  }, [config.slug, locale]);

  // ─────────────────────────────────────────────────────────────────────────
  // LOAD FAVORITES FROM SESSION
  // ─────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    try {
      const favorites = JSON.parse(sessionStorage.getItem("calculator-favorites") || "[]");
      setIsFavorite(favorites.includes(config.slug));
    } catch {
      // Ignore
    }
  }, [config.slug]);

  // ─────────────────────────────────────────────────────────────────────────
  // ACTIONS
  // ─────────────────────────────────────────────────────────────────────────
  const setValue = useCallback((id: string, value: unknown) => {
    setState((prev) => ({
      ...prev,
      values: { ...prev.values, [id]: value },
    }));

    // Auto-calculate if enabled
    if (config.features?.autoCalculate !== false) {
      // Debounce calculation
      setTimeout(() => {
        calculateResults();
      }, 100);
    }
  }, [config.features?.autoCalculate]);

  const setUnit = useCallback((id: string, unit: string) => {
    setState((prev) => ({
      ...prev,
      units: { ...prev.units, [id]: unit },
    }));
  }, []);

  const setUnitSystem = useCallback((system: "metric" | "imperial") => {
    setState((prev) => ({
      ...prev,
      unitSystem: system,
    }));
  }, []);

  const calculateResults = useCallback(() => {
    setState((prev) => ({ ...prev, isCalculating: true }));

    try {
      const calculatedResults = calculate({
        values: state.values,
        units: state.units,
        unitSystem: state.unitSystem,
      });

      setResults(calculatedResults);
      setState((prev) => ({
        ...prev,
        isCalculating: false,
        hasCalculated: true,
      }));

      // Track calculation (once)
      if (!hasTrackedCalculation.current) {
        hasTrackedCalculation.current = true;
        fetch("/api/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            calculatorSlug: config.slug,
            language: locale,
            type: "CALCULATION",
          }),
        }).catch(console.error);
      }
    } catch (error) {
      console.error("Calculation error:", error);
      setState((prev) => ({
        ...prev,
        isCalculating: false,
        errors: { general: "Calculation error" },
      }));
    }
  }, [state.values, state.units, state.unitSystem, calculate, config.slug, locale]);

  const resetCalculator = useCallback(() => {
    setState({
      values: initializeValues(config.inputs),
      units: initializeUnits(config.inputs),
      unitSystem: config.unitSystem?.default || "metric",
      errors: {},
      isCalculating: false,
      hasCalculated: false,
    });
    setResults(null);
    setSaveStatus("idle");
    hasTrackedCalculation.current = false;
  }, [config.inputs, config.unitSystem?.default]);

  // ─────────────────────────────────────────────────────────────────────────
  // SAVE TO HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  const saveToHistory = useCallback(async () => {
    if (!results?.isValid) return;

    setSaveStatus("saving");
    try {
      const response = await fetch("/api/history", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          calculatorSlug: config.slug,
          calculatorName: config.name,
          category: config.category,
          inputs: state.values,
          results: results.values,
          language: locale,
        }),
      });

      if (response.ok) {
        setSaveStatus("saved");
        setTimeout(() => setSaveStatus("idle"), 3000);
      } else {
        setSaveStatus("error");
      }
    } catch {
      setSaveStatus("error");
    }
  }, [results, state.values, config.slug, config.name, config.category, locale]);

  // ─────────────────────────────────────────────────────────────────────────
  // TOGGLE FAVORITE
  // ─────────────────────────────────────────────────────────────────────────
  const toggleFavorite = useCallback(() => {
    try {
      const favorites = JSON.parse(sessionStorage.getItem("calculator-favorites") || "[]");
      let newFavorites: string[];

      if (favorites.includes(config.slug)) {
        newFavorites = favorites.filter((f: string) => f !== config.slug);
        setIsFavorite(false);
      } else {
        newFavorites = [...favorites, config.slug];
        setIsFavorite(true);
      }

      sessionStorage.setItem("calculator-favorites", JSON.stringify(newFavorites));
    } catch {
      // Ignore
    }
  }, [config.slug]);

  return {
    state,
    results,
    setValue,
    setUnit,
    setUnitSystem,
    calculateResults,
    resetCalculator,
    saveToHistory,
    saveStatus,
    isFavorite,
    toggleFavorite,
  };
}
