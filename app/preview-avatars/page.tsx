'use client';

import CharEOFP from '@/components/characters/CharEOFP';
import CharEOFH from '@/components/characters/CharEOFH';
import CharEORP from '@/components/characters/CharEORP';
import CharESFP from '@/components/characters/CharESFP';
import CharTOFP from '@/components/characters/CharTOFP';
import CharEORH from '@/components/characters/CharEORH';
import CharESFH from '@/components/characters/CharESFH';
import CharESRP from '@/components/characters/CharESRP';
import CharTOFH from '@/components/characters/CharTOFH';
import CharTORP from '@/components/characters/CharTORP';
import CharTSFP from '@/components/characters/CharTSFP';
import CharESRH from '@/components/characters/CharESRH';
import CharTORH from '@/components/characters/CharTORH';
import CharTSFH from '@/components/characters/CharTSFH';
import CharTSRP from '@/components/characters/CharTSRP';
import CharTSRH from '@/components/characters/CharTSRH';

const CHARACTERS = [
  { code: 'EOFP', name: '玻璃大炮', en: 'The Glass Cannon', Component: CharEOFP, color: '#42A5F5' },
  { code: 'EOFH', name: '人脉桥梁', en: 'The Human Bridge', Component: CharEOFH, color: '#5C6BC0' },
  { code: 'EORP', name: '终审印章', en: 'The Final Stamp', Component: CharEORP, color: '#D32F2F' },
  { code: 'ESFP', name: '品味定义者', en: 'The Taste Maker', Component: CharESFP, color: '#AD1457' },
  { code: 'TOFP', name: '赤手行者', en: 'The Bare Hand', Component: CharTOFP, color: '#FF9800' },
  { code: 'EORH', name: '执照之墙', en: 'The License Wall', Component: CharEORH, color: '#1A237E' },
  { code: 'ESFH', name: '活体品牌', en: 'The Living Brand', Component: CharESFH, color: '#FF7043' },
  { code: 'ESRP', name: '高压炼金师', en: 'The Pressure Alchemist', Component: CharESRP, color: '#5E35B1' },
  { code: 'TOFH', name: '签名手艺人', en: 'The Signature Touch', Component: CharTOFH, color: '#FF8A65' },
  { code: 'TORP', name: '不颤之手', en: 'The Steady Hand', Component: CharTORP, color: '#4CAF50' },
  { code: 'TSFP', name: '灵魂匠人', en: 'The Soul Craftsman', Component: CharTSFP, color: '#6D4C41' },
  { code: 'ESRH', name: '神谕者', en: 'The Oracle', Component: CharESRH, color: '#3949AB' },
  { code: 'TORH', name: '疗愈之手', en: 'The Healing Hand', Component: CharTORH, color: '#26A69A' },
  { code: 'TSFH', name: '不可替代者', en: 'The Irreplaceable', Component: CharTSFH, color: '#FF6B6B' },
  { code: 'TSRP', name: '终极裁决者', en: 'The Last Call', Component: CharTSRP, color: '#455A64' },
  { code: 'TSRH', name: '铁壁堡垒', en: 'The Iron Fortress', Component: CharTSRH, color: '#1A237E' },
];

export default function PreviewAvatars() {
  return (
    <div style={{ background: '#0a0908', color: '#f5f3f0', minHeight: '100vh', padding: '40px 20px', fontFamily: 'system-ui' }}>
      <h1 style={{ textAlign: 'center', fontSize: 28, fontWeight: 700, marginBottom: 12 }}>
        Corporate Memphis Character Gallery
      </h1>
      <p style={{ textAlign: 'center', fontSize: 14, opacity: 0.4, marginBottom: 48 }}>
        All 16 AIR Profile Types — Corporate Memphis Illustration Style
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 32, maxWidth: 1200, margin: '0 auto' }}>
        {CHARACTERS.map(({ code, name, en, Component, color }) => (
          <div key={code} style={{ textAlign: 'center' }}>
            <div style={{ background: `${color}10`, borderRadius: 20, padding: 16, border: `1px solid ${color}25` }}>
              <Component size={200} />
            </div>
            <div style={{ marginTop: 10, color, fontWeight: 800, fontSize: 16 }}>{name}</div>
            <div style={{ fontSize: 11, opacity: 0.5, marginTop: 2 }}>{en}</div>
            <div style={{ fontSize: 11, opacity: 0.3, letterSpacing: 3, marginTop: 2 }}>{code}</div>
          </div>
        ))}
      </div>

      {/* Size comparison */}
      <h2 style={{ textAlign: 'center', fontSize: 18, fontWeight: 600, marginTop: 60, marginBottom: 24, opacity: 0.5 }}>
        Size Variants
      </h2>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'end', gap: 24, flexWrap: 'wrap' }}>
        {[64, 100, 160, 240].map(s => (
          <div key={s} style={{ textAlign: 'center' }}>
            <CharEOFP size={s} />
            <div style={{ fontSize: 10, opacity: 0.3, marginTop: 4 }}>{s}px</div>
          </div>
        ))}
      </div>
    </div>
  );
}
