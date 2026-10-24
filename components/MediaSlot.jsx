import { getMediaObject, hasMedia, mediaUrl } from '@/lib/media';
import Icon from '@/components/Icon';
import LazyVideo from '@/components/LazyVideo';

// A 16:10 media area that always renders a tasteful placeholder (gradient,
// icon, stack caption) and layers a real image and/or demo video on top only
// when that file exists in object storage and is marked public. So a missing
// file can never show as a broken image or a 404.
//
// MEDIA RULE: every screenshot or demo published here must use mock or blurred
// company data — never real customer, employee, financial or schema details.
//
// variant: "card" → .card__media (project cards), "cs" → .cs-cover (case-study demo)
// image:   { key, alt, priority? }       width/height come from the manifest
// video:   { mp4, webm?, poster?, label } lazy-loaded, muted, looping
// fit:     "contain" shows the whole image on a padded surface (architecture diagrams)
export default function MediaSlot({ variant = 'card', icon = 'chat', caption, image, video, fit }) {
  const img = image && getMediaObject(image.key);
  const showVideo = video && hasMedia(video.mp4);
  const poster = showVideo && video.poster && hasMedia(video.poster) ? mediaUrl(video.poster) : undefined;
  const filled = Boolean(img || showVideo);
  // Case-study demos take the recording's own aspect ratio, so wide screen
  // captures are shown whole — no cropping and no letterbox bars.
  const dims = showVideo ? getMediaObject(video.mp4) : img;
  const style = variant === 'cs' && dims?.width && dims?.height ? { aspectRatio: `${dims.width} / ${dims.height}` } : undefined;

  return (
    <div className={variant === 'cs' ? `cs-cover${filled ? '' : ' cs-cover--empty'}` : `card__media${fit === 'contain' && img ? ' card__media--diagram' : ''}`} style={style}>
      <div className="ph" aria-hidden="true">
        <Icon name={icon} className="ph__icon" />
        {caption ? <span className="ph__caption">{caption}</span> : null}
      </div>
      {img && !showVideo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={mediaUrl(image.key)}
          width={img.width}
          height={img.height}
          alt={image.alt}
          loading={image.priority ? 'eager' : 'lazy'}
          fetchPriority={image.priority ? 'high' : undefined}
          decoding="async"
        />
      ) : null}
      {showVideo ? (
        <LazyVideo
          mp4={mediaUrl(video.mp4)}
          webm={video.webm && hasMedia(video.webm) ? mediaUrl(video.webm) : undefined}
          poster={poster}
          label={video.label}
          width={getMediaObject(video.mp4).width}
          height={getMediaObject(video.mp4).height}
        />
      ) : null}
    </div>
  );
}
