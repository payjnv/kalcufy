"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';

export default function CookieConsent() {
  const locale = useLocale();
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem('cookie_consent', JSON.stringify({
      essential: true,
      analytics: true,
      advertising: true,
      preferences: true,
      timestamp: new Date().toISOString()
    }));
    setShowBanner(false);
  };

  const acceptEssential = () => {
    localStorage.setItem('cookie_consent', JSON.stringify({
      essential: true,
      analytics: false,
      advertising: false,
      preferences: false,
      timestamp: new Date().toISOString()
    }));
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl border border-slate-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          {/* Text */}
          <div className="flex-1">
            <h3 className="font-semibold text-slate-900 mb-1">🍪 We use cookies</h3>
            <p className="text-sm text-slate-600">
              We use cookies to improve your experience, analyze traffic, and show personalized ads. 
              By clicking "Accept All", you consent to our use of cookies. 
              <Link href={`/${locale}/cookies`} className="text-blue-600 hover:underline ml-1">
                Learn more about our cookie policy
              </Link>
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={acceptEssential}
              className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              Essential Only
            </button>
            <button
              onClick={acceptAll}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
