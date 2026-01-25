import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding blog categories...");

  const categories = [
    {
      slug: "finance",
      nameEn: "Finance",
      nameEs: "Finanzas",
      namePt: "Finanças",
      icon: "💰",
      color: "blue",
      sortOrder: 1,
    },
    {
      slug: "health",
      nameEn: "Health",
      nameEs: "Salud",
      namePt: "Saúde",
      icon: "💪",
      color: "green",
      sortOrder: 2,
    },
    {
      slug: "tips",
      nameEn: "Tips",
      nameEs: "Consejos",
      namePt: "Dicas",
      icon: "💡",
      color: "amber",
      sortOrder: 3,
    },
    {
      slug: "news",
      nameEn: "News",
      nameEs: "Noticias",
      namePt: "Notícias",
      icon: "📰",
      color: "purple",
      sortOrder: 4,
    },
    {
      slug: "guides",
      nameEn: "Guides",
      nameEs: "Guías",
      namePt: "Guias",
      icon: "📚",
      color: "indigo",
      sortOrder: 5,
    },
  ];

  for (const category of categories) {
    await prisma.blogCategory.upsert({
      where: { slug: category.slug },
      update: category,
      create: category,
    });
    console.log(`  ✓ ${category.nameEn}`);
  }

  console.log("\n✅ Blog categories seeded successfully!");
}

main()
  .catch((e) => {
    console.error("Error seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
