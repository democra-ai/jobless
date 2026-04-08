import { ImageResponse } from 'next/og';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { decodeSharePayload, type SharePayload } from '@/lib/share_payload';

export const contentType = 'image/png';
export const size = { width: 1200, height: 630 };
export const alt = 'AIR Share Result';

type Props = { params: Promise<{ payload: string }> };

function pal(lv: SharePayload['riskLevel']) {
  const p: Record<string, { m: string }> = {
    'very-low': { m: '#34d399' }, 'low': { m: '#4ade80' }, 'medium': { m: '#fbbf24' },
    'high': { m: '#fb923c' }, 'critical': { m: '#f43f5e' },
  };
  return p[lv] || p.critical;
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

async function loadCharacterImage(code: string): Promise<string | null> {
  try {
    const filePath = join(process.cwd(), 'public', 'characters', `${code}.png`);
    const buf = await readFile(filePath);
    return `data:image/png;base64,${buf.toString('base64')}`;
  } catch {
    return null;
  }
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
  const charImgSrc = profileCode ? await loadCharacterImage(profileCode) : null;

  const dims = profileCode
    ? profileCode.split('').map((letter, i) => ({ letter, name: dimNames[letter]?.[zh ? 'zh' : 'en'] ?? '', color: DIMENSION_COLORS[i] }))
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
      width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
      background: '#0f0d0b', fontFamily: 'sans-serif', position: 'relative', overflow: 'hidden', color: '#f5f3f0',
      padding: '36px 48px',
    }}>
      {/* Subtle glow */}
      <div style={{ position: 'absolute', top: -60, right: '20%', width: 400, height: 300, borderRadius: '50%', display: 'flex', background: `radial-gradient(circle, ${c.m}0c 0%, transparent 65%)` }} />

      {/* ── Header ── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 3, height: 18, background: c.m, display: 'flex' }} />
          <span style={{ fontSize: 13, fontWeight: 800, letterSpacing: 4, color: c.m }}>AI REPLACEMENT INDEX</span>
        </div>
        <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)' }}>air.democra.ai</span>
      </div>

      {/* ── Hero: Character + Identity + Metrics ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 32, marginBottom: 28 }}>
        {charImgSrc && (
          <div style={{ width: 160, height: 160, flexShrink: 0, display: 'flex', borderRadius: 16, overflow: 'hidden' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={charImgSrc} alt="" width={160} height={160} style={{ objectFit: 'cover' }} />
          </div>
        )}
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          {archName && (
            <span style={{ fontSize: 48, fontWeight: 900, color: c.m, lineHeight: 1, letterSpacing: -1 }}>{archName}</span>
          )}
          {profileCode && (
            <span style={{ fontSize: 16, fontWeight: 700, letterSpacing: 6, color: `${c.m}55`, marginTop: 6 }}>{profileCode}</span>
          )}
          {tagline && (
            <span style={{ fontSize: 15, color: 'rgba(255,255,255,0.45)', marginTop: 10, lineHeight: 1.4 }}>{tagline}</span>
          )}
          {/* Metrics */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 28, marginTop: 16 }}>
            <div style={{ display: 'flex', alignItems: 'baseline' }}>
              <span style={{ fontSize: 56, fontWeight: 700, color: c.m, lineHeight: 1 }}>{prob}</span>
              <span style={{ fontSize: 22, fontWeight: 700, color: `${c.m}70`, marginLeft: 3 }}>%</span>
            </div>
            <div style={{ width: 1, height: 40, display: 'flex', background: 'rgba(255,255,255,0.06)' }} />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: 56, fontWeight: 700, color: '#f5f3f0', lineHeight: 1 }}>{yr}</span>
              {data.predictedReplacementYear < 2100 && (
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', marginTop: 3 }}>{data.earliestYear}–{data.latestYear}</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Gauge ── */}
      <div style={{ display: 'flex', gap: 3, marginBottom: 20 }}>
        {stages.map((stage, i) => {
          const s = i * 20, e = s + 20;
          const f = prob >= e ? 1 : prob <= s ? 0 : (prob - s) / 20;
          const active = Math.min(Math.floor(prob / 20), 4) === i;
          return (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
              <div style={{ width: '100%', height: 8, borderRadius: 4, display: 'flex', background: 'rgba(255,255,255,0.04)', overflow: 'hidden' }}>
                {f > 0 && <div style={{ width: `${f * 100}%`, height: '100%', borderRadius: 4, display: 'flex', background: stage.color }} />}
              </div>
              <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, color: active ? stage.color : 'rgba(255,255,255,0.12)' }}>
                {zh ? stage.zh : stage.label}
              </span>
            </div>
          );
        })}
      </div>

      <div style={{ height: 1, display: 'flex', background: 'rgba(255,255,255,0.06)', marginBottom: 20 }} />

      {/* ── 4-Dimension strip (full width) ── */}
      {dims.length === 4 && (
        <div style={{ display: 'flex', gap: 0, flex: 1 }}>
          {dims.map((dim, i) => (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', paddingLeft: i > 0 ? 16 : 0, borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
              <div style={{ width: 28, height: 4, borderRadius: 2, background: dim.color, opacity: 0.7, display: 'flex', marginBottom: 8 }} />
              <span style={{ fontSize: 28, fontWeight: 700, color: dim.color, lineHeight: 1 }}>{dim.letter}</span>
              <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', letterSpacing: 1, marginTop: 6 }}>{dim.name}</span>
            </div>
          ))}
        </div>
      )}

      {/* ── CTA (full width at bottom) ── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', padding: '14px 0', borderRadius: 12, background: c.m }}>
          <span style={{ fontSize: 16, fontWeight: 800, color: '#0a0908' }}>
            {zh ? '测测你的风险 →' : "What's your risk? →"}
          </span>
        </div>
      </div>
    </div>,
    { ...size },
  );
}
