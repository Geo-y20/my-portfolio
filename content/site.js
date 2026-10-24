// Site-wide copy: profile, hero metrics, experience, skills, education,
// certifications and contact. The text is final and fact-checked against the
// CV — keep it in sync with lib/portfolio-context.js (the chatbot's facts).
// Plain strings are rendered as text (so write '&', not '&amp;'); only the
// experience `points` and `chips` are HTML strings (they contain <strong>/<b>).

export const profile = {
  name: 'George Youhana Heazil',
  shortName: 'George Youhana',
  initials: 'GY',
  role: 'AI Engineer',
  status: 'Open to roles & freelance',
  headline: 'AI Engineer: Agentic & Multimodal AI',
  headlineTags: 'LLMs · RAG · Vision · Speech',
  lede: 'I ship production AI systems (agents, RAG, Text-to-SQL, OCR, vision and speech) that real business teams use every day.',
  photo: { key: 'profile-560.webp', alt: 'Portrait of George Youhana', width: 280, height: 280 },
  resumeKey: 'George_Youhana_Resume.pdf',
  location: 'Cairo, Egypt',
  email: 'georgeyouhana2@gmail.com',
};

export const seo = {
  title: 'George Youhana | AI Engineer: Agentic & Multimodal AI',
  description:
    'George Youhana Heazil, AI Engineer. I ship production AI systems (agents, RAG, Text-to-SQL, OCR, vision and speech) that real business teams use every day.',
  ogDescription:
    'Production agents, RAG, Text-to-SQL, OCR, vision and speech. 900+ employees use ATR GPT · ~10s Text-to-SQL answers · 95% OCR field accuracy · 20 on-prem cameras.',
  twitterDescription:
    'Production agents, RAG, Text-to-SQL, OCR, vision and speech systems that business teams use every day.',
  siteName: 'George Youhana — AI Engineer',
  ogImageAlt:
    'George Youhana, AI Engineer: 900+ employees on ATR GPT, ~10s Text-to-SQL answers, 95% OCR field accuracy, 20 on-prem cameras',
};

// Final values live in the markup; <Enhancements/> only animates the count-up.
export const metrics = [
  { count: 900, prefix: '', suffix: '+', label: 'employees use ATR GPT (5,000 queries/month)' },
  { count: 10, prefix: '~', suffix: 's', label: 'Text-to-SQL answers (was 1–2 days of manual reports)' },
  { count: 95, prefix: '', suffix: '%', label: 'OCR field accuracy on 1,000 docs/month' },
  { count: 20, prefix: '', small: 'cameras', label: 'on-prem vision across 3 sites' },
];

export const experience = [
  {
    role: 'AI Engineer',
    dates: { from: { datetime: '2025-05', label: 'May 2025' }, to: { label: 'Present' } },
    org: 'Akhnaton Trading & Distribution (EVA Group) · Cairo',
    points: [
      '<strong>ATR GPT (agentic RAG):</strong> FastAPI RAG on PostgreSQL + pgvector with reranking for 900 employees in 20 departments (5,000 queries/month). Tool-calling agents with memory produce PowerPoint/Word deliverables, with OpenAI/Claude routing for cost, latency and quality, guardrails and token/cost monitoring.',
      '<strong>Text-to-SQL → Sheet Chat:</strong> Text-to-SQL over 10 Oracle Autonomous DB tables cut answers from 1–2 days to about 10s, with 90% correct SQL on a 100-question eval set. Extended into a stateful LangGraph agent (DuckDB) that plans, queries, charts and runs data-quality checks.',
      '<strong>Document AI / OCR:</strong> Cheque reading and validation before ERP ingestion, plus bilingual Arabic–English product-label extraction (batch, expiry, quantity) with Google Cloud Vision at 95% field accuracy on 1,000 docs/month.',
      '<strong>Speech AI:</strong> Desktop app that transcribes Zoom/Teams meetings live with Deepgram and writes bilingual minutes with OpenAI, plus a call-analytics pipeline (CRM recordings → Whisper → LLM sentiment) covering 1,500 calls/month.',
      '<strong>Forecasting:</strong> Ridge + LightGBM per brand/customer/channel with per-SKU model selection by wMAPE, a 15% reduction in wMAPE against the previous baseline.',
      '<strong>On-prem AI:</strong> Fully offline Arabic–English HR assistant (Aya-Expanse 8B on Ollama, hybrid ChromaDB + BM25) with zero cloud exposure. Vision for fire/violence, license plates, people counting and attendance on 20 cameras at 3 sites.',
    ],
  },
  {
    role: 'Freelance AI Developer',
    dates: { from: { datetime: '2024-01', label: 'Jan 2024' }, to: { datetime: '2025-04', label: 'Apr 2025' } },
    org: 'Upwork & direct clients',
    summary: 'End-to-end ML, computer-vision and NLP projects, deployed as FastAPI and Streamlit apps.',
    chipsLabel: 'Freelance highlights',
    chips: ['<b>10</b> projects shipped', '<b>100%</b> Job Success Score', 'up to <b>3</b> concurrent projects'],
  },
];

export const earlierRoles = {
  summary: 'Earlier roles',
  meta: '4 roles · 2022 – 2025',
  roles: [
    { title: 'AI & Data Science Instructor', org: 'DEPI / Elharefa / iSchool', dates: 'Oct 2024 – Feb 2025' },
    { title: 'ML Engineer (Contract)', org: 'GuruHub', dates: 'Apr – Jul 2024' },
    { title: 'AI Developer Intern', org: 'Elegant Textile Engineering', dates: 'Jul – Aug 2023' },
    { title: 'Co-Founder & Project Mentor', org: 'Guido', dates: '2022 – Present' },
  ],
};

// icon → see SKILL_ICONS in app/page.jsx
export const skills = [
  { icon: 'llm', title: 'LLMs & Agents', items: 'RAG · LangGraph · LangChain · Tool Calling · Agent Memory · Rerankers · Text-to-SQL · Prompt Engineering' },
  { icon: 'shield', title: 'LLMOps & Evaluation', items: 'RAG Evaluation · Guardrails · Token/Cost Monitoring · LoRA/PEFT Fine-Tuning' },
  { icon: 'chip', title: 'Models & APIs', items: 'OpenAI · Anthropic Claude · OCI GenAI · Ollama · Aya-Expanse · Hugging Face Transformers' },
  { icon: 'eye', title: 'ML, Vision & Speech', items: 'PyTorch · scikit-learn · LightGBM · YOLO · OpenCV · Google Cloud Vision · Whisper · Deepgram' },
  { icon: 'db', title: 'Data & Retrieval', items: 'PostgreSQL + pgvector · Oracle Autonomous DB · DuckDB · ChromaDB · BM25 · MongoDB · Power BI' },
  { icon: 'code', title: 'Backend & Deployment', items: 'Python · FastAPI · Pydantic · Docker · Azure · OCI · GitHub Actions / CI/CD · Linux' },
];

export const learning = 'LangSmith / Langfuse · MLflow · AWS Bedrock & SageMaker · Kubernetes';

export const about = [
  'AI Engineer at EVA Group building enterprise GenAI and ML end to end, from stakeholder requirements and architecture to API deployment, evaluation and monitoring.',
  'I choose between cloud LLMs and on-prem open-weight models based on cost, quality and data privacy, and I work bilingually in Arabic and English.',
];

export const education = [
  { title: 'M.Sc. Data Science', org: 'AASTMT, Smart Village', dates: '2026 – exp. 2028' },
  { title: 'B.Sc. Artificial Intelligence (Data Science)', org: 'AASTMT, Alexandria', dates: '2021 – 2025' },
];

export const certifications = [
  { title: 'AI Agents on Azure · Azure AI Language · Azure Speech', org: 'Microsoft Learn', dates: '2025' },
  { title: 'Google Advanced Data Analytics', org: 'Google', dates: '2024' },
];

export const contact = {
  title: "Let's build something people actually use.",
  intro: 'Open to Applied AI, GenAI solutions and ML engineering roles, and to freelance projects. The fastest way to reach me is email.',
  email: 'georgeyouhana2@gmail.com',
  links: [
    { icon: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/george-youhana-a5b756155/' },
    { icon: 'github', label: 'GitHub', href: 'https://github.com/Geo-y20' },
    { icon: 'whatsapp', label: 'WhatsApp', href: 'https://wa.me/201223350814' },
  ],
  meta: 'Based in Cairo, Egypt · working in Arabic & English',
};

export const social = {
  github: 'https://github.com/Geo-y20',
  linkedin: 'https://www.linkedin.com/in/george-youhana-a5b756155/',
  kaggle: 'https://www.kaggle.com/georgeyouhanaheazil',
};

export const footer = {
  text: '© 2026 George Youhana Heazil · AI Engineer · Cairo, Egypt',
  links: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/george-youhana-a5b756155/', external: true },
    { label: 'GitHub', href: 'https://github.com/Geo-y20', external: true },
    { label: 'Email', href: 'mailto:georgeyouhana2@gmail.com' },
  ],
};

export const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'George Youhana Heazil',
  alternateName: 'George Youhana',
  jobTitle: 'AI Engineer',
  description:
    'AI Engineer building agentic and multimodal AI: LLMs, RAG, Text-to-SQL, OCR, computer vision and speech, in Arabic and English.',
  email: 'mailto:georgeyouhana2@gmail.com',
  address: { '@type': 'PostalAddress', addressLocality: 'Cairo', addressCountry: 'EG' },
  worksFor: { '@type': 'Organization', name: 'Akhnaton Trading & Distribution (EVA Group)' },
  alumniOf: { '@type': 'CollegeOrUniversity', name: 'Arab Academy for Science, Technology and Maritime Transport (AASTMT)' },
  knowsAbout: ['Large Language Models', 'Retrieval-Augmented Generation', 'AI Agents', 'LangGraph', 'Text-to-SQL', 'OCR', 'Computer Vision', 'Speech Recognition', 'Arabic NLP', 'Time-Series Forecasting', 'FastAPI'],
  knowsLanguage: ['ar', 'en'],
  sameAs: [social.github, social.linkedin, social.kaggle],
};
