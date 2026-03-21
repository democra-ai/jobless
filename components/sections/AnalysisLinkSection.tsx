'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Language } from '@/lib/translations';
import { trackInternalNavigation } from '@/lib/analytics';

// 深度分析链接板块
function AnalysisLinkSection({ lang, t }: { lang: Language; t: Record<string, any> }) {
  const linkText: Record<string, { title: string; subtitle: string; buttonText: string }> = {
    en: {
      title: 'Want Deeper Analysis?',
      subtitle: 'Explore detailed data on high-risk jobs, layoff cases, industry impacts, and career trends.',
      buttonText: 'View Full Analysis →',
    },
    zh: {
      title: '想要更深入的分析？',
      subtitle: '探索详细数据：高风险职业、裁员案例、行业影响、职业趋势。',
      buttonText: '查看完整分析 →',
    },
    ja: {
      title: 'より深い分析が必要ですか？',
      subtitle: '高リスクの仕事、リストラ事例、業界への影響、キャリアトレンドの詳細データを探索。',
      buttonText: '完全な分析を見る →',
    },
    ko: {
      title: '더 깊은 분석이 필요하신가요?',
      subtitle: '고위험 직업, 구조조정 사례, 산업 영향, 커리어 트렌드에 대한 상세 데이터를 탐색하세요.',
      buttonText: '전체 분석 보기 →',
    },
    de: {
      title: 'Tiefere Analyse gewünscht?',
      subtitle: 'Erkunden Sie detaillierte Daten zu Hochrisiko-Jobs, Entlassungsfällen, Branchenauswirkungen und Karrieretrends.',
      buttonText: 'Vollständige Analyse anzeigen →',
    },
  };

  const text = linkText[lang] ?? linkText['en'];

  return (
    <section className="py-10 sm:py-16 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-bold mb-4 section-title"
        >
          {text.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="section-subtitle mb-8 max-w-2xl mx-auto"
        >
          {text.subtitle}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Link
            href="/analysis"
            onClick={() => trackInternalNavigation('/analysis', 'analysis_link_section')}
            className="inline-flex items-center gap-2 bg-risk-high hover:bg-risk-high/80 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all card-hover"
          >
            {text.buttonText}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default AnalysisLinkSection;
