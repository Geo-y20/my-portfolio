// Assembles public/ — the single build output, and the directory Vercel
// serves as static output (outputDirectory in vercel.json). api/ is deployed
// separately as serverless functions regardless of outputDirectory.
// Run `npm run build` after editing any page, then preview public/ directly
// (e.g. `npx serve public`, or just open public/index.html).
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const PUBLIC_DIR = path.join(ROOT, 'public');

// Source path (in the repo) -> output filename (flat, at the public/ root, so
// deployed URLs stay e.g. /case-study-atr-gpt.html regardless of where the
// source file lives in the repo).
const PAGES = [
  'index.html',
  'pages/case-study-atr-gpt.html',
  'pages/case-study-sales-intelligence.html',
  'pages/case-study-hr-assistant.html',
  'pages/case-study-sheet-chat.html',
  'pages/case-study-vision-platform.html',
  'pages/case-study-learning-automation.html',
  'pages/case-study-social-listening.html',
  'pages/all-projects.html',
];

const STATIC_ASSETS = ['assets', 'images', 'robots.txt', 'sitemap.xml', 'George_Youhana_Resume.pdf'];

function build() {
  fs.rmSync(PUBLIC_DIR, { recursive: true, force: true });
  fs.mkdirSync(PUBLIC_DIR, { recursive: true });

  for (const page of PAGES) {
    const src = path.join(ROOT, page);
    if (!fs.existsSync(src)) {
      throw new Error(`Page not found: ${page}`);
    }
    fs.copyFileSync(src, path.join(PUBLIC_DIR, path.basename(page)));
  }

  for (const asset of STATIC_ASSETS) {
    const src = path.join(ROOT, asset);
    if (fs.existsSync(src)) {
      fs.cpSync(src, path.join(PUBLIC_DIR, asset), { recursive: true });
    }
  }

  console.log(`Built ${path.relative(ROOT, PUBLIC_DIR)}/ from ${PAGES.length} pages + static assets`);
}

build();
