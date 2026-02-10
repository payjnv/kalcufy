import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";
import { convertToBase } from "@/engine/v4/units";

// ============================================================================
// MILES TO KM CONVERTER - V4 (EN ONLY)
// ============================================================================

export const milesToKmConverterConfig: CalculatorConfigV4 = {
  id: "miles-to-km",
  version: "4.0",
  category: "conversion",
  icon: "🛣️",

  presets: [
    { id: "mile1", icon: "🏃", values: { amount: 1 } },
    { id: "halfMarathon", icon: "🏅", values: { amount: 13.1 } },
    { id: "marathon", icon: "🏆", values: { amount: 26.2 } },
  ],

  t: {
    en: {
      name: "Miles to KM Converter",
      slug: "miles-to-km",
      subtitle: "Convert miles to kilometers instantly — perfect for running, driving, and navigation.",
      breadcrumb: "Miles to KM",

      seo: {
        title: "Miles to KM Converter - Free Distance Conversion Tool",
        description: "Convert miles to kilometers instantly. Great for running races, road trips, and international travel. Includes common distances and quick reference table.",
        shortDescription: "Convert miles to kilometers instantly.",
        keywords: ["miles to km", "miles to kilometers", "mi to km converter", "convert miles to km", "distance converter", "free miles converter", "imperial to metric distance"],
      },

      calculator: { yourInformation: "Miles to KM" },
      ui: { yourInformation: "Miles to KM", calculate: "Convert", reset: "Reset", results: "Results" },

      inputs: {
        amount: { label: "Distance", helpText: "Enter distance and select unit from dropdown" },
      },

      results: {
        kilometers: { label: "Kilometers" },
        meters: { label: "Meters" },
        feet: { label: "Feet" },
        yards: { label: "Yards" },
        nauticalMiles: { label: "Nautical Miles" },
      },

      presets: {
        mile1: { label: "1 Mile", description: "Standard mile distance" },
        halfMarathon: { label: "Half Marathon", description: "13.1 miles" },
        marathon: { label: "Marathon", description: "26.2 miles" },
      },

      values: { "km": "km", "m": "m", "ft": "ft", "yd": "yd", "nmi": "nmi", "mi": "mi" },
      formats: { summary: "{miles} mi = {km} km" },

      infoCards: {
        results: {
          title: "🛣️ Conversion Results",
          items: [
            { label: "Kilometers", valueKey: "kilometers" },
            { label: "Meters", valueKey: "meters" },
            { label: "Feet", valueKey: "feet" },
            { label: "Yards", valueKey: "yards" },
          ],
        },
        quickRef: {
          title: "📊 Quick Reference",
          items: [
            { label: "1 mile", valueKey: "ref1" },
            { label: "5 miles", valueKey: "ref5" },
            { label: "10 miles", valueKey: "ref10" },
            { label: "100 miles", valueKey: "ref100" },
          ],
        },
        tips: {
          title: "💡 Distance Tips",
          items: [
            "Quick estimate: multiply miles by 1.6 to get approximate kilometers.",
            "1 mile = exactly 1.609344 km — or about 8/5 of a km.",
            "Marathon: 26.2 mi = 42.195 km, Half marathon: 13.1 mi = 21.1 km.",
            "Speed: 60 mph = 96.6 km/h, 70 mph = 112.7 km/h.",
          ],
        },
      },

      education: {
        whatIs: {
          title: "How to Convert Miles to Kilometers",
          content: "To convert miles to kilometers, multiply the mile value by 1.60934. One mile equals exactly 1.609344 kilometers. This conversion is essential when traveling internationally, since most countries outside the US and UK use kilometers for road signs and distances. The mile originated from the Roman 'mille passus' (1,000 paces) and was standardized to 5,280 feet. The kilometer, part of the metric system, is defined as 1,000 meters and is the world's standard unit for road distances.",
        },
        howItWorks: {
          title: "The Miles to KM Formula",
          content: "The formula is: kilometers = miles × 1.609344. This factor is exact — 1 international mile is defined as exactly 1,609.344 meters. For quick mental math, multiply by 1.6 or by 8/5. For example, 10 miles × 1.6 = 16 km (exact: 16.09 km). A fun trick: consecutive Fibonacci numbers approximate the conversion — 5 mi ≈ 8 km, 8 mi ≈ 13 km, 13 mi ≈ 21 km.",
        },
        considerations: {
          title: "Common Miles to KM Conversions",
          items: [
            { text: "1 mile = 1.609 km — the fundamental conversion factor", type: "info" },
            { text: "1 mile = 5,280 feet = 1,760 yards = 1,609.344 meters", type: "info" },
            { text: "60 mph = 96.56 km/h — common US highway speed", type: "info" },
            { text: "100 miles = 160.9 km — useful road trip reference", type: "info" },
            { text: "1 nautical mile = 1.151 statute miles = 1.852 km", type: "info" },
            { text: "The Fibonacci trick: 3→5, 5→8, 8→13, 13→21 (mi→km)", type: "info" },
          ],
        },
        drivingDistances: {
          title: "US Driving Distances in KM",
          items: [
            { text: "NYC to Philadelphia: 97 mi = 156 km (~2 hours)", type: "info" },
            { text: "LA to San Francisco: 382 mi = 615 km (~6 hours)", type: "info" },
            { text: "NYC to Chicago: 790 mi = 1,271 km (~12 hours)", type: "info" },
            { text: "NYC to Miami: 1,280 mi = 2,060 km (~19 hours)", type: "info" },
            { text: "NYC to LA: 2,790 mi = 4,489 km (~40 hours)", type: "info" },
            { text: "London to Edinburgh: 403 mi = 649 km (~7 hours)", type: "info" },
          ],
        },
        examples: {
          title: "Miles to KM Examples",
          description: "Step-by-step conversions",
          examples: [
            {
              title: "Half marathon in km",
              steps: ["Half marathon = 13.1 miles", "13.1 × 1.609344 = 21.08 km", "Official distance = 21.0975 km", "Average pace: 9 min/mi = 5:35 min/km"],
              result: "13.1 miles = 21.1 km",
            },
            {
              title: "Road trip: 300 miles to km",
              steps: ["300 × 1.609344 = 482.8 km", "Quick estimate: 300 × 1.6 = 480 km", "At 65 mph (105 km/h): ~4.6 hours", "Gas: ~10-15 gallons at 20-30 mpg"],
              result: "300 miles = 482.8 km",
            },
          ],
        },
      },

      faqs: [
        { question: "How many km is 1 mile?", answer: "1 mile equals exactly 1.609344 kilometers. For quick mental math, multiply miles by 1.6. So 1 mile ≈ 1.6 km." },
        { question: "How do I convert miles to km quickly?", answer: "Multiply by 1.6 for a quick estimate. For better accuracy, multiply by 1.609. The Fibonacci trick also works: 5 mi ≈ 8 km, 8 mi ≈ 13 km, 13 mi ≈ 21 km — each Fibonacci number in miles roughly equals the next one in km." },
        { question: "How far is a marathon in km?", answer: "A full marathon is 26.219 miles = 42.195 km. A half marathon is 13.109 miles = 21.0975 km. These are exact standardized distances set by World Athletics." },
        { question: "How many km is 100 miles?", answer: "100 miles = 160.934 km. This is a useful reference: at 60 mph, that's about 1 hour 40 minutes of driving. In metric, 100 km at 100 km/h is exactly 1 hour." },
        { question: "Why does the US use miles instead of km?", answer: "The US inherited the imperial system from Britain and never officially adopted the metric system for everyday use. While the US metric system was legalized in 1866 and is used in science and medicine, road signs, speed limits, and common distances remain in miles. The UK also still uses miles for road distances despite using metric for most other measurements." },
        { question: "Is a mile longer than a kilometer?", answer: "Yes, a mile is about 61% longer than a kilometer. 1 mile = 1.609 km, so it takes more than 1.5 km to equal 1 mile. Put another way, 1 km is about 0.621 miles, or roughly 5/8 of a mile." },
      ],

      rating: { title: "Rate this Calculator", share: "Share", copied: "Copied!", copyLink: "Copy Link", clickToRate: "Click to rate", youRated: "You rated", stars: "stars", averageFrom: "average from", ratings: "ratings" },
      common: { home: "Home", calculators: "Calculators" },
      buttons: { calculate: "Convert", reset: "Reset", pdf: "PDF", csv: "CSV", excel: "Excel", save: "Save", saved: "Saved", saving: "Saving..." },
      share: { calculatedWith: "Calculated with Kalcufy.com" },
      accessibility: { mobileResults: "Results", closeModal: "Close", openMenu: "Menu" },
      sources: { title: "Sources & References" },
    },
  },

  inputs: [
    {
      id: "amount",
      type: "number",
      defaultValue: null,
      placeholder: "26.2",
      min: 0,
      unitType: "length_large",
      syncGroup: false,
      defaultUnit: "mi",
    },
  ],

  inputGroups: [],

  results: [
    { id: "kilometers", type: "primary", format: "text" },
    { id: "meters", type: "secondary", format: "text" },
    { id: "feet", type: "secondary", format: "text" },
    { id: "yards", type: "secondary", format: "text" },
    { id: "nauticalMiles", type: "secondary", format: "text" },
  ],

  infoCards: [
    { id: "results", type: "list", icon: "🛣️", itemCount: 4 },
    { id: "quickRef", type: "list", icon: "📊", itemCount: 4 },
    { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  referenceData: [],

  educationSections: [
    { id: "whatIs", type: "prose", icon: "📖" },
    { id: "howItWorks", type: "prose", icon: "⚙️" },
    { id: "considerations", type: "list", icon: "📋", itemCount: 6 },
    { id: "drivingDistances", type: "list", icon: "📊", itemCount: 6 },
    { id: "examples", type: "code-example", icon: "🧮", columns: 2, exampleCount: 2 },
  ],

  faqs: [{ id: "0" }, { id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }],

  references: [
    { authors: "National Institute of Standards and Technology", year: "2024", title: "NIST Handbook 44 — Units of Measurement", source: "NIST", url: "https://www.nist.gov/pml/owm/metric-si/si-units-length" },
    { authors: "Bureau International des Poids et Mesures", year: "2023", title: "SI Brochure: The International System of Units", source: "BIPM", url: "https://www.bipm.org/en/publications/si-brochure" },
  ],

  hero: { badge: "Conversion", title: "Miles to KM" },
  sidebar: { showConversions: true, showRelated: true },
  features: { showPresets: true, showShare: true, showPrint: true },
  relatedCalculators: ["km-to-miles", "length-converter", "mph-to-kmh"],
  ads: { showTopBanner: false, showSidebar: true, showBetweenSections: false },
};

// ============================================================================
// CALCULATE
// ============================================================================

function fmtNum(val: number): string {
  if (val === 0) return "0";
  if (Math.abs(val) >= 1e6) return val.toLocaleString("en-US", { maximumFractionDigits: 0 });
  if (Math.abs(val) >= 1000) return val.toLocaleString("en-US", { maximumFractionDigits: 2 });
  if (Math.abs(val) < 0.01) return val.toFixed(4);
  return val.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 4 });
}

export function calculateMilesToKm(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits = {} } = data;
  const amount = values.amount as number | null;

  if (amount === null || amount === undefined || amount < 0) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  const fromUnit = fieldUnits.amount || "mi";
  const km = convertToBase(amount, fromUnit, "length_large");

  const meters = km * 1000;
  const miles = km * 0.621371;
  const feet = meters * 3.28084;
  const yards = feet / 3;
  const nauticalMiles = km / 1.852;

  const ref1 = 1.609344;
  const ref5 = 5 * 1.609344;
  const ref10 = 10 * 1.609344;
  const ref100 = 100 * 1.609344;

  return {
    values: { kilometers: km, meters, feet, yards, nauticalMiles },
    formatted: {
      kilometers: `${fmtNum(km)} km`,
      meters: `${fmtNum(meters)} m`,
      feet: `${fmtNum(feet)} ft`,
      yards: `${fmtNum(yards)} yd`,
      nauticalMiles: `${fmtNum(nauticalMiles)} nmi`,
      ref1: `${fmtNum(ref1)} km`,
      ref5: `${fmtNum(ref5)} km`,
      ref10: `${fmtNum(ref10)} km`,
      ref100: `${fmtNum(ref100)} km`,
    },
    summary: `${fmtNum(amount)} ${fromUnit} = ${fmtNum(km)} km`,
    isValid: true,
  };
}

export default milesToKmConverterConfig;
