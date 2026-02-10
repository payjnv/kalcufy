import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";
import { convertToBase, convert } from "@/engine/v4/units";

// ============================================================================
// LENGTH CONVERTER - V4 (EN ONLY)
// ============================================================================

export const lengthConverterConfig: CalculatorConfigV4 = {
  id: "length-converter",
  version: "4.0",
  category: "conversion",
  icon: "📏",

  presets: [
    { id: "oneMeter", icon: "📏", values: { amount: 1 } },
    { id: "oneFoot", icon: "👣", values: { amount: 0.3048 } },
    { id: "oneMile", icon: "🛣️", values: { amount: 1609.344 } },
  ],

  t: {
    en: {
      name: "Length Converter",
      slug: "length-converter",
      subtitle: "Convert between 18 length units instantly — from nanometers to light-years.",
      breadcrumb: "Length",

      seo: {
        title: "Length Converter - Free Unit Conversion Tool",
        description: "Convert between 18 length units instantly. Supports meters, feet, inches, miles, kilometers, yards, and more with precise conversion factors.",
        shortDescription: "Convert between length units instantly.",
        keywords: [
          "length converter",
          "unit converter",
          "meters to feet",
          "feet to meters",
          "inches to cm",
          "km to miles",
          "free length converter",
          "distance converter",
        ],
      },

      calculator: { yourInformation: "Length Conversion" },
      ui: { yourInformation: "Length Conversion", calculate: "Convert", reset: "Reset", results: "Results" },

      inputs: {
        amount: { label: "Length", helpText: "Enter value and select unit from dropdown" },
      },

      results: {
        meters: { label: "Meters" },
        feet: { label: "Feet" },
        inches: { label: "Inches" },
        centimeters: { label: "Centimeters" },
        kilometers: { label: "Kilometers" },
        miles: { label: "Miles" },
        yards: { label: "Yards" },
        millimeters: { label: "Millimeters" },
      },

      presets: {
        oneMeter: { label: "1 Meter", description: "Convert one meter to all units" },
        oneFoot: { label: "1 Foot", description: "Convert one foot to all units" },
        oneMile: { label: "1 Mile", description: "Convert one mile to all units" },
      },

      values: {
        "m": "m", "ft": "ft", "in": "in", "cm": "cm", "km": "km",
        "mi": "mi", "yd": "yd", "mm": "mm", "nm": "nm", "µm": "µm",
      },

      formats: { summary: "{value} {from} = {result} {to}" },

      infoCards: {
        results: {
          title: "📏 Conversion Results",
          items: [
            { label: "Meters", valueKey: "meters" },
            { label: "Feet", valueKey: "feet" },
            { label: "Inches", valueKey: "inches" },
            { label: "Centimeters", valueKey: "centimeters" },
          ],
        },
        more: {
          title: "📐 More Units",
          items: [
            { label: "Kilometers", valueKey: "kilometers" },
            { label: "Miles", valueKey: "miles" },
            { label: "Yards", valueKey: "yards" },
            { label: "Millimeters", valueKey: "millimeters" },
          ],
        },
        tips: {
          title: "💡 Quick References",
          items: [
            "1 inch = 2.54 cm exactly (defined by international agreement since 1959).",
            "1 mile = 1.60934 km — multiply miles by 1.6 for a quick estimate.",
            "1 meter ≈ 3 feet 3 inches — slightly longer than a yard (3 feet).",
            "1 foot = 12 inches = 30.48 cm — the most common US measurement unit.",
          ],
        },
      },

      education: {
        whatIs: {
          title: "Understanding Length Units",
          content: "Length measurement systems evolved independently across civilizations. Today, two major systems dominate: the metric system (meters, centimeters, kilometers) used by most of the world, and the imperial/US customary system (feet, inches, miles) used primarily in the United States, Liberia, and Myanmar. The metric system is based on powers of 10, making conversions straightforward (1 km = 1,000 m = 100,000 cm). The imperial system has irregular relationships (1 mile = 5,280 feet = 63,360 inches). The international inch was defined as exactly 25.4 millimeters in 1959, creating a precise bridge between the two systems.",
        },
        howItWorks: {
          title: "How Length Conversion Works",
          content: "All length conversions work through a base unit — in this converter, the meter. To convert from any unit to any other, we first convert to meters using the known conversion factor, then convert from meters to the target unit. For example, to convert 5 feet to centimeters: 5 ft × 0.3048 m/ft = 1.524 m, then 1.524 m × 100 cm/m = 152.4 cm. This two-step process through a base unit ensures accuracy and allows conversion between any pair of units without needing a direct conversion factor for every possible pair.",
        },
        considerations: {
          title: "Common Length Equivalences",
          items: [
            { text: "1 inch = 25.4 mm = 2.54 cm (exact by international definition)", type: "info" },
            { text: "1 foot = 12 inches = 30.48 cm = 0.3048 m (exact)", type: "info" },
            { text: "1 yard = 3 feet = 36 inches = 0.9144 m (exact)", type: "info" },
            { text: "1 mile = 5,280 feet = 1,760 yards = 1.60934 km", type: "info" },
            { text: "1 kilometer = 1,000 m = 0.621371 miles ≈ 5/8 of a mile", type: "info" },
            { text: "1 nautical mile = 1,852 m = 1.15078 statute miles (used in navigation)", type: "info" },
          ],
        },
        specialUnits: {
          title: "Special Length Units",
          items: [
            { text: "Nanometer (nm): 1 billionth of a meter — used for wavelengths of light and semiconductor chips", type: "info" },
            { text: "Micrometer (µm): 1 millionth of a meter — used for bacteria, cell sizes, and thin film measurements", type: "info" },
            { text: "Fathom: 6 feet — traditionally used for measuring water depth in maritime navigation", type: "info" },
            { text: "Furlong: 660 feet (1/8 mile) — still used in horse racing distances", type: "info" },
            { text: "Astronomical Unit (AU): ~150 million km — the distance from Earth to the Sun", type: "info" },
            { text: "Light-year: ~9.46 trillion km — the distance light travels in one year", type: "info" },
          ],
        },
        examples: {
          title: "Length Conversion Examples",
          description: "Step-by-step conversions",
          examples: [
            {
              title: "Height: 5'10\" to cm",
              steps: ["5 feet = 5 × 30.48 = 152.4 cm", "10 inches = 10 × 2.54 = 25.4 cm", "Total = 152.4 + 25.4 = 177.8 cm", "Or: 70 inches × 2.54 = 177.8 cm", "Verify: 177.8 / 30.48 = 5.833 ft = 5'10\""],
              result: "5 feet 10 inches = 177.8 cm",
            },
            {
              title: "Marathon: 26.2 miles to km",
              steps: ["1 mile = 1.60934 km", "26.2 × 1.60934 = 42.165 km", "Standard marathon = 42.195 km (exact)", "Half marathon = 21.0975 km = 13.1 mi", "Quick estimate: miles × 1.6 ≈ km"],
              result: "26.2 miles ≈ 42.16 km",
            },
          ],
        },
      },

      faqs: [
        { question: "How many centimeters are in an inch?", answer: "There are exactly 2.54 centimeters in one inch. This is an exact definition established by international agreement in 1959. To convert inches to centimeters, multiply by 2.54. To convert centimeters to inches, divide by 2.54 (or multiply by 0.3937)." },
        { question: "How do I convert meters to feet?", answer: "Multiply meters by 3.28084 to get feet. For example, 1.8 meters × 3.28084 = 5.905 feet ≈ 5 feet 10.9 inches. For a quick estimate, multiply meters by 3.3. To convert feet to meters, multiply by 0.3048." },
        { question: "How many kilometers are in a mile?", answer: "One mile equals 1.60934 kilometers. For quick mental math, multiply miles by 1.6 (or by 8 and divide by 5). One kilometer equals 0.621371 miles, or roughly 5/8 of a mile." },
        { question: "What is the difference between metric and imperial systems?", answer: "The metric system is based on powers of 10 (1 km = 1,000 m = 1,000,000 mm), making conversions simple. The imperial system uses irregular ratios (1 mile = 5,280 feet, 1 foot = 12 inches). The metric system is used by most of the world; imperial is primarily used in the US, Liberia, and Myanmar." },
        { question: "How do I convert between feet and inches?", answer: "1 foot = 12 inches. To convert feet to inches, multiply by 12. To convert inches to feet, divide by 12. For mixed measurements like 5'10\", convert: (5 × 12) + 10 = 70 total inches. To go back: 70 ÷ 12 = 5 remainder 10, so 5 feet 10 inches." },
        { question: "What is a nautical mile?", answer: "A nautical mile equals 1,852 meters (1.15078 statute miles or 6,076 feet). It was originally defined as one minute of arc of latitude along the Earth's surface, making it particularly useful for navigation. Nautical miles are used in maritime and aviation for measuring distances, and speed in knots is nautical miles per hour." },
      ],

      rating: { title: "Rate this Calculator", share: "Share", copied: "Copied!", copyLink: "Copy Link", clickToRate: "Click to rate", youRated: "You rated", stars: "stars", averageFrom: "average from", ratings: "ratings" },
      common: { home: "Home", calculators: "Calculators" },
      buttons: { calculate: "Convert", reset: "Reset", pdf: "PDF", csv: "CSV", excel: "Excel", save: "Save", saved: "Saved", saving: "Saving..." },
      share: { calculatedWith: "Calculated with Kalcufy.com" },
      accessibility: { mobileResults: "Results", closeModal: "Close", openMenu: "Menu" },
      sources: { title: "Sources & References" },
    },
    es: {
      "name": "Conversor de Longitud",
      "slug": "calculadora-conversor-longitud",
      "subtitle": "Convierte entre 18 unidades de longitud al instante — desde nanómetros hasta años luz.",
      "breadcrumb": "Longitud",
      "seo": {
        "title": "Conversor de Longitud - Herramienta Gratuita de Conversión de Unidades",
        "description": "Convierte entre 18 unidades de longitud al instante. Compatible con metros, pies, pulgadas, millas, kilómetros, yardas y más con factores de conversión precisos.",
        "shortDescription": "Convierte entre unidades de longitud al instante.",
        "keywords": [
          "conversor de longitud",
          "conversor de unidades",
          "metros a pies",
          "pies a metros",
          "pulgadas a cm",
          "km a millas",
          "conversor de longitud gratis",
          "conversor de distancia"
        ]
      },
      "inputs": {
        "amount": {
          "label": "Longitud",
          "helpText": "Ingresa el valor y selecciona la unidad del menú desplegable"
        }
      },
      "results": {
        "meters": {
          "label": "Metros"
        },
        "feet": {
          "label": "Pies"
        },
        "inches": {
          "label": "Pulgadas"
        },
        "centimeters": {
          "label": "Centímetros"
        },
        "kilometers": {
          "label": "Kilómetros"
        },
        "miles": {
          "label": "Millas"
        },
        "yards": {
          "label": "Yardas"
        },
        "millimeters": {
          "label": "Milímetros"
        }
      },
      "presets": {
        "oneMeter": {
          "label": "1 Metro",
          "description": "Convertir un metro a todas las unidades"
        },
        "oneFoot": {
          "label": "1 Pie",
          "description": "Convertir un pie a todas las unidades"
        },
        "oneMile": {
          "label": "1 Milla",
          "description": "Convertir una milla a todas las unidades"
        }
      },
      "values": {
        "m": "m",
        "ft": "ft",
        "in": "in",
        "cm": "cm",
        "km": "km",
        "mi": "mi",
        "yd": "yd",
        "mm": "mm",
        "nm": "nm",
        "µm": "µm"
      },
      "formats": {
        "summary": "{value} {from} = {result} {to}"
      },
      "infoCards": {
        "results": {
          "title": "📏 Resultados de Conversión",
          "items": [
            {
              "label": "Metros",
              "valueKey": "meters"
            },
            {
              "label": "Pies",
              "valueKey": "feet"
            },
            {
              "label": "Pulgadas",
              "valueKey": "inches"
            },
            {
              "label": "Centímetros",
              "valueKey": "centimeters"
            }
          ]
        },
        "more": {
          "title": "📐 Más Unidades",
          "items": [
            {
              "label": "Kilómetros",
              "valueKey": "kilometers"
            },
            {
              "label": "Millas",
              "valueKey": "miles"
            },
            {
              "label": "Yardas",
              "valueKey": "yards"
            },
            {
              "label": "Milímetros",
              "valueKey": "millimeters"
            }
          ]
        },
        "tips": {
          "title": "💡 Referencias Rápidas",
          "items": [
            "1 pulgada = 2.54 cm exactamente (definido por acuerdo internacional desde 1959).",
            "1 milla = 1.60934 km — multiplica millas por 1.6 para una estimación rápida.",
            "1 metro ≈ 3 pies 3 pulgadas — ligeramente más largo que una yarda (3 pies).",
            "1 pie = 12 pulgadas = 30.48 cm — la unidad de medida más común en EE.UU."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Entendiendo las Unidades de Longitud",
          "content": "Los sistemas de medición de longitud evolucionaron independientemente a través de las civilizaciones. Hoy en día, dos sistemas principales dominan: el sistema métrico (metros, centímetros, kilómetros) usado por la mayor parte del mundo, y el sistema imperial/estadounidense (pies, pulgadas, millas) usado principalmente en Estados Unidos, Liberia y Myanmar. El sistema métrico se basa en potencias de 10, haciendo las conversiones sencillas (1 km = 1,000 m = 100,000 cm). El sistema imperial tiene relaciones irregulares (1 milla = 5,280 pies = 63,360 pulgadas). La pulgada internacional se definió como exactamente 25.4 milímetros en 1959, creando un puente preciso entre los dos sistemas."
        },
        "howItWorks": {
          "title": "Cómo Funciona la Conversión de Longitud",
          "content": "Todas las conversiones de longitud funcionan a través de una unidad base — en este conversor, el metro. Para convertir de cualquier unidad a cualquier otra, primero convertimos a metros usando el factor de conversión conocido, luego convertimos de metros a la unidad objetivo. Por ejemplo, para convertir 5 pies a centímetros: 5 ft × 0.3048 m/ft = 1.524 m, luego 1.524 m × 100 cm/m = 152.4 cm. Este proceso de dos pasos a través de una unidad base asegura precisión y permite conversión entre cualquier par de unidades sin necesidad de un factor de conversión directo para cada par posible."
        },
        "considerations": {
          "title": "Equivalencias Comunes de Longitud",
          "items": [
            {
              "text": "1 pulgada = 25.4 mm = 2.54 cm (exacto por definición internacional)",
              "type": "info"
            },
            {
              "text": "1 pie = 12 pulgadas = 30.48 cm = 0.3048 m (exacto)",
              "type": "info"
            },
            {
              "text": "1 yarda = 3 pies = 36 pulgadas = 0.9144 m (exacto)",
              "type": "info"
            },
            {
              "text": "1 milla = 5,280 pies = 1,760 yardas = 1.60934 km",
              "type": "info"
            },
            {
              "text": "1 kilómetro = 1,000 m = 0.621371 millas ≈ 5/8 de milla",
              "type": "info"
            },
            {
              "text": "1 milla náutica = 1,852 m = 1.15078 millas terrestres (usada en navegación)",
              "type": "info"
            }
          ]
        },
        "specialUnits": {
          "title": "Unidades Especiales de Longitud",
          "items": [
            {
              "text": "Nanómetro (nm): 1 mil millonésima de metro — usado para longitudes de onda de luz y chips semiconductores",
              "type": "info"
            },
            {
              "text": "Micrómetro (µm): 1 millonésima de metro — usado para bacterias, tamaños celulares y mediciones de películas delgadas",
              "type": "info"
            },
            {
              "text": "Braza: 6 pies — tradicionalmente usada para medir profundidad del agua en navegación marítima",
              "type": "info"
            },
            {
              "text": "Furlong: 660 pies (1/8 milla) — todavía usado en distancias de carreras de caballos",
              "type": "info"
            },
            {
              "text": "Unidad Astronómica (UA): ~150 millones de km — la distancia de la Tierra al Sol",
              "type": "info"
            },
            {
              "text": "Año luz: ~9.46 billones de km — la distancia que la luz viaja en un año",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Ejemplos de Conversión de Longitud",
          "description": "Conversiones paso a paso",
          "examples": [
            {
              "title": "Altura: 5'10\" a cm",
              "steps": [
                "5 pies = 5 × 30.48 = 152.4 cm",
                "10 pulgadas = 10 × 2.54 = 25.4 cm",
                "Total = 152.4 + 25.4 = 177.8 cm",
                "O: 70 pulgadas × 2.54 = 177.8 cm",
                "Verificar: 177.8 / 30.48 = 5.833 ft = 5'10\""
              ],
              "result": "5 pies 10 pulgadas = 177.8 cm"
            },
            {
              "title": "Maratón: 26.2 millas a km",
              "steps": [
                "1 milla = 1.60934 km",
                "26.2 × 1.60934 = 42.165 km",
                "Maratón estándar = 42.195 km (exacto)",
                "Medio maratón = 21.0975 km = 13.1 mi",
                "Estimación rápida: millas × 1.6 ≈ km"
              ],
              "result": "26.2 millas ≈ 42.16 km"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "¿Cuántos centímetros hay en una pulgada?",
          "answer": "Hay exactamente 2.54 centímetros en una pulgada. Esta es una definición exacta establecida por acuerdo internacional en 1959. Para convertir pulgadas a centímetros, multiplica por 2.54. Para convertir centímetros a pulgadas, divide por 2.54 (o multiplica por 0.3937)."
        },
        {
          "question": "¿Cómo convierto metros a pies?",
          "answer": "Multiplica metros por 3.28084 para obtener pies. Por ejemplo, 1.8 metros × 3.28084 = 5.905 pies ≈ 5 pies 10.9 pulgadas. Para una estimación rápida, multiplica metros por 3.3. Para convertir pies a metros, multiplica por 0.3048."
        },
        {
          "question": "¿Cuántos kilómetros hay en una milla?",
          "answer": "Una milla equivale a 1.60934 kilómetros. Para cálculo mental rápido, multiplica millas por 1.6 (o por 8 y divide por 5). Un kilómetro equivale a 0.621371 millas, o aproximadamente 5/8 de milla."
        },
        {
          "question": "¿Cuál es la diferencia entre los sistemas métrico e imperial?",
          "answer": "El sistema métrico se basa en potencias de 10 (1 km = 1,000 m = 1,000,000 mm), haciendo las conversiones simples. El sistema imperial usa proporciones irregulares (1 milla = 5,280 pies, 1 pie = 12 pulgadas). El sistema métrico es usado por la mayor parte del mundo; el imperial se usa principalmente en EE.UU., Liberia y Myanmar."
        },
        {
          "question": "¿Cómo convierto entre pies y pulgadas?",
          "answer": "1 pie = 12 pulgadas. Para convertir pies a pulgadas, multiplica por 12. Para convertir pulgadas a pies, divide por 12. Para medidas mixtas como 5'10\", convierte: (5 × 12) + 10 = 70 pulgadas totales. Para regresar: 70 ÷ 12 = 5 residuo 10, entonces 5 pies 10 pulgadas."
        },
        {
          "question": "¿Qué es una milla náutica?",
          "answer": "Una milla náutica equivale a 1,852 metros (1.15078 millas terrestres o 6,076 pies). Originalmente se definió como un minuto de arco de latitud a lo largo de la superficie terrestre, haciéndola particularmente útil para navegación. Las millas náuticas se usan en navegación marítima y aviación para medir distancias, y la velocidad en nudos es millas náuticas por hora."
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
      "name": "Conversor de Comprimento",
      "slug": "calculadora-conversor-comprimento",
      "subtitle": "Converta entre 18 unidades de comprimento instantaneamente — de nanômetros a anos-luz.",
      "breadcrumb": "Comprimento",
      "seo": {
        "title": "Conversor de Comprimento - Ferramenta Gratuita de Conversão de Unidades",
        "description": "Converta entre 18 unidades de comprimento instantaneamente. Suporta metros, pés, polegadas, milhas, quilômetros, jardas e mais com fatores de conversão precisos.",
        "shortDescription": "Converta entre unidades de comprimento instantaneamente.",
        "keywords": [
          "conversor de comprimento",
          "conversor de unidades",
          "metros para pés",
          "pés para metros",
          "polegadas para cm",
          "km para milhas",
          "conversor de comprimento gratuito",
          "conversor de distância"
        ]
      },
      "inputs": {
        "amount": {
          "label": "Comprimento",
          "helpText": "Digite o valor e selecione a unidade no menu suspenso"
        }
      },
      "results": {
        "meters": {
          "label": "Metros"
        },
        "feet": {
          "label": "Pés"
        },
        "inches": {
          "label": "Polegadas"
        },
        "centimeters": {
          "label": "Centímetros"
        },
        "kilometers": {
          "label": "Quilômetros"
        },
        "miles": {
          "label": "Milhas"
        },
        "yards": {
          "label": "Jardas"
        },
        "millimeters": {
          "label": "Milímetros"
        }
      },
      "presets": {
        "oneMeter": {
          "label": "1 Metro",
          "description": "Converter um metro para todas as unidades"
        },
        "oneFoot": {
          "label": "1 Pé",
          "description": "Converter um pé para todas as unidades"
        },
        "oneMile": {
          "label": "1 Milha",
          "description": "Converter uma milha para todas as unidades"
        }
      },
      "values": {
        "m": "m",
        "ft": "pé",
        "in": "pol",
        "cm": "cm",
        "km": "km",
        "mi": "mi",
        "yd": "jd",
        "mm": "mm",
        "nm": "nm",
        "µm": "µm"
      },
      "formats": {
        "summary": "{value} {from} = {result} {to}"
      },
      "infoCards": {
        "results": {
          "title": "📏 Resultados da Conversão",
          "items": [
            {
              "label": "Metros",
              "valueKey": "meters"
            },
            {
              "label": "Pés",
              "valueKey": "feet"
            },
            {
              "label": "Polegadas",
              "valueKey": "inches"
            },
            {
              "label": "Centímetros",
              "valueKey": "centimeters"
            }
          ]
        },
        "more": {
          "title": "📐 Mais Unidades",
          "items": [
            {
              "label": "Quilômetros",
              "valueKey": "kilometers"
            },
            {
              "label": "Milhas",
              "valueKey": "miles"
            },
            {
              "label": "Jardas",
              "valueKey": "yards"
            },
            {
              "label": "Milímetros",
              "valueKey": "millimeters"
            }
          ]
        },
        "tips": {
          "title": "💡 Referências Rápidas",
          "items": [
            "1 polegada = 2,54 cm exatamente (definido por acordo internacional desde 1959).",
            "1 milha = 1,60934 km — multiplique milhas por 1,6 para uma estimativa rápida.",
            "1 metro ≈ 3 pés e 3 polegadas — ligeiramente mais longo que uma jarda (3 pés).",
            "1 pé = 12 polegadas = 30,48 cm — a unidade de medida mais comum nos EUA."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Entendendo as Unidades de Comprimento",
          "content": "Os sistemas de medição de comprimento evoluíram independentemente através das civilizações. Hoje, dois sistemas principais dominam: o sistema métrico (metros, centímetros, quilômetros) usado pela maior parte do mundo, e o sistema imperial/americano (pés, polegadas, milhas) usado principalmente nos Estados Unidos, Libéria e Myanmar. O sistema métrico é baseado em potências de 10, tornando as conversões diretas (1 km = 1.000 m = 100.000 cm). O sistema imperial tem relações irregulares (1 milha = 5.280 pés = 63.360 polegadas). A polegada internacional foi definida como exatamente 25,4 milímetros em 1959, criando uma ponte precisa entre os dois sistemas."
        },
        "howItWorks": {
          "title": "Como Funciona a Conversão de Comprimento",
          "content": "Todas as conversões de comprimento funcionam através de uma unidade base — neste conversor, o metro. Para converter de qualquer unidade para qualquer outra, primeiro convertemos para metros usando o fator de conversão conhecido, depois convertemos de metros para a unidade desejada. Por exemplo, para converter 5 pés para centímetros: 5 pé × 0,3048 m/pé = 1,524 m, depois 1,524 m × 100 cm/m = 152,4 cm. Este processo de duas etapas através de uma unidade base garante precisão e permite conversão entre qualquer par de unidades sem precisar de um fator de conversão direto para cada par possível."
        },
        "considerations": {
          "title": "Equivalências Comuns de Comprimento",
          "items": [
            {
              "text": "1 polegada = 25,4 mm = 2,54 cm (exato por definição internacional)",
              "type": "info"
            },
            {
              "text": "1 pé = 12 polegadas = 30,48 cm = 0,3048 m (exato)",
              "type": "info"
            },
            {
              "text": "1 jarda = 3 pés = 36 polegadas = 0,9144 m (exato)",
              "type": "info"
            },
            {
              "text": "1 milha = 5.280 pés = 1.760 jardas = 1,60934 km",
              "type": "info"
            },
            {
              "text": "1 quilômetro = 1.000 m = 0,621371 milhas ≈ 5/8 de milha",
              "type": "info"
            },
            {
              "text": "1 milha náutica = 1.852 m = 1,15078 milhas terrestres (usado na navegação)",
              "type": "info"
            }
          ]
        },
        "specialUnits": {
          "title": "Unidades Especiais de Comprimento",
          "items": [
            {
              "text": "Nanômetro (nm): 1 bilionésimo de metro — usado para comprimentos de onda da luz e chips semicondutores",
              "type": "info"
            },
            {
              "text": "Micrômetro (µm): 1 milionésimo de metro — usado para bactérias, tamanhos de células e medições de filmes finos",
              "type": "info"
            },
            {
              "text": "Braça: 6 pés — tradicionalmente usado para medir profundidade da água na navegação marítima",
              "type": "info"
            },
            {
              "text": "Furlong: 660 pés (1/8 de milha) — ainda usado em distâncias de corridas de cavalos",
              "type": "info"
            },
            {
              "text": "Unidade Astronômica (UA): ~150 milhões de km — a distância da Terra ao Sol",
              "type": "info"
            },
            {
              "text": "Ano-luz: ~9,46 trilhões de km — a distância que a luz percorre em um ano",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemplos de Conversão de Comprimento",
          "description": "Conversões passo a passo",
          "examples": [
            {
              "title": "Altura: 5'10\" para cm",
              "steps": [
                "5 pés = 5 × 30,48 = 152,4 cm",
                "10 polegadas = 10 × 2,54 = 25,4 cm",
                "Total = 152,4 + 25,4 = 177,8 cm",
                "Ou: 70 polegadas × 2,54 = 177,8 cm",
                "Verificar: 177,8 / 30,48 = 5,833 pé = 5'10\""
              ],
              "result": "5 pés 10 polegadas = 177,8 cm"
            },
            {
              "title": "Maratona: 26,2 milhas para km",
              "steps": [
                "1 milha = 1,60934 km",
                "26,2 × 1,60934 = 42,165 km",
                "Maratona padrão = 42,195 km (exato)",
                "Meia maratona = 21,0975 km = 13,1 mi",
                "Estimativa rápida: milhas × 1,6 ≈ km"
              ],
              "result": "26,2 milhas ≈ 42,16 km"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Quantos centímetros há em uma polegada?",
          "answer": "Há exatamente 2,54 centímetros em uma polegada. Esta é uma definição exata estabelecida por acordo internacional em 1959. Para converter polegadas para centímetros, multiplique por 2,54. Para converter centímetros para polegadas, divida por 2,54 (ou multiplique por 0,3937)."
        },
        {
          "question": "Como converter metros para pés?",
          "answer": "Multiplique metros por 3,28084 para obter pés. Por exemplo, 1,8 metros × 3,28084 = 5,905 pés ≈ 5 pés 10,9 polegadas. Para uma estimativa rápida, multiplique metros por 3,3. Para converter pés para metros, multiplique por 0,3048."
        },
        {
          "question": "Quantos quilômetros há em uma milha?",
          "answer": "Uma milha equivale a 1,60934 quilômetros. Para cálculo mental rápido, multiplique milhas por 1,6 (ou multiplique por 8 e divida por 5). Um quilômetro equivale a 0,621371 milhas, ou aproximadamente 5/8 de milha."
        },
        {
          "question": "Qual é a diferença entre sistemas métrico e imperial?",
          "answer": "O sistema métrico é baseado em potências de 10 (1 km = 1.000 m = 1.000.000 mm), tornando as conversões simples. O sistema imperial usa proporções irregulares (1 milha = 5.280 pés, 1 pé = 12 polegadas). O sistema métrico é usado pela maior parte do mundo; o imperial é usado principalmente nos EUA, Libéria e Myanmar."
        },
        {
          "question": "Como converter entre pés e polegadas?",
          "answer": "1 pé = 12 polegadas. Para converter pés para polegadas, multiplique por 12. Para converter polegadas para pés, divida por 12. Para medidas mistas como 5'10\", converta: (5 × 12) + 10 = 70 polegadas totais. Para voltar: 70 ÷ 12 = 5 resto 10, então 5 pés 10 polegadas."
        },
        {
          "question": "O que é uma milha náutica?",
          "answer": "Uma milha náutica equivale a 1.852 metros (1,15078 milhas terrestres ou 6.076 pés). Foi originalmente definida como um minuto de arco de latitude ao longo da superfície da Terra, tornando-a particularmente útil para navegação. Milhas náuticas são usadas na navegação marítima e aviação para medir distâncias, e a velocidade em nós é milhas náuticas por hora."
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
      "name": "Convertisseur de Longueur",
      "slug": "calculateur-convertisseur-longueur",
      "subtitle": "Convertissez instantanément entre 18 unités de longueur — des nanomètres aux années-lumière.",
      "breadcrumb": "Longueur",
      "seo": {
        "title": "Convertisseur de Longueur - Outil de Conversion d'Unités Gratuit",
        "description": "Convertissez instantanément entre 18 unités de longueur. Supporte mètres, pieds, pouces, miles, kilomètres, yards, et plus avec des facteurs de conversion précis.",
        "shortDescription": "Convertissez instantanément entre unités de longueur.",
        "keywords": [
          "convertisseur de longueur",
          "convertisseur d'unités",
          "mètres en pieds",
          "pieds en mètres",
          "pouces en cm",
          "km en miles",
          "convertisseur longueur gratuit",
          "convertisseur distance"
        ]
      },
      "inputs": {
        "amount": {
          "label": "Longueur",
          "helpText": "Entrez la valeur et sélectionnez l'unité dans le menu déroulant"
        }
      },
      "results": {
        "meters": {
          "label": "Mètres"
        },
        "feet": {
          "label": "Pieds"
        },
        "inches": {
          "label": "Pouces"
        },
        "centimeters": {
          "label": "Centimètres"
        },
        "kilometers": {
          "label": "Kilomètres"
        },
        "miles": {
          "label": "Miles"
        },
        "yards": {
          "label": "Yards"
        },
        "millimeters": {
          "label": "Millimètres"
        }
      },
      "presets": {
        "oneMeter": {
          "label": "1 Mètre",
          "description": "Convertir un mètre vers toutes les unités"
        },
        "oneFoot": {
          "label": "1 Pied",
          "description": "Convertir un pied vers toutes les unités"
        },
        "oneMile": {
          "label": "1 Mile",
          "description": "Convertir un mile vers toutes les unités"
        }
      },
      "values": {
        "m": "m",
        "ft": "ft",
        "in": "po",
        "cm": "cm",
        "km": "km",
        "mi": "mi",
        "yd": "yd",
        "mm": "mm",
        "nm": "nm",
        "µm": "µm"
      },
      "formats": {
        "summary": "{value} {from} = {result} {to}"
      },
      "infoCards": {
        "results": {
          "title": "📏 Résultats de Conversion",
          "items": [
            {
              "label": "Mètres",
              "valueKey": "meters"
            },
            {
              "label": "Pieds",
              "valueKey": "feet"
            },
            {
              "label": "Pouces",
              "valueKey": "inches"
            },
            {
              "label": "Centimètres",
              "valueKey": "centimeters"
            }
          ]
        },
        "more": {
          "title": "📐 Autres Unités",
          "items": [
            {
              "label": "Kilomètres",
              "valueKey": "kilometers"
            },
            {
              "label": "Miles",
              "valueKey": "miles"
            },
            {
              "label": "Yards",
              "valueKey": "yards"
            },
            {
              "label": "Millimètres",
              "valueKey": "millimeters"
            }
          ]
        },
        "tips": {
          "title": "💡 Références Rapides",
          "items": [
            "1 pouce = 2,54 cm exactement (défini par accord international depuis 1959).",
            "1 mile = 1,60934 km — multipliez les miles par 1,6 pour une estimation rapide.",
            "1 mètre ≈ 3 pieds 3 pouces — légèrement plus long qu'un yard (3 pieds).",
            "1 pied = 12 pouces = 30,48 cm — l'unité de mesure américaine la plus courante."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Comprendre les Unités de Longueur",
          "content": "Les systèmes de mesure de longueur ont évolué indépendamment à travers les civilisations. Aujourd'hui, deux systèmes principaux dominent : le système métrique (mètres, centimètres, kilomètres) utilisé par la plupart du monde, et le système impérial/américain (pieds, pouces, miles) utilisé principalement aux États-Unis, au Libéria et au Myanmar. Le système métrique est basé sur des puissances de 10, rendant les conversions simples (1 km = 1 000 m = 100 000 cm). Le système impérial a des relations irrégulières (1 mile = 5 280 pieds = 63 360 pouces). Le pouce international a été défini comme exactement 25,4 millimètres en 1959, créant un pont précis entre les deux systèmes."
        },
        "howItWorks": {
          "title": "Comment Fonctionne la Conversion de Longueur",
          "content": "Toutes les conversions de longueur fonctionnent à travers une unité de base — dans ce convertisseur, le mètre. Pour convertir d'une unité à une autre, nous convertissons d'abord en mètres en utilisant le facteur de conversion connu, puis convertissons des mètres vers l'unité cible. Par exemple, pour convertir 5 pieds en centimètres : 5 ft × 0,3048 m/ft = 1,524 m, puis 1,524 m × 100 cm/m = 152,4 cm. Ce processus en deux étapes à travers une unité de base assure la précision et permet la conversion entre n'importe quelle paire d'unités sans avoir besoin d'un facteur de conversion direct pour chaque paire possible."
        },
        "considerations": {
          "title": "Équivalences de Longueur Courantes",
          "items": [
            {
              "text": "1 pouce = 25,4 mm = 2,54 cm (exact par définition internationale)",
              "type": "info"
            },
            {
              "text": "1 pied = 12 pouces = 30,48 cm = 0,3048 m (exact)",
              "type": "info"
            },
            {
              "text": "1 yard = 3 pieds = 36 pouces = 0,9144 m (exact)",
              "type": "info"
            },
            {
              "text": "1 mile = 5 280 pieds = 1 760 yards = 1,60934 km",
              "type": "info"
            },
            {
              "text": "1 kilomètre = 1 000 m = 0,621371 miles ≈ 5/8 d'un mile",
              "type": "info"
            },
            {
              "text": "1 mile nautique = 1 852 m = 1,15078 miles terrestres (utilisé en navigation)",
              "type": "info"
            }
          ]
        },
        "specialUnits": {
          "title": "Unités de Longueur Spéciales",
          "items": [
            {
              "text": "Nanomètre (nm) : 1 milliardième de mètre — utilisé pour les longueurs d'onde lumineuses et les puces semiconductrices",
              "type": "info"
            },
            {
              "text": "Micromètre (µm) : 1 millionième de mètre — utilisé pour les bactéries, tailles cellulaires et mesures de films minces",
              "type": "info"
            },
            {
              "text": "Brasse : 6 pieds — traditionnellement utilisée pour mesurer la profondeur de l'eau en navigation maritime",
              "type": "info"
            },
            {
              "text": "Furlong : 660 pieds (1/8 mile) — encore utilisé pour les distances de course hippique",
              "type": "info"
            },
            {
              "text": "Unité Astronomique (UA) : ~150 millions km — la distance de la Terre au Soleil",
              "type": "info"
            },
            {
              "text": "Année-lumière : ~9,46 billions km — la distance que parcourt la lumière en une année",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemples de Conversion de Longueur",
          "description": "Conversions étape par étape",
          "examples": [
            {
              "title": "Taille : 1m77 en pieds et pouces",
              "steps": [
                "177 cm ÷ 30,48 = 5,807 pieds",
                "0,807 × 12 = 9,68 pouces ≈ 9,7 pouces",
                "Résultat : 5 pieds 9,7 pouces",
                "Ou direct : 177 ÷ 2,54 = 69,7 pouces",
                "69,7 ÷ 12 = 5 pieds 9,7 pouces"
              ],
              "result": "177 cm = 5 pieds 9,7 pouces"
            },
            {
              "title": "Marathon : 42,195 km en miles",
              "steps": [
                "1 km = 0,621371 miles",
                "42,195 × 0,621371 = 26,219 miles",
                "Marathon standard = 26,2 miles (exact)",
                "Semi-marathon = 21,0975 km = 13,1 mi",
                "Estimation rapide : km × 0,62 ≈ miles"
              ],
              "result": "42,195 km = 26,22 miles"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Combien de centimètres dans un pouce ?",
          "answer": "Il y a exactement 2,54 centimètres dans un pouce. C'est une définition exacte établie par accord international en 1959. Pour convertir des pouces en centimètres, multipliez par 2,54. Pour convertir des centimètres en pouces, divisez par 2,54 (ou multipliez par 0,3937)."
        },
        {
          "question": "Comment convertir des mètres en pieds ?",
          "answer": "Multipliez les mètres par 3,28084 pour obtenir des pieds. Par exemple, 1,8 mètres × 3,28084 = 5,905 pieds ≈ 5 pieds 10,9 pouces. Pour une estimation rapide, multipliez les mètres par 3,3. Pour convertir des pieds en mètres, multipliez par 0,3048."
        },
        {
          "question": "Combien de kilomètres dans un mile ?",
          "answer": "Un mile équivaut à 1,60934 kilomètres. Pour un calcul mental rapide, multipliez les miles par 1,6 (ou par 8 et divisez par 5). Un kilomètre équivaut à 0,621371 miles, soit environ 5/8 d'un mile."
        },
        {
          "question": "Quelle est la différence entre les systèmes métrique et impérial ?",
          "answer": "Le système métrique est basé sur des puissances de 10 (1 km = 1 000 m = 1 000 000 mm), rendant les conversions simples. Le système impérial utilise des rapports irréguliers (1 mile = 5 280 pieds, 1 pied = 12 pouces). Le système métrique est utilisé par la plupart du monde ; l'impérial est principalement utilisé aux États-Unis, au Libéria et au Myanmar."
        },
        {
          "question": "Comment convertir entre pieds et pouces ?",
          "answer": "1 pied = 12 pouces. Pour convertir des pieds en pouces, multipliez par 12. Pour convertir des pouces en pieds, divisez par 12. Pour des mesures mixtes comme 5'10\", convertissez : (5 × 12) + 10 = 70 pouces au total. Pour revenir : 70 ÷ 12 = 5 reste 10, soit 5 pieds 10 pouces."
        },
        {
          "question": "Qu'est-ce qu'un mile nautique ?",
          "answer": "Un mile nautique équivaut à 1 852 mètres (1,15078 miles terrestres ou 6 076 pieds). Il était originalement défini comme une minute d'arc de latitude le long de la surface terrestre, le rendant particulièrement utile pour la navigation. Les miles nautiques sont utilisés en maritime et aviation pour mesurer les distances, et la vitesse en nœuds correspond aux miles nautiques par heure."
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
      "name": "Längen-Umrechner",
      "slug": "laengen-umrechner-rechner",
      "subtitle": "Rechnen Sie sofort zwischen 18 Längeneinheiten um — von Nanometern bis zu Lichtjahren.",
      "breadcrumb": "Länge",
      "seo": {
        "title": "Längen-Umrechner - Kostenloses Einheiten-Umrechnungstool",
        "description": "Rechnen Sie sofort zwischen 18 Längeneinheiten um. Unterstützt Meter, Fuß, Zoll, Meilen, Kilometer, Yards und mehr mit präzisen Umrechnungsfaktoren.",
        "shortDescription": "Rechnen Sie sofort zwischen Längeneinheiten um.",
        "keywords": [
          "längen umrechner",
          "einheiten umrechner",
          "meter zu fuß",
          "fuß zu meter",
          "zoll zu cm",
          "km zu meilen",
          "kostenloser längen umrechner",
          "distanz umrechner"
        ]
      },
      "inputs": {
        "amount": {
          "label": "Länge",
          "helpText": "Wert eingeben und Einheit aus Dropdown auswählen"
        }
      },
      "results": {
        "meters": {
          "label": "Meter"
        },
        "feet": {
          "label": "Fuß"
        },
        "inches": {
          "label": "Zoll"
        },
        "centimeters": {
          "label": "Zentimeter"
        },
        "kilometers": {
          "label": "Kilometer"
        },
        "miles": {
          "label": "Meilen"
        },
        "yards": {
          "label": "Yards"
        },
        "millimeters": {
          "label": "Millimeter"
        }
      },
      "presets": {
        "oneMeter": {
          "label": "1 Meter",
          "description": "Einen Meter in alle Einheiten umrechnen"
        },
        "oneFoot": {
          "label": "1 Fuß",
          "description": "Einen Fuß in alle Einheiten umrechnen"
        },
        "oneMile": {
          "label": "1 Meile",
          "description": "Eine Meile in alle Einheiten umrechnen"
        }
      },
      "values": {
        "m": "m",
        "ft": "ft",
        "in": "in",
        "cm": "cm",
        "km": "km",
        "mi": "mi",
        "yd": "yd",
        "mm": "mm",
        "nm": "nm",
        "µm": "µm"
      },
      "formats": {
        "summary": "{value} {from} = {result} {to}"
      },
      "infoCards": {
        "results": {
          "title": "📏 Umrechnungsergebnisse",
          "items": [
            {
              "label": "Meter",
              "valueKey": "meters"
            },
            {
              "label": "Fuß",
              "valueKey": "feet"
            },
            {
              "label": "Zoll",
              "valueKey": "inches"
            },
            {
              "label": "Zentimeter",
              "valueKey": "centimeters"
            }
          ]
        },
        "more": {
          "title": "📐 Weitere Einheiten",
          "items": [
            {
              "label": "Kilometer",
              "valueKey": "kilometers"
            },
            {
              "label": "Meilen",
              "valueKey": "miles"
            },
            {
              "label": "Yards",
              "valueKey": "yards"
            },
            {
              "label": "Millimeter",
              "valueKey": "millimeters"
            }
          ]
        },
        "tips": {
          "title": "💡 Schnellreferenzen",
          "items": [
            "1 Zoll = 2,54 cm genau (definiert durch internationale Vereinbarung seit 1959).",
            "1 Meile = 1,60934 km — multiplizieren Sie Meilen mit 1,6 für eine schnelle Schätzung.",
            "1 Meter ≈ 3 Fuß 3 Zoll — etwas länger als ein Yard (3 Fuß).",
            "1 Fuß = 12 Zoll = 30,48 cm — die häufigste US-Maßeinheit."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Längeneinheiten verstehen",
          "content": "Längenmesssysteme entwickelten sich unabhängig voneinander in verschiedenen Zivilisationen. Heute dominieren zwei Hauptsysteme: das metrische System (Meter, Zentimeter, Kilometer), das von den meisten Ländern der Welt verwendet wird, und das imperiale/US-amerikanische System (Fuß, Zoll, Meilen), das hauptsächlich in den USA, Liberia und Myanmar verwendet wird. Das metrische System basiert auf Zehnerpotenzen, was Umrechnungen einfach macht (1 km = 1.000 m = 100.000 cm). Das imperiale System hat unregelmäßige Verhältnisse (1 Meile = 5.280 Fuß = 63.360 Zoll). Der internationale Zoll wurde 1959 als exakt 25,4 Millimeter definiert, wodurch eine präzise Brücke zwischen den beiden Systemen geschaffen wurde."
        },
        "howItWorks": {
          "title": "Wie Längenumrechnung funktioniert",
          "content": "Alle Längenumrechnungen funktionieren über eine Basiseinheit — in diesem Umrechner ist das der Meter. Um von jeder Einheit zu jeder anderen umzurechnen, rechnen wir zuerst mit dem bekannten Umrechnungsfaktor zu Metern um, dann von Metern zur Zieleinheit. Zum Beispiel, um 5 Fuß zu Zentimetern umzurechnen: 5 ft × 0,3048 m/ft = 1,524 m, dann 1,524 m × 100 cm/m = 152,4 cm. Dieser zweistufige Prozess über eine Basiseinheit gewährleistet Genauigkeit und ermöglicht die Umrechnung zwischen jedem Einheitenpaar, ohne einen direkten Umrechnungsfaktor für jedes mögliche Paar zu benötigen."
        },
        "considerations": {
          "title": "Häufige Längenäquivalenzen",
          "items": [
            {
              "text": "1 Zoll = 25,4 mm = 2,54 cm (exakt nach internationaler Definition)",
              "type": "info"
            },
            {
              "text": "1 Fuß = 12 Zoll = 30,48 cm = 0,3048 m (exakt)",
              "type": "info"
            },
            {
              "text": "1 Yard = 3 Fuß = 36 Zoll = 0,9144 m (exakt)",
              "type": "info"
            },
            {
              "text": "1 Meile = 5.280 Fuß = 1.760 Yards = 1,60934 km",
              "type": "info"
            },
            {
              "text": "1 Kilometer = 1.000 m = 0,621371 Meilen ≈ 5/8 einer Meile",
              "type": "info"
            },
            {
              "text": "1 Seemeile = 1.852 m = 1,15078 Landmeilen (in der Navigation verwendet)",
              "type": "info"
            }
          ]
        },
        "specialUnits": {
          "title": "Spezielle Längeneinheiten",
          "items": [
            {
              "text": "Nanometer (nm): 1 Milliardstel eines Meters — für Lichtwellenlängen und Halbleiterchips verwendet",
              "type": "info"
            },
            {
              "text": "Mikrometer (µm): 1 Millionstel eines Meters — für Bakterien, Zellgrößen und Dünnschichtmessungen verwendet",
              "type": "info"
            },
            {
              "text": "Faden: 6 Fuß — traditionell zur Messung der Wassertiefe in der Seefahrt verwendet",
              "type": "info"
            },
            {
              "text": "Furlong: 660 Fuß (1/8 Meile) — wird noch bei Pferderenndistanzen verwendet",
              "type": "info"
            },
            {
              "text": "Astronomische Einheit (AE): ~150 Millionen km — die Entfernung von der Erde zur Sonne",
              "type": "info"
            },
            {
              "text": "Lichtjahr: ~9,46 Billionen km — die Entfernung, die Licht in einem Jahr zurücklegt",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Längenumrechnungsbeispiele",
          "description": "Schritt-für-Schritt-Umrechnungen",
          "examples": [
            {
              "title": "Körpergröße: 5'10\" zu cm",
              "steps": [
                "5 Fuß = 5 × 30,48 = 152,4 cm",
                "10 Zoll = 10 × 2,54 = 25,4 cm",
                "Gesamt = 152,4 + 25,4 = 177,8 cm",
                "Oder: 70 Zoll × 2,54 = 177,8 cm",
                "Überprüfung: 177,8 / 30,48 = 5,833 ft = 5'10\""
              ],
              "result": "5 Fuß 10 Zoll = 177,8 cm"
            },
            {
              "title": "Marathon: 26,2 Meilen zu km",
              "steps": [
                "1 Meile = 1,60934 km",
                "26,2 × 1,60934 = 42,165 km",
                "Standard-Marathon = 42,195 km (exakt)",
                "Halbmarathon = 21,0975 km = 13,1 mi",
                "Schnelle Schätzung: Meilen × 1,6 ≈ km"
              ],
              "result": "26,2 Meilen ≈ 42,16 km"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Wie viele Zentimeter sind in einem Zoll?",
          "answer": "Es gibt exakt 2,54 Zentimeter in einem Zoll. Dies ist eine exakte Definition, die durch internationale Vereinbarung 1959 festgelegt wurde. Um Zoll in Zentimeter umzurechnen, multiplizieren Sie mit 2,54. Um Zentimeter in Zoll umzurechnen, teilen Sie durch 2,54 (oder multiplizieren Sie mit 0,3937)."
        },
        {
          "question": "Wie rechne ich Meter in Fuß um?",
          "answer": "Multiplizieren Sie Meter mit 3,28084, um Fuß zu erhalten. Zum Beispiel: 1,8 Meter × 3,28084 = 5,905 Fuß ≈ 5 Fuß 10,9 Zoll. Für eine schnelle Schätzung multiplizieren Sie Meter mit 3,3. Um Fuß in Meter umzurechnen, multiplizieren Sie mit 0,3048."
        },
        {
          "question": "Wie viele Kilometer sind in einer Meile?",
          "answer": "Eine Meile entspricht 1,60934 Kilometern. Für schnelle Kopfrechnung multiplizieren Sie Meilen mit 1,6 (oder mit 8 und teilen durch 5). Ein Kilometer entspricht 0,621371 Meilen, oder etwa 5/8 einer Meile."
        },
        {
          "question": "Was ist der Unterschied zwischen metrischem und imperialem System?",
          "answer": "Das metrische System basiert auf Zehnerpotenzen (1 km = 1.000 m = 1.000.000 mm), was Umrechnungen einfach macht. Das imperiale System verwendet unregelmäßige Verhältnisse (1 Meile = 5.280 Fuß, 1 Fuß = 12 Zoll). Das metrische System wird von den meisten Ländern der Welt verwendet; das imperiale System wird hauptsächlich in den USA, Liberia und Myanmar verwendet."
        },
        {
          "question": "Wie rechne ich zwischen Fuß und Zoll um?",
          "answer": "1 Fuß = 12 Zoll. Um Fuß in Zoll umzurechnen, multiplizieren Sie mit 12. Um Zoll in Fuß umzurechnen, teilen Sie durch 12. Für gemischte Maße wie 5'10\" rechnen Sie um: (5 × 12) + 10 = 70 Zoll insgesamt. Um zurückzurechnen: 70 ÷ 12 = 5 Rest 10, also 5 Fuß 10 Zoll."
        },
        {
          "question": "Was ist eine Seemeile?",
          "answer": "Eine Seemeile entspricht 1.852 Metern (1,15078 Landmeilen oder 6.076 Fuß). Sie wurde ursprünglich als eine Bogenminute des Breitengrades entlang der Erdoberfläche definiert, was sie besonders nützlich für die Navigation macht. Seemeilen werden in der Seefahrt und Luftfahrt zur Entfernungsmessung verwendet, und Geschwindigkeit in Knoten ist Seemeilen pro Stunde."
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
      placeholder: "100",
      min: 0,
      unitType: "length",
      syncGroup: false,
      defaultUnit: "m",
    },
  ],

  inputGroups: [],

  results: [
    { id: "meters", type: "primary", format: "text" },
    { id: "feet", type: "secondary", format: "text" },
    { id: "inches", type: "secondary", format: "text" },
    { id: "centimeters", type: "secondary", format: "text" },
    { id: "kilometers", type: "secondary", format: "text" },
    { id: "miles", type: "secondary", format: "text" },
    { id: "yards", type: "secondary", format: "text" },
    { id: "millimeters", type: "secondary", format: "text" },
  ],

  infoCards: [
    { id: "results", type: "list", icon: "📏", itemCount: 4 },
    { id: "more", type: "list", icon: "📐", itemCount: 4 },
    { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  referenceData: [],

  educationSections: [
    { id: "whatIs", type: "prose", icon: "📖" },
    { id: "howItWorks", type: "prose", icon: "⚙️" },
    { id: "considerations", type: "list", icon: "📋", itemCount: 6 },
    { id: "specialUnits", type: "list", icon: "📊", itemCount: 6 },
    { id: "examples", type: "code-example", icon: "🧮", columns: 2, exampleCount: 2 },
  ],

  faqs: [{ id: "0" }, { id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }],

  references: [
    { authors: "National Institute of Standards and Technology", year: "2024", title: "NIST Guide to the SI — Length Units", source: "NIST", url: "https://www.nist.gov/pml/owm/si-units-length" },
    { authors: "Bureau International des Poids et Mesures", year: "2023", title: "SI Brochure: The International System of Units", source: "BIPM", url: "https://www.bipm.org/en/publications/si-brochure" },
  ],

  hero: { badge: "Conversion", title: "Length Converter" },
  sidebar: { showConversions: true, showRelated: true },
  features: { showPresets: true, showShare: true, showPrint: true },
  relatedCalculators: ["cm-to-inches", "inches-to-cm", "feet-to-meters"],
  ads: { showTopBanner: false, showSidebar: true, showBetweenSections: false },
};

// ============================================================================
// CALCULATE
// ============================================================================

function fmtNum(val: number): string {
  if (val === 0) return "0";
  if (Math.abs(val) < 0.001) return val.toExponential(3);
  if (Math.abs(val) >= 1e6) return val.toLocaleString("en-US", { maximumFractionDigits: 0 });
  if (Math.abs(val) >= 1000) return val.toLocaleString("en-US", { maximumFractionDigits: 2 });
  if (Math.abs(val) < 1) return val.toFixed(4);
  return val.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 4 });
}

export function calculateLengthConverter(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits = {} } = data;

  const amount = values.amount as number | null;
  if (amount === null || amount === undefined) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  const fromUnit = fieldUnits.amount || "m";

  // Convert to base (meters) using Unit Engine
  const meters = convertToBase(amount, fromUnit, "length");

  // Convert from meters to all target units
  const feet = convert(meters, "m", "ft", "length");
  const inches = convert(meters, "m", "in", "length");
  const cm = meters * 100;
  const km = meters / 1000;
  const miles = convert(meters, "m", "mi", "length");
  const yards = convert(meters, "m", "yd", "length");
  const mm = meters * 1000;

  return {
    values: { meters, feet, inches, centimeters: cm, kilometers: km, miles, yards, millimeters: mm },
    formatted: {
      meters: `${fmtNum(meters)} m`,
      feet: `${fmtNum(feet)} ft`,
      inches: `${fmtNum(inches)} in`,
      centimeters: `${fmtNum(cm)} cm`,
      kilometers: `${fmtNum(km)} km`,
      miles: `${fmtNum(miles)} mi`,
      yards: `${fmtNum(yards)} yd`,
      millimeters: `${fmtNum(mm)} mm`,
    },
    summary: `${fmtNum(amount)} ${fromUnit} = ${fmtNum(meters)} m = ${fmtNum(feet)} ft`,
    isValid: true,
  };
}

export default lengthConverterConfig;
