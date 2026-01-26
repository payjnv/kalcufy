// ============================================
// KALCUFY CALCULATOR ENGINE - TYPE DEFINITIONS
// ============================================
// Version: 1.0.0
// Purpose: Complete type system for config-driven calculators
// ============================================

// ============================================
// BASE TYPES
// ============================================

export type CalculatorCategory = 'finance' | 'health' | 'everyday';

export type InputType = 
  | 'number' 
  | 'currency' 
  | 'percentage' 
  | 'select' 
  | 'radio' 
  | 'slider' 
  | 'date'
  | 'toggle'
  | 'unit-input';

export type UnitSystem = 'metric' | 'imperial';

export type ResultDisplayType = 
  | 'primary'
  | 'secondary'
  | 'badge'
  | 'range'
  | 'chart'
  | 'table'
  | 'breakdown';

// ============================================
// INPUT CONFIGURATION
// ============================================

export interface UnitConfig {
  value: string;
  label: string;
  conversionFactor: number;
  system: UnitSystem;
}

export interface SelectOption {
  value: string | number;
  label: string;
  icon?: string;
}

export interface InputConfig {
  name: string;
  type: InputType;
  required?: boolean;
  defaultValue?: number | string | boolean;
  
  // Validation
  min?: number;
  max?: number;
  step?: number;
  
  // For unit-input
  units?: UnitConfig[];
  defaultUnit?: string;
  
  // For select/radio
  options?: SelectOption[];
  
  // Conditional display
  dependsOn?: {
    field: string;
    value: string | number | boolean;
    operator?: '==' | '!=' | '>' | '<' | '>=' | '<=';
  };
  
  // Layout
  width?: 'full' | 'half' | 'third';
  group?: string;
  
  // Accessibility
  inputMode?: 'numeric' | 'decimal' | 'text';
  autoComplete?: string;
}

export interface InputGroup {
  id: string;
  label: string;
  inputs: string[];
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  icon?: string;
}

// ============================================
// RESULT CONFIGURATION
// ============================================

export interface ResultFormat {
  type: 'number' | 'currency' | 'percentage' | 'date' | 'text';
  decimals?: number;
  prefix?: string;
  suffix?: string;
  locale?: string;
}

export interface RangeZone {
  min: number;
  max: number;
  label: string;
  color: string;
  description?: string;
}

export interface ChartConfig {
  type: 'line' | 'bar' | 'pie' | 'doughnut' | 'area';
  height?: number;
  showLegend?: boolean;
  colors?: string[];
}

export interface TableColumn {
  key: string;
  label: string;
  format?: ResultFormat;
  align?: 'left' | 'center' | 'right';
  width?: string;
}

export interface ResultColorMap {
  [category: string]: {
    bg: string;
    text: string;
    icon: string;
    border?: string;
  };
}

export interface ResultConfig {
  key: string;
  type: ResultDisplayType;
  format?: ResultFormat;
  icon?: string;
  
  // For badges
  colorMap?: ResultColorMap;
  
  // For ranges
  range?: {
    min: number;
    max: number;
    zones?: RangeZone[];
    showMarker?: boolean;
  };
  
  // For charts
  chartConfig?: ChartConfig;
  
  // For tables
  columns?: TableColumn[];
  maxRows?: number;
  showPagination?: boolean;
}

// ============================================
// FAQ CONFIGURATION
// ============================================

export interface FAQConfig {
  question: string;
  answer: string;
}

// ============================================
// SEO CONFIGURATION
// ============================================

export interface SEOConfig {
  structuredData?: 'FAQPage' | 'HowTo' | 'WebApplication';
  breadcrumb: string[];
  canonicalPath?: string;
  noIndex?: boolean;
}

// ============================================
// MAIN CALCULATOR CONFIGURATION
// ============================================

export interface CalculatorConfig {
  // Identification
  slug: string;
  version: string;
  category: CalculatorCategory;
  icon: string;
  color: string;
  
  // Flags
  isNew?: boolean;
  isPro?: boolean;
  isActive?: boolean;
  isBeta?: boolean;
  
  // Inputs
  inputs: InputConfig[];
  inputGroups?: InputGroup[];
  
  // Calculation function
  calculate: (data: CalculatorData) => CalculatorResults;
  
  // Results
  results: ResultConfig[];
  primaryResult: string;
  
  // Content
  educationSections?: string[];
  faqs: FAQConfig[];
  
  // Related
  relatedCalculators?: string[];
  
  // SEO
  seo: SEOConfig;
  
  // Options
  defaultUnitSystem?: UnitSystem;
  autoCalculate?: boolean;
  showFormula?: boolean;
  allowFavorites?: boolean;
  allowExport?: boolean;
}

// ============================================
// RUNTIME DATA TYPES
// ============================================

export interface CalculatorData {
  [key: string]: number | string | boolean | undefined;
  _units: Record<string, string>;
  _unitSystem: UnitSystem;
}

export interface CalculatorResultValue {
  value: number | string;
  unit?: string;
  category?: string;
  data?: Record<string, unknown>[];
  formattedValue?: string;
}

export interface CalculatorResults {
  [key: string]: CalculatorResultValue;
}

// ============================================
// VALIDATION TYPES
// ============================================

export interface ValidationError {
  field: string;
  message: string;
  type: 'required' | 'min' | 'max' | 'format' | 'custom';
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

// ============================================
// TRANSLATION TYPES
// ============================================

export interface CalculatorTranslations {
  meta: {
    title: string;
    shortTitle: string;
    description: string;
    keywords: string;
  };
  inputs: Record<string, {
    label: string;
    placeholder?: string;
    help?: string;
    options?: Record<string, string>;
  }>;
  results: Record<string, {
    label: string;
    description?: string;
    values?: Record<string, string>;
  }>;
  education: Record<string, {
    title: string;
    content: string;
  }>;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  disclaimer?: string;
}

// ============================================
// HOOK RETURN TYPES
// ============================================

export interface UseCalculatorReturn {
  data: CalculatorData;
  results: CalculatorResults | null;
  errors: Record<string, string>;
  isCalculating: boolean;
  hasResults: boolean;
  
  // Actions
  setFieldValue: (name: string, value: number | string | boolean) => void;
  setUnit: (name: string, unit: string) => void;
  calculate: () => void;
  reset: () => void;
  
  // Utilities
  getFieldValue: (name: string) => number | string | boolean | undefined;
  getUnit: (name: string) => string;
  hasError: (name: string) => boolean;
  getError: (name: string) => string | undefined;
}

// ============================================
// COMPONENT PROP TYPES
// ============================================

export interface CalculatorEngineProps {
  config: CalculatorConfig;
  locale: string;
  initialData?: Partial<CalculatorData>;
}

export interface InputRendererProps {
  inputs: InputConfig[];
  inputGroups?: InputGroup[];
  data: CalculatorData;
  errors: Record<string, string>;
  onInputChange: (name: string, value: number | string | boolean) => void;
  onUnitChange: (name: string, unit: string) => void;
  onCalculate: () => void;
  onReset: () => void;
  isCalculating: boolean;
  translations: {
    input: (name: string, field: string) => string;
    button: (key: string) => string;
  };
}

export interface ResultRendererProps {
  results: CalculatorResults | null;
  resultConfigs: ResultConfig[];
  primaryResult: string;
  isCalculating: boolean;
  hasResults: boolean;
  translations: {
    result: (key: string, field: string) => string;
    common: (key: string) => string;
  };
}

// ============================================
// EXPORT/IMPORT TYPES
// ============================================

export interface ExportData {
  calculatorSlug: string;
  timestamp: string;
  inputs: Record<string, number | string | boolean>;
  results: CalculatorResults;
  locale: string;
}

export interface FavoriteData {
  id?: string;
  calculatorSlug: string;
  name?: string;
  data: Record<string, unknown>;
  results: CalculatorResults;
  createdAt?: string;
}
