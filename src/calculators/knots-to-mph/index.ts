import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";
import { convert, UNIT_REGISTRY } from "@/engine/v4/units";

export const knotsToMphConfig: CalculatorConfigV4 = {
  id: "knots-to-mph",
  version: "4.0",
  category: "conversion",
  icon: "⛵",

  presets: [
    { id: "breeze", icon: "🌬️", values: { amount: 15 } },
    { id: "sailing", icon: "⛵", values: { amount: 30 } },
    { id: "jet", icon: "✈️", values: { amount: 500 } },
  ],

  t: {
    en: {
      name: "Knots to MPH Converter",
      slug: "knots-to-mph",
      subtitle: "Convert knots to mph and km/h for sailing, aviation, and weather forecasting.",
      breadcrumb: "Knots to MPH",

      seo: {
        title: "Knots to MPH Converter - Nautical Speed Conversion",
        description: "Convert knots to miles per hour for sailing, aviation, and weather. 1 knot = 1.151 mph = 1.852 km/h.",
        shortDescription: "Convert knots to mph and km/h for sailing, aviation, and weather forecasting.",
        keywords: ["knots to mph", "nautical speed converter", "knots miles per hour", "sailing speed", "aviation speed conversion", "wind speed knots"],
      },

      calculator: { yourInformation: "Enter Speed" },
      ui: { yourInformation: "Enter Speed", calculate: "Convert", reset: "Reset", results: "Results" },

      inputs: {
        amount: { label: "Speed", helpText: "Enter the speed to convert" },
      },

      results: {
        primary: { label: "Result" },
      },

      presets: {
        breeze: { label: "🌬️ 15 kn", description: "15 kn (gentle breeze)" },
        sailing: { label: "⛵ 30 kn", description: "30 kn (strong wind)" },
        jet: { label: "✈️ 500 kn", description: "500 kn (jetliner)" },
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
            "Quick estimate: 1 knot ≈ 1.15 mph ≈ 1.85 km/h",
            "Select any unit from the dropdown to convert from that unit instead.",
            "Results update instantly as you type.",
            "Use presets for common conversion values.",
          ],
        },
      },

      education: {
        whatIs: {
          title: "About This Conversion",
          content: "Convert knots to miles per hour for sailing, aviation, and weather. 1 knot = 1.151 mph = 1.852 km/h. This converter supports all related units in the speed category, letting you convert between any combination with a single input.",
        },
        howItWorks: {
          title: "How to Convert",
          content: "Enter your value and select the source unit from the dropdown. The converter instantly shows the equivalent in all other units of this type. All conversions use precise factors from international standards (NIST/BIPM).",
        },
        considerations: {
          title: "Important Notes",
          items: [
            { text: "Quick estimate: 1 knot ≈ 1.15 mph ≈ 1.85 km/h", type: "info" },
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
        { question: "What units are supported?", answer: "This converter supports all units in the speed category: knots, mph, kmh, ms, fts. Select any from the dropdown." },
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
      "name": "Convertidor de Nudos a MPH",
      "slug": "calculadora-nudos-mph",
      "subtitle": "Convierte nudos a mph y km/h para navegación, aviación y pronóstico meteorológico.",
      "breadcrumb": "Nudos a MPH",
      "seo": {
        "title": "Convertidor de Nudos a MPH - Conversión de Velocidad Náutica",
        "description": "Convierte nudos a millas por hora para navegación, aviación y meteorología. 1 nudo = 1.151 mph = 1.852 km/h.",
        "shortDescription": "Convierte nudos a mph y km/h para navegación, aviación y pronóstico meteorológico.",
        "keywords": [
          "nudos a mph",
          "convertidor velocidad náutica",
          "nudos millas por hora",
          "velocidad navegación",
          "conversión velocidad aviación",
          "velocidad viento nudos"
        ]
      },
      "inputs": {
        "amount": {
          "label": "Velocidad",
          "helpText": "Ingresa la velocidad a convertir"
        }
      },
      "results": {
        "primary": {
          "label": "Resultado"
        }
      },
      "presets": {
        "breeze": {
          "label": "🌬️ 15 kn",
          "description": "15 kn (brisa suave)"
        },
        "sailing": {
          "label": "⛵ 30 kn",
          "description": "30 kn (viento fuerte)"
        },
        "jet": {
          "label": "✈️ 500 kn",
          "description": "500 kn (avión a reacción)"
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
            "Estimación rápida: 1 nudo ≈ 1.15 mph ≈ 1.85 km/h",
            "Selecciona cualquier unidad del menú desplegable para convertir desde esa unidad.",
            "Los resultados se actualizan instantáneamente mientras escribes.",
            "Usa los valores predefinidos para conversiones comunes."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Acerca de Esta Conversión",
          "content": "Convierte nudos a millas por hora para navegación, aviación y meteorología. 1 nudo = 1.151 mph = 1.852 km/h. Este convertidor admite todas las unidades relacionadas en la categoría de velocidad, permitiéndote convertir entre cualquier combinación con una sola entrada."
        },
        "howItWorks": {
          "title": "Cómo Convertir",
          "content": "Ingresa tu valor y selecciona la unidad origen desde el menú desplegable. El convertidor muestra instantáneamente el equivalente en todas las otras unidades de este tipo. Todas las conversiones usan factores precisos de estándares internacionales (NIST/BIPM)."
        },
        "considerations": {
          "title": "Notas Importantes",
          "items": [
            {
              "text": "Estimación rápida: 1 nudo ≈ 1.15 mph ≈ 1.85 km/h",
              "type": "info"
            },
            {
              "text": "Selecciona cualquier unidad del menú desplegable para cambiar la unidad origen.",
              "type": "info"
            },
            {
              "text": "Todas las conversiones son bidireccionales — funcionan en ambos sentidos.",
              "type": "info"
            },
            {
              "text": "Los resultados se calculan usando factores de conversión exactos.",
              "type": "info"
            },
            {
              "text": "Para números muy grandes o pequeños, se puede usar notación científica.",
              "type": "info"
            },
            {
              "text": "Guarda esta página en marcadores para acceso rápido a este convertidor.",
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
              "text": "Usa los valores predefinidos arriba para cantidades frecuentes.",
              "type": "info"
            },
            {
              "text": "Todos los resultados se actualizan en tiempo real mientras escribes.",
              "type": "info"
            },
            {
              "text": "Funciona en móviles — úsalo en cualquier lugar.",
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
                "Ingresa valor en unidad origen",
                "Lee resultado en unidad destino",
                "Usa menú desplegable para cambiar unidad origen"
              ],
              "result": "Resultado de conversión instantáneo"
            },
            {
              "title": "Conversión Inversa",
              "steps": [
                "Cambia el menú desplegable a la unidad destino",
                "Ingresa tu valor",
                "Lee el resultado en la unidad original"
              ],
              "result": "Funciona en ambos sentidos — solo cambia el menú desplegable"
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
          "answer": "¡Sí! Simplemente cambia la unidad en el menú desplegable para convertir desde cualquier unidad a todas las demás. El convertidor es completamente bidireccional."
        },
        {
          "question": "¿Qué unidades son compatibles?",
          "answer": "Este convertidor admite todas las unidades en la categoría de velocidad: nudos, mph, kmh, ms, fts. Selecciona cualquiera del menú desplegable."
        },
        {
          "question": "¿Funciona esto en móviles?",
          "answer": "Sí, este convertidor es completamente adaptativo y funciona en cualquier dispositivo — teléfono, tablet o escritorio."
        },
        {
          "question": "¿Puedo compartir mi resultado de conversión?",
          "answer": "¡Sí! Usa el botón Compartir Resultados para generar un enlace con tu conversión exacta que puedes enviar a cualquiera."
        },
        {
          "question": "¿Es gratuito este convertidor?",
          "answer": "Sí, 100% gratuito sin registro requerido. Úsalo tantas veces como necesites."
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
      "name": "Conversor de Nós para MPH",
      "slug": "calculadora-nos-para-mph",
      "subtitle": "Converta nós para mph e km/h para navegação, aviação e previsão meteorológica.",
      "breadcrumb": "Nós para MPH",
      "seo": {
        "title": "Conversor de Nós para MPH - Conversão de Velocidade Náutica",
        "description": "Converta nós para milhas por hora para navegação, aviação e meteorologia. 1 nó = 1,151 mph = 1,852 km/h.",
        "shortDescription": "Converta nós para mph e km/h para navegação, aviação e previsão meteorológica.",
        "keywords": [
          "nós para mph",
          "conversor velocidade náutica",
          "nós milhas por hora",
          "velocidade navegação",
          "conversão velocidade aviação",
          "velocidade vento nós"
        ]
      },
      "inputs": {
        "amount": {
          "label": "Velocidade",
          "helpText": "Digite a velocidade para converter"
        }
      },
      "results": {
        "primary": {
          "label": "Resultado"
        }
      },
      "presets": {
        "breeze": {
          "label": "🌬️ 15 nós",
          "description": "15 nós (brisa suave)"
        },
        "sailing": {
          "label": "⛵ 30 nós",
          "description": "30 nós (vento forte)"
        },
        "jet": {
          "label": "✈️ 500 nós",
          "description": "500 nós (jato comercial)"
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
            "Estimativa rápida: 1 nó ≈ 1,15 mph ≈ 1,85 km/h",
            "Selecione qualquer unidade no menu suspenso para converter a partir dessa unidade.",
            "Os resultados são atualizados instantaneamente enquanto você digita.",
            "Use as predefinições para valores de conversão comuns."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Sobre Esta Conversão",
          "content": "Converta nós para milhas por hora para navegação, aviação e meteorologia. 1 nó = 1,151 mph = 1,852 km/h. Este conversor suporta todas as unidades relacionadas na categoria de velocidade, permitindo converter entre qualquer combinação com uma única entrada."
        },
        "howItWorks": {
          "title": "Como Converter",
          "content": "Digite seu valor e selecione a unidade de origem no menu suspenso. O conversor mostra instantaneamente o equivalente em todas as outras unidades deste tipo. Todas as conversões usam fatores precisos dos padrões internacionais (NIST/BIPM)."
        },
        "considerations": {
          "title": "Notas Importantes",
          "items": [
            {
              "text": "Estimativa rápida: 1 nó ≈ 1,15 mph ≈ 1,85 km/h",
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
              "text": "Marque esta página para acesso rápido a este conversor.",
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
              "text": "Use as predefinições acima para quantidades usadas frequentemente.",
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
                "Digite o valor na unidade de origem",
                "Leia o resultado na unidade de destino",
                "Use o menu suspenso para alterar a unidade de origem"
              ],
              "result": "Resultado de conversão instantânea"
            },
            {
              "title": "Conversão Reversa",
              "steps": [
                "Altere o menu suspenso para a unidade de destino",
                "Digite seu valor",
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
          "answer": "Este conversor suporta todas as unidades na categoria de velocidade: nós, mph, km/h, m/s, ft/s. Selecione qualquer uma no menu suspenso."
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
      },
      "calculator": {
        "yourInformation": "Suas Informações"
      }
    },
    fr: {
      "name": "Convertisseur Nœuds vers MPH",
      "slug": "convertisseur-noeuds-vers-mph",
      "subtitle": "Convertissez les nœuds en mph et km/h pour la navigation, l'aviation et les prévisions météorologiques.",
      "breadcrumb": "Nœuds vers MPH",
      "seo": {
        "title": "Convertisseur Nœuds vers MPH - Conversion de Vitesse Nautique",
        "description": "Convertissez les nœuds en miles par heure pour la navigation, l'aviation et la météo. 1 nœud = 1,151 mph = 1,852 km/h.",
        "shortDescription": "Convertissez les nœuds en mph et km/h pour la navigation, l'aviation et les prévisions météorologiques.",
        "keywords": [
          "nœuds vers mph",
          "convertisseur vitesse nautique",
          "nœuds miles par heure",
          "vitesse navigation",
          "conversion vitesse aviation",
          "vitesse vent nœuds"
        ]
      },
      "inputs": {
        "amount": {
          "label": "Vitesse",
          "helpText": "Entrez la vitesse à convertir"
        }
      },
      "results": {
        "primary": {
          "label": "Résultat"
        }
      },
      "presets": {
        "breeze": {
          "label": "🌬️ 15 nd",
          "description": "15 nd (brise légère)"
        },
        "sailing": {
          "label": "⛵ 30 nd",
          "description": "30 nd (vent fort)"
        },
        "jet": {
          "label": "✈️ 500 nd",
          "description": "500 nd (avion de ligne)"
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
              "label": "Additionnel",
              "valueKey": "secondary3"
            }
          ]
        },
        "tips": {
          "title": "Conseils de Conversion",
          "items": [
            "Estimation rapide : 1 nœud ≈ 1,15 mph ≈ 1,85 km/h",
            "Sélectionnez n'importe quelle unité dans le menu déroulant pour convertir depuis cette unité.",
            "Les résultats se mettent à jour instantanément pendant que vous tapez.",
            "Utilisez les préréglages pour les valeurs de conversion courantes."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "À Propos de Cette Conversion",
          "content": "Convertissez les nœuds en miles par heure pour la navigation, l'aviation et la météo. 1 nœud = 1,151 mph = 1,852 km/h. Ce convertisseur prend en charge toutes les unités liées dans la catégorie vitesse, vous permettant de convertir entre n'importe quelle combinaison avec une seule saisie."
        },
        "howItWorks": {
          "title": "Comment Convertir",
          "content": "Entrez votre valeur et sélectionnez l'unité source dans le menu déroulant. Le convertisseur affiche instantanément l'équivalent dans toutes les autres unités de ce type. Toutes les conversions utilisent des facteurs précis des normes internationales (NIST/BIPM)."
        },
        "considerations": {
          "title": "Notes Importantes",
          "items": [
            {
              "text": "Estimation rapide : 1 nœud ≈ 1,15 mph ≈ 1,85 km/h",
              "type": "info"
            },
            {
              "text": "Sélectionnez n'importe quelle unité dans le menu déroulant pour changer l'unité source.",
              "type": "info"
            },
            {
              "text": "Toutes les conversions sont bidirectionnelles — fonctionnent dans les deux sens.",
              "type": "info"
            },
            {
              "text": "Les résultats sont calculés en utilisant des facteurs de conversion exacts.",
              "type": "info"
            },
            {
              "text": "Pour de très grands ou très petits nombres, la notation scientifique peut être utilisée.",
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
              "text": "Consultez la carte Référence Rapide pour les valeurs courantes.",
              "type": "info"
            },
            {
              "text": "Utilisez les préréglages ci-dessus pour les montants fréquemment utilisés.",
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
          "answer": "Oui ! Changez simplement l'unité dans le menu déroulant pour convertir depuis n'importe quelle unité vers toutes les autres. Le convertisseur est entièrement bidirectionnel."
        },
        {
          "question": "Quelles unités sont prises en charge ?",
          "answer": "Ce convertisseur prend en charge toutes les unités dans la catégorie vitesse : nœuds, mph, km/h, m/s, pi/s. Sélectionnez n'importe laquelle dans le menu déroulant."
        },
        {
          "question": "Cela fonctionne-t-il sur mobile ?",
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
      "name": "Knoten zu MPH Umrechner",
      "slug": "knoten-zu-meilen-pro-stunde-rechner",
      "subtitle": "Konvertiere Knoten zu mph und km/h für Segeln, Luftfahrt und Wettervorhersage.",
      "breadcrumb": "Knoten zu MPH",
      "seo": {
        "title": "Knoten zu MPH Umrechner - Nautische Geschwindigkeitsumrechnung",
        "description": "Konvertiere Knoten zu Meilen pro Stunde für Segeln, Luftfahrt und Wetter. 1 Knoten = 1,151 mph = 1,852 km/h.",
        "shortDescription": "Konvertiere Knoten zu mph und km/h für Segeln, Luftfahrt und Wettervorhersage.",
        "keywords": [
          "knoten zu mph",
          "nautischer geschwindigkeitsumrechner",
          "knoten meilen pro stunde",
          "segelgeschwindigkeit",
          "luftfahrt geschwindigkeitsumrechnung",
          "windgeschwindigkeit knoten"
        ]
      },
      "inputs": {
        "amount": {
          "label": "Geschwindigkeit",
          "helpText": "Geben Sie die zu konvertierende Geschwindigkeit ein"
        }
      },
      "results": {
        "primary": {
          "label": "Ergebnis"
        }
      },
      "presets": {
        "breeze": {
          "label": "🌬️ 15 kn",
          "description": "15 kn (sanfte Brise)"
        },
        "sailing": {
          "label": "⛵ 30 kn",
          "description": "30 kn (starker Wind)"
        },
        "jet": {
          "label": "✈️ 500 kn",
          "description": "500 kn (Verkehrsflugzeug)"
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
            "Schnelle Schätzung: 1 Knoten ≈ 1,15 mph ≈ 1,85 km/h",
            "Wählen Sie eine beliebige Einheit aus der Dropdown-Liste, um von dieser Einheit umzurechnen.",
            "Ergebnisse werden sofort beim Tippen aktualisiert.",
            "Verwenden Sie Voreinstellungen für häufige Umrechnungswerte."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Über diese Umrechnung",
          "content": "Konvertiere Knoten zu Meilen pro Stunde für Segeln, Luftfahrt und Wetter. 1 Knoten = 1,151 mph = 1,852 km/h. Dieser Umrechner unterstützt alle verwandten Einheiten in der Geschwindigkeitskategorie und ermöglicht Ihnen die Umrechnung zwischen beliebigen Kombinationen mit einer einzigen Eingabe."
        },
        "howItWorks": {
          "title": "So rechnen Sie um",
          "content": "Geben Sie Ihren Wert ein und wählen Sie die Quelleinheit aus der Dropdown-Liste. Der Umrechner zeigt sofort das Äquivalent in allen anderen Einheiten dieses Typs an. Alle Umrechnungen verwenden präzise Faktoren aus internationalen Standards (NIST/BIPM)."
        },
        "considerations": {
          "title": "Wichtige Hinweise",
          "items": [
            {
              "text": "Schnelle Schätzung: 1 Knoten ≈ 1,15 mph ≈ 1,85 km/h",
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
              "text": "Bei sehr großen oder kleinen Zahlen kann wissenschaftliche Notation verwendet werden.",
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
              "text": "Verwenden Sie Voreinstellungen oben für häufig verwendete Beträge.",
              "type": "info"
            },
            {
              "text": "Alle Ergebnisse werden in Echtzeit beim Tippen aktualisiert.",
              "type": "info"
            },
            {
              "text": "Funktioniert auf Mobilgeräten — verwenden Sie es überall.",
              "type": "info"
            },
            {
              "text": "Teilen Sie Ergebnisse mit dem Teilen-Button unten.",
              "type": "info"
            },
            {
              "text": "Speichern Sie Ergebnisse für später mit dem Speichern-Button.",
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
                "Geben Sie den Wert in der Quelleinheit ein",
                "Lesen Sie das Ergebnis in der Zieleinheit ab",
                "Verwenden Sie die Dropdown-Liste, um die Quelleinheit zu ändern"
              ],
              "result": "Sofortiges Umrechnungsergebnis"
            },
            {
              "title": "Umgekehrte Umrechnung",
              "steps": [
                "Ändern Sie die Dropdown-Liste zur Zieleinheit",
                "Geben Sie Ihren Wert ein",
                "Lesen Sie das Ergebnis in der ursprünglichen Einheit ab"
              ],
              "result": "Funktioniert in beide Richtungen — ändern Sie einfach die Dropdown-Liste"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Wie genau sind diese Umrechnungen?",
          "answer": "Alle Umrechnungen verwenden exakte Faktoren aus NIST- und BIPM-internationalen Standards. Ergebnisse sind auf mindestens 6 signifikante Stellen genau."
        },
        {
          "question": "Kann ich in umgekehrter Richtung umrechnen?",
          "answer": "Ja! Ändern Sie einfach die Einheit in der Dropdown-Liste, um von jeder Einheit zu allen anderen umzurechnen. Der Umrechner ist vollständig bidirektional."
        },
        {
          "question": "Welche Einheiten werden unterstützt?",
          "answer": "Dieser Umrechner unterstützt alle Einheiten in der Geschwindigkeitskategorie: Knoten, mph, km/h, m/s, ft/s. Wählen Sie eine beliebige aus der Dropdown-Liste."
        },
        {
          "question": "Funktioniert das auf Mobilgeräten?",
          "answer": "Ja, dieser Umrechner ist vollständig responsiv und funktioniert auf jedem Gerät — Telefon, Tablet oder Desktop."
        },
        {
          "question": "Kann ich mein Umrechnungsergebnis teilen?",
          "answer": "Ja! Verwenden Sie den Button \"Ergebnisse teilen\", um einen Link mit Ihrer exakten Umrechnung zu erstellen, den Sie an jeden senden können."
        },
        {
          "question": "Ist dieser Umrechner kostenlos?",
          "answer": "Ja, 100% kostenlos ohne Registrierung erforderlich. Verwenden Sie ihn so oft Sie möchten."
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
      defaultValue: 15,
      placeholder: "15",
      min: 0,
      step: 1,
      unitType: "speed",
      syncGroup: false,
      defaultUnit: "knots",
      allowedUnits: ["knots", "mph", "kmh", "ms", "fts"],
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

export function calculateKnotsToMph(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits = {} } = data;
  const amount = values.amount as number;
  const fromUnit = fieldUnits.amount || "knots";

  if (amount === undefined || amount === null || amount < 0) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  const unitGroup = UNIT_REGISTRY["speed"];
  const units = unitGroup?.units || [];
  const results: Record<string, number> = {};
  const formatted: Record<string, string> = {};

  // Convert to all available units
  for (const unit of units) {
    try {
      const converted = convert(amount, fromUnit, unit.id, "speed");
      results[unit.id] = converted;
      formatted[unit.id] = `${fmtNum(converted)} ${unit.symbol}`;
    } catch {
      // Skip units that can't convert
    }
  }

  // Map to standard result keys
  const allUnits = ["knots", "mph", "kmh", "ms", "fts"];
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

export default knotsToMphConfig;
