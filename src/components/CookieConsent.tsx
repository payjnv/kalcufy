"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';

export default function CookieConsent() {
  const locale = useLocale();
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true, // Always true, cannot be disabled
    analytics: false,
    advertising: false,
    preferences: false,
  });

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      // Show banner after a short delay for better UX
      const timer = setTimeout(() => setShowBanner(true), 1000);
      return () => clearTimeout(timer);
    } else {
      // Load saved preferences
      try {
        const saved = JSON.parse(consent);
        setPreferences(saved);
      } catch (e) {
        setShowBanner(true);
      }
    }
  }, []);

  const saveConsent = (prefs: typeof preferences) => {
    localStorage.setItem('cookie_consent', JSON.stringify(prefs));
    localStorage.setItem('cookie_consent_date', new Date().toISOString());
    setPreferences(prefs);
    setShowBanner(false);
    setShowPreferences(false);
    
    // Trigger analytics/ads based on consent
    if (prefs.analytics && typeof window !== 'undefined') {
      // Enable Google Analytics
      (window as any).gtag?.('consent', 'update', {
        analytics_storage: 'granted',
      });
    }
    if (prefs.advertising && typeof window !== 'undefined') {
      // Enable Ads
      (window as any).gtag?.('consent', 'update', {
        ad_storage: 'granted',
        ad_personalization: 'granted',
      });
    }
  };

  const acceptAll = () => {
    saveConsent({
      essential: true,
      analytics: true,
      advertising: true,
      preferences: true,
    });
  };

  const acceptEssential = () => {
    saveConsent({
      essential: true,
      analytics: false,
      advertising: false,
      preferences: false,
    });
  };

  const savePreferences = () => {
    saveConsent(preferences);
  };

  if (!showBanner) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/40 z-[9998]" />
      
      {/* Cookie Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-[9999] p-4 md:p-6">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
          
          {!showPreferences ? (
            /* Main Banner */
            <div className="p-6 md:p-8">
              <div className="flex items-start gap-4">
                {/* Cookie Icon */}
                <div className="hidden sm:flex w-12 h-12 rounded-full bg-amber-100 items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    🍪 We use cookies
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">
                    We use cookies and similar technologies to enhance your experience, analyze site usage, and assist in our marketing efforts. By clicking "Accept All", you consent to the use of ALL cookies. You can also customize your preferences.
                  </p>
                  <p className="text-slate-500 text-xs">
                    Learn more in our{" "}
                    <Link href={`/${locale}/cookies`} className="text-blue-600 hover:underline">
                      Cookie Policy
                    </Link>{" "}
                    and{" "}
                    <Link href={`/${locale}/privacy`} className="text-blue-600 hover:underline">
                      Privacy Policy
                    </Link>.
                  </p>
                </div>
              </div>
              
              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <button
                  onClick={acceptAll}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                >
                  Accept All
                </button>
                <button
                  onClick={acceptEssential}
                  className="flex-1 px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-semibold hover:bg-slate-200 transition-colors"
                >
                  Essential Only
                </button>
                <button
                  onClick={() => setShowPreferences(true)}
                  className="flex-1 px-6 py-3 border border-slate-300 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 transition-colors"
                >
                  Customize
                </button>
              </div>
            </div>
          ) : (
            /* Preferences Panel */
            <div className="p-6 md:p-8 max-h-[80vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-slate-900">Cookie Preferences</h3>
                <button
                  onClick={() => setShowPreferences(false)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                {/* Essential Cookies */}
                <div className="p-4 bg-slate-50 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-slate-900">Essential Cookies</h4>
                      <p className="text-sm text-slate-600 mt-1">
                        Required for the website to function. Cannot be disabled.
                      </p>
                    </div>
                    <div className="px-3 py-1 bg-emerald-100 text-emerald-700 text-sm font-medium rounded-full">
                      Always Active
                    </div>
                  </div>
                </div>

                {/* Analytics Cookies */}
                <div className="p-4 bg-slate-50 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 mr-4">
                      <h4 className="font-semibold text-slate-900">Analytics Cookies</h4>
                      <p className="text-sm text-slate-600 mt-1">
                        Help us understand how visitors interact with our website.
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.analytics}
                        onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>

                {/* Advertising Cookies */}
                <div className="p-4 bg-slate-50 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 mr-4">
                      <h4 className="font-semibold text-slate-900">Advertising Cookies</h4>
                      <p className="text-sm text-slate-600 mt-1">
                        Used to deliver personalized advertisements.
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.advertising}
                        onChange={(e) => setPreferences({ ...preferences, advertising: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>

                {/* Preference Cookies */}
                <div className="p-4 bg-slate-50 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 mr-4">
                      <h4 className="font-semibold text-slate-900">Preference Cookies</h4>
                      <p className="text-sm text-slate-600 mt-1">
                        Remember your settings and preferences.
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.preferences}
                        onChange={(e) => setPreferences({ ...preferences, preferences: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={savePreferences}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                >
                  Save Preferences
                </button>
                <button
                  onClick={acceptAll}
                  className="flex-1 px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-semibold hover:bg-slate-200 transition-colors"
                >
                  Accept All
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
