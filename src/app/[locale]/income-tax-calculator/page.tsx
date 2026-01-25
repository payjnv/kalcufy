"use client";

import { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useLocale } from "next-intl";
import { useSession } from "next-auth/react";
import AdBlock from "@/components/ads/AdBlock";
import { useCalcTranslations } from "@/lib/useCalcTranslations";

const CALCULATOR_SLUG = "income-tax-calculator";
const CALCULATOR_NAME = "Income Tax Calculator";
const CALCULATOR_CATEGORY = "finance";

// ============================================
// TAX DATA BY YEAR (2024, 2025, 2026)
// ============================================
const TAX_DATA: Record<string, any> = {
  "2024": {
    brackets: {
      single: [
        { min: 0, max: 11600, rate: 0.10 },
        { min: 11600, max: 47150, rate: 0.12 },
        { min: 47150, max: 100525, rate: 0.22 },
        { min: 100525, max: 191950, rate: 0.24 },
        { min: 191950, max: 243725, rate: 0.32 },
        { min: 243725, max: 609350, rate: 0.35 },
        { min: 609350, max: Infinity, rate: 0.37 },
      ],
      married: [
        { min: 0, max: 23200, rate: 0.10 },
        { min: 23200, max: 94300, rate: 0.12 },
        { min: 94300, max: 201050, rate: 0.22 },
        { min: 201050, max: 383900, rate: 0.24 },
        { min: 383900, max: 487450, rate: 0.32 },
        { min: 487450, max: 731200, rate: 0.35 },
        { min: 731200, max: Infinity, rate: 0.37 },
      ],
      marriedSeparate: [
        { min: 0, max: 11600, rate: 0.10 },
        { min: 11600, max: 47150, rate: 0.12 },
        { min: 47150, max: 100525, rate: 0.22 },
        { min: 100525, max: 191950, rate: 0.24 },
        { min: 191950, max: 243725, rate: 0.32 },
        { min: 243725, max: 365600, rate: 0.35 },
        { min: 365600, max: Infinity, rate: 0.37 },
      ],
      head: [
        { min: 0, max: 16550, rate: 0.10 },
        { min: 16550, max: 63100, rate: 0.12 },
        { min: 63100, max: 100500, rate: 0.22 },
        { min: 100500, max: 191950, rate: 0.24 },
        { min: 191950, max: 243700, rate: 0.32 },
        { min: 243700, max: 609350, rate: 0.35 },
        { min: 609350, max: Infinity, rate: 0.37 },
      ],
    },
    standardDeduction: { single: 14600, married: 29200, marriedSeparate: 14600, head: 21900, widow: 29200 },
    ltcgBrackets: {
      single: [{ max: 47025, rate: 0 }, { max: 518900, rate: 0.15 }, { max: Infinity, rate: 0.20 }],
      married: [{ max: 94050, rate: 0 }, { max: 583750, rate: 0.15 }, { max: Infinity, rate: 0.20 }],
    },
    socialSecurityCap: 168600,
    childTaxCredit: 2000,
    childTaxCreditRefundable: 1700,
    saltCap: 10000,
    iraLimit: 7000,
    fourOhOneKLimit: 23000,
    hsaLimit: { individual: 4150, family: 8300 },
    eitcMax: { 0: 632, 1: 4213, 2: 6960, 3: 7830 },
  },
  "2025": {
    brackets: {
      single: [
        { min: 0, max: 11925, rate: 0.10 },
        { min: 11925, max: 48475, rate: 0.12 },
        { min: 48475, max: 103350, rate: 0.22 },
        { min: 103350, max: 197300, rate: 0.24 },
        { min: 197300, max: 250525, rate: 0.32 },
        { min: 250525, max: 626350, rate: 0.35 },
        { min: 626350, max: Infinity, rate: 0.37 },
      ],
      married: [
        { min: 0, max: 23850, rate: 0.10 },
        { min: 23850, max: 96950, rate: 0.12 },
        { min: 96950, max: 206700, rate: 0.22 },
        { min: 206700, max: 394600, rate: 0.24 },
        { min: 394600, max: 501050, rate: 0.32 },
        { min: 501050, max: 751600, rate: 0.35 },
        { min: 751600, max: Infinity, rate: 0.37 },
      ],
      marriedSeparate: [
        { min: 0, max: 11925, rate: 0.10 },
        { min: 11925, max: 48475, rate: 0.12 },
        { min: 48475, max: 103350, rate: 0.22 },
        { min: 103350, max: 197300, rate: 0.24 },
        { min: 197300, max: 250525, rate: 0.32 },
        { min: 250525, max: 375800, rate: 0.35 },
        { min: 375800, max: Infinity, rate: 0.37 },
      ],
      head: [
        { min: 0, max: 17000, rate: 0.10 },
        { min: 17000, max: 64850, rate: 0.12 },
        { min: 64850, max: 103350, rate: 0.22 },
        { min: 103350, max: 197300, rate: 0.24 },
        { min: 197300, max: 250500, rate: 0.32 },
        { min: 250500, max: 626350, rate: 0.35 },
        { min: 626350, max: Infinity, rate: 0.37 },
      ],
    },
    standardDeduction: { single: 15000, married: 30000, marriedSeparate: 15000, head: 22500, widow: 30000 },
    ltcgBrackets: {
      single: [{ max: 48350, rate: 0 }, { max: 533400, rate: 0.15 }, { max: Infinity, rate: 0.20 }],
      married: [{ max: 96700, rate: 0 }, { max: 600050, rate: 0.15 }, { max: Infinity, rate: 0.20 }],
    },
    socialSecurityCap: 176100,
    childTaxCredit: 2000,
    childTaxCreditRefundable: 1700,
    saltCap: 10000,
    iraLimit: 7000,
    fourOhOneKLimit: 23500,
    hsaLimit: { individual: 4300, family: 8550 },
    eitcMax: { 0: 649, 1: 4328, 2: 7152, 3: 8046 },
  },
  "2026": {
    brackets: {
      single: [
        { min: 0, max: 12300, rate: 0.10 },
        { min: 12300, max: 50000, rate: 0.12 },
        { min: 50000, max: 106500, rate: 0.22 },
        { min: 106500, max: 203350, rate: 0.24 },
        { min: 203350, max: 258300, rate: 0.32 },
        { min: 258300, max: 645500, rate: 0.35 },
        { min: 645500, max: Infinity, rate: 0.37 },
      ],
      married: [
        { min: 0, max: 24600, rate: 0.10 },
        { min: 24600, max: 100000, rate: 0.12 },
        { min: 100000, max: 213000, rate: 0.22 },
        { min: 213000, max: 406700, rate: 0.24 },
        { min: 406700, max: 516600, rate: 0.32 },
        { min: 516600, max: 774200, rate: 0.35 },
        { min: 774200, max: Infinity, rate: 0.37 },
      ],
      marriedSeparate: [
        { min: 0, max: 12300, rate: 0.10 },
        { min: 12300, max: 50000, rate: 0.12 },
        { min: 50000, max: 106500, rate: 0.22 },
        { min: 106500, max: 203350, rate: 0.24 },
        { min: 203350, max: 258300, rate: 0.32 },
        { min: 258300, max: 387100, rate: 0.35 },
        { min: 387100, max: Infinity, rate: 0.37 },
      ],
      head: [
        { min: 0, max: 17500, rate: 0.10 },
        { min: 17500, max: 66850, rate: 0.12 },
        { min: 66850, max: 106500, rate: 0.22 },
        { min: 106500, max: 203350, rate: 0.24 },
        { min: 203350, max: 258000, rate: 0.32 },
        { min: 258000, max: 645500, rate: 0.35 },
        { min: 645500, max: Infinity, rate: 0.37 },
      ],
    },
    standardDeduction: { single: 15400, married: 30800, marriedSeparate: 15400, head: 23100, widow: 30800 },
    ltcgBrackets: {
      single: [{ max: 49800, rate: 0 }, { max: 549200, rate: 0.15 }, { max: Infinity, rate: 0.20 }],
      married: [{ max: 99600, rate: 0 }, { max: 618000, rate: 0.15 }, { max: Infinity, rate: 0.20 }],
    },
    socialSecurityCap: 181200,
    childTaxCredit: 2200,
    childTaxCreditRefundable: 1800,
    saltCap: 40000,
    iraLimit: 7000,
    fourOhOneKLimit: 24000,
    hsaLimit: { individual: 4400, family: 8750 },
    eitcMax: { 0: 670, 1: 4460, 2: 7370, 3: 8290 },
  },
};

// State tax rates (simplified)
const STATE_TAX: Record<string, { rate: number; name: string }> = {
  "AL": { rate: 0.05, name: "Alabama" }, "AK": { rate: 0, name: "Alaska" }, "AZ": { rate: 0.025, name: "Arizona" },
  "AR": { rate: 0.039, name: "Arkansas" }, "CA": { rate: 0.093, name: "California" }, "CO": { rate: 0.044, name: "Colorado" },
  "CT": { rate: 0.0699, name: "Connecticut" }, "DE": { rate: 0.066, name: "Delaware" }, "FL": { rate: 0, name: "Florida" },
  "GA": { rate: 0.0549, name: "Georgia" }, "HI": { rate: 0.11, name: "Hawaii" }, "ID": { rate: 0.058, name: "Idaho" },
  "IL": { rate: 0.0495, name: "Illinois" }, "IN": { rate: 0.0305, name: "Indiana" }, "IA": { rate: 0.057, name: "Iowa" },
  "KS": { rate: 0.057, name: "Kansas" }, "KY": { rate: 0.04, name: "Kentucky" }, "LA": { rate: 0.0425, name: "Louisiana" },
  "ME": { rate: 0.0715, name: "Maine" }, "MD": { rate: 0.0575, name: "Maryland" }, "MA": { rate: 0.05, name: "Massachusetts" },
  "MI": { rate: 0.0425, name: "Michigan" }, "MN": { rate: 0.0985, name: "Minnesota" }, "MS": { rate: 0.05, name: "Mississippi" },
  "MO": { rate: 0.048, name: "Missouri" }, "MT": { rate: 0.059, name: "Montana" }, "NE": { rate: 0.0584, name: "Nebraska" },
  "NV": { rate: 0, name: "Nevada" }, "NH": { rate: 0, name: "New Hampshire" }, "NJ": { rate: 0.1075, name: "New Jersey" },
  "NM": { rate: 0.059, name: "New Mexico" }, "NY": { rate: 0.109, name: "New York" }, "NC": { rate: 0.0525, name: "North Carolina" },
  "ND": { rate: 0.0195, name: "North Dakota" }, "OH": { rate: 0.035, name: "Ohio" }, "OK": { rate: 0.0475, name: "Oklahoma" },
  "OR": { rate: 0.099, name: "Oregon" }, "PA": { rate: 0.0307, name: "Pennsylvania" }, "RI": { rate: 0.0599, name: "Rhode Island" },
  "SC": { rate: 0.064, name: "South Carolina" }, "SD": { rate: 0, name: "South Dakota" }, "TN": { rate: 0, name: "Tennessee" },
  "TX": { rate: 0, name: "Texas" }, "UT": { rate: 0.0465, name: "Utah" }, "VT": { rate: 0.0875, name: "Vermont" },
  "VA": { rate: 0.0575, name: "Virginia" }, "WA": { rate: 0, name: "Washington" }, "WV": { rate: 0.055, name: "West Virginia" },
  "WI": { rate: 0.0765, name: "Wisconsin" }, "WY": { rate: 0, name: "Wyoming" }, "DC": { rate: 0.1075, name: "Washington D.C." }
};

export default function IncomeTaxCalculator() {
  const locale = useLocale();
  const { data: session } = useSession();
  const { t, translations } = useCalcTranslations(locale, CALCULATOR_SLUG);
  const hasTrackedView = useRef(false);
  const hasTrackedCalculation = useRef(false);

  // ==================== BASIC INFO ====================
  const [taxYear, setTaxYear] = useState<"2024" | "2025" | "2026">("2025");
  const [filingStatus, setFilingStatus] = useState<"single" | "married" | "marriedSeparate" | "head">("single");
  const [state, setState] = useState("CA");
  const [age, setAge] = useState(35);
  const [spouseAge, setSpouseAge] = useState(35);
  const [isBlind, setIsBlind] = useState(false);
  const [spouseBlind, setSpouseBlind] = useState(false);

  // ==================== INCOME ====================
  const [wages, setWages] = useState(75000);
  const [spouseWages, setSpouseWages] = useState(0);
  const [taxableInterest, setTaxableInterest] = useState(0);
  const [taxExemptInterest, setTaxExemptInterest] = useState(0);
  const [ordinaryDividends, setOrdinaryDividends] = useState(0);
  const [qualifiedDividends, setQualifiedDividends] = useState(0);
  const [shortTermGains, setShortTermGains] = useState(0);
  const [longTermGains, setLongTermGains] = useState(0);
  const [businessIncome, setBusinessIncome] = useState(0);
  const [rentalIncome, setRentalIncome] = useState(0);
  const [socialSecurityBenefits, setSocialSecurityBenefits] = useState(0);
  const [unemploymentComp, setUnemploymentComp] = useState(0);
  const [otherIncome, setOtherIncome] = useState(0);
  const [gamblingWinnings, setGamblingWinnings] = useState(0);

  // ==================== ADJUSTMENTS (ATL) ====================
  const [contribution401k, setContribution401k] = useState(0);
  const [contributionIRA, setContributionIRA] = useState(0);
  const [contributionHSA, setContributionHSA] = useState(0);
  const [studentLoanInterest, setStudentLoanInterest] = useState(0);
  const [educatorExpenses, setEducatorExpenses] = useState(0);
  const [alimonyPaid, setAlimonyPaid] = useState(0);
  const [healthInsuranceSE, setHealthInsuranceSE] = useState(0);
  const [sepIRA, setSepIRA] = useState(0);

  // ==================== DEDUCTIONS ====================
  const [deductionType, setDeductionType] = useState<"standard" | "itemized">("standard");
  const [medicalExpenses, setMedicalExpenses] = useState(0);
  const [stateLocalTaxPaid, setStateLocalTaxPaid] = useState(0);
  const [propertyTax, setPropertyTax] = useState(0);
  const [mortgageInterest, setMortgageInterest] = useState(0);
  const [mortgageInsurance, setMortgageInsurance] = useState(0);
  const [charitableCash, setCharitableCash] = useState(0);
  const [charitableNonCash, setCharitableNonCash] = useState(0);
  const [gamblingLosses, setGamblingLosses] = useState(0);
  const [otherItemized, setOtherItemized] = useState(0);

  // ==================== CREDITS & DEPENDENTS ====================
  const [childrenUnder17, setChildrenUnder17] = useState(0);
  const [childrenOther, setChildrenOther] = useState(0);
  const [otherDependents, setOtherDependents] = useState(0);
  const [childCareExpenses, setChildCareExpenses] = useState(0);
  const [educationExpenses, setEducationExpenses] = useState(0);
  const [numStudents, setNumStudents] = useState(0);
  const [foreignTaxPaid, setForeignTaxPaid] = useState(0);
  const [residentialEnergy, setResidentialEnergy] = useState(0);
  const [evCredit, setEvCredit] = useState(0);

  // ==================== WITHHOLDINGS ====================
  const [federalWithheld, setFederalWithheld] = useState(0);
  const [stateWithheld, setStateWithheld] = useState(0);
  const [estimatedPayments, setEstimatedPayments] = useState(0);

  // ==================== UI STATE ====================
  const [activeSection, setActiveSection] = useState<"income" | "adjustments" | "deductions" | "credits" | "payments">("income");
  const [showBracketModal, setShowBracketModal] = useState(false);

  // ==================== RESULTS ====================
  const [results, setResults] = useState({
    grossIncome: 0, agi: 0, taxableIncome: 0,
    federalTax: 0, capitalGainsTax: 0, selfEmploymentTax: 0, niit: 0,
    stateTax: 0, ficaTax: 0, totalTax: 0,
    childTaxCredit: 0, eitc: 0, childCareCredit: 0, educationCredit: 0, saverCredit: 0, otherCredits: 0, totalCredits: 0,
    totalPayments: 0, refundOrOwe: 0,
    effectiveRate: 0, marginalRate: 0, takeHomePay: 0,
    bracketBreakdown: [] as any[],
    taxableSS: 0, standardDeduction: 0, itemizedDeduction: 0, actualDeduction: 0
  });

  // Favorites & Save
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  // Track
  useEffect(() => {
    if (hasTrackedView.current) return;
    hasTrackedView.current = true;
    fetch("/api/track", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ calculatorSlug: CALCULATOR_SLUG, language: locale, type: "VIEW" }) }).catch(console.error);
  }, [locale]);

  const trackCalculation = () => {
    if (hasTrackedCalculation.current) return;
    hasTrackedCalculation.current = true;
    fetch("/api/track", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ calculatorSlug: CALCULATOR_SLUG, language: locale, type: "CALCULATION" }) }).catch(console.error);
  };

  const saveToHistory = async () => {
    if (!session?.user) return;
    setSaveStatus('saving');
    try {
      const res = await fetch("/api/history", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ calculatorSlug: CALCULATOR_SLUG, calculatorName: CALCULATOR_NAME, inputs: { taxYear, wages, filingStatus, state }, results: { totalTax: results.totalTax.toFixed(2), refundOrOwe: results.refundOrOwe.toFixed(2), effectiveRate: results.effectiveRate.toFixed(2) } }) });
      if (res.ok) { setSaveStatus('saved'); setTimeout(() => setSaveStatus('idle'), 2000); } else { setSaveStatus('error'); }
    } catch { setSaveStatus('error'); }
  };

  const handleInputChange = (setter: (value: any) => void, value: any) => { setter(value); trackCalculation(); };
  const SaveIndicator = () => { if (saveStatus === 'idle') return null; if (saveStatus === 'saving') return <span className="text-xs text-slate-400">Saving...</span>; if (saveStatus === 'saved') return <span className="text-xs text-green-500">✓ Saved</span>; return <span className="text-xs text-red-500">Error</span>; };

  useEffect(() => {
    const checkFavorite = async () => {
      try {
        const res = await fetch('/api/favorites');
        if (res.ok) { const data = await res.json(); setIsFavorite(data.favorites?.some((f: any) => f.calculatorSlug === CALCULATOR_SLUG)); }
      } catch {}
    };
    checkFavorite();
  }, []);

  const toggleFavorite = async () => {
    setFavoriteLoading(true);
    try {
      if (isFavorite) { await fetch(`/api/favorites?slug=${CALCULATOR_SLUG}`, { method: 'DELETE' }); setIsFavorite(false); }
      else { await fetch('/api/favorites', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ calculatorSlug: CALCULATOR_SLUG, calculatorName: CALCULATOR_NAME, category: CALCULATOR_CATEGORY }) }); setIsFavorite(true); }
    } catch {}
    setFavoriteLoading(false);
  };

  // ==================== MAIN CALCULATION ====================
  useEffect(() => {
    const data = TAX_DATA[taxYear];
    const status = filingStatus === "married" ? "married" : filingStatus;
    const brackets = data.brackets[status] || data.brackets.single;

    // 1. GROSS INCOME
    const totalWages = wages + (filingStatus === "married" ? spouseWages : 0);
    const investmentIncome = taxableInterest + ordinaryDividends + qualifiedDividends + shortTermGains + longTermGains;
    
    // Social Security taxable portion (up to 85%)
    const combinedIncome = totalWages + taxableInterest + ordinaryDividends + (socialSecurityBenefits * 0.5);
    const ssThreshold1 = filingStatus === "married" ? 32000 : 25000;
    const ssThreshold2 = filingStatus === "married" ? 44000 : 34000;
    let taxableSS = 0;
    if (combinedIncome > ssThreshold2) {
      taxableSS = Math.min(socialSecurityBenefits * 0.85, 4500 + (combinedIncome - ssThreshold2) * 0.85);
    } else if (combinedIncome > ssThreshold1) {
      taxableSS = Math.min(socialSecurityBenefits * 0.5, (combinedIncome - ssThreshold1) * 0.5);
    }

    const grossIncome = totalWages + investmentIncome + businessIncome + rentalIncome + taxableSS + 
                       unemploymentComp + otherIncome + gamblingWinnings;

    // 2. SELF-EMPLOYMENT TAX
    const seIncome = businessIncome * 0.9235;
    const seTax = businessIncome > 0 ? Math.min(seIncome, data.socialSecurityCap) * 0.124 + seIncome * 0.029 : 0;
    const seDeduction = seTax / 2;

    // 3. ADJUSTMENTS (AGI)
    const cap401k = Math.min(contribution401k, data.fourOhOneKLimit);
    const capIRA = Math.min(contributionIRA, data.iraLimit);
    const capHSA = Math.min(contributionHSA, filingStatus === "married" ? data.hsaLimit.family : data.hsaLimit.individual);
    const capStudentLoan = Math.min(studentLoanInterest, 2500);
    const capEducator = Math.min(educatorExpenses, 300);
    
    const totalAdjustments = cap401k + capIRA + capHSA + capStudentLoan + capEducator + 
                            alimonyPaid + seDeduction + healthInsuranceSE + sepIRA;
    const agi = Math.max(0, grossIncome - totalAdjustments);

    // 4. DEDUCTIONS
    let stdDeduction = data.standardDeduction[status];
    // Additional for age 65+ or blind
    const addDeduction = filingStatus === "single" || filingStatus === "head" ? 1950 : 1550;
    if (age >= 65) stdDeduction += addDeduction;
    if (isBlind) stdDeduction += addDeduction;
    if (filingStatus === "married" && spouseAge >= 65) stdDeduction += addDeduction;
    if (filingStatus === "married" && spouseBlind) stdDeduction += addDeduction;

    // Itemized
    const deductibleMedical = Math.max(0, medicalExpenses - agi * 0.075);
    const saltCapped = Math.min(stateLocalTaxPaid + propertyTax, data.saltCap);
    const totalCharitable = charitableCash + charitableNonCash;
    const cappedGambling = Math.min(gamblingLosses, gamblingWinnings);
    
    const itemizedTotal = deductibleMedical + saltCapped + mortgageInterest + mortgageInsurance + 
                         totalCharitable + cappedGambling + otherItemized;

    const actualDeduction = deductionType === "standard" ? stdDeduction : Math.max(itemizedTotal, stdDeduction);

    // 5. TAXABLE INCOME
    const ordinaryTaxable = Math.max(0, agi - actualDeduction - longTermGains - qualifiedDividends);
    const totalTaxable = Math.max(0, agi - actualDeduction);

    // 6. FEDERAL TAX ON ORDINARY INCOME
    let fedTax = 0;
    let remaining = ordinaryTaxable;
    const breakdown: any[] = [];
    let margRate = 0.10;

    for (const bracket of brackets) {
      if (remaining <= 0) break;
      const inBracket = Math.min(remaining, bracket.max - bracket.min);
      const taxInBracket = inBracket * bracket.rate;
      fedTax += taxInBracket;
      margRate = bracket.rate;
      if (inBracket > 0) {
        breakdown.push({
          rate: bracket.rate * 100,
          income: inBracket,
          tax: taxInBracket,
          range: `$${bracket.min.toLocaleString()} - ${bracket.max === Infinity ? '∞' : '$' + bracket.max.toLocaleString()}`
        });
      }
      remaining -= inBracket;
    }

    // 7. CAPITAL GAINS TAX
    let ltcgTax = 0;
    const ltcg = longTermGains + qualifiedDividends;
    if (ltcg > 0) {
      const ltcgBrackets = data.ltcgBrackets[status] || data.ltcgBrackets.single;
      let ltcgRemaining = ltcg;
      let stackedIncome = ordinaryTaxable;
      
      for (const bracket of ltcgBrackets) {
        if (ltcgRemaining <= 0) break;
        const spaceInBracket = Math.max(0, bracket.max - stackedIncome);
        const ltcgInBracket = Math.min(ltcgRemaining, spaceInBracket);
        ltcgTax += ltcgInBracket * bracket.rate;
        stackedIncome += ltcgInBracket;
        ltcgRemaining -= ltcgInBracket;
      }
    }

    // 8. NIIT (3.8%)
    const niitThreshold = filingStatus === "married" ? 250000 : 200000;
    const niitIncome = taxableInterest + ordinaryDividends + qualifiedDividends + shortTermGains + longTermGains + rentalIncome;
    const niit = agi > niitThreshold ? Math.min(niitIncome, agi - niitThreshold) * 0.038 : 0;

    // 9. FICA
    const ssTax = Math.min(totalWages, data.socialSecurityCap) * 0.062;
    const medicareTax = totalWages * 0.0145;
    const additionalMedicare = totalWages > (filingStatus === "married" ? 250000 : 200000) 
      ? (totalWages - (filingStatus === "married" ? 250000 : 200000)) * 0.009 : 0;
    const fica = ssTax + medicareTax + additionalMedicare;

    // 10. STATE TAX
    const stateRate = STATE_TAX[state]?.rate || 0;
    const stTax = totalTaxable * stateRate;

    // 11. TAX CREDITS
    // Child Tax Credit
    const ctcPhaseout = filingStatus === "married" ? 400000 : 200000;
    const ctcReduction = Math.max(0, Math.floor((agi - ctcPhaseout) / 1000) * 50);
    const maxCTC = childrenUnder17 * data.childTaxCredit;
    const ctc = Math.max(0, maxCTC - ctcReduction);

    // EITC (simplified)
    let eitc = 0;
    const earnedIncome = totalWages + businessIncome;
    const numEITC = Math.min(childrenUnder17 + childrenOther, 3);
    const eitcLimit = filingStatus === "married" 
      ? [24900, 54650, 61150, 65200][numEITC] 
      : [18150, 47900, 54400, 58450][numEITC];
    if (earnedIncome > 0 && earnedIncome < eitcLimit && agi < eitcLimit) {
      eitc = Math.min(data.eitcMax[numEITC], earnedIncome * [0.0765, 0.34, 0.40, 0.45][numEITC]);
    }

    // Child Care Credit
    const maxCareExpenses = (childrenUnder17 + childrenOther) >= 2 ? 6000 : 3000;
    const cappedCare = Math.min(childCareExpenses, maxCareExpenses);
    const careRate = agi <= 15000 ? 0.35 : Math.max(0.20, 0.35 - Math.floor((agi - 15000) / 2000) * 0.01);
    const childCareCredit = cappedCare * careRate;

    // Education Credit (AOTC)
    const aotc = numStudents > 0 && educationExpenses > 0 
      ? Math.min(numStudents * 2500, 2500 + Math.min(Math.max(0, educationExpenses - 2000), 2000) * 0.25) : 0;

    // Saver's Credit
    const saverBase = Math.min(contribution401k + contributionIRA, filingStatus === "married" ? 4000 : 2000);
    const saverRate = agi <= (filingStatus === "married" ? 46000 : 23000) ? 0.50 :
                     agi <= (filingStatus === "married" ? 50000 : 25000) ? 0.20 :
                     agi <= (filingStatus === "married" ? 76500 : 38250) ? 0.10 : 0;
    const saverCredit = saverBase * saverRate;

    // Other Credits
    const energyCredit = Math.min(residentialEnergy * 0.30, 3200) + Math.min(evCredit, 7500);
    const foreignCredit = Math.min(foreignTaxPaid, fedTax * 0.9);

    const totalCredits = ctc + childCareCredit + aotc + saverCredit + energyCredit + foreignCredit;

    // 12. TOTAL TAX
    const totalFederalTax = Math.max(0, fedTax + ltcgTax + niit + seTax - totalCredits);
    const totalTax = totalFederalTax + stTax + fica;

    // 13. REFUND OR OWE
    const totalPayments = federalWithheld + stateWithheld + estimatedPayments + eitc + 
      (ctc > fedTax ? Math.min(data.childTaxCreditRefundable * childrenUnder17, ctc - fedTax) : 0);
    const refundOrOwe = totalPayments - totalTax;

    // 14. RATES
    const effectiveRate = grossIncome > 0 ? (totalTax / grossIncome) * 100 : 0;
    const takeHome = grossIncome - totalTax;

    setResults({
      grossIncome, agi, taxableIncome: totalTaxable,
      federalTax: fedTax, capitalGainsTax: ltcgTax, selfEmploymentTax: seTax, niit,
      stateTax: stTax, ficaTax: fica, totalTax,
      childTaxCredit: ctc, eitc, childCareCredit, educationCredit: aotc, 
      saverCredit, otherCredits: energyCredit + foreignCredit, totalCredits,
      totalPayments, refundOrOwe,
      effectiveRate, marginalRate: margRate * 100, takeHomePay: takeHome,
      bracketBreakdown: breakdown,
      taxableSS, standardDeduction: stdDeduction, itemizedDeduction: itemizedTotal, actualDeduction
    });

  }, [taxYear, filingStatus, state, age, spouseAge, isBlind, spouseBlind, wages, spouseWages,
      taxableInterest, taxExemptInterest, ordinaryDividends, qualifiedDividends, shortTermGains, longTermGains,
      businessIncome, rentalIncome, socialSecurityBenefits, unemploymentComp, otherIncome, gamblingWinnings,
      contribution401k, contributionIRA, contributionHSA, studentLoanInterest, educatorExpenses, alimonyPaid,
      healthInsuranceSE, sepIRA, deductionType, medicalExpenses, stateLocalTaxPaid, propertyTax, mortgageInterest,
      mortgageInsurance, charitableCash, charitableNonCash, gamblingLosses, otherItemized, childrenUnder17,
      childrenOther, otherDependents, childCareExpenses, educationExpenses, numStudents, foreignTaxPaid,
      residentialEnergy, evCredit, federalWithheld, stateWithheld, estimatedPayments]);

  const formatMoney = (value: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);

  // Input component
  const MoneyInput = ({ label, value, onChange, hint, max }: { label: string; value: number; onChange: (v: number) => void; hint?: string; max?: number }) => (
    <div>
      <label className="text-sm font-medium text-slate-700 block mb-1">{label}</label>
      <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
        <span className="px-3 py-2 bg-slate-50 text-slate-600 border-r border-slate-200">$</span>
        <input type="text" value={value === 0 ? "" : value.toLocaleString()} onChange={(e) => { const n = Number(e.target.value.replace(/,/g, "")) || 0; onChange(max ? Math.min(n, max) : n); }} placeholder="0" className="flex-1 px-3 py-2 text-right font-medium text-slate-700 focus:outline-none" />
      </div>
      {hint && <p className="text-xs text-slate-400 mt-1">{hint}</p>}
    </div>
  );

  // FAQ data
  const faqs = [
    { question: "What is the difference between marginal and effective tax rate?", answer: "Your marginal rate is the rate on your last dollar of income (highest bracket). Your effective rate is total tax divided by total income - the actual percentage you pay overall." },
    { question: "Should I take the standard deduction or itemize?", answer: `Take whichever is higher. In ${taxYear}, the standard deduction is ${formatMoney(TAX_DATA[taxYear].standardDeduction.single)} (single) or ${formatMoney(TAX_DATA[taxYear].standardDeduction.married)} (married). Itemize if your mortgage interest, SALT (capped at $${TAX_DATA[taxYear].saltCap.toLocaleString()}), and charitable contributions exceed the standard deduction.` },
    { question: "How is Social Security taxed?", answer: "Up to 85% of your Social Security benefits may be taxable depending on your 'provisional income' (other income plus half of SS benefits). If provisional income exceeds $34,000 (single) or $44,000 (married), up to 85% is taxable." },
    { question: "What is the Net Investment Income Tax (NIIT)?", answer: "The NIIT is an additional 3.8% tax on investment income (interest, dividends, capital gains, rental income) for individuals with modified AGI over $200,000 (single) or $250,000 (married filing jointly)." },
    { question: "How are capital gains taxed?", answer: "Long-term capital gains (assets held >1 year) and qualified dividends are taxed at 0%, 15%, or 20% depending on your income. Short-term gains are taxed as ordinary income at your marginal rate." }
  ];

  const financeCalcs = ["Mortgage", "Loan", "Compound Interest", "Auto Loan", "Retirement", "Paycheck", "Profit Margin"];
  const healthCalcs = ["BMI", "Calorie", "Body Fat", "BMR", "Macro", "TDEE"];

  return (
    <>
      <Header />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) }) }} />

      {/* Bracket Modal */}
      {showBracketModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
            <div className="p-4 border-b border-slate-200 flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-900">{taxYear} Federal Tax Bracket Breakdown</h3>
              <button onClick={() => setShowBracketModal(false)} className="text-slate-400 hover:text-slate-600 text-2xl">&times;</button>
            </div>
            <div className="p-6 overflow-auto max-h-[60vh]">
              <p className="text-sm text-slate-600 mb-4">Taxable ordinary income: <strong>{formatMoney(results.taxableIncome - longTermGains - qualifiedDividends)}</strong></p>
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Bracket</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 uppercase">Income</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 uppercase">Tax</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {results.bracketBreakdown.map((row, i) => (
                    <tr key={i} className={i === results.bracketBreakdown.length - 1 ? "bg-blue-50" : ""}>
                      <td className="px-4 py-3"><span className="font-semibold text-blue-600">{row.rate}%</span><span className="text-xs text-slate-400 ml-2">{row.range}</span></td>
                      <td className="px-4 py-3 text-right text-slate-600">{formatMoney(row.income)}</td>
                      <td className="px-4 py-3 text-right font-semibold text-red-600">{formatMoney(row.tax)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-slate-100">
                  <tr><td className="px-4 py-3 font-bold">Total Federal Income Tax</td><td></td><td className="px-4 py-3 text-right font-bold text-red-600">{formatMoney(results.federalTax)}</td></tr>
                </tfoot>
              </table>
              {(results.capitalGainsTax > 0 || results.niit > 0) && (
                <div className="mt-4 p-4 bg-amber-50 rounded-lg">
                  <p className="text-sm font-medium text-amber-800">Additional Investment Taxes:</p>
                  {results.capitalGainsTax > 0 && <p className="text-sm text-amber-800">Long-Term Capital Gains Tax: {formatMoney(results.capitalGainsTax)}</p>}
                  {results.niit > 0 && <p className="text-sm text-amber-800">Net Investment Income Tax (3.8%): {formatMoney(results.niit)}</p>}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <main className="pt-20">
        {/* Hero */}
        <section className="bg-gradient-to-b from-blue-50 to-white py-6">
          <div className="container">
            <nav className="text-sm mb-4">
              <Link href={`/${locale}`} className="text-slate-600 hover:text-blue-600">Home</Link>
              <span className="mx-2 text-slate-400">/</span>
              <Link href={`/${locale}/calculators`} className="text-slate-600 hover:text-blue-600">Calculators</Link>
              <span className="mx-2 text-slate-400">/</span>
              <span className="text-slate-700">Income Tax</span>
            </nav>
            <div className="flex items-center gap-4 mb-2">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-2xl">🧾</div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Income Tax Calculator</h1>
                  <button onClick={toggleFavorite} disabled={favoriteLoading} className="p-2 rounded-full hover:bg-slate-100 transition-colors">
                    {isFavorite ? <svg className="w-6 h-6 text-red-500 fill-current" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                    : <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>}
                  </button>
                </div>
                <div className="flex items-center gap-2"><p className="text-slate-600">Estimate your {taxYear} federal and state income taxes, credits, and refund</p>{saveStatus !== 'idle' && <><span className="text-slate-400">—</span><SaveIndicator /></>}</div>
              </div>
            </div>
          </div>
        </section>

        {/* Calculator */}
        <section className="py-6 bg-white">
          <div className="container">
            <div className="grid lg:grid-cols-5 gap-6">
              {/* LEFT: Inputs (3 cols) */}
              <div className="lg:col-span-3 space-y-4">
                {/* Basic Info */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6">
                  <h2 className="text-lg font-bold text-slate-900 mb-4">📋 Basic Information</h2>
                  <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className="text-sm font-medium text-slate-700 block mb-2">Tax Year</label>
                      <div className="flex gap-2">
                        {(["2024", "2025", "2026"] as const).map((y) => (
                          <button key={y} onClick={() => handleInputChange(setTaxYear, y)} className={`flex-1 py-2 rounded-lg text-sm font-medium ${taxYear === y ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}>{y}</button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-700 block mb-2">State</label>
                      <select value={state} onChange={(e) => handleInputChange(setState, e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg">
                        {Object.entries(STATE_TAX).map(([code, data]) => (
                          <option key={code} value={code}>{data.name} {data.rate === 0 ? "(No tax)" : `(${(data.rate * 100).toFixed(1)}%)`}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-700 block mb-2">Your Age</label>
                      <input type="number" value={age} onChange={(e) => handleInputChange(setAge, Number(e.target.value) || 0)} className="w-full p-2 border border-slate-200 rounded-lg" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700 block mb-2">Filing Status</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {[{ v: "single", l: "Single" }, { v: "married", l: "Married Joint" }, { v: "marriedSeparate", l: "Married Separate" }, { v: "head", l: "Head of Household" }].map((o) => (
                        <button key={o.v} onClick={() => handleInputChange(setFilingStatus, o.v)} className={`py-2 px-3 rounded-lg text-sm font-medium ${filingStatus === o.v ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}>{o.l}</button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Section Tabs */}
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {[{ id: "income", l: "💰 Income" }, { id: "adjustments", l: "📉 Adjustments" }, { id: "deductions", l: "✂️ Deductions" }, { id: "credits", l: "🎁 Credits" }, { id: "payments", l: "💳 Payments" }].map((t) => (
                    <button key={t.id} onClick={() => setActiveSection(t.id as any)} className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${activeSection === t.id ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}>{t.l}</button>
                  ))}
                </div>

                {/* INCOME Section */}
                {activeSection === "income" && (
                  <div className="bg-white rounded-2xl border border-slate-200 p-6">
                    <h2 className="text-lg font-bold text-slate-900 mb-4">💰 Income Sources</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                      <MoneyInput label="Wages, Salaries, Tips (W-2)" value={wages} onChange={(v) => handleInputChange(setWages, v)} />
                      {filingStatus === "married" && <MoneyInput label="Spouse Wages" value={spouseWages} onChange={(v) => handleInputChange(setSpouseWages, v)} />}
                      <MoneyInput label="Taxable Interest" value={taxableInterest} onChange={(v) => handleInputChange(setTaxableInterest, v)} hint="Savings, CDs, bonds" />
                      <MoneyInput label="Tax-Exempt Interest" value={taxExemptInterest} onChange={(v) => handleInputChange(setTaxExemptInterest, v)} hint="Municipal bonds" />
                      <MoneyInput label="Ordinary Dividends" value={ordinaryDividends} onChange={(v) => handleInputChange(setOrdinaryDividends, v)} hint="Taxed as ordinary income" />
                      <MoneyInput label="Qualified Dividends" value={qualifiedDividends} onChange={(v) => handleInputChange(setQualifiedDividends, v)} hint="Taxed at LTCG rates" />
                      <MoneyInput label="Short-Term Capital Gains" value={shortTermGains} onChange={(v) => handleInputChange(setShortTermGains, v)} hint="Held < 1 year" />
                      <MoneyInput label="Long-Term Capital Gains" value={longTermGains} onChange={(v) => handleInputChange(setLongTermGains, v)} hint="Held > 1 year (0/15/20%)" />
                      <MoneyInput label="Self-Employment Income" value={businessIncome} onChange={(v) => handleInputChange(setBusinessIncome, v)} hint="Schedule C net profit" />
                      <MoneyInput label="Rental Income" value={rentalIncome} onChange={(v) => handleInputChange(setRentalIncome, v)} hint="Net rental income" />
                      <MoneyInput label="Social Security Benefits" value={socialSecurityBenefits} onChange={(v) => handleInputChange(setSocialSecurityBenefits, v)} hint={results.taxableSS > 0 ? `Taxable: ${formatMoney(results.taxableSS)}` : "Up to 85% may be taxable"} />
                      <MoneyInput label="Unemployment Compensation" value={unemploymentComp} onChange={(v) => handleInputChange(setUnemploymentComp, v)} />
                      <MoneyInput label="Gambling Winnings" value={gamblingWinnings} onChange={(v) => handleInputChange(setGamblingWinnings, v)} />
                      <MoneyInput label="Other Income" value={otherIncome} onChange={(v) => handleInputChange(setOtherIncome, v)} hint="Alimony received, etc." />
                    </div>
                  </div>
                )}

                {/* ADJUSTMENTS Section */}
                {activeSection === "adjustments" && (
                  <div className="bg-white rounded-2xl border border-slate-200 p-6">
                    <h2 className="text-lg font-bold text-slate-900 mb-4">📉 Above-the-Line Deductions</h2>
                    <p className="text-sm text-slate-600 mb-4">These reduce your AGI even if you don't itemize.</p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <MoneyInput label="401(k) Contributions" value={contribution401k} onChange={(v) => handleInputChange(setContribution401k, v)} hint={`Limit: $${TAX_DATA[taxYear].fourOhOneKLimit.toLocaleString()}`} max={TAX_DATA[taxYear].fourOhOneKLimit} />
                      <MoneyInput label="Traditional IRA" value={contributionIRA} onChange={(v) => handleInputChange(setContributionIRA, v)} hint={`Limit: $${TAX_DATA[taxYear].iraLimit.toLocaleString()}`} max={TAX_DATA[taxYear].iraLimit} />
                      <MoneyInput label="HSA Contribution" value={contributionHSA} onChange={(v) => handleInputChange(setContributionHSA, v)} hint={`Limit: $${TAX_DATA[taxYear].hsaLimit.individual.toLocaleString()} (ind) / $${TAX_DATA[taxYear].hsaLimit.family.toLocaleString()} (fam)`} />
                      <MoneyInput label="Student Loan Interest" value={studentLoanInterest} onChange={(v) => handleInputChange(setStudentLoanInterest, v)} hint="Max: $2,500" max={2500} />
                      <MoneyInput label="Educator Expenses" value={educatorExpenses} onChange={(v) => handleInputChange(setEducatorExpenses, v)} hint="Max: $300" max={300} />
                      <MoneyInput label="Self-Employed Health Insurance" value={healthInsuranceSE} onChange={(v) => handleInputChange(setHealthInsuranceSE, v)} />
                      <MoneyInput label="SEP IRA / SIMPLE" value={sepIRA} onChange={(v) => handleInputChange(setSepIRA, v)} />
                      <MoneyInput label="Alimony Paid" value={alimonyPaid} onChange={(v) => handleInputChange(setAlimonyPaid, v)} hint="Divorces before 2019 only" />
                    </div>
                    {businessIncome > 0 && <p className="text-sm text-green-600 mt-4">SE Tax Deduction (automatic): {formatMoney(results.selfEmploymentTax / 2)}</p>}
                  </div>
                )}

                {/* DEDUCTIONS Section */}
                {activeSection === "deductions" && (
                  <div className="bg-white rounded-2xl border border-slate-200 p-6">
                    <h2 className="text-lg font-bold text-slate-900 mb-4">✂️ Deductions</h2>
                    <div className="flex gap-2 mb-4">
                      <button onClick={() => handleInputChange(setDeductionType, "standard")} className={`flex-1 py-3 rounded-xl font-medium ${deductionType === "standard" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700"}`}>Standard ({formatMoney(results.standardDeduction)})</button>
                      <button onClick={() => handleInputChange(setDeductionType, "itemized")} className={`flex-1 py-3 rounded-xl font-medium ${deductionType === "itemized" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700"}`}>Itemized ({formatMoney(results.itemizedDeduction)})</button>
                    </div>
                    {deductionType === "itemized" && (
                      <div className="grid md:grid-cols-2 gap-4">
                        <MoneyInput label="Medical Expenses" value={medicalExpenses} onChange={(v) => handleInputChange(setMedicalExpenses, v)} hint={`Deductible above 7.5% of AGI (${formatMoney(results.agi * 0.075)})`} />
                        <MoneyInput label="State/Local Income Tax Paid" value={stateLocalTaxPaid} onChange={(v) => handleInputChange(setStateLocalTaxPaid, v)} />
                        <MoneyInput label="Property Taxes" value={propertyTax} onChange={(v) => handleInputChange(setPropertyTax, v)} />
                        <div className="md:col-span-2 p-3 bg-amber-50 rounded-lg"><p className="text-sm text-amber-800">⚠️ SALT Cap: ${TAX_DATA[taxYear].saltCap.toLocaleString()} (State/Local + Property taxes combined)</p></div>
                        <MoneyInput label="Mortgage Interest" value={mortgageInterest} onChange={(v) => handleInputChange(setMortgageInterest, v)} hint="On first $750K of debt" />
                        <MoneyInput label="Mortgage Insurance (PMI)" value={mortgageInsurance} onChange={(v) => handleInputChange(setMortgageInsurance, v)} />
                        <MoneyInput label="Charitable Cash" value={charitableCash} onChange={(v) => handleInputChange(setCharitableCash, v)} />
                        <MoneyInput label="Charitable Non-Cash" value={charitableNonCash} onChange={(v) => handleInputChange(setCharitableNonCash, v)} />
                        <MoneyInput label="Gambling Losses" value={gamblingLosses} onChange={(v) => handleInputChange(setGamblingLosses, v)} hint={`Limited to winnings (${formatMoney(gamblingWinnings)})`} />
                        <MoneyInput label="Other Itemized" value={otherItemized} onChange={(v) => handleInputChange(setOtherItemized, v)} />
                      </div>
                    )}
                    <div className="mt-4 flex gap-4">
                      <label className="flex items-center gap-2"><input type="checkbox" checked={isBlind} onChange={(e) => handleInputChange(setIsBlind, e.target.checked)} className="w-4 h-4" /><span className="text-sm text-slate-700">I am legally blind</span></label>
                      {filingStatus === "married" && <label className="flex items-center gap-2"><input type="checkbox" checked={spouseBlind} onChange={(e) => handleInputChange(setSpouseBlind, e.target.checked)} className="w-4 h-4" /><span className="text-sm text-slate-700">Spouse is blind</span></label>}
                    </div>
                  </div>
                )}

                {/* CREDITS Section */}
                {activeSection === "credits" && (
                  <div className="bg-white rounded-2xl border border-slate-200 p-6">
                    <h2 className="text-lg font-bold text-slate-900 mb-4">🎁 Tax Credits & Dependents</h2>
                    <div className="p-4 bg-slate-50 rounded-xl mb-4">
                      <h3 className="font-semibold text-slate-700 mb-3">Dependents</h3>
                      <div className="grid grid-cols-3 gap-4">
                        {[{ label: "Children Under 17", value: childrenUnder17, set: setChildrenUnder17, hint: `$${TAX_DATA[taxYear].childTaxCredit.toLocaleString()} credit each` },
                          { label: "Children 17+", value: childrenOther, set: setChildrenOther, hint: "For EITC/care credit" },
                          { label: "Other Dependents", value: otherDependents, set: setOtherDependents, hint: "$500 credit each" }].map((d) => (
                          <div key={d.label}>
                            <label className="text-xs text-slate-600 block mb-1">{d.label}</label>
                            <div className="flex items-center gap-2">
                              <button onClick={() => handleInputChange(d.set, Math.max(0, d.value - 1))} className="w-8 h-8 rounded-lg bg-white border border-slate-200 font-bold">-</button>
                              <span className="w-8 text-center font-bold text-blue-600">{d.value}</span>
                              <button onClick={() => handleInputChange(d.set, d.value + 1)} className="w-8 h-8 rounded-lg bg-white border border-slate-200 font-bold">+</button>
                            </div>
                            <p className="text-xs text-slate-400 mt-1">{d.hint}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <MoneyInput label="Child Care Expenses" value={childCareExpenses} onChange={(v) => handleInputChange(setChildCareExpenses, v)} hint={`Credit: ${formatMoney(results.childCareCredit)}`} />
                      <div>
                        <label className="text-sm font-medium text-slate-700 block mb-1"># College Students (AOTC)</label>
                        <input type="number" value={numStudents} onChange={(e) => handleInputChange(setNumStudents, Number(e.target.value) || 0)} className="w-full p-2 border border-slate-200 rounded-lg" min={0} />
                      </div>
                      <MoneyInput label="Education Expenses" value={educationExpenses} onChange={(v) => handleInputChange(setEducationExpenses, v)} hint={`Credit: ${formatMoney(results.educationCredit)}`} />
                      <MoneyInput label="Residential Energy" value={residentialEnergy} onChange={(v) => handleInputChange(setResidentialEnergy, v)} hint="30% credit, max $3,200" />
                      <MoneyInput label="EV Credit" value={evCredit} onChange={(v) => handleInputChange(setEvCredit, v)} hint="Up to $7,500" max={7500} />
                      <MoneyInput label="Foreign Tax Paid" value={foreignTaxPaid} onChange={(v) => handleInputChange(setForeignTaxPaid, v)} />
                    </div>
                    {results.eitc > 0 && <div className="mt-4 p-3 bg-green-50 rounded-lg"><p className="text-sm text-green-700 font-medium">Earned Income Tax Credit (EITC): {formatMoney(results.eitc)}</p><p className="text-xs text-green-600">This is a refundable credit</p></div>}
                  </div>
                )}

                {/* PAYMENTS Section */}
                {activeSection === "payments" && (
                  <div className="bg-white rounded-2xl border border-slate-200 p-6">
                    <h2 className="text-lg font-bold text-slate-900 mb-4">💳 Withholdings & Payments</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                      <MoneyInput label="Federal Tax Withheld (W-2 Box 2)" value={federalWithheld} onChange={(v) => handleInputChange(setFederalWithheld, v)} />
                      <MoneyInput label="State Tax Withheld" value={stateWithheld} onChange={(v) => handleInputChange(setStateWithheld, v)} />
                      <MoneyInput label="Estimated Tax Payments" value={estimatedPayments} onChange={(v) => handleInputChange(setEstimatedPayments, v)} />
                    </div>
                  </div>
                )}
              </div>

              {/* RIGHT: Results (2 cols) */}
              <div className="lg:col-span-2 space-y-4">
                {/* Main Result */}
                <div className={`rounded-2xl border-2 p-6 ${results.refundOrOwe >= 0 ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}>
                  <p className="text-sm text-slate-600 mb-1">{results.refundOrOwe >= 0 ? "Estimated Refund" : "Estimated Tax Owed"}</p>
                  <p className={`text-4xl font-bold ${results.refundOrOwe >= 0 ? "text-green-600" : "text-red-600"}`}>{results.refundOrOwe >= 0 ? formatMoney(results.refundOrOwe) : formatMoney(Math.abs(results.refundOrOwe))}</p>
                  <p className="text-xs text-slate-600 mt-2">Based on {taxYear} tax rates</p>
                </div>

                {/* Key Metrics */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-slate-50 rounded-xl"><p className="text-xs text-slate-600">Total Tax</p><p className="text-lg font-bold text-red-600">{formatMoney(results.totalTax)}</p></div>
                    <div className="p-3 bg-slate-50 rounded-xl"><p className="text-xs text-slate-600">Take-Home Pay</p><p className="text-lg font-bold text-green-600">{formatMoney(results.takeHomePay)}</p></div>
                    <div className="p-3 bg-slate-50 rounded-xl"><p className="text-xs text-slate-600">Effective Rate</p><p className="text-lg font-bold text-blue-600">{results.effectiveRate.toFixed(1)}%</p></div>
                    <div className="p-3 bg-slate-50 rounded-xl"><p className="text-xs text-slate-600">Marginal Rate</p><p className="text-lg font-bold text-slate-800">{results.marginalRate.toFixed(0)}%</p></div>
                  </div>
                </div>

                {/* Tax Breakdown */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6">
                  <h3 className="font-bold text-slate-900 mb-4">Tax Breakdown</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-slate-600">Gross Income</span><span className="font-medium">{formatMoney(results.grossIncome)}</span></div>
                    <div className="flex justify-between"><span className="text-slate-600">AGI</span><span className="font-medium">{formatMoney(results.agi)}</span></div>
                    <div className="flex justify-between"><span className="text-slate-600">Deductions ({deductionType})</span><span className="font-medium text-green-600">-{formatMoney(results.actualDeduction)}</span></div>
                    <div className="flex justify-between border-t pt-2"><span className="text-slate-600">Federal Income Tax</span><span className="font-medium">{formatMoney(results.federalTax)}</span></div>
                    {results.capitalGainsTax > 0 && <div className="flex justify-between"><span className="text-slate-600">Capital Gains Tax</span><span className="font-medium">{formatMoney(results.capitalGainsTax)}</span></div>}
                    {results.selfEmploymentTax > 0 && <div className="flex justify-between"><span className="text-slate-600">Self-Employment Tax</span><span className="font-medium">{formatMoney(results.selfEmploymentTax)}</span></div>}
                    {results.niit > 0 && <div className="flex justify-between"><span className="text-slate-600">NIIT (3.8%)</span><span className="font-medium">{formatMoney(results.niit)}</span></div>}
                    <div className="flex justify-between"><span className="text-slate-600">FICA (SS + Medicare)</span><span className="font-medium">{formatMoney(results.ficaTax)}</span></div>
                    <div className="flex justify-between"><span className="text-slate-600">State Tax ({state})</span><span className="font-medium">{formatMoney(results.stateTax)}</span></div>
                    {results.totalCredits > 0 && <div className="flex justify-between text-green-600"><span>Tax Credits</span><span className="font-medium">-{formatMoney(results.totalCredits)}</span></div>}
                    <div className="border-t pt-2 flex justify-between font-bold"><span>Total Tax</span><span className="text-red-600">{formatMoney(results.totalTax)}</span></div>
                  </div>
                </div>

                {/* View Breakdown Button */}
                <button onClick={() => setShowBracketModal(true)} className="w-full py-3 bg-slate-100 border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-200 font-medium">📊 View Tax Bracket Breakdown</button>

                {/* Export Buttons */}
                <div className={`grid ${session?.user ? 'grid-cols-3' : 'grid-cols-2'} gap-3`}>
                  {session?.user && <button onClick={saveToHistory} disabled={saveStatus === 'saving'} className="flex items-center justify-center gap-2 py-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 font-medium text-slate-700 text-sm">💾 Save</button>}
                  <button className="flex items-center justify-center gap-2 py-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 font-medium text-slate-700 text-sm">📄 PDF <span className="text-xs bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded-full">PRO</span></button>
                  <button className="flex items-center justify-center gap-2 py-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 font-medium text-slate-700 text-sm">📊 Excel <span className="text-xs bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded-full">PRO</span></button>
                </div>
              </div>
            </div>

            <div className="mt-8"><AdBlock slot="calculator-bottom" /></div>
          </div>
        </section>

        {/* Info Cards Section */}
        <section className="py-8 bg-white border-t border-slate-100">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Tax Planning Tips */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <span className="text-xl">💡</span> Tax Planning Tips
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span><strong className="text-slate-800">Max out retirement accounts:</strong> <span className="text-slate-600">401(k) and IRA contributions reduce your taxable income dollar-for-dollar</span></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span><strong className="text-slate-800">Use HSA triple tax advantage:</strong> <span className="text-slate-600">Tax-deductible contributions, tax-free growth, tax-free withdrawals for medical</span></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span><strong className="text-slate-800">Harvest capital losses:</strong> <span className="text-slate-600">Offset gains with losses, plus deduct up to $3,000 against ordinary income</span></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span><strong className="text-slate-800">Bunch itemized deductions:</strong> <span className="text-slate-600">Combine charitable donations in one year to exceed standard deduction threshold</span></span>
                  </li>
                </ul>
              </div>

              {/* Key Tax Numbers */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <span className="text-xl">📊</span> {taxYear} Key Tax Numbers
                </h3>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left py-2 text-slate-600 font-medium">Item</th>
                      <th className="text-right py-2 text-blue-600 font-medium">Single</th>
                      <th className="text-right py-2 text-blue-600 font-medium">Married</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="py-2 text-slate-700">Standard Deduction</td>
                      <td className="py-2 text-right font-medium">{formatMoney(TAX_DATA[taxYear].standardDeduction.single)}</td>
                      <td className="py-2 text-right font-medium">{formatMoney(TAX_DATA[taxYear].standardDeduction.married)}</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-slate-700">401(k) Limit</td>
                      <td className="py-2 text-right font-medium" colSpan={2}>{formatMoney(TAX_DATA[taxYear].fourOhOneKLimit)}</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-slate-700">IRA Limit</td>
                      <td className="py-2 text-right font-medium" colSpan={2}>{formatMoney(TAX_DATA[taxYear].iraLimit)}</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-slate-700">HSA Limit</td>
                      <td className="py-2 text-right font-medium">{formatMoney(TAX_DATA[taxYear].hsaLimit.individual)}</td>
                      <td className="py-2 text-right font-medium">{formatMoney(TAX_DATA[taxYear].hsaLimit.family)}</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-slate-700">SALT Cap</td>
                      <td className="py-2 text-right font-medium" colSpan={2}>{formatMoney(TAX_DATA[taxYear].saltCap)}</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-slate-700">Social Security Cap</td>
                      <td className="py-2 text-right font-medium" colSpan={2}>{formatMoney(TAX_DATA[taxYear].socialSecurityCap)}</td>
                    </tr>
                  </tbody>
                </table>
                <p className="text-xs text-slate-400 mt-3">*Age 50+ catch-up: +$7,500 (401k), +$1,000 (IRA/HSA)</p>
              </div>
            </div>

            {/* Example Calculation */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8">
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="text-xl">📊</span> Example Calculation
              </h3>
              <p className="text-slate-600 mb-4">
                Let's calculate the federal tax for a <span className="font-semibold text-blue-600">{filingStatus === "married" ? "married couple" : "single filer"}</span> with{" "}
                <span className="font-semibold text-blue-600">{formatMoney(results.grossIncome)}</span> gross income in{" "}
                <span className="font-semibold text-blue-600">{taxYear}</span>:
              </p>

              <div className="bg-blue-50 rounded-xl p-5 mb-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-sm text-slate-600">Gross Income: <span className="font-mono font-medium text-slate-800">{formatMoney(results.grossIncome)}</span></p>
                    <p className="text-sm text-slate-600">- Adjustments: <span className="font-mono font-medium text-green-600">-{formatMoney(results.grossIncome - results.agi)}</span></p>
                    <p className="text-sm text-slate-600">= AGI: <span className="font-mono font-medium text-slate-800">{formatMoney(results.agi)}</span></p>
                    <p className="text-sm text-slate-600">- {deductionType === "standard" ? "Standard" : "Itemized"} Deduction: <span className="font-mono font-medium text-green-600">-{formatMoney(results.actualDeduction)}</span></p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-slate-600">= Taxable Income: <span className="font-mono font-medium text-slate-800">{formatMoney(results.taxableIncome)}</span></p>
                    <p className="text-sm text-slate-600">Federal Tax: <span className="font-mono font-medium text-red-600">{formatMoney(results.federalTax)}</span></p>
                    {results.capitalGainsTax > 0 && <p className="text-sm text-slate-600">+ LTCG Tax: <span className="font-mono font-medium text-red-600">{formatMoney(results.capitalGainsTax)}</span></p>}
                    {results.totalCredits > 0 && <p className="text-sm text-slate-600">- Credits: <span className="font-mono font-medium text-green-600">-{formatMoney(results.totalCredits)}</span></p>}
                    <p className="text-sm font-semibold text-red-600">Total Federal Tax: <span className="font-mono">{formatMoney(Math.max(0, results.federalTax + results.capitalGainsTax + results.niit + results.selfEmploymentTax - results.totalCredits))}</span></p>
                  </div>
                </div>
              </div>

              <p className="text-slate-600">
                Your effective tax rate is <span className="font-semibold text-blue-600">{results.effectiveRate.toFixed(1)}%</span> - 
                meaning you keep <span className="font-semibold text-green-600">{formatMoney(results.takeHomePay)}</span> of your income after all taxes.
                {results.totalCredits > 0 && <span> Tax credits saved you <span className="font-semibold text-green-600">{formatMoney(results.totalCredits)}</span>!</span>}
              </p>
            </div>

            {/* Additional Info Cards */}
            <div className="grid md:grid-cols-3 gap-6 mt-6">
              {/* No-Tax States */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <span className="text-xl">🏝️</span> No Income Tax States
                </h3>
                <div className="flex flex-wrap gap-2">
                  {["AK", "FL", "NV", "NH", "SD", "TN", "TX", "WA", "WY"].map((st) => (
                    <span key={st} className={`px-2 py-1 rounded text-xs font-medium ${state === st ? "bg-green-500 text-white" : "bg-white text-green-700 border border-green-200"}`}>
                      {st}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-green-700 mt-3">Moving to a no-tax state could save you <span className="font-semibold">{formatMoney(results.stateTax)}/year</span> in state taxes</p>
              </div>

              {/* FICA Breakdown */}
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <span className="text-xl">🏛️</span> FICA Taxes ({taxYear})
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Social Security (6.2%)</span>
                    <span className="font-medium">{formatMoney(Math.min(wages + spouseWages, TAX_DATA[taxYear].socialSecurityCap) * 0.062)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Medicare (1.45%)</span>
                    <span className="font-medium">{formatMoney((wages + spouseWages) * 0.0145)}</span>
                  </div>
                  <div className="flex justify-between border-t border-amber-200 pt-2 font-semibold">
                    <span>Total FICA</span>
                    <span className="text-amber-800">{formatMoney(results.ficaTax)}</span>
                  </div>
                </div>
                <p className="text-xs text-amber-800 mt-3">SS wage cap: {formatMoney(TAX_DATA[taxYear].socialSecurityCap)}</p>
              </div>

              {/* Marginal vs Effective */}
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl border border-purple-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <span className="text-xl">📈</span> Your Tax Rates
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-slate-600">Marginal Rate</span>
                      <span className="text-lg font-bold text-purple-700">{results.marginalRate.toFixed(0)}%</span>
                    </div>
                    <div className="h-2 bg-purple-100 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500 rounded-full" style={{ width: `${results.marginalRate}%` }}></div>
                    </div>
                    <p className="text-xs text-slate-600 mt-1">Rate on your next dollar</p>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-slate-600">Effective Rate</span>
                      <span className="text-lg font-bold text-indigo-600">{results.effectiveRate.toFixed(1)}%</span>
                    </div>
                    <div className="h-2 bg-indigo-100 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${Math.min(results.effectiveRate, 100)}%` }}></div>
                    </div>
                    <p className="text-xs text-slate-600 mt-1">Actual % of income paid</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Educational Content */}
        <section className="py-12 bg-slate-50">
          <div className="container">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                {/* Tax Brackets Table */}
                <div className="bg-white rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">📊 {taxYear} Federal Tax Brackets ({filingStatus === "married" ? "Married Filing Jointly" : "Single"})</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead><tr className="border-b border-slate-200"><th className="text-left py-2 font-semibold text-slate-700">Rate</th><th className="text-right py-2 font-semibold text-slate-700">Income Range</th></tr></thead>
                      <tbody>
                        {(TAX_DATA[taxYear].brackets[filingStatus] || TAX_DATA[taxYear].brackets.single).map((b: any, i: number) => (
                          <tr key={i} className={`border-b border-slate-100 ${results.taxableIncome > b.min ? "bg-blue-50" : ""}`}>
                            <td className="py-2 font-medium text-blue-600">{(b.rate * 100).toFixed(0)}%</td>
                            <td className="py-2 text-right text-slate-600">${b.min.toLocaleString()} - {b.max === Infinity ? "∞" : `$${b.max.toLocaleString()}`}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* FAQ */}
                <div className="bg-white rounded-2xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">❓ Frequently Asked Questions</h2>
                  <div className="space-y-4">
                    {faqs.map((faq, i) => (
                      <details key={i} className="group">
                        <summary className="flex justify-between items-center cursor-pointer list-none p-4 bg-slate-50 rounded-xl hover:bg-slate-100">
                          <span className="font-semibold text-slate-900">{faq.question}</span>
                          <svg className="w-5 h-5 text-slate-600 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                        </summary>
                        <p className="text-slate-600 p-4 pt-2">{faq.answer}</p>
                      </details>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <AdBlock slot="calculator-sidebar" />
                <div className="bg-white rounded-2xl p-6 border border-slate-200">
                  <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2"><span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-sm">💰</span>Financial Calculators</h3>
                  <div className="space-y-2">{financeCalcs.map((c) => <Link key={c} href={`/${locale}/${c.toLowerCase().replace(/ /g, "-")}-calculator`} className="block text-blue-600 hover:text-blue-800 hover:underline text-sm">{c}</Link>)}</div>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-slate-200">
                  <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2"><span className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-sm">💪</span>Health Calculators</h3>
                  <div className="space-y-2">{healthCalcs.map((c) => <Link key={c} href={`/${locale}/${c.toLowerCase().replace(/ /g, "-")}-calculator`} className="block text-blue-600 hover:text-blue-800 hover:underline text-sm">{c}</Link>)}</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
