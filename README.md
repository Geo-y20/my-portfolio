# my-portfolio

George Youhana's personal portfolio site — static HTML, CSS, and vanilla JS (no framework, no client-side templating at runtime).

## Editing content

There is no tracked `index.html` — it's a **generated file**, written only to the gitignored `public/` build output. Edit the section partials instead:

```text
partials/
  head-meta.html      <meta> tags + JSON-LD (inside <head>)
  chat-widget.html     floating AI chat button + panel
  navbar.html          top navigation
  hero.html            hero section
  education.html       education timeline
  experience.html      work experience timeline
  projects.html        flagship + archive project cards, filter tabs
  skills.html          technical skills chips
  stats.html           impact stats section
  footer.html          footer CTA + contact + social links
```

The overall page shell (`<head>`/`<body>` wrapper, script tags) lives in `index.template.html`, which references each partial via `<!-- include: partials/x.html -->` markers.

After editing any partial (or the template), rebuild:

```sh
npm run build
```

This runs `build.js`, a small dependency-free Node script that stitches the partials into the template and assembles `public/` — `public/index.html` plus copies of `assets/`, `images/`, `robots.txt`, `sitemap.xml`, and the resume PDF. `public/` is the single build output: it's what Vercel deploys (`outputDirectory` in `vercel.json`) and what you should preview locally (open `public/index.html` directly, or `npx serve public`). Don't edit anything inside `public/` — it's regenerated from scratch on every build and is gitignored.

## Chatbot

The floating chat widget calls `/api/chat` (a Vercel serverless function in `api/chat.js`), which proxies to OpenRouter. The `OPENROUTER_API_KEY` must be set as an environment variable in the Vercel project (or a local `.env`, which is gitignored) — it is never exposed client-side.
