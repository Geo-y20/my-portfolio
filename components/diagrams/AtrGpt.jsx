// ATR GPT architecture diagram.
// Converted from the static site's inline SVG. Styling comes from the .dg-* classes in globals.css.
export default function AtrGptDiagram() {
  return (
    <svg viewBox="0 0 860 280" role="img" aria-labelledby="dg-atr-t dg-atr-d">
      <title id="dg-atr-t">ATR GPT architecture</title>
      <desc id="dg-atr-d">An employee&apos;s request goes to a FastAPI gateway with guardrails, then to a tool-calling agent with memory. The agent calls a retriever (pgvector plus reranker) and document tools (PowerPoint and Word), and sends prompts to a model router that chooses OpenAI or Claude. The router logs tokens and cost to a monitoring store.</desc>
      <defs>
        <marker id="dg-atr-a" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path className="dg-arrow" d="M0,0 L8,4 L0,8 Z"/></marker>
        <marker id="dg-atr-aa" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path className="dg-arrow--accent" d="M0,0 L8,4 L0,8 Z"/></marker>
      </defs>
      <path className="dg-edge" d="M190,70 H228" markerEnd="url(#dg-atr-a)"/>
      <path className="dg-edge" d="M400,70 H438" markerEnd="url(#dg-atr-a)"/>
      <path className="dg-edge dg-edge--accent" d="M610,70 H668" markerEnd="url(#dg-atr-aa)"/>
      <path className="dg-edge dg-edge--accent" d="M500,100 C500,150 315,150 315,198" markerEnd="url(#dg-atr-aa)"/>
      <path className="dg-edge dg-edge--accent" d="M525,100 V198" markerEnd="url(#dg-atr-aa)"/>
      <path className="dg-edge" d="M755,100 V198" markerEnd="url(#dg-atr-a)"/>
      <text className="dg-sub" x="620" y="60">prompt</text>
      <text className="dg-sub" x="764" y="155">tokens · cost</text>

      <rect className="dg-node" x="20" y="40" width="170" height="60" rx="10"/>
      <text className="dg-label" x="105" y="67" textAnchor="middle">Employee</text>
      <text className="dg-sub" x="105" y="85" textAnchor="middle">web chat · 20 depts</text>

      <rect className="dg-node" x="230" y="40" width="170" height="60" rx="10"/>
      <text className="dg-label" x="315" y="67" textAnchor="middle">FastAPI gateway</text>
      <text className="dg-sub" x="315" y="85" textAnchor="middle">auth · guardrails</text>

      <rect className="dg-node dg-node--accent" x="440" y="40" width="170" height="60" rx="10"/>
      <text className="dg-label" x="525" y="67" textAnchor="middle">Agent + memory</text>
      <text className="dg-sub" x="525" y="85" textAnchor="middle">plans · calls tools</text>

      <rect className="dg-node" x="670" y="40" width="170" height="60" rx="10"/>
      <text className="dg-label" x="755" y="67" textAnchor="middle">Model router</text>
      <text className="dg-sub" x="755" y="85" textAnchor="middle">OpenAI / Claude</text>

      <rect className="dg-node" x="230" y="200" width="170" height="60" rx="10"/>
      <text className="dg-label" x="315" y="227" textAnchor="middle">Retriever</text>
      <text className="dg-sub" x="315" y="245" textAnchor="middle">pgvector + reranker</text>

      <rect className="dg-node" x="440" y="200" width="170" height="60" rx="10"/>
      <text className="dg-label" x="525" y="227" textAnchor="middle">Document tools</text>
      <text className="dg-sub" x="525" y="245" textAnchor="middle">PowerPoint / Word</text>

      <rect className="dg-node" x="670" y="200" width="170" height="60" rx="10"/>
      <text className="dg-label" x="755" y="227" textAnchor="middle">Logs &amp; cost monitor</text>
      <text className="dg-sub" x="755" y="245" textAnchor="middle">per-request usage</text>
    </svg>
  );
}
