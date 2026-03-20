const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();
p.calculatorStatus.findMany({where:{isActive:true}, select:{slug:true}}).then(rows => {
  const dbSlugs = new Set(rows.map(r => r.slug));
  const reg = require('./src/engine/v4/slugs/registry');
  const entries = reg.SLUG_REGISTRY || reg.default;
  let missing = 0;
  for (const e of entries) {
    if (e.category === 'drafts') continue;
    const enSlug = e.slugs && e.slugs.en;
    if (enSlug && !dbSlugs.has(enSlug)) {
      console.log('MISSING: ' + enSlug + ' (category: ' + e.category + ')');
      missing++;
    }
  }
  console.log('\nTotal missing from sitemap: ' + missing);
  console.log('DB active: ' + dbSlugs.size);
  console.log('Registry (non-draft): ' + entries.filter(e => e.category !== 'drafts').length);
  p.$disconnect();
});
