// KALCUFY ENGINE V4 - TIPOS TYPESCRIPT

export type Locale = "en" | "es" | "pt";
export const LOCALES: Locale[] = ["en", "es", "pt"];
export const REQUIRED_LOCALES: Locale[] = ["en", "es"];
export const OPTIONAL_LOCALES: Locale[] = ["pt"];
export const DEFAULT_LOCALE: Locale = "en";

export type Category = "health" | "finance" | "math" | "everyday";

export interface LocalizedSlug {
  en: string;
  es: string;
  pt?: string;
}

export interface InputOption { value: string; label: string; }
export interface UnitConfig { suffix: string; min?: number; max?: number; step?: number; default?: number; }
export interface InputUnits { imperial: UnitConfig; metric: UnitConfig; }
export interface ShowWhenCondition { field: string; value: string | string[]; }

export interface InputConfig {
  id: string;
  type: "number" | "radio" | "select";
  label: string;
  required: boolean;
  defaultValue?: number | string;
  min?: number; max?: number; step?: number;
  suffix?: string; prefix?: string;
  helpText?: string; placeholder?: string;
  options?: InputOption[];
  units?: InputUnits;
  showWhen?: ShowWhenCondition;
}

export interface InputGroup { id: string; title: string; inputs: string[]; }

export type ResultType = "primary" | "secondary" | "tertiary";
export type ResultFormat = "number" | "text" | "currency" | "percent";

export interface ResultConfig {
  id: string; type: ResultType; label: string; format: ResultFormat;
  decimals?: number; prefix?: string; suffix?: string;
}

export type InfoCardType = "list" | "horizontal";
export interface InfoCardItem { label: string; valueKey?: string; }
export interface InfoCard { id: string; title: string; type: InfoCardType; icon: string; items: InfoCardItem[]; }

export interface ReferenceDataItem { label: string; value: string; }
export interface ReferenceData { id: string; title: string; icon: string; columns: 2 | 3; items: ReferenceDataItem[]; }

export type EducationSectionType = "prose" | "list" | "cards" | "code-example";
export type ListItemType = "info" | "warning" | "success" | "error";

export interface ProseSection { id: string; type: "prose"; title: string; icon: string; content: string; }
export interface ListItem { text: string; type: ListItemType; }
export interface ListSection { id: string; type: "list"; title: string; icon: string; items: ListItem[]; }
export interface CardItem { title: string; description: string; icon: string; }
export interface CardsSection { id: string; type: "cards"; title: string; icon: string; columns: 2 | 3; cards: CardItem[]; }
export interface CodeExample { title: string; steps: string[]; result: string; }
export interface CodeExampleSection { id: string; type: "code-example"; title: string; icon: string; description: string; columns: 2 | 3; examples: CodeExample[]; }

export type EducationSection = ProseSection | ListSection | CardsSection | CodeExampleSection;

export interface FAQ { question: string; answer: string; }
export interface Reference { authors: string; year: string; title: string; source: string; url: string; }

export interface SEOConfig { title: string; description: string; shortDescription: string; keywords: string[]; }
export interface HeroRating { average: number; count: number; }
export interface HeroConfig { badge: string; rating: HeroRating; }

export type UnitSystem = "metric" | "imperial";
export interface UnitSystemOption { value: UnitSystem; label: string; }
export interface UnitSystemConfig { enabled: boolean; default: UnitSystem; options: UnitSystemOption[]; }

export interface SidebarConfig { showSearch: boolean; showRelatedCalculators: boolean; showCTA: boolean; category: Category; }
export interface FeaturesConfig { autoCalculate: boolean; exportPDF: boolean; shareResults: boolean; saveHistory: boolean; compareScenarios?: boolean; fullAmortization?: boolean; exportExcel?: boolean; advancedCharts?: boolean; }
export interface AdsConfig { mobileHero: boolean; sidebar: boolean; mobileContent: boolean; bottom: boolean; }

export interface CalculatorConfigV4 {
  id: string;
  slug: LocalizedSlug;
  name: string;
  category: Category;
  icon: string;
  isPro?: boolean;
  seo: SEOConfig;
  hero: HeroConfig;
  unitSystem: UnitSystemConfig;
  inputs: InputConfig[];
  inputGroups: InputGroup[];
  results: ResultConfig[];
  infoCards: InfoCard[];
  referenceData: ReferenceData[];
  educationSections: EducationSection[];
  faqs: FAQ[];
  references: Reference[];
  sidebar: SidebarConfig;
  features: FeaturesConfig;
  relatedCalculators: string[];
  ads: AdsConfig;
}

export interface AmortizationRow { month: number; payment: number; principal: number; interest: number; balance: number; }
export interface ChartDataPoint { label: string; value: number; color?: string; }

export interface CalculatorResults {
  values: Record<string, number | string>;
  formatted: Record<string, string>;
  summary: string;
  isValid: boolean;
  errors?: Record<string, string>;
  amortizationTable?: AmortizationRow[];
  chartData?: ChartDataPoint[];
}

export interface CalculateInput { values: Record<string, unknown>; units: Record<string, string>; unitSystem: UnitSystem; }
export type CalculateFunction = (data: CalculateInput) => CalculatorResults;

export interface TranslationFile {
  calculator: { title: string; subtitle?: string; breadcrumb?: string; yourInformation?: string; };
  inputs: Record<string, { label: string; helpText?: string; suffix?: string; placeholder?: string; options?: Record<string, string>; }>;
  results: Record<string, string>;
  info: Record<string, { title: string; [key: string]: string; }>;
  reference: Record<string, { title: string; items?: Record<string, string>; }>;
  education: Record<string, { title: string; content?: string; description?: string; cards?: Record<string, { title: string; description: string; }>; items?: Record<string, { text: string }>; examples?: Record<string, { title: string; steps: Record<string, string>; result: string; }>; }>;
  faq: { title?: string; [key: string]: string | { question: string; answer: string } | undefined; };
  sources?: { title?: string; };
  common?: { home?: string; calculators?: string; };
  buttons?: { calculate?: string; reset?: string; pdf?: string; excel?: string; compare?: string; };
  disclaimers?: { health?: string; finance?: string; };
}

export interface ValidationError { type: "missing_file" | "missing_keys" | "invalid_format" | "empty_value"; calculator: string; locale: Locale; path?: string; keys?: string[]; message: string; }
export interface ValidationResult { isValid: boolean; errors: ValidationError[]; warnings: string[]; }
export interface TranslationProgress { calculator: string; locales: { locale: Locale; isComplete: boolean; completedKeys: number; totalKeys: number; missingKeys: string[]; }[]; }

export interface CalculatorModule { config: CalculatorConfigV4; calculate: CalculateFunction; }
export interface CalculatorRegistryEntry { id: string; slug: LocalizedSlug; name: string; category: Category; icon: string; isPro: boolean; isActive: boolean; }
export type CalculatorRegistry = Record<string, CalculatorRegistryEntry>;

export default CalculatorConfigV4;
