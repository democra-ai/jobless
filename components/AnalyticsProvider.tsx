'use client';

import { useEffect } from 'react';
import {
  initAnalytics,
  trackSectionView,
  trackScrollDepth,
  trackVisibilityChange,
  trackEngagementTime,
  trackUtmParams,
  trackExternalLink,
} from '@/lib/analytics';

/**
 * Client-side analytics bootstrapper.
 * Initializes Firebase Analytics + Anonymous Auth on mount,
 * and sets up comprehensive behavior tracking:
 * - Section visibility (IntersectionObserver)
 * - Scroll depth milestones (25/50/75/100%)
 * - Session engagement time
 * - Page visibility (tab switch)
 * - UTM parameter capture
 * - External link click delegation
 */
export default function AnalyticsProvider() {
  // Initialize Firebase
  useEffect(() => {
    initAnalytics();
  }, []);

  // Track section views via IntersectionObserver
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;

    const sectionIds = [
      'overview-anchor',
      'risk-calculator',
      'data-threat-anchor',
      'timeline-anchor',
    ];

    const seen = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !seen.has(entry.target.id)) {
            seen.add(entry.target.id);
            trackSectionView(entry.target.id);
          }
        });
      },
      { threshold: 0.3 },
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Scroll depth tracking (25%, 50%, 75%, 100%)
  useEffect(() => {
    const milestones = [25, 50, 75, 100];
    const reached = new Set<number>();

    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      const pct = Math.round((scrollTop / docHeight) * 100);

      for (const m of milestones) {
        if (pct >= m && !reached.has(m)) {
          reached.add(m);
          trackScrollDepth(m);
        }
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Session engagement time — fires on unload
  useEffect(() => {
    const startTime = Date.now();

    const onUnload = () => {
      const totalSeconds = Math.round((Date.now() - startTime) / 1000);
      trackEngagementTime(totalSeconds);
    };

    window.addEventListener('beforeunload', onUnload);
    return () => window.removeEventListener('beforeunload', onUnload);
  }, []);

  // Page visibility change tracking (tab switch)
  useEffect(() => {
    const onChange = () => {
      trackVisibilityChange(!document.hidden);
    };
    document.addEventListener('visibilitychange', onChange);
    return () => document.removeEventListener('visibilitychange', onChange);
  }, []);

  // UTM parameter capture
  useEffect(() => {
    const url = new URL(window.location.href);
    const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
    const params: Record<string, string> = {};
    for (const key of utmKeys) {
      const val = url.searchParams.get(key);
      if (val) params[key] = val;
    }
    trackUtmParams(params);
  }, []);

  // External link click delegation — track all <a> clicks that go off-site
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a[href]') as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.href;
      if (href && !href.startsWith(window.location.origin) && !href.startsWith('#') && !href.startsWith('/')) {
        trackExternalLink(href, anchor.textContent?.trim().slice(0, 80) || '');
      }
    };
    document.addEventListener('click', onClick, { capture: true });
    return () => document.removeEventListener('click', onClick, { capture: true });
  }, []);

  return null;
}
