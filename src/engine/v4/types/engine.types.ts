// ============================================================================
// ENGINE V4 STANDALONE - TYPES
// ============================================================================
// Completely independent from V3 - no imports from V3
// ============================================================================

// Unit system type (imported from units/types.ts)
import type { UnitType } from "../units/types";

export type SupportedLocale = 'en' | 'es' | 'pt' | 'fr' | 'de';

// ─────────────────────────────────────────────────────────────────────────────
// TRANSLATION TYPES
// ─────────────────────────────────────────────────────────────────────────────
export interface InputTranslation {
  label: string;
  helpText?: string;
  suffix?: string;
  prefix?: string;
  placeholder?: string;
  options?: Record<string, string>;
}

export interface ResultTranslation {
  label: string;
  description?: string;
}

export interface InfoCardTranslation {
  title: string;
  items: string[] | Array<{ label: string; valueKey?: string }>;
}

export interface ReferenceDataTranslation {
  title: string;
  items: Array<{ label: string; value: string }>;
}

export interface FAQTranslation {
  question: string;
  answer: string;
}

export interface EducationSectionTranslation {
  title: string;
  content?: string;
  description?: string;
  items?: Array<{ text: string; type?: 'warning' | 'info' | 'success' | 'error' }>;
  cards?: Array<{ title: string; description: string; icon?: string }>;
  examples?: Array<{
    title: string;
    steps: string[];
    result: string;
  }>;
}

export interface PresetTranslation {
  label: string;
  description?: string;
}

export interface CalculatorTranslations {
  name: string;
  slug: string;
  subtitle: string;
  breadcrumb?: string;
  
  seo: {
    title: string;
    description: string;
    shortDescription?: string;
    keywords: string[];
  };
  
  ui?: {
    yourInformation?: string;
    calculate?: string;
    reset?: string;
    results?: string;
    loading?: string;
    quickStart?: string;
    compare?: string;
    compareTitle?: string;
    sensitivity?: string;
    close?: string;
    save?: string;
    saved?: string;
    error?: string;
    exportPDF?: string;
    exportCSV?: string;
  };
  
  common?: {
    home?: string;
    calculators?: string;
    reviews?: string;
  };
  
  inputs: Record<string, InputTranslation>;
  results: Record<string, ResultTranslation>;
  infoCards: Record<string, InfoCardTranslation>;
  referenceData: Record<string, ReferenceDataTranslation>;
  education: Record<string, EducationSectionTranslation>;
  faqs: FAQTranslation[];
  
  presets?: Record<string, PresetTranslation>;
  tooltips?: Record<string, string>;
  chart?: {
    title: string;
    xLabel?: string;
    yLabel?: string;
    series: Record<string, string>;
  };
  // Multi-chart tabbed translations (NEW)
  charts?: {
    title: string;
    series: Record<string, string>;
    tabs: Record<string, { label: string; icon?: string; subtitle?: string }>;
  };
  modes?: Record<string, string>;
  // Values & formats for calculate()
  values?: Record<string, string>;
  formats?: Record<string, string>;
  
  // UI sections
  calculator?: Record<string, string>;
  rating?: Record<string, string>;
  buttons?: Record<string, string>;
  share?: Record<string, string>;
  accessibility?: Record<string, string>;
  sources?: Record<string, string>;
  
  // References (in translations for some calculators)
  references?: { title: string } | Array<{ authors: string; year: string; title: string; source: string; url: string }>;
  
  // DetailedTable translations
  detailedTable?: Record<string, { button?: string; title?: string; columns?: Record<string, string> }>;
  
  // shortDescription for OG
  shortDescription?: string;
  
  footer?: Record<string, string>;
  save?: Record<string, string>;
  disclaimer?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// INPUT TYPES
// ─────────────────────────────────────────────────────────────────────────────
export type InputType = 
  | 'number'
  | 'slider'
  | 'radio'
  | 'select'
  | 'checkbox'
  | 'text'
  | 'date'
  | 'currency'
  | 'percentage';

export interface InputOption {
  value: string;
  icon?: string;
}

export interface UnitOption {
  value: string;
  label?: string;
  conversionFactor?: number;
}

export interface ShowWhenConditionSingle {
  field: string;
  value: string | string[] | number | boolean;
}

// Supports single condition or array of conditions (AND logic)
export type ShowWhenCondition = ShowWhenConditionSingle | ShowWhenConditionSingle[];

export interface InputConfig {
  id: string;
  type: InputType;
  required?: boolean;
  defaultValue?: string | number | boolean | null; // SMART DEFAULTS: null means "empty field with placeholder"
  placeholder?: string; // SMART DEFAULTS: Visual hint when field is empty
  min?: number;
  max?: number;
  step?: number;
  options?: InputOption[];
  units?: UnitOption[];
  defaultUnit?: string;
  width?: 'full' | 'half' | 'third' | 'quarter';
  showWhen?: ShowWhenCondition;
  modes?: string[];
  showSlider?: boolean;
  unitOptions?: {
    imperial: { suffix: string; min?: number; max?: number; default?: number };
    metric: { suffix: string; min?: number; max?: number; default?: number };
  };
  suffix?: string;
  prefix?: string;
  isCurrency?: boolean;
  linkedValues?: Record<string, Record<string, unknown>>;
  
  // ── Unit Dropdown System ────────────────────────────────────────────────
  /** Unit type for per-field dropdown (e.g. "weight", "height", "currency") */
  unitType?: UnitType;
  /** Restrict to specific units within the type (e.g. ["kg", "lbs"]) */
  allowedUnits?: string[];
  /** Exclude specific units (e.g. ["st"] to hide stones) */
  excludeUnits?: string[];
  /** Auto-convert value when user changes unit (default: true) */
  autoConvert?: boolean;
  /** 
   * Sync group for unit synchronization.
   * - Same string = fields sync together (e.g. syncGroup: "price" on vehiclePrice + downPayment)
   * - false = field is independent, never syncs (e.g. converter "from" and "to" fields)
   * - undefined (default) = sync all fields with same unitType (backwards compatible)
   */
  syncGroup?: string | false;
}

export interface InputGroup {
  id: string;
  inputs: string[];
  collapsible?: boolean;
  defaultExpanded?: boolean;
  icon?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// RESULT TYPES
// ─────────────────────────────────────────────────────────────────────────────
export type ResultType = 'primary' | 'secondary' | 'badge';

export interface ResultConfig {
  labelKey?: string;
  id: string;
  type: ResultType;
  format?: 'number' | 'currency' | 'percentage' | 'text' | 'date';
  decimals?: number;
  suffix?: string;
  prefix?: string;
  icon?: string;
  colorMap?: Record<string, { bg: string; text: string; icon?: string }>;
  showWhen?: ShowWhenCondition;
  suffix?: string;
  prefix?: string;
  isCurrency?: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// INFO CARDS & REFERENCE DATA
// ─────────────────────────────────────────────────────────────────────────────
export interface InfoCardItem {
  valueKey?: string;
  icon?: string;
  color?: 'default' | 'green' | 'blue' | 'amber' | 'red';
  suffix?: string;
  prefix?: string;
  isCurrency?: boolean;
}

export interface InfoCardConfig {
  id: string;
  icon?: string;
  type: 'list' | 'grid' | 'horizontal';
  items: InfoCardItem[];
  columns?: number;
}

export interface ReferenceDataConfig {
  id: string;
  icon?: string;
  columns?: 2 | 3 | 4;
}

// ─────────────────────────────────────────────────────────────────────────────
// EDUCATION SECTIONS
// ─────────────────────────────────────────────────────────────────────────────
export type SectionType = 'prose' | 'cards' | 'list' | 'code-example';

export interface EducationSectionConfig {
  id: string;
  itemCount?: number;
  exampleCount?: number;
  columns?: number;
  type: SectionType;
  icon?: string;
  columns?: 1 | 2 | 3;
  background?: 'white' | 'slate';
}

// ─────────────────────────────────────────────────────────────────────────────
// REFERENCES
// ─────────────────────────────────────────────────────────────────────────────
export interface Reference {
  authors: string;
  title: string;
  source: string;
  year?: string;
  url?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// MODES
// ─────────────────────────────────────────────────────────────────────────────
export interface ModeOption {
  id: string;
  icon?: string;
}

export interface ModesConfig {
  enabled: boolean;
  options: ModeOption[];
  default: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// PRESETS
// ─────────────────────────────────────────────────────────────────────────────
export interface PresetConfig {
  id: string;
  icon?: string;
  values: Record<string, unknown>;
}

// ─────────────────────────────────────────────────────────────────────────────
// SENSITIVITY ANALYSIS
// ─────────────────────────────────────────────────────────────────────────────
export interface SensitivityConfig {
  inputId: string;
  resultId: string;
  steps?: number;
  rangePercent?: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// DETAILED TABLE (Expandable modal table - schedules, comparisons, etc.)
// ─────────────────────────────────────────────────────────────────────────────
export interface DetailedTableColumn {
  id: string;
  label: string;
  align?: 'left' | 'center' | 'right';
  highlight?: boolean;
  format?: 'number' | 'currency' | 'percentage' | 'text' | 'date';
}

export interface DetailedTableConfig {
  id: string;
  buttonLabel: string;
  buttonIcon?: string;
  modalTitle: string;
  columns: DetailedTableColumn[];
  exportEnabled?: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// CHART VISUALIZATION
// ─────────────────────────────────────────────────────────────────────────────
export interface ChartSeriesConfig {
  key: string;
  type?: 'line' | 'bar' | 'area';
  color?: string;
  dashed?: boolean;
  stackId?: string;
}

export interface ChartConfig {
  id: string;
  type: 'line' | 'bar' | 'area' | 'composed';
  xKey: string;
  series: ChartSeriesConfig[];
  height?: number;
  stacked?: boolean;
  showGrid?: boolean;
  showLegend?: boolean;
  showTooltip?: boolean;
  yAxisFormat?: 'number' | 'currency' | 'percentage';
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN CALCULATOR CONFIG V4 STANDALONE
// ─────────────────────────────────────────────────────────────────────────────
export interface CalculatorConfigV4 {
  id: string;
  category: 'health' | 'finance' | 'math' | 'everyday';
  icon: string;
  version?: string;
  
  // TRANSLATIONS (INLINE)
  t: {
    en: CalculatorTranslations;
    es: CalculatorTranslations;
    pt?: CalculatorTranslations;
    fr?: CalculatorTranslations;
    de?: CalculatorTranslations;
  };
  
  // STRUCTURE
  hero: {
    badge?: string;
    rating?: { average: number; count: number };
    highlights?: string[];
  };
  
  unitSystem?: {
    enabled: boolean;
    default: 'metric' | 'imperial';
  };
  
  modes?: ModesConfig;
  
  inputs: InputConfig[];
  inputGroups?: InputGroup[];
  
  results: ResultConfig[];
  
  // Detailed Table Modal (expandable schedule/comparison table)
  detailedTable?: DetailedTableConfig;
  
  // Chart visualization (line, bar, area, composed)
  chart?: ChartConfig;
  
  // Multi-chart tabbed visualization (NEW - array of charts with tab UI)
  charts?: ChartConfig[];
  
  infoCards?: InfoCardConfig[];
  referenceData?: ReferenceDataConfig[];
  educationSections?: EducationSectionConfig[];
  
  references: Reference[];
  
  sidebar?: {
    showSearch?: boolean;
    showRelatedCalculators?: boolean;
    showCTA?: boolean;
    category?: string;
  };
  
  features?: {
    autoCalculate?: boolean;
    exportPDF?: boolean;
    exportCSV?: boolean;
    shareResults?: boolean;
    saveHistory?: boolean;
    compareEnabled?: boolean;
    sensitivityEnabled?: boolean;
    presetsEnabled?: boolean;
  };
  
  presets?: PresetConfig[];
  sensitivity?: SensitivityConfig;
  
  showTopBanner?: boolean;
  showPresets?: boolean;
  showConversions?: boolean;
  showRating?: boolean;
  showAds?: boolean;
  badgeVariant?: string;
  currency?: string;
  relatedCalculators?: string[];
  
  ads?: {
    mobileHero?: boolean;
    sidebar?: boolean;
    mobileContent?: boolean;
    bottom?: boolean;
    afterResults?: boolean;
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// CALCULATOR RESULTS
// ─────────────────────────────────────────────────────────────────────────────
export interface CalculatorResults {
  values: Record<string, unknown>;
  formatted: Record<string, string>;
  summary?: string;
  isValid: boolean;
  metadata?: {
    tableData?: Array<Record<string, unknown>>;
    chartData?: Array<Record<string, unknown>>;
    chartsData?: Record<string, Array<Record<string, unknown>>>;
    distribution?: Array<{ id: string; label: string; value: number; max?: number }>;
    [key: string]: unknown;
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// CALCULATE FUNCTION TYPE
// ─────────────────────────────────────────────────────────────────────────────
export type CalculateFn = (data: {
  values: Record<string, unknown>;
  units: Record<string, string>;
  unitSystem: 'metric' | 'imperial';
  mode?: string;
  /** Per-field unit selections from dropdown system */
  fieldUnits?: Record<string, string>;
}) => CalculatorResults;

// ─────────────────────────────────────────────────────────────────────────────
// TRANSLATION FUNCTION TYPE
// ─────────────────────────────────────────────────────────────────────────────
export type TranslationFn = (key: string, fallback?: string) => string;
