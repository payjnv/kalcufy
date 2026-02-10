import type {
  CalculatorConfigV4,
  CalculatorResults,
} from "@/engine/v4/types/engine.types";

export const pintsToLitersConverterConfig: CalculatorConfigV4 = {
  id: "pints-to-liters-converter",
  version: "4.0",
  category: "conversion",
  icon: "🍺",

  presets: [
    { id: "one", icon: "🥛", values: { pintValue: 1 } },
    { id: "two", icon: "🍺", values: { pintValue: 2 } },
    { id: "half", icon: "🫗", values: { pintValue: 0.5 } },
    { id: "six", icon: "🍻", values: { pintValue: 6 } },
  ],

  t: {
    en: {
      name: "Pints to Liters Converter",
      slug: "pints-to-liters-converter",
      subtitle:
        "Convert pints to liters instantly — supports both US and UK (Imperial) pint standards for cooking, beverages, and daily use.",
      breadcrumb: "Pints to Liters",

      seo: {
        title: "Pints to Liters Converter - US & UK Pints | Free Tool",
        description:
          "Convert pints to liters instantly. Supports US pints (473 mL) and UK Imperial pints (568 mL) with a quick reference table for common volumes in cooking and beverages.",
        shortDescription: "Convert US and UK pints to liters with a reference table.",
        keywords: [
          "pints to liters",
          "pint to liter converter",
          "how many liters in a pint",
          "pint to litres",
          "us pint to liters",
          "uk pint to liters",
          "imperial pint to liters",
          "pint converter",
        ],
      },

      calculator: { yourInformation: "Enter Volume" },
      ui: { yourInformation: "Enter Volume", calculate: "Convert", reset: "Reset", results: "Results" },

      inputs: {
        pintValue: {
          label: "Pints",
          helpText: "Enter the number of pints to convert to liters",
        },
        pintStandard: {
          label: "Pint Standard",
          helpText: "US pint = 473.176 mL. UK (Imperial) pint = 568.261 mL. The UK pint is 20% larger",
          options: {
            us: "US Pint (473 mL)",
            uk: "UK / Imperial Pint (568 mL)",
          },
        },
      },

      results: {
        liters: { label: "Liters" },
        milliliters: { label: "Milliliters" },
        cups: { label: "Cups" },
        fluidOunces: { label: "Fluid Ounces" },
        gallons: { label: "Gallons" },
      },

      presets: {
        one: { label: "1 Pint", description: "~0.473 L (US)" },
        two: { label: "2 Pints", description: "~0.946 L (US) ≈ 1 quart" },
        half: { label: "½ Pint", description: "~0.237 L (US) = 1 cup" },
        six: { label: "6 Pints", description: "~2.84 L (US)" },
      },

      values: { l: "L", ml: "mL", cups: "cups", floz: "fl oz", gal: "gal", pt: "pt" },

      formats: {
        summary: "{pint} pints = {liters} liters ({ml} mL)",
      },

      infoCards: {
        conversions: {
          title: "Conversion Results",
          items: [
            { label: "Liters", valueKey: "liters" },
            { label: "Milliliters", valueKey: "milliliters" },
            { label: "Cups", valueKey: "cups" },
            { label: "Fluid Ounces", valueKey: "fluidOunces" },
          ],
        },
        quickRef: {
          title: "Quick Reference",
          items: [
            { label: "1 US pint", valueKey: "ref1us" },
            { label: "1 UK pint", valueKey: "ref1uk" },
            { label: "4 US pints", valueKey: "ref4us" },
            { label: "8 US pints", valueKey: "ref8us" },
          ],
        },
        tips: {
          title: "Good to Know",
          items: [
            "A UK pint is 20% larger than a US pint. If you order a pint of beer in London, you get 568 mL — in New York, only 473 mL. Always check which pint standard a recipe uses.",
            "2 US pints = 1 quart. 4 quarts = 1 gallon. So 8 pints = 1 US gallon (3.785 liters). These relationships are consistent within the US system.",
            "In most countries outside the US and UK, the liter is the standard unit for liquid volume. A liter is slightly more than 2 US pints (2.11 pints).",
            "For cooking: 1 US pint = 2 cups = 16 fluid ounces. This makes halving and doubling recipes straightforward when working with pint measurements.",
          ],
        },
      },

      education: {
        whatIs: {
          title: "What Is a Pint?",
          content:
            "A pint is a unit of liquid volume used primarily in the United States and the United Kingdom, though the two countries define it differently. The US pint equals 473.176 mL (approximately 0.473 liters), while the UK Imperial pint is larger at 568.261 mL (approximately 0.568 liters) — a 20% difference. This discrepancy dates back to 1824 when the British Imperial system was standardized differently from the American customary system, which retained an older English wine gallon definition. In everyday life, pints are used for beverages (especially beer and milk), cooking recipes, and measuring berries and other produce. The liter, used by most of the world, provides a universal standard: 1 liter = 2.113 US pints or 1.760 UK pints. Understanding this conversion is essential for international cooking, traveling, and following recipes from different countries.",
        },
        howItWorks: {
          title: "How to Convert Pints to Liters",
          content:
            "For US pints, multiply by 0.473176 to get liters. For UK Imperial pints, multiply by 0.568261. For example, 3 US pints = 3 × 0.473176 = 1.419 liters. To convert liters back to pints, divide by the same factor: 2 liters ÷ 0.473176 = 4.227 US pints. For quick mental math with US pints, remember that 2 pints ≈ 1 liter (actually 0.946 L, so about 5% under). For UK pints, think of each pint as just over half a liter (0.568 L). The key relationship to remember: 1 US gallon = 8 US pints = 3.785 liters, and 1 UK gallon = 8 UK pints = 4.546 liters.",
        },
        considerations: {
          title: "Pint Standards & Facts",
          items: [
            { text: "US pint = 473.176 mL = 16 US fluid ounces = 2 US cups. This is the standard in American cookbooks and recipes.", type: "info" },
            { text: "UK Imperial pint = 568.261 mL = 20 UK fluid ounces. Note that a UK fluid ounce (28.413 mL) is also different from a US fluid ounce (29.574 mL).", type: "info" },
            { text: "The UK pint is 20% larger than the US pint. A 'pint of beer' in London contains significantly more than in New York.", type: "warning" },
            { text: "Canada officially uses the metric system but the Imperial pint (568 mL) is still the legal measure for draft beer served in bars.", type: "info" },
            { text: "In Australia and New Zealand, a 'pint' of beer is actually 570 mL — practically identical to the UK Imperial pint, even though these countries are fully metric.", type: "info" },
            { text: "For cooking: 1 US pint of water weighs approximately 1.043 pounds (473 grams). 1 UK pint of water weighs approximately 1.25 pounds (568 grams).", type: "info" },
          ],
        },
        categories: {
          title: "Common Volumes in Pints & Liters",
          items: [
            { text: "½ US pint = 1 cup = 237 mL. The basic cup measurement in American cooking.", type: "info" },
            { text: "1 US pint = 473 mL ≈ 0.47 L. A standard US beer serving or measuring cup.", type: "info" },
            { text: "2 US pints = 1 quart = 946 mL ≈ 0.95 L. Nearly 1 liter — useful for approximation.", type: "info" },
            { text: "1 UK pint = 568 mL ≈ 0.57 L. The standard British beer glass and milk measure.", type: "info" },
            { text: "4 US pints = ½ gallon = 1.89 L. A common milk container size in the US.", type: "info" },
            { text: "8 US pints = 1 gallon = 3.79 L. The standard US gallon, used for milk, fuel, and large volumes.", type: "info" },
          ],
        },
        examples: {
          title: "Conversion Examples",
          description: "Step-by-step pint to liter conversions",
          examples: [
            {
              title: "Convert 3 US pints to liters",
              steps: [
                "3 × 0.473176 = 1.4195 liters",
                "Also equals 1,419.5 mL",
                "Also equals 6 US cups",
                "Also equals 48 US fluid ounces",
              ],
              result: "3 US pints = 1.42 liters",
            },
            {
              title: "Convert 2 UK pints to liters",
              steps: [
                "2 × 0.568261 = 1.1365 liters",
                "Also equals 1,136.5 mL",
                "Also equals 40 UK fluid ounces",
                "Note: same 2 pints in US = only 0.946 L",
              ],
              result: "2 UK pints = 1.14 liters",
            },
          ],
        },
      },

      faqs: [
        { question: "How many liters is 1 pint?", answer: "1 US pint = 0.473 liters (473 mL). 1 UK Imperial pint = 0.568 liters (568 mL). The UK pint is about 20% larger than the US pint. For quick estimation, remember that 2 US pints is close to 1 liter (actually 0.946 L)." },
        { question: "Is a US pint the same as a UK pint?", answer: "No. A US pint is 473 mL (16 US fl oz), while a UK Imperial pint is 568 mL (20 UK fl oz). The UK pint is 20% larger. This difference dates to 1824 when Britain redefined its gallon based on the weight of water, while the US kept the older English wine gallon definition." },
        { question: "How many pints in a liter?", answer: "There are 2.113 US pints in 1 liter, or 1.760 UK Imperial pints in 1 liter. For a quick approximation, think of a liter as 'just over 2 US pints' or 'just under 2 UK pints'." },
        { question: "How many cups in a pint?", answer: "1 US pint = 2 US cups exactly (each cup = 236.6 mL). In the UK system, 1 Imperial pint = 2.27 US cups. The cup is not officially used in the UK, but when referenced it typically means 284 mL (½ Imperial pint), giving exactly 2 UK cups per pint." },
        { question: "How do I convert a recipe from pints to liters?", answer: "First determine whether the recipe uses US or UK pints (US is more common in American cookbooks, UK in British ones). Multiply US pints by 0.473 or UK pints by 0.568 to get liters. For rough cooking estimates, simply halve the pint value — 4 pints ≈ 2 liters. For baking where precision matters, use the exact conversion." },
        { question: "Why is a pint of beer different in the US and UK?", answer: "The difference traces back to the early 19th century when Britain and the US standardized their measurement systems independently. The US kept the English wine gallon (231 cubic inches), making the US pint 473 mL. Britain adopted the Imperial gallon based on 10 pounds of water (277.4 cubic inches), making the Imperial pint 568 mL. Many British visitors to the US are disappointed by the smaller 'pint' served in American bars." },
      ],

      rating: { title: "Rate this Calculator", share: "Share", copied: "Copied!", copyLink: "Copy Link", clickToRate: "Click to rate", youRated: "You rated", stars: "stars", averageFrom: "average from", ratings: "ratings" },
      common: { home: "Home", calculators: "Calculators" },
      buttons: { calculate: "Convert", reset: "Reset", pdf: "PDF", csv: "CSV", excel: "Excel", save: "Save", saved: "Saved", saving: "Saving..." },
      share: { calculatedWith: "Calculated with Kalcufy.com" },
      accessibility: { mobileResults: "Results", closeModal: "Close", openMenu: "Menu" },
      sources: { title: "Sources & References" },
    },
    es: {
      "name": "Conversor de Pintas a Litros",
      "slug": "calculadora-conversor-pintas-litros",
      "subtitle": "Convierte pintas a litros instantáneamente — compatible con estándares de pinta estadounidense e inglesa (Imperial) para cocina, bebidas y uso diario.",
      "breadcrumb": "Pintas a Litros",
      "seo": {
        "title": "Conversor de Pintas a Litros - Pintas EE.UU. e Inglaterra | Herramienta Gratuita",
        "description": "Convierte pintas a litros instantáneamente. Compatible con pintas estadounidenses (473 mL) e inglesas imperiales (568 mL) con tabla de referencia rápida para volúmenes comunes en cocina y bebidas.",
        "shortDescription": "Convierte pintas estadounidenses e inglesas a litros con tabla de referencia.",
        "keywords": [
          "pintas a litros",
          "conversor pinta a litro",
          "cuántos litros en una pinta",
          "pinta a litros",
          "pinta estadounidense a litros",
          "pinta inglesa a litros",
          "pinta imperial a litros",
          "conversor de pintas"
        ]
      },
      "calculator": {
        "yourInformation": "Tu Información"
      },
      "inputs": {
        "pintValue": {
          "label": "Pintas",
          "helpText": "Ingrese el número de pintas para convertir a litros"
        },
        "pintStandard": {
          "label": "Estándar de Pinta",
          "helpText": "Pinta EE.UU. = 473.176 mL. Pinta Inglaterra (Imperial) = 568.261 mL. La pinta inglesa es 20% más grande",
          "options": {
            "us": "Pinta EE.UU. (473 mL)",
            "uk": "Pinta Inglaterra / Imperial (568 mL)"
          }
        }
      },
      "results": {
        "liters": {
          "label": "Litros"
        },
        "milliliters": {
          "label": "Mililitros"
        },
        "cups": {
          "label": "Tazas"
        },
        "fluidOunces": {
          "label": "Onzas Líquidas"
        },
        "gallons": {
          "label": "Galones"
        }
      },
      "presets": {
        "one": {
          "label": "1 Pinta",
          "description": "~0.473 L (EE.UU.)"
        },
        "two": {
          "label": "2 Pintas",
          "description": "~0.946 L (EE.UU.) ≈ 1 cuarto"
        },
        "half": {
          "label": "½ Pinta",
          "description": "~0.237 L (EE.UU.) = 1 taza"
        },
        "six": {
          "label": "6 Pintas",
          "description": "~2.84 L (EE.UU.)"
        }
      },
      "values": {
        "l": "L",
        "ml": "mL",
        "cups": "tazas",
        "floz": "oz líq",
        "gal": "gal",
        "pt": "pt"
      },
      "formats": {
        "summary": "{pint} pintas = {liters} litros ({ml} mL)"
      },
      "infoCards": {
        "conversions": {
          "title": "Resultados de Conversión",
          "items": [
            {
              "label": "Litros",
              "valueKey": "liters"
            },
            {
              "label": "Mililitros",
              "valueKey": "milliliters"
            },
            {
              "label": "Tazas",
              "valueKey": "cups"
            },
            {
              "label": "Onzas Líquidas",
              "valueKey": "fluidOunces"
            }
          ]
        },
        "quickRef": {
          "title": "Referencia Rápida",
          "items": [
            {
              "label": "1 pinta EE.UU.",
              "valueKey": "ref1us"
            },
            {
              "label": "1 pinta Inglaterra",
              "valueKey": "ref1uk"
            },
            {
              "label": "4 pintas EE.UU.",
              "valueKey": "ref4us"
            },
            {
              "label": "8 pintas EE.UU.",
              "valueKey": "ref8us"
            }
          ]
        },
        "tips": {
          "title": "Bueno Saber",
          "items": [
            "Una pinta inglesa es 20% más grande que una pinta estadounidense. Si pides una pinta de cerveza en Londres, obtienes 568 mL — en Nueva York, solo 473 mL. Siempre verifica qué estándar de pinta usa una receta.",
            "2 pintas EE.UU. = 1 cuarto. 4 cuartos = 1 galón. Entonces 8 pintas = 1 galón estadounidense (3.785 litros). Estas relaciones son consistentes dentro del sistema estadounidense.",
            "En la mayoría de países fuera de EE.UU. e Inglaterra, el litro es la unidad estándar para volumen líquido. Un litro es un poco más que 2 pintas estadounidenses (2.11 pintas).",
            "Para cocinar: 1 pinta EE.UU. = 2 tazas = 16 onzas líquidas. Esto facilita dividir a la mitad y duplicar recetas cuando se trabaja con medidas de pintas."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "¿Qué es una Pinta?",
          "content": "Una pinta es una unidad de volumen líquido usada principalmente en Estados Unidos y Reino Unido, aunque ambos países la definen de manera diferente. La pinta estadounidense equivale a 473.176 mL (aproximadamente 0.473 litros), mientras que la pinta imperial inglesa es más grande con 568.261 mL (aproximadamente 0.568 litros) — una diferencia del 20%. Esta discrepancia se remonta a 1824 cuando el sistema imperial británico se estandarizó de manera diferente al sistema consuetudinario estadounidense, que mantuvo una definición más antigua del galón inglés de vino. En la vida cotidiana, las pintas se usan para bebidas (especialmente cerveza y leche), recetas de cocina y medir bayas y otros productos. El litro, usado por la mayoría del mundo, proporciona un estándar universal: 1 litro = 2.113 pintas estadounidenses o 1.760 pintas inglesas. Entender esta conversión es esencial para cocina internacional, viajar y seguir recetas de diferentes países."
        },
        "howItWorks": {
          "title": "Cómo Convertir Pintas a Litros",
          "content": "Para pintas estadounidenses, multiplica por 0.473176 para obtener litros. Para pintas imperiales inglesas, multiplica por 0.568261. Por ejemplo, 3 pintas EE.UU. = 3 × 0.473176 = 1.419 litros. Para convertir litros de vuelta a pintas, divide por el mismo factor: 2 litros ÷ 0.473176 = 4.227 pintas estadounidenses. Para cálculo mental rápido con pintas estadounidenses, recuerda que 2 pintas ≈ 1 litro (en realidad 0.946 L, aproximadamente 5% menos). Para pintas inglesas, piensa en cada pinta como poco más de medio litro (0.568 L). La relación clave para recordar: 1 galón estadounidense = 8 pintas estadounidenses = 3.785 litros, y 1 galón inglés = 8 pintas inglesas = 4.546 litros."
        },
        "considerations": {
          "title": "Estándares de Pintas y Datos",
          "items": [
            {
              "text": "Pinta EE.UU. = 473.176 mL = 16 onzas líquidas estadounidenses = 2 tazas estadounidenses. Este es el estándar en libros de cocina y recetas estadounidenses.",
              "type": "info"
            },
            {
              "text": "Pinta imperial inglesa = 568.261 mL = 20 onzas líquidas inglesas. Nota que una onza líquida inglesa (28.413 mL) también es diferente de una onza líquida estadounidense (29.574 mL).",
              "type": "info"
            },
            {
              "text": "La pinta inglesa es 20% más grande que la pinta estadounidense. Una 'pinta de cerveza' en Londres contiene significativamente más que en Nueva York.",
              "type": "warning"
            },
            {
              "text": "Canadá usa oficialmente el sistema métrico pero la pinta imperial (568 mL) sigue siendo la medida legal para cerveza de barril servida en bares.",
              "type": "info"
            },
            {
              "text": "En Australia y Nueva Zelanda, una 'pinta' de cerveza es en realidad 570 mL — prácticamente idéntica a la pinta imperial inglesa, aunque estos países son completamente métricos.",
              "type": "info"
            },
            {
              "text": "Para cocinar: 1 pinta estadounidense de agua pesa aproximadamente 1.043 libras (473 gramos). 1 pinta inglesa de agua pesa aproximadamente 1.25 libras (568 gramos).",
              "type": "info"
            }
          ]
        },
        "categories": {
          "title": "Volúmenes Comunes en Pintas y Litros",
          "items": [
            {
              "text": "½ pinta EE.UU. = 1 taza = 237 mL. La medida básica de taza en cocina estadounidense.",
              "type": "info"
            },
            {
              "text": "1 pinta EE.UU. = 473 mL ≈ 0.47 L. Una porción estándar de cerveza estadounidense o taza de medir.",
              "type": "info"
            },
            {
              "text": "2 pintas EE.UU. = 1 cuarto = 946 mL ≈ 0.95 L. Casi 1 litro — útil para aproximación.",
              "type": "info"
            },
            {
              "text": "1 pinta inglesa = 568 mL ≈ 0.57 L. El vaso estándar británico de cerveza y medida de leche.",
              "type": "info"
            },
            {
              "text": "4 pintas EE.UU. = ½ galón = 1.89 L. Un tamaño común de contenedor de leche en EE.UU.",
              "type": "info"
            },
            {
              "text": "8 pintas EE.UU. = 1 galón = 3.79 L. El galón estadounidense estándar, usado para leche, combustible y grandes volúmenes.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Ejemplos de Conversión",
          "description": "Conversiones paso a paso de pintas a litros",
          "examples": [
            {
              "title": "Convertir 3 pintas estadounidenses a litros",
              "steps": [
                "3 × 0.473176 = 1.4195 litros",
                "También equivale a 1,419.5 mL",
                "También equivale a 6 tazas estadounidenses",
                "También equivale a 48 onzas líquidas estadounidenses"
              ],
              "result": "3 pintas EE.UU. = 1.42 litros"
            },
            {
              "title": "Convertir 2 pintas inglesas a litros",
              "steps": [
                "2 × 0.568261 = 1.1365 litros",
                "También equivale a 1,136.5 mL",
                "También equivale a 40 onzas líquidas inglesas",
                "Nota: las mismas 2 pintas en EE.UU. = solo 0.946 L"
              ],
              "result": "2 pintas inglesas = 1.14 litros"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "¿Cuántos litros es 1 pinta?",
          "answer": "1 pinta estadounidense = 0.473 litros (473 mL). 1 pinta imperial inglesa = 0.568 litros (568 mL). La pinta inglesa es aproximadamente 20% más grande que la pinta estadounidense. Para estimación rápida, recuerda que 2 pintas estadounidenses es cerca de 1 litro (en realidad 0.946 L)."
        },
        {
          "question": "¿Es igual una pinta estadounidense a una pinta inglesa?",
          "answer": "No. Una pinta estadounidense es 473 mL (16 oz líq EE.UU.), mientras que una pinta imperial inglesa es 568 mL (20 oz líq Inglaterra). La pinta inglesa es 20% más grande. Esta diferencia se remonta a 1824 cuando Gran Bretaña redefinió su galón basado en el peso del agua, mientras que EE.UU. mantuvo la definición más antigua del galón inglés de vino."
        },
        {
          "question": "¿Cuántas pintas hay en un litro?",
          "answer": "Hay 2.113 pintas estadounidenses en 1 litro, o 1.760 pintas imperiales inglesas en 1 litro. Para una aproximación rápida, piensa en un litro como 'un poco más de 2 pintas estadounidenses' o 'un poco menos de 2 pintas inglesas'."
        },
        {
          "question": "¿Cuántas tazas hay en una pinta?",
          "answer": "1 pinta estadounidense = 2 tazas estadounidenses exactamente (cada taza = 236.6 mL). En el sistema inglés, 1 pinta imperial = 2.27 tazas estadounidenses. La taza no se usa oficialmente en Reino Unido, pero cuando se referencia típicamente significa 284 mL (½ pinta imperial), dando exactamente 2 tazas inglesas por pinta."
        },
        {
          "question": "¿Cómo convierto una receta de pintas a litros?",
          "answer": "Primero determina si la receta usa pintas estadounidenses o inglesas (estadounidenses es más común en libros de cocina americanos, inglesas en británicos). Multiplica pintas estadounidenses por 0.473 o pintas inglesas por 0.568 para obtener litros. Para estimaciones aproximadas de cocina, simplemente divide el valor de pintas a la mitad — 4 pintas ≈ 2 litros. Para repostería donde la precisión importa, usa la conversión exacta."
        },
        {
          "question": "¿Por qué es diferente una pinta de cerveza en EE.UU. e Inglaterra?",
          "answer": "La diferencia se remonta al siglo XIX temprano cuando Gran Bretaña y EE.UU. estandarizaron sus sistemas de medida independientemente. EE.UU. mantuvo el galón inglés de vino (231 pulgadas cúbicas), haciendo la pinta estadounidense 473 mL. Gran Bretaña adoptó el galón imperial basado en 10 libras de agua (277.4 pulgadas cúbicas), haciendo la pinta imperial 568 mL. Muchos visitantes británicos a EE.UU. se decepcionan por la 'pinta' más pequeña servida en bares estadounidenses."
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
      "name": "Conversor de Pints para Litros",
      "slug": "calculadora-conversor-pints-litros",
      "subtitle": "Converta pints para litros instantaneamente — suporta padrões de pint americanos e britânicos (Imperial) para culinária, bebidas e uso diário.",
      "breadcrumb": "Pints para Litros",
      "seo": {
        "title": "Conversor Pints para Litros - Pints EUA & Reino Unido | Ferramenta Gratuita",
        "description": "Converta pints para litros instantaneamente. Suporta pints americanos (473 mL) e pints britânicos Imperial (568 mL) com tabela de referência rápida para volumes comuns na culinária e bebidas.",
        "shortDescription": "Converta pints americanos e britânicos para litros com tabela de referência.",
        "keywords": [
          "pints para litros",
          "conversor pint para litro",
          "quantos litros tem um pint",
          "pint para litros",
          "pint americano para litros",
          "pint britânico para litros",
          "pint imperial para litros",
          "conversor de pint"
        ]
      },
      "calculator": {
        "yourInformation": "Suas Informações"
      },
      "inputs": {
        "pintValue": {
          "label": "Pints",
          "helpText": "Insira o número de pints para converter para litros"
        },
        "pintStandard": {
          "label": "Padrão de Pint",
          "helpText": "Pint americano = 473,176 mL. Pint britânico (Imperial) = 568,261 mL. O pint britânico é 20% maior",
          "options": {
            "us": "Pint Americano (473 mL)",
            "uk": "Pint Britânico / Imperial (568 mL)"
          }
        }
      },
      "results": {
        "liters": {
          "label": "Litros"
        },
        "milliliters": {
          "label": "Mililitros"
        },
        "cups": {
          "label": "Xícaras"
        },
        "fluidOunces": {
          "label": "Onças Fluidas"
        },
        "gallons": {
          "label": "Galões"
        }
      },
      "presets": {
        "one": {
          "label": "1 Pint",
          "description": "~0,473 L (EUA)"
        },
        "two": {
          "label": "2 Pints",
          "description": "~0,946 L (EUA) ≈ 1 quarto"
        },
        "half": {
          "label": "½ Pint",
          "description": "~0,237 L (EUA) = 1 xícara"
        },
        "six": {
          "label": "6 Pints",
          "description": "~2,84 L (EUA)"
        }
      },
      "values": {
        "l": "L",
        "ml": "mL",
        "cups": "xícaras",
        "floz": "fl oz",
        "gal": "gal",
        "pt": "pt"
      },
      "formats": {
        "summary": "{pint} pints = {liters} litros ({ml} mL)"
      },
      "infoCards": {
        "conversions": {
          "title": "Resultados da Conversão",
          "items": [
            {
              "label": "Litros",
              "valueKey": "liters"
            },
            {
              "label": "Mililitros",
              "valueKey": "milliliters"
            },
            {
              "label": "Xícaras",
              "valueKey": "cups"
            },
            {
              "label": "Onças Fluidas",
              "valueKey": "fluidOunces"
            }
          ]
        },
        "quickRef": {
          "title": "Referência Rápida",
          "items": [
            {
              "label": "1 pint americano",
              "valueKey": "ref1us"
            },
            {
              "label": "1 pint britânico",
              "valueKey": "ref1uk"
            },
            {
              "label": "4 pints americanos",
              "valueKey": "ref4us"
            },
            {
              "label": "8 pints americanos",
              "valueKey": "ref8us"
            }
          ]
        },
        "tips": {
          "title": "Bom Saber",
          "items": [
            "Um pint britânico é 20% maior que um pint americano. Se você pedir um pint de cerveja em Londres, receberá 568 mL — em Nova York, apenas 473 mL. Sempre verifique qual padrão de pint uma receita usa.",
            "2 pints americanos = 1 quarto. 4 quartos = 1 galão. Então 8 pints = 1 galão americano (3,785 litros). Essas relações são consistentes dentro do sistema americano.",
            "Na maioria dos países fora dos EUA e Reino Unido, o litro é a unidade padrão para volume líquido. Um litro é ligeiramente mais que 2 pints americanos (2,11 pints).",
            "Para culinária: 1 pint americano = 2 xícaras = 16 onças fluidas. Isso facilita dividir pela metade e dobrar receitas ao trabalhar com medidas em pint."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "O que é um Pint?",
          "content": "Um pint é uma unidade de volume líquido usada principalmente nos Estados Unidos e no Reino Unido, embora os dois países o definam de forma diferente. O pint americano equivale a 473,176 mL (aproximadamente 0,473 litros), enquanto o pint Imperial britânico é maior, com 568,261 mL (aproximadamente 0,568 litros) — uma diferença de 20%. Essa discrepância remonta a 1824, quando o sistema Imperial britânico foi padronizado de forma diferente do sistema consuetudinário americano, que manteve uma definição mais antiga do galão inglês de vinho. No dia a dia, pints são usados para bebidas (especialmente cerveja e leite), receitas culinárias e medição de frutas vermelhas e outros produtos. O litro, usado pela maior parte do mundo, fornece um padrão universal: 1 litro = 2,113 pints americanos ou 1,760 pints britânicos. Entender essa conversão é essencial para culinária internacional, viagens e seguir receitas de diferentes países."
        },
        "howItWorks": {
          "title": "Como Converter Pints para Litros",
          "content": "Para pints americanos, multiplique por 0,473176 para obter litros. Para pints Imperial britânicos, multiplique por 0,568261. Por exemplo, 3 pints americanos = 3 × 0,473176 = 1,419 litros. Para converter litros de volta para pints, divida pelo mesmo fator: 2 litros ÷ 0,473176 = 4,227 pints americanos. Para cálculo mental rápido com pints americanos, lembre-se que 2 pints ≈ 1 litro (na verdade 0,946 L, então cerca de 5% menos). Para pints britânicos, pense em cada pint como pouco mais da metade de um litro (0,568 L). A relação principal para lembrar: 1 galão americano = 8 pints americanos = 3,785 litros, e 1 galão britânico = 8 pints britânicos = 4,546 litros."
        },
        "considerations": {
          "title": "Padrões de Pint e Fatos",
          "items": [
            {
              "text": "Pint americano = 473,176 mL = 16 onças fluidas americanas = 2 xícaras americanas. Este é o padrão em livros de culinária e receitas americanas.",
              "type": "info"
            },
            {
              "text": "Pint Imperial britânico = 568,261 mL = 20 onças fluidas britânicas. Note que uma onça fluida britânica (28,413 mL) também é diferente de uma onça fluida americana (29,574 mL).",
              "type": "info"
            },
            {
              "text": "O pint britânico é 20% maior que o pint americano. Um 'pint de cerveja' em Londres contém significativamente mais que em Nova York.",
              "type": "warning"
            },
            {
              "text": "O Canadá usa oficialmente o sistema métrico, mas o pint Imperial (568 mL) ainda é a medida legal para cerveja de barril servida em bares.",
              "type": "info"
            },
            {
              "text": "Na Austrália e Nova Zelândia, um 'pint' de cerveja é na verdade 570 mL — praticamente idêntico ao pint Imperial britânico, mesmo que esses países sejam totalmente métricos.",
              "type": "info"
            },
            {
              "text": "Para culinária: 1 pint americano de água pesa aproximadamente 1,043 libras (473 gramas). 1 pint britânico de água pesa aproximadamente 1,25 libras (568 gramas).",
              "type": "info"
            }
          ]
        },
        "categories": {
          "title": "Volumes Comuns em Pints e Litros",
          "items": [
            {
              "text": "½ pint americano = 1 xícara = 237 mL. A medida básica de xícara na culinária americana.",
              "type": "info"
            },
            {
              "text": "1 pint americano = 473 mL ≈ 0,47 L. Uma porção padrão de cerveja americana ou xícara de medida.",
              "type": "info"
            },
            {
              "text": "2 pints americanos = 1 quarto = 946 mL ≈ 0,95 L. Quase 1 litro — útil para aproximação.",
              "type": "info"
            },
            {
              "text": "1 pint britânico = 568 mL ≈ 0,57 L. O copo padrão de cerveja britânica e medida de leite.",
              "type": "info"
            },
            {
              "text": "4 pints americanos = ½ galão = 1,89 L. Um tamanho comum de embalagem de leite nos EUA.",
              "type": "info"
            },
            {
              "text": "8 pints americanos = 1 galão = 3,79 L. O galão americano padrão, usado para leite, combustível e grandes volumes.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemplos de Conversão",
          "description": "Conversões passo a passo de pint para litro",
          "examples": [
            {
              "title": "Converter 3 pints americanos para litros",
              "steps": [
                "3 × 0,473176 = 1,4195 litros",
                "Também equivale a 1.419,5 mL",
                "Também equivale a 6 xícaras americanas",
                "Também equivale a 48 onças fluidas americanas"
              ],
              "result": "3 pints americanos = 1,42 litros"
            },
            {
              "title": "Converter 2 pints britânicos para litros",
              "steps": [
                "2 × 0,568261 = 1,1365 litros",
                "Também equivale a 1.136,5 mL",
                "Também equivale a 40 onças fluidas britânicas",
                "Nota: os mesmos 2 pints nos EUA = apenas 0,946 L"
              ],
              "result": "2 pints britânicos = 1,14 litros"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Quantos litros tem 1 pint?",
          "answer": "1 pint americano = 0,473 litros (473 mL). 1 pint Imperial britânico = 0,568 litros (568 mL). O pint britânico é cerca de 20% maior que o pint americano. Para estimativa rápida, lembre-se que 2 pints americanos é próximo de 1 litro (na verdade 0,946 L)."
        },
        {
          "question": "O pint americano é igual ao pint britânico?",
          "answer": "Não. Um pint americano é 473 mL (16 onças fluidas americanas), enquanto um pint Imperial britânico é 568 mL (20 onças fluidas britânicas). O pint britânico é 20% maior. Essa diferença data de 1824, quando a Grã-Bretanha redefiniu seu galão baseado no peso da água, while os EUA mantiveram a definição mais antiga do galão inglês de vinho."
        },
        {
          "question": "Quantos pints tem em um litro?",
          "answer": "Há 2,113 pints americanos em 1 litro, ou 1,760 pints Imperial britânicos em 1 litro. Para uma aproximação rápida, pense em um litro como 'pouco mais de 2 pints americanos' ou 'pouco menos de 2 pints britânicos'."
        },
        {
          "question": "Quantas xícaras tem em um pint?",
          "answer": "1 pint americano = 2 xícaras americanas exatas (cada xícara = 236,6 mL). No sistema britânico, 1 pint Imperial = 2,27 xícaras americanas. A xícara não é oficialmente usada no Reino Unido, mas quando referenciada tipicamente significa 284 mL (½ pint Imperial), dando exatamente 2 xícaras britânicas por pint."
        },
        {
          "question": "Como converter uma receita de pints para litros?",
          "answer": "Primeiro determine se a receita usa pints americanos ou britânicos (americano é mais comum em livros de culinária americanos, britânico em britânicos). Multiplique pints americanos por 0,473 ou pints britânicos por 0,568 para obter litros. Para estimativas culinárias grosseiras, simplesmente divida pela metade o valor do pint — 4 pints ≈ 2 litros. Para confeitaria onde a precisão importa, use a conversão exata."
        },
        {
          "question": "Por que um pint de cerveja é diferente nos EUA e Reino Unido?",
          "answer": "A diferença remonta ao início do século XIX, quando a Grã-Bretanha e os EUA padronizaram seus sistemas de medição independentemente. Os EUA mantiveram o galão inglês de vinho (231 polegadas cúbicas), fazendo o pint americano ter 473 mL. A Grã-Bretanha adotou o galão Imperial baseado em 10 libras de água (277,4 polegadas cúbicas), fazendo o pint Imperial ter 568 mL. Muitos visitantes britânicos nos EUA ficam desapontados com o 'pint' menor servido em bares americanos."
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
      "name": "Convertisseur Pintes vers Litres",
      "slug": "calculateur-convertisseur-pintes-vers-litres",
      "subtitle": "Convertissez instantanément les pintes en litres — prend en charge les standards de pinte américain et britannique (impérial) pour la cuisine, les boissons et l'usage quotidien.",
      "breadcrumb": "Pintes vers Litres",
      "seo": {
        "title": "Convertisseur Pintes vers Litres - US & UK Pintes | Outil Gratuit",
        "description": "Convertissez instantanément les pintes en litres. Prend en charge les pintes américaines (473 mL) et britanniques impériales (568 mL) avec un tableau de référence rapide pour les volumes courants en cuisine et boissons.",
        "shortDescription": "Convertissez les pintes américaines et britanniques en litres avec un tableau de référence.",
        "keywords": [
          "pintes vers litres",
          "convertisseur pinte vers litre",
          "combien de litres dans une pinte",
          "pinte vers litres",
          "pinte américaine vers litres",
          "pinte britannique vers litres",
          "pinte impériale vers litres",
          "convertisseur pinte"
        ]
      },
      "calculator": {
        "yourInformation": "Vos Informations"
      },
      "inputs": {
        "pintValue": {
          "label": "Pintes",
          "helpText": "Entrez le nombre de pintes à convertir en litres"
        },
        "pintStandard": {
          "label": "Standard de Pinte",
          "helpText": "Pinte US = 473,176 mL. Pinte britannique (impériale) = 568,261 mL. La pinte britannique est 20% plus grande",
          "options": {
            "us": "Pinte US (473 mL)",
            "uk": "Pinte UK / Impériale (568 mL)"
          }
        }
      },
      "results": {
        "liters": {
          "label": "Litres"
        },
        "milliliters": {
          "label": "Millilitres"
        },
        "cups": {
          "label": "Tasses"
        },
        "fluidOunces": {
          "label": "Onces Liquides"
        },
        "gallons": {
          "label": "Gallons"
        }
      },
      "presets": {
        "one": {
          "label": "1 Pinte",
          "description": "~0,473 L (US)"
        },
        "two": {
          "label": "2 Pintes",
          "description": "~0,946 L (US) ≈ 1 quart"
        },
        "half": {
          "label": "½ Pinte",
          "description": "~0,237 L (US) = 1 tasse"
        },
        "six": {
          "label": "6 Pintes",
          "description": "~2,84 L (US)"
        }
      },
      "values": {
        "l": "L",
        "ml": "mL",
        "cups": "tasses",
        "floz": "oz liq",
        "gal": "gal",
        "pt": "pt"
      },
      "formats": {
        "summary": "{pint} pintes = {liters} litres ({ml} mL)"
      },
      "infoCards": {
        "conversions": {
          "title": "Résultats de Conversion",
          "items": [
            {
              "label": "Litres",
              "valueKey": "liters"
            },
            {
              "label": "Millilitres",
              "valueKey": "milliliters"
            },
            {
              "label": "Tasses",
              "valueKey": "cups"
            },
            {
              "label": "Onces Liquides",
              "valueKey": "fluidOunces"
            }
          ]
        },
        "quickRef": {
          "title": "Référence Rapide",
          "items": [
            {
              "label": "1 pinte US",
              "valueKey": "ref1us"
            },
            {
              "label": "1 pinte UK",
              "valueKey": "ref1uk"
            },
            {
              "label": "4 pintes US",
              "valueKey": "ref4us"
            },
            {
              "label": "8 pintes US",
              "valueKey": "ref8us"
            }
          ]
        },
        "tips": {
          "title": "Bon à Savoir",
          "items": [
            "Une pinte britannique est 20% plus grande qu'une pinte américaine. Si vous commandez une pinte de bière à Londres, vous obtenez 568 mL — à New York, seulement 473 mL. Vérifiez toujours quel standard de pinte une recette utilise.",
            "2 pintes US = 1 quart. 4 quarts = 1 gallon. Donc 8 pintes = 1 gallon américain (3,785 litres). Ces relations sont cohérentes dans le système américain.",
            "Dans la plupart des pays hors des États-Unis et du Royaume-Uni, le litre est l'unité standard pour le volume liquide. Un litre est légèrement plus de 2 pintes américaines (2,11 pintes).",
            "Pour la cuisine : 1 pinte US = 2 tasses = 16 onces liquides. Cela facilite la division et le doublement des recettes lors du travail avec des mesures en pintes."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Qu'est-ce qu'une Pinte ?",
          "content": "Une pinte est une unité de volume liquide utilisée principalement aux États-Unis et au Royaume-Uni, bien que les deux pays la définissent différemment. La pinte américaine équivaut à 473,176 mL (environ 0,473 litres), tandis que la pinte impériale britannique est plus grande à 568,261 mL (environ 0,568 litres) — une différence de 20%. Cette divergence remonte à 1824 lorsque le système impérial britannique fut standardisé différemment du système américain, qui conserva une définition plus ancienne du gallon anglais. Dans la vie quotidienne, les pintes sont utilisées pour les boissons (en particulier la bière et le lait), les recettes de cuisine, et mesurer les baies et autres produits. Le litre, utilisé par la plupart du monde, fournit un standard universel : 1 litre = 2,113 pintes US ou 1,760 pintes UK. Comprendre cette conversion est essentiel pour la cuisine internationale, les voyages, et suivre des recettes de différents pays."
        },
        "howItWorks": {
          "title": "Comment Convertir les Pintes en Litres",
          "content": "Pour les pintes américaines, multipliez par 0,473176 pour obtenir des litres. Pour les pintes impériales britanniques, multipliez par 0,568261. Par exemple, 3 pintes US = 3 × 0,473176 = 1,419 litres. Pour convertir les litres en pintes, divisez par le même facteur : 2 litres ÷ 0,473176 = 4,227 pintes US. Pour un calcul mental rapide avec les pintes américaines, retenez que 2 pintes ≈ 1 litre (en fait 0,946 L, donc environ 5% en dessous). Pour les pintes britanniques, pensez à chaque pinte comme un peu plus d'un demi-litre (0,568 L). La relation clé à retenir : 1 gallon US = 8 pintes US = 3,785 litres, et 1 gallon UK = 8 pintes UK = 4,546 litres."
        },
        "considerations": {
          "title": "Standards et Faits sur les Pintes",
          "items": [
            {
              "text": "Pinte US = 473,176 mL = 16 onces liquides US = 2 tasses US. C'est le standard dans les livres de cuisine américains.",
              "type": "info"
            },
            {
              "text": "Pinte impériale UK = 568,261 mL = 20 onces liquides UK. Notez qu'une once liquide UK (28,413 mL) est aussi différente d'une once liquide US (29,574 mL).",
              "type": "info"
            },
            {
              "text": "La pinte britannique est 20% plus grande que la pinte américaine. Une 'pinte de bière' à Londres contient significativement plus qu'à New York.",
              "type": "warning"
            },
            {
              "text": "Le Canada utilise officiellement le système métrique mais la pinte impériale (568 mL) reste la mesure légale pour la bière pression servie dans les bars.",
              "type": "info"
            },
            {
              "text": "En Australie et en Nouvelle-Zélande, une 'pinte' de bière fait en fait 570 mL — pratiquement identique à la pinte impériale britannique, même si ces pays sont entièrement métriques.",
              "type": "info"
            },
            {
              "text": "Pour la cuisine : 1 pinte US d'eau pèse environ 1,043 livres (473 grammes). 1 pinte UK d'eau pèse environ 1,25 livres (568 grammes).",
              "type": "info"
            }
          ]
        },
        "categories": {
          "title": "Volumes Courants en Pintes et Litres",
          "items": [
            {
              "text": "½ pinte US = 1 tasse = 237 mL. La mesure de tasse de base en cuisine américaine.",
              "type": "info"
            },
            {
              "text": "1 pinte US = 473 mL ≈ 0,47 L. Un service standard de bière américaine ou tasse à mesurer.",
              "type": "info"
            },
            {
              "text": "2 pintes US = 1 quart = 946 mL ≈ 0,95 L. Presque 1 litre — utile pour l'approximation.",
              "type": "info"
            },
            {
              "text": "1 pinte UK = 568 mL ≈ 0,57 L. Le verre à bière britannique standard et mesure de lait.",
              "type": "info"
            },
            {
              "text": "4 pintes US = ½ gallon = 1,89 L. Une taille courante de contenant de lait aux États-Unis.",
              "type": "info"
            },
            {
              "text": "8 pintes US = 1 gallon = 3,79 L. Le gallon américain standard, utilisé pour le lait, le carburant, et les gros volumes.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemples de Conversion",
          "description": "Conversions pinte vers litre étape par étape",
          "examples": [
            {
              "title": "Convertir 3 pintes US en litres",
              "steps": [
                "3 × 0,473176 = 1,4195 litres",
                "Égale aussi 1 419,5 mL",
                "Égale aussi 6 tasses US",
                "Égale aussi 48 onces liquides US"
              ],
              "result": "3 pintes US = 1,42 litres"
            },
            {
              "title": "Convertir 2 pintes UK en litres",
              "steps": [
                "2 × 0,568261 = 1,1365 litres",
                "Égale aussi 1 136,5 mL",
                "Égale aussi 40 onces liquides UK",
                "Note : les mêmes 2 pintes US = seulement 0,946 L"
              ],
              "result": "2 pintes UK = 1,14 litres"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Combien de litres fait 1 pinte ?",
          "answer": "1 pinte US = 0,473 litres (473 mL). 1 pinte impériale UK = 0,568 litres (568 mL). La pinte britannique est environ 20% plus grande que la pinte américaine. Pour une estimation rapide, retenez que 2 pintes US font proche de 1 litre (en fait 0,946 L)."
        },
        {
          "question": "Une pinte américaine est-elle la même qu'une pinte britannique ?",
          "answer": "Non. Une pinte US fait 473 mL (16 oz liq US), tandis qu'une pinte impériale UK fait 568 mL (20 oz liq UK). La pinte britannique est 20% plus grande. Cette différence remonte à 1824 quand la Grande-Bretagne redéfinit son gallon basé sur le poids de l'eau, tandis que les États-Unis gardèrent l'ancienne définition du gallon de vin anglais."
        },
        {
          "question": "Combien de pintes dans un litre ?",
          "answer": "Il y a 2,113 pintes US dans 1 litre, ou 1,760 pintes impériales UK dans 1 litre. Pour une approximation rapide, pensez à un litre comme 'un peu plus de 2 pintes US' ou 'un peu moins de 2 pintes UK'."
        },
        {
          "question": "Combien de tasses dans une pinte ?",
          "answer": "1 pinte US = 2 tasses US exactement (chaque tasse = 236,6 mL). Dans le système britannique, 1 pinte impériale = 2,27 tasses US. La tasse n'est pas officiellement utilisée au Royaume-Uni, mais quand référencée elle signifie typiquement 284 mL (½ pinte impériale), donnant exactement 2 tasses UK par pinte."
        },
        {
          "question": "Comment convertir une recette de pintes en litres ?",
          "answer": "Déterminez d'abord si la recette utilise des pintes US ou UK (US est plus commun dans les livres de cuisine américains, UK dans les britanniques). Multipliez les pintes US par 0,473 ou les pintes UK par 0,568 pour obtenir des litres. Pour des estimations culinaires approximatives, divisez simplement la valeur en pintes par deux — 4 pintes ≈ 2 litres. Pour la pâtisserie où la précision compte, utilisez la conversion exacte."
        },
        {
          "question": "Pourquoi une pinte de bière est-elle différente aux États-Unis et au Royaume-Uni ?",
          "answer": "La différence remonte au début du 19e siècle quand la Grande-Bretagne et les États-Unis standardisèrent leurs systèmes de mesure indépendamment. Les États-Unis gardèrent le gallon de vin anglais (231 pouces cubes), faisant la pinte US 473 mL. La Grande-Bretagne adopta le gallon impérial basé sur 10 livres d'eau (277,4 pouces cubes), faisant la pinte impériale 568 mL. Beaucoup de visiteurs britanniques aux États-Unis sont déçus par la plus petite 'pinte' servie dans les bars américains."
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
      "name": "Pints zu Liter Umrechner",
      "slug": "pints-zu-liter-umrechner-rechner",
      "subtitle": "Wandeln Sie Pints sofort in Liter um — unterstützt sowohl US- als auch UK- (Imperial) Pint-Standards für Kochen, Getränke und den täglichen Gebrauch.",
      "breadcrumb": "Pints zu Liter",
      "seo": {
        "title": "Pints zu Liter Umrechner - US & UK Pints | Kostenloses Tool",
        "description": "Wandeln Sie Pints sofort in Liter um. Unterstützt US-Pints (473 mL) und UK-Imperial-Pints (568 mL) mit einer schnellen Referenztabelle für gängige Volumina beim Kochen und bei Getränken.",
        "shortDescription": "Wandeln Sie US- und UK-Pints in Liter um mit einer Referenztabelle.",
        "keywords": [
          "pints zu liter",
          "pint zu liter umrechner",
          "wie viele liter in einem pint",
          "pint zu liter",
          "us pint zu liter",
          "uk pint zu liter",
          "imperial pint zu liter",
          "pint umrechner"
        ]
      },
      "calculator": {
        "yourInformation": "Ihre Informationen"
      },
      "inputs": {
        "pintValue": {
          "label": "Pints",
          "helpText": "Geben Sie die Anzahl der Pints ein, die in Liter umgewandelt werden sollen"
        },
        "pintStandard": {
          "label": "Pint-Standard",
          "helpText": "US-Pint = 473,176 mL. UK- (Imperial) Pint = 568,261 mL. Das UK-Pint ist 20% größer",
          "options": {
            "us": "US-Pint (473 mL)",
            "uk": "UK / Imperial Pint (568 mL)"
          }
        }
      },
      "results": {
        "liters": {
          "label": "Liter"
        },
        "milliliters": {
          "label": "Milliliter"
        },
        "cups": {
          "label": "Tassen"
        },
        "fluidOunces": {
          "label": "Flüssigunzen"
        },
        "gallons": {
          "label": "Gallonen"
        }
      },
      "presets": {
        "one": {
          "label": "1 Pint",
          "description": "~0,473 L (US)"
        },
        "two": {
          "label": "2 Pints",
          "description": "~0,946 L (US) ≈ 1 Quart"
        },
        "half": {
          "label": "½ Pint",
          "description": "~0,237 L (US) = 1 Tasse"
        },
        "six": {
          "label": "6 Pints",
          "description": "~2,84 L (US)"
        }
      },
      "values": {
        "l": "L",
        "ml": "mL",
        "cups": "Tassen",
        "floz": "fl oz",
        "gal": "gal",
        "pt": "pt"
      },
      "formats": {
        "summary": "{pint} Pints = {liters} Liter ({ml} mL)"
      },
      "infoCards": {
        "conversions": {
          "title": "Umrechnungsergebnisse",
          "items": [
            {
              "label": "Liter",
              "valueKey": "liters"
            },
            {
              "label": "Milliliter",
              "valueKey": "milliliters"
            },
            {
              "label": "Tassen",
              "valueKey": "cups"
            },
            {
              "label": "Flüssigunzen",
              "valueKey": "fluidOunces"
            }
          ]
        },
        "quickRef": {
          "title": "Schnellreferenz",
          "items": [
            {
              "label": "1 US-Pint",
              "valueKey": "ref1us"
            },
            {
              "label": "1 UK-Pint",
              "valueKey": "ref1uk"
            },
            {
              "label": "4 US-Pints",
              "valueKey": "ref4us"
            },
            {
              "label": "8 US-Pints",
              "valueKey": "ref8us"
            }
          ]
        },
        "tips": {
          "title": "Gut zu wissen",
          "items": [
            "Ein UK-Pint ist 20% größer als ein US-Pint. Wenn Sie ein Pint Bier in London bestellen, erhalten Sie 568 mL — in New York nur 473 mL. Prüfen Sie immer, welchen Pint-Standard ein Rezept verwendet.",
            "2 US-Pints = 1 Quart. 4 Quarts = 1 Gallone. Also 8 Pints = 1 US-Gallone (3,785 Liter). Diese Verhältnisse sind im US-System konsistent.",
            "In den meisten Ländern außerhalb der USA und UK ist der Liter die Standardeinheit für Flüssigkeitsvolumen. Ein Liter ist etwas mehr als 2 US-Pints (2,11 Pints).",
            "Zum Kochen: 1 US-Pint = 2 Tassen = 16 Flüssigunzen. Das macht das Halbieren und Verdoppeln von Rezepten beim Arbeiten mit Pint-Maßen einfach."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Was ist ein Pint?",
          "content": "Ein Pint ist eine Einheit für Flüssigkeitsvolumen, die hauptsächlich in den Vereinigten Staaten und dem Vereinigten Königreich verwendet wird, obwohl die beiden Länder es unterschiedlich definieren. Das US-Pint entspricht 473,176 mL (ungefähr 0,473 Liter), während das UK-Imperial-Pint größer ist mit 568,261 mL (ungefähr 0,568 Liter) — ein Unterschied von 20%. Diese Diskrepanz geht auf das Jahr 1824 zurück, als das britische Imperial-System anders standardisiert wurde als das amerikanische Gewohnheitssystem, das eine ältere englische Weingallonen-Definition beibehielt. Im Alltag werden Pints für Getränke (besonders Bier und Milch), Kochrezepte und zum Messen von Beeren und anderen Produkten verwendet. Der Liter, der von den meisten Ländern der Welt verwendet wird, bietet einen universellen Standard: 1 Liter = 2,113 US-Pints oder 1,760 UK-Pints. Das Verständnis dieser Umrechnung ist wichtig für internationales Kochen, Reisen und das Befolgen von Rezepten aus verschiedenen Ländern."
        },
        "howItWorks": {
          "title": "Wie man Pints in Liter umrechnet",
          "content": "Für US-Pints multiplizieren Sie mit 0,473176, um Liter zu erhalten. Für UK-Imperial-Pints multiplizieren Sie mit 0,568261. Zum Beispiel: 3 US-Pints = 3 × 0,473176 = 1,419 Liter. Um Liter zurück in Pints umzuwandeln, teilen Sie durch denselben Faktor: 2 Liter ÷ 0,473176 = 4,227 US-Pints. Für schnelle Kopfrechnung mit US-Pints merken Sie sich, dass 2 Pints ≈ 1 Liter (tatsächlich 0,946 L, also etwa 5% weniger). Für UK-Pints denken Sie an jedes Pint als etwas mehr als einen halben Liter (0,568 L). Die wichtige Beziehung zum Merken: 1 US-Gallone = 8 US-Pints = 3,785 Liter, und 1 UK-Gallone = 8 UK-Pints = 4,546 Liter."
        },
        "considerations": {
          "title": "Pint-Standards & Fakten",
          "items": [
            {
              "text": "US-Pint = 473,176 mL = 16 US-Flüssigunzen = 2 US-Tassen. Das ist der Standard in amerikanischen Kochbüchern und Rezepten.",
              "type": "info"
            },
            {
              "text": "UK-Imperial-Pint = 568,261 mL = 20 UK-Flüssigunzen. Beachten Sie, dass eine UK-Flüssigunze (28,413 mL) auch anders ist als eine US-Flüssigunze (29,574 mL).",
              "type": "info"
            },
            {
              "text": "Das UK-Pint ist 20% größer als das US-Pint. Ein 'Pint Bier' in London enthält deutlich mehr als in New York.",
              "type": "warning"
            },
            {
              "text": "Kanada verwendet offiziell das metrische System, aber das Imperial-Pint (568 mL) ist immer noch das gesetzliche Maß für Fassbier, das in Bars serviert wird.",
              "type": "info"
            },
            {
              "text": "In Australien und Neuseeland ist ein 'Pint' Bier tatsächlich 570 mL — praktisch identisch mit dem UK-Imperial-Pint, obwohl diese Länder vollständig metrisch sind.",
              "type": "info"
            },
            {
              "text": "Zum Kochen: 1 US-Pint Wasser wiegt ungefähr 1,043 Pfund (473 Gramm). 1 UK-Pint Wasser wiegt ungefähr 1,25 Pfund (568 Gramm).",
              "type": "info"
            }
          ]
        },
        "categories": {
          "title": "Häufige Volumina in Pints & Litern",
          "items": [
            {
              "text": "½ US-Pint = 1 Tasse = 237 mL. Das grundlegende Tassenmaß im amerikanischen Kochen.",
              "type": "info"
            },
            {
              "text": "1 US-Pint = 473 mL ≈ 0,47 L. Eine Standard-US-Bierportion oder Messbecher.",
              "type": "info"
            },
            {
              "text": "2 US-Pints = 1 Quart = 946 mL ≈ 0,95 L. Fast 1 Liter — nützlich für Näherungen.",
              "type": "info"
            },
            {
              "text": "1 UK-Pint = 568 mL ≈ 0,57 L. Das Standard-britische Bierglas und Milchmaß.",
              "type": "info"
            },
            {
              "text": "4 US-Pints = ½ Gallone = 1,89 L. Eine häufige Milchbehältergröße in den USA.",
              "type": "info"
            },
            {
              "text": "8 US-Pints = 1 Gallone = 3,79 L. Die Standard-US-Gallone, verwendet für Milch, Kraftstoff und große Volumina.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Umrechnungsbeispiele",
          "description": "Schritt-für-Schritt Pint zu Liter Umrechnungen",
          "examples": [
            {
              "title": "3 US-Pints in Liter umrechnen",
              "steps": [
                "3 × 0,473176 = 1,4195 Liter",
                "Entspricht auch 1.419,5 mL",
                "Entspricht auch 6 US-Tassen",
                "Entspricht auch 48 US-Flüssigunzen"
              ],
              "result": "3 US-Pints = 1,42 Liter"
            },
            {
              "title": "2 UK-Pints in Liter umrechnen",
              "steps": [
                "2 × 0,568261 = 1,1365 Liter",
                "Entspricht auch 1.136,5 mL",
                "Entspricht auch 40 UK-Flüssigunzen",
                "Hinweis: dieselben 2 Pints in US = nur 0,946 L"
              ],
              "result": "2 UK-Pints = 1,14 Liter"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Wie viele Liter sind 1 Pint?",
          "answer": "1 US-Pint = 0,473 Liter (473 mL). 1 UK-Imperial-Pint = 0,568 Liter (568 mL). Das UK-Pint ist etwa 20% größer als das US-Pint. Für schnelle Schätzungen merken Sie sich, dass 2 US-Pints nahe an 1 Liter sind (tatsächlich 0,946 L)."
        },
        {
          "question": "Ist ein US-Pint dasselbe wie ein UK-Pint?",
          "answer": "Nein. Ein US-Pint ist 473 mL (16 US fl oz), während ein UK-Imperial-Pint 568 mL (20 UK fl oz) ist. Das UK-Pint ist 20% größer. Dieser Unterschied geht auf 1824 zurück, als Großbritannien seine Gallone basierend auf dem Gewicht von Wasser neu definierte, während die USA die ältere englische Weingallonen-Definition beibehielten."
        },
        {
          "question": "Wie viele Pints sind in einem Liter?",
          "answer": "Es gibt 2,113 US-Pints in 1 Liter, oder 1,760 UK-Imperial-Pints in 1 Liter. Für eine schnelle Näherung denken Sie an einen Liter als 'etwas mehr als 2 US-Pints' oder 'etwas weniger als 2 UK-Pints'."
        },
        {
          "question": "Wie viele Tassen sind in einem Pint?",
          "answer": "1 US-Pint = genau 2 US-Tassen (jede Tasse = 236,6 mL). Im UK-System entspricht 1 Imperial-Pint = 2,27 US-Tassen. Die Tasse wird im UK nicht offiziell verwendet, aber wenn sie erwähnt wird, bedeutet sie typischerweise 284 mL (½ Imperial-Pint), was genau 2 UK-Tassen pro Pint ergibt."
        },
        {
          "question": "Wie rechne ich ein Rezept von Pints in Liter um?",
          "answer": "Bestimmen Sie zuerst, ob das Rezept US- oder UK-Pints verwendet (US ist häufiger in amerikanischen Kochbüchern, UK in britischen). Multiplizieren Sie US-Pints mit 0,473 oder UK-Pints mit 0,568, um Liter zu erhalten. Für grobe Kochschätzungen halbieren Sie einfach den Pint-Wert — 4 Pints ≈ 2 Liter. Für das Backen, wo Präzision wichtig ist, verwenden Sie die exakte Umrechnung."
        },
        {
          "question": "Warum ist ein Pint Bier in den USA und UK unterschiedlich?",
          "answer": "Der Unterschied geht auf das frühe 19. Jahrhundert zurück, als Großbritannien und die USA ihre Messsysteme unabhängig standardisierten. Die USA behielten die englische Weingallone (231 Kubikzoll), wodurch das US-Pint 473 mL wurde. Großbritannien übernahm die Imperial-Gallone basierend auf 10 Pfund Wasser (277,4 Kubikzoll), wodurch das Imperial-Pint 568 mL wurde. Viele britische Besucher in den USA sind enttäuscht über das kleinere 'Pint', das in amerikanischen Bars serviert wird."
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
      id: "pintValue",
      type: "number",
      defaultValue: null,
      placeholder: "2",
      min: 0.01,
      max: 1000,
      step: 0.25,
      suffix: "pt",
    },
    {
      id: "pintStandard",
      type: "select",
      defaultValue: "us",
      options: [
        { value: "us" },
        { value: "uk" },
      ],
    },
  ],

  inputGroups: [],

  results: [
    { id: "liters", type: "primary", format: "number" },
    { id: "milliliters", type: "secondary", format: "number" },
    { id: "cups", type: "secondary", format: "number" },
    { id: "fluidOunces", type: "secondary", format: "number" },
    { id: "gallons", type: "secondary", format: "number" },
  ],

  infoCards: [
    { id: "conversions", type: "list", icon: "🍺", itemCount: 4 },
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
    { authors: "National Institute of Standards and Technology", year: "2024", title: "NIST Handbook 44 – Specifications, Tolerances, and Other Technical Requirements for Weighing and Measuring Devices", source: "NIST", url: "https://www.nist.gov/pml/owm/handbook-44-current-edition" },
    { authors: "UK Weights and Measures Act", year: "1985", title: "Weights and Measures Act 1985 – Definitions of Imperial Units", source: "UK Government", url: "https://www.legislation.gov.uk/ukpga/1985/72" },
  ],

  hero: { icon: "🍺", label: "Conversion" },
  sidebar: { showRelated: true, showPopular: true },
  features: { saveResults: true, pdfExport: true, sharing: true },
  relatedCalculators: ["gallons-to-liters-calculator", "cups-to-ml-calculator", "oz-to-ml-calculator"],
  ads: { showSidebar: true, showBetweenSections: true },
};

// ─── Calculate ───────────────────────────────────────────────────────────────

export function calculatePintsToLitersConverter(data: {
  values: Record<string, unknown>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, t } = data;
  const v = (t?.values as Record<string, string>) || {};

  const pintVal = values.pintValue as number | null;
  if (pintVal === null || pintVal <= 0) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  const standard = (values.pintStandard as string) || "us";

  const ML_PER_PINT: Record<string, number> = {
    us: 473.17647,
    uk: 568.26125,
  };

  const factor = ML_PER_PINT[standard] || 473.17647;
  const ml = pintVal * factor;
  const liters = ml / 1000;
  const cups = standard === "us" ? pintVal * 2 : pintVal * 2.273;
  const floz = standard === "us" ? pintVal * 16 : pintVal * 20;
  const gallons = standard === "us" ? pintVal / 8 : pintVal / 8;

  const lUnit = v["l"] || "L";
  const mlUnit = v["ml"] || "mL";
  const flozUnit = v["floz"] || "fl oz";

  const fmtL = (val: number) =>
    val < 1 ? val.toFixed(3) : val < 10 ? val.toFixed(2) : val.toFixed(1);

  const f = (t?.formats as Record<string, string>) || {};
  const summary = f.summary
    ?.replace("{pint}", pintVal.toString())
    .replace("{liters}", fmtL(liters))
    .replace("{ml}", Math.round(ml).toString()) || "";

  return {
    values: {
      liters: Math.round(liters * 1000) / 1000,
      milliliters: Math.round(ml * 10) / 10,
      cups: Math.round(cups * 100) / 100,
      fluidOunces: Math.round(floz * 10) / 10,
      gallons: Math.round(gallons * 1000) / 1000,
      ref1us: "0.473 L",
      ref1uk: "0.568 L",
      ref4us: "1.893 L",
      ref8us: "3.785 L (1 gal)",
    },
    formatted: {
      liters: `${fmtL(liters)} ${lUnit}`,
      milliliters: `${ml.toFixed(1)} ${mlUnit}`,
      cups: `${cups.toFixed(2)} cups`,
      fluidOunces: `${floz.toFixed(1)} ${flozUnit}`,
      gallons: `${gallons.toFixed(3)} gal`,
      ref1us: `0.473 ${lUnit}`,
      ref1uk: `0.568 ${lUnit}`,
      ref4us: `1.893 ${lUnit}`,
      ref8us: `3.785 ${lUnit} (1 gal)`,
    },
    summary,
    isValid: true,
  };
}

export default pintsToLitersConverterConfig;
