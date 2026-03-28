const fs = require('fs');
const files = { 'en.json': 'Years / Months', 'es.json': 'Años / Meses', 'pt.json': 'Anos / Meses', 'fr.json': 'Années / Mois', 'de.json': 'Jahre / Monate' };
for (const [f, name] of Object.entries(files)) {
  const p = 'messages/' + f;
  const d = JSON.parse(fs.readFileSync(p, 'utf-8'));
  if (!d.units) d.units = {};
  d.units.yrs_mos = { name };
  fs.writeFileSync(p, JSON.stringify(d, null, 2) + '\n');
  console.log('✅ ' + f);
}
