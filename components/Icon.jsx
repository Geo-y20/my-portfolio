// 32×32 stroke icons used inside media placeholders (.ph__icon).
const PATHS = {
  chat: <><path d="M6 8h20a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3H13l-5 4v-4H6a3 3 0 0 1-3-3v-9a3 3 0 0 1 3-3Z" /><path d="M11 15.5h.01M16 15.5h.01M21 15.5h.01" /></>,
  db: <><ellipse cx="16" cy="7.5" rx="10" ry="3.5" /><path d="M6 7.5v8c0 1.9 4.5 3.5 10 3.5s10-1.6 10-3.5v-8" /><path d="M6 15.5v8c0 1.9 4.5 3.5 10 3.5s10-1.6 10-3.5v-8" /></>,
  scan: <><path d="M4 9V6a2 2 0 0 1 2-2h3M23 4h3a2 2 0 0 1 2 2v3M28 23v3a2 2 0 0 1-2 2h-3M9 28H6a2 2 0 0 1-2-2v-3" /><path d="M10 11h12M10 16h12M10 21h7" /></>,
  wave: <path d="M4 16h2M9 11v10M13 6v20M17 10v12M21 13v6M25 9v14" />,
  lock: <><path d="M9 4h10l6 6v17a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z" /><rect x="12" y="17" width="9" height="7" rx="1.5" /><path d="M14 17v-2a2.5 2.5 0 0 1 5 0v2" /></>,
  eye: <><path d="M3 16s5-8.5 13-8.5S29 16 29 16s-5 8.5-13 8.5S3 16 3 16Z" /><circle cx="16" cy="16" r="4" /></>,
  chart: <><path d="M4 27h24" /><path d="M6 22l6-7 5 4 9-11" /></>,
  bubbles: <><path d="M5 7h14a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3h-7l-4 3.5V19H5a3 3 0 0 1-3-3v-6a3 3 0 0 1 3-3Z" /><path d="M22 12h3a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3h-1v3l-3.5-3" /></>,
  doc: <><path d="M9 4h10l6 6v17a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z" /><path d="M19 4v6h6M12 16h9M12 20h9M12 24h5" /></>,
  bars: <path d="M5 27V15M12 27V8M19 27V12M26 27V5" />,
  play: <><rect x="3" y="6" width="26" height="20" rx="3" /><path d="M13 11.5v9l7-4.5-7-4.5Z" /></>,
};

export default function Icon({ name, className }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {PATHS[name] || PATHS.chat}
    </svg>
  );
}
