import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";
import { convertToBase } from "@/engine/v4/units";

// ============================================================================
// KM TO MILES CONVERTER - V4 (EN ONLY)
// ============================================================================

export const kmToMilesConverterConfig: CalculatorConfigV4 = {
  id: "km-to-miles",
  version: "4.0",
  category: "everyday",
  icon: "🛣️",

  presets: [
    { id: "fiveK", icon: "🏃", values: { amount: 5 } },
    { id: "tenK", icon: "🏅", values: { amount: 10 } },
    { id: "marathon", icon: "🏆", values: { amount: 42.195 } },
  ],

  t: {
    en: {
      name: "KM to Miles Converter",
      slug: "km-to-miles",
      subtitle: "Convert kilometers to miles instantly — perfect for running, driving, and travel distances.",
      breadcrumb: "KM to Miles",

      seo: {
        title: "KM to Miles Converter - Free Distance Conversion Tool",
        description: "Convert kilometers to miles instantly. Great for running distances, road trips, and speed conversions. Includes quick reference table and common distances.",
        shortDescription: "Convert kilometers to miles instantly.",
        keywords: ["km to miles", "kilometers to miles", "km to mi converter", "convert km to miles", "distance converter", "free km converter", "metric to imperial distance"],
      },

      calculator: { yourInformation: "KM to Miles" },
      ui: { yourInformation: "KM to Miles", calculate: "Convert", reset: "Reset", results: "Results" },

      inputs: {
        amount: { label: "Kilometers (km)", helpText: "Enter the distance in kilometers" },
      },

      results: {
        miles: { label: "Miles" },
        meters: { label: "Meters" },
        feet: { label: "Feet" },
        yards: { label: "Yards" },
        nauticalMiles: { label: "Nautical Miles" },
      },

      presets: {
        fiveK: { label: "5K Race", description: "5 kilometer running race" },
        tenK: { label: "10K Race", description: "10 kilometer running race" },
        marathon: { label: "Marathon", description: "42.195 km full marathon" },
      },

      values: { "mi": "mi", "m": "m", "ft": "ft", "yd": "yd", "nmi": "nmi", "km": "km" },
      formats: { summary: "{km} km = {miles} miles" },

      infoCards: {
        results: {
          title: "🛣️ Conversion Results",
          items: [
            { label: "Miles", valueKey: "miles" },
            { label: "Meters", valueKey: "meters" },
            { label: "Feet", valueKey: "feet" },
            { label: "Yards", valueKey: "yards" },
          ],
        },
        quickRef: {
          title: "📊 Quick Reference",
          items: [
            { label: "1 km", valueKey: "ref1" },
            { label: "5 km (5K)", valueKey: "ref5" },
            { label: "10 km (10K)", valueKey: "ref10" },
            { label: "42.195 km (marathon)", valueKey: "refMarathon" },
          ],
        },
        tips: {
          title: "💡 Distance Tips",
          items: [
            "Quick estimate: multiply km by 0.6 to get approximate miles (exact: 0.621371).",
            "Or divide km by 1.6 — easy mental math for road trips.",
            "5K = 3.1 mi, 10K = 6.2 mi, half marathon = 13.1 mi, marathon = 26.2 mi.",
            "Speed: 100 km/h ≈ 62 mph — common European highway speed limit.",
          ],
        },
      },

      education: {
        whatIs: {
          title: "How to Convert Kilometers to Miles",
          content: "To convert kilometers to miles, multiply the kilometer value by 0.621371 (or divide by 1.60934). One kilometer equals approximately 0.621 miles, or about 5/8 of a mile. This conversion is essential for travelers, runners, and anyone working with international distance measurements. The kilometer is the standard unit of distance in most countries, while the mile is primarily used in the United States, United Kingdom, and a few other countries for road distances.",
        },
        howItWorks: {
          title: "The KM to Miles Formula",
          content: "The conversion formula is: miles = kilometers × 0.621371. This factor comes from the exact definition: 1 mile = 1,609.344 meters exactly. So 1 km = 1,000 / 1,609.344 = 0.621371 miles. For a quick mental approximation, multiply by 5/8 or 0.6. For example, 100 km × 0.6 = 60 miles (exact: 62.14 miles). Another trick: use Fibonacci numbers — 3, 5, 8, 13, 21, 34 km roughly equals 2, 3, 5, 8, 13, 21 miles.",
        },
        considerations: {
          title: "Common KM to Miles Conversions",
          items: [
            { text: "1 km = 0.6214 miles — just over half a mile", type: "info" },
            { text: "1.609 km = 1 mile exactly — the key reference value", type: "info" },
            { text: "100 km = 62.14 miles — typical European road trip unit", type: "info" },
            { text: "100 km/h = 62.14 mph — common highway speed limit comparison", type: "info" },
            { text: "1 nautical mile = 1.852 km — used in aviation and maritime", type: "info" },
            { text: "The circumference of Earth ≈ 40,075 km = 24,901 miles", type: "info" },
          ],
        },
        runningDistances: {
          title: "Running Race Distances",
          items: [
            { text: "1 mile = 1.609 km — the classic track & field distance", type: "info" },
            { text: "5K = 5 km = 3.107 miles — most popular beginner race distance", type: "info" },
            { text: "10K = 10 km = 6.214 miles — popular intermediate race distance", type: "info" },
            { text: "Half marathon = 21.0975 km = 13.109 miles — growing in popularity", type: "info" },
            { text: "Marathon = 42.195 km = 26.219 miles — the iconic long-distance race", type: "info" },
            { text: "Ultra-marathon = 50 km+ (31+ miles) — extreme endurance races", type: "info" },
          ],
        },
        examples: {
          title: "KM to Miles Examples",
          description: "Step-by-step distance conversions",
          examples: [
            {
              title: "Convert 10K race to miles",
              steps: ["10 km × 0.621371 = 6.21371 miles", "Round: 6.21 miles or ~6.2 mi", "Average 10K time: 50-70 min", "Pace: ~8-11 min/mile"],
              result: "10 km = 6.21 miles",
            },
            {
              title: "Road trip: 500 km to miles",
              steps: ["500 km × 0.621371 = 310.69 miles", "At 100 km/h (62 mph): ~5 hours", "Quick estimate: 500 × 0.6 = 300 mi", "Exact: 310.7 miles"],
              result: "500 km = 310.7 miles (~5 hr drive)",
            },
          ],
        },
      },

      faqs: [
        { question: "How many miles is 1 km?", answer: "1 kilometer equals 0.621371 miles, or approximately 5/8 of a mile. For quick mental math, multiply km by 0.6 for a close estimate." },
        { question: "How do I convert km to miles quickly?", answer: "The simplest mental math trick: multiply km by 0.6 or divide by 1.6. For better accuracy, multiply by 5/8. For the exact result, multiply by 0.621371." },
        { question: "How many km is a marathon?", answer: "A full marathon is exactly 42.195 kilometers, which equals 26.219 miles (commonly rounded to 26.2 miles). A half marathon is 21.0975 km (13.1 miles)." },
        { question: "How far is 100 km in miles?", answer: "100 km = 62.14 miles. This is a useful reference point: 100 km/h (a common speed limit in Europe) equals about 62 mph." },
        { question: "What is the difference between a mile and a kilometer?", answer: "A mile is longer: 1 mile = 1.60934 km, and 1 km = 0.621 miles. The mile is used primarily in the US and UK for road distances, while the kilometer is used by most other countries. The km is a metric unit (1 km = 1,000 m) while the mile is an imperial unit (1 mi = 5,280 ft)." },
        { question: "Is 5K 3 miles?", answer: "A 5K is slightly more than 3 miles — exactly 3.107 miles (5 × 0.621371). For practical purposes, a 5K is commonly described as about 3.1 miles." },
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
      placeholder: "10",
      min: 0,
      unitType: "length_large",
      syncGroup: false,
      defaultUnit: "km",
    },
  ],

  inputGroups: [],

  results: [
    { id: "miles", type: "primary", format: "text" },
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
    { id: "runningDistances", type: "list", icon: "📊", itemCount: 6 },
    { id: "examples", type: "code-example", icon: "🧮", columns: 2, exampleCount: 2 },
  ],

  faqs: [{ id: "0" }, { id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }],

  references: [
    { authors: "National Institute of Standards and Technology", year: "2024", title: "NIST Special Publication 811 — Guide for the Use of SI", source: "NIST", url: "https://www.nist.gov/pml/special-publication-811" },
    { authors: "Bureau International des Poids et Mesures", year: "2023", title: "SI Brochure: The International System of Units", source: "BIPM", url: "https://www.bipm.org/en/publications/si-brochure" },
  ],

  hero: { badge: "Conversion", title: "KM to Miles" },
  sidebar: { showConversions: true, showRelated: true },
  features: { showPresets: true, showShare: true, showPrint: true },
  relatedCalculators: ["miles-to-km", "length-converter", "mph-to-kmh"],
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

export function calculateKmToMiles(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits = {} } = data;
  const amount = values.amount as number | null;

  if (amount === null || amount === undefined || amount < 0) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  // Convert any input unit to km (base of length_large), then derive all
  const fromUnit = fieldUnits.amount || "km";
  const km = convertToBase(amount, fromUnit, "length_large");

  const miles = km * 0.621371;
  const meters = km * 1000;
  const feet = meters * 3.28084;
  const yards = feet / 3;
  const nauticalMiles = km / 1.852;

  // Quick reference
  const ref1 = 1 * 0.621371;
  const ref5 = 5 * 0.621371;
  const ref10 = 10 * 0.621371;
  const refMarathon = 42.195 * 0.621371;

  return {
    values: { miles, meters, feet, yards, nauticalMiles },
    formatted: {
      miles: `${fmtNum(miles)} mi`,
      meters: `${fmtNum(meters)} m`,
      feet: `${fmtNum(feet)} ft`,
      yards: `${fmtNum(yards)} yd`,
      nauticalMiles: `${fmtNum(nauticalMiles)} nmi`,
      ref1: `${fmtNum(ref1)} mi`,
      ref5: `${fmtNum(ref5)} mi`,
      ref10: `${fmtNum(ref10)} mi`,
      refMarathon: `${fmtNum(refMarathon)} mi`,
    },
    summary: `${fmtNum(km)} km = ${fmtNum(miles)} miles`,
    isValid: true,
  };
}

export default kmToMilesConverterConfig;
