"use client";
import { useState, useEffect } from 'react';

type TranslationData = {
  meta?: { title?: string; description?: string };
  calculator?: Record<string, unknown>;
  education?: { title?: string; sections?: Array<{ title: string; content: string }> };
  faq?: Array<{ question: string; answer: string }>;
};

export function useCalcTranslations(locale: string, calculatorSlug: string) {
  const [translations, setTranslations] = useState<TranslationData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTranslations() {
      try {
        const filename = calculatorSlug.replace('-calculator', '');
        
        let data;
        try {
          data = await import(`@/messages/calculators/${locale}/${filename}.json`);
        } catch {
          try {
            data = await import(`@/messages/calculators/en/${filename}.json`);
          } catch {
            data = null;
          }
        }
        setTranslations(data?.default || data);
      } catch (error) {
        console.error('Failed to load translations:', error);
        setTranslations(null);
      } finally {
        setLoading(false);
      }
    }

    loadTranslations();
  }, [locale, calculatorSlug]);

  const t = (key: string, fallback?: string): string => {
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

  return { t, translations, loading };
}
