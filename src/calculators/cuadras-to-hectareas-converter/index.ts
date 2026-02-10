import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";

// 1 cuadra cuadrada = 17,500 m² (Argentina/Uruguay standard)
// Based on 1 cuadra lineal = ~130 meters (150 varas)
// 1 hectárea = 10,000 m²
// 1 cuadra = 1.75 hectáreas
const CUADRA_TO_M2 = 17500;
const HA_TO_M2 = 10000;
const CUADRA_TO_HA = CUADRA_TO_M2 / HA_TO_M2; // 1.75
const ACRE_TO_M2 = 4046.8564224;

export const cuadrasToHectareasConfig: CalculatorConfigV4 = {
  id: "cuadras-to-hectareas",
  version: "4.0",
  category: "conversion",
  icon: "🐄",
  presets: [
    { id: "smallField", icon: "🌱", values: { cuadraValue: 1 } },
    { id: "mediumCampo", icon: "🌾", values: { cuadraValue: 10 } },
    { id: "estancia", icon: "🐄", values: { cuadraValue: 100 } },
    { id: "largeEstancia", icon: "🏞️", values: { cuadraValue: 500 } },
  ],
  t: {
    en: {
      name: "Cuadras to Hectares Converter", slug: "cuadras-to-hectares-converter",
      subtitle: "Convert cuadras to hectares, acres, and square meters — the traditional land unit of Argentina, Uruguay, and Paraguay.",
      breadcrumb: "Cuadras to Hectares",
      seo: {
        title: "Cuadras to Hectares Converter - Argentine Land Unit",
        description: "Convert cuadras to hectares instantly. The cuadra cuadrada is the traditional land unit in Argentina, Uruguay, and Paraguay. 1 cuadra = 1.75 hectares.",
        shortDescription: "Convert cuadras to hectares for South American land.",
        keywords: ["cuadra to hectare", "cuadra converter", "cuadra a hectarea", "argentine land unit", "convert cuadra", "cuadra cuadrada", "cuantas hectareas tiene una cuadra", "cuadra uruguay"],
      },
      calculator: { yourInformation: "Enter Value" },
      ui: { yourInformation: "Enter Value", calculate: "Convert", reset: "Reset", results: "Results" },
      inputs: { cuadraValue: { label: "Cuadras", helpText: "Enter the number of cuadras cuadradas to convert" } },
      results: { hectares: { label: "Hectares" }, acres: { label: "Acres" }, m2: { label: "Square Meters" }, km2: { label: "Square Kilometers" }, ft2: { label: "Square Feet" } },
      presets: {
        smallField: { label: "1 Cuadra", description: "1.75 ha" },
        mediumCampo: { label: "10 Cuadras", description: "Medium campo" },
        estancia: { label: "100 Cuadras", description: "Estancia" },
        largeEstancia: { label: "500 Cuadras", description: "Large estancia" },
      },
      values: { ha: "ha", ac: "acres", m2: "m²", km2: "km²", ft2: "ft²" },
      formats: { summary: "{cuadraValue} cuadras = {hectares} hectares" },
      infoCards: {
        quickConversions: {
          title: "Quick Reference",
          items: [
            { label: "1 cuadra", valueKey: "ref1" }, { label: "5 cuadras", valueKey: "ref5" },
            { label: "10 cuadras", valueKey: "ref10" }, { label: "50 cuadras", valueKey: "ref50" },
            { label: "100 cuadras", valueKey: "ref100" }, { label: "1,000 cuadras", valueKey: "ref1000" },
          ],
        },
        tips: {
          title: "Conversion Tips",
          items: [
            "1 cuadra = 1.75 hectares — multiply cuadras by 1.75 for a quick conversion",
            "1 cuadra = 17,500 m² — about 132m × 132m",
            "For acres: 1 cuadra ≈ 4.33 acres — over 4 acres",
            "Argentine estancias are often measured in cuadras: a 100-cuadra campo = 175 hectares",
          ],
        },
      },
      education: {
        howToConvert: { title: "How to Convert Cuadras to Hectares", content: "To convert cuadras to hectares, multiply the number of cuadras by 1.75. One cuadra cuadrada equals 17,500 square meters, and since one hectare is 10,000 square meters, the ratio is 17,500 ÷ 10,000 = 1.75. The cuadra originated as a linear measurement of about 130 meters (150 varas), and the cuadra cuadrada is a square with sides of that length. This unit is deeply rooted in the agricultural tradition of the Río de la Plata region, where vast estancias have been measured in cuadras for centuries. Understanding this conversion is essential for anyone dealing with rural real estate in Argentina, Uruguay, or Paraguay." },
        commonUses: { title: "Where the Cuadra Is Used Today", content: "The cuadra remains in active use in Argentina, Uruguay, and Paraguay for rural land measurement. Argentine estancias in the Pampa, Patagonia, and the provinces of Buenos Aires, Santa Fe, Córdoba, and Entre Ríos are traditionally described in cuadras. Real estate listings for campo (rural property) in Argentina frequently quote sizes in cuadras alongside hectares. Uruguayan rural properties, especially cattle ranches in the departments of Tacuarembó, Cerro Largo, and Salto, use cuadras. In Paraguay, rural land in the Chaco and eastern departments is also measured in cuadras. Notaries, surveyors, and agricultural cooperatives in these countries routinely convert between cuadras and hectares. The unit persists in conversation even among city dwellers discussing family estancias." },
        examples: {
          title: "Conversion Examples", description: "Step-by-step cuadra conversions",
          examples: [
            { title: "Convert 50 cuadras to hectares (medium estancia)", steps: ["Formula: hectares = cuadras × 1.75", "50 × 1.75 = 87.5", "50 cuadras = 87.5 hectares"], result: "50 cuadras = 87.5 ha" },
            { title: "Convert 200 cuadras to acres (large campo)", steps: ["First to m²: 200 × 17,500 = 3,500,000 m²", "Then to acres: 3,500,000 ÷ 4,046.86 = 864.9", "200 cuadras ≈ 865 acres"], result: "200 cuadras = 865 acres" },
          ],
        },
      },
      faqs: [
        { question: "How many hectares is 1 cuadra?", answer: "1 cuadra cuadrada = 1.75 hectares (17,500 m²)." },
        { question: "How many acres is 1 cuadra?", answer: "1 cuadra ≈ 4.33 acres." },
        { question: "Which countries use the cuadra?", answer: "The cuadra cuadrada is used in Argentina, Uruguay, and Paraguay for rural land measurement." },
        { question: "What is the difference between a cuadra lineal and a cuadra cuadrada?", answer: "A cuadra lineal is a unit of distance (~130 meters, also used for city blocks). A cuadra cuadrada is a unit of area (17,500 m²) used for land measurement. This converter handles cuadras cuadradas (area)." },
        { question: "How many cuadras in 1 hectare?", answer: "1 hectare = 0.5714 cuadras (10,000 ÷ 17,500 ≈ 0.57). So roughly 4 hectares = 2.3 cuadras." },
        { question: "Is the cuadra still legally recognized?", answer: "While Argentina, Uruguay, and Paraguay officially use the metric system, the cuadra appears in historical property titles, estancia records, and is widely understood by notaries and surveyors. Many rural property transactions still reference cuadras." },
      ],
      rating: { title: "Rate this Converter", share: "Share", copied: "Copied!", copyLink: "Copy Link", clickToRate: "Click to rate", youRated: "You rated", stars: "stars", averageFrom: "average from", ratings: "ratings" },
      common: { home: "Home", calculators: "Calculators" },
      buttons: { calculate: "Convert", reset: "Reset", pdf: "PDF", csv: "CSV", excel: "Excel", save: "Save", saved: "Saved", saving: "Saving..." },
      share: { calculatedWith: "Converted with Kalcufy.com" },
      accessibility: { mobileResults: "Results", closeModal: "Close", openMenu: "Menu" },
      sources: { title: "Sources & References" },
      detailedTable: { conversionTable: { button: "View Full Conversion Table", title: "Cuadras to Hectares Conversion Table", columns: { cuadras: "Cuadras", ha: "Hectares", acres: "Acres", m2: "Square Meters" } } },
    },
    es: {
      "name": "Convertidor de Cuadras a Hectáreas",
      "slug": "calculadora-convertidor-cuadras-hectareas",
      "subtitle": "Convierte cuadras a hectáreas, acres y metros cuadrados — la unidad tradicional de tierra de Argentina, Uruguay y Paraguay.",
      "breadcrumb": "Cuadras a Hectáreas",
      "seo": {
        "title": "Convertidor de Cuadras a Hectáreas - Unidad de Tierra Argentina",
        "description": "Convierte cuadras a hectáreas al instante. La cuadra cuadrada es la unidad tradicional de tierra en Argentina, Uruguay y Paraguay. 1 cuadra = 1.75 hectáreas.",
        "shortDescription": "Convierte cuadras a hectáreas para tierras sudamericanas.",
        "keywords": [
          "cuadra a hectárea",
          "convertidor de cuadra",
          "cuadra a hectárea",
          "unidad de tierra argentina",
          "convertir cuadra",
          "cuadra cuadrada",
          "cuántas hectáreas tiene una cuadra",
          "cuadra uruguay"
        ]
      },
      "calculator": {
        "yourInformation": "Tu Información"
      },
      "inputs": {
        "cuadraValue": {
          "label": "Cuadras",
          "helpText": "Ingresa el número de cuadras cuadradas a convertir"
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
        "ft2": {
          "label": "Pies Cuadrados"
        }
      },
      "presets": {
        "smallField": {
          "label": "1 Cuadra",
          "description": "1.75 ha"
        },
        "mediumCampo": {
          "label": "10 Cuadras",
          "description": "Campo mediano"
        },
        "estancia": {
          "label": "100 Cuadras",
          "description": "Estancia"
        },
        "largeEstancia": {
          "label": "500 Cuadras",
          "description": "Estancia grande"
        }
      },
      "values": {
        "ha": "ha",
        "ac": "acres",
        "m2": "m²",
        "km2": "km²",
        "ft2": "ft²"
      },
      "formats": {
        "summary": "{cuadraValue} cuadras = {hectares} hectáreas"
      },
      "infoCards": {
        "quickConversions": {
          "title": "Referencia Rápida",
          "items": [
            {
              "label": "1 cuadra",
              "valueKey": "ref1"
            },
            {
              "label": "5 cuadras",
              "valueKey": "ref5"
            },
            {
              "label": "10 cuadras",
              "valueKey": "ref10"
            },
            {
              "label": "50 cuadras",
              "valueKey": "ref50"
            },
            {
              "label": "100 cuadras",
              "valueKey": "ref100"
            },
            {
              "label": "1,000 cuadras",
              "valueKey": "ref1000"
            }
          ]
        },
        "tips": {
          "title": "Consejos de Conversión",
          "items": [
            "1 cuadra = 1.75 hectáreas — multiplica cuadras por 1.75 para una conversión rápida",
            "1 cuadra = 17,500 m² — aproximadamente 132m × 132m",
            "Para acres: 1 cuadra ≈ 4.33 acres — más de 4 acres",
            "Las estancias argentinas se miden frecuentemente en cuadras: un campo de 100 cuadras = 175 hectáreas"
          ]
        }
      },
      "education": {
        "howToConvert": {
          "title": "Cómo Convertir Cuadras a Hectáreas",
          "content": "Para convertir cuadras a hectáreas, multiplica el número de cuadras por 1.75. Una cuadra cuadrada equivale a 17,500 metros cuadrados, y como una hectárea son 10,000 metros cuadrados, la relación es 17,500 ÷ 10,000 = 1.75. La cuadra se originó como una medida lineal de aproximadamente 130 metros (150 varas), y la cuadra cuadrada es un cuadrado con lados de esa longitud. Esta unidad está profundamente arraigada en la tradición agrícola de la región del Río de la Plata, donde vastas estancias han sido medidas en cuadras durante siglos. Entender esta conversión es esencial para cualquiera que trabaje con bienes raíces rurales en Argentina, Uruguay o Paraguay."
        },
        "commonUses": {
          "title": "Dónde se Usa la Cuadra Hoy en Día",
          "content": "La cuadra permanece en uso activo en Argentina, Uruguay y Paraguay para la medición de tierras rurales. Las estancias argentinas en la Pampa, Patagonia y las provincias de Buenos Aires, Santa Fe, Córdoba y Entre Ríos tradicionalmente se describen en cuadras. Los anuncios inmobiliarios de campo en Argentina frecuentemente cotizan tamaños en cuadras junto con hectáreas. Las propiedades rurales uruguayas, especialmente las estancias ganaderas en los departamentos de Tacuarembó, Cerro Largo y Salto, usan cuadras. En Paraguay, las tierras rurales en el Chaco y departamentos orientales también se miden en cuadras. Los escribanos, agrimensores y cooperativas agrícolas en estos países rutinariamente convierten entre cuadras y hectáreas. La unidad persiste en la conversación incluso entre citadinos que discuten estancias familiares."
        },
        "examples": {
          "title": "Ejemplos de Conversión",
          "description": "Conversiones de cuadras paso a paso",
          "examples": [
            {
              "title": "Convertir 50 cuadras a hectáreas (estancia mediana)",
              "steps": [
                "Fórmula: hectáreas = cuadras × 1.75",
                "50 × 1.75 = 87.5",
                "50 cuadras = 87.5 hectáreas"
              ],
              "result": "50 cuadras = 87.5 ha"
            },
            {
              "title": "Convertir 200 cuadras a acres (campo grande)",
              "steps": [
                "Primero a m²: 200 × 17,500 = 3,500,000 m²",
                "Luego a acres: 3,500,000 ÷ 4,046.86 = 864.9",
                "200 cuadras ≈ 865 acres"
              ],
              "result": "200 cuadras = 865 acres"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "¿Cuántas hectáreas tiene 1 cuadra?",
          "answer": "1 cuadra cuadrada = 1.75 hectáreas (17,500 m²)."
        },
        {
          "question": "¿Cuántos acres tiene 1 cuadra?",
          "answer": "1 cuadra ≈ 4.33 acres."
        },
        {
          "question": "¿Qué países usan la cuadra?",
          "answer": "La cuadra cuadrada se usa en Argentina, Uruguay y Paraguay para la medición de tierras rurales."
        },
        {
          "question": "¿Cuál es la diferencia entre una cuadra lineal y una cuadra cuadrada?",
          "answer": "Una cuadra lineal es una unidad de distancia (~130 metros, también usada para cuadras de ciudad). Una cuadra cuadrada es una unidad de área (17,500 m²) usada para medición de tierras. Este convertidor maneja cuadras cuadradas (área)."
        },
        {
          "question": "¿Cuántas cuadras hay en 1 hectárea?",
          "answer": "1 hectárea = 0.5714 cuadras (10,000 ÷ 17,500 ≈ 0.57). Así que aproximadamente 4 hectáreas = 2.3 cuadras."
        },
        {
          "question": "¿La cuadra sigue siendo legalmente reconocida?",
          "answer": "Aunque Argentina, Uruguay y Paraguay oficialmente usan el sistema métrico, la cuadra aparece en títulos históricos de propiedad, registros de estancias, y es ampliamente entendida por escribanos y agrimensores. Muchas transacciones de propiedades rurales aún referencian cuadras."
        }
      ],
      "detailedTable": {
        "conversionTable": {
          "button": "Ver Tabla de Conversión Completa",
          "title": "Tabla de Conversión de Cuadras a Hectáreas",
          "columns": {
            "cuadras": "Cuadras",
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
      "name": "Conversor de Cuadras para Hectares",
      "slug": "calculadora-conversor-cuadras-hectares",
      "subtitle": "Converta cuadras para hectares, acres e metros quadrados — a unidade tradicional de terra da Argentina, Uruguai e Paraguai.",
      "breadcrumb": "Cuadras para Hectares",
      "seo": {
        "title": "Conversor de Cuadras para Hectares - Unidade de Terra Argentina",
        "description": "Converta cuadras para hectares instantaneamente. A cuadra cuadrada é a unidade tradicional de terra na Argentina, Uruguai e Paraguai. 1 cuadra = 1,75 hectares.",
        "shortDescription": "Converta cuadras para hectares para terras sul-americanas.",
        "keywords": [
          "cuadra para hectare",
          "conversor cuadra",
          "cuadra a hectárea",
          "unidade de terra argentina",
          "converter cuadra",
          "cuadra cuadrada",
          "quantos hectares tem uma cuadra",
          "cuadra uruguai"
        ]
      },
      "calculator": {
        "yourInformation": "Suas Informações"
      },
      "inputs": {
        "cuadraValue": {
          "label": "Cuadras",
          "helpText": "Digite o número de cuadras cuadradas para converter"
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
        "ft2": {
          "label": "Pés Quadrados"
        }
      },
      "presets": {
        "smallField": {
          "label": "1 Cuadra",
          "description": "1,75 ha"
        },
        "mediumCampo": {
          "label": "10 Cuadras",
          "description": "Campo médio"
        },
        "estancia": {
          "label": "100 Cuadras",
          "description": "Estância"
        },
        "largeEstancia": {
          "label": "500 Cuadras",
          "description": "Estância grande"
        }
      },
      "values": {
        "ha": "ha",
        "ac": "acres",
        "m2": "m²",
        "km2": "km²",
        "ft2": "pés²"
      },
      "formats": {
        "summary": "{cuadraValue} cuadras = {hectares} hectares"
      },
      "infoCards": {
        "quickConversions": {
          "title": "Referência Rápida",
          "items": [
            {
              "label": "1 cuadra",
              "valueKey": "ref1"
            },
            {
              "label": "5 cuadras",
              "valueKey": "ref5"
            },
            {
              "label": "10 cuadras",
              "valueKey": "ref10"
            },
            {
              "label": "50 cuadras",
              "valueKey": "ref50"
            },
            {
              "label": "100 cuadras",
              "valueKey": "ref100"
            },
            {
              "label": "1.000 cuadras",
              "valueKey": "ref1000"
            }
          ]
        },
        "tips": {
          "title": "Dicas de Conversão",
          "items": [
            "1 cuadra = 1,75 hectares — multiplique cuadras por 1,75 para uma conversão rápida",
            "1 cuadra = 17.500 m² — aproximadamente 132m × 132m",
            "Para acres: 1 cuadra ≈ 4,33 acres — mais de 4 acres",
            "Estâncias argentinas são frequentemente medidas em cuadras: um campo de 100 cuadras = 175 hectares"
          ]
        }
      },
      "education": {
        "howToConvert": {
          "title": "Como Converter Cuadras para Hectares",
          "content": "Para converter cuadras para hectares, multiplique o número de cuadras por 1,75. Uma cuadra cuadrada equivale a 17.500 metros quadrados, e como um hectare é 10.000 metros quadrados, a proporção é 17.500 ÷ 10.000 = 1,75. A cuadra originou-se como uma medida linear de cerca de 130 metros (150 varas), e a cuadra cuadrada é um quadrado com lados desse comprimento. Esta unidade está profundamente enraizada na tradição agrícola da região do Rio da Prata, onde vastas estâncias têm sido medidas em cuadras há séculos. Compreender esta conversão é essencial para qualquer pessoa que lide com imóveis rurais na Argentina, Uruguai ou Paraguai."
        },
        "commonUses": {
          "title": "Onde a Cuadra é Usada Hoje",
          "content": "A cuadra permanece em uso ativo na Argentina, Uruguai e Paraguai para medição de terras rurais. Estâncias argentinas no Pampa, Patagônia e nas províncias de Buenos Aires, Santa Fe, Córdoba e Entre Ríos são tradicionalmente descritas em cuadras. Anúncios imobiliários para campo (propriedade rural) na Argentina frequentemente citam tamanhos em cuadras junto com hectares. Propriedades rurais uruguaias, especialmente fazendas de gado nos departamentos de Tacuarembó, Cerro Largo e Salto, usam cuadras. No Paraguai, terras rurais no Chaco e departamentos orientais também são medidas em cuadras. Tabeliães, agrimensores e cooperativas agrícolas nesses países rotineiramente convertem entre cuadras e hectares. A unidade persiste na conversa mesmo entre habitantes da cidade discutindo estâncias familiares."
        },
        "examples": {
          "title": "Exemplos de Conversão",
          "description": "Conversões de cuadras passo a passo",
          "examples": [
            {
              "title": "Converter 50 cuadras para hectares (estância média)",
              "steps": [
                "Fórmula: hectares = cuadras × 1,75",
                "50 × 1,75 = 87,5",
                "50 cuadras = 87,5 hectares"
              ],
              "result": "50 cuadras = 87,5 ha"
            },
            {
              "title": "Converter 200 cuadras para acres (campo grande)",
              "steps": [
                "Primeiro para m²: 200 × 17.500 = 3.500.000 m²",
                "Depois para acres: 3.500.000 ÷ 4.046,86 = 864,9",
                "200 cuadras ≈ 865 acres"
              ],
              "result": "200 cuadras = 865 acres"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Quantos hectares tem 1 cuadra?",
          "answer": "1 cuadra cuadrada = 1,75 hectares (17.500 m²)."
        },
        {
          "question": "Quantos acres tem 1 cuadra?",
          "answer": "1 cuadra ≈ 4,33 acres."
        },
        {
          "question": "Quais países usam a cuadra?",
          "answer": "A cuadra cuadrada é usada na Argentina, Uruguai e Paraguai para medição de terras rurais."
        },
        {
          "question": "Qual é a diferença entre uma cuadra lineal e uma cuadra cuadrada?",
          "answer": "Uma cuadra lineal é uma unidade de distância (~130 metros, também usada para quarteirões da cidade). Uma cuadra cuadrada é uma unidade de área (17.500 m²) usada para medição de terras. Este conversor trabalha com cuadras cuadradas (área)."
        },
        {
          "question": "Quantas cuadras tem 1 hectare?",
          "answer": "1 hectare = 0,5714 cuadras (10.000 ÷ 17.500 ≈ 0,57). Então aproximadamente 4 hectares = 2,3 cuadras."
        },
        {
          "question": "A cuadra ainda é legalmente reconhecida?",
          "answer": "Embora Argentina, Uruguai e Paraguai usem oficialmente o sistema métrico, a cuadra aparece em títulos históricos de propriedade, registros de estâncias e é amplamente compreendida por tabeliães e agrimensores. Muitas transações de propriedades rurais ainda fazem referência a cuadras."
        }
      ],
      "detailedTable": {
        "conversionTable": {
          "button": "Ver Tabela de Conversão Completa",
          "title": "Tabela de Conversão de Cuadras para Hectares",
          "columns": {
            "cuadras": "Cuadras",
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
      "name": "Convertisseur Cuadras en Hectares",
      "slug": "calculateur-convertisseur-cuadras-hectares",
      "subtitle": "Convertissez les cuadras en hectares, acres et mètres carrés — l'unité de mesure traditionnelle des terres d'Argentine, d'Uruguay et du Paraguay.",
      "breadcrumb": "Cuadras en Hectares",
      "seo": {
        "title": "Convertisseur Cuadras en Hectares - Unité Foncière Argentine",
        "description": "Convertissez instantanément les cuadras en hectares. La cuadra cuadrada est l'unité foncière traditionnelle en Argentine, Uruguay et Paraguay. 1 cuadra = 1,75 hectares.",
        "shortDescription": "Convertissez les cuadras en hectares pour les terres sud-américaines.",
        "keywords": [
          "cuadra en hectare",
          "convertisseur cuadra",
          "cuadra a hectarea",
          "unité foncière argentine",
          "convertir cuadra",
          "cuadra cuadrada",
          "cuantas hectareas tiene una cuadra",
          "cuadra uruguay"
        ]
      },
      "inputs": {
        "cuadraValue": {
          "label": "Cuadras",
          "helpText": "Entrez le nombre de cuadras cuadradas à convertir"
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
        "ft2": {
          "label": "Pieds Carrés"
        }
      },
      "presets": {
        "smallField": {
          "label": "1 Cuadra",
          "description": "1,75 ha"
        },
        "mediumCampo": {
          "label": "10 Cuadras",
          "description": "Campo moyen"
        },
        "estancia": {
          "label": "100 Cuadras",
          "description": "Estancia"
        },
        "largeEstancia": {
          "label": "500 Cuadras",
          "description": "Grande estancia"
        }
      },
      "values": {
        "ha": "ha",
        "ac": "acres",
        "m2": "m²",
        "km2": "km²",
        "ft2": "pi²"
      },
      "formats": {
        "summary": "{cuadraValue} cuadras = {hectares} hectares"
      },
      "infoCards": {
        "quickConversions": {
          "title": "Référence Rapide",
          "items": [
            {
              "label": "1 cuadra",
              "valueKey": "ref1"
            },
            {
              "label": "5 cuadras",
              "valueKey": "ref5"
            },
            {
              "label": "10 cuadras",
              "valueKey": "ref10"
            },
            {
              "label": "50 cuadras",
              "valueKey": "ref50"
            },
            {
              "label": "100 cuadras",
              "valueKey": "ref100"
            },
            {
              "label": "1 000 cuadras",
              "valueKey": "ref1000"
            }
          ]
        },
        "tips": {
          "title": "Conseils de Conversion",
          "items": [
            "1 cuadra = 1,75 hectares — multipliez les cuadras par 1,75 pour une conversion rapide",
            "1 cuadra = 17 500 m² — environ 132 m × 132 m",
            "Pour les acres : 1 cuadra ≈ 4,33 acres — plus de 4 acres",
            "Les estancias argentines sont souvent mesurées en cuadras : un campo de 100 cuadras = 175 hectares"
          ]
        }
      },
      "education": {
        "howToConvert": {
          "title": "Comment Convertir les Cuadras en Hectares",
          "content": "Pour convertir les cuadras en hectares, multipliez le nombre de cuadras par 1,75. Une cuadra cuadrada équivaut à 17 500 mètres carrés, et puisqu'un hectare fait 10 000 mètres carrés, le ratio est de 17 500 ÷ 10 000 = 1,75. La cuadra a pour origine une mesure linéaire d'environ 130 mètres (150 varas), et la cuadra cuadrada est un carré dont les côtés font cette longueur. Cette unité est profondément ancrée dans la tradition agricole de la région du Río de la Plata, où de vastes estancias sont mesurées en cuadras depuis des siècles. Comprendre cette conversion est essentiel pour quiconque traite avec l'immobilier rural en Argentine, en Uruguay ou au Paraguay."
        },
        "commonUses": {
          "title": "Où la Cuadra Est Utilisée Aujourd'hui",
          "content": "La cuadra reste activement utilisée en Argentine, en Uruguay et au Paraguay pour la mesure des terres rurales. Les estancias argentines de la Pampa, de la Patagonie et des provinces de Buenos Aires, Santa Fe, Córdoba et Entre Ríos sont traditionnellement décrites en cuadras. Les annonces immobilières pour le campo (propriété rurale) en Argentine citent fréquemment les superficies en cuadras aux côtés des hectares. Les propriétés rurales uruguayennes, en particulier les ranchs d'élevage dans les départements de Tacuarembó, Cerro Largo et Salto, utilisent les cuadras. Au Paraguay, les terres rurales du Chaco et des départements orientaux sont également mesurées en cuadras. Les notaires, géomètres et coopératives agricoles de ces pays convertissent régulièrement entre cuadras et hectares."
        },
        "examples": {
          "title": "Exemples de Conversion",
          "description": "Conversions de cuadras étape par étape",
          "examples": [
            {
              "title": "Convertir 50 cuadras en hectares (estancia moyenne)",
              "steps": [
                "Formule : hectares = cuadras × 1,75",
                "50 × 1,75 = 87,5",
                "50 cuadras = 87,5 hectares"
              ],
              "result": "50 cuadras = 87,5 ha"
            },
            {
              "title": "Convertir 200 cuadras en acres (grand campo)",
              "steps": [
                "D'abord en m² : 200 × 17 500 = 3 500 000 m²",
                "Puis en acres : 3 500 000 ÷ 4 046,86 = 864,9",
                "200 cuadras ≈ 865 acres"
              ],
              "result": "200 cuadras = 865 acres"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Combien d'hectares fait 1 cuadra ?",
          "answer": "1 cuadra cuadrada = 1,75 hectares (17 500 m²)."
        },
        {
          "question": "Combien d'acres fait 1 cuadra ?",
          "answer": "1 cuadra ≈ 4,33 acres."
        },
        {
          "question": "Quels pays utilisent la cuadra ?",
          "answer": "La cuadra cuadrada est utilisée en Argentine, en Uruguay et au Paraguay pour la mesure des terres rurales."
        },
        {
          "question": "Quelle est la différence entre une cuadra lineal et une cuadra cuadrada ?",
          "answer": "Une cuadra lineal est une unité de distance (~130 mètres, également utilisée pour les pâtés de maisons). Une cuadra cuadrada est une unité de superficie (17 500 m²) utilisée pour la mesure des terres. Ce convertisseur traite les cuadras cuadradas (superficie)."
        },
        {
          "question": "Combien de cuadras dans 1 hectare ?",
          "answer": "1 hectare = 0,5714 cuadras (10 000 ÷ 17 500 ≈ 0,57). Donc environ 4 hectares = 2,3 cuadras."
        },
        {
          "question": "La cuadra est-elle encore légalement reconnue ?",
          "answer": "Bien que l'Argentine, l'Uruguay et le Paraguay utilisent officiellement le système métrique, la cuadra apparaît dans les titres de propriété historiques, les registres d'estancia, et est largement comprise par les notaires et géomètres. De nombreuses transactions de propriétés rurales font encore référence aux cuadras."
        }
      ],
      "detailedTable": {
        "conversionTable": {
          "button": "Voir le Tableau de Conversion Complet",
          "title": "Tableau de Conversion Cuadras en Hectares",
          "columns": {
            "cuadras": "Cuadras",
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
      },
      "calculator": {
        "yourInformation": "Vos Informations"
      }
    },
    de: {
      "name": "Cuadras zu Hektar Umrechner",
      "slug": "cuadras-zu-hektar-umrechner-rechner",
      "subtitle": "Rechnen Sie Cuadras in Hektar, Acres und Quadratmeter um — die traditionelle Landmaßeinheit von Argentinien, Uruguay und Paraguay.",
      "breadcrumb": "Cuadras zu Hektar",
      "seo": {
        "title": "Cuadras zu Hektar Umrechner - Argentinische Landmaßeinheit",
        "description": "Rechnen Sie Cuadras sofort in Hektar um. Die Cuadra Cuadrada ist die traditionelle Landmaßeinheit in Argentinien, Uruguay und Paraguay. 1 Cuadra = 1,75 Hektar.",
        "shortDescription": "Rechnen Sie Cuadras in Hektar für südamerikanisches Land um.",
        "keywords": [
          "cuadra zu hektar",
          "cuadra umrechner",
          "cuadra zu hektar",
          "argentinische landmaßeinheit",
          "cuadra umrechnen",
          "cuadra cuadrada",
          "wie viele hektar hat eine cuadra",
          "cuadra uruguay"
        ]
      },
      "calculator": {
        "yourInformation": "Ihre Informationen"
      },
      "inputs": {
        "cuadraValue": {
          "label": "Cuadras",
          "helpText": "Geben Sie die Anzahl der Cuadras Cuadradas zum Umrechnen ein"
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
        "ft2": {
          "label": "Quadratfuß"
        }
      },
      "presets": {
        "smallField": {
          "label": "1 Cuadra",
          "description": "1,75 ha"
        },
        "mediumCampo": {
          "label": "10 Cuadras",
          "description": "Mittlerer Campo"
        },
        "estancia": {
          "label": "100 Cuadras",
          "description": "Estancia"
        },
        "largeEstancia": {
          "label": "500 Cuadras",
          "description": "Große Estancia"
        }
      },
      "values": {
        "ha": "ha",
        "ac": "Acres",
        "m2": "m²",
        "km2": "km²",
        "ft2": "ft²"
      },
      "formats": {
        "summary": "{cuadraValue} Cuadras = {hectares} Hektar"
      },
      "infoCards": {
        "quickConversions": {
          "title": "Schnellreferenz",
          "items": [
            {
              "label": "1 Cuadra",
              "valueKey": "ref1"
            },
            {
              "label": "5 Cuadras",
              "valueKey": "ref5"
            },
            {
              "label": "10 Cuadras",
              "valueKey": "ref10"
            },
            {
              "label": "50 Cuadras",
              "valueKey": "ref50"
            },
            {
              "label": "100 Cuadras",
              "valueKey": "ref100"
            },
            {
              "label": "1.000 Cuadras",
              "valueKey": "ref1000"
            }
          ]
        },
        "tips": {
          "title": "Umrechnungstipps",
          "items": [
            "1 Cuadra = 1,75 Hektar — multiplizieren Sie Cuadras mit 1,75 für eine schnelle Umrechnung",
            "1 Cuadra = 17.500 m² — etwa 132m × 132m",
            "Für Acres: 1 Cuadra ≈ 4,33 Acres — über 4 Acres",
            "Argentinische Estancias werden oft in Cuadras gemessen: ein 100-Cuadra-Campo = 175 Hektar"
          ]
        }
      },
      "education": {
        "howToConvert": {
          "title": "Wie man Cuadras in Hektar umrechnet",
          "content": "Um Cuadras in Hektar umzurechnen, multiplizieren Sie die Anzahl der Cuadras mit 1,75. Eine Cuadra Cuadrada entspricht 17.500 Quadratmetern, und da ein Hektar 10.000 Quadratmeter beträgt, ist das Verhältnis 17.500 ÷ 10.000 = 1,75. Die Cuadra entstand ursprünglich als lineares Maß von etwa 130 Metern (150 Varas), und die Cuadra Cuadrada ist ein Quadrat mit Seiten dieser Länge. Diese Einheit ist tief in der landwirtschaftlichen Tradition der Río-de-la-Plata-Region verwurzelt, wo riesige Estancias seit Jahrhunderten in Cuadras gemessen werden. Das Verständnis dieser Umrechnung ist für jeden, der mit ländlichen Immobilien in Argentinien, Uruguay oder Paraguay zu tun hat, unerlässlich."
        },
        "commonUses": {
          "title": "Wo die Cuadra heute verwendet wird",
          "content": "Die Cuadra wird in Argentinien, Uruguay und Paraguay weiterhin aktiv für die Messung von ländlichem Land verwendet. Argentinische Estancias in der Pampa, Patagonien und den Provinzen Buenos Aires, Santa Fe, Córdoba und Entre Ríos werden traditionell in Cuadras beschrieben. Immobilienanzeigen für Campo (ländliches Eigentum) in Argentinien geben häufig Größen in Cuadras neben Hektarn an. Uruguayische ländliche Grundstücke, insbesondere Viehfarmen in den Departements Tacuarembó, Cerro Largo und Salto, verwenden Cuadras. In Paraguay wird ländliches Land im Chaco und in den östlichen Departements ebenfalls in Cuadras gemessen. Notare, Landvermesser und landwirtschaftliche Genossenschaften in diesen Ländern rechnen routinemäßig zwischen Cuadras und Hektarn um. Die Einheit bleibt sogar im Gespräch unter Stadtbewohnern bestehen, die über Familien-Estancias sprechen."
        },
        "examples": {
          "title": "Umrechnungsbeispiele",
          "description": "Schritt-für-Schritt Cuadra-Umrechnungen",
          "examples": [
            {
              "title": "50 Cuadras in Hektar umrechnen (mittlere Estancia)",
              "steps": [
                "Formel: Hektar = Cuadras × 1,75",
                "50 × 1,75 = 87,5",
                "50 Cuadras = 87,5 Hektar"
              ],
              "result": "50 Cuadras = 87,5 ha"
            },
            {
              "title": "200 Cuadras in Acres umrechnen (großer Campo)",
              "steps": [
                "Zuerst in m²: 200 × 17.500 = 3.500.000 m²",
                "Dann in Acres: 3.500.000 ÷ 4.046,86 = 864,9",
                "200 Cuadras ≈ 865 Acres"
              ],
              "result": "200 Cuadras = 865 Acres"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Wie viele Hektar ist 1 Cuadra?",
          "answer": "1 Cuadra Cuadrada = 1,75 Hektar (17.500 m²)."
        },
        {
          "question": "Wie viele Acres ist 1 Cuadra?",
          "answer": "1 Cuadra ≈ 4,33 Acres."
        },
        {
          "question": "Welche Länder verwenden die Cuadra?",
          "answer": "Die Cuadra Cuadrada wird in Argentinien, Uruguay und Paraguay für die Messung von ländlichem Land verwendet."
        },
        {
          "question": "Was ist der Unterschied zwischen einer Cuadra Lineal und einer Cuadra Cuadrada?",
          "answer": "Eine Cuadra Lineal ist eine Entfernungseinheit (~130 Meter, wird auch für Stadtblöcke verwendet). Eine Cuadra Cuadrada ist eine Flächeneinheit (17.500 m²), die für die Landmessung verwendet wird. Dieser Umrechner behandelt Cuadras Cuadradas (Fläche)."
        },
        {
          "question": "Wie viele Cuadras sind 1 Hektar?",
          "answer": "1 Hektar = 0,5714 Cuadras (10.000 ÷ 17.500 ≈ 0,57). Also etwa 4 Hektar = 2,3 Cuadras."
        },
        {
          "question": "Ist die Cuadra noch rechtlich anerkannt?",
          "answer": "Obwohl Argentinien, Uruguay und Paraguay offiziell das metrische System verwenden, erscheint die Cuadra in historischen Eigentumstiurkunden, Estancia-Aufzeichnungen und wird von Notaren und Landvermessern weithin verstanden. Viele ländliche Immobilientransaktionen beziehen sich noch auf Cuadras."
        }
      ],
      "detailedTable": {
        "conversionTable": {
          "button": "Vollständige Umrechnungstabelle anzeigen",
          "title": "Cuadras zu Hektar Umrechnungstabelle",
          "columns": {
            "cuadras": "Cuadras",
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
  inputs: [{ id: "cuadraValue", type: "number", defaultValue: null, placeholder: "10", min: 0.001, max: 100000000, step: 0.01, suffix: "cuadras" }],
  inputGroups: [],
  results: [
    { id: "hectares", type: "primary", format: "number" },
    { id: "acres", type: "secondary", format: "number" },
    { id: "m2", type: "secondary", format: "number" },
    { id: "km2", type: "secondary", format: "number" },
    { id: "ft2", type: "secondary", format: "number" },
  ],
  infoCards: [ { id: "quickConversions", type: "list", icon: "📋", itemCount: 6 }, { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 } ],
  detailedTable: {
    id: "conversionTable", buttonLabel: "View Full Conversion Table", buttonIcon: "📊", modalTitle: "Cuadras to Hectares Conversion Table",
    columns: [ { id: "cuadras", label: "Cuadras", align: "center" }, { id: "ha", label: "Hectares", align: "right", highlight: true }, { id: "acres", label: "Acres", align: "right" }, { id: "m2", label: "Square Meters", align: "right" } ],
  },
  referenceData: [],
  educationSections: [ { id: "howToConvert", type: "prose", icon: "📖" }, { id: "commonUses", type: "prose", icon: "🌍" }, { id: "examples", type: "code-example", icon: "🧮", columns: 2, exampleCount: 2 } ],
  faqs: [{ id: "0" }, { id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }],
  references: [
    { authors: "United Nations Statistics Division", year: "1966", title: "World Weights and Measures: Handbook for Statisticians", source: "United Nations", url: "https://unstats.un.org/unsd/publication/SeriesM/SeriesM_21.pdf" },
    { authors: "Instituto Nacional de Tecnología Agropecuaria (INTA)", year: "2023", title: "Unidades de medida agrarias en Argentina", source: "INTA Argentina", url: "https://www.argentina.gob.ar/inta" },
  ],
  hero: { badge: "Free Tool", badgeVariant: "blue" as const },
  sidebar: { showNewsletter: true, showRelated: true },
  features: { export: true, save: true, share: true, rating: true },
  relatedCalculators: ["manzanas-to-hectareas", "fanegadas-to-hectareas", "tareas-to-metros-cuadrados", "varas-to-metros"],
  ads: { sidebar: true, footer: true },
};

export function calculateCuadrasToHectareas(data: { values: Record<string, unknown>; fieldUnits?: Record<string, string>; t?: Record<string, unknown> }): CalculatorResults {
  const { values, t } = data;
  const v = (t?.values as Record<string, string>) || {};
  const f = (t?.formats as Record<string, string>) || {};
  const cuadraValue = values.cuadraValue as number | null;
  if (cuadraValue === null || cuadraValue === undefined || cuadraValue <= 0) return { values: {}, formatted: {}, summary: "", isValid: false };

  const m2 = cuadraValue * CUADRA_TO_M2;
  const hectares = m2 / HA_TO_M2;
  const acres = m2 / ACRE_TO_M2;
  const km2 = m2 / 1000000;
  const ft2 = m2 * 10.7639;

  const haUnit = v["ha"] || "ha"; const acUnit = v["ac"] || "acres"; const m2Unit = v["m2"] || "m²"; const km2Unit = v["km2"] || "km²"; const ft2Unit = v["ft2"] || "ft²";
  const fmt = (n: number, d: number = 4) => n >= 1000 ? n.toLocaleString("en-US", { maximumFractionDigits: 2 }) : n.toFixed(d).replace(/0+$/, "").replace(/\.$/, "");

  const refCuadras = [1, 5, 10, 50, 100, 1000];
  const refs: Record<string, string> = {};
  refCuadras.forEach((c) => { refs[`ref${c}`] = `${fmt(c * CUADRA_TO_HA, 2)} ${haUnit}`; });

  const commonValues = [0.5, 1, 2, 3, 5, 10, 15, 20, 25, 50, 75, 100, 200, 500, 1000, cuadraValue];
  const uniqueVals = [...new Set(commonValues.map((v) => Math.round(v * 1000) / 1000))].sort((a, b) => a - b);
  const tableData = uniqueVals.map((c) => ({
    cuadras: `${c}`, ha: fmt(c * CUADRA_TO_HA, 2), acres: fmt(c * CUADRA_TO_M2 / ACRE_TO_M2, 1), m2: fmt(c * CUADRA_TO_M2, 0),
  }));

  const summary = f.summary?.replace("{cuadraValue}", cuadraValue.toString()).replace("{hectares}", fmt(hectares, 2)) || `${cuadraValue} cuadras = ${fmt(hectares, 2)} hectares`;
  return {
    values: { hectares, acres, m2, km2, ft2, ...refs },
    formatted: { hectares: `${fmt(hectares, 2)} ${haUnit}`, acres: `${fmt(acres, 1)} ${acUnit}`, m2: `${fmt(m2, 0)} ${m2Unit}`, km2: `${fmt(km2)} ${km2Unit}`, ft2: `${fmt(ft2, 0)} ${ft2Unit}`, ...refs },
    summary, isValid: true, metadata: { tableData },
  };
}

export default cuadrasToHectareasConfig;
