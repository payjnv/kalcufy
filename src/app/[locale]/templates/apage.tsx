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
      en: "Track income, expenses, and savings goals with this comprehensive budget spreadsheet.",
      es: "Rastrea ingresos, gastos y metas de ahorro con esta hoja de cálculo completa.",
      pt: "Acompanhe receitas, despesas e metas de economia com esta planilha completa.",
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
      es: "Rastreador de Bola de Nieve de Deudas",
      pt: "Rastreador de Bola de Neve de Dívidas",
    },
    description: {
      en: "Pay off debts strategically using the snowball method. Track progress and stay motivated.",
      es: "Paga deudas estratégicamente usando el método bola de nieve. Rastrea tu progreso.",
      pt: "Pague dívidas estrategicamente usando o método bola de neve. Acompanhe o progresso.",
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
      es: "Rastreador de Patrimonio Neto",
      pt: "Rastreador de Patrimônio Líquido",
    },
    description: {
      en: "Monitor your assets and liabilities to track your financial progress over time.",
      es: "Monitorea tus activos y pasivos para rastrear tu progreso financiero.",
      pt: "Monitore seus ativos e passivos para acompanhar seu progresso financeiro.",
    },
    category: "finance",
    format: "xlsx",
    icon: "💰",
    isPro: true,
    downloads: 6521,
  },
  {
    id: "investment-portfolio",
    name: {
      en: "Investment Portfolio Tracker",
      es: "Rastreador de Portafolio de Inversiones",
      pt: "Rastreador de Portfólio de Investimentos",
    },
    description: {
      en: "Track stocks, bonds, ETFs, and crypto. Monitor performance and asset allocation.",
      es: "Rastrea acciones, bonos, ETFs y crypto. Monitorea rendimiento y asignación.",
      pt: "Acompanhe ações, títulos, ETFs e crypto. Monitore desempenho e alocação.",
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
      es: "Hoja Comparativa de Hipotecas",
      pt: "Planilha de Comparação de Hipotecas",
    },
    description: {
      en: "Compare multiple mortgage offers side by side. Calculate total costs and find the best deal.",
      es: "Compara múltiples ofertas de hipoteca lado a lado. Calcula costos totales.",
      pt: "Compare várias ofertas de hipoteca lado a lado. Calcule custos totais.",
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
      es: "Hoja de Planificación de Jubilación",
      pt: "Planilha de Planejamento de Aposentadoria",
    },
    description: {
      en: "Plan your retirement with projections for savings, investments, and income needs.",
      es: "Planifica tu jubilación con proyecciones de ahorros, inversiones e ingresos.",
      pt: "Planeje sua aposentadoria com projeções de poupança, investimentos e renda.",
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
      es: "Rastreador de Fondo de Emergencia",
      pt: "Rastreador de Fundo de Emergência",
    },
    description: {
      en: "Build your emergency fund with clear goals and progress tracking.",
      es: "Construye tu fondo de emergencia con metas claras y seguimiento de progreso.",
      pt: "Construa seu fundo de emergência com metas claras e acompanhamento.",
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
      es: "Nunca pierdas una deducción. Lista completa para impuestos personales y empresariales.",
      pt: "Nunca perca uma dedução. Lista completa para impostos pessoais e empresariais.",
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
      es: "Planificador de Comidas Semanal",
      pt: "Planejador de Refeições Semanal",
    },
    description: {
      en: "Plan your meals, track calories, and create shopping lists automatically.",
      es: "Planifica tus comidas, rastrea calorías y crea listas de compras automáticamente.",
      pt: "Planeje suas refeições, acompanhe calorias e crie listas de compras automaticamente.",
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
      en: "Workout Log & Progress Tracker",
      es: "Registro de Ejercicios y Progreso",
      pt: "Registro de Treino e Progresso",
    },
    description: {
      en: "Track workouts, sets, reps, and weights. Monitor strength gains over time.",
      es: "Rastrea entrenamientos, series, repeticiones y pesos. Monitorea ganancias.",
      pt: "Acompanhe treinos, séries, repetições e pesos. Monitore ganhos de força.",
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
      en: "Weight Loss Progress Tracker",
      es: "Rastreador de Progreso de Pérdida de Peso",
      pt: "Rastreador de Progresso de Perda de Peso",
    },
    description: {
      en: "Track weight, measurements, and photos. Visualize your transformation journey.",
      es: "Rastrea peso, medidas y fotos. Visualiza tu viaje de transformación.",
      pt: "Acompanhe peso, medidas e fotos. Visualize sua jornada de transformação.",
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
      en: "Track chest, waist, hips, arms, and more. See your body composition changes.",
      es: "Rastrea pecho, cintura, caderas, brazos y más. Ve cambios en tu composición.",
      pt: "Acompanhe peito, cintura, quadris, braços e mais. Veja mudanças na composição.",
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
      en: "Pregnancy Week-by-Week Tracker",
      es: "Rastreador Semana a Semana del Embarazo",
      pt: "Rastreador Semana a Semana da Gravidez",
    },
    description: {
      en: "Track appointments, symptoms, baby development, and prepare for birth.",
      es: "Rastrea citas, síntomas, desarrollo del bebé y prepárate para el parto.",
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
      en: "Daily Water Intake Log",
      es: "Registro Diario de Consumo de Agua",
      pt: "Registro Diário de Consumo de Água",
    },
    description: {
      en: "Stay hydrated! Track daily water consumption and build healthy habits.",
      es: "¡Mantente hidratado! Rastrea el consumo diario de agua y crea hábitos saludables.",
      pt: "Mantenha-se hidratado! Acompanhe o consumo diário de água e crie hábitos saudáveis.",
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
      es: "Rastreador de Macronutrientes",
      pt: "Rastreador de Macronutrientes",
    },
    description: {
      en: "Track protein, carbs, and fats daily. Perfect for fitness and diet goals.",
      es: "Rastrea proteínas, carbohidratos y grasas diariamente. Perfecto para fitness.",
      pt: "Acompanhe proteínas, carboidratos e gorduras diariamente. Perfeito para fitness.",
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
      en: "Monitor sleep patterns, quality, and identify factors affecting your rest.",
      es: "Monitorea patrones de sueño, calidad e identifica factores que afectan tu descanso.",
      pt: "Monitore padrões de sono, qualidade e identifique fatores que afetam seu descanso.",
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
    pageTitle: "Free Templates",
    pageSubtitle: "Download professional spreadsheets and PDFs to manage your finances and health",
    searchPlaceholder: "Search templates...",
    allCategories: "All",
    finance: "Finance",
    health: "Health",
    free: "Free",
    pro: "PRO",
    downloads: "downloads",
    downloadNow: "Download Free",
    getPro: "Get PRO",
    upgradeToDownload: "Upgrade to PRO to download",
    preview: "Preview",
    relatedCalc: "Related Calculator",
    formatExcel: "Excel",
    formatPdf: "PDF",
    formatSheets: "Google Sheets",
    filterAll: "All Templates",
    filterFree: "Free Only",
    filterPro: "PRO Only",
    noResults: "No templates found",
    tryDifferent: "Try a different search term or category",
    proFeatures: "PRO Features",
    proFeature1: "Access all premium templates",
    proFeature2: "Download in multiple formats",
    proFeature3: "No ads, unlimited downloads",
    proFeature4: "Early access to new templates",
    upgradeNow: "Upgrade to PRO",
    breadcrumbHome: "Home",
    breadcrumbTemplates: "Templates",
  },
  es: {
    pageTitle: "Plantillas Gratis",
    pageSubtitle: "Descarga hojas de cálculo y PDFs profesionales para manejar tus finanzas y salud",
    searchPlaceholder: "Buscar plantillas...",
    allCategories: "Todas",
    finance: "Finanzas",
    health: "Salud",
    free: "Gratis",
    pro: "PRO",
    downloads: "descargas",
    downloadNow: "Descargar Gratis",
    getPro: "Obtener PRO",
    upgradeToDownload: "Actualiza a PRO para descargar",
    preview: "Vista Previa",
    relatedCalc: "Calculadora Relacionada",
    formatExcel: "Excel",
    formatPdf: "PDF",
    formatSheets: "Google Sheets",
    filterAll: "Todas las Plantillas",
    filterFree: "Solo Gratis",
    filterPro: "Solo PRO",
    noResults: "No se encontraron plantillas",
    tryDifferent: "Intenta con un término de búsqueda o categoría diferente",
    proFeatures: "Funciones PRO",
    proFeature1: "Accede a todas las plantillas premium",
    proFeature2: "Descarga en múltiples formatos",
    proFeature3: "Sin anuncios, descargas ilimitadas",
    proFeature4: "Acceso anticipado a nuevas plantillas",
    upgradeNow: "Actualizar a PRO",
    breadcrumbHome: "Inicio",
    breadcrumbTemplates: "Plantillas",
  },
  pt: {
    pageTitle: "Modelos Grátis",
    pageSubtitle: "Baixe planilhas e PDFs profissionais para gerenciar suas finanças e saúde",
    searchPlaceholder: "Buscar modelos...",
    allCategories: "Todos",
    finance: "Finanças",
    health: "Saúde",
    free: "Grátis",
    pro: "PRO",
    downloads: "downloads",
    downloadNow: "Baixar Grátis",
    getPro: "Obter PRO",
    upgradeToDownload: "Atualize para PRO para baixar",
    preview: "Visualizar",
    relatedCalc: "Calculadora Relacionada",
    formatExcel: "Excel",
    formatPdf: "PDF",
    formatSheets: "Google Sheets",
    filterAll: "Todos os Modelos",
    filterFree: "Apenas Grátis",
    filterPro: "Apenas PRO",
    noResults: "Nenhum modelo encontrado",
    tryDifferent: "Tente um termo de busca ou categoria diferente",
    proFeatures: "Recursos PRO",
    proFeature1: "Acesse todos os modelos premium",
    proFeature2: "Baixe em múltiplos formatos",
    proFeature3: "Sem anúncios, downloads ilimitados",
    proFeature4: "Acesso antecipado a novos modelos",
    upgradeNow: "Atualizar para PRO",
    breadcrumbHome: "Início",
    breadcrumbTemplates: "Modelos",
  },
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

  // Check if user is PRO (adjust based on your user model)
  const isPro = session?.user && (session.user as any).isPro;

  // Filter templates
  const filteredTemplates = templates.filter((template) => {
    // Search filter
    const name = template.name[locale] || template.name.en;
    const desc = template.description[locale] || template.description.en;
    const matchesSearch =
      searchTerm === "" ||
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      desc.toLowerCase().includes(searchTerm.toLowerCase());

    // Category filter
    const matchesCategory = categoryFilter === "all" || template.category === categoryFilter;

    // Pro filter
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
    // TODO: Implement actual download logic
    // window.location.href = `/api/templates/download/${template.id}`;
    alert(`Downloading ${template.name[locale]}...`);
  };

  // Format badge color
  const getFormatColor = (format: string) => {
    switch (format) {
      case "xlsx":
        return "bg-green-100 text-green-700";
      case "pdf":
        return "bg-red-100 text-red-700";
      case "sheets":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  // Format label
  const getFormatLabel = (format: string) => {
    switch (format) {
      case "xlsx":
        return t.formatExcel;
      case "pdf":
        return t.formatPdf;
      case "sheets":
        return t.formatSheets;
      default:
        return format.toUpperCase();
    }
  };

  // Ref for modal focus trap
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Focus trap for modal (accessibility)
  useEffect(() => {
    if (showUpgradeModal && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, [showUpgradeModal]);

  // Close modal on ESC (accessibility)
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && showUpgradeModal) {
        setShowUpgradeModal(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [showUpgradeModal]);

  return (
    <>
      <Header />

      {/* Upgrade Modal - Accessible */}
      {showUpgradeModal && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          onClick={() => setShowUpgradeModal(false)}
        >
          <div
            ref={modalRef}
            className="bg-white rounded-2xl w-full max-w-md overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-200">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-2xl">
                    💎
                  </div>
                  <div>
                    <h2 id="modal-title" className="text-xl font-bold text-slate-900">
                      {t.proFeatures}
                    </h2>
                    <p className="text-slate-600 text-sm">{t.upgradeToDownload}</p>
                  </div>
                </div>
                <button
                  ref={closeButtonRef}
                  onClick={() => setShowUpgradeModal(false)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                  aria-label="Close modal"
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {selectedTemplate && (
                <div className="mb-6 p-4 bg-slate-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl" aria-hidden="true">{selectedTemplate.icon}</span>
                    <div>
                      <p className="font-semibold text-slate-900">
                        {selectedTemplate.name[locale] || selectedTemplate.name.en}
                      </p>
                      <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded ${getFormatColor(selectedTemplate.format)}`}>
                        {getFormatLabel(selectedTemplate.format)}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <ul className="space-y-3 mb-6" role="list" aria-label={t.proFeatures}>
                {[t.proFeature1, t.proFeature2, t.proFeature3, t.proFeature4].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center" aria-hidden="true">
                      <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-slate-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="text-center mb-4">
                <p className="text-3xl font-bold text-slate-900">
                  $2.99<span className="text-lg font-normal text-slate-600">/month</span>
                </p>
              </div>

              <Link
                href={`/${locale}/pricing`}
                className="block w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-center font-semibold rounded-xl hover:from-blue-700 hover:to-cyan-600 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {t.upgradeNow}
              </Link>
            </div>
          </div>
        </div>
      )}

      <main className="pt-20" id="main-content">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-blue-50 to-white py-8">
          <div className="container">
            {/* Breadcrumb - Accessible */}
            <nav aria-label="Breadcrumb" className="text-sm mb-6">
              <ol className="flex items-center gap-2">
                <li>
                  <Link href={`/${locale}`} className="text-slate-600 hover:text-blue-600 transition-colors">
                    {t.breadcrumbHome}
                  </Link>
                </li>
                <li aria-hidden="true">
                  <span className="text-slate-400">/</span>
                </li>
                <li>
                  <span className="text-slate-700" aria-current="page">{t.breadcrumbTemplates}</span>
                </li>
              </ol>
            </nav>

            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
              <div 
                className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-2xl"
                aria-hidden="true"
              >
                📄
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900">{t.pageTitle}</h1>
                <p className="text-slate-600">{t.pageSubtitle}</p>
              </div>
            </div>

            {/* Search & Filters */}
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search Input - Accessible */}
              <div className="flex-1 relative">
                <label htmlFor="template-search" className="sr-only">
                  {t.searchPlaceholder}
                </label>
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none" aria-hidden="true">
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
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>

              {/* Category Filter - Accessible */}
              <div className="flex gap-2" role="group" aria-label="Category filter">
                {(["all", "finance", "health"] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategoryFilter(cat)}
                    aria-pressed={categoryFilter === cat}
                    className={`px-4 py-3 rounded-xl font-medium transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      categoryFilter === cat
                        ? "bg-blue-600 text-white"
                        : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {cat === "all" ? t.allCategories : cat === "finance" ? t.finance : t.health}
                  </button>
                ))}
              </div>

              {/* Pro Filter - Accessible */}
              <fieldset className="flex gap-2" aria-label="Template type filter">
                <legend className="sr-only">Filter by template type</legend>
                {(["all", "free", "pro"] as const).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setProFilter(filter)}
                    aria-pressed={proFilter === filter}
                    className={`px-4 py-3 rounded-xl font-medium transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      proFilter === filter
                        ? filter === "pro"
                          ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white"
                          : "bg-blue-600 text-white"
                        : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {filter === "all" ? t.filterAll : filter === "free" ? t.filterFree : t.filterPro}
                  </button>
                ))}
              </fieldset>
            </div>
          </div>
        </section>

        {/* Templates Grid */}
        <section className="py-12 bg-white" aria-label="Templates list">
          <div className="container">
            {filteredTemplates.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4" aria-hidden="true">🔍</div>
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
                      className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg hover:border-blue-200 transition-all group"
                    >
                      {/* Card Header */}
                      <div className="p-6 pb-4">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div 
                              className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform"
                              aria-hidden="true"
                            >
                              {template.icon}
                            </div>
                            <div>
                              <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                                {name}
                              </h3>
                              <div className="flex items-center gap-2 mt-1">
                                <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded ${getFormatColor(template.format)}`}>
                                  {getFormatLabel(template.format)}
                                </span>
                                {template.isPro ? (
                                  <span className="inline-flex px-2 py-0.5 text-xs font-bold rounded bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                                    {t.pro}
                                  </span>
                                ) : (
                                  <span className="inline-flex px-2 py-0.5 text-xs font-medium rounded bg-green-100 text-green-700">
                                    {t.free}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        <p className="text-slate-600 text-sm mb-4">{desc}</p>

                        {/* Downloads count */}
                        <div className="flex items-center gap-1 text-sm text-slate-600">
                          <svg aria-hidden="true" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                          <span>{template.downloads.toLocaleString()} {t.downloads}</span>
                        </div>
                      </div>

                      {/* Card Footer */}
                      <div className="px-6 py-4 bg-slate-50 border-t border-slate-100">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleDownload(template)}
                            className={`flex-1 py-2.5 px-4 rounded-xl font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                              template.isPro && !isPro
                                ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 focus:ring-amber-500"
                                : "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500"
                            }`}
                            aria-label={
                              template.isPro && !isPro
                                ? `${t.getPro} - ${name}`
                                : `${t.downloadNow} - ${name}`
                            }
                          >
                            {template.isPro && !isPro ? t.getPro : t.downloadNow}
                          </button>

                          {template.relatedCalculator && (
                            <Link
                              href={`/${locale}/${template.relatedCalculator}`}
                              className="py-2.5 px-4 rounded-xl border border-slate-200 text-slate-700 hover:bg-white hover:border-blue-300 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                              aria-label={`${t.relatedCalc}: ${name}`}
                            >
                              <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                              </svg>
                            </Link>
                          )}
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
          <section className="py-12 bg-gradient-to-br from-blue-600 to-cyan-500" aria-labelledby="pro-cta-title">
            <div className="container">
              <div className="max-w-3xl mx-auto text-center text-white">
                <h2 id="pro-cta-title" className="text-3xl font-bold mb-4">
                  {t.proFeatures}
                </h2>
                <p className="text-blue-100 mb-8 text-lg">
                  {t.upgradeToDownload}
                </p>
                <div className="flex flex-wrap justify-center gap-4 mb-8">
                  {[t.proFeature1, t.proFeature2, t.proFeature3, t.proFeature4].map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
                      <svg aria-hidden="true" className="w-5 h-5 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <Link
                  href={`/${locale}/pricing`}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-all focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
                >
                  {t.upgradeNow}
                  <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
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
