"use client";

/**
 * SourcesSectionV4 - Sección de fuentes y referencias
 * Diseño idéntico a V3, lee datos directamente
 */

interface Reference {
  authors: string;
  title: string;
  source: string;
  year?: string;
  url?: string;
}

interface SourcesSectionV4Props {
  title: string;
  references: Reference[];
}

export default function SourcesSectionV4({ 
  title, 
  references 
}: SourcesSectionV4Props) {
  if (!references || references.length === 0) return null;

  return (
    <div 
      className="bg-white rounded-2xl border border-slate-200 p-6"
      role="region"
      aria-labelledby="sources-section"
    >
      <h3 
        id="sources-section"
        className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2"
      >
        <span aria-hidden="true">📚</span>
        {title}
      </h3>
      <ol className="space-y-4" role="list">
        {references.map((ref, index) => (
          <li key={index} className="flex gap-3 text-sm">
            <span 
              className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold"
              aria-hidden="true"
            >
              {index + 1}
            </span>
            <div className="flex-1">
              <p className="text-slate-600">
                <span className="font-medium text-slate-800">{ref.authors}</span>
                {ref.year && <span className="text-slate-500"> ({ref.year})</span>}
              </p>
              <p className="text-slate-800 font-medium mt-0.5">{ref.title}</p>
              <p className="text-slate-500 italic">{ref.source}</p>
              {ref.url && (
                <a 
                  href={ref.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 hover:underline text-xs mt-1"
                >
                  <span>View source</span>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
