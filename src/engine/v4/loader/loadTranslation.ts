// KALCUFY ENGINE V4 - TRANSLATION LOADER

import type { Locale, TranslationFile, CalculatorConfigV4 } from "../types/engine.types";
import { DEFAULT_LOCALE, REQUIRED_LOCALES } from "../types/engine.types";
import { MissingFileError, InvalidFormatError, V4ErrorCollection } from "../errors";

export interface LoadedTranslation {
  locale: Locale;
  data: TranslationFile;
  isFallback: boolean;
}

export interface TranslationCache {
  [calculatorId: string]: { [locale: string]: LoadedTranslation };
}

const translationCache: TranslationCache = {};

export function getTranslationPath(calculatorId: string, locale: Locale): string {
  return `@/calculators/${calculatorId}/translations/${locale}.json`;
}

export function getTranslationFilePath(calculatorId: string, locale: Locale): string {
  return `src/calculators/${calculatorId}/translations/${locale}.json`;
}

export async function loadTranslationFile(
  calculatorId: string,
  locale: Locale,
  isRequired: boolean = true
): Promise<TranslationFile | null> {
  const filePath = getTranslationFilePath(calculatorId, locale);
  try {
    const module = await import(`@/calculators/${calculatorId}/translations/${locale}.json`);
    return module.default as TranslationFile;
  } catch (error) {
    if (error instanceof Error && (error.message.includes("Cannot find module") || error.message.includes("Module not found"))) {
      if (isRequired) throw new MissingFileError(calculatorId, locale, filePath, true);
      return null;
    }
    if (error instanceof SyntaxError) {
      throw new InvalidFormatError(calculatorId, locale, filePath, error.message);
    }
    throw error;
  }
}

export async function loadTranslation(calculatorId: string, locale: Locale): Promise<LoadedTranslation> {
  if (translationCache[calculatorId]?.[locale]) {
    return translationCache[calculatorId][locale];
  }

  const isRequired = REQUIRED_LOCALES.includes(locale);
  let data = await loadTranslationFile(calculatorId, locale, isRequired);
  let isFallback = false;

  if (!data && locale !== DEFAULT_LOCALE) {
    data = await loadTranslationFile(calculatorId, DEFAULT_LOCALE, true);
    isFallback = true;
  }

  if (!data) {
    throw new MissingFileError(calculatorId, DEFAULT_LOCALE, getTranslationFilePath(calculatorId, DEFAULT_LOCALE), true);
  }

  const result: LoadedTranslation = { locale: isFallback ? DEFAULT_LOCALE : locale, data, isFallback };

  if (!translationCache[calculatorId]) translationCache[calculatorId] = {};
  translationCache[calculatorId][locale] = result;

  return result;
}

export interface AllTranslationsResult {
  translations: Map<Locale, LoadedTranslation>;
  errors: V4ErrorCollection;
}

export async function loadAllTranslations(calculatorId: string): Promise<AllTranslationsResult> {
  const translations = new Map<Locale, LoadedTranslation>();
  const errors = new V4ErrorCollection();
  const locales: Locale[] = ["en", "es", "pt"];

  for (const locale of locales) {
    try {
      const result = await loadTranslation(calculatorId, locale);
      translations.set(locale, result);
    } catch (error) {
      if (error instanceof MissingFileError || error instanceof InvalidFormatError) {
        errors.addError(error);
      } else {
        throw error;
      }
    }
  }
  return { translations, errors };
}

export function mergeTranslationWithConfig(translation: TranslationFile, config: CalculatorConfigV4): TranslationFile {
  const merged: TranslationFile = {
    calculator: {
      title: translation.calculator?.title || config.name,
      subtitle: translation.calculator?.subtitle || config.seo.shortDescription,
      breadcrumb: translation.calculator?.breadcrumb || config.name,
      yourInformation: translation.calculator?.yourInformation || "Your Information",
    },
    inputs: {},
    results: {},
    info: {},
    reference: {},
    education: {},
    faq: { title: translation.faq?.title || "Frequently Asked Questions" },
    sources: { title: translation.sources?.title || "Sources & References" },
    common: { home: translation.common?.home || "Home", calculators: translation.common?.calculators || "Calculators" },
    buttons: { calculate: translation.buttons?.calculate || "Calculate", reset: translation.buttons?.reset || "Reset", pdf: translation.buttons?.pdf || "PDF", excel: translation.buttons?.excel || "Excel", compare: translation.buttons?.compare || "Compare" },
    disclaimers: { health: translation.disclaimers?.health || "Results are estimates. Consult a professional.", finance: translation.disclaimers?.finance || "For informational purposes only." },
  };

  for (const input of config.inputs) {
    merged.inputs[input.id] = {
      label: translation.inputs?.[input.id]?.label || input.label,
      helpText: translation.inputs?.[input.id]?.helpText || input.helpText,
      suffix: translation.inputs?.[input.id]?.suffix || input.suffix,
      placeholder: translation.inputs?.[input.id]?.placeholder || input.placeholder,
    };
    if (input.options) {
      merged.inputs[input.id].options = {};
      for (const option of input.options) {
        merged.inputs[input.id].options![option.value] = translation.inputs?.[input.id]?.options?.[option.value] || option.label;
      }
    }
  }

  for (const result of config.results) {
    merged.results[result.id] = translation.results?.[result.id] || result.label;
  }

  for (const card of config.infoCards) {
    merged.info[card.id] = { title: translation.info?.[card.id]?.title || card.title };
    card.items.forEach((item, index) => {
      merged.info[card.id][String(index)] = translation.info?.[card.id]?.[String(index)] || item.label;
    });
  }

  for (const ref of config.referenceData) {
    merged.reference[ref.id] = { title: translation.reference?.[ref.id]?.title || ref.title, items: {} };
    ref.items.forEach((item, index) => {
      merged.reference[ref.id].items![String(index)] = translation.reference?.[ref.id]?.items?.[String(index)] || item.label;
    });
  }

  for (const section of config.educationSections) {
    merged.education[section.id] = { title: translation.education?.[section.id]?.title || section.title };
    if (section.type === "prose") merged.education[section.id].content = translation.education?.[section.id]?.content || section.content;
    if (section.type === "code-example") merged.education[section.id].description = translation.education?.[section.id]?.description || section.description;
    if (section.type === "list") {
      merged.education[section.id].items = {};
      section.items.forEach((item, index) => {
        merged.education[section.id].items![String(index)] = { text: translation.education?.[section.id]?.items?.[String(index)]?.text || item.text };
      });
    }
    if (section.type === "cards") {
      merged.education[section.id].cards = {};
      section.cards.forEach((card, index) => {
        merged.education[section.id].cards![String(index)] = {
          title: translation.education?.[section.id]?.cards?.[String(index)]?.title || card.title,
          description: translation.education?.[section.id]?.cards?.[String(index)]?.description || card.description,
        };
      });
    }
    if (section.type === "code-example") {
      merged.education[section.id].examples = {};
      section.examples.forEach((example, index) => {
        merged.education[section.id].examples![String(index)] = {
          title: translation.education?.[section.id]?.examples?.[String(index)]?.title || example.title,
          steps: {},
          result: translation.education?.[section.id]?.examples?.[String(index)]?.result || example.result,
        };
        example.steps.forEach((step, stepIndex) => {
          merged.education[section.id].examples![String(index)].steps[String(stepIndex)] = translation.education?.[section.id]?.examples?.[String(index)]?.steps?.[String(stepIndex)] || step;
        });
      });
    }
  }

  config.faqs.forEach((faq, index) => {
    const translatedFaq = translation.faq?.[String(index)];
    if (typeof translatedFaq === "object" && translatedFaq !== null) {
      merged.faq[String(index)] = { question: translatedFaq.question || faq.question, answer: translatedFaq.answer || faq.answer };
    } else {
      merged.faq[String(index)] = { question: faq.question, answer: faq.answer };
    }
  });

  return merged;
}

export function clearTranslationCache(calculatorId?: string): void {
  if (calculatorId) delete translationCache[calculatorId];
  else Object.keys(translationCache).forEach((key) => delete translationCache[key]);
}

export function isTranslationCached(calculatorId: string, locale: Locale): boolean {
  return !!translationCache[calculatorId]?.[locale];
}

export default loadTranslation;
