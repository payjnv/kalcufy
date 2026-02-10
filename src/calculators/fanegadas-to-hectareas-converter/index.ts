import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";

// 1 fanegada = 6,400 m² (Colombia standard)
// 1 hectárea = 10,000 m²
// 1 fanegada = 0.64 hectáreas
const FAN_TO_M2 = 6400;
const HA_TO_M2 = 10000;
const FAN_TO_HA = FAN_TO_M2 / HA_TO_M2; // 0.64
const ACRE_TO_M2 = 4046.8564224;

export const fanegadasToHectareasConfig: CalculatorConfigV4 = {
  id: "fanegadas-to-hectareas",
  version: "4.0",
  category: "conversion",
  icon: "🌿",
  presets: [
    { id: "smallPlot", icon: "🏡", values: { fanValue: 1 } },
    { id: "coffeeFarm", icon: "☕", values: { fanValue: 5 } },
    { id: "cattleRanch", icon: "🐄", values: { fanValue: 20 } },
    { id: "largeFinca", icon: "🏞️", values: { fanValue: 100 } },
  ],
  t: {
    en: {
      name: "Fanegadas to Hectares Converter", slug: "fanegadas-to-hectares-converter",
      subtitle: "Convert fanegadas to hectares, acres, and square meters — Colombia's traditional land unit.",
      breadcrumb: "Fanegadas to Hectares",
      seo: {
        title: "Fanegadas to Hectares Converter - Colombian Land Unit",
        description: "Convert fanegadas to hectares instantly. The fanegada is Colombia's traditional land measurement unit. 1 fanegada = 6,400 m² = 0.64 hectares.",
        shortDescription: "Convert Colombian fanegadas to hectares.",
        keywords: ["fanegada to hectare", "fanegada converter", "fanegada a hectarea", "colombian land unit", "convert fanegada", "how many hectares in a fanegada", "fanegada to acres", "fanegada metros cuadrados"],
      },
      calculator: { yourInformation: "Enter Value" },
      ui: { yourInformation: "Enter Value", calculate: "Convert", reset: "Reset", results: "Results" },
      inputs: { fanValue: { label: "Fanegadas", helpText: "Enter the number of fanegadas to convert" } },
      results: { hectares: { label: "Hectares" }, acres: { label: "Acres" }, m2: { label: "Square Meters" }, km2: { label: "Square Kilometers" }, plazas: { label: "Plazas" } },
      presets: {
        smallPlot: { label: "1 Fanegada", description: "Small plot" },
        coffeeFarm: { label: "5 Fanegadas", description: "Coffee farm" },
        cattleRanch: { label: "20 Fanegadas", description: "Cattle ranch" },
        largeFinca: { label: "100 Fanegadas", description: "Large finca" },
      },
      values: { ha: "ha", ac: "acres", m2: "m²", km2: "km²", plz: "plazas", fan: "fan" },
      formats: { summary: "{fanValue} fanegadas = {hectares} hectares" },
      infoCards: {
        quickConversions: {
          title: "Quick Reference",
          items: [
            { label: "1 fanegada", valueKey: "ref1" }, { label: "2 fanegadas", valueKey: "ref2" },
            { label: "5 fanegadas", valueKey: "ref5" }, { label: "10 fanegadas", valueKey: "ref10" },
            { label: "50 fanegadas", valueKey: "ref50" }, { label: "100 fanegadas", valueKey: "ref100" },
          ],
        },
        tips: {
          title: "Conversion Tips",
          items: [
            "1 fanegada = 0.64 hectares — multiply by 0.64 for a quick conversion",
            "1 fanegada = 6,400 m² — roughly 80m × 80m",
            "For acres: 1 fanegada ≈ 1.58 acres — just over 1½ acres",
            "Common in Colombian real estate: 'finca de 10 fanegadas' = 6.4 hectares",
          ],
        },
      },
      education: {
        howToConvert: { title: "How to Convert Fanegadas to Hectares", content: "To convert fanegadas to hectares, multiply the number of fanegadas by 0.64. One fanegada equals 6,400 square meters in Colombia, and since one hectare is 10,000 square meters, the ratio is 6,400 ÷ 10,000 = 0.64. The fanegada originated from the amount of land that could be sown with one fanega (a unit of grain volume) of seed. In Colombia, this unit became standardized at 6,400 m², though historically the size varied by region. Today it remains widely used in rural property transactions across Colombia, especially in the departments of Cundinamarca, Boyacá, Santander, and the Coffee Region." },
        commonUses: { title: "Where the Fanegada Is Used Today", content: "The fanegada is deeply embedded in Colombian rural real estate and agriculture. Coffee farms in the Eje Cafetero (Quindío, Risaralda, Caldas) are traditionally measured in fanegadas — a typical small coffee farm is 3 to 8 fanegadas. Flower farms in the Sabana de Bogotá quote production per fanegada. Cattle ranches in the llanos and Santander measure grazing capacity in fanegadas. Property listings on Colombian real estate platforms like Fincaraíz and Metrocuadrado still show rural properties in fanegadas alongside hectares. Land reform documents, INCODER certificates, and rural property titles (escrituras) frequently reference fanegadas. Even Colombian banks require fanegada-to-hectare conversion when processing rural property loans." },
        examples: {
          title: "Conversion Examples", description: "Step-by-step fanegada conversions",
          examples: [
            { title: "Convert 8 fanegadas to hectares (coffee farm)", steps: ["Formula: hectares = fanegadas × 0.64", "8 × 0.64 = 5.12", "8 fanegadas = 5.12 hectares"], result: "8 fan = 5.12 ha" },
            { title: "Convert 25 fanegadas to acres (cattle ranch)", steps: ["First to m²: 25 × 6,400 = 160,000 m²", "Then to acres: 160,000 ÷ 4,046.86 = 39.54", "25 fanegadas = 39.54 acres"], result: "25 fan = 39.54 acres" },
          ],
        },
      },
      faqs: [
        { question: "How many hectares is 1 fanegada?", answer: "1 fanegada equals exactly 0.64 hectares (6,400 square meters)." },
        { question: "How many acres is 1 fanegada?", answer: "1 fanegada equals approximately 1.58 acres." },
        { question: "Is the fanegada only used in Colombia?", answer: "The fanegada of 6,400 m² is specifically Colombian. Spain and other Latin American countries had similar units called 'fanega' but with different sizes." },
        { question: "Why is the fanegada 6,400 m²?", answer: "It comes from 80 × 80 varas castellanas. The Colombian vara is 0.8 meters, so 80 varas = 64 meters, and 64 × 64 = 4,096... however the standardized Colombian fanegada was fixed at 6,400 m² by convention." },
        { question: "Is the fanegada legally recognized in Colombia?", answer: "Yes, the fanegada appears in Colombian property titles (escrituras), IGAC cadastral records, and rural land documentation. It is widely understood by notaries and land registrars." },
        { question: "How many fanegadas in 1 hectare?", answer: "1 hectare = 1.5625 fanegadas (10,000 ÷ 6,400 = 1.5625)." },
      ],
      rating: { title: "Rate this Converter", share: "Share", copied: "Copied!", copyLink: "Copy Link", clickToRate: "Click to rate", youRated: "You rated", stars: "stars", averageFrom: "average from", ratings: "ratings" },
      common: { home: "Home", calculators: "Calculators" },
      buttons: { calculate: "Convert", reset: "Reset", pdf: "PDF", csv: "CSV", excel: "Excel", save: "Save", saved: "Saved", saving: "Saving..." },
      share: { calculatedWith: "Converted with Kalcufy.com" },
      accessibility: { mobileResults: "Results", closeModal: "Close", openMenu: "Menu" },
      sources: { title: "Sources & References" },
      detailedTable: { conversionTable: { button: "View Full Conversion Table", title: "Fanegadas to Hectares Conversion Table", columns: { fan: "Fanegadas", ha: "Hectares", acres: "Acres", m2: "Square Meters" } } },
    },
    es: {
      "name": "Convertidor de Fanegadas a Hectáreas",
      "slug": "calculadora-convertidor-fanegadas-hectareas",
      "subtitle": "Convierte fanegadas a hectáreas, acres y metros cuadrados — la unidad tradicional de tierra de Colombia.",
      "breadcrumb": "Fanegadas a Hectáreas",
      "seo": {
        "title": "Convertidor de Fanegadas a Hectáreas - Unidad de Tierra Colombiana",
        "description": "Convierte fanegadas a hectáreas instantáneamente. La fanegada es la unidad tradicional de medición de tierra de Colombia. 1 fanegada = 6,400 m² = 0.64 hectáreas.",
        "shortDescription": "Convierte fanegadas colombianas a hectáreas.",
        "keywords": [
          "fanegada a hectarea",
          "convertidor fanegada",
          "fanegada a hectárea",
          "unidad de tierra colombiana",
          "convertir fanegada",
          "cuantas hectareas en una fanegada",
          "fanegada a acres",
          "fanegada metros cuadrados"
        ]
      },
      "calculator": {
        "yourInformation": "Tu Información"
      },
      "inputs": {
        "fanValue": {
          "label": "Fanegadas",
          "helpText": "Ingrese el número de fanegadas a convertir"
        }
      },
      "results": {
        "hectares": {
          "label": "Hectáreas"
        },
        "acres": {
          "label": "Acres"
        },
        "m2": {
          "label": "Metros Cuadrados"
        },
        "km2": {
          "label": "Kilómetros Cuadrados"
        },
        "plazas": {
          "label": "Plazas"
        }
      },
      "presets": {
        "smallPlot": {
          "label": "1 Fanegada",
          "description": "Parcela pequeña"
        },
        "coffeeFarm": {
          "label": "5 Fanegadas",
          "description": "Finca cafetera"
        },
        "cattleRanch": {
          "label": "20 Fanegadas",
          "description": "Hacienda ganadera"
        },
        "largeFinca": {
          "label": "100 Fanegadas",
          "description": "Finca grande"
        }
      },
      "values": {
        "ha": "ha",
        "ac": "acres",
        "m2": "m²",
        "km2": "km²",
        "plz": "plazas",
        "fan": "fan"
      },
      "formats": {
        "summary": "{fanValue} fanegadas = {hectares} hectáreas"
      },
      "infoCards": {
        "quickConversions": {
          "title": "Referencia Rápida",
          "items": [
            {
              "label": "1 fanegada",
              "valueKey": "ref1"
            },
            {
              "label": "2 fanegadas",
              "valueKey": "ref2"
            },
            {
              "label": "5 fanegadas",
              "valueKey": "ref5"
            },
            {
              "label": "10 fanegadas",
              "valueKey": "ref10"
            },
            {
              "label": "50 fanegadas",
              "valueKey": "ref50"
            },
            {
              "label": "100 fanegadas",
              "valueKey": "ref100"
            }
          ]
        },
        "tips": {
          "title": "Consejos de Conversión",
          "items": [
            "1 fanegada = 0.64 hectáreas — multiplique por 0.64 para una conversión rápida",
            "1 fanegada = 6,400 m² — aproximadamente 80m × 80m",
            "Para acres: 1 fanegada ≈ 1.58 acres — poco más de 1½ acres",
            "Común en bienes raíces colombianos: 'finca de 10 fanegadas' = 6.4 hectáreas"
          ]
        }
      },
      "education": {
        "howToConvert": {
          "title": "Cómo Convertir Fanegadas a Hectáreas",
          "content": "Para convertir fanegadas a hectáreas, multiplique el número de fanegadas por 0.64. Una fanegada equivale a 6,400 metros cuadrados en Colombia, y como una hectárea son 10,000 metros cuadrados, la proporción es 6,400 ÷ 10,000 = 0.64. La fanegada se originó de la cantidad de tierra que se podía sembrar con una fanega (una unidad de volumen de grano) de semilla. En Colombia, esta unidad se estandarizó en 6,400 m², aunque históricamente el tamaño variaba por región. Hoy permanece ampliamente usada en transacciones de propiedades rurales en toda Colombia, especialmente en los departamentos de Cundinamarca, Boyacá, Santander y la Región Cafetera."
        },
        "commonUses": {
          "title": "Dónde Se Usa la Fanegada Hoy",
          "content": "La fanegada está profundamente arraigada en los bienes raíces rurales y la agricultura colombiana. Las fincas cafeteras en el Eje Cafetero (Quindío, Risaralda, Caldas) se miden tradicionalmente en fanegadas — una finca cafetera pequeña típica es de 3 a 8 fanegadas. Las floriculterizas en la Sabana de Bogotá cotizan producción por fanegada. Las haciendas ganaderas en los llanos y Santander miden capacidad de pastoreo en fanegadas. Los listados de propiedades en plataformas inmobiliarias colombianas como Fincaraíz y Metrocuadrado aún muestran propiedades rurales en fanegadas junto con hectáreas. Los documentos de reforma agraria, certificados del INCODER y títulos de propiedades rurales (escrituras) frecuentemente referencian fanegadas. Incluso los bancos colombianos requieren conversión de fanegada a hectárea al procesar préstamos de propiedades rurales."
        },
        "examples": {
          "title": "Ejemplos de Conversión",
          "description": "Conversiones de fanegadas paso a paso",
          "examples": [
            {
              "title": "Convertir 8 fanegadas a hectáreas (finca cafetera)",
              "steps": [
                "Fórmula: hectáreas = fanegadas × 0.64",
                "8 × 0.64 = 5.12",
                "8 fanegadas = 5.12 hectáreas"
              ],
              "result": "8 fan = 5.12 ha"
            },
            {
              "title": "Convertir 25 fanegadas a acres (hacienda ganadera)",
              "steps": [
                "Primero a m²: 25 × 6,400 = 160,000 m²",
                "Luego a acres: 160,000 ÷ 4,046.86 = 39.54",
                "25 fanegadas = 39.54 acres"
              ],
              "result": "25 fan = 39.54 acres"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "¿Cuántas hectáreas son 1 fanegada?",
          "answer": "1 fanegada equivale exactamente a 0.64 hectáreas (6,400 metros cuadrados)."
        },
        {
          "question": "¿Cuántos acres son 1 fanegada?",
          "answer": "1 fanegada equivale aproximadamente a 1.58 acres."
        },
        {
          "question": "¿Se usa la fanegada solo en Colombia?",
          "answer": "La fanegada de 6,400 m² es específicamente colombiana. España y otros países latinoamericanos tuvieron unidades similares llamadas 'fanega' pero con tamaños diferentes."
        },
        {
          "question": "¿Por qué la fanegada son 6,400 m²?",
          "answer": "Viene de 80 × 80 varas castellanas. La vara colombiana es 0.8 metros, así que 80 varas = 64 metros, y 64 × 64 = 4,096... sin embargo la fanegada colombiana estandarizada se fijó en 6,400 m² por convención."
        },
        {
          "question": "¿Es la fanegada legalmente reconocida en Colombia?",
          "answer": "Sí, la fanegada aparece en títulos de propiedad colombianos (escrituras), registros catastrales del IGAC y documentación de tierras rurales. Es ampliamente entendida por notarios y registradores de tierras."
        },
        {
          "question": "¿Cuántas fanegadas hay en 1 hectárea?",
          "answer": "1 hectárea = 1.5625 fanegadas (10,000 ÷ 6,400 = 1.5625)."
        }
      ],
      "detailedTable": {
        "conversionTable": {
          "button": "Ver Tabla de Conversión Completa",
          "title": "Tabla de Conversión de Fanegadas a Hectáreas",
          "columns": {
            "fan": "Fanegadas",
            "ha": "Hectáreas",
            "acres": "Acres",
            "m2": "Metros Cuadrados"
          }
        }
      },
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
      "name": "Conversor de Fanegadas para Hectares",
      "slug": "calculadora-conversor-fanegadas-hectares",
      "subtitle": "Converta fanegadas para hectares, acres e metros quadrados — unidade tradicional de terra da Colômbia.",
      "breadcrumb": "Fanegadas para Hectares",
      "seo": {
        "title": "Conversor de Fanegadas para Hectares - Unidade de Terra Colombiana",
        "description": "Converta fanegadas para hectares instantaneamente. A fanegada é a unidade tradicional de medição de terra da Colômbia. 1 fanegada = 6.400 m² = 0,64 hectares.",
        "shortDescription": "Converta fanegadas colombianas para hectares.",
        "keywords": [
          "fanegada para hectare",
          "conversor fanegada",
          "fanegada a hectarea",
          "unidade de terra colombiana",
          "converter fanegada",
          "quantos hectares em uma fanegada",
          "fanegada para acres",
          "fanegada metros quadrados"
        ]
      },
      "calculator": {
        "yourInformation": "Suas Informações"
      },
      "inputs": {
        "fanValue": {
          "label": "Fanegadas",
          "helpText": "Digite o número de fanegadas para converter"
        }
      },
      "results": {
        "hectares": {
          "label": "Hectares"
        },
        "acres": {
          "label": "Acres"
        },
        "m2": {
          "label": "Metros Quadrados"
        },
        "km2": {
          "label": "Quilômetros Quadrados"
        },
        "plazas": {
          "label": "Plazas"
        }
      },
      "presets": {
        "smallPlot": {
          "label": "1 Fanegada",
          "description": "Lote pequeno"
        },
        "coffeeFarm": {
          "label": "5 Fanegadas",
          "description": "Fazenda de café"
        },
        "cattleRanch": {
          "label": "20 Fanegadas",
          "description": "Fazenda de gado"
        },
        "largeFinca": {
          "label": "100 Fanegadas",
          "description": "Finca grande"
        }
      },
      "values": {
        "ha": "ha",
        "ac": "acres",
        "m2": "m²",
        "km2": "km²",
        "plz": "plazas",
        "fan": "fan"
      },
      "formats": {
        "summary": "{fanValue} fanegadas = {hectares} hectares"
      },
      "infoCards": {
        "quickConversions": {
          "title": "Referência Rápida",
          "items": [
            {
              "label": "1 fanegada",
              "valueKey": "ref1"
            },
            {
              "label": "2 fanegadas",
              "valueKey": "ref2"
            },
            {
              "label": "5 fanegadas",
              "valueKey": "ref5"
            },
            {
              "label": "10 fanegadas",
              "valueKey": "ref10"
            },
            {
              "label": "50 fanegadas",
              "valueKey": "ref50"
            },
            {
              "label": "100 fanegadas",
              "valueKey": "ref100"
            }
          ]
        },
        "tips": {
          "title": "Dicas de Conversão",
          "items": [
            "1 fanegada = 0,64 hectares — multiplique por 0,64 para uma conversão rápida",
            "1 fanegada = 6.400 m² — aproximadamente 80m × 80m",
            "Para acres: 1 fanegada ≈ 1,58 acres — pouco mais de 1½ acres",
            "Comum no mercado imobiliário colombiano: 'finca de 10 fanegadas' = 6,4 hectares"
          ]
        }
      },
      "education": {
        "howToConvert": {
          "title": "Como Converter Fanegadas para Hectares",
          "content": "Para converter fanegadas para hectares, multiplique o número de fanegadas por 0,64. Uma fanegada equivale a 6.400 metros quadrados na Colômbia, e como um hectare são 10.000 metros quadrados, a proporção é 6.400 ÷ 10.000 = 0,64. A fanegada originou-se da quantidade de terra que poderia ser semeada com uma fanega (unidade de volume de grãos) de sementes. Na Colômbia, esta unidade tornou-se padronizada em 6.400 m², embora historicamente o tamanho variasse por região. Hoje permanece amplamente usada em transações de propriedades rurais em toda a Colômbia, especialmente nos departamentos de Cundinamarca, Boyacá, Santander e na Região Cafeeira."
        },
        "commonUses": {
          "title": "Onde a Fanegada é Usada Hoje",
          "content": "A fanegada está profundamente enraizada no setor imobiliário rural e agricultura colombianos. Fazendas de café no Eje Cafetero (Quindío, Risaralda, Caldas) são tradicionalmente medidas em fanegadas — uma típica fazenda pequena de café tem 3 a 8 fanegadas. Fazendas de flores na Sabana de Bogotá cotam produção por fanegada. Fazendas de gado nos llanos e Santander medem capacidade de pastagem em fanegadas. Listagens de propriedades em plataformas imobiliárias colombianas como Fincaraíz e Metrocuadrado ainda mostram propriedades rurais em fanegadas junto com hectares. Documentos de reforma agrária, certificados do INCODER e títulos de propriedades rurais (escrituras) frequentemente referenciam fanegadas. Até bancos colombianos exigem conversão fanegada-para-hectare ao processar empréstimos de propriedades rurais."
        },
        "examples": {
          "title": "Exemplos de Conversão",
          "description": "Conversões de fanegada passo a passo",
          "examples": [
            {
              "title": "Converter 8 fanegadas para hectares (fazenda de café)",
              "steps": [
                "Fórmula: hectares = fanegadas × 0,64",
                "8 × 0,64 = 5,12",
                "8 fanegadas = 5,12 hectares"
              ],
              "result": "8 fan = 5,12 ha"
            },
            {
              "title": "Converter 25 fanegadas para acres (fazenda de gado)",
              "steps": [
                "Primeiro para m²: 25 × 6.400 = 160.000 m²",
                "Depois para acres: 160.000 ÷ 4.046,86 = 39,54",
                "25 fanegadas = 39,54 acres"
              ],
              "result": "25 fan = 39,54 acres"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Quantos hectares tem 1 fanegada?",
          "answer": "1 fanegada equivale exatamente a 0,64 hectares (6.400 metros quadrados)."
        },
        {
          "question": "Quantos acres tem 1 fanegada?",
          "answer": "1 fanegada equivale aproximadamente a 1,58 acres."
        },
        {
          "question": "A fanegada é usada apenas na Colômbia?",
          "answer": "A fanegada de 6.400 m² é especificamente colombiana. Espanha e outros países latino-americanos tinham unidades similares chamadas 'fanega' mas com tamanhos diferentes."
        },
        {
          "question": "Por que a fanegada tem 6.400 m²?",
          "answer": "Vem de 80 × 80 varas castellanas. A vara colombiana é 0,8 metros, então 80 varas = 64 metros, e 64 × 64 = 4.096... porém a fanegada colombiana padronizada foi fixada em 6.400 m² por convenção."
        },
        {
          "question": "A fanegada é legalmente reconhecida na Colômbia?",
          "answer": "Sim, a fanegada aparece em títulos de propriedade colombianos (escrituras), registros cadastrais do IGAC e documentação de terras rurais. É amplamente compreendida por notários e registradores de terras."
        },
        {
          "question": "Quantas fanegadas tem 1 hectare?",
          "answer": "1 hectare = 1,5625 fanegadas (10.000 ÷ 6.400 = 1,5625)."
        }
      ],
      "detailedTable": {
        "conversionTable": {
          "button": "Ver Tabela de Conversão Completa",
          "title": "Tabela de Conversão de Fanegadas para Hectares",
          "columns": {
            "fan": "Fanegadas",
            "ha": "Hectares",
            "acres": "Acres",
            "m2": "Metros Quadrados"
          }
        }
      },
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
      "name": "Convertisseur Fanegadas vers Hectares",
      "slug": "calculateur-convertisseur-fanegadas-vers-hectares",
      "subtitle": "Convertir fanegadas en hectares, acres et mètres carrés — l'unité de terre traditionnelle de Colombie.",
      "breadcrumb": "Fanegadas vers Hectares",
      "seo": {
        "title": "Convertisseur Fanegadas vers Hectares - Unité de Terre Colombienne",
        "description": "Convertir fanegadas en hectares instantanément. La fanegada est l'unité de mesure de terre traditionnelle de Colombie. 1 fanegada = 6 400 m² = 0,64 hectares.",
        "shortDescription": "Convertir fanegadas colombiennes en hectares.",
        "keywords": [
          "fanegada en hectare",
          "convertisseur fanegada",
          "fanegada a hectarea",
          "unité de terre colombienne",
          "convertir fanegada",
          "combien d'hectares dans une fanegada",
          "fanegada en acres",
          "fanegada mètres carrés"
        ]
      },
      "calculator": {
        "yourInformation": "Vos Informations"
      },
      "inputs": {
        "fanValue": {
          "label": "Fanegadas",
          "helpText": "Entrez le nombre de fanegadas à convertir"
        }
      },
      "results": {
        "hectares": {
          "label": "Hectares"
        },
        "acres": {
          "label": "Acres"
        },
        "m2": {
          "label": "Mètres Carrés"
        },
        "km2": {
          "label": "Kilomètres Carrés"
        },
        "plazas": {
          "label": "Plazas"
        }
      },
      "presets": {
        "smallPlot": {
          "label": "1 Fanegada",
          "description": "Petit terrain"
        },
        "coffeeFarm": {
          "label": "5 Fanegadas",
          "description": "Ferme de café"
        },
        "cattleRanch": {
          "label": "20 Fanegadas",
          "description": "Ranch de bétail"
        },
        "largeFinca": {
          "label": "100 Fanegadas",
          "description": "Grande finca"
        }
      },
      "values": {
        "ha": "ha",
        "ac": "acres",
        "m2": "m²",
        "km2": "km²",
        "plz": "plazas",
        "fan": "fan"
      },
      "formats": {
        "summary": "{fanValue} fanegadas = {hectares} hectares"
      },
      "infoCards": {
        "quickConversions": {
          "title": "Référence Rapide",
          "items": [
            {
              "label": "1 fanegada",
              "valueKey": "ref1"
            },
            {
              "label": "2 fanegadas",
              "valueKey": "ref2"
            },
            {
              "label": "5 fanegadas",
              "valueKey": "ref5"
            },
            {
              "label": "10 fanegadas",
              "valueKey": "ref10"
            },
            {
              "label": "50 fanegadas",
              "valueKey": "ref50"
            },
            {
              "label": "100 fanegadas",
              "valueKey": "ref100"
            }
          ]
        },
        "tips": {
          "title": "Conseils de Conversion",
          "items": [
            "1 fanegada = 0,64 hectares — multiplier par 0,64 pour une conversion rapide",
            "1 fanegada = 6 400 m² — environ 80m × 80m",
            "Pour les acres : 1 fanegada ≈ 1,58 acres — un peu plus de 1½ acre",
            "Courant dans l'immobilier colombien : 'finca de 10 fanegadas' = 6,4 hectares"
          ]
        }
      },
      "education": {
        "howToConvert": {
          "title": "Comment Convertir Fanegadas en Hectares",
          "content": "Pour convertir fanegadas en hectares, multipliez le nombre de fanegadas par 0,64. Une fanegada équivaut à 6 400 mètres carrés en Colombie, et puisqu'un hectare fait 10 000 mètres carrés, le ratio est 6 400 ÷ 10 000 = 0,64. La fanegada provient de la surface de terre qui pouvait être ensemencée avec une fanega (unité de volume de grain) de semences. En Colombie, cette unité s'est standardisée à 6 400 m², bien qu'historiquement la taille variait selon les régions. Aujourd'hui elle reste largement utilisée dans les transactions de propriétés rurales à travers la Colombie, particulièrement dans les départements de Cundinamarca, Boyacá, Santander, et la Région du Café."
        },
        "commonUses": {
          "title": "Où la Fanegada est Utilisée Aujourd'hui",
          "content": "La fanegada est profondément ancrée dans l'immobilier rural et l'agriculture colombiens. Les fermes de café dans l'Eje Cafetero (Quindío, Risaralda, Caldas) sont traditionnellement mesurées en fanegadas — une petite ferme de café typique fait 3 à 8 fanegadas. Les fermes de fleurs dans la Sabana de Bogotá cotent la production par fanegada. Les ranchs de bétail dans les llanos et Santander mesurent la capacité de pâturage en fanegadas. Les annonces immobilières sur les plateformes colombiennes comme Fincaraíz et Metrocuadrado montrent encore les propriétés rurales en fanegadas aux côtés des hectares. Les documents de réforme agraire, certificats INCODER, et titres de propriété ruraux (escrituras) font fréquemment référence aux fanegadas. Même les banques colombiennes exigent la conversion fanegada-hectare lors du traitement des prêts de propriétés rurales."
        },
        "examples": {
          "title": "Exemples de Conversion",
          "description": "Conversions de fanegadas étape par étape",
          "examples": [
            {
              "title": "Convertir 8 fanegadas en hectares (ferme de café)",
              "steps": [
                "Formule : hectares = fanegadas × 0,64",
                "8 × 0,64 = 5,12",
                "8 fanegadas = 5,12 hectares"
              ],
              "result": "8 fan = 5,12 ha"
            },
            {
              "title": "Convertir 25 fanegadas en acres (ranch de bétail)",
              "steps": [
                "D'abord en m² : 25 × 6 400 = 160 000 m²",
                "Puis en acres : 160 000 ÷ 4 046,86 = 39,54",
                "25 fanegadas = 39,54 acres"
              ],
              "result": "25 fan = 39,54 acres"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Combien d'hectares fait 1 fanegada ?",
          "answer": "1 fanegada équivaut exactement à 0,64 hectares (6 400 mètres carrés)."
        },
        {
          "question": "Combien d'acres fait 1 fanegada ?",
          "answer": "1 fanegada équivaut approximativement à 1,58 acres."
        },
        {
          "question": "La fanegada est-elle utilisée seulement en Colombie ?",
          "answer": "La fanegada de 6 400 m² est spécifiquement colombienne. L'Espagne et d'autres pays d'Amérique latine avaient des unités similaires appelées 'fanega' mais avec des tailles différentes."
        },
        {
          "question": "Pourquoi la fanegada fait-elle 6 400 m² ?",
          "answer": "Elle vient de 80 × 80 varas castellanas. La vara colombienne fait 0,8 mètres, donc 80 varas = 64 mètres, et 64 × 64 = 4 096... cependant la fanegada colombienne standardisée a été fixée à 6 400 m² par convention."
        },
        {
          "question": "La fanegada est-elle légalement reconnue en Colombie ?",
          "answer": "Oui, la fanegada apparaît dans les titres de propriété colombiens (escrituras), les registres cadastraux IGAC, et la documentation foncière rurale. Elle est largement comprise par les notaires et registraires fonciers."
        },
        {
          "question": "Combien de fanegadas dans 1 hectare ?",
          "answer": "1 hectare = 1,5625 fanegadas (10 000 ÷ 6 400 = 1,5625)."
        }
      ],
      "detailedTable": {
        "conversionTable": {
          "button": "Voir le Tableau de Conversion Complet",
          "title": "Tableau de Conversion Fanegadas vers Hectares",
          "columns": {
            "fan": "Fanegadas",
            "ha": "Hectares",
            "acres": "Acres",
            "m2": "Mètres Carrés"
          }
        }
      },
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
      "name": "Fanegadas zu Hektar Umrechner",
      "slug": "fanegadas-zu-hektar-umrechner",
      "subtitle": "Rechnen Sie Fanegadas in Hektar, Acres und Quadratmeter um — Kolumbiens traditionelle Landflächeneinheit.",
      "breadcrumb": "Fanegadas zu Hektar",
      "seo": {
        "title": "Fanegadas zu Hektar Umrechner - Kolumbianische Landflächeneinheit",
        "description": "Rechnen Sie Fanegadas sofort in Hektar um. Die Fanegada ist Kolumbiens traditionelle Landvermessungseinheit. 1 Fanegada = 6.400 m² = 0,64 Hektar.",
        "shortDescription": "Rechnen Sie kolumbianische Fanegadas in Hektar um.",
        "keywords": [
          "fanegada zu hektar",
          "fanegada umrechner",
          "fanegada a hectarea",
          "kolumbianische landeinheit",
          "fanegada umrechnen",
          "wie viele hektar in einer fanegada",
          "fanegada zu acres",
          "fanegada quadratmeter"
        ]
      },
      "calculator": {
        "yourInformation": "Ihre Informationen"
      },
      "inputs": {
        "fanValue": {
          "label": "Fanegadas",
          "helpText": "Geben Sie die Anzahl der Fanegadas ein, die umgerechnet werden sollen"
        }
      },
      "results": {
        "hectares": {
          "label": "Hektar"
        },
        "acres": {
          "label": "Acres"
        },
        "m2": {
          "label": "Quadratmeter"
        },
        "km2": {
          "label": "Quadratkilometer"
        },
        "plazas": {
          "label": "Plazas"
        }
      },
      "presets": {
        "smallPlot": {
          "label": "1 Fanegada",
          "description": "Kleines Grundstück"
        },
        "coffeeFarm": {
          "label": "5 Fanegadas",
          "description": "Kaffeefarm"
        },
        "cattleRanch": {
          "label": "20 Fanegadas",
          "description": "Viehranch"
        },
        "largeFinca": {
          "label": "100 Fanegadas",
          "description": "Große Finca"
        }
      },
      "values": {
        "ha": "ha",
        "ac": "Acres",
        "m2": "m²",
        "km2": "km²",
        "plz": "Plazas",
        "fan": "fan"
      },
      "formats": {
        "summary": "{fanValue} Fanegadas = {hectares} Hektar"
      },
      "infoCards": {
        "quickConversions": {
          "title": "Schnellreferenz",
          "items": [
            {
              "label": "1 Fanegada",
              "valueKey": "ref1"
            },
            {
              "label": "2 Fanegadas",
              "valueKey": "ref2"
            },
            {
              "label": "5 Fanegadas",
              "valueKey": "ref5"
            },
            {
              "label": "10 Fanegadas",
              "valueKey": "ref10"
            },
            {
              "label": "50 Fanegadas",
              "valueKey": "ref50"
            },
            {
              "label": "100 Fanegadas",
              "valueKey": "ref100"
            }
          ]
        },
        "tips": {
          "title": "Umrechnungstipps",
          "items": [
            "1 Fanegada = 0,64 Hektar — multiplizieren Sie mit 0,64 für eine schnelle Umrechnung",
            "1 Fanegada = 6.400 m² — ungefähr 80m × 80m",
            "Für Acres: 1 Fanegada ≈ 1,58 Acres — etwas mehr als 1½ Acres",
            "Üblich in kolumbianischen Immobilien: 'Finca de 10 Fanegadas' = 6,4 Hektar"
          ]
        }
      },
      "education": {
        "howToConvert": {
          "title": "Wie man Fanegadas in Hektar umrechnet",
          "content": "Um Fanegadas in Hektar umzurechnen, multiplizieren Sie die Anzahl der Fanegadas mit 0,64. Eine Fanegada entspricht 6.400 Quadratmetern in Kolumbien, und da ein Hektar 10.000 Quadratmeter sind, beträgt das Verhältnis 6.400 ÷ 10.000 = 0,64. Die Fanegada entstand aus der Landmenge, die mit einer Fanega (einer Getreide-Volumeneinheit) Saatgut besät werden konnte. In Kolumbien wurde diese Einheit bei 6.400 m² standardisiert, obwohl die Größe historisch je nach Region variierte. Heute wird sie weiterhin bei ländlichen Immobilientransaktionen in ganz Kolumbien verwendet, besonders in den Departamentos Cundinamarca, Boyacá, Santander und der Kaffeeregion."
        },
        "commonUses": {
          "title": "Wo die Fanegada heute verwendet wird",
          "content": "Die Fanegada ist tief in kolumbianischen ländlichen Immobilien und der Landwirtschaft verankert. Kaffeefarmen im Eje Cafetero (Quindío, Risaralda, Caldas) werden traditionell in Fanegadas gemessen — eine typische kleine Kaffeefarm umfasst 3 bis 8 Fanegadas. Blumenfarmen in der Sabana de Bogotá geben die Produktion pro Fanegada an. Viehranches in den Llanos und Santander messen die Weidekapazität in Fanegadas. Immobilienanzeigen auf kolumbianischen Immobilienplattformen wie Fincaraíz und Metrocuadrado zeigen ländliche Immobilien immer noch in Fanegadas neben Hektarn. Landreformdokumente, INCODER-Zertifikate und ländliche Eigentumstitel (Escrituras) verweisen häufig auf Fanegadas. Sogar kolumbianische Banken benötigen Fanegada-zu-Hektar-Umrechnungen bei der Bearbeitung von ländlichen Immobilienkrediten."
        },
        "examples": {
          "title": "Umrechnungsbeispiele",
          "description": "Schritt-für-Schritt Fanegada-Umrechnungen",
          "examples": [
            {
              "title": "8 Fanegadas in Hektar umrechnen (Kaffeefarm)",
              "steps": [
                "Formel: Hektar = Fanegadas × 0,64",
                "8 × 0,64 = 5,12",
                "8 Fanegadas = 5,12 Hektar"
              ],
              "result": "8 fan = 5,12 ha"
            },
            {
              "title": "25 Fanegadas in Acres umrechnen (Viehranch)",
              "steps": [
                "Erst zu m²: 25 × 6.400 = 160.000 m²",
                "Dann zu Acres: 160.000 ÷ 4.046,86 = 39,54",
                "25 Fanegadas = 39,54 Acres"
              ],
              "result": "25 fan = 39,54 Acres"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Wie viele Hektar ist 1 Fanegada?",
          "answer": "1 Fanegada entspricht genau 0,64 Hektar (6.400 Quadratmeter)."
        },
        {
          "question": "Wie viele Acres ist 1 Fanegada?",
          "answer": "1 Fanegada entspricht ungefähr 1,58 Acres."
        },
        {
          "question": "Wird die Fanegada nur in Kolumbien verwendet?",
          "answer": "Die Fanegada von 6.400 m² ist spezifisch kolumbianisch. Spanien und andere lateinamerikanische Länder hatten ähnliche Einheiten namens 'Fanega', aber mit unterschiedlichen Größen."
        },
        {
          "question": "Warum ist die Fanegada 6.400 m²?",
          "answer": "Sie stammt von 80 × 80 Varas Castellanas. Die kolumbianische Vara ist 0,8 Meter, also 80 Varas = 64 Meter, und 64 × 64 = 4.096... jedoch wurde die standardisierte kolumbianische Fanegada durch Konvention bei 6.400 m² festgelegt."
        },
        {
          "question": "Ist die Fanegada in Kolumbien rechtlich anerkannt?",
          "answer": "Ja, die Fanegada erscheint in kolumbianischen Eigentumstiteln (Escrituras), IGAC-Katasteraufzeichnungen und ländlicher Landdokumentation. Sie wird von Notaren und Grundbuchämtern weithin verstanden."
        },
        {
          "question": "Wie viele Fanegadas sind in 1 Hektar?",
          "answer": "1 Hektar = 1,5625 Fanegadas (10.000 ÷ 6.400 = 1,5625)."
        }
      ],
      "detailedTable": {
        "conversionTable": {
          "button": "Vollständige Umrechnungstabelle anzeigen",
          "title": "Fanegadas zu Hektar Umrechnungstabelle",
          "columns": {
            "fan": "Fanegadas",
            "ha": "Hektar",
            "acres": "Acres",
            "m2": "Quadratmeter"
          }
        }
      },
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
  inputs: [{ id: "fanValue", type: "number", defaultValue: null, placeholder: "5", min: 0.001, max: 100000000, step: 0.01, suffix: "fan" }],
  inputGroups: [],
  results: [
    { id: "hectares", type: "primary", format: "number" },
    { id: "acres", type: "secondary", format: "number" },
    { id: "m2", type: "secondary", format: "number" },
    { id: "km2", type: "secondary", format: "number" },
    { id: "plazas", type: "secondary", format: "number" },
  ],
  infoCards: [ { id: "quickConversions", type: "list", icon: "📋", itemCount: 6 }, { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 } ],
  detailedTable: {
    id: "conversionTable", buttonLabel: "View Full Conversion Table", buttonIcon: "📊", modalTitle: "Fanegadas to Hectares Conversion Table",
    columns: [ { id: "fan", label: "Fanegadas", align: "center" }, { id: "ha", label: "Hectares", align: "right", highlight: true }, { id: "acres", label: "Acres", align: "right" }, { id: "m2", label: "Square Meters", align: "right" } ],
  },
  referenceData: [],
  educationSections: [ { id: "howToConvert", type: "prose", icon: "📖" }, { id: "commonUses", type: "prose", icon: "🌍" }, { id: "examples", type: "code-example", icon: "🧮", columns: 2, exampleCount: 2 } ],
  faqs: [{ id: "0" }, { id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }],
  references: [
    { authors: "Instituto Geográfico Agustín Codazzi (IGAC)", year: "2023", title: "Sistema de Información Geográfica para la Planeación y el Ordenamiento Territorial", source: "IGAC Colombia", url: "https://www.igac.gov.co/" },
    { authors: "United Nations Statistics Division", year: "1966", title: "World Weights and Measures: Handbook for Statisticians", source: "United Nations", url: "https://unstats.un.org/unsd/publication/SeriesM/SeriesM_21.pdf" },
  ],
  hero: { badge: "Free Tool", badgeVariant: "blue" as const },
  sidebar: { showNewsletter: true, showRelated: true },
  features: { export: true, save: true, share: true, rating: true },
  relatedCalculators: ["manzanas-to-hectareas", "tareas-to-metros-cuadrados", "cuadras-to-hectareas", "varas-to-metros"],
  ads: { sidebar: true, footer: true },
};

export function calculateFanegadasToHectareas(data: { values: Record<string, unknown>; fieldUnits?: Record<string, string>; t?: Record<string, unknown> }): CalculatorResults {
  const { values, t } = data;
  const v = (t?.values as Record<string, string>) || {};
  const f = (t?.formats as Record<string, string>) || {};
  const fanValue = values.fanValue as number | null;
  if (fanValue === null || fanValue === undefined || fanValue <= 0) return { values: {}, formatted: {}, summary: "", isValid: false };

  const m2 = fanValue * FAN_TO_M2;
  const hectares = m2 / HA_TO_M2;
  const acres = m2 / ACRE_TO_M2;
  const km2 = m2 / 1000000;
  const plazas = fanValue * 0.8; // 1 plaza ≈ 8,000 m², 1 fanegada = 0.8 plazas

  const haUnit = v["ha"] || "ha"; const acUnit = v["ac"] || "acres"; const m2Unit = v["m2"] || "m²"; const km2Unit = v["km2"] || "km²"; const plzUnit = v["plz"] || "plazas";
  const fmt = (n: number, d: number = 4) => n >= 1000 ? n.toLocaleString("en-US", { maximumFractionDigits: 2 }) : n.toFixed(d).replace(/0+$/, "").replace(/\.$/, "");

  const refFan = [1, 2, 5, 10, 50, 100];
  const refs: Record<string, string> = {};
  refFan.forEach((fan) => { refs[`ref${fan}`] = `${fmt(fan * FAN_TO_HA, 2)} ${haUnit}`; });

  const commonValues = [0.5, 1, 2, 3, 5, 8, 10, 15, 20, 25, 30, 50, 75, 100, 200, 500, fanValue];
  const uniqueVals = [...new Set(commonValues.map((v) => Math.round(v * 1000) / 1000))].sort((a, b) => a - b);
  const tableData = uniqueVals.map((fan) => ({
    fan: `${fan}`, ha: fmt(fan * FAN_TO_HA, 2), acres: fmt(fan * FAN_TO_M2 / ACRE_TO_M2, 2), m2: fmt(fan * FAN_TO_M2, 0),
  }));

  const summary = f.summary?.replace("{fanValue}", fanValue.toString()).replace("{hectares}", fmt(hectares, 2)) || `${fanValue} fanegadas = ${fmt(hectares, 2)} hectares`;
  return {
    values: { hectares, acres, m2, km2, plazas, ...refs },
    formatted: { hectares: `${fmt(hectares, 2)} ${haUnit}`, acres: `${fmt(acres, 2)} ${acUnit}`, m2: `${fmt(m2, 0)} ${m2Unit}`, km2: `${fmt(km2)} ${km2Unit}`, plazas: `${fmt(plazas, 2)} ${plzUnit}`, ...refs },
    summary, isValid: true, metadata: { tableData },
  };
}

export default fanegadasToHectareasConfig;
