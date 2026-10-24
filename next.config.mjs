/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,

  async redirects() {
    return [
      { source: '/index.html', destination: '/', permanent: true },
      // Sales Intelligence and Sheet Chat were merged into the Text-to-SQL case study.
      { source: '/case-study-sales-intelligence', destination: '/case-study-text-to-sql', permanent: true },
      { source: '/case-study-sales-intelligence.html', destination: '/case-study-text-to-sql', permanent: true },
      { source: '/case-study-sheet-chat', destination: '/case-study-text-to-sql', permanent: true },
      { source: '/case-study-sheet-chat.html', destination: '/case-study-text-to-sql', permanent: true },
      // Old static URLs: /all-projects.html → /all-projects, /case-study-x.html → /case-study-x.
      { source: '/:slug.html', destination: '/:slug', permanent: true },
    ];
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ];
  },
};

export default nextConfig;
