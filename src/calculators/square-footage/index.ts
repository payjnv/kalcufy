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
    es: {
      "name": "Calculadora de Pies Cuadrados",
      "slug": "calculadora-pies-cuadrados",
      "subtitle": "Calcula el área de cualquier espacio en pies cuadrados, metros o yardas — para pisos, pintura, paisajismo y proyectos de construcción.",
      "breadcrumb": "Pies Cuadrados",
      "seo": {
        "title": "Calculadora de Pies Cuadrados - Estimador Gratuito de Área y Costos",
        "description": "Calcula pies cuadrados para cualquier forma incluyendo rectángulos, círculos, triángulos, trapecios y formas en L. Estima costos de materiales con factor de desperdicio para pisos, pintura y construcción.",
        "shortDescription": "Calcula área en pies cuadrados para cualquier forma de habitación con estimación de costos.",
        "keywords": [
          "calculadora pies cuadrados",
          "calculadora de pies cuadrados",
          "calculadora de área",
          "calcular pies cuadrados",
          "calculadora m²",
          "calculadora área habitación",
          "calculadora pisos pies cuadrados",
          "calculadora pies cuadrados gratis"
        ]
      },
      "calculator": {
        "yourInformation": "Tu Información"
      },
      "inputs": {
        "shape": {
          "label": "Forma del Área",
          "helpText": "Selecciona la forma del área que quieres medir",
          "options": {
            "rectangle": "Rectángulo",
            "circle": "Círculo",
            "triangle": "Triángulo",
            "trapezoid": "Trapecio",
            "lShape": "Forma en L"
          }
        },
        "length": {
          "label": "Largo",
          "helpText": "La dimensión más larga del rectángulo"
        },
        "width": {
          "label": "Ancho",
          "helpText": "La dimensión más corta del rectángulo"
        },
        "diameter": {
          "label": "Diámetro",
          "helpText": "La distancia a través del círculo completo"
        },
        "base": {
          "label": "Base",
          "helpText": "La base (lado inferior) del triángulo"
        },
        "triangleHeight": {
          "label": "Altura",
          "helpText": "La altura perpendicular desde la base hasta el vértice superior"
        },
        "base1": {
          "label": "Base 1 (Superior)",
          "helpText": "El lado paralelo más corto del trapecio"
        },
        "base2": {
          "label": "Base 2 (Inferior)",
          "helpText": "El lado paralelo más largo del trapecio"
        },
        "trapezoidHeight": {
          "label": "Altura",
          "helpText": "La distancia perpendicular entre los dos lados paralelos"
        },
        "mainLength": {
          "label": "Largo Principal",
          "helpText": "El largo total de la sección más larga de la L"
        },
        "mainWidth": {
          "label": "Ancho Principal",
          "helpText": "El ancho total de la sección más larga de la L"
        },
        "cutoutLength": {
          "label": "Largo del Recorte",
          "helpText": "El largo de la sección de esquina eliminada"
        },
        "cutoutWidth": {
          "label": "Ancho del Recorte",
          "helpText": "El ancho de la sección de esquina eliminada"
        },
        "quantity": {
          "label": "Cantidad",
          "helpText": "Número de áreas idénticas a calcular (ej. múltiples habitaciones)",
          "suffix": "áreas"
        },
        "wasteFactor": {
          "label": "Factor de Desperdicio",
          "helpText": "Material extra para cortes y desperdicio. Estándar: 10% para pisos, 5% para pintura"
        },
        "includeCost": {
          "label": "Incluir Estimación de Costos",
          "helpText": "Habilita para calcular costos de materiales"
        },
        "pricePerSqFt": {
          "label": "Precio por Pie Cuadrado",
          "helpText": "Costo del material por pie cuadrado (ej. pisos, azulejos, cobertura de pintura)"
        }
      },
      "results": {
        "areaSqFt": {
          "label": "Área"
        },
        "areaSqM": {
          "label": "Área (Métrica)"
        },
        "areaSqYd": {
          "label": "Área (Yardas)"
        },
        "areaAcres": {
          "label": "Acres"
        },
        "areaWithWaste": {
          "label": "Con Factor de Desperdicio"
        },
        "totalCost": {
          "label": "Costo Estimado"
        },
        "perimeter": {
          "label": "Perímetro"
        }
      },
      "presets": {
        "bedroom": {
          "label": "Dormitorio",
          "description": "Dormitorio estándar de 12×10 pies"
        },
        "livingRoom": {
          "label": "Sala de Estar",
          "description": "Sala de estar espaciosa de 20×15 pies"
        },
        "circularPatio": {
          "label": "Patio Redondo",
          "description": "Patio circular de 16 pies de diámetro"
        },
        "garage": {
          "label": "Garaje para 2 Autos",
          "description": "Garaje estándar de 24×24 pies"
        },
        "lShapedRoom": {
          "label": "Habitación en Forma de L",
          "description": "Habitación de 20×15 pies con recorte de 8×6 pies"
        }
      },
      "values": {
        "sqFt": "pies²",
        "sqM": "m²",
        "sqYd": "yd²",
        "sqIn": "pulg²",
        "acres": "acres",
        "ft": "pies",
        "m": "m",
        "areas": "áreas"
      },
      "formats": {
        "summary": "El área total es {areaSqFt} pies² ({areaSqM} m²). Con {wasteFactor}% de factor de desperdicio: {areaWithWaste} pies²."
      },
      "infoCards": {
        "metrics": {
          "title": "📊 Medidas de Área",
          "items": [
            {
              "label": "Pies Cuadrados",
              "valueKey": "areaSqFt"
            },
            {
              "label": "Metros Cuadrados",
              "valueKey": "areaSqM"
            },
            {
              "label": "Yardas Cuadradas",
              "valueKey": "areaSqYd"
            },
            {
              "label": "Acres",
              "valueKey": "areaAcres"
            }
          ]
        },
        "details": {
          "title": "📦 Planificación de Materiales",
          "items": [
            {
              "label": "Área Base",
              "valueKey": "areaSqFt"
            },
            {
              "label": "Con Desperdicio",
              "valueKey": "areaWithWaste"
            },
            {
              "label": "Perímetro",
              "valueKey": "perimeter"
            },
            {
              "label": "Costo Estimado",
              "valueKey": "totalCost"
            }
          ]
        },
        "tips": {
          "title": "💡 Consejos de Medición",
          "items": [
            "Siempre mide dos veces y calcula una — pequeños errores se multiplican con las compras de material.",
            "Agrega 10-15% de desperdicio para pisos (cortes, roturas). Usa 5% para pintura. Usa 15-20% para patrones diagonales o espiga.",
            "Para habitaciones irregulares, divide el espacio en formas simples, calcula cada una, luego súmalas.",
            "1 galón de pintura cubre aproximadamente 350-400 pies². Redondea hacia arriba al ordenar."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "¿Qué son los Pies Cuadrados?",
          "content": "Los pies cuadrados (pies²) son una medida de área — la cantidad de espacio bidimensional que ocupa una superficie. Se calcula multiplicando el largo por el ancho cuando ambos se miden en pies. Los pies cuadrados son la unidad estándar para medir habitaciones, casas y propiedades en Estados Unidos, Canadá y Reino Unido. Ya sea que estés comprando pisos, estimando pintura, valuando bienes raíces o planificando un jardín, los cálculos precisos de pies cuadrados son esenciales para presupuestar y ordenar la cantidad correcta de materiales. Un pie cuadrado equivale a un cuadrado de 12 pulgadas por 12 pulgadas, o aproximadamente 0.0929 metros cuadrados."
        },
        "howItWorks": {
          "title": "Cómo Medir Pies Cuadrados",
          "content": "Para medir pies cuadrados, comienza eligiendo la forma que mejor coincida con tu espacio. Para habitaciones rectangulares, simplemente mide el largo y ancho en pies, luego multiplícalos. Para círculos, mide el diámetro y usa la fórmula π × (diámetro/2)². Para triángulos, mide la base y altura, luego calcula ½ × base × altura. Para espacios complejos o irregulares como habitaciones en forma de L, divide el área en formas más simples (rectángulos, triángulos), calcula cada sección por separado y suma los resultados. Siempre mide de pared a pared a nivel del suelo, y convierte todas las medidas a la misma unidad antes de calcular. Al ordenar materiales, agrega un factor de desperdicio (típicamente 10%) para compensar cortes, roturas y ajustes."
        },
        "considerations": {
          "title": "Consideraciones Clave",
          "items": [
            {
              "text": "Las áreas rectangulares usan la fórmula más simple: Largo × Ancho. La mayoría de habitaciones y espacios estándar son rectangulares.",
              "type": "info"
            },
            {
              "text": "Para pisos, agrega 10% de desperdicio para diseños rectos. Los patrones diagonales necesitan 15%, y espiga necesita 20%.",
              "type": "warning"
            },
            {
              "text": "1 acre equivale a 43,560 pies cuadrados. 1 yarda cuadrada equivale a 9 pies cuadrados. 1 metro cuadrado equivale a 10.764 pies cuadrados.",
              "type": "info"
            },
            {
              "text": "Al medir para pintura, calcula el área de la pared (altura × ancho para cada pared) y resta ventanas y puertas.",
              "type": "info"
            },
            {
              "text": "Los pies cuadrados de bienes raíces típicamente incluyen solo espacio habitable terminado con calefacción/refrigeración — no garajes, áticos o sótanos sin terminar.",
              "type": "warning"
            },
            {
              "text": "Siempre redondea hacia arriba los pedidos de materiales — no puedes comprar cajas parciales de azulejos o galones parciales de pintura.",
              "type": "info"
            }
          ]
        },
        "categories": {
          "title": "Fórmulas Comunes de Área",
          "items": [
            {
              "text": "Rectángulo: Área = Largo × Ancho. El cálculo más común para habitaciones y espacios estándar.",
              "type": "info"
            },
            {
              "text": "Círculo: Área = π × r² (donde r = diámetro ÷ 2). Usado para patios, piscinas, canteros y características redondas.",
              "type": "info"
            },
            {
              "text": "Triángulo: Área = ½ × Base × Altura. Común para paredes frontón, secciones de techo y espacios decorativos.",
              "type": "info"
            },
            {
              "text": "Trapecio: Área = ½ × (Base₁ + Base₂) × Altura. Usado para paredes de catedral y formas de lote irregulares.",
              "type": "info"
            },
            {
              "text": "Forma en L: Calcula como un rectángulo completo menos el rectángulo recortado. Común para cocinas y planos abiertos.",
              "type": "info"
            },
            {
              "text": "Formas irregulares: Divide en formas simples, calcula cada una y suma. Siempre sobreestima para materiales.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Ejemplos de Cálculo",
          "description": "Cálculos paso a paso de pies cuadrados",
          "examples": [
            {
              "title": "Piso de Dormitorio (Rectángulo)",
              "steps": [
                "Dimensiones de habitación: 12 pies × 10 pies",
                "Área = 12 × 10 = 120 pies²",
                "Con 10% desperdicio: 120 × 1.10 = 132 pies²",
                "A $3.50/pie²: 132 × $3.50 = $462"
              ],
              "result": "Ordenar 132 pies² de piso — costo total: $462"
            },
            {
              "title": "Patio Circular (Círculo)",
              "steps": [
                "Diámetro del patio: 16 pies → radio = 8 pies",
                "Área = π × 8² = 3.14159 × 64 = 201.06 pies²",
                "Con 15% desperdicio: 201.06 × 1.15 = 231.22 pies²",
                "En metros cuadrados: 201.06 ÷ 10.764 = 18.68 m²"
              ],
              "result": "Área del patio: 201.1 pies² (18.7 m²) — ordenar 232 pies² de adoquines"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "¿Cómo calculo los pies cuadrados de una habitación?",
          "answer": "Mide el largo y ancho de la habitación en pies, luego multiplícalos. Por ejemplo, una habitación de 12 pies de largo y 10 pies de ancho tiene un área de 120 pies cuadrados (12 × 10 = 120). Para habitaciones que no son rectángulos perfectos, divídelas en formas más simples, calcula cada sección y suma los resultados."
        },
        {
          "question": "¿Cuántos pies cuadrados hay en un acre?",
          "answer": "Un acre equivale a 43,560 pies cuadrados. Para convertir pies cuadrados a acres, divide por 43,560. Por ejemplo, un lote de 10,000 pies² es aproximadamente 0.23 acres. Una hectárea equivale aproximadamente a 2.47 acres o 107,639 pies cuadrados."
        },
        {
          "question": "¿Cuánto factor de desperdicio debo agregar para materiales?",
          "answer": "Para pisos de instalación recta (madera, laminado, vinilo), agrega 10%. Para diseños diagonales, agrega 15%. Para patrones espiga o complejos, agrega 20%. Para pintura, 5% usualmente es suficiente. Para azulejos, agrega 10-15% para cortes y roturas. Siempre redondea hacia arriba a la caja o galón completo más cercano."
        },
        {
          "question": "¿Cómo convierto entre pies cuadrados y metros cuadrados?",
          "answer": "Para convertir pies cuadrados a metros cuadrados, divide por 10.764. Para convertir metros cuadrados a pies cuadrados, multiplica por 10.764. Por ejemplo, 200 pies² ÷ 10.764 = 18.58 m², y 50 m² × 10.764 = 538.2 pies²."
        },
        {
          "question": "¿Cómo calculo los pies cuadrados de una habitación en forma de L?",
          "answer": "Imagina la L como un rectángulo completo con una esquina cortada. Calcula el área del rectángulo completo (largo principal × ancho principal), luego resta el área del recorte (largo del recorte × ancho del recorte). Por ejemplo, una habitación de 20×15 con un recorte de 8×6: (20 × 15) - (8 × 6) = 300 - 48 = 252 pies²."
        },
        {
          "question": "¿Cuánto cuesta el piso por pie cuadrado?",
          "answer": "Los costos de pisos varían ampliamente: vinilo/laminado cuesta $1-5/pie², madera $5-15/pie², azulejos $2-20/pie², y alfombra $1-8/pie² (solo materiales). La instalación agrega $2-8/pie² dependiendo del material y complejidad. Siempre calcula el área total con factor de desperdicio antes de obtener cotizaciones."
        }
      ],
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
      "name": "Calculadora de Metragem Quadrada",
      "slug": "calculadora-metragem-quadrada",
      "subtitle": "Calcule a área de qualquer espaço em pés quadrados, metros ou jardas — para projetos de piso, pintura, paisagismo e construção.",
      "breadcrumb": "Metragem Quadrada",
      "seo": {
        "title": "Calculadora de Metragem Quadrada - Estimador Gratuito de Área e Custo",
        "description": "Calcule metragem quadrada para qualquer formato incluindo retângulos, círculos, triângulos, trapézios e formas em L. Estime custos de materiais com fator de desperdício para pisos, pintura e construção.",
        "shortDescription": "Calcule área em pés quadrados para qualquer formato de ambiente com estimativa de custo.",
        "keywords": [
          "calculadora metragem quadrada",
          "calculadora pés quadrados",
          "calculadora de área",
          "calcular metragem quadrada",
          "calculadora m²",
          "calculadora área do cômodo",
          "calculadora piso metros quadrados",
          "calculadora metragem quadrada grátis"
        ]
      },
      "calculator": {
        "yourInformation": "Suas Informações"
      },
      "inputs": {
        "shape": {
          "label": "Formato da Área",
          "helpText": "Selecione o formato da área que você deseja medir",
          "options": {
            "rectangle": "Retângulo",
            "circle": "Círculo",
            "triangle": "Triângulo",
            "trapezoid": "Trapézio",
            "lShape": "Formato L"
          }
        },
        "length": {
          "label": "Comprimento",
          "helpText": "A dimensão mais longa do retângulo"
        },
        "width": {
          "label": "Largura",
          "helpText": "A dimensão mais curta do retângulo"
        },
        "diameter": {
          "label": "Diâmetro",
          "helpText": "A distância através do círculo completo"
        },
        "base": {
          "label": "Base",
          "helpText": "A base (lado inferior) do triângulo"
        },
        "triangleHeight": {
          "label": "Altura",
          "helpText": "A altura perpendicular da base ao vértice superior"
        },
        "base1": {
          "label": "Base 1 (Superior)",
          "helpText": "O lado paralelo mais curto do trapézio"
        },
        "base2": {
          "label": "Base 2 (Inferior)",
          "helpText": "O lado paralelo mais longo do trapézio"
        },
        "trapezoidHeight": {
          "label": "Altura",
          "helpText": "A distância perpendicular entre os dois lados paralelos"
        },
        "mainLength": {
          "label": "Comprimento Principal",
          "helpText": "O comprimento total da seção mais longa do L"
        },
        "mainWidth": {
          "label": "Largura Principal",
          "helpText": "A largura total da seção mais longa do L"
        },
        "cutoutLength": {
          "label": "Comprimento do Recorte",
          "helpText": "O comprimento da seção do canto removida"
        },
        "cutoutWidth": {
          "label": "Largura do Recorte",
          "helpText": "A largura da seção do canto removida"
        },
        "quantity": {
          "label": "Quantidade",
          "helpText": "Número de áreas idênticas para calcular (ex.: múltiplos cômodos)",
          "suffix": "áreas"
        },
        "wasteFactor": {
          "label": "Fator de Desperdício",
          "helpText": "Material extra para cortes e desperdício. Padrão: 10% para piso, 5% para tinta"
        },
        "includeCost": {
          "label": "Incluir Estimativa de Custo",
          "helpText": "Habilite para calcular custos de materiais"
        },
        "pricePerSqFt": {
          "label": "Preço por Metro Quadrado",
          "helpText": "Custo do material por metro quadrado (ex.: piso, azulejo, cobertura de tinta)"
        }
      },
      "results": {
        "areaSqFt": {
          "label": "Área"
        },
        "areaSqM": {
          "label": "Área (Métrica)"
        },
        "areaSqYd": {
          "label": "Área (Jardas)"
        },
        "areaAcres": {
          "label": "Acres"
        },
        "areaWithWaste": {
          "label": "Com Fator de Desperdício"
        },
        "totalCost": {
          "label": "Custo Estimado"
        },
        "perimeter": {
          "label": "Perímetro"
        }
      },
      "presets": {
        "bedroom": {
          "label": "Quarto",
          "description": "Quarto padrão de 3,7×3,0 m"
        },
        "livingRoom": {
          "label": "Sala de Estar",
          "description": "Sala de estar espaçosa de 6,1×4,6 m"
        },
        "circularPatio": {
          "label": "Pátio Redondo",
          "description": "Pátio circular de 4,9 m de diâmetro"
        },
        "garage": {
          "label": "Garagem para 2 Carros",
          "description": "Garagem padrão de 7,3×7,3 m"
        },
        "lShapedRoom": {
          "label": "Cômodo em Formato L",
          "description": "Cômodo de 6,1×4,6 m com recorte de 2,4×1,8 m"
        }
      },
      "values": {
        "sqFt": "m²",
        "sqM": "m²",
        "sqYd": "m² (jardas)",
        "sqIn": "cm²",
        "acres": "acres",
        "ft": "m",
        "m": "m",
        "areas": "áreas"
      },
      "formats": {
        "summary": "A área total é {areaSqFt} m² ({areaSqM} m²). Com {wasteFactor}% de fator de desperdício: {areaWithWaste} m²."
      },
      "infoCards": {
        "metrics": {
          "title": "📊 Medidas de Área",
          "items": [
            {
              "label": "Metros Quadrados",
              "valueKey": "areaSqFt"
            },
            {
              "label": "Metros Quadrados (Métrico)",
              "valueKey": "areaSqM"
            },
            {
              "label": "Jardas Quadradas",
              "valueKey": "areaSqYd"
            },
            {
              "label": "Acres",
              "valueKey": "areaAcres"
            }
          ]
        },
        "details": {
          "title": "📦 Planejamento de Materiais",
          "items": [
            {
              "label": "Área Base",
              "valueKey": "areaSqFt"
            },
            {
              "label": "Com Desperdício",
              "valueKey": "areaWithWaste"
            },
            {
              "label": "Perímetro",
              "valueKey": "perimeter"
            },
            {
              "label": "Custo Estimado",
              "valueKey": "totalCost"
            }
          ]
        },
        "tips": {
          "title": "💡 Dicas de Medição",
          "items": [
            "Sempre meça duas vezes e calcule uma — pequenos erros se multiplicam com compras de material.",
            "Adicione 10-15% de desperdício para pisos (cortes, quebras). Use 5% para tinta. Use 15-20% para padrões diagonais ou espinha de peixe.",
            "Para cômodos irregulares, divida o espaço em formas simples, calcule cada uma, depois some tudo.",
            "1 galão de tinta cobre aproximadamente 32-37 m². Arredonde para cima ao fazer pedidos."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "O que é Metragem Quadrada?",
          "content": "Metragem quadrada (m²) é uma medida de área — a quantidade de espaço bidimensional que uma superfície ocupa. É calculada multiplicando comprimento por largura quando ambos são medidos na mesma unidade. A metragem quadrada é a unidade padrão para medir cômodos, casas e propriedades. Seja comprando piso, estimando tinta, precificando imóveis ou planejando um jardim, cálculos precisos de metragem quadrada são essenciais para orçamento e pedido da quantidade correta de materiais. Um metro quadrado equivale a um quadrado de 1 metro por 1 metro."
        },
        "howItWorks": {
          "title": "Como Medir Metragem Quadrada",
          "content": "Para medir metragem quadrada, comece escolhendo o formato que melhor corresponde ao seu espaço. Para cômodos retangulares, simplesmente meça o comprimento e largura em metros, depois multiplique-os. Para círculos, meça o diâmetro e use a fórmula π × (diâmetro/2)². Para triângulos, meça a base e altura, depois calcule ½ × base × altura. Para espaços complexos ou irregulares como cômodos em L, divida a área em formas mais simples (retângulos, triângulos), calcule cada seção separadamente e some os resultados. Sempre meça de parede a parede no nível do chão e converta todas as medidas para a mesma unidade antes de calcular. Ao pedir materiais, adicione um fator de desperdício (normalmente 10%) para compensar cortes, quebras e ajustes."
        },
        "considerations": {
          "title": "Considerações Importantes",
          "items": [
            {
              "text": "Áreas retangulares usam a fórmula mais simples: Comprimento × Largura. A maioria dos cômodos e espaços padrão são retangulares.",
              "type": "info"
            },
            {
              "text": "Para pisos, adicione 10% de desperdício para layouts retos. Padrões diagonais precisam de 15%, e espinha de peixe precisa de 20%.",
              "type": "warning"
            },
            {
              "text": "1 hectare equivale a 10.000 metros quadrados. 1 jarda quadrada equivale a 0,836 metros quadrados.",
              "type": "info"
            },
            {
              "text": "Ao medir para tinta, calcule a área das paredes (altura × largura para cada parede) e subtraia janelas e portas.",
              "type": "info"
            },
            {
              "text": "Metragem quadrada de imóveis normalmente inclui apenas espaços acabados e climatizados — não garagens, sótãos ou porões inacabados.",
              "type": "warning"
            },
            {
              "text": "Sempre arredonde para cima os pedidos de material — você não pode comprar caixas parciais de azulejo ou galões parciais de tinta.",
              "type": "info"
            }
          ]
        },
        "categories": {
          "title": "Fórmulas Comuns de Área",
          "items": [
            {
              "text": "Retângulo: Área = Comprimento × Largura. O cálculo mais comum para cômodos e espaços padrão.",
              "type": "info"
            },
            {
              "text": "Círculo: Área = π × r² (onde r = diâmetro ÷ 2). Usado para pátios, piscinas, canteiros e elementos redondos.",
              "type": "info"
            },
            {
              "text": "Triângulo: Área = ½ × Base × Altura. Comum para paredes de empena, seções de telhado e espaços decorativos.",
              "type": "info"
            },
            {
              "text": "Trapézio: Área = ½ × (Base₁ + Base₂) × Altura. Usado para paredes de catedral e formatos irregulares de lotes.",
              "type": "info"
            },
            {
              "text": "Formato L: Calcule como um retângulo completo menos o retângulo do recorte. Comum para cozinhas e plantas abertas.",
              "type": "info"
            },
            {
              "text": "Formas irregulares: Divida em formas simples, calcule cada uma e some. Sempre superestime para materiais.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemplos de Cálculo",
          "description": "Cálculos passo a passo de metragem quadrada",
          "examples": [
            {
              "title": "Piso de Quarto (Retângulo)",
              "steps": [
                "Dimensões do cômodo: 3,7 m × 3,0 m",
                "Área = 3,7 × 3,0 = 11,1 m²",
                "Com 10% de desperdício: 11,1 × 1,10 = 12,2 m²",
                "A R$ 45,00/m²: 12,2 × R$ 45,00 = R$ 549,00"
              ],
              "result": "Peça 12,2 m² de piso — custo total: R$ 549,00"
            },
            {
              "title": "Pátio Circular (Círculo)",
              "steps": [
                "Diâmetro do pátio: 4,9 m → raio = 2,45 m",
                "Área = π × 2,45² = 3,14159 × 6,0025 = 18,86 m²",
                "Com 15% de desperdício: 18,86 × 1,15 = 21,69 m²",
                "Área final: 18,9 m²"
              ],
              "result": "Área do pátio: 18,9 m² — peça 22 m² de pedras"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Como calcular a metragem quadrada de um cômodo?",
          "answer": "Meça o comprimento e largura do cômodo em metros, depois multiplique-os. Por exemplo, um cômodo de 3,7 metros de comprimento e 3,0 metros de largura tem área de 11,1 metros quadrados (3,7 × 3,0 = 11,1). Para cômodos que não são retângulos perfeitos, divida-os em formas mais simples, calcule cada seção e some os resultados."
        },
        {
          "question": "Quantos metros quadrados há em um hectare?",
          "answer": "Um hectare equivale a 10.000 metros quadrados. Para converter metros quadrados em hectares, divida por 10.000. Por exemplo, um lote de 5.000 m² é aproximadamente 0,5 hectares. Um acre equivale aproximadamente a 4.047 metros quadrados."
        },
        {
          "question": "Quanto fator de desperdício devo adicionar para materiais?",
          "answer": "Para pisos retos (madeira, laminado, vinil), adicione 10%. Para layouts diagonais, adicione 15%. Para padrões espinha de peixe ou complexos, adicione 20%. Para tinta, 5% geralmente é suficiente. Para azulejos, adicione 10-15% para cortes e quebras. Sempre arredonde para cima até a caixa ou galão completo mais próximo."
        },
        {
          "question": "Como converter entre metros quadrados e pés quadrados?",
          "answer": "Para converter metros quadrados em pés quadrados, multiplique por 10,764. Para converter pés quadrados em metros quadrados, divida por 10,764. Por exemplo, 20 m² × 10,764 = 215,28 pés², e 200 pés² ÷ 10,764 = 18,58 m²."
        },
        {
          "question": "Como calcular a metragem quadrada de um cômodo em formato L?",
          "answer": "Imagine o L como um retângulo completo com um canto cortado. Calcule a área do retângulo completo (comprimento principal × largura principal), depois subtraia a área do recorte (comprimento do recorte × largura do recorte). Por exemplo, um cômodo de 6×4,5m com recorte de 2×1,5m: (6 × 4,5) - (2 × 1,5) = 27 - 3 = 24 m²."
        },
        {
          "question": "Quanto custa piso por metro quadrado?",
          "answer": "Os custos de piso variam muito: vinil/laminado custa R$ 20-80/m², madeira R$ 80-250/m², azulejo R$ 30-300/m², e carpete R$ 15-120/m² (somente materiais). A instalação adiciona R$ 25-120/m² dependendo do material e complexidade. Sempre calcule a área total com fator de desperdício antes de pedir orçamentos."
        }
      ],
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
      "name": "Calculateur de Surface en Pieds Carrés",
      "slug": "calculateur-surface-pieds-carres",
      "subtitle": "Calculez la superficie de n'importe quel espace en pieds carrés, mètres ou yards — pour le revêtement de sol, la peinture, l'aménagement paysager et les projets de construction.",
      "breadcrumb": "Surface en Pieds Carrés",
      "seo": {
        "title": "Calculateur de Surface en Pieds Carrés - Estimateur Gratuit de Superficie et Coût",
        "description": "Calculez la superficie en pieds carrés pour toute forme incluant rectangles, cercles, triangles, trapèzes et formes en L. Estimez les coûts de matériaux avec facteur de perte pour revêtements de sol, peinture et construction.",
        "shortDescription": "Calculez la superficie en pieds carrés pour toute forme de pièce avec estimation des coûts.",
        "keywords": [
          "calculateur surface pieds carrés",
          "calculateur pieds carrés",
          "calculateur superficie",
          "calculer pieds carrés",
          "calculateur pi² carré",
          "calculateur superficie pièce",
          "calculateur revêtement sol pieds carrés",
          "calculateur gratuit surface pieds carrés"
        ]
      },
      "calculator": {
        "yourInformation": "Vos Informations"
      },
      "inputs": {
        "shape": {
          "label": "Forme de la Surface",
          "helpText": "Sélectionnez la forme de la surface que vous voulez mesurer",
          "options": {
            "rectangle": "Rectangle",
            "circle": "Cercle",
            "triangle": "Triangle",
            "trapezoid": "Trapèze",
            "lShape": "Forme en L"
          }
        },
        "length": {
          "label": "Longueur",
          "helpText": "La dimension la plus longue du rectangle"
        },
        "width": {
          "label": "Largeur",
          "helpText": "La dimension la plus courte du rectangle"
        },
        "diameter": {
          "label": "Diamètre",
          "helpText": "La distance à travers tout le cercle"
        },
        "base": {
          "label": "Base",
          "helpText": "La base (côté inférieur) du triangle"
        },
        "triangleHeight": {
          "label": "Hauteur",
          "helpText": "La hauteur perpendiculaire de la base au sommet supérieur"
        },
        "base1": {
          "label": "Base 1 (Supérieure)",
          "helpText": "Le côté parallèle le plus court du trapèze"
        },
        "base2": {
          "label": "Base 2 (Inférieure)",
          "helpText": "Le côté parallèle le plus long du trapèze"
        },
        "trapezoidHeight": {
          "label": "Hauteur",
          "helpText": "La distance perpendiculaire entre les deux côtés parallèles"
        },
        "mainLength": {
          "label": "Longueur Principale",
          "helpText": "La longueur totale de la section la plus longue du L"
        },
        "mainWidth": {
          "label": "Largeur Principale",
          "helpText": "La largeur totale de la section la plus longue du L"
        },
        "cutoutLength": {
          "label": "Longueur de la Découpe",
          "helpText": "La longueur de la section de coin retirée"
        },
        "cutoutWidth": {
          "label": "Largeur de la Découpe",
          "helpText": "La largeur de la section de coin retirée"
        },
        "quantity": {
          "label": "Quantité",
          "helpText": "Nombre de surfaces identiques à calculer (ex: plusieurs pièces)",
          "suffix": "surfaces"
        },
        "wasteFactor": {
          "label": "Facteur de Perte",
          "helpText": "Matériel supplémentaire pour les coupes et les pertes. Standard : 10% pour revêtement de sol, 5% pour peinture"
        },
        "includeCost": {
          "label": "Inclure Estimation des Coûts",
          "helpText": "Activez pour calculer les coûts de matériaux"
        },
        "pricePerSqFt": {
          "label": "Prix par Pied Carré",
          "helpText": "Coût du matériau par pied carré (ex: revêtement de sol, carrelage, couverture peinture)"
        }
      },
      "results": {
        "areaSqFt": {
          "label": "Surface"
        },
        "areaSqM": {
          "label": "Surface (Métrique)"
        },
        "areaSqYd": {
          "label": "Surface (Yards)"
        },
        "areaAcres": {
          "label": "Acres"
        },
        "areaWithWaste": {
          "label": "Avec Facteur de Perte"
        },
        "totalCost": {
          "label": "Coût Estimé"
        },
        "perimeter": {
          "label": "Périmètre"
        }
      },
      "presets": {
        "bedroom": {
          "label": "Chambre",
          "description": "Chambre standard 12×10 pieds"
        },
        "livingRoom": {
          "label": "Salon",
          "description": "Salon spacieux 20×15 pieds"
        },
        "circularPatio": {
          "label": "Patio Rond",
          "description": "Patio circulaire de 16 pieds de diamètre"
        },
        "garage": {
          "label": "Garage 2 Voitures",
          "description": "Garage standard 24×24 pieds"
        },
        "lShapedRoom": {
          "label": "Pièce en Forme de L",
          "description": "Pièce 20×15 pieds avec découpe 8×6 pieds"
        }
      },
      "values": {
        "sqFt": "pi² car",
        "sqM": "m²",
        "sqYd": "vg² car",
        "sqIn": "po² car",
        "acres": "acres",
        "ft": "pi",
        "m": "m",
        "areas": "surfaces"
      },
      "formats": {
        "summary": "La surface totale est {areaSqFt} pi² car ({areaSqM} m²). Avec {wasteFactor}% de facteur de perte : {areaWithWaste} pi² car."
      },
      "infoCards": {
        "metrics": {
          "title": "📊 Mesures de Surface",
          "items": [
            {
              "label": "Pieds Carrés",
              "valueKey": "areaSqFt"
            },
            {
              "label": "Mètres Carrés",
              "valueKey": "areaSqM"
            },
            {
              "label": "Yards Carrés",
              "valueKey": "areaSqYd"
            },
            {
              "label": "Acres",
              "valueKey": "areaAcres"
            }
          ]
        },
        "details": {
          "title": "📦 Planification des Matériaux",
          "items": [
            {
              "label": "Surface de Base",
              "valueKey": "areaSqFt"
            },
            {
              "label": "Avec Perte",
              "valueKey": "areaWithWaste"
            },
            {
              "label": "Périmètre",
              "valueKey": "perimeter"
            },
            {
              "label": "Coût Estimé",
              "valueKey": "totalCost"
            }
          ]
        },
        "tips": {
          "title": "💡 Conseils de Mesure",
          "items": [
            "Mesurez toujours deux fois et calculez une fois — les petites erreurs se multiplient avec les achats de matériaux.",
            "Ajoutez 10-15% de perte pour le revêtement de sol (coupes, casse). Utilisez 5% pour la peinture. Utilisez 15-20% pour les motifs diagonaux ou chevrons.",
            "Pour les pièces irrégulières, divisez l'espace en formes simples, calculez chacune, puis additionnez-les.",
            "1 gallon de peinture couvre environ 350-400 pi² car. Arrondissez vers le haut lors de la commande."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Qu'est-ce que la Surface en Pieds Carrés ?",
          "content": "La surface en pieds carrés (pi² car) est une mesure de superficie — la quantité d'espace bidimensionnel qu'occupe une surface. Elle se calcule en multipliant la longueur par la largeur lorsque toutes deux sont mesurées en pieds. La surface en pieds carrés est l'unité standard pour mesurer les pièces, maisons et propriétés aux États-Unis, au Canada et au Royaume-Uni. Que vous achetiez du revêtement de sol, estimiez la peinture, évaluiez l'immobilier ou planifiiez un jardin, des calculs précis de surface en pieds carrés sont essentiels pour budgéter et commander la bonne quantité de matériaux. Un pied carré équivaut à un carré de 12 pouces sur 12 pouces, soit environ 0,0929 mètre carré."
        },
        "howItWorks": {
          "title": "Comment Mesurer la Surface en Pieds Carrés",
          "content": "Pour mesurer la surface en pieds carrés, commencez par choisir la forme qui correspond le mieux à votre espace. Pour les pièces rectangulaires, mesurez simplement la longueur et la largeur en pieds, puis multipliez-les ensemble. Pour les cercles, mesurez le diamètre et utilisez la formule π × (diamètre/2)². Pour les triangles, mesurez la base et la hauteur, puis calculez ½ × base × hauteur. Pour les espaces complexes ou irréguliers comme les pièces en forme de L, divisez la surface en formes plus simples (rectangles, triangles), calculez chaque section séparément et additionnez les résultats. Mesurez toujours de mur à mur au niveau du sol, et convertissez toutes les mesures dans la même unité avant de calculer. Lors de la commande de matériaux, ajoutez un facteur de perte (typiquement 10%) pour tenir compte des coupes, casse et ajustements."
        },
        "considerations": {
          "title": "Considérations Clés",
          "items": [
            {
              "text": "Les surfaces rectangulaires utilisent la formule la plus simple : Longueur × Largeur. La plupart des pièces et espaces standards sont rectangulaires.",
              "type": "info"
            },
            {
              "text": "Pour le revêtement de sol, ajoutez 10% de perte pour les dispositions droites. Les motifs diagonaux nécessitent 15%, et les chevrons 20%.",
              "type": "warning"
            },
            {
              "text": "1 acre équivaut à 43 560 pieds carrés. 1 yard carré équivaut à 9 pieds carrés. 1 mètre carré équivaut à 10,764 pieds carrés.",
              "type": "info"
            },
            {
              "text": "Lors de la mesure pour la peinture, calculez la surface des murs (hauteur × largeur pour chaque mur) et soustrayez les fenêtres et portes.",
              "type": "info"
            },
            {
              "text": "La surface immobilière en pieds carrés inclut typiquement seulement l'espace de vie fini, chauffé/climatisé — pas les garages, greniers ou sous-sols non finis.",
              "type": "warning"
            },
            {
              "text": "Arrondissez toujours vers le haut les commandes de matériaux — vous ne pouvez pas acheter des boîtes partielles de carrelage ou des gallons partiels de peinture.",
              "type": "info"
            }
          ]
        },
        "categories": {
          "title": "Formules de Surface Communes",
          "items": [
            {
              "text": "Rectangle : Surface = Longueur × Largeur. Le calcul le plus courant pour les pièces et espaces standards.",
              "type": "info"
            },
            {
              "text": "Cercle : Surface = π × r² (où r = diamètre ÷ 2). Utilisé pour patios, piscines, parterres de jardin et éléments ronds.",
              "type": "info"
            },
            {
              "text": "Triangle : Surface = ½ × Base × Hauteur. Courant pour les murs pignons, sections de toit et espaces décoratifs.",
              "type": "info"
            },
            {
              "text": "Trapèze : Surface = ½ × (Base₁ + Base₂) × Hauteur. Utilisé pour les murs cathédrale et formes de terrain irrégulières.",
              "type": "info"
            },
            {
              "text": "Forme en L : Calculez comme un rectangle complet moins le rectangle de découpe. Courant pour cuisines et plans ouverts.",
              "type": "info"
            },
            {
              "text": "Formes irrégulières : Divisez en formes simples, calculez chacune, et additionnez. Surestimez toujours pour les matériaux.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemples de Calcul",
          "description": "Calculs de surface en pieds carrés étape par étape",
          "examples": [
            {
              "title": "Revêtement de Sol Chambre (Rectangle)",
              "steps": [
                "Dimensions de la pièce : 12 pi × 10 pi",
                "Surface = 12 × 10 = 120 pi² car",
                "Avec 10% de perte : 120 × 1,10 = 132 pi² car",
                "À 3,50$/pi² car : 132 × 3,50$ = 462$"
              ],
              "result": "Commandez 132 pi² car de revêtement de sol — coût total : 462$"
            },
            {
              "title": "Patio Circulaire (Cercle)",
              "steps": [
                "Diamètre du patio : 16 pi → rayon = 8 pi",
                "Surface = π × 8² = 3,14159 × 64 = 201,06 pi² car",
                "Avec 15% de perte : 201,06 × 1,15 = 231,22 pi² car",
                "En mètres carrés : 201,06 ÷ 10,764 = 18,68 m²"
              ],
              "result": "Surface du patio : 201,1 pi² car (18,7 m²) — commandez 232 pi² car de pavés"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Comment calculer la surface en pieds carrés d'une pièce ?",
          "answer": "Mesurez la longueur et la largeur de la pièce en pieds, puis multipliez-les ensemble. Par exemple, une pièce de 12 pieds de long et 10 pieds de large a une superficie de 120 pieds carrés (12 × 10 = 120). Pour les pièces qui ne sont pas des rectangles parfaits, divisez-les en formes plus simples, calculez chaque section et additionnez les résultats."
        },
        {
          "question": "Combien de pieds carrés y a-t-il dans un acre ?",
          "answer": "Un acre équivaut à 43 560 pieds carrés. Pour convertir les pieds carrés en acres, divisez par 43 560. Par exemple, un terrain de 10 000 pi² car représente environ 0,23 acre. Un hectare équivaut à environ 2,47 acres ou 107 639 pieds carrés."
        },
        {
          "question": "Combien de facteur de perte dois-je ajouter pour les matériaux ?",
          "answer": "Pour le revêtement de sol en pose droite (bois franc, stratifié, vinyle), ajoutez 10%. Pour les dispositions diagonales, ajoutez 15%. Pour les motifs chevrons ou complexes, ajoutez 20%. Pour la peinture, 5% suffit généralement. Pour le carrelage, ajoutez 10-15% pour les coupes et la casse. Arrondissez toujours vers le haut à la boîte ou au gallon complet le plus proche."
        },
        {
          "question": "Comment convertir entre pieds carrés et mètres carrés ?",
          "answer": "Pour convertir les pieds carrés en mètres carrés, divisez par 10,764. Pour convertir les mètres carrés en pieds carrés, multipliez par 10,764. Par exemple, 200 pi² car ÷ 10,764 = 18,58 m², et 50 m² × 10,764 = 538,2 pi² car."
        },
        {
          "question": "Comment calculer la surface en pieds carrés d'une pièce en forme de L ?",
          "answer": "Imaginez le L comme un rectangle complet avec un coin coupé. Calculez la surface du rectangle complet (longueur principale × largeur principale), puis soustrayez la surface de découpe (longueur de découpe × largeur de découpe). Par exemple, une pièce 20×15 avec une découpe 8×6 : (20 × 15) - (8 × 6) = 300 - 48 = 252 pi² car."
        },
        {
          "question": "Combien coûte le revêtement de sol par pied carré ?",
          "answer": "Les coûts de revêtement de sol varient largement : vinyle/stratifié coûte 1-5$/pi² car, bois franc 5-15$/pi² car, carrelage 2-20$/pi² car, et moquette 1-8$/pi² car (matériaux seulement). L'installation ajoute 2-8$/pi² car selon le matériau et la complexité. Calculez toujours la surface totale avec facteur de perte avant d'obtenir des devis."
        }
      ],
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
      "name": "Quadratmeter Rechner",
      "slug": "quadratmeter-rechner",
      "subtitle": "Berechnen Sie die Fläche jedes Raums in Quadratmetern, Quadratfuß oder Quadratyards — für Bodenbeläge, Malerarbeiten, Landschaftsbau und Bauprojekte.",
      "breadcrumb": "Quadratmeter",
      "seo": {
        "title": "Quadratmeter Rechner - Kostenloser Flächen- & Kostenschätzer",
        "description": "Berechnen Sie Quadratmeter für jede Form einschließlich Rechtecke, Kreise, Dreiecke, Trapeze und L-Formen. Schätzen Sie Materialkosten mit Verschnittfaktor für Bodenbeläge, Malerarbeiten und Bauwesen.",
        "shortDescription": "Berechnen Sie Flächen in Quadratmetern für jede Raumform mit Kostenschätzung.",
        "keywords": [
          "quadratmeter rechner",
          "flächenrechner",
          "quadratmeter berechnen",
          "raumfläche rechner",
          "bodenbelag rechner quadratmeter",
          "kostenloser quadratmeter rechner"
        ]
      },
      "calculator": {
        "yourInformation": "Ihre Informationen"
      },
      "inputs": {
        "shape": {
          "label": "Flächenform",
          "helpText": "Wählen Sie die Form der Fläche, die Sie messen möchten",
          "options": {
            "rectangle": "Rechteck",
            "circle": "Kreis",
            "triangle": "Dreieck",
            "trapezoid": "Trapez",
            "lShape": "L-Form"
          }
        },
        "length": {
          "label": "Länge",
          "helpText": "Die längere Abmessung des Rechtecks"
        },
        "width": {
          "label": "Breite",
          "helpText": "Die kürzere Abmessung des Rechtecks"
        },
        "diameter": {
          "label": "Durchmesser",
          "helpText": "Der Abstand quer durch den gesamten Kreis"
        },
        "base": {
          "label": "Grundlinie",
          "helpText": "Die Basis (untere Seite) des Dreiecks"
        },
        "triangleHeight": {
          "label": "Höhe",
          "helpText": "Die senkrechte Höhe von der Basis zur oberen Spitze"
        },
        "base1": {
          "label": "Basis 1 (Oben)",
          "helpText": "Die kürzere parallele Seite des Trapezes"
        },
        "base2": {
          "label": "Basis 2 (Unten)",
          "helpText": "Die längere parallele Seite des Trapezes"
        },
        "trapezoidHeight": {
          "label": "Höhe",
          "helpText": "Der senkrechte Abstand zwischen den beiden parallelen Seiten"
        },
        "mainLength": {
          "label": "Hauptlänge",
          "helpText": "Die Gesamtlänge des längeren Abschnitts des L"
        },
        "mainWidth": {
          "label": "Hauptbreite",
          "helpText": "Die Gesamtbreite des längeren Abschnitts des L"
        },
        "cutoutLength": {
          "label": "Ausschnittlänge",
          "helpText": "Die Länge des entfernten Eckabschnitts"
        },
        "cutoutWidth": {
          "label": "Ausschnittbreite",
          "helpText": "Die Breite des entfernten Eckabschnitts"
        },
        "quantity": {
          "label": "Anzahl",
          "helpText": "Anzahl identischer Flächen zu berechnen (z.B. mehrere Räume)",
          "suffix": "Flächen"
        },
        "wasteFactor": {
          "label": "Verschnittfaktor",
          "helpText": "Zusätzliches Material für Schnitte und Verschnitt. Standard: 10% für Bodenbeläge, 5% für Farbe"
        },
        "includeCost": {
          "label": "Kostenschätzung einbeziehen",
          "helpText": "Aktivieren Sie dies, um Materialkosten zu berechnen"
        },
        "pricePerSqFt": {
          "label": "Preis pro Quadratmeter",
          "helpText": "Materialkosten pro Quadratmeter (z.B. Bodenbelag, Fliesen, Farbabdeckung)"
        }
      },
      "results": {
        "areaSqFt": {
          "label": "Fläche"
        },
        "areaSqM": {
          "label": "Fläche (Metrisch)"
        },
        "areaSqYd": {
          "label": "Fläche (Yards)"
        },
        "areaAcres": {
          "label": "Hektar"
        },
        "areaWithWaste": {
          "label": "Mit Verschnittfaktor"
        },
        "totalCost": {
          "label": "Geschätzte Kosten"
        },
        "perimeter": {
          "label": "Umfang"
        }
      },
      "presets": {
        "bedroom": {
          "label": "Schlafzimmer",
          "description": "Standard 3,7×3,0 m Schlafzimmer"
        },
        "livingRoom": {
          "label": "Wohnzimmer",
          "description": "Geräumiges 6,1×4,6 m Wohnzimmer"
        },
        "circularPatio": {
          "label": "Runde Terrasse",
          "description": "4,9 m Durchmesser kreisförmige Terrasse"
        },
        "garage": {
          "label": "2-Auto-Garage",
          "description": "Standard 7,3×7,3 m Garage"
        },
        "lShapedRoom": {
          "label": "L-förmiger Raum",
          "description": "6,1×4,6 m Raum mit 2,4×1,8 m Ausschnitt"
        }
      },
      "values": {
        "sqFt": "sq ft",
        "sqM": "m²",
        "sqYd": "sq yd",
        "sqIn": "sq in",
        "acres": "ha",
        "ft": "ft",
        "m": "m",
        "areas": "Flächen"
      },
      "formats": {
        "summary": "Die Gesamtfläche beträgt {areaSqFt} sq ft ({areaSqM} m²). Mit {wasteFactor}% Verschnittfaktor: {areaWithWaste} sq ft."
      },
      "infoCards": {
        "metrics": {
          "title": "📊 Flächenmessungen",
          "items": [
            {
              "label": "Quadratfuß",
              "valueKey": "areaSqFt"
            },
            {
              "label": "Quadratmeter",
              "valueKey": "areaSqM"
            },
            {
              "label": "Quadratyards",
              "valueKey": "areaSqYd"
            },
            {
              "label": "Hektar",
              "valueKey": "areaAcres"
            }
          ]
        },
        "details": {
          "title": "📦 Materialplanung",
          "items": [
            {
              "label": "Grundfläche",
              "valueKey": "areaSqFt"
            },
            {
              "label": "Mit Verschnitt",
              "valueKey": "areaWithWaste"
            },
            {
              "label": "Umfang",
              "valueKey": "perimeter"
            },
            {
              "label": "Geschätzte Kosten",
              "valueKey": "totalCost"
            }
          ]
        },
        "tips": {
          "title": "💡 Messtipps",
          "items": [
            "Messen Sie immer zweimal und berechnen Sie einmal — kleine Fehler multiplizieren sich bei Materialkäufen.",
            "Fügen Sie 10-15% Verschnitt für Bodenbeläge hinzu (Schnitte, Bruch). Verwenden Sie 5% für Farbe. Verwenden Sie 15-20% für diagonale oder Fischgrätmuster.",
            "Teilen Sie unregelmäßige Räume in einfache Formen auf, berechnen Sie jede einzeln und addieren Sie sie dann.",
            "1 Liter Farbe deckt etwa 8-10 m² ab. Runden Sie beim Bestellen auf."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Was ist Quadratmeter?",
          "content": "Quadratmeter (m²) ist eine Flächenmessung — die Menge an zweidimensionalem Raum, den eine Oberfläche einnimmt. Es wird berechnet, indem Länge mal Breite multipliziert wird, wenn beide in Metern gemessen werden. Quadratmeter ist die Standardeinheit zur Messung von Räumen, Häusern und Grundstücken in Europa und den meisten Ländern weltweit. Ob Sie Bodenbeläge kaufen, Farbe schätzen, Immobilien bewerten oder einen Garten planen — genaue Quadratmeterberechnungen sind für die Budgetierung und Bestellung der richtigen Materialmenge unerlässlich."
        },
        "howItWorks": {
          "title": "Wie misst man Quadratmeter",
          "content": "Um Quadratmeter zu messen, wählen Sie zuerst die Form aus, die am besten zu Ihrem Raum passt. Für rechteckige Räume messen Sie einfach Länge und Breite in Metern und multiplizieren sie miteinander. Für Kreise messen Sie den Durchmesser und verwenden die Formel π × (Durchmesser/2)². Für Dreiecke messen Sie Basis und Höhe, dann berechnen Sie ½ × Basis × Höhe. Für komplexe oder unregelmäßige Räume wie L-förmige Zimmer teilen Sie die Fläche in einfachere Formen auf, berechnen jeden Abschnitt separat und addieren die Ergebnisse."
        },
        "considerations": {
          "title": "Wichtige Überlegungen",
          "items": [
            {
              "text": "Rechteckige Flächen verwenden die einfachste Formel: Länge × Breite. Die meisten Räume und Standardflächen sind rechteckig.",
              "type": "info"
            },
            {
              "text": "Für Bodenbeläge fügen Sie 10% Verschnitt für gerade Verlegungen hinzu. Diagonale Muster benötigen 15%, Fischgrat 20%.",
              "type": "warning"
            },
            {
              "text": "1 Hektar entspricht 10.000 Quadratmetern. 1 Quadratyard entspricht 0,836 Quadratmetern. 1 Quadratfuß entspricht 0,0929 Quadratmetern.",
              "type": "info"
            },
            {
              "text": "Beim Messen für Farbe berechnen Sie die Wandfläche (Höhe × Breite für jede Wand) und ziehen Fenster und Türen ab.",
              "type": "info"
            },
            {
              "text": "Immobilien-Quadratmeter umfassen typischerweise nur fertige, beheizte/gekühlte Wohnfläche — keine Garagen, Dachböden oder unfertige Keller.",
              "type": "warning"
            },
            {
              "text": "Runden Sie Materialbestellungen immer auf — Sie können keine Teilkartons Fliesen oder Teileimer Farbe kaufen.",
              "type": "info"
            }
          ]
        },
        "categories": {
          "title": "Häufige Flächenformeln",
          "items": [
            {
              "text": "Rechteck: Fläche = Länge × Breite. Die häufigste Berechnung für Räume und Standardflächen.",
              "type": "info"
            },
            {
              "text": "Kreis: Fläche = π × r² (wobei r = Durchmesser ÷ 2). Verwendet für Terrassen, Pools, Gartenbeete und runde Elemente.",
              "type": "info"
            },
            {
              "text": "Dreieck: Fläche = ½ × Basis × Höhe. Üblich für Giebelwände, Dachabschnitte und dekorative Räume.",
              "type": "info"
            },
            {
              "text": "Trapez: Fläche = ½ × (Basis₁ + Basis₂) × Höhe. Verwendet für Kathedralenwände und unregelmäßige Grundstücksformen.",
              "type": "info"
            },
            {
              "text": "L-Form: Berechnen als vollständiges Rechteck minus Ausschnitt-Rechteck. Üblich für Küchen und offene Grundrisse.",
              "type": "info"
            },
            {
              "text": "Unregelmäßige Formen: In einfache Formen aufteilen, jede berechnen und zusammenaddieren. Immer für Materialien überschätzen.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Berechnungsbeispiele",
          "description": "Schritt-für-Schritt Quadratmeterberechnungen",
          "examples": [
            {
              "title": "Schlafzimmer Bodenbelag (Rechteck)",
              "steps": [
                "Raumabmessungen: 3,7 m × 3,0 m",
                "Fläche = 3,7 × 3,0 = 11,1 m²",
                "Mit 10% Verschnitt: 11,1 × 1,10 = 12,2 m²",
                "Bei 25€/m²: 12,2 × 25€ = 305€"
              ],
              "result": "Bestellen Sie 12,2 m² Bodenbelag — Gesamtkosten: 305€"
            },
            {
              "title": "Runde Terrasse (Kreis)",
              "steps": [
                "Terrassen-Durchmesser: 4,9 m → Radius = 2,45 m",
                "Fläche = π × 2,45² = 3,14159 × 6,0 = 18,9 m²",
                "Mit 15% Verschnitt: 18,9 × 1,15 = 21,7 m²",
                "In Quadratfuß: 18,9 × 10,764 = 203,4 sq ft"
              ],
              "result": "Terrassenfläche: 18,9 m² (203,4 sq ft) — bestellen Sie 21,7 m² Pflastersteine"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Wie berechne ich die Quadratmeter eines Raums?",
          "answer": "Messen Sie Länge und Breite des Raums in Metern und multiplizieren Sie sie miteinander. Zum Beispiel hat ein Raum, der 3,7 Meter lang und 3,0 Meter breit ist, eine Fläche von 11,1 Quadratmetern (3,7 × 3,0 = 11,1). Für Räume, die keine perfekten Rechtecke sind, teilen Sie sie in einfachere Formen auf, berechnen jeden Abschnitt und addieren die Ergebnisse."
        },
        {
          "question": "Wie viele Quadratmeter hat ein Hektar?",
          "answer": "Ein Hektar entspricht 10.000 Quadratmetern. Um Quadratmeter in Hektar umzuwandeln, teilen Sie durch 10.000. Zum Beispiel entspricht ein 5.000 m² Grundstück 0,5 Hektar. Ein Acre entspricht etwa 0,405 Hektar oder 4.047 Quadratmetern."
        },
        {
          "question": "Wie viel Verschnittfaktor sollte ich für Materialien hinzufügen?",
          "answer": "Für gerade verlegte Bodenbeläge (Parkett, Laminat, Vinyl) fügen Sie 10% hinzu. Für diagonale Verlegungen 15% hinzufügen. Für Fischgrät- oder komplexe Muster 20% hinzufügen. Für Farbe reichen normalerweise 5% aus. Für Fliesen 10-15% für Schnitte und Bruch hinzufügen. Runden Sie immer auf den nächsten vollen Karton oder Eimer auf."
        },
        {
          "question": "Wie konvertiere ich zwischen Quadratmetern und Quadratfuß?",
          "answer": "Um Quadratfuß in Quadratmeter umzuwandeln, teilen Sie durch 10,764. Um Quadratmeter in Quadratfuß umzuwandeln, multiplizieren Sie mit 10,764. Zum Beispiel: 200 sq ft ÷ 10,764 = 18,58 m², und 50 m² × 10,764 = 538,2 sq ft."
        },
        {
          "question": "Wie berechne ich die Quadratmeter eines L-förmigen Raums?",
          "answer": "Stellen Sie sich das L als vollständiges Rechteck mit einer ausgeschnittenen Ecke vor. Berechnen Sie die Fläche des vollständigen Rechtecks (Hauptlänge × Hauptbreite) und ziehen dann die Ausschnittfläche ab (Ausschnittlänge × Ausschnittbreite). Zum Beispiel: ein 6,1×4,6 m Raum mit einem 2,4×1,8 m Ausschnitt: (6,1 × 4,6) - (2,4 × 1,8) = 28,1 - 4,3 = 23,8 m²."
        },
        {
          "question": "Wie viel kostet Bodenbelag pro Quadratmeter?",
          "answer": "Bodenbelagskosten variieren stark: Vinyl/Laminat kostet 10-50€/m², Parkett 50-150€/m², Fliesen 20-200€/m² und Teppich 10-80€/m² (nur Material). Installation fügt 20-80€/m² hinzu, je nach Material und Komplexität. Berechnen Sie immer die Gesamtfläche mit Verschnittfaktor, bevor Sie Angebote einholen."
        }
      ],
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
