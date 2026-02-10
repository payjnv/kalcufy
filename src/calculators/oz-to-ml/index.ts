import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";
import { convertToBase } from "@/engine/v4/units";

// ============================================================================
// OZ TO ML CONVERTER - V4 (EN ONLY)
// ============================================================================

export const ozToMlConverterConfig: CalculatorConfigV4 = {
  id: "oz-to-ml",
  version: "4.0",
  category: "conversion",
  icon: "🥤",

  presets: [
    { id: "shot", icon: "🥃", values: { amount: 1.5 } },
    { id: "cup8oz", icon: "☕", values: { amount: 8 } },
    { id: "bottle16", icon: "🍶", values: { amount: 16.9 } },
  ],

  t: {
    en: {
      name: "OZ to ML Converter",
      slug: "oz-to-ml",
      subtitle: "Convert fluid ounces to milliliters instantly — essential for cooking, drinks, medicine, and travel.",
      breadcrumb: "OZ to ML",

      seo: {
        title: "OZ to ML Converter - Free Volume Conversion Tool",
        description: "Convert fluid ounces to milliliters instantly. Essential for cooking recipes, drink measurements, medicine dosing, and travel. Includes cups, liters, and common bottle sizes.",
        shortDescription: "Convert fluid ounces to milliliters instantly.",
        keywords: ["oz to ml", "ounces to milliliters", "fl oz to ml converter", "convert oz to ml", "fluid ounces to ml", "free oz converter", "imperial to metric volume"],
      },

      calculator: { yourInformation: "OZ to ML" },
      ui: { yourInformation: "OZ to ML", calculate: "Convert", reset: "Reset", results: "Results" },

      inputs: {
        amount: { label: "Volume", helpText: "Enter value and select unit" },
      },

      results: {
        milliliters: { label: "Milliliters" },
        liters: { label: "Liters" },
        cups: { label: "US Cups" },
        tablespoons: { label: "Tablespoons" },
        teaspoons: { label: "Teaspoons" },
      },

      presets: {
        shot: { label: "1.5 fl oz", description: "Standard shot (44.4 mL)" },
        cup8oz: { label: "8 fl oz", description: "1 US cup (236.6 mL)" },
        bottle16: { label: "16.9 fl oz", description: "Standard water bottle (500 mL)" },
      },

      values: { "mL": "mL", "L": "L", "cups": "cups", "tbsp": "tbsp", "tsp": "tsp", "fl oz": "fl oz" },
      formats: { summary: "{oz} fl oz = {ml} mL" },

      infoCards: {
        results: {
          title: "🥤 Conversion Results",
          items: [
            { label: "Milliliters", valueKey: "milliliters" },
            { label: "Liters", valueKey: "liters" },
            { label: "US Cups", valueKey: "cups" },
            { label: "Tablespoons", valueKey: "tablespoons" },
          ],
        },
        quickRef: {
          title: "📊 Common Sizes",
          items: [
            { label: "1 fl oz", valueKey: "ref1" },
            { label: "8 fl oz (1 cup)", valueKey: "ref8" },
            { label: "12 fl oz (soda can)", valueKey: "ref12" },
            { label: "33.8 fl oz (1 liter)", valueKey: "ref34" },
          ],
        },
        tips: {
          title: "💡 Volume Tips",
          items: [
            "1 fl oz = 29.5735 mL — multiply oz by 30 for a quick estimate.",
            "Standard soda can: 12 fl oz = 355 mL. Water bottle: 16.9 fl oz = 500 mL.",
            "1 US cup = 8 fl oz = 236.6 mL (NOT 250 mL — metric cup is different).",
            "Medicine: 1 teaspoon = 5 mL, 1 tablespoon = 15 mL = 0.5 fl oz.",
          ],
        },
      },

      education: {
        whatIs: {
          title: "How to Convert Fluid Ounces to Milliliters",
          content: "To convert US fluid ounces to milliliters, multiply by 29.5735. One US fluid ounce equals exactly 29.5735 mL. Note: a fluid ounce (volume) is different from an ounce (weight). Also, US fluid ounces differ from UK (Imperial) fluid ounces — 1 UK fl oz = 28.4131 mL. This converter uses US fluid ounces, which are standard in American recipes, nutrition labels, and drink sizes. The milliliter (1/1000 of a liter) is used worldwide for liquid measurements.",
        },
        howItWorks: {
          title: "The OZ to ML Formula",
          content: "The formula is: mL = fluid ounces × 29.5735. For quick mental math, multiply by 30 (error < 1.5%). For cups: 1 US cup = 8 fl oz = 236.588 mL (NOT 250 mL — that's a metric cup used in Australia). For tablespoons: 1 tbsp = 0.5 fl oz = 14.787 mL. For teaspoons: 1 tsp = 1/6 fl oz = 4.929 mL ≈ 5 mL. These relationships make it easy to convert between kitchen measurements.",
        },
        considerations: {
          title: "Common OZ to ML Conversions",
          items: [
            { text: "1 fl oz = 29.57 mL — the fundamental conversion", type: "info" },
            { text: "2 fl oz = 59.15 mL — standard espresso double shot", type: "info" },
            { text: "8 fl oz = 236.59 mL — 1 US cup", type: "info" },
            { text: "12 fl oz = 354.88 mL — standard soda can", type: "info" },
            { text: "16 fl oz = 473.18 mL — US pint", type: "info" },
            { text: "33.814 fl oz = 1,000 mL — 1 liter", type: "info" },
          ],
        },
        drinkSizes: {
          title: "Common Drink Sizes (fl oz → mL)",
          items: [
            { text: "Espresso shot: 1 fl oz = 30 mL", type: "info" },
            { text: "Standard shot (liquor): 1.5 fl oz = 44 mL", type: "info" },
            { text: "Juice box: 6.75 fl oz = 200 mL", type: "info" },
            { text: "Soda can: 12 fl oz = 355 mL", type: "info" },
            { text: "Water bottle: 16.9 fl oz = 500 mL", type: "info" },
            { text: "Wine bottle: 25.4 fl oz = 750 mL", type: "info" },
          ],
        },
        examples: {
          title: "OZ to ML Examples",
          description: "Step-by-step conversions",
          examples: [
            {
              title: "Recipe: 3/4 cup milk in mL",
              steps: ["3/4 cup = 6 fl oz", "6 × 29.5735 = 177.4 mL", "Quick: 6 × 30 = 180 mL (close enough)", "Use 175 mL for a metric recipe"],
              result: "3/4 cup = 6 fl oz = 177.4 mL",
            },
            {
              title: "Medicine: 2 tablespoons to mL",
              steps: ["1 tablespoon = 0.5 fl oz", "2 tablespoons = 1 fl oz", "1 × 29.5735 = 29.57 mL", "Or: 2 × 15 mL = 30 mL (standard dose)"],
              result: "2 tbsp = 1 fl oz ≈ 30 mL",
            },
          ],
        },
      },

      faqs: [
        { question: "How many mL is 1 fl oz?", answer: "1 US fluid ounce = 29.5735 mL. For quick cooking conversions, 30 mL is close enough (error < 1.5%). Note: 1 UK (Imperial) fl oz = 28.4131 mL, slightly smaller." },
        { question: "How many fl oz is 500 mL?", answer: "500 mL = 16.907 fl oz, commonly written as 16.9 fl oz. This is the standard size of a water bottle in the US." },
        { question: "Is a US cup 250 mL?", answer: "No. A US cup = 236.588 mL (8 fl oz), NOT 250 mL. The 250 mL \"cup\" is a metric cup used in Australia and some other countries. This 14 mL difference can matter in baking." },
        { question: "How do I convert fl oz to liters?", answer: "Divide fluid ounces by 33.814 to get liters. Example: 64 fl oz (half gallon) = 64 ÷ 33.814 = 1.893 liters. Or multiply fl oz by 0.02957 for liters." },
        { question: "What is the difference between fl oz and oz?", answer: "Fluid ounces (fl oz) measure volume (how much space a liquid takes up). Ounces (oz) measure weight/mass. For water, they're approximately equal (1 fl oz of water weighs ~1 oz), but for other liquids they differ. Honey: 1 fl oz weighs ~1.5 oz. Oil: 1 fl oz weighs ~0.8 oz." },
        { question: "How many mL in a tablespoon?", answer: "1 US tablespoon = 14.787 mL ≈ 15 mL. 1 US teaspoon = 4.929 mL ≈ 5 mL. In recipes and medicine, tablespoons and teaspoons are commonly rounded to 15 mL and 5 mL respectively." },
      ],

      rating: { title: "Rate this Calculator", share: "Share", copied: "Copied!", copyLink: "Copy Link", clickToRate: "Click to rate", youRated: "You rated", stars: "stars", averageFrom: "average from", ratings: "ratings" },
      common: { home: "Home", calculators: "Calculators" },
      buttons: { calculate: "Convert", reset: "Reset", pdf: "PDF", csv: "CSV", excel: "Excel", save: "Save", saved: "Saved", saving: "Saving..." },
      share: { calculatedWith: "Calculated with Kalcufy.com" },
      accessibility: { mobileResults: "Results", closeModal: "Close", openMenu: "Menu" },
      sources: { title: "Sources & References" },
    },
    es: {
      "name": "Conversor de OZ a ML",
      "slug": "calculadora-onzas-liquidas-mililitros",
      "subtitle": "Convierte onzas líquidas a mililitros al instante — esencial para cocinar, bebidas, medicina y viajes.",
      "breadcrumb": "OZ a ML",
      "seo": {
        "title": "Conversor OZ a ML - Herramienta Gratuita de Conversión de Volumen",
        "description": "Convierte onzas líquidas a mililitros al instante. Esencial para recetas de cocina, medidas de bebidas, dosificación de medicinas y viajes. Incluye tazas, litros y tamaños comunes de botellas.",
        "shortDescription": "Convierte onzas líquidas a mililitros al instante.",
        "keywords": [
          "oz a ml",
          "onzas a mililitros",
          "conversor fl oz a ml",
          "convertir oz a ml",
          "onzas líquidas a ml",
          "conversor oz gratis",
          "volumen imperial a métrico"
        ]
      },
      "inputs": {
        "amount": {
          "label": "Volumen",
          "helpText": "Ingresa el valor y selecciona la unidad"
        }
      },
      "results": {
        "milliliters": {
          "label": "Mililitros"
        },
        "liters": {
          "label": "Litros"
        },
        "cups": {
          "label": "Tazas Americanas"
        },
        "tablespoons": {
          "label": "Cucharadas"
        },
        "teaspoons": {
          "label": "Cucharaditas"
        }
      },
      "presets": {
        "shot": {
          "label": "1.5 fl oz",
          "description": "Trago estándar (44.4 mL)"
        },
        "cup8oz": {
          "label": "8 fl oz",
          "description": "1 taza americana (236.6 mL)"
        },
        "bottle16": {
          "label": "16.9 fl oz",
          "description": "Botella de agua estándar (500 mL)"
        }
      },
      "values": {
        "mL": "mL",
        "L": "L",
        "cups": "tazas",
        "tbsp": "cdas",
        "tsp": "cdtas",
        "fl oz": "fl oz"
      },
      "formats": {
        "summary": "{oz} fl oz = {ml} mL"
      },
      "infoCards": {
        "results": {
          "title": "🥤 Resultados de Conversión",
          "items": [
            {
              "label": "Mililitros",
              "valueKey": "milliliters"
            },
            {
              "label": "Litros",
              "valueKey": "liters"
            },
            {
              "label": "Tazas Americanas",
              "valueKey": "cups"
            },
            {
              "label": "Cucharadas",
              "valueKey": "tablespoons"
            }
          ]
        },
        "quickRef": {
          "title": "📊 Tamaños Comunes",
          "items": [
            {
              "label": "1 fl oz",
              "valueKey": "ref1"
            },
            {
              "label": "8 fl oz (1 taza)",
              "valueKey": "ref8"
            },
            {
              "label": "12 fl oz (lata de refresco)",
              "valueKey": "ref12"
            },
            {
              "label": "33.8 fl oz (1 litro)",
              "valueKey": "ref34"
            }
          ]
        },
        "tips": {
          "title": "💡 Consejos de Volumen",
          "items": [
            "1 fl oz = 29.5735 mL — multiplica oz por 30 para una estimación rápida.",
            "Lata de refresco estándar: 12 fl oz = 355 mL. Botella de agua: 16.9 fl oz = 500 mL.",
            "1 taza americana = 8 fl oz = 236.6 mL (NO 250 mL — la taza métrica es diferente).",
            "Medicina: 1 cucharadita = 5 mL, 1 cucharada = 15 mL = 0.5 fl oz."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Cómo Convertir Onzas Líquidas a Mililitros",
          "content": "Para convertir onzas líquidas americanas a mililitros, multiplica por 29.5735. Una onza líquida americana equivale exactamente a 29.5735 mL. Nota: una onza líquida (volumen) es diferente de una onza (peso). Además, las onzas líquidas americanas difieren de las del Reino Unido (Imperial) — 1 fl oz del Reino Unido = 28.4131 mL. Este convertidor usa onzas líquidas americanas, que son estándar en recetas americanas, etiquetas nutricionales y tamaños de bebidas. El mililitro (1/1000 de un litro) se usa mundialmente para medidas de líquidos."
        },
        "howItWorks": {
          "title": "La Fórmula de OZ a ML",
          "content": "La fórmula es: mL = onzas líquidas × 29.5735. Para cálculo mental rápido, multiplica por 30 (error < 1.5%). Para tazas: 1 taza americana = 8 fl oz = 236.588 mL (NO 250 mL — esa es una taza métrica usada en Australia). Para cucharadas: 1 cda = 0.5 fl oz = 14.787 mL. Para cucharaditas: 1 cdta = 1/6 fl oz = 4.929 mL ≈ 5 mL. Estas relaciones facilitan la conversión entre medidas de cocina."
        },
        "considerations": {
          "title": "Conversiones Comunes de OZ a ML",
          "items": [
            {
              "text": "1 fl oz = 29.57 mL — la conversión fundamental",
              "type": "info"
            },
            {
              "text": "2 fl oz = 59.15 mL — espresso doble estándar",
              "type": "info"
            },
            {
              "text": "8 fl oz = 236.59 mL — 1 taza americana",
              "type": "info"
            },
            {
              "text": "12 fl oz = 354.88 mL — lata de refresco estándar",
              "type": "info"
            },
            {
              "text": "16 fl oz = 473.18 mL — pinta americana",
              "type": "info"
            },
            {
              "text": "33.814 fl oz = 1,000 mL — 1 litro",
              "type": "info"
            }
          ]
        },
        "drinkSizes": {
          "title": "Tamaños Comunes de Bebidas (fl oz → mL)",
          "items": [
            {
              "text": "Trago de espresso: 1 fl oz = 30 mL",
              "type": "info"
            },
            {
              "text": "Trago estándar (licor): 1.5 fl oz = 44 mL",
              "type": "info"
            },
            {
              "text": "Caja de jugo: 6.75 fl oz = 200 mL",
              "type": "info"
            },
            {
              "text": "Lata de refresco: 12 fl oz = 355 mL",
              "type": "info"
            },
            {
              "text": "Botella de agua: 16.9 fl oz = 500 mL",
              "type": "info"
            },
            {
              "text": "Botella de vino: 25.4 fl oz = 750 mL",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Ejemplos de OZ a ML",
          "description": "Conversiones paso a paso",
          "examples": [
            {
              "title": "Receta: 3/4 taza de leche en mL",
              "steps": [
                "3/4 taza = 6 fl oz",
                "6 × 29.5735 = 177.4 mL",
                "Rápido: 6 × 30 = 180 mL (suficientemente cerca)",
                "Usa 175 mL para una receta métrica"
              ],
              "result": "3/4 taza = 6 fl oz = 177.4 mL"
            },
            {
              "title": "Medicina: 2 cucharadas a mL",
              "steps": [
                "1 cucharada = 0.5 fl oz",
                "2 cucharadas = 1 fl oz",
                "1 × 29.5735 = 29.57 mL",
                "O: 2 × 15 mL = 30 mL (dosis estándar)"
              ],
              "result": "2 cdas = 1 fl oz ≈ 30 mL"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "¿Cuántos mL tiene 1 fl oz?",
          "answer": "1 onza líquida americana = 29.5735 mL. Para conversiones rápidas de cocina, 30 mL es suficientemente cerca (error < 1.5%). Nota: 1 fl oz del Reino Unido (Imperial) = 28.4131 mL, ligeramente menor."
        },
        {
          "question": "¿Cuántas fl oz son 500 mL?",
          "answer": "500 mL = 16.907 fl oz, comúnmente escrito como 16.9 fl oz. Este es el tamaño estándar de una botella de agua en Estados Unidos."
        },
        {
          "question": "¿Es una taza americana 250 mL?",
          "answer": "No. Una taza americana = 236.588 mL (8 fl oz), NO 250 mL. La \"taza\" de 250 mL es una taza métrica usada en Australia y algunos otros países. Esta diferencia de 14 mL puede importar en repostería."
        },
        {
          "question": "¿Cómo convierto fl oz a litros?",
          "answer": "Divide las onzas líquidas por 33.814 para obtener litros. Ejemplo: 64 fl oz (medio galón) = 64 ÷ 33.814 = 1.893 litros. O multiplica fl oz por 0.02957 para litros."
        },
        {
          "question": "¿Cuál es la diferencia entre fl oz y oz?",
          "answer": "Las onzas líquidas (fl oz) miden volumen (cuánto espacio ocupa un líquido). Las onzas (oz) miden peso/masa. Para el agua, son aproximadamente iguales (1 fl oz de agua pesa ~1 oz), pero para otros líquidos difieren. Miel: 1 fl oz pesa ~1.5 oz. Aceite: 1 fl oz pesa ~0.8 oz."
        },
        {
          "question": "¿Cuántos mL tiene una cucharada?",
          "answer": "1 cucharada americana = 14.787 mL ≈ 15 mL. 1 cucharadita americana = 4.929 mL ≈ 5 mL. En recetas y medicina, las cucharadas y cucharaditas se redondean comúnmente a 15 mL y 5 mL respectivamente."
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
      "name": "Conversor de OZ para ML",
      "slug": "calculadora-oz-para-ml",
      "subtitle": "Converta onças fluidas para mililitros instantaneamente — essencial para culinária, bebidas, medicamentos e viagens.",
      "breadcrumb": "OZ para ML",
      "seo": {
        "title": "Conversor OZ para ML - Ferramenta Gratuita de Conversão de Volume",
        "description": "Converta onças fluidas para mililitros instantaneamente. Essencial para receitas culinárias, medições de bebidas, dosagem de medicamentos e viagens. Inclui xícaras, litros e tamanhos comuns de garrafas.",
        "shortDescription": "Converta onças fluidas para mililitros instantaneamente.",
        "keywords": [
          "oz para ml",
          "onças para mililitros",
          "fl oz para ml conversor",
          "converter oz para ml",
          "onças fluidas para ml",
          "conversor oz gratuito",
          "volume imperial para métrico"
        ]
      },
      "inputs": {
        "amount": {
          "label": "Volume",
          "helpText": "Digite o valor e selecione a unidade"
        }
      },
      "results": {
        "milliliters": {
          "label": "Mililitros"
        },
        "liters": {
          "label": "Litros"
        },
        "cups": {
          "label": "Xícaras Americanas"
        },
        "tablespoons": {
          "label": "Colheres de Sopa"
        },
        "teaspoons": {
          "label": "Colheres de Chá"
        }
      },
      "presets": {
        "shot": {
          "label": "1,5 fl oz",
          "description": "Dose padrão (44,4 mL)"
        },
        "cup8oz": {
          "label": "8 fl oz",
          "description": "1 xícara americana (236,6 mL)"
        },
        "bottle16": {
          "label": "16,9 fl oz",
          "description": "Garrafa de água padrão (500 mL)"
        }
      },
      "values": {
        "mL": "mL",
        "L": "L",
        "cups": "xícaras",
        "tbsp": "c. sopa",
        "tsp": "c. chá",
        "fl oz": "fl oz"
      },
      "formats": {
        "summary": "{oz} fl oz = {ml} mL"
      },
      "infoCards": {
        "results": {
          "title": "🥤 Resultados da Conversão",
          "items": [
            {
              "label": "Mililitros",
              "valueKey": "milliliters"
            },
            {
              "label": "Litros",
              "valueKey": "liters"
            },
            {
              "label": "Xícaras Americanas",
              "valueKey": "cups"
            },
            {
              "label": "Colheres de Sopa",
              "valueKey": "tablespoons"
            }
          ]
        },
        "quickRef": {
          "title": "📊 Tamanhos Comuns",
          "items": [
            {
              "label": "1 fl oz",
              "valueKey": "ref1"
            },
            {
              "label": "8 fl oz (1 xícara)",
              "valueKey": "ref8"
            },
            {
              "label": "12 fl oz (lata de refrigerante)",
              "valueKey": "ref12"
            },
            {
              "label": "33,8 fl oz (1 litro)",
              "valueKey": "ref34"
            }
          ]
        },
        "tips": {
          "title": "💡 Dicas de Volume",
          "items": [
            "1 fl oz = 29,5735 mL — multiplique oz por 30 para uma estimativa rápida.",
            "Lata de refrigerante padrão: 12 fl oz = 355 mL. Garrafa de água: 16,9 fl oz = 500 mL.",
            "1 xícara americana = 8 fl oz = 236,6 mL (NÃO 250 mL — xícara métrica é diferente).",
            "Medicamentos: 1 colher de chá = 5 mL, 1 colher de sopa = 15 mL = 0,5 fl oz."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Como Converter Onças Fluidas para Mililitros",
          "content": "Para converter onças fluidas americanas para mililitros, multiplique por 29,5735. Uma onça fluida americana equivale a exatamente 29,5735 mL. Nota: uma onça fluida (volume) é diferente de uma onça (peso). Além disso, onças fluidas americanas diferem das onças fluidas britânicas (imperiais) — 1 fl oz britânica = 28,4131 mL. Este conversor usa onças fluidas americanas, que são padrão em receitas americanas, rótulos nutricionais e tamanhos de bebidas. O mililitro (1/1000 de um litro) é usado mundialmente para medições de líquidos."
        },
        "howItWorks": {
          "title": "A Fórmula OZ para ML",
          "content": "A fórmula é: mL = onças fluidas × 29,5735. Para cálculo mental rápido, multiplique por 30 (erro < 1,5%). Para xícaras: 1 xícara americana = 8 fl oz = 236,588 mL (NÃO 250 mL — essa é uma xícara métrica usada na Austrália). Para colheres de sopa: 1 c. sopa = 0,5 fl oz = 14,787 mL. Para colheres de chá: 1 c. chá = 1/6 fl oz = 4,929 mL ≈ 5 mL. Essas relações facilitam a conversão entre medidas culinárias."
        },
        "considerations": {
          "title": "Conversões Comuns de OZ para ML",
          "items": [
            {
              "text": "1 fl oz = 29,57 mL — a conversão fundamental",
              "type": "info"
            },
            {
              "text": "2 fl oz = 59,15 mL — dose dupla de espresso padrão",
              "type": "info"
            },
            {
              "text": "8 fl oz = 236,59 mL — 1 xícara americana",
              "type": "info"
            },
            {
              "text": "12 fl oz = 354,88 mL — lata de refrigerante padrão",
              "type": "info"
            },
            {
              "text": "16 fl oz = 473,18 mL — pinta americana",
              "type": "info"
            },
            {
              "text": "33,814 fl oz = 1.000 mL — 1 litro",
              "type": "info"
            }
          ]
        },
        "drinkSizes": {
          "title": "Tamanhos Comuns de Bebidas (fl oz → mL)",
          "items": [
            {
              "text": "Dose de espresso: 1 fl oz = 30 mL",
              "type": "info"
            },
            {
              "text": "Dose padrão (licor): 1,5 fl oz = 44 mL",
              "type": "info"
            },
            {
              "text": "Caixinha de suco: 6,75 fl oz = 200 mL",
              "type": "info"
            },
            {
              "text": "Lata de refrigerante: 12 fl oz = 355 mL",
              "type": "info"
            },
            {
              "text": "Garrafa de água: 16,9 fl oz = 500 mL",
              "type": "info"
            },
            {
              "text": "Garrafa de vinho: 25,4 fl oz = 750 mL",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemplos de OZ para ML",
          "description": "Conversões passo a passo",
          "examples": [
            {
              "title": "Receita: 3/4 xícara de leite em mL",
              "steps": [
                "3/4 xícara = 6 fl oz",
                "6 × 29,5735 = 177,4 mL",
                "Rápido: 6 × 30 = 180 mL (aproximadamente)",
                "Use 175 mL para uma receita métrica"
              ],
              "result": "3/4 xícara = 6 fl oz = 177,4 mL"
            },
            {
              "title": "Medicamento: 2 colheres de sopa para mL",
              "steps": [
                "1 colher de sopa = 0,5 fl oz",
                "2 colheres de sopa = 1 fl oz",
                "1 × 29,5735 = 29,57 mL",
                "Ou: 2 × 15 mL = 30 mL (dose padrão)"
              ],
              "result": "2 c. sopa = 1 fl oz ≈ 30 mL"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Quantos mL tem 1 fl oz?",
          "answer": "1 onça fluida americana = 29,5735 mL. Para conversões culinárias rápidas, 30 mL é suficientemente próximo (erro < 1,5%). Nota: 1 fl oz britânica (imperial) = 28,4131 mL, ligeiramente menor."
        },
        {
          "question": "Quantas fl oz são 500 mL?",
          "answer": "500 mL = 16,907 fl oz, comumente escrito como 16,9 fl oz. Este é o tamanho padrão de uma garrafa de água nos EUA."
        },
        {
          "question": "Uma xícara americana tem 250 mL?",
          "answer": "Não. Uma xícara americana = 236,588 mL (8 fl oz), NÃO 250 mL. A \"xícara\" de 250 mL é uma xícara métrica usada na Austrália e alguns outros países. Essa diferença de 14 mL pode importar na confeitaria."
        },
        {
          "question": "Como converter fl oz para litros?",
          "answer": "Divida as onças fluidas por 33,814 para obter litros. Exemplo: 64 fl oz (meio galão) = 64 ÷ 33,814 = 1,893 litros. Ou multiplique fl oz por 0,02957 para litros."
        },
        {
          "question": "Qual é a diferença entre fl oz e oz?",
          "answer": "Onças fluidas (fl oz) medem volume (quanto espaço um líquido ocupa). Onças (oz) medem peso/massa. Para a água, são aproximadamente iguais (1 fl oz de água pesa ~1 oz), mas para outros líquidos diferem. Mel: 1 fl oz pesa ~1,5 oz. Óleo: 1 fl oz pesa ~0,8 oz."
        },
        {
          "question": "Quantos mL tem uma colher de sopa?",
          "answer": "1 colher de sopa americana = 14,787 mL ≈ 15 mL. 1 colher de chá americana = 4,929 mL ≈ 5 mL. Em receitas e medicamentos, colheres de sopa e de chá são comumente arredondadas para 15 mL e 5 mL respectivamente."
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
      "name": "Convertisseur OZ vers ML",
      "slug": "calculateur-conversion-onces-millilitres",
      "subtitle": "Convertissez les onces liquides en millilitres instantanément — essentiel pour la cuisine, les boissons, les médicaments et les voyages.",
      "breadcrumb": "OZ vers ML",
      "seo": {
        "title": "Convertisseur OZ vers ML - Outil de Conversion de Volume Gratuit",
        "description": "Convertissez les onces liquides en millilitres instantanément. Essentiel pour les recettes de cuisine, les mesures de boissons, le dosage des médicaments et les voyages. Inclut tasses, litres et tailles de bouteilles communes.",
        "shortDescription": "Convertissez les onces liquides en millilitres instantanément.",
        "keywords": [
          "oz vers ml",
          "onces vers millilitres",
          "convertisseur fl oz vers ml",
          "convertir oz en ml",
          "onces liquides vers ml",
          "convertisseur oz gratuit",
          "volume impérial vers métrique"
        ]
      },
      "inputs": {
        "amount": {
          "label": "Volume",
          "helpText": "Entrez la valeur et sélectionnez l'unité"
        }
      },
      "results": {
        "milliliters": {
          "label": "Millilitres"
        },
        "liters": {
          "label": "Litres"
        },
        "cups": {
          "label": "Tasses US"
        },
        "tablespoons": {
          "label": "Cuillères à soupe"
        },
        "teaspoons": {
          "label": "Cuillères à café"
        }
      },
      "presets": {
        "shot": {
          "label": "1,5 fl oz",
          "description": "Shot standard (44,4 mL)"
        },
        "cup8oz": {
          "label": "8 fl oz",
          "description": "1 tasse US (236,6 mL)"
        },
        "bottle16": {
          "label": "16,9 fl oz",
          "description": "Bouteille d'eau standard (500 mL)"
        }
      },
      "values": {
        "mL": "mL",
        "L": "L",
        "cups": "tasses",
        "tbsp": "c. à s.",
        "tsp": "c. à c.",
        "fl oz": "fl oz"
      },
      "formats": {
        "summary": "{oz} fl oz = {ml} mL"
      },
      "infoCards": {
        "results": {
          "title": "🥤 Résultats de Conversion",
          "items": [
            {
              "label": "Millilitres",
              "valueKey": "milliliters"
            },
            {
              "label": "Litres",
              "valueKey": "liters"
            },
            {
              "label": "Tasses US",
              "valueKey": "cups"
            },
            {
              "label": "Cuillères à soupe",
              "valueKey": "tablespoons"
            }
          ]
        },
        "quickRef": {
          "title": "📊 Tailles Communes",
          "items": [
            {
              "label": "1 fl oz",
              "valueKey": "ref1"
            },
            {
              "label": "8 fl oz (1 tasse)",
              "valueKey": "ref8"
            },
            {
              "label": "12 fl oz (canette de soda)",
              "valueKey": "ref12"
            },
            {
              "label": "33,8 fl oz (1 litre)",
              "valueKey": "ref34"
            }
          ]
        },
        "tips": {
          "title": "💡 Conseils de Volume",
          "items": [
            "1 fl oz = 29,5735 mL — multipliez les oz par 30 pour une estimation rapide.",
            "Canette de soda standard : 12 fl oz = 355 mL. Bouteille d'eau : 16,9 fl oz = 500 mL.",
            "1 tasse US = 8 fl oz = 236,6 mL (PAS 250 mL — la tasse métrique est différente).",
            "Médicament : 1 cuillère à café = 5 mL, 1 cuillère à soupe = 15 mL = 0,5 fl oz."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Comment Convertir les Onces Liquides en Millilitres",
          "content": "Pour convertir les onces liquides US en millilitres, multipliez par 29,5735. Une once liquide US équivaut exactement à 29,5735 mL. Note : une once liquide (volume) est différente d'une once (poids). De plus, les onces liquides US diffèrent des onces liquides UK (impériales) — 1 fl oz UK = 28,4131 mL. Ce convertisseur utilise les onces liquides US, qui sont standard dans les recettes américaines, les étiquettes nutritionnelles et les tailles de boissons. Le millilitre (1/1000 d'un litre) est utilisé mondialement pour les mesures liquides."
        },
        "howItWorks": {
          "title": "La Formule OZ vers ML",
          "content": "La formule est : mL = onces liquides × 29,5735. Pour un calcul mental rapide, multipliez par 30 (erreur < 1,5%). Pour les tasses : 1 tasse US = 8 fl oz = 236,588 mL (PAS 250 mL — c'est une tasse métrique utilisée en Australie). Pour les cuillères à soupe : 1 c. à s. = 0,5 fl oz = 14,787 mL. Pour les cuillères à café : 1 c. à c. = 1/6 fl oz = 4,929 mL ≈ 5 mL. Ces relations facilitent la conversion entre les mesures de cuisine."
        },
        "considerations": {
          "title": "Conversions Communes OZ vers ML",
          "items": [
            {
              "text": "1 fl oz = 29,57 mL — la conversion fondamentale",
              "type": "info"
            },
            {
              "text": "2 fl oz = 59,15 mL — double shot d'espresso standard",
              "type": "info"
            },
            {
              "text": "8 fl oz = 236,59 mL — 1 tasse US",
              "type": "info"
            },
            {
              "text": "12 fl oz = 354,88 mL — canette de soda standard",
              "type": "info"
            },
            {
              "text": "16 fl oz = 473,18 mL — pinte US",
              "type": "info"
            },
            {
              "text": "33,814 fl oz = 1 000 mL — 1 litre",
              "type": "info"
            }
          ]
        },
        "drinkSizes": {
          "title": "Tailles de Boissons Communes (fl oz → mL)",
          "items": [
            {
              "text": "Shot d'espresso : 1 fl oz = 30 mL",
              "type": "info"
            },
            {
              "text": "Shot standard (alcool) : 1,5 fl oz = 44 mL",
              "type": "info"
            },
            {
              "text": "Brique de jus : 6,75 fl oz = 200 mL",
              "type": "info"
            },
            {
              "text": "Canette de soda : 12 fl oz = 355 mL",
              "type": "info"
            },
            {
              "text": "Bouteille d'eau : 16,9 fl oz = 500 mL",
              "type": "info"
            },
            {
              "text": "Bouteille de vin : 25,4 fl oz = 750 mL",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemples OZ vers ML",
          "description": "Conversions étape par étape",
          "examples": [
            {
              "title": "Recette : 3/4 tasse de lait en mL",
              "steps": [
                "3/4 tasse = 6 fl oz",
                "6 × 29,5735 = 177,4 mL",
                "Rapide : 6 × 30 = 180 mL (assez proche)",
                "Utilisez 175 mL pour une recette métrique"
              ],
              "result": "3/4 tasse = 6 fl oz = 177,4 mL"
            },
            {
              "title": "Médicament : 2 cuillères à soupe en mL",
              "steps": [
                "1 cuillère à soupe = 0,5 fl oz",
                "2 cuillères à soupe = 1 fl oz",
                "1 × 29,5735 = 29,57 mL",
                "Ou : 2 × 15 mL = 30 mL (dose standard)"
              ],
              "result": "2 c. à s. = 1 fl oz ≈ 30 mL"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Combien de mL font 1 fl oz ?",
          "answer": "1 once liquide US = 29,5735 mL. Pour des conversions culinaires rapides, 30 mL est assez proche (erreur < 1,5%). Note : 1 fl oz UK (impériale) = 28,4131 mL, légèrement plus petit."
        },
        {
          "question": "Combien de fl oz font 500 mL ?",
          "answer": "500 mL = 16,907 fl oz, communément écrit 16,9 fl oz. C'est la taille standard d'une bouteille d'eau aux États-Unis."
        },
        {
          "question": "Une tasse US fait-elle 250 mL ?",
          "answer": "Non. Une tasse US = 236,588 mL (8 fl oz), PAS 250 mL. La \"tasse\" de 250 mL est une tasse métrique utilisée en Australie et dans certains autres pays. Cette différence de 14 mL peut être importante en pâtisserie."
        },
        {
          "question": "Comment convertir les fl oz en litres ?",
          "answer": "Divisez les onces liquides par 33,814 pour obtenir des litres. Exemple : 64 fl oz (demi-gallon) = 64 ÷ 33,814 = 1,893 litre. Ou multipliez les fl oz par 0,02957 pour les litres."
        },
        {
          "question": "Quelle est la différence entre fl oz et oz ?",
          "answer": "Les onces liquides (fl oz) mesurent le volume (l'espace qu'occupe un liquide). Les onces (oz) mesurent le poids/la masse. Pour l'eau, elles sont approximativement égales (1 fl oz d'eau pèse ~1 oz), mais pour d'autres liquides elles diffèrent. Miel : 1 fl oz pèse ~1,5 oz. Huile : 1 fl oz pèse ~0,8 oz."
        },
        {
          "question": "Combien de mL dans une cuillère à soupe ?",
          "answer": "1 cuillère à soupe US = 14,787 mL ≈ 15 mL. 1 cuillère à café US = 4,929 mL ≈ 5 mL. Dans les recettes et la médecine, les cuillères à soupe et à café sont couramment arrondies à 15 mL et 5 mL respectivement."
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
  },

  inputs: [
    {
      id: "amount",
      type: "number",
      defaultValue: null,
      placeholder: "8",
      min: 0,
      unitType: "volume",
      syncGroup: false,
      defaultUnit: "fl oz",
      allowedUnits: ["mL", "cL", "L", "tsp", "tbsp", "fl oz", "cups", "pt", "qt", "gal"],
    },
  ],

  inputGroups: [],

  results: [
    { id: "milliliters", type: "primary", format: "text" },
    { id: "liters", type: "secondary", format: "text" },
    { id: "cups", type: "secondary", format: "text" },
    { id: "tablespoons", type: "secondary", format: "text" },
    { id: "teaspoons", type: "secondary", format: "text" },
  ],

  infoCards: [
    { id: "results", type: "list", icon: "🥤", itemCount: 4 },
    { id: "quickRef", type: "list", icon: "📊", itemCount: 4 },
    { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  referenceData: [],

  educationSections: [
    { id: "whatIs", type: "prose", icon: "📖" },
    { id: "howItWorks", type: "prose", icon: "⚙️" },
    { id: "considerations", type: "list", icon: "📋", itemCount: 6 },
    { id: "drinkSizes", type: "list", icon: "📊", itemCount: 6 },
    { id: "examples", type: "code-example", icon: "🧮", columns: 2, exampleCount: 2 },
  ],

  faqs: [{ id: "0" }, { id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }],

  references: [
    { authors: "National Institute of Standards and Technology", year: "2024", title: "NIST Handbook 44 — Specifications for Volume", source: "NIST", url: "https://www.nist.gov/pml/owm/metric-si/si-units-volume" },
    { authors: "U.S. Food and Drug Administration", year: "2024", title: "CFR Title 21 — Food Labeling", source: "FDA", url: "https://www.fda.gov/food/food-labeling-nutrition" },
  ],

  hero: { badge: "Conversion", title: "OZ to ML" },
  sidebar: { showConversions: true, showRelated: true },
  features: { showPresets: true, showShare: true, showPrint: true },
  relatedCalculators: ["length-converter", "kg-to-lbs"],
  ads: { showTopBanner: false, showSidebar: true, showBetweenSections: false },
};

// ============================================================================
// CALCULATE
// ============================================================================

function fmtNum(val: number): string {
  if (val === 0) return "0";
  if (Math.abs(val) >= 1e6) return val.toLocaleString("en-US", { maximumFractionDigits: 0 });
  if (Math.abs(val) >= 1000) return val.toLocaleString("en-US", { maximumFractionDigits: 2 });
  if (Math.abs(val) < 0.01) return val.toFixed(4);
  return val.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 4 });
}

export function calculateOzToMl(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits = {} } = data;
  const amount = values.amount as number | null;

  if (amount === null || amount === undefined || amount < 0) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  const fromUnit = fieldUnits.amount || "fl oz";
  // Volume base in registry is L (liters)
  const liters = convertToBase(amount, fromUnit, "volume");

  const mL = liters * 1000;
  const cups = mL / 236.588;
  const tbsp = mL / 14.787;
  const tsp = mL / 4.929;

  return {
    values: { milliliters: mL, liters, cups, tablespoons: tbsp, teaspoons: tsp },
    formatted: {
      milliliters: `${fmtNum(mL)} mL`,
      liters: `${fmtNum(liters)} L`,
      cups: `${fmtNum(cups)} cups`,
      tablespoons: `${fmtNum(tbsp)} tbsp`,
      teaspoons: `${fmtNum(tsp)} tsp`,
      ref1: `${fmtNum(29.5735)} mL`,
      ref8: `${fmtNum(236.588)} mL`,
      ref12: `${fmtNum(354.882)} mL`,
      ref34: `1,000 mL`,
    },
    summary: `${fmtNum(amount)} ${fromUnit} = ${fmtNum(mL)} mL (${fmtNum(liters)} L)`,
    isValid: true,
  };
}

export default ozToMlConverterConfig;
