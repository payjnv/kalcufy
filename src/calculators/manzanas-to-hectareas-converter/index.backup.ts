import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";

// 1 manzana = 6,987.295 m² (10,000 varas² where vara = 0.8359m)
// 1 hectárea = 10,000 m²
// 1 manzana ≈ 0.6987295 hectáreas
const MZ_TO_M2 = 6987.295;
const HA_TO_M2 = 10000;
const MZ_TO_HA = MZ_TO_M2 / HA_TO_M2; // 0.6987295
const ACRE_TO_M2 = 4046.8564224;

export const manzanasToHectareasConfig: CalculatorConfigV4 = {
  id: "manzanas-to-hectareas",
  version: "4.0",
  category: "conversion",
  icon: "🌾",
  presets: [
    { id: "smallFarm", icon: "🏡", values: { mzValue: 1 } },
    { id: "mediumFarm", icon: "🌾", values: { mzValue: 5 } },
    { id: "largeFarm", icon: "🚜", values: { mzValue: 10 } },
    { id: "estate", icon: "🏞️", values: { mzValue: 50 } },
  ],
  t: {
    en: {
      name: "Manzanas to Hectares Converter", slug: "manzanas-to-hectares-converter",
      subtitle: "Convert manzanas to hectares, acres, and square meters — the standard land unit in Central America.",
      breadcrumb: "Manzanas to Hectares",
      seo: {
        title: "Manzanas to Hectares Converter - Central American Land Unit",
        description: "Convert manzanas to hectares instantly. Used in El Salvador, Honduras, Nicaragua, Guatemala, and Costa Rica for land measurement. 1 manzana ≈ 0.7 hectares.",
        shortDescription: "Convert manzanas to hectares for Central American land.",
        keywords: ["manzanas to hectares", "manzana converter", "manzana to hectare", "central america land unit", "manzana area", "convert manzana", "how many hectares in a manzana", "manzana to acres"],
      },
      calculator: { yourInformation: "Enter Value" },
      ui: { yourInformation: "Enter Value", calculate: "Convert", reset: "Reset", results: "Results" },
      inputs: { mzValue: { label: "Manzanas", helpText: "Enter the number of manzanas to convert" } },
      results: { hectares: { label: "Hectares" }, acres: { label: "Acres" }, m2: { label: "Square Meters" }, km2: { label: "Square Kilometers" }, varas2: { label: "Varas²" } },
      presets: {
        smallFarm: { label: "1 Manzana", description: "Small plot" },
        mediumFarm: { label: "5 Manzanas", description: "Medium farm" },
        largeFarm: { label: "10 Manzanas", description: "Large farm" },
        estate: { label: "50 Manzanas", description: "Estate / Hacienda" },
      },
      values: { ha: "ha", ac: "acres", m2: "m²", km2: "km²", v2: "varas²", mz: "mz" },
      formats: { summary: "{mzValue} manzanas = {hectares} hectares" },
      infoCards: {
        quickConversions: {
          title: "Quick Reference",
          items: [
            { label: "1 manzana", valueKey: "ref1" }, { label: "2 manzanas", valueKey: "ref2" },
            { label: "5 manzanas", valueKey: "ref5" }, { label: "10 manzanas", valueKey: "ref10" },
            { label: "20 manzanas", valueKey: "ref20" }, { label: "100 manzanas", valueKey: "ref100" },
          ],
        },
        tips: {
          title: "Conversion Tips",
          items: [
            "1 manzana ≈ 0.7 hectares (quick mental math: multiply by 0.7)",
            "1 manzana = 10,000 varas² — the original definition from colonial times",
            "The manzana varies slightly by country: ~6,987 m² is the standard (vara = 0.8359m)",
            "For acres: 1 manzana ≈ 1.727 acres — roughly 1¾ acres",
          ],
        },
      },
      education: {
        howToConvert: { title: "How to Convert Manzanas to Hectares", content: "To convert manzanas to hectares, multiply the number of manzanas by 0.6987295. This factor comes from the definition: one manzana equals 10,000 square varas, and one vara is 0.8359 meters, making one manzana equal to 6,987.295 square meters. Since one hectare is 10,000 square meters, the conversion is 6,987.295 ÷ 10,000 = 0.6987295 hectares per manzana. For quick estimates, multiplying by 0.7 gives a result accurate to within 0.2%. This unit is widely used in El Salvador, Honduras, Nicaragua, Guatemala, and Costa Rica for agricultural land and real estate transactions." },
        commonUses: { title: "Where the Manzana Is Used Today", content: "The manzana remains the primary land measurement unit in much of Central America, especially for agricultural and rural real estate. In El Salvador, property listings, land titles, and agricultural reports all use manzanas. Honduran coffee farmers measure their plantations in manzanas — a typical small coffee farm is 3 to 10 manzanas. Nicaraguan cattle ranches often span hundreds of manzanas. Guatemalan real estate listings for rural properties quote prices per manzana. Even Costa Rica, despite officially using the metric system, still sees manzanas in rural property transactions. International NGOs and development organizations working in Central America must convert between manzanas and hectares regularly for project planning and reporting." },
        examples: {
          title: "Conversion Examples", description: "Step-by-step manzana to hectare conversions",
          examples: [
            { title: "Convert 3 manzanas to hectares", steps: ["Formula: hectares = manzanas × 0.6987295", "3 × 0.6987295 = 2.0962", "3 manzanas = 2.10 hectares"], result: "3 mz = 2.10 ha" },
            { title: "Convert 15 manzanas to acres", steps: ["First to m²: 15 × 6,987.295 = 104,809 m²", "Then to acres: 104,809 ÷ 4,046.86 = 25.90", "15 manzanas = 25.90 acres"], result: "15 mz = 25.90 acres" },
          ],
        },
      },
      faqs: [
        { question: "How many hectares is 1 manzana?", answer: "1 manzana equals approximately 0.6987 hectares, or about 0.7 ha for quick estimates." },
        { question: "How many acres is 1 manzana?", answer: "1 manzana equals approximately 1.727 acres, or roughly 1¾ acres." },
        { question: "Which countries use the manzana?", answer: "The manzana is used in El Salvador, Honduras, Nicaragua, Guatemala, Costa Rica, and parts of Belize for land measurement." },
        { question: "Why does the manzana size vary by country?", answer: "The manzana is defined as 10,000 square varas, but the vara length differs slightly between countries. The standard vara of 0.8359m gives 6,987.295 m². In practice, most countries round to approximately 7,000 m²." },
        { question: "Is the manzana still legally recognized?", answer: "Yes, in several Central American countries the manzana is legally recognized in property titles, land registries, and real estate transactions alongside metric units." },
        { question: "How do I convert manzanas to square meters?", answer: "Multiply manzanas by 6,987.295 to get square meters. For example, 2 manzanas = 13,974.59 m²." },
      ],
      rating: { title: "Rate this Converter", share: "Share", copied: "Copied!", copyLink: "Copy Link", clickToRate: "Click to rate", youRated: "You rated", stars: "stars", averageFrom: "average from", ratings: "ratings" },
      common: { home: "Home", calculators: "Calculators" },
      buttons: { calculate: "Convert", reset: "Reset", pdf: "PDF", csv: "CSV", excel: "Excel", save: "Save", saved: "Saved", saving: "Saving..." },
      share: { calculatedWith: "Converted with Kalcufy.com" },
      accessibility: { mobileResults: "Results", closeModal: "Close", openMenu: "Menu" },
      sources: { title: "Sources & References" },
      detailedTable: { conversionTable: { button: "View Full Conversion Table", title: "Manzanas to Hectares Conversion Table", columns: { mz: "Manzanas", ha: "Hectares", acres: "Acres", m2: "Square Meters" } } },
    },
  },
  inputs: [{ id: "mzValue", type: "number", defaultValue: null, placeholder: "5", min: 0.001, max: 100000000, step: 0.01, suffix: "mz" }],
  inputGroups: [],
  results: [
    { id: "hectares", type: "primary", format: "number" },
    { id: "acres", type: "secondary", format: "number" },
    { id: "m2", type: "secondary", format: "number" },
    { id: "km2", type: "secondary", format: "number" },
    { id: "varas2", type: "secondary", format: "number" },
  ],
  infoCards: [ { id: "quickConversions", type: "list", icon: "📋", itemCount: 6 }, { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 } ],
  detailedTable: {
    id: "conversionTable", buttonLabel: "View Full Conversion Table", buttonIcon: "📊", modalTitle: "Manzanas to Hectares Conversion Table",
    columns: [ { id: "mz", label: "Manzanas", align: "center" }, { id: "ha", label: "Hectares", align: "right", highlight: true }, { id: "acres", label: "Acres", align: "right" }, { id: "m2", label: "Square Meters", align: "right" } ],
  },
  referenceData: [],
  educationSections: [ { id: "howToConvert", type: "prose", icon: "📖" }, { id: "commonUses", type: "prose", icon: "🌍" }, { id: "examples", type: "code-example", icon: "🧮", columns: 2, exampleCount: 2 } ],
  faqs: [{ id: "0" }, { id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }],
  references: [
    { authors: "United Nations Statistics Division", year: "1966", title: "World Weights and Measures: Handbook for Statisticians", source: "United Nations", url: "https://unstats.un.org/unsd/publication/SeriesM/SeriesM_21.pdf" },
    { authors: "Comité Metrológico, Ministerio de Fomento", year: "2024", title: "Tabla Oficial de Conversión de Unidades", source: "Centro de Investigación Metrológica (CIM), El Salvador", url: "https://www.cim.gob.sv/wp-content/uploads/2024/11/Tabla-oficial-del-SI-2024.pdf" },
  ],
  hero: { badge: "Free Tool", badgeVariant: "blue" as const },
  sidebar: { showNewsletter: true, showRelated: true },
  features: { export: true, save: true, share: true, rating: true },
  relatedCalculators: ["fanegadas-to-hectareas", "tareas-to-metros-cuadrados", "cuadras-to-hectareas", "varas-to-metros"],
  ads: { sidebar: true, footer: true },
};

export function calculateManzanasToHectareas(data: { values: Record<string, unknown>; fieldUnits?: Record<string, string>; t?: Record<string, unknown> }): CalculatorResults {
  const { values, t } = data;
  const v = (t?.values as Record<string, string>) || {};
  const f = (t?.formats as Record<string, string>) || {};
  const mzValue = values.mzValue as number | null;
  if (mzValue === null || mzValue === undefined || mzValue <= 0) return { values: {}, formatted: {}, summary: "", isValid: false };

  const m2 = mzValue * MZ_TO_M2;
  const hectares = m2 / HA_TO_M2;
  const acres = m2 / ACRE_TO_M2;
  const km2 = m2 / 1000000;
  const varas2 = mzValue * 10000;

  const haUnit = v["ha"] || "ha"; const acUnit = v["ac"] || "acres"; const m2Unit = v["m2"] || "m²"; const km2Unit = v["km2"] || "km²"; const v2Unit = v["v2"] || "varas²";
  const fmt = (n: number, d: number = 4) => n >= 1000 ? n.toLocaleString("en-US", { maximumFractionDigits: 2 }) : n.toFixed(d).replace(/0+$/, "").replace(/\.$/, "");

  const refMz = [1, 2, 5, 10, 20, 100];
  const refs: Record<string, string> = {};
  refMz.forEach((mz) => { refs[`ref${mz}`] = `${fmt(mz * MZ_TO_HA, 2)} ${haUnit}`; });

  const commonValues = [0.5, 1, 2, 3, 5, 7, 10, 15, 20, 25, 30, 50, 75, 100, 200, 500, mzValue];
  const uniqueVals = [...new Set(commonValues.map((v) => Math.round(v * 1000) / 1000))].sort((a, b) => a - b);
  const tableData = uniqueVals.map((mz) => ({
    mz: `${mz}`, ha: fmt(mz * MZ_TO_HA, 2), acres: fmt(mz * MZ_TO_M2 / ACRE_TO_M2, 2), m2: fmt(mz * MZ_TO_M2, 0),
  }));

  const summary = f.summary?.replace("{mzValue}", mzValue.toString()).replace("{hectares}", fmt(hectares, 2)) || `${mzValue} manzanas = ${fmt(hectares, 2)} hectares`;
  return {
    values: { hectares, acres, m2, km2, varas2, ...refs },
    formatted: { hectares: `${fmt(hectares, 2)} ${haUnit}`, acres: `${fmt(acres, 2)} ${acUnit}`, m2: `${fmt(m2, 0)} ${m2Unit}`, km2: `${fmt(km2)} ${km2Unit}`, varas2: `${fmt(varas2, 0)} ${v2Unit}`, ...refs },
    summary, isValid: true, metadata: { tableData },
  };
}

export default manzanasToHectareasConfig;
