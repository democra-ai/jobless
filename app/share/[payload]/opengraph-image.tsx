import { ImageResponse } from 'next/og';
import { decodeSharePayload, type SharePayload } from '@/lib/share_payload';
import { headers } from 'next/headers';

export const runtime = 'edge';
export const contentType = 'image/png';
export const size = { width: 1200, height: 630 };
export const alt = 'AIR Share Result';

type Props = { params: Promise<{ payload: string }> };

function pal(lv: SharePayload['riskLevel']) {
  const p: Record<string, { m: string; a: string }> = {
    'very-low': { m: '#34d399', a: '#059669' },
    'low':      { m: '#4ade80', a: '#16a34a' },
    'medium':   { m: '#fbbf24', a: '#d97706' },
    'high':     { m: '#fb923c', a: '#ea580c' },
    'critical': { m: '#f43f5e', a: '#dc2626' },
  };
  return p[lv] || p.critical;
}

function riskLabel(lv: SharePayload['riskLevel'], zh: boolean) {
  const m: Record<string, [string, string]> = {
    'very-low': ['VERY LOW RISK', '极低风险'], 'low': ['LOW RISK', '低风险'], 'medium': ['MEDIUM RISK', '中等风险'],
    'high': ['HIGH RISK', '高风险'], 'critical': ['CRITICAL RISK', '极高风险'],
  };
  return (m[lv] || m.critical)[zh ? 1 : 0];
}

const profileArchetypes: Record<string, { en: string; zh: string; tagEn: string; tagZh: string }> = {
  EOFP: { en: 'The Glass Cannon', zh: '玻璃大炮', tagEn: 'Your entire workflow is a tutorial for AI', tagZh: '你的整个工作流程就是 AI 的教程' },
  EOFH: { en: 'The Human Bridge', zh: '人脉桥梁', tagEn: 'AI does the work, but they come back for YOU', tagZh: 'AI 能干活，但客户回来找的是你' },
  EORP: { en: 'The Final Stamp', zh: '终审印章', tagEn: 'AI knows the rules — you enforce the consequences', tagZh: 'AI 懂规则，你执行后果' },
  ESFP: { en: 'The Taste Maker', zh: '品味定义者', tagEn: 'AI generates a thousand options — you know which one is right', tagZh: 'AI 生成一千个选项，你知道哪个是对的' },
  TOFP: { en: 'The Bare Hand', zh: '赤手行者', tagEn: "Your hands know things your brain can't explain", tagZh: '你的双手懂得大脑无法解释的东西' },
  EORH: { en: 'The License Wall', zh: '执照之墙', tagEn: 'AI has the knowledge, but not the license on the wall', tagZh: 'AI 有知识，但墙上没有你的执照' },
  ESFH: { en: 'The Living Brand', zh: '活体品牌', tagEn: "AI can mimic your style, but it can't BE you", tagZh: 'AI 能模仿你的风格，但它成不了你' },
  ESRP: { en: 'The Pressure Alchemist', zh: '高压炼金师', tagEn: "When failure isn't an option, they call a human", tagZh: '当失败不是选项时，他们会找一个人类' },
  TOFH: { en: 'The Signature Touch', zh: '签名手艺人', tagEn: "People don't pay for the haircut — they pay for YOUR haircut", tagZh: '人们不是为理发买单——是为你的理发买单' },
  TORP: { en: 'The Steady Hand', zh: '不颤之手', tagEn: "One wrong move and it's over — that's why they need you", tagZh: '一步走错就完了——这就是为什么他们需要你' },
  TSFP: { en: 'The Soul Craftsman', zh: '灵魂匠人', tagEn: 'Your imperfections are what make your work perfect', tagZh: '你的不完美恰恰是作品完美的原因' },
  ESRH: { en: 'The Oracle', zh: '神谕者', tagEn: 'People trust your judgment with their careers, fortunes, and lives', tagZh: '人们把职业、财富和生命交给你的判断' },
  TORH: { en: 'The Healing Hand', zh: '疗愈之手', tagEn: 'When lives are on the line, no one asks for the AI', tagZh: '命悬一线时，没人想要 AI' },
  TSFH: { en: 'The Irreplaceable', zh: '不可替代者', tagEn: "You ARE the product — no one can automate who you are", tagZh: '你就是产品本身——没人能自动化你这个人' },
  TSRP: { en: 'The Last Call', zh: '终极裁决者', tagEn: 'In chaos, you decide who lives — AI freezes', tagZh: '混乱中，你决定谁活——AI 死机了' },
  TSRH: { en: 'The Iron Fortress', zh: '铁壁堡垒', tagEn: "Four walls between you and AI — it can't even see you", tagZh: '你和 AI 之间隔着四道墙——它连你的影子都看不到' },
};

const DIMENSION_COLORS = ['#7c4dff', '#ff6e40', '#5ec6b0', '#ff80ab'];
const FAVORABLE_LETTERS = ['E', 'O', 'F', 'P'];
const dimNames: Record<string, { en: string; zh: string }> = {
  E: { en: 'Learnability', zh: '知识类型' }, T: { en: 'Learnability', zh: '知识类型' },
  O: { en: 'Evaluation', zh: '评判标准' }, S: { en: 'Evaluation', zh: '评判标准' },
  F: { en: 'Risk', zh: '容错空间' }, R: { en: 'Risk', zh: '容错空间' },
  P: { en: 'Presence', zh: '人际依赖' }, H: { en: 'Presence', zh: '人际依赖' },
};

async function resolveOrigin(): Promise<string> {
  const h = await headers();
  const host = h.get('x-forwarded-host') ?? h.get('host');
  if (!host) return process.env.NEXT_PUBLIC_BASE_URL || 'https://air.democra.ai';
  const proto = h.get('x-forwarded-proto') ?? (host.includes('localhost') || host.startsWith('127.0.0.1') ? 'http' : 'https');
  return `${proto}://${host}`;
}

export default async function Image({ params }: Props) {
  const { payload } = await params;
  const data = decodeSharePayload(payload);

  if (!data) {
    return new ImageResponse(
      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', background: '#0a0908', color: '#f5f3f0', fontFamily: 'sans-serif' }}>
        <span style={{ fontSize: 80, fontWeight: 900, letterSpacing: 12 }}>AIR</span>
        <span style={{ fontSize: 22, opacity: 0.4, marginTop: 14, letterSpacing: 4 }}>AI REPLACEMENT INDEX</span>
      </div>, { ...size },
    );
  }

  const zh = data.lang === 'zh';
  const c = pal(data.riskLevel);
  const prob = data.replacementProbability;
  const yr = data.predictedReplacementYear >= 2100 ? '∞' : String(data.predictedReplacementYear);
  const profileCode = (data.v === 2 && 'profileCode' in data && data.profileCode) || null;
  const arch = profileCode ? profileArchetypes[profileCode] : null;
  const archName = arch ? (zh ? arch.zh : arch.en) : null;
  const tagline = arch ? (zh ? arch.tagZh : arch.tagEn) : null;
  const origin = await resolveOrigin();
  const charImgUrl = profileCode ? `${origin}/characters/${profileCode}.png` : null;

  const dims = profileCode
    ? profileCode.split('').map((letter, i) => ({
        letter,
        name: dimNames[letter]?.[zh ? 'zh' : 'en'] ?? '',
        color: DIMENSION_COLORS[i],
        isFavorable: letter === FAVORABLE_LETTERS[i],
      }))
    : [];

  const stages = [
    { label: 'SAFE', zh: '安全', color: '#34d399' },
    { label: 'ASSIST', zh: '辅助', color: '#4ade80' },
    { label: 'AGENT', zh: '代理', color: '#fbbf24' },
    { label: 'LEAD', zh: '主导', color: '#fb923c' },
    { label: 'KILL', zh: '斩杀', color: '#f43f5e' },
  ];

  return new ImageResponse(
    <div style={{
      width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: '#0a0908', fontFamily: 'sans-serif', position: 'relative', overflow: 'hidden',
    }}>
      {/* Background grid */}
      {Array.from({ length: 13 }).map((_, i) => (
        <div key={`h${i}`} style={{ position: 'absolute', left: 0, right: 0, top: i * 50, height: 1, display: 'flex', background: 'rgba(255,255,255,0.04)' }} />
      ))}
      {Array.from({ length: 25 }).map((_, i) => (
        <div key={`v${i}`} style={{ position: 'absolute', top: 0, bottom: 0, left: i * 50, width: 1, display: 'flex', background: 'rgba(255,255,255,0.04)' }} />
      ))}

      {/* Glow */}
      <div style={{ position: 'absolute', top: -100, left: '40%', width: 400, height: 400, borderRadius: '50%', display: 'flex', background: `radial-gradient(circle, ${c.m}12 0%, transparent 65%)` }} />

      {/* ═══ THE CARD ═══ */}
      <div style={{
        display: 'flex', flexDirection: 'column', width: 540, background: '#110f0d',
        border: `1px solid ${c.m}22`, borderRadius: 16, overflow: 'hidden', position: 'relative',
      }}>
        {/* Top border accent */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, display: 'flex', background: `linear-gradient(90deg, transparent, ${c.m}60, transparent)` }} />

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 2, height: 12, background: c.m, display: 'flex' }} />
            <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: 3, color: c.m }}>AI REPLACEMENT INDEX</span>
          </div>
          <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.2)' }}>air.democra.ai</span>
        </div>

        {/* Hero: Character + Identity */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '16px 24px' }}>
          {charImgUrl && (
            <div style={{ width: 100, height: 100, flexShrink: 0, display: 'flex', borderRadius: 12, overflow: 'hidden' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={charImgUrl} alt="" width={100} height={100} style={{ objectFit: 'contain' }} />
            </div>
          )}
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            {archName && (
              <span style={{ fontSize: 28, fontWeight: 900, color: c.m, lineHeight: 1, letterSpacing: -0.5 }}>{archName}</span>
            )}
            {profileCode && (
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 5, color: `${c.m}66`, marginTop: 4 }}>{profileCode}</span>
            )}
            {tagline && (
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 6, lineHeight: 1.4, fontStyle: 'italic' }}>
                &ldquo;{tagline}&rdquo;
              </span>
            )}
          </div>
        </div>

        {/* Gauge strip */}
        <div style={{ display: 'flex', gap: 2, padding: '0 24px', marginBottom: 12 }}>
          {stages.map((stage, i) => {
            const s = i * 20, e = s + 20;
            const f = prob >= e ? 1 : prob <= s ? 0 : (prob - s) / 20;
            const active = Math.min(Math.floor(prob / 20), 4) === i;
            return (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <div style={{ width: '100%', height: 5, borderRadius: 3, display: 'flex', background: 'rgba(255,255,255,0.04)', overflow: 'hidden' }}>
                  {f > 0 && <div style={{ width: `${f * 100}%`, height: '100%', borderRadius: 3, display: 'flex', background: stage.color }} />}
                </div>
                <span style={{ fontSize: 7, fontWeight: 800, letterSpacing: 2, color: active ? stage.color : 'rgba(255,255,255,0.12)' }}>
                  {zh ? stage.zh : stage.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Divider */}
        <div style={{ height: 1, margin: '0 24px', display: 'flex', background: 'rgba(255,255,255,0.06)' }} />

        {/* Metrics */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 24, padding: '14px 24px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline' }}>
            <span style={{ fontSize: 40, fontWeight: 700, color: c.m, lineHeight: 1 }}>{prob}</span>
            <span style={{ fontSize: 16, fontWeight: 700, color: `${c.m}80`, marginLeft: 2 }}>%</span>
          </div>
          <div style={{ width: 1, height: 30, display: 'flex', background: 'rgba(255,255,255,0.06)' }} />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: 40, fontWeight: 700, color: '#f5f3f0', lineHeight: 1 }}>{yr}</span>
            {data.predictedReplacementYear < 2100 && (
              <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.25)', marginTop: 2 }}>{data.earliestYear}–{data.latestYear}</span>
            )}
          </div>
          <div style={{ display: 'flex', flex: 1 }} />
          <div style={{ display: 'flex', padding: '6px 14px', borderRadius: 100, border: `1px solid ${c.m}40`, background: `${c.m}10` }}>
            <span style={{ fontSize: 11, fontWeight: 800, color: c.m, letterSpacing: 1 }}>{riskLabel(data.riskLevel, zh)}</span>
          </div>
        </div>

        {/* 4-Dimension strip */}
        {dims.length === 4 && (
          <>
            <div style={{ height: 1, margin: '0 24px', display: 'flex', background: 'rgba(255,255,255,0.04)' }} />
            <div style={{ display: 'flex', padding: '12px 24px', gap: 0 }}>
              {dims.map((dim, i) => (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', paddingLeft: i > 0 ? 12 : 0, borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                  <div style={{ width: 20, height: 3, borderRadius: 2, background: dim.color, opacity: 0.6, display: 'flex', marginBottom: 6 }} />
                  <span style={{ fontSize: 18, fontWeight: 700, color: dim.color, lineHeight: 1 }}>{dim.letter}</span>
                  <span style={{ fontSize: 7, color: 'rgba(255,255,255,0.3)', letterSpacing: 1, marginTop: 4, textTransform: 'uppercase' as const }}>{dim.name}</span>
                </div>
              ))}
            </div>
          </>
        )}

        {/* CTA bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '12px 24px 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', padding: '10px 0', borderRadius: 10, background: c.m }}>
            <span style={{ fontSize: 13, fontWeight: 800, color: '#0a0908' }}>
              {zh ? '测测你的风险 →' : "What's your risk? →"}
            </span>
          </div>
        </div>
      </div>
    </div>,
    { ...size },
  );
}
