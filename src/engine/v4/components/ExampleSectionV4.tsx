"use client";

/**
 * ExampleSectionV4 - Sección de ejemplos de cálculo
 * Diseño claro y profesional
 */

interface CodeExample {
  title: string;
  steps: string[];
  result: string;
}

interface ExampleSectionV4Props {
  sectionId: string;
  title: string;
  description?: string;
  examples: CodeExample[];
  icon?: string;
  columns?: 1 | 2 | 3;
  background?: 'white' | 'slate';
}

export default function ExampleSectionV4({ 
  sectionId,
  title, 
  description,
  examples, 
  icon,
  columns = 2,
  background = 'white'
}: ExampleSectionV4Props) {
  if (!examples || examples.length === 0) return null;

  const gridCols: Record<number, string> = {
    1: 'grid-cols-1',
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
  };

  return (
    <section 
      className="py-8"
      role="region"
      aria-labelledby={`examples-${sectionId}`}
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h3 
            id={`examples-${sectionId}`}
            className="text-lg font-bold text-slate-900 mb-2"
          >
            {icon && <span aria-hidden="true">{icon} </span>}
            {title}
          </h3>
          
          {description && (
            <p className="text-slate-600 mb-4">{description}</p>
          )}
          
          <div className={`grid ${gridCols[columns]} gap-4`}>
            {examples.map((example, index) => (
              <div 
                key={index} 
                className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-5"
              >
                <p className="text-blue-700 font-semibold mb-3 text-base flex items-center gap-2">
                  <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                    {index + 1}
                  </span>
                  {example.title}
                </p>
                <div className="space-y-2 mb-4">
                  {example.steps.map((step, i) => (
                    <p key={i} className="text-slate-700 text-sm leading-relaxed flex items-start gap-2">
                      <span className="text-blue-400 mt-1">→</span>
                      <span>{step}</span>
                    </p>
                  ))}
                </div>
                <div className="pt-3 border-t border-blue-200">
                  <p className="text-green-700 font-bold text-sm flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    {example.result}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
