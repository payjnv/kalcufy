'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PricingPage() {
  const t = useTranslations('pricing');
  const [isYearly, setIsYearly] = useState(false);

  const freeFeatures = t.raw('free.features') as string[];
  const proFeatures = t.raw('pro.features') as string[];

  const monthlyPrice = 2.99;
  const yearlyPrice = 1.99;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-50 pt-16">
        <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 py-20">
          <div className="container text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {t('title')}
            </h1>
            <p className="text-xl text-slate-300 mb-8">
              {t('subtitle')}
            </p>
            <div className="flex items-center justify-center gap-4">
              <span className={`text-lg ${!isYearly ? 'text-white font-semibold' : 'text-slate-400'}`}>
                {t('monthly')}
              </span>
              <button
                onClick={() => setIsYearly(!isYearly)}
                className={`relative w-14 h-7 rounded-full transition-colors ${isYearly ? 'bg-blue-500' : 'bg-slate-600'}`}
              >
                <span 
                  className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-200 ${isYearly ? 'translate-x-7' : 'translate-x-0'}`} 
                />
              </button>
              <span className={`text-lg ${isYearly ? 'text-white font-semibold' : 'text-slate-400'}`}>
                {t('yearly')}
              </span>
              {isYearly && (
                <span className="bg-blue-500 text-white text-sm font-semibold px-3 py-1 rounded-full">
                  {t('savePercent')}
                </span>
              )}
            </div>
          </div>
        </section>

        <section className="py-20 -mt-10">
          <div className="container">
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
                <h3 className="text-2xl font-bold text-slate-800 mb-2">{t('free.name')}</h3>
                <p className="text-slate-600 mb-6">{t('free.description')}</p>
                <div className="mb-6">
                  <span className="text-5xl font-bold text-slate-900">${t('free.price')}</span>
                  <span className="text-slate-600 ml-2">/{t('free.period')}</span>
                </div>
                <Link href="/register" className="block w-full py-3 px-6 text-center bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-xl transition-colors mb-8">
                  {t('free.cta')}
                </Link>
                <ul className="space-y-4">
                  {freeFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-slate-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl shadow-xl p-8 relative">
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-400 text-amber-900 text-sm font-bold px-4 py-1 rounded-full">
                  {t('pro.badge')}
                </span>
                <h3 className="text-2xl font-bold text-white mb-2">{t('pro.name')}</h3>
                <p className="text-blue-100 mb-6">{t('pro.description')}</p>
                <div className="mb-6">
                  <span className="text-5xl font-bold text-white">${isYearly ? yearlyPrice.toFixed(2) : monthlyPrice.toFixed(2)}</span>
                  <span className="text-blue-200 ml-2">/{t('pro.period')}</span>
                  {isYearly && <p className="text-blue-200 text-sm mt-1">Billed ${(yearlyPrice * 12).toFixed(2)}/year</p>}
                </div>
                <Link href="/register" className="block w-full py-3 px-6 text-center bg-white hover:bg-slate-100 text-blue-600 font-semibold rounded-xl transition-colors mb-8">
                  {t('pro.cta')}
                </Link>
                <ul className="space-y-4">
                  {proFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-blue-200 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-white">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-slate-800 mb-12">{t('faq.title')}</h2>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((num) => (
                  <details key={num} className="group bg-slate-50 rounded-xl">
                    <summary className="flex justify-between items-center cursor-pointer list-none p-6">
                      <span className="font-semibold text-slate-800">{t(`faq.q${num}`)}</span>
                      <svg className="w-5 h-5 text-slate-600 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <p className="px-6 pb-6 text-slate-600">{t(`faq.a${num}`)}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-r from-blue-600 to-cyan-600">
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to get started?</h2>
            <p className="text-xl text-blue-100 mb-8">Try PRO free for 7 days. No credit card required.</p>
            <Link href="/register" className="inline-block px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-slate-100 transition-all hover:scale-105">
              Start Free Trial
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
