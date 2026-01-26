/**
 * Formatting Utilities
 * Centralized formatting functions for currency, numbers, percentages, dates, and units
 */

// ============================================================================
// CURRENCY FORMATTING
// ============================================================================

export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'BRL' | 'MXN' | 'ARS' | 'CLP' | 'COP';

interface CurrencyConfig {
  symbol: string;
  code: string;
  decimals: number;
  position: 'before' | 'after';
  thousandsSeparator: string;
  decimalSeparator: string;
}

const CURRENCY_CONFIGS: Record<CurrencyCode, CurrencyConfig> = {
  USD: { symbol: '$', code: 'USD', decimals: 2, position: 'before', thousandsSeparator: ',', decimalSeparator: '.' },
  EUR: { symbol: '€', code: 'EUR', decimals: 2, position: 'after', thousandsSeparator: '.', decimalSeparator: ',' },
  GBP: { symbol: '£', code: 'GBP', decimals: 2, position: 'before', thousandsSeparator: ',', decimalSeparator: '.' },
  BRL: { symbol: 'R$', code: 'BRL', decimals: 2, position: 'before', thousandsSeparator: '.', decimalSeparator: ',' },
  MXN: { symbol: '$', code: 'MXN', decimals: 2, position: 'before', thousandsSeparator: ',', decimalSeparator: '.' },
  ARS: { symbol: '$', code: 'ARS', decimals: 2, position: 'before', thousandsSeparator: '.', decimalSeparator: ',' },
  CLP: { symbol: '$', code: 'CLP', decimals: 0, position: 'before', thousandsSeparator: '.', decimalSeparator: ',' },
  COP: { symbol: '$', code: 'COP', decimals: 0, position: 'before', thousandsSeparator: '.', decimalSeparator: ',' },
};

/**
 * Format a number as currency
 */
export function formatCurrency(
  value: number,
  currency: CurrencyCode = 'USD',
  options?: {
    showCode?: boolean;
    compact?: boolean;
    locale?: string;
  }
): string {
  const config = CURRENCY_CONFIGS[currency];
  const { showCode = false, compact = false, locale } = options || {};

  // Use Intl.NumberFormat for locale-aware formatting
  if (locale) {
    try {
      const formatter = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: config.code,
        minimumFractionDigits: config.decimals,
        maximumFractionDigits: config.decimals,
        notation: compact ? 'compact' : 'standard',
      });
      return formatter.format(value);
    } catch (e) {
      // Fall back to manual formatting
    }
  }

  // Manual formatting
  let formatted: string;
  
  if (compact && Math.abs(value) >= 1000) {
    formatted = formatCompactNumber(value, config.decimals);
  } else {
    formatted = formatNumberWithSeparators(value, config.decimals, config.thousandsSeparator, config.decimalSeparator);
  }

  if (config.position === 'before') {
    return showCode ? `${config.symbol}${formatted} ${config.code}` : `${config.symbol}${formatted}`;
  } else {
    return showCode ? `${formatted} ${config.symbol} ${config.code}` : `${formatted} ${config.symbol}`;
  }
}

// ============================================================================
// NUMBER FORMATTING
// ============================================================================

/**
 * Format a number with thousands separators
 */
export function formatNumber(
  value: number,
  options?: {
    decimals?: number;
    locale?: string;
    compact?: boolean;
    showSign?: boolean;
  }
): string {
  const { decimals = 0, locale, compact = false, showSign = false } = options || {};

  if (locale) {
    try {
      const formatter = new Intl.NumberFormat(locale, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
        notation: compact ? 'compact' : 'standard',
        signDisplay: showSign ? 'always' : 'auto',
      });
      return formatter.format(value);
    } catch (e) {
      // Fall back to manual formatting
    }
  }

  let formatted = compact ? formatCompactNumber(value, decimals) : formatNumberWithSeparators(value, decimals);
  
  if (showSign && value > 0) {
    formatted = '+' + formatted;
  }

  return formatted;
}

/**
 * Format number with separators manually
 */
function formatNumberWithSeparators(
  value: number,
  decimals: number = 0,
  thousandsSeparator: string = ',',
  decimalSeparator: string = '.'
): string {
  const fixed = Math.abs(value).toFixed(decimals);
  const [intPart, decPart] = fixed.split('.');
  
  const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator);
  
  let result = decPart ? `${formattedInt}${decimalSeparator}${decPart}` : formattedInt;
  
  if (value < 0) {
    result = '-' + result;
  }
  
  return result;
}

/**
 * Format large numbers in compact form (1K, 1M, 1B)
 */
export function formatCompactNumber(value: number, decimals: number = 1): string {
  const absValue = Math.abs(value);
  const sign = value < 0 ? '-' : '';

  if (absValue >= 1e12) {
    return sign + (absValue / 1e12).toFixed(decimals) + 'T';
  } else if (absValue >= 1e9) {
    return sign + (absValue / 1e9).toFixed(decimals) + 'B';
  } else if (absValue >= 1e6) {
    return sign + (absValue / 1e6).toFixed(decimals) + 'M';
  } else if (absValue >= 1e3) {
    return sign + (absValue / 1e3).toFixed(decimals) + 'K';
  }
  
  return sign + absValue.toFixed(decimals);
}

// ============================================================================
// PERCENTAGE FORMATTING
// ============================================================================

/**
 * Format a number as percentage
 */
export function formatPercentage(
  value: number,
  options?: {
    decimals?: number;
    locale?: string;
    showSign?: boolean;
    multiply?: boolean; // true if value is decimal (0.15 -> 15%)
  }
): string {
  const { decimals = 1, locale, showSign = false, multiply = false } = options || {};
  
  const percentValue = multiply ? value * 100 : value;

  if (locale) {
    try {
      const formatter = new Intl.NumberFormat(locale, {
        style: 'percent',
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
        signDisplay: showSign ? 'always' : 'auto',
      });
      return formatter.format(multiply ? value : value / 100);
    } catch (e) {
      // Fall back to manual formatting
    }
  }

  let formatted = percentValue.toFixed(decimals) + '%';
  
  if (showSign && percentValue > 0) {
    formatted = '+' + formatted;
  }

  return formatted;
}

// ============================================================================
// DATE FORMATTING
// ============================================================================

export type DateFormat = 'short' | 'medium' | 'long' | 'full' | 'iso' | 'relative';

/**
 * Format a date
 */
export function formatDate(
  date: Date | string | number,
  format: DateFormat = 'medium',
  locale: string = 'en-US'
): string {
  const dateObj = date instanceof Date ? date : new Date(date);

  if (isNaN(dateObj.getTime())) {
    return 'Invalid date';
  }

  switch (format) {
    case 'iso':
      return dateObj.toISOString().split('T')[0];

    case 'relative':
      return formatRelativeDate(dateObj);

    case 'short':
      return new Intl.DateTimeFormat(locale, {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      }).format(dateObj);

    case 'medium':
      return new Intl.DateTimeFormat(locale, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }).format(dateObj);

    case 'long':
      return new Intl.DateTimeFormat(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(dateObj);

    case 'full':
      return new Intl.DateTimeFormat(locale, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(dateObj);

    default:
      return dateObj.toLocaleDateString(locale);
  }
}

/**
 * Format relative date (e.g., "2 days ago", "in 3 months")
 */
function formatRelativeDate(date: Date): string {
  const now = new Date();
  const diffMs = date.getTime() - now.getTime();
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Tomorrow';
  if (diffDays === -1) return 'Yesterday';

  const absDays = Math.abs(diffDays);
  const isFuture = diffDays > 0;

  if (absDays < 7) {
    return isFuture ? `In ${absDays} days` : `${absDays} days ago`;
  } else if (absDays < 30) {
    const weeks = Math.round(absDays / 7);
    return isFuture ? `In ${weeks} week${weeks > 1 ? 's' : ''}` : `${weeks} week${weeks > 1 ? 's' : ''} ago`;
  } else if (absDays < 365) {
    const months = Math.round(absDays / 30);
    return isFuture ? `In ${months} month${months > 1 ? 's' : ''}` : `${months} month${months > 1 ? 's' : ''} ago`;
  } else {
    const years = Math.round(absDays / 365);
    return isFuture ? `In ${years} year${years > 1 ? 's' : ''}` : `${years} year${years > 1 ? 's' : ''} ago`;
  }
}

// ============================================================================
// TIME FORMATTING
// ============================================================================

/**
 * Format duration in human-readable form
 */
export function formatDuration(
  totalSeconds: number,
  options?: {
    format?: 'short' | 'long' | 'colon';
    showZero?: boolean;
  }
): string {
  const { format = 'short', showZero = false } = options || {};

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  if (format === 'colon') {
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  const parts: string[] = [];

  if (hours > 0 || showZero) {
    parts.push(format === 'long' ? `${hours} hour${hours !== 1 ? 's' : ''}` : `${hours}h`);
  }
  if (minutes > 0 || showZero) {
    parts.push(format === 'long' ? `${minutes} minute${minutes !== 1 ? 's' : ''}` : `${minutes}m`);
  }
  if (seconds > 0 || (parts.length === 0)) {
    parts.push(format === 'long' ? `${seconds} second${seconds !== 1 ? 's' : ''}` : `${seconds}s`);
  }

  return parts.join(' ');
}

/**
 * Format time period (months/years)
 */
export function formatTimePeriod(
  months: number,
  options?: {
    format?: 'short' | 'long';
    showYears?: boolean;
  }
): string {
  const { format = 'short', showYears = true } = options || {};

  if (showYears && months >= 12) {
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;

    if (remainingMonths === 0) {
      return format === 'long' 
        ? `${years} year${years !== 1 ? 's' : ''}`
        : `${years}y`;
    }

    return format === 'long'
      ? `${years} year${years !== 1 ? 's' : ''} ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`
      : `${years}y ${remainingMonths}m`;
  }

  return format === 'long'
    ? `${months} month${months !== 1 ? 's' : ''}`
    : `${months}m`;
}

// ============================================================================
// RESULT VALUE FORMATTING
// ============================================================================

export type ResultFormatType = 'currency' | 'percentage' | 'number' | 'text' | 'date' | 'duration';

interface ResultFormatOptions {
  type: ResultFormatType;
  decimals?: number;
  currency?: CurrencyCode;
  locale?: string;
  prefix?: string;
  suffix?: string;
  compact?: boolean;
  showSign?: boolean;
}

/**
 * Universal result formatter
 * Used by ResultRenderer to format calculated values
 */
export function formatResultValue(
  value: number | string | Date,
  options: ResultFormatOptions
): string {
  const { type, decimals = 2, currency = 'USD', locale, prefix = '', suffix = '', compact = false, showSign = false } = options;

  let formatted: string;

  switch (type) {
    case 'currency':
      formatted = formatCurrency(value as number, currency, { locale, compact });
      break;

    case 'percentage':
      formatted = formatPercentage(value as number, { decimals, locale, showSign });
      break;

    case 'number':
      formatted = formatNumber(value as number, { decimals, locale, compact, showSign });
      break;

    case 'date':
      formatted = formatDate(value as Date, 'medium', locale);
      break;

    case 'duration':
      formatted = formatDuration(value as number);
      break;

    case 'text':
    default:
      formatted = String(value);
      break;
  }

  return `${prefix}${formatted}${suffix}`;
}

// ============================================================================
// EXPORTS
// ============================================================================

export {
  CURRENCY_CONFIGS,
  type CurrencyConfig,
};
