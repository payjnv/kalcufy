// cleanup-categories.js
// Run: node --env-file=.env.local scripts/cleanup-categories.js

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("🔍 Current categories:");
  const cats = await prisma.calculatorCategory.findMany({ 
    orderBy: { sortOrder: "asc" },
    include: { calculators: true }
  });
  cats.forEach(c => console.log(`  ${c.slug} | ${c.nameEn} | order:${c.sortOrder} | calcs:${c.calculators.length}`));

  // ── 1. Merge "home-construction" into "home" ──
  const homeConstruction = cats.find(c => c.slug === "home-construction");
  const home = cats.find(c => c.slug === "home");
  
  if (homeConstruction && home) {
    console.log("\n🔄 Merging home-construction → home...");
    for (const assoc of homeConstruction.calculators) {
      const existing = await prisma.calculatorToCategory.findUnique({
        where: { calculatorSlug_categoryId: { calculatorSlug: assoc.calculatorSlug, categoryId: home.id } }
      });
      if (!existing) {
        await prisma.calculatorToCategory.update({
          where: { id: assoc.id },
          data: { categoryId: home.id },
        });
        console.log(`  Moved ${assoc.calculatorSlug} → home`);
      } else {
        await prisma.calculatorToCategory.delete({ where: { id: assoc.id } });
        console.log(`  ${assoc.calculatorSlug} already in home, removed duplicate`);
      }
    }
    await prisma.calculatorCategory.delete({ where: { id: homeConstruction.id } });
    console.log("  ✅ Deleted home-construction category");
  } else if (homeConstruction && !home) {
    console.log("\n🔄 Renaming home-construction → home...");
    await prisma.calculatorCategory.update({
      where: { id: homeConstruction.id },
      data: { slug: "home", nameEn: "Home & Construction" },
    });
    console.log("  ✅ Renamed");
  }

  // ── 2. Delete categories not in the valid set ──
  const VALID_SLUGS = ["finance", "health", "math", "everyday", "technology", "conversion", "home", "drafts"];
  
  const currentCats = await prisma.calculatorCategory.findMany({
    include: { calculators: true }
  });

  let drafts = currentCats.find(c => c.slug === "drafts");
  if (!drafts) {
    drafts = await prisma.calculatorCategory.create({
      data: { slug: "drafts", nameEn: "Drafts", color: "gray", sortOrder: 99, isActive: false, showInMenu: false, showInHome: false },
    });
    console.log("\n📁 Created drafts category");
  }

  for (const cat of currentCats) {
    if (!VALID_SLUGS.includes(cat.slug)) {
      console.log(`\n🗑️  Removing orphan category: ${cat.slug} (${cat.nameEn}, ${cat.calculators.length} calcs)`);
      
      for (const assoc of cat.calculators) {
        const existing = await prisma.calculatorToCategory.findUnique({
          where: { calculatorSlug_categoryId: { calculatorSlug: assoc.calculatorSlug, categoryId: drafts.id } }
        });
        if (!existing) {
          await prisma.calculatorToCategory.update({
            where: { id: assoc.id },
            data: { categoryId: drafts.id },
          });
          console.log(`  Moved ${assoc.calculatorSlug} → drafts`);
        } else {
          await prisma.calculatorToCategory.delete({ where: { id: assoc.id } });
          console.log(`  ${assoc.calculatorSlug} already in drafts, removed duplicate`);
        }
      }
      
      await prisma.calculatorCategory.delete({ where: { id: cat.id } });
      console.log(`  ✅ Deleted ${cat.slug}`);
    }
  }

  // ── 3. Fix sort orders ──
  console.log("\n📋 Fixing sort orders...");
  const ORDER = { finance: 1, health: 2, math: 3, everyday: 4, technology: 5, conversion: 6, home: 7, drafts: 99 };

  for (const [slug, order] of Object.entries(ORDER)) {
    await prisma.calculatorCategory.updateMany({ where: { slug }, data: { sortOrder: order } });
  }
  console.log("  ✅ Sort orders fixed");

  // ── 4. Verify ──
  console.log("\n✅ Final categories:");
  const final = await prisma.calculatorCategory.findMany({ 
    orderBy: { sortOrder: "asc" },
    include: { calculators: true }
  });
  final.forEach(c => console.log(`  ${c.sortOrder}. ${c.slug} | ${c.nameEn} | calcs:${c.calculators.length}`));
  console.log(`\nTotal: ${final.length} categories`);
}

main()
  .catch(e => console.error("Error:", e))
  .finally(() => prisma.$disconnect());
