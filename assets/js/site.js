// George Youhana portfolio — shared behavior for index.html, case-study pages
// and all-projects.html: scroll-reveal, stat count-up, and the chat widget.
(function () {
  'use strict';

  function initReveal() {
    if (typeof IntersectionObserver === 'undefined') return;
    var revealEls = document.querySelectorAll('[data-reveal]');
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  }

  function initCountUp() {
    if (typeof IntersectionObserver === 'undefined') return;
    var countEls = document.querySelectorAll('[data-count]');
    var countObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var target = parseFloat(el.getAttribute('data-count')) || 0;
        var prefix = el.getAttribute('data-prefix') || '';
        var suffix = el.getAttribute('data-suffix') || '';
        var start = performance.now();
        var dur = 1200;
        function tick(now) {
          var p = Math.min(1, (now - start) / dur);
          var eased = 1 - Math.pow(1 - p, 3);
          var val = Math.round(target * eased);
          el.textContent = prefix + val.toLocaleString('en-US') + suffix;
          if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        countObserver.unobserve(el);
      });
    }, { threshold: 0.4 });
    countEls.forEach(function (el) { countObserver.observe(el); });
  }

  function initChat() {
    var toggleBtns = document.querySelectorAll('[data-chat-toggle]');
    var panel = document.getElementById('gy-chat-panel');
    var messagesEl = document.getElementById('gy-chat-messages');
    var input = document.getElementById('gy-chat-input');
    var sendBtn = document.getElementById('gy-chat-send');
    if (!panel || !messagesEl || !input || !sendBtn) return;

    var history = [
      { role: 'assistant', content: "Hi! I can answer questions about George's experience, case studies and skills. What would you like to know?" },
    ];
    var loading = false;
    var open = false;

    function render() {
      messagesEl.innerHTML = '';
      history.forEach(function (m) {
        var row = document.createElement('div');
        row.style.display = 'flex';
        row.style.justifyContent = m.role === 'user' ? 'flex-end' : 'flex-start';
        var bubble = document.createElement('div');
        bubble.style.maxWidth = '82%';
        bubble.style.background = m.role === 'user' ? 'var(--accent)' : 'var(--surface-2)';
        bubble.style.color = m.role === 'user' ? 'var(--bg)' : 'var(--text)';
        bubble.style.fontSize = '13px';
        bubble.style.lineHeight = '1.5';
        bubble.style.padding = '9px 12px';
        bubble.style.borderRadius = '8px';
        bubble.style.whiteSpace = 'pre-wrap';
        bubble.textContent = m.content;
        row.appendChild(bubble);
        messagesEl.appendChild(row);
      });
      if (loading) {
        var row = document.createElement('div');
        row.style.display = 'flex';
        row.style.justifyContent = 'flex-start';
        var bubble = document.createElement('div');
        bubble.style.background = 'var(--surface-2)';
        bubble.style.color = 'var(--text-mute)';
        bubble.style.fontFamily = 'var(--mono)';
        bubble.style.fontSize = '12px';
        bubble.style.padding = '9px 12px';
        bubble.style.borderRadius = '8px';
        bubble.textContent = 'thinking…';
        row.appendChild(bubble);
        messagesEl.appendChild(row);
      }
      messagesEl.scrollTop = messagesEl.scrollHeight;
      sendBtn.disabled = loading || !input.value.trim();
      toggleBtns.forEach(function (btn) { btn.textContent = open ? 'Close' : 'Ask AI'; });
    }

    function setOpen(next) {
      open = next;
      panel.style.display = open ? 'flex' : 'none';
      render();
      if (open) input.focus();
    }

    toggleBtns.forEach(function (btn) {
      btn.addEventListener('click', function () { setOpen(!open); });
    });

    var closeBtn = document.getElementById('gy-chat-close');
    if (closeBtn) closeBtn.addEventListener('click', function () { setOpen(false); });

    async function send() {
      var text = input.value.trim();
      if (!text || loading) return;
      history.push({ role: 'user', content: text });
      input.value = '';
      loading = true;
      render();

      try {
        var res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: history.slice(-10) }),
        });
        var data = await res.json();
        if (!res.ok || !data.reply) throw new Error(data.error || 'Chat request failed');
        history.push({ role: 'assistant', content: data.reply });
      } catch (err) {
        history.push({ role: 'assistant', content: "Sorry, I couldn't reach the assistant just now — feel free to email georgeyouhana2@gmail.com directly." });
      }
      loading = false;
      render();
    }

    sendBtn.addEventListener('click', send);
    input.addEventListener('input', render);
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        send();
      }
    });

    render();
  }

  document.addEventListener('DOMContentLoaded', function () {
    initReveal();
    initCountUp();
    initChat();
  });
})();
