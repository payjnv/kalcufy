"use client";

/**
 * ConsiderationsListV4 - Lista de consideraciones/advertencias
 * Diseño idéntico a V3, lee traducciones directamente
 */

interface ListItem {
  text: string;
  type?: 'warning' | 'info' | 'success' | 'error';
}

interface ConsiderationsListV4Props {
  sectionId: string;
  title: string;
  items: ListItem[];
  icon?: string;
}

const TYPE_ICONS: Record<string, string> = {
  warning: "⚠️",
  info: "ℹ️",
  success: "✅",
  error: "❌",
};

const TYPE_COLORS: Record<string, string> = {
  warning: "bg-amber-50 border-amber-200 text-amber-800",
  info: "bg-blue-50 border-blue-200 text-blue-800",
  success: "bg-green-50 border-green-200 text-green-800",
  error: "bg-red-50 border-red-200 text-red-800",
};

export default function ConsiderationsListV4({ 
  sectionId, 
  title, 
  items, 
  icon 
}: ConsiderationsListV4Props) {
  if (!items || items.length === 0) return null;

  return (
    <div 
      className="bg-white rounded-2xl border border-slate-200 p-6"
      role="region"
      aria-labelledby={`considerations-${sectionId}`}
    >
      <h3 
        id={`considerations-${sectionId}`}
        className="text-lg font-bold text-slate-900 mb-4"
      >
        {icon && <span aria-hidden="true">{icon} </span>}
        {title}
      </h3>
      <ul className="space-y-2" role="list">
        {items.map((item, index) => {
          const itemType = item.type || 'info';
          return (
            <li 
              key={index} 
              className={`flex items-start gap-3 p-3 rounded-lg border ${TYPE_COLORS[itemType]}`}
            >
              <span className="flex-shrink-0 text-lg" aria-hidden="true">
                {TYPE_ICONS[itemType]}
              </span>
              <span className="text-sm leading-relaxed">{item.text}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
