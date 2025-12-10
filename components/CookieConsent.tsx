// ============================================
// FILE: components/CookieConsent.tsx
// ============================================
'use client';

import { useState, useEffect } from 'react';

type ConsentPreferences = {
  necessary: boolean;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
};

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<ConsentPreferences>({
    necessary: true, // Always required
    functional: false,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Show banner after a small delay for better UX
      setTimeout(() => setShowBanner(true), 1000);
    } else {
      // Load saved preferences
      try {
        const saved = JSON.parse(consent);
        setPreferences(saved);
        applyConsent(saved);
      } catch (e) {
        console.error('Error loading cookie preferences:', e);
      }
    }
  }, []);

  const applyConsent = (prefs: ConsentPreferences) => {
    // Apply consent to your analytics/tracking scripts
    if (prefs.analytics) {
      // Enable analytics (e.g., Google Analytics)
      console.log('Analytics enabled');
      // window.gtag?.('consent', 'update', { analytics_storage: 'granted' });
    }
    
    if (prefs.marketing) {
      // Enable marketing cookies
      console.log('Marketing enabled');
    }

    // For game scores (functional cookies)
    if (!prefs.functional) {
      // Clear any existing game scores if functional cookies are declined
      clearFunctionalData();
    }
  };

  const clearFunctionalData = () => {
    // Clear localStorage items related to game scores
    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (key.includes('game-') || key.includes('score-') || key.includes('best-'))) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach(key => localStorage.removeItem(key));
  };

  const saveConsent = (prefs: ConsentPreferences) => {
    localStorage.setItem('cookie-consent', JSON.stringify(prefs));
    localStorage.setItem('cookie-consent-date', new Date().toISOString());
    applyConsent(prefs);
    setShowBanner(false);
    setShowSettings(false);
  };

  const acceptAll = () => {
    const allAccepted = {
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true,
    };
    setPreferences(allAccepted);
    saveConsent(allAccepted);
  };

  const acceptNecessary = () => {
    const necessaryOnly = {
      necessary: true,
      functional: false,
      analytics: false,
      marketing: false,
    };
    setPreferences(necessaryOnly);
    saveConsent(necessaryOnly);
  };

  const saveCustomPreferences = () => {
    saveConsent(preferences);
  };

  if (!showBanner) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm animate-fade-in"
        style={{
          animation: 'fadeIn 0.3s ease-out'
        }}
      />

      {/* Banner */}
      <div 
        className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 animate-slide-up"
        style={{
          animation: 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        <div className="max-w-6xl mx-auto bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700">
          <style jsx>{`
            @keyframes slideUp {
              from {
                transform: translateY(100%);
                opacity: 0;
              }
              to {
                transform: translateY(0);
                opacity: 1;
              }
            }
            
            @keyframes fadeIn {
              from {
                opacity: 0;
              }
              to {
                opacity: 1;
              }
            }
          `}</style>
          
          {!showSettings ? (
            // Simple Banner View
            <div className="p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                {/* Icon */}
                <div className="text-4xl sm:text-5xl">🍪</div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-2">
                    We Value Your Privacy
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mb-4">
                    We use cookies to enhance your experience, save your game progress, 
                    and analyze site traffic. You can choose which cookies to accept.
                  </p>
                  <a 
                    href="/privacy-policy" 
                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Read our Privacy Policy →
                  </a>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => setShowSettings(true)}
                    className="px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition"
                  >
                    Customize
                  </button>
                  <button
                    onClick={acceptNecessary}
                    className="px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition"
                  >
                    Necessary Only
                  </button>
                  <button
                    onClick={acceptAll}
                    className="px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg transition shadow-lg"
                  >
                    Accept All
                  </button>
                </div>
              </div>
            </div>
          ) : (
            // Settings View
            <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  Cookie Preferences
                </h3>
                <button
                  onClick={() => setShowSettings(false)}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-6">
                {/* Necessary Cookies */}
                <div className="border-b border-slate-200 dark:border-slate-700 pb-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🔒</span>
                      <h4 className="text-lg font-semibold text-slate-900 dark:text-white">
                        Necessary Cookies
                      </h4>
                    </div>
                    <div className="px-3 py-1 bg-slate-200 dark:bg-slate-700 rounded-full text-xs font-medium text-slate-700 dark:text-slate-300">
                      Always Active
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 ml-11">
                    Essential for the website to function. Cannot be disabled.
                  </p>
                </div>

                {/* Functional Cookies */}
                <div className="border-b border-slate-200 dark:border-slate-700 pb-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🎮</span>
                      <h4 className="text-lg font-semibold text-slate-900 dark:text-white">
                        Functional Cookies
                      </h4>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.functional}
                        onChange={(e) => setPreferences({ ...preferences, functional: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 ml-11">
                    Save your game progress, high scores, and preferences. Required for leaderboards and stats.
                  </p>
                </div>

                {/* Analytics Cookies */}
                <div className="border-b border-slate-200 dark:border-slate-700 pb-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">📊</span>
                      <h4 className="text-lg font-semibold text-slate-900 dark:text-white">
                        Analytics Cookies
                      </h4>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.analytics}
                        onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 ml-11">
                    Help us understand how visitors interact with our games to improve performance.
                  </p>
                </div>

                {/* Marketing Cookies */}
                <div className="pb-2">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🎯</span>
                      <h4 className="text-lg font-semibold text-slate-900 dark:text-white">
                        Marketing Cookies
                      </h4>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.marketing}
                        onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 ml-11">
                    Used to deliver personalized advertisements and track ad campaign performance.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <button
                  onClick={acceptNecessary}
                  className="flex-1 px-6 py-3 text-base font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition"
                >
                  Reject All
                </button>
                <button
                  onClick={saveCustomPreferences}
                  className="flex-1 px-6 py-3 text-base font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg transition shadow-lg"
                >
                  Save Preferences
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// ============================================
// USAGE: Add to your layout.tsx
// ============================================
/*
import CookieConsent from '@/components/CookieConsent';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
*/

// ============================================
// Helper Hook: Check if functional cookies are allowed
// ============================================
/*
// FILE: hooks/useCookieConsent.ts

export function useCookieConsent() {
  const [canUseFunctional, setCanUseFunctional] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (consent) {
      try {
        const prefs = JSON.parse(consent);
        setCanUseFunctional(prefs.functional);
      } catch (e) {
        setCanUseFunctional(false);
      }
    }
  }, []);

  return { canUseFunctional };
}

// USAGE in game components:
const { canUseFunctional } = useCookieConsent();

const saveScore = (score: number) => {
  if (canUseFunctional) {
    localStorage.setItem('best-score', score.toString());
  } else {
    // Show message: "Enable functional cookies to save scores"
  }
};
*/

