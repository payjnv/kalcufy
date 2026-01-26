// Calculator configuration for Kalcufy
// This file defines all available calculators

export interface Calculator {
  slug: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  category: string;
  isNew?: boolean;
  isPro?: boolean;
}

export interface CategoryStat {
  id: string;
  icon: string;
  color: string;
  count: number;
  status?: "active" | "coming-soon";
}

// Finance Calculators (20)
export const FINANCE_CALCULATORS: Calculator[] = [
  {
    slug: "compound-interest-calculator",
    name: "Compound Interest Calculator",
    description: "Calculate compound interest and see how your investments grow over time",
    icon: "💰",
    color: "blue",
    category: "finance",
    isNew: false,
    isPro: false,
  },
  {
    slug: "mortgage-calculator",
    name: "Mortgage Calculator",
    description: "Calculate monthly mortgage payments, total interest, and amortization schedule",
    icon: "🏠",
    color: "blue",
    category: "finance",
    isNew: false,
    isPro: false,
  },
  {
    slug: "loan-calculator",
    name: "Loan Calculator",
    description: "Calculate loan payments, total interest, and payoff schedule",
    icon: "💳",
    color: "blue",
    category: "finance",
    isNew: false,
    isPro: false,
  },
  {
    slug: "auto-loan-calculator",
    name: "Auto Loan Calculator",
    description: "Calculate car loan payments and total cost of financing",
    icon: "🚗",
    color: "blue",
    category: "finance",
    isNew: false,
    isPro: false,
  },
  {
    slug: "retirement-calculator",
    name: "Retirement Calculator",
    description: "Plan your retirement savings and estimate your retirement income",
    icon: "🏖️",
    color: "blue",
    category: "finance",
    isNew: false,
    isPro: false,
  },
  {
    slug: "savings-calculator",
    name: "Savings Calculator",
    description: "Calculate how your savings will grow with regular contributions",
    icon: "🐷",
    color: "blue",
    category: "finance",
    isNew: false,
    isPro: false,
  },
  {
    slug: "credit-card-payoff-calculator",
    name: "Credit Card Payoff Calculator",
    description: "Calculate how long it will take to pay off your credit card debt",
    icon: "💳",
    color: "blue",
    category: "finance",
    isNew: false,
    isPro: false,
  },
  {
    slug: "401k-calculator",
    name: "401(k) Calculator",
    description: "Plan your 401(k) retirement savings and employer match",
    icon: "📈",
    color: "blue",
    category: "finance",
    isNew: false,
    isPro: false,
  },
  {
    slug: "budget-calculator",
    name: "Budget Calculator",
    description: "Plan your personal finances and track spending",
    icon: "📊",
    color: "blue",
    category: "finance",
    isNew: false,
    isPro: false,
  },
  {
    slug: "income-tax-calculator",
    name: "Income Tax Calculator",
    description: "Estimate your federal and state income taxes",
    icon: "🧾",
    color: "blue",
    category: "finance",
    isNew: false,
    isPro: false,
  },
  {
    slug: "investment-calculator",
    name: "Investment Calculator",
    description: "Calculate investment growth over time with contributions",
    icon: "📈",
    color: "blue",
    category: "finance",
    isNew: false,
    isPro: false,
  },
  {
    slug: "paycheck-calculator",
    name: "Paycheck Calculator",
    description: "Calculate your take-home pay after taxes and deductions",
    icon: "💵",
    color: "blue",
    category: "finance",
    isNew: false,
    isPro: false,
  },
  {
    slug: "personal-loan-calculator",
    name: "Personal Loan Calculator",
    description: "Calculate personal loan payments and interest",
    icon: "🏦",
    color: "blue",
    category: "finance",
    isNew: false,
    isPro: false,
  },
  {
    slug: "profit-margin-calculator",
    name: "Profit Margin Calculator",
    description: "Calculate margin, markup, and selling price",
    icon: "💹",
    color: "blue",
    category: "finance",
    isNew: false,
    isPro: false,
  },
  {
    slug: "roth-ira-calculator",
    name: "Roth IRA Calculator",
    description: "Plan your Roth IRA retirement savings",
    icon: "🎯",
    color: "blue",
    category: "finance",
    isNew: false,
    isPro: false,
  },
  {
    slug: "student-loan-calculator",
    name: "Student Loan Calculator",
    description: "Calculate payments and explore repayment strategies",
    icon: "🎓",
    color: "blue",
    category: "finance",
    isNew: false,
    isPro: false,
  },
  {
    slug: "net-worth-calculator",
    name: "Net Worth Calculator",
    description: "Calculate your total net worth with assets vs liabilities and age-based benchmarks",
    icon: "💎",
    color: "blue",
    category: "finance",
    isNew: true,
    isPro: false,
  },
  {
    slug: "emergency-fund-calculator",
    name: "Emergency Fund Calculator",
    description: "Calculate how much you need for financial security based on your expenses",
    icon: "🛡️",
    color: "blue",
    category: "finance",
    isNew: true,
    isPro: false,
  },
  {
    slug: "cd-calculator",
    name: "CD Calculator",
    description: "Calculate Certificate of Deposit earnings, compare terms and compounding",
    icon: "💿",
    color: "blue",
    category: "finance",
    isNew: true,
    isPro: false,
  },
  {
    slug: "car-lease-calculator",
    name: "Lease Calculator",
    description: "Calculate car lease payments, total cost, and compare lease vs buy options",
    icon: "🚗",
    color: "blue",
    category: "finance",
    isNew: true,
    isPro: false,
  },
];

// Health Calculators (21)
export const HEALTH_CALCULATORS: Calculator[] = [
  {
    slug: "bmi-calculator",
    name: "BMI Calculator",
    description: "Calculate your Body Mass Index and health metrics",
    icon: "💪",
    color: "green",
    category: "health",
    isNew: false,
    isPro: false,
  },
  {
    slug: "calorie-calculator",
    name: "Calorie Calculator",
    description: "Calculate daily calorie needs based on your goals",
    icon: "🔥",
    color: "green",
    category: "health",
    isNew: false,
    isPro: false,
  },
  {
    slug: "bmr-calculator",
    name: "BMR Calculator",
    description: "Calculate your Basal Metabolic Rate and daily calorie needs",
    icon: "⚡",
    color: "green",
    category: "health",
    isNew: false,
    isPro: false,
  },
  {
    slug: "tdee-calculator",
    name: "TDEE Calculator",
    description: "Calculate your Total Daily Energy Expenditure and calorie needs",
    icon: "📊",
    color: "green",
    category: "health",
    isNew: false,
    isPro: false,
  },
  {
    slug: "body-fat-calculator",
    name: "Body Fat Calculator",
    description: "Calculate your body fat percentage using Navy, BMI, and Army methods",
    icon: "📐",
    color: "green",
    category: "health",
    isNew: false,
    isPro: false,
  },
  {
    slug: "macro-calculator",
    name: "Macro Calculator",
    description: "Calculate your daily protein, carbs, and fat targets with 6 diet presets",
    icon: "🥗",
    color: "green",
    category: "health",
    isNew: false,
    isPro: false,
  },
  {
    slug: "ideal-weight-calculator",
    name: "Ideal Weight Calculator",
    description: "Calculate your ideal body weight using 5 scientific formulas with frame size adjustment",
    icon: "⚖️",
    color: "green",
    category: "health",
    isNew: false,
    isPro: false,
  },
  {
    slug: "protein-calculator",
    name: "Protein Calculator",
    description: "Calculate your optimal daily protein intake based on goals",
    icon: "🥩",
    color: "green",
    category: "health",
    isNew: false,
    isPro: false,
  },
  {
    slug: "water-intake-calculator",
    name: "Water Intake Calculator",
    description: "Calculate how much water you should drink daily",
    icon: "💧",
    color: "green",
    category: "health",
    isNew: false,
    isPro: false,
  },
  {
    slug: "one-rep-max-calculator",
    name: "One Rep Max Calculator",
    description: "Estimate your 1RM using 7 scientific formulas",
    icon: "🏋️",
    color: "green",
    category: "health",
    isNew: false,
    isPro: false,
  },
  {
    slug: "sleep-calculator",
    name: "Sleep Calculator",
    description: "Find optimal bedtimes and wake times based on sleep cycles",
    icon: "😴",
    color: "green",
    category: "health",
    isNew: false,
    isPro: false,
  },
  {
    slug: "running-pace-calculator",
    name: "Running Pace Calculator",
    description: "Calculate pace, predict race times, generate splits, and get VDOT training zones",
    icon: "🏃",
    color: "green",
    category: "health",
    isNew: true,
    isPro: false,
  },
  {
    slug: "heart-rate-zones-calculator",
    name: "Heart Rate Zones Calculator",
    description: "Calculate personalized training zones using Karvonen formula",
    icon: "❤️",
    color: "green",
    category: "health",
    isNew: true,
    isPro: false,
  },
  {
    slug: "calories-burned-calculator",
    name: "Calories Burned Calculator",
    description: "Calculate calories burned for 100+ activities using MET values",
    icon: "🔥",
    color: "green",
    category: "health",
    isNew: false,
    isPro: false,
  },
  {
    slug: "pregnancy-calculator",
    name: "Pregnancy Calculator",
    description: "Calculate due date, conception date, and track pregnancy milestones",
    icon: "🤰",
    color: "green",
    category: "health",
    isNew: true,
    isPro: false,
  },
  {
    slug: "lean-body-mass-calculator",
    name: "Lean Body Mass Calculator",
    description: "Calculate lean body mass using 5 formulas with FFMI and protein targets",
    icon: "💪",
    color: "green",
    category: "health",
    isNew: true,
    isPro: false,
  },
  {
    slug: "maintenance-calories-calculator",
    name: "Maintenance Calories Calculator",
    description: "Calculate TDEE with 3 BMR formulas and macro breakdown per meal",
    icon: "⚖️",
    color: "green",
    category: "health",
    isNew: true,
    isPro: false,
  },
  {
    slug: "calorie-deficit-calculator",
    name: "Calorie Deficit Calculator",
    description: "Calculate weight loss calories with timeline, safety checks, and diet breaks",
    icon: "📉",
    color: "green",
    category: "health",
    isNew: true,
    isPro: false,
  },
  {
    slug: "calorie-surplus-calculator",
    name: "Calorie Surplus Calculator",
    description: "Calculate bulking calories with muscle vs fat gain estimates by training level",
    icon: "📈",
    color: "green",
    category: "health",
    isNew: true,
    isPro: false,
  },
  {
    slug: "weight-loss-calculator",
    name: "Weight Loss Calculator",
    description: "Calculate how long to reach your goal weight with daily calorie targets and timeline",
    icon: "⚖️",
    color: "green",
    category: "health",
    isNew: true,
    isPro: false,
  },
  {
    slug: "weight-gain-calculator",
    name: "Weight Gain Calculator",
    description: "Calculate bulking calories with muscle vs fat gain projection by training experience",
    icon: "📈",
    color: "green",
    category: "health",
    isNew: true,
    isPro: false,
  },
];

// Everyday Calculators (10)
export const EVERYDAY_CALCULATORS: Calculator[] = [
  {
    slug: "tip-calculator",
    name: "Tip Calculator",
    description: "Calculate tips for restaurants, delivery, and services with bill splitting",
    icon: "🧾",
    color: "purple",
    category: "everyday",
    isNew: true,
    isPro: false,
  },
  {
    slug: "discount-calculator",
    name: "Discount Calculator",
    description: "Calculate sale prices, savings, and stack multiple discounts",
    icon: "🏷️",
    color: "purple",
    category: "everyday",
    isNew: true,
    isPro: false,
  },
  {
    slug: "percentage-calculator",
    name: "Percentage Calculator",
    description: "Calculate percentages, increases, decreases, and conversions",
    icon: "📊",
    color: "purple",
    category: "everyday",
    isNew: true,
    isPro: false,
  },
  {
    slug: "age-calculator",
    name: "Age Calculator",
    description: "Calculate exact age with zodiac sign, generation, and milestones",
    icon: "🎂",
    color: "purple",
    category: "everyday",
    isNew: true,
    isPro: false,
  },
  {
    slug: "date-calculator",
    name: "Date Calculator",
    description: "Add days, calculate differences, and find business days",
    icon: "📅",
    color: "purple",
    category: "everyday",
    isNew: true,
    isPro: false,
  },
  {
    slug: "unit-converter",
    name: "Unit Converter",
    description: "Convert length, weight, temperature, volume, and more",
    icon: "📏",
    color: "purple",
    category: "everyday",
    isNew: true,
    isPro: false,
  },
  {
    slug: "fuel-cost-calculator",
    name: "Fuel Cost Calculator",
    description: "Calculate trip costs, annual expenses, and compare vehicles",
    icon: "⛽",
    color: "purple",
    category: "everyday",
    isNew: true,
    isPro: false,
  },
  {
    slug: "time-zone-calculator",
    name: "Time Zone Calculator",
    description: "Convert times, view world clocks, and plan international meetings",
    icon: "🌍",
    color: "purple",
    category: "everyday",
    isNew: true,
    isPro: false,
  },
  {
    slug: "gpa-calculator",
    name: "GPA Calculator",
    description: "Calculate semester, cumulative, and target GPA with honors",
    icon: "🎓",
    color: "purple",
    category: "everyday",
    isNew: true,
    isPro: false,
  },
  {
    slug: "random-number-generator",
    name: "Random Number Generator",
    description: "Generate random numbers, roll dice, flip coins, and create passwords",
    icon: "🎲",
    color: "purple",
    category: "everyday",
    isNew: true,
    isPro: false,
  },
];

// All calculators combined
export const ALL_CALCULATORS: Calculator[] = [
  ...FINANCE_CALCULATORS,
  ...HEALTH_CALCULATORS,
  ...EVERYDAY_CALCULATORS,
];

// Helper function to get calculator by slug
export function getCalculatorBySlug(slug: string): Calculator | undefined {
  return ALL_CALCULATORS.find((calc) => calc.slug === slug);
}

// Helper function to get calculators by category
export function getCalculatorsByCategory(category: "finance" | "health" | "everyday"): Calculator[] {
  return ALL_CALCULATORS.filter((calc) => calc.category === category);
}

// Helper function to get active calculators (for pages that need it)
export function getActiveCalculators(): Calculator[] {
  return ALL_CALCULATORS;
}

// Helper function to get total active calculators count
export function getTotalActiveCalculators(): number {
  return ALL_CALCULATORS.length;
}

// Helper function to get calculator count by category
export function getCalculatorCountByCategory(category: "finance" | "health" | "everyday"): number {
  return ALL_CALCULATORS.filter((calc) => calc.category === category).length;
}

// Helper function to get category stats (returns array for Home page)
export function getCategoryStats(): CategoryStat[] {
  return [
    {
      id: "finance",
      icon: "💰",
      color: "blue",
      count: FINANCE_CALCULATORS.length,
      status: "active",
    },
    {
      id: "health",
      icon: "💪",
      color: "emerald",
      count: HEALTH_CALCULATORS.length,
      status: "active",
    },
    {
      id: "everyday",
      icon: "🧮",
      color: "orange",
      count: EVERYDAY_CALCULATORS.length,
      status: "active",
    },
    {
      id: "math",
      icon: "🔢",
      color: "purple",
      count: 0,
      status: "coming-soon",
    },
  ];
}

// Helper function to convert slug to translation key (camelCase)
export function slugToTranslationKey(slug: string): string {
  // Remove -calculator or -generator suffix
  let key = slug
    .replace(/-calculator$/, "")
    .replace(/-generator$/, "");
  
  // Convert to camelCase: "compound-interest" -> "compoundInterest"
  key = key.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
  
  // Special cases
  const specialCases: Record<string, string> = {
    "creditCardPayoff": "creditCard",
    "oneRepMax": "oneRepMax",
    "randomNumber": "randomNumberGenerator",
  };
  
  return specialCases[key] || key;
}

// Calculator counts
export const CALCULATOR_COUNTS = {
  total: ALL_CALCULATORS.length,
  finance: FINANCE_CALCULATORS.length,
  health: HEALTH_CALCULATORS.length,
  everyday: EVERYDAY_CALCULATORS.length,
};
