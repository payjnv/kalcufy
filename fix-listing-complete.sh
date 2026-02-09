#!/bin/bash
# ============================================
# FIX: Listing page shows ALL 7 categories
# ============================================
# Run from project root:
#   bash fix-listing-complete.sh
# ============================================

set -e

echo "═══════════════════════════════════════════"
echo "  STEP 1: Insert missing categories in DB"
echo "═══════════════════════════════════════════"

node --env-file=.env.local -e "
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const cats = [
    { slug: 'finance', nameEn: 'Finance', nameEs: 'Finanzas', namePt: 'Finanças', nameFr: 'Finances', nameDe: 'Finanzen', color: 'green', sortOrder: 1 },
    { slug: 'health', nameEn: 'Health & Fitness', nameEs: 'Salud y Fitness', namePt: 'Saúde e Fitness', nameFr: 'Santé et Fitness', nameDe: 'Gesundheit & Fitness', color: 'red', sortOrder: 2 },
    { slug: 'math', nameEn: 'Math', nameEs: 'Matemáticas', namePt: 'Matemática', nameFr: 'Mathématiques', nameDe: 'Mathematik', color: 'purple', sortOrder: 3 },
    { slug: 'everyday', nameEn: 'Everyday', nameEs: 'Cotidianas', namePt: 'Cotidianas', nameFr: 'Quotidien', nameDe: 'Alltag', color: 'blue', sortOrder: 4 },
    { slug: 'technology', nameEn: 'Technology', nameEs: 'Tecnología', namePt: 'Tecnologia', nameFr: 'Technologie', nameDe: 'Technologie', color: 'indigo', sortOrder: 5 },
    { slug: 'conversion', nameEn: 'Conversion', nameEs: 'Conversión', namePt: 'Conversão', nameFr: 'Conversion', nameDe: 'Umrechnung', color: 'teal', sortOrder: 6 },
    { slug: 'home', nameEn: 'Home & Construction', nameEs: 'Hogar y Construcción', namePt: 'Casa e Construção', nameFr: 'Maison et Construction', nameDe: 'Haus & Bau', color: 'amber', sortOrder: 7 },
  ];

  for (const cat of cats) {
    const result = await prisma.calculatorCategory.upsert({
      where: { slug: cat.slug },
      update: { sortOrder: cat.sortOrder },
      create: cat,
    });
    console.log('  ✅', result.slug, '→', result.nameEn);
  }

  const total = await prisma.calculatorCategory.count();
  console.log('\n  Total categories in DB:', total);
}

main().finally(() => prisma.\$disconnect());
"

echo ""
echo "═══════════════════════════════════════════"
echo "  STEP 2: Update page.tsx (dynamic counts)"
echo "═══════════════════════════════════════════"

# Backup original
cp src/app/\[locale\]/calculators/page.tsx src/app/\[locale\]/calculators/page.tsx.bak

# Replace the hardcoded counts block with dynamic counts
cat > /tmp/page-fix.py << 'PYEOF'
import re

f = open("src/app/[locale]/calculators/page.tsx", "r")
content = f.read()
f.close()

# Replace hardcoded counts with dynamic counts
old_counts = '''  const counts = {
    total: calculators.length,
    finance: calculators.filter((c) => c.category === "finance").length,
    health: calculators.filter((c) => c.category === "health").length,
    math: calculators.filter((c) => c.category === "math").length,
    everyday: calculators.filter((c) => c.category === "everyday").length,
  };'''

new_counts = '''  // Dynamic counts — ALL categories from DB, not hardcoded
  const counts: Record<string, number> = { total: calculators.length };
  for (const cat of categories) {
    counts[cat.slug] = calculators.filter((c) => c.category === cat.slug).length;
  }'''

if old_counts in content:
    content = content.replace(old_counts, new_counts)
    print("  ✅ Replaced hardcoded counts with dynamic counts")
else:
    print("  ⚠️  Could not find exact counts block — checking alternative...")
    # Try regex approach
    pattern = r'const counts = \{[^}]+\};'
    if re.search(pattern, content, re.DOTALL):
        content = re.sub(pattern, '''// Dynamic counts — ALL categories from DB, not hardcoded
  const counts: Record<string, number> = { total: calculators.length };
  for (const cat of categories) {
    counts[cat.slug] = calculators.filter((c) => c.category === cat.slug).length;
  }''', content, flags=re.DOTALL)
        print("  ✅ Replaced counts via regex")
    else:
        print("  ❌ Could not find counts block at all")

f = open("src/app/[locale]/calculators/page.tsx", "w")
f.write(content)
f.close()
PYEOF

python3 /tmp/page-fix.py

echo ""
echo "═══════════════════════════════════════════"
echo "  STEP 3: Ensure category-icons supports new categories"
echo "═══════════════════════════════════════════"

# Check if getCategoryIcon handles the new slugs
if grep -q "technology" src/config/category-icons.tsx 2>/dev/null || grep -q "technology" src/config/category-icons.ts 2>/dev/null; then
  echo "  ✅ category-icons already has technology"
else
  echo "  ⚠️  category-icons may need updating for new slugs"
  echo "  Checking file..."
  ICONS_FILE=$(find src/config -name "category-icons*" | head -1)
  if [ -n "$ICONS_FILE" ]; then
    echo "  File: $ICONS_FILE"
    cat "$ICONS_FILE"
  fi
fi

echo ""
echo "═══════════════════════════════════════════"
echo "  STEP 4: Clean cache and restart"
echo "═══════════════════════════════════════════"

rm -rf .next
echo "  ✅ Cache cleaned"
echo ""
echo "  Now run: npm run dev"
echo "  Then check: http://localhost:3000/en/calculators"
echo ""
echo "  Expected: ALL 78 calculators in 7 categories"
echo "═══════════════════════════════════════════"
