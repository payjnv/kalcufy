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

/** Convert depth unit to feet */
function depthToFeet(value: number, unit: string): number {
  // depth is commonly entered in inches
  return toFeet(value, unit);
}

// ─── Material densities (lbs per cubic foot) ─────────────────────
const MATERIAL_DENSITY: Record<string, { density: number; label: string }> = {
  // Mulch types
  woodChips: { density: 15, label: "Wood Chips" },
  shreddedBark: { density: 20, label: "Shredded Bark" },
  hardwoodMulch: { density: 25, label: "Hardwood Mulch" },
  dyedMulch: { density: 22, label: "Dyed Mulch (Black/Brown/Red)" },
  rubberMulch: { density: 37, label: "Rubber Mulch" },
  straw: { density: 12, label: "Straw / Pine Needles" },
  // Gravel types
  peaGravel: { density: 96, label: "Pea Gravel" },
  crushedStone: { density: 100, label: "Crushed Stone (#57)" },
  riverRock: { density: 90, label: "River Rock" },
  limestone: { density: 95, label: "Limestone Gravel" },
  lavaRock: { density: 45, label: "Lava Rock" },
  marbleChips: { density: 95, label: "Marble Chips" },
  // Soil & Sand
  topsoil: { density: 75, label: "Topsoil" },
  compost: { density: 45, label: "Compost" },
  gardenSoil: { density: 80, label: "Garden Soil Mix" },
  sand: { density: 100, label: "Sand (Play/Masonry)" },
};

// ─── Recommended depth ranges (inches) ───────────────────────────
const DEPTH_GUIDE: Record<string, { min: number; max: number; typical: number }> = {
  woodChips: { min: 2, max: 4, typical: 3 },
  shreddedBark: { min: 2, max: 3, typical: 2 },
  hardwoodMulch: { min: 2, max: 3, typical: 3 },
  dyedMulch: { min: 2, max: 3, typical: 2 },
  rubberMulch: { min: 2, max: 3, typical: 2 },
  straw: { min: 2, max: 4, typical: 3 },
  peaGravel: { min: 2, max: 4, typical: 3 },
  crushedStone: { min: 2, max: 4, typical: 3 },
  riverRock: { min: 2, max: 4, typical: 3 },
  limestone: { min: 2, max: 4, typical: 3 },
  lavaRock: { min: 2, max: 4, typical: 3 },
  marbleChips: { min: 2, max: 4, typical: 2 },
  topsoil: { min: 3, max: 6, typical: 4 },
  compost: { min: 1, max: 3, typical: 2 },
  gardenSoil: { min: 3, max: 6, typical: 4 },
  sand: { min: 2, max: 4, typical: 3 },
};

// ─── Config ──────────────────────────────────────────────────────
export const mulchGravelCalculatorConfig: CalculatorConfigV4 = {
  id: "mulch-gravel",
  version: "4.0",
  category: "home",
  icon: "🪨",

  presets: [
    {
      id: "flowerBed",
      icon: "🌸",
      values: {
        materialCategory: "mulch",
        materialType: "hardwoodMulch",
        areaShape: "rectangle",
        length: 20,
        width: 4,
        diameter: null,
        triangleBase: null,
        triangleHeight: null,
        directArea: null,
        depth: 3,
        wasteFactor: 10,
        pricingMode: "bulk",
        bulkPrice: null,
        bagPrice: null,
        bagSize: 2,
        deliveryFee: null,
      },
    },
    {
      id: "treeMulching",
      icon: "🌳",
      values: {
        materialCategory: "mulch",
        materialType: "woodChips",
        areaShape: "circle",
        length: null,
        width: null,
        diameter: 6,
        triangleBase: null,
        triangleHeight: null,
        directArea: null,
        depth: 3,
        wasteFactor: 10,
        pricingMode: "bulk",
        bulkPrice: null,
        bagPrice: null,
        bagSize: 2,
        deliveryFee: null,
      },
    },
    {
      id: "gravelDriveway",
      icon: "🚗",
      values: {
        materialCategory: "gravel",
        materialType: "crushedStone",
        areaShape: "rectangle",
        length: 40,
        width: 12,
        diameter: null,
        triangleBase: null,
        triangleHeight: null,
        directArea: null,
        depth: 4,
        wasteFactor: 10,
        pricingMode: "bulk",
        bulkPrice: null,
        bagPrice: null,
        bagSize: 0.5,
        deliveryFee: null,
      },
    },
    {
      id: "gardenPath",
      icon: "🌿",
      values: {
        materialCategory: "gravel",
        materialType: "peaGravel",
        areaShape: "rectangle",
        length: 30,
        width: 3,
        diameter: null,
        triangleBase: null,
        triangleHeight: null,
        directArea: null,
        depth: 2,
        wasteFactor: 10,
        pricingMode: "bags",
        bulkPrice: null,
        bagPrice: null,
        bagSize: 0.5,
        deliveryFee: null,
      },
    },
    {
      id: "playArea",
      icon: "🧒",
      values: {
        materialCategory: "mulch",
        materialType: "rubberMulch",
        areaShape: "rectangle",
        length: 16,
        width: 12,
        diameter: null,
        triangleBase: null,
        triangleHeight: null,
        directArea: null,
        depth: 3,
        wasteFactor: 5,
        pricingMode: "bags",
        bulkPrice: null,
        bagPrice: null,
        bagSize: 0.8,
        deliveryFee: null,
      },
    },
    {
      id: "raisedBed",
      icon: "🥕",
      values: {
        materialCategory: "soil",
        materialType: "gardenSoil",
        areaShape: "rectangle",
        length: 8,
        width: 4,
        diameter: null,
        triangleBase: null,
        triangleHeight: null,
        directArea: null,
        depth: 6,
        wasteFactor: 10,
        pricingMode: "bulk",
        bulkPrice: null,
        bagPrice: null,
        bagSize: 1,
        deliveryFee: null,
      },
    },
  ],

  t: {
    en: {
      name: "Mulch & Gravel Calculator",
      slug: "mulch-gravel",
      subtitle:
        "Calculate how much mulch, gravel, stone, or soil you need in cubic yards and bags — with cost estimates.",
      breadcrumb: "Mulch & Gravel",

      seo: {
        title: "Mulch & Gravel Calculator - Free Landscape Material Estimator",
        description:
          "Calculate how much mulch, gravel, stone, topsoil, or sand you need. Get volume in cubic yards, bags count, weight, and total cost for any project.",
        shortDescription:
          "Estimate mulch, gravel, stone, and soil for landscaping projects.",
        keywords: [
          "mulch calculator",
          "gravel calculator",
          "cubic yard calculator",
          "how much mulch do I need",
          "landscape material calculator",
          "free mulch calculator",
          "stone calculator",
          "topsoil calculator",
        ],
      },

      calculator: { yourInformation: "Project Details" },
      ui: {
        yourInformation: "Project Details",
        calculate: "Calculate",
        reset: "Reset",
        results: "Results",
      },

      inputs: {
        materialCategory: {
          label: "Material Category",
          helpText: "Choose the type of landscaping material",
          options: {
            mulch: "Mulch",
            gravel: "Gravel & Stone",
            soil: "Soil & Sand",
          },
        },
        materialType: {
          label: "Material Type",
          helpText: "Specific material — affects weight and coverage calculations",
          options: {
            woodChips: "Wood Chips",
            shreddedBark: "Shredded Bark",
            hardwoodMulch: "Hardwood Mulch",
            dyedMulch: "Dyed Mulch (Black/Brown/Red)",
            rubberMulch: "Rubber Mulch",
            straw: "Straw / Pine Needles",
            peaGravel: "Pea Gravel",
            crushedStone: "Crushed Stone (#57)",
            riverRock: "River Rock",
            limestone: "Limestone Gravel",
            lavaRock: "Lava Rock",
            marbleChips: "Marble Chips",
            topsoil: "Topsoil",
            compost: "Compost",
            gardenSoil: "Garden Soil Mix",
            sand: "Sand (Play/Masonry)",
          },
        },
        areaShape: {
          label: "Area Shape",
          helpText: "Select the shape of the area you're covering",
          options: {
            rectangle: "Rectangle",
            circle: "Circle",
            triangle: "Triangle",
            directArea: "Known Area",
          },
        },
        length: {
          label: "Length",
          helpText: "Longest side of the rectangular area",
        },
        width: {
          label: "Width",
          helpText: "Shorter side of the rectangular area",
        },
        diameter: {
          label: "Diameter",
          helpText: "Diameter of the circular area (e.g., around a tree)",
        },
        triangleBase: {
          label: "Base",
          helpText: "Base length of the triangular area",
        },
        triangleHeight: {
          label: "Height",
          helpText: "Height of the triangular area (perpendicular to base)",
        },
        directArea: {
          label: "Area",
          helpText: "Enter the total area if you've already measured it",
        },
        depth: {
          label: "Depth",
          helpText: "Material thickness — typical: 2-3 in for mulch, 2-4 in for gravel, 3-6 in for soil",
        },
        wasteFactor: {
          label: "Waste / Settling Factor",
          helpText: "Extra material for settling and edges. 5-10% is typical",
        },
        pricingMode: {
          label: "Pricing Mode",
          helpText: "Choose how you're purchasing material",
          options: {
            bulk: "Bulk (per cubic yard)",
            bags: "Bags",
          },
        },
        bulkPrice: {
          label: "Price per Cubic Yard",
          helpText: "Bulk delivery: $25-50 for mulch, $30-60 for gravel, $25-45 for soil",
        },
        bagPrice: {
          label: "Price per Bag",
          helpText: "Store bag price — typically $3-7 per bag",
        },
        bagSize: {
          label: "Bag Size (cubic feet)",
          helpText: "Common sizes: 0.5 cu ft (stone), 1 cu ft, 2 cu ft (mulch), 3 cu ft",
          options: {
            "0.5": "0.5 cu ft",
            "1": "1 cu ft",
            "2": "2 cu ft (Standard Mulch)",
            "3": "3 cu ft (Large)",
          },
        },
        deliveryFee: {
          label: "Delivery Fee",
          helpText: "Optional bulk delivery charge (typically $50-150)",
        },
      },

      results: {
        cubicYards: { label: "Volume (Cubic Yards)" },
        cubicFeet: { label: "Volume (Cubic Feet)" },
        cubicMeters: { label: "Volume (Cubic Meters)" },
        weight: { label: "Estimated Weight" },
        bagsNeeded: { label: "Bags Needed" },
        area: { label: "Coverage Area" },
        materialCost: { label: "Material Cost" },
        deliveryCost: { label: "Delivery Fee" },
        totalCost: { label: "Total Cost" },
      },

      presets: {
        flowerBed: {
          label: "Flower Bed",
          description: "20' × 4' mulch bed, 3 inches deep",
        },
        treeMulching: {
          label: "Tree Ring",
          description: "6-ft circle around a tree, 3 inches deep",
        },
        gravelDriveway: {
          label: "Gravel Driveway",
          description: "40' × 12' crushed stone, 4 inches deep",
        },
        gardenPath: {
          label: "Garden Path",
          description: "30' × 3' pea gravel walkway, 2 inches deep",
        },
        playArea: {
          label: "Play Area",
          description: "16' × 12' rubber mulch, 3 inches deep",
        },
        raisedBed: {
          label: "Raised Garden Bed",
          description: "8' × 4' garden soil, 6 inches deep",
        },
      },

      values: {
        "cuYd": "cu yd",
        "cuFt": "cu ft",
        "cuM": "m³",
        "sqFt": "sq ft",
        "sqM": "m²",
        "tons": "tons",
        "ton": "ton",
        "lbs": "lbs",
        "kg": "kg",
        "bags": "bags",
        "bag": "bag",
        "in": "in",
        "ft": "ft",
      },

      formats: {
        summary:
          "You need {cubicYards} of {material} to cover {area} at {depth} deep (including {waste}% for waste/settling).",
      },

      infoCards: {
        volume: {
          title: "📦 Volume & Weight",
          items: [
            { label: "Cubic Yards", valueKey: "cubicYards" },
            { label: "Cubic Feet", valueKey: "cubicFeet" },
            { label: "Cubic Meters", valueKey: "cubicMeters" },
            { label: "Estimated Weight", valueKey: "weight" },
          ],
        },
        purchase: {
          title: "🛒 Purchase Guide",
          items: [
            { label: "Bags Needed", valueKey: "bagsNeeded" },
            { label: "Coverage Area", valueKey: "area" },
            { label: "Material Cost", valueKey: "materialCost" },
            { label: "Total Cost", valueKey: "totalCost" },
          ],
        },
        tips: {
          title: "💡 Application Tips",
          items: [
            "Lay landscape fabric underneath gravel or stone to prevent weed growth and mixing with soil",
            "For mulch, leave a 3-6 inch gap around tree trunks — piling mulch against bark causes rot (avoid 'mulch volcanoes')",
            "Order 5-10% extra to account for settling, spillage, and uneven ground",
            "1 cubic yard covers about 162 sq ft at 2\" deep, 108 sq ft at 3\", or 81 sq ft at 4\"",
          ],
        },
      },

      education: {
        whatIs: {
          title: "Mulch, Gravel & Landscaping Materials",
          content:
            "Mulch is any material spread over soil surface to retain moisture, suppress weeds, regulate temperature, and improve appearance. Organic mulches (wood chips, bark, straw) decompose over time, enriching the soil with nutrients. Inorganic mulches (gravel, rubber, stone) are permanent and require less maintenance. Gravel is a loose mixture of rock fragments formed by erosion or mechanical crushing, classified by size using standards like the Udden-Wentworth scale (2-64 mm). It is widely used for driveways, drainage, walkways, and decorative landscaping. Common types include pea gravel (small, rounded, inexpensive), crushed stone (angular, interlocking, ideal for bases), and river rock (smooth, decorative). Topsoil and compost are used to establish new garden beds, amend existing soil, and fill raised beds. The right material depends on your project goals: mulch for plant beds, gravel for hardscaping and drainage, and soil for growing.",
        },
        howItWorks: {
          title: "How This Calculator Works",
          content:
            "The calculator computes volume by first determining the coverage area based on your chosen shape (rectangle = length × width, circle = π × radius², triangle = ½ × base × height) or your directly entered area. It then multiplies area by depth to get cubic footage, converts to cubic yards (÷ 27), and applies your waste factor. Weight is estimated by multiplying volume by the material's density — mulch typically weighs 400-800 lbs per cubic yard while gravel weighs 2,400-2,700 lbs. Bag count divides total cubic feet by your chosen bag size and rounds up. Cost is calculated from either your bulk price per cubic yard or per-bag price, plus optional delivery. The calculator also provides metric equivalents (cubic meters, kilograms, square meters) for international users.",
        },
        considerations: {
          title: "Key Considerations",
          items: [
            {
              text: "Mulch should be 2-3 inches deep for garden beds and 3-4 inches for paths and slopes. Too thick (>4\") can suffocate roots and prevent water penetration.",
              type: "info",
            },
            {
              text: "Never pile mulch against tree trunks ('mulch volcanos'). Keep a 3-6 inch gap to prevent bark rot, disease, and pest habitat.",
              type: "warning",
            },
            {
              text: "Gravel for driveways should be 4 inches deep minimum with a compacted base layer. Use angular crushed stone (not rounded) so it interlocks and doesn't shift.",
              type: "info",
            },
            {
              text: "Organic mulch decomposes and needs replacing every 1-2 years. Inorganic materials (gravel, rubber) last much longer but don't improve soil.",
              type: "info",
            },
            {
              text: "Wet mulch and soil are significantly heavier than dry. A cubic yard of wet soil can weigh 3,000+ lbs. Plan transportation accordingly.",
              type: "warning",
            },
            {
              text: "Bulk delivery is typically 40-60% cheaper than buying bags for projects needing more than 3 cubic yards. Most suppliers deliver 1-15 yards per load.",
              type: "info",
            },
          ],
        },
        categories: {
          title: "Material Type Guide",
          items: [
            {
              text: "Hardwood Mulch: Most popular choice for flower beds and landscaping. Medium texture, stays in place well, decomposes slowly adding nutrients. Lasts 1-2 years.",
              type: "info",
            },
            {
              text: "Pea Gravel: Small, rounded, 3/8\" stones available in many colors. Affordable and versatile — great for walkways, patios, drainage, and dog runs. Shifts underfoot.",
              type: "info",
            },
            {
              text: "Crushed Stone (#57): Angular 3/4\"-1\" stones that interlock when compacted. Best for driveways, foundations, and drainage. Provides excellent stability.",
              type: "info",
            },
            {
              text: "River Rock: Smooth, rounded 1-3\" stones from riverbeds. Decorative accent for beds, water features, and dry creek beds. Won't decompose. Heavy — plan for delivery.",
              type: "info",
            },
            {
              text: "Rubber Mulch: Made from recycled tires. Doesn't decompose, suppresses weeds, and cushions falls. Ideal for playgrounds and high-traffic areas. Does not feed soil.",
              type: "info",
            },
            {
              text: "Topsoil & Compost: Rich organic material for new garden beds. Use 60% topsoil + 30% compost + 10% perlite for optimal plant growth. Apply 3-6 inches deep for new beds.",
              type: "info",
            },
          ],
        },
        examples: {
          title: "Calculation Examples",
          description: "Step-by-step material estimation",
          examples: [
            {
              title: "Flower Bed: 20' × 4', Hardwood Mulch, 3\" deep",
              steps: [
                "Area = 20 × 4 = 80 sq ft",
                "Depth = 3 inches = 0.25 ft",
                "Volume = 80 × 0.25 = 20 cu ft",
                "Cubic yards = 20 ÷ 27 = 0.74 cu yd",
                "Add 10% waste = 0.74 × 1.10 = 0.81 cu yd",
                "Weight = 0.81 × 25 lbs/ft³ × 27 = ~549 lbs",
                "Bags (2 cu ft) = ⌈22 ÷ 2⌉ = 11 bags",
              ],
              result:
                "0.81 cu yd ≈ 11 bags of 2 cu ft mulch, weighing about 549 lbs. At $35/yd: ~$28. At $5/bag: ~$55.",
            },
            {
              title: "Gravel Driveway: 40' × 12', Crushed Stone, 4\" deep",
              steps: [
                "Area = 40 × 12 = 480 sq ft",
                "Depth = 4 inches = 0.333 ft",
                "Volume = 480 × 0.333 = 160 cu ft",
                "Cubic yards = 160 ÷ 27 = 5.93 cu yd",
                "Add 10% waste = 5.93 × 1.10 = 6.52 cu yd",
                "Weight = 6.52 × 100 lbs/ft³ × 27 = ~17,604 lbs ≈ 8.8 tons",
                "This is a bulk delivery project (too heavy for bags)",
              ],
              result:
                "6.52 cu yd of crushed stone, weighing ~8.8 tons. At $45/yd: ~$293 + delivery. Order ~7 yards to be safe.",
            },
          ],
        },
      },

      faqs: [
        {
          question: "How many cubic yards of mulch do I need?",
          answer:
            "Measure your area's length and width in feet, multiply them together to get square footage, then multiply by depth in feet (3\" = 0.25 ft). Divide the result by 27 to get cubic yards. For example, a 20' × 10' bed at 3\" deep needs: (200 × 0.25) ÷ 27 = 1.85 cubic yards. Add 10% for waste, so order about 2 cubic yards.",
        },
        {
          question: "How much does a cubic yard of mulch or gravel weigh?",
          answer:
            "Mulch weighs 400-800 lbs per cubic yard depending on moisture and type (wood chips are lighter, hardwood is heavier). Gravel weighs 2,400-2,900 lbs (1.2-1.45 tons) per cubic yard. Topsoil weighs about 2,000-2,200 lbs per cubic yard. Always consider weight when planning transportation — a standard pickup truck can safely carry about 1 cubic yard of mulch but may be overloaded by 1 yard of gravel.",
        },
        {
          question: "How deep should I apply mulch?",
          answer:
            "Apply 2-3 inches for most garden beds with fine mulch, and 3-4 inches for coarser mulch, pathways, and slopes. Never exceed 4 inches around plants, as too-thick mulch prevents oxygen and water from reaching roots. For trees, spread mulch in a wide ring (3-6 ft diameter) but keep it 3-6 inches away from the trunk.",
        },
        {
          question: "Is it cheaper to buy mulch in bulk or bags?",
          answer:
            "Bulk is typically 40-60% cheaper per cubic yard. One cubic yard of mulch costs $25-50 in bulk vs. $56-94 in bags (14 bags at $4-7 each). However, bags are more convenient for small projects under 2-3 cubic yards, require no delivery fee ($50-150 for bulk), and can be transported in a car. The break-even point is usually around 3 cubic yards.",
        },
        {
          question: "How many bags of mulch are in a cubic yard?",
          answer:
            "One cubic yard equals 27 cubic feet. In standard 2 cu ft bags: 27 ÷ 2 = 13.5, so you need 14 bags per cubic yard. In 3 cu ft bags: 27 ÷ 3 = 9 bags per cubic yard. In 0.5 cu ft bags (common for gravel/stone): 27 ÷ 0.5 = 54 bags per cubic yard.",
        },
        {
          question: "What type of gravel is best for driveways?",
          answer:
            "Crushed stone (#57 or #411) is ideal for driveways because its angular shape interlocks when compacted, creating a stable surface. Use a 3-layer approach: base layer of large #3 stone (3-4\"), middle layer of #57 stone (1\"), and top layer of #411 or stone dust for a smooth finish. Total depth should be at least 4 inches. Avoid pea gravel for driveways — it's round and shifts under tires.",
        },
        {
          question: "How much area does one cubic yard of material cover?",
          answer:
            "Coverage depends on depth: at 1\" deep, 1 cubic yard covers 324 sq ft; at 2\" deep, 162 sq ft; at 3\" deep, 108 sq ft; at 4\" deep, 81 sq ft; at 6\" deep, 54 sq ft. The formula is: coverage (sq ft) = 324 ÷ depth (inches). This is useful for quick estimates when you know how many yards a supplier has available.",
        },
        {
          question: "Should I use landscape fabric under mulch or gravel?",
          answer:
            "Under gravel and stone — yes, always. Fabric prevents stones from sinking into soil and weeds from growing through. Under organic mulch — usually no. Fabric blocks the mulch from decomposing into the soil (which is a major benefit of organic mulch) and can create a mat where weeds actually root on top. Instead, use a thick layer of mulch (3-4\") to naturally suppress weeds in garden beds.",
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
        title: "Coverage at Different Depths",
        xLabel: "Depth",
        yLabel: "Area Covered (sq ft)",
        series: {
          coverage: "Coverage per Cubic Yard",
        },
      },

      detailedTable: {
        coverageChart: {
          button: "View Coverage & Bag Chart",
          title: "Coverage Reference Chart (per Cubic Yard)",
          columns: {
            depth: "Depth",
            coverage: "Area Covered",
            bags2: "Bags (2 cu ft)",
            bags3: "Bags (3 cu ft)",
            bags05: "Bags (0.5 cu ft)",
          },
        },
      },
    },
    es: {
      "name": "Calculadora de Mantillo y Grava",
      "slug": "calculadora-mantillo-grava",
      "subtitle": "Calcula cuánto mantillo, grava, piedra o tierra necesitas en yardas cúbicas y bolsas — con estimaciones de costos.",
      "breadcrumb": "Mantillo y Grava",
      "seo": {
        "title": "Calculadora de Mantillo y Grava - Estimador Gratuito de Materiales de Paisajismo",
        "description": "Calcula cuánto mantillo, grava, piedra, tierra vegetal o arena necesitas. Obtén volumen en yardas cúbicas, cantidad de bolsas, peso y costo total para cualquier proyecto.",
        "shortDescription": "Estima mantillo, grava, piedra y tierra para proyectos de paisajismo.",
        "keywords": [
          "calculadora de mantillo",
          "calculadora de grava",
          "calculadora de yardas cúbicas",
          "cuánto mantillo necesito",
          "calculadora de materiales de paisajismo",
          "calculadora de mantillo gratis",
          "calculadora de piedra",
          "calculadora de tierra vegetal"
        ]
      },
      "calculator": {
        "yourInformation": "Tu Información"
      },
      "inputs": {
        "materialCategory": {
          "label": "Categoría de Material",
          "helpText": "Elige el tipo de material de paisajismo",
          "options": {
            "mulch": "Mantillo",
            "gravel": "Grava y Piedra",
            "soil": "Tierra y Arena"
          }
        },
        "materialType": {
          "label": "Tipo de Material",
          "helpText": "Material específico — afecta los cálculos de peso y cobertura",
          "options": {
            "woodChips": "Virutas de Madera",
            "shreddedBark": "Corteza Triturada",
            "hardwoodMulch": "Mantillo de Madera Dura",
            "dyedMulch": "Mantillo Teñido (Negro/Marrón/Rojo)",
            "rubberMulch": "Mantillo de Caucho",
            "straw": "Paja / Agujas de Pino",
            "peaGravel": "Grava de Guisante",
            "crushedStone": "Piedra Triturada (#57)",
            "riverRock": "Piedra de Río",
            "limestone": "Grava de Piedra Caliza",
            "lavaRock": "Piedra de Lava",
            "marbleChips": "Chips de Mármol",
            "topsoil": "Tierra Vegetal",
            "compost": "Compost",
            "gardenSoil": "Mezcla de Tierra de Jardín",
            "sand": "Arena (Juego/Mampostería)"
          }
        },
        "areaShape": {
          "label": "Forma del Área",
          "helpText": "Selecciona la forma del área que vas a cubrir",
          "options": {
            "rectangle": "Rectángulo",
            "circle": "Círculo",
            "triangle": "Triángulo",
            "directArea": "Área Conocida"
          }
        },
        "length": {
          "label": "Longitud",
          "helpText": "Lado más largo del área rectangular"
        },
        "width": {
          "label": "Ancho",
          "helpText": "Lado más corto del área rectangular"
        },
        "diameter": {
          "label": "Diámetro",
          "helpText": "Diámetro del área circular (ej., alrededor de un árbol)"
        },
        "triangleBase": {
          "label": "Base",
          "helpText": "Longitud de la base del área triangular"
        },
        "triangleHeight": {
          "label": "Altura",
          "helpText": "Altura del área triangular (perpendicular a la base)"
        },
        "directArea": {
          "label": "Área",
          "helpText": "Ingresa el área total si ya la has medido"
        },
        "depth": {
          "label": "Profundidad",
          "helpText": "Grosor del material — típico: 2-3 pulgadas para mantillo, 2-4 pulgadas para grava, 3-6 pulgadas para tierra"
        },
        "wasteFactor": {
          "label": "Factor de Desperdicio / Asentamiento",
          "helpText": "Material extra para asentamiento y bordes. 5-10% es típico"
        },
        "pricingMode": {
          "label": "Modo de Precios",
          "helpText": "Elige cómo estás comprando el material",
          "options": {
            "bulk": "A Granel (por yarda cúbica)",
            "bags": "Bolsas"
          }
        },
        "bulkPrice": {
          "label": "Precio por Yarda Cúbica",
          "helpText": "Entrega a granel: $25-50 para mantillo, $30-60 para grava, $25-45 para tierra"
        },
        "bagPrice": {
          "label": "Precio por Bolsa",
          "helpText": "Precio de bolsa en tienda — típicamente $3-7 por bolsa"
        },
        "bagSize": {
          "label": "Tamaño de Bolsa (pies cúbicos)",
          "helpText": "Tamaños comunes: 0.5 pies³ (piedra), 1 pie³, 2 pies³ (mantillo), 3 pies³",
          "options": {
            "1": "1 pie³",
            "2": "2 pies³ (Mantillo Estándar)",
            "3": "3 pies³ (Grande)",
            "0.5": "0.5 pies³"
          }
        },
        "deliveryFee": {
          "label": "Tarifa de Entrega",
          "helpText": "Cargo opcional de entrega a granel (típicamente $50-150)"
        }
      },
      "results": {
        "cubicYards": {
          "label": "Volumen (Yardas Cúbicas)"
        },
        "cubicFeet": {
          "label": "Volumen (Pies Cúbicos)"
        },
        "cubicMeters": {
          "label": "Volumen (Metros Cúbicos)"
        },
        "weight": {
          "label": "Peso Estimado"
        },
        "bagsNeeded": {
          "label": "Bolsas Necesarias"
        },
        "area": {
          "label": "Área de Cobertura"
        },
        "materialCost": {
          "label": "Costo del Material"
        },
        "deliveryCost": {
          "label": "Tarifa de Entrega"
        },
        "totalCost": {
          "label": "Costo Total"
        }
      },
      "presets": {
        "flowerBed": {
          "label": "Lecho de Flores",
          "description": "Lecho de mantillo de 20' × 4', 3 pulgadas de profundidad"
        },
        "treeMulching": {
          "label": "Anillo de Árbol",
          "description": "Círculo de 6 pies alrededor de un árbol, 3 pulgadas de profundidad"
        },
        "gravelDriveway": {
          "label": "Entrada de Grava",
          "description": "Piedra triturada de 40' × 12', 4 pulgadas de profundidad"
        },
        "gardenPath": {
          "label": "Sendero de Jardín",
          "description": "Camino de grava de guisante de 30' × 3', 2 pulgadas de profundidad"
        },
        "playArea": {
          "label": "Área de Juego",
          "description": "Mantillo de caucho de 16' × 12', 3 pulgadas de profundidad"
        },
        "raisedBed": {
          "label": "Lecho Elevado de Jardín",
          "description": "Tierra de jardín de 8' × 4', 6 pulgadas de profundidad"
        }
      },
      "values": {
        "cuYd": "yd³",
        "cuFt": "pies³",
        "cuM": "m³",
        "sqFt": "pies²",
        "sqM": "m²",
        "tons": "toneladas",
        "ton": "tonelada",
        "lbs": "libras",
        "kg": "kg",
        "bags": "bolsas",
        "bag": "bolsa",
        "in": "pulg",
        "ft": "pies"
      },
      "formats": {
        "summary": "Necesitas {cubicYards} de {material} para cubrir {area} a {depth} de profundidad (incluyendo {waste}% para desperdicio/asentamiento)."
      },
      "infoCards": {
        "volume": {
          "title": "📦 Volumen y Peso",
          "items": [
            {
              "label": "Yardas Cúbicas",
              "valueKey": "cubicYards"
            },
            {
              "label": "Pies Cúbicos",
              "valueKey": "cubicFeet"
            },
            {
              "label": "Metros Cúbicos",
              "valueKey": "cubicMeters"
            },
            {
              "label": "Peso Estimado",
              "valueKey": "weight"
            }
          ]
        },
        "purchase": {
          "title": "🛒 Guía de Compra",
          "items": [
            {
              "label": "Bolsas Necesarias",
              "valueKey": "bagsNeeded"
            },
            {
              "label": "Área de Cobertura",
              "valueKey": "area"
            },
            {
              "label": "Costo del Material",
              "valueKey": "materialCost"
            },
            {
              "label": "Costo Total",
              "valueKey": "totalCost"
            }
          ]
        },
        "tips": {
          "title": "💡 Consejos de Aplicación",
          "items": [
            "Coloca tela de paisajismo debajo de grava o piedra para prevenir el crecimiento de malezas y la mezcla con tierra",
            "Para mantillo, deja un espacio de 3-6 pulgadas alrededor de los troncos de árboles — apilar mantillo contra la corteza causa pudrición (evita 'volcanes de mantillo')",
            "Ordena 5-10% extra para compensar el asentamiento, derrame y terreno irregular",
            "1 yarda cúbica cubre aproximadamente 162 pies² a 2\" de profundidad, 108 pies² a 3\", o 81 pies² a 4\""
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Mantillo, Grava y Materiales de Paisajismo",
          "content": "El mantillo es cualquier material esparcido sobre la superficie del suelo para retener humedad, suprimir malezas, regular temperatura y mejorar la apariencia. Los mantillos orgánicos (virutas de madera, corteza, paja) se descomponen con el tiempo, enriqueciendo el suelo con nutrientes. Los mantillos inorgánicos (grava, caucho, piedra) son permanentes y requieren menos mantenimiento. La grava es una mezcla suelta de fragmentos de roca formados por erosión o trituración mecánica, clasificada por tamaño usando estándares como la escala Udden-Wentworth (2-64 mm). Se usa ampliamente para entradas, drenaje, caminos y paisajismo decorativo. Los tipos comunes incluyen grava de guisante (pequeña, redondeada, económica), piedra triturada (angular, entrelazada, ideal para bases) y piedra de río (lisa, decorativa). La tierra vegetal y el compost se usan para establecer nuevos lechos de jardín, mejorar suelo existente y llenar lechos elevados. El material correcto depende de los objetivos de tu proyecto: mantillo para lechos de plantas, grava para paisajismo duro y drenaje, y tierra para cultivar."
        },
        "howItWorks": {
          "title": "Cómo Funciona Esta Calculadora",
          "content": "La calculadora calcula el volumen determinando primero el área de cobertura basada en la forma elegida (rectángulo = longitud × ancho, círculo = π × radio², triángulo = ½ × base × altura) o tu área ingresada directamente. Luego multiplica el área por la profundidad para obtener pies cúbicos, convierte a yardas cúbicas (÷ 27) y aplica tu factor de desperdicio. El peso se estima multiplicando el volumen por la densidad del material — el mantillo típicamente pesa 400-800 libras por yarda cúbica mientras que la grava pesa 2,400-2,700 libras. El conteo de bolsas divide los pies cúbicos totales por el tamaño de bolsa elegido y redondea hacia arriba. El costo se calcula desde tu precio a granel por yarda cúbica o precio por bolsa, más entrega opcional. La calculadora también proporciona equivalentes métricos (metros cúbicos, kilogramos, metros cuadrados) para usuarios internacionales."
        },
        "considerations": {
          "title": "Consideraciones Clave",
          "items": [
            {
              "text": "El mantillo debe aplicarse a 2-3 pulgadas de profundidad para lechos de jardín y 3-4 pulgadas para senderos y pendientes. Muy grueso (>4\") puede sofocar raíces y prevenir la penetración del agua.",
              "type": "info"
            },
            {
              "text": "Nunca apiles mantillo contra troncos de árboles ('volcanes de mantillo'). Mantén un espacio de 3-6 pulgadas para prevenir pudrición de corteza, enfermedad y hábitat de plagas.",
              "type": "warning"
            },
            {
              "text": "La grava para entradas debe tener mínimo 4 pulgadas de profundidad con una capa base compactada. Usa piedra triturada angular (no redondeada) para que se entrelace y no se desplace.",
              "type": "info"
            },
            {
              "text": "El mantillo orgánico se descompone y necesita reemplazarse cada 1-2 años. Los materiales inorgánicos (grava, caucho) duran mucho más pero no mejoran el suelo.",
              "type": "info"
            },
            {
              "text": "El mantillo y tierra húmedos son significativamente más pesados que secos. Una yarda cúbica de tierra húmeda puede pesar más de 3,000 libras. Planifica el transporte en consecuencia.",
              "type": "warning"
            },
            {
              "text": "La entrega a granel es típicamente 40-60% más barata que comprar bolsas para proyectos que necesitan más de 3 yardas cúbicas. La mayoría de proveedores entregan 1-15 yardas por carga.",
              "type": "info"
            }
          ]
        },
        "categories": {
          "title": "Guía de Tipos de Material",
          "items": [
            {
              "text": "Mantillo de Madera Dura: La opción más popular para lechos de flores y paisajismo. Textura media, se mantiene en su lugar bien, se descompone lentamente añadiendo nutrientes. Dura 1-2 años.",
              "type": "info"
            },
            {
              "text": "Grava de Guisante: Piedras pequeñas y redondeadas de 3/8\" disponibles en muchos colores. Económica y versátil — excelente para caminos, patios, drenaje y corrales de perros. Se desplaza bajo los pies.",
              "type": "info"
            },
            {
              "text": "Piedra Triturada (#57): Piedras angulares de 3/4\"-1\" que se entrelazan cuando se compactan. Mejor para entradas, cimientos y drenaje. Proporciona excelente estabilidad.",
              "type": "info"
            },
            {
              "text": "Piedra de Río: Piedras lisas y redondeadas de 1-3\" de lechos de ríos. Acento decorativo para lechos, características de agua y arroyos secos. No se descompone. Pesada — planifica la entrega.",
              "type": "info"
            },
            {
              "text": "Mantillo de Caucho: Hecho de neumáticos reciclados. No se descompone, suprime malezas y amortigua caídas. Ideal para patios de juego y áreas de alto tráfico. No alimenta el suelo.",
              "type": "info"
            },
            {
              "text": "Tierra Vegetal y Compost: Material orgánico rico para nuevos lechos de jardín. Usa 60% tierra vegetal + 30% compost + 10% perlita para crecimiento óptimo de plantas. Aplica 3-6 pulgadas de profundidad para lechos nuevos.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Ejemplos de Cálculo",
          "description": "Estimación de material paso a paso",
          "examples": [
            {
              "title": "Lecho de Flores: 20' × 4', Mantillo de Madera Dura, 3\" de profundidad",
              "steps": [
                "Área = 20 × 4 = 80 pies²",
                "Profundidad = 3 pulgadas = 0.25 pies",
                "Volumen = 80 × 0.25 = 20 pies³",
                "Yardas cúbicas = 20 ÷ 27 = 0.74 yd³",
                "Añadir 10% desperdicio = 0.74 × 1.10 = 0.81 yd³",
                "Peso = 0.81 × 25 lbs/pie³ × 27 = ~549 libras",
                "Bolsas (2 pies³) = ⌈22 ÷ 2⌉ = 11 bolsas"
              ],
              "result": "0.81 yd³ ≈ 11 bolsas de 2 pies³ de mantillo, pesando aproximadamente 549 libras. A $35/yd³: ~$28. A $5/bolsa: ~$55."
            },
            {
              "title": "Entrada de Grava: 40' × 12', Piedra Triturada, 4\" de profundidad",
              "steps": [
                "Área = 40 × 12 = 480 pies²",
                "Profundidad = 4 pulgadas = 0.333 pies",
                "Volumen = 480 × 0.333 = 160 pies³",
                "Yardas cúbicas = 160 ÷ 27 = 5.93 yd³",
                "Añadir 10% desperdicio = 5.93 × 1.10 = 6.52 yd³",
                "Peso = 6.52 × 100 lbs/pie³ × 27 = ~17,604 libras ≈ 8.8 toneladas",
                "Este es un proyecto de entrega a granel (demasiado pesado para bolsas)"
              ],
              "result": "6.52 yd³ de piedra triturada, pesando ~8.8 toneladas. A $45/yd³: ~$293 + entrega. Ordena ~7 yardas para estar seguro."
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "¿Cuántas yardas cúbicas de mantillo necesito?",
          "answer": "Mide la longitud y ancho de tu área en pies, multiplícalos para obtener pies cuadrados, luego multiplica por la profundidad en pies (3\" = 0.25 pies). Divide el resultado por 27 para obtener yardas cúbicas. Por ejemplo, un lecho de 20' × 10' a 3\" de profundidad necesita: (200 × 0.25) ÷ 27 = 1.85 yardas cúbicas. Añade 10% para desperdicio, así que ordena aproximadamente 2 yardas cúbicas."
        },
        {
          "question": "¿Cuánto pesa una yarda cúbica de mantillo o grava?",
          "answer": "El mantillo pesa 400-800 libras por yarda cúbica dependiendo de la humedad y tipo (las virutas de madera son más ligeras, la madera dura es más pesada). La grava pesa 2,400-2,900 libras (1.2-1.45 toneladas) por yarda cúbica. La tierra vegetal pesa aproximadamente 2,000-2,200 libras por yarda cúbica. Siempre considera el peso al planificar el transporte — una camioneta estándar puede transportar de forma segura aproximadamente 1 yarda cúbica de mantillo pero puede estar sobrecargada con 1 yarda de grava."
        },
        {
          "question": "¿Qué tan profundo debo aplicar el mantillo?",
          "answer": "Aplica 2-3 pulgadas para la mayoría de lechos de jardín con mantillo fino, y 3-4 pulgadas para mantillo más grueso, senderos y pendientes. Nunca excedas 4 pulgadas alrededor de plantas, ya que mantillo muy grueso previene que el oxígeno y agua lleguen a las raíces. Para árboles, esparce mantillo en un anillo amplio (3-6 pies de diámetro) pero manténlo a 3-6 pulgadas del tronco."
        },
        {
          "question": "¿Es más barato comprar mantillo a granel o en bolsas?",
          "answer": "A granel es típicamente 40-60% más barato por yarda cúbica. Una yarda cúbica de mantillo cuesta $25-50 a granel vs. $56-94 en bolsas (14 bolsas a $4-7 cada una). Sin embargo, las bolsas son más convenientes para proyectos pequeños menores de 2-3 yardas cúbicas, no requieren tarifa de entrega ($50-150 para granel) y pueden transportarse en un automóvil. El punto de equilibrio generalmente está alrededor de 3 yardas cúbicas."
        },
        {
          "question": "¿Cuántas bolsas de mantillo hay en una yarda cúbica?",
          "answer": "Una yarda cúbica equivale a 27 pies cúbicos. En bolsas estándar de 2 pies³: 27 ÷ 2 = 13.5, así que necesitas 14 bolsas por yarda cúbica. En bolsas de 3 pies³: 27 ÷ 3 = 9 bolsas por yarda cúbica. En bolsas de 0.5 pies³ (común para grava/piedra): 27 ÷ 0.5 = 54 bolsas por yarda cúbica."
        },
        {
          "question": "¿Qué tipo de grava es mejor para entradas?",
          "answer": "La piedra triturada (#57 o #411) es ideal para entradas porque su forma angular se entrelaza cuando se compacta, creando una superficie estable. Usa un enfoque de 3 capas: capa base de piedra grande #3 (3-4\"), capa media de piedra #57 (1\"), y capa superior de #411 o polvo de piedra para un acabado suave. La profundidad total debe ser al menos 4 pulgadas. Evita grava de guisante para entradas — es redonda y se desplaza bajo las llantas."
        },
        {
          "question": "¿Cuánta área cubre una yarda cúbica de material?",
          "answer": "La cobertura depende de la profundidad: a 1\" de profundidad, 1 yarda cúbica cubre 324 pies²; a 2\" de profundidad, 162 pies²; a 3\" de profundidad, 108 pies²; a 4\" de profundidad, 81 pies²; a 6\" de profundidad, 54 pies². La fórmula es: cobertura (pies²) = 324 ÷ profundidad (pulgadas). Esto es útil para estimaciones rápidas cuando sabes cuántas yardas tiene disponible un proveedor."
        },
        {
          "question": "¿Debo usar tela de paisajismo bajo mantillo o grava?",
          "answer": "Bajo grava y piedra — sí, siempre. La tela previene que las piedras se hundan en la tierra y que las malezas crezcan. Bajo mantillo orgánico — generalmente no. La tela bloquea que el mantillo se descomponga en el suelo (que es un beneficio mayor del mantillo orgánico) y puede crear una alfombra donde las malezas realmente echan raíces encima. En su lugar, usa una capa gruesa de mantillo (3-4\") para suprimir naturalmente las malezas en lechos de jardín."
        }
      ],
      "chart": {
        "title": "Cobertura a Diferentes Profundidades",
        "xLabel": "Profundidad",
        "yLabel": "Área Cubierta (pies²)",
        "series": {
          "coverage": "Cobertura por Yarda Cúbica"
        }
      },
      "detailedTable": {
        "coverageChart": {
          "button": "Ver Gráfico de Cobertura y Bolsas",
          "title": "Gráfico de Referencia de Cobertura (por Yarda Cúbica)",
          "columns": {
            "depth": "Profundidad",
            "coverage": "Área Cubierta",
            "bags2": "Bolsas (2 pies³)",
            "bags3": "Bolsas (3 pies³)",
            "bags05": "Bolsas (0.5 pies³)"
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
      "name": "Calculadora de Cobertura Morta e Cascalho",
      "slug": "calculadora-cobertura-morta-cascalho",
      "subtitle": "Calcule quanto de cobertura morta, cascalho, pedra ou solo você precisa em metros cúbicos e sacos — com estimativas de custo.",
      "breadcrumb": "Cobertura Morta e Cascalho",
      "seo": {
        "title": "Calculadora de Cobertura Morta e Cascalho - Estimador Gratuito de Materiais de Paisagismo",
        "description": "Calcule quanto de cobertura morta, cascalho, pedra, terra vegetal ou areia você precisa. Obtenha volume em metros cúbicos, quantidade de sacos, peso e custo total para qualquer projeto.",
        "shortDescription": "Estime cobertura morta, cascalho, pedra e solo para projetos de paisagismo.",
        "keywords": [
          "calculadora cobertura morta",
          "calculadora cascalho",
          "calculadora metro cúbico",
          "quanto de cobertura morta preciso",
          "calculadora material paisagismo",
          "calculadora cobertura morta gratuita",
          "calculadora pedra",
          "calculadora terra vegetal"
        ]
      },
      "calculator": {
        "yourInformation": "Suas Informações"
      },
      "inputs": {
        "materialCategory": {
          "label": "Categoria do Material",
          "helpText": "Escolha o tipo de material para paisagismo",
          "options": {
            "mulch": "Cobertura Morta",
            "gravel": "Cascalho e Pedra",
            "soil": "Solo e Areia"
          }
        },
        "materialType": {
          "label": "Tipo de Material",
          "helpText": "Material específico — afeta os cálculos de peso e cobertura",
          "options": {
            "woodChips": "Lascas de Madeira",
            "shreddedBark": "Casca Triturada",
            "hardwoodMulch": "Cobertura Morta de Madeira Dura",
            "dyedMulch": "Cobertura Morta Tingida (Preta/Marrom/Vermelha)",
            "rubberMulch": "Cobertura Morta de Borracha",
            "straw": "Palha / Agulhas de Pinheiro",
            "peaGravel": "Cascalho Miúdo",
            "crushedStone": "Pedra Britada (#57)",
            "riverRock": "Pedra de Rio",
            "limestone": "Cascalho Calcário",
            "lavaRock": "Pedra Vulcânica",
            "marbleChips": "Lascas de Mármore",
            "topsoil": "Terra Vegetal",
            "compost": "Composto",
            "gardenSoil": "Mistura de Solo para Jardim",
            "sand": "Areia (Recreação/Construção)"
          }
        },
        "areaShape": {
          "label": "Formato da Área",
          "helpText": "Selecione o formato da área que você está cobrindo",
          "options": {
            "rectangle": "Retângulo",
            "circle": "Círculo",
            "triangle": "Triângulo",
            "directArea": "Área Conhecida"
          }
        },
        "length": {
          "label": "Comprimento",
          "helpText": "Lado mais longo da área retangular"
        },
        "width": {
          "label": "Largura",
          "helpText": "Lado mais curto da área retangular"
        },
        "diameter": {
          "label": "Diâmetro",
          "helpText": "Diâmetro da área circular (ex: ao redor de uma árvore)"
        },
        "triangleBase": {
          "label": "Base",
          "helpText": "Comprimento da base da área triangular"
        },
        "triangleHeight": {
          "label": "Altura",
          "helpText": "Altura da área triangular (perpendicular à base)"
        },
        "directArea": {
          "label": "Área",
          "helpText": "Digite a área total se você já a mediu"
        },
        "depth": {
          "label": "Profundidade",
          "helpText": "Espessura do material — típico: 5-7 cm para cobertura morta, 5-10 cm para cascalho, 7-15 cm para solo"
        },
        "wasteFactor": {
          "label": "Fator de Desperdício / Assentamento",
          "helpText": "Material extra para assentamento e bordas. 5-10% é típico"
        },
        "pricingMode": {
          "label": "Modo de Preço",
          "helpText": "Escolha como você está comprando o material",
          "options": {
            "bulk": "A Granel (por metro cúbico)",
            "bags": "Sacos"
          }
        },
        "bulkPrice": {
          "label": "Preço por Metro Cúbico",
          "helpText": "Entrega a granel: R$40-80 para cobertura morta, R$50-100 para cascalho, R$40-75 para solo"
        },
        "bagPrice": {
          "label": "Preço por Saco",
          "helpText": "Preço do saco na loja — tipicamente R$15-35 por saco"
        },
        "bagSize": {
          "label": "Tamanho do Saco (metros cúbicos)",
          "helpText": "Tamanhos comuns: 0,014 m³ (pedra), 0,028 m³, 0,057 m³ (cobertura morta), 0,085 m³",
          "options": {
            "0.014": "0,014 m³",
            "0.028": "0,028 m³",
            "0.057": "0,057 m³ (Cobertura Morta Padrão)",
            "0.085": "0,085 m³ (Grande)"
          }
        },
        "deliveryFee": {
          "label": "Taxa de Entrega",
          "helpText": "Taxa opcional de entrega a granel (tipicamente R$100-300)"
        }
      },
      "results": {
        "cubicYards": {
          "label": "Volume (Metros Cúbicos)"
        },
        "cubicFeet": {
          "label": "Volume (Pés Cúbicos)"
        },
        "cubicMeters": {
          "label": "Volume (Metros Cúbicos)"
        },
        "weight": {
          "label": "Peso Estimado"
        },
        "bagsNeeded": {
          "label": "Sacos Necessários"
        },
        "area": {
          "label": "Área de Cobertura"
        },
        "materialCost": {
          "label": "Custo do Material"
        },
        "deliveryCost": {
          "label": "Taxa de Entrega"
        },
        "totalCost": {
          "label": "Custo Total"
        }
      },
      "presets": {
        "flowerBed": {
          "label": "Canteiro de Flores",
          "description": "Canteiro de cobertura morta 6m × 1,2m, 7 cm de profundidade"
        },
        "treeMulching": {
          "label": "Anel da Árvore",
          "description": "Círculo de 1,8m ao redor de uma árvore, 7 cm de profundidade"
        },
        "gravelDriveway": {
          "label": "Entrada de Cascalho",
          "description": "Pedra britada 12m × 3,6m, 10 cm de profundidade"
        },
        "gardenPath": {
          "label": "Caminho do Jardim",
          "description": "Caminhada de cascalho miúdo 9m × 0,9m, 5 cm de profundidade"
        },
        "playArea": {
          "label": "Área de Recreação",
          "description": "Cobertura morta de borracha 4,8m × 3,6m, 7 cm de profundidade"
        },
        "raisedBed": {
          "label": "Canteiro Elevado",
          "description": "Solo para jardim 2,4m × 1,2m, 15 cm de profundidade"
        }
      },
      "values": {
        "cuYd": "m³",
        "cuFt": "pé³",
        "cuM": "m³",
        "sqFt": "m²",
        "sqM": "m²",
        "tons": "toneladas",
        "ton": "tonelada",
        "lbs": "kg",
        "kg": "kg",
        "bags": "sacos",
        "bag": "saco",
        "in": "cm",
        "ft": "m"
      },
      "formats": {
        "summary": "Você precisa de {cubicYards} de {material} para cobrir {area} com {depth} de profundidade (incluindo {waste}% para desperdício/assentamento)."
      },
      "infoCards": {
        "volume": {
          "title": "📦 Volume e Peso",
          "items": [
            {
              "label": "Metros Cúbicos",
              "valueKey": "cubicYards"
            },
            {
              "label": "Pés Cúbicos",
              "valueKey": "cubicFeet"
            },
            {
              "label": "Metros Cúbicos",
              "valueKey": "cubicMeters"
            },
            {
              "label": "Peso Estimado",
              "valueKey": "weight"
            }
          ]
        },
        "purchase": {
          "title": "🛒 Guia de Compra",
          "items": [
            {
              "label": "Sacos Necessários",
              "valueKey": "bagsNeeded"
            },
            {
              "label": "Área de Cobertura",
              "valueKey": "area"
            },
            {
              "label": "Custo do Material",
              "valueKey": "materialCost"
            },
            {
              "label": "Custo Total",
              "valueKey": "totalCost"
            }
          ]
        },
        "tips": {
          "title": "💡 Dicas de Aplicação",
          "items": [
            "Coloque manta de jardim embaixo de cascalho ou pedra para prevenir crescimento de ervas daninhas e mistura com o solo",
            "Para cobertura morta, deixe uma lacuna de 7-15 cm ao redor dos troncos das árvores — empilhar cobertura morta contra a casca causa apodrecimento (evite 'vulcões de cobertura morta')",
            "Peça 5-10% extra para considerar assentamento, derramamento e terreno irregular",
            "1 metro cúbico cobre cerca de 20 m² a 5 cm de profundidade, 13 m² a 7 cm, ou 10 m² a 10 cm"
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Cobertura Morta, Cascalho e Materiais de Paisagismo",
          "content": "Cobertura morta é qualquer material espalhado sobre a superfície do solo para reter umidade, suprimir ervas daninhas, regular temperatura e melhorar a aparência. Coberturas mortas orgânicas (lascas de madeira, casca, palha) se decompõem ao longo do tempo, enriquecendo o solo com nutrientes. Coberturas mortas inorgânicas (cascalho, borracha, pedra) são permanentes e requerem menos manutenção. Cascalho é uma mistura solta de fragmentos de rocha formados por erosão ou trituração mecânica, classificados por tamanho. É amplamente usado para entradas, drenagem, caminhos e paisagismo decorativo. Tipos comuns incluem cascalho miúdo (pequeno, arredondado, econômico), pedra britada (angular, entrelaçada, ideal para bases) e pedra de rio (lisa, decorativa). Terra vegetal e composto são usados para estabelecer novos canteiros, melhorar solo existente e preencher canteiros elevados."
        },
        "howItWorks": {
          "title": "Como Esta Calculadora Funciona",
          "content": "A calculadora computa volume primeiro determinando a área de cobertura baseada no formato escolhido (retângulo = comprimento × largura, círculo = π × raio², triângulo = ½ × base × altura) ou sua área diretamente inserida. Ela então multiplica área por profundidade para obter metragem cúbica e aplica seu fator de desperdício. Peso é estimado multiplicando volume pela densidade do material — cobertura morta tipicamente pesa 200-400 kg por metro cúbico enquanto cascalho pesa 1.200-1.350 kg. Contagem de sacos divide metros cúbicos totais pelo tamanho do saco escolhido e arredonda para cima. Custo é calculado do seu preço a granel por metro cúbico ou preço por saco, mais entrega opcional."
        },
        "considerations": {
          "title": "Considerações Importantes",
          "items": [
            {
              "text": "Cobertura morta deve ter 5-7 cm de profundidade para canteiros e 7-10 cm para caminhos e declives. Muito espessa (>10 cm) pode sufocar raízes e impedir penetração da água.",
              "type": "info"
            },
            {
              "text": "Nunca empilhe cobertura morta contra troncos de árvores ('vulcões de cobertura morta'). Mantenha uma lacuna de 7-15 cm para prevenir apodrecimento da casca, doenças e habitat de pragas.",
              "type": "warning"
            },
            {
              "text": "Cascalho para entradas deve ter pelo menos 10 cm de profundidade com uma camada de base compactada. Use pedra britada angular (não arredondada) para que se entrelace e não desloque.",
              "type": "info"
            },
            {
              "text": "Cobertura morta orgânica se decompõe e precisa ser substituída a cada 1-2 anos. Materiais inorgânicos (cascalho, borracha) duram muito mais mas não melhoram o solo.",
              "type": "info"
            },
            {
              "text": "Cobertura morta e solo molhados são significativamente mais pesados que secos. Um metro cúbico de solo molhado pode pesar mais de 1.500 kg. Planeje o transporte adequadamente.",
              "type": "warning"
            },
            {
              "text": "Entrega a granel é tipicamente 40-60% mais barata que comprar sacos para projetos que necessitam mais de 3 metros cúbicos. A maioria dos fornecedores entrega 1-15 metros cúbicos por carga.",
              "type": "info"
            }
          ]
        },
        "categories": {
          "title": "Guia de Tipos de Material",
          "items": [
            {
              "text": "Cobertura Morta de Madeira Dura: Escolha mais popular para canteiros de flores e paisagismo. Textura média, permanece no lugar bem, decompõe lentamente adicionando nutrientes. Dura 1-2 anos.",
              "type": "info"
            },
            {
              "text": "Cascalho Miúdo: Pedras pequenas e arredondadas de 1 cm disponíveis em muitas cores. Acessível e versátil — ótimo para caminhos, pátios, drenagem e canis. Desloca sob os pés.",
              "type": "info"
            },
            {
              "text": "Pedra Britada (#57): Pedras angulares de 2-2,5 cm que se entrelaçam quando compactadas. Melhor para entradas, fundações e drenagem. Fornece excelente estabilidade.",
              "type": "info"
            },
            {
              "text": "Pedra de Rio: Pedras lisas e arredondadas de 2,5-7,5 cm de leitos de rios. Acentuação decorativa para canteiros, fontes e riachos secos. Não se decompõe. Pesada — planeje a entrega.",
              "type": "info"
            },
            {
              "text": "Cobertura Morta de Borracha: Feita de pneus reciclados. Não se decompõe, suprime ervas daninhas e amortece quedas. Ideal para playgrounds e áreas de alto tráfego. Não alimenta o solo.",
              "type": "info"
            },
            {
              "text": "Terra Vegetal e Composto: Material orgânico rico para novos canteiros. Use 60% terra vegetal + 30% composto + 10% perlita para crescimento ótimo das plantas. Aplique 7-15 cm de profundidade para novos canteiros.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemplos de Cálculo",
          "description": "Estimativa de materiais passo a passo",
          "examples": [
            {
              "title": "Canteiro de Flores: 6m × 1,2m, Cobertura Morta de Madeira Dura, 7 cm de profundidade",
              "steps": [
                "Área = 6 × 1,2 = 7,2 m²",
                "Profundidade = 7 cm = 0,07 m",
                "Volume = 7,2 × 0,07 = 0,504 m³",
                "Adicionar 10% desperdício = 0,504 × 1,10 = 0,55 m³",
                "Peso = 0,55 × 300 kg/m³ = ~165 kg",
                "Sacos (0,057 m³) = ⌈0,55 ÷ 0,057⌉ = 10 sacos"
              ],
              "result": "0,55 m³ ≈ 10 sacos de 0,057 m³ de cobertura morta, pesando cerca de 165 kg. A R$60/m³: ~R$33. A R$25/saco: ~R$250."
            },
            {
              "title": "Entrada de Cascalho: 12m × 3,6m, Pedra Britada, 10 cm de profundidade",
              "steps": [
                "Área = 12 × 3,6 = 43,2 m²",
                "Profundidade = 10 cm = 0,10 m",
                "Volume = 43,2 × 0,10 = 4,32 m³",
                "Adicionar 10% desperdício = 4,32 × 1,10 = 4,75 m³",
                "Peso = 4,75 × 1.300 kg/m³ = ~6.175 kg ≈ 6,2 toneladas",
                "Este é um projeto de entrega a granel (muito pesado para sacos)"
              ],
              "result": "4,75 m³ de pedra britada, pesando ~6,2 toneladas. A R$75/m³: ~R$356 + entrega. Peça ~5 m³ para garantir."
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Quantos metros cúbicos de cobertura morta eu preciso?",
          "answer": "Meça o comprimento e largura da sua área em metros, multiplique-os para obter metros quadrados, depois multiplique pela profundidade em metros (7 cm = 0,07 m). Por exemplo, um canteiro de 6m × 3m a 7 cm de profundidade precisa: 18 × 0,07 = 1,26 metros cúbicos. Adicione 10% para desperdício, então peça cerca de 1,4 metros cúbicos."
        },
        {
          "question": "Quanto pesa um metro cúbico de cobertura morta ou cascalho?",
          "answer": "Cobertura morta pesa 200-400 kg por metro cúbico dependendo da umidade e tipo (lascas de madeira são mais leves, madeira dura é mais pesada). Cascalho pesa 1.200-1.450 kg por metro cúbico. Terra vegetal pesa cerca de 1.000-1.100 kg por metro cúbico. Sempre considere o peso ao planejar transporte — uma caminhonete padrão pode transportar com segurança cerca de 1 metro cúbico de cobertura morta mas pode ficar sobrecarregada com 1 metro cúbico de cascalho."
        },
        {
          "question": "Qual profundidade devo aplicar cobertura morta?",
          "answer": "Aplique 5-7 cm para a maioria dos canteiros com cobertura morta fina, e 7-10 cm para cobertura morta mais grossa, caminhos e declives. Nunca exceda 10 cm ao redor de plantas, pois cobertura morta muito espessa impede oxigênio e água de chegarem às raízes. Para árvores, espalhe cobertura morta em um anel amplo (0,9-1,8 m de diâmetro) mas mantenha 7-15 cm de distância do tronco."
        },
        {
          "question": "É mais barato comprar cobertura morta a granel ou em sacos?",
          "answer": "A granel é tipicamente 40-60% mais barato por metro cúbico. Um metro cúbico de cobertura morta custa R$40-80 a granel vs. R$280-470 em sacos (18 sacos a R$15-25 cada). Porém, sacos são mais convenientes para projetos pequenos de menos de 2-3 metros cúbicos, não requerem taxa de entrega (R$100-300 para granel), e podem ser transportados em um carro. O ponto de equilíbrio é geralmente em torno de 3 metros cúbicos."
        },
        {
          "question": "Quantos sacos de cobertura morta tem em um metro cúbico?",
          "answer": "Em sacos padrão de 0,057 m³: 1 ÷ 0,057 = 18 sacos por metro cúbico. Em sacos de 0,085 m³: 1 ÷ 0,085 = 12 sacos por metro cúbico. Em sacos de 0,014 m³ (comum para cascalho/pedra): 1 ÷ 0,014 = 71 sacos por metro cúbico."
        },
        {
          "question": "Que tipo de cascalho é melhor para entradas?",
          "answer": "Pedra britada é ideal para entradas porque sua forma angular se entrelace quando compactada, criando uma superfície estável. Use uma abordagem de 3 camadas: camada base de pedra grande (7-10 cm), camada média de pedra britada (2,5 cm), e camada superior de pó de pedra para um acabamento liso. Profundidade total deve ser pelo menos 10 cm. Evite cascalho miúdo para entradas — é arredondado e desloca sob os pneus."
        },
        {
          "question": "Quanta área um metro cúbico de material cobre?",
          "answer": "Cobertura depende da profundidade: a 2,5 cm de profundidade, 1 metro cúbico cobre 40 m²; a 5 cm, 20 m²; a 7 cm, 14 m²; a 10 cm, 10 m²; a 15 cm, 7 m². A fórmula é: cobertura (m²) = 1 ÷ profundidade (metros). Isto é útil para estimativas rápidas quando você sabe quantos metros cúbicos um fornecedor tem disponível."
        },
        {
          "question": "Devo usar manta de jardim embaixo de cobertura morta ou cascalho?",
          "answer": "Embaixo de cascalho e pedra — sim, sempre. Manta impede que pedras afundem no solo e ervas daninhas cresçam através. Embaixo de cobertura morta orgânica — geralmente não. Manta bloqueia a cobertura morta de se decompor no solo (que é um grande benefício da cobertura morta orgânica) e pode criar uma camada onde ervas daninhas na verdade criam raízes em cima. Em vez disso, use uma camada espessa de cobertura morta (7-10 cm) para naturalmente suprimir ervas daninhas em canteiros."
        }
      ],
      "chart": {
        "title": "Cobertura em Diferentes Profundidades",
        "xLabel": "Profundidade",
        "yLabel": "Área Coberta (m²)",
        "series": {
          "coverage": "Cobertura por Metro Cúbico"
        }
      },
      "detailedTable": {
        "coverageChart": {
          "button": "Ver Tabela de Cobertura e Sacos",
          "title": "Tabela de Referência de Cobertura (por Metro Cúbico)",
          "columns": {
            "depth": "Profundidade",
            "coverage": "Área Coberta",
            "bags2": "Sacos (0,057 m³)",
            "bags3": "Sacos (0,085 m³)",
            "bags05": "Sacos (0,014 m³)"
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
      "name": "Calculateur de Paillis et Gravier",
      "slug": "calculateur-paillis-gravier",
      "subtitle": "Calculez la quantité de paillis, gravier, pierre ou terre dont vous avez besoin en verges cubes et sacs — avec estimations des coûts.",
      "breadcrumb": "Paillis et Gravier",
      "seo": {
        "title": "Calculateur de Paillis et Gravier - Estimateur Gratuit de Matériaux d'Aménagement",
        "description": "Calculez la quantité de paillis, gravier, pierre, terre végétale ou sable nécessaire. Obtenez le volume en verges cubes, nombre de sacs, poids et coût total pour tout projet.",
        "shortDescription": "Estimez paillis, gravier, pierre et terre pour projets d'aménagement paysager.",
        "keywords": [
          "calculateur paillis",
          "calculateur gravier",
          "calculateur verge cube",
          "combien de paillis ai-je besoin",
          "calculateur matériaux aménagement",
          "calculateur paillis gratuit",
          "calculateur pierre",
          "calculateur terre végétale"
        ]
      },
      "inputs": {
        "materialCategory": {
          "label": "Catégorie de Matériau",
          "helpText": "Choisissez le type de matériau d'aménagement paysager",
          "options": {
            "mulch": "Paillis",
            "gravel": "Gravier et Pierre",
            "soil": "Terre et Sable"
          }
        },
        "materialType": {
          "label": "Type de Matériau",
          "helpText": "Matériau spécifique — affecte les calculs de poids et de couverture",
          "options": {
            "woodChips": "Copeaux de Bois",
            "shreddedBark": "Écorce Déchiquetée",
            "hardwoodMulch": "Paillis de Feuillus",
            "dyedMulch": "Paillis Teinté (Noir/Brun/Rouge)",
            "rubberMulch": "Paillis de Caoutchouc",
            "straw": "Paille / Aiguilles de Pin",
            "peaGravel": "Gravier Fin",
            "crushedStone": "Pierre Concassée (#57)",
            "riverRock": "Galet de Rivière",
            "limestone": "Gravier Calcaire",
            "lavaRock": "Pierre de Lave",
            "marbleChips": "Éclats de Marbre",
            "topsoil": "Terre Végétale",
            "compost": "Compost",
            "gardenSoil": "Mélange Terre de Jardin",
            "sand": "Sable (Jeu/Maçonnerie)"
          }
        },
        "areaShape": {
          "label": "Forme de la Zone",
          "helpText": "Sélectionnez la forme de la zone à couvrir",
          "options": {
            "rectangle": "Rectangle",
            "circle": "Cercle",
            "triangle": "Triangle",
            "directArea": "Surface Connue"
          }
        },
        "length": {
          "label": "Longueur",
          "helpText": "Côté le plus long de la zone rectangulaire"
        },
        "width": {
          "label": "Largeur",
          "helpText": "Côté le plus court de la zone rectangulaire"
        },
        "diameter": {
          "label": "Diamètre",
          "helpText": "Diamètre de la zone circulaire (ex. autour d'un arbre)"
        },
        "triangleBase": {
          "label": "Base",
          "helpText": "Longueur de la base de la zone triangulaire"
        },
        "triangleHeight": {
          "label": "Hauteur",
          "helpText": "Hauteur de la zone triangulaire (perpendiculaire à la base)"
        },
        "directArea": {
          "label": "Surface",
          "helpText": "Entrez la surface totale si vous l'avez déjà mesurée"
        },
        "depth": {
          "label": "Profondeur",
          "helpText": "Épaisseur du matériau — typique : 2-3 po pour paillis, 2-4 po pour gravier, 3-6 po pour terre"
        },
        "wasteFactor": {
          "label": "Facteur de Perte / Tassement",
          "helpText": "Matériau supplémentaire pour tassement et bordures. 5-10% est typique"
        },
        "pricingMode": {
          "label": "Mode de Tarification",
          "helpText": "Choisissez comment vous achetez le matériau",
          "options": {
            "bulk": "En Vrac (par verge cube)",
            "bags": "Sacs"
          }
        },
        "bulkPrice": {
          "label": "Prix par Verge Cube",
          "helpText": "Livraison en vrac : 25-50$ pour paillis, 30-60$ pour gravier, 25-45$ pour terre"
        },
        "bagPrice": {
          "label": "Prix par Sac",
          "helpText": "Prix sac magasin — typiquement 3-7$ par sac"
        },
        "bagSize": {
          "label": "Taille du Sac (pieds cubes)",
          "helpText": "Tailles communes : 0,5 pi³ (pierre), 1 pi³, 2 pi³ (paillis), 3 pi³",
          "options": {
            "1": "1 pi³",
            "2": "2 pi³ (Paillis Standard)",
            "3": "3 pi³ (Grand)",
            "0.5": "0,5 pi³"
          }
        },
        "deliveryFee": {
          "label": "Frais de Livraison",
          "helpText": "Frais optionnel livraison en vrac (typiquement 50-150$)"
        }
      },
      "results": {
        "cubicYards": {
          "label": "Volume (Verges Cubes)"
        },
        "cubicFeet": {
          "label": "Volume (Pieds Cubes)"
        },
        "cubicMeters": {
          "label": "Volume (Mètres Cubes)"
        },
        "weight": {
          "label": "Poids Estimé"
        },
        "bagsNeeded": {
          "label": "Sacs Nécessaires"
        },
        "area": {
          "label": "Surface de Couverture"
        },
        "materialCost": {
          "label": "Coût du Matériau"
        },
        "deliveryCost": {
          "label": "Frais de Livraison"
        },
        "totalCost": {
          "label": "Coût Total"
        }
      },
      "presets": {
        "flowerBed": {
          "label": "Plate-bande",
          "description": "Plate-bande paillis 20' × 4', 3 pouces profondeur"
        },
        "treeMulching": {
          "label": "Tour d'Arbre",
          "description": "Cercle 6 pi autour d'un arbre, 3 pouces profondeur"
        },
        "gravelDriveway": {
          "label": "Entrée Gravier",
          "description": "Pierre concassée 40' × 12', 4 pouces profondeur"
        },
        "gardenPath": {
          "label": "Sentier de Jardin",
          "description": "Allée gravier fin 30' × 3', 2 pouces profondeur"
        },
        "playArea": {
          "label": "Aire de Jeu",
          "description": "Paillis caoutchouc 16' × 12', 3 pouces profondeur"
        },
        "raisedBed": {
          "label": "Bac Surélevé",
          "description": "Terre jardin 8' × 4', 6 pouces profondeur"
        }
      },
      "values": {
        "cuYd": "v³",
        "cuFt": "pi³",
        "cuM": "m³",
        "sqFt": "pi²",
        "sqM": "m²",
        "tons": "tonnes",
        "ton": "tonne",
        "lbs": "lb",
        "kg": "kg",
        "bags": "sacs",
        "bag": "sac",
        "in": "po",
        "ft": "pi"
      },
      "formats": {
        "summary": "Vous avez besoin de {cubicYards} de {material} pour couvrir {area} à {depth} de profondeur (incluant {waste}% pour perte/tassement)."
      },
      "infoCards": {
        "volume": {
          "title": "📦 Volume et Poids",
          "items": [
            {
              "label": "Verges Cubes",
              "valueKey": "cubicYards"
            },
            {
              "label": "Pieds Cubes",
              "valueKey": "cubicFeet"
            },
            {
              "label": "Mètres Cubes",
              "valueKey": "cubicMeters"
            },
            {
              "label": "Poids Estimé",
              "valueKey": "weight"
            }
          ]
        },
        "purchase": {
          "title": "🛒 Guide d'Achat",
          "items": [
            {
              "label": "Sacs Nécessaires",
              "valueKey": "bagsNeeded"
            },
            {
              "label": "Surface de Couverture",
              "valueKey": "area"
            },
            {
              "label": "Coût du Matériau",
              "valueKey": "materialCost"
            },
            {
              "label": "Coût Total",
              "valueKey": "totalCost"
            }
          ]
        },
        "tips": {
          "title": "💡 Conseils d'Application",
          "items": [
            "Posez une toile géotextile sous le gravier ou la pierre pour empêcher la croissance des mauvaises herbes et le mélange avec la terre",
            "Pour le paillis, laissez un espace de 3-6 pouces autour des troncs d'arbres — empiler le paillis contre l'écorce cause la pourriture (évitez les 'volcans de paillis')",
            "Commandez 5-10% supplémentaire pour tenir compte du tassement, déversement et terrain inégal",
            "1 verge cube couvre environ 162 pi² à 2\" de profondeur, 108 pi² à 3\", ou 81 pi² à 4\""
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Paillis, Gravier et Matériaux d'Aménagement",
          "content": "Le paillis est tout matériau étalé sur la surface du sol pour retenir l'humidité, supprimer les mauvaises herbes, réguler la température et améliorer l'apparence. Les paillis organiques (copeaux de bois, écorce, paille) se décomposent avec le temps, enrichissant le sol de nutriments. Les paillis inorganiques (gravier, caoutchouc, pierre) sont permanents et nécessitent moins d'entretien. Le gravier est un mélange meuble de fragments rocheux formés par érosion ou concassage mécanique, classifiés par taille selon des normes comme l'échelle Udden-Wentworth (2-64 mm). Il est largement utilisé pour entrées, drainage, allées et aménagement décoratif. Les types communs incluent le gravier fin (petit, arrondi, peu cher), la pierre concassée (angulaire, s'emboîte, idéal pour bases), et le galet de rivière (lisse, décoratif). La terre végétale et le compost servent à établir de nouveaux massifs, amender le sol existant et remplir les bacs surélevés. Le bon matériau dépend de vos objectifs : paillis pour massifs de plantes, gravier pour aménagements durs et drainage, et terre pour cultiver."
        },
        "howItWorks": {
          "title": "Comment Fonctionne ce Calculateur",
          "content": "Le calculateur calcule le volume en déterminant d'abord la surface de couverture selon votre forme choisie (rectangle = longueur × largeur, cercle = π × rayon², triangle = ½ × base × hauteur) ou votre surface directement entrée. Il multiplie ensuite la surface par la profondeur pour obtenir le cubage, convertit en verges cubes (÷ 27), et applique votre facteur de perte. Le poids est estimé en multipliant le volume par la densité du matériau — le paillis pèse typiquement 400-800 lb par verge cube tandis que le gravier pèse 2400-2700 lb. Le nombre de sacs divise le total en pieds cubes par votre taille de sac choisie et arrondit au supérieur. Le coût est calculé soit de votre prix en vrac par verge cube ou prix par sac, plus livraison optionnelle. Le calculateur fournit aussi les équivalents métriques (mètres cubes, kilogrammes, mètres carrés) pour les utilisateurs internationaux."
        },
        "considerations": {
          "title": "Considérations Clés",
          "items": [
            {
              "text": "Le paillis devrait être de 2-3 pouces de profondeur pour les massifs de jardin et 3-4 pouces pour sentiers et pentes. Trop épais (>4\") peut suffoquer les racines et empêcher la pénétration de l'eau.",
              "type": "info"
            },
            {
              "text": "Ne jamais empiler le paillis contre les troncs d'arbres ('volcans de paillis'). Gardez un espace de 3-6 pouces pour empêcher la pourriture de l'écorce, maladies et habitat de parasites.",
              "type": "warning"
            },
            {
              "text": "Le gravier pour entrées devrait être de 4 pouces de profondeur minimum avec une couche de base compactée. Utilisez de la pierre concassée angulaire (pas arrondie) pour qu'elle s'emboîte et ne bouge pas.",
              "type": "info"
            },
            {
              "text": "Le paillis organique se décompose et nécessite remplacement tous les 1-2 ans. Les matériaux inorganiques (gravier, caoutchouc) durent beaucoup plus longtemps mais n'améliorent pas le sol.",
              "type": "info"
            },
            {
              "text": "Le paillis et la terre mouillés sont considérablement plus lourds que secs. Une verge cube de terre mouillée peut peser 3000+ lb. Planifiez le transport en conséquence.",
              "type": "warning"
            },
            {
              "text": "La livraison en vrac est typiquement 40-60% moins chère que l'achat de sacs pour projets nécessitant plus de 3 verges cubes. La plupart des fournisseurs livrent 1-15 verges par chargement.",
              "type": "info"
            }
          ]
        },
        "categories": {
          "title": "Guide des Types de Matériaux",
          "items": [
            {
              "text": "Paillis de Feuillus : Choix le plus populaire pour plates-bandes et aménagement. Texture moyenne, reste bien en place, se décompose lentement en ajoutant des nutriments. Dure 1-2 ans.",
              "type": "info"
            },
            {
              "text": "Gravier Fin : Petites pierres arrondies de 3/8\" disponibles en plusieurs couleurs. Abordable et polyvalent — excellent pour allées, patios, drainage et enclos à chiens. Bouge sous les pieds.",
              "type": "info"
            },
            {
              "text": "Pierre Concassée (#57) : Pierres angulaires 3/4\"-1\" qui s'emboîtent quand compactées. Meilleure pour entrées, fondations et drainage. Fournit excellente stabilité.",
              "type": "info"
            },
            {
              "text": "Galet de Rivière : Pierres lisses arrondies 1-3\" des lits de rivière. Accent décoratif pour massifs, jeux d'eau et lits de ruisseaux secs. Ne se décompose pas. Lourd — planifiez la livraison.",
              "type": "info"
            },
            {
              "text": "Paillis de Caoutchouc : Fait de pneus recyclés. Ne se décompose pas, supprime les mauvaises herbes, et amortit les chutes. Idéal pour aires de jeux et zones à trafic élevé. Ne nourrit pas le sol.",
              "type": "info"
            },
            {
              "text": "Terre Végétale et Compost : Matière organique riche pour nouveaux massifs de jardin. Utilisez 60% terre végétale + 30% compost + 10% perlite pour croissance optimale des plantes. Appliquez 3-6 pouces de profondeur pour nouveaux massifs.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemples de Calcul",
          "description": "Estimation de matériau étape par étape",
          "examples": [
            {
              "title": "Plate-bande : 20' × 4', Paillis de Feuillus, 3\" profondeur",
              "steps": [
                "Surface = 20 × 4 = 80 pi²",
                "Profondeur = 3 pouces = 0,25 pi",
                "Volume = 80 × 0,25 = 20 pi³",
                "Verges cubes = 20 ÷ 27 = 0,74 v³",
                "Ajouter 10% perte = 0,74 × 1,10 = 0,81 v³",
                "Poids = 0,81 × 25 lb/pi³ × 27 = ~549 lb",
                "Sacs (2 pi³) = ⌈22 ÷ 2⌉ = 11 sacs"
              ],
              "result": "0,81 v³ ≈ 11 sacs de 2 pi³ paillis, pesant environ 549 lb. À 35$/v³ : ~28$. À 5$/sac : ~55$."
            },
            {
              "title": "Entrée Gravier : 40' × 12', Pierre Concassée, 4\" profondeur",
              "steps": [
                "Surface = 40 × 12 = 480 pi²",
                "Profondeur = 4 pouces = 0,333 pi",
                "Volume = 480 × 0,333 = 160 pi³",
                "Verges cubes = 160 ÷ 27 = 5,93 v³",
                "Ajouter 10% perte = 5,93 × 1,10 = 6,52 v³",
                "Poids = 6,52 × 100 lb/pi³ × 27 = ~17 604 lb ≈ 8,8 tonnes",
                "C'est un projet de livraison en vrac (trop lourd pour sacs)"
              ],
              "result": "6,52 v³ de pierre concassée, pesant ~8,8 tonnes. À 45$/v³ : ~293$ + livraison. Commandez ~7 verges pour être sûr."
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Combien de verges cubes de paillis ai-je besoin ?",
          "answer": "Mesurez la longueur et largeur de votre zone en pieds, multipliez-les pour obtenir les pieds carrés, puis multipliez par la profondeur en pieds (3\" = 0,25 pi). Divisez le résultat par 27 pour obtenir les verges cubes. Par exemple, un massif 20' × 10' à 3\" de profondeur nécessite : (200 × 0,25) ÷ 27 = 1,85 verges cubes. Ajoutez 10% pour perte, donc commandez environ 2 verges cubes."
        },
        {
          "question": "Combien pèse une verge cube de paillis ou gravier ?",
          "answer": "Le paillis pèse 400-800 lb par verge cube selon l'humidité et le type (copeaux de bois sont plus légers, feuillus plus lourds). Le gravier pèse 2400-2900 lb (1,2-1,45 tonnes) par verge cube. La terre végétale pèse environ 2000-2200 lb par verge cube. Considérez toujours le poids lors de la planification du transport — une camionnette standard peut transporter en sécurité environ 1 verge cube de paillis mais peut être surchargée par 1 verge de gravier."
        },
        {
          "question": "À quelle profondeur devrais-je appliquer le paillis ?",
          "answer": "Appliquez 2-3 pouces pour la plupart des massifs de jardin avec paillis fin, et 3-4 pouces pour paillis plus grossier, sentiers et pentes. Ne jamais dépasser 4 pouces autour des plantes, car un paillis trop épais empêche l'oxygène et l'eau d'atteindre les racines. Pour les arbres, étalez le paillis en anneau large (3-6 pi de diamètre) mais gardez-le à 3-6 pouces du tronc."
        },
        {
          "question": "Est-il moins cher d'acheter le paillis en vrac ou en sacs ?",
          "answer": "Le vrac est typiquement 40-60% moins cher par verge cube. Une verge cube de paillis coûte 25-50$ en vrac vs 56-94$ en sacs (14 sacs à 4-7$ chacun). Cependant, les sacs sont plus pratiques pour petits projets sous 2-3 verges cubes, ne nécessitent pas de frais de livraison (50-150$ pour vrac), et peuvent être transportés en voiture. Le point d'équilibre est habituellement autour de 3 verges cubes."
        },
        {
          "question": "Combien de sacs de paillis dans une verge cube ?",
          "answer": "Une verge cube égale 27 pieds cubes. En sacs standard de 2 pi³ : 27 ÷ 2 = 13,5, donc vous avez besoin de 14 sacs par verge cube. En sacs de 3 pi³ : 27 ÷ 3 = 9 sacs par verge cube. En sacs de 0,5 pi³ (communs pour gravier/pierre) : 27 ÷ 0,5 = 54 sacs par verge cube."
        },
        {
          "question": "Quel type de gravier est meilleur pour les entrées ?",
          "answer": "La pierre concassée (#57 ou #411) est idéale pour entrées car sa forme angulaire s'emboîte quand compactée, créant une surface stable. Utilisez une approche 3 couches : couche de base de grosse pierre #3 (3-4\"), couche moyenne de pierre #57 (1\"), et couche supérieure de #411 ou poussière de pierre pour finition lisse. La profondeur totale devrait être au moins 4 pouces. Évitez le gravier fin pour entrées — il est rond et bouge sous les pneus."
        },
        {
          "question": "Quelle surface couvre une verge cube de matériau ?",
          "answer": "La couverture dépend de la profondeur : à 1\" de profondeur, 1 verge cube couvre 324 pi² ; à 2\" de profondeur, 162 pi² ; à 3\" de profondeur, 108 pi² ; à 4\" de profondeur, 81 pi² ; à 6\" de profondeur, 54 pi². La formule est : couverture (pi²) = 324 ÷ profondeur (pouces). C'est utile pour estimations rapides quand vous savez combien de verges un fournisseur a disponible."
        },
        {
          "question": "Devrais-je utiliser une toile géotextile sous le paillis ou gravier ?",
          "answer": "Sous le gravier et la pierre — oui, toujours. La toile empêche les pierres de s'enfoncer dans la terre et les mauvaises herbes de pousser au travers. Sous le paillis organique — habituellement non. La toile bloque la décomposition du paillis dans le sol (qui est un avantage majeur du paillis organique) et peut créer un tapis où les mauvaises herbes s'enracinent effectivement sur le dessus. À la place, utilisez une couche épaisse de paillis (3-4\") pour naturellement supprimer les mauvaises herbes dans les massifs de jardin."
        }
      ],
      "chart": {
        "title": "Couverture à Différentes Profondeurs",
        "xLabel": "Profondeur",
        "yLabel": "Surface Couverte (pi²)",
        "series": {
          "coverage": "Couverture par Verge Cube"
        }
      },
      "detailedTable": {
        "coverageChart": {
          "button": "Voir Tableau Couverture et Sacs",
          "title": "Tableau de Référence Couverture (par Verge Cube)",
          "columns": {
            "depth": "Profondeur",
            "coverage": "Surface Couverte",
            "bags2": "Sacs (2 pi³)",
            "bags3": "Sacs (3 pi³)",
            "bags05": "Sacs (0,5 pi³)"
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
      },
      "calculator": {
        "yourInformation": "Vos Informations"
      }
    },
    de: {
      "name": "Mulch & Kies Rechner",
      "slug": "mulch-kies-rechner",
      "subtitle": "Berechnen Sie, wie viel Mulch, Kies, Steine oder Erde Sie in Kubikmetern und Säcken benötigen — mit Kostenschätzungen.",
      "breadcrumb": "Mulch & Kies",
      "seo": {
        "title": "Mulch & Kies Rechner - Kostenloser Landschaftsmaterial Schätzer",
        "description": "Berechnen Sie, wie viel Mulch, Kies, Steine, Mutterboden oder Sand Sie benötigen. Erhalten Sie Volumen in Kubikmetern, Sackanzahl, Gewicht und Gesamtkosten für jedes Projekt.",
        "shortDescription": "Schätzen Sie Mulch, Kies, Steine und Erde für Landschaftsprojekte.",
        "keywords": [
          "mulch rechner",
          "kies rechner",
          "kubikmeter rechner",
          "wie viel mulch brauche ich",
          "landschaftsmaterial rechner",
          "kostenloser mulch rechner",
          "stein rechner",
          "mutterboden rechner"
        ]
      },
      "calculator": {
        "yourInformation": "Ihre Informationen"
      },
      "inputs": {
        "materialCategory": {
          "label": "Materialkategorie",
          "helpText": "Wählen Sie die Art des Landschaftsmaterials",
          "options": {
            "mulch": "Mulch",
            "gravel": "Kies & Steine",
            "soil": "Erde & Sand"
          }
        },
        "materialType": {
          "label": "Materialtyp",
          "helpText": "Spezifisches Material — beeinflusst Gewichts- und Abdeckungsberechnungen",
          "options": {
            "woodChips": "Holzhackschnitzel",
            "shreddedBark": "Geschredderte Rinde",
            "hardwoodMulch": "Laubholzmulch",
            "dyedMulch": "Gefärbter Mulch (Schwarz/Braun/Rot)",
            "rubberMulch": "Gummimulch",
            "straw": "Stroh / Kiefernnadeln",
            "peaGravel": "Erbsenkies",
            "crushedStone": "Schotter (#57)",
            "riverRock": "Flusssteine",
            "limestone": "Kalksteinkies",
            "lavaRock": "Lavasteine",
            "marbleChips": "Marmorsplitter",
            "topsoil": "Mutterboden",
            "compost": "Kompost",
            "gardenSoil": "Gartenerde-Mischung",
            "sand": "Sand (Spiel-/Mauersand)"
          }
        },
        "areaShape": {
          "label": "Flächenform",
          "helpText": "Wählen Sie die Form der zu bedeckenden Fläche",
          "options": {
            "rectangle": "Rechteck",
            "circle": "Kreis",
            "triangle": "Dreieck",
            "directArea": "Bekannte Fläche"
          }
        },
        "length": {
          "label": "Länge",
          "helpText": "Längste Seite der rechteckigen Fläche"
        },
        "width": {
          "label": "Breite",
          "helpText": "Kürzere Seite der rechteckigen Fläche"
        },
        "diameter": {
          "label": "Durchmesser",
          "helpText": "Durchmesser der kreisförmigen Fläche (z.B. um einen Baum)"
        },
        "triangleBase": {
          "label": "Basis",
          "helpText": "Basislänge der dreieckigen Fläche"
        },
        "triangleHeight": {
          "label": "Höhe",
          "helpText": "Höhe der dreieckigen Fläche (senkrecht zur Basis)"
        },
        "directArea": {
          "label": "Fläche",
          "helpText": "Geben Sie die Gesamtfläche ein, wenn Sie sie bereits gemessen haben"
        },
        "depth": {
          "label": "Tiefe",
          "helpText": "Materialdicke — typisch: 5-8 cm für Mulch, 5-10 cm für Kies, 8-15 cm für Erde"
        },
        "wasteFactor": {
          "label": "Verschwendungs-/Setzfaktor",
          "helpText": "Zusätzliches Material für Setzungen und Ränder. 5-10% sind typisch"
        },
        "pricingMode": {
          "label": "Preismodus",
          "helpText": "Wählen Sie, wie Sie Material kaufen",
          "options": {
            "bulk": "Schüttgut (pro Kubikmeter)",
            "bags": "Säcke"
          }
        },
        "bulkPrice": {
          "label": "Preis pro Kubikmeter",
          "helpText": "Schüttgutlieferung: 25-50€ für Mulch, 30-60€ für Kies, 25-45€ für Erde"
        },
        "bagPrice": {
          "label": "Preis pro Sack",
          "helpText": "Geschäftspreis — typisch 3-7€ pro Sack"
        },
        "bagSize": {
          "label": "Sackgröße (Liter)",
          "helpText": "Übliche Größen: 15L (Stein), 30L, 60L (Mulch), 90L",
          "options": {
            "15": "15 Liter",
            "30": "30 Liter",
            "60": "60 Liter (Standard Mulch)",
            "90": "90 Liter (Groß)"
          }
        },
        "deliveryFee": {
          "label": "Liefergebühr",
          "helpText": "Optionale Schüttgut-Liefergebühr (typisch 50-150€)"
        }
      },
      "results": {
        "cubicYards": {
          "label": "Volumen (Kubikmeter)"
        },
        "cubicFeet": {
          "label": "Volumen (Liter)"
        },
        "cubicMeters": {
          "label": "Volumen (Kubikmeter)"
        },
        "weight": {
          "label": "Geschätztes Gewicht"
        },
        "bagsNeeded": {
          "label": "Benötigte Säcke"
        },
        "area": {
          "label": "Abdeckungsfläche"
        },
        "materialCost": {
          "label": "Materialkosten"
        },
        "deliveryCost": {
          "label": "Liefergebühr"
        },
        "totalCost": {
          "label": "Gesamtkosten"
        }
      },
      "presets": {
        "flowerBed": {
          "label": "Blumenbeet",
          "description": "6m × 1,2m Mulchbeet, 8cm tief"
        },
        "treeMulching": {
          "label": "Baumscheibe",
          "description": "1,8m-Kreis um einen Baum, 8cm tief"
        },
        "gravelDriveway": {
          "label": "Kiesauffahrt",
          "description": "12m × 3,6m Schotter, 10cm tief"
        },
        "gardenPath": {
          "label": "Gartenweg",
          "description": "9m × 0,9m Erbsenkies-Gehweg, 5cm tief"
        },
        "playArea": {
          "label": "Spielbereich",
          "description": "4,8m × 3,6m Gummimulch, 8cm tief"
        },
        "raisedBed": {
          "label": "Hochbeet",
          "description": "2,4m × 1,2m Gartenerde, 15cm tief"
        }
      },
      "values": {
        "cuYd": "m³",
        "cuFt": "L",
        "cuM": "m³",
        "sqFt": "m²",
        "sqM": "m²",
        "tons": "Tonnen",
        "ton": "Tonne",
        "lbs": "kg",
        "kg": "kg",
        "bags": "Säcke",
        "bag": "Sack",
        "in": "cm",
        "ft": "m"
      },
      "formats": {
        "summary": "Sie benötigen {cubicYards} {material} um {area} bei {depth} Tiefe zu bedecken (einschließlich {waste}% für Verschwendung/Setzung)."
      },
      "infoCards": {
        "volume": {
          "title": "📦 Volumen & Gewicht",
          "items": [
            {
              "label": "Kubikmeter",
              "valueKey": "cubicYards"
            },
            {
              "label": "Liter",
              "valueKey": "cubicFeet"
            },
            {
              "label": "Kubikmeter",
              "valueKey": "cubicMeters"
            },
            {
              "label": "Geschätztes Gewicht",
              "valueKey": "weight"
            }
          ]
        },
        "purchase": {
          "title": "🛒 Kaufratgeber",
          "items": [
            {
              "label": "Benötigte Säcke",
              "valueKey": "bagsNeeded"
            },
            {
              "label": "Abdeckungsfläche",
              "valueKey": "area"
            },
            {
              "label": "Materialkosten",
              "valueKey": "materialCost"
            },
            {
              "label": "Gesamtkosten",
              "valueKey": "totalCost"
            }
          ]
        },
        "tips": {
          "title": "💡 Anwendungstipps",
          "items": [
            "Legen Sie Unkrautvlies unter Kies oder Steine, um Unkrautwachstum und Vermischung mit der Erde zu verhindern",
            "Bei Mulch lassen Sie 8-15cm Abstand zu Baumstämmen — Mulch gegen die Rinde verursacht Fäulnis (vermeiden Sie 'Mulchvulkane')",
            "Bestellen Sie 5-10% extra für Setzungen, Verschüttungen und unebenen Boden",
            "1 Kubikmeter bedeckt etwa 20m² bei 5cm Tiefe, 13m² bei 8cm oder 10m² bei 10cm"
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Mulch, Kies & Landschaftsmaterialien",
          "content": "Mulch ist jedes Material, das über die Bodenoberfläche gestreut wird, um Feuchtigkeit zu speichern, Unkraut zu unterdrücken, die Temperatur zu regulieren und das Erscheinungsbild zu verbessern. Organische Mulche (Holzhackschnitzel, Rinde, Stroh) zersetzen sich mit der Zeit und reichern den Boden mit Nährstoffen an. Anorganische Mulche (Kies, Gummi, Steine) sind dauerhaft und benötigen weniger Wartung. Kies ist eine lockere Mischung aus Gesteinsfragmenten, die durch Erosion oder mechanische Zerkleinerung entstehen und nach Größe klassifiziert werden. Er wird häufig für Auffahrten, Entwässerung, Gehwege und dekorative Landschaftsgestaltung verwendet. Häufige Arten sind Erbsenkies (klein, rund, preiswert), Schotter (eckig, verzahnend, ideal für Untergründe) und Flusssteine (glatt, dekorativ). Mutterboden und Kompost werden verwendet, um neue Gartenbeete anzulegen, bestehende Erde zu verbessern und Hochbeete zu füllen."
        },
        "howItWorks": {
          "title": "Wie dieser Rechner funktioniert",
          "content": "Der Rechner berechnet das Volumen, indem er zunächst die Abdeckungsfläche basierend auf Ihrer gewählten Form bestimmt (Rechteck = Länge × Breite, Kreis = π × Radius², Dreieck = ½ × Basis × Höhe) oder Ihrer direkt eingegebenen Fläche. Dann multipliziert er die Fläche mit der Tiefe, um Kubikmeter zu erhalten, und wendet Ihren Verschwendungsfaktor an. Das Gewicht wird geschätzt, indem das Volumen mit der Dichte des Materials multipliziert wird — Mulch wiegt typischerweise 200-400 kg pro Kubikmeter, während Kies 1.200-1.350 kg wiegt. Die Sackanzahl teilt das Gesamtvolumen durch Ihre gewählte Sackgröße und rundet auf. Die Kosten werden aus Ihrem Schüttgutpreis pro Kubikmeter oder Pro-Sack-Preis plus optionaler Lieferung berechnet."
        },
        "considerations": {
          "title": "Wichtige Überlegungen",
          "items": [
            {
              "text": "Mulch sollte 5-8cm tief für Gartenbeete und 8-10cm für Wege und Hänge aufgetragen werden. Zu dick (>10cm) kann Wurzeln ersticken und Wassereindringen verhindern.",
              "type": "info"
            },
            {
              "text": "Niemals Mulch gegen Baumstämme häufen ('Mulchvulkane'). Halten Sie 8-15cm Abstand, um Rindenfäulnis, Krankheiten und Schädlingshabitat zu verhindern.",
              "type": "warning"
            },
            {
              "text": "Kies für Auffahrten sollte mindestens 10cm tief sein mit einer verdichteten Grundschicht. Verwenden Sie eckigen Schotter (nicht rund), damit er sich verzahnt und nicht verrutscht.",
              "type": "info"
            },
            {
              "text": "Organischer Mulch zersetzt sich und muss alle 1-2 Jahre ersetzt werden. Anorganische Materialien (Kies, Gummi) halten viel länger, verbessern aber nicht den Boden.",
              "type": "info"
            },
            {
              "text": "Nasser Mulch und Erde sind deutlich schwerer als trockene. Ein Kubikmeter nasse Erde kann über 1.500 kg wiegen. Planen Sie den Transport entsprechend.",
              "type": "warning"
            },
            {
              "text": "Schüttgutlieferung ist typischerweise 40-60% günstiger als Sackware für Projekte über 3 Kubikmeter. Die meisten Anbieter liefern 1-15 Kubikmeter pro Ladung.",
              "type": "info"
            }
          ]
        },
        "categories": {
          "title": "Materialtypratgeber",
          "items": [
            {
              "text": "Laubholzmulch: Beliebteste Wahl für Blumenbeete und Landschaftsgestaltung. Mittlere Textur, bleibt gut an Ort und Stelle, zersetzt sich langsam und fügt Nährstoffe hinzu. Hält 1-2 Jahre.",
              "type": "info"
            },
            {
              "text": "Erbsenkies: Kleine, runde, 1cm Steine in vielen Farben erhältlich. Erschwinglich und vielseitig — ideal für Gehwege, Terrassen, Entwässerung und Hundezwinger. Verrutscht unter den Füßen.",
              "type": "info"
            },
            {
              "text": "Schotter (#57): Eckige 2-2,5cm Steine, die sich beim Verdichten verzahnen. Ideal für Auffahrten, Fundamente und Entwässerung. Bietet ausgezeichnete Stabilität.",
              "type": "info"
            },
            {
              "text": "Flusssteine: Glatte, runde 2,5-8cm Steine aus Flussbetten. Dekorativer Akzent für Beete, Wasserspiele und trockene Bachläufe. Zersetzt sich nicht. Schwer — planen Sie Lieferung.",
              "type": "info"
            },
            {
              "text": "Gummimulch: Aus recycelten Reifen hergestellt. Zersetzt sich nicht, unterdrückt Unkraut und dämpft Stürze. Ideal für Spielplätze und stark frequentierte Bereiche. Nährt den Boden nicht.",
              "type": "info"
            },
            {
              "text": "Mutterboden & Kompost: Reiches organisches Material für neue Gartenbeete. Verwenden Sie 60% Mutterboden + 30% Kompost + 10% Perlite für optimales Pflanzenwachstum. 8-15cm tief für neue Beete auftragen.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Berechnungsbeispiele",
          "description": "Schritt-für-Schritt Materialschätzung",
          "examples": [
            {
              "title": "Blumenbeet: 6m × 1,2m, Laubholzmulch, 8cm tief",
              "steps": [
                "Fläche = 6 × 1,2 = 7,2 m²",
                "Tiefe = 8cm = 0,08m",
                "Volumen = 7,2 × 0,08 = 0,58 m³",
                "10% Verschwendung hinzufügen = 0,58 × 1,10 = 0,64 m³",
                "Gewicht = 0,64 × 300 kg/m³ = ~192 kg",
                "Säcke (60L) = ⌈640L ÷ 60⌉ = 11 Säcke"
              ],
              "result": "0,64 m³ ≈ 11 Säcke à 60L Mulch, wiegt etwa 192 kg. Bei 35€/m³: ~22€. Bei 5€/Sack: ~55€."
            },
            {
              "title": "Kiesauffahrt: 12m × 3,6m, Schotter, 10cm tief",
              "steps": [
                "Fläche = 12 × 3,6 = 43,2 m²",
                "Tiefe = 10cm = 0,10m",
                "Volumen = 43,2 × 0,10 = 4,32 m³",
                "10% Verschwendung hinzufügen = 4,32 × 1,10 = 4,75 m³",
                "Gewicht = 4,75 × 1.300 kg/m³ = ~6.175 kg ≈ 6,2 Tonnen",
                "Das ist ein Schüttgut-Lieferprojekt (zu schwer für Säcke)"
              ],
              "result": "4,75 m³ Schotter, wiegt ~6,2 Tonnen. Bei 45€/m³: ~214€ + Lieferung. Bestellen Sie ~5 m³ zur Sicherheit."
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Wie viele Kubikmeter Mulch brauche ich?",
          "answer": "Messen Sie Länge und Breite Ihrer Fläche in Metern, multiplizieren Sie sie für die Quadratmeter, dann multiplizieren Sie mit der Tiefe in Metern (8cm = 0,08m). Zum Beispiel braucht ein 6m × 3m Beet bei 8cm Tiefe: 18 × 0,08 = 1,44 Kubikmeter. Fügen Sie 10% für Verschwendung hinzu, bestellen Sie also etwa 1,6 Kubikmeter."
        },
        {
          "question": "Wie viel wiegt ein Kubikmeter Mulch oder Kies?",
          "answer": "Mulch wiegt 200-400 kg pro Kubikmeter je nach Feuchtigkeit und Typ (Holzhackschnitzel sind leichter, Laubholz ist schwerer). Kies wiegt 1.200-1.450 kg (0,6-0,7 Tonnen) pro Kubikmeter. Mutterboden wiegt etwa 1.000-1.100 kg pro Kubikmeter. Berücksichtigen Sie immer das Gewicht bei der Transportplanung."
        },
        {
          "question": "Wie tief sollte ich Mulch auftragen?",
          "answer": "Tragen Sie 5-8cm für die meisten Gartenbeete mit feinem Mulch und 8-10cm für gröberen Mulch, Wege und Hänge auf. Überschreiten Sie niemals 10cm um Pflanzen, da zu dicker Mulch Sauerstoff und Wasser daran hindert, die Wurzeln zu erreichen. Bei Bäumen verteilen Sie Mulch in einem breiten Ring (1-2m Durchmesser), aber halten Sie 8-15cm Abstand zum Stamm."
        },
        {
          "question": "Ist es günstiger, Mulch als Schüttgut oder in Säcken zu kaufen?",
          "answer": "Schüttgut ist typischerweise 40-60% günstiger pro Kubikmeter. Ein Kubikmeter Mulch kostet 25-50€ als Schüttgut vs. 80-140€ in Säcken (16 Säcke à 5-9€ je nach Größe). Säcke sind jedoch praktischer für kleine Projekte unter 2-3 Kubikmetern, benötigen keine Liefergebühr (50-150€ für Schüttgut) und können im Auto transportiert werden."
        },
        {
          "question": "Wie viele Säcke Mulch sind in einem Kubikmeter?",
          "answer": "Ein Kubikmeter entspricht 1.000 Litern. In Standard 60L-Säcken: 1.000 ÷ 60 = 16,7, also brauchen Sie 17 Säcke pro Kubikmeter. In 90L-Säcken: 1.000 ÷ 90 = 11 Säcke pro Kubikmeter. In 15L-Säcken (üblich für Kies/Stein): 1.000 ÷ 15 = 67 Säcke pro Kubikmeter."
        },
        {
          "question": "Welcher Kiestyp ist am besten für Auffahrten?",
          "answer": "Schotter ist ideal für Auffahrten, da seine eckige Form sich beim Verdichten verzahnt und eine stabile Oberfläche schafft. Verwenden Sie einen 3-Schicht-Ansatz: Grundschicht aus großem Schotter (8-10cm), mittlere Schicht aus kleinem Schotter (2,5cm) und Deckschicht aus Steinsplitt für eine glatte Oberfläche. Gesamttiefe sollte mindestens 10cm betragen. Vermeiden Sie Erbsenkies für Auffahrten — er ist rund und verrutscht unter Reifen."
        },
        {
          "question": "Wie viel Fläche bedeckt ein Kubikmeter Material?",
          "answer": "Die Abdeckung hängt von der Tiefe ab: bei 2,5cm Tiefe bedeckt 1 Kubikmeter 40m²; bei 5cm Tiefe 20m²; bei 8cm Tiefe 12,5m²; bei 10cm Tiefe 10m²; bei 15cm Tiefe 6,7m². Die Formel ist: Abdeckung (m²) = 100 ÷ Tiefe (cm). Das ist nützlich für schnelle Schätzungen."
        },
        {
          "question": "Sollte ich Unkrautvlies unter Mulch oder Kies verwenden?",
          "answer": "Unter Kies und Steinen — ja, immer. Vlies verhindert, dass Steine in die Erde einsinken und Unkraut durchwächst. Unter organischem Mulch — normalerweise nein. Vlies blockiert die Zersetzung des Mulchs in die Erde (was ein Hauptvorteil von organischem Mulch ist) und kann eine Matte bilden, auf der Unkraut tatsächlich wurzelt. Verwenden Sie stattdessen eine dicke Schicht Mulch (8-10cm), um Unkraut in Gartenbeeten natürlich zu unterdrücken."
        }
      ],
      "chart": {
        "title": "Abdeckung bei verschiedenen Tiefen",
        "xLabel": "Tiefe",
        "yLabel": "Bedeckte Fläche (m²)",
        "series": {
          "coverage": "Abdeckung pro Kubikmeter"
        }
      },
      "detailedTable": {
        "coverageChart": {
          "button": "Abdeckungs- & Sacktabelle anzeigen",
          "title": "Abdeckungsreferenztabelle (pro Kubikmeter)",
          "columns": {
            "depth": "Tiefe",
            "coverage": "Bedeckte Fläche",
            "bags2": "Säcke (60L)",
            "bags3": "Säcke (90L)",
            "bags05": "Säcke (15L)"
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
    // ── Material Selection ──
    {
      id: "materialCategory",
      type: "imageradio",
      columns: 3,
      defaultValue: "mulch",
      options: [
        { value: "mulch", label: "Mulch", icon: "🌿" },
        { value: "gravel", label: "Gravel & Stone", icon: "🪨" },
        { value: "soil", label: "Soil & Sand", icon: "🌱" },
      ],
    },
    {
      id: "materialType",
      type: "select",
      defaultValue: "hardwoodMulch",
      options: [
        // Mulch
        { value: "woodChips" },
        { value: "shreddedBark" },
        { value: "hardwoodMulch" },
        { value: "dyedMulch" },
        { value: "rubberMulch" },
        { value: "straw" },
        // Gravel
        { value: "peaGravel" },
        { value: "crushedStone" },
        { value: "riverRock" },
        { value: "limestone" },
        { value: "lavaRock" },
        { value: "marbleChips" },
        // Soil
        { value: "topsoil" },
        { value: "compost" },
        { value: "gardenSoil" },
        { value: "sand" },
      ],
    },

    // ── Area Shape ──
    {
      id: "areaShape",
      type: "imageradio",
      columns: 4,
      defaultValue: "rectangle",
      options: [
        { value: "rectangle", label: "Rectangle", icon: "▬" },
        { value: "circle", label: "Circle", icon: "⭕" },
        { value: "triangle", label: "Triangle", icon: "△" },
        { value: "directArea", label: "Known Area", icon: "📐" },
      ],
    },

    // ── Rectangle dims ──
    {
      id: "length",
      type: "number",
      defaultValue: null,
      placeholder: "20",
      unitType: "length",
      syncGroup: false,
      defaultUnit: "ft",
      allowedUnits: ["ft", "in", "m", "cm", "yd"],
      min: 0.1,
      max: 1000,
      showWhen: { field: "areaShape", value: "rectangle" },
    },
    {
      id: "width",
      type: "number",
      defaultValue: null,
      placeholder: "10",
      unitType: "length",
      syncGroup: false,
      defaultUnit: "ft",
      allowedUnits: ["ft", "in", "m", "cm", "yd"],
      min: 0.1,
      max: 1000,
      showWhen: { field: "areaShape", value: "rectangle" },
    },

    // ── Circle dim ──
    {
      id: "diameter",
      type: "number",
      defaultValue: null,
      placeholder: "6",
      unitType: "length",
      syncGroup: false,
      defaultUnit: "ft",
      allowedUnits: ["ft", "in", "m", "cm", "yd"],
      min: 0.1,
      max: 500,
      showWhen: { field: "areaShape", value: "circle" },
    },

    // ── Triangle dims ──
    {
      id: "triangleBase",
      type: "number",
      defaultValue: null,
      placeholder: "10",
      unitType: "length",
      syncGroup: false,
      defaultUnit: "ft",
      allowedUnits: ["ft", "in", "m", "cm", "yd"],
      min: 0.1,
      max: 500,
      showWhen: { field: "areaShape", value: "triangle" },
    },
    {
      id: "triangleHeight",
      type: "number",
      defaultValue: null,
      placeholder: "8",
      unitType: "length",
      syncGroup: false,
      defaultUnit: "ft",
      allowedUnits: ["ft", "in", "m", "cm", "yd"],
      min: 0.1,
      max: 500,
      showWhen: { field: "areaShape", value: "triangle" },
    },

    // ── Direct area input ──
    {
      id: "directArea",
      type: "number",
      defaultValue: null,
      placeholder: "200",
      unitType: "area",
      syncGroup: false,
      defaultUnit: "ft2",
      allowedUnits: ["ft2", "m2", "yd2"],
      min: 1,
      max: 100000,
      showWhen: { field: "areaShape", value: "directArea" },
    },

    // ── Depth ──
    {
      id: "depth",
      type: "number",
      defaultValue: 3,
      placeholder: "3",
      unitType: "length",
      syncGroup: false,
      defaultUnit: "in",
      allowedUnits: ["in", "cm"],
      min: 0.5,
      max: 24,
    },

    // ── Waste ──
    {
      id: "wasteFactor",
      type: "number",
      defaultValue: 10,
      min: 0,
      max: 25,
      step: 1,
      suffix: "%",
    },

    // ── Pricing Mode ──
    {
      id: "pricingMode",
      type: "radio",
      defaultValue: "bulk",
      options: [{ value: "bulk" }, { value: "bags" }],
    },

    // ── Bulk pricing ──
    {
      id: "bulkPrice",
      type: "number",
      defaultValue: null,
      placeholder: "35",
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "usd",
      showWhen: { field: "pricingMode", value: "bulk" },
    },

    // ── Bag pricing ──
    {
      id: "bagPrice",
      type: "number",
      defaultValue: null,
      placeholder: "5",
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "usd",
      showWhen: { field: "pricingMode", value: "bags" },
    },
    {
      id: "bagSize",
      type: "select",
      defaultValue: "2",
      options: [
        { value: "0.5" },
        { value: "1" },
        { value: "2" },
        { value: "3" },
      ],
      showWhen: { field: "pricingMode", value: "bags" },
    },

    // ── Delivery ──
    {
      id: "deliveryFee",
      type: "number",
      defaultValue: null,
      placeholder: "75",
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "usd",
    },
  ],

  inputGroups: [],

  results: [
    { id: "cubicYards", type: "primary", format: "text" },
    { id: "cubicFeet", type: "secondary", format: "text" },
    { id: "cubicMeters", type: "secondary", format: "text" },
    { id: "weight", type: "secondary", format: "text" },
    { id: "bagsNeeded", type: "secondary", format: "text" },
    { id: "area", type: "secondary", format: "text" },
    { id: "materialCost", type: "secondary", format: "text" },
    { id: "deliveryCost", type: "secondary", format: "text" },
    { id: "totalCost", type: "secondary", format: "text" },
  ],

  infoCards: [
    { id: "volume", type: "list", icon: "📦", itemCount: 4 },
    { id: "purchase", type: "list", icon: "🛒", itemCount: 4 },
    { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  chart: {
    id: "coverageChart",
    type: "bar",
    xKey: "depth",
    showGrid: true,
    showTooltip: true,
    showLegend: false,
    yAxisFormat: "number",
    series: [{ key: "coverage", color: "#22c55e" }],
  },

  detailedTable: {
    id: "coverageChart",
    buttonLabel: "View Coverage & Bag Chart",
    buttonIcon: "📊",
    modalTitle: "Coverage Reference Chart (per Cubic Yard)",
    columns: [
      { id: "depth", label: "Depth", align: "center" },
      { id: "coverage", label: "Area Covered", align: "right", highlight: true },
      { id: "bags2", label: "Bags (2 cu ft)", align: "center" },
      { id: "bags3", label: "Bags (3 cu ft)", align: "center" },
      { id: "bags05", label: "Bags (0.5 cu ft)", align: "center" },
    ],
  },

  referenceData: [],

  educationSections: [
    { id: "whatIs", type: "prose", icon: "📖" },
    { id: "howItWorks", type: "prose", icon: "⚙️" },
    { id: "considerations", type: "list", icon: "📋", itemCount: 6 },
    { id: "categories", type: "list", icon: "🪨", itemCount: 6 },
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
      authors: "University of Florida IFAS Extension",
      year: "2024",
      title: "Mulches for the Landscape",
      source: "UF/IFAS",
      url: "https://edis.ifas.ufl.edu/publication/EP343",
    },
    {
      authors: "USDA Natural Resources Conservation Service",
      year: "2024",
      title: "Mulching — Conservation Practice Standard",
      source: "USDA NRCS",
      url: "https://www.nrcs.usda.gov/conservation-basics/conservation-by-state",
    },
    {
      authors: "International Standards Organization",
      year: "2002",
      title: "ISO 14688-1:2002 — Geotechnical Investigation, Identification and Classification of Soil",
      source: "ISO",
      url: "https://www.iso.org/standard/36065.html",
    },
  ],

  hero: {
    badge: "Construction",
    title: "Mulch & Gravel Calculator",
    icon: "🪨",
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
    "flooring-calculator",
    "drywall-calculator",
    "roofing-calculator",
  ],
  ads: { showSidebar: false, showBanner: false, showNative: false },
};

// ─── Calculate Function ──────────────────────────────────────────
export function calculateMulchGravelCalculator(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits, t } = data;
  const v = (t?.values as Record<string, string>) || {};
  const f = (t?.formats as Record<string, string>) || {};

  // ── Read inputs ──
  const materialType = (values.materialType as string) || "hardwoodMulch";
  const areaShape = (values.areaShape as string) || "rectangle";
  const wasteFactor = (values.wasteFactor as number) ?? 10;
  const pricingMode = (values.pricingMode as string) || "bulk";
  const bulkPrice = (values.bulkPrice as number) || 0;
  const bagPrice = (values.bagPrice as number) || 0;
  const bagSizeStr = (values.bagSize as string) || "2";
  const bagSize = parseFloat(bagSizeStr) || 2;
  const deliveryFee = (values.deliveryFee as number) || 0;

  // ── Depth ──
  const depthRaw = (values.depth as number) ?? 3;
  const depthUnit = fieldUnits?.depth || "in";
  const depthFt = depthToFeet(depthRaw, depthUnit);

  if (depthFt <= 0) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  // ══════════════════════════════════════════════════════════
  //  AREA CALCULATION (sq ft)
  // ══════════════════════════════════════════════════════════
  let areaSqFt = 0;

  if (areaShape === "rectangle") {
    const lengthRaw = values.length as number | null;
    const widthRaw = values.width as number | null;
    if (!lengthRaw || !widthRaw) {
      return { values: {}, formatted: {}, summary: "", isValid: false };
    }
    const lengthFt = toFeet(lengthRaw, fieldUnits?.length || "ft");
    const widthFt = toFeet(widthRaw, fieldUnits?.width || "ft");
    areaSqFt = lengthFt * widthFt;
  } else if (areaShape === "circle") {
    const diameterRaw = values.diameter as number | null;
    if (!diameterRaw) {
      return { values: {}, formatted: {}, summary: "", isValid: false };
    }
    const diamFt = toFeet(diameterRaw, fieldUnits?.diameter || "ft");
    const radius = diamFt / 2;
    areaSqFt = Math.PI * radius * radius;
  } else if (areaShape === "triangle") {
    const baseRaw = values.triangleBase as number | null;
    const heightRaw = values.triangleHeight as number | null;
    if (!baseRaw || !heightRaw) {
      return { values: {}, formatted: {}, summary: "", isValid: false };
    }
    const baseFt = toFeet(baseRaw, fieldUnits?.triangleBase || "ft");
    const heightFt = toFeet(heightRaw, fieldUnits?.triangleHeight || "ft");
    areaSqFt = 0.5 * baseFt * heightFt;
  } else if (areaShape === "directArea") {
    const directRaw = values.directArea as number | null;
    if (!directRaw) {
      return { values: {}, formatted: {}, summary: "", isValid: false };
    }
    const areaUnit = fieldUnits?.directArea || "ft2";
    // Convert area to sq ft
    const areaFactors: Record<string, number> = {
      ft2: 1,
      m2: 10.7639,
      yd2: 9,
      in2: 1 / 144,
    };
    areaSqFt = directRaw * (areaFactors[areaUnit] || 1);
  }

  if (areaSqFt <= 0) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  const areaSqM = areaSqFt * 0.092903;

  // ══════════════════════════════════════════════════════════
  //  VOLUME
  // ══════════════════════════════════════════════════════════
  const volumeCuFtRaw = areaSqFt * depthFt;
  const wasteMultiplier = 1 + wasteFactor / 100;
  const volumeCuFt = volumeCuFtRaw * wasteMultiplier;
  const volumeCuYd = volumeCuFt / 27;
  const volumeCuM = volumeCuFt * 0.0283168;

  // ══════════════════════════════════════════════════════════
  //  WEIGHT
  // ══════════════════════════════════════════════════════════
  const materialInfo = MATERIAL_DENSITY[materialType] || MATERIAL_DENSITY.hardwoodMulch;
  const density = materialInfo.density; // lbs per cu ft
  const totalWeightLbs = volumeCuFt * density;
  const totalWeightTons = totalWeightLbs / 2000;
  const totalWeightKg = totalWeightLbs * 0.453592;

  // ══════════════════════════════════════════════════════════
  //  BAGS
  // ══════════════════════════════════════════════════════════
  const bagsNeeded = Math.ceil(volumeCuFt / bagSize);

  // ══════════════════════════════════════════════════════════
  //  COST
  // ══════════════════════════════════════════════════════════
  const currUnit = fieldUnits?.bulkPrice || fieldUnits?.bagPrice || fieldUnits?.deliveryFee || "usd";
  const SYMBOLS: Record<string, string> = {
    usd: "$", eur: "€", gbp: "£", mxn: "MX$", brl: "R$",
    cad: "C$", jpy: "¥", inr: "₹", cop: "COL$", ars: "AR$",
    pen: "S/", clp: "CLP ",
  };
  const sym = SYMBOLS[currUnit] || "$";

  let materialCost = 0;
  if (pricingMode === "bulk" && bulkPrice > 0) {
    materialCost = volumeCuYd * bulkPrice;
  } else if (pricingMode === "bags" && bagPrice > 0) {
    materialCost = bagsNeeded * bagPrice;
  }
  const totalCost = materialCost + deliveryFee;

  // ══════════════════════════════════════════════════════════
  //  DEPTH for display
  // ══════════════════════════════════════════════════════════
  const depthDisplay =
    depthUnit === "cm"
      ? `${fmtNum(depthRaw)} cm`
      : `${fmtNum(depthRaw, depthRaw % 1 !== 0 ? 1 : 0)} ${v["in"] || "in"}`;

  // ══════════════════════════════════════════════════════════
  //  FORMAT RESULTS
  // ══════════════════════════════════════════════════════════
  const cuYdLabel = v["cuYd"] || "cu yd";
  const cuFtLabel = v["cuFt"] || "cu ft";
  const cuMLabel = v["cuM"] || "m³";
  const sqFtLabel = v["sqFt"] || "sq ft";
  const sqMLabel = v["sqM"] || "m²";
  const bagsLabel = bagsNeeded === 1 ? (v["bag"] || "bag") : (v["bags"] || "bags");

  const formatted: Record<string, string> = {
    cubicYards: `${fmtNum(volumeCuYd, 2)} ${cuYdLabel}`,
    cubicFeet: `${fmtNum(Math.round(volumeCuFt))} ${cuFtLabel}`,
    cubicMeters: `${fmtNum(volumeCuM, 2)} ${cuMLabel}`,
    weight:
      totalWeightTons >= 1
        ? `${fmtNum(totalWeightTons, 1)} ${v["tons"] || "tons"} (${fmtNum(Math.round(totalWeightKg))} ${v["kg"] || "kg"})`
        : `${fmtNum(Math.round(totalWeightLbs))} ${v["lbs"] || "lbs"} (${fmtNum(Math.round(totalWeightKg))} ${v["kg"] || "kg"})`,
    bagsNeeded: `${fmtNum(bagsNeeded)} ${bagsLabel} (${bagSizeStr} ${cuFtLabel} each)`,
    area: `${fmtNum(Math.round(areaSqFt))} ${sqFtLabel} (${fmtNum(Math.round(areaSqM))} ${sqMLabel})`,
  };

  if (materialCost > 0) {
    formatted.materialCost = `${sym}${fmtNum(Math.round(materialCost))}`;
    formatted.deliveryCost = deliveryFee > 0 ? `${sym}${fmtNum(Math.round(deliveryFee))}` : "—";
    formatted.totalCost = `${sym}${fmtNum(Math.round(totalCost))}`;
  } else {
    formatted.materialCost = "—";
    formatted.deliveryCost = deliveryFee > 0 ? `${sym}${fmtNum(Math.round(deliveryFee))}` : "—";
    formatted.totalCost = deliveryFee > 0 ? `${sym}${fmtNum(Math.round(deliveryFee))}` : "—";
  }

  // ══════════════════════════════════════════════════════════
  //  METADATA
  // ══════════════════════════════════════════════════════════

  // Chart: coverage at different depths for the calculated volume
  const chartDepths = [1, 2, 3, 4, 6];
  const chartData = chartDepths.map((d) => ({
    depth: `${d}"`,
    coverage: Math.round(324 / d), // sq ft per cu yd at depth d inches
  }));

  // Coverage reference table
  const tableData = chartDepths.map((d) => {
    const coverSqFt = Math.round(324 / d);
    return {
      depth: `${d} inch${d > 1 ? "es" : ""}`,
      coverage: `${fmtNum(coverSqFt)} sq ft`,
      bags2: String(Math.ceil(27 / 2)),
      bags3: String(Math.ceil(27 / 3)),
      bags05: String(Math.ceil(27 / 0.5)),
    };
  });
  // Note: bags per cu yd is constant regardless of depth — clarify in last row
  const tableDataFull = [
    { depth: '1 inch', coverage: '324 sq ft', bags2: '14', bags3: '9', bags05: '54' },
    { depth: '2 inches', coverage: '162 sq ft', bags2: '14', bags3: '9', bags05: '54' },
    { depth: '3 inches', coverage: '108 sq ft', bags2: '14', bags3: '9', bags05: '54' },
    { depth: '4 inches', coverage: '81 sq ft', bags2: '14', bags3: '9', bags05: '54' },
    { depth: '6 inches', coverage: '54 sq ft', bags2: '14', bags3: '9', bags05: '54' },
    { depth: `YOUR PROJECT: ${depthDisplay}`, coverage: `${fmtNum(Math.round(areaSqFt))} sq ft`, bags2: String(Math.ceil(volumeCuFt / 2)), bags3: String(Math.ceil(volumeCuFt / 3)), bags05: String(Math.ceil(volumeCuFt / 0.5)) },
  ];

  // ── Summary ──
  const summary =
    f.summary
      ?.replace("{cubicYards}", `${fmtNum(volumeCuYd, 2)} ${cuYdLabel}`)
      .replace("{material}", materialInfo.label)
      .replace("{area}", `${fmtNum(Math.round(areaSqFt))} ${sqFtLabel}`)
      .replace("{depth}", depthDisplay)
      .replace("{waste}", String(wasteFactor)) ||
    `You need ${fmtNum(volumeCuYd, 2)} cu yd of ${materialInfo.label}.`;

  return {
    values: {
      cubicYards: Math.round(volumeCuYd * 100) / 100,
      cubicFeet: Math.round(volumeCuFt),
      cubicMeters: Math.round(volumeCuM * 100) / 100,
      weight: Math.round(totalWeightLbs),
      weightTons: Math.round(totalWeightTons * 10) / 10,
      bagsNeeded,
      area: Math.round(areaSqFt),
      areaSqM: Math.round(areaSqM),
      materialCost: Math.round(materialCost),
      deliveryCost: Math.round(deliveryFee),
      totalCost: Math.round(totalCost),
    },
    formatted,
    summary,
    isValid: true,
    metadata: {
      chartData,
      tableData: tableDataFull,
    },
  };
}

export default mulchGravelCalculatorConfig;
