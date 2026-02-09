#!/usr/bin/env node
/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  INSTALL V4 CALCULATOR - v3.0 (CATCH-ALL ARCHITECTURE)           ║
 * ╠══════════════════════════════════════════════════════════════════╣
 * ║  Usage:                                                          ║
 * ║    node --env-file=.env.local scripts/install-calc-v4.js <id>    ║
 * ║    node --env-file=.env.local scripts/install-calc-v4.js <id> --no-translate
 * ║                                                                  ║
 * ║  v3 Changes:                                                     ║
 * ║    - NO longer creates individual page.tsx (catch-all handles)   ║
 * ║    - NO longer updates client.tsx V4_CALCULATORS set             ║
 * ║    - Routing is automatic via [...slug] + registry.ts            ║
 * ╚══════════════════════════════════════════════════════════════════╝
 * 
 * DOES:
 *   1. ✓ Verifies src/calculators/{id}/index.ts exists
 *   2. ✓ Translates to ES, PT, FR, DE (unless --no-translate)
 *   3. ✓ Adds to registry.ts with translated slugs
 *   4. ✓ Adds to calculators-config.ts
 *   5. ✓ Adds to messages/*.json
 *   6. ✓ Adds to database
 */

const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const API_KEY = process.env.ANTHROPIC_API_KEY;

// Parse args
const args = process.argv.slice(2);
const noTranslate = args.includes('--no-translate');
const calcName = args.find(a => !a.startsWith('--'));

if (!calcName) {
  console.log(`
╔══════════════════════════════════════════════════════════════════╗
║  INSTALL V4 CALCULATOR - v3.0 (CATCH-ALL)                        ║
╠══════════════════════════════════════════════════════════════════╣
║  Usage:                                                          ║
║    node --env-file=.env.local scripts/install-calc-v4.js <id>    ║
║    node --env-file=.env.local scripts/install-calc-v4.js <id> --no-translate
║                                                                  ║
║  The catch-all route handles routing automatically.              ║
║  This script only registers the calculator in the system.        ║
╚══════════════════════════════════════════════════════════════════╝
`);
  process.exit(1);
}

const BASE = process.cwd();
const CALC_DIR = path.join(BASE, 'src/calculators', calcName);
const CONFIG_FILE = path.join(CALC_DIR, 'index.ts');
const REGISTRY = path.join(BASE, 'src/engine/v4/slugs/registry.ts');
const CALC_CONFIG = path.join(BASE, 'src/config/calculators-config.ts');

const LANGS = ['es', 'pt', 'fr', 'de'];
const LANG_NAMES = { es: 'Spanish', pt: 'Portuguese', fr: 'French', de: 'German' };

const UI = {
  es: {
    buttons: { calculate: "Calcular", reset: "Reiniciar", pdf: "PDF", csv: "CSV", excel: "Excel", save: "Guardar", saved: "Guardado", saving: "Guardando..." },
    share: { calculatedWith: "Calculado con Kalcufy.com" },
    ui: { results: "Resultados", yourInformation: "Tu Información" },
    accessibility: { mobileResults: "Resumen de resultados", closeModal: "Cerrar", openMenu: "Abrir menú" },
    rating: { title: "Califica esta Calculadora", share: "Compartir", copied: "¡Copiado!", copyLink: "Copiar Enlace", clickToRate: "Clic para calificar", youRated: "Calificaste", stars: "estrellas", averageFrom: "promedio de", ratings: "calificaciones" },
    common: { home: "Inicio", calculators: "Calculadoras" },
    sources: { title: "Fuentes y Referencias" },
    calculator: { yourInformation: "Tu Información" }
  },
  pt: {
    buttons: { calculate: "Calcular", reset: "Reiniciar", pdf: "PDF", csv: "CSV", excel: "Excel", save: "Salvar", saved: "Salvo", saving: "Salvando..." },
    share: { calculatedWith: "Calculado com Kalcufy.com" },
    ui: { results: "Resultados", yourInformation: "Suas Informações" },
    accessibility: { mobileResults: "Resumo dos resultados", closeModal: "Fechar", openMenu: "Abrir menu" },
    rating: { title: "Avalie esta Calculadora", share: "Compartilhar", copied: "Copiado!", copyLink: "Copiar Link", clickToRate: "Clique para avaliar", youRated: "Você avaliou", stars: "estrelas", averageFrom: "média de", ratings: "avaliações" },
    common: { home: "Início", calculators: "Calculadoras" },
    sources: { title: "Fontes e Referências" },
    calculator: { yourInformation: "Suas Informações" }
  },
  fr: {
    buttons: { calculate: "Calculer", reset: "Réinitialiser", pdf: "PDF", csv: "CSV", excel: "Excel", save: "Sauvegarder", saved: "Sauvegardé", saving: "Sauvegarde..." },
    share: { calculatedWith: "Calculé avec Kalcufy.com" },
    ui: { results: "Résultats", yourInformation: "Vos Informations" },
    accessibility: { mobileResults: "Résumé des résultats", closeModal: "Fermer", openMenu: "Ouvrir le menu" },
    rating: { title: "Notez cette Calculatrice", share: "Partager", copied: "Copié!", copyLink: "Copier le Lien", clickToRate: "Cliquez pour noter", youRated: "Vous avez noté", stars: "étoiles", averageFrom: "moyenne de", ratings: "évaluations" },
    common: { home: "Accueil", calculators: "Calculatrices" },
    sources: { title: "Sources et Références" },
    calculator: { yourInformation: "Vos Informations" }
  },
  de: {
    buttons: { calculate: "Berechnen", reset: "Zurücksetzen", pdf: "PDF", csv: "CSV", excel: "Excel", save: "Speichern", saved: "Gespeichert", saving: "Speichern..." },
    share: { calculatedWith: "Berechnet mit Kalcufy.com" },
    ui: { results: "Ergebnisse", yourInformation: "Ihre Informationen" },
    accessibility: { mobileResults: "Ergebniszusammenfassung", closeModal: "Schließen", openMenu: "Menü öffnen" },
    rating: { title: "Bewerten Sie diesen Rechner", share: "Teilen", copied: "Kopiert!", copyLink: "Link kopieren", clickToRate: "Klicken zum Bewerten", youRated: "Sie haben bewertet", stars: "Sterne", averageFrom: "Durchschnitt von", ratings: "Bewertungen" },
    common: { home: "Startseite", calculators: "Rechner" },
    sources: { title: "Quellen und Referenzen" },
    calculator: { yourInformation: "Ihre Informationen" }
  }
};

// Helpers
function toCamel(s) { return s.replace(/-([a-z])/g, (_, c) => c.toUpperCase()); }
function toPascal(s) { const c = toCamel(s); return c[0].toUpperCase() + c.slice(1); }

async function callAPI(prompt) {
  if (!API_KEY) throw new Error('No ANTHROPIC_API_KEY');
  const r = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-api-key': API_KEY, 'anthropic-version': '2023-06-01' },
    body: JSON.stringify({ model: 'claude-sonnet-4-20250514', max_tokens: 16000, messages: [{ role: 'user', content: prompt }] })
  });
  if (!r.ok) throw new Error(`API ${r.status}`);
  const d = await r.json();
  return d.content[0].text;
}

function extractEnBlock(content) {
  const tIdx = content.indexOf('t:');
  if (tIdx === -1) return null;
  const enIdx = content.indexOf('en:', tIdx);
  if (enIdx === -1) return null;
  const start = content.indexOf('{', enIdx);
  if (start === -1) return null;
  
  let depth = 0, inStr = false, strCh = '', esc = false;
  for (let i = start; i < content.length; i++) {
    const c = content[i];
    if (esc) { esc = false; continue; }
    if (c === '\\') { esc = true; continue; }
    if (!inStr && (c === '"' || c === "'" || c === '`')) { inStr = true; strCh = c; continue; }
    if (inStr && c === strCh) { inStr = false; continue; }
    if (!inStr) {
      if (c === '{') depth++;
      if (c === '}') { depth--; if (depth === 0) return content.substring(start + 1, i); }
    }
  }
  return null;
}

function getInfo(content) {
  const n = content.match(/name:\s*["'`]([^"'`]+)["'`]/);
  const i = content.match(/icon:\s*["'`]([^"'`]+)["'`]/);
  const c = content.match(/category:\s*["'`]([^"'`]+)["'`]/);
  return {
    name: n ? n[1] : toPascal(calcName) + ' Calculator',
    icon: i ? i[1] : '📊',
    category: c ? c[1] : 'health'
  };
}

function getSlugFromLang(content, lang) {
  const langBlockRegex = new RegExp(`${lang}:\\s*\\{[\\s\\S]*?slug:\\s*["'\`]([^"'\`]+)["'\`]`, 'm');
  const m = content.match(langBlockRegex);
  return m ? m[1] : null;
}

async function getTranslatedSlugs(calculatorName) {
  if (!API_KEY) return null;
  const readableName = calculatorName.replace(/-/g, ' ');
  const prompt = `Translate this calculator name to create URL slugs for each language.

Calculator name (English): "${readableName} calculator"
English slug: "${calculatorName}-calculator"

Create FULLY TRANSLATED slugs (not just prefixes) for each language:

Rules:
- Spanish: "calculadora-[fully-translated-name]" (all words in Spanish)
- Portuguese: "calculadora-[fully-translated-name]" (all words in Portuguese)  
- French: "calculateur-[fully-translated-name]" (all words in French)
- German: "[fully-translated-name]-rechner" (all words in German)
- Use lowercase and hyphens only
- NO English words in the translated slugs

Return ONLY a JSON object with this exact format (no markdown, no explanation):
{"es":"calculadora-xxx","pt":"calculadora-xxx","fr":"calculateur-xxx","de":"xxx-rechner"}`;

  try {
    const response = await callAPI(prompt);
    const cleaned = response.replace(/```json\s*/gi, '').replace(/```\s*/gi, '').trim();
    return JSON.parse(cleaned);
  } catch (e) {
    console.log(`   ⚠ Could not get translated slugs: ${e.message}`);
    return null;
  }
}

// ══════════════════════════════════════════════════════════════
// Step 1: Translate (if needed)
// ══════════════════════════════════════════════════════════════
async function step1_translate() {
  console.log('\n🌐 Step 1: Translating...');
  
  if (noTranslate) {
    console.log('   ⏭ Skipped (--no-translate flag)');
    return;
  }
  
  let content = fs.readFileSync(CONFIG_FILE, 'utf-8');
  
  const existing = LANGS.filter(l => new RegExp(`\\b${l}:\\s*\\{`).test(content));
  const missing = LANGS.filter(l => !existing.includes(l));
  
  console.log('   Existing: ' + (existing.length ? existing.join(', ') : 'en only'));
  console.log('   Missing: ' + (missing.length ? missing.join(', ') : 'none'));
  
  if (!missing.length) { console.log('   ✓ All present'); return; }
  if (!API_KEY) { console.log('   ⚠ No API key - run with API key later'); return; }
  
  const en = extractEnBlock(content);
  if (!en) { console.log('   ⚠ Cannot extract EN block'); return; }
  
  const SLUG_EN = calcName + '-calculator';
  const translations = {};
  for (const lang of missing) {
    try {
      console.log(`   → ${LANG_NAMES[lang]}...`);
      const prompt = `Translate this calculator config to ${LANG_NAMES[lang]}. Return ONLY valid JSON.

CRITICAL - SLUG TRANSLATION:
The English slug is: "${SLUG_EN}"
You MUST create a FULLY TRANSLATED slug in ${LANG_NAMES[lang]}:
${lang === 'es' ? '- Format: "calculadora-[nombre-completamente-traducido]"\n- Example: "caloric-deficit-calculator" → "calculadora-deficit-calorico"' : ''}
${lang === 'pt' ? '- Format: "calculadora-[nome-completamente-traduzido]"\n- Example: "caloric-deficit-calculator" → "calculadora-deficit-calorico"' : ''}
${lang === 'fr' ? '- Format: "calculateur-[nom-completement-traduit]"\n- Example: "caloric-deficit-calculator" → "calculateur-deficit-calorique"' : ''}
${lang === 'de' ? '- Format: "[vollstaendig-uebersetzter-name]-rechner"\n- Example: "caloric-deficit-calculator" → "kaloriendefizit-rechner"' : ''}

DO NOT keep English words in the slug. Translate EVERYTHING.
DO NOT include these keys (added automatically): buttons, share, ui, accessibility, rating, common, sources, calculator

ENGLISH SOURCE:
{${en}}

Return ${LANG_NAMES[lang]} JSON:`;

      const r = await callAPI(prompt);
      let json = r.replace(/```json\s*/gi, '').replace(/```\s*/gi, '').trim();
      const parsed = JSON.parse(json);
      Object.assign(parsed, UI[lang]);
      translations[lang] = JSON.stringify(parsed, null, 2);
      console.log(`   ✓ ${LANG_NAMES[lang]}`);
      await new Promise(r => setTimeout(r, 500));
    } catch (e) { console.log(`   ✗ ${LANG_NAMES[lang]}: ${e.message}`); }
  }
  
  if (Object.keys(translations).length) {
    console.log('   Inserting...');
    const tIdx = content.indexOf('t:');
    const enIdx = content.indexOf('en:', tIdx);
    const enStart = content.indexOf('{', enIdx);
    let depth = 0, enEnd = enStart, inStr = false, strCh = '', esc = false;
    for (let i = enStart; i < content.length; i++) {
      const c = content[i];
      if (esc) { esc = false; continue; }
      if (c === '\\') { esc = true; continue; }
      if (!inStr && (c === '"' || c === "'" || c === '`')) { inStr = true; strCh = c; continue; }
      if (inStr && c === strCh) { inStr = false; continue; }
      if (!inStr) {
        if (c === '{') depth++;
        if (c === '}') { depth--; if (depth === 0) { enEnd = i + 1; break; } }
      }
    }
    
    let ins = '';
    for (const [l, j] of Object.entries(translations)) {
      const ind = j.split('\n').map((x, i) => i ? '    ' + x : x).join('\n');
      ins += `,\n    ${l}: ${ind}`;
    }
    content = content.slice(0, enEnd) + ins + content.slice(enEnd);
    fs.writeFileSync(CONFIG_FILE, content);
    console.log('   ✓ Inserted');
  }
}

// ══════════════════════════════════════════════════════════════
// Step 2: Update registry.ts
// ══════════════════════════════════════════════════════════════
async function step2_registry() {
  console.log('\n📝 Step 2: Updating registry.ts...');
  if (!fs.existsSync(REGISTRY)) { console.log('   ⚠ Not found'); return; }
  
  let r = fs.readFileSync(REGISTRY, 'utf-8');
  const SLUG_EN = calcName + '-calculator';
  
  if (r.includes(`id: "${calcName}"`)) { 
    console.log('   ✓ Already exists'); 
    return; 
  }
  
  const content = fs.readFileSync(CONFIG_FILE, 'utf-8');
  const info = getInfo(content);
  
  let slugs = {
    en: SLUG_EN,
    es: getSlugFromLang(content, 'es'),
    pt: getSlugFromLang(content, 'pt'),
    fr: getSlugFromLang(content, 'fr'),
    de: getSlugFromLang(content, 'de')
  };
  
  const missingSlugs = !slugs.es || !slugs.pt || !slugs.fr || !slugs.de;
  if (missingSlugs && API_KEY && !noTranslate) {
    console.log('   Getting translated slugs...');
    const translatedSlugs = await getTranslatedSlugs(calcName);
    if (translatedSlugs) {
      slugs.es = translatedSlugs.es || slugs.es;
      slugs.pt = translatedSlugs.pt || slugs.pt;
      slugs.fr = translatedSlugs.fr || slugs.fr;
      slugs.de = translatedSlugs.de || slugs.de;
    }
  }
  
  if (!slugs.es) slugs.es = `calculadora-${calcName}`;
  if (!slugs.pt) slugs.pt = `calculadora-${calcName}`;
  if (!slugs.fr) slugs.fr = `calculateur-${calcName}`;
  if (!slugs.de) slugs.de = `${calcName}-rechner`;
  
  console.log('   Slugs:');
  Object.entries(slugs).forEach(([l, s]) => console.log(`     ${l.toUpperCase()}: ${s}`));
  
  const entry = `  { id: "${calcName}", category: "${info.category}", slugs: { en: "${slugs.en}", es: "${slugs.es}", pt: "${slugs.pt}", fr: "${slugs.fr}", de: "${slugs.de}" } },\n`;
  
  const endMark = ']; // END SLUG_REGISTRY';
  const endIdx = r.indexOf(endMark);
  if (endIdx !== -1) {
    r = r.slice(0, endIdx) + entry + r.slice(endIdx);
  } else {
    const last = r.lastIndexOf('];');
    if (last !== -1) r = r.slice(0, last) + entry + r.slice(last);
  }
  
  fs.writeFileSync(REGISTRY, r);
  console.log('   ✓ Added');
}

// ══════════════════════════════════════════════════════════════
// Step 3: Update calculators-config.ts
// ══════════════════════════════════════════════════════════════
function step3_config() {
  console.log('\n⚙️  Step 3: Updating calculators-config.ts...');
  if (!fs.existsSync(CALC_CONFIG)) { console.log('   ⚠ Not found'); return; }
  
  const SLUG_EN = calcName + '-calculator';
  let c = fs.readFileSync(CALC_CONFIG, 'utf-8');
  if (c.includes(`slug: "${SLUG_EN}"`)) { console.log('   ✓ Already exists'); return; }
  
  const content = fs.readFileSync(CONFIG_FILE, 'utf-8');
  const info = getInfo(content);
  const arr = `${info.category.toUpperCase()}_CALCULATORS`;
  const m = c.match(new RegExp(`export\\s+const\\s+${arr}\\s*[=:]\\s*\\[`));
  
  if (!m) { console.log(`   ⚠ ${arr} not found`); return; }
  
  const start = m.index + m[0].length;
  let depth = 1, end = start;
  for (let i = start; i < c.length; i++) {
    if (c[i] === '[') depth++;
    if (c[i] === ']') { depth--; if (depth === 0) { end = i; break; } }
  }
  
  const entry = `  {
    slug: "${SLUG_EN}",
    name: "${info.name}",
    description: "Calculate ${calcName.replace(/-/g, ' ')}",
    icon: "${info.icon}",
    color: "blue",
    category: "${info.category}",
    isNew: true,
    isPro: false,
  },
`;
  c = c.slice(0, end) + entry + c.slice(end);
  fs.writeFileSync(CALC_CONFIG, c);
  console.log(`   ✓ Added to ${arr}`);
}

// ══════════════════════════════════════════════════════════════
// Step 4: Update messages/*.json
// ══════════════════════════════════════════════════════════════
function step4_messages() {
  console.log('\n💬 Step 4: Updating messages/*.json...');
  const camel = toCamel(calcName);
  const content = fs.readFileSync(CONFIG_FILE, 'utf-8');
  const info = getInfo(content);
  
  const files = { en: 'messages/en.json', es: 'messages/es.json', pt: 'messages/pt.json', fr: 'messages/fr.json' };
  const names = {
    en: info.name,
    es: info.name.replace('Calculator', 'Calculadora de').trim(),
    pt: info.name.replace('Calculator', 'Calculadora de').trim(),
    fr: info.name.replace('Calculator', 'Calculateur de').trim()
  };
  
  for (const [lang, file] of Object.entries(files)) {
    const p = path.join(BASE, file);
    if (!fs.existsSync(p)) continue;
    try {
      const m = JSON.parse(fs.readFileSync(p, 'utf-8'));
      let u = false;
      if (!m.calculators) m.calculators = {};
      if (!m.calculators.names) m.calculators.names = {};
      if (!m.calculatorsPage) m.calculatorsPage = {};
      if (!m.calculatorsPage.calcs) m.calculatorsPage.calcs = {};
      
      if (!m.calculators.names[camel]) { m.calculators.names[camel] = names[lang]; u = true; }
      if (!m.calculatorsPage.calcs[camel]) { m.calculatorsPage.calcs[camel] = { desc: `Calculate ${calcName.replace(/-/g, ' ')}` }; u = true; }
      
      if (u) { fs.writeFileSync(p, JSON.stringify(m, null, 2)); console.log(`   ✓ ${lang}.json`); }
      else console.log(`   ✓ ${lang}.json (exists)`);
    } catch (e) { console.log(`   ✗ ${lang}: ${e.message}`); }
  }
}

// ══════════════════════════════════════════════════════════════
// Step 5: Database upsert
// ══════════════════════════════════════════════════════════════
async function step5_database() {
  console.log('\n🗄️  Step 5: Adding to database...');
  const SLUG_EN = calcName + '-calculator';
  try {
    await prisma.calculatorStatus.upsert({ where: { slug: SLUG_EN }, update: {}, create: { slug: SLUG_EN, isActive: true } });
    console.log('   ✓ Added');
  } catch (e) { console.log('   ✗ ' + e.message); }
}

// ══════════════════════════════════════════════════════════════
// Main
// ══════════════════════════════════════════════════════════════
async function main() {
  const SLUG_EN = calcName + '-calculator';
  console.log(`
╔══════════════════════════════════════════════════════════════════╗
║  INSTALLING: ${SLUG_EN.padEnd(50)}║
║  ${noTranslate ? '⏭ Translation: SKIPPED' : '🌐 Translation: ENABLED'}${' '.repeat(43)}║
║  🏗️  Architecture: CATCH-ALL (no individual page.tsx)${' '.repeat(12)}║
╚══════════════════════════════════════════════════════════════════╝`);

  if (!fs.existsSync(CONFIG_FILE)) {
    console.log(`\n❌ NOT FOUND: ${CONFIG_FILE}\n   Create: src/calculators/${calcName}/index.ts\n`);
    process.exit(1);
  }
  console.log('✓ Found: ' + CONFIG_FILE);

  await step1_translate();
  await step2_registry();
  step3_config();
  step4_messages();
  await step5_database();
  await prisma.$disconnect();

  // Get final slugs for display
  const content = fs.readFileSync(CONFIG_FILE, 'utf-8');
  const slugs = {
    en: SLUG_EN,
    es: getSlugFromLang(content, 'es') || `calculadora-${calcName}`,
    pt: getSlugFromLang(content, 'pt') || `calculadora-${calcName}`,
    fr: getSlugFromLang(content, 'fr') || `calculateur-${calcName}`,
    de: getSlugFromLang(content, 'de') || `${calcName}-rechner`
  };

  console.log(`
╔══════════════════════════════════════════════════════════════════╗
║  ✅ COMPLETE                                                     ║
╚══════════════════════════════════════════════════════════════════╝

📍 URLs (all served by catch-all [...slug]):
   EN: http://localhost:3000/en/${slugs.en}
   ES: http://localhost:3000/es/${slugs.es}
   PT: http://localhost:3000/pt/${slugs.pt}
   FR: http://localhost:3000/fr/${slugs.fr}
   DE: http://localhost:3000/de/${slugs.de}

📋 Next: rm -rf .next && npm run dev
${noTranslate ? '\n⚠️  Remember to translate later:\n   node --env-file=.env.local scripts/translate-calc-v4.js ' + calcName : ''}
`);
}

main().catch(e => { console.error('❌', e.message); prisma.$disconnect(); process.exit(1); });
