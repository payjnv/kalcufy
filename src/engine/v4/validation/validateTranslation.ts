// KALCUFY ENGINE V4 - TRANSLATION VALIDATION

import type { Locale, TranslationFile, CalculatorConfigV4, ValidationResult, ValidationError, TranslationProgress } from "../types/engine.types";
import { LOCALES, REQUIRED_LOCALES } from "../types/engine.types";

export function getRequiredKeys(config: CalculatorConfigV4): string[] {
  const keys: string[] = [];
  keys.push("calculator.title");

  for (const input of config.inputs) {
    keys.push(`inputs.${input.id}.label`);
    if (input.options) {
      for (const option of input.options) {
        keys.push(`inputs.${input.id}.options.${option.value}`);
      }
    }
  }

  for (const result of config.results) keys.push(`results.${result.id}`);

  for (const card of config.infoCards) {
    keys.push(`info.${card.id}.title`);
    card.items.forEach((_, index) => keys.push(`info.${card.id}.${index}`));
  }

  for (const ref of config.referenceData) {
    keys.push(`reference.${ref.id}.title`);
    ref.items.forEach((_, index) => keys.push(`reference.${ref.id}.items.${index}`));
  }

  for (const section of config.educationSections) {
    keys.push(`education.${section.id}.title`);
    if (section.type === "prose") keys.push(`education.${section.id}.content`);
    if (section.type === "list") section.items.forEach((_, index) => keys.push(`education.${section.id}.items.${index}.text`));
    if (section.type === "cards") {
      section.cards.forEach((_, index) => {
        keys.push(`education.${section.id}.cards.${index}.title`);
        keys.push(`education.${section.id}.cards.${index}.description`);
      });
    }
    if (section.type === "code-example") {
      keys.push(`education.${section.id}.description`);
      section.examples.forEach((example, index) => {
        keys.push(`education.${section.id}.examples.${index}.title`);
        keys.push(`education.${section.id}.examples.${index}.result`);
        example.steps.forEach((_, stepIndex) => keys.push(`education.${section.id}.examples.${index}.steps.${stepIndex}`));
      });
    }
  }

  config.faqs.forEach((_, index) => {
    keys.push(`faq.${index}.question`);
    keys.push(`faq.${index}.answer`);
  });

  return keys;
}

export function getValueByPath(obj: unknown, path: string): unknown {
  const parts = path.split(".");
  let current: unknown = obj;
  for (const part of parts) {
    if (current === null || current === undefined) return undefined;
    if (typeof current !== "object") return undefined;
    current = (current as Record<string, unknown>)[part];
  }
  return current;
}

export function hasValue(value: unknown): boolean {
  if (value === null || value === undefined) return false;
  if (typeof value === "string" && value.trim() === "") return false;
  return true;
}

export function validateTranslation(translation: TranslationFile, config: CalculatorConfigV4, locale: Locale): ValidationResult {
  const errors: ValidationError[] = [];
  const warnings: string[] = [];
  const requiredKeys = getRequiredKeys(config);
  const missingKeys: string[] = [];
  const emptyKeys: string[] = [];

  for (const key of requiredKeys) {
    const value = getValueByPath(translation, key);
    if (!hasValue(value)) {
      if (value === undefined) missingKeys.push(key);
      else emptyKeys.push(key);
    }
  }

  if (missingKeys.length > 0) {
    errors.push({ type: "missing_keys", calculator: config.id, locale, keys: missingKeys, message: `Missing ${missingKeys.length} translation keys` });
  }

  if (emptyKeys.length > 0) {
    warnings.push(`${emptyKeys.length} empty values found: ${emptyKeys.slice(0, 5).join(", ")}${emptyKeys.length > 5 ? "..." : ""}`);
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export interface ValidateAllResult {
  calculator: string;
  results: Map<Locale, ValidationResult>;
  isFullyValid: boolean;
  progress: TranslationProgress;
}

export async function validateAllTranslations(config: CalculatorConfigV4, translations: Map<Locale, TranslationFile>): Promise<ValidateAllResult> {
  const results = new Map<Locale, ValidationResult>();
  const requiredKeys = getRequiredKeys(config);
  const totalKeys = requiredKeys.length;
  const progress: TranslationProgress = { calculator: config.id, locales: [] };
  let isFullyValid = true;

  for (const locale of LOCALES) {
    const translation = translations.get(locale);
    if (!translation) {
      if (REQUIRED_LOCALES.includes(locale)) {
        isFullyValid = false;
        results.set(locale, { isValid: false, errors: [{ type: "missing_file", calculator: config.id, locale, message: `Missing required translation file for ${locale}` }], warnings: [] });
        progress.locales.push({ locale, isComplete: false, completedKeys: 0, totalKeys, missingKeys: requiredKeys });
      }
      continue;
    }

    const result = validateTranslation(translation, config, locale);
    results.set(locale, result);
    if (!result.isValid && REQUIRED_LOCALES.includes(locale)) isFullyValid = false;

    const missingKeys = result.errors.find((e) => e.type === "missing_keys")?.keys || [];
    const completedKeys = totalKeys - missingKeys.length;
    progress.locales.push({ locale, isComplete: result.isValid, completedKeys, totalKeys, missingKeys });
  }

  return { calculator: config.id, results, isFullyValid, progress };
}

export function generateMissingKeysTemplate(config: CalculatorConfigV4, existingTranslation?: TranslationFile): TranslationFile {
  const todo = (key: string, fallback: string): string => {
    if (existingTranslation) {
      const value = getValueByPath(existingTranslation, key);
      if (typeof value === "string" && value.trim() !== "" && !value.startsWith("TODO:")) return value;
    }
    return `TODO: ${fallback}`;
  };

  const template: TranslationFile = {
    calculator: { title: todo("calculator.title", config.name), subtitle: todo("calculator.subtitle", config.seo.shortDescription), breadcrumb: todo("calculator.breadcrumb", config.name) },
    inputs: {},
    results: {},
    info: {},
    reference: {},
    education: {},
    faq: { title: todo("faq.title", "Frequently Asked Questions") },
    sources: { title: todo("sources.title", "Sources & References") },
    common: { home: todo("common.home", "Home"), calculators: todo("common.calculators", "Calculators") },
    buttons: { calculate: todo("buttons.calculate", "Calculate"), reset: todo("buttons.reset", "Reset"), pdf: todo("buttons.pdf", "PDF"), excel: todo("buttons.excel", "Excel") },
    disclaimers: { health: todo("disclaimers.health", "Results are estimates."), finance: todo("disclaimers.finance", "For informational purposes only.") },
  };

  for (const input of config.inputs) {
    template.inputs[input.id] = { label: todo(`inputs.${input.id}.label`, input.label) };
    if (input.helpText) template.inputs[input.id].helpText = todo(`inputs.${input.id}.helpText`, input.helpText);
    if (input.options) {
      template.inputs[input.id].options = {};
      for (const option of input.options) {
        template.inputs[input.id].options![option.value] = todo(`inputs.${input.id}.options.${option.value}`, option.label);
      }
    }
  }

  for (const result of config.results) template.results[result.id] = todo(`results.${result.id}`, result.label);

  for (const card of config.infoCards) {
    template.info[card.id] = { title: todo(`info.${card.id}.title`, card.title) };
    card.items.forEach((item, index) => { template.info[card.id][String(index)] = todo(`info.${card.id}.${index}`, item.label); });
  }

  for (const ref of config.referenceData) {
    template.reference[ref.id] = { title: todo(`reference.${ref.id}.title`, ref.title), items: {} };
    ref.items.forEach((item, index) => { template.reference[ref.id].items![String(index)] = todo(`reference.${ref.id}.items.${index}`, item.label); });
  }

  for (const section of config.educationSections) {
    template.education[section.id] = { title: todo(`education.${section.id}.title`, section.title) };
    if (section.type === "prose") template.education[section.id].content = todo(`education.${section.id}.content`, section.content.substring(0, 50) + "...");
    if (section.type === "code-example") template.education[section.id].description = todo(`education.${section.id}.description`, section.description);
    if (section.type === "list") {
      template.education[section.id].items = {};
      section.items.forEach((item, index) => { template.education[section.id].items![String(index)] = { text: todo(`education.${section.id}.items.${index}.text`, item.text) }; });
    }
    if (section.type === "cards") {
      template.education[section.id].cards = {};
      section.cards.forEach((card, index) => {
        template.education[section.id].cards![String(index)] = { title: todo(`education.${section.id}.cards.${index}.title`, card.title), description: todo(`education.${section.id}.cards.${index}.description`, card.description) };
      });
    }
    if (section.type === "code-example") {
      template.education[section.id].examples = {};
      section.examples.forEach((example, index) => {
        template.education[section.id].examples![String(index)] = { title: todo(`education.${section.id}.examples.${index}.title`, example.title), steps: {}, result: todo(`education.${section.id}.examples.${index}.result`, example.result) };
        example.steps.forEach((step, stepIndex) => { template.education[section.id].examples![String(index)].steps[String(stepIndex)] = todo(`education.${section.id}.examples.${index}.steps.${stepIndex}`, step); });
      });
    }
  }

  config.faqs.forEach((faq, index) => {
    template.faq[String(index)] = { question: todo(`faq.${index}.question`, faq.question), answer: todo(`faq.${index}.answer`, faq.answer) };
  });

  return template;
}

export function countTodoItems(translation: TranslationFile): number {
  let count = 0;
  function traverse(obj: unknown): void {
    if (typeof obj === "string") { if (obj.startsWith("TODO:")) count++; }
    else if (typeof obj === "object" && obj !== null) { for (const value of Object.values(obj)) traverse(value); }
  }
  traverse(translation);
  return count;
}

export default validateTranslation;
