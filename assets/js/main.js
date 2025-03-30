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

  /* ----------- Theme Initialization ----------- */
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
  const themeToggleBtn = document.getElementById("theme-toggle");

  const applyTheme = (isDark) => {
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
    themeToggleBtn.textContent = isDark ? "🌙" : "☀️";
  };

  applyTheme(prefersDark.matches);

  prefersDark.addEventListener("change", e => applyTheme(e.matches));

  // Manual Theme Toggle
  themeToggleBtn.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const isDark = currentTheme === "light";
    applyTheme(isDark);
  });

  /* ----------- Scroll to Top Button ----------- */
  const scrollBtn = document.getElementById("scrollTopBtn");
  let scrollTimeout;

  window.addEventListener("scroll", () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      scrollBtn.style.display = window.scrollY > 300 ? "block" : "none";
    }, 100);
  });

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ----------- Typing Animation ----------- */
  const typingText = ["AI Engineer", "ML Developer", "Data Scientist"];
  let i = 0, j = 0, currentText = "", isDeleting = false;
  const typingElement = document.querySelector(".typing");

  function typeEffect() {
    if (!typingElement) return;

    if (!isDeleting && j <= typingText[i].length) {
      currentText = typingText[i].substring(0, j++);
    } else if (isDeleting && j >= 0) {
      currentText = typingText[i].substring(0, j--);
    }

    typingElement.textContent = currentText;

    let timeout = isDeleting ? 50 : 100;

    if (!isDeleting && j === typingText[i].length + 1) {
      timeout = 1000;
      isDeleting = true;
    } else if (isDeleting && j === 0) {
      isDeleting = false;
      i = (i + 1) % typingText.length;
    }

    setTimeout(typeEffect, timeout);
  }
  typeEffect();

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
