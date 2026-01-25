import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const adSlots = [
    { name: "Blog Hero", location: "blog-hero", isActive: false },
    { name: "Blog Between Posts", location: "blog-between", isActive: false },
    { name: "Blog Sidebar", location: "blog-sidebar", isActive: false },
    { name: "Article Top", location: "article-top", isActive: false },
    { name: "Article Middle", location: "article-middle", isActive: false },
    { name: "Article Sidebar", location: "article-sidebar", isActive: false },
    { name: "Article Bottom", location: "article-bottom", isActive: false },
  ];

  for (const slot of adSlots) {
    await prisma.adSlot.upsert({
      where: { name: slot.name },
      update: {},
      create: slot,
    });
  }

  console.log("Ad slots created successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
