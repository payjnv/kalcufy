import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4/types/engine.types";

export const budgetCalculatorConfig: CalculatorConfigV4 = {
  id: "budget-calculator",
  version: "4.0",
  category: "finance",
  icon: "💰",

  presets: [
    {
      id: "single",
      icon: "🧑",
      values: {
        monthlyIncome: 4500, hasSecondIncome: false, budgetMethod: "50-30-20",
        includeHousing: true, mortgage: 1200, utilities: 150, internet: 60,
        includeFood: true, groceries: 400, diningOut: 200,
        includeTransport: true, carPayment: 300, carInsurance: 100, gasoline: 120,
        includeHealthcare: true, healthInsurance: 200, medicalExpenses: 0, gym: 40,
        includeDebt: false,
        includeEntertainment: true, streaming: 50, entertainment: 150, travel: 100,
        includeSavings: true, retirement401k: 300, emergencyFund: 200, investments: 100,
        includeOther: false,
      },
    },
    {
      id: "couple",
      icon: "👫",
      values: {
        monthlyIncome: 5500, hasSecondIncome: true, partnerIncome: 3200, budgetMethod: "50-30-20",
        includeHousing: true, mortgage: 2200, utilities: 200, internet: 80,
        includeFood: true, groceries: 700, diningOut: 400,
        includeTransport: true, carPayment: 600, carInsurance: 200, gasoline: 200,
        includeHealthcare: true, healthInsurance: 450, medicalExpenses: 0, gym: 80,
        includeDebt: true, creditCard: 0, studentLoan: 300, personalLoan: 0,
        includeEntertainment: true, streaming: 80, entertainment: 300, travel: 200,
        includeSavings: true, retirement401k: 800, emergencyFund: 300, investments: 200,
        includeOther: true, petExpenses: 100, gifts: 100, miscellaneous: 150,
      },
    },
    {
      id: "family",
      icon: "👨‍👩‍👧",
      values: {
        monthlyIncome: 7000, hasSecondIncome: true, partnerIncome: 4000, budgetMethod: "60-30-10",
        includeHousing: true, mortgage: 2500, utilities: 250, internet: 80,
        includeFood: true, groceries: 900, diningOut: 300,
        includeTransport: true, carPayment: 800, carInsurance: 280, gasoline: 250,
        includeHealthcare: true, healthInsurance: 600, medicalExpenses: 0, gym: 0,
        includeChildren: true, childcare: 1200, schoolTuition: 0, childActivities: 150,
        includeDebt: true, creditCard: 0, studentLoan: 400, personalLoan: 0,
        includeEntertainment: true, streaming: 60, entertainment: 200, travel: 150,
        includeSavings: true, retirement401k: 600, emergencyFund: 200, investments: 100,
        includeOther: false,
      },
    },
    {
      id: "fire",
      icon: "🔥",
      values: {
        monthlyIncome: 8000, hasSecondIncome: false, budgetMethod: "custom", needsPercent: 50, wantsPercent: 15,
        includeHousing: true, mortgage: 1500, utilities: 120, internet: 50,
        includeFood: true, groceries: 400, diningOut: 80,
        includeTransport: true, carPayment: 0, carInsurance: 80, gasoline: 80,
        includeHealthcare: true, healthInsurance: 300, medicalExpenses: 0, gym: 0,
        includeDebt: false,
        includeEntertainment: true, streaming: 20, entertainment: 50, travel: 100,
        includeSavings: true, retirement401k: 1500, emergencyFund: 500, investments: 1200,
        includeOther: false,
      },
    },
    {
      id: "student",
      icon: "🎓",
      values: {
        monthlyIncome: 2200, hasSecondIncome: false, budgetMethod: "60-20-20",
        includeHousing: true, mortgage: 700, utilities: 80, internet: 50,
        includeFood: true, groceries: 300, diningOut: 150,
        includeTransport: false,
        includeHealthcare: false,
        includeDebt: true, creditCard: 50, studentLoan: 200, personalLoan: 0,
        includeEntertainment: true, streaming: 30, entertainment: 80, travel: 30,
        includeSavings: true, retirement401k: 0, emergencyFund: 100, investments: 50,
        includeOther: false,
      },
    },
  ],

  t: {
    en: {
      name: "Budget Calculator",
      slug: "budget-calculator",
      subtitle: "Enter your income and monthly expenses by category. See your balance, savings rate, and how your spending compares to the 50/30/20 rule.",
      breadcrumb: "Budget",
      seo: {
        title: "Budget Calculator - Monthly Budget Planner & 50/30/20 Rule",
        description: "Free monthly budget calculator. Track income and expenses by category — housing, food, transport, savings — and see your balance instantly.",
        shortDescription: "Plan your monthly budget by expense category.",
        keywords: ["budget calculator", "monthly budget planner", "50 30 20 rule calculator", "personal budget calculator", "expense tracker monthly"],
      },
      calculator: { yourInformation: "Your Monthly Budget" },
      ui: { yourInformation: "Your Monthly Budget", calculate: "Calculate Budget", reset: "Reset", results: "Budget Summary" },
      inputs: {
        monthlyIncome: { label: "Monthly Take-Home Pay", helpText: "Your net income after taxes (what hits your bank account)" },
        hasSecondIncome: { label: "Add partner / second income", helpText: "Include a second earner for household budget" },
        partnerIncome: { label: "Partner's Monthly Take-Home", helpText: "After-tax income for your partner" },
        budgetMethod: { label: "Budget Framework", helpText: "Used to show how your spending compares to each target.", options: { "50-30-20": "50/30/20 — Balanced (Most Popular)", "60-30-10": "60/30/10 — High Cost of Living", "70-20-10": "70/20/10 — Tight Budget", "60-20-20": "60/20/20 — Savings Focus", custom: "Custom Percentages" } },
        needsPercent: { label: "Needs %", helpText: "Housing, food, transport, insurance, minimum debt payments" },
        wantsPercent: { label: "Wants %", helpText: "Dining out, entertainment, subscriptions, hobbies" },
        includeHousing: { label: "Include Housing & Utilities", helpText: "Rent, mortgage, electricity, internet" },
        mortgage: { label: "Rent / Mortgage", helpText: "Monthly rent or mortgage payment" },
        utilities: { label: "Utilities", helpText: "Electricity, gas, water combined" },
        internet: { label: "Internet & Phone", helpText: "Home internet + mobile phone" },
        includeFood: { label: "Include Food", helpText: "Groceries and dining out" },
        groceries: { label: "Groceries", helpText: "Supermarket, household supplies" },
        diningOut: { label: "Dining Out & Takeout", helpText: "Restaurants, food delivery, coffee shops" },
        includeTransport: { label: "Include Transportation", helpText: "Car payment, insurance, gas, transit" },
        carPayment: { label: "Car Payment", helpText: "Monthly auto loan payment(s)" },
        carInsurance: { label: "Car Insurance", helpText: "Monthly auto insurance" },
        gasoline: { label: "Gas & Transit", helpText: "Fuel, bus, Uber, metro" },
        includeHealthcare: { label: "Include Healthcare", helpText: "Insurance, medical expenses, gym" },
        healthInsurance: { label: "Health Insurance", helpText: "Monthly premium" },
        medicalExpenses: { label: "Medical Out-of-Pocket", helpText: "Co-pays, prescriptions, dental" },
        gym: { label: "Gym / Fitness", helpText: "Gym membership, fitness classes" },
        includeChildren: { label: "Include Children & Family", helpText: "Childcare, school, activities" },
        childcare: { label: "Childcare / Daycare", helpText: "Daycare, babysitter, after-school" },
        schoolTuition: { label: "School / Tuition", helpText: "Private school, college, supplies" },
        childActivities: { label: "Kids Activities", helpText: "Sports, music lessons, camps" },
        includeDebt: { label: "Include Debt Payments", helpText: "Credit cards, student loans, personal loans" },
        creditCard: { label: "Credit Card Payments", helpText: "Minimum monthly payments" },
        studentLoan: { label: "Student Loan", helpText: "Monthly student loan payment" },
        personalLoan: { label: "Personal Loan", helpText: "Other loan payments" },
        includeEntertainment: { label: "Include Entertainment & Subscriptions", helpText: "Streaming, hobbies, travel" },
        streaming: { label: "Streaming & Subscriptions", helpText: "Netflix, Spotify, Disney+, apps" },
        entertainment: { label: "Entertainment & Hobbies", helpText: "Movies, concerts, sports, hobbies" },
        travel: { label: "Travel & Vacation", helpText: "Monthly savings toward trips" },
        includeSavings: { label: "Include Savings & Investments", helpText: "Retirement, emergency fund, investments" },
        retirement401k: { label: "Retirement (401k / IRA)", helpText: "Monthly retirement contributions" },
        emergencyFund: { label: "Emergency Fund", helpText: "Building your 3-6 month buffer" },
        investments: { label: "Investments", helpText: "Brokerage, index funds, crypto" },
        includeOther: { label: "Include Other Expenses", helpText: "Pets, gifts, miscellaneous" },
        petExpenses: { label: "Pet Expenses", helpText: "Food, vet, grooming" },
        gifts: { label: "Gifts & Donations", helpText: "Birthdays, holidays, charity" },
        miscellaneous: { label: "Miscellaneous", helpText: "Everything else" },
      },
      results: {
        totalIncome: { label: "Total Monthly Income" },
        totalExpenses: { label: "Total Monthly Expenses" },
        monthlyBalance: { label: "Monthly Balance" },
        savingsRate: { label: "Savings Rate" },
        needsTotal: { label: "Needs Total" },
        wantsTotal: { label: "Wants Total" },
        savingsTotal: { label: "Savings Total" },
        annualSavings: { label: "Annual Savings Projection" },
      },
      presets: {
        single: { label: "Single Professional", description: "$4,500/mo — standard 50/30/20" },
        couple: { label: "Dual Income Couple", description: "$8,700/mo combined" },
        family: { label: "Family with Kids", description: "$11,000/mo — childcare included" },
        fire: { label: "FIRE Goal", description: "$8,000/mo — aggressive 35% savings rate" },
        student: { label: "Student / Entry Level", description: "$2,200/mo — tight budget" },
      },
      values: { "%": "%", "month": "month", "year": "year" },
      formats: { summary: "Income {income}/mo — Expenses {expenses}/mo — Balance {balance}/mo" },
      chart: {
        title: "Spending by Category",
        xLabel: "Category",
        yLabel: "Amount ($)",
        series: { actual: "Actual Spending", target: "Target" },
      },
      infoCards: {
        summary: {
          title: "Budget Summary",
          items: [
            { label: "Total Income", valueKey: "totalIncome" },
            { label: "Total Expenses", valueKey: "totalExpenses" },
            { label: "Monthly Balance", valueKey: "monthlyBalance" },
            { label: "Savings Rate", valueKey: "savingsRate" },
          ],
        },
        breakdown: {
          title: "50/30/20 Breakdown",
          items: [
            { label: "Needs", valueKey: "needsLine" },
            { label: "Wants", valueKey: "wantsLine" },
            { label: "Savings", valueKey: "savingsLine" },
            { label: "Annual Savings", valueKey: "annualSavings" },
          ],
        },
        tips: {
          title: "Budget Tips",
          items: [
            "Automate savings transfers on payday — pay yourself first before spending",
            "Dining out is usually the fastest category to cut for quick savings of $200-$400/month",
            "If needs exceed 50%, housing is the biggest lever — even a roommate or shorter commute helps",
            "Every extra 1% in savings rate adds $500-$1,000/year at median income",
          ],
        },
      },
      education: {
        whatIs: {
          title: "What Is a Monthly Budget Calculator?",
          content: "A monthly budget calculator maps every dollar of income against every category of spending. Unlike tools that only apply the 50/30/20 rule to a single income number, this calculator lets you enter your actual expenses by category — housing, food, transport, debt, entertainment, savings — so you can see exactly where your money goes, identify overspending, and find where to cut.",
        },
        howItWorks: {
          title: "How the 50/30/20 Rule Classifies Spending",
          content: "The 50/30/20 rule, popularized by Elizabeth Warren, divides after-tax income into three buckets. Needs (50%) are non-negotiable essentials: rent or mortgage, groceries, utilities, health insurance, minimum debt payments, and transportation to work. Wants (30%) are lifestyle spending: dining out, streaming, hobbies, and travel. Savings (20%) includes retirement contributions, emergency fund, investments, and debt payments above the minimum. This calculator automatically classifies your expenses into these buckets and shows where you stand.",
        },
        considerations: {
          title: "When to Adjust the 50/30/20 Rule",
          items: [
            { text: "High cost-of-living city (NYC, SF, London): Housing alone often exceeds 35% — the 60/30/10 framework fits better", type: "warning" },
            { text: "Heavy debt: Temporarily shift 10-15% from wants to debt payoff until high-interest balances are cleared", type: "info" },
            { text: "FIRE (Financial Independence): Flip the model — target 50%+ savings and shrink wants to 15-20%", type: "info" },
            { text: "Family with young children: Childcare adds $800-$2,500/month — needs at 60-65% is completely normal", type: "warning" },
            { text: "Freelancer or variable income: Budget using your lowest typical month and save windfalls separately", type: "info" },
            { text: "Student or entry-level worker: The 60/20/20 split is more realistic when income is below $35,000/year", type: "info" },
          ],
        },
        methods: {
          title: "Budget Strategies That Work",
          items: [
            { text: "Zero-Based Budgeting: Give every dollar a job — income minus all allocations equals zero each month", type: "info" },
            { text: "Pay Yourself First: Auto-transfer savings and retirement on payday before discretionary spending begins", type: "info" },
            { text: "Anti-Budget: Set one savings transfer, pay all fixed bills, then spend freely on what remains", type: "info" },
            { text: "Envelope System: Allocate cash by category in physical or digital envelopes (apps: YNAB, EveryDollar)", type: "info" },
            { text: "Spending Fast: Eliminate all non-essential spending for 30 days to discover what you actually value", type: "warning" },
            { text: "2% Rule: Each quarter, reduce one expense category by 2% and redirect the savings to investments", type: "info" },
          ],
        },
        examples: {
          title: "Budget Examples by Income Level",
          description: "Real-world monthly budgets applying the 50/30/20 framework",
          examples: [
            {
              title: "$4,500/month — Single Professional",
              steps: [
                "Needs (50% = $2,250): Rent $1,200 + Groceries $400 + Car insurance/gas $220 + Health insurance $200 + Utilities/internet $230",
                "Wants (30% = $1,350): Dining out $200 + Streaming $50 + Entertainment $150 + Clothing $100 + Travel $100 + Misc $750",
                "Savings (20% = $900): 401(k) $300 + Emergency fund $200 + Investments $100 + Student loan extra $300",
              ],
              result: "Annual savings: ~$10,800. Emergency fund (3 months = $6,750) funded in ~34 months at this rate.",
            },
            {
              title: "$11,000/month — Family of Four",
              steps: [
                "Needs (60% = $6,600): Mortgage $2,500 + Groceries $900 + Cars $1,050 + Insurance $600 + Utilities $250 + Childcare $1,200 + Healthcare $100",
                "Wants (25% = $2,750): Dining $300 + Entertainment $200 + Kids activities $400 + Travel $300 + Clothing $250 + Streaming $80 + Misc $1,220",
                "Savings (15% = $1,650): 401k x2 $1,000 + College fund $300 + Emergency $200 + Investments $150",
              ],
              result: "Childcare pushes needs above 50% — the 60/25/15 split is appropriate. Annual savings: $19,800.",
            },
          ],
        },
      },
      faqs: [
        { question: "Should I use gross income or net income?", answer: "Always use net (take-home) income — the amount deposited to your bank after taxes, Social Security, and pre-tax deductions like 401(k). Budgeting on gross income overestimates your actual spending power and causes shortfalls." },
        { question: "What expenses count as Needs vs Wants?", answer: "Needs are non-negotiable: rent or mortgage, minimum debt payments, groceries (not restaurants), utilities, health insurance, and transportation to work. Wants are lifestyle choices: dining out, Netflix, gym membership, new clothes, and vacations. Rule of thumb: could you survive without it for 90 days? If yes, it's a Want." },
        { question: "Where do debt payments go in the 50/30/20 rule?", answer: "Minimum required payments (credit card minimums, student loan minimum, car payment) count as Needs — they're non-negotiable. Any payments above the minimum count as Savings, because they reduce your liabilities and build net worth faster." },
        { question: "My needs exceed 50% — is my budget broken?", answer: "No. In high-cost cities or for families with childcare, 60-70% on needs is common. Use the 60/30/10 framework. The highest-impact lever is usually housing — downsizing, getting a roommate, or moving further from the city can free up $400-$800/month." },
        { question: "How much should I have in my emergency fund?", answer: "Standard advice is 3-6 months of essential expenses (needs only, not your full budget). With variable income or as the sole earner in your household, aim for 6-12 months. Keep it in a high-yield savings account (HYSA) earning 4-5% APY, not a checking account." },
        { question: "What is a good monthly savings rate?", answer: "10% is the minimum most advisors recommend. 15-20% puts you on track for retirement at 65. 25-35% can enable early retirement in your 50s. The FIRE community targets 50%+ to retire in their 30s-40s. This calculator shows your exact savings rate automatically." },
      ],
      references: [
        { authors: "Warren, E., & Tyagi, A. W.", year: "2005", title: "All Your Worth: The Ultimate Lifetime Money Plan", source: "Free Press", url: "https://www.simonandschuster.com/books/All-Your-Worth/Elizabeth-Warren/9780743269889" },
        { authors: "Consumer Financial Protection Bureau", year: "2024", title: "Building a Budget", source: "CFPB", url: "https://www.consumerfinance.gov/consumer-tools/budget-tool/" },
        { authors: "Bureau of Labor Statistics", year: "2024", title: "Consumer Expenditure Survey 2023", source: "BLS", url: "https://www.bls.gov/cex/" },
      ],
      rating: { title: "Rate this Calculator", share: "Share", copied: "Copied!", copyLink: "Copy Link", clickToRate: "Click to rate", youRated: "You rated", stars: "stars", averageFrom: "average from", ratings: "ratings" },
      common: { home: "Home", calculators: "Calculators" },
      buttons: { calculate: "Calculate Budget", reset: "Reset", pdf: "PDF", csv: "CSV", excel: "Excel", save: "Save", saved: "Saved", saving: "Saving..." },
      share: { title: "Budget Calculator", text: "Track your monthly budget with the 50/30/20 rule" },
      accessibility: { calculatorLabel: "Budget Calculator", resultsLabel: "Budget Results" },
      sources: { title: "Sources" },
    },
  },

  inputs: [
    // ── INCOME ──
    { id: "monthlyIncome", type: "number", defaultValue: null, placeholder: "4500", min: 100, max: 500000, unitType: "currency", syncGroup: false },
    { id: "hasSecondIncome", type: "toggle", defaultValue: false },
    { id: "partnerIncome", type: "number", defaultValue: null, placeholder: "3000", min: 0, max: 500000, unitType: "currency", syncGroup: false, showWhen: { field: "hasSecondIncome", value: true } },
    { id: "budgetMethod", type: "select", defaultValue: "50-30-20", options: [
      { value: "50-30-20", label: "50/30/20 — Balanced (Most Popular)" },
      { value: "60-30-10", label: "60/30/10 — High Cost of Living" },
      { value: "70-20-10", label: "70/20/10 — Tight Budget" },
      { value: "60-20-20", label: "60/20/20 — Savings Focus" },
      { value: "custom", label: "Custom Percentages" },
    ]},
    { id: "needsPercent", type: "slider", defaultValue: 50, min: 10, max: 85, step: 1, suffix: "%", showWhen: { field: "budgetMethod", value: "custom" } },
    { id: "wantsPercent", type: "slider", defaultValue: 30, min: 5, max: 60, step: 1, suffix: "%", showWhen: { field: "budgetMethod", value: "custom" } },

    // ── HOUSING ──
    { id: "includeHousing", type: "toggle", defaultValue: true },
    { id: "mortgage", type: "number", defaultValue: null, placeholder: "1400", min: 0, max: 20000, unitType: "currency", syncGroup: false, showWhen: { field: "includeHousing", value: true } },
    { id: "utilities", type: "number", defaultValue: null, placeholder: "150", min: 0, max: 2000, unitType: "currency", syncGroup: false, showWhen: { field: "includeHousing", value: true } },
    { id: "internet", type: "number", defaultValue: null, placeholder: "80", min: 0, max: 500, unitType: "currency", syncGroup: false, showWhen: { field: "includeHousing", value: true } },

    // ── FOOD ──
    { id: "includeFood", type: "toggle", defaultValue: true },
    { id: "groceries", type: "number", defaultValue: null, placeholder: "400", min: 0, max: 5000, unitType: "currency", syncGroup: false, showWhen: { field: "includeFood", value: true } },
    { id: "diningOut", type: "number", defaultValue: null, placeholder: "200", min: 0, max: 3000, unitType: "currency", syncGroup: false, showWhen: { field: "includeFood", value: true } },

    // ── TRANSPORT ──
    { id: "includeTransport", type: "toggle", defaultValue: true },
    { id: "carPayment", type: "number", defaultValue: null, placeholder: "300", min: 0, max: 5000, unitType: "currency", syncGroup: false, showWhen: { field: "includeTransport", value: true } },
    { id: "carInsurance", type: "number", defaultValue: null, placeholder: "120", min: 0, max: 1000, unitType: "currency", syncGroup: false, showWhen: { field: "includeTransport", value: true } },
    { id: "gasoline", type: "number", defaultValue: null, placeholder: "100", min: 0, max: 1000, unitType: "currency", syncGroup: false, showWhen: { field: "includeTransport", value: true } },

    // ── HEALTHCARE ──
    { id: "includeHealthcare", type: "toggle", defaultValue: true },
    { id: "healthInsurance", type: "number", defaultValue: null, placeholder: "200", min: 0, max: 3000, unitType: "currency", syncGroup: false, showWhen: { field: "includeHealthcare", value: true } },
    { id: "medicalExpenses", type: "number", defaultValue: null, placeholder: "0", min: 0, max: 2000, unitType: "currency", syncGroup: false, showWhen: { field: "includeHealthcare", value: true } },
    { id: "gym", type: "number", defaultValue: null, placeholder: "40", min: 0, max: 500, unitType: "currency", syncGroup: false, showWhen: { field: "includeHealthcare", value: true } },

    // ── CHILDREN ──
    { id: "includeChildren", type: "toggle", defaultValue: false },
    { id: "childcare", type: "number", defaultValue: null, placeholder: "1200", min: 0, max: 5000, unitType: "currency", syncGroup: false, showWhen: { field: "includeChildren", value: true } },
    { id: "schoolTuition", type: "number", defaultValue: null, placeholder: "0", min: 0, max: 5000, unitType: "currency", syncGroup: false, showWhen: { field: "includeChildren", value: true } },
    { id: "childActivities", type: "number", defaultValue: null, placeholder: "0", min: 0, max: 2000, unitType: "currency", syncGroup: false, showWhen: { field: "includeChildren", value: true } },

    // ── DEBT ──
    { id: "includeDebt", type: "toggle", defaultValue: false },
    { id: "creditCard", type: "number", defaultValue: null, placeholder: "0", min: 0, max: 5000, unitType: "currency", syncGroup: false, showWhen: { field: "includeDebt", value: true } },
    { id: "studentLoan", type: "number", defaultValue: null, placeholder: "200", min: 0, max: 3000, unitType: "currency", syncGroup: false, showWhen: { field: "includeDebt", value: true } },
    { id: "personalLoan", type: "number", defaultValue: null, placeholder: "0", min: 0, max: 3000, unitType: "currency", syncGroup: false, showWhen: { field: "includeDebt", value: true } },

    // ── ENTERTAINMENT ──
    { id: "includeEntertainment", type: "toggle", defaultValue: true },
    { id: "streaming", type: "number", defaultValue: null, placeholder: "50", min: 0, max: 500, unitType: "currency", syncGroup: false, showWhen: { field: "includeEntertainment", value: true } },
    { id: "entertainment", type: "number", defaultValue: null, placeholder: "150", min: 0, max: 2000, unitType: "currency", syncGroup: false, showWhen: { field: "includeEntertainment", value: true } },
    { id: "travel", type: "number", defaultValue: null, placeholder: "100", min: 0, max: 3000, unitType: "currency", syncGroup: false, showWhen: { field: "includeEntertainment", value: true } },

    // ── SAVINGS ──
    { id: "includeSavings", type: "toggle", defaultValue: true },
    { id: "retirement401k", type: "number", defaultValue: null, placeholder: "300", min: 0, max: 10000, unitType: "currency", syncGroup: false, showWhen: { field: "includeSavings", value: true } },
    { id: "emergencyFund", type: "number", defaultValue: null, placeholder: "100", min: 0, max: 5000, unitType: "currency", syncGroup: false, showWhen: { field: "includeSavings", value: true } },
    { id: "investments", type: "number", defaultValue: null, placeholder: "100", min: 0, max: 10000, unitType: "currency", syncGroup: false, showWhen: { field: "includeSavings", value: true } },

    // ── OTHER ──
    { id: "includeOther", type: "toggle", defaultValue: false },
    { id: "petExpenses", type: "number", defaultValue: null, placeholder: "0", min: 0, max: 2000, unitType: "currency", syncGroup: false, showWhen: { field: "includeOther", value: true } },
    { id: "gifts", type: "number", defaultValue: null, placeholder: "50", min: 0, max: 2000, unitType: "currency", syncGroup: false, showWhen: { field: "includeOther", value: true } },
    { id: "miscellaneous", type: "number", defaultValue: null, placeholder: "100", min: 0, max: 5000, unitType: "currency", syncGroup: false, showWhen: { field: "includeOther", value: true } },
  ],

  inputGroups: [],

  results: [
    { id: "totalIncome", type: "currency", primary: true, highlight: true },
    { id: "totalExpenses", type: "currency" },
    { id: "monthlyBalance", type: "currency" },
    { id: "savingsRate", type: "percentage" },
    { id: "needsTotal", type: "currency" },
    { id: "wantsTotal", type: "currency" },
    { id: "savingsTotal", type: "currency" },
    { id: "annualSavings", type: "currency" },
  ],

  infoCards: [
    { id: "summary", type: "list", icon: "📊", itemCount: 4 },
    { id: "breakdown", type: "list", icon: "🎯", itemCount: 4 },
    { id: "tips", type: "horizontal", icon: "💡", itemCount: 4 },
  ],

  chart: {
    id: "budgetChart",
    type: "bar",
    xKey: "category",
    series: [
      { key: "actual", color: "#3b82f6" },
      { key: "target", color: "#e5e7eb" },
    ],
    stacked: false,
  },

  referenceData: [],

  educationSections: [
    { id: "whatIs", type: "prose", icon: "📖" },
    { id: "howItWorks", type: "prose", icon: "⚡" },
    { id: "considerations", type: "list", icon: "⚠️", itemCount: 6 },
    { id: "methods", type: "list", icon: "📋", itemCount: 6 },
    { id: "examples", type: "code-example", icon: "🧮", columns: 2, exampleCount: 2 },
  ],

  faqs: [{ id: "0" }, { id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }],

  references: [
    { authors: "Warren, E., & Tyagi, A. W.", year: "2005", title: "All Your Worth: The Ultimate Lifetime Money Plan", source: "Free Press", url: "https://www.simonandschuster.com/books/All-Your-Worth/Elizabeth-Warren/9780743269889" },
    { authors: "Consumer Financial Protection Bureau", year: "2024", title: "Building a Budget", source: "CFPB", url: "https://www.consumerfinance.gov/consumer-tools/budget-tool/" },
    { authors: "Bureau of Labor Statistics", year: "2024", title: "Consumer Expenditure Survey 2023", source: "BLS", url: "https://www.bls.gov/cex/" },
  ],

  hero: { showImage: true, showBadges: true, showReviews: true },
  sidebar: { showRelated: true, showAds: true },
  features: { history: true, favorites: true, share: true, export: true },
  relatedCalculators: ["net-worth-calculator", "compound-interest-calculator", "debt-payoff-calculator", "savings-calculator"],
  ads: { enabled: true, slots: ["sidebar", "results-below"] },
};

export function calculateBudget(data: Record<string, unknown>): CalculatorResults {
  const income1 = (data.monthlyIncome as number) ?? 0;
  if (!income1 || income1 <= 0) return { values: {}, formatted: {}, summary: "", isValid: false };

  const income2 = data.hasSecondIncome ? ((data.partnerIncome as number) ?? 0) : 0;
  const totalIncome = income1 + income2;
  const currencyUnit = (data.fieldUnits as Record<string, string>)?.["monthlyIncome"] ?? "USD";
  const sym = currencyUnit === "EUR" ? "€" : currencyUnit === "GBP" ? "£" : currencyUnit === "BRL" ? "R$" : "$";
  const fmt = (n: number) => {
    const abs = Math.abs(n);
    const s = abs.toLocaleString("en-US", { maximumFractionDigits: 0 });
    return n < 0 ? `-${sym}${s}` : `${sym}${s}`;
  };
  const g = (field: string, toggle: string) => {
    if (!data[toggle]) return 0;
    return (data[field] as number) ?? 0;
  };

  // Needs
  const housing = g("mortgage", "includeHousing") + g("utilities", "includeHousing") + g("internet", "includeHousing");
  const foodNeeds = g("groceries", "includeFood");
  const transport = g("carPayment", "includeTransport") + g("carInsurance", "includeTransport") + g("gasoline", "includeTransport");
  const healthcare = g("healthInsurance", "includeHealthcare") + g("medicalExpenses", "includeHealthcare");
  const children = g("childcare", "includeChildren") + g("schoolTuition", "includeChildren") + g("childActivities", "includeChildren");
  const debt = g("creditCard", "includeDebt") + g("studentLoan", "includeDebt") + g("personalLoan", "includeDebt");
  const needsTotal = housing + foodNeeds + transport + healthcare + children + debt;

  // Wants
  const foodWants = g("diningOut", "includeFood");
  const gym = g("gym", "includeHealthcare");
  const ent = g("streaming", "includeEntertainment") + g("entertainment", "includeEntertainment") + g("travel", "includeEntertainment");
  const other = g("petExpenses", "includeOther") + g("gifts", "includeOther") + g("miscellaneous", "includeOther");
  const wantsTotal = foodWants + gym + ent + other;

  // Savings
  const savingsTotal = g("retirement401k", "includeSavings") + g("emergencyFund", "includeSavings") + g("investments", "includeSavings");

  const totalExpenses = needsTotal + wantsTotal + savingsTotal;
  const monthlyBalance = totalIncome - totalExpenses;
  const savingsRate = totalIncome > 0 ? (savingsTotal / totalIncome) * 100 : 0;
  const annualSavings = savingsTotal * 12;

  const method = (data.budgetMethod as string) ?? "50-30-20";
  let needsPct = 50, wantsPct = 30, savingsPct = 20;
  if (method === "60-30-10") { needsPct = 60; wantsPct = 30; savingsPct = 10; }
  else if (method === "70-20-10") { needsPct = 70; wantsPct = 20; savingsPct = 10; }
  else if (method === "60-20-20") { needsPct = 60; wantsPct = 20; savingsPct = 20; }
  else if (method === "custom") { needsPct = (data.needsPercent as number) ?? 50; wantsPct = (data.wantsPercent as number) ?? 30; savingsPct = Math.max(0, 100 - needsPct - wantsPct); }

  const needsActualPct = totalIncome > 0 ? (needsTotal / totalIncome) * 100 : 0;
  const wantsActualPct = totalIncome > 0 ? (wantsTotal / totalIncome) * 100 : 0;
  const savingsActualPct = totalIncome > 0 ? (savingsTotal / totalIncome) * 100 : 0;

  const statusIcon = (actual: number, target: number) => Math.abs(actual - target) <= 5 ? "✅" : actual > target ? "⚠️" : "💚";

  const chartData = [
    { category: "Housing", actual: Math.round(housing), target: Math.round(totalIncome * needsPct / 100 * 0.38) },
    { category: "Food", actual: Math.round(foodNeeds + foodWants), target: Math.round(totalIncome * 0.12) },
    { category: "Transport", actual: Math.round(transport), target: Math.round(totalIncome * 0.10) },
    { category: "Healthcare", actual: Math.round(healthcare + gym), target: Math.round(totalIncome * 0.05) },
    { category: "Debt", actual: Math.round(debt), target: 0 },
    { category: "Entertainment", actual: Math.round(ent), target: Math.round(totalIncome * wantsPct / 100 * 0.5) },
    { category: "Savings", actual: Math.round(savingsTotal), target: Math.round(totalIncome * savingsPct / 100) },
  ];

  return {
    values: { totalIncome, totalExpenses, monthlyBalance, savingsRate, needsTotal, wantsTotal, savingsTotal, annualSavings },
    formatted: {
      totalIncome: fmt(totalIncome),
      totalExpenses: fmt(totalExpenses),
      monthlyBalance: fmt(monthlyBalance),
      savingsRate: `${savingsRate.toFixed(1)}%`,
      needsTotal: fmt(needsTotal),
      wantsTotal: fmt(wantsTotal),
      savingsTotal: fmt(savingsTotal),
      annualSavings: fmt(annualSavings),
      needsLine: `${fmt(needsTotal)} — ${needsActualPct.toFixed(0)}% (target ${needsPct}%) ${statusIcon(needsActualPct, needsPct)}`,
      wantsLine: `${fmt(wantsTotal)} — ${wantsActualPct.toFixed(0)}% (target ${wantsPct}%) ${statusIcon(wantsActualPct, wantsPct)}`,
      savingsLine: `${fmt(savingsTotal)} — ${savingsActualPct.toFixed(0)}% (target ${savingsPct}%) ${statusIcon(savingsActualPct, savingsPct)}`,
    },
    summary: `Income ${fmt(totalIncome)}/mo — Expenses ${fmt(totalExpenses)}/mo — Balance ${fmt(monthlyBalance)}/mo`,
    isValid: true,
    metadata: { chartData },
  };
}

export default budgetCalculatorConfig;
