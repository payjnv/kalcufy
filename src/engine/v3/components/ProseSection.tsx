"use client";

import type { TranslationFn } from "../types/engine.types";

interface ProseSectionProps {
  title: string;
  content: string;
  t: TranslationFn;
}

export default function ProseSection({ title, content, t }: ProseSectionProps) {
  const sectionId = `prose-${title.toLowerCase().replace(/\s+/g, '-')}`;
  
  return (
    <article aria-labelledby={sectionId}>
      <h2 id={sectionId} className="text-xl font-bold text-slate-900 mb-4">{title}</h2>
      <div className="prose prose-slate max-w-none">
        <p className="text-slate-600 leading-relaxed">{content}</p>
      </div>
    </article>
  );
}
