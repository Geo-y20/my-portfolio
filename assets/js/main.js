document.addEventListener("DOMContentLoaded", function () {
  
  /* ----------- Project Tabs Filtering (Archive only) ----------- */
  const tabs = document.querySelectorAll(".projects-tabs .tab");
  const projects = document.querySelectorAll(".projects-archive .project-card");

  // Show all projects initially
  projects.forEach(project => project.classList.add("show"));

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => {
        t.classList.remove("active");
        t.setAttribute("aria-pressed", "false");
      });
      tab.classList.add("active");
      tab.setAttribute("aria-pressed", "true");

      const category = tab.dataset.category;

      projects.forEach(project => {
        const cardCategories = (project.dataset.category || "").split(/\s+/);
        const match = category === "all" || cardCategories.includes(category);
        project.classList.toggle("show", match);
        project.classList.toggle("hide", !match);
      });
    });
  });

  /* ----------- Experience Tabs Filtering (Additional Experience only) ----------- */
  const expTabs = document.querySelectorAll(".exp-tabs .tab");
  const expItems = document.querySelectorAll(".exp-cards .exp-compact");

  expTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      expTabs.forEach(t => {
        t.classList.remove("active");
        t.setAttribute("aria-pressed", "false");
      });
      tab.classList.add("active");
      tab.setAttribute("aria-pressed", "true");

      const group = tab.dataset.group;

      expItems.forEach(item => {
        const match = group === "all" || item.dataset.group === group;
        item.classList.toggle("hide", !match);
      });
    });
  });

  /* ----------- Intersection Observer for Scroll Animations ----------- */
  const revealElements = document.querySelectorAll('.timeline-item, .project-card');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach(el => observer.observe(el));

  // Theme toggle removed (single theme)

  /* ----------- Stats Count-Up ----------- */
  const statEls = document.querySelectorAll('.stat-item h3[data-count-to]');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function animateCount(el) {
    const target = parseFloat(el.dataset.countTo);
    const suffix = el.dataset.suffix || '';
    if (prefersReducedMotion) { el.textContent = target + suffix; return; }

    const duration = 1200;
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  if (statEls.length) {
    statEls.forEach(el => { el.textContent = '0' + (el.dataset.suffix || ''); });
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    statEls.forEach(el => statsObserver.observe(el));
  }

  /* ----------- Scroll to Top Button ----------- */
  const scrollBtn = document.getElementById("scrollTopBtn");
  let scrollTimeout;

  const chatToggleBtnEl = document.getElementById("chatToggleBtn");
  const chatPanelEl = document.getElementById("chatPanel");
  const navbarEl = document.querySelector(".navbar");

  window.addEventListener("scroll", () => {
    if (navbarEl) navbarEl.classList.toggle("scrolled", window.scrollY > 80);
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      scrollBtn.style.display = window.scrollY > 150 ? "block" : "none";
      if (chatToggleBtnEl) {
        const shouldShow = window.scrollY > 150 || chatPanelEl?.classList.contains('open');
        chatToggleBtnEl.classList.toggle('visible', shouldShow);
      }
    }, 100);
  });

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ----------- Typing Animation (Reusable) ----------- */
  function initTypewriter(selector, texts) {
    const el = document.querySelector(selector);
    if (!el || !texts || !texts.length) return;
    let i = 0, j = 0, isDeleting = false;
    function tick() {
      const word = texts[i];
      const next = isDeleting ? word.substring(0, j--) : word.substring(0, j++);
      el.textContent = next;
      let timeout = isDeleting ? 50 : 100;
      if (!isDeleting && j === word.length + 1) { timeout = 900; isDeleting = true; }
      else if (isDeleting && j === 0) { isDeleting = false; i = (i + 1) % texts.length; }
      setTimeout(tick, timeout);
    }
    tick();
  }

  // Hero typing
  initTypewriter('.typing:not(.typing-projects)', ["AI Engineer", "ML Developer", "Data Scientist"]);
  // Projects heading typing
  const projEl = document.querySelector('.typing-projects');
  if (projEl) {
    const data = projEl.getAttribute('data-texts');
    try {
      const texts = JSON.parse(data);
      initTypewriter('.typing-projects', Array.isArray(texts) && texts.length ? texts : ["Projects"]);
    } catch { initTypewriter('.typing-projects', ["Projects"]); }
  }

  /* ----------- Mobile Navbar Toggle ----------- */
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  menuToggle?.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  /* ----------- Experience Accordion ----------- */
  const timelineItems = document.querySelectorAll('.timeline--accordion .timeline-item');
  timelineItems.forEach(item => {
    const toggle = item.querySelector('.timeline-toggle');
    const body = item.querySelector('.timeline-body');
    if (!toggle || !body) return;

    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    if (isOpen) body.style.maxHeight = body.scrollHeight + 'px';

    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      body.style.maxHeight = !open ? body.scrollHeight + 'px' : '0px';
    });
  });

  window.addEventListener('resize', () => {
    document.querySelectorAll('.timeline--accordion .timeline-toggle[aria-expanded="true"]').forEach(toggle => {
      const body = toggle.closest('.timeline-item')?.querySelector('.timeline-body');
      if (body) body.style.maxHeight = body.scrollHeight + 'px';
    });
  });

  /* ----------- Chat Widget ----------- */
  const chatToggleBtn = document.getElementById('chatToggleBtn');
  const chatPanel = document.getElementById('chatPanel');
  const chatCloseBtn = document.getElementById('chatCloseBtn');
  const chatForm = document.getElementById('chatForm');
  const chatInput = document.getElementById('chatInput');
  const chatSendBtn = document.getElementById('chatSendBtn');
  const chatMessages = document.getElementById('chatMessages');

  if (chatToggleBtn && chatPanel && chatForm) {
    const MAX_USER_MESSAGES = 20;
    const history = []; // {role, content}
    let userMessageCount = 0;
    let awaitingReply = false;
    let lastFocusedEl = null;

    function getFocusable() {
      return Array.from(chatPanel.querySelectorAll('button, textarea, input, a[href], [tabindex]:not([tabindex="-1"])'))
        .filter(el => !el.disabled && el.offsetParent !== null);
    }

    function trapFocus(e) {
      if (e.key !== 'Tab') return;
      const focusable = getFocusable();
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    function onPanelKeydown(e) {
      if (e.key === 'Escape') {
        e.preventDefault();
        setPanelOpen(false);
        return;
      }
      trapFocus(e);
    }

    function setPanelOpen(open) {
      chatPanel.classList.toggle('open', open);
      chatPanel.setAttribute('aria-hidden', String(!open));
      chatToggleBtn.setAttribute('aria-expanded', String(open));
      if (open) {
        lastFocusedEl = document.activeElement;
        chatToggleBtn.classList.add('visible');
        chatInput.focus();
        document.addEventListener('keydown', onPanelKeydown);
      } else {
        document.removeEventListener('keydown', onPanelKeydown);
        if (lastFocusedEl instanceof HTMLElement) lastFocusedEl.focus();
        else chatToggleBtn.focus();
      }
    }

    chatToggleBtn.addEventListener('click', () => {
      setPanelOpen(!chatPanel.classList.contains('open'));
    });
    chatCloseBtn?.addEventListener('click', () => setPanelOpen(false));

    /* Swipe-down to dismiss (mobile) */
    let touchStartY = null;
    chatPanel.addEventListener('touchstart', (e) => {
      touchStartY = e.touches[0].clientY;
      chatPanel.classList.add('dragging');
    }, { passive: true });
    chatPanel.addEventListener('touchmove', (e) => {
      if (touchStartY === null) return;
      const delta = e.touches[0].clientY - touchStartY;
      if (delta > 0) chatPanel.style.transform = `translate(-50%, ${delta}px)`;
    }, { passive: true });
    chatPanel.addEventListener('touchend', (e) => {
      if (touchStartY === null) return;
      const delta = e.changedTouches[0].clientY - touchStartY;
      chatPanel.classList.remove('dragging');
      chatPanel.style.transform = '';
      touchStartY = null;
      if (delta > 60) setPanelOpen(false);
    });

    function escapeHtml(str) {
      return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
    }

    function applyInlineMarkdown(str) {
      return str.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    }

    // Safe-by-construction: the input is HTML-escaped first, so the only
    // markup in the output is the handful of tags inserted below
    // (strong/ul/ol/li/p/br) — nothing from the model response can produce
    // arbitrary HTML, so this never needs a separate sanitize pass.
    function renderMarkdownSafe(text) {
      const lines = escapeHtml(text).split('\n');
      const htmlParts = [];
      let paragraphLines = [];
      let listItems = [];
      let listTag = null;

      function flushParagraph() {
        if (!paragraphLines.length) return;
        htmlParts.push('<p>' + paragraphLines.map(applyInlineMarkdown).join('<br>') + '</p>');
        paragraphLines = [];
      }
      function flushList() {
        if (!listItems.length) return;
        htmlParts.push(`<${listTag}>` + listItems.map(t => `<li>${applyInlineMarkdown(t)}</li>`).join('') + `</${listTag}>`);
        listItems = [];
        listTag = null;
      }

      for (const rawLine of lines) {
        const line = rawLine.trim();
        const bulletMatch = line.match(/^[-•]\s+(.*)/);
        const numberedMatch = line.match(/^\d+\.\s+(.*)/);
        if (bulletMatch || numberedMatch) {
          flushParagraph();
          const tag = bulletMatch ? 'ul' : 'ol';
          if (listTag && listTag !== tag) flushList();
          listTag = tag;
          listItems.push((bulletMatch || numberedMatch)[1]);
        } else if (line === '') {
          flushList();
          flushParagraph();
        } else {
          flushList();
          paragraphLines.push(line);
        }
      }
      flushList();
      flushParagraph();
      return htmlParts.join('');
    }

    function appendMessage(role, text) {
      const div = document.createElement('div');
      div.className = 'chat-msg ' + role;
      if (role === 'assistant') {
        div.innerHTML = renderMarkdownSafe(text);
      } else {
        div.textContent = text;
      }
      chatMessages.appendChild(div);
      chatMessages.scrollTop = chatMessages.scrollHeight;
      return div;
    }

    chatForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const text = chatInput.value.trim();
      if (!text || awaitingReply) return;

      if (userMessageCount >= MAX_USER_MESSAGES) {
        appendMessage('system-note', "You've reached the message limit for this session. Feel free to reach out directly via the contact links below!");
        return;
      }

      appendMessage('user', text);
      history.push({ role: 'user', content: text });
      chatInput.value = '';
      userMessageCount++;

      awaitingReply = true;
      chatSendBtn.disabled = true;
      const loadingEl = appendMessage('assistant', 'Thinking…');

      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: history.slice(-10) })
        });
        const data = await res.json();
        loadingEl.remove();
        if (res.ok && data.reply) {
          appendMessage('assistant', data.reply);
          history.push({ role: 'assistant', content: data.reply });
        } else {
          appendMessage('system-note', data.error || 'Something went wrong. Please try again in a moment.');
        }
      } catch (err) {
        loadingEl.remove();
        appendMessage('system-note', 'Network error — please try again.');
      } finally {
        awaitingReply = false;
        chatSendBtn.disabled = false;
      }
    });

    chatInput?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        chatForm.requestSubmit();
      }
    });
  }

});
window.addEventListener('scroll', () => {
  const scrollTop = document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const progress = (scrollTop / scrollHeight) * 100;
  document.getElementById('progress-bar').style.width = progress + '%';
});
