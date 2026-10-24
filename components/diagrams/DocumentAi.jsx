// Document AI pipeline diagram.
// Converted from the static site's inline SVG. Styling comes from the .dg-* classes in globals.css.
export default function DocumentAiDiagram() {
  return (
    <svg viewBox="0 0 860 250" role="img" aria-labelledby="dg-doc-t dg-doc-d">
      <title id="dg-doc-t">Document AI pipeline</title>
      <desc id="dg-doc-d">Cheque scans and Arabic–English product labels go through image preprocessing and OCR, then field extraction for batch, expiry, quantity and cheque fields, then validation. Valid records are ingested into the ERP; failed records are flagged.</desc>
      <defs>
        <marker id="dg-doc-a" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path className="dg-arrow" d="M0,0 L8,4 L0,8 Z"/></marker>
        <marker id="dg-doc-aa" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path className="dg-arrow--accent" d="M0,0 L8,4 L0,8 Z"/></marker>
      </defs>

      <path className="dg-edge" d="M160,58 C180,58 180,125 198,125" markerEnd="url(#dg-doc-a)"/>
      <path className="dg-edge" d="M160,192 C180,192 180,125 198,125" markerEnd="url(#dg-doc-a)"/>
      <path className="dg-edge" d="M340,125 H368" markerEnd="url(#dg-doc-a)"/>
      <path className="dg-edge dg-edge--accent" d="M510,125 H538" markerEnd="url(#dg-doc-aa)"/>
      <path className="dg-edge dg-edge--accent" d="M680,125 C695,125 695,58 708,58" markerEnd="url(#dg-doc-aa)"/>
      <path className="dg-edge" d="M680,125 C695,125 695,192 708,192" markerEnd="url(#dg-doc-a)"/>
      <text className="dg-sub" x="740" y="100">pass</text>
      <text className="dg-sub" x="740" y="160">fail</text>

      <rect className="dg-node" x="20" y="30" width="140" height="56" rx="10"/>
      <text className="dg-label" x="90" y="55" textAnchor="middle">Cheque scans</text>
      <text className="dg-sub" x="90" y="73" textAnchor="middle">finance</text>
      <rect className="dg-node" x="20" y="164" width="140" height="56" rx="10"/>
      <text className="dg-label" x="90" y="189" textAnchor="middle">Product labels</text>
      <text className="dg-sub" x="90" y="207" textAnchor="middle">Arabic + English</text>

      <rect className="dg-node" x="200" y="97" width="140" height="56" rx="10"/>
      <text className="dg-label" x="270" y="122" textAnchor="middle">Preprocess + OCR</text>
      <text className="dg-sub" x="270" y="140" textAnchor="middle">Cloud Vision</text>
      <rect className="dg-node" x="370" y="97" width="140" height="56" rx="10"/>
      <text className="dg-label" x="440" y="122" textAnchor="middle">Field extraction</text>
      <text className="dg-sub" x="440" y="140" textAnchor="middle">batch · expiry · qty</text>
      <rect className="dg-node dg-node--accent" x="540" y="97" width="140" height="56" rx="10"/>
      <text className="dg-label" x="610" y="122" textAnchor="middle">Validation</text>
      <text className="dg-sub" x="610" y="140" textAnchor="middle">per-field rules</text>

      <rect className="dg-node" x="710" y="30" width="140" height="56" rx="10"/>
      <text className="dg-label" x="780" y="55" textAnchor="middle">ERP ingestion</text>
      <text className="dg-sub" x="780" y="73" textAnchor="middle">structured record</text>
      <rect className="dg-node" x="710" y="164" width="140" height="56" rx="10"/>
      <text className="dg-label" x="780" y="189" textAnchor="middle">Flagged</text>
      <text className="dg-sub" x="780" y="207" textAnchor="middle">fix before ingest</text>
    </svg>
  );
}
