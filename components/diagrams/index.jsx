import AtrGpt from './AtrGpt';
import TextToSql from './TextToSql';
import DocumentAi from './DocumentAi';
import SpeechAi from './SpeechAi';

// Inline architecture diagrams, keyed by the `diagram.component` name used in
// content/case-studies/*.js.
const diagrams = { AtrGpt, TextToSql, DocumentAi, SpeechAi };

export default diagrams;

// Renders the named diagram as an element (a static lookup, so no component is
// created during render).
export function renderDiagram(name) {
  switch (name) {
    case 'AtrGpt': return <AtrGpt />;
    case 'TextToSql': return <TextToSql />;
    case 'DocumentAi': return <DocumentAi />;
    case 'SpeechAi': return <SpeechAi />;
    default: return null;
  }
}
