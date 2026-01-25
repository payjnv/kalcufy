// src/lib/valid-calculators.ts
// Lista centralizada de calculadoras válidas en el sistema

export interface ValidCalculator {
  slug: string;
  nameEn: string;
  nameEs: string;
  namePt: string;
  category: "finance" | "health";
  icon: string;
}

export const VALID_CALCULATORS: ValidCalculator[] = [
  // === FINANCE ===
  {
    slug: "compound-interest-calculator",
    nameEn: "Compound Interest Calculator",
    nameEs: "Calculadora de Interés Compuesto",
    namePt: "Calculadora de Juros Compostos",
    category: "finance",
    icon: "📈",
  },
  {
    slug: "mortgage-calculator",
    nameEn: "Mortgage Calculator",
    nameEs: "Calculadora de Hipoteca",
    namePt: "Calculadora de Hipoteca",
    category: "finance",
    icon: "🏠",
  },
  {
    slug: "loan-calculator",
    nameEn: "Loan Calculator",
    nameEs: "Calculadora de Préstamos",
    namePt: "Calculadora de Empréstimos",
    category: "finance",
    icon: "💰",
  },
  {
    slug: "student-loan-calculator",
    nameEn: "Student Loan Calculator",
    nameEs: "Calculadora de Préstamos Estudiantiles",
    namePt: "Calculadora de Empréstimo Estudantil",
    category: "finance",
    icon: "🎓",
  },
  {
    slug: "auto-loan-calculator",
    nameEn: "Auto Loan Calculator",
    nameEs: "Calculadora de Préstamo de Auto",
    namePt: "Calculadora de Financiamento de Veículo",
    category: "finance",
    icon: "🚗",
  },
  {
    slug: "savings-calculator",
    nameEn: "Savings Calculator",
    nameEs: "Calculadora de Ahorros",
    namePt: "Calculadora de Poupança",
    category: "finance",
    icon: "🏦",
  },
  {
    slug: "retirement-calculator",
    nameEn: "Retirement Calculator",
    nameEs: "Calculadora de Jubilación",
    namePt: "Calculadora de Aposentadoria",
    category: "finance",
    icon: "👴",
  },
  {
    slug: "credit-card-payoff-calculator",
    nameEn: "Credit Card Payoff Calculator",
    nameEs: "Calculadora de Pago de Tarjeta de Crédito",
    namePt: "Calculadora de Quitação de Cartão de Crédito",
    category: "finance",
    icon: "💳",
  },
  {
    slug: "personal-loan-calculator",
    nameEn: "Personal Loan Calculator",
    nameEs: "Calculadora de Préstamo Personal",
    namePt: "Calculadora de Empréstimo Pessoal",
    category: "finance",
    icon: "💵",
  },
  {
    slug: "roth-ira-calculator",
    nameEn: "Roth IRA Calculator",
    nameEs: "Calculadora Roth IRA",
    namePt: "Calculadora Roth IRA",
    category: "finance",
    icon: "🏛️",
  },
  {
    slug: "budget-calculator",
    nameEn: "Budget Calculator",
    nameEs: "Calculadora de Presupuesto",
    namePt: "Calculadora de Orçamento",
    category: "finance",
    icon: "📊",
  },
  {
    slug: "investment-calculator",
    nameEn: "Investment Calculator",
    nameEs: "Calculadora de Inversiones",
    namePt: "Calculadora de Investimentos",
    category: "finance",
    icon: "📈",
  },
  {
    slug: "401k-calculator",
    nameEn: "401(k) Calculator",
    nameEs: "Calculadora 401(k)",
    namePt: "Calculadora 401(k)",
    category: "finance",
    icon: "🏦",
  },
  {
    slug: "paycheck-calculator",
    nameEn: "Paycheck Calculator",
    nameEs: "Calculadora de Nómina",
    namePt: "Calculadora de Salário",
    category: "finance",
    icon: "💵",
  },
  {
    slug: "profit-margin-calculator",
    nameEn: "Profit Margin Calculator",
    nameEs: "Calculadora de Margen de Ganancia",
    namePt: "Calculadora de Margem de Lucro",
    category: "finance",
    icon: "📊",
  },
  {
    slug: "income-tax-calculator",
    nameEn: "Income Tax Calculator",
    nameEs: "Calculadora de Impuestos",
    namePt: "Calculadora de Imposto de Renda",
    category: "finance",
    icon: "🧾",
  },
  
  {
    slug: "net-worth-calculator",
    nameEn: "Net Worth Calculator",
    nameEs: "Calculadora de Patrimonio Neto",
    namePt: "Calculadora de Patrimônio Líquido",
    category: "finance",
    icon: "💎",
  },
  {
    slug: "emergency-fund-calculator",
    nameEn: "Emergency Fund Calculator",
    nameEs: "Calculadora de Fondo de Emergencia",
    namePt: "Calculadora de Fundo de Emergência",
    category: "finance",
    icon: "🛡️",
  },
  {
    slug: "cd-calculator",
    nameEn: "CD Calculator",
    nameEs: "Calculadora de CD",
    namePt: "Calculadora de CDB",
    category: "finance",
    icon: "💿",
  },
  // === HEALTH ===
  {
    slug: "bmi-calculator",
    nameEn: "BMI Calculator",
    nameEs: "Calculadora de IMC",
    namePt: "Calculadora de IMC",
    category: "health",
    icon: "⚖️",
  },
  {
    slug: "calorie-calculator",
    nameEn: "Calorie Calculator",
    nameEs: "Calculadora de Calorías",
    namePt: "Calculadora de Calorias",
    category: "health",
    icon: "🍎",
  },
  {
    slug: "bmr-calculator",
    nameEn: "BMR Calculator",
    nameEs: "Calculadora de TMB",
    namePt: "Calculadora de TMB",
    category: "health",
    icon: "🔥",
  },
  {
    slug: "tdee-calculator",
    nameEn: "TDEE Calculator",
    nameEs: "Calculadora de Gasto Energético",
    namePt: "Calculadora de Gasto Energético",
    category: "health",
    icon: "⚡",
  },
  {
    slug: "body-fat-calculator",
    nameEn: "Body Fat Calculator",
    nameEs: "Calculadora de Grasa Corporal",
    namePt: "Calculadora de Gordura Corporal",
    category: "health",
    icon: "📏",
  },
  {
    slug: "macro-calculator",
    nameEn: "Macro Calculator",
    nameEs: "Calculadora de Macros",
    namePt: "Calculadora de Macros",
    category: "health",
    icon: "🥗",
  },
  {
    slug: "ideal-weight-calculator",
    nameEn: "Ideal Weight Calculator",
    nameEs: "Calculadora de Peso Ideal",
    namePt: "Calculadora de Peso Ideal",
    category: "health",
    icon: "⚖️",
  },
  {
    slug: "protein-calculator",
    nameEn: "Protein Calculator",
    nameEs: "Calculadora de Proteínas",
    namePt: "Calculadora de Proteínas",
    category: "health",
    icon: "🥩",
  },
  {
    slug: "water-intake-calculator",
    nameEn: "Water Intake Calculator",
    nameEs: "Calculadora de Consumo de Agua",
    namePt: "Calculadora de Consumo de Água",
    category: "health",
    icon: "💧",
  },
  {
    slug: "one-rep-max-calculator",
    nameEn: "One Rep Max Calculator",
    nameEs: "Calculadora de 1RM",
    namePt: "Calculadora de 1RM",
    category: "health",
    icon: "🏋️",
  },
  {
    slug: "sleep-calculator",
    nameEn: "Sleep Calculator",
    nameEs: "Calculadora de Sueño",
    namePt: "Calculadora de Sono",
    category: "health",
    icon: "😴",
  },
];

// Obtener solo los slugs válidos (para validación rápida)
export const VALID_CALCULATOR_SLUGS = VALID_CALCULATORS.map((c) => c.slug);

// Función para verificar si un slug es válido
export function isValidCalculator(slug: string | null | undefined): boolean {
  if (!slug) return false;
  return VALID_CALCULATOR_SLUGS.includes(slug);
}

// Función para obtener una calculadora por slug
export function getCalculatorBySlug(slug: string): ValidCalculator | undefined {
  return VALID_CALCULATORS.find((c) => c.slug === slug);
}

// Función para obtener el nombre según el locale
export function getCalculatorName(
  slug: string,
  locale: string
): string | undefined {
  const calc = getCalculatorBySlug(slug);
  if (!calc) return undefined;

  switch (locale) {
    case "es":
      return calc.nameEs;
    case "pt":
      return calc.namePt;
    default:
      return calc.nameEn;
  }
}

// Obtener calculadoras por categoría
export function getCalculatorsByCategory(
  category: "finance" | "health"
): ValidCalculator[] {
  return VALID_CALCULATORS.filter((c) => c.category === category);
}
