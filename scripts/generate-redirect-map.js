#!/usr/bin/env node
/**
 * Regenerates src/middleware.ts with updated slug redirect maps.
 * Run after adding/removing calculators:
 *   node scripts/generate-redirect-map.js
 */

const https = require("https");
const fs = require("fs");
const path = require("path");

const SITE_URL = "https://www.kalcufy.com/sitemap.xml";
const LOCALES = ["en", "es", "pt", "fr", "de"];
const SKIP = ["blog", "pricing", "about", "privacy", "terms", "cookies", "accessibility", "login", "register", "calculators"];

// ── Old/renamed slugs → correct slug that EXISTS in current sitemap ──
// Add here when you rename or delete a calculator
const MANUAL = {
  "calculadora-tdee": "calculadora-gasto-energetico-diario-total",
  "calculateur-calories-maintenance": "calculateur-calories-maintien",
  "quadratic-calculator": "quadratic-formula-calculator",
  "hcg-calculator-calculator": "hcg-calculator",
  "emergency-fund-calculator": "savings-goal-calculator",
  "calculadora-test-auto": "calculadora-prestamo-automotriz",
  "calculadora-cetogenica": "calculadora-keto",
  "pregnancy-due-date-rechner": "schwangerschafts-geburtstermin-rechner",
  "bandbreite-rechner": "bandbreiten-rechner",
  "ein-wiederholungsmaximum-rechner": "ein-wiederholungs-maximum-rechner",
  "running-pace-rechner": "lauftempo-rechner",
  "lean-body-mass-rechner": "magere-koerpermasse-rechner",
  "calculadora-raiz-cuadrada": "calculadora-raiz-quadrada",
  "calculadora-prestamo": "calculadora-prestamos",
  "calculadora-emprestimo-estudantil": "calculadora-student-loan",
  "calculadora-una-repeticion-maxima": "calculadora-repeticion-maxima",
  "calculateur-waist-to-height-ratio": "calculateur-ratio-taille-taille",
  "cd-calculator": "savings-goal-calculator",
  "calorie-surplus-calculator": "weight-gain-calculator",
  "calorie-deficit-calculator": "caloric-deficit-calculator",
  "unit-converter-calculator": "unit-converter",
};

function fetch(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = "";
      res.on("data", (c) => (data += c));
      res.on("end", () => resolve(data));
      res.on("error", reject);
    }).on("error", reject);
  });
}

async function main() {
  console.log("🔍 Fetching sitemap...");
  const xml = await fetch(SITE_URL);

  const urls = [];
  const re = /<loc>([^<]+)<\/loc>/g;
  let m;
  while ((m = re.exec(xml))) urls.push(m[1]);

  const calcUrls = urls
    .map((u) => u.replace(/https?:\/\/www\.kalcufy\.com\//, ""))
    .filter((u) => {
      const p = u.split("/");
      if (p.length < 2 || !LOCALES.includes(p[0])) return false;
      const rest = p.slice(1).join("/");
      return !SKIP.some((s) => rest === s || rest.startsWith(s + "/"));
    });

  console.log(`📄 ${calcUrls.length} calculator URLs found`);

  const groups = [];
  for (let i = 0; i < calcUrls.length; i += 5) {
    const g = {};
    for (let j = 0; j < 5 && i + j < calcUrls.length; j++) {
      const line = calcUrls[i + j];
      const idx = line.indexOf("/");
      g[line.substring(0, idx)] = line.substring(idx + 1);
    }
    if (Object.keys(g).length === 5) groups.push(g);
  }

  const slugMap = {};
  groups.forEach((g, i) => {
    Object.entries(g).forEach(([l, s]) => { slugMap[s] = { i, l }; });
  });

  const manualMap = {};
  for (const [old, target] of Object.entries(MANUAL)) {
    const info = slugMap[target];
    if (info) {
      manualMap[old] = info.i;
    } else {
      console.warn(`  ⚠️  Manual redirect "${old}" → "${target}" not found in sitemap`);
    }
  }

  // Also add EN slugs that appear in non-EN locales as manual redirects
  // (common pattern: Google finds /de/loan-calculator)
  groups.forEach((g, i) => {
    const enSlug = g.en;
    if (enSlug && !manualMap[enSlug]) {
      manualMap[enSlug] = i;
    }
  });

  const sE = Object.entries(slugMap).map(([s, v]) => `  "${s}":{i:${v.i},l:"${v.l}"}`).join(",\n");
  const gE = groups.map((g) => `  {${Object.entries(g).map(([l, s]) => `${l}:"${s}"`).join(",")}}`).join(",\n");
  const mE = Object.entries(manualMap).map(([s, i]) => `  "${s}":${i}`).join(",\n");

  const code = `import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// ═══════════════════════════════════════════════════════════════════════════════
// AUTO-GENERATED REDIRECT MAP — fixes wrong-locale slugs & old URLs
// Regenerate: node scripts/generate-redirect-map.js
// Generated: ${new Date().toISOString().split("T")[0]}
// Calculators: ${groups.length} | Slugs: ${Object.keys(slugMap).length} | Manual: ${Object.keys(manualMap).length}
// ═══════════════════════════════════════════════════════════════════════════════

const LOCALES = ["en","es","pt","fr","de"] as const;
type Locale = (typeof LOCALES)[number];

const S:Record<string,{i:number;l:string}> = {
${sE}
};

const G:Record<string,string>[] = [
${gE}
];

const M:Record<string,number> = {
${mE}
};

const SKIP = new Set(["calculators","pricing","about","blog","privacy","terms","cookies","accessibility","login","register","forgot-password","profile","admin"]);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/admin") ||
    pathname.includes(".") ||
    pathname === "/"
  ) return NextResponse.next();

  const parts = pathname.split("/").filter(Boolean);
  if (parts.length === 0) return NextResponse.next();

  const first = parts[0];
  const isLocale = (LOCALES as readonly string[]).includes(first);

  // ── No locale prefix: /slug → /en/correct-slug ──
  if (!isLocale) {
    const slug = parts.join("/");
    if (SKIP.has(slug) || slug.startsWith("blog")) return NextResponse.next();

    const match = S[slug];
    if (match) {
      const url = request.nextUrl.clone();
      url.pathname = \\\`/en/\\\${G[match.i]?.en || slug}\\\`;
      return NextResponse.redirect(url, 301);
    }
    const mi = M[slug];
    if (mi !== undefined) {
      const url = request.nextUrl.clone();
      url.pathname = \\\`/en/\\\${G[mi]?.en || slug}\\\`;
      return NextResponse.redirect(url, 301);
    }
    return NextResponse.next();
  }

  // ── Has locale: /{locale}/{slug} ──
  const locale = first as Locale;
  const slug = parts.slice(1).join("/");
  if (!slug || SKIP.has(slug) || slug.startsWith("blog")) return NextResponse.next();

  const match = S[slug];
  if (match && match.l === locale) return NextResponse.next();

  if (match) {
    const correct = G[match.i]?.[locale];
    if (correct && correct !== slug) {
      const url = request.nextUrl.clone();
      url.pathname = \\\`/\\\${locale}/\\\${correct}\\\`;
      return NextResponse.redirect(url, 301);
    }
  }

  const mi = M[slug];
  if (mi !== undefined) {
    const correct = G[mi]?.[locale];
    if (correct) {
      const url = request.nextUrl.clone();
      url.pathname = \\\`/\\\${locale}/\\\${correct}\\\`;
      return NextResponse.redirect(url, 301);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon|api|.*\\\\\\\\..*).*)"],
};
`;

  const outputPath = path.join(process.cwd(), "src", "middleware.ts");
  fs.writeFileSync(outputPath, code);
  console.log(`\n✅ Middleware written to ${outputPath}`);
  console.log(`   Calculators: ${groups.length}`);
  console.log(`   Slug entries: ${Object.keys(slugMap).length}`);
  console.log(`   Manual redirects: ${Object.keys(manualMap).length}`);
}

main().catch(console.error);
