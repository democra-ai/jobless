'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Language } from '@/lib/translations';
import { trackInternalNavigation } from '@/lib/analytics';
import { BlurFade } from '@/components/ui/blur-fade';

function AnalysisLinkSection({ lang }: { lang: Language; t: Record<string, any> }) {
  const linkText: Record<string, { title: string; subtitle: string; buttonText: string }> = {
    en: {
      title: 'Want Deeper Analysis?',
      subtitle: 'Explore detailed data on high-risk jobs, layoff cases, industry impacts, and career trends.',
      buttonText: 'View Full Analysis',
    },
    zh: {
      title: '想要更深入的分析？',
      subtitle: '探索详细数据：高风险职业、裁员案例、行业影响、职业趋势。',
      buttonText: '查看完整分析',
    },
    ja: {
      title: 'より深い分析が必要ですか？',
      subtitle: '高リスクの仕事、リストラ事例、業界への影響、キャリアトレンドの詳細データを探索。',
      buttonText: '完全な分析を見る',
    },
    ko: {
      title: '더 깊은 분석이 필요하신가요?',
      subtitle: '고위험 직업, 구조조정 사례, 산업 영향, 커리어 트렌드에 대한 상세 데이터를 탐색하세요.',
      buttonText: '전체 분석 보기',
    },
    de: {
      title: 'Tiefere Analyse gewünscht?',
      subtitle: 'Erkunden Sie detaillierte Daten zu Hochrisiko-Jobs, Entlassungsfällen, Branchenauswirkungen und Karrieretrends.',
      buttonText: 'Vollständige Analyse anzeigen',
    },
  };

  const text = linkText[lang] ?? linkText['en'];

  return (
    <section className="py-20 sm:py-32 px-6 overflow-hidden">
      <div className="max-w-3xl mx-auto text-center">
        <BlurFade delay={0.1} inView>
          <div className="rounded-3xl p-10 sm:p-16 relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, color-mix(in srgb, var(--brand-primary) 8%, var(--surface)), color-mix(in srgb, var(--risk-critical) 5%, var(--surface)))',
              border: '1px solid var(--surface-elevated)',
            }}>
            {/* Decorative blur */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-[0.08]"
              style={{ background: 'radial-gradient(circle, var(--brand-primary), transparent 70%)', filter: 'blur(60px)' }} />

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4 relative z-10"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--foreground)' }}>
              {text.title}
            </h2>
            <p className="text-base sm:text-lg mb-10 relative z-10" style={{ color: 'var(--foreground-muted)' }}>
              {text.subtitle}
            </p>
            <div className="relative z-10">
              <Link
                href="/analysis"
                onClick={() => trackInternalNavigation('/analysis', 'analysis_link_section')}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-semibold transition-all duration-300 hover:scale-[1.02] hover:gap-3"
                style={{
                  background: 'var(--brand-primary)',
                  color: '#fff',
                  boxShadow: '0 8px 30px -4px rgba(255,107,53,0.35)',
                }}
              >
                {text.buttonText}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}

export default AnalysisLinkSection;
