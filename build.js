// Stitches partials/*.html into index.template.html to produce the deployed,
// plain static index.html. Run `npm run build` after editing any partial.
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const TEMPLATE_PATH = path.join(ROOT, 'index.template.html');
const OUTPUT_PATH = path.join(ROOT, 'index.html');

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
}

build();
