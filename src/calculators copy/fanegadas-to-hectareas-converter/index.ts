import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";

// 1 fanegada = 6,400 m² (Colombia standard)
// 1 hectárea = 10,000 m²
// 1 fanegada = 0.64 hectáreas
const FAN_TO_M2 = 6400;
const HA_TO_M2 = 10000;
const FAN_TO_HA = FAN_TO_M2 / HA_TO_M2; // 0.64
const ACRE_TO_M2 = 4046.8564224;

export const fanegadasToHectareasConfig: CalculatorConfigV4 = {
  id: "fanegadas-to-hectareas",
  version: "4.0",
  category: "conversion",
  icon: "🌿",
  presets: [
    { id: "smallPlot", icon: "🏡", values: { fanValue: 1 } },
    { id: "coffeeFarm", icon: "☕", values: { fanValue: 5 } },
    { id: "cattleRanch", icon: "🐄", values: { fanValue: 20 } },],
  t: {
    en: {
      name: "Fanegadas to Hectares Converter", slug: "fanegadas-to-hectares-converter",
      subtitle: "Convert fanegadas to hectares, acres, and square meters — Colombia's traditional land unit.",
      breadcrumb: "Fanegadas to Hectares",
      seo: {
        title: "Fanegadas to Hectares Converter - Colombian Land Unit",
        description: "Convert fanegadas to hectares instantly. The fanegada is Colombia's traditional land measurement unit. 1 fanegada = 6,400 m² = 0.64 hectares.",
        shortDescription: "Convert Colombian fanegadas to hectares.",
        keywords: ["fanegada to hectare", "fanegada converter", "fanegada a hectarea", "colombian land unit", "convert fanegada", "how many hectares in a fanegada", "fanegada to acres", "fanegada metros cuadrados"],
      },
      calculator: { yourInformation: "Enter Value" },
      ui: { yourInformation: "Enter Value", calculate: "Convert", reset: "Reset", results: "Results" },
      inputs: { fanValue: { label: "Fanegadas", helpText: "Enter the number of fanegadas to convert" } },
      results: { hectares: { label: "Hectares" }, acres: { label: "Acres" }, m2: { label: "Square Meters" }, km2: { label: "Square Kilometers" }, plazas: { label: "Plazas" } },
      presets: {
        smallPlot: { label: "1 Fanegada", description: "Small plot" },
        coffeeFarm: { label: "5 Fanegadas", description: "Coffee farm" },
        cattleRanch: { label: "20 Fanegadas", description: "Cattle ranch" },
      },
      values: { ha: "ha", ac: "acres", m2: "m²", km2: "km²", plz: "plazas", fan: "fan" },
      formats: { summary: "{fanValue} fanegadas = {hectares} hectares" },
      infoCards: {
        quickConversions: {
          title: "Quick Reference",
          items: [
            { label: "1 fanegada", valueKey: "ref1" }, { label: "2 fanegadas", valueKey: "ref2" },
            { label: "5 fanegadas", valueKey: "ref5" }, { label: "10 fanegadas", valueKey: "ref10" },
            { label: "50 fanegadas", valueKey: "ref50" }, { label: "100 fanegadas", valueKey: "ref100" },
          ],
        },
        tips: {
          title: "Conversion Tips",
          items: [
            "1 fanegada = 0.64 hectares — multiply by 0.64 for a quick conversion",
            "1 fanegada = 6,400 m² — roughly 80m × 80m",
            "For acres: 1 fanegada ≈ 1.58 acres — just over 1½ acres",
            "Common in Colombian real estate: 'finca de 10 fanegadas' = 6.4 hectares",
          ],
        },
      },
      education: {
        howToConvert: { title: "How to Convert Fanegadas to Hectares", content: "To convert fanegadas to hectares, multiply the number of fanegadas by 0.64. One fanegada equals 6,400 square meters in Colombia, and since one hectare is 10,000 square meters, the ratio is 6,400 ÷ 10,000 = 0.64. The fanegada originated from the amount of land that could be sown with one fanega (a unit of grain volume) of seed. In Colombia, this unit became standardized at 6,400 m², though historically the size varied by region. Today it remains widely used in rural property transactions across Colombia, especially in the departments of Cundinamarca, Boyacá, Santander, and the Coffee Region." },
        commonUses: { title: "Where the Fanegada Is Used Today", content: "The fanegada is deeply embedded in Colombian rural real estate and agriculture. Coffee farms in the Eje Cafetero (Quindío, Risaralda, Caldas) are traditionally measured in fanegadas — a typical small coffee farm is 3 to 8 fanegadas. Flower farms in the Sabana de Bogotá quote production per fanegada. Cattle ranches in the llanos and Santander measure grazing capacity in fanegadas. Property listings on Colombian real estate platforms like Fincaraíz and Metrocuadrado still show rural properties in fanegadas alongside hectares. Land reform documents, INCODER certificates, and rural property titles (escrituras) frequently reference fanegadas. Even Colombian banks require fanegada-to-hectare conversion when processing rural property loans." },
        examples: {
          title: "Conversion Examples", description: "Step-by-step fanegada conversions",
          examples: [
            { title: "Convert 8 fanegadas to hectares (coffee farm)", steps: ["Formula: hectares = fanegadas × 0.64", "8 × 0.64 = 5.12", "8 fanegadas = 5.12 hectares"], result: "8 fan = 5.12 ha" },
            { title: "Convert 25 fanegadas to acres (cattle ranch)", steps: ["First to m²: 25 × 6,400 = 160,000 m²", "Then to acres: 160,000 ÷ 4,046.86 = 39.54", "25 fanegadas = 39.54 acres"], result: "25 fan = 39.54 acres" },
          ],
        },
      },
      faqs: [
        { question: "How many hectares is 1 fanegada?", answer: "1 fanegada equals exactly 0.64 hectares (6,400 square meters)." },
        { question: "How many acres is 1 fanegada?", answer: "1 fanegada equals approximately 1.58 acres." },
        { question: "Is the fanegada only used in Colombia?", answer: "The fanegada of 6,400 m² is specifically Colombian. Spain and other Latin American countries had similar units called 'fanega' but with different sizes." },
        { question: "Why is the fanegada 6,400 m²?", answer: "It comes from 80 × 80 varas castellanas. The Colombian vara is 0.8 meters, so 80 varas = 64 meters, and 64 × 64 = 4,096... however the standardized Colombian fanegada was fixed at 6,400 m² by convention." },
        { question: "Is the fanegada legally recognized in Colombia?", answer: "Yes, the fanegada appears in Colombian property titles (escrituras), IGAC cadastral records, and rural land documentation. It is widely understood by notaries and land registrars." },
        { question: "How many fanegadas in 1 hectare?", answer: "1 hectare = 1.5625 fanegadas (10,000 ÷ 6,400 = 1.5625)." },
      ],
      rating: { title: "Rate this Converter", share: "Share", copied: "Copied!", copyLink: "Copy Link", clickToRate: "Click to rate", youRated: "You rated", stars: "stars", averageFrom: "average from", ratings: "ratings" },
      common: { home: "Home", calculators: "Calculators" },
      buttons: { calculate: "Convert", reset: "Reset", pdf: "PDF", csv: "CSV", excel: "Excel", save: "Save", saved: "Saved", saving: "Saving..." },
      share: { calculatedWith: "Converted with Kalcufy.com" },
      accessibility: { mobileResults: "Results", closeModal: "Close", openMenu: "Menu" },
      sources: { title: "Sources & References" },
      detailedTable: { conversionTable: { button: "View Full Conversion Table", title: "Fanegadas to Hectares Conversion Table", columns: { fan: "Fanegadas", ha: "Hectares", acres: "Acres", m2: "Square Meters" } } },
    },
  },
  inputs: [{ id: "fanValue", type: "number", defaultValue: null, placeholder: "5", min: 0.001, max: 100000000, step: 0.01, suffix: "fan" }],
  inputGroups: [],
  results: [
    { id: "hectares", type: "primary", format: "number" },
    { id: "acres", type: "secondary", format: "number" },
    { id: "m2", type: "secondary", format: "number" },
    { id: "km2", type: "secondary", format: "number" },
    { id: "plazas", type: "secondary", format: "number" },
  ],
  infoCards: [ { id: "quickConversions", type: "list", icon: "📋", itemCount: 6 }, { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 } ],
  detailedTable: {
    id: "conversionTable", buttonLabel: "View Full Conversion Table", buttonIcon: "📊", modalTitle: "Fanegadas to Hectares Conversion Table",
    columns: [ { id: "fan", label: "Fanegadas", align: "center" }, { id: "ha", label: "Hectares", align: "right", highlight: true }, { id: "acres", label: "Acres", align: "right" }, { id: "m2", label: "Square Meters", align: "right" } ],
  },
  referenceData: [],
  educationSections: [ { id: "howToConvert", type: "prose", icon: "📖" }, { id: "commonUses", type: "prose", icon: "🌍" }, { id: "examples", type: "code-example", icon: "🧮", columns: 2, exampleCount: 2 } ],
  faqs: [{ id: "0" }, { id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }],
  references: [
    { authors: "Instituto Geográfico Agustín Codazzi (IGAC)", year: "2023", title: "Sistema de Información Geográfica para la Planeación y el Ordenamiento Territorial", source: "IGAC Colombia", url: "https://www.igac.gov.co/" },
    { authors: "United Nations Statistics Division", year: "1966", title: "World Weights and Measures: Handbook for Statisticians", source: "United Nations", url: "https://unstats.un.org/unsd/publication/SeriesM/SeriesM_21.pdf" },
  ],
  hero: { badge: "Free Tool", badgeVariant: "blue" as const },
  sidebar: { showNewsletter: true, showRelated: true },
  features: { export: true, save: true, share: true, rating: true },
  relatedCalculators: ["manzanas-to-hectareas", "tareas-to-metros-cuadrados", "cuadras-to-hectareas", "varas-to-metros"],
  ads: { sidebar: true, footer: true },
};

export function calculateFanegadasToHectareas(data: { values: Record<string, unknown>; fieldUnits?: Record<string, string>; t?: Record<string, unknown> }): CalculatorResults {
  const { values, t } = data;
  const v = (t?.values as Record<string, string>) || {};
  const f = (t?.formats as Record<string, string>) || {};
  const fanValue = values.fanValue as number | null;
  if (fanValue === null || fanValue === undefined || fanValue <= 0) return { values: {}, formatted: {}, summary: "", isValid: false };

  const m2 = fanValue * FAN_TO_M2;
  const hectares = m2 / HA_TO_M2;
  const acres = m2 / ACRE_TO_M2;
  const km2 = m2 / 1000000;
  const plazas = fanValue * 0.8; // 1 plaza ≈ 8,000 m², 1 fanegada = 0.8 plazas

  const haUnit = v["ha"] || "ha"; const acUnit = v["ac"] || "acres"; const m2Unit = v["m2"] || "m²"; const km2Unit = v["km2"] || "km²"; const plzUnit = v["plz"] || "plazas";
  const fmt = (n: number, d: number = 4) => n >= 1000 ? n.toLocaleString("en-US", { maximumFractionDigits: 2 }) : n.toFixed(d).replace(/0+$/, "").replace(/\.$/, "");

  const refFan = [1, 2, 5, 10, 50, 100];
  const refs: Record<string, string> = {};
  refFan.forEach((fan) => { refs[`ref${fan}`] = `${fmt(fan * FAN_TO_HA, 2)} ${haUnit}`; });

  const commonValues = [0.5, 1, 2, 3, 5, 8, 10, 15, 20, 25, 30, 50, 75, 100, 200, 500, fanValue];
  const uniqueVals = [...new Set(commonValues.map((v) => Math.round(v * 1000) / 1000))].sort((a, b) => a - b);
  const tableData = uniqueVals.map((fan) => ({
    fan: `${fan}`, ha: fmt(fan * FAN_TO_HA, 2), acres: fmt(fan * FAN_TO_M2 / ACRE_TO_M2, 2), m2: fmt(fan * FAN_TO_M2, 0),
  }));

  const summary = f.summary?.replace("{fanValue}", fanValue.toString()).replace("{hectares}", fmt(hectares, 2)) || `${fanValue} fanegadas = ${fmt(hectares, 2)} hectares`;
  return {
    values: { hectares, acres, m2, km2, plazas, ...refs },
    formatted: { hectares: `${fmt(hectares, 2)} ${haUnit}`, acres: `${fmt(acres, 2)} ${acUnit}`, m2: `${fmt(m2, 0)} ${m2Unit}`, km2: `${fmt(km2)} ${km2Unit}`, plazas: `${fmt(plazas, 2)} ${plzUnit}`, ...refs },
    summary, isValid: true, metadata: { tableData },
  };
}

export default fanegadasToHectareasConfig;
