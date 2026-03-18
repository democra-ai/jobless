'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Flame, Building2, Info, Brain, Clock, TrendingDown, Zap, ArrowUpRight, CheckCircle2, AlertTriangle, RefreshCw, Users, TrendingUp, Target } from 'lucide-react';
import Link from 'next/link';
import { LanguageButton as SharedLanguageButton, ThemeButton } from '@/components/NavigationControls';
import type { Theme } from '@/lib/translations';

// 语言类型
type Language = 'en' | 'zh';

// 翻译数据
const translations = {
  en: {
    title: 'AI Job Impact Analysis',
    subtitle: 'Data-driven insights on how AI is reshaping the job market',

    // 高风险职业
    highRiskTitle: "AI's First Targets: High-Risk Jobs",
    highRiskSubtitle: "If your job appears on this list, you need to be nervous",
    industry: 'Industry',
    tableRiskLevel: 'Risk Level',
    highRiskJobs: 'High-Risk Jobs',
    evidence: 'Evidence & Trend',
    pickSoftTargets: "AI doesn't affect everyone equally—it picks the soft targets first.",
    pickSoftTargetsDesc: 'If your daily work is: clearly rule-describable, highly repetitive, involves lots of documents/data processing—you\'re on AI\'s priority optimization list.',

    // 企业裁员
    layoffTitle: "This Isn't Theory: Companies Are Already Cutting Jobs with AI",
    layoffSubtitle: 'What you see in news is layoff numbers. In company spreadsheets, these become:',
    takenOver: '"Taken over by AI and automation"',
    jobsCut: 'Jobs Cut',
    reason: 'Reason',
    oneInTwenty: 'In 2025, about 1 in 20 layoffs officially cited AI as the reason.',
    source: 'Source: Layoff tracking reports, 2024-2025',

    // 净就业效应
    netImpactTitle: 'The Full Picture: Displacement vs Creation',
    netImpactSubtitle: 'WEF predicts 92M jobs lost, but 170M new jobs created. Net: +78M.',
    wefDisplaced: '92M displaced',
    wefCreated: '170M new jobs',
    wefNet: '+78M net gain',
    pwcExposedGrowth: 'AI-exposed jobs: +38% growth',
    pwcNonExposedGrowth: 'Non-exposed jobs: +65% growth',
    pwcWagePremium: 'AI skills wage premium: +56%',
    theReality: 'The Reality:',
    theRealityText: 'Structural reshuffling, not total collapse. New jobs > displaced jobs, but transition pain is real.',

    // 行业深度分析
    industryDiveTitle: 'Industry Deep Dive: 7 Sectors, Different Fates',
    industryDiveSubtitle: 'AI affects every industry differently. Know your sector\'s pattern.',

    // 职业分化
    divergenceTitle: 'The Career Divergence: Time is the Hidden Variable',
    divergenceSubtitle: 'Every technical person is doing the same math. How much is it costing you to stay where you are?',
    divergenceSource: 'Source: Amy Tam, Bloomberg Beta Investor',
    skillShiftTitle: 'The Skill Shift: Execution → Judgment',
    skillShiftOld: 'Old: "Can you solve this problem?"',
    skillShiftNew: 'New: "Can you tell which problems are worth solving?"',
    skillShiftCapabilities: 'Judgment capabilities:',
    skillShiftCap1: 'Orchestrate systems',
    skillShiftCap2: 'Run parallel bets',
    skillShiftCap3: 'Have taste to know what matters',
    skillShiftCap4: 'Distinguish signal from noise',
    timeComparisonTitle: 'The Timing Cost Has Changed',
    timeYearAgo: 'A Year Ago',
    timeYearAgoDesc: 'Career decisions felt reversible. Take the wrong job, course correct in 18 months.',
    timeNow: 'Now',
    timeNowDesc: 'Divergence accelerating. Every quarter in the wrong seat = quarter of compounding missed.',
    timeGap: 'The Gap',
    timeGapDesc: 'People who moved 6 months ago are building on what they learned. You\'re not.',
    comfortTrapTitle: 'The Comfort Trap',
    comfortTrapDesc: '"Fine" has a cost that doesn\'t show up in your paycheck.',
    comfortTrapQuote: 'The hardest problems aren\'t here anymore, and the org hasn\'t caught up to that fact.',
    passiveLeverageTitle: 'Passive Leverage',
    passiveLeverageDesc: 'Set experiments in motion. Compounding happens whether or not you\'re at your desk.',
    passiveLeverageQuote: 'You set the experiments in motion, and the compounding happens whether or not you\'re at your desk.',
    winningCompaniesTitle: 'What Winning Companies Offer',
    winningComp1: 'Maximum surface area for your judgment',
    winningComp2: 'Zero distance between taste and what gets built',
    winningComp3: 'Surrounded by people who have tricks you haven\'t learned',
    winningComp4: 'Enough compute to actually run experiments',
    divergenceInsight: 'The Math:',
    divergenceInsightText: 'Both bets are rational. But only one of them is time-sensitive.',

    // 返回首页
    backToHome: '← Back to Home',
  },
  zh: {
    title: 'AI 就业影响分析',
    subtitle: '数据驱动洞察：AI 如何重塑就业市场',

    // 高风险职业
    highRiskTitle: 'AI 的第一批猎物：高危行业与岗位清单',
    highRiskSubtitle: '如果你的工作出现在这张表里，你需要紧张',
    industry: '行业',
    tableRiskLevel: '风险等级',
    highRiskJobs: '典型高危岗位',
    evidence: '证据与趋势',
    pickSoftTargets: 'AI 不会平均地影响所有人，它是"挑软柿子捏"的。',
    pickSoftTargetsDesc: '如果你的日常工作是：可被清晰规则描述、重复度高、需要大量文档或数据处理——你就在 AI 的第一批"优先优化列表"里。',

    // 企业裁员
    layoffTitle: '这不是理论：这些公司已经开始用 AI 裁人',
    layoffSubtitle: '你在新闻里看到的是"裁员数字"，但在公司 Excel 里，这些人被合并成了另一个词：',
    takenOver: '"由 AI 和自动化接管"',
    jobsCut: '裁员人数',
    reason: '原因',
    oneInTwenty: '2025 年约 1/20 的裁员在官方理由中点名 AI。',
    source: '来源：裁员追踪报告，2024-2025',

    // 净就业效应
    netImpactTitle: '全貌：替代 vs 创造',
    netImpactSubtitle: 'WEF 预测 9200 万岗位流失，但 1.7 亿新岗位被创造。净增：+7800 万。',
    wefDisplaced: '9200 万被替代',
    wefCreated: '1.7 亿新岗位',
    wefNet: '+7800 万净增长',
    pwcExposedGrowth: 'AI暴露岗位：+38% 增长',
    pwcNonExposedGrowth: '非暴露岗位：+65% 增长',
    pwcWagePremium: 'AI技能工资溢价：+56%',
    theReality: '现实：',
    theRealityText: '结构性洗牌，而非全面崩盘。新岗位 > 被替代岗位，但转型痛苦是真实的。',

    // 行业深度分析
    industryDiveTitle: '行业深度分析：7个行业，不同命运',
    industryDiveSubtitle: 'AI对不同行业影响不同。了解你所在行业的模式。',

    // 职业分化
    divergenceTitle: '职业分化：时间是隐形变量',
    divergenceSubtitle: '每个技术人员都在算同一笔账。留在原地正在付出什么代价？',
    divergenceSource: '来源：Amy Tam，Bloomberg Beta 投资人',
    skillShiftTitle: '技能转移：执行力 → 判断力',
    skillShiftOld: '过去："你能解决这个问题吗？"',
    skillShiftNew: '现在："你能判断哪些问题值得解决吗？"',
    skillShiftCapabilities: '判断力核心能力：',
    skillShiftCap1: '系统能力',
    skillShiftCap2: '并行投注',
    skillShiftCap3: '品味判断',
    skillShiftCap4: '信号与噪声识别',
    timeComparisonTitle: '时间成本已经改变',
    timeYearAgo: '一年前',
    timeYearAgoDesc: '职业决策感觉可逆。选错工作，18个月后调整。',
    timeNow: '现在',
    timeNowDesc: '分化加速。在错误位置待一个季度 = 错过一个季度的复利。',
    timeGap: '差距',
    timeGapDesc: '6个月前转型的人正在在上个季度学习的基础上构建。你没有。',
    comfortTrapTitle: '舒适陷阱',
    comfortTrapDesc: '"还可以"有你看不到的代价。',
    comfortTrapQuote: '最难的问题已经不在这里了，而组织还没有跟上这个事实。',
    passiveLeverageTitle: '被动杠杆',
    passiveLeverageDesc: '设置实验在运动中。无论你在不在桌前，复利都在发生。',
    passiveLeverageQuote: '你设置实验在运动中，无论你不在不在桌前，复利都在发生。',
    winningCompaniesTitle: '赢得人才战的公司特征',
    winningComp1: '判断力有最大的表面积',
    winningComp2: '品味与实际构建之间的距离为零',
    winningComp3: '被拥有你还不知道技巧的人包围',
    winningComp4: '有足够的计算资源实际运行实验',
    divergenceInsight: '这笔账：',
    divergenceInsightText: '两个赌注都合理。但只有一个是时间敏感的。',

    // 返回首页
    backToHome: '← 返回首页',
  },
};

// 数据定义
const layoffCases = [
  { company: { en: 'Dow', zh: '陶氏化学' }, layoffs: '4,500', reason: { en: 'Focus on AI and automation', zh: '聚焦 AI 与自动化' }, industry: { en: 'Chemical', zh: '化工' } },
  { company: { en: 'Pinterest', zh: 'Pinterest' }, layoffs: '~15%', reason: { en: 'Shifting to AI-driven products', zh: '转向 AI 驱动产品' }, industry: { en: 'Tech', zh: '科技' } },
  { company: { en: 'Nike', zh: '耐克' }, layoffs: '775', reason: { en: 'Automating warehouses', zh: '自动化仓储' }, industry: { en: 'Retail', zh: '零售' } },
  { company: { en: 'UPS', zh: 'UPS' }, layoffs: '30,000', reason: { en: 'Automation and restructuring', zh: '自动化与重组' }, industry: { en: 'Logistics', zh: '物流' } },
  { company: { en: 'Tech Sector', zh: '科技行业' }, layoffs: '276,000+', reason: { en: 'AI-driven restructuring', zh: 'AI 驱动的重组' }, industry: { en: '2024-25', zh: '2024-25' } },
];

const highRiskJobs = [
  { industry: { en: 'Customer Service', zh: '客服/呼叫中心' }, risk: 95, mode: 'high-replacement', jobs: { en: 'Phone support, Online chat', zh: '电话客服、在线客服' }, reason: { en: 'AI handles 80% of standard queries by 2025', zh: '2025年AI可处理80%标准问答' } },
  { industry: { en: 'Admin / Support', zh: '行政/文秘' }, risk: 90, mode: 'high-replacement', jobs: { en: 'Assistants, Data entry', zh: '助理、数据录入' }, reason: { en: 'Part of MIT\'s 11.7%', zh: 'MIT 11.7% 的重要组成部分' } },
  { industry: { en: 'Software Development', zh: '软件开发' }, risk: 45, mode: 'mixed', jobs: { en: 'Junior developers', zh: '初级开发者' }, reason: { en: 'Young devs -20%, but overall +17.9% growth', zh: '年轻开发者-20%，但整体增长+17.9%' } },
  { industry: { en: 'Finance / Accounting', zh: '金融/会计' }, risk: 65, mode: 'mixed', jobs: { en: 'Junior analysts', zh: '初级分析师' }, reason: { en: 'Entry-level at risk, high-level enhanced', zh: '入门级有风险，高级岗位增强' } },
  { industry: { en: 'Manufacturing', zh: '制造业' }, risk: 55, mode: 'collaboration', jobs: { en: 'Quality inspection, Monitoring', zh: '质检、监控' }, reason: { en: 'Human-machine collaboration, no mass layoffs', zh: '人机协作，无大规模裁员' } },
  { industry: { en: 'Education', zh: '教育' }, risk: 20, mode: 'augmentation', jobs: { en: 'K-12 Teachers', zh: '中小学教师' }, reason: { en: 'BLS predicts +5% growth (2024-2034)', zh: 'BLS预测+5%增长(2024-2034)' } },
  { industry: { en: 'Healthcare (Radiology)', zh: '医疗(放射科)' }, risk: 15, mode: 'augmentation', jobs: { en: 'Radiologists', zh: '放射科医生' }, reason: { en: 'BLS predicts +5% growth, AI as assistant', zh: 'BLS预测+5%增长，AI作为助手' } },
  { industry: { en: 'Media / Content', zh: '媒体/内容' }, risk: 50, mode: 'mixed', jobs: { en: 'Copywriting, Basic design', zh: '文案、基础设计' }, reason: { en: 'Low-end replaced, creative enhanced', zh: '低端被替代，创意岗位增强' } },
];

const modeConfig: Record<string, { color: string; label: { en: string; zh: string }; icon: any }> = {
  'high-replacement': { color: '#ff2d37', label: { en: '🔴 High Replacement', zh: '🔴 高替代' }, icon: AlertTriangle },
  'mixed': { color: '#ff9500', label: { en: '🟡 Mixed Impact', zh: '🟡 混合影响' }, icon: RefreshCw },
  'collaboration': { color: '#30d158', label: { en: '🟢 Collaboration', zh: '🟢 协作' }, icon: Users },
  'augmentation': { color: '#30d158', label: { en: '🟢 Strong Augmentation', zh: '🟢 强增强' }, icon: TrendingUp },
};

const netImpactData = [
  {
    source: { en: 'WEF Future of Jobs 2025', zh: 'WEF 就业未来报告 2025' },
    displaced: '92M',
    created: '170M',
    net: '+78M',
    color: '#30d158'
  },
  {
    source: { en: 'PwC Global AI Jobs Barometer', zh: 'PwC 全球 AI 就业晴雨表' },
    exposedGrowth: '38%',
    nonExposedGrowth: '65%',
    wagePremium: '56%',
    color: '#64d2ff'
  },
];

const industryDiveData = [
  {
    id: 'manufacturing',
    title: { en: 'Manufacturing', zh: '制造业' },
    mode: 'collaboration',
    desc: { en: 'Human-machine collaboration', zh: '人机协作增强' },
    jobs: { en: 'Quality inspection, monitoring', zh: '质检、监控' },
    trend: { en: 'No mass layoffs, stable employment', zh: '无大规模裁员，就业稳定' },
    source: { en: 'BLS Manufacturing Trends 2025', zh: 'BLS 制造业趋势 2025' }
  },
  {
    id: 'finance',
    title: { en: 'Finance & Banking', zh: '金融银行业' },
    mode: 'mixed',
    desc: { en: 'Low-end replaced, high-end enhanced', zh: '低端替代、高端增强' },
    jobs: { en: 'Junior analysts, loan officers', zh: '初级分析师、信贷员' },
    trend: { en: '6-7% jobs replacable (Goldman Sachs)', zh: '6-7%可替代（高盛）' },
    source: { en: 'Goldman Sachs Economic Research', zh: '高盛经济研究' }
  },
  {
    id: 'healthcare',
    title: { en: 'Healthcare', zh: '医疗健康' },
    mode: 'augmentation',
    desc: { en: 'Strong augmentation, weak replacement', zh: '强增强、弱替代' },
    jobs: { en: 'Radiologists, diagnostic support', zh: '放射科、诊断辅助' },
    trend: { en: '+5% growth predicted (2024-2034)', zh: '预测 +5% 增长 (2024-2034)' },
    source: { en: 'CNN/BLS Employment Projections', zh: 'CNN/BLS 就业预测' }
  },
  {
    id: 'education',
    title: { en: 'Education', zh: '教育' },
    mode: 'augmentation',
    desc: { en: 'Clear enhancement', zh: '明显增强' },
    jobs: { en: 'K-12 teachers, faculty', zh: '中小学教师、大学教师' },
    trend: { en: '60% use AI, save 5.9hrs/week', zh: '60%使用AI，每周省5.9小时' },
    source: { en: 'Gallup Education Poll 2024-2025', zh: 'Gallup 教育民调 2024-2025' }
  },
  {
    id: 'media',
    title: { en: 'Media & Content', zh: '媒体内容' },
    mode: 'mixed',
    desc: { en: 'Low-end replaced, creative enhanced', zh: '低端被替代，创意增强' },
    jobs: { en: 'Copywriters, basic designers', zh: '文案、基础设计' },
    trend: { en: 'Industry growing despite AI', zh: '尽管有AI，行业仍在增长' },
    source: { en: 'WEF Media Report 2025', zh: 'WEF 媒体报告 2025' }
  },
  {
    id: 'customer-service',
    title: { en: 'Customer Service', zh: '客户服务' },
    mode: 'high-replacement',
    desc: { en: 'High replacement ratio', zh: '高比例替代' },
    jobs: { en: 'Phone support, online chat', zh: '电话客服、在线客服' },
    trend: { en: '80% queries handled by AI by 2025', zh: '2025年80%询问由AI处理' },
    source: { en: 'Okoone AI Trends 2025', zh: 'Okoone AI 趋势 2025' }
  },
  {
    id: 'software',
    title: { en: 'Software Development', zh: '软件开发' },
    mode: 'mixed',
    desc: { en: 'Junior compressed, senior enhanced', zh: '初级压缩、资深增强' },
    jobs: { en: 'Junior developers, QA engineers', zh: '初级开发者、QA工程师' },
    trend: { en: 'Young -20%, overall +17.9% growth', zh: '年轻-20%，整体+17.9%增长' },
    source: { en: 'Stanford & BLS Data', zh: '斯坦福 & BLS 数据' }
  },
];

// 高风险职业板块
function HighRiskJobsSection({ lang, t }: { lang: Language; t: typeof translations.en }) {
  return (
    <section className="py-20 px-6 bg-surface">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold text-center mb-4"
        >
          {t.highRiskTitle}
        </motion.h2>
        <p className="text-center text-foreground-muted mb-16 max-w-2xl mx-auto">
          {t.highRiskSubtitle}
        </p>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-surface-elevated">
                <th className="text-left py-4 px-4">{t.industry}</th>
                <th className="text-left py-4 px-4">{t.tableRiskLevel}</th>
                <th className="text-left py-4 px-4">{t.highRiskJobs}</th>
                <th className="text-left py-4 px-4">AI Impact Mode</th>
                <th className="text-left py-4 px-4">{t.evidence}</th>
              </tr>
            </thead>
            <tbody>
              {highRiskJobs.map((job, index) => {
                const config = modeConfig[job.mode];
                const Icon = config.icon;
                return (
                  <motion.tr
                    key={job.industry.en}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-surface-elevated hover:bg-surface-elevated/50 transition-colors"
                  >
                    <td className="py-4 px-4 font-semibold">{job.industry[lang]}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-surface rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${job.risk}%` }}
                            viewport={{ once: true }}
                            className="h-full"
                            style={{ backgroundColor: config.color }}
                          />
                        </div>
                        <span className="font-bold mono" style={{ color: config.color }}>{job.risk}%</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-foreground-muted">{job.jobs[lang]}</td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium`} style={{ backgroundColor: config.color + '20', color: config.color }}>
                        <Icon className="w-3 h-3" />
                        <span>{config.label[lang]}</span>
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm text-foreground-muted">{job.reason[lang]}</td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 bg-risk-high/10 border border-risk-high/30 rounded-xl p-6 text-center"
        >
          <Flame className="w-8 h-8 text-risk-high mx-auto mb-4 animate-pulse-glow" />
          <p className="text-lg font-semibold text-risk-high">
            {t.pickSoftTargets}
          </p>
          <p className="text-foreground-muted mt-2">
            {t.pickSoftTargetsDesc}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// 企业裁员案例板块
function LayoffCasesSection({ lang, t }: { lang: Language; t: typeof translations.en }) {
  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold text-center mb-4"
        >
          {t.layoffTitle}
        </motion.h2>
        <p className="text-center text-foreground-muted mb-4 max-w-2xl mx-auto">
          {t.layoffSubtitle}
        </p>
        <p className="text-center text-risk-high font-semibold mb-16">
          "{t.takenOver}"
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {layoffCases.map((case_, index) => (
            <motion.div
              key={case_.company.en}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-surface rounded-xl p-6 border border-surface-elevated card-hover"
            >
              <div className="flex items-center gap-3 mb-4">
                <Building2 className="w-8 h-8 text-risk-high" />
                <div>
                  <h3 className="font-bold text-xl">{case_.company[lang]}</h3>
                  <span className="text-xs text-foreground-muted">{case_.industry[lang]}</span>
                </div>
              </div>
              <div className="text-4xl font-bold text-risk-high mono mb-3">{case_.layoffs}</div>
              <div className="text-sm text-foreground-muted mb-2">{t.jobsCut}</div>
              <div className="text-sm p-3 bg-background/50 rounded border border-surface-elevated">
                <span className="text-risk-high font-medium">{t.reason}: </span>{case_.reason[lang]}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-foreground-muted">{t.oneInTwenty}</p>
          <p className="text-sm text-foreground-muted mt-2">{t.source}</p>
        </motion.div>
      </div>
    </section>
  );
}

// 净就业效应板块
function NetJobImpactSection({ lang, t }: { lang: Language; t: typeof translations.en }) {
  return (
    <section className="py-20 px-6 bg-surface">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold text-center mb-4"
        >
          {t.netImpactTitle}
        </motion.h2>
        <p className="text-center text-foreground-muted mb-16 max-w-2xl mx-auto">
          {t.netImpactSubtitle}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {netImpactData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-background rounded-xl p-6 border-2"
              style={{ borderColor: item.color + '30' }}
            >
              <h3 className="font-bold text-sm mb-4" style={{ color: item.color }}>{item.source[lang]}</h3>
              {item.displaced && (
                <>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-foreground-muted">{t.wefDisplaced}:</span>
                    <span className="text-lg font-bold text-risk-high">{item.displaced}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-foreground-muted">{t.wefCreated}:</span>
                    <span className="text-lg font-bold text-risk-low">{item.created}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-surface-elevated">
                    <span className="text-xs text-foreground-muted">{t.wefNet}:</span>
                    <span className="text-xl font-bold text-risk-low">{item.net}</span>
                  </div>
                </>
              )}
              {item.exposedGrowth && (
                <>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-foreground-muted">{t.pwcExposedGrowth}:</span>
                    <span className="text-lg font-bold" style={{ color: item.color }}>{item.exposedGrowth}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-foreground-muted">{t.pwcNonExposedGrowth}:</span>
                    <span className="text-lg font-bold text-foreground-muted">{item.nonExposedGrowth}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-surface-elevated">
                    <span className="text-xs text-foreground-muted">{t.pwcWagePremium}:</span>
                    <span className="text-lg font-bold text-data-blue">{item.wagePremium}</span>
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="bg-surface-elevated/50 border border-surface-elevated rounded-xl p-6"
        >
          <div className="flex items-start gap-4">
            <Info className="w-6 h-6 text-data-blue flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-bold text-foreground mb-2">{t.theReality}</h4>
              <p className="text-foreground-muted">{t.theRealityText}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// 行业深度分析板块
function IndustryDeepDiveSection({ lang, t }: { lang: Language; t: typeof translations.en }) {
  const [selectedIndustry, setSelectedIndustry] = useState(0);

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold text-center mb-4"
        >
          {t.industryDiveTitle}
        </motion.h2>
        <p className="text-center text-foreground-muted mb-12 max-w-2xl mx-auto">
          {t.industryDiveSubtitle}
        </p>

        {/* 行业标签 */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {industryDiveData.map((industry, index) => {
            const Icon = modeConfig[industry.mode].icon;
            return (
              <button
                key={index}
                onClick={() => setSelectedIndustry(index)}
                className={`px-4 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
                  selectedIndustry === index
                    ? 'bg-risk-high text-white shadow-lg shadow-risk-high/30'
                    : 'bg-surface hover:bg-surface-elevated text-foreground'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{industry.title[lang]}</span>
              </button>
            );
          })}
        </div>

        {/* 行业详情 */}
        <motion.div
          key={selectedIndustry}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-surface rounded-2xl p-8 border border-surface-elevated"
        >
          {(() => {
            const industry = industryDiveData[selectedIndustry];
            const config = modeConfig[industry.mode];
            const Icon = config.icon;

            return (
              <>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-xl flex items-center justify-center" style={{ backgroundColor: config.color + '20' }}>
                    <Icon className="w-8 h-8" style={{ color: config.color }} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-1">{industry.title[lang]}</h3>
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium`} style={{ backgroundColor: config.color + '20', color: config.color }}>
                      <span>{config.label[lang]}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="bg-background/50 rounded-lg p-4 border border-surface-elevated">
                      <div className="text-xs text-foreground-muted mb-1">主导模式</div>
                      <div className="font-semibold">{industry.desc[lang]}</div>
                    </div>
                    <div className="bg-background/50 rounded-lg p-4 border border-surface-elevated">
                      <div className="text-xs text-foreground-muted mb-1">典型岗位</div>
                      <div className="font-semibold">{industry.jobs[lang]}</div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-background/50 rounded-lg p-4 border border-surface-elevated">
                      <div className="text-xs text-foreground-muted mb-1">就业趋势</div>
                      <div className="font-semibold text-foreground">{industry.trend[lang]}</div>
                    </div>
                    <div className="bg-background/50 rounded-lg p-4 border border-surface-elevated">
                      <div className="text-xs text-foreground-muted mb-1">数据来源</div>
                      <div className="text-xs text-foreground-muted">{industry.source[lang]}</div>
                    </div>
                  </div>
                </div>
              </>
            );
          })()}
        </motion.div>
      </div>
    </section>
  );
}

// 职业分化板块
function CareerDivergenceSection({ lang, t }: { lang: Language; t: typeof translations.en }) {
  return (
    <section className="py-20 px-6 bg-surface">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold text-center mb-4"
        >
          {t.divergenceTitle}
        </motion.h2>
        <p className="text-center text-foreground-muted mb-4 max-w-2xl mx-auto">
          {t.divergenceSubtitle}
        </p>
        <p className="text-center text-xs text-foreground-muted mb-16">
          {t.divergenceSource}
        </p>

        {/* 技能转移卡片 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 bg-gradient-to-br from-risk-high/10 to-risk-medium/10 rounded-2xl p-8 border border-risk-high/30"
        >
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <Brain className="w-7 h-7 text-risk-high" />
            {t.skillShiftTitle}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-background/50 rounded-lg p-4 border border-risk-high/20">
              <div className="text-xs text-foreground-muted mb-2">OLD</div>
              <div className="font-semibold text-foreground-muted">{t.skillShiftOld}</div>
            </div>
            <div className="bg-background/50 rounded-lg p-4 border border-risk-low/30">
              <div className="text-xs text-foreground-muted mb-2">NEW</div>
              <div className="font-semibold text-risk-low">{t.skillShiftNew}</div>
            </div>
          </div>
          <div className="bg-background/30 rounded-lg p-4">
            <div className="text-sm text-foreground-muted mb-3">{t.skillShiftCapabilities}</div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-risk-low flex-shrink-0" />
                <span>{t.skillShiftCap1}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-risk-low flex-shrink-0" />
                <span>{t.skillShiftCap2}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-risk-low flex-shrink-0" />
                <span>{t.skillShiftCap3}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-risk-low flex-shrink-0" />
                <span>{t.skillShiftCap4}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 时间对比 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
            <Clock className="w-6 h-6 text-risk-high" />
            {t.timeComparisonTitle}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-surface-elevated/50 rounded-lg p-5 border border-surface-elevated">
              <div className="text-xs text-foreground-muted mb-2">{t.timeYearAgo}</div>
              <div className="text-sm">{t.timeYearAgoDesc}</div>
            </div>
            <div className="bg-risk-high/20 rounded-lg p-5 border border-risk-high/30">
              <div className="text-xs text-risk-high font-bold mb-2">{t.timeNow}</div>
              <div className="text-sm text-foreground">{t.timeNowDesc}</div>
            </div>
            <div className="bg-risk-medium/20 rounded-lg p-5 border border-risk-medium/30">
              <div className="text-xs text-risk-medium font-bold mb-2">{t.timeGap}</div>
              <div className="text-sm">{t.timeGapDesc}</div>
            </div>
          </div>
        </motion.div>

        {/* 舒适陷阱 & 被动杠杆 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-surface rounded-lg p-6 border border-surface-elevated"
          >
            <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-risk-high" />
              {t.comfortTrapTitle}
            </h4>
            <p className="text-sm text-foreground-muted mb-4">{t.comfortTrapDesc}</p>
            <div className="bg-background/50 rounded p-3 border-l-4 border-risk-high">
              <p className="text-sm italic text-foreground-muted">"{t.comfortTrapQuote}"</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-surface rounded-lg p-6 border border-surface-elevated"
          >
            <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
              <Zap className="w-5 h-5 text-risk-low" />
              {t.passiveLeverageTitle}
            </h4>
            <p className="text-sm text-foreground-muted mb-4">{t.passiveLeverageDesc}</p>
            <div className="bg-background/50 rounded p-3 border-l-4 border-risk-low">
              <p className="text-sm italic text-foreground-muted">"{t.passiveLeverageQuote}"</p>
            </div>
          </motion.div>
        </div>

        {/* 赢家公司特征 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mb-12 bg-risk-low/10 rounded-lg p-6 border border-risk-low/30"
        >
          <h4 className="font-bold text-lg mb-4">{t.winningCompaniesTitle}</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex items-start gap-3">
              <ArrowUpRight className="w-5 h-5 text-risk-low flex-shrink-0 mt-0.5" />
              <span className="text-sm">{t.winningComp1}</span>
            </div>
            <div className="flex items-start gap-3">
              <ArrowUpRight className="w-5 h-5 text-risk-low flex-shrink-0 mt-0.5" />
              <span className="text-sm">{t.winningComp2}</span>
            </div>
            <div className="flex items-start gap-3">
              <ArrowUpRight className="w-5 h-5 text-risk-low flex-shrink-0 mt-0.5" />
              <span className="text-sm">{t.winningComp3}</span>
            </div>
            <div className="flex items-start gap-3">
              <ArrowUpRight className="w-5 h-5 text-risk-low flex-shrink-0 mt-0.5" />
              <span className="text-sm">{t.winningComp4}</span>
            </div>
          </div>
        </motion.div>

        {/* 关键洞察 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-risk-high/20 to-risk-medium/20 rounded-lg p-6 border border-risk-high/30"
        >
          <div className="flex items-start gap-4">
            <Brain className="w-6 h-6 text-risk-high flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-bold text-risk-high mb-2">{t.divergenceInsight}</h4>
              <p className="text-foreground">{t.divergenceInsightText}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// 主页面
export default function AnalysisPage() {
  const [lang, setLang] = useState<Language>('en');
  const [theme, setTheme] = useState<Theme>('dark');
  const t = translations[lang];

  useEffect(() => {
    const saved = (localStorage.getItem('air-theme') as Theme) || 'dark';
    setTheme(saved);
    document.documentElement.setAttribute('data-theme', saved);
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Global navigation controls */}
      <div
        className="fixed z-[96] flex flex-col gap-2"
        style={{ top: 'calc(var(--safe-top) + 1rem)', right: 'calc(var(--safe-right) + 1rem)' }}
      >
        <SharedLanguageButton lang={lang} setLang={setLang} />
        <ThemeButton theme={theme} setTheme={setTheme} />
        <Link href="/#risk-calculator">
          <motion.div
            className="flex items-center justify-center w-10 h-10 bg-surface-elevated hover:bg-risk-critical/80 text-foreground hover:text-white rounded-lg border border-surface-elevated transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Target className="w-5 h-5" />
          </motion.div>
        </Link>
      </div>

      {/* 页面标题 */}
      <section className="py-20 px-6 bg-gradient-to-br from-surface to-background border-b border-surface-elevated">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <Link href="/" className="inline-flex items-center gap-2 text-foreground-muted hover:text-foreground transition-colors">
              <span>{t.backToHome}</span>
            </Link>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            {t.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-foreground-muted max-w-2xl mx-auto"
          >
            {t.subtitle}
          </motion.p>
        </div>
      </section>

      {/* 五大板块 */}
      <HighRiskJobsSection lang={lang} t={t} />
      <LayoffCasesSection lang={lang} t={t} />
      <NetJobImpactSection lang={lang} t={t} />
      <IndustryDeepDiveSection lang={lang} t={t} />
      <CareerDivergenceSection lang={lang} t={t} />
    </main>
  );
}
