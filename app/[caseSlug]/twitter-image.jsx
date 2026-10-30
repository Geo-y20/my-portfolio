// Same per-case-study preview for X/Twitter cards.
import Image, { generateImageMetadata as imageMetadata, generateStaticParams as staticParams } from './opengraph-image';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const generateImageMetadata = imageMetadata;
export const generateStaticParams = staticParams;
export default Image;
