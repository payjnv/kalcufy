#!/usr/bin/env node

// ═══════════════════════════════════════════════════════════════════════
// 🌐 PATCH UNIT TRANSLATIONS — Kalcufy
// ═══════════════════════════════════════════════════════════════════════
// Adds missing unit name translations to messages/{lang}.json
// Run: node scripts/patch-unit-translations.js
// ═══════════════════════════════════════════════════════════════════════

const fs = require("fs");
const path = require("path");

// ─── ALL MISSING TRANSLATIONS BY REGISTRY ID ─────────────────────────
// These are unit IDs from registry.ts that DON'T have translations yet
const MISSING_UNITS = {
  // ── Volume (registry has pt_us/qt_us/gal_us/gal_uk, translations only have pt/qt/gal) ──
  pt_us:    { en: "Pints (US)",           es: "Pintas (EE.UU.)",       pt: "Pintas (EUA)",          fr: "Pintes (US)",           de: "Pints (US)" },
  pt_uk:    { en: "Pints (Imperial)",     es: "Pintas (Imperial)",     pt: "Pintas (Imperial)",     fr: "Pintes (Impérial)",     de: "Pints (Imperial)" },
  qt_us:    { en: "Quarts (US)",          es: "Cuartos (EE.UU.)",      pt: "Quartos (EUA)",         fr: "Quarts (US)",           de: "Quarts (US)" },
  qt_uk:    { en: "Quarts (Imperial)",    es: "Cuartos (Imperial)",    pt: "Quartos (Imperial)",    fr: "Quarts (Impérial)",     de: "Quarts (Imperial)" },
  gal_us:   { en: "Gallons (US)",         es: "Galones (EE.UU.)",      pt: "Galões (EUA)",          fr: "Gallons (US)",          de: "Gallonen (US)" },
  gal_uk:   { en: "Gallons (Imperial)",   es: "Galones (Imperial)",    pt: "Galões (Imperial)",     fr: "Gallons (Impérial)",    de: "Gallonen (Imperial)" },
  in3:      { en: "Cubic Inches",         es: "Pulgadas cúbicas",      pt: "Polegadas cúbicas",     fr: "Pouces cubes",          de: "Kubikzoll" },

  // ── Area (registry has "hectares", translations have "ha") ──
  hectares: { en: "Hectares",             es: "Hectáreas",              pt: "Hectares",              fr: "Hectares",              de: "Hektar" },

  // ── Mass (registry IDs differ from translation IDs) ──
  mg:       { en: "Milligrams",           es: "Miligramos",             pt: "Miligramas",            fr: "Milligrammes",          de: "Milligramm" },
  ug:       { en: "Micrograms",           es: "Microgramos",            pt: "Microgramas",           fr: "Microgrammes",          de: "Mikrogramm" },
  ton_metric: { en: "Metric Tons",        es: "Toneladas métricas",     pt: "Toneladas métricas",    fr: "Tonnes métriques",      de: "Metrische Tonnen" },
  ton_us:   { en: "Short Tons (US)",      es: "Toneladas cortas (EE.UU.)", pt: "Toneladas curtas (EUA)", fr: "Tonnes courtes (US)", de: "Kurze Tonnen (US)" },
  ton_uk:   { en: "Long Tons (UK)",       es: "Toneladas largas (UK)",  pt: "Toneladas longas (UK)", fr: "Tonnes longues (UK)",   de: "Lange Tonnen (UK)" },
  quintal:  { en: "Quintals",             es: "Quintales",              pt: "Quintais",              fr: "Quintaux",              de: "Zentner" },

  // ── Speed (registry: ms/kmh/fts, translations: m/s, km/h, ft/s) ──
  ms:       { en: "Meters/second",        es: "Metros/segundo",         pt: "Metros/segundo",        fr: "Mètres/seconde",        de: "Meter/Sekunde" },
  kmh:      { en: "Kilometers/hour",      es: "Kilómetros/hora",        pt: "Quilômetros/hora",      fr: "Kilomètres/heure",      de: "Kilometer/Stunde" },
  fts:      { en: "Feet/second",          es: "Pies/segundo",           pt: "Pés/segundo",           fr: "Pieds/seconde",         de: "Fuß/Sekunde" },
  mach:     { en: "Mach",                 es: "Mach",                   pt: "Mach",                  fr: "Mach",                  de: "Mach" },

  // ── Power (registry: HP/BTUh/PS/MW/mW) ──
  HP:       { en: "Horsepower",           es: "Caballos de fuerza",     pt: "Cavalos de força",      fr: "Chevaux-vapeur",        de: "Pferdestärken" },
  PS:       { en: "Pferdestärke (PS)",    es: "Pferdestärke (PS)",      pt: "Pferdestärke (PS)",     fr: "Pferdestärke (PS)",     de: "Pferdestärke (PS)" },
  BTUh:     { en: "BTU per hour",         es: "BTU por hora",           pt: "BTU por hora",          fr: "BTU par heure",         de: "BTU pro Stunde" },
  MW:       { en: "Megawatts",            es: "Megavatios",             pt: "Megawatts",             fr: "Mégawatts",             de: "Megawatt" },
  mW:       { en: "Milliwatts",           es: "Milivatios",             pt: "Miliwatts",             fr: "Milliwatts",            de: "Milliwatt" },

  // ── Pressure (missing some) ──
  hPa:      { en: "Hectopascals",         es: "Hectopascales",          pt: "Hectopascais",          fr: "Hectopascals",          de: "Hektopascal" },
  MPa:      { en: "Megapascals",          es: "Megapascales",           pt: "Megapascais",           fr: "Mégapascals",           de: "Megapascal" },
  mbar:     { en: "Millibar",             es: "Milibares",              pt: "Milibares",             fr: "Millibars",             de: "Millibar" },
  inHg:     { en: "Inches of Mercury",    es: "Pulgadas de mercurio",   pt: "Polegadas de mercúrio", fr: "Pouces de mercure",     de: "Zoll Quecksilber" },

  // ── Force (missing some) ──
  mN:       { en: "Millinewtons",         es: "Milinewtons",            pt: "Milinewtons",           fr: "Millinewtons",          de: "Millinewton" },
  dyn:      { en: "Dynes",               es: "Dinas",                  pt: "Dinas",                 fr: "Dynes",                 de: "Dyn" },

  // ── Torque (registry: ftlbf/inlbf/kgfm/kgfcm/ozfin/kNm) ──
  ftlbf:    { en: "Foot-pounds",          es: "Libras-pie",             pt: "Libras-pé",             fr: "Livres-pied",           de: "Fuß-Pfund" },
  inlbf:    { en: "Inch-pounds",          es: "Libras-pulgada",         pt: "Libras-polegada",       fr: "Livres-pouce",          de: "Zoll-Pfund" },
  kgfm:     { en: "Kilogram-force meters", es: "Kilogramos-fuerza metro", pt: "Quilograma-força metro", fr: "Kilogramme-force mètre", de: "Kilogramm-Kraft Meter" },
  kgfcm:    { en: "Kilogram-force cm",    es: "Kilogramos-fuerza cm",   pt: "Quilograma-força cm",   fr: "Kilogramme-force cm",   de: "Kilogramm-Kraft cm" },
  ozfin:    { en: "Ounce-force inches",   es: "Onzas-fuerza pulgada",   pt: "Onça-força polegada",   fr: "Once-force pouce",      de: "Unze-Kraft Zoll" },
  kNm:      { en: "Kilonewton-meters",    es: "Kilonewton-metros",      pt: "Quilonewton-metros",    fr: "Kilonewton-mètres",     de: "Kilonewtonmeter" },
  Nm:       { en: "Newton-meters",        es: "Newton-metros",          pt: "Newton-metros",         fr: "Newton-mètres",         de: "Newtonmeter" },

  // ── Fuel Economy (registry: mpg_us/mpg_uk/kmL/L100km) ──
  mpg_us:   { en: "Miles/gallon (US)",    es: "Millas/galón (EE.UU.)",  pt: "Milhas/galão (EUA)",    fr: "Miles/gallon (US)",     de: "Meilen/Gallone (US)" },
  mpg_uk:   { en: "Miles/gallon (UK)",    es: "Millas/galón (UK)",      pt: "Milhas/galão (UK)",     fr: "Miles/gallon (UK)",     de: "Meilen/Gallone (UK)" },
  kmL:      { en: "Kilometers/liter",     es: "Kilómetros/litro",       pt: "Quilômetros/litro",     fr: "Kilomètres/litre",      de: "Kilometer/Liter" },
  L100km:   { en: "Liters/100km",         es: "Litros/100km",           pt: "Litros/100km",          fr: "Litres/100km",          de: "Liter/100km" },

  // ── Acceleration (registry: ms2/fts2/g_acc/gal) ──
  ms2:      { en: "Meters/s²",           es: "Metros/s²",              pt: "Metros/s²",             fr: "Mètres/s²",             de: "Meter/s²" },
  fts2:     { en: "Feet/s²",             es: "Pies/s²",                pt: "Pés/s²",                fr: "Pieds/s²",              de: "Fuß/s²" },
  g_acc:    { en: "Standard gravity (g)", es: "Gravedad estándar (g)",   pt: "Gravidade padrão (g)",  fr: "Gravité standard (g)",  de: "Normalgravitation (g)" },
  gal:      { en: "Gals (cm/s²)",        es: "Gals (cm/s²)",           pt: "Gals (cm/s²)",          fr: "Gals (cm/s²)",          de: "Gals (cm/s²)" },

  // ── Density (registry: kgm3/gcm3/gml/lbft3/gL/kgL) ──
  kgm3:     { en: "kg/m³",               es: "kg/m³",                   pt: "kg/m³",                 fr: "kg/m³",                 de: "kg/m³" },
  gcm3:     { en: "g/cm³",               es: "g/cm³",                   pt: "g/cm³",                 fr: "g/cm³",                 de: "g/cm³" },
  gml:      { en: "g/mL",                es: "g/mL",                    pt: "g/mL",                  fr: "g/mL",                  de: "g/mL" },
  lbft3:    { en: "lb/ft³",              es: "lb/ft³",                  pt: "lb/ft³",                fr: "lb/ft³",                de: "lb/ft³" },
  gL:       { en: "g/L",                 es: "g/L",                     pt: "g/L",                   fr: "g/L",                   de: "g/L" },
  kgL:      { en: "kg/L",                es: "kg/L",                    pt: "kg/L",                  fr: "kg/L",                  de: "kg/L" },

  // ── Flow Rate (registry: mLmin/Lmin/Lh/m3h/gal_min/cfm) ──
  mLmin:    { en: "Milliliters/min",      es: "Mililitros/min",          pt: "Mililitros/min",        fr: "Millilitres/min",       de: "Milliliter/min" },
  Lmin:     { en: "Liters/minute",        es: "Litros/minuto",           pt: "Litros/minuto",         fr: "Litres/minute",         de: "Liter/Minute" },
  Lh:       { en: "Liters/hour",          es: "Litros/hora",             pt: "Litros/hora",           fr: "Litres/heure",          de: "Liter/Stunde" },
  m3h:      { en: "Cubic m/hour",         es: "Metros cúbicos/hora",     pt: "Metros cúbicos/hora",   fr: "Mètres cubes/heure",    de: "Kubikmeter/Stunde" },
  gal_min:  { en: "Gallons/min (US)",     es: "Galones/min (EE.UU.)",    pt: "Galões/min (EUA)",      fr: "Gallons/min (US)",      de: "Gallonen/min (US)" },
  cfm:      { en: "Cubic feet/min",       es: "Pies cúbicos/min",        pt: "Pés cúbicos/min",       fr: "Pieds cubes/min",       de: "Kubikfuß/min" },

  // ── Data (registry: byte/kb/mb/gb/tb/pb + binary) ──
  byte:     { en: "Bytes",               es: "Bytes",                    pt: "Bytes",                 fr: "Octets",                de: "Bytes" },
  bit:      { en: "Bits",                es: "Bits",                     pt: "Bits",                  fr: "Bits",                  de: "Bits" },
  pb:       { en: "Petabytes",           es: "Petabytes",                pt: "Petabytes",             fr: "Pétaoctets",            de: "Petabytes" },
  kib:      { en: "Kibibytes",           es: "Kibibytes",                pt: "Kibibytes",             fr: "Kibioctets",            de: "Kibibytes" },
  mib:      { en: "Mebibytes",           es: "Mebibytes",                pt: "Mebibytes",             fr: "Mébioctets",            de: "Mebibytes" },
  gib:      { en: "Gibibytes",           es: "Gibibytes",                pt: "Gibibytes",             fr: "Gibioctets",            de: "Gibibytes" },
  tib:      { en: "Tebibytes",           es: "Tebibytes",                pt: "Tebibytes",             fr: "Tébioctets",            de: "Tebibytes" },
  pib:      { en: "Pebibytes",           es: "Pebibytes",                pt: "Pebibytes",             fr: "Pébioctets",            de: "Pebibytes" },

  // ── Data Rate (registry: byte_s/kb_s/mb_s/gb_s) ──
  byte_s:   { en: "Bytes/second",        es: "Bytes/segundo",            pt: "Bytes/segundo",         fr: "Octets/seconde",        de: "Bytes/Sekunde" },
  kb_s:     { en: "Kilobytes/second",    es: "Kilobytes/segundo",        pt: "Kilobytes/segundo",     fr: "Kilooctets/seconde",    de: "Kilobytes/Sekunde" },
  mb_s:     { en: "Megabytes/second",    es: "Megabytes/segundo",        pt: "Megabytes/segundo",     fr: "Mégaoctets/seconde",    de: "Megabytes/Sekunde" },
  gb_s:     { en: "Gigabytes/second",    es: "Gigabytes/segundo",        pt: "Gigabytes/segundo",     fr: "Gigaoctets/seconde",    de: "Gigabytes/Sekunde" },

  // ── Frequency Wave (registry: mHz/THz/rpm) ──
  mHz:      { en: "Millihertz",          es: "Milihercios",              pt: "Mili-hertz",            fr: "Millihertz",            de: "Millihertz" },
  THz:      { en: "Terahertz",           es: "Terahercios",              pt: "Terahertz",             fr: "Térahertz",             de: "Terahertz" },
  rpm:      { en: "Revolutions/minute",  es: "Revoluciones/minuto",      pt: "Rotações/minuto",       fr: "Tours/minute",          de: "Umdrehungen/Minute" },

  // ── Illuminance (registry: klux/phot) ──
  klux:     { en: "Kilolux",             es: "Kilolux",                  pt: "Quilolux",              fr: "Kilolux",               de: "Kilolux" },
  phot:     { en: "Phots",               es: "Phots",                    pt: "Phots",                 fr: "Phots",                 de: "Phots" },

  // ── Magnetic Field (registry: nT/uT) ──
  nT:       { en: "Nanotesla",           es: "Nanotesla",                pt: "Nanotesla",             fr: "Nanotesla",             de: "Nanotesla" },
  uT:       { en: "Microtesla",          es: "Microtesla",               pt: "Microtesla",            fr: "Microtesla",            de: "Mikrotesla" },
  G:        { en: "Gauss",               es: "Gauss",                    pt: "Gauss",                 fr: "Gauss",                 de: "Gauss" },

  // ── Voltage (missing) ──
  uV:       { en: "Microvolts",          es: "Microvoltios",             pt: "Microvolts",            fr: "Microvolts",            de: "Mikrovolt" },
  MV:       { en: "Megavolts",           es: "Megavoltios",              pt: "Megavolts",             fr: "Mégavolts",             de: "Megavolt" },

  // ── Current (missing) ──
  nA:       { en: "Nanoamperes",         es: "Nanoamperios",             pt: "Nanoamperes",           fr: "Nanoampères",           de: "Nanoampere" },
  kA:       { en: "Kiloamperes",         es: "Kiloamperios",             pt: "Quiloamperes",          fr: "Kiloampères",           de: "Kiloampere" },

  // ── Resistance (registry uses mohm/kohm/Mohm) ──
  mohm:     { en: "Milliohms",           es: "Miliohmios",               pt: "Miliohms",              fr: "Milliohms",             de: "Milliohm" },
  ohm:      { en: "Ohms",                es: "Ohmios",                   pt: "Ohms",                  fr: "Ohms",                  de: "Ohm" },
  kohm:     { en: "Kilohms",             es: "Kiloohmios",               pt: "Quiloohms",             fr: "Kilohms",               de: "Kilohm" },
  Mohm:     { en: "Megaohms",            es: "Megaohmios",               pt: "Megaohms",              fr: "Mégohms",               de: "Megaohm" },

  // ── Angle (registry: arcmin/arcsec/turn) ──
  arcmin:   { en: "Arcminutes",          es: "Minutos de arco",          pt: "Minutos de arco",       fr: "Minutes d'arc",         de: "Bogenminuten" },
  arcsec:   { en: "Arcseconds",          es: "Segundos de arco",         pt: "Segundos de arco",      fr: "Secondes d'arc",        de: "Bogensekunden" },
  turn:     { en: "Turns (revolutions)", es: "Vueltas (revoluciones)",   pt: "Voltas (revoluções)",   fr: "Tours (révolutions)",   de: "Umdrehungen" },

  // ── Time (missing: ns/us/wk) ──
  ns:       { en: "Nanoseconds",         es: "Nanosegundos",             pt: "Nanossegundos",         fr: "Nanosecondes",          de: "Nanosekunden" },
  us:       { en: "Microseconds",        es: "Microsegundos",            pt: "Microssegundos",        fr: "Microsecondes",         de: "Mikrosekunden" },
  wk:       { en: "Weeks",               es: "Semanas",                  pt: "Semanas",               fr: "Semaines",              de: "Wochen" },
  d:        { en: "Days",                es: "Días",                     pt: "Dias",                  fr: "Jours",                 de: "Tage" },

  // ── Energy (missing: kJ/MJ/Wh/eV) ──
  kJ:       { en: "Kilojoules",          es: "Kilojulios",               pt: "Quilojoules",           fr: "Kilojoules",            de: "Kilojoule" },
  MJ:       { en: "Megajoules",          es: "Megajulios",               pt: "Megajoules",            fr: "Mégajoules",            de: "Megajoule" },
  eV:       { en: "Electronvolts",       es: "Electronvoltios",          pt: "Elétronvolts",          fr: "Électronvolts",         de: "Elektronenvolt" },

  // ── Construction (registry: bdft/lnft/sq/pct/deg/ratio for slope) ──
  bdft:     { en: "Board Feet",          es: "Pies tabla",               pt: "Pés-tábua",             fr: "Pieds-planche",         de: "Board Feet" },
  lnft:     { en: "Linear Feet",         es: "Pies lineales",            pt: "Pés lineares",          fr: "Pieds linéaires",       de: "Laufende Fuß" },
  sq:       { en: "Squares (100ft²)",    es: "Cuadrados (100ft²)",       pt: "Quadrados (100ft²)",    fr: "Carrés (100ft²)",       de: "Squares (100ft²)" },
  pct:      { en: "Percent Grade",       es: "Porcentaje de pendiente",  pt: "Percentual de inclinação", fr: "Pourcentage de pente", de: "Prozent Steigung" },
  deg:      { en: "Degrees",             es: "Grados",                   pt: "Graus",                 fr: "Degrés",                de: "Grad" },

  // ── Pace (registry: min_km/min_mi/min_100m) ──
  min_km:   { en: "Minutes/km",          es: "Minutos/km",               pt: "Minutos/km",            fr: "Minutes/km",            de: "Minuten/km" },
  min_mi:   { en: "Minutes/mile",        es: "Minutos/milla",            pt: "Minutos/milha",         fr: "Minutes/mile",          de: "Minuten/Meile" },
  min_100m: { en: "Minutes/100m",        es: "Minutos/100m",             pt: "Minutos/100m",          fr: "Minutes/100m",          de: "Minuten/100m" },

  // ── Finance (common ones that might be missing) ──
  continuously: { en: "Continuously",    es: "Continuamente",            pt: "Continuamente",         fr: "Continuellement",       de: "Kontinuierlich" },
  hourly:    { en: "Hourly",             es: "Por hora",                 pt: "Por hora",              fr: "Par heure",             de: "Stündlich" },
  total:     { en: "Total",              es: "Total",                    pt: "Total",                 fr: "Total",                 de: "Gesamt" },
};

const LANG_MAP = {
  "en.json": "en",
  "es.json": "es",
  "pt.json": "pt",
  "fr.json": "fr",
  "de.json": "de",
};

function main() {
  const messagesDir = path.join(process.cwd(), "messages");
  let totalAdded = 0;

  for (const [filename, lang] of Object.entries(LANG_MAP)) {
    const filePath = path.join(messagesDir, filename);
    if (!fs.existsSync(filePath)) {
      console.log(`  ⏭️  ${filename} — not found, skipping`);
      continue;
    }

    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    if (!data.units) {
      data.units = {};
    }

    let added = 0;
    for (const [unitId, translations] of Object.entries(MISSING_UNITS)) {
      const name = translations[lang];
      if (!name) continue;

      // Only add if not already present
      if (!data.units[unitId]) {
        data.units[unitId] = { name };
        added++;
      }
    }

    if (added > 0) {
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + "\n", "utf-8");
      console.log(`  ✅ ${filename} — added ${added} unit translations`);
      totalAdded += added;
    } else {
      console.log(`  ✓  ${filename} — all translations already present`);
    }
  }

  console.log(`\n📊 Done! Added ${totalAdded} translations total across all languages.`);
  console.log(`\n📋 Next: rm -rf .next && npm run dev`);
}

console.log("\n🌐 Patching unit translations...\n");
main();
