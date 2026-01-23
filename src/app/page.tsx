"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useRouter } from "next/navigation";

// All calculators for search
const allCalculators = [
  { name: "Compound Interest", slug: "compound-interest-calculator", category: "finance" },
  { name: "Mortgage", slug: "mortgage-calculator", category: "finance" },
  { name: "Loan", slug: "loan-calculator", category: "finance" },
  { name: "Auto Loan", slug: "auto-loan-calculator", category: "finance" },
  { name: "Retirement", slug: "retirement-calculator", category: "finance" },
  { name: "Investment", slug: "investment-calculator", category: "finance" },
  { name: "Savings", slug: "savings-calculator", category: "finance" },
  { name: "Interest Rate", slug: "interest-rate-calculator", category: "finance" },
  { name: "ROI", slug: "roi-calculator", category: "finance" },
  { name: "Amortization", slug: "amortization-calculator", category: "finance" },
  { name: "Down Payment", slug: "down-payment-calculator", category: "finance" },
  { name: "Salary", slug: "salary-calculator", category: "finance" },
  { name: "Income Tax", slug: "income-tax-calculator", category: "finance" },
  { name: "401K", slug: "401k-calculator", category: "finance" },
  { name: "Inflation", slug: "inflation-calculator", category: "finance" },
  { name: "BMI", slug: "bmi-calculator", category: "health" },
  { name: "Calorie", slug: "calorie-calculator", category: "health" },
  { name: "Macro", slug: "macro-calculator", category: "health" },
  { name: "TDEE", slug: "tdee-calculator", category: "health" },
  { name: "Body Fat", slug: "body-fat-calculator", category: "health" },
  { name: "BMR", slug: "bmr-calculator", category: "health" },
  { name: "Ideal Weight", slug: "ideal-weight-calculator", category: "health" },
  { name: "Protein", slug: "protein-calculator", category: "health" },
  { name: "Water Intake", slug: "water-intake-calculator", category: "health" },
  { name: "Pregnancy Due Date", slug: "pregnancy-calculator", category: "health" },
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const router = useRouter();

  // Filter calculators based on search
  const filteredCalcs = searchQuery.length > 0 
    ? allCalculators.filter(calc => 
        calc.name.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 6)
    : [];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/en/calculators?search=${encodeURIComponent(searchQuery)}`);
      setShowResults(false);
    }
  };

  return (
    <>
      <Header />
      
      <main>
        {/* HERO */}
        <section className="pt-28 pb-12 bg-gradient-to-b from-blue-50 to-white">
          <div className="container text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-100 text-blue-700 text-base font-semibold mb-8">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse"></span>
              45+ Free Calculators
            </div>
            
            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-5">
              Calculate Your
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Financial Future</span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
              Free, fast calculators for loans, investments, BMI, calories and more. 
              Make smarter decisions in seconds.
            </p>
            
            {/* Search Bar - AUTOCOMPLETE */}
            <form onSubmit={handleSearch} className="max-w-xl mx-auto mb-8 relative">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowResults(true);
                  }}
                  onFocus={() => setShowResults(true)}
                  placeholder="Search calculators... (e.g. mortgage, BMI)"
                  className="w-full px-6 py-4 pl-12 text-base border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none shadow-md bg-white"
                />
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700">
                  Search
                </button>
              </div>
              
              {/* Dropdown Results */}
              {showResults && filteredCalcs.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-lg z-50 overflow-hidden">
                  {filteredCalcs.map((calc) => (
                    <Link
                      key={calc.slug}
                      href={`/en/${calc.slug}`}
                      onClick={() => setShowResults(false)}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors"
                    >
                      <span className={`w-2 h-2 rounded-full ${calc.category === "finance" ? "bg-blue-500" : "bg-emerald-500"}`}></span>
                      <span className="font-medium text-slate-700">{calc.name} Calculator</span>
                      <span className="text-xs text-slate-400 ml-auto capitalize">{calc.category}</span>
                    </Link>
                  ))}
                  <Link
                    href={`/en/calculators?search=${encodeURIComponent(searchQuery)}`}
                    onClick={() => setShowResults(false)}
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-slate-50 text-blue-600 font-medium hover:bg-slate-100 border-t border-slate-100"
                  >
                    See all results for "{searchQuery}"
                  </Link>
                </div>
              )}
            </form>
            
            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
              <Link href="/en/calculators" className="px-8 py-4 text-base font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-500/25">
                Explore Calculators
              </Link>
              <Link href="/en/compound-interest-calculator" className="px-8 py-4 text-base font-semibold text-slate-700 bg-white border-2 border-slate-200 rounded-xl hover:border-blue-400">
                Try Compound Interest →
              </Link>
            </div>
            
            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-10">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">500K+</div>
                <div className="text-slate-500 text-sm">Calculations</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">50K+</div>
                <div className="text-slate-500 text-sm">Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">45+</div>
                <div className="text-slate-500 text-sm">Calculators</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">3</div>
                <div className="text-slate-500 text-sm">Languages</div>
              </div>
            </div>
          </div>
        </section>

        {/* CATEGORIES */}
        <section className="py-10 bg-white">
          <div className="container">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-slate-900 mb-2">Calculator Categories</h2>
            <p className="text-slate-600 text-center mb-8">Everything you need for your finances and health</p>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Finance */}
              <Link href="/en/calculators?category=finance" className="group bg-white rounded-2xl p-5 border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-2xl mb-3">💰</div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">Finance</h3>
                <p className="text-blue-600 font-semibold text-sm mb-1">25 Calculators</p>
                <p className="text-slate-500 text-xs">Loans, mortgages, investments...</p>
              </Link>
              
              {/* Health */}
              <Link href="/en/calculators?category=health" className="group bg-white rounded-2xl p-5 border border-slate-200 hover:border-emerald-300 hover:shadow-lg transition-all">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-2xl mb-3">💪</div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">Health & Fitness</h3>
                <p className="text-emerald-600 font-semibold text-sm mb-1">20 Calculators</p>
                <p className="text-slate-500 text-xs">BMI, calories, macros, TDEE...</p>
              </Link>
              
              {/* Math - Coming Soon */}
              <div className="relative bg-slate-50 rounded-2xl p-5 border border-dashed border-slate-300 opacity-75">
                <span className="absolute top-3 right-3 text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">Soon</span>
                <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-2xl mb-3">🔢</div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">Math</h3>
                <p className="text-purple-600 font-semibold text-sm mb-1">15+ Calculators</p>
                <p className="text-slate-500 text-xs">Percentages, fractions, algebra...</p>
              </div>
              
              {/* Everyday - Coming Soon */}
              <div className="relative bg-slate-50 rounded-2xl p-5 border border-dashed border-slate-300 opacity-75">
                <span className="absolute top-3 right-3 text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">Soon</span>
                <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-2xl mb-3">🏠</div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">Everyday</h3>
                <p className="text-orange-600 font-semibold text-sm mb-1">10+ Calculators</p>
                <p className="text-slate-500 text-xs">Tips, discounts, age, date...</p>
              </div>
            </div>
          </div>
        </section>

        {/* LANGUAGES */}
        <section className="py-12 bg-slate-50">
          <div className="container text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">Available in 3 Languages</h2>
            <p className="text-slate-600 mb-8">Use Kalcufy in your preferred language</p>
            
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/en" className="flex items-center gap-2 px-5 py-3 bg-blue-50 border-2 border-blue-200 rounded-xl hover:border-blue-400">
                <span className="text-2xl">🇺🇸</span>
                <span className="font-semibold text-slate-900">English</span>
              </Link>
              <Link href="/es" className="flex items-center gap-2 px-5 py-3 bg-white border-2 border-slate-200 rounded-xl hover:border-blue-400">
                <span className="text-2xl">🇪🇸</span>
                <span className="font-semibold text-slate-900">Español</span>
              </Link>
              <Link href="/pt" className="flex items-center gap-2 px-5 py-3 bg-white border-2 border-slate-200 rounded-xl hover:border-blue-400">
                <span className="text-2xl">🇧🇷</span>
                <span className="font-semibold text-slate-900">Português</span>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-cyan-500">
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Start Calculating Now</h2>
            <p className="text-blue-100 mb-8">Join 50,000+ users making smarter decisions</p>
            <Link href="/en/calculators" className="inline-block px-8 py-4 text-lg font-bold text-blue-600 bg-white rounded-xl hover:bg-blue-50 shadow-lg">
              Explore Calculators
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
