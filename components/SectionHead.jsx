// Numbered section heading: "01 / Work" eyebrow, title and optional intro.
export default function SectionHead({ index, label, id, title, intro }) {
  return (
    <div className="section-head" data-reveal="">
      <p className="eyebrow"><b>{index}</b> / {label}</p>
      <h2 className="section-title" id={id}>{title}</h2>
      {intro ? <p className="section-intro">{intro}</p> : null}
    </div>
  );
}
