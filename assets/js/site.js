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
          scrambleWithin(entry.target);
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
    var suggestionsEl = document.getElementById('gy-chat-suggestions');
    var input = document.getElementById('gy-chat-input');
    var sendBtn = document.getElementById('gy-chat-send');
    if (!panel || !messagesEl || !input || !sendBtn) return;

    var history = [
      { role: 'assistant', content: "Hi! I can answer questions about George's experience, case studies and skills. What would you like to know?" },
    ];
    var loading = false;
    var open = false;
    var hasUserMessage = false;

    function render() {
      messagesEl.innerHTML = '';
      history.forEach(function (m) {
        var row = document.createElement('div');
        row.style.display = 'flex';
        row.style.justifyContent = m.role === 'user' ? 'flex-end' : 'flex-start';
        var bubble = document.createElement('div');
        bubble.className = 'chat-bubble ' + (m.role === 'user' ? 'chat-bubble--user' : 'chat-bubble--assistant');
        bubble.textContent = m.content;
        row.appendChild(bubble);
        messagesEl.appendChild(row);
      });
      if (loading) {
        var row = document.createElement('div');
        row.style.display = 'flex';
        row.style.justifyContent = 'flex-start';
        var bubble = document.createElement('div');
        bubble.className = 'chat-bubble chat-bubble--assistant';
        bubble.innerHTML = '<span class="chat-typing" aria-label="Assistant is typing"><span></span><span></span><span></span></span>';
        row.appendChild(bubble);
        messagesEl.appendChild(row);
      }
      messagesEl.scrollTop = messagesEl.scrollHeight;
      sendBtn.disabled = loading || !input.value.trim();
      if (suggestionsEl) suggestionsEl.classList.toggle('is-hidden', hasUserMessage);
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

    async function send(overrideText) {
      var text = (overrideText !== undefined ? overrideText : input.value).trim();
      if (!text || loading) return;
      hasUserMessage = true;
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

    sendBtn.addEventListener('click', function () { send(); });
    input.addEventListener('input', render);
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        send();
      }
    });

    if (suggestionsEl) {
      suggestionsEl.querySelectorAll('.chat-suggestion').forEach(function (chip) {
        chip.addEventListener('click', function () { send(chip.getAttribute('data-suggestion')); });
      });
    }

    render();
  }

  function initDiagramModal() {
    var modal = document.getElementById('diagram-modal');
    var img = document.getElementById('diagram-modal-img');
    var titleEl = document.getElementById('diagram-modal-title');
    var closeBtn = document.getElementById('diagram-modal-close');
    var zoomBtn = document.getElementById('diagram-modal-zoom');
    var triggers = document.querySelectorAll('[data-diagram-trigger]');
    if (!modal || !img || !titleEl || !closeBtn || !triggers.length) return;

    function setZoom(on) {
      modal.classList.toggle('is-enlarged', on);
      if (zoomBtn) {
        zoomBtn.setAttribute('aria-pressed', on ? 'true' : 'false');
        zoomBtn.setAttribute('aria-label', on ? 'Shrink diagram' : 'Enlarge diagram');
      }
    }

    function open(trigger) {
      img.src = trigger.getAttribute('data-diagram');
      img.alt = trigger.getAttribute('data-diagram-alt') || '';
      titleEl.textContent = trigger.getAttribute('data-diagram-title') || '';
      setZoom(false);
      modal.classList.add('is-open');
      closeBtn.focus();
    }

    function close() {
      modal.classList.remove('is-open');
      setZoom(false);
      img.src = '';
    }

    triggers.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        open(btn);
      });
    });

    if (zoomBtn) {
      zoomBtn.addEventListener('click', function () {
        setZoom(!modal.classList.contains('is-enlarged'));
      });
    }
    img.addEventListener('click', function () {
      setZoom(!modal.classList.contains('is-enlarged'));
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
    var packets = [];
    var width, height, raf;
    var running = true;
    var lastPacketAttempt = 0;

    function cssVar(name, fallback) {
      var v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
      return v || fallback;
    }
    function hexToRgb(hex) {
      var m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return m ? [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)] : [77, 216, 196];
    }

    // Slowly cycle through the three accent colors so the canvas isn't
    // locked to one fixed hue — each transition takes segmentMs, so a
    // full loop across all three colors is unhurried and won't clash
    // with foreground text.
    var palette = [
      hexToRgb(cssVar('--accent', '#4DD8C4')),
      hexToRgb(cssVar('--accent-3', '#8FA8E8')),
      hexToRgb(cssVar('--accent-2', '#E7A465'))
    ];
    var segmentMs = 9000;
    function paletteColorAt(t) {
      var total = segmentMs * palette.length;
      var pos = (t % total) / segmentMs;
      var idx = Math.floor(pos) % palette.length;
      var next = (idx + 1) % palette.length;
      var frac = pos - Math.floor(pos);
      var a = palette[idx], b = palette[next];
      return [
        Math.round(a[0] + (b[0] - a[0]) * frac),
        Math.round(a[1] + (b[1] - a[1]) * frac),
        Math.round(a[2] + (b[2] - a[2]) * frac)
      ];
    }

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
      var nearCount = Math.max(4, Math.round(count * 0.25));
      nodes = [];
      for (var i = 0; i < count; i++) {
        var near = i < nearCount;
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * (near ? 0.12 : 0.35),
          vy: (Math.random() - 0.5) * (near ? 0.12 : 0.35),
          phase: Math.random() * Math.PI * 2,
          near: near,
          r: near ? 2 + Math.random() * 1.2 : 0.8 + Math.random() * 0.7
        });
      }
      packets = [];
    }

    function spawnPacket(edges) {
      if (!edges.length || packets.length >= 6) return;
      var edge = edges[Math.floor(Math.random() * edges.length)];
      packets.push({ a: edge.a, b: edge.b, p: 0 });
    }

    function step(t) {
      if (!running) return;
      t = t || 0;
      var rgbStr = paletteColorAt(t).join(',');
      ctx.clearRect(0, 0, width, height);

      // Faint HUD-style grid: vertical lines drift slowly, horizontal
      // lines stay fixed — cheap texture, never competes with content.
      ctx.strokeStyle = 'rgba(' + rgbStr + ',0.05)';
      ctx.lineWidth = 1;
      var gridStep = 46;
      var gx0 = (t / 400) % gridStep;
      for (var gx = gx0; gx < width; gx += gridStep) {
        ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, height); ctx.stroke();
      }
      for (var gy = 0; gy < height; gy += gridStep) {
        ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(width, gy); ctx.stroke();
      }

      // Slow radar-style scanline sweeping down the canvas
      var sweepPeriod = 7000;
      var sweepY = ((t % sweepPeriod) / sweepPeriod) * (height + 80) - 40;
      var sweepGrad = ctx.createLinearGradient(0, sweepY - 40, 0, sweepY + 40);
      sweepGrad.addColorStop(0, 'rgba(' + rgbStr + ',0)');
      sweepGrad.addColorStop(0.5, 'rgba(' + rgbStr + ',0.06)');
      sweepGrad.addColorStop(1, 'rgba(' + rgbStr + ',0)');
      ctx.fillStyle = sweepGrad;
      ctx.fillRect(0, sweepY - 40, width, 80);

      var linkDist = Math.min(150, width / 5);

      nodes.forEach(function (n) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;
        n.x = Math.max(0, Math.min(width, n.x));
        n.y = Math.max(0, Math.min(height, n.y));
      });

      var edges = [];
      for (var i = 0; i < nodes.length; i++) {
        for (var j = i + 1; j < nodes.length; j++) {
          var dx = nodes[i].x - nodes[j].x;
          var dy = nodes[i].y - nodes[j].y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < linkDist) {
            var bothNear = nodes[i].near && nodes[j].near;
            var alpha = (bothNear ? 0.22 : 0.11) * (1 - dist / linkDist);
            ctx.strokeStyle = 'rgba(' + rgbStr + ',' + alpha + ')';
            ctx.lineWidth = bothNear ? 1.2 : 0.8;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
            edges.push({ a: i, b: j });
          }
        }
      }

      // Data packets: small bright dots traveling along a random
      // active connection, like requests moving through a network.
      if (t - lastPacketAttempt > 500) {
        lastPacketAttempt = t;
        if (Math.random() < 0.6) spawnPacket(edges);
      }
      packets.forEach(function (pk) { pk.p += 0.02; });
      packets = packets.filter(function (pk) { return pk.p < 1; });
      packets.forEach(function (pk) {
        var a = nodes[pk.a], b = nodes[pk.b];
        var px = a.x + (b.x - a.x) * pk.p;
        var py = a.y + (b.y - a.y) * pk.p;
        var fade = Math.sin(Math.PI * pk.p);
        ctx.beginPath();
        ctx.arc(px, py, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(' + rgbStr + ',' + (0.7 * fade) + ')';
        ctx.fill();
      });

      // Depth layer: a few larger/brighter "near" nodes up front,
      // many small/dim "far" nodes drifting faster behind them.
      nodes.forEach(function (n) {
        var pulse = 0.5 + 0.5 * Math.sin(t / 900 + n.phase);
        var r = n.r + pulse * (n.near ? 1.3 : 0.6);
        var baseAlpha = n.near ? 0.55 : 0.3;
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(' + rgbStr + ',' + (baseAlpha + pulse * (n.near ? 0.4 : 0.25)) + ')';
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

  function hoverCapable() {
    return typeof window.matchMedia === 'function' &&
      window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  }

  var SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  function scrambleEl(el) {
    if (!el || el.dataset.scrambled) return;
    el.dataset.scrambled = 'true';
    var final = el.textContent;
    var len = final.length;
    var maxFrames = 16;
    var frame = 0;
    var timer = setInterval(function () {
      frame++;
      var out = '';
      for (var i = 0; i < len; i++) {
        var ch = final[i];
        if (ch === ' ') { out += ' '; continue; }
        var revealAt = (i / len) * maxFrames * 0.6;
        out += frame >= revealAt ? ch : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
      }
      el.textContent = out;
      if (frame >= maxFrames) {
        clearInterval(timer);
        el.textContent = final;
      }
    }, 32);
  }

  function scrambleWithin(root) {
    if (prefersReducedMotion() || !root || !root.querySelectorAll) return;
    root.querySelectorAll('[data-scramble]').forEach(function (el) { scrambleEl(el); });
  }

  function initBootSequence() {
    var hero = document.querySelector('.hero-canvas');
    if (!hero || prefersReducedMotion()) return;
    try {
      if (sessionStorage.getItem('gy-boot-seen')) return;
      sessionStorage.setItem('gy-boot-seen', '1');
    } catch (e) { /* sessionStorage unavailable — fall through and show it anyway */ }

    var lines = [
      '$ initializing session...',
      '$ loading models: oci genai · claude · openai · aya-expanse...',
      '$ mounting retrieval layer: pgvector + chromadb + bm25...',
      '$ starting vision & speech pipelines: yolo · whisper...',
      '$ deploying services: fastapi · docker · azure...',
      '$ indexing case studies... 7 loaded',
      '$ connecting knowledge base... done',
      '$ ready.'
    ];
    var overlay = document.createElement('div');
    overlay.id = 'boot-overlay';
    overlay.setAttribute('aria-hidden', 'true');
    var wrap = document.createElement('div');
    wrap.className = 'boot-lines';
    lines.forEach(function (text) {
      var line = document.createElement('div');
      line.className = 'boot-line';
      line.textContent = text;
      wrap.appendChild(line);
    });
    overlay.appendChild(wrap);
    document.body.appendChild(overlay);

    var lineEls = wrap.querySelectorAll('.boot-line');
    lineEls.forEach(function (el, i) {
      setTimeout(function () { el.classList.add('is-shown'); }, 180 + i * 220);
    });
    setTimeout(function () {
      overlay.classList.add('is-done');
      setTimeout(function () { overlay.remove(); }, 550);
    }, 180 + lineEls.length * 220 + 350);
  }

  function initHeroParallax() {
    if (prefersReducedMotion() || !hoverCapable()) return;
    var section = document.querySelector('.hero-section');
    var canvas = document.querySelector('.hero-canvas');
    if (!section || !canvas) return;
    section.addEventListener('mousemove', function (e) {
      var rect = section.getBoundingClientRect();
      var relX = (e.clientX - rect.left) / rect.width - 0.5;
      var relY = (e.clientY - rect.top) / rect.height - 0.5;
      canvas.style.transform = 'translate(' + (relX * -16).toFixed(1) + 'px,' + (relY * -16).toFixed(1) + 'px)';
    });
    section.addEventListener('mouseleave', function () {
      canvas.style.transform = '';
    });
  }

  function buildCircuitPath(width, period) {
    var segments = Math.max(2, Math.round(width / period));
    var step = width / segments;
    var bumpWidth = Math.min(36, step * 0.5);
    var quarter = bumpWidth / 4;
    var d = 'M0 7';
    for (var i = 0; i < segments; i++) {
      var flatEnd = (i + 1) * step - bumpWidth;
      d += ' H' + flatEnd.toFixed(1);
      d += ' L' + (flatEnd + quarter).toFixed(1) + ' 2';
      d += ' L' + (flatEnd + quarter * 2).toFixed(1) + ' 12';
      d += ' L' + (flatEnd + quarter * 3).toFixed(1) + ' 2';
      d += ' L' + (flatEnd + quarter * 4).toFixed(1) + ' 7';
    }
    d += ' H' + width;
    return d;
  }

  function initCircuitDividers() {
    if (prefersReducedMotion() || typeof IntersectionObserver === 'undefined') return;
    var sections = document.querySelectorAll('section[data-reveal]');
    if (!sections.length) return;
    var viewWidth = 800;
    var d = buildCircuitPath(viewWidth, 130);
    sections.forEach(function (sec) {
      var divider = document.createElement('div');
      divider.className = 'circuit-divider';
      divider.innerHTML = '<svg viewBox="0 0 ' + viewWidth + ' 14" preserveAspectRatio="none" aria-hidden="true"><path d="' + d + '"/></svg>';
      sec.parentNode.insertBefore(divider, sec);
    });
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-drawn');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });
    document.querySelectorAll('.circuit-divider').forEach(function (el) { obs.observe(el); });
  }

  function initScrollSpy() {
    if (typeof IntersectionObserver === 'undefined') return;
    var container = document.querySelector('.site-nav__links');
    var indicator = document.querySelector('.nav-indicator');
    if (!container || !indicator) return;
    var links = container.querySelectorAll('.nav-link[href^="#"]');
    var pairs = [];
    links.forEach(function (link) {
      var sec = document.getElementById(link.getAttribute('href').slice(1));
      if (sec) pairs.push({ link: link, sec: sec });
    });
    if (!pairs.length) return;

    function moveIndicator(link) {
      var linkRect = link.getBoundingClientRect();
      var containerRect = container.getBoundingClientRect();
      indicator.style.width = linkRect.width + 'px';
      indicator.style.left = (linkRect.left - containerRect.left) + 'px';
      indicator.style.opacity = '1';
    }

    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        for (var i = 0; i < pairs.length; i++) {
          if (pairs[i].sec === entry.target) {
            pairs.forEach(function (p) { p.link.classList.remove('is-active'); });
            pairs[i].link.classList.add('is-active');
            moveIndicator(pairs[i].link);
            break;
          }
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

    pairs.forEach(function (p) { obs.observe(p.sec); });
    window.addEventListener('resize', function () {
      var active = container.querySelector('.nav-link.is-active');
      if (active) moveIndicator(active);
    });
  }

  function initTiltCards() {
    if (prefersReducedMotion() || !hoverCapable()) return;
    var cards = document.querySelectorAll('.case-card, .work-card');
    cards.forEach(function (card) {
      card.classList.add('tilt-card');
      card.addEventListener('mousemove', function (e) {
        var rect = card.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        card.style.setProperty('--mx', x + 'px');
        card.style.setProperty('--my', y + 'px');
        var rotateY = ((x / rect.width) - 0.5) * 7;
        var rotateX = ((y / rect.height) - 0.5) * -7;
        card.style.transform = 'perspective(700px) rotateX(' + rotateX.toFixed(2) + 'deg) rotateY(' + rotateY.toFixed(2) + 'deg) translateY(-4px)';
      });
      card.addEventListener('mouseleave', function () {
        card.style.transform = '';
      });
    });
  }

  function initCursorGlow() {
    if (prefersReducedMotion() || !hoverCapable()) return;
    var glow = document.createElement('div');
    glow.id = 'cursor-glow';
    document.body.appendChild(glow);
    var targetX = window.innerWidth / 2, targetY = window.innerHeight / 2;
    var curX = targetX, curY = targetY;
    var active = false;

    document.addEventListener('mousemove', function (e) {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!active) { active = true; glow.classList.add('is-active'); }
    });
    document.addEventListener('mouseleave', function () {
      active = false;
      glow.classList.remove('is-active');
    });

    function raf() {
      curX += (targetX - curX) * 0.15;
      curY += (targetY - curY) * 0.15;
      glow.style.left = curX + 'px';
      glow.style.top = curY + 'px';
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }

  function initCommandPalette() {
    var isHome = /(^|\/)index\.html$/.test(location.pathname) || /\/$/.test(location.pathname);

    function resolveHref(href) {
      if (href.charAt(0) === '#' && !isHome) return 'index.html' + href;
      return href;
    }

    var COMMANDS = [
      { label: 'Home', href: '#home' },
      { label: 'About', href: '#about' },
      { label: 'Experience', href: '#experience' },
      { label: 'Featured Case Studies', href: '#case-studies' },
      { label: 'Case Study — ATR GPT', href: 'case-study-atr-gpt.html' },
      { label: 'Case Study — Sales Intelligence', href: 'case-study-sales-intelligence.html' },
      { label: 'Case Study — HR Assistant', href: 'case-study-hr-assistant.html' },
      { label: 'Case Study — Sheet Chat', href: 'case-study-sheet-chat.html' },
      { label: 'Case Study — Vision Platform', href: 'case-study-vision-platform.html' },
      { label: 'Case Study — Learning Automation', href: 'case-study-learning-automation.html' },
      { label: 'Case Study — Social Listening', href: 'case-study-social-listening.html' },
      { label: 'All Projects (archive)', href: 'all-projects.html' },
      { label: 'Skills', href: '#skills' },
      { label: 'Education', href: '#education' },
      { label: 'Contact', href: '#contact' },
      { label: 'Download Résumé', href: 'George_Youhana_Resume.pdf' },
      { label: 'GitHub', href: 'https://github.com/Geo-y20' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/george-youhana-a5b756155/' }
    ];

    var backdrop = document.createElement('div');
    backdrop.className = 'cmdk-backdrop';
    backdrop.innerHTML =
      '<div class="cmdk-panel" role="dialog" aria-modal="true" aria-label="Quick navigation">' +
        '<input class="cmdk-input" type="text" placeholder="Jump to a section, case study or link… (Esc to close)" autocomplete="off" />' +
        '<ul class="cmdk-list"></ul>' +
        '<div class="cmdk-hint-row"><span>↑↓ navigate</span><span>Enter to go</span><span>Esc to close</span></div>' +
      '</div>';
    document.body.appendChild(backdrop);
    var input = backdrop.querySelector('.cmdk-input');
    var list = backdrop.querySelector('.cmdk-list');
    var selected = 0;
    var filtered = COMMANDS.slice();

    function render() {
      list.innerHTML = '';
      if (!filtered.length) {
        var empty = document.createElement('li');
        empty.className = 'cmdk-empty';
        empty.textContent = 'No matches.';
        list.appendChild(empty);
        return;
      }
      filtered.forEach(function (cmd, i) {
        var item = document.createElement('li');
        item.className = 'cmdk-item' + (i === selected ? ' is-selected' : '');
        item.textContent = cmd.label;
        item.addEventListener('mouseenter', function () { selected = i; render(); });
        item.addEventListener('click', function () { go(cmd); });
        list.appendChild(item);
      });
    }

    function go(cmd) {
      close();
      window.location.href = resolveHref(cmd.href);
    }

    function filter() {
      var q = input.value.trim().toLowerCase();
      filtered = !q ? COMMANDS.slice() : COMMANDS.filter(function (c) { return c.label.toLowerCase().indexOf(q) !== -1; });
      selected = 0;
      render();
    }

    function open() {
      backdrop.classList.add('is-open');
      input.value = '';
      filter();
      setTimeout(function () { input.focus(); }, 10);
    }
    function close() {
      backdrop.classList.remove('is-open');
    }

    input.addEventListener('input', filter);
    input.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') { e.preventDefault(); selected = Math.min(selected + 1, filtered.length - 1); render(); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); selected = Math.max(selected - 1, 0); render(); }
      else if (e.key === 'Enter') { e.preventDefault(); if (filtered[selected]) go(filtered[selected]); }
      else if (e.key === 'Escape') { close(); }
    });
    backdrop.addEventListener('click', function (e) { if (e.target === backdrop) close(); });

    document.addEventListener('keydown', function (e) {
      if (backdrop.classList.contains('is-open')) {
        if (e.key === 'Escape') close();
        return;
      }
      if (e.key === '/') {
        var active = document.activeElement;
        var tag = (active && active.tagName) || '';
        if (tag === 'INPUT' || tag === 'TEXTAREA' || (active && active.isContentEditable)) return;
        e.preventDefault();
        open();
      }
    });
  }

  function initMobileNav() {
    var toggle = document.getElementById('nav-toggle');
    var links = document.getElementById('site-nav-links');
    if (!toggle || !links) return;

    function setOpen(open) {
      links.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    }

    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      setOpen(!links.classList.contains('is-open'));
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { setOpen(false); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setOpen(false);
    });
    document.addEventListener('click', function (e) {
      if (links.classList.contains('is-open') && !links.contains(e.target) && e.target !== toggle && !toggle.contains(e.target)) {
        setOpen(false);
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initReveal();
    initCountUp();
    initProgressBar();
    initMobileNav();
    initBootSequence();
    initTypewriter();
    initNeuralBackground();
    initHeroParallax();
    initCircuitDividers();
    initScrollSpy();
    initTiltCards();
    initCursorGlow();
    initCommandPalette();
    initChat();
    initDiagramModal();
    var heroHeading = document.querySelector('#home h1[data-scramble]');
    if (heroHeading) setTimeout(function () { scrambleEl(heroHeading); }, 700);
  });
})();
