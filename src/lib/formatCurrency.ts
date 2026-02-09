// src/lib/formatCurrency.ts
// Helper para formatear moneda según el locale del usuario

type CurrencyConfig = {
  currency: string;
  symbol: string;
  locale: string;
};

// Mapeo de locale a configuración de moneda
const CURRENCY_BY_LOCALE: Record<string, CurrencyConfig> = {
  en: { currency: "USD", symbol: "$", locale: "en-US" },
  es: { currency: "EUR", symbol: "€", locale: "es-ES" },
  pt: { currency: "BRL", symbol: "R$", locale: "pt-BR" },
  fr: { currency: "EUR", symbol: "€", locale: "fr-FR" },
  "en-US": { currency: "USD", symbol: "$", locale: "en-US" },
  "en-GB": { currency: "GBP", symbol: "£", locale: "en-GB" },
  "es-MX": { currency: "MXN", symbol: "$", locale: "es-MX" },
  "pt-BR": { currency: "BRL", symbol: "R$", locale: "pt-BR" },
};

const DEFAULT_CONFIG: CurrencyConfig = {
  currency: "USD",
  symbol: "$",
  locale: "en-US",
};

export function getCurrencyConfig(locale: string): CurrencyConfig {
  return CURRENCY_BY_LOCALE[locale] || CURRENCY_BY_LOCALE[locale.split("-")[0]] || DEFAULT_CONFIG;
}

export function formatCurrency(
  value: number,
  locale: string,
  options?: {
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
    showSymbol?: boolean;
  }
): string {
  const config = getCurrencyConfig(locale);
  const { minimumFractionDigits = 0, maximumFractionDigits = 2, showSymbol = true } = options || {};

  try {
    const formatter = new Intl.NumberFormat(config.locale, {
      style: showSymbol ? "currency" : "decimal",
      currency: showSymbol ? config.currency : undefined,
      minimumFractionDigits,
      maximumFractionDigits,
    });
    return formatter.format(value);
  } catch {
    const formatted = value.toFixed(maximumFractionDigits);
    return showSymbol ? `${config.symbol}${formatted}` : formatted;
  }
}

export function formatNumber(value: number, locale: string): string {
  const config = getCurrencyConfig(locale);
  return new Intl.NumberFormat(config.locale).format(value);
}

export function formatPercent(value: number, locale: string): string {
  const config = getCurrencyConfig(locale);
  return new Intl.NumberFormat(config.locale, { style: "percent", maximumFractionDigits: 2 }).format(value / 100);
}

export function getCurrencySymbol(locale: string): string {
  return getCurrencyConfig(locale).symbol;
}
