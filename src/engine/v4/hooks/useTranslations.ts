// KALCUFY ENGINE V4 - USE TRANSLATIONS HOOK
"use client";

import { useMemo } from "react";
import type { Locale, TranslationFile, CalculatorConfigV4, FAQ, EducationSection } from "../types/engine.types";

export interface TranslationFunctions {
  t: (key: string, fallback?: string) => string;
  getTitle: () => string;
  getSubtitle: () => string;
  getBreadcrumb: () => string;
  getYourInformation: () => string;
  getInputLabel: (inputId: string) => string;
  getInputHelpText: (inputId: string) => string | undefined;
  getInputSuffix: (inputId: string) => string | undefined;
  getInputPlaceholder: (inputId: string) => string | undefined;
  getInputOption: (inputId: string, optionValue: string) => string;
  getResultLabel: (resultId: string) => string;
  getInfoCardTitle: (cardId: string) => string;
  getInfoCardItem: (cardId: string, index: number) => string;
  getReferenceTitle: (refId: string) => string;
  getReferenceItem: (refId: string, index: number) => string;
  getEducationTitle: (sectionId: string) => string;
  getEducationContent: (sectionId: string) => string;
  getEducationDescription: (sectionId: string) => string;
  getEducationListItem: (sectionId: string, index: number) => string;
  getEducationCard: (sectionId: string, index: number) => { title: string; description: string };
  getEducationExample: (sectionId: string, index: number) => { title: string; steps: string[]; result: string };
  getFAQTitle: () => string;
  getFAQ: (index: number) => FAQ;
  getAllFAQs: () => FAQ[];
  getSourcesTitle: () => string;
  getCommonHome: () => string;
  getCommonCalculators: () => string;
  getButtonCalculate: () => string;
  getButtonReset: () => string;
  getButtonPDF: () => string;
  getButtonExcel: () => string;
  getButtonCompare: () => string;
  getHealthDisclaimer: () => string;
  getFinanceDisclaimer: () => string;
  getRawTranslation: () => TranslationFile;
  getLocale: () => Locale;
  isFallback: () => boolean;
}

export function createTranslationFunctions(
  translation: TranslationFile,
  config: CalculatorConfigV4,
  locale: Locale,
  isFallbackLocale: boolean = false
): TranslationFunctions {
  const t = (key: string, fallback?: string): string => {
    const parts = key.split(".");
    let current: unknown = translation;
    for (const part of parts) {
      if (current === null || current === undefined) return fallback || key;
      if (typeof current !== "object") return fallback || key;
      current = (current as Record<string, unknown>)[part];
    }
    if (typeof current === "string") return current;
    return fallback || key;
  };

  const getTitle = () => t("calculator.title", config.name);
  const getSubtitle = () => t("calculator.subtitle", config.seo.shortDescription);
  const getBreadcrumb = () => t("calculator.breadcrumb", config.name);
  const getYourInformation = () => t("calculator.yourInformation", "Your Information");

  const getInputLabel = (inputId: string) => {
    const input = config.inputs.find((i) => i.id === inputId);
    return t(`inputs.${inputId}.label`, input?.label || inputId);
  };
  const getInputHelpText = (inputId: string) => {
    const input = config.inputs.find((i) => i.id === inputId);
    const value = t(`inputs.${inputId}.helpText`, input?.helpText || "");
    return value || undefined;
  };
  const getInputSuffix = (inputId: string) => {
    const input = config.inputs.find((i) => i.id === inputId);
    const value = t(`inputs.${inputId}.suffix`, input?.suffix || "");
    return value || undefined;
  };
  const getInputPlaceholder = (inputId: string) => {
    const input = config.inputs.find((i) => i.id === inputId);
    const value = t(`inputs.${inputId}.placeholder`, input?.placeholder || "");
    return value || undefined;
  };
  const getInputOption = (inputId: string, optionValue: string) => {
    const input = config.inputs.find((i) => i.id === inputId);
    const option = input?.options?.find((o) => o.value === optionValue);
    return t(`inputs.${inputId}.options.${optionValue}`, option?.label || optionValue);
  };

  const getResultLabel = (resultId: string) => {
    const result = config.results.find((r) => r.id === resultId);
    return t(`results.${resultId}`, result?.label || resultId);
  };

  const getInfoCardTitle = (cardId: string) => {
    const card = config.infoCards.find((c) => c.id === cardId);
    return t(`info.${cardId}.title`, card?.title || cardId);
  };
  const getInfoCardItem = (cardId: string, index: number) => {
    const card = config.infoCards.find((c) => c.id === cardId);
    const item = card?.items[index];
    return t(`info.${cardId}.${index}`, item?.label || `Item ${index}`);
  };

  const getReferenceTitle = (refId: string) => {
    const ref = config.referenceData.find((r) => r.id === refId);
    return t(`reference.${refId}.title`, ref?.title || refId);
  };
  const getReferenceItem = (refId: string, index: number) => {
    const ref = config.referenceData.find((r) => r.id === refId);
    const item = ref?.items[index];
    return t(`reference.${refId}.items.${index}`, item?.label || `Item ${index}`);
  };

  const getEducationTitle = (sectionId: string) => {
    const section = config.educationSections.find((s) => s.id === sectionId);
    return t(`education.${sectionId}.title`, section?.title || sectionId);
  };
  const getEducationContent = (sectionId: string) => {
    const section = config.educationSections.find((s) => s.id === sectionId && s.type === "prose") as (EducationSection & { type: "prose" }) | undefined;
    return t(`education.${sectionId}.content`, section?.content || "");
  };
  const getEducationDescription = (sectionId: string) => {
    const section = config.educationSections.find((s) => s.id === sectionId && s.type === "code-example") as (EducationSection & { type: "code-example" }) | undefined;
    return t(`education.${sectionId}.description`, section?.description || "");
  };
  const getEducationListItem = (sectionId: string, index: number) => {
    const section = config.educationSections.find((s) => s.id === sectionId && s.type === "list") as (EducationSection & { type: "list" }) | undefined;
    const item = section?.items[index];
    return t(`education.${sectionId}.items.${index}.text`, item?.text || `Item ${index}`);
  };
  const getEducationCard = (sectionId: string, index: number) => {
    const section = config.educationSections.find((s) => s.id === sectionId && s.type === "cards") as (EducationSection & { type: "cards" }) | undefined;
    const card = section?.cards[index];
    return {
      title: t(`education.${sectionId}.cards.${index}.title`, card?.title || `Card ${index}`),
      description: t(`education.${sectionId}.cards.${index}.description`, card?.description || ""),
    };
  };
  const getEducationExample = (sectionId: string, index: number) => {
    const section = config.educationSections.find((s) => s.id === sectionId && s.type === "code-example") as (EducationSection & { type: "code-example" }) | undefined;
    const example = section?.examples[index];
    const steps: string[] = [];
    if (example?.steps) {
      example.steps.forEach((step, stepIndex) => {
        steps.push(t(`education.${sectionId}.examples.${index}.steps.${stepIndex}`, step));
      });
    }
    return {
      title: t(`education.${sectionId}.examples.${index}.title`, example?.title || `Example ${index}`),
      steps,
      result: t(`education.${sectionId}.examples.${index}.result`, example?.result || ""),
    };
  };

  const getFAQTitle = () => t("faq.title", "Frequently Asked Questions");
  const getFAQ = (index: number): FAQ => {
    const configFaq = config.faqs[index];
    const translatedFaq = translation.faq?.[String(index)];
    if (typeof translatedFaq === "object" && translatedFaq !== null) {
      return { question: translatedFaq.question || configFaq?.question || `Question ${index}`, answer: translatedFaq.answer || configFaq?.answer || `Answer ${index}` };
    }
    return { question: configFaq?.question || `Question ${index}`, answer: configFaq?.answer || `Answer ${index}` };
  };
  const getAllFAQs = (): FAQ[] => config.faqs.map((_, index) => getFAQ(index));

  const getSourcesTitle = () => t("sources.title", "Sources & References");
  const getCommonHome = () => t("common.home", "Home");
  const getCommonCalculators = () => t("common.calculators", "Calculators");
  const getButtonCalculate = () => t("buttons.calculate", "Calculate");
  const getButtonReset = () => t("buttons.reset", "Reset");
  const getButtonPDF = () => t("buttons.pdf", "PDF");
  const getButtonExcel = () => t("buttons.excel", "Excel");
  const getButtonCompare = () => t("buttons.compare", "Compare");
  const getHealthDisclaimer = () => t("disclaimers.health", "Results are estimates. Consult a professional.");
  const getFinanceDisclaimer = () => t("disclaimers.finance", "For informational purposes only.");

  const getRawTranslation = () => translation;
  const getLocale = () => locale;
  const isFallback = () => isFallbackLocale;

  return {
    t, getTitle, getSubtitle, getBreadcrumb, getYourInformation,
    getInputLabel, getInputHelpText, getInputSuffix, getInputPlaceholder, getInputOption,
    getResultLabel, getInfoCardTitle, getInfoCardItem, getReferenceTitle, getReferenceItem,
    getEducationTitle, getEducationContent, getEducationDescription, getEducationListItem, getEducationCard, getEducationExample,
    getFAQTitle, getFAQ, getAllFAQs, getSourcesTitle, getCommonHome, getCommonCalculators,
    getButtonCalculate, getButtonReset, getButtonPDF, getButtonExcel, getButtonCompare,
    getHealthDisclaimer, getFinanceDisclaimer, getRawTranslation, getLocale, isFallback,
  };
}

export function useTranslationsV4(
  translation: TranslationFile,
  config: CalculatorConfigV4,
  locale: Locale,
  isFallbackLocale: boolean = false
): TranslationFunctions {
  return useMemo(
    () => createTranslationFunctions(translation, config, locale, isFallbackLocale),
    [translation, config, locale, isFallbackLocale]
  );
}

export default useTranslationsV4;
