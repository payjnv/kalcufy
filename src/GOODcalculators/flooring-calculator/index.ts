import type {
  CalculatorConfigV4,
  CalculatorResults,
} from "@/engine/v4/types/engine.types";

export const flooringCalculatorConfig: CalculatorConfigV4 = {
  id: "flooring-calculator",
  version: "4.0",
  category: "construction",
  icon: "🪵",

  presets: [
    {
      id: "bedroomHardwood",
      icon: "🛏️",
      values: {
        flooringType: "hardwood",
        roomLength: 12,
        roomWidth: 10,
        numberOfRooms: 1,
        installPattern: "straight",
        wasteFactor: 10,
        boxSize: 20,
        includeCost: true,
        costPerSqFt: 6,
      },
    },
    {
      id: "livingRoomLaminate",
      icon: "🛋️",
      values: {
        flooringType: "laminate",
        roomLength: 20,
        roomWidth: 15,
        numberOfRooms: 1,
        installPattern: "straight",
        wasteFactor: 10,
        boxSize: 24,
        includeCost: true,
        costPerSqFt: 3.5,
      },
    },
    {
      id: "kitchenTile",
      icon: "🍳",
      values: {
        flooringType: "tile",
        roomLength: 14,
        roomWidth: 12,
        numberOfRooms: 1,
        installPattern: "straight",
        wasteFactor: 15,
        boxSize: 15,
        includeCost: true,
        costPerSqFt: 8,
      },
    },
    {
      id: "basementVinyl",
      icon: "🏠",
      values: {
        flooringType: "vinyl",
        roomLength: 25,
        roomWidth: 20,
        numberOfRooms: 1,
        installPattern: "straight",
        wasteFactor: 10,
        boxSize: 24,
        includeCost: true,
        costPerSqFt: 3,
      },
    },
    {
      id: "wholeHomeCarpet",
      icon: "🏡",
      values: {
        flooringType: "carpet",
        roomLength: 15,
        roomWidth: 12,
        numberOfRooms: 5,
        installPattern: "straight",
        wasteFactor: 10,
        boxSize: 0,
        includeCost: true,
        costPerSqFt: 4,
      },
    },
  ],

  t: {
    en: {
      name: "Flooring Calculator",
      slug: "flooring-calculator",
      subtitle:
        "Calculate how much flooring material you need — in square feet, boxes, and estimated cost — for any room or project.",
      breadcrumb: "Flooring",

      seo: {
        title: "Flooring Calculator - Estimate Materials & Cost Free",
        description:
          "Calculate flooring materials for hardwood, laminate, vinyl, tile, or carpet. Get square footage, box count, waste allowance, and total cost estimates instantly.",
        shortDescription:
          "Estimate flooring materials, boxes, and cost for your project.",
        keywords: [
          "flooring calculator",
          "floor area calculator",
          "how much flooring do i need",
          "hardwood flooring calculator",
          "laminate flooring calculator",
          "tile calculator",
          "free flooring calculator",
          "flooring cost estimator",
        ],
      },

      calculator: { yourInformation: "Room & Flooring Details" },
      ui: {
        yourInformation: "Room & Flooring Details",
        calculate: "Calculate",
        reset: "Reset",
        results: "Results",
      },

      inputs: {
        flooringType: {
          label: "Flooring Type",
          helpText: "Select the type of flooring material",
          options: {
            hardwood: "Hardwood",
            laminate: "Laminate",
            vinyl: "Vinyl/LVP",
            tile: "Tile",
            carpet: "Carpet",
          },
        },
        roomLength: {
          label: "Room Length",
          helpText: "The length of the room",
        },
        roomWidth: {
          label: "Room Width",
          helpText: "The width of the room",
        },
        numberOfRooms: {
          label: "Number of Rooms",
          helpText: "Identical rooms to cover (use 1 for a single room)",
        },
        installPattern: {
          label: "Installation Pattern",
          helpText:
            "Diagonal and herringbone patterns require 15-20% more material",
          options: {
            straight: "Straight / Offset",
            diagonal: "Diagonal (45°)",
            herringbone: "Herringbone / Parquet",
          },
        },
        wasteFactor: {
          label: "Waste Factor",
          helpText:
            "Extra material for cuts, waste, and future repairs. 10% standard, 15% for complex rooms",
        },
        boxSize: {
          label: "Box Coverage",
          helpText:
            "Square feet per box/carton. Typical: Hardwood 20, Laminate 24, Vinyl 24, Tile 15. Use 0 for carpet (sold by sq ft)",
        },
        includeCost: {
          label: "Include Cost Estimate",
          helpText: "Enable to calculate material costs",
        },
        costPerSqFt: {
          label: "Cost per Square Foot",
          helpText:
            "Material cost per sq ft (Laminate $2-$6, Hardwood $4-$12, Tile $4-$15, Vinyl $2-$5)",
        },
      },

      results: {
        totalArea: { label: "Total Area" },
        totalAreaMetric: { label: "Total Area (Metric)" },
        areaWithWaste: { label: "With Waste Factor" },
        boxesNeeded: { label: "Boxes Needed" },
        estimatedCost: { label: "Estimated Cost" },
        materialCostPerBox: { label: "Cost per Box" },
        underlayment: { label: "Underlayment" },
      },

      presets: {
        bedroomHardwood: {
          label: "Bedroom (Hardwood)",
          description: "12×10 ft, hardwood, straight install",
        },
        livingRoomLaminate: {
          label: "Living Room (Laminate)",
          description: "20×15 ft, laminate, straight install",
        },
        kitchenTile: {
          label: "Kitchen (Tile)",
          description: "14×12 ft, tile, 15% waste",
        },
        basementVinyl: {
          label: "Basement (Vinyl)",
          description: "25×20 ft, vinyl/LVP, straight install",
        },
        wholeHomeCarpet: {
          label: "Whole Home (Carpet)",
          description: "5 rooms × 15×12 ft each",
        },
      },

      values: {
        sqFt: "sq ft",
        sqM: "m²",
        sqYd: "sq yd",
        boxes: "boxes",
        rolls: "rolls",
      },

      formats: {
        summary:
          "You need {area} of flooring material ({boxes} boxes). With {waste}% waste factor: {areaWaste}.",
      },

      infoCards: {
        metrics: {
          title: "📊 Floor Measurements",
          items: [
            { label: "Total Area", valueKey: "totalArea" },
            { label: "Area (Metric)", valueKey: "totalAreaMetric" },
            { label: "With Waste", valueKey: "areaWithWaste" },
            { label: "Boxes Needed", valueKey: "boxesNeeded" },
          ],
        },
        details: {
          title: "📦 Project Details",
          items: [
            { label: "Underlayment", valueKey: "underlayment" },
            { label: "Pattern Extra", valueKey: "patternExtra" },
            { label: "Cost per Box", valueKey: "materialCostPerBox" },
            { label: "Estimated Cost", valueKey: "estimatedCost" },
          ],
        },
        tips: {
          title: "💡 Flooring Tips",
          items: [
            "Always buy 10% extra material for straight installations. For diagonal patterns, buy 15%. For herringbone, buy 20%. Keep leftovers for future repairs.",
            "Acclimate hardwood and laminate flooring in the room for 48-72 hours before installation. This prevents expansion gaps and buckling after install.",
            "Floating floors (laminate, vinyl, engineered) are DIY-friendly. Tile and solid hardwood typically require professional tools and experience.",
            "Check if your flooring needs underlayment — most floating floors do. Some products come with it pre-attached, which saves time and cost.",
          ],
        },
      },

      education: {
        whatIs: {
          title: "What Is a Flooring Calculator?",
          content:
            "A flooring calculator helps you determine exactly how much material to purchase for your flooring project. It accounts for room dimensions, the number of rooms, waste factor for cuts and mistakes, and your chosen installation pattern. The calculator converts your measurements into usable quantities — total square footage, number of boxes or cartons, and estimated cost — so you can order accurately without over-buying or running short mid-project.",
        },
        howItWorks: {
          title: "How Flooring Is Calculated",
          content:
            "The basic calculation multiplies room length by width to get the base area, then multiplies by the number of identical rooms. A waste factor is added to account for cuts at walls, around obstacles, and pattern matching. Installation pattern affects waste: straight layouts need 10% extra, diagonal patterns need 15%, and herringbone or parquet patterns need 20%. The total area with waste is divided by the box coverage (typically 15-24 sq ft per box depending on material) to determine how many boxes to purchase, always rounding up to the nearest whole box.",
        },
        considerations: {
          title: "Important Considerations",
          items: [
            {
              text: "Measure each room separately if they are different sizes. Don't estimate — even small measurement errors compound when buying material.",
              type: "warning",
            },
            {
              text: "Rooms are rarely perfectly rectangular. Measure at the widest points and account for bump-outs, closets, and alcoves separately.",
              type: "info",
            },
            {
              text: "Carpet is typically sold from 12-foot wide rolls. If your room is wider than 12 feet, there will be seams. Plan seam placement in low-traffic areas.",
              type: "info",
            },
            {
              text: "Subfloor preparation can add significant cost. Uneven subfloors may need leveling compound ($0.50-$2.00/sq ft), and old flooring removal adds time and expense.",
              type: "warning",
            },
            {
              text: "Moisture testing is essential for basements and concrete slabs. Vinyl and tile handle moisture well; hardwood and laminate can warp in high-moisture environments.",
              type: "warning",
            },
            {
              text: "Keep 1-2 extra boxes of matching flooring stored flat in a climate-controlled area. You'll thank yourself later when a plank gets damaged.",
              type: "info",
            },
          ],
        },
        categories: {
          title: "Flooring Material Comparison",
          items: [
            {
              text: "Hardwood — Premium solid wood. Cost: $4-$12/sq ft. Lifespan: 25-100 years (refinishable). Best for living areas. Avoid in basements and bathrooms.",
              type: "info",
            },
            {
              text: "Laminate — Photo layer over compressed wood. Cost: $2-$6/sq ft. Lifespan: 15-25 years. Scratch-resistant, easy DIY install. Not refinishable.",
              type: "info",
            },
            {
              text: "Vinyl/LVP — Luxury Vinyl Plank. Cost: $2-$5/sq ft. Lifespan: 15-25 years. Waterproof, great for kitchens and basements. Very DIY-friendly.",
              type: "info",
            },
            {
              text: "Tile (Ceramic/Porcelain) — Cost: $4-$15/sq ft. Lifespan: 50+ years. Waterproof, very durable. Professional install recommended. Cold underfoot.",
              type: "info",
            },
            {
              text: "Carpet — Cost: $1-$8/sq ft. Lifespan: 5-15 years. Warm and comfortable. Sold from rolls, not boxes. Regular cleaning required.",
              type: "info",
            },
            {
              text: "Engineered Hardwood — Real wood veneer over plywood. Cost: $3-$10/sq ft. Lifespan: 20-50 years. Better moisture resistance than solid wood. Can be refinished 1-2 times.",
              type: "info",
            },
          ],
        },
        examples: {
          title: "Calculation Examples",
          description: "Step-by-step flooring calculations",
          examples: [
            {
              title: "Bedroom with Hardwood (12×10 ft, straight)",
              steps: [
                "Base area: 12 × 10 = 120 sq ft",
                "Waste factor (10%): 120 × 0.10 = 12 sq ft",
                "Total needed: 120 + 12 = 132 sq ft",
                "Box size: 20 sq ft per box",
                "Boxes: 132 ÷ 20 = 6.6 → Round up to 7 boxes",
                "Cost at $6/sq ft: 132 × $6 = $792",
              ],
              result:
                "Purchase 7 boxes of hardwood (140 sq ft) for a 120 sq ft room. Estimated material cost: $792.",
            },
            {
              title: "Living Room with Diagonal Tile (14×12 ft)",
              steps: [
                "Base area: 14 × 12 = 168 sq ft",
                "Diagonal pattern waste (15%): 168 × 0.15 = 25.2 sq ft",
                "Total needed: 168 + 25.2 = 193.2 sq ft",
                "Box size: 15 sq ft per box (tile)",
                "Boxes: 193.2 ÷ 15 = 12.88 → Round up to 13 boxes",
                "Cost at $8/sq ft: 193.2 × $8 = $1,546",
              ],
              result:
                "Purchase 13 boxes of tile (195 sq ft) for a 168 sq ft room with diagonal layout. Estimated material cost: $1,546.",
            },
          ],
        },
      },

      faqs: [
        {
          question: "How much extra flooring should I buy for waste?",
          answer:
            "For straight or offset installations, add 10% extra. For diagonal patterns, add 15%. For herringbone or parquet patterns, add 20%. First-time DIY installers should consider adding an extra 5% beyond these recommendations. It's also wise to keep a few extra planks stored for future repairs.",
        },
        {
          question: "How many square feet come in a box of flooring?",
          answer:
            "Coverage varies by product: Hardwood typically comes in boxes of 15-25 sq ft (most commonly 20 sq ft). Laminate is usually 20-24 sq ft per box. Vinyl/LVP ranges from 20-30 sq ft per box. Tile varies widely at 10-15 sq ft per box depending on tile size. Always check the specific product packaging.",
        },
        {
          question: "Is it cheaper to install flooring myself?",
          answer:
            "DIY installation can save 50-70% on labor costs, which typically run $2-$8/sq ft depending on material. Click-lock laminate and vinyl are the most DIY-friendly. Tile requires specialized tools (wet saw, trowels) and technique. Solid hardwood requires a nail gun and experience. Factor in tool rental costs ($50-$200) when comparing DIY vs professional.",
        },
        {
          question: "What flooring is best for high-moisture areas?",
          answer:
            "For bathrooms, kitchens, basements, and laundry rooms: Porcelain or ceramic tile is the gold standard — completely waterproof and durable. Luxury Vinyl Plank (LVP) is an excellent alternative — waterproof, comfortable, and easy to install. Avoid solid hardwood and standard laminate in wet areas, as they can warp, swell, or develop mold.",
        },
        {
          question: "Do I need underlayment for my flooring?",
          answer:
            "Most floating floors (laminate, vinyl, engineered hardwood) require underlayment for cushioning, sound reduction, and moisture protection. Some products come with underlayment pre-attached — check the packaging. Tile requires cement board or an approved substrate. Carpet uses a separate carpet pad. Solid hardwood nailed down typically doesn't need separate underlayment.",
        },
        {
          question: "How do I calculate flooring for an irregular room?",
          answer:
            "Break the room into rectangular sections and measure each one separately (length × width). Add all sections together for the total area. For bump-outs and alcoves, measure those as separate rectangles and add them. For L-shaped rooms, divide into two rectangles. Always measure at the widest points and round up to ensure adequate coverage.",
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
      id: "flooringType",
      type: "imageradio",
      columns: 5,
      defaultValue: "hardwood",
      options: [
        { value: "hardwood", label: "Hardwood", image: "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2040%2040%22%20fill%3D%22none%22%3E%3Crect%20width%3D%2240%22%20height%3D%2240%22%20rx%3D%224%22%20fill%3D%22%23f5f0e8%22%2F%3E%3Crect%20x%3D%222%22%20y%3D%222%22%20width%3D%2217%22%20height%3D%227%22%20rx%3D%221%22%20fill%3D%22%23c2956a%22%20stroke%3D%22%23a67b52%22%20stroke-width%3D%22.8%22%2F%3E%3Crect%20x%3D%2221%22%20y%3D%222%22%20width%3D%2217%22%20height%3D%227%22%20rx%3D%221%22%20fill%3D%22%23d4a574%22%20stroke%3D%22%23a67b52%22%20stroke-width%3D%22.8%22%2F%3E%3Crect%20x%3D%222%22%20y%3D%2211%22%20width%3D%2211%22%20height%3D%227%22%20rx%3D%221%22%20fill%3D%22%23d4a574%22%20stroke%3D%22%23a67b52%22%20stroke-width%3D%22.8%22%2F%3E%3Crect%20x%3D%2215%22%20y%3D%2211%22%20width%3D%2223%22%20height%3D%227%22%20rx%3D%221%22%20fill%3D%22%23c2956a%22%20stroke%3D%22%23a67b52%22%20stroke-width%3D%22.8%22%2F%3E%3Crect%20x%3D%222%22%20y%3D%2220%22%20width%3D%2220%22%20height%3D%227%22%20rx%3D%221%22%20fill%3D%22%23b8875e%22%20stroke%3D%22%23a67b52%22%20stroke-width%3D%22.8%22%2F%3E%3Crect%20x%3D%2224%22%20y%3D%2220%22%20width%3D%2214%22%20height%3D%227%22%20rx%3D%221%22%20fill%3D%22%23d4a574%22%20stroke%3D%22%23a67b52%22%20stroke-width%3D%22.8%22%2F%3E%3Crect%20x%3D%222%22%20y%3D%2229%22%20width%3D%2214%22%20height%3D%227%22%20rx%3D%221%22%20fill%3D%22%23d4a574%22%20stroke%3D%22%23a67b52%22%20stroke-width%3D%22.8%22%2F%3E%3Crect%20x%3D%2218%22%20y%3D%2229%22%20width%3D%2220%22%20height%3D%227%22%20rx%3D%221%22%20fill%3D%22%23c2956a%22%20stroke%3D%22%23a67b52%22%20stroke-width%3D%22.8%22%2F%3E%3C%2Fsvg%3E" },
        { value: "laminate", label: "Laminate", image: "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2040%2040%22%20fill%3D%22none%22%3E%3Crect%20width%3D%2240%22%20height%3D%2240%22%20rx%3D%224%22%20fill%3D%22%23f0ebe4%22%2F%3E%3Crect%20x%3D%222%22%20y%3D%222%22%20width%3D%2217%22%20height%3D%227%22%20rx%3D%221%22%20fill%3D%22%23d6c4a8%22%20stroke%3D%22%23bfad8e%22%20stroke-width%3D%22.8%22%2F%3E%3Crect%20x%3D%2221%22%20y%3D%222%22%20width%3D%2217%22%20height%3D%227%22%20rx%3D%221%22%20fill%3D%22%23c9b896%22%20stroke%3D%22%23bfad8e%22%20stroke-width%3D%22.8%22%2F%3E%3Crect%20x%3D%222%22%20y%3D%2211%22%20width%3D%2224%22%20height%3D%227%22%20rx%3D%221%22%20fill%3D%22%23c9b896%22%20stroke%3D%22%23bfad8e%22%20stroke-width%3D%22.8%22%2F%3E%3Crect%20x%3D%2228%22%20y%3D%2211%22%20width%3D%2210%22%20height%3D%227%22%20rx%3D%221%22%20fill%3D%22%23d6c4a8%22%20stroke%3D%22%23bfad8e%22%20stroke-width%3D%22.8%22%2F%3E%3Crect%20x%3D%222%22%20y%3D%2220%22%20width%3D%2212%22%20height%3D%227%22%20rx%3D%221%22%20fill%3D%22%23d6c4a8%22%20stroke%3D%22%23bfad8e%22%20stroke-width%3D%22.8%22%2F%3E%3Crect%20x%3D%2216%22%20y%3D%2220%22%20width%3D%2222%22%20height%3D%227%22%20rx%3D%221%22%20fill%3D%22%23c9b896%22%20stroke%3D%22%23bfad8e%22%20stroke-width%3D%22.8%22%2F%3E%3Crect%20x%3D%222%22%20y%3D%2229%22%20width%3D%2220%22%20height%3D%229%22%20rx%3D%221%22%20fill%3D%22%23c9b896%22%20stroke%3D%22%23bfad8e%22%20stroke-width%3D%22.8%22%2F%3E%3Crect%20x%3D%2224%22%20y%3D%2229%22%20width%3D%2214%22%20height%3D%229%22%20rx%3D%221%22%20fill%3D%22%23d6c4a8%22%20stroke%3D%22%23bfad8e%22%20stroke-width%3D%22.8%22%2F%3E%3C%2Fsvg%3E" },
        { value: "vinyl", label: "Vinyl/LVP", image: "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2040%2040%22%20fill%3D%22none%22%3E%3Crect%20width%3D%2240%22%20height%3D%2240%22%20rx%3D%224%22%20fill%3D%22%23eee8e0%22%2F%3E%3Crect%20x%3D%222%22%20y%3D%222%22%20width%3D%2217%22%20height%3D%228%22%20rx%3D%221.5%22%20fill%3D%22%239e8e7e%22%20stroke%3D%22%238a7a6a%22%20stroke-width%3D%22.8%22%2F%3E%3Crect%20x%3D%2221%22%20y%3D%222%22%20width%3D%2217%22%20height%3D%228%22%20rx%3D%221.5%22%20fill%3D%22%23a89888%22%20stroke%3D%22%238a7a6a%22%20stroke-width%3D%22.8%22%2F%3E%3Crect%20x%3D%222%22%20y%3D%2212%22%20width%3D%2211%22%20height%3D%228%22%20rx%3D%221.5%22%20fill%3D%22%23a89888%22%20stroke%3D%22%238a7a6a%22%20stroke-width%3D%22.8%22%2F%3E%3Crect%20x%3D%2215%22%20y%3D%2212%22%20width%3D%2223%22%20height%3D%228%22%20rx%3D%221.5%22%20fill%3D%22%239e8e7e%22%20stroke%3D%22%238a7a6a%22%20stroke-width%3D%22.8%22%2F%3E%3Crect%20x%3D%222%22%20y%3D%2222%22%20width%3D%2222%22%20height%3D%228%22%20rx%3D%221.5%22%20fill%3D%22%239e8e7e%22%20stroke%3D%22%238a7a6a%22%20stroke-width%3D%22.8%22%2F%3E%3Crect%20x%3D%2226%22%20y%3D%2222%22%20width%3D%2212%22%20height%3D%228%22%20rx%3D%221.5%22%20fill%3D%22%23a89888%22%20stroke%3D%22%238a7a6a%22%20stroke-width%3D%22.8%22%2F%3E%3Crect%20x%3D%222%22%20y%3D%2232%22%20width%3D%2215%22%20height%3D%226%22%20rx%3D%221.5%22%20fill%3D%22%23a89888%22%20stroke%3D%22%238a7a6a%22%20stroke-width%3D%22.8%22%2F%3E%3Crect%20x%3D%2219%22%20y%3D%2232%22%20width%3D%2219%22%20height%3D%226%22%20rx%3D%221.5%22%20fill%3D%22%239e8e7e%22%20stroke%3D%22%238a7a6a%22%20stroke-width%3D%22.8%22%2F%3E%3C%2Fsvg%3E" },
        { value: "tile", label: "Tile", image: "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2040%2040%22%20fill%3D%22none%22%3E%3Crect%20width%3D%2240%22%20height%3D%2240%22%20rx%3D%224%22%20fill%3D%22%23e8e4e0%22%2F%3E%3Crect%20x%3D%223%22%20y%3D%223%22%20width%3D%2215%22%20height%3D%2215%22%20rx%3D%221%22%20fill%3D%22%23f5f1ed%22%20stroke%3D%22%23c8beb4%22%2F%3E%3Crect%20x%3D%2222%22%20y%3D%223%22%20width%3D%2215%22%20height%3D%2215%22%20rx%3D%221%22%20fill%3D%22%23ede7e0%22%20stroke%3D%22%23c8beb4%22%2F%3E%3Crect%20x%3D%223%22%20y%3D%2222%22%20width%3D%2215%22%20height%3D%2215%22%20rx%3D%221%22%20fill%3D%22%23ede7e0%22%20stroke%3D%22%23c8beb4%22%2F%3E%3Crect%20x%3D%2222%22%20y%3D%2222%22%20width%3D%2215%22%20height%3D%2215%22%20rx%3D%221%22%20fill%3D%22%23f5f1ed%22%20stroke%3D%22%23c8beb4%22%2F%3E%3Cline%20x1%3D%2220%22%20y1%3D%221%22%20x2%3D%2220%22%20y2%3D%2239%22%20stroke%3D%22%23b8aea4%22%20stroke-width%3D%221.5%22%2F%3E%3Cline%20x1%3D%221%22%20y1%3D%2220%22%20x2%3D%2239%22%20y2%3D%2220%22%20stroke%3D%22%23b8aea4%22%20stroke-width%3D%221.5%22%2F%3E%3C%2Fsvg%3E" },
        { value: "carpet", label: "Carpet", image: "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2040%2040%22%20fill%3D%22none%22%3E%3Crect%20width%3D%2240%22%20height%3D%2240%22%20rx%3D%224%22%20fill%3D%22%238b9e72%22%2F%3E%3Ccircle%20cx%3D%226%22%20cy%3D%226%22%20r%3D%222%22%20fill%3D%22%237d9064%22%20opacity%3D%22.5%22%2F%3E%3Ccircle%20cx%3D%2220%22%20cy%3D%226%22%20r%3D%222%22%20fill%3D%22%237d9064%22%20opacity%3D%22.5%22%2F%3E%3Ccircle%20cx%3D%2234%22%20cy%3D%226%22%20r%3D%222%22%20fill%3D%22%237d9064%22%20opacity%3D%22.5%22%2F%3E%3Ccircle%20cx%3D%2213%22%20cy%3D%2214%22%20r%3D%222%22%20fill%3D%22%237d9064%22%20opacity%3D%22.5%22%2F%3E%3Ccircle%20cx%3D%2227%22%20cy%3D%2214%22%20r%3D%222%22%20fill%3D%22%237d9064%22%20opacity%3D%22.5%22%2F%3E%3Ccircle%20cx%3D%226%22%20cy%3D%2222%22%20r%3D%222%22%20fill%3D%22%237d9064%22%20opacity%3D%22.5%22%2F%3E%3Ccircle%20cx%3D%2220%22%20cy%3D%2222%22%20r%3D%222%22%20fill%3D%22%237d9064%22%20opacity%3D%22.5%22%2F%3E%3Ccircle%20cx%3D%2234%22%20cy%3D%2222%22%20r%3D%222%22%20fill%3D%22%237d9064%22%20opacity%3D%22.5%22%2F%3E%3Ccircle%20cx%3D%2213%22%20cy%3D%2230%22%20r%3D%222%22%20fill%3D%22%237d9064%22%20opacity%3D%22.5%22%2F%3E%3Ccircle%20cx%3D%2227%22%20cy%3D%2230%22%20r%3D%222%22%20fill%3D%22%237d9064%22%20opacity%3D%22.5%22%2F%3E%3C%2Fsvg%3E" },
      ],
    },
    {
      id: "roomLength",
      type: "number",
      defaultValue: null,
      placeholder: "12",
      unitType: "length",
      syncGroup: false,
      defaultUnit: "ft",
      allowedUnits: ["ft", "m", "cm"],
      min: 1,
      max: 500,
    },
    {
      id: "roomWidth",
      type: "number",
      defaultValue: null,
      placeholder: "10",
      unitType: "length",
      syncGroup: false,
      defaultUnit: "ft",
      allowedUnits: ["ft", "m", "cm"],
      min: 1,
      max: 500,
    },
    {
      id: "numberOfRooms",
      type: "stepper",
      defaultValue: 1,
      min: 1,
      max: 20,
      step: 1,
      suffix: "rooms",
    },
    {
      id: "installPattern",
      type: "select",
      defaultValue: "straight",
      options: [
        { value: "straight" },
        { value: "diagonal" },
        { value: "herringbone" },
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
      id: "boxSize",
      type: "number",
      defaultValue: 20,
      placeholder: "20",
      min: 0,
      max: 100,
      step: 1,
      suffix: "sq ft/box",
    },
    {
      id: "includeCost",
      type: "toggle",
      defaultValue: false,
    },
    {
      id: "costPerSqFt",
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
    { id: "totalArea", type: "primary", format: "text" },
    { id: "totalAreaMetric", type: "secondary", format: "text" },
    { id: "areaWithWaste", type: "secondary", format: "text" },
    { id: "boxesNeeded", type: "secondary", format: "text" },
    { id: "underlayment", type: "secondary", format: "text" },
    { id: "materialCostPerBox", type: "secondary", format: "text" },
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
    { id: "categories", type: "list", icon: "🪵", itemCount: 6 },
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
      authors: "National Wood Flooring Association",
      year: "2024",
      title: "Installation Guidelines for Wood Flooring",
      source: "NWFA",
      url: "https://www.nwfa.org/",
    },
    {
      authors: "Floor Covering Installation Board",
      year: "2024",
      title: "Certified Flooring Installers Reference Manual",
      source: "CFI/FCIB",
      url: "https://www.cfiinstallers.org/",
    },
    {
      authors: "Tile Council of North America",
      year: "2024",
      title: "TCNA Handbook for Ceramic, Glass, and Stone Tile Installation",
      source: "TCNA",
      url: "https://www.tcnatile.com/",
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
    "paint-calculator",
    "roofing-calculator",
  ],
  ads: { showSidebar: true, showBanner: false },
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

// Pattern waste factors
const PATTERN_WASTE: Record<string, number> = {
  straight: 0,
  diagonal: 5,
  herringbone: 10,
};

// ─── CALCULATE ───
export function calculateFlooring(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits, t } = data;
  const v = (t?.values as Record<string, string>) || {};

  // Read inputs
  const flooringType = (values.flooringType as string) || "hardwood";
  const rawLength = values.roomLength as number | null;
  const rawWidth = values.roomWidth as number | null;
  const numberOfRooms = (values.numberOfRooms as number) || 1;
  const installPattern = (values.installPattern as string) || "straight";
  const wasteFactor = (values.wasteFactor as number) ?? 10;
  const boxSize = (values.boxSize as number) ?? 20;
  const includeCost = values.includeCost as boolean;
  const costPerSqFt = values.costPerSqFt as number | null;

  // Validate required
  if (rawLength === null || rawWidth === null || rawLength <= 0 || rawWidth <= 0) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  // Convert to feet
  const lengthUnit = fieldUnits?.roomLength || "ft";
  const widthUnit = fieldUnits?.roomWidth || "ft";
  const lengthFt = toFeet(rawLength, lengthUnit);
  const widthFt = toFeet(rawWidth, widthUnit);

  // Base area
  const singleRoomArea = lengthFt * widthFt;
  const totalBaseArea = singleRoomArea * numberOfRooms;

  // Pattern extra waste
  const patternExtra = PATTERN_WASTE[installPattern] || 0;
  const totalWastePercent = wasteFactor + patternExtra;
  const wasteMultiplier = 1 + totalWastePercent / 100;
  const areaWithWaste = totalBaseArea * wasteMultiplier;

  // Metric conversions
  const totalAreaSqM = totalBaseArea / 10.7639;
  const areaWithWasteSqM = areaWithWaste / 10.7639;
  const totalAreaSqYd = totalBaseArea / 9;

  // Boxes needed
  let boxesNeeded = 0;
  if (boxSize > 0) {
    boxesNeeded = Math.ceil(areaWithWaste / boxSize);
  }

  // Underlayment (same area as flooring for floating floors)
  const needsUnderlayment = ["hardwood", "laminate", "vinyl"].includes(flooringType);
  const underlaymentArea = needsUnderlayment ? areaWithWaste : 0;

  // Cost calculation
  let estimatedCost = 0;
  let costFormatted = "—";
  let costPerBoxFormatted = "—";
  if (includeCost && costPerSqFt && costPerSqFt > 0) {
    estimatedCost = areaWithWaste * costPerSqFt;
    const curr = fieldUnits?.costPerSqFt || "USD";
    const SYMBOLS: Record<string, string> = {
      USD: "$", EUR: "€", GBP: "£", MXN: "MX$", BRL: "R$",
      CAD: "C$", AUD: "A$", JPY: "¥", INR: "₹", CHF: "CHF ",
      COP: "COL$", ARS: "AR$", PEN: "S/", CLP: "CLP ",
    };
    const sym = SYMBOLS[curr] || "$";
    costFormatted = `${sym}${fmtNum(estimatedCost)}`;
    if (boxSize > 0) {
      const perBox = boxSize * costPerSqFt;
      costPerBoxFormatted = `${sym}${fmtNum(perBox)}`;
    }
  }

  // Format labels
  const sqFtLabel = v["sqFt"] || "sq ft";
  const sqMLabel = v["sqM"] || "m²";
  const boxesLabel = v["boxes"] || "boxes";

  const totalAreaFormatted = `${fmtNum(totalBaseArea)} ${sqFtLabel}`;
  const totalAreaMetricFormatted = `${fmtNum(totalAreaSqM)} ${sqMLabel}`;
  const areaWithWasteFormatted = `${fmtNum(areaWithWaste)} ${sqFtLabel}`;
  const boxesFormatted =
    boxSize > 0
      ? `${boxesNeeded} ${boxesLabel} (${boxSize} ${sqFtLabel}/box)`
      : `${fmtNum(areaWithWaste)} ${sqFtLabel} (sold by area)`;
  const underlaymentFormatted = needsUnderlayment
    ? `${fmtNum(underlaymentArea)} ${sqFtLabel}`
    : "Not required";
  const patternExtraFormatted =
    patternExtra > 0
      ? `+${patternExtra}% (${fmtNum(totalBaseArea * patternExtra / 100)} ${sqFtLabel})`
      : "None (straight layout)";

  // Summary
  const f = (t?.formats as Record<string, string>) || {};
  const summary =
    f.summary
      ?.replace("{area}", totalAreaFormatted)
      .replace("{boxes}", String(boxesNeeded))
      .replace("{waste}", String(totalWastePercent))
      .replace("{areaWaste}", areaWithWasteFormatted) ||
    `Total area: ${totalAreaFormatted}. With waste: ${areaWithWasteFormatted}.`;

  return {
    values: {
      totalArea: totalBaseArea,
      totalAreaMetric: totalAreaSqM,
      areaWithWaste,
      boxesNeeded,
      estimatedCost,
      underlayment: underlaymentArea,
      patternExtra: totalBaseArea * patternExtra / 100,
      materialCostPerBox: boxSize > 0 && costPerSqFt ? boxSize * costPerSqFt : 0,
    },
    formatted: {
      totalArea: totalAreaFormatted,
      totalAreaMetric: totalAreaMetricFormatted,
      areaWithWaste: areaWithWasteFormatted,
      boxesNeeded: boxesFormatted,
      estimatedCost: costFormatted,
      underlayment: underlaymentFormatted,
      patternExtra: patternExtraFormatted,
      materialCostPerBox: costPerBoxFormatted,
    },
    summary,
    isValid: true,
  };
}

export default flooringCalculatorConfig;
