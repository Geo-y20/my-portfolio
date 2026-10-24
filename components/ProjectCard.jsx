import Link from 'next/link';
import MediaSlot from '@/components/MediaSlot';
import { FilterItem } from '@/components/FilterableProjects';
import { hasMedia, mediaUrl } from '@/lib/media';

// One project card (.card). Media: a screenshot `image` if the card has one,
// otherwise its case-study `cover`; MediaSlot falls back to the placeholder
// when neither file is in object storage yet.
export default function ProjectCard({ project, reveal = false }) {
  const { title, kicker, tags, outcome, stack, icon, image, cover, coverAlt, caption, link } = project;
  const media = image || (cover ? { key: cover, alt: coverAlt || title } : undefined);

  let href = link?.href;
  if (link?.mediaKey) href = hasMedia(link.mediaKey) ? mediaUrl(link.mediaKey) : undefined;
  const isCaseStudy = link?.label === 'Read case study';
  // Internal pages use client-side navigation; files and external sites a plain <a>.
  const LinkTag = link?.href?.startsWith('/') ? Link : 'a';

  return (
    <FilterItem tags={tags} reveal={reveal}>
      <MediaSlot variant="card" icon={icon} caption={caption || stack.join(' · ')} image={media} />
      <div className="card__body">
        <p className="card__kicker">{kicker}</p>
        <h3 className="card__title">{title}</h3>
        <p className="card__outcome" dangerouslySetInnerHTML={{ __html: outcome }} />
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
          ) : null}
        </div>
      </div>
    </FilterItem>
  );
}
