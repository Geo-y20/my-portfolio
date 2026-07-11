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

  function initDiagramModal() {
    var modal = document.getElementById('diagram-modal');
    var img = document.getElementById('diagram-modal-img');
    var titleEl = document.getElementById('diagram-modal-title');
    var closeBtn = document.getElementById('diagram-modal-close');
    var triggers = document.querySelectorAll('[data-diagram-trigger]');
    if (!modal || !img || !titleEl || !closeBtn || !triggers.length) return;

    function open(trigger) {
      img.src = trigger.getAttribute('data-diagram');
      img.alt = trigger.getAttribute('data-diagram-alt') || '';
      titleEl.textContent = trigger.getAttribute('data-diagram-title') || '';
      modal.classList.add('is-open');
      closeBtn.focus();
    }

    function close() {
      modal.classList.remove('is-open');
      img.src = '';
    }

    triggers.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        open(btn);
      });
    });

    closeBtn.addEventListener('click', close);
    modal.addEventListener('click', function (e) {
      if (e.target === modal) close();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal.classList.contains('is-open')) close();
    });
  }

  function prefersReducedMotion() {
    return typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function initProgressBar() {
    var bar = document.getElementById('progress-bar');
    if (!bar) return;
    function update() {
      var scrollTop = window.scrollY || document.documentElement.scrollTop;
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      var pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width = pct + '%';
    }
    document.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  }

  function initTypewriter() {
    var el = document.getElementById('hero-eyebrow-text');
    var cursor = document.getElementById('hero-eyebrow-cursor');
    if (!el) return;
    var full = el.getAttribute('data-full-text') || el.textContent;
    if (prefersReducedMotion()) {
      el.textContent = full;
      return;
    }
    el.textContent = '';
    var i = 0;
    function tick() {
      if (i <= full.length) {
        el.textContent = full.slice(0, i);
        i += 1;
        setTimeout(tick, 28);
      } else if (cursor) {
        cursor.classList.add('is-done');
      }
    }
    tick();
  }

  function initNeuralBackground() {
    var canvas = document.querySelector('.hero-canvas');
    if (!canvas || typeof canvas.getContext !== 'function' || prefersReducedMotion()) return;
    var ctx = canvas.getContext('2d');
    var section = canvas.closest('.hero-section') || canvas.parentElement;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var nodes = [];
    var width, height, raf;
    var running = true;

    var accent = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#4DD8C4';
    function hexToRgb(hex) {
      var m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return m ? [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)] : [77, 216, 196];
    }
    var rgb = hexToRgb(accent);
    var rgbStr = rgb.join(',');

    function resize() {
      var rect = section.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var count = Math.max(24, Math.min(70, Math.round((width * height) / 16000)));
      nodes = [];
      for (var i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          phase: Math.random() * Math.PI * 2,
        });
      }
    }

    function step(t) {
      if (!running) return;
      ctx.clearRect(0, 0, width, height);
      var linkDist = Math.min(150, width / 5);

      nodes.forEach(function (n) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;
        n.x = Math.max(0, Math.min(width, n.x));
        n.y = Math.max(0, Math.min(height, n.y));
      });

      for (var i = 0; i < nodes.length; i++) {
        for (var j = i + 1; j < nodes.length; j++) {
          var dx = nodes[i].x - nodes[j].x;
          var dy = nodes[i].y - nodes[j].y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < linkDist) {
            ctx.strokeStyle = 'rgba(' + rgbStr + ',' + (0.16 * (1 - dist / linkDist)) + ')';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      nodes.forEach(function (n) {
        var pulse = 0.5 + 0.5 * Math.sin((t || 0) / 900 + n.phase);
        var r = 1.2 + pulse * 1.1;
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(' + rgbStr + ',' + (0.35 + pulse * 0.4) + ')';
        ctx.fill();
      });

      raf = requestAnimationFrame(step);
    }

    resize();
    raf = requestAnimationFrame(step);
    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', function () {
      running = !document.hidden;
      if (running) raf = requestAnimationFrame(step);
      else cancelAnimationFrame(raf);
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initReveal();
    initCountUp();
    initProgressBar();
    initTypewriter();
    initNeuralBackground();
    initChat();
    initDiagramModal();
  });
})();
