// MEDIA: the demo is a real recording of the internal system; George approved publishing it on 2026-10-24. Any other screenshots must use mock or blurred data.
const caseStudy = {
  slug: 'case-study-vision-platform',
  number: '06',
  track: 'Vision & Docs',
  featured: false,
  title: 'On-prem vision platform',
  metaTitle: 'On-Prem Vision Platform | George Youhana',
  metaDescription: 'Case study: on-prem computer vision on 20 cameras across 3 sites: fire/violence detection (~95%), license plates (~90%), people counting and attendance.',
  ogDescription: '20 cameras, 3 sites. Fire/violence detection at ~95%, license plates at ~90%, plus people counting and attendance, all on-premise.',
  lede: 'An on-premise vision platform on existing cameras for fire and violence detection, license plates, people counting and attendance, running on 20 cameras across 3 sites.',
  back: { href: '/all-projects', label: 'All projects' },
  meta: {
    role: 'AI Engineer: architecture, model integration, deployment',
    timeline: 'EVA Group · 2025 – present',
    stack: 'Python · OpenCV · YOLO · face recognition · OCR · Docker',
  },
  problem: 'Facility security and attendance depended on people manually watching camera feeds and entry points. That meant missed incidents, slow detection and a heavy manual workload across several sites.',
  solution: [
    { label: 'Detection models', text: 'fire and violence detection, license-plate recognition, driver-ID scanning, face-recognition attendance and people counting, running on the existing camera feeds.' },
    { label: 'Real-time alerting', text: 'detections trigger alerts for security teams and feed attendance records automatically.' },
    { label: 'CPU/GPU inference', text: 'GPU where several models must run concurrently, CPU on sites without GPU hardware to keep infrastructure cost down.' },
    { label: 'Deployment', text: 'containerized components with Docker, kept fully on-premise.' },
  ],
  diagram: {
    image: {
      key: 'architecture/vision-platform-architecture.svg',
      width: 640,
      height: 226,
      alt: 'Vision platform architecture: camera feeds go into fire/violence detection, license-plate recognition and face recognition models, run through CPU/GPU inference, and produce real-time alerts and attendance records',
    },
    caption: 'Frame path: camera feeds → detection and recognition models → CPU/GPU inference → alerts and attendance.',
  },
  demo: {
    icon: 'play',
    placeholder: 'Demo coming soon: camera feed → detection → real-time alert',
    video: {
      mp4: 'work/vision-platform/demo.mp4',
      webm: 'work/vision-platform/demo.webm',
      poster: 'work/vision-platform/cover.webp',
      label: 'Demo: CCTV feeds with live person detection, face-recognition labels and a fire-detection alert',
    },
  },
  results: [
    { value: '20', unit: 'cameras', label: 'across 3 sites, on existing camera infrastructure' },
    { value: '~95%', label: 'fire and violence detection accuracy' },
    { value: '~90%', label: 'license-plate recognition accuracy' },
  ],
  // TODO: George to confirm or rewrite these improvement items.
  improvements: [
    { label: 'False-alarm review', text: 'let operators label alerts as true or false so the detection models can be retrained on site-specific footage.' },
    { label: 'Health monitoring', text: 'track per-camera stream uptime and inference latency so a dropped feed is noticed before an incident is missed.' },
    { label: 'Model optimization', text: 'export models to a faster runtime to fit more concurrent cameras on the CPU-only sites.' },
  ],
  note: "Enterprise project. The demo is a recording of the internal system, shared with George's approval; confidential details beyond what it shows are not published.",
  prev: { href: '/case-study-hr-assistant', title: 'Offline Arabic HR assistant' },
  next: { href: '/case-study-learning-automation', title: 'Learning automation platform' },
};

export default caseStudy;
