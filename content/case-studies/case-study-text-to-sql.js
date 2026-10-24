// MEDIA: card cover/demo must use mock or blurred company data — never real sales figures, customer names or schema details.
const caseStudy = {
  slug: 'case-study-text-to-sql',
  number: '02',
  track: 'Data & ML · Agents',
  featured: true,
  title: 'Text-to-SQL → Sheet Chat',
  metaTitle: 'Text-to-SQL → Sheet Chat | George Youhana',
  metaDescription: 'Case study: Text-to-SQL over 10 Oracle Autonomous DB tables cut answers from 1–2 days to ~10s (90% correct SQL on 100 questions), extended into a LangGraph agent.',
  ogDescription: '~10s answers instead of 1–2 days of manual reports; 90% correct SQL on a 100-question eval set; extended into a stateful LangGraph data agent.',
  // The static page used a shorter Twitter description than the Open Graph one.
  twitterDescription: '~10s answers instead of 1–2 days of manual reports; 90% correct SQL on a 100-question eval set.',
  lede: 'Business teams ask sales questions in plain language and get an answer in about 10 seconds instead of waiting 1–2 days for a manual report.',
  back: { href: '/#work', label: 'All work' },
  meta: {
    role: 'AI Engineer: design, backend, evaluation',
    timeline: 'EVA Group · 2025 – present',
    stack: 'Oracle Autonomous DB · FastAPI · LangGraph · DuckDB',
  },
  problem: 'Every new question about sales data became a request to the data team, and a manual report took 1–2 days. Decision-makers either waited or decided without the numbers, and analysts spent their time on one-off SQL.',
  solution: [
    { label: 'Text-to-SQL', text: 'a question is mapped to the right schema context across 10 Oracle Autonomous DB tables, turned into SQL by an LLM, validated before it runs, and returned as a table with a plain-language explanation.' },
    { label: 'Evaluation', text: 'a set of 100 real business questions with expected answers. The system writes correct SQL for 90% of them, and every change is measured against the same set.' },
    { label: 'Sheet Chat', text: 'the same idea extended to any spreadsheet. It is a stateful LangGraph agent on DuckDB that plans the analysis, queries, draws charts and runs data-quality checks before answering.' },
  ],
  diagram: {
    component: 'TextToSql',
    caption: 'One pattern, two surfaces: governed SQL over the warehouse, and an agent over any spreadsheet.',
  },
  demo: {
    icon: 'play',
    placeholder: 'Demo coming soon: question → SQL → chart → explanation',
    video: {
      mp4: 'work/text-to-sql/demo.mp4',
      webm: 'work/text-to-sql/demo.webm',
      poster: 'work/text-to-sql/cover.webp',
      label: 'Demo: a user asks a sales question, sees the generated SQL, a chart and a plain-language explanation (mock data)',
    },
  },
  results: [
    { value: '~10s', label: 'per answer, down from 1–2 days of manual reporting' },
    { value: '90%', label: 'correct SQL on a 100-question business eval set' },
    { value: '10', unit: 'tables', label: 'of Oracle Autonomous DB queryable in plain language' },
  ],
  // TODO: George to confirm or rewrite these improvement items.
  improvements: [
    { label: 'The last 10%', text: 'group the failing eval questions by cause (ambiguous wording, missing join, business-rule gaps) and fix each group with schema notes or few-shot examples.' },
    { label: 'Grow the eval set', text: 'log real user questions and promote the hard ones into the evaluation set, so it keeps up with how people actually ask.' },
    { label: 'Shared core', text: 'run the Oracle Text-to-SQL path through the same LangGraph planner as Sheet Chat, so both get charts and data-quality checks.' },
  ],
  note: 'Enterprise project. Database structures and real sales figures are not shown; screens and demos use mock data.',
  prev: { href: '/case-study-atr-gpt', title: 'ATR GPT: agentic RAG assistant' },
  next: { href: '/case-study-document-ai', title: 'Document AI & OCR' },
};

export default caseStudy;
