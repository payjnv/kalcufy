import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";

export const gradeCalculatorConfig: CalculatorConfigV4 = {
  id: "grade",
  version: "4.0",
  category: "everyday",
  icon: "📝",

  presets: [
    {
      id: "weighted",
      icon: "⚖️",
      values: { mode: "weighted", cat1Name: "Homework", cat1Score: 92, cat1Weight: 20, cat2Name: "Midterm", cat2Score: 78, cat2Weight: 30, cat3Name: "Final", cat3Score: 85, cat3Weight: 50, cat4Name: "", cat4Score: 0, cat4Weight: 0 },
    },
    {
      id: "simple",
      icon: "✏️",
      values: { mode: "simple", pointsEarned: 156, pointsPossible: 200, cat1Name: "", cat1Score: 0, cat1Weight: 0, cat2Name: "", cat2Score: 0, cat2Weight: 0, cat3Name: "", cat3Score: 0, cat3Weight: 0, cat4Name: "", cat4Score: 0, cat4Weight: 0 },
    },
    {
      id: "finalNeeded",
      icon: "🎯",
      values: { mode: "finalNeeded", currentGrade: 82, desiredGrade: 90, finalWeight: 40, cat1Name: "", cat1Score: 0, cat1Weight: 0, cat2Name: "", cat2Score: 0, cat2Weight: 0, cat3Name: "", cat3Score: 0, cat3Weight: 0, cat4Name: "", cat4Score: 0, cat4Weight: 0 },
    },
  ],

  t: {
    en: {
      name: "Grade Calculator",
      slug: "grade-calculator",
      subtitle: "Calculate your weighted grade, simple percentage, or find out what you need on the final exam to reach your target grade.",
      breadcrumb: "Grade",

      seo: {
        title: "Grade Calculator - Weighted, Final Exam & Percentage",
        description: "Calculate your class grade with weighted categories, find your percentage score, or determine what you need on the final to get the grade you want. Free tool.",
        shortDescription: "Calculate weighted grades and final exam scores.",
        keywords: [
          "grade calculator",
          "weighted grade calculator",
          "final grade calculator",
          "what do I need on my final",
          "calculate my grade",
          "free grade calculator",
          "class grade calculator",
          "weighted average calculator",
        ],
      },

      calculator: { yourInformation: "Grade Information" },
      ui: { yourInformation: "Grade Information", calculate: "Calculate", reset: "Reset", results: "Results" },

      inputs: {
        mode: { label: "Calculation Type", helpText: "Choose what to calculate", options: { weighted: "Weighted Grade", simple: "Simple Percentage", finalNeeded: "What Do I Need on the Final?" } },
        pointsEarned: { label: "Points Earned", helpText: "Total points you earned" },
        pointsPossible: { label: "Points Possible", helpText: "Total possible points" },
        currentGrade: { label: "Current Grade (%)", helpText: "Your current class percentage" },
        desiredGrade: { label: "Desired Grade (%)", helpText: "The grade you want to achieve" },
        finalWeight: { label: "Final Exam Weight (%)", helpText: "How much the final counts toward your grade" },
        cat1Name: { label: "Category 1", helpText: "Category name (e.g., Homework)" },
        cat1Score: { label: "Score (%)", helpText: "Your score as a percentage" },
        cat1Weight: { label: "Weight (%)", helpText: "How much this counts toward final grade" },
        cat2Name: { label: "Category 2", helpText: "Category name" },
        cat2Score: { label: "Score (%)", helpText: "Score percentage" },
        cat2Weight: { label: "Weight (%)", helpText: "Weight percentage" },
        cat3Name: { label: "Category 3", helpText: "Category name" },
        cat3Score: { label: "Score (%)", helpText: "Score percentage" },
        cat3Weight: { label: "Weight (%)", helpText: "Weight percentage" },
        cat4Name: { label: "Category 4 (Optional)", helpText: "Category name" },
        cat4Score: { label: "Score (%)", helpText: "Score percentage" },
        cat4Weight: { label: "Weight (%)", helpText: "Weight percentage" },
      },

      results: {
        finalGrade: { label: "Your Grade" },
        letterGrade: { label: "Letter Grade" },
        neededScore: { label: "Score Needed on Final" },
      },

      presets: {
        weighted: { label: "Weighted (HW + Midterm + Final)", description: "Standard weighted grade" },
        simple: { label: "156 out of 200", description: "Simple percentage" },
        finalNeeded: { label: "Need 90% — Final is 40%", description: "What score do I need?" },
      },

      values: { "%": "%", "of": "of" },
      formats: { summary: "Your grade: {grade}%" },

      infoCards: {
        metrics: {
          title: "Grade Summary",
          items: [
            { label: "Final Grade", valueKey: "finalGrade" },
            { label: "Letter Grade", valueKey: "letterGrade" },
            { label: "Total Weight", valueKey: "totalWeight" },
            { label: "Categories", valueKey: "categoryCount" },
          ],
        },
        details: {
          title: "Grade Scale",
          items: [
            { label: "A Range", valueKey: "aRange" },
            { label: "B Range", valueKey: "bRange" },
            { label: "C Range", valueKey: "cRange" },
            { label: "D/F Range", valueKey: "dRange" },
          ],
        },
        tips: {
          title: "Study Tips",
          items: [
            "High-weight categories (like finals) have the biggest impact — study proportionally",
            "Tracking your grade throughout the semester lets you plan your effort strategically",
            "Missing assignments hurt more than low scores — always submit something",
            "Extra credit can make a big difference when you're close to a grade cutoff",
          ],
        },
      },

      education: {
        whatIs: {
          title: "What Is a Weighted Grade?",
          content: "A weighted grade assigns different importance to different categories of work. Rather than treating every assignment equally, weighted grading recognizes that some assessments (like a final exam) should count more toward your grade than others (like a single homework assignment). For example, if homework is worth 20% of your grade and the final is worth 40%, earning 100% on homework but 50% on the final gives you a weighted average of 0.20 × 100 + 0.40 × 50 = 40%, not the 75% you'd get with simple averaging. Most college courses use weighted grading.",
        },
        howItWorks: {
          title: "How Weighted Grades Are Calculated",
          content: "The formula for weighted grades is: Final Grade = Σ(Score × Weight) / Σ(Weight). Each category's contribution equals its score multiplied by its weight percentage. For example, with Homework (92%, weight 20%), Midterm (78%, weight 30%), and Final (85%, weight 50%): (92 × 0.20) + (78 × 0.30) + (85 × 0.50) = 18.4 + 23.4 + 42.5 = 84.3%. The 'What Do I Need on the Final?' calculation rearranges this formula: Required Score = (Desired Grade - Current Grade × (1 - Final Weight)) / Final Weight. This tells you exactly what final exam score achieves your target grade.",
        },
        considerations: {
          title: "Important Notes",
          items: [
            { text: "Weights should add up to 100% — if they don't, the calculator normalizes them automatically", type: "warning" },
            { text: "A score above 100% on the final is required? That means your target grade may not be achievable", type: "warning" },
            { text: "Curve adjustments: If your professor curves grades, your actual letter grade may be higher", type: "info" },
            { text: "Grade cutoffs vary: Some professors set A at 90%, others at 93%. Check your syllabus", type: "info" },
            { text: "Rounding: Most professors round up at .5 (89.5% → 90% = A-), but this isn't guaranteed", type: "info" },
            { text: "Dropped grades: Some courses drop the lowest score in a category — this calculator doesn't account for that", type: "info" },
          ],
        },
        categories: {
          title: "Common Grade Cutoffs",
          items: [
            { text: "A (90-100%): Excellent — demonstrates thorough mastery of course material", type: "info" },
            { text: "B (80-89%): Good — shows strong understanding with room for improvement", type: "info" },
            { text: "C (70-79%): Average — meets basic expectations for the course", type: "info" },
            { text: "D (60-69%): Below average — minimum passing grade at most institutions", type: "info" },
            { text: "F (0-59%): Failing — does not meet minimum standards, no credit earned", type: "info" },
            { text: "Plus/Minus: A+ (97+), A (93-96), A- (90-92), B+ (87-89), etc. — varies by school", type: "info" },
          ],
        },
        examples: {
          title: "Grade Calculation Examples",
          description: "Step by step weighted grade calculations",
          examples: [
            {
              title: "Weighted Grade: 3 Categories",
              steps: [
                "Homework (20%): 95 × 0.20 = 19.0",
                "Quizzes (30%): 82 × 0.30 = 24.6",
                "Exams (50%): 88 × 0.50 = 44.0",
                "Total: 19.0 + 24.6 + 44.0",
              ],
              result: "Final Grade: 87.6% (B+)",
            },
            {
              title: "What Do I Need on the Final?",
              steps: [
                "Current grade: 78%, Final worth: 30%",
                "Want a B (80%)",
                "Need = (80 - 78 × 0.70) / 0.30",
                "Need = (80 - 54.6) / 0.30 = 84.7%",
              ],
              result: "Score 84.7% or higher on the final",
            },
          ],
        },
      },

      faqs: [
        { question: "How do I calculate my weighted grade?", answer: "Multiply each category's score by its weight (as a decimal), then add all results. Example: If homework (20%) = 90 and final (80%) = 75, your grade is 0.20×90 + 0.80×75 = 18 + 60 = 78%." },
        { question: "What score do I need on the final to get an A?", answer: "Use the 'What Do I Need on the Final?' mode. Enter your current grade, desired grade (e.g., 90% for an A), and the final's weight. The calculator tells you the exact score needed." },
        { question: "What if my weights don't add up to 100%?", answer: "The calculator automatically normalizes your weights. If you enter 20% + 30% = 50%, it will calculate as if those are the only components (normalizing to 40% + 60%)." },
        { question: "How do I convert my percentage to a letter grade?", answer: "Common US scale: A = 90-100%, B = 80-89%, C = 70-79%, D = 60-69%, F = below 60%. With plus/minus: A+ = 97+, A = 93-96, A- = 90-92, B+ = 87-89, etc." },
        { question: "Is this the same as a GPA calculator?", answer: "No. A grade calculator finds your percentage in a single course. A GPA calculator combines grades from multiple courses weighted by credit hours to find your overall grade point average." },
        { question: "Can I get a grade higher than 100%?", answer: "Only with extra credit. Standard weighted grades max out at 100%. If the 'needed on final' result exceeds 100%, your desired grade may not be achievable with the final exam alone." },
      ],

      rating: { title: "Rate this Calculator", share: "Share", copied: "Copied!", copyLink: "Copy Link", clickToRate: "Click to rate", youRated: "You rated", stars: "stars", averageFrom: "average from", ratings: "ratings" },
      common: { home: "Home", calculators: "Calculators" },
      buttons: { calculate: "Calculate", reset: "Reset", pdf: "PDF", csv: "CSV", excel: "Excel", save: "Save", saved: "Saved", saving: "Saving..." },
      share: { calculatedWith: "Calculated with Kalcufy.com" },
      accessibility: { mobileResults: "Results", closeModal: "Close", openMenu: "Menu" },
      sources: { title: "Sources & References" },
    },
    es: {
      "name": "Calculadora de Calificaciones",
      "slug": "calculadora-calificaciones",
      "subtitle": "Calcula tu calificación ponderada, porcentaje simple, o descubre qué necesitas en el examen final para alcanzar tu calificación objetivo.",
      "breadcrumb": "Calificaciones",
      "seo": {
        "title": "Calculadora de Calificaciones - Ponderada, Examen Final y Porcentaje",
        "description": "Calcula la calificación de tu clase con categorías ponderadas, encuentra tu puntaje porcentual, o determina qué necesitas en el final para obtener la calificación que deseas. Herramienta gratuita.",
        "shortDescription": "Calcula calificaciones ponderadas y puntajes de exámenes finales.",
        "keywords": [
          "calculadora de calificaciones",
          "calculadora de calificación ponderada",
          "calculadora de calificación final",
          "qué necesito en mi final",
          "calcular mi calificación",
          "calculadora de calificaciones gratis",
          "calculadora de calificación de clase",
          "calculadora de promedio ponderado"
        ]
      },
      "inputs": {
        "mode": {
          "label": "Tipo de Cálculo",
          "helpText": "Elige qué calcular",
          "options": {
            "weighted": "Calificación Ponderada",
            "simple": "Porcentaje Simple",
            "finalNeeded": "¿Qué Necesito en el Final?"
          }
        },
        "pointsEarned": {
          "label": "Puntos Obtenidos",
          "helpText": "Total de puntos que obtuviste"
        },
        "pointsPossible": {
          "label": "Puntos Posibles",
          "helpText": "Total de puntos posibles"
        },
        "currentGrade": {
          "label": "Calificación Actual (%)",
          "helpText": "Tu porcentaje actual de la clase"
        },
        "desiredGrade": {
          "label": "Calificación Deseada (%)",
          "helpText": "La calificación que quieres lograr"
        },
        "finalWeight": {
          "label": "Peso del Examen Final (%)",
          "helpText": "Cuánto cuenta el final hacia tu calificación"
        },
        "cat1Name": {
          "label": "Categoría 1",
          "helpText": "Nombre de la categoría (ej., Tareas)"
        },
        "cat1Score": {
          "label": "Puntaje (%)",
          "helpText": "Tu puntaje como porcentaje"
        },
        "cat1Weight": {
          "label": "Peso (%)",
          "helpText": "Cuánto cuenta esto hacia la calificación final"
        },
        "cat2Name": {
          "label": "Categoría 2",
          "helpText": "Nombre de la categoría"
        },
        "cat2Score": {
          "label": "Puntaje (%)",
          "helpText": "Porcentaje del puntaje"
        },
        "cat2Weight": {
          "label": "Peso (%)",
          "helpText": "Porcentaje del peso"
        },
        "cat3Name": {
          "label": "Categoría 3",
          "helpText": "Nombre de la categoría"
        },
        "cat3Score": {
          "label": "Puntaje (%)",
          "helpText": "Porcentaje del puntaje"
        },
        "cat3Weight": {
          "label": "Peso (%)",
          "helpText": "Porcentaje del peso"
        },
        "cat4Name": {
          "label": "Categoría 4 (Opcional)",
          "helpText": "Nombre de la categoría"
        },
        "cat4Score": {
          "label": "Puntaje (%)",
          "helpText": "Porcentaje del puntaje"
        },
        "cat4Weight": {
          "label": "Peso (%)",
          "helpText": "Porcentaje del peso"
        }
      },
      "results": {
        "finalGrade": {
          "label": "Tu Calificación"
        },
        "letterGrade": {
          "label": "Calificación con Letra"
        },
        "neededScore": {
          "label": "Puntaje Necesario en el Final"
        }
      },
      "presets": {
        "weighted": {
          "label": "Ponderada (Tareas + Parcial + Final)",
          "description": "Calificación ponderada estándar"
        },
        "simple": {
          "label": "156 de 200",
          "description": "Porcentaje simple"
        },
        "finalNeeded": {
          "label": "Necesito 90% — Final vale 40%",
          "description": "¿Qué puntaje necesito?"
        }
      },
      "values": {
        "%": "%",
        "of": "de"
      },
      "formats": {
        "summary": "Tu calificación: {grade}%"
      },
      "infoCards": {
        "metrics": {
          "title": "Resumen de Calificación",
          "items": [
            {
              "label": "Calificación Final",
              "valueKey": "finalGrade"
            },
            {
              "label": "Calificación con Letra",
              "valueKey": "letterGrade"
            },
            {
              "label": "Peso Total",
              "valueKey": "totalWeight"
            },
            {
              "label": "Categorías",
              "valueKey": "categoryCount"
            }
          ]
        },
        "details": {
          "title": "Escala de Calificaciones",
          "items": [
            {
              "label": "Rango A",
              "valueKey": "aRange"
            },
            {
              "label": "Rango B",
              "valueKey": "bRange"
            },
            {
              "label": "Rango C",
              "valueKey": "cRange"
            },
            {
              "label": "Rango D/F",
              "valueKey": "dRange"
            }
          ]
        },
        "tips": {
          "title": "Consejos de Estudio",
          "items": [
            "Las categorías de alto peso (como finales) tienen el mayor impacto — estudia proporcionalmente",
            "Seguir tu calificación durante el semestre te permite planificar tu esfuerzo estratégicamente",
            "Las tareas faltantes duelen más que los puntajes bajos — siempre entrega algo",
            "El crédito extra puede hacer una gran diferencia cuando estás cerca de un corte de calificación"
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "¿Qué Es una Calificación Ponderada?",
          "content": "Una calificación ponderada asigna diferente importancia a diferentes categorías de trabajo. En lugar de tratar cada tarea por igual, la calificación ponderada reconoce que algunas evaluaciones (como un examen final) deben contar más hacia tu calificación que otras (como una sola tarea). Por ejemplo, si las tareas valen 20% de tu calificación y el final vale 40%, obtener 100% en tareas pero 50% en el final te da un promedio ponderado de 0.20 × 100 + 0.40 × 50 = 40%, no el 75% que obtendrías con promedio simple. La mayoría de los cursos universitarios usan calificación ponderada."
        },
        "howItWorks": {
          "title": "Cómo Se Calculan las Calificaciones Ponderadas",
          "content": "La fórmula para calificaciones ponderadas es: Calificación Final = Σ(Puntaje × Peso) / Σ(Peso). La contribución de cada categoría es igual a su puntaje multiplicado por su porcentaje de peso. Por ejemplo, con Tareas (92%, peso 20%), Parcial (78%, peso 30%), y Final (85%, peso 50%): (92 × 0.20) + (78 × 0.30) + (85 × 0.50) = 18.4 + 23.4 + 42.5 = 84.3%. El cálculo '¿Qué Necesito en el Final?' reorganiza esta fórmula: Puntaje Requerido = (Calificación Deseada - Calificación Actual × (1 - Peso del Final)) / Peso del Final. Esto te dice exactamente qué puntaje del examen final logra tu calificación objetivo."
        },
        "considerations": {
          "title": "Notas Importantes",
          "items": [
            {
              "text": "Los pesos deben sumar 100% — si no lo hacen, la calculadora los normaliza automáticamente",
              "type": "warning"
            },
            {
              "text": "¿Se requiere un puntaje arriba de 100% en el final? Eso significa que tu calificación objetivo puede no ser alcanzable",
              "type": "warning"
            },
            {
              "text": "Ajustes de curva: Si tu profesor ajusta las calificaciones con curva, tu calificación con letra real puede ser más alta",
              "type": "info"
            },
            {
              "text": "Los cortes de calificación varían: Algunos profesores ponen A en 90%, otros en 93%. Revisa tu programa de estudios",
              "type": "info"
            },
            {
              "text": "Redondeo: La mayoría de profesores redondean hacia arriba en .5 (89.5% → 90% = A-), pero esto no está garantizado",
              "type": "info"
            },
            {
              "text": "Calificaciones eliminadas: Algunos cursos eliminan el puntaje más bajo de una categoría — esta calculadora no considera eso",
              "type": "info"
            }
          ]
        },
        "categories": {
          "title": "Cortes de Calificación Comunes",
          "items": [
            {
              "text": "A (90-100%): Excelente — demuestra dominio completo del material del curso",
              "type": "info"
            },
            {
              "text": "B (80-89%): Bueno — muestra comprensión sólida con espacio para mejorar",
              "type": "info"
            },
            {
              "text": "C (70-79%): Promedio — cumple las expectativas básicas del curso",
              "type": "info"
            },
            {
              "text": "D (60-69%): Bajo promedio — calificación mínima aprobatoria en la mayoría de instituciones",
              "type": "info"
            },
            {
              "text": "F (0-59%): Reprobado — no cumple estándares mínimos, no se otorgan créditos",
              "type": "info"
            },
            {
              "text": "Más/Menos: A+ (97+), A (93-96), A- (90-92), B+ (87-89), etc. — varía por escuela",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Ejemplos de Cálculo de Calificaciones",
          "description": "Cálculos paso a paso de calificaciones ponderadas",
          "examples": [
            {
              "title": "Calificación Ponderada: 3 Categorías",
              "steps": [
                "Tareas (20%): 95 × 0.20 = 19.0",
                "Cuestionarios (30%): 82 × 0.30 = 24.6",
                "Exámenes (50%): 88 × 0.50 = 44.0",
                "Total: 19.0 + 24.6 + 44.0"
              ],
              "result": "Calificación Final: 87.6% (B+)"
            },
            {
              "title": "¿Qué Necesito en el Final?",
              "steps": [
                "Calificación actual: 78%, Final vale: 30%",
                "Quiero una B (80%)",
                "Necesito = (80 - 78 × 0.70) / 0.30",
                "Necesito = (80 - 54.6) / 0.30 = 84.7%"
              ],
              "result": "Obtener 84.7% o más en el final"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "¿Cómo calculo mi calificación ponderada?",
          "answer": "Multiplica el puntaje de cada categoría por su peso (como decimal), luego suma todos los resultados. Ejemplo: Si tareas (20%) = 90 y final (80%) = 75, tu calificación es 0.20×90 + 0.80×75 = 18 + 60 = 78%."
        },
        {
          "question": "¿Qué puntaje necesito en el final para obtener una A?",
          "answer": "Usa el modo '¿Qué Necesito en el Final?'. Ingresa tu calificación actual, calificación deseada (ej., 90% para una A), y el peso del final. La calculadora te dice el puntaje exacto necesario."
        },
        {
          "question": "¿Qué pasa si mis pesos no suman 100%?",
          "answer": "La calculadora normaliza automáticamente tus pesos. Si ingresas 20% + 30% = 50%, calculará como si esos fueran los únicos componentes (normalizando a 40% + 60%)."
        },
        {
          "question": "¿Cómo convierto mi porcentaje a una calificación con letra?",
          "answer": "Escala común de EE.UU.: A = 90-100%, B = 80-89%, C = 70-79%, D = 60-69%, F = menos de 60%. Con más/menos: A+ = 97+, A = 93-96, A- = 90-92, B+ = 87-89, etc."
        },
        {
          "question": "¿Es lo mismo que una calculadora de GPA?",
          "answer": "No. Una calculadora de calificaciones encuentra tu porcentaje en un solo curso. Una calculadora de GPA combina calificaciones de múltiples cursos ponderados por horas de crédito para encontrar tu promedio general de puntos de calificación."
        },
        {
          "question": "¿Puedo obtener una calificación mayor a 100%?",
          "answer": "Solo con crédito extra. Las calificaciones ponderadas estándar tienen un máximo de 100%. Si el resultado 'necesario en el final' excede 100%, tu calificación deseada puede no ser alcanzable solo con el examen final."
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
      "name": "Calculadora de Notas",
      "slug": "calculadora-notas",
      "subtitle": "Calcule sua nota ponderada, porcentagem simples ou descubra o que você precisa na prova final para atingir sua nota desejada.",
      "breadcrumb": "Notas",
      "seo": {
        "title": "Calculadora de Notas - Ponderada, Prova Final e Porcentagem",
        "description": "Calcule sua nota da disciplina com categorias ponderadas, encontre sua pontuação percentual ou determine o que você precisa na final para obter a nota desejada. Ferramenta gratuita.",
        "shortDescription": "Calcule notas ponderadas e pontuações de provas finais.",
        "keywords": [
          "calculadora de notas",
          "calculadora de nota ponderada",
          "calculadora de nota final",
          "o que preciso na minha final",
          "calcular minha nota",
          "calculadora de notas grátis",
          "calculadora de nota da turma",
          "calculadora de média ponderada"
        ]
      },
      "inputs": {
        "mode": {
          "label": "Tipo de Cálculo",
          "helpText": "Escolha o que calcular",
          "options": {
            "weighted": "Nota Ponderada",
            "simple": "Porcentagem Simples",
            "finalNeeded": "O que Preciso na Final?"
          }
        },
        "pointsEarned": {
          "label": "Pontos Obtidos",
          "helpText": "Total de pontos que você obteve"
        },
        "pointsPossible": {
          "label": "Pontos Possíveis",
          "helpText": "Total de pontos possíveis"
        },
        "currentGrade": {
          "label": "Nota Atual (%)",
          "helpText": "Sua porcentagem atual na disciplina"
        },
        "desiredGrade": {
          "label": "Nota Desejada (%)",
          "helpText": "A nota que você quer alcançar"
        },
        "finalWeight": {
          "label": "Peso da Prova Final (%)",
          "helpText": "Quanto a final conta para sua nota"
        },
        "cat1Name": {
          "label": "Categoria 1",
          "helpText": "Nome da categoria (ex: Trabalhos de Casa)"
        },
        "cat1Score": {
          "label": "Pontuação (%)",
          "helpText": "Sua pontuação como porcentagem"
        },
        "cat1Weight": {
          "label": "Peso (%)",
          "helpText": "Quanto isso conta para a nota final"
        },
        "cat2Name": {
          "label": "Categoria 2",
          "helpText": "Nome da categoria"
        },
        "cat2Score": {
          "label": "Pontuação (%)",
          "helpText": "Porcentagem da pontuação"
        },
        "cat2Weight": {
          "label": "Peso (%)",
          "helpText": "Porcentagem do peso"
        },
        "cat3Name": {
          "label": "Categoria 3",
          "helpText": "Nome da categoria"
        },
        "cat3Score": {
          "label": "Pontuação (%)",
          "helpText": "Porcentagem da pontuação"
        },
        "cat3Weight": {
          "label": "Peso (%)",
          "helpText": "Porcentagem do peso"
        },
        "cat4Name": {
          "label": "Categoria 4 (Opcional)",
          "helpText": "Nome da categoria"
        },
        "cat4Score": {
          "label": "Pontuação (%)",
          "helpText": "Porcentagem da pontuação"
        },
        "cat4Weight": {
          "label": "Peso (%)",
          "helpText": "Porcentagem do peso"
        }
      },
      "results": {
        "finalGrade": {
          "label": "Sua Nota"
        },
        "letterGrade": {
          "label": "Conceito"
        },
        "neededScore": {
          "label": "Pontuação Necessária na Final"
        }
      },
      "presets": {
        "weighted": {
          "label": "Ponderada (TC + Parcial + Final)",
          "description": "Nota ponderada padrão"
        },
        "simple": {
          "label": "156 de 200",
          "description": "Porcentagem simples"
        },
        "finalNeeded": {
          "label": "Preciso de 90% — Final vale 40%",
          "description": "Que nota preciso?"
        }
      },
      "values": {
        "%": "%",
        "of": "de"
      },
      "formats": {
        "summary": "Sua nota: {grade}%"
      },
      "infoCards": {
        "metrics": {
          "title": "Resumo da Nota",
          "items": [
            {
              "label": "Nota Final",
              "valueKey": "finalGrade"
            },
            {
              "label": "Conceito",
              "valueKey": "letterGrade"
            },
            {
              "label": "Peso Total",
              "valueKey": "totalWeight"
            },
            {
              "label": "Categorias",
              "valueKey": "categoryCount"
            }
          ]
        },
        "details": {
          "title": "Escala de Notas",
          "items": [
            {
              "label": "Faixa A",
              "valueKey": "aRange"
            },
            {
              "label": "Faixa B",
              "valueKey": "bRange"
            },
            {
              "label": "Faixa C",
              "valueKey": "cRange"
            },
            {
              "label": "Faixa D/F",
              "valueKey": "dRange"
            }
          ]
        },
        "tips": {
          "title": "Dicas de Estudo",
          "items": [
            "Categorias de alto peso (como finais) têm maior impacto — estude proporcionalmente",
            "Acompanhar sua nota durante o semestre permite planejar seu esforço estrategicamente",
            "Trabalhos não entregues prejudicam mais que notas baixas — sempre entregue algo",
            "Pontos extras podem fazer grande diferença quando você está próximo do limite de uma nota"
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "O que é uma Nota Ponderada?",
          "content": "Uma nota ponderada atribui diferentes importâncias a diferentes categorias de trabalho. Em vez de tratar todas as atividades igualmente, a avaliação ponderada reconhece que algumas avaliações (como uma prova final) devem contar mais para sua nota do que outras (como um único trabalho de casa). Por exemplo, se trabalhos de casa valem 20% da sua nota e a final vale 40%, obter 100% nos trabalhos mas 50% na final resulta em média ponderada de 0,20 × 100 + 0,40 × 50 = 40%, não os 75% que você obteria com média simples. A maioria dos cursos universitários usa avaliação ponderada."
        },
        "howItWorks": {
          "title": "Como Notas Ponderadas São Calculadas",
          "content": "A fórmula para notas ponderadas é: Nota Final = Σ(Pontuação × Peso) / Σ(Peso). A contribuição de cada categoria é igual à sua pontuação multiplicada pela porcentagem do peso. Por exemplo, com Trabalhos de Casa (92%, peso 20%), Parcial (78%, peso 30%), e Final (85%, peso 50%): (92 × 0,20) + (78 × 0,30) + (85 × 0,50) = 18,4 + 23,4 + 42,5 = 84,3%. O cálculo 'O que Preciso na Final?' reorganiza esta fórmula: Pontuação Necessária = (Nota Desejada - Nota Atual × (1 - Peso da Final)) / Peso da Final. Isso te diz exatamente que pontuação na prova final alcança sua nota alvo."
        },
        "considerations": {
          "title": "Observações Importantes",
          "items": [
            {
              "text": "Pesos devem somar 100% — se não somarem, a calculadora os normaliza automaticamente",
              "type": "warning"
            },
            {
              "text": "É necessária pontuação acima de 100% na final? Isso significa que sua nota alvo pode não ser alcançável",
              "type": "warning"
            },
            {
              "text": "Ajustes de curva: Se seu professor faz curva nas notas, seu conceito real pode ser maior",
              "type": "info"
            },
            {
              "text": "Limites de nota variam: Alguns professores definem A em 90%, outros em 93%. Verifique seu programa",
              "type": "info"
            },
            {
              "text": "Arredondamento: A maioria dos professores arredonda para cima em 0,5 (89,5% → 90% = A-), mas isso não é garantido",
              "type": "info"
            },
            {
              "text": "Notas descartadas: Alguns cursos descartam a menor nota de uma categoria — esta calculadora não considera isso",
              "type": "info"
            }
          ]
        },
        "categories": {
          "title": "Limites Comuns de Conceitos",
          "items": [
            {
              "text": "A (90-100%): Excelente — demonstra domínio completo do material do curso",
              "type": "info"
            },
            {
              "text": "B (80-89%): Bom — mostra forte compreensão com espaço para melhoria",
              "type": "info"
            },
            {
              "text": "C (70-79%): Médio — atende às expectativas básicas do curso",
              "type": "info"
            },
            {
              "text": "D (60-69%): Abaixo da média — nota mínima de aprovação na maioria das instituições",
              "type": "info"
            },
            {
              "text": "F (0-59%): Reprovado — não atende aos padrões mínimos, nenhum crédito obtido",
              "type": "info"
            },
            {
              "text": "Mais/Menos: A+ (97+), A (93-96), A- (90-92), B+ (87-89), etc. — varia por escola",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemplos de Cálculo de Notas",
          "description": "Cálculos de notas ponderadas passo a passo",
          "examples": [
            {
              "title": "Nota Ponderada: 3 Categorias",
              "steps": [
                "Trabalhos de Casa (20%): 95 × 0,20 = 19,0",
                "Testes (30%): 82 × 0,30 = 24,6",
                "Provas (50%): 88 × 0,50 = 44,0",
                "Total: 19,0 + 24,6 + 44,0"
              ],
              "result": "Nota Final: 87,6% (B+)"
            },
            {
              "title": "O que Preciso na Final?",
              "steps": [
                "Nota atual: 78%, Final vale: 30%",
                "Quero um B (80%)",
                "Preciso = (80 - 78 × 0,70) / 0,30",
                "Preciso = (80 - 54,6) / 0,30 = 84,7%"
              ],
              "result": "Obter 84,7% ou mais na final"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Como calculo minha nota ponderada?",
          "answer": "Multiplique a pontuação de cada categoria pelo seu peso (como decimal), depois some todos os resultados. Exemplo: Se trabalhos de casa (20%) = 90 e final (80%) = 75, sua nota é 0,20×90 + 0,80×75 = 18 + 60 = 78%."
        },
        {
          "question": "Que nota preciso na final para obter um A?",
          "answer": "Use o modo 'O que Preciso na Final?'. Digite sua nota atual, nota desejada (ex: 90% para um A), e o peso da final. A calculadora informa a pontuação exata necessária."
        },
        {
          "question": "E se meus pesos não somarem 100%?",
          "answer": "A calculadora normaliza automaticamente seus pesos. Se você digitar 20% + 30% = 50%, ela calculará como se esses fossem os únicos componentes (normalizando para 40% + 60%)."
        },
        {
          "question": "Como converto minha porcentagem para conceito?",
          "answer": "Escala comum brasileira: A = 90-100%, B = 80-89%, C = 70-79%, D = 60-69%, F = abaixo de 60%. Com mais/menos: A+ = 97+, A = 93-96, A- = 90-92, B+ = 87-89, etc."
        },
        {
          "question": "É o mesmo que uma calculadora de CRA?",
          "answer": "Não. Uma calculadora de notas encontra sua porcentagem em uma única disciplina. Uma calculadora de CRA combina notas de múltiplas disciplinas ponderadas pelas horas de crédito para encontrar seu coeficiente de rendimento acadêmico geral."
        },
        {
          "question": "Posso obter uma nota maior que 100%?",
          "answer": "Apenas com pontos extras. Notas ponderadas padrão limitam-se a 100%. Se o resultado 'necessário na final' exceder 100%, sua nota desejada pode não ser alcançável apenas com a prova final."
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
      "name": "Calculateur de Notes",
      "slug": "calculateur-notes",
      "subtitle": "Calculez votre note pondérée, pourcentage simple, ou découvrez ce dont vous avez besoin à l'examen final pour atteindre votre note cible.",
      "breadcrumb": "Note",
      "seo": {
        "title": "Calculateur de Notes - Pondérées, Examen Final & Pourcentage",
        "description": "Calculez votre note de classe avec des catégories pondérées, trouvez votre score en pourcentage, ou déterminez ce dont vous avez besoin à l'examen final pour obtenir la note souhaitée. Outil gratuit.",
        "shortDescription": "Calculez les notes pondérées et scores d'examens finaux.",
        "keywords": [
          "calculateur de notes",
          "calculateur de notes pondérées",
          "calculateur de note finale",
          "que dois-je avoir à mon final",
          "calculer ma note",
          "calculateur de notes gratuit",
          "calculateur de notes de classe",
          "calculateur de moyenne pondérée"
        ]
      },
      "inputs": {
        "mode": {
          "label": "Type de Calcul",
          "helpText": "Choisissez quoi calculer",
          "options": {
            "weighted": "Note Pondérée",
            "simple": "Pourcentage Simple",
            "finalNeeded": "Que Dois-je Avoir au Final ?"
          }
        },
        "pointsEarned": {
          "label": "Points Obtenus",
          "helpText": "Total des points que vous avez obtenus"
        },
        "pointsPossible": {
          "label": "Points Possibles",
          "helpText": "Total des points possibles"
        },
        "currentGrade": {
          "label": "Note Actuelle (%)",
          "helpText": "Votre pourcentage actuel de classe"
        },
        "desiredGrade": {
          "label": "Note Désirée (%)",
          "helpText": "La note que vous voulez atteindre"
        },
        "finalWeight": {
          "label": "Poids de l'Examen Final (%)",
          "helpText": "Combien l'examen final compte dans votre note"
        },
        "cat1Name": {
          "label": "Catégorie 1",
          "helpText": "Nom de la catégorie (ex: Devoirs)"
        },
        "cat1Score": {
          "label": "Score (%)",
          "helpText": "Votre score en pourcentage"
        },
        "cat1Weight": {
          "label": "Poids (%)",
          "helpText": "Combien ceci compte dans la note finale"
        },
        "cat2Name": {
          "label": "Catégorie 2",
          "helpText": "Nom de la catégorie"
        },
        "cat2Score": {
          "label": "Score (%)",
          "helpText": "Pourcentage du score"
        },
        "cat2Weight": {
          "label": "Poids (%)",
          "helpText": "Pourcentage du poids"
        },
        "cat3Name": {
          "label": "Catégorie 3",
          "helpText": "Nom de la catégorie"
        },
        "cat3Score": {
          "label": "Score (%)",
          "helpText": "Pourcentage du score"
        },
        "cat3Weight": {
          "label": "Poids (%)",
          "helpText": "Pourcentage du poids"
        },
        "cat4Name": {
          "label": "Catégorie 4 (Optionnelle)",
          "helpText": "Nom de la catégorie"
        },
        "cat4Score": {
          "label": "Score (%)",
          "helpText": "Pourcentage du score"
        },
        "cat4Weight": {
          "label": "Poids (%)",
          "helpText": "Pourcentage du poids"
        }
      },
      "results": {
        "finalGrade": {
          "label": "Votre Note"
        },
        "letterGrade": {
          "label": "Note Lettre"
        },
        "neededScore": {
          "label": "Score Nécessaire au Final"
        }
      },
      "presets": {
        "weighted": {
          "label": "Pondéré (Devoirs + Partiel + Final)",
          "description": "Note pondérée standard"
        },
        "simple": {
          "label": "156 sur 200",
          "description": "Pourcentage simple"
        },
        "finalNeeded": {
          "label": "Besoin de 90% — Final vaut 40%",
          "description": "Quel score dois-je avoir ?"
        }
      },
      "values": {
        "%": "%",
        "of": "sur"
      },
      "formats": {
        "summary": "Votre note : {grade}%"
      },
      "infoCards": {
        "metrics": {
          "title": "Résumé de la Note",
          "items": [
            {
              "label": "Note Finale",
              "valueKey": "finalGrade"
            },
            {
              "label": "Note Lettre",
              "valueKey": "letterGrade"
            },
            {
              "label": "Poids Total",
              "valueKey": "totalWeight"
            },
            {
              "label": "Catégories",
              "valueKey": "categoryCount"
            }
          ]
        },
        "details": {
          "title": "Échelle de Notes",
          "items": [
            {
              "label": "Plage A",
              "valueKey": "aRange"
            },
            {
              "label": "Plage B",
              "valueKey": "bRange"
            },
            {
              "label": "Plage C",
              "valueKey": "cRange"
            },
            {
              "label": "Plage D/F",
              "valueKey": "dRange"
            }
          ]
        },
        "tips": {
          "title": "Conseils d'Étude",
          "items": [
            "Les catégories à poids élevé (comme les finaux) ont le plus gros impact — étudiez proportionnellement",
            "Suivre votre note pendant le semestre vous permet de planifier vos efforts stratégiquement",
            "Les devoirs manqués font plus mal que les scores faibles — soumettez toujours quelque chose",
            "Les points bonus peuvent faire une grande différence quand vous êtes proche d'un seuil de note"
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Qu'est-ce qu'une Note Pondérée ?",
          "content": "Une note pondérée assigne une importance différente à différentes catégories de travail. Plutôt que de traiter chaque devoir de façon égale, la notation pondérée reconnaît que certaines évaluations (comme un examen final) devraient compter plus dans votre note que d'autres (comme un seul devoir). Par exemple, si les devoirs valent 20% de votre note et le final 40%, obtenir 100% aux devoirs mais 50% au final vous donne une moyenne pondérée de 0,20 × 100 + 0,40 × 50 = 40%, pas les 75% que vous obtiendriez avec une moyenne simple. La plupart des cours universitaires utilisent la notation pondérée."
        },
        "howItWorks": {
          "title": "Comment les Notes Pondérées sont Calculées",
          "content": "La formule pour les notes pondérées est : Note Finale = Σ(Score × Poids) / Σ(Poids). La contribution de chaque catégorie égale son score multiplié par son pourcentage de poids. Par exemple, avec Devoirs (92%, poids 20%), Partiel (78%, poids 30%), et Final (85%, poids 50%) : (92 × 0,20) + (78 × 0,30) + (85 × 0,50) = 18,4 + 23,4 + 42,5 = 84,3%. Le calcul 'Que Dois-je Avoir au Final ?' réarrange cette formule : Score Requis = (Note Désirée - Note Actuelle × (1 - Poids Final)) / Poids Final. Ceci vous dit exactement quel score d'examen final atteint votre note cible."
        },
        "considerations": {
          "title": "Notes Importantes",
          "items": [
            {
              "text": "Les poids devraient totaliser 100% — sinon, le calculateur les normalise automatiquement",
              "type": "warning"
            },
            {
              "text": "Un score au-dessus de 100% au final est requis ? Cela signifie que votre note cible pourrait ne pas être atteignable",
              "type": "warning"
            },
            {
              "text": "Ajustements de courbe : Si votre professeur ajuste les notes, votre note lettre réelle pourrait être plus élevée",
              "type": "info"
            },
            {
              "text": "Les seuils de notes varient : Certains professeurs fixent A à 90%, d'autres à 93%. Vérifiez votre plan de cours",
              "type": "info"
            },
            {
              "text": "Arrondissement : La plupart des professeurs arrondissent à ,5 (89,5% → 90% = A-), mais ce n'est pas garanti",
              "type": "info"
            },
            {
              "text": "Notes supprimées : Certains cours suppriment la note la plus basse d'une catégorie — ce calculateur n'en tient pas compte",
              "type": "info"
            }
          ]
        },
        "categories": {
          "title": "Seuils de Notes Communs",
          "items": [
            {
              "text": "A (90-100%) : Excellent — démontre une maîtrise complète du contenu du cours",
              "type": "info"
            },
            {
              "text": "B (80-89%) : Bien — montre une forte compréhension avec place à l'amélioration",
              "type": "info"
            },
            {
              "text": "C (70-79%) : Moyen — répond aux attentes de base du cours",
              "type": "info"
            },
            {
              "text": "D (60-69%) : Sous la moyenne — note de passage minimum dans la plupart des institutions",
              "type": "info"
            },
            {
              "text": "F (0-59%) : Échec — ne répond pas aux standards minimum, aucun crédit obtenu",
              "type": "info"
            },
            {
              "text": "Plus/Moins : A+ (97+), A (93-96), A- (90-92), B+ (87-89), etc. — varie selon l'école",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Exemples de Calcul de Notes",
          "description": "Calculs de notes pondérées étape par étape",
          "examples": [
            {
              "title": "Note Pondérée : 3 Catégories",
              "steps": [
                "Devoirs (20%) : 95 × 0,20 = 19,0",
                "Quiz (30%) : 82 × 0,30 = 24,6",
                "Examens (50%) : 88 × 0,50 = 44,0",
                "Total : 19,0 + 24,6 + 44,0"
              ],
              "result": "Note Finale : 87,6% (B+)"
            },
            {
              "title": "Que Dois-je Avoir au Final ?",
              "steps": [
                "Note actuelle : 78%, Final vaut : 30%",
                "Veux un B (80%)",
                "Besoin = (80 - 78 × 0,70) / 0,30",
                "Besoin = (80 - 54,6) / 0,30 = 84,7%"
              ],
              "result": "Scorer 84,7% ou plus au final"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Comment calculer ma note pondérée ?",
          "answer": "Multipliez le score de chaque catégorie par son poids (en décimal), puis additionnez tous les résultats. Exemple : Si devoirs (20%) = 90 et final (80%) = 75, votre note est 0,20×90 + 0,80×75 = 18 + 60 = 78%."
        },
        {
          "question": "Quel score dois-je avoir au final pour obtenir un A ?",
          "answer": "Utilisez le mode 'Que Dois-je Avoir au Final ?'. Entrez votre note actuelle, note désirée (ex: 90% pour un A), et le poids du final. Le calculateur vous dit le score exact nécessaire."
        },
        {
          "question": "Et si mes poids ne totalisent pas 100% ?",
          "answer": "Le calculateur normalise automatiquement vos poids. Si vous entrez 20% + 30% = 50%, il calculera comme si c'étaient les seuls composants (normalisant à 40% + 60%)."
        },
        {
          "question": "Comment convertir mon pourcentage en note lettre ?",
          "answer": "Échelle US commune : A = 90-100%, B = 80-89%, C = 70-79%, D = 60-69%, F = sous 60%. Avec plus/moins : A+ = 97+, A = 93-96, A- = 90-92, B+ = 87-89, etc."
        },
        {
          "question": "Est-ce la même chose qu'un calculateur de GPA ?",
          "answer": "Non. Un calculateur de notes trouve votre pourcentage dans un seul cours. Un calculateur de GPA combine les notes de plusieurs cours pondérées par les heures de crédit pour trouver votre moyenne générale."
        },
        {
          "question": "Puis-je obtenir une note supérieure à 100% ?",
          "answer": "Seulement avec des points bonus. Les notes pondérées standard plafonnent à 100%. Si le résultat 'nécessaire au final' dépasse 100%, votre note désirée pourrait ne pas être atteignable avec l'examen final seul."
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
      "name": "Notenrechner",
      "slug": "noten-rechner",
      "subtitle": "Berechnen Sie Ihre gewichtete Note, einfache Prozente oder finden Sie heraus, was Sie in der Abschlussprüfung brauchen, um Ihre Zielnote zu erreichen.",
      "breadcrumb": "Noten",
      "seo": {
        "title": "Notenrechner - Gewichtet, Abschlussprüfung & Prozente",
        "description": "Berechnen Sie Ihre Klassennote mit gewichteten Kategorien, finden Sie Ihre Prozentwerte oder bestimmen Sie, was Sie in der Abschlussprüfung brauchen. Kostenloses Tool.",
        "shortDescription": "Berechnen Sie gewichtete Noten und Abschlussprüfungsergebnisse.",
        "keywords": [
          "notenrechner",
          "gewichteter notenrechner",
          "abschlussnoten rechner",
          "was brauche ich in der abschlussprüfung",
          "meine note berechnen",
          "kostenloser notenrechner",
          "klassennoten rechner",
          "gewichteter durchschnitt rechner"
        ]
      },
      "inputs": {
        "mode": {
          "label": "Berechnungsart",
          "helpText": "Wählen Sie, was berechnet werden soll",
          "options": {
            "weighted": "Gewichtete Note",
            "simple": "Einfache Prozente",
            "finalNeeded": "Was brauche ich in der Abschlussprüfung?"
          }
        },
        "pointsEarned": {
          "label": "Erreichte Punkte",
          "helpText": "Gesamtpunkte, die Sie erreicht haben"
        },
        "pointsPossible": {
          "label": "Mögliche Punkte",
          "helpText": "Gesamtmögliche Punkte"
        },
        "currentGrade": {
          "label": "Aktuelle Note (%)",
          "helpText": "Ihr aktueller Klassenprozentsatz"
        },
        "desiredGrade": {
          "label": "Gewünschte Note (%)",
          "helpText": "Die Note, die Sie erreichen möchten"
        },
        "finalWeight": {
          "label": "Gewichtung Abschlussprüfung (%)",
          "helpText": "Wie viel die Abschlussprüfung zu Ihrer Note zählt"
        },
        "cat1Name": {
          "label": "Kategorie 1",
          "helpText": "Kategoriename (z.B. Hausaufgaben)"
        },
        "cat1Score": {
          "label": "Punktzahl (%)",
          "helpText": "Ihre Punktzahl als Prozentsatz"
        },
        "cat1Weight": {
          "label": "Gewichtung (%)",
          "helpText": "Wie viel dies zur Endnote zählt"
        },
        "cat2Name": {
          "label": "Kategorie 2",
          "helpText": "Kategoriename"
        },
        "cat2Score": {
          "label": "Punktzahl (%)",
          "helpText": "Punktzahl in Prozent"
        },
        "cat2Weight": {
          "label": "Gewichtung (%)",
          "helpText": "Gewichtung in Prozent"
        },
        "cat3Name": {
          "label": "Kategorie 3",
          "helpText": "Kategoriename"
        },
        "cat3Score": {
          "label": "Punktzahl (%)",
          "helpText": "Punktzahl in Prozent"
        },
        "cat3Weight": {
          "label": "Gewichtung (%)",
          "helpText": "Gewichtung in Prozent"
        },
        "cat4Name": {
          "label": "Kategorie 4 (Optional)",
          "helpText": "Kategoriename"
        },
        "cat4Score": {
          "label": "Punktzahl (%)",
          "helpText": "Punktzahl in Prozent"
        },
        "cat4Weight": {
          "label": "Gewichtung (%)",
          "helpText": "Gewichtung in Prozent"
        }
      },
      "results": {
        "finalGrade": {
          "label": "Ihre Note"
        },
        "letterGrade": {
          "label": "Buchstabennote"
        },
        "neededScore": {
          "label": "Benötigte Punktzahl in der Abschlussprüfung"
        }
      },
      "presets": {
        "weighted": {
          "label": "Gewichtet (Hausaufgaben + Zwischenprüfung + Abschlussprüfung)",
          "description": "Standard gewichtete Note"
        },
        "simple": {
          "label": "156 von 200",
          "description": "Einfache Prozente"
        },
        "finalNeeded": {
          "label": "Brauche 90% — Abschlussprüfung ist 40%",
          "description": "Welche Punktzahl brauche ich?"
        }
      },
      "values": {
        "%": "%",
        "of": "von"
      },
      "formats": {
        "summary": "Ihre Note: {grade}%"
      },
      "infoCards": {
        "metrics": {
          "title": "Notenübersicht",
          "items": [
            {
              "label": "Endnote",
              "valueKey": "finalGrade"
            },
            {
              "label": "Buchstabennote",
              "valueKey": "letterGrade"
            },
            {
              "label": "Gesamtgewichtung",
              "valueKey": "totalWeight"
            },
            {
              "label": "Kategorien",
              "valueKey": "categoryCount"
            }
          ]
        },
        "details": {
          "title": "Notenskala",
          "items": [
            {
              "label": "Sehr gut Bereich",
              "valueKey": "aRange"
            },
            {
              "label": "Gut Bereich",
              "valueKey": "bRange"
            },
            {
              "label": "Befriedigend Bereich",
              "valueKey": "cRange"
            },
            {
              "label": "Ausreichend/Mangelhaft Bereich",
              "valueKey": "dRange"
            }
          ]
        },
        "tips": {
          "title": "Lerntipps",
          "items": [
            "Kategorien mit hoher Gewichtung (wie Abschlussprüfungen) haben den größten Einfluss — lernen Sie proportional",
            "Die Verfolgung Ihrer Note während des Semesters ermöglicht strategische Planung Ihres Lernaufwands",
            "Fehlende Aufgaben schaden mehr als niedrige Punktzahlen — reichen Sie immer etwas ein",
            "Zusatzpunkte können einen großen Unterschied machen, wenn Sie nahe an einer Notengrenze sind"
          ]
        }
      },
      "education": {
        "whatIs": {
          "title": "Was ist eine gewichtete Note?",
          "content": "Eine gewichtete Note weist verschiedenen Kategorien von Arbeiten unterschiedliche Wichtigkeit zu. Anstatt jede Aufgabe gleich zu behandeln, erkennt die gewichtete Benotung an, dass einige Bewertungen (wie eine Abschlussprüfung) mehr zu Ihrer Note zählen sollten als andere (wie eine einzelne Hausaufgabe). Zum Beispiel: Wenn Hausaufgaben 20% Ihrer Note ausmachen und die Abschlussprüfung 40%, ergibt 100% bei Hausaufgaben aber 50% in der Abschlussprüfung einen gewichteten Durchschnitt von 0,20 × 100 + 0,40 × 50 = 40%, nicht die 75%, die Sie mit einfacher Durchschnittsbildung erhalten würden. Die meisten Hochschulkurse verwenden gewichtete Benotung."
        },
        "howItWorks": {
          "title": "Wie gewichtete Noten berechnet werden",
          "content": "Die Formel für gewichtete Noten ist: Endnote = Σ(Punktzahl × Gewichtung) / Σ(Gewichtung). Der Beitrag jeder Kategorie entspricht ihrer Punktzahl multipliziert mit ihrem Gewichtungsprozentsatz. Zum Beispiel mit Hausaufgaben (92%, Gewichtung 20%), Zwischenprüfung (78%, Gewichtung 30%) und Abschlussprüfung (85%, Gewichtung 50%): (92 × 0,20) + (78 × 0,30) + (85 × 0,50) = 18,4 + 23,4 + 42,5 = 84,3%. Die Berechnung 'Was brauche ich in der Abschlussprüfung?' stellt diese Formel um: Benötigte Punktzahl = (Gewünschte Note - Aktuelle Note × (1 - Gewichtung Abschlussprüfung)) / Gewichtung Abschlussprüfung. Dies sagt Ihnen genau, welche Abschlussprüfungspunktzahl Ihre Zielnote erreicht."
        },
        "considerations": {
          "title": "Wichtige Hinweise",
          "items": [
            {
              "text": "Gewichtungen sollten sich zu 100% addieren — falls nicht, normalisiert der Rechner sie automatisch",
              "type": "warning"
            },
            {
              "text": "Eine Punktzahl über 100% in der Abschlussprüfung erforderlich? Das bedeutet, Ihre Zielnote ist möglicherweise nicht erreichbar",
              "type": "warning"
            },
            {
              "text": "Kurvenanpassungen: Wenn Ihr Professor Noten anpasst, kann Ihre tatsächliche Buchstabennote höher sein",
              "type": "info"
            },
            {
              "text": "Notengrenzen variieren: Manche Professoren setzen Sehr gut bei 90%, andere bei 93%. Prüfen Sie Ihren Lehrplan",
              "type": "info"
            },
            {
              "text": "Rundung: Die meisten Professoren runden bei ,5 auf (89,5% → 90% = Gut-), aber das ist nicht garantiert",
              "type": "info"
            },
            {
              "text": "Gestrichene Noten: Manche Kurse streichen die niedrigste Punktzahl in einer Kategorie — dieser Rechner berücksichtigt das nicht",
              "type": "info"
            }
          ]
        },
        "categories": {
          "title": "Übliche Notengrenzen",
          "items": [
            {
              "text": "Sehr gut (90-100%): Ausgezeichnet — zeigt gründliche Beherrschung des Kursmaterials",
              "type": "info"
            },
            {
              "text": "Gut (80-89%): Gut — zeigt starkes Verständnis mit Verbesserungsmöglichkeiten",
              "type": "info"
            },
            {
              "text": "Befriedigend (70-79%): Durchschnitt — erfüllt grundlegende Erwartungen des Kurses",
              "type": "info"
            },
            {
              "text": "Ausreichend (60-69%): Unterdurchschnittlich — minimale Bestehensgrenze an den meisten Institutionen",
              "type": "info"
            },
            {
              "text": "Mangelhaft (0-59%): Nicht bestanden — erfüllt nicht die Mindeststandards, keine Punkte erhalten",
              "type": "info"
            },
            {
              "text": "Plus/Minus: Sehr gut+ (97+), Sehr gut (93-96), Sehr gut- (90-92), Gut+ (87-89), etc. — variiert je nach Schule",
              "type": "info"
            }
          ]
        },
        "examples": {
          "title": "Notenberechnungsbeispiele",
          "description": "Schritt-für-Schritt gewichtete Notenberechnungen",
          "examples": [
            {
              "title": "Gewichtete Note: 3 Kategorien",
              "steps": [
                "Hausaufgaben (20%): 95 × 0,20 = 19,0",
                "Tests (30%): 82 × 0,30 = 24,6",
                "Prüfungen (50%): 88 × 0,50 = 44,0",
                "Gesamt: 19,0 + 24,6 + 44,0"
              ],
              "result": "Endnote: 87,6% (Gut+)"
            },
            {
              "title": "Was brauche ich in der Abschlussprüfung?",
              "steps": [
                "Aktuelle Note: 78%, Abschlussprüfung wert: 30%",
                "Will ein Gut (80%)",
                "Benötigt = (80 - 78 × 0,70) / 0,30",
                "Benötigt = (80 - 54,6) / 0,30 = 84,7%"
              ],
              "result": "84,7% oder höher in der Abschlussprüfung erreichen"
            }
          ]
        }
      },
      "faqs": [
        {
          "question": "Wie berechne ich meine gewichtete Note?",
          "answer": "Multiplizieren Sie die Punktzahl jeder Kategorie mit ihrer Gewichtung (als Dezimalzahl) und addieren Sie alle Ergebnisse. Beispiel: Wenn Hausaufgaben (20%) = 90 und Abschlussprüfung (80%) = 75, ist Ihre Note 0,20×90 + 0,80×75 = 18 + 60 = 78%."
        },
        {
          "question": "Welche Punktzahl brauche ich in der Abschlussprüfung für ein Sehr gut?",
          "answer": "Verwenden Sie den Modus 'Was brauche ich in der Abschlussprüfung?'. Geben Sie Ihre aktuelle Note, gewünschte Note (z.B. 90% für Sehr gut) und die Gewichtung der Abschlussprüfung ein. Der Rechner sagt Ihnen die exakt benötigte Punktzahl."
        },
        {
          "question": "Was passiert, wenn meine Gewichtungen nicht 100% ergeben?",
          "answer": "Der Rechner normalisiert Ihre Gewichtungen automatisch. Wenn Sie 20% + 30% = 50% eingeben, berechnet er, als wären das die einzigen Komponenten (Normalisierung zu 40% + 60%)."
        },
        {
          "question": "Wie wandle ich meine Prozente in eine Buchstabennote um?",
          "answer": "Übliche deutsche Skala: Sehr gut = 90-100%, Gut = 80-89%, Befriedigend = 70-79%, Ausreichend = 60-69%, Mangelhaft = unter 60%. Mit Plus/Minus: Sehr gut+ = 97+, Sehr gut = 93-96, Sehr gut- = 90-92, Gut+ = 87-89, etc."
        },
        {
          "question": "Ist das dasselbe wie ein Notendurchschnittsrechner?",
          "answer": "Nein. Ein Notenrechner findet Ihre Prozente in einem einzelnen Kurs. Ein Notendurchschnittsrechner kombiniert Noten aus mehreren Kursen gewichtet nach Leistungspunkten, um Ihren Gesamtnotendurchschnitt zu finden."
        },
        {
          "question": "Kann ich eine Note höher als 100% bekommen?",
          "answer": "Nur mit Zusatzpunkten. Standard gewichtete Noten haben maximal 100%. Wenn das 'Benötigt in Abschlussprüfung' Ergebnis 100% überschreitet, ist Ihre gewünschte Note möglicherweise nicht allein mit der Abschlussprüfung erreichbar."
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
      id: "mode",
      type: "select",
      defaultValue: "weighted",
      options: [{ value: "weighted" }, { value: "simple" }, { value: "finalNeeded" }],
    },
    // Simple mode
    { id: "pointsEarned", type: "number", defaultValue: null, placeholder: "85", min: 0, showWhen: { field: "mode", value: "simple" } },
    { id: "pointsPossible", type: "number", defaultValue: null, placeholder: "100", min: 1, showWhen: { field: "mode", value: "simple" } },
    // Final needed mode
    { id: "currentGrade", type: "number", defaultValue: null, placeholder: "78", min: 0, max: 100, suffix: "%", showWhen: { field: "mode", value: "finalNeeded" } },
    { id: "desiredGrade", type: "number", defaultValue: null, placeholder: "90", min: 0, max: 100, suffix: "%", showWhen: { field: "mode", value: "finalNeeded" } },
    { id: "finalWeight", type: "number", defaultValue: null, placeholder: "40", min: 1, max: 100, suffix: "%", showWhen: { field: "mode", value: "finalNeeded" } },
    // Weighted mode - Category 1
    { id: "cat1Score", type: "number", defaultValue: null, placeholder: "92", min: 0, max: 200, suffix: "%", showWhen: { field: "mode", value: "weighted" } },
    { id: "cat1Weight", type: "number", defaultValue: null, placeholder: "20", min: 0, max: 100, suffix: "% wt", showWhen: { field: "mode", value: "weighted" } },
    // Category 2
    { id: "cat2Score", type: "number", defaultValue: null, placeholder: "78", min: 0, max: 200, suffix: "%", showWhen: { field: "mode", value: "weighted" } },
    { id: "cat2Weight", type: "number", defaultValue: null, placeholder: "30", min: 0, max: 100, suffix: "% wt", showWhen: { field: "mode", value: "weighted" } },
    // Category 3
    { id: "cat3Score", type: "number", defaultValue: null, placeholder: "85", min: 0, max: 200, suffix: "%", showWhen: { field: "mode", value: "weighted" } },
    { id: "cat3Weight", type: "number", defaultValue: null, placeholder: "50", min: 0, max: 100, suffix: "% wt", showWhen: { field: "mode", value: "weighted" } },
    // Category 4 (optional)
    { id: "cat4Score", type: "number", defaultValue: 0, placeholder: "0", min: 0, max: 200, suffix: "%", showWhen: { field: "mode", value: "weighted" } },
    { id: "cat4Weight", type: "number", defaultValue: 0, placeholder: "0", min: 0, max: 100, suffix: "% wt", showWhen: { field: "mode", value: "weighted" } },
  ],

  inputGroups: [],

  results: [
    { id: "finalGrade", type: "primary", format: "text" },
    { id: "letterGrade", type: "secondary", format: "text" },
    { id: "neededScore", type: "secondary", format: "text" },
  ],

  infoCards: [
    { id: "metrics", type: "list", icon: "📝", itemCount: 4 },
    { id: "details", type: "list", icon: "📊", itemCount: 4 },
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

  faqs: [{ id: "0" }, { id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }],

  references: [
    {
      authors: "National Council of Teachers of Mathematics",
      year: "2024",
      title: "Principles to Actions: Grading and Assessment",
      source: "NCTM",
      url: "https://www.nctm.org/",
    },
    {
      authors: "Association of American Colleges and Universities",
      year: "2024",
      title: "Valid Assessment of Learning",
      source: "AAC&U",
      url: "https://www.aacu.org/",
    },
  ],

  hero: { icon: "📝" },
  sidebar: {},
  features: {},
  relatedCalculators: ["gpa-calculator", "percentage-calculator"],
  ads: {},
};

function getLetterGrade(pct: number): string {
  if (pct >= 97) return "A+";
  if (pct >= 93) return "A";
  if (pct >= 90) return "A-";
  if (pct >= 87) return "B+";
  if (pct >= 83) return "B";
  if (pct >= 80) return "B-";
  if (pct >= 77) return "C+";
  if (pct >= 73) return "C";
  if (pct >= 70) return "C-";
  if (pct >= 67) return "D+";
  if (pct >= 63) return "D";
  if (pct >= 60) return "D-";
  return "F";
}

export function calculateGradeCalculator(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, t } = data;
  const v = (t?.values as Record<string, string>) || {};
  const f = (t?.formats as Record<string, string>) || {};

  const mode = values.mode as string;

  // --- Simple percentage ---
  if (mode === "simple") {
    const earned = values.pointsEarned as number | null;
    const possible = values.pointsPossible as number | null;
    if (!earned || !possible || possible === 0) return { values: {}, formatted: {}, summary: "", isValid: false };

    const pct = (earned / possible) * 100;
    const letter = getLetterGrade(pct);

    return {
      values: { finalGrade: pct, letterGrade: letter },
      formatted: {
        finalGrade: `${pct.toFixed(2)}%`,
        letterGrade: letter,
        neededScore: "—",
        totalWeight: "100%",
        categoryCount: "1",
        aRange: "90-100%", bRange: "80-89%", cRange: "70-79%", dRange: "60-69% / F < 60%",
      },
      summary: f.summary?.replace("{grade}", pct.toFixed(1)) || `Your grade: ${pct.toFixed(1)}% (${letter})`,
      isValid: true,
    };
  }

  // --- What do I need on the final? ---
  if (mode === "finalNeeded") {
    const current = values.currentGrade as number | null;
    const desired = values.desiredGrade as number | null;
    const finalWt = values.finalWeight as number | null;
    if (current === null || desired === null || finalWt === null || finalWt === 0) return { values: {}, formatted: {}, summary: "", isValid: false };

    const w = finalWt / 100;
    const needed = (desired - current * (1 - w)) / w;
    const letter = getLetterGrade(desired);
    const achievable = needed <= 100;

    return {
      values: { neededScore: needed, finalGrade: desired, letterGrade: letter },
      formatted: {
        finalGrade: `${desired}% (${letter})`,
        letterGrade: letter,
        neededScore: achievable ? `${needed.toFixed(1)}%` : `${needed.toFixed(1)}% (may not be achievable)`,
        totalWeight: `${finalWt}%`,
        categoryCount: "—",
        aRange: "90-100%", bRange: "80-89%", cRange: "70-79%", dRange: "60-69% / F < 60%",
      },
      summary: `You need ${needed.toFixed(1)}% on the final to get a ${desired}% (${letter})`,
      isValid: true,
    };
  }

  // --- Weighted grade ---
  if (mode === "weighted") {
    const cats: { score: number; weight: number }[] = [];
    for (let i = 1; i <= 4; i++) {
      const score = values[`cat${i}Score`] as number | null;
      const weight = values[`cat${i}Weight`] as number | null;
      if (score !== null && score !== undefined && weight !== null && weight !== undefined && weight > 0) {
        cats.push({ score, weight });
      }
    }

    if (cats.length === 0) return { values: {}, formatted: {}, summary: "", isValid: false };

    const totalWeight = cats.reduce((s, c) => s + c.weight, 0);
    const weightedSum = cats.reduce((s, c) => s + c.score * (c.weight / totalWeight), 0);
    const letter = getLetterGrade(weightedSum);

    return {
      values: { finalGrade: weightedSum, letterGrade: letter },
      formatted: {
        finalGrade: `${weightedSum.toFixed(2)}%`,
        letterGrade: letter,
        neededScore: "—",
        totalWeight: `${totalWeight}%${totalWeight !== 100 ? " (normalized)" : ""}`,
        categoryCount: String(cats.length),
        aRange: "90-100%", bRange: "80-89%", cRange: "70-79%", dRange: "60-69% / F < 60%",
      },
      summary: f.summary?.replace("{grade}", weightedSum.toFixed(1)) || `Your grade: ${weightedSum.toFixed(1)}% (${letter})`,
      isValid: true,
    };
  }

  return { values: {}, formatted: {}, summary: "", isValid: false };
}

export default gradeCalculatorConfig;
