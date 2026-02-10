import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";

// 1 tarea = 628.86 m² (Dominican Republic standard)
// 1 hectárea = 10,000 m²
// 1 tarea ≈ 0.062886 hectáreas
const TAREA_TO_M2 = 628.86;
const HA_TO_M2 = 10000;
const TAREA_TO_HA = TAREA_TO_M2 / HA_TO_M2;
const ACRE_TO_M2 = 4046.8564224;

export const tareasToMetrosCuadradosConfig: CalculatorConfigV4 = {
  id: "tareas-to-metros-cuadrados",
  version: "4.0",
  category: "conversion",
  icon: "🌴",
  presets: [
    { id: "smallLot", icon: "🏡", values: { tareaValue: 1 } },
    { id: "residentialLot", icon: "🏠", values: { tareaValue: 5 } },
    { id: "farm", icon: "🌾", values: { tareaValue: 50 } },],
  t: {
    en: {
      name: "Tareas to Square Meters Converter", slug: "tareas-to-square-meters-converter",
      subtitle: "Convert tareas to square meters, hectares, and acres — the Dominican Republic's land measurement unit.",
      breadcrumb: "Tareas to m²",
      seo: {
        title: "Tareas to Square Meters Converter - Dominican Land Unit",
        description: "Convert tareas to square meters and hectares. The tarea is the standard land unit in the Dominican Republic. 1 tarea = 628.86 m². Free online converter.",
        shortDescription: "Convert Dominican tareas to square meters.",
        keywords: ["tarea to square meters", "tarea converter", "tarea a metros cuadrados", "dominican republic land unit", "convert tarea", "tarea to hectare", "cuantos metros tiene una tarea", "tarea de tierra"],
      },
      calculator: { yourInformation: "Enter Value" },
      ui: { yourInformation: "Enter Value", calculate: "Convert", reset: "Reset", results: "Results" },
      inputs: { tareaValue: { label: "Tareas", helpText: "Enter the number of tareas to convert" } },
      results: { m2: { label: "Square Meters" }, hectares: { label: "Hectares" }, acres: { label: "Acres" }, km2: { label: "Square Kilometers" }, ft2: { label: "Square Feet" } },
      presets: {
        smallLot: { label: "1 Tarea", description: "628.86 m²" },
        residentialLot: { label: "5 Tareas", description: "Residential lot" },
        farm: { label: "50 Tareas", description: "Small farm" },
      },
      values: { m2: "m²", ha: "ha", ac: "acres", km2: "km²", ft2: "ft²", ta: "tareas" },
      formats: { summary: "{tareaValue} tareas = {m2} m²" },
      infoCards: {
        quickConversions: {
          title: "Quick Reference",
          items: [
            { label: "1 tarea", valueKey: "ref1" }, { label: "5 tareas", valueKey: "ref5" },
            { label: "10 tareas", valueKey: "ref10" }, { label: "50 tareas", valueKey: "ref50" },
            { label: "100 tareas", valueKey: "ref100" }, { label: "16 tareas", valueKey: "ref16" },
          ],
        },
        tips: {
          title: "Conversion Tips",
          items: [
            "1 tarea = 628.86 m² — roughly 25m × 25m",
            "Quick rule: 16 tareas ≈ 1 hectare (actually 15.9 tareas = 1 ha)",
            "For acres: 1 tarea ≈ 0.155 acres — about 1/6 of an acre",
            "Common lot sizes: residential 2-5 tareas, farms 50-500 tareas",
          ],
        },
      },
      education: {
        howToConvert: { title: "How to Convert Tareas to Square Meters", content: "To convert tareas to square meters, multiply the number of tareas by 628.86. This is the standard Dominican tarea based on a square of 25.07 meters per side (100 Dominican varas of 0.2507 m each, squared). To convert to hectares, multiply by 628.86 and divide by 10,000, or simply multiply by 0.062886. The quick rule that '16 tareas equals approximately 1 hectare' is widely used in the Dominican Republic — the exact number is 15.9 tareas per hectare. This conversion is essential for anyone buying property in the Dominican Republic, as land is almost exclusively measured in tareas." },
        commonUses: { title: "Where the Tarea Is Used Today", content: "The tarea is the universal land measurement unit in the Dominican Republic, used for everything from small residential lots to large agricultural properties. Real estate listings on Dominican property websites always quote land area in tareas. The Tribunal de Tierras (Land Court) and the Dirección Nacional de Mensuras Catastrales (National Cadastral Survey Office) use tareas in official documents. Agricultural production reports measure coffee, cacao, tobacco, and sugar cane yields per tarea. Construction permits reference lot sizes in tareas. Even casual conversations about property in the Dominican Republic use tareas — 'tengo un solar de 3 tareas' is how Dominicans describe lot sizes. Foreign buyers investing in Dominican real estate must understand this unit to navigate the market." },
        examples: {
          title: "Conversion Examples", description: "Step-by-step tarea conversions",
          examples: [
            { title: "Convert 10 tareas to square meters", steps: ["Formula: m² = tareas × 628.86", "10 × 628.86 = 6,288.6", "10 tareas = 6,288.6 m²"], result: "10 tareas = 6,288.6 m²" },
            { title: "How many tareas in 1 hectare?", steps: ["1 hectare = 10,000 m²", "Tareas = 10,000 ÷ 628.86", "= 15.9 tareas"], result: "1 hectare ≈ 15.9 tareas" },
          ],
        },
      },
      faqs: [
        { question: "How many square meters is 1 tarea?", answer: "1 tarea equals 628.86 square meters in the Dominican Republic." },
        { question: "How many tareas make 1 hectare?", answer: "Approximately 15.9 tareas equal 1 hectare (10,000 m² ÷ 628.86 m² = 15.9)." },
        { question: "How many tareas in an acre?", answer: "1 acre ≈ 6.44 tareas (4,046.86 m² ÷ 628.86 m² = 6.44)." },
        { question: "Is the tarea used only in the Dominican Republic?", answer: "The tarea of 628.86 m² is specific to the Dominican Republic. Puerto Rico also has a unit called 'tarea' but it equals approximately 3,930 m², which is much larger." },
        { question: "Why is the Dominican tarea 628.86 m²?", answer: "It is defined as a square of 100 Dominican varas per side, where 1 Dominican vara = 0.2507 meters. So (100 × 0.2507)² = 25.07² = 628.86 m²." },
        { question: "Is the tarea officially recognized?", answer: "Yes, the tarea is the standard land measurement in Dominican property law, used in the Tribunal Superior de Tierras, land titles (Certificados de Título), and cadastral surveys." },
      ],
      rating: { title: "Rate this Converter", share: "Share", copied: "Copied!", copyLink: "Copy Link", clickToRate: "Click to rate", youRated: "You rated", stars: "stars", averageFrom: "average from", ratings: "ratings" },
      common: { home: "Home", calculators: "Calculators" },
      buttons: { calculate: "Convert", reset: "Reset", pdf: "PDF", csv: "CSV", excel: "Excel", save: "Save", saved: "Saved", saving: "Saving..." },
      share: { calculatedWith: "Converted with Kalcufy.com" },
      accessibility: { mobileResults: "Results", closeModal: "Close", openMenu: "Menu" },
      sources: { title: "Sources & References" },
      detailedTable: { conversionTable: { button: "View Full Conversion Table", title: "Tareas to Square Meters Conversion Table", columns: { ta: "Tareas", m2: "Square Meters", ha: "Hectares", acres: "Acres" } } },
    },
  },
  inputs: [{ id: "tareaValue", type: "number", defaultValue: null, placeholder: "10", min: 0.001, max: 100000000, step: 0.01, suffix: "tareas" }],
  inputGroups: [],
  results: [
    { id: "m2", type: "primary", format: "number" },
    { id: "hectares", type: "secondary", format: "number" },
    { id: "acres", type: "secondary", format: "number" },
    { id: "km2", type: "secondary", format: "number" },
    { id: "ft2", type: "secondary", format: "number" },
  ],
  infoCards: [ { id: "quickConversions", type: "list", icon: "📋", itemCount: 6 }, { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 } ],
  detailedTable: {
    id: "conversionTable", buttonLabel: "View Full Conversion Table", buttonIcon: "📊", modalTitle: "Tareas to Square Meters Conversion Table",
    columns: [ { id: "ta", label: "Tareas", align: "center" }, { id: "m2", label: "Square Meters", align: "right", highlight: true }, { id: "ha", label: "Hectares", align: "right" }, { id: "acres", label: "Acres", align: "right" } ],
  },
  referenceData: [],
  educationSections: [ { id: "howToConvert", type: "prose", icon: "📖" }, { id: "commonUses", type: "prose", icon: "🌍" }, { id: "examples", type: "code-example", icon: "🧮", columns: 2, exampleCount: 2 } ],
  faqs: [{ id: "0" }, { id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }],
  references: [
    { authors: "Tribunal Superior de Tierras", year: "2023", title: "Jurisdicción Inmobiliaria de la República Dominicana", source: "Poder Judicial, República Dominicana", url: "https://www.poderjudicial.gob.do/" },
    { authors: "United Nations Statistics Division", year: "1966", title: "World Weights and Measures: Handbook for Statisticians", source: "United Nations", url: "https://unstats.un.org/unsd/publication/SeriesM/SeriesM_21.pdf" },
  ],
  hero: { badge: "Free Tool", badgeVariant: "blue" as const },
  sidebar: { showNewsletter: true, showRelated: true },
  features: { export: true, save: true, share: true, rating: true },
  relatedCalculators: ["manzanas-to-hectareas", "fanegadas-to-hectareas", "cuadras-to-hectareas", "varas-to-metros"],
  ads: { sidebar: true, footer: true },
};

export function calculateTareasToMetrosCuadrados(data: { values: Record<string, unknown>; fieldUnits?: Record<string, string>; t?: Record<string, unknown> }): CalculatorResults {
  const { values, t } = data;
  const v = (t?.values as Record<string, string>) || {};
  const f = (t?.formats as Record<string, string>) || {};
  const tareaValue = values.tareaValue as number | null;
  if (tareaValue === null || tareaValue === undefined || tareaValue <= 0) return { values: {}, formatted: {}, summary: "", isValid: false };

  const m2 = tareaValue * TAREA_TO_M2;
  const hectares = m2 / HA_TO_M2;
  const acres = m2 / ACRE_TO_M2;
  const km2 = m2 / 1000000;
  const ft2 = m2 * 10.7639;

  const m2Unit = v["m2"] || "m²"; const haUnit = v["ha"] || "ha"; const acUnit = v["ac"] || "acres"; const km2Unit = v["km2"] || "km²"; const ft2Unit = v["ft2"] || "ft²";
  const fmt = (n: number, d: number = 4) => n >= 1000 ? n.toLocaleString("en-US", { maximumFractionDigits: 2 }) : n.toFixed(d).replace(/0+$/, "").replace(/\.$/, "");

  const refTa = [1, 5, 10, 16, 50, 100];
  const refs: Record<string, string> = {};
  refTa.forEach((ta) => { refs[`ref${ta}`] = `${fmt(ta * TAREA_TO_M2, 0)} ${m2Unit}`; });

  const commonValues = [1, 2, 3, 5, 8, 10, 15, 16, 20, 25, 30, 50, 75, 100, 150, 200, 500, tareaValue];
  const uniqueVals = [...new Set(commonValues.map((v) => Math.round(v * 1000) / 1000))].sort((a, b) => a - b);
  const tableData = uniqueVals.map((ta) => ({
    ta: `${ta}`, m2: fmt(ta * TAREA_TO_M2, 0), ha: fmt(ta * TAREA_TO_HA, 4), acres: fmt(ta * TAREA_TO_M2 / ACRE_TO_M2, 3),
  }));

  const summary = f.summary?.replace("{tareaValue}", tareaValue.toString()).replace("{m2}", fmt(m2, 0)) || `${tareaValue} tareas = ${fmt(m2, 0)} m²`;
  return {
    values: { m2, hectares, acres, km2, ft2, ...refs },
    formatted: { m2: `${fmt(m2, 0)} ${m2Unit}`, hectares: `${fmt(hectares, 4)} ${haUnit}`, acres: `${fmt(acres, 3)} ${acUnit}`, km2: `${fmt(km2)} ${km2Unit}`, ft2: `${fmt(ft2, 0)} ${ft2Unit}`, ...refs },
    summary, isValid: true, metadata: { tableData },
  };
}

export default tareasToMetrosCuadradosConfig;
