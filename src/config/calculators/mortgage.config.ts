import { CalculatorConfig, CalculatorData, CalculatorResults } from '@/types/calculator.types';
import { calculateMortgage, generateAmortizationSchedule } from '@/lib/formulas/finance';

// Mortgage Calculator Configuration
export const mortgageCalculatorConfig: CalculatorConfig = {
  slug: 'mortgage-calculator',
  version: '1.0.0',
  category: 'finance',
  translationKey: 'mortgage',
  icon: '🏠',
  color: 'blue',
  premium: false,
  popular: true,
  new: false,
  
  inputs: [
    {
      id: 'homePrice',
      type: 'currency',
      required: true,
      min: 10000,
      max: 100000000,
      step: 1000,
      defaultValue: 350000,
      validation: ['required', 'positive'],
    },
    {
      id: 'downPayment',
      type: 'currency',
      required: true,
      min: 0,
      max: 100000000,
      step: 1000,
      defaultValue: 70000,
      validation: ['required', 'nonNegative'],
    },
    {
      id: 'downPaymentPercent',
      type: 'percentage',
      required: false,
      min: 0,
      max: 100,
      step: 0.5,
      defaultValue: 20,
      linkedTo: 'downPayment',
    },
    {
      id: 'loanTerm',
      type: 'select',
      required: true,
      options: [
        { value: '10', labelKey: 'inputs.loanTerm.options.10' },
        { value: '15', labelKey: 'inputs.loanTerm.options.15' },
        { value: '20', labelKey: 'inputs.loanTerm.options.20' },
        { value: '25', labelKey: 'inputs.loanTerm.options.25' },
        { value: '30', labelKey: 'inputs.loanTerm.options.30' },
      ],
      defaultValue: '30',
    },
    {
      id: 'interestRate',
      type: 'percentage',
      required: true,
      min: 0.1,
      max: 25,
      step: 0.125,
      defaultValue: 6.5,
      validation: ['required', 'interestRate'],
    },
    {
      id: 'propertyTax',
      type: 'currency',
      required: false,
      min: 0,
      max: 100000,
      step: 100,
      defaultValue: 3500,
      group: 'additional',
    },
    {
      id: 'homeInsurance',
      type: 'currency',
      required: false,
      min: 0,
      max: 50000,
      step: 100,
      defaultValue: 1200,
      group: 'additional',
    },
    {
      id: 'pmi',
      type: 'currency',
      required: false,
      min: 0,
      max: 10000,
      step: 10,
      defaultValue: 0,
      group: 'additional',
    },
    {
      id: 'hoa',
      type: 'currency',
      required: false,
      min: 0,
      max: 20000,
      step: 50,
      defaultValue: 0,
      group: 'additional',
    },
  ],
  
  inputGroups: [
    {
      id: 'additional',
      labelKey: 'inputGroups.additional.label',
      descriptionKey: 'inputGroups.additional.description',
      collapsible: true,
      defaultCollapsed: false,
    },
  ],
  
  results: [
    {
      id: 'monthlyPayment',
      type: 'currency',
      primary: true,
      format: { type: 'currency', currency: 'USD', decimals: 2 },
    },
    {
      id: 'principalInterest',
      type: 'currency',
      format: { type: 'currency', currency: 'USD', decimals: 2 },
    },
    {
      id: 'monthlyTaxes',
      type: 'currency',
      format: { type: 'currency', currency: 'USD', decimals: 2 },
    },
    {
      id: 'monthlyInsurance',
      type: 'currency',
      format: { type: 'currency', currency: 'USD', decimals: 2 },
    },
    {
      id: 'loanAmount',
      type: 'currency',
      format: { type: 'currency', currency: 'USD', decimals: 0 },
    },
    {
      id: 'totalInterest',
      type: 'currency',
      format: { type: 'currency', currency: 'USD', decimals: 0 },
    },
    {
      id: 'totalPayments',
      type: 'currency',
      format: { type: 'currency', currency: 'USD', decimals: 0 },
    },
    {
      id: 'payoffDate',
      type: 'text',
      format: { type: 'date', style: 'medium' },
      badge: true,
    },
  ],
  
  chartData: {
    type: 'pie',
    dataKeys: ['principal', 'interest', 'taxes', 'insurance'],
  },
  
  tableData: {
    columns: [
      { key: 'year', labelKey: 'table.columns.year', type: 'number' },
      { key: 'principal', labelKey: 'table.columns.principal', type: 'currency' },
      { key: 'interest', labelKey: 'table.columns.interest', type: 'currency' },
      { key: 'balance', labelKey: 'table.columns.balance', type: 'currency' },
    ],
    collapsible: true,
  },
  
  education: [
    { id: 'howMortgageWorks', titleKey: 'education.sections.howMortgageWorks.title', contentKey: 'education.sections.howMortgageWorks.content' },
    { id: 'downPayment', titleKey: 'education.sections.downPayment.title', contentKey: 'education.sections.downPayment.content' },
    { id: 'fixedVsAdjustable', titleKey: 'education.sections.fixedVsAdjustable.title', contentKey: 'education.sections.fixedVsAdjustable.content' },
    { id: 'extraPayments', titleKey: 'education.sections.extraPayments.title', contentKey: 'education.sections.extraPayments.content' },
  ],
  
  faq: [
    { questionKey: 'faq.items.0.question', answerKey: 'faq.items.0.answer' },
    { questionKey: 'faq.items.1.question', answerKey: 'faq.items.1.answer' },
    { questionKey: 'faq.items.2.question', answerKey: 'faq.items.2.answer' },
    { questionKey: 'faq.items.3.question', answerKey: 'faq.items.3.answer' },
    { questionKey: 'faq.items.4.question', answerKey: 'faq.items.4.answer' },
  ],
  
  relatedCalculators: [
    'loan-calculator',
    'compound-interest-calculator',
    'affordability-calculator',
    'refinance-calculator',
  ],
  
  seo: {
    keywords: ['mortgage calculator', 'home loan calculator', 'mortgage payment', 'house payment calculator', 'home buying'],
  },
};

// Mortgage Calculator Function
export function calculateMortgageResults(data: CalculatorData): CalculatorResults {
  const homePrice = data.homePrice as number;
  const downPayment = data.downPayment as number;
  const loanTerm = parseInt(data.loanTerm as string);
  const interestRate = data.interestRate as number;
  const propertyTax = (data.propertyTax as number) || 0;
  const homeInsurance = (data.homeInsurance as number) || 0;
  const pmi = (data.pmi as number) || 0;
  const hoa = (data.hoa as number) || 0;
  
  // Calculate loan amount
  const loanAmount = homePrice - downPayment;
  
  // Calculate mortgage details
  const mortgageResult = calculateMortgage(
    loanAmount,
    interestRate,
    loanTerm * 12,
    propertyTax,
    homeInsurance,
    pmi
  );
  
  // Add HOA to monthly payment
  const monthlyPayment = mortgageResult.totalMonthlyPayment + (hoa / 12);
  
  // Generate amortization schedule (yearly summary)
  const schedule = generateAmortizationSchedule(
    loanAmount,
    interestRate,
    loanTerm * 12
  );
  
  // Create yearly summary for table
  const yearlySchedule: Array<{
    year: number;
    principal: number;
    interest: number;
    balance: number;
  }> = [];
  
  for (let year = 1; year <= loanTerm; year++) {
    const yearStart = (year - 1) * 12;
    const yearEnd = Math.min(year * 12, schedule.length);
    const yearPayments = schedule.slice(yearStart, yearEnd);
    
    if (yearPayments.length > 0) {
      const yearPrincipal = yearPayments.reduce((sum, p) => sum + p.principal, 0);
      const yearInterest = yearPayments.reduce((sum, p) => sum + p.interest, 0);
      const endBalance = yearPayments[yearPayments.length - 1].balance;
      
      yearlySchedule.push({
        year,
        principal: yearPrincipal,
        interest: yearInterest,
        balance: endBalance,
      });
    }
  }
  
  // Calculate payoff date
  const today = new Date();
  const payoffDate = new Date(today.getFullYear() + loanTerm, today.getMonth(), today.getDate());
  
  // Calculate chart data for payment breakdown
  const chartData = [
    { name: 'Principal & Interest', value: mortgageResult.principalAndInterest * loanTerm * 12 },
    { name: 'Property Tax', value: propertyTax * loanTerm },
    { name: 'Insurance', value: homeInsurance * loanTerm },
    { name: 'PMI', value: pmi * loanTerm },
  ].filter(item => item.value > 0);
  
  return {
    monthlyPayment,
    principalInterest: mortgageResult.principalAndInterest,
    monthlyTaxes: mortgageResult.monthlyTax,
    monthlyInsurance: mortgageResult.monthlyInsurance,
    loanAmount,
    totalInterest: mortgageResult.totalInterest,
    totalPayments: mortgageResult.totalCost + (hoa * loanTerm),
    payoffDate: payoffDate.toISOString(),
    _chartData: chartData,
    _tableData: yearlySchedule,
  };
}

// Export calculator
export const mortgageCalculator = {
  config: mortgageCalculatorConfig,
  calculate: calculateMortgageResults,
};
