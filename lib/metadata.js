import { mediaUrl } from '@/lib/media';
import { seo } from '@/content/site';

// Per-page metadata. Next replaces (not merges) nested openGraph/twitter
// objects, so every page re-states the shared OG image and site name here.
// `title` is the bare page title; the layout's template appends " | George Youhana"
// unless `absoluteTitle` is set.
export function pageMetadata({ title, absoluteTitle, description, ogDescription, twitterDescription, path, noindex = false }) {
  const fullTitle = absoluteTitle || `${title} | George Youhana`;
  const image = { url: mediaUrl('og-image.png', { absolute: true }), width: 1200, height: 630, alt: seo.ogImageAlt };
  return {
    title: absoluteTitle ? { absolute: absoluteTitle } : title,
    description,
    alternates: path ? { canonical: path } : undefined,
    openGraph: {
      type: 'website',
      siteName: seo.siteName,
      url: path,
      title: fullTitle,
      description: ogDescription || description,
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: twitterDescription || ogDescription || description,
      images: [image.url],
    },
    robots: noindex ? { index: false } : undefined,
  };
}
