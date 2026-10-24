// Speech AI architecture diagram.
// Converted from the static site's inline SVG. Styling comes from the .dg-* classes in globals.css.
export default function SpeechAiDiagram() {
  return (
    <svg viewBox="0 0 860 300" role="img" aria-labelledby="dg-sp-t dg-sp-d">
      <title id="dg-sp-t">Speech AI architecture</title>
      <desc id="dg-sp-d">Top: Zoom or Teams audio is captured by a desktop app, streamed to Deepgram for live transcription, and summarized by OpenAI into bilingual Arabic and English minutes. Bottom: CRM call recordings are transcribed in batch by Whisper, scored for sentiment by an LLM, and stored as per-call sentiment results, about 1,500 calls a month.</desc>
      <defs>
        <marker id="dg-sp-a" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path className="dg-arrow" d="M0,0 L8,4 L0,8 Z"/></marker>
        <marker id="dg-sp-aa" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path className="dg-arrow--accent" d="M0,0 L8,4 L0,8 Z"/></marker>
      </defs>

      <rect className="dg-group" x="6" y="8" width="848" height="128" rx="12"/>
      <text className="dg-group-label" x="20" y="28">MEETING MINUTES · LIVE</text>
      <rect className="dg-group" x="6" y="156" width="848" height="136" rx="12"/>
      <text className="dg-group-label" x="20" y="176">CALL ANALYTICS · BATCH · 1,500 CALLS/MONTH</text>

      <path className="dg-edge" d="M200,76 H228" markerEnd="url(#dg-sp-a)"/>
      <path className="dg-edge dg-edge--accent" d="M410,76 H438" markerEnd="url(#dg-sp-aa)"/>
      <path className="dg-edge" d="M620,76 H648" markerEnd="url(#dg-sp-a)"/>

      <rect className="dg-node" x="20" y="46" width="180" height="60" rx="10"/>
      <text className="dg-label" x="110" y="72" textAnchor="middle">Zoom / Teams</text>
      <text className="dg-sub" x="110" y="90" textAnchor="middle">desktop audio capture</text>
      <rect className="dg-node" x="230" y="46" width="180" height="60" rx="10"/>
      <text className="dg-label" x="320" y="72" textAnchor="middle">Live transcription</text>
      <text className="dg-sub" x="320" y="90" textAnchor="middle">Deepgram streaming</text>
      <rect className="dg-node dg-node--accent" x="440" y="46" width="180" height="60" rx="10"/>
      <text className="dg-label" x="530" y="72" textAnchor="middle">Minutes writer</text>
      <text className="dg-sub" x="530" y="90" textAnchor="middle">OpenAI</text>
      <rect className="dg-node" x="650" y="46" width="190" height="60" rx="10"/>
      <text className="dg-label" x="745" y="72" textAnchor="middle">Bilingual minutes</text>
      <text className="dg-sub" x="745" y="90" textAnchor="middle">Arabic + English</text>

      <path className="dg-edge" d="M200,232 H228" markerEnd="url(#dg-sp-a)"/>
      <path className="dg-edge dg-edge--accent" d="M410,232 H438" markerEnd="url(#dg-sp-aa)"/>
      <path className="dg-edge" d="M620,232 H648" markerEnd="url(#dg-sp-a)"/>

      <rect className="dg-node" x="20" y="202" width="180" height="60" rx="10"/>
      <text className="dg-label" x="110" y="228" textAnchor="middle">CRM recordings</text>
      <text className="dg-sub" x="110" y="246" textAnchor="middle">customer calls</text>
      <rect className="dg-node" x="230" y="202" width="180" height="60" rx="10"/>
      <text className="dg-label" x="320" y="228" textAnchor="middle">Transcription</text>
      <text className="dg-sub" x="320" y="246" textAnchor="middle">Whisper (batch)</text>
      <rect className="dg-node dg-node--accent" x="440" y="202" width="180" height="60" rx="10"/>
      <text className="dg-label" x="530" y="228" textAnchor="middle">Sentiment</text>
      <text className="dg-sub" x="530" y="246" textAnchor="middle">LLM scoring</text>
      <rect className="dg-node" x="650" y="202" width="190" height="60" rx="10"/>
      <text className="dg-label" x="745" y="228" textAnchor="middle">Call insights</text>
      <text className="dg-sub" x="745" y="246" textAnchor="middle">per-call sentiment</text>
    </svg>
  );
}
