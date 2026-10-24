// MEDIA: card cover/demo must use mock or blurred company data — never real brand names, comments or account identifiers.
const caseStudy = {
  slug: 'case-study-social-listening',
  number: '08',
  track: 'Data & ML',
  featured: false,
  title: 'Social listening platform',
  metaTitle: 'Social Listening Platform | George Youhana',
  metaDescription: 'Case study: Facebook and Instagram comments from 8+ cosmetics brands classified by a fine-tuned BERT model into 9 business categories, with PDF reports.',
  ogDescription: '8+ brands, Facebook and Instagram, one tag per comment. A fine-tuned BERT model maps 11 classes to a 9-category business taxonomy.',
  lede: 'A pipeline that collects Facebook and Instagram comments across 8+ cosmetics brands, tags each one with a fine-tuned BERT classifier, and reports the results in a dashboard.',
  back: { href: '/all-projects', label: 'All projects' },
  meta: {
    role: 'AI Engineer / Architect: pipeline, model, dashboard',
    timeline: 'Enterprise project · TODO: dates',
    stack: 'Python · Graph API · PostgreSQL · BERT (PyTorch) · FastAPI / Flask · Docker',
  },
  problem: 'Marketing and customer-care teams across 8+ cosmetics brands had no systematic way to monitor high volumes of Facebook and Instagram comments. Delivery complaints, pricing questions and negative sentiment were hard to spot before they escalated.',
  solution: [
    { label: 'Collection', text: "one scraper pulls comments from each brand's Facebook and Instagram Graph API." },
    { label: 'Storage', text: 'comments are normalized into a PostgreSQL schema organized per brand and per platform.' },
    { label: 'Classification', text: 'a fine-tuned BERT model gives each comment one tag; its 11 classes map to a 9-category business taxonomy (FAQ, availability, delivery, pricing, competition, engagement, tone, filter, positive/negative).' },
    { label: 'Reporting', text: 'a dashboard with cross-brand analysis and exportable PDF reports.' },
  ],
  diagram: {
    image: {
      key: 'architecture/social-listening-architecture.svg',
      width: 640,
      height: 280,
      alt: 'Facebook and Instagram Graph API comments flow through a unified scraper into PostgreSQL stored per brand and platform, then a BERT classifier maps 11 model classes to 9 business categories, feeding a dashboard with PDF reports.',
    },
    caption: 'Comments flow from both platforms into one schema, get a single business tag, and surface in the dashboard.',
  },
  demo: {
    icon: 'play',
    placeholder: 'Demo coming soon: comments → categories → PDF report',
    video: {
      mp4: 'work/social-listening/demo.mp4',
      webm: 'work/social-listening/demo.webm',
      poster: 'work/social-listening/cover.webp',
      label: 'Demo: classified comments are filtered by brand and category, then exported as a PDF report (mock data)',
    },
  },
  results: [
    { value: '8+', label: 'cosmetics brands monitored' },
    { value: '2', unit: 'platforms', label: 'Facebook and Instagram in one schema' },
    { value: '11 → 9', label: 'model classes mapped to business categories, one tag per comment' },
  ],
  // TODO: George to confirm or rewrite these improvement items.
  improvements: [
    { label: 'Platform signal', text: 'keep comment threading and reaction types, which the shared schema currently drops.' },
    { label: 'Alerts', text: 'notify customer care when delivery complaints or negative comments spike for a brand.' },
    { label: 'Retraining loop', text: 'let reviewers correct tags in the dashboard and feed those corrections back into fine-tuning.' },
  ],
  note: 'Enterprise project. Screens and demos use mock or blurred data; no real brand names, comments or account identifiers are shown.',
  prev: { href: '/case-study-learning-automation', title: 'Learning automation platform' },
  next: { href: '/case-study-text-digitalization', title: 'Text Digitalization: bilingual product content & regulatory layouts' },
};

export default caseStudy;
