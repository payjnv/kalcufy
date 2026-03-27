import * as m from '../src/calculators/bmi/index';
const config = (m as any).bmiCalculatorConfig || (m as any).default;
const t = config.t.en;
console.log('=== FAQ STRUCTURE ===');
if (t.faqs) console.log(JSON.stringify(t.faqs[0], null, 2));
console.log('=== EDUCATION STRUCTURE ===');
if (config.educationSections) {
  const s = config.educationSections[0];
  console.log('type:', s.type);
  console.log('keys:', Object.keys(s));
  if (s.titleKey) console.log('titleKey:', s.titleKey);
  if (s.items) console.log('items[0] keys:', Object.keys(s.items[0]));
}
console.log('=== T.EN KEYS (all) ===');
console.log(Object.keys(t));
