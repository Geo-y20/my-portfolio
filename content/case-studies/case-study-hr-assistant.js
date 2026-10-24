// MEDIA: the demo screenshots are real chats with EVA Cosmetics' Policy Assistant, supplied by George for publication (2026-10-24); no personal names are shown.
const caseStudy = {
  slug: 'case-study-hr-assistant',
  number: '05',
  track: 'Agents & RAG',
  featured: false,
  title: 'Offline bilingual HR assistant for EVA Cosmetics',
  metaTitle: 'Offline Bilingual HR Assistant for EVA Cosmetics | George Youhana',
  metaDescription: "Case study: EVA Cosmetics' fully offline Arabic–English HR assistant on Aya-Expanse 8B via Ollama, with hybrid ChromaDB + BM25 retrieval and 0 cloud calls.",
  ogDescription: 'Bilingual HR answers from a local 8B model. Hybrid ChromaDB + BM25 retrieval, 0 cloud calls, zero exposure of HR documents.',
  lede: "EVA Cosmetics' Policy Assistant: a fully offline assistant that answers HR-policy questions in Arabic and English from a local model, with zero cloud exposure.",
  back: { href: '/all-projects', label: 'All projects' },
  meta: {
    role: 'AI Engineer: architecture, retrieval, local deployment',
    timeline: 'EVA Group · 2025 – present',
    stack: 'Python · ChromaDB + BM25 · Aya-Expanse 8B · Ollama',
  },
  problem: 'Employees needed a simple way to find HR information buried in internal documents, in either Arabic or English. The policy content was sensitive, so it could not be sent to any external or cloud service.',
  solution: [
    { label: 'Hybrid retrieval', text: 'ChromaDB vector search catches paraphrased questions, while BM25 keyword search catches exact policy terms, numbers and department names.' },
    { label: 'Local model', text: 'answers come from Aya-Expanse 8B served by Ollama on internal hardware, so no document or question leaves the network.' },
    { label: 'Bilingual workflows', text: 'Arabic and English HR documents are ingested and queried in whichever language the employee uses.' },
    { label: 'Trade-off', text: 'a local 8B model gives up some raw capability compared with a larger hosted one, in exchange for a strict no-cloud guarantee on HR data.' },
  ],
  diagram: {
    image: {
      key: 'architecture/hr-assistant-architecture.svg',
      width: 640,
      height: 274,
      alt: 'HR assistant architecture: Arabic and English HR documents are searched by ChromaDB and BM25 in parallel, the results are merged, and a local Aya-Expanse 8B model on Ollama writes the answer',
    },
    caption: 'Query path: parallel vector and keyword retrieval, merged and answered by a local model, all on-premise.',
  },
  demo: {
    icon: 'play',
    placeholder: 'Demo coming soon: Arabic question → retrieved policy passages → local answer',
    video: {
      mp4: 'work/hr-assistant/demo.mp4',
      webm: 'work/hr-assistant/demo.webm',
      poster: 'work/hr-assistant/cover.webp',
      label: 'Demo: an employee asks an HR question in Arabic, then in English, and gets answers grounded in policy passages from a local model',
    },
    image: {
      key: 'work/hr-assistant/chat-leave.webp',
      alt: "EVA Cosmetics Policy Assistant answering 'عايز اجازه' (I want leave) in Arabic with the leave types from the policy and one cited source",
    },
    caption: "Asked 'عايز اجازه' (I want leave), the assistant lists the leave types from the HR policy and cites its source.",
    gallery: [
      {
        key: 'work/hr-assistant/chat-hours.webp',
        alt: 'EVA Cosmetics Policy Assistant chat: an English greeting, then an Egyptian-Arabic question about required working hours, with the search it ran',
        caption: 'English or Egyptian Arabic: a greeting in English, then a question about required working hours in Arabic.',
      },
    ],
  },
  results: [
    { value: '0', unit: 'cloud calls', label: 'fully offline: no HR document or question leaves the network' },
    { value: '2', unit: 'languages', label: 'Arabic and English HR-policy access' },
    { value: '8B', label: 'Aya-Expanse model running locally on Ollama' },
  ],
  // TODO: George to confirm or rewrite these improvement items.
  improvements: [
    { label: 'Evaluation set', text: 'build a bilingual question set from real HR queries to measure retrieval and answer quality on every change.' },
    { label: 'Reranking', text: 'add a local reranker after the merged ChromaDB + BM25 results to improve which passages reach the model.' },
    { label: 'Citations', text: 'show the exact policy section behind each answer so employees can verify it.' },
  ],
  note: 'Enterprise project. Screens and demos use mock or blurred data; no internal HR documents or employee information are shown.',
  prev: { href: '/case-study-speech-ai', title: 'Speech AI: meeting minutes & call analytics' },
  next: { href: '/case-study-vision-platform', title: 'On-prem vision platform' },
};

export default caseStudy;
