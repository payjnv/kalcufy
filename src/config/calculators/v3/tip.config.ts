import type { CalculatorConfigV3, CalculatorResults } from "@/engine/v3/types/engine.types";

export const tipCalculatorConfig: CalculatorConfigV3 = {
  id: "tip-calculator",
  slug: "tip-calculator",
  name: "Tip Calculator",
  category: "everyday",
  icon: "💵",

  seo: {
    title: "Tip Calculator - Calculate Gratuity & Split Bill Easily",
    description: "Free tip calculator to quickly calculate gratuity and split bills. Supports custom tip percentages, multiple people, and shows per-person amounts for restaurants, bars, and services.",
    shortDescription: "Calculate tips and split bills easily",
    keywords: ["tip calculator", "gratuity calculator", "split bill", "restaurant tip", "how much to tip", "tip percentage", "bill splitter"],
  },

  hero: { badge: "Everyday", rating: { average: 4.9, count: 156000 } },
  unitSystem: { enabled: false, default: "metric", options: [] },

  inputs: [
    { id: "billAmount", type: "number", label: "Bill Amount", required: true, defaultValue: 50, min: 0, step: 0.01, prefix: "$" },
    { id: "tipPercent", type: "slider", label: "Tip Percentage", required: true, defaultValue: 18, min: 0, max: 30, step: 1, suffix: "%" },
    { id: "numberOfPeople", type: "slider", label: "Split Between", required: true, defaultValue: 1, min: 1, max: 20, step: 1, suffix: " people" },
    {
      id: "roundUp",
      type: "radio",
      label: "Round Total",
      required: false,
      defaultValue: "none",
      options: [
        { value: "none", label: "No Rounding" },
        { value: "dollar", label: "Nearest Dollar" },
        { value: "five", label: "Nearest $5" },
      ],
    },
  ],

  inputGroups: [],

  results: [
    { id: "tipAmount", type: "primary", label: "Tip Amount", format: "number", prefix: "$" },
    { id: "totalAmount", type: "secondary", label: "Total (Bill + Tip)", format: "number", prefix: "$" },
    { id: "tipPerPerson", type: "secondary", label: "Tip Per Person", format: "number", prefix: "$" },
    { id: "totalPerPerson", type: "secondary", label: "Total Per Person", format: "number", prefix: "$" },
    { id: "effectiveRate", type: "secondary", label: "Effective Tip Rate", format: "number", suffix: "%" },
  ],

  infoCards: [
    {
      id: "usaTipping",
      title: "US Tipping Guide",
      icon: "🇺🇸",
      type: "list",
      items: [
        { label: "Restaurant", value: "15-20%", color: "blue" },
        { label: "Bar/Bartender", value: "$1-2/drink or 15-20%", color: "green" },
        { label: "Delivery", value: "15-20% (min $3)", color: "purple" },
        { label: "Hair Salon", value: "15-20%", color: "amber" },
      ],
    },
    {
      id: "quickTips",
      title: "Quick Reference",
      icon: "⚡",
      type: "horizontal",
      items: [
        { label: "15% = Good service" },
        { label: "18% = Great service" },
        { label: "20% = Excellent" },
        { label: "25%+ = Exceptional" },
      ],
    },
  ],

  referenceData: [
    {
      id: "worldTipping",
      title: "Tipping by Region",
      icon: "🌍",
      columns: 2,
      items: [
        { label: "USA/Canada", value: "15-20%" },
        { label: "UK/Ireland", value: "10-15%" },
        { label: "Europe", value: "5-10% or round up" },
        { label: "Japan/China", value: "Not expected" },
        { label: "Australia", value: "10% (optional)" },
        { label: "Middle East", value: "10-20%" },
      ],
    },
  ],

  educationSections: [
    {
      id: "serviceTypes",
      type: "cards",
      title: "Tipping by Service Type",
      icon: "🍽️",
      columns: 2,
      cards: [
        { title: "Restaurants", description: "15-20% of pre-tax bill. 20% is standard for good service. Consider 25% for exceptional service.", icon: "🍴" },
        { title: "Bars & Cafes", description: "$1-2 per drink at bars, or 15-20% of tab. Coffee shops: $1 or loose change for counter service.", icon: "🍺" },
        { title: "Delivery & Takeout", description: "15-20% for delivery (minimum $3-5). Takeout tips are appreciated but not required.", icon: "🚗" },
        { title: "Personal Services", description: "Hairdressers, spa: 15-20%. Taxi/rideshare: 15-20%. Hotel housekeeping: $2-5/night.", icon: "✂️" },
      ],
    },
    {
      id: "considerations",
      type: "list",
      title: "Important Considerations",
      icon: "⚠️",
      items: [
        { text: "In the US, servers often earn below minimum wage ($2.13/hr) and rely on tips as primary income.", type: "warning" },
        { text: "Calculate tip on pre-tax amount, not the total including tax.", type: "info" },
        { text: "Check for automatic gratuity (common for groups of 6+), usually 18-20%.", type: "warning" },
        { text: "In Japan and China, tipping can be considered rude or confusing.", type: "info" },
        { text: "For poor service, 10% is acceptable. No tip should be reserved for truly terrible service only.", type: "info" },
        { text: "Cash tips go directly to servers; credit card tips may be shared or delayed.", type: "info" },
      ],
    },
    {
      id: "exampleCalculation",
      type: "code-example",
      title: "Example Tip Calculation",
      icon: "🧮",
      description: "$75 dinner bill with 20% tip, split between 3 people",
      columns: 2,
      examples: [
        { title: "Calculate Total Tip", steps: ["Bill Amount: $75.00", "Tip Rate: 20%", "Tip = $75 × 0.20 = $15.00", "Total = $75 + $15 = $90.00"], result: "Total with Tip: $90.00" },
        { title: "Split Per Person", steps: ["Total: $90.00", "Number of People: 3", "Per Person: $90 ÷ 3 = $30.00", "Tip Per Person: $15 ÷ 3 = $5.00"], result: "Each Pays: $30.00" },
      ],
    },
    {
      id: "history",
      type: "prose",
      title: "History of Tipping",
      content: "Tipping originated in Tudor England, where guests gave money 'To Insure Promptness' (T.I.P.). The practice spread to America in the late 1800s. After Prohibition (1919) eliminated alcohol revenue, restaurants began paying servers less with tips supplementing wages. Today, the US remains the world's most generous tipping culture at 15-20%.",
    },
    {
      id: "global",
      type: "prose",
      title: "Tipping Around the World",
      content: "Tipping norms vary dramatically. In the US and Canada, 15-20% is standard and expected. In most of Europe, service charges are often included, so 5-10% or rounding up is sufficient. In Japan, China, and South Korea, tipping is not customary and may even be refused as it can imply the worker isn't being paid fairly by their employer.",
    },
    {
      id: "etiquette",
      type: "prose",
      title: "Modern Tipping Etiquette",
      content: "In casual dining, 15-18% is acceptable while fine dining expects 20%+. For counter service and coffee shops, tipping is appreciated but optional ($1-2 or spare change). When using credit cards, many prefer to tip in cash so servers receive it immediately. For large parties, check if gratuity is already included — usually 18-20% for groups of 6 or more.",
    },
  ],

  faqs: [
    { question: "How much should I tip at a restaurant?", answer: "In the US, 15-20% is standard. 15% for adequate service, 18% for good, 20% for great, and 25%+ for exceptional. Always tip on the pre-tax amount." },
    { question: "Should I tip on pre-tax or post-tax amount?", answer: "Tip on the pre-tax subtotal. The tax goes to the government, not the server. For simplicity, some tip on the total — servers won't complain!" },
    { question: "What if the service was bad?", answer: "For poor service, 10% is acceptable. If truly terrible, speak with a manager. Leaving zero tip should be rare as servers depend on tips for income." },
    { question: "Is tip sometimes included in the bill?", answer: "Check for 'service charge' or 'gratuity included' (common for groups of 6+). If included, no additional tip required, though you can add more for exceptional service." },
    { question: "Should I tip for takeout?", answer: "Tipping for takeout is appreciated but not required (0-10%). If the order is complex or large, consider 10-15%." },
    { question: "How much do I tip delivery drivers?", answer: "15-20% of your order (minimum $3-5). Tip more for bad weather, long distances, or difficult delivery locations." },
    { question: "Do I tip on alcohol?", answer: "Yes, include alcohol in your tip calculation. For bars, $1-2 per drink or 15-20% of total tab." },
    { question: "Is cash better than card for tipping?", answer: "Cash tips go directly to the server immediately. Credit card tips may be pooled or delayed until payday. Cash is preferred by most servers." },
  ],

  references: [
    { authors: "Emily Post Institute", year: "2024", title: "Tipping Guidelines", source: "Emily Post Etiquette", url: "https://emilypost.com/advice/tipping" },
    { authors: "Wikipedia Contributors", year: "2025", title: "Gratuity - Tipping customs by country", source: "Wikipedia", url: "https://en.wikipedia.org/wiki/Gratuity" },
  ],

  detailedTable: {
    id: "tipOptions",
    buttonLabel: "Compare Tip Options",
    buttonIcon: "📊",
    modalTitle: "Compare Tip Amounts",
    columns: [
      { id: "percent", label: "Tip %", align: "center" },
      { id: "tipAmount", label: "Tip", align: "right", highlight: true },
      { id: "total", label: "Total", align: "right" },
      { id: "perPerson", label: "Per Person", align: "right" },
    ],
  },

  sidebar: { showSearch: true, showRelatedCalculators: true, showCTA: false, category: "everyday" },
  features: { autoCalculate: true, exportPDF: true, shareResults: true, saveHistory: true },
  relatedCalculators: ["discount-calculator", "sales-tax-calculator", "percentage-calculator"],
  ads: { mobileHero: true, sidebar: true, mobileContent: true, bottom: true },
};

// =============================================================================
// CALCULATE FUNCTION
// =============================================================================
export function calculateTip(data: { values: Record<string, unknown>; units: Record<string, string>; unitSystem: "metric" | "imperial" }): CalculatorResults {
  const { values } = data;
  const billAmount = (values.billAmount as number) || 0;
  const tipPercent = (values.tipPercent as number) || 18;
  const numberOfPeople = (values.numberOfPeople as number) || 1;
  const roundUp = (values.roundUp as string) || "none";

  let tipAmount = billAmount * (tipPercent / 100);
  let totalAmount = billAmount + tipAmount;

  if (roundUp === "dollar") { totalAmount = Math.ceil(totalAmount); tipAmount = totalAmount - billAmount; }
  else if (roundUp === "five") { totalAmount = Math.ceil(totalAmount / 5) * 5; tipAmount = totalAmount - billAmount; }

  const tipPerPerson = tipAmount / numberOfPeople;
  const totalPerPerson = totalAmount / numberOfPeople;
  const effectiveRate = billAmount > 0 ? (tipAmount / billAmount) * 100 : 0;

  const tableData = [10, 15, 18, 20, 25].map((pct) => ({
    percent: `${pct}%`,
    tipAmount: `$${(billAmount * pct / 100).toFixed(2)}`,
    total: `$${(billAmount * (1 + pct / 100)).toFixed(2)}`,
    perPerson: `$${(billAmount * (1 + pct / 100) / numberOfPeople).toFixed(2)}`,
  }));

  return {
    values: { tipAmount, totalAmount, tipPerPerson, totalPerPerson, effectiveRate },
    formatted: { tipAmount: tipAmount.toFixed(2), totalAmount: totalAmount.toFixed(2), tipPerPerson: tipPerPerson.toFixed(2), totalPerPerson: totalPerPerson.toFixed(2), effectiveRate: effectiveRate.toFixed(1) },
    summary: `Tip: $${tipAmount.toFixed(2)} | Total: $${totalAmount.toFixed(2)}${numberOfPeople > 1 ? ` | $${totalPerPerson.toFixed(2)}/person` : ""}`,
    isValid: billAmount > 0,
    metadata: { tableData },
  };
}

export default tipCalculatorConfig;
