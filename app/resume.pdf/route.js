import { profile } from '@/content/site';

// /resume.pdf — the CV served from this site's own domain, so it downloads
// directly with no Google Drive page or permission prompt. The file itself
// still lives in Google Drive (profile.resumeDriveId), so replacing it there
// (Manage versions → Upload new version) updates the site within the cache
// window below — no deploy needed.
const CACHE_SECONDS = 3600;

export async function GET() {
  const driveView = `https://drive.google.com/file/d/${profile.resumeDriveId}/view`;
  try {
    const res = await fetch(
      `https://drive.usercontent.google.com/download?id=${profile.resumeDriveId}&export=download&confirm=t`,
      { next: { revalidate: CACHE_SECONDS } }
    );
    const body = res.ok ? await res.arrayBuffer() : null;
    // Drive answers with an HTML page instead of the file if sharing changed.
    const isPdf = body && new TextDecoder().decode(body.slice(0, 5)) === '%PDF-';
    if (!isPdf) throw new Error(`Drive returned ${res.status} without a PDF`);
    return new Response(body, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'inline; filename="George_Youhana_Resume.pdf"',
        'Cache-Control': `public, max-age=0, s-maxage=${CACHE_SECONDS}, stale-while-revalidate=86400`,
      },
    });
  } catch (err) {
    console.error(`resume.pdf: ${err.message}; falling back to the Drive page`);
    return Response.redirect(driveView, 302);
  }
}
