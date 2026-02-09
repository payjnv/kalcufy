// src/lib/category-pages-config.ts
// Configuration for dedicated category landing pages (for Google Sitelinks)

export interface CategoryPageConfig {
  id: string;
  icon: string;
  color: string;
  slugs: Record<string, string>;
  titles: Record<string, string>;
  descriptions: Record<string, string>;
  subtitles: Record<string, string>;
  keywords: Record<string, string[]>;
  // For filtering calculators from SLUG_REGISTRY
  registryCategory: string[];
}

export const CATEGORY_PAGES: CategoryPageConfig[] = [
  {
    id: "health",
    icon: "❤️",
    color: "rose",
    registryCategory: ["health"],
    slugs: {
      en: "health-calculators",
      es: "calculadoras-salud",
      pt: "calculadoras-saude",
      fr: "calculateurs-sante",
      de: "gesundheitsrechner",
    },
    titles: {
      en: "Health & Fitness Calculators - BMI, Calories, Body Fat | Kalcufy",
      es: "Calculadoras de Salud y Fitness - IMC, Calorías, Grasa Corporal | Kalcufy",
      pt: "Calculadoras de Saúde e Fitness - IMC, Calorias, Gordura Corporal | Kalcufy",
      fr: "Calculateurs Santé et Fitness - IMC, Calories, Masse Grasse | Kalcufy",
      de: "Gesundheits- & Fitness-Rechner - BMI, Kalorien, Körperfett | Kalcufy",
    },
    descriptions: {
      en: "Free health and fitness calculators: BMI, body fat, calorie deficit, ideal weight, macros, keto, and more. Science-backed tools with WHO standards.",
      es: "Calculadoras gratuitas de salud y fitness: IMC, grasa corporal, déficit calórico, peso ideal, macros, keto y más. Herramientas basadas en ciencia con estándares de la OMS.",
      pt: "Calculadoras gratuitas de saúde e fitness: IMC, gordura corporal, déficit calórico, peso ideal, macros, keto e mais. Ferramentas baseadas em ciência com padrões da OMS.",
      fr: "Calculateurs gratuits de santé et fitness : IMC, masse grasse, déficit calorique, poids idéal, macros, keto et plus. Outils basés sur la science avec normes OMS.",
      de: "Kostenlose Gesundheits- und Fitness-Rechner: BMI, Körperfett, Kaloriendefizit, Idealgewicht, Makros, Keto und mehr. Wissenschaftlich fundierte Tools nach WHO-Standards.",
    },
    subtitles: {
      en: "Science-backed health tools to track your body composition, nutrition, and fitness goals.",
      es: "Herramientas de salud basadas en ciencia para rastrear tu composición corporal, nutrición y metas fitness.",
      pt: "Ferramentas de saúde baseadas em ciência para acompanhar sua composição corporal, nutrição e metas fitness.",
      fr: "Outils de santé basés sur la science pour suivre votre composition corporelle, nutrition et objectifs fitness.",
      de: "Wissenschaftlich fundierte Gesundheitstools zur Verfolgung Ihrer Körperzusammensetzung, Ernährung und Fitnessziele.",
    },
    keywords: {
      en: ["health calculators", "bmi calculator", "calorie calculator", "body fat calculator", "fitness calculator", "free health tools"],
      es: ["calculadoras de salud", "calculadora imc", "calculadora calorias", "calculadora grasa corporal", "herramientas salud gratis"],
      pt: ["calculadoras de saúde", "calculadora imc", "calculadora calorias", "calculadora gordura corporal", "ferramentas saúde grátis"],
      fr: ["calculateurs santé", "calculateur imc", "calculateur calories", "calculateur masse grasse", "outils santé gratuits"],
      de: ["gesundheitsrechner", "bmi rechner", "kalorienrechner", "körperfettrechner", "kostenlose gesundheitstools"],
    },
  },
  {
    id: "finance",
    icon: "💰",
    color: "emerald",
    registryCategory: ["finance"],
    slugs: {
      en: "finance-calculators",
      es: "calculadoras-finanzas",
      pt: "calculadoras-financas",
      fr: "calculateurs-finance",
      de: "finanzrechner",
    },
    titles: {
      en: "Finance Calculators - Loans, Mortgage, Interest | Kalcufy",
      es: "Calculadoras Financieras - Préstamos, Hipoteca, Interés | Kalcufy",
      pt: "Calculadoras Financeiras - Empréstimos, Financiamento, Juros | Kalcufy",
      fr: "Calculateurs Financiers - Prêts, Hypothèque, Intérêts | Kalcufy",
      de: "Finanzrechner - Kredite, Hypothek, Zinsen | Kalcufy",
    },
    descriptions: {
      en: "Free financial calculators: auto loan, mortgage, 401(k), compound interest, debt payoff and more. Plan your finances with accurate, easy-to-use tools.",
      es: "Calculadoras financieras gratuitas: préstamo auto, hipoteca, 401(k), interés compuesto, pago de deuda y más. Planifica tus finanzas con herramientas precisas y fáciles.",
      pt: "Calculadoras financeiras gratuitas: financiamento auto, hipoteca, 401(k), juros compostos, quitação de dívida e mais. Planeje suas finanças com ferramentas precisas.",
      fr: "Calculateurs financiers gratuits : prêt auto, hypothèque, 401(k), intérêts composés, remboursement de dette et plus. Planifiez vos finances avec des outils précis.",
      de: "Kostenlose Finanzrechner: Autokredit, Hypothek, 401(k), Zinseszins, Schuldenabbau und mehr. Planen Sie Ihre Finanzen mit präzisen, benutzerfreundlichen Tools.",
    },
    subtitles: {
      en: "Make smarter money decisions with free calculators for loans, savings, investments, and retirement.",
      es: "Toma mejores decisiones financieras con calculadoras gratuitas para préstamos, ahorro, inversiones y retiro.",
      pt: "Tome decisões financeiras mais inteligentes com calculadoras gratuitas para empréstimos, poupança, investimentos e aposentadoria.",
      fr: "Prenez de meilleures décisions financières avec des calculateurs gratuits pour prêts, épargne, investissements et retraite.",
      de: "Treffen Sie klügere Finanzentscheidungen mit kostenlosen Rechnern für Kredite, Sparen, Investitionen und Rente.",
    },
    keywords: {
      en: ["finance calculators", "loan calculator", "mortgage calculator", "compound interest calculator", "401k calculator", "free financial tools"],
      es: ["calculadoras financieras", "calculadora préstamos", "calculadora hipoteca", "calculadora interés compuesto", "herramientas financieras gratis"],
      pt: ["calculadoras financeiras", "calculadora empréstimos", "calculadora financiamento", "calculadora juros compostos", "ferramentas financeiras grátis"],
      fr: ["calculateurs financiers", "calculateur prêt", "calculateur hypothèque", "calculateur intérêts composés", "outils financiers gratuits"],
      de: ["finanzrechner", "kreditrechner", "hypothekenrechner", "zinseszinsrechner", "kostenlose finanztools"],
    },
  },
  {
    id: "conversion",
    icon: "🔄",
    color: "blue",
    registryCategory: ["conversion"],
    slugs: {
      en: "conversion-calculators",
      es: "calculadoras-conversion",
      pt: "calculadoras-conversao",
      fr: "calculateurs-conversion",
      de: "umrechnungsrechner",
    },
    titles: {
      en: "Unit Conversion Calculators - Length, Weight, Temperature | Kalcufy",
      es: "Calculadoras de Conversión - Longitud, Peso, Temperatura | Kalcufy",
      pt: "Calculadoras de Conversão - Comprimento, Peso, Temperatura | Kalcufy",
      fr: "Calculateurs de Conversion - Longueur, Poids, Température | Kalcufy",
      de: "Umrechnungsrechner - Länge, Gewicht, Temperatur | Kalcufy",
    },
    descriptions: {
      en: "Free unit conversion calculators: length, weight, temperature, area, volume, speed, data, and more. Convert between metric and imperial units instantly.",
      es: "Calculadoras de conversión de unidades gratis: longitud, peso, temperatura, área, volumen, velocidad, datos y más. Convierte entre unidades métricas e imperiales al instante.",
      pt: "Calculadoras de conversão de unidades grátis: comprimento, peso, temperatura, área, volume, velocidade, dados e mais. Converta entre unidades métricas e imperiais instantaneamente.",
      fr: "Calculateurs de conversion d'unités gratuits : longueur, poids, température, surface, volume, vitesse, données et plus. Convertissez entre unités métriques et impériales instantanément.",
      de: "Kostenlose Einheitenumrechnungsrechner: Länge, Gewicht, Temperatur, Fläche, Volumen, Geschwindigkeit, Daten und mehr. Sofortige Umrechnung zwischen metrischen und imperialen Einheiten.",
    },
    subtitles: {
      en: "Instantly convert between metric and imperial units — length, weight, temperature, area, volume and more.",
      es: "Convierte instantáneamente entre unidades métricas e imperiales — longitud, peso, temperatura, área, volumen y más.",
      pt: "Converta instantaneamente entre unidades métricas e imperiais — comprimento, peso, temperatura, área, volume e mais.",
      fr: "Convertissez instantanément entre unités métriques et impériales — longueur, poids, température, surface, volume et plus.",
      de: "Sofortige Umrechnung zwischen metrischen und imperialen Einheiten — Länge, Gewicht, Temperatur, Fläche, Volumen und mehr.",
    },
    keywords: {
      en: ["unit converter", "conversion calculator", "length converter", "weight converter", "temperature converter", "metric to imperial"],
      es: ["convertidor de unidades", "calculadora conversión", "convertidor longitud", "convertidor peso", "convertidor temperatura"],
      pt: ["conversor de unidades", "calculadora conversão", "conversor comprimento", "conversor peso", "conversor temperatura"],
      fr: ["convertisseur d'unités", "calculateur conversion", "convertisseur longueur", "convertisseur poids", "convertisseur température"],
      de: ["einheitenumrechner", "umrechnungsrechner", "längenumrechner", "gewichtsumrechner", "temperaturumrechner"],
    },
  },
  {
    id: "everyday",
    icon: "🧮",
    color: "amber",
    registryCategory: ["everyday"],
    slugs: {
      en: "everyday-calculators",
      es: "calculadoras-cotidianas",
      pt: "calculadoras-cotidianas",
      fr: "calculateurs-quotidiens",
      de: "alltagsrechner",
    },
    titles: {
      en: "Everyday Calculators - Age, Tip, Date, Time | Kalcufy",
      es: "Calculadoras Cotidianas - Edad, Propina, Fecha, Tiempo | Kalcufy",
      pt: "Calculadoras do Cotidiano - Idade, Gorjeta, Data, Tempo | Kalcufy",
      fr: "Calculateurs du Quotidien - Âge, Pourboire, Date, Temps | Kalcufy",
      de: "Alltagsrechner - Alter, Trinkgeld, Datum, Zeit | Kalcufy",
    },
    descriptions: {
      en: "Free everyday calculators: age, tip, date difference, time zones, percentage, random number and more. Quick tools for daily life decisions.",
      es: "Calculadoras cotidianas gratuitas: edad, propina, diferencia de fechas, zonas horarias, porcentaje, número aleatorio y más. Herramientas rápidas para decisiones diarias.",
      pt: "Calculadoras do cotidiano gratuitas: idade, gorjeta, diferença de datas, fusos horários, porcentagem, número aleatório e mais. Ferramentas rápidas para decisões do dia a dia.",
      fr: "Calculateurs quotidiens gratuits : âge, pourboire, différence de dates, fuseaux horaires, pourcentage, nombre aléatoire et plus. Outils rapides pour la vie quotidienne.",
      de: "Kostenlose Alltagsrechner: Alter, Trinkgeld, Datumsunterschied, Zeitzonen, Prozent, Zufallszahl und mehr. Schnelle Tools für tägliche Entscheidungen.",
    },
    subtitles: {
      en: "Quick, free tools for everyday calculations — age, tips, dates, percentages, and more.",
      es: "Herramientas rápidas y gratuitas para cálculos cotidianos — edad, propinas, fechas, porcentajes y más.",
      pt: "Ferramentas rápidas e gratuitas para cálculos do cotidiano — idade, gorjetas, datas, porcentagens e mais.",
      fr: "Outils rapides et gratuits pour les calculs du quotidien — âge, pourboires, dates, pourcentages et plus.",
      de: "Schnelle, kostenlose Tools für alltägliche Berechnungen — Alter, Trinkgeld, Daten, Prozente und mehr.",
    },
    keywords: {
      en: ["everyday calculators", "age calculator", "tip calculator", "date calculator", "percentage calculator", "free daily tools"],
      es: ["calculadoras cotidianas", "calculadora edad", "calculadora propina", "calculadora fecha", "calculadora porcentaje"],
      pt: ["calculadoras cotidianas", "calculadora idade", "calculadora gorjeta", "calculadora data", "calculadora porcentagem"],
      fr: ["calculateurs quotidiens", "calculateur âge", "calculateur pourboire", "calculateur date", "calculateur pourcentage"],
      de: ["alltagsrechner", "alterrechner", "trinkgeldrechner", "datumsrechner", "prozentrechner"],
    },
  },
  {
    id: "technology",
    icon: "💻",
    color: "violet",
    registryCategory: ["technology"],
    slugs: {
      en: "technology-calculators",
      es: "calculadoras-tecnologia",
      pt: "calculadoras-tecnologia",
      fr: "calculateurs-technologie",
      de: "technologierechner",
    },
    titles: {
      en: "Technology Calculators - Data, Bandwidth, Storage | Kalcufy",
      es: "Calculadoras de Tecnología - Datos, Ancho de Banda, Almacenamiento | Kalcufy",
      pt: "Calculadoras de Tecnologia - Dados, Largura de Banda, Armazenamento | Kalcufy",
      fr: "Calculateurs Technologie - Données, Bande Passante, Stockage | Kalcufy",
      de: "Technologierechner - Daten, Bandbreite, Speicher | Kalcufy",
    },
    descriptions: {
      en: "Free technology calculators: download time, bandwidth, storage, screen resolution, and more. Essential tools for IT professionals and tech enthusiasts.",
      es: "Calculadoras de tecnología gratuitas: tiempo de descarga, ancho de banda, almacenamiento, resolución de pantalla y más. Herramientas esenciales para profesionales de TI.",
      pt: "Calculadoras de tecnologia gratuitas: tempo de download, largura de banda, armazenamento, resolução de tela e mais. Ferramentas essenciais para profissionais de TI.",
      fr: "Calculateurs technologie gratuits : temps de téléchargement, bande passante, stockage, résolution d'écran et plus. Outils essentiels pour les professionnels IT.",
      de: "Kostenlose Technologierechner: Download-Zeit, Bandbreite, Speicher, Bildschirmauflösung und mehr. Wichtige Tools für IT-Profis und Technik-Enthusiasten.",
    },
    subtitles: {
      en: "Essential tech tools — calculate download times, bandwidth needs, storage requirements, and more.",
      es: "Herramientas tech esenciales — calcula tiempos de descarga, necesidades de ancho de banda, requisitos de almacenamiento y más.",
      pt: "Ferramentas tech essenciais — calcule tempos de download, necessidades de largura de banda, requisitos de armazenamento e mais.",
      fr: "Outils tech essentiels — calculez les temps de téléchargement, besoins en bande passante, exigences de stockage et plus.",
      de: "Wichtige Tech-Tools — berechnen Sie Download-Zeiten, Bandbreitenbedarf, Speicheranforderungen und mehr.",
    },
    keywords: {
      en: ["technology calculators", "download time calculator", "bandwidth calculator", "storage calculator", "free tech tools"],
      es: ["calculadoras tecnología", "calculadora tiempo descarga", "calculadora ancho banda", "calculadora almacenamiento"],
      pt: ["calculadoras tecnologia", "calculadora tempo download", "calculadora largura banda", "calculadora armazenamento"],
      fr: ["calculateurs technologie", "calculateur temps téléchargement", "calculateur bande passante", "calculateur stockage"],
      de: ["technologierechner", "downloadzeit rechner", "bandbreitenrechner", "speicherrechner"],
    },
  },
  {
    id: "math",
    icon: "📐",
    color: "indigo",
    registryCategory: ["math"],
    slugs: {
      en: "math-calculators",
      es: "calculadoras-matematicas",
      pt: "calculadoras-matematica",
      fr: "calculateurs-mathematiques",
      de: "mathe-rechner",
    },
    titles: {
      en: "Math Calculators - Algebra, Geometry, Statistics | Kalcufy",
      es: "Calculadoras Matemáticas - Álgebra, Geometría, Estadística | Kalcufy",
      pt: "Calculadoras de Matemática - Álgebra, Geometria, Estatística | Kalcufy",
      fr: "Calculateurs Mathématiques - Algèbre, Géométrie, Statistiques | Kalcufy",
      de: "Mathe-Rechner - Algebra, Geometrie, Statistik | Kalcufy",
    },
    descriptions: {
      en: "Free math calculators: quadratic formula, percentage, fractions, statistics, and more. Step-by-step solutions for algebra, geometry, and calculus problems.",
      es: "Calculadoras matemáticas gratuitas: fórmula cuadrática, porcentaje, fracciones, estadística y más. Soluciones paso a paso para álgebra, geometría y cálculo.",
      pt: "Calculadoras de matemática gratuitas: fórmula quadrática, porcentagem, frações, estatística e mais. Soluções passo a passo para álgebra, geometria e cálculo.",
      fr: "Calculateurs mathématiques gratuits : formule quadratique, pourcentage, fractions, statistiques et plus. Solutions étape par étape pour l'algèbre, la géométrie et le calcul.",
      de: "Kostenlose Mathe-Rechner: Quadratische Formel, Prozent, Brüche, Statistik und mehr. Schritt-für-Schritt-Lösungen für Algebra, Geometrie und Analysis.",
    },
    subtitles: {
      en: "Solve math problems step by step — algebra, geometry, statistics, and more with free online tools.",
      es: "Resuelve problemas matemáticos paso a paso — álgebra, geometría, estadística y más con herramientas online gratuitas.",
      pt: "Resolva problemas matemáticos passo a passo — álgebra, geometria, estatística e mais com ferramentas online gratuitas.",
      fr: "Résolvez des problèmes mathématiques étape par étape — algèbre, géométrie, statistiques et plus avec des outils en ligne gratuits.",
      de: "Lösen Sie Mathe-Aufgaben Schritt für Schritt — Algebra, Geometrie, Statistik und mehr mit kostenlosen Online-Tools.",
    },
    keywords: {
      en: ["math calculators", "quadratic calculator", "percentage calculator", "algebra calculator", "geometry calculator", "free math tools"],
      es: ["calculadoras matemáticas", "calculadora cuadrática", "calculadora porcentaje", "calculadora álgebra"],
      pt: ["calculadoras matemática", "calculadora quadrática", "calculadora porcentagem", "calculadora álgebra"],
      fr: ["calculateurs mathématiques", "calculateur quadratique", "calculateur pourcentage", "calculateur algèbre"],
      de: ["mathe-rechner", "quadratischer rechner", "prozentrechner", "algebra-rechner"],
    },
  },
  {
    id: "home",
    icon: "🏠",
    color: "orange",
    registryCategory: ["home"],
    slugs: {
      en: "home-improvement-calculators",
      es: "calculadoras-hogar",
      pt: "calculadoras-casa",
      fr: "calculateurs-maison",
      de: "heimwerker-rechner",
    },
    titles: {
      en: "Home & Construction Calculators - Paint, Flooring, Roofing | Kalcufy",
      es: "Calculadoras de Hogar y Construcción - Pintura, Pisos, Techos | Kalcufy",
      pt: "Calculadoras de Casa e Construção - Pintura, Pisos, Telhados | Kalcufy",
      fr: "Calculateurs Maison et Construction - Peinture, Sols, Toiture | Kalcufy",
      de: "Heim- & Bau-Rechner - Farbe, Bodenbelag, Dach | Kalcufy",
    },
    descriptions: {
      en: "Free home improvement calculators: paint, flooring, roofing, concrete, fencing and more. Plan your DIY projects with accurate material estimates.",
      es: "Calculadoras de mejoras del hogar gratuitas: pintura, pisos, techos, concreto, cercas y más. Planifica tus proyectos DIY con estimaciones precisas de materiales.",
      pt: "Calculadoras de reforma gratuitas: pintura, pisos, telhados, concreto, cercas e mais. Planeje seus projetos DIY com estimativas precisas de materiais.",
      fr: "Calculateurs de rénovation gratuits : peinture, sols, toiture, béton, clôtures et plus. Planifiez vos projets DIY avec des estimations de matériaux précises.",
      de: "Kostenlose Heimwerker-Rechner: Farbe, Bodenbelag, Dach, Beton, Zäune und mehr. Planen Sie Ihre DIY-Projekte mit genauen Materialschätzungen.",
    },
    subtitles: {
      en: "Plan your next project — estimate paint, flooring, roofing, and construction materials accurately.",
      es: "Planifica tu próximo proyecto — estima pintura, pisos, techos y materiales de construcción con precisión.",
      pt: "Planeje seu próximo projeto — estime pintura, pisos, telhados e materiais de construção com precisão.",
      fr: "Planifiez votre prochain projet — estimez peinture, sols, toiture et matériaux de construction avec précision.",
      de: "Planen Sie Ihr nächstes Projekt — schätzen Sie Farbe, Bodenbelag, Dach und Baumaterialien genau.",
    },
    keywords: {
      en: ["home calculators", "paint calculator", "flooring calculator", "roofing calculator", "construction calculator", "diy calculator"],
      es: ["calculadoras hogar", "calculadora pintura", "calculadora pisos", "calculadora techos", "calculadora construcción"],
      pt: ["calculadoras casa", "calculadora pintura", "calculadora pisos", "calculadora telhados", "calculadora construção"],
      fr: ["calculateurs maison", "calculateur peinture", "calculateur sols", "calculateur toiture", "calculateur construction"],
      de: ["heimwerker-rechner", "farbrechner", "bodenbelagsrechner", "dachrechner", "baurechner"],
    },
  },
];

// Helper to find category config by slug
export function getCategoryBySlug(slug: string): CategoryPageConfig | undefined {
  return CATEGORY_PAGES.find((cat) =>
    Object.values(cat.slugs).includes(slug)
  );
}

// Helper to get all category slugs for a locale
export function getCategorySlugsForLocale(locale: string): string[] {
  return CATEGORY_PAGES.map((cat) => cat.slugs[locale] || cat.slugs.en);
}
