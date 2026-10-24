'use client';

import { useEffect, useRef } from 'react';

// Muted looping demo that only fetches its sources when it nears the viewport,
// and never autoplays for people who prefer reduced motion.
export default function LazyVideo({ mp4, webm, poster, label, width, height }) {
  const ref = useRef(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return undefined;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const load = () => {
      v.querySelectorAll('source[data-src]').forEach((s) => { s.src = s.dataset.src; });
      v.load();
      if (!reduce) v.play().catch(() => {});
    };
    if (!('IntersectionObserver' in window)) { load(); return undefined; }
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) { io.disconnect(); load(); }
    }, { rootMargin: '200px 0px' });
    io.observe(v);
    return () => io.disconnect();
  }, [mp4, webm]);

  return (
    <video ref={ref} muted loop playsInline preload="none" poster={poster} width={width} height={height} aria-label={label}>
      {webm ? <source data-src={webm} type="video/webm" /> : null}
      <source data-src={mp4} type="video/mp4" />
    </video>
  );
}
