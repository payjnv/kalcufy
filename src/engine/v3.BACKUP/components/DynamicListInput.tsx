"use client";

import type { InputConfig, DynamicListItem, DynamicListField, TranslationFn } from "../types/engine.types";

interface DynamicListInputProps {
  input: InputConfig;
  value: DynamicListItem[];
  onChange: (items: DynamicListItem[]) => void;
  t: TranslationFn;
}

export default function DynamicListInput({ input, value, onChange, t }: DynamicListInputProps) {
  const config = input.dynamicList;
  if (!config) return null;

  // Initialize items from value or defaultItems
  const items = Array.isArray(value) && value.length > 0 
    ? value 
    : config.defaultItems || [createNewItem()];
  
  const minItems = config.minItems || 1;
  const maxItems = config.maxItems || 20;
  const itemLabel = config.itemLabel || "Item";
  const layout = config.layout || "compact";

  function createNewItem(): DynamicListItem {
    const newItem: DynamicListItem = { 
      id: Date.now().toString(36) + Math.random().toString(36).substr(2, 5) 
    };
    config.fields.forEach(field => {
      newItem[field.id] = field.defaultValue ?? (field.type === "number" ? 0 : "");
    });
    return newItem;
  }

  const addItem = () => {
    if (items.length >= maxItems) return;
    onChange([...items, createNewItem()]);
  };

  const removeItem = (id: string) => {
    if (items.length <= minItems) return;
    onChange(items.filter(item => item.id !== id));
  };

  const updateItem = (id: string, fieldId: string, fieldValue: unknown) => {
    onChange(items.map(item => 
      item.id === id ? { ...item, [fieldId]: fieldValue } : item
    ));
  };

  const getWidthClass = (width?: string): string => {
    const widths: Record<string, string> = {
      xs: "w-12",
      sm: "w-16",
      md: "w-24",
      lg: "w-36",
      xl: "w-48",
      full: "flex-1 min-w-[120px]",
    };
    return widths[width || "full"] || "flex-1 min-w-[80px]";
  };

  const renderField = (field: DynamicListField, item: DynamicListItem, index: number) => {
    const fieldValue = item[field.id];
    const baseInputClass = "bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors";

    switch (field.type) {
      case "text":
        return (
          <input
            key={field.id}
            type="text"
            value={(fieldValue as string) || ""}
            onChange={(e) => updateItem(item.id, field.id, e.target.value)}
            placeholder={field.placeholder || field.label}
            className={`${getWidthClass(field.width)} px-3 py-2 ${baseInputClass}`}
            aria-label={`${itemLabel} ${index + 1} ${field.label}`}
          />
        );

      case "number":
        return (
          <div key={field.id} className={`${getWidthClass(field.width)} flex items-center gap-1`}>
            <input
              type="number"
              value={(fieldValue as number) ?? field.defaultValue ?? 0}
              onChange={(e) => updateItem(item.id, field.id, Number(e.target.value))}
              min={field.min}
              max={field.max}
              step={field.step || 1}
              className={`w-full px-2 py-2 text-center ${baseInputClass} [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
              aria-label={`${itemLabel} ${index + 1} ${field.label}`}
            />
            {field.suffix && (
              <span className="text-xs text-slate-500 whitespace-nowrap">{field.suffix}</span>
            )}
          </div>
        );

      case "select":
        return (
          <select
            key={field.id}
            value={(fieldValue as string) || field.defaultValue || ""}
            onChange={(e) => updateItem(item.id, field.id, e.target.value)}
            className={`${getWidthClass(field.width)} px-2 py-2 pr-8 ${baseInputClass} cursor-pointer`}
            aria-label={`${itemLabel} ${index + 1} ${field.label}`}
          >
            {field.options?.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        );

      case "checkbox":
        return (
          <label key={field.id} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={Boolean(fieldValue)}
              onChange={(e) => updateItem(item.id, field.id, e.target.checked)}
              className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-xs text-slate-600">{field.label}</span>
          </label>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-3">
      {/* Label */}
      <label className="block font-medium text-slate-700">
        {t(`inputs.${input.id}.label`, input.label)}
        {input.required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {/* Items */}
      <div className="space-y-2">
        {items.map((item, index) => (
          <div
            key={item.id}
            className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200"
          >
            {/* Item Number */}
            {config.showIndex !== false && (
              <span className="text-xs font-medium text-slate-400 w-5 flex-shrink-0 text-center">
                {index + 1}
              </span>
            )}

            {/* Fields Row */}
            <div className="flex items-center gap-2 flex-1 min-w-0 flex-wrap sm:flex-nowrap">
              {config.fields.map(field => renderField(field, item, index))}
            </div>

            {/* Remove Button */}
            <button
              type="button"
              onClick={() => removeItem(item.id)}
              disabled={items.length <= minItems}
              className={`p-1.5 rounded-lg transition-all flex-shrink-0 ${
                items.length <= minItems
                  ? "text-slate-300 cursor-not-allowed"
                  : "text-slate-400 hover:text-red-500 hover:bg-red-50"
              }`}
              aria-label={`Remove ${itemLabel} ${index + 1}`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      {/* Add Button */}
      {items.length < maxItems && (
        <button
          type="button"
          onClick={addItem}
          className="w-full py-2.5 border-2 border-dashed border-slate-300 rounded-xl text-slate-600 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-all flex items-center justify-center gap-2 font-medium"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          {t(`inputs.${input.id}.addButton`, config.addButtonLabel || `Add ${itemLabel}`)}
        </button>
      )}
    </div>
  );
}
