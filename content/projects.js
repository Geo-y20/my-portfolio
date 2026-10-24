// Every project card on the site. `featured` renders in the home bento and at
// the top of /all-projects; `moreProduction` and `research` only on /all-projects.
//
// Card fields:
//   title, kicker        plain text
//   tags                 filter tracks: agents | data | vision | speech
//   outcome              HTML string (numbers wrapped in <strong>)
//   stack                stack chips; also the placeholder caption unless `caption` is set
//   icon                 placeholder icon name (components/Icon.jsx)
//   image                { key, alt } object-storage key of a screenshot
//   cover                'work/<slug>/cover.webp' (+ coverAlt) — used when `image` is absent
//   link                 { href, label, external } — or { mediaKey, label } for a file in storage
//   archive              featured only: shorter { outcome, caption } used on /all-projects
//
// MEDIA RULE: every screenshot or demo must use mock or blurred company data.

export const filters = [
  { key: 'all', label: 'All' },
  { key: 'agents', label: 'Agents & RAG' },
  { key: 'data', label: 'Data & ML' },
  { key: 'vision', label: 'Vision & Docs' },
  { key: 'speech', label: 'Speech & Arabic' },
];

const caseStudy = (slug) => ({ href: `/case-study-${slug}`, label: 'Read case study' });
const github = (href) => ({ href, label: 'GitHub', external: true });

export const featured = [
  {
    title: 'ATR GPT: agentic RAG assistant',
    kicker: 'Agents & RAG · EVA Group',
    tags: ['agents', 'data'],
    outcome: '<strong>900+</strong> employees across 20 departments, <strong>5,000</strong> queries/month. Tool-calling agents that also produce PowerPoint and Word deliverables.',
    stack: ['pgvector', 'Tool calling', 'FastAPI'],
    caption: 'FastAPI · PostgreSQL + pgvector · reranker · OpenAI / Claude',
    icon: 'chat',
    cover: 'work/atr-gpt/cover.webp',
    coverAlt: 'ATR GPT chat interface answering an employee question with cited policy sources (mock data)',
    link: caseStudy('atr-gpt'),
    archive: {
      outcome: '<strong>900+</strong> employees, 20 departments, <strong>5,000</strong> queries/month.',
      caption: 'pgvector · Tool calling · FastAPI',
    },
  },
  {
    title: 'Text-to-SQL → Sheet Chat',
    kicker: 'Data & ML · Agents',
    tags: ['agents', 'data'],
    outcome: '<strong>~10s</strong> answers instead of 1–2 days; <strong>90%</strong> correct SQL on a 100-question eval set.',
    stack: ['Oracle ADB', 'LangGraph', 'DuckDB'],
    caption: 'Oracle Autonomous DB · LangGraph · DuckDB',
    icon: 'db',
    cover: 'work/text-to-sql/cover.webp',
    coverAlt: 'Sheet Chat answering a sales question with generated SQL and a chart (mock data)',
    link: caseStudy('text-to-sql'),
    archive: {
      outcome: '<strong>~10s</strong> answers instead of 1–2 days; <strong>90%</strong> correct SQL on 100 questions.',
      caption: 'Oracle ADB · LangGraph · DuckDB',
    },
  },
  {
    title: 'Document AI & OCR',
    kicker: 'Vision & Docs · Arabic',
    tags: ['vision', 'speech'],
    outcome: '<strong>95%</strong> field accuracy on <strong>1,000</strong> docs/month; cheques validated before ERP ingestion.',
    stack: ['Cloud Vision', 'OCR', 'Arabic NLP'],
    caption: 'Google Cloud Vision · Arabic–English · validation',
    icon: 'scan',
    cover: 'work/document-ai/cover.webp',
    coverAlt: 'Product label with extracted batch, expiry and quantity fields highlighted (blurred sample)',
    link: caseStudy('document-ai'),
    archive: {
      outcome: '<strong>95%</strong> field accuracy on <strong>1,000</strong> docs/month; cheques validated before ERP.',
      caption: 'Cloud Vision · OCR · Arabic NLP',
    },
  },
  {
    title: 'Speech AI: meeting minutes & call analytics',
    kicker: 'Speech & Arabic',
    tags: ['speech'],
    outcome: 'Live Zoom/Teams transcription into bilingual minutes, plus a call-analytics pipeline covering <strong>1,500</strong> calls/month.',
    stack: ['Deepgram', 'Whisper', 'OpenAI'],
    caption: 'Deepgram · Whisper · OpenAI · bilingual minutes',
    icon: 'wave',
    cover: 'work/speech-ai/cover.webp',
    coverAlt: 'Meeting-minutes app showing a live transcript and generated bilingual summary (mock meeting)',
    link: caseStudy('speech-ai'),
    archive: {
      outcome: 'Live bilingual minutes, plus sentiment on <strong>1,500</strong> calls/month.',
      caption: 'Deepgram · Whisper · OpenAI',
    },
  },
];

export const moreProduction = [
  {
    title: 'Offline Arabic HR assistant',
    kicker: 'Agents & RAG · On-prem',
    tags: ['agents', 'speech'],
    outcome: 'Aya-Expanse <strong>8B</strong> on Ollama with hybrid retrieval and <strong>zero</strong> cloud exposure.',
    stack: ['Ollama', 'ChromaDB + BM25', 'Arabic'],
    icon: 'lock',
    link: caseStudy('hr-assistant'),
  },
  {
    title: 'On-prem vision platform',
    kicker: 'Vision & Docs · On-prem',
    tags: ['vision'],
    outcome: '<strong>20</strong> cameras across <strong>3</strong> sites: fire/violence, plates, people counting, attendance.',
    stack: ['YOLO', 'OpenCV', 'Docker'],
    icon: 'eye',
    cover: 'work/vision-platform/cover.webp',
    coverAlt: 'On-prem vision platform interface (staged footage)',
    link: caseStudy('vision-platform'),
  },
  {
    title: 'Demand forecasting',
    kicker: 'Data & ML · EVA Group',
    tags: ['data'],
    outcome: 'Ridge + LightGBM per brand/customer/channel with per-SKU selection: <strong>−15%</strong> wMAPE vs. baseline.',
    stack: ['LightGBM', 'scikit-learn', 'Python'],
    icon: 'chart',
    link: { mediaKey: 'architecture/forecast-view-architecture.svg', label: 'View architecture' },
  },
  {
    title: 'Social listening platform',
    kicker: 'Data & ML · NLP',
    tags: ['data'],
    outcome: 'Fine-tuned BERT classifying comments for <strong>8+</strong> brands into a 9-category taxonomy.',
    stack: ['BERT', 'PostgreSQL', 'Graph API'],
    icon: 'bubbles',
    cover: 'work/social-listening/cover.webp',
    coverAlt: 'Social listening dashboard (mock data)',
    link: caseStudy('social-listening'),
  },
  {
    title: 'Learning automation platform',
    kicker: 'Speech · Freelance',
    tags: ['speech'],
    outcome: '<strong>5,000+</strong> files transcribed and summarized at <strong>~95%</strong> transcription accuracy.',
    stack: ['Whisper', 'NLP', 'FastAPI'],
    icon: 'wave',
    image: { key: 'projects/ai-powered-learning-automation-platform.webp', alt: 'Learning automation platform upload screen' },
    link: caseStudy('learning-automation'),
  },
  {
    title: 'Text Digitalization: bilingual product content & regulatory layouts',
    kicker: 'Vision & Docs · Arabic',
    tags: ['vision', 'speech'],
    outcome: 'Claude turns product spec documents into GSO-compliant Arabic–English layouts, gated by a compliance check.',
    stack: ['Claude', 'PyMuPDF', 'Document AI'],
    icon: 'doc',
    cover: 'work/text-digitalization/cover.webp',
    coverAlt: 'Text Digitalization platform generating a bilingual product layout (mock data)',
    link: caseStudy('text-digitalization'),
  },
  {
    title: 'Supply-chain analytics & BI',
    kicker: 'Data & ML · EVA Group',
    tags: ['data'],
    outcome: 'Power BI dashboards for inventory turnover, fulfillment and operational KPIs.',
    stack: ['Power BI', 'SQL'],
    icon: 'bars',
  },
];

export const research = [
  {
    title: 'Arabic sign language robotic system',
    kicker: 'Research · Vision',
    tags: ['vision', 'speech'],
    outcome: 'Gesture recognition driving an Arduino robotic arm at <strong>~96%</strong> accuracy.',
    stack: ['Computer vision', 'Arduino'],
    icon: 'eye',
    image: { key: 'projects/arabic-sign-language-system.webp', alt: 'Arabic sign language robotic arm prototype' },
  },
  {
    title: 'Arabic text summarization',
    kicker: 'Research · Arabic NLP',
    tags: ['speech', 'data'],
    outcome: 'AraBART fine-tuned on <strong>10,000+</strong> Arabic documents; <strong>−40%</strong> review time.',
    stack: ['AraBART', 'Transformers'],
    icon: 'doc',
  },
  {
    title: 'Egyptian speaker diarization',
    kicker: 'Research · Speech',
    tags: ['speech'],
    outcome: 'Speaker segmentation for noisy, multi-speaker Egyptian Arabic audio.',
    stack: ['ASR', 'Diarization'],
    icon: 'wave',
  },
  {
    title: 'Wheat disease detection assistant',
    kicker: 'Applied · Vision',
    tags: ['vision'],
    outcome: 'Real-time disease detection paired with a farmer-facing chatbot, <strong>~90%</strong> accuracy.',
    stack: ['Computer vision', 'Chatbot'],
    icon: 'eye',
    image: { key: 'projects/wheat-farming-ai-disease-detection-1.webp', alt: 'Wheat leaf disease detection results' },
  },
  {
    title: 'Assistive vision system',
    kicker: 'Applied · Vision',
    tags: ['vision', 'speech'],
    outcome: 'Object detection, OCR, face recognition and text-to-speech in one assistive app.',
    stack: ['YOLOv5', 'OCR', 'TTS'],
    icon: 'eye',
  },
  {
    title: 'Egyptian cotton classification',
    kicker: 'Applied · Vision',
    tags: ['vision'],
    outcome: 'Deep-learning web app grading cotton from images at <strong>~94%</strong> accuracy.',
    stack: ['Deep learning', 'Web app'],
    icon: 'eye',
    image: { key: 'projects/egyptian-cotton-classification.webp', alt: 'Egyptian cotton classification web app' },
  },
  {
    title: 'Research paper title generator',
    kicker: 'Personal · NLP',
    tags: ['data'],
    outcome: 'Fine-tuned BART generating academic-style titles from abstracts.',
    stack: ['BART', 'Transformers'],
    icon: 'doc',
    image: { key: 'projects/research-paper-title-generation-bart.webp', alt: 'Title generator app generating a paper title from an abstract' },
    link: github('https://github.com/geo-y20/research-paper-title-generation-using-bart'),
  },
  {
    title: 'Diabetes heart monitor',
    kicker: 'Personal · ML + IoT',
    tags: ['data'],
    outcome: 'Random Forest diabetes prediction (<strong>83%</strong> accuracy) with live heart-rate monitoring via Arduino.',
    stack: ['scikit-learn', 'Arduino'],
    icon: 'chart',
    image: { key: 'projects/diabetes-heart-monitor-system.webp', alt: 'Diabetes heart monitor dashboard' },
    link: github('https://github.com/geo-y20/Diabetes-Prediction-Capstone'),
  },
  {
    title: 'Loan approval automation',
    kicker: 'Personal · ML',
    tags: ['data'],
    outcome: 'Eligibility-prediction model backed by MongoDB, deployed as a Streamlit app.',
    stack: ['MongoDB', 'Streamlit'],
    icon: 'db',
    image: { key: 'projects/loan-approval-automation-mongodb-pymongo.webp', alt: 'Loan approval Streamlit app' },
    link: github('https://github.com/geo-y20/loan-approval-mongodb'),
  },
  {
    title: 'Fashion recommendation system',
    kicker: 'Personal · ML',
    tags: ['data'],
    outcome: 'Personalized fashion recommendations served through a Streamlit web app.',
    stack: ['Machine learning', 'Streamlit'],
    icon: 'chart',
    image: { key: 'projects/fashion-recommendation-system.webp', alt: 'Fashion recommendation app' },
    link: github('https://github.com/geo-y20/fashion-recommendation-system'),
  },
  {
    title: 'Coursera course recommender',
    kicker: 'Personal · Data',
    tags: ['data'],
    outcome: 'Course suggestions from ratings, difficulty and enrollment data.',
    stack: ['pandas', 'Machine learning'],
    icon: 'db',
    link: github('https://github.com/Geo-y20/Coursera-Managment-System.git'),
  },
  {
    title: 'Microsoft stock price prediction',
    kicker: 'Personal · Forecasting',
    tags: ['data'],
    outcome: 'ML model over 2013–2021 MSFT price history using technical-analysis features.',
    stack: ['Time series', 'scikit-learn'],
    icon: 'chart',
    link: github('https://github.com/geo-y20/-microsoft-stock-price-prediction-/tree/main'),
  },
  {
    title: 'Uber rides analysis',
    kicker: 'Personal · Data',
    tags: ['data'],
    outcome: 'Interactive dashboard turning raw ride data into business-ready charts.',
    stack: ['pandas', 'Dashboards'],
    icon: 'bars',
    image: { key: 'projects/uber-ride-data-analysis.webp', alt: 'Uber rides analysis dashboard' },
    link: github('https://github.com/Geo-y20/Uber-Rides-Data-Analysis'),
  },
];

export const archiveGroups = [
  { id: 'g-featured', title: 'Featured case studies', projects: featured.map((p) => ({ ...p, ...p.archive })) },
  { id: 'g-more', title: 'More production work', projects: moreProduction },
  { id: 'g-research', title: 'Research & personal projects', projects: research },
];

export const projectCount = featured.length + moreProduction.length + research.length;
