import { PrismaClient } from '@prisma/client';
const p = new PrismaClient();
async function main() {
  const broken = await p.calculatorStatus.findMany({
    where: { slug: { endsWith: '-calculator-calculator' } },
    select: { id: true, slug: true }
  });
  console.log('Found ' + broken.length + ' broken slugs:');
  for (const row of broken) {
    const correct = row.slug.replace('-calculator-calculator', '-calculator');
    const exists = await p.calculatorStatus.findFirst({ where: { slug: correct } });
    if (exists) {
      console.log('  DELETE duplicate: ' + row.slug + ' (correct already exists)');
      await p.calculatorStatus.delete({ where: { id: row.id } });
    } else {
      console.log('  RENAME: ' + row.slug + ' → ' + correct);
      await p.calculatorStatus.update({ where: { id: row.id }, data: { slug: correct } });
    }
  }
  console.log('\nDone. Verifying...');
  const remaining = await p.calculatorStatus.count({ where: { slug: { endsWith: '-calculator-calculator' } } });
  const total = await p.calculatorStatus.count({ where: { isActive: true } });
  console.log('Remaining broken: ' + remaining);
  console.log('Total active: ' + total);
  await p.$disconnect();
}
main();
