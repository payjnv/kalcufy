import type {
  CalculatorConfigV4,
  CalculatorResults,
} from "@/engine/v4/types/engine.types";

// ─── Helpers ─────────────────────────────────────────────────────
function fmtNum(v: number, decimals = 0): string {
  if (v === 0) return "0";
  return v.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/** Convert any length unit to feet */
function toFeet(value: number, unit: string): number {
  const factors: Record<string, number> = {
    ft: 1,
    in: 1 / 12,
    m: 3.28084,
    cm: 0.0328084,
    yd: 3,
    mm: 0.00328084,
  };
  return value * (factors[unit] || 1);
}

/** Convert sq ft to sq m */
function sqFtToSqM(sqFt: number): number {
  return sqFt * 0.092903;
}

// ─── Panel sizes (width × height in feet) ────────────────────────
const PANEL_SIZES: Record<string, { w: number; h: number; label: string }> = {
  "4x8": { w: 4, h: 8, label: '4\' × 8\' (Standard)' },
  "4x10": { w: 4, h: 10, label: '4\' × 10\'' },
  "4x12": { w: 4, h: 12, label: '4\' × 12\'' },
};

// ─── Drywall type weight per sheet (4×8) in lbs ──────────────────
const TYPE_WEIGHT_4x8: Record<string, number> = {
  regular: 51,
  moisture: 54,
  fireRated: 57,
  soundproof: 70,
};

// ─── Config ──────────────────────────────────────────────────────
export const drywallCalculatorConfig: CalculatorConfigV4 = {
  id: "drywall",
  version: "4.0",
  category: "construction",
  icon: "🧱",

  presets: [
    {
      id: "bedroom",
      icon: "🛏️",
      values: {
        panelSize: "4x8",
        drywallType: "regular",
        thickness: "half",
        roomLength: 12,
        roomWidth: 12,
        wallHeight: 8,
        includeCeiling: true,
        numberOfDoors: 1,
        doorHeight: 6.67,
        doorWidth: 3,
        numberOfWindows: 2,
        windowHeight: 3,
        windowWidth: 4,
        wasteFactor: 10,
        includeCost: false,
        pricePerSheet: null,
        laborRate: null,
      },
    },
    {
      id: "masterBedroom",
      icon: "🏠",
      values: {
        panelSize: "4x8",
        drywallType: "regular",
        thickness: "half",
        roomLength: 16,
        roomWidth: 14,
        wallHeight: 8,
        includeCeiling: true,
        numberOfDoors: 1,
        doorHeight: 6.67,
        doorWidth: 3,
        numberOfWindows: 3,
        windowHeight: 3,
        windowWidth: 4,
        wasteFactor: 10,
        includeCost: false,
        pricePerSheet: null,
        laborRate: null,
      },
    },
    {
      id: "livingRoom",
      icon: "🛋️",
      values: {
        panelSize: "4x10",
        drywallType: "regular",
        thickness: "half",
        roomLength: 20,
        roomWidth: 16,
        wallHeight: 9,
        includeCeiling: true,
        numberOfDoors: 2,
        doorHeight: 6.67,
        doorWidth: 3,
        numberOfWindows: 4,
        windowHeight: 3,
        windowWidth: 4,
        wasteFactor: 10,
        includeCost: false,
        pricePerSheet: null,
        laborRate: null,
      },
    },
    {
      id: "basement",
      icon: "🏗️",
      values: {
        panelSize: "4x8",
        drywallType: "moisture",
        thickness: "half",
        roomLength: 24,
        roomWidth: 20,
        wallHeight: 8,
        includeCeiling: false,
        numberOfDoors: 1,
        doorHeight: 6.67,
        doorWidth: 3,
        numberOfWindows: 2,
        windowHeight: 2,
        windowWidth: 3,
        wasteFactor: 12,
        includeCost: false,
        pricePerSheet: null,
        laborRate: null,
      },
    },
    {
      id: "garage",
      icon: "🚗",
      values: {
        panelSize: "4x8",
        drywallType: "fireRated",
        thickness: "fiveEighths",
        roomLength: 24,
        roomWidth: 24,
        wallHeight: 10,
        includeCeiling: true,
        numberOfDoors: 1,
        doorHeight: 7,
        doorWidth: 3,
        numberOfWindows: 0,
        windowHeight: 3,
        windowWidth: 4,
        wasteFactor: 12,
        includeCost: false,
        pricePerSheet: null,
        laborRate: null,
      },
    },
    {
      id: "bathroom",
      icon: "🚿",
      values: {
        panelSize: "4x8",
        drywallType: "moisture",
        thickness: "half",
        roomLength: 8,
        roomWidth: 6,
        wallHeight: 8,
        includeCeiling: true,
        numberOfDoors: 1,
        doorHeight: 6.67,
        doorWidth: 2.5,
        numberOfWindows: 1,
        windowHeight: 2,
        windowWidth: 3,
        wasteFactor: 15,
        includeCost: false,
        pricePerSheet: null,
        laborRate: null,
      },
    },
  ],

  t: {
    en: {
      name: "Drywall Calculator",
      slug: "drywall",
      subtitle:
        "Calculate how many drywall sheets you need, plus screws, tape, joint compound, and cost estimates.",
      breadcrumb: "Drywall",

      seo: {
        title: "Drywall Calculator - Free Sheetrock & Materials Estimator",
        description:
          "Calculate how many drywall sheets, screws, tape, and joint compound you need. Get a full material list with cost estimates for any room.",
        shortDescription:
          "Estimate drywall sheets, materials, and total cost for your project.",
        keywords: [
          "drywall calculator",
          "sheetrock calculator",
          "drywall sheet calculator",
          "how much drywall do I need",
          "drywall cost calculator",
          "free drywall calculator",
          "gypsum board calculator",
          "drywall materials estimator",
        ],
      },

      calculator: { yourInformation: "Room & Material Details" },
      ui: {
        yourInformation: "Room & Material Details",
        calculate: "Calculate",
        reset: "Reset",
        results: "Results",
      },

      inputs: {
        panelSize: {
          label: "Panel Size",
          helpText: "Standard 4'×8' works for most rooms. Use taller panels for 9'+ ceilings to reduce horizontal joints",
          options: {
            "4x8": "4' × 8'",
            "4x10": "4' × 10'",
            "4x12": "4' × 12'",
          },
        },
        drywallType: {
          label: "Drywall Type",
          helpText: "Regular for most rooms. Moisture-resistant for bathrooms/kitchens. Fire-rated for garages",
          options: {
            regular: "Regular (White Board)",
            moisture: "Moisture-Resistant (Green Board)",
            fireRated: "Fire-Rated (Type X)",
            soundproof: "Soundproof (Type STC)",
          },
        },
        thickness: {
          label: "Thickness",
          helpText: "½\" is standard for walls. ⅝\" for ceilings and fire-rated. ¼\" for curved surfaces",
          options: {
            quarter: '¼"',
            threeEighths: '⅜"',
            half: '½" (Standard)',
            fiveEighths: '⅝" (Fire/Ceiling)',
          },
        },
        roomLength: {
          label: "Room Length",
          helpText: "Measure the longest wall of the room",
        },
        roomWidth: {
          label: "Room Width",
          helpText: "Measure the shorter wall of the room",
        },
        wallHeight: {
          label: "Wall Height",
          helpText: "Floor to ceiling height — standard is 8 ft (2.44 m)",
        },
        includeCeiling: {
          label: "Include Ceiling",
          helpText: "Toggle on if you're also drywalling the ceiling",
        },
        numberOfDoors: {
          label: "Number of Doors",
          helpText: "Standard interior door openings to subtract from wall area",
        },
        doorHeight: {
          label: "Door Height",
          helpText: "Standard interior door is 6'8\" (80 inches / 2.03 m)",
        },
        doorWidth: {
          label: "Door Width",
          helpText: "Standard interior door is 3 ft (36 inches / 0.91 m)",
        },
        numberOfWindows: {
          label: "Number of Windows",
          helpText: "Window openings to subtract from wall area",
        },
        windowHeight: {
          label: "Window Height",
          helpText: "Standard window is 3 ft (36 inches / 0.91 m)",
        },
        windowWidth: {
          label: "Window Width",
          helpText: "Standard window is 4 ft (48 inches / 1.22 m)",
        },
        wasteFactor: {
          label: "Waste Factor",
          helpText: "Account for cuts, mistakes, and odd shapes. 10% for simple rooms, 15% for complex layouts",
        },
        includeCost: {
          label: "Include Cost Estimate",
          helpText: "Toggle on to calculate material and labor costs",
        },
        pricePerSheet: {
          label: "Price per Sheet",
          helpText: "Average cost: $10-$15 for regular, $14-$20 for moisture/fire-rated",
        },
        laborRate: {
          label: "Labor Rate per Sheet",
          helpText: "Professional installation: $6-$12 per sheet (hang only) or $30-$60 with finishing",
        },
      },

      results: {
        totalArea: { label: "Total Drywall Area" },
        sheetsNeeded: { label: "Sheets Needed" },
        screws: { label: "Screws Needed" },
        jointCompound: { label: "Joint Compound" },
        tape: { label: "Drywall Tape" },
        cornerBead: { label: "Corner Bead" },
        materialCost: { label: "Material Cost" },
        laborCost: { label: "Labor Cost" },
        totalCost: { label: "Total Cost" },
      },

      presets: {
        bedroom: {
          label: "Standard Bedroom",
          description: "12' × 12' room with 1 door and 2 windows",
        },
        masterBedroom: {
          label: "Master Bedroom",
          description: "16' × 14' room with 1 door and 3 windows",
        },
        livingRoom: {
          label: "Living Room",
          description: "20' × 16' room with 2 doors and 4 windows",
        },
        basement: {
          label: "Basement",
          description: "24' × 20' room, walls only, moisture-resistant",
        },
        garage: {
          label: "Garage",
          description: "24' × 24' room, fire-rated with ceiling",
        },
        bathroom: {
          label: "Bathroom",
          description: "8' × 6' room, moisture-resistant board",
        },
      },

      values: {
        sqft: "sq ft",
        sqm: "m²",
        sheets: "sheets",
        sheet: "sheet",
        screws: "screws",
        lbs: "lbs",
        kg: "kg",
        gallons: "gal",
        liters: "L",
        ft: "ft",
        m: "m",
        pieces: "pcs",
        rolls: "rolls",
        roll: "roll",
        buckets: "buckets",
        bucket: "bucket",
      },

      formats: {
        summary:
          "You need {sheets} drywall sheets to cover {area} of wall and ceiling area (including {waste}% waste).",
      },

      infoCards: {
        materials: {
          title: "📦 Materials List",
          items: [
            { label: "Drywall Sheets", valueKey: "sheetsNeeded" },
            { label: "Drywall Screws", valueKey: "screws" },
            { label: "Joint Compound", valueKey: "jointCompound" },
            { label: "Drywall Tape", valueKey: "tape" },
          ],
        },
        details: {
          title: "📐 Area Breakdown",
          items: [
            { label: "Total Drywall Area", valueKey: "totalArea" },
            { label: "Wall Area (net)", valueKey: "netWallArea" },
            { label: "Ceiling Area", valueKey: "ceilingArea" },
            { label: "Openings Deducted", valueKey: "openingsArea" },
          ],
        },
        tips: {
          title: "💡 Installation Tips",
          items: [
            "Hang ceiling sheets first, then walls — use a drywall lift for ceilings",
            "Stagger joints between rows to increase wall strength and reduce cracking",
            "Drive screws just below paper surface without breaking through",
            "Apply 3 coats of joint compound: tape coat, fill coat, and finish coat",
          ],
        },
      },

      education: {
        whatIs: {
          title: "What Is Drywall?",
          content:
            "Drywall (also called sheetrock, gypsum board, or plasterboard) is a construction material made of gypsum plaster (calcium sulfate dihydrate, CaSO₄·2H₂O) pressed between two thick sheets of paper. It is the most common interior wall and ceiling material used in North America, having largely replaced traditional lath and plaster since the 1950s. Drywall comes in standard 4-foot-wide panels of varying lengths (8, 10, and 12 feet) and thicknesses (¼\", ⅜\", ½\", and ⅝\"). The gypsum core provides fire resistance because when exposed to heat, the water molecules in the gypsum evaporate, slowing the spread of fire. Specialized types include moisture-resistant (green board) for bathrooms and kitchens, fire-rated (Type X) with glass fibers for garages and shared walls, and soundproof varieties with damping compounds for noise reduction between rooms.",
        },
        howItWorks: {
          title: "How the Drywall Calculator Works",
          content:
            "This calculator estimates drywall materials by computing the total wall area (perimeter × height), optionally adding ceiling area (length × width), then subtracting openings for doors and windows. A waste factor (typically 10-15%) is added to account for cuts around outlets, corners, and fitting. The total area is divided by the chosen panel size to determine sheets needed, always rounding up since partial sheets cannot be purchased. From the sheet count, the calculator derives fastener requirements (~32 screws per 4'×8' sheet), joint compound quantity (~1 gallon per 100 sq ft for 3 coats), and tape length based on joint linear footage. Cost estimation multiplies sheet count by your price per sheet and adds optional labor costs, giving you a complete project budget before you visit the hardware store.",
        },
        considerations: {
          title: "Key Considerations",
          items: [
            {
              text: "Standard ½\" drywall is suitable for most wall applications with studs spaced 16\" on center. Use ⅝\" for ceilings to prevent sagging and for fire-rated assemblies.",
              type: "info",
            },
            {
              text: "Moisture-resistant (green board) is NOT waterproof — don't use it in direct wet areas like shower enclosures. Use cement board or Kerdi membrane there instead.",
              type: "warning",
            },
            {
              text: "Fire-rated Type X drywall is required by most building codes for attached garages, furnace rooms, and shared walls between units in multi-family buildings.",
              type: "info",
            },
            {
              text: "Order 10-15% extra material. Complex rooms with many corners, outlets, and angles generate more waste from cuts.",
              type: "info",
            },
            {
              text: "Drywall should be stored flat and kept dry. A single ½\" 4'×8' sheet weighs about 51 lbs — plan for help lifting and a drywall lift for ceilings.",
              type: "warning",
            },
            {
              text: "Use coarse-thread drywall screws for wood studs and fine-thread for metal studs. Space screws 12\" apart on edges and 16\" in the field.",
              type: "info",
            },
          ],
        },
        categories: {
          title: "Drywall Types & Uses",
          items: [
            {
              text: "Regular (White Board): Standard gypsum board for interior walls and ceilings in dry areas. Most economical option for bedrooms, living rooms, and hallways.",
              type: "info",
            },
            {
              text: "Moisture-Resistant (Green Board): Contains water-resistant additives in the core and paper. Used in bathrooms, kitchens, laundry rooms — but not shower enclosures.",
              type: "info",
            },
            {
              text: "Fire-Rated (Type X): Contains glass fibers for enhanced fire resistance. ⅝\" Type X provides 1-hour fire rating. Required in garages and fire-rated assemblies.",
              type: "info",
            },
            {
              text: "Soundproof (STC-Rated): Uses viscoelastic polymer between gypsum layers to dampen sound. Ideal for media rooms, bedrooms adjacent to noisy areas, and home offices.",
              type: "info",
            },
            {
              text: "Flexible (¼\" Bend): Thin gypsum that can bend for curved walls and arches. Usually doubled for strength and requires wetting or scoring before installation.",
              type: "info",
            },
            {
              text: "Abuse-Resistant: High-density core with reinforced surface for high-traffic areas like corridors, schools, and commercial spaces. Resists dents and punctures.",
              type: "info",
            },
          ],
        },
        examples: {
          title: "Calculation Examples",
          description: "Step-by-step drywall material estimation",
          examples: [
            {
              title: "Standard Bedroom (12' × 12' × 8')",
              steps: [
                "Perimeter = 2 × (12 + 12) = 48 ft",
                "Gross wall area = 48 × 8 = 384 sq ft",
                "Subtract 1 door (6.67 × 3 = 20 sq ft) + 2 windows (2 × 3 × 4 = 24 sq ft) = 44 sq ft",
                "Net wall area = 384 − 44 = 340 sq ft",
                "Ceiling area = 12 × 12 = 144 sq ft",
                "Total = 340 + 144 = 484 sq ft",
                "With 10% waste = 484 × 1.10 = 532.4 sq ft",
                "Sheets (4'×8' = 32 sq ft each): ⌈532.4 ÷ 32⌉ = 17 sheets",
              ],
              result:
                "17 sheets of 4'×8' drywall, ~544 screws, ~6 gal joint compound, ~2 rolls of tape",
            },
            {
              title: "Garage (24' × 24' × 10') Fire-Rated",
              steps: [
                "Perimeter = 2 × (24 + 24) = 96 ft",
                "Gross wall area = 96 × 10 = 960 sq ft",
                "Subtract 1 door (7 × 3 = 21 sq ft) = 21 sq ft",
                "Net wall area = 960 − 21 = 939 sq ft",
                "Ceiling area = 24 × 24 = 576 sq ft",
                "Total = 939 + 576 = 1,515 sq ft",
                "With 12% waste = 1,515 × 1.12 = 1,696.8 sq ft",
                "Sheets (4'×8' = 32 sq ft each): ⌈1696.8 ÷ 32⌉ = 54 sheets",
              ],
              result:
                "54 sheets of ⅝\" Type X (4'×8'), ~1,728 screws, ~17 gal compound, ~5 rolls of tape",
            },
          ],
        },
      },

      faqs: [
        {
          question: "How many sheets of drywall do I need for a 12×12 room?",
          answer:
            "A 12' × 12' room with 8-foot ceilings, 1 door, and 2 windows needs approximately 17 sheets of standard 4'×8' drywall (including ceiling and 10% waste). Without the ceiling, you'd need about 12 sheets. The exact count depends on your waste factor, number of openings, and panel size chosen.",
        },
        {
          question: "What type of drywall should I use in a bathroom?",
          answer:
            "Use moisture-resistant drywall (green board) for bathroom walls and ceilings that are not directly in the shower or tub area. For shower enclosures and tub surrounds, use cement backer board (like Durock or HardieBacker) instead — green board is water-resistant but NOT waterproof and will fail in direct wet areas.",
        },
        {
          question: "How many drywall screws do I need per sheet?",
          answer:
            "Plan for approximately 32 screws per 4'×8' sheet (about 1 screw per square foot). Screws should be placed every 12 inches along edges and every 16 inches in the field (center area). For ceilings, you may need slightly more screws — approximately 36 per sheet — because they fight gravity.",
        },
        {
          question: "What is the difference between Type X and regular drywall?",
          answer:
            "Type X (fire-rated) drywall contains glass fibers in its gypsum core that hold the board together longer during a fire. A ⅝\" Type X sheet provides a 1-hour fire rating, while regular ½\" drywall provides about 30 minutes. Building codes require Type X in attached garages, between dwelling units, and in furnace/mechanical rooms.",
        },
        {
          question: "How much joint compound and tape do I need?",
          answer:
            "Plan for approximately 1 gallon (3.78 L) of pre-mixed joint compound per 100 square feet of drywall for a 3-coat finish (tape, fill, and skim). A standard 5-gallon bucket covers about 460 sq ft. For tape, one 500-foot roll covers approximately 460 sq ft of installed drywall.",
        },
        {
          question: "Should I hang drywall vertically or horizontally?",
          answer:
            "Horizontally is preferred for most residential walls because it reduces the total length of joints to tape and creates a stronger wall. The long horizontal edge (tapered) creates flush joints that are easier to finish. Vertical installation is better for rooms with ceilings over 9 feet or for commercial applications with metal studs.",
        },
        {
          question: "How much does it cost to drywall a room?",
          answer:
            "Material costs run $0.40-$0.65 per square foot for standard drywall (about $12-$20 per sheet). Professional installation including hanging, taping, and finishing costs $1.50-$3.00 per square foot. A typical 12×12 bedroom with ceiling costs $350-$600 for materials and $750-$1,500 for professional installation.",
        },
        {
          question: "What thickness drywall should I use?",
          answer:
            "Use ½\" for standard walls with studs at 16\" on center (most common). Use ⅝\" for ceilings (prevents sagging), fire-rated assemblies, and walls with studs at 24\" on center. Use ¼\" for curved walls and repairs over existing surfaces. Use ⅜\" for minor re-covering of existing walls.",
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
      accessibility: {
        mobileResults: "Results",
        closeModal: "Close",
        openMenu: "Menu",
      },
      sources: { title: "Sources & References" },

      chart: {
        title: "Material Cost Breakdown",
        xLabel: "Category",
        yLabel: "Cost",
        series: {
          materialCost: "Materials",
          laborCost: "Labor",
        },
      },

      detailedTable: {
        materialsList: {
          button: "View Full Materials List",
          title: "Complete Materials Shopping List",
          columns: {
            item: "Item",
            quantity: "Quantity",
            unit: "Unit",
            notes: "Notes",
          },
        },
      },
    },
  },

  inputs: [
    // ── Panel & Type ──
    {
      id: "panelSize",
      type: "imageradio",
      columns: 3,
      defaultValue: "4x8",
      options: [
        { value: "4x8", label: "4' × 8'", icon: "📦" },
        { value: "4x10", label: "4' × 10'", icon: "📐" },
        { value: "4x12", label: "4' × 12'", icon: "📏" },
      ],
    },
    {
      id: "drywallType",
      type: "select",
      defaultValue: "regular",
      options: [
        { value: "regular" },
        { value: "moisture" },
        { value: "fireRated" },
        { value: "soundproof" },
      ],
    },
    {
      id: "thickness",
      type: "select",
      defaultValue: "half",
      options: [
        { value: "quarter" },
        { value: "threeEighths" },
        { value: "half" },
        { value: "fiveEighths" },
      ],
    },

    // ── Room Dimensions ──
    {
      id: "roomLength",
      type: "number",
      defaultValue: null,
      placeholder: "12",
      unitType: "length",
      syncGroup: false,
      defaultUnit: "ft",
      allowedUnits: ["ft", "in", "m", "cm"],
      min: 1,
      max: 200,
    },
    {
      id: "roomWidth",
      type: "number",
      defaultValue: null,
      placeholder: "12",
      unitType: "length",
      syncGroup: false,
      defaultUnit: "ft",
      allowedUnits: ["ft", "in", "m", "cm"],
      min: 1,
      max: 200,
    },
    {
      id: "wallHeight",
      type: "number",
      defaultValue: null,
      placeholder: "8",
      unitType: "length",
      syncGroup: false,
      defaultUnit: "ft",
      allowedUnits: ["ft", "in", "m", "cm"],
      min: 1,
      max: 30,
    },
    {
      id: "includeCeiling",
      type: "toggle",
      defaultValue: true,
    },

    // ── Doors ──
    {
      id: "numberOfDoors",
      type: "stepper",
      defaultValue: 2,
      min: 0,
      max: 10,
      step: 1,
    },
    {
      id: "doorHeight",
      type: "number",
      defaultValue: 6.67,
      placeholder: "6.67",
      unitType: "length",
      syncGroup: false,
      defaultUnit: "ft",
      allowedUnits: ["ft", "in", "m", "cm"],
      min: 1,
      max: 12,
    },
    {
      id: "doorWidth",
      type: "number",
      defaultValue: 3,
      placeholder: "3",
      unitType: "length",
      syncGroup: false,
      defaultUnit: "ft",
      allowedUnits: ["ft", "in", "m", "cm"],
      min: 1,
      max: 12,
    },

    // ── Windows ──
    {
      id: "numberOfWindows",
      type: "stepper",
      defaultValue: 2,
      min: 0,
      max: 20,
      step: 1,
    },
    {
      id: "windowHeight",
      type: "number",
      defaultValue: 3,
      placeholder: "3",
      unitType: "length",
      syncGroup: false,
      defaultUnit: "ft",
      allowedUnits: ["ft", "in", "m", "cm"],
      min: 0.5,
      max: 12,
    },
    {
      id: "windowWidth",
      type: "number",
      defaultValue: 4,
      placeholder: "4",
      unitType: "length",
      syncGroup: false,
      defaultUnit: "ft",
      allowedUnits: ["ft", "in", "m", "cm"],
      min: 0.5,
      max: 12,
    },

    // ── Waste ──
    {
      id: "wasteFactor",
      type: "number",
      defaultValue: 10,
      min: 0,
      max: 30,
      step: 1,
      suffix: "%",
    },

    // ── Cost ──
    {
      id: "includeCost",
      type: "toggle",
      defaultValue: false,
    },
    {
      id: "pricePerSheet",
      type: "number",
      defaultValue: null,
      placeholder: "12",
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "usd",
      showWhen: { field: "includeCost", value: true },
    },
    {
      id: "laborRate",
      type: "number",
      defaultValue: null,
      placeholder: "40",
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "usd",
      showWhen: { field: "includeCost", value: true },
    },
  ],

  inputGroups: [],

  results: [
    { id: "totalArea", type: "primary", format: "text" },
    { id: "sheetsNeeded", type: "secondary", format: "text" },
    { id: "screws", type: "secondary", format: "text" },
    { id: "jointCompound", type: "secondary", format: "text" },
    { id: "tape", type: "secondary", format: "text" },
    { id: "cornerBead", type: "secondary", format: "text" },
    { id: "materialCost", type: "secondary", format: "text" },
    { id: "laborCost", type: "secondary", format: "text" },
    { id: "totalCost", type: "secondary", format: "text" },
  ],

  infoCards: [
    { id: "materials", type: "list", icon: "📦", itemCount: 4 },
    { id: "details", type: "list", icon: "📐", itemCount: 4 },
    { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  chart: {
    id: "costBreakdown",
    type: "bar",
    xKey: "category",
    showGrid: true,
    showTooltip: true,
    showLegend: false,
    yAxisFormat: "currency",
    series: [
      { key: "materialCost", color: "#3b82f6" },
      { key: "laborCost", color: "#f59e0b" },
    ],
  },

  detailedTable: {
    id: "materialsList",
    buttonLabel: "View Full Materials List",
    buttonIcon: "📋",
    modalTitle: "Complete Materials Shopping List",
    columns: [
      { id: "item", label: "Item", align: "left" },
      { id: "quantity", label: "Quantity", align: "right", highlight: true },
      { id: "unit", label: "Unit", align: "center" },
      { id: "notes", label: "Notes", align: "left" },
    ],
  },

  referenceData: [],

  educationSections: [
    { id: "whatIs", type: "prose", icon: "📖" },
    { id: "howItWorks", type: "prose", icon: "⚙️" },
    { id: "considerations", type: "list", icon: "📋", itemCount: 6 },
    { id: "categories", type: "list", icon: "📦", itemCount: 6 },
    {
      id: "examples",
      type: "code-example",
      icon: "🧮",
      columns: 2,
      exampleCount: 2,
    },
  ],

  faqs: [
    { id: "0" },
    { id: "1" },
    { id: "2" },
    { id: "3" },
    { id: "4" },
    { id: "5" },
    { id: "6" },
    { id: "7" },
  ],

  references: [
    {
      authors: "Gypsum Association",
      year: "2024",
      title: "Using Gypsum Board for Walls and Ceilings — Installation Guide",
      source: "Gypsum Association (GA-216)",
      url: "https://www.gypsum.org/technical/using-gypsum-board-for-walls-and-ceilings/",
    },
    {
      authors: "USG Corporation",
      year: "2024",
      title: "The Gypsum Construction Handbook — 7th Edition",
      source: "USG / Knauf",
      url: "https://www.usg.com/content/usg/en/resource-center/gypsum-construction-handbook.html",
    },
    {
      authors: "International Code Council",
      year: "2024",
      title:
        "International Residential Code — Section R302: Fire-Resistant Construction",
      source: "ICC / IRC",
      url: "https://codes.iccsafe.org/content/IRC2024P7",
    },
  ],

  hero: {
    badge: "Construction",
    title: "Drywall Calculator",
    icon: "🧱",
  },
  sidebar: { showRelated: true },
  features: {
    save: true,
    pdf: true,
    excel: true,
    share: true,
    favorites: true,
    rating: true,
  },
  relatedCalculators: [
    "square-footage-calculator",
    "paint-calculator",
    "flooring-calculator",
    "roofing-calculator",
  ],
  ads: { showSidebar: false, showBanner: false, showNative: false },
};

// ─── Calculate Function ──────────────────────────────────────────
export function calculateDrywallCalculator(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits, t } = data;
  const v = (t?.values as Record<string, string>) || {};
  const f = (t?.formats as Record<string, string>) || {};

  // ── Read & validate room dimensions ──
  const roomLength = values.roomLength as number | null;
  const roomWidth = values.roomWidth as number | null;
  const wallHeight = values.wallHeight as number | null;

  if (
    roomLength === null ||
    roomLength === undefined ||
    roomWidth === null ||
    roomWidth === undefined ||
    wallHeight === null ||
    wallHeight === undefined
  ) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  // ── Convert all lengths to feet ──
  const lengthFt = toFeet(roomLength, fieldUnits?.roomLength || "ft");
  const widthFt = toFeet(roomWidth, fieldUnits?.roomWidth || "ft");
  const heightFt = toFeet(wallHeight, fieldUnits?.wallHeight || "ft");

  if (lengthFt <= 0 || widthFt <= 0 || heightFt <= 0) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  // ── Read options ──
  const panelSize = (values.panelSize as string) || "4x8";
  const drywallType = (values.drywallType as string) || "regular";
  const thickness = (values.thickness as string) || "half";
  const includeCeiling = (values.includeCeiling as boolean) ?? true;
  const numberOfDoors = (values.numberOfDoors as number) ?? 2;
  const numberOfWindows = (values.numberOfWindows as number) ?? 2;
  const wasteFactor = (values.wasteFactor as number) ?? 10;
  const includeCost = (values.includeCost as boolean) ?? false;
  const pricePerSheet = (values.pricePerSheet as number) || 0;
  const laborRate = (values.laborRate as number) || 0;

  // ── Door dimensions ──
  const doorHeightRaw = (values.doorHeight as number) ?? 6.67;
  const doorWidthRaw = (values.doorWidth as number) ?? 3;
  const doorHeightFt = toFeet(doorHeightRaw, fieldUnits?.doorHeight || "ft");
  const doorWidthFt = toFeet(doorWidthRaw, fieldUnits?.doorWidth || "ft");

  // ── Window dimensions ──
  const windowHeightRaw = (values.windowHeight as number) ?? 3;
  const windowWidthRaw = (values.windowWidth as number) ?? 4;
  const windowHeightFt = toFeet(
    windowHeightRaw,
    fieldUnits?.windowHeight || "ft"
  );
  const windowWidthFt = toFeet(
    windowWidthRaw,
    fieldUnits?.windowWidth || "ft"
  );

  // ── Panel dimensions ──
  const panel = PANEL_SIZES[panelSize] || PANEL_SIZES["4x8"];
  const panelArea = panel.w * panel.h; // sq ft

  // ══════════════════════════════════════════════════════════
  //  AREA CALCULATIONS
  // ══════════════════════════════════════════════════════════

  // Gross wall area (4 walls)
  const perimeter = 2 * (lengthFt + widthFt);
  const grossWallArea = perimeter * heightFt;

  // Openings
  const doorArea = numberOfDoors * doorHeightFt * doorWidthFt;
  const windowArea = numberOfWindows * windowHeightFt * windowWidthFt;
  const totalOpenings = doorArea + windowArea;

  // Net wall area
  const netWallArea = Math.max(0, grossWallArea - totalOpenings);

  // Ceiling
  const ceilingArea = includeCeiling ? lengthFt * widthFt : 0;

  // Total area before waste
  const totalAreaBeforeWaste = netWallArea + ceilingArea;

  // Total area with waste
  const wasteMultiplier = 1 + wasteFactor / 100;
  const totalArea = totalAreaBeforeWaste * wasteMultiplier;
  const totalAreaSqM = sqFtToSqM(totalArea);

  // ══════════════════════════════════════════════════════════
  //  MATERIALS
  // ══════════════════════════════════════════════════════════

  // Sheets needed (round up)
  const sheetsNeeded = Math.ceil(totalArea / panelArea);

  // Screws: ~32 per 4×8 sheet, proportional for other sizes
  const screwsPerSheet = Math.round((panelArea / 32) * 32);
  const totalScrews = sheetsNeeded * screwsPerSheet;

  // Screws come in 1-lb (~150 screws) and 5-lb (~750 screws) boxes
  const screwBoxes1lb = Math.ceil(totalScrews / 150);
  const screwBoxes5lb = Math.ceil(totalScrews / 750);

  // Joint compound: ~1 gallon per 100 sq ft for 3 coats
  // 5-gallon bucket covers ~460 sq ft
  const compoundGallons = totalArea / 100;
  const compoundBuckets = Math.ceil(compoundGallons / 4.5); // 4.5-gal usable per bucket
  const compoundLiters = compoundGallons * 3.785;

  // Tape: 1 roll (500 ft) covers ~460 sq ft
  // Approximate: total joint length ≈ sheets × avg edge length shared
  const tapeRolls = Math.ceil(totalArea / 460);
  const tapeFeet = Math.round(totalArea * 1.1); // ~1.1 ft tape per sq ft

  // Corner bead: vertical inside corners (4 per rectangular room) × height
  // + ceiling perimeter if ceiling included
  const verticalCorners = 4; // rectangular room
  const cornerBeadFt = verticalCorners * heightFt;
  const cornerBeadPieces = Math.ceil(cornerBeadFt / 8); // 8-ft pieces

  // ══════════════════════════════════════════════════════════
  //  WEIGHT (for transport planning)
  // ══════════════════════════════════════════════════════════
  const baseWeight = TYPE_WEIGHT_4x8[drywallType] || 51;
  const panelRatio = panelArea / 32; // ratio vs 4×8
  const thicknessFactors: Record<string, number> = {
    quarter: 0.5,
    threeEighths: 0.75,
    half: 1,
    fiveEighths: 1.25,
  };
  const thickFactor = thicknessFactors[thickness] || 1;
  const weightPerSheet = baseWeight * panelRatio * thickFactor;
  const totalWeight = sheetsNeeded * weightPerSheet;
  const totalWeightKg = totalWeight * 0.453592;

  // ══════════════════════════════════════════════════════════
  //  COST
  // ══════════════════════════════════════════════════════════

  // Currency symbol
  const currUnit = fieldUnits?.pricePerSheet || "usd";
  const SYMBOLS: Record<string, string> = {
    usd: "$",
    eur: "€",
    gbp: "£",
    mxn: "MX$",
    brl: "R$",
    cad: "C$",
    jpy: "¥",
    inr: "₹",
    cop: "COL$",
    ars: "AR$",
    pen: "S/",
    clp: "CLP ",
  };
  const sym = SYMBOLS[currUnit] || "$";

  const materialCostTotal = includeCost ? sheetsNeeded * pricePerSheet : 0;
  const laborCostTotal = includeCost ? sheetsNeeded * laborRate : 0;
  const totalCost = materialCostTotal + laborCostTotal;

  // ══════════════════════════════════════════════════════════
  //  FORMAT RESULTS
  // ══════════════════════════════════════════════════════════

  const sqftLabel = v["sqft"] || "sq ft";
  const sqmLabel = v["sqm"] || "m²";
  const sheetsLabel =
    sheetsNeeded === 1 ? v["sheet"] || "sheet" : v["sheets"] || "sheets";
  const screwsLabel = v["screws"] || "screws";

  const formatted: Record<string, string> = {
    totalArea: `${fmtNum(Math.round(totalArea))} ${sqftLabel} (${fmtNum(Math.round(totalAreaSqM))} ${sqmLabel})`,
    sheetsNeeded: `${fmtNum(sheetsNeeded)} ${sheetsLabel}`,
    screws: `${fmtNum(totalScrews)} ${screwsLabel}`,
    jointCompound: `${compoundBuckets} ${compoundBuckets === 1 ? v["bucket"] || "bucket" : v["buckets"] || "buckets"} (${fmtNum(Math.round(compoundGallons), 1)} ${v["gallons"] || "gal"})`,
    tape: `${tapeRolls} ${tapeRolls === 1 ? v["roll"] || "roll" : v["rolls"] || "rolls"} (${fmtNum(tapeFeet)} ${v["ft"] || "ft"})`,
    cornerBead: `${cornerBeadPieces} ${v["pieces"] || "pcs"} (${fmtNum(Math.round(cornerBeadFt))} ${v["ft"] || "ft"})`,
    netWallArea: `${fmtNum(Math.round(netWallArea))} ${sqftLabel}`,
    ceilingArea: includeCeiling
      ? `${fmtNum(Math.round(ceilingArea))} ${sqftLabel}`
      : "Not included",
    openingsArea: `${fmtNum(Math.round(totalOpenings))} ${sqftLabel}`,
    totalWeight: `${fmtNum(Math.round(totalWeight))} ${v["lbs"] || "lbs"} (${fmtNum(Math.round(totalWeightKg))} ${v["kg"] || "kg"})`,
  };

  if (includeCost && pricePerSheet > 0) {
    formatted.materialCost = `${sym}${fmtNum(Math.round(materialCostTotal))}`;
    formatted.laborCost =
      laborRate > 0
        ? `${sym}${fmtNum(Math.round(laborCostTotal))}`
        : "Not estimated";
    formatted.totalCost = `${sym}${fmtNum(Math.round(totalCost))}`;
  } else {
    formatted.materialCost = "—";
    formatted.laborCost = "—";
    formatted.totalCost = "—";
  }

  // ══════════════════════════════════════════════════════════
  //  METADATA: Chart & Table
  // ══════════════════════════════════════════════════════════

  // Chart data (only if cost included)
  const chartData: Array<Record<string, unknown>> =
    includeCost && pricePerSheet > 0
      ? [
          {
            category: "Drywall Sheets",
            materialCost: Math.round(materialCostTotal),
            laborCost: Math.round(laborCostTotal),
          },
        ]
      : [];

  // Detailed table — full shopping list
  const thicknessLabels: Record<string, string> = {
    quarter: '¼"',
    threeEighths: '⅜"',
    half: '½"',
    fiveEighths: '⅝"',
  };
  const typeLabels: Record<string, string> = {
    regular: "Regular",
    moisture: "Moisture-Resistant",
    fireRated: "Fire-Rated (Type X)",
    soundproof: "Soundproof",
  };

  const tableData = [
    {
      item: `Drywall Sheets (${panel.w}'×${panel.h}', ${thicknessLabels[thickness] || '½"'}, ${typeLabels[drywallType] || "Regular"})`,
      quantity: fmtNum(sheetsNeeded),
      unit: sheetsLabel,
      notes: `${fmtNum(Math.round(weightPerSheet))} lbs each, ${fmtNum(Math.round(totalWeight))} lbs total`,
    },
    {
      item: "Drywall Screws (coarse thread, 1-¼\")",
      quantity: fmtNum(totalScrews),
      unit: screwsLabel,
      notes: `${screwBoxes5lb > 1 ? `${screwBoxes5lb} boxes (5-lb)` : `${screwBoxes1lb} boxes (1-lb)`}`,
    },
    {
      item: "Joint Compound (pre-mixed, all-purpose)",
      quantity: fmtNum(Math.round(compoundGallons * 10) / 10, 1),
      unit: v["gallons"] || "gal",
      notes: `${compoundBuckets} × 5-gal bucket(s)`,
    },
    {
      item: "Paper Drywall Tape",
      quantity: fmtNum(tapeFeet),
      unit: v["ft"] || "ft",
      notes: `${tapeRolls} × 500-ft roll(s)`,
    },
    {
      item: "Corner Bead (paper-faced, 8-ft pieces)",
      quantity: String(cornerBeadPieces),
      unit: v["pieces"] || "pcs",
      notes: `For ${verticalCorners} vertical inside corners`,
    },
    {
      item: "Sandpaper (150-grit sanding screen)",
      quantity: String(Math.max(2, Math.ceil(sheetsNeeded / 10))),
      unit: v["pieces"] || "pcs",
      notes: "For smoothing compound between coats",
    },
    {
      item: "Drywall Primer / Sealer",
      quantity: fmtNum(Math.ceil(totalArea / 350)),
      unit: v["gallons"] || "gal",
      notes: `Covers ~350 sq ft/gal — prime before painting`,
    },
  ];

  // ── Summary ──
  const summary =
    f.summary
      ?.replace("{sheets}", String(sheetsNeeded))
      .replace("{area}", `${fmtNum(Math.round(totalArea))} ${sqftLabel}`)
      .replace("{waste}", String(wasteFactor)) ||
    `You need ${sheetsNeeded} drywall sheets to cover ${fmtNum(Math.round(totalArea))} sq ft.`;

  return {
    values: {
      totalArea: Math.round(totalArea),
      totalAreaSqM: Math.round(totalAreaSqM),
      sheetsNeeded,
      screws: totalScrews,
      jointCompound: Math.round(compoundGallons * 10) / 10,
      tape: tapeFeet,
      cornerBead: cornerBeadPieces,
      netWallArea: Math.round(netWallArea),
      ceilingArea: Math.round(ceilingArea),
      openingsArea: Math.round(totalOpenings),
      materialCost: Math.round(materialCostTotal),
      laborCost: Math.round(laborCostTotal),
      totalCost: Math.round(totalCost),
      totalWeight: Math.round(totalWeight),
    },
    formatted,
    summary,
    isValid: true,
    metadata: {
      chartData,
      tableData,
    },
  };
}

export default drywallCalculatorConfig;
