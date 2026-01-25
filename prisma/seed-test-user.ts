import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await hash("test123", 12);
  
  const user = await prisma.user.upsert({
    where: { email: "test@kalcufy.com" },
    update: {},
    create: {
      email: "test@kalcufy.com",
      name: "Test User",
      password: hashedPassword,
      emailVerified: new Date(),
    },
  });

  console.log("✅ Test user created!");
  console.log("   Email: test@kalcufy.com");
  console.log("   Password: test123");
  console.log("   ID:", user.id);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
