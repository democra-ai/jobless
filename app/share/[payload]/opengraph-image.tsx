import { ImageResponse } from 'next/og';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { decodeSharePayload, type SharePayload } from '@/lib/share_payload';
import { PROFILE_TYPES, QUIZ_DIMENSIONS } from '@/lib/air_quiz_data';
import { PROFILE_CAREERS } from '@/lib/air_career_data';
import { generateAdvice } from '@/lib/air_advice_data';

export const contentType = 'image/png';
export const size = { width: 1200, height: 630 };
export const alt = 'AIR Share Result';

type Props = { params: Promise<{ payload: string }> };
type L10n = { en: string; zh: string; ja?: string; ko?: string; de?: string };

function L(obj: L10n, lang: string): string {
  return (obj as Record<string, string>)[lang] ?? obj.en;
}

function pal(lv: SharePayload['riskLevel']) {
  const p: Record<string, string> = { 'very-low': '#34d399', 'low': '#4ade80', 'medium': '#fbbf24', 'high': '#fb923c', 'critical': '#f43f5e' };
  return p[lv] || p.critical;
}

const DIMENSION_COLORS = ['#7c4dff', '#ff6e40', '#5ec6b0', '#ff80ab'];
const FAVORABLE_LETTERS = ['E', 'O', 'F', 'P'];

async function loadCharImg(code: string): Promise<string | null> {
  try {
    const buf = await readFile(join(process.cwd(), 'public', 'characters', `${code}.png`));
    return `data:image/png;base64,${buf.toString('base64')}`;
  } catch { return null; }
}

export default async function Image({ params }: Props) {
  const { payload } = await params;
  const data = decodeSharePayload(payload);

  if (!data) {
    return new ImageResponse(
      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0908', color: '#f5f3f0', fontFamily: 'sans-serif' }}>
        <span style={{ fontSize: 80, fontWeight: 900, letterSpacing: 12 }}>AIR</span>
      </div>, { ...size },
    );
  }

  const lang = data.lang;
  const zh = lang === 'zh';
  const ac = pal(data.riskLevel);
  const prob = data.replacementProbability;
  const yr = data.predictedReplacementYear >= 2100 ? '∞' : String(data.predictedReplacementYear);
  const pc = (data.v === 2 && 'profileCode' in data && data.profileCode) || null;
  const profile = pc ? PROFILE_TYPES[pc] : null;
  const charImg = pc ? await loadCharImg(pc) : null;
  const careers = pc ? (PROFILE_CAREERS[pc] || []).slice(0, 3) : [];

  const dims = pc ? pc.split('').map((letter, i) => {
    const qd = QUIZ_DIMENSIONS[i];
    const fav = letter === FAVORABLE_LETTERS[i];
    return { letter, dimensionId: qd?.id ?? '', isFavorable: fav, name: qd ? L(qd.name as L10n, lang) : '', label: qd ? L((fav ? qd.favorableLabel : qd.resistantLabel) as L10n, lang) : '', color: DIMENSION_COLORS[i] };
  }) : [];

  const adviceList = pc ? generateAdvice(dims.map(d => ({ dimensionId: d.dimensionId, isFavorable: d.isFavorable }))).slice(0, 3) : [];

  const stages = [
    { label: 'SAFE', zh: '安全', color: '#34d399' },
    { label: 'ASSIST', zh: '辅助', color: '#4ade80' },
    { label: 'AGENT', zh: '代理', color: '#fbbf24' },
    { label: 'LEAD', zh: '主导', color: '#fb923c' },
    { label: 'KILL', zh: '斩杀', color: '#f43f5e' },
  ];

  // The entire 1200x630 is the card. Every row uses flex to fill available space.
  return new ImageResponse(
    <div style={{
      width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
      background: '#0f0d0b', fontFamily: 'sans-serif', color: '#f5f3f0',
      padding: '28px 36px', position: 'relative', overflow: 'hidden',
    }}>
      {/* Glow */}
      <div style={{ position: 'absolute', top: -80, right: '20%', width: 500, height: 350, borderRadius: '50%', display: 'flex', background: `radial-gradient(circle, ${ac}0e 0%, transparent 65%)` }} />

      {/* ROW 1: Header + QR */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 4, height: 20, background: ac, display: 'flex' }} />
          <span style={{ fontSize: 16, fontWeight: 800, letterSpacing: 4, color: ac }}>AI REPLACEMENT INDEX</span>
        </div>
        {/* QR code for air.democra.ai */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)', letterSpacing: 1 }}>air.democra.ai</span>
          <div style={{ display: 'flex', flexDirection: 'column', padding: 3, background: '#fff', borderRadius: 4 }}>
            {([
              [1,1,1,1,1,1,1,0,1,1,1,1,0,1,0,0,0,0,1,1,1,1,1,1,1],
              [1,0,0,0,0,0,1,0,0,0,0,1,1,0,1,0,1,0,1,0,0,0,0,0,1],
              [1,0,1,1,1,0,1,0,0,1,0,1,0,1,0,0,1,0,1,0,1,1,1,0,1],
              [1,0,1,1,1,0,1,0,0,0,1,1,0,1,0,0,1,0,1,0,1,1,1,0,1],
              [1,0,1,1,1,0,1,0,0,0,1,1,1,0,1,0,1,0,1,0,1,1,1,0,1],
              [1,0,0,0,0,0,1,0,0,1,0,1,0,0,0,0,0,0,1,0,0,0,0,0,1],
              [1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1],
              [0,0,0,0,0,0,0,0,1,1,0,0,1,1,0,1,1,0,0,0,0,0,0,0,0],
              [1,1,0,1,1,0,1,0,0,1,0,0,1,0,0,0,1,0,1,0,0,0,0,0,1],
              [0,1,1,0,0,0,0,0,1,0,1,0,0,1,1,1,0,0,0,1,1,1,1,1,0],
              [0,0,0,1,1,0,1,1,0,1,0,0,1,1,0,1,1,1,0,1,1,1,0,0,1],
              [0,1,1,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,1,1,1,1],
              [0,0,0,1,1,0,1,1,1,1,1,0,0,0,0,0,1,0,1,1,0,0,0,0,1],
              [1,0,0,1,0,1,0,1,1,1,1,0,1,1,1,1,1,1,0,0,1,0,0,1,0],
              [1,1,1,1,0,1,1,0,1,0,0,0,0,1,0,1,0,0,1,0,1,1,1,1,1],
              [1,0,1,1,0,1,0,1,1,0,1,0,1,0,0,0,0,0,0,1,0,1,1,0,1],
              [1,0,1,0,1,1,1,1,0,0,0,1,1,1,0,1,1,1,1,1,1,0,1,1,0],
              [0,0,0,0,0,0,0,0,1,0,0,1,0,1,0,0,1,0,0,0,1,0,1,1,0],
              [1,1,1,1,1,1,1,0,0,0,0,0,1,1,1,0,1,0,1,0,1,0,0,0,1],
              [1,0,0,0,0,0,1,0,0,1,0,1,0,1,0,1,1,0,0,0,1,0,0,0,0],
              [1,0,1,1,1,0,1,0,1,0,0,1,0,1,0,1,1,1,1,1,1,0,0,1,1],
              [1,0,1,1,1,0,1,0,1,0,0,0,1,1,1,0,1,0,1,0,0,0,0,1,1],
              [1,0,1,1,1,0,1,0,0,1,0,1,0,1,0,0,0,1,0,0,1,1,1,1,1],
              [1,0,0,0,0,0,1,0,1,1,0,1,1,1,0,0,0,0,0,1,1,0,1,1,1],
              [1,1,1,1,1,1,1,0,1,0,1,1,1,1,0,0,1,1,0,0,0,1,0,0,1],
            ] as number[][]).map((row, y) => (
              <div key={y} style={{ display: 'flex' }}>
                {row.map((cell, x) => (
                  <div key={x} style={{ width: 2.5, height: 2.5, display: 'flex', background: cell ? '#000' : '#fff' }} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ROW 2: Hero — flex:4, character + identity + metrics + careers */}
      <div style={{ display: 'flex', gap: 28, flex: 4, marginTop: 12 }}>
        {charImg && (
          <div style={{ width: 200, height: 200, flexShrink: 0, display: 'flex', borderRadius: 22, overflow: 'hidden', alignSelf: 'center' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={charImg} alt="" width={200} height={200} style={{ objectFit: 'cover' }} />
          </div>
        )}
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center' }}>
          {/* Name + Code on same line */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
            {profile && <span style={{ fontSize: 56, fontWeight: 900, color: ac, lineHeight: 1 }}>{L(profile.archetype as L10n, lang)}</span>}
            {pc && <span style={{ fontSize: 34, fontWeight: 800, letterSpacing: 8, color: `${ac}bb` }}>{pc}</span>}
          </div>
          {profile && <span style={{ fontSize: 17, color: 'rgba(255,255,255,0.5)', marginTop: 8, lineHeight: 1.3 }}>{L(profile.tagline as L10n, lang)}</span>}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 28, marginTop: 16 }}>
            <div style={{ display: 'flex', alignItems: 'baseline' }}>
              <span style={{ fontSize: 68, fontWeight: 700, color: ac, lineHeight: 1 }}>{prob}</span>
              <span style={{ fontSize: 28, fontWeight: 700, color: `${ac}70`, marginLeft: 3 }}>%</span>
            </div>
            <div style={{ width: 2, height: 48, display: 'flex', background: 'rgba(255,255,255,0.08)' }} />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: 68, fontWeight: 700, color: '#f5f3f0', lineHeight: 1 }}>{yr}</span>
              {data.predictedReplacementYear < 2100 && <span style={{ fontSize: 15, color: 'rgba(255,255,255,0.3)', marginTop: 4 }}>{data.earliestYear}–{data.latestYear}</span>}
            </div>
            {/* Careers in remaining space */}
            {careers.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 20, gap: 6, flex: 1 }}>
                <span style={{ fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,0.3)', letterSpacing: 2 }}>{zh ? '相关职业' : 'CAREERS'}</span>
                {careers.map((c, ci) => (
                  <div key={ci} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: ac, opacity: 0.6 }}>{c.riskScore}</span>
                    <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)' }}>{L(c.title as L10n, lang)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ROW 3: Gauge — divider zone, pushed down */}
      <div style={{ display: 'flex', gap: 3, marginTop: 16 }}>
        {stages.map((s, i) => {
          const start = i * 20, end = start + 20;
          const f = prob >= end ? 1 : prob <= start ? 0 : (prob - start) / 20;
          const active = Math.min(Math.floor(prob / 20), 4) === i;
          return (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <div style={{ width: '100%', height: 10, borderRadius: 5, display: 'flex', background: 'rgba(255,255,255,0.04)', overflow: 'hidden' }}>
                {f > 0 && <div style={{ width: `${f * 100}%`, height: '100%', borderRadius: 5, display: 'flex', background: s.color }} />}
              </div>
              <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, color: active ? s.color : 'rgba(255,255,255,0.12)' }}>{zh ? s.zh : s.label}</span>
            </div>
          );
        })}
      </div>

      <div style={{ height: 1, display: 'flex', background: 'rgba(255,255,255,0.06)', margin: '8px 0' }} />

      {/* ROW 4: Dims + Strengths — flex:2, tighter, top-aligned */}
      <div style={{ display: 'flex', gap: 28, flex: 2, alignItems: 'flex-start' }}>
        {/* Left: 4 Dimensions */}
        {dims.length === 4 && (
          <div style={{ display: 'flex', gap: 0, flex: 1 }}>
            {dims.map((d, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', paddingLeft: i > 0 ? 16 : 0, borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                <div style={{ width: 30, height: 5, borderRadius: 3, background: d.color, opacity: 0.7, display: 'flex', marginBottom: 6 }} />
                <span style={{ fontSize: 30, fontWeight: 700, color: d.color, lineHeight: 1 }}>{d.letter}</span>
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', letterSpacing: 1, marginTop: 5 }}>{d.name}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: `${d.color}bb`, marginTop: 3 }}>{d.label}</span>
              </div>
            ))}
          </div>
        )}

        {/* Right: Superpower + Kryptonite */}
        {profile && (
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', gap: 14 }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 5 }}>
                <div style={{ width: 4, height: 16, borderRadius: 2, background: '#34d399', display: 'flex' }} />
                <span style={{ fontSize: 13, fontWeight: 800, letterSpacing: 2, color: '#34d399cc' }}>{zh ? '超能力' : 'SUPERPOWER'}</span>
              </div>
              <span style={{ fontSize: 16, color: 'rgba(255,255,255,0.75)', lineHeight: 1.5, paddingLeft: 10 }}>{L(profile.superpower as L10n, lang)}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 5 }}>
                <div style={{ width: 4, height: 16, borderRadius: 2, background: '#f43f5e', display: 'flex' }} />
                <span style={{ fontSize: 13, fontWeight: 800, letterSpacing: 2, color: '#f43f5ecc' }}>{zh ? '弱点' : 'WEAKNESS'}</span>
              </div>
              <span style={{ fontSize: 16, color: 'rgba(255,255,255,0.75)', lineHeight: 1.5, paddingLeft: 10 }}>{L(profile.kryptonite as L10n, lang)}</span>
            </div>
          </div>
        )}
      </div>

      {/* ROW 5: Actions + CTA — fixed at bottom */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginTop: 8 }}>
        {adviceList.map((a, i) => (
          <div key={i} style={{ flex: 1, display: 'flex', alignItems: 'flex-start', gap: 7 }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: i === 0 ? ac : 'rgba(255,255,255,0.25)', marginTop: 1 }}>{String(i + 1).padStart(2, '0')}</span>
            <span style={{ fontSize: 16, fontWeight: 600, color: i === 0 ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.55)', lineHeight: 1.3 }}>{L(a.title as L10n, lang)}</span>
          </div>
        ))}
        <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', padding: '14px 32px', borderRadius: 14, background: ac }}>
          <span style={{ fontSize: 17, fontWeight: 800, color: '#0a0908' }}>{zh ? '测测你的风险 →' : "What's your risk? →"}</span>
        </div>
      </div>
    </div>,
    { ...size },
  );
}
