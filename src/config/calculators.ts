export type Calculator = {
  name: string;
  slug: string;
  category: "finance" | "health";
  description: string;
  popular?: boolean;
};

// Add new calculators here - they will appear automatically on the calculators page
export const calculators: Calculator[] = [
  // Finance
  { name: "Compound Interest", slug: "compound-interest-calculator", category: "finance", description: "Calculate how your money grows over time", popular: true },
  { name: "Mortgage", slug: "mortgage-calculator", category: "finance", description: "Calculate monthly mortgage payments", popular: true },
  { name: "Loan", slug: "loan-calculator", category: "finance", description: "Calculate loan payments and interest", popular: true },
  { name: "Auto Loan", slug: "auto-loan-calculator", category: "finance", description: "Calculate car loan payments" },
  { name: "Retirement", slug: "retirement-calculator", category: "finance", description: "Plan your retirement savings" },
  { name: "Savings", slug: "savings-calculator", category: "finance", description: "Plan your savings goals" },
  { name: "Credit Card Payoff", slug: "credit-card-payoff-calculator", category: "finance", description: "Calculate credit card payoff time" },
  
  // Health
  { name: "BMI", slug: "bmi-calculator", category: "health", description: "Calculate your Body Mass Index", popular: true },
  { name: "Calorie", slug: "calorie-calculator", category: "health", description: "Calculate daily calorie needs", popular: true },
];

// Helper functions
export const getCalculatorsByCategory = (category: "finance" | "health") => 
  calculators.filter(c => c.category === category);

export const getPopularCalculators = () => 
  calculators.filter(c => c.popular);

export const getFinanceCalculators = () => getCalculatorsByCategory("finance");
export const getHealthCalculators = () => getCalculatorsByCategory("health");

export const getCategoryCount = () => ({
  all: calculators.length,
  finance: getFinanceCalculators().length,
  health: getHealthCalculators().length,
});
