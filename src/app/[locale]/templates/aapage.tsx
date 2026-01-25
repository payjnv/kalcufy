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
      en: "Track income, expenses, and savings goals with this comprehensive budget spreadsheet. Includes automatic calculations and visual charts.",
      es: "Rastrea ingresos, gastos y metas de ahorro con esta hoja de cálculo completa. Incluye cálculos automáticos y gráficos visuales.",
      pt: "Acompanhe receitas, despesas e metas de economia com esta planilha completa. Inclui cálculos automáticos e gráficos visuais.",
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
      en: "Pay off debts strategically using the snowball method. Track progress, celebrate milestones, and stay motivated on your debt-free journey.",
      es: "Paga deudas estratégicamente usando el método bola de nieve. Rastrea tu progreso y mantente motivado en tu viaje libre de deudas.",
      pt: "Pague dívidas estrategicamente usando o método bola de neve. Acompanhe o progresso e mantenha-se motivado.",
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
      en: "Monitor your assets and liabilities to track your financial progress over time. See your wealth grow month by month.",
      es: "Monitorea tus activos y pasivos para rastrear tu progreso financiero. Ve crecer tu riqueza mes a mes.",
      pt: "Monitore seus ativos e passivos para acompanhar seu progresso financeiro. Veja sua riqueza crescer.",
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
      en: "Track stocks, bonds, ETFs, and crypto in one place. Monitor performance, dividends, and asset allocation with beautiful charts.",
      es: "Rastrea acciones, bonos, ETFs y crypto en un solo lugar. Monitorea rendimiento y asignación de activos.",
      pt: "Acompanhe ações, títulos, ETFs e crypto em um só lugar. Monitore desempenho e alocação de ativos.",
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
      en: "Compare multiple mortgage offers side by side. Calculate total costs, monthly payments, and find the best deal for your situation.",
      es: "Compara múltiples ofertas de hipoteca lado a lado. Calcula costos totales y encuentra la mejor opción.",
      pt: "Compare várias ofertas de hipoteca lado a lado. Calcule custos totais e encontre a melhor opção.",
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
      en: "Plan your retirement with detailed projections for savings, investments, and income needs. Know exactly when you can retire.",
      es: "Planifica tu jubilación con proyecciones detalladas de ahorros, inversiones e ingresos necesarios.",
      pt: "Planeje sua aposentadoria com projeções detalhadas de poupança, investimentos e renda necessária.",
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
      en: "Build your emergency fund with clear goals and progress tracking. Stay motivated with visual milestones and celebrations.",
      es: "Construye tu fondo de emergencia con metas claras y seguimiento visual de progreso.",
      pt: "Construa seu fundo de emergência com metas claras e acompanhamento visual de progresso.",
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
      en: "Never miss a deduction again. Comprehensive checklist for personal and business taxes with explanations and tips.",
      es: "Nunca pierdas una deducción. Lista completa para impuestos personales y empresariales con explicaciones.",
      pt: "Nunca perca uma dedução. Lista completa para impostos pessoais e empresariais com explicações.",
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
      en: "Plan your meals for the week, track calories and macros, and auto-generate shopping lists. Eat healthy without the stress.",
      es: "Planifica tus comidas semanales, rastrea calorías y macros, y genera listas de compras automáticamente.",
      pt: "Planeje suas refeições semanais, acompanhe calorias e macros, e gere listas de compras automaticamente.",
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
      en: "Track workouts, sets, reps, and weights. Monitor strength gains over time with progress charts and personal records.",
      es: "Rastrea entrenamientos, series, repeticiones y pesos. Monitorea ganancias de fuerza con gráficos.",
      pt: "Acompanhe treinos, séries, repetições e pesos. Monitore ganhos de força com gráficos de progresso.",
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
      es: "Rastreador de Pérdida de Peso",
      pt: "Rastreador de Perda de Peso",
    },
    description: {
      en: "Track weight, measurements, and progress photos. Visualize your transformation with charts and celebrate milestones.",
      es: "Rastrea peso, medidas y fotos de progreso. Visualiza tu transformación con gráficos y celebra hitos.",
      pt: "Acompanhe peso, medidas e fotos de progresso. Visualize sua transformação com gráficos.",
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
      es: "Registro de Medidas Corporales",
      pt: "Registro de Medidas Corporais",
    },
    description: {
      en: "Track chest, waist, hips, arms, and more. Perfect companion to BMI calculator for complete body composition tracking.",
      es: "Rastrea pecho, cintura, caderas, brazos y más. Perfecto complemento para rastrear composición corporal.",
      pt: "Acompanhe peito, cintura, quadris, braços e mais. Complemento perfeito para acompanhar composição corporal.",
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
      en: "Track appointments, symptoms, baby development milestones, and prepare for birth with this comprehensive pregnancy journal.",
      es: "Rastrea citas, síntomas, desarrollo del bebé y prepárate para el parto con este diario completo.",
      pt: "Acompanhe consultas, sintomas, desenvolvimento do bebê e prepare-se para o parto.",
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
      es: "Registro de Consumo de Agua",
      pt: "Registro de Consumo de Água",
    },
    description: {
      en: "Stay hydrated and build healthy habits. Track daily water consumption with visual progress and streak tracking.",
      es: "Mantente hidratado y crea hábitos saludables. Rastrea el consumo diario con progreso visual.",
      pt: "Mantenha-se hidratado e crie hábitos saudáveis. Acompanhe o consumo diário com progresso visual.",
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
      en: "Track protein, carbs, and fats daily with precision. Perfect for bodybuilding, keto, or any specific diet plan.",
      es: "Rastrea proteínas, carbohidratos y grasas diariamente con precisión. Perfecto para cualquier dieta.",
      pt: "Acompanhe proteínas, carboidratos e gorduras diariamente com precisão. Perfeito para qualquer dieta.",
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
      es: "Rastreador de Calidad de Sueño",
      pt: "Rastreador de Qualidade do Sono",
    },
    description: {
      en: "Monitor sleep patterns and quality. Identify factors affecting your rest and optimize your sleep schedule.",
      es: "Monitorea patrones y calidad de sueño. Identifica factores que afectan tu descanso.",
      pt: "Monitore padrões e qualidade do sono. Identifique fatores que afetam seu descanso.",
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
    pageSubtitle: "Professional spreadsheets and PDFs to manage your finances and health",
    searchPlaceholder: "Search templates...",
    allCategories: "All",
    finance: "Finance",
    health: "Health",
    free: "FREE",
    pro: "PRO",
    downloads: "downloads",
    downloadNow: "Download",
    getPro: "Unlock with PRO",
    upgradeToDownload: "Upgrade to PRO to download",
    preview: "Preview",
    relatedCalc: "Try Calculator",
    formatExcel: "XLSX",
    formatPdf: "PDF",
    formatSheets: "Sheets",
    filterAll: "All",
    filterFree: "Free",
    filterPro: "PRO",
    noResults: "No templates found",
    tryDifferent: "Try a different search term or category",
    proFeatures: "Unlock All Templates",
    proFeature1: "Access all premium templates",
    proFeature2: "Download in multiple formats",
    proFeature3: "No ads, unlimited downloads",
    proFeature4: "Early access to new templates",
    upgradeNow: "Upgrade to PRO",
    breadcrumbHome: "Home",
    breadcrumbTemplates: "Templates",
    templatesCount: "templates",
  },
  es: {
    pageTitle: "Plantillas",
    pageSubtitle: "Hojas de cálculo y PDFs profesionales para manejar tus finanzas y salud",
    searchPlaceholder: "Buscar plantillas...",
    allCategories: "Todas",
    finance: "Finanzas",
    health: "Salud",
    free: "GRATIS",
    pro: "PRO",
    downloads: "descargas",
    downloadNow: "Descargar",
    getPro: "Desbloquear con PRO",
    upgradeToDownload: "Actualiza a PRO para descargar",
    preview: "Vista Previa",
    relatedCalc: "Ir a Calculadora",
    formatExcel: "XLSX",
    formatPdf: "PDF",
    formatSheets: "Sheets",
    filterAll: "Todas",
    filterFree: "Gratis",
    filterPro: "PRO",
    noResults: "No se encontraron plantillas",
    tryDifferent: "Intenta con un término diferente",
    proFeatures: "Desbloquea Todas las Plantillas",
    proFeature1: "Accede a todas las plantillas premium",
    proFeature2: "Descarga en múltiples formatos",
    proFeature3: "Sin anuncios, descargas ilimitadas",
    proFeature4: "Acceso anticipado a nuevas plantillas",
    upgradeNow: "Actualizar a PRO",
    breadcrumbHome: "Inicio",
    breadcrumbTemplates: "Plantillas",
    templatesCount: "plantillas",
  },
  pt: {
    pageTitle: "Modelos",
    pageSubtitle: "Planilhas e PDFs profissionais para gerenciar suas finanças e saúde",
    searchPlaceholder: "Buscar modelos...",
    allCategories: "Todos",
    finance: "Finanças",
    health: "Saúde",
    free: "GRÁTIS",
    pro: "PRO",
    downloads: "downloads",
    downloadNow: "Baixar",
    getPro: "Desbloquear com PRO",
    upgradeToDownload: "Atualize para PRO para baixar",
    preview: "Visualizar",
    relatedCalc: "Ir para Calculadora",
    formatExcel: "XLSX",
    formatPdf: "PDF",
    formatSheets: "Sheets",
    filterAll: "Todos",
    filterFree: "Grátis",
    filterPro: "PRO",
    noResults: "Nenhum modelo encontrado",
    tryDifferent: "Tente um termo diferente",
    proFeatures: "Desbloqueie Todos os Modelos",
    proFeature1: "Acesse todos os modelos premium",
    proFeature2: "Baixe em múltiplos formatos",
    proFeature3: "Sem anúncios, downloads ilimitados",
    proFeature4: "Acesso antecipado a novos modelos",
    upgradeNow: "Atualizar para PRO",
    breadcrumbHome: "Início",
    breadcrumbTemplates: "Modelos",
    templatesCount: "modelos",
  },
};

// ============================================
// FORMAT NUMBER
// ============================================
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

  // State
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<"all" | "finance" | "health">("all");
  const [proFilter, setProFilter] = useState<"all" | "free" | "pro">("all");
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

  // Check if user is PRO
  const isPro = session?.user && (session.user as any).isPro;

  // Filter templates
  const filteredTemplates = templates.filter((template) => {
    const name = template.name[locale] || template.name.en;
    const desc = template.description[locale] || template.description.en;
    const matchesSearch =
      searchTerm === "" ||
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      desc.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = categoryFilter === "all" || template.category === categoryFilter;

    const matchesPro =
      proFilter === "all" ||
      (proFilter === "free" && !template.isPro) ||
      (proFilter === "pro" && template.isPro);

    return matchesSearch && matchesCategory && matchesPro;
  });

  // Handle download
  const handleDownload = (template: Template) => {
    if (template.isPro && !isPro) {
      setSelectedTemplate(template);
      setShowUpgradeModal(true);
      return;
    }
    // TODO: Implement actual download
    alert(`Downloading ${template.name[locale]}...`);
  };

  // Close modal on ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && showUpgradeModal) {
        setShowUpgradeModal(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [showUpgradeModal]);

  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (showUpgradeModal && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, [showUpgradeModal]);

  return (
    <>
      <Header />

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          onClick={() => setShowUpgradeModal(false)}
        >
          <div
            className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 p-8 text-white">
              <button
                ref={closeButtonRef}
                onClick={() => setShowUpgradeModal(false)}
                className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors"
                aria-label="Close modal"
              >
                <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 backdrop-blur mb-4">
                  <span className="text-3xl">💎</span>
                </div>
                <h2 id="modal-title" className="text-2xl font-bold mb-2">
                  {t.proFeatures}
                </h2>
                <p className="text-blue-100">
                  {t.upgradeToDownload}
                </p>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-8">
              {selectedTemplate && (
                <div className="mb-6 p-4 bg-slate-50 rounded-2xl flex items-center gap-4">
                  <span className="text-4xl">{selectedTemplate.icon}</span>
                  <div>
                    <p className="font-semibold text-slate-900">
                      {selectedTemplate.name[locale] || selectedTemplate.name.en}
                    </p>
                    <p className="text-sm text-slate-600">
                      {selectedTemplate.format.toUpperCase()} • {formatNumber(selectedTemplate.downloads)} {t.downloads}
                    </p>
                  </div>
                </div>
              )}

              <ul className="space-y-4 mb-8" role="list">
                {[t.proFeature1, t.proFeature2, t.proFeature3, t.proFeature4].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-slate-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="text-center mb-6">
                <p className="text-4xl font-bold text-slate-900">
                  $2.99
                  <span className="text-lg font-normal text-slate-600">/mo</span>
                </p>
              </div>

              <Link
                href={`/${locale}/pricing`}
                className="flex items-center justify-center gap-2 w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-2xl hover:shadow-lg hover:shadow-blue-500/25 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {t.upgradeNow}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      )}

      <main className="pt-20 bg-slate-50 min-h-screen" id="main-content">
        {/* Hero Section */}
        <section className="bg-white border-b border-slate-200">
          <div className="container py-12">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="text-sm mb-8">
              <ol className="flex items-center gap-2">
                <li>
                  <Link href={`/${locale}`} className="text-slate-600 hover:text-blue-600 transition-colors">
                    {t.breadcrumbHome}
                  </Link>
                </li>
                <li aria-hidden="true">
                  <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </li>
                <li>
                  <span className="text-slate-900 font-medium" aria-current="page">{t.breadcrumbTemplates}</span>
                </li>
              </ol>
            </nav>

            {/* Header */}
            <div className="max-w-2xl mb-10">
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                {t.pageTitle}
              </h1>
              <p className="text-xl text-slate-600">
                {t.pageSubtitle}
              </p>
            </div>

            {/* Search & Filters */}
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <label htmlFor="template-search" className="sr-only">
                  {t.searchPlaceholder}
                </label>
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  id="template-search"
                  type="search"
                  placeholder={t.searchPlaceholder}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              </div>

              {/* Filters */}
              <div className="flex gap-2">
                {/* Category Pills */}
                <div className="inline-flex p-1 bg-slate-100 rounded-xl" role="group" aria-label="Category filter">
                  {(["all", "finance", "health"] as const).map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setCategoryFilter(cat)}
                      aria-pressed={categoryFilter === cat}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        categoryFilter === cat
                          ? "bg-white text-slate-900 shadow-sm"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      {cat === "all" ? t.allCategories : cat === "finance" ? t.finance : t.health}
                    </button>
                  ))}
                </div>

                {/* Pro Filter Pills */}
                <div className="inline-flex p-1 bg-slate-100 rounded-xl" role="group" aria-label="Type filter">
                  {(["all", "free", "pro"] as const).map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setProFilter(filter)}
                      aria-pressed={proFilter === filter}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        proFilter === filter
                          ? "bg-white text-slate-900 shadow-sm"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      {filter === "all" ? t.filterAll : filter === "free" ? t.filterFree : t.filterPro}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Templates Grid */}
        <section className="py-12" aria-label="Templates list">
          <div className="container">
            {/* Results count */}
            <p className="text-sm text-slate-600 mb-6">
              {filteredTemplates.length} {t.templatesCount}
            </p>

            {filteredTemplates.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-slate-200">
                <div className="text-6xl mb-4">🔍</div>
                <h2 className="text-xl font-semibold text-slate-900 mb-2">{t.noResults}</h2>
                <p className="text-slate-600">{t.tryDifferent}</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTemplates.map((template) => {
                  const name = template.name[locale] || template.name.en;
                  const desc = template.description[locale] || template.description.en;

                  return (
                    <article
                      key={template.id}
                      className="group relative bg-white rounded-2xl border border-slate-200 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 overflow-hidden"
                    >
                      {/* PRO Badge - Corner Ribbon Style */}
                      {template.isPro && (
                        <div className="absolute top-4 right-4 z-10">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-lg shadow-orange-500/25">
                            {t.pro}
                          </span>
                        </div>
                      )}

                      {/* Card Content */}
                      <div className="p-6">
                        {/* Icon & Title */}
                        <div className="flex items-start gap-4 mb-4">
                          <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 flex items-center justify-center text-3xl group-hover:scale-110 group-hover:shadow-lg transition-all duration-300">
                            {template.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-slate-900 text-lg leading-tight mb-1 group-hover:text-blue-600 transition-colors">
                              {name}
                            </h3>
                            <div className="flex items-center gap-2">
                              <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${
                                template.format === "xlsx" 
                                  ? "bg-emerald-100 text-emerald-700" 
                                  : template.format === "pdf"
                                  ? "bg-red-100 text-red-700"
                                  : "bg-blue-100 text-blue-700"
                              }`}>
                                {template.format.toUpperCase()}
                              </span>
                              {!template.isPro && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-green-100 text-green-700">
                                  {t.free}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-slate-600 text-sm leading-relaxed mb-5 line-clamp-3">
                          {desc}
                        </p>

                        {/* Divider */}
                        <div className="border-t border-slate-100 pt-4">
                          {/* Stats & Actions */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5 text-sm text-slate-600">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                              </svg>
                              <span>{formatNumber(template.downloads)}</span>
                            </div>

                            <div className="flex items-center gap-2">
                              {template.relatedCalculator && (
                                <Link
                                  href={`/${locale}/${template.relatedCalculator}`}
                                  className="p-2.5 rounded-xl text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  aria-label={`${t.relatedCalc}: ${name}`}
                                  title={t.relatedCalc}
                                >
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                  </svg>
                                </Link>
                              )}

                              <button
                                onClick={() => handleDownload(template)}
                                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                                  template.isPro && !isPro
                                    ? "bg-gradient-to-r from-amber-400 to-orange-500 text-white hover:shadow-lg hover:shadow-orange-500/25 focus:ring-orange-500"
                                    : "bg-slate-900 text-white hover:bg-slate-800 focus:ring-slate-500"
                                }`}
                                aria-label={
                                  template.isPro && !isPro
                                    ? `${t.getPro}: ${name}`
                                    : `${t.downloadNow}: ${name}`
                                }
                              >
                                {template.isPro && !isPro ? (
                                  <>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                    {t.getPro}
                                  </>
                                ) : (
                                  <>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                    </svg>
                                    {t.downloadNow}
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* PRO CTA Section */}
        {!isPro && (
          <section className="py-16" aria-labelledby="pro-cta-title">
            <div className="container">
              <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-8 md:p-12">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 left-0 w-40 h-40 bg-blue-500 rounded-full blur-3xl" />
                  <div className="absolute bottom-0 right-0 w-60 h-60 bg-cyan-500 rounded-full blur-3xl" />
                </div>

                <div className="relative max-w-3xl mx-auto text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/80 text-sm font-medium mb-6">
                    <span>💎</span>
                    <span>Kalcufy PRO</span>
                  </div>

                  <h2 id="pro-cta-title" className="text-3xl md:text-4xl font-bold text-white mb-4">
                    {t.proFeatures}
                  </h2>
                  
                  <p className="text-slate-400 text-lg mb-8 max-w-xl mx-auto">
                    {t.upgradeToDownload}
                  </p>

                  <div className="flex flex-wrap justify-center gap-3 mb-10">
                    {[t.proFeature1, t.proFeature2, t.proFeature3].map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2">
                        <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-white/90 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Link
                    href={`/${locale}/pricing`}
                    className="inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-900 font-bold rounded-xl hover:shadow-xl hover:shadow-white/20 transition-all focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-900"
                  >
                    {t.upgradeNow}
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>

                  <p className="mt-4 text-slate-600 text-sm">
                    Only $2.99/month • Cancel anytime
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}
