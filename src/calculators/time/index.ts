import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";

// =============================================================================
// TIME CALCULATOR — Add, Subtract, Convert Time Durations
// Uses V4.3 custom TimeInput component (h|m|s inline fields)
// =============================================================================

export const timeCalculatorConfig: CalculatorConfigV4 = {
  id: "time",
  version: "4.0",
  category: "everyday",
  icon: "⏰",

  presets: [
    {
      id: "workday",
      icon: "💼",
      values: {
        operation: "add",
        time1: 30600,   // 8h 30m 0s in seconds
        time2: 4500,    // 1h 15m 0s in seconds
      },
    },
    {
      id: "marathon",
      icon: "🏃",
      values: {
        operation: "subtract",
        time1: 16200,   // 4h 30m 0s
        time2: 13500,   // 3h 45m 0s
      },
    },
    {
      id: "cooking",
      icon: "🍳",
      values: {
        operation: "add",
        time1: 2700,    // 0h 45m 0s
        time2: 5400,    // 1h 30m 0s
      },
    },],

  t: {
    en: {
      name: "Time Calculator",
      slug: "time-calculator",
      subtitle: "Add, subtract, and convert time durations with hours, minutes, and seconds.",
      breadcrumb: "Time Calc",

      seo: {
        title: "Time Calculator - Add & Subtract Hours, Minutes, Seconds",
        description: "Calculate time durations by adding or subtracting hours, minutes, and seconds. Get instant results in multiple formats with a free, easy-to-use online tool.",
        shortDescription: "Add and subtract time durations instantly.",
        keywords: [
          "time calculator",
          "add time",
          "subtract time",
          "hours minutes seconds calculator",
          "time duration calculator",
          "free time calculator",
          "online time calculator",
          "time addition",
        ],
      },

      calculator: { yourInformation: "Time Calculator" },
      ui: {
        yourInformation: "Time Calculator",
        calculate: "Calculate",
        reset: "Reset",
        results: "Results",
      },

      inputs: {
        operation: {
          label: "Operation",
          helpText: "Choose to add or subtract durations",
          options: {
            add: "Add (+)",
            subtract: "Subtract (−)",
          },
        },
        time1: {
          label: "Time 1",
          helpText: "Enter first duration",
          hoursLabel: "hrs",
          minutesLabel: "min",
          secondsLabel: "sec",
        },
        time2: {
          label: "Time 2",
          helpText: "Enter second duration",
          hoursLabel: "hrs",
          minutesLabel: "min",
          secondsLabel: "sec",
        },
        outputFormat: {
          label: "Output Format",
          helpText: "Choose how results are displayed",
          options: {
            hms: "Hours : Minutes : Seconds",
            decimal: "Decimal Hours (e.g. 2.50 hrs)",
            minutes: "Total Minutes",
            seconds: "Total Seconds",
          },
        },
      },

      results: {
        totalTime: { label: "Total Time" },
        totalHours: { label: "In Hours" },
        totalMinutes: { label: "In Minutes" },
        totalSeconds: { label: "In Seconds" },
      },

      presets: {
        workday: { label: "Work Day", description: "8h 30m + 1h 15m" },
        marathon: { label: "Marathon", description: "4h 30m − 3h 45m" },
        cooking: { label: "Cooking", description: "45m + 1h 30m" },
      },

      values: {
        "h": "h",
        "m": "m",
        "s": "s",
        "hours": "hours",
        "hour": "hour",
        "minutes": "minutes",
        "minute": "minute",
        "seconds": "seconds",
        "second": "second",
      },

      formats: {
        summary: "Result: {value}",
      },

      infoCards: {
        metrics: {
          title: "Time Breakdown",
          items: [
            { label: "Hours:Minutes:Seconds", valueKey: "totalTime" },
            { label: "Decimal Hours", valueKey: "totalHours" },
            { label: "Total Minutes", valueKey: "totalMinutes" },
            { label: "Total Seconds", valueKey: "totalSeconds" },
          ],
        },
        details: {
          title: "Input Summary",
          items: [
            { label: "Time 1", valueKey: "time1Display" },
            { label: "Time 2", valueKey: "time2Display" },
            { label: "Operation", valueKey: "operationDisplay" },
            { label: "Output Format", valueKey: "formatDisplay" },
          ],
        },
        tips: {
          title: "Quick Tips",
          items: [
            "Enter hours, minutes, and seconds separately in each field",
            "Decimal hours are useful for timesheet and billing calculations",
            "Negative results show how much Time 2 exceeds Time 1 in subtract mode",
            "Use presets for common scenarios like work hours or cooking times",
          ],
        },
      },

      education: {
        whatIs: {
          title: "What Is a Time Calculator?",
          content: "A time calculator is a tool that performs arithmetic operations on time durations. Unlike regular numbers, time follows a base-60 system where 60 seconds make a minute and 60 minutes make an hour. This makes mental math with time challenging, especially when dealing with hours, minutes, and seconds simultaneously.\n\nTime calculators are essential for professionals who track billable hours, athletes monitoring training durations, cooks combining recipe prep times, and anyone working with schedules across time zones. By automating the conversion between time units, these tools eliminate common errors in time arithmetic.",
        },
        howItWorks: {
          title: "How Time Addition & Subtraction Works",
          content: "Time addition and subtraction follow the sexagesimal (base-60) system. When adding two time values, seconds are added first. If the sum exceeds 59, the overflow carries into minutes. The same carry logic applies from minutes to hours.\n\nFor example, adding 2h 45m 30s and 1h 20m 45s: First, 30s + 45s = 75s = 1m 15s (carry 1 minute). Then, 45m + 20m + 1m (carry) = 66m = 1h 6m (carry 1 hour). Finally, 2h + 1h + 1h (carry) = 4h. Result: 4h 6m 15s.\n\nSubtraction works similarly but with borrowing instead of carrying. If the seconds in the first time are less than the second, you borrow 1 minute (60 seconds) from the minutes column.",
        },
        considerations: {
          title: "Common Use Cases",
          items: [
            { text: "Work hours tracking: Add daily work periods to find total hours for payroll or billing", type: "info" },
            { text: "Cooking and baking: Combine prep time, cooking time, and resting time for recipes", type: "info" },
            { text: "Race timing: Calculate time differences between splits, laps, or finish times", type: "info" },
            { text: "Project management: Estimate total duration by adding individual task times", type: "info" },
            { text: "Travel planning: Add layover times, flight durations, and transfer times", type: "info" },
            { text: "Negative results in subtraction indicate the second time exceeds the first", type: "warning" },
          ],
        },
        categories: {
          title: "Time Unit Conversions",
          items: [
            { text: "1 hour = 60 minutes = 3,600 seconds", type: "info" },
            { text: "1 minute = 60 seconds", type: "info" },
            { text: "1 day = 24 hours = 1,440 minutes = 86,400 seconds", type: "info" },
            { text: "Decimal hours: 1h 30m = 1.50 hours (divide minutes by 60)", type: "info" },
            { text: "Decimal minutes: 2m 30s = 2.50 minutes (divide seconds by 60)", type: "info" },
            { text: "Military time uses 24-hour format: 1:30 PM = 13:30", type: "info" },
          ],
        },
        examples: {
          title: "Step-by-Step Examples",
          description: "How to add and subtract time durations",
          examples: [
            {
              title: "Adding Work Hours: 8h 30m + 1h 15m",
              steps: [
                "Enter 8 in hours, 30 in minutes for Time 1",
                "Enter 1 in hours, 15 in minutes for Time 2",
                "Select Add (+) operation",
                "Result: 8h30m + 1h15m = 9h 45m 00s",
              ],
              result: "9h 45m 00s (9.75 decimal hours)",
            },
            {
              title: "Subtracting Race Times: 4h 30m − 3h 45m",
              steps: [
                "Enter 4 in hours, 30 in minutes for Time 1",
                "Enter 3 in hours, 45 in minutes for Time 2",
                "Select Subtract (−) operation",
                "Result: 4h30m − 3h45m = 0h 45m 00s",
              ],
              result: "0h 45m 00s (45 minutes)",
            },
          ],
        },
      },

      faqs: [
        { question: "How do I add hours and minutes?", answer: "Enter the hours in the 'hrs' field and minutes in the 'min' field for each time value. Select Add (+) and the calculator will handle the base-60 conversion automatically — for example, 45 minutes + 30 minutes correctly gives 1 hour 15 minutes, not 75 minutes." },
        { question: "What does decimal hours mean?", answer: "Decimal hours express time as a decimal fraction of an hour. For example, 1 hour 30 minutes = 1.50 hours, and 2 hours 15 minutes = 2.25 hours. This format is commonly used for billing, timesheets, and payroll calculations where fractions of hours need to be multiplied by hourly rates." },
        { question: "Can this calculator handle negative results?", answer: "Yes. When subtracting, if Time 2 is larger than Time 1, the result will be negative, shown with a minus sign (−). For example, subtracting 3h 45m from 2h 30m gives −1h 15m 00s, meaning Time 2 exceeded Time 1 by 1 hour and 15 minutes." },
        { question: "How accurate is the time calculation?", answer: "The calculator is accurate to the second. It uses precise integer arithmetic for time conversion, avoiding floating-point errors that can occur with decimal representations. All conversions between hours, minutes, and seconds use exact factors (60 seconds per minute, 3600 seconds per hour)." },
        { question: "Can I use this for work hours tracking?", answer: "Absolutely. Enter your start-to-end work periods as time values and add them together. The decimal hours output is especially useful for multiplying by your hourly rate. For example, 8h 30m = 8.50 decimal hours × $25/hr = $212.50." },
        { question: "What time formats are available?", answer: "The calculator offers four output formats: Hours:Minutes:Seconds (standard time format), Decimal Hours (for billing and payroll), Total Minutes (for short durations), and Total Seconds (for precise timing). You can switch between formats using the Output Format selector." },
      ],

      rating: {
        title: "Rate this Calculator",
        share: "Share",
        copied: "Copied!",
        copyLink: "Copy Link",
        clickToRate: "Click to rate",
        youRated: "You rated",
        stars: "stars",
        averageFrom: "average from",
        ratings: "ratings",
      },

      common: { home: "Home", calculators: "Calculators" },

      buttons: {
        calculate: "Calculate",
        reset: "Reset",
        pdf: "PDF",
        csv: "CSV",
        excel: "Excel",
        save: "Save",
        saved: "Saved",
        saving: "Saving...",
      },

      share: { calculatedWith: "Calculated with Kalcufy.com" },
      accessibility: { mobileResults: "Results", closeModal: "Close", openMenu: "Menu" },
      sources: { title: "Sources & References" },
    },
    pt: {
      "name": "Calculadora de Tempo",
      "slug": "calculadora-tempo",
      "subtitle": "Some, subtraia e converta durações de tempo com horas, minutos e segundos.",
      "breadcrumb": "Calc Tempo",
      "seo": {
        "title": "Calculadora de Tempo - Somar e Subtrair Horas, Minutos, Segundos",
        "description": "Calcule durações de tempo somando ou subtraindo horas, minutos e segundos. Obtenha resultados instantâneos em múltiplos formatos com uma ferramenta online gratuita e fácil de usar.",
        "shortDescription": "Some e subtraia durações de tempo instantaneamente.",
        "keywords": [
          "calculadora de tempo",
          "somar tempo",
          "subtrair tempo",
          "calculadora horas minutos segundos",
          "calculadora duração tempo",
          "calculadora tempo gratuita",
          "calculadora tempo online",
          "adição de tempo"
        ]
      },
      "inputs": {
        "operation": {
          "label": "Operação",
          "helpText": "Escolha somar ou subtrair durações",
          "options": {
            "add": "Somar (+)",
            "subtract": "Subtrair (−)"
          }
        },
        "time1": {
          "label": "Tempo 1",
          "helpText": "Insira a primeira duração",
          "hoursLabel": "hrs",
          "minutesLabel": "min",
          "secondsLabel": "seg"
        },
        "time2": {
          "label": "Tempo 2",
          "helpText": "Insira a segunda duração",
          "hoursLabel": "hrs",
          "minutesLabel": "min",
          "secondsLabel": "seg"
        },
        "outputFormat": {
          "label": "Formato de Saída",
          "helpText": "Escolha como os resultados são exibidos",
          "options": {
            "hms": "Horas : Minutos : Segundos",
            "decimal": "Horas Decimais (ex: 2,50 hrs)",
            "minutes": "Total em Minutos",
            "seconds": "Total em Segundos"
          }
        }
      },
      "results": {
        "totalTime": {
          "label": "Tempo Total"
        },
        "totalHours": {
          "label": "Em Horas"
        },
        "totalMinutes": {
          "label": "Em Minutos"
        },
        "totalSeconds": {
          "label": "Em Segundos"
        }
      },
      "presets": {
        "workday": {
          "label": "Dia de Trabalho",
          "description": "8h 30m + 1h 15m"
        },
        "marathon": {
          "label": "Maratona",
          "description": "4h 30m − 3h 45m"
        },
        "cooking": {
          "label": "Culinária",
          "description": "45m + 1h 30m"
        }
      },
      "values": {
        "h": "h",
        "m": "m",
        "s": "s",
        "hours": "horas",
        "hour": "hora",
        "minutes": "minutos",
        "minute": "minuto",
        "seconds": "segundos",
        "second": "segundo"
      },
      "formats": {
        "summary": "Resultado: {value}"
      },
      "infoCards": {
        "metrics": {
          "title": "Detalhamento do Tempo",
          "items": [
            {
              "label": "Horas:Minutos:Segundos",
              "valueKey": "totalTime"
            },
            {
              "label": "Horas Decimais",
              "valueKey": "totalHours"
            },
            {
              "label": "Total em Minutos",
              "valueKey": "totalMinutes"
            },
            {
              "label": "Total em Segundos",
              "valueKey": "totalSeconds"
            }
          ]
        },
        "details": {
          "title": "Resumo da Entrada",
          "items": [
            {
              "label": "Tempo 1",
              "valueKey": "time1Display"
            },
            {
              "label": "Tempo 2",
              "valueKey": "time2Display"
            },
            {
              "label": "Operação",
              "valueKey": "operationDisplay"
            },
            {
              "label": "Formato de Saída",
              "valueKey": "formatDisplay"
            }
          ]
        },
        "tips": {
          "title": "Dicas Rápidas",
          "items": [
            "Digite horas, minutos e segundos separadamente em cada campo",
            "Horas decimais são úteis para cálculos de folha de ponto e faturamento",
            "Resultados negativos mostram quanto o Tempo 2 excede o Tempo 1 no modo subtração",
            "Use predefinições para cenários comuns como horas de trabalho ou tempos de cozinha"
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "O que é uma Calculadora de Tempo?",
          "content": "Uma calculadora de tempo é uma ferramenta que realiza operações aritméticas em durações de tempo. Diferente dos números regulares, o tempo segue um sistema de base-60 onde 60 segundos fazem um minuto e 60 minutos fazem uma hora. Isso torna os cálculos mentais com tempo desafiadores, especialmente ao lidar com horas, minutos e segundos simultaneamente.\n\nCalculadoras de tempo são essenciais para profissionais que controlam horas faturáveis, atletas monitorando durações de treino, cozinheiros combinando tempos de preparo de receitas, e qualquer pessoa trabalhando com horários através de fusos horários. Ao automatizar a conversão entre unidades de tempo, essas ferramentas eliminam erros comuns na aritmética temporal."
        },
        "howItWorks": {
          "title": "Como Funciona a Soma e Subtração de Tempo",
          "content": "A soma e subtração de tempo seguem o sistema sexagesimal (base-60). Ao somar dois valores de tempo, os segundos são somados primeiro. Se a soma exceder 59, o excesso é transferido para os minutos. A mesma lógica de transferência se aplica dos minutos para as horas.\n\nPor exemplo, somando 2h 45m 30s e 1h 20m 45s: Primeiro, 30s + 45s = 75s = 1m 15s (transfere 1 minuto). Então, 45m + 20m + 1m (transferido) = 66m = 1h 6m (transfere 1 hora). Finalmente, 2h + 1h + 1h (transferido) = 4h. Resultado: 4h 6m 15s.\n\nA subtração funciona de forma similar, mas com empréstimo em vez de transferência. Se os segundos no primeiro tempo forem menores que no segundo, você empresta 1 minuto (60 segundos) da coluna dos minutos."
        },
        "considerations": {
          "title": "Casos de Uso Comuns",
          "items": [
            {
              "text": "Controle de horas de trabalho: Some períodos diários de trabalho para encontrar o total de horas para folha de pagamento ou faturamento",
              "type": "info"
            },
            {
              "text": "Culinária e confeitaria: Combine tempo de preparo, tempo de cozimento e tempo de descanso para receitas",
              "type": "info"
            },
            {
              "text": "Cronometragem de corridas: Calcule diferenças de tempo entre voltas, etapas ou tempos finais",
              "type": "info"
            },
            {
              "text": "Gestão de projetos: Estime duração total somando tempos de tarefas individuais",
              "type": "info"
            },
            {
              "text": "Planejamento de viagem: Some tempos de conexão, durações de voo e tempos de transferência",
              "type": "info"
            },
            {
              "text": "Resultados negativos na subtração indicam que o segundo tempo excede o primeiro",
              "type": "warning"
            }
          ]
        },
        "categories": {
          "title": "Conversões de Unidades de Tempo",
          "items": [
            {
              "text": "1 hora = 60 minutos = 3.600 segundos",
              "type": "info"
            },
            {
              "text": "1 minuto = 60 segundos",
              "type": "info"
            },
            {
              "text": "1 dia = 24 horas = 1.440 minutos = 86.400 segundos",
              "type": "info"
            },
            {
              "text": "Horas decimais: 1h 30m = 1,50 horas (divida minutos por 60)",
              "type": "info"
            },
            {
              "text": "Minutos decimais: 2m 30s = 2,50 minutos (divida segundos por 60)",
              "type": "info"
            },
            {
              "text": "Horário militar usa formato de 24 horas: 13:30 = 1:30 PM",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemplos Passo a Passo",
          "description": "Como somar e subtrair durações de tempo",
          "examples": [
            {
              "title": "Somando Horas de Trabalho: 8h 30m + 1h 15m",
              "steps": [
                "Digite 8 em horas, 30 em minutos para Tempo 1",
                "Digite 1 em horas, 15 em minutos para Tempo 2",
                "Selecione operação Somar (+)",
                "Resultado: 8h30m + 1h15m = 9h 45m 00s"
              ],
              "result": "9h 45m 00s (9,75 horas decimais)"
            },
            {
              "title": "Subtraindo Tempos de Corrida: 4h 30m − 3h 45m",
              "steps": [
                "Digite 4 em horas, 30 em minutos para Tempo 1",
                "Digite 3 em horas, 45 em minutos para Tempo 2",
                "Selecione operação Subtrair (−)",
                "Resultado: 4h30m − 3h45m = 0h 45m 00s"
              ],
              "result": "0h 45m 00s (45 minutos)"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Como somo horas e minutos?",
          "answer": "Digite as horas no campo 'hrs' e os minutos no campo 'min' para cada valor de tempo. Selecione Somar (+) e a calculadora lidará automaticamente com a conversão de base-60 — por exemplo, 45 minutos + 30 minutos corretamente resulta em 1 hora 15 minutos, não 75 minutos."
        },
        {
          "question": "O que significam horas decimais?",
          "answer": "Horas decimais expressam tempo como uma fração decimal de uma hora. Por exemplo, 1 hora 30 minutos = 1,50 horas, e 2 horas 15 minutos = 2,25 horas. Este formato é comumente usado para faturamento, folhas de ponto e cálculos de folha de pagamento onde frações de horas precisam ser multiplicadas por taxas horárias."
        },
        {
          "question": "Esta calculadora lida com resultados negativos?",
          "answer": "Sim. Ao subtrair, se o Tempo 2 for maior que o Tempo 1, o resultado será negativo, mostrado com um sinal de menos (−). Por exemplo, subtrair 3h 45m de 2h 30m resulta em −1h 15m 00s, significando que o Tempo 2 excedeu o Tempo 1 em 1 hora e 15 minutos."
        },
        {
          "question": "Quão preciso é o cálculo de tempo?",
          "answer": "A calculadora é precisa até o segundo. Ela usa aritmética inteira precisa para conversão de tempo, evitando erros de ponto flutuante que podem ocorrer com representações decimais. Todas as conversões entre horas, minutos e segundos usam fatores exatos (60 segundos por minuto, 3600 segundos por hora)."
        },
        {
          "question": "Posso usar isso para controle de horas de trabalho?",
          "answer": "Absolutamente. Digite seus períodos de trabalho de início ao fim como valores de tempo e some-os. A saída em horas decimais é especialmente útil para multiplicar pela sua taxa horária. Por exemplo, 8h 30m = 8,50 horas decimais × R$ 25/hr = R$ 212,50."
        },
        {
          "question": "Quais formatos de tempo estão disponíveis?",
          "answer": "A calculadora oferece quatro formatos de saída: Horas:Minutos:Segundos (formato de tempo padrão), Horas Decimais (para faturamento e folha de pagamento), Total em Minutos (para durações curtas), e Total em Segundos (para cronometragem precisa). Você pode alternar entre formatos usando o seletor de Formato de Saída."
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
      "name": "Calculateur de Temps",
      "slug": "calculateur-temps",
      "subtitle": "Additionnez, soustrayez et convertissez des durées avec heures, minutes et secondes.",
      "breadcrumb": "Calc Temps",
      "seo": {
        "title": "Calculateur de Temps - Additionner et Soustraire Heures, Minutes, Secondes",
        "description": "Calculez des durées en additionnant ou soustrayant des heures, minutes et secondes. Obtenez des résultats instantanés dans plusieurs formats avec un outil en ligne gratuit et facile à utiliser.",
        "shortDescription": "Additionnez et soustrayez des durées instantanément.",
        "keywords": [
          "calculateur de temps",
          "additionner temps",
          "soustraire temps",
          "calculateur heures minutes secondes",
          "calculateur durée temps",
          "calculateur temps gratuit",
          "calculateur temps en ligne",
          "addition temps"
        ]
      },
      "inputs": {
        "operation": {
          "label": "Opération",
          "helpText": "Choisissez d'additionner ou soustraire des durées",
          "options": {
            "add": "Additionner (+)",
            "subtract": "Soustraire (−)"
          }
        },
        "time1": {
          "label": "Temps 1",
          "helpText": "Entrez la première durée",
          "hoursLabel": "h",
          "minutesLabel": "min",
          "secondsLabel": "sec"
        },
        "time2": {
          "label": "Temps 2",
          "helpText": "Entrez la seconde durée",
          "hoursLabel": "h",
          "minutesLabel": "min",
          "secondsLabel": "sec"
        },
        "outputFormat": {
          "label": "Format de Sortie",
          "helpText": "Choisissez comment les résultats sont affichés",
          "options": {
            "hms": "Heures : Minutes : Secondes",
            "decimal": "Heures Décimales (ex. 2,50 h)",
            "minutes": "Minutes Totales",
            "seconds": "Secondes Totales"
          }
        }
      },
      "results": {
        "totalTime": {
          "label": "Temps Total"
        },
        "totalHours": {
          "label": "En Heures"
        },
        "totalMinutes": {
          "label": "En Minutes"
        },
        "totalSeconds": {
          "label": "En Secondes"
        }
      },
      "presets": {
        "workday": {
          "label": "Journée Travail",
          "description": "8h 30m + 1h 15m"
        },
        "marathon": {
          "label": "Marathon",
          "description": "4h 30m − 3h 45m"
        },
        "cooking": {
          "label": "Cuisine",
          "description": "45m + 1h 30m"
        }
      },
      "values": {
        "h": "h",
        "m": "m",
        "s": "s",
        "hours": "heures",
        "hour": "heure",
        "minutes": "minutes",
        "minute": "minute",
        "seconds": "secondes",
        "second": "seconde"
      },
      "formats": {
        "summary": "Résultat : {value}"
      },
      "infoCards": {
        "metrics": {
          "title": "Répartition du Temps",
          "items": [
            {
              "label": "Heures:Minutes:Secondes",
              "valueKey": "totalTime"
            },
            {
              "label": "Heures Décimales",
              "valueKey": "totalHours"
            },
            {
              "label": "Minutes Totales",
              "valueKey": "totalMinutes"
            },
            {
              "label": "Secondes Totales",
              "valueKey": "totalSeconds"
            }
          ]
        },
        "details": {
          "title": "Résumé des Entrées",
          "items": [
            {
              "label": "Temps 1",
              "valueKey": "time1Display"
            },
            {
              "label": "Temps 2",
              "valueKey": "time2Display"
            },
            {
              "label": "Opération",
              "valueKey": "operationDisplay"
            },
            {
              "label": "Format de Sortie",
              "valueKey": "formatDisplay"
            }
          ]
        },
        "tips": {
          "title": "Conseils Rapides",
          "items": [
            "Entrez les heures, minutes et secondes séparément dans chaque champ",
            "Les heures décimales sont utiles pour les calculs de feuilles de temps et facturation",
            "Les résultats négatifs montrent de combien le Temps 2 dépasse le Temps 1 en mode soustraction",
            "Utilisez les préréglages pour des scénarios courants comme les heures de travail ou temps de cuisine"
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Qu'est-ce qu'un Calculateur de Temps ?",
          "content": "Un calculateur de temps est un outil qui effectue des opérations arithmétiques sur des durées. Contrairement aux nombres ordinaires, le temps suit un système base-60 où 60 secondes font une minute et 60 minutes font une heure. Cela rend le calcul mental avec le temps difficile, surtout en traitant simultanément heures, minutes et secondes.\n\nLes calculateurs de temps sont essentiels pour les professionnels qui suivent les heures facturables, les athlètes surveillant les durées d'entraînement, les cuisiniers combinant les temps de préparation des recettes, et quiconque travaille avec des horaires à travers les fuseaux horaires. En automatisant la conversion entre unités de temps, ces outils éliminent les erreurs courantes dans l'arithmétique temporelle."
        },
        "howItWorks": {
          "title": "Comment Fonctionnent l'Addition et la Soustraction de Temps",
          "content": "L'addition et la soustraction de temps suivent le système sexagésimal (base-60). Lors de l'addition de deux valeurs temporelles, les secondes sont ajoutées en premier. Si la somme dépasse 59, le dépassement se reporte sur les minutes. La même logique de report s'applique des minutes aux heures.\n\nPar exemple, en ajoutant 2h 45m 30s et 1h 20m 45s : D'abord, 30s + 45s = 75s = 1m 15s (report 1 minute). Puis, 45m + 20m + 1m (report) = 66m = 1h 6m (report 1 heure). Enfin, 2h + 1h + 1h (report) = 4h. Résultat : 4h 6m 15s.\n\nLa soustraction fonctionne de même mais avec emprunt au lieu de report. Si les secondes du premier temps sont inférieures au second, vous empruntez 1 minute (60 secondes) de la colonne des minutes."
        },
        "considerations": {
          "title": "Cas d'Usage Courants",
          "items": [
            {
              "text": "Suivi heures de travail : Additionnez les périodes de travail quotidiennes pour trouver les heures totales pour paie ou facturation",
              "type": "info"
            },
            {
              "text": "Cuisine et pâtisserie : Combinez temps de préparation, cuisson et repos pour les recettes",
              "type": "info"
            },
            {
              "text": "Chronométrage de course : Calculez les différences de temps entre segments, tours ou temps d'arrivée",
              "type": "info"
            },
            {
              "text": "Gestion de projet : Estimez la durée totale en additionnant les temps de tâches individuelles",
              "type": "info"
            },
            {
              "text": "Planification voyage : Ajoutez temps d'escale, durées de vol et temps de transfert",
              "type": "info"
            },
            {
              "text": "Les résultats négatifs en soustraction indiquent que le second temps dépasse le premier",
              "type": "warning"
            }
          ]
        },
        "categories": {
          "title": "Conversions d'Unités de Temps",
          "items": [
            {
              "text": "1 heure = 60 minutes = 3 600 secondes",
              "type": "info"
            },
            {
              "text": "1 minute = 60 secondes",
              "type": "info"
            },
            {
              "text": "1 jour = 24 heures = 1 440 minutes = 86 400 secondes",
              "type": "info"
            },
            {
              "text": "Heures décimales : 1h 30m = 1,50 heures (diviser minutes par 60)",
              "type": "info"
            },
            {
              "text": "Minutes décimales : 2m 30s = 2,50 minutes (diviser secondes par 60)",
              "type": "info"
            },
            {
              "text": "Temps militaire utilise format 24 heures : 13h30 = 1:30 PM",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemples Étape par Étape",
          "description": "Comment additionner et soustraire des durées",
          "examples": [
            {
              "title": "Addition Heures Travail : 8h 30m + 1h 15m",
              "steps": [
                "Entrez 8 en heures, 30 en minutes pour Temps 1",
                "Entrez 1 en heures, 15 en minutes pour Temps 2",
                "Sélectionnez opération Additionner (+)",
                "Résultat : 8h30m + 1h15m = 9h 45m 00s"
              ],
              "result": "9h 45m 00s (9,75 heures décimales)"
            },
            {
              "title": "Soustraction Temps Course : 4h 30m − 3h 45m",
              "steps": [
                "Entrez 4 en heures, 30 en minutes pour Temps 1",
                "Entrez 3 en heures, 45 en minutes pour Temps 2",
                "Sélectionnez opération Soustraire (−)",
                "Résultat : 4h30m − 3h45m = 0h 45m 00s"
              ],
              "result": "0h 45m 00s (45 minutes)"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Comment additionner heures et minutes ?",
          "answer": "Entrez les heures dans le champ 'h' et les minutes dans le champ 'min' pour chaque valeur temporelle. Sélectionnez Additionner (+) et le calculateur gérera automatiquement la conversion base-60 — par exemple, 45 minutes + 30 minutes donne correctement 1 heure 15 minutes, pas 75 minutes."
        },
        {
          "question": "Que signifient les heures décimales ?",
          "answer": "Les heures décimales expriment le temps comme fraction décimale d'une heure. Par exemple, 1 heure 30 minutes = 1,50 heures, et 2 heures 15 minutes = 2,25 heures. Ce format est couramment utilisé pour facturation, feuilles de temps et calculs de paie où les fractions d'heures doivent être multipliées par des taux horaires."
        },
        {
          "question": "Ce calculateur peut-il gérer les résultats négatifs ?",
          "answer": "Oui. Lors de soustraction, si Temps 2 est plus grand que Temps 1, le résultat sera négatif, affiché avec un signe moins (−). Par exemple, soustraire 3h 45m de 2h 30m donne −1h 15m 00s, signifiant que Temps 2 a dépassé Temps 1 de 1 heure et 15 minutes."
        },
        {
          "question": "Quelle est la précision du calcul temporel ?",
          "answer": "Le calculateur est précis à la seconde près. Il utilise l'arithmétique entière précise pour la conversion temporelle, évitant les erreurs en virgule flottante qui peuvent survenir avec les représentations décimales. Toutes conversions entre heures, minutes et secondes utilisent des facteurs exacts (60 secondes par minute, 3600 secondes par heure)."
        },
        {
          "question": "Puis-je l'utiliser pour suivre mes heures de travail ?",
          "answer": "Absolument. Entrez vos périodes de travail début-fin comme valeurs temporelles et additionnez-les. La sortie en heures décimales est particulièrement utile pour multiplier par votre taux horaire. Par exemple, 8h 30m = 8,50 heures décimales × 25€/h = 212,50€."
        },
        {
          "question": "Quels formats temporels sont disponibles ?",
          "answer": "Le calculateur offre quatre formats de sortie : Heures:Minutes:Secondes (format temps standard), Heures Décimales (pour facturation et paie), Minutes Totales (pour courtes durées), et Secondes Totales (pour chronométrage précis). Vous pouvez basculer entre formats avec le sélecteur Format de Sortie."
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
      "name": "Zeit-Rechner",
      "slug": "zeit-rechner",
      "subtitle": "Addieren, subtrahieren und konvertieren Sie Zeitdauern mit Stunden, Minuten und Sekunden.",
      "breadcrumb": "Zeit-Rechner",
      "seo": {
        "title": "Zeit-Rechner - Stunden, Minuten, Sekunden addieren & subtrahieren",
        "description": "Berechnen Sie Zeitdauern durch Addieren oder Subtrahieren von Stunden, Minuten und Sekunden. Erhalten Sie sofortige Ergebnisse in verschiedenen Formaten mit einem kostenlosen, einfach zu bedienenden Online-Tool.",
        "shortDescription": "Addieren und subtrahieren Sie Zeitdauern sofort.",
        "keywords": [
          "zeit rechner",
          "zeit addieren",
          "zeit subtrahieren",
          "stunden minuten sekunden rechner",
          "zeitdauer rechner",
          "kostenloser zeit rechner",
          "online zeit rechner",
          "zeit addition"
        ]
      },
      "inputs": {
        "operation": {
          "label": "Operation",
          "helpText": "Wählen Sie, ob Dauern addiert oder subtrahiert werden sollen",
          "options": {
            "add": "Addieren (+)",
            "subtract": "Subtrahieren (−)"
          }
        },
        "time1": {
          "label": "Zeit 1",
          "helpText": "Geben Sie die erste Dauer ein",
          "hoursLabel": "Std",
          "minutesLabel": "Min",
          "secondsLabel": "Sek"
        },
        "time2": {
          "label": "Zeit 2",
          "helpText": "Geben Sie die zweite Dauer ein",
          "hoursLabel": "Std",
          "minutesLabel": "Min",
          "secondsLabel": "Sek"
        },
        "outputFormat": {
          "label": "Ausgabeformat",
          "helpText": "Wählen Sie, wie Ergebnisse angezeigt werden",
          "options": {
            "hms": "Stunden : Minuten : Sekunden",
            "decimal": "Dezimalstunden (z.B. 2,50 Std)",
            "minutes": "Gesamtminuten",
            "seconds": "Gesamtsekunden"
          }
        }
      },
      "results": {
        "totalTime": {
          "label": "Gesamtzeit"
        },
        "totalHours": {
          "label": "In Stunden"
        },
        "totalMinutes": {
          "label": "In Minuten"
        },
        "totalSeconds": {
          "label": "In Sekunden"
        }
      },
      "presets": {
        "workday": {
          "label": "Arbeitstag",
          "description": "8h 30m + 1h 15m"
        },
        "marathon": {
          "label": "Marathon",
          "description": "4h 30m − 3h 45m"
        },
        "cooking": {
          "label": "Kochen",
          "description": "45m + 1h 30m"
        }
      },
      "values": {
        "h": "h",
        "m": "m",
        "s": "s",
        "hours": "Stunden",
        "hour": "Stunde",
        "minutes": "Minuten",
        "minute": "Minute",
        "seconds": "Sekunden",
        "second": "Sekunde"
      },
      "formats": {
        "summary": "Ergebnis: {value}"
      },
      "infoCards": {
        "metrics": {
          "title": "Zeitaufschlüsselung",
          "items": [
            {
              "label": "Stunden:Minuten:Sekunden",
              "valueKey": "totalTime"
            },
            {
              "label": "Dezimalstunden",
              "valueKey": "totalHours"
            },
            {
              "label": "Gesamtminuten",
              "valueKey": "totalMinutes"
            },
            {
              "label": "Gesamtsekunden",
              "valueKey": "totalSeconds"
            }
          ]
        },
        "details": {
          "title": "Eingabezusammenfassung",
          "items": [
            {
              "label": "Zeit 1",
              "valueKey": "time1Display"
            },
            {
              "label": "Zeit 2",
              "valueKey": "time2Display"
            },
            {
              "label": "Operation",
              "valueKey": "operationDisplay"
            },
            {
              "label": "Ausgabeformat",
              "valueKey": "formatDisplay"
            }
          ]
        },
        "tips": {
          "title": "Schnelle Tipps",
          "items": [
            "Geben Sie Stunden, Minuten und Sekunden separat in jedes Feld ein",
            "Dezimalstunden sind nützlich für Stundenzettel- und Abrechnungsberechnungen",
            "Negative Ergebnisse zeigen, um wie viel Zeit 2 Zeit 1 im Subtraktionsmodus übersteigt",
            "Verwenden Sie Vorlagen für häufige Szenarien wie Arbeitszeiten oder Kochzeiten"
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Was ist ein Zeit-Rechner?",
          "content": "Ein Zeit-Rechner ist ein Tool, das arithmetische Operationen mit Zeitdauern durchführt. Im Gegensatz zu normalen Zahlen folgt die Zeit einem 60er-System, bei dem 60 Sekunden eine Minute und 60 Minuten eine Stunde ergeben. Dies macht Kopfrechnen mit Zeit herausfordernd, besonders beim gleichzeitigen Umgang mit Stunden, Minuten und Sekunden.\n\nZeit-Rechner sind unverzichtbar für Fachkräfte, die abrechenbare Stunden verfolgen, Athleten, die Trainingsdauern überwachen, Köche, die Rezept-Vorbereitungszeiten kombinieren, und alle, die mit Zeitplänen über Zeitzonen hinweg arbeiten. Durch die Automatisierung der Umrechnung zwischen Zeiteinheiten eliminieren diese Tools häufige Fehler in der Zeitarithmetik."
        },
        "howItWorks": {
          "title": "Wie Zeit-Addition und -Subtraktion funktioniert",
          "content": "Zeit-Addition und -Subtraktion folgen dem Sexagesimalsystem (60er-System). Beim Addieren zweier Zeitwerte werden zuerst die Sekunden addiert. Wenn die Summe 59 übersteigt, fließt der Übertrag in die Minuten. Die gleiche Übertragungslogik gilt von Minuten zu Stunden.\n\nZum Beispiel beim Addieren von 2h 45m 30s und 1h 20m 45s: Zuerst 30s + 45s = 75s = 1m 15s (1 Minute übertragen). Dann 45m + 20m + 1m (Übertrag) = 66m = 1h 6m (1 Stunde übertragen). Schließlich 2h + 1h + 1h (Übertrag) = 4h. Ergebnis: 4h 6m 15s.\n\nSubtraktion funktioniert ähnlich, aber mit Borgen statt Übertragen. Wenn die Sekunden in der ersten Zeit kleiner sind als die zweite, borgen Sie sich 1 Minute (60 Sekunden) aus der Minutenspalte."
        },
        "considerations": {
          "title": "Häufige Anwendungsfälle",
          "items": [
            {
              "text": "Arbeitsstundenverfolgung: Tägliche Arbeitsperioden addieren, um Gesamtstunden für Lohn oder Abrechnung zu finden",
              "type": "info"
            },
            {
              "text": "Kochen und Backen: Vorbereitungszeit, Garzeit und Ruhezeit für Rezepte kombinieren",
              "type": "info"
            },
            {
              "text": "Rennzeitmessung: Zeitunterschiede zwischen Splits, Runden oder Zielzeiten berechnen",
              "type": "info"
            },
            {
              "text": "Projektmanagement: Gesamtdauer durch Addition einzelner Aufgabenzeiten schätzen",
              "type": "info"
            },
            {
              "text": "Reiseplanung: Zwischenstoppzeiten, Flugdauern und Transferzeiten addieren",
              "type": "info"
            },
            {
              "text": "Negative Ergebnisse bei der Subtraktion zeigen an, dass die zweite Zeit die erste übersteigt",
              "type": "warning"
            }
          ]
        },
        "categories": {
          "title": "Zeiteinheiten-Umrechnungen",
          "items": [
            {
              "text": "1 Stunde = 60 Minuten = 3.600 Sekunden",
              "type": "info"
            },
            {
              "text": "1 Minute = 60 Sekunden",
              "type": "info"
            },
            {
              "text": "1 Tag = 24 Stunden = 1.440 Minuten = 86.400 Sekunden",
              "type": "info"
            },
            {
              "text": "Dezimalstunden: 1h 30m = 1,50 Stunden (Minuten durch 60 teilen)",
              "type": "info"
            },
            {
              "text": "Dezimalminuten: 2m 30s = 2,50 Minuten (Sekunden durch 60 teilen)",
              "type": "info"
            },
            {
              "text": "Militärzeit verwendet 24-Stunden-Format: 13:30 = 1:30 PM",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Schritt-für-Schritt-Beispiele",
          "description": "Wie man Zeitdauern addiert und subtrahiert",
          "examples": [
            {
              "title": "Arbeitsstunden addieren: 8h 30m + 1h 15m",
              "steps": [
                "Geben Sie 8 bei Stunden, 30 bei Minuten für Zeit 1 ein",
                "Geben Sie 1 bei Stunden, 15 bei Minuten für Zeit 2 ein",
                "Wählen Sie Addieren (+) Operation",
                "Ergebnis: 8h30m + 1h15m = 9h 45m 00s"
              ],
              "result": "9h 45m 00s (9,75 Dezimalstunden)"
            },
            {
              "title": "Rennzeiten subtrahieren: 4h 30m − 3h 45m",
              "steps": [
                "Geben Sie 4 bei Stunden, 30 bei Minuten für Zeit 1 ein",
                "Geben Sie 3 bei Stunden, 45 bei Minuten für Zeit 2 ein",
                "Wählen Sie Subtrahieren (−) Operation",
                "Ergebnis: 4h30m − 3h45m = 0h 45m 00s"
              ],
              "result": "0h 45m 00s (45 Minuten)"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Wie addiere ich Stunden und Minuten?",
          "answer": "Geben Sie die Stunden in das 'Std'-Feld und Minuten in das 'Min'-Feld für jeden Zeitwert ein. Wählen Sie Addieren (+) und der Rechner übernimmt die 60er-System-Umrechnung automatisch — zum Beispiel ergeben 45 Minuten + 30 Minuten korrekt 1 Stunde 15 Minuten, nicht 75 Minuten."
        },
        {
          "question": "Was bedeuten Dezimalstunden?",
          "answer": "Dezimalstunden drücken Zeit als Dezimalbruch einer Stunde aus. Zum Beispiel: 1 Stunde 30 Minuten = 1,50 Stunden und 2 Stunden 15 Minuten = 2,25 Stunden. Dieses Format wird häufig für Abrechnungen, Stundenzettel und Lohnberechnungen verwendet, wo Stundenbruchteile mit Stundensätzen multipliziert werden müssen."
        },
        {
          "question": "Kann dieser Rechner negative Ergebnisse verarbeiten?",
          "answer": "Ja. Bei der Subtraktion wird das Ergebnis negativ sein, wenn Zeit 2 größer als Zeit 1 ist, angezeigt mit einem Minuszeichen (−). Zum Beispiel ergibt die Subtraktion von 3h 45m von 2h 30m −1h 15m 00s, was bedeutet, dass Zeit 2 Zeit 1 um 1 Stunde und 15 Minuten überstieg."
        },
        {
          "question": "Wie genau ist die Zeitberechnung?",
          "answer": "Der Rechner ist sekundengenau. Er verwendet präzise Ganzzahlarithmetik für Zeitumrechnungen und vermeidet Fließkomma-Fehler, die bei Dezimaldarstellungen auftreten können. Alle Umrechnungen zwischen Stunden, Minuten und Sekunden verwenden exakte Faktoren (60 Sekunden pro Minute, 3600 Sekunden pro Stunde)."
        },
        {
          "question": "Kann ich dies für die Arbeitsstundenverfolgung verwenden?",
          "answer": "Absolut. Geben Sie Ihre Arbeitsperioden von Start bis Ende als Zeitwerte ein und addieren Sie sie zusammen. Die Dezimalstunden-Ausgabe ist besonders nützlich für die Multiplikation mit Ihrem Stundensatz. Zum Beispiel: 8h 30m = 8,50 Dezimalstunden × 25€/Std = 212,50€."
        },
        {
          "question": "Welche Zeitformate sind verfügbar?",
          "answer": "Der Rechner bietet vier Ausgabeformate: Stunden:Minuten:Sekunden (Standard-Zeitformat), Dezimalstunden (für Abrechnung und Lohn), Gesamtminuten (für kurze Dauern) und Gesamtsekunden (für präzise Zeitmessung). Sie können zwischen den Formaten mit dem Ausgabeformat-Selektor wechseln."
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

    es: {
      name: "Calculadora de Tiempo",
      slug: "calculadora-de-tiempo",
      subtitle: "Suma, resta y convierte duraciones de tiempo con horas, minutos y segundos.",
      breadcrumb: "Tiempo",

      seo: {
        title: "Calculadora de Tiempo - Sumar y Restar Horas, Minutos, Segundos",
        description: "Calcula duraciones de tiempo sumando o restando horas, minutos y segundos. Resultados instantáneos en múltiples formatos con herramienta gratuita.",
        shortDescription: "Suma y resta duraciones de tiempo al instante.",
        keywords: ["calculadora de tiempo", "sumar horas", "restar tiempo", "calculadora horas minutos", "calcular tiempo", "calculadora de horas gratis"],
      },

      calculator: { yourInformation: "Calculadora de Tiempo" },
      ui: { yourInformation: "Calculadora de Tiempo", calculate: "Calcular", reset: "Reiniciar", results: "Resultados" },

      inputs: {
        operation: { label: "Operación", helpText: "Elige sumar o restar duraciones", options: { add: "Sumar (+)", subtract: "Restar (−)" } },
        time1: { label: "Tiempo 1", helpText: "Ingresa la primera duración", hoursLabel: "hrs", minutesLabel: "min", secondsLabel: "seg" },
        time2: { label: "Tiempo 2", helpText: "Ingresa la segunda duración", hoursLabel: "hrs", minutesLabel: "min", secondsLabel: "seg" },
        outputFormat: { label: "Formato de Salida", helpText: "Elige cómo se muestran los resultados", options: { hms: "Horas : Minutos : Segundos", decimal: "Horas Decimales (ej. 2.50 hrs)", minutes: "Total en Minutos", seconds: "Total en Segundos" } },
      },

      results: { totalTime: { label: "Tiempo Total" }, totalHours: { label: "En Horas" }, totalMinutes: { label: "En Minutos" }, totalSeconds: { label: "En Segundos" } },
      presets: { workday: { label: "Día Laboral", description: "8h 30m + 1h 15m" }, marathon: { label: "Maratón", description: "4h 30m − 3h 45m" }, cooking: { label: "Cocina", description: "45m + 1h 30m" },
 },

      values: { "h": "h", "m": "m", "s": "s", "hours": "horas", "hour": "hora", "minutes": "minutos", "minute": "minuto", "seconds": "segundos", "second": "segundo" },
      formats: { summary: "Resultado: {value}" },

      infoCards: {
        metrics: { title: "Desglose de Tiempo", items: [{ label: "Horas:Minutos:Segundos", valueKey: "totalTime" }, { label: "Horas Decimales", valueKey: "totalHours" }, { label: "Total en Minutos", valueKey: "totalMinutes" }, { label: "Total en Segundos", valueKey: "totalSeconds" }] },
        details: { title: "Resumen de Entrada", items: [{ label: "Tiempo 1", valueKey: "time1Display" }, { label: "Tiempo 2", valueKey: "time2Display" }, { label: "Operación", valueKey: "operationDisplay" }, { label: "Formato", valueKey: "formatDisplay" }] },
        tips: { title: "Consejos Rápidos", items: ["Ingresa horas, minutos y segundos por separado en cada campo", "Las horas decimales son útiles para facturación y nóminas", "Resultados negativos indican que el Tiempo 2 excede al Tiempo 1", "Usa los presets para escenarios comunes como horas de trabajo"] },
      },

      education: {
        whatIs: { title: "¿Qué es una Calculadora de Tiempo?", content: "Una calculadora de tiempo es una herramienta que realiza operaciones aritméticas con duraciones de tiempo. A diferencia de los números regulares, el tiempo sigue un sistema base-60 donde 60 segundos forman un minuto y 60 minutos forman una hora.\n\nEstas calculadoras son esenciales para profesionales que registran horas facturables, atletas que monitorean duraciones de entrenamiento, cocineros que combinan tiempos de preparación y cualquier persona que trabaje con horarios." },
        howItWorks: { title: "Cómo Funciona la Suma y Resta de Tiempo", content: "La suma y resta de tiempo siguen el sistema sexagesimal (base-60). Al sumar dos valores de tiempo, primero se suman los segundos. Si la suma excede 59, el exceso se lleva a los minutos. La misma lógica de acarreo aplica de minutos a horas.\n\nPor ejemplo, al sumar 2h 45m 30s y 1h 20m 45s: Primero, 30s + 45s = 75s = 1m 15s (acarreo 1 minuto). Luego, 45m + 20m + 1m = 66m = 1h 6m (acarreo 1 hora). Finalmente, 2h + 1h + 1h = 4h. Resultado: 4h 6m 15s." },
        considerations: { title: "Casos de Uso Comunes", items: [{ text: "Registro de horas laborales: Suma periodos de trabajo para nómina o facturación", type: "info" }, { text: "Cocina y repostería: Combina tiempo de preparación, cocción y reposo", type: "info" }, { text: "Cronometraje deportivo: Calcula diferencias entre parciales y tiempos finales", type: "info" }, { text: "Gestión de proyectos: Estima duración total sumando tareas individuales", type: "info" }, { text: "Planificación de viajes: Suma escalas, duración de vuelos y traslados", type: "info" }, { text: "Resultados negativos en resta indican que el segundo tiempo excede al primero", type: "warning" }] },
        categories: { title: "Conversiones de Unidades de Tiempo", items: [{ text: "1 hora = 60 minutos = 3,600 segundos", type: "info" }, { text: "1 minuto = 60 segundos", type: "info" }, { text: "1 día = 24 horas = 1,440 minutos = 86,400 segundos", type: "info" }, { text: "Horas decimales: 1h 30m = 1.50 horas (dividir minutos entre 60)", type: "info" }, { text: "Minutos decimales: 2m 30s = 2.50 minutos (dividir segundos entre 60)", type: "info" }, { text: "Hora militar usa formato 24h: 1:30 PM = 13:30", type: "info" }] },
        examples: { title: "Ejemplos Paso a Paso", description: "Cómo sumar y restar duraciones", examples: [{ title: "Sumar Horas de Trabajo: 8h 30m + 1h 15m", steps: ["Ingresa 8 en horas, 30 en minutos para Tiempo 1", "Ingresa 1 en horas, 15 en minutos para Tiempo 2", "Selecciona operación Sumar (+)", "Resultado: 8h30m + 1h15m = 9h 45m 00s"], result: "9h 45m 00s (9.75 horas decimales)" }, { title: "Restar Tiempos de Carrera: 4h 30m − 3h 45m", steps: ["Ingresa 4 en horas, 30 en minutos para Tiempo 1", "Ingresa 3 en horas, 45 en minutos para Tiempo 2", "Selecciona operación Restar (−)", "Resultado: 4h30m − 3h45m = 0h 45m 00s"], result: "0h 45m 00s (45 minutos)" }] },
      },

      faqs: [
        { question: "¿Cómo sumo horas y minutos?", answer: "Ingresa las horas en el campo 'hrs' y los minutos en 'min' para cada valor de tiempo. Selecciona Sumar (+) y la calculadora manejará la conversión base-60 automáticamente." },
        { question: "¿Qué son las horas decimales?", answer: "Las horas decimales expresan el tiempo como fracción decimal. Por ejemplo, 1 hora 30 minutos = 1.50 horas. Este formato es común en facturación y nóminas." },
        { question: "¿Puede dar resultados negativos?", answer: "Sí. Al restar, si el Tiempo 2 es mayor que el Tiempo 1, el resultado será negativo, mostrado con signo menos (−)." },
        { question: "¿Qué tan precisa es la calculación?", answer: "La calculadora es precisa al segundo. Usa aritmética entera exacta para conversiones de tiempo, evitando errores de punto flotante." },
        { question: "¿Puedo usarla para registro de horas laborales?", answer: "Absolutamente. Ingresa tus periodos de trabajo y súmalos. La salida en horas decimales es ideal para multiplicar por tu tarifa horaria." },
        { question: "¿Qué formatos de tiempo están disponibles?", answer: "La calculadora ofrece cuatro formatos: Horas:Minutos:Segundos, Horas Decimales, Total en Minutos y Total en Segundos." },
      ],

      rating: { title: "Califica esta Calculadora", share: "Compartir", copied: "¡Copiado!", copyLink: "Copiar Enlace", clickToRate: "Click para calificar", youRated: "Calificaste", stars: "estrellas", averageFrom: "promedio de", ratings: "calificaciones" },
      common: { home: "Inicio", calculators: "Calculadoras" },
      buttons: { calculate: "Calcular", reset: "Reiniciar", pdf: "PDF", csv: "CSV", excel: "Excel", save: "Guardar", saved: "Guardado", saving: "Guardando..." },
      share: { calculatedWith: "Calculado con Kalcufy.com" },
      accessibility: { mobileResults: "Resultados", closeModal: "Cerrar", openMenu: "Menú" },
      sources: { title: "Fuentes y Referencias" },
    },
  },

  // ===========================================================================
  // INPUTS — Using V4.3 custom TimeInput component (h|m|s inline)
  // ===========================================================================
  inputs: [
    {
      id: "operation",
      type: "radio",
      defaultValue: "add",
      options: [{ value: "add" }, { value: "subtract" }],
    },
    {
      id: "time1",
      type: "time",
      timeFormat: "hms",
      timeOutputFormat: "seconds",
      defaultValue: 0,
    },
    {
      id: "time2",
      type: "time",
      timeFormat: "hms",
      timeOutputFormat: "seconds",
      defaultValue: 0,
    },
    {
      id: "outputFormat",
      type: "select",
      defaultValue: "hms",
      options: [
        { value: "hms" },
        { value: "decimal" },
        { value: "minutes" },
        { value: "seconds" },
      ],
    },
  ],

  inputGroups: [],

  results: [
    { id: "totalTime", type: "primary", format: "text" },
    { id: "totalHours", type: "secondary", format: "text" },
    { id: "totalMinutes", type: "secondary", format: "text" },
    { id: "totalSeconds", type: "secondary", format: "text" },
  ],

  infoCards: [
    { id: "metrics", type: "list", icon: "⏱️", itemCount: 4 },
    { id: "details", type: "list", icon: "📋", itemCount: 4 },
    { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  referenceData: [],

  educationSections: [
    { id: "whatIs", type: "prose", icon: "📖" },
    { id: "howItWorks", type: "prose", icon: "⚙️" },
    { id: "considerations", type: "list", icon: "📋", itemCount: 6 },
    { id: "categories", type: "list", icon: "📊", itemCount: 6 },
    { id: "examples", type: "code-example", icon: "🧮", columns: 2, exampleCount: 2 },
  ],

  faqs: [
    { id: "0" }, { id: "1" }, { id: "2" },
    { id: "3" }, { id: "4" }, { id: "5" },
  ],

  references: [
    {
      authors: "National Institute of Standards and Technology",
      year: "2024",
      title: "SI Units - Time",
      source: "NIST",
      url: "https://www.nist.gov/pml/owm/metric-si/si-units-time",
    },
    {
      authors: "International Bureau of Weights and Measures",
      year: "2024",
      title: "The International System of Units (SI) - Second",
      source: "BIPM",
      url: "https://www.bipm.org/en/measurement-units/si-base-units/second",
    },
  ],

  hero: {
    badge: "Free Online Tool",
  },

  sidebar: {
    showSearch: true,
    showRelatedCalculators: true,
    showCTA: true,
    category: "everyday",
  },

  features: {
    autoCalculate: true,
    exportPDF: true,
    exportCSV: true,
    shareResults: true,
    saveHistory: true,
    presetsEnabled: true,
  },

  relatedCalculators: ["age-calculator", "percentage-calculator"],

  ads: {
    sidebar: true,
    bottom: true,
  },
};

// =============================================================================
// CALCULATE FUNCTION
// =============================================================================
export function calculateTimeCalculator(data: {
  values: Record<string, unknown>;
  units?: Record<string, string>;
  unitSystem?: "metric" | "imperial";
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, t } = data;
  const v = (t?.values as Record<string, string>) || {};
  const f = (t?.formats as Record<string, string>) || {};

  const operation = (values.operation as string) || "add";
  const outputFormat = (values.outputFormat as string) || "hms";

  // TimeInput with timeOutputFormat: "seconds" returns total seconds as number
  const sec1 = (values.time1 as number) || 0;
  const sec2 = (values.time2 as number) || 0;

  if (sec1 === 0 && sec2 === 0) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  // Perform operation
  let resultSec: number;
  if (operation === "subtract") {
    resultSec = sec1 - sec2;
  } else {
    resultSec = sec1 + sec2;
  }

  // Handle negative
  const isNegative = resultSec < 0;
  const absResult = Math.abs(resultSec);
  const sign = isNegative ? "−" : "";

  // Convert to h:m:s
  const rH = Math.floor(absResult / 3600);
  const rM = Math.floor((absResult % 3600) / 60);
  const rS = Math.round(absResult % 60);

  // Unit labels
  const hStr = v["h"] || "h";
  const mStr = v["m"] || "m";
  const sStr = v["s"] || "s";

  const timeHMS = `${sign}${rH}${hStr} ${String(rM).padStart(2, "0")}${mStr} ${String(rS).padStart(2, "0")}${sStr}`;
  const decimalHours = absResult / 3600;
  const totalMinutes = absResult / 60;

  const hoursLabel = decimalHours === 1 ? (v["hour"] || "hour") : (v["hours"] || "hours");
  const minutesLabel = totalMinutes === 1 ? (v["minute"] || "minute") : (v["minutes"] || "minutes");
  const secondsLabel = absResult === 1 ? (v["second"] || "second") : (v["seconds"] || "seconds");

  // Primary result based on outputFormat
  let primaryFormatted: string;
  switch (outputFormat) {
    case "decimal":
      primaryFormatted = `${sign}${decimalHours.toFixed(2)} ${hoursLabel}`;
      break;
    case "minutes":
      primaryFormatted = `${sign}${totalMinutes.toFixed(1)} ${minutesLabel}`;
      break;
    case "seconds":
      primaryFormatted = `${sign}${Math.round(absResult).toLocaleString("en-US")} ${secondsLabel}`;
      break;
    default:
      primaryFormatted = timeHMS;
  }

  // Format input values for display
  const formatTime = (totalSec: number): string => {
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = Math.round(totalSec % 60);
    return `${h}${hStr} ${String(m).padStart(2, "0")}${mStr} ${String(s).padStart(2, "0")}${sStr}`;
  };

  const opSymbol = operation === "subtract" ? "−" : "+";
  const formatLabels: Record<string, string> = {
    hms: "H:M:S",
    decimal: "Decimal Hours",
    minutes: "Minutes",
    seconds: "Seconds",
  };

  return {
    values: {
      totalTime: resultSec,
      totalHours: decimalHours,
      totalMinutes: totalMinutes,
      totalSeconds: absResult,
      time1Display: 0,
      time2Display: 0,
      operationDisplay: 0,
      formatDisplay: 0,
    },
    formatted: {
      totalTime: primaryFormatted,
      totalHours: `${sign}${decimalHours.toFixed(2)} ${hoursLabel}`,
      totalMinutes: `${sign}${totalMinutes.toFixed(1)} ${minutesLabel}`,
      totalSeconds: `${sign}${Math.round(absResult).toLocaleString("en-US")} ${secondsLabel}`,
      time1Display: formatTime(sec1),
      time2Display: formatTime(sec2),
      operationDisplay: `Time 1 ${opSymbol} Time 2`,
      formatDisplay: formatLabels[outputFormat] || "H:M:S",
    },
    summary: f.summary?.replace("{value}", primaryFormatted) || `Result: ${primaryFormatted}`,
    isValid: true,
  };
}

export default timeCalculatorConfig;
