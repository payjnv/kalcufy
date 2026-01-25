import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Delete unused calculator ad slots
  await prisma.adSlot.deleteMany({
    where: {
      location: {
        in: ["calculator-top", "calculator-between"]
      }
    }
  });

  console.log("Unused calculator ad slots removed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
