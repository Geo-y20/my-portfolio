import SectionHead, { Eyebrow } from '@/components/SectionHead';
import HeroTrace from '@/components/HeroTrace';
import ProjectCard from '@/components/ProjectCard';
import FilterableProjects, { FilterBar, FilterGrid, FilterMoreLink } from '@/components/FilterableProjects';
import { SITE_URL, mediaUrl } from '@/lib/media';
import { pageMetadata } from '@/lib/metadata';
import { featured, filters } from '@/content/projects';
import {
  about, certifications, contact, earlierRoles, education, experience, learning, metrics, personJsonLd, profile, seo, skills,
} from '@/content/site';

export const metadata = pageMetadata({
  absoluteTitle: seo.title,
  description: seo.description,
  ogDescription: seo.ogDescription,
  twitterDescription: seo.twitterDescription,
  path: '/',
});

const html = (s) => ({ __html: s });

// Stack strip: a curated subset of the Skills section, filtered against it so
// the strip can never list a tool that isn't in content/site.js.
const STACK_PICKS = ['Python', 'FastAPI', 'PostgreSQL + pgvector', 'LangGraph', 'OpenAI', 'Anthropic Claude', 'Ollama', 'PyTorch', 'YOLO', 'Docker', 'Azure', 'OCI'];
const SKILL_ITEMS = new Set(skills.flatMap((g) => g.items.split(' · ')));
const STACK = STACK_PICKS.filter((t) => SKILL_ITEMS.has(t));

// "AI Engineer @ EVA Group", from the current role in content/site.js.
const current = experience[0];
const currentOrg = current.org.match(/\(([^)]+)\)/)?.[1] || current.org.split(' · ')[0];

const SKILL_ICONS = {
  llm: <><circle cx="12" cy="12" r="3" /><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" /></>,
  shield: <><path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6l8-3Z" /><path d="M8.5 12l2.5 2.5 4.5-5" /></>,
  chip: <><rect x="4" y="4" width="16" height="16" rx="3" /><path d="M9 9h6v6H9z" /><path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3" /></>,
  eye: <><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /></>,
  db: <><ellipse cx="12" cy="5.5" rx="8" ry="2.8" /><path d="M4 5.5v6.5c0 1.5 3.6 2.8 8 2.8s8-1.3 8-2.8V5.5" /><path d="M4 12v6.5c0 1.5 3.6 2.8 8 2.8s8-1.3 8-2.8V12" /></>,
  code: <path d="M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" />,
};

const CONTACT_ICONS = {
  linkedin: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11H3v-11Zm6.5 0h3.8v1.5h.06c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.77 2.65 4.77 6.1v5.46h-4v-4.84c0-1.16-.02-2.64-1.61-2.64-1.61 0-1.86 1.26-1.86 2.56v4.92h-3.93v-11Z" /></svg>
  ),
  github: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" /></svg>
  ),
  whatsapp: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3.5 20.5l1.3-4A8.5 8.5 0 1 1 8 19.6l-4.5.9Z" /><path d="M9 8.5c0 3.5 3 6.5 6.5 6.5l1-1.5-2-1-1 1c-1-.4-2.1-1.5-2.5-2.5l1-1-1-2L9.5 8" /></svg>
  ),
};

const ArrowDown = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 5v14m0 0l-6-6m6 6l6-6" /></svg>;
const Download = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 4v11m0 0l-4-4m4 4l4-4M5 20h14" /></svg>;

function DateRange({ from, to }) {
  const part = (d) => (d.datetime ? <time dateTime={d.datetime}>{d.label}</time> : d.label);
  return <p className="tl-date">{part(from)} – {part(to)}</p>;
}

export default function HomePage() {
  const jsonLd = { ...personJsonLd, url: `${SITE_URL}/`, image: mediaUrl(profile.photo.key, { absolute: true }) };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* HERO */}
      <section className="hero" aria-labelledby="hero-name">
        <div className="container">
          <div className="hero__grid">
            <div className="hero__intro">
              <div className="hero__id">
                <div className="hero__photo">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={mediaUrl(profile.photo.key)} width={profile.photo.width} height={profile.photo.height} alt={profile.photo.alt} fetchPriority="high" decoding="async" />
                </div>
                <div className="hero__status">
                  <p className="status-pill"><span className="status-dot" aria-hidden="true" />{profile.status}</p>
                  <p className="hero__now"><span aria-hidden="true">~/</span>currently: <b>{current.role} @ {currentOrg}</b></p>
                </div>
              </div>
              <h1 className="hero__name" id="hero-name">{profile.name}</h1>
              <p className="hero__headline">{profile.headline} <span>{profile.headlineTags}</span></p>
              <p className="hero__lede">{profile.lede}</p>
              <div className="hero__ctas">
                <a className="btn btn--primary" href="#work">View my work <ArrowDown /></a>
                <a className="btn btn--ghost" href={profile.resumeUrl} download="George_Youhana_Resume.pdf">Download résumé <Download /></a>
              </div>
            </div>
            <HeroTrace />
          </div>

          {/* Final values are server-rendered so scrapers, ATS tools and link previews read them; JS only animates the count-up. */}
          <ul className="metrics" aria-label="Selected impact">
            {metrics.map((m) => (
              <li className="metric" key={m.label}>
                <p className="metric__value" data-count={m.count}>
                  {m.prefix}<span data-count-num="">{m.count.toLocaleString('en-US')}</span>{m.suffix}{m.small ? <small>{m.small}</small> : null}
                </p>
                <p className="metric__label">{m.label}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* STACK */}
      <section className="stack-strip" aria-labelledby="stack-title">
        <div className="container stack-strip__inner">
          <h2 className="stack-strip__label" id="stack-title"><span aria-hidden="true">{'// '}</span>core stack</h2>
          <ul className="stack-strip__list">
            {STACK.map((t) => <li key={t}>{t}</li>)}
          </ul>
        </div>
      </section>

      {/* 01 WORK */}
      <section className="section" id="work" aria-labelledby="work-title">
        <FilterableProjects id="work-scope" filters={filters} items={featured.map((p) => p.tags)}>
          <SectionHead index="01" label="Work" id="work-title" title="Selected work" intro="Four production systems I designed, built and deployed end to end. Filter by the track you're hiring for." />
          <FilterBar />
          {/* MEDIA: every screenshot/demo must use mock or blurred company data — never real customer, employee or financial records. */}
          <FilterGrid className="bento">
            {featured.map((p) => <ProjectCard key={p.title} project={p} reveal />)}
          </FilterGrid>
          <div className="work-more">
            <p>Forecasting, on-prem vision, an offline bilingual HR assistant for EVA Cosmetics, social listening and research projects.</p>
            <FilterMoreLink className="btn btn--ghost">See all 12+ projects <span aria-hidden="true">→</span></FilterMoreLink>
          </div>
        </FilterableProjects>
      </section>

      {/* 02 EXPERIENCE */}
      <section className="section" id="experience" aria-labelledby="experience-title">
        <div className="container">
          <SectionHead index="02" label="Experience" id="experience-title" title="Experience" />
          <ol className="timeline">
            {experience.map((job) => (
              <li className={`tl-item${job.dates.to.label === 'Present' ? ' tl-item--current' : ''}`} data-reveal="" key={job.role}>
                <div className="tl-head">
                  <h3 className="tl-role">{job.role}</h3>
                  <DateRange {...job.dates} />
                </div>
                <p className="tl-org">{job.org}</p>
                {job.summary ? <p className="tl-summary">{job.summary}</p> : null}
                {job.points ? (
                  <ul className="tl-points">
                    {job.points.map((pt) => <li key={pt} dangerouslySetInnerHTML={html(pt)} />)}
                  </ul>
                ) : null}
                {job.chips ? (
                  <ul className="chips" aria-label={job.chipsLabel}>
                    {job.chips.map((c) => <li className="chip" key={c} dangerouslySetInnerHTML={html(c)} />)}
                  </ul>
                ) : null}
              </li>
            ))}
            <li className="tl-item tl-item--muted" data-reveal="">
              <details className="earlier">
                <summary>{earlierRoles.summary} <span className="mono">{earlierRoles.meta}</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
                </summary>
                <ul className="earlier__list">
                  {earlierRoles.roles.map((r) => (
                    <li key={r.title}><span>{r.title} <em>· {r.org}</em></span><span className="mono">{r.dates}</span></li>
                  ))}
                </ul>
              </details>
            </li>
          </ol>
        </div>
      </section>

      {/* 03 SKILLS */}
      <section className="section" id="skills" aria-labelledby="skills-title">
        <div className="container">
          <SectionHead index="03" label="Skills" id="skills-title" title="Skills" />
          <div className="skills" data-reveal="">
            {skills.map((g) => (
              <div className="skill-group" key={g.icon}>
                <h3>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{SKILL_ICONS[g.icon]}</svg>
                  {g.title}
                </h3>
                <p>{g.items}</p>
              </div>
            ))}
          </div>
          <p className="learning"><span>Currently learning</span>{learning}</p>
        </div>
      </section>

      {/* 04 ABOUT + EDUCATION */}
      <section className="section" id="about" aria-labelledby="about-title">
        <div className="container about">
          <div data-reveal="">
            <Eyebrow index="04" label="about" />
            <h2 className="section-title" id="about-title">About</h2>
            {about.map((p) => <p className="about__text" key={p}>{p}</p>)}
          </div>
          <div className="creds" data-reveal="">
            <div>
              <h3>Education</h3>
              <CredList items={education} />
            </div>
            <div>
              <h3>Certifications</h3>
              <CredList items={certifications} />
            </div>
          </div>
        </div>
      </section>

      {/* 05 CONTACT */}
      <section className="section contact" id="contact" aria-labelledby="contact-title">
        <div className="container" data-reveal="">
          <Eyebrow index="05" label="contact" />
          <h2 className="section-title" id="contact-title">{contact.title}</h2>
          <p className="section-intro">{contact.intro}</p>
          <a className="contact__email" href={`mailto:${contact.email}`}>{contact.email}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17L17 7M8 7h9v9" /></svg>
          </a>
          <ul className="contact__links">
            {contact.links.map((l) => (
              <li key={l.label}><a className="btn btn--ghost" href={l.href} target="_blank" rel="noopener">{CONTACT_ICONS[l.icon]}{l.label}</a></li>
            ))}
          </ul>
          <p className="contact__meta">{contact.meta}</p>
        </div>
      </section>
    </>
  );
}

function CredList({ items }) {
  return (
    <ul className="cred-list">
      {items.map((c) => (
        <li key={c.title}><span className="cred-title">{c.title}</span><span className="cred-org">{c.org}</span><span className="cred-date">{c.dates}</span></li>
      ))}
    </ul>
  );
}
