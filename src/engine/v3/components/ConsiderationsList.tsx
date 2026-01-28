"use client";

import type { TranslationFn } from "../types/engine.types";

interface ConsiderationsItem {
  text: string;
  type?: "warning" | "info" | "success";
}

interface ConsiderationsListProps {
  title: string;
  icon?: string;
  items: ConsiderationsItem[];
  t: TranslationFn;
  sectionId?: string;
}

export default function ConsiderationsList({ title, icon, items, t, sectionId = "considerations" }: ConsiderationsListProps) {
  const htmlId = `considerations-${title.toLowerCase().replace(/\s+/g, '-')}`;
  
  // Get translated item text
  const getTranslatedItem = (item: ConsiderationsItem, index: number) => {
    return t(`education.${sectionId}.items.${index}.text`, item.text);
  };

  return (
    <div 
      className="bg-white rounded-2xl border border-slate-200 p-6"
      role="region"
      aria-labelledby={htmlId}
    >
      <h3 id={htmlId} className="text-lg font-bold text-slate-900 mb-4">
        {icon && <span aria-hidden="true">{icon} </span>}
        {title}
      </h3>
      <ul className="space-y-2 text-slate-600" role="list">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-2">
            <span 
              className={`mt-1 flex-shrink-0 ${
                item.type === "warning" ? "text-amber-500" : 
                item.type === "success" ? "text-green-500" : 
                "text-blue-500"
              }`}
              aria-hidden="true"
            >
              {item.type === "warning" ? "⚠" : item.type === "success" ? "✓" : "•"}
            </span>
            <span>{getTranslatedItem(item, index)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
