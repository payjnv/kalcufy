import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";

// Vara castellana standard: 0.8359 m (most common in Central America)
// Varies by country but 0.8359m is the international reference
const VARA_TO_M = 0.8359;

export const varasToMetrosConfig: CalculatorConfigV4 = {
  id: "varas-to-metros",
  version: "4.0",
  category: "conversion",
  icon: "📐",
  presets: [
    { id: "oneVara", icon: "📏", values: { varaValue: 1 } },
    { id: "lotFrontage", icon: "🏠", values: { varaValue: 12 } },
    { id: "manzanaSide", icon: "🌾", values: { varaValue: 100 } },
    { id: "roadDistance", icon: "🛤️", values: { varaValue: 500 } },
  ],
  t: {
    en: {
      name: "Varas to Meters Converter", slug: "varas-to-meters-converter",
      subtitle: "Convert varas to meters, feet, and inches — the traditional Latin American unit of length.",
      breadcrumb: "Varas to Meters",
      seo: {
        title: "Varas to Meters Converter - Latin American Length Unit",
        description: "Convert varas to meters instantly. The vara is a traditional unit of length used across Latin America. 1 vara = 0.8359 meters. Free online converter.",
        shortDescription: "Convert varas to meters, feet, and inches.",
        keywords: ["vara to meters", "vara converter", "vara a metros", "cuanto mide una vara", "vara to feet", "convert vara", "vara castellana", "vara measurement"],
      },
      calculator: { yourInformation: "Enter Value" },
      ui: { yourInformation: "Enter Value", calculate: "Convert", reset: "Reset", results: "Results" },
      inputs: { varaValue: { label: "Varas", helpText: "Enter the number of varas to convert (standard vara = 0.8359m)" } },
      results: { meters: { label: "Meters" }, cm: { label: "Centimeters" }, feet: { label: "Feet" }, inches: { label: "Inches" }, yards: { label: "Yards" } },
      presets: {
        oneVara: { label: "1 Vara", description: "0.8359 m" },
        lotFrontage: { label: "12 Varas", description: "Typical lot frontage" },
        manzanaSide: { label: "100 Varas", description: "Side of 1 manzana" },
        roadDistance: { label: "500 Varas", description: "Road distance" },
      },
      values: { m: "m", cm: "cm", ft: "ft", in: "in", yd: "yd" },
      formats: { summary: "{varaValue} varas = {meters} meters" },
      infoCards: {
        quickConversions: {
          title: "Quick Reference",
          items: [
            { label: "1 vara", valueKey: "ref1" }, { label: "5 varas", valueKey: "ref5" },
            { label: "10 varas", valueKey: "ref10" }, { label: "50 varas", valueKey: "ref50" },
            { label: "100 varas", valueKey: "ref100" }, { label: "1,000 varas", valueKey: "ref1000" },
          ],
        },
        tips: {
          title: "Conversion Tips",
          items: [
            "1 vara ≈ 0.836 meters — slightly shorter than 1 yard (0.914m)",
            "100 varas × 100 varas = 1 manzana (10,000 varas² = 6,987 m²)",
            "The vara is close to 33 inches or 2 feet 9 inches",
            "Vara sizes vary by country: 0.8359m (standard), 0.8 (Colombia), 0.84m (some regions)",
          ],
        },
      },
      education: {
        howToConvert: { title: "How to Convert Varas to Meters", content: "To convert varas to meters, multiply the number of varas by 0.8359. The vara castellana is a pre-metric Spanish unit of length that was brought to the Americas during colonization. One vara was originally defined as three pies castellanos (Castilian feet). The standard value of 0.8359 meters is the most widely accepted conversion, though the exact length varied slightly by region. In practice, the vara is about 83.6 centimeters, making it slightly shorter than an English yard. The vara remains important for understanding historical land measurements, property boundaries, and traditional unit systems still in use across Latin America." },
        commonUses: { title: "Where the Vara Is Used Today", content: "The vara survives in several Latin American countries, primarily in land measurement. In Central America (El Salvador, Honduras, Guatemala, Nicaragua), land areas are still measured in square varas — 10,000 square varas make one manzana, the standard unit for agricultural land. Property boundaries in old land titles and escrituras are often described in varas. Surveyors in rural areas may still encounter vara-based measurements when reviewing historical property documents. In some Mexican states, particularly in rural areas, the vara remains in colloquial use for describing distances and property dimensions. Texas and parts of the US Southwest also have historical property records in varas from the Spanish colonial period." },
        examples: {
          title: "Conversion Examples", description: "Step-by-step vara conversions",
          examples: [
            { title: "Convert 25 varas to meters (lot depth)", steps: ["Formula: meters = varas × 0.8359", "25 × 0.8359 = 20.8975", "25 varas ≈ 20.9 meters"], result: "25 varas = 20.9 m" },
            { title: "Convert 100 varas to feet (manzana side)", steps: ["First to meters: 100 × 0.8359 = 83.59 m", "Then to feet: 83.59 × 3.28084 = 274.2 ft", "100 varas ≈ 274 feet"], result: "100 varas = 274.2 ft" },
          ],
        },
      },
      faqs: [
        { question: "How long is 1 vara in meters?", answer: "1 vara (castellana standard) = 0.8359 meters, or about 83.6 centimeters." },
        { question: "How does the vara compare to a yard?", answer: "A vara (0.8359m) is about 8.5% shorter than a yard (0.9144m). A vara is approximately 33 inches vs. 36 inches for a yard." },
        { question: "Is the vara the same in all countries?", answer: "No, the vara varies slightly. Standard castellana: 0.8359m. Colombia: 0.80m. Some Texas/Mexican historical records: 0.8467m. This converter uses the 0.8359m standard." },
        { question: "What is a vara cuadrada?", answer: "A vara cuadrada (square vara) is the area of a square with sides of 1 vara. It equals 0.8359² = 0.6987 m². 10,000 varas cuadradas = 1 manzana." },
        { question: "Where is the vara still used today?", answer: "The vara survives in land measurement in Central America (El Salvador, Honduras, Guatemala, Nicaragua), parts of Mexico, Colombia, and in historical property records in Texas and the US Southwest." },
        { question: "How many varas in 1 meter?", answer: "1 meter = 1.1963 varas (1 ÷ 0.8359 = 1.1963)." },
      ],
      rating: { title: "Rate this Converter", share: "Share", copied: "Copied!", copyLink: "Copy Link", clickToRate: "Click to rate", youRated: "You rated", stars: "stars", averageFrom: "average from", ratings: "ratings" },
      common: { home: "Home", calculators: "Calculators" },
      buttons: { calculate: "Convert", reset: "Reset", pdf: "PDF", csv: "CSV", excel: "Excel", save: "Save", saved: "Saved", saving: "Saving..." },
      share: { calculatedWith: "Converted with Kalcufy.com" },
      accessibility: { mobileResults: "Results", closeModal: "Close", openMenu: "Menu" },
      sources: { title: "Sources & References" },
      detailedTable: { conversionTable: { button: "View Full Conversion Table", title: "Varas to Meters Conversion Table", columns: { varas: "Varas", meters: "Meters", feet: "Feet", inches: "Inches" } } },
    },
    es: {
      "name": "Convertidor de Varas a Metros",
      "slug": "calculadora-convertidor-varas-metros",
      "subtitle": "Convierte varas a metros, pies y pulgadas — la unidad tradicional latinoamericana de longitud.",
      "breadcrumb": "Varas a Metros",
      "seo": {
        "title": "Convertidor de Varas a Metros - Unidad de Longitud Latinoamericana",
        "description": "Convierte varas a metros al instante. La vara es una unidad tradicional de longitud usada en Latinoamérica. 1 vara = 0.8359 metros. Convertidor gratuito en línea.",
        "shortDescription": "Convierte varas a metros, pies y pulgadas.",
        "keywords": [
          "vara a metros",
          "convertidor de varas",
          "vara castellana",
          "cuanto mide una vara",
          "vara a pies",
          "convertir vara",
          "medida vara",
          "vara medición"
        ]
      },
      "calculator": {
        "yourInformation": "Tu Información"
      },
      "inputs": {
        "varaValue": {
          "label": "Varas",
          "helpText": "Ingresa el número de varas a convertir (vara estándar = 0.8359m)"
        }
      },
      "results": {
        "meters": {
          "label": "Metros"
        },
        "cm": {
          "label": "Centímetros"
        },
        "feet": {
          "label": "Pies"
        },
        "inches": {
          "label": "Pulgadas"
        },
        "yards": {
          "label": "Yardas"
        }
      },
      "presets": {
        "oneVara": {
          "label": "1 Vara",
          "description": "0.8359 m"
        },
        "lotFrontage": {
          "label": "12 Varas",
          "description": "Frente típico de lote"
        },
        "manzanaSide": {
          "label": "100 Varas",
          "description": "Lado de 1 manzana"
        },
        "roadDistance": {
          "label": "500 Varas",
          "description": "Distancia de camino"
        }
      },
      "values": {
        "m": "m",
        "cm": "cm",
        "ft": "pies",
        "in": "pulg",
        "yd": "yd"
      },
      "formats": {
        "summary": "{varaValue} varas = {meters} metros"
      },
      "infoCards": {
        "quickConversions": {
          "title": "Referencia Rápida",
          "items": [
            {
              "label": "1 vara",
              "valueKey": "ref1"
            },
            {
              "label": "5 varas",
              "valueKey": "ref5"
            },
            {
              "label": "10 varas",
              "valueKey": "ref10"
            },
            {
              "label": "50 varas",
              "valueKey": "ref50"
            },
            {
              "label": "100 varas",
              "valueKey": "ref100"
            },
            {
              "label": "1,000 varas",
              "valueKey": "ref1000"
            }
          ]
        },
        "tips": {
          "title": "Consejos de Conversión",
          "items": [
            "1 vara ≈ 0.836 metros — ligeramente más corta que 1 yarda (0.914m)",
            "100 varas × 100 varas = 1 manzana (10,000 varas² = 6,987 m²)",
            "La vara equivale aproximadamente a 33 pulgadas o 2 pies 9 pulgadas",
            "Los tamaños de vara varían por país: 0.8359m (estándar), 0.8 (Colombia), 0.84m (algunas regiones)"
          ]
        }
      },
      "education": {
        "howToConvert": {
          "title": "Cómo Convertir Varas a Metros",
          "content": "Para convertir varas a metros, multiplica el número de varas por 0.8359. La vara castellana es una unidad española pre-métrica de longitud que fue traída a América durante la colonización. Una vara se definía originalmente como tres pies castellanos. El valor estándar de 0.8359 metros es la conversión más ampliamente aceptada, aunque la longitud exacta variaba ligeramente por región. En la práctica, la vara mide unos 83.6 centímetros, siendo ligeramente más corta que una yarda inglesa. La vara sigue siendo importante para entender medidas históricas de tierra, límites de propiedad y sistemas de unidades tradicionales aún en uso en Latinoamérica."
        },
        "commonUses": {
          "title": "Dónde se Usa la Vara Hoy",
          "content": "La vara sobrevive en varios países latinoamericanos, principalmente en medición de tierras. En Centroamérica (El Salvador, Honduras, Guatemala, Nicaragua), las áreas de tierra aún se miden en varas cuadradas — 10,000 varas cuadradas hacen una manzana, la unidad estándar para tierra agrícola. Los límites de propiedad en títulos de tierra antiguos y escrituras a menudo se describen en varas. Los topógrafos en áreas rurales pueden aún encontrar medidas basadas en varas al revisar documentos históricos de propiedad. En algunos estados mexicanos, particularmente en áreas rurales, la vara permanece en uso coloquial para describir distancias y dimensiones de propiedades. Texas y partes del suroeste de EE.UU. también tienen registros históricos de propiedad en varas del período colonial español."
        },
        "examples": {
          "title": "Ejemplos de Conversión",
          "description": "Conversiones de varas paso a paso",
          "examples": [
            {
              "title": "Convertir 25 varas a metros (profundidad de lote)",
              "steps": [
                "Fórmula: metros = varas × 0.8359",
                "25 × 0.8359 = 20.8975",
                "25 varas ≈ 20.9 metros"
              ],
              "result": "25 varas = 20.9 m"
            },
            {
              "title": "Convertir 100 varas a pies (lado de manzana)",
              "steps": [
                "Primero a metros: 100 × 0.8359 = 83.59 m",
                "Luego a pies: 83.59 × 3.28084 = 274.2 pies",
                "100 varas ≈ 274 pies"
              ],
              "result": "100 varas = 274.2 pies"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "¿Cuánto mide 1 vara en metros?",
          "answer": "1 vara (castellana estándar) = 0.8359 metros, o aproximadamente 83.6 centímetros."
        },
        {
          "question": "¿Cómo se compara la vara con una yarda?",
          "answer": "Una vara (0.8359m) es aproximadamente 8.5% más corta que una yarda (0.9144m). Una vara es aproximadamente 33 pulgadas vs. 36 pulgadas para una yarda."
        },
        {
          "question": "¿Es la vara igual en todos los países?",
          "answer": "No, la vara varía ligeramente. Castellana estándar: 0.8359m. Colombia: 0.80m. Algunos registros históricos de Texas/México: 0.8467m. Este convertidor usa el estándar de 0.8359m."
        },
        {
          "question": "¿Qué es una vara cuadrada?",
          "answer": "Una vara cuadrada es el área de un cuadrado con lados de 1 vara. Equivale a 0.8359² = 0.6987 m². 10,000 varas cuadradas = 1 manzana."
        },
        {
          "question": "¿Dónde se usa todavía la vara hoy?",
          "answer": "La vara sobrevive en medición de tierras en Centroamérica (El Salvador, Honduras, Guatemala, Nicaragua), partes de México, Colombia, y en registros históricos de propiedad en Texas y el suroeste de EE.UU."
        },
        {
          "question": "¿Cuántas varas hay en 1 metro?",
          "answer": "1 metro = 1.1963 varas (1 ÷ 0.8359 = 1.1963)."
        }
      ],
      "detailedTable": {
        "conversionTable": {
          "button": "Ver Tabla de Conversión Completa",
          "title": "Tabla de Conversión de Varas a Metros",
          "columns": {
            "varas": "Varas",
            "meters": "Metros",
            "feet": "Pies",
            "inches": "Pulgadas"
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
      "name": "Conversor de Varas para Metros",
      "slug": "calculadora-conversor-varas-metros",
      "subtitle": "Converta varas para metros, pés e polegadas — a unidade tradicional de comprimento latino-americana.",
      "breadcrumb": "Varas para Metros",
      "seo": {
        "title": "Conversor de Varas para Metros - Unidade de Comprimento Latino-Americana",
        "description": "Converta varas para metros instantaneamente. A vara é uma unidade tradicional de comprimento usada em toda a América Latina. 1 vara = 0,8359 metros. Conversor online gratuito.",
        "shortDescription": "Converta varas para metros, pés e polegadas.",
        "keywords": [
          "vara para metros",
          "conversor vara",
          "vara a metros",
          "quanto mede uma vara",
          "vara para pés",
          "converter vara",
          "vara castellana",
          "medida vara"
        ]
      },
      "calculator": {
        "yourInformation": "Suas Informações"
      },
      "inputs": {
        "varaValue": {
          "label": "Varas",
          "helpText": "Digite o número de varas para converter (vara padrão = 0,8359m)"
        }
      },
      "results": {
        "meters": {
          "label": "Metros"
        },
        "cm": {
          "label": "Centímetros"
        },
        "feet": {
          "label": "Pés"
        },
        "inches": {
          "label": "Polegadas"
        },
        "yards": {
          "label": "Jardas"
        }
      },
      "presets": {
        "oneVara": {
          "label": "1 Vara",
          "description": "0,8359 m"
        },
        "lotFrontage": {
          "label": "12 Varas",
          "description": "Frente típica de lote"
        },
        "manzanaSide": {
          "label": "100 Varas",
          "description": "Lado de 1 manzana"
        },
        "roadDistance": {
          "label": "500 Varas",
          "description": "Distância rodoviária"
        }
      },
      "values": {
        "m": "m",
        "cm": "cm",
        "ft": "pés",
        "in": "pol",
        "yd": "jardas"
      },
      "formats": {
        "summary": "{varaValue} varas = {meters} metros"
      },
      "infoCards": {
        "quickConversions": {
          "title": "Referência Rápida",
          "items": [
            {
              "label": "1 vara",
              "valueKey": "ref1"
            },
            {
              "label": "5 varas",
              "valueKey": "ref5"
            },
            {
              "label": "10 varas",
              "valueKey": "ref10"
            },
            {
              "label": "50 varas",
              "valueKey": "ref50"
            },
            {
              "label": "100 varas",
              "valueKey": "ref100"
            },
            {
              "label": "1.000 varas",
              "valueKey": "ref1000"
            }
          ]
        },
        "tips": {
          "title": "Dicas de Conversão",
          "items": [
            "1 vara ≈ 0,836 metros — ligeiramente menor que 1 jarda (0,914m)",
            "100 varas × 100 varas = 1 manzana (10.000 varas² = 6.987 m²)",
            "A vara equivale a cerca de 33 polegadas ou 2 pés e 9 polegadas",
            "O tamanho da vara varia por país: 0,8359m (padrão), 0,8m (Colômbia), 0,84m (algumas regiões)"
          ]
        }
      },
      "education": {
        "howToConvert": {
          "title": "Como Converter Varas para Metros",
          "content": "Para converter varas para metros, multiplique o número de varas por 0,8359. A vara castellana é uma unidade pré-métrica espanhola de comprimento que foi trazida para as Américas durante a colonização. Uma vara foi originalmente definida como três pés castellanos. O valor padrão de 0,8359 metros é a conversão mais amplamente aceita, embora o comprimento exato variasse ligeiramente por região. Na prática, a vara mede cerca de 83,6 centímetros, tornando-se ligeiramente menor que uma jarda inglesa. A vara permanece importante para entender medidas históricas de terra, limites de propriedade e sistemas de unidades tradicionais ainda em uso em toda a América Latina."
        },
        "commonUses": {
          "title": "Onde a Vara é Usada Hoje",
          "content": "A vara sobrevive em vários países latino-americanos, principalmente na medição de terras. Na América Central (El Salvador, Honduras, Guatemala, Nicarágua), áreas de terra ainda são medidas em varas quadradas — 10.000 varas quadradas fazem uma manzana, a unidade padrão para terras agrícolas. Limites de propriedade em títulos de terra antigos e escrituras são frequentemente descritos em varas. Agrimensores em áreas rurais ainda podem encontrar medidas baseadas em varas ao revisar documentos históricos de propriedades. Em alguns estados mexicanos, particularmente em áreas rurais, a vara permanece em uso coloquial para descrever distâncias e dimensões de propriedade. Texas e partes do sudoeste dos EUA também têm registros históricos de propriedades em varas do período colonial espanhol."
        },
        "examples": {
          "title": "Exemplos de Conversão",
          "description": "Conversões de vara passo a passo",
          "examples": [
            {
              "title": "Converter 25 varas para metros (profundidade do lote)",
              "steps": [
                "Fórmula: metros = varas × 0,8359",
                "25 × 0,8359 = 20,8975",
                "25 varas ≈ 20,9 metros"
              ],
              "result": "25 varas = 20,9 m"
            },
            {
              "title": "Converter 100 varas para pés (lado da manzana)",
              "steps": [
                "Primeiro para metros: 100 × 0,8359 = 83,59 m",
                "Depois para pés: 83,59 × 3,28084 = 274,2 pés",
                "100 varas ≈ 274 pés"
              ],
              "result": "100 varas = 274,2 pés"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Quanto mede 1 vara em metros?",
          "answer": "1 vara (padrão castellana) = 0,8359 metros, ou cerca de 83,6 centímetros."
        },
        {
          "question": "Como a vara se compara a uma jarda?",
          "answer": "Uma vara (0,8359m) é cerca de 8,5% menor que uma jarda (0,9144m). Uma vara equivale a aproximadamente 33 polegadas vs. 36 polegadas para uma jarda."
        },
        {
          "question": "A vara é igual em todos os países?",
          "answer": "Não, a vara varia ligeiramente. Castellana padrão: 0,8359m. Colômbia: 0,80m. Alguns registros históricos do Texas/México: 0,8467m. Este conversor usa o padrão de 0,8359m."
        },
        {
          "question": "O que é uma vara cuadrada?",
          "answer": "Uma vara cuadrada (vara quadrada) é a área de um quadrado com lados de 1 vara. Equivale a 0,8359² = 0,6987 m². 10.000 varas cuadradas = 1 manzana."
        },
        {
          "question": "Onde a vara ainda é usada hoje?",
          "answer": "A vara sobrevive na medição de terras na América Central (El Salvador, Honduras, Guatemala, Nicarágua), partes do México, Colômbia, e em registros históricos de propriedades no Texas e sudoeste dos EUA."
        },
        {
          "question": "Quantas varas há em 1 metro?",
          "answer": "1 metro = 1,1963 varas (1 ÷ 0,8359 = 1,1963)."
        }
      ],
      "detailedTable": {
        "conversionTable": {
          "button": "Ver Tabela de Conversão Completa",
          "title": "Tabela de Conversão de Varas para Metros",
          "columns": {
            "varas": "Varas",
            "meters": "Metros",
            "feet": "Pés",
            "inches": "Polegadas"
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
      "name": "Convertisseur Varas vers Mètres",
      "slug": "calculateur-convertisseur-varas-metres",
      "subtitle": "Convertissez les varas en mètres, pieds et pouces — l'unité de longueur traditionnelle d'Amérique latine.",
      "breadcrumb": "Varas vers Mètres",
      "seo": {
        "title": "Convertisseur Varas vers Mètres - Unité de Longueur Latino-Américaine",
        "description": "Convertissez instantanément les varas en mètres. La vara est une unité de longueur traditionnelle utilisée en Amérique latine. 1 vara = 0,8359 mètres. Convertisseur gratuit en ligne.",
        "shortDescription": "Convertissez les varas en mètres, pieds et pouces.",
        "keywords": [
          "vara vers mètres",
          "convertisseur vara",
          "vara a metros",
          "cuanto mide una vara",
          "vara vers pieds",
          "convertir vara",
          "vara castellana",
          "mesure vara"
        ]
      },
      "calculator": {
        "yourInformation": "Vos Informations"
      },
      "inputs": {
        "varaValue": {
          "label": "Varas",
          "helpText": "Saisissez le nombre de varas à convertir (vara standard = 0,8359m)"
        }
      },
      "results": {
        "meters": {
          "label": "Mètres"
        },
        "cm": {
          "label": "Centimètres"
        },
        "feet": {
          "label": "Pieds"
        },
        "inches": {
          "label": "Pouces"
        },
        "yards": {
          "label": "Yards"
        }
      },
      "presets": {
        "oneVara": {
          "label": "1 Vara",
          "description": "0,8359 m"
        },
        "lotFrontage": {
          "label": "12 Varas",
          "description": "Façade de lot typique"
        },
        "manzanaSide": {
          "label": "100 Varas",
          "description": "Côté d'une manzana"
        },
        "roadDistance": {
          "label": "500 Varas",
          "description": "Distance routière"
        }
      },
      "values": {
        "m": "m",
        "cm": "cm",
        "ft": "pi",
        "in": "po",
        "yd": "yd"
      },
      "formats": {
        "summary": "{varaValue} varas = {meters} mètres"
      },
      "infoCards": {
        "quickConversions": {
          "title": "Référence Rapide",
          "items": [
            {
              "label": "1 vara",
              "valueKey": "ref1"
            },
            {
              "label": "5 varas",
              "valueKey": "ref5"
            },
            {
              "label": "10 varas",
              "valueKey": "ref10"
            },
            {
              "label": "50 varas",
              "valueKey": "ref50"
            },
            {
              "label": "100 varas",
              "valueKey": "ref100"
            },
            {
              "label": "1 000 varas",
              "valueKey": "ref1000"
            }
          ]
        },
        "tips": {
          "title": "Conseils de Conversion",
          "items": [
            "1 vara ≈ 0,836 mètres — légèrement plus courte qu'1 yard (0,914m)",
            "100 varas × 100 varas = 1 manzana (10 000 varas² = 6 987 m²)",
            "La vara fait environ 33 pouces ou 2 pieds 9 pouces",
            "Les tailles de vara varient par pays : 0,8359m (standard), 0,8 (Colombie), 0,84m (certaines régions)"
          ]
        }
      },
      "education": {
        "howToConvert": {
          "title": "Comment Convertir les Varas en Mètres",
          "content": "Pour convertir les varas en mètres, multipliez le nombre de varas par 0,8359. La vara castellana est une unité de longueur espagnole pré-métrique qui fut apportée aux Amériques durant la colonisation. Une vara était originellement définie comme trois pies castellanos (pieds castillans). La valeur standard de 0,8359 mètres est la conversion la plus largement acceptée, bien que la longueur exacte varie légèrement selon la région. En pratique, la vara fait environ 83,6 centimètres, ce qui la rend légèrement plus courte qu'un yard anglais. La vara reste importante pour comprendre les mesures historiques de terres, les limites de propriété et les systèmes d'unités traditionnels encore utilisés en Amérique latine."
        },
        "commonUses": {
          "title": "Où la Vara est Utilisée Aujourd'hui",
          "content": "La vara survit dans plusieurs pays d'Amérique latine, principalement dans la mesure de terres. En Amérique centrale (El Salvador, Honduras, Guatemala, Nicaragua), les surfaces de terres sont encore mesurées en varas carrées — 10 000 varas carrées forment une manzana, l'unité standard pour les terres agricoles. Les limites de propriété dans les anciens titres de propriété et escrituras sont souvent décrites en varas. Les arpenteurs en zones rurales peuvent encore rencontrer des mesures basées sur la vara lors de la révision de documents de propriété historiques. Dans certains États mexicains, particulièrement en zones rurales, la vara reste d'usage familier pour décrire les distances et dimensions de propriété. Le Texas et certaines parties du sud-ouest des États-Unis ont également des registres de propriété historiques en varas de la période coloniale espagnole."
        },
        "examples": {
          "title": "Exemples de Conversion",
          "description": "Conversions de varas étape par étape",
          "examples": [
            {
              "title": "Convertir 25 varas en mètres (profondeur de lot)",
              "steps": [
                "Formule : mètres = varas × 0,8359",
                "25 × 0,8359 = 20,8975",
                "25 varas ≈ 20,9 mètres"
              ],
              "result": "25 varas = 20,9 m"
            },
            {
              "title": "Convertir 100 varas en pieds (côté de manzana)",
              "steps": [
                "D'abord en mètres : 100 × 0,8359 = 83,59 m",
                "Puis en pieds : 83,59 × 3,28084 = 274,2 pi",
                "100 varas ≈ 274 pieds"
              ],
              "result": "100 varas = 274,2 pi"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Quelle est la longueur d'1 vara en mètres ?",
          "answer": "1 vara (standard castellana) = 0,8359 mètres, soit environ 83,6 centimètres."
        },
        {
          "question": "Comment la vara se compare-t-elle au yard ?",
          "answer": "Une vara (0,8359m) est environ 8,5% plus courte qu'un yard (0,9144m). Une vara fait approximativement 33 pouces contre 36 pouces pour un yard."
        },
        {
          "question": "La vara est-elle identique dans tous les pays ?",
          "answer": "Non, la vara varie légèrement. Standard castellana : 0,8359m. Colombie : 0,80m. Certains registres historiques Texas/Mexique : 0,8467m. Ce convertisseur utilise le standard 0,8359m."
        },
        {
          "question": "Qu'est-ce qu'une vara cuadrada ?",
          "answer": "Une vara cuadrada (vara carrée) est la surface d'un carré avec des côtés d'1 vara. Elle équivaut à 0,8359² = 0,6987 m². 10 000 varas cuadradas = 1 manzana."
        },
        {
          "question": "Où la vara est-elle encore utilisée aujourd'hui ?",
          "answer": "La vara survit dans la mesure de terres en Amérique centrale (El Salvador, Honduras, Guatemala, Nicaragua), certaines parties du Mexique, en Colombie, et dans les registres de propriété historiques au Texas et sud-ouest des États-Unis."
        },
        {
          "question": "Combien de varas dans 1 mètre ?",
          "answer": "1 mètre = 1,1963 varas (1 ÷ 0,8359 = 1,1963)."
        }
      ],
      "detailedTable": {
        "conversionTable": {
          "button": "Voir le Tableau de Conversion Complet",
          "title": "Tableau de Conversion Varas vers Mètres",
          "columns": {
            "varas": "Varas",
            "meters": "Mètres",
            "feet": "Pieds",
            "inches": "Pouces"
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
      "name": "Varas zu Meter Umrechner",
      "slug": "varas-zu-meter-umrechner-rechner",
      "subtitle": "Varas in Meter, Fuß und Zoll umrechnen — die traditionelle lateinamerikanische Längeneinheit.",
      "breadcrumb": "Varas zu Meter",
      "seo": {
        "title": "Varas zu Meter Umrechner - Lateinamerikanische Längeneinheit",
        "description": "Varas sofort in Meter umrechnen. Die Vara ist eine traditionelle Längeneinheit aus Lateinamerika. 1 Vara = 0,8359 Meter. Kostenloser Online-Umrechner.",
        "shortDescription": "Varas in Meter, Fuß und Zoll umrechnen.",
        "keywords": [
          "vara zu meter",
          "vara umrechner",
          "vara a metros",
          "cuanto mide una vara",
          "vara zu fuß",
          "vara umrechnen",
          "vara castellana",
          "vara messung"
        ]
      },
      "calculator": {
        "yourInformation": "Ihre Informationen"
      },
      "inputs": {
        "varaValue": {
          "label": "Varas",
          "helpText": "Anzahl der Varas eingeben (Standard-Vara = 0,8359m)"
        }
      },
      "results": {
        "meters": {
          "label": "Meter"
        },
        "cm": {
          "label": "Zentimeter"
        },
        "feet": {
          "label": "Fuß"
        },
        "inches": {
          "label": "Zoll"
        },
        "yards": {
          "label": "Yards"
        }
      },
      "presets": {
        "oneVara": {
          "label": "1 Vara",
          "description": "0,8359 m"
        },
        "lotFrontage": {
          "label": "12 Varas",
          "description": "Typische Grundstücksbreite"
        },
        "manzanaSide": {
          "label": "100 Varas",
          "description": "Seite einer Manzana"
        },
        "roadDistance": {
          "label": "500 Varas",
          "description": "Straßenentfernung"
        }
      },
      "values": {
        "m": "m",
        "cm": "cm",
        "ft": "ft",
        "in": "in",
        "yd": "yd"
      },
      "formats": {
        "summary": "{varaValue} Varas = {meters} Meter"
      },
      "infoCards": {
        "quickConversions": {
          "title": "Schnellreferenz",
          "items": [
            {
              "label": "1 vara",
              "valueKey": "ref1"
            },
            {
              "label": "5 varas",
              "valueKey": "ref5"
            },
            {
              "label": "10 varas",
              "valueKey": "ref10"
            },
            {
              "label": "50 varas",
              "valueKey": "ref50"
            },
            {
              "label": "100 varas",
              "valueKey": "ref100"
            },
            {
              "label": "1.000 varas",
              "valueKey": "ref1000"
            }
          ]
        },
        "tips": {
          "title": "Umrechnungstipps",
          "items": [
            "1 Vara ≈ 0,836 Meter — etwas kürzer als 1 Yard (0,914m)",
            "100 Varas × 100 Varas = 1 Manzana (10.000 Varas² = 6.987 m²)",
            "Die Vara entspricht etwa 33 Zoll oder 2 Fuß 9 Zoll",
            "Vara-Größen variieren je Land: 0,8359m (Standard), 0,8 (Kolumbien), 0,84m (einige Regionen)"
          ]
        }
      },
      "education": {
        "howToConvert": {
          "title": "Wie man Varas in Meter umrechnet",
          "content": "Um Varas in Meter umzurechnen, multiplizieren Sie die Anzahl der Varas mit 0,8359. Die Vara Castellana ist eine vor-metrische spanische Längeneinheit, die während der Kolonialisierung nach Amerika gebracht wurde. Eine Vara war ursprünglich als drei Pies Castellanos (kastilische Fuß) definiert. Der Standardwert von 0,8359 Meter ist die am weitesten akzeptierte Umrechnung, obwohl die genaue Länge je nach Region leicht variierte. In der Praxis ist die Vara etwa 83,6 Zentimeter lang und damit etwas kürzer als ein englischer Yard. Die Vara bleibt wichtig für das Verständnis historischer Landvermessungen, Grundstücksgrenzen und traditioneller Maßsysteme, die in ganz Lateinamerika noch verwendet werden."
        },
        "commonUses": {
          "title": "Wo die Vara heute verwendet wird",
          "content": "Die Vara überlebt in mehreren lateinamerikanischen Ländern, hauptsächlich bei Landvermessungen. In Zentralamerika (El Salvador, Honduras, Guatemala, Nicaragua) werden Landflächen immer noch in Quadrat-Varas gemessen — 10.000 Quadrat-Varas ergeben eine Manzana, die Standardeinheit für landwirtschaftliche Flächen. Grundstücksgrenzen in alten Grundbüchern und Escrituras werden oft in Varas beschrieben. Vermesser in ländlichen Gebieten können bei der Überprüfung historischer Grundstücksdokumente immer noch auf Vara-basierte Messungen stoßen. In einigen mexikanischen Bundesstaaten, besonders in ländlichen Gebieten, bleibt die Vara im umgangssprachlichen Gebrauch zur Beschreibung von Entfernungen und Grundstücksmaßen. Texas und Teile des US-Südwestens haben auch historische Grundstücksaufzeichnungen in Varas aus der spanischen Kolonialzeit."
        },
        "examples": {
          "title": "Umrechnungsbeispiele",
          "description": "Schritt-für-Schritt Vara-Umrechnungen",
          "examples": [
            {
              "title": "25 Varas in Meter umrechnen (Grundstückstiefe)",
              "steps": [
                "Formel: Meter = Varas × 0,8359",
                "25 × 0,8359 = 20,8975",
                "25 Varas ≈ 20,9 Meter"
              ],
              "result": "25 Varas = 20,9 m"
            },
            {
              "title": "100 Varas in Fuß umrechnen (Manzana-Seite)",
              "steps": [
                "Zuerst in Meter: 100 × 0,8359 = 83,59 m",
                "Dann in Fuß: 83,59 × 3,28084 = 274,2 ft",
                "100 Varas ≈ 274 Fuß"
              ],
              "result": "100 Varas = 274,2 ft"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Wie lang ist 1 Vara in Metern?",
          "answer": "1 Vara (Castellana Standard) = 0,8359 Meter oder etwa 83,6 Zentimeter."
        },
        {
          "question": "Wie vergleicht sich die Vara mit einem Yard?",
          "answer": "Eine Vara (0,8359m) ist etwa 8,5% kürzer als ein Yard (0,9144m). Eine Vara entspricht etwa 33 Zoll gegenüber 36 Zoll für einen Yard."
        },
        {
          "question": "Ist die Vara in allen Ländern gleich?",
          "answer": "Nein, die Vara variiert leicht. Standard Castellana: 0,8359m. Kolumbien: 0,80m. Einige historische Aufzeichnungen aus Texas/Mexiko: 0,8467m. Dieser Umrechner verwendet den 0,8359m Standard."
        },
        {
          "question": "Was ist eine Vara Cuadrada?",
          "answer": "Eine Vara Cuadrada (Quadrat-Vara) ist die Fläche eines Quadrats mit Seiten von 1 Vara. Sie entspricht 0,8359² = 0,6987 m². 10.000 Varas Cuadradas = 1 Manzana."
        },
        {
          "question": "Wo wird die Vara heute noch verwendet?",
          "answer": "Die Vara überlebt in der Landvermessung in Zentralamerika (El Salvador, Honduras, Guatemala, Nicaragua), Teilen Mexikos, Kolumbien und in historischen Grundstücksaufzeichnungen in Texas und dem US-Südwesten."
        },
        {
          "question": "Wie viele Varas sind 1 Meter?",
          "answer": "1 Meter = 1,1963 Varas (1 ÷ 0,8359 = 1,1963)."
        }
      ],
      "detailedTable": {
        "conversionTable": {
          "button": "Vollständige Umrechnungstabelle anzeigen",
          "title": "Varas zu Meter Umrechnungstabelle",
          "columns": {
            "varas": "Varas",
            "meters": "Meter",
            "feet": "Fuß",
            "inches": "Zoll"
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
  inputs: [{ id: "varaValue", type: "number", defaultValue: null, placeholder: "10", min: 0.001, max: 100000000, step: 0.1, suffix: "varas" }],
  inputGroups: [],
  results: [
    { id: "meters", type: "primary", format: "number" },
    { id: "cm", type: "secondary", format: "number" },
    { id: "feet", type: "secondary", format: "number" },
    { id: "inches", type: "secondary", format: "number" },
    { id: "yards", type: "secondary", format: "number" },
  ],
  infoCards: [ { id: "quickConversions", type: "list", icon: "📋", itemCount: 6 }, { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 } ],
  detailedTable: {
    id: "conversionTable", buttonLabel: "View Full Conversion Table", buttonIcon: "📊", modalTitle: "Varas to Meters Conversion Table",
    columns: [ { id: "varas", label: "Varas", align: "center" }, { id: "meters", label: "Meters", align: "right", highlight: true }, { id: "feet", label: "Feet", align: "right" }, { id: "inches", label: "Inches", align: "right" } ],
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
  relatedCalculators: ["manzanas-to-hectareas", "fanegadas-to-hectareas", "tareas-to-metros-cuadrados", "cuadras-to-hectareas"],
  ads: { sidebar: true, footer: true },
};

export function calculateVarasToMetros(data: { values: Record<string, unknown>; fieldUnits?: Record<string, string>; t?: Record<string, unknown> }): CalculatorResults {
  const { values, t } = data;
  const v = (t?.values as Record<string, string>) || {};
  const f = (t?.formats as Record<string, string>) || {};
  const varaValue = values.varaValue as number | null;
  if (varaValue === null || varaValue === undefined || varaValue <= 0) return { values: {}, formatted: {}, summary: "", isValid: false };

  const meters = varaValue * VARA_TO_M;
  const cm = meters * 100;
  const feet = meters * 3.28084;
  const inches = meters * 39.3701;
  const yards = meters * 1.09361;

  const mUnit = v["m"] || "m"; const cmUnit = v["cm"] || "cm"; const ftUnit = v["ft"] || "ft"; const inUnit = v["in"] || "in"; const ydUnit = v["yd"] || "yd";
  const fmt = (n: number, d: number = 4) => n >= 1000 ? n.toLocaleString("en-US", { maximumFractionDigits: 2 }) : n.toFixed(d).replace(/0+$/, "").replace(/\.$/, "");

  const refVaras = [1, 5, 10, 50, 100, 1000];
  const refs: Record<string, string> = {};
  refVaras.forEach((va) => { refs[`ref${va}`] = `${fmt(va * VARA_TO_M, 2)} ${mUnit}`; });

  const commonValues = [1, 2, 3, 5, 10, 12, 15, 20, 25, 50, 75, 100, 200, 500, 1000, varaValue];
  const uniqueVals = [...new Set(commonValues.map((v) => Math.round(v * 1000) / 1000))].sort((a, b) => a - b);
  const tableData = uniqueVals.map((va) => {
    const m = va * VARA_TO_M;
    return { varas: `${va}`, meters: fmt(m, 2), feet: fmt(m * 3.28084, 1), inches: fmt(m * 39.3701, 0) };
  });

  const summary = f.summary?.replace("{varaValue}", varaValue.toString()).replace("{meters}", fmt(meters, 2)) || `${varaValue} varas = ${fmt(meters, 2)} meters`;
  return {
    values: { meters, cm, feet, inches, yards, ...refs },
    formatted: { meters: `${fmt(meters, 2)} ${mUnit}`, cm: `${fmt(cm, 1)} ${cmUnit}`, feet: `${fmt(feet, 2)} ${ftUnit}`, inches: `${fmt(inches, 1)} ${inUnit}`, yards: `${fmt(yards, 2)} ${ydUnit}`, ...refs },
    summary, isValid: true, metadata: { tableData },
  };
}

export default varasToMetrosConfig;
