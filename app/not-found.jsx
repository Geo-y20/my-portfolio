import Link from 'next/link';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  title: 'Page not found',
  description: "This page doesn't exist. Head back to George Youhana's AI engineering portfolio.",
  noindex: true,
});

export default function NotFound() {
  return (
    <div className="container">
      <section className="notfound" aria-labelledby="nf-title">
        <p className="code">HTTP 404</p>
        <h1 id="nf-title">This page doesn&apos;t exist.</h1>
        <p>The link may be old or mistyped. Every case study is still here, under Selected work and the project archive.</p>
        <div className="hero__ctas">
          <Link className="btn btn--primary" href="/#work">View my work</Link>
          <Link className="btn btn--ghost" href="/all-projects">All projects</Link>
        </div>
      </section>
    </div>
  );
}
