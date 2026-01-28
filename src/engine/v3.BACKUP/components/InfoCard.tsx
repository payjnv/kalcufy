"use client";

interface InfoItem {
  label: string;
  value?: string;
  icon?: string;
  color?: 'default' | 'green' | 'blue' | 'amber' | 'red';
}

interface InfoCardProps {
  title: string;
  icon?: string;
  items: InfoItem[];
  layout?: 'list' | 'grid' | 'horizontal';
  columns?: 1 | 2 | 3 | 4;
  className?: string;
}

export default function InfoCard({
  title,
  icon,
  items,
  layout = 'list',
  columns = 1,
  className = "",
}: InfoCardProps) {
  if (!items || items.length === 0) return null;

  const colorClasses: Record<string, string> = {
    default: "text-slate-600",
    green: "text-green-600",
    blue: "text-blue-600",
    amber: "text-amber-600",
    red: "text-red-600",
  };

  // List layout (like Latin Honors)
  if (layout === 'list') {
    return (
      <div className={`bg-white rounded-2xl border border-slate-200 p-5 ${className}`}>
        <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
          {icon && <span>{icon}</span>}
          {title}
        </h3>
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li key={index} className="flex justify-between items-center">
              <span className="text-slate-600 flex items-center gap-2">
                {item.icon && <span>{item.icon}</span>}
                {item.label}
              </span>
              {item.value && (
                <span className={`font-medium ${colorClasses[item.color || 'default']}`}>
                  {item.value}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  // Grid layout
  if (layout === 'grid') {
    const gridCols: Record<number, string> = {
      1: "grid-cols-1",
      2: "grid-cols-2",
      3: "grid-cols-3",
      4: "grid-cols-4",
    };

    return (
      <div className={`bg-white rounded-2xl border border-slate-200 p-5 ${className}`}>
        <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
          {icon && <span>{icon}</span>}
          {title}
        </h3>
        <div className={`grid ${gridCols[columns]} gap-3`}>
          {items.map((item, index) => (
            <div key={index} className="bg-slate-50 rounded-lg p-3 text-center">
              {item.icon && <span className="block text-2xl mb-1">{item.icon}</span>}
              <p className="font-medium text-slate-800">{item.label}</p>
              {item.value && (
                <p className={`text-sm ${colorClasses[item.color || 'default']}`}>
                  {item.value}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Horizontal layout (like Tips with checkmarks)
  if (layout === 'horizontal') {
    return (
      <div className={`bg-white rounded-2xl border border-slate-200 p-5 ${className}`}>
        <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
          {icon && <span>{icon}</span>}
          {title}
        </h3>
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-slate-600">
              <span className="text-blue-500 mt-0.5 flex-shrink-0">
                {item.icon || "✓"}
              </span>
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return null;
}
