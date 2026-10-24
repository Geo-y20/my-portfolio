'use client';

import { useLayoutEffect } from 'react';
import { usePathname } from 'next/navigation';

// Progressive enhancement that re-runs on every route change:
//   - reveal-on-scroll for [data-reveal], gated by the .reveal-ready class on
//     <html> (without JS everything is simply visible)
//   - count-up for [data-count] metrics. The server HTML already holds the
//     final value; the animation starts at 60% of it, so 0 is never shown.
// Both are skipped when the visitor prefers reduced motion.
export default function Enhancements() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasIO = 'IntersectionObserver' in window;
    const cleanups = [];

    // Reveal. Anything already on screen is marked visible before the gating
    // class goes on, so above-the-fold content never blinks out.
    const reveals = Array.from(document.querySelectorAll('[data-reveal]:not(.is-visible)'));
    if (reduce || !hasIO) {
      reveals.forEach((el) => el.classList.add('is-visible'));
    } else {
      const vh = window.innerHeight;
      const pending = reveals.filter((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < vh * 0.92 && r.bottom > 0) { el.classList.add('is-visible'); return false; }
        return true;
      });
      document.documentElement.classList.add('reveal-ready');
      const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
      pending.forEach((el) => io.observe(el));
      cleanups.push(() => io.disconnect());
    }

    // Counters.
    const counters = document.querySelectorAll('[data-count]');
    if (counters.length && !reduce && hasIO) {
      const running = new Map(); // numEl → { frame, final }
      const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          io.unobserve(entry.target);
          const el = entry.target;
          const target = parseFloat(el.getAttribute('data-count'));
          const numEl = el.querySelector('[data-count-num]') || el;
          const final = numEl.textContent;
          const start = target * 0.6;
          const duration = 700;
          let t0 = null;
          const tick = (ts) => {
            if (t0 === null) t0 = ts;
            const p = Math.min((ts - t0) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            numEl.textContent = p < 1 ? Math.round(start + (target - start) * eased).toLocaleString('en-US') : final;
            if (p < 1) running.set(numEl, { frame: requestAnimationFrame(tick), final });
            else running.delete(numEl);
          };
          running.set(numEl, { frame: requestAnimationFrame(tick), final });
        });
      }, { threshold: 0.6 });
      counters.forEach((el) => io.observe(el));
      cleanups.push(() => {
        io.disconnect();
        // Never leave a half-counted number behind.
        running.forEach(({ frame, final }, numEl) => { cancelAnimationFrame(frame); numEl.textContent = final; });
      });
    }

    return () => cleanups.forEach((fn) => fn());
  }, [pathname]);

  return null;
}
