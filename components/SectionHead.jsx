// Numbered section eyebrow: "01 ── // work". The rule and the "//" are
// decorative, so screen readers hear "01 work".
export function Eyebrow({ index, label }) {
  return (
    <p className="eyebrow eyebrow--index">
      <b>{index}</b>
      <span className="eyebrow__rule" aria-hidden="true" />
      <span><span className="eyebrow__slash" aria-hidden="true">{'// '}</span>{label.toLowerCase()}</span>
    </p>
  );
}

// Section heading: eyebrow, title and optional intro.
export default function SectionHead({ index, label, id, title, intro }) {
  return (
    <div className="section-head" data-reveal="">
      <Eyebrow index={index} label={label} />
      <h2 className="section-title" id={id}>{title}</h2>
      {intro ? <p className="section-intro">{intro}</p> : null}
    </div>
  );
}
