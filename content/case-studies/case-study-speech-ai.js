// MEDIA: the demo is a real recording of the internal system; George approved publishing it on 2026-10-24. Any other screenshots must use mock or blurred data.
const caseStudy = {
  slug: 'case-study-speech-ai',
  number: '04',
  track: 'Speech & Arabic',
  featured: true,
  title: 'Speech AI: meeting minutes & call analytics',
  metaTitle: 'Speech AI: Meeting Minutes & Call Analytics | George Youhana',
  metaDescription: 'Case study: live Zoom/Teams transcription with Deepgram into bilingual minutes, and a Whisper + LLM sentiment pipeline covering 1,500 CRM calls a month.',
  ogDescription: 'Live bilingual meeting minutes from Zoom/Teams, and sentiment analytics over 1,500 recorded calls a month.',
  lede: 'Two speech products: a desktop app that turns live Zoom/Teams meetings into bilingual minutes, and a pipeline that scores sentiment on 1,500 recorded calls a month.',
  back: { href: '/#work', label: 'All work' },
  meta: {
    role: 'AI Engineer: app, pipelines, prompt design',
    timeline: 'EVA Group · 2025 – present',
    stack: 'Deepgram · Whisper · OpenAI · Python',
  },
  problem: 'Meetings ran in a mix of Arabic and English, and minutes were written by hand afterwards, late and incomplete. Customer calls were recorded in the CRM, but nobody had time to listen to them, so how customers felt stayed invisible.',
  solution: [
    { label: 'Meeting minutes', text: 'a desktop app captures Zoom or Teams audio and transcribes it live with Deepgram. OpenAI then writes structured minutes in both Arabic and English.' },
    { label: 'Call analytics', text: 'CRM call recordings are transcribed with Whisper and scored for sentiment by an LLM, covering 1,500 calls a month.' },
    { label: 'Model fit', text: 'streaming speech-to-text where latency matters (live meetings) and batch Whisper where volume matters (recorded calls).' },
  ],
  diagram: {
    component: 'SpeechAi',
    caption: 'Streaming where latency matters, batch where volume matters.',
  },
  demo: {
    icon: 'play',
    placeholder: 'Demo coming soon: live transcript → bilingual minutes',
    video: {
      mp4: 'work/speech-ai/demo.mp4',
      webm: 'work/speech-ai/demo.webm',
      poster: 'work/speech-ai/cover.webp',
      label: 'Demo: a meeting is recorded and transcribed live, then the app produces structured minutes in Arabic and English',
    },
  },
  results: [
    { value: '1,500', label: 'customer calls analyzed for sentiment each month' },
    { value: 'Live', label: 'transcription during Zoom and Teams meetings' },
    { value: '2', unit: 'languages', label: 'minutes written in both Arabic and English' },
  ],
  // TODO: George to confirm or rewrite these improvement items.
  improvements: [
    { label: 'Action items', text: "extract owners and due dates from the minutes and push them to the team's task tracker." },
    { label: 'Measure it', text: 'track word error rate on a hand-checked set of Egyptian Arabic and code-switched audio, and compare the LLM sentiment labels against a labelled sample of calls.' },
  ],
  note: "Enterprise project. The demo is a recording of the internal system, shared with George's approval; confidential details beyond what it shows are not published.",
  prev: { href: '/case-study-document-ai', title: 'Document AI & OCR' },
  next: { href: '/case-study-hr-assistant', title: 'Offline bilingual HR assistant for EVA Cosmetics' },
};

export default caseStudy;
