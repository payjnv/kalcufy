// ============================================================================
// ENGINE V3 ULTIMATE - COMPLETE CALCULATOR TYPES
// ============================================================================
// Supports: Dynamic Lists, Multi-mode, Visualizations, Wizard, Comparison, What-if
// ============================================================================

// ─────────────────────────────────────────────────────────────────────────────
// INPUT TYPES
// ─────────────────────────────────────────────────────────────────────────────
export type InputType = 
  | 'number'
  | 'slider'
  | 'radio'
  | 'select'
  | 'unit-toggle'
  | 'unit-input'
  | 'checkbox'
  | 'text'
  | 'date'
  | 'dynamic-list'
  | 'currency'
  | 'percentage';

export interface InputOption {
  value: string;
  label: string;
  icon?: string;
  description?: string;
}

export interface UnitOption {
  value: string;
  label: string;
  conversionFactor?: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// DYNAMIC LIST (NIVEL 1)
// ─────────────────────────────────────────────────────────────────────────────
export interface DynamicListField {
  id: string;
  type: 'text' | 'number' | 'select' | 'checkbox';
  label: string;
  placeholder?: string;
  defaultValue?: string | number | boolean;
  width?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  options?: InputOption[];
  min?: number;
  max?: number;
  step?: number;
  suffix?: string;
  prefix?: string;
}

export interface DynamicListItem {
  id: string;
  [key: string]: unknown;
}

export interface DynamicListConfig {
  fields: DynamicListField[];
  minItems?: number;
  maxItems?: number;
  defaultItems?: DynamicListItem[];
  addButtonLabel?: string;
  removeButtonLabel?: string;
  itemLabel?: string;
  layout?: 'compact' | 'card' | 'table';
  showIndex?: boolean;
  sortable?: boolean;
  duplicateEnabled?: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// CONDITIONAL LOGIC (NIVEL 1)
// ─────────────────────────────────────────────────────────────────────────────
export type ComparisonOperator = 'equals' | 'notEquals' | 'greaterThan' | 'lessThan' | 'contains' | 'in';

export interface ShowWhenCondition {
  field: string;
  operator?: ComparisonOperator;
  value: string | string[] | number | boolean;
}

export interface ConditionalLogic {
  showWhen?: ShowWhenCondition | ShowWhenCondition[];
  hideWhen?: ShowWhenCondition | ShowWhenCondition[];
  logicOperator?: 'and' | 'or';
}

// ─────────────────────────────────────────────────────────────────────────────
// INPUT CONFIG
// ─────────────────────────────────────────────────────────────────────────────
export interface InputConfig extends ConditionalLogic {
  id: string;
  type: InputType;
  label: string;
  required?: boolean;
  defaultValue?: string | number | boolean;
  placeholder?: string;
  helpText?: string;
  min?: number;
  max?: number;
  step?: number;
  suffix?: string;
  prefix?: string;
  options?: InputOption[];
  units?: UnitOption[];
  defaultUnit?: string;
  width?: 'full' | 'half' | 'third' | 'quarter';
  showSlider?: boolean;
  validation?: {
    rules?: string[];
    messages?: Record<string, string>;
    custom?: (value: unknown) => string | null;
  };
  dynamicList?: DynamicListConfig;
  // For mode filtering
  modes?: string[];
  // For wizard mode
  step?: number;
  // For what-if mode
  whatIfEnabled?: boolean;
}

export interface InputGroup extends ConditionalLogic {
  id: string;
  title?: string;
  description?: string;
  inputs: string[];
  collapsible?: boolean;
  defaultExpanded?: boolean;
  icon?: string;
  // For wizard mode
  step?: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// CALCULATION MODES (NIVEL 1)
// ─────────────────────────────────────────────────────────────────────────────
export interface CalculationMode {
  id: string;
  label: string;
  icon?: string;
  description?: string;
  inputs: string[];  // Which inputs to show
  results: string[]; // Which results to show
  defaultValues?: Record<string, unknown>;
}

// ─────────────────────────────────────────────────────────────────────────────
// RESULT TYPES (NIVEL 2)
// ─────────────────────────────────────────────────────────────────────────────
export type ResultType = 
  | 'primary'
  | 'secondary'
  | 'badge'
  | 'progress-bar'
  | 'distribution-bars'
  | 'reference-table'
  | 'info-card'
  | 'comparison-bars'
  | 'timeline'
  | 'pie-chart'
  | 'bar-chart'
  | 'stat-grid';

export interface ResultConfig extends ConditionalLogic {
  id: string;
  type: ResultType;
  label: string;
  description?: string;
  icon?: string;
  format?: 'number' | 'currency' | 'percentage' | 'text' | 'date';
  decimals?: number;
  suffix?: string;
  prefix?: string;
  // For badges/status
  colorMap?: Record<string, { bg: string; text: string; icon?: string }>;
  // For progress bars
  progressConfig?: {
    min: number;
    max: number;
    thresholds?: { value: number; color: string; label?: string }[];
  };
  // For reference tables
  tableConfig?: {
    columns: { id: string; label: string }[];
    highlightValue?: boolean;
  };
  // For info cards
  cardConfig?: {
    items: { label: string; valueKey: string; icon?: string }[];
    layout?: 'horizontal' | 'vertical' | 'grid';
  };
  // For charts
  chartConfig?: {
    dataKey: string;
    colors?: string[];
    showLegend?: boolean;
    showLabels?: boolean;
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// VISUALIZATIONS (NIVEL 2)
// ─────────────────────────────────────────────────────────────────────────────
export interface DistributionBar {
  id: string;
  label: string;
  valueKey: string;
  maxValueKey?: string;
  color?: string;
  showPercentage?: boolean;
}

export interface ReferenceTableItem {
  label: string;
  value: string | number;
  highlight?: boolean;
  icon?: string;
}

export interface InfoCardItem {
  label: string;
  value?: string;
  icon?: string;
  color?: 'default' | 'green' | 'blue' | 'amber' | 'red';
}

export interface ResultVisualization {
  id: string;
  type: 'distribution-bars' | 'reference-table' | 'info-cards' | 'pie-chart' | 'bar-chart' | 'range-indicator';
  title?: string;
  icon?: string;
  showWhen?: ShowWhenCondition;
  // For distribution bars (like Grade Distribution)
  distributionBars?: {
    dataKey: string;  // Key in metadata containing array
    labelField: string;
    valueField: string;
    maxValue?: number;
    maxValueField?: string;
    colorGradient?: [string, string];
  };
  // For reference tables (like Grade Points Reference)
  referenceTable?: {
    dataKey?: string;
    items?: ReferenceTableItem[];
    columns?: number;
    highlightCurrent?: string;
  };
  // For charts
  chartData?: {
    dataKey: string;
    type: 'pie' | 'bar' | 'line';
    colors?: string[];
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// INFO CARDS CONFIG (Top-level for GPA-style cards)
// ─────────────────────────────────────────────────────────────────────────────
export interface InfoCardConfig {
  id: string;
  title: string;
  icon?: string;
  type: 'list' | 'grid' | 'horizontal';
  items: InfoCardItem[];
  columns?: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// REFERENCE DATA CONFIG (Top-level for grade points style grids)
// ─────────────────────────────────────────────────────────────────────────────
export interface ReferenceDataConfig {
  id: string;
  title: string;
  icon?: string;
  items: ReferenceTableItem[];
  columns?: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// WIZARD MODE (NIVEL 3)
// ─────────────────────────────────────────────────────────────────────────────
export interface WizardStep {
  id: string;
  title: string;
  description?: string;
  icon?: string;
  inputs: string[];
  validation?: {
    required?: string[];
    custom?: (values: Record<string, unknown>) => string | null;
  };
}

export interface WizardConfig {
  enabled: boolean;
  steps: WizardStep[];
  showProgressBar?: boolean;
  showStepNumbers?: boolean;
  allowSkip?: boolean;
  allowBack?: boolean;
  completionMessage?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPARISON MODE (NIVEL 3)
// ─────────────────────────────────────────────────────────────────────────────
export interface ComparisonScenario {
  id: string;
  label: string;
  color?: string;
  values: Record<string, unknown>;
}

export interface ComparisonConfig {
  enabled: boolean;
  maxScenarios?: number;
  defaultScenarios?: ComparisonScenario[];
  compareFields?: string[];
  showDifference?: boolean;
  showPercentageChange?: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// WHAT-IF MODE (NIVEL 3)
// ─────────────────────────────────────────────────────────────────────────────
export interface WhatIfConfig {
  enabled: boolean;
  targetFields: string[];
  impactFields: string[];
  showImpactPreview?: boolean;
  presets?: {
    label: string;
    changes: Record<string, unknown>;
  }[];
}

// ─────────────────────────────────────────────────────────────────────────────
// AUTO-SAVE (NIVEL 3)
// ─────────────────────────────────────────────────────────────────────────────
export interface AutoSaveConfig {
  enabled: boolean;
  storageKey?: string;
  debounceMs?: number;
  maxDrafts?: number;
  showRestorePrompt?: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// EDUCATION SECTION TYPES
// ─────────────────────────────────────────────────────────────────────────────
export type SectionType = 
  | 'cards'
  | 'list'
  | 'code-example'
  | 'prose'
  | 'references'
  | 'table'
  | 'custom';

export interface CardItem {
  title: string;
  description: string;
  shortDescription?: string;
  icon?: string;
}

export interface ListItem {
  text: string;
  icon?: string;
  type?: 'warning' | 'info' | 'success' | 'error';
}

export interface CodeExample {
  title: string;
  steps?: string[];
  code?: string;
  result?: string;
}

export interface Reference {
  authors: string;
  title: string;
  source: string;
  year?: string;
  url?: string;
}

export interface EducationSection extends ConditionalLogic {
  id: string;
  type: SectionType;
  title: string;
  icon?: string;
  description?: string;
  cards?: CardItem[];
  items?: ListItem[];
  examples?: CodeExample[];
  content?: string;
  references?: Reference[];
  columns?: 1 | 2 | 3;
  background?: 'white' | 'slate' | 'gradient';
}

// ─────────────────────────────────────────────────────────────────────────────
// FAQ TYPES
// ─────────────────────────────────────────────────────────────────────────────
export interface FAQItem {
  question: string;
  answer: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// SIDEBAR CONFIG
// ─────────────────────────────────────────────────────────────────────────────
export interface SidebarConfig {
  showSearch?: boolean;
  showRelatedCalculators?: boolean;
  showRelatedPosts?: boolean;
  showCTA?: boolean;
  cta?: {
    title: string;
    description: string;
    shortDescription?: string;
    linkText: string;
    link: string;
  };
  relatedTags?: string[];
  category?: 'health' | 'finance' | 'everyday' | 'all';
}

// ─────────────────────────────────────────────────────────────────────────────
// DETAILED TABLE MODAL
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
// MAIN CALCULATOR CONFIG V3 ULTIMATE
// ─────────────────────────────────────────────────────────────────────────────
export interface CalculatorConfigV3 {
  // ═══════════════════════════════════════════════════════════════════════════
  // IDENTITY
  // ═══════════════════════════════════════════════════════════════════════════
  id: string;
  slug: string;
  name: string;
  category: string;
  icon: string;
  version?: string;
  
  // ═══════════════════════════════════════════════════════════════════════════
  // SEO
  // ═══════════════════════════════════════════════════════════════════════════
  seo: {
    title: string;
    description: string;
    shortDescription?: string;
    keywords?: string[];
    canonicalUrl?: string;
  };
  
  // ═══════════════════════════════════════════════════════════════════════════
  // HERO
  // ═══════════════════════════════════════════════════════════════════════════
  hero: {
    badge?: string;
    rating?: { average: number; count: number };
    highlights?: string[];
  };
  
  // ═══════════════════════════════════════════════════════════════════════════
  // NIVEL 1 - CORE
  // ═══════════════════════════════════════════════════════════════════════════
  
  // Inputs
  inputs: InputConfig[];
  inputGroups?: InputGroup[];
  
  // Unit System
  unitSystem?: {
    enabled: boolean;
    default: 'metric' | 'imperial';
    options: Array<{ value: string; label: string }>;
  };
  
  // Calculation Modes (like GPA: Semester/Cumulative/Target)
  calculationModes?: {
    enabled: boolean;
    default: string;
    modes: CalculationMode[];
    style?: 'tabs' | 'buttons' | 'dropdown';
  };
  
  // ═══════════════════════════════════════════════════════════════════════════
  // NIVEL 2 - VISUALIZATIONS
  // ═══════════════════════════════════════════════════════════════════════════
  
  // Results
  results: ResultConfig[];
  
  // Additional Visualizations (Grade Distribution, Reference Tables, etc.)
  visualizations?: ResultVisualization[];
  
  // Info Cards (Latin Honors, Tips, etc.)
  infoCards?: InfoCardConfig[];
  
  // Reference Data (Grade Points Reference, etc.)
  referenceData?: ReferenceDataConfig[];
  
  // Detailed Table Modal
  detailedTable?: DetailedTableConfig;
  
  // ═══════════════════════════════════════════════════════════════════════════
  // NIVEL 3 - UX AVANZADO
  // ═══════════════════════════════════════════════════════════════════════════
  
  // Wizard Mode
  wizard?: WizardConfig;
  
  // Comparison Mode
  comparison?: ComparisonConfig;
  
  // What-If Mode
  whatIf?: WhatIfConfig;
  
  // Auto-Save
  autoSave?: AutoSaveConfig;
  
  // ═══════════════════════════════════════════════════════════════════════════
  // EDUCATIONAL CONTENT
  // ═══════════════════════════════════════════════════════════════════════════
  educationSections?: EducationSection[];
  faqs?: FAQItem[];
  references: Reference[];
  
  // ═══════════════════════════════════════════════════════════════════════════
  // SIDEBAR & FEATURES
  // ═══════════════════════════════════════════════════════════════════════════
  sidebar?: SidebarConfig;
  
  features?: {
    autoCalculate?: boolean;
    exportPDF?: boolean;
    exportExcel?: boolean;
    exportImage?: boolean;
    shareResults?: boolean;
    saveHistory?: boolean;
    favorites?: boolean;
    printResults?: boolean;
    copyResults?: boolean;
  };
  
  relatedCalculators?: string[];
  
  // ═══════════════════════════════════════════════════════════════════════════
  // ADS
  // ═══════════════════════════════════════════════════════════════════════════
  ads?: {
    mobileHero?: boolean;
    sidebar?: boolean;
    mobileContent?: boolean;
    bottom?: boolean;
    betweenSections?: boolean;
    afterResults?: boolean;
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// CALCULATOR STATE
// ─────────────────────────────────────────────────────────────────────────────
export interface CalculatorState {
  values: Record<string, unknown>;
  units: Record<string, string>;
  unitSystem: 'metric' | 'imperial';
  errors: Record<string, string>;
  isCalculating: boolean;
  hasCalculated: boolean;
  // Nivel 1
  currentMode?: string;
  // Nivel 3
  currentStep?: number;
  scenarios?: ComparisonScenario[];
  whatIfDelta?: Record<string, unknown>;
  draftId?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// CALCULATOR RESULTS
// ─────────────────────────────────────────────────────────────────────────────
export interface CalculatorResults {
  values: Record<string, unknown>;
  formatted: Record<string, string>;
  summary?: string;
  isValid: boolean;
  // For visualizations
  metadata?: {
    // Distribution bars data
    distribution?: Array<{ id: string; label: string; value: number; max?: number }>;
    // Reference table data
    referenceTable?: Record<string, number | string>;
    // Info cards data
    infoCards?: Array<{ title: string; items: { label: string; value: string; color?: string }[] }>;
    // Chart data
    chartData?: Array<{ label: string; value: number; color?: string }>;
    // Table data
    tableData?: Array<Record<string, unknown>>;
    // Any other custom data
    [key: string]: unknown;
  };
  // For comparison mode
  scenarioId?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// TRANSLATION FUNCTION
// ─────────────────────────────────────────────────────────────────────────────
export type TranslationFn = (key: string, fallback?: string) => string;

// ─────────────────────────────────────────────────────────────────────────────
// ENGINE PROPS
// ─────────────────────────────────────────────────────────────────────────────
export interface CalculatorEngineProps {
  config: CalculatorConfigV3;
  calculate: (data: {
    values: Record<string, unknown>;
    units: Record<string, string>;
    unitSystem: 'metric' | 'imperial';
    mode?: string;
  }) => CalculatorResults;
  t: TranslationFn;
  // Custom render functions
  renderCustomVisualization?: (viz: ResultVisualization, results: CalculatorResults) => React.ReactNode;
  renderCustomSection?: (section: EducationSection) => React.ReactNode;
}
