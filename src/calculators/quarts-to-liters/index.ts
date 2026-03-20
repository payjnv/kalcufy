import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";
import { convert, UNIT_REGISTRY } from "@/engine/v4/units";

export const quartsToLitersConfig: CalculatorConfigV4 = {
  id: "quarts-to-liters",
  version: "4.0",
  category: "conversion",
  icon: "🫗",

  presets: [
    { id: "one", icon: "🥛", values: { amount: 1 } },
    { id: "four", icon: "🫗", values: { amount: 4 } },
    { id: "five", icon: "🛢️", values: { amount: 5 } },
  ],

  t: {
    en: {
      name: "Quarts to Liters Converter",
      slug: "quarts-to-liters",
      subtitle: "Convert quarts to liters for cooking, automotive, and everyday volume measurements.",
      breadcrumb: "Quarts to Liters",

      seo: {
        title: "Quarts to Liters Converter - Volume Conversion Tool",
        description: "Convert quarts to liters instantly for cooking, automotive fluids, and everyday measurements.",
        shortDescription: "Convert quarts to liters for cooking, automotive, and everyday volume measuremen",
        keywords: ["quarts to liters", "qt to L", "quart liter converter", "cooking conversion", "volume converter", "automotive fluid conversion"],
      },

      calculator: { yourInformation: "Enter Volume" },
      ui: { yourInformation: "Enter Volume", calculate: "Convert", reset: "Reset", results: "Results" },

      inputs: {
        amount: { label: "Volume", helpText: "Enter the volume to convert" },
      },

      results: {
        primary: { label: "Result" },
      },

      presets: {
        one: { label: "🥛 1 qt", description: "1 qt (0.95 L)" },
        four: { label: "🫗 4 qt = 1 gallon", description: "4 qt = 1 gallon" },
        five: { label: "🛢️ 5 qt", description: "5 qt (oil change)" },
      },

      values: {},
      formats: { summary: "Conversion result" },

      infoCards: {
        results: {
          title: "All Conversions",
          items: [
            { label: "Primary Result", valueKey: "primary" },
            { label: "Secondary", valueKey: "secondary1" },
            { label: "Tertiary", valueKey: "secondary2" },
            { label: "Additional", valueKey: "secondary3" },
          ],
        },
        tips: {
          title: "Conversion Tips",
          items: [
            "Quick estimate: 1 quart ≈ 0.946 liters (almost 1 liter)",
            "Select any unit from the dropdown to convert from that unit instead.",
            "Results update instantly as you type.",
            "Use presets for common conversion values.",
          ],
        },
      },

      education: {
        whatIs: {
          title: "About This Conversion",
          content: "Convert quarts to liters instantly for cooking, automotive fluids, and everyday measurements. This converter supports all related units in the volume category, letting you convert between any combination with a single input.",
        },
        howItWorks: {
          title: "How to Convert",
          content: "Enter your value and select the source unit from the dropdown. The converter instantly shows the equivalent in all other units of this type. All conversions use precise factors from international standards (NIST/BIPM).",
        },
        considerations: {
          title: "Important Notes",
          items: [
            { text: "Quick estimate: 1 quart ≈ 0.946 liters (almost 1 liter)", type: "info" },
            { text: "Select any unit from the dropdown to change the source unit.", type: "info" },
            { text: "All conversions are bidirectional — works both ways.", type: "info" },
            { text: "Results are calculated using exact conversion factors.", type: "info" },
            { text: "For very large or small numbers, scientific notation may be used.", type: "info" },
            { text: "Bookmark this page for quick access to this converter.", type: "info" },
          ],
        },
        commonValues: {
          title: "Common Conversions",
          items: [
            { text: "See the Quick Reference card for common values.", type: "info" },
            { text: "Use presets above for frequently used amounts.", type: "info" },
            { text: "All results update in real-time as you type.", type: "info" },
            { text: "Works on mobile — use it anywhere.", type: "info" },
            { text: "Share results using the Share button below.", type: "info" },
            { text: "Save results for later with the Save button.", type: "info" },
          ],
        },
        examples: {
          title: "Conversion Examples",
          description: "Common scenarios",
          examples: [
            {
              title: "Basic Conversion",
              steps: ["Enter value in source unit", "Read result in target unit", "Use dropdown to change source unit"],
              result: "Instant conversion result",
            },
            {
              title: "Reverse Conversion",
              steps: ["Change the dropdown to the target unit", "Enter your value", "Read the result in the original unit"],
              result: "Works both ways — just change the dropdown",
            },
          ],
        },
      },

      faqs: [
        { question: "How accurate are these conversions?", answer: "All conversions use exact factors from NIST and BIPM international standards. Results are accurate to at least 6 significant digits." },
        { question: "Can I convert in the reverse direction?", answer: "Yes! Simply change the unit in the dropdown to convert from any unit to all others. The converter is fully bidirectional." },
        { question: "What units are supported?", answer: "This converter supports all units in the volume category: qt_us, L, gal_us, mL, cups, pt_us, fl_oz. Select any from the dropdown." },
        { question: "Does this work on mobile?", answer: "Yes, this converter is fully responsive and works on any device — phone, tablet, or desktop." },
        { question: "Can I share my conversion result?", answer: "Yes! Use the Share Results button to generate a link with your exact conversion that you can send to anyone." },
        { question: "Is this converter free?", answer: "Yes, 100% free with no registration required. Use it as many times as you need." },
      ],

      rating: { title: "Rate this Calculator", share: "Share", copied: "Copied!", copyLink: "Copy Link", clickToRate: "Click to rate", youRated: "You rated", stars: "stars", averageFrom: "average from", ratings: "ratings" },
      common: { home: "Home", calculators: "Calculators" },
      buttons: { calculate: "Convert", reset: "Reset", pdf: "PDF", csv: "CSV", excel: "Excel", save: "Save", saved: "Saved", saving: "Saving..." },
      share: { calculatedWith: "Calculated with Kalcufy.com" },
      accessibility: { mobileResults: "Results", closeModal: "Close", openMenu: "Menu" },
      sources: { title: "Sources & References" },
    },
    es: {
      "name": "Convertidor de Cuartos a Litros",
      "slug": "calculadora-cuartos-a-litros",
      "subtitle": "Convierte cuartos a litros para cocina, automoción y mediciones de volumen cotidianas.",
      "breadcrumb": "Cuartos a Litros",
      "seo": {
        "title": "Convertidor de Cuartos a Litros - Herramienta de Conversión de Volumen",
        "description": "Convierte cuartos a litros instantáneamente para cocina, fluidos automotrices y mediciones cotidianas.",
        "shortDescription": "Convierte cuartos a litros para cocina, automoción y mediciones de volumen cotidianas",
        "keywords": [
          "cuartos a litros",
          "qt a L",
          "convertidor cuarto litro",
          "conversión cocina",
          "convertidor volumen",
          "conversión fluidos automotrices"
        ]
      },
      "inputs": {
        "amount": {
          "label": "Volumen",
          "helpText": "Ingresa el volumen a convertir"
        }
      },
      "results": {
        "primary": {
          "label": "Resultado"
        }
      },
      "presets": {
        "one": {
          "label": "🥛 1 qt",
          "description": "1 qt (0,95 L)"
        },
        "four": {
          "label": "🫗 4 qt = 1 galón",
          "description": "4 qt = 1 galón"
        },
        "five": {
          "label": "🛢️ 5 qt",
          "description": "5 qt (cambio de aceite)"
        }
      },
      "values": {},
      "formats": {
        "summary": "Resultado de conversión"
      },
      "infoCards": {
        "results": {
          "title": "Todas las Conversiones",
          "items": [
            {
              "label": "Resultado Principal",
              "valueKey": "primary"
            },
            {
              "label": "Secundario",
              "valueKey": "secondary1"
            },
            {
              "label": "Terciario",
              "valueKey": "secondary2"
            },
            {
              "label": "Adicional",
              "valueKey": "secondary3"
            }
          ]
        },
        "tips": {
          "title": "Consejos de Conversión",
          "items": [
            "Estimación rápida: 1 cuarto ≈ 0,946 litros (casi 1 litro)",
            "Selecciona cualquier unidad del menú desplegable para convertir desde esa unidad.",
            "Los resultados se actualizan instantáneamente mientras escribes.",
            "Usa preajustes para valores de conversión comunes."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Acerca de Esta Conversión",
          "content": "Convierte cuartos a litros instantáneamente para cocina, fluidos automotrices y mediciones cotidianas. Este convertidor soporta todas las unidades relacionadas en la categoría de volumen, permitiéndote convertir entre cualquier combinación con una sola entrada."
        },
        "howItWorks": {
          "title": "Cómo Convertir",
          "content": "Ingresa tu valor y selecciona la unidad de origen del menú desplegable. El convertidor muestra instantáneamente el equivalente en todas las otras unidades de este tipo. Todas las conversiones usan factores precisos de estándares internacionales (NIST/BIPM)."
        },
        "considerations": {
          "title": "Notas Importantes",
          "items": [
            {
              "text": "Estimación rápida: 1 cuarto ≈ 0,946 litros (casi 1 litro)",
              "type": "info"
            },
            {
              "text": "Selecciona cualquier unidad del menú desplegable para cambiar la unidad de origen.",
              "type": "info"
            },
            {
              "text": "Todas las conversiones son bidireccionales — funcionan en ambas direcciones.",
              "type": "info"
            },
            {
              "text": "Los resultados se calculan usando factores de conversión exactos.",
              "type": "info"
            },
            {
              "text": "Para números muy grandes o pequeños, puede usarse notación científica.",
              "type": "info"
            },
            {
              "text": "Marca esta página para acceso rápido a este convertidor.",
              "type": "info"
            }
          ]
        },
        "commonValues": {
          "title": "Conversiones Comunes",
          "items": [
            {
              "text": "Ve la tarjeta de Referencia Rápida para valores comunes.",
              "type": "info"
            },
            {
              "text": "Usa preajustes arriba para cantidades frecuentemente usadas.",
              "type": "info"
            },
            {
              "text": "Todos los resultados se actualizan en tiempo real mientras escribes.",
              "type": "info"
            },
            {
              "text": "Funciona en móvil — úsalo en cualquier lugar.",
              "type": "info"
            },
            {
              "text": "Comparte resultados usando el botón Compartir abajo.",
              "type": "info"
            },
            {
              "text": "Guarda resultados para después con el botón Guardar.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Ejemplos de Conversión",
          "description": "Escenarios comunes",
          "examples": [
            {
              "title": "Conversión Básica",
              "steps": [
                "Ingresa valor en la unidad de origen",
                "Lee el resultado en la unidad objetivo",
                "Usa el menú desplegable para cambiar la unidad de origen"
              ],
              "result": "Resultado de conversión instantáneo"
            },
            {
              "title": "Conversión Inversa",
              "steps": [
                "Cambia el menú desplegable a la unidad objetivo",
                "Ingresa tu valor",
                "Lee el resultado en la unidad original"
              ],
              "result": "Funciona en ambas direcciones — solo cambia el menú desplegable"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "¿Qué tan precisas son estas conversiones?",
          "answer": "Todas las conversiones usan factores exactos de los estándares internacionales NIST y BIPM. Los resultados son precisos hasta al menos 6 dígitos significativos."
        },
        {
          "question": "¿Puedo convertir en dirección inversa?",
          "answer": "¡Sí! Simplemente cambia la unidad en el menú desplegable para convertir de cualquier unidad a todas las otras. El convertidor es completamente bidireccional."
        },
        {
          "question": "¿Qué unidades están soportadas?",
          "answer": "Este convertidor soporta todas las unidades en la categoría de volumen: qt_us, L, gal_us, mL, tazas, pt_us, fl_oz. Selecciona cualquiera del menú desplegable."
        },
        {
          "question": "¿Esto funciona en móvil?",
          "answer": "Sí, este convertidor es completamente responsivo y funciona en cualquier dispositivo — teléfono, tablet o escritorio."
        },
        {
          "question": "¿Puedo compartir mi resultado de conversión?",
          "answer": "¡Sí! Usa el botón Compartir Resultados para generar un enlace con tu conversión exacta que puedes enviar a cualquiera."
        },
        {
          "question": "¿Es gratis este convertidor?",
          "answer": "Sí, 100% gratis sin registro requerido. Úsalo tantas veces como necesites."
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
      "name": "Conversor de Quartos para Litros",
      "slug": "calculadora-quartos-para-litros",
      "subtitle": "Converta quartos para litros para culinária, automotivo e medições de volume do dia a dia.",
      "breadcrumb": "Quartos para Litros",
      "seo": {
        "title": "Conversor de Quartos para Litros - Ferramenta de Conversão de Volume",
        "description": "Converta quartos para litros instantaneamente para culinária, fluidos automotivos e medições do cotidiano.",
        "shortDescription": "Converta quartos para litros para culinária, automotivo e medições de volume do dia a dia",
        "keywords": [
          "quartos para litros",
          "qt para L",
          "conversor quarto litro",
          "conversão culinária",
          "conversor de volume",
          "conversão fluido automotivo"
        ]
      },
      "calculator": {
        "yourInformation": "Suas Informações"
      },
      "inputs": {
        "amount": {
          "label": "Volume",
          "helpText": "Insira o volume para converter"
        }
      },
      "results": {
        "primary": {
          "label": "Resultado"
        }
      },
      "presets": {
        "one": {
          "label": "🥛 1 qt",
          "description": "1 qt (0,95 L)"
        },
        "four": {
          "label": "🫗 4 qt = 1 galão",
          "description": "4 qt = 1 galão"
        },
        "five": {
          "label": "🛢️ 5 qt",
          "description": "5 qt (troca de óleo)"
        }
      },
      "values": {},
      "formats": {
        "summary": "Resultado da conversão"
      },
      "infoCards": {
        "results": {
          "title": "Todas as Conversões",
          "items": [
            {
              "label": "Resultado Principal",
              "valueKey": "primary"
            },
            {
              "label": "Secundário",
              "valueKey": "secondary1"
            },
            {
              "label": "Terciário",
              "valueKey": "secondary2"
            },
            {
              "label": "Adicional",
              "valueKey": "secondary3"
            }
          ]
        },
        "tips": {
          "title": "Dicas de Conversão",
          "items": [
            "Estimativa rápida: 1 quarto ≈ 0,946 litros (quase 1 litro)",
            "Selecione qualquer unidade no menu suspenso para converter a partir dessa unidade.",
            "Os resultados são atualizados instantaneamente enquanto você digita.",
            "Use predefinições para valores de conversão comuns."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Sobre Esta Conversão",
          "content": "Converta quartos para litros instantaneamente para culinária, fluidos automotivos e medições do dia a dia. Este conversor suporta todas as unidades relacionadas na categoria de volume, permitindo converter entre qualquer combinação com uma única entrada."
        },
        "howItWorks": {
          "title": "Como Converter",
          "content": "Insira seu valor e selecione a unidade de origem no menu suspenso. O conversor mostra instantaneamente o equivalente em todas as outras unidades deste tipo. Todas as conversões usam fatores precisos dos padrões internacionais (NIST/BIPM)."
        },
        "considerations": {
          "title": "Notas Importantes",
          "items": [
            {
              "text": "Estimativa rápida: 1 quarto ≈ 0,946 litros (quase 1 litro)",
              "type": "info"
            },
            {
              "text": "Selecione qualquer unidade no menu suspenso para alterar a unidade de origem.",
              "type": "info"
            },
            {
              "text": "Todas as conversões são bidirecionais — funcionam nos dois sentidos.",
              "type": "info"
            },
            {
              "text": "Os resultados são calculados usando fatores de conversão exatos.",
              "type": "info"
            },
            {
              "text": "Para números muito grandes ou pequenos, notação científica pode ser usada.",
              "type": "info"
            },
            {
              "text": "Salve esta página nos favoritos para acesso rápido a este conversor.",
              "type": "info"
            }
          ]
        },
        "commonValues": {
          "title": "Conversões Comuns",
          "items": [
            {
              "text": "Veja o cartão de Referência Rápida para valores comuns.",
              "type": "info"
            },
            {
              "text": "Use predefinições acima para quantidades usadas frequentemente.",
              "type": "info"
            },
            {
              "text": "Todos os resultados são atualizados em tempo real enquanto você digita.",
              "type": "info"
            },
            {
              "text": "Funciona no celular — use em qualquer lugar.",
              "type": "info"
            },
            {
              "text": "Compartilhe resultados usando o botão Compartilhar abaixo.",
              "type": "info"
            },
            {
              "text": "Salve resultados para depois com o botão Salvar.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemplos de Conversão",
          "description": "Cenários comuns",
          "examples": [
            {
              "title": "Conversão Básica",
              "steps": [
                "Insira o valor na unidade de origem",
                "Leia o resultado na unidade de destino",
                "Use o menu suspenso para alterar a unidade de origem"
              ],
              "result": "Resultado de conversão instantâneo"
            },
            {
              "title": "Conversão Reversa",
              "steps": [
                "Altere o menu suspenso para a unidade de destino",
                "Insira seu valor",
                "Leia o resultado na unidade original"
              ],
              "result": "Funciona nos dois sentidos — apenas altere o menu suspenso"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Quão precisas são essas conversões?",
          "answer": "Todas as conversões usam fatores exatos dos padrões internacionais NIST e BIPM. Os resultados são precisos para pelo menos 6 dígitos significativos."
        },
        {
          "question": "Posso converter na direção reversa?",
          "answer": "Sim! Simplesmente altere a unidade no menu suspenso para converter de qualquer unidade para todas as outras. O conversor é totalmente bidirecional."
        },
        {
          "question": "Quais unidades são suportadas?",
          "answer": "Este conversor suporta todas as unidades na categoria de volume: qt_us, L, gal_us, mL, xícaras, pt_us, fl_oz. Selecione qualquer uma no menu suspenso."
        },
        {
          "question": "Isso funciona no celular?",
          "answer": "Sim, este conversor é totalmente responsivo e funciona em qualquer dispositivo — telefone, tablet ou desktop."
        },
        {
          "question": "Posso compartilhar meu resultado de conversão?",
          "answer": "Sim! Use o botão Compartilhar Resultados para gerar um link com sua conversão exata que você pode enviar para qualquer pessoa."
        },
        {
          "question": "Este conversor é gratuito?",
          "answer": "Sim, 100% gratuito sem necessidade de registro. Use quantas vezes precisar."
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
      "name": "Convertisseur Quarts vers Litres",
      "slug": "calculateur-quarts-vers-litres",
      "subtitle": "Convertissez les quarts en litres pour la cuisine, l'automobile et les mesures de volume quotidiennes.",
      "breadcrumb": "Quarts vers Litres",
      "seo": {
        "title": "Convertisseur Quarts vers Litres - Outil de Conversion de Volume",
        "description": "Convertissez instantanément les quarts en litres pour la cuisine, les fluides automobiles et les mesures quotidiennes.",
        "shortDescription": "Convertissez les quarts en litres pour la cuisine, l'automobile et les mesures de volume quotidiennes",
        "keywords": [
          "quarts en litres",
          "qt en L",
          "convertisseur quart litre",
          "conversion cuisine",
          "convertisseur volume",
          "conversion fluide automobile"
        ]
      },
      "inputs": {
        "amount": {
          "label": "Volume",
          "helpText": "Entrez le volume à convertir"
        }
      },
      "results": {
        "primary": {
          "label": "Résultat"
        }
      },
      "presets": {
        "one": {
          "label": "🥛 1 qt",
          "description": "1 qt (0,95 L)"
        },
        "four": {
          "label": "🫗 4 qt = 1 gallon",
          "description": "4 qt = 1 gallon"
        },
        "five": {
          "label": "🛢️ 5 qt",
          "description": "5 qt (vidange)"
        }
      },
      "values": {},
      "formats": {
        "summary": "Résultat de conversion"
      },
      "infoCards": {
        "results": {
          "title": "Toutes les Conversions",
          "items": [
            {
              "label": "Résultat Principal",
              "valueKey": "primary"
            },
            {
              "label": "Secondaire",
              "valueKey": "secondary1"
            },
            {
              "label": "Tertiaire",
              "valueKey": "secondary2"
            },
            {
              "label": "Supplémentaire",
              "valueKey": "secondary3"
            }
          ]
        },
        "tips": {
          "title": "Conseils de Conversion",
          "items": [
            "Estimation rapide : 1 quart ≈ 0,946 litres (presque 1 litre)",
            "Sélectionnez n'importe quelle unité dans le menu déroulant pour convertir depuis cette unité.",
            "Les résultats se mettent à jour instantanément pendant que vous tapez.",
            "Utilisez les préréglages pour les valeurs de conversion courantes."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "À Propos de Cette Conversion",
          "content": "Convertissez instantanément les quarts en litres pour la cuisine, les fluides automobiles et les mesures quotidiennes. Ce convertisseur prend en charge toutes les unités connexes dans la catégorie volume, vous permettant de convertir entre n'importe quelle combinaison avec une seule saisie."
        },
        "howItWorks": {
          "title": "Comment Convertir",
          "content": "Entrez votre valeur et sélectionnez l'unité source dans le menu déroulant. Le convertisseur affiche instantanément l'équivalent dans toutes les autres unités de ce type. Toutes les conversions utilisent des facteurs précis des normes internationales (NIST/BIPM)."
        },
        "considerations": {
          "title": "Notes Importantes",
          "items": [
            {
              "text": "Estimation rapide : 1 quart ≈ 0,946 litres (presque 1 litre)",
              "type": "info"
            },
            {
              "text": "Sélectionnez n'importe quelle unité dans le menu déroulant pour changer l'unité source.",
              "type": "info"
            },
            {
              "text": "Toutes les conversions sont bidirectionnelles — fonctionne dans les deux sens.",
              "type": "info"
            },
            {
              "text": "Les résultats sont calculés en utilisant des facteurs de conversion exacts.",
              "type": "info"
            },
            {
              "text": "Pour les très grands ou très petits nombres, la notation scientifique peut être utilisée.",
              "type": "info"
            },
            {
              "text": "Ajoutez cette page aux favoris pour un accès rapide à ce convertisseur.",
              "type": "info"
            }
          ]
        },
        "commonValues": {
          "title": "Conversions Courantes",
          "items": [
            {
              "text": "Voir la carte Référence Rapide pour les valeurs courantes.",
              "type": "info"
            },
            {
              "text": "Utilisez les préréglages ci-dessus pour les quantités fréquemment utilisées.",
              "type": "info"
            },
            {
              "text": "Tous les résultats se mettent à jour en temps réel pendant que vous tapez.",
              "type": "info"
            },
            {
              "text": "Fonctionne sur mobile — utilisez-le n'importe où.",
              "type": "info"
            },
            {
              "text": "Partagez les résultats en utilisant le bouton Partager ci-dessous.",
              "type": "info"
            },
            {
              "text": "Sauvegardez les résultats pour plus tard avec le bouton Sauvegarder.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemples de Conversion",
          "description": "Scénarios courants",
          "examples": [
            {
              "title": "Conversion de Base",
              "steps": [
                "Entrez la valeur dans l'unité source",
                "Lisez le résultat dans l'unité cible",
                "Utilisez le menu déroulant pour changer l'unité source"
              ],
              "result": "Résultat de conversion instantané"
            },
            {
              "title": "Conversion Inverse",
              "steps": [
                "Changez le menu déroulant vers l'unité cible",
                "Entrez votre valeur",
                "Lisez le résultat dans l'unité originale"
              ],
              "result": "Fonctionne dans les deux sens — changez simplement le menu déroulant"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Quelle est la précision de ces conversions ?",
          "answer": "Toutes les conversions utilisent des facteurs exacts des normes internationales NIST et BIPM. Les résultats sont précis à au moins 6 chiffres significatifs."
        },
        {
          "question": "Puis-je convertir dans le sens inverse ?",
          "answer": "Oui ! Changez simplement l'unité dans le menu déroulant pour convertir de n'importe quelle unité vers toutes les autres. Le convertisseur est entièrement bidirectionnel."
        },
        {
          "question": "Quelles unités sont prises en charge ?",
          "answer": "Ce convertisseur prend en charge toutes les unités de la catégorie volume : qt_us, L, gal_us, mL, tasses, pt_us, fl_oz. Sélectionnez n'importe laquelle dans le menu déroulant."
        },
        {
          "question": "Est-ce que cela fonctionne sur mobile ?",
          "answer": "Oui, ce convertisseur est entièrement responsive et fonctionne sur n'importe quel appareil — téléphone, tablette ou ordinateur de bureau."
        },
        {
          "question": "Puis-je partager mon résultat de conversion ?",
          "answer": "Oui ! Utilisez le bouton Partager les Résultats pour générer un lien avec votre conversion exacte que vous pouvez envoyer à n'importe qui."
        },
        {
          "question": "Ce convertisseur est-il gratuit ?",
          "answer": "Oui, 100% gratuit sans inscription requise. Utilisez-le autant de fois que nécessaire."
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
      "name": "Quart zu Liter Umrechner",
      "slug": "quart-zu-liter-rechner",
      "subtitle": "Konvertieren Sie Quart in Liter für Kochen, Automotive und alltägliche Volumenmessungen.",
      "breadcrumb": "Quart zu Liter",
      "seo": {
        "title": "Quart zu Liter Umrechner - Volumen Umrechnungstool",
        "description": "Konvertieren Sie Quart sofort in Liter für Kochen, Automobilflüssigkeiten und alltägliche Messungen.",
        "shortDescription": "Konvertieren Sie Quart in Liter für Kochen, Automotive und alltägliche Volumenmessungen",
        "keywords": [
          "quart zu liter",
          "qt zu L",
          "quart liter umrechner",
          "koch umrechnung",
          "volumen umrechner",
          "automobilflüssigkeit umrechnung"
        ]
      },
      "inputs": {
        "amount": {
          "label": "Volumen",
          "helpText": "Geben Sie das zu konvertierende Volumen ein"
        }
      },
      "results": {
        "primary": {
          "label": "Ergebnis"
        }
      },
      "presets": {
        "one": {
          "label": "🥛 1 qt",
          "description": "1 qt (0,95 L)"
        },
        "four": {
          "label": "🫗 4 qt = 1 Gallone",
          "description": "4 qt = 1 Gallone"
        },
        "five": {
          "label": "🛢️ 5 qt",
          "description": "5 qt (Ölwechsel)"
        }
      },
      "values": {},
      "formats": {
        "summary": "Umrechnungsergebnis"
      },
      "infoCards": {
        "results": {
          "title": "Alle Umrechnungen",
          "items": [
            {
              "label": "Hauptergebnis",
              "valueKey": "primary"
            },
            {
              "label": "Sekundär",
              "valueKey": "secondary1"
            },
            {
              "label": "Tertiär",
              "valueKey": "secondary2"
            },
            {
              "label": "Zusätzlich",
              "valueKey": "secondary3"
            }
          ]
        },
        "tips": {
          "title": "Umrechnungstipps",
          "items": [
            "Schnelle Schätzung: 1 Quart ≈ 0,946 Liter (fast 1 Liter)",
            "Wählen Sie eine beliebige Einheit aus der Dropdown-Liste, um von dieser Einheit umzurechnen.",
            "Ergebnisse werden sofort aktualisiert, während Sie tippen.",
            "Verwenden Sie Voreinstellungen für häufige Umrechnungswerte."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Über diese Umrechnung",
          "content": "Konvertieren Sie Quart sofort in Liter für Kochen, Automobilflüssigkeiten und alltägliche Messungen. Dieser Umrechner unterstützt alle verwandten Einheiten in der Volumenkategorie und ermöglicht es Ihnen, mit einer einzigen Eingabe zwischen beliebigen Kombinationen umzurechnen."
        },
        "howItWorks": {
          "title": "Wie man umrechnet",
          "content": "Geben Sie Ihren Wert ein und wählen Sie die Quelleinheit aus der Dropdown-Liste. Der Umrechner zeigt sofort das Äquivalent in allen anderen Einheiten dieses Typs an. Alle Umrechnungen verwenden präzise Faktoren aus internationalen Standards (NIST/BIPM)."
        },
        "considerations": {
          "title": "Wichtige Hinweise",
          "items": [
            {
              "text": "Schnelle Schätzung: 1 Quart ≈ 0,946 Liter (fast 1 Liter)",
              "type": "info"
            },
            {
              "text": "Wählen Sie eine beliebige Einheit aus der Dropdown-Liste, um die Quelleinheit zu ändern.",
              "type": "info"
            },
            {
              "text": "Alle Umrechnungen sind bidirektional — funktioniert in beide Richtungen.",
              "type": "info"
            },
            {
              "text": "Ergebnisse werden mit exakten Umrechnungsfaktoren berechnet.",
              "type": "info"
            },
            {
              "text": "Für sehr große oder kleine Zahlen kann wissenschaftliche Notation verwendet werden.",
              "type": "info"
            },
            {
              "text": "Setzen Sie ein Lesezeichen für diese Seite für schnellen Zugriff auf diesen Umrechner.",
              "type": "info"
            }
          ]
        },
        "commonValues": {
          "title": "Häufige Umrechnungen",
          "items": [
            {
              "text": "Siehe die Schnellreferenz-Karte für häufige Werte.",
              "type": "info"
            },
            {
              "text": "Verwenden Sie Voreinstellungen oben für häufig verwendete Mengen.",
              "type": "info"
            },
            {
              "text": "Alle Ergebnisse werden in Echtzeit aktualisiert, während Sie tippen.",
              "type": "info"
            },
            {
              "text": "Funktioniert auf Mobilgeräten — verwenden Sie es überall.",
              "type": "info"
            },
            {
              "text": "Teilen Sie Ergebnisse mit der Teilen-Schaltfläche unten.",
              "type": "info"
            },
            {
              "text": "Speichern Sie Ergebnisse für später mit der Speichern-Schaltfläche.",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Umrechnungsbeispiele",
          "description": "Häufige Szenarien",
          "examples": [
            {
              "title": "Grundlegende Umrechnung",
              "steps": [
                "Wert in Quelleinheit eingeben",
                "Ergebnis in Zieleinheit ablesen",
                "Dropdown verwenden, um Quelleinheit zu ändern"
              ],
              "result": "Sofortiges Umrechnungsergebnis"
            },
            {
              "title": "Umgekehrte Umrechnung",
              "steps": [
                "Dropdown zur Zieleinheit ändern",
                "Ihren Wert eingeben",
                "Ergebnis in der ursprünglichen Einheit ablesen"
              ],
              "result": "Funktioniert in beide Richtungen — ändern Sie einfach das Dropdown"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Wie genau sind diese Umrechnungen?",
          "answer": "Alle Umrechnungen verwenden exakte Faktoren aus NIST- und BIPM-Internationalen Standards. Die Ergebnisse sind auf mindestens 6 signifikante Stellen genau."
        },
        {
          "question": "Kann ich in umgekehrter Richtung umrechnen?",
          "answer": "Ja! Ändern Sie einfach die Einheit im Dropdown, um von jeder Einheit zu allen anderen umzurechnen. Der Umrechner ist vollständig bidirektional."
        },
        {
          "question": "Welche Einheiten werden unterstützt?",
          "answer": "Dieser Umrechner unterstützt alle Einheiten in der Volumenkategorie: qt_us, L, gal_us, mL, Tassen, pt_us, fl_oz. Wählen Sie beliebige aus dem Dropdown."
        },
        {
          "question": "Funktioniert das auf Mobilgeräten?",
          "answer": "Ja, dieser Umrechner ist vollständig responsiv und funktioniert auf jedem Gerät — Telefon, Tablet oder Desktop."
        },
        {
          "question": "Kann ich mein Umrechnungsergebnis teilen?",
          "answer": "Ja! Verwenden Sie die Schaltfläche 'Ergebnisse teilen', um einen Link mit Ihrer exakten Umrechnung zu generieren, den Sie an jeden senden können."
        },
        {
          "question": "Ist dieser Umrechner kostenlos?",
          "answer": "Ja, 100% kostenlos ohne erforderliche Registrierung. Verwenden Sie ihn so oft Sie möchten."
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
      step: 1,
      unitType: "volume",
      syncGroup: false,
      defaultUnit: "qt_us",
      allowedUnits: ["qt_us", "L", "gal_us", "mL", "cups", "pt_us", "fl_oz"],
    },
  ],

  inputGroups: [],

  results: [
    { id: "primary", type: "primary", format: "number" },
  ],

  infoCards: [
    { id: "results", type: "list", icon: "📊", itemCount: 4 },
    { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  referenceData: [],

  educationSections: [
    { id: "whatIs", type: "prose", icon: "📖" },
    { id: "howItWorks", type: "prose", icon: "⚙️" },
    { id: "considerations", type: "list", icon: "📋", itemCount: 6 },
    { id: "commonValues", type: "list", icon: "📊", itemCount: 6 },
    { id: "examples", type: "code-example", icon: "🧮", columns: 2, exampleCount: 2 },
  ],

  faqs: [{ id: "0" }, { id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }],

  references: [
    { authors: "NIST", year: "2024", title: "Unit Conversion Factors", source: "National Institute of Standards and Technology", url: "https://www.nist.gov/pml/owm/metric-si/unit-conversion" },
    { authors: "BIPM", year: "2023", title: "The International System of Units (SI)", source: "Bureau International des Poids et Mesures", url: "https://www.bipm.org/en/publications/si-brochure" },
  ],

  hero: { badge: "Converter" },
  sidebar: {},
  features: {},
  relatedCalculators: [],
  ads: {},
};

// ============================================================================
// CALCULATE
// ============================================================================

function fmtNum(val: number): string {
  if (val === 0) return "0";
  if (Math.abs(val) < 0.001) return val.toExponential(3);
  if (Math.abs(val) >= 1e9) return val.toExponential(4);
  if (Math.abs(val) >= 1000) return val.toLocaleString("en-US", { maximumFractionDigits: 4 });
  return val.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 6 });
}

export function calculateQuartsToLiters(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits = {} } = data;
  const amount = values.amount as number;
  const fromUnit = fieldUnits.amount || "qt_us";

  if (amount === undefined || amount === null || amount < 0) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  const unitGroup = UNIT_REGISTRY["volume"];
  const units = unitGroup?.units || [];
  const results: Record<string, number> = {};
  const formatted: Record<string, string> = {};

  // Convert to all available units
  for (const unit of units) {
    try {
      const converted = convert(amount, fromUnit, unit.id, "volume");
      results[unit.id] = converted;
      formatted[unit.id] = `${fmtNum(converted)} ${unit.symbol}`;
    } catch {
      // Skip units that can't convert
    }
  }

  // Map to standard result keys
  const allUnits = ["qt_us", "L", "gal_us", "mL", "cups", "pt_us", "fl_oz"];
  const otherUnits = allUnits.filter(u => u !== fromUnit);

  formatted.primary = formatted[otherUnits[0]] || formatted[allUnits[1]] || "—";
  formatted.secondary1 = formatted[otherUnits[1]] || "—";
  formatted.secondary2 = formatted[otherUnits[2]] || "—";
  formatted.secondary3 = formatted[otherUnits[3]] || "—";

  // Reference values
  const fromSymbol = units.find(u => u.id === fromUnit)?.symbol || fromUnit;
  const toSymbol = units.find(u => u.id === otherUnits[0])?.symbol || otherUnits[0];
  const primaryVal = results[otherUnits[0]] || 0;

  return {
    values: { primary: primaryVal, ...results },
    formatted,
    summary: `${fmtNum(amount)} ${fromSymbol} = ${fmtNum(primaryVal)} ${toSymbol}`,
    isValid: true,
  };
}

export default quartsToLitersConfig;
