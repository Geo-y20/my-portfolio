// MEDIA: card cover/demo must use mock or blurred company data — never real employee questions, documents or names.
const caseStudy = {
  slug: 'case-study-atr-gpt',
  number: '01',
  track: 'Agents & RAG',
  featured: true,
  title: 'ATR GPT: agentic RAG assistant',
  metaTitle: 'ATR GPT: Agentic RAG Assistant | George Youhana',
  metaDescription: 'Case study: an agentic RAG assistant on FastAPI + PostgreSQL/pgvector used by 900+ employees across 20 departments (5,000 queries/month), with OpenAI/Claude routing and PPT/Word tools.',
  ogDescription: '900+ employees, 20 departments, 5,000 queries/month. Tool-calling agents, reranked pgvector retrieval, OpenAI/Claude routing.',
  lede: 'An internal assistant that answers from company knowledge and acts on it, used by 900+ employees across 20 departments for 5,000 queries a month.',
  back: { href: '/#work', label: 'All work' },
  meta: {
    role: 'AI Engineer: architecture, backend, deployment',
    timeline: 'EVA Group · 2025 – present',
    stack: 'FastAPI · PostgreSQL + pgvector · reranker · OpenAI · Claude',
  },
  problem: "Employees searched scattered documents and departmental repositories, or waited on subject-matter experts, to answer routine questions. Knowledge sat in silos across 20 departments, and every answer cost someone else's time.",
  solution: [
    { label: 'Retrieval', text: 'a FastAPI RAG service on PostgreSQL + pgvector, with a reranking step so the model sees the most relevant passages first.' },
    { label: 'Agents', text: 'tool-calling agents with conversation memory that go beyond answering and produce PowerPoint and Word deliverables.' },
    { label: 'Model routing', text: 'each request goes to OpenAI or Claude based on cost, latency and quality.' },
    { label: 'Operations', text: 'guardrails on inputs and outputs, plus token and cost monitoring per request.' },
  ],
  diagram: {
    component: 'AtrGpt',
    caption: 'Request path: gateway → agent → retrieval and tools, with every model call routed and metered.',
  },
  demo: {
    icon: 'play',
    placeholder: 'Demo coming soon: question → cited answer → generated slide deck',
    video: {
      mp4: 'work/atr-gpt/demo.mp4',
      webm: 'work/atr-gpt/demo.webm',
      poster: 'work/atr-gpt/cover.webp',
      label: 'Demo: an employee asks a policy question, gets a cited answer, then asks the agent to turn it into a slide deck (mock data)',
    },
  },
  results: [
    { value: '900+', label: 'employees using it across 20 departments' },
    { value: '5,000', label: 'queries per month' },
    { value: '2', unit: 'providers', label: 'OpenAI and Claude, routed per request for cost, latency and quality' },
  ],
  // TODO: George to confirm or rewrite these improvement items.
  improvements: [
    { label: 'Tracing', text: 'add LangSmith or Langfuse traces so any bad answer can be replayed step by step, from retrieval through tool calls to the model.' },
    { label: 'Evaluation in CI', text: 'turn the RAG evaluation set into a regression gate that runs on every prompt or retriever change.' },
    { label: 'Feedback loop', text: 'feed thumbs-up/down signals into reranker tuning and the eval set.' },
  ],
  note: 'Enterprise project. Screens and demos use mock or blurred data; no internal documents or employee information are shown.',
  prev: null,
  next: { href: '/case-study-text-to-sql', title: 'Text-to-SQL → Sheet Chat' },
};

export default caseStudy;
