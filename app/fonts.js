import localFont from 'next/font/local';

// Self-hosted variable fonts (latin subset). next/font preloads them, sets
// font-display: swap and generates size-adjusted fallbacks so the swap doesn't
// shift layout. globals.css reads the CSS variables via --sans / --mono.
export const workSans = localFont({
  src: './fonts/work-sans-latin-wght.woff2',
  weight: '100 900',
  style: 'normal',
  display: 'swap',
  variable: '--font-work-sans',
  adjustFontFallback: 'Arial',
});

export const jetBrainsMono = localFont({
  src: './fonts/jetbrains-mono-latin-wght.woff2',
  weight: '100 800',
  style: 'normal',
  display: 'swap',
  variable: '--font-jetbrains-mono',
  // Only Arial / Times New Roman metrics are available; neither fits a
  // monospace face, so mono falls back to the ui-monospace stack instead.
  adjustFontFallback: false,
});
