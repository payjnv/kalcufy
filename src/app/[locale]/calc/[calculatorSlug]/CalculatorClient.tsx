'use client';

import { CalculatorEngine } from '@/engine/CalculatorEngine';
import { getCalculator, getRelatedCalculators } from '@/config/calculators';

interface CalculatorClientProps {
  calculatorSlug: string;
}

export default function CalculatorClient({ calculatorSlug }: CalculatorClientProps) {
  const calculator = getCalculator(calculatorSlug);
  
  if (!calculator) {
    return <div className="container py-20 text-center">Calculator not found</div>;
  }
  
  const { config, calculate } = calculator;
  
  const relatedCalcs = getRelatedCalculators(calculatorSlug, 4);
  const relatedCalculators = relatedCalcs
    .filter(rc => rc && rc.slug)
    .map(rc => ({
      slug: rc.slug,
      title: rc.seo?.title || rc.slug.replace(/-/g, ' '),
      category: rc.category || 'finance',
      icon: rc.icon || '📊',
    }));
  
  return (
    <CalculatorEngine
      config={config}
      calculate={calculate}
      relatedCalculators={relatedCalculators}
    />
  );
}
