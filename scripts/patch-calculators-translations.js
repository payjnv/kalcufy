const fs = require("fs");
const path = require("path");

const translations = {
  en: {
    sortBy: "Sort by",
    sortPopular: "Popular",
    sortNewest: "Newest",
    sortNameAsc: "Name A-Z",
    sortNameDesc: "Name Z-A",
    showAll: "Show All in",
    viewAll: "View all",
    searchButton: "Search",
    noResults: "No calculators found",
    tryDifferent: "Try a different search or clear filters",
    clearFilters: "Clear all filters",
    allCalculators: "All Calculators",
    categories: "Categories",
  },
  es: {
    sortBy: "Ordenar por",
    sortPopular: "Popular",
    sortNewest: "Más recientes",
    sortNameAsc: "Nombre A-Z",
    sortNameDesc: "Nombre Z-A",
    showAll: "Ver todo en",
    viewAll: "Ver todo",
    searchButton: "Buscar",
    noResults: "No se encontraron calculadoras",
    tryDifferent: "Intenta una búsqueda diferente o limpia los filtros",
    clearFilters: "Limpiar filtros",
    allCalculators: "Todas las Calculadoras",
    categories: "Categorías",
  },
  pt: {
    sortBy: "Ordenar por",
    sortPopular: "Popular",
    sortNewest: "Mais recentes",
    sortNameAsc: "Nome A-Z",
    sortNameDesc: "Nome Z-A",
    showAll: "Ver tudo em",
    viewAll: "Ver tudo",
    searchButton: "Buscar",
    noResults: "Nenhuma calculadora encontrada",
    tryDifferent: "Tente uma busca diferente ou limpe os filtros",
    clearFilters: "Limpar filtros",
    allCalculators: "Todas as Calculadoras",
    categories: "Categorias",
  },
  fr: {
    sortBy: "Trier par",
    sortPopular: "Populaire",
    sortNewest: "Plus récents",
    sortNameAsc: "Nom A-Z",
    sortNameDesc: "Nom Z-A",
    showAll: "Voir tout dans",
    viewAll: "Voir tout",
    searchButton: "Rechercher",
    noResults: "Aucune calculatrice trouvée",
    tryDifferent: "Essayez une recherche différente ou effacez les filtres",
    clearFilters: "Effacer les filtres",
    allCalculators: "Toutes les Calculatrices",
    categories: "Catégories",
  },
  de: {
    sortBy: "Sortieren nach",
    sortPopular: "Beliebt",
    sortNewest: "Neueste",
    sortNameAsc: "Name A-Z",
    sortNameDesc: "Name Z-A",
    showAll: "Alle anzeigen in",
    viewAll: "Alle anzeigen",
    searchButton: "Suchen",
    noResults: "Keine Rechner gefunden",
    tryDifferent: "Versuchen Sie eine andere Suche oder löschen Sie die Filter",
    clearFilters: "Filter löschen",
    allCalculators: "Alle Rechner",
    categories: "Kategorien",
  },
};

const langs = ["en", "es", "pt", "fr", "de"];

for (const lang of langs) {
  const filePath = path.join(process.cwd(), "messages", `${lang}.json`);
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  ${filePath} not found, skipping`);
    continue;
  }

  const content = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  if (!content.calculatorsPage) {
    content.calculatorsPage = {};
  }

  // Merge new translations (don't overwrite existing ones)
  const newKeys = translations[lang];
  for (const [key, value] of Object.entries(newKeys)) {
    if (!content.calculatorsPage[key]) {
      content.calculatorsPage[key] = value;
    }
  }

  fs.writeFileSync(filePath, JSON.stringify(content, null, 2) + "\n", "utf-8");
  console.log(`✅ ${lang}.json updated with calculatorsPage translations`);
}

console.log("\nDone! All 5 languages patched.");
