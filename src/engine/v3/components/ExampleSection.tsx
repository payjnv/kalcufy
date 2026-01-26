"use client";

import type { TranslationFn } from "../types/engine.types";

interface Example {
  title: string;
  code?: string;
  steps?: string[];
  result?: string;
}

interface ExampleSectionProps {
  title: string;
  icon?: string;
  description?: string;
  examples: Example[];
  columns?: number;
  background?: "white" | "slate";
  t: TranslationFn;
}

export default function ExampleSection({
  title,
  icon,
  description,
  examples,
  columns = 2,
  background = "slate",
}: ExampleSectionProps) {
  if (!examples || examples.length === 0) return null;

  const bgClass = background === "slate" ? "bg-slate-50" : "bg-white";
  const gridCols = columns === 1 ? "grid-cols-1" : columns === 3 ? "md:grid-cols-3" : "md:grid-cols-2";

  return (
    <section className={"py-8 " + bgClass} aria-labelledby="example-title">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 id="example-title" className="text-xl font-bold text-slate-900 mb-2">
          {icon && <span className="mr-2">{icon}</span>}
          {title}
        </h2>
        {description && <p className="text-slate-600 mb-6">{description}</p>}
        
        <div className={"grid gap-6 " + gridCols}>
          {examples.map((example, index) => (
            <div key={index} className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="font-bold text-slate-900 mb-4">{example.title}</h3>
              <div className="text-sm text-slate-700 font-mono bg-slate-50 rounded-lg p-4 whitespace-pre-wrap">
                {example.code && <div>{example.code}</div>}
                {example.steps?.map((step, i) => (
                  <div key={i} className="mb-1">{step}</div>
                ))}
                {example.result && (
                  <div className="text-blue-600 font-semibold mt-3 pt-3 border-t border-slate-200">{example.result}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
