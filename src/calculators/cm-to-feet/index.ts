import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";
import { convertToBase } from "@/engine/v4/units";

// ============================================================================
// CM TO FEET CONVERTER - V4 (EN ONLY)
// ============================================================================

export const cmToFeetConverterConfig: CalculatorConfigV4 = {
  id: "cm-to-feet",
  version: "4.0",
  category: "conversion",
  icon: "📏",

  presets: [
    { id: "height160", icon: "👩", values: { amount: 160 } },
    { id: "height175", icon: "🧑", values: { amount: 175 } },
    { id: "height190", icon: "🧑‍🦱", values: { amount: 190 } },
  ],

  t: {
    en: {
      name: "CM to Feet Converter",
      slug: "cm-to-feet",
      subtitle: "Convert centimeters to feet and inches instantly — perfect for height conversions and measurements.",
      breadcrumb: "CM to Feet",

      seo: {
        title: "CM to Feet Converter - Free Height Conversion Tool",
        description: "Convert centimeters to feet and inches instantly. Perfect for height conversions, international measurements, and everyday use. Includes height chart and reference table.",
        shortDescription: "Convert cm to feet and inches instantly.",
        keywords: ["cm to feet", "cm to ft converter", "centimeters to feet", "height converter cm to feet", "cm to feet and inches", "free cm converter", "metric to imperial height"],
      },

      calculator: { yourInformation: "CM to Feet" },
      ui: { yourInformation: "CM to Feet", calculate: "Convert", reset: "Reset", results: "Results" },

      inputs: {
        amount: { label: "Length", helpText: "Enter value and select unit" },
      },

      results: {
        feetDecimal: { label: "Feet (decimal)" },
        feetInches: { label: "Feet & Inches" },
        inches: { label: "Total Inches" },
        meters: { label: "Meters" },
        yards: { label: "Yards" },
      },

      presets: {
        height160: { label: "160 cm", description: "≈ 5'3\" — average female height" },
        height175: { label: "175 cm", description: "≈ 5'9\" — average male height" },
        height190: { label: "190 cm", description: "≈ 6'3\" — tall" },
      },

      values: { "ft": "ft", "in": "in", "m": "m", "yd": "yd", "cm": "cm" },
      formats: { summary: "{cm} cm = {feetInches}" },

      infoCards: {
        results: {
          title: "📏 Conversion Results",
          items: [
            { label: "Feet (decimal)", valueKey: "feetDecimal" },
            { label: "Feet & Inches", valueKey: "feetInches" },
            { label: "Total Inches", valueKey: "inches" },
            { label: "Meters", valueKey: "meters" },
          ],
        },
        quickRef: {
          title: "📊 Height Chart",
          items: [
            { label: "150 cm", valueKey: "ref150" },
            { label: "165 cm", valueKey: "ref165" },
            { label: "180 cm", valueKey: "ref180" },
            { label: "200 cm", valueKey: "ref200" },
          ],
        },
        tips: {
          title: "💡 Quick Tips",
          items: [
            "Divide cm by 30.48 to get feet — or divide by 2.54 to get inches first.",
            "Quick: 150 cm ≈ 5'0\", 160 cm ≈ 5'3\", 170 cm ≈ 5'7\", 180 cm ≈ 5'11\".",
            "Each inch = 2.54 cm, each foot = 30.48 cm exactly.",
            "Average heights: US male 5'9\" (175.3 cm), US female 5'4\" (162.6 cm).",
          ],
        },
      },

      education: {
        whatIs: {
          title: "How to Convert CM to Feet",
          content: "To convert centimeters to feet, divide by 30.48. One foot equals exactly 30.48 centimeters. For feet and inches, first divide cm by 2.54 to get total inches, then divide by 12 for feet with the remainder as inches. This conversion is commonly needed when comparing heights internationally — most countries use centimeters while the US and UK use feet and inches for height. The centimeter (1/100 of a meter) is the standard metric unit for body measurements worldwide.",
        },
        howItWorks: {
          title: "The CM to Feet Formula",
          content: "The formula is: feet = cm ÷ 30.48. For feet and inches: (1) total inches = cm ÷ 2.54, (2) feet = floor(total inches ÷ 12), (3) remaining inches = total inches mod 12. Example: 175 cm ÷ 2.54 = 68.9 inches → 68.9 ÷ 12 = 5 feet remainder 8.9 inches → 5'9\". The conversion factor 30.48 comes from 12 inches × 2.54 cm/inch = 30.48 cm/foot.",
        },
        considerations: {
          title: "Common CM to Feet Conversions",
          items: [
            { text: "152 cm = 5'0\" (4.99 ft) — often considered petite", type: "info" },
            { text: "160 cm = 5'3\" (5.25 ft) — average female height globally", type: "info" },
            { text: "170 cm = 5'7\" (5.58 ft) — near the global average", type: "info" },
            { text: "175 cm = 5'9\" (5.74 ft) — average US male height", type: "info" },
            { text: "183 cm = 6'0\" (6.0 ft) — considered tall", type: "info" },
            { text: "193 cm = 6'4\" (6.33 ft) — well above average", type: "info" },
          ],
        },
        averageHeights: {
          title: "Average Heights by Country (cm → ft)",
          items: [
            { text: "Netherlands: Men 182.5 cm (6'0\"), Women 168.7 cm (5'6\")", type: "info" },
            { text: "USA: Men 175.3 cm (5'9\"), Women 162.6 cm (5'4\")", type: "info" },
            { text: "UK: Men 175.3 cm (5'9\"), Women 161.9 cm (5'4\")", type: "info" },
            { text: "Japan: Men 170.8 cm (5'7\"), Women 158.0 cm (5'2\")", type: "info" },
            { text: "India: Men 166.5 cm (5'6\"), Women 152.6 cm (5'0\")", type: "info" },
            { text: "Brazil: Men 171.5 cm (5'8\"), Women 159.0 cm (5'3\")", type: "info" },
          ],
        },
        examples: {
          title: "CM to Feet Examples",
          description: "Step-by-step conversions",
          examples: [
            {
              title: "Convert 172 cm to feet & inches",
              steps: ["172 ÷ 2.54 = 67.72 inches total", "67.72 ÷ 12 = 5 remainder 7.72", "5 feet and 7.72 inches", "≈ 5'8\" (rounded)"],
              result: "172 cm = 5 ft 7.7 in ≈ 5'8\"",
            },
            {
              title: "Baby length: 50 cm to feet",
              steps: ["50 ÷ 2.54 = 19.69 inches total", "19.69 ÷ 12 = 1 remainder 7.69", "1 foot and 7.69 inches", "Average newborn is 49-51 cm"],
              result: "50 cm = 1 ft 7.7 in (19.7 inches)",
            },
          ],
        },
      },

      faqs: [
        { question: "How do I convert cm to feet and inches?", answer: "Divide cm by 2.54 to get total inches, then divide by 12. The whole number is feet, the remainder is inches. Example: 170 cm ÷ 2.54 = 66.93\" → 66.93 ÷ 12 = 5 ft + 6.93 in ≈ 5'7\"." },
        { question: "How many feet is 180 cm?", answer: "180 cm = 5.906 feet = 5 feet 10.87 inches, commonly rounded to 5'11\". This is considered above-average height for men in most countries." },
        { question: "How many feet is 170 cm?", answer: "170 cm = 5.577 feet = 5 feet 6.93 inches, commonly rounded to 5'7\". This is close to the worldwide average adult height." },
        { question: "What is 160 cm in feet?", answer: "160 cm = 5.249 feet = 5 feet 2.99 inches, or essentially 5'3\". This is close to the average height for women in many countries." },
        { question: "How tall is 150 cm in feet?", answer: "150 cm = 4.921 feet = 4 feet 11.06 inches ≈ 4'11\". This is just under 5 feet and is considered petite." },
        { question: "Is cm or feet more accurate?", answer: "Centimeters allow more precision since 1 cm = 0.39 inches, giving finer increments. Feet and inches typically round to the nearest inch (2.54 cm). For medical and scientific purposes, centimeters are preferred worldwide." },
      ],

      rating: { title: "Rate this Calculator", share: "Share", copied: "Copied!", copyLink: "Copy Link", clickToRate: "Click to rate", youRated: "You rated", stars: "stars", averageFrom: "average from", ratings: "ratings" },
      common: { home: "Home", calculators: "Calculators" },
      buttons: { calculate: "Convert", reset: "Reset", pdf: "PDF", csv: "CSV", excel: "Excel", save: "Save", saved: "Saved", saving: "Saving..." },
      share: { calculatedWith: "Calculated with Kalcufy.com" },
      accessibility: { mobileResults: "Results", closeModal: "Close", openMenu: "Menu" },
      sources: { title: "Sources & References" },
    },
    es: {
      "name": "Convertidor de CM a Pies",
      "slug": "calculadora-centimetros-pies",
      "subtitle": "Convierte centímetros a pies y pulgadas al instante — perfecto para conversiones de altura y medidas.",
      "breadcrumb": "CM a Pies",
      "seo": {
        "title": "Convertidor de CM a Pies - Herramienta Gratuita de Conversión de Altura",
        "description": "Convierte centímetros a pies y pulgadas al instante. Perfecto para conversiones de altura, medidas internacionales y uso cotidiano. Incluye tabla de alturas y tabla de referencia.",
        "shortDescription": "Convierte cm a pies y pulgadas al instante.",
        "keywords": [
          "cm a pies",
          "convertidor cm a pies",
          "centímetros a pies",
          "convertidor altura cm a pies",
          "cm a pies y pulgadas",
          "convertidor cm gratis",
          "altura métrico a imperial"
        ]
      },
      "inputs": {
        "amount": {
          "label": "Longitud",
          "helpText": "Ingresa el valor y selecciona la unidad"
        }
      },
      "results": {
        "feetDecimal": {
          "label": "Pies (decimal)"
        },
        "feetInches": {
          "label": "Pies y Pulgadas"
        },
        "inches": {
          "label": "Pulgadas Totales"
        },
        "meters": {
          "label": "Metros"
        },
        "yards": {
          "label": "Yardas"
        }
      },
      "presets": {
        "height160": {
          "label": "160 cm",
          "description": "≈ 5'3\" — altura promedio femenina"
        },
        "height175": {
          "label": "175 cm",
          "description": "≈ 5'9\" — altura promedio masculina"
        },
        "height190": {
          "label": "190 cm",
          "description": "≈ 6'3\" — alto"
        }
      },
      "values": {
        "ft": "pies",
        "in": "pulg",
        "m": "m",
        "yd": "yd",
        "cm": "cm"
      },
      "formats": {
        "summary": "{cm} cm = {feetInches}"
      },
      "infoCards": {
        "results": {
          "title": "📏 Resultados de Conversión",
          "items": [
            {
              "label": "Pies (decimal)",
              "valueKey": "feetDecimal"
            },
            {
              "label": "Pies y Pulgadas",
              "valueKey": "feetInches"
            },
            {
              "label": "Pulgadas Totales",
              "valueKey": "inches"
            },
            {
              "label": "Metros",
              "valueKey": "meters"
            }
          ]
        },
        "quickRef": {
          "title": "📊 Tabla de Alturas",
          "items": [
            {
              "label": "150 cm",
              "valueKey": "ref150"
            },
            {
              "label": "165 cm",
              "valueKey": "ref165"
            },
            {
              "label": "180 cm",
              "valueKey": "ref180"
            },
            {
              "label": "200 cm",
              "valueKey": "ref200"
            }
          ]
        },
        "tips": {
          "title": "💡 Consejos Rápidos",
          "items": [
            "Divide cm entre 30.48 para obtener pies — o divide entre 2.54 para obtener pulgadas primero.",
            "Rápido: 150 cm ≈ 5'0\", 160 cm ≈ 5'3\", 170 cm ≈ 5'7\", 180 cm ≈ 5'11\".",
            "Cada pulgada = 2.54 cm, cada pie = 30.48 cm exactamente.",
            "Alturas promedio: Hombre estadounidense 5'9\" (175.3 cm), Mujer estadounidense 5'4\" (162.6 cm)."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Cómo Convertir CM a Pies",
          "content": "Para convertir centímetros a pies, divide entre 30.48. Un pie equivale exactamente a 30.48 centímetros. Para pies y pulgadas, primero divide cm entre 2.54 para obtener pulgadas totales, luego divide entre 12 para pies con el resto como pulgadas. Esta conversión es comúnmente necesaria al comparar alturas internacionalmente — la mayoría de países usan centímetros mientras que Estados Unidos y Reino Unido usan pies y pulgadas para la altura. El centímetro (1/100 de un metro) es la unidad métrica estándar para medidas corporales mundialmente."
        },
        "howItWorks": {
          "title": "La Fórmula de CM a Pies",
          "content": "La fórmula es: pies = cm ÷ 30.48. Para pies y pulgadas: (1) pulgadas totales = cm ÷ 2.54, (2) pies = entero(pulgadas totales ÷ 12), (3) pulgadas restantes = pulgadas totales mod 12. Ejemplo: 175 cm ÷ 2.54 = 68.9 pulgadas → 68.9 ÷ 12 = 5 pies resto 8.9 pulgadas → 5'9\". El factor de conversión 30.48 viene de 12 pulgadas × 2.54 cm/pulgada = 30.48 cm/pie."
        },
        "considerations": {
          "title": "Conversiones Comunes de CM a Pies",
          "items": [
            {
              "text": "152 cm = 5'0\" (4.99 pies) — a menudo considerado petite",
              "type": "info"
            },
            {
              "text": "160 cm = 5'3\" (5.25 pies) — altura femenina promedio globalmente",
              "type": "info"
            },
            {
              "text": "170 cm = 5'7\" (5.58 pies) — cerca del promedio global",
              "type": "info"
            },
            {
              "text": "175 cm = 5'9\" (5.74 pies) — altura masculina promedio estadounidense",
              "type": "info"
            },
            {
              "text": "183 cm = 6'0\" (6.0 pies) — considerado alto",
              "type": "info"
            },
            {
              "text": "193 cm = 6'4\" (6.33 pies) — muy por encima del promedio",
              "type": "info"
            }
          ]
        },
        "averageHeights": {
          "title": "Alturas Promedio por País (cm → pies)",
          "items": [
            {
              "text": "Países Bajos: Hombres 182.5 cm (6'0\"), Mujeres 168.7 cm (5'6\")",
              "type": "info"
            },
            {
              "text": "EE.UU.: Hombres 175.3 cm (5'9\"), Mujeres 162.6 cm (5'4\")",
              "type": "info"
            },
            {
              "text": "Reino Unido: Hombres 175.3 cm (5'9\"), Mujeres 161.9 cm (5'4\")",
              "type": "info"
            },
            {
              "text": "Japón: Hombres 170.8 cm (5'7\"), Mujeres 158.0 cm (5'2\")",
              "type": "info"
            },
            {
              "text": "India: Hombres 166.5 cm (5'6\"), Mujeres 152.6 cm (5'0\")",
              "type": "info"
            },
            {
              "text": "Brasil: Hombres 171.5 cm (5'8\"), Mujeres 159.0 cm (5'3\")",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Ejemplos de CM a Pies",
          "description": "Conversiones paso a paso",
          "examples": [
            {
              "title": "Convertir 172 cm a pies y pulgadas",
              "steps": [
                "172 ÷ 2.54 = 67.72 pulgadas totales",
                "67.72 ÷ 12 = 5 resto 7.72",
                "5 pies y 7.72 pulgadas",
                "≈ 5'8\" (redondeado)"
              ],
              "result": "172 cm = 5 pies 7.7 pulg ≈ 5'8\""
            },
            {
              "title": "Longitud de bebé: 50 cm a pies",
              "steps": [
                "50 ÷ 2.54 = 19.69 pulgadas totales",
                "19.69 ÷ 12 = 1 resto 7.69",
                "1 pie y 7.69 pulgadas",
                "El recién nacido promedio mide 49-51 cm"
              ],
              "result": "50 cm = 1 pie 7.7 pulg (19.7 pulgadas)"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "¿Cómo convierto cm a pies y pulgadas?",
          "answer": "Divide cm entre 2.54 para obtener pulgadas totales, luego divide entre 12. El número entero son los pies, el resto son las pulgadas. Ejemplo: 170 cm ÷ 2.54 = 66.93\" → 66.93 ÷ 12 = 5 pies + 6.93 pulg ≈ 5'7\"."
        },
        {
          "question": "¿Cuántos pies son 180 cm?",
          "answer": "180 cm = 5.906 pies = 5 pies 10.87 pulgadas, comúnmente redondeado a 5'11\". Esto se considera una altura por encima del promedio para hombres en la mayoría de países."
        },
        {
          "question": "¿Cuántos pies son 170 cm?",
          "answer": "170 cm = 5.577 pies = 5 pies 6.93 pulgadas, comúnmente redondeado a 5'7\". Esto está cerca del promedio mundial de altura adulta."
        },
        {
          "question": "¿Cuánto es 160 cm en pies?",
          "answer": "160 cm = 5.249 pies = 5 pies 2.99 pulgadas, o esencialmente 5'3\". Esto está cerca de la altura promedio para mujeres en muchos países."
        },
        {
          "question": "¿Qué tan alto es 150 cm en pies?",
          "answer": "150 cm = 4.921 pies = 4 pies 11.06 pulgadas ≈ 4'11\". Esto está justo bajo los 5 pies y se considera petite."
        },
        {
          "question": "¿Es más preciso cm o pies?",
          "answer": "Los centímetros permiten más precisión ya que 1 cm = 0.39 pulgadas, dando incrementos más finos. Los pies y pulgadas típicamente se redondean a la pulgada más cercana (2.54 cm). Para propósitos médicos y científicos, los centímetros se prefieren mundialmente."
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
      "name": "Conversor de CM para Pés",
      "slug": "calculadora-cm-para-pes",
      "subtitle": "Converta centímetros para pés e polegadas instantaneamente — perfeito para conversões de altura e medidas.",
      "breadcrumb": "CM para Pés",
      "seo": {
        "title": "Conversor de CM para Pés - Ferramenta Gratuita de Conversão de Altura",
        "description": "Converta centímetros para pés e polegadas instantaneamente. Perfeito para conversões de altura, medidas internacionais e uso diário. Inclui tabela de alturas e referências.",
        "shortDescription": "Converta cm para pés e polegadas instantaneamente.",
        "keywords": [
          "cm para pés",
          "conversor cm para ft",
          "centímetros para pés",
          "conversor altura cm para pés",
          "cm para pés e polegadas",
          "conversor cm gratuito",
          "altura métrico para imperial"
        ]
      },
      "inputs": {
        "amount": {
          "label": "Comprimento",
          "helpText": "Digite o valor e selecione a unidade"
        }
      },
      "results": {
        "feetDecimal": {
          "label": "Pés (decimal)"
        },
        "feetInches": {
          "label": "Pés e Polegadas"
        },
        "inches": {
          "label": "Total em Polegadas"
        },
        "meters": {
          "label": "Metros"
        },
        "yards": {
          "label": "Jardas"
        }
      },
      "presets": {
        "height160": {
          "label": "160 cm",
          "description": "≈ 5'3\" — altura média feminina"
        },
        "height175": {
          "label": "175 cm",
          "description": "≈ 5'9\" — altura média masculina"
        },
        "height190": {
          "label": "190 cm",
          "description": "≈ 6'3\" — alto"
        }
      },
      "values": {
        "ft": "pés",
        "in": "pol",
        "m": "m",
        "yd": "jd",
        "cm": "cm"
      },
      "formats": {
        "summary": "{cm} cm = {feetInches}"
      },
      "infoCards": {
        "results": {
          "title": "📏 Resultados da Conversão",
          "items": [
            {
              "label": "Pés (decimal)",
              "valueKey": "feetDecimal"
            },
            {
              "label": "Pés e Polegadas",
              "valueKey": "feetInches"
            },
            {
              "label": "Total em Polegadas",
              "valueKey": "inches"
            },
            {
              "label": "Metros",
              "valueKey": "meters"
            }
          ]
        },
        "quickRef": {
          "title": "📊 Tabela de Alturas",
          "items": [
            {
              "label": "150 cm",
              "valueKey": "ref150"
            },
            {
              "label": "165 cm",
              "valueKey": "ref165"
            },
            {
              "label": "180 cm",
              "valueKey": "ref180"
            },
            {
              "label": "200 cm",
              "valueKey": "ref200"
            }
          ]
        },
        "tips": {
          "title": "💡 Dicas Rápidas",
          "items": [
            "Divida cm por 30,48 para obter pés — ou divida por 2,54 para obter polegadas primeiro.",
            "Rápido: 150 cm ≈ 5'0\", 160 cm ≈ 5'3\", 170 cm ≈ 5'7\", 180 cm ≈ 5'11\".",
            "Cada polegada = 2,54 cm, cada pé = 30,48 cm exatamente.",
            "Alturas médias: homem brasileiro 5'8\" (173 cm), mulher brasileira 5'3\" (161 cm)."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Como Converter CM para Pés",
          "content": "Para converter centímetros para pés, divida por 30,48. Um pé equivale exatamente a 30,48 centímetros. Para pés e polegadas, primeiro divida cm por 2,54 para obter o total em polegadas, depois divida por 12 para pés com o resto em polegadas. Esta conversão é comumente necessária ao comparar alturas internacionalmente — a maioria dos países usa centímetros enquanto os EUA e Reino Unido usam pés e polegadas para altura. O centímetro (1/100 de um metro) é a unidade métrica padrão para medidas corporais mundialmente."
        },
        "howItWorks": {
          "title": "A Fórmula de CM para Pés",
          "content": "A fórmula é: pés = cm ÷ 30,48. Para pés e polegadas: (1) total em polegadas = cm ÷ 2,54, (2) pés = arredondar para baixo(total em polegadas ÷ 12), (3) polegadas restantes = total em polegadas mod 12. Exemplo: 175 cm ÷ 2,54 = 68,9 polegadas → 68,9 ÷ 12 = 5 pés resto 8,9 polegadas → 5'9\". O fator de conversão 30,48 vem de 12 polegadas × 2,54 cm/polegada = 30,48 cm/pé."
        },
        "considerations": {
          "title": "Conversões Comuns de CM para Pés",
          "items": [
            {
              "text": "152 cm = 5'0\" (4,99 pés) — frequentemente considerado baixo",
              "type": "info"
            },
            {
              "text": "160 cm = 5'3\" (5,25 pés) — altura média feminina globalmente",
              "type": "info"
            },
            {
              "text": "170 cm = 5'7\" (5,58 pés) — próximo da média global",
              "type": "info"
            },
            {
              "text": "175 cm = 5'9\" (5,74 pés) — altura média masculina brasileira",
              "type": "info"
            },
            {
              "text": "183 cm = 6'0\" (6,0 pés) — considerado alto",
              "type": "info"
            },
            {
              "text": "193 cm = 6'4\" (6,33 pés) — bem acima da média",
              "type": "info"
            }
          ]
        },
        "averageHeights": {
          "title": "Alturas Médias por País (cm → pés)",
          "items": [
            {
              "text": "Holanda: Homens 182,5 cm (6'0\"), Mulheres 168,7 cm (5'6\")",
              "type": "info"
            },
            {
              "text": "EUA: Homens 175,3 cm (5'9\"), Mulheres 162,6 cm (5'4\")",
              "type": "info"
            },
            {
              "text": "Reino Unido: Homens 175,3 cm (5'9\"), Mulheres 161,9 cm (5'4\")",
              "type": "info"
            },
            {
              "text": "Japão: Homens 170,8 cm (5'7\"), Mulheres 158,0 cm (5'2\")",
              "type": "info"
            },
            {
              "text": "Índia: Homens 166,5 cm (5'6\"), Mulheres 152,6 cm (5'0\")",
              "type": "info"
            },
            {
              "text": "Brasil: Homens 171,5 cm (5'8\"), Mulheres 159,0 cm (5'3\")",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemplos de CM para Pés",
          "description": "Conversões passo a passo",
          "examples": [
            {
              "title": "Converter 172 cm para pés e polegadas",
              "steps": [
                "172 ÷ 2,54 = 67,72 polegadas totais",
                "67,72 ÷ 12 = 5 resto 7,72",
                "5 pés e 7,72 polegadas",
                "≈ 5'8\" (arredondado)"
              ],
              "result": "172 cm = 5 pés 7,7 pol ≈ 5'8\""
            },
            {
              "title": "Comprimento de bebê: 50 cm para pés",
              "steps": [
                "50 ÷ 2,54 = 19,69 polegadas totais",
                "19,69 ÷ 12 = 1 resto 7,69",
                "1 pé e 7,69 polegadas",
                "Recém-nascido médio tem 49-51 cm"
              ],
              "result": "50 cm = 1 pé 7,7 pol (19,7 polegadas)"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Como converter cm para pés e polegadas?",
          "answer": "Divida cm por 2,54 para obter o total em polegadas, depois divida por 12. O número inteiro são os pés, o resto são as polegadas. Exemplo: 170 cm ÷ 2,54 = 66,93\" → 66,93 ÷ 12 = 5 pés + 6,93 pol ≈ 5'7\"."
        },
        {
          "question": "Quantos pés tem 180 cm?",
          "answer": "180 cm = 5,906 pés = 5 pés 10,87 polegadas, comumente arredondado para 5'11\". Isto é considerado altura acima da média para homens na maioria dos países."
        },
        {
          "question": "Quantos pés tem 170 cm?",
          "answer": "170 cm = 5,577 pés = 5 pés 6,93 polegadas, comumente arredondado para 5'7\". Isto está próximo da altura média mundial de adultos."
        },
        {
          "question": "Quanto é 160 cm em pés?",
          "answer": "160 cm = 5,249 pés = 5 pés 2,99 polegadas, ou essencialmente 5'3\". Isto está próximo da altura média para mulheres em muitos países."
        },
        {
          "question": "Qual a altura de 150 cm em pés?",
          "answer": "150 cm = 4,921 pés = 4 pés 11,06 polegadas ≈ 4'11\". Isto é um pouco menos que 5 pés e é considerado baixo."
        },
        {
          "question": "O que é mais preciso, cm ou pés?",
          "answer": "Centímetros permitem mais precisão já que 1 cm = 0,39 polegadas, oferecendo incrementos menores. Pés e polegadas tipicamente arredondam para a polegada mais próxima (2,54 cm). Para fins médicos e científicos, centímetros são preferidos mundialmente."
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
      "name": "Convertisseur CM vers Pieds",
      "slug": "calculateur-cm-vers-pieds",
      "subtitle": "Convertissez les centimètres en pieds et pouces instantanément — parfait pour les conversions de taille et de mesures.",
      "breadcrumb": "CM vers Pieds",
      "seo": {
        "title": "Convertisseur CM vers Pieds - Outil de Conversion de Taille Gratuit",
        "description": "Convertissez les centimètres en pieds et pouces instantanément. Parfait pour les conversions de taille, les mesures internationales et l'usage quotidien. Inclut un tableau de taille et une table de référence.",
        "shortDescription": "Convertissez cm en pieds et pouces instantanément.",
        "keywords": [
          "cm vers pieds",
          "convertisseur cm vers ft",
          "centimètres vers pieds",
          "convertisseur taille cm vers pieds",
          "cm vers pieds et pouces",
          "convertisseur cm gratuit",
          "taille métrique vers impériale"
        ]
      },
      "inputs": {
        "amount": {
          "label": "Longueur",
          "helpText": "Entrez la valeur et sélectionnez l'unité"
        }
      },
      "results": {
        "feetDecimal": {
          "label": "Pieds (décimale)"
        },
        "feetInches": {
          "label": "Pieds et Pouces"
        },
        "inches": {
          "label": "Pouces Total"
        },
        "meters": {
          "label": "Mètres"
        },
        "yards": {
          "label": "Yards"
        }
      },
      "presets": {
        "height160": {
          "label": "160 cm",
          "description": "≈ 5'3\" — taille moyenne féminine"
        },
        "height175": {
          "label": "175 cm",
          "description": "≈ 5'9\" — taille moyenne masculine"
        },
        "height190": {
          "label": "190 cm",
          "description": "≈ 6'3\" — grand"
        }
      },
      "values": {
        "ft": "ft",
        "in": "po",
        "m": "m",
        "yd": "yd",
        "cm": "cm"
      },
      "formats": {
        "summary": "{cm} cm = {feetInches}"
      },
      "infoCards": {
        "results": {
          "title": "📏 Résultats de Conversion",
          "items": [
            {
              "label": "Pieds (décimale)",
              "valueKey": "feetDecimal"
            },
            {
              "label": "Pieds et Pouces",
              "valueKey": "feetInches"
            },
            {
              "label": "Pouces Total",
              "valueKey": "inches"
            },
            {
              "label": "Mètres",
              "valueKey": "meters"
            }
          ]
        },
        "quickRef": {
          "title": "📊 Tableau de Taille",
          "items": [
            {
              "label": "150 cm",
              "valueKey": "ref150"
            },
            {
              "label": "165 cm",
              "valueKey": "ref165"
            },
            {
              "label": "180 cm",
              "valueKey": "ref180"
            },
            {
              "label": "200 cm",
              "valueKey": "ref200"
            }
          ]
        },
        "tips": {
          "title": "💡 Conseils Pratiques",
          "items": [
            "Divisez cm par 30,48 pour obtenir les pieds — ou divisez par 2,54 pour obtenir les pouces d'abord.",
            "Rapide : 150 cm ≈ 5'0\", 160 cm ≈ 5'3\", 170 cm ≈ 5'7\", 180 cm ≈ 5'11\".",
            "Chaque pouce = 2,54 cm, chaque pied = 30,48 cm exactement.",
            "Tailles moyennes : Homme US 5'9\" (175,3 cm), Femme US 5'4\" (162,6 cm)."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Comment Convertir CM en Pieds",
          "content": "Pour convertir les centimètres en pieds, divisez par 30,48. Un pied équivaut exactement à 30,48 centimètres. Pour les pieds et pouces, divisez d'abord cm par 2,54 pour obtenir le total en pouces, puis divisez par 12 pour les pieds avec le reste en pouces. Cette conversion est couramment nécessaire lors de la comparaison des tailles internationalement — la plupart des pays utilisent les centimètres tandis que les États-Unis et le Royaume-Uni utilisent les pieds et pouces pour la taille. Le centimètre (1/100 d'un mètre) est l'unité métrique standard pour les mesures corporelles dans le monde."
        },
        "howItWorks": {
          "title": "La Formule CM vers Pieds",
          "content": "La formule est : pieds = cm ÷ 30,48. Pour les pieds et pouces : (1) total pouces = cm ÷ 2,54, (2) pieds = plancher(total pouces ÷ 12), (3) pouces restants = total pouces mod 12. Exemple : 175 cm ÷ 2,54 = 68,9 pouces → 68,9 ÷ 12 = 5 pieds reste 8,9 pouces → 5'9\". Le facteur de conversion 30,48 vient de 12 pouces × 2,54 cm/pouce = 30,48 cm/pied."
        },
        "considerations": {
          "title": "Conversions Communes CM vers Pieds",
          "items": [
            {
              "text": "152 cm = 5'0\" (4,99 ft) — souvent considéré comme petit",
              "type": "info"
            },
            {
              "text": "160 cm = 5'3\" (5,25 ft) — taille féminine moyenne mondiale",
              "type": "info"
            },
            {
              "text": "170 cm = 5'7\" (5,58 ft) — près de la moyenne mondiale",
              "type": "info"
            },
            {
              "text": "175 cm = 5'9\" (5,74 ft) — taille masculine moyenne US",
              "type": "info"
            },
            {
              "text": "183 cm = 6'0\" (6,0 ft) — considéré comme grand",
              "type": "info"
            },
            {
              "text": "193 cm = 6'4\" (6,33 ft) — bien au-dessus de la moyenne",
              "type": "info"
            }
          ]
        },
        "averageHeights": {
          "title": "Tailles Moyennes par Pays (cm → ft)",
          "items": [
            {
              "text": "Pays-Bas : Hommes 182,5 cm (6'0\"), Femmes 168,7 cm (5'6\")",
              "type": "info"
            },
            {
              "text": "États-Unis : Hommes 175,3 cm (5'9\"), Femmes 162,6 cm (5'4\")",
              "type": "info"
            },
            {
              "text": "Royaume-Uni : Hommes 175,3 cm (5'9\"), Femmes 161,9 cm (5'4\")",
              "type": "info"
            },
            {
              "text": "Japon : Hommes 170,8 cm (5'7\"), Femmes 158,0 cm (5'2\")",
              "type": "info"
            },
            {
              "text": "Inde : Hommes 166,5 cm (5'6\"), Femmes 152,6 cm (5'0\")",
              "type": "info"
            },
            {
              "text": "Brésil : Hommes 171,5 cm (5'8\"), Femmes 159,0 cm (5'3\")",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemples CM vers Pieds",
          "description": "Conversions étape par étape",
          "examples": [
            {
              "title": "Convertir 172 cm en pieds et pouces",
              "steps": [
                "172 ÷ 2,54 = 67,72 pouces total",
                "67,72 ÷ 12 = 5 reste 7,72",
                "5 pieds et 7,72 pouces",
                "≈ 5'8\" (arrondi)"
              ],
              "result": "172 cm = 5 ft 7,7 po ≈ 5'8\""
            },
            {
              "title": "Longueur bébé : 50 cm en pieds",
              "steps": [
                "50 ÷ 2,54 = 19,69 pouces total",
                "19,69 ÷ 12 = 1 reste 7,69",
                "1 pied et 7,69 pouces",
                "Nouveau-né moyen fait 49-51 cm"
              ],
              "result": "50 cm = 1 ft 7,7 po (19,7 pouces)"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Comment convertir cm en pieds et pouces ?",
          "answer": "Divisez cm par 2,54 pour obtenir le total en pouces, puis divisez par 12. Le nombre entier est les pieds, le reste les pouces. Exemple : 170 cm ÷ 2,54 = 66,93\" → 66,93 ÷ 12 = 5 ft + 6,93 po ≈ 5'7\"."
        },
        {
          "question": "Combien de pieds font 180 cm ?",
          "answer": "180 cm = 5,906 pieds = 5 pieds 10,87 pouces, généralement arrondi à 5'11\". C'est considéré comme au-dessus de la moyenne pour les hommes dans la plupart des pays."
        },
        {
          "question": "Combien de pieds font 170 cm ?",
          "answer": "170 cm = 5,577 pieds = 5 pieds 6,93 pouces, généralement arrondi à 5'7\". C'est proche de la taille adulte moyenne mondiale."
        },
        {
          "question": "Que fait 160 cm en pieds ?",
          "answer": "160 cm = 5,249 pieds = 5 pieds 2,99 pouces, ou essentiellement 5'3\". C'est proche de la taille moyenne pour les femmes dans de nombreux pays."
        },
        {
          "question": "Quelle taille fait 150 cm en pieds ?",
          "answer": "150 cm = 4,921 pieds = 4 pieds 11,06 pouces ≈ 4'11\". C'est juste en dessous de 5 pieds et est considéré comme petit."
        },
        {
          "question": "Les cm ou les pieds sont-ils plus précis ?",
          "answer": "Les centimètres permettent plus de précision car 1 cm = 0,39 pouce, donnant des incréments plus fins. Les pieds et pouces s'arrondissent généralement au pouce le plus proche (2,54 cm). Pour des fins médicales et scientifiques, les centimètres sont préférés mondialement."
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
      "name": "Zentimeter zu Fuß Umrechner",
      "slug": "zentimeter-zu-fuss-rechner",
      "subtitle": "Zentimeter sofort in Fuß und Zoll umrechnen — perfekt für Größenumrechnungen und Messungen.",
      "breadcrumb": "Zentimeter zu Fuß",
      "seo": {
        "title": "Zentimeter zu Fuß Umrechner - Kostenloses Größenumrechnungstool",
        "description": "Zentimeter sofort in Fuß und Zoll umrechnen. Perfekt für Größenumrechnungen, internationale Messungen und den täglichen Gebrauch. Inklusive Größentabelle und Referenztabelle.",
        "shortDescription": "Zentimeter sofort in Fuß und Zoll umrechnen.",
        "keywords": [
          "cm zu fuß",
          "cm zu fuß umrechner",
          "zentimeter zu fuß",
          "größenumrechner cm zu fuß",
          "cm zu fuß und zoll",
          "kostenloser cm umrechner",
          "metrisch zu imperial größe"
        ]
      },
      "inputs": {
        "amount": {
          "label": "Länge",
          "helpText": "Wert eingeben und Einheit auswählen"
        }
      },
      "results": {
        "feetDecimal": {
          "label": "Fuß (dezimal)"
        },
        "feetInches": {
          "label": "Fuß & Zoll"
        },
        "inches": {
          "label": "Zoll gesamt"
        },
        "meters": {
          "label": "Meter"
        },
        "yards": {
          "label": "Yards"
        }
      },
      "presets": {
        "height160": {
          "label": "160 cm",
          "description": "≈ 5'3\" — durchschnittliche Frauengröße"
        },
        "height175": {
          "label": "175 cm",
          "description": "≈ 5'9\" — durchschnittliche Männergröße"
        },
        "height190": {
          "label": "190 cm",
          "description": "≈ 6'3\" — groß"
        }
      },
      "values": {
        "ft": "ft",
        "in": "in",
        "m": "m",
        "yd": "yd",
        "cm": "cm"
      },
      "formats": {
        "summary": "{cm} cm = {feetInches}"
      },
      "infoCards": {
        "results": {
          "title": "📏 Umrechnungsergebnisse",
          "items": [
            {
              "label": "Fuß (dezimal)",
              "valueKey": "feetDecimal"
            },
            {
              "label": "Fuß & Zoll",
              "valueKey": "feetInches"
            },
            {
              "label": "Zoll gesamt",
              "valueKey": "inches"
            },
            {
              "label": "Meter",
              "valueKey": "meters"
            }
          ]
        },
        "quickRef": {
          "title": "📊 Größentabelle",
          "items": [
            {
              "label": "150 cm",
              "valueKey": "ref150"
            },
            {
              "label": "165 cm",
              "valueKey": "ref165"
            },
            {
              "label": "180 cm",
              "valueKey": "ref180"
            },
            {
              "label": "200 cm",
              "valueKey": "ref200"
            }
          ]
        },
        "tips": {
          "title": "💡 Schnelle Tipps",
          "items": [
            "Teile cm durch 30,48 um Fuß zu erhalten — oder teile durch 2,54 um zuerst Zoll zu erhalten.",
            "Schnell: 150 cm ≈ 5'0\", 160 cm ≈ 5'3\", 170 cm ≈ 5'7\", 180 cm ≈ 5'11\".",
            "Jeder Zoll = 2,54 cm, jeder Fuß = 30,48 cm exakt.",
            "Durchschnittsgrößen: US-Mann 5'9\" (175,3 cm), US-Frau 5'4\" (162,6 cm)."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Wie man Zentimeter in Fuß umrechnet",
          "content": "Um Zentimeter in Fuß umzurechnen, teile durch 30,48. Ein Fuß entspricht exakt 30,48 Zentimetern. Für Fuß und Zoll teile zuerst cm durch 2,54 um die Gesamtzoll zu erhalten, dann teile durch 12 für Fuß mit dem Rest als Zoll. Diese Umrechnung wird häufig beim internationalen Größenvergleich benötigt — die meisten Länder verwenden Zentimeter, während die USA und Großbritannien Fuß und Zoll für die Größe verwenden. Der Zentimeter (1/100 eines Meters) ist die Standard-Maßeinheit für Körpermaße weltweit."
        },
        "howItWorks": {
          "title": "Die Zentimeter zu Fuß Formel",
          "content": "Die Formel lautet: Fuß = cm ÷ 30,48. Für Fuß und Zoll: (1) Gesamtzoll = cm ÷ 2,54, (2) Fuß = ganzzahlig(Gesamtzoll ÷ 12), (3) verbleibende Zoll = Gesamtzoll mod 12. Beispiel: 175 cm ÷ 2,54 = 68,9 Zoll → 68,9 ÷ 12 = 5 Fuß Rest 8,9 Zoll → 5'9\". Der Umrechnungsfaktor 30,48 ergibt sich aus 12 Zoll × 2,54 cm/Zoll = 30,48 cm/Fuß."
        },
        "considerations": {
          "title": "Häufige Zentimeter zu Fuß Umrechnungen",
          "items": [
            {
              "text": "152 cm = 5'0\" (4,99 ft) — oft als zierlich betrachtet",
              "type": "info"
            },
            {
              "text": "160 cm = 5'3\" (5,25 ft) — durchschnittliche Frauengröße weltweit",
              "type": "info"
            },
            {
              "text": "170 cm = 5'7\" (5,58 ft) — nahe dem weltweiten Durchschnitt",
              "type": "info"
            },
            {
              "text": "175 cm = 5'9\" (5,74 ft) — durchschnittliche US-Männergröße",
              "type": "info"
            },
            {
              "text": "183 cm = 6'0\" (6,0 ft) — als groß betrachtet",
              "type": "info"
            },
            {
              "text": "193 cm = 6'4\" (6,33 ft) — deutlich überdurchschnittlich",
              "type": "info"
            }
          ]
        },
        "averageHeights": {
          "title": "Durchschnittsgrößen nach Land (cm → ft)",
          "items": [
            {
              "text": "Niederlande: Männer 182,5 cm (6'0\"), Frauen 168,7 cm (5'6\")",
              "type": "info"
            },
            {
              "text": "USA: Männer 175,3 cm (5'9\"), Frauen 162,6 cm (5'4\")",
              "type": "info"
            },
            {
              "text": "Großbritannien: Männer 175,3 cm (5'9\"), Frauen 161,9 cm (5'4\")",
              "type": "info"
            },
            {
              "text": "Japan: Männer 170,8 cm (5'7\"), Frauen 158,0 cm (5'2\")",
              "type": "info"
            },
            {
              "text": "Indien: Männer 166,5 cm (5'6\"), Frauen 152,6 cm (5'0\")",
              "type": "info"
            },
            {
              "text": "Brasilien: Männer 171,5 cm (5'8\"), Frauen 159,0 cm (5'3\")",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Zentimeter zu Fuß Beispiele",
          "description": "Schritt-für-Schritt Umrechnungen",
          "examples": [
            {
              "title": "172 cm in Fuß & Zoll umrechnen",
              "steps": [
                "172 ÷ 2,54 = 67,72 Zoll gesamt",
                "67,72 ÷ 12 = 5 Rest 7,72",
                "5 Fuß und 7,72 Zoll",
                "≈ 5'8\" (gerundet)"
              ],
              "result": "172 cm = 5 ft 7,7 in ≈ 5'8\""
            },
            {
              "title": "Babylänge: 50 cm in Fuß",
              "steps": [
                "50 ÷ 2,54 = 19,69 Zoll gesamt",
                "19,69 ÷ 12 = 1 Rest 7,69",
                "1 Fuß und 7,69 Zoll",
                "Durchschnittliches Neugeborenes ist 49-51 cm"
              ],
              "result": "50 cm = 1 ft 7,7 in (19,7 Zoll)"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Wie rechne ich cm in Fuß und Zoll um?",
          "answer": "Teile cm durch 2,54 um die Gesamtzoll zu erhalten, dann teile durch 12. Die ganze Zahl sind die Fuß, der Rest sind die Zoll. Beispiel: 170 cm ÷ 2,54 = 66,93\" → 66,93 ÷ 12 = 5 ft + 6,93 in ≈ 5'7\"."
        },
        {
          "question": "Wie viele Fuß sind 180 cm?",
          "answer": "180 cm = 5,906 Fuß = 5 Fuß 10,87 Zoll, üblicherweise auf 5'11\" gerundet. Dies gilt als überdurchschnittliche Größe für Männer in den meisten Ländern."
        },
        {
          "question": "Wie viele Fuß sind 170 cm?",
          "answer": "170 cm = 5,577 Fuß = 5 Fuß 6,93 Zoll, üblicherweise auf 5'7\" gerundet. Dies ist nahe der weltweiten durchschnittlichen Erwachsenengröße."
        },
        {
          "question": "Was sind 160 cm in Fuß?",
          "answer": "160 cm = 5,249 Fuß = 5 Fuß 2,99 Zoll, oder im Wesentlichen 5'3\". Dies ist nahe der durchschnittlichen Größe für Frauen in vielen Ländern."
        },
        {
          "question": "Wie groß ist 150 cm in Fuß?",
          "answer": "150 cm = 4,921 Fuß = 4 Fuß 11,06 Zoll ≈ 4'11\". Dies ist knapp unter 5 Fuß und wird als zierlich betrachtet."
        },
        {
          "question": "Sind cm oder Fuß genauer?",
          "answer": "Zentimeter ermöglichen mehr Präzision, da 1 cm = 0,39 Zoll, was feinere Abstufungen bietet. Fuß und Zoll werden typischerweise auf den nächsten Zoll (2,54 cm) gerundet. Für medizinische und wissenschaftliche Zwecke werden weltweit Zentimeter bevorzugt."
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
      placeholder: "175",
      min: 0,
      unitType: "length",
      syncGroup: false,
      defaultUnit: "cm",
      allowedUnits: ["mm", "cm", "m", "km", "in", "ft", "yd", "mi"],
    },
  ],

  inputGroups: [],

  results: [
    { id: "feetDecimal", type: "primary", format: "text" },
    { id: "feetInches", type: "secondary", format: "text" },
    { id: "inches", type: "secondary", format: "text" },
    { id: "meters", type: "secondary", format: "text" },
    { id: "yards", type: "secondary", format: "text" },
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
    { id: "averageHeights", type: "list", icon: "📊", itemCount: 6 },
    { id: "examples", type: "code-example", icon: "🧮", columns: 2, exampleCount: 2 },
  ],

  faqs: [{ id: "0" }, { id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }],

  references: [
    { authors: "Centers for Disease Control and Prevention", year: "2024", title: "Anthropometric Reference Data for Children and Adults", source: "CDC", url: "https://www.cdc.gov/nchs/data/series/sr_03/sr03-046-508.pdf" },
    { authors: "National Institute of Standards and Technology", year: "2024", title: "NIST Handbook 44 — Length Specifications", source: "NIST", url: "https://www.nist.gov/pml/owm/metric-si/si-units-length" },
  ],

  hero: { badge: "Conversion", title: "CM to Feet" },
  sidebar: { showConversions: true, showRelated: true },
  features: { showPresets: true, showShare: true, showPrint: true },
  relatedCalculators: ["feet-to-cm", "cm-to-inches", "meters-to-feet"],
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

export function calculateCmToFeet(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits = {} } = data;
  const amount = values.amount as number | null;

  if (amount === null || amount === undefined || amount < 0) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  const fromUnit = fieldUnits.amount || "cm";
  const meters = convertToBase(amount, fromUnit, "length");

  const totalInches = meters / 0.0254;
  const totalFeet = meters / 0.3048;
  const feetPart = Math.floor(totalInches / 12);
  const inchesPart = totalInches - feetPart * 12;
  const m = meters;
  const yards = meters / 0.9144;

  const toFi = (cm: number) => {
    const ti = cm / 2.54;
    const fp = Math.floor(ti / 12);
    const ip = ti - fp * 12;
    return `${fp}' ${Math.round(ip * 10) / 10}"`;
  };

  return {
    values: { feetDecimal: totalFeet, feetInches: totalFeet, inches: totalInches, meters: m, yards },
    formatted: {
      feetDecimal: `${fmtNum(totalFeet)} ft`,
      feetInches: `${feetPart}' ${fmtNum(Math.round(inchesPart * 10) / 10)}"`,
      inches: `${fmtNum(totalInches)} in`,
      meters: `${fmtNum(m)} m`,
      yards: `${fmtNum(yards)} yd`,
      ref150: toFi(150),
      ref165: toFi(165),
      ref180: toFi(180),
      ref200: toFi(200),
    },
    summary: `${fmtNum(amount)} ${fromUnit} = ${feetPart}' ${Math.round(inchesPart * 10) / 10}" (${fmtNum(totalFeet)} ft)`,
    isValid: true,
  };
}

export default cmToFeetConverterConfig;
