import type {
  CalculatorConfigV4,
  CalculatorResults,
} from "@/engine/v4/types/engine.types";

// ═══════════════════════════════════════════════════════════════════════════════
// BMR CALCULATOR — V4.3 Engine
// ═══════════════════════════════════════════════════════════════════════════════
// Formulas: Mifflin-St Jeor (gold standard), Harris-Benedict (revised 1984),
//           Katch-McArdle (requires body fat %)
// Features: TDEE breakdown, weight goals, all-formula comparison, chart,
//           DetailedTable, unit dropdowns with UK stones support
// ═══════════════════════════════════════════════════════════════════════════════

export const bmrCalculatorConfig: CalculatorConfigV4 = {
  id: "bmr",
  version: "4.3",
  slug: "bmr-calculator",
  category: "health",
  icon: "🔥",

  // ═══════════════════════════════════════════════════════════════════════════
  // INPUTS
  // ═══════════════════════════════════════════════════════════════════════════
  inputs: [
    {
      id: "gender",
      type: "radio",
      defaultValue: "male",
      options: [{ value: "male" }, { value: "female" }],
    },
    {
      id: "age",
      type: "number",
      defaultValue: 30,
      min: 15,
      max: 80,
      suffix: "years",
    },
    {
      id: "weight",
      type: "number",
      defaultValue: null,
      placeholder: "180",
      unitType: "weight",
      syncGroup: false,
      defaultUnit: "lbs",
      allowedUnits: ["kg", "lbs", "st"],
    },
    {
      id: "height",
      type: "number",
      defaultValue: null,
      placeholder: "170",
      unitType: "height",
      syncGroup: false,
      defaultUnit: "cm",
      allowedUnits: ["cm", "m", "in", "ft_in"],
    },
    {
      id: "formula",
      type: "select",
      defaultValue: "mifflin",
      options: [
        { value: "mifflin" },
        { value: "harris" },
        { value: "katch" },
      ],
    },
    {
      id: "bodyFat",
      type: "number",
      defaultValue: null,
      placeholder: "20",
      min: 2,
      max: 60,
      suffix: "%",
      showWhen: { field: "formula", value: "katch" },
    es: {
      "slug": "calculadora-tmb",
      "title": "Calculadora de TMB (Tasa Metabólica Basal)",
      "meta": {
        "description": "Calcula tu tasa metabólica basal (TMB) con precisión usando las fórmulas de Harris-Benedict, Mifflin-St Jeor y Katch-McArdle. Descubre cuántas calorías quema tu cuerpo en reposo.",
        "keywords": "calculadora TMB, tasa metabólica basal, calorías en reposo, metabolismo basal, Harris-Benedict, Mifflin-St Jeor, Katch-McArdle"
      },
      "heading": "Calculadora de TMB (Tasa Metabólica Basal)",
      "subheading": "Calcula cuántas calorías quema tu cuerpo en reposo completo",
      "info": "La Tasa Metabólica Basal (TMB) es la cantidad de calorías que tu cuerpo necesita para mantener funciones vitales básicas como respirar, circulación sanguínea y producción celular mientras está en reposo completo.",
      "form": {
        "age": {
          "label": "Edad",
          "placeholder": "Ingresa tu edad",
          "unit": "años"
        },
        "gender": {
          "label": "Género",
          "options": {
            "male": "Masculino",
            "female": "Femenino"
          }
        },
        "weight": {
          "label": "Peso",
          "placeholder": "Ingresa tu peso"
        },
        "height": {
          "label": "Altura",
          "placeholder": "Ingresa tu altura"
        },
        "bodyFat": {
          "label": "Porcentaje de Grasa Corporal (opcional)",
          "placeholder": "Ingresa tu % de grasa corporal",
          "unit": "%"
        },
        "formula": {
          "label": "Fórmula de Cálculo",
          "options": {
            "harris": "Harris-Benedict",
            "mifflin": "Mifflin-St Jeor",
            "katch": "Katch-McArdle"
          }
        },
        "units": {
          "label": "Sistema de Unidades",
          "options": {
            "metric": "Métrico (kg, cm)",
            "imperial": "Imperial (lb, ft/in)"
          }
        }
      },
      "results": {
        "title": "Tu Tasa Metabólica Basal",
        "bmr": "TMB",
        "formula": "Fórmula utilizada",
        "description": "Esta es la cantidad de calorías que tu cuerpo quema en reposo completo para mantener funciones vitales básicas.",
        "note": "Para calcular tus necesidades calóricas totales, multiplica tu TMB por tu nivel de actividad física.",
        "activityLevels": {
          "title": "Multiplica por tu nivel de actividad:",
          "sedentary": "Sedentario (poco o nada de ejercicio): TMB × 1.2",
          "light": "Actividad ligera (ejercicio ligero 1-3 días/semana): TMB × 1.375",
          "moderate": "Actividad moderada (ejercicio moderado 3-5 días/semana): TMB × 1.55",
          "high": "Actividad alta (ejercicio intenso 6-7 días/semana): TMB × 1.725",
          "extreme": "Actividad extrema (ejercicio muy intenso, trabajo físico): TMB × 1.9"
        }
      },
      "formulas": {
        "title": "Fórmulas de TMB Explicadas",
        "harris": {
          "name": "Harris-Benedict",
          "description": "Fórmula clásica desarrollada en 1919, revisada en 1984. Ampliamente utilizada pero puede sobreestimar la TMB en algunas poblaciones."
        },
        "mifflin": {
          "name": "Mifflin-St Jeor",
          "description": "Fórmula más moderna (1990) considerada más precisa para la población general. Recomendada por muchos nutricionistas."
        },
        "katch": {
          "name": "Katch-McArdle",
          "description": "Considera la composición corporal (masa magra). Más precisa para personas con bajo porcentaje de grasa corporal o atletas."
        }
      },
      "tips": {
        "title": "Consejos para Usar tu TMB",
        "items": [
          "Tu TMB disminuye con la edad debido a la pérdida de masa muscular",
          "El músculo quema más calorías que la grasa, incluso en reposo",
          "La TMB representa aproximadamente 60-75% de tu gasto calórico total diario",
          "Factores como el estrés, la temperatura y ciertos medicamentos pueden afectar tu TMB",
          "Para perder peso, necesitas un déficit calórico por debajo de tu gasto total diario",
          "Nunca consumas menos calorías que tu TMB durante períodos prolongados"
        ]
      },
      "faq": {
        "title": "Preguntas Frecuentes",
        "items": [
          {
            "question": "¿Qué es la Tasa Metabólica Basal?",
            "answer": "La TMB es la cantidad mínima de calorías que tu cuerpo necesita para funcionar en reposo completo, manteniendo funciones vitales como respiración, circulación sanguínea y producción celular."
          },
          {
            "question": "¿Cuál es la diferencia entre TMB y TMR?",
            "answer": "TMB (Tasa Metabólica Basal) se mide en condiciones de laboratorio estrictas. TMR (Tasa Metabólica en Reposo) es más práctica y representa las calorías quemadas en reposo normal. TMR suele ser 10-15% mayor que TMB."
          },
          {
            "question": "¿Qué fórmula debo usar?",
            "answer": "Mifflin-St Jeor es más precisa para la mayoría de personas. Usa Katch-McArdle si conoces tu porcentaje de grasa corporal y eres atlético o tienes baja grasa corporal."
          },
          {
            "question": "¿Por qué necesito el porcentaje de grasa corporal?",
            "answer": "La fórmula Katch-McArdle usa la masa corporal magra (peso sin grasa) porque el músculo quema más calorías que la grasa, proporcionando una estimación más precisa."
          },
          {
            "question": "¿Con qué frecuencia cambia mi TMB?",
            "answer": "La TMB cambia gradualmente con la edad, peso, altura y composición corporal. Recalcula cada 6-12 meses o después de cambios significativos de peso."
          }
        ]
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
      "slug": "calculadora-taxa-metabolica-basal",
      "title": "Calculadora de Taxa Metabólica Basal (TMB)",
      "meta": {
        "description": "Calcule sua Taxa Metabólica Basal (TMB) - a quantidade de calorias que seu corpo queima em repouso. Use as fórmulas de Harris-Benedict, Mifflin-St Jeor ou Katch-McArdle.",
        "keywords": "calculadora TMB, taxa metabólica basal, calorias em repouso, metabolismo basal, gasto energético, Harris-Benedict, Mifflin-St Jeor, Katch-McArdle"
      },
      "heading": "Calculadora de Taxa Metabólica Basal",
      "subheading": "Descubra quantas calorias seu corpo queima em repouso absoluto",
      "info": "A Taxa Metabólica Basal (TMB) é a quantidade mínima de energia que seu corpo precisa para manter funções vitais em repouso completo. Este cálculo ajuda a determinar suas necessidades calóricas básicas.",
      "form": {
        "age": {
          "label": "Idade",
          "placeholder": "Digite sua idade",
          "unit": "anos"
        },
        "gender": {
          "label": "Sexo",
          "options": {
            "male": "Masculino",
            "female": "Feminino"
          }
        },
        "height": {
          "label": "Altura",
          "placeholder": "Digite sua altura",
          "unit": "cm"
        },
        "weight": {
          "label": "Peso",
          "placeholder": "Digite seu peso",
          "unit": "kg"
        },
        "formula": {
          "label": "Fórmula de Cálculo",
          "options": {
            "harris": "Harris-Benedict Revisada",
            "mifflin": "Mifflin-St Jeor",
            "katch": "Katch-McArdle"
          }
        },
        "bodyFat": {
          "label": "Percentual de Gordura Corporal",
          "placeholder": "Digite o percentual",
          "unit": "%",
          "help": "Necessário apenas para a fórmula Katch-McArdle"
        }
      },
      "results": {
        "title": "Sua Taxa Metabólica Basal",
        "bmr": "TMB",
        "unit": "calorias/dia",
        "formula_used": "Fórmula utilizada",
        "interpretation": {
          "title": "O que significa sua TMB",
          "description": "Esta é a quantidade mínima de calorias que seu corpo precisa diariamente para manter funções básicas como respiração, circulação e metabolismo celular."
        },
        "activity_levels": {
          "title": "Gasto Calórico Total Diário",
          "description": "Multiplique sua TMB pelo fator de atividade para encontrar suas necessidades calóricas totais:",
          "sedentary": {
            "label": "Sedentário",
            "description": "Pouco ou nenhum exercício",
            "multiplier": "TMB × 1,2"
          },
          "light": {
            "label": "Levemente ativo",
            "description": "Exercício leve 1-3 dias/semana",
            "multiplier": "TMB × 1,375"
          },
          "moderate": {
            "label": "Moderadamente ativo",
            "description": "Exercício moderado 3-5 dias/semana",
            "multiplier": "TMB × 1,55"
          },
          "active": {
            "label": "Muito ativo",
            "description": "Exercício intenso 6-7 dias/semana",
            "multiplier": "TMB × 1,725"
          },
          "extra": {
            "label": "Extremamente ativo",
            "description": "Exercício muito intenso, trabalho físico",
            "multiplier": "TMB × 1,9"
          }
        }
      },
      "formulas": {
        "title": "Fórmulas Utilizadas",
        "harris": {
          "name": "Harris-Benedict Revisada",
          "description": "Fórmula clássica atualizada, considera idade, peso, altura e sexo",
          "male": "Homens: TMB = 88,362 + (13,397 × peso) + (4,799 × altura) - (5,677 × idade)",
          "female": "Mulheres: TMB = 447,593 + (9,247 × peso) + (3,098 × altura) - (4,330 × idade)"
        },
        "mifflin": {
          "name": "Mifflin-St Jeor",
          "description": "Considerada mais precisa para a população atual",
          "male": "Homens: TMB = (10 × peso) + (6,25 × altura) - (5 × idade) + 5",
          "female": "Mulheres: TMB = (10 × peso) + (6,25 × altura) - (5 × idade) - 161"
        },
        "katch": {
          "name": "Katch-McArdle",
          "description": "Mais precisa para pessoas com baixo percentual de gordura corporal",
          "formula": "TMB = 370 + (21,6 × massa magra em kg)"
        }
      },
      "tips": {
        "title": "Dicas Importantes",
        "items": [
          "A TMB representa apenas as calorias em repouso absoluto",
          "Para necessidades calóricas totais, considere seu nível de atividade",
          "A fórmula Katch-McArdle é mais precisa se você conhece seu percentual de gordura",
          "Pessoas mais musculosas tendem a ter TMB mais alta",
          "A TMB diminui naturalmente com a idade"
        ]
      },
      "validation": {
        "age_required": "Por favor, insira sua idade",
        "age_range": "Idade deve estar entre 15 e 120 anos",
        "height_required": "Por favor, insira sua altura",
        "height_range": "Altura deve estar entre 100 e 250 cm",
        "weight_required": "Por favor, insira seu peso",
        "weight_range": "Peso deve estar entre 30 e 300 kg",
        "gender_required": "Por favor, selecione seu sexo",
        "body_fat_required": "Percentual de gordura corporal é obrigatório para a fórmula Katch-McArdle",
        "body_fat_range": "Percentual de gordura deve estar entre 3% e 50%"
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
      },
      "calculator": {
        "yourInformation": "Suas Informações"
      }
    },
    fr: {
      "slug": "calculateur-metabolisme-basal",
      "title": "Calculateur de Métabolisme de Base (BMR)",
      "description": "Calculez votre métabolisme de base (BMR) pour déterminer le nombre de calories que votre corps brûle au repos.",
      "keywords": "calculateur BMR, métabolisme de base, calories repos, dépense énergétique basale",
      "meta": {
        "title": "Calculateur BMR - Métabolisme de Base | Gratuit et Précis",
        "description": "Calculateur gratuit de métabolisme de base (BMR). Découvrez combien de calories votre corps brûle au repos avec différentes formules scientifiques."
      },
      "heading": "Calculateur de Métabolisme de Base",
      "subheading": "Découvrez combien de calories votre corps brûle au repos",
      "inputs": {
        "age": {
          "label": "Âge",
          "unit": "ans"
        },
        "weight": {
          "label": "Poids",
          "unit": "kg"
        },
        "height": {
          "label": "Taille",
          "unit": "cm"
        },
        "gender": {
          "label": "Sexe",
          "options": {
            "male": "Homme",
            "female": "Femme"
          }
        },
        "bodyFat": {
          "label": "Pourcentage de graisse corporelle",
          "unit": "%",
          "optional": "(optionnel)"
        },
        "formula": {
          "label": "Formule de calcul",
          "options": {
            "mifflin": "Mifflin-St Jeor",
            "harris": "Harris-Benedict",
            "katch": "Katch-McArdle",
            "cunningham": "Cunningham"
          }
        }
      },
      "results": {
        "title": "Votre Métabolisme de Base",
        "bmr": {
          "label": "BMR",
          "unit": "calories/jour",
          "description": "Calories brûlées au repos complet"
        },
        "interpretation": {
          "title": "Interprétation",
          "description": "Votre BMR représente le nombre minimum de calories que votre corps a besoin pour maintenir ses fonctions vitales au repos."
        }
      },
      "content": {
        "what_is": {
          "title": "Qu'est-ce que le Métabolisme de Base ?",
          "text": "Le métabolisme de base (BMR) est la quantité d'énergie que votre corps dépense au repos pour maintenir ses fonctions vitales comme la respiration, la circulation sanguine et la régulation de la température."
        },
        "formulas": {
          "title": "Formules de Calcul",
          "mifflin": {
            "title": "Mifflin-St Jeor",
            "description": "Formule la plus précise pour la plupart des personnes"
          },
          "harris": {
            "title": "Harris-Benedict",
            "description": "Formule classique, légèrement moins précise"
          },
          "katch": {
            "title": "Katch-McArdle",
            "description": "Utilise le pourcentage de graisse corporelle"
          },
          "cunningham": {
            "title": "Cunningham",
            "description": "Pour les personnes très sportives"
          }
        },
        "factors": {
          "title": "Facteurs Influençant le BMR",
          "list": [
            "Âge : diminue avec l'âge",
            "Sexe : généralement plus élevé chez les hommes",
            "Taille et poids : plus élevé pour les personnes plus grandes/lourdes",
            "Composition corporelle : plus de muscle = BMR plus élevé",
            "Génétique : varie selon les individus"
          ]
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
      "slug": "grundumsatz-rechner",
      "title": "Grundumsatz-Rechner",
      "description": "Berechnen Sie Ihren Grundumsatz (BMR) - die Anzahl der Kalorien, die Ihr Körper in Ruhe zur Aufrechterhaltung grundlegender Körperfunktionen benötigt.",
      "keywords": [
        "grundumsatz",
        "bmr rechner",
        "kalorienverbrauch",
        "stoffwechsel",
        "ruheumsatz",
        "kalorienbedarf",
        "metabolismus"
      ],
      "inputs": {
        "age": {
          "label": "Alter",
          "placeholder": "z.B. 30",
          "unit": "Jahre",
          "validation": {
            "min": "Das Alter muss mindestens 10 Jahre betragen",
            "max": "Das Alter darf nicht mehr als 120 Jahre betragen"
          }
        },
        "gender": {
          "label": "Geschlecht",
          "options": {
            "male": "Männlich",
            "female": "Weiblich"
          }
        },
        "weight": {
          "label": "Gewicht",
          "placeholder": "z.B. 70",
          "unit": "kg",
          "validation": {
            "min": "Das Gewicht muss mindestens 20 kg betragen",
            "max": "Das Gewicht darf nicht mehr als 500 kg betragen"
          }
        },
        "height": {
          "label": "Körpergröße",
          "placeholder": "z.B. 175",
          "unit": "cm",
          "validation": {
            "min": "Die Körpergröße muss mindestens 100 cm betragen",
            "max": "Die Körpergröße darf nicht mehr als 250 cm betragen"
          }
        },
        "bodyFat": {
          "label": "Körperfettanteil (optional)",
          "placeholder": "z.B. 15",
          "unit": "%",
          "validation": {
            "min": "Der Körperfettanteil muss mindestens 3% betragen",
            "max": "Der Körperfettanteil darf nicht mehr als 50% betragen"
          }
        },
        "formula": {
          "label": "Berechnungsformel",
          "options": {
            "mifflin": "Mifflin-St Jeor (Empfohlen)",
            "harris": "Harris-Benedict",
            "katch": "Katch-McArdle (benötigt Körperfettanteil)"
          }
        }
      },
      "results": {
        "title": "Ihr Grundumsatz",
        "bmr": {
          "label": "Grundumsatz (BMR)",
          "unit": "Kalorien/Tag"
        },
        "formula_used": {
          "label": "Verwendete Formel"
        }
      },
      "info": {
        "title": "Über den Grundumsatz",
        "content": "Der Grundumsatz (BMR) ist die Anzahl der Kalorien, die Ihr Körper in völliger Ruhe zur Aufrechterhaltung grundlegender Körperfunktionen wie Atmung, Durchblutung und Zellproduktion benötigt.",
        "formulas": {
          "title": "Berechnungsformeln",
          "mifflin": {
            "name": "Mifflin-St Jeor Gleichung",
            "description": "Gilt als die genaueste Formel für die meisten Menschen.",
            "formula_male": "BMR = 10 × Gewicht(kg) + 6.25 × Größe(cm) - 5 × Alter(Jahre) + 5",
            "formula_female": "BMR = 10 × Gewicht(kg) + 6.25 × Größe(cm) - 5 × Alter(Jahre) - 161"
          },
          "harris": {
            "name": "Harris-Benedict Gleichung",
            "description": "Eine ältere, aber weit verbreitete Formel, die tendenziell etwas höhere Werte liefert.",
            "formula_male": "BMR = 88.362 + (13.397 × Gewicht(kg)) + (4.799 × Größe(cm)) - (5.677 × Alter(Jahre))",
            "formula_female": "BMR = 447.593 + (9.247 × Gewicht(kg)) + (3.098 × Größe(cm)) - (4.330 × Alter(Jahre))"
          },
          "katch": {
            "name": "Katch-McArdle Gleichung",
            "description": "Berücksichtigt die Körperzusammensetzung und ist genauer für schlanke Personen.",
            "formula": "BMR = 370 + (21.6 × Magermasse(kg))"
          }
        }
      },
      "tips": {
        "title": "Wichtige Hinweise",
        "items": [
          "Der BMR ist nur ein Ausgangspunkt - Ihr tatsächlicher Kalorienbedarf hängt von Ihrer Aktivität ab",
          "Die Katch-McArdle-Formel ist am genauesten, wenn Sie Ihren Körperfettanteil kennen",
          "BMR-Werte sind Schätzungen und können je nach Stoffwechsel, Muskelmasse und anderen Faktoren variieren",
          "Für Ihren Gesamtkalorienbedarf multiplizieren Sie Ihren BMR mit einem Aktivitätsfaktor"
        ]
      },
      "meta": {
        "title": "Grundumsatz Rechner - BMR Kalorien berechnen | Kostenloser BMR Rechner",
        "description": "Berechnen Sie Ihren Grundumsatz (BMR) mit unserem kostenlosen Rechner. Verwenden Sie Mifflin-St Jeor, Harris-Benedict oder Katch-McArdle Formeln für genaue Kalorienschätzungen."
      },
      "faq": {
        "title": "Häufig gestellte Fragen",
        "items": [
          {
            "question": "Was ist der Unterschied zwischen BMR und TDEE?",
            "answer": "BMR (Grundumsatz) ist die Anzahl der Kalorien, die Sie in völliger Ruhe verbrennen. TDEE (Gesamter täglicher Energieverbrauch) ist Ihr BMR multipliziert mit einem Aktivitätsfaktor, um Ihre täglichen Aktivitäten zu berücksichtigen."
          },
          {
            "question": "Welche Formel ist am genauesten?",
            "answer": "Die Mifflin-St Jeor Gleichung gilt als die genaueste für die meisten Menschen. Die Katch-McArdle Formel ist genauer, wenn Sie Ihren Körperfettanteil kennen, besonders für schlanke Personen."
          },
          {
            "question": "Warum benötigt die Katch-McArdle Formel den Körperfettanteil?",
            "answer": "Die Katch-McArdle Formel basiert auf der Magermasse (fettfreie Körpermasse), da Muskelgewebe mehr Kalorien verbrennt als Fettgewebe. Dies macht sie genauer für Personen mit bekannter Körperzusammensetzung."
          },
          {
            "question": "Wie oft sollte ich meinen BMR neu berechnen?",
            "answer": "Berechnen Sie Ihren BMR neu, wenn sich Ihr Gewicht, Ihre Körperzusammensetzung oder Ihr Alter erheblich ändert. Für die meisten Menschen ist eine Neubewertung alle paar Monate ausreichend."
          }
        ]
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
    {
      id: "activityLevel",
      type: "select",
      defaultValue: "moderate",
      options: [
        { value: "sedentary" },
        { value: "light" },
        { value: "moderate" },
        { value: "active" },
        { value: "veryActive" },
        { value: "extreme" },
      ],
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // INPUT GROUPS (empty — V4 rule)
  // ═══════════════════════════════════════════════════════════════════════════
  inputGroups: [],

  // ═══════════════════════════════════════════════════════════════════════════
  // UNIT SYSTEM
  // ═══════════════════════════════════════════════════════════════════════════
  unitSystem: {
    enabled: false,
    default: "metric",
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // RESULTS
  // ═══════════════════════════════════════════════════════════════════════════
  results: [
    { id: "bmr", type: "primary", format: "number" },
    { id: "tdee", type: "secondary", format: "number" },
    { id: "loseFast", type: "secondary", format: "number" },
    { id: "loseSlow", type: "secondary", format: "number" },
    { id: "gainSlow", type: "secondary", format: "number" },
    { id: "gainFast", type: "secondary", format: "number" },
    { id: "formulaUsed", type: "secondary", format: "text" },
    { id: "mifflinBmr", type: "secondary", format: "number" },
    { id: "harrisBmr", type: "secondary", format: "number" },
    { id: "katchBmr", type: "secondary", format: "number" },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // CHART — TDEE by Activity Level (bar chart)
  // ═══════════════════════════════════════════════════════════════════════════
  chart: {
    id: "tdeeByActivity",
    type: "bar",
    xKey: "level",
    height: 320,
    showGrid: true,
    showLegend: false,
    showTooltip: true,
    yAxisFormat: "number",
    series: [
      { key: "calories", color: "#3B82F6" },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // DETAILED TABLE — Full TDEE Breakdown
  // ═══════════════════════════════════════════════════════════════════════════
  detailedTable: {
    id: "tdeeBreakdown",
    buttonLabel: "View Full TDEE Breakdown",
    buttonIcon: "📋",
    modalTitle: "Daily Calorie Needs by Activity Level",
    columns: [
      { id: "level", label: "Activity Level", align: "left" },
      { id: "multiplier", label: "Multiplier", align: "center" },
      { id: "dailyCal", label: "Daily Calories", align: "right", highlight: true },
      { id: "weeklyCal", label: "Weekly Calories", align: "right" },
      { id: "toLose", label: "To Lose 0.5 kg/wk", align: "right" },
      { id: "toGain", label: "To Gain 0.5 kg/wk", align: "right" },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // INFOCARDS (2 list + 1 horizontal tips)
  // ═══════════════════════════════════════════════════════════════════════════
  infoCards: [
    { id: "metrics", type: "list", icon: "📊", itemCount: 4 },
    { id: "formulaComparison", type: "list", icon: "🔬", itemCount: 3 },
    { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // EDUCATION (2 prose, 2 list, 1 code-example)
  // ═══════════════════════════════════════════════════════════════════════════
  educationSections: [
    { id: "whatIs", type: "prose", icon: "📖" },
    { id: "howItWorks", type: "prose", icon: "⚙️" },
    { id: "factors", type: "list", icon: "📋", itemCount: 6 },
    { id: "considerations", type: "list", icon: "📌", itemCount: 6 },
    { id: "examples", type: "code-example", icon: "🧮", columns: 2, exampleCount: 2 },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // FAQs (8 items)
  // ═══════════════════════════════════════════════════════════════════════════
  faqs: [
    { id: "0" },
    { id: "1" },
    { id: "2" },
    { id: "3" },
    { id: "4" },
    { id: "5" },
    { id: "6" },
    { id: "7" },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // REFERENCES
  // ═══════════════════════════════════════════════════════════════════════════
  references: [
    {
      authors: "Mifflin MD, St Jeor ST, Hill LA, Scott BJ, Daugherty SA, Koh YO",
      year: "1990",
      title: "A new predictive equation for resting energy expenditure in healthy individuals",
      source: "American Journal of Clinical Nutrition, 51(2), 241-247",
      url: "https://pubmed.ncbi.nlm.nih.gov/2305711/",
    },
    {
      authors: "Roza AM, Shizgal HM",
      year: "1984",
      title: "The Harris Benedict equation reevaluated: resting energy requirements and the body cell mass",
      source: "American Journal of Clinical Nutrition, 40(1), 168-182",
      url: "https://pubmed.ncbi.nlm.nih.gov/6741850/",
    },
    {
      authors: "McArdle WD, Katch FI, Katch VL",
      year: "2010",
      title: "Exercise Physiology: Nutrition, Energy, and Human Performance (7th ed.)",
      source: "Lippincott Williams & Wilkins",
      url: "https://books.google.com/books?id=NON_kQEACAAJ",
    },
    {
      authors: "Johnstone AM, Murison SD, Duncan JS, Rance KA, Speakman JR",
      year: "2005",
      title: "Factors influencing variation in basal metabolic rate include fat-free mass, fat mass, age, and circulating thyroxine but not sex, circulating leptin, or triiodothyronine",
      source: "American Journal of Clinical Nutrition, 82(5), 941-948",
      url: "https://pubmed.ncbi.nlm.nih.gov/16280423/",
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // PRESETS (4 with icons)
  // ═══════════════════════════════════════════════════════════════════════════
  presets: [
    {
      id: "averageMale",
      icon: "🧑",
      values: {
        gender: "male",
        age: 30,
        weight: 82,
        height: 178,
        formula: "mifflin",
        activityLevel: "moderate",
      },
    },
    {
      id: "averageFemale",
      icon: "👩",
      values: {
        gender: "female",
        age: 28,
        weight: 65,
        height: 165,
        formula: "mifflin",
        activityLevel: "moderate",
      },
    },
    {
      id: "athlete",
      icon: "🏋️",
      values: {
        gender: "male",
        age: 25,
        weight: 90,
        height: 183,
        formula: "katch",
        bodyFat: 12,
        activityLevel: "veryActive",
      },
    },
    {
      id: "weightLoss",
      icon: "🎯",
      values: {
        gender: "female",
        age: 35,
        weight: 75,
        height: 163,
        formula: "mifflin",
        activityLevel: "light",
      },
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // TRANSLATIONS (English only — install script translates)
  // ═══════════════════════════════════════════════════════════════════════════
  t: {
    en: {
      name: "BMR Calculator",
      slug: "bmr-calculator",
      subtitle: "Calculate your Basal Metabolic Rate, TDEE, and daily calorie needs using 3 scientifically validated formulas",
      breadcrumb: "BMR",

      seo: {
        title: "BMR Calculator — Basal Metabolic Rate & TDEE | Free Tool",
        description: "Calculate your Basal Metabolic Rate with Mifflin-St Jeor, Harris-Benedict, and Katch-McArdle formulas. Get TDEE, weight loss and muscle gain calorie targets instantly.",
        shortDescription: "Calculate your BMR and daily calorie needs with 3 proven scientific formulas",
        keywords: [
          "bmr calculator",
          "basal metabolic rate calculator",
          "bmr formula",
          "tdee calculator",
          "calorie calculator resting",
          "mifflin st jeor calculator",
          "harris benedict calculator",
          "free bmr calculator",
        ],
      },

      calculator: {
        yourInformation: "Your Information",
      },

      ui: {
        yourInformation: "Your Information",
        calculate: "Calculate",
        reset: "Reset",
        results: "Results",
      },

      inputs: {
        gender: {
          label: "Gender",
          helpText: "Biological sex affects BMR calculations due to differences in body composition",
          options: { male: "Male", female: "Female" },
        },
        age: {
          label: "Age",
          helpText: "BMR decreases approximately 1-2% per decade after age 20",
        },
        weight: {
          label: "Weight",
          helpText: "Your current body weight — all formulas require this input",
        },
        height: {
          label: "Height",
          helpText: "Used by Mifflin-St Jeor and Harris-Benedict formulas",
        },
        formula: {
          label: "Formula",
          helpText: "Mifflin-St Jeor is recommended for most people. Use Katch-McArdle if you know your body fat %",
          options: {
            mifflin: "Mifflin-St Jeor (Recommended)",
            harris: "Harris-Benedict (Revised 1984)",
            katch: "Katch-McArdle (Body Fat %)",
          },
        },
        bodyFat: {
          label: "Body Fat %",
          helpText: "Required for the Katch-McArdle formula. If unsure, use Mifflin-St Jeor instead",
        },
        activityLevel: {
          label: "Activity Level",
          helpText: "Be honest — overestimating activity level is the most common mistake",
          options: {
            sedentary: "Sedentary (little or no exercise)",
            light: "Light (exercise 1-3 days/week)",
            moderate: "Moderate (exercise 3-5 days/week)",
            active: "Active (exercise 6-7 days/week)",
            veryActive: "Very Active (hard exercise daily)",
            extreme: "Extreme (athlete / physical job)",
          },
        },
      },

      results: {
        bmr: { label: "Basal Metabolic Rate" },
        tdee: { label: "Total Daily Energy Expenditure" },
        loseFast: { label: "Aggressive Weight Loss (-1 kg/wk)" },
        loseSlow: { label: "Moderate Weight Loss (-0.5 kg/wk)" },
        gainSlow: { label: "Lean Muscle Gain (+0.25 kg/wk)" },
        gainFast: { label: "Bulk Muscle Gain (+0.5 kg/wk)" },
        formulaUsed: { label: "Formula Used" },
        mifflinBmr: { label: "Mifflin-St Jeor BMR" },
        harrisBmr: { label: "Harris-Benedict BMR" },
        katchBmr: { label: "Katch-McArdle BMR" },
      },

      presets: {
        averageMale: { label: "Average Male", description: "30 yr, 82 kg, moderate activity" },
        averageFemale: { label: "Average Female", description: "28 yr, 65 kg, moderate activity" },
        athlete: { label: "Athlete", description: "25 yr, 90 kg, 12% body fat, very active" },
        weightLoss: { label: "Weight Loss", description: "35 yr, 75 kg, light activity" },
      },

      values: {
        "cal/day": "cal/day",
        "cal": "cal",
        "kcal": "kcal",
        "kcal/day": "kcal/day",
        "kcal/week": "kcal/week",
      },

      formats: {
        summary: "Your BMR is {bmr} cal/day. With your activity level, you burn approximately {tdee} calories per day (TDEE).",
      },

      infoCards: {
        metrics: {
          title: "Your Results",
          items: [
            { label: "Basal Metabolic Rate", valueKey: "bmr" },
            { label: "Daily Energy Expenditure", valueKey: "tdee" },
            { label: "Moderate Weight Loss", valueKey: "loseSlow" },
            { label: "Lean Muscle Gain", valueKey: "gainSlow" },
          ],
        },
        formulaComparison: {
          title: "Formula Comparison",
          items: [
            { label: "Mifflin-St Jeor", valueKey: "mifflinBmr" },
            { label: "Harris-Benedict (Revised)", valueKey: "harrisBmr" },
            { label: "Katch-McArdle", valueKey: "katchBmr" },
          ],
        },
        tips: {
          title: "Tips to Optimize Your Metabolism",
          items: [
            "Build lean muscle through resistance training — each pound of muscle burns about 6 cal/day at rest vs. 2 cal/day for fat",
            "Stay hydrated — even mild dehydration can reduce metabolic rate by 2-3%",
            "Don't cut calories too aggressively — eating below your BMR slows metabolism and leads to muscle loss",
            "Get 7-9 hours of quality sleep — sleep deprivation can reduce BMR by up to 5%",
          ],
        },
      },

      education: {
        whatIs: {
          title: "What Is Basal Metabolic Rate (BMR)?",
          content: "Basal Metabolic Rate (BMR) is the number of calories your body needs to perform its most basic life-sustaining functions while completely at rest. Think of it as the energy cost of simply existing — your heart beating, lungs breathing, brain functioning, and cells regenerating. BMR typically accounts for 60-75% of your total daily calorie expenditure, making it by far the largest component of your energy budget. Unlike Total Daily Energy Expenditure (TDEE), BMR does not include calories burned through physical activity or digestion. Understanding your BMR is the foundation for any effective nutrition or weight management plan, because it tells you the absolute minimum calories your body requires to function properly.",
        },
        howItWorks: {
          title: "How BMR Formulas Work",
          content: "BMR calculators use validated mathematical equations that predict metabolic rate based on measurable body characteristics. The Mifflin-St Jeor equation (1990) is considered the most accurate for the general population, using weight, height, age, and sex as variables. The Harris-Benedict equation (revised in 1984) was the gold standard for decades and uses the same variables with different coefficients. The Katch-McArdle formula takes a different approach by using lean body mass instead of total weight, making it more accurate for athletic or very lean individuals who know their body fat percentage. All formulas produce estimates — actual BMR can vary by up to 26% between individuals even when all measurable factors are identical, due to genetics, hormones, and organ mass differences.",
        },
        factors: {
          title: "Factors That Affect Your BMR",
          items: [
            { text: "Muscle mass: More muscle means higher BMR. Each kg of muscle burns approximately 13 calories per day at rest, compared to just 4.5 calories per kg of fat.", type: "info" },
            { text: "Age: BMR decreases about 1-2% per decade after age 20, primarily due to loss of muscle mass (sarcopenia) and hormonal changes.", type: "info" },
            { text: "Genetics: Hereditary factors account for a significant portion of BMR variation. Some people naturally have faster or slower metabolisms.", type: "info" },
            { text: "Hormones: Thyroid hormones (T3 and T4) are the primary regulators of metabolic rate. Conditions like hypothyroidism can reduce BMR by 30-40%.", type: "warning" },
            { text: "Body temperature: BMR increases approximately 7% for every 0.5°C rise in core body temperature, which is why fever increases calorie burn.", type: "info" },
            { text: "Extreme dieting: Sustained calorie restriction below BMR can trigger adaptive thermogenesis, reducing BMR by up to 15-20% as the body enters 'starvation mode'.", type: "warning" },
          ],
        },
        considerations: {
          title: "Important Considerations",
          items: [
            { text: "BMR estimates have a typical error margin of ±10%. Use these numbers as a starting point, not an absolute truth.", type: "warning" },
            { text: "For weight loss, never eat below your BMR for extended periods — this leads to metabolic adaptation, muscle loss, and potential health risks.", type: "warning" },
            { text: "The Katch-McArdle formula requires an accurate body fat measurement. Visual estimates are often off by 5-10%, which significantly affects results.", type: "info" },
            { text: "Pregnancy, breastfeeding, illness, and certain medications can significantly alter BMR beyond what any formula can predict.", type: "warning" },
            { text: "BMR and RMR (Resting Metabolic Rate) are often used interchangeably, but RMR is typically 10-20% higher because it includes basic daily movements.", type: "info" },
            { text: "Activity multipliers are general estimates. For precise calorie tracking, consider using a food diary combined with weekly weigh-ins over 2-4 weeks.", type: "info" },
          ],
        },
        examples: {
          title: "Calculation Examples",
          description: "Step-by-step BMR calculations using different formulas",
          examples: [
            {
              title: "Mifflin-St Jeor — 30yr Male, 82kg, 178cm",
              steps: [
                "Formula: BMR = 10 × W(kg) + 6.25 × H(cm) - 5 × A(years) + 5",
                "BMR = 10 × 82 + 6.25 × 178 - 5 × 30 + 5",
                "BMR = 820 + 1,112.5 - 150 + 5",
                "BMR = 1,787.5 ≈ 1,788 cal/day",
                "TDEE (moderate): 1,788 × 1.55 = 2,771 cal/day",
              ],
              result: "BMR: 1,788 cal/day | TDEE: 2,771 cal/day",
            },
            {
              title: "Katch-McArdle — 25yr Athlete, 90kg, 12% Body Fat",
              steps: [
                "Lean Body Mass = 90 × (1 - 0.12) = 79.2 kg",
                "Formula: BMR = 370 + 21.6 × LBM(kg)",
                "BMR = 370 + 21.6 × 79.2",
                "BMR = 370 + 1,710.72",
                "BMR = 2,080.72 ≈ 2,081 cal/day",
                "TDEE (very active): 2,081 × 1.725 = 3,590 cal/day",
              ],
              result: "BMR: 2,081 cal/day | TDEE: 3,590 cal/day",
            },
          ],
        },
      },

      faqs: [
        {
          question: "What is the difference between BMR and TDEE?",
          answer: "BMR (Basal Metabolic Rate) is the calories your body burns at complete rest — just to keep you alive. TDEE (Total Daily Energy Expenditure) is your BMR multiplied by an activity factor, representing the total calories you actually burn in a day including exercise, walking, digestion, and daily activities. For weight management, TDEE is the more practical number because it reflects your real calorie needs.",
        },
        {
          question: "Which BMR formula is most accurate?",
          answer: "The Mifflin-St Jeor equation is considered the most accurate for the general population and is recommended by the Academy of Nutrition and Dietetics. However, if you know your body fat percentage accurately (measured by DEXA scan, hydrostatic weighing, or calipers), the Katch-McArdle formula can be more accurate, especially for athletes or very lean individuals.",
        },
        {
          question: "How many calories should I eat to lose weight?",
          answer: "A safe and sustainable calorie deficit is 500 calories below your TDEE, which results in approximately 0.5 kg (1 lb) of weight loss per week. Never eat below your BMR for extended periods, as this can cause metabolic slowdown, muscle loss, and nutritional deficiencies. For example, if your TDEE is 2,500 cal/day, aim for 2,000 cal/day for steady weight loss.",
        },
        {
          question: "Why is my BMR different from online calculators?",
          answer: "Different calculators may use different formulas (Mifflin-St Jeor, Harris-Benedict, Katch-McArdle), which naturally produce different results — typically varying by 50-200 calories. Additionally, no formula can account for individual genetic variation, hormonal differences, or organ mass. A 2005 meta-analysis found that even after controlling all measurable factors, there's still a 26% unexplained variance in BMR between individuals.",
        },
        {
          question: "Can I increase my BMR?",
          answer: "Yes, the most effective way to increase BMR is by building lean muscle mass through resistance training. Each kilogram of muscle burns approximately 13 calories per day at rest, compared to 4.5 calories per kilogram of fat. Other factors that modestly increase BMR include: staying well-hydrated, getting adequate sleep, consuming enough protein (thermic effect of food), and avoiding prolonged extreme calorie restriction.",
        },
        {
          question: "What is the difference between BMR and RMR?",
          answer: "BMR (Basal Metabolic Rate) is measured under strict conditions: after 12 hours of fasting, 8 hours of sleep, in a dark, temperature-controlled room. RMR (Resting Metabolic Rate) is measured under less restrictive conditions and is typically 10-20% higher than BMR because it includes energy from basic daily movements and recent digestion. Most online calculators actually estimate something closer to RMR, even when they label it as BMR.",
        },
        {
          question: "How does age affect BMR?",
          answer: "BMR decreases approximately 1-2% per decade after age 20, primarily due to the gradual loss of muscle mass (sarcopenia) and changes in hormonal levels. By age 60, your BMR may be 10-20% lower than it was at age 20. However, this decline can be significantly slowed by maintaining an active lifestyle and engaging in regular resistance training to preserve muscle mass.",
        },
        {
          question: "Should I eat my BMR or TDEE calories?",
          answer: "You should base your calorie intake on your TDEE, not your BMR. Your TDEE represents your actual daily calorie burn including all activities. For weight maintenance, eat your TDEE calories. For weight loss, eat 300-500 calories below TDEE. For muscle gain, eat 200-500 calories above TDEE. Eating at or below your BMR for extended periods is generally not recommended as it doesn't account for the energy you need for daily activities.",
        },
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

      chart: {
        title: "Daily Calories by Activity Level",
        xLabel: "Activity Level",
        yLabel: "Calories per Day",
        series: {
          calories: "Daily Calories",
        },
      },
    },
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// CALCULATE FUNCTION
// ═══════════════════════════════════════════════════════════════════════════════

// Activity multipliers (standard Katch-McArdle scale)
const ACTIVITY_MULTIPLIERS: Record<string, { multiplier: number; label: string }> = {
  sedentary:  { multiplier: 1.2,   label: "Sedentary" },
  light:      { multiplier: 1.375, label: "Light Exercise" },
  moderate:   { multiplier: 1.55,  label: "Moderate Exercise" },
  active:     { multiplier: 1.725, label: "Active" },
  veryActive: { multiplier: 1.9,   label: "Very Active" },
  extreme:    { multiplier: 2.1,   label: "Extreme / Athlete" },
};

function fmtNum(val: number): string {
  if (val === 0) return "0";
  return Math.round(val).toLocaleString("en-US");
}

export function calculateBmr(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits, t } = data;

  const v = (t?.values as Record<string, string>) || {};
  const f = (t?.formats as Record<string, string>) || {};

  // ─── Read inputs ─────────────────────────────────────────────────────────
  const gender = values.gender as string;
  const age = values.age as number;
  const weight = values.weight as number | null;
  const height = values.height as number | null;
  const formula = values.formula as string;
  const bodyFat = values.bodyFat as number | null;
  const activityLevel = values.activityLevel as string;

  // ─── Validate required fields ────────────────────────────────────────────
  if (weight === null || weight === undefined) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }
  if ((formula === "mifflin" || formula === "harris") && (height === null || height === undefined)) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }
  if (formula === "katch" && (bodyFat === null || bodyFat === undefined)) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  // ─── Convert to metric (kg, cm) ──────────────────────────────────────────
  const weightUnit = fieldUnits?.weight || "lbs";
  let weightKg: number;
  switch (weightUnit) {
    case "kg": weightKg = weight; break;
    case "st": weightKg = weight * 6.35029; break;
    default:   weightKg = weight * 0.453592; break; // lbs
  }

  const heightUnit = fieldUnits?.height || "cm";
  let heightCm = 0;
  if (height !== null && height !== undefined) {
    switch (heightUnit) {
      case "cm":    heightCm = height; break;
      case "m":     heightCm = height * 100; break;
      case "in":    heightCm = height * 2.54; break;
      case "ft_in": heightCm = height * 2.54; break; // engine passes total inches for ft_in
      default:      heightCm = height; break;
    }
  }

  // ─── Calculate BMR — All 3 Formulas ──────────────────────────────────────

  // 1. Mifflin-St Jeor (1990)
  let mifflinBmr = 0;
  if (heightCm > 0) {
    if (gender === "male") {
      mifflinBmr = 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
    } else {
      mifflinBmr = 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
    }
  }

  // 2. Harris-Benedict (Revised 1984)
  let harrisBmr = 0;
  if (heightCm > 0) {
    if (gender === "male") {
      harrisBmr = 13.397 * weightKg + 4.799 * heightCm - 5.677 * age + 88.362;
    } else {
      harrisBmr = 9.247 * weightKg + 3.098 * heightCm - 4.330 * age + 447.593;
    }
  }

  // 3. Katch-McArdle (uses lean body mass)
  let katchBmr = 0;
  if (bodyFat !== null && bodyFat !== undefined && bodyFat > 0) {
    const leanMass = weightKg * (1 - bodyFat / 100);
    katchBmr = 370 + 21.6 * leanMass;
  }

  // ─── Select primary BMR based on formula choice ──────────────────────────
  let bmr = 0;
  let formulaUsedLabel = "";
  switch (formula) {
    case "harris":
      bmr = harrisBmr;
      formulaUsedLabel = "Harris-Benedict (Revised 1984)";
      break;
    case "katch":
      bmr = katchBmr;
      formulaUsedLabel = "Katch-McArdle";
      break;
    default:
      bmr = mifflinBmr;
      formulaUsedLabel = "Mifflin-St Jeor";
      break;
  }

  if (bmr <= 0) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  // ─── TDEE & Weight Goals ─────────────────────────────────────────────────
  const activityData = ACTIVITY_MULTIPLIERS[activityLevel] || ACTIVITY_MULTIPLIERS.moderate;
  const tdee = bmr * activityData.multiplier;

  // Weight goals (based on TDEE, not BMR)
  const loseFast = tdee - 1000;  // ~1 kg/week
  const loseSlow = tdee - 500;   // ~0.5 kg/week
  const gainSlow = tdee + 250;   // ~0.25 kg/week (lean gain)
  const gainFast = tdee + 500;   // ~0.5 kg/week (bulk)

  const calUnit = v["cal/day"] || "cal/day";

  // ─── Chart Data — TDEE by all activity levels ────────────────────────────
  const chartData = Object.entries(ACTIVITY_MULTIPLIERS).map(([, val]) => ({
    level: val.label,
    calories: Math.round(bmr * val.multiplier),
  }));

  // ─── Table Data — Detailed TDEE Breakdown ────────────────────────────────
  const tableData = Object.entries(ACTIVITY_MULTIPLIERS).map(([, val]) => {
    const daily = Math.round(bmr * val.multiplier);
    return {
      level: val.label,
      multiplier: `×${val.multiplier}`,
      dailyCal: fmtNum(daily),
      weeklyCal: fmtNum(daily * 7),
      toLose: fmtNum(Math.max(daily - 500, Math.round(bmr * 0.8))),
      toGain: fmtNum(daily + 500),
    };
  });

  // ─── Build summary ──────────────────────────────────────────────────────
  const summary = (f.summary || "Your BMR is {bmr} cal/day. With your activity level, you burn approximately {tdee} calories per day (TDEE).")
    .replace("{bmr}", fmtNum(bmr))
    .replace("{tdee}", fmtNum(tdee));

  // ─── Return ──────────────────────────────────────────────────────────────
  return {
    values: {
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      loseFast: Math.round(Math.max(loseFast, bmr * 0.8)),
      loseSlow: Math.round(Math.max(loseSlow, bmr * 0.9)),
      gainSlow: Math.round(gainSlow),
      gainFast: Math.round(gainFast),
      formulaUsed: formulaUsedLabel,
      mifflinBmr: Math.round(mifflinBmr),
      harrisBmr: Math.round(harrisBmr),
      katchBmr: katchBmr > 0 ? Math.round(katchBmr) : 0,
    },
    formatted: {
      bmr: `${fmtNum(bmr)} ${calUnit}`,
      tdee: `${fmtNum(tdee)} ${calUnit}`,
      loseFast: `${fmtNum(Math.max(loseFast, bmr * 0.8))} ${calUnit}`,
      loseSlow: `${fmtNum(Math.max(loseSlow, bmr * 0.9))} ${calUnit}`,
      gainSlow: `${fmtNum(gainSlow)} ${calUnit}`,
      gainFast: `${fmtNum(gainFast)} ${calUnit}`,
      formulaUsed: formulaUsedLabel,
      mifflinBmr: mifflinBmr > 0 ? `${fmtNum(mifflinBmr)} ${calUnit}` : "—",
      harrisBmr: harrisBmr > 0 ? `${fmtNum(harrisBmr)} ${calUnit}` : "—",
      katchBmr: katchBmr > 0 ? `${fmtNum(katchBmr)} ${calUnit}` : "N/A (needs body fat %)",
    },
    summary,
    isValid: true,
    metadata: {
      chartData,
      tableData,
    },
  };
}
