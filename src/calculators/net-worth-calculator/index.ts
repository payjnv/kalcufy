import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";

export const netWorthCalculatorConfig: CalculatorConfigV4 = {
  id: "net-worth-calculator",
  version: "4.0",
  category: "finance",
  icon: "💎",

  presets: [
    {
      id: "youngPro",
      icon: "🚀",
      values: {
        includeLiquid: true, cashChecking: 5000, cashSavings: 12000, cds: 0,
        includeInvestments: true, stocks: 15000, bonds: 0, mutualFunds: 0, crypto: 2000,
        includeRetirement: true, retirement401k: 28000, ira: 8000, pension: 0,
        includeRealEstate: false,
        includePersonalProperty: true, vehicles: 18000, jewelry: 0, otherProperty: 2000,
        includeBusiness: false,
        includeMortgageDebt: false,
        includeConsumerDebt: true, creditCards: 3500, studentLoans: 28000, personalLoans: 0,
        includeVehicleDebt: true, autoLoans: 12000,
        includeOtherDebt: false,
      },
    },
    {
      id: "established",
      icon: "🏠",
      values: {
        includeLiquid: true, cashChecking: 15000, cashSavings: 45000, cds: 10000,
        includeInvestments: true, stocks: 85000, bonds: 20000, mutualFunds: 30000, crypto: 5000,
        includeRetirement: true, retirement401k: 180000, ira: 65000, pension: 0,
        includeRealEstate: true, primaryResidence: 420000, rentalProperty: 0, vacationHome: 0,
        includePersonalProperty: true, vehicles: 35000, jewelry: 8000, otherProperty: 5000,
        includeBusiness: false,
        includeMortgageDebt: true, mortgageBalance: 285000, heloc: 0,
        includeConsumerDebt: true, creditCards: 2000, studentLoans: 8000, personalLoans: 0,
        includeVehicleDebt: true, autoLoans: 18000,
        includeOtherDebt: false,
      },
    },
    {
      id: "highNetWorth",
      icon: "💰",
      values: {
        includeLiquid: true, cashChecking: 50000, cashSavings: 200000, cds: 100000,
        includeInvestments: true, stocks: 500000, bonds: 150000, mutualFunds: 200000, crypto: 25000,
        includeRetirement: true, retirement401k: 800000, ira: 300000, pension: 0,
        includeRealEstate: true, primaryResidence: 900000, rentalProperty: 350000, vacationHome: 250000,
        includePersonalProperty: true, vehicles: 80000, jewelry: 30000, otherProperty: 20000,
        includeBusiness: true, businessValue: 400000, lifeInsuranceCashValue: 50000,
        includeMortgageDebt: true, mortgageBalance: 600000, heloc: 0,
        includeConsumerDebt: true, creditCards: 5000, studentLoans: 0, personalLoans: 0,
        includeVehicleDebt: false,
        includeOtherDebt: false,
      },
    },
    {
      id: "retiree",
      icon: "🌴",
      values: {
        includeLiquid: true, cashChecking: 30000, cashSavings: 120000, cds: 80000,
        includeInvestments: true, stocks: 250000, bonds: 180000, mutualFunds: 120000, crypto: 0,
        includeRetirement: true, retirement401k: 650000, ira: 280000, pension: 0,
        includeRealEstate: true, primaryResidence: 380000, rentalProperty: 0, vacationHome: 0,
        includePersonalProperty: true, vehicles: 25000, jewelry: 15000, otherProperty: 5000,
        includeBusiness: false,
        includeMortgageDebt: false,
        includeConsumerDebt: false,
        includeVehicleDebt: false,
        includeOtherDebt: false,
      },
    },
    {
      id: "student",
      icon: "🎓",
      values: {
        includeLiquid: true, cashChecking: 1500, cashSavings: 3000, cds: 0,
        includeInvestments: false,
        includeRetirement: true, retirement401k: 2000, ira: 0, pension: 0,
        includeRealEstate: false,
        includePersonalProperty: true, vehicles: 8000, jewelry: 0, otherProperty: 500,
        includeBusiness: false,
        includeMortgageDebt: false,
        includeConsumerDebt: true, creditCards: 1200, studentLoans: 42000, personalLoans: 0,
        includeVehicleDebt: false,
        includeOtherDebt: false,
      },
    },
  ],

  t: {
    en: {
      name: "Net Worth Calculator",
      slug: "net-worth-calculator",
      subtitle: "Add up everything you own and subtract everything you owe. See your total net worth, asset breakdown, and how you compare to benchmarks by age.",
      breadcrumb: "Net Worth",
      seo: {
        title: "Net Worth Calculator - Assets vs Liabilities | Free Tool",
        description: "Calculate your net worth instantly. Enter assets (savings, investments, real estate, retirement) and liabilities (mortgage, loans, credit cards) to see your financial picture.",
        shortDescription: "Calculate your total net worth: assets minus liabilities.",
        keywords: ["net worth calculator", "calculate net worth", "assets vs liabilities", "personal net worth", "wealth calculator", "net worth by age"],
      },
      calculator: { yourInformation: "Your Financial Picture" },
      ui: { yourInformation: "Your Financial Picture", calculate: "Calculate Net Worth", reset: "Reset", results: "Net Worth Summary" },
      inputs: {
        // Liquid
        includeLiquid: { label: "Liquid Assets — Cash & Savings", helpText: "Cash, bank accounts, CDs — money you can access immediately" },
        cashChecking: { label: "Checking Accounts", helpText: "All checking account balances combined" },
        cashSavings: { label: "Savings Accounts", helpText: "High-yield savings, money market accounts" },
        cds: { label: "CDs & Money Market", helpText: "Certificates of deposit, money market funds" },
        // Investments
        includeInvestments: { label: "Investments", helpText: "Brokerage accounts, stocks, bonds, crypto" },
        stocks: { label: "Stocks & ETFs", helpText: "Individual stocks, ETFs, brokerage account value" },
        bonds: { label: "Bonds", helpText: "US Treasury, municipal, corporate bonds" },
        mutualFunds: { label: "Mutual Funds", helpText: "Actively managed funds (non-retirement)" },
        crypto: { label: "Cryptocurrency", helpText: "Bitcoin, Ethereum, other crypto (current market value)" },
        // Retirement
        includeRetirement: { label: "Retirement Accounts", helpText: "401(k), IRA, pension — long-term retirement savings" },
        retirement401k: { label: "401(k) / 403(b)", helpText: "Current vested balance in employer retirement plan" },
        ira: { label: "IRA / Roth IRA", helpText: "Individual retirement account balances" },
        pension: { label: "Pension (Present Value)", helpText: "Estimated lump-sum value of defined benefit pension" },
        // Real Estate
        includeRealEstate: { label: "Real Estate", helpText: "Current market value of all properties" },
        primaryResidence: { label: "Primary Residence", helpText: "Current market value of your home (not equity)" },
        rentalProperty: { label: "Rental / Investment Property", helpText: "Market value of rental or investment properties" },
        vacationHome: { label: "Vacation Home", helpText: "Market value of secondary residence" },
        // Personal Property
        includePersonalProperty: { label: "Personal Property", helpText: "Vehicles, jewelry, valuables" },
        vehicles: { label: "Vehicles", helpText: "Current market value of all cars, motorcycles, boats" },
        jewelry: { label: "Jewelry & Collectibles", helpText: "Appraised value of jewelry, art, rare items" },
        otherProperty: { label: "Other Valuables", helpText: "Electronics, furniture, other personal items" },
        // Business
        includeBusiness: { label: "Business & Other Assets", helpText: "Business equity, life insurance cash value" },
        businessValue: { label: "Business Equity", helpText: "Your ownership stake value in any business" },
        lifeInsuranceCashValue: { label: "Life Insurance Cash Value", helpText: "Cash value in whole/universal life policies only" },
        // Mortgage Debt
        includeMortgageDebt: { label: "Mortgage Debt", helpText: "Outstanding balances on home loans" },
        mortgageBalance: { label: "Mortgage Balance", helpText: "Remaining principal on your primary mortgage" },
        heloc: { label: "Home Equity Loan / HELOC", helpText: "Outstanding balance on home equity line of credit" },
        // Consumer Debt
        includeConsumerDebt: { label: "Consumer Debt", helpText: "Credit cards, student loans, personal loans" },
        creditCards: { label: "Credit Card Balances", helpText: "Total outstanding balances on all credit cards" },
        studentLoans: { label: "Student Loans", helpText: "Total remaining student loan balance" },
        personalLoans: { label: "Personal Loans", helpText: "Other unsecured loan balances" },
        // Vehicle Debt
        includeVehicleDebt: { label: "Vehicle Loans", helpText: "Outstanding auto loan balances" },
        autoLoans: { label: "Auto Loans", helpText: "Remaining balance on all vehicle loans" },
        // Other Debt
        includeOtherDebt: { label: "Other Debt", helpText: "Tax debt, medical debt, other liabilities" },
        taxDebt: { label: "Tax Debt", helpText: "Outstanding IRS or state tax balances" },
        medicalDebt: { label: "Medical Debt", helpText: "Unpaid medical bills" },
        otherDebt: { label: "Other Liabilities", helpText: "Any other debts not listed above" },
      },
      results: {
        netWorth: { label: "Net Worth" },
        totalAssets: { label: "Total Assets" },
        totalLiabilities: { label: "Total Liabilities" },
        debtToAssetRatio: { label: "Debt-to-Asset Ratio" },
        liquidAssets: { label: "Liquid Assets" },
        investableAssets: { label: "Investable Assets" },
        realEstateEquity: { label: "Real Estate Equity" },
        liquidityRatio: { label: "Liquidity Ratio" },
      },
      presets: {
        youngPro: { label: "Young Professional", description: "Early career — student loans, starting to invest" },
        established: { label: "Established Adult", description: "Mid-career — home, solid investments, 401(k)" },
        highNetWorth: { label: "High Net Worth", description: "$1M+ — real estate, business, full portfolio" },
        retiree: { label: "Retiree", description: "Retired — home paid off, living on savings" },
        student: { label: "Recent Graduate", description: "Just starting — student debt, minimal assets" },
      },
      values: { "%": "%", "$": "$" },
      formats: { summary: "Net Worth: {netWorth} — Assets: {assets} — Liabilities: {liabilities}" },
      chart: {
        title: "Assets vs Liabilities Breakdown",
        xLabel: "Category",
        yLabel: "Amount ($)",
        series: { assets: "Assets", liabilities: "Liabilities" },
      },
      infoCards: {
        summary: {
          title: "Net Worth Summary",
          items: ["Net Worth", "Total Assets", "Total Liabilities", "Debt-to-Asset Ratio"],
        },
        breakdown: {
          title: "Asset Breakdown",
          items: ["Liquid Assets", "Investable Assets", "Real Estate Equity", "Liquidity Ratio"],
        },
        tips: {
          title: "Net Worth Tips",
          items: [
            "Track net worth quarterly — the trend over time matters more than any single number",
            "Calculate 'investable net worth' (exclude home) separately for retirement planning",
            "A debt-to-asset ratio below 30% is generally healthy — above 50% is a warning sign",
            "By 30, target 1x annual salary saved. By 40: 3x. By 50: 6x. By 60: 8x (Fidelity benchmarks)",
          ],
        },
      },
      education: {
        whatIs: {
          title: "What Is Net Worth and Why Does It Matter?",
          content: "Net worth is the single most comprehensive snapshot of your financial health. It answers one question: if you sold everything you own and paid off every debt, how much would be left? Unlike income (what comes in) or credit score (how responsibly you borrow), net worth shows the full picture — what you've actually accumulated. A high income with massive debt can produce a negative net worth. A modest income with disciplined saving can build real wealth.",
        },
        howItWorks: {
          title: "Assets vs Liabilities: What to Include",
          content: "Assets are everything you own that has monetary value: cash in the bank, investments in your brokerage account, the current market value of your home and vehicles, retirement account balances, and business equity. Liabilities are everything you owe: your mortgage balance, auto loans, student loans, credit card balances, and any other debt. Note that your home's full market value is an asset, but your mortgage is a separate liability — the difference (equity) contributes positively to net worth.",
        },
        considerations: {
          title: "Important Net Worth Considerations",
          items: [
            { text: "Use current market value for assets, not purchase price — vehicles depreciate, homes appreciate over time", type: "warning" },
            { text: "Retirement accounts count at their current balance, but withdrawals will be taxed — factor in a 25-30% haircut for planning", type: "info" },
            { text: "Your primary home is an illiquid asset — track 'investable net worth' (minus home equity) for a clearer retirement picture", type: "info" },
            { text: "Crypto and business equity are the most volatile asset categories — mark to market and reassess quarterly", type: "warning" },
            { text: "Negative net worth is common and normal for young adults with student loans — focus on improving the trend, not the absolute number", type: "info" },
            { text: "Net worth doesn't equal financial security — liquidity matters. $500K in home equity won't pay your bills next month", type: "warning" },
          ],
        },
        benchmarks: {
          title: "Net Worth Benchmarks by Age",
          items: [
            { text: "Age 25: Median ~$10,000 | Target (1x salary): $50,000–$75,000 | Top 10%: $150,000+", type: "info" },
            { text: "Age 30: Median ~$35,000 | Target (1x salary): $60,000–$90,000 | Top 10%: $400,000+", type: "info" },
            { text: "Age 40: Median ~$135,000 | Target (3x salary): $200,000–$300,000 | Top 10%: $1.1M+", type: "info" },
            { text: "Age 50: Median ~$250,000 | Target (6x salary): $400,000–$600,000 | Top 10%: $2.5M+", type: "info" },
            { text: "Age 60: Median ~$400,000 | Target (8x salary): $600,000–$900,000 | Top 10%: $4M+", type: "info" },
            { text: "Source: Federal Reserve Survey of Consumer Finances 2022 — medians include home equity", type: "warning" },
          ],
        },
        examples: {
          title: "Net Worth Calculation Examples",
          description: "Real-world examples at different life stages",
          examples: [
            {
              title: "Age 32 — Young Professional",
              steps: [
                "Assets: Checking $5,000 + Savings $12,000 + Stocks $15,000 + Crypto $2,000 + 401(k) $28,000 + IRA $8,000 + Car $18,000 = $88,000",
                "Liabilities: Credit cards $3,500 + Student loans $28,000 + Auto loan $12,000 = $43,500",
                "Net Worth = $88,000 − $43,500 = $44,500",
              ],
              result: "At or above median for age 32. Focus: aggressively pay student loans while maxing 401(k) match.",
            },
            {
              title: "Age 45 — Established Homeowner",
              steps: [
                "Assets: Cash $60,000 + Investments $135,000 + 401(k) $180,000 + IRA $65,000 + Home $420,000 + Car $35,000 = $895,000",
                "Liabilities: Mortgage $285,000 + Credit cards $2,000 + Student loans $8,000 + Auto loan $18,000 = $313,000",
                "Net Worth = $895,000 − $313,000 = $582,000",
              ],
              result: "Well above median. On track for retirement. Investable net worth (ex-home): $162,000 — consider accelerating investments.",
            },
          ],
        },
      },
      faqs: [
        { question: "Should I include my home in my net worth?", answer: "Yes — your home's current market value is an asset, and your remaining mortgage is a separate liability. The difference (home equity) adds to net worth. However, also track your 'investable net worth' excluding home equity, since you can't easily spend home equity in retirement without selling or borrowing against it." },
        { question: "What is a good net worth for my age?", answer: "Fidelity's benchmarks: by 30, aim to have saved 1x your annual salary. By 40: 3x. By 50: 6x. By 60: 8x. For US medians: the Federal Reserve finds median net worth near $35,000 for ages 25-34, $135,000 for 35-44, $250,000 for 45-54, and $400,000 for 55-64. Top 10% at each bracket is 5-10x higher." },
        { question: "Is a negative net worth bad?", answer: "It's extremely common and not necessarily bad — especially for people under 35 with student loans. The critical question is: is your net worth improving? Someone with -$30,000 net worth who's paying off debt and building retirement savings is in a better trajectory than someone with $20,000 net worth but no savings and growing credit card debt." },
        { question: "Should I count my 401(k) at its full value?", answer: "For calculating net worth: yes, use the full current balance. For retirement planning: mentally discount it by 20-30%, because traditional 401(k) and IRA withdrawals are taxed as ordinary income. Roth accounts are more valuable because withdrawals are tax-free — some people include them at full value and note the tax advantage separately." },
        { question: "What is a healthy debt-to-asset ratio?", answer: "Below 30% is generally considered healthy. 30-50% is moderate and manageable for most people. Above 50% — especially if concentrated in high-interest debt — is a warning sign. Young adults with mortgages often have ratios of 40-60%, which is normal since homes are a major asset with corresponding debt." },
        { question: "How often should I calculate my net worth?", answer: "Quarterly is the sweet spot for most people. Monthly can create anxiety from normal market fluctuations. Annually is too infrequent to catch problems or celebrate progress. Many people calculate monthly if they're aggressively paying down debt or building wealth, and quarterly once they've reached financial stability." },
      ],
      references: [
        { authors: "Federal Reserve", year: "2023", title: "Survey of Consumer Finances 2022", source: "Federal Reserve Board", url: "https://www.federalreserve.gov/publications/files/scf23.pdf" },
        { authors: "Fidelity Investments", year: "2024", title: "Retirement Savings Guidelines — How Much to Save by Age", source: "Fidelity", url: "https://www.fidelity.com/viewpoints/retirement/how-much-money-should-I-save" },
        { authors: "Internal Revenue Service", year: "2024", title: "Retirement Plans FAQs regarding IRAs", source: "IRS", url: "https://www.irs.gov/retirement-plans/retirement-plans-faqs-regarding-iras" },
      ],
      rating: { title: "Rate this Calculator", share: "Share", copied: "Copied!", copyLink: "Copy Link", clickToRate: "Click to rate", youRated: "You rated", stars: "stars", averageFrom: "average from", ratings: "ratings" },
      common: { home: "Home", calculators: "Calculators" },
      buttons: { calculate: "Calculate Net Worth", reset: "Reset", pdf: "PDF", csv: "CSV", excel: "Excel", save: "Save", saved: "Saved", saving: "Saving..." },
      share: { title: "Net Worth Calculator", text: "Calculate your total net worth — assets minus liabilities" },
      accessibility: { calculatorLabel: "Net Worth Calculator", resultsLabel: "Net Worth Results" },
      sources: { title: "Sources" },
    },
  },

  inputs: [
    // ── LIQUID ASSETS ──
    { id: "includeLiquid", type: "toggle", defaultValue: true },
    { id: "cashChecking", type: "number", defaultValue: 5000, placeholder: "5000", min: 0, max: 10000000, unitType: "currency", syncGroup: false, showWhen: { field: "includeLiquid", value: true } },
    { id: "cashSavings", type: "number", defaultValue: 10000, placeholder: "10000", min: 0, max: 10000000, unitType: "currency", syncGroup: false, showWhen: { field: "includeLiquid", value: true } },
    { id: "cds", type: "number", defaultValue: null, placeholder: "0", min: 0, max: 10000000, unitType: "currency", syncGroup: false, showWhen: { field: "includeLiquid", value: true } },

    // ── INVESTMENTS ──
    { id: "includeInvestments", type: "toggle", defaultValue: false },
    { id: "stocks", type: "number", defaultValue: null, placeholder: "0", min: 0, max: 50000000, unitType: "currency", syncGroup: false, showWhen: { field: "includeInvestments", value: true } },
    { id: "bonds", type: "number", defaultValue: null, placeholder: "0", min: 0, max: 50000000, unitType: "currency", syncGroup: false, showWhen: { field: "includeInvestments", value: true } },
    { id: "mutualFunds", type: "number", defaultValue: null, placeholder: "0", min: 0, max: 50000000, unitType: "currency", syncGroup: false, showWhen: { field: "includeInvestments", value: true } },
    { id: "crypto", type: "number", defaultValue: null, placeholder: "0", min: 0, max: 50000000, unitType: "currency", syncGroup: false, showWhen: { field: "includeInvestments", value: true } },

    // ── RETIREMENT ──
    { id: "includeRetirement", type: "toggle", defaultValue: true },
    { id: "retirement401k", type: "number", defaultValue: 0, placeholder: "0", min: 0, max: 50000000, unitType: "currency", syncGroup: false, showWhen: { field: "includeRetirement", value: true } },
    { id: "ira", type: "number", defaultValue: null, placeholder: "0", min: 0, max: 50000000, unitType: "currency", syncGroup: false, showWhen: { field: "includeRetirement", value: true } },
    { id: "pension", type: "number", defaultValue: null, placeholder: "0", min: 0, max: 50000000, unitType: "currency", syncGroup: false, showWhen: { field: "includeRetirement", value: true } },

    // ── REAL ESTATE ──
    { id: "includeRealEstate", type: "toggle", defaultValue: false },
    { id: "primaryResidence", type: "number", defaultValue: null, placeholder: "350000", min: 0, max: 100000000, unitType: "currency", syncGroup: false, showWhen: { field: "includeRealEstate", value: true } },
    { id: "rentalProperty", type: "number", defaultValue: null, placeholder: "0", min: 0, max: 100000000, unitType: "currency", syncGroup: false, showWhen: { field: "includeRealEstate", value: true } },
    { id: "vacationHome", type: "number", defaultValue: null, placeholder: "0", min: 0, max: 100000000, unitType: "currency", syncGroup: false, showWhen: { field: "includeRealEstate", value: true } },

    // ── PERSONAL PROPERTY ──
    { id: "includePersonalProperty", type: "toggle", defaultValue: false },
    { id: "vehicles", type: "number", defaultValue: null, placeholder: "20000", min: 0, max: 5000000, unitType: "currency", syncGroup: false, showWhen: { field: "includePersonalProperty", value: true } },
    { id: "jewelry", type: "number", defaultValue: null, placeholder: "0", min: 0, max: 5000000, unitType: "currency", syncGroup: false, showWhen: { field: "includePersonalProperty", value: true } },
    { id: "otherProperty", type: "number", defaultValue: null, placeholder: "0", min: 0, max: 5000000, unitType: "currency", syncGroup: false, showWhen: { field: "includePersonalProperty", value: true } },

    // ── BUSINESS & OTHER ──
    { id: "includeBusiness", type: "toggle", defaultValue: false },
    { id: "businessValue", type: "number", defaultValue: null, placeholder: "0", min: 0, max: 100000000, unitType: "currency", syncGroup: false, showWhen: { field: "includeBusiness", value: true } },
    { id: "lifeInsuranceCashValue", type: "number", defaultValue: null, placeholder: "0", min: 0, max: 5000000, unitType: "currency", syncGroup: false, showWhen: { field: "includeBusiness", value: true } },

    // ── MORTGAGE DEBT ──
    { id: "includeMortgageDebt", type: "toggle", defaultValue: false },
    { id: "mortgageBalance", type: "number", defaultValue: null, placeholder: "0", min: 0, max: 100000000, unitType: "currency", syncGroup: false, showWhen: { field: "includeMortgageDebt", value: true } },
    { id: "heloc", type: "number", defaultValue: null, placeholder: "0", min: 0, max: 5000000, unitType: "currency", syncGroup: false, showWhen: { field: "includeMortgageDebt", value: true } },

    // ── CONSUMER DEBT ──
    { id: "includeConsumerDebt", type: "toggle", defaultValue: false },
    { id: "creditCards", type: "number", defaultValue: null, placeholder: "0", min: 0, max: 1000000, unitType: "currency", syncGroup: false, showWhen: { field: "includeConsumerDebt", value: true } },
    { id: "studentLoans", type: "number", defaultValue: null, placeholder: "0", min: 0, max: 1000000, unitType: "currency", syncGroup: false, showWhen: { field: "includeConsumerDebt", value: true } },
    { id: "personalLoans", type: "number", defaultValue: null, placeholder: "0", min: 0, max: 1000000, unitType: "currency", syncGroup: false, showWhen: { field: "includeConsumerDebt", value: true } },

    // ── VEHICLE DEBT ──
    { id: "includeVehicleDebt", type: "toggle", defaultValue: false },
    { id: "autoLoans", type: "number", defaultValue: null, placeholder: "0", min: 0, max: 500000, unitType: "currency", syncGroup: false, showWhen: { field: "includeVehicleDebt", value: true } },

    // ── OTHER DEBT ──
    { id: "includeOtherDebt", type: "toggle", defaultValue: false },
    { id: "taxDebt", type: "number", defaultValue: null, placeholder: "0", min: 0, max: 1000000, unitType: "currency", syncGroup: false, showWhen: { field: "includeOtherDebt", value: true } },
    { id: "medicalDebt", type: "number", defaultValue: null, placeholder: "0", min: 0, max: 1000000, unitType: "currency", syncGroup: false, showWhen: { field: "includeOtherDebt", value: true } },
    { id: "otherDebt", type: "number", defaultValue: null, placeholder: "0", min: 0, max: 1000000, unitType: "currency", syncGroup: false, showWhen: { field: "includeOtherDebt", value: true } },
  ],

  inputGroups: [],

  results: [
    { id: "netWorth", type: "currency", primary: true, highlight: true },
    { id: "totalAssets", type: "currency" },
    { id: "totalLiabilities", type: "currency" },
    { id: "debtToAssetRatio", type: "percentage" },
    { id: "liquidAssets", type: "currency" },
    { id: "investableAssets", type: "currency" },
    { id: "realEstateEquity", type: "currency" },
    { id: "liquidityRatio", type: "percentage" },
  ],

  infoCards: [
    {
      id: "summary",
      type: "list",
      icon: "💎",
      items: [
        { id: "netWorth", valueKey: "netWorth" },
        { id: "totalAssets", valueKey: "totalAssets" },
        { id: "totalLiabilities", valueKey: "totalLiabilities" },
        { id: "debtToAssetRatio", valueKey: "debtToAssetRatio" },
      ],
    },
    {
      id: "breakdown",
      type: "list",
      icon: "📊",
      items: [
        { id: "liquidAssets", valueKey: "liquidAssets" },
        { id: "investableAssets", valueKey: "investableAssets" },
        { id: "realEstateEquity", valueKey: "realEstateEquity" },
        { id: "liquidityRatio", valueKey: "liquidityRatio" },
      ],
    },
    { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  chart: {
    id: "netWorthChart",
    type: "bar",
    xKey: "category",
    series: [
      { key: "assets", color: "#3b82f6" },
      { key: "liabilities", color: "#ef4444" },
    ],
    stacked: false,
  },

  referenceData: [],

  educationSections: [
    { id: "whatIs", type: "prose", icon: "📖" },
    { id: "howItWorks", type: "prose", icon: "⚡" },
    { id: "considerations", type: "list", icon: "⚠️", itemCount: 6 },
    { id: "benchmarks", type: "list", icon: "📈", itemCount: 6 },
    { id: "examples", type: "code-example", icon: "🧮", columns: 2, exampleCount: 2 },
  ],

  faqs: [{ id: "0" }, { id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }],

  references: [
    { authors: "Federal Reserve", year: "2023", title: "Survey of Consumer Finances 2022", source: "Federal Reserve Board", url: "https://www.federalreserve.gov/publications/files/scf23.pdf" },
    { authors: "Fidelity Investments", year: "2024", title: "Retirement Savings Guidelines", source: "Fidelity", url: "https://www.fidelity.com/viewpoints/retirement/how-much-money-should-I-save" },
    { authors: "Internal Revenue Service", year: "2024", title: "Retirement Plans FAQs regarding IRAs", source: "IRS", url: "https://www.irs.gov/retirement-plans/retirement-plans-faqs-regarding-iras" },
  ],

  hero: { showImage: true, showBadges: true, showReviews: true },
  sidebar: { showRelated: true, showAds: true },
  features: { history: true, favorites: true, share: true, export: true },
  relatedCalculators: ["budget-calculator", "compound-interest-calculator", "retirement-calculator", "debt-payoff-calculator"],
  ads: { enabled: true, slots: ["sidebar", "results-below"] },
};

export function calculateNetWorth(data: {
  values: Record<string, unknown>;
  fieldUnits?: Record<string, string>;
  t?: Record<string, unknown>;
}): CalculatorResults {
  const { values, fieldUnits = {} } = data;
  const currencyUnit = fieldUnits["cashChecking"] ?? "USD";
  const sym = currencyUnit === "EUR" ? "€" : currencyUnit === "GBP" ? "£" : currencyUnit === "BRL" ? "R$" : "$";
  const fmt = (n: number) => {
    const abs = Math.abs(n);
    const s = abs >= 1000000
      ? `${(abs / 1000000).toFixed(2)}M`
      : abs >= 1000 ? abs.toLocaleString("en-US", { maximumFractionDigits: 0 }) : abs.toFixed(0);
    return n < 0 ? `-${sym}${s}` : `${sym}${s}`;
  };
  const g = (field: string, toggle: string) => (!values[toggle] ? 0 : (values[field] as number) ?? 0);

  // Assets
  const liquidAssets = g("cashChecking", "includeLiquid") + g("cashSavings", "includeLiquid") + g("cds", "includeLiquid");
  const investments = g("stocks", "includeInvestments") + g("bonds", "includeInvestments") + g("mutualFunds", "includeInvestments") + g("crypto", "includeInvestments");
  const retirement = g("retirement401k", "includeRetirement") + g("ira", "includeRetirement") + g("pension", "includeRetirement");
  const realEstateValue = g("primaryResidence", "includeRealEstate") + g("rentalProperty", "includeRealEstate") + g("vacationHome", "includeRealEstate");
  const personalProperty = g("vehicles", "includePersonalProperty") + g("jewelry", "includePersonalProperty") + g("otherProperty", "includePersonalProperty");
  const business = g("businessValue", "includeBusiness") + g("lifeInsuranceCashValue", "includeBusiness");
  const totalAssets = liquidAssets + investments + retirement + realEstateValue + personalProperty + business;

  // Liabilities
  const mortgageDebt = g("mortgageBalance", "includeMortgageDebt") + g("heloc", "includeMortgageDebt");
  const consumerDebt = g("creditCards", "includeConsumerDebt") + g("studentLoans", "includeConsumerDebt") + g("personalLoans", "includeConsumerDebt");
  const vehicleDebt = g("autoLoans", "includeVehicleDebt");
  const otherDebt = g("taxDebt", "includeOtherDebt") + g("medicalDebt", "includeOtherDebt") + g("otherDebt", "includeOtherDebt");
  const totalLiabilities = mortgageDebt + consumerDebt + vehicleDebt + otherDebt;

  const netWorth = totalAssets - totalLiabilities;
  const debtToAssetRatio = totalAssets > 0 ? (totalLiabilities / totalAssets) * 100 : 0;
  const investableAssets = liquidAssets + investments + retirement;
  const realEstateEquity = realEstateValue - mortgageDebt;
  const liquidityRatio = totalAssets > 0 ? (liquidAssets / totalAssets) * 100 : 0;

  // Always show results if liquid toggle is on (even if all zeros)
  if (!values["includeLiquid"] && totalAssets === 0 && totalLiabilities === 0) {
    return { values: {}, formatted: {}, summary: "", isValid: false };
  }

  const chartData = [
    { category: "Cash & Savings", assets: Math.round(liquidAssets), liabilities: 0 },
    { category: "Investments", assets: Math.round(investments), liabilities: 0 },
    { category: "Retirement", assets: Math.round(retirement), liabilities: 0 },
    { category: "Real Estate", assets: Math.round(realEstateValue), liabilities: Math.round(mortgageDebt) },
    { category: "Personal", assets: Math.round(personalProperty + business), liabilities: 0 },
    { category: "Consumer Debt", assets: 0, liabilities: Math.round(consumerDebt + vehicleDebt + otherDebt) },
  ].filter(row => row.assets > 0 || row.liabilities > 0);

  return {
    values: { netWorth, totalAssets, totalLiabilities, debtToAssetRatio, liquidAssets, investableAssets, realEstateEquity, liquidityRatio },
    formatted: {
      netWorth: fmt(netWorth),
      totalAssets: fmt(totalAssets),
      totalLiabilities: fmt(totalLiabilities),
      debtToAssetRatio: `${debtToAssetRatio.toFixed(1)}%`,
      liquidAssets: fmt(liquidAssets),
      investableAssets: fmt(investableAssets),
      realEstateEquity: fmt(realEstateEquity),
      liquidityRatio: `${liquidityRatio.toFixed(1)}%`,
    },
    summary: `Net Worth: ${fmt(netWorth)} — Assets: ${fmt(totalAssets)} — Liabilities: ${fmt(totalLiabilities)}`,
    isValid: true,
    metadata: { chartData },
  };
}

export default netWorthCalculatorConfig;
