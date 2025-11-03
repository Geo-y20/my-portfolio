document.addEventListener("DOMContentLoaded", function () {
  
  /* ----------- Project Tabs Filtering ----------- */
  const tabs = document.querySelectorAll(".tab");
  const projects = document.querySelectorAll(".project-card");

  // Show all projects initially
  projects.forEach(project => project.classList.add("show"));

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      const category = tab.dataset.category;

      projects.forEach(project => {
        const match = category === "all" || project.dataset.category === category;
        project.classList.toggle("show", match);
        project.classList.toggle("hide", !match);
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

  /* ----------- Scroll to Top Button ----------- */
  const scrollBtn = document.getElementById("scrollTopBtn");
  let scrollTimeout;

  window.addEventListener("scroll", () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      scrollBtn.style.display = window.scrollY > 150 ? "block" : "none";
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
    navLinks.classList.toggle('active');
  });

});
window.addEventListener('scroll', () => {
  const scrollTop = document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const progress = (scrollTop / scrollHeight) * 100;
  document.getElementById('progress-bar').style.width = progress + '%';
});
