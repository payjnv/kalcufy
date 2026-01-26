'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function HistoryPage() {
  const locale = useLocale();
  const { data: session } = useSession();
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const user = {
    name: session?.user?.name || 'User',
    plan: 'FREE',
  };

  // Mock data - replace with real data from database
  const allCalculations = [
    { id: 1, name: 'Mortgage Calculator', result: '$2,022/mo', details: '$320,000 loan · 30 years · 6.5%', date: '2026-01-21', time: '2 days ago', icon: '🏠', color: 'bg-blue-500', category: 'finance' },
    { id: 2, name: 'BMI Calculator', result: '24.3', details: 'Height: 5\'10" · Weight: 170 lbs', date: '2026-01-19', time: '4 days ago', icon: '💪', color: 'bg-emerald-500', category: 'health' },
    { id: 3, name: 'Loan Calculator', result: '$307/mo', details: '$15,000 · 5 years · 8.5%', date: '2026-01-18', time: '5 days ago', icon: '💰', color: 'bg-violet-500', category: 'finance' },
    { id: 4, name: 'Calorie Calculator', result: '1,850 cal', details: 'Moderate activity · Lose weight', date: '2026-01-15', time: '1 week ago', icon: '🔥', color: 'bg-orange-500', category: 'health' },
    { id: 5, name: 'Compound Interest', result: '$15,234', details: '$10,000 · 5% · 10 years', date: '2026-01-14', time: '1 week ago', icon: '📈', color: 'bg-cyan-500', category: 'finance' },
    { id: 6, name: 'Auto Loan Calculator', result: '$625/mo', details: '$35,000 · 5 years · 5.9%', date: '2026-01-12', time: '1 week ago', icon: '🚗', color: 'bg-indigo-500', category: 'finance' },
    { id: 7, name: 'Retirement Calculator', result: '$1.2M', details: 'Age 30 · Retire 65 · $500/mo', date: '2026-01-10', time: '2 weeks ago', icon: '🏖️', color: 'bg-amber-500', category: 'finance' },
    { id: 8, name: 'Savings Calculator', result: '$52,000', details: '$400/mo · 4% · 10 years', date: '2026-01-08', time: '2 weeks ago', icon: '🐷', color: 'bg-pink-500', category: 'finance' },
  ];

  const filteredCalculations = allCalculations.filter(calc => {
    const matchesFilter = filter === 'all' || calc.category === filter;
    const matchesSearch = calc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          calc.details.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Link 
                href={`/${locale}/dashboard`}
                className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Dashboard
              </Link>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Calculation History</h1>
                <p className="text-gray-500 mt-1">View and manage all your past calculations</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-500">{filteredCalculations.length} calculations</span>
              </div>
            </div>
          </div>

          {/* Filters & Search */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search calculations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Filter Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-4 py-2.5 rounded-lg font-medium text-sm transition-colors ${
                    filter === 'all' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilter('finance')}
                  className={`px-4 py-2.5 rounded-lg font-medium text-sm transition-colors ${
                    filter === 'finance' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  💰 Finance
                </button>
                <button
                  onClick={() => setFilter('health')}
                  className={`px-4 py-2.5 rounded-lg font-medium text-sm transition-colors ${
                    filter === 'health' 
                      ? 'bg-emerald-600 text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  💪 Health
                </button>
              </div>

              {/* Export Button (PRO) */}
              <button className="px-4 py-2.5 bg-gray-100 text-gray-400 rounded-lg font-medium text-sm cursor-not-allowed flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Export
                <span className="text-xs font-semibold text-amber-600 bg-amber-100 px-1.5 py-0.5 rounded">PRO</span>
              </button>
            </div>
          </div>

          {/* History List */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {filteredCalculations.length > 0 ? (
              <div className="divide-y divide-gray-50">
                {filteredCalculations.map((calc) => (
                  <div key={calc.id} className="p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 ${calc.color} rounded-xl flex items-center justify-center text-white text-xl`}>
                        {calc.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-gray-900">{calc.name}</p>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            calc.category === 'finance' ? 'bg-blue-100 text-blue-600' : 'bg-emerald-100 text-emerald-700'
                          }`}>
                            {calc.category}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 truncate mt-0.5">{calc.details}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900 text-lg">{calc.result}</p>
                        <p className="text-xs text-gray-400">{calc.time}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="View details">
                          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                        <button className="p-2 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                          <svg className="w-5 h-5 text-gray-400 hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">No calculations found</h3>
                <p className="text-gray-500 mb-4">Try adjusting your search or filter</p>
                <button 
                  onClick={() => { setFilter('all'); setSearchTerm(''); }}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>

          {/* Free Plan Limit Notice */}
          {user.plan === 'FREE' && (
            <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-amber-800">Free plan only saves your last 10 calculations</p>
                  <p className="text-sm text-amber-600">Upgrade to PRO for unlimited history and export features</p>
                </div>
                <Link 
                  href={`/${locale}/pricing`}
                  className="px-4 py-2 bg-amber-500 text-white rounded-lg font-medium text-sm hover:bg-amber-600 transition-colors whitespace-nowrap"
                >
                  Upgrade Now
                </Link>
              </div>
            </div>
          )}

          {/* Upgrade Banner */}
          <div className="mt-6 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-lg mb-1">Unlock Unlimited History</h3>
                <p className="text-blue-100 text-sm">Export to PDF/Excel, no ads, and priority support</p>
              </div>
              <Link 
                href={`/${locale}/pricing`}
                className="px-5 py-2.5 bg-white text-blue-600 rounded-lg font-semibold text-sm hover:bg-blue-50 transition-colors whitespace-nowrap"
              >
                View Plans
              </Link>
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
}
