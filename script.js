/**
 * Tanishka Bindal - Personal Portfolio Interactive Logic
 * Features:
 * - Theme Switcher (Dark/Light with localStorage persistence)
 * - Dynamic Typewriter Effect
 * - IntersectionObserver Section Spy for Active Nav Highlighting
 * - Sticky Header with Backdrop Blur
 * - Mobile Drawer Menu Toggle
 * - Interactive Contact Form with Validation & Feedback Toast
 * - Scroll to Top Button
 * - Lucide Icon Initializer
 */

document.addEventListener('DOMContentLoaded', () => {
  // --------------------------------------------------------------------------
  // 1. Initialize Icons (Lucide with offline SVG fallback)
  // --------------------------------------------------------------------------
  function renderIcons() {
    if (typeof lucide !== 'undefined' && lucide.createIcons) {
      lucide.createIcons();
    } else {
      // Fallback SVG dictionary for offline or slow CDN scenarios
      const svgMap = {
        'sun': '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>',
        'moon': '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
        'menu': '<line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>',
        'x': '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
        'arrow-right': '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
        'mail': '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
        'github': '<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/>',
        'linkedin': '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>',
        'code-2': '<path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/>',
        'code': '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>',
        'sparkles': '<path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>',
        'check-circle-2': '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
        'graduation-cap': '<path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>',
        'map-pin': '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
        'terminal': '<polyline points="4 17 10 11 4 5"/><line x1="12" x2="20" y1="19" y2="19"/>',
        'brain': '<path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/><path d="M12 5v14"/>',
        'school': '<path d="m4 6 8-4 8 4"/><path d="m18 10 4 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8l4-2"/><path d="M14 22v-4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v4"/><path d="M18 5v17"/><path d="M6 5v17"/>',
        'book-open': '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
        'calendar': '<rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/>',
        'layout': '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/>',
        'cpu': '<rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/><path d="M15 2v2M9 2v2M20 15h2M20 9h2M15 20v2M9 20v2M2 15h2M2 9h2"/>',
        'layers': '<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>',
        'globe': '<circle cx="12" cy="12" r="10"/><line x1="2" x2="22" y1="12" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
        'file-code': '<path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="m10 13-2 2 2 2"/><path d="m14 17 2-2-2-2"/>',
        'external-link': '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/>',
        'award': '<circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>',
        'file-check-2': '<path d="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4"/><polyline points="14 2 14 8 20 8"/><path d="m3 15 2 2 4-4"/>',
        'compass': '<circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>',
        'binary': '<rect x="14" y="14" width="4" height="6" rx="2"/><rect x="6" y="4" width="4" height="6" rx="2"/><path d="M6 20h4"/><path d="M14 10h4"/><path d="M6 14h2v6"/><path d="M14 4h2v6"/>',
        'bot': '<path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/>',
        'layout-template': '<rect width="18" height="7" x="3" y="3" rx="1"/><rect width="9" height="7" x="3" y="14" rx="1"/><rect width="5" height="7" x="16" y="14" rx="1"/>',
        'lightbulb': '<path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-1 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/>',
        'target': '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
        'rocket': '<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 9v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>',
        'check': '<polyline points="20 6 9 17 4 12"/>',
        'at-sign': '<circle cx="12" cy="12" r="4"/><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8"/>',
        'message-square': '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
        'edit-3': '<path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>',
        'send': '<line x1="22" x2="11" y1="2" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>',
        'chevron-up': '<polyline points="18 15 12 9 6 15"/>',
        'clock': '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
        'git-branch': '<line x1="6" x2="6" y1="3" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/>',
        'user': '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>'
      };

      document.querySelectorAll('[data-lucide]').forEach((el) => {
        const iconName = el.getAttribute('data-lucide');
        if (svgMap[iconName]) {
          el.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${svgMap[iconName]}</svg>`;
        }
      });
    }
  }

  // Initial call
  renderIcons();

  // --------------------------------------------------------------------------
  // 2. Theme Switcher (Dark / Light Mode)
  // --------------------------------------------------------------------------
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlRoot = document.documentElement;

  // Determine preferred theme
  const savedTheme = localStorage.getItem('tb_portfolio_theme');
  const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

  if (savedTheme) {
    htmlRoot.setAttribute('data-theme', savedTheme);
  } else if (systemPrefersLight) {
    htmlRoot.setAttribute('data-theme', 'light');
  } else {
    htmlRoot.setAttribute('data-theme', 'dark');
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      htmlRoot.setAttribute('data-theme', newTheme);
      localStorage.setItem('tb_portfolio_theme', newTheme);
      
      // Re-trigger icon rendering
      renderIcons();
    });
  }

  // --------------------------------------------------------------------------
  // 3. Dynamic Typewriter Effect
  // --------------------------------------------------------------------------
  const typewriterElement = document.getElementById('typewriter-text');
  if (typewriterElement) {
    const roles = [
      'Computer Science',
      'Artificial Intelligence',
      'Web Development',
      'C & Python Coding',
      'Emerging Technologies'
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const pauseDelay = 1800;

    function typeWriter() {
      const currentWord = roles[roleIndex];

      if (isDeleting) {
        typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
      }

      let timeout = isDeleting ? deletingSpeed : typingSpeed;

      if (!isDeleting && charIndex === currentWord.length) {
        timeout = pauseDelay;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        timeout = 400;
      }

      setTimeout(typeWriter, timeout);
    }

    setTimeout(typeWriter, 500);
  }

  // --------------------------------------------------------------------------
  // 4. Sticky Header & Scroll To Top
  // --------------------------------------------------------------------------
  const header = document.getElementById('header');
  const scrollTopBtn = document.getElementById('scroll-top-btn');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Header sticky shadow
    if (scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Scroll to top button visibility
    if (scrollY > 450) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // --------------------------------------------------------------------------
  // 5. Mobile Drawer Menu Navigation
  // --------------------------------------------------------------------------
  const navToggleBtn = document.getElementById('nav-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function toggleDrawer(open) {
    const isOpen = open !== undefined ? open : !mobileDrawer.classList.contains('open');
    if (isOpen) {
      mobileDrawer.classList.add('open');
      navToggleBtn.classList.add('active');
      navToggleBtn.setAttribute('aria-expanded', 'true');
      mobileDrawer.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    } else {
      mobileDrawer.classList.remove('open');
      navToggleBtn.classList.remove('active');
      navToggleBtn.setAttribute('aria-expanded', 'false');
      mobileDrawer.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  if (navToggleBtn && mobileDrawer) {
    navToggleBtn.addEventListener('click', () => toggleDrawer());

    // Close when clicking backdrop
    mobileDrawer.addEventListener('click', (e) => {
      if (e.target === mobileDrawer) {
        toggleDrawer(false);
      }
    });

    // Close when clicking any link in drawer
    mobileNavLinks.forEach((link) => {
      link.addEventListener('click', () => {
        toggleDrawer(false);
      });
    });
  }

  // --------------------------------------------------------------------------
  // 6. Active Navigation Highlighting (Intersection Observer)
  // --------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');
  const desktopLinks = document.querySelectorAll('.nav-link');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  function updateActiveNav(id) {
    desktopLinks.forEach((link) => {
      const href = link.getAttribute('href');
      if (href === `#${id}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    mobileLinks.forEach((link) => {
      const href = link.getAttribute('href');
      if (href === `#${id}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  if ('IntersectionObserver' in window) {
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -50% 0px',
      threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          updateActiveNav(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((section) => sectionObserver.observe(section));
  }

  // --------------------------------------------------------------------------
  // 7. Interactive Contact Form Validation & Simulated Submission
  // --------------------------------------------------------------------------
  const contactForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const formToast = document.getElementById('form-toast');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const subjectInput = document.getElementById('subject');
      const messageInput = document.getElementById('message');

      let isValid = true;

      // Validate Name
      if (!nameInput.value.trim()) {
        showError(nameInput, 'name-error');
        isValid = false;
      } else {
        clearError(nameInput, 'name-error');
      }

      // Validate Email
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput.value.trim() || !emailPattern.test(emailInput.value.trim())) {
        showError(emailInput, 'email-error');
        isValid = false;
      } else {
        clearError(emailInput, 'email-error');
      }

      // Validate Subject
      if (!subjectInput.value.trim()) {
        showError(subjectInput, 'subject-error');
        isValid = false;
      } else {
        clearError(subjectInput, 'subject-error');
      }

      // Validate Message
      if (!messageInput.value.trim()) {
        showError(messageInput, 'message-error');
        isValid = false;
      } else {
        clearError(messageInput, 'message-error');
      }

      if (!isValid) return;

      // Simulate sending
      submitBtn.disabled = true;
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = `<span>Sending...</span>`;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;

        formToast.className = 'form-toast success';
        formToast.textContent = `Thank you, ${nameInput.value.trim()}! Your message has been received. Tanishka will reply shortly.`;
        
        contactForm.reset();

        // Refresh icons if button changed
        renderIcons();

        setTimeout(() => {
          formToast.className = 'form-toast';
          formToast.textContent = '';
        }, 6000);
      }, 1000);
    });

    // Clear errors on input
    ['name', 'email', 'subject', 'message'].forEach((id) => {
      const input = document.getElementById(id);
      if (input) {
        input.addEventListener('input', () => {
          clearError(input, `${id}-error`);
        });
      }
    });
  }

  function showError(inputElement, errorElementId) {
    const parentGroup = inputElement.closest('.form-group');
    if (parentGroup) {
      parentGroup.classList.add('has-error');
    }
  }

  function clearError(inputElement, errorElementId) {
    const parentGroup = inputElement.closest('.form-group');
    if (parentGroup) {
      parentGroup.classList.remove('has-error');
    }
  }

  // --------------------------------------------------------------------------
  // 8. Dynamic Copyright Year
  // --------------------------------------------------------------------------
  const currentYearSpan = document.getElementById('current-year');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }
});
