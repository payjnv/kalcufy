/**
 * DATE LOCALIZATION HELPER FOR V4 CALCULATORS
 * 
 * Use this in your calculate() function to format dates with translations.
 * 
 * Usage in config:
 * 
 * // In translations:
 * t: {
 *   en: {
 *     months: {
 *       january: "January",
 *       february: "February",
 *       // ... etc
 *     },
 *     summaryTemplate: "Loan payoff: {payoffDate}",
 *   },
 *   es: {
 *     months: {
 *       january: "Enero",
 *       february: "Febrero",
 *       // ... etc
 *     },
 *     summaryTemplate: "Liquidación: {payoffDate}",
 *   }
 * }
 * 
 * // In calculate():
 * const payoffDate = formatLocalizedDate(payoffDateObj, translations.months);
 * const summary = translations.summaryTemplate.replace('{payoffDate}', payoffDate);
 */

// Month keys for translations
export const MONTH_KEYS = [
  'january', 'february', 'march', 'april', 'may', 'june',
  'july', 'august', 'september', 'october', 'november', 'december'
] as const;

// Default English months (fallback)
export const MONTHS_EN: Record<string, string> = {
  january: 'January',
  february: 'February',
  march: 'March',
  april: 'April',
  may: 'May',
  june: 'June',
  july: 'July',
  august: 'August',
  september: 'September',
  october: 'October',
  november: 'November',
  december: 'December',
};

// Spanish months
export const MONTHS_ES: Record<string, string> = {
  january: 'Enero',
  february: 'Febrero',
  march: 'Marzo',
  april: 'Abril',
  may: 'Mayo',
  june: 'Junio',
  july: 'Julio',
  august: 'Agosto',
  september: 'Septiembre',
  october: 'Octubre',
  november: 'Noviembre',
  december: 'Diciembre',
};

// Portuguese months
export const MONTHS_PT: Record<string, string> = {
  january: 'Janeiro',
  february: 'Fevereiro',
  march: 'Março',
  april: 'Abril',
  may: 'Maio',
  june: 'Junho',
  july: 'Julho',
  august: 'Agosto',
  september: 'Setembro',
  october: 'Outubro',
  november: 'Novembro',
  december: 'Dezembro',
};

// French months
export const MONTHS_FR: Record<string, string> = {
  january: 'Janvier',
  february: 'Février',
  march: 'Mars',
  april: 'Avril',
  may: 'Mai',
  june: 'Juin',
  july: 'Juillet',
  august: 'Août',
  september: 'Septembre',
  october: 'Octobre',
  november: 'Novembre',
  december: 'Décembre',
};

// German months
export const MONTHS_DE: Record<string, string> = {
  january: 'Januar',
  february: 'Februar',
  march: 'März',
  april: 'April',
  may: 'Mai',
  june: 'Juni',
  july: 'Juli',
  august: 'August',
  september: 'September',
  october: 'Oktober',
  november: 'November',
  december: 'Dezember',
};

// All months by locale
export const MONTHS_BY_LOCALE: Record<string, Record<string, string>> = {
  en: MONTHS_EN,
  es: MONTHS_ES,
  pt: MONTHS_PT,
  fr: MONTHS_FR,
  de: MONTHS_DE,
};

/**
 * Format a date using localized month names
 * 
 * @param date - Date object or { month: number, year: number }
 * @param months - Month translations object from t.months
 * @returns Formatted date string like "January 2031" or "Enero 2031"
 */
export function formatLocalizedDate(
  date: Date | { month: number; year: number },
  months?: Record<string, string>
): string {
  const monthIndex = date instanceof Date ? date.getMonth() : date.month;
  const year = date instanceof Date ? date.getFullYear() : date.year;
  
  const monthKey = MONTH_KEYS[monthIndex];
  const monthName = months?.[monthKey] || MONTHS_EN[monthKey];
  
  return `${monthName} ${year}`;
}

/**
 * Calculate payoff date from today
 * 
 * @param months - Number of months until payoff
 * @param monthTranslations - Month translations from t.months
 * @returns Formatted payoff date
 */
export function calculatePayoffDate(
  months: number,
  monthTranslations?: Record<string, string>
): string {
  const today = new Date();
  const payoffDate = new Date(today.getFullYear(), today.getMonth() + months, 1);
  return formatLocalizedDate(payoffDate, monthTranslations);
}

/**
 * Generate summary using template and values
 * 
 * @param template - Summary template with {placeholders}
 * @param values - Object with values to replace placeholders
 * @returns Formatted summary string
 * 
 * @example
 * const summary = generateSummary(
 *   "Your payment is {payment} for {months} months. Payoff: {payoffDate}.",
 *   { payment: "$500", months: "60", payoffDate: "Enero 2031" }
 * );
 */
export function generateSummary(
  template: string,
  values: Record<string, string | number>
): string {
  let result = template;
  for (const [key, value] of Object.entries(values)) {
    result = result.replace(new RegExp(`\\{${key}\\}`, 'g'), String(value));
  }
  return result;
}
