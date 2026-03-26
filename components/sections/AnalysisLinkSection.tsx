'use client';

import Link from 'next/link';
import { Language } from '@/lib/translations';
import { trackInternalNavigation } from '@/lib/analytics';
import { BorderBeam } from '@/components/ui/border-beam';
import { MagicCard } from '@/components/ui/magic-card';

function AnalysisLinkSection({ lang, t, theme = 'dark' }: { lang: Language; t: Record<string, any>; theme?: 'dark' | 'light' }) {
  const beamFrom = theme === 'dark' ? '#ffffff' : '#ff6b35';
  const beamTo = theme === 'dark' ? '#c4b5fd' : '#ff1744';

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
    <section className="py-10 sm:py-16 px-4 sm:px-6 border-t border-surface-elevated/50 bg-background">
      <div className="max-w-xl mx-auto">
        <MagicCard className="relative card-glow-border rounded-xl p-6 sm:p-8 text-center overflow-hidden" gradientColor="rgba(167, 139, 219, 0.08)" gradientOpacity={0.8}>
          <BorderBeam size={120} duration={8} colorFrom={beamFrom} colorTo={beamTo} borderWidth={1.5} />
          <h2 className="text-2xl md:text-3xl font-bold mb-4 section-title">
            {text.title}
          </h2>
          <p className="section-subtitle mb-8 max-w-md mx-auto">
            {text.subtitle}
          </p>
          <div className="flex justify-center">
            <Link
              href="/analysis"
              onClick={() => trackInternalNavigation('/analysis', 'analysis_link_section')}
              className="inline-flex items-center px-8 py-4 font-semibold text-lg text-foreground-muted hover:text-foreground transition-colors"
            >
              {text.buttonText} &rarr;
            </Link>
          </div>
        </MagicCard>
      </div>
    </section>
  );
}

export default AnalysisLinkSection;
