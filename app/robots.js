import { SITE_URL } from '@/lib/media';

export default function robots() {
  return {
    // /api/media must stay crawlable: it serves the OG image and screenshots.
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
