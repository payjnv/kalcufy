'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';

interface RelatedCalculator {
  slug: string;
  title?: string;
  category?: string;
  icon?: string;
}

interface RelatedCalculatorsProps {
  calculators?: RelatedCalculator[];
  title?: string;
}

export function RelatedCalculators({ calculators, title }: RelatedCalculatorsProps) {
  const locale = useLocale();
  
  const sectionTitle = title || 'Related Calculators';
  
  // Filter out invalid calculators
  const validCalculators = (calculators || []).filter(calc => calc && calc.slug);
  
  if (validCalculators.length === 0) {
    return null;
  }

  const getCategoryColor = (category?: string) => {
    const colors: Record<string, string> = {
      finance: 'bg-blue-100 text-blue-700',
      health: 'bg-emerald-100 text-emerald-700',
      math: 'bg-purple-100 text-purple-700',
      everyday: 'bg-orange-100 text-orange-700',
    };
    return colors[category || ''] || 'bg-slate-100 text-slate-700';
  };

  const getDefaultIcon = (category?: string) => {
    const icons: Record<string, string> = {
      finance: '💰',
      health: '❤️',
      math: '🔢',
      everyday: '📅',
    };
    return icons[category || ''] || '📊';
  };
  
  const formatTitle = (calc: RelatedCalculator) => {
    if (calc.title) return calc.title;
    // Convert slug to title: "bmi-calculator" -> "Bmi Calculator"
    return calc.slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <section className="py-8" aria-labelledby="related-heading">
      <h2 id="related-heading" className="text-2xl font-bold text-slate-900 mb-6">
        {sectionTitle}
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {validCalculators.map((calc) => (
          <Link
            key={calc.slug}
            href={`/${locale}/calc/${calc.slug}`}
            className="group p-4 bg-white border border-slate-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all"
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl" role="img" aria-hidden="true">
                {calc.icon || getDefaultIcon(calc.category)}
              </span>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                  {formatTitle(calc)}
                </h3>
                <span className={`inline-block mt-1 px-2 py-0.5 text-xs font-medium rounded-full ${getCategoryColor(calc.category)}`}>
                  {calc.category || 'calculator'}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default RelatedCalculators;
