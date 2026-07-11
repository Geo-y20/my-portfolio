# my-portfolio

George Youhana's personal portfolio site — static HTML, CSS, and vanilla JS (no framework, no client-side templating at runtime).

## Editing content

Each page is a self-contained HTML file. `index.html` (the homepage) stays at the repo root as the site entry point; every other page lives in `pages/`:

```text
index.html                                    homepage (hero, about, case studies, experience, skills, education, contact)
pages/
  case-study-atr-gpt.html
  case-study-sales-intelligence.html
  case-study-hr-assistant.html
  case-study-sheet-chat.html
  case-study-vision-platform.html
  case-study-learning-automation.html
  all-projects.html                           archive of additional projects not featured on the homepage
```

Shared design tokens, animations and interactive (`:hover`) states live in `assets/css/site.css`. Shared scroll-reveal, stat count-up and chat-widget behavior lives in `assets/js/site.js`.

There is no tracked `public/index.html` etc. — `public/` is a **generated** build output. Edit `index.html` or the pages under `pages/` directly, then rebuild:

```sh
npm run build
```

This runs `build.js`, a small dependency-free Node script that flattens `index.html` + every `pages/*.html` file into `public/` (so deployed URLs stay e.g. `/case-study-atr-gpt.html` regardless of the `pages/` source folder), plus copies `assets/`, `images/`, `robots.txt`, `sitemap.xml`, and the resume PDF. `public/` is the single build output: it's what Vercel deploys (`outputDirectory` in `vercel.json`) and what you should preview locally (open `public/index.html` directly, or `npx serve public`). Don't edit anything inside `public/` — it's regenerated from scratch on every build and is gitignored.

## Chatbot

The floating chat widget calls `/api/chat` (a Vercel serverless function in `api/chat.js`), which proxies to OpenRouter. The `OPENROUTER_API_KEY` must be set as an environment variable in the Vercel project (or a local `.env`, which is gitignored) — it is never exposed client-side.
