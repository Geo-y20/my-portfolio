import { getMediaObject } from '@/lib/media';
import { signedGetUrl } from '@/lib/storage';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// GET /api/media/<key> → 302 to a presigned URL for that object, but only if
// content/media-manifest.json lists it as public. Anything else is a 404, so
// private objects in the bucket can never be reached through the site.
export async function GET(_request, { params }) {
  const { key: segments } = await params;
  let key = (segments || []).join('/');
  // Next hands over decoded segments; decode once more only if a still-encoded
  // key (e.g. "ATR%20MOM.gif") is what matches the manifest.
  if (!getMediaObject(key)) {
    try { key = decodeURIComponent(key); } catch { /* malformed escape → 404 below */ }
  }
  if (!getMediaObject(key)) {
    return new Response('Not found', { status: 404, headers: { 'Cache-Control': 'public, max-age=60' } });
  }
  try {
    const { url, maxAge } = await signedGetUrl(key);
    return new Response(null, {
      status: 302,
      headers: { Location: url, 'Cache-Control': `public, max-age=${maxAge}, s-maxage=${maxAge}` },
    });
  } catch (err) {
    console.error(`media: could not sign ${key}: ${err.name || 'Error'}`);
    return new Response('Media unavailable', { status: 503, headers: { 'Cache-Control': 'no-store' } });
  }
}
