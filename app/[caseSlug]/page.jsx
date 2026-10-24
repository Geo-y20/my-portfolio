import { notFound } from 'next/navigation';
import CaseStudy from '@/components/case-study/CaseStudy';
import { caseStudies, getCaseStudy } from '@/content/case-studies';

// Case studies live at the site root (/case-study-atr-gpt, …) to keep the
// static site's URLs (minus .html). Only the known slugs are generated.
export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ caseSlug: cs.slug }));
}

export async function generateMetadata({ params }, parent) {
  const { caseSlug } = await params;
  const cs = getCaseStudy(caseSlug);
  if (!cs) return {};
  const url = `/${cs.slug}`;
  // Child openGraph/twitter objects replace the parent's, so carry over the
  // site-wide share images from the root layout.
  const inherited = await parent;
  const ogImages = inherited?.openGraph?.images;
  const twImages = inherited?.twitter?.images;
  return {
    title: { absolute: cs.metaTitle },
    description: cs.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title: cs.metaTitle,
      description: cs.ogDescription,
      ...(ogImages ? { images: ogImages } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: cs.metaTitle,
      description: cs.twitterDescription || cs.ogDescription,
      ...(twImages ? { images: twImages } : {}),
    },
  };
}

export default async function CaseStudyPage({ params }) {
  const { caseSlug } = await params;
  const cs = getCaseStudy(caseSlug);
  if (!cs) notFound();
  return <CaseStudy cs={cs} />;
}
