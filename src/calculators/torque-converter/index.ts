import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";
import { convert, UNIT_REGISTRY } from "@/engine/v4/units";

export const torqueConverterConfig: CalculatorConfigV4 = {
  id: "torque-converter",
  version: "4.0",
  category: "conversion",
  icon: "🔩",

  presets: [
    { id: "wheel", icon: "🛞", values: { amount: 110 } },
    { id: "engine", icon: "🏎️", values: { amount: 350 } },
    { id: "diesel", icon: "🚛", values: { amount: 800 } },
  ],

  t: {
    en: {
      name: "Torque Converter (Nm to ft·lbf)",
      slug: "torque-converter",
      subtitle: "Convert Nm to ft·lbf and other torque units for automotive and mechanical applications.",
      breadcrumb: "Torque (Nm to ft·lbf)",

      seo: {
        title: "Torque Converter - Nm to ft·lbf Conversion Tool",
        description: "Convert Newton-meters to foot-pounds and other torque units. Essential for automotive, engineering, and mechanical work.",
        shortDescription: "Convert Nm to ft·lbf and other torque units for automotive and mechanical applic",
        keywords: ["torque converter", "Nm to ft lbs", "newton meter to foot pound", "torque conversion", "engine torque calculator", "bolt torque converter"],
      },

      calculator: { yourInformation: "Enter Torque" },
      ui: { yourInformation: "Enter Torque", calculate: "Convert", reset: "Reset", results: "Results" },

      inputs: {
        amount: { label: "Torque", helpText: "Enter the torque to convert" },
      },

      results: {
        primary: { label: "Result" },
      },

      presets: {
        wheel: { label: "🛞 110 Nm", description: "110 Nm (lug nuts)" },
        engine: { label: "🏎️ 350 Nm", description: "350 Nm (V6 engine)" },
        diesel: { label: "🚛 800 Nm", description: "800 Nm (diesel)" },
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
            "Quick estimate: 1 Nm ≈ 0.738 ft·lbf",
            "Select any unit from the dropdown to convert from that unit instead.",
            "Results update instantly as you type.",
            "Use presets for common conversion values.",
          ],
        },
      },

      education: {
        whatIs: {
          title: "About This Conversion",
          content: "Convert Newton-meters to foot-pounds and other torque units. Essential for automotive, engineering, and mechanical work. This converter supports all related units in the torque category, letting you convert between any combination with a single input.",
        },
        howItWorks: {
          title: "How to Convert",
          content: "Enter your value and select the source unit from the dropdown. The converter instantly shows the equivalent in all other units of this type. All conversions use precise factors from international standards (NIST/BIPM).",
        },
        considerations: {
          title: "Important Notes",
          items: [
            { text: "Quick estimate: 1 Nm ≈ 0.738 ft·lbf", type: "info" },
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
        { question: "What units are supported?", answer: "This converter supports all units in the torque category: Nm, ftlbf, kgfm, inlbf. Select any from the dropdown." },
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
      "name": "Convertidor de Par Motor (Nm a ft·lbf)",
      "slug": "calculadora-convertidor-par-motor",
      "subtitle": "Convierte Nm a ft·lbf y otras unidades de par motor para aplicaciones automotrices y mecánicas.",
      "breadcrumb": "Par Motor (Nm a ft·lbf)",
      "seo": {
        "title": "Convertidor de Par Motor - Herramienta de Conversión Nm a ft·lbf",
        "description": "Convierte Newton-metro a pie-libra y otras unidades de par motor. Esencial para trabajo automotriz, ingeniería y mecánico.",
        "shortDescription": "Convierte Nm a ft·lbf y otras unidades de par motor para aplicaciones automotrices y mecánicas",
        "keywords": [
          "convertidor par motor",
          "Nm a ft lbs",
          "newton metro a pie libra",
          "conversión par motor",
          "calculadora par motor",
          "convertidor par pernos"
        ]
      },
      "calculator": {
        "yourInformation": "Tu Información"
      },
      "inputs": {
        "amount": {
          "label": "Par Motor",
          "helpText": "Ingresa el par motor a convertir"
        }
      },
      "results": {
        "primary": {
          "label": "Resultado"
        }
      },
      "presets": {
        "wheel": {
          "label": "🛞 110 Nm",
          "description": "110 Nm (tuercas de rueda)"
        },
        "engine": {
          "label": "🏎️ 350 Nm",
          "description": "350 Nm (motor V6)"
        },
        "diesel": {
          "label": "🚛 800 Nm",
          "description": "800 Nm (diésel)"
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
            "Estimación rápida: 1 Nm ≈ 0.738 ft·lbf",
            "Selecciona cualquier unidad del menú desplegable para convertir desde esa unidad.",
            "Los resultados se actualizan instantáneamente mientras escribes.",
            "Usa los valores predeterminados para conversiones comunes."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Acerca de Esta Conversión",
          "content": "Convierte Newton-metro a pie-libra y otras unidades de par motor. Esencial para trabajo automotriz, ingeniería y mecánico. Este convertidor soporta todas las unidades relacionadas en la categoría de par motor, permitiéndote convertir entre cualquier combinación con una sola entrada."
        },
        "howItWorks": {
          "title": "Cómo Convertir",
          "content": "Ingresa tu valor y selecciona la unidad de origen del menú desplegable. El convertidor muestra instantáneamente el equivalente en todas las otras unidades de este tipo. Todas las conversiones usan factores precisos de estándares internacionales (NIST/BIPM)."
        },
        "considerations": {
          "title": "Notas Importantes",
          "items": [
            {
              "text": "Estimación rápida: 1 Nm ≈ 0.738 ft·lbf",
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
              "text": "Para números muy grandes o pequeños, se puede usar notación científica.",
              "type": "info"
            },
            {
              "text": "Guarda esta página en favoritos para acceso rápido a este convertidor.",
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
              "text": "Usa los valores predeterminados arriba para cantidades frecuentes.",
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
              "text": "Guarda resultados para más tarde con el botón Guardar.",
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
                "Ingresa valor en unidad de origen",
                "Lee resultado en unidad destino",
                "Usa menú desplegable para cambiar unidad de origen"
              ],
              "result": "Resultado de conversión instantánea"
            },
            {
              "title": "Conversión Inversa",
              "steps": [
                "Cambia el menú desplegable a la unidad destino",
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
          "answer": "¡Sí! Simplemente cambia la unidad en el menú desplegable para convertir desde cualquier unidad a todas las otras. El convertidor es completamente bidireccional."
        },
        {
          "question": "¿Qué unidades son compatibles?",
          "answer": "Este convertidor soporta todas las unidades en la categoría de par motor: Nm, ftlbf, kgfm, inlbf. Selecciona cualquiera del menú desplegable."
        },
        {
          "question": "¿Funciona en móviles?",
          "answer": "Sí, este convertidor es completamente responsivo y funciona en cualquier dispositivo — teléfono, tableta o escritorio."
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
      }
    },
    pt: {
      "name": "Conversor de Torque (Nm para ft·lbf)",
      "slug": "calculadora-conversor-torque",
      "subtitle": "Converta Nm para ft·lbf e outras unidades de torque para aplicações automotivas e mecânicas.",
      "breadcrumb": "Torque (Nm para ft·lbf)",
      "seo": {
        "title": "Conversor de Torque - Ferramenta de Conversão Nm para ft·lbf",
        "description": "Converta Newton-metros para pé-libras e outras unidades de torque. Essencial para trabalhos automotivos, engenharia e mecânica.",
        "shortDescription": "Converta Nm para ft·lbf e outras unidades de torque para aplicações automotivas e mecânicas",
        "keywords": [
          "conversor de torque",
          "Nm para ft lbs",
          "newton metro para pé libra",
          "conversão de torque",
          "calculadora torque motor",
          "conversor torque parafuso"
        ]
      },
      "inputs": {
        "amount": {
          "label": "Torque",
          "helpText": "Digite o torque para converter"
        }
      },
      "results": {
        "primary": {
          "label": "Resultado"
        }
      },
      "presets": {
        "wheel": {
          "label": "🛞 110 Nm",
          "description": "110 Nm (porcas das rodas)"
        },
        "engine": {
          "label": "🏎️ 350 Nm",
          "description": "350 Nm (motor V6)"
        },
        "diesel": {
          "label": "🚛 800 Nm",
          "description": "800 Nm (diesel)"
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
            "Estimativa rápida: 1 Nm ≈ 0,738 ft·lbf",
            "Selecione qualquer unidade no menu suspenso para converter a partir dessa unidade.",
            "Os resultados são atualizados instantaneamente enquanto você digita.",
            "Use as predefinições para valores de conversão comuns."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Sobre Esta Conversão",
          "content": "Converta Newton-metros para pé-libras e outras unidades de torque. Essencial para trabalhos automotivos, engenharia e mecânica. Este conversor suporta todas as unidades relacionadas na categoria de torque, permitindo converter entre qualquer combinação com uma única entrada."
        },
        "howItWorks": {
          "title": "Como Converter",
          "content": "Digite seu valor e selecione a unidade de origem no menu suspenso. O conversor mostra instantaneamente o equivalente em todas as outras unidades deste tipo. Todas as conversões usam fatores precisos de padrões internacionais (NIST/BIPM)."
        },
        "considerations": {
          "title": "Notas Importantes",
          "items": [
            {
              "text": "Estimativa rápida: 1 Nm ≈ 0,738 ft·lbf",
              "type": "info"
            },
            {
              "text": "Selecione qualquer unidade no menu suspenso para alterar a unidade de origem.",
              "type": "info"
            },
            {
              "text": "Todas as conversões são bidirecionais — funciona nos dois sentidos.",
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
              "result": "Resultado de conversão instantâneo"
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
          "answer": "Todas as conversões usam fatores exatos dos padrões internacionais NIST e BIPM. Os resultados são precisos com pelo menos 6 dígitos significativos."
        },
        {
          "question": "Posso converter na direção reversa?",
          "answer": "Sim! Simplesmente altere a unidade no menu suspenso para converter de qualquer unidade para todas as outras. O conversor é totalmente bidirecional."
        },
        {
          "question": "Quais unidades são suportadas?",
          "answer": "Este conversor suporta todas as unidades na categoria de torque: Nm, ft·lbf, kgf·m, in·lbf. Selecione qualquer uma no menu suspenso."
        },
        {
          "question": "Funciona no celular?",
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
      "name": "Convertisseur de Couple (Nm vers ft·lbf)",
      "slug": "calculateur-convertisseur-couple",
      "subtitle": "Convertissez Nm vers ft·lbf et autres unités de couple pour applications automobiles et mécaniques.",
      "breadcrumb": "Couple (Nm vers ft·lbf)",
      "seo": {
        "title": "Convertisseur de Couple - Outil de Conversion Nm vers ft·lbf",
        "description": "Convertissez Newton-mètres vers livres-pieds et autres unités de couple. Essentiel pour le travail automobile, ingénierie et mécanique.",
        "shortDescription": "Convertissez Nm vers ft·lbf et autres unités de couple pour applications automobiles et mécaniques",
        "keywords": [
          "convertisseur couple",
          "Nm vers ft lbs",
          "newton mètre vers livre pied",
          "conversion couple",
          "calculateur couple moteur",
          "convertisseur couple boulon"
        ]
      },
      "inputs": {
        "amount": {
          "label": "Couple",
          "helpText": "Entrez le couple à convertir"
        }
      },
      "results": {
        "primary": {
          "label": "Résultat"
        }
      },
      "presets": {
        "wheel": {
          "label": "🛞 110 Nm",
          "description": "110 Nm (écrous de roue)"
        },
        "engine": {
          "label": "🏎️ 350 Nm",
          "description": "350 Nm (moteur V6)"
        },
        "diesel": {
          "label": "🚛 800 Nm",
          "description": "800 Nm (diesel)"
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
            "Estimation rapide : 1 Nm ≈ 0,738 ft·lbf",
            "Sélectionnez n'importe quelle unité dans le menu déroulant pour convertir depuis cette unité.",
            "Les résultats se mettent à jour instantanément pendant la saisie.",
            "Utilisez les préréglages pour les valeurs de conversion courantes."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "À Propos de Cette Conversion",
          "content": "Convertissez Newton-mètres vers livres-pieds et autres unités de couple. Essentiel pour le travail automobile, ingénierie et mécanique. Ce convertisseur prend en charge toutes les unités liées dans la catégorie couple, vous permettant de convertir entre toute combinaison avec une seule saisie."
        },
        "howItWorks": {
          "title": "Comment Convertir",
          "content": "Entrez votre valeur et sélectionnez l'unité source dans le menu déroulant. Le convertisseur affiche instantanément l'équivalent dans toutes les autres unités de ce type. Toutes les conversions utilisent des facteurs précis des normes internationales (NIST/BIPM)."
        },
        "considerations": {
          "title": "Notes Importantes",
          "items": [
            {
              "text": "Estimation rapide : 1 Nm ≈ 0,738 ft·lbf",
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
              "text": "Pour les très grands ou petits nombres, la notation scientifique peut être utilisée.",
              "type": "info"
            },
            {
              "text": "Marquez cette page pour un accès rapide à ce convertisseur.",
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
              "text": "Tous les résultats se mettent à jour en temps réel pendant la saisie.",
              "type": "info"
            },
            {
              "text": "Fonctionne sur mobile — utilisez-le partout.",
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
          "answer": "Ce convertisseur prend en charge toutes les unités de la catégorie couple : Nm, ftlbf, kgfm, inlbf. Sélectionnez n'importe laquelle dans le menu déroulant."
        },
        {
          "question": "Est-ce que cela fonctionne sur mobile ?",
          "answer": "Oui, ce convertisseur est entièrement adaptatif et fonctionne sur n'importe quel appareil — téléphone, tablette ou ordinateur de bureau."
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
      "name": "Drehmoment-Umrechner (Nm zu ft·lbf)",
      "slug": "drehmoment-umrechner",
      "subtitle": "Konvertieren Sie Nm zu ft·lbf und andere Drehmoment-Einheiten für Automobil- und Maschinenbauanwendungen.",
      "breadcrumb": "Drehmoment (Nm zu ft·lbf)",
      "seo": {
        "title": "Drehmoment-Umrechner - Nm zu ft·lbf Umrechnungstool",
        "description": "Konvertieren Sie Newtonmeter zu Foot-Pounds und andere Drehmoment-Einheiten. Unverzichtbar für Automobil-, Ingenieur- und Maschinenbauarbeiten.",
        "shortDescription": "Konvertieren Sie Nm zu ft·lbf und andere Drehmoment-Einheiten für Automobil- und Maschinenbauanwendungen",
        "keywords": [
          "Drehmoment-Umrechner",
          "Nm zu ft lbs",
          "Newtonmeter zu Foot-Pound",
          "Drehmoment-Umrechnung",
          "Motor-Drehmoment-Rechner",
          "Schrauben-Drehmoment-Umrechner"
        ]
      },
      "calculator": {
        "yourInformation": "Ihre Informationen"
      },
      "inputs": {
        "amount": {
          "label": "Drehmoment",
          "helpText": "Geben Sie das zu konvertierende Drehmoment ein"
        }
      },
      "results": {
        "primary": {
          "label": "Ergebnis"
        }
      },
      "presets": {
        "wheel": {
          "label": "🛞 110 Nm",
          "description": "110 Nm (Radmuttern)"
        },
        "engine": {
          "label": "🏎️ 350 Nm",
          "description": "350 Nm (V6 Motor)"
        },
        "diesel": {
          "label": "🚛 800 Nm",
          "description": "800 Nm (Diesel)"
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
            "Schnelle Schätzung: 1 Nm ≈ 0,738 ft·lbf",
            "Wählen Sie eine beliebige Einheit aus dem Dropdown-Menü, um von dieser Einheit zu konvertieren.",
            "Ergebnisse werden sofort beim Tippen aktualisiert.",
            "Verwenden Sie Voreinstellungen für häufige Umrechnungswerte."
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Über diese Umrechnung",
          "content": "Konvertieren Sie Newtonmeter zu Foot-Pounds und andere Drehmoment-Einheiten. Unverzichtbar für Automobil-, Ingenieur- und Maschinenbauarbeiten. Dieser Umrechner unterstützt alle verwandten Einheiten in der Drehmoment-Kategorie und ermöglicht die Umrechnung zwischen beliebigen Kombinationen mit einer einzigen Eingabe."
        },
        "howItWorks": {
          "title": "So funktioniert die Umrechnung",
          "content": "Geben Sie Ihren Wert ein und wählen Sie die Quelleinheit aus dem Dropdown-Menü. Der Umrechner zeigt sofort das Äquivalent in allen anderen Einheiten dieses Typs an. Alle Umrechnungen verwenden präzise Faktoren aus internationalen Standards (NIST/BIPM)."
        },
        "considerations": {
          "title": "Wichtige Hinweise",
          "items": [
            {
              "text": "Schnelle Schätzung: 1 Nm ≈ 0,738 ft·lbf",
              "type": "info"
            },
            {
              "text": "Wählen Sie eine beliebige Einheit aus dem Dropdown-Menü, um die Quelleinheit zu ändern.",
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
              "text": "Setzen Sie ein Lesezeichen für schnellen Zugriff auf diesen Umrechner.",
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
              "title": "Rückwärts-Umrechnung",
              "steps": [
                "Dropdown auf Zieleinheit ändern",
                "Ihren Wert eingeben",
                "Ergebnis in ursprünglicher Einheit ablesen"
              ],
              "result": "Funktioniert in beide Richtungen — einfach Dropdown ändern"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Wie genau sind diese Umrechnungen?",
          "answer": "Alle Umrechnungen verwenden exakte Faktoren aus NIST- und BIPM-Internationalen Standards. Ergebnisse sind auf mindestens 6 signifikante Stellen genau."
        },
        {
          "question": "Kann ich in umgekehrter Richtung umrechnen?",
          "answer": "Ja! Ändern Sie einfach die Einheit im Dropdown-Menü, um von jeder Einheit zu allen anderen zu konvertieren. Der Umrechner ist vollständig bidirektional."
        },
        {
          "question": "Welche Einheiten werden unterstützt?",
          "answer": "Dieser Umrechner unterstützt alle Einheiten in der Drehmoment-Kategorie: Nm, ft·lbf, kgf·m, in·lbf. Wählen Sie eine beliebige aus dem Dropdown-Menü."
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
      }
    },
  },

  inputs: [
    {
      id: "amount",
      type: "number",
      defaultValue: 110,
      placeholder: "110",
      min: 0,
      step: 1,
      unitType: "torque",
      syncGroup: false,
      defaultUnit: "Nm",
      allowedUnits: ["Nm", "ftlbf", "kgfm", "inlbf"],
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

export function calculateTorqueConverter(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits = {} } = data;
  const amount = values.amount as number;
  const fromUnit = fieldUnits.amount || "Nm";

  if (amount === undefined || amount === null || amount < 0) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  const unitGroup = UNIT_REGISTRY["torque"];
  const units = unitGroup?.units || [];
  const results: Record<string, number> = {};
  const formatted: Record<string, string> = {};

  // Convert to all available units
  for (const unit of units) {
    try {
      const converted = convert(amount, fromUnit, unit.id, "torque");
      results[unit.id] = converted;
      formatted[unit.id] = `${fmtNum(converted)} ${unit.symbol}`;
    } catch {
      // Skip units that can't convert
    }
  }

  // Map to standard result keys
  const allUnits = ["Nm", "ftlbf", "kgfm", "inlbf"];
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

export default torqueConverterConfig;
