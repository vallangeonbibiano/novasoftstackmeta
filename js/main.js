/* ==========================================================================
   novasoftstackmeta.com - Main JavaScript
   Core functionality: Navigation, scroll effects, interactions
   ========================================================================== */

(function() {
  'use strict';

  // ---------- Header Scroll Effect ----------
  const header = document.querySelector('.site-header');
  if (header) {
    let lastScroll = 0;
    const handleScroll = () => {
      const currentScroll = window.pageYOffset;
      if (currentScroll > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      lastScroll = currentScroll;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // ---------- Mobile Navigation Toggle ----------
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu on link click (mobile)
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !navToggle.contains(e.target) && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ---------- Scroll Reveal ----------
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-children');
  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  // ---------- Counter Animation ----------
  const counters = document.querySelectorAll('.counter');
  if (counters.length > 0) {
    const animateCounter = (counter) => {
      const target = parseFloat(counter.dataset.target);
      const duration = parseInt(counter.dataset.duration) || 2000;
      const decimals = parseInt(counter.dataset.decimals) || 0;
      const suffix = counter.dataset.suffix || '';
      const start = 0;
      const startTime = performance.now();

      const update = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Easing function (ease-out-quart)
        const eased = 1 - Math.pow(1 - progress, 4);
        const current = start + (target - start) * eased;
        counter.textContent = current.toFixed(decimals) + suffix;
        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          counter.textContent = target.toFixed(decimals) + suffix;
        }
      };

      requestAnimationFrame(update);
    };

    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
  }

  // ---------- Tabs ----------
  const tabGroups = document.querySelectorAll('[data-tabs]');
  tabGroups.forEach(group => {
    const buttons = group.querySelectorAll('.tab-btn');
    const contents = document.querySelectorAll(`[data-tab-content][data-tab-group="${group.dataset.tabs}"]`);

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.tab;
        buttons.forEach(b => b.classList.remove('active'));
        contents.forEach(c => c.classList.remove('active'));
        btn.classList.add('active');
        const content = document.querySelector(`[data-tab-content="${target}"][data-tab-group="${group.dataset.tabs}"]`);
        if (content) content.classList.add('active');
      });
    });
  });

  // ---------- FAQ Accordion ----------
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        // Close others in same group
        const parent = item.parentElement;
        if (parent) {
          parent.querySelectorAll('.faq-item').forEach(other => {
            if (other !== item) other.classList.remove('active');
          });
        }
        if (isActive) {
          item.classList.remove('active');
        } else {
          item.classList.add('active');
        }
      });
    }
  });

  // ---------- Smooth Scroll for Anchor Links ----------
  document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ---------- Contact Form Handler ----------
  const contactForm = document.querySelector('[data-form="contact"]');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData);

      // Simulate submission
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Sending...</span>';

      setTimeout(() => {
        showToast('Message Sent', 'Thank you! We will respond within 24 hours.');
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }, 1500);
    });
  }

  // ---------- Newsletter Form ----------
  const newsletterForm = document.querySelector('[data-form="newsletter"]');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = newsletterForm.querySelector('input[type="email"]').value;
      if (email) {
        showToast('Subscribed', 'You will receive our latest updates.');
        newsletterForm.reset();
      }
    });
  }

  // ---------- Toast Notification ----------
  function showToast(title, message) {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <div class="toast-icon">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>
      <div class="toast-content">
        <div class="toast-title">${title}</div>
        <div class="toast-message">${message}</div>
      </div>
    `;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.transition = 'all 0.4s ease';
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(20px)';
      setTimeout(() => toast.remove(), 400);
    }, 4000);
  }

  // ---------- Mouse Cursor Glow (desktop only) ----------
  if (window.matchMedia('(min-width: 1024px)').matches) {
    const cursorGlow = document.createElement('div');
    cursorGlow.className = 'cursor-glow';
    document.body.appendChild(cursorGlow);

    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    const animateGlow = () => {
      glowX += (mouseX - glowX) * 0.1;
      glowY += (mouseY - glowY) * 0.1;
      cursorGlow.style.left = glowX + 'px';
      cursorGlow.style.top = glowY + 'px';
      requestAnimationFrame(animateGlow);
    };
    animateGlow();
  }

  // ---------- Magnetic Buttons ----------
  if (window.matchMedia('(min-width: 1024px)').matches) {
    const magneticElements = document.querySelectorAll('.magnetic');
    magneticElements.forEach(el => {
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        el.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
      });
      el.addEventListener('mouseleave', () => {
        el.style.transform = 'translate(0, 0)';
      });
    });
  }

  // ---------- Tilt Effect ----------
  if (window.matchMedia('(min-width: 1024px)').matches) {
    const tiltElements = document.querySelectorAll('.hover-tilt');
    tiltElements.forEach(el => {
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        el.style.transform = `perspective(1000px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateZ(10px)`;
      });
      el.addEventListener('mouseleave', () => {
        el.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) translateZ(0)';
      });
    });
  }

  // ---------- Active Nav Link Highlight ----------
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ---------- Set Active Class on Footer Links ----------
  const currentPath = window.location.pathname;
  document.querySelectorAll('.footer-links a, .footer-legal a').forEach(link => {
    const href = link.getAttribute('href');
    if (href && currentPath.endsWith(href.replace('./', ''))) {
      link.style.color = 'var(--color-cyan-bright)';
    }
  });

  // ---------- Lazy Loading Polyfill for older browsers ----------
  if ('loading' in HTMLImageElement.prototype === false) {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    if ('IntersectionObserver' in window) {
      const lazyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src;
            lazyObserver.unobserve(img);
          }
        });
      });
      lazyImages.forEach(img => lazyObserver.observe(img));
    }
  }

  // ---------- Console Signature ----------
  if (window.console && console.log) {
    console.log(
      '%c novasoftstackmeta.com ',
      'background: linear-gradient(135deg, #6366f1, #a855f7, #ec4899); color: white; font-size: 14px; padding: 8px 16px; border-radius: 4px; font-weight: bold;'
    );
    console.log(
      '%c Minimalist Design · Privacy First · Experience Above All ',
      'color: #67e8f9; font-size: 11px; font-family: monospace;'
    );
  }

})();
