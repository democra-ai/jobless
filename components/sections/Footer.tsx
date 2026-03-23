import { Language, translations } from '@/lib/translations';
import { RetroGrid } from '@/components/ui/retro-grid';

function Footer({ lang, t, theme = 'dark' }: { lang: Language; t: typeof translations.en; theme?: 'dark' | 'light' }) {
  const gridColor = theme === 'dark' ? '#c4b5fd' : '#ff6b35';
  return (
    <footer className="py-12 px-6 border-t border-surface-elevated/50 relative overflow-hidden">
      <RetroGrid
        angle={65}
        cellSize={50}
        opacity={0.15}
        lightLineColor={gridColor}
        darkLineColor={gridColor}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold text-brand-primary mb-2">{t.title}</h3>
            <p className="text-foreground-muted text-sm">{t.tagline}</p>
          </div>
          <div className="text-sm text-foreground-muted">
            <p className="font-semibold mb-2">{t.dataSources}</p>
            <p>{t.sources}</p>
            <p>{t.sources2}</p>
          </div>
        </div>
        <div className="text-center text-xs text-foreground-muted pt-6">
          <p>&#9888;&#65039; {t.disclaimer}</p>
          <p className="mt-1">{t.disclaimer2}</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
