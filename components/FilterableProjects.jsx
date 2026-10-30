'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense, createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

// Client-side project filtering. The cards themselves stay Server Components;
// these small wrappers only read the active filter and toggle `hidden` /
// classes, mirroring the original vanilla initFilters():
//   - buttons get aria-pressed, items get hidden, grids get .is-filtered
//   - groups with no visible items are hidden, .filter-empty shows on zero
//   - a live status line announces the count, "See all" links carry ?filter=
//   - ?filter=<key> in the URL pre-selects a track
const FilterContext = createContext({ active: 'all', setActive: () => {}, shown: 0, touched: false });

const matches = (active, tags) => active === 'all' || tags.includes(active);

export default function FilterableProjects({ items, filters, id, className = 'container', children }) {
  const [active, setActiveState] = useState('all');
  const [touched, setTouched] = useState(false);
  const keys = useMemo(() => filters.map((f) => f.key), [filters]);

  const setActive = useCallback((key) => { setActiveState(key); setTouched(true); }, []);

  const shown = items.filter((tags) => matches(active, tags)).length;
  const value = useMemo(() => ({ active, setActive, shown, touched, filters }), [active, setActive, shown, touched, filters]);

  return (
    <FilterContext.Provider value={value}>
      {/* Own Suspense boundary: useSearchParams only opts this null-rendering
          child out of static prerendering, never the cards themselves. */}
      <Suspense fallback={null}><UrlFilter keys={keys} onFilter={setActive} /></Suspense>
      <div className={className} id={id}>{children}</div>
    </FilterContext.Provider>
  );
}

// Applies ?filter=<key> from the URL (e.g. the home page's "See all" link).
function UrlFilter({ keys, onFilter }) {
  const initial = useSearchParams().get('filter');
  useEffect(() => {
    if (initial && keys.includes(initial)) onFilter(initial);
  }, [initial, keys, onFilter]);
  return null;
}

export function FilterBar() {
  const { active, setActive, shown, touched, filters } = useContext(FilterContext);
  return (
    <>
      <div className="filters" role="group" aria-label="Filter projects by track">
        {filters.map((f) => (
          <button key={f.key} className="filter" type="button" data-filter={f.key} aria-pressed={active === f.key ? 'true' : 'false'} onClick={() => setActive(f.key)}>
            {f.label}
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">{touched ? `${shown} ${shown === 1 ? 'project' : 'projects'} shown` : ''}</p>
    </>
  );
}

export function FilterItem({ tags, reveal = false, children }) {
  const { active } = useContext(FilterContext);
  return (
    <article className="card" data-filter-item="" data-tags={tags.join(' ')} data-reveal={reveal ? '' : undefined} hidden={!matches(active, tags)}>
      {children}
    </article>
  );
}

export function FilterGrid({ className, children }) {
  const { active } = useContext(FilterContext);
  return <div className={`${className}${active === 'all' ? '' : ' is-filtered'}`}>{children}</div>;
}

export function FilterGroup({ id, title, tags, collapsed = false, children }) {
  const { active } = useContext(FilterContext);
  const visible = tags.some((t) => matches(active, t));
  if (collapsed) {
    // Closed by default; the cards stay in the HTML for crawlers.
    return (
      <section data-filter-group="" aria-labelledby={id} hidden={!visible}>
        <details className="archive-collapsed">
          <summary>
            <h2 className="group-title" id={id}>{title} <span className="archive-collapsed__count">({tags.length})</span></h2>
          </summary>
          {children}
        </details>
      </section>
    );
  }
  return (
    <section data-filter-group="" aria-labelledby={id} hidden={!visible}>
      <h2 className="group-title" id={id}>{title}</h2>
      {children}
    </section>
  );
}

export function FilterEmpty() {
  const { shown } = useContext(FilterContext);
  // Rendered only when a filter really matches nothing, so the message never
  // appears in the page text (scrapers, ATS tools) while "All" is selected.
  if (shown !== 0) return null;
  // The text lives here (not passed from the server as children) so it isn't
  // serialized into the page's data payload either.
  return <p className="filter-empty is-visible" role="status">No projects in this track yet.</p>;
}

export function FilterMoreLink({ base = '/all-projects', className, children }) {
  const { active } = useContext(FilterContext);
  return (
    <Link className={className} href={active === 'all' ? base : `${base}?filter=${active}`} data-filter-more="">
      {children}
    </Link>
  );
}
