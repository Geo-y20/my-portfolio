'use client';

import { useRef } from 'react';

// "View architecture" for project cards: opens the diagram in an in-page
// dialog on the site's dark surface instead of navigating to the raw SVG
// (whose light text is unreadable on a browser's white background).
export default function DiagramDialog({ src, width, height, title, label = 'View architecture' }) {
  const ref = useRef(null);
  const open = () => ref.current?.showModal();
  const close = () => ref.current?.close();

  return (
    <>
      <button type="button" className="text-link card__link diagram-trigger" onClick={open}>
        {label}<span className="sr-only"> for {title}</span> <span aria-hidden="true">→</span>
      </button>
      <dialog
        ref={ref}
        className="diagram-dialog"
        aria-label={`${title} architecture`}
        onClick={(e) => { if (e.target === ref.current) close(); }}
      >
        <div className="diagram-dialog__head">
          <p className="diagram-dialog__title">{title} · architecture</p>
          <button type="button" className="chat__close" onClick={close} aria-label="Close diagram">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} width={width} height={height} alt={`${title} architecture diagram`} loading="lazy" decoding="async" />
      </dialog>
    </>
  );
}
