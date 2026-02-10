import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";
import { convertToBase } from "@/engine/v4/units";

// ============================================================================
// PAINT CALCULATOR - V4 (EN ONLY)
// ============================================================================

export const paintCalculatorConfig: CalculatorConfigV4 = {
  id: "paint-calculator",
  version: "4.0",
  category: "home",
  icon: "🎨",

  presets: [
    {
      id: "bedroom",
      icon: "🛏️",
      values: {
        projectType: "interior",
        roomLength: 12,
        roomWidth: 10,
        wallHeight: 8,
        doors: 1,
        windows: 2,
        paintCeiling: "no",
        paintFinish: "eggshell",
        surfaceType: "smooth",
        coats: 2,
        includePrimer: "no",
        wasteFactor: 10,
        costPerGallon: 35,
      },
    },
    {
      id: "livingRoom",
      icon: "🛋️",
      values: {
        projectType: "interior",
        roomLength: 18,
        roomWidth: 14,
        wallHeight: 9,
        doors: 2,
        windows: 3,
        paintCeiling: "no",
        paintFinish: "eggshell",
        surfaceType: "smooth",
        coats: 2,
        includePrimer: "no",
        wasteFactor: 10,
        costPerGallon: 35,
      },
    },
    {
      id: "bathroom",
      icon: "🚿",
      values: {
        projectType: "interior",
        roomLength: 8,
        roomWidth: 6,
        wallHeight: 8,
        doors: 1,
        windows: 1,
        paintCeiling: "yes",
        paintFinish: "semiGloss",
        surfaceType: "smooth",
        coats: 2,
        includePrimer: "yes",
        wasteFactor: 10,
        costPerGallon: 40,
      },
    },
    {
      id: "exterior",
      icon: "🏠",
      values: {
        projectType: "exterior",
        roomLength: 40,
        roomWidth: 30,
        wallHeight: 10,
        doors: 2,
        windows: 8,
        paintCeiling: "no",
        paintFinish: "satin",
        surfaceType: "rough",
        coats: 2,
        includePrimer: "yes",
        wasteFactor: 15,
        costPerGallon: 45,
      },
    },
  ],

  t: {
    en: {
      name: "Paint Calculator",
      slug: "paint-calculator",
      subtitle: "Calculate how much paint you need for any room and estimate the total cost of your project.",
      breadcrumb: "Paint",

      seo: {
        title: "Paint Calculator - Free Room Paint Estimator Tool",
        description: "Calculate how much paint you need for any room. Estimate gallons, primer, labor time, and total cost for interior and exterior painting projects.",
        shortDescription: "Estimate paint needed for walls, ceilings, and rooms.",
        keywords: [
          "paint calculator",
          "how much paint do i need",
          "room paint estimator",
          "wall paint calculator",
          "interior paint calculator",
          "paint cost calculator",
          "free paint calculator",
          "painting estimate",
        ],
      },

      calculator: { yourInformation: "Room Details" },
      ui: {
        yourInformation: "Room Details",
        calculate: "Calculate",
        reset: "Reset",
        results: "Results",
      },

      inputs: {
        projectType: {
          label: "Project Type",
          helpText: "Interior or exterior painting project",
          options: { interior: "Interior", exterior: "Exterior" },
        },
        roomLength: {
          label: "Room Length",
          helpText: "Length of the room or wall",
        },
        roomWidth: {
          label: "Room Width",
          helpText: "Width of the room",
        },
        wallHeight: {
          label: "Wall Height",
          helpText: "Height from floor to ceiling",
        },
        doors: {
          label: "Number of Doors",
          helpText: "Standard door ~21 sq ft deduction each",
        },
        windows: {
          label: "Number of Windows",
          helpText: "Standard window ~15 sq ft deduction each",
        },
        paintCeiling: {
          label: "Paint Ceiling?",
          helpText: "Include ceiling in paint estimate",
          options: { no: "No", yes: "Yes" },
        },
        paintFinish: {
          label: "Paint Finish",
          helpText: "Finish type affects coverage and price",
          options: {
            flat: "Flat / Matte",
            eggshell: "Eggshell",
            satin: "Satin",
            semiGloss: "Semi-Gloss",
            gloss: "High Gloss",
          },
        },
        surfaceType: {
          label: "Surface Type",
          helpText: "Rough surfaces need more paint",
          options: {
            smooth: "Smooth (drywall)",
            textured: "Textured",
            rough: "Rough (stucco, brick)",
          },
        },
        coats: {
          label: "Number of Coats",
          helpText: "Most projects need 2 coats",
        },
        includePrimer: {
          label: "Include Primer?",
          helpText: "Primer recommended for new surfaces or color changes",
          options: { no: "No", yes: "Yes" },
        },
        wasteFactor: {
          label: "Waste Factor",
          helpText: "Extra for spills and touch-ups",
        },
        costPerGallon: {
          label: "Cost per Gallon",
          helpText: "Average price per gallon of paint",
        },
      },

      results: {
        paintNeeded: { label: "Paint Needed" },
        paintableArea: { label: "Paintable Area" },
        estimatedCost: { label: "Estimated Cost" },
        estimatedLabor: { label: "Estimated Labor" },
      },

      presets: {
        bedroom: { label: "Bedroom", description: "12×10 ft standard bedroom" },
        livingRoom: { label: "Living Room", description: "18×14 ft living room" },
        bathroom: { label: "Bathroom", description: "8×6 ft bathroom with ceiling" },
        exterior: { label: "Exterior", description: "40×30 ft home exterior" },
      },

      values: {
        "gal": "gal",
        "gallons": "gallons",
        "gallon": "gallon",
        "sq ft": "sq ft",
        "hours": "hours",
        "hour": "hour",
        "hrs": "hrs",
        "primer": "primer",
        "paint": "paint",
        "coat": "coat",
        "coats": "coats",
      },

      formats: {
        summary: "You need approximately {gallons} gallons of paint for {area} sq ft of paintable surface.",
      },

      infoCards: {
        estimate: {
          title: "🎨 Paint Estimate",
          items: [
            { label: "Paintable Area", valueKey: "paintableArea" },
            { label: "Paint Needed", valueKey: "paintNeeded" },
            { label: "Primer Needed", valueKey: "primerNeeded" },
            { label: "Total Cost", valueKey: "totalCost" },
          ],
        },
        details: {
          title: "🔧 Project Details",
          items: [
            { label: "Total Wall Area", valueKey: "totalWallArea" },
            { label: "Door/Window Deduction", valueKey: "deduction" },
            { label: "Ceiling Area", valueKey: "ceilingArea" },
            { label: "Labor Time", valueKey: "laborTime" },
          ],
        },
        tips: {
          title: "💡 Pro Painting Tips",
          items: [
            "Buy 10-15% extra paint — better to have too much than make a second trip to the store.",
            "Use a primer for porous surfaces, color changes, or stain coverage to get better results with fewer coats.",
            "Semi-gloss or satin finishes are best for kitchens, bathrooms, and high-traffic areas — they resist moisture and wipe clean easily.",
            "Flat or matte finishes hide wall imperfections better and work great for bedrooms, living rooms, and ceilings.",
          ],
        },
      },

      education: {
        whatIs: {
          title: "How to Calculate Paint for a Room",
          content: "Calculating the right amount of paint starts with measuring your room's walls. Multiply the perimeter (2 × length + 2 × width) by the wall height to get the total wall area. Then subtract the area of doors (~21 sq ft each) and windows (~15 sq ft each). The result is your paintable area. Divide this by the paint's coverage rate (typically 350-400 sq ft per gallon for smooth surfaces) and multiply by the number of coats. Most interior rooms need 2 coats for full coverage and color consistency. Adding a 10% waste factor accounts for spills, roller absorption, and touch-ups.",
        },
        howItWorks: {
          title: "Understanding Paint Coverage Rates",
          content: "Paint coverage varies significantly based on surface texture and paint quality. Smooth drywall typically gets 350-400 sq ft per gallon, while textured walls may only get 250-300 sq ft per gallon. Rough surfaces like stucco or brick can drop to 150-250 sq ft per gallon. Premium paints generally offer better coverage due to higher pigment concentration. The paint finish also matters: flat paints tend to cover slightly more area than glossy finishes because gloss paints are thinner. Exterior paints typically have coverage rates of 250-350 sq ft per gallon due to weather-resistant formulations being thicker.",
        },
        considerations: {
          title: "Factors That Affect Paint Quantity",
          items: [
            { text: "Dark-to-light or light-to-dark color changes may need an extra coat or tinted primer", type: "warning" },
            { text: "New drywall absorbs more paint on the first coat — always use primer on new surfaces", type: "warning" },
            { text: "High-quality paint covers better and lasts longer, saving money in the long run", type: "info" },
            { text: "Humidity and temperature affect drying time — paint between 50-85°F for best results", type: "info" },
            { text: "One gallon of ceiling paint covers approximately 400 sq ft on smooth ceilings", type: "info" },
            { text: "Trim, doors, and accent walls should be calculated separately with their own finish", type: "info" },
          ],
        },
        coverage: {
          title: "Coverage Rates by Surface Type",
          items: [
            { text: "Smooth drywall: 350-400 sq ft/gallon — the most common interior surface", type: "info" },
            { text: "Textured walls: 250-300 sq ft/gallon — knockdown, orange peel, or skip trowel", type: "info" },
            { text: "Rough stucco/brick: 150-250 sq ft/gallon — porous surfaces absorb significantly more paint", type: "info" },
            { text: "Wood siding (exterior): 250-350 sq ft/gallon — depends on wood condition and previous paint", type: "info" },
            { text: "Concrete/masonry: 150-200 sq ft/gallon — highly porous, primer strongly recommended", type: "info" },
            { text: "Metal surfaces: 350-500 sq ft/gallon — smooth and non-porous, requires special metal primer", type: "info" },
          ],
        },
        examples: {
          title: "Paint Calculation Examples",
          description: "Step-by-step examples for common rooms",
          examples: [
            {
              title: "Standard Bedroom (12×10 ft)",
              steps: [
                "Wall perimeter: 2(12) + 2(10) = 44 ft",
                "Wall area: 44 × 8 ft height = 352 sq ft",
                "Subtract 1 door (21) + 2 windows (30) = 51 sq ft",
                "Paintable area: 352 - 51 = 301 sq ft",
                "Paint needed: 301 ÷ 350 × 2 coats = 1.72 gallons",
                "With 10% waste: ~1.9 gallons → buy 2 gallons",
              ],
              result: "2 gallons of paint for a standard bedroom",
            },
            {
              title: "Large Living Room (18×14 ft)",
              steps: [
                "Wall perimeter: 2(18) + 2(14) = 64 ft",
                "Wall area: 64 × 9 ft height = 576 sq ft",
                "Subtract 2 doors (42) + 3 windows (45) = 87 sq ft",
                "Paintable area: 576 - 87 = 489 sq ft",
                "Paint needed: 489 ÷ 350 × 2 coats = 2.79 gallons",
                "With 10% waste: ~3.1 gallons → buy 3-4 gallons",
              ],
              result: "3-4 gallons of paint for a large living room",
            },
          ],
        },
      },

      faqs: [
        {
          question: "How much paint do I need for a 12×12 room?",
          answer: "A 12×12 room with 8-foot ceilings has about 384 sq ft of wall area. After subtracting 1 door and 2 windows (~51 sq ft), you have about 333 sq ft of paintable surface. With 2 coats at 350 sq ft/gallon coverage, you need about 1.9 gallons. Buy 2 gallons to account for waste and touch-ups.",
        },
        {
          question: "How many square feet does a gallon of paint cover?",
          answer: "A gallon of paint typically covers 350-400 sq ft on smooth surfaces with one coat. Textured surfaces reduce coverage to 250-300 sq ft, while rough surfaces like stucco may only get 150-250 sq ft per gallon. These are approximate values — actual coverage depends on paint quality, color, application method, and surface porosity.",
        },
        {
          question: "Do I need primer before painting?",
          answer: "Primer is recommended when painting new drywall, covering stains, making drastic color changes (especially dark to light), painting over glossy surfaces, or painting porous surfaces like bare wood or masonry. For repainting over the same or similar color on previously painted walls in good condition, most quality paints with built-in primer can skip the separate primer coat.",
        },
        {
          question: "How many coats of paint do I need?",
          answer: "Most interior painting projects need 2 coats for full, even coverage. You may need 3 coats when covering dark colors with light ones, painting over patches or repairs, using lower-quality paint, or applying paint to new drywall without primer. One coat may suffice for touch-ups with the same color or when using premium one-coat paints.",
        },
        {
          question: "What paint finish should I use?",
          answer: "Flat/matte is best for ceilings and low-traffic rooms — it hides imperfections. Eggshell works well for bedrooms and living rooms with a subtle sheen. Satin is ideal for family rooms, hallways, and kids' rooms — easy to clean. Semi-gloss is best for kitchens, bathrooms, trim, and doors — moisture resistant. High gloss is used for cabinets, trim accents, and furniture — very durable and easy to clean.",
        },
        {
          question: "How do I calculate paint for exterior walls?",
          answer: "For exterior walls, calculate the perimeter of your home multiplied by the wall height. Subtract windows and doors. Exterior paint typically covers 250-350 sq ft per gallon due to thicker formulation. Rough surfaces like stucco need more paint. Always add 15-20% waste factor for exterior projects due to wind, overspray, and surface irregularities.",
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
      "name": "Calculadora de Pintura",
      "slug": "calculadora-pintura",
      "subtitle": "Calcula cuánta pintura necesitas para cualquier habitación y estima el costo total de tu proyecto.",
      "breadcrumb": "Pintura",
      "seo": {
        "title": "Calculadora de Pintura - Herramienta Gratuita para Estimar Pintura",
        "description": "Calcula cuánta pintura necesitas para cualquier habitación. Estima galones, imprimación, tiempo de trabajo y costo total para proyectos de pintura interior y exterior.",
        "shortDescription": "Estima pintura necesaria para paredes, techos y habitaciones.",
        "keywords": [
          "calculadora de pintura",
          "cuanta pintura necesito",
          "estimador pintura habitacion",
          "calculadora pintura pared",
          "calculadora pintura interior",
          "calculadora costo pintura",
          "calculadora pintura gratis",
          "estimacion pintura"
        ]
      },
      "inputs": {
        "projectType": {
          "label": "Tipo de Proyecto",
          "helpText": "Proyecto de pintura interior o exterior",
          "options": {
            "interior": "Interior",
            "exterior": "Exterior"
          }
        },
        "roomLength": {
          "label": "Largo de la Habitación",
          "helpText": "Largo de la habitación o pared"
        },
        "roomWidth": {
          "label": "Ancho de la Habitación",
          "helpText": "Ancho de la habitación"
        },
        "wallHeight": {
          "label": "Altura de la Pared",
          "helpText": "Altura del piso al techo"
        },
        "doors": {
          "label": "Número de Puertas",
          "helpText": "Puerta estándar ~2 m² de descuento cada una"
        },
        "windows": {
          "label": "Número de Ventanas",
          "helpText": "Ventana estándar ~1.4 m² de descuento cada una"
        },
        "paintCeiling": {
          "label": "¿Pintar Techo?",
          "helpText": "Incluir techo en la estimación de pintura",
          "options": {
            "no": "No",
            "yes": "Sí"
          }
        },
        "paintFinish": {
          "label": "Acabado de Pintura",
          "helpText": "El tipo de acabado afecta la cobertura y precio",
          "options": {
            "flat": "Plano / Mate",
            "eggshell": "Cáscara de Huevo",
            "satin": "Satinado",
            "semiGloss": "Semi-Brillante",
            "gloss": "Alto Brillo"
          }
        },
        "surfaceType": {
          "label": "Tipo de Superficie",
          "helpText": "Las superficies rugosas necesitan más pintura",
          "options": {
            "smooth": "Lisa (drywall)",
            "textured": "Texturizada",
            "rough": "Rugosa (estuco, ladrillo)"
          }
        },
        "coats": {
          "label": "Número de Capas",
          "helpText": "La mayoría de proyectos necesitan 2 capas"
        },
        "includePrimer": {
          "label": "¿Incluir Imprimación?",
          "helpText": "Imprimación recomendada para superficies nuevas o cambios de color",
          "options": {
            "no": "No",
            "yes": "Sí"
          }
        },
        "wasteFactor": {
          "label": "Factor de Desperdicio",
          "helpText": "Extra para derrames y retoques"
        },
        "costPerGallon": {
          "label": "Costo por Galón",
          "helpText": "Precio promedio por galón de pintura"
        }
      },
      "results": {
        "paintNeeded": {
          "label": "Pintura Necesaria"
        },
        "paintableArea": {
          "label": "Área a Pintar"
        },
        "estimatedCost": {
          "label": "Costo Estimado"
        },
        "estimatedLabor": {
          "label": "Trabajo Estimado"
        }
      },
      "presets": {
        "bedroom": {
          "label": "Dormitorio",
          "description": "Dormitorio estándar de 3.7×3m"
        },
        "livingRoom": {
          "label": "Sala de Estar",
          "description": "Sala de estar de 5.5×4.3m"
        },
        "bathroom": {
          "label": "Baño",
          "description": "Baño de 2.4×1.8m con techo"
        },
        "exterior": {
          "label": "Exterior",
          "description": "Casa exterior de 12×9m"
        }
      },
      "values": {
        "gal": "gal",
        "gallons": "galones",
        "gallon": "galón",
        "sq ft": "m²",
        "hours": "horas",
        "hour": "hora",
        "hrs": "hrs",
        "primer": "imprimación",
        "paint": "pintura",
        "coat": "capa",
        "coats": "capas"
      },
      "formats": {
        "summary": "Necesitas aproximadamente {gallons} galones de pintura para {area} m² de superficie pintable."
      },
      "infoCards": {
        "estimate": {
          "title": "🎨 Estimación de Pintura",
          "items": [
            {
              "label": "Área Pintable",
              "valueKey": "paintableArea"
            },
            {
              "label": "Pintura Necesaria",
              "valueKey": "paintNeeded"
            },
            {
              "label": "Imprimación Necesaria",
              "valueKey": "primerNeeded"
            },
            {
              "label": "Costo Total",
              "valueKey": "totalCost"
            }
          ]
        },
        "details": {
          "title": "🔧 Detalles del Proyecto",
          "items": [
            {
              "label": "Área Total de Paredes",
              "valueKey": "totalWallArea"
            },
            {
              "label": "Descuento por Puertas/Ventanas",
              "valueKey": "deduction"
            },
            {
              "label": "Área del Techo",
              "valueKey": "ceilingArea"
            },
            {
              "label": "Tiempo de Trabajo",
              "valueKey": "laborTime"
            }
          ]
        },
        "tips": {
          "title": "💡 Consejos Profesionales de Pintura",
          "items": [
            "Compra 10-15% de pintura extra — es mejor tener de más que hacer un segundo viaje a la tienda.",
            "Usa imprimación para superficies porosas, cambios de color o cobertura de manchas para obtener mejores resultados con menos capas.",
            "Los acabados semi-brillantes o satinados son mejores para cocinas, baños y áreas de mucho tráfico — resisten la humedad y se limpian fácilmente.",
            "Los acabados planos o mate ocultan mejor las imperfecciones de las paredes y funcionan muy bien para dormitorios, salas y techos."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Cómo Calcular Pintura para una Habitación",
          "content": "Calcular la cantidad correcta de pintura comienza midiendo las paredes de tu habitación. Multiplica el perímetro (2 × largo + 2 × ancho) por la altura de la pared para obtener el área total de pared. Luego resta el área de puertas (~2 m² cada una) y ventanas (~1.4 m² cada una). El resultado es tu área pintable. Divide esto por la tasa de cobertura de la pintura (típicamente 32-37 m² por galón para superficies lisas) y multiplica por el número de capas. La mayoría de habitaciones interiores necesitan 2 capas para cobertura completa y consistencia de color. Agregar un 10% de factor de desperdicio cuenta para derrames, absorción del rodillo y retoques."
        },
        "howItWorks": {
          "title": "Entendiendo las Tasas de Cobertura de Pintura",
          "content": "La cobertura de pintura varía significativamente según la textura de la superficie y la calidad de la pintura. El drywall liso típicamente cubre 32-37 m² por galón, mientras que las paredes texturizadas pueden cubrir solo 23-28 m² por galón. Las superficies rugosas como estuco o ladrillo pueden bajar a 14-23 m² por galón. Las pinturas premium generalmente ofrecen mejor cobertura debido a mayor concentración de pigmento. El acabado de la pintura también importa: las pinturas planas tienden a cubrir más área que los acabados brillantes porque las pinturas brillantes son más delgadas. Las pinturas exteriores típicamente tienen tasas de cobertura de 23-32 m² por galón debido a que las formulaciones resistentes al clima son más espesas."
        },
        "considerations": {
          "title": "Factores que Afectan la Cantidad de Pintura",
          "items": [
            {
              "text": "Los cambios de color oscuro a claro o claro a oscuro pueden necesitar una capa extra o imprimación tintada",
              "type": "warning"
            },
            {
              "text": "El drywall nuevo absorbe más pintura en la primera capa — siempre usa imprimación en superficies nuevas",
              "type": "warning"
            },
            {
              "text": "La pintura de alta calidad cubre mejor y dura más, ahorrando dinero a largo plazo",
              "type": "info"
            },
            {
              "text": "La humedad y temperatura afectan el tiempo de secado — pinta entre 10-29°C para mejores resultados",
              "type": "info"
            },
            {
              "text": "Un galón de pintura para techo cubre aproximadamente 37 m² en techos lisos",
              "type": "info"
            },
            {
              "text": "Molduras, puertas y paredes de acento deben calcularse por separado con su propio acabado",
              "type": "info"
            }
          ]
        },
        "coverage": {
          "title": "Tasas de Cobertura por Tipo de Superficie",
          "items": [
            {
              "text": "Drywall liso: 32-37 m²/galón — la superficie interior más común",
              "type": "info"
            },
            {
              "text": "Paredes texturizadas: 23-28 m²/galón — acabado martillado, cáscara de naranja o llana",
              "type": "info"
            },
            {
              "text": "Estuco/ladrillo rugoso: 14-23 m²/galón — superficies porosas absorben significativamente más pintura",
              "type": "info"
            },
            {
              "text": "Revestimiento de madera (exterior): 23-32 m²/galón — depende de la condición de la madera y pintura previa",
              "type": "info"
            },
            {
              "text": "Concreto/mampostería: 14-18 m²/galón — altamente poroso, imprimación fuertemente recomendada",
              "type": "info"
            },
            {
              "text": "Superficies metálicas: 32-46 m²/galón — lisas y no porosas, requiere imprimación especial para metal",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Ejemplos de Cálculo de Pintura",
          "description": "Ejemplos paso a paso para habitaciones comunes",
          "examples": [
            {
              "title": "Dormitorio Estándar (3.7×3m)",
              "steps": [
                "Perímetro de pared: 2(3.7) + 2(3) = 13.4 m",
                "Área de pared: 13.4 × 2.4 m altura = 32.2 m²",
                "Restar 1 puerta (2) + 2 ventanas (2.8) = 4.8 m²",
                "Área pintable: 32.2 - 4.8 = 27.4 m²",
                "Pintura necesaria: 27.4 ÷ 32 × 2 capas = 1.7 galones",
                "Con 10% desperdicio: ~1.9 galones → comprar 2 galones"
              ],
              "result": "2 galones de pintura para un dormitorio estándar"
            },
            {
              "title": "Sala Grande (5.5×4.3m)",
              "steps": [
                "Perímetro de pared: 2(5.5) + 2(4.3) = 19.6 m",
                "Área de pared: 19.6 × 2.7 m altura = 52.9 m²",
                "Restar 2 puertas (4) + 3 ventanas (4.2) = 8.2 m²",
                "Área pintable: 52.9 - 8.2 = 44.7 m²",
                "Pintura necesaria: 44.7 ÷ 32 × 2 capas = 2.8 galones",
                "Con 10% desperdicio: ~3.1 galones → comprar 3-4 galones"
              ],
              "result": "3-4 galones de pintura para una sala grande"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "¿Cuánta pintura necesito para una habitación de 3.7×3.7m?",
          "answer": "Una habitación de 3.7×3.7m con techos de 2.4m tiene aproximadamente 35.5 m² de área de pared. Después de restar 1 puerta y 2 ventanas (~4.8 m²), tienes aproximadamente 30.7 m² de superficie pintable. Con 2 capas a 32 m²/galón de cobertura, necesitas aproximadamente 1.9 galones. Compra 2 galones para considerar desperdicios y retoques."
        },
        {
          "question": "¿Cuántos metros cuadrados cubre un galón de pintura?",
          "answer": "Un galón de pintura típicamente cubre 32-37 m² en superficies lisas con una capa. Las superficies texturizadas reducen la cobertura a 23-28 m², mientras que las superficies rugosas como estuco pueden cubrir solo 14-23 m² por galón. Estos son valores aproximados — la cobertura real depende de la calidad de la pintura, color, método de aplicación y porosidad de la superficie."
        },
        {
          "question": "¿Necesito imprimación antes de pintar?",
          "answer": "La imprimación se recomienda al pintar drywall nuevo, cubrir manchas, hacer cambios drásticos de color (especialmente oscuro a claro), pintar sobre superficies brillantes, o pintar superficies porosas como madera o mampostería sin tratar. Para repintar sobre el mismo color o similar en paredes previamente pintadas en buenas condiciones, la mayoría de pinturas de calidad con imprimación incorporada pueden omitir la capa de imprimación separada."
        },
        {
          "question": "¿Cuántas capas de pintura necesito?",
          "answer": "La mayoría de proyectos de pintura interior necesitan 2 capas para cobertura completa y uniforme. Puedes necesitar 3 capas al cubrir colores oscuros con claros, pintar sobre parches o reparaciones, usar pintura de menor calidad, o aplicar pintura a drywall nuevo sin imprimación. Una capa puede ser suficiente para retoques con el mismo color o al usar pinturas premium de una capa."
        },
        {
          "question": "¿Qué acabado de pintura debo usar?",
          "answer": "Plano/mate es mejor para techos y habitaciones de poco tráfico — oculta imperfecciones. Cáscara de huevo funciona bien para dormitorios y salas con brillo sutil. Satinado es ideal para cuartos familiares, pasillos y cuartos de niños — fácil de limpiar. Semi-brillante es mejor para cocinas, baños, molduras y puertas — resistente a la humedad. Alto brillo se usa para gabinetes, acentos de moldura y muebles — muy duradero y fácil de limpiar."
        },
        {
          "question": "¿Cómo calculo pintura para paredes exteriores?",
          "answer": "Para paredes exteriores, calcula el perímetro de tu casa multiplicado por la altura de la pared. Resta ventanas y puertas. La pintura exterior típicamente cubre 23-32 m² por galón debido a formulación más espesa. Las superficies rugosas como estuco necesitan más pintura. Siempre agrega 15-20% de factor de desperdicio para proyectos exteriores debido a viento, exceso de pulverización e irregularidades de superficie."
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
      },
      "calculator": {
        "yourInformation": "Tu Información"
      }
    },
    pt: {
      "name": "Calculadora de Tinta",
      "slug": "calculadora-tinta",
      "subtitle": "Calcule quanta tinta você precisa para qualquer ambiente e estime o custo total do seu projeto.",
      "breadcrumb": "Tinta",
      "seo": {
        "title": "Calculadora de Tinta - Ferramenta Gratuita para Estimar Tinta",
        "description": "Calcule quanta tinta você precisa para qualquer ambiente. Estime litros, primer, tempo de trabalho e custo total para projetos de pintura interior e exterior.",
        "shortDescription": "Estime a tinta necessária para paredes, tetos e ambientes.",
        "keywords": [
          "calculadora de tinta",
          "quanta tinta preciso",
          "estimador de tinta para ambiente",
          "calculadora tinta parede",
          "calculadora tinta interior",
          "calculadora custo tinta",
          "calculadora tinta grátis",
          "orçamento pintura"
        ]
      },
      "inputs": {
        "projectType": {
          "label": "Tipo de Projeto",
          "helpText": "Projeto de pintura interior ou exterior",
          "options": {
            "interior": "Interior",
            "exterior": "Exterior"
          }
        },
        "roomLength": {
          "label": "Comprimento do Ambiente",
          "helpText": "Comprimento do ambiente ou parede"
        },
        "roomWidth": {
          "label": "Largura do Ambiente",
          "helpText": "Largura do ambiente"
        },
        "wallHeight": {
          "label": "Altura da Parede",
          "helpText": "Altura do chão ao teto"
        },
        "doors": {
          "label": "Número de Portas",
          "helpText": "Porta padrão ~2m² de desconto cada"
        },
        "windows": {
          "label": "Número de Janelas",
          "helpText": "Janela padrão ~1,5m² de desconto cada"
        },
        "paintCeiling": {
          "label": "Pintar Teto?",
          "helpText": "Incluir teto na estimativa de tinta",
          "options": {
            "no": "Não",
            "yes": "Sim"
          }
        },
        "paintFinish": {
          "label": "Acabamento da Tinta",
          "helpText": "Tipo de acabamento afeta cobertura e preço",
          "options": {
            "flat": "Fosco",
            "eggshell": "Casca de Ovo",
            "satin": "Acetinado",
            "semiGloss": "Semi-Brilho",
            "gloss": "Alto Brilho"
          }
        },
        "surfaceType": {
          "label": "Tipo de Superfície",
          "helpText": "Superfícies rugosas precisam de mais tinta",
          "options": {
            "smooth": "Lisa (drywall)",
            "textured": "Texturizada",
            "rough": "Rugosa (reboco, tijolo)"
          }
        },
        "coats": {
          "label": "Número de Demãos",
          "helpText": "Maioria dos projetos precisa de 2 demãos"
        },
        "includePrimer": {
          "label": "Incluir Primer?",
          "helpText": "Primer recomendado para superfícies novas ou mudanças de cor",
          "options": {
            "no": "Não",
            "yes": "Sim"
          }
        },
        "wasteFactor": {
          "label": "Fator de Desperdício",
          "helpText": "Extra para respingos e retoques"
        },
        "costPerGallon": {
          "label": "Custo por Litro",
          "helpText": "Preço médio por litro de tinta"
        }
      },
      "results": {
        "paintNeeded": {
          "label": "Tinta Necessária"
        },
        "paintableArea": {
          "label": "Área Pintável"
        },
        "estimatedCost": {
          "label": "Custo Estimado"
        },
        "estimatedLabor": {
          "label": "Trabalho Estimado"
        }
      },
      "presets": {
        "bedroom": {
          "label": "Quarto",
          "description": "Quarto padrão de 3,6×3m"
        },
        "livingRoom": {
          "label": "Sala de Estar",
          "description": "Sala de estar de 5,5×4,2m"
        },
        "bathroom": {
          "label": "Banheiro",
          "description": "Banheiro de 2,4×1,8m com teto"
        },
        "exterior": {
          "label": "Exterior",
          "description": "Casa exterior de 12×9m"
        }
      },
      "values": {
        "gal": "L",
        "gallons": "litros",
        "gallon": "litro",
        "sq ft": "m²",
        "hours": "horas",
        "hour": "hora",
        "hrs": "h",
        "primer": "primer",
        "paint": "tinta",
        "coat": "demão",
        "coats": "demãos"
      },
      "formats": {
        "summary": "Você precisa de aproximadamente {gallons} litros de tinta para {area} m² de superfície pintável."
      },
      "infoCards": {
        "estimate": {
          "title": "🎨 Estimativa de Tinta",
          "items": [
            {
              "label": "Área Pintável",
              "valueKey": "paintableArea"
            },
            {
              "label": "Tinta Necessária",
              "valueKey": "paintNeeded"
            },
            {
              "label": "Primer Necessário",
              "valueKey": "primerNeeded"
            },
            {
              "label": "Custo Total",
              "valueKey": "totalCost"
            }
          ]
        },
        "details": {
          "title": "🔧 Detalhes do Projeto",
          "items": [
            {
              "label": "Área Total das Paredes",
              "valueKey": "totalWallArea"
            },
            {
              "label": "Dedução Portas/Janelas",
              "valueKey": "deduction"
            },
            {
              "label": "Área do Teto",
              "valueKey": "ceilingArea"
            },
            {
              "label": "Tempo de Trabalho",
              "valueKey": "laborTime"
            }
          ]
        },
        "tips": {
          "title": "💡 Dicas Profissionais de Pintura",
          "items": [
            "Compre 10-15% de tinta extra — melhor ter demais do que fazer uma segunda viagem à loja.",
            "Use primer em superfícies porosas, mudanças de cor ou cobertura de manchas para melhores resultados com menos demãos.",
            "Acabamentos semi-brilho ou acetinado são melhores para cozinhas, banheiros e áreas de alto tráfego — resistem à umidade e são fáceis de limpar.",
            "Acabamentos foscos escondem imperfeições da parede e funcionam bem em quartos, salas e tetos."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Como Calcular Tinta para um Ambiente",
          "content": "Calcular a quantidade certa de tinta começa medindo as paredes do ambiente. Multiplique o perímetro (2 × comprimento + 2 × largura) pela altura da parede para obter a área total. Depois subtraia a área das portas (~2m² cada) e janelas (~1,5m² cada). O resultado é sua área pintável. Divida pela taxa de cobertura da tinta (tipicamente 12-15 m² por litro para superfícies lisas) e multiplique pelo número de demãos. A maioria dos ambientes internos precisa de 2 demãos para cobertura completa e consistência de cor. Adicionar 10% de fator de desperdício considera respingos, absorção do rolo e retoques."
        },
        "howItWorks": {
          "title": "Entendendo as Taxas de Cobertura de Tinta",
          "content": "A cobertura da tinta varia significativamente baseada na textura da superfície e qualidade da tinta. Drywall liso tipicamente rende 12-15 m² por litro, enquanto paredes texturizadas podem render apenas 8-12 m² por litro. Superfícies rugosas como reboco podem cair para 5-8 m² por litro. Tintas premium geralmente oferecem melhor cobertura devido à maior concentração de pigmento. O acabamento também importa: tintas foscas tendem a cobrir mais área que acabamentos brilhantes porque tintas com brilho são mais finas. Tintas externas tipicamente têm cobertura de 8-12 m² por litro devido às formulações resistentes ao clima serem mais espessas."
        },
        "considerations": {
          "title": "Fatores que Afetam a Quantidade de Tinta",
          "items": [
            {
              "text": "Mudanças de cor escuro-para-claro ou claro-para-escuro podem precisar de demão extra ou primer colorido",
              "type": "warning"
            },
            {
              "text": "Drywall novo absorve mais tinta na primeira demão — sempre use primer em superfícies novas",
              "type": "warning"
            },
            {
              "text": "Tinta de alta qualidade cobre melhor e dura mais, economizando dinheiro a longo prazo",
              "type": "info"
            },
            {
              "text": "Umidade e temperatura afetam o tempo de secagem — pinte entre 10-30°C para melhores resultados",
              "type": "info"
            },
            {
              "text": "Um litro de tinta para teto cobre aproximadamente 12-15 m² em tetos lisos",
              "type": "info"
            },
            {
              "text": "Rodapés, portas e paredes de destaque devem ser calculados separadamente com seu próprio acabamento",
              "type": "info"
            }
          ]
        },
        "coverage": {
          "title": "Taxas de Cobertura por Tipo de Superfície",
          "items": [
            {
              "text": "Drywall liso: 12-15 m²/litro — a superfície interna mais comum",
              "type": "info"
            },
            {
              "text": "Paredes texturizadas: 8-12 m²/litro — grafiato, casca de laranja ou desempenadeira",
              "type": "info"
            },
            {
              "text": "Reboco/tijolo rugoso: 5-8 m²/litro — superfícies porosas absorvem significativamente mais tinta",
              "type": "info"
            },
            {
              "text": "Madeira (exterior): 8-12 m²/litro — depende da condição da madeira e tinta anterior",
              "type": "info"
            },
            {
              "text": "Concreto/alvenaria: 5-7 m²/litro — altamente poroso, primer fortemente recomendado",
              "type": "info"
            },
            {
              "text": "Superfícies metálicas: 12-18 m²/litro — lisa e não porosa, requer primer especial para metal",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemplos de Cálculo de Tinta",
          "description": "Exemplos passo-a-passo para ambientes comuns",
          "examples": [
            {
              "title": "Quarto Padrão (3,6×3m)",
              "steps": [
                "Perímetro das paredes: 2(3,6) + 2(3) = 13,2 m",
                "Área das paredes: 13,2 × 2,5m altura = 33 m²",
                "Subtrair 1 porta (2) + 2 janelas (3) = 5 m²",
                "Área pintável: 33 - 5 = 28 m²",
                "Tinta necessária: 28 ÷ 12 × 2 demãos = 4,7 litros",
                "Com 10% desperdício: ~5,2 litros → comprar 6 litros"
              ],
              "result": "6 litros de tinta para um quarto padrão"
            },
            {
              "title": "Sala Grande (5,5×4,2m)",
              "steps": [
                "Perímetro das paredes: 2(5,5) + 2(4,2) = 19,4 m",
                "Área das paredes: 19,4 × 2,7m altura = 52,4 m²",
                "Subtrair 2 portas (4) + 3 janelas (4,5) = 8,5 m²",
                "Área pintável: 52,4 - 8,5 = 43,9 m²",
                "Tinta necessária: 43,9 ÷ 12 × 2 demãos = 7,3 litros",
                "Com 10% desperdício: ~8 litros → comprar 9 litros"
              ],
              "result": "9 litros de tinta para uma sala grande"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Quanta tinta preciso para um ambiente de 3×3m?",
          "answer": "Um ambiente de 3×3m com teto de 2,5m tem cerca de 30 m² de área de parede. Após subtrair 1 porta e 2 janelas (~5 m²), você tem cerca de 25 m² de superfície pintável. Com 2 demãos a 12 m²/litro de cobertura, você precisa de cerca de 4,2 litros. Compre 5 litros para considerar desperdício e retoques."
        },
        {
          "question": "Quantos metros quadrados um litro de tinta cobre?",
          "answer": "Um litro de tinta tipicamente cobre 12-15 m² em superfícies lisas com uma demão. Superfícies texturizadas reduzem a cobertura para 8-12 m², enquanto superfícies rugosas como reboco podem render apenas 5-8 m² por litro. Estes são valores aproximados — a cobertura real depende da qualidade da tinta, cor, método de aplicação e porosidade da superfície."
        },
        {
          "question": "Preciso de primer antes de pintar?",
          "answer": "Primer é recomendado ao pintar drywall novo, cobrir manchas, fazer mudanças drásticas de cor (especialmente escuro para claro), pintar sobre superfícies brilhantes, ou pintar superfícies porosas como madeira nua ou alvenaria. Para repintura sobre a mesma cor ou similar em paredes já pintadas em boa condição, a maioria das tintas de qualidade com primer incorporado pode dispensar o primer separado."
        },
        {
          "question": "Quantas demãos de tinta preciso?",
          "answer": "A maioria dos projetos de pintura interna precisa de 2 demãos para cobertura completa e uniforme. Você pode precisar de 3 demãos ao cobrir cores escuras com claras, pintar sobre remendos ou reparos, usar tinta de menor qualidade, ou aplicar tinta em drywall novo sem primer. Uma demão pode ser suficiente para retoques com a mesma cor ou ao usar tintas premium de uma demão."
        },
        {
          "question": "Que acabamento de tinta devo usar?",
          "answer": "Fosco é melhor para tetos e ambientes de pouco tráfego — esconde imperfeições. Casca de ovo funciona bem para quartos e salas com brilho sutil. Acetinado é ideal para salas de família, corredores e quartos infantis — fácil de limpar. Semi-brilho é melhor para cozinhas, banheiros, rodapés e portas — resistente à umidade. Alto brilho é usado para armários, detalhes de rodapé e móveis — muito durável e fácil de limpar."
        },
        {
          "question": "Como calcular tinta para paredes externas?",
          "answer": "Para paredes externas, calcule o perímetro de sua casa multiplicado pela altura da parede. Subtraia janelas e portas. Tinta externa tipicamente cobre 8-12 m² por litro devido à formulação mais espessa. Superfícies rugosas como reboco precisam de mais tinta. Sempre adicione 15-20% de fator de desperdício para projetos externos devido ao vento, respingo e irregularidades da superfície."
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
      "name": "Calculateur de Peinture",
      "slug": "calculateur-peinture",
      "subtitle": "Calculez la quantité de peinture nécessaire pour n'importe quelle pièce et estimez le coût total de votre projet.",
      "breadcrumb": "Peinture",
      "seo": {
        "title": "Calculateur de Peinture - Outil Gratuit d'Estimation de Peinture",
        "description": "Calculez la quantité de peinture nécessaire pour n'importe quelle pièce. Estimez les litres, l'apprêt, le temps de travail et le coût total pour vos projets de peinture intérieure et extérieure.",
        "shortDescription": "Estimez la peinture nécessaire pour les murs, plafonds et pièces.",
        "keywords": [
          "calculateur de peinture",
          "combien de peinture ai-je besoin",
          "estimateur de peinture de pièce",
          "calculateur de peinture murale",
          "calculateur de peinture intérieure",
          "calculateur de coût de peinture",
          "calculateur de peinture gratuit",
          "devis de peinture"
        ]
      },
      "inputs": {
        "projectType": {
          "label": "Type de Projet",
          "helpText": "Projet de peinture intérieure ou extérieure",
          "options": {
            "interior": "Intérieur",
            "exterior": "Extérieur"
          }
        },
        "roomLength": {
          "label": "Longueur de la Pièce",
          "helpText": "Longueur de la pièce ou du mur"
        },
        "roomWidth": {
          "label": "Largeur de la Pièce",
          "helpText": "Largeur de la pièce"
        },
        "wallHeight": {
          "label": "Hauteur du Mur",
          "helpText": "Hauteur du sol au plafond"
        },
        "doors": {
          "label": "Nombre de Portes",
          "helpText": "Porte standard ~2 m² de déduction chacune"
        },
        "windows": {
          "label": "Nombre de Fenêtres",
          "helpText": "Fenêtre standard ~1,4 m² de déduction chacune"
        },
        "paintCeiling": {
          "label": "Peindre le Plafond ?",
          "helpText": "Inclure le plafond dans l'estimation de peinture",
          "options": {
            "no": "Non",
            "yes": "Oui"
          }
        },
        "paintFinish": {
          "label": "Finition de Peinture",
          "helpText": "Le type de finition affecte la couverture et le prix",
          "options": {
            "flat": "Mat",
            "eggshell": "Coquille d'œuf",
            "satin": "Satin",
            "semiGloss": "Semi-brillant",
            "gloss": "Brillant"
          }
        },
        "surfaceType": {
          "label": "Type de Surface",
          "helpText": "Les surfaces rugueuses nécessitent plus de peinture",
          "options": {
            "smooth": "Lisse (placo)",
            "textured": "Texturée",
            "rough": "Rugueuse (crépi, brique)"
          }
        },
        "coats": {
          "label": "Nombre de Couches",
          "helpText": "La plupart des projets nécessitent 2 couches"
        },
        "includePrimer": {
          "label": "Inclure l'Apprêt ?",
          "helpText": "Apprêt recommandé pour les nouvelles surfaces ou changements de couleur",
          "options": {
            "no": "Non",
            "yes": "Oui"
          }
        },
        "wasteFactor": {
          "label": "Facteur de Gaspillage",
          "helpText": "Extra pour les éclaboussures et retouches"
        },
        "costPerGallon": {
          "label": "Coût par Litre",
          "helpText": "Prix moyen par litre de peinture"
        }
      },
      "results": {
        "paintNeeded": {
          "label": "Peinture Nécessaire"
        },
        "paintableArea": {
          "label": "Surface à Peindre"
        },
        "estimatedCost": {
          "label": "Coût Estimé"
        },
        "estimatedLabor": {
          "label": "Main-d'œuvre Estimée"
        }
      },
      "presets": {
        "bedroom": {
          "label": "Chambre",
          "description": "Chambre standard de 3,6×3 m"
        },
        "livingRoom": {
          "label": "Salon",
          "description": "Salon de 5,5×4,3 m"
        },
        "bathroom": {
          "label": "Salle de Bain",
          "description": "Salle de bain 2,4×1,8 m avec plafond"
        },
        "exterior": {
          "label": "Extérieur",
          "description": "Maison extérieure 12×9 m"
        }
      },
      "values": {
        "gal": "L",
        "gallons": "litres",
        "gallon": "litre",
        "sq ft": "m²",
        "hours": "heures",
        "hour": "heure",
        "hrs": "h",
        "primer": "apprêt",
        "paint": "peinture",
        "coat": "couche",
        "coats": "couches"
      },
      "formats": {
        "summary": "Vous avez besoin d'environ {gallons} litres de peinture pour {area} m² de surface à peindre."
      },
      "infoCards": {
        "estimate": {
          "title": "🎨 Estimation de Peinture",
          "items": [
            {
              "label": "Surface à Peindre",
              "valueKey": "paintableArea"
            },
            {
              "label": "Peinture Nécessaire",
              "valueKey": "paintNeeded"
            },
            {
              "label": "Apprêt Nécessaire",
              "valueKey": "primerNeeded"
            },
            {
              "label": "Coût Total",
              "valueKey": "totalCost"
            }
          ]
        },
        "details": {
          "title": "🔧 Détails du Projet",
          "items": [
            {
              "label": "Surface Totale des Murs",
              "valueKey": "totalWallArea"
            },
            {
              "label": "Déduction Portes/Fenêtres",
              "valueKey": "deduction"
            },
            {
              "label": "Surface du Plafond",
              "valueKey": "ceilingArea"
            },
            {
              "label": "Temps de Travail",
              "valueKey": "laborTime"
            }
          ]
        },
        "tips": {
          "title": "💡 Conseils de Peinture Pro",
          "items": [
            "Achetez 10-15% de peinture en plus — mieux vaut avoir trop que de faire un second voyage au magasin.",
            "Utilisez un apprêt pour les surfaces poreuses, changements de couleur ou couverture de taches pour obtenir de meilleurs résultats avec moins de couches.",
            "Les finitions semi-brillantes ou satinées conviennent mieux aux cuisines, salles de bains et zones de passage — elles résistent à l'humidité et se nettoient facilement.",
            "Les finitions mates cachent mieux les imperfections des murs et conviennent parfaitement aux chambres, salons et plafonds."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Comment Calculer la Peinture pour une Pièce",
          "content": "Calculer la bonne quantité de peinture commence par mesurer les murs de votre pièce. Multipliez le périmètre (2 × longueur + 2 × largeur) par la hauteur du mur pour obtenir la surface totale des murs. Puis soustrayez la surface des portes (~2 m² chacune) et des fenêtres (~1,4 m² chacune). Le résultat est votre surface à peindre. Divisez cela par le taux de couverture de la peinture (généralement 10-12 m² par litre pour les surfaces lisses) et multipliez par le nombre de couches. La plupart des pièces intérieures nécessitent 2 couches pour une couverture complète et une couleur uniforme. Ajouter un facteur de gaspillage de 10% compte pour les éclaboussures, l'absorption du rouleau et les retouches."
        },
        "howItWorks": {
          "title": "Comprendre les Taux de Couverture de Peinture",
          "content": "La couverture de peinture varie considérablement selon la texture de surface et la qualité de la peinture. Le placo lisse obtient généralement 10-12 m² par litre, tandis que les murs texturés ne peuvent obtenir que 7-9 m² par litre. Les surfaces rugueuses comme le crépi ou la brique peuvent descendre à 4-7 m² par litre. Les peintures premium offrent généralement une meilleure couverture grâce à une concentration de pigments plus élevée. La finition de peinture compte aussi : les peintures mates tendent à couvrir légèrement plus de surface que les finitions brillantes car les peintures brillantes sont plus fines. Les peintures extérieures ont généralement des taux de couverture de 7-10 m² par litre dus aux formulations résistantes aux intempéries qui sont plus épaisses."
        },
        "considerations": {
          "title": "Facteurs Affectant la Quantité de Peinture",
          "items": [
            {
              "text": "Les changements de couleur foncé-vers-clair ou clair-vers-foncé peuvent nécessiter une couche supplémentaire ou un apprêt teinté",
              "type": "warning"
            },
            {
              "text": "Le placo neuf absorbe plus de peinture à la première couche — utilisez toujours un apprêt sur les nouvelles surfaces",
              "type": "warning"
            },
            {
              "text": "La peinture de haute qualité couvre mieux et dure plus longtemps, économisant de l'argent à long terme",
              "type": "info"
            },
            {
              "text": "L'humidité et la température affectent le temps de séchage — peignez entre 10-30°C pour de meilleurs résultats",
              "type": "info"
            },
            {
              "text": "Un litre de peinture de plafond couvre environ 12 m² sur plafonds lisses",
              "type": "info"
            },
            {
              "text": "Les moulures, portes et murs d'accent doivent être calculés séparément avec leur propre finition",
              "type": "info"
            }
          ]
        },
        "coverage": {
          "title": "Taux de Couverture par Type de Surface",
          "items": [
            {
              "text": "Placo lisse : 10-12 m²/litre — la surface intérieure la plus commune",
              "type": "info"
            },
            {
              "text": "Murs texturés : 7-9 m²/litre — crépi fin, peau d'orange ou truelle sautée",
              "type": "info"
            },
            {
              "text": "Crépi rugueux/brique : 4-7 m²/litre — surfaces poreuses absorbant significativement plus de peinture",
              "type": "info"
            },
            {
              "text": "Bardage bois (extérieur) : 7-10 m²/litre — dépend de l'état du bois et de la peinture précédente",
              "type": "info"
            },
            {
              "text": "Béton/maçonnerie : 4-6 m²/litre — très poreux, apprêt fortement recommandé",
              "type": "info"
            },
            {
              "text": "Surfaces métalliques : 10-15 m²/litre — lisses et non poreuses, nécessitent un apprêt métal spécial",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemples de Calcul de Peinture",
          "description": "Exemples étape par étape pour pièces communes",
          "examples": [
            {
              "title": "Chambre Standard (3,6×3 m)",
              "steps": [
                "Périmètre des murs : 2(3,6) + 2(3) = 13,2 m",
                "Surface des murs : 13,2 × 2,4 m hauteur = 31,7 m²",
                "Soustraire 1 porte (2) + 2 fenêtres (2,8) = 4,8 m²",
                "Surface à peindre : 31,7 - 4,8 = 26,9 m²",
                "Peinture nécessaire : 26,9 ÷ 10 × 2 couches = 5,4 litres",
                "Avec 10% de gaspillage : ~6 litres → acheter 6 litres"
              ],
              "result": "6 litres de peinture pour une chambre standard"
            },
            {
              "title": "Grand Salon (5,5×4,3 m)",
              "steps": [
                "Périmètre des murs : 2(5,5) + 2(4,3) = 19,6 m",
                "Surface des murs : 19,6 × 2,7 m hauteur = 52,9 m²",
                "Soustraire 2 portes (4) + 3 fenêtres (4,2) = 8,2 m²",
                "Surface à peindre : 52,9 - 8,2 = 44,7 m²",
                "Peinture nécessaire : 44,7 ÷ 10 × 2 couches = 8,9 litres",
                "Avec 10% de gaspillage : ~10 litres → acheter 10-12 litres"
              ],
              "result": "10-12 litres de peinture pour un grand salon"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Combien de peinture ai-je besoin pour une pièce de 3,6×3,6 m ?",
          "answer": "Une pièce de 3,6×3,6 m avec des plafonds de 2,4 m a environ 35 m² de surface murale. Après avoir soustrait 1 porte et 2 fenêtres (~4,8 m²), vous avez environ 30 m² de surface à peindre. Avec 2 couches à 10 m²/litre de couverture, vous avez besoin d'environ 6 litres. Achetez 7 litres pour tenir compte du gaspillage et des retouches."
        },
        {
          "question": "Combien de mètres carrés couvre un litre de peinture ?",
          "answer": "Un litre de peinture couvre généralement 10-12 m² sur surfaces lisses avec une couche. Les surfaces texturées réduisent la couverture à 7-9 m², tandis que les surfaces rugueuses comme le crépi ne peuvent obtenir que 4-7 m² par litre. Ces valeurs sont approximatives — la couverture réelle dépend de la qualité de la peinture, la couleur, la méthode d'application et la porosité de la surface."
        },
        {
          "question": "Ai-je besoin d'un apprêt avant de peindre ?",
          "answer": "L'apprêt est recommandé lors de la peinture de placo neuf, couverture de taches, changements de couleur drastiques (surtout foncé vers clair), peinture sur surfaces brillantes, ou peinture de surfaces poreuses comme le bois nu ou la maçonnerie. Pour repeindre sur la même couleur ou similaire sur murs précédemment peints en bon état, la plupart des peintures de qualité avec apprêt intégré peuvent éviter la couche d'apprêt séparée."
        },
        {
          "question": "Combien de couches de peinture ai-je besoin ?",
          "answer": "La plupart des projets de peinture intérieure nécessitent 2 couches pour une couverture complète et uniforme. Vous pourriez avoir besoin de 3 couches lors de la couverture de couleurs foncées avec des claires, peinture sur réparations ou raccords, utilisation de peinture de moindre qualité, ou application de peinture sur placo neuf sans apprêt. Une couche peut suffire pour les retouches avec la même couleur ou lors de l'utilisation de peintures premium une-couche."
        },
        {
          "question": "Quelle finition de peinture dois-je utiliser ?",
          "answer": "Mat est idéal pour plafonds et pièces à faible passage — cache les imperfections. Coquille d'œuf fonctionne bien pour chambres et salons avec un éclat subtil. Satin est idéal pour salles familiales, couloirs et chambres d'enfants — facile à nettoyer. Semi-brillant est parfait pour cuisines, salles de bains, moulures et portes — résistant à l'humidité. Brillant est utilisé pour armoires, accents de moulures et meubles — très durable et facile à nettoyer."
        },
        {
          "question": "Comment calculer la peinture pour murs extérieurs ?",
          "answer": "Pour les murs extérieurs, calculez le périmètre de votre maison multiplié par la hauteur du mur. Soustrayez les fenêtres et portes. La peinture extérieure couvre généralement 7-10 m² par litre dus à une formulation plus épaisse. Les surfaces rugueuses comme le crépi nécessitent plus de peinture. Ajoutez toujours un facteur de gaspillage de 15-20% pour les projets extérieurs dus au vent, pulvérisation excessive et irrégularités de surface."
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
      "name": "Farb-Rechner",
      "slug": "farb-rechner",
      "subtitle": "Berechnen Sie, wie viel Farbe Sie für jeden Raum benötigen und schätzen Sie die Gesamtkosten Ihres Projekts.",
      "breadcrumb": "Farbe",
      "seo": {
        "title": "Farb-Rechner - Kostenloses Raumfarb-Schätzungstool",
        "description": "Berechnen Sie, wie viel Farbe Sie für jeden Raum benötigen. Schätzen Sie Liter, Grundierung, Arbeitszeit und Gesamtkosten für Innen- und Außenstreichprojekte.",
        "shortDescription": "Schätzen Sie benötigte Farbe für Wände, Decken und Räume.",
        "keywords": [
          "farb-rechner",
          "wie viel farbe brauche ich",
          "raumfarb-schätzer",
          "wandfarb-rechner",
          "innenfarb-rechner",
          "farbkosten-rechner",
          "kostenloser farb-rechner",
          "streich-kostenvoranschlag"
        ]
      },
      "inputs": {
        "projectType": {
          "label": "Projekttyp",
          "helpText": "Innen- oder Außenstreichprojekt",
          "options": {
            "interior": "Innen",
            "exterior": "Außen"
          }
        },
        "roomLength": {
          "label": "Raumlänge",
          "helpText": "Länge des Raums oder der Wand"
        },
        "roomWidth": {
          "label": "Raumbreite",
          "helpText": "Breite des Raums"
        },
        "wallHeight": {
          "label": "Wandhöhe",
          "helpText": "Höhe vom Boden zur Decke"
        },
        "doors": {
          "label": "Anzahl Türen",
          "helpText": "Standardtür ~2 m² Abzug pro Stück"
        },
        "windows": {
          "label": "Anzahl Fenster",
          "helpText": "Standardfenster ~1,4 m² Abzug pro Stück"
        },
        "paintCeiling": {
          "label": "Decke streichen?",
          "helpText": "Decke in Farbschätzung einbeziehen",
          "options": {
            "no": "Nein",
            "yes": "Ja"
          }
        },
        "paintFinish": {
          "label": "Farboberfläche",
          "helpText": "Oberflächentyp beeinflusst Deckkraft und Preis",
          "options": {
            "flat": "Matt",
            "eggshell": "Eierschale",
            "satin": "Seidenmatt",
            "semiGloss": "Halbglanz",
            "gloss": "Hochglanz"
          }
        },
        "surfaceType": {
          "label": "Oberflächentyp",
          "helpText": "Raue Oberflächen benötigen mehr Farbe",
          "options": {
            "smooth": "Glatt (Trockenbau)",
            "textured": "Strukturiert",
            "rough": "Rau (Putz, Ziegel)"
          }
        },
        "coats": {
          "label": "Anzahl Anstriche",
          "helpText": "Die meisten Projekte benötigen 2 Anstriche"
        },
        "includePrimer": {
          "label": "Grundierung einbeziehen?",
          "helpText": "Grundierung empfohlen für neue Oberflächen oder Farbwechsel",
          "options": {
            "no": "Nein",
            "yes": "Ja"
          }
        },
        "wasteFactor": {
          "label": "Verschwendungsfaktor",
          "helpText": "Extra für Verschüttungen und Nachbesserungen"
        },
        "costPerGallon": {
          "label": "Kosten pro Liter",
          "helpText": "Durchschnittspreis pro Liter Farbe"
        }
      },
      "results": {
        "paintNeeded": {
          "label": "Benötigte Farbe"
        },
        "paintableArea": {
          "label": "Streichbare Fläche"
        },
        "estimatedCost": {
          "label": "Geschätzte Kosten"
        },
        "estimatedLabor": {
          "label": "Geschätzte Arbeitszeit"
        }
      },
      "presets": {
        "bedroom": {
          "label": "Schlafzimmer",
          "description": "3,7×3 m Standard-Schlafzimmer"
        },
        "livingRoom": {
          "label": "Wohnzimmer",
          "description": "5,5×4,3 m Wohnzimmer"
        },
        "bathroom": {
          "label": "Badezimmer",
          "description": "2,4×1,8 m Badezimmer mit Decke"
        },
        "exterior": {
          "label": "Außenbereich",
          "description": "12×9 m Hausaußenseite"
        }
      },
      "values": {
        "gal": "l",
        "gallons": "Liter",
        "gallon": "Liter",
        "sq ft": "m²",
        "hours": "Stunden",
        "hour": "Stunde",
        "hrs": "Std",
        "primer": "Grundierung",
        "paint": "Farbe",
        "coat": "Anstrich",
        "coats": "Anstriche"
      },
      "formats": {
        "summary": "Sie benötigen ungefähr {gallons} Liter Farbe für {area} m² streichbare Oberfläche."
      },
      "infoCards": {
        "estimate": {
          "title": "🎨 Farbschätzung",
          "items": [
            {
              "label": "Streichbare Fläche",
              "valueKey": "paintableArea"
            },
            {
              "label": "Benötigte Farbe",
              "valueKey": "paintNeeded"
            },
            {
              "label": "Benötigte Grundierung",
              "valueKey": "primerNeeded"
            },
            {
              "label": "Gesamtkosten",
              "valueKey": "totalCost"
            }
          ]
        },
        "details": {
          "title": "🔧 Projektdetails",
          "items": [
            {
              "label": "Gesamte Wandfläche",
              "valueKey": "totalWallArea"
            },
            {
              "label": "Tür-/Fensterabzug",
              "valueKey": "deduction"
            },
            {
              "label": "Deckenfläche",
              "valueKey": "ceilingArea"
            },
            {
              "label": "Arbeitszeit",
              "valueKey": "laborTime"
            }
          ]
        },
        "tips": {
          "title": "💡 Profi-Streichtipps",
          "items": [
            "Kaufen Sie 10-15% extra Farbe — besser zu viel haben als einen zweiten Gang zum Geschäft machen zu müssen.",
            "Verwenden Sie Grundierung für poröse Oberflächen, Farbwechsel oder Fleckenabdeckung für bessere Ergebnisse mit weniger Anstrichen.",
            "Halbglanz- oder seidenmatte Oberflächen sind am besten für Küchen, Bäder und stark frequentierte Bereiche — sie widerstehen Feuchtigkeit und lassen sich leicht abwischen.",
            "Matte Oberflächen verbergen Wandunvollkommenheiten besser und eignen sich großartig für Schlafzimmer, Wohnzimmer und Decken."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Wie man Farbe für einen Raum berechnet",
          "content": "Die Berechnung der richtigen Farbmenge beginnt mit dem Messen der Raumwände. Multiplizieren Sie den Umfang (2 × Länge + 2 × Breite) mit der Wandhöhe, um die gesamte Wandfläche zu erhalten. Ziehen Sie dann die Fläche der Türen (~2 m² pro Stück) und Fenster (~1,4 m² pro Stück) ab. Das Ergebnis ist Ihre streichbare Fläche. Teilen Sie diese durch die Deckkraft der Farbe (typisch 10-12 m² pro Liter für glatte Oberflächen) und multiplizieren Sie mit der Anzahl der Anstriche. Die meisten Innenräume benötigen 2 Anstriche für vollständige Abdeckung und Farbkonsistenz. Ein 10%iger Verschwendungsfaktor berücksichtigt Verschüttungen, Rollenabsorption und Nachbesserungen."
        },
        "howItWorks": {
          "title": "Deckkraft von Farben verstehen",
          "content": "Die Farbdeckkraft variiert erheblich je nach Oberflächentextur und Farbqualität. Glatte Trockenbauwände erreichen typisch 10-12 m² pro Liter, während strukturierte Wände möglicherweise nur 7-9 m² pro Liter schaffen. Raue Oberflächen wie Putz oder Ziegel können auf 4-7 m² pro Liter fallen. Hochwertige Farben bieten aufgrund höherer Pigmentkonzentration generell bessere Deckkraft. Die Farboberfläche spielt ebenfalls eine Rolle: Matte Farben decken tendenziell etwas mehr Fläche ab als glänzende Oberflächen, da Glanzfarben dünner sind. Außenfarben haben typisch Deckkraften von 7-10 m² pro Liter aufgrund dickerer wetterbeständiger Formulierungen."
        },
        "considerations": {
          "title": "Faktoren, die die Farbmenge beeinflussen",
          "items": [
            {
              "text": "Dunkel-zu-hell oder hell-zu-dunkel Farbwechsel benötigen möglicherweise einen extra Anstrich oder getönte Grundierung",
              "type": "warning"
            },
            {
              "text": "Neue Trockenbauwände absorbieren mehr Farbe beim ersten Anstrich — verwenden Sie immer Grundierung auf neuen Oberflächen",
              "type": "warning"
            },
            {
              "text": "Hochwertige Farbe deckt besser und hält länger, spart langfristig Geld",
              "type": "info"
            },
            {
              "text": "Luftfeuchtigkeit und Temperatur beeinflussen die Trockenzeit — streichen Sie zwischen 10-30°C für beste Ergebnisse",
              "type": "info"
            },
            {
              "text": "Ein Liter Deckenfarbe deckt ungefähr 12 m² auf glatten Decken",
              "type": "info"
            },
            {
              "text": "Verkleidungen, Türen und Akzentwände sollten separat mit ihrer eigenen Oberfläche berechnet werden",
              "type": "info"
            }
          ]
        },
        "coverage": {
          "title": "Deckkraft nach Oberflächentyp",
          "items": [
            {
              "text": "Glatte Trockenbauwand: 10-12 m²/Liter — die häufigste Innenoberfläche",
              "type": "info"
            },
            {
              "text": "Strukturierte Wände: 7-9 m²/Liter — Rauputz, Orangenhaut oder Spachteltechnik",
              "type": "info"
            },
            {
              "text": "Rauer Putz/Ziegel: 4-7 m²/Liter — poröse Oberflächen absorbieren deutlich mehr Farbe",
              "type": "info"
            },
            {
              "text": "Holzverkleidung (außen): 7-10 m²/Liter — hängt vom Holzzustand und vorheriger Farbe ab",
              "type": "info"
            },
            {
              "text": "Beton/Mauerwerk: 4-6 m²/Liter — hochporös, Grundierung stark empfohlen",
              "type": "info"
            },
            {
              "text": "Metalloberflächen: 10-15 m²/Liter — glatt und nicht-porös, benötigt spezielle Metallgrundierung",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Farbberechnungsbeispiele",
          "description": "Schritt-für-Schritt Beispiele für häufige Räume",
          "examples": [
            {
              "title": "Standard-Schlafzimmer (3,7×3 m)",
              "steps": [
                "Wandumfang: 2(3,7) + 2(3) = 13,4 m",
                "Wandfläche: 13,4 × 2,4 m Höhe = 32,2 m²",
                "Abzug 1 Tür (2) + 2 Fenster (2,8) = 4,8 m²",
                "Streichbare Fläche: 32,2 - 4,8 = 27,4 m²",
                "Benötigte Farbe: 27,4 ÷ 10 × 2 Anstriche = 5,5 Liter",
                "Mit 10% Verschwendung: ~6 Liter → kaufen Sie 6-7 Liter"
              ],
              "result": "6-7 Liter Farbe für ein Standard-Schlafzimmer"
            },
            {
              "title": "Großes Wohnzimmer (5,5×4,3 m)",
              "steps": [
                "Wandumfang: 2(5,5) + 2(4,3) = 19,6 m",
                "Wandfläche: 19,6 × 2,7 m Höhe = 52,9 m²",
                "Abzug 2 Türen (4) + 3 Fenster (4,2) = 8,2 m²",
                "Streichbare Fläche: 52,9 - 8,2 = 44,7 m²",
                "Benötigte Farbe: 44,7 ÷ 10 × 2 Anstriche = 8,9 Liter",
                "Mit 10% Verschwendung: ~9,8 Liter → kaufen Sie 10-11 Liter"
              ],
              "result": "10-11 Liter Farbe für ein großes Wohnzimmer"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Wie viel Farbe brauche ich für einen 3,7×3,7 m Raum?",
          "answer": "Ein 3,7×3,7 m Raum mit 2,4 m Deckenhöhe hat etwa 35,5 m² Wandfläche. Nach Abzug von 1 Tür und 2 Fenstern (~4,8 m²) haben Sie etwa 30,7 m² streichbare Oberfläche. Mit 2 Anstrichen bei 10 m²/Liter Deckkraft benötigen Sie etwa 6,1 Liter. Kaufen Sie 7 Liter für Verschwendung und Nachbesserungen."
        },
        {
          "question": "Wie viele Quadratmeter deckt ein Liter Farbe ab?",
          "answer": "Ein Liter Farbe deckt typisch 10-12 m² auf glatten Oberflächen mit einem Anstrich. Strukturierte Oberflächen reduzieren die Deckung auf 7-9 m², während raue Oberflächen wie Putz möglicherweise nur 4-7 m² pro Liter schaffen. Dies sind Näherungswerte — die tatsächliche Deckung hängt von Farbqualität, Farbe, Auftragsmethode und Oberflächenporosität ab."
        },
        {
          "question": "Brauche ich Grundierung vor dem Streichen?",
          "answer": "Grundierung wird empfohlen beim Streichen neuer Trockenbauwände, Abdecken von Flecken, drastischen Farbwechseln (besonders dunkel zu hell), Streichen über glänzende Oberflächen oder Streichen poröser Oberflächen wie nacktem Holz oder Mauerwerk. Beim Überstreichen derselben oder ähnlichen Farbe auf zuvor gestrichenen Wänden in gutem Zustand können die meisten hochwertigen Farben mit eingebauter Grundierung die separate Grundierung überspringen."
        },
        {
          "question": "Wie viele Anstriche benötige ich?",
          "answer": "Die meisten Innenstreichprojekte benötigen 2 Anstriche für vollständige, gleichmäßige Abdeckung. Sie benötigen möglicherweise 3 Anstriche beim Überdecken dunkler Farben mit hellen, Streichen über Ausbesserungen oder Reparaturen, Verwenden minderwertiger Farbe oder Auftragen von Farbe auf neue Trockenbauwände ohne Grundierung. Ein Anstrich kann für Nachbesserungen mit derselben Farbe oder bei Verwenden hochwertiger Ein-Anstrich-Farben ausreichen."
        },
        {
          "question": "Welche Farboberfläche sollte ich verwenden?",
          "answer": "Matt ist am besten für Decken und wenig frequentierte Räume — es verbirgt Unvollkommenheiten. Eierschale funktioniert gut für Schlafzimmer und Wohnzimmer mit subtilem Glanz. Seidenmatt ist ideal für Familienzimmer, Flure und Kinderzimmer — leicht zu reinigen. Halbglanz ist am besten für Küchen, Bäder, Verkleidungen und Türen — feuchtigkeitsbeständig. Hochglanz wird für Schränke, Verkleidungsakzente und Möbel verwendet — sehr haltbar und leicht zu reinigen."
        },
        {
          "question": "Wie berechne ich Farbe für Außenwände?",
          "answer": "Für Außenwände berechnen Sie den Umfang Ihres Hauses multipliziert mit der Wandhöhe. Ziehen Sie Fenster und Türen ab. Außenfarbe deckt typisch 7-10 m² pro Liter aufgrund dickerer Formulierung. Raue Oberflächen wie Putz benötigen mehr Farbe. Fügen Sie immer 15-20% Verschwendungsfaktor für Außenprojekte hinzu aufgrund von Wind, Sprühnebel und Oberflächenunregelmäßigkeiten."
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
      id: "projectType",
      type: "radio",
      defaultValue: "interior",
      options: [{ value: "interior" }, { value: "exterior" }],
    },
    {
      id: "roomLength",
      type: "number",
      defaultValue: null,
      placeholder: "12",
      unitType: "length",
      syncGroup: false,
      defaultUnit: "ft",
      allowedUnits: ["ft", "m"],
    },
    {
      id: "roomWidth",
      type: "number",
      defaultValue: null,
      placeholder: "10",
      unitType: "length",
      syncGroup: false,
      defaultUnit: "ft",
      allowedUnits: ["ft", "m"],
    },
    {
      id: "wallHeight",
      type: "number",
      defaultValue: 8,
      placeholder: "8",
      unitType: "length",
      syncGroup: false,
      defaultUnit: "ft",
      allowedUnits: ["ft", "m"],
    },
    {
      id: "doors",
      type: "number",
      defaultValue: 1,
      min: 0,
      max: 20,
      step: 1,
    },
    {
      id: "windows",
      type: "number",
      defaultValue: 2,
      min: 0,
      max: 30,
      step: 1,
    },
    {
      id: "paintCeiling",
      type: "radio",
      defaultValue: "no",
      options: [{ value: "no" }, { value: "yes" }],
    },
    {
      id: "paintFinish",
      type: "select",
      defaultValue: "eggshell",
      options: [
        { value: "flat" },
        { value: "eggshell" },
        { value: "satin" },
        { value: "semiGloss" },
        { value: "gloss" },
      ],
    },
    {
      id: "surfaceType",
      type: "select",
      defaultValue: "smooth",
      options: [
        { value: "smooth" },
        { value: "textured" },
        { value: "rough" },
      ],
    },
    {
      id: "coats",
      type: "number",
      defaultValue: 2,
      min: 1,
      max: 5,
      step: 1,
    },
    {
      id: "includePrimer",
      type: "radio",
      defaultValue: "no",
      options: [{ value: "no" }, { value: "yes" }],
    },
    {
      id: "wasteFactor",
      type: "range",
      defaultValue: 10,
      min: 0,
      max: 30,
      step: 1,
      suffix: "%",
    },
    {
      id: "costPerGallon",
      type: "number",
      defaultValue: 35,
      placeholder: "35",
      min: 0,
      unitType: "currency",
      syncGroup: false,
      autoConvert: false,
      defaultUnit: "USD",
    },
  ],

  inputGroups: [],

  results: [
    { id: "paintNeeded", type: "primary", format: "text" },
    { id: "paintableArea", type: "secondary", format: "text" },
    { id: "estimatedCost", type: "secondary", format: "text" },
    { id: "estimatedLabor", type: "secondary", format: "text" },
  ],

  infoCards: [
    { id: "estimate", type: "list", icon: "🎨", itemCount: 4 },
    { id: "details", type: "list", icon: "🔧", itemCount: 4 },
    { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  referenceData: [],

  educationSections: [
    { id: "whatIs", type: "prose", icon: "📖" },
    { id: "howItWorks", type: "prose", icon: "⚙️" },
    { id: "considerations", type: "list", icon: "📋", itemCount: 6 },
    { id: "coverage", type: "list", icon: "📊", itemCount: 6 },
    { id: "examples", type: "code-example", icon: "🧮", columns: 2, exampleCount: 2 },
  ],

  faqs: [{ id: "0" }, { id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }],

  references: [
    {
      authors: "Sherwin-Williams",
      year: "2025",
      title: "Paint Coverage Calculator & Estimation Guide",
      source: "Sherwin-Williams",
      url: "https://www.sherwin-williams.com/en-us/paint-calculator",
    },
    {
      authors: "Benjamin Moore",
      year: "2025",
      title: "How to Calculate Paint Needed for a Room",
      source: "Benjamin Moore",
      url: "https://www.benjaminmoore.com/en-us/paint-calculator",
    },
  ],

  hero: { badge: "Home & Construction", title: "Paint Calculator" },
  sidebar: { showConversions: true, showRelated: true },
  features: { showPresets: true, showShare: true, showPrint: true },
  relatedCalculators: ["concrete-calculator", "square-feet-to-square-meters"],
  ads: { showTopBanner: false, showSidebar: true, showBetweenSections: false },
};

// ============================================================================
// CALCULATE FUNCTION
// ============================================================================

function fmtNum(val: number): string {
  if (val === 0) return "0";
  if (Math.abs(val) < 0.01) return val.toExponential(2);
  if (Math.abs(val) >= 1000) return val.toLocaleString("en-US", { maximumFractionDigits: 0 });
  return val.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 1 });
}

export function calculatePaintCalculator(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits = {}, t } = data;
  const v = (t?.values as Record<string, string>) || {};
  const f = (t?.formats as Record<string, string>) || {};

  // — Read & convert inputs to feet (base unit for length = m, so convert to ft) —
  const roomLengthRaw = values.roomLength as number | null;
  const roomWidthRaw = values.roomWidth as number | null;
  const wallHeightRaw = values.wallHeight as number | null;

  if (!roomLengthRaw || !roomWidthRaw || !wallHeightRaw) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  // Convert to meters (base), then to feet for calculation
  const roomLengthM = convertToBase(roomLengthRaw, fieldUnits.roomLength || "ft", "length");
  const roomWidthM = convertToBase(roomWidthRaw, fieldUnits.roomWidth || "ft", "length");
  const wallHeightM = convertToBase(wallHeightRaw, fieldUnits.wallHeight || "ft", "length");

  // Convert meters to feet for sq ft calculation
  const M_TO_FT = 3.28084;
  const roomLengthFt = roomLengthM * M_TO_FT;
  const roomWidthFt = roomWidthM * M_TO_FT;
  const wallHeightFt = wallHeightM * M_TO_FT;

  const doors = (values.doors as number) || 0;
  const windows = (values.windows as number) || 0;
  const paintCeiling = values.paintCeiling as string || "no";
  const surfaceType = values.surfaceType as string || "smooth";
  const coats = (values.coats as number) || 2;
  const includePrimer = values.includePrimer as string || "no";
  const wasteFactor = (values.wasteFactor as number) || 10;
  const costPerGallon = (values.costPerGallon as number) || 35;
  const projectType = values.projectType as string || "interior";

  // — Calculate areas (sq ft) —
  const perimeter = 2 * (roomLengthFt + roomWidthFt);
  const totalWallArea = perimeter * wallHeightFt;

  const DOOR_AREA = 21; // sq ft per standard door
  const WINDOW_AREA = 15; // sq ft per standard window
  const doorWindowDeduction = (doors * DOOR_AREA) + (windows * WINDOW_AREA);

  const ceilingArea = paintCeiling === "yes" ? roomLengthFt * roomWidthFt : 0;
  const paintableArea = Math.max(totalWallArea - doorWindowDeduction + ceilingArea, 0);

  // — Coverage rates (sq ft per gallon) —
  const coverageRates: Record<string, number> = {
    smooth: projectType === "exterior" ? 325 : 375,
    textured: projectType === "exterior" ? 250 : 275,
    rough: projectType === "exterior" ? 175 : 200,
  };
  const coveragePerGallon = coverageRates[surfaceType] || 375;

  // — Paint calculation —
  const wasteMultiplier = 1 + (wasteFactor / 100);
  const paintGallons = (paintableArea / coveragePerGallon) * coats * wasteMultiplier;
  const primerGallons = includePrimer === "yes"
    ? (paintableArea / 400) * wasteMultiplier // primer covers ~400 sq ft/gal
    : 0;

  // — Cost —
  const paintCost = paintGallons * costPerGallon;
  const primerCost = primerGallons * (costPerGallon * 0.7); // primer ~70% paint cost
  const totalCost = paintCost + primerCost;

  // — Labor estimate (sq ft per hour) —
  const laborRate = projectType === "exterior" ? 100 : 150; // sq ft/hour
  const laborHours = (paintableArea * coats) / laborRate;

  // — Currency symbol —
  const curr = fieldUnits.costPerGallon || "USD";
  const SYMBOLS: Record<string, string> = {
    USD: "$", EUR: "€", GBP: "£", MXN: "MX$", BRL: "R$",
    CAD: "C$", AUD: "A$", JPY: "¥", INR: "₹", CHF: "CHF ",
    COP: "COL$", ARS: "AR$", PEN: "S/", CLP: "CLP ",
  };
  const sym = SYMBOLS[curr] || "$";

  // — Translated units —
  const galUnit = v["gal"] || "gal";
  const sqftUnit = v["sq ft"] || "sq ft";
  const hrsUnit = v["hrs"] || "hrs";

  // — Format —
  const ceilPaint = Math.ceil(paintGallons * 10) / 10;
  const ceilPrimer = Math.ceil(primerGallons * 10) / 10;

  return {
    values: {
      paintNeeded: ceilPaint,
      paintableArea,
      estimatedCost: totalCost,
      estimatedLabor: laborHours,
      totalWallArea,
      deduction: doorWindowDeduction,
      ceilingArea,
      primerNeeded: ceilPrimer,
      totalCost,
      laborTime: laborHours,
    },
    formatted: {
      paintNeeded: `${fmtNum(ceilPaint)} ${galUnit}`,
      paintableArea: `${fmtNum(Math.round(paintableArea))} ${sqftUnit}`,
      estimatedCost: `${sym}${fmtNum(Math.round(totalCost))}`,
      estimatedLabor: `${fmtNum(Math.round(laborHours * 10) / 10)} ${hrsUnit}`,
      totalWallArea: `${fmtNum(Math.round(totalWallArea))} ${sqftUnit}`,
      deduction: `${fmtNum(Math.round(doorWindowDeduction))} ${sqftUnit}`,
      ceilingArea: paintCeiling === "yes" ? `${fmtNum(Math.round(ceilingArea))} ${sqftUnit}` : "—",
      primerNeeded: includePrimer === "yes" ? `${fmtNum(ceilPrimer)} ${galUnit}` : "—",
      totalCost: `${sym}${fmtNum(Math.round(totalCost))}`,
      laborTime: `~${fmtNum(Math.round(laborHours * 10) / 10)} ${hrsUnit}`,
    },
    summary:
      f.summary
        ?.replace("{gallons}", fmtNum(ceilPaint))
        .replace("{area}", fmtNum(Math.round(paintableArea))) ||
      `You need approximately ${fmtNum(ceilPaint)} gallons of paint for ${fmtNum(Math.round(paintableArea))} sq ft of paintable surface.`,
    isValid: true,
  };
}

export default paintCalculatorConfig;
