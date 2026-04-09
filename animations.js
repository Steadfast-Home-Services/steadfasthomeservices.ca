// =============================================
// STEADFAST — SCROLL REVEAL + TYPEWRITER
// =============================================

(function () {

  // ---- HAMBURGER MENU ----
  const hamburger = document.getElementById('navHamburger');
  const navLinks  = document.querySelector('.nav-links');
  const overlay   = document.getElementById('navOverlay');

  if (hamburger && navLinks) {
    function openMenu() {
      hamburger.classList.add('is-open');
      navLinks.classList.add('is-open');
      if (overlay) overlay.classList.add('is-open');
      hamburger.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }
    function closeMenu() {
      hamburger.classList.remove('is-open');
      navLinks.classList.remove('is-open');
      if (overlay) overlay.classList.remove('is-open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
    hamburger.addEventListener('click', () => {
      hamburger.classList.contains('is-open') ? closeMenu() : openMenu();
    });
    if (overlay) overlay.addEventListener('click', closeMenu);
    navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
  }



  // ---- SCROLL REVEAL ----
  const revealSelectors = [
    '.service-card',
    '.pricing-card',
    '.section-sub',
    '.section-label',
    '.about-block',
    '.stat-item',
    '.gallery-item',
    '.faq-item',
    '.service-detail-content',
    '.service-detail-icon',
    '.hero-stats .stat',
    '.fine-print',
    '.services-cta p',
    '.addon-note',
    '.info-block',
  ];

  document.querySelectorAll(revealSelectors.join(',')).forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = (i % 4) * 80 + 'ms';
  });

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


  // ---- TYPEWRITER ----

  function typewrite(el, text, speed, onDone) {
    el.textContent = '';
    const cursor = document.createElement('span');
    cursor.className = 'typewriter-cursor';
    el.appendChild(cursor);
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        el.insertBefore(document.createTextNode(text[i]), cursor);
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => { cursor.remove(); if (onDone) onDone(); }, 2000);
      }
    }, speed);
    return interval;
  }

  // Section titles — fire once on scroll, 38ms per char
  const typeTargets = document.querySelectorAll('.section-title, .services-cta h2');
  const typeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const originalText = el.textContent.trim();
        typewrite(el, originalText, 38);
        typeObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  typeTargets.forEach(el => typeObserver.observe(el));

  // "Reimagined." — fires EVERY time it enters view, slower speed
  const heroWord = document.querySelector('.hero-typewrite');
  if (heroWord) {
    const heroText = heroWord.textContent.trim();
    let typing = false;

    const heroObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !typing) {
          typing = true;
          typewrite(heroWord, heroText, 90, () => { typing = false; });
        }
        if (!entry.isIntersecting) {
          // Reset so it retypes next time
          heroWord.textContent = heroText;
          typing = false;
        }
      });
    }, { threshold: 0.8 });

    heroObserver.observe(heroWord);
  }

})();
