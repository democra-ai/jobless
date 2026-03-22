import { Language, translations } from '@/lib/translations';

function Footer({ lang, t }: { lang: Language; t: typeof translations.en }) {
  return (
    <footer className="py-16 px-6" style={{ borderTop: '1px solid var(--surface-elevated)' }}>
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
          <div>
            <h3 className="text-2xl font-extrabold mb-2" style={{ fontFamily: 'var(--font-display)', color: 'var(--brand-primary)' }}>
              {t.title}
            </h3>
            <p className="text-sm" style={{ color: 'var(--foreground-muted)' }}>{t.tagline}</p>
          </div>
          <div className="text-sm" style={{ color: 'var(--foreground-muted)' }}>
            <p className="font-semibold mb-2" style={{ color: 'var(--foreground)' }}>{t.dataSources}</p>
            <p>{t.sources}</p>
            <p>{t.sources2}</p>
          </div>
        </div>
        <div className="text-center text-xs pt-8" style={{ color: 'var(--foreground-dim)', borderTop: '1px solid var(--surface-elevated)' }}>
          <p>{t.disclaimer}</p>
          <p className="mt-1">{t.disclaimer2}</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
