import Link from 'next/link';
import MediaSlot from '@/components/MediaSlot';
import { FilterItem } from '@/components/FilterableProjects';
import DiagramDialog from '@/components/DiagramDialog';
import { getMediaObject, mediaUrl } from '@/lib/media';
import { featured, moreProduction } from '@/content/projects';

// Status badge derived from which list a project lives in (no new facts):
// featured + moreProduction → "In production"; everything else is the
// research & personal group, labelled by its kicker prefix (Research / Applied / Personal).
const PRODUCTION = new Set([...featured, ...moreProduction].map((p) => p.title));
function statusOf({ title, kicker }) {
  if (PRODUCTION.has(title)) return { label: 'In production', live: true };
  return { label: kicker.split(' · ')[0], live: false };
}

// One project card (.card). Media: a screenshot `image` if the card has one,
// otherwise its case-study `cover`; MediaSlot falls back to the placeholder
// when neither file is in object storage yet.
export default function ProjectCard({ project, reveal = false }) {
  const { title, kicker, tags, outcome, note, stack, icon, image, cover, coverAlt, caption, link, diagram } = project;
  const diagramObj = diagram ? getMediaObject(diagram) : undefined;
  // Thumbnail: screenshot, else case-study cover, else the architecture diagram.
  const ownMedia = image || (cover && getMediaObject(cover) ? { key: cover, alt: coverAlt || title } : undefined);
  const media = ownMedia || (diagramObj ? { key: diagram, alt: `${title} architecture diagram` } : undefined);
  const showsDiagram = !ownMedia && Boolean(diagramObj);

  const href = link?.href;
  const isCaseStudy = link?.label === 'Read case study';
  // Internal pages use client-side navigation; files and external sites a plain <a>.
  const LinkTag = link?.href?.startsWith('/') ? Link : 'a';
  const status = statusOf(project);

  return (
    <FilterItem tags={tags} reveal={reveal}>
      <p className={`card__status${status.live ? ' card__status--live' : ''}`}><span aria-hidden="true" />{status.label}</p>
      <MediaSlot variant="card" icon={icon} caption={caption || stack.join(' · ')} image={media} fit={showsDiagram ? 'contain' : undefined} />
      <div className="card__body">
        <p className="card__kicker">{kicker}</p>
        <h3 className="card__title">{title}</h3>
        <p className="card__outcome" dangerouslySetInnerHTML={{ __html: outcome }} />
        {note ? <p className="card__note">{note}</p> : null}
        <div className="card__foot">
          <ul className="tags" aria-label="Stack">
            {stack.map((s) => <li className="tag" key={s}>{s}</li>)}
          </ul>
          {href ? (
            <LinkTag className="text-link card__link" href={href} {...(link.external ? { target: '_blank', rel: 'noopener' } : {})}>
              {link.label}
              {isCaseStudy ? null : <span className="sr-only"> for {title}</span>}
              {' '}<span aria-hidden="true">→</span>
            </LinkTag>
          ) : diagramObj ? (
            <DiagramDialog src={mediaUrl(diagram)} width={diagramObj.width} height={diagramObj.height} title={title} />
          ) : null}
        </div>
      </div>
    </FilterItem>
  );
}
