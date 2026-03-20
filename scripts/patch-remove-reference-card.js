#!/usr/bin/env node

// ═══════════════════════════════════════════════════════════════════════
// 🧹 REMOVE "Quick Reference" infoCard from batch 1 converters
// ═══════════════════════════════════════════════════════════════════════
// Usage: node scripts/patch-remove-reference-card.js
//        node scripts/patch-remove-reference-card.js --dry-run
// ═══════════════════════════════════════════════════════════════════════

const fs = require("fs");
const path = require("path");

const DRY_RUN = process.argv.includes("--dry-run");

const BATCH1_IDS = [
  "liters-to-gallons", "ml-to-oz", "ml-to-cups", "kmh-to-mph",
  "square-meters-to-square-feet", "ml-to-tablespoons", "liters-to-pints",
  "teaspoons-to-ml", "grams-to-ounces", "ounces-to-grams", "quarts-to-liters",
  "hectares-to-acres", "acres-to-hectares", "yards-to-meters", "meters-to-yards",
  "bytes-converter", "mpg-to-km-per-liter", "psi-to-bar", "watts-to-horsepower",
  "degrees-to-radians", "hectareas-to-tareas", "metros-cuadrados-to-tareas",
  "knots-to-mph", "torque-converter",
];

function main() {
  const calcsDir = path.join(process.cwd(), "src", "calculators");
  let patched = 0;
  let skipped = 0;

  console.log(`\n🧹 Removing "Quick Reference" infoCard from ${BATCH1_IDS.length} converters...\n`);

  for (const id of BATCH1_IDS) {
    const filePath = path.join(calcsDir, id, "index.ts");
    if (!fs.existsSync(filePath)) {
      console.log(`  ⏭️  ${id} — not found, skipping`);
      skipped++;
      continue;
    }

    let content = fs.readFileSync(filePath, "utf-8");

    // Check if it has the reference card
    if (!content.includes('"reference"')) {
      console.log(`  ✓  ${id} — no reference card found, already clean`);
      skipped++;
      continue;
    }

    // ── 1. Remove reference infoCard from config section ──
    // Remove: { id: "reference", type: "list", icon: "📋", itemCount: 4 },
    content = content.replace(
      /\s*\{ id: "reference", type: "list", icon: "📋", itemCount: 4 \},?\n/g,
      "\n"
    );

    // ── 2. Remove reference translation block (EN and all languages) ──
    // Matches the entire reference: { title: "...", items: [...] }, block
    content = content.replace(
      /\s*reference: \{\s*title: "[^"]*",\s*items: \[\s*(?:\{[^}]*\},?\s*)*\],?\s*\},?\n/g,
      "\n"
    );

    // Also handle JSON-style (translated) reference blocks
    content = content.replace(
      /\s*"reference": \{\s*"title": "[^"]*",\s*"items": \[\s*(?:\{[^}]*\},?\s*)*\]\s*\},?\n/g,
      "\n"
    );

    // ── 3. Remove ref1-ref4 from formatted in calculate function ──
    content = content.replace(
      /\s*formatted\.ref1 = formatted\[allUnits\[0\]\] \|\| "—";\n/g,
      "\n"
    );
    content = content.replace(
      /\s*formatted\.ref2 = formatted\[allUnits\[1\]\] \|\| "—";\n/g,
      ""
    );
    content = content.replace(
      /\s*formatted\.ref3 = formatted\[allUnits\[2\]\] \|\| "—";\n/g,
      ""
    );
    content = content.replace(
      /\s*formatted\.ref4 = formatted\[allUnits\[3\]\] \|\| "—";\n/g,
      ""
    );

    if (DRY_RUN) {
      console.log(`  🔍 ${id} — would patch`);
    } else {
      fs.writeFileSync(filePath, content, "utf-8");
      console.log(`  ✅ ${id} — patched`);
    }
    patched++;
  }

  console.log(`\n📊 Done! Patched: ${patched} | Skipped: ${skipped} | Total: ${BATCH1_IDS.length}`);
  console.log(`\n📋 Next: rm -rf .next && npm run dev`);
}

main();
