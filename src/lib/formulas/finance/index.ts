/**
 * Finance Formulas Library
 * Contains all calculation formulas for finance-related calculators
 */

// ============================================================================
// TYPES
// ============================================================================

export type CompoundingFrequency = 'annually' | 'semiannually' | 'quarterly' | 'monthly' | 'daily';
export type PaymentFrequency = 'monthly' | 'biweekly' | 'weekly';

// ============================================================================
// COMPOUND INTEREST
// ============================================================================

/**
 * Compounding frequency to periods per year
 */
const COMPOUNDING_PERIODS: Record<CompoundingFrequency, number> = {
  annually: 1,
  semiannually: 2,
  quarterly: 4,
  monthly: 12,
  daily: 365,
};

/**
 * Calculate compound interest
 * A = P(1 + r/n)^(nt)
 * Where:
 * - A = final amount
 * - P = principal
 * - r = annual interest rate (decimal)
 * - n = compounding frequency
 * - t = time in years
 */
export function calculateCompoundInterest(
  principal: number,
  annualRate: number, // as percentage (e.g., 5 for 5%)
  years: number,
  compounding: CompoundingFrequency = 'annually'
): {
  finalAmount: number;
  totalInterest: number;
  effectiveRate: number;
} {
  const r = annualRate / 100;
  const n = COMPOUNDING_PERIODS[compounding];
  const t = years;
  
  // A = P(1 + r/n)^(nt)
  const finalAmount = principal * Math.pow(1 + r / n, n * t);
  const totalInterest = finalAmount - principal;
  
  // Effective annual rate: (1 + r/n)^n - 1
  const effectiveRate = (Math.pow(1 + r / n, n) - 1) * 100;
  
  return {
    finalAmount,
    totalInterest,
    effectiveRate,
  };
}

/**
 * Calculate compound interest with regular contributions
 * FV = P(1 + r/n)^(nt) + PMT × [((1 + r/n)^(nt) - 1) / (r/n)]
 */
export function calculateCompoundInterestWithContributions(
  principal: number,
  monthlyContribution: number,
  annualRate: number,
  years: number,
  compounding: CompoundingFrequency = 'monthly',
  contributionTiming: 'beginning' | 'end' = 'end'
): {
  finalAmount: number;
  totalContributions: number;
  totalInterest: number;
  principalGrowth: number;
} {
  const r = annualRate / 100;
  const n = COMPOUNDING_PERIODS[compounding];
  const t = years;
  
  // Calculate principal growth
  const principalGrowth = principal * Math.pow(1 + r / n, n * t);
  
  // Convert monthly contribution to match compounding frequency
  const contributionPerPeriod = monthlyContribution * (12 / n);
  const totalPeriods = n * t;
  const periodicRate = r / n;
  
  // Future value of annuity
  let contributionsGrowth: number;
  
  if (periodicRate === 0) {
    contributionsGrowth = contributionPerPeriod * totalPeriods;
  } else {
    contributionsGrowth =
      contributionPerPeriod *
      ((Math.pow(1 + periodicRate, totalPeriods) - 1) / periodicRate);
    
    // Adjust for beginning of period contributions
    if (contributionTiming === 'beginning') {
      contributionsGrowth *= 1 + periodicRate;
    }
  }
  
  const finalAmount = principalGrowth + contributionsGrowth;
  const totalContributions = monthlyContribution * 12 * years;
  const totalInterest = finalAmount - principal - totalContributions;
  
  return {
    finalAmount,
    totalContributions,
    totalInterest,
    principalGrowth,
  };
}

/**
 * Generate year-by-year compound interest breakdown
 */
export function generateCompoundInterestSchedule(
  principal: number,
  monthlyContribution: number,
  annualRate: number,
  years: number
): Array<{
  year: number;
  startBalance: number;
  contributions: number;
  interest: number;
  endBalance: number;
}> {
  const schedule = [];
  let balance = principal;
  const rate = annualRate / 100;
  
  for (let year = 1; year <= years; year++) {
    const startBalance = balance;
    const yearlyContributions = monthlyContribution * 12;
    
    // Calculate interest (monthly compounding with contributions)
    let yearEndBalance = startBalance;
    for (let month = 1; month <= 12; month++) {
      yearEndBalance += monthlyContribution;
      yearEndBalance *= 1 + rate / 12;
    }
    
    const interest = yearEndBalance - startBalance - yearlyContributions;
    
    schedule.push({
      year,
      startBalance,
      contributions: yearlyContributions,
      interest,
      endBalance: yearEndBalance,
    });
    
    balance = yearEndBalance;
  }
  
  return schedule;
}

// ============================================================================
// LOAN CALCULATIONS
// ============================================================================

/**
 * Calculate loan/mortgage payment
 * PMT = P × [r(1+r)^n] / [(1+r)^n - 1]
 */
export function calculateLoanPayment(
  principal: number,
  annualRate: number, // as percentage
  termMonths: number
): number {
  const r = annualRate / 100 / 12; // Monthly rate
  const n = termMonths;
  
  if (r === 0) {
    return principal / n;
  }
  
  return principal * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

/**
 * Calculate loan details
 */
export function calculateLoanDetails(
  principal: number,
  annualRate: number,
  termMonths: number,
  extraPayment: number = 0
): {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  payoffMonths: number;
  interestSaved: number;
} {
  const monthlyPayment = calculateLoanPayment(principal, annualRate, termMonths);
  const totalPayment = monthlyPayment * termMonths;
  const totalInterest = totalPayment - principal;
  
  // Calculate with extra payment
  let payoffMonths = termMonths;
  let interestSaved = 0;
  
  if (extraPayment > 0) {
    const result = generateAmortizationSchedule(
      principal,
      annualRate,
      termMonths,
      extraPayment
    );
    payoffMonths = result.length;
    const newTotalInterest = result.reduce((sum, row) => sum + row.interest, 0);
    interestSaved = totalInterest - newTotalInterest;
  }
  
  return {
    monthlyPayment,
    totalPayment,
    totalInterest,
    payoffMonths,
    interestSaved,
  };
}

/**
 * Generate amortization schedule
 */
export function generateAmortizationSchedule(
  principal: number,
  annualRate: number,
  termMonths: number,
  extraPayment: number = 0
): Array<{
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
  totalPrincipal: number;
  totalInterest: number;
}> {
  const schedule = [];
  const monthlyRate = annualRate / 100 / 12;
  const basePayment = calculateLoanPayment(principal, annualRate, termMonths);
  let balance = principal;
  let totalPrincipal = 0;
  let totalInterest = 0;
  let month = 0;
  
  while (balance > 0.01 && month < termMonths * 2) {
    // Safety limit
    month++;
    
    const interest = balance * monthlyRate;
    let payment = basePayment + extraPayment;
    
    // Last payment adjustment
    if (balance + interest < payment) {
      payment = balance + interest;
    }
    
    const principalPaid = payment - interest;
    balance -= principalPaid;
    
    totalPrincipal += principalPaid;
    totalInterest += interest;
    
    schedule.push({
      month,
      payment,
      principal: principalPaid,
      interest,
      balance: Math.max(0, balance),
      totalPrincipal,
      totalInterest,
    });
    
    if (balance <= 0) break;
  }
  
  return schedule;
}

// ============================================================================
// MORTGAGE CALCULATIONS
// ============================================================================

export interface MortgageResults {
  monthlyPayment: number;
  monthlyPrincipalInterest: number;
  monthlyTax: number;
  monthlyInsurance: number;
  monthlyPMI: number;
  totalPayment: number;
  totalInterest: number;
  totalTax: number;
  totalInsurance: number;
  totalPMI: number;
}

/**
 * Calculate mortgage with taxes, insurance, and PMI
 */
export function calculateMortgage(
  homePrice: number,
  downPayment: number,
  annualRate: number,
  termYears: number,
  propertyTaxRate: number = 1.2, // Annual percentage of home value
  annualInsurance: number = 1200,
  pmiRate: number = 0.5 // Annual percentage if down payment < 20%
): MortgageResults {
  const loanAmount = homePrice - downPayment;
  const termMonths = termYears * 12;
  const downPaymentPercent = (downPayment / homePrice) * 100;
  
  // Principal and interest
  const monthlyPrincipalInterest = calculateLoanPayment(
    loanAmount,
    annualRate,
    termMonths
  );
  
  // Property tax
  const monthlyTax = (homePrice * (propertyTaxRate / 100)) / 12;
  
  // Insurance
  const monthlyInsurance = annualInsurance / 12;
  
  // PMI (if down payment < 20%)
  const monthlyPMI = downPaymentPercent < 20 ? (loanAmount * (pmiRate / 100)) / 12 : 0;
  
  const monthlyPayment =
    monthlyPrincipalInterest + monthlyTax + monthlyInsurance + monthlyPMI;
  
  // PMI typically drops off at 20% equity, estimate ~10 years average
  const pmiMonths = downPaymentPercent < 20 ? Math.min(120, termMonths) : 0;
  
  return {
    monthlyPayment,
    monthlyPrincipalInterest,
    monthlyTax,
    monthlyInsurance,
    monthlyPMI,
    totalPayment: monthlyPrincipalInterest * termMonths + monthlyTax * termMonths + monthlyInsurance * termMonths + monthlyPMI * pmiMonths,
    totalInterest: monthlyPrincipalInterest * termMonths - loanAmount,
    totalTax: monthlyTax * termMonths,
    totalInsurance: monthlyInsurance * termMonths,
    totalPMI: monthlyPMI * pmiMonths,
  };
}

/**
 * Calculate how much house you can afford
 */
export function calculateAffordability(
  monthlyIncome: number,
  monthlyDebts: number,
  downPayment: number,
  annualRate: number,
  termYears: number,
  maxDTI: number = 36 // Maximum debt-to-income ratio
): {
  maxHomePrice: number;
  maxLoanAmount: number;
  maxMonthlyPayment: number;
} {
  // Maximum monthly housing payment based on DTI
  const maxTotalDebt = monthlyIncome * (maxDTI / 100);
  const maxMonthlyPayment = maxTotalDebt - monthlyDebts;
  
  if (maxMonthlyPayment <= 0) {
    return {
      maxHomePrice: downPayment,
      maxLoanAmount: 0,
      maxMonthlyPayment: 0,
    };
  }
  
  // Work backwards from payment to loan amount
  // PMT = P × [r(1+r)^n] / [(1+r)^n - 1]
  // P = PMT × [(1+r)^n - 1] / [r(1+r)^n]
  const monthlyRate = annualRate / 100 / 12;
  const n = termYears * 12;
  
  let maxLoanAmount: number;
  if (monthlyRate === 0) {
    maxLoanAmount = maxMonthlyPayment * n;
  } else {
    const factor = Math.pow(1 + monthlyRate, n);
    maxLoanAmount = maxMonthlyPayment * ((factor - 1) / (monthlyRate * factor));
  }
  
  const maxHomePrice = maxLoanAmount + downPayment;
  
  return {
    maxHomePrice,
    maxLoanAmount,
    maxMonthlyPayment,
  };
}

// ============================================================================
// AUTO LOAN
// ============================================================================

export interface AutoLoanResults {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  totalCost: number; // Including fees and taxes
}

/**
 * Calculate auto loan
 */
export function calculateAutoLoan(
  vehiclePrice: number,
  downPayment: number,
  tradeInValue: number,
  annualRate: number,
  termMonths: number,
  salesTaxRate: number = 0,
  fees: number = 0
): AutoLoanResults {
  const taxableAmount = vehiclePrice - tradeInValue;
  const salesTax = taxableAmount * (salesTaxRate / 100);
  const totalPrice = vehiclePrice + salesTax + fees;
  const loanAmount = totalPrice - downPayment - tradeInValue;
  
  const monthlyPayment = calculateLoanPayment(loanAmount, annualRate, termMonths);
  const totalPayment = monthlyPayment * termMonths;
  const totalInterest = totalPayment - loanAmount;
  
  return {
    monthlyPayment,
    totalPayment,
    totalInterest,
    totalCost: totalPayment + downPayment + tradeInValue,
  };
}

// ============================================================================
// SAVINGS & RETIREMENT
// ============================================================================

/**
 * Calculate savings goal timeline
 */
export function calculateSavingsGoal(
  currentSavings: number,
  targetAmount: number,
  monthlyContribution: number,
  annualRate: number
): {
  monthsToGoal: number;
  totalContributions: number;
  totalInterest: number;
} {
  const monthlyRate = annualRate / 100 / 12;
  let balance = currentSavings;
  let months = 0;
  const maxMonths = 1200; // 100 years limit
  
  while (balance < targetAmount && months < maxMonths) {
    months++;
    balance += monthlyContribution;
    balance *= 1 + monthlyRate;
  }
  
  const totalContributions = monthlyContribution * months;
  const totalInterest = balance - currentSavings - totalContributions;
  
  return {
    monthsToGoal: months,
    totalContributions,
    totalInterest,
  };
}

/**
 * Calculate retirement savings
 */
export function calculateRetirement(
  currentAge: number,
  retirementAge: number,
  currentSavings: number,
  monthlyContribution: number,
  annualReturn: number,
  employerMatch: number = 0, // percentage
  employerMatchLimit: number = 0 // percentage of salary
): {
  retirementSavings: number;
  totalContributions: number;
  employerContributions: number;
  investmentGrowth: number;
} {
  const yearsToRetirement = retirementAge - currentAge;
  const monthsToRetirement = yearsToRetirement * 12;
  const monthlyRate = annualReturn / 100 / 12;
  
  // Calculate employer match per month
  const monthlyEmployerMatch =
    employerMatch > 0 ? monthlyContribution * (employerMatch / 100) : 0;
  const totalMonthlyContribution = monthlyContribution + monthlyEmployerMatch;
  
  let balance = currentSavings;
  
  for (let month = 0; month < monthsToRetirement; month++) {
    balance += totalMonthlyContribution;
    balance *= 1 + monthlyRate;
  }
  
  const totalContributions = monthlyContribution * monthsToRetirement;
  const employerContributions = monthlyEmployerMatch * monthsToRetirement;
  const investmentGrowth =
    balance - currentSavings - totalContributions - employerContributions;
  
  return {
    retirementSavings: balance,
    totalContributions,
    employerContributions,
    investmentGrowth,
  };
}

/**
 * Calculate retirement withdrawal (4% rule and variations)
 */
export function calculateRetirementIncome(
  retirementSavings: number,
  withdrawalRate: number = 4, // Safe withdrawal rate
  inflationRate: number = 2.5,
  years: number = 30
): {
  annualIncome: number;
  monthlyIncome: number;
  inflationAdjustedYears: Array<{ year: number; amount: number }>;
} {
  const annualIncome = retirementSavings * (withdrawalRate / 100);
  const monthlyIncome = annualIncome / 12;
  
  const inflationAdjustedYears = [];
  let adjustedAmount = annualIncome;
  
  for (let year = 1; year <= years; year++) {
    inflationAdjustedYears.push({
      year,
      amount: adjustedAmount,
    });
    adjustedAmount *= 1 + inflationRate / 100;
  }
  
  return {
    annualIncome,
    monthlyIncome,
    inflationAdjustedYears,
  };
}

// ============================================================================
// CREDIT CARD PAYOFF
// ============================================================================

/**
 * Calculate credit card payoff
 */
export function calculateCreditCardPayoff(
  balance: number,
  annualRate: number,
  monthlyPayment: number
): {
  monthsToPayoff: number;
  totalPayment: number;
  totalInterest: number;
  payoffDate: Date;
} {
  const monthlyRate = annualRate / 100 / 12;
  let currentBalance = balance;
  let months = 0;
  let totalInterest = 0;
  const maxMonths = 600; // 50 years limit
  
  // Minimum payment check
  const minPayment = currentBalance * monthlyRate;
  if (monthlyPayment <= minPayment) {
    return {
      monthsToPayoff: -1, // Never pays off
      totalPayment: -1,
      totalInterest: -1,
      payoffDate: new Date('2999-12-31'),
    };
  }
  
  while (currentBalance > 0.01 && months < maxMonths) {
    months++;
    const interest = currentBalance * monthlyRate;
    totalInterest += interest;
    
    const payment = Math.min(monthlyPayment, currentBalance + interest);
    currentBalance = currentBalance + interest - payment;
  }
  
  const totalPayment = balance + totalInterest;
  const payoffDate = new Date();
  payoffDate.setMonth(payoffDate.getMonth() + months);
  
  return {
    monthsToPayoff: months,
    totalPayment,
    totalInterest,
    payoffDate,
  };
}

/**
 * Calculate minimum payment to payoff in specified time
 */
export function calculateMinPaymentForPayoff(
  balance: number,
  annualRate: number,
  targetMonths: number
): number {
  const monthlyRate = annualRate / 100 / 12;
  
  if (monthlyRate === 0) {
    return balance / targetMonths;
  }
  
  // PMT = P × [r(1+r)^n] / [(1+r)^n - 1]
  const factor = Math.pow(1 + monthlyRate, targetMonths);
  return balance * (monthlyRate * factor) / (factor - 1);
}

// ============================================================================
// INVESTMENT CALCULATIONS
// ============================================================================

/**
 * Calculate ROI (Return on Investment)
 */
export function calculateROI(
  initialInvestment: number,
  finalValue: number
): {
  roi: number;
  profit: number;
} {
  const profit = finalValue - initialInvestment;
  const roi = (profit / initialInvestment) * 100;
  
  return { roi, profit };
}

/**
 * Calculate CAGR (Compound Annual Growth Rate)
 */
export function calculateCAGR(
  initialValue: number,
  finalValue: number,
  years: number
): number {
  return (Math.pow(finalValue / initialValue, 1 / years) - 1) * 100;
}

/**
 * Calculate present value
 */
export function calculatePresentValue(
  futureValue: number,
  annualRate: number,
  years: number
): number {
  const rate = annualRate / 100;
  return futureValue / Math.pow(1 + rate, years);
}

/**
 * Calculate future value
 */
export function calculateFutureValue(
  presentValue: number,
  annualRate: number,
  years: number
): number {
  const rate = annualRate / 100;
  return presentValue * Math.pow(1 + rate, years);
}

// ============================================================================
// INFLATION CALCULATOR
// ============================================================================

/**
 * Calculate inflation-adjusted value
 */
export function calculateInflationAdjusted(
  amount: number,
  inflationRate: number,
  years: number,
  direction: 'future' | 'past' = 'future'
): number {
  const rate = inflationRate / 100;
  
  if (direction === 'future') {
    // Purchasing power in future
    return amount / Math.pow(1 + rate, years);
  } else {
    // Past value in today's dollars
    return amount * Math.pow(1 + rate, years);
  }
}

// ============================================================================
// DEBT PAYOFF STRATEGIES
// ============================================================================

export interface DebtInfo {
  name: string;
  balance: number;
  rate: number;
  minPayment: number;
}

/**
 * Calculate debt avalanche (highest interest first)
 */
export function calculateDebtAvalanche(
  debts: DebtInfo[],
  extraPayment: number
): Array<{
  debt: DebtInfo;
  monthsToPayoff: number;
  totalInterest: number;
  order: number;
}> {
  // Sort by interest rate (highest first)
  const sorted = [...debts].sort((a, b) => b.rate - a.rate);
  
  return sorted.map((debt, index) => {
    const result = calculateCreditCardPayoff(
      debt.balance,
      debt.rate,
      debt.minPayment + (index === 0 ? extraPayment : 0)
    );
    
    return {
      debt,
      monthsToPayoff: result.monthsToPayoff,
      totalInterest: result.totalInterest,
      order: index + 1,
    };
  });
}

/**
 * Calculate debt snowball (lowest balance first)
 */
export function calculateDebtSnowball(
  debts: DebtInfo[],
  extraPayment: number
): Array<{
  debt: DebtInfo;
  monthsToPayoff: number;
  totalInterest: number;
  order: number;
}> {
  // Sort by balance (lowest first)
  const sorted = [...debts].sort((a, b) => a.balance - b.balance);
  
  return sorted.map((debt, index) => {
    const result = calculateCreditCardPayoff(
      debt.balance,
      debt.rate,
      debt.minPayment + (index === 0 ? extraPayment : 0)
    );
    
    return {
      debt,
      monthsToPayoff: result.monthsToPayoff,
      totalInterest: result.totalInterest,
      order: index + 1,
    };
  });
}

// ============================================================================
// EXPORTS
// ============================================================================

export { COMPOUNDING_PERIODS };
