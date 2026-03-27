import { config } from '../src/calculators/bmi/index';
const t = (config as any)?.t?.en;
console.log('KEYS:', Object.keys(config || {}));
console.log('T.EN KEYS:', t ? Object.keys(t) : 'none');
console.log('FAQS:', t?.faqs?.length || 0);
console.log('EDUCATION:', (config as any)?.educationSections?.length || 0);
console.log('EXAMPLES:', !!t?.examples);
console.log('SOURCES:', !!t?.sources);
