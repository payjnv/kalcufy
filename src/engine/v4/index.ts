// KALCUFY ENGINE V4 - MAIN EXPORT

// Types
export type {
  Locale, Category, LocalizedSlug, UnitSystem,
  InputConfig, InputOption, InputUnits, UnitConfig, ShowWhenCondition, InputGroup,
  ResultConfig, ResultType, ResultFormat,
  InfoCard, InfoCardType, InfoCardItem,
  ReferenceData, ReferenceDataItem,
  EducationSection, EducationSectionType, ProseSection, ListSection, ListItem, ListItemType, CardsSection, CardItem, CodeExampleSection, CodeExample,
  FAQ, Reference,
  SEOConfig, HeroConfig, HeroRating,
  UnitSystemConfig, UnitSystemOption, SidebarConfig, FeaturesConfig, AdsConfig,
  CalculatorConfigV4,
  CalculatorResults, AmortizationRow, ChartDataPoint, CalculateInput, CalculateFunction,
  TranslationFile, ValidationError, ValidationResult, TranslationProgress,
  CalculatorModule, CalculatorRegistry, CalculatorRegistryEntry,
} from "./types/engine.types";

// Constants
export { LOCALES, REQUIRED_LOCALES, OPTIONAL_LOCALES, DEFAULT_LOCALE } from "./types/engine.types";

// Errors
export { V4Error, MissingFileError, MissingKeysError, InvalidFormatError, EmptyValueError, ConfigValidationError, SlugConflictError, V4ErrorCollection } from "./errors";

// Loader
export { loadTranslation, loadTranslationFile, loadAllTranslations, mergeTranslationWithConfig, getTranslationPath, getTranslationFilePath, clearTranslationCache, isTranslationCached } from "./loader/loadTranslation";
export type { LoadedTranslation, TranslationCache, AllTranslationsResult } from "./loader/loadTranslation";

// Validation
export { validateTranslation, validateAllTranslations, getRequiredKeys, getValueByPath, hasValue, generateMissingKeysTemplate, countTodoItems } from "./validation/validateTranslation";
export type { ValidateAllResult } from "./validation/validateTranslation";

// Hooks
export { useTranslationsV4, createTranslationFunctions } from "./hooks/useTranslations";
export type { TranslationFunctions } from "./hooks/useTranslations";
