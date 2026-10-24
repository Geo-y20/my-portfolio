import { SITE_URL } from '@/lib/media';
import { caseStudies } from '@/content/case-studies';

export default function sitemap() {
  const lastModified = new Date();
  return [
    { url: `${SITE_URL}/`, lastModified, changeFrequency: 'monthly', priority: 1 },
    { url: `${SITE_URL}/all-projects`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    ...caseStudies.map((cs) => ({ url: `${SITE_URL}/${cs.slug}`, lastModified, changeFrequency: 'yearly', priority: 0.7 })),
  ];
}
