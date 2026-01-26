"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { useSession, signOut } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { locales, localeFlags, localeNames, type Locale } from '@/i18n';

// Calculator categories with SVG icons
const CATEGORIES = [
  { id: 'finance', name: 'Finance', icon: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )},
  { id: 'health', name: 'Health', icon: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </svg>
  )},
  { id: 'everyday', name: 'Everyday Life', icon: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
    </svg>
  )},
  { id: 'math', name: 'Math', icon: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V18zm2.498-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zM8.25 6h7.5v2.25h-7.5V6zM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0012 2.25z" />
    </svg>
  )},
  { id: 'conversion', name: 'Conversion', icon: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
    </svg>
  )},
  { id: 'statistics', name: 'Statistics', icon: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>
  )},
  { id: 'other', name: 'Other', icon: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
    </svg>
  )},
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const locale = useLocale() as Locale;
  const t = useTranslations('common');
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  
  const user = session?.user;
  const initials = user?.name?.substring(0, 2).toUpperCase() || 'U';

  // Change language function
  const changeLanguage = (newLocale: Locale) => {
    const currentPath = pathname.replace(`/${locale}`, '');
    router.push(`/${newLocale}${currentPath || ''}`);
    setLangMenuOpen(false);
    setMenuOpen(false);
  };

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${window.scrollY}px`;
    } else {
      const scrollY = document.body.style.top;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
    };
  }, [menuOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-slate-200 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href={`/${locale}`} className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">K</span>
              </div>
              <span className="text-xl font-bold text-slate-900">Kalcufy</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <Link href={`/${locale}/calculators`} className="text-slate-600 hover:text-blue-600 font-medium transition-colors">
                {t('calculators')}
              </Link>
              <Link href={`/${locale}/pricing`} className="text-slate-600 hover:text-blue-600 font-medium transition-colors">
                {t('pricing')}
              </Link>
              <Link href={`/${locale}/blog`} className="text-slate-600 hover:text-blue-600 font-medium transition-colors">
                {t('blog')}
              </Link>
              <Link href={`/${locale}/about`} className="text-slate-600 hover:text-blue-600 font-medium transition-colors">
                {t('about') || 'About'}
              </Link>
            </nav>

            {/* Right Side */}
            <div className="flex items-center gap-2">
              {/* Language Selector - Desktop */}
              <div className="hidden md:block relative">
                <button
                  onClick={() => setLangMenuOpen(!langMenuOpen)}
                  className="flex items-center gap-1.5 px-3 py-2 text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition-colors min-h-[44px]"
                  aria-label="Change language"
                  aria-expanded={langMenuOpen}
                >
                  <span className="text-xl">{localeFlags[locale]}</span>
                  <svg className={`w-4 h-4 transition-transform ${langMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {langMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setLangMenuOpen(false)} />
                    <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-20">
                      {locales.map((loc) => (
                        <button
                          key={loc}
                          onClick={() => changeLanguage(loc)}
                          className={`flex items-center gap-3 w-full px-4 py-2.5 text-left hover:bg-slate-50 transition-colors ${
                            locale === loc ? 'bg-blue-50 text-blue-600' : 'text-slate-700'
                          }`}
                        >
                          <span className="text-xl">{localeFlags[loc]}</span>
                          <span className="font-medium">{localeNames[loc]}</span>
                          {locale === loc && (
                            <svg className="w-4 h-4 ml-auto text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Desktop User Menu */}
              {status === 'loading' ? (
                <div className="hidden md:block w-8 h-8 rounded-full bg-slate-200 animate-pulse" />
              ) : session ? (
                <div className="hidden md:block relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 p-1 rounded-full hover:bg-slate-100 transition-colors"
                  >
                    {user?.image ? (
                      <img src={user.image} alt="" className="w-9 h-9 rounded-full" />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-semibold text-sm">
                        {initials}
                      </div>
                    )}
                  </button>
                  {userMenuOpen && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setUserMenuOpen(false)} />
                      <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-20">
                        <div className="px-4 py-3 border-b border-slate-100">
                          <p className="font-medium text-slate-900 truncate">{user?.name}</p>
                          <p className="text-sm text-slate-600 truncate">{user?.email}</p>
                        </div>
                        <Link href={`/${locale}/dashboard`} className="flex items-center gap-3 px-4 py-2 text-slate-700 hover:bg-slate-50" onClick={() => setUserMenuOpen(false)}>
                          Dashboard
                        </Link>
                        <Link href={`/${locale}/profile`} className="flex items-center gap-3 px-4 py-2 text-slate-700 hover:bg-slate-50" onClick={() => setUserMenuOpen(false)}>
                          Profile
                        </Link>
                        <div className="border-t border-slate-100 mt-1 pt-1">
                          <button
                            onClick={() => { setUserMenuOpen(false); signOut({ callbackUrl: `/${locale}` }); }}
                            className="flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 w-full"
                          >
                            Sign Out
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div className="hidden md:flex items-center gap-2">
                  <Link href={`/${locale}/login`} className="px-4 py-2 text-slate-700 hover:text-blue-600 font-medium transition-colors">
                    {t('login')}
                  </Link>
                  <Link href={`/${locale}/register`} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors">
                    {t('signup')}
                  </Link>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
              >
                {menuOpen ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay - OUTSIDE header for full coverage */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 z-40" aria-modal="true" role="dialog">
          {/* Dark Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          />
          
          {/* Menu Panel - Slide from left */}
          <div className="absolute top-0 left-0 w-[75%] max-w-[300px] h-full bg-white shadow-2xl flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between h-16 px-4 border-b border-slate-200">
              <Link href={`/${locale}`} onClick={() => setMenuOpen(false)} className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">K</span>
                </div>
                <span className="text-xl font-bold text-slate-900">Kalcufy</span>
              </Link>
              <button
                onClick={() => setMenuOpen(false)}
                className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Close menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto">
              {/* Language Selector - Mobile */}
              <div className="p-4 border-b border-slate-200">
                <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider px-2 mb-3">Language</h2>
                <div className="flex gap-2">
                  {locales.map((loc) => (
                    <button
                      key={loc}
                      onClick={() => changeLanguage(loc)}
                      className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border transition-colors min-h-[44px] ${
                        locale === loc 
                          ? 'bg-blue-50 border-blue-200 text-blue-700' 
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span className="text-xl">{localeFlags[loc]}</span>
                      <span className="font-medium text-sm">{loc.toUpperCase()}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div className="p-4">
                <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider px-2 mb-3">Categories</h2>
                <ul className="space-y-1">
                  {CATEGORIES.map((cat) => (
                    <li key={cat.id}>
                      <Link
                        href={`/${locale}/calculators?category=${cat.id}`}
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-4 px-3 py-3 text-slate-700 hover:bg-slate-50 rounded-xl transition-colors min-h-[44px]"
                      >
                        <span className="text-blue-600">{cat.icon}</span>
                        <span className="font-medium">{cat.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Divider */}
              <div className="mx-4 border-t border-slate-200" />

              {/* Other Links */}
              <div className="p-4">
                <ul className="space-y-1">
                  <li>
                    <Link
                      href={`/${locale}/pricing`}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-4 px-3 py-3 text-slate-700 hover:bg-slate-50 rounded-xl transition-colors min-h-[44px]"
                    >
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                      </svg>
                      <span className="font-medium">{t('pricing')}</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/${locale}/blog`}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-4 px-3 py-3 text-slate-700 hover:bg-slate-50 rounded-xl transition-colors min-h-[44px]"
                    >
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
                      </svg>
                      <span className="font-medium">{t('blog')}</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/${locale}/about`}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-4 px-3 py-3 text-slate-700 hover:bg-slate-50 rounded-xl transition-colors min-h-[44px]"
                    >
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                      </svg>
                      <span className="font-medium">{t('about') || 'About'}</span>
                    </Link>
                  </li>
                </ul>
              </div>

              {/* User Section (if logged in) */}
              {session && (
                <>
                  <div className="mx-4 border-t border-slate-200" />
                  <div className="p-4">
                    <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider px-2 mb-3">Account</h2>
                    <ul className="space-y-1">
                      <li>
                        <Link
                          href={`/${locale}/dashboard`}
                          onClick={() => setMenuOpen(false)}
                          className="flex items-center gap-4 px-3 py-3 text-slate-700 hover:bg-slate-50 rounded-xl transition-colors min-h-[44px]"
                        >
                          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                          </svg>
                          <span className="font-medium">Dashboard</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={`/${locale}/profile`}
                          onClick={() => setMenuOpen(false)}
                          className="flex items-center gap-4 px-3 py-3 text-slate-700 hover:bg-slate-50 rounded-xl transition-colors min-h-[44px]"
                        >
                          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                          </svg>
                          <span className="font-medium">Profile</span>
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={() => { setMenuOpen(false); signOut({ callbackUrl: `/${locale}` }); }}
                          className="flex items-center gap-4 px-3 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors w-full min-h-[44px]"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                          </svg>
                          <span className="font-medium">Sign Out</span>
                        </button>
                      </li>
                    </ul>
                  </div>
                </>
              )}
            </div>

            {/* Footer - Login/Signup (only if not logged in) */}
            {!session && (
              <div className="flex-shrink-0 bg-white border-t border-slate-200 p-4 pb-8">
                <div className="flex items-center gap-3">
                  <Link
                    href={`/${locale}/login`}
                    onClick={() => setMenuOpen(false)}
                    className="flex-1 py-3 text-center text-slate-700 font-medium hover:bg-slate-50 rounded-xl border border-slate-200 transition-colors min-h-[44px] flex items-center justify-center"
                  >
                    {t('login')}
                  </Link>
                  <Link
                    href={`/${locale}/register`}
                    onClick={() => setMenuOpen(false)}
                    className="flex-1 py-3 text-center bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors min-h-[44px] flex items-center justify-center"
                  >
                    {t('signup')}
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
