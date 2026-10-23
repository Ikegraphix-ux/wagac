'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { analyticsConfigured, firebaseApp } from '@/lib/firebase';

export function FirebaseAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (!analyticsConfigured || !pathname) return;
    const pagePath = pathname;
    let cancelled = false;

    async function trackPageView() {
      const app = firebaseApp;
      if (!app) return;
      const { getAnalytics, isSupported, logEvent } = await import(
        'firebase/analytics'
      );
      if (!cancelled && (await isSupported())) {
        logEvent(getAnalytics(app), 'page_view', {
          page_path: pagePath,
        });
      }
    }

    void trackPageView().catch((error: unknown) => {
      console.error('Firebase Analytics could not record a page view.', error);
    });

    return () => {
      cancelled = true;
    };
  }, [pathname]);

  return null;
}
