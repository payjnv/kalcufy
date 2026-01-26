"use client";

import { useState } from "react";
import type { FAQ, TranslationFn } from "../types/engine.types";

interface FAQAccordionProps {
  faqs: FAQ[];
  t: TranslationFn;
  calculatorSlug?: string;
}

export default function FAQAccordion({ faqs, t, calculatorSlug }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Generate JSON-LD for SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <section aria-labelledby="faq-title" className="bg-white rounded-2xl border border-slate-200 p-6">
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <h2 id="faq-title" className="text-xl font-bold text-slate-900 mb-6">
        {t("faq.title", "Frequently Asked Questions")}
      </h2>

      <div className="space-y-3" role="region" aria-label={t("faq.title", "Frequently Asked Questions")}>
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          const buttonId = `faq-button-${calculatorSlug}-${index}`;
          const panelId = `faq-panel-${calculatorSlug}-${index}`;

          return (
            <div key={index} className="border border-slate-200 rounded-xl">
              <h3>
                <button
                  id={buttonId}
                  type="button"
                  onClick={() => toggle(index)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggle(index);
                    }
                  }}
                  className="w-full flex items-center justify-between p-4 text-left bg-white hover:bg-slate-50 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                >
                  <span className="font-semibold text-slate-900 pr-4">{faq.question}</span>
                  <svg
                    className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </h3>
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                hidden={!isOpen}
                className={isOpen ? "px-4 pb-4" : ""}
              >
                {isOpen && (
                  <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
