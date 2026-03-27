// Generate static sitemap XML files from sitemap-utils
const { execSync } = require('child_process');

// We need to run this as a TS script via tsx
const script = `
import { getStaticPagesSitemap, getCalculatorsSitemap, getBlogSitemap, getSitemapIndex } from '@/lib/sitemap-utils';
import * as fs from 'fs';
import * as path from 'path';

async function main() {
  const appDir = path.join(process.cwd(), 'src/app');
  
  console.log('Generating sitemap-pages.xml...');
  const pages = await getStaticPagesSitemap();
  fs.writeFileSync(path.join(appDir, 'sitemap-pages.xml', ), pages);
  console.log('  ✅ Done');

  console.log('Generating sitemap-calculators.xml...');
  const calcs = await getCalculatorsSitemap();
  fs.writeFileSync(path.join(appDir, 'sitemap-calculators.xml'), calcs);
  const calcCount = (calcs.match(/<url>/g) || []).length;
  console.log('  ✅ Done (' + calcCount + ' URLs)');

  console.log('Generating sitemap-blog.xml...');
  const blog = await getBlogSitemap();
  fs.writeFileSync(path.join(appDir, 'sitemap-blog.xml'), blog);
  const blogCount = (blog.match(/<url>/g) || []).length;
  console.log('  ✅ Done (' + blogCount + ' URLs)');

  console.log('Generating sitemap.xml (index)...');
  const index = getSitemapIndex();
  fs.writeFileSync(path.join(appDir, 'sitemap.xml'), index);
  console.log('  ✅ Done');

  // Verify hreflang
  const sample = calcs.substring(0, 2000);
  const langs = [...sample.matchAll(/hreflang="([^"]+)"/g)].map(m => m[1]);
  const unique = [...new Set(langs)];
  console.log('\\nHreflang check — languages found:', unique.join(', '));
  if (unique.length >= 5) {
    console.log('✅ All 5 languages present!');
  } else {
    console.log('❌ WARNING: Missing languages!');
  }
  
  process.exit(0);
}

main().catch(e => { console.error(e); process.exit(1); });
`;

require('fs').writeFileSync('/tmp/gen-sitemap.ts', script);
execSync('npx tsx /tmp/gen-sitemap.ts', { stdio: 'inherit', cwd: process.cwd(), env: { ...process.env } });
