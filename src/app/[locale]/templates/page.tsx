"use client";

import { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import Link from "next/link";
import { useLocale } from "next-intl";
import { useSession } from "next-auth/react";

// ============================================
// TEMPLATE DATA
// ============================================
interface Template {
  id: string;
  name: { en: string; es: string; pt: string };
  description: { en: string; es: string; pt: string };
  category: "finance" | "health";
  format: "xlsx" | "pdf";
  icon: string;
  isPro: boolean;
  downloads: number;
  relatedCalculator?: string;
}

const templates: Template[] = [
  // FINANCE
  {
    id: "budget-planner",
    name: { en: "Monthly Budget Planner", es: "Planificador de Presupuesto", pt: "Planejador de Orçamento" },
    description: {
      en: "Track income, expenses, and savings goals with automatic calculations.",
      es: "Rastrea ingresos, gastos y metas de ahorro con cálculos automáticos.",
      pt: "Acompanhe receitas, despesas e metas com cálculos automáticos.",
    },
    category: "finance",
    format: "xlsx",
    icon: "📊",
    isPro: false,
    downloads: 12453,
    relatedCalculator: "budget-calculator",
  },
  {
    id: "debt-snowball",
    name: { en: "Debt Snowball Tracker", es: "Rastreador Bola de Nieve", pt: "Rastreador Bola de Neve" },
    description: {
      en: "Pay off debts strategically using the snowball method.",
      es: "Paga deudas estratégicamente con el método bola de nieve.",
      pt: "Pague dívidas estrategicamente com o método bola de neve.",
    },
    category: "finance",
    format: "xlsx",
    icon: "❄️",
    isPro: true,
    downloads: 8234,
    relatedCalculator: "credit-card-payoff-calculator",
  },
  {
    id: "net-worth",
    name: { en: "Net Worth Tracker", es: "Rastreador de Patrimonio", pt: "Rastreador de Patrimônio" },
    description: {
      en: "Monitor your assets and liabilities over time.",
      es: "Monitorea tus activos y pasivos a lo largo del tiempo.",
      pt: "Monitore seus ativos e passivos ao longo do tempo.",
    },
    category: "finance",
    format: "xlsx",
    icon: "💰",
    isPro: true,
    downloads: 6521,
  },
  {
    id: "investment-portfolio",
    name: { en: "Investment Portfolio", es: "Portafolio de Inversiones", pt: "Portfólio de Investimentos" },
    description: {
      en: "Track stocks, ETFs, and crypto in one place.",
      es: "Rastrea acciones, ETFs y crypto en un solo lugar.",
      pt: "Acompanhe ações, ETFs e crypto em um só lugar.",
    },
    category: "finance",
    format: "xlsx",
    icon: "📈",
    isPro: true,
    downloads: 9876,
    relatedCalculator: "investment-calculator",
  },
  {
    id: "mortgage-comparison",
    name: { en: "Mortgage Comparison", es: "Comparador de Hipotecas", pt: "Comparador de Hipotecas" },
    description: {
      en: "Compare multiple mortgage offers side by side.",
      es: "Compara múltiples ofertas de hipoteca.",
      pt: "Compare várias ofertas de hipoteca.",
    },
    category: "finance",
    format: "xlsx",
    icon: "🏠",
    isPro: true,
    downloads: 7234,
    relatedCalculator: "mortgage-calculator",
  },
  {
    id: "retirement-planner",
    name: { en: "Retirement Planner", es: "Planificador de Jubilación", pt: "Planejador de Aposentadoria" },
    description: {
      en: "Plan your retirement with savings projections.",
      es: "Planifica tu jubilación con proyecciones de ahorro.",
      pt: "Planeje sua aposentadoria com projeções de poupança.",
    },
    category: "finance",
    format: "xlsx",
    icon: "🏖️",
    isPro: true,
    downloads: 5432,
    relatedCalculator: "retirement-calculator",
  },
  {
    id: "emergency-fund",
    name: { en: "Emergency Fund Tracker", es: "Fondo de Emergencia", pt: "Fundo de Emergência" },
    description: {
      en: "Build your emergency fund with clear goals.",
      es: "Construye tu fondo de emergencia con metas claras.",
      pt: "Construa seu fundo de emergência com metas claras.",
    },
    category: "finance",
    format: "xlsx",
    icon: "🛡️",
    isPro: false,
    downloads: 4321,
    relatedCalculator: "savings-calculator",
  },
  {
    id: "tax-checklist",
    name: { en: "Tax Deduction Checklist", es: "Lista de Deducciones", pt: "Lista de Deduções" },
    description: {
      en: "Never miss a tax deduction again.",
      es: "Nunca pierdas una deducción fiscal.",
      pt: "Nunca perca uma dedução fiscal.",
    },
    category: "finance",
    format: "pdf",
    icon: "📋",
    isPro: true,
    downloads: 11234,
    relatedCalculator: "income-tax-calculator",
  },
  // HEALTH
  {
    id: "meal-planner",
    name: { en: "Weekly Meal Planner", es: "Planificador de Comidas", pt: "Planejador de Refeições" },
    description: {
      en: "Plan meals and auto-generate shopping lists.",
      es: "Planifica comidas y genera listas de compras.",
      pt: "Planeje refeições e gere listas de compras.",
    },
    category: "health",
    format: "xlsx",
    icon: "🥗",
    isPro: false,
    downloads: 15678,
    relatedCalculator: "calorie-calculator",
  },
  {
    id: "workout-log",
    name: { en: "Workout Log", es: "Registro de Ejercicios", pt: "Registro de Treinos" },
    description: {
      en: "Track workouts, sets, reps, and progress.",
      es: "Rastrea entrenamientos, series y repeticiones.",
      pt: "Acompanhe treinos, séries e repetições.",
    },
    category: "health",
    format: "xlsx",
    icon: "💪",
    isPro: true,
    downloads: 9876,
  },
  {
    id: "weight-tracker",
    name: { en: "Weight Loss Tracker", es: "Rastreador de Peso", pt: "Rastreador de Peso" },
    description: {
      en: "Track weight and visualize your progress.",
      es: "Rastrea peso y visualiza tu progreso.",
      pt: "Acompanhe peso e visualize seu progresso.",
    },
    category: "health",
    format: "xlsx",
    icon: "⚖️",
    isPro: true,
    downloads: 12345,
    relatedCalculator: "bmi-calculator",
  },
  {
    id: "body-measurements",
    name: { en: "Body Measurements", es: "Medidas Corporales", pt: "Medidas Corporais" },
    description: {
      en: "Track body measurements over time.",
      es: "Rastrea medidas corporales a lo largo del tiempo.",
      pt: "Acompanhe medidas corporais ao longo do tempo.",
    },
    category: "health",
    format: "pdf",
    icon: "📏",
    isPro: false,
    downloads: 6543,
  },
  {
    id: "pregnancy-tracker",
    name: { en: "Pregnancy Tracker", es: "Rastreador de Embarazo", pt: "Rastreador de Gravidez" },
    description: {
      en: "Week-by-week pregnancy journal.",
      es: "Diario de embarazo semana a semana.",
      pt: "Diário de gravidez semana a semana.",
    },
    category: "health",
    format: "pdf",
    icon: "🤰",
    isPro: true,
    downloads: 8765,
  },
  {
    id: "water-log",
    name: { en: "Water Intake Log", es: "Registro de Agua", pt: "Registro de Água" },
    description: {
      en: "Track daily water consumption.",
      es: "Rastrea tu consumo diario de agua.",
      pt: "Acompanhe seu consumo diário de água.",
    },
    category: "health",
    format: "pdf",
    icon: "💧",
    isPro: false,
    downloads: 4567,
  },
  {
    id: "macro-tracker",
    name: { en: "Macro Tracker", es: "Rastreador de Macros", pt: "Rastreador de Macros" },
    description: {
      en: "Track protein, carbs, and fats daily.",
      es: "Rastrea proteínas, carbos y grasas.",
      pt: "Acompanhe proteínas, carbos e gorduras.",
    },
    category: "health",
    format: "xlsx",
    icon: "🍗",
    isPro: true,
    downloads: 7890,
  },
  {
    id: "sleep-tracker",
    name: { en: "Sleep Tracker", es: "Rastreador de Sueño", pt: "Rastreador de Sono" },
    description: {
      en: "Monitor your sleep patterns and quality.",
      es: "Monitorea tus patrones de sueño.",
      pt: "Monitore seus padrões de sono.",
    },
    category: "health",
    format: "xlsx",
    icon: "😴",
    isPro: true,
    downloads: 5678,
  },
];

// ============================================
// TRANSLATIONS
// ============================================
const translations = {
  en: {
    pageTitle: "Templates",
    pageDesc: "Download free spreadsheets and PDFs",
    search: "Search...",
    all: "All",
    finance: "Finance",
    health: "Health",
    free: "Free",
    pro: "PRO",
    download: "Download",
    getAccess: "Get Access",
    downloads: "downloads",
    home: "Home",
    proTitle: "Unlock All Templates",
    proDesc: "Get unlimited access to all premium templates",
    upgrade: "Upgrade to PRO",
    month: "mo",
    noResults: "No templates found",
  },
  es: {
    pageTitle: "Plantillas",
    pageDesc: "Descarga hojas de cálculo y PDFs gratis",
    search: "Buscar...",
    all: "Todas",
    finance: "Finanzas",
    health: "Salud",
    free: "Gratis",
    pro: "PRO",
    download: "Descargar",
    getAccess: "Obtener",
    downloads: "descargas",
    home: "Inicio",
    proTitle: "Desbloquea Todas las Plantillas",
    proDesc: "Acceso ilimitado a todas las plantillas premium",
    upgrade: "Actualizar a PRO",
    month: "mes",
    noResults: "No se encontraron plantillas",
  },
  pt: {
    pageTitle: "Modelos",
    pageDesc: "Baixe planilhas e PDFs grátis",
    search: "Buscar...",
    all: "Todos",
    finance: "Finanças",
    health: "Saúde",
    free: "Grátis",
    pro: "PRO",
    download: "Baixar",
    getAccess: "Obter",
    downloads: "downloads",
    home: "Início",
    proTitle: "Desbloqueie Todos os Modelos",
    proDesc: "Acesso ilimitado a todos os modelos premium",
    upgrade: "Atualizar para PRO",
    month: "mês",
    noResults: "Nenhum modelo encontrado",
  },
};

const formatNum = (n: number) => (n >= 1000 ? (n / 1000).toFixed(1).replace(".0", "") + "k" : n);

// ============================================
// COMPONENT
// ============================================
export default function TemplatesPage() {
  const locale = useLocale() as "en" | "es" | "pt";
  const { data: session } = useSession();
  const t = translations[locale] || translations.en;

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<"all" | "finance" | "health">("all");
  const [modal, setModal] = useState(false);
  const [selected, setSelected] = useState<Template | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const isPro = session?.user && (session.user as any).isPro;

  const filtered = templates.filter((tpl) => {
    const name = tpl.name[locale] || tpl.name.en;
    const matchSearch = !search || name.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "all" || tpl.category === category;
    return matchSearch && matchCat;
  });

  const handleDownload = (tpl: Template) => {
    if (tpl.isPro && !isPro) {
      setSelected(tpl);
      setModal(true);
    } else {
      alert(`Downloading ${tpl.name[locale]}...`);
    }
  };

  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setModal(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, []);

  useEffect(() => {
    if (modal && closeRef.current) closeRef.current.focus();
  }, [modal]);

  return (
    <>
      <Header />

      {/* Modal */}
      {modal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50"
          role="dialog"
          aria-modal="true"
          onClick={() => setModal(false)}
        >
          <div
            className="bg-white w-full max-w-sm rounded-2xl p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-lg font-semibold text-slate-900">{t.proTitle}</h2>
              <button
                ref={closeRef}
                onClick={() => setModal(false)}
                className="text-slate-400 hover:text-slate-600"
                aria-label="Close"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {selected && (
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl mb-4">
                <span className="text-2xl">{selected.icon}</span>
                <span className="font-medium text-slate-700">{selected.name[locale]}</span>
              </div>
            )}

            <p className="text-slate-600 text-sm mb-4">{t.proDesc}</p>

            <p className="text-2xl font-bold text-slate-900 mb-4">
              $2.99<span className="text-sm font-normal text-slate-400">/{t.month}</span>
            </p>

            <Link
              href={`/${locale}/pricing`}
              className="block w-full py-3 text-center font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors"
            >
              {t.upgrade}
            </Link>
          </div>
        </div>
      )}

      <main className="pt-20 min-h-screen" id="main-content">
        {/* Hero */}
        <div className="bg-gradient-to-b from-slate-50 to-white">
          <div className="container py-10">
            <nav className="text-sm text-slate-600 mb-4" aria-label="Breadcrumb">
              <Link href={`/${locale}`} className="hover:text-blue-600">{t.home}</Link>
              <span className="mx-2">/</span>
              <span className="text-slate-800">{t.pageTitle}</span>
            </nav>
            <h1 className="text-3xl font-bold text-slate-900">{t.pageTitle}</h1>
            <p className="text-slate-600 mt-1">{t.pageDesc}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="sticky top-16 z-20 bg-white border-b border-slate-200">
          <div className="container py-3 flex flex-wrap items-center gap-3">
            {/* Search */}
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="search"
                placeholder={t.search}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-4 py-2 w-48 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label={t.search}
              />
            </div>

            {/* Category */}
            <div className="flex rounded-lg border border-slate-200 overflow-hidden">
              {(["all", "finance", "health"] as const).map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`px-4 py-2 text-sm font-medium transition-colors ${
                    category === c
                      ? "bg-blue-600 text-white"
                      : "bg-white text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {c === "all" ? t.all : c === "finance" ? t.finance : t.health}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="container py-8">
          {filtered.length === 0 ? (
            <p className="text-center text-slate-400 py-12">{t.noResults}</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filtered.map((tpl) => {
                const name = tpl.name[locale] || tpl.name.en;
                const desc = tpl.description[locale] || tpl.description.en;

                return (
                  <div
                    key={tpl.id}
                    className="group bg-white border border-slate-200 rounded-xl p-5 hover:border-blue-300 hover:shadow-md transition-all"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-3xl">{tpl.icon}</span>
                      <div className="flex items-center gap-1.5">
                        <span className={`text-xs font-medium px-2 py-0.5 rounded ${
                          tpl.format === "xlsx" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                        }`}>
                          {tpl.format.toUpperCase()}
                        </span>
                        {tpl.isPro ? (
                          <span className="text-xs font-medium px-2 py-0.5 rounded bg-blue-100 text-blue-700">
                            {t.pro}
                          </span>
                        ) : (
                          <span className="text-xs font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                            {t.free}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-semibold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                      {name}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-slate-600 mb-4 line-clamp-2">{desc}</p>

                    {/* Footer */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-400">
                        {formatNum(tpl.downloads)} {t.downloads}
                      </span>

                      <div className="flex items-center gap-2">
                        {tpl.relatedCalculator && (
                          <Link
                            href={`/${locale}/${tpl.relatedCalculator}`}
                            className="p-2 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                            aria-label="Related calculator"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                          </Link>
                        )}

                        <button
                          onClick={() => handleDownload(tpl)}
                          className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                            tpl.isPro && !isPro
                              ? "text-blue-600 bg-blue-50 hover:bg-blue-100"
                              : "text-white bg-blue-600 hover:bg-blue-700"
                          }`}
                        >
                          {tpl.isPro && !isPro ? t.getAccess : t.download}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* PRO Banner */}
        {!isPro && (
          <div className="container pb-12">
            <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-white">
                <h3 className="text-xl font-bold mb-1">{t.proTitle}</h3>
                <p className="text-blue-100">{t.proDesc}</p>
              </div>
              <Link
                href={`/${locale}/pricing`}
                className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl hover:shadow-lg transition-all whitespace-nowrap"
              >
                {t.upgrade} →
              </Link>
            </div>
          </div>
        )}
      </main>

      
    </>
  );
}
