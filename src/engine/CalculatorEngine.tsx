'use client';

import { useState, useEffect, useCallback } from 'react';
import { CalculatorConfig } from '@/types/calculator.types';
import { InputRenderer } from './InputRenderer';
import { ResultRenderer } from './ResultRenderer';
import { HeroSection } from '@/components/calculator/HeroSection';
import { FAQSection } from '@/components/calculator/FAQSection';
import { EducationSection } from '@/components/calculator/EducationSection';
import { ExportButtons } from '@/components/calculator/ExportButtons';
import { RelatedCalculators } from '@/components/calculator/RelatedCalculators';

interface CalculatorEngineProps {
  config: CalculatorConfig;
  calculate: (data: { values: Record<string, unknown>; units?: Record<string, string> }) => {
    values: Record<string, unknown>;
    formatted: Record<string, string>;
    summary?: string;
    isValid: boolean;
  };
  relatedCalculators?: Array<{
    slug: string;
    title?: string;
    category?: string;
    icon?: string;
  }>;
}

export function CalculatorEngine({ config, calculate, relatedCalculators }: CalculatorEngineProps) {
  // Initialize data with default values from config
  const [data, setData] = useState<Record<string, unknown>>(() => {
    const initial: Record<string, unknown> = {};
    config.inputs?.forEach(input => {
      initial[input.id] = input.defaultValue ?? '';
    });
    return initial;
  });
  
  const [units, setUnits] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    config.inputs?.forEach(input => {
      if (input.defaultUnit) {
        initial[input.id] = input.defaultUnit;
      }
    });
    return initial;
  });
  
  const [results, setResults] = useState<Record<string, unknown> | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  // Handle input change
  const handleInputChange = useCallback((name: string, value: unknown) => {
    setData(prev => ({ ...prev, [name]: value }));
  }, []);

  // Auto-calculate when data changes
  useEffect(() => {
    if (config.features?.autoCalculate !== false) {
      const hasValues = Object.values(data).some(v => v !== '' && v !== null && v !== undefined);
      if (hasValues) {
        setIsCalculating(true);
        try {
          const result = calculate({ values: data, units });
          setResults(result);
        } catch (error) {
          console.error('Calculation error:', error);
        } finally {
          setIsCalculating(false);
        }
      }
    }
  }, [data, units, calculate, config.features?.autoCalculate]);

  // Manual calculate
  const handleCalculate = () => {
    setIsCalculating(true);
    try {
      const result = calculate({ values: data, units });
      setResults(result);
    } catch (error) {
      console.error('Calculation error:', error);
    } finally {
      setIsCalculating(false);
    }
  };

  // Reset
  const handleReset = () => {
    const initial: Record<string, unknown> = {};
    config.inputs?.forEach(input => {
      initial[input.id] = input.defaultValue ?? '';
    });
    setData(initial);
    setResults(null);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <HeroSection
        title={config.seo?.title || config.slug}
        subtitle={config.seo?.description}
        icon={config.icon}
        badge={config.category}
      />

      {/* Main Content */}
      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calculator Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Inputs Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Enter Your Information</h2>
              <InputRenderer
                config={config}
                data={data}
                onChange={handleInputChange}
              />
              
              {/* Buttons */}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleCalculate}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all"
                >
                  Calculate
                </button>
                <button
                  onClick={handleReset}
                  className="px-6 py-3 border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition-all"
                >
                  Reset
                </button>
              </div>
            </div>

            {/* Results Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Your Results</h2>
              <ResultRenderer
                results={results}
                config={config}
                isCalculating={isCalculating}
              />
              
              {/* Export Buttons */}
              {results && (
                <ExportButtons
                  calculatorSlug={config.slug}
                  data={data}
                  results={results}
                />
              )}
            </div>

            {/* Education Section */}
            {config.education && (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <EducationSection
                  title={config.education.title}
                  sections={config.education.sections}
                />
              </div>
            )}

            {/* FAQ Section */}
            {config.faqs && config.faqs.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <FAQSection faqs={config.faqs} />
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Ad Slot 1 */}
            <div className="bg-slate-100 rounded-2xl h-[250px] flex items-center justify-center text-slate-400">
              Ad Space
            </div>
            
            {/* Ad Slot 2 */}
            <div className="bg-slate-100 rounded-2xl h-[250px] flex items-center justify-center text-slate-400">
              Ad Space
            </div>
          </div>
        </div>

        {/* Related Calculators */}
        {relatedCalculators && relatedCalculators.length > 0 && (
          <div className="mt-12">
            <RelatedCalculators calculators={relatedCalculators} />
          </div>
        )}
      </div>
    </div>
  );
}

export default CalculatorEngine;
