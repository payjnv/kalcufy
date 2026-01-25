import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const adSlots = [
    { name: "Calculator Bottom", location: "calculator-bottom", isActive: false },
    { name: "Calculator Sidebar", location: "calculator-sidebar", isActive: false },
    { name: "Calculator Top", location: "calculator-top", isActive: false },
    { name: "Calculator Between Sections", location: "calculator-between", isActive: false },
  ];

  for (const slot of adSlots) {
    await prisma.adSlot.upsert({
      where: { name: slot.name },
      update: {},
      create: slot,
    });
  }

  console.log("Calculator ad slots created successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
