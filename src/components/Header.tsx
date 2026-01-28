"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { useSession, signOut } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { locales, localeFlags, localeNames, type Locale } from '@/i18n';
import { getCategoryIcon, getCategoryColors } from '@/config/category-icons';

interface Category {
  id: string;
  slug: string;
  nameEn: string;
  nameEs: string | null;
  namePt: string | null;
  icon: string | null;
  color: string;
  showInMenu: boolean;
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const locale = useLocale() as Locale;
  const t = useTranslations('common');
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  
  const user = session?.user;
  const initials = user?.name?.substring(0, 2).toUpperCase() || 'U';

  // Fetch categories
  useEffect(() => {
    fetch('/api/calculator-categories')
      .then(res => res.json())
      .then(data => {
        const menuCategories = data.filter((c: Category) => c.showInMenu !== false);
        setCategories(menuCategories);
      })
      .catch(console.error);
  }, []);

  // Get category name by locale
  const getCategoryName = (cat: Category): string => {
    if (locale === 'es' && cat.nameEs) return cat.nameEs;
    if (locale === 'pt' && cat.namePt) return cat.namePt;
    return cat.nameEn;
  };

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
            <Link href={`/${locale}`} className="flex items-center gap-2.5">
              <svg width="32" height="32" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="kalcufyBg" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.9"/>
                    <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.95"/>
                  </linearGradient>
                </defs>
                <rect width="64" height="64" rx="16" fill="url(#kalcufyBg)"/>
                <rect x="0.5" y="0.5" width="63" height="63" rx="15.5" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
                <circle cx="18" cy="18" r="6" fill="#22d3ee"/>
                <circle cx="32" cy="18" r="6" fill="rgba(255,255,255,0.95)"/>
                <circle cx="46" cy="18" r="6" fill="#22d3ee"/>
                <circle cx="18" cy="32" r="6" fill="#22d3ee"/>
                <circle cx="32" cy="32" r="6" fill="#22d3ee"/>
                <circle cx="46" cy="32" r="6" fill="rgba(255,255,255,0.95)"/>
                <circle cx="18" cy="46" r="6" fill="#22d3ee"/>
                <circle cx="32" cy="46" r="6" fill="rgba(255,255,255,0.95)"/>
                <circle cx="46" cy="46" r="6" fill="rgba(255,255,255,0.95)"/>
              </svg>
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
                  className="flex items-center gap-1 px-2 py-1.5 text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition-colors"
                  aria-label="Change language"
                  aria-expanded={langMenuOpen}
                >
                  <span className="text-sm">{localeFlags[locale]}</span>
                  <span className="text-xs font-medium text-slate-500">{locale.toUpperCase()}</span>
                  <svg className={`w-3 h-3 transition-transform ${langMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {langMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setLangMenuOpen(false)} />
                    <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg border border-slate-200 py-1 z-20">
                      {locales.map((loc) => (
                        <button
                          key={loc}
                          onClick={() => changeLanguage(loc)}
                          className={`flex items-center gap-2 w-full px-3 py-2 text-left hover:bg-slate-50 transition-colors text-sm ${
                            locale === loc ? 'bg-blue-50 text-blue-600' : 'text-slate-700'
                          }`}
                        >
                          <span className="text-sm">{localeFlags[loc]}</span>
                          <span className="font-medium">{localeNames[loc]}</span>
                          {locale === loc && (
                            <svg className="w-3.5 h-3.5 ml-auto text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 z-40" aria-modal="true" role="dialog">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          />
          
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
                      className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl border transition-colors min-h-[44px] ${
                        locale === loc 
                          ? 'bg-blue-50 border-blue-200 text-blue-700' 
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span className="text-sm">{localeFlags[loc]}</span>
                      <span className="font-medium text-xs">{loc.toUpperCase()}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic Categories */}
              <div className="p-4">
                <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider px-2 mb-3">Categories</h2>
                <ul className="space-y-1">
                  {categories.map((cat) => {
                    const colors = getCategoryColors(cat.color);
                    return (
                      <li key={cat.id}>
                        <Link
                          href={`/${locale}/calculators?category=${cat.slug}`}
                          onClick={() => setMenuOpen(false)}
                          className="flex items-center gap-4 px-3 py-3 text-slate-700 hover:bg-slate-50 rounded-xl transition-colors min-h-[44px]"
                        >
                          <span className={colors.text}>
                            {getCategoryIcon(cat.slug, "w-5 h-5")}
                          </span>
                          <span className="font-medium">{getCategoryName(cat)}</span>
                        </Link>
                      </li>
                    );
                  })}
                  {categories.length === 0 && (
                    <li className="px-3 py-3 text-slate-400 text-sm">Loading...</li>
                  )}
                </ul>
              </div>

              {/* Divider */}
              <div className="mx-4 border-t border-slate-200" />

              {/* Other Links */}
              <div className="p-4">
                <ul className="space-y-1">
                  <li>
                    <Link
                      href={`/${locale}/calculators`}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-4 px-3 py-3 text-slate-700 hover:bg-slate-50 rounded-xl transition-colors min-h-[44px]"
                    >
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                      </svg>
                      <span className="font-medium">{t('calculators')}</span>
                    </Link>
                  </li>
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
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
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
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
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
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
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
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                          </svg>
                          <span className="font-medium">Sign Out</span>
                        </button>
                      </li>
                    </ul>
                  </div>
                </>
              )}
            </div>

            {/* Footer - Login/Signup */}
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
