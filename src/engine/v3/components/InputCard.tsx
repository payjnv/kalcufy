"use client";

import { useState, useEffect, useId } from "react";
import type { InputConfig, InputGroup, TranslationFn, DynamicListItem } from "../types/engine.types";
import DynamicListInput from "./DynamicListInput";

interface InputCardProps {
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
}

// ─────────────────────────────────────────────────────────────────────────────
// SELECT INPUT
// ─────────────────────────────────────────────────────────────────────────────
function SelectInput({ input, value, onChange, errorId, t }: { input: InputConfig; value: string; onChange: (v: string) => void; errorId?: string; t: TranslationFn }) {
  const options = input.options || [];
  const label = t("inputs." + input.id + ".label", input.label);
  
  return (
    <div>
      <label htmlFor={input.id} className="block font-medium text-slate-700 mb-2">
        {label}
        {input.required && <span className="text-red-500 ml-1" aria-hidden="true">*</span>}
        {input.required && <span className="sr-only">(required)</span>}
      </label>
      <div className="relative">
        <select
          id={input.id}
          value={value || input.defaultValue || ""}
          onChange={(e) => onChange(e.target.value)}
          required={input.required}
          aria-required={input.required}
          aria-invalid={!!errorId}
          aria-describedby={errorId}
          className="w-full bg-slate-100 rounded-lg px-4 py-3 pr-10 font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 appearance-none cursor-pointer"
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {t("inputs." + input.id + ".options." + opt.value, opt.label)}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SLIDER INPUT
// ─────────────────────────────────────────────────────────────────────────────
function SliderInput({ input, value, onChange, errorId, t, unitSystem }: { input: InputConfig; value: number; onChange: (v: number) => void; errorId?: string; t: TranslationFn; unitSystem?: "metric" | "imperial" }) {
  const label = t("inputs." + input.id + ".label", input.label);
  
  // Get suffix from unitOptions if available, otherwise use static suffix
  const unitOpts = (input as any).unitOptions;
  const currentUnitOpts = unitOpts && unitSystem ? unitOpts[unitSystem] : null;
  const suffix = currentUnitOpts?.suffix 
    ? t("inputs." + input.id + ".suffix", currentUnitOpts.suffix) 
    : (input.suffix ? t("inputs." + input.id + ".suffix", input.suffix) : "");
  
  const prefix = (input as any).prefix ? t("inputs." + input.id + ".prefix", (input as any).prefix) : "";
  
  // Get min/max from unitOptions if available
  const minVal = currentUnitOpts?.min ?? input.min ?? 0;
  const maxVal = currentUnitOpts?.max ?? input.max ?? 100;
  
  // Use local state for free editing
  const [displayValue, setDisplayValue] = useState<string>(() => String(value ?? minVal));
  const [isFocused, setIsFocused] = useState(false);
  
  // Sync from parent when not focused
  useEffect(() => {
    if (!isFocused && value !== undefined && value !== null && !isNaN(value)) {
      setDisplayValue(String(value));
    }
  }, [value, isFocused]);
  
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
    const num = Number(displayValue);
    if (displayValue === "" || isNaN(num)) {
      const defaultVal = (input.defaultValue as number) ?? minVal;
      setDisplayValue(String(defaultVal));
      onChange(defaultVal);
    } else {
      // Clamp to min/max
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
  };
  
  return (
    <div role="group" aria-labelledby={"label-" + input.id}>
      <div className="flex justify-between items-center mb-2">
        <label id={"label-" + input.id} htmlFor={input.id} className="font-medium text-slate-700">
          {label}
          {input.required && <span className="text-red-500 ml-1" aria-hidden="true">*</span>}
          {input.required && <span className="sr-only">(required)</span>}
        </label>
        <div className="flex items-center bg-slate-100 rounded-lg px-3 py-1">
          {prefix && <span className="text-slate-600 mr-1">{prefix}</span>}
          <input
            type="text"
            inputMode="numeric"
            value={displayValue}
            onChange={handleTextChange}
            onFocus={() => setIsFocused(true)}
            onBlur={handleTextBlur}
            aria-label={label + " value"}
            className="w-16 text-right bg-transparent font-bold text-blue-600 focus:outline-none"
          />
          {suffix && <span className="text-slate-600 ml-1">{suffix}</span>}
        </div>
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
        className="range-slider-small w-full"
      />
      {/* FIX: Changed text-xs to text-sm for WCAG compliance (minimum 12px) */}
      <div className="flex justify-between text-sm text-slate-500 mt-1" aria-hidden="true">
        <span>{prefix}{minVal}{suffix}</span>
        <span>{prefix}{maxVal}{suffix}</span>
      </div>
      {/* FIX: Changed text-xs to text-sm for WCAG compliance */}
      {input.helpText && <p className="text-sm text-slate-500 mt-1">{t("inputs." + input.id + ".helpText", input.helpText)}</p>}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// NUMBER INPUT
// ─────────────────────────────────────────────────────────────────────────────
function NumberInput({ input, value, onChange, errorId, t, unitSystem }: { input: InputConfig; value: number; onChange: (v: number) => void; errorId?: string; t: TranslationFn; unitSystem?: "metric" | "imperial" }) {
  const label = t("inputs." + input.id + ".label", input.label);
  
  // Get suffix from unitOptions if available, otherwise use static suffix
  const unitOpts = (input as any).unitOptions;
  const currentUnitOpts = unitOpts && unitSystem ? unitOpts[unitSystem] : null;
  const suffix = currentUnitOpts?.suffix 
    ? t("inputs." + input.id + ".suffix", currentUnitOpts.suffix) 
    : (input.suffix ? t("inputs." + input.id + ".suffix", input.suffix) : "");
  
  const prefix = (input as any).prefix ? t("inputs." + input.id + ".prefix", (input as any).prefix) : "";
  
  // Get min/max from unitOptions if available
  const minVal = currentUnitOpts?.min ?? input.min;
  const maxVal = currentUnitOpts?.max ?? input.max;
  
  // Use local state for free editing
  const [displayValue, setDisplayValue] = useState<string>(() => String(value ?? 0));
  const [isFocused, setIsFocused] = useState(false);
  
  // Sync from parent when not focused
  useEffect(() => {
    if (!isFocused && value !== undefined && value !== null && !isNaN(value)) {
      setDisplayValue(String(value));
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
    const num = Number(displayValue);
    if (displayValue === "" || isNaN(num)) {
      const defaultVal = (input.defaultValue as number) ?? 0;
      setDisplayValue(String(defaultVal));
      onChange(defaultVal);
    } else {
      // Clamp to min/max if defined
      let finalNum = num;
      if (minVal !== undefined && num < minVal) finalNum = minVal;
      if (maxVal !== undefined && num > maxVal) finalNum = maxVal;
      setDisplayValue(String(finalNum));
      onChange(finalNum);
    }
  };
  
  return (
    <div>
      <label htmlFor={input.id} className="block font-medium text-slate-700 mb-2">
        {label}
        {input.required && <span className="text-red-500 ml-1" aria-hidden="true">*</span>}
        {input.required && <span className="sr-only">(required)</span>}
      </label>
      <div className="relative flex items-center bg-slate-100 rounded-lg overflow-hidden">
        {prefix && (
          <span className="pl-4 text-slate-500 shrink-0">{prefix}</span>
        )}
        <input
          id={input.id}
          type="text"
          inputMode="decimal"
          value={displayValue}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          onBlur={handleBlur}
          required={input.required}
          aria-required={input.required}
          aria-invalid={!!errorId}
          aria-describedby={[errorId, input.helpText ? `help-${input.id}` : undefined].filter(Boolean).join(" ") || undefined}
          className={`flex-1 min-w-0 bg-transparent px-4 py-3 font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg ${prefix ? "pl-1" : ""}`}
        />
        {suffix && (
          <span className="pr-4 text-slate-500 shrink-0 truncate max-w-[60px]">{suffix}</span>
        )}
      </div>
      {/* FIX: Changed text-xs to text-sm for WCAG compliance */}
      {input.helpText && <p id={`help-${input.id}`} className="text-sm text-slate-500 mt-1">{t("inputs." + input.id + ".helpText", input.helpText)}</p>}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// RADIO INPUT
// ─────────────────────────────────────────────────────────────────────────────
function RadioInput({ input, value, onChange, errorId, t }: { input: InputConfig; value: string; onChange: (v: string) => void; errorId?: string; t: TranslationFn }) {
  const options = input.options || [];
  const label = t("inputs." + input.id + ".label", input.label);
  const groupId = `group-${input.id}`;
  
  return (
    <fieldset role="radiogroup" aria-labelledby={groupId}>
      <legend id={groupId} className="block font-medium text-slate-700 mb-3">
        {label}
        {input.required && <span className="text-red-500 ml-1" aria-hidden="true">*</span>}
        {input.required && <span className="sr-only">(required)</span>}
      </legend>
      <div className="flex gap-2">
        {options.map((opt) => {
          const isSelected = value === opt.value;
          const optionId = `${input.id}-${opt.value}`;
          return (
            <button
              key={opt.value}
              id={optionId}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onChange(opt.value)}
              className={`flex-1 py-3 px-3 rounded-lg text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 truncate ${
                isSelected
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {t("inputs." + input.id + ".options." + opt.value, opt.label)}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DATE INPUT
// ─────────────────────────────────────────────────────────────────────────────
function DateInput({ input, value, onChange, errorId, t }: { input: InputConfig; value: string; onChange: (v: string) => void; errorId?: string; t: TranslationFn }) {
  const label = t("inputs." + input.id + ".label", input.label);
  
  return (
    <div>
      <label htmlFor={input.id} className="block font-medium text-slate-700 mb-2">
        {label}
        {input.required && <span className="text-red-500 ml-1" aria-hidden="true">*</span>}
        {input.required && <span className="sr-only">(required)</span>}
      </label>
      <div className="relative">
        <input
          id={input.id}
          type="date"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          required={input.required}
          aria-required={input.required}
          aria-invalid={!!errorId}
          aria-describedby={errorId}
          className="w-full bg-slate-100 rounded-lg px-4 py-3 font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      </div>
      {/* FIX: Changed text-xs to text-sm for WCAG compliance */}
      {input.helpText && <p className="text-sm text-slate-500 mt-1">{t("inputs." + input.id + ".helpText", input.helpText)}</p>}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TEXT INPUT
// ─────────────────────────────────────────────────────────────────────────────
function TextInput({ input, value, onChange, errorId, t }: { input: InputConfig; value: string; onChange: (v: string) => void; errorId?: string; t: TranslationFn }) {
  const label = t("inputs." + input.id + ".label", input.label);
  const placeholder = input.placeholder ? t("inputs." + input.id + ".placeholder", input.placeholder) : "";
  
  return (
    <div>
      <label htmlFor={input.id} className="block font-medium text-slate-700 mb-2">
        {label}
        {input.required && <span className="text-red-500 ml-1" aria-hidden="true">*</span>}
        {input.required && <span className="sr-only">(required)</span>}
      </label>
      <input
        id={input.id}
        type="text"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={input.required}
        aria-required={input.required}
        aria-invalid={!!errorId}
        aria-describedby={errorId}
        className="w-full bg-slate-100 rounded-lg px-4 py-3 font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      />
      {/* FIX: Changed text-xs to text-sm for WCAG compliance */}
      {input.helpText && <p className="text-sm text-slate-500 mt-1">{t("inputs." + input.id + ".helpText", input.helpText)}</p>}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CHECKBOX INPUT
// ─────────────────────────────────────────────────────────────────────────────
function CheckboxInput({ input, value, onChange, errorId, t }: { input: InputConfig; value: boolean; onChange: (v: boolean) => void; errorId?: string; t: TranslationFn }) {
  const label = t("inputs." + input.id + ".label", input.label);
  
  return (
    <div className="flex items-start gap-3">
      <input
        id={input.id}
        type="checkbox"
        checked={value || false}
        onChange={(e) => onChange(e.target.checked)}
        aria-invalid={!!errorId}
        aria-describedby={errorId}
        className="mt-1 w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 focus:ring-offset-2"
      />
      <label htmlFor={input.id} className="text-slate-700">
        {label}
        {input.required && <span className="text-red-500 ml-1" aria-hidden="true">*</span>}
      </label>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// RENDER INPUT
// ─────────────────────────────────────────────────────────────────────────────
function RenderInput({ input, value, onChange, errorId, t, unitSystem }: { input: InputConfig; value: unknown; onChange: (v: unknown) => void; errorId?: string; t: TranslationFn; unitSystem?: "metric" | "imperial" }) {
  switch (input.type) {
    case "select":
      return <SelectInput input={input} value={value as string} onChange={onChange} errorId={errorId} t={t} />;
    case "slider":
      return <SliderInput input={input} value={value as number} onChange={onChange} errorId={errorId} t={t} unitSystem={unitSystem} />;
    case "number":
      return <NumberInput input={input} value={value as number} onChange={onChange} errorId={errorId} t={t} unitSystem={unitSystem} />;
    case "radio":
      return <RadioInput input={input} value={value as string} onChange={onChange} errorId={errorId} t={t} />;
    case "date":
      return <DateInput input={input} value={value as string} onChange={onChange} errorId={errorId} t={t} />;
    case "text":
      return <TextInput input={input} value={value as string} onChange={onChange} errorId={errorId} t={t} />;
    case "checkbox":
      return <CheckboxInput input={input} value={value as boolean} onChange={onChange} errorId={errorId} t={t} />;
    case "dynamic-list":
      return (
        <DynamicListInput
          input={input}
          value={value as DynamicListItem[]}
          onChange={onChange}
          t={t}
        />
      );
    default:
      return null;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN INPUT CARD COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function InputCard({
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
}: InputCardProps) {
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});
  const formId = useId();
  const unitSystemGroupId = useId();

  // Get grouped input IDs
  const groupedInputIds = new Set(inputGroups?.flatMap(g => ((g as any).inputs || (g as any).inputIds || [])) || []);
  
  // Filter main inputs (not in groups)
  const mainInputs = inputs.filter(i => !groupedInputIds.has(i.id));

  // ═══════════════════════════════════════════════════════════════════════════
  // FIX: Check if input should be visible based on showWhen condition
  // NOW ALSO CHECKS unitSystem as a special case!
  // ═══════════════════════════════════════════════════════════════════════════
  const shouldShowInput = (input: InputConfig): boolean => {
    const showWhen = (input as any).showWhen as { field: string; value: string | string[] } | undefined;
    if (!showWhen) return true;
    
    // Special case: unitSystem is a prop, not in values
    let fieldValue: unknown;
    if (showWhen.field === "unitSystem") {
      fieldValue = unitSystem;
    } else if (showWhen.field === "currentMode") {
      fieldValue = currentMode;
    } else {
      fieldValue = values[showWhen.field];
    }
    
    if (Array.isArray(showWhen.value)) {
      return showWhen.value.includes(fieldValue as string);
    }
    return fieldValue === showWhen.value;
  };

  const toggleGroup = (groupId: string) => {
    setExpandedGroups(prev => ({ ...prev, [groupId]: !prev[groupId] }));
  };

  // Render main inputs with width handling
  const renderMainInputs = () => {
    const visibleInputs = mainInputs.filter(shouldShowInput);
    const rendered: JSX.Element[] = [];
    let i = 0;
    
    while (i < visibleInputs.length) {
      const input = visibleInputs[i];
      const nextInput = visibleInputs[i + 1];
      const errorId = errors[input.id] ? "error-" + input.id : undefined;
      
      if (input.width === "half" && nextInput?.width === "half") {
        const nextErrorId = errors[nextInput.id] ? "error-" + nextInput.id : undefined;
        rendered.push(
          <div key={input.id} className="grid grid-cols-2 gap-4 overflow-hidden">
            <div className="min-w-0">
              <RenderInput input={input} value={values[input.id]} onChange={(v) => onChange(input.id, v)} errorId={errorId} t={t} unitSystem={unitSystem} />
              {errors[input.id] && <p id={errorId} className="text-red-500 text-sm mt-1" role="alert">{errors[input.id]}</p>}
            </div>
            <div className="min-w-0">
              <RenderInput input={nextInput} value={values[nextInput.id]} onChange={(v) => onChange(nextInput.id, v)} errorId={nextErrorId} t={t} unitSystem={unitSystem} />
              {errors[nextInput.id] && <p id={nextErrorId} className="text-red-500 text-sm mt-1" role="alert">{errors[nextInput.id]}</p>}
            </div>
          </div>
        );
        i += 2;
      } else {
        rendered.push(
          <div key={input.id}>
            <RenderInput input={input} value={values[input.id]} onChange={(v) => onChange(input.id, v)} errorId={errorId} t={t} unitSystem={unitSystem} />
            {errors[input.id] && <p id={errorId} className="text-red-500 text-sm mt-1" role="alert">{errors[input.id]}</p>}
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
      className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8"
      onSubmit={(e) => e.preventDefault()}
      noValidate
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-slate-900">
          {t("calculator.yourInformation", "Your Information")}
        </h2>
        <button 
          type="button"
          className="p-2 rounded-lg hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label={t("buttons.addToFavorites", "Add to favorites")}
        >
          <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>

      <div className="space-y-6">
        {/* Unit System Toggle - FIX: Changed from orphaned label to proper fieldset/legend */}
        {showUnitSystemToggle && unitSystemOptions && (
          <fieldset role="radiogroup" aria-labelledby={unitSystemGroupId}>
            <legend id={unitSystemGroupId} className="block font-medium text-slate-700 mb-2">
              {t("inputs.unitSystem", "Unit System")}
            </legend>
            <div className="grid grid-cols-2 gap-2">
              {unitSystemOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  role="radio"
                  aria-checked={unitSystem === opt.value}
                  onClick={() => onUnitSystemChange(opt.value as "metric" | "imperial")}
                  className={"py-3 px-4 rounded-lg text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 " +
                    (unitSystem === opt.value
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200")
                  }
                >
                  {t("inputs.unitSystem.options." + opt.value, opt.label)}
                </button>
              ))}
            </div>
          </fieldset>
        )}

        {/* Main Inputs */}
        {renderMainInputs()}

        {/* Input Groups (Collapsible) */}
        {inputGroups?.map((group) => {
          const groupInputs = inputs.filter(i => ((group as any).inputs || (group as any).inputIds || []).includes(i.id));
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
                    return (
                      <div key={input.id}>
                        <RenderInput input={input} value={values[input.id]} onChange={(v) => onChange(input.id, v)} errorId={errorId} t={t} unitSystem={unitSystem} />
                        {errors[input.id] && <p id={errorId} className="text-red-500 text-sm mt-1" role="alert">{errors[input.id]}</p>}
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
