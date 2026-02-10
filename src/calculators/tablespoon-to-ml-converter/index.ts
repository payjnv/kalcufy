import type {
  CalculatorConfigV4,
  CalculatorResults,
} from "@/engine/v4/types/engine.types";

export const tablespoonToMlConverterConfig: CalculatorConfigV4 = {
  id: "tablespoon-to-ml-converter",
  version: "4.0",
  category: "conversion",
  icon: "🥄",

  presets: [
    { id: "half", icon: "🫗", values: { tbspValue: 0.5 } },
    { id: "one", icon: "🥄", values: { tbspValue: 1 } },
    { id: "three", icon: "🍯", values: { tbspValue: 3 } },
    { id: "quarter", icon: "🥣", values: { tbspValue: 4 } },
  ],

  t: {
    en: {
      name: "Tablespoons to mL Converter",
      slug: "tablespoon-to-ml-converter",
      subtitle:
        "Convert tablespoons to milliliters instantly — essential for cooking, baking, and medicine dosing with US, UK, and metric standards.",
      breadcrumb: "Tbsp to mL",

      seo: {
        title: "Tablespoons to mL Converter - Cooking & Baking | Free Tool",
        description:
          "Convert tablespoons to milliliters instantly. Supports US, UK, and Australian tablespoon standards with a quick reference table for common cooking measurements.",
        shortDescription: "Convert tablespoons to milliliters for cooking and baking.",
        keywords: [
          "tablespoon to ml",
          "tbsp to ml",
          "tablespoon to milliliters",
          "how many ml in a tablespoon",
          "tablespoon converter",
          "cooking measurement converter",
          "tbsp ml conversion",
          "tablespoon size ml",
        ],
      },

      calculator: { yourInformation: "Enter Measurement" },
      ui: { yourInformation: "Enter Measurement", calculate: "Convert", reset: "Reset", results: "Results" },

      inputs: {
        tbspValue: {
          label: "Tablespoons",
          helpText: "Enter the number of tablespoons to convert to milliliters",
        },
        tbspStandard: {
          label: "Tablespoon Standard",
          helpText: "US tablespoon = 14.787 mL. UK tablespoon = 17.758 mL. Australian = 20 mL. Metric = 15 mL",
          options: {
            us: "US (14.79 mL)",
            metric: "Metric (15 mL)",
            uk: "UK (17.76 mL)",
            australian: "Australian (20 mL)",
          },
        },
      },

      results: {
        milliliters: { label: "Milliliters" },
        teaspoons: { label: "Teaspoons" },
        fluidOunces: { label: "Fluid Ounces" },
        cups: { label: "Cups" },
      },

      presets: {
        half: { label: "½ Tbsp", description: "~7.4 mL" },
        one: { label: "1 Tbsp", description: "~14.8 mL" },
        three: { label: "3 Tbsp", description: "~44.4 mL" },
        quarter: { label: "¼ Cup (4 Tbsp)", description: "~59.1 mL" },
      },

      values: { ml: "mL", tsp: "tsp", tbsp: "tbsp", floz: "fl oz", cups: "cups" },

      formats: {
        summary: "{tbsp} tablespoons = {ml} mL ({tsp} tsp)",
      },

      infoCards: {
        conversions: {
          title: "Conversion Results",
          items: [
            { label: "Milliliters", valueKey: "milliliters" },
            { label: "Teaspoons", valueKey: "teaspoons" },
            { label: "Fluid Ounces", valueKey: "fluidOunces" },
            { label: "Cups", valueKey: "cups" },
          ],
        },
        quickRef: {
          title: "Quick Reference",
          items: [
            { label: "1 tbsp", valueKey: "ref1" },
            { label: "2 tbsp", valueKey: "ref2" },
            { label: "4 tbsp (¼ cup)", valueKey: "ref4" },
            { label: "8 tbsp (½ cup)", valueKey: "ref8" },
          ],
        },
        tips: {
          title: "Cooking Tips",
          items: [
            "For baking precision, use measuring spoons rather than regular silverware. A dinner spoon holds roughly 2 tbsp — nearly double the standard tablespoon.",
            "When a recipe says 'tablespoon', it means a level tablespoon unless stated otherwise. A heaped tablespoon can hold nearly twice as much.",
            "For sticky ingredients like honey or peanut butter, spray the measuring spoon with cooking oil first — the ingredient slides right out for accurate measurement.",
            "3 teaspoons = 1 tablespoon. This is one of the most useful kitchen conversions to memorize, especially when scaling recipes up or down.",
          ],
        },
      },

      education: {
        whatIs: {
          title: "What Is a Tablespoon in mL?",
          content:
            "A tablespoon (tbsp) is a common cooking measurement whose exact size varies by country. The US tablespoon equals 14.787 mL, the metric tablespoon used in international recipes equals exactly 15 mL, the UK tablespoon equals 17.758 mL, and the Australian tablespoon is 20 mL. This variation causes confusion when following recipes from different countries. For most cooking purposes, the difference between US (14.79 mL) and metric (15 mL) tablespoons is negligible — just 1.4% — and won't affect your recipe. However, the Australian tablespoon is 35% larger than the US version, which can significantly impact baking recipes where precision matters. This converter handles all four standards so you always get accurate measurements regardless of which country's recipes you're following.",
        },
        howItWorks: {
          title: "How to Convert Tablespoons to Milliliters",
          content:
            "Multiply the number of tablespoons by the appropriate conversion factor for your standard: US tablespoon × 14.787 = mL, metric tablespoon × 15 = mL, UK tablespoon × 17.758 = mL, or Australian tablespoon × 20 = mL. For example, 3 US tablespoons = 3 × 14.787 = 44.36 mL. To convert the other direction (mL to tablespoons), divide milliliters by the same factor. For quick mental math with US tablespoons, multiply by 15 (the metric approximation) — you'll be within 1.5% of the exact answer, which is close enough for cooking. For baking, where precision matters more, use the exact 14.787 factor or this converter.",
        },
        considerations: {
          title: "Measurement Standards",
          items: [
            { text: "US tablespoon = 14.787 mL (defined as ½ US fluid ounce). This is the standard in American cookbooks and recipes.", type: "info" },
            { text: "Metric tablespoon = 15 mL exactly. Used in international recipes and most modern cookbooks published outside the US.", type: "info" },
            { text: "UK tablespoon = 17.758 mL (defined as ⅝ UK fluid ounce). Older British recipes use this larger tablespoon.", type: "warning" },
            { text: "Australian tablespoon = 20 mL. Significantly larger than US/metric. Always check if a recipe uses Australian measurements.", type: "warning" },
            { text: "1 US tablespoon = 3 US teaspoons. 1 US cup = 16 tablespoons. These relationships are consistent within the US system.", type: "info" },
            { text: "For medicine dosing, always use the metric tablespoon (15 mL) or the dosing device provided. Never use kitchen spoons for medication.", type: "warning" },
          ],
        },
        categories: {
          title: "Common Cooking Conversions",
          items: [
            { text: "½ tablespoon = 1½ teaspoons = ~7.4 mL. Often needed for halving recipes that call for 1 tablespoon.", type: "info" },
            { text: "1 tablespoon = 3 teaspoons = ~14.8 mL (US). The fundamental tablespoon-to-teaspoon ratio.", type: "info" },
            { text: "2 tablespoons = 1 fluid ounce = ~29.6 mL. Useful when converting between volume and weight for liquids.", type: "info" },
            { text: "4 tablespoons = ¼ cup = ~59.1 mL. Common measurement in baking (butter, sugar, flour).", type: "info" },
            { text: "8 tablespoons = ½ cup = ~118.3 mL. Another critical baking conversion to know.", type: "info" },
            { text: "16 tablespoons = 1 cup = ~236.6 mL. Full cup equivalent in tablespoons.", type: "info" },
          ],
        },
        examples: {
          title: "Conversion Examples",
          description: "Step-by-step tablespoon to mL conversions",
          examples: [
            {
              title: "Convert 2.5 US tablespoons to mL",
              steps: [
                "2.5 × 14.787 = 36.97 mL",
                "Also equals 7.5 teaspoons",
                "Also equals ~1.25 fluid ounces",
              ],
              result: "2.5 US tbsp = 36.97 mL",
            },
            {
              title: "Convert 3 Australian tablespoons to mL",
              steps: [
                "3 × 20 = 60 mL",
                "Equivalent to ~4.06 US tablespoons",
                "Nearly ¼ cup (US)",
              ],
              result: "3 Australian tbsp = 60 mL",
            },
          ],
        },
      },

      faqs: [
        { question: "How many mL in a tablespoon?", answer: "It depends on the standard: a US tablespoon is 14.787 mL, a metric tablespoon is exactly 15 mL, a UK tablespoon is 17.758 mL, and an Australian tablespoon is 20 mL. For most cooking purposes, using 15 mL per tablespoon is accurate enough." },
        { question: "Is a tablespoon 15 mL or 20 mL?", answer: "A metric tablespoon is 15 mL, which is the international standard. An Australian tablespoon is 20 mL. If you're following an Australian recipe, use 20 mL per tablespoon. For recipes from most other countries, use 15 mL." },
        { question: "How many teaspoons in a tablespoon?", answer: "In the US system, 1 tablespoon = 3 teaspoons exactly. This is consistent across US, metric, and UK standards. An Australian tablespoon equals 4 Australian teaspoons (each 5 mL)." },
        { question: "Can I use a regular spoon as a tablespoon?", answer: "Not accurately. Regular dinner spoons vary widely in size, typically holding 10-20 mL. For cooking, use proper measuring spoons. For medication dosing, always use the provided dosing device, as inaccurate doses can be harmful." },
        { question: "How do I convert tablespoons to cups?", answer: "Divide the number of tablespoons by 16 to get US cups. For example, 6 tablespoons ÷ 16 = 0.375 cups (⅜ cup). Key benchmarks: 4 tbsp = ¼ cup, 8 tbsp = ½ cup, 12 tbsp = ¾ cup, 16 tbsp = 1 cup." },
        { question: "Why are Australian tablespoons different?", answer: "When Australia adopted the metric system in the 1970s, they defined the tablespoon as 20 mL (4 teaspoons of 5 mL each) for easy metric math. Most other countries adopted 15 mL (3 teaspoons of 5 mL). This means Australian recipes use about 33% more per tablespoon — important to know when cooking from Australian sources." },
      ],

      rating: { title: "Rate this Calculator", share: "Share", copied: "Copied!", copyLink: "Copy Link", clickToRate: "Click to rate", youRated: "You rated", stars: "stars", averageFrom: "average from", ratings: "ratings" },
      common: { home: "Home", calculators: "Calculators" },
      buttons: { calculate: "Convert", reset: "Reset", pdf: "PDF", csv: "CSV", excel: "Excel", save: "Save", saved: "Saved", saving: "Saving..." },
      share: { calculatedWith: "Calculated with Kalcufy.com" },
      accessibility: { mobileResults: "Results", closeModal: "Close", openMenu: "Menu" },
      sources: { title: "Sources & References" },
    },
    es: {
      "name": "Convertidor de Cucharadas a mL",
      "slug": "calculadora-convertidor-cucharadas-a-ml",
      "subtitle": "Convierte cucharadas a mililitros al instante — esencial para cocinar, hornear y dosificar medicamentos con estándares de EE.UU., Reino Unido y métricos.",
      "breadcrumb": "Cdas a mL",
      "seo": {
        "title": "Convertidor de Cucharadas a mL - Cocina y Repostería | Herramienta Gratuita",
        "description": "Convierte cucharadas a mililitros al instante. Compatible con estándares de cucharada de EE.UU., Reino Unido y Australia con tabla de referencia rápida para medidas comunes de cocina.",
        "shortDescription": "Convierte cucharadas a mililitros para cocinar y hornear.",
        "keywords": [
          "cucharada a ml",
          "cdas a ml",
          "cucharada a mililitros",
          "cuántos ml en una cucharada",
          "convertidor cucharada",
          "convertidor medidas cocina",
          "conversión cdas ml",
          "tamaño cucharada ml"
        ]
      },
      "inputs": {
        "tbspValue": {
          "label": "Cucharadas",
          "helpText": "Introduce el número de cucharadas para convertir a mililitros"
        },
        "tbspStandard": {
          "label": "Estándar de Cucharada",
          "helpText": "Cucharada EE.UU. = 14.787 mL. Cucharada Reino Unido = 17.758 mL. Australiana = 20 mL. Métrica = 15 mL",
          "options": {
            "us": "EE.UU. (14.79 mL)",
            "metric": "Métrica (15 mL)",
            "uk": "Reino Unido (17.76 mL)",
            "australian": "Australiana (20 mL)"
          }
        }
      },
      "results": {
        "milliliters": {
          "label": "Mililitros"
        },
        "teaspoons": {
          "label": "Cucharaditas"
        },
        "fluidOunces": {
          "label": "Onzas Líquidas"
        },
        "cups": {
          "label": "Tazas"
        }
      },
      "presets": {
        "half": {
          "label": "½ Cdas",
          "description": "~7.4 mL"
        },
        "one": {
          "label": "1 Cdas",
          "description": "~14.8 mL"
        },
        "three": {
          "label": "3 Cdas",
          "description": "~44.4 mL"
        },
        "quarter": {
          "label": "¼ Taza (4 Cdas)",
          "description": "~59.1 mL"
        }
      },
      "values": {
        "ml": "mL",
        "tsp": "cdta",
        "tbsp": "cdas",
        "floz": "oz líq",
        "cups": "tazas"
      },
      "formats": {
        "summary": "{tbsp} cucharadas = {ml} mL ({tsp} cdta)"
      },
      "infoCards": {
        "conversions": {
          "title": "Resultados de Conversión",
          "items": [
            {
              "label": "Mililitros",
              "valueKey": "milliliters"
            },
            {
              "label": "Cucharaditas",
              "valueKey": "teaspoons"
            },
            {
              "label": "Onzas Líquidas",
              "valueKey": "fluidOunces"
            },
            {
              "label": "Tazas",
              "valueKey": "cups"
            }
          ]
        },
        "quickRef": {
          "title": "Referencia Rápida",
          "items": [
            {
              "label": "1 cdas",
              "valueKey": "ref1"
            },
            {
              "label": "2 cdas",
              "valueKey": "ref2"
            },
            {
              "label": "4 cdas (¼ taza)",
              "valueKey": "ref4"
            },
            {
              "label": "8 cdas (½ taza)",
              "valueKey": "ref8"
            }
          ]
        },
        "tips": {
          "title": "Consejos de Cocina",
          "items": [
            "Para precisión en repostería, usa cucharas medidoras en lugar de cubiertos normales. Una cuchara de mesa contiene aproximadamente 2 cdas — casi el doble de una cucharada estándar.",
            "Cuando una receta dice 'cucharada', significa una cucharada nivelada a menos que se indique lo contrario. Una cucharada colmada puede contener casi el doble.",
            "Para ingredientes pegajosos como miel o mantequilla de maní, rocía la cuchara medidora con aceite en aerosol primero — el ingrediente se deslizará para una medición precisa.",
            "3 cucharaditas = 1 cucharada. Esta es una de las conversiones de cocina más útiles para memorizar, especialmente al ajustar recetas."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "¿Qué es una Cucharada en mL?",
          "content": "Una cucharada (cdas) es una medida común de cocina cuyo tamaño exacto varía según el país. La cucharada de EE.UU. equivale a 14.787 mL, la cucharada métrica usada en recetas internacionales equivale exactamente a 15 mL, la cucharada del Reino Unido equivale a 17.758 mL, y la cucharada australiana es de 20 mL. Esta variación causa confusión al seguir recetas de diferentes países. Para la mayoría de propósitos culinarios, la diferencia entre cucharadas de EE.UU. (14.79 mL) y métricas (15 mL) es insignificante — solo 1.4% — y no afectará tu receta. Sin embargo, la cucharada australiana es 35% más grande que la versión de EE.UU., lo que puede impactar significativamente las recetas de repostería donde la precisión importa. Este convertidor maneja los cuatro estándares para que siempre obtengas mediciones precisas sin importar de qué país sean las recetas que sigas."
        },
        "howItWorks": {
          "title": "Cómo Convertir Cucharadas a Mililitros",
          "content": "Multiplica el número de cucharadas por el factor de conversión apropiado para tu estándar: cucharada EE.UU. × 14.787 = mL, cucharada métrica × 15 = mL, cucharada Reino Unido × 17.758 = mL, o cucharada australiana × 20 = mL. Por ejemplo, 3 cucharadas de EE.UU. = 3 × 14.787 = 44.36 mL. Para convertir en la otra dirección (mL a cucharadas), divide mililitros por el mismo factor. Para cálculo mental rápido con cucharadas de EE.UU., multiplica por 15 (la aproximación métrica) — estarás dentro del 1.5% de la respuesta exacta, lo cual es suficientemente cerca para cocinar. Para repostería, donde la precisión importa más, usa el factor exacto 14.787 o este convertidor."
        },
        "considerations": {
          "title": "Estándares de Medición",
          "items": [
            {
              "text": "Cucharada EE.UU. = 14.787 mL (definida como ½ onza líquida de EE.UU.). Este es el estándar en libros de cocina y recetas estadounidenses.",
              "type": "info"
            },
            {
              "text": "Cucharada métrica = 15 mL exactos. Usada en recetas internacionales y la mayoría de libros de cocina modernos publicados fuera de EE.UU.",
              "type": "info"
            },
            {
              "text": "Cucharada Reino Unido = 17.758 mL (definida como ⅝ onza líquida del Reino Unido). Las recetas británicas más antiguas usan esta cucharada más grande.",
              "type": "warning"
            },
            {
              "text": "Cucharada australiana = 20 mL. Significativamente más grande que EE.UU./métrica. Siempre verifica si una receta usa medidas australianas.",
              "type": "warning"
            },
            {
              "text": "1 cucharada EE.UU. = 3 cucharaditas EE.UU. 1 taza EE.UU. = 16 cucharadas. Estas relaciones son consistentes dentro del sistema de EE.UU.",
              "type": "info"
            },
            {
              "text": "Para dosificación de medicamentos, siempre usa la cucharada métrica (15 mL) o el dispositivo dosificador proporcionado. Nunca uses cucharas de cocina para medicamentos.",
              "type": "warning"
            }
          ]
        },
        "categories": {
          "title": "Conversiones Comunes de Cocina",
          "items": [
            {
              "text": "½ cucharada = 1½ cucharaditas = ~7.4 mL. A menudo necesario para reducir a la mitad recetas que requieren 1 cucharada.",
              "type": "info"
            },
            {
              "text": "1 cucharada = 3 cucharaditas = ~14.8 mL (EE.UU.). La relación fundamental cucharada-a-cucharadita.",
              "type": "info"
            },
            {
              "text": "2 cucharadas = 1 onza líquida = ~29.6 mL. Útil al convertir entre volumen y peso para líquidos.",
              "type": "info"
            },
            {
              "text": "4 cucharadas = ¼ taza = ~59.1 mL. Medida común en repostería (mantequilla, azúcar, harina).",
              "type": "info"
            },
            {
              "text": "8 cucharadas = ½ taza = ~118.3 mL. Otra conversión crítica de repostería que debes conocer.",
              "type": "info"
            },
            {
              "text": "16 cucharadas = 1 taza = ~236.6 mL. Equivalente de taza completa en cucharadas.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Ejemplos de Conversión",
          "description": "Conversiones paso a paso de cucharadas a mL",
          "examples": [
            {
              "title": "Convertir 2.5 cucharadas de EE.UU. a mL",
              "steps": [
                "2.5 × 14.787 = 36.97 mL",
                "También equivale a 7.5 cucharaditas",
                "También equivale a ~1.25 onzas líquidas"
              ],
              "result": "2.5 cdas EE.UU. = 36.97 mL"
            },
            {
              "title": "Convertir 3 cucharadas australianas a mL",
              "steps": [
                "3 × 20 = 60 mL",
                "Equivalente a ~4.06 cucharadas de EE.UU.",
                "Casi ¼ taza (EE.UU.)"
              ],
              "result": "3 cdas australianas = 60 mL"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "¿Cuántos mL hay en una cucharada?",
          "answer": "Depende del estándar: una cucharada de EE.UU. es 14.787 mL, una cucharada métrica es exactamente 15 mL, una cucharada del Reino Unido es 17.758 mL, y una cucharada australiana es 20 mL. Para la mayoría de propósitos culinarios, usar 15 mL por cucharada es suficientemente preciso."
        },
        {
          "question": "¿Una cucharada son 15 mL o 20 mL?",
          "answer": "Una cucharada métrica son 15 mL, que es el estándar internacional. Una cucharada australiana son 20 mL. Si sigues una receta australiana, usa 20 mL por cucharada. Para recetas de la mayoría de otros países, usa 15 mL."
        },
        {
          "question": "¿Cuántas cucharaditas hay en una cucharada?",
          "answer": "En el sistema de EE.UU., 1 cucharada = 3 cucharaditas exactamente. Esto es consistente en los estándares de EE.UU., métrico y del Reino Unido. Una cucharada australiana equivale a 4 cucharaditas australianas (cada una de 5 mL)."
        },
        {
          "question": "¿Puedo usar una cuchara normal como cucharada?",
          "answer": "No con precisión. Las cucharas de mesa normales varían ampliamente en tamaño, típicamente conteniendo 10-20 mL. Para cocinar, usa cucharas medidoras adecuadas. Para dosificación de medicamentos, siempre usa el dispositivo dosificador proporcionado, ya que dosis inexactas pueden ser dañinas."
        },
        {
          "question": "¿Cómo convierto cucharadas a tazas?",
          "answer": "Divide el número de cucharadas por 16 para obtener tazas de EE.UU. Por ejemplo, 6 cucharadas ÷ 16 = 0.375 tazas (⅜ taza). Referencias clave: 4 cdas = ¼ taza, 8 cdas = ½ taza, 12 cdas = ¾ taza, 16 cdas = 1 taza."
        },
        {
          "question": "¿Por qué las cucharadas australianas son diferentes?",
          "answer": "Cuando Australia adoptó el sistema métrico en los años 1970, definieron la cucharada como 20 mL (4 cucharaditas de 5 mL cada una) para facilitar las matemáticas métricas. La mayoría de otros países adoptaron 15 mL (3 cucharaditas de 5 mL). Esto significa que las recetas australianas usan aproximadamente 33% más por cucharada — importante saberlo al cocinar con fuentes australianas."
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
      "name": "Conversor de Colheres de Sopa para mL",
      "slug": "calculadora-conversor-colher-sopa-ml",
      "subtitle": "Converta colheres de sopa para mililitros instantaneamente — essencial para culinária, confeitaria e dosagem de medicamentos com padrões americanos, britânicos e métricos.",
      "breadcrumb": "CS para mL",
      "seo": {
        "title": "Conversor de Colheres de Sopa para mL - Culinária e Confeitaria | Ferramenta Gratuita",
        "description": "Converta colheres de sopa para mililitros instantaneamente. Suporta padrões de colher de sopa americanos, britânicos e australianos com tabela de referência rápida para medidas culinárias comuns.",
        "shortDescription": "Converta colheres de sopa para mililitros para culinária e confeitaria.",
        "keywords": [
          "colher de sopa para ml",
          "cs para ml",
          "colher de sopa para mililitros",
          "quantos ml numa colher de sopa",
          "conversor colher de sopa",
          "conversor medidas culinárias",
          "conversão cs ml",
          "tamanho colher sopa ml"
        ]
      },
      "calculator": {
        "yourInformation": "Suas Informações"
      },
      "inputs": {
        "tbspValue": {
          "label": "Colheres de Sopa",
          "helpText": "Insira o número de colheres de sopa para converter para mililitros"
        },
        "tbspStandard": {
          "label": "Padrão da Colher de Sopa",
          "helpText": "Colher de sopa americana = 14,787 mL. Colher britânica = 17,758 mL. Australiana = 20 mL. Métrica = 15 mL",
          "options": {
            "us": "Americana (14,79 mL)",
            "metric": "Métrica (15 mL)",
            "uk": "Britânica (17,76 mL)",
            "australian": "Australiana (20 mL)"
          }
        }
      },
      "results": {
        "milliliters": {
          "label": "Mililitros"
        },
        "teaspoons": {
          "label": "Colheres de Chá"
        },
        "fluidOunces": {
          "label": "Onças Fluidas"
        },
        "cups": {
          "label": "Xícaras"
        }
      },
      "presets": {
        "half": {
          "label": "½ CS",
          "description": "~7,4 mL"
        },
        "one": {
          "label": "1 CS",
          "description": "~14,8 mL"
        },
        "three": {
          "label": "3 CS",
          "description": "~44,4 mL"
        },
        "quarter": {
          "label": "¼ Xícara (4 CS)",
          "description": "~59,1 mL"
        }
      },
      "values": {
        "ml": "mL",
        "tsp": "cch",
        "tbsp": "cs",
        "floz": "fl oz",
        "cups": "xícaras"
      },
      "formats": {
        "summary": "{tbsp} colheres de sopa = {ml} mL ({tsp} cch)"
      },
      "infoCards": {
        "conversions": {
          "title": "Resultados da Conversão",
          "items": [
            {
              "label": "Mililitros",
              "valueKey": "milliliters"
            },
            {
              "label": "Colheres de Chá",
              "valueKey": "teaspoons"
            },
            {
              "label": "Onças Fluidas",
              "valueKey": "fluidOunces"
            },
            {
              "label": "Xícaras",
              "valueKey": "cups"
            }
          ]
        },
        "quickRef": {
          "title": "Referência Rápida",
          "items": [
            {
              "label": "1 cs",
              "valueKey": "ref1"
            },
            {
              "label": "2 cs",
              "valueKey": "ref2"
            },
            {
              "label": "4 cs (¼ xícara)",
              "valueKey": "ref4"
            },
            {
              "label": "8 cs (½ xícara)",
              "valueKey": "ref8"
            }
          ]
        },
        "tips": {
          "title": "Dicas Culinárias",
          "items": [
            "Para precisão na confeitaria, use colheres medidoras em vez de talheres comuns. Uma colher de jantar comporta aproximadamente 2 cs — quase o dobro da colher de sopa padrão.",
            "Quando uma receita diz 'colher de sopa', significa uma colher de sopa nivelada, salvo indicação contrária. Uma colher de sopa cheia pode conter quase duas vezes mais.",
            "Para ingredientes pegajosos como mel ou pasta de amendoim, borrife primeiro a colher medidora com óleo de cozinha — o ingrediente desliza facilmente para fora permitindo medição precisa.",
            "3 colheres de chá = 1 colher de sopa. Esta é uma das conversões culinárias mais úteis para memorizar, especialmente ao ajustar receitas para mais ou menos."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "O que é uma Colher de Sopa em mL?",
          "content": "Uma colher de sopa (cs) é uma medida culinária comum cujo tamanho exato varia por país. A colher de sopa americana equivale a 14,787 mL, a colher métrica usada em receitas internacionais equivale exatamente a 15 mL, a colher britânica equivale a 17,758 mL, e a colher australiana é de 20 mL. Esta variação causa confusão ao seguir receitas de diferentes países. Para a maioria dos propósitos culinários, a diferença entre colheres americanas (14,79 mL) e métricas (15 mL) é insignificante — apenas 1,4% — e não afetará sua receita. Porém, a colher australiana é 35% maior que a versão americana, o que pode impactar significativamente receitas de confeitaria onde a precisão importa. Este conversor trata todos os quatro padrões para que você sempre obtenha medidas precisas independente de que país vêm as receitas que está seguindo."
        },
        "howItWorks": {
          "title": "Como Converter Colheres de Sopa para Mililitros",
          "content": "Multiplique o número de colheres de sopa pelo fator de conversão apropriado para seu padrão: colher americana × 14,787 = mL, colher métrica × 15 = mL, colher britânica × 17,758 = mL, ou colher australiana × 20 = mL. Por exemplo, 3 colheres americanas = 3 × 14,787 = 44,36 mL. Para converter na direção oposta (mL para colheres), divida os mililitros pelo mesmo fator. Para cálculo mental rápido com colheres americanas, multiplique por 15 (a aproximação métrica) — você ficará dentro de 1,5% da resposta exata, o que é próximo o suficiente para culinária. Para confeitaria, onde a precisão importa mais, use o fator exato 14,787 ou este conversor."
        },
        "considerations": {
          "title": "Padrões de Medição",
          "items": [
            {
              "text": "Colher americana = 14,787 mL (definida como ½ onça fluida americana). Este é o padrão em livros de receitas americanos.",
              "type": "info"
            },
            {
              "text": "Colher métrica = 15 mL exatamente. Usada em receitas internacionais e a maioria dos livros modernos publicados fora dos EUA.",
              "type": "info"
            },
            {
              "text": "Colher britânica = 17,758 mL (definida como ⅝ onça fluida britânica). Receitas britânicas antigas usam esta colher maior.",
              "type": "warning"
            },
            {
              "text": "Colher australiana = 20 mL. Significativamente maior que americana/métrica. Sempre verifique se uma receita usa medidas australianas.",
              "type": "warning"
            },
            {
              "text": "1 colher de sopa americana = 3 colheres de chá americanas. 1 xícara americana = 16 colheres de sopa. Estas relações são consistentes no sistema americano.",
              "type": "info"
            },
            {
              "text": "Para dosagem de medicamentos, sempre use a colher métrica (15 mL) ou o dispositivo dosador fornecido. Nunca use colheres de cozinha para medicação.",
              "type": "warning"
            }
          ]
        },
        "categories": {
          "title": "Conversões Culinárias Comuns",
          "items": [
            {
              "text": "½ colher de sopa = 1½ colheres de chá = ~7,4 mL. Frequentemente necessário para reduzir pela metade receitas que pedem 1 colher de sopa.",
              "type": "info"
            },
            {
              "text": "1 colher de sopa = 3 colheres de chá = ~14,8 mL (americana). A relação fundamental colher de sopa para colher de chá.",
              "type": "info"
            },
            {
              "text": "2 colheres de sopa = 1 onça fluida = ~29,6 mL. Útil ao converter entre volume e peso para líquidos.",
              "type": "info"
            },
            {
              "text": "4 colheres de sopa = ¼ xícara = ~59,1 mL. Medida comum na confeitaria (manteiga, açúcar, farinha).",
              "type": "info"
            },
            {
              "text": "8 colheres de sopa = ½ xícara = ~118,3 mL. Outra conversão crítica de confeitaria para saber.",
              "type": "info"
            },
            {
              "text": "16 colheres de sopa = 1 xícara = ~236,6 mL. Equivalente de xícara completa em colheres de sopa.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemplos de Conversão",
          "description": "Conversões passo a passo de colher de sopa para mL",
          "examples": [
            {
              "title": "Converter 2,5 colheres americanas para mL",
              "steps": [
                "2,5 × 14,787 = 36,97 mL",
                "Também equivale a 7,5 colheres de chá",
                "Também equivale a ~1,25 onças fluidas"
              ],
              "result": "2,5 cs americanas = 36,97 mL"
            },
            {
              "title": "Converter 3 colheres australianas para mL",
              "steps": [
                "3 × 20 = 60 mL",
                "Equivalente a ~4,06 colheres americanas",
                "Quase ¼ xícara (americana)"
              ],
              "result": "3 cs australianas = 60 mL"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Quantos mL numa colher de sopa?",
          "answer": "Depende do padrão: uma colher americana é 14,787 mL, uma colher métrica é exatamente 15 mL, uma colher britânica é 17,758 mL, e uma colher australiana é 20 mL. Para a maioria dos propósitos culinários, usar 15 mL por colher de sopa é preciso o suficiente."
        },
        {
          "question": "Uma colher de sopa é 15 mL ou 20 mL?",
          "answer": "Uma colher métrica é 15 mL, que é o padrão internacional. Uma colher australiana é 20 mL. Se você está seguindo uma receita australiana, use 20 mL por colher. Para receitas da maioria dos outros países, use 15 mL."
        },
        {
          "question": "Quantas colheres de chá numa colher de sopa?",
          "answer": "No sistema americano, 1 colher de sopa = 3 colheres de chá exatamente. Isto é consistente nos padrões americano, métrico e britânico. Uma colher australiana equivale a 4 colheres de chá australianas (cada uma 5 mL)."
        },
        {
          "question": "Posso usar uma colher comum como colher de sopa?",
          "answer": "Não com precisão. Colheres de jantar comuns variam muito em tamanho, tipicamente comportando 10-20 mL. Para culinária, use colheres medidoras adequadas. Para dosagem de medicamentos, sempre use o dispositivo dosador fornecido, pois doses imprecisas podem ser prejudiciais."
        },
        {
          "question": "Como converto colheres de sopa para xícaras?",
          "answer": "Divida o número de colheres de sopa por 16 para obter xícaras americanas. Por exemplo, 6 colheres ÷ 16 = 0,375 xícaras (⅜ xícara). Referências principais: 4 cs = ¼ xícara, 8 cs = ½ xícara, 12 cs = ¾ xícara, 16 cs = 1 xícara."
        },
        {
          "question": "Por que as colheres australianas são diferentes?",
          "answer": "Quando a Austrália adotou o sistema métrico nos anos 1970, eles definiram a colher de sopa como 20 mL (4 colheres de chá de 5 mL cada) para facilitar a matemática métrica. A maioria dos outros países adotou 15 mL (3 colheres de chá de 5 mL). Isto significa que receitas australianas usam cerca de 33% mais por colher — importante saber ao cozinhar com fontes australianas."
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
      "name": "Convertisseur Cuillères à Soupe vers mL",
      "slug": "calculateur-conversion-cuillere-soupe-ml",
      "subtitle": "Convertissez les cuillères à soupe en millilitres instantanément — essentiel pour la cuisine, la pâtisserie et le dosage de médicaments avec les standards américains, britanniques et métriques.",
      "breadcrumb": "C. à soupe vers mL",
      "seo": {
        "title": "Convertisseur Cuillères à Soupe vers mL - Cuisine & Pâtisserie | Outil Gratuit",
        "description": "Convertissez les cuillères à soupe en millilitres instantanément. Supporte les standards américains, britanniques et australiens avec un tableau de référence rapide pour les mesures de cuisine courantes.",
        "shortDescription": "Convertissez les cuillères à soupe en millilitres pour la cuisine et la pâtisserie.",
        "keywords": [
          "cuillère à soupe en ml",
          "c à s en ml",
          "cuillère à soupe en millilitres",
          "combien de ml dans une cuillère à soupe",
          "convertisseur cuillère à soupe",
          "convertisseur mesure cuisine",
          "conversion c à s ml",
          "taille cuillère à soupe ml"
        ]
      },
      "inputs": {
        "tbspValue": {
          "label": "Cuillères à soupe",
          "helpText": "Entrez le nombre de cuillères à soupe à convertir en millilitres"
        },
        "tbspStandard": {
          "label": "Standard de cuillère à soupe",
          "helpText": "Cuillère à soupe américaine = 14,787 mL. Britannique = 17,758 mL. Australienne = 20 mL. Métrique = 15 mL",
          "options": {
            "us": "Américaine (14,79 mL)",
            "metric": "Métrique (15 mL)",
            "uk": "Britannique (17,76 mL)",
            "australian": "Australienne (20 mL)"
          }
        }
      },
      "results": {
        "milliliters": {
          "label": "Millilitres"
        },
        "teaspoons": {
          "label": "Cuillères à café"
        },
        "fluidOunces": {
          "label": "Onces liquides"
        },
        "cups": {
          "label": "Tasses"
        }
      },
      "presets": {
        "half": {
          "label": "½ c. à s.",
          "description": "~7,4 mL"
        },
        "one": {
          "label": "1 c. à s.",
          "description": "~14,8 mL"
        },
        "three": {
          "label": "3 c. à s.",
          "description": "~44,4 mL"
        },
        "quarter": {
          "label": "¼ tasse (4 c. à s.)",
          "description": "~59,1 mL"
        }
      },
      "values": {
        "ml": "mL",
        "tsp": "c. à c.",
        "tbsp": "c. à s.",
        "floz": "oz liq",
        "cups": "tasses"
      },
      "formats": {
        "summary": "{tbsp} cuillères à soupe = {ml} mL ({tsp} c. à c.)"
      },
      "infoCards": {
        "conversions": {
          "title": "Résultats de conversion",
          "items": [
            {
              "label": "Millilitres",
              "valueKey": "milliliters"
            },
            {
              "label": "Cuillères à café",
              "valueKey": "teaspoons"
            },
            {
              "label": "Onces liquides",
              "valueKey": "fluidOunces"
            },
            {
              "label": "Tasses",
              "valueKey": "cups"
            }
          ]
        },
        "quickRef": {
          "title": "Référence rapide",
          "items": [
            {
              "label": "1 c. à s.",
              "valueKey": "ref1"
            },
            {
              "label": "2 c. à s.",
              "valueKey": "ref2"
            },
            {
              "label": "4 c. à s. (¼ tasse)",
              "valueKey": "ref4"
            },
            {
              "label": "8 c. à s. (½ tasse)",
              "valueKey": "ref8"
            }
          ]
        },
        "tips": {
          "title": "Conseils de cuisine",
          "items": [
            "Pour la précision en pâtisserie, utilisez des cuillères doseuses plutôt que des couverts ordinaires. Une cuillère de table contient environ 2 c. à s. — presque le double d'une cuillère à soupe standard.",
            "Quand une recette dit 'cuillère à soupe', elle signifie une cuillère à soupe rase sauf indication contraire. Une cuillère à soupe bombée peut contenir presque deux fois plus.",
            "Pour les ingrédients collants comme le miel ou le beurre de cacahuète, vaporisez d'abord la cuillère doseuse avec de l'huile de cuisson — l'ingrédient glisse directement pour une mesure précise.",
            "3 cuillères à café = 1 cuillère à soupe. C'est l'une des conversions de cuisine les plus utiles à mémoriser, surtout pour adapter les recettes."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Qu'est-ce qu'une cuillère à soupe en mL ?",
          "content": "Une cuillère à soupe (c. à s.) est une mesure de cuisine courante dont la taille exacte varie selon le pays. La cuillère à soupe américaine équivaut à 14,787 mL, la cuillère à soupe métrique utilisée dans les recettes internationales équivaut exactement à 15 mL, la cuillère à soupe britannique équivaut à 17,758 mL, et la cuillère à soupe australienne fait 20 mL. Cette variation cause de la confusion lors du suivi de recettes de différents pays. Pour la plupart des usages culinaires, la différence entre les cuillères à soupe américaines (14,79 mL) et métriques (15 mL) est négligeable — seulement 1,4% — et n'affectera pas votre recette. Cependant, la cuillère à soupe australienne est 35% plus grande que la version américaine, ce qui peut significativement impacter les recettes de pâtisserie où la précision compte. Ce convertisseur gère les quatre standards pour que vous obteniez toujours des mesures précises peu importe le pays d'origine de vos recettes."
        },
        "howItWorks": {
          "title": "Comment convertir les cuillères à soupe en millilitres",
          "content": "Multipliez le nombre de cuillères à soupe par le facteur de conversion approprié pour votre standard : cuillère à soupe américaine × 14,787 = mL, cuillère à soupe métrique × 15 = mL, cuillère à soupe britannique × 17,758 = mL, ou cuillère à soupe australienne × 20 = mL. Par exemple, 3 cuillères à soupe américaines = 3 × 14,787 = 44,36 mL. Pour convertir dans l'autre sens (mL vers cuillères à soupe), divisez les millilitres par le même facteur. Pour un calcul mental rapide avec les cuillères à soupe américaines, multipliez par 15 (l'approximation métrique) — vous serez à 1,5% près de la réponse exacte, ce qui est suffisant pour cuisiner. Pour la pâtisserie, où la précision compte plus, utilisez le facteur exact 14,787 ou ce convertisseur."
        },
        "considerations": {
          "title": "Standards de mesure",
          "items": [
            {
              "text": "Cuillère à soupe américaine = 14,787 mL (définie comme ½ once liquide américaine). C'est le standard dans les livres de cuisine et recettes américains.",
              "type": "info"
            },
            {
              "text": "Cuillère à soupe métrique = 15 mL exactement. Utilisée dans les recettes internationales et la plupart des livres de cuisine modernes publiés hors des États-Unis.",
              "type": "info"
            },
            {
              "text": "Cuillère à soupe britannique = 17,758 mL (définie comme ⅝ once liquide britannique). Les anciennes recettes britanniques utilisent cette cuillère à soupe plus grande.",
              "type": "warning"
            },
            {
              "text": "Cuillère à soupe australienne = 20 mL. Significativement plus grande que américaine/métrique. Vérifiez toujours si une recette utilise les mesures australiennes.",
              "type": "warning"
            },
            {
              "text": "1 cuillère à soupe américaine = 3 cuillères à café américaines. 1 tasse américaine = 16 cuillères à soupe. Ces relations sont cohérentes dans le système américain.",
              "type": "info"
            },
            {
              "text": "Pour le dosage de médicaments, utilisez toujours la cuillère à soupe métrique (15 mL) ou le dispositif de dosage fourni. N'utilisez jamais de cuillères de cuisine pour les médicaments.",
              "type": "warning"
            }
          ]
        },
        "categories": {
          "title": "Conversions de cuisine courantes",
          "items": [
            {
              "text": "½ cuillère à soupe = 1½ cuillères à café = ~7,4 mL. Souvent nécessaire pour diviser par deux des recettes qui demandent 1 cuillère à soupe.",
              "type": "info"
            },
            {
              "text": "1 cuillère à soupe = 3 cuillères à café = ~14,8 mL (américaine). Le rapport fondamental cuillère à soupe vers cuillère à café.",
              "type": "info"
            },
            {
              "text": "2 cuillères à soupe = 1 once liquide = ~29,6 mL. Utile lors de la conversion entre volume et poids pour les liquides.",
              "type": "info"
            },
            {
              "text": "4 cuillères à soupe = ¼ tasse = ~59,1 mL. Mesure courante en pâtisserie (beurre, sucre, farine).",
              "type": "info"
            },
            {
              "text": "8 cuillères à soupe = ½ tasse = ~118,3 mL. Une autre conversion de pâtisserie critique à connaître.",
              "type": "info"
            },
            {
              "text": "16 cuillères à soupe = 1 tasse = ~236,6 mL. Équivalent d'une tasse complète en cuillères à soupe.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemples de conversion",
          "description": "Conversions étape par étape de cuillères à soupe vers mL",
          "examples": [
            {
              "title": "Convertir 2,5 cuillères à soupe américaines en mL",
              "steps": [
                "2,5 × 14,787 = 36,97 mL",
                "Équivaut aussi à 7,5 cuillères à café",
                "Équivaut aussi à ~1,25 onces liquides"
              ],
              "result": "2,5 c. à s. américaines = 36,97 mL"
            },
            {
              "title": "Convertir 3 cuillères à soupe australiennes en mL",
              "steps": [
                "3 × 20 = 60 mL",
                "Équivalent à ~4,06 cuillères à soupe américaines",
                "Presque ¼ tasse (américaine)"
              ],
              "result": "3 c. à s. australiennes = 60 mL"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Combien de mL dans une cuillère à soupe ?",
          "answer": "Cela dépend du standard : une cuillère à soupe américaine fait 14,787 mL, une cuillère à soupe métrique fait exactement 15 mL, une cuillère à soupe britannique fait 17,758 mL, et une cuillère à soupe australienne fait 20 mL. Pour la plupart des usages culinaires, utiliser 15 mL par cuillère à soupe est suffisamment précis."
        },
        {
          "question": "Une cuillère à soupe fait-elle 15 mL ou 20 mL ?",
          "answer": "Une cuillère à soupe métrique fait 15 mL, ce qui est le standard international. Une cuillère à soupe australienne fait 20 mL. Si vous suivez une recette australienne, utilisez 20 mL par cuillère à soupe. Pour les recettes de la plupart des autres pays, utilisez 15 mL."
        },
        {
          "question": "Combien de cuillères à café dans une cuillère à soupe ?",
          "answer": "Dans le système américain, 1 cuillère à soupe = 3 cuillères à café exactement. C'est cohérent dans les standards américains, métriques et britanniques. Une cuillère à soupe australienne équivaut à 4 cuillères à café australiennes (chacune 5 mL)."
        },
        {
          "question": "Puis-je utiliser une cuillère ordinaire comme cuillère à soupe ?",
          "answer": "Pas précisément. Les cuillères de table ordinaires varient largement en taille, contenant généralement 10-20 mL. Pour cuisiner, utilisez des cuillères doseuses appropriées. Pour le dosage de médicaments, utilisez toujours le dispositif de dosage fourni, car des doses imprécises peuvent être dangereuses."
        },
        {
          "question": "Comment convertir les cuillères à soupe en tasses ?",
          "answer": "Divisez le nombre de cuillères à soupe par 16 pour obtenir des tasses américaines. Par exemple, 6 cuillères à soupe ÷ 16 = 0,375 tasses (⅜ tasse). Repères clés : 4 c. à s. = ¼ tasse, 8 c. à s. = ½ tasse, 12 c. à s. = ¾ tasse, 16 c. à s. = 1 tasse."
        },
        {
          "question": "Pourquoi les cuillères à soupe australiennes sont-elles différentes ?",
          "answer": "Quand l'Australie a adopté le système métrique dans les années 1970, ils ont défini la cuillère à soupe comme 20 mL (4 cuillères à café de 5 mL chacune) pour faciliter les calculs métriques. La plupart des autres pays ont adopté 15 mL (3 cuillères à café de 5 mL). Cela signifie que les recettes australiennes utilisent environ 33% de plus par cuillère à soupe — important à savoir lors de la cuisine à partir de sources australiennes."
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
      "name": "Esslöffel zu mL Umrechner",
      "slug": "essloeffel-zu-ml-umrechner-rechner",
      "subtitle": "Rechnen Sie Esslöffel sofort in Milliliter um — unverzichtbar für Kochen, Backen und Medikamentendosierung mit US-, UK- und metrischen Standards.",
      "breadcrumb": "EL zu mL",
      "seo": {
        "title": "Esslöffel zu mL Umrechner - Kochen & Backen | Kostenloses Tool",
        "description": "Rechnen Sie Esslöffel sofort in Milliliter um. Unterstützt US-, UK- und australische Esslöffel-Standards mit schneller Referenztabelle für gängige Kochmaße.",
        "shortDescription": "Rechnen Sie Esslöffel in Milliliter für Kochen und Backen um.",
        "keywords": [
          "esslöffel zu ml",
          "el zu ml",
          "esslöffel zu milliliter",
          "wie viele ml in einem esslöffel",
          "esslöffel umrechner",
          "kochmaß umrechner",
          "el ml umrechnung",
          "esslöffel größe ml"
        ]
      },
      "inputs": {
        "tbspValue": {
          "label": "Esslöffel",
          "helpText": "Geben Sie die Anzahl der Esslöffel ein, die in Milliliter umgerechnet werden sollen"
        },
        "tbspStandard": {
          "label": "Esslöffel-Standard",
          "helpText": "US Esslöffel = 14,787 mL. UK Esslöffel = 17,758 mL. Australisch = 20 mL. Metrisch = 15 mL",
          "options": {
            "us": "US (14,79 mL)",
            "metric": "Metrisch (15 mL)",
            "uk": "UK (17,76 mL)",
            "australian": "Australisch (20 mL)"
          }
        }
      },
      "results": {
        "milliliters": {
          "label": "Milliliter"
        },
        "teaspoons": {
          "label": "Teelöffel"
        },
        "fluidOunces": {
          "label": "Flüssigunzen"
        },
        "cups": {
          "label": "Tassen"
        }
      },
      "presets": {
        "half": {
          "label": "½ EL",
          "description": "~7,4 mL"
        },
        "one": {
          "label": "1 EL",
          "description": "~14,8 mL"
        },
        "three": {
          "label": "3 EL",
          "description": "~44,4 mL"
        },
        "quarter": {
          "label": "¼ Tasse (4 EL)",
          "description": "~59,1 mL"
        }
      },
      "values": {
        "ml": "mL",
        "tsp": "TL",
        "tbsp": "EL",
        "floz": "fl oz",
        "cups": "Tassen"
      },
      "formats": {
        "summary": "{tbsp} Esslöffel = {ml} mL ({tsp} TL)"
      },
      "infoCards": {
        "conversions": {
          "title": "Umrechnungsergebnisse",
          "items": [
            {
              "label": "Milliliter",
              "valueKey": "milliliters"
            },
            {
              "label": "Teelöffel",
              "valueKey": "teaspoons"
            },
            {
              "label": "Flüssigunzen",
              "valueKey": "fluidOunces"
            },
            {
              "label": "Tassen",
              "valueKey": "cups"
            }
          ]
        },
        "quickRef": {
          "title": "Schnelle Referenz",
          "items": [
            {
              "label": "1 EL",
              "valueKey": "ref1"
            },
            {
              "label": "2 EL",
              "valueKey": "ref2"
            },
            {
              "label": "4 EL (¼ Tasse)",
              "valueKey": "ref4"
            },
            {
              "label": "8 EL (½ Tasse)",
              "valueKey": "ref8"
            }
          ]
        },
        "tips": {
          "title": "Koch-Tipps",
          "items": [
            "Für präzises Backen verwenden Sie Messlöffel statt normales Besteck. Ein Esslöffel fasst etwa 2 EL — fast das Doppelte eines Standard-Esslöffels.",
            "Wenn ein Rezept 'Esslöffel' sagt, meint es einen gestrichenen Esslöffel, sofern nicht anders angegeben. Ein gehäufter Esslöffel kann fast doppelt so viel fassen.",
            "Bei klebrigen Zutaten wie Honig oder Erdnussbutter sprühen Sie den Messlöffel zuerst mit Kochspray ein — die Zutat rutscht für genaues Messen einfach heraus.",
            "3 Teelöffel = 1 Esslöffel. Das ist eine der nützlichsten Küchenumrechnungen zum Auswendiglernen, besonders beim Skalieren von Rezepten."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Was ist ein Esslöffel in mL?",
          "content": "Ein Esslöffel (EL) ist ein gängiges Kochmaß, dessen genaue Größe je nach Land variiert. Der US-Esslöffel entspricht 14,787 mL, der metrische Esslöffel in internationalen Rezepten entspricht genau 15 mL, der UK-Esslöffel entspricht 17,758 mL und der australische Esslöffel ist 20 mL. Diese Variation verursacht Verwirrung beim Befolgen von Rezepten aus verschiedenen Ländern. Für die meisten Kochzwecke ist der Unterschied zwischen US (14,79 mL) und metrischen (15 mL) Esslöffeln vernachlässigbar — nur 1,4% — und beeinflusst Ihr Rezept nicht. Der australische Esslöffel ist jedoch 35% größer als die US-Version, was Backrezepte, bei denen Präzision wichtig ist, erheblich beeinflussen kann. Dieser Umrechner behandelt alle vier Standards, sodass Sie immer genaue Messungen erhalten, unabhängig davon, welche Länderrezepte Sie befolgen."
        },
        "howItWorks": {
          "title": "Wie man Esslöffel in Milliliter umrechnet",
          "content": "Multiplizieren Sie die Anzahl der Esslöffel mit dem entsprechenden Umrechnungsfaktor für Ihren Standard: US-Esslöffel × 14,787 = mL, metrischer Esslöffel × 15 = mL, UK-Esslöffel × 17,758 = mL oder australischer Esslöffel × 20 = mL. Zum Beispiel: 3 US-Esslöffel = 3 × 14,787 = 44,36 mL. Um in die andere Richtung umzurechnen (mL zu Esslöffel), teilen Sie Milliliter durch denselben Faktor. Für schnelle Kopfrechnung bei US-Esslöffeln multiplizieren Sie mit 15 (der metrischen Annäherung) — Sie sind innerhalb von 1,5% der genauen Antwort, was fürs Kochen ausreicht. Fürs Backen, wo Präzision wichtiger ist, verwenden Sie den genauen 14,787-Faktor oder diesen Umrechner."
        },
        "considerations": {
          "title": "Mess-Standards",
          "items": [
            {
              "text": "US-Esslöffel = 14,787 mL (definiert als ½ US-Flüssigunze). Das ist der Standard in amerikanischen Kochbüchern und Rezepten.",
              "type": "info"
            },
            {
              "text": "Metrischer Esslöffel = genau 15 mL. Verwendet in internationalen Rezepten und den meisten modernen Kochbüchern außerhalb der USA.",
              "type": "info"
            },
            {
              "text": "UK-Esslöffel = 17,758 mL (definiert als ⅝ UK-Flüssigunze). Ältere britische Rezepte verwenden diesen größeren Esslöffel.",
              "type": "warning"
            },
            {
              "text": "Australischer Esslöffel = 20 mL. Deutlich größer als US/metrisch. Prüfen Sie immer, ob ein Rezept australische Maße verwendet.",
              "type": "warning"
            },
            {
              "text": "1 US-Esslöffel = 3 US-Teelöffel. 1 US-Tasse = 16 Esslöffel. Diese Verhältnisse sind im US-System konsistent.",
              "type": "info"
            },
            {
              "text": "Für Medikamentendosierung verwenden Sie immer den metrischen Esslöffel (15 mL) oder das mitgelieferte Dosiergerät. Niemals Küchenlöffel für Medikamente verwenden.",
              "type": "warning"
            }
          ]
        },
        "categories": {
          "title": "Gängige Koch-Umrechnungen",
          "items": [
            {
              "text": "½ Esslöffel = 1½ Teelöffel = ~7,4 mL. Oft benötigt zum Halbieren von Rezepten, die 1 Esslöffel verlangen.",
              "type": "info"
            },
            {
              "text": "1 Esslöffel = 3 Teelöffel = ~14,8 mL (US). Das grundlegende Esslöffel-zu-Teelöffel-Verhältnis.",
              "type": "info"
            },
            {
              "text": "2 Esslöffel = 1 Flüssigunze = ~29,6 mL. Nützlich bei der Umrechnung zwischen Volumen und Gewicht für Flüssigkeiten.",
              "type": "info"
            },
            {
              "text": "4 Esslöffel = ¼ Tasse = ~59,1 mL. Gängiges Maß beim Backen (Butter, Zucker, Mehl).",
              "type": "info"
            },
            {
              "text": "8 Esslöffel = ½ Tasse = ~118,3 mL. Eine weitere kritische Back-Umrechnung zum Wissen.",
              "type": "info"
            },
            {
              "text": "16 Esslöffel = 1 Tasse = ~236,6 mL. Vollständige Tassenentsprechung in Esslöffeln.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Umrechnungsbeispiele",
          "description": "Schritt-für-Schritt Esslöffel zu mL Umrechnungen",
          "examples": [
            {
              "title": "2,5 US-Esslöffel in mL umrechnen",
              "steps": [
                "2,5 × 14,787 = 36,97 mL",
                "Entspricht auch 7,5 Teelöffeln",
                "Entspricht auch ~1,25 Flüssigunzen"
              ],
              "result": "2,5 US EL = 36,97 mL"
            },
            {
              "title": "3 australische Esslöffel in mL umrechnen",
              "steps": [
                "3 × 20 = 60 mL",
                "Entspricht ~4,06 US-Esslöffeln",
                "Fast ¼ Tasse (US)"
              ],
              "result": "3 australische EL = 60 mL"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Wie viele mL hat ein Esslöffel?",
          "answer": "Das hängt vom Standard ab: ein US-Esslöffel ist 14,787 mL, ein metrischer Esslöffel ist genau 15 mL, ein UK-Esslöffel ist 17,758 mL und ein australischer Esslöffel ist 20 mL. Für die meisten Kochzwecke ist die Verwendung von 15 mL pro Esslöffel genau genug."
        },
        {
          "question": "Ist ein Esslöffel 15 mL oder 20 mL?",
          "answer": "Ein metrischer Esslöffel ist 15 mL, was der internationale Standard ist. Ein australischer Esslöffel ist 20 mL. Wenn Sie einem australischen Rezept folgen, verwenden Sie 20 mL pro Esslöffel. Für Rezepte aus den meisten anderen Ländern verwenden Sie 15 mL."
        },
        {
          "question": "Wie viele Teelöffel sind in einem Esslöffel?",
          "answer": "Im US-System ist 1 Esslöffel = genau 3 Teelöffel. Das ist bei US-, metrischen und UK-Standards konsistent. Ein australischer Esslöffel entspricht 4 australischen Teelöffeln (je 5 mL)."
        },
        {
          "question": "Kann ich einen normalen Löffel als Esslöffel verwenden?",
          "answer": "Nicht genau. Normale Esslöffel variieren stark in der Größe und fassen typisch 10-20 mL. Zum Kochen verwenden Sie richtige Messlöffel. Für Medikamentendosierung verwenden Sie immer das mitgelieferte Dosiergerät, da ungenaue Dosen schädlich sein können."
        },
        {
          "question": "Wie rechne ich Esslöffel in Tassen um?",
          "answer": "Teilen Sie die Anzahl der Esslöffel durch 16, um US-Tassen zu erhalten. Zum Beispiel: 6 Esslöffel ÷ 16 = 0,375 Tassen (⅜ Tasse). Wichtige Richtwerte: 4 EL = ¼ Tasse, 8 EL = ½ Tasse, 12 EL = ¾ Tasse, 16 EL = 1 Tasse."
        },
        {
          "question": "Warum sind australische Esslöffel anders?",
          "answer": "Als Australien in den 1970ern das metrische System einführte, definierten sie den Esslöffel als 20 mL (4 Teelöffel à 5 mL) für einfache metrische Mathematik. Die meisten anderen Länder nahmen 15 mL an (3 Teelöffel à 5 mL). Das bedeutet, australische Rezepte verwenden etwa 33% mehr pro Esslöffel — wichtig zu wissen beim Kochen aus australischen Quellen."
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
      id: "tbspValue",
      type: "number",
      defaultValue: null,
      placeholder: "2",
      min: 0.01,
      max: 500,
      step: 0.25,
      suffix: "tbsp",
    },
    {
      id: "tbspStandard",
      type: "select",
      defaultValue: "us",
      options: [
        { value: "us" },
        { value: "metric" },
        { value: "uk" },
        { value: "australian" },
      ],
    },
  ],

  inputGroups: [],

  results: [
    { id: "milliliters", type: "primary", format: "number" },
    { id: "teaspoons", type: "secondary", format: "number" },
    { id: "fluidOunces", type: "secondary", format: "number" },
    { id: "cups", type: "secondary", format: "number" },
  ],

  infoCards: [
    { id: "conversions", type: "list", icon: "🥄", itemCount: 4 },
    { id: "quickRef", type: "list", icon: "📊", itemCount: 4 },
    { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  referenceData: [],

  educationSections: [
    { id: "whatIs", type: "prose", icon: "📖" },
    { id: "howItWorks", type: "prose", icon: "⚙️" },
    { id: "considerations", type: "list", icon: "📋", itemCount: 6 },
    { id: "categories", type: "list", icon: "📊", itemCount: 6 },
    { id: "examples", type: "code-example", icon: "🧮", columns: 2, exampleCount: 2 },
  ],

  faqs: [{ id: "0" }, { id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }],

  references: [
    { authors: "National Institute of Standards and Technology", year: "2024", title: "NIST Handbook 133 – Checking the Net Contents of Packaged Goods", source: "NIST", url: "https://www.nist.gov/pml/owm/handbook-133-current-edition" },
    { authors: "U.S. Food and Drug Administration", year: "2024", title: "Guidance for Industry: Nutrition Labeling Manual", source: "FDA", url: "https://www.fda.gov/" },
  ],

  hero: { icon: "🥄", label: "Conversion" },
  sidebar: { showRelated: true, showPopular: true },
  features: { saveResults: true, pdfExport: true, sharing: true },
  relatedCalculators: ["oz-to-ml-calculator", "cups-to-ml-calculator", "gallons-to-liters-calculator"],
  ads: { showSidebar: true, showBetweenSections: true },
};

// ─── Calculate ───────────────────────────────────────────────────────────────

export function calculateTablespoonToMlConverter(data: {
  values: Record<string, unknown>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, t } = data;
  const v = (t?.values as Record<string, string>) || {};

  const tbsp = values.tbspValue as number | null;
  if (tbsp === null || tbsp <= 0) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  const standard = (values.tbspStandard as string) || "us";

  const ML_PER_TBSP: Record<string, number> = {
    us: 14.7868,
    metric: 15,
    uk: 17.7582,
    australian: 20,
  };

  const factor = ML_PER_TBSP[standard] || 14.7868;
  const ml = tbsp * factor;
  const tsp = tbsp * 3; // 3 tsp per tbsp (US/metric/UK)
  const floz = ml / 29.5735;
  const cups = tbsp / 16;

  const mlUnit = v["ml"] || "mL";
  const tspUnit = v["tsp"] || "tsp";
  const flozUnit = v["floz"] || "fl oz";

  const fmtMl = (val: number) =>
    val < 10 ? val.toFixed(2) : val.toFixed(1);

  // Quick ref (always US standard for consistency)
  const ref = (n: number) => `${(n * 14.7868).toFixed(1)} ${mlUnit}`;

  const f = (t?.formats as Record<string, string>) || {};
  const summary = f.summary
    ?.replace("{tbsp}", tbsp.toString())
    .replace("{ml}", fmtMl(ml))
    .replace("{tsp}", tsp.toFixed(1)) || "";

  return {
    values: {
      milliliters: Math.round(ml * 100) / 100,
      teaspoons: Math.round(tsp * 10) / 10,
      fluidOunces: Math.round(floz * 1000) / 1000,
      cups: Math.round(cups * 1000) / 1000,
      ref1: ref(1),
      ref2: ref(2),
      ref4: ref(4),
      ref8: ref(8),
    },
    formatted: {
      milliliters: `${fmtMl(ml)} ${mlUnit}`,
      teaspoons: `${tsp.toFixed(1)} ${tspUnit}`,
      fluidOunces: `${floz.toFixed(2)} ${flozUnit}`,
      cups: cups >= 0.25 ? `${cups.toFixed(2)} cups` : `${(cups * 16).toFixed(1)} tbsp`,
      ref1: ref(1),
      ref2: ref(2),
      ref4: `${(4 * 14.7868).toFixed(1)} ${mlUnit} (¼ cup)`,
      ref8: `${(8 * 14.7868).toFixed(1)} ${mlUnit} (½ cup)`,
    },
    summary,
    isValid: true,
  };
}

export default tablespoonToMlConverterConfig;
