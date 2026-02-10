import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";
import { convertToBase } from "@/engine/v4/units";

// ============================================================================
// CONCRETE CALCULATOR - V4.3 (EN ONLY)
// Upgrades: imageradio shapes, stepper, toggle, stairs support
// ============================================================================

export const concreteCalculatorConfig: CalculatorConfigV4 = {
  id: "concrete-calculator",
  version: "4.0",
  category: "home",
  icon: "🏗️",

  presets: [
    {
      id: "patioSlab",
      icon: "🏡",
      values: {
        projectShape: "slab",
        length: 10,
        width: 10,
        thickness: 4,
        quantity: 1,
        wasteFactor: 10,
        bagSize: "80",
        costPerCubicYard: 150,
        includeRebar: false,
      },
    },
    {
      id: "driveway",
      icon: "🚗",
      values: {
        projectShape: "slab",
        length: 20,
        width: 10,
        thickness: 6,
        quantity: 1,
        wasteFactor: 10,
        bagSize: "80",
        costPerCubicYard: 150,
        includeRebar: true,
        rebarSpacing: 12,
      },
    },
    {
      id: "sidewalk",
      icon: "🚶",
      values: {
        projectShape: "slab",
        length: 30,
        width: 3,
        thickness: 4,
        quantity: 1,
        wasteFactor: 10,
        bagSize: "80",
        costPerCubicYard: 150,
        includeRebar: false,
      },
    },
    {
      id: "fencePosts",
      icon: "🪵",
      values: {
        projectShape: "column",
        diameter: 10,
        columnHeight: 24,
        quantity: 10,
        wasteFactor: 10,
        bagSize: "80",
        costPerCubicYard: 150,
        includeRebar: false,
      },
    },
    {
      id: "frontSteps",
      icon: "🪜",
      values: {
        projectShape: "stairs",
        numberOfSteps: 4,
        risePerStep: 7,
        runPerStep: 11,
        stairWidth: 36,
        quantity: 1,
        wasteFactor: 10,
        bagSize: "80",
        costPerCubicYard: 150,
        includeRebar: true,
        rebarSpacing: 12,
      },
    },
  ],

  t: {
    en: {
      name: "Concrete Calculator",
      slug: "concrete-calculator",
      subtitle: "Estimate cubic yards, bags, weight, cost, and rebar for slabs, columns, walls, and stairs.",
      breadcrumb: "Concrete",

      seo: {
        title: "Concrete Calculator - Free Cubic Yards & Bags Estimator",
        description: "Estimate cubic yards, bags, weight, cost, and rebar for slabs, footings, columns, walls, and stairs. Supports 40, 60, and 80 lb bags with waste factor.",
        shortDescription: "Calculate concrete volume and bags for any project.",
        keywords: [
          "concrete calculator",
          "how much concrete do i need",
          "cubic yard calculator",
          "concrete bags calculator",
          "slab calculator",
          "footing calculator",
          "free concrete calculator",
          "concrete cost estimator",
        ],
      },

      calculator: { yourInformation: "Project Dimensions" },
      ui: {
        yourInformation: "Project Dimensions",
        calculate: "Calculate",
        reset: "Reset",
        results: "Results",
      },

      inputs: {
        projectShape: {
          label: "Project Type",
          helpText: "Select the shape of your concrete project",
          options: {
            slab: "Slab / Footing",
            column: "Column / Post",
            wall: "Wall",
            stairs: "Stairs",
          },
        },
        length: {
          label: "Length",
          helpText: "Length of the slab, footing, or wall",
        },
        width: {
          label: "Width",
          helpText: "Width of the slab or footing",
        },
        thickness: {
          label: "Thickness",
          helpText: "Depth of concrete (typically 4-6 in for slabs)",
        },
        diameter: {
          label: "Diameter",
          helpText: "Diameter of round column or post hole",
        },
        columnHeight: {
          label: "Height",
          helpText: "Height of the column or post",
        },
        wallThickness: {
          label: "Wall Thickness",
          helpText: "Thickness of the poured wall",
        },
        wallHeight: {
          label: "Wall Height",
          helpText: "Height of the wall",
        },
        numberOfSteps: {
          label: "Number of Steps",
          helpText: "Total number of stair steps",
          suffix: "steps",
        },
        risePerStep: {
          label: "Rise per Step",
          helpText: "Vertical height of each step (typically 7-8 in)",
        },
        runPerStep: {
          label: "Run per Step",
          helpText: "Horizontal depth of each step (typically 10-12 in)",
        },
        stairWidth: {
          label: "Stair Width",
          helpText: "Width of the staircase",
        },
        quantity: {
          label: "Quantity",
          helpText: "Number of identical units",
          suffix: "units",
        },
        wasteFactor: {
          label: "Waste Factor",
          helpText: "5-10% extra recommended",
        },
        bagSize: {
          label: "Bag Size",
          helpText: "Size of pre-mixed concrete bags",
          options: {
            "40": "40 lb bag",
            "60": "60 lb bag",
            "80": "80 lb bag",
          },
        },
        costPerCubicYard: {
          label: "Cost per Cubic Yard",
          helpText: "Ready-mix typically $125-170/yd³",
        },
        includeRebar: {
          label: "Include Rebar Estimate",
          helpText: "Calculate rebar reinforcement needs",
        },
        rebarSpacing: {
          label: "Rebar Spacing",
          helpText: "Distance between rebar bars (inches)",
        },
      },

      results: {
        concreteVolume: { label: "Concrete Volume" },
        bagsNeeded: { label: "Bags Needed" },
        totalWeight: { label: "Total Weight" },
        estimatedCost: { label: "Estimated Cost" },
      },

      presets: {
        patioSlab: { label: "Patio Slab", description: "10×10 ft, 4 in thick" },
        driveway: { label: "Driveway", description: "20×10 ft, 6 in thick + rebar" },
        sidewalk: { label: "Sidewalk", description: "30×3 ft, 4 in thick" },
        fencePosts: { label: "Fence Posts", description: "10 posts, 10 in × 24 in" },
        frontSteps: { label: "Front Steps", description: "4 steps, 36 in wide" },
      },

      values: {
        "yd³": "yd³",
        "ft³": "ft³",
        "m³": "m³",
        "bags": "bags",
        "bag": "bag",
        "lbs": "lbs",
        "tons": "tons",
        "ton": "ton",
        "ft": "ft",
        "in": "in",
        "pcs": "pcs",
        "steps": "steps",
      },

      formats: {
        summary: "You need {volume} cubic yards ({bags} bags) of concrete for this project.",
      },

      infoCards: {
        estimate: {
          title: "🧱 Concrete Estimate",
          items: [
            { label: "Volume", valueKey: "volumeFormatted" },
            { label: "Bags Needed", valueKey: "bagsFormatted" },
            { label: "Total Weight", valueKey: "weightFormatted" },
            { label: "Estimated Cost", valueKey: "costFormatted" },
          ],
        },
        details: {
          title: "📐 Project Details",
          items: [
            { label: "Volume (ft³)", valueKey: "volumeFt3" },
            { label: "Bags Breakdown", valueKey: "bagsBreakdown" },
            { label: "Rebar Estimate", valueKey: "rebarEstimate" },
            { label: "Recommendation", valueKey: "recommendation" },
          ],
        },
        tips: {
          title: "💡 Concrete Tips",
          items: [
            "Always add 5-10% extra for waste, spillage, and uneven subgrade — running short mid-pour is costly.",
            "Standard concrete reaches 90% strength in 28 days. Keep it damp during the first week for best curing results.",
            "For projects over 1 cubic yard, order ready-mix delivery — it saves hours of mixing and ensures consistent quality.",
            "Use rebar or wire mesh on slabs over 4 inches thick and any driveway or load-bearing surface to prevent cracking.",
          ],
        },
      },

      education: {
        whatIs: {
          title: "How to Calculate Concrete Volume",
          content: "Calculating concrete volume depends on the shape of your project. For rectangular slabs and footings, multiply length × width × thickness (depth). For cylindrical columns and post holes, use π × radius² × height. For stairs, each step forms a wedge shape — volume is calculated as width × run × rise × steps, plus a solid base underneath. Convert the result to cubic yards by dividing cubic feet by 27. One cubic yard of concrete weighs approximately 4,000 lbs (about 2 tons). Always order 5-10% extra to account for waste, spillage, and uneven ground. Ready-mix concrete is sold by the cubic yard and typically costs $125-170 per yard depending on your location and mix specifications.",
        },
        howItWorks: {
          title: "Bags vs. Ready-Mix Concrete",
          content: "Pre-mixed concrete bags come in 40, 60, and 80 lb sizes. An 80 lb bag yields approximately 0.6 cubic feet (0.022 cubic yards). You need about 45 bags of 80-lb concrete to make one cubic yard. For projects under 1 cubic yard, bags are practical for DIY mixing. For larger projects, ready-mix delivery from a concrete truck is more economical ($125-170/yard vs $200-300/yard from bags) and ensures consistent quality. The minimum truck delivery is typically 1 cubic yard. Mixing concrete properly requires the right water ratio — too much water weakens the concrete, while too little makes it difficult to work with.",
        },
        considerations: {
          title: "Important Considerations",
          items: [
            { text: "Never order the exact amount — add 5-10% waste factor for spillage and uneven subgrade", type: "warning" },
            { text: "Concrete should be poured above 40°F (4°C) — cold weather can permanently damage curing concrete", type: "warning" },
            { text: "Standard residential slab thickness is 4 inches for patios, 5-6 inches for driveways and garages", type: "info" },
            { text: "Concrete can be walked on in 24-48 hours but needs 28 days to reach full strength", type: "info" },
            { text: "Rebar spacing of 12 inches is standard for driveways; 18 inches for patios and walkways", type: "info" },
            { text: "For stairs, standard rise is 7-8 inches and run is 10-12 inches per building codes", type: "info" },
          ],
        },
        bagYields: {
          title: "Bag Size Yields",
          items: [
            { text: "40 lb bag: yields ~0.30 ft³ (0.011 yd³) — easiest to carry, most bags needed", type: "info" },
            { text: "60 lb bag: yields ~0.45 ft³ (0.017 yd³) — good balance of weight and yield", type: "info" },
            { text: "80 lb bag: yields ~0.60 ft³ (0.022 yd³) — most economical per cubic foot", type: "info" },
            { text: "1 cubic yard needs: ~90 bags (40 lb), ~60 bags (60 lb), or ~45 bags (80 lb)", type: "info" },
            { text: "Bags are ideal for projects under 0.5 cubic yards — above that, consider ready-mix delivery", type: "info" },
            { text: "Quick estimate for 4-inch slabs: square footage ÷ 81 = cubic yards needed", type: "info" },
          ],
        },
        examples: {
          title: "Concrete Calculation Examples",
          description: "Step-by-step examples for common projects",
          examples: [
            {
              title: "10×10 ft Patio Slab (4 in)",
              steps: [
                "Volume = 10 × 10 × (4/12) = 33.33 ft³",
                "Convert: 33.33 ÷ 27 = 1.23 yd³",
                "Add 10% waste: 1.23 × 1.10 = 1.36 yd³",
                "80 lb bags: 1.36 ÷ 0.022 = 62 bags",
                "Weight: 1.36 × 4,000 = 5,440 lbs",
                "Cost: 1.36 × $150 = ~$204",
              ],
              result: "1.36 yd³ = 62 bags (80 lb) ≈ $204",
            },
            {
              title: "4 Concrete Steps (36 in wide)",
              steps: [
                "Step volume = (36/12) × (11/12) × (7/12) = 1.60 ft³ each",
                "Stacked: step 1 carries all 4 rises = 4 × 1.60 ft³ base",
                "Total wedge volume ≈ 10 × (28/12) × (44/12) × 0.5 = 42.8 ft³",
                "Convert: 42.8 ÷ 27 = 1.59 yd³",
                "Add 10% waste: 1.59 × 1.10 = 1.74 yd³",
                "80 lb bags: ≈ 80 bags",
              ],
              result: "1.74 yd³ = ~80 bags (80 lb) ≈ $262",
            },
          ],
        },
      },

      faqs: [
        {
          question: "How much concrete do I need for a 10×10 slab?",
          answer: "A 10×10 foot slab at 4 inches thick requires approximately 1.23 cubic yards, which is about 56 bags of 80 lb concrete (before waste factor). With a 10% waste factor, order about 62 bags or 1.36 cubic yards. For a 6-inch thick slab, you'll need approximately 1.85 cubic yards or 84 bags of 80 lb concrete.",
        },
        {
          question: "How many bags of concrete are in a cubic yard?",
          answer: "One cubic yard requires approximately 45 bags of 80 lb concrete, 60 bags of 60 lb concrete, or 90 bags of 40 lb concrete. These numbers can vary slightly by brand, so always check the bag yield on the packaging. For large projects over 1 cubic yard, ready-mix delivery is usually more practical and cost-effective.",
        },
        {
          question: "How much does a cubic yard of concrete weigh?",
          answer: "A cubic yard of standard ready-mix concrete weighs approximately 3,700-4,100 lbs (about 2 tons). The exact weight depends on the mix design and moisture content. Lightweight concrete weighs about 2,800 lbs per cubic yard, while heavy-duty structural concrete can weigh up to 4,400 lbs per cubic yard.",
        },
        {
          question: "Should I use bags or ready-mix concrete?",
          answer: "Use bags for small projects under 0.5-1 cubic yard (fence posts, small repairs, steps). Use ready-mix truck delivery for anything over 1 cubic yard — it's more economical ($125-170/yd vs $200-300/yd from bags), saves hours of manual mixing, and ensures consistent quality. Most suppliers have a minimum delivery of 1 cubic yard.",
        },
        {
          question: "How thick should my concrete slab be?",
          answer: "Standard residential thicknesses: 4 inches for patios, walkways, and sidewalks. 5-6 inches for driveways and garage floors that support vehicles. 6-8 inches for heavy-duty applications like RV pads or commercial floors. Footings are typically 12+ inches deep. Thicker slabs should include rebar or wire mesh reinforcement.",
        },
        {
          question: "How do I calculate concrete for stairs?",
          answer: "Concrete stairs are calculated as stacked wedges. Each step adds a rise (typically 7 in) on top of the previous one, so the bottom step supports the full height. The formula accounts for the cumulative volume: width × run × (sum of rises from 1 to N steps). Standard residential stairs have a 7-inch rise and 11-inch run. Always add 10% waste for stairs since the formwork is more complex.",
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
      accessibility: { mobileResults: "Results", closeModal: "Close", openMenu: "Menu" },
      sources: { title: "Sources & References" },
    },
    es: {
      "name": "Calculadora de Concreto",
      "slug": "calculadora-concreto",
      "subtitle": "Estima yardas cúbicas, bolsas, peso, costo y refuerzo para losas, columnas, muros y escaleras.",
      "breadcrumb": "Concreto",
      "seo": {
        "title": "Calculadora de Concreto - Estimador Gratuito de Yardas Cúbicas y Bolsas",
        "description": "Estima yardas cúbicas, bolsas, peso, costo y refuerzo para losas, cimientos, columnas, muros y escaleras. Compatible con bolsas de 40, 60 y 80 lb con factor de desperdicio.",
        "shortDescription": "Calcula volumen de concreto y bolsas para cualquier proyecto.",
        "keywords": [
          "calculadora de concreto",
          "cuánto concreto necesito",
          "calculadora yarda cúbica",
          "calculadora bolsas concreto",
          "calculadora losa",
          "calculadora cimiento",
          "calculadora concreto gratis",
          "estimador costo concreto"
        ]
      },
      "calculator": {
        "yourInformation": "Tu Información"
      },
      "inputs": {
        "projectShape": {
          "label": "Tipo de Proyecto",
          "helpText": "Selecciona la forma de tu proyecto de concreto",
          "options": {
            "slab": "Losa / Cimiento",
            "column": "Columna / Poste",
            "wall": "Muro",
            "stairs": "Escaleras"
          }
        },
        "length": {
          "label": "Longitud",
          "helpText": "Longitud de la losa, cimiento o muro"
        },
        "width": {
          "label": "Ancho",
          "helpText": "Ancho de la losa o cimiento"
        },
        "thickness": {
          "label": "Espesor",
          "helpText": "Profundidad del concreto (típicamente 4-6 in para losas)"
        },
        "diameter": {
          "label": "Diámetro",
          "helpText": "Diámetro de columna redonda o agujero de poste"
        },
        "columnHeight": {
          "label": "Altura",
          "helpText": "Altura de la columna o poste"
        },
        "wallThickness": {
          "label": "Espesor del Muro",
          "helpText": "Espesor del muro vaciado"
        },
        "wallHeight": {
          "label": "Altura del Muro",
          "helpText": "Altura del muro"
        },
        "numberOfSteps": {
          "label": "Número de Escalones",
          "helpText": "Total de escalones de la escalera",
          "suffix": "escalones"
        },
        "risePerStep": {
          "label": "Altura por Escalón",
          "helpText": "Altura vertical de cada escalón (típicamente 7-8 in)"
        },
        "runPerStep": {
          "label": "Huella por Escalón",
          "helpText": "Profundidad horizontal de cada escalón (típicamente 10-12 in)"
        },
        "stairWidth": {
          "label": "Ancho de Escalera",
          "helpText": "Ancho de la escalera"
        },
        "quantity": {
          "label": "Cantidad",
          "helpText": "Número de unidades idénticas",
          "suffix": "unidades"
        },
        "wasteFactor": {
          "label": "Factor de Desperdicio",
          "helpText": "5-10% extra recomendado"
        },
        "bagSize": {
          "label": "Tamaño de Bolsa",
          "helpText": "Tamaño de bolsas de concreto pre-mezclado",
          "options": {
            "40": "Bolsa 40 lb",
            "60": "Bolsa 60 lb",
            "80": "Bolsa 80 lb"
          }
        },
        "costPerCubicYard": {
          "label": "Costo por Yarda Cúbica",
          "helpText": "Concreto premezclado típicamente $125-170/yd³"
        },
        "includeRebar": {
          "label": "Incluir Estimado de Refuerzo",
          "helpText": "Calcular necesidades de refuerzo con varillas"
        },
        "rebarSpacing": {
          "label": "Espaciado de Varillas",
          "helpText": "Distancia entre varillas de refuerzo (pulgadas)"
        }
      },
      "results": {
        "concreteVolume": {
          "label": "Volumen de Concreto"
        },
        "bagsNeeded": {
          "label": "Bolsas Necesarias"
        },
        "totalWeight": {
          "label": "Peso Total"
        },
        "estimatedCost": {
          "label": "Costo Estimado"
        }
      },
      "presets": {
        "patioSlab": {
          "label": "Losa de Patio",
          "description": "10×10 ft, 4 in de espesor"
        },
        "driveway": {
          "label": "Entrada de Auto",
          "description": "20×10 ft, 6 in de espesor + refuerzo"
        },
        "sidewalk": {
          "label": "Banqueta",
          "description": "30×3 ft, 4 in de espesor"
        },
        "fencePosts": {
          "label": "Postes de Cerca",
          "description": "10 postes, 10 in × 24 in"
        },
        "frontSteps": {
          "label": "Escalones Frontales",
          "description": "4 escalones, 36 in de ancho"
        }
      },
      "values": {
        "yd³": "yd³",
        "ft³": "ft³",
        "m³": "m³",
        "bags": "bolsas",
        "bag": "bolsa",
        "lbs": "lbs",
        "tons": "toneladas",
        "ton": "tonelada",
        "ft": "ft",
        "in": "in",
        "pcs": "pzs",
        "steps": "escalones"
      },
      "formats": {
        "summary": "Necesitas {volume} yardas cúbicas ({bags} bolsas) de concreto para este proyecto."
      },
      "infoCards": {
        "estimate": {
          "title": "🧱 Estimado de Concreto",
          "items": [
            {
              "label": "Volumen",
              "valueKey": "volumeFormatted"
            },
            {
              "label": "Bolsas Necesarias",
              "valueKey": "bagsFormatted"
            },
            {
              "label": "Peso Total",
              "valueKey": "weightFormatted"
            },
            {
              "label": "Costo Estimado",
              "valueKey": "costFormatted"
            }
          ]
        },
        "details": {
          "title": "📐 Detalles del Proyecto",
          "items": [
            {
              "label": "Volumen (ft³)",
              "valueKey": "volumeFt3"
            },
            {
              "label": "Desglose de Bolsas",
              "valueKey": "bagsBreakdown"
            },
            {
              "label": "Estimado de Refuerzo",
              "valueKey": "rebarEstimate"
            },
            {
              "label": "Recomendación",
              "valueKey": "recommendation"
            }
          ]
        },
        "tips": {
          "title": "💡 Consejos de Concreto",
          "items": [
            "Siempre agrega 5-10% extra por desperdicio, derrame y subrasante irregular — quedarse corto a mitad del vaciado es costoso.",
            "El concreto estándar alcanza 90% de resistencia en 28 días. Manténlo húmedo durante la primera semana para mejor curado.",
            "Para proyectos mayores a 1 yarda cúbica, ordena entrega de concreto premezclado — ahorra horas de mezclado y asegura calidad consistente.",
            "Usa varillas o malla de alambre en losas mayores a 4 pulgadas de espesor y cualquier entrada o superficie que soporte carga para prevenir grietas."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Cómo Calcular el Volumen de Concreto",
          "content": "Calcular el volumen de concreto depende de la forma de tu proyecto. Para losas y cimientos rectangulares, multiplica longitud × ancho × espesor (profundidad). Para columnas cilíndricas y agujeros de postes, usa π × radio² × altura. Para escaleras, cada escalón forma una cuña — el volumen se calcula como ancho × huella × altura × escalones, más una base sólida debajo. Convierte el resultado a yardas cúbicas dividiendo pies cúbicos entre 27. Una yarda cúbica de concreto pesa aproximadamente 4,000 lbs (cerca de 2 toneladas). Siempre ordena 5-10% extra para desperdicio, derrame y terreno irregular. El concreto premezclado se vende por yarda cúbica y típicamente cuesta $125-170 por yarda dependiendo de tu ubicación y especificaciones de mezcla."
        },
        "howItWorks": {
          "title": "Bolsas vs. Concreto Premezclado",
          "content": "Las bolsas de concreto pre-mezclado vienen en tamaños de 40, 60 y 80 lb. Una bolsa de 80 lb rinde aproximadamente 0.6 pies cúbicos (0.022 yardas cúbicas). Necesitas cerca de 45 bolsas de concreto de 80-lb para hacer una yarda cúbica. Para proyectos menores a 1 yarda cúbica, las bolsas son prácticas para mezclado DIY. Para proyectos más grandes, la entrega de concreto premezclado de un camión es más económica ($125-170/yarda vs $200-300/yarda con bolsas) y asegura calidad consistente. La entrega mínima de camión es típicamente 1 yarda cúbica. Mezclar concreto correctamente requiere la proporción correcta de agua — mucha agua debilita el concreto, mientras que poca hace difícil trabajar con él."
        },
        "considerations": {
          "title": "Consideraciones Importantes",
          "items": [
            {
              "text": "Nunca ordenes la cantidad exacta — agrega factor de desperdicio de 5-10% por derrame y subrasante irregular",
              "type": "warning"
            },
            {
              "text": "El concreto debe vaciarse arriba de 40°F (4°C) — clima frío puede dañar permanentemente el concreto en curado",
              "type": "warning"
            },
            {
              "text": "El espesor estándar de losa residencial es 4 pulgadas para patios, 5-6 pulgadas para entradas y garajes",
              "type": "info"
            },
            {
              "text": "El concreto puede pisarse en 24-48 horas pero necesita 28 días para alcanzar resistencia total",
              "type": "info"
            },
            {
              "text": "Espaciado de varillas de 12 pulgadas es estándar para entradas; 18 pulgadas para patios y banquetas",
              "type": "info"
            },
            {
              "text": "Para escaleras, altura estándar es 7-8 pulgadas y huella es 10-12 pulgadas según códigos de construcción",
              "type": "info"
            }
          ]
        },
        "bagYields": {
          "title": "Rendimiento por Tamaño de Bolsa",
          "items": [
            {
              "text": "Bolsa 40 lb: rinde ~0.30 ft³ (0.011 yd³) — más fácil de cargar, más bolsas necesarias",
              "type": "info"
            },
            {
              "text": "Bolsa 60 lb: rinde ~0.45 ft³ (0.017 yd³) — buen balance de peso y rendimiento",
              "type": "info"
            },
            {
              "text": "Bolsa 80 lb: rinde ~0.60 ft³ (0.022 yd³) — más económica por pie cúbico",
              "type": "info"
            },
            {
              "text": "1 yarda cúbica necesita: ~90 bolsas (40 lb), ~60 bolsas (60 lb), o ~45 bolsas (80 lb)",
              "type": "info"
            },
            {
              "text": "Las bolsas son ideales para proyectos menores a 0.5 yardas cúbicas — arriba de eso, considera entrega premezclada",
              "type": "info"
            },
            {
              "text": "Estimado rápido para losas de 4 pulgadas: pies cuadrados ÷ 81 = yardas cúbicas necesarias",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Ejemplos de Cálculo de Concreto",
          "description": "Ejemplos paso a paso para proyectos comunes",
          "examples": [
            {
              "title": "Losa de Patio 10×10 ft (4 in)",
              "steps": [
                "Volumen = 10 × 10 × (4/12) = 33.33 ft³",
                "Convertir: 33.33 ÷ 27 = 1.23 yd³",
                "Agregar 10% desperdicio: 1.23 × 1.10 = 1.36 yd³",
                "Bolsas 80 lb: 1.36 ÷ 0.022 = 62 bolsas",
                "Peso: 1.36 × 4,000 = 5,440 lbs",
                "Costo: 1.36 × $150 = ~$204"
              ],
              "result": "1.36 yd³ = 62 bolsas (80 lb) ≈ $204"
            },
            {
              "title": "4 Escalones de Concreto (36 in de ancho)",
              "steps": [
                "Volumen por escalón = (36/12) × (11/12) × (7/12) = 1.60 ft³ cada uno",
                "Apilados: escalón 1 carga las 4 alturas = 4 × 1.60 ft³ base",
                "Volumen total de cuña ≈ 10 × (28/12) × (44/12) × 0.5 = 42.8 ft³",
                "Convertir: 42.8 ÷ 27 = 1.59 yd³",
                "Agregar 10% desperdicio: 1.59 × 1.10 = 1.74 yd³",
                "Bolsas 80 lb: ≈ 80 bolsas"
              ],
              "result": "1.74 yd³ = ~80 bolsas (80 lb) ≈ $262"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "¿Cuánto concreto necesito para una losa de 10×10?",
          "answer": "Una losa de 10×10 pies con 4 pulgadas de espesor requiere aproximadamente 1.23 yardas cúbicas, que son cerca de 56 bolsas de concreto de 80 lb (antes del factor de desperdicio). Con un factor de desperdicio del 10%, ordena cerca de 62 bolsas o 1.36 yardas cúbicas. Para una losa de 6 pulgadas de espesor, necesitarás aproximadamente 1.85 yardas cúbicas o 84 bolsas de concreto de 80 lb."
        },
        {
          "question": "¿Cuántas bolsas de concreto hay en una yarda cúbica?",
          "answer": "Una yarda cúbica requiere aproximadamente 45 bolsas de concreto de 80 lb, 60 bolsas de concreto de 60 lb, o 90 bolsas de concreto de 40 lb. Estos números pueden variar ligeramente por marca, así que siempre revisa el rendimiento de la bolsa en el empaque. Para proyectos grandes mayores a 1 yarda cúbica, la entrega de concreto premezclado es usualmente más práctica y costo-efectiva."
        },
        {
          "question": "¿Cuánto pesa una yarda cúbica de concreto?",
          "answer": "Una yarda cúbica de concreto premezclado estándar pesa aproximadamente 3,700-4,100 lbs (cerca de 2 toneladas). El peso exacto depende del diseño de mezcla y contenido de humedad. El concreto ligero pesa cerca de 2,800 lbs por yarda cúbica, mientras que el concreto estructural de servicio pesado puede pesar hasta 4,400 lbs por yarda cúbica."
        },
        {
          "question": "¿Debo usar bolsas o concreto premezclado?",
          "answer": "Usa bolsas para proyectos pequeños menores a 0.5-1 yarda cúbica (postes de cerca, reparaciones pequeñas, escalones). Usa entrega de camión premezclado para cualquier cosa mayor a 1 yarda cúbica — es más económico ($125-170/yd vs $200-300/yd con bolsas), ahorra horas de mezclado manual, y asegura calidad consistente. La mayoría de proveedores tienen una entrega mínima de 1 yarda cúbica."
        },
        {
          "question": "¿Qué tan gruesa debe ser mi losa de concreto?",
          "answer": "Espesores residenciales estándar: 4 pulgadas para patios, andadores y banquetas. 5-6 pulgadas para entradas y pisos de garaje que soportan vehículos. 6-8 pulgadas para aplicaciones de servicio pesado como bases para casas rodantes o pisos comerciales. Los cimientos son típicamente de 12+ pulgadas de profundidad. Las losas más gruesas deben incluir refuerzo con varillas o malla de alambre."
        },
        {
          "question": "¿Cómo calculo concreto para escaleras?",
          "answer": "Las escaleras de concreto se calculan como cuñas apiladas. Cada escalón agrega una altura (típicamente 7 in) encima del anterior, así que el escalón inferior soporta la altura total. La fórmula considera el volumen acumulativo: ancho × huella × (suma de alturas de 1 a N escalones). Las escaleras residenciales estándar tienen altura de 7 pulgadas y huella de 11 pulgadas. Siempre agrega 10% de desperdicio para escaleras ya que la cimbra es más compleja."
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
      "name": "Calculadora de Concreto",
      "slug": "calculadora-concreto",
      "subtitle": "Estime jardas cúbicas, sacos, peso, custo e vergalhões para lajes, colunas, paredes e escadas.",
      "breadcrumb": "Concreto",
      "seo": {
        "title": "Calculadora de Concreto - Estimador Gratuito de Jardas Cúbicas e Sacos",
        "description": "Estime jardas cúbicas, sacos, peso, custo e vergalhões para lajes, fundações, colunas, paredes e escadas. Suporta sacos de 20, 25 e 40 kg com fator de desperdício.",
        "shortDescription": "Calcule volume de concreto e sacos para qualquer projeto.",
        "keywords": [
          "calculadora de concreto",
          "quanto concreto preciso",
          "calculadora metro cubico",
          "calculadora sacos concreto",
          "calculadora laje",
          "calculadora fundacao",
          "calculadora concreto gratuita",
          "estimador custo concreto"
        ]
      },
      "calculator": {
        "yourInformation": "Suas Informações"
      },
      "inputs": {
        "projectShape": {
          "label": "Tipo de Projeto",
          "helpText": "Selecione o formato do seu projeto de concreto",
          "options": {
            "slab": "Laje / Fundação",
            "column": "Coluna / Poste",
            "wall": "Parede",
            "stairs": "Escadas"
          }
        },
        "length": {
          "label": "Comprimento",
          "helpText": "Comprimento da laje, fundação ou parede"
        },
        "width": {
          "label": "Largura",
          "helpText": "Largura da laje ou fundação"
        },
        "thickness": {
          "label": "Espessura",
          "helpText": "Profundidade do concreto (normalmente 10-15 cm para lajes)"
        },
        "diameter": {
          "label": "Diâmetro",
          "helpText": "Diâmetro da coluna redonda ou buraco do poste"
        },
        "columnHeight": {
          "label": "Altura",
          "helpText": "Altura da coluna ou poste"
        },
        "wallThickness": {
          "label": "Espessura da Parede",
          "helpText": "Espessura da parede concretada"
        },
        "wallHeight": {
          "label": "Altura da Parede",
          "helpText": "Altura da parede"
        },
        "numberOfSteps": {
          "label": "Número de Degraus",
          "helpText": "Total de degraus da escada",
          "suffix": "degraus"
        },
        "risePerStep": {
          "label": "Altura por Degrau",
          "helpText": "Altura vertical de cada degrau (normalmente 18-20 cm)"
        },
        "runPerStep": {
          "label": "Profundidade por Degrau",
          "helpText": "Profundidade horizontal de cada degrau (normalmente 25-30 cm)"
        },
        "stairWidth": {
          "label": "Largura da Escada",
          "helpText": "Largura da escadaria"
        },
        "quantity": {
          "label": "Quantidade",
          "helpText": "Número de unidades idênticas",
          "suffix": "unidades"
        },
        "wasteFactor": {
          "label": "Fator de Desperdício",
          "helpText": "5-10% extra recomendado"
        },
        "bagSize": {
          "label": "Tamanho do Saco",
          "helpText": "Tamanho dos sacos de concreto pré-misturado",
          "options": {
            "40": "Saco de 20 kg",
            "60": "Saco de 25 kg",
            "80": "Saco de 40 kg"
          }
        },
        "costPerCubicYard": {
          "label": "Custo por Metro Cúbico",
          "helpText": "Concreto usinado normalmente R$ 300-450/m³"
        },
        "includeRebar": {
          "label": "Incluir Estimativa de Vergalhão",
          "helpText": "Calcular necessidades de reforço com vergalhão"
        },
        "rebarSpacing": {
          "label": "Espaçamento do Vergalhão",
          "helpText": "Distância entre barras de vergalhão (centímetros)"
        }
      },
      "results": {
        "concreteVolume": {
          "label": "Volume de Concreto"
        },
        "bagsNeeded": {
          "label": "Sacos Necessários"
        },
        "totalWeight": {
          "label": "Peso Total"
        },
        "estimatedCost": {
          "label": "Custo Estimado"
        }
      },
      "presets": {
        "patioSlab": {
          "label": "Laje de Pátio",
          "description": "3×3 m, 10 cm de espessura"
        },
        "driveway": {
          "label": "Garagem",
          "description": "6×3 m, 15 cm espessura + vergalhão"
        },
        "sidewalk": {
          "label": "Calçada",
          "description": "9×1 m, 10 cm de espessura"
        },
        "fencePosts": {
          "label": "Postes de Cerca",
          "description": "10 postes, 25 cm × 60 cm"
        },
        "frontSteps": {
          "label": "Degraus Frontais",
          "description": "4 degraus, 90 cm de largura"
        }
      },
      "values": {
        "yd³": "m³",
        "ft³": "m³",
        "m³": "m³",
        "bags": "sacos",
        "bag": "saco",
        "lbs": "kg",
        "tons": "toneladas",
        "ton": "tonelada",
        "ft": "m",
        "in": "cm",
        "pcs": "pçs",
        "steps": "degraus"
      },
      "formats": {
        "summary": "Você precisa de {volume} metros cúbicos ({bags} sacos) de concreto para este projeto."
      },
      "infoCards": {
        "estimate": {
          "title": "🧱 Estimativa de Concreto",
          "items": [
            {
              "label": "Volume",
              "valueKey": "volumeFormatted"
            },
            {
              "label": "Sacos Necessários",
              "valueKey": "bagsFormatted"
            },
            {
              "label": "Peso Total",
              "valueKey": "weightFormatted"
            },
            {
              "label": "Custo Estimado",
              "valueKey": "costFormatted"
            }
          ]
        },
        "details": {
          "title": "📐 Detalhes do Projeto",
          "items": [
            {
              "label": "Volume (m³)",
              "valueKey": "volumeFt3"
            },
            {
              "label": "Detalhamento de Sacos",
              "valueKey": "bagsBreakdown"
            },
            {
              "label": "Estimativa de Vergalhão",
              "valueKey": "rebarEstimate"
            },
            {
              "label": "Recomendação",
              "valueKey": "recommendation"
            }
          ]
        },
        "tips": {
          "title": "💡 Dicas de Concreto",
          "items": [
            "Sempre adicione 5-10% extra para desperdício, derramamento e terreno irregular — ficar sem concreto no meio da concretagem é custoso.",
            "O concreto padrão atinge 90% da resistência em 28 dias. Mantenha-o úmido durante a primeira semana para melhor cura.",
            "Para projetos acima de 1 metro cúbico, peça concreto usinado — economiza horas de mistura e garante qualidade consistente.",
            "Use vergalhão ou tela de aço em lajes acima de 10 cm de espessura e qualquer garagem ou superfície que suporte carga para prevenir rachaduras."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Como Calcular Volume de Concreto",
          "content": "Calcular o volume de concreto depende do formato do seu projeto. Para lajes e fundações retangulares, multiplique comprimento × largura × espessura. Para colunas cilíndricas e buracos de postes, use π × raio² × altura. Para escadas, cada degrau forma uma cunha — o volume é calculado como largura × profundidade × altura × degraus, mais uma base sólida embaixo. Converta o resultado para metros cúbicos. Um metro cúbico de concreto pesa aproximadamente 2.400 kg. Sempre peça 5-10% extra para desperdício, derramamento e terreno irregular. Concreto usinado é vendido por metro cúbico e normalmente custa R$ 300-450 por metro cúbico dependendo da sua localização e especificações da mistura."
        },
        "howItWorks": {
          "title": "Sacos vs. Concreto Usinado",
          "content": "Sacos de concreto pré-misturado vêm em tamanhos de 20, 25 e 40 kg. Um saco de 40 kg rende aproximadamente 0,017 metros cúbicos. Você precisa de cerca de 60 sacos de 40 kg para fazer um metro cúbico. Para projetos abaixo de 1 metro cúbico, sacos são práticos para mistura manual. Para projetos maiores, concreto usinado é mais econômico (R$ 300-450/m³ vs R$ 500-700/m³ de sacos) e garante qualidade consistente. A entrega mínima de caminhão é tipicamente 1 metro cúbico. Misturar concreto adequadamente requer a proporção correta de água — água demais enfraquece o concreto, enquanto pouca água dificulta o trabalho."
        },
        "considerations": {
          "title": "Considerações Importantes",
          "items": [
            {
              "text": "Nunca peça a quantidade exata — adicione 5-10% de fator de desperdício para derramamento e terreno irregular",
              "type": "warning"
            },
            {
              "text": "Concreto deve ser despejado acima de 5°C — tempo frio pode danificar permanentemente a cura do concreto",
              "type": "warning"
            },
            {
              "text": "Espessura padrão de laje residencial é 10 cm para pátios, 12-15 cm para garagens",
              "type": "info"
            },
            {
              "text": "Concreto pode ser pisado em 24-48 horas mas precisa de 28 dias para atingir resistência total",
              "type": "info"
            },
            {
              "text": "Espaçamento de vergalhão de 30 cm é padrão para garagens; 45 cm para pátios e calçadas",
              "type": "info"
            },
            {
              "text": "Para escadas, altura padrão é 18-20 cm e profundidade é 25-30 cm por códigos de construção",
              "type": "info"
            }
          ]
        },
        "bagYields": {
          "title": "Rendimento dos Sacos",
          "items": [
            {
              "text": "Saco de 20 kg: rende ~0,008 m³ — mais fácil de carregar, mais sacos necessários",
              "type": "info"
            },
            {
              "text": "Saco de 25 kg: rende ~0,012 m³ — bom equilíbrio entre peso e rendimento",
              "type": "info"
            },
            {
              "text": "Saco de 40 kg: rende ~0,017 m³ — mais econômico por metro cúbico",
              "type": "info"
            },
            {
              "text": "1 metro cúbico precisa: ~125 sacos (20 kg), ~85 sacos (25 kg), ou ~60 sacos (40 kg)",
              "type": "info"
            },
            {
              "text": "Sacos são ideais para projetos abaixo de 0,5 metros cúbicos — acima disso, considere concreto usinado",
              "type": "info"
            },
            {
              "text": "Estimativa rápida para lajes de 10 cm: metros quadrados ÷ 10 = metros cúbicos necessários",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemplos de Cálculo de Concreto",
          "description": "Exemplos passo a passo para projetos comuns",
          "examples": [
            {
              "title": "Laje de Pátio 3×3 m (10 cm)",
              "steps": [
                "Volume = 3 × 3 × 0,10 = 0,90 m³",
                "Adicionar 10% desperdício: 0,90 × 1,10 = 0,99 m³",
                "Sacos de 40 kg: 0,99 ÷ 0,017 = 58 sacos",
                "Peso: 0,99 × 2.400 = 2.376 kg",
                "Custo: 0,99 × R$ 350 = ~R$ 347"
              ],
              "result": "0,99 m³ = 58 sacos (40 kg) ≈ R$ 347"
            },
            {
              "title": "4 Degraus de Concreto (90 cm largura)",
              "steps": [
                "Volume por degrau = 0,90 × 0,28 × 0,18 = 0,045 m³ cada",
                "Empilhados: degrau 1 carrega todas as 4 alturas = 4 × 0,045 m³ base",
                "Volume total da cunha ≈ 0,32 m³",
                "Adicionar 10% desperdício: 0,32 × 1,10 = 0,35 m³",
                "Sacos de 40 kg: ≈ 21 sacos"
              ],
              "result": "0,35 m³ = ~21 sacos (40 kg) ≈ R$ 123"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Quanto concreto preciso para uma laje de 3×3 metros?",
          "answer": "Uma laje de 3×3 metros com 10 cm de espessura requer aproximadamente 0,90 metros cúbicos, que são cerca de 53 sacos de concreto de 40 kg (antes do fator de desperdício). Com 10% de fator de desperdício, peça cerca de 58 sacos ou 0,99 metros cúbicos. Para uma laje de 15 cm de espessura, você precisará de aproximadamente 1,35 metros cúbicos ou 79 sacos de 40 kg."
        },
        {
          "question": "Quantos sacos de concreto há em um metro cúbico?",
          "answer": "Um metro cúbico requer aproximadamente 60 sacos de concreto de 40 kg, 85 sacos de 25 kg, ou 125 sacos de 20 kg. Esses números podem variar ligeiramente por marca, então sempre verifique o rendimento na embalagem. Para projetos grandes acima de 1 metro cúbico, concreto usinado é geralmente mais prático e econômico."
        },
        {
          "question": "Quanto pesa um metro cúbico de concreto?",
          "answer": "Um metro cúbico de concreto usinado padrão pesa aproximadamente 2.300-2.500 kg. O peso exato depende do design da mistura e conteúdo de umidade. Concreto leve pesa cerca de 1.800 kg por metro cúbico, enquanto concreto estrutural pesado pode pesar até 2.800 kg por metro cúbico."
        },
        {
          "question": "Devo usar sacos ou concreto usinado?",
          "answer": "Use sacos para projetos pequenos abaixo de 0,5-1 metro cúbico (postes de cerca, pequenos reparos, degraus). Use concreto usinado para qualquer coisa acima de 1 metro cúbico — é mais econômico (R$ 300-450/m³ vs R$ 500-700/m³ de sacos), economiza horas de mistura manual e garante qualidade consistente. A maioria dos fornecedores tem entrega mínima de 1 metro cúbico."
        },
        {
          "question": "Qual espessura deve ter minha laje de concreto?",
          "answer": "Espessuras residenciais padrão: 10 cm para pátios, calçadas e passeios. 12-15 cm para garagens e pisos que suportam veículos. 15-20 cm para aplicações pesadas como pátios para trailers ou pisos comerciais. Fundações são tipicamente 30+ cm de profundidade. Lajes mais espessas devem incluir reforço com vergalhão ou tela de aço."
        },
        {
          "question": "Como calcular concreto para escadas?",
          "answer": "Escadas de concreto são calculadas como cunhas empilhadas. Cada degrau adiciona uma altura (normalmente 18 cm) em cima do anterior, então o degrau inferior suporta a altura total. A fórmula considera o volume cumulativo: largura × profundidade × (soma das alturas de 1 a N degraus). Escadas residenciais padrão têm altura de 18 cm e profundidade de 28 cm. Sempre adicione 10% de desperdício para escadas pois as formas são mais complexas."
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
      "name": "Calculateur de Béton",
      "slug": "calculateur-beton",
      "subtitle": "Estimez les verges cubes, sacs, poids, coût et armature pour dalles, colonnes, murs et escaliers.",
      "breadcrumb": "Béton",
      "seo": {
        "title": "Calculateur de Béton - Estimateur Gratuit Verges Cubes & Sacs",
        "description": "Estimez les verges cubes, sacs, poids, coût et armature pour dalles, fondations, colonnes, murs et escaliers. Supporte sacs de 18, 27 et 36 kg avec facteur de gaspillage.",
        "shortDescription": "Calculez le volume de béton et les sacs pour tout projet.",
        "keywords": [
          "calculateur de béton",
          "combien de béton ai-je besoin",
          "calculateur verges cubes",
          "calculateur sacs béton",
          "calculateur dalle",
          "calculateur fondation",
          "calculateur béton gratuit",
          "estimateur coût béton"
        ]
      },
      "calculator": {
        "yourInformation": "Vos Informations"
      },
      "inputs": {
        "projectShape": {
          "label": "Type de Projet",
          "helpText": "Sélectionnez la forme de votre projet de béton",
          "options": {
            "slab": "Dalle / Fondation",
            "column": "Colonne / Poteau",
            "wall": "Mur",
            "stairs": "Escaliers"
          }
        },
        "length": {
          "label": "Longueur",
          "helpText": "Longueur de la dalle, fondation ou mur"
        },
        "width": {
          "label": "Largeur",
          "helpText": "Largeur de la dalle ou fondation"
        },
        "thickness": {
          "label": "Épaisseur",
          "helpText": "Profondeur du béton (typiquement 10-15 cm pour dalles)"
        },
        "diameter": {
          "label": "Diamètre",
          "helpText": "Diamètre de la colonne ronde ou trou de poteau"
        },
        "columnHeight": {
          "label": "Hauteur",
          "helpText": "Hauteur de la colonne ou poteau"
        },
        "wallThickness": {
          "label": "Épaisseur du Mur",
          "helpText": "Épaisseur du mur coulé"
        },
        "wallHeight": {
          "label": "Hauteur du Mur",
          "helpText": "Hauteur du mur"
        },
        "numberOfSteps": {
          "label": "Nombre de Marches",
          "helpText": "Nombre total de marches d'escalier",
          "suffix": "marches"
        },
        "risePerStep": {
          "label": "Hauteur par Marche",
          "helpText": "Hauteur verticale de chaque marche (typiquement 18-20 cm)"
        },
        "runPerStep": {
          "label": "Profondeur par Marche",
          "helpText": "Profondeur horizontale de chaque marche (typiquement 25-30 cm)"
        },
        "stairWidth": {
          "label": "Largeur de l'Escalier",
          "helpText": "Largeur de l'escalier"
        },
        "quantity": {
          "label": "Quantité",
          "helpText": "Nombre d'unités identiques",
          "suffix": "unités"
        },
        "wasteFactor": {
          "label": "Facteur de Gaspillage",
          "helpText": "5-10% supplémentaire recommandé"
        },
        "bagSize": {
          "label": "Taille de Sac",
          "helpText": "Taille des sacs de béton pré-mélangé",
          "options": {
            "40": "Sac 18 kg",
            "60": "Sac 27 kg",
            "80": "Sac 36 kg"
          }
        },
        "costPerCubicYard": {
          "label": "Coût par Verge Cube",
          "helpText": "Béton prêt-mix typiquement 165-225$/vc"
        },
        "includeRebar": {
          "label": "Inclure Estimation Armature",
          "helpText": "Calculer les besoins d'armature de renforcement"
        },
        "rebarSpacing": {
          "label": "Espacement Armature",
          "helpText": "Distance entre barres d'armature (centimètres)"
        }
      },
      "results": {
        "concreteVolume": {
          "label": "Volume de Béton"
        },
        "bagsNeeded": {
          "label": "Sacs Nécessaires"
        },
        "totalWeight": {
          "label": "Poids Total"
        },
        "estimatedCost": {
          "label": "Coût Estimé"
        }
      },
      "presets": {
        "patioSlab": {
          "label": "Dalle Patio",
          "description": "3×3 m, 10 cm d'épais"
        },
        "driveway": {
          "label": "Entrée",
          "description": "6×3 m, 15 cm d'épais + armature"
        },
        "sidewalk": {
          "label": "Trottoir",
          "description": "9×1 m, 10 cm d'épais"
        },
        "fencePosts": {
          "label": "Poteaux de Clôture",
          "description": "10 poteaux, 25 cm × 60 cm"
        },
        "frontSteps": {
          "label": "Marches d'Entrée",
          "description": "4 marches, 90 cm de large"
        }
      },
      "values": {
        "yd³": "vc³",
        "ft³": "pi³",
        "m³": "m³",
        "bags": "sacs",
        "bag": "sac",
        "lbs": "lb",
        "tons": "tonnes",
        "ton": "tonne",
        "ft": "pi",
        "in": "po",
        "pcs": "pcs",
        "steps": "marches"
      },
      "formats": {
        "summary": "Vous avez besoin de {volume} verges cubes ({bags} sacs) de béton pour ce projet."
      },
      "infoCards": {
        "estimate": {
          "title": "🧱 Estimation Béton",
          "items": [
            {
              "label": "Volume",
              "valueKey": "volumeFormatted"
            },
            {
              "label": "Sacs Nécessaires",
              "valueKey": "bagsFormatted"
            },
            {
              "label": "Poids Total",
              "valueKey": "weightFormatted"
            },
            {
              "label": "Coût Estimé",
              "valueKey": "costFormatted"
            }
          ]
        },
        "details": {
          "title": "📐 Détails du Projet",
          "items": [
            {
              "label": "Volume (pi³)",
              "valueKey": "volumeFt3"
            },
            {
              "label": "Répartition Sacs",
              "valueKey": "bagsBreakdown"
            },
            {
              "label": "Estimation Armature",
              "valueKey": "rebarEstimate"
            },
            {
              "label": "Recommandation",
              "valueKey": "recommendation"
            }
          ]
        },
        "tips": {
          "title": "💡 Conseils Béton",
          "items": [
            "Ajoutez toujours 5-10% supplémentaire pour le gaspillage, déversement et sol inégal — manquer de béton en cours de coulage coûte cher.",
            "Le béton standard atteint 90% de sa résistance en 28 jours. Gardez-le humide durant la première semaine pour un meilleur durcissement.",
            "Pour projets de plus de 0,75 verge cube, commandez la livraison prêt-mix — économise des heures de mélange et assure qualité constante.",
            "Utilisez armature ou treillis métallique sur dalles de plus de 10 cm d'épais et toute entrée ou surface portante pour prévenir fissures."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Comment Calculer le Volume de Béton",
          "content": "Calculer le volume de béton dépend de la forme de votre projet. Pour dalles et fondations rectangulaires, multipliez longueur × largeur × épaisseur (profondeur). Pour colonnes cylindriques et trous de poteaux, utilisez π × rayon² × hauteur. Pour escaliers, chaque marche forme une forme de coin — le volume est calculé comme largeur × profondeur × hauteur × marches, plus une base solide en dessous. Convertissez le résultat en verges cubes en divisant les pieds cubes par 27. Une verge cube de béton pèse approximativement 1800 kg (environ 1,8 tonnes). Commandez toujours 5-10% supplémentaire pour tenir compte du gaspillage, déversement et sol inégal. Le béton prêt-mix se vend à la verge cube et coûte typiquement 165-225$ par verge selon votre emplacement et spécifications du mélange."
        },
        "howItWorks": {
          "title": "Sacs vs Béton Prêt-Mix",
          "content": "Les sacs de béton pré-mélangé viennent en tailles de 18, 27 et 36 kg. Un sac de 36 kg produit approximativement 0,017 mètre cube (0,6 pied cube). Vous avez besoin d'environ 45 sacs de 36 kg pour faire une verge cube. Pour projets sous 0,75 verge cube, les sacs sont pratiques pour mélange DIY. Pour projets plus grands, la livraison prêt-mix d'un camion de béton est plus économique (165-225$/vc vs 260-390$/vc avec sacs) et assure qualité constante. La livraison minimum de camion est typiquement 0,75 verge cube. Mélanger le béton correctement nécessite le bon ratio d'eau — trop d'eau affaiblit le béton, tandis que pas assez le rend difficile à travailler."
        },
        "considerations": {
          "title": "Considérations Importantes",
          "items": [
            {
              "text": "Ne commandez jamais la quantité exacte — ajoutez 5-10% de facteur de gaspillage pour déversement et sol inégal",
              "type": "warning"
            },
            {
              "text": "Le béton devrait être coulé au-dessus de 4°C — temps froid peut endommager définitivement le durcissement du béton",
              "type": "warning"
            },
            {
              "text": "L'épaisseur standard de dalle résidentielle est 10 cm pour patios, 13-15 cm pour entrées et garages",
              "type": "info"
            },
            {
              "text": "On peut marcher sur le béton en 24-48 heures mais il faut 28 jours pour atteindre pleine résistance",
              "type": "info"
            },
            {
              "text": "Espacement d'armature de 30 cm est standard pour entrées; 45 cm pour patios et trottoirs",
              "type": "info"
            },
            {
              "text": "Pour escaliers, hauteur standard est 18-20 cm et profondeur 25-30 cm selon codes du bâtiment",
              "type": "info"
            }
          ]
        },
        "bagYields": {
          "title": "Rendement des Sacs",
          "items": [
            {
              "text": "Sac 18 kg: produit ~0,3 pi³ (0,011 vc³) — plus facile à porter, plus de sacs nécessaires",
              "type": "info"
            },
            {
              "text": "Sac 27 kg: produit ~0,45 pi³ (0,017 vc³) — bon équilibre poids et rendement",
              "type": "info"
            },
            {
              "text": "Sac 36 kg: produit ~0,6 pi³ (0,022 vc³) — plus économique par pied cube",
              "type": "info"
            },
            {
              "text": "1 verge cube nécessite: ~90 sacs (18 kg), ~60 sacs (27 kg), ou ~45 sacs (36 kg)",
              "type": "info"
            },
            {
              "text": "Sacs idéaux pour projets sous 0,4 verge cube — au-dessus, considérez livraison prêt-mix",
              "type": "info"
            },
            {
              "text": "Estimation rapide pour dalles 10 cm: pieds carrés ÷ 81 = verges cubes nécessaires",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemples de Calcul de Béton",
          "description": "Exemples étape par étape pour projets communs",
          "examples": [
            {
              "title": "Dalle Patio 3×3 m (10 cm)",
              "steps": [
                "Volume = 3 × 3 × 0,1 = 0,9 m³",
                "Convertir: 0,9 × 1,308 = 1,18 vc³",
                "Ajouter 10% gaspillage: 1,18 × 1,10 = 1,30 vc³",
                "Sacs 36 kg: 1,30 ÷ 0,022 = 59 sacs",
                "Poids: 1,30 × 1800 = 2340 kg",
                "Coût: 1,30 × 195$ = ~254$"
              ],
              "result": "1,30 vc³ = 59 sacs (36 kg) ≈ 254$"
            },
            {
              "title": "4 Marches Béton (90 cm large)",
              "steps": [
                "Volume marche = 0,9 × 0,28 × 0,18 = 0,045 m³ chacune",
                "Empilées: marche 1 porte toutes 4 hauteurs = 4 × 0,045 m³ base",
                "Volume total coin ≈ 0,31 × 0,71 × 1,12 × 0,5 = 0,123 m³",
                "Convertir: 0,123 × 1,308 = 0,161 vc³",
                "Ajouter 10% gaspillage: 0,161 × 1,10 = 0,177 vc³",
                "Sacs 36 kg: ≈ 8 sacs"
              ],
              "result": "0,177 vc³ = ~8 sacs (36 kg) ≈ 35$"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Combien de béton ai-je besoin pour une dalle 3×3?",
          "answer": "Une dalle 3×3 mètres à 10 cm d'épaisseur nécessite approximativement 1,18 verges cubes, soit environ 54 sacs de béton de 36 kg (avant facteur gaspillage). Avec 10% de gaspillage, commandez environ 59 sacs ou 1,30 verges cubes. Pour dalle 15 cm d'épaisseur, vous aurez besoin d'environ 1,77 verges cubes ou 80 sacs de 36 kg."
        },
        {
          "question": "Combien de sacs de béton dans une verge cube?",
          "answer": "Une verge cube nécessite approximativement 45 sacs de béton de 36 kg, 60 sacs de 27 kg, ou 90 sacs de 18 kg. Ces nombres peuvent varier légèrement selon la marque, donc vérifiez toujours le rendement du sac sur l'emballage. Pour gros projets de plus d'une verge cube, la livraison prêt-mix est généralement plus pratique et rentable."
        },
        {
          "question": "Combien pèse une verge cube de béton?",
          "answer": "Une verge cube de béton prêt-mix standard pèse approximativement 1680-1860 kg (environ 1,8 tonnes). Le poids exact dépend de la conception du mélange et teneur en humidité. Béton léger pèse environ 1270 kg par verge cube, tandis que béton structural haute résistance peut peser jusqu'à 2000 kg par verge cube."
        },
        {
          "question": "Devrais-je utiliser sacs ou béton prêt-mix?",
          "answer": "Utilisez sacs pour petits projets sous 0,4-0,75 verge cube (poteaux clôture, petites réparations, marches). Utilisez livraison camion prêt-mix pour tout au-dessus de 0,75 verge cube — c'est plus économique (165-225$/vc vs 260-390$/vc avec sacs), économise heures de mélange manuel, et assure qualité constante. Plupart fournisseurs ont livraison minimum de 0,75 verge cube."
        },
        {
          "question": "Quelle épaisseur pour ma dalle de béton?",
          "answer": "Épaisseurs résidentielles standard: 10 cm pour patios, allées et trottoirs. 13-15 cm pour entrées et planchers garage supportant véhicules. 15-20 cm pour applications lourdes comme supports VR ou planchers commerciaux. Fondations sont typiquement 30+ cm de profond. Dalles plus épaisses devraient inclure armature ou treillis métallique de renforcement."
        },
        {
          "question": "Comment calculer béton pour escaliers?",
          "answer": "Escaliers béton sont calculés comme coins empilés. Chaque marche ajoute une hauteur (typiquement 18 cm) par-dessus la précédente, donc marche du bas supporte hauteur complète. Formule tient compte du volume cumulatif: largeur × profondeur × (somme hauteurs de 1 à N marches). Escaliers résidentiels standard ont hauteur 18 cm et profondeur 28 cm. Ajoutez toujours 10% gaspillage pour escaliers car coffrage est plus complexe."
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
      "name": "Beton Rechner",
      "slug": "beton-rechner",
      "subtitle": "Berechnen Sie Kubikmeter, Säcke, Gewicht, Kosten und Bewehrung für Platten, Säulen, Wände und Treppen.",
      "breadcrumb": "Beton",
      "seo": {
        "title": "Beton Rechner - Kostenloser Kubikmeter & Säcke Kalkulator",
        "description": "Berechnen Sie Kubikmeter, Säcke, Gewicht, Kosten und Bewehrung für Platten, Fundamente, Säulen, Wände und Treppen. Unterstützt 25, 30 und 40 kg Säcke mit Verschnittfaktor.",
        "shortDescription": "Berechnen Sie Betonvolumen und Säcke für jedes Projekt.",
        "keywords": [
          "beton rechner",
          "wie viel beton brauche ich",
          "kubikmeter rechner",
          "beton säcke rechner",
          "platten rechner",
          "fundament rechner",
          "kostenloser beton rechner",
          "beton kosten rechner"
        ]
      },
      "calculator": {
        "yourInformation": "Ihre Informationen"
      },
      "inputs": {
        "projectShape": {
          "label": "Projekttyp",
          "helpText": "Wählen Sie die Form Ihres Betonprojekts",
          "options": {
            "slab": "Platte / Fundament",
            "column": "Säule / Pfosten",
            "wall": "Wand",
            "stairs": "Treppe"
          }
        },
        "length": {
          "label": "Länge",
          "helpText": "Länge der Platte, des Fundaments oder der Wand"
        },
        "width": {
          "label": "Breite",
          "helpText": "Breite der Platte oder des Fundaments"
        },
        "thickness": {
          "label": "Dicke",
          "helpText": "Betontiefe (typischerweise 10-15 cm für Platten)"
        },
        "diameter": {
          "label": "Durchmesser",
          "helpText": "Durchmesser der runden Säule oder des Pfostenlochs"
        },
        "columnHeight": {
          "label": "Höhe",
          "helpText": "Höhe der Säule oder des Pfostens"
        },
        "wallThickness": {
          "label": "Wanddicke",
          "helpText": "Dicke der gegossenen Wand"
        },
        "wallHeight": {
          "label": "Wandhöhe",
          "helpText": "Höhe der Wand"
        },
        "numberOfSteps": {
          "label": "Anzahl Stufen",
          "helpText": "Gesamtzahl der Treppenstufen",
          "suffix": "Stufen"
        },
        "risePerStep": {
          "label": "Steigung pro Stufe",
          "helpText": "Vertikale Höhe jeder Stufe (typischerweise 17-20 cm)"
        },
        "runPerStep": {
          "label": "Auftritt pro Stufe",
          "helpText": "Horizontale Tiefe jeder Stufe (typischerweise 25-30 cm)"
        },
        "stairWidth": {
          "label": "Treppenbreite",
          "helpText": "Breite der Treppe"
        },
        "quantity": {
          "label": "Anzahl",
          "helpText": "Anzahl identischer Einheiten",
          "suffix": "Einheiten"
        },
        "wasteFactor": {
          "label": "Verschnittfaktor",
          "helpText": "5-10% extra empfohlen"
        },
        "bagSize": {
          "label": "Sackgröße",
          "helpText": "Größe der Fertigbetonsäcke",
          "options": {
            "40": "25 kg Sack",
            "60": "30 kg Sack",
            "80": "40 kg Sack"
          }
        },
        "costPerCubicYard": {
          "label": "Kosten pro Kubikmeter",
          "helpText": "Transportbeton typischerweise €90-120/m³"
        },
        "includeRebar": {
          "label": "Bewehrung einbeziehen",
          "helpText": "Bewehrungsstahl-Bedarf berechnen"
        },
        "rebarSpacing": {
          "label": "Bewehrungsabstand",
          "helpText": "Abstand zwischen Bewehrungsstäben (Zentimeter)"
        }
      },
      "results": {
        "concreteVolume": {
          "label": "Betonvolumen"
        },
        "bagsNeeded": {
          "label": "Benötigte Säcke"
        },
        "totalWeight": {
          "label": "Gesamtgewicht"
        },
        "estimatedCost": {
          "label": "Geschätzte Kosten"
        }
      },
      "presets": {
        "patioSlab": {
          "label": "Terrassenplatte",
          "description": "3×3 m, 10 cm dick"
        },
        "driveway": {
          "label": "Einfahrt",
          "description": "6×3 m, 15 cm dick + Bewehrung"
        },
        "sidewalk": {
          "label": "Gehweg",
          "description": "9×1 m, 10 cm dick"
        },
        "fencePosts": {
          "label": "Zaunpfosten",
          "description": "10 Pfosten, 25 cm × 60 cm"
        },
        "frontSteps": {
          "label": "Eingangstreppe",
          "description": "4 Stufen, 90 cm breit"
        }
      },
      "values": {
        "yd³": "m³",
        "ft³": "m³",
        "m³": "m³",
        "bags": "Säcke",
        "bag": "Sack",
        "lbs": "kg",
        "tons": "Tonnen",
        "ton": "Tonne",
        "ft": "m",
        "in": "cm",
        "pcs": "Stk",
        "steps": "Stufen"
      },
      "formats": {
        "summary": "Sie benötigen {volume} Kubikmeter ({bags} Säcke) Beton für dieses Projekt."
      },
      "infoCards": {
        "estimate": {
          "title": "🧱 Betonschätzung",
          "items": [
            {
              "label": "Volumen",
              "valueKey": "volumeFormatted"
            },
            {
              "label": "Benötigte Säcke",
              "valueKey": "bagsFormatted"
            },
            {
              "label": "Gesamtgewicht",
              "valueKey": "weightFormatted"
            },
            {
              "label": "Geschätzte Kosten",
              "valueKey": "costFormatted"
            }
          ]
        },
        "details": {
          "title": "📐 Projektdetails",
          "items": [
            {
              "label": "Volumen (m³)",
              "valueKey": "volumeFt3"
            },
            {
              "label": "Säcke-Aufschlüsselung",
              "valueKey": "bagsBreakdown"
            },
            {
              "label": "Bewehrungsschätzung",
              "valueKey": "rebarEstimate"
            },
            {
              "label": "Empfehlung",
              "valueKey": "recommendation"
            }
          ]
        },
        "tips": {
          "title": "💡 Beton-Tipps",
          "items": [
            "Planen Sie immer 5-10% extra für Verschnitt, Verschütten und unebenen Untergrund - ein Mangel während des Gießens ist kostspielig.",
            "Standardbeton erreicht 90% seiner Festigkeit in 28 Tagen. Halten Sie ihn in der ersten Woche feucht für beste Aushärtung.",
            "Bei Projekten über 1 Kubikmeter bestellen Sie Transportbeton - das spart Stunden beim Mischen und gewährleistet gleichmäßige Qualität.",
            "Verwenden Sie Bewehrung oder Baustahlmatten bei Platten über 10 cm Dicke und jeder Einfahrt oder tragenden Oberfläche zur Rissverhinderung."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Betonvolumen berechnen",
          "content": "Die Berechnung des Betonvolumens hängt von der Form Ihres Projekts ab. Für rechteckige Platten und Fundamente multiplizieren Sie Länge × Breite × Dicke. Für zylindrische Säulen und Pfosten verwenden Sie π × Radius² × Höhe. Bei Treppen bildet jede Stufe eine Keilform - das Volumen wird als Breite × Auftritt × Steigung × Stufen plus eine solide Basis darunter berechnet. Ein Kubikmeter Beton wiegt etwa 2.400 kg. Bestellen Sie immer 5-10% extra für Verschnitt, Verschütten und unebenen Boden. Transportbeton wird pro Kubikmeter verkauft und kostet typischerweise €90-120 pro Kubikmeter je nach Standort und Mischspezifikation."
        },
        "howItWorks": {
          "title": "Säcke vs. Transportbeton",
          "content": "Fertigbetonsäcke gibt es in 25, 30 und 40 kg Größen. Ein 40 kg Sack ergibt etwa 0,02 Kubikmeter. Sie benötigen etwa 50 Säcke à 40 kg für einen Kubikmeter. Für Projekte unter 1 Kubikmeter sind Säcke praktisch zum Selbstmischen. Bei größeren Projekten ist Transportbeton wirtschaftlicher (€90-120/m³ vs €150-200/m³ aus Säcken) und gewährleistet gleichmäßige Qualität. Die Mindestliefermenge beträgt typischerweise 1 Kubikmeter. Beton richtig zu mischen erfordert das richtige Wasser-Zement-Verhältnis - zu viel Wasser schwächt den Beton, zu wenig macht ihn schwer verarbeitbar."
        },
        "considerations": {
          "title": "Wichtige Überlegungen",
          "items": [
            {
              "text": "Bestellen Sie nie die exakte Menge - fügen Sie 5-10% Verschnittfaktor für Verschütten und unebenen Untergrund hinzu",
              "type": "warning"
            },
            {
              "text": "Beton sollte über 4°C gegossen werden - kaltes Wetter kann aushärtenden Beton dauerhaft schädigen",
              "type": "warning"
            },
            {
              "text": "Standard-Wohnplattenstärke ist 10 cm für Terrassen, 12-15 cm für Einfahrten und Garagen",
              "type": "info"
            },
            {
              "text": "Beton kann nach 24-48 Stunden begangen werden, braucht aber 28 Tage für volle Festigkeit",
              "type": "info"
            },
            {
              "text": "Bewehrungsabstand von 30 cm ist Standard für Einfahrten; 45 cm für Terrassen und Gehwege",
              "type": "info"
            },
            {
              "text": "Für Treppen sind Standard-Steigung 17-20 cm und Auftritt 25-30 cm nach Bauordnung",
              "type": "info"
            }
          ]
        },
        "bagYields": {
          "title": "Sackgrößen-Erträge",
          "items": [
            {
              "text": "25 kg Sack: ergibt ~0,015 m³ - am leichtesten zu tragen, meiste Säcke benötigt",
              "type": "info"
            },
            {
              "text": "30 kg Sack: ergibt ~0,018 m³ - gute Balance zwischen Gewicht und Ertrag",
              "type": "info"
            },
            {
              "text": "40 kg Sack: ergibt ~0,02 m³ - wirtschaftlichster pro Kubikmeter",
              "type": "info"
            },
            {
              "text": "1 Kubikmeter benötigt: ~67 Säcke (25 kg), ~56 Säcke (30 kg) oder ~50 Säcke (40 kg)",
              "type": "info"
            },
            {
              "text": "Säcke sind ideal für Projekte unter 0,5 Kubikmeter - darüber sollten Sie Transportbeton erwägen",
              "type": "info"
            },
            {
              "text": "Schnellschätzung für 10 cm Platten: Quadratmeter ÷ 10 = Kubikmeter benötigt",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Betonberechnungs-Beispiele",
          "description": "Schritt-für-Schritt Beispiele für häufige Projekte",
          "examples": [
            {
              "title": "3×3 m Terrassenplatte (10 cm)",
              "steps": [
                "Volumen = 3 × 3 × 0,1 = 0,9 m³",
                "10% Verschnitt hinzufügen: 0,9 × 1,10 = 0,99 m³",
                "40 kg Säcke: 0,99 ÷ 0,02 = 50 Säcke",
                "Gewicht: 0,99 × 2.400 = 2.376 kg",
                "Kosten: 0,99 × €100 = ~€99"
              ],
              "result": "0,99 m³ = 50 Säcke (40 kg) ≈ €99"
            },
            {
              "title": "4 Betonstufen (90 cm breit)",
              "steps": [
                "Stufenvolumen = 0,9 × 0,28 × 0,18 = 0,045 m³ je Stufe",
                "Gestapelt: Stufe 1 trägt alle 4 Steigungen = 4 × 0,045 m³ Basis",
                "Gesamtes Keilvolumen ≈ 0,36 m³",
                "10% Verschnitt hinzufügen: 0,36 × 1,10 = 0,4 m³",
                "40 kg Säcke: ≈ 20 Säcke"
              ],
              "result": "0,4 m³ = ~20 Säcke (40 kg) ≈ €60"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Wie viel Beton brauche ich für eine 3×3 m Platte?",
          "answer": "Eine 3×3 Meter Platte bei 10 cm Dicke benötigt etwa 0,9 Kubikmeter, das sind etwa 45 Säcke à 40 kg Beton (vor Verschnittfaktor). Mit 10% Verschnittfaktor bestellen Sie etwa 50 Säcke oder 0,99 Kubikmeter. Für eine 15 cm dicke Platte benötigen Sie etwa 1,35 Kubikmeter oder 68 Säcke à 40 kg."
        },
        {
          "question": "Wie viele Säcke Beton sind in einem Kubikmeter?",
          "answer": "Ein Kubikmeter benötigt etwa 50 Säcke à 40 kg Beton, 56 Säcke à 30 kg oder 67 Säcke à 25 kg. Diese Zahlen können je nach Marke leicht variieren, prüfen Sie daher immer die Sackangaben auf der Verpackung. Für große Projekte über 1 Kubikmeter ist Transportbeton meist praktischer und kostengünstiger."
        },
        {
          "question": "Wie viel wiegt ein Kubikmeter Beton?",
          "answer": "Ein Kubikmeter Standard-Transportbeton wiegt etwa 2.300-2.500 kg. Das genaue Gewicht hängt von der Mischung und dem Feuchtigkeitsgehalt ab. Leichtbeton wiegt etwa 1.800 kg pro Kubikmeter, während schwerer Konstruktionsbeton bis zu 2.800 kg pro Kubikmeter wiegen kann."
        },
        {
          "question": "Sollte ich Säcke oder Transportbeton verwenden?",
          "answer": "Verwenden Sie Säcke für kleine Projekte unter 0,5-1 Kubikmeter (Zaunpfosten, kleine Reparaturen, Stufen). Verwenden Sie Transportbeton für alles über 1 Kubikmeter - es ist wirtschaftlicher (€90-120/m³ vs €150-200/m³ aus Säcken), spart Stunden manuellen Mischens und gewährleistet gleichmäßige Qualität. Die meisten Anbieter haben eine Mindestliefermenge von 1 Kubikmeter."
        },
        {
          "question": "Wie dick sollte meine Betonplatte sein?",
          "answer": "Standard-Wohndicken: 10 cm für Terrassen, Gehwege und Bürgersteige. 12-15 cm für Einfahrten und Garagenböden, die Fahrzeuge tragen. 15-20 cm für schwere Anwendungen wie Wohnmobilstellplätze oder Gewerbeböden. Fundamente sind typischerweise 30+ cm tief. Dickere Platten sollten Bewehrung oder Baustahlmatten enthalten."
        },
        {
          "question": "Wie berechne ich Beton für Treppen?",
          "answer": "Betontreppen werden als gestapelte Keile berechnet. Jede Stufe fügt eine Steigung (typisch 18 cm) auf die vorherige hinzu, also trägt die unterste Stufe die volle Höhe. Die Formel berücksichtigt das kumulative Volumen: Breite × Auftritt × (Summe der Steigungen von 1 bis N Stufen). Standard-Wohntreppen haben 18 cm Steigung und 28 cm Auftritt. Fügen Sie bei Treppen immer 10% Verschnitt hinzu, da die Schalung komplexer ist."
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

  // ============================================================================
  // INPUTS
  // ============================================================================
  inputs: [
    // ── Project Type (V4.3 imageradio) ──
    {
      id: "projectShape",
      type: "imageradio",
      columns: 4,
      defaultValue: "slab",
      options: [
        { value: "slab", label: "Slab / Footing", icon: "▬" },
        { value: "column", label: "Column / Post", icon: "⬤" },
        { value: "wall", label: "Wall", icon: "🧱" },
        { value: "stairs", label: "Stairs", icon: "🪜" },
      ],
    },

    // ── SLAB / FOOTING fields ──
    {
      id: "length",
      type: "number",
      defaultValue: null,
      placeholder: "10",
      unitType: "length",
      syncGroup: false,
      defaultUnit: "ft",
      allowedUnits: ["ft", "m"],
      showWhen: { field: "projectShape", value: ["slab", "wall"] },
    },
    {
      id: "width",
      type: "number",
      defaultValue: null,
      placeholder: "10",
      unitType: "length",
      syncGroup: false,
      defaultUnit: "ft",
      allowedUnits: ["ft", "m"],
      showWhen: { field: "projectShape", value: "slab" },
    },
    {
      id: "thickness",
      type: "number",
      defaultValue: 4,
      placeholder: "4",
      min: 1,
      max: 48,
      unitType: "length_small",
      syncGroup: false,
      defaultUnit: "in",
      allowedUnits: ["in", "cm"],
      showWhen: { field: "projectShape", value: "slab" },
    },

    // ── COLUMN fields ──
    {
      id: "diameter",
      type: "number",
      defaultValue: null,
      placeholder: "10",
      unitType: "length_small",
      syncGroup: false,
      defaultUnit: "in",
      allowedUnits: ["in", "cm"],
      showWhen: { field: "projectShape", value: "column" },
    },
    {
      id: "columnHeight",
      type: "number",
      defaultValue: null,
      placeholder: "24",
      unitType: "length_small",
      syncGroup: false,
      defaultUnit: "in",
      allowedUnits: ["in", "cm", "mm"],
      showWhen: { field: "projectShape", value: "column" },
    },

    // ── WALL fields ──
    {
      id: "wallHeight",
      type: "number",
      defaultValue: null,
      placeholder: "4",
      unitType: "length",
      syncGroup: false,
      defaultUnit: "ft",
      allowedUnits: ["ft", "m"],
      showWhen: { field: "projectShape", value: "wall" },
    },
    {
      id: "wallThickness",
      type: "number",
      defaultValue: 8,
      placeholder: "8",
      unitType: "length_small",
      syncGroup: false,
      defaultUnit: "in",
      allowedUnits: ["in", "cm"],
      showWhen: { field: "projectShape", value: "wall" },
    },

    // ── STAIRS fields (NEW V4.3) ──
    {
      id: "numberOfSteps",
      type: "stepper",
      defaultValue: 4,
      min: 1,
      max: 20,
      step: 1,
      suffix: "steps",
      showWhen: { field: "projectShape", value: "stairs" },
    },
    {
      id: "risePerStep",
      type: "number",
      defaultValue: 7,
      placeholder: "7",
      min: 4,
      max: 12,
      unitType: "length_small",
      syncGroup: false,
      defaultUnit: "in",
      allowedUnits: ["in", "cm"],
      showWhen: { field: "projectShape", value: "stairs" },
    },
    {
      id: "runPerStep",
      type: "number",
      defaultValue: 11,
      placeholder: "11",
      min: 8,
      max: 18,
      unitType: "length_small",
      syncGroup: false,
      defaultUnit: "in",
      allowedUnits: ["in", "cm"],
      showWhen: { field: "projectShape", value: "stairs" },
    },
    {
      id: "stairWidth",
      type: "number",
      defaultValue: null,
      placeholder: "36",
      unitType: "length_small",
      syncGroup: false,
      defaultUnit: "in",
      allowedUnits: ["in", "cm"],
      showWhen: { field: "projectShape", value: "stairs" },
    },

    // ── Common fields ──
    {
      id: "quantity",
      type: "stepper",
      defaultValue: 1,
      min: 1,
      max: 50,
      step: 1,
      suffix: "units",
    },
    {
      id: "wasteFactor",
      type: "range",
      defaultValue: 10,
      min: 0,
      max: 25,
      step: 1,
      suffix: "%",
    },
    {
      id: "bagSize",
      type: "select",
      defaultValue: "80",
      options: [
        { value: "40" },
        { value: "60" },
        { value: "80" },
      ],
    },
    {
      id: "costPerCubicYard",
      type: "number",
      defaultValue: 150,
      placeholder: "150",
      min: 0,
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "usd",
    },
    // ── Rebar toggle (V4.3) ──
    {
      id: "includeRebar",
      type: "toggle",
      defaultValue: false,
    },
    {
      id: "rebarSpacing",
      type: "number",
      defaultValue: 12,
      placeholder: "12",
      min: 4,
      max: 36,
      step: 1,
      suffix: "in",
      showWhen: { field: "includeRebar", value: true },
    },
  ],

  inputGroups: [],

  results: [
    { id: "concreteVolume", type: "primary", format: "text" },
    { id: "bagsNeeded", type: "secondary", format: "text" },
    { id: "totalWeight", type: "secondary", format: "text" },
    { id: "estimatedCost", type: "secondary", format: "text" },
  ],

  infoCards: [
    { id: "estimate", type: "list", icon: "🧱", itemCount: 4 },
    { id: "details", type: "list", icon: "📐", itemCount: 4 },
    { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  referenceData: [],

  educationSections: [
    { id: "whatIs", type: "prose", icon: "📖" },
    { id: "howItWorks", type: "prose", icon: "⚙️" },
    { id: "considerations", type: "list", icon: "📋", itemCount: 6 },
    { id: "bagYields", type: "list", icon: "📊", itemCount: 6 },
    { id: "examples", type: "code-example", icon: "🧮", columns: 2, exampleCount: 2 },
  ],

  faqs: [{ id: "0" }, { id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }],

  references: [
    {
      authors: "Portland Cement Association",
      year: "2024",
      title: "Concrete Basics: Mixing & Placing",
      source: "PCA",
      url: "https://www.cement.org/concrete-basics",
    },
    {
      authors: "Quikrete",
      year: "2025",
      title: "Concrete Calculator & Project Guide",
      source: "Quikrete",
      url: "https://www.quikrete.com/calculator/main.asp",
    },
  ],

  hero: { badge: "Home & Construction", title: "Concrete Calculator" },
  sidebar: { showConversions: true, showRelated: true },
  features: { showPresets: true, showShare: true, showPrint: true },
  relatedCalculators: ["square-footage-calculator", "drywall-calculator", "mulch-gravel-calculator"],
  ads: { showTopBanner: false, showSidebar: true, showBetweenSections: false },
};

// ============================================================================
// CALCULATE FUNCTION
// ============================================================================

function fmtNum(val: number): string {
  if (val === 0) return "0";
  if (Math.abs(val) < 0.01) return val.toExponential(2);
  if (Math.abs(val) >= 1000) return val.toLocaleString("en-US", { maximumFractionDigits: 0 });
  return val.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 2 });
}

export function calculateConcreteCalculator(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits = {}, t } = data;
  const v = (t?.values as Record<string, string>) || {};
  const f = (t?.formats as Record<string, string>) || {};

  const projectShape = (values.projectShape as string) || "slab";
  const quantity = (values.quantity as number) || 1;
  const wasteFactor = (values.wasteFactor as number) || 10;
  const bagSize = (values.bagSize as string) || "80";
  const costPerCubicYard = (values.costPerCubicYard as number) || 150;
  const includeRebar = values.includeRebar as boolean || false;
  const rebarSpacing = (values.rebarSpacing as number) || 12;

  // Bag yields in cubic feet
  const BAG_YIELDS: Record<string, number> = {
    "40": 0.30,
    "60": 0.45,
    "80": 0.60,
  };
  const bagYield = BAG_YIELDS[bagSize] || 0.60;
  const bagWeight = parseInt(bagSize) || 80;

  // Conversion constants (unit registry base: length=m, length_small=mm)
  const M_TO_FT = 3.28084;
  const MM_TO_IN = 0.0393701;

  let volumeFt3 = 0;

  // ── SLAB / FOOTING ──
  if (projectShape === "slab") {
    const lengthRaw = values.length as number | null;
    const widthRaw = values.width as number | null;
    const thicknessRaw = values.thickness as number | null;

    if (!lengthRaw || !widthRaw || !thicknessRaw) {
      return { values: {}, formatted: {}, summary: "", isValid: false };
    }

    const lengthFt = convertToBase(lengthRaw, fieldUnits.length || "ft", "length") * M_TO_FT;
    const widthFt = convertToBase(widthRaw, fieldUnits.width || "ft", "length") * M_TO_FT;
    const thicknessMm = convertToBase(thicknessRaw, fieldUnits.thickness || "in", "length_small");
    const thicknessFt = (thicknessMm * MM_TO_IN) / 12;

    volumeFt3 = lengthFt * widthFt * thicknessFt * quantity;

  // ── COLUMN / POST ──
  } else if (projectShape === "column") {
    const diameterRaw = values.diameter as number | null;
    const columnHeightRaw = values.columnHeight as number | null;

    if (!diameterRaw || !columnHeightRaw) {
      return { values: {}, formatted: {}, summary: "", isValid: false };
    }

    const diameterMm = convertToBase(diameterRaw, fieldUnits.diameter || "in", "length_small");
    const heightMm = convertToBase(columnHeightRaw, fieldUnits.columnHeight || "in", "length_small");
    const diameterIn = diameterMm * MM_TO_IN;
    const heightIn = heightMm * MM_TO_IN;
    const radiusFt = (diameterIn / 2) / 12;
    const heightFt = heightIn / 12;

    volumeFt3 = Math.PI * radiusFt * radiusFt * heightFt * quantity;

  // ── WALL ──
  } else if (projectShape === "wall") {
    const lengthRaw = values.length as number | null;
    const wallHeightRaw = values.wallHeight as number | null;
    const wallThicknessRaw = values.wallThickness as number | null;

    if (!lengthRaw || !wallHeightRaw || !wallThicknessRaw) {
      return { values: {}, formatted: {}, summary: "", isValid: false };
    }

    const lengthFt = convertToBase(lengthRaw, fieldUnits.length || "ft", "length") * M_TO_FT;
    const wallHeightFt = convertToBase(wallHeightRaw, fieldUnits.wallHeight || "ft", "length") * M_TO_FT;
    const wallThicknessMm = convertToBase(wallThicknessRaw, fieldUnits.wallThickness || "in", "length_small");
    const wallThicknessFt = (wallThicknessMm * MM_TO_IN) / 12;

    volumeFt3 = lengthFt * wallHeightFt * wallThicknessFt * quantity;

  // ── STAIRS (NEW) ──
  } else if (projectShape === "stairs") {
    const numberOfSteps = (values.numberOfSteps as number) || 4;
    const riseRaw = values.risePerStep as number | null;
    const runRaw = values.runPerStep as number | null;
    const widthRaw = values.stairWidth as number | null;

    if (!riseRaw || !runRaw || !widthRaw) {
      return { values: {}, formatted: {}, summary: "", isValid: false };
    }

    // Convert all to inches first
    const riseMm = convertToBase(riseRaw, fieldUnits.risePerStep || "in", "length_small");
    const runMm = convertToBase(runRaw, fieldUnits.runPerStep || "in", "length_small");
    const widthMm = convertToBase(widthRaw, fieldUnits.stairWidth || "in", "length_small");
    const riseIn = riseMm * MM_TO_IN;
    const runIn = runMm * MM_TO_IN;
    const widthIn = widthMm * MM_TO_IN;

    // Stair volume calculation:
    // Each step i (from bottom=1 to top=N) sits on a base that includes
    // the cumulative rise of all steps below it.
    // Volume = width × run × Σ(rise × i) for i=1..N
    // This is: width × run × rise × N(N+1)/2
    // But more accurately: each step is a rectangular block:
    //   width × run × (rise × stepNumber)
    // Total = width × run × rise × (1 + 2 + ... + N) = width × run × rise × N(N+1)/2
    const totalVolumeIn3 = widthIn * runIn * riseIn * (numberOfSteps * (numberOfSteps + 1)) / 2;
    volumeFt3 = (totalVolumeIn3 / 1728) * quantity; // 1728 in³ per ft³
  }

  if (volumeFt3 <= 0) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  // Apply waste factor
  const wasteMultiplier = 1 + (wasteFactor / 100);
  const volumeFt3WithWaste = volumeFt3 * wasteMultiplier;

  // Convert to cubic yards & cubic meters
  const volumeYd3 = volumeFt3WithWaste / 27;
  const volumeM3 = volumeFt3WithWaste * 0.0283168;

  // Bags needed
  const bagsNeeded = Math.ceil(volumeFt3WithWaste / bagYield);

  // Weight
  const weightLbs = volumeYd3 * 4000; // ~4000 lbs per yd³
  const weightTons = weightLbs / 2000;

  // Cost
  const cost = volumeYd3 * costPerCubicYard;

  // Rebar estimate
  let rebarPieces = 0;
  let rebarLengthFt = 0;
  if (includeRebar && (projectShape === "slab" || projectShape === "wall" || projectShape === "stairs")) {
    let lFt = 0;
    let wFt = 0;

    if (projectShape === "slab") {
      const lengthRaw = values.length as number;
      const widthRaw = values.width as number;
      if (lengthRaw && widthRaw) {
        lFt = convertToBase(lengthRaw, fieldUnits.length || "ft", "length") * M_TO_FT;
        wFt = convertToBase(widthRaw, fieldUnits.width || "ft", "length") * M_TO_FT;
      }
    } else if (projectShape === "wall") {
      const lengthRaw = values.length as number;
      const wallHeightRaw = values.wallHeight as number;
      if (lengthRaw && wallHeightRaw) {
        lFt = convertToBase(lengthRaw, fieldUnits.length || "ft", "length") * M_TO_FT;
        wFt = convertToBase(wallHeightRaw, fieldUnits.wallHeight || "ft", "length") * M_TO_FT;
      }
    } else if (projectShape === "stairs") {
      // Rebar along the staircase slope
      const numberOfSteps = (values.numberOfSteps as number) || 4;
      const riseMm = convertToBase((values.risePerStep as number) || 7, fieldUnits.risePerStep || "in", "length_small");
      const runMm = convertToBase((values.runPerStep as number) || 11, fieldUnits.runPerStep || "in", "length_small");
      const widthMm = convertToBase((values.stairWidth as number) || 36, fieldUnits.stairWidth || "in", "length_small");
      const totalRiseIn = (riseMm * MM_TO_IN) * numberOfSteps;
      const totalRunIn = (runMm * MM_TO_IN) * numberOfSteps;
      lFt = Math.sqrt(totalRiseIn * totalRiseIn + totalRunIn * totalRunIn) / 12;
      wFt = (widthMm * MM_TO_IN) / 12;
    }

    if (lFt > 0 && wFt > 0) {
      const spacingFt = rebarSpacing / 12;
      const barsLengthwise = Math.ceil(wFt / spacingFt) + 1;
      const barsWidthwise = Math.ceil(lFt / spacingFt) + 1;
      rebarPieces = (barsLengthwise + barsWidthwise) * quantity;
      rebarLengthFt = (barsLengthwise * lFt + barsWidthwise * wFt) * quantity;
    }
  }

  // Currency symbol from fieldUnits
  const curr = fieldUnits.costPerCubicYard || "usd";
  const SYMBOLS: Record<string, string> = {
    usd: "$", eur: "€", gbp: "£", mxn: "MX$", brl: "R$",
    cad: "C$", aud: "A$", jpy: "¥", inr: "₹", chf: "CHF ",
    cop: "COL$", ars: "AR$", pen: "S/", clp: "CLP ",
  };
  const sym = SYMBOLS[curr] || "$";

  // Recommendation
  let recommendation = "";
  if (volumeYd3 < 0.5) {
    recommendation = `DIY with ${bagsNeeded} bags of ${bagSize} lb mix`;
  } else if (volumeYd3 < 1) {
    recommendation = `${bagsNeeded} bags or consider ready-mix delivery`;
  } else {
    recommendation = `Order ${fmtNum(Math.ceil(volumeYd3 * 10) / 10)} yd³ ready-mix delivery`;
  }

  // Translated units
  const yd3Unit = v["yd³"] || "yd³";
  const ft3Unit = v["ft³"] || "ft³";
  const bagsUnit = v["bags"] || "bags";
  const lbsUnit = v["lbs"] || "lbs";

  return {
    values: {
      concreteVolume: volumeYd3,
      bagsNeeded,
      totalWeight: weightLbs,
      estimatedCost: cost,
      volumeFt3: volumeFt3WithWaste,
      volumeM3,
      rebarPieces,
      rebarLengthFt,
    },
    formatted: {
      concreteVolume: `${fmtNum(Math.ceil(volumeYd3 * 100) / 100)} ${yd3Unit}`,
      bagsNeeded: `${bagsNeeded} ${bagsUnit} (${bagSize} lb)`,
      totalWeight: weightTons >= 1
        ? `${fmtNum(Math.round(weightTons * 10) / 10)} ${v["tons"] || "tons"} (${fmtNum(Math.round(weightLbs))} ${lbsUnit})`
        : `${fmtNum(Math.round(weightLbs))} ${lbsUnit}`,
      estimatedCost: `${sym}${fmtNum(Math.round(cost))}`,
      // InfoCard values
      volumeFormatted: `${fmtNum(Math.ceil(volumeYd3 * 100) / 100)} ${yd3Unit}`,
      bagsFormatted: `${bagsNeeded} ${bagsUnit} (${bagSize} lb)`,
      weightFormatted: `${fmtNum(Math.round(weightLbs))} ${lbsUnit}`,
      costFormatted: `${sym}${fmtNum(Math.round(cost))}`,
      volumeFt3: `${fmtNum(Math.round(volumeFt3WithWaste * 10) / 10)} ${ft3Unit}`,
      bagsBreakdown: `${bagsNeeded} × ${bagSize} lb = ${fmtNum(bagsNeeded * bagWeight)} ${lbsUnit}`,
      rebarEstimate: includeRebar && rebarPieces > 0
        ? `${rebarPieces} ${v["pcs"] || "pcs"} (#4 rebar, ${fmtNum(Math.round(rebarLengthFt))} ${v["ft"] || "ft"} total)`
        : "—",
      recommendation,
    },
    summary:
      f.summary
        ?.replace("{volume}", fmtNum(Math.ceil(volumeYd3 * 100) / 100))
        .replace("{bags}", String(bagsNeeded)) ||
      `You need ${fmtNum(Math.ceil(volumeYd3 * 100) / 100)} cubic yards (${bagsNeeded} bags) of concrete.`,
    isValid: true,
  };
}

export default concreteCalculatorConfig;
