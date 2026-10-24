import Link from 'next/link';
import MediaSlot from '@/components/MediaSlot';
import { getMediaObject, hasMedia, mediaUrl } from '@/lib/media';
import { renderDiagram } from '@/components/diagrams';

// Case-study template (server component). Mirrors the static site's markup so
// the existing .cs-* styles apply unchanged. The root layout provides
// <main id="main">, so this renders the container + article only.
//
// MEDIA RULE: every screenshot or demo shown here must use mock or blurred
// company data.

function Diagram({ diagram }) {
  if (!diagram) return null;
  const img = diagram.image;
  const showImg = img && getMediaObject(img.key);
  return (
    <figure className="diagram">
      {diagram.component ? renderDiagram(diagram.component) : null}
      {showImg ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={mediaUrl(img.key)} width={img.width} height={img.height} loading="lazy" decoding="async" alt={img.alt} />
      ) : null}
      {diagram.caption ? <figcaption>{diagram.caption}</figcaption> : null}
    </figure>
  );
}

function Section({ id, num, title, children }) {
  return (
    <section className="cs-section" aria-labelledby={id}>
      <h2 id={id}><span className="mono">{num}</span>{title}</h2>
      {children}
    </section>
  );
}

function LabelledList({ items }) {
  return (
    <ul className="cs-list">
      {items.map((item) => (
        <li key={item.label}><strong>{item.label}:</strong> {item.text}</li>
      ))}
    </ul>
  );
}

export default function CaseStudy({ cs }) {
  const { demo } = cs;
  return (
    <div className="container">
      <article className="cs">
        <header className="cs-hero">
          <Link className="back-link" href={cs.back.href}><span aria-hidden="true">←</span> {cs.back.label}</Link>
          <p className="eyebrow"><b>Case study {cs.number}</b> / {cs.track}</p>
          <h1>{cs.title}</h1>
          <p className="cs-hero__lede">{cs.lede}</p>
          <dl className="cs-meta">
            <div><dt>Role</dt><dd>{cs.meta.role}</dd></div>
            <div><dt>Timeline</dt><dd>{cs.meta.timeline}</dd></div>
            <div><dt>Stack</dt><dd>{cs.meta.stack}</dd></div>
          </dl>
        </header>

        <Section id="problem" num="01" title="Problem">
          <p>{cs.problem}</p>
        </Section>

        <Section id="solution" num="02" title="Solution & architecture">
          <LabelledList items={cs.solution} />
          <Diagram diagram={cs.diagram} />
        </Section>

        <Section id="demo" num="03" title="Demo">
          <MediaSlot
            variant="cs"
            icon={demo.icon || 'play'}
            caption={demo.placeholder}
            video={demo.video}
            image={demo.image}
          />
          {demo.caption ? <p className="cs-demo-caption">{demo.caption}</p> : null}
          {(demo.gallery || []).filter((g) => (g.video ? hasMedia(g.video.mp4) : getMediaObject(g.key))).map((g) => {
            if (g.video) {
              return (
                <figure className="cs-figure" key={g.video.mp4}>
                  <MediaSlot variant="cs" icon="play" video={g.video} />
                  {g.caption ? <figcaption>{g.caption}</figcaption> : null}
                </figure>
              );
            }
            const obj = getMediaObject(g.key);
            return (
              <figure className="cs-figure" key={g.key}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={mediaUrl(g.key)} width={obj.width} height={obj.height} alt={g.alt} loading="lazy" decoding="async" />
                {g.caption ? <figcaption>{g.caption}</figcaption> : null}
              </figure>
            );
          })}
        </Section>

        <Section id="results" num="04" title="Results">
          <ul className="results">
            {cs.results.map((r) => (
              <li className="result" key={r.label}>
                <p className="result__value">{r.value}{r.unit ? <small>{r.unit}</small> : null}</p>
                <p className="result__label">{r.label}</p>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="next" num="05" title="What I'd improve next">
          <LabelledList items={cs.improvements} />
        </Section>

        {cs.note ? <p className="cs-note">{cs.note}</p> : null}

        {cs.prev || cs.next ? (
          <nav className="pager" aria-label="Case studies">
            {cs.prev ? (
              <Link className="pager__prev" href={cs.prev.href}><span>← Previous</span><strong>{cs.prev.title}</strong></Link>
            ) : null}
            {cs.next ? (
              <Link className="pager__next" href={cs.next.href}><span>Next →</span><strong>{cs.next.title}</strong></Link>
            ) : null}
          </nav>
        ) : null}
      </article>
    </div>
  );
}
