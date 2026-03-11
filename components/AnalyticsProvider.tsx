'use client';

import { useEffect } from 'react';
import { initAnalytics, trackSectionView } from '@/lib/analytics';

/**
 * Client-side analytics bootstrapper.
 * Initializes Firebase Analytics + Anonymous Auth on mount,
 * and sets up Intersection Observer for section visibility tracking.
 */
export default function AnalyticsProvider() {
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

  return null;
}
