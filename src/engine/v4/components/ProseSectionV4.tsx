"use client";

/**
 * ProseSectionV4 - Sección de texto educativo
 * Diseño idéntico a V3, lee traducciones directamente
 */

interface ProseSectionV4Props {
  sectionId: string;
  title: string;
  content: string;
  icon?: string;
}

export default function ProseSectionV4({ 
  sectionId, 
  title, 
  content, 
  icon 
}: ProseSectionV4Props) {
  return (
    <div 
      className="bg-white rounded-2xl border border-slate-200 p-6"
      role="region"
      aria-labelledby={`prose-${sectionId}`}
    >
      <h3 
        id={`prose-${sectionId}`}
        className="text-lg font-bold text-slate-900 mb-4"
      >
        {icon && <span aria-hidden="true">{icon} </span>}
        {title}
      </h3>
      <div className="prose prose-slate max-w-none">
        <p className="text-slate-600 leading-relaxed whitespace-pre-line">
          {content}
        </p>
      </div>
    </div>
  );
}
