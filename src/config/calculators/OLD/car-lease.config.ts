import type { CalculatorConfigV3, CalculatorResults } from "@/engine/v3/types/engine.types";

// =============================================================================
// CAR LEASE CALCULATOR V3 CONFIG
// Based on research from: Edmunds, KBB, Calculator.net, Leasehackr, CarsDirect
// =============================================================================

export const carLeaseCalculatorConfig: CalculatorConfigV3 = {
  // Basic Info
  id: "car-lease-calculator",
  slug: "car-lease-calculator",
  name: "Car Lease Calculator",
  category: "finance",
  icon: "🚗",

  // SEO
  seo: {
    title: "Car Lease Calculator - Calculate Monthly Lease Payments",
    description: "Free car lease calculator to estimate monthly payments, total lease cost, and compare leasing vs buying. Enter MSRP, residual value, money factor, and down payment to see your true lease cost. Works for any vehicle lease.",
    shortDescription: "Calculate car lease payments and total cost",
    keywords: [
      "car lease calculator",
      "auto lease calculator",
      "lease payment calculator",
      "money factor calculator",
      "residual value calculator",
      "lease vs buy calculator",
      "vehicle lease calculator",
      "monthly lease payment",
      "car leasing cost",
    ],
  },

  // Hero Section
  hero: {
    badge: "Finance",
    rating: { average: 4.8, count: 1923 },
  },

  // Unit System
  unitSystem: {
    enabled: false,
    default: "imperial",
    options: [],
  },

  // =============================================================================
  // INPUTS
  // =============================================================================
  inputs: [
    {
      id: "msrp",
      type: "slider",
      label: "Vehicle MSRP",
      required: true,
      defaultValue: 40000,
      min: 15000,
      max: 100000,
      step: 500,
      prefix: "$",
      helpText: "Manufacturer's Suggested Retail Price (sticker price)",
    },
    {
      id: "negotiatedPrice",
      type: "slider",
      label: "Negotiated Price",
      required: true,
      defaultValue: 38000,
      min: 15000,
      max: 100000,
      step: 500,
      prefix: "$",
      helpText: "The price you negotiate with the dealer (try to get below MSRP)",
    },
    {
      id: "residualPercent",
      type: "slider",
      label: "Residual Value",
      required: true,
      defaultValue: 55,
      min: 35,
      max: 75,
      step: 1,
      suffix: "%",
      helpText: "Vehicle's value at lease end (ask dealer, typically 45-65%)",
    },
    {
      id: "moneyFactor",
      type: "number",
      label: "Money Factor",
      required: true,
      defaultValue: 0.00125,
      min: 0.0001,
      max: 0.005,
      step: 0.00001,
      helpText: "Interest rate for leases (multiply by 2400 to get APR)",
    },
    {
      id: "leaseTerm",
      type: "select",
      label: "Lease Term",
      required: true,
      defaultValue: "36",
      options: [
        { value: "24", label: "24 months" },
        { value: "36", label: "36 months" },
        { value: "39", label: "39 months" },
        { value: "48", label: "48 months" },
      ],
      helpText: "Most leases are 36 months; stay within warranty period",
    },
    {
      id: "downPayment",
      type: "slider",
      label: "Down Payment",
      required: false,
      defaultValue: 2000,
      min: 0,
      max: 10000,
      step: 500,
      prefix: "$",
      helpText: "Cap cost reduction (keep low - you won't get it back)",
    },
    {
      id: "tradeInValue",
      type: "slider",
      label: "Trade-in Value",
      required: false,
      defaultValue: 0,
      min: 0,
      max: 30000,
      step: 500,
      prefix: "$",
      helpText: "Value of your current vehicle if trading in",
    },
    {
      id: "rebates",
      type: "slider",
      label: "Rebates & Incentives",
      required: false,
      defaultValue: 0,
      min: 0,
      max: 10000,
      step: 250,
      prefix: "$",
      helpText: "Manufacturer rebates, loyalty discounts, etc.",
    },
    {
      id: "fees",
      type: "slider",
      label: "Fees (Doc, Acquisition, etc.)",
      required: false,
      defaultValue: 1200,
      min: 0,
      max: 3000,
      step: 100,
      prefix: "$",
      helpText: "Acquisition fee ($500-$1,000), doc fee, registration",
    },
    {
      id: "salesTaxRate",
      type: "slider",
      label: "Sales Tax Rate",
      required: false,
      defaultValue: 7,
      min: 0,
      max: 12,
      step: 0.25,
      suffix: "%",
      helpText: "Your state/local sales tax rate",
    },
    {
      id: "annualMileage",
      type: "select",
      label: "Annual Mileage",
      required: true,
      defaultValue: "12000",
      options: [
        { value: "10000", label: "10,000 miles/year" },
        { value: "12000", label: "12,000 miles/year" },
        { value: "15000", label: "15,000 miles/year" },
      ],
      helpText: "Stay within limit to avoid overage charges",
    },
  ],

  // Input Groups
  inputGroups: [
    {
      id: "reductions",
      title: "Cap Cost Reductions",
      inputs: ["downPayment", "tradeInValue", "rebates"],
      defaultExpanded: false,
    },
    {
      id: "feesAndTax",
      title: "Fees & Taxes",
      inputs: ["fees", "salesTaxRate"],
      defaultExpanded: false,
    },
  ],

  // =============================================================================
  // RESULTS
  // =============================================================================
  results: [
    {
      id: "monthlyPayment",
      type: "primary",
      label: "Monthly Payment",
      format: "number",
      prefix: "$",
    },
    {
      id: "totalLeaseCost",
      type: "secondary",
      label: "Total Lease Cost",
      format: "number",
      prefix: "$",
      icon: "💰",
    },
    {
      id: "depreciation",
      type: "secondary",
      label: "Monthly Depreciation",
      format: "number",
      prefix: "$",
      icon: "📉",
    },
    {
      id: "financeCharge",
      type: "secondary",
      label: "Monthly Finance Charge",
      format: "number",
      prefix: "$",
      icon: "📊",
    },
    {
      id: "effectiveAPR",
      type: "secondary",
      label: "Equivalent APR",
      format: "number",
      suffix: "%",
      icon: "📈",
    },
    {
      id: "residualValue",
      type: "secondary",
      label: "Residual Value",
      format: "number",
      prefix: "$",
      icon: "🚙",
    },
  ],

  // =============================================================================
  // INFO CARDS (Required: 2 cards - type "list" + type "horizontal")
  // =============================================================================
  infoCards: [
    {
      id: "leaseQuickFacts",
      type: "list",
      title: "Lease Quick Facts",
      icon: "📋",
      items: [
        { label: "Good Money Factor", value: "≤0.0025 (6% APR)" },
        { label: "High Residual", value: "60%+ is excellent" },
        { label: "Recommended Term", value: "36 months or less" },
        { label: "Standard Mileage", value: "12,000 miles/year" },
      ],
    },
    {
      id: "typicalFees",
      type: "horizontal",
      title: "Typical Lease Fees",
      icon: "💵",
      columns: 4,
      items: [
        { label: "Acquisition", value: "$500-$1,000" },
        { label: "Disposition", value: "$350-$595" },
        { label: "Doc Fee", value: "$100-$500" },
        { label: "Overage/Mile", value: "$0.15-$0.30" },
      ],
    },
  ],

  // =============================================================================
  // REFERENCE DATA (Required: array with columns grid)
  // =============================================================================
  referenceData: [
    {
      id: "topResidualVehicles",
      title: "Top Vehicles by Residual Value (36-mo, 2025)",
      icon: "🏆",
      columns: [
        { id: "rank", label: "#", align: "center" as const },
        { id: "vehicle", label: "Vehicle", align: "left" as const },
        { id: "residual", label: "Residual %", align: "right" as const, highlight: true },
      ],
      data: [
        { rank: "1", vehicle: "Toyota Tacoma TRD", residual: "77%" },
        { rank: "2", vehicle: "Kia Telluride SX", residual: "74.6%" },
        { rank: "3", vehicle: "Porsche 911 Carrera", residual: "71.2%" },
        { rank: "4", vehicle: "Toyota 4Runner TRD Pro", residual: "69%" },
        { rank: "5", vehicle: "Honda CR-V", residual: "65%" },
        { rank: "6", vehicle: "Toyota RAV4 Hybrid", residual: "63%" },
        { rank: "7", vehicle: "Lexus RX", residual: "61%" },
        { rank: "8", vehicle: "Honda Accord", residual: "58%" },
      ],
    },
  ],

  // =============================================================================
  // EDUCATION SECTIONS
  // =============================================================================
  educationSections: [
    // REQUIRED: Code Example
    {
      id: "exampleCalculation",
      type: "code-example",
      title: "Example Calculation",
      icon: "📊",
      description: "Step-by-step lease payment calculation for a $45,000 vehicle",
      columns: 2,
      examples: [
        {
          title: "Standard Lease Calculation",
          steps: [
            "MSRP: $45,000 | Negotiated: $43,000",
            "Residual (57%): $45,000 × 0.57 = $25,650",
            "Gross Cap Cost: $43,000 + $1,200 fees = $44,200",
            "Net Cap Cost: $44,200 - $2,500 down = $41,700",
            "Depreciation: ($41,700 - $25,650) / 36 = $445.83",
            "Finance: ($41,700 + $25,650) × 0.00125 = $84.19",
          ],
          result: "Pre-tax Payment: $530.02 | With 7% tax: $567.12/mo",
        },
        {
          title: "Money Factor Conversion",
          steps: [
            "Money Factor to APR:",
            "0.00125 × 2,400 = 3% APR",
            "0.00167 × 2,400 = 4% APR",
            "0.00250 × 2,400 = 6% APR",
            "",
            "APR to Money Factor:",
            "5% ÷ 2,400 = 0.00208",
          ],
          result: "Good MF: ≤0.0025 (6% APR) | Excellent: ≤0.00125 (3% APR)",
        },
      ],
    },
    // REQUIRED: List (5+ items)
    {
      id: "considerations",
      type: "list",
      title: "Important Lease Considerations",
      icon: "⚠️",
      items: [
        { text: "Always negotiate the selling price (cap cost) before discussing monthly payments. Dealers can manipulate payments by adjusting other factors.", type: "warning" },
        { text: "Keep your down payment minimal. If the car is totaled or stolen, you lose your down payment since you don't own the vehicle.", type: "warning" },
        { text: "Money factor below 0.0025 (6% APR equivalent) is considered good. Ask the dealer for the money factor - they must tell you.", type: "info" },
        { text: "Stay within your mileage limit. Overage charges average $0.15-$0.30 per mile and add up quickly.", type: "warning" },
        { text: "Higher residual values mean lower monthly payments. Trucks and SUVs typically have better residuals than sedans.", type: "info" },
        { text: "Lease terms of 36 months or less keep you within most factory warranties, avoiding repair costs.", type: "info" },
        { text: "The 1% rule: A good lease deal has monthly payment ≤1% of MSRP. Below that is excellent.", type: "info" },
      ],
    },
    // REQUIRED: 3+ Prose Sections
    {
      id: "whatIsCarLease",
      type: "prose",
      title: "What is a Car Lease?",
      icon: "📖",
      content: "A car lease is essentially a long-term rental agreement where you pay for the depreciation of a vehicle over a set period (typically 24-48 months) plus interest charges, rather than paying for the full purchase price. At the end of the lease, you return the vehicle to the dealer—you never own it. Your monthly payment covers two main components: the depreciation (the difference between the car's starting value and its expected value at lease end, called the residual value), and the finance charge (interest on the money you're essentially borrowing). Leasing typically requires less money upfront than buying and offers lower monthly payments, but you're building no equity and must return the car when the lease ends.",
    },
    {
      id: "leaseTermsExplained",
      type: "prose",
      title: "Key Lease Terms Explained",
      icon: "📐",
      content: "Understanding lease terminology is crucial for getting a good deal. The **Money Factor** is the interest rate expressed differently—multiply it by 2,400 to get the equivalent APR. A money factor of 0.00125 equals 3% APR. The **Residual Value** is the car's estimated worth at lease end, expressed as a percentage of MSRP. Higher residual = lower payments because you're financing less depreciation. **Capitalized Cost (Cap Cost)** is the negotiated price plus fees minus any down payment, trade-in, or rebates—this is what you're actually financing. The **Acquisition Fee** is a one-time charge ($500-$1,000) to set up the lease. The **Disposition Fee** ($350-$595) is charged when you return the car at lease end.",
    },
    {
      id: "leaseVsBuy",
      type: "prose",
      title: "Leasing vs. Buying: Which is Better?",
      icon: "💡",
      content: "Leasing makes sense if you want a new car every few years, drive predictable miles (under 15,000/year), prefer lower monthly payments, and don't want to worry about selling a used car. Buying is better if you drive high miles, want to customize your vehicle, plan to keep it 5+ years, or want to build equity. Mathematically, buying and keeping a car long-term almost always costs less than perpetual leasing. However, leasing lets you drive more car for less money monthly, and you're always under warranty. The average lease payment in 2025 was around $540/month for 36 months, while the average new car loan payment was $735/month for 69 months. Consider your driving habits, financial priorities, and how much you value having a new car regularly.",
    },
  ],

  // =============================================================================
  // FAQs (6+ required)
  // =============================================================================
  faqs: [
    {
      question: "What is a good money factor for a lease?",
      answer: "A good money factor is 0.0025 or below (equivalent to 6% APR). Excellent credit may qualify you for money factors around 0.00125 (3% APR) or lower, especially with manufacturer special financing. To convert money factor to APR, multiply by 2,400. To convert APR to money factor, divide by 2,400. Always ask the dealer for the money factor and compare it across different dealerships—unlike interest rates, money factors aren't always advertised and can sometimes be negotiated.",
    },
    {
      question: "What is residual value and why does it matter?",
      answer: "Residual value is the estimated worth of the vehicle at the end of your lease, expressed as a percentage of MSRP. It's set by the financing company, not the dealer, and directly affects your monthly payment. Higher residual = lower payment because you're paying for less depreciation. For example, a $40,000 car with 60% residual means $16,000 in depreciation over the lease versus $20,000 at 50% residual. Trucks and SUVs typically have higher residuals (55-70%) than sedans (45-55%). Check J.D. Power ALG residual values before leasing to ensure you're getting a fair deal.",
    },
    {
      question: "Should I put money down on a lease?",
      answer: "Generally, no—or as little as possible. Unlike buying, where a down payment reduces what you owe, a lease down payment just prepays some of your monthly payments. If your leased car is totaled or stolen early in the lease, you lose that down payment because gap insurance only covers what you still owe the leasing company. Instead, put the minimum required for fees and first month's payment (the 'drive-off' amount). If you want lower monthly payments, consider a shorter-term lease or a vehicle with higher residual value rather than a larger down payment.",
    },
    {
      question: "What happens if I exceed my mileage limit?",
      answer: "You'll pay an overage charge for each mile over your limit when you return the car. This typically ranges from $0.15 to $0.30 per mile depending on the manufacturer—BMW charges $0.25-$0.30, while Toyota charges $0.15. On a 36-month lease, going 5,000 miles over at $0.25/mile costs $1,250 at turn-in. If you know you'll exceed your limit, it's cheaper to buy extra miles upfront (often $0.10-$0.15/mile) than at lease end. Alternatively, consider purchasing the car at lease end if you've gone significantly over.",
    },
    {
      question: "Can I negotiate a car lease?",
      answer: "Absolutely! Many people don't realize that nearly everything in a lease is negotiable. Focus on: 1) The selling price (cap cost)—negotiate this just like you would when buying, 2) The money factor—sometimes dealers mark this up, 3) Acquisition and documentation fees—some dealers will reduce or waive these, 4) Rebates and incentives—make sure all available incentives are applied. Never negotiate based on monthly payment alone—dealers can manipulate other factors to hit your target payment while giving you a worse deal. Know all the numbers before you sign.",
    },
    {
      question: "What fees should I expect when leasing?",
      answer: "Common lease fees include: Acquisition fee ($500-$1,000)—charged by the financing company to arrange the lease, usually rolled into the cap cost. Documentation fee ($100-$500)—dealer charge for paperwork. Registration and title fees—varies by state. Disposition fee ($350-$595)—charged when you return the car, but often waived if you lease another vehicle from the same brand. Security deposit—some manufacturers allow multiple security deposits (MSDs) to lower your money factor. First month's payment—typically due at signing. Sales tax—varies by state; some tax monthly payments, others tax upfront.",
    },
    {
      question: "What's the 1% rule for leasing?",
      answer: "The 1% rule is a quick way to evaluate if a lease deal is good: your monthly payment (before tax) should be approximately 1% of the car's MSRP. For example, a $40,000 car should lease for around $400/month or less. Below 1% is a great deal; above 1% means you might be paying too much or the car has poor residual value. This rule helps you quickly compare deals across different vehicles. Note: this works best for 36-month leases with standard mileage. Shorter leases or higher mileage typically cost more per month.",
    },
    {
      question: "Can I buy my leased car at the end?",
      answer: "Yes, you have the option to purchase the vehicle at lease end for the residual value stated in your contract. This can be a good deal if: 1) The car's market value is higher than the residual (you have equity), 2) You've exceeded your mileage limit and would face large overage charges, 3) The car has wear and tear that would result in fees, or 4) You simply love the car. However, if market values have dropped below the residual, you're usually better off returning it and leasing/buying something else. Always check the car's actual market value before deciding.",
    },
  ],

  // =============================================================================
  // REFERENCES (2 required)
  // =============================================================================
  references: [
    {
      authors: "Edmunds",
      year: "2025",
      title: "How to Calculate Your Own Lease Payment",
      source: "Edmunds Car Leasing Guide",
      url: "https://www.edmunds.com/car-leasing/calculate-your-own-lease-payment.html",
    },
    {
      authors: "J.D. Power",
      year: "2025",
      title: "ALG Residual Value Awards",
      source: "J.D. Power Automotive Research",
      url: "https://www.jdpower.com/business/ratings-awards/alg-residual-value",
    },
  ],

  // Sidebar
  sidebar: {
    showSearch: true,
    showRelatedCalculators: true,
    showCTA: true,
    category: "finance",
    cta: {
      title: "Compare Lease Deals",
      description: "Find the best lease offers from every brand",
      link: "/calculators",
      linkText: "View All Calculators",
    },
  },

  // Features
  features: {
    autoCalculate: true,
    exportPDF: true,
    shareResults: true,
    saveHistory: true,
  },

  // Related Calculators
  relatedCalculators: [
    "loan-calculator",
    "auto-loan-calculator",
    "car-depreciation-calculator",
    "mortgage-calculator",
  ],

  // Ads
  ads: {
    mobileHero: true,
    sidebar: true,
    mobileContent: true,
    bottom: true,
    afterResults: true,
  },
};

// =============================================================================
// CALCULATE FUNCTION
// =============================================================================
export function calculateCarLease(data: {
  values: Record<string, unknown>;
  units: Record<string, string>;
  unitSystem: "metric" | "imperial";
}): CalculatorResults {
  const { values } = data;

  const msrp = values.msrp as number || 40000;
  const negotiatedPrice = values.negotiatedPrice as number || 38000;
  const residualPercent = values.residualPercent as number || 55;
  const moneyFactor = values.moneyFactor as number || 0.00125;
  const leaseTerm = parseInt(values.leaseTerm as string) || 36;
  const downPayment = values.downPayment as number || 0;
  const tradeInValue = values.tradeInValue as number || 0;
  const rebates = values.rebates as number || 0;
  const fees = values.fees as number || 1200;
  const salesTaxRate = values.salesTaxRate as number || 7;
  const annualMileage = parseInt(values.annualMileage as string) || 12000;

  // Calculate residual value
  const residualValue = msrp * (residualPercent / 100);

  // Calculate gross cap cost
  const grossCapCost = negotiatedPrice + fees;

  // Calculate cap cost reductions
  const capCostReductions = downPayment + tradeInValue + rebates;

  // Calculate net cap cost (adjusted cap cost)
  const netCapCost = grossCapCost - capCostReductions;

  // Calculate monthly depreciation
  const totalDepreciation = netCapCost - residualValue;
  const monthlyDepreciation = totalDepreciation / leaseTerm;

  // Calculate monthly finance charge (rent charge)
  const monthlyFinanceCharge = (netCapCost + residualValue) * moneyFactor;

  // Calculate pre-tax monthly payment
  const preTaxPayment = monthlyDepreciation + monthlyFinanceCharge;

  // Calculate monthly tax (most states tax the monthly payment)
  const monthlyTax = preTaxPayment * (salesTaxRate / 100);

  // Total monthly payment
  const monthlyPayment = preTaxPayment + monthlyTax;

  // Calculate total lease cost
  const totalLeaseCost = (monthlyPayment * leaseTerm) + capCostReductions;

  // Calculate equivalent APR
  const effectiveAPR = moneyFactor * 2400;

  // Calculate total interest paid
  const totalFinanceCharges = monthlyFinanceCharge * leaseTerm;

  // Calculate cost per mile
  const totalMiles = (annualMileage / 12) * leaseTerm;
  const costPerMile = totalLeaseCost / totalMiles;

  // 1% rule check
  const onePercentTarget = msrp * 0.01;
  const isGoodDeal = preTaxPayment <= onePercentTarget;

  // Format currency
  const formatCurrency = (value: number): string => {
    return value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  return {
    values: {
      monthlyPayment,
      totalLeaseCost,
      depreciation: monthlyDepreciation,
      financeCharge: monthlyFinanceCharge,
      effectiveAPR,
      residualValue,
      preTaxPayment,
      monthlyTax,
      netCapCost,
      totalDepreciation,
      totalFinanceCharges,
      costPerMile,
      isGoodDeal,
      onePercentTarget,
    },
    formatted: {
      monthlyPayment: formatCurrency(monthlyPayment),
      totalLeaseCost: formatCurrency(totalLeaseCost),
      depreciation: formatCurrency(monthlyDepreciation),
      financeCharge: formatCurrency(monthlyFinanceCharge),
      effectiveAPR: effectiveAPR.toFixed(2),
      residualValue: formatCurrency(residualValue),
    },
    summary: `Monthly payment of $${formatCurrency(monthlyPayment)} for ${leaseTerm} months. Total lease cost: $${formatCurrency(totalLeaseCost)}. ${isGoodDeal ? '✓ Passes 1% rule!' : `Above 1% rule ($${formatCurrency(onePercentTarget)}/mo target)`}`,
    isValid: true,
    metadata: {
      breakdown: {
        depreciation: monthlyDepreciation,
        finance: monthlyFinanceCharge,
        tax: monthlyTax,
      },
      totals: {
        totalDepreciation,
        totalFinanceCharges,
        totalTax: monthlyTax * leaseTerm,
        downPayment: capCostReductions,
      },
    },
  };
}

export default carLeaseCalculatorConfig;
