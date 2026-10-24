import './globals.css';
import { workSans, jetBrainsMono } from './fonts';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';
import Enhancements from '@/components/Enhancements';
import { Analytics } from '@vercel/analytics/next';
import { SITE_URL, mediaUrl } from '@/lib/media';
import { profile, seo } from '@/content/site';

const ogImage = {
  url: mediaUrl('og-image.png', { absolute: true }),
  width: 1200,
  height: 630,
  alt: seo.ogImageAlt,
};

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: seo.title, template: '%s | George Youhana' },
  description: seo.description,
  openGraph: {
    type: 'website',
    siteName: seo.siteName,
    title: seo.title,
    description: seo.ogDescription,
    url: '/',
    images: [ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: seo.title,
    description: seo.twitterDescription,
    images: [ogImage.url],
  },
};

export const viewport = {
  themeColor: '#0B0E13',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${workSans.variable} ${jetBrainsMono.variable}`}>
      <body id="top">
        <a className="skip-link" href="#main">Skip to content</a>
        <Header resumeHref={profile.resumeUrl} />
        <main id="main">{children}</main>
        <Footer />
        <ChatWidget />
        <Enhancements />
        {/* Vercel Web Analytics: cookieless page views & visitors, viewed in the Vercel dashboard → Analytics. */}
        <Analytics />
      </body>
    </html>
  );
}
