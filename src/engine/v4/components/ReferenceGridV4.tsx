"use client";

/**
 * ReferenceGridV4 - Grid de datos de referencia
 * Diseño idéntico a V3, lee traducciones directamente
 */

interface ReferenceItem {
  label: string;
  value: string;
  highlight?: boolean;
}

interface ReferenceGridV4Props {
  refId: string;
  title: string;
  items: ReferenceItem[];
  icon?: string;
  columns?: 2 | 3 | 4;
  highlightValue?: string;
}

export default function ReferenceGridV4({ 
  refId,
  title, 
  items, 
  icon,
  columns = 2,
  highlightValue
}: ReferenceGridV4Props) {
  const normalizedItems = Array.isArray(items) ? items : Object.values(items || {});
  if (!normalizedItems || normalizedItems.length === 0) return null;

  const gridCols: Record<number, string> = {
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-4',
  };

  return (
    <div 
      className="bg-white rounded-2xl border border-slate-200 p-5"
      role="region"
      aria-labelledby={`reference-${refId}`}
    >
      <h3 
        id={`reference-${refId}`}
        className="font-bold text-slate-900 mb-4 flex items-center gap-2"
      >
        {icon && <span aria-hidden="true">{icon}</span>}
        {title}
      </h3>
      <div className={`grid ${gridCols[columns]} gap-3`}>
        {normalizedItems.map((item, index) => {
          const isHighlighted = highlightValue && item.value === highlightValue;
          return (
            <div 
              key={index} 
              className={`flex justify-between items-center rounded-lg px-3 py-2.5 transition-colors ${
                isHighlighted 
                  ? 'bg-blue-100 border border-blue-300' 
                  : 'bg-slate-50 hover:bg-slate-100'
              }`}
            >
              <span className={`text-sm ${isHighlighted ? 'text-blue-700' : 'text-slate-600'}`}>
                {item.label}
              </span>
              <span className={`font-semibold text-sm ${isHighlighted ? 'text-blue-800' : 'text-slate-800'}`}>
                = {item.value}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
