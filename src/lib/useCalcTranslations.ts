"use client";
import { useState, useEffect, useMemo } from 'react';

type TranslationData = {
  [key: string]: unknown;
  faq?: Array<{ question: string; answer: string }>;
};

export function useCalcTranslations(locale: string, calculatorSlug: string) {
  const [translations, setTranslations] = useState<TranslationData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    
    async function loadTranslations() {
      try {
        // Remove "-calculator" suffix for filename
        const filename = calculatorSlug.replace('-calculator', '');
        
        let data = null;
        
        // Try to load locale-specific translations first
        try {
          const module = await import(`@/messages/calculators/${locale}/${filename}.json`);
          data = module.default || module;
        } catch {
          // Fallback to English if locale not found
          if (locale !== 'en') {
            try {
              const module = await import(`@/messages/calculators/en/${filename}.json`);
              data = module.default || module;
            } catch {
              data = null;
            }
          }
        }
        
        if (!cancelled) {
          setTranslations(data);
        }
      } catch (error) {
        console.error('Failed to load translations:', error);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    
    loadTranslations();
    
    return () => { cancelled = true; };
  }, [locale, calculatorSlug]);

  // Memoize the t function to prevent re-renders
  const t = useMemo(() => {
    return (key: string, fallback?: string): string => {
      if (!translations) return fallback || key;
      
      const keys = key.split('.');
      let value: unknown = translations;
      
      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = (value as Record<string, unknown>)[k];
        } else {
          return fallback || key;
        }
      }
      
      return typeof value === 'string' ? value : (fallback || key);
    };
  }, [translations]);

  return { t, translations, loading };
}
