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
  category: "home",
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
    es: {
      "name": "Calculadora de Paneles de Yeso",
      "slug": "calculadora-paneles-yeso",
      "subtitle": "Calcula cuántos paneles de yeso necesitas, más tornillos, cinta, compuesto para juntas y estimaciones de costos.",
      "breadcrumb": "Paneles de Yeso",
      "seo": {
        "title": "Calculadora de Paneles de Yeso - Estimador Gratuito de Materiales",
        "description": "Calcula cuántos paneles de yeso, tornillos, cinta y compuesto para juntas necesitas. Obtén una lista completa de materiales con estimaciones de costos para cualquier habitación.",
        "shortDescription": "Estima paneles de yeso, materiales y costo total para tu proyecto.",
        "keywords": [
          "calculadora paneles yeso",
          "calculadora tablaroca",
          "calculadora placas yeso",
          "cuánto yeso necesito",
          "calculadora costo yeso",
          "calculadora gratuita yeso",
          "calculadora placa gypsum",
          "estimador materiales yeso"
        ]
      },
      "calculator": {
        "yourInformation": "Tu Información"
      },
      "inputs": {
        "panelSize": {
          "label": "Tamaño del Panel",
          "helpText": "El estándar 4'×8' funciona para la mayoría de habitaciones. Usa paneles más altos para techos de 9'+ para reducir juntas horizontales",
          "options": {
            "4x8": "4' × 8'",
            "4x10": "4' × 10'",
            "4x12": "4' × 12'"
          }
        },
        "drywallType": {
          "label": "Tipo de Panel de Yeso",
          "helpText": "Regular para la mayoría de habitaciones. Resistente a humedad para baños/cocinas. Resistente al fuego para garajes",
          "options": {
            "regular": "Regular (Placa Blanca)",
            "moisture": "Resistente a Humedad (Placa Verde)",
            "fireRated": "Resistente al Fuego (Tipo X)",
            "soundproof": "Insonorizado (Tipo STC)"
          }
        },
        "thickness": {
          "label": "Grosor",
          "helpText": "½\" es estándar para paredes. ⅝\" para techos y resistente al fuego. ¼\" para superficies curvas",
          "options": {
            "quarter": "¼\"",
            "threeEighths": "⅜\"",
            "half": "½\" (Estándar)",
            "fiveEighths": "⅝\" (Fuego/Techo)"
          }
        },
        "roomLength": {
          "label": "Longitud de la Habitación",
          "helpText": "Mide la pared más larga de la habitación"
        },
        "roomWidth": {
          "label": "Ancho de la Habitación",
          "helpText": "Mide la pared más corta de la habitación"
        },
        "wallHeight": {
          "label": "Altura de la Pared",
          "helpText": "Altura del piso al techo — estándar es 8 pies (2.44 m)"
        },
        "includeCeiling": {
          "label": "Incluir Techo",
          "helpText": "Activa si también vas a instalar yeso en el techo"
        },
        "numberOfDoors": {
          "label": "Número de Puertas",
          "helpText": "Aberturas de puertas interiores estándar para restar del área de pared"
        },
        "doorHeight": {
          "label": "Altura de Puerta",
          "helpText": "Puerta interior estándar es 6'8\" (80 pulgadas / 2.03 m)"
        },
        "doorWidth": {
          "label": "Ancho de Puerta",
          "helpText": "Puerta interior estándar es 3 pies (36 pulgadas / 0.91 m)"
        },
        "numberOfWindows": {
          "label": "Número de Ventanas",
          "helpText": "Aberturas de ventanas para restar del área de pared"
        },
        "windowHeight": {
          "label": "Altura de Ventana",
          "helpText": "Ventana estándar es 3 pies (36 pulgadas / 0.91 m)"
        },
        "windowWidth": {
          "label": "Ancho de Ventana",
          "helpText": "Ventana estándar es 4 pies (48 pulgadas / 1.22 m)"
        },
        "wasteFactor": {
          "label": "Factor de Desperdicio",
          "helpText": "Considera cortes, errores y formas irregulares. 10% para habitaciones simples, 15% para diseños complejos"
        },
        "includeCost": {
          "label": "Incluir Estimación de Costos",
          "helpText": "Activa para calcular costos de materiales y mano de obra"
        },
        "pricePerSheet": {
          "label": "Precio por Panel",
          "helpText": "Costo promedio: $10-$15 para regular, $14-$20 para resistente a humedad/fuego"
        },
        "laborRate": {
          "label": "Tarifa de Mano de Obra por Panel",
          "helpText": "Instalación profesional: $6-$12 por panel (solo colgado) o $30-$60 con acabado"
        }
      },
      "results": {
        "totalArea": {
          "label": "Área Total de Yeso"
        },
        "sheetsNeeded": {
          "label": "Paneles Necesarios"
        },
        "screws": {
          "label": "Tornillos Necesarios"
        },
        "jointCompound": {
          "label": "Compuesto para Juntas"
        },
        "tape": {
          "label": "Cinta para Yeso"
        },
        "cornerBead": {
          "label": "Esquinero"
        },
        "materialCost": {
          "label": "Costo de Materiales"
        },
        "laborCost": {
          "label": "Costo de Mano de Obra"
        },
        "totalCost": {
          "label": "Costo Total"
        }
      },
      "presets": {
        "bedroom": {
          "label": "Dormitorio Estándar",
          "description": "Habitación de 12' × 12' con 1 puerta y 2 ventanas"
        },
        "masterBedroom": {
          "label": "Dormitorio Principal",
          "description": "Habitación de 16' × 14' con 1 puerta y 3 ventanas"
        },
        "livingRoom": {
          "label": "Sala de Estar",
          "description": "Habitación de 20' × 16' con 2 puertas y 4 ventanas"
        },
        "basement": {
          "label": "Sótano",
          "description": "Habitación de 24' × 20', solo paredes, resistente a humedad"
        },
        "garage": {
          "label": "Garaje",
          "description": "Habitación de 24' × 24', resistente al fuego con techo"
        },
        "bathroom": {
          "label": "Baño",
          "description": "Habitación de 8' × 6', placa resistente a humedad"
        }
      },
      "values": {
        "sqft": "pies²",
        "sqm": "m²",
        "sheets": "paneles",
        "sheet": "panel",
        "screws": "tornillos",
        "lbs": "lbs",
        "kg": "kg",
        "gallons": "gal",
        "liters": "L",
        "ft": "pies",
        "m": "m",
        "pieces": "pzs",
        "rolls": "rollos",
        "roll": "rollo",
        "buckets": "baldes",
        "bucket": "balde"
      },
      "formats": {
        "summary": "Necesitas {sheets} paneles de yeso para cubrir {area} de área de pared y techo (incluyendo {waste}% de desperdicio)."
      },
      "infoCards": {
        "materials": {
          "title": "📦 Lista de Materiales",
          "items": [
            {
              "label": "Paneles de Yeso",
              "valueKey": "sheetsNeeded"
            },
            {
              "label": "Tornillos para Yeso",
              "valueKey": "screws"
            },
            {
              "label": "Compuesto para Juntas",
              "valueKey": "jointCompound"
            },
            {
              "label": "Cinta para Yeso",
              "valueKey": "tape"
            }
          ]
        },
        "details": {
          "title": "📐 Desglose de Área",
          "items": [
            {
              "label": "Área Total de Yeso",
              "valueKey": "totalArea"
            },
            {
              "label": "Área de Pared (neta)",
              "valueKey": "netWallArea"
            },
            {
              "label": "Área del Techo",
              "valueKey": "ceilingArea"
            },
            {
              "label": "Aberturas Deducidas",
              "valueKey": "openingsArea"
            }
          ]
        },
        "tips": {
          "title": "💡 Consejos de Instalación",
          "items": [
            "Cuelga primero los paneles del techo, luego las paredes — usa un elevador para techos",
            "Escalonar las juntas entre filas para aumentar la resistencia y reducir grietas",
            "Atornilla justo debajo de la superficie del papel sin atravesar",
            "Aplica 3 capas de compuesto: capa de cinta, capa de relleno y capa de acabado"
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "¿Qué es el Panel de Yeso?",
          "content": "El panel de yeso (también llamado tablaroca, placa de yeso o drywall) es un material de construcción hecho de yeso prensado (sulfato de calcio dihidratado, CaSO₄·2H₂O) entre dos hojas gruesas de papel. Es el material más común para paredes interiores y techos en Norteamérica, habiendo reemplazado en gran medida el tradicional listón y yeso desde los años 1950. Los paneles vienen en anchos estándar de 4 pies con longitudes variables (8, 10 y 12 pies) y grosores (¼\", ⅜\", ½\" y ⅝\"). El núcleo de yeso proporciona resistencia al fuego porque cuando se expone al calor, las moléculas de agua en el yeso se evaporan, retardando la propagación del fuego. Los tipos especializados incluyen resistente a humedad (placa verde) para baños y cocinas, resistente al fuego (Tipo X) con fibras de vidrio para garajes y paredes compartidas, y variedades insonorizadas con compuestos amortiguadores para reducción de ruido entre habitaciones."
        },
        "howItWorks": {
          "title": "Cómo Funciona la Calculadora de Paneles de Yeso",
          "content": "Esta calculadora estima materiales de yeso calculando el área total de pared (perímetro × altura), opcionalmente agregando área del techo (longitud × ancho), luego restando aberturas para puertas y ventanas. Se agrega un factor de desperdicio (típicamente 10-15%) para considerar cortes alrededor de tomas, esquinas y ajustes. El área total se divide por el tamaño de panel elegido para determinar paneles necesarios, siempre redondeando hacia arriba ya que no se pueden comprar paneles parciales. Del conteo de paneles, la calculadora deriva requerimientos de sujetadores (~32 tornillos por panel de 4'×8'), cantidad de compuesto para juntas (~1 galón por 100 pies² para 3 capas), y longitud de cinta basada en pies lineales de juntas. La estimación de costos multiplica el conteo de paneles por tu precio por panel y agrega costos opcionales de mano de obra, dándote un presupuesto completo del proyecto antes de visitar la ferretería."
        },
        "considerations": {
          "title": "Consideraciones Clave",
          "items": [
            {
              "text": "El yeso estándar de ½\" es adecuado para la mayoría de aplicaciones de pared con montantes espaciados a 16\" de centro. Usa ⅝\" para techos para prevenir pandeo y para ensambles resistentes al fuego.",
              "type": "info"
            },
            {
              "text": "La placa resistente a humedad (placa verde) NO es impermeable — no la uses en áreas directamente húmedas como recintos de ducha. Usa placa cementosa o membrana Kerdi en su lugar.",
              "type": "warning"
            },
            {
              "text": "El yeso resistente al fuego Tipo X es requerido por la mayoría de códigos de construcción para garajes adjuntos, cuartos de calderas y paredes compartidas entre unidades en edificios multifamiliares.",
              "type": "info"
            },
            {
              "text": "Ordena 10-15% de material extra. Las habitaciones complejas con muchas esquinas, tomas y ángulos generan más desperdicio por cortes.",
              "type": "info"
            },
            {
              "text": "El yeso debe almacenarse plano y mantenerse seco. Un solo panel de ½\" de 4'×8' pesa aproximadamente 23 kg — planifica ayuda para levantar y un elevador para techos.",
              "type": "warning"
            },
            {
              "text": "Usa tornillos de rosca gruesa para montantes de madera y rosca fina para montantes metálicos. Espaciar tornillos a 12\" en bordes y 16\" en el campo.",
              "type": "info"
            }
          ]
        },
        "categories": {
          "title": "Tipos de Yeso y Usos",
          "items": [
            {
              "text": "Regular (Placa Blanca): Placa de yeso estándar para paredes interiores y techos en áreas secas. Opción más económica para dormitorios, salas y pasillos.",
              "type": "info"
            },
            {
              "text": "Resistente a Humedad (Placa Verde): Contiene aditivos resistentes al agua en el núcleo y papel. Se usa en baños, cocinas, cuartos de lavado — pero no en recintos de ducha.",
              "type": "info"
            },
            {
              "text": "Resistente al Fuego (Tipo X): Contiene fibras de vidrio para resistencia al fuego mejorada. ⅝\" Tipo X proporciona clasificación de fuego de 1 hora. Requerido en garajes y ensambles resistentes al fuego.",
              "type": "info"
            },
            {
              "text": "Insonorizado (Clasificación STC): Usa polímero viscoelástico entre capas de yeso para amortiguar sonido. Ideal para salas multimedia, dormitorios adyacentes a áreas ruidosas y oficinas en casa.",
              "type": "info"
            },
            {
              "text": "Flexible (¼\" Curvable): Yeso delgado que puede curvarse para paredes curvas y arcos. Usualmente se dobla para resistencia y requiere humedecimiento o rayado antes de instalación.",
              "type": "info"
            },
            {
              "text": "Resistente al Abuso: Núcleo de alta densidad con superficie reforzada para áreas de mucho tráfico como corredores, escuelas y espacios comerciales. Resiste abolladuras y perforaciones.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Ejemplos de Cálculo",
          "description": "Estimación paso a paso de materiales de yeso",
          "examples": [
            {
              "title": "Dormitorio Estándar (12' × 12' × 8')",
              "steps": [
                "Perímetro = 2 × (12 + 12) = 48 pies",
                "Área bruta de pared = 48 × 8 = 384 pies²",
                "Restar 1 puerta (6.67 × 3 = 20 pies²) + 2 ventanas (2 × 3 × 4 = 24 pies²) = 44 pies²",
                "Área neta de pared = 384 − 44 = 340 pies²",
                "Área del techo = 12 × 12 = 144 pies²",
                "Total = 340 + 144 = 484 pies²",
                "Con 10% desperdicio = 484 × 1.10 = 532.4 pies²",
                "Paneles (4'×8' = 32 pies² cada uno): ⌈532.4 ÷ 32⌉ = 17 paneles"
              ],
              "result": "17 paneles de yeso 4'×8', ~544 tornillos, ~6 gal compuesto para juntas, ~2 rollos de cinta"
            },
            {
              "title": "Garaje (24' × 24' × 10') Resistente al Fuego",
              "steps": [
                "Perímetro = 2 × (24 + 24) = 96 pies",
                "Área bruta de pared = 96 × 10 = 960 pies²",
                "Restar 1 puerta (7 × 3 = 21 pies²) = 21 pies²",
                "Área neta de pared = 960 − 21 = 939 pies²",
                "Área del techo = 24 × 24 = 576 pies²",
                "Total = 939 + 576 = 1,515 pies²",
                "Con 12% desperdicio = 1,515 × 1.12 = 1,696.8 pies²",
                "Paneles (4'×8' = 32 pies² cada uno): ⌈1696.8 ÷ 32⌉ = 54 paneles"
              ],
              "result": "54 paneles de ⅝\" Tipo X (4'×8'), ~1,728 tornillos, ~17 gal compuesto, ~5 rollos de cinta"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "¿Cuántos paneles de yeso necesito para una habitación de 12×12?",
          "answer": "Una habitación de 12' × 12' con techos de 8 pies, 1 puerta y 2 ventanas necesita aproximadamente 17 paneles de yeso estándar de 4'×8' (incluyendo techo y 10% desperdicio). Sin el techo, necesitarías aproximadamente 12 paneles. El conteo exacto depende de tu factor de desperdicio, número de aberturas y tamaño de panel elegido."
        },
        {
          "question": "¿Qué tipo de yeso debo usar en un baño?",
          "answer": "Usa yeso resistente a humedad (placa verde) para paredes y techos de baño que no estén directamente en el área de ducha o tina. Para recintos de ducha y contornos de tina, usa placa cementosa (como Durock o HardieBacker) en su lugar — la placa verde es resistente al agua pero NO es impermeable y fallará en áreas directamente húmedas."
        },
        {
          "question": "¿Cuántos tornillos de yeso necesito por panel?",
          "answer": "Planifica aproximadamente 32 tornillos por panel de 4'×8' (aproximadamente 1 tornillo por pie cuadrado). Los tornillos deben colocarse cada 12 pulgadas a lo largo de los bordes y cada 16 pulgadas en el campo (área central). Para techos, podrías necesitar ligeramente más tornillos — aproximadamente 36 por panel — porque luchan contra la gravedad."
        },
        {
          "question": "¿Cuál es la diferencia entre Tipo X y yeso regular?",
          "answer": "El yeso Tipo X (resistente al fuego) contiene fibras de vidrio en su núcleo de yeso que mantienen la placa unida por más tiempo durante un incendio. Un panel Tipo X de ⅝\" proporciona una clasificación de fuego de 1 hora, mientras que el yeso regular de ½\" proporciona aproximadamente 30 minutos. Los códigos de construcción requieren Tipo X en garajes adjuntos, entre unidades de vivienda y en cuartos de calderas/mecánicos."
        },
        {
          "question": "¿Cuánto compuesto para juntas y cinta necesito?",
          "answer": "Planifica aproximadamente 1 galón (3.78 L) de compuesto para juntas premezclado por cada 100 pies cuadrados de yeso para un acabado de 3 capas (cinta, relleno y alisado). Un balde estándar de 5 galones cubre aproximadamente 460 pies². Para cinta, un rollo de 500 pies cubre aproximadamente 460 pies² de yeso instalado."
        },
        {
          "question": "¿Debo colgar el yeso vertical u horizontalmente?",
          "answer": "Horizontalmente es preferido para la mayoría de paredes residenciales porque reduce la longitud total de juntas para cintar y crea una pared más fuerte. El borde horizontal largo (afilado) crea juntas al ras que son más fáciles de acabar. La instalación vertical es mejor para habitaciones con techos sobre 9 pies o para aplicaciones comerciales con montantes metálicos."
        },
        {
          "question": "¿Cuánto cuesta instalar yeso en una habitación?",
          "answer": "Los costos de materiales van de $0.40-$0.65 por pie cuadrado para yeso estándar (aproximadamente $12-$20 por panel). La instalación profesional incluyendo colgado, cintado y acabado cuesta $1.50-$3.00 por pie cuadrado. Un dormitorio típico de 12×12 con techo cuesta $350-$600 para materiales y $750-$1,500 para instalación profesional."
        },
        {
          "question": "¿Qué grosor de yeso debo usar?",
          "answer": "Usa ½\" para paredes estándar con montantes a 16\" de centro (más común). Usa ⅝\" para techos (previene pandeo), ensambles resistentes al fuego y paredes con montantes a 24\" de centro. Usa ¼\" para paredes curvas y reparaciones sobre superficies existentes. Usa ⅜\" para recubrimiento menor de paredes existentes."
        }
      ],
      "chart": {
        "title": "Desglose de Costos de Materiales",
        "xLabel": "Categoría",
        "yLabel": "Costo",
        "series": {
          "materialCost": "Materiales",
          "laborCost": "Mano de Obra"
        }
      },
      "detailedTable": {
        "materialsList": {
          "button": "Ver Lista Completa de Materiales",
          "title": "Lista Completa de Compras de Materiales",
          "columns": {
            "item": "Artículo",
            "quantity": "Cantidad",
            "unit": "Unidad",
            "notes": "Notas"
          }
        }
      },
      "buttons": {
        "calculate": "Calcular",
        "reset": "Reiniciar",
        "pdf": "PDF",
        "csv": "CSV",
        "excel": "Excel",
        "save": "Guardar",
        "saved": "Guardado",
        "saving": "Guardando..."
      },
      "share": {
        "calculatedWith": "Calculado con Kalcufy.com"
      },
      "ui": {
        "results": "Resultados",
        "yourInformation": "Tu Información"
      },
      "accessibility": {
        "mobileResults": "Resumen de resultados",
        "closeModal": "Cerrar",
        "openMenu": "Abrir menú"
      },
      "rating": {
        "title": "Califica esta Calculadora",
        "share": "Compartir",
        "copied": "¡Copiado!",
        "copyLink": "Copiar Enlace",
        "clickToRate": "Clic para calificar",
        "youRated": "Calificaste",
        "stars": "estrellas",
        "averageFrom": "promedio de",
        "ratings": "calificaciones"
      },
      "common": {
        "home": "Inicio",
        "calculators": "Calculadoras"
      },
      "sources": {
        "title": "Fuentes y Referencias"
      }
    },
    pt: {
      "name": "Calculadora de Drywall",
      "slug": "calculadora-placas-gesso",
      "subtitle": "Calcule quantas placas de drywall você precisa, mais parafusos, fita, massa corrida e estimativa de custos.",
      "breadcrumb": "Drywall",
      "seo": {
        "title": "Calculadora de Drywall - Estimador Gratuito de Placas e Materiais",
        "description": "Calcule quantas placas de drywall, parafusos, fita e massa corrida você precisa. Obtenha uma lista completa de materiais com estimativa de custos para qualquer ambiente.",
        "shortDescription": "Estime placas de drywall, materiais e custo total para seu projeto.",
        "keywords": [
          "calculadora de drywall",
          "calculadora de placas de gesso",
          "calculadora de chapas de drywall",
          "quanto drywall eu preciso",
          "calculadora de custo drywall",
          "calculadora gratuita drywall",
          "calculadora gesso acartonado",
          "estimador materiais drywall"
        ]
      },
      "calculator": {
        "yourInformation": "Suas Informações"
      },
      "inputs": {
        "panelSize": {
          "label": "Tamanho da Placa",
          "helpText": "Padrão 4'×8' funciona para a maioria dos ambientes. Use placas mais altas para tetos de 9'+ para reduzir juntas horizontais",
          "options": {
            "4x8": "4' × 8'",
            "4x10": "4' × 10'",
            "4x12": "4' × 12'"
          }
        },
        "drywallType": {
          "label": "Tipo de Drywall",
          "helpText": "Regular para a maioria dos ambientes. Resistente à umidade para banheiros/cozinhas. Resistente ao fogo para garagens",
          "options": {
            "regular": "Regular (Placa Branca)",
            "moisture": "Resistente à Umidade (Placa Verde)",
            "fireRated": "Resistente ao Fogo (Tipo X)",
            "soundproof": "Antirruído (Tipo STC)"
          }
        },
        "thickness": {
          "label": "Espessura",
          "helpText": "½\" é padrão para paredes. ⅝\" para tetos e resistente ao fogo. ¼\" para superfícies curvas",
          "options": {
            "quarter": "¼\"",
            "threeEighths": "⅜\"",
            "half": "½\" (Padrão)",
            "fiveEighths": "⅝\" (Fogo/Teto)"
          }
        },
        "roomLength": {
          "label": "Comprimento do Ambiente",
          "helpText": "Meça a parede mais longa do ambiente"
        },
        "roomWidth": {
          "label": "Largura do Ambiente",
          "helpText": "Meça a parede mais curta do ambiente"
        },
        "wallHeight": {
          "label": "Altura da Parede",
          "helpText": "Altura do piso ao teto — padrão é 8 pés (2,44 m)"
        },
        "includeCeiling": {
          "label": "Incluir Teto",
          "helpText": "Ative se você também estiver instalando drywall no teto"
        },
        "numberOfDoors": {
          "label": "Número de Portas",
          "helpText": "Vãos de portas internas padrão para subtrair da área da parede"
        },
        "doorHeight": {
          "label": "Altura da Porta",
          "helpText": "Porta interna padrão é 6'8\" (80 polegadas / 2,03 m)"
        },
        "doorWidth": {
          "label": "Largura da Porta",
          "helpText": "Porta interna padrão é 3 pés (36 polegadas / 0,91 m)"
        },
        "numberOfWindows": {
          "label": "Número de Janelas",
          "helpText": "Vãos de janelas para subtrair da área da parede"
        },
        "windowHeight": {
          "label": "Altura da Janela",
          "helpText": "Janela padrão é 3 pés (36 polegadas / 0,91 m)"
        },
        "windowWidth": {
          "label": "Largura da Janela",
          "helpText": "Janela padrão é 4 pés (48 polegadas / 1,22 m)"
        },
        "wasteFactor": {
          "label": "Fator de Desperdício",
          "helpText": "Considere cortes, erros e formatos irregulares. 10% para ambientes simples, 15% para layouts complexos"
        },
        "includeCost": {
          "label": "Incluir Estimativa de Custo",
          "helpText": "Ative para calcular custos de materiais e mão de obra"
        },
        "pricePerSheet": {
          "label": "Preço por Placa",
          "helpText": "Custo médio: R$40-60 para regular, R$56-80 para resistente à umidade/fogo"
        },
        "laborRate": {
          "label": "Taxa de Mão de Obra por Placa",
          "helpText": "Instalação profissional: R$24-48 por placa (só instalação) ou R$120-240 com acabamento"
        }
      },
      "results": {
        "totalArea": {
          "label": "Área Total de Drywall"
        },
        "sheetsNeeded": {
          "label": "Placas Necessárias"
        },
        "screws": {
          "label": "Parafusos Necessários"
        },
        "jointCompound": {
          "label": "Massa Corrida"
        },
        "tape": {
          "label": "Fita para Drywall"
        },
        "cornerBead": {
          "label": "Cantoneira"
        },
        "materialCost": {
          "label": "Custo dos Materiais"
        },
        "laborCost": {
          "label": "Custo da Mão de Obra"
        },
        "totalCost": {
          "label": "Custo Total"
        }
      },
      "presets": {
        "bedroom": {
          "label": "Quarto Padrão",
          "description": "Ambiente 12' × 12' com 1 porta e 2 janelas"
        },
        "masterBedroom": {
          "label": "Quarto Master",
          "description": "Ambiente 16' × 14' com 1 porta e 3 janelas"
        },
        "livingRoom": {
          "label": "Sala de Estar",
          "description": "Ambiente 20' × 16' com 2 portas e 4 janelas"
        },
        "basement": {
          "label": "Porão",
          "description": "Ambiente 24' × 20', só paredes, resistente à umidade"
        },
        "garage": {
          "label": "Garagem",
          "description": "Ambiente 24' × 24', resistente ao fogo com teto"
        },
        "bathroom": {
          "label": "Banheiro",
          "description": "Ambiente 8' × 6', placa resistente à umidade"
        }
      },
      "values": {
        "sqft": "pés²",
        "sqm": "m²",
        "sheets": "placas",
        "sheet": "placa",
        "screws": "parafusos",
        "lbs": "lbs",
        "kg": "kg",
        "gallons": "gal",
        "liters": "L",
        "ft": "pés",
        "m": "m",
        "pieces": "pçs",
        "rolls": "rolos",
        "roll": "rolo",
        "buckets": "baldes",
        "bucket": "balde"
      },
      "formats": {
        "summary": "Você precisa de {sheets} placas de drywall para cobrir {area} de área de parede e teto (incluindo {waste}% de desperdício)."
      },
      "infoCards": {
        "materials": {
          "title": "📦 Lista de Materiais",
          "items": [
            {
              "label": "Placas de Drywall",
              "valueKey": "sheetsNeeded"
            },
            {
              "label": "Parafusos para Drywall",
              "valueKey": "screws"
            },
            {
              "label": "Massa Corrida",
              "valueKey": "jointCompound"
            },
            {
              "label": "Fita para Drywall",
              "valueKey": "tape"
            }
          ]
        },
        "details": {
          "title": "📐 Detalhamento da Área",
          "items": [
            {
              "label": "Área Total de Drywall",
              "valueKey": "totalArea"
            },
            {
              "label": "Área de Parede (líquida)",
              "valueKey": "netWallArea"
            },
            {
              "label": "Área do Teto",
              "valueKey": "ceilingArea"
            },
            {
              "label": "Vãos Deduzidos",
              "valueKey": "openingsArea"
            }
          ]
        },
        "tips": {
          "title": "💡 Dicas de Instalação",
          "items": [
            "Instale primeiro as placas do teto, depois as paredes — use um elevador de drywall para tetos",
            "Intercale juntas entre fileiras para aumentar a resistência da parede e reduzir rachaduras",
            "Parafuse apenas abaixo da superfície do papel sem romper",
            "Aplique 3 demãos de massa corrida: demão de fita, demão de preenchimento e demão de acabamento"
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "O que é Drywall?",
          "content": "Drywall (também chamado de placa de gesso, gesso acartonado ou placa de gipsita) é um material de construção feito de gesso (sulfato de cálcio di-hidratado, CaSO₄·2H₂O) prensado entre duas folhas grossas de papel. É o material mais comum para paredes e tetos internos usado na América do Norte, tendo substituído amplamente o tradicional ripado e reboco desde os anos 1950. O drywall vem em painéis padrão de 4 pés de largura com comprimentos variados (8, 10 e 12 pés) e espessuras (¼\", ⅜\", ½\" e ⅝\"). O núcleo de gesso fornece resistência ao fogo porque quando exposto ao calor, as moléculas de água no gesso evaporam, retardando a propagação do fogo. Tipos especializados incluem resistente à umidade (placa verde) para banheiros e cozinhas, resistente ao fogo (Tipo X) com fibras de vidro para garagens e paredes compartilhadas, e variedades antirruído com compostos de amortecimento para redução de ruído entre ambientes."
        },
        "howItWorks": {
          "title": "Como Funciona a Calculadora de Drywall",
          "content": "Esta calculadora estima materiais de drywall computando a área total da parede (perímetro × altura), opcionalmente adicionando área do teto (comprimento × largura), depois subtraindo vãos para portas e janelas. Um fator de desperdício (tipicamente 10-15%) é adicionado para considerar cortes ao redor de tomadas, cantos e ajustes. A área total é dividida pelo tamanho de painel escolhido para determinar as placas necessárias, sempre arredondando para cima já que placas parciais não podem ser compradas. A partir da contagem de placas, a calculadora deriva requisitos de fixadores (~32 parafusos por placa 4'×8'), quantidade de massa corrida (~1 galão por 100 pés² para 3 demãos), e comprimento de fita baseado na metragem linear das juntas. A estimativa de custo multiplica a contagem de placas pelo seu preço por placa e adiciona custos opcionais de mão de obra, fornecendo um orçamento completo do projeto antes de você visitar a loja de materiais de construção."
        },
        "considerations": {
          "title": "Considerações Importantes",
          "items": [
            {
              "text": "Drywall padrão de ½\" é adequado para a maioria das aplicações em paredes com montantes espaçados a 16\" de centro a centro. Use ⅝\" para tetos para evitar flecha e para conjuntos resistentes ao fogo.",
              "type": "info"
            },
            {
              "text": "Placa resistente à umidade (placa verde) NÃO é à prova d'água — não use em áreas molhadas diretas como boxes de chuveiro. Use placa cimentícia ou membrana Kerdi nesses locais.",
              "type": "warning"
            },
            {
              "text": "Drywall resistente ao fogo Tipo X é exigido pela maioria dos códigos de construção para garagens anexas, casas de máquinas e paredes compartilhadas entre unidades em edifícios multifamiliares.",
              "type": "info"
            },
            {
              "text": "Encomende 10-15% de material extra. Ambientes complexos com muitos cantos, tomadas e ângulos geram mais desperdício dos cortes.",
              "type": "info"
            },
            {
              "text": "Drywall deve ser armazenado plano e mantido seco. Uma única placa de ½\" 4'×8' pesa cerca de 23 kg — planeje ajuda para levantar e um elevador de drywall para tetos.",
              "type": "warning"
            },
            {
              "text": "Use parafusos de rosca grossa para montantes de madeira e rosca fina para montantes metálicos. Espaçe parafusos a 12\" nas bordas e 16\" no campo.",
              "type": "info"
            }
          ]
        },
        "categories": {
          "title": "Tipos e Usos de Drywall",
          "items": [
            {
              "text": "Regular (Placa Branca): Placa de gesso padrão para paredes e tetos internos em áreas secas. Opção mais econômica para quartos, salas e corredores.",
              "type": "info"
            },
            {
              "text": "Resistente à Umidade (Placa Verde): Contém aditivos resistentes à água no núcleo e papel. Usado em banheiros, cozinhas, lavanderias — mas não em boxes de chuveiro.",
              "type": "info"
            },
            {
              "text": "Resistente ao Fogo (Tipo X): Contém fibras de vidro para resistência ao fogo aprimorada. ⅝\" Tipo X fornece classificação de fogo de 1 hora. Exigido em garagens e conjuntos resistentes ao fogo.",
              "type": "info"
            },
            {
              "text": "Antirruído (Classificação STC): Usa polímero viscoelástico entre camadas de gesso para amortecer som. Ideal para salas de mídia, quartos adjacentes a áreas barulhentas e escritórios domésticos.",
              "type": "info"
            },
            {
              "text": "Flexível (¼\" Curvável): Gesso fino que pode dobrar para paredes curvas e arcos. Geralmente dobrado para resistência e requer umedecimento ou riscamento antes da instalação.",
              "type": "info"
            },
            {
              "text": "Resistente a Impactos: Núcleo de alta densidade com superfície reforçada para áreas de alto tráfego como corredores, escolas e espaços comerciais. Resiste a amassados e perfurações.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemplos de Cálculo",
          "description": "Estimativa de materiais de drywall passo a passo",
          "examples": [
            {
              "title": "Quarto Padrão (12' × 12' × 8')",
              "steps": [
                "Perímetro = 2 × (12 + 12) = 48 pés",
                "Área bruta da parede = 48 × 8 = 384 pés²",
                "Subtrair 1 porta (6,67 × 3 = 20 pés²) + 2 janelas (2 × 3 × 4 = 24 pés²) = 44 pés²",
                "Área líquida da parede = 384 − 44 = 340 pés²",
                "Área do teto = 12 × 12 = 144 pés²",
                "Total = 340 + 144 = 484 pés²",
                "Com 10% desperdício = 484 × 1,10 = 532,4 pés²",
                "Placas (4'×8' = 32 pés² cada): ⌈532,4 ÷ 32⌉ = 17 placas"
              ],
              "result": "17 placas de drywall 4'×8', ~544 parafusos, ~6 gal massa corrida, ~2 rolos de fita"
            },
            {
              "title": "Garagem (24' × 24' × 10') Resistente ao Fogo",
              "steps": [
                "Perímetro = 2 × (24 + 24) = 96 pés",
                "Área bruta da parede = 96 × 10 = 960 pés²",
                "Subtrair 1 porta (7 × 3 = 21 pés²) = 21 pés²",
                "Área líquida da parede = 960 − 21 = 939 pés²",
                "Área do teto = 24 × 24 = 576 pés²",
                "Total = 939 + 576 = 1.515 pés²",
                "Com 12% desperdício = 1.515 × 1,12 = 1.696,8 pés²",
                "Placas (4'×8' = 32 pés² cada): ⌈1696,8 ÷ 32⌉ = 54 placas"
              ],
              "result": "54 placas de Tipo X ⅝\" (4'×8'), ~1.728 parafusos, ~17 gal massa, ~5 rolos de fita"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Quantas placas de drywall eu preciso para um ambiente 12×12?",
          "answer": "Um ambiente de 12' × 12' com tetos de 8 pés, 1 porta e 2 janelas precisa de aproximadamente 17 placas de drywall padrão 4'×8' (incluindo teto e 10% de desperdício). Sem o teto, você precisaria de cerca de 12 placas. A contagem exata depende do seu fator de desperdício, número de vãos e tamanho de painel escolhido."
        },
        {
          "question": "Que tipo de drywall devo usar em um banheiro?",
          "answer": "Use drywall resistente à umidade (placa verde) para paredes e tetos de banheiro que não estão diretamente na área do chuveiro ou banheira. Para boxes de chuveiro e áreas de banheira, use placa cimentícia (como Durock ou HardieBacker) — placa verde é resistente à água mas NÃO é à prova d'água e falhará em áreas molhadas diretas."
        },
        {
          "question": "Quantos parafusos de drywall eu preciso por placa?",
          "answer": "Planeje aproximadamente 32 parafusos por placa 4'×8' (cerca de 1 parafuso por pé quadrado). Parafusos devem ser colocados a cada 12 polegadas ao longo das bordas e a cada 16 polegadas no campo (área central). Para tetos, você pode precisar de um pouco mais de parafusos — aproximadamente 36 por placa — porque eles lutam contra a gravidade."
        },
        {
          "question": "Qual é a diferença entre Tipo X e drywall regular?",
          "answer": "Drywall Tipo X (resistente ao fogo) contém fibras de vidro em seu núcleo de gesso que mantêm a placa unida por mais tempo durante um incêndio. Uma placa Tipo X de ⅝\" fornece classificação de fogo de 1 hora, enquanto drywall regular de ½\" fornece cerca de 30 minutos. Códigos de construção exigem Tipo X em garagens anexas, entre unidades habitacionais e em salas de fornalha/mecânicas."
        },
        {
          "question": "Quanta massa corrida e fita eu preciso?",
          "answer": "Planeje aproximadamente 1 galão (3,78 L) de massa corrida pré-misturada por 100 pés quadrados de drywall para um acabamento de 3 demãos (fita, preenchimento e alisamento). Um balde padrão de 5 galões cobre cerca de 460 pés². Para fita, um rolo de 500 pés cobre aproximadamente 460 pés² de drywall instalado."
        },
        {
          "question": "Devo instalar drywall vertical ou horizontalmente?",
          "answer": "Horizontalmente é preferível para a maioria das paredes residenciais porque reduz o comprimento total de juntas para fitar e cria uma parede mais forte. A borda horizontal longa (afilada) cria juntas niveladas que são mais fáceis de acabar. Instalação vertical é melhor para ambientes com tetos acima de 9 pés ou para aplicações comerciais com montantes metálicos."
        },
        {
          "question": "Quanto custa para instalar drywall em um ambiente?",
          "answer": "Custos de materiais ficam R$16-26 por metro quadrado para drywall padrão (cerca de R$40-80 por placa). Instalação profissional incluindo montagem, fitagem e acabamento custa R$60-120 por metro quadrado. Um quarto típico 12×12 com teto custa R$1.400-2.400 para materiais e R$3.000-6.000 para instalação profissional."
        },
        {
          "question": "Que espessura de drywall devo usar?",
          "answer": "Use ½\" para paredes padrão com montantes a 16\" de centro a centro (mais comum). Use ⅝\" para tetos (evita flecha), conjuntos resistentes ao fogo e paredes com montantes a 24\" de centro a centro. Use ¼\" para paredes curvas e reparos sobre superfícies existentes. Use ⅜\" para pequenos recobrimentos de paredes existentes."
        }
      ],
      "chart": {
        "title": "Detalhamento de Custos de Material",
        "xLabel": "Categoria",
        "yLabel": "Custo",
        "series": {
          "materialCost": "Materiais",
          "laborCost": "Mão de Obra"
        }
      },
      "detailedTable": {
        "materialsList": {
          "button": "Ver Lista Completa de Materiais",
          "title": "Lista Completa de Materiais para Compra",
          "columns": {
            "item": "Item",
            "quantity": "Quantidade",
            "unit": "Unidade",
            "notes": "Observações"
          }
        }
      },
      "buttons": {
        "calculate": "Calcular",
        "reset": "Reiniciar",
        "pdf": "PDF",
        "csv": "CSV",
        "excel": "Excel",
        "save": "Salvar",
        "saved": "Salvo",
        "saving": "Salvando..."
      },
      "share": {
        "calculatedWith": "Calculado com Kalcufy.com"
      },
      "ui": {
        "results": "Resultados",
        "yourInformation": "Suas Informações"
      },
      "accessibility": {
        "mobileResults": "Resumo dos resultados",
        "closeModal": "Fechar",
        "openMenu": "Abrir menu"
      },
      "rating": {
        "title": "Avalie esta Calculadora",
        "share": "Compartilhar",
        "copied": "Copiado!",
        "copyLink": "Copiar Link",
        "clickToRate": "Clique para avaliar",
        "youRated": "Você avaliou",
        "stars": "estrelas",
        "averageFrom": "média de",
        "ratings": "avaliações"
      },
      "common": {
        "home": "Início",
        "calculators": "Calculadoras"
      },
      "sources": {
        "title": "Fontes e Referências"
      }
    },
    fr: {
      "name": "Calculateur de Cloisons Sèches",
      "slug": "calculateur-cloisons-seches",
      "subtitle": "Calculez combien de panneaux de cloisons sèches vous avez besoin, plus les vis, le ruban, le composé de joints et les estimations de coût.",
      "breadcrumb": "Cloisons Sèches",
      "seo": {
        "title": "Calculateur de Cloisons Sèches - Estimateur Gratuit de Plaques de Plâtre et Matériaux",
        "description": "Calculez combien de panneaux de cloisons sèches, vis, ruban et composé de joints vous avez besoin. Obtenez une liste complète de matériaux avec estimations de coût pour toute pièce.",
        "shortDescription": "Estimez les panneaux de cloisons sèches, matériaux et coût total pour votre projet.",
        "keywords": [
          "calculateur cloisons sèches",
          "calculateur plaques de plâtre",
          "calculateur panneaux gypse",
          "combien cloisons sèches besoin",
          "calculateur coût cloisons sèches",
          "calculateur cloisons sèches gratuit",
          "calculateur panneaux gypse",
          "estimateur matériaux cloisons sèches"
        ]
      },
      "calculator": {
        "yourInformation": "Vos Informations"
      },
      "inputs": {
        "panelSize": {
          "label": "Taille du Panneau",
          "helpText": "Standard 4'×8' fonctionne pour la plupart des pièces. Utilisez des panneaux plus hauts pour des plafonds de 9'+ pour réduire les joints horizontaux",
          "options": {
            "4x8": "4' × 8'",
            "4x10": "4' × 10'",
            "4x12": "4' × 12'"
          }
        },
        "drywallType": {
          "label": "Type de Cloison Sèche",
          "helpText": "Régulière pour la plupart des pièces. Résistante à l'humidité pour salles de bain/cuisines. Résistante au feu pour garages",
          "options": {
            "regular": "Régulière (Panneau Blanc)",
            "moisture": "Résistante à l'Humidité (Panneau Vert)",
            "fireRated": "Résistante au Feu (Type X)",
            "soundproof": "Insonorisante (Type STC)"
          }
        },
        "thickness": {
          "label": "Épaisseur",
          "helpText": "½\" est standard pour les murs. ⅝\" pour plafonds et résistant au feu. ¼\" pour surfaces courbes",
          "options": {
            "quarter": "¼\"",
            "threeEighths": "⅜\"",
            "half": "½\" (Standard)",
            "fiveEighths": "⅝\" (Feu/Plafond)"
          }
        },
        "roomLength": {
          "label": "Longueur de la Pièce",
          "helpText": "Mesurez le mur le plus long de la pièce"
        },
        "roomWidth": {
          "label": "Largeur de la Pièce",
          "helpText": "Mesurez le mur le plus court de la pièce"
        },
        "wallHeight": {
          "label": "Hauteur des Murs",
          "helpText": "Hauteur du sol au plafond — standard est 8 pi (2,44 m)"
        },
        "includeCeiling": {
          "label": "Inclure le Plafond",
          "helpText": "Activez si vous installez aussi des cloisons sèches au plafond"
        },
        "numberOfDoors": {
          "label": "Nombre de Portes",
          "helpText": "Ouvertures de portes intérieures standard à soustraire de la surface murale"
        },
        "doorHeight": {
          "label": "Hauteur de Porte",
          "helpText": "Porte intérieure standard est 6'8\" (80 pouces / 2,03 m)"
        },
        "doorWidth": {
          "label": "Largeur de Porte",
          "helpText": "Porte intérieure standard est 3 pi (36 pouces / 0,91 m)"
        },
        "numberOfWindows": {
          "label": "Nombre de Fenêtres",
          "helpText": "Ouvertures de fenêtres à soustraire de la surface murale"
        },
        "windowHeight": {
          "label": "Hauteur de Fenêtre",
          "helpText": "Fenêtre standard est 3 pi (36 pouces / 0,91 m)"
        },
        "windowWidth": {
          "label": "Largeur de Fenêtre",
          "helpText": "Fenêtre standard est 4 pi (48 pouces / 1,22 m)"
        },
        "wasteFactor": {
          "label": "Facteur de Perte",
          "helpText": "Tenez compte des coupes, erreurs et formes irrégulières. 10% pour pièces simples, 15% pour aménagements complexes"
        },
        "includeCost": {
          "label": "Inclure l'Estimation de Coût",
          "helpText": "Activez pour calculer les coûts de matériaux et main-d'œuvre"
        },
        "pricePerSheet": {
          "label": "Prix par Panneau",
          "helpText": "Coût moyen : 10$-15$ pour régulier, 14$-20$ pour résistant humidité/feu"
        },
        "laborRate": {
          "label": "Tarif Main-d'œuvre par Panneau",
          "helpText": "Installation professionnelle : 6$-12$ par panneau (pose seulement) ou 30$-60$ avec finition"
        }
      },
      "results": {
        "totalArea": {
          "label": "Surface Totale de Cloisons Sèches"
        },
        "sheetsNeeded": {
          "label": "Panneaux Nécessaires"
        },
        "screws": {
          "label": "Vis Nécessaires"
        },
        "jointCompound": {
          "label": "Composé de Joints"
        },
        "tape": {
          "label": "Ruban à Cloisons Sèches"
        },
        "cornerBead": {
          "label": "Cornière d'Angle"
        },
        "materialCost": {
          "label": "Coût des Matériaux"
        },
        "laborCost": {
          "label": "Coût de la Main-d'œuvre"
        },
        "totalCost": {
          "label": "Coût Total"
        }
      },
      "presets": {
        "bedroom": {
          "label": "Chambre Standard",
          "description": "Pièce de 12' × 12' avec 1 porte et 2 fenêtres"
        },
        "masterBedroom": {
          "label": "Chambre Principale",
          "description": "Pièce de 16' × 14' avec 1 porte et 3 fenêtres"
        },
        "livingRoom": {
          "label": "Salon",
          "description": "Pièce de 20' × 16' avec 2 portes et 4 fenêtres"
        },
        "basement": {
          "label": "Sous-sol",
          "description": "Pièce de 24' × 20', murs seulement, résistant à l'humidité"
        },
        "garage": {
          "label": "Garage",
          "description": "Pièce de 24' × 24', résistant au feu avec plafond"
        },
        "bathroom": {
          "label": "Salle de Bain",
          "description": "Pièce de 8' × 6', panneau résistant à l'humidité"
        }
      },
      "values": {
        "sqft": "pi²",
        "sqm": "m²",
        "sheets": "panneaux",
        "sheet": "panneau",
        "screws": "vis",
        "lbs": "lb",
        "kg": "kg",
        "gallons": "gal",
        "liters": "L",
        "ft": "pi",
        "m": "m",
        "pieces": "pcs",
        "rolls": "rouleaux",
        "roll": "rouleau",
        "buckets": "seaux",
        "bucket": "seau"
      },
      "formats": {
        "summary": "Vous avez besoin de {sheets} panneaux de cloisons sèches pour couvrir {area} de surface de mur et plafond (incluant {waste}% de perte)."
      },
      "infoCards": {
        "materials": {
          "title": "📦 Liste des Matériaux",
          "items": [
            {
              "label": "Panneaux de Cloisons Sèches",
              "valueKey": "sheetsNeeded"
            },
            {
              "label": "Vis à Cloisons Sèches",
              "valueKey": "screws"
            },
            {
              "label": "Composé de Joints",
              "valueKey": "jointCompound"
            },
            {
              "label": "Ruban à Cloisons Sèches",
              "valueKey": "tape"
            }
          ]
        },
        "details": {
          "title": "📐 Répartition de la Surface",
          "items": [
            {
              "label": "Surface Totale de Cloisons Sèches",
              "valueKey": "totalArea"
            },
            {
              "label": "Surface Murale (nette)",
              "valueKey": "netWallArea"
            },
            {
              "label": "Surface du Plafond",
              "valueKey": "ceilingArea"
            },
            {
              "label": "Ouvertures Déduites",
              "valueKey": "openingsArea"
            }
          ]
        },
        "tips": {
          "title": "💡 Conseils d'Installation",
          "items": [
            "Installez d'abord les panneaux du plafond, puis les murs — utilisez un lève-panneaux pour les plafonds",
            "Décalez les joints entre les rangées pour augmenter la résistance du mur et réduire les fissures",
            "Enfoncez les vis juste sous la surface du papier sans la percer",
            "Appliquez 3 couches de composé de joints : couche de ruban, couche de remplissage et couche de finition"
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Qu'est-ce que les Cloisons Sèches ?",
          "content": "Les cloisons sèches (aussi appelées plaques de plâtre, panneaux de gypse ou carreaux de plâtre) sont un matériau de construction fait de plâtre de gypse (sulfate de calcium dihydraté, CaSO₄·2H₂O) pressé entre deux épaisses feuilles de papier. C'est le matériau le plus couramment utilisé pour les murs et plafonds intérieurs en Amérique du Nord, ayant largement remplacé le traditionnel lattis et plâtre depuis les années 1950. Les cloisons sèches viennent en panneaux standard de 4 pieds de large de longueurs variables (8, 10 et 12 pieds) et d'épaisseurs (¼\", ⅜\", ½\" et ⅝\"). Le noyau de gypse offre une résistance au feu car lorsqu'il est exposé à la chaleur, les molécules d'eau dans le gypse s'évaporent, ralentissant la propagation du feu. Les types spécialisés incluent résistant à l'humidité (panneau vert) pour salles de bains et cuisines, résistant au feu (Type X) avec fibres de verre pour garages et murs partagés, et variétés insonorisantes avec composés amortissants pour réduire le bruit entre les pièces."
        },
        "howItWorks": {
          "title": "Comment Fonctionne le Calculateur de Cloisons Sèches",
          "content": "Ce calculateur estime les matériaux de cloisons sèches en calculant la surface murale totale (périmètre × hauteur), ajoutant optionnellement la surface du plafond (longueur × largeur), puis soustrayant les ouvertures pour portes et fenêtres. Un facteur de perte (typiquement 10-15%) est ajouté pour tenir compte des coupes autour des prises, coins et ajustements. La surface totale est divisée par la taille de panneau choisie pour déterminer les panneaux nécessaires, toujours arrondi vers le haut car les panneaux partiels ne peuvent être achetés. À partir du nombre de panneaux, le calculateur dérive les exigences de fixation (~32 vis par panneau 4'×8'), la quantité de composé de joints (~1 gallon par 100 pi² pour 3 couches), et la longueur de ruban basée sur la longueur linéaire des joints. L'estimation de coût multiplie le nombre de panneaux par votre prix par panneau et ajoute les coûts de main-d'œuvre optionnels, vous donnant un budget de projet complet avant de visiter la quincaillerie."
        },
        "considerations": {
          "title": "Considérations Clés",
          "items": [
            {
              "text": "Les cloisons sèches standard de ½\" conviennent pour la plupart des applications murales avec poteaux espacés de 16\" au centre. Utilisez ⅝\" pour les plafonds pour prévenir l'affaissement et pour les assemblages résistants au feu.",
              "type": "info"
            },
            {
              "text": "Les panneaux résistants à l'humidité (panneau vert) ne sont PAS étanches — ne les utilisez pas dans les zones directement mouillées comme les enceintes de douche. Utilisez plutôt des panneaux de ciment ou une membrane Kerdi.",
              "type": "warning"
            },
            {
              "text": "Les cloisons sèches Type X résistantes au feu sont requises par la plupart des codes du bâtiment pour les garages attenants, salles de fournaise et murs partagés entre unités dans les bâtiments multifamiliaux.",
              "type": "info"
            },
            {
              "text": "Commandez 10-15% de matériau supplémentaire. Les pièces complexes avec beaucoup de coins, prises et angles génèrent plus de perte due aux coupes.",
              "type": "info"
            },
            {
              "text": "Les cloisons sèches doivent être stockées à plat et gardées au sec. Un seul panneau ½\" 4'×8' pèse environ 51 lb — prévoyez de l'aide pour soulever et un lève-panneaux pour les plafonds.",
              "type": "warning"
            },
            {
              "text": "Utilisez des vis à filetage grossier pour poteaux de bois et à filetage fin pour poteaux métalliques. Espacez les vis à 12\" sur les bords et 16\" au centre.",
              "type": "info"
            }
          ]
        },
        "categories": {
          "title": "Types et Utilisations de Cloisons Sèches",
          "items": [
            {
              "text": "Régulière (Panneau Blanc) : Panneau de gypse standard pour murs et plafonds intérieurs dans zones sèches. Option la plus économique pour chambres, salons et couloirs.",
              "type": "info"
            },
            {
              "text": "Résistante à l'Humidité (Panneau Vert) : Contient des additifs résistants à l'eau dans le noyau et le papier. Utilisée dans salles de bains, cuisines, buanderies — mais pas enceintes de douche.",
              "type": "info"
            },
            {
              "text": "Résistante au Feu (Type X) : Contient des fibres de verre pour résistance au feu améliorée. Type X ⅝\" offre 1 heure de résistance au feu. Requise dans garages et assemblages résistants au feu.",
              "type": "info"
            },
            {
              "text": "Insonorisante (Cotée STC) : Utilise polymère viscoélastique entre couches de gypse pour amortir le son. Idéale pour salles multimédia, chambres adjacentes à zones bruyantes et bureaux à domicile.",
              "type": "info"
            },
            {
              "text": "Flexible (¼\" Courbure) : Gypse mince pouvant se courber pour murs courbes et arches. Généralement doublée pour résistance et nécessite mouillage ou rainurage avant installation.",
              "type": "info"
            },
            {
              "text": "Résistante aux Abus : Noyau haute densité avec surface renforcée pour zones à fort trafic comme corridors, écoles et espaces commerciaux. Résiste aux bosses et perforations.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemples de Calcul",
          "description": "Estimation étape par étape des matériaux de cloisons sèches",
          "examples": [
            {
              "title": "Chambre Standard (12' × 12' × 8')",
              "steps": [
                "Périmètre = 2 × (12 + 12) = 48 pi",
                "Surface murale brute = 48 × 8 = 384 pi²",
                "Soustraire 1 porte (6,67 × 3 = 20 pi²) + 2 fenêtres (2 × 3 × 4 = 24 pi²) = 44 pi²",
                "Surface murale nette = 384 − 44 = 340 pi²",
                "Surface plafond = 12 × 12 = 144 pi²",
                "Total = 340 + 144 = 484 pi²",
                "Avec 10% perte = 484 × 1,10 = 532,4 pi²",
                "Panneaux (4'×8' = 32 pi² chacun) : ⌈532,4 ÷ 32⌉ = 17 panneaux"
              ],
              "result": "17 panneaux de cloisons sèches 4'×8', ~544 vis, ~6 gal composé de joints, ~2 rouleaux de ruban"
            },
            {
              "title": "Garage (24' × 24' × 10') Résistant au Feu",
              "steps": [
                "Périmètre = 2 × (24 + 24) = 96 pi",
                "Surface murale brute = 96 × 10 = 960 pi²",
                "Soustraire 1 porte (7 × 3 = 21 pi²) = 21 pi²",
                "Surface murale nette = 960 − 21 = 939 pi²",
                "Surface plafond = 24 × 24 = 576 pi²",
                "Total = 939 + 576 = 1 515 pi²",
                "Avec 12% perte = 1 515 × 1,12 = 1 696,8 pi²",
                "Panneaux (4'×8' = 32 pi² chacun) : ⌈1696,8 ÷ 32⌉ = 54 panneaux"
              ],
              "result": "54 panneaux Type X ⅝\" (4'×8'), ~1 728 vis, ~17 gal composé, ~5 rouleaux de ruban"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Combien de panneaux de cloisons sèches ai-je besoin pour une pièce 12×12 ?",
          "answer": "Une pièce de 12' × 12' avec plafonds de 8 pieds, 1 porte et 2 fenêtres nécessite environ 17 panneaux standard 4'×8' de cloisons sèches (incluant plafond et 10% perte). Sans le plafond, vous auriez besoin d'environ 12 panneaux. Le nombre exact dépend de votre facteur de perte, nombre d'ouvertures et taille de panneau choisie."
        },
        {
          "question": "Quel type de cloisons sèches devrais-je utiliser dans une salle de bain ?",
          "answer": "Utilisez des cloisons sèches résistantes à l'humidité (panneau vert) pour les murs et plafonds de salle de bain qui ne sont pas directement dans la zone de douche ou baignoire. Pour les enceintes de douche et contours de baignoire, utilisez plutôt des panneaux de support en ciment (comme Durock ou HardieBacker) — le panneau vert est résistant à l'eau mais N'EST PAS étanche et échouera dans les zones directement mouillées."
        },
        {
          "question": "Combien de vis à cloisons sèches ai-je besoin par panneau ?",
          "answer": "Prévoyez environ 32 vis par panneau 4'×8' (environ 1 vis par pied carré). Les vis doivent être placées tous les 12 pouces le long des bords et tous les 16 pouces au centre. Pour les plafonds, vous pourriez avoir besoin de légèrement plus de vis — environ 36 par panneau — car elles combattent la gravité."
        },
        {
          "question": "Quelle est la différence entre Type X et cloisons sèches régulières ?",
          "answer": "Les cloisons sèches Type X (résistantes au feu) contiennent des fibres de verre dans leur noyau de gypse qui maintiennent le panneau ensemble plus longtemps pendant un incendie. Un panneau Type X ⅝\" offre une résistance au feu de 1 heure, tandis que les cloisons sèches régulières ½\" offrent environ 30 minutes. Les codes du bâtiment exigent Type X dans garages attenants, entre unités d'habitation et dans salles de fournaise/mécanique."
        },
        {
          "question": "Combien de composé de joints et ruban ai-je besoin ?",
          "answer": "Prévoyez environ 1 gallon (3,78 L) de composé de joints pré-mélangé par 100 pieds carrés de cloisons sèches pour une finition à 3 couches (ruban, remplissage et lissage). Un seau standard de 5 gallons couvre environ 460 pi². Pour le ruban, un rouleau de 500 pieds couvre environ 460 pi² de cloisons sèches installées."
        },
        {
          "question": "Devrais-je installer les cloisons sèches verticalement ou horizontalement ?",
          "answer": "Horizontalement est préféré pour la plupart des murs résidentiels car cela réduit la longueur totale des joints à rubaner et crée un mur plus résistant. Le long bord horizontal (effilé) crée des joints affleurants plus faciles à finir. L'installation verticale est meilleure pour pièces avec plafonds de plus de 9 pieds ou applications commerciales avec poteaux métalliques."
        },
        {
          "question": "Combien coûte l'installation de cloisons sèches dans une pièce ?",
          "answer": "Les coûts de matériaux varient de 0,40$-0,65$ par pied carré pour cloisons sèches standard (environ 12$-20$ par panneau). L'installation professionnelle incluant pose, rubanage et finition coûte 1,50$-3,00$ par pied carré. Une chambre typique 12×12 avec plafond coûte 350$-600$ pour matériaux et 750$-1 500$ pour installation professionnelle."
        },
        {
          "question": "Quelle épaisseur de cloisons sèches devrais-je utiliser ?",
          "answer": "Utilisez ½\" pour murs standard avec poteaux à 16\" au centre (le plus courant). Utilisez ⅝\" pour plafonds (prévient l'affaissement), assemblages résistants au feu et murs avec poteaux à 24\" au centre. Utilisez ¼\" pour murs courbes et réparations sur surfaces existantes. Utilisez ⅜\" pour recouvrement mineur de murs existants."
        }
      ],
      "chart": {
        "title": "Répartition des Coûts de Matériaux",
        "xLabel": "Catégorie",
        "yLabel": "Coût",
        "series": {
          "materialCost": "Matériaux",
          "laborCost": "Main-d'œuvre"
        }
      },
      "detailedTable": {
        "materialsList": {
          "button": "Voir Liste Complète des Matériaux",
          "title": "Liste Complète d'Achat de Matériaux",
          "columns": {
            "item": "Article",
            "quantity": "Quantité",
            "unit": "Unité",
            "notes": "Notes"
          }
        }
      },
      "buttons": {
        "calculate": "Calculer",
        "reset": "Réinitialiser",
        "pdf": "PDF",
        "csv": "CSV",
        "excel": "Excel",
        "save": "Sauvegarder",
        "saved": "Sauvegardé",
        "saving": "Sauvegarde..."
      },
      "share": {
        "calculatedWith": "Calculé avec Kalcufy.com"
      },
      "ui": {
        "results": "Résultats",
        "yourInformation": "Vos Informations"
      },
      "accessibility": {
        "mobileResults": "Résumé des résultats",
        "closeModal": "Fermer",
        "openMenu": "Ouvrir le menu"
      },
      "rating": {
        "title": "Notez cette Calculatrice",
        "share": "Partager",
        "copied": "Copié!",
        "copyLink": "Copier le Lien",
        "clickToRate": "Cliquez pour noter",
        "youRated": "Vous avez noté",
        "stars": "étoiles",
        "averageFrom": "moyenne de",
        "ratings": "évaluations"
      },
      "common": {
        "home": "Accueil",
        "calculators": "Calculatrices"
      },
      "sources": {
        "title": "Sources et Références"
      }
    },
    de: {
      "name": "Trockenbau Rechner",
      "slug": "trockenbau-rechner",
      "subtitle": "Berechnen Sie, wie viele Trockenbauplaten Sie benötigen, plus Schrauben, Klebeband, Spachtelmasse und Kostenschätzungen.",
      "breadcrumb": "Trockenbau",
      "seo": {
        "title": "Trockenbau Rechner - Kostenloser Gipsplatten & Material Schätzer",
        "description": "Berechnen Sie, wie viele Trockenbauplaten, Schrauben, Klebeband und Spachtelmasse Sie benötigen. Erhalten Sie eine vollständige Materialliste mit Kostenschätzungen für jeden Raum.",
        "shortDescription": "Schätzen Sie Trockenbauplaten, Materialien und Gesamtkosten für Ihr Projekt.",
        "keywords": [
          "trockenbau rechner",
          "gipsplatten rechner",
          "trockenbauplaten rechner",
          "wie viele trockenbauplaten brauche ich",
          "trockenbau kosten rechner",
          "kostenloser trockenbau rechner",
          "gipskarton rechner",
          "trockenbau material schätzer"
        ]
      },
      "calculator": {
        "yourInformation": "Ihre Informationen"
      },
      "inputs": {
        "panelSize": {
          "label": "Plattengröße",
          "helpText": "Standard 4'×8' funktioniert für die meisten Räume. Verwenden Sie höhere Platten für 9'+ Decken zur Reduzierung horizontaler Fugen",
          "options": {
            "4x8": "4' × 8'",
            "4x10": "4' × 10'",
            "4x12": "4' × 12'"
          }
        },
        "drywallType": {
          "label": "Trockenbauplaten-Art",
          "helpText": "Standard für die meisten Räume. Feuchtigkeitsresistent für Badezimmer/Küchen. Feuerfest für Garagen",
          "options": {
            "regular": "Standard (Weiße Platte)",
            "moisture": "Feuchtigkeitsresistent (Grüne Platte)",
            "fireRated": "Feuerfest (Typ X)",
            "soundproof": "Schalldicht (Typ STC)"
          }
        },
        "thickness": {
          "label": "Dicke",
          "helpText": "½\" ist Standard für Wände. ⅝\" für Decken und feuerfest. ¼\" für gebogene Oberflächen",
          "options": {
            "quarter": "¼\"",
            "threeEighths": "⅜\"",
            "half": "½\" (Standard)",
            "fiveEighths": "⅝\" (Feuer/Decke)"
          }
        },
        "roomLength": {
          "label": "Raumlänge",
          "helpText": "Messen Sie die längste Wand des Raumes"
        },
        "roomWidth": {
          "label": "Raumbreite",
          "helpText": "Messen Sie die kürzere Wand des Raumes"
        },
        "wallHeight": {
          "label": "Wandhöhe",
          "helpText": "Boden zu Decke Höhe — Standard ist 8 ft (2,44 m)"
        },
        "includeCeiling": {
          "label": "Decke einbeziehen",
          "helpText": "Aktivieren Sie dies, wenn Sie auch die Decke verkleiden"
        },
        "numberOfDoors": {
          "label": "Anzahl der Türen",
          "helpText": "Standard Innentür-Öffnungen, die von der Wandfläche abgezogen werden"
        },
        "doorHeight": {
          "label": "Türhöhe",
          "helpText": "Standard Innentür ist 6'8\" (80 Zoll / 2,03 m)"
        },
        "doorWidth": {
          "label": "Türbreite",
          "helpText": "Standard Innentür ist 3 ft (36 Zoll / 0,91 m)"
        },
        "numberOfWindows": {
          "label": "Anzahl der Fenster",
          "helpText": "Fensteröffnungen, die von der Wandfläche abgezogen werden"
        },
        "windowHeight": {
          "label": "Fensterhöhe",
          "helpText": "Standard Fenster ist 3 ft (36 Zoll / 0,91 m)"
        },
        "windowWidth": {
          "label": "Fensterbreite",
          "helpText": "Standard Fenster ist 4 ft (48 Zoll / 1,22 m)"
        },
        "wasteFactor": {
          "label": "Verschnittfaktor",
          "helpText": "Berücksichtigt Schnitte, Fehler und ungewöhnliche Formen. 10% für einfache Räume, 15% für komplexe Grundrisse"
        },
        "includeCost": {
          "label": "Kostenschätzung einbeziehen",
          "helpText": "Aktivieren Sie dies, um Material- und Arbeitskosten zu berechnen"
        },
        "pricePerSheet": {
          "label": "Preis pro Platte",
          "helpText": "Durchschnittliche Kosten: €8-€12 für Standard, €11-€16 für feuchtigkeits-/feuerfeste"
        },
        "laborRate": {
          "label": "Arbeitslohn pro Platte",
          "helpText": "Professionelle Installation: €5-€10 pro Platte (nur Montage) oder €25-€50 mit Verspachtelung"
        }
      },
      "results": {
        "totalArea": {
          "label": "Gesamte Trockenbaufläche"
        },
        "sheetsNeeded": {
          "label": "Benötigte Platten"
        },
        "screws": {
          "label": "Benötigte Schrauben"
        },
        "jointCompound": {
          "label": "Spachtelmasse"
        },
        "tape": {
          "label": "Fugenband"
        },
        "cornerBead": {
          "label": "Eckenschiene"
        },
        "materialCost": {
          "label": "Materialkosten"
        },
        "laborCost": {
          "label": "Arbeitskosten"
        },
        "totalCost": {
          "label": "Gesamtkosten"
        }
      },
      "presets": {
        "bedroom": {
          "label": "Standard Schlafzimmer",
          "description": "12' × 12' Raum mit 1 Tür und 2 Fenstern"
        },
        "masterBedroom": {
          "label": "Hauptschlafzimmer",
          "description": "16' × 14' Raum mit 1 Tür und 3 Fenstern"
        },
        "livingRoom": {
          "label": "Wohnzimmer",
          "description": "20' × 16' Raum mit 2 Türen und 4 Fenstern"
        },
        "basement": {
          "label": "Keller",
          "description": "24' × 20' Raum, nur Wände, feuchtigkeitsresistent"
        },
        "garage": {
          "label": "Garage",
          "description": "24' × 24' Raum, feuerfest mit Decke"
        },
        "bathroom": {
          "label": "Badezimmer",
          "description": "8' × 6' Raum, feuchtigkeitsresistente Platten"
        }
      },
      "values": {
        "sqft": "sq ft",
        "sqm": "m²",
        "sheets": "Platten",
        "sheet": "Platte",
        "screws": "Schrauben",
        "lbs": "Pfund",
        "kg": "kg",
        "gallons": "Gal",
        "liters": "L",
        "ft": "ft",
        "m": "m",
        "pieces": "Stück",
        "rolls": "Rollen",
        "roll": "Rolle",
        "buckets": "Eimer",
        "bucket": "Eimer"
      },
      "formats": {
        "summary": "Sie benötigen {sheets} Trockenbauplaten, um {area} Wand- und Deckenfläche zu bedecken (einschließlich {waste}% Verschnitt)."
      },
      "infoCards": {
        "materials": {
          "title": "📦 Materialliste",
          "items": [
            {
              "label": "Trockenbauplaten",
              "valueKey": "sheetsNeeded"
            },
            {
              "label": "Trockenbau-Schrauben",
              "valueKey": "screws"
            },
            {
              "label": "Spachtelmasse",
              "valueKey": "jointCompound"
            },
            {
              "label": "Fugenband",
              "valueKey": "tape"
            }
          ]
        },
        "details": {
          "title": "📐 Flächenaufschlüsselung",
          "items": [
            {
              "label": "Gesamte Trockenbaufläche",
              "valueKey": "totalArea"
            },
            {
              "label": "Wandfläche (netto)",
              "valueKey": "netWallArea"
            },
            {
              "label": "Deckenfläche",
              "valueKey": "ceilingArea"
            },
            {
              "label": "Abgezogene Öffnungen",
              "valueKey": "openingsArea"
            }
          ]
        },
        "tips": {
          "title": "💡 Installationstipps",
          "items": [
            "Hängen Sie zuerst die Deckenplatten auf, dann die Wände — verwenden Sie einen Plattenheber für Decken",
            "Versetzen Sie die Fugen zwischen den Reihen, um die Wandfestigkeit zu erhöhen und Rissbildung zu reduzieren",
            "Drehen Sie Schrauben knapp unter die Papieroberfläche, ohne durchzubrechen",
            "Tragen Sie 3 Schichten Spachtelmasse auf: Grundierung, Füllschicht und Finishschicht"
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Was ist Trockenbau?",
          "content": "Trockenbau (auch Gipskarton, Gipsplatte oder Rigips genannt) ist ein Baumaterial aus Gipsspachtel (Kalziumsulfat-Dihydrat, CaSO₄·2H₂O), der zwischen zwei dicke Papierschichten gepresst wird. Es ist das häufigste Innenwind- und Deckenmaterial in Nordamerika und hat traditionelles Lattwerk und Putz seit den 1950er Jahren weitgehend ersetzt. Trockenbau kommt in standardmäßigen 4-Fuß-breiten Platten verschiedener Längen (8, 10 und 12 Fuß) und Dicken (¼\", ⅜\", ½\" und ⅝\"). Der Gipskern bietet Feuerwiderstand, da bei Hitzeeinwirkung die Wassermoleküle im Gips verdampfen und die Brandausbreitung verlangsamen. Spezialtypen umfassen feuchtigkeitsresistente (grüne Platte) für Badezimmer und Küchen, feuerfeste (Typ X) mit Glasfasern für Garagen und Trennwände sowie schalldichte Varianten mit dämpfenden Verbindungen zur Lärmreduzierung zwischen Räumen."
        },
        "howItWorks": {
          "title": "Wie der Trockenbau-Rechner funktioniert",
          "content": "Dieser Rechner schätzt Trockenbau-Materialien, indem er die gesamte Wandfläche (Umfang × Höhe) berechnet, optional die Deckenfläche (Länge × Breite) hinzufügt und dann Öffnungen für Türen und Fenster abzieht. Ein Verschnittfaktor (normalerweise 10-15%) wird hinzugefügt, um Schnitte um Steckdosen, Ecken und Anpassungen zu berücksichtigen. Die Gesamtfläche wird durch die gewählte Plattengröße geteilt, um die benötigten Platten zu bestimmen, wobei immer aufgerundet wird, da Teilplatten nicht gekauft werden können. Aus der Plattenzahl leitet der Rechner den Befestigungsbedarf (~32 Schrauben pro 4'×8' Platte), die Spachtelmasse-Menge (~1 Gallone pro 100 sq ft für 3 Schichten) und die Bandlänge basierend auf der linearen Fugenlänge ab. Die Kostenschätzung multipliziert die Plattenzahl mit Ihrem Preis pro Platte und fügt optionale Arbeitskosten hinzu, wodurch Sie ein vollständiges Projektbudget vor dem Baumarktbesuch erhalten."
        },
        "considerations": {
          "title": "Wichtige Überlegungen",
          "items": [
            {
              "text": "Standard ½\" Trockenbau ist für die meisten Wandanwendungen mit Ständern im Abstand von 16\" geeignet. Verwenden Sie ⅝\" für Decken, um Durchhängen zu verhindern und für feuerfeste Konstruktionen.",
              "type": "info"
            },
            {
              "text": "Feuchtigkeitsresistente (grüne Platte) ist NICHT wasserdicht — verwenden Sie sie nicht in direkten Nassbereichen wie Duschkabinen. Verwenden Sie dort stattdessen Zementplatten oder Kerdi-Membran.",
              "type": "warning"
            },
            {
              "text": "Feuerfester Typ X Trockenbau ist von den meisten Bauvorschriften für angebaute Garagen, Heizungsräume und gemeinsame Wände zwischen Einheiten in Mehrfamilienhäusern vorgeschrieben.",
              "type": "info"
            },
            {
              "text": "Bestellen Sie 10-15% zusätzliches Material. Komplexe Räume mit vielen Ecken, Steckdosen und Winkeln erzeugen mehr Verschnitt durch Schnitte.",
              "type": "info"
            },
            {
              "text": "Trockenbau sollte flach gelagert und trocken gehalten werden. Eine einzelne ½\" 4'×8' Platte wiegt etwa 23 kg — planen Sie Hilfe beim Heben und einen Plattenheber für Decken.",
              "type": "warning"
            },
            {
              "text": "Verwenden Sie grobe Trockenbau-Schrauben für Holzständer und feine für Metallständer. Schrauben alle 12\" an den Kanten und 16\" im Feld platzieren.",
              "type": "info"
            }
          ]
        },
        "categories": {
          "title": "Trockenbau-Arten & Verwendung",
          "items": [
            {
              "text": "Standard (Weiße Platte): Standard Gipsplatte für Innenwände und -decken in trockenen Bereichen. Wirtschaftlichste Option für Schlafzimmer, Wohnzimmer und Flure.",
              "type": "info"
            },
            {
              "text": "Feuchtigkeitsresistent (Grüne Platte): Enthält wasserabweisende Zusätze im Kern und Papier. Verwendet in Badezimmern, Küchen, Waschräumen — aber nicht in Duschkabinen.",
              "type": "info"
            },
            {
              "text": "Feuerfest (Typ X): Enthält Glasfasern für erhöhte Feuerbeständigkeit. ⅝\" Typ X bietet 1-Stunden-Feuerwiderstand. Erforderlich in Garagen und feuerfesten Konstruktionen.",
              "type": "info"
            },
            {
              "text": "Schalldicht (STC-bewertet): Verwendet viskoelastisches Polymer zwischen Gipsschichten zur Schalldämpfung. Ideal für Medienräume, Schlafzimmer neben lauten Bereichen und Heimbüros.",
              "type": "info"
            },
            {
              "text": "Flexibel (¼\" Biegbar): Dünner Gips, der für gebogene Wände und Bögen gebogen werden kann. Normalerweise doppelt für Festigkeit und erfordert Befeuchten oder Anritzen vor der Installation.",
              "type": "info"
            },
            {
              "text": "Beschädigungsresistent: Hochdichter Kern mit verstärkter Oberfläche für stark frequentierte Bereiche wie Flure, Schulen und Gewerbeflächen. Widersteht Dellen und Durchstößen.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Berechnungsbeispiele",
          "description": "Schritt-für-Schritt Trockenbau-Material Schätzung",
          "examples": [
            {
              "title": "Standard Schlafzimmer (12' × 12' × 8')",
              "steps": [
                "Umfang = 2 × (12 + 12) = 48 ft",
                "Brutto-Wandfläche = 48 × 8 = 384 sq ft",
                "Abziehen 1 Tür (6,67 × 3 = 20 sq ft) + 2 Fenster (2 × 3 × 4 = 24 sq ft) = 44 sq ft",
                "Netto-Wandfläche = 384 − 44 = 340 sq ft",
                "Deckenfläche = 12 × 12 = 144 sq ft",
                "Gesamt = 340 + 144 = 484 sq ft",
                "Mit 10% Verschnitt = 484 × 1,10 = 532,4 sq ft",
                "Platten (4'×8' = 32 sq ft je): ⌈532,4 ÷ 32⌉ = 17 Platten"
              ],
              "result": "17 Platten 4'×8' Trockenbau, ~544 Schrauben, ~6 Gal Spachtelmasse, ~2 Rollen Band"
            },
            {
              "title": "Garage (24' × 24' × 10') Feuerfest",
              "steps": [
                "Umfang = 2 × (24 + 24) = 96 ft",
                "Brutto-Wandfläche = 96 × 10 = 960 sq ft",
                "Abziehen 1 Tür (7 × 3 = 21 sq ft) = 21 sq ft",
                "Netto-Wandfläche = 960 − 21 = 939 sq ft",
                "Deckenfläche = 24 × 24 = 576 sq ft",
                "Gesamt = 939 + 576 = 1.515 sq ft",
                "Mit 12% Verschnitt = 1.515 × 1,12 = 1.696,8 sq ft",
                "Platten (4'×8' = 32 sq ft je): ⌈1696,8 ÷ 32⌉ = 54 Platten"
              ],
              "result": "54 Platten ⅝\" Typ X (4'×8'), ~1.728 Schrauben, ~17 Gal Spachtelmasse, ~5 Rollen Band"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Wie viele Trockenbauplaten brauche ich für einen 12×12 Raum?",
          "answer": "Ein 12' × 12' Raum mit 8-Fuß-Decken, 1 Tür und 2 Fenstern benötigt etwa 17 Platten Standard 4'×8' Trockenbau (einschließlich Decke und 10% Verschnitt). Ohne die Decke würden Sie etwa 12 Platten benötigen. Die genaue Anzahl hängt von Ihrem Verschnittfaktor, der Anzahl der Öffnungen und der gewählten Plattengröße ab."
        },
        {
          "question": "Welche Art von Trockenbau sollte ich in einem Badezimmer verwenden?",
          "answer": "Verwenden Sie feuchtigkeitsresistenten Trockenbau (grüne Platte) für Badezimmerwände und -decken, die nicht direkt im Dusch- oder Wannenbereich sind. Für Duschkabinen und Wanneneinfassungen verwenden Sie Zement-Trägerplatten (wie Durock oder HardieBacker) — grüne Platte ist wasserabweisend, aber NICHT wasserdicht und wird in direkten Nassbereichen versagen."
        },
        {
          "question": "Wie viele Trockenbau-Schrauben brauche ich pro Platte?",
          "answer": "Planen Sie etwa 32 Schrauben pro 4'×8' Platte (etwa 1 Schraube pro Quadratfuß). Schrauben sollten alle 12 Zoll entlang der Kanten und alle 16 Zoll im Feld (Mittelbereich) platziert werden. Für Decken benötigen Sie möglicherweise etwas mehr Schrauben — etwa 36 pro Platte — da sie gegen die Schwerkraft arbeiten."
        },
        {
          "question": "Was ist der Unterschied zwischen Typ X und normalem Trockenbau?",
          "answer": "Typ X (feuerfester) Trockenbau enthält Glasfasern in seinem Gipskern, die die Platte bei einem Brand länger zusammenhalten. Eine ⅝\" Typ X Platte bietet eine 1-Stunden-Feuerwiderstandsklasse, während normaler ½\" Trockenbau etwa 30 Minuten bietet. Bauvorschriften erfordern Typ X in angebauten Garagen, zwischen Wohneinheiten und in Heizungs-/Technikräumen."
        },
        {
          "question": "Wie viel Spachtelmasse und Band brauche ich?",
          "answer": "Planen Sie etwa 1 Gallone (3,78 L) vorgemischte Spachtelmasse pro 100 Quadratfuß Trockenbau für eine 3-Schicht-Verarbeitung (Band, Füll- und Glättschicht). Ein Standard 5-Gallonen-Eimer deckt etwa 460 sq ft ab. Für Band deckt eine 500-Fuß-Rolle etwa 460 sq ft installierten Trockenbau ab."
        },
        {
          "question": "Sollte ich Trockenbau vertikal oder horizontal aufhängen?",
          "answer": "Horizontal ist für die meisten Wohnwände bevorzugt, da es die Gesamtlänge der zu bandierenden Fugen reduziert und eine stärkere Wand schafft. Die lange horizontale Kante (verjüngt) schafft bündige Fugen, die leichter zu verspachteln sind. Vertikale Installation ist besser für Räume mit Decken über 9 Fuß oder für gewerbliche Anwendungen mit Metallständern."
        },
        {
          "question": "Wie viel kostet es, einen Raum zu verkleiden?",
          "answer": "Materialkosten liegen bei €0,32-€0,52 pro Quadratmeter für Standard-Trockenbau (etwa €10-€16 pro Platte). Professionelle Installation einschließlich Aufhängen, Bandieren und Verspachteln kostet €12-€24 pro Quadratmeter. Ein typisches 12×12 Schlafzimmer mit Decke kostet €280-€480 für Materialien und €600-€1.200 für professionelle Installation."
        },
        {
          "question": "Welche Dicke Trockenbau sollte ich verwenden?",
          "answer": "Verwenden Sie ½\" für Standardwände mit Ständern im 16\" Abstand (häufigste). Verwenden Sie ⅝\" für Decken (verhindert Durchhängen), feuerfeste Konstruktionen und Wände mit Ständern im 24\" Abstand. Verwenden Sie ¼\" für gebogene Wände und Reparaturen über bestehende Oberflächen. Verwenden Sie ⅜\" für kleinere Neuverkleidungen bestehender Wände."
        }
      ],
      "chart": {
        "title": "Material-Kostenaufschlüsselung",
        "xLabel": "Kategorie",
        "yLabel": "Kosten",
        "series": {
          "materialCost": "Materialien",
          "laborCost": "Arbeitslohn"
        }
      },
      "detailedTable": {
        "materialsList": {
          "button": "Vollständige Materialliste anzeigen",
          "title": "Komplette Material-Einkaufsliste",
          "columns": {
            "item": "Artikel",
            "quantity": "Menge",
            "unit": "Einheit",
            "notes": "Hinweise"
          }
        }
      },
      "buttons": {
        "calculate": "Berechnen",
        "reset": "Zurücksetzen",
        "pdf": "PDF",
        "csv": "CSV",
        "excel": "Excel",
        "save": "Speichern",
        "saved": "Gespeichert",
        "saving": "Speichern..."
      },
      "share": {
        "calculatedWith": "Berechnet mit Kalcufy.com"
      },
      "ui": {
        "results": "Ergebnisse",
        "yourInformation": "Ihre Informationen"
      },
      "accessibility": {
        "mobileResults": "Ergebniszusammenfassung",
        "closeModal": "Schließen",
        "openMenu": "Menü öffnen"
      },
      "rating": {
        "title": "Bewerten Sie diesen Rechner",
        "share": "Teilen",
        "copied": "Kopiert!",
        "copyLink": "Link kopieren",
        "clickToRate": "Klicken zum Bewerten",
        "youRated": "Sie haben bewertet",
        "stars": "Sterne",
        "averageFrom": "Durchschnitt von",
        "ratings": "Bewertungen"
      },
      "common": {
        "home": "Startseite",
        "calculators": "Rechner"
      },
      "sources": {
        "title": "Quellen und Referenzen"
      }
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
