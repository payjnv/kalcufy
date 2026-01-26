/**
 * Compound Interest Calculator Configuration
 * Config-driven calculator for calculating compound interest with regular contributions
 */

import type { CalculatorConfig, CalculatorData, CalculatorResults } from '@/types/calculator.types';
import { 
  calculateCompoundInterestWithContributions,
  generateCompoundInterestSchedule,
  type CompoundingFrequency 
} from '@/lib/formulas/finance';
import { formatCurrency, formatPercentage, formatTimePeriod } from '@/lib/utils/formatting';

// ============================================================================
// CALCULATOR CONFIGURATION
// ============================================================================

export const compoundInterestConfig: CalculatorConfig = {
  id: 'compound-interest-calculator',
  slug: 'compound-interest-calculator',
  category: 'finance',
  icon: '📈',
  
  // SEO Configuration
  seo: {
    title: 'Compound Interest Calculator',
    description: 'Calculate compound interest with regular contributions. See how your investments grow over time with our free compound interest calculator. Includes charts and amortization schedule.',
    keywords: ['compound interest', 'investment calculator', 'savings calculator', 'interest rate', 'future value', 'compound growth'],
  },
  
  // Badges
  badges: ['popular'],
  
  // Input Fields Configuration
  inputs: [
    {
      id: 'principal',
      type: 'currency',
      label: 'Initial Investment',
      required: true,
      defaultValue: 10000,
      min: 0,
      max: 1000000000,
      step: 100,
      placeholder: 'Enter initial amount',
      helpText: 'The amount you start with',
      prefix: '$',
      width: 'full',
      validation: {
        rules: ['nonNegative', 'currency'],
        messages: {
          required: 'Please enter an initial investment amount',
        },
      },
    },
    {
      id: 'monthlyContribution',
      type: 'currency',
      label: 'Monthly Contribution',
      required: false,
      defaultValue: 500,
      min: 0,
      max: 100000,
      step: 50,
      placeholder: 'Monthly deposit',
      helpText: 'Additional amount added each month',
      prefix: '$',
      width: 'half',
      validation: {
        rules: ['nonNegative'],
      },
    },
    {
      id: 'annualRate',
      type: 'percentage',
      label: 'Annual Interest Rate',
      required: true,
      defaultValue: 7,
      min: 0,
      max: 50,
      step: 0.1,
      placeholder: 'Enter rate',
      helpText: 'Expected annual return',
      suffix: '%',
      width: 'half',
      validation: {
        rules: ['nonNegative', 'interestRate'],
        messages: {
          required: 'Please enter an interest rate',
          max: 'Interest rate cannot exceed 50%',
        },
      },
    },
    {
      id: 'years',
      type: 'number',
      label: 'Investment Period',
      required: true,
      defaultValue: 10,
      min: 1,
      max: 50,
      step: 1,
      placeholder: 'Number of years',
      helpText: 'How long you plan to invest',
      suffix: 'years',
      width: 'half',
      validation: {
        rules: ['positive', 'integer'],
        messages: {
          required: 'Please enter investment period',
          min: 'Period must be at least 1 year',
          max: 'Period cannot exceed 50 years',
        },
      },
    },
    {
      id: 'compounding',
      type: 'select',
      label: 'Compounding Frequency',
      required: true,
      defaultValue: 'monthly',
      options: [
        { value: 'annually', label: 'Annually (1x/year)' },
        { value: 'semiannually', label: 'Semi-annually (2x/year)' },
        { value: 'quarterly', label: 'Quarterly (4x/year)' },
        { value: 'monthly', label: 'Monthly (12x/year)' },
        { value: 'daily', label: 'Daily (365x/year)' },
      ],
      helpText: 'How often interest is calculated',
      width: 'half',
    },
    {
      id: 'contributionTiming',
      type: 'radio',
      label: 'Contribution Timing',
      required: false,
      defaultValue: 'end',
      options: [
        { value: 'end', label: 'End of period' },
        { value: 'beginning', label: 'Beginning of period' },
      ],
      helpText: 'When contributions are added',
      width: 'full',
      group: 'advanced',
    },
  ],
  
  // Input Groups
  inputGroups: [
    {
      id: 'advanced',
      label: 'Advanced Options',
      collapsible: true,
      defaultExpanded: false,
    },
  ],
  
  // Result Fields Configuration
  results: [
    {
      id: 'finalAmount',
      type: 'primary',
      label: 'Future Value',
      format: 'currency',
      decimals: 2,
      icon: '💰',
      colorCategory: 'success',
      description: 'Total value at end of investment period',
    },
    {
      id: 'totalInterest',
      type: 'secondary',
      label: 'Total Interest Earned',
      format: 'currency',
      decimals: 2,
      icon: '📈',
      colorCategory: 'info',
      description: 'Interest earned from compound growth',
    },
    {
      id: 'totalContributions',
      type: 'secondary',
      label: 'Total Contributions',
      format: 'currency',
      decimals: 2,
      description: 'Principal + all monthly contributions',
    },
    {
      id: 'effectiveRate',
      type: 'secondary',
      label: 'Effective Annual Rate',
      format: 'percentage',
      decimals: 2,
      description: 'Actual annual return with compounding',
    },
    {
      id: 'totalReturn',
      type: 'badge',
      label: 'Total Return',
      format: 'percentage',
      decimals: 1,
      colorCategory: 'success',
    },
    {
      id: 'interestRatio',
      type: 'secondary',
      label: 'Interest vs Principal',
      format: 'percentage',
      decimals: 1,
      description: 'Percentage of final value from interest',
    },
  ],
  
  // Educational Content
  education: {
    title: 'Understanding Compound Interest',
    sections: [
      {
        title: 'What is Compound Interest?',
        content: 'Compound interest is interest calculated on both the initial principal and the accumulated interest from previous periods. Unlike simple interest, compound interest accelerates wealth growth because you earn interest on your interest.',
      },
      {
        title: 'The Power of Compounding',
        content: 'Albert Einstein allegedly called compound interest "the eighth wonder of the world." The longer your money compounds, the faster it grows. Starting early, even with smaller amounts, can result in significantly more wealth than starting later with larger amounts.',
      },
      {
        title: 'The Formula',
        content: 'A = P(1 + r/n)^(nt), where A = final amount, P = principal, r = annual interest rate, n = number of times compounded per year, and t = number of years. With regular contributions, the formula becomes more complex but the principle remains the same.',
      },
      {
        title: 'Compounding Frequency',
        content: 'More frequent compounding (monthly vs. annually) results in slightly higher returns. Daily compounding gives the maximum benefit, but the difference between monthly and daily compounding is minimal for most practical purposes.',
      },
    ],
  },
  
  // FAQ Section
  faqs: [
    {
      question: 'What is the difference between APR and APY?',
      answer: 'APR (Annual Percentage Rate) is the stated interest rate without compounding. APY (Annual Percentage Yield) includes the effect of compounding and represents your actual return. Our "Effective Annual Rate" result shows the APY.',
    },
    {
      question: 'How does compounding frequency affect my returns?',
      answer: 'More frequent compounding results in higher returns because interest starts earning interest sooner. However, the difference is often small. For example, 7% compounded monthly yields about 7.23% APY, while daily compounding yields 7.25% APY.',
    },
    {
      question: 'Should I contribute at the beginning or end of each period?',
      answer: 'Contributing at the beginning of each period (annuity due) results in slightly higher returns because each contribution has one extra period to earn interest. However, the difference is usually modest.',
    },
    {
      question: 'What is a realistic rate of return to expect?',
      answer: 'Historical stock market returns average 7-10% annually after inflation. Savings accounts typically offer 1-5%. Bonds average 4-6%. Your expected return depends on your investment mix and risk tolerance.',
    },
    {
      question: 'How much should I save each month?',
      answer: 'A common guideline is to save 15-20% of your income for retirement. However, the right amount depends on your goals, timeline, and current financial situation. Use this calculator to see how different contribution amounts affect your future wealth.',
    },
  ],
  
  // Related Calculators
  relatedCalculators: [
    'savings-calculator',
    'retirement-calculator',
    'investment-calculator',
    'roi-calculator',
  ],
  
  // Feature Flags
  features: {
    autoCalculate: true,
    exportPDF: true,
    exportImage: true,
    shareResults: true,
    saveHistory: true,
    favorites: true,
    showChart: true,
    showSchedule: true,
  },
};

// ============================================================================
// CALCULATION FUNCTION
// ============================================================================

export function calculateCompoundInterestResults(data: CalculatorData): CalculatorResults {
  // Get values from data
  const principal = data.values.principal as number;
  const monthlyContribution = (data.values.monthlyContribution as number) || 0;
  const annualRate = data.values.annualRate as number;
  const years = data.values.years as number;
  const compounding = (data.values.compounding as CompoundingFrequency) || 'monthly';
  const contributionTiming = (data.values.contributionTiming as 'beginning' | 'end') || 'end';
  
  // Calculate compound interest
  const results = calculateCompoundInterestWithContributions(
    principal,
    monthlyContribution,
    annualRate,
    years,
    compounding,
    contributionTiming
  );
  
  // Calculate additional metrics
  const totalInvested = principal + results.totalContributions;
  const totalReturn = totalInvested > 0 ? ((results.finalAmount - totalInvested) / totalInvested) * 100 : 0;
  const interestRatio = results.finalAmount > 0 ? (results.totalInterest / results.finalAmount) * 100 : 0;
  
  // Calculate effective annual rate (APY)
  const compoundingPeriods: Record<CompoundingFrequency, number> = {
    annually: 1,
    semiannually: 2,
    quarterly: 4,
    monthly: 12,
    daily: 365,
  };
  const n = compoundingPeriods[compounding];
  const effectiveRate = (Math.pow(1 + (annualRate / 100) / n, n) - 1) * 100;
  
  // Generate year-by-year schedule for chart
  const schedule = generateCompoundInterestSchedule(
    principal,
    monthlyContribution,
    annualRate,
    years
  );
  
  return {
    values: {
      finalAmount: results.finalAmount,
      totalInterest: results.totalInterest,
      totalContributions: principal + results.totalContributions,
      principalGrowth: results.principalGrowth,
      effectiveRate,
      totalReturn,
      interestRatio,
    },
    formatted: {
      finalAmount: formatCurrency(results.finalAmount, 'USD'),
      totalInterest: formatCurrency(results.totalInterest, 'USD'),
      totalContributions: formatCurrency(principal + results.totalContributions, 'USD'),
      effectiveRate: formatPercentage(effectiveRate, { decimals: 2 }),
      totalReturn: formatPercentage(totalReturn, { decimals: 1, showSign: true }),
      interestRatio: formatPercentage(interestRatio, { decimals: 1 }),
    },
    summary: `Investing ${formatCurrency(principal, 'USD')} with ${formatCurrency(monthlyContribution, 'USD')} monthly contributions at ${annualRate}% for ${years} years will grow to ${formatCurrency(results.finalAmount, 'USD')}. You'll earn ${formatCurrency(results.totalInterest, 'USD')} in interest.`,
    isValid: true,
    chartData: {
      type: 'area',
      labels: schedule.map(s => `Year ${s.year}`),
      datasets: [
        {
          label: 'Total Balance',
          data: schedule.map(s => s.endBalance),
          borderColor: '#2563eb',
          backgroundColor: 'rgba(37, 99, 235, 0.1)',
        },
        {
          label: 'Total Contributions',
          data: schedule.map(s => s.startBalance + s.contributions - (schedule[0]?.startBalance || 0)),
          borderColor: '#10b981',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
        },
      ],
    },
    tableData: schedule.map(row => ({
      year: row.year,
      startBalance: formatCurrency(row.startBalance, 'USD'),
      contributions: formatCurrency(row.contributions, 'USD'),
      interest: formatCurrency(row.interest, 'USD'),
      endBalance: formatCurrency(row.endBalance, 'USD'),
    })),
  };
}

// ============================================================================
// EXPORT COMPLETE CALCULATOR
// ============================================================================

export const compoundInterestCalculator = {
  config: compoundInterestConfig,
  calculate: calculateCompoundInterestResults,
};

export default compoundInterestCalculator;
