'use client';

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

// ============================================================================
// CALCULATOR METADATA
// ============================================================================
const calculatorMeta: Record<string, { icon: string; color: string }> = {
  'compound-interest-calculator': { icon: '📈', color: 'bg-cyan-500' },
  'mortgage-calculator': { icon: '🏠', color: 'bg-blue-500' },
  'loan-calculator': { icon: '💰', color: 'bg-violet-500' },
  'auto-loan-calculator': { icon: '🚗', color: 'bg-indigo-500' },
  'retirement-calculator': { icon: '🏖️', color: 'bg-amber-500' },
  'savings-calculator': { icon: '🐷', color: 'bg-pink-500' },
  'credit-card-payoff-calculator': { icon: '💳', color: 'bg-red-500' },
  'bmi-calculator': { icon: '💪', color: 'bg-emerald-500' },
  'calorie-calculator': { icon: '🔥', color: 'bg-orange-500' },
  'ideal-weight-calculator': { icon: '⚖️', color: 'bg-blue-500' },
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================
function getTimeAgo(date: string): string {
  const now = new Date();
  const past = new Date(date);
  const diffMs = now.getTime() - past.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} min ago`;
  if (diffHours < 24) return `${diffHours} hours ago`;
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  return `${Math.floor(diffDays / 30)} months ago`;
}

function formatResult(results: any): string {
  if (!results) return '-';
  
  if (results.monthlyPayment) return `$${Number(results.monthlyPayment).toLocaleString()}/mo`;
  if (results.futureValue) return `$${Number(results.futureValue).toLocaleString()}`;
  if (results.totalAmount) return `$${Number(results.totalAmount).toLocaleString()}`;
  if (results.averageIdealWeight) return results.averageIdealWeight;
  if (results.bmi) return `${results.bmi} BMI`;
  if (results.calories) return `${results.calories} cal`;
  if (results.dailyCalories) return `${results.dailyCalories} cal/day`;
  if (results.result) return results.result;
  
  const firstValue = Object.values(results)[0];
  if (typeof firstValue === 'number') {
    return firstValue > 100 ? `$${firstValue.toLocaleString()}` : String(firstValue);
  }
  return String(firstValue || '-');
}

function formatInputs(inputs: any): string {
  if (!inputs) return '';
  const parts = Object.entries(inputs)
    .slice(0, 3)
    .map(([key, value]) => {
      const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
      return `${label}: ${value}`;
    });
  return parts.join(' · ');
}

function getCategoryFromSlug(slug: string): 'finance' | 'health' {
  const healthCalcs = ['bmi-calculator', 'calorie-calculator', 'ideal-weight-calculator', 'body-fat-calculator'];
  return healthCalcs.includes(slug) ? 'health' : 'finance';
}

// ============================================================================
// MAIN COMPONENT - WCAG 2.1 AA Compliant
// ============================================================================
export default function HistoryPage() {
  const locale = useLocale();
  const { data: session, status } = useSession();
  const [history, setHistory] = useState<any[]>([]);
  const [isPro, setIsPro] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'finance' | 'health'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Load history data
  useEffect(() => {
    async function loadHistory() {
      if (status !== 'authenticated') {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch('/api/history');
        if (res.ok) {
          const data = await res.json();
          setHistory(data.history || []);
          setIsPro(data.isPro || false);
        }
      } catch (error) {
        console.error('Error loading history:', error);
      } finally {
        setLoading(false);
      }
    }

    loadHistory();
  }, [status]);

  // Delete calculation
  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/history?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setHistory(prev => prev.filter(calc => calc.id !== id));
        setDeleteId(null);
      }
    } catch (error) {
      console.error('Error deleting:', error);
    }
  };

  // Filter calculations
  const filteredCalculations = history.filter(calc => {
    const category = getCategoryFromSlug(calc.calculatorSlug);
    const matchesFilter = filter === 'all' || category === filter;
    const matchesSearch = calc.calculatorName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          formatInputs(calc.inputs)?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Unauthenticated
  if (status === 'unauthenticated') {
    return (
      <main id="main-content" className="min-h-screen bg-slate-50 pt-20 flex items-center justify-center">
        <div className="text-center px-4" role="alert">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Please sign in</h1>
          <p className="text-slate-600 mb-6">You need to be logged in to view your history</p>
          <Link 
            href={`/${locale}/login`} 
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Sign In
          </Link>
        </div>
      </main>
    );
  }

  return (
    <>
      {/* Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-20 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg"
      >
        Skip to main content
      </a>

      <main id="main-content" className="min-h-screen bg-slate-50 pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Page Header */}
          <header className="mb-8">
            <nav aria-label="Breadcrumb" className="mb-4">
              <Link 
                href={`/${locale}/dashboard`}
                className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors focus:outline-none focus:text-blue-600 focus:underline"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Dashboard
              </Link>
            </nav>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Calculation History</h1>
                <p className="text-slate-600 mt-1">View and manage all your past calculations</p>
              </div>
              <p className="text-sm text-slate-500" aria-live="polite">
                {filteredCalculations.length} calculation{filteredCalculations.length !== 1 ? 's' : ''}
              </p>
            </div>
          </header>

          {/* Filters & Search */}
          <section aria-label="Filters" className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <label htmlFor="search-calculations" className="sr-only">Search calculations</label>
                <div className="relative">
                  <svg 
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    id="search-calculations"
                    type="search"
                    placeholder="Search calculations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Filter Buttons */}
              <div role="group" aria-label="Filter by category" className="flex gap-2">
                <button
                  onClick={() => setFilter('all')}
                  aria-pressed={filter === 'all'}
                  className={`px-4 py-2.5 rounded-lg font-medium text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    filter === 'all' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilter('finance')}
                  aria-pressed={filter === 'finance'}
                  className={`px-4 py-2.5 rounded-lg font-medium text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    filter === 'finance' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <span aria-hidden="true">💰 </span>Finance
                </button>
                <button
                  onClick={() => setFilter('health')}
                  aria-pressed={filter === 'health'}
                  className={`px-4 py-2.5 rounded-lg font-medium text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 ${
                    filter === 'health' 
                      ? 'bg-emerald-600 text-white' 
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <span aria-hidden="true">💪 </span>Health
                </button>
              </div>

              {/* Export Button */}
              <button 
                disabled
                aria-disabled="true"
                className="px-4 py-2.5 bg-slate-100 text-slate-400 rounded-lg font-medium text-sm cursor-not-allowed flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Export
                <span className="text-xs font-semibold text-amber-600 bg-amber-100 px-1.5 py-0.5 rounded">PRO</span>
              </button>
            </div>
          </section>

          {/* History List */}
          <section aria-labelledby="history-heading" className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <h2 id="history-heading" className="sr-only">Calculation history list</h2>
            
            {loading ? (
              <div className="p-12 text-center" role="status" aria-live="polite">
                <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-slate-600">Loading history...</p>
              </div>
            ) : filteredCalculations.length > 0 ? (
              <ul role="list" className="divide-y divide-slate-100">
                {filteredCalculations.map((calc) => {
                  const meta = calculatorMeta[calc.calculatorSlug] || { icon: '🔢', color: 'bg-slate-500' };
                  const category = getCategoryFromSlug(calc.calculatorSlug);
                  const result = formatResult(calc.results);
                  const timeAgo = getTimeAgo(calc.createdAt);
                  
                  return (
                    <li key={calc.id} className="p-4 hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-4">
                        <Link
                          href={`/${locale}/${calc.calculatorSlug}`}
                          className="flex items-center gap-4 flex-1 min-w-0 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg"
                          aria-label={`${calc.calculatorName}: ${result}, calculated ${timeAgo}. Click to open calculator.`}
                        >
                          <div 
                            className={`w-12 h-12 ${meta.color} rounded-xl flex items-center justify-center text-white text-xl flex-shrink-0`}
                            aria-hidden="true"
                          >
                            {meta.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <p className="font-semibold text-slate-900">{calc.calculatorName}</p>
                              <span className={`text-xs px-2 py-0.5 rounded-full ${
                                category === 'finance' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'
                              }`}>
                                {category}
                              </span>
                            </div>
                            <p className="text-sm text-slate-500 truncate mt-0.5">{formatInputs(calc.inputs)}</p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <p className="font-bold text-slate-900 text-lg">{result}</p>
                            <p className="text-xs text-slate-500">{timeAgo}</p>
                          </div>
                        </Link>
                        
                        {/* Actions */}
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <Link
                            href={`/${locale}/${calc.calculatorSlug}`}
                            className="p-2 hover:bg-slate-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                            aria-label={`View ${calc.calculatorName} details`}
                          >
                            <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </Link>
                          <button 
                            onClick={() => setDeleteId(calc.id)}
                            className="p-2 hover:bg-red-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
                            aria-label={`Delete ${calc.calculatorName} calculation`}
                          >
                            <svg className="w-5 h-5 text-slate-400 hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <div className="p-12 text-center">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4" aria-hidden="true">
                  <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-1">No calculations found</h3>
                <p className="text-slate-500 mb-4">
                  {searchTerm || filter !== 'all' 
                    ? 'Try adjusting your search or filter' 
                    : 'Start using calculators to build your history'}
                </p>
                {(searchTerm || filter !== 'all') && (
                  <button 
                    onClick={() => { setFilter('all'); setSearchTerm(''); }}
                    className="text-blue-600 hover:text-blue-700 font-medium focus:outline-none focus:underline"
                  >
                    Clear filters
                  </button>
                )}
              </div>
            )}
          </section>

          {/* Free Plan Notice */}
          {!isPro && history.length > 0 && (
            <section aria-labelledby="limit-notice" className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex items-start gap-3 flex-1">
                  <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0" aria-hidden="true">
                    <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div>
                    <h3 id="limit-notice" className="font-medium text-amber-800">Free plan only saves your last 10 calculations</h3>
                    <p className="text-sm text-amber-700">Upgrade to PRO for unlimited history and export features</p>
                  </div>
                </div>
                <Link 
                  href={`/${locale}/pricing`}
                  className="inline-block px-4 py-2 bg-amber-500 text-white rounded-lg font-medium text-sm hover:bg-amber-600 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 whitespace-nowrap text-center"
                >
                  Upgrade Now
                </Link>
              </div>
            </section>
          )}

          {/* Upgrade Banner */}
          <section aria-labelledby="upgrade-banner" className="mt-6 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl p-6 text-white">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h3 id="upgrade-banner" className="font-semibold text-lg mb-1">Unlock Unlimited History</h3>
                <p className="text-blue-100 text-sm">Export to PDF/Excel, no ads, and priority support</p>
              </div>
              <Link 
                href={`/${locale}/pricing`}
                className="inline-block px-5 py-2.5 bg-white text-blue-600 rounded-lg font-semibold text-sm hover:bg-blue-50 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 whitespace-nowrap text-center"
              >
                View Plans
              </Link>
            </div>
          </section>
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          role="dialog"
          aria-labelledby="delete-title"
          aria-describedby="delete-description"
          aria-modal="true"
        >
          <div className="bg-white rounded-2xl w-full max-w-md p-6">
            <h2 id="delete-title" className="text-lg font-semibold text-slate-900 mb-2">Delete Calculation?</h2>
            <p id="delete-description" className="text-slate-600 mb-6">This action cannot be undone. The calculation will be permanently removed from your history.</p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
