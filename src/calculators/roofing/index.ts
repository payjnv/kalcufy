import type {
  CalculatorConfigV4,
  CalculatorResults,
} from "@/engine/v4/types/engine.types";

export const roofingCalculatorConfig: CalculatorConfigV4 = {
  id: "roofing-calculator",
  version: "4.0",
  category: "home",
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
    },
    {
      id: "hipRoof",
      icon: "🏘️",
      values: {
        roofType: "hip",
        houseLength: 55,
        houseWidth: 30,
        roofPitch: "5",
        overhang: 1.5,
        materialType: "metal",
        wasteFactor: 15,
        includeCost: true,
        costPerSquareFoot: 8,
      },
    },
    {
      id: "shedGarage",
      icon: "🏚️",
      values: {
        roofType: "shed",
        houseLength: 24,
        houseWidth: 24,
        roofPitch: "3",
        overhang: 1,
        materialType: "asphalt",
        wasteFactor: 10,
        includeCost: false,
        costPerSquareFoot: null,
      },
    },
  ],

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
        hipRoof: {
          label: "Hip Roof",
          description: "55×30 ft hip roof, 5/12 pitch",
        },
        shedGarage: {
          label: "Shed/Garage",
          description: "24×24 ft shed roof, 3/12 pitch",
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
    es: {
      "name": "Calculadora de Techado",
      "slug": "calculadora-techado",
      "subtitle": "Estima el área de tu techo, materiales necesarios y costo del proyecto basado en dimensiones e inclinación del techo.",
      "breadcrumb": "Techado",
      "seo": {
        "title": "Calculadora de Techado - Estima Área y Materiales Gratis",
        "description": "Calcula el área de tu techo y materiales necesarios para cualquier proyecto de techado. Ingresa dimensiones e inclinación para obtener estimados de tejas, cuadros y costos al instante.",
        "shortDescription": "Estima área del techo, materiales y costo para tu proyecto.",
        "keywords": [
          "calculadora de techado",
          "calculadora área de techo",
          "metros cuadrados de techo",
          "calculadora material de techo",
          "cuántas tejas necesito",
          "calculadora inclinación de techo",
          "calculadora techado gratis",
          "estimador costo de techo"
        ]
      },
      "calculator": {
        "yourInformation": "Tu Información"
      },
      "inputs": {
        "roofType": {
          "label": "Tipo de Techo",
          "helpText": "Selecciona el estilo de tu techo",
          "options": {
            "gable": "A Dos Aguas",
            "hip": "A Cuatro Aguas",
            "flat": "Plano",
            "shed": "Cobertizo"
          }
        },
        "houseLength": {
          "label": "Largo de la Casa",
          "helpText": "El largo de tu casa (lado más largo)"
        },
        "houseWidth": {
          "label": "Ancho de la Casa",
          "helpText": "El ancho de tu casa (lado más corto)"
        },
        "roofPitch": {
          "label": "Inclinación del Techo",
          "helpText": "Elevación por cada 12 pulgadas de recorrido horizontal (ej. 6/12 significa 6 pulgadas de elevación por pie)",
          "options": {
            "1": "1/12",
            "2": "2/12",
            "3": "3/12 (Pendiente Baja)",
            "4": "4/12",
            "5": "5/12",
            "6": "6/12 (Estándar)",
            "7": "7/12",
            "8": "8/12",
            "9": "9/12 (Empinado)",
            "10": "10/12",
            "11": "11/12",
            "12": "12/12 (45°)",
            "14": "14/12",
            "16": "16/12",
            "18": "18/12 (Muy Empinado)",
            "0.5": "½/12 (Casi Plano)"
          }
        },
        "overhang": {
          "label": "Alero Volado",
          "helpText": "Qué tanto se extiende el techo más allá de las paredes de la casa en cada lado"
        },
        "materialType": {
          "label": "Material del Techo",
          "helpText": "El tipo de material que planeas usar",
          "options": {
            "asphalt": "Tejas de Asfalto",
            "metal": "Techo de Metal",
            "tile": "Teja de Arcilla/Concreto",
            "wood": "Tejas de Madera",
            "slate": "Pizarra",
            "membrane": "Membrana (TPO/EPDM)"
          }
        },
        "wasteFactor": {
          "label": "Factor de Desperdicio",
          "helpText": "Material extra para cortes y desperdicio. 10% para techos simples, 15% para techos complejos con canaletas"
        },
        "includeCost": {
          "label": "Incluir Estimado de Costo",
          "helpText": "Habilitar para calcular costos del proyecto"
        },
        "costPerSquareFoot": {
          "label": "Costo por Pie Cuadrado",
          "helpText": "Costo de material + mano de obra por pie cuadrado (típico: $3-$15 dependiendo del material)"
        }
      },
      "results": {
        "roofArea": {
          "label": "Área del Techo"
        },
        "roofAreaMetric": {
          "label": "Área del Techo (Métrica)"
        },
        "roofSquares": {
          "label": "Cuadros de Techado"
        },
        "bundlesNeeded": {
          "label": "Paquetes Necesarios"
        },
        "ridgeCap": {
          "label": "Caballete"
        },
        "dripEdge": {
          "label": "Gotero"
        },
        "estimatedCost": {
          "label": "Costo Estimado"
        }
      },
      "presets": {
        "smallRanch": {
          "label": "Rancho Pequeño",
          "description": "Techo a dos aguas 40×25 pies, inclinación 4/12"
        },
        "twoStoryColonial": {
          "label": "Colonial",
          "description": "Techo a dos aguas 50×30 pies, inclinación 6/12"
        },
        "modernFlat": {
          "label": "Moderno Plano",
          "description": "Techo plano 45×35 pies, membrana"
        },
        "hipRoof": {
          "label": "Techo a Cuatro Aguas",
          "description": "Techo a cuatro aguas 55×30 pies, inclinación 5/12"
        },
        "shedGarage": {
          "label": "Cobertizo/Garaje",
          "description": "Techo cobertizo 24×24 pies, inclinación 3/12"
        }
      },
      "values": {
        "sqFt": "pies²",
        "sqM": "m²",
        "ft": "pies",
        "squares": "cuadros",
        "bundles": "paquetes",
        "linearFt": "pies lineales"
      },
      "formats": {
        "summary": "El área de tu techo es {area}. Necesitas aproximadamente {squares} cuadros de techado ({bundles} paquetes de tejas)."
      },
      "infoCards": {
        "metrics": {
          "title": "📊 Medidas del Techo",
          "items": [
            {
              "label": "Área del Techo",
              "valueKey": "roofArea"
            },
            {
              "label": "Área (Métrica)",
              "valueKey": "roofAreaMetric"
            },
            {
              "label": "Cuadros de Techado",
              "valueKey": "roofSquares"
            },
            {
              "label": "Paquetes Necesarios",
              "valueKey": "bundlesNeeded"
            }
          ]
        },
        "details": {
          "title": "📦 Estimados de Material",
          "items": [
            {
              "label": "Caballete",
              "valueKey": "ridgeCap"
            },
            {
              "label": "Gotero",
              "valueKey": "dripEdge"
            },
            {
              "label": "Desperdicio Incluido",
              "valueKey": "wasteIncluded"
            },
            {
              "label": "Costo Estimado",
              "valueKey": "estimatedCost"
            }
          ]
        },
        "tips": {
          "title": "💡 Consejos de Techado",
          "items": [
            "Siempre ordena 10-15% material extra para cortes, desperdicio y reparaciones futuras. Techos complejos con canaletas necesitan más margen de desperdicio.",
            "La inclinación del techo afecta significativamente el área total — un techo con inclinación 12/12 tiene 41% más área superficial que el mismo espacio con techo plano.",
            "Un cuadro de techado = 100 pies². Tres paquetes de tejas estándar cubren un cuadro. Siempre redondea hacia arriba al ordenar.",
            "Considera contratar un profesional para inclinaciones superiores a 8/12 — techos empinados requieren equipo de seguridad especial y experiencia."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "¿Qué es una Calculadora de Techado?",
          "content": "Una calculadora de techado ayuda a propietarios y contratistas a estimar el área total de la superficie del techo y los materiales necesarios para un proyecto de techado. A diferencia de la huella de la casa (área del piso), el área real del techo es más grande debido a la pendiente o inclinación del techo. Esta calculadora considera el tipo de techo, inclinación, volado y factor de desperdicio para darte estimados precisos de materiales incluyendo tejas, paquetes, caballete y gotero. Conocer el área real de tu techo es esencial para ordenar la cantidad correcta de materiales y obtener cotizaciones precisas de contratistas."
        },
        "howItWorks": {
          "title": "Cómo se Calcula el Área del Techo",
          "content": "La calculadora comienza con la huella de tu casa (largo × ancho), agrega el volado del alero en todos los lados, luego aplica un multiplicador de inclinación para convertir de área plana a área inclinada real. El multiplicador de inclinación viene de la fórmula: √(1 + (elevación/12)²). Por ejemplo, una inclinación 6/12 tiene un multiplicador de 1.118, significando que el techo es aproximadamente 12% más grande que la huella. Para techos a cuatro aguas, un factor adicional de 1.10× considera el área superficial extra de los cuatro lados inclinados. La calculadora luego convierte el área total en cuadros de techado (1 cuadro = 100 pies²) y estima paquetes, caballete y longitudes de gotero."
        },
        "considerations": {
          "title": "Consideraciones Importantes",
          "items": [
            {
              "text": "La complejidad del techo afecta el desperdicio — techos a dos aguas simples necesitan 10% de desperdicio, mientras que techos complejos con buhardillas, canaletas y múltiples cuatro aguas pueden necesitar 15-20%.",
              "type": "warning"
            },
            {
              "text": "El peso del material importa — las tejas de asfalto pesan 2-4 lbs/pie², mientras que las tejas pueden pesar 8-12 lbs/pie². Verifica que tu estructura pueda soportar el material elegido.",
              "type": "warning"
            },
            {
              "text": "Inclinaciones empinadas (superiores a 8/12) requieren equipo de seguridad adicional y pueden aumentar los costos de mano de obra en 25-50%.",
              "type": "info"
            },
            {
              "text": "No olvides el revestimiento, destellos, ventilaciones y protección hielo/agua en climas fríos — estos agregan 10-15% a los costos de material más allá del techado mismo.",
              "type": "info"
            },
            {
              "text": "El techado de metal y tejas tienen vidas útiles más largas (40-100 años) comparado con asfalto (15-30 años), lo que puede compensar su mayor costo inicial.",
              "type": "info"
            },
            {
              "text": "Los códigos de construcción locales pueden restringir ciertos materiales o requerir métodos de instalación específicos. Consulta con tu departamento de construcción antes de comprar.",
              "type": "warning"
            }
          ]
        },
        "categories": {
          "title": "Comparación de Materiales de Techado",
          "items": [
            {
              "text": "Tejas de Asfalto — Más populares (80% de hogares en EE.UU.). Costo: $3-$5/pie² instalado. Vida útil: 15-30 años. Fácil de instalar y reparar.",
              "type": "info"
            },
            {
              "text": "Techado de Metal — Paneles de costura alzada o corrugados. Costo: $7-$15/pie² instalado. Vida útil: 40-70 años. Excelente para resistencia a nieve y fuego.",
              "type": "info"
            },
            {
              "text": "Teja de Arcilla/Concreto — Estilos mediterráneo y español. Costo: $8-$15/pie² instalado. Vida útil: 50-100 años. Muy pesado, requiere estructura fuerte.",
              "type": "info"
            },
            {
              "text": "Tejas de Madera — Cedro o secuoya natural. Costo: $6-$10/pie² instalado. Vida útil: 20-40 años. Hermoso pero requiere más mantenimiento.",
              "type": "info"
            },
            {
              "text": "Pizarra — Piedra natural premium. Costo: $15-$30/pie² instalado. Vida útil: 75-200 años. Extremadamente duradero y elegante pero muy caro.",
              "type": "info"
            },
            {
              "text": "Membrana (TPO/EPDM) — Para techos planos o de baja inclinación. Costo: $4-$8/pie² instalado. Vida útil: 20-30 años. Impermeable y eficiente energéticamente.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Ejemplos de Cálculo",
          "description": "Cálculos paso a paso del área del techo",
          "examples": [
            {
              "title": "Techo a Dos Aguas Estándar (40×25 pies, inclinación 6/12)",
              "steps": [
                "Huella de la casa: 40 × 25 = 1,000 pies²",
                "Agregar 1 pie de volado en cada lado: (40+2) × (25+2) = 42 × 27 = 1,134 pies²",
                "Multiplicador de inclinación para 6/12: √(1 + (6/12)²) = √1.25 = 1.118",
                "Área del techo: 1,134 × 1.118 = 1,268 pies²",
                "Agregar 10% desperdicio: 1,268 × 1.10 = 1,395 pies²"
              ],
              "result": "Necesitas 13.95 ≈ 14 cuadros de techado (42 paquetes de tejas)"
            },
            {
              "title": "Techo a Cuatro Aguas (50×30 pies, inclinación 5/12)",
              "steps": [
                "Huella de la casa: 50 × 30 = 1,500 pies²",
                "Agregar 1.5 pies de volado: (50+3) × (30+3) = 53 × 33 = 1,749 pies²",
                "Multiplicador de inclinación para 5/12: √(1 + (5/12)²) = √1.1736 = 1.083",
                "Factor de cuatro aguas: × 1.10 (10% extra por geometría de cuatro aguas)",
                "Área del techo: 1,749 × 1.083 × 1.10 = 2,083 pies²"
              ],
              "result": "Necesitas 20.83 ≈ 21 cuadros de techado (63 paquetes de tejas)"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "¿Qué es un cuadro de techado?",
          "answer": "Un cuadro de techado es una unidad de medida igual a 100 pies cuadrados de área de techo. Los contratistas y proveedores usan cuadros para estimar y cotizar proyectos de techado. Por ejemplo, un techo de 2,000 pies² equivale a 20 cuadros. Las tejas de asfalto estándar vienen en paquetes, con 3 paquetes cubriendo un cuadro."
        },
        {
          "question": "¿Cómo afecta la inclinación del techo la cantidad de material que necesito?",
          "answer": "La inclinación del techo aumenta el área superficial real comparado con la huella plana. Una inclinación 4/12 agrega aproximadamente 5.4% más área, una inclinación 6/12 agrega 11.8%, una inclinación 8/12 agrega 20.2%, y una inclinación 12/12 (45°) agrega 41.4%. Techos más empinados requieren significativamente más material y son más caros de instalar debido a la mayor dificultad laboral."
        },
        {
          "question": "¿Cuánto factor de desperdicio debo usar?",
          "answer": "Para un techo simple a dos aguas o cobertizo, usa 10% de desperdicio. Para techos con canaletas, buhardillas o geometría compleja, usa 15%. Para techos muy complejos con múltiples ángulos y penetraciones (tragaluces, chimeneas), usa 15-20%. Siempre es mejor tener material extra que quedarse corto a mitad del proyecto."
        },
        {
          "question": "¿Cuál es la diferencia entre techos a dos aguas, cuatro aguas, planos y cobertizo?",
          "answer": "Un techo a dos aguas tiene dos lados inclinados que se encuentran en una cumbrera — es el tipo más común. Un techo a cuatro aguas tiene cuatro lados inclinados que se encuentran en una cumbrera, proporcionando mejor resistencia al viento. Un techo plano tiene inclinación mínima (solo lo suficiente para drenaje) y es común en edificios modernos y comerciales. Un techo cobertizo tiene una sola superficie inclinada y es común para adiciones, garajes y porches."
        },
        {
          "question": "¿Cómo mido la inclinación de mi techo?",
          "answer": "El método más seguro es medir desde tu ático. Coloca un nivel horizontalmente contra una viga, marca 12 pulgadas a lo largo del nivel, luego mide la distancia vertical desde esa marca de 12 pulgadas hacia abajo hasta la viga. Esta medida vertical es tu elevación de inclinación. Por ejemplo, si mide 6 pulgadas, tu inclinación es 6/12. También puedes usar un medidor de inclinación o app de smartphone desde afuera."
        },
        {
          "question": "¿Cuánto cuesta típicamente un techo nuevo?",
          "answer": "Los costos de reemplazo de techo varían ampliamente basado en tamaño, material, inclinación y ubicación. Los costos promedio en EE.UU. van de $5,000-$12,000 para tejas de asfalto en una casa estándar (techo de 1,500-2,500 pies²). El techado de metal cuesta $10,000-$25,000, y materiales premium como pizarra pueden exceder $30,000. Inclinaciones empinadas, múltiples pisos y líneas de techo complejas aumentan los costos laborales."
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
      "name": "Calculadora de Telhado",
      "slug": "calculadora-telhado",
      "subtitle": "Estime a área do seu telhado, materiais necessários e custo do projeto com base nas dimensões e inclinação do telhado.",
      "breadcrumb": "Telhado",
      "seo": {
        "title": "Calculadora de Telhado - Estime Área do Telhado e Materiais Grátis",
        "description": "Calcule a área do seu telhado e materiais necessários para qualquer projeto de cobertura. Insira dimensões e inclinação para obter telhas, quadrados e estimativas de custo instantaneamente.",
        "shortDescription": "Estime área do telhado, materiais e custo para seu projeto.",
        "keywords": [
          "calculadora de telhado",
          "calculadora área telhado",
          "metragem quadrada telhado",
          "calculadora material telhado",
          "quantas telhas preciso",
          "calculadora inclinação telhado",
          "calculadora telhado grátis",
          "estimador custo telhado"
        ]
      },
      "calculator": {
        "yourInformation": "Suas Informações"
      },
      "inputs": {
        "roofType": {
          "label": "Tipo de Telhado",
          "helpText": "Selecione o estilo do seu telhado",
          "options": {
            "gable": "Duas Águas",
            "hip": "Quatro Águas",
            "flat": "Plano",
            "shed": "Uma Água"
          }
        },
        "houseLength": {
          "label": "Comprimento da Casa",
          "helpText": "O comprimento da sua casa (lado mais longo)"
        },
        "houseWidth": {
          "label": "Largura da Casa",
          "helpText": "A largura da sua casa (lado mais curto)"
        },
        "roofPitch": {
          "label": "Inclinação do Telhado",
          "helpText": "Elevação por 12 polegadas de extensão horizontal (ex: 6/12 significa 6 polegadas de elevação por pé)",
          "options": {
            "1": "1/12",
            "2": "2/12",
            "3": "3/12 (Baixa Inclinação)",
            "4": "4/12",
            "5": "5/12",
            "6": "6/12 (Padrão)",
            "7": "7/12",
            "8": "8/12",
            "9": "9/12 (Íngreme)",
            "10": "10/12",
            "11": "11/12",
            "12": "12/12 (45°)",
            "14": "14/12",
            "16": "16/12",
            "18": "18/12 (Muito Íngreme)",
            "0.5": "½/12 (Quase Plano)"
          }
        },
        "overhang": {
          "label": "Beiral",
          "helpText": "Quanto o telhado se estende além das paredes da casa em cada lado"
        },
        "materialType": {
          "label": "Material do Telhado",
          "helpText": "O tipo de material que você planeja usar",
          "options": {
            "asphalt": "Telhas Asfálticas",
            "metal": "Cobertura Metálica",
            "tile": "Telha de Barro/Concreto",
            "wood": "Ripas de Madeira",
            "slate": "Ardósia",
            "membrane": "Membrana (TPO/EPDM)"
          }
        },
        "wasteFactor": {
          "label": "Fator de Desperdício",
          "helpText": "Material extra para cortes e desperdício. 10% para telhados simples, 15% para telhados complexos com calhas"
        },
        "includeCost": {
          "label": "Incluir Estimativa de Custo",
          "helpText": "Ativar para calcular custos do projeto"
        },
        "costPerSquareFoot": {
          "label": "Custo por Metro Quadrado",
          "helpText": "Custo de material + mão de obra por metro quadrado (típico: R$30-R$150 dependendo do material)"
        }
      },
      "results": {
        "roofArea": {
          "label": "Área do Telhado"
        },
        "roofAreaMetric": {
          "label": "Área do Telhado (Métrico)"
        },
        "roofSquares": {
          "label": "Quadrados de Cobertura"
        },
        "bundlesNeeded": {
          "label": "Pacotes Necessários"
        },
        "ridgeCap": {
          "label": "Cumeeira"
        },
        "dripEdge": {
          "label": "Pingadeira"
        },
        "estimatedCost": {
          "label": "Custo Estimado"
        }
      },
      "presets": {
        "smallRanch": {
          "label": "Casa Térrea Pequena",
          "description": "Telhado duas águas 12×7,5 m, inclinação 4/12"
        },
        "twoStoryColonial": {
          "label": "Colonial",
          "description": "Telhado duas águas 15×9 m, inclinação 6/12"
        },
        "modernFlat": {
          "label": "Moderno Plano",
          "description": "Telhado plano 14×11 m, membrana"
        },
        "hipRoof": {
          "label": "Telhado Quatro Águas",
          "description": "Telhado quatro águas 17×9 m, inclinação 5/12"
        },
        "shedGarage": {
          "label": "Galpão/Garagem",
          "description": "Telhado uma água 7×7 m, inclinação 3/12"
        }
      },
      "values": {
        "sqFt": "m²",
        "sqM": "m²",
        "ft": "m",
        "squares": "quadrados",
        "bundles": "pacotes",
        "linearFt": "metros lineares"
      },
      "formats": {
        "summary": "A área do seu telhado é {area}. Você precisa de aproximadamente {squares} quadrados de cobertura ({bundles} pacotes de telhas)."
      },
      "infoCards": {
        "metrics": {
          "title": "📊 Medições do Telhado",
          "items": [
            {
              "label": "Área do Telhado",
              "valueKey": "roofArea"
            },
            {
              "label": "Área (Métrico)",
              "valueKey": "roofAreaMetric"
            },
            {
              "label": "Quadrados de Cobertura",
              "valueKey": "roofSquares"
            },
            {
              "label": "Pacotes Necessários",
              "valueKey": "bundlesNeeded"
            }
          ]
        },
        "details": {
          "title": "📦 Estimativas de Material",
          "items": [
            {
              "label": "Cumeeira",
              "valueKey": "ridgeCap"
            },
            {
              "label": "Pingadeira",
              "valueKey": "dripEdge"
            },
            {
              "label": "Desperdício Incluído",
              "valueKey": "wasteIncluded"
            },
            {
              "label": "Custo Estimado",
              "valueKey": "estimatedCost"
            }
          ]
        },
        "tips": {
          "title": "💡 Dicas de Telhado",
          "items": [
            "Sempre peça 10-15% de material extra para cortes, desperdício e reparos futuros. Telhados complexos com calhas precisam de mais margem de desperdício.",
            "A inclinação do telhado afeta significativamente a área total — um telhado com inclinação 12/12 tem 41% mais área de superfície do que a mesma base com telhado plano.",
            "Um quadrado de cobertura = 10 m². Três pacotes de telhas padrão cobrem um quadrado. Sempre arredonde para cima ao fazer o pedido.",
            "Considere contratar um profissional para inclinações acima de 8/12 — telhados íngremes requerem equipamentos de segurança especiais e experiência."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "O que é uma Calculadora de Telhado?",
          "content": "Uma calculadora de telhado ajuda proprietários e empreiteiros a estimar a área total da superfície do telhado e materiais necessários para um projeto de cobertura. Diferente da área da casa (área do piso), a área real do telhado é maior devido à inclinação do telhado. Esta calculadora considera o tipo de telhado, inclinação, beiral e fator de desperdício para dar estimativas precisas de materiais incluindo telhas, pacotes, cumeeira e pingadeira. Conhecer a área real do seu telhado é essencial para pedir a quantidade certa de materiais e obter orçamentos precisos de empreiteiros."
        },
        "howItWorks": {
          "title": "Como a Área do Telhado é Calculada",
          "content": "A calculadora começa com a base da sua casa (comprimento × largura), adiciona o beiral em todos os lados, então aplica um multiplicador de inclinação para converter da área plana para a área inclinada real. O multiplicador de inclinação vem da fórmula: √(1 + (elevação/12)²). Por exemplo, uma inclinação 6/12 tem um multiplicador de 1,118, significando que o telhado é cerca de 12% maior que a base. Para telhados quatro águas, um fator adicional de 1,10× considera a área extra das quatro superfícies inclinadas. A calculadora então converte a área total em quadrados de cobertura (1 quadrado = 10 m²) e estima pacotes, cumeeira e comprimentos de pingadeira."
        },
        "considerations": {
          "title": "Considerações Importantes",
          "items": [
            {
              "text": "A complexidade do telhado afeta o desperdício — telhados simples de duas águas precisam de 10% de desperdício, enquanto telhados complexos com mansardas, calhas e múltiplas águas podem precisar de 15-20%.",
              "type": "warning"
            },
            {
              "text": "O peso do material importa — telhas asfálticas pesam 10-20 kg/m², enquanto telhas de barro podem pesar 40-60 kg/m². Verifique se sua estrutura pode suportar o material escolhido.",
              "type": "warning"
            },
            {
              "text": "Inclinações íngremes (acima de 8/12) requerem equipamentos de segurança adicionais e podem aumentar os custos de mão de obra em 25-50%.",
              "type": "info"
            },
            {
              "text": "Não esqueça da manta asfáltica, rufos, ventilação e proteção contra gelo em climas frios — estes adicionam 10-15% aos custos de material além da própria cobertura.",
              "type": "info"
            },
            {
              "text": "Cobertura metálica e telhas têm vida útil mais longa (40-100 anos) comparado ao asfalto (15-30 anos), o que pode compensar seu custo inicial mais alto.",
              "type": "info"
            },
            {
              "text": "Códigos de construção locais podem restringir certos materiais ou requerer métodos específicos de instalação. Consulte o departamento de obras antes de comprar.",
              "type": "warning"
            }
          ]
        },
        "categories": {
          "title": "Comparação de Materiais de Cobertura",
          "items": [
            {
              "text": "Telhas Asfálticas — Mais populares (80% das casas brasileiras). Custo: R$30-R$50/m² instalado. Vida útil: 15-30 anos. Fácil de instalar e reparar.",
              "type": "info"
            },
            {
              "text": "Cobertura Metálica — Painéis zipados ou ondulados. Custo: R$70-R$150/m² instalado. Vida útil: 40-70 anos. Excelente para resistência à neve e fogo.",
              "type": "info"
            },
            {
              "text": "Telha de Barro/Concreto — Estilos mediterrâneo e colonial. Custo: R$80-R$150/m² instalado. Vida útil: 50-100 anos. Muito pesada, requer estrutura forte.",
              "type": "info"
            },
            {
              "text": "Ripas de Madeira — Cedro ou madeira de lei natural. Custo: R$60-R$100/m² instalado. Vida útil: 20-40 anos. Bonita mas requer mais manutenção.",
              "type": "info"
            },
            {
              "text": "Ardósia — Pedra natural premium. Custo: R$150-R$300/m² instalado. Vida útil: 75-200 anos. Extremamente durável e elegante mas muito cara.",
              "type": "info"
            },
            {
              "text": "Membrana (TPO/EPDM) — Para telhados planos ou baixa inclinação. Custo: R$40-R$80/m² instalado. Vida útil: 20-30 anos. Impermeável e eficiente energeticamente.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemplos de Cálculo",
          "description": "Cálculos passo a passo de área de telhado",
          "examples": [
            {
              "title": "Telhado Duas Águas Padrão (12×7,5 m, inclinação 6/12)",
              "steps": [
                "Base da casa: 12 × 7,5 = 90 m²",
                "Adicionar beiral de 0,3 m em cada lado: (12+0,6) × (7,5+0,6) = 12,6 × 8,1 = 102 m²",
                "Multiplicador de inclinação para 6/12: √(1 + (6/12)²) = √1,25 = 1,118",
                "Área do telhado: 102 × 1,118 = 114 m²",
                "Adicionar 10% desperdício: 114 × 1,10 = 125 m²"
              ],
              "result": "Você precisa de 12,5 ≈ 13 quadrados de cobertura (39 pacotes de telhas)"
            },
            {
              "title": "Telhado Quatro Águas (15×9 m, inclinação 5/12)",
              "steps": [
                "Base da casa: 15 × 9 = 135 m²",
                "Adicionar beiral de 0,45 m: (15+0,9) × (9+0,9) = 15,9 × 9,9 = 157 m²",
                "Multiplicador de inclinação para 5/12: √(1 + (5/12)²) = √1,1736 = 1,083",
                "Fator quatro águas: × 1,10 (10% extra para geometria quatro águas)",
                "Área do telhado: 157 × 1,083 × 1,10 = 187 m²"
              ],
              "result": "Você precisa de 18,7 ≈ 19 quadrados de cobertura (57 pacotes de telhas)"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "O que é um quadrado de cobertura?",
          "answer": "Um quadrado de cobertura é uma unidade de medida igual a 10 metros quadrados de área de telhado. Empreiteiros e fornecedores usam quadrados para estimar e precificar projetos de cobertura. Por exemplo, um telhado de 200 m² equivale a 20 quadrados. Telhas asfálticas padrão vêm em pacotes, com 3 pacotes cobrindo um quadrado."
        },
        {
          "question": "Como a inclinação do telhado afeta a quantidade de material que preciso?",
          "answer": "A inclinação do telhado aumenta a área real da superfície comparada à base plana. Uma inclinação 4/12 adiciona cerca de 5,4% mais área, uma inclinação 6/12 adiciona 11,8%, uma inclinação 8/12 adiciona 20,2%, e uma inclinação 12/12 (45°) adiciona 41,4%. Telhados mais íngremes requerem significativamente mais material e são mais caros de instalar devido à maior dificuldade de mão de obra."
        },
        {
          "question": "Quanto fator de desperdício devo usar?",
          "answer": "Para um telhado simples de duas águas ou uma água, use 10% de desperdício. Para telhados com calhas, mansardas ou geometria complexa, use 15%. Para telhados muito complexos com múltiplos ângulos e penetrações (claraboias, chaminés), use 15-20%. É sempre melhor ter material extra do que faltar no meio do projeto."
        },
        {
          "question": "Qual a diferença entre telhados duas águas, quatro águas, plano e uma água?",
          "answer": "Um telhado duas águas tem dois lados inclinados encontrando-se numa cumeeira — é o tipo mais comum. Um telhado quatro águas tem quatro lados inclinados encontrando-se numa cumeeira, proporcionando melhor resistência ao vento. Um telhado plano tem inclinação mínima (apenas o suficiente para drenagem) e é comum em edifícios modernos e comerciais. Um telhado uma água tem uma única superfície inclinada e é comum para anexos, garagens e varandas."
        },
        {
          "question": "Como meço a inclinação do meu telhado?",
          "answer": "O método mais seguro é medir do seu sótão. Coloque um nível horizontalmente contra uma viga, marque 30 cm ao longo do nível, então meça a distância vertical dessa marca de 30 cm até a viga. Esta medida vertical é sua elevação de inclinação. Por exemplo, se medir 15 cm, sua inclinação é 15/30 ou 6/12. Você também pode usar um medidor de inclinação ou aplicativo de smartphone do lado externo."
        },
        {
          "question": "Quanto custa tipicamente um telhado novo?",
          "answer": "Os custos de substituição de telhado variam amplamente baseados no tamanho, material, inclinação e localização. Custos médios no Brasil variam de R$15.000-R$40.000 para telhas asfálticas numa casa padrão (150-250 m² de telhado). Cobertura metálica custa R$25.000-R$75.000, e materiais premium como ardósia podem exceder R$100.000. Inclinações íngremes, múltiplos andares e linhas de telhado complexas aumentam os custos de mão de obra."
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
      "name": "Calculateur de Toiture",
      "slug": "calculateur-toiture",
      "subtitle": "Estimez la surface de votre toit, les matériaux nécessaires et le coût du projet selon les dimensions et la pente du toit.",
      "breadcrumb": "Toiture",
      "seo": {
        "title": "Calculateur de Toiture - Estimez la Surface et Matériaux Gratuit",
        "description": "Calculez la surface de votre toit et les matériaux nécessaires pour tout projet de toiture. Entrez les dimensions et la pente pour obtenir instantanément les estimations de bardeaux, carrés et coûts.",
        "shortDescription": "Estimez la surface, les matériaux et le coût pour votre projet de toiture.",
        "keywords": [
          "calculateur toiture",
          "calculateur surface toit",
          "superficie toit",
          "calculateur matériaux toiture",
          "combien de bardeaux nécessaires",
          "calculateur pente toit",
          "calculateur toiture gratuit",
          "estimateur coût toit"
        ]
      },
      "inputs": {
        "roofType": {
          "label": "Type de Toit",
          "helpText": "Sélectionnez le style de votre toit",
          "options": {
            "gable": "Pignon",
            "hip": "Croupe",
            "flat": "Plat",
            "shed": "Appentis"
          }
        },
        "houseLength": {
          "label": "Longueur de la Maison",
          "helpText": "La longueur de votre maison (côté le plus long)"
        },
        "houseWidth": {
          "label": "Largeur de la Maison",
          "helpText": "La largeur de votre maison (côté le plus court)"
        },
        "roofPitch": {
          "label": "Pente du Toit",
          "helpText": "Élévation par 12 pouces de course horizontale (ex: 6/12 signifie 6 pouces d'élévation par pied)",
          "options": {
            "1": "1/12",
            "2": "2/12",
            "3": "3/12 (Pente Faible)",
            "4": "4/12",
            "5": "5/12",
            "6": "6/12 (Standard)",
            "7": "7/12",
            "8": "8/12",
            "9": "9/12 (Raide)",
            "10": "10/12",
            "11": "11/12",
            "12": "12/12 (45°)",
            "14": "14/12",
            "16": "16/12",
            "18": "18/12 (Très Raide)",
            "0.5": "½/12 (Presque Plat)"
          }
        },
        "overhang": {
          "label": "Débord d'Avant-toit",
          "helpText": "Distance de débordement du toit au-delà des murs de la maison de chaque côté"
        },
        "materialType": {
          "label": "Matériau de Toiture",
          "helpText": "Le type de matériau que vous prévoyez utiliser",
          "options": {
            "asphalt": "Bardeaux d'Asphalte",
            "metal": "Toiture Métallique",
            "tile": "Tuile Argile/Béton",
            "wood": "Bardeaux de Bois",
            "slate": "Ardoise",
            "membrane": "Membrane (TPO/EPDM)"
          }
        },
        "wasteFactor": {
          "label": "Facteur de Perte",
          "helpText": "Matériau supplémentaire pour les coupes et pertes. 10% pour toits simples, 15% pour toits complexes avec noues"
        },
        "includeCost": {
          "label": "Inclure Estimation de Coût",
          "helpText": "Activer pour calculer les coûts du projet"
        },
        "costPerSquareFoot": {
          "label": "Coût par Pied Carré",
          "helpText": "Coût matériau + main d'œuvre par pied carré (typique: 3$-15$ selon le matériau)"
        }
      },
      "results": {
        "roofArea": {
          "label": "Surface du Toit"
        },
        "roofAreaMetric": {
          "label": "Surface du Toit (Métrique)"
        },
        "roofSquares": {
          "label": "Carrés de Toiture"
        },
        "bundlesNeeded": {
          "label": "Bottes Nécessaires"
        },
        "ridgeCap": {
          "label": "Faîtière"
        },
        "dripEdge": {
          "label": "Larmier"
        },
        "estimatedCost": {
          "label": "Coût Estimé"
        }
      },
      "presets": {
        "smallRanch": {
          "label": "Petit Ranch",
          "description": "Toit pignon 40×25 pi, pente 4/12"
        },
        "twoStoryColonial": {
          "label": "Colonial",
          "description": "Toit pignon 50×30 pi, pente 6/12"
        },
        "modernFlat": {
          "label": "Moderne Plat",
          "description": "Toit plat 45×35 pi, membrane"
        },
        "hipRoof": {
          "label": "Toit en Croupe",
          "description": "Toit croupe 55×30 pi, pente 5/12"
        },
        "shedGarage": {
          "label": "Appentis/Garage",
          "description": "Toit appentis 24×24 pi, pente 3/12"
        }
      },
      "values": {
        "sqFt": "pi²",
        "sqM": "m²",
        "ft": "pi",
        "squares": "carrés",
        "bundles": "bottes",
        "linearFt": "pi linéaire"
      },
      "formats": {
        "summary": "La surface de votre toit est {area}. Vous avez besoin d'environ {squares} carrés de toiture ({bundles} bottes de bardeaux)."
      },
      "infoCards": {
        "metrics": {
          "title": "📊 Mesures du Toit",
          "items": [
            {
              "label": "Surface du Toit",
              "valueKey": "roofArea"
            },
            {
              "label": "Surface (Métrique)",
              "valueKey": "roofAreaMetric"
            },
            {
              "label": "Carrés de Toiture",
              "valueKey": "roofSquares"
            },
            {
              "label": "Bottes Nécessaires",
              "valueKey": "bundlesNeeded"
            }
          ]
        },
        "details": {
          "title": "📦 Estimations de Matériaux",
          "items": [
            {
              "label": "Faîtière",
              "valueKey": "ridgeCap"
            },
            {
              "label": "Larmier",
              "valueKey": "dripEdge"
            },
            {
              "label": "Perte Incluse",
              "valueKey": "wasteIncluded"
            },
            {
              "label": "Coût Estimé",
              "valueKey": "estimatedCost"
            }
          ]
        },
        "tips": {
          "title": "💡 Conseils de Toiture",
          "items": [
            "Commandez toujours 10-15% de matériau supplémentaire pour les coupes, pertes et réparations futures. Les toits complexes avec noues nécessitent plus de marge.",
            "La pente du toit affecte significativement la surface totale — un toit 12/12 a 41% plus de surface qu'un toit plat de même emprise.",
            "Un carré de toiture = 100 pi². Trois bottes de bardeaux standard couvrent un carré. Arrondissez toujours vers le haut lors de la commande.",
            "Considérez faire appel à un professionnel pour les pentes au-dessus de 8/12 — les toits raides nécessitent un équipement de sécurité spécialisé et de l'expérience."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Qu'est-ce qu'un Calculateur de Toiture ?",
          "content": "Un calculateur de toiture aide les propriétaires et entrepreneurs à estimer la surface totale du toit et les matériaux nécessaires pour un projet de toiture. Contrairement à l'emprise de la maison (surface au sol), la surface réelle du toit est plus grande à cause de la pente ou inclinaison du toit. Ce calculateur tient compte du type de toit, de la pente, du débord et du facteur de perte pour donner des estimations précises de matériaux incluant bardeaux, bottes, faîtière et larmier. Connaître la vraie surface de votre toit est essentiel pour commander la bonne quantité de matériaux et obtenir des devis précis d'entrepreneurs."
        },
        "howItWorks": {
          "title": "Comment la Surface du Toit est Calculée",
          "content": "Le calculateur commence avec l'emprise de votre maison (longueur × largeur), ajoute le débord d'avant-toit sur tous les côtés, puis applique un multiplicateur de pente pour convertir de la surface plane à la surface inclinée réelle. Le multiplicateur de pente provient de la formule : √(1 + (élévation/12)²). Par exemple, une pente 6/12 a un multiplicateur de 1,118, signifiant que le toit est environ 12% plus grand que l'emprise. Pour les toits en croupe, un facteur additionnel de 1,10× compte pour la surface supplémentaire des quatre côtés inclinés. Le calculateur convertit ensuite la surface totale en carrés de toiture (1 carré = 100 pi²) et estime les bottes, faîtière et longueurs de larmier."
        },
        "considerations": {
          "title": "Considérations Importantes",
          "items": [
            {
              "text": "La complexité du toit affecte les pertes — les toits pignon simples nécessitent 10% de perte, tandis que les toits complexes avec lucarnes, noues et multiples croupes peuvent nécessiter 15-20%.",
              "type": "warning"
            },
            {
              "text": "Le poids du matériau compte — les bardeaux d'asphalte pèsent 2-4 lb/pi², tandis que les tuiles peuvent peser 8-12 lb/pi². Vérifiez que votre structure peut supporter le matériau choisi.",
              "type": "warning"
            },
            {
              "text": "Les pentes raides (au-dessus de 8/12) nécessitent un équipement de sécurité supplémentaire et peuvent augmenter les coûts de main d'œuvre de 25-50%.",
              "type": "info"
            },
            {
              "text": "N'oubliez pas la sous-couche, les solins, ventilations et membrane étanche dans les climats froids — ceux-ci ajoutent 10-15% aux coûts de matériaux au-delà de la toiture elle-même.",
              "type": "info"
            },
            {
              "text": "La toiture métallique et les tuiles ont des durées de vie plus longues (40-100 ans) comparé à l'asphalte (15-30 ans), ce qui peut compenser leur coût initial plus élevé.",
              "type": "info"
            },
            {
              "text": "Les codes du bâtiment locaux peuvent restreindre certains matériaux ou exiger des méthodes d'installation spécifiques. Vérifiez avec votre service du bâtiment avant l'achat.",
              "type": "warning"
            }
          ]
        },
        "categories": {
          "title": "Comparaison des Matériaux de Toiture",
          "items": [
            {
              "text": "Bardeaux d'Asphalte — Les plus populaires (80% des maisons US). Coût : 3$-5$/pi² installé. Durée : 15-30 ans. Facile à installer et réparer.",
              "type": "info"
            },
            {
              "text": "Toiture Métallique — Panneaux à joint debout ou ondulés. Coût : 7$-15$/pi² installé. Durée : 40-70 ans. Excellent pour la résistance à la neige et au feu.",
              "type": "info"
            },
            {
              "text": "Tuile Argile/Béton — Styles méditerranéen et espagnol. Coût : 8$-15$/pi² installé. Durée : 50-100 ans. Très lourd, nécessite une structure solide.",
              "type": "info"
            },
            {
              "text": "Bardeaux de Bois — Cèdre ou séquoia naturel. Coût : 6$-10$/pi² installé. Durée : 20-40 ans. Beau mais nécessite plus d'entretien.",
              "type": "info"
            },
            {
              "text": "Ardoise — Pierre naturelle haut de gamme. Coût : 15$-30$/pi² installé. Durée : 75-200 ans. Extrêmement durable et élégant mais très coûteux.",
              "type": "info"
            },
            {
              "text": "Membrane (TPO/EPDM) — Pour toits plats ou à faible pente. Coût : 4$-8$/pi² installé. Durée : 20-30 ans. Imperméable et écoénergétique.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemples de Calculs",
          "description": "Calculs de surface de toit étape par étape",
          "examples": [
            {
              "title": "Toit Pignon Standard (40×25 pi, pente 6/12)",
              "steps": [
                "Emprise maison : 40 × 25 = 1 000 pi²",
                "Ajouter 1 pi débord de chaque côté : (40+2) × (25+2) = 42 × 27 = 1 134 pi²",
                "Multiplicateur pente pour 6/12 : √(1 + (6/12)²) = √1,25 = 1,118",
                "Surface toit : 1 134 × 1,118 = 1 268 pi²",
                "Ajouter 10% perte : 1 268 × 1,10 = 1 395 pi²"
              ],
              "result": "Vous avez besoin de 13,95 ≈ 14 carrés de toiture (42 bottes de bardeaux)"
            },
            {
              "title": "Toit en Croupe (50×30 pi, pente 5/12)",
              "steps": [
                "Emprise maison : 50 × 30 = 1 500 pi²",
                "Ajouter 1,5 pi débord : (50+3) × (30+3) = 53 × 33 = 1 749 pi²",
                "Multiplicateur pente pour 5/12 : √(1 + (5/12)²) = √1,1736 = 1,083",
                "Facteur croupe : × 1,10 (10% supplémentaire pour géométrie croupe)",
                "Surface toit : 1 749 × 1,083 × 1,10 = 2 083 pi²"
              ],
              "result": "Vous avez besoin de 20,83 ≈ 21 carrés de toiture (63 bottes de bardeaux)"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Qu'est-ce qu'un carré de toiture ?",
          "answer": "Un carré de toiture est une unité de mesure égale à 100 pieds carrés de surface de toit. Les entrepreneurs et fournisseurs utilisent les carrés pour estimer et évaluer les projets de toiture. Par exemple, un toit de 2 000 pi² équivaut à 20 carrés. Les bardeaux d'asphalte standard viennent en bottes, avec 3 bottes couvrant un carré."
        },
        {
          "question": "Comment la pente du toit affecte-t-elle la quantité de matériau nécessaire ?",
          "answer": "La pente du toit augmente la surface réelle comparée à l'emprise plate. Une pente 4/12 ajoute environ 5,4% plus de surface, une pente 6/12 ajoute 11,8%, une pente 8/12 ajoute 20,2%, et une pente 12/12 (45°) ajoute 41,4%. Les toits plus raides nécessitent significativement plus de matériau et sont plus coûteux à installer due à la difficulté accrue de main d'œuvre."
        },
        {
          "question": "Quel facteur de perte devrais-je utiliser ?",
          "answer": "Pour un toit pignon ou appentis simple, utilisez 10% de perte. Pour les toits avec noues, lucarnes ou géométrie complexe, utilisez 15%. Pour les toits très complexes avec multiples angles et perforations (puits de lumière, cheminées), utilisez 15-20%. Il vaut toujours mieux avoir du matériau supplémentaire que d'en manquer en cours de projet."
        },
        {
          "question": "Quelle est la différence entre les toits pignon, croupe, plat et appentis ?",
          "answer": "Un toit pignon a deux côtés inclinés se rejoignant à un faîte — c'est le type le plus commun. Un toit en croupe a quatre côtés inclinés se rejoignant à un faîte, offrant une meilleure résistance au vent. Un toit plat a une pente minimale (juste assez pour drainage) et est commun sur les bâtiments modernes et commerciaux. Un toit appentis a une seule surface inclinée et est commun pour ajouts, garages et porches."
        },
        {
          "question": "Comment mesurer la pente de mon toit ?",
          "answer": "La méthode la plus sûre est de mesurer depuis votre grenier. Placez un niveau horizontalement contre un chevron, marquez 12 pouces le long du niveau, puis mesurez la distance verticale de cette marque de 12 pouces vers le bas jusqu'au chevron. Cette mesure verticale est l'élévation de votre pente. Par exemple, si elle mesure 6 pouces, votre pente est 6/12. Vous pouvez aussi utiliser une jauge de pente ou une app de téléphone depuis l'extérieur."
        },
        {
          "question": "Combien coûte typiquement un nouveau toit ?",
          "answer": "Les coûts de remplacement de toit varient largement selon la taille, matériau, pente et emplacement. Les coûts moyens aux États-Unis varient de 5 000$-12 000$ pour bardeaux d'asphalte sur une maison standard (toit 1 500-2 500 pi²). La toiture métallique coûte 10 000$-25 000$, et les matériaux haut de gamme comme l'ardoise peuvent dépasser 30 000$. Les pentes raides, multiples étages et lignes de toit complexes augmentent les coûts de main d'œuvre."
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
      },
      "calculator": {
        "yourInformation": "Vos Informations"
      }
    },
    de: {
      "name": "Dachflächen-Rechner",
      "slug": "dachflaechen-rechner",
      "subtitle": "Schätzen Sie Ihre Dachfläche, benötigte Materialien und Projektkosten basierend auf Abmessungen und Dachneigung.",
      "breadcrumb": "Dachflächen",
      "seo": {
        "title": "Dachflächen-Rechner - Dachfläche & Materialien kostenlos schätzen",
        "description": "Berechnen Sie Ihre Dachfläche und benötigte Materialien für jedes Dachprojekt. Geben Sie Abmessungen und Neigung ein, um sofort Schindeln, Quadrate und Kostenschätzungen zu erhalten.",
        "shortDescription": "Schätzen Sie Dachfläche, Materialien und Kosten für Ihr Projekt.",
        "keywords": [
          "dachflächen rechner",
          "dachfläche berechnen",
          "dach quadratmeter",
          "dachmaterial rechner",
          "wie viele dachziegel brauche ich",
          "dachneigung rechner",
          "kostenloser dachrechner",
          "dachkosten schätzer"
        ]
      },
      "inputs": {
        "roofType": {
          "label": "Dachtyp",
          "helpText": "Wählen Sie den Stil Ihres Dachs",
          "options": {
            "gable": "Satteldach",
            "hip": "Walmdach",
            "flat": "Flachdach",
            "shed": "Pultdach"
          }
        },
        "houseLength": {
          "label": "Hauslänge",
          "helpText": "Die Länge Ihres Hauses (längste Seite)"
        },
        "houseWidth": {
          "label": "Hausbreite",
          "helpText": "Die Breite Ihres Hauses (kürzeste Seite)"
        },
        "roofPitch": {
          "label": "Dachneigung",
          "helpText": "Anstieg pro 12 Zoll horizontalem Verlauf (z.B. 6/12 bedeutet 6 Zoll Anstieg pro Fuß)",
          "options": {
            "1": "1/12",
            "2": "2/12",
            "3": "3/12 (Geringe Neigung)",
            "4": "4/12",
            "5": "5/12",
            "6": "6/12 (Standard)",
            "7": "7/12",
            "8": "8/12",
            "9": "9/12 (Steil)",
            "10": "10/12",
            "11": "11/12",
            "12": "12/12 (45°)",
            "14": "14/12",
            "16": "16/12",
            "18": "18/12 (Sehr steil)",
            "0.5": "½/12 (Fast flach)"
          }
        },
        "overhang": {
          "label": "Dachüberstand",
          "helpText": "Wie weit das Dach über die Hauswände auf jeder Seite hinausragt"
        },
        "materialType": {
          "label": "Dachmaterial",
          "helpText": "Die Art des Materials, das Sie verwenden möchten",
          "options": {
            "asphalt": "Asphaltschindeln",
            "metal": "Metalldach",
            "tile": "Ton-/Betonziegel",
            "wood": "Holzschindeln",
            "slate": "Schiefer",
            "membrane": "Membrane (TPO/EPDM)"
          }
        },
        "wasteFactor": {
          "label": "Verschnittfaktor",
          "helpText": "Zusätzliches Material für Schnitte und Verschnitt. 10% für einfache Dächer, 15% für komplexe Dächer mit Kehlen"
        },
        "includeCost": {
          "label": "Kostenschätzung einbeziehen",
          "helpText": "Aktivieren, um Projektkosten zu berechnen"
        },
        "costPerSquareFoot": {
          "label": "Kosten pro Quadratfuß",
          "helpText": "Material + Arbeitskosten pro Quadratfuß (typisch: $3-$15 je nach Material)"
        }
      },
      "results": {
        "roofArea": {
          "label": "Dachfläche"
        },
        "roofAreaMetric": {
          "label": "Dachfläche (Metrisch)"
        },
        "roofSquares": {
          "label": "Dachquadrate"
        },
        "bundlesNeeded": {
          "label": "Benötigte Bündel"
        },
        "ridgeCap": {
          "label": "Firstabdeckung"
        },
        "dripEdge": {
          "label": "Tropfkante"
        },
        "estimatedCost": {
          "label": "Geschätzte Kosten"
        }
      },
      "presets": {
        "smallRanch": {
          "label": "Kleiner Bungalow",
          "description": "40×25 ft Satteldach, 4/12 Neigung"
        },
        "twoStoryColonial": {
          "label": "Kolonialstil",
          "description": "50×30 ft Satteldach, 6/12 Neigung"
        },
        "modernFlat": {
          "label": "Modernes Flachdach",
          "description": "45×35 ft Flachdach, Membrane"
        },
        "hipRoof": {
          "label": "Walmdach",
          "description": "55×30 ft Walmdach, 5/12 Neigung"
        },
        "shedGarage": {
          "label": "Schuppen/Garage",
          "description": "24×24 ft Pultdach, 3/12 Neigung"
        }
      },
      "values": {
        "sqFt": "sq ft",
        "sqM": "m²",
        "ft": "ft",
        "squares": "Quadrate",
        "bundles": "Bündel",
        "linearFt": "laufende ft"
      },
      "formats": {
        "summary": "Ihre Dachfläche beträgt {area}. Sie benötigen etwa {squares} Dachquadrate ({bundles} Schindelbündel)."
      },
      "infoCards": {
        "metrics": {
          "title": "📊 Dachmessungen",
          "items": [
            {
              "label": "Dachfläche",
              "valueKey": "roofArea"
            },
            {
              "label": "Fläche (Metrisch)",
              "valueKey": "roofAreaMetric"
            },
            {
              "label": "Dachquadrate",
              "valueKey": "roofSquares"
            },
            {
              "label": "Benötigte Bündel",
              "valueKey": "bundlesNeeded"
            }
          ]
        },
        "details": {
          "title": "📦 Materialschätzungen",
          "items": [
            {
              "label": "Firstabdeckung",
              "valueKey": "ridgeCap"
            },
            {
              "label": "Tropfkante",
              "valueKey": "dripEdge"
            },
            {
              "label": "Verschnitt inbegriffen",
              "valueKey": "wasteIncluded"
            },
            {
              "label": "Geschätzte Kosten",
              "valueKey": "estimatedCost"
            }
          ]
        },
        "tips": {
          "title": "💡 Dachtipps",
          "items": [
            "Bestellen Sie immer 10-15% zusätzliches Material für Schnitte, Verschnitt und zukünftige Reparaturen. Komplexe Dächer mit Kehlen benötigen mehr Verschnittzugabe.",
            "Die Dachneigung beeinflusst die Gesamtfläche erheblich — ein 12/12-Neigungsdach hat 41% mehr Oberfläche als die gleiche Grundfläche mit einem Flachdach.",
            "Ein Dachquadrat = 100 sq ft. Drei Bündel Standardschindeln decken ein Quadrat ab. Runden Sie beim Bestellen immer auf.",
            "Ziehen Sie einen Fachmann für Neigungen über 8/12 in Betracht — steile Dächer erfordern spezielle Sicherheitsausrüstung und Erfahrung."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Was ist ein Dachflächen-Rechner?",
          "content": "Ein Dachflächen-Rechner hilft Hausbesitzern und Auftragnehmern, die gesamte Dachoberfläche und benötigte Materialien für ein Dachprojekt zu schätzen. Anders als die Hausgrundfläche ist die tatsächliche Dachfläche größer aufgrund der Dachneigung oder -steigung. Dieser Rechner berücksichtigt Dachtyp, Neigung, Überstand und Verschnittfaktor, um genaue Materialschätzungen einschließlich Schindeln, Bündeln, Firstabdeckung und Tropfkante zu geben. Die wahre Dachfläche zu kennen ist entscheidend für die Bestellung der richtigen Materialmenge und genaue Angebote von Auftragnehmern."
        },
        "howItWorks": {
          "title": "Wie die Dachfläche berechnet wird",
          "content": "Der Rechner beginnt mit Ihrer Hausgrundfläche (Länge × Breite), fügt den Dachüberstand auf allen Seiten hinzu und wendet dann einen Neigungsmultiplikator an, um von der flachen Fläche zur tatsächlichen geneigten Fläche zu konvertieren. Der Neigungsmultiplikator stammt aus der Formel: √(1 + (Anstieg/12)²). Zum Beispiel hat eine 6/12-Neigung einen Multiplikator von 1,118, was bedeutet, dass das Dach etwa 12% größer als die Grundfläche ist. Für Walmdächer berücksichtigt ein zusätzlicher 1,10×-Faktor die extra Oberfläche von allen vier geneigten Seiten. Der Rechner konvertiert dann die Gesamtfläche in Dachquadrate (1 Quadrat = 100 sq ft) und schätzt Bündel, Firstabdeckung und Tropfkantenlängen."
        },
        "considerations": {
          "title": "Wichtige Überlegungen",
          "items": [
            {
              "text": "Dachkomplexität beeinflusst Verschnitt — einfache Satteldächer benötigen 10% Verschnitt, während komplexe Dächer mit Gauben, Kehlen und mehreren Walmen 15-20% benötigen können.",
              "type": "warning"
            },
            {
              "text": "Materialgewicht ist wichtig — Asphaltschindeln wiegen 2-4 lbs/sq ft, während Ziegel 8-12 lbs/sq ft wiegen können. Prüfen Sie, ob Ihre Struktur das gewählte Material tragen kann.",
              "type": "warning"
            },
            {
              "text": "Steile Neigungen (über 8/12) erfordern zusätzliche Sicherheitsausrüstung und können Arbeitskosten um 25-50% erhöhen.",
              "type": "info"
            },
            {
              "text": "Vergessen Sie nicht Unterlage, Abdichtung, Lüftung und Eis-/Wasserschutz in kalten Klimazonen — diese fügen 10-15% zu den Materialkosten über das Dachmaterial hinaus hinzu.",
              "type": "info"
            },
            {
              "text": "Metalldächer und Ziegel haben längere Lebensdauern (40-100 Jahre) im Vergleich zu Asphalt (15-30 Jahre), was ihre höheren Anfangskosten ausgleichen kann.",
              "type": "info"
            },
            {
              "text": "Örtliche Bauvorschriften können bestimmte Materialien einschränken oder spezifische Installationsmethoden erfordern. Prüfen Sie bei Ihrer Baubehörde vor dem Kauf.",
              "type": "warning"
            }
          ]
        },
        "categories": {
          "title": "Dachmaterial-Vergleich",
          "items": [
            {
              "text": "Asphaltschindeln — Am beliebtesten (80% der US-Häuser). Kosten: $3-$5/sq ft installiert. Lebensdauer: 15-30 Jahre. Einfach zu installieren und reparieren.",
              "type": "info"
            },
            {
              "text": "Metalldach — Stehfalz- oder Wellblechpaneele. Kosten: $7-$15/sq ft installiert. Lebensdauer: 40-70 Jahre. Ausgezeichnet für Schnee- und Feuerbeständigkeit.",
              "type": "info"
            },
            {
              "text": "Ton-/Betonziegel — Mediterrane und spanische Stile. Kosten: $8-$15/sq ft installiert. Lebensdauer: 50-100 Jahre. Sehr schwer, erfordert starke Struktur.",
              "type": "info"
            },
            {
              "text": "Holzschindeln — Natürliche Zeder oder Rotholz. Kosten: $6-$10/sq ft installiert. Lebensdauer: 20-40 Jahre. Schön, aber erfordert mehr Wartung.",
              "type": "info"
            },
            {
              "text": "Schiefer — Premium-Naturstein. Kosten: $15-$30/sq ft installiert. Lebensdauer: 75-200 Jahre. Extrem langlebig und elegant, aber sehr teuer.",
              "type": "info"
            },
            {
              "text": "Membrane (TPO/EPDM) — Für flache oder niedrig geneigte Dächer. Kosten: $4-$8/sq ft installiert. Lebensdauer: 20-30 Jahre. Wasserdicht und energieeffizient.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Berechnungsbeispiele",
          "description": "Schritt-für-Schritt Dachflächenberechnungen",
          "examples": [
            {
              "title": "Standard-Satteldach (40×25 ft, 6/12 Neigung)",
              "steps": [
                "Hausgrundfläche: 40 × 25 = 1.000 sq ft",
                "1 ft Überstand auf jeder Seite hinzufügen: (40+2) × (25+2) = 42 × 27 = 1.134 sq ft",
                "Neigungsmultiplikator für 6/12: √(1 + (6/12)²) = √1,25 = 1,118",
                "Dachfläche: 1.134 × 1,118 = 1.268 sq ft",
                "10% Verschnitt hinzufügen: 1.268 × 1,10 = 1.395 sq ft"
              ],
              "result": "Sie benötigen 13,95 ≈ 14 Dachquadrate (42 Schindelbündel)"
            },
            {
              "title": "Walmdach (50×30 ft, 5/12 Neigung)",
              "steps": [
                "Hausgrundfläche: 50 × 30 = 1.500 sq ft",
                "1,5 ft Überstand hinzufügen: (50+3) × (30+3) = 53 × 33 = 1.749 sq ft",
                "Neigungsmultiplikator für 5/12: √(1 + (5/12)²) = √1,1736 = 1,083",
                "Walm-Faktor: × 1,10 (10% extra für Walm-Geometrie)",
                "Dachfläche: 1.749 × 1,083 × 1,10 = 2.083 sq ft"
              ],
              "result": "Sie benötigen 20,83 ≈ 21 Dachquadrate (63 Schindelbündel)"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Was ist ein Dachquadrat?",
          "answer": "Ein Dachquadrat ist eine Maßeinheit gleich 100 Quadratfuß Dachfläche. Auftragnehmer und Lieferanten verwenden Quadrate zur Schätzung und Preisgestaltung von Dachprojekten. Zum Beispiel entspricht ein 2.000 sq ft Dach 20 Quadraten. Standard-Asphaltschindeln kommen in Bündeln, wobei 3 Bündel ein Quadrat abdecken."
        },
        {
          "question": "Wie beeinflusst die Dachneigung die Menge des benötigten Materials?",
          "answer": "Die Dachneigung erhöht die tatsächliche Oberfläche im Vergleich zur flachen Grundfläche. Eine 4/12-Neigung fügt etwa 5,4% mehr Fläche hinzu, eine 6/12-Neigung fügt 11,8% hinzu, eine 8/12-Neigung fügt 20,2% hinzu und eine 12/12 (45°)-Neigung fügt 41,4% hinzu. Steilere Dächer erfordern deutlich mehr Material und sind teurer zu installieren aufgrund erhöhter Arbeitsschwierigkeit."
        },
        {
          "question": "Wie viel Verschnittfaktor sollte ich verwenden?",
          "answer": "Für ein einfaches Sattel- oder Pultdach verwenden Sie 10% Verschnitt. Für Dächer mit Kehlen, Gauben oder komplexer Geometrie verwenden Sie 15%. Für sehr komplexe Dächer mit mehreren Winkeln und Durchbrüchen (Oberlichter, Schornsteine) verwenden Sie 15-20%. Es ist immer besser, zusätzliches Material zu haben, als mitten im Projekt auszugehen."
        },
        {
          "question": "Was ist der Unterschied zwischen Sattel-, Walm-, Flach- und Pultdächern?",
          "answer": "Ein Satteldach hat zwei geneigte Seiten, die sich an einem First treffen — es ist der häufigste Typ. Ein Walmdach hat vier geneigte Seiten, die sich an einem First treffen und bietet besseren Windwiderstand. Ein Flachdach hat minimale Neigung (gerade genug für Entwässerung) und ist bei modernen und gewerblichen Gebäuden üblich. Ein Pultdach hat eine einzelne geneigte Fläche und ist bei Anbauten, Garagen und Veranden üblich."
        },
        {
          "question": "Wie messe ich meine Dachneigung?",
          "answer": "Die sicherste Methode ist die Messung von Ihrem Dachboden aus. Legen Sie eine Wasserwaage horizontal gegen einen Dachsparren, markieren Sie 12 Zoll entlang der Wasserwaage und messen Sie dann den vertikalen Abstand von dieser 12-Zoll-Marke hinunter zum Dachsparren. Diese vertikale Messung ist Ihr Neigungsanstieg. Wenn sie zum Beispiel 6 Zoll misst, ist Ihre Neigung 6/12. Sie können auch einen Neigungsmesser oder eine Smartphone-App von außen verwenden."
        },
        {
          "question": "Wie viel kostet ein neues Dach normalerweise?",
          "answer": "Dachersatzkosten variieren stark je nach Größe, Material, Neigung und Standort. Durchschnittliche Kosten in den USA reichen von $5.000-$12.000 für Asphaltschindeln auf einem Standardhaus (1.500-2.500 sq ft Dach). Metalldächer kosten $10.000-$25.000, und Premium-Materialien wie Schiefer können $30.000 übersteigen. Steile Neigungen, mehrere Stockwerke und komplexe Dachlinien erhöhen die Arbeitskosten."
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
      },
      "calculator": {
        "yourInformation": "Ihre Informationen"
      }
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
