import { CalculatorConfig, CalculatorData, CalculatorResults } from '@/types/calculator.types';
import { calculateLoanDetails, generateAmortizationSchedule } from '@/lib/formulas/finance';

// Loan Calculator Configuration
export const loanCalculatorConfig: CalculatorConfig = {
  slug: 'loan-calculator',
  version: '1.0.0',
  category: 'finance',
  translationKey: 'loan',
  icon: '💰',
  color: 'green',
  premium: false,
  popular: true,
  new: false,
  
  inputs: [
    {
      id: 'loanAmount',
      type: 'currency',
      required: true,
      min: 100,
      max: 10000000,
      step: 100,
      defaultValue: 25000,
      validation: ['required', 'positive'],
    },
    {
      id: 'interestRate',
      type: 'percentage',
      required: true,
      min: 0.1,
      max: 50,
      step: 0.1,
      defaultValue: 8.5,
      validation: ['required', 'interestRate'],
    },
    {
      id: 'loanTerm',
      type: 'number',
      required: true,
      min: 1,
      max: 360,
      step: 1,
      defaultValue: 60,
      suffix: 'months',
      validation: ['required', 'positive', 'integer'],
    },
    {
      id: 'termUnit',
      type: 'radio',
      required: true,
      options: [
        { value: 'months', labelKey: 'inputs.termUnit.options.months' },
        { value: 'years', labelKey: 'inputs.termUnit.options.years' },
      ],
      defaultValue: 'months',
    },
    {
      id: 'extraPayment',
      type: 'currency',
      required: false,
      min: 0,
      max: 100000,
      step: 10,
      defaultValue: 0,
      group: 'extra',
    },
    {
      id: 'extraPaymentFrequency',
      type: 'select',
      required: false,
      options: [
        { value: 'monthly', labelKey: 'inputs.extraPaymentFrequency.options.monthly' },
        { value: 'yearly', labelKey: 'inputs.extraPaymentFrequency.options.yearly' },
        { value: 'onetime', labelKey: 'inputs.extraPaymentFrequency.options.onetime' },
      ],
      defaultValue: 'monthly',
      group: 'extra',
      dependency: {
        field: 'extraPayment',
        condition: 'greaterThan',
        value: 0,
      },
    },
  ],
  
  inputGroups: [
    {
      id: 'extra',
      labelKey: 'inputGroups.extra.label',
      descriptionKey: 'inputGroups.extra.description',
      collapsible: true,
      defaultCollapsed: true,
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
      id: 'totalPayment',
      type: 'currency',
      format: { type: 'currency', currency: 'USD', decimals: 2 },
    },
    {
      id: 'totalInterest',
      type: 'currency',
      format: { type: 'currency', currency: 'USD', decimals: 2 },
    },
    {
      id: 'interestPercentage',
      type: 'percentage',
      format: { type: 'percentage', decimals: 1 },
    },
    {
      id: 'payoffDate',
      type: 'text',
      format: { type: 'date', style: 'medium' },
    },
    {
      id: 'timeSaved',
      type: 'text',
      format: { type: 'text' },
      badge: true,
      dependency: {
        field: 'extraPayment',
        condition: 'greaterThan',
        value: 0,
      },
    },
    {
      id: 'interestSaved',
      type: 'currency',
      format: { type: 'currency', currency: 'USD', decimals: 2 },
      dependency: {
        field: 'extraPayment',
        condition: 'greaterThan',
        value: 0,
      },
    },
  ],
  
  chartData: {
    type: 'area',
    dataKeys: ['balance', 'principal', 'interest'],
  },
  
  tableData: {
    columns: [
      { key: 'month', labelKey: 'table.columns.month', type: 'number' },
      { key: 'payment', labelKey: 'table.columns.payment', type: 'currency' },
      { key: 'principal', labelKey: 'table.columns.principal', type: 'currency' },
      { key: 'interest', labelKey: 'table.columns.interest', type: 'currency' },
      { key: 'balance', labelKey: 'table.columns.balance', type: 'currency' },
    ],
    collapsible: true,
    defaultVisible: 12,
  },
  
  education: [
    { id: 'howLoansWork', titleKey: 'education.sections.howLoansWork.title', contentKey: 'education.sections.howLoansWork.content' },
    { id: 'interestTypes', titleKey: 'education.sections.interestTypes.title', contentKey: 'education.sections.interestTypes.content' },
    { id: 'payoffStrategies', titleKey: 'education.sections.payoffStrategies.title', contentKey: 'education.sections.payoffStrategies.content' },
    { id: 'creditScore', titleKey: 'education.sections.creditScore.title', contentKey: 'education.sections.creditScore.content' },
  ],
  
  faq: [
    { questionKey: 'faq.items.0.question', answerKey: 'faq.items.0.answer' },
    { questionKey: 'faq.items.1.question', answerKey: 'faq.items.1.answer' },
    { questionKey: 'faq.items.2.question', answerKey: 'faq.items.2.answer' },
    { questionKey: 'faq.items.3.question', answerKey: 'faq.items.3.answer' },
    { questionKey: 'faq.items.4.question', answerKey: 'faq.items.4.answer' },
  ],
  
  relatedCalculators: [
    'mortgage-calculator',
    'auto-loan-calculator',
    'credit-card-payoff-calculator',
    'compound-interest-calculator',
  ],
  
  seo: {
    keywords: ['loan calculator', 'loan payment calculator', 'personal loan calculator', 'amortization calculator', 'loan payoff'],
  },
};

// Loan Calculator Function
export function calculateLoanResults(data: CalculatorData): CalculatorResults {
  const loanAmount = data.loanAmount as number;
  const interestRate = data.interestRate as number;
  let loanTerm = data.loanTerm as number;
  const termUnit = data.termUnit as string;
  const extraPayment = (data.extraPayment as number) || 0;
  const extraPaymentFrequency = (data.extraPaymentFrequency as string) || 'monthly';
  
  // Convert to months if years
  if (termUnit === 'years') {
    loanTerm = loanTerm * 12;
  }
  
  // Calculate base loan details
  const loanDetails = calculateLoanDetails(loanAmount, interestRate, loanTerm);
  
  // Generate amortization schedule
  const schedule = generateAmortizationSchedule(
    loanAmount,
    interestRate,
    loanTerm,
    extraPaymentFrequency === 'monthly' ? extraPayment : 0
  );
  
  // Calculate payoff date
  const today = new Date();
  const payoffMonths = schedule.length;
  const payoffDate = new Date(today.getFullYear(), today.getMonth() + payoffMonths, today.getDate());
  
  // Calculate savings from extra payments
  let timeSaved = '';
  let interestSaved = 0;
  
  if (extraPayment > 0) {
    const originalMonths = loanTerm;
    const newMonths = schedule.length;
    const monthsSaved = originalMonths - newMonths;
    
    if (monthsSaved > 0) {
      if (monthsSaved >= 12) {
        const years = Math.floor(monthsSaved / 12);
        const months = monthsSaved % 12;
        timeSaved = months > 0 ? `${years}y ${months}m` : `${years} years`;
      } else {
        timeSaved = `${monthsSaved} months`;
      }
    }
    
    const originalInterest = loanDetails.totalInterest;
    const newInterest = schedule.reduce((sum, p) => sum + p.interest, 0);
    interestSaved = originalInterest - newInterest;
  }
  
  // Calculate interest percentage
  const interestPercentage = (loanDetails.totalInterest / loanAmount) * 100;
  
  // Create chart data
  const chartData = schedule.map((payment, index) => ({
    month: index + 1,
    balance: payment.balance,
    principal: loanAmount - payment.balance,
    interest: schedule.slice(0, index + 1).reduce((sum, p) => sum + p.interest, 0),
  }));
  
  // Limit table data for display
  const tableData = schedule.map((payment, index) => ({
    month: index + 1,
    payment: payment.payment,
    principal: payment.principal,
    interest: payment.interest,
    balance: payment.balance,
  }));
  
  return {
    monthlyPayment: loanDetails.monthlyPayment,
    totalPayment: extraPayment > 0 
      ? schedule.reduce((sum, p) => sum + p.payment, 0)
      : loanDetails.totalPayment,
    totalInterest: extraPayment > 0
      ? schedule.reduce((sum, p) => sum + p.interest, 0)
      : loanDetails.totalInterest,
    interestPercentage,
    payoffDate: payoffDate.toISOString(),
    timeSaved: timeSaved || undefined,
    interestSaved: interestSaved > 0 ? interestSaved : undefined,
    _chartData: chartData,
    _tableData: tableData,
  };
}

// Export calculator
export const loanCalculator = {
  config: loanCalculatorConfig,
  calculate: calculateLoanResults,
};
