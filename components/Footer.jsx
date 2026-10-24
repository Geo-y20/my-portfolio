import { footer } from '@/content/site';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <p>{footer.text}</p>
        <nav aria-label="Social">
          {footer.links.map((l) => (
            <a key={l.label} href={l.href} {...(l.external ? { target: '_blank', rel: 'noopener' } : {})}>{l.label}</a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
