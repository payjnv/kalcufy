// KALCUFY V4 - SLUG REGISTRY
// Solo calculadoras V4 activas

export type SlugEntry = {
  id: string;
  category: "health" | "finance" | "math" | "everyday" | "drafts";
  slugs: {
    en: string;
    es: string;
    pt: string;
    fr: string;
    de: string;
  };
};

// SOLO CALCULADORAS V4 ACTIVAS
export const SLUG_REGISTRY: SlugEntry[] = [
  { id: "401k-calculator", category: "health", slugs: { en: "401k-calculator", es: "calculadora-401k", pt: "calculadora-401k", fr: "calculateur-401k", de: "rechner-401k-altersvorsorge" } },
  { id: "auto-loan", category: "finance", slugs: { en: "auto-loan-calculator", es: "calculadora-prestamo-auto", pt: "calculadora-financiamento-veicular", fr: "calculateur-pret-automobile", de: "autokredit-rechner" } },
  { id: "quadratic", category: "math", slugs: { en: "quadratic-formula-calculator", es: "calculadora-formula-cuadratica", pt: "calculadora-formula-quadratica", de: "quadratische-formel-rechner", fr: "calculateur-formule-quadratique" } },
  { id: "tip", category: "everyday", slugs: { en: "tip-calculator", es: "calculadora-propinas", pt: "calculadora-gorjeta", fr: "calculateur-pourboire", de: "trinkgeld-rechner" } },

  { id: "age", category: "everyday", slugs: { en: "age-calculator", es: "calculadora-edad", pt: "calculadora-idade", fr: "calculateur-age", de: "alter-rechner" } },
  { id: "body-fat", category: "health", slugs: { en: "body-fat-calculator", es: "calculadora-grasa-corporal", pt: "calculadora-gordura-corporal", fr: "calculateur-graisse-corporelle", de: "koerperfett-rechner" } },
  { id: "caloric-deficit", category: "health", slugs: { en: "caloric-deficit-calculator", es: "calculadora-deficit-calorico", pt: "calculadora-deficit-calorico", fr: "calculateur-deficit-calorique", de: "kaloriendefizit-rechner" } },
  { id: "maintenance-calories", category: "health", slugs: { en: "maintenance-calories-calculator", es: "calculadora-calorias-mantenimiento", pt: "calculadora-calorias-manutencao", fr: "calculateur-calories-maintien", de: "erhaltungskalorien-rechner" } },
  { id: "one-rep-max", category: "health", slugs: { en: "one-rep-max-calculator", es: "calculadora-una-repeticion-maxima", pt: "calculadora-uma-repeticao-maxima", fr: "calculateur-repetition-maximale", de: "ein-wiederholungs-maximum-rechner" } },
  { id: "bmi", category: "health", slugs: { en: "bmi-calculator", es: "calculadora-indice-masa-corporal", pt: "calculadora-indice-massa-corporal", fr: "calculateur-indice-masse-corporelle", de: "koerpermassenindex-rechner" } },
  { id: "ideal-weight", category: "health", slugs: { en: "ideal-weight-calculator", es: "calculadora-peso-ideal", pt: "calculadora-peso-ideal", fr: "calculateur-poids-ideal", de: "idealgewicht-rechner" } },
  { id: "keto", category: "health", slugs: { en: "keto-calculator", es: "calculadora-keto", pt: "calculadora-cetogenica", fr: "calculateur-keto", de: "keto-rechner" } },
  { id: "lean-body-mass", category: "health", slugs: { en: "lean-body-mass-calculator", es: "calculadora-masa-corporal-magra", pt: "calculadora-massa-corporal-magra", fr: "calculateur-masse-maigre", de: "magermasse-rechner" } },
  { id: "macro", category: "health", slugs: { en: "macro-calculator", es: "calculadora-macronutrientes", pt: "calculadora-macronutrientes", fr: "calculateur-macronutriments", de: "makro-rechner" } },
  { id: "water-intake", category: "health", slugs: { en: "water-intake-calculator", es: "calculadora-ingesta-agua-diaria", pt: "calculadora-consumo-agua", fr: "calculateur-apport-hydrique", de: "wasseraufnahme-rechner" } },
  { id: "sleep", category: "health", slugs: { en: "sleep-calculator", es: "calculadora-sueno", pt: "calculadora-sono", fr: "calculateur-sommeil", de: "schlaf-rechner" } },
  { id: "rest-day", category: "health", slugs: { en: "rest-day-calculator", es: "calculadora-dias-descanso", pt: "calculadora-dia-descanso", fr: "calculateur-jour-repos", de: "ruhetag-rechner" } },
  { id: "running-pace", category: "health", slugs: { en: "running-pace-calculator", es: "calculadora-ritmo-carrera", pt: "calculadora-ritmo-corrida", fr: "calculateur-allure-course", de: "lauftempo-rechner" } },
  { id: "protein", category: "health", slugs: { en: "protein-calculator", es: "calculadora-proteina", pt: "calculadora-proteina", fr: "calculateur-proteines", de: "protein-rechner" } },
  { id: "waist-to-height-ratio", category: "health", slugs: { en: "waist-to-height-ratio-calculator", es: "calculadora-relacion-cintura-altura", pt: "calculadora-relacao-cintura-altura", fr: "calculateur-ratio-taille-hauteur", de: "taille-zu-koerpergroesse-verhaeltnis-rechner" } },
  { id: "heart-rate-zones", category: "health", slugs: { en: "heart-rate-zones-calculator", es: "calculadora-zonas-frecuencia-cardiaca", pt: "calculadora-zonas-frequencia-cardiaca", fr: "calculateur-zones-frequence-cardiaque", de: "herzfrequenzzonen-rechner" } },
  { id: "weight-gain", category: "health", slugs: { en: "weight-gain-calculator", es: "calculadora-aumento-peso", pt: "calculadora-ganho-peso", fr: "calculateur-prise-de-poids", de: "gewichtszunahme-rechner" } },
  { id: "weight-loss", category: "health", slugs: { en: "weight-loss-calculator", es: "calculadora-perdida-peso", pt: "calculadora-perda-peso", fr: "calculateur-perte-de-poids", de: "gewichtsverlust-rechner" } },
  { id: "calories-burned", category: "health", slugs: { en: "calories-burned-calculator", es: "calculadora-calorias-quemadas", pt: "calculadora-calorias-queimadas", fr: "calculateur-calories-brulees", de: "kalorienverbrauch-rechner" } },
  { id: "tdee", category: "health", slugs: { en: "tdee-calculator", es: "calculadora-gasto-energetico-diario-total", pt: "calculadora-gasto-energetico-diario-total", fr: "calculateur-depense-energetique-totale-quotidienne", de: "gesamtenergieumsatz-rechner" } },
  { id: "calorie", category: "health", slugs: { en: "calorie-calculator", es: "calculadora-calorias", pt: "calculadora-calorias", fr: "calculateur-calories", de: "kalorien-rechner" } },
  { id: "bmr", category: "health", slugs: { en: "bmr-calculator", es: "calculadora-tasa-metabolica-basal", pt: "calculadora-taxa-metabolica-basal", fr: "calculateur-metabolisme-base", de: "grundumsatz-rechner" } },
  { id: "pregnancy-due-date", category: "health", slugs: { en: "pregnancy-due-date-calculator", es: "calculadora-fecha-parto-embarazo", pt: "calculadora-data-prevista-parto", fr: "calculateur-date-accouchement", de: "schwangerschafts-geburtstermin-rechner" } },
  { id: "currency-converter", category: "conversion", slugs: { en: "currency-converter-calculator", es: "calculadora-conversor-divisas", pt: "calculadora-conversor-moedas", fr: "calculateur-convertisseur-devises", de: "waehrungsumrechner-rechner" } },
  { id: "length-converter", category: "conversion", slugs: { en: "length-converter-calculator", es: "length-converter", pt: "calculadora-length-converter", fr: "calculateur-length-converter", de: "length-converter-rechner" } },
  { id: "cm-to-inches", category: "conversion", slugs: { en: "cm-to-inches-calculator", es: "cm-to-inches", pt: "calculadora-cm-to-inches", fr: "calculateur-cm-to-inches", de: "cm-to-inches-rechner" } },
  { id: "inches-to-cm", category: "conversion", slugs: { en: "inches-to-cm-calculator", es: "calculadora-pulgadas-a-centimetros", pt: "calculadora-polegadas-para-cm", fr: "calculateur-pouces-vers-cm", de: "zoll-zu-zentimeter-rechner" } },
  { id: "km-to-miles", category: "conversion", slugs: { en: "km-to-miles-calculator", es: "calculadora-kilometros-millas", pt: "calculadora-km-para-milhas", fr: "calculateur-kilometres-vers-miles", de: "kilometer-zu-meilen-rechner" } },
  { id: "miles-to-km", category: "conversion", slugs: { en: "miles-to-km-calculator", es: "calculadora-millas-a-kilometros", pt: "calculadora-milhas-para-km", fr: "calculateur-miles-vers-kilometres", de: "meilen-zu-km-rechner" } },
  { id: "meters-to-feet", category: "conversion", slugs: { en: "meters-to-feet-calculator", es: "calculadora-metros-a-pies", pt: "calculadora-metros-para-pes", fr: "calculateur-metres-vers-pieds", de: "meter-zu-fuss-rechner" } },
  { id: "feet-to-meters", category: "conversion", slugs: { en: "feet-to-meters-calculator", es: "calculadora-pies-metros", pt: "calculadora-pes-para-metros", fr: "calculateur-pieds-vers-metres", de: "fuss-zu-meter-rechner" } },
  { id: "mm-to-inches", category: "conversion", slugs: { en: "mm-to-inches-calculator", es: "calculadora-milimetros-pulgadas", pt: "calculadora-milimetros-para-polegadas", fr: "calculateur-mm-vers-pouces", de: "millimeter-zu-zoll-rechner" } },
  { id: "inches-to-mm", category: "conversion", slugs: { en: "inches-to-mm-calculator", es: "calculadora-pulgadas-a-milimetros", pt: "calculadora-polegadas-para-milimetros", fr: "calculateur-pouces-vers-millimetres", de: "zoll-zu-mm-rechner" } },
  { id: "cm-to-feet", category: "conversion", slugs: { en: "cm-to-feet-calculator", es: "calculadora-convertidor-centimetros-pies", pt: "calculadora-cm-para-pes", fr: "calculateur-convertisseur-cm-vers-pieds", de: "zentimeter-zu-fuss-rechner" } },
  { id: "feet-to-cm", category: "conversion", slugs: { en: "feet-to-cm-calculator", es: "calculadora-pies-centimetros", pt: "calculadora-conversor-pes-para-centimetros", fr: "calculateur-pieds-vers-cm", de: "fuss-zu-zentimeter-rechner" } },
  { id: "inches-to-feet", category: "conversion", slugs: { en: "inches-to-feet-calculator", es: "calculadora-pulgadas-a-pies", pt: "calculadora-polegadas-para-pes", fr: "calculateur-pouces-vers-pieds", de: "zoll-zu-fuss-rechner" } },
  { id: "kg-to-lbs", category: "conversion", slugs: { en: "kg-to-lbs-calculator", es: "calculadora-kg-a-libras", pt: "calculadora-kg-para-libras", fr: "calculateur-kg-en-livres", de: "kg-zu-lbs-umrechner" } },
  { id: "lbs-to-kg", category: "conversion", slugs: { en: "lbs-to-kg-calculator", es: "calculadora-libras-a-kilogramos", pt: "calculadora-conversao-libras-quilogramas", fr: "calculateur-livres-vers-kilogrammes", de: "pfund-zu-kg-umrechner" } },
  { id: "celsius-to-fahrenheit", category: "conversion", slugs: { en: "celsius-to-fahrenheit-calculator", es: "calculadora-celsius-fahrenheit", pt: "calculadora-celsius-para-fahrenheit", fr: "calculateur-celsius-vers-fahrenheit", de: "celsius-zu-fahrenheit-umrechner" } },
  { id: "fahrenheit-to-celsius", category: "conversion", slugs: { en: "fahrenheit-to-celsius-calculator", es: "calculadora-fahrenheit-a-celsius", pt: "calculadora-fahrenheit-para-celsius", fr: "calculateur-fahrenheit-vers-celsius", de: "fahrenheit-zu-celsius-umrechner" } },
  { id: "oz-to-ml", category: "conversion", slugs: { en: "oz-to-ml-calculator", es: "calculadora-onzas-a-mililitros", pt: "calculadora-onca-fluida-para-mililitro", fr: "calculateur-once-liquide-vers-millilitre", de: "unzen-zu-ml-umrechner" } },
  { id: "paint-calculator", category: "home", slugs: { en: "paint-calculator-calculator", es: "calculadora-pintura", pt: "calculadora-tinta", fr: "calculateur-peinture", de: "farbe-rechner" } },
  { id: "concrete-calculator", category: "home", slugs: { en: "concrete-calculator-calculator", es: "calculadora-concreto", pt: "calculadora-concreto", fr: "calculateur-beton", de: "beton-rechner" } },
  { id: "password-generator", category: "technology", slugs: { en: "password-generator-calculator", es: "password-generator", pt: "calculadora-password-generator", fr: "calculateur-password-generator", de: "password-generator-rechner" } },
  { id: "ip-subnet", category: "technology", slugs: { en: "ip-subnet-calculator", es: "ip-subnet-calculator", pt: "calculadora-ip-subnet", fr: "calculateur-ip-subnet", de: "ip-subnet-rechner" } },
  { id: "cidr", category: "technology", slugs: { en: "cidr-calculator", es: "calculadora-cidr", pt: "calculadora-cidr", fr: "calculateur-cidr", de: "cidr-rechner" } },
  { id: "bandwidth", category: "technology", slugs: { en: "bandwidth-calculator", es: "calculadora-ancho-banda", pt: "calculadora-largura-banda", fr: "calculateur-bande-passante", de: "bandbreite-rechner" } },
  { id: "transfer-time", category: "technology", slugs: { en: "transfer-time-calculator", es: "calculadora-tiempo-transferencia", pt: "calculadora-tempo-transferencia", fr: "calculateur-temps-transfert", de: "uebertragungszeit-rechner" } },
  { id: "vlsm", category: "technology", slugs: { en: "vlsm-calculator", es: "calculadora-vlsm", pt: "calculadora-vlsm-mascaras-sub-rede-tamanho-variavel", fr: "calculateur-vlsm-masquage-sous-reseaux-longueur-variable", de: "vlsm-rechner" } },
  { id: "password-strength", category: "technology", slugs: { en: "password-strength-calculator", es: "calculadora-fortaleza-contrasenas", pt: "calculadora-forca-senha", fr: "calculateur-force-mot-de-passe", de: "passwort-staerke-rechner" } },
  { id: "raid", category: "technology", slugs: { en: "raid-calculator", es: "calculadora-raid", pt: "calculadora-raid", fr: "calculateur-raid", de: "raid-rechner" } },
  { id: "psu-calculator", category: "technology", slugs: { en: "psu-calculator-calculator", es: "calculadora-fuente-alimentacion", pt: "calculadora-fonte-alimentacao", fr: "calculateur-alimentation-pc", de: "netzteil-rechner" } },
  { id: "digital-unit-converter", category: "everyday", slugs: { en: "digital-unit-converter-calculator", es: "calculadora-convertidor-unidades-digitales", pt: "calculadora-conversor-unidades-digitais", fr: "calculateur-convertisseur-unites-numeriques", de: "digitale-einheitenumrechnung-rechner" } },
  { id: "intermittent-fasting", category: "health", slugs: { en: "intermittent-fasting-calculator", es: "calculadora-ayuno-intermitente", pt: "calculadora-jejum-intermitente", fr: "calculateur-jeune-intermittent", de: "intervallfasten-rechner" } },
  { id: "ovulation", category: "health", slugs: { en: "ovulation-calculator", es: "calculadora-ovulacion", pt: "calculadora-ovulacao", fr: "calculateur-ovulation", de: "eisprung-rechner" } },
  { id: "pregnancy-weight-gain", category: "health", slugs: { en: "pregnancy-weight-gain-calculator", es: "calculadora-aumento-peso-embarazo", pt: "calculadora-ganho-peso-gravidez", fr: "calculateur-prise-poids-grossesse", de: "schwangerschaftsgewichtszunahme-rechner" } },
  { id: "conception-date", category: "health", slugs: { en: "conception-date-calculator", es: "calculadora-fecha-concepcion", pt: "calculadora-data-concepcao", fr: "calculateur-date-conception", de: "empfaengnisdatum-rechner" } },
  { id: "implantation", category: "health", slugs: { en: "implantation-calculator", es: "calculadora-implantacion", pt: "calculadora-implantacao", fr: "calculateur-implantation", de: "einnistungs-rechner" } },
  { id: "chinese-gender-predictor", category: "health", slugs: { en: "chinese-gender-predictor-calculator", es: "calculadora-predictor-genero-chino", pt: "calculadora-preditor-genero-chines", fr: "calculateur-predicteur-sexe-chinois", de: "chinesischer-geschlechtsprediktor-rechner" } },
  { id: "hcg-calculator", category: "health", slugs: { en: "hcg-calculator-calculator", es: "calculadora-hcg-calculator", pt: "calculadora-hcg", fr: "calculateur-hcg", de: "hcg-rechner" } },
  { id: "gallons-to-liters", category: "conversion", slugs: { en: "gallons-to-liters-calculator", es: "calculadora-galones-a-litros", pt: "calculadora-galoes-para-litros", fr: "calculateur-gallons-vers-litres", de: "gallonen-zu-liter-rechner" } },
  { id: "cups-to-ml", category: "conversion", slugs: { en: "cups-to-ml-calculator", es: "calculadora-tazas-mililitros", pt: "calculadora-xicaras-para-ml", fr: "calculateur-tasses-vers-ml", de: "tassen-zu-ml-rechner" } },
  { id: "square-feet-to-square-meters", category: "conversion", slugs: { en: "square-feet-to-square-meters-calculator", es: "calculadora-pies-cuadrados-metros-cuadrados", pt: "calculadora-pes-quadrados-para-metros-quadrados", fr: "calculateur-pieds-carres-vers-metres-carres", de: "quadratfuss-zu-quadratmeter-rechner" } },
  { id: "mph-to-kmh", category: "conversion", slugs: { en: "mph-to-kmh-calculator", es: "calculadora-mph-a-kmh", pt: "calculadora-conversao-mph-kmh", fr: "calculateur-mph-vers-kmh", de: "meilen-pro-stunde-zu-kilometer-pro-stunde-rechner" } },
  { id: "date-calculator", category: "everyday", slugs: { en: "date-calculator", es: "calculadora-fechas", pt: "calculadora-datas", fr: "calculateur-dates", de: "datum-rechner" } },
  { id: "loan-calculator", category: "finance", slugs: { en: "loan-calculator", es: "calculadora-prestamos", pt: "calculadora-emprestimos", fr: "calculateur-prets", de: "kredit-rechner" } },
  { id: "percentage-calculator", category: "math", slugs: { en: "percentage-calculator", es: "calculadora-porcentajes", pt: "calculadora-porcentagem", fr: "calculateur-pourcentage", de: "prozent-rechner" } },
  { id: "random-number-generator", category: "everyday", slugs: { en: "random-number-generator-calculator", es: "generador-numeros-aleatorios", pt: "gerador-numeros-aleatorios", fr: "generateur-nombres-aleatoires", de: "zufallszahlen-generator" } },
  { id: "cuadras-to-hectareas-converter", category: "conversion", slugs: { en: "cuadras-to-hectareas-converter-calculator", es: "calculadora-cuadras-a-hectareas", pt: "calculadora-cuadras-para-hectares", fr: "calculateur-cuadras-vers-hectares", de: "cuadras-zu-hektar-rechner" } },
  { id: "fanegadas-to-hectareas-converter", category: "conversion", slugs: { en: "fanegadas-to-hectareas-converter-calculator", es: "calculadora-fanegadas-a-hectareas", pt: "calculadora-fanegadas-para-hectares", fr: "calculateur-fanegadas-vers-hectares", de: "fanegadas-zu-hektar-rechner" } },
  { id: "manzanas-to-hectareas-converter", category: "conversion", slugs: { en: "manzanas-to-hectareas-converter-calculator", es: "calculadora-manzanas-a-hectareas", pt: "calculadora-manzanas-para-hectares", fr: "calculateur-manzanas-vers-hectares", de: "manzanas-zu-hektar-rechner" } },
  { id: "tareas-to-metros-cuadrados-converter", category: "conversion", slugs: { en: "tareas-to-metros-cuadrados-converter-calculator", es: "calculadora-tareas-a-metros-cuadrados", pt: "calculadora-tarefas-para-metros-quadrados", fr: "calculateur-tareas-vers-metres-carres", de: "tareas-zu-quadratmeter-rechner" } },
  { id: "varas-to-metros-converter", category: "conversion", slugs: { en: "varas-to-metros-converter-calculator", es: "calculadora-varas-a-metros", pt: "calculadora-varas-para-metros", fr: "calculateur-varas-vers-metres", de: "varas-zu-meter-rechner" } },
]; // END SLUG_REGISTRY

// Helper functions
export function getEntryById(id: string): SlugEntry | undefined {
  return SLUG_REGISTRY.find(entry => entry.id === id);
}

export function getEntryBySlug(slug: string, locale: string = "en"): SlugEntry | undefined {
  return SLUG_REGISTRY.find(entry => entry.slugs[locale as keyof typeof entry.slugs] === slug);
}

export function getSlugForLocale(id: string, locale: string): string | undefined {
  const entry = getEntryById(id);
  return entry?.slugs[locale as keyof typeof entry.slugs];
}

export function getAllSlugsForLocale(locale: string): string[] {
  return SLUG_REGISTRY.map(entry => entry.slugs[locale as keyof typeof entry.slugs]);
}
