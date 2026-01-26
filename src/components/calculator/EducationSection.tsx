'use client';

import { useState } from 'react';

interface Section {
  title: string;
  content: string;
}

interface EducationSectionProps {
  title?: string;
  sections?: Section[];
}

export function EducationSection({ title, sections }: EducationSectionProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
  
  const sectionTitle = title || 'Learn More';
  
  if (!sections || sections.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby="education-heading">
      <h2 id="education-heading" className="text-2xl font-bold text-slate-900 mb-6">
        {sectionTitle}
      </h2>
      
      <div className="space-y-3">
        {sections.map((section, index) => (
          <div
            key={index}
            className="border border-slate-200 rounded-xl overflow-hidden"
          >
            <button
              onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50 transition-colors"
              aria-expanded={expandedIndex === index}
            >
              <span className="font-medium text-slate-900">
                {section.title}
              </span>
              <svg
                className={`w-5 h-5 text-slate-500 transition-transform ${
                  expandedIndex === index ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            
            {expandedIndex === index && (
              <div className="px-4 pb-4 text-slate-600">
                <p>{section.content}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default EducationSection;
