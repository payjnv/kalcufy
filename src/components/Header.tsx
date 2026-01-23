"use client";

import Link from 'next/link';
import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';

export default function Header() {
  const { data: session, status } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const user = session?.user;
  const initials = user?.name?.substring(0, 2).toUpperCase() || 'U';

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-slate-200 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">K</span>
            </div>
            <span className="text-xl font-bold text-slate-900">Kalcufy</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link 
              href="/en/calculators" 
              className="text-slate-600 hover:text-blue-600 font-medium transition-colors"
            >
              Calculators
            </Link>
            <Link 
              href="/pricing" 
              className="text-slate-600 hover:text-blue-600 font-medium transition-colors"
            >
              Pricing
            </Link>
            <Link 
              href="/blog" 
              className="text-slate-600 hover:text-blue-600 font-medium transition-colors"
            >
              Blog
            </Link>
            <Link 
              href="/about" 
              className="text-slate-600 hover:text-blue-600 font-medium transition-colors"
            >
              About
            </Link>
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {/* User Menu or Login/Signup */}
            {status === 'loading' ? (
              <div className="w-8 h-8 rounded-full bg-slate-200 animate-pulse" />
            ) : session ? (
              /* Logged In - Show User Menu */
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 p-1 rounded-full hover:bg-slate-100 transition-colors"
                >
                  {user?.image ? (
                    <img src={user.image} alt={user.name || ''} className="w-9 h-9 rounded-full" />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-semibold text-sm">
                      {initials}
                    </div>
                  )}
                  <span className="hidden sm:block font-medium text-slate-700 max-w-[120px] truncate">
                    {user?.name?.split(' ')[0]}
                  </span>
                  <svg className={`w-4 h-4 text-slate-400 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {userMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setUserMenuOpen(false)} />
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-20">
                      <div className="px-4 py-3 border-b border-slate-100">
                        <p className="font-medium text-slate-900 truncate">{user?.name}</p>
                        <p className="text-sm text-slate-500 truncate">{user?.email}</p>
                      </div>
                      <div className="py-1">
                        <Link
                          href="/dashboard"
                          className="flex items-center gap-3 px-4 py-2 text-slate-700 hover:bg-slate-50"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                          </svg>
                          Dashboard
                        </Link>
                        <Link
                          href="/profile"
                          className="flex items-center gap-3 px-4 py-2 text-slate-700 hover:bg-slate-50"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          Profile
                        </Link>
                      </div>
                      <div className="border-t border-slate-100 py-1">
                        <button
                          onClick={() => {
                            setUserMenuOpen(false);
                            signOut({ callbackUrl: '/' });
                          }}
                          className="flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 w-full"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          Sign Out
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              /* Not Logged In - Show Login/Signup */
              <div className="hidden md:flex items-center gap-2">
                <Link 
                  href="/login"
                  className="px-4 py-2 text-slate-700 hover:text-blue-600 font-medium transition-colors"
                >
                  Log in
                </Link>
                <Link 
                  href="/register"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
                >
                  Get Started
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200">
            <nav className="flex flex-col gap-2">
              <Link 
                href="/en/calculators"
                className="px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                Calculators
              </Link>
              <Link 
                href="/pricing"
                className="px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link 
                href="/blog"
                className="px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                Blog
              </Link>
              <Link 
                href="/about"
                className="px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <hr className="my-2" />
              {session ? (
                <>
                  <Link 
                    href="/dashboard"
                    className="px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link 
                    href="/profile"
                    className="px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      signOut({ callbackUrl: '/' });
                    }}
                    className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg text-left"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    href="/login"
                    className="px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Log in
                  </Link>
                  <Link 
                    href="/register"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg text-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
