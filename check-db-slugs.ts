import { PrismaClient } from '@prisma/client';
const p = new PrismaClient();
async function main() {
  const rows = await p.calculatorStatus.findMany({ where: { isActive: true }, select: { slug: true } });
  const slugs = rows.map(r => r.slug).sort();
  const missing = ['investment','inflation','retirement','interest','income-tax','paycheck','savings','budget','net-worth','rent-vs-buy','simple-interest'];
  for (const m of missing) {
    const found = slugs.filter(s => s.includes(m));
    console.log(m + ' → DB has: ' + (found.length ? found.join(', ') : 'NONE'));
  }
  await p.$disconnect();
}
main();
