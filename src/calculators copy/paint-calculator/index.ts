import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";
import { convertToBase } from "@/engine/v4/units";

// ============================================================================
// PAINT CALCULATOR - V4 (EN ONLY)
// ============================================================================

export const paintCalculatorConfig: CalculatorConfigV4 = {
  id: "paint-calculator",
  version: "4.0",
  category: "home",
  icon: "🎨",

  presets: [
    {
      id: "bedroom",
      icon: "🛏️",
      values: {
        projectType: "interior",
        roomLength: 12,
        roomWidth: 10,
        wallHeight: 8,
        doors: 1,
        windows: 2,
        paintCeiling: "no",
        paintFinish: "eggshell",
        surfaceType: "smooth",
        coats: 2,
        includePrimer: "no",
        wasteFactor: 10,
        costPerGallon: 35,
      },
    },
    {
      id: "livingRoom",
      icon: "🛋️",
      values: {
        projectType: "interior",
        roomLength: 18,
        roomWidth: 14,
        wallHeight: 9,
        doors: 2,
        windows: 3,
        paintCeiling: "no",
        paintFinish: "eggshell",
        surfaceType: "smooth",
        coats: 2,
        includePrimer: "no",
        wasteFactor: 10,
        costPerGallon: 35,
      },
    },
    {
      id: "bathroom",
      icon: "🚿",
      values: {
        projectType: "interior",
        roomLength: 8,
        roomWidth: 6,
        wallHeight: 8,
        doors: 1,
        windows: 1,
        paintCeiling: "yes",
        paintFinish: "semiGloss",
        surfaceType: "smooth",
        coats: 2,
        includePrimer: "yes",
        wasteFactor: 10,
        costPerGallon: 40,
      },
    },],

  t: {
    en: {
      name: "Paint Calculator",
      slug: "paint-calculator",
      subtitle: "Calculate how much paint you need for any room and estimate the total cost of your project.",
      breadcrumb: "Paint",

      seo: {
        title: "Paint Calculator - Free Room Paint Estimator Tool",
        description: "Calculate how much paint you need for any room. Estimate gallons, primer, labor time, and total cost for interior and exterior painting projects.",
        shortDescription: "Estimate paint needed for walls, ceilings, and rooms.",
        keywords: [
          "paint calculator",
          "how much paint do i need",
          "room paint estimator",
          "wall paint calculator",
          "interior paint calculator",
          "paint cost calculator",
          "free paint calculator",
          "painting estimate",
        ],
      },

      calculator: { yourInformation: "Room Details" },
      ui: {
        yourInformation: "Room Details",
        calculate: "Calculate",
        reset: "Reset",
        results: "Results",
      },

      inputs: {
        projectType: {
          label: "Project Type",
          helpText: "Interior or exterior painting project",
          options: { interior: "Interior", exterior: "Exterior" },
        },
        roomLength: {
          label: "Room Length",
          helpText: "Length of the room or wall",
        },
        roomWidth: {
          label: "Room Width",
          helpText: "Width of the room",
        },
        wallHeight: {
          label: "Wall Height",
          helpText: "Height from floor to ceiling",
        },
        doors: {
          label: "Number of Doors",
          helpText: "Standard door ~21 sq ft deduction each",
        },
        windows: {
          label: "Number of Windows",
          helpText: "Standard window ~15 sq ft deduction each",
        },
        paintCeiling: {
          label: "Paint Ceiling?",
          helpText: "Include ceiling in paint estimate",
          options: { no: "No", yes: "Yes" },
        },
        paintFinish: {
          label: "Paint Finish",
          helpText: "Finish type affects coverage and price",
          options: {
            flat: "Flat / Matte",
            eggshell: "Eggshell",
            satin: "Satin",
            semiGloss: "Semi-Gloss",
            gloss: "High Gloss",
          },
        },
        surfaceType: {
          label: "Surface Type",
          helpText: "Rough surfaces need more paint",
          options: {
            smooth: "Smooth (drywall)",
            textured: "Textured",
            rough: "Rough (stucco, brick)",
          },
        },
        coats: {
          label: "Number of Coats",
          helpText: "Most projects need 2 coats",
        },
        includePrimer: {
          label: "Include Primer?",
          helpText: "Primer recommended for new surfaces or color changes",
          options: { no: "No", yes: "Yes" },
        },
        wasteFactor: {
          label: "Waste Factor",
          helpText: "Extra for spills and touch-ups",
        },
        costPerGallon: {
          label: "Cost per Gallon",
          helpText: "Average price per gallon of paint",
        },
      },

      results: {
        paintNeeded: { label: "Paint Needed" },
        paintableArea: { label: "Paintable Area" },
        estimatedCost: { label: "Estimated Cost" },
        estimatedLabor: { label: "Estimated Labor" },
      },

      presets: {
        bedroom: { label: "Bedroom", description: "12×10 ft standard bedroom" },
        livingRoom: { label: "Living Room", description: "18×14 ft living room" },
        bathroom: { label: "Bathroom", description: "8×6 ft bathroom with ceiling" },
      },

      values: {
        "gal": "gal",
        "gallons": "gallons",
        "gallon": "gallon",
        "sq ft": "sq ft",
        "hours": "hours",
        "hour": "hour",
        "hrs": "hrs",
        "primer": "primer",
        "paint": "paint",
        "coat": "coat",
        "coats": "coats",
      },

      formats: {
        summary: "You need approximately {gallons} gallons of paint for {area} sq ft of paintable surface.",
      },

      infoCards: {
        estimate: {
          title: "🎨 Paint Estimate",
          items: [
            { label: "Paintable Area", valueKey: "paintableArea" },
            { label: "Paint Needed", valueKey: "paintNeeded" },
            { label: "Primer Needed", valueKey: "primerNeeded" },
            { label: "Total Cost", valueKey: "totalCost" },
          ],
        },
        details: {
          title: "🔧 Project Details",
          items: [
            { label: "Total Wall Area", valueKey: "totalWallArea" },
            { label: "Door/Window Deduction", valueKey: "deduction" },
            { label: "Ceiling Area", valueKey: "ceilingArea" },
            { label: "Labor Time", valueKey: "laborTime" },
          ],
        },
        tips: {
          title: "💡 Pro Painting Tips",
          items: [
            "Buy 10-15% extra paint — better to have too much than make a second trip to the store.",
            "Use a primer for porous surfaces, color changes, or stain coverage to get better results with fewer coats.",
            "Semi-gloss or satin finishes are best for kitchens, bathrooms, and high-traffic areas — they resist moisture and wipe clean easily.",
            "Flat or matte finishes hide wall imperfections better and work great for bedrooms, living rooms, and ceilings.",
          ],
        },
      },

      education: {
        whatIs: {
          title: "How to Calculate Paint for a Room",
          content: "Calculating the right amount of paint starts with measuring your room's walls. Multiply the perimeter (2 × length + 2 × width) by the wall height to get the total wall area. Then subtract the area of doors (~21 sq ft each) and windows (~15 sq ft each). The result is your paintable area. Divide this by the paint's coverage rate (typically 350-400 sq ft per gallon for smooth surfaces) and multiply by the number of coats. Most interior rooms need 2 coats for full coverage and color consistency. Adding a 10% waste factor accounts for spills, roller absorption, and touch-ups.",
        },
        howItWorks: {
          title: "Understanding Paint Coverage Rates",
          content: "Paint coverage varies significantly based on surface texture and paint quality. Smooth drywall typically gets 350-400 sq ft per gallon, while textured walls may only get 250-300 sq ft per gallon. Rough surfaces like stucco or brick can drop to 150-250 sq ft per gallon. Premium paints generally offer better coverage due to higher pigment concentration. The paint finish also matters: flat paints tend to cover slightly more area than glossy finishes because gloss paints are thinner. Exterior paints typically have coverage rates of 250-350 sq ft per gallon due to weather-resistant formulations being thicker.",
        },
        considerations: {
          title: "Factors That Affect Paint Quantity",
          items: [
            { text: "Dark-to-light or light-to-dark color changes may need an extra coat or tinted primer", type: "warning" },
            { text: "New drywall absorbs more paint on the first coat — always use primer on new surfaces", type: "warning" },
            { text: "High-quality paint covers better and lasts longer, saving money in the long run", type: "info" },
            { text: "Humidity and temperature affect drying time — paint between 50-85°F for best results", type: "info" },
            { text: "One gallon of ceiling paint covers approximately 400 sq ft on smooth ceilings", type: "info" },
            { text: "Trim, doors, and accent walls should be calculated separately with their own finish", type: "info" },
          ],
        },
        coverage: {
          title: "Coverage Rates by Surface Type",
          items: [
            { text: "Smooth drywall: 350-400 sq ft/gallon — the most common interior surface", type: "info" },
            { text: "Textured walls: 250-300 sq ft/gallon — knockdown, orange peel, or skip trowel", type: "info" },
            { text: "Rough stucco/brick: 150-250 sq ft/gallon — porous surfaces absorb significantly more paint", type: "info" },
            { text: "Wood siding (exterior): 250-350 sq ft/gallon — depends on wood condition and previous paint", type: "info" },
            { text: "Concrete/masonry: 150-200 sq ft/gallon — highly porous, primer strongly recommended", type: "info" },
            { text: "Metal surfaces: 350-500 sq ft/gallon — smooth and non-porous, requires special metal primer", type: "info" },
          ],
        },
        examples: {
          title: "Paint Calculation Examples",
          description: "Step-by-step examples for common rooms",
          examples: [
            {
              title: "Standard Bedroom (12×10 ft)",
              steps: [
                "Wall perimeter: 2(12) + 2(10) = 44 ft",
                "Wall area: 44 × 8 ft height = 352 sq ft",
                "Subtract 1 door (21) + 2 windows (30) = 51 sq ft",
                "Paintable area: 352 - 51 = 301 sq ft",
                "Paint needed: 301 ÷ 350 × 2 coats = 1.72 gallons",
                "With 10% waste: ~1.9 gallons → buy 2 gallons",
              ],
              result: "2 gallons of paint for a standard bedroom",
            },
            {
              title: "Large Living Room (18×14 ft)",
              steps: [
                "Wall perimeter: 2(18) + 2(14) = 64 ft",
                "Wall area: 64 × 9 ft height = 576 sq ft",
                "Subtract 2 doors (42) + 3 windows (45) = 87 sq ft",
                "Paintable area: 576 - 87 = 489 sq ft",
                "Paint needed: 489 ÷ 350 × 2 coats = 2.79 gallons",
                "With 10% waste: ~3.1 gallons → buy 3-4 gallons",
              ],
              result: "3-4 gallons of paint for a large living room",
            },
          ],
        },
      },

      faqs: [
        {
          question: "How much paint do I need for a 12×12 room?",
          answer: "A 12×12 room with 8-foot ceilings has about 384 sq ft of wall area. After subtracting 1 door and 2 windows (~51 sq ft), you have about 333 sq ft of paintable surface. With 2 coats at 350 sq ft/gallon coverage, you need about 1.9 gallons. Buy 2 gallons to account for waste and touch-ups.",
        },
        {
          question: "How many square feet does a gallon of paint cover?",
          answer: "A gallon of paint typically covers 350-400 sq ft on smooth surfaces with one coat. Textured surfaces reduce coverage to 250-300 sq ft, while rough surfaces like stucco may only get 150-250 sq ft per gallon. These are approximate values — actual coverage depends on paint quality, color, application method, and surface porosity.",
        },
        {
          question: "Do I need primer before painting?",
          answer: "Primer is recommended when painting new drywall, covering stains, making drastic color changes (especially dark to light), painting over glossy surfaces, or painting porous surfaces like bare wood or masonry. For repainting over the same or similar color on previously painted walls in good condition, most quality paints with built-in primer can skip the separate primer coat.",
        },
        {
          question: "How many coats of paint do I need?",
          answer: "Most interior painting projects need 2 coats for full, even coverage. You may need 3 coats when covering dark colors with light ones, painting over patches or repairs, using lower-quality paint, or applying paint to new drywall without primer. One coat may suffice for touch-ups with the same color or when using premium one-coat paints.",
        },
        {
          question: "What paint finish should I use?",
          answer: "Flat/matte is best for ceilings and low-traffic rooms — it hides imperfections. Eggshell works well for bedrooms and living rooms with a subtle sheen. Satin is ideal for family rooms, hallways, and kids' rooms — easy to clean. Semi-gloss is best for kitchens, bathrooms, trim, and doors — moisture resistant. High gloss is used for cabinets, trim accents, and furniture — very durable and easy to clean.",
        },
        {
          question: "How do I calculate paint for exterior walls?",
          answer: "For exterior walls, calculate the perimeter of your home multiplied by the wall height. Subtract windows and doors. Exterior paint typically covers 250-350 sq ft per gallon due to thicker formulation. Rough surfaces like stucco need more paint. Always add 15-20% waste factor for exterior projects due to wind, overspray, and surface irregularities.",
        },
      ],

      rating: {
        title: "Rate this Calculator",
        share: "Share",
        copied: "Copied!",
        copyLink: "Copy Link",
        clickToRate: "Click to rate",
        youRated: "You rated",
        stars: "stars",
        averageFrom: "average from",
        ratings: "ratings",
      },

      common: { home: "Home", calculators: "Calculators" },
      buttons: {
        calculate: "Calculate",
        reset: "Reset",
        pdf: "PDF",
        csv: "CSV",
        excel: "Excel",
        save: "Save",
        saved: "Saved",
        saving: "Saving...",
      },
      share: { calculatedWith: "Calculated with Kalcufy.com" },
      accessibility: { mobileResults: "Results", closeModal: "Close", openMenu: "Menu" },
      sources: { title: "Sources & References" },
    },
  },

  inputs: [
    {
      id: "projectType",
      type: "radio",
      defaultValue: "interior",
      options: [{ value: "interior" }, { value: "exterior" }],
    },
    {
      id: "roomLength",
      type: "number",
      defaultValue: null,
      placeholder: "12",
      unitType: "length",
      syncGroup: false,
      defaultUnit: "ft",
      allowedUnits: ["ft", "m"],
    },
    {
      id: "roomWidth",
      type: "number",
      defaultValue: null,
      placeholder: "10",
      unitType: "length",
      syncGroup: false,
      defaultUnit: "ft",
      allowedUnits: ["ft", "m"],
    },
    {
      id: "wallHeight",
      type: "number",
      defaultValue: 8,
      placeholder: "8",
      unitType: "length",
      syncGroup: false,
      defaultUnit: "ft",
      allowedUnits: ["ft", "m"],
    },
    {
      id: "doors",
      type: "number",
      defaultValue: 1,
      min: 0,
      max: 20,
      step: 1,
    },
    {
      id: "windows",
      type: "number",
      defaultValue: 2,
      min: 0,
      max: 30,
      step: 1,
    },
    {
      id: "paintCeiling",
      type: "radio",
      defaultValue: "no",
      options: [{ value: "no" }, { value: "yes" }],
    },
    {
      id: "paintFinish",
      type: "select",
      defaultValue: "eggshell",
      options: [
        { value: "flat" },
        { value: "eggshell" },
        { value: "satin" },
        { value: "semiGloss" },
        { value: "gloss" },
      ],
    },
    {
      id: "surfaceType",
      type: "select",
      defaultValue: "smooth",
      options: [
        { value: "smooth" },
        { value: "textured" },
        { value: "rough" },
      ],
    },
    {
      id: "coats",
      type: "number",
      defaultValue: 2,
      min: 1,
      max: 5,
      step: 1,
    },
    {
      id: "includePrimer",
      type: "radio",
      defaultValue: "no",
      options: [{ value: "no" }, { value: "yes" }],
    },
    {
      id: "wasteFactor",
      type: "range",
      defaultValue: 10,
      min: 0,
      max: 30,
      step: 1,
      suffix: "%",
    },
    {
      id: "costPerGallon",
      type: "number",
      defaultValue: 35,
      placeholder: "35",
      min: 0,
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "USD",
    },
  ],

  inputGroups: [],

  results: [
    { id: "paintNeeded", type: "primary", format: "text" },
    { id: "paintableArea", type: "secondary", format: "text" },
    { id: "estimatedCost", type: "secondary", format: "text" },
    { id: "estimatedLabor", type: "secondary", format: "text" },
  ],

  infoCards: [
    { id: "estimate", type: "list", icon: "🎨", itemCount: 4 },
    { id: "details", type: "list", icon: "🔧", itemCount: 4 },
    { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  referenceData: [],

  educationSections: [
    { id: "whatIs", type: "prose", icon: "📖" },
    { id: "howItWorks", type: "prose", icon: "⚙️" },
    { id: "considerations", type: "list", icon: "📋", itemCount: 6 },
    { id: "coverage", type: "list", icon: "📊", itemCount: 6 },
    { id: "examples", type: "code-example", icon: "🧮", columns: 2, exampleCount: 2 },
  ],

  faqs: [{ id: "0" }, { id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }],

  references: [
    {
      authors: "Sherwin-Williams",
      year: "2025",
      title: "Paint Coverage Calculator & Estimation Guide",
      source: "Sherwin-Williams",
      url: "https://www.sherwin-williams.com/en-us/paint-calculator",
    },
    {
      authors: "Benjamin Moore",
      year: "2025",
      title: "How to Calculate Paint Needed for a Room",
      source: "Benjamin Moore",
      url: "https://www.benjaminmoore.com/en-us/paint-calculator",
    },
  ],

  hero: { badge: "Home & Construction", title: "Paint Calculator" },
  sidebar: { showConversions: true, showRelated: true },
  features: { showPresets: true, showShare: true, showPrint: true },
  relatedCalculators: ["concrete-calculator", "square-feet-to-square-meters"],
  ads: { showTopBanner: false, showSidebar: true, showBetweenSections: false },
};

// ============================================================================
// CALCULATE FUNCTION
// ============================================================================

function fmtNum(val: number): string {
  if (val === 0) return "0";
  if (Math.abs(val) < 0.01) return val.toExponential(2);
  if (Math.abs(val) >= 1000) return val.toLocaleString("en-US", { maximumFractionDigits: 0 });
  return val.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 1 });
}

export function calculatePaintCalculator(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits = {}, t } = data;
  const v = (t?.values as Record<string, string>) || {};
  const f = (t?.formats as Record<string, string>) || {};

  // — Read & convert inputs to feet (base unit for length = m, so convert to ft) —
  const roomLengthRaw = values.roomLength as number | null;
  const roomWidthRaw = values.roomWidth as number | null;
  const wallHeightRaw = values.wallHeight as number | null;

  if (!roomLengthRaw || !roomWidthRaw || !wallHeightRaw) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  // Convert to meters (base), then to feet for calculation
  const roomLengthM = convertToBase(roomLengthRaw, fieldUnits.roomLength || "ft", "length");
  const roomWidthM = convertToBase(roomWidthRaw, fieldUnits.roomWidth || "ft", "length");
  const wallHeightM = convertToBase(wallHeightRaw, fieldUnits.wallHeight || "ft", "length");

  // Convert meters to feet for sq ft calculation
  const M_TO_FT = 3.28084;
  const roomLengthFt = roomLengthM * M_TO_FT;
  const roomWidthFt = roomWidthM * M_TO_FT;
  const wallHeightFt = wallHeightM * M_TO_FT;

  const doors = (values.doors as number) || 0;
  const windows = (values.windows as number) || 0;
  const paintCeiling = values.paintCeiling as string || "no";
  const surfaceType = values.surfaceType as string || "smooth";
  const coats = (values.coats as number) || 2;
  const includePrimer = values.includePrimer as string || "no";
  const wasteFactor = (values.wasteFactor as number) || 10;
  const costPerGallon = (values.costPerGallon as number) || 35;
  const projectType = values.projectType as string || "interior";

  // — Calculate areas (sq ft) —
  const perimeter = 2 * (roomLengthFt + roomWidthFt);
  const totalWallArea = perimeter * wallHeightFt;

  const DOOR_AREA = 21; // sq ft per standard door
  const WINDOW_AREA = 15; // sq ft per standard window
  const doorWindowDeduction = (doors * DOOR_AREA) + (windows * WINDOW_AREA);

  const ceilingArea = paintCeiling === "yes" ? roomLengthFt * roomWidthFt : 0;
  const paintableArea = Math.max(totalWallArea - doorWindowDeduction + ceilingArea, 0);

  // — Coverage rates (sq ft per gallon) —
  const coverageRates: Record<string, number> = {
    smooth: projectType === "exterior" ? 325 : 375,
    textured: projectType === "exterior" ? 250 : 275,
    rough: projectType === "exterior" ? 175 : 200,
  };
  const coveragePerGallon = coverageRates[surfaceType] || 375;

  // — Paint calculation —
  const wasteMultiplier = 1 + (wasteFactor / 100);
  const paintGallons = (paintableArea / coveragePerGallon) * coats * wasteMultiplier;
  const primerGallons = includePrimer === "yes"
    ? (paintableArea / 400) * wasteMultiplier // primer covers ~400 sq ft/gal
    : 0;

  // — Cost —
  const paintCost = paintGallons * costPerGallon;
  const primerCost = primerGallons * (costPerGallon * 0.7); // primer ~70% paint cost
  const totalCost = paintCost + primerCost;

  // — Labor estimate (sq ft per hour) —
  const laborRate = projectType === "exterior" ? 100 : 150; // sq ft/hour
  const laborHours = (paintableArea * coats) / laborRate;

  // — Currency symbol —
  const curr = fieldUnits.costPerGallon || "USD";
  const SYMBOLS: Record<string, string> = {
    USD: "$", EUR: "€", GBP: "£", MXN: "MX$", BRL: "R$",
    CAD: "C$", AUD: "A$", JPY: "¥", INR: "₹", CHF: "CHF ",
    COP: "COL$", ARS: "AR$", PEN: "S/", CLP: "CLP ",
  };
  const sym = SYMBOLS[curr] || "$";

  // — Translated units —
  const galUnit = v["gal"] || "gal";
  const sqftUnit = v["sq ft"] || "sq ft";
  const hrsUnit = v["hrs"] || "hrs";

  // — Format —
  const ceilPaint = Math.ceil(paintGallons * 10) / 10;
  const ceilPrimer = Math.ceil(primerGallons * 10) / 10;

  return {
    values: {
      paintNeeded: ceilPaint,
      paintableArea,
      estimatedCost: totalCost,
      estimatedLabor: laborHours,
      totalWallArea,
      deduction: doorWindowDeduction,
      ceilingArea,
      primerNeeded: ceilPrimer,
      totalCost,
      laborTime: laborHours,
    },
    formatted: {
      paintNeeded: `${fmtNum(ceilPaint)} ${galUnit}`,
      paintableArea: `${fmtNum(Math.round(paintableArea))} ${sqftUnit}`,
      estimatedCost: `${sym}${fmtNum(Math.round(totalCost))}`,
      estimatedLabor: `${fmtNum(Math.round(laborHours * 10) / 10)} ${hrsUnit}`,
      totalWallArea: `${fmtNum(Math.round(totalWallArea))} ${sqftUnit}`,
      deduction: `${fmtNum(Math.round(doorWindowDeduction))} ${sqftUnit}`,
      ceilingArea: paintCeiling === "yes" ? `${fmtNum(Math.round(ceilingArea))} ${sqftUnit}` : "—",
      primerNeeded: includePrimer === "yes" ? `${fmtNum(ceilPrimer)} ${galUnit}` : "—",
      totalCost: `${sym}${fmtNum(Math.round(totalCost))}`,
      laborTime: `~${fmtNum(Math.round(laborHours * 10) / 10)} ${hrsUnit}`,
    },
    summary:
      f.summary
        ?.replace("{gallons}", fmtNum(ceilPaint))
        .replace("{area}", fmtNum(Math.round(paintableArea))) ||
      `You need approximately ${fmtNum(ceilPaint)} gallons of paint for ${fmtNum(Math.round(paintableArea))} sq ft of paintable surface.`,
    isValid: true,
  };
}

export default paintCalculatorConfig;
