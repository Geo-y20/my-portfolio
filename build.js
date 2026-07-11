// Stitches partials/*.html into index.template.html and assembles public/ —
// the single build output, and the directory Vercel serves as static output
// (outputDirectory in vercel.json). api/ is deployed separately as
// serverless functions regardless of outputDirectory.
// Run `npm run build` after editing any partial, then preview public/
// directly (e.g. `npx serve public`, or just open public/index.html).
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const TEMPLATE_PATH = path.join(ROOT, 'index.template.html');
const PUBLIC_DIR = path.join(ROOT, 'public');
const STATIC_ASSETS = ['assets', 'images', 'robots.txt', 'sitemap.xml', 'George_Youhana_Resume.pdf'];

const INCLUDE_RE = /<!--\s*include:\s*([^\s]+\.html)\s*-->/g;

function build() {
  const template = fs.readFileSync(TEMPLATE_PATH, 'utf8');

  const output = template.replace(INCLUDE_RE, (match, relPath) => {
    const partialPath = path.join(ROOT, relPath);
    if (!fs.existsSync(partialPath)) {
      throw new Error(`Partial not found: ${relPath} (referenced in ${TEMPLATE_PATH})`);
    }
    return fs.readFileSync(partialPath, 'utf8').replace(/\n$/, '');
  });

  fs.rmSync(PUBLIC_DIR, { recursive: true, force: true });
  fs.mkdirSync(PUBLIC_DIR, { recursive: true });
  fs.writeFileSync(path.join(PUBLIC_DIR, 'index.html'), output, 'utf8');
  for (const asset of STATIC_ASSETS) {
    const src = path.join(ROOT, asset);
    if (fs.existsSync(src)) {
      fs.cpSync(src, path.join(PUBLIC_DIR, asset), { recursive: true });
    }
  }
  console.log(`Built ${path.relative(ROOT, PUBLIC_DIR)}/ from ${path.relative(ROOT, TEMPLATE_PATH)} + partials/`);
}

build();
