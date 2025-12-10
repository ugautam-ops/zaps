'use client';
import { useState, useEffect } from 'react';

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
