'use client';

import { useEffect, useRef, useState } from 'react';

const GREETING = { role: 'assistant', content: "Hi! I can answer questions about George's experience, projects and skills. What would you like to know?" };
const FALLBACK = "Sorry, I couldn't reach the assistant just now. You can email George directly at georgeyouhana2@gmail.com.";
const SUGGESTIONS = [
  { prompt: 'What is ATR GPT?', label: 'What is ATR GPT?' },
  { prompt: 'Does George have Arabic NLP and speech experience?', label: 'Arabic & speech?' },
  { prompt: 'Is George open to new roles or freelance work?', label: 'Open to work?' },
];

// "Ask about George" chat: floating toggle + panel, POSTs to /api/chat.
export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [history, setHistory] = useState([GREETING]);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState('');
  const [suggestionsHidden, setSuggestionsHidden] = useState(false);
  const messagesRef = useRef(null);
  const inputRef = useRef(null);
  const toggleRef = useRef(null);
  const wasOpen = useRef(false);

  useEffect(() => {
    const el = messagesRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [history, loading, open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
    else if (wasOpen.current) toggleRef.current?.focus();
    wasOpen.current = open;
  }, [open]);

  async function send(raw) {
    const text = (raw || '').trim();
    if (!text || loading) return;
    const next = [...history, { role: 'user', content: text }];
    setHistory(next);
    setSuggestionsHidden(true);
    setInput('');
    setLoading(true);
    let reply;
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Drop the canned greeting; the API only accepts real turns.
        body: JSON.stringify({ messages: next.slice(1).slice(-10) }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.reply) throw new Error(data.error || 'Chat request failed');
      reply = data.reply;
    } catch (err) {
      reply = err && err.message && /try again later/i.test(err.message) ? err.message : FALLBACK;
    }
    setHistory((h) => [...h, { role: 'assistant', content: reply }]);
    setLoading(false);
  }

  return (
    <div className="chat">
      <section
        className={`chat__panel${open ? ' is-open' : ''}`}
        id="chat-panel"
        role="dialog"
        aria-modal="false"
        aria-labelledby="chat-title"
        onKeyDown={(e) => { if (e.key === 'Escape') setOpen(false); }}
      >
        <div className="chat__head">
          <div>
            <h2 className="chat__title" id="chat-title"><span className="status-dot" aria-hidden="true" />Ask about George</h2>
            <p className="chat__subtitle">AI assistant · answers from his CV &amp; projects</p>
          </div>
          <button className="chat__close" id="chat-close" type="button" aria-label="Close chat" onClick={() => setOpen(false)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
        </div>
        <div className="chat__messages" id="chat-messages" aria-live="polite" ref={messagesRef}>
          {history.map((m, i) => (
            <div key={i} className={`bubble ${m.role === 'user' ? 'bubble--user' : 'bubble--assistant'}`}>{m.content}</div>
          ))}
          {loading ? (
            <div className="bubble bubble--assistant">
              <span className="typing" role="status" aria-label="Assistant is typing"><span /><span /><span /></span>
            </div>
          ) : null}
        </div>
        <div className="chat__suggestions" id="chat-suggestions" hidden={suggestionsHidden}>
          {SUGGESTIONS.map((s) => (
            <button key={s.prompt} type="button" className="chat__suggestion" data-suggestion={s.prompt} onClick={() => send(s.prompt)}>{s.label}</button>
          ))}
        </div>
        <form className="chat__form" id="chat-form" onSubmit={(e) => { e.preventDefault(); send(input); }}>
          <label className="sr-only" htmlFor="chat-input">Your question</label>
          <input
            ref={inputRef}
            className="chat__input"
            id="chat-input"
            type="text"
            placeholder="Ask a question…"
            autoComplete="off"
            maxLength={1000}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button className="chat__send" id="chat-send" type="submit" disabled={loading || !input.trim()}>Send</button>
        </form>
      </section>
      <button
        ref={toggleRef}
        className="chat__toggle"
        type="button"
        data-chat-toggle=""
        aria-label="Ask AI"
        aria-expanded={open ? 'true' : 'false'}
        aria-controls="chat-panel"
        onClick={() => setOpen((o) => !o)}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12Z" /><path d="M8.5 12h.01M12 12h.01M15.5 12h.01" /></svg>
        <span className="chat__toggle-label">Ask AI</span>
      </button>
    </div>
  );
}
