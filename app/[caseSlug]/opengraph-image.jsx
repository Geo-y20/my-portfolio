import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { ImageResponse } from 'next/og';
import { caseStudies, getCaseStudy } from '@/content/case-studies';

// Per-case-study social preview (1200×630), generated at build time from the
// case study's own title, track and results, so links shared on LinkedIn show
// that project instead of the home page's numbers.
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ caseSlug: cs.slug }));
}

export async function generateImageMetadata({ params }) {
  const { caseSlug } = await params;
  const cs = getCaseStudy(caseSlug);
  const results = cs ? cs.results.map((r) => `${r.value}${r.unit ? ` ${r.unit}` : ''} ${r.label}`).join('; ') : '';
  return [{ id: 'og', size, contentType, alt: cs ? `${cs.title}: ${results}` : 'George Youhana case study' }];
}

const font = (file) => readFile(path.join(process.cwd(), 'app', '_og', file));

const C = { bg: '#0B0E13', surface: '#12161D', border: 'rgba(255,255,255,0.10)', text: '#C9D1DB', heading: '#F1F4F8', muted: '#8B95A3', accent: '#4DD8C4' };

export default async function Image({ params }) {
  const { caseSlug } = await params;
  const cs = getCaseStudy(caseSlug);
  const [regular, semibold, mono] = await Promise.all([
    font('work-sans-latin-400-normal.woff'),
    font('work-sans-latin-600-normal.woff'),
    font('jetbrains-mono-latin-500-normal.woff'),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          padding: '56px 64px', background: C.bg, color: C.text, fontFamily: 'Work Sans',
          backgroundImage: 'radial-gradient(circle at 0% 0%, rgba(77,216,196,0.18), rgba(11,14,19,0) 55%)',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', fontFamily: 'JetBrains Mono', fontSize: 22, letterSpacing: 3, color: C.muted, textTransform: 'uppercase' }}>
            <span style={{ color: C.accent }}>Case study {cs.number}</span>
            <span style={{ margin: '0 14px' }}>/</span>
            <span>{cs.track}</span>
          </div>
          <div style={{ display: 'flex', marginTop: 22, fontSize: cs.title.length > 48 ? 50 : 60, fontWeight: 600, color: C.heading, lineHeight: 1.08, letterSpacing: -1.5, maxWidth: 1060 }}>
            {cs.title}
          </div>
          <div style={{ display: 'flex', marginTop: 20, fontSize: 25, lineHeight: 1.4, color: C.text, maxWidth: 1040 }}>
            {cs.lede.length > 150 ? `${cs.lede.slice(0, 147).trimEnd()}…` : cs.lede}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', gap: 18 }}>
            {cs.results.map((r) => (
              <div key={r.label} style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: '18px 22px', background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', fontFamily: 'JetBrains Mono', fontSize: 36, color: C.accent }}>
                  {r.value}{r.unit ? <span style={{ fontSize: 20, marginLeft: 8 }}>{r.unit}</span> : null}
                </div>
                <div style={{ display: 'flex', marginTop: 6, fontSize: 18, color: C.muted, lineHeight: 1.35 }}>{r.label}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 26, fontFamily: 'JetBrains Mono', fontSize: 20, color: C.muted }}>
            <span>George Youhana · AI Engineer</span>
            <span style={{ color: C.accent }}>{`/${cs.slug}`}</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Work Sans', data: regular, weight: 400, style: 'normal' },
        { name: 'Work Sans', data: semibold, weight: 600, style: 'normal' },
        { name: 'JetBrains Mono', data: mono, weight: 500, style: 'normal' },
      ],
    }
  );
}
