import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";

// 1 manzana = 6,987.295 m² (10,000 varas² where vara = 0.8359m)
// 1 hectárea = 10,000 m²
// 1 manzana ≈ 0.6987295 hectáreas
const MZ_TO_M2 = 6987.295;
const HA_TO_M2 = 10000;
const MZ_TO_HA = MZ_TO_M2 / HA_TO_M2; // 0.6987295
const ACRE_TO_M2 = 4046.8564224;

export const manzanasToHectareasConfig: CalculatorConfigV4 = {
  id: "manzanas-to-hectareas",
  version: "4.0",
  category: "conversion",
  icon: "🌾",
  presets: [
    { id: "smallFarm", icon: "🏡", values: { mzValue: 1 } },
    { id: "mediumFarm", icon: "🌾", values: { mzValue: 5 } },
    { id: "largeFarm", icon: "🚜", values: { mzValue: 10 } },
    { id: "estate", icon: "🏞️", values: { mzValue: 50 } },
  ],
  t: {
    en: {
      name: "Manzanas to Hectares Converter", slug: "manzanas-to-hectares-converter",
      subtitle: "Convert manzanas to hectares, acres, and square meters — the standard land unit in Central America.",
      breadcrumb: "Manzanas to Hectares",
      seo: {
        title: "Manzanas to Hectares Converter - Central American Land Unit",
        description: "Convert manzanas to hectares instantly. Used in El Salvador, Honduras, Nicaragua, Guatemala, and Costa Rica for land measurement. 1 manzana ≈ 0.7 hectares.",
        shortDescription: "Convert manzanas to hectares for Central American land.",
        keywords: ["manzanas to hectares", "manzana converter", "manzana to hectare", "central america land unit", "manzana area", "convert manzana", "how many hectares in a manzana", "manzana to acres"],
      },
      calculator: { yourInformation: "Enter Value" },
      ui: { yourInformation: "Enter Value", calculate: "Convert", reset: "Reset", results: "Results" },
      inputs: { mzValue: { label: "Manzanas", helpText: "Enter the number of manzanas to convert" } },
      results: { hectares: { label: "Hectares" }, acres: { label: "Acres" }, m2: { label: "Square Meters" }, km2: { label: "Square Kilometers" }, varas2: { label: "Varas²" } },
      presets: {
        smallFarm: { label: "1 Manzana", description: "Small plot" },
        mediumFarm: { label: "5 Manzanas", description: "Medium farm" },
        largeFarm: { label: "10 Manzanas", description: "Large farm" },
        estate: { label: "50 Manzanas", description: "Estate / Hacienda" },
      },
      values: { ha: "ha", ac: "acres", m2: "m²", km2: "km²", v2: "varas²", mz: "mz" },
      formats: { summary: "{mzValue} manzanas = {hectares} hectares" },
      infoCards: {
        quickConversions: {
          title: "Quick Reference",
          items: [
            { label: "1 manzana", valueKey: "ref1" }, { label: "2 manzanas", valueKey: "ref2" },
            { label: "5 manzanas", valueKey: "ref5" }, { label: "10 manzanas", valueKey: "ref10" },
            { label: "20 manzanas", valueKey: "ref20" }, { label: "100 manzanas", valueKey: "ref100" },
          ],
        },
        tips: {
          title: "Conversion Tips",
          items: [
            "1 manzana ≈ 0.7 hectares (quick mental math: multiply by 0.7)",
            "1 manzana = 10,000 varas² — the original definition from colonial times",
            "The manzana varies slightly by country: ~6,987 m² is the standard (vara = 0.8359m)",
            "For acres: 1 manzana ≈ 1.727 acres — roughly 1¾ acres",
          ],
        },
      },
      education: {
        howToConvert: { title: "How to Convert Manzanas to Hectares", content: "To convert manzanas to hectares, multiply the number of manzanas by 0.6987295. This factor comes from the definition: one manzana equals 10,000 square varas, and one vara is 0.8359 meters, making one manzana equal to 6,987.295 square meters. Since one hectare is 10,000 square meters, the conversion is 6,987.295 ÷ 10,000 = 0.6987295 hectares per manzana. For quick estimates, multiplying by 0.7 gives a result accurate to within 0.2%. This unit is widely used in El Salvador, Honduras, Nicaragua, Guatemala, and Costa Rica for agricultural land and real estate transactions." },
        commonUses: { title: "Where the Manzana Is Used Today", content: "The manzana remains the primary land measurement unit in much of Central America, especially for agricultural and rural real estate. In El Salvador, property listings, land titles, and agricultural reports all use manzanas. Honduran coffee farmers measure their plantations in manzanas — a typical small coffee farm is 3 to 10 manzanas. Nicaraguan cattle ranches often span hundreds of manzanas. Guatemalan real estate listings for rural properties quote prices per manzana. Even Costa Rica, despite officially using the metric system, still sees manzanas in rural property transactions. International NGOs and development organizations working in Central America must convert between manzanas and hectares regularly for project planning and reporting." },
        examples: {
          title: "Conversion Examples", description: "Step-by-step manzana to hectare conversions",
          examples: [
            { title: "Convert 3 manzanas to hectares", steps: ["Formula: hectares = manzanas × 0.6987295", "3 × 0.6987295 = 2.0962", "3 manzanas = 2.10 hectares"], result: "3 mz = 2.10 ha" },
            { title: "Convert 15 manzanas to acres", steps: ["First to m²: 15 × 6,987.295 = 104,809 m²", "Then to acres: 104,809 ÷ 4,046.86 = 25.90", "15 manzanas = 25.90 acres"], result: "15 mz = 25.90 acres" },
          ],
        },
      },
      faqs: [
        { question: "How many hectares is 1 manzana?", answer: "1 manzana equals approximately 0.6987 hectares, or about 0.7 ha for quick estimates." },
        { question: "How many acres is 1 manzana?", answer: "1 manzana equals approximately 1.727 acres, or roughly 1¾ acres." },
        { question: "Which countries use the manzana?", answer: "The manzana is used in El Salvador, Honduras, Nicaragua, Guatemala, Costa Rica, and parts of Belize for land measurement." },
        { question: "Why does the manzana size vary by country?", answer: "The manzana is defined as 10,000 square varas, but the vara length differs slightly between countries. The standard vara of 0.8359m gives 6,987.295 m². In practice, most countries round to approximately 7,000 m²." },
        { question: "Is the manzana still legally recognized?", answer: "Yes, in several Central American countries the manzana is legally recognized in property titles, land registries, and real estate transactions alongside metric units." },
        { question: "How do I convert manzanas to square meters?", answer: "Multiply manzanas by 6,987.295 to get square meters. For example, 2 manzanas = 13,974.59 m²." },
      ],
      rating: { title: "Rate this Converter", share: "Share", copied: "Copied!", copyLink: "Copy Link", clickToRate: "Click to rate", youRated: "You rated", stars: "stars", averageFrom: "average from", ratings: "ratings" },
      common: { home: "Home", calculators: "Calculators" },
      buttons: { calculate: "Convert", reset: "Reset", pdf: "PDF", csv: "CSV", excel: "Excel", save: "Save", saved: "Saved", saving: "Saving..." },
      share: { calculatedWith: "Converted with Kalcufy.com" },
      accessibility: { mobileResults: "Results", closeModal: "Close", openMenu: "Menu" },
      sources: { title: "Sources & References" },
      detailedTable: { conversionTable: { button: "View Full Conversion Table", title: "Manzanas to Hectares Conversion Table", columns: { mz: "Manzanas", ha: "Hectares", acres: "Acres", m2: "Square Meters" } } },
    },
    es: {
      "name": "Conversor de Manzanas a Hectáreas",
      "slug": "calculadora-conversor-manzanas-hectareas",
      "subtitle": "Convierte manzanas a hectáreas, acres y metros cuadrados — la unidad de tierra estándar en Centroamérica.",
      "breadcrumb": "Manzanas a Hectáreas",
      "seo": {
        "title": "Conversor de Manzanas a Hectáreas - Unidad de Tierra Centroamericana",
        "description": "Convierte manzanas a hectáreas al instante. Usado en El Salvador, Honduras, Nicaragua, Guatemala y Costa Rica para medición de tierras. 1 manzana ≈ 0.7 hectáreas.",
        "shortDescription": "Convierte manzanas a hectáreas para tierras centroamericanas.",
        "keywords": [
          "manzanas a hectáreas",
          "conversor manzana",
          "manzana a hectárea",
          "unidad de tierra centroamerica",
          "área manzana",
          "convertir manzana",
          "cuántas hectáreas en una manzana",
          "manzana a acres"
        ]
      },
      "inputs": {
        "mzValue": {
          "label": "Manzanas",
          "helpText": "Ingrese el número de manzanas a convertir"
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
        "varas2": {
          "label": "Varas²"
        }
      },
      "presets": {
        "smallFarm": {
          "label": "1 Manzana",
          "description": "Parcela pequeña"
        },
        "mediumFarm": {
          "label": "5 Manzanas",
          "description": "Finca mediana"
        },
        "largeFarm": {
          "label": "10 Manzanas",
          "description": "Finca grande"
        },
        "estate": {
          "label": "50 Manzanas",
          "description": "Latifundio / Hacienda"
        }
      },
      "values": {
        "ha": "ha",
        "ac": "acres",
        "m2": "m²",
        "km2": "km²",
        "v2": "varas²",
        "mz": "mz"
      },
      "formats": {
        "summary": "{mzValue} manzanas = {hectares} hectáreas"
      },
      "infoCards": {
        "quickConversions": {
          "title": "Referencia Rápida",
          "items": [
            {
              "label": "1 manzana",
              "valueKey": "ref1"
            },
            {
              "label": "2 manzanas",
              "valueKey": "ref2"
            },
            {
              "label": "5 manzanas",
              "valueKey": "ref5"
            },
            {
              "label": "10 manzanas",
              "valueKey": "ref10"
            },
            {
              "label": "20 manzanas",
              "valueKey": "ref20"
            },
            {
              "label": "100 manzanas",
              "valueKey": "ref100"
            }
          ]
        },
        "tips": {
          "title": "Consejos de Conversión",
          "items": [
            "1 manzana ≈ 0.7 hectáreas (cálculo mental rápido: multiplique por 0.7)",
            "1 manzana = 10,000 varas² — la definición original de la época colonial",
            "La manzana varía ligeramente por país: ~6,987 m² es el estándar (vara = 0.8359m)",
            "Para acres: 1 manzana ≈ 1.727 acres — aproximadamente 1¾ acres"
          ]
        }
      },
      "education": {
        "howToConvert": {
          "title": "Cómo Convertir Manzanas a Hectáreas",
          "content": "Para convertir manzanas a hectáreas, multiplique el número de manzanas por 0.6987295. Este factor proviene de la definición: una manzana equivale a 10,000 varas cuadradas, y una vara es 0.8359 metros, haciendo que una manzana equivalga a 6,987.295 metros cuadrados. Como una hectárea son 10,000 metros cuadrados, la conversión es 6,987.295 ÷ 10,000 = 0.6987295 hectáreas por manzana. Para estimaciones rápidas, multiplicar por 0.7 da un resultado preciso dentro del 0.2%. Esta unidad se usa ampliamente en El Salvador, Honduras, Nicaragua, Guatemala y Costa Rica para transacciones de tierras agrícolas y bienes raíces."
        },
        "commonUses": {
          "title": "Dónde se Usa la Manzana Hoy",
          "content": "La manzana sigue siendo la unidad principal de medición de tierras en gran parte de Centroamérica, especialmente para bienes raíces agrícolas y rurales. En El Salvador, los listados de propiedades, títulos de tierras e informes agrícolas usan manzanas. Los caficultores hondureños miden sus plantaciones en manzanas — una típica finca cafetalera pequeña es de 3 a 10 manzanas. Las fincas ganaderas nicaragüenses a menudo abarcan cientos de manzanas. Los listados inmobiliarios guatemaltecos para propiedades rurales cotizan precios por manzana. Incluso Costa Rica, a pesar de usar oficialmente el sistema métrico, aún ve manzanas en transacciones de propiedades rurales. Las ONGs internacionales y organizaciones de desarrollo que trabajan en Centroamérica deben convertir entre manzanas y hectáreas regularmente para planificación de proyectos e informes."
        },
        "examples": {
          "title": "Ejemplos de Conversión",
          "description": "Conversiones paso a paso de manzana a hectárea",
          "examples": [
            {
              "title": "Convertir 3 manzanas a hectáreas",
              "steps": [
                "Fórmula: hectáreas = manzanas × 0.6987295",
                "3 × 0.6987295 = 2.0962",
                "3 manzanas = 2.10 hectáreas"
              ],
              "result": "3 mz = 2.10 ha"
            },
            {
              "title": "Convertir 15 manzanas a acres",
              "steps": [
                "Primero a m²: 15 × 6,987.295 = 104,809 m²",
                "Luego a acres: 104,809 ÷ 4,046.86 = 25.90",
                "15 manzanas = 25.90 acres"
              ],
              "result": "15 mz = 25.90 acres"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "¿Cuántas hectáreas tiene 1 manzana?",
          "answer": "1 manzana equivale aproximadamente a 0.6987 hectáreas, o cerca de 0.7 ha para estimaciones rápidas."
        },
        {
          "question": "¿Cuántos acres tiene 1 manzana?",
          "answer": "1 manzana equivale aproximadamente a 1.727 acres, o roughly 1¾ acres."
        },
        {
          "question": "¿Qué países usan la manzana?",
          "answer": "La manzana se usa en El Salvador, Honduras, Nicaragua, Guatemala, Costa Rica y partes de Belice para medición de tierras."
        },
        {
          "question": "¿Por qué varía el tamaño de la manzana por país?",
          "answer": "La manzana se define como 10,000 varas cuadradas, pero la longitud de la vara difiere ligeramente entre países. La vara estándar de 0.8359m da 6,987.295 m². En la práctica, la mayoría de países redondean a aproximadamente 7,000 m²."
        },
        {
          "question": "¿Sigue siendo legalmente reconocida la manzana?",
          "answer": "Sí, en varios países centroamericanos la manzana es legalmente reconocida en títulos de propiedad, registros de tierras y transacciones inmobiliarias junto con las unidades métricas."
        },
        {
          "question": "¿Cómo convierto manzanas a metros cuadrados?",
          "answer": "Multiplique las manzanas por 6,987.295 para obtener metros cuadrados. Por ejemplo, 2 manzanas = 13,974.59 m²."
        }
      ],
      "detailedTable": {
        "conversionTable": {
          "button": "Ver Tabla de Conversión Completa",
          "title": "Tabla de Conversión de Manzanas a Hectáreas",
          "columns": {
            "mz": "Manzanas",
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
      },
      "calculator": {
        "yourInformation": "Tu Información"
      }
    },
    pt: {
      "name": "Conversor de Manzanas para Hectares",
      "slug": "calculadora-conversor-manzanas-hectares",
      "subtitle": "Converta manzanas para hectares, acres e metros quadrados — a unidade padrão de terra na América Central.",
      "breadcrumb": "Manzanas para Hectares",
      "seo": {
        "title": "Conversor de Manzanas para Hectares - Unidade de Terra da América Central",
        "description": "Converta manzanas para hectares instantaneamente. Usado em El Salvador, Honduras, Nicarágua, Guatemala e Costa Rica para medição de terras. 1 manzana ≈ 0,7 hectares.",
        "shortDescription": "Converta manzanas para hectares para terras da América Central.",
        "keywords": [
          "manzanas para hectares",
          "conversor manzana",
          "manzana para hectare",
          "unidade de terra america central",
          "área manzana",
          "converter manzana",
          "quantos hectares em uma manzana",
          "manzana para acres"
        ]
      },
      "calculator": {
        "yourInformation": "Suas Informações"
      },
      "inputs": {
        "mzValue": {
          "label": "Manzanas",
          "helpText": "Insira o número de manzanas para converter"
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
        "varas2": {
          "label": "Varas²"
        }
      },
      "presets": {
        "smallFarm": {
          "label": "1 Manzana",
          "description": "Terreno pequeno"
        },
        "mediumFarm": {
          "label": "5 Manzanas",
          "description": "Fazenda média"
        },
        "largeFarm": {
          "label": "10 Manzanas",
          "description": "Fazenda grande"
        },
        "estate": {
          "label": "50 Manzanas",
          "description": "Propriedade / Fazenda"
        }
      },
      "values": {
        "ha": "ha",
        "ac": "acres",
        "m2": "m²",
        "km2": "km²",
        "v2": "varas²",
        "mz": "mz"
      },
      "formats": {
        "summary": "{mzValue} manzanas = {hectares} hectares"
      },
      "infoCards": {
        "quickConversions": {
          "title": "Referência Rápida",
          "items": [
            {
              "label": "1 manzana",
              "valueKey": "ref1"
            },
            {
              "label": "2 manzanas",
              "valueKey": "ref2"
            },
            {
              "label": "5 manzanas",
              "valueKey": "ref5"
            },
            {
              "label": "10 manzanas",
              "valueKey": "ref10"
            },
            {
              "label": "20 manzanas",
              "valueKey": "ref20"
            },
            {
              "label": "100 manzanas",
              "valueKey": "ref100"
            }
          ]
        },
        "tips": {
          "title": "Dicas de Conversão",
          "items": [
            "1 manzana ≈ 0,7 hectares (cálculo mental rápido: multiplique por 0,7)",
            "1 manzana = 10.000 varas² — a definição original dos tempos coloniais",
            "A manzana varia ligeiramente por país: ~6.987 m² é o padrão (vara = 0,8359m)",
            "Para acres: 1 manzana ≈ 1,727 acres — aproximadamente 1¾ acres"
          ]
        }
      },
      "education": {
        "howToConvert": {
          "title": "Como Converter Manzanas para Hectares",
          "content": "Para converter manzanas para hectares, multiplique o número de manzanas por 0,6987295. Este fator vem da definição: uma manzana equivale a 10.000 varas quadradas, e uma vara tem 0,8359 metros, fazendo uma manzana igual a 6.987,295 metros quadrados. Como um hectare tem 10.000 metros quadrados, a conversão é 6.987,295 ÷ 10.000 = 0,6987295 hectares por manzana. Para estimativas rápidas, multiplicar por 0,7 dá um resultado preciso em até 0,2%. Esta unidade é amplamente usada em El Salvador, Honduras, Nicarágua, Guatemala e Costa Rica para transações de terras agrícolas e imobiliárias."
        },
        "commonUses": {
          "title": "Onde a Manzana é Usada Hoje",
          "content": "A manzana permanece como a principal unidade de medição de terra em grande parte da América Central, especialmente para propriedades agrícolas e rurais. Em El Salvador, listagens de propriedades, títulos de terra e relatórios agrícolas usam manzanas. Cafeicultores hondurenhos medem suas plantações em manzanas — uma pequena fazenda de café típica tem de 3 a 10 manzanas. Fazendas de gado nicaraguenses frequentemente abrangem centenas de manzanas. Listagens imobiliárias guatemaltecas para propriedades rurais cotam preços por manzana. Mesmo a Costa Rica, apesar de oficialmente usar o sistema métrico, ainda vê manzanas em transações de propriedades rurais. ONGs internacionais e organizações de desenvolvimento trabalhando na América Central devem converter entre manzanas e hectares regularmente para planejamento e relatórios de projetos."
        },
        "examples": {
          "title": "Exemplos de Conversão",
          "description": "Conversões passo a passo de manzana para hectare",
          "examples": [
            {
              "title": "Converter 3 manzanas para hectares",
              "steps": [
                "Fórmula: hectares = manzanas × 0,6987295",
                "3 × 0,6987295 = 2,0962",
                "3 manzanas = 2,10 hectares"
              ],
              "result": "3 mz = 2,10 ha"
            },
            {
              "title": "Converter 15 manzanas para acres",
              "steps": [
                "Primeiro para m²: 15 × 6.987,295 = 104.809 m²",
                "Depois para acres: 104.809 ÷ 4.046,86 = 25,90",
                "15 manzanas = 25,90 acres"
              ],
              "result": "15 mz = 25,90 acres"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Quantos hectares tem 1 manzana?",
          "answer": "1 manzana equivale a aproximadamente 0,6987 hectares, ou cerca de 0,7 ha para estimativas rápidas."
        },
        {
          "question": "Quantos acres tem 1 manzana?",
          "answer": "1 manzana equivale a aproximadamente 1,727 acres, ou cerca de 1¾ acres."
        },
        {
          "question": "Quais países usam a manzana?",
          "answer": "A manzana é usada em El Salvador, Honduras, Nicarágua, Guatemala, Costa Rica e partes de Belize para medição de terras."
        },
        {
          "question": "Por que o tamanho da manzana varia por país?",
          "answer": "A manzana é definida como 10.000 varas quadradas, mas o comprimento da vara difere ligeiramente entre países. A vara padrão de 0,8359m dá 6.987,295 m². Na prática, a maioria dos países arredonda para aproximadamente 7.000 m²."
        },
        {
          "question": "A manzana ainda é legalmente reconhecida?",
          "answer": "Sim, em vários países da América Central a manzana é legalmente reconhecida em títulos de propriedade, registros de terras e transações imobiliárias junto com unidades métricas."
        },
        {
          "question": "Como converter manzanas para metros quadrados?",
          "answer": "Multiplique manzanas por 6.987,295 para obter metros quadrados. Por exemplo, 2 manzanas = 13.974,59 m²."
        }
      ],
      "detailedTable": {
        "conversionTable": {
          "button": "Ver Tabela de Conversão Completa",
          "title": "Tabela de Conversão de Manzanas para Hectares",
          "columns": {
            "mz": "Manzanas",
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
      "name": "Convertisseur Manzanas vers Hectares",
      "slug": "calculateur-convertisseur-manzanas-vers-hectares",
      "subtitle": "Convertir les manzanas en hectares, acres et mètres carrés — l'unité de terrain standard en Amérique centrale.",
      "breadcrumb": "Manzanas vers Hectares",
      "seo": {
        "title": "Convertisseur Manzanas vers Hectares - Unité de Terrain d'Amérique Centrale",
        "description": "Convertissez instantanément les manzanas en hectares. Utilisé au Salvador, Honduras, Nicaragua, Guatemala et Costa Rica pour la mesure des terrains. 1 manzana ≈ 0,7 hectare.",
        "shortDescription": "Convertir les manzanas en hectares pour les terrains d'Amérique centrale.",
        "keywords": [
          "manzanas vers hectares",
          "convertisseur manzana",
          "manzana vers hectare",
          "unité de terrain amérique centrale",
          "superficie manzana",
          "convertir manzana",
          "combien d'hectares dans une manzana",
          "manzana vers acres"
        ]
      },
      "calculator": {
        "yourInformation": "Vos Informations"
      },
      "inputs": {
        "mzValue": {
          "label": "Manzanas",
          "helpText": "Saisissez le nombre de manzanas à convertir"
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
        "varas2": {
          "label": "Varas²"
        }
      },
      "presets": {
        "smallFarm": {
          "label": "1 Manzana",
          "description": "Petite parcelle"
        },
        "mediumFarm": {
          "label": "5 Manzanas",
          "description": "Ferme moyenne"
        },
        "largeFarm": {
          "label": "10 Manzanas",
          "description": "Grande ferme"
        },
        "estate": {
          "label": "50 Manzanas",
          "description": "Domaine / Hacienda"
        }
      },
      "values": {
        "ha": "ha",
        "ac": "acres",
        "m2": "m²",
        "km2": "km²",
        "v2": "varas²",
        "mz": "mz"
      },
      "formats": {
        "summary": "{mzValue} manzanas = {hectares} hectares"
      },
      "infoCards": {
        "quickConversions": {
          "title": "Référence Rapide",
          "items": [
            {
              "label": "1 manzana",
              "valueKey": "ref1"
            },
            {
              "label": "2 manzanas",
              "valueKey": "ref2"
            },
            {
              "label": "5 manzanas",
              "valueKey": "ref5"
            },
            {
              "label": "10 manzanas",
              "valueKey": "ref10"
            },
            {
              "label": "20 manzanas",
              "valueKey": "ref20"
            },
            {
              "label": "100 manzanas",
              "valueKey": "ref100"
            }
          ]
        },
        "tips": {
          "title": "Conseils de Conversion",
          "items": [
            "1 manzana ≈ 0,7 hectare (calcul mental rapide : multiplier par 0,7)",
            "1 manzana = 10 000 varas² — la définition originale de l'époque coloniale",
            "La manzana varie légèrement selon le pays : ~6 987 m² est la norme (vara = 0,8359m)",
            "Pour les acres : 1 manzana ≈ 1,727 acre — environ 1¾ acre"
          ]
        }
      },
      "education": {
        "howToConvert": {
          "title": "Comment Convertir les Manzanas en Hectares",
          "content": "Pour convertir les manzanas en hectares, multipliez le nombre de manzanas par 0,6987295. Ce facteur provient de la définition : une manzana équivaut à 10 000 varas carrées, et une vara mesure 0,8359 mètre, ce qui fait qu'une manzana équivaut à 6 987,295 mètres carrés. Puisqu'un hectare fait 10 000 mètres carrés, la conversion est 6 987,295 ÷ 10 000 = 0,6987295 hectare par manzana. Pour des estimations rapides, multiplier par 0,7 donne un résultat précis à 0,2% près. Cette unité est largement utilisée au Salvador, Honduras, Nicaragua, Guatemala et Costa Rica pour les transactions agricoles et immobilières."
        },
        "commonUses": {
          "title": "Où la Manzana est Utilisée Aujourd'hui",
          "content": "La manzana reste l'unité de mesure de terrain principale dans une grande partie de l'Amérique centrale, surtout pour l'agriculture et l'immobilier rural. Au Salvador, les annonces immobilières, titres de propriété et rapports agricoles utilisent tous les manzanas. Les cultivateurs de café honduriens mesurent leurs plantations en manzanas — une petite ferme de café typique fait 3 à 10 manzanas. Les ranches de bétail nicaraguayens s'étendent souvent sur des centaines de manzanas. Les annonces immobilières guatémaltèques pour les propriétés rurales cotent les prix par manzana. Même le Costa Rica, malgré l'utilisation officielle du système métrique, voit encore les manzanas dans les transactions de propriétés rurales. Les ONG internationales et organisations de développement travaillant en Amérique centrale doivent régulièrement convertir entre manzanas et hectares pour la planification et les rapports de projets."
        },
        "examples": {
          "title": "Exemples de Conversion",
          "description": "Conversions étape par étape de manzana vers hectare",
          "examples": [
            {
              "title": "Convertir 3 manzanas en hectares",
              "steps": [
                "Formule : hectares = manzanas × 0,6987295",
                "3 × 0,6987295 = 2,0962",
                "3 manzanas = 2,10 hectares"
              ],
              "result": "3 mz = 2,10 ha"
            },
            {
              "title": "Convertir 15 manzanas en acres",
              "steps": [
                "D'abord en m² : 15 × 6 987,295 = 104 809 m²",
                "Puis en acres : 104 809 ÷ 4 046,86 = 25,90",
                "15 manzanas = 25,90 acres"
              ],
              "result": "15 mz = 25,90 acres"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Combien d'hectares fait 1 manzana ?",
          "answer": "1 manzana équivaut à environ 0,6987 hectare, ou environ 0,7 ha pour des estimations rapides."
        },
        {
          "question": "Combien d'acres fait 1 manzana ?",
          "answer": "1 manzana équivaut à environ 1,727 acre, ou environ 1¾ acre."
        },
        {
          "question": "Quels pays utilisent la manzana ?",
          "answer": "La manzana est utilisée au Salvador, Honduras, Nicaragua, Guatemala, Costa Rica et dans certaines parties du Belize pour la mesure des terrains."
        },
        {
          "question": "Pourquoi la taille de la manzana varie-t-elle selon le pays ?",
          "answer": "La manzana est définie comme 10 000 varas carrées, mais la longueur de la vara diffère légèrement entre les pays. La vara standard de 0,8359m donne 6 987,295 m². En pratique, la plupart des pays arrondissent à environ 7 000 m²."
        },
        {
          "question": "La manzana est-elle encore légalement reconnue ?",
          "answer": "Oui, dans plusieurs pays d'Amérique centrale, la manzana est légalement reconnue dans les titres de propriété, registres fonciers et transactions immobilières aux côtés des unités métriques."
        },
        {
          "question": "Comment convertir les manzanas en mètres carrés ?",
          "answer": "Multipliez les manzanas par 6 987,295 pour obtenir les mètres carrés. Par exemple, 2 manzanas = 13 974,59 m²."
        }
      ],
      "detailedTable": {
        "conversionTable": {
          "button": "Voir le Tableau de Conversion Complet",
          "title": "Tableau de Conversion Manzanas vers Hectares",
          "columns": {
            "mz": "Manzanas",
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
      "name": "Manzanas zu Hektar Umrechner",
      "slug": "manzanas-zu-hektar-umrechner-rechner",
      "subtitle": "Manzanas in Hektar, Acres und Quadratmeter umrechnen — die Standardflächeneinheit in Mittelamerika.",
      "breadcrumb": "Manzanas zu Hektar",
      "seo": {
        "title": "Manzanas zu Hektar Umrechner - Mittelamerikanische Flächeneinheit",
        "description": "Manzanas sofort in Hektar umrechnen. Verwendet in El Salvador, Honduras, Nicaragua, Guatemala und Costa Rica für Flächenmessung. 1 Manzana ≈ 0,7 Hektar.",
        "shortDescription": "Manzanas in Hektar für mittelamerikanische Flächen umrechnen.",
        "keywords": [
          "manzanas zu hektar",
          "manzana umrechner",
          "manzana zu hektar",
          "mittelamerika flächeneinheit",
          "manzana fläche",
          "manzana umrechnen",
          "wie viele hektar in einer manzana",
          "manzana zu acres"
        ]
      },
      "inputs": {
        "mzValue": {
          "label": "Manzanas",
          "helpText": "Geben Sie die Anzahl der Manzanas ein, die umgerechnet werden sollen"
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
        "varas2": {
          "label": "Varas²"
        }
      },
      "presets": {
        "smallFarm": {
          "label": "1 Manzana",
          "description": "Kleines Grundstück"
        },
        "mediumFarm": {
          "label": "5 Manzanas",
          "description": "Mittlerer Bauernhof"
        },
        "largeFarm": {
          "label": "10 Manzanas",
          "description": "Großer Bauernhof"
        },
        "estate": {
          "label": "50 Manzanas",
          "description": "Gut / Hacienda"
        }
      },
      "values": {
        "ha": "ha",
        "ac": "Acres",
        "m2": "m²",
        "km2": "km²",
        "v2": "Varas²",
        "mz": "mz"
      },
      "formats": {
        "summary": "{mzValue} Manzanas = {hectares} Hektar"
      },
      "infoCards": {
        "quickConversions": {
          "title": "Schnellreferenz",
          "items": [
            {
              "label": "1 Manzana",
              "valueKey": "ref1"
            },
            {
              "label": "2 Manzanas",
              "valueKey": "ref2"
            },
            {
              "label": "5 Manzanas",
              "valueKey": "ref5"
            },
            {
              "label": "10 Manzanas",
              "valueKey": "ref10"
            },
            {
              "label": "20 Manzanas",
              "valueKey": "ref20"
            },
            {
              "label": "100 Manzanas",
              "valueKey": "ref100"
            }
          ]
        },
        "tips": {
          "title": "Umrechnungstipps",
          "items": [
            "1 Manzana ≈ 0,7 Hektar (schnelle Kopfrechnung: mit 0,7 multiplizieren)",
            "1 Manzana = 10.000 Varas² — die ursprüngliche Definition aus der Kolonialzeit",
            "Die Manzana variiert leicht je nach Land: ~6.987 m² ist der Standard (Vara = 0,8359m)",
            "Für Acres: 1 Manzana ≈ 1,727 Acres — etwa 1¾ Acres"
          ]
        }
      },
      "education": {
        "howToConvert": {
          "title": "Wie man Manzanas in Hektar umrechnet",
          "content": "Um Manzanas in Hektar umzurechnen, multiplizieren Sie die Anzahl der Manzanas mit 0,6987295. Dieser Faktor ergibt sich aus der Definition: Eine Manzana entspricht 10.000 Quadrat-Varas, und eine Vara ist 0,8359 Meter, wodurch eine Manzana 6.987,295 Quadratmetern entspricht. Da ein Hektar 10.000 Quadratmeter sind, ist die Umrechnung 6.987,295 ÷ 10.000 = 0,6987295 Hektar pro Manzana. Für schnelle Schätzungen ergibt die Multiplikation mit 0,7 ein Ergebnis mit einer Genauigkeit von 0,2%. Diese Einheit wird in El Salvador, Honduras, Nicaragua, Guatemala und Costa Rica für landwirtschaftliche Flächen und Immobilientransaktionen weit verbreitet verwendet."
        },
        "commonUses": {
          "title": "Wo die Manzana heute verwendet wird",
          "content": "Die Manzana bleibt die primäre Flächenmaßeinheit in weiten Teilen Mittelamerikas, besonders für landwirtschaftliche und ländliche Immobilien. In El Salvador verwenden Immobilienanzeigen, Landtitel und landwirtschaftliche Berichte alle Manzanas. Honduranische Kaffeebauern messen ihre Plantagen in Manzanas — eine typische kleine Kaffeefarm umfasst 3 bis 10 Manzanas. Nicaraguanische Rinderranches erstrecken sich oft über Hunderte von Manzanas. Guatemaltekische Immobilienanzeigen für ländliche Grundstücke geben Preise pro Manzana an. Sogar Costa Rica, das offiziell das metrische System verwendet, sieht noch immer Manzanas bei ländlichen Immobilientransaktionen. Internationale NGOs und Entwicklungsorganisationen, die in Mittelamerika arbeiten, müssen regelmäßig zwischen Manzanas und Hektar für Projektplanung und Berichterstattung umrechnen."
        },
        "examples": {
          "title": "Umrechnungsbeispiele",
          "description": "Schrittweise Manzana zu Hektar Umrechnungen",
          "examples": [
            {
              "title": "3 Manzanas in Hektar umrechnen",
              "steps": [
                "Formel: Hektar = Manzanas × 0,6987295",
                "3 × 0,6987295 = 2,0962",
                "3 Manzanas = 2,10 Hektar"
              ],
              "result": "3 mz = 2,10 ha"
            },
            {
              "title": "15 Manzanas in Acres umrechnen",
              "steps": [
                "Zuerst in m²: 15 × 6.987,295 = 104.809 m²",
                "Dann in Acres: 104.809 ÷ 4.046,86 = 25,90",
                "15 Manzanas = 25,90 Acres"
              ],
              "result": "15 mz = 25,90 Acres"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Wie viele Hektar entspricht 1 Manzana?",
          "answer": "1 Manzana entspricht etwa 0,6987 Hektar, oder etwa 0,7 ha für schnelle Schätzungen."
        },
        {
          "question": "Wie viele Acres entspricht 1 Manzana?",
          "answer": "1 Manzana entspricht etwa 1,727 Acres, oder ungefähr 1¾ Acres."
        },
        {
          "question": "Welche Länder verwenden die Manzana?",
          "answer": "Die Manzana wird in El Salvador, Honduras, Nicaragua, Guatemala, Costa Rica und Teilen von Belize für Flächenmessungen verwendet."
        },
        {
          "question": "Warum variiert die Manzana-Größe je nach Land?",
          "answer": "Die Manzana ist als 10.000 Quadrat-Varas definiert, aber die Vara-Länge unterscheidet sich leicht zwischen den Ländern. Die Standard-Vara von 0,8359m ergibt 6.987,295 m². In der Praxis runden die meisten Länder auf etwa 7.000 m² auf."
        },
        {
          "question": "Ist die Manzana noch rechtlich anerkannt?",
          "answer": "Ja, in mehreren mittelamerikanischen Ländern ist die Manzana rechtlich in Eigentumstiteln, Grundbüchern und Immobilientransaktionen neben metrischen Einheiten anerkannt."
        },
        {
          "question": "Wie rechne ich Manzanas in Quadratmeter um?",
          "answer": "Multiplizieren Sie Manzanas mit 6.987,295, um Quadratmeter zu erhalten. Zum Beispiel: 2 Manzanas = 13.974,59 m²."
        }
      ],
      "detailedTable": {
        "conversionTable": {
          "button": "Vollständige Umrechnungstabelle anzeigen",
          "title": "Manzanas zu Hektar Umrechnungstabelle",
          "columns": {
            "mz": "Manzanas",
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
      },
      "calculator": {
        "yourInformation": "Ihre Informationen"
      }
    },
  },
  inputs: [{ id: "mzValue", type: "number", defaultValue: null, placeholder: "5", min: 0.001, max: 100000000, step: 0.01, suffix: "mz" }],
  inputGroups: [],
  results: [
    { id: "hectares", type: "primary", format: "number" },
    { id: "acres", type: "secondary", format: "number" },
    { id: "m2", type: "secondary", format: "number" },
    { id: "km2", type: "secondary", format: "number" },
    { id: "varas2", type: "secondary", format: "number" },
  ],
  infoCards: [ { id: "quickConversions", type: "list", icon: "📋", itemCount: 6 }, { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 } ],
  detailedTable: {
    id: "conversionTable", buttonLabel: "View Full Conversion Table", buttonIcon: "📊", modalTitle: "Manzanas to Hectares Conversion Table",
    columns: [ { id: "mz", label: "Manzanas", align: "center" }, { id: "ha", label: "Hectares", align: "right", highlight: true }, { id: "acres", label: "Acres", align: "right" }, { id: "m2", label: "Square Meters", align: "right" } ],
  },
  referenceData: [],
  educationSections: [ { id: "howToConvert", type: "prose", icon: "📖" }, { id: "commonUses", type: "prose", icon: "🌍" }, { id: "examples", type: "code-example", icon: "🧮", columns: 2, exampleCount: 2 } ],
  faqs: [{ id: "0" }, { id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }],
  references: [
    { authors: "United Nations Statistics Division", year: "1966", title: "World Weights and Measures: Handbook for Statisticians", source: "United Nations", url: "https://unstats.un.org/unsd/publication/SeriesM/SeriesM_21.pdf" },
    { authors: "Comité Metrológico, Ministerio de Fomento", year: "2024", title: "Tabla Oficial de Conversión de Unidades", source: "Centro de Investigación Metrológica (CIM), El Salvador", url: "https://www.cim.gob.sv/wp-content/uploads/2024/11/Tabla-oficial-del-SI-2024.pdf" },
  ],
  hero: { badge: "Free Tool", badgeVariant: "blue" as const },
  sidebar: { showNewsletter: true, showRelated: true },
  features: { export: true, save: true, share: true, rating: true },
  relatedCalculators: ["fanegadas-to-hectareas", "tareas-to-metros-cuadrados", "cuadras-to-hectareas", "varas-to-metros"],
  ads: { sidebar: true, footer: true },
};

export function calculateManzanasToHectareas(data: { values: Record<string, unknown>; fieldUnits?: Record<string, string>; t?: Record<string, unknown> }): CalculatorResults {
  const { values, t } = data;
  const v = (t?.values as Record<string, string>) || {};
  const f = (t?.formats as Record<string, string>) || {};
  const mzValue = values.mzValue as number | null;
  if (mzValue === null || mzValue === undefined || mzValue <= 0) return { values: {}, formatted: {}, summary: "", isValid: false };

  const m2 = mzValue * MZ_TO_M2;
  const hectares = m2 / HA_TO_M2;
  const acres = m2 / ACRE_TO_M2;
  const km2 = m2 / 1000000;
  const varas2 = mzValue * 10000;

  const haUnit = v["ha"] || "ha"; const acUnit = v["ac"] || "acres"; const m2Unit = v["m2"] || "m²"; const km2Unit = v["km2"] || "km²"; const v2Unit = v["v2"] || "varas²";
  const fmt = (n: number, d: number = 4) => n >= 1000 ? n.toLocaleString("en-US", { maximumFractionDigits: 2 }) : n.toFixed(d).replace(/0+$/, "").replace(/\.$/, "");

  const refMz = [1, 2, 5, 10, 20, 100];
  const refs: Record<string, string> = {};
  refMz.forEach((mz) => { refs[`ref${mz}`] = `${fmt(mz * MZ_TO_HA, 2)} ${haUnit}`; });

  const commonValues = [0.5, 1, 2, 3, 5, 7, 10, 15, 20, 25, 30, 50, 75, 100, 200, 500, mzValue];
  const uniqueVals = [...new Set(commonValues.map((v) => Math.round(v * 1000) / 1000))].sort((a, b) => a - b);
  const tableData = uniqueVals.map((mz) => ({
    mz: `${mz}`, ha: fmt(mz * MZ_TO_HA, 2), acres: fmt(mz * MZ_TO_M2 / ACRE_TO_M2, 2), m2: fmt(mz * MZ_TO_M2, 0),
  }));

  const summary = f.summary?.replace("{mzValue}", mzValue.toString()).replace("{hectares}", fmt(hectares, 2)) || `${mzValue} manzanas = ${fmt(hectares, 2)} hectares`;
  return {
    values: { hectares, acres, m2, km2, varas2, ...refs },
    formatted: { hectares: `${fmt(hectares, 2)} ${haUnit}`, acres: `${fmt(acres, 2)} ${acUnit}`, m2: `${fmt(m2, 0)} ${m2Unit}`, km2: `${fmt(km2)} ${km2Unit}`, varas2: `${fmt(varas2, 0)} ${v2Unit}`, ...refs },
    summary, isValid: true, metadata: { tableData },
  };
}

export default manzanasToHectareasConfig;
