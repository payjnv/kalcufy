import type {
  CalculatorConfigV4,
  CalculatorResults,
} from "@/engine/v4/types/engine.types";

export const flooringCalculatorConfig: CalculatorConfigV4 = {
  id: "flooring-calculator",
  version: "4.0",
  category: "home",
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
    es: {
      "name": "Calculadora de Pisos",
      "slug": "calculadora-pisos",
      "subtitle": "Calcula cuánto material de piso necesitas — en pies cuadrados, cajas y costo estimado — para cualquier habitación o proyecto.",
      "breadcrumb": "Pisos",
      "seo": {
        "title": "Calculadora de Pisos - Estima Materiales y Costo Gratis",
        "description": "Calcula materiales de piso para madera, laminado, vinilo, azulejo o alfombra. Obtén pies cuadrados, cantidad de cajas, margen de desperdicio y estimaciones de costo al instante.",
        "shortDescription": "Estima materiales de piso, cajas y costo para tu proyecto.",
        "keywords": [
          "calculadora de pisos",
          "calculadora de área de piso",
          "cuánto piso necesito",
          "calculadora de piso de madera",
          "calculadora de piso laminado",
          "calculadora de azulejos",
          "calculadora de pisos gratis",
          "estimador de costo de pisos"
        ]
      },
      "calculator": {
        "yourInformation": "Tu Información"
      },
      "inputs": {
        "flooringType": {
          "label": "Tipo de Piso",
          "helpText": "Selecciona el tipo de material de piso",
          "options": {
            "hardwood": "Madera Dura",
            "laminate": "Laminado",
            "vinyl": "Vinilo/LVP",
            "tile": "Azulejo",
            "carpet": "Alfombra"
          }
        },
        "roomLength": {
          "label": "Largo de la Habitación",
          "helpText": "El largo de la habitación"
        },
        "roomWidth": {
          "label": "Ancho de la Habitación",
          "helpText": "El ancho de la habitación"
        },
        "numberOfRooms": {
          "label": "Número de Habitaciones",
          "helpText": "Habitaciones idénticas a cubrir (usar 1 para una sola habitación)"
        },
        "installPattern": {
          "label": "Patrón de Instalación",
          "helpText": "Los patrones diagonales y espina de pescado requieren 15-20% más material",
          "options": {
            "straight": "Recto / Desplazado",
            "diagonal": "Diagonal (45°)",
            "herringbone": "Espina de Pescado / Parqué"
          }
        },
        "wasteFactor": {
          "label": "Factor de Desperdicio",
          "helpText": "Material extra para cortes, desperdicio y reparaciones futuras. 10% estándar, 15% para habitaciones complejas"
        },
        "boxSize": {
          "label": "Cobertura por Caja",
          "helpText": "Pies cuadrados por caja/cartón. Típico: Madera 20, Laminado 24, Vinilo 24, Azulejo 15. Usar 0 para alfombra (se vende por pie cuadrado)"
        },
        "includeCost": {
          "label": "Incluir Estimación de Costo",
          "helpText": "Activar para calcular costos de materiales"
        },
        "costPerSqFt": {
          "label": "Costo por Pie Cuadrado",
          "helpText": "Costo de material por pie cuadrado (Laminado $2-$6, Madera $4-$12, Azulejo $4-$15, Vinilo $2-$5)"
        }
      },
      "results": {
        "totalArea": {
          "label": "Área Total"
        },
        "totalAreaMetric": {
          "label": "Área Total (Métrico)"
        },
        "areaWithWaste": {
          "label": "Con Factor de Desperdicio"
        },
        "boxesNeeded": {
          "label": "Cajas Necesarias"
        },
        "estimatedCost": {
          "label": "Costo Estimado"
        },
        "materialCostPerBox": {
          "label": "Costo por Caja"
        },
        "underlayment": {
          "label": "Subpiso"
        }
      },
      "presets": {
        "bedroomHardwood": {
          "label": "Dormitorio (Madera)",
          "description": "12×10 pies, madera, instalación recta"
        },
        "livingRoomLaminate": {
          "label": "Sala (Laminado)",
          "description": "20×15 pies, laminado, instalación recta"
        },
        "kitchenTile": {
          "label": "Cocina (Azulejo)",
          "description": "14×12 pies, azulejo, 15% desperdicio"
        },
        "basementVinyl": {
          "label": "Sótano (Vinilo)",
          "description": "25×20 pies, vinilo/LVP, instalación recta"
        },
        "wholeHomeCarpet": {
          "label": "Casa Completa (Alfombra)",
          "description": "5 habitaciones × 15×12 pies cada una"
        }
      },
      "values": {
        "sqFt": "pies²",
        "sqM": "m²",
        "sqYd": "yardas²",
        "boxes": "cajas",
        "rolls": "rollos"
      },
      "formats": {
        "summary": "Necesitas {area} de material de piso ({boxes} cajas). Con {waste}% factor de desperdicio: {areaWaste}."
      },
      "infoCards": {
        "metrics": {
          "title": "📊 Medidas del Piso",
          "items": [
            {
              "label": "Área Total",
              "valueKey": "totalArea"
            },
            {
              "label": "Área (Métrico)",
              "valueKey": "totalAreaMetric"
            },
            {
              "label": "Con Desperdicio",
              "valueKey": "areaWithWaste"
            },
            {
              "label": "Cajas Necesarias",
              "valueKey": "boxesNeeded"
            }
          ]
        },
        "details": {
          "title": "📦 Detalles del Proyecto",
          "items": [
            {
              "label": "Subpiso",
              "valueKey": "underlayment"
            },
            {
              "label": "Extra por Patrón",
              "valueKey": "patternExtra"
            },
            {
              "label": "Costo por Caja",
              "valueKey": "materialCostPerBox"
            },
            {
              "label": "Costo Estimado",
              "valueKey": "estimatedCost"
            }
          ]
        },
        "tips": {
          "title": "💡 Consejos de Pisos",
          "items": [
            "Siempre compra 10% de material extra para instalaciones rectas. Para patrones diagonales, compra 15%. Para espina de pescado, compra 20%. Guarda sobras para reparaciones futuras.",
            "Aclimata pisos de madera y laminado en la habitación por 48-72 horas antes de la instalación. Esto previene espacios de expansión y pandeo después de instalar.",
            "Los pisos flotantes (laminado, vinilo, madera laminada) son fáciles de instalar por cuenta propia. Azulejo y madera sólida típicamente requieren herramientas profesionales y experiencia.",
            "Verifica si tu piso necesita subpiso — la mayoría de pisos flotantes sí. Algunos productos vienen con él pre-adherido, lo que ahorra tiempo y costo."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "¿Qué Es una Calculadora de Pisos?",
          "content": "Una calculadora de pisos te ayuda a determinar exactamente cuánto material comprar para tu proyecto de piso. Considera las dimensiones de la habitación, el número de habitaciones, factor de desperdicio para cortes y errores, y tu patrón de instalación elegido. La calculadora convierte tus medidas en cantidades útiles — total de pies cuadrados, número de cajas o cartones, y costo estimado — para que puedas ordenar con precisión sin comprar de más o quedarte corto a mitad del proyecto."
        },
        "howItWorks": {
          "title": "Cómo Se Calcula el Piso",
          "content": "El cálculo básico multiplica el largo por el ancho de la habitación para obtener el área base, luego multiplica por el número de habitaciones idénticas. Se agrega un factor de desperdicio para considerar cortes en paredes, alrededor de obstáculos y coincidencia de patrones. El patrón de instalación afecta el desperdicio: diseños rectos necesitan 10% extra, patrones diagonales necesitan 15%, y patrones espina de pescado o parqué necesitan 20%. El área total con desperdicio se divide por la cobertura de la caja (típicamente 15-24 pies cuadrados por caja dependiendo del material) para determinar cuántas cajas comprar, siempre redondeando hacia arriba a la caja completa más cercana."
        },
        "considerations": {
          "title": "Consideraciones Importantes",
          "items": [
            {
              "text": "Mide cada habitación por separado si tienen tamaños diferentes. No estimes — incluso pequeños errores de medición se acumulan al comprar material.",
              "type": "warning"
            },
            {
              "text": "Las habitaciones rara vez son perfectamente rectangulares. Mide en los puntos más anchos y considera salientes, closets y alcobas por separado.",
              "type": "info"
            },
            {
              "text": "La alfombra típicamente se vende en rollos de 12 pies de ancho. Si tu habitación es más ancha que 12 pies, habrá costuras. Planifica la ubicación de costuras en áreas de bajo tráfico.",
              "type": "info"
            },
            {
              "text": "La preparación del subsuelo puede agregar costo significativo. Subsuelos desnivelados pueden necesitar compuesto nivelador ($0.50-$2.00/pie²), y remover piso viejo agrega tiempo y gasto.",
              "type": "warning"
            },
            {
              "text": "Las pruebas de humedad son esenciales para sótanos y losas de concreto. Vinilo y azulejo manejan bien la humedad; madera y laminado pueden deformarse en ambientes de alta humedad.",
              "type": "warning"
            },
            {
              "text": "Mantén 1-2 cajas extra de piso a juego almacenadas planas en un área con clima controlado. Te lo agradecerás después cuando una tabla se dañe.",
              "type": "info"
            }
          ]
        },
        "categories": {
          "title": "Comparación de Materiales de Piso",
          "items": [
            {
              "text": "Madera Dura — Madera sólida premium. Costo: $4-$12/pie². Duración: 25-100 años (refinible). Mejor para áreas de estar. Evitar en sótanos y baños.",
              "type": "info"
            },
            {
              "text": "Laminado — Capa fotográfica sobre madera comprimida. Costo: $2-$6/pie². Duración: 15-25 años. Resistente a rayones, fácil instalación DIY. No refinible.",
              "type": "info"
            },
            {
              "text": "Vinilo/LVP — Tablón de Vinilo de Lujo. Costo: $2-$5/pie². Duración: 15-25 años. Impermeable, excelente para cocinas y sótanos. Muy amigable para DIY.",
              "type": "info"
            },
            {
              "text": "Azulejo (Cerámico/Porcelana) — Costo: $4-$15/pie². Duración: 50+ años. Impermeable, muy duradero. Se recomienda instalación profesional. Frío al tacto.",
              "type": "info"
            },
            {
              "text": "Alfombra — Costo: $1-$8/pie². Duración: 5-15 años. Cálida y cómoda. Se vende en rollos, no cajas. Se requiere limpieza regular.",
              "type": "info"
            },
            {
              "text": "Madera Laminada — Chapa de madera real sobre contrachapado. Costo: $3-$10/pie². Duración: 20-50 años. Mejor resistencia a humedad que madera sólida. Se puede refinir 1-2 veces.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Ejemplos de Cálculo",
          "description": "Cálculos de pisos paso a paso",
          "examples": [
            {
              "title": "Dormitorio con Madera (12×10 pies, recto)",
              "steps": [
                "Área base: 12 × 10 = 120 pies²",
                "Factor de desperdicio (10%): 120 × 0.10 = 12 pies²",
                "Total necesario: 120 + 12 = 132 pies²",
                "Tamaño de caja: 20 pies² por caja",
                "Cajas: 132 ÷ 20 = 6.6 → Redondear a 7 cajas",
                "Costo a $6/pie²: 132 × $6 = $792"
              ],
              "result": "Compra 7 cajas de madera (140 pies²) para una habitación de 120 pies². Costo estimado de material: $792."
            },
            {
              "title": "Sala con Azulejo Diagonal (14×12 pies)",
              "steps": [
                "Área base: 14 × 12 = 168 pies²",
                "Desperdicio patrón diagonal (15%): 168 × 0.15 = 25.2 pies²",
                "Total necesario: 168 + 25.2 = 193.2 pies²",
                "Tamaño de caja: 15 pies² por caja (azulejo)",
                "Cajas: 193.2 ÷ 15 = 12.88 → Redondear a 13 cajas",
                "Costo a $8/pie²: 193.2 × $8 = $1,546"
              ],
              "result": "Compra 13 cajas de azulejo (195 pies²) para una habitación de 168 pies² con diseño diagonal. Costo estimado de material: $1,546."
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "¿Cuánto piso extra debo comprar para desperdicio?",
          "answer": "Para instalaciones rectas o desplazadas, agrega 10% extra. Para patrones diagonales, agrega 15%. Para patrones espina de pescado o parqué, agrega 20%. Instaladores DIY primerizos deberían considerar agregar un 5% extra más allá de estas recomendaciones. También es sabio guardar algunas tablas extra almacenadas para reparaciones futuras."
        },
        {
          "question": "¿Cuántos pies cuadrados vienen en una caja de piso?",
          "answer": "La cobertura varía por producto: Madera típicamente viene en cajas de 15-25 pies² (más comúnmente 20 pies²). Laminado usualmente es 20-24 pies² por caja. Vinilo/LVP varía de 20-30 pies² por caja. Azulejo varía ampliamente en 10-15 pies² por caja dependiendo del tamaño del azulejo. Siempre verifica el empaque del producto específico."
        },
        {
          "question": "¿Es más barato instalar piso yo mismo?",
          "answer": "La instalación DIY puede ahorrar 50-70% en costos de mano de obra, que típicamente van de $2-$8/pie² dependiendo del material. Laminado y vinilo de click-lock son los más amigables para DIY. Azulejo requiere herramientas especializadas (sierra húmeda, llanas) y técnica. Madera sólida requiere pistola de clavos y experiencia. Considera costos de alquiler de herramientas ($50-$200) al comparar DIY vs profesional."
        },
        {
          "question": "¿Qué piso es mejor para áreas de alta humedad?",
          "answer": "Para baños, cocinas, sótanos y cuartos de lavado: Azulejo de porcelana o cerámica es el estándar oro — completamente impermeable y duradero. Tablón de Vinilo de Lujo (LVP) es una excelente alternativa — impermeable, cómodo y fácil de instalar. Evita madera sólida y laminado estándar en áreas húmedas, ya que pueden deformarse, hincharse o desarrollar moho."
        },
        {
          "question": "¿Necesito subpiso para mi piso?",
          "answer": "La mayoría de pisos flotantes (laminado, vinilo, madera laminada) requieren subpiso para amortiguación, reducción de sonido y protección contra humedad. Algunos productos vienen con subpiso pre-adherido — verifica el empaque. Azulejo requiere tabla de cemento o un sustrato aprobado. Alfombra usa una almohadilla de alfombra separada. Madera sólida clavada típicamente no necesita subpiso separado."
        },
        {
          "question": "¿Cómo calculo piso para una habitación irregular?",
          "answer": "Divide la habitación en secciones rectangulares y mide cada una por separado (largo × ancho). Suma todas las secciones para el área total. Para salientes y alcobas, mídelos como rectángulos separados y súmalos. Para habitaciones en forma de L, divide en dos rectángulos. Siempre mide en los puntos más anchos y redondea hacia arriba para asegurar cobertura adecuada."
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
      "name": "Calculadora de Piso",
      "slug": "calculadora-piso",
      "subtitle": "Calcule quanto material de piso você precisa — em metros quadrados, caixas e custo estimado — para qualquer ambiente ou projeto.",
      "breadcrumb": "Piso",
      "seo": {
        "title": "Calculadora de Piso - Estime Materiais e Custo Grátis",
        "description": "Calcule materiais de piso para madeira, laminado, vinílico, cerâmica ou carpete. Obtenha metragem quadrada, quantidade de caixas, fator de desperdício e estimativas de custo total instantaneamente.",
        "shortDescription": "Estime materiais de piso, caixas e custo para seu projeto.",
        "keywords": [
          "calculadora de piso",
          "calculadora de área de piso",
          "quanto piso eu preciso",
          "calculadora de piso de madeira",
          "calculadora de piso laminado",
          "calculadora de cerâmica",
          "calculadora de piso grátis",
          "estimador de custo de piso"
        ]
      },
      "inputs": {
        "flooringType": {
          "label": "Tipo de Piso",
          "helpText": "Selecione o tipo de material do piso",
          "options": {
            "hardwood": "Madeira",
            "laminate": "Laminado",
            "vinyl": "Vinílico/LVT",
            "tile": "Cerâmica",
            "carpet": "Carpete"
          }
        },
        "roomLength": {
          "label": "Comprimento do Ambiente",
          "helpText": "O comprimento do ambiente"
        },
        "roomWidth": {
          "label": "Largura do Ambiente",
          "helpText": "A largura do ambiente"
        },
        "numberOfRooms": {
          "label": "Número de Ambientes",
          "helpText": "Ambientes idênticos para cobrir (use 1 para um único ambiente)"
        },
        "installPattern": {
          "label": "Padrão de Instalação",
          "helpText": "Padrões diagonais e espinha de peixe requerem 15-20% mais material",
          "options": {
            "straight": "Reto / Desencontrado",
            "diagonal": "Diagonal (45°)",
            "herringbone": "Espinha de Peixe / Parquet"
          }
        },
        "wasteFactor": {
          "label": "Fator de Desperdício",
          "helpText": "Material extra para cortes, desperdício e reparos futuros. 10% padrão, 15% para ambientes complexos"
        },
        "boxSize": {
          "label": "Cobertura por Caixa",
          "helpText": "Metros quadrados por caixa/embalagem. Típico: Madeira 1,8, Laminado 2,2, Vinílico 2,2, Cerâmica 1,4. Use 0 para carpete (vendido por m²)"
        },
        "includeCost": {
          "label": "Incluir Estimativa de Custo",
          "helpText": "Habilitar para calcular custos de material"
        },
        "costPerSqFt": {
          "label": "Custo por Metro Quadrado",
          "helpText": "Custo do material por m² (Laminado R$40-120, Madeira R$80-240, Cerâmica R$80-300, Vinílico R$40-100)"
        }
      },
      "results": {
        "totalArea": {
          "label": "Área Total"
        },
        "totalAreaMetric": {
          "label": "Área Total (Métrica)"
        },
        "areaWithWaste": {
          "label": "Com Fator de Desperdício"
        },
        "boxesNeeded": {
          "label": "Caixas Necessárias"
        },
        "estimatedCost": {
          "label": "Custo Estimado"
        },
        "materialCostPerBox": {
          "label": "Custo por Caixa"
        },
        "underlayment": {
          "label": "Subpiso"
        }
      },
      "presets": {
        "bedroomHardwood": {
          "label": "Quarto (Madeira)",
          "description": "3,6×3m, madeira, instalação reta"
        },
        "livingRoomLaminate": {
          "label": "Sala de Estar (Laminado)",
          "description": "6×4,5m, laminado, instalação reta"
        },
        "kitchenTile": {
          "label": "Cozinha (Cerâmica)",
          "description": "4,2×3,6m, cerâmica, 15% desperdício"
        },
        "basementVinyl": {
          "label": "Porão (Vinílico)",
          "description": "7,5×6m, vinílico/LVT, instalação reta"
        },
        "wholeHomeCarpet": {
          "label": "Casa Inteira (Carpete)",
          "description": "5 ambientes × 4,5×3,6m cada"
        }
      },
      "values": {
        "sqFt": "m²",
        "sqM": "m²",
        "sqYd": "m²",
        "boxes": "caixas",
        "rolls": "rolos"
      },
      "formats": {
        "summary": "Você precisa de {area} de material de piso ({boxes} caixas). Com fator de desperdício de {waste}%: {areaWaste}."
      },
      "infoCards": {
        "metrics": {
          "title": "📊 Medidas do Piso",
          "items": [
            {
              "label": "Área Total",
              "valueKey": "totalArea"
            },
            {
              "label": "Área (Métrica)",
              "valueKey": "totalAreaMetric"
            },
            {
              "label": "Com Desperdício",
              "valueKey": "areaWithWaste"
            },
            {
              "label": "Caixas Necessárias",
              "valueKey": "boxesNeeded"
            }
          ]
        },
        "details": {
          "title": "📦 Detalhes do Projeto",
          "items": [
            {
              "label": "Subpiso",
              "valueKey": "underlayment"
            },
            {
              "label": "Extra do Padrão",
              "valueKey": "patternExtra"
            },
            {
              "label": "Custo por Caixa",
              "valueKey": "materialCostPerBox"
            },
            {
              "label": "Custo Estimado",
              "valueKey": "estimatedCost"
            }
          ]
        },
        "tips": {
          "title": "💡 Dicas de Piso",
          "items": [
            "Sempre compre 10% extra de material para instalações retas. Para padrões diagonais, compre 15%. Para espinha de peixe, compre 20%. Guarde as sobras para reparos futuros.",
            "Aclimate pisos de madeira e laminados no ambiente por 48-72 horas antes da instalação. Isso previne frestas de expansão e empenamento após a instalação.",
            "Pisos flutuantes (laminado, vinílico, engenheirado) são amigáveis para DIY. Cerâmica e madeira sólida geralmente requerem ferramentas profissionais e experiência.",
            "Verifique se seu piso precisa de subpiso — a maioria dos pisos flutuantes precisa. Alguns produtos vêm com ele pré-instalado, o que economiza tempo e custo."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "O que é uma Calculadora de Piso?",
          "content": "Uma calculadora de piso ajuda você a determinar exatamente quanto material comprar para seu projeto de piso. Ela considera as dimensões do ambiente, o número de ambientes, fator de desperdício para cortes e erros, e seu padrão de instalação escolhido. A calculadora converte suas medidas em quantidades utilizáveis — metragem quadrada total, número de caixas ou embalagens, e custo estimado — para que você possa fazer pedidos com precisão sem comprar demais ou ficar sem material no meio do projeto."
        },
        "howItWorks": {
          "title": "Como o Piso é Calculado",
          "content": "O cálculo básico multiplica o comprimento do ambiente pela largura para obter a área base, depois multiplica pelo número de ambientes idênticos. Um fator de desperdício é adicionado para considerar cortes nas paredes, ao redor de obstáculos e combinação de padrões. O padrão de instalação afeta o desperdício: layouts retos precisam de 10% extra, padrões diagonais precisam de 15%, e padrões espinha de peixe ou parquet precisam de 20%. A área total com desperdício é dividida pela cobertura da caixa (tipicamente 1,4-2,2 m² por caixa dependendo do material) para determinar quantas caixas comprar, sempre arredondando para cima para a caixa inteira mais próxima."
        },
        "considerations": {
          "title": "Considerações Importantes",
          "items": [
            {
              "text": "Meça cada ambiente separadamente se eles tiverem tamanhos diferentes. Não estime — mesmo pequenos erros de medição se multiplicam ao comprar material.",
              "type": "warning"
            },
            {
              "text": "Ambientes raramente são perfeitamente retangulares. Meça nos pontos mais largos e considere saliências, armários e alcovas separadamente.",
              "type": "info"
            },
            {
              "text": "Carpete é tipicamente vendido em rolos de 3,6m de largura. Se seu ambiente for mais largo que 3,6m, haverá emendas. Planeje a colocação de emendas em áreas de pouco tráfego.",
              "type": "info"
            },
            {
              "text": "Preparação do contrapiso pode adicionar custo significativo. Contrapisos desnivelados podem precisar de massa niveladora (R$10-40/m²), e remoção de piso antigo adiciona tempo e despesa.",
              "type": "warning"
            },
            {
              "text": "Teste de umidade é essencial para porões e lajes de concreto. Vinílico e cerâmica lidam bem com umidade; madeira e laminado podem empenar em ambientes com alta umidade.",
              "type": "warning"
            },
            {
              "text": "Mantenha 1-2 caixas extras de piso compatível armazenadas na horizontal em área com temperatura controlada. Você agradecerá mais tarde quando uma tábua for danificada.",
              "type": "info"
            }
          ]
        },
        "categories": {
          "title": "Comparação de Materiais de Piso",
          "items": [
            {
              "text": "Madeira — Madeira sólida premium. Custo: R$80-240/m². Durabilidade: 25-100 anos (pode ser lixada). Melhor para áreas sociais. Evite em porões e banheiros.",
              "type": "info"
            },
            {
              "text": "Laminado — Camada fotográfica sobre madeira comprimida. Custo: R$40-120/m². Durabilidade: 15-25 anos. Resistente a riscos, instalação DIY fácil. Não pode ser lixado.",
              "type": "info"
            },
            {
              "text": "Vinílico/LVT — Piso Vinílico de Luxo. Custo: R$40-100/m². Durabilidade: 15-25 anos. À prova d'água, ótimo para cozinhas e porões. Muito amigável para DIY.",
              "type": "info"
            },
            {
              "text": "Cerâmica/Porcelanato — Custo: R$80-300/m². Durabilidade: 50+ anos. À prova d'água, muito durável. Instalação profissional recomendada. Frio ao pisar.",
              "type": "info"
            },
            {
              "text": "Carpete — Custo: R$20-160/m². Durabilidade: 5-15 anos. Quente e confortável. Vendido em rolos, não em caixas. Limpeza regular necessária.",
              "type": "info"
            },
            {
              "text": "Madeira Engenheirada — Lâmina de madeira real sobre compensado. Custo: R$60-200/m². Durabilidade: 20-50 anos. Melhor resistência à umidade que madeira sólida. Pode ser lixada 1-2 vezes.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemplos de Cálculo",
          "description": "Cálculos de piso passo a passo",
          "examples": [
            {
              "title": "Quarto com Madeira (3,6×3m, reto)",
              "steps": [
                "Área base: 3,6 × 3 = 10,8 m²",
                "Fator de desperdício (10%): 10,8 × 0,10 = 1,08 m²",
                "Total necessário: 10,8 + 1,08 = 11,88 m²",
                "Tamanho da caixa: 1,8 m² por caixa",
                "Caixas: 11,88 ÷ 1,8 = 6,6 → Arredondar para 7 caixas",
                "Custo a R$120/m²: 11,88 × R$120 = R$1.426"
              ],
              "result": "Compre 7 caixas de madeira (12,6 m²) para um ambiente de 10,8 m². Custo estimado do material: R$1.426."
            },
            {
              "title": "Sala com Cerâmica Diagonal (4,2×3,6m)",
              "steps": [
                "Área base: 4,2 × 3,6 = 15,12 m²",
                "Desperdício padrão diagonal (15%): 15,12 × 0,15 = 2,27 m²",
                "Total necessário: 15,12 + 2,27 = 17,39 m²",
                "Tamanho da caixa: 1,4 m² por caixa (cerâmica)",
                "Caixas: 17,39 ÷ 1,4 = 12,42 → Arredondar para 13 caixas",
                "Custo a R$160/m²: 17,39 × R$160 = R$2.782"
              ],
              "result": "Compre 13 caixas de cerâmica (18,2 m²) para um ambiente de 15,12 m² com layout diagonal. Custo estimado do material: R$2.782."
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Quanto piso extra devo comprar para desperdício?",
          "answer": "Para instalações retas ou desencontradas, adicione 10% extra. Para padrões diagonais, adicione 15%. Para padrões espinha de peixe ou parquet, adicione 20%. Iniciantes em DIY devem considerar adicionar 5% extra além dessas recomendações. Também é prudente manter algumas tábuas extras guardadas para reparos futuros."
        },
        {
          "question": "Quantos metros quadrados vêm em uma caixa de piso?",
          "answer": "A cobertura varia por produto: Madeira tipicamente vem em caixas de 1,4-2,3 m² (mais comumente 1,8 m²). Laminado é geralmente 1,8-2,2 m² por caixa. Vinílico/LVT varia de 1,8-2,8 m² por caixa. Cerâmica varia amplamente de 0,9-1,4 m² por caixa dependendo do tamanho da peça. Sempre verifique a embalagem do produto específico."
        },
        {
          "question": "É mais barato instalar o piso eu mesmo?",
          "answer": "Instalação DIY pode economizar 50-70% nos custos de mão de obra, que tipicamente custam R$40-160/m² dependendo do material. Laminado e vinílico com encaixe são os mais amigáveis para DIY. Cerâmica requer ferramentas especializadas (serra úmida, desempenadeiras) e técnica. Madeira sólida requer pistola pneumática e experiência. Considere os custos de aluguel de ferramentas (R$100-400) ao comparar DIY vs profissional."
        },
        {
          "question": "Qual piso é melhor para áreas com alta umidade?",
          "answer": "Para banheiros, cozinhas, porões e lavanderias: Porcelanato ou cerâmica é o padrão ouro — completamente à prova d'água e durável. Piso Vinílico de Luxo (LVT) é uma excelente alternativa — à prova d'água, confortável e fácil de instalar. Evite madeira sólida e laminado padrão em áreas molhadas, pois podem empenar, inchar ou desenvolver mofo."
        },
        {
          "question": "Preciso de subpiso para meu piso?",
          "answer": "A maioria dos pisos flutuantes (laminado, vinílico, madeira engenheirada) requer subpiso para amortecimento, redução de ruído e proteção contra umidade. Alguns produtos vêm com subpiso pré-instalado — verifique a embalagem. Cerâmica requer placa cimentícia ou substrato aprovado. Carpete usa uma manta separada. Madeira sólida pregada tipicamente não precisa de subpiso separado."
        },
        {
          "question": "Como calcular piso para um ambiente irregular?",
          "answer": "Divida o ambiente em seções retangulares e meça cada uma separadamente (comprimento × largura). Some todas as seções para obter a área total. Para saliências e alcovas, meça-as como retângulos separados e adicione-as. Para ambientes em L, divida em dois retângulos. Sempre meça nos pontos mais largos e arredonde para cima para garantir cobertura adequada."
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
      },
      "calculator": {
        "yourInformation": "Suas Informações"
      }
    },
    fr: {
      "name": "Calculateur de Revêtement de Sol",
      "slug": "calculateur-revetement-sol",
      "subtitle": "Calculez la quantité de matériau de revêtement de sol dont vous avez besoin — en pieds carrés, boîtes, et coût estimé — pour toute pièce ou projet.",
      "breadcrumb": "Revêtement de Sol",
      "seo": {
        "title": "Calculateur de Revêtement de Sol - Estimez Matériaux et Coût Gratuit",
        "description": "Calculez les matériaux de revêtement de sol pour bois franc, stratifié, vinyle, carrelage, ou moquette. Obtenez la superficie, le nombre de boîtes, l'allocation de déchets, et les estimations de coût total instantanément.",
        "shortDescription": "Estimez les matériaux de revêtement de sol, boîtes, et coût pour votre projet.",
        "keywords": [
          "calculateur revêtement de sol",
          "calculateur superficie plancher",
          "combien de revêtement de sol ai-je besoin",
          "calculateur bois franc",
          "calculateur stratifié",
          "calculateur carrelage",
          "calculateur revêtement sol gratuit",
          "estimateur coût revêtement"
        ]
      },
      "inputs": {
        "flooringType": {
          "label": "Type de Revêtement",
          "helpText": "Sélectionnez le type de matériau de revêtement de sol",
          "options": {
            "hardwood": "Bois Franc",
            "laminate": "Stratifié",
            "vinyl": "Vinyle/LVP",
            "tile": "Carrelage",
            "carpet": "Moquette"
          }
        },
        "roomLength": {
          "label": "Longueur de la Pièce",
          "helpText": "La longueur de la pièce"
        },
        "roomWidth": {
          "label": "Largeur de la Pièce",
          "helpText": "La largeur de la pièce"
        },
        "numberOfRooms": {
          "label": "Nombre de Pièces",
          "helpText": "Pièces identiques à couvrir (utilisez 1 pour une seule pièce)"
        },
        "installPattern": {
          "label": "Motif d'Installation",
          "helpText": "Les motifs diagonaux et chevrons nécessitent 15-20% de matériau supplémentaire",
          "options": {
            "straight": "Droit / Décalé",
            "diagonal": "Diagonal (45°)",
            "herringbone": "Chevron / Parquet"
          }
        },
        "wasteFactor": {
          "label": "Facteur de Déchets",
          "helpText": "Matériau supplémentaire pour les coupes, déchets, et réparations futures. 10% standard, 15% pour pièces complexes"
        },
        "boxSize": {
          "label": "Couverture par Boîte",
          "helpText": "Pieds carrés par boîte/carton. Typique: Bois franc 20, Stratifié 24, Vinyle 24, Carrelage 15. Utilisez 0 pour moquette (vendue au pied carré)"
        },
        "includeCost": {
          "label": "Inclure Estimation de Coût",
          "helpText": "Activer pour calculer les coûts de matériaux"
        },
        "costPerSqFt": {
          "label": "Coût par Pied Carré",
          "helpText": "Coût du matériau par pied carré (Stratifié 2-6$, Bois franc 4-12$, Carrelage 4-15$, Vinyle 2-5$)"
        }
      },
      "results": {
        "totalArea": {
          "label": "Surface Totale"
        },
        "totalAreaMetric": {
          "label": "Surface Totale (Métrique)"
        },
        "areaWithWaste": {
          "label": "Avec Facteur de Déchets"
        },
        "boxesNeeded": {
          "label": "Boîtes Nécessaires"
        },
        "estimatedCost": {
          "label": "Coût Estimé"
        },
        "materialCostPerBox": {
          "label": "Coût par Boîte"
        },
        "underlayment": {
          "label": "Sous-couche"
        }
      },
      "presets": {
        "bedroomHardwood": {
          "label": "Chambre (Bois Franc)",
          "description": "12×10 pi, bois franc, installation droite"
        },
        "livingRoomLaminate": {
          "label": "Salon (Stratifié)",
          "description": "20×15 pi, stratifié, installation droite"
        },
        "kitchenTile": {
          "label": "Cuisine (Carrelage)",
          "description": "14×12 pi, carrelage, 15% déchets"
        },
        "basementVinyl": {
          "label": "Sous-sol (Vinyle)",
          "description": "25×20 pi, vinyle/LVP, installation droite"
        },
        "wholeHomeCarpet": {
          "label": "Maison Entière (Moquette)",
          "description": "5 pièces × 15×12 pi chacune"
        }
      },
      "values": {
        "sqFt": "pi²",
        "sqM": "m²",
        "sqYd": "vg²",
        "boxes": "boîtes",
        "rolls": "rouleaux"
      },
      "formats": {
        "summary": "Vous avez besoin de {area} de matériau de revêtement ({boxes} boîtes). Avec {waste}% de facteur de déchets: {areaWaste}."
      },
      "infoCards": {
        "metrics": {
          "title": "📊 Mesures du Plancher",
          "items": [
            {
              "label": "Surface Totale",
              "valueKey": "totalArea"
            },
            {
              "label": "Surface (Métrique)",
              "valueKey": "totalAreaMetric"
            },
            {
              "label": "Avec Déchets",
              "valueKey": "areaWithWaste"
            },
            {
              "label": "Boîtes Nécessaires",
              "valueKey": "boxesNeeded"
            }
          ]
        },
        "details": {
          "title": "📦 Détails du Projet",
          "items": [
            {
              "label": "Sous-couche",
              "valueKey": "underlayment"
            },
            {
              "label": "Extra Motif",
              "valueKey": "patternExtra"
            },
            {
              "label": "Coût par Boîte",
              "valueKey": "materialCostPerBox"
            },
            {
              "label": "Coût Estimé",
              "valueKey": "estimatedCost"
            }
          ]
        },
        "tips": {
          "title": "💡 Conseils Revêtement",
          "items": [
            "Achetez toujours 10% de matériau supplémentaire pour les installations droites. Pour les motifs diagonaux, achetez 15%. Pour les chevrons, achetez 20%. Gardez les restes pour les réparations futures.",
            "Acclimatez le bois franc et le stratifié dans la pièce pendant 48-72 heures avant l'installation. Cela prévient les espaces d'expansion et le gondolement après l'installation.",
            "Les planchers flottants (stratifié, vinyle, engineered) sont adaptés au bricolage. Le carrelage et le bois franc massif nécessitent généralement des outils professionnels et de l'expérience.",
            "Vérifiez si votre revêtement nécessite une sous-couche — la plupart des planchers flottants en ont besoin. Certains produits sont livrés avec une sous-couche pré-attachée, ce qui économise temps et coût."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Qu'est-ce qu'un Calculateur de Revêtement de Sol ?",
          "content": "Un calculateur de revêtement de sol vous aide à déterminer exactement la quantité de matériau à acheter pour votre projet de revêtement de sol. Il tient compte des dimensions de la pièce, du nombre de pièces, du facteur de déchets pour les coupes et erreurs, et de votre motif d'installation choisi. Le calculateur convertit vos mesures en quantités utilisables — superficie totale, nombre de boîtes ou cartons, et coût estimé — pour que vous puissiez commander avec précision sans trop acheter ou manquer de matériau en milieu de projet."
        },
        "howItWorks": {
          "title": "Comment le Revêtement de Sol est Calculé",
          "content": "Le calcul de base multiplie la longueur de la pièce par la largeur pour obtenir la surface de base, puis multiplie par le nombre de pièces identiques. Un facteur de déchets est ajouté pour tenir compte des coupes aux murs, autour des obstacles, et de l'alignement des motifs. Le motif d'installation affecte les déchets : les dispositions droites nécessitent 10% supplémentaire, les motifs diagonaux nécessitent 15%, et les motifs chevrons ou parquet nécessitent 20%. La surface totale avec déchets est divisée par la couverture de boîte (typiquement 15-24 pi² par boîte selon le matériau) pour déterminer combien de boîtes acheter, toujours en arrondissant vers le haut à la boîte entière la plus proche."
        },
        "considerations": {
          "title": "Considérations Importantes",
          "items": [
            {
              "text": "Mesurez chaque pièce séparément si elles ont des tailles différentes. N'estimez pas — même de petites erreurs de mesure se cumulent lors de l'achat de matériau.",
              "type": "warning"
            },
            {
              "text": "Les pièces sont rarement parfaitement rectangulaires. Mesurez aux points les plus larges et tenez compte des saillies, placards, et alcôves séparément.",
              "type": "info"
            },
            {
              "text": "La moquette est généralement vendue en rouleaux de 12 pieds de large. Si votre pièce fait plus de 12 pieds de large, il y aura des joints. Planifiez l'emplacement des joints dans les zones de faible passage.",
              "type": "info"
            },
            {
              "text": "La préparation du sous-plancher peut ajouter un coût significatif. Les sous-planchers inégaux peuvent nécessiter un composé de nivellement (0,50-2,00$/pi²), et l'enlèvement de l'ancien revêtement ajoute temps et dépense.",
              "type": "warning"
            },
            {
              "text": "Le test d'humidité est essentiel pour les sous-sols et dalles de béton. Le vinyle et le carrelage gèrent bien l'humidité ; le bois franc et le stratifié peuvent se déformer dans des environnements très humides.",
              "type": "warning"
            },
            {
              "text": "Gardez 1-2 boîtes supplémentaires de revêtement assorti stockées à plat dans un endroit à température contrôlée. Vous vous remercierez plus tard quand une planche sera endommagée.",
              "type": "info"
            }
          ]
        },
        "categories": {
          "title": "Comparaison des Matériaux de Revêtement",
          "items": [
            {
              "text": "Bois Franc — Bois massif premium. Coût: 4-12$/pi². Durée de vie: 25-100 ans (refinissable). Idéal pour espaces de vie. Éviter sous-sols et salles de bain.",
              "type": "info"
            },
            {
              "text": "Stratifié — Couche photo sur bois compressé. Coût: 2-6$/pi². Durée de vie: 15-25 ans. Résistant aux rayures, installation bricolage facile. Non refinissable.",
              "type": "info"
            },
            {
              "text": "Vinyle/LVP — Planche Vinyle de Luxe. Coût: 2-5$/pi². Durée de vie: 15-25 ans. Imperméable, excellent pour cuisines et sous-sols. Très adapté au bricolage.",
              "type": "info"
            },
            {
              "text": "Carrelage (Céramique/Porcelaine) — Coût: 4-15$/pi². Durée de vie: 50+ ans. Imperméable, très durable. Installation professionnelle recommandée. Froid sous les pieds.",
              "type": "info"
            },
            {
              "text": "Moquette — Coût: 1-8$/pi². Durée de vie: 5-15 ans. Chaude et confortable. Vendue en rouleaux, pas en boîtes. Nettoyage régulier requis.",
              "type": "info"
            },
            {
              "text": "Bois Franc Engineered — Placage bois véritable sur contreplaqué. Coût: 3-10$/pi². Durée de vie: 20-50 ans. Meilleure résistance à l'humidité que le bois massif. Peut être refinish 1-2 fois.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemples de Calcul",
          "description": "Calculs de revêtement de sol étape par étape",
          "examples": [
            {
              "title": "Chambre avec Bois Franc (12×10 pi, droit)",
              "steps": [
                "Surface de base: 12 × 10 = 120 pi²",
                "Facteur de déchets (10%): 120 × 0,10 = 12 pi²",
                "Total nécessaire: 120 + 12 = 132 pi²",
                "Taille de boîte: 20 pi² par boîte",
                "Boîtes: 132 ÷ 20 = 6,6 → Arrondir à 7 boîtes",
                "Coût à 6$/pi²: 132 × 6$ = 792$"
              ],
              "result": "Achetez 7 boîtes de bois franc (140 pi²) pour une pièce de 120 pi². Coût matériau estimé: 792$."
            },
            {
              "title": "Salon avec Carrelage Diagonal (14×12 pi)",
              "steps": [
                "Surface de base: 14 × 12 = 168 pi²",
                "Déchets motif diagonal (15%): 168 × 0,15 = 25,2 pi²",
                "Total nécessaire: 168 + 25,2 = 193,2 pi²",
                "Taille de boîte: 15 pi² par boîte (carrelage)",
                "Boîtes: 193,2 ÷ 15 = 12,88 → Arrondir à 13 boîtes",
                "Coût à 8$/pi²: 193,2 × 8$ = 1 546$"
              ],
              "result": "Achetez 13 boîtes de carrelage (195 pi²) pour une pièce de 168 pi² avec disposition diagonale. Coût matériau estimé: 1 546$."
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Combien de revêtement de sol supplémentaire dois-je acheter pour les déchets ?",
          "answer": "Pour les installations droites ou décalées, ajoutez 10% supplémentaire. Pour les motifs diagonaux, ajoutez 15%. Pour les motifs chevrons ou parquet, ajoutez 20%. Les bricoleurs débutants devraient considérer ajouter 5% supplémentaire au-delà de ces recommandations. Il est aussi sage de garder quelques planches supplémentaires stockées pour les réparations futures."
        },
        {
          "question": "Combien de pieds carrés viennent dans une boîte de revêtement de sol ?",
          "answer": "La couverture varie selon le produit: Le bois franc vient typiquement en boîtes de 15-25 pi² (le plus souvent 20 pi²). Le stratifié est généralement 20-24 pi² par boîte. Le vinyle/LVP varie de 20-30 pi² par boîte. Le carrelage varie largement à 10-15 pi² par boîte selon la taille de carreau. Vérifiez toujours l'emballage du produit spécifique."
        },
        {
          "question": "Est-ce moins cher d'installer le revêtement de sol moi-même ?",
          "answer": "L'installation bricolage peut économiser 50-70% sur les coûts de main-d'œuvre, qui varient typiquement de 2-8$/pi² selon le matériau. Le stratifié et vinyle à clic sont les plus adaptés au bricolage. Le carrelage nécessite des outils spécialisés (scie humide, truelles) et de la technique. Le bois franc massif nécessite un cloueur pneumatique et de l'expérience. Tenez compte des coûts de location d'outils (50-200$) lors de la comparaison bricolage vs professionnel."
        },
        {
          "question": "Quel revêtement de sol est meilleur pour les zones très humides ?",
          "answer": "Pour salles de bain, cuisines, sous-sols, et buanderies: Le carrelage de porcelaine ou céramique est l'étalon-or — complètement imperméable et durable. La Planche Vinyle de Luxe (LVP) est une excellente alternative — imperméable, confortable, et facile à installer. Évitez le bois franc massif et le stratifié standard dans les zones humides, car ils peuvent se déformer, gonfler, ou développer de la moisissure."
        },
        {
          "question": "Ai-je besoin de sous-couche pour mon revêtement de sol ?",
          "answer": "La plupart des planchers flottants (stratifié, vinyle, bois franc engineered) nécessitent une sous-couche pour l'amortissement, la réduction du bruit, et la protection contre l'humidité. Certains produits viennent avec sous-couche pré-attachée — vérifiez l'emballage. Le carrelage nécessite un panneau de ciment ou un substrat approuvé. La moquette utilise un thibaude séparé. Le bois franc massif cloué n'a typiquement pas besoin de sous-couche séparée."
        },
        {
          "question": "Comment calculer le revêtement de sol pour une pièce irrégulière ?",
          "answer": "Divisez la pièce en sections rectangulaires et mesurez chacune séparément (longueur × largeur). Additionnez toutes les sections pour la surface totale. Pour les saillies et alcôves, mesurez-les comme des rectangles séparés et ajoutez-les. Pour les pièces en L, divisez en deux rectangles. Mesurez toujours aux points les plus larges et arrondissez vers le haut pour assurer une couverture adéquate."
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
      "name": "Bodenbelag Rechner",
      "slug": "bodenbelag-rechner",
      "subtitle": "Berechnen Sie, wie viel Bodenbelagmaterial Sie benötigen — in Quadratmetern, Paketen und geschätzten Kosten — für jeden Raum oder jedes Projekt.",
      "breadcrumb": "Bodenbelag",
      "seo": {
        "title": "Bodenbelag Rechner - Material & Kosten kostenlos schätzen",
        "description": "Berechnen Sie Bodenbelagmaterialien für Parkett, Laminat, Vinyl, Fliesen oder Teppich. Erhalten Sie sofort Quadratmeter, Paketanzahl, Verschnittaufschlag und Gesamtkostenschätzung.",
        "shortDescription": "Schätzen Sie Bodenbelagmaterialien, Pakete und Kosten für Ihr Projekt.",
        "keywords": [
          "bodenbelag rechner",
          "bodenfläche rechner",
          "wie viel bodenbelag brauche ich",
          "parkett rechner",
          "laminat rechner",
          "fliesen rechner",
          "kostenloser bodenbelag rechner",
          "bodenbelag kosten schätzer"
        ]
      },
      "calculator": {
        "yourInformation": "Ihre Informationen"
      },
      "inputs": {
        "flooringType": {
          "label": "Bodenbelag Typ",
          "helpText": "Wählen Sie den Typ des Bodenbelagmaterials",
          "options": {
            "hardwood": "Parkett",
            "laminate": "Laminat",
            "vinyl": "Vinyl/LVP",
            "tile": "Fliesen",
            "carpet": "Teppich"
          }
        },
        "roomLength": {
          "label": "Raumlänge",
          "helpText": "Die Länge des Raumes"
        },
        "roomWidth": {
          "label": "Raumbreite",
          "helpText": "Die Breite des Raumes"
        },
        "numberOfRooms": {
          "label": "Anzahl der Räume",
          "helpText": "Identische Räume zum Verlegen (verwenden Sie 1 für einen einzelnen Raum)"
        },
        "installPattern": {
          "label": "Verlegemuster",
          "helpText": "Diagonale und Fischgrätmuster benötigen 15-20% mehr Material",
          "options": {
            "straight": "Gerade / Versetzt",
            "diagonal": "Diagonal (45°)",
            "herringbone": "Fischgrät / Parkett"
          }
        },
        "wasteFactor": {
          "label": "Verschnittfaktor",
          "helpText": "Zusätzliches Material für Schnitte, Verschnitt und zukünftige Reparaturen. 10% Standard, 15% für komplexe Räume"
        },
        "boxSize": {
          "label": "Paket Abdeckung",
          "helpText": "Quadratmeter pro Paket/Karton. Typisch: Parkett 2, Laminat 2,2, Vinyl 2,2, Fliesen 1,4. Verwenden Sie 0 für Teppich (wird pro m² verkauft)"
        },
        "includeCost": {
          "label": "Kostenschätzung einschließen",
          "helpText": "Aktivieren Sie dies, um Materialkosten zu berechnen"
        },
        "costPerSqFt": {
          "label": "Kosten pro Quadratmeter",
          "helpText": "Materialkosten pro m² (Laminat 20-60€, Parkett 40-120€, Fliesen 40-150€, Vinyl 20-50€)"
        }
      },
      "results": {
        "totalArea": {
          "label": "Gesamtfläche"
        },
        "totalAreaMetric": {
          "label": "Gesamtfläche (Metrisch)"
        },
        "areaWithWaste": {
          "label": "Mit Verschnittfaktor"
        },
        "boxesNeeded": {
          "label": "Benötigte Pakete"
        },
        "estimatedCost": {
          "label": "Geschätzte Kosten"
        },
        "materialCostPerBox": {
          "label": "Kosten pro Paket"
        },
        "underlayment": {
          "label": "Trittschalldämmung"
        }
      },
      "presets": {
        "bedroomHardwood": {
          "label": "Schlafzimmer (Parkett)",
          "description": "3,7×3,0 m, Parkett, gerader Einbau"
        },
        "livingRoomLaminate": {
          "label": "Wohnzimmer (Laminat)",
          "description": "6,1×4,6 m, Laminat, gerader Einbau"
        },
        "kitchenTile": {
          "label": "Küche (Fliesen)",
          "description": "4,3×3,7 m, Fliesen, 15% Verschnitt"
        },
        "basementVinyl": {
          "label": "Keller (Vinyl)",
          "description": "7,6×6,1 m, Vinyl/LVP, gerader Einbau"
        },
        "wholeHomeCarpet": {
          "label": "Ganzes Haus (Teppich)",
          "description": "5 Räume × 4,6×3,7 m jeweils"
        }
      },
      "values": {
        "sqFt": "m²",
        "sqM": "m²",
        "sqYd": "m²",
        "boxes": "Pakete",
        "rolls": "Rollen"
      },
      "formats": {
        "summary": "Sie benötigen {area} Bodenbelagmaterial ({boxes} Pakete). Mit {waste}% Verschnittfaktor: {areaWaste}."
      },
      "infoCards": {
        "metrics": {
          "title": "📊 Bodenmessungen",
          "items": [
            {
              "label": "Gesamtfläche",
              "valueKey": "totalArea"
            },
            {
              "label": "Fläche (Metrisch)",
              "valueKey": "totalAreaMetric"
            },
            {
              "label": "Mit Verschnitt",
              "valueKey": "areaWithWaste"
            },
            {
              "label": "Benötigte Pakete",
              "valueKey": "boxesNeeded"
            }
          ]
        },
        "details": {
          "title": "📦 Projektdetails",
          "items": [
            {
              "label": "Trittschalldämmung",
              "valueKey": "underlayment"
            },
            {
              "label": "Muster Extra",
              "valueKey": "patternExtra"
            },
            {
              "label": "Kosten pro Paket",
              "valueKey": "materialCostPerBox"
            },
            {
              "label": "Geschätzte Kosten",
              "valueKey": "estimatedCost"
            }
          ]
        },
        "tips": {
          "title": "💡 Bodenbelag Tipps",
          "items": [
            "Kaufen Sie immer 10% zusätzliches Material für gerade Verlegungen. Für diagonale Muster kaufen Sie 15%. Für Fischgrät kaufen Sie 20%. Bewahren Sie Reste für zukünftige Reparaturen auf.",
            "Akklimatisieren Sie Parkett und Laminat 48-72 Stunden im Raum vor der Verlegung. Das verhindert Dehnungsfugen und Aufwölben nach der Installation.",
            "Schwimmende Böden (Laminat, Vinyl, Fertigparkett) sind DIY-freundlich. Fliesen und Massivparkett benötigen normalerweise professionelle Werkzeuge und Erfahrung.",
            "Überprüfen Sie, ob Ihr Bodenbelag Trittschalldämmung benötigt — die meisten schwimmenden Böden tun das. Einige Produkte kommen bereits mit vorinstallierter Dämmung, was Zeit und Kosten spart."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Was ist ein Bodenbelag Rechner?",
          "content": "Ein Bodenbelag Rechner hilft Ihnen dabei, genau zu bestimmen, wie viel Material Sie für Ihr Bodenbelagprojekt kaufen müssen. Er berücksichtigt Raumabmessungen, die Anzahl der Räume, Verschnittfaktor für Schnitte und Fehler sowie Ihr gewähltes Verlegemuster. Der Rechner wandelt Ihre Messungen in verwendbare Mengen um — Gesamtquadratmeter, Anzahl der Pakete oder Kartons und geschätzte Kosten — damit Sie genau bestellen können, ohne zu viel zu kaufen oder mitten im Projekt zu wenig zu haben."
        },
        "howItWorks": {
          "title": "Wie Bodenbelag berechnet wird",
          "content": "Die Grundberechnung multipliziert Raumlänge mit Raumbreite, um die Grundfläche zu erhalten, dann multipliziert mit der Anzahl identischer Räume. Ein Verschnittfaktor wird hinzugefügt, um Schnitte an Wänden, um Hindernisse herum und Musteranpassung zu berücksichtigen. Das Verlegemuster beeinflusst den Verschnitt: gerade Verlegungen benötigen 10% extra, diagonale Muster benötigen 15% und Fischgrät- oder Parkettmuster benötigen 20%. Die Gesamtfläche mit Verschnitt wird durch die Paketabdeckung (typisch 1,4-2,2 m² pro Paket je nach Material) geteilt, um zu bestimmen, wie viele Pakete gekauft werden müssen, immer aufgerundet auf das nächste ganze Paket."
        },
        "considerations": {
          "title": "Wichtige Überlegungen",
          "items": [
            {
              "text": "Messen Sie jeden Raum separat, wenn sie unterschiedliche Größen haben. Schätzen Sie nicht — selbst kleine Messfehler verstärken sich beim Materialkauf.",
              "type": "warning"
            },
            {
              "text": "Räume sind selten perfekt rechteckig. Messen Sie an den breitesten Stellen und berücksichtigen Sie Erker, Schränke und Nischen separat.",
              "type": "info"
            },
            {
              "text": "Teppich wird normalerweise von 4-Meter-breiten Rollen verkauft. Wenn Ihr Raum breiter als 4 Meter ist, wird es Nähte geben. Planen Sie die Nahtplatzierung in wenig frequentierten Bereichen.",
              "type": "info"
            },
            {
              "text": "Untergrundvorbereitung kann erhebliche Kosten verursachen. Unebene Untergründe können Ausgleichsmasse benötigen (5-20€/m²), und die Entfernung alter Bodenbeläge erhöht Zeit und Kosten.",
              "type": "warning"
            },
            {
              "text": "Feuchtigkeitsprüfung ist für Keller und Betonplatten unerlässlich. Vinyl und Fliesen handhaben Feuchtigkeit gut; Parkett und Laminat können sich in feuchten Umgebungen verziehen.",
              "type": "warning"
            },
            {
              "text": "Bewahren Sie 1-2 zusätzliche Pakete passenden Bodenbelags flach in einem klimakontrollierten Bereich auf. Sie werden sich später bedanken, wenn eine Diele beschädigt wird.",
              "type": "info"
            }
          ]
        },
        "categories": {
          "title": "Bodenbelag Material Vergleich",
          "items": [
            {
              "text": "Parkett — Hochwertiges Vollholz. Kosten: 40-120€/m². Lebensdauer: 25-100 Jahre (abschleifbar). Beste Wahl für Wohnbereiche. Vermeiden Sie Keller und Badezimmer.",
              "type": "info"
            },
            {
              "text": "Laminat — Fotoschicht über gepresster Holzfaser. Kosten: 20-60€/m². Lebensdauer: 15-25 Jahre. Kratzfest, einfache DIY-Installation. Nicht abschleifbar.",
              "type": "info"
            },
            {
              "text": "Vinyl/LVP — Luxury Vinyl Plank. Kosten: 20-50€/m². Lebensdauer: 15-25 Jahre. Wasserfest, großartig für Küchen und Keller. Sehr DIY-freundlich.",
              "type": "info"
            },
            {
              "text": "Fliesen (Keramik/Feinsteinzeug) — Kosten: 40-150€/m². Lebensdauer: 50+ Jahre. Wasserfest, sehr haltbar. Professionelle Installation empfohlen. Kalt unter den Füßen.",
              "type": "info"
            },
            {
              "text": "Teppich — Kosten: 10-80€/m². Lebensdauer: 5-15 Jahre. Warm und komfortabel. Wird von Rollen verkauft, nicht Pakete. Regelmäßige Reinigung erforderlich.",
              "type": "info"
            },
            {
              "text": "Fertigparkett — Echte Holzfurnier über Sperrholz. Kosten: 30-100€/m². Lebensdauer: 20-50 Jahre. Bessere Feuchtigkeitsbeständigkeit als Vollholz. Kann 1-2 Mal abgeschliffen werden.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Berechnungsbeispiele",
          "description": "Schritt-für-Schritt Bodenbelag Berechnungen",
          "examples": [
            {
              "title": "Schlafzimmer mit Parkett (3,7×3,0 m, gerade)",
              "steps": [
                "Grundfläche: 3,7 × 3,0 = 11,1 m²",
                "Verschnittfaktor (10%): 11,1 × 0,10 = 1,1 m²",
                "Gesamt benötigt: 11,1 + 1,1 = 12,2 m²",
                "Paketgröße: 2,0 m² pro Paket",
                "Pakete: 12,2 ÷ 2,0 = 6,1 → Aufrunden auf 7 Pakete",
                "Kosten bei 60€/m²: 12,2 × 60€ = 732€"
              ],
              "result": "Kaufen Sie 7 Pakete Parkett (14,0 m²) für einen 11,1 m² Raum. Geschätzte Materialkosten: 732€."
            },
            {
              "title": "Wohnzimmer mit diagonalen Fliesen (4,3×3,7 m)",
              "steps": [
                "Grundfläche: 4,3 × 3,7 = 15,9 m²",
                "Diagonaler Muster Verschnitt (15%): 15,9 × 0,15 = 2,4 m²",
                "Gesamt benötigt: 15,9 + 2,4 = 18,3 m²",
                "Paketgröße: 1,4 m² pro Paket (Fliesen)",
                "Pakete: 18,3 ÷ 1,4 = 13,1 → Aufrunden auf 14 Pakete",
                "Kosten bei 80€/m²: 18,3 × 80€ = 1.464€"
              ],
              "result": "Kaufen Sie 14 Pakete Fliesen (19,6 m²) für einen 15,9 m² Raum mit diagonaler Verlegung. Geschätzte Materialkosten: 1.464€."
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Wie viel zusätzlichen Bodenbelag sollte ich für Verschnitt kaufen?",
          "answer": "Für gerade oder versetzte Installationen fügen Sie 10% extra hinzu. Für diagonale Muster fügen Sie 15% hinzu. Für Fischgrät- oder Parkettmuster fügen Sie 20% hinzu. Erstmalige DIY-Verleger sollten zusätzlich 5% über diese Empfehlungen hinaus einplanen. Es ist auch ratsam, einige zusätzliche Dielen für zukünftige Reparaturen aufzubewahren."
        },
        {
          "question": "Wie viele Quadratmeter kommen in ein Paket Bodenbelag?",
          "answer": "Die Abdeckung variiert je nach Produkt: Parkett kommt typischerweise in Paketen von 1,5-2,5 m² (meist 2,0 m²). Laminat ist normalerweise 2,0-2,2 m² pro Paket. Vinyl/LVP reicht von 2,0-2,8 m² pro Paket. Fliesen variieren stark bei 1,0-1,4 m² pro Paket je nach Fliesengröße. Überprüfen Sie immer die spezifische Produktverpackung."
        },
        {
          "question": "Ist es günstiger, Bodenbelag selbst zu verlegen?",
          "answer": "DIY-Installation kann 50-70% der Arbeitskosten sparen, die typischerweise 20-80€/m² je nach Material betragen. Klick-Laminat und Vinyl sind am DIY-freundlichsten. Fliesen benötigen spezielle Werkzeuge (Nasssäge, Kellen) und Technik. Massivparkett benötigt einen Nagler und Erfahrung. Berücksichtigen Sie Werkzeugmietkosten (50-200€) beim Vergleich von DIY vs. professionell."
        },
        {
          "question": "Welcher Bodenbelag ist am besten für feuchte Bereiche?",
          "answer": "Für Badezimmer, Küchen, Keller und Waschräume: Feinsteinzeug oder Keramikfliesen sind der Goldstandard — vollständig wasserfest und langlebig. Luxury Vinyl Plank (LVP) ist eine ausgezeichnete Alternative — wasserfest, komfortabel und einfach zu installieren. Vermeiden Sie Massivparkett und Standard-Laminat in nassen Bereichen, da sie sich verziehen, aufquellen oder Schimmel entwickeln können."
        },
        {
          "question": "Benötige ich Trittschalldämmung für meinen Bodenbelag?",
          "answer": "Die meisten schwimmenden Böden (Laminat, Vinyl, Fertigparkett) benötigen Trittschalldämmung für Dämpfung, Schallreduzierung und Feuchtigkeitsschutz. Einige Produkte kommen mit vorinstallierter Dämmung — überprüfen Sie die Verpackung. Fliesen benötigen Bauplatten oder einen genehmigten Untergrund. Teppich verwendet eine separate Teppichunterlage. Massivparkett mit Nägeln benötigt typischerweise keine separate Dämmung."
        },
        {
          "question": "Wie berechne ich Bodenbelag für einen unregelmäßigen Raum?",
          "answer": "Teilen Sie den Raum in rechteckige Abschnitte auf und messen Sie jeden separat (Länge × Breite). Addieren Sie alle Abschnitte für die Gesamtfläche. Für Erker und Nischen messen Sie diese als separate Rechtecke und addieren sie. Für L-förmige Räume teilen Sie in zwei Rechtecke. Messen Sie immer an den breitesten Stellen und runden Sie auf, um ausreichende Abdeckung sicherzustellen."
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
