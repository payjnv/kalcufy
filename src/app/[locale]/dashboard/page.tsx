'use client';

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Mapa de iconos y colores por calculadora
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
};

function getTimeAgo(date: string) {
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

function formatResult(results: any, calculatorSlug: string): string {
  if (!results) return '-';
  
  // Intentar extraer el resultado principal según el tipo de calculadora
  if (results.monthlyPayment) return `$${Number(results.monthlyPayment).toLocaleString()}/mo`;
  if (results.futureValue) return `$${Number(results.futureValue).toLocaleString()}`;
  if (results.totalAmount) return `$${Number(results.totalAmount).toLocaleString()}`;
  if (results.bmi) return `${results.bmi} BMI`;
  if (results.calories) return `${results.calories} cal`;
  if (results.dailyCalories) return `${results.dailyCalories} cal/day`;
  if (results.result) return results.result;
  
  // Fallback: mostrar el primer valor numérico
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

  // Cargar datos reales
  useEffect(() => {
    async function loadData() {
      if (status !== 'authenticated') {
        setLoading(false);
        return;
      }

      try {
        // Cargar historial
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

        // Cargar favoritos
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

  // Redirect si no está logueado
  if (status === 'unauthenticated') {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Please sign in</h1>
            <p className="text-gray-500 mb-6">You need to be logged in to access your dashboard</p>
            <Link href={`/${locale}/login`} className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">
              Sign In
            </Link>
          </div>
        </div>
        <Footer />
      </>
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
      <Header />
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Welcome Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Welcome back, {user.name.split(' ')[0]}!
                </h1>
                <p className="text-gray-500 mt-1">Here's what's happening with your calculations</p>
              </div>
              <div className="flex items-center gap-3">
                {user.image ? (
                  <img src={user.image} alt={user.name} className="w-12 h-12 rounded-full" />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-semibold">
                    {user.initials}
                  </div>
                )}
                <div className="hidden sm:block">
                  <p className="font-medium text-gray-900">{user.name}</p>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${isPro ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-600'}`}>
                      {user.plan}
                    </span>
                    {!isPro && (
                      <Link href={`/${locale}/pricing`} className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                        Upgrade →
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {statsDisplay.map((stat, index) => (
              <div key={index} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">{stat.icon}</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">{loading ? '-' : stat.value}</p>
                <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-6">
            
            {/* Recent Calculations - Left Column */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="flex items-center justify-between p-5 border-b border-gray-100">
                  <h2 className="font-semibold text-gray-900">Recent Calculations</h2>
                  <Link href={`/${locale}/dashboard/history`} className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                    View All →
                  </Link>
                </div>
                <div className="divide-y divide-gray-50">
                  {loading ? (
                    <div className="p-8 text-center text-gray-500">Loading...</div>
                  ) : history.length > 0 ? (
                    history.slice(0, 4).map((calc) => {
                      const meta = calculatorMeta[calc.calculatorSlug] || { icon: '🔢', color: 'bg-gray-500' };
                      return (
                        <Link 
                          key={calc.id} 
                          href={`/${locale}/${calc.calculatorSlug}`}
                          className="block p-4 hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 ${meta.color} rounded-lg flex items-center justify-center text-white text-lg`}>
                              {meta.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-gray-900">{calc.calculatorName}</p>
                              <p className="text-sm text-gray-500 truncate">{formatInputs(calc.inputs)}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-gray-900">{formatResult(calc.results, calc.calculatorSlug)}</p>
                              <p className="text-xs text-gray-400">{getTimeAgo(calc.createdAt)}</p>
                            </div>
                          </div>
                        </Link>
                      );
                    })
                  ) : (
                    <div className="p-8 text-center">
                      <p className="text-gray-500 mb-4">No calculations yet</p>
                      <Link href={`/${locale}/calculators`} className="text-blue-600 hover:text-blue-700 font-medium">
                        Try a calculator →
                      </Link>
                    </div>
                  )}
                </div>
              </div>

              {/* Upgrade Banner */}
              {!isPro && (
                <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Upgrade to PRO</h3>
                      <p className="text-blue-100 text-sm">Unlock unlimited history, PDF exports, and remove ads</p>
                    </div>
                    <Link 
                      href={`/${locale}/pricing`}
                      className="px-5 py-2.5 bg-white text-blue-600 rounded-lg font-semibold text-sm hover:bg-blue-50 transition-colors whitespace-nowrap"
                    >
                      View Plans
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              
              {/* Favorites */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="flex items-center justify-between p-5 border-b border-gray-100">
                  <h2 className="font-semibold text-gray-900">Favorites</h2>
                  <span className="text-xs text-gray-400">{favorites.length}/{isPro ? '∞' : '5'}</span>
                </div>
                <div className="p-2">
                  {loading ? (
                    <div className="p-4 text-center text-gray-500">Loading...</div>
                  ) : favorites.length > 0 ? (
                    favorites.map((fav) => {
                      const meta = calculatorMeta[fav.calculatorSlug] || { icon: '🔢', color: 'bg-gray-500' };
                      return (
                        <Link
                          key={fav.id}
                          href={`/${locale}/${fav.calculatorSlug}`}
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <span className="text-xl">{meta.icon}</span>
                          <span className="font-medium text-gray-700">{fav.calculatorName}</span>
                        </Link>
                      );
                    })
                  ) : (
                    <div className="p-4 text-center text-gray-500 text-sm">
                      No favorites yet. Add calculators to your favorites!
                    </div>
                  )}
                </div>
                {!isPro && favorites.length >= 5 && (
                  <div className="p-3 bg-amber-50 border-t border-amber-100">
                    <p className="text-xs text-amber-800">
                      <span className="font-medium">Limit reached.</span>{' '}
                      <Link href={`/${locale}/pricing`} className="underline">Upgrade</Link> for unlimited.
                    </p>
                  </div>
                )}
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-5 border-b border-gray-100">
                  <h2 className="font-semibold text-gray-900">Quick Actions</h2>
                </div>
                <div className="p-2">
                  <Link
                    href={`/${locale}/calculators`}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-9 h-9 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </div>
                    <span className="font-medium text-gray-700">New Calculation</span>
                  </Link>
                  
                  <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors opacity-50 cursor-not-allowed">
                    <div className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    </div>
                    <span className="font-medium text-gray-400">Export Data</span>
                    <span className="ml-auto text-xs font-semibold text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full">PRO</span>
                  </button>
                  
                  <Link
                    href={`/${locale}/profile`}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <span className="font-medium text-gray-700">My Profile</span>
                  </Link>
                  
                  <button
                    onClick={() => signOut({ callbackUrl: `/${locale}` })}
                    className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-red-50 transition-colors text-red-600"
                  >
                    <div className="w-9 h-9 bg-red-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                    </div>
                    <span className="font-medium">Sign Out</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
