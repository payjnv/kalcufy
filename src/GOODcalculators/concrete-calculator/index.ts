import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";
import { convertToBase } from "@/engine/v4/units";

// ============================================================================
// CONCRETE CALCULATOR - V4 (EN ONLY)
// ============================================================================

export const concreteCalculatorConfig: CalculatorConfigV4 = {
  id: "concrete-calculator",
  version: "4.0",
  category: "home",
  icon: "🏗️",

  presets: [
    {
      id: "patioSlab",
      icon: "🏡",
      values: {
        projectShape: "slab",
        length: 10,
        width: 10,
        thickness: 4,
        quantity: 1,
        wasteFactor: 10,
        bagSize: "80",
        costPerCubicYard: 150,
        estimateRebar: "no",
      },
    },
    {
      id: "driveway",
      icon: "🚗",
      values: {
        projectShape: "slab",
        length: 20,
        width: 10,
        thickness: 6,
        quantity: 1,
        wasteFactor: 10,
        bagSize: "80",
        costPerCubicYard: 150,
        estimateRebar: "yes",
        rebarSpacing: 12,
      },
    },
    {
      id: "sidewalk",
      icon: "🚶",
      values: {
        projectShape: "slab",
        length: 30,
        width: 3,
        thickness: 4,
        quantity: 1,
        wasteFactor: 10,
        bagSize: "80",
        costPerCubicYard: 150,
        estimateRebar: "no",
      },
    },
    {
      id: "fencePosts",
      icon: "🏗️",
      values: {
        projectShape: "column",
        diameter: 10,
        columnHeight: 24,
        quantity: 10,
        wasteFactor: 10,
        bagSize: "80",
        costPerCubicYard: 150,
        estimateRebar: "no",
      },
    },
  ],

  t: {
    en: {
      name: "Concrete Calculator",
      slug: "concrete-calculator",
      subtitle: "Estimate cubic yards, bags, weight, cost, and rebar for slabs, columns, tubes, and stairs.",
      breadcrumb: "Concrete",

      seo: {
        title: "Concrete Calculator - Free Cubic Yards & Bags Estimator",
        description: "Estimate cubic yards, bags, weight, cost, and rebar for slabs, footings, columns, and walls. Supports 40, 60, and 80 lb bags with waste factor adjustment.",
        shortDescription: "Calculate concrete volume and bags for any project.",
        keywords: [
          "concrete calculator",
          "how much concrete do i need",
          "cubic yard calculator",
          "concrete bags calculator",
          "slab calculator",
          "footing calculator",
          "free concrete calculator",
          "concrete cost estimator",
        ],
      },

      calculator: { yourInformation: "Project Dimensions" },
      ui: {
        yourInformation: "Project Dimensions",
        calculate: "Calculate",
        reset: "Reset",
        results: "Results",
      },

      inputs: {
        projectShape: {
          label: "Project Shape",
          helpText: "Select the shape of your concrete project",
          options: {
            slab: "Slab / Footing",
            column: "Column / Post",
            wall: "Wall",
          },
        },
        length: {
          label: "Length",
          helpText: "Length of the slab, footing, or wall",
        },
        width: {
          label: "Width",
          helpText: "Width of the slab or footing",
        },
        thickness: {
          label: "Thickness",
          helpText: "Depth of concrete (typically 4-6 inches for slabs)",
        },
        diameter: {
          label: "Diameter",
          helpText: "Diameter of round column or post hole",
        },
        columnHeight: {
          label: "Height",
          helpText: "Height of the column or post",
        },
        wallThickness: {
          label: "Wall Thickness",
          helpText: "Thickness of the poured wall",
        },
        wallHeight: {
          label: "Wall Height",
          helpText: "Height of the wall",
        },
        quantity: {
          label: "Quantity",
          helpText: "Number of identical units",
        },
        wasteFactor: {
          label: "Waste Factor",
          helpText: "5-10% extra recommended",
        },
        bagSize: {
          label: "Bag Size",
          helpText: "Size of pre-mixed concrete bags",
          options: {
            "40": "40 lb bag",
            "60": "60 lb bag",
            "80": "80 lb bag",
          },
        },
        costPerCubicYard: {
          label: "Cost per Cubic Yard",
          helpText: "Ready-mix typically $125-170/yd³",
        },
        estimateRebar: {
          label: "Estimate Rebar?",
          helpText: "Calculate rebar for reinforcement",
          options: { no: "No", yes: "Yes" },
        },
        rebarSpacing: {
          label: "Rebar Spacing",
          helpText: "Distance between rebar bars (inches)",
        },
      },

      results: {
        concreteVolume: { label: "Concrete Volume" },
        bagsNeeded: { label: "Bags Needed" },
        totalWeight: { label: "Total Weight" },
        estimatedCost: { label: "Estimated Cost" },
      },

      presets: {
        patioSlab: { label: "Patio Slab", description: "10×10 ft, 4 in thick" },
        driveway: { label: "Driveway", description: "20×10 ft, 6 in thick with rebar" },
        sidewalk: { label: "Sidewalk", description: "30×3 ft, 4 in thick" },
        fencePosts: { label: "Fence Posts", description: "10 posts, 10 in × 24 in" },
      },

      values: {
        "yd³": "yd³",
        "ft³": "ft³",
        "m³": "m³",
        "bags": "bags",
        "bag": "bag",
        "lbs": "lbs",
        "tons": "tons",
        "ton": "ton",
        "ft": "ft",
        "in": "in",
        "pcs": "pcs",
      },

      formats: {
        summary: "You need {volume} cubic yards ({bags} bags) of concrete for this project.",
      },

      infoCards: {
        estimate: {
          title: "🧱 Concrete Estimate",
          items: [
            { label: "Volume", valueKey: "volumeFormatted" },
            { label: "Bags Needed", valueKey: "bagsFormatted" },
            { label: "Total Weight", valueKey: "weightFormatted" },
            { label: "Estimated Cost", valueKey: "costFormatted" },
          ],
        },
        details: {
          title: "📐 Project Details",
          items: [
            { label: "Volume (ft³)", valueKey: "volumeFt3" },
            { label: "Bags Breakdown", valueKey: "bagsBreakdown" },
            { label: "Rebar Estimate", valueKey: "rebarEstimate" },
            { label: "Recommendation", valueKey: "recommendation" },
          ],
        },
        tips: {
          title: "💡 Concrete Tips",
          items: [
            "Always add 5-10% extra for waste, spillage, and uneven subgrade — running short mid-pour is costly.",
            "Standard concrete reaches 90% strength in 28 days. Keep it damp during the first week for best curing results.",
            "For projects over 1 cubic yard, order ready-mix delivery — it saves hours of mixing and ensures consistent quality.",
            "Use rebar or wire mesh on slabs over 4 inches thick and any driveway or load-bearing surface to prevent cracking.",
          ],
        },
      },

      education: {
        whatIs: {
          title: "How to Calculate Concrete Volume",
          content: "Calculating concrete volume depends on the shape of your project. For rectangular slabs and footings, multiply length × width × thickness (depth). For cylindrical columns and post holes, use π × radius² × height. Convert the result to cubic yards by dividing cubic feet by 27. One cubic yard of concrete weighs approximately 4,000 lbs (about 2 tons). Always order 5-10% extra to account for waste, spillage, and uneven ground. Ready-mix concrete is sold by the cubic yard and typically costs $125-170 per yard depending on your location and mix specifications.",
        },
        howItWorks: {
          title: "Bags vs. Ready-Mix Concrete",
          content: "Pre-mixed concrete bags come in 40, 60, and 80 lb sizes. An 80 lb bag yields approximately 0.6 cubic feet (0.022 cubic yards). You need about 45 bags of 80-lb concrete to make one cubic yard. For projects under 1 cubic yard, bags are practical for DIY mixing. For larger projects, ready-mix delivery from a concrete truck is more economical ($125-170/yard vs $200-300/yard from bags) and ensures consistent quality. The minimum truck delivery is typically 1 cubic yard. Mixing concrete properly requires the right water ratio — too much water weakens the concrete, while too little makes it difficult to work with.",
        },
        considerations: {
          title: "Important Considerations",
          items: [
            { text: "Never order the exact amount — add 5-10% waste factor for spillage and uneven subgrade", type: "warning" },
            { text: "Concrete should be poured above 40°F (4°C) — cold weather can permanently damage curing concrete", type: "warning" },
            { text: "Standard residential slab thickness is 4 inches for patios, 5-6 inches for driveways and garages", type: "info" },
            { text: "Concrete can be walked on in 24-48 hours but needs 28 days to reach full strength", type: "info" },
            { text: "Rebar spacing of 12 inches is standard for driveways; 18 inches for patios and walkways", type: "info" },
            { text: "For colored concrete, add 5-10% more volume to account for pigment displacement", type: "info" },
          ],
        },
        bagYields: {
          title: "Bag Size Yields",
          items: [
            { text: "40 lb bag: yields ~0.30 ft³ (0.011 yd³) — easiest to carry, most bags needed", type: "info" },
            { text: "60 lb bag: yields ~0.45 ft³ (0.017 yd³) — good balance of weight and yield", type: "info" },
            { text: "80 lb bag: yields ~0.60 ft³ (0.022 yd³) — most economical per cubic foot", type: "info" },
            { text: "1 cubic yard needs: ~90 bags (40 lb), ~60 bags (60 lb), or ~45 bags (80 lb)", type: "info" },
            { text: "Bags are ideal for projects under 0.5 cubic yards — above that, consider ready-mix delivery", type: "info" },
            { text: "Quick estimate for 4-inch slabs: square footage ÷ 81 = cubic yards needed", type: "info" },
          ],
        },
        examples: {
          title: "Concrete Calculation Examples",
          description: "Step-by-step examples for common projects",
          examples: [
            {
              title: "10×10 ft Patio Slab (4 in)",
              steps: [
                "Volume = 10 × 10 × (4/12) = 33.33 ft³",
                "Convert: 33.33 ÷ 27 = 1.23 yd³",
                "Add 10% waste: 1.23 × 1.10 = 1.36 yd³",
                "80 lb bags: 1.36 ÷ 0.022 = 62 bags",
                "Weight: 1.36 × 4,000 = 5,440 lbs",
                "Cost: 1.36 × $150 = ~$204",
              ],
              result: "1.36 yd³ = 62 bags (80 lb) ≈ $204",
            },
            {
              title: "10 Fence Post Holes (10 in × 24 in)",
              steps: [
                "Radius = 5 in = 0.417 ft",
                "Volume per post = π × 0.417² × 2 = 1.09 ft³",
                "Total: 1.09 × 10 = 10.9 ft³",
                "Convert: 10.9 ÷ 27 = 0.40 yd³",
                "Add 10% waste: 0.40 × 1.10 = 0.44 yd³",
                "80 lb bags: 0.44 ÷ 0.022 = 20 bags",
              ],
              result: "0.44 yd³ = 20 bags (80 lb) ≈ $66",
            },
          ],
        },
      },

      faqs: [
        {
          question: "How much concrete do I need for a 10×10 slab?",
          answer: "A 10×10 foot slab at 4 inches thick requires approximately 1.23 cubic yards, which is about 56 bags of 80 lb concrete (before waste factor). With a 10% waste factor, order about 62 bags or 1.36 cubic yards. For a 6-inch thick slab, you'll need approximately 1.85 cubic yards or 84 bags of 80 lb concrete.",
        },
        {
          question: "How many bags of concrete are in a cubic yard?",
          answer: "One cubic yard requires approximately 45 bags of 80 lb concrete, 60 bags of 60 lb concrete, or 90 bags of 40 lb concrete. These numbers can vary slightly by brand, so always check the bag yield on the packaging. For large projects over 1 cubic yard, ready-mix delivery is usually more practical and cost-effective.",
        },
        {
          question: "How much does a cubic yard of concrete weigh?",
          answer: "A cubic yard of standard ready-mix concrete weighs approximately 3,700-4,100 lbs (about 2 tons). The exact weight depends on the mix design and moisture content. Lightweight concrete weighs about 2,800 lbs per cubic yard, while heavy-duty structural concrete can weigh up to 4,400 lbs per cubic yard.",
        },
        {
          question: "Should I use bags or ready-mix concrete?",
          answer: "Use bags for small projects under 0.5-1 cubic yard (fence posts, small repairs, steps). Use ready-mix truck delivery for anything over 1 cubic yard — it's more economical ($125-170/yd vs $200-300/yd from bags), saves hours of manual mixing, and ensures consistent quality. Most suppliers have a minimum delivery of 1 cubic yard.",
        },
        {
          question: "How thick should my concrete slab be?",
          answer: "Standard residential thicknesses: 4 inches for patios, walkways, and sidewalks. 5-6 inches for driveways and garage floors that support vehicles. 6-8 inches for heavy-duty applications like RV pads or commercial floors. Footings are typically 12+ inches deep. Thicker slabs should include rebar or wire mesh reinforcement.",
        },
        {
          question: "Do I need rebar in my concrete slab?",
          answer: "Rebar is recommended for driveways, garage floors, and any load-bearing slab. Use #4 rebar (1/2 inch diameter) spaced 12 inches apart for driveways, or 18 inches apart for patios. For walkways and small patios, wire mesh (6×6 inch grid) is sufficient. Rebar should be placed in the middle third of the slab thickness — use rebar chairs to keep it elevated off the ground.",
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
      id: "projectShape",
      type: "select",
      defaultValue: "slab",
      options: [
        { value: "slab" },
        { value: "column" },
        { value: "wall" },
      ],
    },
    // ── SLAB / FOOTING fields ──
    {
      id: "length",
      type: "number",
      defaultValue: null,
      placeholder: "10",
      unitType: "length",
      syncGroup: false,
      defaultUnit: "ft",
      allowedUnits: ["ft", "m"],
      showWhen: { field: "projectShape", value: ["slab", "wall"] },
    },
    {
      id: "width",
      type: "number",
      defaultValue: null,
      placeholder: "10",
      unitType: "length",
      syncGroup: false,
      defaultUnit: "ft",
      allowedUnits: ["ft", "m"],
      showWhen: { field: "projectShape", value: "slab" },
    },
    {
      id: "thickness",
      type: "number",
      defaultValue: 4,
      placeholder: "4",
      min: 1,
      max: 48,
      unitType: "length_small",
      syncGroup: false,
      defaultUnit: "in",
      allowedUnits: ["in", "cm"],
      showWhen: { field: "projectShape", value: "slab" },
    },
    // ── COLUMN fields ──
    {
      id: "diameter",
      type: "number",
      defaultValue: null,
      placeholder: "10",
      unitType: "length_small",
      syncGroup: false,
      defaultUnit: "in",
      allowedUnits: ["in", "cm"],
      showWhen: { field: "projectShape", value: "column" },
    },
    {
      id: "columnHeight",
      type: "number",
      defaultValue: null,
      placeholder: "24",
      unitType: "length_small",
      syncGroup: false,
      defaultUnit: "in",
      allowedUnits: ["in", "cm", "mm"],
      showWhen: { field: "projectShape", value: "column" },
    },
    // ── WALL fields ──
    {
      id: "wallHeight",
      type: "number",
      defaultValue: null,
      placeholder: "4",
      unitType: "length",
      syncGroup: false,
      defaultUnit: "ft",
      allowedUnits: ["ft", "m"],
      showWhen: { field: "projectShape", value: "wall" },
    },
    {
      id: "wallThickness",
      type: "number",
      defaultValue: 8,
      placeholder: "8",
      unitType: "length_small",
      syncGroup: false,
      defaultUnit: "in",
      allowedUnits: ["in", "cm"],
      showWhen: { field: "projectShape", value: "wall" },
    },
    // ── Common fields ──
    {
      id: "quantity",
      type: "number",
      defaultValue: 1,
      min: 1,
      max: 100,
      step: 1,
    },
    {
      id: "wasteFactor",
      type: "range",
      defaultValue: 10,
      min: 0,
      max: 25,
      step: 1,
      suffix: "%",
    },
    {
      id: "bagSize",
      type: "select",
      defaultValue: "80",
      options: [
        { value: "40" },
        { value: "60" },
        { value: "80" },
      ],
    },
    {
      id: "costPerCubicYard",
      type: "number",
      defaultValue: 150,
      placeholder: "150",
      min: 0,
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "USD",
    },
    {
      id: "estimateRebar",
      type: "radio",
      defaultValue: "no",
      options: [{ value: "no" }, { value: "yes" }],
    },
    {
      id: "rebarSpacing",
      type: "number",
      defaultValue: 12,
      placeholder: "12",
      min: 4,
      max: 36,
      step: 1,
      suffix: "in",
      showWhen: { field: "estimateRebar", value: "yes" },
    },
  ],

  inputGroups: [],

  results: [
    { id: "concreteVolume", type: "primary", format: "text" },
    { id: "bagsNeeded", type: "secondary", format: "text" },
    { id: "totalWeight", type: "secondary", format: "text" },
    { id: "estimatedCost", type: "secondary", format: "text" },
  ],

  infoCards: [
    { id: "estimate", type: "list", icon: "🧱", itemCount: 4 },
    { id: "details", type: "list", icon: "📐", itemCount: 4 },
    { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  referenceData: [],

  educationSections: [
    { id: "whatIs", type: "prose", icon: "📖" },
    { id: "howItWorks", type: "prose", icon: "⚙️" },
    { id: "considerations", type: "list", icon: "📋", itemCount: 6 },
    { id: "bagYields", type: "list", icon: "📊", itemCount: 6 },
    { id: "examples", type: "code-example", icon: "🧮", columns: 2, exampleCount: 2 },
  ],

  faqs: [{ id: "0" }, { id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }],

  references: [
    {
      authors: "Portland Cement Association",
      year: "2024",
      title: "Concrete Basics: Mixing & Placing",
      source: "PCA",
      url: "https://www.cement.org/concrete-basics",
    },
    {
      authors: "Quikrete",
      year: "2025",
      title: "Concrete Calculator & Project Guide",
      source: "Quikrete",
      url: "https://www.quikrete.com/calculator/main.asp",
    },
  ],

  hero: { badge: "Home & Construction", title: "Concrete Calculator" },
  sidebar: { showConversions: true, showRelated: true },
  features: { showPresets: true, showShare: true, showPrint: true },
  relatedCalculators: ["paint-calculator", "square-feet-to-square-meters"],
  ads: { showTopBanner: false, showSidebar: true, showBetweenSections: false },
};

// ============================================================================
// CALCULATE FUNCTION
// ============================================================================

function fmtNum(val: number): string {
  if (val === 0) return "0";
  if (Math.abs(val) < 0.01) return val.toExponential(2);
  if (Math.abs(val) >= 1000) return val.toLocaleString("en-US", { maximumFractionDigits: 0 });
  return val.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 2 });
}

export function calculateConcreteCalculator(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits = {}, t } = data;
  const v = (t?.values as Record<string, string>) || {};
  const f = (t?.formats as Record<string, string>) || {};

  const projectShape = values.projectShape as string || "slab";
  const quantity = (values.quantity as number) || 1;
  const wasteFactor = (values.wasteFactor as number) || 10;
  const bagSize = values.bagSize as string || "80";
  const costPerCubicYard = (values.costPerCubicYard as number) || 150;
  const estimateRebar = values.estimateRebar as string || "no";
  const rebarSpacing = (values.rebarSpacing as number) || 12;

  // Bag yields in cubic feet
  const BAG_YIELDS: Record<string, number> = {
    "40": 0.30,
    "60": 0.45,
    "80": 0.60,
  };
  const bagYield = BAG_YIELDS[bagSize] || 0.60;
  const bagWeight = parseInt(bagSize) || 80;

  // Convert length base = m, length_small base = mm
  const M_TO_FT = 3.28084;
  const MM_TO_IN = 0.0393701;

  let volumeFt3 = 0;

  if (projectShape === "slab") {
    const lengthRaw = values.length as number | null;
    const widthRaw = values.width as number | null;
    const thicknessRaw = values.thickness as number | null;

    if (!lengthRaw || !widthRaw || !thicknessRaw) {
      return { values: {}, formatted: {}, summary: "", isValid: false };
    }

    // length base = m → ft
    const lengthFt = convertToBase(lengthRaw, fieldUnits.length || "ft", "length") * M_TO_FT;
    const widthFt = convertToBase(widthRaw, fieldUnits.width || "ft", "length") * M_TO_FT;
    // thickness base = mm → in → ft
    const thicknessMm = convertToBase(thicknessRaw, fieldUnits.thickness || "in", "length_small");
    const thicknessIn = thicknessMm * MM_TO_IN;
    const thicknessFt = thicknessIn / 12;

    volumeFt3 = lengthFt * widthFt * thicknessFt * quantity;

  } else if (projectShape === "column") {
    const diameterRaw = values.diameter as number | null;
    const columnHeightRaw = values.columnHeight as number | null;

    if (!diameterRaw || !columnHeightRaw) {
      return { values: {}, formatted: {}, summary: "", isValid: false };
    }

    // diameter & height base = mm → in → ft
    const diameterMm = convertToBase(diameterRaw, fieldUnits.diameter || "in", "length_small");
    const heightMm = convertToBase(columnHeightRaw, fieldUnits.columnHeight || "in", "length_small");
    const diameterIn = diameterMm * MM_TO_IN;
    const heightIn = heightMm * MM_TO_IN;
    const radiusFt = (diameterIn / 2) / 12;
    const heightFt = heightIn / 12;

    volumeFt3 = Math.PI * radiusFt * radiusFt * heightFt * quantity;

  } else if (projectShape === "wall") {
    const lengthRaw = values.length as number | null;
    const wallHeightRaw = values.wallHeight as number | null;
    const wallThicknessRaw = values.wallThickness as number | null;

    if (!lengthRaw || !wallHeightRaw || !wallThicknessRaw) {
      return { values: {}, formatted: {}, summary: "", isValid: false };
    }

    const lengthFt = convertToBase(lengthRaw, fieldUnits.length || "ft", "length") * M_TO_FT;
    const wallHeightFt = convertToBase(wallHeightRaw, fieldUnits.wallHeight || "ft", "length") * M_TO_FT;
    const wallThicknessMm = convertToBase(wallThicknessRaw, fieldUnits.wallThickness || "in", "length_small");
    const wallThicknessFt = (wallThicknessMm * MM_TO_IN) / 12;

    volumeFt3 = lengthFt * wallHeightFt * wallThicknessFt * quantity;
  }

  if (volumeFt3 <= 0) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  // Apply waste factor
  const wasteMultiplier = 1 + (wasteFactor / 100);
  const volumeFt3WithWaste = volumeFt3 * wasteMultiplier;

  // Convert to cubic yards
  const volumeYd3 = volumeFt3WithWaste / 27;
  const volumeM3 = volumeFt3WithWaste * 0.0283168;

  // Bags needed
  const bagsNeeded = Math.ceil(volumeFt3WithWaste / bagYield);

  // Weight
  const weightLbs = volumeYd3 * 4000; // ~4000 lbs per yd³
  const weightTons = weightLbs / 2000;

  // Cost
  const cost = volumeYd3 * costPerCubicYard;

  // Rebar estimate
  let rebarPieces = 0;
  let rebarLengthFt = 0;
  if (estimateRebar === "yes" && (projectShape === "slab" || projectShape === "wall")) {
    // For slab: rebar grid both directions
    const lengthRaw = values.length as number;
    const widthRaw = projectShape === "slab" ? (values.width as number) : (values.wallHeight as number);

    if (lengthRaw && widthRaw) {
      const lFt = convertToBase(lengthRaw, fieldUnits.length || "ft", "length") * M_TO_FT;
      const wFt = projectShape === "slab"
        ? convertToBase(widthRaw, fieldUnits.width || "ft", "length") * M_TO_FT
        : convertToBase(widthRaw, fieldUnits.wallHeight || "ft", "length") * M_TO_FT;

      const spacingFt = rebarSpacing / 12;
      const barsLengthwise = Math.ceil(wFt / spacingFt) + 1;
      const barsWidthwise = Math.ceil(lFt / spacingFt) + 1;
      rebarPieces = (barsLengthwise + barsWidthwise) * quantity;
      rebarLengthFt = (barsLengthwise * lFt + barsWidthwise * wFt) * quantity;
    }
  }

  // Currency symbol
  const curr = fieldUnits.costPerCubicYard || "USD";
  const SYMBOLS: Record<string, string> = {
    USD: "$", EUR: "€", GBP: "£", MXN: "MX$", BRL: "R$",
    CAD: "C$", AUD: "A$", JPY: "¥", INR: "₹", CHF: "CHF ",
    COP: "COL$", ARS: "AR$", PEN: "S/", CLP: "CLP ",
  };
  const sym = SYMBOLS[curr] || "$";

  // Recommendation
  let recommendation = "";
  if (volumeYd3 < 0.5) {
    recommendation = `DIY with ${bagsNeeded} bags of ${bagSize} lb mix`;
  } else if (volumeYd3 < 1) {
    recommendation = `${bagsNeeded} bags or consider ready-mix delivery`;
  } else {
    recommendation = `Order ${fmtNum(Math.ceil(volumeYd3 * 10) / 10)} yd³ ready-mix delivery`;
  }

  const yd3Unit = v["yd³"] || "yd³";
  const ft3Unit = v["ft³"] || "ft³";
  const bagsUnit = v["bags"] || "bags";
  const lbsUnit = v["lbs"] || "lbs";

  return {
    values: {
      concreteVolume: volumeYd3,
      bagsNeeded,
      totalWeight: weightLbs,
      estimatedCost: cost,
      volumeFt3: volumeFt3WithWaste,
      volumeM3,
      rebarPieces,
      rebarLengthFt,
    },
    formatted: {
      concreteVolume: `${fmtNum(Math.ceil(volumeYd3 * 100) / 100)} ${yd3Unit}`,
      bagsNeeded: `${bagsNeeded} ${bagsUnit} (${bagSize} lb)`,
      totalWeight: weightTons >= 1
        ? `${fmtNum(Math.round(weightTons * 10) / 10)} ${v["tons"] || "tons"} (${fmtNum(Math.round(weightLbs))} ${lbsUnit})`
        : `${fmtNum(Math.round(weightLbs))} ${lbsUnit}`,
      estimatedCost: `${sym}${fmtNum(Math.round(cost))}`,
      volumeFormatted: `${fmtNum(Math.ceil(volumeYd3 * 100) / 100)} ${yd3Unit}`,
      bagsFormatted: `${bagsNeeded} ${bagsUnit} (${bagSize} lb)`,
      weightFormatted: `${fmtNum(Math.round(weightLbs))} ${lbsUnit}`,
      costFormatted: `${sym}${fmtNum(Math.round(cost))}`,
      volumeFt3: `${fmtNum(Math.round(volumeFt3WithWaste * 10) / 10)} ${ft3Unit}`,
      bagsBreakdown: `${bagsNeeded} × ${bagSize} lb = ${fmtNum(bagsNeeded * bagWeight)} ${lbsUnit}`,
      rebarEstimate: estimateRebar === "yes" && rebarPieces > 0
        ? `${rebarPieces} ${v["pcs"] || "pcs"} (#4 rebar, ${fmtNum(Math.round(rebarLengthFt))} ${v["ft"] || "ft"} total)`
        : "—",
      recommendation,
    },
    summary:
      f.summary
        ?.replace("{volume}", fmtNum(Math.ceil(volumeYd3 * 100) / 100))
        .replace("{bags}", String(bagsNeeded)) ||
      `You need ${fmtNum(Math.ceil(volumeYd3 * 100) / 100)} cubic yards (${bagsNeeded} bags) of concrete.`,
    isValid: true,
  };
}

export default concreteCalculatorConfig;
