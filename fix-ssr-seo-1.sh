#!/bin/bash
# ═══════════════════════════════════════════════════════════
# KALCUFY SSR SEO FIX
# Renders FAQs + Education in server component so Google sees them
# ═══════════════════════════════════════════════════════════
set -e
cd ~/Desktop/kalcufy

echo "═══ KALCUFY SSR SEO FIX ═══"
echo ""

# Backup
cp src/app/\[locale\]/\(calculators\)/\[...slug\]/page.tsx src/app/\[locale\]/\(calculators\)/\[...slug\]/page.tsx.bak
echo "✅ Backup created"

# ─── 1. Expand getCalcInfo to extract FAQs, education, sources ───
cat > /tmp/ssr-patch.ts << 'PATCH'

// --- SSR Content Component (renders FAQs + Education for Google) ---
function SSRContent({ faqs, educationTexts, sources }: {
  faqs: Array<{ question: string; answer: string }>;
  educationTexts: Array<{ title: string; content: string }>;
  sources: Array<{ label: string; url?: string }>;
}) {
  if (faqs.length === 0 && educationTexts.length === 0) return null;

  return (
    <div className="container mx-auto px-2 sm:px-4 max-w-6xl py-8">
      {/* Education Sections */}
      {educationTexts.length > 0 && (
        <div className="mb-8 space-y-6">
          {educationTexts.map((section, i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-200 p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-3">{section.title}</h2>
              <div className="text-slate-600 leading-relaxed whitespace-pre-line">{section.content}</div>
            </div>
          ))}
        </div>
      )}

      {/* FAQs */}
      {faqs.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200 p-5">
                <h3 className="font-semibold text-slate-900 mb-2">{faq.question}</h3>
                <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sources */}
      {sources.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-bold text-slate-900 mb-3">Sources</h2>
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-600">
            {sources.map((src, i) => (
              <li key={i}>
                {src.url ? <a href={src.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{src.label}</a> : src.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
PATCH

echo "✅ SSR component template created"

# ─── 2. Apply the changes to page.tsx using Node ───
cat > /tmp/apply-ssr-fix.ts << 'APPLYFIX'
import * as fs from 'fs';
import * as path from 'path';

const filePath = path.join(process.cwd(), 'src/app/[locale]/(calculators)/[...slug]/page.tsx');
let code = fs.readFileSync(filePath, 'utf-8');

// ─── A. Expand getCalcInfo to return faqs, education, sources ───
const oldGetCalcInfo = `async function getCalcInfo(entryId: string, locale: string) {
  let name = entryId
    .replace(/-/g, " ")
    .replace(/\\b\\w/g, (l: string) => l.toUpperCase());
  let subtitle = "";

  try {
    const mod = await import(\`@/calculators/\${entryId}/index\`);
    const config =
      mod.config ||
      mod.default ||
      Object.values(mod).find(
        (v: unknown): v is Record<string, unknown> =>
          v !== null &&
          typeof v === "object" &&
          "id" in (v as Record<string, unknown>)
      );
    if (config && typeof config === "object") {
      const c = config as Record<string, unknown>;
      const t = c.t as Record<string, Record<string, unknown>> | undefined;
      const localeT = t?.[locale] || t?.en;
      if (localeT) {
        name = (localeT.name as string) || name;
        subtitle = (localeT.subtitle as string) || "";
      }
    }
  } catch {}

  return { name, subtitle };
}`;

const newGetCalcInfo = `async function getCalcInfo(entryId: string, locale: string) {
  let name = entryId
    .replace(/-/g, " ")
    .replace(/\\b\\w/g, (l: string) => l.toUpperCase());
  let subtitle = "";
  let faqs: Array<{ question: string; answer: string }> = [];
  let educationTexts: Array<{ title: string; content: string }> = [];
  let sources: Array<{ label: string; url?: string }> = [];

  try {
    const mod = await import(\`@/calculators/\${entryId}/index\`);
    const config =
      mod.config ||
      mod.default ||
      Object.values(mod).find(
        (v: unknown): v is Record<string, unknown> =>
          v !== null &&
          typeof v === "object" &&
          "id" in (v as Record<string, unknown>)
      );
    if (config && typeof config === "object") {
      const c = config as Record<string, unknown>;
      const t = c.t as Record<string, Record<string, unknown>> | undefined;
      const localeT = t?.[locale] || t?.en;
      if (localeT) {
        name = (localeT.name as string) || name;
        subtitle = (localeT.subtitle as string) || "";

        // Extract FAQs for SSR
        const rawFaqs = localeT.faqs as Array<{ question: string; answer: string }> | undefined;
        if (Array.isArray(rawFaqs)) {
          faqs = rawFaqs.filter(f => f.question && f.answer);
        }

        // Extract education content for SSR
        const eduSections = (c as any).educationSections as Array<{ id: string; type: string }> | undefined;
        const eduTranslations = localeT.education as Record<string, { title?: string; content?: string; text?: string; items?: Array<{ title?: string; text?: string }> }> | undefined;
        if (Array.isArray(eduSections) && eduTranslations) {
          for (const section of eduSections) {
            const eduT = eduTranslations[section.id];
            if (eduT) {
              if (section.type === "prose" && eduT.title && (eduT.content || eduT.text)) {
                educationTexts.push({ title: eduT.title, content: (eduT.content || eduT.text) as string });
              } else if (section.type === "cards" && eduT.title && Array.isArray(eduT.items)) {
                const itemsText = eduT.items.map((it: any) => (it.title ? it.title + ": " : "") + (it.text || it.content || "")).join("\\n");
                if (itemsText) educationTexts.push({ title: eduT.title, content: itemsText });
              }
            }
          }
        }

        // Extract sources for SSR
        const rawSources = localeT.sources as Array<{ label: string; url?: string }> | undefined;
        if (Array.isArray(rawSources)) {
          sources = rawSources.filter(s => s.label);
        }
      }
    }
  } catch {}

  return { name, subtitle, faqs, educationTexts, sources };
}`;

if (code.includes(oldGetCalcInfo)) {
  code = code.replace(oldGetCalcInfo, newGetCalcInfo);
  console.log('✅ getCalcInfo expanded');
} else {
  console.log('⚠️  Could not find exact getCalcInfo match - trying partial');
  // Try replacing just the return line
  code = code.replace(
    /return \{ name, subtitle \};(\s*}\s*$)/m,
    'return { name, subtitle, faqs: [] as Array<{ question: string; answer: string }>, educationTexts: [] as Array<{ title: string; content: string }>, sources: [] as Array<{ label: string; url?: string }> };$1'
  );
}

// ─── B. Update destructuring to include new fields ───
code = code.replace(
  'const { name, subtitle } = await getCalcInfo(entry.id, locale);',
  'const { name, subtitle, faqs, educationTexts, sources } = await getCalcInfo(entry.id, locale);'
);
console.log('✅ Destructuring updated');

// ─── C. Add SSRContent component before the page component ───
const ssrComponent = `
// --- SSR Content: Rendered server-side so Google can index FAQs + Education ---
function SSRContent({ faqs, educationTexts, sources }: {
  faqs: Array<{ question: string; answer: string }>;
  educationTexts: Array<{ title: string; content: string }>;
  sources: Array<{ label: string; url?: string }>;
}) {
  if (faqs.length === 0 && educationTexts.length === 0) return null;
  return (
    <div className="container mx-auto px-2 sm:px-4 max-w-6xl py-8">
      {educationTexts.length > 0 && (
        <div className="mb-8 space-y-6">
          {educationTexts.map((section, i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-200 p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-3">{section.title}</h2>
              <div className="text-slate-600 leading-relaxed whitespace-pre-line">{section.content}</div>
            </div>
          ))}
        </div>
      )}
      {faqs.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200 p-5">
                <h3 className="font-semibold text-slate-900 mb-2">{faq.question}</h3>
                <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      {sources.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-bold text-slate-900 mb-3">Sources</h2>
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-600">
            {sources.map((src, i) => (
              <li key={i}>
                {src.url ? <a href={src.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{src.label}</a> : src.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
`;

// Insert SSRContent before the page component
code = code.replace(
  '// --- Page component ---',
  ssrComponent + '\n// --- Page component ---'
);
console.log('✅ SSRContent component added');

// ─── D. Add SSRContent rendering after CalculatorClient ───
code = code.replace(
  '      <CalculatorClient calcId={entry.id} locale={locale} />',
  `      <CalculatorClient calcId={entry.id} locale={locale} />

      {/* Server-rendered SEO content — Google sees this immediately */}
      <SSRContent faqs={faqs} educationTexts={educationTexts} sources={sources} />`
);
console.log('✅ SSRContent rendering added to JSX');

fs.writeFileSync(filePath, code);
console.log('');
console.log('✅ page.tsx updated successfully!');
APPLYFIX

npx tsx /tmp/apply-ssr-fix.ts

echo ""
echo "═══ TESTING ═══"
echo "Now restart dev server: rm -rf .next && npm run dev"
echo "Then test: curl -s http://localhost:3000/en/bmi-calculator | grep -c 'FAQ\|Frequently\|What is.*BMI\|Sources'"
echo ""
echo "═══ DONE ═══"
