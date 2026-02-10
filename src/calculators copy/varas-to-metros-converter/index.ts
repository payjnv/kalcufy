import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";

// Vara castellana standard: 0.8359 m (most common in Central America)
// Varies by country but 0.8359m is the international reference
const VARA_TO_M = 0.8359;

export const varasToMetrosConfig: CalculatorConfigV4 = {
  id: "varas-to-metros",
  version: "4.0",
  category: "conversion",
  icon: "📐",
  presets: [
    { id: "oneVara", icon: "📏", values: { varaValue: 1 } },
    { id: "lotFrontage", icon: "🏠", values: { varaValue: 12 } },
    { id: "manzanaSide", icon: "🌾", values: { varaValue: 100 } },],
  t: {
    en: {
      name: "Varas to Meters Converter", slug: "varas-to-meters-converter",
      subtitle: "Convert varas to meters, feet, and inches — the traditional Latin American unit of length.",
      breadcrumb: "Varas to Meters",
      seo: {
        title: "Varas to Meters Converter - Latin American Length Unit",
        description: "Convert varas to meters instantly. The vara is a traditional unit of length used across Latin America. 1 vara = 0.8359 meters. Free online converter.",
        shortDescription: "Convert varas to meters, feet, and inches.",
        keywords: ["vara to meters", "vara converter", "vara a metros", "cuanto mide una vara", "vara to feet", "convert vara", "vara castellana", "vara measurement"],
      },
      calculator: { yourInformation: "Enter Value" },
      ui: { yourInformation: "Enter Value", calculate: "Convert", reset: "Reset", results: "Results" },
      inputs: { varaValue: { label: "Varas", helpText: "Enter the number of varas to convert (standard vara = 0.8359m)" } },
      results: { meters: { label: "Meters" }, cm: { label: "Centimeters" }, feet: { label: "Feet" }, inches: { label: "Inches" }, yards: { label: "Yards" } },
      presets: {
        oneVara: { label: "1 Vara", description: "0.8359 m" },
        lotFrontage: { label: "12 Varas", description: "Typical lot frontage" },
        manzanaSide: { label: "100 Varas", description: "Side of 1 manzana" },
      },
      values: { m: "m", cm: "cm", ft: "ft", in: "in", yd: "yd" },
      formats: { summary: "{varaValue} varas = {meters} meters" },
      infoCards: {
        quickConversions: {
          title: "Quick Reference",
          items: [
            { label: "1 vara", valueKey: "ref1" }, { label: "5 varas", valueKey: "ref5" },
            { label: "10 varas", valueKey: "ref10" }, { label: "50 varas", valueKey: "ref50" },
            { label: "100 varas", valueKey: "ref100" }, { label: "1,000 varas", valueKey: "ref1000" },
          ],
        },
        tips: {
          title: "Conversion Tips",
          items: [
            "1 vara ≈ 0.836 meters — slightly shorter than 1 yard (0.914m)",
            "100 varas × 100 varas = 1 manzana (10,000 varas² = 6,987 m²)",
            "The vara is close to 33 inches or 2 feet 9 inches",
            "Vara sizes vary by country: 0.8359m (standard), 0.8 (Colombia), 0.84m (some regions)",
          ],
        },
      },
      education: {
        howToConvert: { title: "How to Convert Varas to Meters", content: "To convert varas to meters, multiply the number of varas by 0.8359. The vara castellana is a pre-metric Spanish unit of length that was brought to the Americas during colonization. One vara was originally defined as three pies castellanos (Castilian feet). The standard value of 0.8359 meters is the most widely accepted conversion, though the exact length varied slightly by region. In practice, the vara is about 83.6 centimeters, making it slightly shorter than an English yard. The vara remains important for understanding historical land measurements, property boundaries, and traditional unit systems still in use across Latin America." },
        commonUses: { title: "Where the Vara Is Used Today", content: "The vara survives in several Latin American countries, primarily in land measurement. In Central America (El Salvador, Honduras, Guatemala, Nicaragua), land areas are still measured in square varas — 10,000 square varas make one manzana, the standard unit for agricultural land. Property boundaries in old land titles and escrituras are often described in varas. Surveyors in rural areas may still encounter vara-based measurements when reviewing historical property documents. In some Mexican states, particularly in rural areas, the vara remains in colloquial use for describing distances and property dimensions. Texas and parts of the US Southwest also have historical property records in varas from the Spanish colonial period." },
        examples: {
          title: "Conversion Examples", description: "Step-by-step vara conversions",
          examples: [
            { title: "Convert 25 varas to meters (lot depth)", steps: ["Formula: meters = varas × 0.8359", "25 × 0.8359 = 20.8975", "25 varas ≈ 20.9 meters"], result: "25 varas = 20.9 m" },
            { title: "Convert 100 varas to feet (manzana side)", steps: ["First to meters: 100 × 0.8359 = 83.59 m", "Then to feet: 83.59 × 3.28084 = 274.2 ft", "100 varas ≈ 274 feet"], result: "100 varas = 274.2 ft" },
          ],
        },
      },
      faqs: [
        { question: "How long is 1 vara in meters?", answer: "1 vara (castellana standard) = 0.8359 meters, or about 83.6 centimeters." },
        { question: "How does the vara compare to a yard?", answer: "A vara (0.8359m) is about 8.5% shorter than a yard (0.9144m). A vara is approximately 33 inches vs. 36 inches for a yard." },
        { question: "Is the vara the same in all countries?", answer: "No, the vara varies slightly. Standard castellana: 0.8359m. Colombia: 0.80m. Some Texas/Mexican historical records: 0.8467m. This converter uses the 0.8359m standard." },
        { question: "What is a vara cuadrada?", answer: "A vara cuadrada (square vara) is the area of a square with sides of 1 vara. It equals 0.8359² = 0.6987 m². 10,000 varas cuadradas = 1 manzana." },
        { question: "Where is the vara still used today?", answer: "The vara survives in land measurement in Central America (El Salvador, Honduras, Guatemala, Nicaragua), parts of Mexico, Colombia, and in historical property records in Texas and the US Southwest." },
        { question: "How many varas in 1 meter?", answer: "1 meter = 1.1963 varas (1 ÷ 0.8359 = 1.1963)." },
      ],
      rating: { title: "Rate this Converter", share: "Share", copied: "Copied!", copyLink: "Copy Link", clickToRate: "Click to rate", youRated: "You rated", stars: "stars", averageFrom: "average from", ratings: "ratings" },
      common: { home: "Home", calculators: "Calculators" },
      buttons: { calculate: "Convert", reset: "Reset", pdf: "PDF", csv: "CSV", excel: "Excel", save: "Save", saved: "Saved", saving: "Saving..." },
      share: { calculatedWith: "Converted with Kalcufy.com" },
      accessibility: { mobileResults: "Results", closeModal: "Close", openMenu: "Menu" },
      sources: { title: "Sources & References" },
      detailedTable: { conversionTable: { button: "View Full Conversion Table", title: "Varas to Meters Conversion Table", columns: { varas: "Varas", meters: "Meters", feet: "Feet", inches: "Inches" } } },
    },
  },
  inputs: [{ id: "varaValue", type: "number", defaultValue: null, placeholder: "10", min: 0.001, max: 100000000, step: 0.1, suffix: "varas" }],
  inputGroups: [],
  results: [
    { id: "meters", type: "primary", format: "number" },
    { id: "cm", type: "secondary", format: "number" },
    { id: "feet", type: "secondary", format: "number" },
    { id: "inches", type: "secondary", format: "number" },
    { id: "yards", type: "secondary", format: "number" },
  ],
  infoCards: [ { id: "quickConversions", type: "list", icon: "📋", itemCount: 6 }, { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 } ],
  detailedTable: {
    id: "conversionTable", buttonLabel: "View Full Conversion Table", buttonIcon: "📊", modalTitle: "Varas to Meters Conversion Table",
    columns: [ { id: "varas", label: "Varas", align: "center" }, { id: "meters", label: "Meters", align: "right", highlight: true }, { id: "feet", label: "Feet", align: "right" }, { id: "inches", label: "Inches", align: "right" } ],
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
  relatedCalculators: ["manzanas-to-hectareas", "fanegadas-to-hectareas", "tareas-to-metros-cuadrados", "cuadras-to-hectareas"],
  ads: { sidebar: true, footer: true },
};

export function calculateVarasToMetros(data: { values: Record<string, unknown>; fieldUnits?: Record<string, string>; t?: Record<string, unknown> }): CalculatorResults {
  const { values, t } = data;
  const v = (t?.values as Record<string, string>) || {};
  const f = (t?.formats as Record<string, string>) || {};
  const varaValue = values.varaValue as number | null;
  if (varaValue === null || varaValue === undefined || varaValue <= 0) return { values: {}, formatted: {}, summary: "", isValid: false };

  const meters = varaValue * VARA_TO_M;
  const cm = meters * 100;
  const feet = meters * 3.28084;
  const inches = meters * 39.3701;
  const yards = meters * 1.09361;

  const mUnit = v["m"] || "m"; const cmUnit = v["cm"] || "cm"; const ftUnit = v["ft"] || "ft"; const inUnit = v["in"] || "in"; const ydUnit = v["yd"] || "yd";
  const fmt = (n: number, d: number = 4) => n >= 1000 ? n.toLocaleString("en-US", { maximumFractionDigits: 2 }) : n.toFixed(d).replace(/0+$/, "").replace(/\.$/, "");

  const refVaras = [1, 5, 10, 50, 100, 1000];
  const refs: Record<string, string> = {};
  refVaras.forEach((va) => { refs[`ref${va}`] = `${fmt(va * VARA_TO_M, 2)} ${mUnit}`; });

  const commonValues = [1, 2, 3, 5, 10, 12, 15, 20, 25, 50, 75, 100, 200, 500, 1000, varaValue];
  const uniqueVals = [...new Set(commonValues.map((v) => Math.round(v * 1000) / 1000))].sort((a, b) => a - b);
  const tableData = uniqueVals.map((va) => {
    const m = va * VARA_TO_M;
    return { varas: `${va}`, meters: fmt(m, 2), feet: fmt(m * 3.28084, 1), inches: fmt(m * 39.3701, 0) };
  });

  const summary = f.summary?.replace("{varaValue}", varaValue.toString()).replace("{meters}", fmt(meters, 2)) || `${varaValue} varas = ${fmt(meters, 2)} meters`;
  return {
    values: { meters, cm, feet, inches, yards, ...refs },
    formatted: { meters: `${fmt(meters, 2)} ${mUnit}`, cm: `${fmt(cm, 1)} ${cmUnit}`, feet: `${fmt(feet, 2)} ${ftUnit}`, inches: `${fmt(inches, 1)} ${inUnit}`, yards: `${fmt(yards, 2)} ${ydUnit}`, ...refs },
    summary, isValid: true, metadata: { tableData },
  };
}

export default varasToMetrosConfig;
