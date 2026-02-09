"use client";

import { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import Link from "next/link";
import { useLocale } from "next-intl";
import { useSession } from "next-auth/react";
import AdBlock from "@/components/ads/AdBlock";
import { useCalcTranslations } from "@/lib/useCalcTranslations";

// =============================================================================
// CALCULATOR CONSTANTS
// =============================================================================
const CALCULATOR_SLUG = "random-number-generator";
const CALCULATOR_NAME = "Random Number Generator";
const CALCULATOR_CATEGORY = "everyday";

// =============================================================================
// TYPES
// =============================================================================
type GeneratorMode = "single" | "multiple" | "range" | "dice" | "coin" | "listPicker" | "shuffle" | "password";

// =============================================================================
// DICE OPTIONS
// =============================================================================
const DICE_OPTIONS = [
  { sides: 4, label: "D4", icon: "🎲" },
  { sides: 6, label: "D6", icon: "🎲" },
  { sides: 8, label: "D8", icon: "🎲" },
  { sides: 10, label: "D10", icon: "🎲" },
  { sides: 12, label: "D12", icon: "🎲" },
  { sides: 20, label: "D20", icon: "🎲" },
  { sides: 100, label: "D100", icon: "🎲" },
];

// =============================================================================
// MAIN COMPONENT
// =============================================================================
export default function RandomNumberGeneratorPage() {
  const locale = useLocale();
  const { data: session } = useSession();
  const { t, translations } = useCalcTranslations(locale, CALCULATOR_SLUG);
  const hasTrackedView = useRef(false);
  const hasTrackedCalculation = useRef(false);

  // ─────────────────────────────────────────────────────────────────────────────
  // STATE - Inputs
  // ─────────────────────────────────────────────────────────────────────────────
  const [generatorMode, setGeneratorMode] = useState<GeneratorMode>("single");
  
  // Single/Multiple number generation
  const [minValue, setMinValue] = useState(1);
  const [maxValue, setMaxValue] = useState(100);
  const [quantity, setQuantity] = useState(5);
  const [allowDuplicates, setAllowDuplicates] = useState(true);
  
  // Dice
  const [diceSides, setDiceSides] = useState(6);
  const [diceCount, setDiceCount] = useState(2);
  
  // Coin
  const [coinFlips, setCoinFlips] = useState(1);
  
  // List picker
  const [customList, setCustomList] = useState("Apple\nBanana\nCherry\nDate\nElderberry");
  const [pickCount, setPickCount] = useState(1);
  
  // Password
  const [passwordLength, setPasswordLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);

  // ─────────────────────────────────────────────────────────────────────────────
  // STATE - Results
  // ─────────────────────────────────────────────────────────────────────────────
  const [results, setResults] = useState<(number | string)[]>([]);
  const [diceResults, setDiceResults] = useState<number[]>([]);
  const [coinResults, setCoinResults] = useState<string[]>([]);
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);

  // ─────────────────────────────────────────────────────────────────────────────
  // STATE - UI
  // ─────────────────────────────────────────────────────────────────────────────
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState<{ mode: string; result: string; timestamp: Date }[]>([]);

  // ─────────────────────────────────────────────────────────────────────────────
  // TRACKING
  // ─────────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (hasTrackedView.current) return;
    hasTrackedView.current = true;
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        calculatorSlug: CALCULATOR_SLUG,
        language: locale,
        type: "VIEW",
      }),
    }).catch(console.error);
  }, [locale]);

  const trackCalculation = () => {
    if (hasTrackedCalculation.current) return;
    hasTrackedCalculation.current = true;
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        calculatorSlug: CALCULATOR_SLUG,
        language: locale,
        type: "CALCULATION",
      }),
    }).catch(console.error);
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // FAVORITES
  // ─────────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    const checkFavorite = async () => {
      try {
        const res = await fetch("/api/favorites");
        if (res.ok) {
          const data = await res.json();
          setIsFavorite(data.favorites?.some((f: { calculatorSlug: string }) => f.calculatorSlug === CALCULATOR_SLUG));
        }
      } catch {}
    };
    checkFavorite();
  }, []);

  const toggleFavorite = async () => {
    setFavoriteLoading(true);
    try {
      if (isFavorite) {
        await fetch(`/api/favorites?slug=${CALCULATOR_SLUG}`, { method: "DELETE" });
        setIsFavorite(false);
      } else {
        await fetch("/api/favorites", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            calculatorSlug: CALCULATOR_SLUG,
            calculatorName: CALCULATOR_NAME,
            category: CALCULATOR_CATEGORY,
          }),
        });
        setIsFavorite(true);
      }
    } catch {}
    setFavoriteLoading(false);
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // GENERATION FUNCTIONS
  // ─────────────────────────────────────────────────────────────────────────────
  
  const generateRandomInt = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const generateNumbers = () => {
    setIsAnimating(true);
    trackCalculation();
    
    setTimeout(() => {
      let newResults: number[] = [];
      
      if (generatorMode === "single") {
        newResults = [generateRandomInt(minValue, maxValue)];
      } else if (generatorMode === "multiple") {
        if (allowDuplicates) {
          for (let i = 0; i < quantity; i++) {
            newResults.push(generateRandomInt(minValue, maxValue));
          }
        } else {
          const range = maxValue - minValue + 1;
          const count = Math.min(quantity, range);
          const available = Array.from({ length: range }, (_, i) => minValue + i);
          for (let i = 0; i < count; i++) {
            const idx = generateRandomInt(0, available.length - 1);
            newResults.push(available.splice(idx, 1)[0]);
          }
        }
      }
      
      setResults(newResults);
      addToHistory("Numbers", newResults.join(", "));
      setIsAnimating(false);
    }, 300);
  };

  const rollDice = () => {
    setIsAnimating(true);
    trackCalculation();
    
    setTimeout(() => {
      const newResults: number[] = [];
      for (let i = 0; i < diceCount; i++) {
        newResults.push(generateRandomInt(1, diceSides));
      }
      setDiceResults(newResults);
      addToHistory(`${diceCount}D${diceSides}`, `${newResults.join(" + ")} = ${newResults.reduce((a, b) => a + b, 0)}`);
      setIsAnimating(false);
    }, 300);
  };

  const flipCoins = () => {
    setIsAnimating(true);
    trackCalculation();
    
    setTimeout(() => {
      const newResults: string[] = [];
      for (let i = 0; i < coinFlips; i++) {
        newResults.push(Math.random() < 0.5 ? "Heads" : "Tails");
      }
      setCoinResults(newResults);
      const heads = newResults.filter(r => r === "Heads").length;
      const tails = newResults.filter(r => r === "Tails").length;
      addToHistory("Coin Flip", `${heads} Heads, ${tails} Tails`);
      setIsAnimating(false);
    }, 300);
  };

  const pickFromList = () => {
    setIsAnimating(true);
    trackCalculation();
    
    setTimeout(() => {
      const items = customList.split("\n").filter(item => item.trim() !== "");
      const count = Math.min(pickCount, items.length);
      const picked: string[] = [];
      const available = [...items];
      
      for (let i = 0; i < count; i++) {
        const idx = generateRandomInt(0, available.length - 1);
        picked.push(available.splice(idx, 1)[0]);
      }
      
      setResults(picked);
      addToHistory("List Pick", picked.join(", "));
      setIsAnimating(false);
    }, 300);
  };

  const shuffleList = () => {
    setIsAnimating(true);
    trackCalculation();
    
    setTimeout(() => {
      const items = customList.split("\n").filter(item => item.trim() !== "");
      const shuffled = [...items];
      
      // Fisher-Yates shuffle
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = generateRandomInt(0, i);
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      
      setResults(shuffled);
      addToHistory("Shuffle", `${shuffled.length} items shuffled`);
      setIsAnimating(false);
    }, 300);
  };

  const generatePassword = () => {
    setIsAnimating(true);
    trackCalculation();
    
    setTimeout(() => {
      let chars = "";
      if (includeUppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      if (includeLowercase) chars += "abcdefghijklmnopqrstuvwxyz";
      if (includeNumbers) chars += "0123456789";
      if (includeSymbols) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";
      
      if (chars === "") chars = "abcdefghijklmnopqrstuvwxyz";
      
      let password = "";
      for (let i = 0; i < passwordLength; i++) {
        password += chars[generateRandomInt(0, chars.length - 1)];
      }
      
      setGeneratedPassword(password);
      addToHistory("Password", `${passwordLength} characters`);
      setIsAnimating(false);
    }, 300);
  };

  const addToHistory = (mode: string, result: string) => {
    setHistory(prev => [{ mode, result, timestamp: new Date() }, ...prev.slice(0, 9)]);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // SAVE TO HISTORY
  // ─────────────────────────────────────────────────────────────────────────────
  const saveToHistory = async () => {
    if (!session?.user) return;
    setSaveStatus("saving");
    try {
      const res = await fetch("/api/history", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          calculatorSlug: CALCULATOR_SLUG,
          calculatorName: CALCULATOR_NAME,
          inputs: {
            mode: generatorMode,
            range: `${minValue} - ${maxValue}`,
          },
          results: {
            values: results.join(", "),
          },
        }),
      });
      if (res.ok) {
        setSaveStatus("saved");
        setTimeout(() => setSaveStatus("idle"), 2000);
      } else {
        setSaveStatus("error");
      }
    } catch {
      setSaveStatus("error");
    }
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // FAQs
  // ─────────────────────────────────────────────────────────────────────────────
  const defaultFaqs = [
    {
      question: "How random are these numbers?",
      answer: "We use JavaScript's Math.random() which provides pseudorandom numbers suitable for most purposes like games, simulations, and random selection. For cryptographic purposes (security-critical applications), use a cryptographically secure random number generator."
    },
    {
      question: "Can I generate truly unique random numbers?",
      answer: "Yes! Disable 'Allow Duplicates' in the multiple numbers mode. This ensures each number appears only once in your results. Note that the quantity can't exceed the range (e.g., you can only get 10 unique numbers from 1-10)."
    },
    {
      question: "How does the dice roller work?",
      answer: "Each die is rolled independently with equal probability for each face. D6 means 1-6, D20 means 1-20, etc. Multiple dice show individual results and the sum. Great for tabletop RPGs like D&D!"
    },
    {
      question: "Is the coin flip fair?",
      answer: "Yes, each flip has exactly 50% probability for heads or tails. Unlike real coins which can have slight biases, our virtual coin is perfectly fair. Over many flips, you'll approach 50/50 distribution."
    },
    {
      question: "How secure are the generated passwords?",
      answer: "Our passwords use a good mix of character types and are suitable for most purposes. For maximum security, use a dedicated password manager. Remember: longer passwords are generally more secure than complex short ones."
    },
    {
      question: "Can I use this for raffles or giveaways?",
      answer: "Absolutely! Use the List Picker mode to randomly select winners from a list of names. For verifiable fairness in official contests, you may want to use a service that provides audit trails."
    },
  ];
  const faqs = translations?.faq || defaultFaqs;

  // ─────────────────────────────────────────────────────────────────────────────
  // SIDEBAR CALCULATORS
  // ─────────────────────────────────────────────────────────────────────────────
  const everydayCalcs = ["Tip", "Discount", "Percentage", "Age", "Date", "Unit Converter"];
  const financeCalcs = ["Mortgage", "Loan", "Compound Interest", "Auto Loan", "Savings", "Credit Card Payoff"];

  // =============================================================================
  // RENDER
  // =============================================================================
  return (
    <>
      <Header />

      {/* Schema.org FAQPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: { "@type": "Answer", text: faq.answer },
            })),
          }),
        }}
      />

      <main id="main-content" className="min-h-screen bg-white pt-16">
        {/* ─────────────────────────────────────────────────────────────────────────
            HERO SECTION
        ───────────────────────────────────────────────────────────────────────── */}
        <section className="bg-gradient-to-b from-blue-50 to-white py-4 md:py-6">
          <div className="container mx-auto px-4 max-w-6xl">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-slate-600 mb-6">
              <Link href={`/${locale}`} className="hover:text-blue-600 transition-colors">
                Home
              </Link>
              <span className="text-slate-400" aria-hidden="true">/</span>
              <Link href={`/${locale}/calculators`} className="hover:text-blue-600 transition-colors">
                Calculators
              </Link>
              <span className="text-slate-400" aria-hidden="true">/</span>
              <span className="text-slate-900 font-medium" aria-current="page">Random Number Generator</span>
            </nav>

            {/* Title */}
            <div className="flex items-center gap-4">
              <div 
                className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-2xl"
                role="img"
                aria-label="Random Number Generator icon"
              >
                🎲
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Random Number Generator</h1>
                <p className="text-slate-600 mt-1">Generate random numbers, roll dice, flip coins, and more</p>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────────────────
            CALCULATOR SECTION
        ───────────────────────────────────────────────────────────────────────── */}
        <section className="py-8 md:py-12">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* ═══════════════════════════════════════════════════════════════════
                  LEFT COLUMN - INPUTS
              ═══════════════════════════════════════════════════════════════════ */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-slate-900">Generator Settings</h2>
                  <button
                    onClick={toggleFavorite}
                    disabled={favoriteLoading}
                    className="p-2 rounded-lg hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                    aria-pressed={isFavorite}
                  >
                    {isFavorite ? (
                      <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                    ) : (
                      <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    )}
                  </button>
                </div>

                {/* Generator Mode */}
                <div className="mb-6">
                  <label id="mode-label" className="block font-medium text-slate-700 mb-2">
                    Generator Type
                  </label>
                  <div role="radiogroup" aria-labelledby="mode-label" className="grid grid-cols-4 gap-2">
                    {[
                      { key: "single", label: "Number", icon: "🔢" },
                      { key: "multiple", label: "Multiple", icon: "📊" },
                      { key: "dice", label: "Dice", icon: "🎲" },
                      { key: "coin", label: "Coin", icon: "🪙" },
                      { key: "listPicker", label: "Picker", icon: "🎯" },
                      { key: "shuffle", label: "Shuffle", icon: "🔀" },
                      { key: "password", label: "Password", icon: "🔐" },
                    ].map(({ key, label, icon }) => (
                      <button
                        key={key}
                        onClick={() => setGeneratorMode(key as GeneratorMode)}
                        role="radio"
                        aria-checked={generatorMode === key}
                        className={`p-2 rounded-xl border text-center transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          generatorMode === key
                            ? "border-blue-500 bg-blue-50"
                            : "border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <span className="text-lg block">{icon}</span>
                        <span className="text-xs font-medium text-slate-700">{label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-slate-200 my-6"></div>

                {/* Single/Multiple Number Inputs */}
                {(generatorMode === "single" || generatorMode === "multiple") && (
                  <>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <label htmlFor="min-value" className="block font-medium text-slate-700 mb-2">
                          Minimum
                        </label>
                        <input
                          id="min-value"
                          type="number"
                          value={minValue}
                          onChange={(e) => setMinValue(parseInt(e.target.value) || 0)}
                          className="w-full px-4 py-3 text-lg font-bold text-slate-900 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="max-value" className="block font-medium text-slate-700 mb-2">
                          Maximum
                        </label>
                        <input
                          id="max-value"
                          type="number"
                          value={maxValue}
                          onChange={(e) => setMaxValue(parseInt(e.target.value) || 0)}
                          className="w-full px-4 py-3 text-lg font-bold text-slate-900 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    {generatorMode === "multiple" && (
                      <>
                        <div className="mb-6">
                          <label htmlFor="quantity" className="block font-medium text-slate-700 mb-2">
                            How Many Numbers
                          </label>
                          <input
                            id="quantity"
                            type="number"
                            min="1"
                            max="100"
                            value={quantity}
                            onChange={(e) => setQuantity(Math.max(1, Math.min(100, parseInt(e.target.value) || 1)))}
                            className="w-full px-4 py-3 text-lg font-bold text-slate-900 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl mb-6">
                          <span className="font-medium text-slate-700">Allow Duplicates</span>
                          <button
                            onClick={() => setAllowDuplicates(!allowDuplicates)}
                            className={`relative w-12 h-6 rounded-full transition-colors ${
                              allowDuplicates ? "bg-blue-600" : "bg-slate-300"
                            }`}
                            role="switch"
                            aria-checked={allowDuplicates}
                          >
                            <span
                              className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                                allowDuplicates ? "translate-x-7" : "translate-x-1"
                              }`}
                            />
                          </button>
                        </div>
                      </>
                    )}

                    <button
                      onClick={generateNumbers}
                      disabled={isAnimating}
                      className="w-full py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-bold text-lg hover:from-blue-600 hover:to-cyan-600 transition-all disabled:opacity-50"
                    >
                      {isAnimating ? "Generating..." : "Generate"}
                    </button>
                  </>
                )}

                {/* Dice Inputs */}
                {generatorMode === "dice" && (
                  <>
                    <div className="mb-6">
                      <label className="block font-medium text-slate-700 mb-2">Dice Type</label>
                      <div className="grid grid-cols-4 gap-2">
                        {DICE_OPTIONS.map(({ sides, label }) => (
                          <button
                            key={sides}
                            onClick={() => setDiceSides(sides)}
                            className={`py-3 rounded-xl text-center font-bold transition-all ${
                              diceSides === sides
                                ? "bg-blue-600 text-white"
                                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                            }`}
                          >
                            {label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="mb-6">
                      <label htmlFor="dice-count" className="block font-medium text-slate-700 mb-2">
                        Number of Dice
                      </label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5, 6].map((num) => (
                          <button
                            key={num}
                            onClick={() => setDiceCount(num)}
                            className={`flex-1 py-3 rounded-xl font-bold transition-all ${
                              diceCount === num
                                ? "bg-blue-600 text-white"
                                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                            }`}
                          >
                            {num}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={rollDice}
                      disabled={isAnimating}
                      className="w-full py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-bold text-lg hover:from-blue-600 hover:to-cyan-600 transition-all disabled:opacity-50"
                    >
                      {isAnimating ? "Rolling..." : `Roll ${diceCount}D${diceSides}`}
                    </button>
                  </>
                )}

                {/* Coin Inputs */}
                {generatorMode === "coin" && (
                  <>
                    <div className="mb-6">
                      <label htmlFor="coin-flips" className="block font-medium text-slate-700 mb-2">
                        Number of Flips
                      </label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 5, 10].map((num) => (
                          <button
                            key={num}
                            onClick={() => setCoinFlips(num)}
                            className={`flex-1 py-3 rounded-xl font-bold transition-all ${
                              coinFlips === num
                                ? "bg-blue-600 text-white"
                                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                            }`}
                          >
                            {num}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={flipCoins}
                      disabled={isAnimating}
                      className="w-full py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-bold text-lg hover:from-blue-600 hover:to-cyan-600 transition-all disabled:opacity-50"
                    >
                      {isAnimating ? "Flipping..." : `Flip ${coinFlips} Coin${coinFlips > 1 ? "s" : ""}`}
                    </button>
                  </>
                )}

                {/* List Picker / Shuffle Inputs */}
                {(generatorMode === "listPicker" || generatorMode === "shuffle") && (
                  <>
                    <div className="mb-6">
                      <label htmlFor="custom-list" className="block font-medium text-slate-700 mb-2">
                        Items (one per line)
                      </label>
                      <textarea
                        id="custom-list"
                        value={customList}
                        onChange={(e) => setCustomList(e.target.value)}
                        rows={6}
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter items, one per line"
                      />
                    </div>

                    {generatorMode === "listPicker" && (
                      <div className="mb-6">
                        <label htmlFor="pick-count" className="block font-medium text-slate-700 mb-2">
                          How Many to Pick
                        </label>
                        <input
                          id="pick-count"
                          type="number"
                          min="1"
                          max={customList.split("\n").filter(i => i.trim()).length}
                          value={pickCount}
                          onChange={(e) => setPickCount(Math.max(1, parseInt(e.target.value) || 1))}
                          className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    )}

                    <button
                      onClick={generatorMode === "listPicker" ? pickFromList : shuffleList}
                      disabled={isAnimating}
                      className="w-full py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-bold text-lg hover:from-blue-600 hover:to-cyan-600 transition-all disabled:opacity-50"
                    >
                      {isAnimating ? "Processing..." : generatorMode === "listPicker" ? "Pick Random" : "Shuffle List"}
                    </button>
                  </>
                )}

                {/* Password Inputs */}
                {generatorMode === "password" && (
                  <>
                    <div className="mb-6">
                      <label htmlFor="password-length" className="block font-medium text-slate-700 mb-2">
                        Password Length: {passwordLength}
                      </label>
                      <input
                        id="password-length"
                        type="range"
                        min="8"
                        max="64"
                        value={passwordLength}
                        onChange={(e) => setPasswordLength(parseInt(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                      />
                    </div>

                    <div className="space-y-3 mb-6">
                      {[
                        { state: includeUppercase, setter: setIncludeUppercase, label: "Uppercase (A-Z)" },
                        { state: includeLowercase, setter: setIncludeLowercase, label: "Lowercase (a-z)" },
                        { state: includeNumbers, setter: setIncludeNumbers, label: "Numbers (0-9)" },
                        { state: includeSymbols, setter: setIncludeSymbols, label: "Symbols (!@#$...)" },
                      ].map(({ state, setter, label }) => (
                        <div key={label} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                          <span className="font-medium text-slate-700">{label}</span>
                          <button
                            onClick={() => setter(!state)}
                            className={`relative w-12 h-6 rounded-full transition-colors ${
                              state ? "bg-blue-600" : "bg-slate-300"
                            }`}
                            role="switch"
                            aria-checked={state}
                          >
                            <span
                              className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                                state ? "translate-x-7" : "translate-x-1"
                              }`}
                            />
                          </button>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={generatePassword}
                      disabled={isAnimating}
                      className="w-full py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-bold text-lg hover:from-blue-600 hover:to-cyan-600 transition-all disabled:opacity-50"
                    >
                      {isAnimating ? "Generating..." : "Generate Password"}
                    </button>
                  </>
                )}
              </div>

              {/* ═══════════════════════════════════════════════════════════════════
                  RIGHT COLUMN - RESULTS
              ═══════════════════════════════════════════════════════════════════ */}
              <div>
                {/* Main Result */}
                <div 
                  className={`bg-slate-50 rounded-2xl border border-slate-200 p-6 md:p-8 mb-4 ${isAnimating ? "animate-pulse" : ""}`}
                  role="region"
                  aria-label="Generator Results"
                  aria-live="polite"
                >
                  {/* Number Results */}
                  {(generatorMode === "single" || generatorMode === "multiple") && results.length > 0 && (
                    <>
                      <p className="text-sm text-slate-600 mb-1">
                        {generatorMode === "single" ? "Random Number" : `${results.length} Random Numbers`}
                      </p>
                      {generatorMode === "single" ? (
                        <p className="text-6xl font-bold text-blue-600 text-center py-8">{results[0]}</p>
                      ) : (
                        <div className="flex flex-wrap gap-2 my-4">
                          {results.map((num, idx) => (
                            <span key={idx} className="px-4 py-2 bg-white rounded-lg font-bold text-blue-600 border border-blue-200">
                              {num}
                            </span>
                          ))}
                        </div>
                      )}
                      <button
                        onClick={() => copyToClipboard(results.join(", "))}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        {copied ? "✓ Copied!" : "📋 Copy Results"}
                      </button>
                    </>
                  )}

                  {/* Dice Results */}
                  {generatorMode === "dice" && diceResults.length > 0 && (
                    <>
                      <p className="text-sm text-slate-600 mb-1">{diceCount}D{diceSides} Roll</p>
                      <div className="flex flex-wrap gap-3 justify-center my-4">
                        {diceResults.map((roll, idx) => (
                          <div key={idx} className="w-16 h-16 bg-white rounded-xl border-2 border-blue-300 flex items-center justify-center shadow-md">
                            <span className="text-3xl font-bold text-blue-600">{roll}</span>
                          </div>
                        ))}
                      </div>
                      <p className="text-center">
                        <span className="text-slate-600">Total: </span>
                        <span className="text-3xl font-bold text-slate-900">
                          {diceResults.reduce((a, b) => a + b, 0)}
                        </span>
                      </p>
                    </>
                  )}

                  {/* Coin Results */}
                  {generatorMode === "coin" && coinResults.length > 0 && (
                    <>
                      <p className="text-sm text-slate-600 mb-1">{coinFlips} Coin Flip{coinFlips > 1 ? "s" : ""}</p>
                      <div className="flex flex-wrap gap-3 justify-center my-4">
                        {coinResults.map((result, idx) => (
                          <div 
                            key={idx} 
                            className={`w-16 h-16 rounded-full flex items-center justify-center shadow-md ${
                              result === "Heads" ? "bg-amber-400" : "bg-slate-400"
                            }`}
                          >
                            <span className="text-white font-bold">{result === "Heads" ? "H" : "T"}</span>
                          </div>
                        ))}
                      </div>
                      <p className="text-center text-slate-600">
                        Heads: {coinResults.filter(r => r === "Heads").length} | 
                        Tails: {coinResults.filter(r => r === "Tails").length}
                      </p>
                    </>
                  )}

                  {/* List Picker / Shuffle Results */}
                  {(generatorMode === "listPicker" || generatorMode === "shuffle") && results.length > 0 && (
                    <>
                      <p className="text-sm text-slate-600 mb-1">
                        {generatorMode === "listPicker" ? "Selected" : "Shuffled Order"}
                      </p>
                      <div className="space-y-2 my-4">
                        {results.map((item, idx) => (
                          <div key={idx} className="p-3 bg-white rounded-lg border border-slate-200 flex items-center gap-3">
                            <span className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm">
                              {idx + 1}
                            </span>
                            <span className="font-medium text-slate-800">{item}</span>
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  {/* Password Result */}
                  {generatorMode === "password" && generatedPassword && (
                    <>
                      <p className="text-sm text-slate-600 mb-1">Generated Password</p>
                      <div className="bg-white rounded-xl p-4 my-4 border border-slate-200">
                        <p className="font-mono text-lg break-all text-slate-800">{generatedPassword}</p>
                      </div>
                      <button
                        onClick={() => copyToClipboard(generatedPassword)}
                        className="w-full py-2 bg-blue-100 text-blue-600 rounded-lg font-medium hover:bg-blue-200 transition-colors"
                      >
                        {copied ? "✓ Copied!" : "📋 Copy Password"}
                      </button>
                    </>
                  )}

                  {/* Empty State */}
                  {((generatorMode === "single" || generatorMode === "multiple") && results.length === 0) ||
                   (generatorMode === "dice" && diceResults.length === 0) ||
                   (generatorMode === "coin" && coinResults.length === 0) ||
                   ((generatorMode === "listPicker" || generatorMode === "shuffle") && results.length === 0) ||
                   (generatorMode === "password" && !generatedPassword) ? (
                    <div className="text-center py-12 text-slate-400">
                      <span className="text-6xl">🎲</span>
                      <p className="mt-4">Click Generate to get started!</p>
                    </div>
                  ) : null}
                </div>

                {/* History */}
                {history.length > 0 && (
                  <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-4">
                    <h3 className="font-bold text-slate-900 mb-4">📜 Recent History</h3>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {history.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center p-2 bg-slate-50 rounded-lg text-sm">
                          <span className="text-slate-600">{item.mode}</span>
                          <span className="font-medium text-slate-800 truncate max-w-[200px]">{item.result}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Export Buttons */}
                <div className={`grid ${session?.user ? "grid-cols-3" : "grid-cols-2"} gap-3`}>
                  {session?.user && (
                    <button
                      onClick={saveToHistory}
                      disabled={saveStatus === "saving"}
                      className="flex items-center justify-center gap-2 py-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 font-medium text-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {saveStatus === "saving" ? <>⏳ Saving...</> : saveStatus === "saved" ? <>✅ Saved!</> : <>💾 Save</>}
                    </button>
                  )}
                  <button className="flex items-center justify-center gap-2 py-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 font-medium text-slate-700 transition-colors">
                    📄 PDF <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">PRO</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 py-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 font-medium text-slate-700 transition-colors">
                    📊 Excel <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">PRO</span>
                  </button>
                </div>
              </div>
            </div>

            {/* AdBlock Bottom */}
            <div className="mt-8">
              <AdBlock slot="calculator-bottom" />
            </div>

            {/* ═══════════════════════════════════════════════════════════════════
                INFO CARDS
            ═══════════════════════════════════════════════════════════════════ */}
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">🎲 Dice Types Explained</h3>
                <ul className="space-y-2 text-slate-600 text-sm">
                  <li className="flex justify-between">
                    <span>D4 (4-sided)</span>
                    <span className="text-slate-600">Pyramid shape</span>
                  </li>
                  <li className="flex justify-between">
                    <span>D6 (6-sided)</span>
                    <span className="text-slate-600">Standard cube</span>
                  </li>
                  <li className="flex justify-between">
                    <span>D20 (20-sided)</span>
                    <span className="text-slate-600">Iconic RPG die</span>
                  </li>
                  <li className="flex justify-between">
                    <span>D100 (percentile)</span>
                    <span className="text-slate-600">Usually 2×D10</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">💡 Use Cases</h3>
                <ul className="space-y-2 text-slate-600 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">✓</span>
                    <span>Lottery number selection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">✓</span>
                    <span>Raffle & giveaway winners</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">✓</span>
                    <span>Game decisions & RPG rolls</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">✓</span>
                    <span>Random team assignments</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────────────────
            EDUCATIONAL CONTENT + SIDEBAR
        ───────────────────────────────────────────────────────────────────────── */}
        <section className="py-12 bg-slate-50">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content - 2 columns */}
              <div className="lg:col-span-2 space-y-8">
                <div className="bg-white rounded-2xl p-6">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">Understanding Randomness</h2>
                  <p className="text-slate-600 mb-4">
                    True randomness is surprisingly hard to achieve with computers. Our generator uses pseudorandom number generation (PRNG), which produces sequences that appear random and are statistically uniform. For most purposes—games, simulations, random selections—this is perfectly suitable.
                  </p>
                  <p className="text-slate-600">
                    For cryptographic security (like generating encryption keys), specialized hardware or algorithms are used. Our password generator provides good everyday security but shouldn&apos;t be relied upon for military-grade applications.
                  </p>
                </div>

                {/* FAQ Section */}
                <div className="bg-white rounded-2xl p-6">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
                  <div className="space-y-4">
                    {faqs.map((faq, index) => (
                      <details key={index} className="group">
                        <summary className="flex justify-between items-center cursor-pointer list-none p-4 bg-slate-50 rounded-xl hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <span className="font-semibold text-slate-900 pr-4">{faq.question}</span>
                          <svg className="w-5 h-5 text-slate-600 group-open:rotate-180 transition-transform flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
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
                  <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-sm">🧮</span>
                    Everyday Calculators
                  </h3>
                  <div className="space-y-2">
                    {everydayCalcs.map((calc) => (
                      <Link key={calc} href={`/${locale}/${calc.toLowerCase().replace(/ /g, "-")}-calculator`} className="block text-blue-600 hover:text-blue-800 hover:underline text-sm">
                        {calc} Calculator
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-slate-200">
                  <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-sm">💰</span>
                    Financial Calculators
                  </h3>
                  <div className="space-y-2">
                    {financeCalcs.map((calc) => (
                      <Link key={calc} href={`/${locale}/${calc.toLowerCase().replace(/ /g, "-")}-calculator`} className="block text-blue-600 hover:text-blue-800 hover:underline text-sm">
                        {calc} Calculator
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-6 text-white">
                  <h3 className="font-bold mb-2">📊 Percentage Calculator</h3>
                  <p className="text-blue-100 text-sm mb-4">
                    Calculate percentages, changes, and more.
                  </p>
                  <Link href={`/${locale}/percentage-calculator`} className="inline-block bg-white text-blue-600 font-medium px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors">
                    Try Percentage Calculator →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      
    </>
  );
}
