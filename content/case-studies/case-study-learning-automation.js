// MEDIA: card cover/demo must use mock or blurred company data — never real learner files, transcripts or names.
const caseStudy = {
  slug: 'case-study-learning-automation',
  number: '07',
  track: 'Speech & Arabic',
  featured: false,
  title: 'Learning automation platform',
  metaTitle: 'Learning Automation Platform | George Youhana',
  metaDescription: 'Case study: a FastAPI platform with Whisper transcription, PDF extraction and NLP summarization that processed 5,000+ files at ~95% transcription accuracy.',
  ogDescription: '5,000+ files processed, ~95% transcription accuracy, ~50% less manual review time. Whisper, PDF extraction and NLP summarization on FastAPI.',
  lede: 'A FastAPI platform that turns audio, video and PDF learning content into transcripts and summaries, processing 5,000+ files at ~95% transcription accuracy.',
  back: { href: '/all-projects', label: 'All projects' },
  meta: {
    role: 'AI Engineer / Architect: design, pipelines, API',
    timeline: 'Independent / freelance project · TODO: dates',
    stack: 'Python · FastAPI · OpenAI Whisper · NLP summarization',
  },
  problem: 'Reviewing audio, video and PDF learning content meant transcribing and summarizing it by hand before it could be checked or reused. At high file volumes across mixed media types, that manual work became the bottleneck.',
  solution: [
    { label: 'Transcription', text: 'OpenAI Whisper converts audio and video files into text with speech-to-text workflows.' },
    { label: 'PDF extraction', text: 'a pipeline pulls text out of PDF files so documents enter the same flow as recordings.' },
    { label: 'Summarization', text: 'an NLP step condenses transcripts and extracted text into reviewable summaries.' },
    { label: 'API', text: 'FastAPI endpoints process files in batches, so large uploads run without blocking on any single file.' },
  ],
  diagram: {
    image: {
      key: 'architecture/learning-automation-architecture.svg',
      width: 640,
      height: 226,
      alt: 'Audio and video files are transcribed with OpenAI Whisper while PDF files go through text extraction; both streams merge into NLP summarization and are delivered through a FastAPI API.',
    },
    caption: 'Two input paths, one output: Whisper for recordings, extraction for PDFs, then summarization behind a single API.',
  },
  demo: {
    icon: 'play',
    placeholder: 'Demo coming soon: upload → transcript → summary',
    image: {
      key: 'projects/ai-powered-learning-automation-platform.webp',
      alt: 'Learning automation platform upload screen: choose a file type (PDF, audio or video) and upload it for processing',
    },
    video: {
      mp4: 'work/learning-automation/demo.mp4',
      webm: 'work/learning-automation/demo.webm',
      poster: 'work/learning-automation/cover.webp',
      label: 'Demo: a lecture recording is uploaded, transcribed with Whisper and summarized (mock data)',
    },
  },
  results: [
    { value: '5,000+', label: 'files processed' },
    { value: '~95%', label: 'transcription accuracy' },
    { value: '~50%', label: 'less manual review time' },
  ],
  // TODO: George to confirm or rewrite these improvement items.
  improvements: [
    { label: 'Accuracy tracking', text: 'keep a small hand-checked transcript set and measure word error rate on every model or setting change.' },
    { label: 'Job status', text: 'show per-file progress and failures in the UI so reviewers know when a batch is ready.' },
    { label: 'Summary feedback', text: 'let reviewers flag weak summaries and use those flags to tune the summarization prompt.' },
  ],
  note: 'Independent project. Screens and demos use mock or sample data; no real learner content or personal information is shown.',
  prev: { href: '/case-study-vision-platform', title: 'On-prem vision platform' },
  next: { href: '/case-study-social-listening', title: 'Social listening platform' },
};

export default caseStudy;
