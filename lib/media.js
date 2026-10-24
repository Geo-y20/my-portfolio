// Media lives in Neon object storage (S3-compatible bucket), never in the repo.
// content/media-manifest.json is written by `npm run media:upload` and lists
// every uploaded object. Only objects marked `public: true` are rendered on the
// site or served by /api/media — everything else stays private in the bucket.
//
// URLs: if NEXT_PUBLIC_MEDIA_BASE_URL is set (bucket made publicly readable or
// fronted by a CDN), files are linked directly. Otherwise they go through
// /api/media/<key>, which redirects to a short-lived signed URL.
import manifest from '@/content/media-manifest.json';

const BASE = (process.env.NEXT_PUBLIC_MEDIA_BASE_URL || '').replace(/\/$/, '');

export function getMediaObject(key) {
  const obj = key ? manifest.objects[key] : undefined;
  return obj && obj.public ? obj : undefined;
}

export function hasMedia(key) {
  return Boolean(getMediaObject(key));
}

export function mediaUrl(key, { absolute = false } = {}) {
  const path = key.split('/').map(encodeURIComponent).join('/');
  if (BASE) return `${BASE}/${path}`;
  const rel = `/api/media/${path}`;
  return absolute ? `${SITE_URL}${rel}` : rel;
}

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://my-portfolio-nine-chi-v2lvpxtgph.vercel.app').replace(/\/$/, '');
