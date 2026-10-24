// Hero "agent trace" window. ILLUSTRATIVE ONLY: a stylised walk through ATR GPT's
// request path, built strictly from facts in the ATR GPT case study and
// content/site.js (policy mode with cited source, pgvector + reranker retrieval,
// OpenAI/Claude routing, guardrails, token/cost monitoring; 900+ employees,
// 20 departments, 5,000 queries/month). No timings or scores are shown because
// none are published. All text is server-rendered; CSS only fades the lines in
// (skipped under prefers-reduced-motion).
const STEPS = [
  { k: 'query', v: <>&quot;working hours?&quot; <span className="trace__dim">· ar</span></> },
  { k: 'guard', v: <>input checks <span className="trace__ok">✓</span></> },
  { k: 'retrieve', v: <>pgvector <span className="trace__dim">→</span> reranker</> },
  { k: 'route', v: <>OpenAI <span className="trace__dim">|</span> Claude</> },
  { k: 'answer', v: <>cited: policy doc <span className="trace__dim">·</span> section</> },
  { k: 'meter', v: <>tokens <span className="trace__dim">·</span> cost <span className="trace__ok">✓</span></> },
];

const STATS = [
  { v: '900+', l: 'employees' },
  { v: '20', l: 'departments' },
  { v: '5,000', l: 'queries / mo' },
];

export default function HeroTrace() {
  return (
    <figure className="trace">
      <div className="trace__window">
        <div className="trace__bar" aria-hidden="true">
          <span className="trace__dots"><i /><i /><i /></span>
          <span className="trace__title">atr-gpt · trace</span>
          <span className="trace__tag">policy mode</span>
        </div>
        <div className="trace__body">
          <p className="trace__cmd" style={{ '--i': 0 }}><span className="trace__prompt" aria-hidden="true">$</span> atr-gpt ask --mode policy</p>
          <dl className="trace__steps">
            {STEPS.map((s, i) => (
              <div className="trace__row" key={s.k} style={{ '--i': i + 1 }}>
                <dt><span aria-hidden="true">› </span>{s.k}</dt>
                <dd>{s.v}</dd>
              </div>
            ))}
          </dl>
          <span className="trace__caret" aria-hidden="true" style={{ '--i': STEPS.length + 1 }} />
        </div>
        <ul className="trace__stats" aria-label="ATR GPT usage">
          {STATS.map((s) => (
            <li key={s.l}><b>{s.v}</b><span>{s.l}</span></li>
          ))}
        </ul>
      </div>
      <figcaption className="trace__caption">Illustrative trace of ATR GPT&apos;s request path, not a live log.</figcaption>
    </figure>
  );
}
