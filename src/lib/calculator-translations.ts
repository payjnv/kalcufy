// Helper to load calculator-specific translations
export async function getCalculatorTranslations(
  locale: string,
  calculator: string
) {
  try {
    const translations = await import(
      `@/messages/calculators/${locale}/${calculator}.json`
    );
    return translations.default;
  } catch {
    // Fallback to English if translation not found
    try {
      const fallback = await import(
        `@/messages/calculators/en/${calculator}.json`
      );
      return fallback.default;
    } catch {
      return null;
    }
  }
}

// For client components - synchronous version
export function useCalculatorTranslations(
  translations: Record<string, unknown>
) {
  const t = (key: string) => {
    const keys = key.split('.');
    let value: unknown = translations;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        return key; // Return key if not found
      }
    }
    
    return typeof value === 'string' ? value : key;
  };
  
  return { t };
}
