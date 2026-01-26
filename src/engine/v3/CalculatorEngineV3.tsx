"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useLocale } from "next-intl";
import { useSession } from "next-auth/react";
import Header from "@/components/Header";
import Link from "next/link";
import CalculatorSidebar from "@/components/CalculatorSidebar";
import AdBlock from "@/components/ads/AdBlock";
import MobileAdContainer from "@/components/ads/MobileAdContainer";
import SideSkyscraperAds from "@/components/ads/SideSkyscraperAds";
import { 
  InputCard, 
  ResultsCard, 
  ExampleSection, 
  SourcesSection, 
  ProseSection, 
  FAQAccordion, 
  MobileResultsBar, 
  ConsiderationsList,
  ModeSelector,
  DistributionBars,
  ReferenceGrid,
  InfoCard,
  WizardProgress,
  WizardNavigation,
  RatingShareWidget,
} from "./components";
import type { 
  CalculatorConfigV3, 
  CalculatorResults, 
  TranslationFn, 
  EducationSection, 
  InputConfig,
  ResultVisualization,
} from "./types/engine.types";

// =============================================================================
// CATEGORY DISCLAIMERS (E-E-A-T & Legal Protection)
// =============================================================================
const CATEGORY_DISCLAIMERS: Record<string, string> = {
  health: "Estimates are based on standard equations and may vary by individual. Not a substitute for professional medical advice.",
  finance: "Results are estimates for informational purposes only. Consult a financial advisor for personalized guidance.",
  pregnancy: "Estimates are based on standard medical guidelines. Always consult your healthcare provider for personalized care.",
  // Add more categories as needed:
  // legal: "This information is for general purposes only and does not constitute legal advice.",
  // tax: "Results are estimates only. Consult a tax professional for your specific situation.",
};

// =============================================================================
// VALIDATION
// =============================================================================
function validateRequiredSections(config: CalculatorConfigV3): void {
  const errors: string[] = [];
  
  if (!config.references || config.references.length < 2) {
    errors.push("references: minimum 2 sources required");
  }
  
  const hasExample = config.educationSections?.some(s => s.type === "code-example");
  if (!hasExample) {
    errors.push("educationSections: must include type code-example");
  }
  
  const listSection = config.educationSections?.find(s => s.type === "list");
  if (!listSection) {
    errors.push("educationSections: must include type list");
  } else if (!listSection.items || listSection.items.length < 5) {
    errors.push("educationSections list: minimum 5 items required");
  }
  
  const proseSections = config.educationSections?.filter(s => s.type === "prose") || [];
  if (proseSections.length < 3) {
    errors.push("educationSections: minimum 3 prose sections required");
  }
  
  if (!config.faqs || config.faqs.length < 6) {
    errors.push("faqs: minimum 6 FAQ items required");
  }
  
  if (!config.seo?.description || config.seo.description.length < 50) {
    errors.push("seo.description: minimum 50 characters required");
  }
  
  if (!config.seo?.keywords || config.seo.keywords.length < 3) {
    errors.push("seo.keywords: minimum 3 keywords required");
  }
  
  if (errors.length > 0) {
    console.error("❌ Calculator " + config.slug + " validation failed:");
    errors.forEach(e => console.error("   - " + e));
    throw new Error("Calculator " + config.slug + " missing required content: " + errors.join("; "));
  }
}

// =============================================================================
// HELPERS
// =============================================================================
function initializeValues(inputs: InputConfig[], mode?: string): Record<string, unknown> {
  const values: Record<string, unknown> = {};
  inputs.forEach((input) => {
    if (input.modes && mode && !input.modes.includes(mode)) return;
    if (input.type === "dynamic-list" && input.dynamicList?.defaultItems) {
      values[input.id] = input.dynamicList.defaultItems;
    } else {
      values[input.id] = input.defaultValue ?? (input.type === "radio" ? "" : input.type === "checkbox" ? false : 0);
    }
  });
  return values;
}

function initializeUnits(inputs: InputConfig[]): Record<string, string> {
  const units: Record<string, string> = {};
  inputs.forEach((input) => {
    if (input.units && input.units.length > 0) {
      units[input.id] = input.defaultUnit || input.units[0].value;
    }
  });
  return units;
}

function getVisibleInputs(inputs: InputConfig[], currentMode?: string): InputConfig[] {
  if (!currentMode) return inputs;
  return inputs.filter(input => {
    if (!input.modes) return true;
    return input.modes.includes(currentMode);
  });
}

// =============================================================================
// EDUCATION SECTION RENDERER
// =============================================================================
function RenderEducationSection({ section, t }: { section: EducationSection; t: TranslationFn }) {
  switch (section.type) {
    case "cards":
      return (
        <div className="bg-white rounded-2xl border border-slate-200 p-6" role="region" aria-labelledby={`section-${section.id}`}>
          <h3 id={`section-${section.id}`} className="text-lg font-bold text-slate-900 mb-4">
            {section.icon && <span aria-hidden="true">{section.icon} </span>}{section.title}
          </h3>
          <ul className="space-y-3 text-slate-600">
            {section.cards?.map((card, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-blue-500 mt-1" aria-hidden="true">•</span>
                <span><strong>{card.title}:</strong> {card.description}</span>
              </li>
            ))}
          </ul>
        </div>
      );
    case "list":
      return <ConsiderationsList title={section.title} icon={section.icon} items={section.items || []} t={t} />;
    case "code-example":
      return <ExampleSection title={section.title} icon={section.icon} description={section.description} examples={section.examples || []} columns={section.columns || 2} background={section.background === "slate" ? "slate" : "white"} t={t} />;
    case "prose":
      return <ProseSection title={section.title} content={section.content || ""} t={t} />;
    case "references":
      return <SourcesSection title={section.title} references={section.references || []} t={t} />;
    default:
      return null;
  }
}

// =============================================================================
// VISUALIZATION RENDERER
// =============================================================================
function RenderVisualization({ 
  visualization, 
  results, 
  t 
}: { 
  visualization: ResultVisualization; 
  results: CalculatorResults | null;
  t: TranslationFn;
}) {
  if (!results?.metadata) return null;

  switch (visualization.type) {
    case "distribution-bars":
      const distConfig = visualization.distributionBars;
      if (!distConfig) return null;
      const distData = results.metadata[distConfig.dataKey] as Array<Record<string, unknown>> | undefined;
      if (!distData || distData.length === 0) return null;
      
      const distributionItems = distData.map((item, i) => ({
        id: String(item.id || i),
        label: String(item[distConfig.labelField] || `Item ${i + 1}`),
        value: Number(item[distConfig.valueField] || 0),
        displayValue: item.displayValue ? String(item.displayValue) : undefined,
        max: distConfig.maxValue,
      }));
      
      return (
        <DistributionBars
          title={visualization.title || t("visualizations.distribution", "Distribution")}
          icon={visualization.icon}
          items={distributionItems}
          maxValue={distConfig.maxValue}
          gradient={true}
        />
      );

    case "reference-table":
      const refConfig = visualization.referenceTable;
      if (!refConfig?.items) return null;
      
      return (
        <ReferenceGrid
          title={visualization.title || t("visualizations.reference", "Reference")}
          icon={visualization.icon}
          items={refConfig.items}
          columns={refConfig.columns || 4}
          highlightValue={refConfig.highlightCurrent ? results.values[refConfig.highlightCurrent] as string : undefined}
        />
      );

    default:
      return null;
  }
}

// =============================================================================
// PROPS
// =============================================================================
interface CalculatorEngineV3Props {
  config: CalculatorConfigV3;
  calculate: (data: { 
    values: Record<string, unknown>; 
    units: Record<string, string>; 
    unitSystem: "metric" | "imperial";
    mode?: string;
  }) => CalculatorResults;
  t: TranslationFn;
  getFormulaResults?: (results: CalculatorResults) => Array<{ name: string; value: number; description?: string }>;
  getRangeVisualization?: (results: CalculatorResults, state: unknown) => { current: number; ideal: number; min: number; max: number; rangeMin: number; rangeMax: number; unit: string } | null;
  getFrameSizeData?: (results: CalculatorResults) => { current: string; gender: string } | undefined;
}

// =============================================================================
// MAIN ENGINE COMPONENT
// =============================================================================
export default function CalculatorEngineV3({ 
  config, 
  calculate, 
  t, 
  getFormulaResults, 
  getRangeVisualization, 
  getFrameSizeData 
}: CalculatorEngineV3Props) {
  const locale = useLocale();
  
  validateRequiredSections(config);
  
  const { data: session } = useSession();
  const hasTrackedView = useRef(false);
  const hasTrackedCalculation = useRef(false);
  const resultsRef = useRef<HTMLDivElement>(null);
  const [resultsAnnouncement, setResultsAnnouncement] = useState("");

  // ═══════════════════════════════════════════════════════════════════════════
  // STATE
  // ═══════════════════════════════════════════════════════════════════════════
  const defaultMode = config.calculationModes?.default || config.calculationModes?.modes?.[0]?.id;
  const [currentMode, setCurrentMode] = useState<string | undefined>(defaultMode);
  const [values, setValues] = useState<Record<string, unknown>>(() => initializeValues(config.inputs, defaultMode));
  const [units, setUnits] = useState<Record<string, string>>(() => initializeUnits(config.inputs));
  const [unitSystem, setUnitSystem] = useState<"metric" | "imperial">(config.unitSystem?.default || "imperial");
  const [results, setResults] = useState<CalculatorResults | null>(null);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  // Wizard state
  const [currentStep, setCurrentStep] = useState(0);
  const wizardEnabled = config.wizard?.enabled || false;
  const totalSteps = config.wizard?.steps?.length || 0;

  // ═══════════════════════════════════════════════════════════════════════════
  // TRACKING
  // ═══════════════════════════════════════════════════════════════════════════
  useEffect(() => {
    if (hasTrackedView.current) return;
    hasTrackedView.current = true;
    fetch("/api/track", { 
      method: "POST", 
      headers: { "Content-Type": "application/json" }, 
      body: JSON.stringify({ calculatorSlug: config.slug, language: locale, type: "VIEW" }) 
    }).catch(() => {});
  }, [config.slug, locale]);

  // ═══════════════════════════════════════════════════════════════════════════
  // CALCULATION
  // ═══════════════════════════════════════════════════════════════════════════
  useEffect(() => {
    const newResults = calculate({ values, units, unitSystem, mode: currentMode });
    setResults(newResults);
    
    if (newResults.isValid && newResults.summary) {
      setResultsAnnouncement(newResults.summary);
    }
    
    if (!hasTrackedCalculation.current && newResults.isValid) {
      hasTrackedCalculation.current = true;
      fetch("/api/track", { 
        method: "POST", 
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify({ calculatorSlug: config.slug, language: locale, type: "CALCULATION" }) 
      }).catch(() => {});
    }
  }, [values, units, unitSystem, currentMode, calculate, config.slug, locale]);

  // ═══════════════════════════════════════════════════════════════════════════
  // HANDLERS
  // ═══════════════════════════════════════════════════════════════════════════
  const setValue = useCallback((id: string, value: unknown) => { 
    setValues(prev => ({ ...prev, [id]: value })); 
  }, []);
  
  const setUnit = useCallback((id: string, unit: string) => { 
    setUnits(prev => ({ ...prev, [id]: unit })); 
  }, []);
  
  const handleUnitSystemChange = useCallback((system: "metric" | "imperial") => { 
    setUnitSystem(system); 
  }, []);

  const handleModeChange = useCallback((modeId: string) => {
    setCurrentMode(modeId);
    const modeConfig = config.calculationModes?.modes?.find(m => m.id === modeId);
    if (modeConfig?.defaultValues) {
      setValues(prev => ({ ...prev, ...modeConfig.defaultValues }));
    }
  }, [config.calculationModes?.modes]);

  const saveToHistory = useCallback(async () => {
    if (!results?.isValid) return;
    setSaveStatus("saving");
    try {
      const response = await fetch("/api/history", { 
        method: "POST", 
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify({ 
          calculatorSlug: config.slug, 
          calculatorName: config.name, 
          category: config.category, 
          inputs: values, 
          results: results.values, 
          language: locale,
          mode: currentMode,
        }) 
      });
      if (response.ok) { 
        setSaveStatus("saved"); 
        setTimeout(() => setSaveStatus("idle"), 3000); 
      } else { 
        setSaveStatus("error"); 
      }
    } catch { 
      setSaveStatus("error"); 
    }
  }, [results, values, config.slug, config.name, config.category, locale, currentMode]);

  // Wizard handlers
  const handleWizardNext = () => {
    if (currentStep < totalSteps - 1) setCurrentStep(prev => prev + 1);
  };
  
  const handleWizardBack = () => {
    if (currentStep > 0) setCurrentStep(prev => prev - 1);
  };
  
  const handleWizardComplete = () => {};

  // ═══════════════════════════════════════════════════════════════════════════
  // DERIVED DATA
  // ═══════════════════════════════════════════════════════════════════════════
  const formulaResults = results && getFormulaResults ? getFormulaResults(results) : undefined;
  const rangeVisualization = results && getRangeVisualization ? getRangeVisualization(results, { values, units, unitSystem }) : undefined;
  const frameSizeData = results && getFrameSizeData ? getFrameSizeData(results) : undefined;
  
  const gridSections = config.educationSections?.filter((s) => s.type === "cards" || s.type === "list") || [];
  const fullWidthSections = config.educationSections?.filter((s) => s.type === "code-example") || [];
  const proseSections = config.educationSections?.filter((s) => s.type === "prose" || s.type === "references") || [];

  let visibleInputs = getVisibleInputs(config.inputs, currentMode);
  if (wizardEnabled && config.wizard?.steps) {
    const currentWizardStep = config.wizard.steps[currentStep];
    if (currentWizardStep) {
      visibleInputs = visibleInputs.filter(input => currentWizardStep.inputs.includes(input.id));
    }
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════════════════════════════════
  return (
    <>
      {/* Skip Link */}
      <a 
        href="#calculator-main" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg"
      >
        {t("accessibility.skipToCalculator", "Skip to calculator")}
      </a>
      
      {/* Live Region */}
      <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        {resultsAnnouncement}
      </div>

      <Header />
      <MobileAdContainer slot="calculator-mobile-top" position="top" />
      <SideSkyscraperAds />
      
      <main id="calculator-main" className="min-h-screen bg-white pb-32 md:pb-0" role="main">
        {/* ═══════════════════════════════════════════════════════════════════
            HERO SECTION
        ═══════════════════════════════════════════════════════════════════ */}
        <section className="bg-gradient-to-b from-blue-50 to-white pt-4 pb-0 md:py-6">
          <div className="container mx-auto px-4 max-w-6xl">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-slate-600 mb-4">
              <Link href={`/${locale}`} className="hover:text-blue-600 transition-colors">
                {t("common.home", "Home")}
              </Link>
              <span className="text-slate-400">/</span>
              <Link href={`/${locale}/calculators`} className="hover:text-blue-600 transition-colors">
                {t("common.calculators", "Calculators")}
              </Link>
              <span className="text-slate-400">/</span>
              <span className="text-slate-900 font-medium">{config.name}</span>
            </nav>
            
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-900">{config.name}</h1>
                <p className="text-slate-600 mt-1">{config.seo.shortDescription || config.seo.description}</p>
              </div>
              
              {/* Rating + Share Widget (Compact) */}
              <RatingShareWidget
                calculatorSlug={config.slug}
                calculatorName={config.name}
                compact={true}
              />
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            CALCULATOR SECTION
        ═══════════════════════════════════════════════════════════════════ */}
        <section className="py-8 md:py-12">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* LEFT COLUMN - INPUTS */}
              <div className="space-y-0">
                {/* Wizard Progress */}
                {wizardEnabled && config.wizard?.steps && (
                  <div className="bg-white rounded-t-2xl border border-b-0 border-slate-200 p-4">
                    <WizardProgress
                      steps={config.wizard.steps}
                      currentStep={currentStep}
                      onStepClick={setCurrentStep}
                      showNumbers={config.wizard.showStepNumbers}
                      allowClickPrevious={config.wizard.allowBack}
                      t={t}
                    />
                  </div>
                )}

                {/* Mode Selector */}
                {config.calculationModes?.enabled && config.calculationModes.modes && (
                  <div className={`bg-white ${wizardEnabled ? '' : 'rounded-t-2xl'} border border-b-0 border-slate-200 p-4 pb-0`}>
                    <ModeSelector
                      modes={config.calculationModes.modes}
                      currentMode={currentMode || ''}
                      onChange={handleModeChange}
                      style={config.calculationModes.style || 'buttons'}
                      t={t}
                    />
                  </div>
                )}

                {/* Input Card */}
                <InputCard 
                  inputs={visibleInputs} 
                  inputGroups={config.inputGroups} 
                  values={values} 
                  units={units} 
                  unitSystem={unitSystem} 
                  errors={{}} 
                  onChange={setValue} 
                  onUnitChange={setUnit} 
                  onUnitSystemChange={handleUnitSystemChange} 
                  t={t} 
                  showUnitSystemToggle={config.unitSystem?.enabled} 
                  unitSystemOptions={config.unitSystem?.options}
                  currentMode={currentMode}
                />

                {/* Wizard Navigation */}
                {wizardEnabled && config.wizard?.steps && (
                  <div className="bg-white rounded-b-2xl border border-t-0 border-slate-200 p-4">
                    <WizardNavigation
                      currentStep={currentStep}
                      totalSteps={totalSteps}
                      onBack={handleWizardBack}
                      onNext={handleWizardNext}
                      onComplete={handleWizardComplete}
                      canGoNext={true}
                      isLastStep={currentStep === totalSteps - 1}
                      t={t}
                    />
                  </div>
                )}
              </div>

              {/* RIGHT COLUMN - RESULTS */}
              <div className="space-y-4" ref={resultsRef}>
                {/* Main Results Card */}
                <ResultsCard 
                  results={results} 
                  resultConfigs={config.results} 
                  hasCalculated={true} 
                  isCalculating={false} 
                  t={t} 
                  onSave={config.features?.saveHistory !== false ? saveToHistory : undefined} 
                  saveStatus={saveStatus} 
                  showActions={true} 
                  formulaResults={formulaResults} 
                  rangeVisualization={rangeVisualization} 
                  frameSizeData={frameSizeData} 
                  detailedTable={config.detailedTable} 
                  detailedTableData={results?.metadata?.tableData}
                  currentMode={currentMode}
                />

                {/* Visualizations */}
                {config.visualizations?.map((viz) => (
                  <RenderVisualization
                    key={viz.id}
                    visualization={viz}
                    results={results}
                    t={t}
                  />
                ))}

                {/* Info Cards */}
                {config.infoCards?.map((card) => (
                  <InfoCard
                    key={card.id}
                    title={card.title}
                    icon={card.icon}
                    items={card.items}
                    layout={card.type}
                    columns={card.columns}
                  />
                ))}

                {/* Reference Data */}
                {config.referenceData?.map((ref) => (
                  <ReferenceGrid
                    key={ref.id}
                    title={ref.title}
                    icon={ref.icon}
                    items={ref.items}
                    columns={ref.columns || 4}
                  />
                ))}

                {/* Rating Widget (Full) - After all visualizations */}
                <RatingShareWidget
                  calculatorSlug={config.slug}
                  calculatorName={config.name}
                  compact={false}
                />

                {/* Category Disclaimer (E-E-A-T) */}
                {CATEGORY_DISCLAIMERS[config.category] && (
                  <p className="text-xs text-slate-400 text-center italic px-4">
                    {CATEGORY_DISCLAIMERS[config.category]}
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Desktop Ad After Results */}
        {config.ads?.afterResults !== false && (
          <section className="py-2 hidden md:block">
            <div className="container mx-auto px-4 max-w-6xl">
              <AdBlock slot="calculator-after-results" />
            </div>
          </section>
        )}

        {/* Education Grid */}
        {gridSections.length >= 2 && (
          <section className="py-8">
            <div className="container mx-auto px-4 max-w-6xl">
              <div className="grid md:grid-cols-2 gap-6">
                {gridSections.slice(0, 2).map((section) => (
                  <RenderEducationSection key={section.id} section={section} t={t} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Full Width Sections */}
        {fullWidthSections.map((section) => (
          <RenderEducationSection key={section.id} section={section} t={t} />
        ))}

        {/* Prose + Sidebar */}
        {(proseSections.length > 0 || (config.faqs && config.faqs.length > 0)) && (
          <section className="py-12">
            <div className="container mx-auto px-4 max-w-6xl">
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                  {proseSections.map((section) => (
                    <RenderEducationSection key={section.id} section={section} t={t} />
                  ))}
                  {config.references && config.references.length > 0 && (
                    <SourcesSection title={t("sources.title", "Sources & References")} references={config.references} t={t} />
                  )}
                  {config.faqs && config.faqs.length > 0 && (
                    <FAQAccordion faqs={config.faqs} t={t} calculatorSlug={config.slug} />
                  )}
                </div>
                <aside>
                  <CalculatorSidebar 
                    currentCalculator={config.slug} 
                    category={config.sidebar?.category || config.category} 
                    showCTA={config.sidebar?.showCTA !== false} 
                    ctaTitle={config.sidebar?.cta?.title} 
                    ctaDescription={config.sidebar?.cta?.description} 
                    ctaLink={config.sidebar?.cta?.link} 
                    ctaLinkText={config.sidebar?.cta?.linkText} 
                    relatedTags={[]} 
                  />
                </aside>
              </div>
            </div>
          </section>
        )}

        {/* Bottom Ad */}
        {config.ads?.bottom !== false && (
          <section className="py-8">
            <div className="container mx-auto px-4 max-w-4xl">
              <AdBlock slot="calculator-bottom" />
            </div>
          </section>
        )}
      </main>

      {/* Mobile Results Bar */}
      <MobileResultsBar 
        results={results} 
        hasCalculated={true} 
        primaryLabel={t("results.primaryLabel", config.results[0]?.label || "Result")} 
        primaryValue={results?.formatted[config.results[0]?.id] || "--"} 
        primaryUnit={config.results[0]?.suffix} 
        t={t} 
        onSave={config.features?.saveHistory !== false ? saveToHistory : undefined} 
        saveStatus={saveStatus} 
        isLoggedIn={!!session}
        resultConfigs={config.results}
      />
      <MobileAdContainer slot="calculator-mobile-bottom" position="bottom" />

      {/* Styles */}
      <style jsx global>{`
        .range-slider-small {
          -webkit-appearance: none;
          width: 100%;
          height: 6px;
          border-radius: 9999px;
          background: #e2e8f0;
          outline: none;
        }
        .range-slider-small:focus {
          outline: 2px solid #2563eb;
          outline-offset: 2px;
        }
        .range-slider-small::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #2563eb;
          border: 3px solid white;
          box-shadow: 0 2px 6px rgba(0,0,0,0.15);
          cursor: grab;
          margin-top: -7px;
        }
        .range-slider-small::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #2563eb;
          border: 3px solid white;
          box-shadow: 0 2px 6px rgba(0,0,0,0.15);
          cursor: grab;
        }
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border-width: 0;
        }
      `}</style>
    </>
  );
}
