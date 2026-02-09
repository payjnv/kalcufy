/**
 * COMMON TRANSLATIONS V4
 * 
 * Pre-defined translations for common words/phrases used in calculators.
 * These are automatically applied to summaries and dynamic content.
 */

export const COMMON_TRANSLATIONS: Record<string, Record<string, string>> = {
  // =============================================================================
  // TIME UNITS
  // =============================================================================
  "month": { en: "month", es: "mes", pt: "mês", fr: "mois", de: "Monat" },
  "months": { en: "months", es: "meses", pt: "meses", fr: "mois", de: "Monate" },
  "year": { en: "year", es: "año", pt: "ano", fr: "an", de: "Jahr" },
  "years": { en: "years", es: "años", pt: "anos", fr: "ans", de: "Jahre" },
  "day": { en: "day", es: "día", pt: "dia", fr: "jour", de: "Tag" },
  "days": { en: "days", es: "días", pt: "dias", fr: "jours", de: "Tage" },
  "week": { en: "week", es: "semana", pt: "semana", fr: "semaine", de: "Woche" },
  "weeks": { en: "weeks", es: "semanas", pt: "semanas", fr: "semaines", de: "Wochen" },

  // =============================================================================
  // FINANCIAL TERMS
  // =============================================================================
  "Total": { en: "Total", es: "Total", pt: "Total", fr: "Total", de: "Gesamt" },
  "Total interest": { en: "Total interest", es: "Interés total", pt: "Juros totais", fr: "Intérêts totaux", de: "Gesamtzinsen" },
  "Total cost": { en: "Total cost", es: "Costo total", pt: "Custo total", fr: "Coût total", de: "Gesamtkosten" },
  "Monthly payment": { en: "Monthly payment", es: "Pago mensual", pt: "Pagamento mensal", fr: "Paiement mensuel", de: "Monatliche Zahlung" },
  "Your monthly payment": { en: "Your monthly payment", es: "Tu pago mensual", pt: "Seu pagamento mensal", fr: "Votre paiement mensuel", de: "Ihre monatliche Zahlung" },
  "Loan payoff": { en: "Loan payoff", es: "Fecha de liquidación", pt: "Data de quitação", fr: "Date de remboursement", de: "Tilgungsdatum" },
  "Interest rate": { en: "Interest rate", es: "Tasa de interés", pt: "Taxa de juros", fr: "Taux d'intérêt", de: "Zinssatz" },
  "Principal": { en: "Principal", es: "Capital", pt: "Principal", fr: "Principal", de: "Hauptbetrag" },
  "Down payment": { en: "Down payment", es: "Pago inicial", pt: "Entrada", fr: "Acompte", de: "Anzahlung" },
  "Loan amount": { en: "Loan amount", es: "Monto del préstamo", pt: "Valor do empréstimo", fr: "Montant du prêt", de: "Darlehensbetrag" },
  "Payment": { en: "Payment", es: "Pago", pt: "Pagamento", fr: "Paiement", de: "Zahlung" },
  "Balance": { en: "Balance", es: "Saldo", pt: "Saldo", fr: "Solde", de: "Kontostand" },
  "APR": { en: "APR", es: "TAE", pt: "TAE", fr: "TAEG", de: "Effektiver Jahreszins" },
  "interest": { en: "interest", es: "interés", pt: "juros", fr: "intérêts", de: "Zinsen" },
  "cost": { en: "cost", es: "costo", pt: "custo", fr: "coût", de: "Kosten" },

  // =============================================================================
  // COMMON VERBS/PHRASES
  // =============================================================================
  "is": { en: "is", es: "es", pt: "é", fr: "est", de: "ist" },
  "for": { en: "for", es: "por", pt: "por", fr: "pour", de: "für" },
  "in": { en: "in", es: "en", pt: "em", fr: "en", de: "in" },
  "of": { en: "of", es: "de", pt: "de", fr: "de", de: "von" },
  "and": { en: "and", es: "y", pt: "e", fr: "et", de: "und" },
  "or": { en: "or", es: "o", pt: "ou", fr: "ou", de: "oder" },
  "with": { en: "with", es: "con", pt: "com", fr: "avec", de: "mit" },
  "will be": { en: "will be", es: "será", pt: "será", fr: "sera", de: "wird sein" },
  "you will": { en: "you will", es: "usted", pt: "você", fr: "vous", de: "Sie werden" },
  "You will pay": { en: "You will pay", es: "Pagarás", pt: "Você pagará", fr: "Vous paierez", de: "Sie zahlen" },

  // =============================================================================
  // HEALTH TERMS
  // =============================================================================
  "BMI": { en: "BMI", es: "IMC", pt: "IMC", fr: "IMC", de: "BMI" },
  "Body Mass Index": { en: "Body Mass Index", es: "Índice de Masa Corporal", pt: "Índice de Massa Corporal", fr: "Indice de Masse Corporelle", de: "Body-Mass-Index" },
  "Normal": { en: "Normal", es: "Normal", pt: "Normal", fr: "Normal", de: "Normal" },
  "Underweight": { en: "Underweight", es: "Bajo peso", pt: "Abaixo do peso", fr: "Insuffisance pondérale", de: "Untergewicht" },
  "Overweight": { en: "Overweight", es: "Sobrepeso", pt: "Sobrepeso", fr: "Surpoids", de: "Übergewicht" },
  "Obese": { en: "Obese", es: "Obeso", pt: "Obeso", fr: "Obèse", de: "Fettleibig" },
  "calories": { en: "calories", es: "calorías", pt: "calorias", fr: "calories", de: "Kalorien" },
  "Calories": { en: "Calories", es: "Calorías", pt: "Calorias", fr: "Calories", de: "Kalorien" },
  "weight": { en: "weight", es: "peso", pt: "peso", fr: "poids", de: "Gewicht" },
  "height": { en: "height", es: "altura", pt: "altura", fr: "taille", de: "Größe" },
  "age": { en: "age", es: "edad", pt: "idade", fr: "âge", de: "Alter" },

  // =============================================================================
  // RESULTS/STATUS
  // =============================================================================
  "Your": { en: "Your", es: "Tu", pt: "Seu", fr: "Votre", de: "Ihr" },
  "Result": { en: "Result", es: "Resultado", pt: "Resultado", fr: "Résultat", de: "Ergebnis" },
  "Results": { en: "Results", es: "Resultados", pt: "Resultados", fr: "Résultats", de: "Ergebnisse" },
  "Estimated": { en: "Estimated", es: "Estimado", pt: "Estimado", fr: "Estimé", de: "Geschätzt" },
  "Recommended": { en: "Recommended", es: "Recomendado", pt: "Recomendado", fr: "Recommandé", de: "Empfohlen" },
  "Calculated": { en: "Calculated", es: "Calculado", pt: "Calculado", fr: "Calculé", de: "Berechnet" },
  "approximately": { en: "approximately", es: "aproximadamente", pt: "aproximadamente", fr: "environ", de: "ungefähr" },
  "about": { en: "about", es: "aproximadamente", pt: "cerca de", fr: "environ", de: "etwa" },

  // =============================================================================
  // DATES/MONTHS
  // =============================================================================
  "January": { en: "January", es: "Enero", pt: "Janeiro", fr: "Janvier", de: "Januar" },
  "February": { en: "February", es: "Febrero", pt: "Fevereiro", fr: "Février", de: "Februar" },
  "March": { en: "March", es: "Marzo", pt: "Março", fr: "Mars", de: "März" },
  "April": { en: "April", es: "Abril", pt: "Abril", fr: "Avril", de: "April" },
  "May": { en: "May", es: "Mayo", pt: "Maio", fr: "Mai", de: "Mai" },
  "June": { en: "June", es: "Junio", pt: "Junho", fr: "Juin", de: "Juni" },
  "July": { en: "July", es: "Julio", pt: "Julho", fr: "Juillet", de: "Juli" },
  "August": { en: "August", es: "Agosto", pt: "Agosto", fr: "Août", de: "August" },
  "September": { en: "September", es: "Septiembre", pt: "Setembro", fr: "Septembre", de: "September" },
  "October": { en: "October", es: "Octubre", pt: "Outubro", fr: "Octobre", de: "Oktober" },
  "November": { en: "November", es: "Noviembre", pt: "Novembro", fr: "Novembre", de: "November" },
  "December": { en: "December", es: "Diciembre", pt: "Dezembro", fr: "Décembre", de: "Dezember" },
};

// Words to translate (sorted by length descending to avoid partial matches)
export const TRANSLATION_KEYS = Object.keys(COMMON_TRANSLATIONS).sort((a, b) => b.length - a.length);

/**
 * Translate a text string by replacing known phrases with their translations
 */
export function translateText(text: string, locale: string): string {
  if (!text || typeof text !== 'string') return text || '';
  
  let translated = text;
  
  // Replace each known phrase
  for (const key of TRANSLATION_KEYS) {
    const translations = COMMON_TRANSLATIONS[key];
    const targetTranslation = translations[locale] || translations['en'];
    
    if (targetTranslation && key !== targetTranslation) {
      // Use word boundary regex for better matching
      const regex = new RegExp(`\\b${escapeRegex(key)}\\b`, 'gi');
      translated = translated.replace(regex, targetTranslation);
    }
  }
  
  return translated;
}

/**
 * Escape special regex characters
 */
function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Get translation for a specific key
 */
export function getTranslation(key: string, locale: string): string {
  const translations = COMMON_TRANSLATIONS[key];
  if (!translations) return key;
  return translations[locale] || translations['en'] || key;
}

export default COMMON_TRANSLATIONS;
