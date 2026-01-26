// Calculator configuration for Kalcufy
// This file defines all available calculators

export interface Calculator {
  slug: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  category: "finance" | "health";
  isNew?: boolean;
  isPro?: boolean;
}

// Finance Calculators
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
    slug: "car-lease-calculator",
    name: "Car Lease Calculator",
    description: "Calculate monthly lease payments, residual value, and total cost",
    icon: "🚙",
    color: "blue",
    category: "finance",
    isNew: true,
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

];

// Health Calculators
export const HEALTH_CALCULATORS: Calculator[] = [
  {
    slug: "bmi-calculator",
    name: "BMI Calculator",
    description: "Calculate your Body Mass Index and health metrics",
    icon: "💪",
    color: "blue",
    category: "health",
    isNew: false,
    isPro: false,
  },
  {
    slug: "calorie-calculator",
    name: "Calorie Calculator",
    description: "Calculate daily calorie needs based on your goals",
    icon: "🔥",
    color: "blue",
    category: "health",
    isNew: false,
    isPro: false,
  },
  {
    slug: "bmr-calculator",
    name: "BMR Calculator",
    description: "Calculate your Basal Metabolic Rate and daily calorie needs",
    icon: "⚡",
    color: "blue",
    category: "health",
    isNew: false,
    isPro: false,
  },
  {
    slug: "tdee-calculator",
    name: "TDEE Calculator",
    description: "Calculate your Total Daily Energy Expenditure and calorie needs",
    icon: "📊",
    color: "blue",
    category: "health",
    isNew: false,
    isPro: false,
  },
  {
    slug: "body-fat-calculator",
    name: "Body Fat Calculator",
    description: "Calculate your body fat percentage using Navy, BMI, and Army methods",
    icon: "📐",
    color: "blue",
    category: "health",
    isNew: false,
    isPro: false,
  },
  {
    slug: "macro-calculator",
    name: "Macro Calculator",
    description: "Calculate your daily protein, carbs, and fat targets with 6 diet presets",
    icon: "🥗",
    color: "blue",
    category: "health",
    isNew: false,
    isPro: false,
  },
  {
    slug: "ideal-weight-calculator",
    name: "Ideal Weight Calculator",
    description: "Calculate your ideal body weight using 5 scientific formulas with frame size adjustment",
    icon: "⚖️",
    color: "blue",
    category: "health",
    isNew: false,
    isPro: false,
  },
  {
    slug: "protein-calculator",
    name: "Protein Calculator",
    description: "Calculate your optimal daily protein intake based on goals",
    icon: "🥩",
    color: "blue",
    category: "health",
    isNew: false,
    isPro: false,
  },
  {
    slug: "water-intake-calculator",
    name: "Water Intake Calculator",
    description: "Calculate how much water you should drink daily",
    icon: "💧",
    color: "blue",
    category: "health",
    isNew: false,
    isPro: false,
  },
  {
    slug: "one-rep-max-calculator",
    name: "One Rep Max Calculator",
    description: "Estimate your 1RM using 7 scientific formulas",
    icon: "🏋️",
    color: "blue",
    category: "health",
    isNew: false,
    isPro: false,
  },
  {
    slug: "sleep-calculator",
    name: "Sleep Calculator",
    description: "Find optimal bedtimes and wake times based on sleep cycles",
    icon: "😴",
    color: "blue",
    category: "health",
    isNew: false,
    isPro: false,
  },
  {
    slug: "running-pace-calculator",
    name: "Running Pace Calculator",
    description: "Calculate pace, predict race times, generate splits, and get VDOT training zones",
    icon: "🏃",
    color: "blue",
    category: "health",
    isNew: true,
    isPro: false,
  },
  {
    slug: "heart-rate-zones-calculator",
    name: "Heart Rate Zones Calculator",
    description: "Calculate personalized training zones using Karvonen formula",
    icon: "❤️",
    color: "blue",
    category: "health",
    isNew: true,
    isPro: false,
  },
];

// All calculators combined
export const ALL_CALCULATORS: Calculator[] = [
  ...FINANCE_CALCULATORS,
  ...HEALTH_CALCULATORS,
];

// Helper function to get calculator by slug
export function getCalculatorBySlug(slug: string): Calculator | undefined {
  return ALL_CALCULATORS.find((calc) => calc.slug === slug);
}

// Helper function to get calculators by category
export function getCalculatorsByCategory(category: "finance" | "health"): Calculator[] {
  return ALL_CALCULATORS.filter((calc) => calc.category === category);
}

// Calculator counts
export const CALCULATOR_COUNTS = {
  total: ALL_CALCULATORS.length,
  finance: FINANCE_CALCULATORS.length,
  health: HEALTH_CALCULATORS.length,
};
