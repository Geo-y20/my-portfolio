import { footer } from '@/content/site';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div className="site-footer__meta">
          <p>{footer.text}</p>
          <p className="site-footer__build"><span aria-hidden="true">$ </span>built with Next.js · deployed on Vercel · media on Neon object storage</p>
        </div>
        <nav aria-label="Social">
          {footer.links.map((l) => (
            <a key={l.label} href={l.href} {...(l.external ? { target: '_blank', rel: 'noopener' } : {})}>{l.label}</a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
