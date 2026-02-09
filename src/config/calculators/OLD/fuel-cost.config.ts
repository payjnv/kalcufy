import type { CalculatorConfigV3, CalculatorResults } from "@/engine/v3/types/engine.types";

// Fuel Types
const FUEL_TYPES = [
  { value: "regular", label: "Regular (87)" },
  { value: "midgrade", label: "Mid-Grade (89)" },
  { value: "premium", label: "Premium (91-93)" },
  { value: "diesel", label: "Diesel" },
  { value: "e85", label: "E85 Flex Fuel" },
];

export const fuelCostConfig: CalculatorConfigV3 = {
  id: "fuel-cost",
  slug: "fuel-cost-calculator",
  name: "Fuel Cost Calculator",
  category: "everyday",
  icon: "⛽",

  seo: {
    title: "Fuel Cost Calculator - Trip, Annual & Vehicle Comparison",
    description: "Calculate fuel costs for trips, annual driving, and compare vehicle fuel efficiency. Free gas calculator with MPG and L/100km support for smart travel planning.",
    shortDescription: "Calculate your fuel costs for trips and annual driving",
    keywords: ["fuel cost calculator", "gas calculator", "mpg calculator", "trip cost", "fuel efficiency", "gas mileage calculator"],
  },

  hero: {
    badge: "Everyday",
    rating: { average: 4.8, count: 15200 },
  },

  unitSystem: {
    enabled: true,
    default: "imperial",
    options: [
      { value: "imperial", label: "US (MPG)" },
      { value: "metric", label: "Metric (L/100km)" },
    ],
  },

  inputs: [
    {
      id: "calculationMode",
      type: "select",
      label: "Calculation Type",
      required: true,
      defaultValue: "tripCost",
      options: [
        { value: "tripCost", label: "Trip Cost" },
        { value: "annualCost", label: "Annual Cost" },
        { value: "compareVehicles", label: "Compare Vehicles" },
      ],
    },
    {
      id: "distance",
      type: "slider",
      label: "Distance",
      required: true,
      defaultValue: 300,
      min: 1,
      max: 2000,
      step: 10,
      suffix: "miles",
      showWhen: { field: "calculationMode", value: "tripCost" },
    },
    {
      id: "roundTrip",
      type: "radio",
      label: "Trip Type",
      required: true,
      defaultValue: "oneWay",
      options: [
        { value: "oneWay", label: "One Way" },
        { value: "roundTrip", label: "Round Trip" },
      ],
      showWhen: { field: "calculationMode", value: "tripCost" },
    },
    {
      id: "fuelEfficiency",
      type: "slider",
      label: "Fuel Efficiency",
      required: true,
      defaultValue: 28,
      min: 5,
      max: 60,
      step: 1,
      suffix: "MPG",
      helpText: "Check your owner's manual or fueleconomy.gov",
      showWhen: { field: "calculationMode", value: ["tripCost", "annualCost"] },
    },
    {
      id: "fuelPrice",
      type: "number",
      label: "Fuel Price",
      required: true,
      defaultValue: 3.5,
      min: 0.5,
      max: 10,
      step: 0.01,
      suffix: "$/gal",
    },
    {
      id: "fuelType",
      type: "select",
      label: "Fuel Type",
      required: false,
      defaultValue: "regular",
      options: FUEL_TYPES,
      showWhen: { field: "calculationMode", value: "tripCost" },
    },
    {
      id: "splitCost",
      type: "radio",
      label: "Split Cost?",
      required: false,
      defaultValue: "no",
      options: [
        { value: "no", label: "No" },
        { value: "yes", label: "Yes" },
      ],
      showWhen: { field: "calculationMode", value: "tripCost" },
    },
    {
      id: "passengers",
      type: "slider",
      label: "Number of People",
      required: false,
      defaultValue: 2,
      min: 2,
      max: 8,
      step: 1,
      suffix: "people",
      showWhen: { field: "splitCost", value: "yes" },
    },
    {
      id: "dailyMiles",
      type: "slider",
      label: "Daily Commute",
      required: true,
      defaultValue: 30,
      min: 1,
      max: 200,
      step: 1,
      suffix: "miles",
      showWhen: { field: "calculationMode", value: ["annualCost", "compareVehicles"] },
    },
    {
      id: "workDaysPerWeek",
      type: "slider",
      label: "Work Days per Week",
      required: true,
      defaultValue: 5,
      min: 1,
      max: 7,
      step: 1,
      suffix: "days",
      showWhen: { field: "calculationMode", value: ["annualCost", "compareVehicles"] },
    },
    {
      id: "vehicle1Name",
      type: "text",
      label: "Vehicle 1 Name",
      required: false,
      defaultValue: "Current Vehicle",
      placeholder: "e.g., My Honda Civic",
      showWhen: { field: "calculationMode", value: "compareVehicles" },
    },
    {
      id: "vehicle1Mpg",
      type: "slider",
      label: "Vehicle 1 MPG",
      required: true,
      defaultValue: 25,
      min: 5,
      max: 60,
      step: 1,
      suffix: "MPG",
      showWhen: { field: "calculationMode", value: "compareVehicles" },
    },
    {
      id: "vehicle2Name",
      type: "text",
      label: "Vehicle 2 Name",
      required: false,
      defaultValue: "New Vehicle",
      placeholder: "e.g., Toyota Prius",
      showWhen: { field: "calculationMode", value: "compareVehicles" },
    },
    {
      id: "vehicle2Mpg",
      type: "slider",
      label: "Vehicle 2 MPG",
      required: true,
      defaultValue: 35,
      min: 5,
      max: 60,
      step: 1,
      suffix: "MPG",
      showWhen: { field: "calculationMode", value: "compareVehicles" },
    },
  ],

  inputGroups: [],

  results: [
    { id: "totalCost", type: "primary", label: "Total Fuel Cost", format: "text" },
    { id: "fuelNeeded", type: "secondary", label: "Fuel Needed", format: "text" },
    { id: "costPerMile", type: "secondary", label: "Cost per Mile", format: "text" },
    { id: "costPerPerson", type: "secondary", label: "Cost per Person", format: "text" },
    { id: "annualCost", type: "secondary", label: "Annual Cost", format: "text" },
    { id: "monthlyCost", type: "secondary", label: "Monthly Cost", format: "text" },
    { id: "annualSavings", type: "secondary", label: "Annual Savings", format: "text" },
    { id: "fiveYearSavings", type: "secondary", label: "5-Year Savings", format: "text" },
  ],

  educationSections: [
    {
      id: "fuelFormulas",
      type: "cards",
      title: "Fuel Economy Formulas",
      icon: "💡",
      columns: 2,
      cards: [
        { title: "Fuel Cost", description: "Distance ÷ MPG × Price per Gallon", icon: "💰" },
        { title: "Cost per Mile", description: "Fuel Price ÷ MPG", icon: "📏" },
        { title: "MPG to L/100km", description: "235.215 ÷ MPG", icon: "🔄" },
        { title: "Annual Miles", description: "Daily Miles × Work Days × 52 weeks", icon: "📅" },
      ],
    },
    {
      id: "averageMpg",
      type: "cards",
      title: "Average MPG by Vehicle Type",
      icon: "🚗",
      columns: 2,
      cards: [
        { title: "Compact Car", description: "30-35 MPG average", icon: "🚙" },
        { title: "Midsize Sedan", description: "25-30 MPG average", icon: "🚗" },
        { title: "SUV/Crossover", description: "20-28 MPG average", icon: "🚐" },
        { title: "Pickup Truck", description: "15-22 MPG average", icon: "🛻" },
      ],
    },
    {
      id: "considerations",
      type: "list",
      title: "Important Considerations",
      icon: "⚠️",
      items: [
        { text: "EPA estimates are tested under ideal conditions—most drivers get 10-15% less in real-world driving", type: "warning" },
        { text: "City driving typically uses 20-30% more fuel than highway driving due to stop-and-go traffic", type: "info" },
        { text: "Towing a trailer can reduce fuel economy by 20-50% depending on weight and aerodynamics", type: "warning" },
        { text: "Proper tire pressure can improve your MPG by up to 3%", type: "info" },
        { text: "Aggressive driving (speeding, rapid acceleration) wastes 15-30% more fuel", type: "warning" },
        { text: "Air conditioning can reduce fuel economy by 5-25% depending on conditions", type: "info" },
      ],
    },
    {
      id: "exampleCalculation",
      type: "code-example",
      title: "Example Calculation",
      icon: "📊",
      description: "Road trip: 500 miles, 28 MPG, $3.50/gallon, split between 4 people",
      columns: 2,
      examples: [
        {
          title: "Step 1: Calculate Fuel Needed",
          steps: [
            "Distance: 500 miles",
            "Fuel Efficiency: 28 MPG",
            "500 ÷ 28 = 17.86 gallons",
          ],
          result: "Fuel Needed: 17.86 gallons",
        },
        {
          title: "Step 2: Calculate Total & Split Cost",
          steps: [
            "Fuel: 17.86 gallons × $3.50",
            "Total Cost: $62.50",
            "Split 4 ways: $62.50 ÷ 4",
          ],
          result: "Cost per Person: $15.63",
        },
      ],
    },
    {
      id: "understandingFuelCosts",
      type: "prose",
      title: "Understanding Fuel Costs",
      content: "Fuel is often the second-largest vehicle expense after depreciation. Understanding your true fuel costs helps with budgeting and making informed decisions about vehicle purchases, especially when comparing gas vs. hybrid vs. electric options. Your actual fuel economy depends on many factors: driving style, terrain, weather, vehicle maintenance, and cargo load.",
    },
    {
      id: "improvingEfficiency",
      type: "prose",
      title: "Tips for Improving Fuel Efficiency",
      content: "Simple changes can significantly reduce your fuel costs. Maintain steady speeds and use cruise control on highways. Avoid excessive idling—if you'll be stopped for more than 30 seconds, turn off the engine. Remove unnecessary weight from your vehicle, as every 100 pounds reduces MPG by about 1%. Keep your tires properly inflated and your engine well-maintained. Planning routes to avoid traffic congestion also helps.",
    },
    {
      id: "fuelTypes",
      type: "prose",
      title: "Choosing the Right Fuel Type",
      content: "Most cars run perfectly well on regular (87 octane) gasoline. Premium fuel (91-93 octane) is only necessary if your vehicle's manual specifies 'required'—if it says 'recommended,' regular is fine. Using premium in a car designed for regular provides no benefit and wastes money. Diesel engines offer better fuel economy but have higher fuel costs. E85 (flex fuel) costs less per gallon but delivers fewer miles per gallon.",
    },
    {
      id: "gasPrices",
      type: "prose",
      title: "Understanding Gas Price Fluctuations",
      content: "Gas prices fluctuate based on crude oil prices, refinery capacity, seasonal demand, and local taxes. Prices typically rise in spring as refineries switch to summer fuel blends and demand increases. Using apps like GasBuddy can help you find the best prices nearby. However, don't drive far out of your way to save a few cents—the extra mileage often negates the savings.",
    },
  ],

  faqs: [
    { question: "How do I find my car's fuel efficiency?", answer: "Check your owner's manual, the sticker on the driver's door jamb, or fueleconomy.gov for EPA estimates. For real-world MPG, divide miles driven by gallons used at fill-up. Most cars get 10-15% less than EPA estimates." },
    { question: "What's the difference between city and highway MPG?", answer: "City MPG is typically 20-30% lower than highway MPG due to stop-and-go traffic, idling, and acceleration. Highway driving is more fuel-efficient because you maintain steady speeds. Combined MPG is a weighted average (55% city, 45% highway)." },
    { question: "How does towing affect fuel economy?", answer: "Towing typically reduces fuel economy by 20-50% depending on the trailer weight and aerodynamics. A travel trailer might reduce a truck's MPG from 20 to 10-12. Always calculate with your loaded MPG for accuracy." },
    { question: "Is premium gas worth the extra cost?", answer: "Only if your car requires it. Premium fuel (91-93 octane) costs 20-40 cents more per gallon. Most cars designed for regular (87) won't benefit from premium. Check your owner's manual—if it says 'recommended' vs 'required,' regular is fine." },
    { question: "How can I improve my fuel economy?", answer: "Maintain proper tire pressure (can improve MPG by 3%), remove excess weight, avoid aggressive driving (saves 15-30%), use cruise control on highways, keep your car maintained, and combine trips when possible." },
    { question: "How do I convert MPG to L/100km?", answer: "The formula is: L/100km = 235.215 / MPG. For example, 30 MPG = 235.215/30 = 7.84 L/100km. Note that these scales work opposite—higher MPG is better, but lower L/100km is better." },
  ],

  references: [
    { authors: "U.S. Department of Energy", year: "2024", title: "Fuel Economy Guide", source: "fueleconomy.gov", url: "https://fueleconomy.gov" },
    { authors: "EPA", year: "2024", title: "Gas Mileage Tips", source: "Environmental Protection Agency", url: "https://www.epa.gov/greenvehicles" },
    { authors: "AAA", year: "2024", title: "Gas Prices Today", source: "AAA Gas Prices", url: "https://gasprices.aaa.com" },
  ],

  sidebar: { showSearch: true, showRelatedCalculators: true, showCTA: false, category: "everyday" },
  features: { autoCalculate: true, exportPDF: true, shareResults: true, saveHistory: true },
  relatedCalculators: ["auto-loan-calculator", "tip-calculator", "discount-calculator"],
  ads: { mobileHero: true, sidebar: true, mobileContent: true, bottom: true },
};

export function calculateFuelCost(data: {
  values: Record<string, unknown>;
  units: Record<string, string>;
  unitSystem: "metric" | "imperial";
}): CalculatorResults {
  const { values, unitSystem } = data;
  const mode = values.calculationMode as string;
  
  const isMetric = unitSystem === "metric";
  const distanceUnit = isMetric ? "km" : "miles";
  const volumeUnit = isMetric ? "L" : "gal";

  const fuelPrice = (values.fuelPrice as number) || 3.5;
  const fuelEfficiency = (values.fuelEfficiency as number) || 28;
  
  const fmt = (n: number) => "$" + n.toFixed(2);

  if (mode === "tripCost") {
    const distance = (values.distance as number) || 300;
    const isRoundTrip = values.roundTrip === "roundTrip";
    const tripDistance = isRoundTrip ? distance * 2 : distance;
    const splitCost = values.splitCost === "yes";
    const passengers = (values.passengers as number) || 2;

    let fuelNeeded: number;
    if (isMetric) {
      fuelNeeded = (tripDistance / 100) * fuelEfficiency;
    } else {
      fuelNeeded = tripDistance / fuelEfficiency;
    }

    const totalCost = fuelNeeded * fuelPrice;
    const costPerMile = isMetric 
      ? (fuelEfficiency * fuelPrice) / 100 
      : fuelPrice / fuelEfficiency;
    const costPerPerson = splitCost ? totalCost / passengers : totalCost;

    return {
      values: { totalCost, fuelNeeded, costPerMile, costPerPerson },
      formatted: {
        totalCost: fmt(totalCost),
        fuelNeeded: fuelNeeded.toFixed(2) + " " + volumeUnit,
        costPerMile: fmt(costPerMile) + "/" + distanceUnit,
        costPerPerson: splitCost ? fmt(costPerPerson) : "—",
        annualCost: "—",
        monthlyCost: "—",
        annualSavings: "—",
        fiveYearSavings: "—",
      },
      summary: isRoundTrip 
        ? `Round trip of ${tripDistance} ${distanceUnit} will cost ${fmt(totalCost)} (${fuelNeeded.toFixed(1)} ${volumeUnit})`
        : `Trip of ${tripDistance} ${distanceUnit} will cost ${fmt(totalCost)} (${fuelNeeded.toFixed(1)} ${volumeUnit})`,
      isValid: true,
    };
  }

  if (mode === "annualCost") {
    const dailyMiles = (values.dailyMiles as number) || 30;
    const workDaysPerWeek = (values.workDaysPerWeek as number) || 5;
    
    const annualMiles = dailyMiles * workDaysPerWeek * 52;
    const annualFuelNeeded = isMetric 
      ? (annualMiles / 100) * fuelEfficiency 
      : annualMiles / fuelEfficiency;
    const annualCost = annualFuelNeeded * fuelPrice;
    const monthlyCost = annualCost / 12;
    const costPerMile = isMetric 
      ? (fuelEfficiency * fuelPrice) / 100 
      : fuelPrice / fuelEfficiency;

    return {
      values: { annualCost, monthlyCost, annualFuelNeeded },
      formatted: {
        totalCost: "—",
        fuelNeeded: annualFuelNeeded.toFixed(0) + " " + volumeUnit + "/year",
        costPerMile: fmt(costPerMile) + "/" + distanceUnit,
        costPerPerson: "—",
        annualCost: fmt(annualCost),
        monthlyCost: fmt(monthlyCost),
        annualSavings: "—",
        fiveYearSavings: "—",
      },
      summary: `Annual fuel cost: ${fmt(annualCost)} (${fmt(monthlyCost)}/month) for ${annualMiles.toLocaleString()} ${distanceUnit}/year`,
      isValid: true,
    };
  }

  if (mode === "compareVehicles") {
    const dailyMiles = (values.dailyMiles as number) || 30;
    const workDaysPerWeek = (values.workDaysPerWeek as number) || 5;
    const vehicle1Mpg = (values.vehicle1Mpg as number) || 25;
    const vehicle2Mpg = (values.vehicle2Mpg as number) || 35;
    const vehicle1Name = (values.vehicle1Name as string) || "Vehicle 1";
    const vehicle2Name = (values.vehicle2Name as string) || "Vehicle 2";

    const annualMiles = dailyMiles * workDaysPerWeek * 52;
    const vehicle1AnnualCost = (annualMiles / vehicle1Mpg) * fuelPrice;
    const vehicle2AnnualCost = (annualMiles / vehicle2Mpg) * fuelPrice;
    const annualSavings = vehicle1AnnualCost - vehicle2AnnualCost;
    const fiveYearSavings = annualSavings * 5;

    const moreEfficient = vehicle2Mpg > vehicle1Mpg ? vehicle2Name : vehicle1Name;

    return {
      values: { vehicle1AnnualCost, vehicle2AnnualCost, annualSavings, fiveYearSavings },
      formatted: {
        totalCost: fmt(Math.min(vehicle1AnnualCost, vehicle2AnnualCost)) + "/year",
        fuelNeeded: "—",
        costPerMile: "—",
        costPerPerson: "—",
        annualCost: `${vehicle1Name}: ${fmt(vehicle1AnnualCost)} | ${vehicle2Name}: ${fmt(vehicle2AnnualCost)}`,
        monthlyCost: "—",
        annualSavings: annualSavings > 0 ? fmt(annualSavings) + "/year" : fmt(Math.abs(annualSavings)) + " more/year",
        fiveYearSavings: annualSavings > 0 ? fmt(fiveYearSavings) : fmt(Math.abs(fiveYearSavings)) + " more",
      },
      summary: annualSavings > 0 
        ? `${moreEfficient} saves ${fmt(annualSavings)}/year (${fmt(fiveYearSavings)} over 5 years)`
        : `Both vehicles cost similar amounts annually`,
      isValid: true,
    };
  }

  return {
    values: {},
    formatted: {
      totalCost: "—",
      fuelNeeded: "—",
      costPerMile: "—",
      costPerPerson: "—",
      annualCost: "—",
      monthlyCost: "—",
      annualSavings: "—",
      fiveYearSavings: "—",
    },
    summary: "Select a calculation mode to begin",
    isValid: false,
  };
}

export default fuelCostConfig;
