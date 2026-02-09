'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import Header from '@/components/Header';

export default function PricingPage() {
  const t = useTranslations('pricing');
  const locale = useLocale();
  const [isYearly, setIsYearly] = useState(false);

  const freeFeatures = t.raw('free.features') as string[];
  const proFeatures = t.raw('pro.features') as string[];

  const monthlyPrice = 2.99;
  const yearlyPrice = 1.99;

  // WCAG: Generate unique IDs for FAQ items
  const faqItems = [1, 2, 3, 4].map((num) => ({
    id: `faq-${num}`,
    question: t(`faq.q${num}`),
    answer: t(`faq.a${num}`),
  }));

  return (
    <>
      {/* WCAG 2.4.1: Skip to main content link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Skip to main content
      </a>

      <Header />
      
      <main id="main-content" className="min-h-screen bg-slate-50 pt-16">
        {/* Hero Section */}
        <section 
          aria-labelledby="pricing-heading"
          className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 py-20"
        >
          <div className="container text-center">
            <h1 id="pricing-heading" className="text-4xl md:text-5xl font-bold text-white mb-4">
              {t('title')}
            </h1>
            <p className="text-xl text-slate-300 mb-8">
              {t('subtitle')}
            </p>
            
            {/* WCAG 4.1.2: Accessible billing toggle with role="switch" */}
            <div 
              className="flex items-center justify-center gap-4"
              role="group"
              aria-label="Select billing period"
            >
              <span 
                id="monthly-label"
                className={`text-lg ${!isYearly ? 'text-white font-semibold' : 'text-slate-400'}`}
              >
                {t('monthly')}
              </span>
              
              {/* WCAG: Toggle switch with proper role and states */}
              <button
                onClick={() => setIsYearly(!isYearly)}
                role="switch"
                aria-checked={isYearly}
                aria-labelledby="monthly-label yearly-label"
                className={`relative w-14 h-7 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-900 ${
                  isYearly ? 'bg-blue-500' : 'bg-slate-600'
                }`}
              >
                <span 
                  className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-200 ${
                    isYearly ? 'translate-x-7' : 'translate-x-0'
                  }`}
                  aria-hidden="true"
                />
                <span className="sr-only">
                  {isYearly ? 'Switch to monthly billing' : 'Switch to yearly billing'}
                </span>
              </button>
              
              <span 
                id="yearly-label"
                className={`text-lg ${isYearly ? 'text-white font-semibold' : 'text-slate-400'}`}
              >
                {t('yearly')}
              </span>
              
              {isYearly && (
                <span 
                  className="bg-blue-500 text-white text-sm font-semibold px-3 py-1 rounded-full"
                  role="status"
                  aria-live="polite"
                >
                  {t('savePercent')}
                </span>
              )}
            </div>
          </div>
        </section>

        {/* Pricing Cards Section */}
        <section 
          aria-labelledby="plans-heading"
          className="py-20 -mt-10"
        >
          <div className="container">
            <h2 id="plans-heading" className="sr-only">Available Plans</h2>
            
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
              {/* Free Plan Card */}
              <article 
                className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200"
                aria-labelledby="free-plan-heading"
              >
                <h3 id="free-plan-heading" className="text-2xl font-bold text-slate-800 mb-2">
                  {t('free.name')}
                </h3>
                <p className="text-slate-600 mb-6">{t('free.description')}</p>
                
                <div className="mb-6">
                  <span className="text-5xl font-bold text-slate-900">${t('free.price')}</span>
                  <span className="text-slate-600 ml-2">/{t('free.period')}</span>
                </div>
                
                <Link 
                  href={`/${locale}/register`}
                  className="block w-full py-3 px-6 text-center bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mb-8"
                  aria-label="Get Started with Free plan"
                >
                  {t('free.cta')}
                </Link>
                
                <ul className="space-y-4" role="list" aria-label="Free plan features">
                  {freeFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <svg 
                        className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-slate-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </article>

              {/* PRO Plan Card */}
              <article 
                className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl shadow-xl p-8 relative"
                aria-labelledby="pro-plan-heading"
              >
                <span 
                  className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-400 text-amber-900 text-sm font-bold px-4 py-1 rounded-full"
                  aria-label="Most popular plan"
                >
                  {t('pro.badge')}
                </span>
                
                <h3 id="pro-plan-heading" className="text-2xl font-bold text-white mb-2">
                  {t('pro.name')}
                </h3>
                <p className="text-blue-100 mb-6">{t('pro.description')}</p>
                
                <div className="mb-6">
                  <span className="text-5xl font-bold text-white">
                    ${isYearly ? yearlyPrice.toFixed(2) : monthlyPrice.toFixed(2)}
                  </span>
                  <span className="text-blue-200 ml-2">/{t('pro.period')}</span>
                  {isYearly && (
                    <p className="text-blue-200 text-sm mt-1">
                      Billed ${(yearlyPrice * 12).toFixed(2)}/year
                    </p>
                  )}
                </div>
                
                <Link 
                  href={`/${locale}/register`}
                  className="block w-full py-3 px-6 text-center bg-white hover:bg-slate-100 text-blue-600 font-semibold rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 mb-8"
                  aria-label="Start PRO plan trial"
                >
                  {t('pro.cta')}
                </Link>
                
                <ul className="space-y-4" role="list" aria-label="PRO plan features">
                  {proFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <svg 
                        className="w-5 h-5 text-blue-200 mt-0.5 flex-shrink-0" 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-white">{feature}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section 
          aria-labelledby="faq-heading"
          className="py-20 bg-white"
        >
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <h2 id="faq-heading" className="text-3xl font-bold text-center text-slate-800 mb-12">
                {t('faq.title')}
              </h2>
              
              {/* WCAG: FAQ with accessible details/summary */}
              <div className="space-y-4" role="list" aria-label="Frequently asked questions">
                {faqItems.map((faq) => (
                  <div key={faq.id} role="listitem">
                    <details className="group bg-slate-50 rounded-xl">
                      <summary 
                        className="flex justify-between items-center cursor-pointer list-none p-6 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset rounded-xl"
                        aria-controls={`${faq.id}-content`}
                      >
                        <span className="font-semibold text-slate-800 pr-4">
                          {faq.question}
                        </span>
                        <svg 
                          className="w-5 h-5 text-slate-600 group-open:rotate-180 transition-transform flex-shrink-0" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </summary>
                      <div id={`${faq.id}-content`}>
                        <p className="px-6 pb-6 text-slate-600">{faq.answer}</p>
                      </div>
                    </details>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section 
          aria-labelledby="cta-heading"
          className="py-20 bg-gradient-to-r from-blue-600 to-cyan-600"
        >
          <div className="container text-center">
            <h2 id="cta-heading" className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t("cta.title")}
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              {t("cta.subtitle")}
            </p>
            <Link 
              href={`/${locale}/register`}
              className="inline-block px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-slate-100 transition-colors motion-safe:hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
              aria-label="Start free 7-day PRO trial - no credit card required"
            >
              {t("cta.button")}
            </Link>
          </div>
        </section>
      </main>
      
      
    </>
  );
}
