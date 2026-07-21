/* ==========================================================================
   PBFL SCHOOL SYSTEM — SCRIPT
   Modular vanilla JS: sticky navbar, hero slider, counters, dropdowns,
   smooth scroll, scroll reveal, back to top, newsletter validation,
   mobile navigation.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initStickyNavbar();
  initMobileNavigation();
  initDropdowns();
  initHeroSlider();
  initCounterAnimation();
  initSmoothScroll();
  initScrollReveal();
  initBackToTop();
  initNewsletterValidation();
});

/* ---------- Sticky Navbar ---------- */
function initStickyNavbar () {
  const header = document.getElementById('siteHeader');
  if (!header) return;

  const toggleScrolledClass = () => {
    if (window.scrollY > 20) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  };

  toggleScrolledClass();
  window.addEventListener('scroll', toggleScrolledClass, { passive: true });
}

/* ---------- Mobile Navigation ---------- */
function initMobileNavigation () {
  const toggle = document.getElementById('navbarToggle');
  const menu = document.getElementById('navbarMenu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('is-open');
    toggle.classList.toggle('is-open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 1180 && !link.parentElement.classList.contains('has-dropdown')) {
        menu.classList.remove('is-open');
        toggle.classList.remove('is-open');
      }
    });
  });
}

/* ---------- Dropdown Menu (mobile tap-to-open) ---------- */
function initDropdowns () {
  const dropdownParents = document.querySelectorAll('.has-dropdown');

  dropdownParents.forEach((parent) => {
    const link = parent.querySelector(':scope > a');

    link.addEventListener('click', (event) => {
      if (window.innerWidth <= 1180) {
        event.preventDefault();
        const isOpen = parent.classList.toggle('is-open');

        dropdownParents.forEach((other) => {
          if (other !== parent) other.classList.remove('is-open');
        });

        link.setAttribute('aria-expanded', String(isOpen));
      }
    });
  });
}

/* ---------- Hero Slider ---------- */
function initHeroSlider () {
  const prevBtn = document.getElementById('heroPrev');
  const nextBtn = document.getElementById('heroNext');
  const heading = document.querySelector('.hero__heading');
  const description = document.querySelector('.hero__description');
  if (!prevBtn || !nextBtn || !heading || !description) return;

  const slides = [
    {
      heading: 'Shaping Minds,<br><span class="text-highlight">Building <span class="text-gold">Futures</span></span>',
      description: 'PBFL School System provides practical based fast learning education with modern technology, experienced faculty and excellent learning environment.'
    },
    {
      heading: 'Empowering Students,<br><span class="text-highlight">Inspiring <span class="text-gold">Success</span></span>',
      description: 'Our smart classrooms and modern labs give students the tools they need to learn, create and excel every single day.'
    },
    {
      heading: 'Practical Learning,<br><span class="text-highlight">Lasting <span class="text-gold">Impact</span></span>',
      description: 'From primary school to professional courses, PBFL builds real-world skills through hands-on, activity based education.'
    }
  ];

  let current = 0;

  const renderSlide = (index) => {
    heading.style.opacity = 0;
    description.style.opacity = 0;

    window.setTimeout(() => {
      heading.innerHTML = slides[index].heading;
      description.textContent = slides[index].description;
      heading.style.opacity = 1;
      description.style.opacity = 1;
    }, 200);
  };

  heading.style.transition = 'opacity .2s ease';
  description.style.transition = 'opacity .2s ease';

  nextBtn.addEventListener('click', () => {
    current = (current + 1) % slides.length;
    renderSlide(current);
  });

  prevBtn.addEventListener('click', () => {
    current = (current - 1 + slides.length) % slides.length;
    renderSlide(current);
  });

  window.setInterval(() => {
    current = (current + 1) % slides.length;
    renderSlide(current);
  }, 7000);
}

/* ---------- Counter Animation ---------- */
function initCounterAnimation () {
  const counters = document.querySelectorAll('.stat-item__number');
  if (!counters.length) return;

  const animateCounter = (el) => {
    const target = parseInt(el.dataset.count, 10) || 0;
    const suffix = el.dataset.suffix || '';
    const duration = 1800;
    const startTime = performance.now();

    const step = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.floor(eased * target);
      el.textContent = value.toLocaleString() + suffix;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target.toLocaleString() + suffix;
      }
    };

    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach((counter) => observer.observe(counter));
}

/* ---------- Smooth Scroll ---------- */
function initSmoothScroll () {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener('click', (event) => {
      const targetId = link.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

/* ---------- Scroll Reveal ---------- */
function initScrollReveal () {
  const revealEls = document.querySelectorAll('[data-reveal]');
  if (!revealEls.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach((el) => observer.observe(el));
}

/* ---------- Back To Top ---------- */
function initBackToTop () {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      btn.classList.add('is-visible');
    } else {
      btn.classList.remove('is-visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ---------- Newsletter Validation ---------- */
function initNewsletterValidation () {
  const form = document.getElementById('newsletterForm');
  const emailInput = document.getElementById('newsletterEmail');
  const message = document.getElementById('newsletterMessage');
  if (!form || !emailInput || !message) return;

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const value = emailInput.value.trim();

    if (!emailPattern.test(value)) {
      message.textContent = 'Please enter a valid email address.';
      message.style.color = '#FFD9D9';
      emailInput.focus();
      return;
    }

    message.textContent = `Thank you! ${value} has been subscribed to our newsletter.`;
    message.style.color = '';
    form.reset();
  });
}