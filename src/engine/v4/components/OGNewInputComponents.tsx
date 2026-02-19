"use client";

/**
 * NEW INPUT COMPONENTS V4.3 — 8 Professional Components
 * 
 * 1. ToggleInput      — iOS-style on/off switch
 * 2. NumberStepperInput — Big +/− buttons for small integers
 * 3. TextAreaInput     — Multi-line text/expression input
 * 4. TimeInput         — hrs | min | sec compound fields
 * 5. DateRangeInput    — Two connected date pickers (From → To)
 * 6. ImageRadioInput   — Radio buttons with emoji/icon above label
 * 7. MultiSelectInput  — Checkbox group for multiple selections
 * 8. RepeaterInput     — Dynamic rows with add/remove
 * 
 * All components follow the same design system:
 * - bg-white border border-slate-200 (normal)
 * - border-2 border-blue-400 shadow-sm (focus)
 * - border-2 border-red-400 bg-red-50/50 (error)
 * - text-sm font-medium text-slate-700 (labels)
 * - rounded-lg (containers)
 */

import { useState, useEffect, useId, useMemo, useRef, useCallback } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// =============================================================================
// SHARED TYPES (re-exported from InputCardV4 or duplicated for independence)
// =============================================================================
interface InputOption {
  value: string;
  label: string;
  icon?: string;    // For ImageRadio
  image?: string;   // For ImageRadio (URL)
}

interface RepeaterFieldConfig {
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
}

interface InputConfig {
  id: string;
  type: string;
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
  width?: string;
  example?: string;
  // Toggle
  toggleLabel?: string;       // Optional on/off labels
  // TextArea
  rows?: number;              // Number of rows
  maxLength?: number;         // Character limit
  // Time
  timeFormat?: "hms" | "hm" | "ms";  // Which fields to show
  timeOutputFormat?: "seconds" | "object";  // How to return value
  // DateRange
  dateRangeLabels?: { start?: string; end?: string };
  // ImageRadio
  columns?: number;           // Grid columns (2, 3, 4)
  // MultiSelect  
  multiSelectColumns?: number;
  maxSelections?: number;
  // Repeater
  repeaterFields?: RepeaterFieldConfig[];
  maxRows?: number;
  minRows?: number;
  addButtonLabel?: string;
}

interface ValidationResult {
  isValid: boolean;
  message?: string;
  type?: 'error' | 'warning' | 'success';
}

type TranslationFn = (key: string, fallback?: string) => string;

// =============================================================================
// 1. TOGGLE INPUT — iOS-style on/off switch
// =============================================================================
export function ToggleInput({ 
  input, 
  value, 
  onChange, 
  t 
}: { 
  input: InputConfig; 
  value: boolean; 
  onChange: (v: boolean) => void; 
  t: TranslationFn;
}) {
  const label = t("inputs." + input.id + ".label", input.label);
  const helpText = input.helpText ? t("inputs." + input.id + ".helpText", input.helpText) : "";
  const isOn = value === true;

  return (
    <div className="flex items-center justify-between py-2 px-3 bg-white border border-slate-200 rounded-lg">
      <div className="flex-1 min-w-0 mr-3">
        <label htmlFor={input.id} className="block font-medium text-slate-700 text-sm cursor-pointer">
          {label}
        </label>
        {helpText && (
          <span className="text-xs text-slate-400 mt-0.5 block">{helpText}</span>
        )}
      </div>
      <button
        id={input.id}
        type="button"
        role="switch"
        aria-checked={isOn}
        aria-label={label}
        onClick={() => onChange(!isOn)}
        className={`relative inline-flex flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1 ${
          isOn ? "bg-blue-600" : "bg-slate-300"
        }`}
        style={{ width: "36px", height: "20px" }}
      >
        <span
          className="pointer-events-none inline-block rounded-full bg-white shadow-sm transition-transform duration-200 ease-in-out"
          style={{
            width: "16px",
            height: "16px",
            marginTop: "2px",
            transform: isOn ? "translateX(18px)" : "translateX(2px)",
          }}
        />
      </button>
    </div>
  );
}

// =============================================================================
// 2. NUMBER STEPPER INPUT — Big +/− buttons for integers
// =============================================================================
export function NumberStepperInput({ 
  input, 
  value, 
  onChange,
  onBlur: onBlurProp,
  t,
  validation
}: { 
  input: InputConfig; 
  value: number; 
  onChange: (v: number) => void;
  onBlur?: () => void;
  t: TranslationFn;
  validation?: ValidationResult;
}) {
  const label = t("inputs." + input.id + ".label", input.label);
  const helpText = input.helpText ? t("inputs." + input.id + ".helpText", input.helpText) : "";
  const minVal = input.min ?? 0;
  const maxVal = input.max ?? 999;
  const stepVal = input.step ?? 1;
  const suffix = input.suffix ? t("inputs." + input.id + ".suffix", input.suffix) : "";
  
  const currentValue = value ?? minVal;
  const [displayValue, setDisplayValue] = useState<string>(String(currentValue));
  const [isFocused, setIsFocused] = useState(false);
  const isError = validation && !validation.isValid;

  useEffect(() => {
    if (!isFocused) {
      if (value === null || value === undefined) {
        setDisplayValue("");
      } else {
        setDisplayValue(String(value));
      }
    }
  }, [value, isFocused]);

  const increment = () => {
    const next = Math.min(maxVal, currentValue + stepVal);
    onChange(next);
    onBlurProp?.();
  };

  const decrement = () => {
    const next = Math.max(minVal, currentValue - stepVal);
    onChange(next);
    onBlurProp?.();
  };

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
    onBlurProp?.();
    if (displayValue === "") return;
    const num = Number(displayValue);
    if (isNaN(num)) { setDisplayValue(String(currentValue)); return; }
    let final = num;
    if (final < minVal) final = minVal;
    if (final > maxVal) final = maxVal;
    final = Math.round(final / stepVal) * stepVal;
    setDisplayValue(String(final));
    onChange(final);
  };

  const containerClass = isError
    ? "border-2 border-red-400 bg-red-50/50"
    : isFocused 
    ? "border-2 border-blue-400 shadow-sm bg-white"
    : "border border-slate-200 bg-white hover:border-slate-300";

  return (
    <div className="space-y-1 w-full">
      <div className="flex items-baseline justify-between mb-1.5">
        <label htmlFor={input.id} className="block font-medium text-slate-700 text-sm">
          {label}
          {input.required && <span className="text-red-500 ml-1" aria-hidden="true">*</span>}
        </label>
        {helpText && <span className="text-xs text-slate-400">{helpText}</span>}
      </div>
      <div className={`flex items-center rounded-lg transition-all ${containerClass}`}>
        {/* Minus button */}
        <button
          type="button"
          onClick={decrement}
          disabled={currentValue <= minVal}
          className="flex items-center justify-center w-10 h-10 rounded-l-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex-shrink-0"
          aria-label="Decrease"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
            <path strokeLinecap="round" d="M5 12h14" />
          </svg>
        </button>
        
        {/* Value display */}
        <div className="flex-1 flex items-center justify-center min-w-0">
          <input
            id={input.id}
            type="text"
            inputMode="numeric"
            value={displayValue}
            onChange={handleInputChange}
            onFocus={() => setIsFocused(true)}
            onBlur={handleBlur}
            placeholder={input.placeholder || "0"}
            className="w-full text-center bg-transparent py-2 text-slate-900 text-sm font-semibold focus:outline-none placeholder:text-slate-300"
            aria-label={label}
          />
          {suffix && <span className="text-slate-400 text-sm font-medium mr-2 flex-shrink-0">{suffix}</span>}
        </div>
        
        {/* Plus button */}
        <button
          type="button"
          onClick={increment}
          disabled={currentValue >= maxVal}
          className="flex items-center justify-center w-10 h-10 rounded-r-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex-shrink-0"
          aria-label="Increase"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
            <path strokeLinecap="round" d="M12 5v14M5 12h14" />
          </svg>
        </button>
      </div>

      {/* Validation message */}
      {validation && !validation.isValid && validation.message && (
        <div className="flex items-center gap-1.5 text-xs text-red-600">
          <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <span>{validation.message}</span>
        </div>
      )}
    </div>
  );
}

// =============================================================================
// 3. TEXTAREA INPUT — Multi-line text/expression input
// =============================================================================
export function TextAreaInput({ 
  input, 
  value, 
  onChange,
  onBlur: onBlurProp,
  t,
  validation
}: { 
  input: InputConfig; 
  value: string; 
  onChange: (v: string) => void;
  onBlur?: () => void;
  t: TranslationFn;
  validation?: ValidationResult;
}) {
  const label = t("inputs." + input.id + ".label", input.label);
  const helpText = input.helpText ? t("inputs." + input.id + ".helpText", input.helpText) : "";
  const [isFocused, setIsFocused] = useState(false);
  const rows = input.rows ?? 3;
  const maxLength = input.maxLength;
  const currentLength = (value || "").length;
  const isError = validation && !validation.isValid;

  const containerClass = isError
    ? "border-2 border-red-400 bg-red-50/50"
    : isFocused 
    ? "border-2 border-blue-400 shadow-sm bg-white"
    : "border border-slate-200 bg-white hover:border-slate-300";

  return (
    <div className="space-y-1 w-full">
      <div className="flex items-baseline justify-between mb-1.5">
        <label htmlFor={input.id} className="block font-medium text-slate-700 text-sm">
          {label}
          {input.required && <span className="text-red-500 ml-1" aria-hidden="true">*</span>}
        </label>
        {helpText && <span className="text-xs text-slate-400">{helpText}</span>}
      </div>
      <div className={`rounded-lg transition-all ${containerClass}`}>
        <textarea
          id={input.id}
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => { setIsFocused(false); onBlurProp?.(); }}
          placeholder={input.placeholder}
          rows={rows}
          maxLength={maxLength}
          required={input.required}
          aria-required={input.required}
          aria-invalid={!!isError}
          className="w-full bg-transparent rounded-lg px-3 py-2 text-slate-800 text-sm focus:outline-none transition-all placeholder:text-slate-400 border-0 resize-y min-h-[60px]"
          style={{ fontFamily: input.type === "textarea" ? "inherit" : "'JetBrains Mono', 'Fira Code', monospace" }}
        />
      </div>
      
      {/* Character count */}
      {maxLength && (
        <div className="flex justify-end">
          <span className={`text-xs ${currentLength > maxLength * 0.9 ? 'text-amber-500' : 'text-slate-300'}`}>
            {currentLength}/{maxLength}
          </span>
        </div>
      )}

      {/* Validation message */}
      {validation && !validation.isValid && validation.message && (
        <div className="flex items-center gap-1.5 text-xs text-red-600">
          <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <span>{validation.message}</span>
        </div>
      )}
    </div>
  );
}

// =============================================================================
// 4. TIME INPUT — hrs | min | sec compound fields
// =============================================================================
export function TimeInput({ 
  input, 
  value, 
  onChange,
  onBlur: onBlurProp,
  t,
  validation
}: { 
  input: InputConfig; 
  value: unknown; 
  onChange: (v: unknown) => void;
  onBlur?: () => void;
  t: TranslationFn;
  validation?: ValidationResult;
}) {
  const label = t("inputs." + input.id + ".label", input.label);
  const helpText = input.helpText ? t("inputs." + input.id + ".helpText", input.helpText) : "";
  const format = input.timeFormat ?? "hms";
  const outputFormat = input.timeOutputFormat ?? "seconds";
  const isError = validation && !validation.isValid;

  // Parse incoming value
  const parseValue = (v: unknown): { h: number; m: number; s: number } => {
    if (v && typeof v === "object" && "h" in (v as Record<string, unknown>)) {
      const obj = v as Record<string, number>;
      return { h: obj.h || 0, m: obj.m || 0, s: obj.s || 0 };
    }
    if (typeof v === "number") {
      const totalSec = v;
      const h = Math.floor(totalSec / 3600);
      const m = Math.floor((totalSec % 3600) / 60);
      const s = totalSec % 60;
      return { h, m, s };
    }
    return { h: 0, m: 0, s: 0 };
  };

  const parsed = parseValue(value);
  const [hours, setHours] = useState<string>(parsed.h > 0 ? String(parsed.h) : "");
  const [minutes, setMinutes] = useState<string>(parsed.m > 0 ? String(parsed.m) : "");
  const [seconds, setSeconds] = useState<string>(parsed.s > 0 ? String(parsed.s) : "");
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // Sync from external value changes
  useEffect(() => {
    if (focusedField) return;
    const p = parseValue(value);
    setHours(p.h > 0 ? String(p.h) : "");
    setMinutes(p.m > 0 ? String(p.m) : "");
    setSeconds(p.s > 0 ? String(p.s) : "");
  }, [value, focusedField]);

  const emitChange = (h: number, m: number, s: number) => {
    if (outputFormat === "seconds") {
      onChange(h * 3600 + m * 60 + s);
    } else {
      onChange({ h, m, s });
    }
  };

  const handleChange = (field: "h" | "m" | "s", raw: string) => {
    const cleaned = raw.replace(/[^0-9]/g, "");
    const num = cleaned === "" ? 0 : parseInt(cleaned, 10);
    
    let h = hours === "" ? 0 : parseInt(hours, 10) || 0;
    let m = minutes === "" ? 0 : parseInt(minutes, 10) || 0;
    let s = seconds === "" ? 0 : parseInt(seconds, 10) || 0;

    if (field === "h") { setHours(cleaned); h = num; }
    if (field === "m") { setMinutes(cleaned); m = Math.min(59, num); }
    if (field === "s") { setSeconds(cleaned); s = Math.min(59, num); }
    
    emitChange(h, m, s);
  };

  const handleBlur = (field: "h" | "m" | "s") => {
    setFocusedField(null);
    onBlurProp?.();
    
    // Clamp values on blur
    if (field === "m" && minutes !== "") {
      const clamped = Math.min(59, parseInt(minutes, 10) || 0);
      setMinutes(String(clamped));
    }
    if (field === "s" && seconds !== "") {
      const clamped = Math.min(59, parseInt(seconds, 10) || 0);
      setSeconds(String(clamped));
    }
  };

  const showH = format.includes("h");
  const showM = format.includes("m");
  const showS = format.includes("s");

  const borderClass = isError
    ? "border-2 border-red-400 bg-red-50/50"
    : focusedField
    ? "border-2 border-blue-400 shadow-sm bg-white"
    : "border border-slate-200 bg-white hover:border-slate-300";

  return (
    <div className="space-y-1 w-full">
      <div className="flex items-baseline justify-between mb-1.5">
        <label className="block font-medium text-slate-700 text-sm">
          {label}
          {input.required && <span className="text-red-500 ml-1" aria-hidden="true">*</span>}
        </label>
        {helpText && <span className="text-xs text-slate-400">{helpText}</span>}
      </div>
      
      {/* Single-line compact input — same height as standard V4 inputs */}
      <div className={`flex items-center rounded-lg transition-all h-[42px] ${borderClass}`}>
        {/* Hours */}
        {showH && (
          <div className="flex-1 min-w-0 flex items-center">
            <input
              id={input.id + "-h"}
              type="text"
              inputMode="numeric"
              value={hours}
              onChange={(e) => handleChange("h", e.target.value)}
              onFocus={() => setFocusedField("h")}
              onBlur={() => handleBlur("h")}
              placeholder="0"
              maxLength={4}
              className="w-full bg-transparent text-right pr-1 text-sm text-slate-900 focus:outline-none placeholder:text-slate-300"
              aria-label={t("inputs." + input.id + ".hours", "Hours")}
            />
            <span className="text-xs text-slate-400 font-medium flex-shrink-0 pr-1">
              {t("inputs." + input.id + ".hoursLabel", "hrs")}
            </span>
          </div>
        )}

        {showH && showM && (
          <div className="h-5 w-px bg-slate-200 flex-shrink-0" />
        )}

        {/* Minutes */}
        {showM && (
          <div className="flex-1 min-w-0 flex items-center">
            <input
              id={input.id + "-m"}
              type="text"
              inputMode="numeric"
              value={minutes}
              onChange={(e) => handleChange("m", e.target.value)}
              onFocus={() => setFocusedField("m")}
              onBlur={() => handleBlur("m")}
              placeholder="00"
              maxLength={2}
              className="w-full bg-transparent text-right pr-1 text-sm text-slate-900 focus:outline-none placeholder:text-slate-300"
              aria-label={t("inputs." + input.id + ".minutes", "Minutes")}
            />
            <span className="text-xs text-slate-400 font-medium flex-shrink-0 pr-1">
              {t("inputs." + input.id + ".minutesLabel", "min")}
            </span>
          </div>
        )}

        {showM && showS && (
          <div className="h-5 w-px bg-slate-200 flex-shrink-0" />
        )}

        {/* Seconds */}
        {showS && (
          <div className="flex-1 min-w-0 flex items-center">
            <input
              id={input.id + "-s"}
              type="text"
              inputMode="numeric"
              value={seconds}
              onChange={(e) => handleChange("s", e.target.value)}
              onFocus={() => setFocusedField("s")}
              onBlur={() => handleBlur("s")}
              placeholder="00"
              maxLength={2}
              className="w-full bg-transparent text-right pr-1 text-sm text-slate-900 focus:outline-none placeholder:text-slate-300"
              aria-label={t("inputs." + input.id + ".seconds", "Seconds")}
            />
            <span className="text-xs text-slate-400 font-medium flex-shrink-0 pr-2">
              {t("inputs." + input.id + ".secondsLabel", "sec")}
            </span>
          </div>
        )}
      </div>

      {/* Validation message */}
      {validation && !validation.isValid && validation.message && (
        <div className="flex items-center gap-1.5 text-xs text-red-600">
          <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <span>{validation.message}</span>
        </div>
      )}
    </div>
  );
}

// =============================================================================
// 5. DATE RANGE INPUT — Two connected date pickers (From → To)
// =============================================================================
export function DateRangeInput({ 
  input, 
  value, 
  onChange,
  onBlur: onBlurProp,
  t,
  validation
}: { 
  input: InputConfig; 
  value: unknown; 
  onChange: (v: unknown) => void;
  onBlur?: () => void;
  t: TranslationFn;
  validation?: ValidationResult;
}) {
  const label = t("inputs." + input.id + ".label", input.label);
  const helpText = input.helpText ? t("inputs." + input.id + ".helpText", input.helpText) : "";
  const startLabel = t("inputs." + input.id + ".startLabel", input.dateRangeLabels?.start || "From");
  const endLabel = t("inputs." + input.id + ".endLabel", input.dateRangeLabels?.end || "To");
  const isError = validation && !validation.isValid;

  const parseRange = (v: unknown): { start: string; end: string } => {
    if (v && typeof v === "object" && "start" in (v as Record<string, unknown>)) {
      const obj = v as Record<string, string>;
      return { start: obj.start || "", end: obj.end || "" };
    }
    return { start: "", end: "" };
  };

  const range = parseRange(value);
  
  const toDate = (str: string): Date | null => {
    if (!str) return null;
    const [y, m, d] = str.split("-").map(Number);
    if (!y || !m || !d) return null;
    return new Date(y, m - 1, d);
  };

  const fromDate = (date: Date | null): string => {
    if (!date) return "";
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  const startDate = toDate(range.start);
  const endDate = toDate(range.end);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleStartChange = (date: Date | null) => {
    const newStart = fromDate(date);
    // Auto-adjust end if it's before start
    let newEnd = range.end;
    if (date && endDate && date > endDate) {
      newEnd = newStart;
    }
    onChange({ start: newStart, end: newEnd });
  };

  const handleEndChange = (date: Date | null) => {
    const newEnd = fromDate(date);
    onChange({ start: range.start, end: newEnd });
  };

  const containerClass = (focused: boolean) => isError
    ? "border-2 border-red-400 bg-red-50/50"
    : focused
    ? "border-2 border-blue-400 shadow-sm bg-white"
    : "border border-slate-200 bg-white hover:border-slate-300";

  // Shared calendar style
  const calendarCss = `
    .kalcufy-daterange .react-datepicker-wrapper { width: 100%; }
    .kalcufy-daterange .react-datepicker__input-container { width: 100%; }
    .kalcufy-daterange .react-datepicker__close-icon { display: none !important; }
    .kalcufy-daterange .react-datepicker-popper { z-index: 50 !important; }
    .kalcufy-daterange .react-datepicker {
      font-family: 'Inter', system-ui, sans-serif !important;
      border: 1px solid #e2e8f0 !important;
      border-radius: 16px !important;
      box-shadow: 0 20px 50px -12px rgba(0,0,0,0.15) !important;
      overflow: hidden; background: #fff !important;
    }
    .kalcufy-daterange .react-datepicker__header {
      background: #fff !important; border-bottom: 1px solid #f1f5f9 !important; padding-top: 12px !important;
    }
    .kalcufy-daterange .react-datepicker__day {
      width: 36px !important; height: 36px !important; line-height: 36px !important;
      border-radius: 10px !important; font-size: 0.85rem !important; font-weight: 500 !important;
      color: #334155 !important; transition: all 0.15s ease !important;
    }
    .kalcufy-daterange .react-datepicker__day:hover { background: #eff6ff !important; color: #2563eb !important; }
    .kalcufy-daterange .react-datepicker__day--selected {
      background: linear-gradient(135deg, #3b82f6, #2563eb) !important; color: #fff !important; font-weight: 700 !important;
    }
    .kalcufy-daterange .react-datepicker__day--today:not(.react-datepicker__day--selected) {
      border: 2px solid #3b82f6 !important; font-weight: 700 !important; color: #2563eb !important;
    }
    .kalcufy-daterange .react-datepicker__day--outside-month { color: #cbd5e1 !important; }
    .kalcufy-daterange .react-datepicker__day-name {
      color: #94a3b8 !important; font-weight: 700 !important; font-size: 0.7rem !important; text-transform: uppercase;
    }
    .kalcufy-daterange .react-datepicker__navigation--previous { left: 12px !important; }
    .kalcufy-daterange .react-datepicker__navigation--next { right: 12px !important; }
  `;

  return (
    <div className="space-y-1 w-full">
      <div className="flex items-baseline justify-between mb-1.5">
        <label className="block font-medium text-slate-700 text-sm">
          {label}
          {input.required && <span className="text-red-500 ml-1" aria-hidden="true">*</span>}
        </label>
        {helpText && <span className="text-xs text-slate-400">{helpText}</span>}
      </div>

      <div className="grid grid-cols-2 gap-2">
        {/* Start Date */}
        <div className="kalcufy-daterange">
          <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mb-1 block">{startLabel}</span>
          <div className={`relative flex items-center rounded-lg transition-all ${containerClass(focusedField === "start")}`}>
            <DatePicker
              selected={startDate}
              onChange={handleStartChange}
              onCalendarOpen={() => setFocusedField("start")}
              onCalendarClose={() => { setFocusedField(null); onBlurProp?.(); }}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              dateFormat="MMM d, yyyy"
              placeholderText="Start date"
              showPopperArrow={false}
              className="w-full bg-transparent pl-3 pr-8 py-2 focus:outline-none text-sm font-medium cursor-pointer text-slate-800 placeholder:text-slate-400"
              wrapperClassName="flex-1 min-w-0"
            />
            <span className="absolute right-3 pointer-events-none">
              <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
              </svg>
            </span>
          </div>
        </div>

        {/* End Date */}
        <div className="kalcufy-daterange">
          <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mb-1 block">{endLabel}</span>
          <div className={`relative flex items-center rounded-lg transition-all ${containerClass(focusedField === "end")}`}>
            <DatePicker
              selected={endDate}
              onChange={handleEndChange}
              onCalendarOpen={() => setFocusedField("end")}
              onCalendarClose={() => { setFocusedField(null); onBlurProp?.(); }}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate || undefined}
              dateFormat="MMM d, yyyy"
              placeholderText="End date"
              showPopperArrow={false}
              className="w-full bg-transparent pl-3 pr-8 py-2 focus:outline-none text-sm font-medium cursor-pointer text-slate-800 placeholder:text-slate-400"
              wrapperClassName="flex-1 min-w-0"
            />
            <span className="absolute right-3 pointer-events-none">
              <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
              </svg>
            </span>
          </div>
        </div>
      </div>

      {/* Duration hint */}
      {startDate && endDate && (
        <div className="text-xs text-blue-500 font-medium mt-1">
          {(() => {
            const diffMs = endDate.getTime() - startDate.getTime();
            const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
            if (diffDays === 0) return t("inputs." + input.id + ".sameDay", "Same day");
            if (diffDays === 1) return t("inputs." + input.id + ".oneDay", "1 day");
            return `${diffDays} ${t("inputs." + input.id + ".days", "days")}`;
          })()}
        </div>
      )}

      {/* Validation */}
      {validation && !validation.isValid && validation.message && (
        <div className="flex items-center gap-1.5 text-xs text-red-600">
          <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <span>{validation.message}</span>
        </div>
      )}

      <style jsx global>{calendarCss}</style>
    </div>
  );
}

// =============================================================================
// 6. IMAGE RADIO INPUT — Radio with emoji/icon above label
// =============================================================================
export function ImageRadioInput({ 
  input, 
  value, 
  onChange, 
  t 
}: { 
  input: InputConfig; 
  value: string; 
  onChange: (v: string) => void; 
  t: TranslationFn;
}) {
  const label = t("inputs." + input.id + ".label", input.label);
  const helpText = input.helpText ? t("inputs." + input.id + ".helpText", input.helpText) : "";
  const options = input.options || [];
  const cols = input.columns ?? Math.min(options.length, 4);
  const gridClass =
    cols === 2 ? "grid-cols-2" :
    cols === 3 ? "grid-cols-3" :
    cols === 5 ? "grid-cols-5" :
    "grid-cols-4";

  return (
    <fieldset>
      <legend className="block font-medium text-slate-700 mb-2 text-sm">
        {label}
        {input.required && <span className="text-red-500 ml-1" aria-hidden="true">*</span>}
      </legend>
      {helpText && <p className="text-xs text-slate-400 mb-2">{helpText}</p>}
      
      <div className={`grid ${gridClass} gap-2`}>
        {options.map((opt) => {
          const isSelected = value === opt.value;
          const optLabel = t("inputs." + input.id + ".options." + opt.value, opt.label);
          const icon = opt.icon || "";
          
          return (
            <button
              key={opt.value}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onChange(opt.value)}
              className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1 ${
                isSelected
                  ? "bg-blue-50 ring-2 ring-blue-500 shadow-sm"
                  : "border border-slate-200 bg-white hover:border-slate-300"
              }`}
            >
              {/* SVG/Image — takes priority over emoji icon */}
              {opt.image ? (
                <img
                  src={opt.image}
                  alt=""
                  className="w-5 h-5 object-contain"
                  aria-hidden="true"
                  draggable={false}
                />
              ) : icon ? (
                <span className="text-base leading-none" aria-hidden="true">{icon}</span>
              ) : null}
              {/* Label */}
              <span className={`text-xs font-medium text-center leading-tight ${
                isSelected ? "text-blue-700" : "text-slate-600"
              }`}>
                {optLabel}
              </span>
              {/* Selection indicator */}
              {isSelected && (
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

// =============================================================================
// 7. MULTI-SELECT INPUT — Checkbox group for multiple selections
// =============================================================================
export function MultiSelectInput({ 
  input, 
  value, 
  onChange, 
  t 
}: { 
  input: InputConfig; 
  value: unknown; 
  onChange: (v: string[]) => void; 
  t: TranslationFn;
}) {
  const label = t("inputs." + input.id + ".label", input.label);
  const helpText = input.helpText ? t("inputs." + input.id + ".helpText", input.helpText) : "";
  const options = input.options || [];
  const maxSelections = input.maxSelections;
  const cols = input.multiSelectColumns ?? 2;
  const gridClass = cols === 1 ? "grid-cols-1" : cols === 2 ? "grid-cols-2" : "grid-cols-3";

  // Parse value
  const selected: string[] = Array.isArray(value) ? value : [];
  
  const toggleOption = (optValue: string) => {
    if (selected.includes(optValue)) {
      onChange(selected.filter(v => v !== optValue));
    } else {
      if (maxSelections && selected.length >= maxSelections) return;
      onChange([...selected, optValue]);
    }
  };

  return (
    <fieldset>
      <div className="flex items-baseline justify-between mb-2">
        <legend className="block font-medium text-slate-700 text-sm">
          {label}
          {input.required && <span className="text-red-500 ml-1" aria-hidden="true">*</span>}
        </legend>
        {maxSelections && (
          <span className="text-xs text-slate-400">
            {selected.length}/{maxSelections}
          </span>
        )}
      </div>
      {helpText && <p className="text-xs text-slate-400 mb-2">{helpText}</p>}

      <div className={`grid ${gridClass} gap-2`}>
        {options.map((opt) => {
          const isChecked = selected.includes(opt.value);
          const optLabel = t("inputs." + input.id + ".options." + opt.value, opt.label);
          const isDisabled = !isChecked && maxSelections !== undefined && selected.length >= maxSelections;

          return (
            <button
              key={opt.value}
              type="button"
              role="checkbox"
              aria-checked={isChecked}
              onClick={() => !isDisabled && toggleOption(opt.value)}
              disabled={isDisabled}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-left transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1 ${
                isChecked
                  ? "bg-blue-50 ring-1 ring-blue-300"
                  : isDisabled
                  ? "bg-slate-50 opacity-50 cursor-not-allowed"
                  : "border border-slate-200 bg-white hover:border-slate-300 cursor-pointer"
              }`}
            >
              {/* Checkbox visual */}
              <div className={`w-5 h-5 rounded-md flex-shrink-0 flex items-center justify-center transition-all ${
                isChecked
                  ? "bg-blue-600 border-blue-600"
                  : "border-2 border-slate-300 bg-white"
              }`}>
                {isChecked && (
                  <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <span className={`text-sm font-medium ${isChecked ? "text-blue-700" : "text-slate-600"}`}>
                {opt.icon && <span className="mr-1">{opt.icon}</span>}
                {optLabel}
              </span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

// =============================================================================
// 8. REPEATER INPUT — Dynamic rows with add/remove
// =============================================================================
export function RepeaterInput({ 
  input, 
  value, 
  onChange,
  onBlur: onBlurProp,
  t,
  validation
}: { 
  input: InputConfig; 
  value: unknown; 
  onChange: (v: unknown) => void;
  onBlur?: () => void;
  t: TranslationFn;
  validation?: ValidationResult;
}) {
  const label = t("inputs." + input.id + ".label", input.label);
  const helpText = input.helpText ? t("inputs." + input.id + ".helpText", input.helpText) : "";
  const fields = input.repeaterFields || [];
  const maxRows = input.maxRows ?? 20;
  const minRows = input.minRows ?? 1;
  const addLabel = t("inputs." + input.id + ".addButton", input.addButtonLabel || "+ Add Row");
  const isError = validation && !validation.isValid;

  // Parse rows
  const rows: Record<string, unknown>[] = Array.isArray(value) ? value : [];
  
  // Initialize with minimum rows if empty
  useEffect(() => {
    if (rows.length < minRows) {
      const newRows = [...rows];
      while (newRows.length < minRows) {
        const emptyRow: Record<string, unknown> = {};
        fields.forEach(f => { emptyRow[f.id] = f.defaultValue ?? null; });
        newRows.push(emptyRow);
      }
      onChange(newRows);
    }
  }, []);

  const addRow = () => {
    if (rows.length >= maxRows) return;
    const emptyRow: Record<string, unknown> = {};
    fields.forEach(f => { emptyRow[f.id] = f.defaultValue ?? null; });
    onChange([...rows, emptyRow]);
  };

  const removeRow = (index: number) => {
    if (rows.length <= minRows) return;
    const newRows = rows.filter((_, i) => i !== index);
    onChange(newRows);
    onBlurProp?.();
  };

  const updateField = (rowIndex: number, fieldId: string, fieldValue: unknown) => {
    const newRows = rows.map((row, i) => {
      if (i !== rowIndex) return row;
      return { ...row, [fieldId]: fieldValue };
    });
    onChange(newRows);
  };

  return (
    <div className="space-y-2 w-full">
      <div className="flex items-baseline justify-between mb-1">
        <label className="block font-medium text-slate-700 text-sm">
          {label}
          {input.required && <span className="text-red-500 ml-1" aria-hidden="true">*</span>}
        </label>
        <span className="text-xs text-slate-400">
          {rows.length}/{maxRows}
        </span>
      </div>
      {helpText && <p className="text-xs text-slate-400 mb-1">{helpText}</p>}

      {/* Column headers (only if more than 1 field) */}
      {fields.length > 1 && rows.length > 0 && (
        <div className="flex items-center gap-2 px-1">
          <div className="w-6 flex-shrink-0" /> {/* Space for row number */}
          <div className="flex-1 grid gap-2" style={{ gridTemplateColumns: fields.map(() => "1fr").join(" ") }}>
            {fields.map(f => (
              <span key={f.id} className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider truncate">
                {t("inputs." + input.id + ".fields." + f.id + ".label", f.label || f.id)}
              </span>
            ))}
          </div>
          <div className="w-8 flex-shrink-0" /> {/* Space for delete btn */}
        </div>
      )}

      {/* Rows */}
      <div className="space-y-2">
        {rows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="flex items-center gap-2 group"
          >
            {/* Row number */}
            <span className="text-xs text-slate-300 font-bold w-6 text-center flex-shrink-0">
              {rowIndex + 1}
            </span>
            
            {/* Fields */}
            <div 
              className="flex-1 bg-white border border-slate-200 rounded-lg px-2 py-1.5 grid gap-2 items-center hover:border-slate-300 transition-colors"
              style={{ gridTemplateColumns: fields.map(() => "1fr").join(" ") }}
            >
              {fields.map((field) => {
                const fieldValue = row[field.id];
                const fieldLabel = t("inputs." + input.id + ".fields." + field.id + ".label", field.label || field.id);
                
                if (field.type === "select" && field.options) {
                  return (
                    <select
                      key={field.id}
                      value={(fieldValue as string) || ""}
                      onChange={(e) => updateField(rowIndex, field.id, e.target.value)}
                      className="bg-transparent rounded-lg px-2 py-2 text-sm text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-400 cursor-pointer"
                      aria-label={fieldLabel}
                    >
                      <option value="">{fieldLabel}</option>
                      {field.options.map(opt => (
                        <option key={opt.value} value={opt.value}>
                          {t("inputs." + input.id + ".fields." + field.id + ".options." + opt.value, opt.label)}
                        </option>
                      ))}
                    </select>
                  );
                }

                if (field.type === "number") {
                  return (
                    <div key={field.id} className="flex items-center">
                      {field.prefix && <span className="text-xs text-slate-400 mr-1">{field.prefix}</span>}
                      <input
                        type="text"
                        inputMode="decimal"
                        value={fieldValue !== null && fieldValue !== undefined ? String(fieldValue) : ""}
                        onChange={(e) => {
                          const raw = e.target.value;
                          const num = Number(raw.replace(/,/g, ""));
                          if (raw === "" || raw === "-") {
                            updateField(rowIndex, field.id, null);
                          } else if (!isNaN(num)) {
                            updateField(rowIndex, field.id, num);
                          }
                        }}
                        onBlur={onBlurProp}
                        placeholder={field.placeholder || "0"}
                        className="w-full bg-transparent rounded-lg px-2 py-2 text-sm text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-400 placeholder:text-slate-300"
                        aria-label={fieldLabel}
                      />
                      {field.suffix && <span className="text-xs text-slate-400 ml-1 flex-shrink-0">{field.suffix}</span>}
                    </div>
                  );
                }

                // Default: text
                return (
                  <input
                    key={field.id}
                    type="text"
                    value={(fieldValue as string) || ""}
                    onChange={(e) => updateField(rowIndex, field.id, e.target.value)}
                    onBlur={onBlurProp}
                    placeholder={field.placeholder || fieldLabel}
                    className="w-full bg-transparent rounded-lg px-2 py-2 text-sm text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-400 placeholder:text-slate-300"
                    aria-label={fieldLabel}
                  />
                );
              })}
            </div>

            {/* Delete button */}
            <button
              type="button"
              onClick={() => removeRow(rowIndex)}
              disabled={rows.length <= minRows}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 disabled:opacity-0 disabled:cursor-not-allowed flex-shrink-0"
              aria-label={`Remove row ${rowIndex + 1}`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      {/* Add Row button */}
      {rows.length < maxRows && (
        <button
          type="button"
          onClick={addRow}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border-2 border-dashed border-slate-200 text-slate-400 text-sm font-medium hover:border-blue-300 hover:text-blue-500 hover:bg-blue-50/30 transition-all focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
            <path strokeLinecap="round" d="M12 5v14M5 12h14" />
          </svg>
          {addLabel}
        </button>
      )}

      {/* Validation */}
      {validation && !validation.isValid && validation.message && (
        <div className="flex items-center gap-1.5 text-xs text-red-600">
          <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <span>{validation.message}</span>
        </div>
      )}
    </div>
  );
}
