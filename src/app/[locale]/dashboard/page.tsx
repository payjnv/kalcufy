'use client';

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

// ============================================================================
// CALCULATOR METADATA
// ============================================================================
const calculatorMeta: Record<string, { icon: string; color: string; label: string }> = {
  'compound-interest-calculator': { icon: '📈', color: 'bg-cyan-500', label: 'Compound Interest' },
  'mortgage-calculator': { icon: '🏠', color: 'bg-blue-500', label: 'Mortgage' },
  'loan-calculator': { icon: '💰', color: 'bg-violet-500', label: 'Loan' },
  'auto-loan-calculator': { icon: '🚗', color: 'bg-indigo-500', label: 'Auto Loan' },
  'retirement-calculator': { icon: '🏖️', color: 'bg-amber-500', label: 'Retirement' },
  'savings-calculator': { icon: '🐷', color: 'bg-pink-500', label: 'Savings' },
  'credit-card-payoff-calculator': { icon: '💳', color: 'bg-red-500', label: 'Credit Card' },
  'bmi-calculator': { icon: '💪', color: 'bg-emerald-500', label: 'BMI' },
  'calorie-calculator': { icon: '🔥', color: 'bg-orange-500', label: 'Calorie' },
  'ideal-weight-calculator': { icon: '⚖️', color: 'bg-blue-500', label: 'Ideal Weight' },
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

// ============================================================================
// MAIN COMPONENT - WCAG 2.1 AA Compliant
// ============================================================================
export default function DashboardPage() {
  const locale = useLocale();
  const { data: session, status } = useSession();
  const [history, setHistory] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<any[]>([]);
  const [isPro, setIsPro] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    calculations: 0,
    saved: 0,
    favorites: 0,
    streak: 0,
  });

  const user = {
    name: session?.user?.name || 'User',
    email: session?.user?.email || 'user@example.com',
    image: session?.user?.image || null,
    plan: isPro ? 'PRO' : 'FREE',
    initials: (session?.user?.name || 'U').substring(0, 2).toUpperCase()
  };

  // Load data
  useEffect(() => {
    async function loadData() {
      if (status !== 'authenticated') {
        setLoading(false);
        return;
      }

      try {
        const historyRes = await fetch('/api/history');
        if (historyRes.ok) {
          const historyData = await historyRes.json();
          setHistory(historyData.history || []);
          setIsPro(historyData.isPro || false);
          setStats(prev => ({ 
            ...prev, 
            calculations: historyData.history?.length || 0,
            saved: historyData.history?.length || 0,
          }));
        }

        const favRes = await fetch('/api/favorites');
        if (favRes.ok) {
          const favData = await favRes.json();
          setFavorites(favData.favorites || []);
          setStats(prev => ({ ...prev, favorites: favData.favorites?.length || 0 }));
        }
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [status]);

  // Unauthenticated state
  if (status === 'unauthenticated') {
    return (
      <main id="main-content" className="min-h-screen bg-slate-50 pt-20 flex items-center justify-center">
        <div className="text-center px-4" role="alert">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Please sign in</h1>
          <p className="text-slate-600 mb-6">You need to be logged in to access your dashboard</p>
          <Link 
            href={`/${locale}/login`} 
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Sign In
          </Link>
        </div>
      </main>
    );
  }

  // Loading state
  if (status === 'loading') {
    return (
      <main id="main-content" className="min-h-screen bg-slate-50 pt-20 flex items-center justify-center">
        <div className="text-center" role="status" aria-live="polite">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading dashboard...</p>
        </div>
      </main>
    );
  }

  const statsDisplay = [
    { label: 'Total Calculations', value: String(stats.calculations), icon: '📊', color: 'bg-blue-500' },
    { label: 'Saved Results', value: String(stats.saved), icon: '💾', color: 'bg-violet-500' },
    { label: 'Favorites', value: String(stats.favorites), icon: '❤️', color: 'bg-rose-500' },
    { label: 'Day Streak', value: String(stats.streak), icon: '🔥', color: 'bg-orange-500' },
  ];

  return (
    <>
      {/* Skip Link - WCAG 2.4.1 */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-20 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg"
      >
        Skip to main content
      </a>

      <main id="main-content" className="min-h-screen bg-slate-50 pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Welcome Header */}
          <header className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
                  Welcome back, {user.name.split(' ')[0]}!
                </h1>
                <p className="text-slate-600 mt-1">Here's what's happening with your calculations</p>
              </div>
              <div className="flex items-center gap-3">
                {user.image ? (
                  <img 
                    src={user.image} 
                    alt="" 
                    className="w-12 h-12 rounded-full" 
                    aria-hidden="true"
                  />
                ) : (
                  <div 
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold"
                    aria-hidden="true"
                  >
                    {user.initials}
                  </div>
                )}
                <div className="text-right">
                  <p className="font-medium text-slate-900">{user.name}</p>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                    isPro ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-white' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {user.plan}
                  </span>
                </div>
              </div>
            </div>
          </header>

          {/* Stats Grid */}
          <section aria-labelledby="stats-heading" className="mb-8">
            <h2 id="stats-heading" className="sr-only">Your Statistics</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {statsDisplay.map((stat) => (
                <div 
                  key={stat.label} 
                  className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center text-white text-lg`}
                      aria-hidden="true"
                    >
                      {stat.icon}
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                      <p className="text-xs text-slate-600">{stat.label}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-6">
            
            {/* Recent Calculations - Left Column */}
            <div className="lg:col-span-2 space-y-6">
              <section 
                aria-labelledby="recent-heading"
                className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden"
              >
                <div className="flex items-center justify-between p-5 border-b border-slate-100">
                  <h2 id="recent-heading" className="font-semibold text-slate-900">Recent Calculations</h2>
                  <Link 
                    href={`/${locale}/dashboard/history`} 
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium focus:outline-none focus:underline"
                  >
                    View All <span aria-hidden="true">→</span>
                  </Link>
                </div>
                
                <div role="list" aria-label="Recent calculations">
                  {loading ? (
                    <div className="p-8 text-center" role="status" aria-live="polite">
                      <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                      <p className="text-slate-500">Loading calculations...</p>
                    </div>
                  ) : history.length > 0 ? (
                    <div className="divide-y divide-slate-50">
                      {history.slice(0, 4).map((calc) => {
                        const meta = calculatorMeta[calc.calculatorSlug] || { icon: '🔢', color: 'bg-slate-500', label: 'Calculator' };
                        const result = formatResult(calc.results);
                        const timeAgo = getTimeAgo(calc.createdAt);
                        
                        return (
                          <Link 
                            key={calc.id} 
                            href={`/${locale}/${calc.calculatorSlug}`}
                            className="block p-4 hover:bg-slate-50 transition-colors focus:outline-none focus:bg-blue-50 focus:ring-2 focus:ring-inset focus:ring-blue-500"
                            role="listitem"
                            aria-label={`${calc.calculatorName}: ${result}, calculated ${timeAgo}`}
                          >
                            <div className="flex items-center gap-4">
                              <div 
                                className={`w-10 h-10 ${meta.color} rounded-lg flex items-center justify-center text-white text-lg flex-shrink-0`}
                                aria-hidden="true"
                              >
                                {meta.icon}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-slate-900">{calc.calculatorName}</p>
                                <p className="text-sm text-slate-500 truncate">{formatInputs(calc.inputs)}</p>
                              </div>
                              <div className="text-right flex-shrink-0">
                                <p className="font-semibold text-slate-900">{result}</p>
                                <p className="text-xs text-slate-500">{timeAgo}</p>
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="p-8 text-center">
                      <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4" aria-hidden="true">
                        <span className="text-2xl">📊</span>
                      </div>
                      <p className="text-slate-600 mb-4">No calculations yet</p>
                      <Link 
                        href={`/${locale}/calculators`} 
                        className="text-blue-600 hover:text-blue-700 font-medium focus:outline-none focus:underline"
                      >
                        Try a calculator <span aria-hidden="true">→</span>
                      </Link>
                    </div>
                  )}
                </div>
              </section>

              {/* Upgrade Banner */}
              {!isPro && (
                <section 
                  aria-labelledby="upgrade-heading"
                  className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl p-6 text-white"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h2 id="upgrade-heading" className="font-semibold text-lg mb-1">Upgrade to PRO</h2>
                      <p className="text-blue-100 text-sm">Unlock unlimited history, PDF exports, and remove ads</p>
                    </div>
                    <Link 
                      href={`/${locale}/pricing`}
                      className="inline-block px-5 py-2.5 bg-white text-blue-600 rounded-lg font-semibold text-sm hover:bg-blue-50 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 whitespace-nowrap text-center"
                    >
                      View Plans
                    </Link>
                  </div>
                </section>
              )}
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              
              {/* Favorites */}
              <section 
                aria-labelledby="favorites-heading"
                className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden"
              >
                <div className="flex items-center justify-between p-5 border-b border-slate-100">
                  <h2 id="favorites-heading" className="font-semibold text-slate-900">Favorites</h2>
                  <span className="text-xs text-slate-500" aria-label={`${favorites.length} of ${isPro ? 'unlimited' : '5'} favorites used`}>
                    {favorites.length}/{isPro ? '∞' : '5'}
                  </span>
                </div>
                <nav aria-label="Favorite calculators" className="p-2">
                  {loading ? (
                    <div className="p-4 text-center" role="status" aria-live="polite">
                      <p className="text-slate-500">Loading...</p>
                    </div>
                  ) : favorites.length > 0 ? (
                    <ul role="list">
                      {favorites.map((fav) => {
                        const meta = calculatorMeta[fav.calculatorSlug] || { icon: '🔢', color: 'bg-slate-500', label: 'Calculator' };
                        return (
                          <li key={fav.id}>
                            <Link
                              href={`/${locale}/${fav.calculatorSlug}`}
                              className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors focus:outline-none focus:bg-blue-50 focus:ring-2 focus:ring-inset focus:ring-blue-500"
                            >
                              <span className="text-xl" aria-hidden="true">{meta.icon}</span>
                              <span className="font-medium text-slate-700">{fav.calculatorName}</span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <p className="p-4 text-center text-slate-500 text-sm">
                      No favorites yet. Add calculators to your favorites!
                    </p>
                  )}
                </nav>
                {!isPro && favorites.length >= 5 && (
                  <div className="p-3 bg-amber-50 border-t border-amber-100">
                    <p className="text-xs text-amber-800">
                      <span className="font-medium">Limit reached.</span>{' '}
                      <Link href={`/${locale}/pricing`} className="underline hover:no-underline focus:outline-none focus:ring-1 focus:ring-amber-600 rounded">
                        Upgrade
                      </Link>{' '}for unlimited.
                    </p>
                  </div>
                )}
              </section>

              {/* Quick Actions */}
              <section 
                aria-labelledby="actions-heading"
                className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden"
              >
                <div className="p-5 border-b border-slate-100">
                  <h2 id="actions-heading" className="font-semibold text-slate-900">Quick Actions</h2>
                </div>
                <nav aria-label="Quick actions" className="p-2">
                  <ul role="list" className="space-y-1">
                    <li>
                      <Link
                        href={`/${locale}/calculators`}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors focus:outline-none focus:bg-blue-50 focus:ring-2 focus:ring-inset focus:ring-blue-500"
                      >
                        <div className="w-9 h-9 bg-blue-100 rounded-lg flex items-center justify-center" aria-hidden="true">
                          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        </div>
                        <span className="font-medium text-slate-700">New Calculation</span>
                      </Link>
                    </li>
                    
                    <li>
                      <button 
                        disabled
                        aria-disabled="true"
                        className="w-full flex items-center gap-3 p-3 rounded-lg opacity-50 cursor-not-allowed"
                      >
                        <div className="w-9 h-9 bg-slate-100 rounded-lg flex items-center justify-center" aria-hidden="true">
                          <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                        </div>
                        <span className="font-medium text-slate-400">Export Data</span>
                        <span className="ml-auto text-xs font-semibold text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full">PRO</span>
                      </button>
                    </li>
                    
                    <li>
                      <Link
                        href={`/${locale}/profile`}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors focus:outline-none focus:bg-blue-50 focus:ring-2 focus:ring-inset focus:ring-blue-500"
                      >
                        <div className="w-9 h-9 bg-slate-100 rounded-lg flex items-center justify-center" aria-hidden="true">
                          <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                        <span className="font-medium text-slate-700">My Profile</span>
                      </Link>
                    </li>
                    
                    <li>
                      <button
                        onClick={() => signOut({ callbackUrl: `/${locale}` })}
                        className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-red-50 transition-colors text-red-600 focus:outline-none focus:bg-red-50 focus:ring-2 focus:ring-inset focus:ring-red-500"
                      >
                        <div className="w-9 h-9 bg-red-100 rounded-lg flex items-center justify-center" aria-hidden="true">
                          <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                        </div>
                        <span className="font-medium">Sign Out</span>
                      </button>
                    </li>
                  </ul>
                </nav>
              </section>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
