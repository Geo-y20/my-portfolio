// MEDIA: the demo is a real recording of the internal system; George approved publishing it on 2026-10-24. Any other screenshots must use mock or blurred data.
// NEW in the Next.js version (no static page existed). Facts are limited to what
// George supplied: EVA Group, AI Engineer, 2025 – present; document upload →
// storage → parsing (PyMuPDF / LLM vision) → AI field extraction → Claude
// GSO-compliant bilingual layouts → compliance quality gate → cached output;
// plus the app screens (product stages, Brand approvals, brand gallery/fields,
// Text GPT). No metrics were given, so the result tiles are counts read off the
// workflow itself.
const caseStudy = {
  slug: 'case-study-text-digitalization',
  number: '09',
  track: 'Vision & Docs · Arabic',
  featured: false,
  title: 'Text Digitalization: bilingual product content & regulatory layouts',
  metaTitle: 'Text Digitalization: Bilingual Product Content | George Youhana',
  metaDescription: 'Case study: product spec documents parsed with PyMuPDF or LLM vision, fields extracted by AI, and Claude-generated GSO-compliant Arabic–English layouts checked by an automated compliance gate.',
  ogDescription: 'Product specs in, GSO-compliant Arabic–English marketing layouts out, with an automated compliance gate before anything is served.',
  lede: 'A web app that turns product spec documents into bilingual Arabic–English marketing layouts that follow GSO (Gulf regulatory) rules, and tracks each product from draft to approval.',
  back: { href: '/all-projects', label: 'All projects' },
  meta: {
    role: 'AI Engineer: document pipeline, bilingual generation',
    timeline: 'EVA Group · 2025 – present',
    stack: 'PyMuPDF · LLM vision · Claude · PostgreSQL',
  },
  problem: 'Every product needs marketing content in both Arabic and English that meets GSO (Gulf regulatory) requirements. The source facts sit in product spec documents, and moving them into compliant bilingual layouts, then through regulatory and brand review, was slow manual work.',
  solution: [
    { label: 'Ingestion', text: 'product spec documents (PDF, DOCX, XLSX, PPTX) are uploaded and stored, then parsed with PyMuPDF text extraction or LLM vision for embedded images.' },
    { label: 'Field extraction', text: 'an AI step pulls the product fields out of the parsed content.' },
    { label: 'Bilingual layouts', text: 'Claude generates GSO-compliant Arabic–English marketing layouts from the extracted fields.' },
    { label: 'Quality gate', text: 'an automated compliance check runs before any layout is output; passing results are cached and served to the UI or exported to Excel or PDF.' },
    { label: 'Review workflow', text: 'a product dashboard tracks every product through Draft → Regulatory review → Final review → Approved, with a Brand approvals queue, a brand gallery and brand fields.' },
    { label: 'Text GPT', text: 'a chat that takes product text and returns an EN original, an EN refined and an AR final version.' },
  ],
  diagram: {
    image: {
      key: 'architecture/text-digitalize-architecture.svg',
      width: 640,
      height: 131,
      alt: 'Text Digitalization architecture: uploaded product spec documents are stored, parsed with PyMuPDF or LLM vision and passed to AI field extraction; Claude generates a bilingual GSO-compliant layout, which passes a compliance quality gate before the cached output is served to the UI or exported to Excel or PDF',
    },
    caption: 'Document path: upload → store → parse → field extraction, then bilingual generation behind a compliance gate before output is cached.',
  },
  demo: {
    icon: 'play',
    placeholder: 'Demo coming soon: spec document → extracted fields → bilingual layout',
    video: {
      mp4: 'work/text-digitalization/demo.mp4',
      webm: 'work/text-digitalization/demo.webm',
      poster: 'work/text-digitalization/cover.webp',
      label: 'Demo: the product dashboard, the Brand approvals queue, and Text GPT returning original, refined English and final Arabic versions',
    },
  },
  results: [
    { value: '4', unit: 'stages', label: 'draft → regulatory review → final review → approved, tracked per product' },
    { value: '2', unit: 'languages', label: 'English and Arabic for every product field' },
    { value: '1', unit: 'gate', label: 'automated compliance check before any layout is output' },
  ],
  // TODO: George to confirm or rewrite these improvement items.
  improvements: [
    { label: 'Regression set', text: 'keep a set of approved bilingual layouts and check every prompt or model change against it before release.' },
    { label: 'Rejection reasons', text: 'record why the compliance gate or a brand reviewer rejects a layout, and use those reasons to improve the generation prompt.' },
  ],
  note: "Enterprise project. The demo is a recording of the internal system, shared with George's approval; confidential details beyond what it shows are not published.",
  prev: { href: '/case-study-social-listening', title: 'Social listening platform' },
  next: { href: '/case-study-forecasting', title: 'Demand forecasting with explainable root causes' },
};

export default caseStudy;
