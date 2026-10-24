'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { profile } from '@/content/site';

const SECTIONS = [
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

// resumeHref is resolved on the server (lib/media imports the media manifest,
// which shouldn't ship in the client bundle).
export default function Header({ resumeHref }) {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const home = isHome ? '' : '/';
  // In-page anchors on the home page; client-side navigation back home elsewhere.
  const A = isHome ? 'a' : Link;
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(null);
  const toggleRef = useRef(null);

  // Close the mobile menu on Escape (returning focus to the toggle) and on navigation.
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') { setOpen(false); toggleRef.current?.focus(); }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  // eslint-disable-next-line react-hooks/set-state-in-effect -- reset menu when the route changes
  useEffect(() => { setOpen(false); }, [pathname]);

  // Home page only: highlight the nav link of the section currently in view.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- clear stale highlight on route change
    setCurrent(null);
    if (!isHome || !('IntersectionObserver' in window)) return undefined;
    const targets = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean);
    if (!targets.length) return undefined;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) setCurrent(entry.target.id); });
    }, { rootMargin: '-45% 0px -50% 0px' });
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [isHome]);

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <A className="brand" href={`${home}#top`}><span className="brand__mark" aria-hidden="true">{profile.initials}</span><span>{profile.shortName}</span></A>
        <button ref={toggleRef} className="nav-toggle" type="button" aria-expanded={open ? 'true' : 'false'} aria-controls="site-nav" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen((o) => !o)}>
          <svg className="icon-open" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
          <svg className="icon-close" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>
        <nav className={`nav${open ? ' is-open' : ''}`} id="site-nav" aria-label="Primary" onClick={(e) => { if (e.target.closest('a')) setOpen(false); }}>
          <ul className="nav__list">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <A className="nav__link" href={`${home}#${s.id}`} aria-current={isHome && current === s.id ? 'true' : undefined}>{s.label}</A>
              </li>
            ))}
          </ul>
          <a className="btn btn--ghost btn--sm nav__resume" href={resumeHref} target="_blank" rel="noopener">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 4v11m0 0l-4-4m4 4l4-4M5 20h14" /></svg>Resume
          </a>
        </nav>
      </div>
    </header>
  );
}
