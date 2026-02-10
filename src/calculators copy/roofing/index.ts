import type {
  CalculatorConfigV4,
  CalculatorResults,
} from "@/engine/v4/types/engine.types";

export const roofingCalculatorConfig: CalculatorConfigV4 = {
  id: "roofing",
  version: "4.0",
  category: "construction",
  icon: "🏠",

  presets: [
    {
      id: "smallRanch",
      icon: "🏡",
      values: {
        roofType: "gable",
        houseLength: 40,
        houseWidth: 25,
        roofPitch: "4",
        overhang: 1,
        materialType: "asphalt",
        wasteFactor: 10,
        includeCost: true,
        costPerSquareFoot: 4.5,
      },
    },
    {
      id: "twoStoryColonial",
      icon: "🏠",
      values: {
        roofType: "gable",
        houseLength: 50,
        houseWidth: 30,
        roofPitch: "6",
        overhang: 1.5,
        materialType: "asphalt",
        wasteFactor: 10,
        includeCost: true,
        costPerSquareFoot: 5,
      },
    },
    {
      id: "modernFlat",
      icon: "🏢",
      values: {
        roofType: "flat",
        houseLength: 45,
        houseWidth: 35,
        roofPitch: "0.5",
        overhang: 0.5,
        materialType: "membrane",
        wasteFactor: 5,
        includeCost: true,
        costPerSquareFoot: 6,
      },
    },],

  t: {
    en: {
      name: "Roofing Calculator",
      slug: "roofing-calculator",
      subtitle:
        "Estimate your roof area, materials needed, and project cost based on dimensions and roof pitch.",
      breadcrumb: "Roofing",

      seo: {
        title: "Roofing Calculator - Estimate Roof Area & Materials Free",
        description:
          "Calculate your roof area and materials needed for any roofing project. Enter dimensions and pitch to get shingles, squares, and cost estimates instantly.",
        shortDescription:
          "Estimate roof area, materials, and cost for your project.",
        keywords: [
          "roofing calculator",
          "roof area calculator",
          "roof square footage",
          "roofing material calculator",
          "how many shingles do i need",
          "roof pitch calculator",
          "free roofing calculator",
          "roof cost estimator",
        ],
      },

      calculator: { yourInformation: "Roof Details" },
      ui: {
        yourInformation: "Roof Details",
        calculate: "Calculate",
        reset: "Reset",
        results: "Results",
      },

      inputs: {
        roofType: {
          label: "Roof Type",
          helpText: "Select the style of your roof",
          options: {
            gable: "Gable",
            hip: "Hip",
            flat: "Flat",
            shed: "Shed",
          },
        },
        houseLength: {
          label: "House Length",
          helpText: "The length of your house (longest side)",
        },
        houseWidth: {
          label: "House Width",
          helpText: "The width of your house (shortest side)",
        },
        roofPitch: {
          label: "Roof Pitch",
          helpText:
            "Rise per 12 inches of horizontal run (e.g., 6/12 means 6 inches rise per foot)",
          options: {
            "0.5": "½/12 (Nearly Flat)",
            "1": "1/12",
            "2": "2/12",
            "3": "3/12 (Low Slope)",
            "4": "4/12",
            "5": "5/12",
            "6": "6/12 (Standard)",
            "7": "7/12",
            "8": "8/12",
            "9": "9/12 (Steep)",
            "10": "10/12",
            "11": "11/12",
            "12": "12/12 (45°)",
            "14": "14/12",
            "16": "16/12",
            "18": "18/12 (Very Steep)",
          },
        },
        overhang: {
          label: "Eave Overhang",
          helpText: "How far the roof extends past the house walls on each side",
        },
        materialType: {
          label: "Roofing Material",
          helpText: "The type of material you plan to use",
          options: {
            asphalt: "Asphalt Shingles",
            metal: "Metal Roofing",
            tile: "Clay/Concrete Tile",
            wood: "Wood Shakes",
            slate: "Slate",
            membrane: "Membrane (TPO/EPDM)",
          },
        },
        wasteFactor: {
          label: "Waste Factor",
          helpText:
            "Extra material for cuts and waste. 10% for simple roofs, 15% for complex roofs with valleys",
        },
        includeCost: {
          label: "Include Cost Estimate",
          helpText: "Enable to calculate project costs",
        },
        costPerSquareFoot: {
          label: "Cost per Square Foot",
          helpText:
            "Material + labor cost per square foot (typical: $3-$15 depending on material)",
        },
      },

      results: {
        roofArea: { label: "Roof Area" },
        roofAreaMetric: { label: "Roof Area (Metric)" },
        roofSquares: { label: "Roofing Squares" },
        bundlesNeeded: { label: "Bundles Needed" },
        ridgeCap: { label: "Ridge Cap" },
        dripEdge: { label: "Drip Edge" },
        estimatedCost: { label: "Estimated Cost" },
      },

      presets: {
        smallRanch: {
          label: "Small Ranch",
          description: "40×25 ft gable roof, 4/12 pitch",
        },
        twoStoryColonial: {
          label: "Colonial",
          description: "50×30 ft gable roof, 6/12 pitch",
        },
        modernFlat: {
          label: "Modern Flat",
          description: "45×35 ft flat roof, membrane",
        },
      },

      values: {
        sqFt: "sq ft",
        sqM: "m²",
        ft: "ft",
        squares: "squares",
        bundles: "bundles",
        linearFt: "linear ft",
      },

      formats: {
        summary:
          "Your roof area is {area}. You need approximately {squares} roofing squares ({bundles} bundles of shingles).",
      },

      infoCards: {
        metrics: {
          title: "📊 Roof Measurements",
          items: [
            { label: "Roof Area", valueKey: "roofArea" },
            { label: "Area (Metric)", valueKey: "roofAreaMetric" },
            { label: "Roofing Squares", valueKey: "roofSquares" },
            { label: "Bundles Needed", valueKey: "bundlesNeeded" },
          ],
        },
        details: {
          title: "📦 Material Estimates",
          items: [
            { label: "Ridge Cap", valueKey: "ridgeCap" },
            { label: "Drip Edge", valueKey: "dripEdge" },
            { label: "Waste Included", valueKey: "wasteIncluded" },
            { label: "Estimated Cost", valueKey: "estimatedCost" },
          ],
        },
        tips: {
          title: "💡 Roofing Tips",
          items: [
            "Always order 10-15% extra material for cuts, waste, and future repairs. Complex roofs with valleys need more waste allowance.",
            "Roof pitch significantly affects total area — a 12/12 pitch roof has 41% more surface area than the same footprint with a flat roof.",
            "One roofing square = 100 sq ft. Three bundles of standard shingles cover one square. Always round up when ordering.",
            "Consider hiring a professional for pitches above 8/12 — steep roofs require special safety equipment and experience.",
          ],
        },
      },

      education: {
        whatIs: {
          title: "What Is a Roofing Calculator?",
          content:
            "A roofing calculator helps homeowners and contractors estimate the total roof surface area and materials needed for a roofing project. Unlike the house footprint (floor area), the actual roof area is larger because of the roof's slope or pitch. This calculator accounts for roof type, pitch, overhang, and waste factor to give you accurate material estimates including shingles, bundles, ridge cap, and drip edge. Knowing your roof's true area is essential for ordering the right amount of materials and getting accurate contractor quotes.",
        },
        howItWorks: {
          title: "How Roof Area Is Calculated",
          content:
            "The calculator starts with your house footprint (length × width), adds the eave overhang on all sides, then applies a pitch multiplier to convert from flat area to actual sloped area. The pitch multiplier comes from the formula: √(1 + (rise/12)²). For example, a 6/12 pitch has a multiplier of 1.118, meaning the roof is about 12% larger than the footprint. For hip roofs, an additional 1.10× factor accounts for the extra surface area from all four sloping sides. The calculator then converts total area into roofing squares (1 square = 100 sq ft) and estimates bundles, ridge cap, and drip edge lengths.",
        },
        considerations: {
          title: "Important Considerations",
          items: [
            {
              text: "Roof complexity affects waste — simple gable roofs need 10% waste, while complex roofs with dormers, valleys, and multiple hips may need 15-20%.",
              type: "warning",
            },
            {
              text: "Material weight matters — asphalt shingles weigh 2-4 lbs/sq ft, while tile can weigh 8-12 lbs/sq ft. Verify your structure can support the chosen material.",
              type: "warning",
            },
            {
              text: "Steep pitches (above 8/12) require additional safety equipment and may increase labor costs by 25-50%.",
              type: "info",
            },
            {
              text: "Don't forget underlayment, flashing, vents, and ice/water shield in cold climates — these add 10-15% to material costs beyond the roofing itself.",
              type: "info",
            },
            {
              text: "Metal roofing and tile have longer lifespans (40-100 years) compared to asphalt (15-30 years), which can offset their higher upfront cost.",
              type: "info",
            },
            {
              text: "Local building codes may restrict certain materials or require specific installation methods. Check with your building department before purchasing.",
              type: "warning",
            },
          ],
        },
        categories: {
          title: "Roofing Material Comparison",
          items: [
            {
              text: "Asphalt Shingles — Most popular (80% of US homes). Cost: $3-$5/sq ft installed. Lifespan: 15-30 years. Easy to install and repair.",
              type: "info",
            },
            {
              text: "Metal Roofing — Standing seam or corrugated panels. Cost: $7-$15/sq ft installed. Lifespan: 40-70 years. Excellent for snow and fire resistance.",
              type: "info",
            },
            {
              text: "Clay/Concrete Tile — Mediterranean and Spanish styles. Cost: $8-$15/sq ft installed. Lifespan: 50-100 years. Very heavy, requires strong structure.",
              type: "info",
            },
            {
              text: "Wood Shakes — Natural cedar or redwood. Cost: $6-$10/sq ft installed. Lifespan: 20-40 years. Beautiful but requires more maintenance.",
              type: "info",
            },
            {
              text: "Slate — Premium natural stone. Cost: $15-$30/sq ft installed. Lifespan: 75-200 years. Extremely durable and elegant but very expensive.",
              type: "info",
            },
            {
              text: "Membrane (TPO/EPDM) — For flat or low-slope roofs. Cost: $4-$8/sq ft installed. Lifespan: 20-30 years. Waterproof and energy efficient.",
              type: "info",
            },
          ],
        },
        examples: {
          title: "Calculation Examples",
          description: "Step-by-step roof area calculations",
          examples: [
            {
              title: "Standard Gable Roof (40×25 ft, 6/12 pitch)",
              steps: [
                "House footprint: 40 × 25 = 1,000 sq ft",
                "Add 1 ft overhang on each side: (40+2) × (25+2) = 42 × 27 = 1,134 sq ft",
                "Pitch multiplier for 6/12: √(1 + (6/12)²) = √1.25 = 1.118",
                "Roof area: 1,134 × 1.118 = 1,268 sq ft",
                "Add 10% waste: 1,268 × 1.10 = 1,395 sq ft",
              ],
              result:
                "You need 13.95 ≈ 14 roofing squares (42 bundles of shingles)",
            },
            {
              title: "Hip Roof (50×30 ft, 5/12 pitch)",
              steps: [
                "House footprint: 50 × 30 = 1,500 sq ft",
                "Add 1.5 ft overhang: (50+3) × (30+3) = 53 × 33 = 1,749 sq ft",
                "Pitch multiplier for 5/12: √(1 + (5/12)²) = √1.1736 = 1.083",
                "Hip factor: × 1.10 (10% extra for hip geometry)",
                "Roof area: 1,749 × 1.083 × 1.10 = 2,083 sq ft",
              ],
              result:
                "You need 20.83 ≈ 21 roofing squares (63 bundles of shingles)",
            },
          ],
        },
      },

      faqs: [
        {
          question: "What is a roofing square?",
          answer:
            "A roofing square is a unit of measurement equal to 100 square feet of roof area. Contractors and suppliers use squares to estimate and price roofing projects. For example, a 2,000 sq ft roof equals 20 squares. Standard asphalt shingles come in bundles, with 3 bundles covering one square.",
        },
        {
          question: "How does roof pitch affect the amount of material I need?",
          answer:
            "Roof pitch increases the actual surface area compared to the flat footprint. A 4/12 pitch adds about 5.4% more area, a 6/12 pitch adds 11.8%, an 8/12 pitch adds 20.2%, and a 12/12 (45°) pitch adds 41.4%. Steeper roofs require significantly more material and are more expensive to install due to increased labor difficulty.",
        },
        {
          question: "How much waste factor should I use?",
          answer:
            "For a simple gable or shed roof, use 10% waste. For roofs with valleys, dormers, or complex geometry, use 15%. For very complex roofs with multiple angles and penetrations (skylights, chimneys), use 15-20%. It's always better to have extra material than to run short mid-project.",
        },
        {
          question:
            "What's the difference between gable, hip, flat, and shed roofs?",
          answer:
            "A gable roof has two sloping sides meeting at a ridge — it's the most common type. A hip roof has four sloping sides meeting at a ridge, providing better wind resistance. A flat roof has minimal slope (just enough for drainage) and is common on modern and commercial buildings. A shed roof has a single sloping surface and is common for additions, garages, and porches.",
        },
        {
          question: "How do I measure my roof pitch?",
          answer:
            "The safest method is to measure from your attic. Place a level horizontally against a rafter, mark 12 inches along the level, then measure the vertical distance from that 12-inch mark down to the rafter. This vertical measurement is your pitch rise. For example, if it measures 6 inches, your pitch is 6/12. You can also use a pitch gauge or smartphone app from outside.",
        },
        {
          question: "How much does a new roof typically cost?",
          answer:
            "Roof replacement costs vary widely based on size, material, pitch, and location. Average costs in the US range from $5,000-$12,000 for asphalt shingles on a standard home (1,500-2,500 sq ft roof). Metal roofing runs $10,000-$25,000, and premium materials like slate can exceed $30,000. Steep pitches, multiple stories, and complex roof lines increase labor costs.",
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
    },
  },

  inputs: [
    {
      id: "roofType",
      type: "imageradio",
      columns: 4,
      defaultValue: "gable",
      options: [
        { value: "gable", label: "Gable", image: "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2040%2040%22%20fill%3D%22none%22%3E%3Crect%20x%3D%226%22%20y%3D%2222%22%20width%3D%2228%22%20height%3D%2214%22%20rx%3D%221%22%20fill%3D%22%2394a3b8%22%20stroke%3D%22%2364748b%22%20stroke-width%3D%221.5%22%2F%3E%3Cpath%20d%3D%22M4%2023L20%207L36%2023%22%20stroke%3D%22%233b82f6%22%20stroke-width%3D%222.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20fill%3D%22%23bfdbfe%22%2F%3E%3Crect%20x%3D%2216%22%20y%3D%2228%22%20width%3D%228%22%20height%3D%228%22%20rx%3D%22.5%22%20fill%3D%22%23f8fafc%22%20stroke%3D%22%2364748b%22%2F%3E%3C%2Fsvg%3E" },
        { value: "hip", label: "Hip", image: "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2040%2040%22%20fill%3D%22none%22%3E%3Crect%20x%3D%226%22%20y%3D%2222%22%20width%3D%2228%22%20height%3D%2214%22%20rx%3D%221%22%20fill%3D%22%2394a3b8%22%20stroke%3D%22%2364748b%22%20stroke-width%3D%221.5%22%2F%3E%3Cpath%20d%3D%22M4%2023L14%209H26L36%2023Z%22%20stroke%3D%22%233b82f6%22%20stroke-width%3D%222%22%20stroke-linejoin%3D%22round%22%20fill%3D%22%23bfdbfe%22%2F%3E%3Cline%20x1%3D%2214%22%20y1%3D%229%22%20x2%3D%2220%22%20y2%3D%225%22%20stroke%3D%22%233b82f6%22%20stroke-width%3D%221.5%22%2F%3E%3Cline%20x1%3D%2226%22%20y1%3D%229%22%20x2%3D%2220%22%20y2%3D%225%22%20stroke%3D%22%233b82f6%22%20stroke-width%3D%221.5%22%2F%3E%3Crect%20x%3D%2216%22%20y%3D%2228%22%20width%3D%228%22%20height%3D%228%22%20rx%3D%22.5%22%20fill%3D%22%23f8fafc%22%20stroke%3D%22%2364748b%22%2F%3E%3C%2Fsvg%3E" },
        { value: "flat", label: "Flat", image: "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2040%2040%22%20fill%3D%22none%22%3E%3Crect%20x%3D%226%22%20y%3D%2214%22%20width%3D%2228%22%20height%3D%2222%22%20rx%3D%221%22%20fill%3D%22%2394a3b8%22%20stroke%3D%22%2364748b%22%20stroke-width%3D%221.5%22%2F%3E%3Crect%20x%3D%223%22%20y%3D%2211%22%20width%3D%2234%22%20height%3D%224%22%20rx%3D%221%22%20fill%3D%22%23bfdbfe%22%20stroke%3D%22%233b82f6%22%20stroke-width%3D%222%22%2F%3E%3Crect%20x%3D%2216%22%20y%3D%2226%22%20width%3D%228%22%20height%3D%2210%22%20rx%3D%22.5%22%20fill%3D%22%23f8fafc%22%20stroke%3D%22%2364748b%22%2F%3E%3C%2Fsvg%3E" },
        { value: "shed", label: "Shed", image: "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2040%2040%22%20fill%3D%22none%22%3E%3Crect%20x%3D%226%22%20y%3D%2218%22%20width%3D%2228%22%20height%3D%2218%22%20rx%3D%221%22%20fill%3D%22%2394a3b8%22%20stroke%3D%22%2364748b%22%20stroke-width%3D%221.5%22%2F%3E%3Cpath%20d%3D%22M4%2019L4%2018L36%2010L36%2019Z%22%20fill%3D%22%23bfdbfe%22%20stroke%3D%22%233b82f6%22%20stroke-width%3D%222%22%20stroke-linejoin%3D%22round%22%2F%3E%3Crect%20x%3D%2215%22%20y%3D%2228%22%20width%3D%227%22%20height%3D%228%22%20rx%3D%22.5%22%20fill%3D%22%23f8fafc%22%20stroke%3D%22%2364748b%22%2F%3E%3C%2Fsvg%3E" },
      ],
    },
    {
      id: "houseLength",
      type: "number",
      defaultValue: null,
      placeholder: "40",
      unitType: "length",
      syncGroup: false,
      defaultUnit: "ft",
      allowedUnits: ["ft", "m"],
      min: 5,
      max: 500,
    },
    {
      id: "houseWidth",
      type: "number",
      defaultValue: null,
      placeholder: "25",
      unitType: "length",
      syncGroup: false,
      defaultUnit: "ft",
      allowedUnits: ["ft", "m"],
      min: 5,
      max: 500,
    },
    {
      id: "roofPitch",
      type: "select",
      defaultValue: "6",
      options: [
        { value: "0.5" },
        { value: "1" },
        { value: "2" },
        { value: "3" },
        { value: "4" },
        { value: "5" },
        { value: "6" },
        { value: "7" },
        { value: "8" },
        { value: "9" },
        { value: "10" },
        { value: "11" },
        { value: "12" },
        { value: "14" },
        { value: "16" },
        { value: "18" },
      ],
    },
    {
      id: "overhang",
      type: "number",
      defaultValue: 1,
      placeholder: "1",
      unitType: "length",
      syncGroup: false,
      defaultUnit: "ft",
      allowedUnits: ["ft", "m"],
      min: 0,
      max: 5,
      step: 0.5,
    },
    {
      id: "materialType",
      type: "select",
      defaultValue: "asphalt",
      options: [
        { value: "asphalt" },
        { value: "metal" },
        { value: "tile" },
        { value: "wood" },
        { value: "slate" },
        { value: "membrane" },
      ],
    },
    {
      id: "wasteFactor",
      type: "number",
      defaultValue: 10,
      min: 0,
      max: 30,
      step: 1,
      suffix: "%",
    },
    {
      id: "includeCost",
      type: "toggle",
      defaultValue: false,
    },
    {
      id: "costPerSquareFoot",
      type: "number",
      defaultValue: null,
      placeholder: "5.00",
      min: 0,
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "USD",
      showWhen: { field: "includeCost", value: true },
    },
  ],

  inputGroups: [],

  results: [
    { id: "roofArea", type: "primary", format: "text" },
    { id: "roofAreaMetric", type: "secondary", format: "text" },
    { id: "roofSquares", type: "secondary", format: "text" },
    { id: "bundlesNeeded", type: "secondary", format: "text" },
    { id: "ridgeCap", type: "secondary", format: "text" },
    { id: "dripEdge", type: "secondary", format: "text" },
    { id: "estimatedCost", type: "secondary", format: "text" },
  ],

  infoCards: [
    { id: "metrics", type: "list", icon: "📊", itemCount: 4 },
    { id: "details", type: "list", icon: "📦", itemCount: 4 },
    { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  chart: undefined,

  referenceData: [],

  educationSections: [
    { id: "whatIs", type: "prose", icon: "📖" },
    { id: "howItWorks", type: "prose", icon: "⚙️" },
    { id: "considerations", type: "list", icon: "📋", itemCount: 6 },
    { id: "categories", type: "list", icon: "🏠", itemCount: 6 },
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
  ],

  references: [
    {
      authors: "National Roofing Contractors Association",
      year: "2024",
      title: "Roofing Materials Guide & Installation Standards",
      source: "NRCA",
      url: "https://www.nrca.net/",
    },
    {
      authors: "Asphalt Roofing Manufacturers Association",
      year: "2024",
      title: "Residential Asphalt Roofing Manual",
      source: "ARMA",
      url: "https://www.asphaltroofing.org/",
    },
    {
      authors: "International Building Code",
      year: "2024",
      title: "Chapter 15: Roof Assemblies and Rooftop Structures",
      source: "ICC IBC",
      url: "https://www.iccsafe.org/",
    },
  ],

  hero: {
    badge: "Construction",
    badgeColor: "blue",
  },
  sidebar: {
    showRelated: true,
    showNewsletter: false,
  },
  features: {
    pdf: true,
    excel: true,
    csv: true,
    save: true,
    share: true,
    url: true,
    rating: true,
  },
  relatedCalculators: [
    "square-footage-calculator-calculator",
    "concrete-calculator",
    "paint-calculator",
  ],
  ads: { showSidebar: true, showBanner: false },
};

// ─── PITCH MULTIPLIERS ───
const PITCH_MULTIPLIER: Record<string, number> = {
  "0.5": 1.001,
  "1": 1.003,
  "2": 1.014,
  "3": 1.031,
  "4": 1.054,
  "5": 1.083,
  "6": 1.118,
  "7": 1.158,
  "8": 1.202,
  "9": 1.250,
  "10": 1.302,
  "11": 1.357,
  "12": 1.414,
  "14": 1.537,
  "16": 1.667,
  "18": 1.803,
};

// ─── HELPERS ───
function fmtNum(val: number): string {
  if (val === 0) return "0";
  if (val < 1) return val.toFixed(2);
  if (val < 1000) return val.toFixed(1).replace(/\.0$/, "");
  return val.toLocaleString("en-US", { maximumFractionDigits: 1 });
}

function toFeet(value: number, unit: string): number {
  switch (unit) {
    case "m":
      return value * 3.28084;
    case "cm":
      return value / 30.48;
    case "in":
      return value / 12;
    case "yd":
      return value * 3;
    default:
      return value;
  }
}

// ─── CALCULATE ───
export function calculateRoofing(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits, t } = data;
  const v = (t?.values as Record<string, string>) || {};

  // Read inputs
  const roofType = (values.roofType as string) || "gable";
  const rawLength = values.houseLength as number | null;
  const rawWidth = values.houseWidth as number | null;
  const roofPitch = (values.roofPitch as string) || "6";
  const rawOverhang = (values.overhang as number) ?? 1;
  const materialType = (values.materialType as string) || "asphalt";
  const wasteFactor = (values.wasteFactor as number) ?? 10;
  const includeCost = values.includeCost as boolean;
  const costPerSqFt = values.costPerSquareFoot as number | null;

  // Validate required
  if (rawLength === null || rawWidth === null || rawLength <= 0 || rawWidth <= 0) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  // Convert to feet
  const lengthUnit = fieldUnits?.houseLength || "ft";
  const widthUnit = fieldUnits?.houseWidth || "ft";
  const overhangUnit = fieldUnits?.overhang || "ft";

  const houseLengthFt = toFeet(rawLength, lengthUnit);
  const houseWidthFt = toFeet(rawWidth, widthUnit);
  const overhangFt = toFeet(rawOverhang, overhangUnit);

  // Calculate footprint with overhang
  const roofLengthFt = houseLengthFt + 2 * overhangFt;
  const roofWidthFt = houseWidthFt + 2 * overhangFt;
  const flatArea = roofLengthFt * roofWidthFt;

  // Apply pitch multiplier
  const pitchMult = PITCH_MULTIPLIER[roofPitch] || 1.118;
  let roofArea = flatArea * pitchMult;

  // Hip roof adjustment (10% extra for hip geometry)
  if (roofType === "hip") {
    roofArea *= 1.10;
  }

  // Shed roof = single slope (same area as gable for the footprint)
  // Flat roof uses minimal multiplier (already handled by 0.5/12 pitch)

  // Add waste factor
  const wasteMultiplier = 1 + wasteFactor / 100;
  const areaWithWaste = roofArea * wasteMultiplier;

  // Convert to metric
  const roofAreaSqM = roofArea / 10.7639;
  const areaWithWasteSqM = areaWithWaste / 10.7639;

  // Roofing squares (1 square = 100 sq ft)
  const squares = Math.ceil(areaWithWaste / 100);

  // Bundles (3 bundles per square for standard shingles)
  let bundlesPerSquare = 3;
  if (materialType === "metal" || materialType === "membrane") {
    bundlesPerSquare = 0; // Sold in panels/rolls, not bundles
  } else if (materialType === "tile" || materialType === "slate") {
    bundlesPerSquare = 0; // Sold by piece or pallet
  }
  const bundles = squares * bundlesPerSquare;

  // Ridge cap (length of ridge)
  let ridgeLengthFt = 0;
  if (roofType === "gable") {
    ridgeLengthFt = roofLengthFt;
  } else if (roofType === "hip") {
    ridgeLengthFt = roofLengthFt - roofWidthFt + 4 * (roofWidthFt / 2) * 1.05;
  } else if (roofType === "shed") {
    ridgeLengthFt = 0; // No ridge on shed
  } else {
    ridgeLengthFt = 0; // Flat
  }

  // Drip edge (perimeter)
  const perimeterFt = 2 * (roofLengthFt + roofWidthFt);

  // Cost
  let estimatedCost = 0;
  let costFormatted = "—";
  if (includeCost && costPerSqFt && costPerSqFt > 0) {
    estimatedCost = areaWithWaste * costPerSqFt;
    const curr = fieldUnits?.costPerSquareFoot || "USD";
    const SYMBOLS: Record<string, string> = {
      USD: "$", EUR: "€", GBP: "£", MXN: "MX$", BRL: "R$",
      CAD: "C$", AUD: "A$", JPY: "¥", INR: "₹", CHF: "CHF ",
      COP: "COL$", ARS: "AR$", PEN: "S/", CLP: "CLP ",
    };
    const sym = SYMBOLS[curr] || "$";
    costFormatted = `${sym}${fmtNum(estimatedCost)}`;
  }

  // Format labels
  const sqFtLabel = v["sqFt"] || "sq ft";
  const sqMLabel = v["sqM"] || "m²";
  const squaresLabel = v["squares"] || "squares";
  const bundlesLabel = v["bundles"] || "bundles";
  const linearFtLabel = v["linearFt"] || "linear ft";

  // Material-specific result text
  let bundlesFormatted: string;
  if (bundlesPerSquare > 0) {
    bundlesFormatted = `${bundles} ${bundlesLabel}`;
  } else {
    const materialLabels: Record<string, string> = {
      metal: "panels (varies by style)",
      tile: "pieces (varies by size)",
      slate: "pieces (varies by size)",
      membrane: "rolls (varies by width)",
    };
    bundlesFormatted = materialLabels[materialType] || "—";
  }

  const roofAreaFormatted = `${fmtNum(roofArea)} ${sqFtLabel}`;
  const roofAreaMetricFormatted = `${fmtNum(roofAreaSqM)} ${sqMLabel}`;
  const squaresFormatted = `${squares} ${squaresLabel}`;
  const ridgeFormatted = ridgeLengthFt > 0 ? `${fmtNum(ridgeLengthFt)} ${linearFtLabel}` : "—";
  const dripEdgeFormatted = `${fmtNum(perimeterFt)} ${linearFtLabel}`;
  const wasteFormatted = `${wasteFactor}% (${fmtNum(areaWithWaste - roofArea)} ${sqFtLabel})`;

  // Summary
  const f = (t?.formats as Record<string, string>) || {};
  const summary =
    f.summary
      ?.replace("{area}", roofAreaFormatted)
      .replace("{squares}", String(squares))
      .replace("{bundles}", String(bundles)) ||
    `Roof area: ${roofAreaFormatted}. ${squares} squares needed.`;

  return {
    values: {
      roofArea,
      roofAreaMetric: roofAreaSqM,
      roofSquares: squares,
      bundlesNeeded: bundles,
      ridgeCap: ridgeLengthFt,
      dripEdge: perimeterFt,
      estimatedCost,
      wasteIncluded: areaWithWaste - roofArea,
    },
    formatted: {
      roofArea: roofAreaFormatted,
      roofAreaMetric: roofAreaMetricFormatted,
      roofSquares: squaresFormatted,
      bundlesNeeded: bundlesFormatted,
      ridgeCap: ridgeFormatted,
      dripEdge: dripEdgeFormatted,
      estimatedCost: costFormatted,
      wasteIncluded: wasteFormatted,
    },
    summary,
    isValid: true,
  };
}

export default roofingCalculatorConfig;
