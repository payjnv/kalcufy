"use client";

/**
 * INPUT CARD V4 - Enhanced Version
 * 
 * Features:
 * - Real-time validation with visual feedback
 * - Example hints below inputs
 * - Improved sliders with gradient colors
 * - Min/Max indicators
 * - Better error states
 */

import { useState, useEffect, useId, useMemo, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { useCurrency, CurrencyCode } from "@/lib/currency-helper";
import UnitDropdown from "./UnitDropdown";
import { getUnitGroup } from "../units/registry";
import type { UnitDefinition, DualUnitValue } from "../units/types";
import { convertDualToBase, convertBaseToDual } from "../units/convert";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ToggleInput, NumberStepperInput, TextAreaInput, TimeInput, DateRangeInput, ImageRadioInput, MultiSelectInput, RepeaterInput } from "./NewInputComponents";

// =============================================================================
// TYPES
// =============================================================================
interface InputOption {
  value: string;
  label: string;
  icon?: string;    // For ImageRadio - emoji/icon
  image?: string;   // For ImageRadio - image URL
  description?: string; // V4.3 - Subtitle below label in radio buttons
}

interface InputConfig {
  id: string;
  type: "number" | "currency" | "percentage" | "select" | "slider" | "radio" | "date" | "text" | "checkbox"
    | "toggle" | "stepper" | "textarea" | "time" | "daterange" | "imageradio" | "multiselect" | "repeater";
  label: string;
  required?: boolean;
  defaultValue?: unknown;
  min?: number;
  max?: number;
  step?: number;
  suffix?: string;
  prefix?: string;
  helpText?: string;
  placeholder?: string;
  options?: InputOption[];
  width?: "full" | "half" | "third";
  showWhen?: { field: string; value: string | string[] } | Array<{ field: string; value: string | string[] }>;
  unitOptions?: Record<string, { suffix?: string; min?: number; max?: number }>;
  example?: string; // NEW: Example text
  // ── Unit Dropdown System ──
  unitType?: string;
  allowedUnits?: string[];
  excludeUnits?: string[];
  autoConvert?: boolean;
  showSlider?: boolean; // Explicit override: true = force slider, false = never slider
  _fieldUnit?: string; // Current selected unit (injected by engine)
  _onFieldUnitChange?: (unitId: string) => void; // Unit change handler (injected by engine)
  // ── New Component Properties ──
  // Toggle
  toggleLabel?: string;
  // TextArea
  rows?: number;
  maxLength?: number;
  // Time
  timeFormat?: "hms" | "hm" | "ms";
  timeOutputFormat?: "seconds" | "object";
  // DateRange
  dateRangeLabels?: { start?: string; end?: string };
  // ImageRadio
  columns?: number;
  // MultiSelect
  multiSelectColumns?: number;
  maxSelections?: number;
  // Repeater
  repeaterFields?: Array<{
    id: string;
    type: "number" | "text" | "select";
    label?: string;
    placeholder?: string;
    suffix?: string;
    prefix?: string;
    min?: number;
    max?: number;
    step?: number;
    options?: InputOption[];
    width?: "full" | "half" | "third";
    defaultValue?: unknown;
  }>;
  maxRows?: number;
  minRows?: number;
  addButtonLabel?: string;
}

interface InputGroup {
  id: string;
  title: string;
  inputs?: string[];
  inputIds?: string[];
  defaultExpanded?: boolean;
}

type TranslationFn = (key: string, fallback?: string) => string;

interface InputCardV4Props {
  inputs: InputConfig[];
  inputGroups?: InputGroup[];
  values: Record<string, unknown>;
  units: Record<string, string>;
  unitSystem: "metric" | "imperial";
  errors: Record<string, string>;
  onChange: (id: string, value: unknown) => void;
  onUnitChange: (id: string, unit: string) => void;
  onUnitSystemChange: (system: "metric" | "imperial") => void;
  t: TranslationFn;
  showUnitSystemToggle?: boolean;
  unitSystemOptions?: { value: string; label: string }[];
  currentMode?: string;
  currencyCode?: CurrencyCode;
  locale?: string; // For validation message translations
}

// =============================================================================
// VALIDATION HELPER
// =============================================================================
interface ValidationResult {
  isValid: boolean;
  message?: string;
  type?: 'error' | 'warning' | 'success';
}

// =============================================================================
// DEFAULT VALIDATION TRANSLATIONS - Built-in for all 4 languages
// =============================================================================
const DEFAULT_VALIDATION_MESSAGES: Record<string, Record<string, string>> = {
  en: {
    required: "Please enter a value",
    invalidNumber: "Please enter a valid number",
    minNumber: "Enter {min} or more",
    maxNumber: "Maximum is {max}",
    minPercent: "Enter {min}% or higher",
    maxPercent: "Enter {max}% or less",
    minCurrency: "Enter at least {min}",
    maxCurrency: "Maximum is {max}",
  },
  es: {
    required: "Por favor ingresa un valor",
    invalidNumber: "Por favor ingresa un número válido",
    minNumber: "Ingresa {min} o más",
    maxNumber: "El máximo es {max}",
    minPercent: "Ingresa {min}% o más",
    maxPercent: "Ingresa {max}% o menos",
    minCurrency: "Ingresa al menos {min}",
    maxCurrency: "El máximo es {max}",
  },
  pt: {
    required: "Por favor insira um valor",
    invalidNumber: "Por favor insira um número válido",
    minNumber: "Insira {min} ou mais",
    maxNumber: "O máximo é {max}",
    minPercent: "Insira {min}% ou mais",
    maxPercent: "Insira {max}% ou menos",
    minCurrency: "Insira pelo menos {min}",
    maxCurrency: "O máximo é {max}",
  },
  fr: {
    required: "Veuillez entrer une valeur",
    invalidNumber: "Veuillez entrer un nombre valide",
    minNumber: "Entrez {min} ou plus",
    maxNumber: "Le maximum est {max}",
    minPercent: "Entrez {min}% ou plus",
    maxPercent: "Entrez {max}% ou moins",
    minCurrency: "Entrez au moins {min}",
    maxCurrency: "Le maximum est {max}",
  },
};

function validateInput(value: unknown, input: InputConfig, currencySymbol: string = "$", t?: TranslationFn, locale: string = "en"): ValidationResult {
  // SMART DEFAULTS: Check if field is empty (null, undefined, or empty string)
  const isEmpty = value === undefined || value === null || value === "";
  
  // Get defaults for current locale (fallback to English)
  const defaults = DEFAULT_VALIDATION_MESSAGES[locale] || DEFAULT_VALIDATION_MESSAGES.en;
  
  // Translation helper - uses built-in defaults, can be overridden by calculator
  const msg = (key: string, replacements?: Record<string, string>) => {
    // Try custom t() first, fallback to built-in defaults
    let text = t ? t(`validation.${key}`, defaults[key] || key) : (defaults[key] || key);
    if (replacements) {
      Object.entries(replacements).forEach(([k, v]) => {
        text = text.replace(`{${k}}`, v);
      });
    }
    return text;
  };
  
  // Required check
  if (input.required && isEmpty) {
    return { isValid: false, message: msg("required"), type: 'error' };
  }
  
  // SMART DEFAULTS: If field is empty and not required, it's valid (no min/max check)
  if (isEmpty) {
    return { isValid: true };
  }
  
  // For numeric types, validate the actual number
  if (input.type === "number" || input.type === "currency" || input.type === "percentage" || input.type === "slider") {
    const num = Number(value);
    
    if (isNaN(num)) {
      return { isValid: false, message: msg("invalidNumber"), type: 'error' };
    }
    
    // HUMAN-FRIENDLY ERROR MESSAGES
    if (input.min !== undefined && num < input.min) {
      let message: string;
      if (input.type === "currency") {
        message = msg("minCurrency", { min: `${currencySymbol}${input.min.toLocaleString()}` });
      } else if (input.type === "percentage") {
        message = msg("minPercent", { min: String(input.min) });
      } else {
        const suffix = input.suffix ? ` ${input.suffix}` : '';
        message = msg("minNumber", { min: `${input.min}${suffix}` });
      }
      return { isValid: false, message, type: 'error' };
    }
    
    if (input.max !== undefined && num > input.max) {
      let message: string;
      if (input.type === "currency") {
        message = msg("maxCurrency", { max: `${currencySymbol}${input.max.toLocaleString()}` });
      } else if (input.type === "percentage") {
        message = msg("maxPercent", { max: String(input.max) });
      } else {
        const suffix = input.suffix ? ` ${input.suffix}` : '';
        message = msg("maxNumber", { max: `${input.max}${suffix}` });
      }
      return { isValid: false, message, type: 'error' };
    }
  }
  
  return { isValid: true, type: 'success' };
}

// =============================================================================
// EXAMPLE GENERATOR
// =============================================================================
function generateExample(input: InputConfig, currencySymbol: string = "$"): string | null {
  // Only use custom examples explicitly set in config
  if (input.example) return input.example;
  return null;
}

// =============================================================================
// INPUT WRAPPER WITH VALIDATION UI
// =============================================================================
function InputWrapper({ 
  children, 
  validation, 
  example,
  showExample = true 
}: { 
  children: React.ReactNode;
  validation?: ValidationResult;
  example?: string | null;
  showExample?: boolean;
}) {
  return (
    <div className="space-y-1 w-full">
      {children}
      
      {/* Validation Message */}
      {validation && !validation.isValid && validation.message && (
        <div className={`flex items-center gap-1.5 text-xs ${
          validation.type === 'error' ? 'text-red-600' : 
          validation.type === 'warning' ? 'text-amber-600' : 'text-slate-500'
        }`}>
          {validation.type === 'error' && (
            <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          )}
          <span>{validation.message}</span>
        </div>
      )}
      
      {/* Example Hint */}
      {showExample && example && validation?.isValid !== false && (
        <p className="text-xs text-slate-400 flex items-center gap-1">
          <span className="text-slate-300">💡</span>
          {example}
        </p>
      )}
    </div>
  );
}

// =============================================================================
// CURRENCY INPUT - Enhanced
// =============================================================================
function CurrencyInput({ 
  input, 
  value, 
  onChange,
  onBlur: onBlurProp, // SMART DEFAULTS
  errorId, 
  t,
  currencySymbol = "$",
  validation
}: { 
  input: InputConfig; 
  value: number; 
  onChange: (v: number) => void;
  onBlur?: () => void; // SMART DEFAULTS
  errorId?: string; 
  t: TranslationFn;
  currencySymbol?: string;
  validation?: ValidationResult;
}) {
  const label = t("inputs." + input.id + ".label", input.label);
  const minVal = input.min;
  const maxVal = input.max;
  
  // SMART DEFAULTS: Handle null values
  const [displayValue, setDisplayValue] = useState<string>(() => {
    if (value === undefined || value === null || isNaN(value)) return "";
    return formatNumberWithCommas(value);
  });
  const [isFocused, setIsFocused] = useState(false);
  
  function formatNumberWithCommas(num: number): string {
    return num.toLocaleString("en-US", { maximumFractionDigits: 2 });
  }
  
  function parseFormattedNumber(str: string): number {
    return Number(str.replace(/,/g, ""));
  }
  
  useEffect(() => {
    if (!isFocused) {
      // SMART DEFAULTS: Keep empty if null
      if (value === null || value === undefined) {
        setDisplayValue("");
      } else if (!isNaN(value)) {
        setDisplayValue(formatNumberWithCommas(value));
      }
    }
  }, [value, isFocused]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const cleaned = raw.replace(/[^0-9.,]/g, "");
    setDisplayValue(cleaned);
    
    const num = parseFormattedNumber(cleaned);
    if (cleaned !== "" && !isNaN(num)) {
      onChange(num);
    }
  };
  
  const handleBlur = () => {
    setIsFocused(false);
    onBlurProp?.(); // SMART DEFAULTS: Mark as touched
    
    // SMART DEFAULTS: Keep empty if user didn't enter anything
    if (displayValue === "") {
      return;
    }
    
    const num = parseFormattedNumber(displayValue);
    if (isNaN(num)) {
      setDisplayValue("");
      return;
    }
    
    let finalNum = num;
    if (minVal !== undefined && num < minVal) finalNum = minVal;
    if (maxVal !== undefined && num > maxVal) finalNum = maxVal;
    setDisplayValue(formatNumberWithCommas(finalNum));
    onChange(finalNum);
  };
  
  const isError = validation && !validation.isValid;
  const isEmpty = !displayValue || displayValue === "";
  
  // FLAT DESIGN: Grey background, no border
  const containerClass = isError 
    ? "ring-2 ring-red-400 bg-red-50/50" 
    : isFocused 
    ? "ring-2 ring-blue-400 bg-slate-50" 
    : "bg-slate-100 hover:bg-slate-200/70";
  
  const example = generateExample(input, currencySymbol);
  
  const helpTextStr = input.helpText ? t("inputs." + input.id + ".helpText", input.helpText) : "";
  
  return (
    <InputWrapper validation={validation} example={example}>
      <div className="flex items-baseline justify-between mb-1.5">
        <label htmlFor={input.id} className="block font-medium text-slate-700 text-sm">
          {label}
          {input.required && <span className="text-red-500 ml-1" aria-hidden="true">*</span>}
        </label>
        {false && helpTextStr && (
          <span id={`help-${input.id}`} className="text-xs text-slate-400">{helpTextStr}</span>
        )}
      </div>
      <div className={`relative flex items-center rounded-xl transition-all ${containerClass}`}>
        <span className={`pl-3 shrink-0 text-xs font-medium ${isError ? 'text-red-400' : 'text-slate-400'}`}>
          {currencySymbol}
        </span>
        <input
          id={input.id}
          type="text"
          inputMode="decimal"
          value={displayValue}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          onBlur={handleBlur}
          placeholder={input.placeholder || "0"}
          required={input.required}
          aria-required={input.required}
          aria-invalid={isError}
          aria-describedby={[errorId, helpTextStr ? `help-${input.id}` : undefined].filter(Boolean).join(" ") || undefined}
          className="flex-1 min-w-0 bg-transparent pl-1 pr-1 py-3 text-slate-900 text-base font-medium focus:outline-none placeholder:text-slate-300"
        />
        {/* Quick increment buttons */}
        <div className="flex flex-col border-l border-slate-100 mr-1">
          <button 
            type="button"
            onClick={() => onChange((value || 0) + (input.step || 1000))}
            className="px-2 py-1 text-slate-300 hover:text-blue-500 transition-colors"
            aria-label="Increase value"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </button>
          <button 
            type="button"
            onClick={() => onChange(Math.max(0, (value || 0) - (input.step || 1000)))}
            className="px-2 py-1 text-slate-300 hover:text-blue-500 transition-colors"
            aria-label="Decrease value"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>
    </InputWrapper>
  );
}

// =============================================================================
// PERCENTAGE INPUT - Enhanced
// =============================================================================
function PercentageInput({ 
  input, 
  value, 
  onChange,
  onBlur: onBlurProp, // SMART DEFAULTS
  errorId, 
  t,
  validation
}: { 
  input: InputConfig; 
  value: number; 
  onChange: (v: number) => void;
  onBlur?: () => void; // SMART DEFAULTS
  errorId?: string; 
  t: TranslationFn;
  validation?: ValidationResult;
}) {
  const label = t("inputs." + input.id + ".label", input.label);
  const minVal = input.min ?? 0;
  const maxVal = input.max ?? 100;
  
  // SMART DEFAULTS: Handle null values
  const [displayValue, setDisplayValue] = useState<string>(() => {
    if (value === null || value === undefined) return "";
    return String(value);
  });
  const [isFocused, setIsFocused] = useState(false);
  
  useEffect(() => {
    if (!isFocused) {
      if (value === null || value === undefined) {
        setDisplayValue("");
      } else if (!isNaN(value)) {
        setDisplayValue(String(value));
      }
    }
  }, [value, isFocused]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    setDisplayValue(raw);
    const num = Number(raw);
    if (raw !== "" && !isNaN(num)) {
      onChange(num);
    }
  };
  
  const handleBlur = () => {
    setIsFocused(false);
    onBlurProp?.(); // SMART DEFAULTS: Mark as touched
    
    if (displayValue === "") {
      return;
    }
    
    const num = Number(displayValue);
    if (isNaN(num)) {
      setDisplayValue("");
      return;
    }
    
    let finalNum = num;
    if (num < minVal) finalNum = minVal;
    if (num > maxVal) finalNum = maxVal;
    setDisplayValue(String(finalNum));
    onChange(finalNum);
  };
  
  const isError = validation && !validation.isValid;
  const isEmpty = !displayValue || displayValue === "";
  
  // FLAT DESIGN: Grey background, no border
  const containerClass = isError 
    ? "ring-2 ring-red-400 bg-red-50/50" 
    : isFocused 
    ? "ring-2 ring-blue-400 bg-slate-50" 
    : "bg-slate-100 hover:bg-slate-200/70";
  
  const example = generateExample(input);
  
  const helpTextStr = input.helpText ? t("inputs." + input.id + ".helpText", input.helpText) : "";
  
  return (
    <InputWrapper validation={validation} example={example}>
      <div className="flex items-baseline justify-between mb-1.5">
        <label htmlFor={input.id} className="block font-medium text-slate-700 text-sm">
          {label}
          {input.required && <span className="text-red-500 ml-1" aria-hidden="true">*</span>}
        </label>
        {false && helpTextStr && (
          <span id={`help-${input.id}`} className="text-xs text-slate-400">{helpTextStr}</span>
        )}
      </div>
      <div className={`relative flex items-center rounded-xl transition-all ${containerClass}`}>
        <input
          id={input.id}
          type="text"
          inputMode="decimal"
          value={displayValue}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          onBlur={handleBlur}
          placeholder={input.placeholder || ""}
          required={input.required}
          aria-required={input.required}
          aria-invalid={isError}
          className="flex-1 min-w-0 bg-transparent pl-3 pr-1 py-3 text-slate-900 text-base font-medium focus:outline-none placeholder:text-slate-300"
        />
        <span className={`pr-3 shrink-0 text-xs font-medium ${isError ? 'text-red-400' : 'text-slate-400'}`}>
          %
        </span>
      </div>
    </InputWrapper>
  );
}

// =============================================================================
// SLIDER INPUT - Enhanced with gradient
// =============================================================================
function SliderInput({ 
  input, 
  value, 
  onChange,
  onBlur: onBlurProp, // SMART DEFAULTS
  errorId, 
  t, 
  unitSystem,
  validation,
  currencySymbol = "$"
}: { 
  input: InputConfig; 
  value: number; 
  onChange: (v: number) => void;
  onBlur?: () => void; // SMART DEFAULTS
  errorId?: string; 
  t: TranslationFn; 
  unitSystem?: "metric" | "imperial";
  validation?: ValidationResult;
  currencySymbol?: string;
}) {
  const label = t("inputs." + input.id + ".label", input.label);
  
  const unitOpts = input.unitOptions;
  const currentUnitOpts = unitOpts && unitSystem ? unitOpts[unitSystem] : null;
  const suffix = currentUnitOpts?.suffix 
    ? t("inputs." + input.id + ".suffix", currentUnitOpts.suffix) 
    : (input.suffix ? t("inputs." + input.id + ".suffix", input.suffix) : "");
  
  const prefix = input.prefix ? t("inputs." + input.id + ".prefix", input.prefix) : "";
  
  const minVal = currentUnitOpts?.min ?? input.min ?? 0;
  const maxVal = currentUnitOpts?.max ?? input.max ?? 100;
  
  // SMART DEFAULTS: Sliders need a value, use min or placeholder as fallback
  const effectiveValue = (value !== null && value !== undefined) ? value : minVal;
  const [displayValue, setDisplayValue] = useState<string>(() => String(effectiveValue));
  const [isFocused, setIsFocused] = useState(false);
  
  useEffect(() => {
    if (!isFocused) {
      const val = (value !== null && value !== undefined) ? value : minVal;
      if (!isNaN(val)) {
        setDisplayValue(String(val));
      }
    }
  }, [value, isFocused, minVal]);
  
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    setDisplayValue(raw);
    const num = Number(raw);
    if (raw !== "" && !isNaN(num)) {
      onChange(num);
    }
  };
  
  const handleTextBlur = () => {
    setIsFocused(false);
    onBlurProp?.(); // SMART DEFAULTS: Mark as touched
    
    const num = Number(displayValue);
    if (displayValue === "" || isNaN(num)) {
      const defaultVal = (input.defaultValue as number) ?? minVal;
      setDisplayValue(String(defaultVal));
      onChange(defaultVal);
    } else {
      let finalNum = num;
      if (num < minVal) finalNum = minVal;
      if (num > maxVal) finalNum = maxVal;
      setDisplayValue(String(finalNum));
      onChange(finalNum);
    }
  };
  
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const num = Number(e.target.value);
    setDisplayValue(String(num));
    onChange(num);
    onBlurProp?.(); // SMART DEFAULTS: Mark as touched when slider moves
  };
  
  // Calculate progress percentage for gradient
  const progress = ((effectiveValue) - minVal) / (maxVal - minVal) * 100;
  
  const example = generateExample(input, currencySymbol);
  
  return (
    <InputWrapper validation={validation} example={example}>
      <div role="group" aria-labelledby={"label-" + input.id} className="w-full overflow-hidden">
        <div className="flex justify-between items-center mb-2">
          <label id={"label-" + input.id} htmlFor={input.id} className="font-medium text-slate-700 text-sm">
            {label}
            {input.required && <span className="text-red-500 ml-1" aria-hidden="true">*</span>}
          </label>
          <div className="flex items-center bg-blue-50 border border-blue-200 rounded-lg px-3 py-1.5">
            {prefix && <span className="text-blue-600 mr-1 font-medium">{prefix}</span>}
            <input
              type="text"
              inputMode="numeric"
              value={displayValue}
              onChange={handleTextChange}
              onFocus={() => setIsFocused(true)}
              onBlur={handleTextBlur}
              aria-label={label + " value"}
              className="w-16 text-right bg-transparent font-bold text-blue-600 text-sm focus:outline-none"
            />
            {suffix && <span className="text-blue-600 ml-1 text-xs font-medium">{suffix}</span>}
          </div>
        </div>
        
        {/* Custom slider with gradient */}
        <div className="relative overflow-hidden px-2.5 w-full box-border">
          <div className="absolute top-1/2 left-2.5 right-2.5 h-2 -translate-y-1/2 rounded-full bg-slate-200 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-150"
              style={{ width: `${progress}%` }}
            />
          </div>
          <input
            id={input.id}
            type="range"
            min={minVal}
            max={maxVal}
            step={input.step || 1}
            value={value ?? minVal}
            onChange={handleSliderChange}
            aria-valuemin={minVal}
            aria-valuemax={maxVal}
            aria-valuenow={value ?? minVal}
            aria-valuetext={prefix + (value ?? minVal) + " " + suffix}
            className="relative w-full max-w-full h-6 appearance-none bg-transparent cursor-pointer z-20
              [&::-webkit-slider-thumb]:appearance-none
              [&::-webkit-slider-thumb]:w-5
              [&::-webkit-slider-thumb]:h-5
              [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:bg-white
              [&::-webkit-slider-thumb]:border-2
              [&::-webkit-slider-thumb]:border-blue-600
              [&::-webkit-slider-thumb]:shadow-lg
              [&::-webkit-slider-thumb]:cursor-pointer
              [&::-webkit-slider-thumb]:transition-transform
              [&::-webkit-slider-thumb]:hover:scale-110
              [&::-moz-range-thumb]:w-5
              [&::-moz-range-thumb]:h-5
              [&::-moz-range-thumb]:rounded-full
              [&::-moz-range-thumb]:bg-white
              [&::-moz-range-thumb]:border-2
              [&::-moz-range-thumb]:border-blue-600
              [&::-moz-range-thumb]:shadow-lg
              [&::-moz-range-thumb]:cursor-pointer"
          />
        </div>
        
        <div className="flex justify-between gap-2 text-xs text-slate-400 mt-2" aria-hidden="true">
          <span className="bg-slate-100 px-1.5 py-0.5 rounded truncate">{prefix}{minVal.toLocaleString()}{suffix ? ` ${suffix}` : ''}</span>
          <span className="bg-slate-100 px-1.5 py-0.5 rounded truncate">{prefix}{maxVal.toLocaleString()}{suffix ? ` ${suffix}` : ''}</span>
        </div>
        
        {false && input.helpText && (
          <p className="text-xs text-slate-400 mt-1">
            {t("inputs." + input.id + ".helpText", input.helpText)}
          </p>
        )}
      </div>
    </InputWrapper>
  );
}

// =============================================================================
// NUMBER INPUT - Enhanced
// =============================================================================
function NumberInput({ 
  input, 
  value, 
  onChange,
  onBlur: onBlurProp, // SMART DEFAULTS: External blur handler
  errorId, 
  t, 
  unitSystem,
  validation,
  currencySymbol = "$",
  hideLabel = false,
  compoundPosition,
}: { 
  input: InputConfig; 
  value: number; 
  onChange: (v: number) => void;
  onBlur?: () => void; // SMART DEFAULTS
  errorId?: string; 
  t: TranslationFn; 
  unitSystem?: "metric" | "imperial";
  validation?: ValidationResult;
  currencySymbol?: string;
  hideLabel?: boolean;
  compoundPosition?: "left" | "right" | null;
}) {
  const label = t("inputs." + input.id + ".label", input.label);
  
  const unitOpts = input.unitOptions;
  const currentUnitOpts = unitOpts && unitSystem ? unitOpts[unitSystem] : null;
  const suffix = currentUnitOpts?.suffix 
    ? t("inputs." + input.id + ".suffix", currentUnitOpts.suffix) 
    : (input.suffix ? t("inputs." + input.id + ".suffix", input.suffix) : "");
  
  const prefix = input.prefix ? t("inputs." + input.id + ".prefix", input.prefix) : "";
  
  const minVal = currentUnitOpts?.min ?? input.min;
  const maxVal = currentUnitOpts?.max ?? input.max;
  
  // SMART DEFAULTS: Handle null values - show empty string instead of "0"
  const [displayValue, setDisplayValue] = useState<string>(() => {
    if (value === null || value === undefined) return "";
    return String(value);
  });
  const [isFocused, setIsFocused] = useState(false);
  
  useEffect(() => {
    if (!isFocused) {
      // SMART DEFAULTS: Keep empty if null
      if (value === null || value === undefined) {
        setDisplayValue("");
      } else if (!isNaN(value)) {
        setDisplayValue(String(value));
      }
    }
  }, [value, isFocused]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    setDisplayValue(raw);
    const num = Number(raw);
    if (raw !== "" && !isNaN(num)) {
      onChange(num);
    }
  };
  
  const handleBlur = () => {
    setIsFocused(false);
    onBlurProp?.(); // SMART DEFAULTS: Call external blur handler to mark as touched
    
    const num = Number(displayValue);
    
    // SMART DEFAULTS: If field is empty and has placeholder, keep it empty (null)
    // Don't force a default value
    if (displayValue === "") {
      // Keep empty - validation will show error if touched
      return;
    }
    
    if (isNaN(num)) {
      // Invalid input - clear it
      setDisplayValue("");
      return;
    }
    
    // Clamp to min/max if needed
    let finalNum = num;
    if (minVal !== undefined && num < minVal) finalNum = minVal;
    if (maxVal !== undefined && num > maxVal) finalNum = maxVal;
    setDisplayValue(String(finalNum));
    onChange(finalNum);
  };
  
  const isError = validation && !validation.isValid;
  const isEmpty = !displayValue || displayValue === "";
  
  // FLAT DESIGN: Grey background, no border by default
  const containerClass = isError 
    ? "ring-2 ring-red-400 bg-red-50/50" 
    : isFocused 
    ? "ring-2 ring-blue-400 bg-slate-50" 
    : "bg-slate-100 hover:bg-slate-200/70";
  
  // Compound mode: adjust border radius for joined fields
  const radiusClass = compoundPosition === "left" 
    ? "rounded-l-xl rounded-r-none" 
    : compoundPosition === "right"
    ? "rounded-r-xl rounded-l-none"
    : "rounded-xl";
  
  const example = generateExample(input, currencySymbol);
  
  const helpTextStr = input.helpText ? t("inputs." + input.id + ".helpText", input.helpText) : "";
  
  return (
    <InputWrapper validation={!compoundPosition ? validation : undefined} example={!compoundPosition ? example : undefined}>
      {!hideLabel && (
        <div className="flex items-baseline justify-between mb-1.5">
          <label htmlFor={input.id} className="block font-medium text-slate-700 text-sm">
            {label}
            {input.required && <span className="text-red-500 ml-1" aria-hidden="true">*</span>}
          </label>
          {false && helpTextStr && (
            <span id={`help-${input.id}`} className="text-xs text-slate-400">{helpTextStr}</span>
          )}
        </div>
      )}
      <div className={`relative flex items-stretch transition-all ${radiusClass} ${containerClass}`}>
        {prefix && <span className="pl-3 text-slate-400 text-xs font-medium shrink-0 self-center">{prefix}</span>}
        <input
          id={input.id}
          type="text"
          inputMode="decimal"
          value={displayValue}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          onBlur={handleBlur}
          placeholder={input.placeholder || ""} 
          required={input.required}
          aria-required={input.required}
          aria-invalid={isError}
          aria-describedby={[errorId, helpTextStr ? `help-${input.id}` : undefined].filter(Boolean).join(" ") || undefined}
          className="flex-1 min-w-0 bg-transparent pl-3 pr-1 py-3 text-slate-900 text-base font-medium focus:outline-none placeholder:text-slate-300"
        />
        {(() => {
          // Unit Dropdown: if unitType is configured and has multiple units
          if (input.unitType && input._fieldUnit && input._onFieldUnitChange) {
            const group = getUnitGroup(input.unitType);
            if (group) {
              let availableUnits = group.units;
              if (input.allowedUnits) availableUnits = availableUnits.filter(u => input.allowedUnits!.includes(u.id));
              if (input.excludeUnits) availableUnits = availableUnits.filter(u => !input.excludeUnits!.includes(u.id));
              if (availableUnits.length > 1) {
                return (
                  <UnitDropdown
                    units={availableUnits}
                    selectedUnit={input._fieldUnit}
                    onUnitChange={input._onFieldUnitChange}
                    size="sm"
                  />
                );
              }
              // Single unit: show as static text
              const unit = availableUnits[0];
              if (unit) return <span className="pr-3 shrink-0 text-slate-400 text-xs font-medium self-center">{unit.symbol}</span>;
            }
          }
          // Fallback: original static suffix
          return suffix ? <span className="pr-3 shrink-0 text-slate-400 text-xs font-medium self-center">{suffix}</span> : null;
        })()}
      </div>
    </InputWrapper>
  );
}

// =============================================================================
// DUAL NUMBER INPUT - For composite units like ft/in
// =============================================================================
function DualNumberInput({
  input,
  value, // Base unit value (e.g., cm)
  onChange, // (baseValue: number) => void
  onBlur,
  errorId,
  t,
  validation,
  hideLabel = false,
}: {
  input: InputConfig;
  value: number;
  onChange: (v: number) => void;
  onBlur?: () => void;
  errorId?: string;
  t: TranslationFn;
  validation?: ValidationResult;
  hideLabel?: boolean;
}) {
  const label = t("inputs." + input.id + ".label", input.label);
  const helpTextStr = input.helpText ? t("inputs." + input.id + ".helpText", input.helpText) : "";

  // Get current unit definition
  const group = input.unitType ? getUnitGroup(input.unitType) : null;
  const currentUnit = group?.units.find(u => u.id === input._fieldUnit);
  const dualConfig = currentUnit?.dualConfig;

  // Convert base value to dual value (cm → ft/in)
  const dualValue = useMemo(() => {
    if (!dualConfig || !currentUnit) return { primary: 0, secondary: 0 };
    if (value == null || isNaN(value)) return { primary: 0, secondary: 0 };
    try {
      return convertBaseToDual(value, input._fieldUnit || "", input.unitType || "height");
    } catch {
      return { primary: 0, secondary: 0 };
    }
  }, [value, input._fieldUnit, input.unitType, dualConfig, currentUnit]);

  const [primaryDisplay, setPrimaryDisplay] = useState<string>(() => 
    dualValue.primary != null ? String(Math.floor(dualValue.primary)) : ""
  );
  const [secondaryDisplay, setSecondaryDisplay] = useState<string>(() => 
    dualValue.secondary != null ? String(Math.round(dualValue.secondary * 10) / 10) : ""
  );
  const [focusedField, setFocusedField] = useState<"primary" | "secondary" | null>(null);

  useEffect(() => {
    if (!focusedField) {
      setPrimaryDisplay(dualValue.primary != null ? String(Math.floor(dualValue.primary)) : "");
      setSecondaryDisplay(dualValue.secondary != null ? String(Math.round(dualValue.secondary * 10) / 10) : "");
    }
  }, [dualValue, focusedField]);

  // ✅ Early return AFTER all hooks (React Rules of Hooks)
  if (!dualConfig || !currentUnit) {
    return null;
  }

  const updateBaseValue = (newDual: DualUnitValue) => {
    try {
      const baseValue = convertDualToBase(newDual, input._fieldUnit || "", input.unitType || "height");
      onChange(baseValue);
    } catch (err) {
      console.error("Failed to convert dual to base:", err);
    }
  };

  const handlePrimaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    setPrimaryDisplay(raw);
    const num = Number(raw);
    if (raw !== "" && !isNaN(num)) {
      updateBaseValue({ primary: num, secondary: dualValue.secondary });
    }
  };

  const handleSecondaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    setSecondaryDisplay(raw);
    const num = Number(raw);
    if (raw !== "" && !isNaN(num)) {
      updateBaseValue({ primary: dualValue.primary, secondary: num });
    }
  };

  const handlePrimaryBlur = () => {
    setFocusedField(null);
    onBlur?.();
    const num = Number(primaryDisplay);
    if (isNaN(num) || primaryDisplay === "") {
      setPrimaryDisplay(dualValue.primary != null ? String(Math.floor(dualValue.primary)) : "");
    }
  };

  const handleSecondaryBlur = () => {
    setFocusedField(null);
    onBlur?.();
    const num = Number(secondaryDisplay);
    if (isNaN(num) || secondaryDisplay === "") {
      setSecondaryDisplay(dualValue.secondary != null ? String(Math.round(dualValue.secondary * 10) / 10) : "");
    }
  };

  const isError = validation && !validation.isValid;
  const isPrimaryFocused = focusedField === "primary";
  const isSecondaryFocused = focusedField === "secondary";

  const containerClass = isError
    ? "ring-2 ring-red-400 bg-red-50/50"
    : (isPrimaryFocused || isSecondaryFocused)
    ? "ring-2 ring-blue-400 bg-slate-50"
    : "bg-slate-100 hover:bg-slate-200/70";

  // Get available units for dropdown
  let availableUnits = group?.units || [];
  if (input.allowedUnits) availableUnits = availableUnits.filter(u => input.allowedUnits!.includes(u.id));
  if (input.excludeUnits) availableUnits = availableUnits.filter(u => !input.excludeUnits!.includes(u.id));

  return (
    <InputWrapper validation={validation} example={undefined}>
      {!hideLabel && (
        <div className="flex items-baseline justify-between mb-1.5">
          <label htmlFor={input.id} className="block font-medium text-slate-700 text-sm">
            {label}
            {input.required && <span className="text-red-500 ml-1" aria-hidden="true">*</span>}
          </label>
          {false && helpTextStr && (
            <span id={`help-${input.id}`} className="text-xs text-slate-400">{helpTextStr}</span>
          )}
        </div>
      )}
      <div className={`relative flex items-center gap-0.5 sm:gap-1 transition-all rounded-xl ${containerClass} pr-0.5`}>
        {/* Primary input (ft) */}
        <div className="flex-1 flex items-center min-w-0">
          <input
            id={input.id + "-primary"}
            type="text"
            inputMode="decimal"
            value={primaryDisplay}
            onChange={handlePrimaryChange}
            onFocus={() => setFocusedField("primary")}
            onBlur={handlePrimaryBlur}
            placeholder={input.placeholder || "5"}
            className="flex-1 min-w-0 bg-transparent pl-3 pr-1 py-3 text-slate-900 text-base font-medium focus:outline-none placeholder:text-slate-300"
            aria-label={`${label} ${dualConfig.primarySymbol}`}
          />
          <span className="text-slate-400 text-xs font-medium shrink-0">
            {dualConfig.primarySymbol}
          </span>
        </div>

        {/* Divider */}
        <div className="h-6 w-px bg-slate-300 shrink-0"></div>

        {/* Secondary input (in) */}
        <div className="flex-1 flex items-center min-w-0">
          <input
            id={input.id + "-secondary"}
            type="text"
            inputMode="decimal"
            value={secondaryDisplay}
            onChange={handleSecondaryChange}
            onFocus={() => setFocusedField("secondary")}
            onBlur={handleSecondaryBlur}
            placeholder={input.placeholder || "10"}
            className="flex-1 min-w-0 bg-transparent pl-2 pr-1 py-3 text-slate-900 text-base font-medium focus:outline-none placeholder:text-slate-300"
            aria-label={`${label} ${dualConfig.secondarySymbol}`}
          />
          <span className="text-slate-400 text-xs font-medium shrink-0">
            {dualConfig.secondarySymbol}
          </span>
        </div>

        {/* Unit Dropdown */}
        {input._onFieldUnitChange && availableUnits.length > 1 && (
          <UnitDropdown
            units={availableUnits}
            selectedUnit={input._fieldUnit || ""}
            onUnitChange={input._onFieldUnitChange}
            size="sm"
          />
        )}
      </div>
    </InputWrapper>
  );
}

// =============================================================================
// SELECT INPUT - Enhanced with Portal
// =============================================================================
function SelectInput({ input, value, onChange, errorId, t }: { input: InputConfig; value: string; onChange: (v: string) => void; errorId?: string; t: TranslationFn }) {
  const options = input.options || [];
  const label = t("inputs." + input.id + ".label", input.label);
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [mounted, setMounted] = useState(false);
  const [position, setPosition] = useState<{ top: number; left: number; width: number } | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const currentValue = value || (input.defaultValue as string) || "";
  const selectedLabel = t("inputs." + input.id + ".options." + currentValue, currentValue);

  // Client-side only
  useEffect(() => {
    setMounted(true);
  }, []);

  // Calculate position when opening - ALWAYS below
  useEffect(() => {
    if (!isOpen || !buttonRef.current) return;

    const updatePosition = () => {
      const rect = buttonRef.current!.getBoundingClientRect();
      const vw = window.innerWidth;
      // Make dropdown slightly narrower so border/shadow is visible
      const dropdownWidth = rect.width - 8;

      // Center it relative to button
      let left = rect.left + 4;
      if (left + dropdownWidth > vw - 8) left = vw - dropdownWidth - 8;
      if (left < 8) left = 8;

      // ALWAYS open below
      const top = rect.bottom + 4;

      setPosition({ top, left, width: dropdownWidth });
    };

    updatePosition();
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);

    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [isOpen]);

  // Close on click outside or Escape
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (buttonRef.current?.contains(target)) return;
      if (panelRef.current?.contains(target)) return;
      setIsOpen(false);
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    };

    const timeoutId = setTimeout(() => {
      document.addEventListener("mousedown", handleClickOutside);
    }, 0);
    document.addEventListener("keydown", handleEscape);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  // Reset highlight when opening
  useEffect(() => {
    if (isOpen) {
      const idx = options.findIndex((o) => o.value === currentValue);
      setHighlightedIndex(idx >= 0 ? idx : 0);
    }
  }, [isOpen, options, currentValue]);

  // Scroll highlighted into view
  useEffect(() => {
    if (!isOpen || highlightedIndex < 0 || !listRef.current) return;
    const items = listRef.current.querySelectorAll('[role="option"]');
    items[highlightedIndex]?.scrollIntoView({ block: "nearest" });
  }, [highlightedIndex, isOpen]);

  const handleSelect = (optValue: string) => {
    onChange(optValue);
    setIsOpen(false);
    buttonRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setIsOpen(true);
      }
      return;
    }
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) => (prev + 1) % options.length);
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) => (prev - 1 + options.length) % options.length);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < options.length) {
          handleSelect(options[highlightedIndex].value);
        }
        break;
      case "Tab":
        setIsOpen(false);
        break;
    }
  };

  // Portal dropdown panel
  const dropdownPanel = position && (
    <div
      ref={panelRef}
      id="select-dropdown-portal"
      style={{
        position: "fixed",
        top: position.top,
        left: position.left,
        width: position.width,
        zIndex: 99999,
      }}
    >
      <div
        ref={listRef}
        role="listbox"
        aria-label={label}
        style={{
          background: "white",
          borderRadius: "12px",
          boxShadow: "0 10px 40px -5px rgba(0,0,0,0.15), 0 4px 12px -2px rgba(0,0,0,0.1)",
          border: "1px solid rgba(226,232,240,0.8)",
          maxHeight: "280px",
          overflowY: "auto",
          padding: "4px 0",
        }}
      >
        {options.map((opt, index) => {
          const isSelected = opt.value === currentValue;
          const isHighlighted = index === highlightedIndex;
          const optLabel = t("inputs." + input.id + ".options." + opt.value, opt.value);

          return (
            <button
              key={opt.value}
              type="button"
              role="option"
              aria-selected={isSelected}
              onClick={() => handleSelect(opt.value)}
              onMouseEnter={() => setHighlightedIndex(index)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "8px",
                padding: "10px 12px",
                textAlign: "left",
                fontSize: "14px",
                border: "none",
                cursor: "pointer",
                transition: "background-color 150ms",
                backgroundColor: isSelected ? "#eff6ff" : isHighlighted ? "#f8fafc" : "transparent",
                color: isSelected ? "#1d4ed8" : "#475569",
                fontWeight: isSelected ? 500 : 400,
              }}
            >
              <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{optLabel}</span>
              {isSelected && (
                <svg style={{ width: "16px", height: "16px", color: "#2563eb", flexShrink: 0 }} viewBox="0 0 16 16" fill="currentColor">
                  <path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 111.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z" />
                </svg>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="w-full" onKeyDown={handleKeyDown}>
      <label className="block font-medium text-slate-700 mb-1.5 text-sm">
        {label}
        {input.required && <span className="text-red-500 ml-1" aria-hidden="true">*</span>}
      </label>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-invalid={!!errorId}
        aria-describedby={errorId}
        className={`w-full flex items-center justify-between rounded-xl px-3 py-3 text-left transition-all cursor-pointer border-0 ${
          isOpen ? "ring-2 ring-blue-400 bg-slate-50" : "bg-slate-100 hover:bg-slate-200/70"
        }`}
      >
        <span className="text-slate-800 truncate">{selectedLabel}</span>
        <svg
          className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && mounted && createPortal(dropdownPanel, document.body)}
    </div>
  );
}
// =============================================================================
// COMPOUND NUMBER INPUT - Two fields joined (e.g. 5 ft | 10 in) Omni-style
// =============================================================================
function CompoundNumberInput({
  leftInput,
  rightInput,
  leftValue,
  rightValue,
  onChangeLeft,
  onChangeRight,
  onBlurLeft,
  onBlurRight,
  leftValidation,
  rightValidation,
  t,
}: {
  leftInput: InputConfig;
  rightInput: InputConfig;
  leftValue: unknown;
  rightValue: unknown;
  onChangeLeft: (v: unknown) => void;
  onChangeRight: (v: unknown) => void;
  onBlurLeft: () => void;
  onBlurRight: () => void;
  leftValidation?: ValidationResult;
  rightValidation?: ValidationResult;
  t: TranslationFn;
}) {
  const [focusedSide, setFocusedSide] = useState<"left" | "right" | null>(null);
  const compoundLabel = t("inputs." + leftInput.id + ".compoundLabel", t("inputs." + leftInput.id + ".label", leftInput.label));
  const cleanLabel = compoundLabel.replace(/\s*\(.*?\)\s*$/, "");
  const leftSuffix = leftInput.suffix || "";
  const rightSuffix = rightInput.suffix || "";

  const [leftDisplay, setLeftDisplay] = useState(() =>
    leftValue !== null && leftValue !== undefined ? String(leftValue) : ""
  );
  const [rightDisplay, setRightDisplay] = useState(() =>
    rightValue !== null && rightValue !== undefined ? String(rightValue) : ""
  );

  useEffect(() => {
    if (focusedSide !== "left") {
      setLeftDisplay(leftValue !== null && leftValue !== undefined ? String(leftValue) : "");
    }
  }, [leftValue, focusedSide]);

  useEffect(() => {
    if (focusedSide !== "right") {
      setRightDisplay(rightValue !== null && rightValue !== undefined ? String(rightValue) : "");
    }
  }, [rightValue, focusedSide]);

  const isLeftError = leftValidation && !leftValidation.isValid;
  const isRightError = rightValidation && !rightValidation.isValid;
  const hasError = isLeftError || isRightError;
  const isFocused = focusedSide !== null;

  const borderClass = hasError
    ? "ring-2 ring-red-400 bg-red-50/50"
    : isFocused
    ? "ring-2 ring-blue-400 bg-slate-50"
    : "bg-slate-100 hover:bg-slate-200/70";

  return (
    <div>
      <label className="block font-medium text-slate-700 mb-1.5 text-sm">
        {cleanLabel}
        
      </label>
      <div className={`flex items-center w-full rounded-xl transition-all ${borderClass}`}>
        {/* Left field */}
        <div className="flex-1 flex items-center min-w-0">
          <input
            id={leftInput.id}
            type="text"
            inputMode="decimal"
            value={leftDisplay}
            onChange={(e) => {
              const raw = e.target.value;
              setLeftDisplay(raw);
              const num = Number(raw);
              if (raw !== "" && !isNaN(num)) onChangeLeft(num);
            }}
            onFocus={() => setFocusedSide("left")}
            onBlur={() => {
              setFocusedSide(null);
              onBlurLeft();
              const num = Number(leftDisplay);
              if (leftDisplay === "") return;
              if (isNaN(num)) { setLeftDisplay(""); return; }
              let final = num;
              if (leftInput.min !== undefined && num < leftInput.min) final = leftInput.min;
              if (leftInput.max !== undefined && num > leftInput.max) final = leftInput.max;
              setLeftDisplay(String(final));
              onChangeLeft(final);
            }}
            placeholder={leftInput.placeholder || ""}
            className="flex-1 min-w-0 bg-transparent pl-3 pr-1 py-3 text-slate-900 text-base font-medium focus:outline-none placeholder:text-slate-300"
          />
          {leftSuffix && (
            <span className="pr-2 text-slate-400 text-xs font-medium shrink-0">{leftSuffix}</span>
          )}
        </div>
        {/* Divider */}
        <div className="w-px self-stretch bg-slate-200/80 shrink-0" />
        {/* Right field */}
        <div className="flex-1 flex items-center min-w-0">
          <input
            id={rightInput.id}
            type="text"
            inputMode="decimal"
            value={rightDisplay}
            onChange={(e) => {
              const raw = e.target.value;
              setRightDisplay(raw);
              const num = Number(raw);
              if (raw !== "" && !isNaN(num)) onChangeRight(num);
            }}
            onFocus={() => setFocusedSide("right")}
            onBlur={() => {
              setFocusedSide(null);
              onBlurRight();
              const num = Number(rightDisplay);
              if (rightDisplay === "") return;
              if (isNaN(num)) { setRightDisplay(""); return; }
              let final = num;
              if (rightInput.min !== undefined && num < rightInput.min) final = rightInput.min;
              if (rightInput.max !== undefined && num > rightInput.max) final = rightInput.max;
              setRightDisplay(String(final));
              onChangeRight(final);
            }}
            placeholder={rightInput.placeholder || ""}
            className="flex-1 min-w-0 bg-transparent pl-3 pr-1 py-3 text-slate-900 text-base font-medium focus:outline-none placeholder:text-slate-300"
          />
          {rightSuffix && (
            <span className="pr-2 text-slate-400 text-xs font-medium shrink-0">{rightSuffix}</span>
          )}
        </div>
      </div>
      {/* Validation error */}
      {hasError && (leftValidation?.message || rightValidation?.message) && (
        <div className="flex items-center gap-1.5 text-xs text-red-600 mt-1">
          <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <span>{leftValidation?.message || rightValidation?.message}</span>
        </div>
      )}
    </div>
  );
}
// SLIDING TOGGLE - Compact segmented control with slide animation
// =============================================================================
function SlidingToggle({ 
  options, 
  value, 
  onChange, 
  label, 
  t, 
  inputId,
  color = "blue"
}: { 
  options: { value: string; label: string }[]; 
  value: string; 
  onChange: (v: string) => void; 
  label: string;
  t?: TranslationFn;
  inputId?: string;
  color?: "blue" | "slate";
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderStyle, setSliderStyle] = useState<{ left?: string; width?: string }>({});

  const updateSlider = useCallback(() => {
    if (!containerRef.current) return;
    const idx = options.findIndex(o => o.value === value);
    const buttons = containerRef.current.querySelectorAll<HTMLButtonElement>("button");
    if (buttons[idx]) {
      const btn = buttons[idx];
      setSliderStyle({
        left: btn.offsetLeft + "px",
        width: btn.offsetWidth + "px",
      });
    }
  }, [value, options]);

  useEffect(() => {
    updateSlider();
    // Recalculate on resize
    window.addEventListener("resize", updateSlider);
    return () => window.removeEventListener("resize", updateSlider);
  }, [updateSlider]);

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-slate-500 font-medium whitespace-nowrap">{label}</span>
      <div ref={containerRef} className="relative flex bg-slate-100 rounded-md p-0.5">
        {/* Sliding indicator */}
        <div
          className="absolute top-0.5 bottom-0.5 bg-blue-600 rounded shadow-sm transition-all duration-300 ease-out"
          style={sliderStyle}
        />
        {options.map((o) => {
          const optLabel = t && inputId 
            ? t("inputs." + inputId + ".options." + o.value, o.label) 
            : o.label;
          return (
            <button
              key={o.value}
              type="button"
              role="radio"
              aria-checked={value === o.value}
              onClick={() => onChange(o.value)}
              className={`relative z-10 py-1 px-2.5 rounded text-xs font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1 ${
                value === o.value ? "text-white" : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {optLabel}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// =============================================================================
// RADIO INPUT - Sliding toggle style (for standalone radios not in header)
// =============================================================================
function RadioInput({ input, value, onChange, errorId, t }: { input: InputConfig; value: string; onChange: (v: string) => void; errorId?: string; t: TranslationFn }) {
  const options = input.options || [];
  const label = t("inputs." + input.id + ".label", input.label);
  const groupId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderStyle, setSliderStyle] = useState<{ left?: string; width?: string }>({});

  // Check if any option has a description (from config or translations)
  const hasDescriptions = options.some(opt => {
    const _rawDesc = t("inputs." + input.id + ".descriptions." + opt.value, "");
          const descFromT = _rawDesc.startsWith("inputs.") ? "" : _rawDesc;
    return descFromT || opt.description;
  });

  const updateSlider = useCallback(() => {
    if (!containerRef.current) return;
    const idx = options.findIndex(o => o.value === value);
    const buttons = containerRef.current.querySelectorAll<HTMLButtonElement>("button");
    if (buttons[idx]) {
      const btn = buttons[idx];
      setSliderStyle({
        left: btn.offsetLeft + "px",
        width: btn.offsetWidth + "px",
      });
    }
  }, [value, options]);

  useEffect(() => {
    updateSlider();
    window.addEventListener("resize", updateSlider);
    return () => window.removeEventListener("resize", updateSlider);
  }, [updateSlider]);
  
  return (
    <fieldset role="radiogroup" aria-labelledby={groupId}>
      <legend id={groupId} className="block font-medium text-slate-700 mb-2 text-sm">
        {label}
        {input.required && <span className="text-red-500 ml-1" aria-hidden="true">*</span>}
      </legend>
      <div ref={containerRef} className="relative flex bg-slate-100 rounded-xl p-0.5">
        {/* Sliding indicator */}
        <div
          className="absolute top-0.5 bottom-0.5 bg-blue-600 rounded-lg shadow-sm transition-all duration-300 ease-out"
          style={sliderStyle}
        />
        {options.map((opt) => {
          const isSelected = value === opt.value;
          const optLabel = t("inputs." + input.id + ".options." + opt.value, opt.label);
          // Description: try translation first, then fall back to opt.description
          const _rawDesc = t("inputs." + input.id + ".descriptions." + opt.value, "");
          const descFromT = _rawDesc.startsWith("inputs.") ? "" : _rawDesc;
          const description = descFromT || opt.description || "";

          return (
            <button
              key={opt.value}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onChange(opt.value)}
              className={`relative z-10 flex-1 py-2 px-2 rounded-lg text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1 ${
                hasDescriptions ? "flex flex-col items-center gap-0" : ""
              } ${
                isSelected
                  ? "text-white"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <span>{optLabel}</span>
              {hasDescriptions && description && (
                <span className={`text-[10px] font-normal leading-tight mt-0.5 ${
                  isSelected ? "text-blue-100" : "text-slate-400"
                }`}>
                  {description}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

// =============================================================================
// DATE INPUT - Custom Calendar with react-datepicker
// =============================================================================
function DateInput({ input, value, onChange, onBlur: onBlurProp, errorId, t, validation }: { input: InputConfig; value: string; onChange: (v: string) => void; onBlur?: () => void; errorId?: string; t: TranslationFn; validation?: ValidationResult }) {
  const label = t("inputs." + input.id + ".label", input.label);
  const helpTextStr = input.helpText ? t("inputs." + input.id + ".helpText", input.helpText) : "";
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value && value !== "";
  const isError = validation && !validation.isValid;
  const datePickerRef = useRef<DatePicker>(null);

  const dateValue = useMemo(() => {
    if (!value) return null;
    const [y, m, d] = value.split("-").map(Number);
    if (!y || !m || !d) return null;
    return new Date(y, m - 1, d);
  }, [value]);

  const handleChange = (date: Date | null) => {
    if (!date) { onChange(""); return; }
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    onChange(`${y}-${m}-${d}`);
  };

  const containerClass = isError
    ? "ring-2 ring-red-400 bg-red-50/50"
    : isFocused ? "ring-2 ring-blue-400 bg-slate-50"
    : "bg-slate-100 hover:bg-slate-200/70";

  const renderCustomHeader = ({
    date, decreaseMonth, increaseMonth, changeMonth, changeYear,
  }: {
    date: Date; decreaseMonth: () => void; increaseMonth: () => void;
    prevMonthButtonDisabled: boolean; nextMonthButtonDisabled: boolean;
    changeMonth: (m: number) => void; changeYear: (y: number) => void;
  }) => {
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 12 }, (_, i) => currentYear - 5 + i);
    return (
      <div style={{ padding: "14px 12px 10px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px", minWidth: 0, flex: 1 }}>
          <select value={date.getMonth()} onChange={(e) => changeMonth(Number(e.target.value))}
            style={{ border: "1px solid #e2e8f0", borderRadius: "10px", padding: "5px 8px", fontSize: "13px", fontWeight: 700, color: "#1e293b", background: "#f8fafc", cursor: "pointer", outline: "none", fontFamily: "inherit", minWidth: 0 }}>
            {months.map((m, i) => (<option key={m} value={i}>{m}</option>))}
          </select>
          <select value={date.getFullYear()} onChange={(e) => changeYear(Number(e.target.value))}
            style={{ border: "1px solid #e2e8f0", borderRadius: "10px", padding: "5px 8px", fontSize: "13px", fontWeight: 700, color: "#1e293b", background: "#f8fafc", cursor: "pointer", outline: "none", fontFamily: "inherit", width: "75px" }}>
            {years.map((y) => (<option key={y} value={y}>{y}</option>))}
          </select>
        </div>
        <div style={{ display: "flex", gap: "3px", flexShrink: 0 }}>
          <button type="button" onClick={decreaseMonth}
            style={{ border: "1px solid #e2e8f0", background: "#f8fafc", cursor: "pointer", padding: "5px 9px", borderRadius: "10px", color: "#64748b", fontSize: "15px", lineHeight: 1, transition: "all 0.15s", fontWeight: 600 }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#eff6ff"; e.currentTarget.style.color = "#3b82f6"; e.currentTarget.style.borderColor = "#bfdbfe"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#f8fafc"; e.currentTarget.style.color = "#64748b"; e.currentTarget.style.borderColor = "#e2e8f0"; }}>‹</button>
          <button type="button" onClick={increaseMonth}
            style={{ border: "1px solid #e2e8f0", background: "#f8fafc", cursor: "pointer", padding: "5px 9px", borderRadius: "10px", color: "#64748b", fontSize: "15px", lineHeight: 1, transition: "all 0.15s", fontWeight: 600 }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#eff6ff"; e.currentTarget.style.color = "#3b82f6"; e.currentTarget.style.borderColor = "#bfdbfe"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#f8fafc"; e.currentTarget.style.color = "#64748b"; e.currentTarget.style.borderColor = "#e2e8f0"; }}>›</button>
        </div>
      </div>
    );
  };

  return (
    <InputWrapper validation={validation}>
      <div className="flex items-baseline justify-between mb-1.5">
        <label htmlFor={input.id} className="block font-medium text-slate-700 text-sm">
          {label}
          {input.required && <span className="text-red-500 ml-1" aria-hidden="true">*</span>}
        </label>
        {false && helpTextStr && (
          <span id={`help-${input.id}`} className="text-xs text-slate-400">{helpTextStr}</span>
        )}
      </div>
      <div className={`relative flex items-center rounded-xl transition-all ${containerClass} kalcufy-datepicker`}>
        <DatePicker
          ref={datePickerRef}
          id={input.id}
          selected={dateValue}
          onChange={handleChange}
          onCalendarOpen={() => setIsFocused(true)}
          onCalendarClose={() => { setIsFocused(false); onBlurProp?.(); }}
          dateFormat="MMM d, yyyy"
          placeholderText="Select a date"
          renderCustomHeader={renderCustomHeader}
          isClearable={hasValue}
          showPopperArrow={false}
          popperPlacement="bottom-end"
          className={`w-full bg-transparent pl-3 pr-10 py-3 focus:outline-none transition-all border-0 text-base font-medium cursor-pointer ${hasValue ? 'text-slate-900' : 'text-slate-400'}`}
          calendarClassName="kalcufy-calendar"
          wrapperClassName="flex-1 min-w-0"
          shouldCloseOnSelect={true}
          required={input.required}
          aria-required={input.required}
          aria-invalid={!!errorId}
          aria-describedby={[errorId, helpTextStr ? `help-${input.id}` : undefined].filter(Boolean).join(" ") || undefined}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 16px 14px", borderTop: "1px solid #f1f5f9" }}>
            <button type="button"
              onClick={() => { onChange(""); datePickerRef.current?.setOpen(false); }}
              style={{ background: "none", border: "none", color: "#94a3b8", fontWeight: 600, fontSize: "13px", cursor: "pointer", padding: "6px 12px", borderRadius: "8px", transition: "all 0.15s", fontFamily: "inherit", letterSpacing: "0.02em" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "#ef4444"; e.currentTarget.style.background = "#fef2f2"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "#94a3b8"; e.currentTarget.style.background = "none"; }}>
              CLEAR
            </button>
            <button type="button"
              onClick={() => { handleChange(new Date()); datePickerRef.current?.setOpen(false); }}
              style={{ background: "#eff6ff", border: "1px solid #bfdbfe", color: "#2563eb", fontWeight: 700, fontSize: "13px", cursor: "pointer", padding: "6px 16px", borderRadius: "10px", transition: "all 0.15s", fontFamily: "inherit", letterSpacing: "0.02em" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#dbeafe"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#eff6ff"; }}>
              TODAY
            </button>
          </div>
        </DatePicker>
        {/* Calendar icon - RIGHT side */}
        <span className="absolute right-3 flex-shrink-0 pointer-events-none">
          <svg className={`w-5 h-5 ${isError ? 'text-red-400' : hasValue ? 'text-blue-500' : 'text-slate-400'} transition-colors`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
          </svg>
        </span>
      </div>
      <style jsx global>{`
        .kalcufy-datepicker .react-datepicker-wrapper { width: 100%; }
        .kalcufy-datepicker .react-datepicker__input-container { width: 100%; }
        .kalcufy-datepicker .react-datepicker__close-icon { display: none !important; }

        .kalcufy-datepicker .react-datepicker-popper {
          z-index: 50 !important;
        }
        .kalcufy-calendar.react-datepicker {
          font-family: 'Inter', system-ui, sans-serif !important;
          border: 1px solid #e2e8f0 !important;
          border-radius: 20px !important;
          box-shadow: 0 25px 65px -12px rgba(0,0,0,0.18), 0 10px 24px -4px rgba(0,0,0,0.08) !important;
          overflow: hidden;
          background: #fff !important;
          width: min(340px, calc(100vw - 32px)) !important;
        }
        .kalcufy-calendar .react-datepicker__header {
          background: #fff !important;
          border-bottom: 1px solid #f1f5f9 !important;
          padding: 0 !important;
        }
        .kalcufy-calendar .react-datepicker__header--custom { padding: 0 !important; }
        .kalcufy-calendar .react-datepicker__current-month { display: none !important; }
        .kalcufy-calendar .react-datepicker__day-names {
          margin: 0 !important; padding: 4px 16px 8px !important;
          display: flex !important; justify-content: space-between !important;
        }
        .kalcufy-calendar .react-datepicker__day-name {
          color: #94a3b8 !important; font-weight: 700 !important; font-size: 0.7rem !important;
          width: 40px !important; line-height: 24px !important; margin: 0 !important;
          text-transform: uppercase; letter-spacing: 0.05em; text-align: center !important;
        }
        .kalcufy-calendar .react-datepicker__month {
          margin: 4px 12px 0 !important;
        }
        .kalcufy-calendar .react-datepicker__week {
          display: flex !important; justify-content: space-between !important;
          padding: 0 4px !important;
        }
        .kalcufy-calendar .react-datepicker__day {
          width: 40px !important; height: 40px !important; line-height: 40px !important;
          border-radius: 12px !important; margin: 2px 0 !important;
          font-size: 0.9rem !important; font-weight: 500 !important;
          color: #334155 !important; transition: all 0.15s ease !important;
          display: inline-flex !important; align-items: center !important; justify-content: center !important;
        }
        .kalcufy-calendar .react-datepicker__day:hover {
          background: #eff6ff !important; color: #2563eb !important;
        }
        .kalcufy-calendar .react-datepicker__day--selected {
          background: linear-gradient(135deg, #3b82f6, #2563eb) !important;
          color: #fff !important; font-weight: 700 !important;
          box-shadow: 0 4px 12px -2px rgba(59,130,246,0.45) !important;
        }
        .kalcufy-calendar .react-datepicker__day--keyboard-selected {
          background: #dbeafe !important; color: #2563eb !important;
        }
        .kalcufy-calendar .react-datepicker__day--today {
          position: relative; font-weight: 700 !important; color: #2563eb !important;
        }
        .kalcufy-calendar .react-datepicker__day--today:not(.react-datepicker__day--selected) {
          border: 2px solid #3b82f6 !important;
        }
        .kalcufy-calendar .react-datepicker__day--today.react-datepicker__day--selected {
          background: linear-gradient(135deg, #3b82f6, #2563eb) !important; color: #fff !important;
          border: none !important;
        }
        .kalcufy-calendar .react-datepicker__day--outside-month {
          color: #cbd5e1 !important; font-weight: 400 !important;
        }
        .kalcufy-calendar .react-datepicker__navigation { display: none !important; }
        .kalcufy-calendar .react-datepicker__children-container {
          width: 100% !important; margin: 0 !important; padding: 0 !important;
        }
        .kalcufy-calendar .react-datepicker__today-button { display: none !important; }
      `}</style>
    </InputWrapper>
  );
}
// =============================================================================
// TEXT INPUT
// =============================================================================
function TextInput({ input, value, onChange, errorId, t }: { input: InputConfig; value: string; onChange: (v: string) => void; errorId?: string; t: TranslationFn }) {
  const label = t("inputs." + input.id + ".label", input.label);
  const [isFocused, setIsFocused] = useState(false);
  
  // FLAT DESIGN
  const containerClass = isFocused 
    ? "ring-2 ring-blue-400 bg-slate-50" 
    : "bg-slate-100 hover:bg-slate-200/70";
  
  return (
    <div>
      <label htmlFor={input.id} className="block font-medium text-slate-700 mb-1.5 text-sm">
        {label}
        {input.required && <span className="text-red-500 ml-1" aria-hidden="true">*</span>}
      </label>
      <input
        id={input.id}
        type="text"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={input.placeholder}
        required={input.required}
        aria-required={input.required}
        aria-invalid={!!errorId}
        className={`w-full rounded-xl px-3 py-3 text-slate-800 focus:outline-none transition-all placeholder:text-slate-400 border-0 ${containerClass}`}
      />
    </div>
  );
}

// =============================================================================
// CHECKBOX INPUT
// =============================================================================
function CheckboxInput({ input, value, onChange, errorId, t }: { input: InputConfig; value: boolean; onChange: (v: boolean) => void; errorId?: string; t: TranslationFn }) {
  const label = t("inputs." + input.id + ".label", input.label);
  
  return (
    <label className="flex items-center gap-3 cursor-pointer group">
      <div className="relative">
        <input
          id={input.id}
          type="checkbox"
          checked={value || false}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only peer"
          aria-invalid={!!errorId}
        />
        <div className="w-6 h-6 border-2 border-slate-200 bg-white rounded-lg peer-checked:bg-blue-600 peer-checked:border-blue-600 peer-focus:ring-2 peer-focus:ring-blue-400 peer-focus:ring-offset-1 transition-all group-hover:border-slate-300 peer-checked:group-hover:bg-blue-700 flex items-center justify-center">
          <svg className="w-4 h-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>
      <span className="text-slate-700">{label}</span>
    </label>
  );
}


// =============================================================================
// AUTO-DETECT SLIDER v2.0 - UX Research-Based Logic
// =============================================================================
// Rule: "Does the user know the exact value before typing?"
//   YES → Number input only (weight, height, salary, price, measurements)
//   NO / wants to explore → Slider + input (rates, terms, percentages, age)
// Override: type: "slider" in config always forces slider
// =============================================================================
function shouldUseSlider(input) {
  // ─── EXPLICIT OVERRIDE: Always respect showSlider property ────────────
  if (input.showSlider === false) return false;
  if (input.showSlider === true) return true;

  // ─── CURRENCY FIELDS: Money inputs should NEVER be sliders ────────────
  if (input.unitType === 'currency') return false;

  const id = input.id.toLowerCase();
  const label = (input.label || '').toLowerCase();
  const suffix = (input.suffix || '').toLowerCase();
  const combined = id + ' ' + label + ' ' + suffix;

  // ─── NEVER SLIDER: User knows the exact value ─────────────────────────
  const neverSlider = [
    // Body measurements (user measures precisely)
    'weight', 'peso', 'poids', 'gewicht',
    'height', 'altura', 'taille', 'größe', 'grosse',
    'waist', 'cintura', 'neck', 'cuello', 'cou',
    'hip', 'cadera', 'hanche', 'wrist', 'muñeca',
    'forearm', 'antebrazo', 'chest', 'pecho',
    'thigh', 'muslo', 'circumference', 'circunferencia',

    // Money amounts (user knows exact value)
    'price', 'precio', 'preço', 'prix',
    'amount', 'monto', 'valor', 'montant',
    'payment', 'pago', 'pagamento', 'paiement',
    'income', 'salary', 'ingreso', 'salario', 'revenu', 'salaire',
    'balance', 'saldo', 'solde',
    'deposit', 'deposito',
    'fee', 'tarifa', 'taxa', 'frais',
    'cost', 'costo', 'coût',
    'bill', 'cuenta', 'factura', 'facture',
    'trade', 'intercambio',
    'loan', 'prestamo', 'prêt',
    'budget', 'presupuesto',
    'savings', 'ahorro',
    'expense', 'gasto',
    'rent', 'alquiler', 'loyer',

    // Exact counts
    'reps', 'repeticiones', 'rep', 'repeticion',
    'sets', 'series', 'steps', 'pasos',
    'children', 'hijos', 'dependents', 'dependientes',

    // Medical data
    'bloodpressure', 'glucose', 'glucosa', 'cholesterol', 'colesterol',
    'heartrate', 'heart rate', 'restinghr', 'resting hr', 'maxhr', 'max hr',
    'bpm', 'ppm', 'frecuencia cardiaca', 'frequencia cardiaca', 'fréquence cardiaque',
    'lactate', 'lactato', 'threshold', 'umbral',

    // Unit system selector
    'unitsystem',
  ];

  if (neverSlider.some(kw => combined.includes(kw))) {
    return false;
  }

  // ─── ALWAYS SLIDER: Exploration / approximate values ──────────────────
  const alwaysSlider = [
    // Interest rates & financial percentages
    'interest', 'interes', 'intérêt',
    'rate', 'tasa', 'taux',
    'apr', 'tae',
    'return', 'retorno', 'rendement',
    'inflation', 'inflacion',
    'growth', 'crecimiento', 'croissance',
    'yield', 'rendimiento',
    'margin', 'margen',

    // Time periods
    'term', 'plazo', 'terme',
    'months', 'meses', 'mois',
    'years', 'años', 'anos', 'ans',
    'duration', 'duracion', 'durée',
    'periodo', 'period', 'période',

    // Age
    'age', 'edad', 'âge', 'alter', 'idade',

    // Adjustable percentages
    'tip', 'propina', 'pourboire',
    'deficit', 'déficit',
    'surplus', 'superavit',
    'contribution', 'contribucion', 'cotisation',
    'downpayment', 'enganche', 'acompte',
    'downpercent',
    'taxrate', 'impuesto',

    // Body composition (exploration)
    'bodyfat', 'grasacorporal',
    'activity', 'actividad', 'activité',
    'intensity', 'intensidad', 'intensité',
    'frequency', 'frecuencia', 'fréquence',

    // Scores and levels
    'level', 'nivel', 'niveau',
    'score', 'puntuacion',
    'tolerance', 'tolerancia', 'tolérance',
    'risk', 'riesgo', 'risque',
    'confidence', 'confianza',
  ];

  if (alwaysSlider.some(kw => combined.includes(kw))) {
    return true;
  }

  // ─── SUFFIX-BASED: % suffix → likely slider candidate ─────────────────
  // BUT: Don't trigger if suffix is explicitly something else (like /kWh, /hr, etc)
  const hasExplicitSuffix = input.suffix && input.suffix !== '%' && input.suffix.toLowerCase() !== 'percent';
  if (!hasExplicitSuffix && (suffix === '%' || suffix === 'percent' || combined.includes('percent'))) {
    return true;
  }

  return false;
}

// Get smart defaults for slider ranges - v2.0
function getSliderDefaults(input) {
  const id = input.id.toLowerCase();
  const label = (input.label || '').toLowerCase();
  const suffix = (input.suffix || '').toLowerCase();
  const combined = id + ' ' + label + ' ' + suffix;

  // Interest rates / financial rates
  if (['interest', 'rate', 'apr', 'tae', 'tasa', 'taux', 'interes'].some(kw => combined.includes(kw))) {
    if (combined.includes('tax') || combined.includes('impuesto')) {
      return { min: input.min ?? 0, max: input.max ?? 50, step: input.step ?? 0.5, suffix: '%' };
    }
    if (combined.includes('inflation') || combined.includes('growth') || combined.includes('return')) {
      return { min: input.min ?? 0, max: input.max ?? 15, step: input.step ?? 0.1, suffix: '%' };
    }
    return { min: input.min ?? 0, max: input.max ?? 25, step: input.step ?? 0.1, suffix: '%' };
  }

  // Age
  if (['age', 'edad', 'âge', 'idade'].some(kw => combined.includes(kw))) {
    return { min: input.min ?? 18, max: input.max ?? 80, step: input.step ?? 1 };
  }

  // Term in months
  if (combined.includes('month') || combined.includes('meses') || combined.includes('mois')) {
    return { min: input.min ?? 6, max: input.max ?? 84, step: input.step ?? 6 };
  }

  // Term in years
  if (['year', 'años', 'anos', 'ans'].some(kw => combined.includes(kw))) {
    return { min: input.min ?? 1, max: input.max ?? 30, step: input.step ?? 1 };
  }

  // Generic term/duration
  if (['term', 'plazo', 'duration', 'duracion'].some(kw => combined.includes(kw))) {
    return { min: input.min ?? 6, max: input.max ?? 84, step: input.step ?? 6 };
  }

  // Tip percentage
  if (['tip', 'propina', 'pourboire'].some(kw => combined.includes(kw))) {
    return { min: input.min ?? 0, max: input.max ?? 30, step: input.step ?? 1, suffix: '%' };
  }

  // Contribution / down payment
  if (['contribution', 'contribucion', 'down', 'enganche'].some(kw => combined.includes(kw))) {
    return { min: input.min ?? 0, max: input.max ?? 30, step: input.step ?? 0.5, suffix: '%' };
  }

  // Caloric deficit / surplus
  if (['deficit', 'surplus'].some(kw => combined.includes(kw))) {
    return { min: input.min ?? 0, max: input.max ?? 40, step: input.step ?? 1, suffix: '%' };
  }

  // Body fat percentage
  if (['bodyfat', 'grasa'].some(kw => combined.includes(kw))) {
    return { min: input.min ?? 3, max: input.max ?? 50, step: input.step ?? 0.5, suffix: '%' };
  }

  // Activity / intensity / frequency / level
  if (['activity', 'intensity', 'frequency', 'level'].some(kw => combined.includes(kw))) {
    return { min: input.min ?? 1, max: input.max ?? 10, step: input.step ?? 1 };
  }

  // Risk / tolerance / confidence
  if (['risk', 'tolerance', 'confidence'].some(kw => combined.includes(kw))) {
    return { min: input.min ?? 1, max: input.max ?? 10, step: input.step ?? 1 };
  }

  // Generic percentage - BUT ONLY if suffix is not explicitly defined differently
  // CRITICAL: If user explicitly set a suffix, don't override it with '%'
  if ((suffix === '%' || suffix === 'percent' || combined.includes('percent')) && 
      (!input.suffix || input.suffix === '%' || input.suffix.toLowerCase() === 'percent')) {
    return { min: input.min ?? 0, max: input.max ?? 100, step: input.step ?? 1, suffix: '%' };
  }

  return {};
}

// =============================================================================
// RENDER INPUT
// =============================================================================
function RenderInput({ 
  input, 
  value, 
  onChange,
  onBlur, // SMART DEFAULTS: Add onBlur prop
  errorId, 
  t, 
  unitSystem, 
  currencySymbol,
  validation
}: { 
  input: InputConfig; 
  value: unknown; 
  onChange: (v: unknown) => void;
  onBlur?: () => void; // SMART DEFAULTS: Optional blur handler
  errorId?: string; 
  t: TranslationFn; 
  unitSystem?: "metric" | "imperial"; 
  currencySymbol?: string;
  validation?: ValidationResult;
}) {
  // Auto-detect if should be slider
  const useSlider = shouldUseSlider(input);
  const effectiveType = useSlider && (input.type === 'number' || input.type === 'percentage') ? 'slider' : input.type;
  
  // Apply smart defaults for sliders - BUT explicit input properties override defaults
  const effectiveInput = useSlider ? { ...getSliderDefaults(input), ...input } : input;
  
  // ✅ DUAL UNIT DETECTION: Check if current unit is dual (ft/in)
  const isDualUnit = useMemo(() => {
    if (input.type === "number" && input.unitType && input._fieldUnit) {
      const group = getUnitGroup(input.unitType);
      const currentUnit = group?.units.find(u => u.id === input._fieldUnit);
      return currentUnit?.isDual || false;
    }
    return false;
  }, [input.type, input.unitType, input._fieldUnit]);

  // ✅ RENDER DUAL NUMBER INPUT if dual unit detected
  if (isDualUnit && effectiveType === "number") {
    return (
      <DualNumberInput
        input={input}
        value={value as number}
        onChange={onChange}
        onBlur={onBlur}
        errorId={errorId}
        t={t}
        validation={validation}
      />
    );
  }
  
  switch (effectiveType) {
    case "currency":
      return <CurrencyInput input={input} value={value as number} onChange={onChange} onBlur={onBlur} errorId={errorId} t={t} currencySymbol={currencySymbol} validation={validation} />;
    case "percentage":
      return <PercentageInput input={input} value={value as number} onChange={onChange} onBlur={onBlur} errorId={errorId} t={t} validation={validation} />;
    case "slider":
      return <SliderInput input={effectiveInput} value={value as number} onChange={onChange} onBlur={onBlur} errorId={errorId} t={t} unitSystem={unitSystem} validation={validation} currencySymbol={currencySymbol} />;
    case "select":
      return <SelectInput input={input} value={value as string} onChange={onChange} errorId={errorId} t={t} />;
    case "radio":
      return <RadioInput input={input} value={value as string} onChange={onChange} errorId={errorId} t={t} />;
    case "date":
      return <DateInput input={input} value={value as string} onChange={onChange} onBlur={onBlur} errorId={errorId} t={t} validation={validation} />;
    case "text":
      return <TextInput input={input} value={value as string} onChange={onChange} errorId={errorId} t={t} />;
    case "checkbox":
      return <CheckboxInput input={input} value={value as boolean} onChange={onChange} errorId={errorId} t={t} />;
    // ── NEW V4.3 COMPONENTS ──
    case "toggle":
      return <ToggleInput input={input} value={value as boolean} onChange={onChange} t={t} />;
    case "stepper":
      return <NumberStepperInput input={input} value={value as number} onChange={onChange} onBlur={onBlur} t={t} validation={validation} />;
    case "textarea":
      return <TextAreaInput input={input} value={value as string} onChange={onChange} onBlur={onBlur} t={t} validation={validation} />;
    case "time":
      return <TimeInput input={input} value={value} onChange={onChange} onBlur={onBlur} t={t} validation={validation} />;
    case "daterange":
      return <DateRangeInput input={input} value={value} onChange={onChange} onBlur={onBlur} t={t} validation={validation} />;
    case "imageradio":
      return <ImageRadioInput input={input} value={value as string} onChange={onChange} t={t} />;
    case "multiselect":
      return <MultiSelectInput input={input} value={value} onChange={onChange} t={t} />;
    case "repeater":
      return <RepeaterInput input={input} value={value} onChange={onChange} onBlur={onBlur} t={t} validation={validation} />;
    default:
      return <NumberInput input={input} value={value as number} onChange={onChange} onBlur={onBlur} errorId={errorId} t={t} unitSystem={unitSystem} validation={validation} currencySymbol={currencySymbol} />;
  }
}

// =============================================================================
// MAIN INPUT CARD V4 COMPONENT
// =============================================================================
export default function InputCardV4({
  inputs,
  inputGroups,
  values,
  units,
  unitSystem,
  errors,
  onChange,
  onUnitChange,
  onUnitSystemChange,
  t,
  showUnitSystemToggle,
  unitSystemOptions,
  currentMode,
  currencyCode,
  locale = "en",
}: InputCardV4Props) {
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({}); // SMART DEFAULTS: Track touched fields
  const formId = useId();
  const unitSystemGroupId = useId();
  
  const { currency } = useCurrency();
  const currencySymbol = currency?.symbol || "$";

  const groupedInputIds = new Set(inputGroups?.flatMap(g => (g.inputs || g.inputIds || [])) || []);
  const mainInputs = inputs.filter(i => !groupedInputIds.has(i.id));

  // SMART DEFAULTS: Mark field as touched
  const handleFieldBlur = (inputId: string) => {
    setTouched(prev => ({ ...prev, [inputId]: true }));
  };

  // Compute validations - SMART DEFAULTS: Only show if touched
  const validations = useMemo(() => {
    const result: Record<string, ValidationResult> = {};
    inputs.forEach(input => {
      const validation = validateInput(values[input.id], input, currencySymbol, t, locale);
      // SMART DEFAULTS: Only mark as invalid if field was touched
      if (!touched[input.id]) {
        result[input.id] = { isValid: true }; // Don't show error until touched
      } else {
        result[input.id] = validation;
      }
    });
    return result;
  }, [inputs, values, currencySymbol, touched, t, locale]);

  const shouldShowInput = (input: InputConfig): boolean => {
    const showWhen = input.showWhen;
    if (!showWhen) return true;
    
    // Helper function to check a single condition
    const checkCondition = (condition: { field: string; value: string | string[] | number | boolean }): boolean => {
      let fieldValue: unknown;
      if (condition.field === "unitSystem") {
        fieldValue = values.unitSystem ?? unitSystem;
      } else if (condition.field === "currentMode") {
        fieldValue = currentMode;
      } else {
        fieldValue = values[condition.field];
      }
      
      if (Array.isArray(condition.value)) {
        return condition.value.includes(fieldValue as string);
      }
      return fieldValue === condition.value;
    };
    
    // If showWhen is an array, ALL conditions must be true (AND logic)
    if (Array.isArray(showWhen)) {
      return showWhen.every(checkCondition);
    }
    
    // Single condition
    return checkCondition(showWhen);
  };

  const toggleGroup = (groupId: string) => {
    setExpandedGroups(prev => ({ ...prev, [groupId]: !prev[groupId] }));
  };

  // Detect "header radios": consecutive radio inputs at the top with ≤4 options
  const headerRadioIds = useMemo(() => {
    const visibleMains = mainInputs.filter(shouldShowInput);
    const ids = new Set<string>();
    for (const input of visibleMains) {
      if (input.type === "radio" && (input.options?.length || 0) <= 4) {
        ids.add(input.id);
      } else {
        break; // Stop at first non-radio
      }
    }
    return ids;
  }, [mainInputs, values, unitSystem, currentMode]);

  const hasCompactHeader = headerRadioIds.size > 0 || showUnitSystemToggle;

  const renderMainInputs = () => {
    const visibleInputs = mainInputs.filter(i => shouldShowInput(i) && !headerRadioIds.has(i.id));
    const rendered: JSX.Element[] = [];
    let i = 0;
    
    while (i < visibleInputs.length) {
      const input = visibleInputs[i];
      const nextInput = visibleInputs[i + 1];
      const errorId = errors[input.id] ? "error-" + input.id : undefined;
      const validation = validations[input.id];
      
      if (input.width === "third" && nextInput?.width === "third") {
        const thirdInput = visibleInputs[i + 2];
        if (thirdInput?.width === "third") {
          // 3 inputs in a row
          const nextErrorId = errors[nextInput.id] ? "error-" + nextInput.id : undefined;
          const nextValidation = validations[nextInput.id];
          const thirdErrorId = errors[thirdInput.id] ? "error-" + thirdInput.id : undefined;
          const thirdValidation = validations[thirdInput.id];
          rendered.push(
            <div key={input.id} className="grid grid-cols-3 gap-3">
              <div className="min-w-0">
                <RenderInput input={input} value={values[input.id]} onChange={(v) => onChange(input.id, v)} onBlur={() => handleFieldBlur(input.id)} errorId={errorId} t={t} unitSystem={unitSystem} currencySymbol={currencySymbol} validation={validation} />
              </div>
              <div className="min-w-0">
                <RenderInput input={nextInput} value={values[nextInput.id]} onChange={(v) => onChange(nextInput.id, v)} onBlur={() => handleFieldBlur(nextInput.id)} errorId={nextErrorId} t={t} unitSystem={unitSystem} currencySymbol={currencySymbol} validation={nextValidation} />
              </div>
              <div className="min-w-0">
                <RenderInput input={thirdInput} value={values[thirdInput.id]} onChange={(v) => onChange(thirdInput.id, v)} onBlur={() => handleFieldBlur(thirdInput.id)} errorId={thirdErrorId} t={t} unitSystem={unitSystem} currencySymbol={currencySymbol} validation={thirdValidation} />
              </div>
            </div>
          );
          i += 3;
        } else {
          // Only 2 thirds found, render as half-width pair
          const nextErrorId = errors[nextInput.id] ? "error-" + nextInput.id : undefined;
          const nextValidation = validations[nextInput.id];
          rendered.push(
            <div key={input.id} className="grid grid-cols-2 gap-3">
              <div className="min-w-0">
                <RenderInput input={input} value={values[input.id]} onChange={(v) => onChange(input.id, v)} onBlur={() => handleFieldBlur(input.id)} errorId={errorId} t={t} unitSystem={unitSystem} currencySymbol={currencySymbol} validation={validation} />
              </div>
              <div className="min-w-0">
                <RenderInput input={nextInput} value={values[nextInput.id]} onChange={(v) => onChange(nextInput.id, v)} onBlur={() => handleFieldBlur(nextInput.id)} errorId={nextErrorId} t={t} unitSystem={unitSystem} currencySymbol={currencySymbol} validation={nextValidation} />
              </div>
            </div>
          );
          i += 2;
        }
      } else if (input.width === "half" && nextInput?.width === "half") {
        const nextErrorId = errors[nextInput.id] ? "error-" + nextInput.id : undefined;
        const nextValidation = validations[nextInput.id];

        // Compound field: two number inputs joined into one visual field (Omni-style)
        if (input.type === "number" && nextInput.type === "number") {
          rendered.push(
            <CompoundNumberInput
              key={input.id + "-compound"}
              leftInput={input}
              rightInput={nextInput}
              leftValue={values[input.id]}
              rightValue={values[nextInput.id]}
              onChangeLeft={(v) => onChange(input.id, v)}
              onChangeRight={(v) => onChange(nextInput.id, v)}
              onBlurLeft={() => handleFieldBlur(input.id)}
              onBlurRight={() => handleFieldBlur(nextInput.id)}
              leftValidation={validation}
              rightValidation={nextValidation}
              t={t}
            />
          );
        } else {
          // Fallback: separate inputs in grid
          rendered.push(
            <div key={input.id} className="grid grid-cols-2 gap-3">
              <div className="min-w-0">
                <RenderInput input={input} value={values[input.id]} onChange={(v) => onChange(input.id, v)} onBlur={() => handleFieldBlur(input.id)} errorId={errorId} t={t} unitSystem={unitSystem} currencySymbol={currencySymbol} validation={validation} />
              </div>
              <div className="min-w-0">
                <RenderInput input={nextInput} value={values[nextInput.id]} onChange={(v) => onChange(nextInput.id, v)} onBlur={() => handleFieldBlur(nextInput.id)} errorId={nextErrorId} t={t} unitSystem={unitSystem} currencySymbol={currencySymbol} validation={nextValidation} />
              </div>
            </div>
          );
        }
        i += 2;
      } else {
        rendered.push(
          <div key={input.id}>
            <RenderInput input={input} value={values[input.id]} onChange={(v) => onChange(input.id, v)} onBlur={() => handleFieldBlur(input.id)} errorId={errorId} t={t} unitSystem={unitSystem} currencySymbol={currencySymbol} validation={validation} />
          </div>
        );
        i += 1;
      }
    }
    
    return rendered;
  };

  return (
    <form 
      id={formId}
      className="bg-white rounded-2xl border border-blue-200 px-2.5 py-4 sm:px-4 md:p-6 shadow-sm ring-1 ring-blue-100 overflow-visible max-w-full box-border"
      onSubmit={(e) => e.preventDefault()}
      noValidate
    >
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold text-slate-900">
          {t("calculator.yourInformation", t("ui.yourInformation", "Your Information"))}
        </h2>
        <span className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
          NEW ✨
        </span>
      </div>

      {/* Compact Header Row: Radio toggles + Unit System */}
      {hasCompactHeader && (
        <div className="flex items-center gap-2 sm:gap-4 mb-3.5 pb-3.5 border-b border-slate-100 flex-wrap overflow-x-hidden">
          {/* Header radio inputs */}
          {mainInputs.filter(i => shouldShowInput(i) && headerRadioIds.has(i.id)).map((input, idx) => (
            <div key={input.id} className="flex items-center gap-4">
              {idx > 0 && <div className="w-px h-5 bg-slate-200" />}
              <SlidingToggle
                label={t("inputs." + input.id + ".label", input.label)}
                options={input.options || []}
                value={values[input.id] as string}
                onChange={(v) => onChange(input.id, v)}
                t={t}
                inputId={input.id}
              />
            </div>
          ))}
          {/* Unit System toggle */}
          {showUnitSystemToggle && unitSystemOptions && (
            <div className="flex items-center gap-4">
              {headerRadioIds.size > 0 && <div className="w-px h-5 bg-slate-200" />}
              <SlidingToggle
                label={t("inputs.unitSystem.label", "Units")}
                options={unitSystemOptions.map(opt => ({
                  value: opt.value,
                  label: t("inputs.unitSystem.options." + opt.value, opt.label),
                }))}
                value={unitSystem}
                onChange={(v) => onUnitSystemChange(v as "metric" | "imperial")}
              />
            </div>
          )}
        </div>
      )}

      <div className="space-y-3.5 w-full max-w-full px-0.5 -mx-0.5">

        {/* Main Inputs */}
        {renderMainInputs()}

        {/* Input Groups (Collapsible) */}
        {inputGroups?.map((group) => {
          const groupInputs = inputs.filter(i => (group.inputs || group.inputIds || []).includes(i.id));
          const visibleGroupInputs = groupInputs.filter(shouldShowInput);
          
          if (visibleGroupInputs.length === 0) return null;
          
          const isExpanded = expandedGroups[group.id] ?? group.defaultExpanded ?? false;

          return (
            <div key={group.id} className="border-t border-slate-200 pt-4">
              <button
                type="button"
                onClick={() => toggleGroup(group.id)}
                className="w-full flex items-center justify-between py-2 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
                aria-expanded={isExpanded}
                aria-controls={`group-content-${group.id}`}
              >
                <span className="font-medium text-slate-700">{t("inputGroups." + group.id + ".title", group.title)}</span>
                <svg 
                  className={"w-5 h-5 text-slate-400 transition-transform " + (isExpanded ? "rotate-180" : "")} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isExpanded && (
                <div id={`group-content-${group.id}`} className="mt-4 space-y-4">
                  {visibleGroupInputs.map((input) => {
                    const errorId = errors[input.id] ? "error-" + input.id : undefined;
                    const validation = validations[input.id];
                    return (
                      <div key={input.id}>
                        <RenderInput input={input} value={values[input.id]} onChange={(v) => onChange(input.id, v)} onBlur={() => handleFieldBlur(input.id)} errorId={errorId} t={t} unitSystem={unitSystem} currencySymbol={currencySymbol} validation={validation} />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </form>
  );
}
