import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";
import { convertToBase } from "@/engine/v4/units";

// ============================================================================
// INCHES TO MM CONVERTER - V4 (EN ONLY)
// ============================================================================

export const inchesToMmConverterConfig: CalculatorConfigV4 = {
  id: "inches-to-mm",
  version: "4.0",
  category: "conversion",
  icon: "📏",

  presets: [
    { id: "quarter", icon: "🔩", values: { amount: 0.25 } },
    { id: "half", icon: "🔧", values: { amount: 0.5 } },
    { id: "one", icon: "📏", values: { amount: 1 } },
  ],

  t: {
    en: {
      name: "Inches to MM Converter",
      slug: "inches-to-mm",
      subtitle: "Convert inches to millimeters instantly — perfect for engineering, hardware, and precision measurements.",
      breadcrumb: "Inches to MM",

      seo: {
        title: "Inches to MM Converter - Free Inch to Millimeter Tool",
        description: "Convert inches to millimeters instantly. Perfect for engineering, 3D printing, CNC machining, and hardware sizing. Includes fraction-to-mm chart and common sizes.",
        shortDescription: "Convert inches to millimeters instantly.",
        keywords: ["inches to mm", "inches to millimeters", "in to mm converter", "convert inches to mm", "fraction to mm chart", "free inches converter", "imperial to metric mm"],
      },

      calculator: { yourInformation: "Inches to MM" },
      ui: { yourInformation: "Inches to MM", calculate: "Convert", reset: "Reset", results: "Results" },

      inputs: {
        amount: { label: "Measurement", helpText: "Enter value and select unit" },
      },

      results: {
        millimeters: { label: "Millimeters" },
        centimeters: { label: "Centimeters" },
        meters: { label: "Meters" },
        mils: { label: "Mils (thou)" },
      },

      presets: {
        quarter: { label: "1/4 inch", description: "0.25\" = 6.35 mm" },
        half: { label: "1/2 inch", description: "0.5\" = 12.7 mm" },
        one: { label: "1 inch", description: "1\" = 25.4 mm" },
      },

      values: { "mm": "mm", "cm": "cm", "m": "m", "mil": "mil", "in": "in" },
      formats: { summary: "{in} in = {mm} mm" },

      infoCards: {
        results: {
          title: "📏 Conversion Results",
          items: [
            { label: "Millimeters", valueKey: "millimeters" },
            { label: "Centimeters", valueKey: "centimeters" },
            { label: "Meters", valueKey: "meters" },
            { label: "Mils", valueKey: "mils" },
          ],
        },
        quickRef: {
          title: "📊 Fraction to MM",
          items: [
            { label: "1/8\"", valueKey: "ref8th" },
            { label: "1/4\"", valueKey: "ref4th" },
            { label: "1/2\"", valueKey: "refHalf" },
            { label: "3/4\"", valueKey: "ref34" },
          ],
        },
        tips: {
          title: "💡 Precision Tips",
          items: [
            "Multiply inches by 25.4 to get mm — this is an exact conversion.",
            "Common fractions: 1/16\" = 1.588 mm, 1/8\" = 3.175 mm, 1/4\" = 6.35 mm.",
            "Drill bits: #30 = 3.26 mm, 1/8\" = 3.175 mm, #7 = 5.11 mm.",
            "Sheet metal gauge: 18 ga = 1.27 mm, 16 ga = 1.52 mm, 14 ga = 1.90 mm.",
          ],
        },
      },

      education: {
        whatIs: {
          title: "How to Convert Inches to Millimeters",
          content: "To convert inches to millimeters, multiply by 25.4. One inch equals exactly 25.4 millimeters — this is an exact definition, not an approximation. The relationship was established by international agreement in 1959. This conversion is crucial in engineering, manufacturing, hardware sizing, and any field where imperial and metric specifications coexist. Many technical drawings, CNC programs, and 3D printing specifications require mm, while US hardware and construction use inches.",
        },
        howItWorks: {
          title: "The Inches to MM Formula",
          content: "The formula is: millimeters = inches × 25.4. For fractional inches, first convert to decimal: 1/4\" = 0.25, 3/8\" = 0.375, 1/2\" = 0.5, 5/8\" = 0.625, 3/4\" = 0.75. Then multiply by 25.4. Example: 3/8\" × 25.4 = 9.525 mm. For mixed fractions like 2-3/8\": 2.375 × 25.4 = 60.325 mm. The 'mil' or 'thou' (0.001\") is also useful: 1 mil = 0.0254 mm.",
        },
        considerations: {
          title: "Common Inches to MM Conversions",
          items: [
            { text: "1/16\" = 1.5875 mm — smallest common fraction", type: "info" },
            { text: "1/8\" = 3.175 mm — common in hardware and plumbing", type: "info" },
            { text: "1/4\" = 6.35 mm — very common bolt and screw size", type: "info" },
            { text: "3/8\" = 9.525 mm — close to 10mm metric", type: "info" },
            { text: "1/2\" = 12.7 mm — standard pipe and hardware size", type: "info" },
            { text: "1\" = 25.4 mm exactly — the fundamental conversion", type: "info" },
          ],
        },
        drillBits: {
          title: "Drill Bit Size Conversions",
          items: [
            { text: "1/16\" = 1.588 mm — smallest common drill bit", type: "info" },
            { text: "3/32\" = 2.381 mm — fine pilot holes", type: "info" },
            { text: "1/8\" = 3.175 mm — standard pilot hole", type: "info" },
            { text: "3/16\" = 4.763 mm — medium-small holes", type: "info" },
            { text: "1/4\" = 6.350 mm — standard through-holes", type: "info" },
            { text: "3/8\" = 9.525 mm — large through-holes", type: "info" },
          ],
        },
        examples: {
          title: "Inches to MM Examples",
          description: "Step-by-step conversions",
          examples: [
            {
              title: "Convert 3/8\" bolt to mm",
              steps: ["3/8 = 0.375 inches", "0.375 × 25.4 = 9.525 mm", "Closest metric: 10 mm bolt", "Difference: 10 - 9.525 = 0.475 mm", "NOT interchangeable for precision"],
              result: "3/8\" = 9.525 mm (≈ 10 mm metric)",
            },
            {
              title: "Convert 2.5\" pipe diameter to mm",
              steps: ["2.5 × 25.4 = 63.5 mm", "Standard metric pipe: 65 mm", "Or DN65 (nominal diameter)", "2.5\" is a common US pipe size"],
              result: "2.5\" = 63.5 mm",
            },
          ],
        },
      },

      faqs: [
        { question: "How many mm is 1 inch?", answer: "1 inch equals exactly 25.4 millimeters. This is an exact definition established by international agreement in 1959, not an approximation." },
        { question: "How do I convert inch fractions to mm?", answer: "Convert the fraction to decimal first, then multiply by 25.4. Examples: 1/8\" = 0.125 × 25.4 = 3.175 mm. 5/16\" = 0.3125 × 25.4 = 7.938 mm. 3/4\" = 0.75 × 25.4 = 19.05 mm." },
        { question: "Can I use a 10mm wrench on a 3/8\" bolt?", answer: "A 3/8\" bolt is 9.525 mm, so a 10mm wrench is 0.475 mm larger — it may work but can round off bolt heads over time. For precision work, always use the correct size. Metric and imperial wrenches are close but not interchangeable." },
        { question: "What is a mil or thou?", answer: "A mil (also called thou) is 1/1000 of an inch = 0.0254 mm = 25.4 micrometers. It's used in manufacturing, PCB design, and thin material measurements. To convert mils to mm, multiply by 0.0254." },
        { question: "How thick is 1mm in inches?", answer: "1 mm = 0.03937 inches ≈ 1/25 of an inch, or about 39.4 mils. For context, a credit card is about 0.76 mm (0.030\") thick, and a US dime is about 1.35 mm (0.053\") thick." },
        { question: "What are standard drill bit sizes in mm?", answer: "US drill bits come in fractional inches (1/16\" increments), number sizes (#1-80), and letter sizes (A-Z). Common conversions: 1/8\" = 3.175 mm, 1/4\" = 6.35 mm, 3/8\" = 9.525 mm, 1/2\" = 12.7 mm. Metric drill bits go in 0.5mm increments: 3.0, 3.5, 4.0, 4.5, 5.0 mm, etc." },
      ],

      rating: { title: "Rate this Calculator", share: "Share", copied: "Copied!", copyLink: "Copy Link", clickToRate: "Click to rate", youRated: "You rated", stars: "stars", averageFrom: "average from", ratings: "ratings" },
      common: { home: "Home", calculators: "Calculators" },
      buttons: { calculate: "Convert", reset: "Reset", pdf: "PDF", csv: "CSV", excel: "Excel", save: "Save", saved: "Saved", saving: "Saving..." },
      share: { calculatedWith: "Calculated with Kalcufy.com" },
      accessibility: { mobileResults: "Results", closeModal: "Close", openMenu: "Menu" },
      sources: { title: "Sources & References" },
    },
    es: {
      "name": "Convertidor de Pulgadas a MM",
      "slug": "calculadora-pulgadas-milimetros",
      "subtitle": "Convierte pulgadas a milímetros al instante — perfecto para ingeniería, hardware y mediciones de precisión.",
      "breadcrumb": "Pulgadas a MM",
      "seo": {
        "title": "Convertidor de Pulgadas a MM - Herramienta Gratuita de Pulgadas a Milímetros",
        "description": "Convierte pulgadas a milímetros al instante. Perfecto para ingeniería, impresión 3D, mecanizado CNC y dimensionado de hardware. Incluye tabla de fracciones a mm y tamaños comunes.",
        "shortDescription": "Convierte pulgadas a milímetros al instante.",
        "keywords": [
          "pulgadas a mm",
          "pulgadas a milímetros",
          "convertidor pulgadas mm",
          "convertir pulgadas a mm",
          "tabla fracciones mm",
          "convertidor pulgadas gratis",
          "imperial a métrico mm"
        ]
      },
      "inputs": {
        "amount": {
          "label": "Medición",
          "helpText": "Ingrese el valor y seleccione la unidad"
        }
      },
      "results": {
        "millimeters": {
          "label": "Milímetros"
        },
        "centimeters": {
          "label": "Centímetros"
        },
        "meters": {
          "label": "Metros"
        },
        "mils": {
          "label": "Mils (milésimas)"
        }
      },
      "presets": {
        "quarter": {
          "label": "1/4 pulgada",
          "description": "0.25\" = 6.35 mm"
        },
        "half": {
          "label": "1/2 pulgada",
          "description": "0.5\" = 12.7 mm"
        },
        "one": {
          "label": "1 pulgada",
          "description": "1\" = 25.4 mm"
        }
      },
      "values": {
        "mm": "mm",
        "cm": "cm",
        "m": "m",
        "mil": "mil",
        "in": "pulg"
      },
      "formats": {
        "summary": "{in} pulg = {mm} mm"
      },
      "infoCards": {
        "results": {
          "title": "📏 Resultados de Conversión",
          "items": [
            {
              "label": "Milímetros",
              "valueKey": "millimeters"
            },
            {
              "label": "Centímetros",
              "valueKey": "centimeters"
            },
            {
              "label": "Metros",
              "valueKey": "meters"
            },
            {
              "label": "Mils",
              "valueKey": "mils"
            }
          ]
        },
        "quickRef": {
          "title": "📊 Fracciones a MM",
          "items": [
            {
              "label": "1/8\"",
              "valueKey": "ref8th"
            },
            {
              "label": "1/4\"",
              "valueKey": "ref4th"
            },
            {
              "label": "1/2\"",
              "valueKey": "refHalf"
            },
            {
              "label": "3/4\"",
              "valueKey": "ref34"
            }
          ]
        },
        "tips": {
          "title": "💡 Consejos de Precisión",
          "items": [
            "Multiplica pulgadas por 25.4 para obtener mm — esta es una conversión exacta.",
            "Fracciones comunes: 1/16\" = 1.588 mm, 1/8\" = 3.175 mm, 1/4\" = 6.35 mm.",
            "Brocas: #30 = 3.26 mm, 1/8\" = 3.175 mm, #7 = 5.11 mm.",
            "Calibre de chapa: 18 ga = 1.27 mm, 16 ga = 1.52 mm, 14 ga = 1.90 mm."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Cómo Convertir Pulgadas a Milímetros",
          "content": "Para convertir pulgadas a milímetros, multiplica por 25.4. Una pulgada equivale exactamente a 25.4 milímetros — esta es una definición exacta, no una aproximación. La relación fue establecida por acuerdo internacional en 1959. Esta conversión es crucial en ingeniería, manufactura, dimensionado de hardware y cualquier campo donde coexisten especificaciones imperiales y métricas. Muchos dibujos técnicos, programas CNC y especificaciones de impresión 3D requieren mm, mientras que el hardware y construcción de EE.UU. usan pulgadas."
        },
        "howItWorks": {
          "title": "La Fórmula de Pulgadas a MM",
          "content": "La fórmula es: milímetros = pulgadas × 25.4. Para pulgadas fraccionarias, primero convierte a decimal: 1/4\" = 0.25, 3/8\" = 0.375, 1/2\" = 0.5, 5/8\" = 0.625, 3/4\" = 0.75. Luego multiplica por 25.4. Ejemplo: 3/8\" × 25.4 = 9.525 mm. Para fracciones mixtas como 2-3/8\": 2.375 × 25.4 = 60.325 mm. El 'mil' o 'milésima' (0.001\") también es útil: 1 mil = 0.0254 mm."
        },
        "considerations": {
          "title": "Conversiones Comunes de Pulgadas a MM",
          "items": [
            {
              "text": "1/16\" = 1.5875 mm — fracción común más pequeña",
              "type": "info"
            },
            {
              "text": "1/8\" = 3.175 mm — común en hardware y fontanería",
              "type": "info"
            },
            {
              "text": "1/4\" = 6.35 mm — tamaño muy común de pernos y tornillos",
              "type": "info"
            },
            {
              "text": "3/8\" = 9.525 mm — cerca del métrico 10mm",
              "type": "info"
            },
            {
              "text": "1/2\" = 12.7 mm — tamaño estándar de tubería y hardware",
              "type": "info"
            },
            {
              "text": "1\" = 25.4 mm exactamente — la conversión fundamental",
              "type": "info"
            }
          ]
        },
        "drillBits": {
          "title": "Conversiones de Tamaños de Brocas",
          "items": [
            {
              "text": "1/16\" = 1.588 mm — broca común más pequeña",
              "type": "info"
            },
            {
              "text": "3/32\" = 2.381 mm — agujeros piloto finos",
              "type": "info"
            },
            {
              "text": "1/8\" = 3.175 mm — agujero piloto estándar",
              "type": "info"
            },
            {
              "text": "3/16\" = 4.763 mm — agujeros mediano-pequeños",
              "type": "info"
            },
            {
              "text": "1/4\" = 6.350 mm — agujeros pasantes estándar",
              "type": "info"
            },
            {
              "text": "3/8\" = 9.525 mm — agujeros pasantes grandes",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Ejemplos de Pulgadas a MM",
          "description": "Conversiones paso a paso",
          "examples": [
            {
              "title": "Convertir perno de 3/8\" a mm",
              "steps": [
                "3/8 = 0.375 pulgadas",
                "0.375 × 25.4 = 9.525 mm",
                "Métrico más cercano: perno de 10 mm",
                "Diferencia: 10 - 9.525 = 0.475 mm",
                "NO intercambiables para precisión"
              ],
              "result": "3/8\" = 9.525 mm (≈ 10 mm métrico)"
            },
            {
              "title": "Convertir diámetro de tubería de 2.5\" a mm",
              "steps": [
                "2.5 × 25.4 = 63.5 mm",
                "Tubería métrica estándar: 65 mm",
                "O DN65 (diámetro nominal)",
                "2.5\" es un tamaño común de tubería en EE.UU."
              ],
              "result": "2.5\" = 63.5 mm"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "¿Cuántos mm es 1 pulgada?",
          "answer": "1 pulgada equivale exactamente a 25.4 milímetros. Esta es una definición exacta establecida por acuerdo internacional en 1959, no una aproximación."
        },
        {
          "question": "¿Cómo convierto fracciones de pulgada a mm?",
          "answer": "Convierte la fracción a decimal primero, luego multiplica por 25.4. Ejemplos: 1/8\" = 0.125 × 25.4 = 3.175 mm. 5/16\" = 0.3125 × 25.4 = 7.938 mm. 3/4\" = 0.75 × 25.4 = 19.05 mm."
        },
        {
          "question": "¿Puedo usar una llave de 10mm en un perno de 3/8\"?",
          "answer": "Un perno de 3/8\" mide 9.525 mm, así que una llave de 10mm es 0.475 mm más grande — puede funcionar pero puede redondear las cabezas de los pernos con el tiempo. Para trabajo de precisión, siempre usa el tamaño correcto. Las llaves métricas e imperiales están cerca pero no son intercambiables."
        },
        {
          "question": "¿Qué es un mil o milésima?",
          "answer": "Un mil (también llamado milésima) es 1/1000 de pulgada = 0.0254 mm = 25.4 micrómetros. Se usa en manufactura, diseño de PCB y mediciones de materiales delgados. Para convertir mils a mm, multiplica por 0.0254."
        },
        {
          "question": "¿Qué grosor tiene 1mm en pulgadas?",
          "answer": "1 mm = 0.03937 pulgadas ≈ 1/25 de pulgada, o aproximadamente 39.4 mils. Para contexto, una tarjeta de crédito tiene aproximadamente 0.76 mm (0.030\") de grosor, y una moneda de 10 centavos de EE.UU. tiene aproximadamente 1.35 mm (0.053\") de grosor."
        },
        {
          "question": "¿Cuáles son los tamaños estándar de brocas en mm?",
          "answer": "Las brocas de EE.UU. vienen en pulgadas fraccionarias (incrementos de 1/16\"), tamaños numerados (#1-80) y tamaños por letras (A-Z). Conversiones comunes: 1/8\" = 3.175 mm, 1/4\" = 6.35 mm, 3/8\" = 9.525 mm, 1/2\" = 12.7 mm. Las brocas métricas van en incrementos de 0.5mm: 3.0, 3.5, 4.0, 4.5, 5.0 mm, etc."
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
      "name": "Conversor de Polegadas para MM",
      "slug": "calculadora-polegadas-para-milimetros",
      "subtitle": "Converta polegadas para milímetros instantaneamente — perfeito para engenharia, ferramentas e medições de precisão.",
      "breadcrumb": "Polegadas para MM",
      "seo": {
        "title": "Conversor de Polegadas para MM - Ferramenta Gratuita de Polegada para Milímetro",
        "description": "Converta polegadas para milímetros instantaneamente. Perfeito para engenharia, impressão 3D, usinagem CNC e dimensionamento de ferramentas. Inclui tabela de frações para mm e tamanhos comuns.",
        "shortDescription": "Converta polegadas para milímetros instantaneamente.",
        "keywords": [
          "polegadas para mm",
          "polegadas para milímetros",
          "conversor pol para mm",
          "converter polegadas para mm",
          "tabela fração para mm",
          "conversor polegadas grátis",
          "imperial para métrico mm"
        ]
      },
      "inputs": {
        "amount": {
          "label": "Medição",
          "helpText": "Digite o valor e selecione a unidade"
        }
      },
      "results": {
        "millimeters": {
          "label": "Milímetros"
        },
        "centimeters": {
          "label": "Centímetros"
        },
        "meters": {
          "label": "Metros"
        },
        "mils": {
          "label": "Mils (thou)"
        }
      },
      "presets": {
        "quarter": {
          "label": "1/4 polegada",
          "description": "0,25\" = 6,35 mm"
        },
        "half": {
          "label": "1/2 polegada",
          "description": "0,5\" = 12,7 mm"
        },
        "one": {
          "label": "1 polegada",
          "description": "1\" = 25,4 mm"
        }
      },
      "values": {
        "mm": "mm",
        "cm": "cm",
        "m": "m",
        "mil": "mil",
        "in": "pol"
      },
      "formats": {
        "summary": "{in} pol = {mm} mm"
      },
      "infoCards": {
        "results": {
          "title": "📏 Resultados da Conversão",
          "items": [
            {
              "label": "Milímetros",
              "valueKey": "millimeters"
            },
            {
              "label": "Centímetros",
              "valueKey": "centimeters"
            },
            {
              "label": "Metros",
              "valueKey": "meters"
            },
            {
              "label": "Mils",
              "valueKey": "mils"
            }
          ]
        },
        "quickRef": {
          "title": "📊 Fração para MM",
          "items": [
            {
              "label": "1/8\"",
              "valueKey": "ref8th"
            },
            {
              "label": "1/4\"",
              "valueKey": "ref4th"
            },
            {
              "label": "1/2\"",
              "valueKey": "refHalf"
            },
            {
              "label": "3/4\"",
              "valueKey": "ref34"
            }
          ]
        },
        "tips": {
          "title": "💡 Dicas de Precisão",
          "items": [
            "Multiplique polegadas por 25,4 para obter mm — esta é uma conversão exata.",
            "Frações comuns: 1/16\" = 1,588 mm, 1/8\" = 3,175 mm, 1/4\" = 6,35 mm.",
            "Brocas: #30 = 3,26 mm, 1/8\" = 3,175 mm, #7 = 5,11 mm.",
            "Bitola de chapa metálica: 18 ga = 1,27 mm, 16 ga = 1,52 mm, 14 ga = 1,90 mm."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Como Converter Polegadas para Milímetros",
          "content": "Para converter polegadas para milímetros, multiplique por 25,4. Uma polegada equivale exatamente a 25,4 milímetros — esta é uma definição exata, não uma aproximação. A relação foi estabelecida por acordo internacional em 1959. Esta conversão é crucial em engenharia, manufatura, dimensionamento de ferramentas e qualquer área onde especificações imperiais e métricas coexistem. Muitos desenhos técnicos, programas CNC e especificações de impressão 3D requerem mm, enquanto ferramentas e construção americanas usam polegadas."
        },
        "howItWorks": {
          "title": "A Fórmula de Polegadas para MM",
          "content": "A fórmula é: milímetros = polegadas × 25,4. Para polegadas fracionárias, primeiro converta para decimal: 1/4\" = 0,25, 3/8\" = 0,375, 1/2\" = 0,5, 5/8\" = 0,625, 3/4\" = 0,75. Depois multiplique por 25,4. Exemplo: 3/8\" × 25,4 = 9,525 mm. Para frações mistas como 2-3/8\": 2,375 × 25,4 = 60,325 mm. O 'mil' ou 'thou' (0,001\") também é útil: 1 mil = 0,0254 mm."
        },
        "considerations": {
          "title": "Conversões Comuns de Polegadas para MM",
          "items": [
            {
              "text": "1/16\" = 1,5875 mm — menor fração comum",
              "type": "info"
            },
            {
              "text": "1/8\" = 3,175 mm — comum em ferramentas e encanamento",
              "type": "info"
            },
            {
              "text": "1/4\" = 6,35 mm — tamanho muito comum de parafusos",
              "type": "info"
            },
            {
              "text": "3/8\" = 9,525 mm — próximo ao métrico 10mm",
              "type": "info"
            },
            {
              "text": "1/2\" = 12,7 mm — tamanho padrão de tubos e ferramentas",
              "type": "info"
            },
            {
              "text": "1\" = 25,4 mm exatamente — a conversão fundamental",
              "type": "info"
            }
          ]
        },
        "drillBits": {
          "title": "Conversões de Tamanho de Broca",
          "items": [
            {
              "text": "1/16\" = 1,588 mm — menor broca comum",
              "type": "info"
            },
            {
              "text": "3/32\" = 2,381 mm — furos piloto finos",
              "type": "info"
            },
            {
              "text": "1/8\" = 3,175 mm — furo piloto padrão",
              "type": "info"
            },
            {
              "text": "3/16\" = 4,763 mm — furos médio-pequenos",
              "type": "info"
            },
            {
              "text": "1/4\" = 6,350 mm — furos passantes padrão",
              "type": "info"
            },
            {
              "text": "3/8\" = 9,525 mm — furos passantes grandes",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemplos de Polegadas para MM",
          "description": "Conversões passo a passo",
          "examples": [
            {
              "title": "Converter parafuso 3/8\" para mm",
              "steps": [
                "3/8 = 0,375 polegadas",
                "0,375 × 25,4 = 9,525 mm",
                "Métrico mais próximo: parafuso 10 mm",
                "Diferença: 10 - 9,525 = 0,475 mm",
                "NÃO são intercambiáveis para precisão"
              ],
              "result": "3/8\" = 9,525 mm (≈ 10 mm métrico)"
            },
            {
              "title": "Converter diâmetro de tubo 2,5\" para mm",
              "steps": [
                "2,5 × 25,4 = 63,5 mm",
                "Tubo métrico padrão: 65 mm",
                "Ou DN65 (diâmetro nominal)",
                "2,5\" é um tamanho comum de tubo americano"
              ],
              "result": "2,5\" = 63,5 mm"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Quantos mm tem 1 polegada?",
          "answer": "1 polegada equivale exatamente a 25,4 milímetros. Esta é uma definição exata estabelecida por acordo internacional em 1959, não uma aproximação."
        },
        {
          "question": "Como converter frações de polegada para mm?",
          "answer": "Converta primeiro a fração para decimal, depois multiplique por 25,4. Exemplos: 1/8\" = 0,125 × 25,4 = 3,175 mm. 5/16\" = 0,3125 × 25,4 = 7,938 mm. 3/4\" = 0,75 × 25,4 = 19,05 mm."
        },
        {
          "question": "Posso usar uma chave de 10mm em um parafuso de 3/8\"?",
          "answer": "Um parafuso de 3/8\" tem 9,525 mm, então uma chave de 10mm é 0,475 mm maior — pode funcionar mas pode arredondar as cabeças dos parafusos com o tempo. Para trabalho de precisão, sempre use o tamanho correto. Chaves métricas e imperiais são próximas mas não intercambiáveis."
        },
        {
          "question": "O que é um mil ou thou?",
          "answer": "Um mil (também chamado thou) é 1/1000 de polegada = 0,0254 mm = 25,4 micrômetros. É usado em manufatura, design de PCB e medições de materiais finos. Para converter mils para mm, multiplique por 0,0254."
        },
        {
          "question": "Qual a espessura de 1mm em polegadas?",
          "answer": "1 mm = 0,03937 polegadas ≈ 1/25 de polegada, ou cerca de 39,4 mils. Para contexto, um cartão de crédito tem cerca de 0,76 mm (0,030\") de espessura, e uma moeda de 10 centavos americanos tem cerca de 1,35 mm (0,053\") de espessura."
        },
        {
          "question": "Quais são os tamanhos padrão de broca em mm?",
          "answer": "Brocas americanas vêm em polegadas fracionárias (incrementos de 1/16\"), tamanhos numéricos (#1-80) e tamanhos por letra (A-Z). Conversões comuns: 1/8\" = 3,175 mm, 1/4\" = 6,35 mm, 3/8\" = 9,525 mm, 1/2\" = 12,7 mm. Brocas métricas vão em incrementos de 0,5mm: 3,0, 3,5, 4,0, 4,5, 5,0 mm, etc."
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
      "name": "Convertisseur Pouces vers MM",
      "slug": "calculateur-pouces-vers-millimetres",
      "subtitle": "Convertissez les pouces en millimètres instantanément — parfait pour l'ingénierie, la quincaillerie et les mesures de précision.",
      "breadcrumb": "Pouces vers MM",
      "seo": {
        "title": "Convertisseur Pouces vers MM - Outil Gratuit Pouce vers Millimètre",
        "description": "Convertissez les pouces en millimètres instantanément. Parfait pour l'ingénierie, l'impression 3D, l'usinage CNC et le dimensionnement de quincaillerie. Inclut un tableau fraction-vers-mm et les tailles communes.",
        "shortDescription": "Convertissez les pouces en millimètres instantanément.",
        "keywords": [
          "pouces vers mm",
          "pouces vers millimètres",
          "convertisseur pouce vers mm",
          "convertir pouces en mm",
          "tableau fraction vers mm",
          "convertisseur pouces gratuit",
          "impérial vers métrique mm"
        ]
      },
      "inputs": {
        "amount": {
          "label": "Mesure",
          "helpText": "Entrez la valeur et sélectionnez l'unité"
        }
      },
      "results": {
        "millimeters": {
          "label": "Millimètres"
        },
        "centimeters": {
          "label": "Centimètres"
        },
        "meters": {
          "label": "Mètres"
        },
        "mils": {
          "label": "Mils (thou)"
        }
      },
      "presets": {
        "quarter": {
          "label": "1/4 pouce",
          "description": "0,25\" = 6,35 mm"
        },
        "half": {
          "label": "1/2 pouce",
          "description": "0,5\" = 12,7 mm"
        },
        "one": {
          "label": "1 pouce",
          "description": "1\" = 25,4 mm"
        }
      },
      "values": {
        "mm": "mm",
        "cm": "cm",
        "m": "m",
        "mil": "mil",
        "in": "po"
      },
      "formats": {
        "summary": "{in} po = {mm} mm"
      },
      "infoCards": {
        "results": {
          "title": "📏 Résultats de Conversion",
          "items": [
            {
              "label": "Millimètres",
              "valueKey": "millimeters"
            },
            {
              "label": "Centimètres",
              "valueKey": "centimeters"
            },
            {
              "label": "Mètres",
              "valueKey": "meters"
            },
            {
              "label": "Mils",
              "valueKey": "mils"
            }
          ]
        },
        "quickRef": {
          "title": "📊 Fraction vers MM",
          "items": [
            {
              "label": "1/8\"",
              "valueKey": "ref8th"
            },
            {
              "label": "1/4\"",
              "valueKey": "ref4th"
            },
            {
              "label": "1/2\"",
              "valueKey": "refHalf"
            },
            {
              "label": "3/4\"",
              "valueKey": "ref34"
            }
          ]
        },
        "tips": {
          "title": "💡 Conseils de Précision",
          "items": [
            "Multipliez les pouces par 25,4 pour obtenir les mm — c'est une conversion exacte.",
            "Fractions courantes : 1/16\" = 1,588 mm, 1/8\" = 3,175 mm, 1/4\" = 6,35 mm.",
            "Forets : #30 = 3,26 mm, 1/8\" = 3,175 mm, #7 = 5,11 mm.",
            "Jauge de tôle : 18 ga = 1,27 mm, 16 ga = 1,52 mm, 14 ga = 1,90 mm."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Comment Convertir les Pouces en Millimètres",
          "content": "Pour convertir les pouces en millimètres, multipliez par 25,4. Un pouce équivaut exactement à 25,4 millimètres — c'est une définition exacte, pas une approximation. Cette relation a été établie par accord international en 1959. Cette conversion est cruciale en ingénierie, fabrication, dimensionnement de quincaillerie et dans tout domaine où les spécifications impériales et métriques coexistent. De nombreux dessins techniques, programmes CNC et spécifications d'impression 3D nécessitent des mm, tandis que la quincaillerie et la construction américaines utilisent les pouces."
        },
        "howItWorks": {
          "title": "La Formule Pouces vers MM",
          "content": "La formule est : millimètres = pouces × 25,4. Pour les pouces fractionnaires, convertissez d'abord en décimal : 1/4\" = 0,25, 3/8\" = 0,375, 1/2\" = 0,5, 5/8\" = 0,625, 3/4\" = 0,75. Puis multipliez par 25,4. Exemple : 3/8\" × 25,4 = 9,525 mm. Pour les fractions mixtes comme 2-3/8\" : 2,375 × 25,4 = 60,325 mm. Le 'mil' ou 'thou' (0,001\") est aussi utile : 1 mil = 0,0254 mm."
        },
        "considerations": {
          "title": "Conversions Courantes Pouces vers MM",
          "items": [
            {
              "text": "1/16\" = 1,5875 mm — plus petite fraction courante",
              "type": "info"
            },
            {
              "text": "1/8\" = 3,175 mm — courant en quincaillerie et plomberie",
              "type": "info"
            },
            {
              "text": "1/4\" = 6,35 mm — taille très courante de boulons et vis",
              "type": "info"
            },
            {
              "text": "3/8\" = 9,525 mm — proche du métrique 10mm",
              "type": "info"
            },
            {
              "text": "1/2\" = 12,7 mm — taille standard de tuyau et quincaillerie",
              "type": "info"
            },
            {
              "text": "1\" = 25,4 mm exactement — la conversion fondamentale",
              "type": "info"
            }
          ]
        },
        "drillBits": {
          "title": "Conversions de Tailles de Forets",
          "items": [
            {
              "text": "1/16\" = 1,588 mm — plus petit foret courant",
              "type": "info"
            },
            {
              "text": "3/32\" = 2,381 mm — trous pilotes fins",
              "type": "info"
            },
            {
              "text": "1/8\" = 3,175 mm — trou pilote standard",
              "type": "info"
            },
            {
              "text": "3/16\" = 4,763 mm — trous moyens-petits",
              "type": "info"
            },
            {
              "text": "1/4\" = 6,350 mm — trous traversants standard",
              "type": "info"
            },
            {
              "text": "3/8\" = 9,525 mm — gros trous traversants",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemples Pouces vers MM",
          "description": "Conversions étape par étape",
          "examples": [
            {
              "title": "Convertir boulon 3/8\" en mm",
              "steps": [
                "3/8 = 0,375 pouces",
                "0,375 × 25,4 = 9,525 mm",
                "Métrique le plus proche : boulon 10 mm",
                "Différence : 10 - 9,525 = 0,475 mm",
                "NON interchangeable pour la précision"
              ],
              "result": "3/8\" = 9,525 mm (≈ 10 mm métrique)"
            },
            {
              "title": "Convertir diamètre tuyau 2,5\" en mm",
              "steps": [
                "2,5 × 25,4 = 63,5 mm",
                "Tuyau métrique standard : 65 mm",
                "Ou DN65 (diamètre nominal)",
                "2,5\" est une taille courante de tuyau US"
              ],
              "result": "2,5\" = 63,5 mm"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Combien de mm fait 1 pouce ?",
          "answer": "1 pouce équivaut exactement à 25,4 millimètres. C'est une définition exacte établie par accord international en 1959, pas une approximation."
        },
        {
          "question": "Comment convertir les fractions de pouce en mm ?",
          "answer": "Convertissez d'abord la fraction en décimal, puis multipliez par 25,4. Exemples : 1/8\" = 0,125 × 25,4 = 3,175 mm. 5/16\" = 0,3125 × 25,4 = 7,938 mm. 3/4\" = 0,75 × 25,4 = 19,05 mm."
        },
        {
          "question": "Puis-je utiliser une clé de 10mm sur un boulon 3/8\" ?",
          "answer": "Un boulon 3/8\" fait 9,525 mm, donc une clé de 10mm est 0,475 mm plus grande — cela peut fonctionner mais peut arrondir les têtes de boulon avec le temps. Pour un travail de précision, utilisez toujours la bonne taille. Les clés métriques et impériales sont proches mais pas interchangeables."
        },
        {
          "question": "Qu'est-ce qu'un mil ou thou ?",
          "answer": "Un mil (aussi appelé thou) est 1/1000 de pouce = 0,0254 mm = 25,4 micromètres. Il est utilisé en fabrication, conception de PCB et mesures de matériaux fins. Pour convertir les mils en mm, multipliez par 0,0254."
        },
        {
          "question": "Quelle épaisseur fait 1mm en pouces ?",
          "answer": "1 mm = 0,03937 pouces ≈ 1/25 de pouce, ou environ 39,4 mils. Pour contexte, une carte de crédit fait environ 0,76 mm (0,030\") d'épaisseur, et une pièce de 10 cents US fait environ 1,35 mm (0,053\") d'épaisseur."
        },
        {
          "question": "Quelles sont les tailles standard de forets en mm ?",
          "answer": "Les forets US viennent en fractions de pouce (incréments de 1/16\"), tailles numérotées (#1-80) et tailles lettrées (A-Z). Conversions courantes : 1/8\" = 3,175 mm, 1/4\" = 6,35 mm, 3/8\" = 9,525 mm, 1/2\" = 12,7 mm. Les forets métriques vont par incréments de 0,5mm : 3,0, 3,5, 4,0, 4,5, 5,0 mm, etc."
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
      "name": "Zoll zu MM Umrechner",
      "slug": "zoll-zu-mm-rechner",
      "subtitle": "Zoll sofort in Millimeter umrechnen — perfekt für Technik, Hardware und Präzisionsmessungen.",
      "breadcrumb": "Zoll zu MM",
      "seo": {
        "title": "Zoll zu MM Umrechner - Kostenloses Zoll zu Millimeter Tool",
        "description": "Zoll sofort in Millimeter umrechnen. Perfekt für Technik, 3D-Druck, CNC-Bearbeitung und Hardware-Dimensionierung. Enthält Bruch-zu-mm-Tabelle und gängige Größen.",
        "shortDescription": "Zoll sofort in Millimeter umrechnen.",
        "keywords": [
          "zoll zu mm",
          "zoll zu millimeter",
          "zoll mm umrechner",
          "zoll in mm umrechnen",
          "bruch zu mm tabelle",
          "kostenloser zoll umrechner",
          "imperial zu metrisch mm"
        ]
      },
      "inputs": {
        "amount": {
          "label": "Messwert",
          "helpText": "Wert eingeben und Einheit wählen"
        }
      },
      "results": {
        "millimeters": {
          "label": "Millimeter"
        },
        "centimeters": {
          "label": "Zentimeter"
        },
        "meters": {
          "label": "Meter"
        },
        "mils": {
          "label": "Mils (thou)"
        }
      },
      "presets": {
        "quarter": {
          "label": "1/4 Zoll",
          "description": "0,25\" = 6,35 mm"
        },
        "half": {
          "label": "1/2 Zoll",
          "description": "0,5\" = 12,7 mm"
        },
        "one": {
          "label": "1 Zoll",
          "description": "1\" = 25,4 mm"
        }
      },
      "values": {
        "mm": "mm",
        "cm": "cm",
        "m": "m",
        "mil": "mil",
        "in": "Zoll"
      },
      "formats": {
        "summary": "{in} Zoll = {mm} mm"
      },
      "infoCards": {
        "results": {
          "title": "📏 Umrechnungsergebnisse",
          "items": [
            {
              "label": "Millimeter",
              "valueKey": "millimeters"
            },
            {
              "label": "Zentimeter",
              "valueKey": "centimeters"
            },
            {
              "label": "Meter",
              "valueKey": "meters"
            },
            {
              "label": "Mils",
              "valueKey": "mils"
            }
          ]
        },
        "quickRef": {
          "title": "📊 Bruch zu MM",
          "items": [
            {
              "label": "1/8\"",
              "valueKey": "ref8th"
            },
            {
              "label": "1/4\"",
              "valueKey": "ref4th"
            },
            {
              "label": "1/2\"",
              "valueKey": "refHalf"
            },
            {
              "label": "3/4\"",
              "valueKey": "ref34"
            }
          ]
        },
        "tips": {
          "title": "💡 Präzisions-Tipps",
          "items": [
            "Multipliziere Zoll mit 25,4 um mm zu erhalten — das ist eine exakte Umrechnung.",
            "Gängige Brüche: 1/16\" = 1,588 mm, 1/8\" = 3,175 mm, 1/4\" = 6,35 mm.",
            "Bohrer: #30 = 3,26 mm, 1/8\" = 3,175 mm, #7 = 5,11 mm.",
            "Blechstärke: 18 ga = 1,27 mm, 16 ga = 1,52 mm, 14 ga = 1,90 mm."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Wie man Zoll in Millimeter umrechnet",
          "content": "Um Zoll in Millimeter umzurechnen, multipliziere mit 25,4. Ein Zoll entspricht genau 25,4 Millimetern — das ist eine exakte Definition, keine Näherung. Diese Beziehung wurde 1959 durch internationale Vereinbarung festgelegt. Diese Umrechnung ist entscheidend in der Technik, Fertigung, Hardware-Dimensionierung und jedem Bereich, wo imperiale und metrische Spezifikationen koexistieren. Viele technische Zeichnungen, CNC-Programme und 3D-Druckspezifikationen benötigen mm, während US-Hardware und -Bau Zoll verwenden."
        },
        "howItWorks": {
          "title": "Die Zoll zu MM Formel",
          "content": "Die Formel lautet: Millimeter = Zoll × 25,4. Bei Bruchzoll erst in Dezimalzahl umwandeln: 1/4\" = 0,25, 3/8\" = 0,375, 1/2\" = 0,5, 5/8\" = 0,625, 3/4\" = 0,75. Dann mit 25,4 multiplizieren. Beispiel: 3/8\" × 25,4 = 9,525 mm. Bei gemischten Brüchen wie 2-3/8\": 2,375 × 25,4 = 60,325 mm. Das 'mil' oder 'thou' (0,001\") ist ebenfalls nützlich: 1 mil = 0,0254 mm."
        },
        "considerations": {
          "title": "Gängige Zoll zu MM Umrechnungen",
          "items": [
            {
              "text": "1/16\" = 1,5875 mm — kleinster gängiger Bruch",
              "type": "info"
            },
            {
              "text": "1/8\" = 3,175 mm — gängig bei Hardware und Sanitär",
              "type": "info"
            },
            {
              "text": "1/4\" = 6,35 mm — sehr gängige Schrauben- und Bolzengröße",
              "type": "info"
            },
            {
              "text": "3/8\" = 9,525 mm — nah an 10mm metrisch",
              "type": "info"
            },
            {
              "text": "1/2\" = 12,7 mm — Standard-Rohr- und Hardware-Größe",
              "type": "info"
            },
            {
              "text": "1\" = 25,4 mm genau — die grundlegende Umrechnung",
              "type": "info"
            }
          ]
        },
        "drillBits": {
          "title": "Bohrer-Größen Umrechnungen",
          "items": [
            {
              "text": "1/16\" = 1,588 mm — kleinster gängiger Bohrer",
              "type": "info"
            },
            {
              "text": "3/32\" = 2,381 mm — feine Pilotlöcher",
              "type": "info"
            },
            {
              "text": "1/8\" = 3,175 mm — Standard-Pilotloch",
              "type": "info"
            },
            {
              "text": "3/16\" = 4,763 mm — mittel-kleine Löcher",
              "type": "info"
            },
            {
              "text": "1/4\" = 6,350 mm — Standard-Durchgangslöcher",
              "type": "info"
            },
            {
              "text": "3/8\" = 9,525 mm — große Durchgangslöcher",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Zoll zu MM Beispiele",
          "description": "Schritt-für-Schritt Umrechnungen",
          "examples": [
            {
              "title": "3/8\" Schraube in mm umrechnen",
              "steps": [
                "3/8 = 0,375 Zoll",
                "0,375 × 25,4 = 9,525 mm",
                "Nächste metrische Größe: 10 mm Schraube",
                "Unterschied: 10 - 9,525 = 0,475 mm",
                "NICHT austauschbar bei Präzisionsarbeiten"
              ],
              "result": "3/8\" = 9,525 mm (≈ 10 mm metrisch)"
            },
            {
              "title": "2,5\" Rohrdurchmesser in mm umrechnen",
              "steps": [
                "2,5 × 25,4 = 63,5 mm",
                "Standard-Metrikrohr: 65 mm",
                "Oder DN65 (Nenndurchmesser)",
                "2,5\" ist eine gängige US-Rohrgröße"
              ],
              "result": "2,5\" = 63,5 mm"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Wie viele mm ist 1 Zoll?",
          "answer": "1 Zoll entspricht genau 25,4 Millimetern. Das ist eine exakte Definition, die 1959 durch internationale Vereinbarung festgelegt wurde, keine Näherung."
        },
        {
          "question": "Wie rechne ich Zoll-Brüche in mm um?",
          "answer": "Wandle den Bruch zuerst in eine Dezimalzahl um, dann multipliziere mit 25,4. Beispiele: 1/8\" = 0,125 × 25,4 = 3,175 mm. 5/16\" = 0,3125 × 25,4 = 7,938 mm. 3/4\" = 0,75 × 25,4 = 19,05 mm."
        },
        {
          "question": "Kann ich einen 10mm Schlüssel für eine 3/8\" Schraube verwenden?",
          "answer": "Eine 3/8\" Schraube ist 9,525 mm, also ist ein 10mm Schlüssel 0,475 mm größer — er könnte funktionieren, kann aber über Zeit Schraubenköpfe abrunden. Bei Präzisionsarbeiten immer die korrekte Größe verwenden. Metrische und imperiale Schlüssel sind ähnlich, aber nicht austauschbar."
        },
        {
          "question": "Was ist ein mil oder thou?",
          "answer": "Ein mil (auch thou genannt) ist 1/1000 Zoll = 0,0254 mm = 25,4 Mikrometer. Es wird in der Fertigung, PCB-Design und bei dünnen Materialmessungen verwendet. Um mils in mm umzurechnen, multipliziere mit 0,0254."
        },
        {
          "question": "Wie dick ist 1mm in Zoll?",
          "answer": "1 mm = 0,03937 Zoll ≈ 1/25 Zoll, oder etwa 39,4 mils. Zum Vergleich: eine Kreditkarte ist etwa 0,76 mm (0,030\") dick, und eine US-Dime ist etwa 1,35 mm (0,053\") dick."
        },
        {
          "question": "Was sind Standard-Bohrergrößen in mm?",
          "answer": "US-Bohrer gibt es in Bruchzoll (1/16\" Stufen), Nummerngrößen (#1-80) und Buchstabengrößen (A-Z). Gängige Umrechnungen: 1/8\" = 3,175 mm, 1/4\" = 6,35 mm, 3/8\" = 9,525 mm, 1/2\" = 12,7 mm. Metrische Bohrer gibt es in 0,5mm Stufen: 3,0, 3,5, 4,0, 4,5, 5,0 mm, etc."
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
      id: "amount",
      type: "number",
      defaultValue: null,
      placeholder: "1",
      min: 0,
      unitType: "length_small",
      syncGroup: false,
      defaultUnit: "in",
    },
  ],

  inputGroups: [],

  results: [
    { id: "millimeters", type: "primary", format: "text" },
    { id: "centimeters", type: "secondary", format: "text" },
    { id: "meters", type: "secondary", format: "text" },
    { id: "mils", type: "secondary", format: "text" },
  ],

  infoCards: [
    { id: "results", type: "list", icon: "📏", itemCount: 4 },
    { id: "quickRef", type: "list", icon: "📊", itemCount: 4 },
    { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  referenceData: [],

  educationSections: [
    { id: "whatIs", type: "prose", icon: "📖" },
    { id: "howItWorks", type: "prose", icon: "⚙️" },
    { id: "considerations", type: "list", icon: "📋", itemCount: 6 },
    { id: "drillBits", type: "list", icon: "📊", itemCount: 6 },
    { id: "examples", type: "code-example", icon: "🧮", columns: 2, exampleCount: 2 },
  ],

  faqs: [{ id: "0" }, { id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }],

  references: [
    { authors: "National Institute of Standards and Technology", year: "2024", title: "NIST Handbook 44 — Specifications for Length", source: "NIST", url: "https://www.nist.gov/pml/owm/metric-si/si-units-length" },
    { authors: "ISO", year: "2023", title: "ISO 80000-3 — Quantities and Units: Space and Time", source: "ISO", url: "https://www.iso.org/standard/64974.html" },
  ],

  hero: { badge: "Conversion", title: "Inches to MM" },
  sidebar: { showConversions: true, showRelated: true },
  features: { showPresets: true, showShare: true, showPrint: true },
  relatedCalculators: ["mm-to-inches", "inches-to-cm", "length-converter"],
  ads: { showTopBanner: false, showSidebar: true, showBetweenSections: false },
};

// ============================================================================
// CALCULATE
// ============================================================================

function fmtNum(val: number): string {
  if (val === 0) return "0";
  if (Math.abs(val) >= 1e6) return val.toLocaleString("en-US", { maximumFractionDigits: 0 });
  if (Math.abs(val) >= 1000) return val.toLocaleString("en-US", { maximumFractionDigits: 2 });
  if (Math.abs(val) < 0.001) return val.toExponential(3);
  if (Math.abs(val) < 0.01) return val.toFixed(4);
  return val.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 4 });
}

export function calculateInchesToMm(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits = {} } = data;
  const amount = values.amount as number | null;

  if (amount === null || amount === undefined || amount < 0) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  const fromUnit = fieldUnits.amount || "in";
  const mm = convertToBase(amount, fromUnit, "length_small");

  const cm = mm / 10;
  const meters = mm / 1000;
  const inches = mm / 25.4;
  const mils = inches * 1000;

  const ref8th = (1 / 8) * 25.4;
  const ref4th = (1 / 4) * 25.4;
  const refHalf = (1 / 2) * 25.4;
  const ref34 = (3 / 4) * 25.4;

  return {
    values: { millimeters: mm, centimeters: cm, meters, mils },
    formatted: {
      millimeters: `${fmtNum(mm)} mm`,
      centimeters: `${fmtNum(cm)} cm`,
      meters: `${fmtNum(meters)} m`,
      mils: `${fmtNum(mils)} mil`,
      ref8th: `${fmtNum(ref8th)} mm`,
      ref4th: `${fmtNum(ref4th)} mm`,
      refHalf: `${fmtNum(refHalf)} mm`,
      ref34: `${fmtNum(ref34)} mm`,
    },
    summary: `${fmtNum(amount)} ${fromUnit} = ${fmtNum(mm)} mm`,
    isValid: true,
  };
}

export default inchesToMmConverterConfig;
