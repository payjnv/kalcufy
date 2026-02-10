"use client";

/**
 * ============================================================================
 * CALCULATOR ENGINE V4 STANDALONE - PERFORMANCE OPTIMIZED
 * ============================================================================
 * Changes from original:
 * 1. REMOVED duplicate <Header /> (layout.tsx already renders it)
 * 2. REMOVED duplicate <main> (layout.tsx already wraps in <main>)
 * 3. REMOVED duplicate skip-to-content link (layout.tsx has one)
 * 4. REMOVED SideSkyscraperAds import (move to layout if needed)
 * 5. Dynamic import for DetailedTableModalV4 (rarely used)
 * 6. Kept all functionality intact
 * ============================================================================
 */

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { useSession } from "next-auth/react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";
import CalculatorSidebar from "@/components/CalculatorSidebar";
import AdBlock from "@/components/ads/AdBlock";
import MobileAdContainer from "@/components/ads/MobileAdContainer";
import SideSkyscraperAds from "@/components/ads/SideSkyscraperAds";

// Import V4 native components
import {
  InputCardV4,
  ResultsCardV4,
  ActionButtonsV4,
  CopyResultsButton,
  InfoCardV4,
  ChartV4,
  MultiChartV4,
  ReferenceGridV4,
  ProseSectionV4,
  ConsiderationsListV4,
  ExampleSectionV4,
  FAQAccordionV4,
  SourcesSectionV4,
  DistributionBarsV4,
  ModeSelectorV4,
  MobileResultsBarV4,
  RatingShareWidgetV4,
  PresetSelector,
  CompareButton,
  ComparePanel,
  SensitivityChart,
  CollapsibleSection,
  LazySection,
  parseValuesFromUrl,
} from "./components";
import { translateText } from "./utils/common-translations";

// Dynamic import for rarely-used heavy component
const DetailedTableModalV4 = dynamic(
  () => import("./components/DetailedTableModalV4"),
  { ssr: false }
);

import type { 
  CalculatorConfigV4, 
  CalculatorResults,
  SupportedLocale,
  TranslationFn,
  EducationSectionConfig,
} from "./types/engine.types";
import { getUnitGroup } from "./units/registry";
import { convert, convertSmart, guessDefaultUnit } from "./units/convert";

// =============================================================================
// DISCLAIMERS
// =============================================================================
const CATEGORY_DISCLAIMERS: Record<string, Record<SupportedLocale, string>> = {
  health: {
    en: "Estimates based on standard equations. Not a substitute for professional medical advice.",
    es: "Estimaciones basadas en ecuaciones estándar. No sustituye el consejo médico profesional.",
    pt: "Estimativas baseadas em equações padrão. Não substitui aconselhamento médico profissional.",
    fr: "Estimations basées sur des équations standard. Ne remplace pas un avis médical professionnel.",
    de: "Schätzungen basieren auf Standardgleichungen. Kein Ersatz für professionelle medizinische Beratung.",
  },
  finance: {
    en: "Results are estimates for informational purposes only. Consult a financial advisor for guidance.",
    es: "Los resultados son estimaciones solo con fines informativos. Consulte a un asesor financiero.",
    pt: "Os resultados são estimativas apenas para fins informativos. Consulte um assessor financeiro.",
    fr: "Les résultats sont des estimations à titre informatif uniquement. Consultez un conseiller financier.",
    de: "Ergebnisse sind nur Schätzungen zu Informationszwecken. Konsultieren Sie einen Finanzberater.",
  },
  math: {
    en: "Results based on standard mathematical formulas. Verify calculations for critical applications.",
    es: "Resultados basados en fórmulas matemáticas estándar. Verifique los cálculos para aplicaciones críticas.",
    pt: "Resultados baseados em fórmulas matemáticas padrão. Verifique os cálculos para aplicações críticas.",
    fr: "Résultats basés sur des formules mathématiques standard. Vérifiez les calculs pour les applications critiques.",
    de: "Ergebnisse basieren auf mathematischen Standardformeln. Überprüfen Sie Berechnungen für kritische Anwendungen.",
  },
  everyday: {
    en: "Results are estimates and may vary. Use as a general guide only.",
    es: "Los resultados son estimaciones y pueden variar. Úselos solo como guía general.",
    pt: "Os resultados são estimativas e podem variar. Use apenas como guia geral.",
    fr: "Les résultats sont des estimations et peuvent varier. Utilisez uniquement comme guide général.",
    de: "Ergebnisse sind Schätzungen und können variieren. Verwenden Sie nur als allgemeine Richtlinie.",
  },
};

// =============================================================================
// HELPERS
// =============================================================================
// SMART DEFAULTS: Initialize values respecting null as "empty field"
// =============================================================================
function initializeValues(
  inputs: CalculatorConfigV4["inputs"], 
  mode?: string
): Record<string, unknown> {
  const values: Record<string, unknown> = {};
  inputs.forEach((input) => {
    if (input.modes && mode && !input.modes.includes(mode)) return;
    
    // SMART DEFAULTS: If defaultValue is explicitly set (including null), use it
    // null means "show empty field with placeholder"
    if ('defaultValue' in input) {
      values[input.id] = input.defaultValue;
    } else {
      // Fallback by type only if defaultValue is not specified at all
      values[input.id] = input.type === "radio" ? "" : 
                         input.type === "checkbox" ? false : 
                         input.type === "select" ? "" : 0;
    }
  });
  return values;
}

function initializeUnits(inputs: CalculatorConfigV4["inputs"]): Record<string, string> {
  const units: Record<string, string> = {};
  inputs.forEach((input) => {
    if (input.units && input.units.length > 0) {
      units[input.id] = input.defaultUnit || input.units[0].value;
    }
  });
  return units;
}

// Initialize per-field unit selections from unitType config
function initializeFieldUnits(
  inputs: CalculatorConfigV4["inputs"],
  locale: string
): Record<string, string> {
  const fieldUnits: Record<string, string> = {};
  inputs.forEach((input) => {
    if (input.unitType) {
      if (input.defaultUnit) {
        fieldUnits[input.id] = input.defaultUnit;
      } else {
        // Smart default: guess best unit from locale
        const guessed = guessDefaultUnit(input.unitType, locale);
        fieldUnits[input.id] = guessed || getUnitGroup(input.unitType)?.baseUnit || "";
      }
    }
  });
  return fieldUnits;
}

// ─── UI DEFAULTS BY LOCALE (no need to repeat in every calculator) ───
const UI_DEFAULTS: Record<string, Record<string, string>> = {
  "buttons.copyResults":    { en: "Copy Results",       es: "Copiar Resultados",          pt: "Copiar Resultados",           fr: "Copier les Résultats",          de: "Ergebnisse Kopieren" },
  "buttons.resultsCopied":  { en: "Results Copied!",    es: "¡Resultados Copiados!",      pt: "Resultados Copiados!",        fr: "Résultats Copiés!",             de: "Ergebnisse Kopiert!" },
  "buttons.copied":         { en: "Copied!",            es: "¡Copiado!",                  pt: "Copiado!",                    fr: "Copié!",                        de: "Kopiert!" },
  "buttons.saveResults":    { en: "Save results",       es: "Guardar resultados",         pt: "Salvar resultados",           fr: "Sauvegarder les résultats",     de: "Ergebnisse speichern" },
  "buttons.shareResults":   { en: "Share Results",      es: "Compartir Resultados",       pt: "Compartilhar Resultados",     fr: "Partager les Résultats",        de: "Ergebnisse teilen" },
  "buttons.showDetails":    { en: "Show details",       es: "Ver detalles",               pt: "Ver detalhes",                fr: "Voir les détails",              de: "Details anzeigen" },
  "buttons.hideDetails":    { en: "Hide details",       es: "Ocultar detalles",           pt: "Ocultar detalhes",            fr: "Masquer les détails",           de: "Details ausblenden" },
  "rating.includesValues":  { en: "includes your values", es: "incluye tus valores",      pt: "inclui seus valores",         fr: "inclut vos valeurs",            de: "enthält Ihre Werte" },
  "rating.thankYou":        { en: "Thanks for rating!", es: "¡Gracias por calificar!",    pt: "Obrigado por avaliar!",       fr: "Merci pour votre note!",        de: "Danke für Ihre Bewertung!" },
  "rating.shareCalculator": { en: "Share this calculator", es: "Compartir esta calculadora", pt: "Compartilhar esta calculadora", fr: "Partager cette calculatrice", de: "Diesen Rechner teilen" },
  "accessibility.mobileResults": { en: "Results summary", es: "Resumen de resultados",    pt: "Resumo dos resultados",       fr: "Résumé des résultats",          de: "Zusammenfassung der Ergebnisse" },
  "ui.close":               { en: "Close",              es: "Cerrar",                     pt: "Fechar",                      fr: "Fermer",                        de: "Schließen" },
  "buttons.shareResults":   { en: "Share Results",      es: "Compartir Resultados",       pt: "Compartilhar Resultados",     fr: "Partager les Résultats",        de: "Ergebnisse teilen" },
  "buttons.linkCopied":     { en: "Link Copied!",       es: "¡Enlace Copiado!",           pt: "Link Copiado!",               fr: "Lien Copié!",                   de: "Link Kopiert!" },
};

// =============================================================================
// AUTO-SAVE: Persist non-sensitive field values across sessions
// =============================================================================
const SENSITIVE_FIELD_PATTERNS = [
  "weight", "height", "waist", "neck", "hip", "chest", "bodyFat", "bmi",
  "income", "salary", "debt", "loan", "savings", "balance", "payment",
  "price", "cost", "amount", "principal", "revenue", "profit", "budget",
  "wage", "rent", "mortgage", "creditCard", "net", "gross",
];

const AUTOSAVE_EXPIRY_MS = 48 * 60 * 60 * 1000; // 48 hours

function isSensitiveField(fieldId: string): boolean {
  const lower = fieldId.toLowerCase();
  return SENSITIVE_FIELD_PATTERNS.some(p => lower.includes(p));
}

function getAutoSaveKey(calculatorId: string): string {
  return `kalcufy-autosave-${calculatorId}`;
}

function saveToLocalStorage(
  calculatorId: string,
  values: Record<string, unknown>,
  fieldUnits: Record<string, string>
): void {
  try {
    const safeValues: Record<string, unknown> = {};
    for (const [key, val] of Object.entries(values)) {
      if (!isSensitiveField(key) && val !== null && val !== undefined) {
        safeValues[key] = val;
      }
    }
    const data = {
      values: safeValues,
      fieldUnits,
      timestamp: Date.now(),
    };
    localStorage.setItem(getAutoSaveKey(calculatorId), JSON.stringify(data));
  } catch {
    // localStorage full or unavailable — silently ignore
  }
}

function loadFromLocalStorage(
  calculatorId: string
): { values: Record<string, unknown>; fieldUnits: Record<string, string> } | null {
  try {
    const raw = localStorage.getItem(getAutoSaveKey(calculatorId));
    if (!raw) return null;
    const data = JSON.parse(raw);
    // Check expiry
    if (Date.now() - data.timestamp > AUTOSAVE_EXPIRY_MS) {
      localStorage.removeItem(getAutoSaveKey(calculatorId));
      return null;
    }
    return { values: data.values || {}, fieldUnits: data.fieldUnits || {} };
  } catch {
    return null;
  }
}

function clearAutoSave(calculatorId: string): void {
  try {
    localStorage.removeItem(getAutoSaveKey(calculatorId));
  } catch {
    // silently ignore
  }
}

// =============================================================================
// SHAREABLE URL: Generate URL with calculator values as params
// =============================================================================
function buildShareUrl(
  pathname: string,
  values: Record<string, unknown>,
  fieldUnits: Record<string, string>
): string {
  const params = new URLSearchParams();
  
  for (const [key, val] of Object.entries(values)) {
    if (val !== null && val !== undefined && val !== "") {
      params.set(key, String(val));
    }
  }
  
  // Add unit selections so shared link shows same units
  for (const [key, unit] of Object.entries(fieldUnits)) {
    if (unit) {
      params.set(`_u_${key}`, unit);
    }
  }
  
  params.set("shared", "1");
  
  const base = typeof window !== "undefined" ? window.location.origin : "https://kalcufy.com";
  return `${base}${pathname}?${params.toString()}`;
}

function parseShareParams(
  searchParams: URLSearchParams | null
): { values: Record<string, unknown>; fieldUnits: Record<string, string> } | null {
  if (!searchParams || !searchParams.get("shared")) return null;
  
  const values: Record<string, unknown> = {};
  const fieldUnits: Record<string, string> = {};
  
  searchParams.forEach((val, key) => {
    if (key === "shared") return;
    if (key.startsWith("_u_")) {
      // Unit selection
      fieldUnits[key.slice(3)] = val;
    } else {
      // Try to parse as number, fallback to string
      const num = Number(val);
      values[key] = !isNaN(num) && val.trim() !== "" ? num : val;
    }
  });
  
  return Object.keys(values).length > 0 ? { values, fieldUnits } : null;
}

// =============================================================================
// COUNTRY-SMART DEFAULTS: Import from centralized country config
// =============================================================================
import { getCountryConfig, getCountryFromLocale, COUNTRY_COOKIE, type CountryConfig } from "@/lib/country-config";

function getCountryFromCookie(): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/(?:^|; )kalcufy-country=([^;]*)/);
  return match ? decodeURIComponent(match[1]) : null;
}


function createTranslationFn(
  translations: CalculatorConfigV4["t"]["en"],
  locale: string = "en"
): TranslationFn {
  return (key: string, fallback?: string): string => {
    // 1. Try calculator-level translations first
    const parts = key.split(".");
    let current: unknown = translations;
    
    for (const part of parts) {
      if (current && typeof current === "object" && part in current) {
        current = (current as Record<string, unknown>)[part];
      } else {
        current = undefined;
        break;
      }
    }
    
    if (typeof current === "string") return current;

    // 2. Try UI_DEFAULTS for this locale
    const uiDefault = UI_DEFAULTS[key];
    if (uiDefault) {
      return uiDefault[locale] || uiDefault["en"] || fallback || key;
    }
    
    // 3. Fallback
    return fallback || key;
  };
}

// =============================================================================
// EDUCATION SECTION RENDERER
// =============================================================================
function RenderEducationSection({ 
  config,
  translations,
  locale,
}: { 
  config: EducationSectionConfig;
  translations: CalculatorConfigV4["t"]["en"]["education"][string];
  locale: SupportedLocale;
}) {
  if (!translations) return null;
  
  switch (config.type) {
    case "prose":
      return (
        <ProseSectionV4
          sectionId={config.id}
          title={translations.title}
          content={translations.content || ""}
          icon={config.icon}
        />
      );
      
    case "list":
      return (
        <ConsiderationsListV4
          sectionId={config.id}
          title={translations.title}
          items={translations.items || []}
          icon={config.icon}
        />
      );
      
    case "code-example":
      return (
        <ExampleSectionV4
          sectionId={config.id}
          title={translations.title}
          description={translations.description}
          examples={translations.examples || []}
          icon={config.icon}
          columns={config.columns}
          background={config.background}
        />
      );
      
    case "cards":
      if (!translations.cards) return null;
      return (
        <div 
          className="bg-white rounded-2xl border border-slate-200 p-6" 
          role="region"
          aria-labelledby={`section-${config.id}`}
        >
          <h3 
            id={`section-${config.id}`}
            className="text-lg font-bold text-slate-900 mb-4"
          >
            {config.icon && <span aria-hidden="true">{config.icon} </span>}
            {translations.title}
          </h3>
          <ul className="space-y-3 text-slate-600">
            {translations.cards.map((card, index) => (
              <li key={index} className="flex items-start gap-2">
                {card.icon && <span className="text-lg mt-0.5">{card.icon}</span>}
                {!card.icon && <span className="text-blue-500 mt-1">•</span>}
                <span>
                  <strong>{card.title}:</strong> {card.description}
                </span>
              </li>
            ))}
          </ul>
        </div>
      );
      
    default:
      return null;
  }
}

// =============================================================================
// MAIN ENGINE COMPONENT
// =============================================================================
export default function CalculatorEngineV4({
  config,
  calculate,
  locale,
}: {
  config: CalculatorConfigV4;
  calculate: (data: {
    values: Record<string, unknown>;
    units: Record<string, string>;
    unitSystem: "metric" | "imperial";
    mode?: string;
  }) => CalculatorResults;
  locale: SupportedLocale;
}) {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  
  // Get translations for current locale
  const translations = config.t[locale] || config.t.en;
  
  // Create translation function
  const t = useMemo(() => createTranslationFn(translations, locale), [translations, locale]);
  
  // Load values from URL if shared (NEW: parse both values AND fieldUnits)
  const sharedData = useMemo(
    () => parseShareParams(searchParams),
    [searchParams]
  );
  // Legacy compat
  const sharedValues = useMemo(
    () => sharedData?.values || parseValuesFromUrl(searchParams),
    [sharedData, searchParams]
  );
  
  // ═══════════════════════════════════════════════════════════════════════════
  // STATE
  // ═══════════════════════════════════════════════════════════════════════════
  // ═══════════════════════════════════════════════════════════════════════════
  // COUNTRY DETECTION
  // ═══════════════════════════════════════════════════════════════════════════
  const detectedCountry = useMemo(() => {
    const fromCookie = getCountryFromCookie();
    return fromCookie || getCountryFromLocale(locale);
  }, [locale]);
  
  const countryConfig = useMemo(() => getCountryConfig(detectedCountry), [detectedCountry]);

  // Auto-save: try to restore saved values (non-sensitive only)
  const savedData = useMemo(() => loadFromLocalStorage(config.id), [config.id]);

  const [values, setValues] = useState<Record<string, unknown>>(() => {
    const initial = initializeValues(config.inputs, config.modes?.default);
    // Priority: URL shared values > auto-saved values > defaults
    if (sharedValues) return { ...initial, ...sharedValues };
    if (savedData?.values) return { ...initial, ...savedData.values };
    return initial;
  });
  const [units, setUnits] = useState<Record<string, string>>(() => 
    initializeUnits(config.inputs)
  );
  const [unitSystem, setUnitSystem] = useState<"metric" | "imperial">(
    config.unitSystem?.default || "metric"
  );
  const [fieldUnits, setFieldUnits] = useState<Record<string, string>>(() => {
    const initial = initializeFieldUnits(config.inputs, locale);
    // Priority: URL shared units > auto-saved units > country-smart defaults > config defaults
    if (sharedData?.fieldUnits && Object.keys(sharedData.fieldUnits).length > 0) {
      return { ...initial, ...sharedData.fieldUnits };
    }
    if (savedData?.fieldUnits) return { ...initial, ...savedData.fieldUnits };
    // Country-smart: override defaultUnit based on detected country
    const countryUnits = countryConfig.unitPreferences;
    const adjusted = { ...initial };
    config.inputs.forEach(input => {
      if (input.unitType && countryUnits[input.unitType]) {
        const countryUnit = countryUnits[input.unitType];
        const allowed = input.allowedUnits;
        if (!allowed || allowed.includes(countryUnit)) {
          adjusted[input.id] = countryUnit;
        }
      }
    });
    return adjusted;
  });
  const [shareUrl, setShareUrl] = useState<string>("");
  const [shareCopied, setShareCopied] = useState(false);
  const [currentMode, setCurrentMode] = useState<string | undefined>(
    config.modes?.default
  );
  const [results, setResults] = useState<CalculatorResults | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [showCompare, setShowCompare] = useState(false);
  
  // Tracking refs
  const hasTrackedView = useRef(false);
  const hasTrackedCalculation = useRef(false);

  // ═══════════════════════════════════════════════════════════════════════════
  // CALCULATION
  // ═══════════════════════════════════════════════════════════════════════════

  // LEGACY SHIM: Convert unitType inputs to old-style values
  // New inputs: id="weight" + unitType="weight" + fieldUnit="lbs"
  // Old calculate() reads: values.weightKg, values.weightLbs, values.unitSystem
  // This shim generates BOTH so old calculate() functions work without changes
  const buildLegacyValues = useCallback((
    vals: Record<string, unknown>,
    fUnits: Record<string, string>,
  ): Record<string, unknown> => {
    const legacy = { ...vals };
    let hasUnitType = false;

    config.inputs.forEach((input) => {
      if (!input.unitType || vals[input.id] == null) return;
      hasUnitType = true;
      const rawValue = vals[input.id] as number;
      const currentUnit = fUnits[input.id] || "";

      if (input.unitType === "weight") {
        // Generate both kg and lbs versions
        if (currentUnit === "kg") {
          legacy.weightKg = rawValue;
          legacy.weightLbs = rawValue * 2.20462;
        } else {
          // lbs (or any imperial weight)
          legacy.weightLbs = rawValue;
          legacy.weightKg = rawValue / 2.20462;
        }
      }

      if (input.unitType === "height") {
        if (currentUnit === "cm") {
          legacy.heightCm = rawValue;
          const totalInches = rawValue / 2.54;
          legacy.heightFt = Math.floor(totalInches / 12);
          legacy.heightIn = totalInches % 12;
        } else if (currentUnit === "in") {
          const totalInches = rawValue;
          legacy.heightCm = totalInches * 2.54;
          legacy.heightFt = Math.floor(totalInches / 12);
          legacy.heightIn = totalInches % 12;
        } else if (currentUnit === "ft") {
          const totalInches = rawValue * 12;
          legacy.heightCm = totalInches * 2.54;
          legacy.heightFt = Math.floor(rawValue);
          legacy.heightIn = (rawValue - Math.floor(rawValue)) * 12;
        } else if (currentUnit === "ft_in") {
          // ft_in: rawValue is already in base unit (cm)
          legacy.heightCm = rawValue;
          const totalInches = rawValue / 2.54;
          legacy.heightFt = Math.floor(totalInches / 12);
          legacy.heightIn = Math.round((totalInches % 12) * 10) / 10;
        }
      }
    });

    // Inject unitSystem if any unitType field exists
    if (hasUnitType && !vals.unitSystem) {
      const weightUnit = fUnits.weight || "";
      legacy.unitSystem = (weightUnit === "kg") ? "metric" : "imperial";
    }

    return legacy;
  }, [config.inputs]);

  useEffect(() => {
    if (config.features?.autoCalculate !== false) {
      try {
        // Merge fieldUnits into units so calculate() can read data.units.weight etc.
        const mergedUnits = { ...units, ...fieldUnits };
        // Build legacy values for backwards compatibility with old calculate() functions
        const legacyValues = buildLegacyValues(values, fieldUnits);
        const result = calculate({ values: legacyValues, units: mergedUnits, unitSystem, mode: currentMode, t: translations, fieldUnits });
        setResults(result);
        
        // Track first calculation
        if (!hasTrackedCalculation.current && result.isValid) {
          hasTrackedCalculation.current = true;
          fetch("/api/track", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              calculatorSlug: translations.slug,
              language: locale,
              type: "CALCULATION"
            })
          }).catch(() => {});
        }
      } catch (e) {
        console.error("Calculation error:", e);
      }
    }
  }, [values, units, unitSystem, currentMode, calculate, config.features?.autoCalculate, translations.slug, locale, fieldUnits, buildLegacyValues]);

  // Track page view
  useEffect(() => {
    if (hasTrackedView.current) return;
    hasTrackedView.current = true;
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        calculatorSlug: translations.slug,
        language: locale,
        type: "VIEW"
      })
    }).catch(() => {});
  }, [translations.slug, locale]);

  // Auto-save values to localStorage (debounced, non-sensitive only)
  useEffect(() => {
    const timer = setTimeout(() => {
      saveToLocalStorage(config.id, values, fieldUnits);
    }, 500); // 500ms debounce
    return () => clearTimeout(timer);
  }, [config.id, values, fieldUnits]);

  // ═══════════════════════════════════════════════════════════════════════════
  // HANDLERS
  // ═══════════════════════════════════════════════════════════════════════════
  const handleValueChange = useCallback((id: string, value: unknown) => {
    setValues(prev => {
      const updated = { ...prev, [id]: value };
      const input = config.inputs.find(i => i.id === id);
      if (input?.linkedValues && typeof value === "string" && input.linkedValues[value]) {
        Object.assign(updated, input.linkedValues[value]);
      }
      return updated;
    });
  }, [config.inputs]);

  const handleUnitChange = useCallback((id: string, unit: string) => {
    setUnits(prev => ({ ...prev, [id]: unit }));
  }, []);

  const handleUnitSystemChange = useCallback((system: "metric" | "imperial") => {
    setUnitSystem(system);
  }, []);

  // Handle per-field unit dropdown changes with auto-conversion
  const handleFieldUnitChange = useCallback((inputId: string, newUnit: string) => {
    const input = config.inputs.find(i => i.id === inputId);
    if (!input?.unitType) return;

    const oldUnit = fieldUnits[inputId];
    const autoConvert = input.autoConvert !== false; // Default: true

    // Auto-convert the value to the new unit
    if (autoConvert && oldUnit && oldUnit !== newUnit) {
      const currentValue = values[inputId] as number;
      if (currentValue !== null && currentValue !== undefined && !isNaN(currentValue)) {
        // ✅ USE convertSmart TO HANDLE DUAL UNITS (ft/in)
        const converted = convertSmart(currentValue, oldUnit, newUnit, input.unitType);
        if (!isNaN(converted)) {
          setValues(prev => ({ ...prev, [inputId]: converted }));
        }
      }
    }

    // Sync fields with same unitType — respecting syncGroup
    // syncGroup: false → independent, never syncs
    // syncGroup: "groupName" → only syncs with same groupName
    // syncGroup: undefined → syncs all with same unitType (legacy behavior)
    setFieldUnits(prev => {
      const updated = { ...prev, [inputId]: newUnit };

      // If this field explicitly opts out of sync, skip
      if (input.syncGroup === false) {
        return updated;
      }

      if (input.unitType) {
        config.inputs.forEach(inp => {
          if (inp.id === inputId || inp.unitType !== input.unitType) return;

          // Determine if this sibling should sync
          let shouldSync = false;
          if (input.syncGroup !== undefined && input.syncGroup !== false) {
            // Named group: only sync if sibling has same named group
            shouldSync = inp.syncGroup === input.syncGroup;
          } else if (input.syncGroup === undefined) {
            // Default behavior: sync all with same unitType UNLESS sibling opts out
            shouldSync = inp.syncGroup !== false;
          }

          if (shouldSync) {
            if (inp.autoConvert !== false) {
              const val = values[inp.id] as number;
              if (val !== null && val !== undefined && !isNaN(val)) {
                // ✅ USE convertSmart FOR DUAL UNIT SUPPORT
                const conv = convertSmart(val, prev[inp.id], newUnit, inp.unitType!);
                if (!isNaN(conv)) {
                  setValues(v => ({ ...v, [inp.id]: conv }));
                }
              }
            }
            updated[inp.id] = newUnit;
          }
        });
      }
      return updated;
    });
  }, [config.inputs, fieldUnits, values]);

  const handleModeChange = useCallback((mode: string) => {
    setCurrentMode(mode);
    setValues(initializeValues(config.inputs, mode));
    clearAutoSave(config.id);
  }, [config.inputs, config.id]);

  const handlePresetApply = useCallback((presetValues: Record<string, unknown>) => {
    // Clear auto-save when applying preset (fresh start)
    clearAutoSave(config.id);
    
    // ✅ ROOT FIX: Preset values are in the field's defaultUnit (lbs, in, etc.)
    // When applying a preset, reset fieldUnits back to defaultUnit so there's
    // no ambiguity about what unit the preset values are in.
    //
    // EXCEPTION: If defaultUnit is a dual unit (e.g. "ft_in"), the engine can't
    // store a dual value as a single number. In that case, the preset value is
    // treated as base unit (cm) and we DON'T reset fieldUnits for that field.
    
    // 1. Reset fieldUnits to defaultUnit for fields with unitType
    const resetUnits: Record<string, string> = {};
    const needsBaseConversion: Set<string> = new Set();
    
    config.inputs.forEach(input => {
      if (!input.unitType || !input.defaultUnit) return;
      
      // Check if defaultUnit is a dual unit
      const group = getUnitGroup(input.unitType);
      const unitDef = group?.units.find(u => u.id === input.defaultUnit);
      
      if (unitDef?.dualConfig) {
        // Dual unit (ft_in): preset value must be in base unit (cm)
        // Keep fieldUnits at defaultUnit (ft_in) — DualNumberInput will
        // convert the base value (cm) to display (ft | in) automatically
        resetUnits[input.id] = input.defaultUnit;
        needsBaseConversion.add(input.id);
      } else {
        // Regular unit: preset value is in defaultUnit, reset dropdown
        resetUnits[input.id] = input.defaultUnit;
      }
    });
    
    if (Object.keys(resetUnits).length > 0) {
      setFieldUnits(prev => ({ ...prev, ...resetUnits }));
    }
    
    // 2. Set values — for dual defaultUnits, convert from defaultUnit assumptions
    // For regular units: values are already in defaultUnit, no conversion needed
    // For dual units: values are in base unit (cm), which is what the engine stores internally
    setValues(prev => ({ ...prev, ...presetValues }));
  }, [config.inputs, config.id]);

  const saveToHistory = useCallback(async () => {
    if (!session?.user || !results?.isValid) return;
    setSaveStatus("saving");
    try {
      await fetch("/api/history", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          calculatorSlug: translations.slug,
          calculatorName: translations.name,
          category: config.category,
          inputs: values,
          results: results.values,
          language: locale,
        })
      });
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 2000);
    } catch {
      setSaveStatus("error");
    }
  }, [session, results, translations, config.category, values, locale]);

  // Export handlers
  const handleExportPDF = useCallback(async () => {
    const { exportToPDF } = await import("./components/ExportUtils");
    await exportToPDF({
      calculatorName: translations.name,
      calculatorSlug: translations.slug,
      date: new Date().toISOString().split("T")[0],
      locale,
      inputs: config.inputs.map(input => ({
        label: translations.inputs[input.id]?.label || input.id,
        value: String(values[input.id] ?? ""),
      })),
      results: config.results.map(result => ({
        label: translations.results[result.id]?.label || result.id,
        value: results?.formatted[result.id] || "--",
        isPrimary: result.type === "primary",
      })),
      summary: results?.summary || "",
    });
  }, [translations, config, values, results, locale]);

  const handleExportCSV = useCallback(async () => {
    const { exportToCSV } = await import("./components/ExportUtils");
    exportToCSV({
      calculatorName: translations.name,
      calculatorSlug: translations.slug,
      date: new Date().toISOString().split("T")[0],
      locale,
      inputs: config.inputs.map(input => ({
        label: translations.inputs[input.id]?.label || input.id,
        value: String(values[input.id] ?? ""),
      })),
      results: config.results.map(result => ({
        label: translations.results[result.id]?.label || result.id,
        value: results?.formatted[result.id] || "--",
        isPrimary: result.type === "primary",
      })),
      summary: results?.summary || "",
    });
  }, [translations, config, values, results, locale]);

  // Share URL handler — uses /api/share shortener for clean links
  const [shareLoading, setShareLoading] = useState(false);
  const handleShareUrl = useCallback(async () => {
    if (shareLoading) return;
    setShareLoading(true);
    try {
      const res = await fetch("/api/share", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          calculatorId: config.id,
          calculatorSlug: translations.slug || config.id,
          locale,
          values: { ...values, ...Object.fromEntries(Object.entries(fieldUnits).map(([k, v]) => [`_u_${k}`, v])) },
          results: results ? { formatted: results.formatted, summary: results.summary } : null,
          unitSystem: fieldUnits.weight?.includes("lbs") ? "imperial" : "metric",
        }),
      });
      const data = await res.json();
      if (data.shareUrl) {
        setShareUrl(data.shareUrl);
        await navigator.clipboard.writeText(data.shareUrl);
        setShareCopied(true);
        setTimeout(() => setShareCopied(false), 3000);
      } else {
        // Fallback to long URL if API fails
        const url = buildShareUrl(pathname, values, fieldUnits);
        setShareUrl(url);
        await navigator.clipboard.writeText(url);
        setShareCopied(true);
        setTimeout(() => setShareCopied(false), 3000);
      }
    } catch {
      // Fallback to long URL
      const url = buildShareUrl(pathname, values, fieldUnits);
      setShareUrl(url);
      navigator.clipboard.writeText(url).then(() => {
        setShareCopied(true);
        setTimeout(() => setShareCopied(false), 3000);
      });
    } finally {
      setShareLoading(false);
    }
  }, [config.id, translations.slug, locale, pathname, values, fieldUnits, results, shareLoading]);

  // Cross-field validation
  const crossFieldErrors = useMemo(() => {
    const errs: Record<string, string> = {};
    const rules = (config as Record<string, unknown>).crossValidation as Array<{
      id: string;
      fieldA: string;
      fieldB: string;
      condition: "lessThan" | "greaterThan" | "lessThanOrEqual" | "greaterThanOrEqual";
      message?: string;
      errorField?: string;
    }> || [];
    for (const rule of rules) {
      const fieldAVal = Number(values[rule.fieldA]);
      const fieldBVal = Number(values[rule.fieldB]);
      
      if (isNaN(fieldAVal) || isNaN(fieldBVal)) continue;
      if (values[rule.fieldA] === null || values[rule.fieldB] === null) continue;
      if (values[rule.fieldA] === undefined || values[rule.fieldB] === undefined) continue;
      
      let violated = false;
      switch (rule.condition) {
        case "lessThan":
          violated = fieldAVal >= fieldBVal;
          break;
        case "greaterThan":
          violated = fieldAVal <= fieldBVal;
          break;
        case "lessThanOrEqual":
          violated = fieldAVal > fieldBVal;
          break;
        case "greaterThanOrEqual":
          violated = fieldAVal < fieldBVal;
          break;
      }
      
      if (violated) {
        const msgKey = `crossValidation.${rule.id}`;
        const defaultMsg = rule.message || `Invalid: check ${rule.fieldA} vs ${rule.fieldB}`;
        errs[rule.errorField || rule.fieldA] = t(msgKey, defaultMsg);
      }
    }
    return errs;
  }, [values, config, t]);

  // Merge errors: standard + cross-field
  const mergedErrors = useMemo(() => ({
    ...errors,
    ...crossFieldErrors,
  }), [errors, crossFieldErrors]);

  // Country-smart placeholder override
  const getLocalePlaceholder = useCallback((inputId: string, originalPlaceholder?: string): string | undefined => {
    return countryConfig.placeholders[inputId] || originalPlaceholder;
  }, [countryConfig]);
  const disclaimer = translations.disclaimer || 
    CATEGORY_DISCLAIMERS[config.category]?.[locale] || 
    CATEGORY_DISCLAIMERS[config.category]?.en || "";
  
  const tooltips = translations.tooltips || {};
  
  const presetsEnabled = config.features?.presetsEnabled !== false && 
    config.presets && config.presets.length > 0;
  const compareEnabled = config.features?.compareEnabled === true;
  const sensitivityEnabled = config.features?.sensitivityEnabled === true && 
    config.sensitivity;

  // Group education sections by type for layout
  const educationSections = config.educationSections || [];
  const cardSections = educationSections.filter(s => s.type === "cards");
  const listSections = educationSections.filter(s => s.type === "list");
  const exampleSections = educationSections.filter(s => s.type === "code-example");
  const proseSections = educationSections.filter(s => s.type === "prose");

  // ═══════════════════════════════════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════════════════════════════════
  return (
    <div className="overflow-x-hidden w-full">
      {/* Live Region for Screen Readers */}
      <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        {results?.summary || ""}
      </div>

      {/* 
        NOTE: <Header /> is NOT rendered here.
        Layout.tsx already renders Header + main wrapper + Footer.
        This component renders INSIDE layout's <main>.
      */}
      
      <SideSkyscraperAds />
      
      <div id="calculator-content" className="md:min-h-screen bg-gradient-to-b from-slate-50 to-white pb-24 lg:pb-8 overflow-x-hidden max-w-[100vw]">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-blue-50 to-white pt-4 pb-0 md:py-6 overflow-hidden">
          <div className="container mx-auto px-2 sm:px-4 max-w-6xl overflow-hidden">
            {/* Breadcrumbs */}
            <nav aria-label="Breadcrumb" className="hidden md:flex items-center gap-2 text-sm text-slate-600 mb-3 md:mb-4">
              <Link href={`/${locale}`} className="hover:text-blue-600 transition-colors">
                {t("common.home", "Home")}
              </Link>
              <span className="text-slate-400">/</span>
              <Link href={`/${locale}/calculators`} className="hover:text-blue-600 transition-colors">
                {t("common.calculators", "Calculators")}
              </Link>
              <span className="text-slate-400">/</span>
              <span className="text-slate-900 font-medium">
                {translations.breadcrumb || translations.name}
              </span>
            </nav>
            
            {/* Title Row */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-1 md:gap-4">
              <div className="min-w-0">
                {/* Title + Rating inline */}
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-900">
                    {translations.name}
                  </h1>
                  <RatingShareWidgetV4
                    calculatorSlug={translations.slug}
                    calculatorName={translations.name}
                    calculatorId={config.id}
                    variant="hero"
                    values={values}
                    results={results?.values}
                    unitSystem={unitSystem}
                    locale={locale}
                    t={t}
                  />
                </div>
                {/* Subtitle: hidden on mobile, visible on desktop. Still in DOM for SEO crawlers */}
                <p className="hidden md:block text-slate-600 mt-1">{translations.subtitle}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Mobile Ad */}
        {config.ads?.mobileHero && (
          <MobileAdContainer slot="calculator-mobile-hero" position="top" />
        )}

        {/* Main Calculator Section */}
        <section className="py-4 overflow-hidden">
          <div className="container mx-auto px-2 sm:px-4 max-w-6xl overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-8 overflow-hidden">
              {/* Left: Inputs */}
              <div className="space-y-6 min-w-0 px-0.5 -mx-0.5">
                {/* Presets */}
                {presetsEnabled && (
                  <PresetSelector
                    presets={config.presets!}
                    translations={translations.presets || {}}
                    onApply={handlePresetApply}
                    title={t("ui.quickStart", "Quick Start:")}
                  />
                )}

                {/* Mode Selector */}
                {config.modes?.enabled && (
                  <ModeSelectorV4
                    modes={config.modes.options.map(m => ({
                      id: m.id,
                      label: translations.modes?.[m.id] || m.id,
                      icon: m.icon,
                    }))}
                    currentMode={currentMode || config.modes.default}
                    onChange={handleModeChange}
                  />
                )}

                {/* Input Card */}
                <InputCardV4
                  inputs={config.inputs.map(input => ({
                    ...input,
                    label: translations.inputs[input.id]?.label || input.id,
                    helpText: translations.inputs[input.id]?.helpText,
                    suffix: input.unitType ? undefined : (translations.inputs[input.id]?.suffix || input.unitOptions?.[unitSystem]?.suffix || input.suffix),
                    placeholder: getLocalePlaceholder(input.id, translations.inputs[input.id]?.placeholder || input.placeholder),
                    options: input.options?.map(opt => ({
                      ...opt,
                      label: translations.inputs[input.id]?.options?.[opt.value] || opt.value,
                    })),
                    // Unit Dropdown System: inject current unit + handler
                    _fieldUnit: input.unitType ? fieldUnits[input.id] : undefined,
                    _onFieldUnitChange: input.unitType ? (newUnit: string) => handleFieldUnitChange(input.id, newUnit) : undefined,
                  }))}
                  inputGroups={config.inputGroups}
                  values={values}
                  units={units}
                  unitSystem={unitSystem}
                  errors={mergedErrors}
                  onChange={handleValueChange}
                  onUnitChange={handleUnitChange}
                  onUnitSystemChange={handleUnitSystemChange}
                  t={t}
                  showUnitSystemToggle={config.unitSystem?.enabled}
                  currentMode={currentMode}
                  locale={locale}
                />

                {/* Compare Button */}
                {compareEnabled && (
                  <CompareButton 
                    onClick={() => setShowCompare(true)} 
                    label={t("ui.compare", "Compare Scenarios")}
                  />
                )}
              </div>

              {/* Right: Results */}
              <div className="space-y-6 min-w-0">
                {/* Results Card - Hidden on mobile (modal shows results instead) */}
                <div className="hidden md:block">
                <ResultsCardV4
                  results={results}
                  resultConfigs={config.results.map(r => ({
                    ...r,
                    label: translations.results[r.id]?.label || r.id,
                    description: translations.results[r.id]?.description,
                  }))}
                  tooltips={tooltips}
                  hasCalculated={true}
                  isCalculating={false}
                  t={t}
                  locale={locale}
                />
                </div>

                {/* Detailed Table Button - Own row outside results card */}
                {config.detailedTable && results?.metadata?.tableData && (results.metadata.tableData as Record<string, string | number>[]).length > 0 && (
                  <DetailedTableModalV4
                    config={config.detailedTable}
                    data={results.metadata.tableData as Record<string, string | number>[]}
                    t={t}
                  />
                )}

                {/* Chart Visualization (Single) */}
                {config.chart && !config.charts && results?.metadata?.chartData && (results.metadata.chartData as Array<Record<string, unknown>>).length > 0 && (
                  <ChartV4
                    config={config.chart}
                    data={results.metadata.chartData as Array<Record<string, unknown>>}
                    translations={translations.chart || { title: "Chart", series: {} }}
                    locale={locale}
                  />
                )}

                {/* Multi-Chart Visualization (Tabbed) */}
                {config.charts && config.charts.length > 0 && results?.metadata?.chartsData && (
                  <MultiChartV4
                    charts={config.charts}
                    chartsData={results.metadata.chartsData as Record<string, Array<Record<string, unknown>>>}
                    translations={translations.charts || { title: "Charts", series: {}, tabs: {} }}
                    locale={locale}
                  />
                )}

                {/* Action Buttons - Hidden on mobile (modal has them) */}
                <div className="hidden md:block">
                {results && (
                  <div className="space-y-3">
                    {/* Copy Results Button */}
                    <CopyResultsButton
                      results={results}
                      resultConfigs={config.results.map(r => ({
                        ...r,
                        label: translations.results[r.id]?.label || r.id,
                      }))}
                      calculatorName={translations.name}
                      t={t}
                      locale={locale}
                    />
                    {/* Share URL Button */}
                    {results.isValid && (
                      <button
                        onClick={handleShareUrl}
                        disabled={shareLoading}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all text-sm font-medium disabled:opacity-50"
                        title={t("buttons.shareResults", "Share Results")}
                      >
                        {shareLoading ? (
                          <>
                            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                            <span>{t("buttons.generating", "Generating...")}</span>
                          </>
                        ) : shareCopied ? (
                          <>
                            <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                            <span className="text-green-600">{t("buttons.linkCopied", "Link Copied!")}</span>
                          </>
                        ) : (
                          <>
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                            <span>{t("buttons.shareResults", "Share Results")}</span>
                          </>
                        )}
                      </button>
                    )}
                    <ActionButtonsV4
                      onExportPDF={config.features?.exportPDF !== false ? handleExportPDF : undefined}
                      onExportCSV={config.features?.exportCSV !== false ? handleExportCSV : undefined}
                      onSave={config.features?.saveHistory !== false ? saveToHistory : undefined}
                      saveStatus={saveStatus}
                      isLoggedIn={!!session?.user}
                      isPro={(session?.user as { isPro?: boolean })?.isPro || false}
                      t={t}
                      hasResults={!!results}
                    />
                  </div>
                )}
                </div>

                {/* Sensitivity Chart */}
                {sensitivityEnabled && config.sensitivity && (
                  <SensitivityChart
                    config={config.sensitivity}
                    currentValues={values}
                    calculate={calculate}
                    inputLabel={translations.inputs[config.sensitivity.inputId]?.label}
                    resultLabel={translations.results[config.sensitivity.resultId]?.label}
                    title={t("ui.sensitivity", "Sensitivity Analysis")}
                  />
                )}

                {/* Info Cards */}
                {config.infoCards?.map((card) => {
                  const cardT = translations.infoCards[card.id];
                  if (!cardT) return null;
                  
                  // Build items array - support both array and object formats
                  let cardItems: Array<{ label: string; valueKey?: string; icon?: string; color?: string }> = [];
                  
                  if (Array.isArray(cardT.items)) {
                    // Format: items: ["tip1", "tip2"] or items: [{label, valueKey}]
                    cardItems = cardT.items.map((item, i) => ({
                      label: typeof item === "string" ? item : item.label,
                      valueKey: typeof item === "object" ? item.valueKey : card.items?.[i]?.valueKey,
                      icon: card.items?.[i]?.icon,
                      color: card.items?.[i]?.color,
                    }));
                  } else if (cardT.items && typeof cardT.items === 'object') {
                    // Format: items: { keyId: "Label Text" } - map from config.items
                    cardItems = (card.items || []).map((configItem) => ({
                      label: cardT.items[configItem.id] || configItem.id,
                      valueKey: configItem.valueKey,
                      icon: configItem.icon,
                      color: configItem.color,
                    }));
                  }
                  
                  return (
                    <InfoCardV4
                      key={card.id}
                      cardId={card.id}
                      title={cardT.title}
                      items={cardItems}
                      type={card.type}
                      icon={card.icon}
                      columns={card.columns}
                      results={results}
                    />
                  );
                })}

                {/* Reference Data */}
                {config.referenceData?.map((ref) => {
                  const refT = translations.referenceData[ref.id];
                  if (!refT) return null;
                  
                  return (
                    <ReferenceGridV4
                      key={ref.id}
                      refId={ref.id}
                      title={refT.title}
                      items={refT.items}
                      icon={ref.icon}
                      columns={ref.columns}
                    />
                  );
                })}

                {/* Rating Widget */}
                <RatingShareWidgetV4
                  calculatorSlug={translations.slug}
                  calculatorName={translations.name}
                  calculatorId={config.id}
                  variant="default"
                  values={values}
                  results={results?.values}
                  unitSystem={unitSystem}
                  locale={locale}
                  t={t}
                />

                {/* Disclaimer */}
                {disclaimer && (
                  <p className="text-xs text-slate-400 text-center italic px-4">
                    {disclaimer}
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Desktop Ad After Results */}
        {config.ads?.sidebar !== false && (
          <section className="py-2 hidden md:block">
            <div className="container mx-auto px-2 sm:px-4 max-w-6xl">
              <AdBlock slot="calculator-after-results" />
            </div>
          </section>
        )}

        {/* Mobile: Collapsible Sections (Lazy Loaded) */}
        <div className="md:hidden overflow-hidden">
          <LazySection minHeight="400px">
            <section className="py-4 overflow-hidden">
              <div className="container mx-auto px-2 sm:px-4 max-w-6xl space-y-3 overflow-hidden">
                {/* Card Sections */}
                {cardSections.map((section) => {
                  const sectionT = translations.education[section.id];
                  if (!sectionT) return null;
                  return (
                    <CollapsibleSection 
                      key={section.id}
                      title={sectionT.title}
                      icon={section.icon}
                    >
                      <RenderEducationSection 
                        config={section} 
                        translations={sectionT}
                        locale={locale}
                      />
                    </CollapsibleSection>
                  );
                })}
                
                {/* List Sections */}
                {listSections.map((section) => {
                  const sectionT = translations.education[section.id];
                  if (!sectionT) return null;
                  return (
                    <CollapsibleSection 
                      key={section.id}
                      title={sectionT.title}
                      icon={section.icon}
                    >
                      <RenderEducationSection 
                        config={section} 
                        translations={sectionT}
                        locale={locale}
                      />
                    </CollapsibleSection>
                  );
                })}
                
                {/* Example Sections */}
                {exampleSections.map((section) => {
                  const sectionT = translations.education[section.id];
                  if (!sectionT) return null;
                  return (
                    <CollapsibleSection 
                      key={section.id}
                      title={sectionT.title}
                      icon={section.icon}
                    >
                      <RenderEducationSection 
                        config={section} 
                        translations={sectionT}
                        locale={locale}
                      />
                    </CollapsibleSection>
                  );
                })}
                
                {/* Prose Sections */}
                {proseSections.map((section) => {
                  const sectionT = translations.education[section.id];
                  if (!sectionT) return null;
                  return (
                    <CollapsibleSection 
                      key={section.id}
                      title={sectionT.title}
                      icon={section.icon}
                    >
                      <RenderEducationSection 
                        config={section} 
                        translations={sectionT}
                        locale={locale}
                      />
                    </CollapsibleSection>
                  );
                })}
                
                {/* Sources */}
                {config.references.length > 0 && (
                  <CollapsibleSection 
                    title={t("sources.title", "Sources & References")}
                    icon="📚"
                  >
                    <SourcesSectionV4
                      title={t("sources.title", "Sources & References")}
                      references={config.references}
                    />
                  </CollapsibleSection>
                )}
                
                {/* FAQs */}
                {translations.faqs.length > 0 && (
                  <CollapsibleSection 
                    title={t("faq.title", "Frequently Asked Questions")}
                    icon="❓"
                  >
                    <FAQAccordionV4
                      title={t("faq.title", "Frequently Asked Questions")}
                      faqs={translations.faqs}
                      calculatorSlug={translations.slug}
                    />
                  </CollapsibleSection>
                )}
              </div>
            </section>
          </LazySection>
        </div>

        {/* Desktop: Full Layout */}
        <div className="hidden md:block">
          {/* Grid Sections (Cards + List) */}
          {(cardSections.length > 0 || listSections.length > 0) && (
            <section className="py-8">
              <div className="container mx-auto px-2 sm:px-4 max-w-6xl">
                <div className="grid md:grid-cols-2 gap-6">
                  {[...cardSections, ...listSections].slice(0, 2).map((section) => {
                    const sectionT = translations.education[section.id];
                    if (!sectionT) return null;
                    return (
                      <RenderEducationSection 
                        key={section.id}
                        config={section} 
                        translations={sectionT}
                        locale={locale}
                      />
                    );
                  })}
                </div>
              </div>
            </section>
          )}

          {/* Full Width: Examples */}
          {exampleSections.map((section) => {
            const sectionT = translations.education[section.id];
            if (!sectionT) return null;
            return (
              <RenderEducationSection 
                key={section.id}
                config={section} 
                translations={sectionT}
                locale={locale}
              />
            );
          })}

          {/* Prose + Sidebar */}
          {(proseSections.length > 0 || translations.faqs.length > 0) && (
            <section className="py-12">
              <div className="container mx-auto px-2 sm:px-4 max-w-6xl">
                <div className="grid lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 space-y-8">
                    {/* Prose Sections */}
                    {proseSections.map((section) => {
                      const sectionT = translations.education[section.id];
                      if (!sectionT) return null;
                      return (
                        <RenderEducationSection 
                          key={section.id}
                          config={section} 
                          translations={sectionT}
                          locale={locale}
                        />
                      );
                    })}
                    
                    {/* Sources */}
                    {config.references.length > 0 && (
                      <SourcesSectionV4
                        title={t("sources.title", "Sources & References")}
                        references={config.references}
                      />
                    )}
                    
                    {/* FAQs */}
                    {translations.faqs.length > 0 && (
                      <FAQAccordionV4
                        title={t("faq.title", "Frequently Asked Questions")}
                        faqs={translations.faqs}
                        calculatorSlug={translations.slug}
                      />
                    )}
                  </div>
                  
                  {/* Sidebar */}
                  <aside>
                    <CalculatorSidebar
                      currentCalculator={translations.slug}
                      category={config.sidebar?.category || config.category}
                      showCTA={config.sidebar?.showCTA !== false}
                    />
                  </aside>
                </div>
              </div>
            </section>
          )}
        </div>

        {/* Bottom Ad */}
        {config.ads?.bottom !== false && (
          <section className="py-8">
            <div className="container mx-auto px-2 sm:px-4 max-w-4xl">
              <AdBlock slot="calculator-bottom" />
            </div>
          </section>
        )}
      </div>

      <MobileResultsBarV4
        results={results ? {
          ...results,
          summary: results.summary ? translateText(results.summary, locale) : undefined
        } : null}
        hasCalculated={true}
        primaryLabel={translations.results[config.results[0]?.id]?.label || "Result"}
        primaryValue={results?.formatted[config.results[0]?.id] || "--"}
        primaryUnit={config.results[0]?.suffix}
        onSave={config.features?.saveHistory !== false ? saveToHistory : undefined}
        saveStatus={saveStatus}
        isLoggedIn={!!session}
        t={t}
        locale={locale}
        calculatorName={translations.name}
        resultConfigs={config.results.map(r => ({
          id: r.id,
          type: r.type,
          label: translations.results[r.id]?.label || r.id,
          suffix: r.suffix,
          icon: r.icon,
        }))}
      />
      
      <MobileAdContainer slot="calculator-mobile-bottom" position="bottom" />

      {/* Compare Panel Modal */}
      {compareEnabled && (
        <ComparePanel
          isOpen={showCompare}
          onClose={() => setShowCompare(false)}
          scenarioA={values}
          scenarioB={values}
          resultConfigs={config.results.map(r => ({
            id: r.id,
            type: r.type,
            label: translations.results[r.id]?.label || r.id,
          }))}
          calculate={calculate}
          labels={{
            title: t("ui.compareTitle", "Compare Scenarios"),
            close: t("ui.close", "Close"),
          }}
        />
      )}
    </div>
  );
}
