import type {
  CalculatorConfigV4,
  CalculatorResults,
} from "@/engine/v4/types/engine.types";

// =============================================================================
// SQUARE FOOTAGE CALCULATOR — V4.3
// Uses: imageradio (shapes), stepper (quantity), toggle (cost), unitType dropdowns
// Shapes: Rectangle, Circle, Triangle, Trapezoid, L-Shape
// =============================================================================

export const squareFootageCalculatorConfig: CalculatorConfigV4 = {
  id: "square-footage-calculator",
  version: "4.0",
  category: "home",
  icon: "📐",

  // ---------------------------------------------------------------------------
  // PRESETS
  // ---------------------------------------------------------------------------
  presets: [
    {
      id: "bedroom",
      icon: "🛏️",
      values: {
        shape: "rectangle",
        length: 12,
        width: 10,
        quantity: 1,
        wasteFactor: 10,
        includeCost: false,
        pricePerSqFt: null,
      },
    },
    {
      id: "livingRoom",
      icon: "🛋️",
      values: {
        shape: "rectangle",
        length: 20,
        width: 15,
        quantity: 1,
        wasteFactor: 10,
        includeCost: false,
        pricePerSqFt: null,
      },
    },
    {
      id: "circularPatio",
      icon: "⭕",
      values: {
        shape: "circle",
        diameter: 16,
        quantity: 1,
        wasteFactor: 15,
        includeCost: false,
        pricePerSqFt: null,
      },
    },
    {
      id: "garage",
      icon: "🚗",
      values: {
        shape: "rectangle",
        length: 24,
        width: 24,
        quantity: 1,
        wasteFactor: 5,
        includeCost: false,
        pricePerSqFt: null,
      },
    },
    {
      id: "lShapedRoom",
      icon: "📐",
      values: {
        shape: "lShape",
        mainLength: 20,
        mainWidth: 15,
        cutoutLength: 8,
        cutoutWidth: 6,
        quantity: 1,
        wasteFactor: 10,
        includeCost: false,
        pricePerSqFt: null,
      },
    },
  ],

  // ---------------------------------------------------------------------------
  // TRANSLATIONS — ENGLISH ONLY (translate script adds es/pt/fr/de later)
  // ---------------------------------------------------------------------------
  t: {
    en: {
      name: "Square Footage Calculator",
      slug: "square-footage-calculator",
      subtitle:
        "Calculate the area of any space in square feet, meters, or yards — for flooring, painting, landscaping, and construction projects.",
      breadcrumb: "Square Footage",

      seo: {
        title: "Square Footage Calculator - Free Area & Cost Estimator",
        description:
          "Calculate square footage for any shape including rectangles, circles, triangles, trapezoids, and L-shapes. Estimate material costs with waste factor for flooring, painting, and construction.",
        shortDescription:
          "Calculate area in square feet for any room shape with cost estimation.",
        keywords: [
          "square footage calculator",
          "square feet calculator",
          "area calculator",
          "calculate square footage",
          "sq ft calculator",
          "room area calculator",
          "flooring calculator square feet",
          "free square footage calculator",
        ],
      },

      calculator: { yourInformation: "Area Dimensions" },
      ui: {
        yourInformation: "Area Dimensions",
        calculate: "Calculate",
        reset: "Reset",
        results: "Results",
      },

      inputs: {
        shape: {
          label: "Area Shape",
          helpText: "Select the shape of the area you want to measure",
          options: {
            rectangle: "Rectangle",
            circle: "Circle",
            triangle: "Triangle",
            trapezoid: "Trapezoid",
            lShape: "L-Shape",
          },
        },
        length: {
          label: "Length",
          helpText: "The longer dimension of the rectangle",
        },
        width: {
          label: "Width",
          helpText: "The shorter dimension of the rectangle",
        },
        diameter: {
          label: "Diameter",
          helpText: "The distance across the full circle",
        },
        base: {
          label: "Base",
          helpText: "The base (bottom side) of the triangle",
        },
        triangleHeight: {
          label: "Height",
          helpText:
            "The perpendicular height from the base to the top vertex",
        },
        base1: {
          label: "Base 1 (Top)",
          helpText: "The shorter parallel side of the trapezoid",
        },
        base2: {
          label: "Base 2 (Bottom)",
          helpText: "The longer parallel side of the trapezoid",
        },
        trapezoidHeight: {
          label: "Height",
          helpText:
            "The perpendicular distance between the two parallel sides",
        },
        mainLength: {
          label: "Main Length",
          helpText: "The total length of the longer section of the L",
        },
        mainWidth: {
          label: "Main Width",
          helpText: "The total width of the longer section of the L",
        },
        cutoutLength: {
          label: "Cutout Length",
          helpText: "The length of the removed corner section",
        },
        cutoutWidth: {
          label: "Cutout Width",
          helpText: "The width of the removed corner section",
        },
        quantity: {
          label: "Quantity",
          helpText: "Number of identical areas to calculate (e.g., multiple rooms)",
          suffix: "areas",
        },
        wasteFactor: {
          label: "Waste Factor",
          helpText:
            "Extra material for cuts and waste. Standard: 10% for flooring, 5% for paint",
        },
        includeCost: {
          label: "Include Cost Estimate",
          helpText: "Enable to calculate material costs",
        },
        pricePerSqFt: {
          label: "Price per Square Foot",
          helpText: "Material cost per square foot (e.g., flooring, tile, paint coverage)",
        },
      },

      results: {
        areaSqFt: { label: "Area" },
        areaSqM: { label: "Area (Metric)" },
        areaSqYd: { label: "Area (Yards)" },
        areaAcres: { label: "Acres" },
        areaWithWaste: { label: "With Waste Factor" },
        totalCost: { label: "Estimated Cost" },
        perimeter: { label: "Perimeter" },
      },

      presets: {
        bedroom: {
          label: "Bedroom",
          description: "Standard 12×10 ft bedroom",
        },
        livingRoom: {
          label: "Living Room",
          description: "Spacious 20×15 ft living room",
        },
        circularPatio: {
          label: "Round Patio",
          description: "16 ft diameter circular patio",
        },
        garage: {
          label: "2-Car Garage",
          description: "Standard 24×24 ft garage",
        },
        lShapedRoom: {
          label: "L-Shaped Room",
          description: "20×15 ft room with 8×6 ft cutout",
        },
      },

      values: {
        sqFt: "sq ft",
        sqM: "m²",
        sqYd: "sq yd",
        sqIn: "sq in",
        acres: "acres",
        ft: "ft",
        m: "m",
        areas: "areas",
      },

      formats: {
        summary:
          "The total area is {areaSqFt} sq ft ({areaSqM} m²). With {wasteFactor}% waste factor: {areaWithWaste} sq ft.",
      },

      infoCards: {
        metrics: {
          title: "📊 Area Measurements",
          items: [
            { label: "Square Feet", valueKey: "areaSqFt" },
            { label: "Square Meters", valueKey: "areaSqM" },
            { label: "Square Yards", valueKey: "areaSqYd" },
            { label: "Acres", valueKey: "areaAcres" },
          ],
        },
        details: {
          title: "📦 Material Planning",
          items: [
            { label: "Base Area", valueKey: "areaSqFt" },
            { label: "With Waste", valueKey: "areaWithWaste" },
            { label: "Perimeter", valueKey: "perimeter" },
            { label: "Estimated Cost", valueKey: "totalCost" },
          ],
        },
        tips: {
          title: "💡 Measurement Tips",
          items: [
            "Always measure twice and calculate once — small errors multiply with material purchases.",
            "Add 10-15% waste for flooring (cuts, breakage). Use 5% for paint. Use 15-20% for diagonal or herringbone patterns.",
            "For irregular rooms, break the space into simple shapes, calculate each, then add them together.",
            "1 gallon of paint covers approximately 350-400 sq ft. Round up when ordering.",
          ],
        },
      },

      education: {
        whatIs: {
          title: "What Is Square Footage?",
          content:
            "Square footage (sq ft) is a measurement of area — the amount of two-dimensional space a surface occupies. It's calculated by multiplying length by width when both are measured in feet. Square footage is the standard unit for measuring rooms, homes, and properties in the United States, Canada, and the United Kingdom. Whether you're buying flooring, estimating paint, pricing real estate, or planning a garden, accurate square footage calculations are essential for budgeting and ordering the right amount of materials. One square foot equals a 12-inch by 12-inch square, or approximately 0.0929 square meters.",
        },
        howItWorks: {
          title: "How to Measure Square Footage",
          content:
            "To measure square footage, start by choosing the shape that best matches your space. For rectangular rooms, simply measure the length and width in feet, then multiply them together. For circles, measure the diameter and use the formula π × (diameter/2)². For triangles, measure the base and height, then calculate ½ × base × height. For complex or irregular spaces like L-shaped rooms, divide the area into simpler shapes (rectangles, triangles), calculate each section separately, and add the results. Always measure from wall to wall at floor level, and convert all measurements to the same unit before calculating. When ordering materials, add a waste factor (typically 10%) to account for cuts, breakage, and fitting.",
        },
        considerations: {
          title: "Key Considerations",
          items: [
            {
              text: "Rectangular areas use the simplest formula: Length × Width. Most rooms and standard spaces are rectangular.",
              type: "info" as const,
            },
            {
              text: "For flooring, add 10% waste for straight layouts. Diagonal patterns need 15%, and herringbone needs 20%.",
              type: "warning" as const,
            },
            {
              text: "1 acre equals 43,560 square feet. 1 square yard equals 9 square feet. 1 square meter equals 10.764 square feet.",
              type: "info" as const,
            },
            {
              text: "When measuring for paint, calculate wall area (height × width for each wall) and subtract windows and doors.",
              type: "info" as const,
            },
            {
              text: "Real estate square footage typically includes only finished, heated/cooled living space — not garages, attics, or unfinished basements.",
              type: "warning" as const,
            },
            {
              text: "Always round up material orders — you can't buy partial boxes of tile or partial gallons of paint.",
              type: "info" as const,
            },
          ],
        },
        categories: {
          title: "Common Area Formulas",
          items: [
            {
              text: "Rectangle: Area = Length × Width. The most common calculation for rooms and standard spaces.",
              type: "info" as const,
            },
            {
              text: "Circle: Area = π × r² (where r = diameter ÷ 2). Used for patios, pools, garden beds, and round features.",
              type: "info" as const,
            },
            {
              text: "Triangle: Area = ½ × Base × Height. Common for gable walls, roof sections, and decorative spaces.",
              type: "info" as const,
            },
            {
              text: "Trapezoid: Area = ½ × (Base₁ + Base₂) × Height. Used for cathedral walls and irregular lot shapes.",
              type: "info" as const,
            },
            {
              text: "L-Shape: Calculate as a full rectangle minus the cutout rectangle. Common for kitchens and open floor plans.",
              type: "info" as const,
            },
            {
              text: "Irregular shapes: Divide into simple shapes, calculate each, and add together. Always overestimate for materials.",
              type: "info" as const,
            },
          ],
        },
        examples: {
          title: "Calculation Examples",
          description: "Step-by-step square footage calculations",
          examples: [
            {
              title: "Bedroom Flooring (Rectangle)",
              steps: [
                "Room dimensions: 12 ft × 10 ft",
                "Area = 12 × 10 = 120 sq ft",
                "With 10% waste: 120 × 1.10 = 132 sq ft",
                "At $3.50/sq ft: 132 × $3.50 = $462",
              ],
              result: "Order 132 sq ft of flooring — total cost: $462",
            },
            {
              title: "Circular Patio (Circle)",
              steps: [
                "Patio diameter: 16 ft → radius = 8 ft",
                "Area = π × 8² = 3.14159 × 64 = 201.06 sq ft",
                "With 15% waste: 201.06 × 1.15 = 231.22 sq ft",
                "In square meters: 201.06 ÷ 10.764 = 18.68 m²",
              ],
              result:
                "Patio area: 201.1 sq ft (18.7 m²) — order 232 sq ft of pavers",
            },
          ],
        },
      },

      faqs: [
        {
          question: "How do I calculate the square footage of a room?",
          answer:
            "Measure the length and width of the room in feet, then multiply them together. For example, a room that is 12 feet long and 10 feet wide has an area of 120 square feet (12 × 10 = 120). For rooms that aren't perfect rectangles, break them into simpler shapes, calculate each section, and add the results.",
        },
        {
          question: "How many square feet are in an acre?",
          answer:
            "One acre equals 43,560 square feet. To convert square feet to acres, divide by 43,560. For example, a 10,000 sq ft lot is approximately 0.23 acres. One hectare equals approximately 2.47 acres or 107,639 square feet.",
        },
        {
          question: "How much waste factor should I add for materials?",
          answer:
            "For straight-lay flooring (hardwood, laminate, vinyl), add 10%. For diagonal layouts, add 15%. For herringbone or complex patterns, add 20%. For paint, 5% is usually sufficient. For tile, add 10-15% for cuts and breakage. Always round up to the nearest full box or gallon.",
        },
        {
          question:
            "How do I convert between square feet and square meters?",
          answer:
            "To convert square feet to square meters, divide by 10.764. To convert square meters to square feet, multiply by 10.764. For example, 200 sq ft ÷ 10.764 = 18.58 m², and 50 m² × 10.764 = 538.2 sq ft.",
        },
        {
          question: "How do I calculate the square footage of an L-shaped room?",
          answer:
            "Imagine the L as a full rectangle with a corner cut out. Calculate the full rectangle area (main length × main width), then subtract the cutout area (cutout length × cutout width). For example, a 20×15 room with an 8×6 cutout: (20 × 15) - (8 × 6) = 300 - 48 = 252 sq ft.",
        },
        {
          question:
            "How much does flooring cost per square foot?",
          answer:
            "Flooring costs vary widely: vinyl/laminate runs $1-5/sq ft, hardwood $5-15/sq ft, tile $2-20/sq ft, and carpet $1-8/sq ft (materials only). Installation adds $2-8/sq ft depending on material and complexity. Always calculate total area with waste factor before getting quotes.",
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

  // ---------------------------------------------------------------------------
  // INPUTS
  // ---------------------------------------------------------------------------
  inputs: [
    // — Shape selector (ImageRadio) —
    {
      id: "shape",
      type: "imageradio" as const,
      columns: 5,
      defaultValue: "rectangle",
      options: [
        { value: "rectangle", label: "Rectangle", image: "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2040%2040%22%20fill%3D%22none%22%3E%3Crect%20x%3D%224%22%20y%3D%228%22%20width%3D%2232%22%20height%3D%2224%22%20rx%3D%222%22%20fill%3D%22%23dbeafe%22%20stroke%3D%22%233b82f6%22%20stroke-width%3D%222%22%2F%3E%3Cline%20x1%3D%224%22%20y1%3D%2234%22%20x2%3D%2236%22%20y2%3D%2234%22%20stroke%3D%22%2364748b%22%20stroke-width%3D%221%22%20stroke-dasharray%3D%222%202%22%2F%3E%3Ctext%20x%3D%2220%22%20y%3D%2223%22%20font-size%3D%227%22%20fill%3D%22%231e40af%22%20text-anchor%3D%22middle%22%20font-family%3D%22sans-serif%22%20font-weight%3D%22bold%22%3EL%C3%97W%3C%2Ftext%3E%3C%2Fsvg%3E" },
        { value: "circle", label: "Circle", image: "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2040%2040%22%20fill%3D%22none%22%3E%3Ccircle%20cx%3D%2220%22%20cy%3D%2220%22%20r%3D%2215%22%20fill%3D%22%23dbeafe%22%20stroke%3D%22%233b82f6%22%20stroke-width%3D%222%22%2F%3E%3Cline%20x1%3D%2220%22%20y1%3D%2220%22%20x2%3D%2233%22%20y2%3D%2214%22%20stroke%3D%22%231e40af%22%20stroke-width%3D%221.5%22%20stroke-dasharray%3D%222%202%22%2F%3E%3Ctext%20x%3D%2220%22%20y%3D%2223%22%20font-size%3D%227%22%20fill%3D%22%231e40af%22%20text-anchor%3D%22middle%22%20font-family%3D%22sans-serif%22%20font-weight%3D%22bold%22%3E%CF%80r%C2%B2%3C%2Ftext%3E%3C%2Fsvg%3E" },
        { value: "triangle", label: "Triangle", image: "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2040%2040%22%20fill%3D%22none%22%3E%3Cpath%20d%3D%22M20%205L37%2035H3Z%22%20fill%3D%22%23dbeafe%22%20stroke%3D%22%233b82f6%22%20stroke-width%3D%222%22%20stroke-linejoin%3D%22round%22%2F%3E%3Cline%20x1%3D%223%22%20y1%3D%2235%22%20x2%3D%2237%22%20y2%3D%2235%22%20stroke%3D%22%2364748b%22%20stroke-width%3D%221%22%20stroke-dasharray%3D%222%202%22%2F%3E%3Ctext%20x%3D%2220%22%20y%3D%2228%22%20font-size%3D%226%22%20fill%3D%22%231e40af%22%20text-anchor%3D%22middle%22%20font-family%3D%22sans-serif%22%20font-weight%3D%22bold%22%3Eb%C3%97h%2F2%3C%2Ftext%3E%3C%2Fsvg%3E" },
        { value: "trapezoid", label: "Trapezoid", image: "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2040%2040%22%20fill%3D%22none%22%3E%3Cpath%20d%3D%22M10%208H30L37%2032H3Z%22%20fill%3D%22%23dbeafe%22%20stroke%3D%22%233b82f6%22%20stroke-width%3D%222%22%20stroke-linejoin%3D%22round%22%2F%3E%3Cline%20x1%3D%2237%22%20y1%3D%2220%22%20x2%3D%2239%22%20y2%3D%2220%22%20stroke%3D%22%2364748b%22%20stroke-width%3D%221%22%2F%3E%3Ctext%20x%3D%2220%22%20y%3D%2223%22%20font-size%3D%227%22%20fill%3D%22%231e40af%22%20text-anchor%3D%22middle%22%20font-family%3D%22sans-serif%22%20font-weight%3D%22bold%22%3Eh%3C%2Ftext%3E%3C%2Fsvg%3E" },
        { value: "lShape", label: "L-Shape", image: "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2040%2040%22%20fill%3D%22none%22%3E%3Cpath%20d%3D%22M4%204H24V18H36V36H4Z%22%20fill%3D%22%23dbeafe%22%20stroke%3D%22%233b82f6%22%20stroke-width%3D%222%22%20stroke-linejoin%3D%22round%22%2F%3E%3Ctext%20x%3D%2218%22%20y%3D%2223%22%20font-size%3D%226%22%20fill%3D%22%231e40af%22%20text-anchor%3D%22middle%22%20font-family%3D%22sans-serif%22%20font-weight%3D%22bold%22%3EA%2BB%3C%2Ftext%3E%3C%2Fsvg%3E" },
      ],
    },

    // — Rectangle inputs —
    {
      id: "length",
      type: "number",
      defaultValue: null,
      placeholder: "12",
      unitType: "length",
      syncGroup: false,
      defaultUnit: "ft",
      allowedUnits: ["ft", "in", "m", "cm", "yd"],
      min: 0.01,
      max: 100000,
      showWhen: { field: "shape", value: "rectangle" },
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
      min: 0.01,
      max: 100000,
      showWhen: { field: "shape", value: "rectangle" },
    },

    // — Circle inputs —
    {
      id: "diameter",
      type: "number",
      defaultValue: null,
      placeholder: "16",
      unitType: "length",
      syncGroup: false,
      defaultUnit: "ft",
      allowedUnits: ["ft", "in", "m", "cm", "yd"],
      min: 0.01,
      max: 100000,
      showWhen: { field: "shape", value: "circle" },
    },

    // — Triangle inputs —
    {
      id: "base",
      type: "number",
      defaultValue: null,
      placeholder: "15",
      unitType: "length",
      syncGroup: false,
      defaultUnit: "ft",
      allowedUnits: ["ft", "in", "m", "cm", "yd"],
      min: 0.01,
      max: 100000,
      showWhen: { field: "shape", value: "triangle" },
    },
    {
      id: "triangleHeight",
      type: "number",
      defaultValue: null,
      placeholder: "10",
      unitType: "length",
      syncGroup: false,
      defaultUnit: "ft",
      allowedUnits: ["ft", "in", "m", "cm", "yd"],
      min: 0.01,
      max: 100000,
      showWhen: { field: "shape", value: "triangle" },
    },

    // — Trapezoid inputs —
    {
      id: "base1",
      type: "number",
      defaultValue: null,
      placeholder: "10",
      unitType: "length",
      syncGroup: false,
      defaultUnit: "ft",
      allowedUnits: ["ft", "in", "m", "cm", "yd"],
      min: 0.01,
      max: 100000,
      showWhen: { field: "shape", value: "trapezoid" },
    },
    {
      id: "base2",
      type: "number",
      defaultValue: null,
      placeholder: "16",
      unitType: "length",
      syncGroup: false,
      defaultUnit: "ft",
      allowedUnits: ["ft", "in", "m", "cm", "yd"],
      min: 0.01,
      max: 100000,
      showWhen: { field: "shape", value: "trapezoid" },
    },
    {
      id: "trapezoidHeight",
      type: "number",
      defaultValue: null,
      placeholder: "8",
      unitType: "length",
      syncGroup: false,
      defaultUnit: "ft",
      allowedUnits: ["ft", "in", "m", "cm", "yd"],
      min: 0.01,
      max: 100000,
      showWhen: { field: "shape", value: "trapezoid" },
    },

    // — L-Shape inputs —
    {
      id: "mainLength",
      type: "number",
      defaultValue: null,
      placeholder: "20",
      unitType: "length",
      syncGroup: false,
      defaultUnit: "ft",
      allowedUnits: ["ft", "in", "m", "cm", "yd"],
      min: 0.01,
      max: 100000,
      showWhen: { field: "shape", value: "lShape" },
    },
    {
      id: "mainWidth",
      type: "number",
      defaultValue: null,
      placeholder: "15",
      unitType: "length",
      syncGroup: false,
      defaultUnit: "ft",
      allowedUnits: ["ft", "in", "m", "cm", "yd"],
      min: 0.01,
      max: 100000,
      showWhen: { field: "shape", value: "lShape" },
    },
    {
      id: "cutoutLength",
      type: "number",
      defaultValue: null,
      placeholder: "8",
      unitType: "length",
      syncGroup: false,
      defaultUnit: "ft",
      allowedUnits: ["ft", "in", "m", "cm", "yd"],
      min: 0.01,
      max: 100000,
      showWhen: { field: "shape", value: "lShape" },
    },
    {
      id: "cutoutWidth",
      type: "number",
      defaultValue: null,
      placeholder: "6",
      unitType: "length",
      syncGroup: false,
      defaultUnit: "ft",
      allowedUnits: ["ft", "in", "m", "cm", "yd"],
      min: 0.01,
      max: 100000,
      showWhen: { field: "shape", value: "lShape" },
    },

    // — Common inputs —
    {
      id: "quantity",
      type: "stepper",
      defaultValue: 1,
      min: 1,
      max: 50,
      step: 1,
      suffix: "areas",
    },
    {
      id: "wasteFactor",
      type: "number",
      defaultValue: 10,
      min: 0,
      max: 50,
      step: 1,
      suffix: "%",
    },
    {
      id: "includeCost",
      type: "toggle",
      defaultValue: false,
    },
    {
      id: "pricePerSqFt",
      type: "number",
      defaultValue: null,
      placeholder: "3.50",
      min: 0,
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "USD",
      showWhen: { field: "includeCost", value: true },
    },
  ],

  inputGroups: [],

  // ---------------------------------------------------------------------------
  // RESULTS
  // ---------------------------------------------------------------------------
  results: [
    { id: "areaSqFt", type: "primary", format: "number" },
    { id: "areaSqM", type: "secondary", format: "number" },
    { id: "areaSqYd", type: "secondary", format: "number" },
    { id: "areaAcres", type: "secondary", format: "number" },
    { id: "areaWithWaste", type: "secondary", format: "number" },
    { id: "totalCost", type: "secondary", format: "text" },
    { id: "perimeter", type: "secondary", format: "text" },
  ],

  // ---------------------------------------------------------------------------
  // INFO CARDS
  // ---------------------------------------------------------------------------
  infoCards: [
    { id: "metrics", type: "list", icon: "📊", itemCount: 4 },
    { id: "details", type: "list", icon: "📦", itemCount: 4 },
    { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  // ---------------------------------------------------------------------------
  // EDUCATION SECTIONS
  // ---------------------------------------------------------------------------
  referenceData: [],

  educationSections: [
    { id: "whatIs", type: "prose", icon: "📖" },
    { id: "howItWorks", type: "prose", icon: "⚙️" },
    { id: "considerations", type: "list", icon: "📋", itemCount: 6 },
    { id: "categories", type: "list", icon: "📐", itemCount: 6 },
    {
      id: "examples",
      type: "code-example",
      icon: "🧮",
      columns: 2,
      exampleCount: 2,
    },
  ],

  // ---------------------------------------------------------------------------
  // FAQs
  // ---------------------------------------------------------------------------
  faqs: [
    { id: "0" },
    { id: "1" },
    { id: "2" },
    { id: "3" },
    { id: "4" },
    { id: "5" },
  ],

  // ---------------------------------------------------------------------------
  // REFERENCES
  // ---------------------------------------------------------------------------
  references: [
    {
      authors: "American National Standards Institute (ANSI)",
      year: "2021",
      title:
        "ANSI Z765-2021: Square Footage — Method for Calculating",
      source: "ANSI / Home Innovation Research Labs",
      url: "https://www.homeinnovation.com/about/ansi_z765",
    },
    {
      authors: "National Association of Home Builders (NAHB)",
      year: "2024",
      title: "Cost of Constructing a Home",
      source: "NAHB",
      url: "https://www.nahb.org/news-and-economics/housing-economics/special-studies/construction-cost",
    },
    {
      authors: "National Flooring Alliance",
      year: "2024",
      title: "Flooring Installation Guide: Measuring & Waste Factors",
      source: "National Flooring Alliance",
      url: "https://www.nfa-floors.com/",
    },
  ],

  // ---------------------------------------------------------------------------
  // HERO, SIDEBAR, FEATURES
  // ---------------------------------------------------------------------------
  hero: {
    icon: "📐",
    badgeText: "Free Tool",
  },
  sidebar: {
    relatedTitle: "Related Calculators",
  },
  features: {
    hasPdf: true,
    hasExcel: true,
    hasCsv: true,
    hasSave: true,
    hasShare: true,
    hasPresets: true,
    hasUnitSystem: false,
  },
  relatedCalculators: [
    "paint-calculator",
    "concrete-calculator",
  ],
  ads: { showSidebar: true, showBanner: true },
};

// =============================================================================
// CALCULATE FUNCTION
// =============================================================================

// Convert any length to feet
function toFeet(value: number, unit: string): number {
  switch (unit) {
    case "in":
      return value / 12;
    case "ft":
      return value;
    case "yd":
      return value * 3;
    case "m":
      return value * 3.28084;
    case "cm":
      return value / 30.48;
    case "mm":
      return value / 304.8;
    case "km":
      return value * 3280.84;
    case "mi":
      return value * 5280;
    default:
      return value;
  }
}

function fmtNum(val: number, decimals: number = 2): string {
  if (val === 0) return "0";
  if (val < 0.01) return val.toExponential(2);
  if (val >= 1000) {
    return val.toLocaleString("en-US", { maximumFractionDigits: decimals });
  }
  return val.toFixed(decimals).replace(/\.?0+$/, "");
}

export function calculateSquareFootage(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits, t } = data;
  const v = (t?.values as Record<string, string>) || {};

  const shape = (values.shape as string) || "rectangle";
  const quantity = (values.quantity as number) || 1;
  const wasteFactor = (values.wasteFactor as number) ?? 10;
  const includeCost = values.includeCost as boolean;
  const pricePerSqFt = values.pricePerSqFt as number | null;

  // -- Helper to read a length field and convert to feet --
  const readFt = (fieldId: string): number | null => {
    const raw = values[fieldId] as number | null;
    if (raw === null || raw === undefined) return null;
    const unit = fieldUnits?.[fieldId] || "ft";
    return toFeet(raw, unit);
  };

  // -- Calculate area in square feet based on shape --
  let areaSqFt = 0;
  let perimeterFt = 0;

  switch (shape) {
    case "rectangle": {
      const l = readFt("length");
      const w = readFt("width");
      if (l === null || w === null) {
        return { values: {}, formatted: {}, summary: "", isValid: false };
      }
      areaSqFt = l * w;
      perimeterFt = 2 * (l + w);
      break;
    }
    case "circle": {
      const d = readFt("diameter");
      if (d === null) {
        return { values: {}, formatted: {}, summary: "", isValid: false };
      }
      const r = d / 2;
      areaSqFt = Math.PI * r * r;
      perimeterFt = Math.PI * d;
      break;
    }
    case "triangle": {
      const b = readFt("base");
      const h = readFt("triangleHeight");
      if (b === null || h === null) {
        return { values: {}, formatted: {}, summary: "", isValid: false };
      }
      areaSqFt = 0.5 * b * h;
      // Approximate perimeter for isosceles triangle
      const side = Math.sqrt((b / 2) ** 2 + h ** 2);
      perimeterFt = b + 2 * side;
      break;
    }
    case "trapezoid": {
      const b1 = readFt("base1");
      const b2 = readFt("base2");
      const th = readFt("trapezoidHeight");
      if (b1 === null || b2 === null || th === null) {
        return { values: {}, formatted: {}, summary: "", isValid: false };
      }
      areaSqFt = 0.5 * (b1 + b2) * th;
      // Approximate perimeter (assuming isosceles trapezoid)
      const leg = Math.sqrt(((b2 - b1) / 2) ** 2 + th ** 2);
      perimeterFt = b1 + b2 + 2 * leg;
      break;
    }
    case "lShape": {
      const ml = readFt("mainLength");
      const mw = readFt("mainWidth");
      const cl = readFt("cutoutLength");
      const cw = readFt("cutoutWidth");
      if (ml === null || mw === null || cl === null || cw === null) {
        return { values: {}, formatted: {}, summary: "", isValid: false };
      }
      // Validate: cutout must be smaller than main
      if (cl >= ml || cw >= mw) {
        return { values: {}, formatted: {}, summary: "", isValid: false };
      }
      areaSqFt = ml * mw - cl * cw;
      // L-shape perimeter
      perimeterFt = 2 * (ml + mw);
      break;
    }
    default:
      return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  // Multiply by quantity
  const totalAreaSqFt = areaSqFt * quantity;
  const totalPerimeterFt = perimeterFt * quantity;

  // Convert to other units
  const areaSqM = totalAreaSqFt / 10.7639;
  const areaSqYd = totalAreaSqFt / 9;
  const areaAcres = totalAreaSqFt / 43560;
  const areaSqIn = totalAreaSqFt * 144;

  // Waste calculation
  const wasteMultiplier = 1 + wasteFactor / 100;
  const areaWithWaste = totalAreaSqFt * wasteMultiplier;

  // Cost calculation
  let totalCost = 0;
  let costFormatted = "—";
  if (includeCost && pricePerSqFt && pricePerSqFt > 0) {
    totalCost = areaWithWaste * pricePerSqFt;
    // Get currency symbol
    const curr = fieldUnits?.pricePerSqFt || "USD";
    const SYMBOLS: Record<string, string> = {
      USD: "$", EUR: "€", GBP: "£", MXN: "MX$", BRL: "R$",
      CAD: "C$", AUD: "A$", JPY: "¥", INR: "₹", CHF: "CHF ",
      COP: "COL$", ARS: "AR$", PEN: "S/", CLP: "CLP ",
    };
    const sym = SYMBOLS[curr] || "$";
    costFormatted = `${sym}${fmtNum(totalCost)}`;
  }

  // Perimeter in feet
  const perimeterFormatted = `${fmtNum(totalPerimeterFt)} ${v["ft"] || "ft"}`;

  // Unit labels
  const sqFtLabel = v["sqFt"] || "sq ft";
  const sqMLabel = v["sqM"] || "m²";
  const sqYdLabel = v["sqYd"] || "sq yd";
  const acresLabel = v["acres"] || "acres";

  // Summary
  const f = (t?.formats as Record<string, string>) || {};
  const summaryTemplate =
    f.summary ||
    "The total area is {areaSqFt} sq ft ({areaSqM} m²). With {wasteFactor}% waste factor: {areaWithWaste} sq ft.";
  const summary = summaryTemplate
    .replace("{areaSqFt}", fmtNum(totalAreaSqFt))
    .replace("{areaSqM}", fmtNum(areaSqM))
    .replace("{wasteFactor}", String(wasteFactor))
    .replace("{areaWithWaste}", fmtNum(areaWithWaste));

  return {
    values: {
      areaSqFt: totalAreaSqFt,
      areaSqM: areaSqM,
      areaSqYd: areaSqYd,
      areaAcres: areaAcres,
      areaSqIn: areaSqIn,
      areaWithWaste: areaWithWaste,
      totalCost: totalCost,
      perimeter: totalPerimeterFt,
    },
    formatted: {
      areaSqFt: `${fmtNum(totalAreaSqFt)} ${sqFtLabel}`,
      areaSqM: `${fmtNum(areaSqM)} ${sqMLabel}`,
      areaSqYd: `${fmtNum(areaSqYd)} ${sqYdLabel}`,
      areaAcres: areaAcres >= 0.01 ? `${fmtNum(areaAcres, 4)} ${acresLabel}` : `${areaAcres.toFixed(6)} ${acresLabel}`,
      areaWithWaste: `${fmtNum(areaWithWaste)} ${sqFtLabel}`,
      totalCost: costFormatted,
      perimeter: perimeterFormatted,
    },
    summary,
    isValid: true,
  };
}

export default squareFootageCalculatorConfig;
