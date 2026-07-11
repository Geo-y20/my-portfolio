// Stitches partials/*.html into index.template.html to produce the deployed,
// plain static index.html, then assembles public/ — the directory Vercel
// serves as static output (outputDirectory in vercel.json). api/ is deployed
// separately as serverless functions regardless of outputDirectory.
// Run `npm run build` after editing any partial.
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const TEMPLATE_PATH = path.join(ROOT, 'index.template.html');
const OUTPUT_PATH = path.join(ROOT, 'index.html');
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

  fs.writeFileSync(OUTPUT_PATH, output, 'utf8');
  console.log(`Built ${path.relative(ROOT, OUTPUT_PATH)} from ${path.relative(ROOT, TEMPLATE_PATH)} + partials/`);

  fs.rmSync(PUBLIC_DIR, { recursive: true, force: true });
  fs.mkdirSync(PUBLIC_DIR, { recursive: true });
  fs.writeFileSync(path.join(PUBLIC_DIR, 'index.html'), output, 'utf8');
  for (const asset of STATIC_ASSETS) {
    const src = path.join(ROOT, asset);
    if (fs.existsSync(src)) {
      fs.cpSync(src, path.join(PUBLIC_DIR, asset), { recursive: true });
    }
  }
  console.log(`Assembled Vercel static output in ${path.relative(ROOT, PUBLIC_DIR)}/`);
}

build();
