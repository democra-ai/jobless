'use client';

import CharEOFP from '@/components/characters/CharEOFP';
import CharTSRH from '@/components/characters/CharTSRH';
import CharESRH from '@/components/characters/CharESRH';

export default function PreviewAvatars() {
  return (
    <div style={{ background: '#0a0908', color: '#f5f3f0', minHeight: '100vh', padding: '40px 20px', fontFamily: 'system-ui' }}>
      <h1 style={{ textAlign: 'center', fontSize: 24, fontWeight: 700, marginBottom: 40 }}>
        SVG Character Preview
      </h1>

      <div style={{ display: 'flex', justifyContent: 'center', gap: 40, flexWrap: 'wrap' }}>
        {/* EOFP — Glass Cannon (High Risk) */}
        <div style={{ textAlign: 'center' }}>
          <div style={{ background: '#ff174410', borderRadius: 20, padding: 20, border: '1px solid #ff174425' }}>
            <CharEOFP size={200} />
          </div>
          <div style={{ marginTop: 12, color: '#ff1744', fontWeight: 800, fontSize: 18 }}>玻璃大炮</div>
          <div style={{ fontSize: 12, opacity: 0.4, letterSpacing: 3 }}>EOFP</div>
          <div style={{ fontSize: 11, opacity: 0.3, marginTop: 4, maxWidth: 180 }}>极高风险</div>
        </div>

        {/* ESRH — Oracle (Low Risk) */}
        <div style={{ textAlign: 'center' }}>
          <div style={{ background: '#00c85310', borderRadius: 20, padding: 20, border: '1px solid #00c85325' }}>
            <CharESRH size={200} />
          </div>
          <div style={{ marginTop: 12, color: '#00c853', fontWeight: 800, fontSize: 18 }}>神谕者</div>
          <div style={{ fontSize: 12, opacity: 0.4, letterSpacing: 3 }}>ESRH</div>
          <div style={{ fontSize: 11, opacity: 0.3, marginTop: 4, maxWidth: 180 }}>低风险</div>
        </div>

        {/* TSRH — Iron Fortress (Extreme Low Risk) */}
        <div style={{ textAlign: 'center' }}>
          <div style={{ background: '#34d39910', borderRadius: 20, padding: 20, border: '1px solid #34d39925' }}>
            <CharTSRH size={200} />
          </div>
          <div style={{ marginTop: 12, color: '#34d399', fontWeight: 800, fontSize: 18 }}>铁壁堡垒</div>
          <div style={{ fontSize: 12, opacity: 0.4, letterSpacing: 3 }}>TSRH</div>
          <div style={{ fontSize: 11, opacity: 0.3, marginTop: 4, maxWidth: 180 }}>极低风险</div>
        </div>
      </div>

      {/* Size comparison */}
      <h2 style={{ textAlign: 'center', fontSize: 18, fontWeight: 600, marginTop: 60, marginBottom: 24, opacity: 0.5 }}>
        Size Variants
      </h2>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'end', gap: 24 }}>
        <div style={{ textAlign: 'center' }}>
          <CharEOFP size={64} />
          <div style={{ fontSize: 10, opacity: 0.3, marginTop: 4 }}>64px</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <CharEOFP size={100} />
          <div style={{ fontSize: 10, opacity: 0.3, marginTop: 4 }}>100px</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <CharEOFP size={160} />
          <div style={{ fontSize: 10, opacity: 0.3, marginTop: 4 }}>160px</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <CharEOFP size={240} />
          <div style={{ fontSize: 10, opacity: 0.3, marginTop: 4 }}>240px</div>
        </div>
      </div>
    </div>
  );
}
