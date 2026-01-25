"use client";

import { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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
  format: "xlsx" | "pdf" | "sheets";
  icon: string;
  isPro: boolean;
  downloads: number;
  relatedCalculator?: string;
}

const templates: Template[] = [
  // ========== FINANCE TEMPLATES ==========
  {
    id: "budget-planner",
    name: {
      en: "Monthly Budget Planner",
      es: "Planificador de Presupuesto Mensual",
      pt: "Planejador de Orçamento Mensal",
    },
    description: {
      en: "Track income, expenses, and savings goals. Includes automatic calculations and visual charts.",
      es: "Rastrea ingresos, gastos y metas de ahorro. Incluye cálculos automáticos y gráficos.",
      pt: "Acompanhe receitas, despesas e metas. Inclui cálculos automáticos e gráficos.",
    },
    category: "finance",
    format: "xlsx",
    icon: "📊",
    isPro: false,
    downloads: 12453,
    relatedCalculator: "budget-calculator",
  },
  {
    id: "debt-snowball-tracker",
    name: {
      en: "Debt Snowball Tracker",
      es: "Rastreador Bola de Nieve",
      pt: "Rastreador Bola de Neve",
    },
    description: {
      en: "Pay off debts strategically using the snowball method. Track progress and stay motivated.",
      es: "Paga deudas estratégicamente con el método bola de nieve. Rastrea tu progreso.",
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
    id: "net-worth-tracker",
    name: {
      en: "Net Worth Tracker",
      es: "Rastreador de Patrimonio",
      pt: "Rastreador de Patrimônio",
    },
    description: {
      en: "Monitor assets and liabilities to track your financial progress over time.",
      es: "Monitorea activos y pasivos para rastrear tu progreso financiero.",
      pt: "Monitore ativos e passivos para acompanhar seu progresso financeiro.",
    },
    category: "finance",
    format: "xlsx",
    icon: "💎",
    isPro: true,
    downloads: 6521,
  },
  {
    id: "investment-portfolio",
    name: {
      en: "Investment Portfolio Tracker",
      es: "Rastreador de Portafolio",
      pt: "Rastreador de Portfólio",
    },
    description: {
      en: "Track stocks, bonds, ETFs, and crypto. Monitor performance and asset allocation.",
      es: "Rastrea acciones, bonos, ETFs y crypto. Monitorea rendimiento.",
      pt: "Acompanhe ações, títulos, ETFs e crypto. Monitore desempenho.",
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
    name: {
      en: "Mortgage Comparison Sheet",
      es: "Comparador de Hipotecas",
      pt: "Comparador de Hipotecas",
    },
    description: {
      en: "Compare multiple mortgage offers side by side. Find the best deal.",
      es: "Compara múltiples ofertas de hipoteca lado a lado.",
      pt: "Compare várias ofertas de hipoteca lado a lado.",
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
    name: {
      en: "Retirement Planning Worksheet",
      es: "Planificador de Jubilación",
      pt: "Planejador de Aposentadoria",
    },
    description: {
      en: "Plan retirement with projections for savings, investments, and income needs.",
      es: "Planifica tu jubilación con proyecciones de ahorros e inversiones.",
      pt: "Planeje aposentadoria com projeções de poupança e investimentos.",
    },
    category: "finance",
    format: "xlsx",
    icon: "🏖️",
    isPro: true,
    downloads: 5432,
    relatedCalculator: "retirement-calculator",
  },
  {
    id: "emergency-fund-tracker",
    name: {
      en: "Emergency Fund Tracker",
      es: "Rastreador Fondo de Emergencia",
      pt: "Rastreador Fundo de Emergência",
    },
    description: {
      en: "Build your emergency fund with clear goals and progress tracking.",
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
    id: "tax-deduction-checklist",
    name: {
      en: "Tax Deduction Checklist",
      es: "Lista de Deducciones Fiscales",
      pt: "Lista de Deduções Fiscais",
    },
    description: {
      en: "Never miss a deduction. Comprehensive checklist for personal and business taxes.",
      es: "Nunca pierdas una deducción. Lista completa para impuestos.",
      pt: "Nunca perca uma dedução. Lista completa para impostos.",
    },
    category: "finance",
    format: "pdf",
    icon: "📋",
    isPro: true,
    downloads: 11234,
    relatedCalculator: "income-tax-calculator",
  },

  // ========== HEALTH TEMPLATES ==========
  {
    id: "meal-planner",
    name: {
      en: "Weekly Meal Planner",
      es: "Planificador de Comidas",
      pt: "Planejador de Refeições",
    },
    description: {
      en: "Plan meals, track calories, and auto-generate shopping lists.",
      es: "Planifica comidas, rastrea calorías y genera listas de compras.",
      pt: "Planeje refeições, acompanhe calorias e gere listas de compras.",
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
    name: {
      en: "Workout Log & Tracker",
      es: "Registro de Ejercicios",
      pt: "Registro de Treinos",
    },
    description: {
      en: "Track workouts, sets, reps, and weights. Monitor strength gains.",
      es: "Rastrea entrenamientos, series, repeticiones y pesos.",
      pt: "Acompanhe treinos, séries, repetições e pesos.",
    },
    category: "health",
    format: "xlsx",
    icon: "💪",
    isPro: true,
    downloads: 9876,
  },
  {
    id: "weight-loss-tracker",
    name: {
      en: "Weight Loss Tracker",
      es: "Rastreador de Peso",
      pt: "Rastreador de Peso",
    },
    description: {
      en: "Track weight, measurements, and visualize your transformation.",
      es: "Rastrea peso, medidas y visualiza tu transformación.",
      pt: "Acompanhe peso, medidas e visualize sua transformação.",
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
    name: {
      en: "Body Measurements Log",
      es: "Registro de Medidas",
      pt: "Registro de Medidas",
    },
    description: {
      en: "Track chest, waist, hips, arms, and more over time.",
      es: "Rastrea pecho, cintura, caderas, brazos y más.",
      pt: "Acompanhe peito, cintura, quadris, braços e mais.",
    },
    category: "health",
    format: "pdf",
    icon: "📏",
    isPro: false,
    downloads: 6543,
  },
  {
    id: "pregnancy-tracker",
    name: {
      en: "Pregnancy Week-by-Week",
      es: "Embarazo Semana a Semana",
      pt: "Gravidez Semana a Semana",
    },
    description: {
      en: "Track appointments, symptoms, and baby development milestones.",
      es: "Rastrea citas, síntomas y desarrollo del bebé.",
      pt: "Acompanhe consultas, sintomas e desenvolvimento do bebê.",
    },
    category: "health",
    format: "pdf",
    icon: "🤰",
    isPro: true,
    downloads: 8765,
  },
  {
    id: "water-intake-log",
    name: {
      en: "Water Intake Log",
      es: "Registro de Agua",
      pt: "Registro de Água",
    },
    description: {
      en: "Stay hydrated. Track daily water consumption and build habits.",
      es: "Mantente hidratado. Rastrea consumo diario de agua.",
      pt: "Mantenha-se hidratado. Acompanhe consumo diário de água.",
    },
    category: "health",
    format: "pdf",
    icon: "💧",
    isPro: false,
    downloads: 4567,
  },
  {
    id: "macro-tracker",
    name: {
      en: "Macro Nutrient Tracker",
      es: "Rastreador de Macros",
      pt: "Rastreador de Macros",
    },
    description: {
      en: "Track protein, carbs, and fats daily with precision.",
      es: "Rastrea proteínas, carbohidratos y grasas diariamente.",
      pt: "Acompanhe proteínas, carboidratos e gorduras diariamente.",
    },
    category: "health",
    format: "xlsx",
    icon: "🍗",
    isPro: true,
    downloads: 7890,
  },
  {
    id: "sleep-tracker",
    name: {
      en: "Sleep Quality Tracker",
      es: "Rastreador de Sueño",
      pt: "Rastreador de Sono",
    },
    description: {
      en: "Monitor sleep patterns and identify factors affecting rest.",
      es: "Monitorea patrones de sueño e identifica factores.",
      pt: "Monitore padrões de sono e identifique fatores.",
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
    pageSubtitle: "Professional spreadsheets and PDFs for your finances and health",
    searchPlaceholder: "Search templates...",
    all: "All",
    finance: "Finance",
    health: "Health",
    free: "Free",
    pro: "PRO",
    downloads: "downloads",
    download: "Download",
    unlock: "Unlock",
    noResults: "No templates found",
    tryDifferent: "Try a different search or filter",
    breadcrumbHome: "Home",
    breadcrumbTemplates: "Templates",
    upgradeTitle: "Unlock all templates",
    upgradeDesc: "Get access to all premium templates with Kalcufy PRO",
    upgradeButton: "Upgrade to PRO",
    perMonth: "/month",
  },
  es: {
    pageTitle: "Plantillas",
    pageSubtitle: "Hojas de cálculo y PDFs profesionales para tus finanzas y salud",
    searchPlaceholder: "Buscar plantillas...",
    all: "Todas",
    finance: "Finanzas",
    health: "Salud",
    free: "Gratis",
    pro: "PRO",
    downloads: "descargas",
    download: "Descargar",
    unlock: "Desbloquear",
    noResults: "No se encontraron plantillas",
    tryDifferent: "Intenta con otra búsqueda o filtro",
    breadcrumbHome: "Inicio",
    breadcrumbTemplates: "Plantillas",
    upgradeTitle: "Desbloquea todas las plantillas",
    upgradeDesc: "Accede a todas las plantillas premium con Kalcufy PRO",
    upgradeButton: "Actualizar a PRO",
    perMonth: "/mes",
  },
  pt: {
    pageTitle: "Modelos",
    pageSubtitle: "Planilhas e PDFs profissionais para suas finanças e saúde",
    searchPlaceholder: "Buscar modelos...",
    all: "Todos",
    finance: "Finanças",
    health: "Saúde",
    free: "Grátis",
    pro: "PRO",
    downloads: "downloads",
    download: "Baixar",
    unlock: "Desbloquear",
    noResults: "Nenhum modelo encontrado",
    tryDifferent: "Tente outra busca ou filtro",
    breadcrumbHome: "Início",
    breadcrumbTemplates: "Modelos",
    upgradeTitle: "Desbloqueie todos os modelos",
    upgradeDesc: "Acesse todos os modelos premium com Kalcufy PRO",
    upgradeButton: "Atualizar para PRO",
    perMonth: "/mês",
  },
};

// Format number
const formatNumber = (num: number): string => {
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, "") + "k";
  }
  return num.toString();
};

// ============================================
// MAIN COMPONENT
// ============================================
export default function TemplatesPage() {
  const locale = useLocale() as "en" | "es" | "pt";
  const { data: session } = useSession();
  const t = translations[locale] || translations.en;

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<"all" | "finance" | "health">("all");
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

  const isPro = session?.user && (session.user as any).isPro;

  // Filter
  const filteredTemplates = templates.filter((template) => {
    const name = template.name[locale] || template.name.en;
    const desc = template.description[locale] || template.description.en;
    const matchesSearch =
      searchTerm === "" ||
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      desc.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || template.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Download handler
  const handleDownload = (template: Template) => {
    if (template.isPro && !isPro) {
      setSelectedTemplate(template);
      setShowUpgradeModal(true);
      return;
    }
    alert(`Downloading ${template.name[locale]}...`);
  };

  // Modal - ESC to close
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowUpgradeModal(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const closeButtonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (showUpgradeModal && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, [showUpgradeModal]);

  return (
    <>
      <Header />

      {/* Upgrade Modal - Minimal */}
      {showUpgradeModal && (
        <div
          className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          onClick={() => setShowUpgradeModal(false)}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-md p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 id="modal-title" className="text-xl font-semibold text-slate-900">
                  {t.upgradeTitle}
                </h2>
                <p className="text-slate-600 text-sm mt-1">{t.upgradeDesc}</p>
              </div>
              <button
                ref={closeButtonRef}
                onClick={() => setShowUpgradeModal(false)}
                className="p-1 text-slate-400 hover:text-slate-600 transition-colors"
                aria-label="Close"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {selectedTemplate && (
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl mb-6">
                <span className="text-2xl">{selectedTemplate.icon}</span>
                <div>
                  <p className="font-medium text-slate-900 text-sm">
                    {selectedTemplate.name[locale]}
                  </p>
                  <p className="text-xs text-slate-600">
                    {selectedTemplate.format.toUpperCase()} · {formatNumber(selectedTemplate.downloads)} {t.downloads}
                  </p>
                </div>
              </div>
            )}

            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-3xl font-bold text-slate-900">$2.99</span>
              <span className="text-slate-600">{t.perMonth}</span>
            </div>

            <Link
              href={`/${locale}/pricing`}
              className="block w-full py-3 text-center bg-slate-900 text-white font-medium rounded-xl hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
            >
              {t.upgradeButton}
            </Link>
          </div>
        </div>
      )}

      <main className="pt-20 min-h-screen bg-white" id="main-content">
        {/* Header */}
        <section className="border-b border-slate-100">
          <div className="container py-8">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="text-sm mb-6">
              <ol className="flex items-center gap-2 text-slate-600">
                <li>
                  <Link href={`/${locale}`} className="hover:text-slate-900 transition-colors">
                    {t.breadcrumbHome}
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-slate-900">{t.breadcrumbTemplates}</li>
              </ol>
            </nav>

            {/* Title */}
            <h1 className="text-3xl font-bold text-slate-900 mb-2">{t.pageTitle}</h1>
            <p className="text-slate-600">{t.pageSubtitle}</p>
          </div>
        </section>

        {/* Filters */}
        <section className="border-b border-slate-100 sticky top-16 bg-white z-30">
          <div className="container py-4">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <label htmlFor="search" className="sr-only">{t.searchPlaceholder}</label>
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  id="search"
                  type="search"
                  placeholder={t.searchPlaceholder}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Category Tabs */}
              <div className="flex gap-1 p-1 bg-slate-100 rounded-lg" role="tablist">
                {(["all", "finance", "health"] as const).map((cat) => (
                  <button
                    key={cat}
                    role="tab"
                    aria-selected={categoryFilter === cat}
                    onClick={() => setCategoryFilter(cat)}
                    className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      categoryFilter === cat
                        ? "bg-white text-slate-900 shadow-sm"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    {cat === "all" ? t.all : cat === "finance" ? t.finance : t.health}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Templates List */}
        <section className="py-6">
          <div className="container">
            {filteredTemplates.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-slate-400 text-lg mb-2">{t.noResults}</p>
                <p className="text-slate-400 text-sm">{t.tryDifferent}</p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {filteredTemplates.map((template) => {
                  const name = template.name[locale] || template.name.en;
                  const desc = template.description[locale] || template.description.en;

                  return (
                    <div
                      key={template.id}
                      className="flex items-center gap-4 py-4 group"
                    >
                      {/* Icon */}
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center text-xl group-hover:bg-slate-100 transition-colors">
                        {template.icon}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <h3 className="font-medium text-slate-900 truncate">
                            {name}
                          </h3>
                          <span className={`flex-shrink-0 text-xs px-1.5 py-0.5 rounded font-medium ${
                            template.format === "xlsx"
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-red-50 text-red-600"
                          }`}>
                            {template.format.toUpperCase()}
                          </span>
                          {template.isPro && (
                            <span className="flex-shrink-0 text-xs px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
                              {t.pro}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-slate-600 truncate">{desc}</p>
                      </div>

                      {/* Downloads */}
                      <div className="hidden sm:flex items-center gap-1 text-sm text-slate-400 flex-shrink-0">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        <span>{formatNumber(template.downloads)}</span>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {template.relatedCalculator && (
                          <Link
                            href={`/${locale}/${template.relatedCalculator}`}
                            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                            aria-label={`Calculator for ${name}`}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                          </Link>
                        )}

                        <button
                          onClick={() => handleDownload(template)}
                          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                            template.isPro && !isPro
                              ? "text-slate-600 bg-slate-100 hover:bg-slate-200 focus:ring-slate-500"
                              : "text-white bg-slate-900 hover:bg-slate-800 focus:ring-slate-900"
                          }`}
                          aria-label={`${template.isPro && !isPro ? t.unlock : t.download} ${name}`}
                        >
                          {template.isPro && !isPro ? t.unlock : t.download}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* PRO Banner - Minimal */}
        {!isPro && (
          <section className="py-12 border-t border-slate-100">
            <div className="container">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 bg-slate-50 rounded-2xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">{t.upgradeTitle}</h3>
                    <p className="text-sm text-slate-600">{t.upgradeDesc}</p>
                  </div>
                </div>
                <Link
                  href={`/${locale}/pricing`}
                  className="flex-shrink-0 px-6 py-2.5 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
                >
                  {t.upgradeButton}
                </Link>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}
