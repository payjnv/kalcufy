// ═══════════════════════════════════════════════════════════════════════════
// SEED: Add Mobile-Only Ad Slots (Omni Style)
// Run: npx ts-node scripts/add-mobile-ad-slots.ts
// ═══════════════════════════════════════════════════════════════════════════

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const MOBILE_AD_SLOTS = [
  {
    name: "calculator-mobile-top",
    location: "calculator-mobile-top",
    isActive: false,
    adCode: null,
  },
  {
    name: "calculator-mobile-bottom",
    location: "calculator-mobile-bottom",
    isActive: false,
    adCode: null,
  },
];

async function main() {
  console.log("🚀 Adding mobile ad slots...\n");

  for (const slot of MOBILE_AD_SLOTS) {
    try {
      const existing = await prisma.adSlot.findUnique({
        where: { name: slot.name },
      });

      if (existing) {
        console.log(`⏭️  Already exists: ${slot.name}`);
      } else {
        await prisma.adSlot.create({ data: slot });
        console.log(`✅ Created: ${slot.name}`);
      }
    } catch (error) {
      console.error(`❌ Error: ${slot.name}`, error);
    }
  }

  console.log("\n✨ Done! Go to Admin > Ads to configure.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
