// MEDIA: any forecasting screen or demo must show randomized figures only — never real sales, demand or customer data.
const caseStudy = {
  slug: 'case-study-forecasting',
  number: '10',
  track: 'Data & ML',
  featured: false,
  title: 'Demand forecasting with explainable root causes',
  metaTitle: 'Demand Forecasting | George Youhana',
  metaDescription: 'Case study: production demand forecasting with Ridge + LightGBM per brand, customer and channel, per-SKU model selection by wMAPE and ~15% lower wMAPE than the baseline.',
  ogDescription: 'Ridge + LightGBM per brand/customer/channel, per-SKU model selection by wMAPE, about 15% lower wMAPE than the previous baseline, with LLM root-cause explanations.',
  lede: 'Production forecasting pipelines that pick the best model for every SKU and explain why the numbers moved, about 15% more accurate (wMAPE) than the previous baseline.',
  back: { href: '/all-projects', label: 'All projects' },
  meta: {
    role: 'AI Engineer: modelling, pipelines, dashboard',
    timeline: 'EVA Group · 2025 – present',
    stack: 'Python · Ridge regression · LightGBM · ETS/Croston · PostgreSQL · FastAPI · Chart.js',
  },
  problem: 'Demand planning needs a forecast for every product across brands, customers and channels. Those series behave very differently: some are steady, some seasonal, some sparse and intermittent, so one model for everything is wrong somewhere. Planners also need to know why a forecast changed, not just the new number.',
  solution: [
    { label: 'Panel build', text: 'sales history is mapped to SKUs and built into a panel per brand, customer and channel, read from and written back to PostgreSQL.' },
    { label: 'Per-SKU model selection', text: 'Prophet-style Ridge regression and LightGBM are fitted and each SKU keeps the model with the lowest wMAPE; ETS and Croston act as fallbacks for short or intermittent series.' },
    { label: 'Root causes', text: 'every run stores forecasts with root-cause metrics, and an LLM turns them into a plain-language explanation of what drove the change.' },
    { label: 'Dashboard', text: 'a FastAPI dashboard with Chart.js shows forecasts, accuracy and explanations to the planning team.' },
  ],
  diagram: {
    image: {
      key: 'architecture/forecast-view-architecture.svg',
      width: 790,
      height: 180,
      alt: 'Forecasting pipeline: PostgreSQL forecast data, SKU mapping and panel build, model selection between Ridge + LightGBM with ETS/Croston fallbacks, forecast and root-cause metrics stored back in PostgreSQL, an LLM explanation step, and a FastAPI dashboard with Chart.js',
    },
    caption: 'Data → per-SKU model choice → forecasts and root causes → explanation → dashboard.',
  },
  demo: {
    icon: 'play',
    placeholder: 'Demo coming soon: dashboard forecast → accuracy → LLM explanation',
    video: {
      mp4: 'work/forecasting/demo.mp4',
      webm: 'work/forecasting/demo.webm',
      poster: 'work/forecasting/cover.webp',
      label: 'Demo: the forecasting dashboard showing forecasts, accuracy and an LLM explanation of what drove the change (randomized figures)',
    },
    caption: 'All figures shown in this demo are randomized for demonstration, not real company data.',
  },
  results: [
    { value: '~15%', label: 'lower wMAPE than the previous forecasting baseline' },
    { value: '3', unit: 'levels', label: 'forecasts per brand, customer and channel' },
    { value: 'Per SKU', label: 'best model chosen by wMAPE, with ETS/Croston fallbacks' },
  ],
  // TODO: George to confirm or rewrite these improvement items.
  improvements: [
    { label: 'Experiment tracking', text: 'log every run, model choice and wMAPE in MLflow so accuracy changes can be traced to data or model changes.' },
    { label: 'Drift alerts', text: 'flag SKUs whose error jumps between runs so planners review them before the numbers are used.' },
  ],
  note: 'Enterprise project. Real sales and demand data is confidential; any figures shown on this page are randomized for demonstration.',
  prev: { href: '/case-study-text-digitalization', title: 'Text Digitalization: bilingual product content & regulatory layouts' },
  next: { href: '/all-projects', title: 'All projects' },
};

export default caseStudy;
