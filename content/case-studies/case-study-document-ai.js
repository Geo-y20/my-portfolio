// MEDIA: card cover/demo must use mock or blurred data — never real cheques, account numbers, signatures or supplier names.
const caseStudy = {
  slug: 'case-study-document-ai',
  number: '03',
  track: 'Vision & Docs · Arabic',
  featured: true,
  title: 'Document AI & OCR',
  metaTitle: 'Document AI & OCR | George Youhana',
  metaDescription: 'Case study: cheque reading with validation before ERP ingestion, and bilingual Arabic–English product-label extraction at 95% field accuracy on 1,000 docs/month.',
  ogDescription: '95% field accuracy on 1,000 bilingual Arabic–English documents a month; cheques validated before they reach the ERP.',
  lede: 'Two pipelines that turn paper into validated data: cheques checked before they reach the ERP, and bilingual product labels read at 95% field accuracy.',
  back: { href: '/#work', label: 'All work' },
  meta: {
    role: 'AI Engineer: pipeline design, extraction, validation',
    timeline: 'EVA Group · 2025 – present',
    stack: 'Google Cloud Vision · Python · rule-based validation',
  },
  problem: 'Cheques and product labels were typed into systems by hand. Labels mix Arabic and English on the same surface, and a single wrong batch number, expiry date or cheque amount flows straight into the ERP and is expensive to trace back.',
  solution: [
    { label: 'Cheques', text: 'the pipeline reads each cheque and validates the extracted fields before ERP ingestion, so bad reads are stopped at the door instead of cleaned up later.' },
    { label: 'Product labels', text: 'bilingual Arabic–English extraction of batch, expiry and quantity with Google Cloud Vision, at 95% field accuracy on 1,000 documents a month.' },
    { label: 'Field-level checks', text: 'every field is validated on its own (formats, dates, required values), so failures are specific and easy to fix.' },
  ],
  diagram: {
    component: 'DocumentAi',
    caption: 'Nothing reaches the ERP without passing field-level validation.',
  },
  demo: {
    icon: 'play',
    placeholder: 'Demo coming soon: label image → highlighted fields → validated record',
    video: {
      mp4: 'work/document-ai/demo.mp4',
      webm: 'work/document-ai/demo.webm',
      poster: 'work/document-ai/cover.webp',
      label: 'Demo: a bilingual product label is uploaded, fields are highlighted and extracted, and the validated record is shown (blurred sample)',
    },
  },
  results: [
    { value: '95%', label: 'field accuracy on bilingual product labels' },
    { value: '1,000', label: 'documents processed per month' },
    { value: '0', unit: 'unchecked', label: 'cheques reach the ERP without passing validation' },
  ],
  // TODO: George to confirm or rewrite these improvement items.
  improvements: [
    { label: 'Confidence routing', text: 'send only low-confidence fields to a person, with the crop shown next to the value, instead of re-checking whole documents.' },
    { label: 'Learn from corrections', text: 'store every human fix as a labelled example and track field accuracy per label layout over time.' },
  ],
  note: 'Enterprise project. Cheques, labels and supplier details are never shown; any screens or demos use blurred or synthetic samples.',
  prev: { href: '/case-study-text-to-sql', title: 'Text-to-SQL → Sheet Chat' },
  next: { href: '/case-study-speech-ai', title: 'Speech AI: meeting minutes & call analytics' },
};

export default caseStudy;
