'use client';

import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs?: FAQItem[];
  title?: string;
  calculatorSlug?: string;
}

export function FAQSection({ faqs, title, calculatorSlug }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  
  // Default FAQs if none provided
  const defaultFaqs: FAQItem[] = [
    {
      question: 'How do I use this calculator?',
      answer: 'Enter your values in the input fields and the results will be calculated automatically.',
    },
    {
      question: 'Are the results accurate?',
      answer: 'Our calculators use standard formulas and provide accurate estimates. However, for important decisions, please consult a professional.',
    },
  ];
  
  const faqItems = faqs && faqs.length > 0 ? faqs : defaultFaqs;
  const sectionTitle = title || 'Frequently Asked Questions';

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Schema.org FAQ structured data
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <section className="py-8" aria-labelledby="faq-heading">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <h2 id="faq-heading" className="text-2xl font-bold text-slate-900 mb-6">
        {sectionTitle}
      </h2>
      
      <div className="space-y-3">
        {faqItems.map((faq, index) => (
          <div
            key={index}
            className="border border-slate-200 rounded-xl overflow-hidden"
          >
            <button
              onClick={() => toggleFaq(index)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50 transition-colors"
              aria-expanded={openIndex === index}
              aria-controls={`faq-answer-${index}`}
            >
              <span className="font-medium text-slate-900 pr-4">
                {faq.question}
              </span>
              <svg
                className={`w-5 h-5 text-slate-500 transition-transform flex-shrink-0 ${
                  openIndex === index ? 'rotate-180' : ''
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
            
            {openIndex === index && (
              <div
                id={`faq-answer-${index}`}
                className="px-4 pb-4 text-slate-600"
              >
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default FAQSection;
