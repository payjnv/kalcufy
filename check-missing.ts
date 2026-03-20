import { PrismaClient } from '@prisma/client';
import { SLUG_REGISTRY } from './src/engine/v4/slugs/registry';

const p = new PrismaClient();

async function main() {
  const rows = await p.calculatorStatus.findMany({ where: { isActive: true }, select: { slug: true } });
  const dbSlugs = new Set(rows.map(r => r.slug));
  
  let missing = 0;
  for (const e of SLUG_REGISTRY) {
    if (e.category === 'drafts') continue;
    const enSlug = e.slugs?.en;
    if (enSlug && !dbSlugs.has(enSlug)) {
      console.log('MISSING: ' + enSlug);
      missing++;
    }
  }
  console.log('\nMissing: ' + missing);
  console.log('DB active: ' + dbSlugs.size);
  console.log('Registry non-draft: ' + SLUG_REGISTRY.filter(e => e.category !== 'drafts').length);
  await p.$disconnect();
}
main();
