import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";

export const gallonsToLitersConverterConfig: CalculatorConfigV4 = {
  id: "gallons-to-liters",
  version: "4.0",
  category: "conversion",
  icon: "🛢️",

  presets: [
    { id: "carTank", icon: "⛽", values: { amount: 15 } },
    { id: "waterJug", icon: "💧", values: { amount: 5 } },
    { id: "swimmingPool", icon: "🏊", values: { amount: 20000 } },
  ],

  t: {
    en: {
      name: "Gallons to Liters Converter",
      slug: "gallons-to-liters",
      subtitle: "Convert gallons to liters instantly. Works for US and UK gallons with metric equivalents.",
      breadcrumb: "Gal to L",

      seo: {
        title: "Gallons to Liters Converter - Free Volume Tool",
        description: "Convert US and UK gallons to liters instantly. Essential for cooking, fuel economy, and international recipes. Includes quarts, pints, and cups.",
        shortDescription: "Convert gallons to liters for cooking and fuel.",
        keywords: ["gallons to liters", "gal to L", "volume converter", "US gallon", "UK gallon", "imperial gallon", "metric conversion", "fuel converter"],
      },

      calculator: { yourInformation: "Enter Volume" },
      ui: { yourInformation: "Enter Volume", calculate: "Convert", reset: "Reset", results: "Results" },

      inputs: {
        amount: { label: "Volume", helpText: "Enter the volume to convert" },
      },

      results: {
        liters: { label: "Liters" },
        milliliters: { label: "Milliliters" },
        cubicMeters: { label: "Cubic Meters" },
      },

      presets: {
        carTank: { label: "Car Gas Tank", description: "15 gallons (~57 L)" },
        waterJug: { label: "Water Jug", description: "5 gallons (~19 L)" },
        swimmingPool: { label: "Swimming Pool", description: "20,000 gal (~76,000 L)" },
      },

      values: { "L": "L", "mL": "mL", "m³": "m³", "gal": "gal", "qt": "qt", "pt": "pt", "cups": "cups", "fl oz": "fl oz" },

      formats: { summary: "{value} gal = {liters} L" },

      infoCards: {
        results: {
          title: "Conversion Results",
          items: [
            { label: "Liters", valueKey: "liters" },
            { label: "Milliliters", valueKey: "milliliters" },
            { label: "Cubic Meters", valueKey: "cubicMeters" },
            { label: "Quarts", valueKey: "quarts" },
          ],
        },
        reference: {
          title: "Quick Reference",
          items: [
            { label: "1 US Gallon", valueKey: "ref1gal" },
            { label: "1 UK Gallon", valueKey: "ref1ukgal" },
            { label: "5 US Gallons", valueKey: "ref5gal" },
            { label: "10 US Gallons", valueKey: "ref10gal" },
          ],
        },
        tips: {
          title: "Conversion Tips",
          items: [
            "US gallon = 3.785 liters, UK gallon = 4.546 liters",
            "UK gallons are ~20% larger than US gallons",
            "1 gallon = 4 quarts = 8 pints = 16 cups",
            "For fuel: multiply MPG by 0.425 to get km/L",
          ],
        },
      },

      education: {
        whatIs: {
          title: "Understanding Gallons and Liters",
          content: "Gallons and liters are both units of volume, but they come from different measurement systems. The gallon is used primarily in the United States (US gallon = 3.785 L) and the United Kingdom (Imperial gallon = 4.546 L). The liter is the standard metric unit used worldwide. Understanding the conversion is essential for international cooking, fuel economy comparisons, and scientific applications.",
        },
        howItWorks: {
          title: "How the Conversion Works",
          content: "To convert US gallons to liters, multiply by 3.78541. For UK gallons, multiply by 4.54609. The difference exists because the US gallon is based on the wine gallon (231 cubic inches) while the UK gallon is based on 10 pounds of water. This converter automatically detects which gallon type you're using based on your selection.",
        },
        considerations: {
          title: "Important Considerations",
          items: [
            { text: "US gallon (3.785 L) is used in the United States", type: "info" },
            { text: "UK/Imperial gallon (4.546 L) is used in the UK and some Commonwealth countries", type: "info" },
            { text: "Always verify which gallon type your source uses", type: "warning" },
            { text: "Fuel economy varies significantly: 30 MPG (US) ≈ 36 MPG (UK)", type: "info" },
            { text: "Recipes from different countries may use different gallon sizes", type: "warning" },
            { text: "Scientific applications typically use liters or milliliters", type: "info" },
          ],
        },
        commonVolumes: {
          title: "Common Volume Conversions",
          items: [
            { text: "1 US gallon = 3.785 liters = 128 fl oz", type: "info" },
            { text: "1 UK gallon = 4.546 liters = 160 UK fl oz", type: "info" },
            { text: "1 liter = 0.264 US gallons = 0.22 UK gallons", type: "info" },
            { text: "1 quart = 0.946 liters (US) or 1.137 liters (UK)", type: "info" },
            { text: "1 pint = 473 mL (US) or 568 mL (UK)", type: "info" },
            { text: "1 cup = 237 mL (US) or 284 mL (UK)", type: "info" },
          ],
        },
        examples: {
          title: "Conversion Examples",
          description: "Real-world scenarios",
          examples: [
            {
              title: "Car Fuel Tank",
              steps: ["Tank capacity: 15 US gallons", "Convert: 15 × 3.785 = 56.78 liters", "This is typical for mid-size sedans"],
              result: "15 gal = 56.78 L",
            },
            {
              title: "Recipe Conversion",
              steps: ["Recipe calls for 0.5 UK gallons of milk", "Convert: 0.5 × 4.546 = 2.27 liters", "Note: UK gallon is larger than US"],
              result: "0.5 UK gal = 2.27 L",
            },
          ],
        },
      },

      faqs: [
        { question: "What's the difference between US and UK gallons?", answer: "A US gallon equals 3.785 liters (128 fl oz), while a UK/Imperial gallon equals 4.546 liters (160 UK fl oz). The UK gallon is approximately 20% larger than the US gallon." },
        { question: "How do I convert gallons to liters?", answer: "Multiply US gallons by 3.78541 or UK gallons by 4.54609. For example, 5 US gallons = 5 × 3.785 = 18.93 liters." },
        { question: "Which countries use gallons?", answer: "The US uses US gallons for fuel and liquids. The UK officially uses liters but still references gallons informally. Some Caribbean and Latin American countries also use US gallons." },
        { question: "Why are there different gallon sizes?", answer: "The US gallon (231 cubic inches) was based on the English wine gallon, while the UK Imperial gallon was defined in 1824 as the volume of 10 pounds of water at 62°F." },
        { question: "How many liters in a gallon of gas?", answer: "In the US, 1 gallon of gas = 3.785 liters. Gas stations in metric countries sell fuel by the liter. To compare prices, divide the per-gallon price by 3.785." },
        { question: "How do I convert fuel economy from MPG to L/100km?", answer: "Divide 235.215 by the MPG value. For example, 30 MPG = 235.215 ÷ 30 = 7.84 L/100km. Lower L/100km means better fuel economy." },
      ],

      rating: { title: "Rate this Calculator", share: "Share", copied: "Copied!", copyLink: "Copy Link", clickToRate: "Click to rate", youRated: "You rated", stars: "stars", averageFrom: "average from", ratings: "ratings" },
      common: { home: "Home", calculators: "Calculators" },
      buttons: { calculate: "Convert", reset: "Reset", pdf: "PDF", csv: "CSV", excel: "Excel", save: "Save", saved: "Saved", saving: "Saving..." },
      share: { calculatedWith: "Calculated with Kalcufy.com" },
      accessibility: { mobileResults: "Results", closeModal: "Close", openMenu: "Menu" },
      sources: { title: "Sources & References" },
    },
    es: {
      "name": "Convertidor de Galones a Litros",
      "slug": "calculadora-galones-a-litros",
      "subtitle": "Convierte galones a litros al instante. Funciona para galones estadounidenses y británicos con equivalentes métricos.",
      "breadcrumb": "Gal a L",
      "seo": {
        "title": "Convertidor de Galones a Litros - Herramienta de Volumen Gratuita",
        "description": "Convierte galones estadounidenses y británicos a litros al instante. Esencial para cocina, economía de combustible y recetas internacionales. Incluye cuartos, pintas y tazas.",
        "shortDescription": "Convierte galones a litros para cocina y combustible.",
        "keywords": [
          "galones a litros",
          "gal a L",
          "convertidor de volumen",
          "galón estadounidense",
          "galón británico",
          "galón imperial",
          "conversión métrica",
          "convertidor de combustible"
        ]
      },
      "inputs": {
        "amount": {
          "label": "Volumen",
          "helpText": "Ingresa el volumen a convertir"
        }
      },
      "results": {
        "liters": {
          "label": "Litros"
        },
        "milliliters": {
          "label": "Mililitros"
        },
        "cubicMeters": {
          "label": "Metros Cúbicos"
        }
      },
      "presets": {
        "carTank": {
          "label": "Tanque de Gasolina",
          "description": "15 galones (~57 L)"
        },
        "waterJug": {
          "label": "Bidón de Agua",
          "description": "5 galones (~19 L)"
        },
        "swimmingPool": {
          "label": "Piscina",
          "description": "20,000 gal (~76,000 L)"
        }
      },
      "values": {
        "L": "L",
        "mL": "mL",
        "m³": "m³",
        "gal": "gal",
        "qt": "ct",
        "pt": "pt",
        "cups": "tzs",
        "fl oz": "oz líq"
      },
      "formats": {
        "summary": "{value} gal = {liters} L"
      },
      "infoCards": {
        "results": {
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
              "label": "Metros Cúbicos",
              "valueKey": "cubicMeters"
            },
            {
              "label": "Cuartos",
              "valueKey": "quarts"
            }
          ]
        },
        "reference": {
          "title": "Referencia Rápida",
          "items": [
            {
              "label": "1 Galón EE.UU.",
              "valueKey": "ref1gal"
            },
            {
              "label": "1 Galón Reino Unido",
              "valueKey": "ref1ukgal"
            },
            {
              "label": "5 Galones EE.UU.",
              "valueKey": "ref5gal"
            },
            {
              "label": "10 Galones EE.UU.",
              "valueKey": "ref10gal"
            }
          ]
        },
        "tips": {
          "title": "Consejos de Conversión",
          "items": [
            "Galón EE.UU. = 3.785 litros, Galón Reino Unido = 4.546 litros",
            "Los galones del Reino Unido son ~20% más grandes que los de EE.UU.",
            "1 galón = 4 cuartos = 8 pintas = 16 tazas",
            "Para combustible: multiplica MPG por 0.425 para obtener km/L"
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Entendiendo Galones y Litros",
          "content": "Los galones y litros son unidades de volumen, pero provienen de sistemas de medición diferentes. El galón se usa principalmente en Estados Unidos (galón EE.UU. = 3.785 L) y Reino Unido (galón imperial = 4.546 L). El litro es la unidad métrica estándar usada mundialmente. Entender la conversión es esencial para cocina internacional, comparaciones de economía de combustible y aplicaciones científicas."
        },
        "howItWorks": {
          "title": "Cómo Funciona la Conversión",
          "content": "Para convertir galones estadounidenses a litros, multiplica por 3.78541. Para galones británicos, multiplica por 4.54609. La diferencia existe porque el galón estadounidense se basa en el galón de vino (231 pulgadas cúbicas) mientras que el galón británico se basa en 10 libras de agua. Este convertidor detecta automáticamente qué tipo de galón estás usando basándose en tu selección."
        },
        "considerations": {
          "title": "Consideraciones Importantes",
          "items": [
            {
              "text": "El galón estadounidense (3.785 L) se usa en Estados Unidos",
              "type": "info"
            },
            {
              "text": "El galón británico/imperial (4.546 L) se usa en Reino Unido y algunos países de la Commonwealth",
              "type": "info"
            },
            {
              "text": "Siempre verifica qué tipo de galón usa tu fuente",
              "type": "warning"
            },
            {
              "text": "La economía de combustible varía significativamente: 30 MPG (EE.UU.) ≈ 36 MPG (Reino Unido)",
              "type": "info"
            },
            {
              "text": "Las recetas de diferentes países pueden usar diferentes tamaños de galón",
              "type": "warning"
            },
            {
              "text": "Las aplicaciones científicas típicamente usan litros o mililitros",
              "type": "info"
            }
          ]
        },
        "commonVolumes": {
          "title": "Conversiones de Volumen Comunes",
          "items": [
            {
              "text": "1 galón EE.UU. = 3.785 litros = 128 oz líq",
              "type": "info"
            },
            {
              "text": "1 galón Reino Unido = 4.546 litros = 160 oz líq Reino Unido",
              "type": "info"
            },
            {
              "text": "1 litro = 0.264 galones EE.UU. = 0.22 galones Reino Unido",
              "type": "info"
            },
            {
              "text": "1 cuarto = 0.946 litros (EE.UU.) o 1.137 litros (Reino Unido)",
              "type": "info"
            },
            {
              "text": "1 pinta = 473 mL (EE.UU.) o 568 mL (Reino Unido)",
              "type": "info"
            },
            {
              "text": "1 taza = 237 mL (EE.UU.) o 284 mL (Reino Unido)",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Ejemplos de Conversión",
          "description": "Escenarios del mundo real",
          "examples": [
            {
              "title": "Tanque de Combustible de Auto",
              "steps": [
                "Capacidad del tanque: 15 galones EE.UU.",
                "Convertir: 15 × 3.785 = 56.78 litros",
                "Esto es típico para sedanes medianos"
              ],
              "result": "15 gal = 56.78 L"
            },
            {
              "title": "Conversión de Receta",
              "steps": [
                "La receta requiere 0.5 galones Reino Unido de leche",
                "Convertir: 0.5 × 4.546 = 2.27 litros",
                "Nota: El galón Reino Unido es más grande que el de EE.UU."
              ],
              "result": "0.5 gal Reino Unido = 2.27 L"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "¿Cuál es la diferencia entre galones estadounidenses y británicos?",
          "answer": "Un galón estadounidense equivale a 3.785 litros (128 oz líq), mientras que un galón británico/imperial equivale a 4.546 litros (160 oz líq británicas). El galón británico es aproximadamente 20% más grande que el estadounidense."
        },
        {
          "question": "¿Cómo convierto galones a litros?",
          "answer": "Multiplica galones estadounidenses por 3.78541 o galones británicos por 4.54609. Por ejemplo, 5 galones estadounidenses = 5 × 3.785 = 18.93 litros."
        },
        {
          "question": "¿Qué países usan galones?",
          "answer": "Estados Unidos usa galones estadounidenses para combustible y líquidos. Reino Unido oficialmente usa litros pero aún referencia galones informalmente. Algunos países caribeños y latinoamericanos también usan galones estadounidenses."
        },
        {
          "question": "¿Por qué hay diferentes tamaños de galón?",
          "answer": "El galón estadounidense (231 pulgadas cúbicas) se basó en el galón inglés de vino, mientras que el galón imperial británico se definió en 1824 como el volumen de 10 libras de agua a 62°F."
        },
        {
          "question": "¿Cuántos litros hay en un galón de gasolina?",
          "answer": "En EE.UU., 1 galón de gasolina = 3.785 litros. Las gasolineras en países métricos venden combustible por litro. Para comparar precios, divide el precio por galón entre 3.785."
        },
        {
          "question": "¿Cómo convierto economía de combustible de MPG a L/100km?",
          "answer": "Divide 235.215 por el valor MPG. Por ejemplo, 30 MPG = 235.215 ÷ 30 = 7.84 L/100km. Un L/100km menor significa mejor economía de combustible."
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
      "name": "Conversor de Galões para Litros",
      "slug": "calculadora-galoes-para-litros",
      "subtitle": "Converta galões para litros instantaneamente. Funciona para galões americanos e britânicos com equivalentes métricos.",
      "breadcrumb": "Gal para L",
      "seo": {
        "title": "Conversor de Galões para Litros - Ferramenta de Volume Gratuita",
        "description": "Converta galões americanos e britânicos para litros instantaneamente. Essencial para culinária, economia de combustível e receitas internacionais. Inclui quartos, pintas e copos.",
        "shortDescription": "Converta galões para litros para culinária e combustível.",
        "keywords": [
          "galões para litros",
          "gal para L",
          "conversor de volume",
          "galão americano",
          "galão britânico",
          "galão imperial",
          "conversão métrica",
          "conversor de combustível"
        ]
      },
      "inputs": {
        "amount": {
          "label": "Volume",
          "helpText": "Digite o volume para converter"
        }
      },
      "results": {
        "liters": {
          "label": "Litros"
        },
        "milliliters": {
          "label": "Mililitros"
        },
        "cubicMeters": {
          "label": "Metros Cúbicos"
        }
      },
      "presets": {
        "carTank": {
          "label": "Tanque de Gasolina",
          "description": "15 galões (~57 L)"
        },
        "waterJug": {
          "label": "Galão de Água",
          "description": "5 galões (~19 L)"
        },
        "swimmingPool": {
          "label": "Piscina",
          "description": "20.000 gal (~76.000 L)"
        }
      },
      "values": {
        "L": "L",
        "mL": "mL",
        "m³": "m³",
        "gal": "gal",
        "qt": "qt",
        "pt": "pt",
        "cups": "copos",
        "fl oz": "fl oz"
      },
      "formats": {
        "summary": "{value} gal = {liters} L"
      },
      "infoCards": {
        "results": {
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
              "label": "Metros Cúbicos",
              "valueKey": "cubicMeters"
            },
            {
              "label": "Quartos",
              "valueKey": "quarts"
            }
          ]
        },
        "reference": {
          "title": "Referência Rápida",
          "items": [
            {
              "label": "1 Galão Americano",
              "valueKey": "ref1gal"
            },
            {
              "label": "1 Galão Britânico",
              "valueKey": "ref1ukgal"
            },
            {
              "label": "5 Galões Americanos",
              "valueKey": "ref5gal"
            },
            {
              "label": "10 Galões Americanos",
              "valueKey": "ref10gal"
            }
          ]
        },
        "tips": {
          "title": "Dicas de Conversão",
          "items": [
            "Galão americano = 3,785 litros, galão britânico = 4,546 litros",
            "Galões britânicos são ~20% maiores que galões americanos",
            "1 galão = 4 quartos = 8 pintas = 16 copos",
            "Para combustível: multiplique MPG por 0,425 para obter km/L"
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Compreendendo Galões e Litros",
          "content": "Galões e litros são unidades de volume, mas vêm de sistemas de medição diferentes. O galão é usado principalmente nos Estados Unidos (galão americano = 3,785 L) e no Reino Unido (galão imperial = 4,546 L). O litro é a unidade métrica padrão usada mundialmente. Compreender a conversão é essencial para culinária internacional, comparações de economia de combustível e aplicações científicas."
        },
        "howItWorks": {
          "title": "Como Funciona a Conversão",
          "content": "Para converter galões americanos para litros, multiplique por 3,78541. Para galões britânicos, multiplique por 4,54609. A diferença existe porque o galão americano é baseado no galão de vinho (231 polegadas cúbicas) enquanto o galão britânico é baseado em 10 libras de água. Este conversor detecta automaticamente qual tipo de galão você está usando com base na sua seleção."
        },
        "considerations": {
          "title": "Considerações Importantes",
          "items": [
            {
              "text": "Galão americano (3,785 L) é usado nos Estados Unidos",
              "type": "info"
            },
            {
              "text": "Galão britânico/imperial (4,546 L) é usado no Reino Unido e alguns países da Commonwealth",
              "type": "info"
            },
            {
              "text": "Sempre verifique qual tipo de galão sua fonte usa",
              "type": "warning"
            },
            {
              "text": "A economia de combustível varia significativamente: 30 MPG (EUA) ≈ 36 MPG (Reino Unido)",
              "type": "info"
            },
            {
              "text": "Receitas de diferentes países podem usar tamanhos de galão diferentes",
              "type": "warning"
            },
            {
              "text": "Aplicações científicas normalmente usam litros ou mililitros",
              "type": "info"
            }
          ]
        },
        "commonVolumes": {
          "title": "Conversões de Volume Comuns",
          "items": [
            {
              "text": "1 galão americano = 3,785 litros = 128 fl oz",
              "type": "info"
            },
            {
              "text": "1 galão britânico = 4,546 litros = 160 fl oz britânicas",
              "type": "info"
            },
            {
              "text": "1 litro = 0,264 galões americanos = 0,22 galões britânicos",
              "type": "info"
            },
            {
              "text": "1 quarto = 0,946 litros (EUA) ou 1,137 litros (Reino Unido)",
              "type": "info"
            },
            {
              "text": "1 pinta = 473 mL (EUA) ou 568 mL (Reino Unido)",
              "type": "info"
            },
            {
              "text": "1 copo = 237 mL (EUA) ou 284 mL (Reino Unido)",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemplos de Conversão",
          "description": "Cenários do mundo real",
          "examples": [
            {
              "title": "Tanque de Combustível do Carro",
              "steps": [
                "Capacidade do tanque: 15 galões americanos",
                "Converter: 15 × 3,785 = 56,78 litros",
                "Isto é típico para sedãs de porte médio"
              ],
              "result": "15 gal = 56,78 L"
            },
            {
              "title": "Conversão de Receita",
              "steps": [
                "Receita pede 0,5 galões britânicos de leite",
                "Converter: 0,5 × 4,546 = 2,27 litros",
                "Nota: Galão britânico é maior que americano"
              ],
              "result": "0,5 gal britânico = 2,27 L"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Qual é a diferença entre galões americanos e britânicos?",
          "answer": "Um galão americano equivale a 3,785 litros (128 fl oz), enquanto um galão britânico/imperial equivale a 4,546 litros (160 fl oz britânicas). O galão britânico é aproximadamente 20% maior que o galão americano."
        },
        {
          "question": "Como converter galões para litros?",
          "answer": "Multiplique galões americanos por 3,78541 ou galões britânicos por 4,54609. Por exemplo, 5 galões americanos = 5 × 3,785 = 18,93 litros."
        },
        {
          "question": "Quais países usam galões?",
          "answer": "Os EUA usam galões americanos para combustível e líquidos. O Reino Unido oficialmente usa litros mas ainda referencia galões informalmente. Alguns países caribenhos e latino-americanos também usam galões americanos."
        },
        {
          "question": "Por que existem tamanhos diferentes de galão?",
          "answer": "O galão americano (231 polegadas cúbicas) foi baseado no galão inglês de vinho, enquanto o galão imperial britânico foi definido em 1824 como o volume de 10 libras de água a 62°F."
        },
        {
          "question": "Quantos litros há em um galão de gasolina?",
          "answer": "Nos EUA, 1 galão de gasolina = 3,785 litros. Postos de gasolina em países métricos vendem combustível por litro. Para comparar preços, divida o preço por galão por 3,785."
        },
        {
          "question": "Como converter economia de combustível de MPG para L/100km?",
          "answer": "Divida 235,215 pelo valor MPG. Por exemplo, 30 MPG = 235,215 ÷ 30 = 7,84 L/100km. Menor L/100km significa melhor economia de combustível."
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
      "name": "Convertisseur Gallons vers Litres",
      "slug": "calculateur-gallons-vers-litres",
      "subtitle": "Convertissez les gallons en litres instantanément. Fonctionne pour les gallons américains et britanniques avec équivalents métriques.",
      "breadcrumb": "Gal vers L",
      "seo": {
        "title": "Convertisseur Gallons vers Litres - Outil de Volume Gratuit",
        "description": "Convertissez les gallons américains et britanniques en litres instantanément. Essentiel pour la cuisine, l'économie de carburant et les recettes internationales. Inclut quarts, pintes et tasses.",
        "shortDescription": "Convertissez les gallons en litres pour la cuisine et le carburant.",
        "keywords": [
          "gallons vers litres",
          "gal vers L",
          "convertisseur volume",
          "gallon américain",
          "gallon britannique",
          "gallon impérial",
          "conversion métrique",
          "convertisseur carburant"
        ]
      },
      "inputs": {
        "amount": {
          "label": "Volume",
          "helpText": "Entrez le volume à convertir"
        }
      },
      "results": {
        "liters": {
          "label": "Litres"
        },
        "milliliters": {
          "label": "Millilitres"
        },
        "cubicMeters": {
          "label": "Mètres Cubes"
        }
      },
      "presets": {
        "carTank": {
          "label": "Réservoir de Voiture",
          "description": "15 gallons (~57 L)"
        },
        "waterJug": {
          "label": "Bidon d'Eau",
          "description": "5 gallons (~19 L)"
        },
        "swimmingPool": {
          "label": "Piscine",
          "description": "20 000 gal (~76 000 L)"
        }
      },
      "values": {
        "L": "L",
        "mL": "mL",
        "m³": "m³",
        "gal": "gal",
        "qt": "qt",
        "pt": "pt",
        "cups": "tasses",
        "fl oz": "fl oz"
      },
      "formats": {
        "summary": "{value} gal = {liters} L"
      },
      "infoCards": {
        "results": {
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
              "label": "Mètres Cubes",
              "valueKey": "cubicMeters"
            },
            {
              "label": "Quarts",
              "valueKey": "quarts"
            }
          ]
        },
        "reference": {
          "title": "Référence Rapide",
          "items": [
            {
              "label": "1 Gallon Américain",
              "valueKey": "ref1gal"
            },
            {
              "label": "1 Gallon Britannique",
              "valueKey": "ref1ukgal"
            },
            {
              "label": "5 Gallons Américains",
              "valueKey": "ref5gal"
            },
            {
              "label": "10 Gallons Américains",
              "valueKey": "ref10gal"
            }
          ]
        },
        "tips": {
          "title": "Conseils de Conversion",
          "items": [
            "Gallon américain = 3,785 litres, gallon britannique = 4,546 litres",
            "Les gallons britanniques sont ~20% plus grands que les gallons américains",
            "1 gallon = 4 quarts = 8 pintes = 16 tasses",
            "Pour le carburant : multipliez les MPG par 0,425 pour obtenir km/L"
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Comprendre les Gallons et les Litres",
          "content": "Les gallons et les litres sont tous deux des unités de volume, mais ils proviennent de systèmes de mesure différents. Le gallon est utilisé principalement aux États-Unis (gallon américain = 3,785 L) et au Royaume-Uni (gallon impérial = 4,546 L). Le litre est l'unité métrique standard utilisée dans le monde entier. Comprendre la conversion est essentiel pour la cuisine internationale, les comparaisons d'économie de carburant et les applications scientifiques."
        },
        "howItWorks": {
          "title": "Comment Fonctionne la Conversion",
          "content": "Pour convertir les gallons américains en litres, multipliez par 3,78541. Pour les gallons britanniques, multipliez par 4,54609. La différence existe car le gallon américain est basé sur le gallon de vin (231 pouces cubes) tandis que le gallon britannique est basé sur 10 livres d'eau. Ce convertisseur détecte automatiquement le type de gallon que vous utilisez selon votre sélection."
        },
        "considerations": {
          "title": "Considérations Importantes",
          "items": [
            {
              "text": "Le gallon américain (3,785 L) est utilisé aux États-Unis",
              "type": "info"
            },
            {
              "text": "Le gallon britannique/impérial (4,546 L) est utilisé au Royaume-Uni et dans certains pays du Commonwealth",
              "type": "info"
            },
            {
              "text": "Vérifiez toujours quel type de gallon utilise votre source",
              "type": "warning"
            },
            {
              "text": "L'économie de carburant varie considérablement : 30 MPG (US) ≈ 36 MPG (UK)",
              "type": "info"
            },
            {
              "text": "Les recettes de différents pays peuvent utiliser différentes tailles de gallon",
              "type": "warning"
            },
            {
              "text": "Les applications scientifiques utilisent généralement des litres ou millilitres",
              "type": "info"
            }
          ]
        },
        "commonVolumes": {
          "title": "Conversions de Volume Courantes",
          "items": [
            {
              "text": "1 gallon américain = 3,785 litres = 128 fl oz",
              "type": "info"
            },
            {
              "text": "1 gallon britannique = 4,546 litres = 160 fl oz britanniques",
              "type": "info"
            },
            {
              "text": "1 litre = 0,264 gallons américains = 0,22 gallons britanniques",
              "type": "info"
            },
            {
              "text": "1 quart = 0,946 litres (US) ou 1,137 litres (UK)",
              "type": "info"
            },
            {
              "text": "1 pinte = 473 mL (US) ou 568 mL (UK)",
              "type": "info"
            },
            {
              "text": "1 tasse = 237 mL (US) ou 284 mL (UK)",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemples de Conversion",
          "description": "Scénarios du monde réel",
          "examples": [
            {
              "title": "Réservoir de Carburant de Voiture",
              "steps": [
                "Capacité du réservoir : 15 gallons américains",
                "Convertir : 15 × 3,785 = 56,78 litres",
                "C'est typique pour les berlines de taille moyenne"
              ],
              "result": "15 gal = 56,78 L"
            },
            {
              "title": "Conversion de Recette",
              "steps": [
                "La recette demande 0,5 gallons britanniques de lait",
                "Convertir : 0,5 × 4,546 = 2,27 litres",
                "Note : le gallon britannique est plus grand que l'américain"
              ],
              "result": "0,5 gal UK = 2,27 L"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Quelle est la différence entre les gallons américains et britanniques ?",
          "answer": "Un gallon américain égale 3,785 litres (128 fl oz), tandis qu'un gallon britannique/impérial égale 4,546 litres (160 fl oz britanniques). Le gallon britannique est environ 20% plus grand que le gallon américain."
        },
        {
          "question": "Comment convertir les gallons en litres ?",
          "answer": "Multipliez les gallons américains par 3,78541 ou les gallons britanniques par 4,54609. Par exemple, 5 gallons américains = 5 × 3,785 = 18,93 litres."
        },
        {
          "question": "Quels pays utilisent les gallons ?",
          "answer": "Les États-Unis utilisent les gallons américains pour le carburant et les liquides. Le Royaume-Uni utilise officiellement les litres mais fait encore référence aux gallons informellement. Certains pays des Caraïbes et d'Amérique latine utilisent aussi les gallons américains."
        },
        {
          "question": "Pourquoi y a-t-il différentes tailles de gallon ?",
          "answer": "Le gallon américain (231 pouces cubes) était basé sur le gallon de vin anglais, tandis que le gallon impérial britannique fut défini en 1824 comme le volume de 10 livres d'eau à 62°F."
        },
        {
          "question": "Combien de litres dans un gallon d'essence ?",
          "answer": "Aux États-Unis, 1 gallon d'essence = 3,785 litres. Les stations-service dans les pays métriques vendent le carburant au litre. Pour comparer les prix, divisez le prix par gallon par 3,785."
        },
        {
          "question": "Comment convertir l'économie de carburant de MPG en L/100km ?",
          "answer": "Divisez 235,215 par la valeur MPG. Par exemple, 30 MPG = 235,215 ÷ 30 = 7,84 L/100km. Un L/100km plus bas signifie une meilleure économie de carburant."
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
      "name": "Gallonen zu Liter Umrechner",
      "slug": "gallonen-zu-liter-rechner",
      "subtitle": "Rechnen Sie Gallonen sofort in Liter um. Funktioniert für US- und UK-Gallonen mit metrischen Entsprechungen.",
      "breadcrumb": "Gal zu L",
      "seo": {
        "title": "Gallonen zu Liter Umrechner - Kostenloses Volumen-Tool",
        "description": "Rechnen Sie US- und UK-Gallonen sofort in Liter um. Unverzichtbar für Kochen, Kraftstoffverbrauch und internationale Rezepte. Enthält Quart, Pints und Cups.",
        "shortDescription": "Rechnen Sie Gallonen in Liter um für Kochen und Kraftstoff.",
        "keywords": [
          "Gallonen zu Liter",
          "Gal zu L",
          "Volumen Umrechner",
          "US Gallone",
          "UK Gallone",
          "Imperial Gallone",
          "metrische Umrechnung",
          "Kraftstoff Umrechner"
        ]
      },
      "inputs": {
        "amount": {
          "label": "Volumen",
          "helpText": "Geben Sie das zu konvertierende Volumen ein"
        }
      },
      "results": {
        "liters": {
          "label": "Liter"
        },
        "milliliters": {
          "label": "Milliliter"
        },
        "cubicMeters": {
          "label": "Kubikmeter"
        }
      },
      "presets": {
        "carTank": {
          "label": "Auto-Kraftstofftank",
          "description": "15 Gallonen (~57 L)"
        },
        "waterJug": {
          "label": "Wasserkrug",
          "description": "5 Gallonen (~19 L)"
        },
        "swimmingPool": {
          "label": "Schwimmbecken",
          "description": "20.000 Gal (~76.000 L)"
        }
      },
      "values": {
        "L": "L",
        "mL": "mL",
        "m³": "m³",
        "gal": "Gal",
        "qt": "Qt",
        "pt": "Pt",
        "cups": "Tassen",
        "fl oz": "fl oz"
      },
      "formats": {
        "summary": "{value} Gal = {liters} L"
      },
      "infoCards": {
        "results": {
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
              "label": "Kubikmeter",
              "valueKey": "cubicMeters"
            },
            {
              "label": "Quart",
              "valueKey": "quarts"
            }
          ]
        },
        "reference": {
          "title": "Schnellreferenz",
          "items": [
            {
              "label": "1 US-Gallone",
              "valueKey": "ref1gal"
            },
            {
              "label": "1 UK-Gallone",
              "valueKey": "ref1ukgal"
            },
            {
              "label": "5 US-Gallonen",
              "valueKey": "ref5gal"
            },
            {
              "label": "10 US-Gallonen",
              "valueKey": "ref10gal"
            }
          ]
        },
        "tips": {
          "title": "Umrechnungstipps",
          "items": [
            "US-Gallone = 3,785 Liter, UK-Gallone = 4,546 Liter",
            "UK-Gallonen sind ~20% größer als US-Gallonen",
            "1 Gallone = 4 Quart = 8 Pints = 16 Cups",
            "Für Kraftstoff: MPG mit 0,425 multiplizieren um km/L zu erhalten"
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Gallonen und Liter verstehen",
          "content": "Gallonen und Liter sind beide Volumeneinheiten, stammen aber aus verschiedenen Messsystemen. Die Gallone wird hauptsächlich in den Vereinigten Staaten (US-Gallone = 3,785 L) und im Vereinigten Königreich (Imperial-Gallone = 4,546 L) verwendet. Der Liter ist die weltweit verwendete metrische Standardeinheit. Das Verständnis der Umrechnung ist wesentlich für internationales Kochen, Kraftstoffverbrauchsvergleiche und wissenschaftliche Anwendungen."
        },
        "howItWorks": {
          "title": "Wie die Umrechnung funktioniert",
          "content": "Um US-Gallonen in Liter umzurechnen, multiplizieren Sie mit 3,78541. Für UK-Gallonen multiplizieren Sie mit 4,54609. Der Unterschied besteht, weil die US-Gallone auf der Weingallone (231 Kubikzoll) basiert, während die UK-Gallone auf 10 Pfund Wasser basiert. Dieser Umrechner erkennt automatisch, welchen Gallonentyp Sie verwenden, basierend auf Ihrer Auswahl."
        },
        "considerations": {
          "title": "Wichtige Überlegungen",
          "items": [
            {
              "text": "US-Gallone (3,785 L) wird in den Vereinigten Staaten verwendet",
              "type": "info"
            },
            {
              "text": "UK/Imperial-Gallone (4,546 L) wird im Vereinigten Königreich und einigen Commonwealth-Ländern verwendet",
              "type": "info"
            },
            {
              "text": "Überprüfen Sie immer, welchen Gallonentyp Ihre Quelle verwendet",
              "type": "warning"
            },
            {
              "text": "Kraftstoffverbrauch variiert erheblich: 30 MPG (US) ≈ 36 MPG (UK)",
              "type": "info"
            },
            {
              "text": "Rezepte aus verschiedenen Ländern können unterschiedliche Gallonengrößen verwenden",
              "type": "warning"
            },
            {
              "text": "Wissenschaftliche Anwendungen verwenden typischerweise Liter oder Milliliter",
              "type": "info"
            }
          ]
        },
        "commonVolumes": {
          "title": "Häufige Volumenumrechnungen",
          "items": [
            {
              "text": "1 US-Gallone = 3,785 Liter = 128 fl oz",
              "type": "info"
            },
            {
              "text": "1 UK-Gallone = 4,546 Liter = 160 UK fl oz",
              "type": "info"
            },
            {
              "text": "1 Liter = 0,264 US-Gallonen = 0,22 UK-Gallonen",
              "type": "info"
            },
            {
              "text": "1 Quart = 0,946 Liter (US) oder 1,137 Liter (UK)",
              "type": "info"
            },
            {
              "text": "1 Pint = 473 mL (US) oder 568 mL (UK)",
              "type": "info"
            },
            {
              "text": "1 Cup = 237 mL (US) oder 284 mL (UK)",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Umrechnungsbeispiele",
          "description": "Praxisnahe Szenarien",
          "examples": [
            {
              "title": "Auto-Kraftstofftank",
              "steps": [
                "Tankinhalt: 15 US-Gallonen",
                "Umrechnung: 15 × 3,785 = 56,78 Liter",
                "Dies ist typisch für mittelgroße Limousinen"
              ],
              "result": "15 Gal = 56,78 L"
            },
            {
              "title": "Rezept-Umrechnung",
              "steps": [
                "Rezept verlangt 0,5 UK-Gallonen Milch",
                "Umrechnung: 0,5 × 4,546 = 2,27 Liter",
                "Hinweis: UK-Gallone ist größer als US-Gallone"
              ],
              "result": "0,5 UK-Gal = 2,27 L"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Was ist der Unterschied zwischen US- und UK-Gallonen?",
          "answer": "Eine US-Gallone entspricht 3,785 Litern (128 fl oz), während eine UK/Imperial-Gallone 4,546 Litern (160 UK fl oz) entspricht. Die UK-Gallone ist etwa 20% größer als die US-Gallone."
        },
        {
          "question": "Wie rechne ich Gallonen in Liter um?",
          "answer": "Multiplizieren Sie US-Gallonen mit 3,78541 oder UK-Gallonen mit 4,54609. Zum Beispiel: 5 US-Gallonen = 5 × 3,785 = 18,93 Liter."
        },
        {
          "question": "Welche Länder verwenden Gallonen?",
          "answer": "Die USA verwenden US-Gallonen für Kraftstoff und Flüssigkeiten. Das Vereinigte Königreich verwendet offiziell Liter, bezieht sich aber immer noch informell auf Gallonen. Einige karibische und lateinamerikanische Länder verwenden auch US-Gallonen."
        },
        {
          "question": "Warum gibt es verschiedene Gallonengrößen?",
          "answer": "Die US-Gallone (231 Kubikzoll) basierte auf der englischen Weingallone, während die UK-Imperial-Gallone 1824 als das Volumen von 10 Pfund Wasser bei 62°F definiert wurde."
        },
        {
          "question": "Wie viele Liter hat eine Gallone Benzin?",
          "answer": "In den USA entspricht 1 Gallone Benzin 3,785 Litern. Tankstellen in metrischen Ländern verkaufen Kraftstoff pro Liter. Um Preise zu vergleichen, teilen Sie den Pro-Gallonen-Preis durch 3,785."
        },
        {
          "question": "Wie rechne ich Kraftstoffverbrauch von MPG in L/100km um?",
          "answer": "Teilen Sie 235,215 durch den MPG-Wert. Zum Beispiel: 30 MPG = 235,215 ÷ 30 = 7,84 L/100km. Niedrigere L/100km bedeutet besseren Kraftstoffverbrauch."
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
      defaultValue: 1,
      placeholder: "1",
      min: 0,
      step: 0.1,
      unitType: "volume",
      syncGroup: false,
      defaultUnit: "gal_us",
      allowedUnits: ["gal_us", "gal_uk", "L", "mL", "qt_us", "pt_us", "cups", "fl_oz"],
    },
  ],

  inputGroups: [],

  results: [
    { id: "liters", type: "primary", format: "number" },
    { id: "milliliters", type: "secondary", format: "number" },
    { id: "cubicMeters", type: "secondary", format: "number" },
  ],

  infoCards: [
    { id: "results", type: "list", icon: "📊", itemCount: 4 },
    { id: "reference", type: "list", icon: "📖", itemCount: 4 },
    { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  referenceData: [],

  educationSections: [
    { id: "whatIs", type: "prose", icon: "📖" },
    { id: "howItWorks", type: "prose", icon: "⚙️" },
    { id: "considerations", type: "list", icon: "📋", itemCount: 6 },
    { id: "commonVolumes", type: "list", icon: "🔢", itemCount: 6 },
    { id: "examples", type: "code-example", icon: "🧮", columns: 2, exampleCount: 2 },
  ],

  faqs: [{ id: "0" }, { id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }],

  references: [
    { authors: "NIST", year: "2024", title: "Handbook 44 - Specifications for Volume Measures", source: "National Institute of Standards and Technology", url: "https://www.nist.gov/pml/weights-and-measures/publications/nist-handbooks/handbook-44" },
    { authors: "UK Weights and Measures Act", year: "1985", title: "Units of Measurement Regulations", source: "UK Government", url: "https://www.legislation.gov.uk/ukpga/1985/72" },
  ],

  hero: { badge: "Volume Converter", title: "Gallons to Liters" },
  sidebar: { showConversions: true, showRelated: true },
  features: { showPresets: true, showShare: true, showPrint: true },
  relatedCalculators: ["cups-to-ml", "mph-to-kmh", "square-feet-to-square-meters"],
  ads: { showTopBanner: false, showSidebar: true, showBetweenSections: false },
};

// ============================================================================
// CALCULATE FUNCTION
// ============================================================================

function fmtNum(val: number): string {
  if (val === 0) return "0";
  if (Math.abs(val) < 0.001) return val.toExponential(2);
  if (Math.abs(val) >= 1000) return val.toLocaleString("en-US", { maximumFractionDigits: 2 });
  return val.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 4 });
}

export function calculateGallonsToLiters(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits = {}, t } = data;
  const v = (t?.values as Record<string, string>) || {};

  const amount = values.amount as number;
  const fromUnit = fieldUnits.amount || "gal_us";

  if (amount === undefined || amount === null || amount < 0) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  // Conversion factors to liters (from registry.ts VOLUME)
  const toL: Record<string, number> = {
    "gal_us": 3.78541,
    "gal_uk": 4.54609,
    "L": 1,
    "mL": 0.001,
    "qt_us": 0.946353,
    "pt_us": 0.473176,
    "cups": 0.24,
    "fl_oz": 0.0295735,
  };

  const factor = toL[fromUnit] || 3.78541;
  const liters = amount * factor;
  const milliliters = liters * 1000;
  const cubicMeters = liters / 1000;
  const quarts = liters / 0.946353;

  // Reference values
  const ref1gal = 3.78541;
  const ref1ukgal = 4.54609;
  const ref5gal = 5 * 3.78541;
  const ref10gal = 10 * 3.78541;

  const lUnit = v["L"] || "L";
  const mlUnit = v["mL"] || "mL";
  const m3Unit = v["m³"] || "m³";
  const qtUnit = v["qt"] || "qt";

  return {
    values: { liters, milliliters, cubicMeters, quarts, ref1gal, ref1ukgal, ref5gal, ref10gal },
    formatted: {
      liters: `${fmtNum(liters)} ${lUnit}`,
      milliliters: `${fmtNum(milliliters)} ${mlUnit}`,
      cubicMeters: `${fmtNum(cubicMeters)} ${m3Unit}`,
      quarts: `${fmtNum(quarts)} ${qtUnit}`,
      ref1gal: `${fmtNum(ref1gal)} ${lUnit}`,
      ref1ukgal: `${fmtNum(ref1ukgal)} ${lUnit}`,
      ref5gal: `${fmtNum(ref5gal)} ${lUnit}`,
      ref10gal: `${fmtNum(ref10gal)} ${lUnit}`,
    },
    summary: `${fmtNum(amount)} ${fromUnit} = ${fmtNum(liters)} ${lUnit}`,
    isValid: true,
  };
}

export default gallonsToLitersConverterConfig;
