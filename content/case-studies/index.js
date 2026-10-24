import atrGpt from './case-study-atr-gpt';
import textToSql from './case-study-text-to-sql';
import documentAi from './case-study-document-ai';
import speechAi from './case-study-speech-ai';
import hrAssistant from './case-study-hr-assistant';
import visionPlatform from './case-study-vision-platform';
import learningAutomation from './case-study-learning-automation';
import socialListening from './case-study-social-listening';
import textDigitalization from './case-study-text-digitalization';

// Ordered 01 → 09; this order also drives the prev/next pager chain.
export const caseStudies = [
  atrGpt,
  textToSql,
  documentAi,
  speechAi,
  hrAssistant,
  visionPlatform,
  learningAutomation,
  socialListening,
  textDigitalization,
];

const bySlug = new Map(caseStudies.map((cs) => [cs.slug, cs]));

export function getCaseStudy(slug) {
  return bySlug.get(slug);
}
