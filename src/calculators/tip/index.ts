import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4";

// =============================================================================
// TIP CALCULATOR V4 - WITH INLINE TRANSLATIONS
// =============================================================================

export const tipCalculatorConfig: CalculatorConfigV4 = {
  id: "tip-calculator",
  category: "everyday",
  icon: "💰",
  
  t: {
    en: {
      name: "Tip Calculator",
      slug: "tip-calculator",
      subtitle: "Calculate tips and split bills easily",
      breadcrumb: "Tip",
      seo: {
        title: "Tip Calculator - Calculate Tips and Split Bills Instantly",
        description: "Free tip calculator to quickly calculate gratuity amounts, split bills among multiple people, and determine the total cost including tip. Perfect for restaurants, taxis, and services.",
        keywords: ["tip calculator", "gratuity calculator", "bill splitter", "restaurant tip", "service tip"],
      },
      ui: {
        yourInformation: "Bill Details",
        calculate: "Calculate",
        reset: "Reset",
        results: "Tip Breakdown",
        loading: "Calculating...",
      },
      inputs: {
        billAmount: {
          label: "Bill Amount",
          helpText: "Enter the total bill amount before tip",
          prefix: "$",
        },
        tipPercentage: {
          label: "Tip Percentage",
          helpText: "Enter your desired tip percentage",
          suffix: "%",
          options: {
            "10": "10%",
            "15": "15%",
            "18": "18%",
            "20": "20%",
            "25": "25%",
          }
        },
        numberOfPeople: {
          label: "Number of People",
          helpText: "How many people are splitting the bill?"
        }
      },
      results: {
        tipAmount: {
          label: "Tip Amount",
          description: "The total gratuity to be paid"
        },
        totalAmount: {
          label: "Total Amount",
          description: "Bill amount plus tip"
        },
        perPerson: {
          label: "Per Person",
          description: "Amount each person should pay including tip"
        }
      },
      infoCards: {
        resultsCard: {
          title: "Your Tip Breakdown",
          items: ["Original bill amount", "Tip amount calculated", "Total with tip included"],
        },
        tipsCard: {
          title: "Tipping Guidelines",
          items: ["15-20% for good restaurant service", "18-25% for exceptional service", "10-15% for average service", "Round up for convenience"],
        },
      },
      referenceData: {
        referenceTable: {
          title: "Standard Tipping Rates",
          items: [
            { label: "Restaurant Server", value: "15-25%" },
            { label: "Food Delivery", value: "10-20%" },
            { label: "Taxi/Rideshare", value: "10-20%" },
            { label: "Hair Stylist", value: "15-25%" },
          ],
        },
      },
      education: {
        whatIs: {
          title: "What is Tipping?",
          content: "Tipping is a customary practice of giving additional money to service workers beyond the stated price of goods or services. It's a way to show appreciation for good service and often represents a significant portion of service workers' income. Tip amounts typically range from 10% to 25% of the total bill, depending on the quality of service, type of establishment, and local customs. In many countries, particularly the United States, tipping is not just customary but expected in certain service industries like restaurants, bars, and personal services.",
        },
        howToCalculate: {
          title: "How to Calculate Tips",
          content: "To calculate a tip: 1) Determine your desired tip percentage based on service quality, 2) Multiply the bill amount by the tip percentage (as a decimal), 3) Add the tip amount to the original bill for the total. For example, on a $50 bill with 18% tip: $50 × 0.18 = $9 tip, total = $59. When splitting bills, divide the total amount (including tip) by the number of people.",
        },
        considerations: {
          title: "Tipping Considerations",
          items: [
            { text: "Consider service quality when determining tip percentage" },
            { text: "Some establishments include automatic gratuity for large groups" },
            { text: "Tipping customs vary significantly between countries and cultures" },
            { text: "Always check if service charges are already included in the bill" },
            { text: "Round amounts for convenience, but ensure fair compensation" },
          ],
        },
        examples: {
          title: "Example Calculations",
          description: "Common tipping scenarios with step-by-step calculations",
          examples: [
            {
              title: "Restaurant Bill",
              steps: ["Bill amount: $80.00", "Good service tip: 18%", "Tip: $80 × 0.18 = $14.40"],
              result: "Total: $94.40",
            },
            {
              title: "Split Bill for 4 People",
              steps: ["Bill: $120, Tip: 20% = $24", "Total with tip: $144", "Per person: $144 ÷ 4 = $36"],
              result: "Each person pays: $36.00",
            },
          ],
        },
      },
      faqs: [
        { question: "What's the standard tip percentage at restaurants?", answer: "In the US, 15-20% is standard for good service, with 18% being most common. For exceptional service, 20-25% is appropriate." },
        { question: "Should I tip on the pre-tax or post-tax amount?", answer: "It's generally acceptable to tip on either the pre-tax or post-tax amount. Many people tip on the pre-tax amount for simplicity." },
        { question: "How do I split a bill with different tip preferences?", answer: "Calculate the total with the agreed-upon tip percentage first, then divide equally. Alternatively, each person can add their preferred tip to their portion." },
        { question: "What if service was poor? Should I still tip?", answer: "While you can reduce the tip for poor service (10-12%), consider speaking with management about issues. Many servers depend on tips for their livelihood." },
        { question: "Are there situations where tipping isn't expected?", answer: "Tipping customs vary by location and service type. Fast-casual restaurants, some coffee shops, and establishments with 'no tipping' policies may not expect tips." },
        { question: "How do I handle automatic gratuity charges?", answer: "If automatic gratuity is added (often for large groups), you're not obligated to tip extra unless service was exceptional. Check your bill carefully." },
      ],
      disclaimer: "This calculator provides estimates based on standard tipping practices. Actual tip amounts may vary based on service quality, local customs, and personal preferences. Always verify calculations and consider local tipping conventions.",
    },
    fr: {
      name: "Calculateur de Pourboire",
      slug: "calculateur-pourboire",
      subtitle: "Calculez pourboires et partagez",
      breadcrumb: "Pourboire",
      seo: {
        title: "Calculateur de Pourboire - Calculez les Pourboires et Partagez les Additions Instantanément",
        description: "Calculateur de pourboire gratuit pour calculer rapidement les montants de gratification, partager les additions entre plusieurs personnes et déterminer le coût total avec pourboire. Parfait pour les restaurants, taxis et services.",
        keywords: ["calculateur de pourboire", "calculateur de gratification", "diviseur d'addition", "pourboire restaurant", "pourboire service"],
      },
      ui: {
        yourInformation: "Détails de l'Addition",
        calculate: "Calculer",
        reset: "Réinitialiser",
        results: "Répartition du Pourboire",
        loading: "Calcul en cours...",
      },
      inputs: {
        billAmount: {
          label: "Montant de l'Addition",
          helpText: "Entrez le montant total de l'addition avant pourboire",
          prefix: "€",
        },
        tipPercentage: {
          label: "Pourcentage de Pourboire",
          helpText: "Entrez le pourcentage de pourboire souhaité",
          suffix: "%",
          options: {
            "10": "10%",
            "15": "15%",
            "18": "18%",
            "20": "20%",
            "25": "25%",
          }
        },
        numberOfPeople: {
          label: "Nombre de Personnes",
          helpText: "Combien de personnes partagent l'addition ?"
        }
      },
      results: {
        tipAmount: {
          label: "Montant du Pourboire",
          description: "Le montant total de gratification à payer"
        },
        totalAmount: {
          label: "Montant Total",
          description: "Montant de l'addition plus le pourboire"
        },
        perPerson: {
          label: "Par Personne",
          description: "Montant que chaque personne doit payer pourboire inclus"
        }
      },
      infoCards: {
        resultsCard: {
          title: "Votre Répartition de Pourboire",
          items: ["Montant original de l'addition", "Montant du pourboire calculé", "Total avec pourboire inclus"],
        },
        tipsCard: {
          title: "Guide des Pourboires",
          items: ["15-20% pour un bon service au restaurant", "18-25% pour un service exceptionnel", "10-15% pour un service moyen", "Arrondissez pour plus de commodité"],
        },
      },
      referenceData: {
        referenceTable: {
          title: "Taux de Pourboire Standards",
          items: [
            { label: "Serveur de Restaurant", value: "15-25%" },
            { label: "Livraison de Nourriture", value: "10-20%" },
            { label: "Taxi/VTC", value: "10-20%" },
            { label: "Coiffeur", value: "15-25%" },
          ],
        },
      },
      education: {
        whatIs: {
          title: "Qu'est-ce que le Pourboire ?",
          content: "Le pourboire est une pratique coutumière consistant à donner de l'argent supplémentaire aux travailleurs de service au-delà du prix indiqué des biens ou services. C'est une façon de montrer son appréciation pour un bon service et représente souvent une partie importante du revenu des travailleurs de service. Les montants de pourboire vont généralement de 10% à 25% de l'addition totale, selon la qualité du service, le type d'établissement et les coutumes locales. Dans de nombreux pays, particulièrement aux États-Unis, donner un pourboire n'est pas seulement coutumier mais attendu dans certaines industries de service comme les restaurants, bars et services personnels.",
        },
        howToCalculate: {
          title: "Comment Calculer les Pourboires",
          content: "Pour calculer un pourboire : 1) Déterminez le pourcentage de pourboire souhaité selon la qualité du service, 2) Multipliez le montant de l'addition par le pourcentage de pourboire (en décimal), 3) Ajoutez le montant du pourboire à l'addition originale pour le total. Par exemple, sur une addition de 50€ avec un pourboire de 18% : 50€ × 0,18 = 9€ de pourboire, total = 59€. Lors du partage d'additions, divisez le montant total (pourboire inclus) par le nombre de personnes.",
        },
        considerations: {
          title: "Considérations sur les Pourboires",
          items: [
            { text: "Considérez la qualité du service lors de la détermination du pourcentage de pourboire" },
            { text: "Certains établissements incluent une gratification automatique pour les grands groupes" },
            { text: "Les coutumes de pourboire varient significativement entre les pays et cultures" },
            { text: "Vérifiez toujours si les frais de service sont déjà inclus dans l'addition" },
            { text: "Arrondissez les montants pour plus de commodité, mais assurez-vous d'une compensation équitable" },
          ],
        },
        examples: {
          title: "Exemples de Calculs",
          description: "Scénarios de pourboire courants avec calculs détaillés",
          examples: [
            {
              title: "Addition de Restaurant",
              steps: ["Montant de l'addition : 80,00€", "Pourboire pour bon service : 18%", "Pourboire : 80€ × 0,18 = 14,40€"],
              result: "Total : 94,40€",
            },
            {
              title: "Addition Partagée pour 4 Personnes",
              steps: ["Addition : 120€, Pourboire : 20% = 24€", "Total avec pourboire : 144€", "Par personne : 144€ ÷ 4 = 36€"],
              result: "Chaque personne paie : 36,00€",
            },
          ],
        },
      },
      faqs: [
        { question: "Quel est le pourcentage de pourboire standard dans les restaurants ?", answer: "En France, 5-10% est généralement suffisant car le service est inclus. Dans d'autres pays comme les États-Unis, 15-20% est standard pour un bon service." },
        { question: "Dois-je donner un pourboire sur le montant avant ou après taxes ?", answer: "Il est généralement acceptable de donner un pourboire sur le montant avant ou après taxes. Beaucoup de gens donnent un pourboire sur le montant avant taxes par simplicité." },
        { question: "Comment partager une addition avec différentes préférences de pourboire ?", answer: "Calculez d'abord le total avec le pourcentage de pourboire convenu, puis divisez équitablement. Alternativement, chaque personne peut ajouter son pourboire préféré à sa portion." },
        { question: "Et si le service était mauvais ? Dois-je quand même donner un pourboire ?", answer: "Bien que vous puissiez réduire le pourboire pour un mauvais service (10-12%), considérez parler à la direction des problèmes. Beaucoup de serveurs dépendent des pourboires pour leur subsistance." },
        { question: "Y a-t-il des situations où le pourboire n'est pas attendu ?", answer: "Les coutumes de pourboire varient selon le lieu et le type de service. Les restaurants fast-casual, certains cafés et établissements avec des politiques 'sans pourboire' peuvent ne pas s'attendre à des pourboires." },
        { question: "Comment gérer les frais de gratification automatique ?", answer: "Si une gratification automatique est ajoutée (souvent pour les grands groupes), vous n'êtes pas obligé de donner un pourboire supplémentaire sauf si le service était exceptionnel. Vérifiez votre addition attentivement." },
      ],
      disclaimer: "Ce calculateur fournit des estimations basées sur les pratiques de pourboire standards. Les montants de pourboire réels peuvent varier selon la qualité du service, les coutumes locales et les préférences personnelles. Vérifiez toujours les calculs et considérez les conventions de pourboire locales.",
      rating: {
        title: "Évaluez ce Calculateur",
        share: "Partager",
        copied: "Copié !",
        copyLink: "Copier le Lien",
        clickToRate: "Cliquez pour évaluer",
        youRated: "Vous avez évalué",
        stars: "étoiles",
        averageFrom: "moyenne de",
        ratings: "évaluations",
        shareCalculator: "Partagez ce calculateur :",
        includesValues: "inclut vos valeurs",
        creating: "Création en cours...",
        thankYou: "Merci pour votre évaluation ! Aidez les autres en partageant."
      },
      common: {
        home: "Accueil",
        calculators: "Calculateurs",
        reviews: "avis"
      }
    },
    de: {
      name: "Trinkgeld Rechner",
      slug: "trinkgeld-rechner",
      subtitle: "Trinkgeld berechnen und teilen",
      breadcrumb: "Trinkgeld",
      seo: {
        title: "Trinkgeld Rechner - Berechnen Sie Trinkgelder und teilen Sie Rechnungen sofort auf",
        description: "Kostenloser Trinkgeld Rechner zur schnellen Berechnung von Trinkgeldbeträgen, Aufteilung von Rechnungen auf mehrere Personen und Bestimmung der Gesamtkosten inklusive Trinkgeld. Perfekt für Restaurants, Taxis und Dienstleistungen.",
        keywords: ["Trinkgeld Rechner", "Trinkgeldrechner", "Rechnung teilen", "Restaurant Trinkgeld", "Service Trinkgeld"],
      },
      ui: {
        yourInformation: "Rechnungsdetails",
        calculate: "Berechnen",
        reset: "Zurücksetzen",
        results: "Trinkgeld Aufschlüsselung",
        loading: "Berechnet...",
      },
      inputs: {
        billAmount: {
          label: "Rechnungsbetrag",
          helpText: "Geben Sie den Gesamtrechnungsbetrag vor Trinkgeld ein",
          prefix: "€",
        },
        tipPercentage: {
          label: "Trinkgeld Prozentsatz",
          helpText: "Geben Sie Ihren gewünschten Trinkgeld Prozentsatz ein",
          suffix: "%",
          options: {
            "10": "10%",
            "15": "15%",
            "18": "18%",
            "20": "20%",
            "25": "25%",
          }
        },
        numberOfPeople: {
          label: "Anzahl Personen",
          helpText: "Wie viele Personen teilen sich die Rechnung?"
        }
      },
      results: {
        tipAmount: {
          label: "Trinkgeldbetrag",
          description: "Das zu zahlende Gesamttrinkgeld"
        },
        totalAmount: {
          label: "Gesamtbetrag",
          description: "Rechnungsbetrag plus Trinkgeld"
        },
        perPerson: {
          label: "Pro Person",
          description: "Betrag, den jede Person inklusive Trinkgeld zahlen sollte"
        }
      },
      infoCards: {
        resultsCard: {
          title: "Ihre Trinkgeld Aufschlüsselung",
          items: ["Ursprünglicher Rechnungsbetrag", "Berechneter Trinkgeldbetrag", "Gesamt mit Trinkgeld"],
        },
        tipsCard: {
          title: "Trinkgeld Richtlinien",
          items: ["15-20% für guten Restaurant Service", "18-25% für außergewöhnlichen Service", "10-15% für durchschnittlichen Service", "Aufrunden für Bequemlichkeit"],
        },
      },
      referenceData: {
        referenceTable: {
          title: "Standard Trinkgeldsätze",
          items: [
            { label: "Restaurant Kellner", value: "15-25%" },
            { label: "Essenslieferung", value: "10-20%" },
            { label: "Taxi/Rideshare", value: "10-20%" },
            { label: "Friseur", value: "15-25%" },
          ],
        },
      },
      education: {
        whatIs: {
          title: "Was ist Trinkgeld?",
          content: "Trinkgeld ist eine übliche Praxis, Servicemitarbeitern zusätzlich zum angegebenen Preis für Waren oder Dienstleistungen Geld zu geben. Es ist eine Art, Wertschätzung für guten Service zu zeigen und stellt oft einen bedeutenden Teil des Einkommens von Servicekräften dar. Trinkgeldbeträge reichen typischerweise von 10% bis 25% der Gesamtrechnung, abhängig von der Servicequalität, Art des Betriebs und lokalen Gepflogenheiten. In vielen Ländern, besonders in den USA, ist Trinkgeld nicht nur üblich, sondern in bestimmten Servicebranchen wie Restaurants, Bars und persönlichen Dienstleistungen erwartet.",
        },
        howToCalculate: {
          title: "Wie man Trinkgeld berechnet",
          content: "Um Trinkgeld zu berechnen: 1) Bestimmen Sie Ihren gewünschten Trinkgeldprozentsatz basierend auf der Servicequalität, 2) Multiplizieren Sie den Rechnungsbetrag mit dem Trinkgeldprozentsatz (als Dezimalzahl), 3) Addieren Sie den Trinkgeldbetrag zur ursprünglichen Rechnung für die Gesamtsumme. Zum Beispiel bei einer 50€ Rechnung mit 18% Trinkgeld: 50€ × 0,18 = 9€ Trinkgeld, Gesamt = 59€. Beim Teilen von Rechnungen teilen Sie den Gesamtbetrag (inklusive Trinkgeld) durch die Anzahl der Personen.",
        },
        considerations: {
          title: "Trinkgeld Überlegungen",
          items: [
            { text: "Berücksichtigen Sie die Servicequalität bei der Bestimmung des Trinkgeldprozentsatzes" },
            { text: "Manche Betriebe schließen automatisches Trinkgeld für große Gruppen ein" },
            { text: "Trinkgeldgepflogenheiten variieren erheblich zwischen Ländern und Kulturen" },
            { text: "Prüfen Sie immer, ob Servicegebühren bereits in der Rechnung enthalten sind" },
            { text: "Runden Sie Beträge der Bequemlichkeit halber, aber stellen Sie faire Entschädigung sicher" },
          ],
        },
        examples: {
          title: "Beispielberechnungen",
          description: "Häufige Trinkgeldszenarien mit schrittweisen Berechnungen",
          examples: [
            {
              title: "Restaurant Rechnung",
              steps: ["Rechnungsbetrag: 80,00€", "Guter Service Trinkgeld: 18%", "Trinkgeld: 80€ × 0,18 = 14,40€"],
              result: "Gesamt: 94,40€",
            },
            {
              title: "Geteilte Rechnung für 4 Personen",
              steps: ["Rechnung: 120€, Trinkgeld: 20% = 24€", "Gesamt mit Trinkgeld: 144€", "Pro Person: 144€ ÷ 4 = 36€"],
              result: "Jede Person zahlt: 36,00€",
            },
          ],
        },
      },
      faqs: [
        { question: "Was ist der Standard Trinkgeldprozentsatz in Restaurants?", answer: "In Deutschland sind 5-10% für guten Service üblich. In den USA sind 15-20% standard, wobei 18% am häufigsten ist. Für außergewöhnlichen Service sind 20-25% angemessen." },
        { question: "Soll ich Trinkgeld auf den Betrag vor oder nach Steuern geben?", answer: "Es ist allgemein akzeptabel, auf beiden Beträgen Trinkgeld zu geben. Viele Menschen geben Trinkgeld auf den Betrag vor Steuern der Einfachheit halber." },
        { question: "Wie teile ich eine Rechnung mit unterschiedlichen Trinkgeldvorstellungen?", answer: "Berechnen Sie zuerst die Gesamtsumme mit dem vereinbarten Trinkgeldprozentsatz, dann teilen Sie gleichmäßig auf. Alternativ kann jede Person ihr bevorzugtes Trinkgeld zu ihrem Anteil hinzufügen." },
        { question: "Was, wenn der Service schlecht war? Soll ich trotzdem Trinkgeld geben?", answer: "Während Sie das Trinkgeld für schlechten Service reduzieren können (10-12%), sollten Sie mit dem Management über Probleme sprechen. Viele Kellner sind für ihren Lebensunterhalt auf Trinkgelder angewiesen." },
        { question: "Gibt es Situationen, wo Trinkgeld nicht erwartet wird?", answer: "Trinkgeldgepflogenheiten variieren je nach Ort und Serviceart. Fast-Casual Restaurants, manche Cafés und Betriebe mit 'Kein Trinkgeld' Richtlinien erwarten möglicherweise keine Trinkgelder." },
        { question: "Wie gehe ich mit automatischen Trinkgeldgebühren um?", answer: "Wenn automatisches Trinkgeld hinzugefügt wird (oft für große Gruppen), sind Sie nicht verpflichtet, extra Trinkgeld zu geben, es sei denn, der Service war außergewöhnlich. Prüfen Sie Ihre Rechnung sorgfältig." },
      ],
      disclaimer: "Dieser Rechner bietet Schätzungen basierend auf Standard-Trinkgeldpraktiken. Tatsächliche Trinkgeldbeträge können je nach Servicequalität, lokalen Gepflogenheiten und persönlichen Vorlieben variieren. Überprüfen Sie immer Berechnungen und berücksichtigen Sie lokale Trinkgeldkonventionen.",
    },
    es: {
      name: "Calculadora de Propinas",
      slug: "calculadora-propinas",
      subtitle: "Calcula propinas y divide cuentas",
      breadcrumb: "Propinas",
      seo: {
        title: "Calculadora de Propinas - Calcula Propinas y Divide Cuentas al Instante",
        description: "Calculadora gratuita de propinas para calcular rápidamente montos de gratificación, dividir cuentas entre múltiples personas y determinar el costo total incluyendo propina.",
        keywords: ["calculadora propinas", "calculadora gratificación", "dividir cuenta", "propina restaurante", "propina servicio"],
      },
      ui: {
        yourInformation: "Detalles de la Cuenta",
        calculate: "Calcular",
        reset: "Reiniciar",
        results: "Desglose de Propina",
        loading: "Calculando...",
      },
      inputs: {
        billAmount: {
          label: "Monto de la Cuenta",
          helpText: "Ingrese el monto total de la cuenta antes de la propina"
        },
        tipPercentage: {
          label: "Porcentaje de Propina",
          helpText: "Ingrese el porcentaje de propina deseado",
          suffix: "%"
        },
        numberOfPeople: {
          label: "Número de Personas",
          helpText: "¿Cuántas personas van a dividir la cuenta?"
        }
      },
      results: {
        tipAmount: {
          label: "Monto de Propina",
          description: "La gratificación total a pagar"
        },
        totalAmount: {
          label: "Monto Total",
          description: "Monto de la cuenta más la propina"
        },
        perPerson: {
          label: "Por Persona",
          description: "Cantidad que debe pagar cada persona incluyendo propina"
        }
      },
      infoCards: {
        resultsCard: {
          title: "Desglose de tu Propina",
          items: ["Monto original de la cuenta", "Monto de propina calculado", "Total con propina incluida"],
        },
        tipsCard: {
          title: "Guías de Propinas",
          items: ["15-20% para buen servicio en restaurante", "18-25% para servicio excepcional", "10-15% para servicio promedio", "Redondear para mayor comodidad"],
        },
      },
      referenceData: {
        referenceTable: {
          title: "Tasas de Propina Estándar",
          items: [
            { label: "Mesero de Restaurante", value: "15-25%" },
            { label: "Entrega de Comida", value: "10-20%" },
            { label: "Taxi/Viaje Compartido", value: "10-20%" },
            { label: "Estilista", value: "15-25%" },
          ],
        },
      },
      education: {
        whatIs: {
          title: "¿Qué es dar Propina?",
          content: "Dar propina es una práctica habitual de dar dinero adicional a los trabajadores de servicios más allá del precio establecido de bienes o servicios. Es una forma de mostrar aprecio por el buen servicio y a menudo representa una parte significativa de los ingresos de los trabajadores de servicios. Los montos de propina típicamente van del 10% al 25% de la cuenta total, dependiendo de la calidad del servicio, tipo de establecimiento y costumbres locales. En muchos países, particularmente Estados Unidos, dar propina no es solo habitual sino esperado en ciertas industrias de servicios como restaurantes, bares y servicios personales.",
        },
        howToCalculate: {
          title: "Cómo Calcular Propinas",
          content: "Para calcular una propina: 1) Determine el porcentaje de propina deseado basado en la calidad del servicio, 2) Multiplique el monto de la cuenta por el porcentaje de propina (como decimal), 3) Sume el monto de la propina a la cuenta original para el total. Por ejemplo, en una cuenta de $50 con propina del 18%: $50 × 0.18 = $9 de propina, total = $59. Al dividir cuentas, divida el monto total (incluyendo propina) por el número de personas.",
        },
        considerations: {
          title: "Consideraciones para Propinas",
          items: [
            { text: "Considere la calidad del servicio al determinar el porcentaje de propina" },
            { text: "Algunos establecimientos incluyen gratificación automática para grupos grandes" },
            { text: "Las costumbres de propinas varían significativamente entre países y culturas" },
            { text: "Siempre verifique si los cargos por servicio ya están incluidos en la cuenta" },
            { text: "Redondee los montos para conveniencia, pero asegure compensación justa" },
          ],
        },
        examples: {
          title: "Ejemplos de Cálculos",
          description: "Escenarios comunes de propinas con cálculos paso a paso",
          examples: [
            {
              title: "Cuenta de Restaurante",
              steps: ["Monto de cuenta: $80.00", "Propina por buen servicio: 18%", "Propina: $80 × 0.18 = $14.40"],
              result: "Total: $94.40",
            },
            {
              title: "Cuenta Dividida para 4 Personas",
              steps: ["Cuenta: $120, Propina: 20% = $24", "Total con propina: $144", "Por persona: $144 ÷ 4 = $36"],
              result: "Cada persona paga: $36.00",
            },
          ],
        },
      },
      faqs: [
        { question: "¿Cuál es el porcentaje de propina estándar en restaurantes?", answer: "En EE.UU., 15-20% es estándar para buen servicio, siendo 18% lo más común. Para servicio excepcional, 20-25% es apropiado." },
        { question: "¿Debo dar propina sobre el monto antes o después de impuestos?", answer: "Generalmente es aceptable dar propina sobre cualquiera de los dos montos. Muchas personas dan propina sobre el monto antes de impuestos por simplicidad." },
        { question: "¿Cómo divido una cuenta con diferentes preferencias de propina?", answer: "Calcule primero el total con el porcentaje de propina acordado, luego divida igualmente. Alternativamente, cada persona puede agregar su propina preferida a su porción." },
        { question: "¿Qué pasa si el servicio fue malo? ¿Aún debo dar propina?", answer: "Aunque puede reducir la propina por mal servicio (10-12%), considere hablar con la gerencia sobre los problemas. Muchos meseros dependen de las propinas." },
        { question: "¿Hay situaciones donde no se esperan propinas?", answer: "Las costumbres de propinas varían por ubicación y tipo de servicio. Restaurantes casuales rápidos, algunas cafeterías y establecimientos con políticas 'sin propinas' pueden no esperarlas." },
        { question: "¿Cómo manejo los cargos de gratificación automática?", answer: "Si se agrega gratificación automática (a menudo para grupos grandes), no está obligado a dar propina extra a menos que el servicio fuera excepcional." },
      ],
      disclaimer: "Esta calculadora proporciona estimaciones basadas en prácticas estándar de propinas. Los montos reales pueden variar según la calidad del servicio, costumbres locales y preferencias personales. Siempre verifique los cálculos y considere las convenciones locales.",
      rating: {
        title: "Califica esta Calculadora",
        share: "Compartir",
        copied: "¡Copiado!",
        copyLink: "Copiar Enlace",
        clickToRate: "Haz clic para calificar",
        youRated: "Calificaste",
        stars: "estrellas",
        averageFrom: "promedio de",
        ratings: "calificaciones",
        shareCalculator: "Comparte esta calculadora:",
        includesValues: "incluye tus valores",
        creating: "Creando...",
        thankYou: "¡Gracias por tu calificación! Ayuda a otros compartiendo."
      },
    },
    pt: {
      name: "Calculadora de Gorjetas",
      slug: "calculadora-gorjetas",
      subtitle: "Calcule gorjetas e divida contas",
      breadcrumb: "Gorjetas",
      seo: {
        title: "Calculadora de Gorjetas - Calcule Gorjetas e Divida Contas Instantaneamente",
        description: "Calculadora gratuita de gorjetas para calcular rapidamente valores de gratificação, dividir contas entre múltiplas pessoas e determinar o custo total incluindo gorjeta.",
        keywords: ["calculadora gorjeta", "calculadora gratificação", "dividir conta", "gorjeta restaurante", "gorjeta serviço"],
      },
      ui: {
        yourInformation: "Detalhes da Conta",
        calculate: "Calcular",
        reset: "Reiniciar",
        results: "Detalhamento da Gorjeta",
        loading: "Calculando...",
      },
      inputs: {
        billAmount: {
          label: "Valor da Conta",
          helpText: "Digite o valor total da conta antes da gorjeta"
        },
        tipPercentage: {
          label: "Porcentagem da Gorjeta",
          helpText: "Digite a porcentagem de gorjeta desejada",
          suffix: "%"
        },
        numberOfPeople: {
          label: "Número de Pessoas",
          helpText: "Quantas pessoas vão dividir a conta?"
        }
      },
      results: {
        tipAmount: {
          label: "Valor da Gorjeta",
          description: "A gratificação total a ser paga"
        },
        totalAmount: {
          label: "Valor Total",
          description: "Valor da conta mais a gorjeta"
        },
        perPerson: {
          label: "Por Pessoa",
          description: "Quantia que cada pessoa deve pagar incluindo gorjeta"
        }
      },
      infoCards: {
        resultsCard: {
          title: "Detalhamento da sua Gorjeta",
          items: ["Valor original da conta", "Valor da gorjeta calculado", "Total com gorjeta incluída"],
        },
        tipsCard: {
          title: "Guias de Gorjetas",
          items: ["10-15% para bom atendimento em restaurante", "15-20% para atendimento excepcional", "5-10% para atendimento médio", "Arredondar para maior praticidade"],
        },
      },
      referenceData: {
        referenceTable: {
          title: "Taxas Padrão de Gorjetas",
          items: [
            { label: "Garçom de Restaurante", value: "10-20%" },
            { label: "Entrega de Comida", value: "5-15%" },
            { label: "Táxi/Transporte", value: "10-15%" },
            { label: "Cabeleireiro", value: "10-20%" },
          ],
        },
      },
      education: {
        whatIs: {
          title: "O que é Gorjeta?",
          content: "Gorjeta é uma prática costumeira de dar dinheiro adicional aos trabalhadores de serviços além do preço estabelecido de bens ou serviços. É uma forma de mostrar apreço pelo bom atendimento e muitas vezes representa uma parte significativa da renda dos trabalhadores de serviços. Os valores de gorjetas tipicamente variam de 5% a 20% da conta total, dependendo da qualidade do serviço, tipo de estabelecimento e costumes locais. No Brasil, dar gorjeta é opcional e geralmente menor que em outros países, mas é uma forma importante de reconhecer bom atendimento.",
        },
        howToCalculate: {
          title: "Como Calcular Gorjetas",
          content: "Para calcular uma gorjeta: 1) Determine a porcentagem de gorjeta desejada baseada na qualidade do serviço, 2) Multiplique o valor da conta pela porcentagem da gorjeta (como decimal), 3) Some o valor da gorjeta à conta original para o total. Por exemplo, numa conta de R$ 50 com gorjeta de 10%: R$ 50 × 0.10 = R$ 5 de gorjeta, total = R$ 55. Ao dividir contas, divida o valor total (incluindo gorjeta) pelo número de pessoas.",
        },
        considerations: {
          title: "Considerações sobre Gorjetas",
          items: [
            { text: "Considere a qualidade do atendimento ao determinar a porcentagem da gorjeta" },
            { text: "Alguns estabelecimentos incluem taxa de serviço automaticamente" },
            { text: "Os costumes de gorjetas variam significativamente entre países e culturas" },
            { text: "Sempre verifique se taxas de serviço já estão incluídas na conta" },
            { text: "Arredonde valores para conveniência, mas garanta compensação justa" },
          ],
        },
        examples: {
          title: "Exemplos de Cálculos",
          description: "Cenários comuns de gorjetas com cálculos passo a passo",
          examples: [
            {
              title: "Conta de Restaurante",
              steps: ["Valor da conta: R$ 80,00", "Gorjeta por bom serviço: 10%", "Gorjeta: R$ 80 × 0.10 = R$ 8,00"],
              result: "Total: R$ 88,00",
            },
            {
              title: "Conta Dividida para 4 Pessoas",
              steps: ["Conta: R$ 120, Gorjeta: 10% = R$ 12", "Total com gorjeta: R$ 132", "Por pessoa: R$ 132 ÷ 4 = R$ 33"],
              result: "Cada pessoa paga: R$ 33,00",
            },
          ],
        },
      },
      faqs: [
        { question: "Qual é a porcentagem padrão de gorjeta em restaurantes?", answer: "No Brasil, 10% é comum para bom atendimento, embora seja opcional. Alguns estabelecimentos cobram taxa de serviço de 10% automaticamente." },
        { question: "Devo dar gorjeta sobre o valor antes ou depois dos impostos?", answer: "Geralmente é aceitável dar gorjeta sobre qualquer um dos valores. Muitas pessoas dão gorjeta sobre o valor total da conta por simplicidade." },
        { question: "Como divido uma conta com diferentes preferências de gorjeta?", answer: "Calcule primeiro o total com a porcentagem de gorjeta acordada, depois divida igualmente. Alternativamente, cada pessoa pode adicionar sua gorjeta preferida à sua parte." },
        { question: "E se o atendimento foi ruim? Ainda devo dar gorjeta?", answer: "Gorjetas são opcionais no Brasil e refletem a qualidade do serviço. Para atendimento ruim, você pode optar por não dar gorjeta ou dar menos." },
        { question: "Existem situações onde gorjetas não são esperadas?", answer: "Em fast-foods, bares casuais e alguns estabelecimentos, gorjetas não são esperadas. Sempre observe a política do local." },
        { question: "Como lido com taxas de serviço automáticas?", answer: "Se taxa de serviço de 10% for adicionada automaticamente, você não é obrigado a dar gorjeta extra, a menos que o serviço tenha sido excepcional." },
      ],
      disclaimer: "Esta calculadora fornece estimativas baseadas em práticas padrão de gorjetas. Valores reais podem variar conforme qualidade do serviço, costumes locais e preferências pessoais. Sempre verifique os cálculos e considere convenções locais.",
    },
  },
  
  hero: {
    badge: "Everyday",
    rating: { average: 4.8, count: 10000 },
  },
  
  unitSystem: {
    enabled: false,
    default: "metric",
  },
  
  inputs: [
    {
      id: "billAmount",
      type: "slider",
      required: true,
      defaultValue: 50,
      min: 0,
      step: 0.01,
    },
    {
      id: "tipPercentage",
      type: "slider",
      required: true,
      defaultValue: 18,
      min: 0,
      max: 100,
      step: 1,
      suffix: "%",
    },
    {
      id: "numberOfPeople",
      type: "slider",
      required: true,
      defaultValue: 1,
      min: 1,
      max: 50,
      step: 1,
    },
  ],
  
  results: [
    {
      id: "tipAmount",
      type: "primary",
      format: "currency",
      decimals: 2,
      prefix: "$",
    },
    {
      id: "totalAmount",
      type: "secondary",
      format: "currency",
      decimals: 2,
      prefix: "$",
    },
    {
      id: "perPerson",
      type: "secondary",
      format: "currency",
      decimals: 2,
      prefix: "$",
    },
  ],
  
  infoCards: [
    { id: "resultsCard", icon: "📊", type: "list", items: [{ valueKey: "tipAmount" }, { valueKey: "totalAmount" }] },
    { id: "tipsCard", icon: "💡", type: "horizontal", items: [{}, {}, {}, {}] },
  ],
  
  referenceData: [
    { id: "referenceTable", icon: "📋", columns: 2 },
  ],
  
  educationSections: [
    { id: "whatIs", type: "prose", icon: "📖" },
    { id: "howToCalculate", type: "prose", icon: "⚙️" },
    { id: "considerations", type: "list", icon: "⚠️", itemTypes: ["info", "info", "info", "warning", "warning"] },
    { id: "examples", type: "code-example", icon: "🧮", columns: 2 },
  ],
  
  references: [
    { authors: "Bureau of Labor Statistics", year: "2024", title: "Occupational Employment and Wages for Food Service Workers", source: "U.S. Department of Labor", url: "https://www.bls.gov/ooh/food-preparation-and-serving/" },
    { authors: "Emily Post Institute", year: "2024", title: "Tipping Guidelines and Etiquette", source: "Emily Post Institute", url: "https://emilypost.com/advice/general-tipping-guidelines" },
  ],
  
  sidebar: { showSearch: true, showRelatedCalculators: true, showCTA: false, category: "everyday" },
  features: { autoCalculate: true, exportPDF: true, shareResults: true, saveHistory: true },
  relatedCalculators: [],
  ads: { mobileHero: true, sidebar: true, mobileContent: true, bottom: true },
};

// =============================================================================
// CALCULATE FUNCTION
// =============================================================================
export function calculateTip(data: {
  values: Record<string, unknown>;
  units: Record<string, string>;
  unitSystem: "metric" | "imperial";
  mode?: string;
}): CalculatorResults {
  const { values } = data;
  
  const billAmount = Number(values.billAmount) || 0;
  const tipPercentage = Number(values.tipPercentage) || 15;
  const numberOfPeople = Number(values.numberOfPeople) || 1;
  
  // Calculate tip
  const tipAmount = billAmount * (tipPercentage / 100);
  const totalAmount = billAmount + tipAmount;
  const perPerson = numberOfPeople > 0 ? totalAmount / numberOfPeople : totalAmount;
  const tipPerPerson = numberOfPeople > 0 ? tipAmount / numberOfPeople : tipAmount;
  
  return {
    values: {
      tipAmount,
      totalAmount,
      perPerson,
      tipPerPerson,
      billAmount,
    },
    formatted: {
      tipAmount: "$" + tipAmount.toFixed(2),
      totalAmount: "$" + totalAmount.toFixed(2),
      perPerson: "$" + perPerson.toFixed(2),
      tipPerPerson: "$" + tipPerPerson.toFixed(2),
      billAmount: "$" + billAmount.toFixed(2),
    },
    summary: `Tip: ${tipAmount.toFixed(2)} | Total: ${totalAmount.toFixed(2)} | Per person: ${perPerson.toFixed(2)}`,
    isValid: billAmount > 0,
  };
}
export default tipCalculatorConfig;
