"use client";
import { useState } from "react";
/**
 * FAQAccordionV4 - Acordeón de preguntas frecuentes
 * JSON-LD schema is now handled by [...slug]/page.tsx server component
 */
interface FAQItem {
  question: string;
  answer: string;
}
interface FAQAccordionV4Props {
  title: string;
  faqs: FAQItem[];
  calculatorSlug: string;
  defaultOpenIndex?: number;
}
export default function FAQAccordionV4({ 
  title,
  faqs, 
  calculatorSlug,
  defaultOpenIndex = 0
}: FAQAccordionV4Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);
  if (!faqs || faqs.length === 0) return null;
  return (
    <div 
      className="bg-white rounded-2xl border border-slate-200 p-6"
      role="region"
      aria-labelledby="faq-section"
    >
      <h2 
        id="faq-section"
        className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2"
      >
        {title}
      </h2>

      <div className="space-y-3">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          const buttonId = `faq-btn-${calculatorSlug}-${index}`;
          const panelId = `faq-panel-${calculatorSlug}-${index}`;

          return (
            <div key={index} className="border border-slate-200 rounded-xl">
              <h3>
                <button
                  id={buttonId}
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setOpenIndex(isOpen ? null : index);
                    }
                  }}
                  className="w-full flex items-center justify-between p-4 text-left bg-white hover:bg-slate-50 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                >
                  <span className="font-semibold text-slate-900 pr-4">
                    {faq.question}
                  </span>
                  <svg
                    className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
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
    </div>
  );
}
