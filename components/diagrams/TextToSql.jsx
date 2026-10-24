// Text-to-SQL and Sheet Chat architecture diagram.
// Converted from the static site's inline SVG. Styling comes from the .dg-* classes in globals.css.
export default function TextToSqlDiagram() {
  return (
    <svg viewBox="0 0 860 360" role="img" aria-labelledby="dg-sql-t dg-sql-d">
      <title id="dg-sql-t">Text-to-SQL and Sheet Chat architecture</title>
      <desc id="dg-sql-d">Top: a business question is matched to schema context from 10 tables, an LLM generates SQL, the SQL is validated and run on Oracle Autonomous Database, and the answer returns with an explanation. Bottom: an uploaded Excel or CSV file goes to a LangGraph planner that keeps state and routes to SQL on DuckDB, chart generation or data-quality checks, then to a natural-language explanation.</desc>
      <defs>
        <marker id="dg-sql-a" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path className="dg-arrow" d="M0,0 L8,4 L0,8 Z"/></marker>
        <marker id="dg-sql-aa" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path className="dg-arrow--accent" d="M0,0 L8,4 L0,8 Z"/></marker>
      </defs>

      <rect className="dg-group" x="6" y="8" width="848" height="112" rx="12"/>
      <text className="dg-group-label" x="20" y="28">TEXT-TO-SQL · ORACLE AUTONOMOUS DB</text>
      <rect className="dg-group" x="6" y="140" width="848" height="212" rx="12"/>
      <text className="dg-group-label" x="20" y="160">SHEET CHAT · STATEFUL LANGGRAPH AGENT</text>

      <path className="dg-edge" d="M170,68 H188" markerEnd="url(#dg-sql-a)"/>
      <path className="dg-edge" d="M340,68 H358" markerEnd="url(#dg-sql-a)"/>
      <path className="dg-edge dg-edge--accent" d="M510,68 H528" markerEnd="url(#dg-sql-aa)"/>
      <path className="dg-edge" d="M680,68 H698" markerEnd="url(#dg-sql-a)"/>

      <rect className="dg-node" x="20" y="40" width="150" height="56" rx="10"/>
      <text className="dg-label" x="95" y="65" textAnchor="middle">Business question</text>
      <text className="dg-sub" x="95" y="83" textAnchor="middle">plain language</text>
      <rect className="dg-node" x="190" y="40" width="150" height="56" rx="10"/>
      <text className="dg-label" x="265" y="65" textAnchor="middle">Schema context</text>
      <text className="dg-sub" x="265" y="83" textAnchor="middle">10 tables</text>
      <rect className="dg-node dg-node--accent" x="360" y="40" width="150" height="56" rx="10"/>
      <text className="dg-label" x="435" y="65" textAnchor="middle">SQL generation</text>
      <text className="dg-sub" x="435" y="83" textAnchor="middle">LLM</text>
      <rect className="dg-node" x="530" y="40" width="150" height="56" rx="10"/>
      <text className="dg-label" x="605" y="65" textAnchor="middle">Validate &amp; run</text>
      <text className="dg-sub" x="605" y="83" textAnchor="middle">Oracle ADB</text>
      <rect className="dg-node" x="700" y="40" width="150" height="56" rx="10"/>
      <text className="dg-label" x="775" y="65" textAnchor="middle">Answer</text>
      <text className="dg-sub" x="775" y="83" textAnchor="middle">table + explanation</text>

      <path className="dg-edge" d="M170,262 H198" markerEnd="url(#dg-sql-a)"/>
      <path className="dg-edge dg-edge--accent" d="M350,262 C385,262 385,206 418,206" markerEnd="url(#dg-sql-aa)"/>
      <path className="dg-edge dg-edge--accent" d="M350,262 H418" markerEnd="url(#dg-sql-aa)"/>
      <path className="dg-edge dg-edge--accent" d="M350,262 C385,262 385,318 418,318" markerEnd="url(#dg-sql-aa)"/>
      <path className="dg-edge" d="M600,206 C640,206 640,262 678,262" markerEnd="url(#dg-sql-a)"/>
      <path className="dg-edge" d="M600,262 H678" markerEnd="url(#dg-sql-a)"/>
      <path className="dg-edge" d="M600,318 C640,318 640,262 678,262" markerEnd="url(#dg-sql-a)"/>

      <rect className="dg-node" x="20" y="234" width="150" height="56" rx="10"/>
      <text className="dg-label" x="95" y="259" textAnchor="middle">Excel / CSV</text>
      <text className="dg-sub" x="95" y="277" textAnchor="middle">user upload</text>
      <rect className="dg-node dg-node--accent" x="200" y="234" width="150" height="56" rx="10"/>
      <text className="dg-label" x="275" y="259" textAnchor="middle">Planner</text>
      <text className="dg-sub" x="275" y="277" textAnchor="middle">LangGraph state</text>
      <rect className="dg-node" x="420" y="186" width="180" height="40" rx="8"/>
      <text className="dg-label" x="510" y="211" textAnchor="middle">SQL · DuckDB</text>
      <rect className="dg-node" x="420" y="242" width="180" height="40" rx="8"/>
      <text className="dg-label" x="510" y="267" textAnchor="middle">Charts</text>
      <rect className="dg-node" x="420" y="298" width="180" height="40" rx="8"/>
      <text className="dg-label" x="510" y="323" textAnchor="middle">Data-quality checks</text>
      <rect className="dg-node" x="680" y="234" width="170" height="56" rx="10"/>
      <text className="dg-label" x="765" y="259" textAnchor="middle">Explanation</text>
      <text className="dg-sub" x="765" y="277" textAnchor="middle">plain-language summary</text>
    </svg>
  );
}
