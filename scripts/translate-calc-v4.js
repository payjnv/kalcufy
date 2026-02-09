#!/usr/bin/env node
/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  TRANSLATE V4 CALCULATOR - v2.0 IMPROVED                         ║
 * ╠══════════════════════════════════════════════════════════════════╣
 * ║  Usage:                                                          ║
 * ║    node --env-file=.env.local scripts/translate-calc-v4.js <n>║
 * ║                                                                  ║
 * ║  Example:                                                        ║
 * ║    node --env-file=.env.local scripts/translate-calc-v4.js tdee  ║
 * ╚══════════════════════════════════════════════════════════════════╝
 * 
 * ONLY translates - use install-calc-v4.js for full installation
 * 
 * IMPROVEMENTS v2.0:
 *   - Better slug translation with explicit examples
 *   - Updates registry.ts with correct translated slugs
 *   - Creates backup before modifying
 */

const fs = require('fs');
const path = require('path');

const API_KEY = process.env.ANTHROPIC_API_KEY;

const calcName = process.argv[2];
if (!calcName) {
  console.log(`
╔══════════════════════════════════════════════════════════════════╗
║  TRANSLATE V4 CALCULATOR - v2.0                                  ║
╠══════════════════════════════════════════════════════════════════╣
║  Usage:                                                          ║
║    node --env-file=.env.local scripts/translate-calc-v4.js <n>║
║                                                                  ║
║  Example:                                                        ║
║    node --env-file=.env.local scripts/translate-calc-v4.js tdee  ║
╚══════════════════════════════════════════════════════════════════╝
`);
  process.exit(1);
}

const BASE = process.cwd();
const CONFIG_FILE = path.join(BASE, 'src/calculators', calcName, 'index.ts');
const REGISTRY = path.join(BASE, 'src/engine/v4/slugs/registry.ts');
const SLUG_EN = calcName + '-calculator';

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

function getSlugFromLang(content, lang) {
  const langBlockRegex = new RegExp(`${lang}:\\s*\\{[\\s\\S]*?slug:\\s*["'\`]([^"'\`]+)["'\`]`, 'm');
  const m = content.match(langBlockRegex);
  return m ? m[1] : null;
}

function getInfo(content) {
  const c = content.match(/category:\s*["'`]([^"'`]+)["'`]/);
  return { category: c ? c[1] : 'health' };
}

async function main() {
  console.log(`
╔══════════════════════════════════════════════════════════════════╗
║  TRANSLATING: ${calcName.padEnd(49)}║
╚══════════════════════════════════════════════════════════════════╝`);

  if (!fs.existsSync(CONFIG_FILE)) {
    console.log(`\n❌ NOT FOUND: ${CONFIG_FILE}\n`);
    process.exit(1);
  }

  if (!API_KEY) {
    console.log('\n❌ ANTHROPIC_API_KEY not set\n');
    process.exit(1);
  }

  // Backup
  const backup = CONFIG_FILE.replace('index.ts', 'index.backup.ts');
  fs.copyFileSync(CONFIG_FILE, backup);
  console.log('📦 Backup: index.backup.ts');

  let content = fs.readFileSync(CONFIG_FILE, 'utf-8');
  
  const existing = LANGS.filter(l => new RegExp(`\\b${l}:\\s*\\{`).test(content));
  const missing = LANGS.filter(l => !existing.includes(l));
  
  console.log('\n📋 Status:');
  LANGS.forEach(l => console.log(`   ${l.toUpperCase()}: ${existing.includes(l) ? '✓ Present' : '❌ Missing'}`));
  
  if (!missing.length) {
    console.log('\n✓ All translations present');
    updateRegistry(content);
    return;
  }

  const en = extractEnBlock(content);
  if (!en) {
    console.log('\n❌ Cannot extract EN block');
    process.exit(1);
  }
  console.log(`\n📝 EN source: ${en.length} chars`);

  const translations = {};
  const slugs = { en: SLUG_EN };

  for (const lang of missing) {
    try {
      console.log(`\n🌐 → ${LANG_NAMES[lang]}...`);
      
      const prompt = `Translate this calculator config to ${LANG_NAMES[lang]}. Return ONLY valid JSON.

CRITICAL - SLUG TRANSLATION:
The English slug is: "${SLUG_EN}"
You MUST create a FULLY TRANSLATED slug in ${LANG_NAMES[lang]}:
${lang === 'es' ? '- Format: "calculadora-[nombre-completamente-traducido]"\n- Example: "caloric-deficit-calculator" → "calculadora-deficit-calorico"\n- Example: "maintenance-calories-calculator" → "calculadora-calorias-mantenimiento"\n- Example: "body-fat-calculator" → "calculadora-grasa-corporal"' : ''}
${lang === 'pt' ? '- Format: "calculadora-[nome-completamente-traduzido]"\n- Example: "caloric-deficit-calculator" → "calculadora-deficit-calorico"\n- Example: "maintenance-calories-calculator" → "calculadora-calorias-manutencao"\n- Example: "body-fat-calculator" → "calculadora-gordura-corporal"' : ''}
${lang === 'fr' ? '- Format: "calculateur-[nom-completement-traduit]"\n- Example: "caloric-deficit-calculator" → "calculateur-deficit-calorique"\n- Example: "maintenance-calories-calculator" → "calculateur-calories-maintenance"\n- Example: "body-fat-calculator" → "calculateur-graisse-corporelle"' : ''}
${lang === 'de' ? '- Format: "[vollstaendig-uebersetzter-name]-rechner"\n- Example: "caloric-deficit-calculator" → "kaloriendefizit-rechner"\n- Example: "maintenance-calories-calculator" → "wartungskalorien-rechner"\n- Example: "body-fat-calculator" → "koerperfett-rechner"' : ''}

DO NOT keep English words in the slug. Translate EVERYTHING.

DO NOT include these keys (added automatically): buttons, share, ui, accessibility, rating, common, sources, calculator

ENGLISH SOURCE:
{${en}}

Return ${LANG_NAMES[lang]} JSON:`;

      const r = await callAPI(prompt);
      let json = r.replace(/```json\s*/gi, '').replace(/```\s*/gi, '').trim();
      
      const parsed = JSON.parse(json);
      
      // Extract slug before merging UI
      if (parsed.slug) {
        slugs[lang] = parsed.slug;
      }
      
      // Merge UI translations
      Object.assign(parsed, UI[lang]);
      
      translations[lang] = JSON.stringify(parsed, null, 2);
      console.log(`   ✅ ${LANG_NAMES[lang]}: OK (slug: ${slugs[lang] || 'default'})`);
      
      await new Promise(r => setTimeout(r, 500));
    } catch (e) {
      console.log(`   ❌ ${LANG_NAMES[lang]}: ${e.message}`);
    }
  }

  // Insert translations
  if (Object.keys(translations).length) {
    console.log('\n📝 Inserting translations...');
    
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
    console.log('   ✅ Inserted!');
  }

  // Update registry with collected slugs
  content = fs.readFileSync(CONFIG_FILE, 'utf-8');
  
  // Also get slugs from existing translations
  for (const lang of existing) {
    if (!slugs[lang]) {
      slugs[lang] = getSlugFromLang(content, lang);
    }
  }
  
  updateRegistry(content, slugs);

  // Summary
  const success = Object.keys(translations);
  const failed = missing.filter(l => !translations[l]);
  
  console.log(`
╔══════════════════════════════════════════════════════════════════╗
║  ✅ TRANSLATION COMPLETE                                         ║
╚══════════════════════════════════════════════════════════════════╝
✅ Success: ${success.length} (${success.join(', ') || 'none'})
❌ Failed: ${failed.length} (${failed.join(', ') || 'none'})

📍 URLs:
   EN: http://localhost:3000/en/${slugs.en}
   ES: http://localhost:3000/es/${slugs.es || 'calculadora-' + calcName}
   PT: http://localhost:3000/pt/${slugs.pt || 'calculadora-' + calcName}
   FR: http://localhost:3000/fr/${slugs.fr || 'calculateur-' + calcName}
   DE: http://localhost:3000/de/${slugs.de || calcName + '-rechner'}

⚠️  Run: rm -rf .next && npm run dev
`);
}

function updateRegistry(content, slugsOverride) {
  console.log('\n📝 Updating registry.ts...');
  
  if (!fs.existsSync(REGISTRY)) {
    console.log('   ⚠ Registry not found');
    return;
  }
  
  let r = fs.readFileSync(REGISTRY, 'utf-8');
  const info = getInfo(content);
  
  // Get slugs from translations or use overrides
  const slugs = slugsOverride || {
    en: SLUG_EN,
    es: getSlugFromLang(content, 'es'),
    pt: getSlugFromLang(content, 'pt'),
    fr: getSlugFromLang(content, 'fr'),
    de: getSlugFromLang(content, 'de')
  };
  
  // CRITICAL: EN slug must ALWAYS be English format
  slugs.en = SLUG_EN;
  
  // Default slugs if not found
  if (!slugs.es) slugs.es = `calculadora-${calcName}`;
  if (!slugs.pt) slugs.pt = `calculadora-${calcName}`;
  if (!slugs.fr) slugs.fr = `calculateur-${calcName}`;
  if (!slugs.de) slugs.de = `${calcName}-rechner`;
  
  console.log('   Slugs:');
  Object.entries(slugs).forEach(([l, s]) => console.log(`     ${l.toUpperCase()}: ${s}`));
  
  const entry = `{ id: "${calcName}", category: "${info.category}", slugs: { en: "${slugs.en}", es: "${slugs.es}", pt: "${slugs.pt}", fr: "${slugs.fr}", de: "${slugs.de}" } }`;
  
  // Check if exists and update, or add new
  // Fixed regex to capture full object including nested slugs: { ... }
  const existingRegex = new RegExp(`\\{\\s*id:\\s*"${calcName}"[^}]*slugs:\\s*\\{[^}]*\\}\\s*\\}`, 's');
  
  if (existingRegex.test(r)) {
    r = r.replace(existingRegex, entry);
    console.log('   ✅ Updated existing entry');
  } else {
    const endMark = ']; // END SLUG_REGISTRY';
    const endIdx = r.indexOf(endMark);
    if (endIdx !== -1) {
      r = r.slice(0, endIdx) + '  ' + entry + ',\n' + r.slice(endIdx);
    } else {
      const last = r.lastIndexOf('];');
      if (last !== -1) r = r.slice(0, last) + '  ' + entry + ',\n' + r.slice(last);
    }
    console.log('   ✅ Added new entry');
  }
  
  fs.writeFileSync(REGISTRY, r);
}

main().catch(e => { console.error('❌', e.message); process.exit(1); });
