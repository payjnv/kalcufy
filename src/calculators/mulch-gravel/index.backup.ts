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
  category: "construction",
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
