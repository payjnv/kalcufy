"use client";

import type { TranslationFn } from "../types/engine.types";

interface Reference {
  authors: string;
  year: string;
  title: string;
  source: string;
  url?: string;
}

interface SourcesSectionProps {
  title: string;
  references: Reference[];
  t: TranslationFn;
}

export default function SourcesSection({ title, references, t }: SourcesSectionProps) {
  const sectionId = "sources-references";
  
  return (
    <section aria-labelledby={sectionId} className="mt-8">
      <h2 id={sectionId} className="text-xl font-bold text-slate-900 mb-4">{title}</h2>
      <ol className="space-y-4" role="list" aria-label={t("sources.referenceList", "Reference list")}>
        {references.map((ref, index) => (
          <li key={index} className="flex gap-3 text-sm">
            <span 
              className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-medium text-xs"
              aria-hidden="true"
            >
              {index + 1}
            </span>
            <div className="text-slate-600">
              <span className="sr-only">Reference {index + 1}: </span>
              <strong className="text-slate-800">{ref.authors} ({ref.year})</strong>
              <br />
              <span className="italic">&ldquo;{ref.title}&rdquo;</span>
              <br />
              <span className="text-slate-500">{ref.source}</span>
              {ref.url && (
                <>
                  {" "}
                  <a 
                    href={ref.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                    aria-label={`View source: ${ref.title} (opens in new tab)`}
                  >
                    View source
                    <span className="sr-only"> (opens in new tab)</span>
                  </a>
                </>
              )}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
