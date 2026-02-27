'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Language } from '@/lib/translations';

// 深度分析链接板块
function AnalysisLinkSection({ lang, t }: { lang: Language; t: Record<string, any> }) {
  const linkText = {
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
  };

  const text = linkText[lang];

  return (
    <section className="py-10 sm:py-16 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl md:text-4xl font-bold mb-4 section-title"
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
