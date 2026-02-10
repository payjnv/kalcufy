import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";

// 1 cuadra cuadrada = 17,500 m² (Argentina/Uruguay standard)
// Based on 1 cuadra lineal = ~130 meters (150 varas)
// 1 hectárea = 10,000 m²
// 1 cuadra = 1.75 hectáreas
const CUADRA_TO_M2 = 17500;
const HA_TO_M2 = 10000;
const CUADRA_TO_HA = CUADRA_TO_M2 / HA_TO_M2; // 1.75
const ACRE_TO_M2 = 4046.8564224;

export const cuadrasToHectareasConfig: CalculatorConfigV4 = {
  id: "cuadras-to-hectareas",
  version: "4.0",
  category: "conversion",
  icon: "🐄",
  presets: [
    { id: "smallField", icon: "🌱", values: { cuadraValue: 1 } },
    { id: "mediumCampo", icon: "🌾", values: { cuadraValue: 10 } },
    { id: "estancia", icon: "🐄", values: { cuadraValue: 100 } },
    { id: "largeEstancia", icon: "🏞️", values: { cuadraValue: 500 } },
  ],
  t: {
    en: {
      name: "Cuadras to Hectares Converter", slug: "cuadras-to-hectares-converter",
      subtitle: "Convert cuadras to hectares, acres, and square meters — the traditional land unit of Argentina, Uruguay, and Paraguay.",
      breadcrumb: "Cuadras to Hectares",
      seo: {
        title: "Cuadras to Hectares Converter - Argentine Land Unit",
        description: "Convert cuadras to hectares instantly. The cuadra cuadrada is the traditional land unit in Argentina, Uruguay, and Paraguay. 1 cuadra = 1.75 hectares.",
        shortDescription: "Convert cuadras to hectares for South American land.",
        keywords: ["cuadra to hectare", "cuadra converter", "cuadra a hectarea", "argentine land unit", "convert cuadra", "cuadra cuadrada", "cuantas hectareas tiene una cuadra", "cuadra uruguay"],
      },
      calculator: { yourInformation: "Enter Value" },
      ui: { yourInformation: "Enter Value", calculate: "Convert", reset: "Reset", results: "Results" },
      inputs: { cuadraValue: { label: "Cuadras", helpText: "Enter the number of cuadras cuadradas to convert" } },
      results: { hectares: { label: "Hectares" }, acres: { label: "Acres" }, m2: { label: "Square Meters" }, km2: { label: "Square Kilometers" }, ft2: { label: "Square Feet" } },
      presets: {
        smallField: { label: "1 Cuadra", description: "1.75 ha" },
        mediumCampo: { label: "10 Cuadras", description: "Medium campo" },
        estancia: { label: "100 Cuadras", description: "Estancia" },
        largeEstancia: { label: "500 Cuadras", description: "Large estancia" },
      },
      values: { ha: "ha", ac: "acres", m2: "m²", km2: "km²", ft2: "ft²" },
      formats: { summary: "{cuadraValue} cuadras = {hectares} hectares" },
      infoCards: {
        quickConversions: {
          title: "Quick Reference",
          items: [
            { label: "1 cuadra", valueKey: "ref1" }, { label: "5 cuadras", valueKey: "ref5" },
            { label: "10 cuadras", valueKey: "ref10" }, { label: "50 cuadras", valueKey: "ref50" },
            { label: "100 cuadras", valueKey: "ref100" }, { label: "1,000 cuadras", valueKey: "ref1000" },
          ],
        },
        tips: {
          title: "Conversion Tips",
          items: [
            "1 cuadra = 1.75 hectares — multiply cuadras by 1.75 for a quick conversion",
            "1 cuadra = 17,500 m² — about 132m × 132m",
            "For acres: 1 cuadra ≈ 4.33 acres — over 4 acres",
            "Argentine estancias are often measured in cuadras: a 100-cuadra campo = 175 hectares",
          ],
        },
      },
      education: {
        howToConvert: { title: "How to Convert Cuadras to Hectares", content: "To convert cuadras to hectares, multiply the number of cuadras by 1.75. One cuadra cuadrada equals 17,500 square meters, and since one hectare is 10,000 square meters, the ratio is 17,500 ÷ 10,000 = 1.75. The cuadra originated as a linear measurement of about 130 meters (150 varas), and the cuadra cuadrada is a square with sides of that length. This unit is deeply rooted in the agricultural tradition of the Río de la Plata region, where vast estancias have been measured in cuadras for centuries. Understanding this conversion is essential for anyone dealing with rural real estate in Argentina, Uruguay, or Paraguay." },
        commonUses: { title: "Where the Cuadra Is Used Today", content: "The cuadra remains in active use in Argentina, Uruguay, and Paraguay for rural land measurement. Argentine estancias in the Pampa, Patagonia, and the provinces of Buenos Aires, Santa Fe, Córdoba, and Entre Ríos are traditionally described in cuadras. Real estate listings for campo (rural property) in Argentina frequently quote sizes in cuadras alongside hectares. Uruguayan rural properties, especially cattle ranches in the departments of Tacuarembó, Cerro Largo, and Salto, use cuadras. In Paraguay, rural land in the Chaco and eastern departments is also measured in cuadras. Notaries, surveyors, and agricultural cooperatives in these countries routinely convert between cuadras and hectares. The unit persists in conversation even among city dwellers discussing family estancias." },
        examples: {
          title: "Conversion Examples", description: "Step-by-step cuadra conversions",
          examples: [
            { title: "Convert 50 cuadras to hectares (medium estancia)", steps: ["Formula: hectares = cuadras × 1.75", "50 × 1.75 = 87.5", "50 cuadras = 87.5 hectares"], result: "50 cuadras = 87.5 ha" },
            { title: "Convert 200 cuadras to acres (large campo)", steps: ["First to m²: 200 × 17,500 = 3,500,000 m²", "Then to acres: 3,500,000 ÷ 4,046.86 = 864.9", "200 cuadras ≈ 865 acres"], result: "200 cuadras = 865 acres" },
          ],
        },
      },
      faqs: [
        { question: "How many hectares is 1 cuadra?", answer: "1 cuadra cuadrada = 1.75 hectares (17,500 m²)." },
        { question: "How many acres is 1 cuadra?", answer: "1 cuadra ≈ 4.33 acres." },
        { question: "Which countries use the cuadra?", answer: "The cuadra cuadrada is used in Argentina, Uruguay, and Paraguay for rural land measurement." },
        { question: "What is the difference between a cuadra lineal and a cuadra cuadrada?", answer: "A cuadra lineal is a unit of distance (~130 meters, also used for city blocks). A cuadra cuadrada is a unit of area (17,500 m²) used for land measurement. This converter handles cuadras cuadradas (area)." },
        { question: "How many cuadras in 1 hectare?", answer: "1 hectare = 0.5714 cuadras (10,000 ÷ 17,500 ≈ 0.57). So roughly 4 hectares = 2.3 cuadras." },
        { question: "Is the cuadra still legally recognized?", answer: "While Argentina, Uruguay, and Paraguay officially use the metric system, the cuadra appears in historical property titles, estancia records, and is widely understood by notaries and surveyors. Many rural property transactions still reference cuadras." },
      ],
      rating: { title: "Rate this Converter", share: "Share", copied: "Copied!", copyLink: "Copy Link", clickToRate: "Click to rate", youRated: "You rated", stars: "stars", averageFrom: "average from", ratings: "ratings" },
      common: { home: "Home", calculators: "Calculators" },
      buttons: { calculate: "Convert", reset: "Reset", pdf: "PDF", csv: "CSV", excel: "Excel", save: "Save", saved: "Saved", saving: "Saving..." },
      share: { calculatedWith: "Converted with Kalcufy.com" },
      accessibility: { mobileResults: "Results", closeModal: "Close", openMenu: "Menu" },
      sources: { title: "Sources & References" },
      detailedTable: { conversionTable: { button: "View Full Conversion Table", title: "Cuadras to Hectares Conversion Table", columns: { cuadras: "Cuadras", ha: "Hectares", acres: "Acres", m2: "Square Meters" } } },
    },
  },
  inputs: [{ id: "cuadraValue", type: "number", defaultValue: null, placeholder: "10", min: 0.001, max: 100000000, step: 0.01, suffix: "cuadras" }],
  inputGroups: [],
  results: [
    { id: "hectares", type: "primary", format: "number" },
    { id: "acres", type: "secondary", format: "number" },
    { id: "m2", type: "secondary", format: "number" },
    { id: "km2", type: "secondary", format: "number" },
    { id: "ft2", type: "secondary", format: "number" },
  ],
  infoCards: [ { id: "quickConversions", type: "list", icon: "📋", itemCount: 6 }, { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 } ],
  detailedTable: {
    id: "conversionTable", buttonLabel: "View Full Conversion Table", buttonIcon: "📊", modalTitle: "Cuadras to Hectares Conversion Table",
    columns: [ { id: "cuadras", label: "Cuadras", align: "center" }, { id: "ha", label: "Hectares", align: "right", highlight: true }, { id: "acres", label: "Acres", align: "right" }, { id: "m2", label: "Square Meters", align: "right" } ],
  },
  referenceData: [],
  educationSections: [ { id: "howToConvert", type: "prose", icon: "📖" }, { id: "commonUses", type: "prose", icon: "🌍" }, { id: "examples", type: "code-example", icon: "🧮", columns: 2, exampleCount: 2 } ],
  faqs: [{ id: "0" }, { id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }],
  references: [
    { authors: "United Nations Statistics Division", year: "1966", title: "World Weights and Measures: Handbook for Statisticians", source: "United Nations", url: "https://unstats.un.org/unsd/publication/SeriesM/SeriesM_21.pdf" },
    { authors: "Instituto Nacional de Tecnología Agropecuaria (INTA)", year: "2023", title: "Unidades de medida agrarias en Argentina", source: "INTA Argentina", url: "https://www.argentina.gob.ar/inta" },
  ],
  hero: { badge: "Free Tool", badgeVariant: "blue" as const },
  sidebar: { showNewsletter: true, showRelated: true },
  features: { export: true, save: true, share: true, rating: true },
  relatedCalculators: ["manzanas-to-hectareas", "fanegadas-to-hectareas", "tareas-to-metros-cuadrados", "varas-to-metros"],
  ads: { sidebar: true, footer: true },
};

export function calculateCuadrasToHectareas(data: { values: Record<string, unknown>; fieldUnits?: Record<string, string>; t?: Record<string, unknown> }): CalculatorResults {
  const { values, t } = data;
  const v = (t?.values as Record<string, string>) || {};
  const f = (t?.formats as Record<string, string>) || {};
  const cuadraValue = values.cuadraValue as number | null;
  if (cuadraValue === null || cuadraValue === undefined || cuadraValue <= 0) return { values: {}, formatted: {}, summary: "", isValid: false };

  const m2 = cuadraValue * CUADRA_TO_M2;
  const hectares = m2 / HA_TO_M2;
  const acres = m2 / ACRE_TO_M2;
  const km2 = m2 / 1000000;
  const ft2 = m2 * 10.7639;

  const haUnit = v["ha"] || "ha"; const acUnit = v["ac"] || "acres"; const m2Unit = v["m2"] || "m²"; const km2Unit = v["km2"] || "km²"; const ft2Unit = v["ft2"] || "ft²";
  const fmt = (n: number, d: number = 4) => n >= 1000 ? n.toLocaleString("en-US", { maximumFractionDigits: 2 }) : n.toFixed(d).replace(/0+$/, "").replace(/\.$/, "");

  const refCuadras = [1, 5, 10, 50, 100, 1000];
  const refs: Record<string, string> = {};
  refCuadras.forEach((c) => { refs[`ref${c}`] = `${fmt(c * CUADRA_TO_HA, 2)} ${haUnit}`; });

  const commonValues = [0.5, 1, 2, 3, 5, 10, 15, 20, 25, 50, 75, 100, 200, 500, 1000, cuadraValue];
  const uniqueVals = [...new Set(commonValues.map((v) => Math.round(v * 1000) / 1000))].sort((a, b) => a - b);
  const tableData = uniqueVals.map((c) => ({
    cuadras: `${c}`, ha: fmt(c * CUADRA_TO_HA, 2), acres: fmt(c * CUADRA_TO_M2 / ACRE_TO_M2, 1), m2: fmt(c * CUADRA_TO_M2, 0),
  }));

  const summary = f.summary?.replace("{cuadraValue}", cuadraValue.toString()).replace("{hectares}", fmt(hectares, 2)) || `${cuadraValue} cuadras = ${fmt(hectares, 2)} hectares`;
  return {
    values: { hectares, acres, m2, km2, ft2, ...refs },
    formatted: { hectares: `${fmt(hectares, 2)} ${haUnit}`, acres: `${fmt(acres, 1)} ${acUnit}`, m2: `${fmt(m2, 0)} ${m2Unit}`, km2: `${fmt(km2)} ${km2Unit}`, ft2: `${fmt(ft2, 0)} ${ft2Unit}`, ...refs },
    summary, isValid: true, metadata: { tableData },
  };
}

export default cuadrasToHectareasConfig;
