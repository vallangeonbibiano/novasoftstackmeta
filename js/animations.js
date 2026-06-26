/* ==========================================================================
   novasoftstackmeta.com - Animations JavaScript
   Advanced animations: Particles, orbs, code typing, etc.
   ========================================================================== */

(function() {
  'use strict';

  // ---------- Particle Generator ----------
  const generateParticles = (container, count = 30) => {
    if (!container) return;
    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.animationDuration = (Math.random() * 10 + 8) + 's';
      particle.style.animationDelay = (Math.random() * 8) + 's';
      particle.style.opacity = Math.random() * 0.5 + 0.2;
      particle.style.transform = `scale(${Math.random() * 0.8 + 0.4})`;
      const colors = ['#22d3ee', '#6366f1', '#a855f7', '#ec4899'];
      const color = colors[Math.floor(Math.random() * colors.length)];
      particle.style.background = color;
      particle.style.boxShadow = `0 0 8px ${color}`;
      container.appendChild(particle);
    }
  };

  // Initialize particles in hero
  const heroParticles = document.querySelector('[data-particles]');
  if (heroParticles) {
    generateParticles(heroParticles, 40);
  }

  // ---------- Floating Orbs Background ----------
  const createOrbs = (container) => {
    if (!container) return;
    const orbCount = 4;
    for (let i = 0; i < orbCount; i++) {
      const orb = document.createElement('div');
      orb.className = `orb orb-${i + 1}`;
      container.appendChild(orb);
    }
  };

  const orbsContainer = document.querySelector('[data-orbs]');
  if (orbsContainer) {
    createOrbs(orbsContainer);
  }

  // ---------- Typewriter Effect ----------
  const typewriterElements = document.querySelectorAll('[data-typewriter]');
  typewriterElements.forEach(el => {
    const text = el.textContent;
    const words = text.split(' ');
    el.innerHTML = '';
    words.forEach((word, i) => {
      const span = document.createElement('span');
      span.className = 'word';
      span.textContent = word + ' ';
      span.style.animationDelay = (i * 100) + 'ms';
      el.appendChild(span);
    });
  });

  // ---------- Code Typing Animation ----------
  const codeElements = document.querySelectorAll('[data-code-typing]');
  codeElements.forEach(el => {
    const html = el.innerHTML;
    el.innerHTML = '';
    el.style.opacity = '1';

    const chars = html.split('');
    let i = 0;
    const type = () => {
      if (i < chars.length) {
        el.innerHTML += chars[i];
        i++;
        setTimeout(type, 5);
      }
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          type();
          observer.unobserve(entry.target);
        }
      });
    });
    observer.observe(el);
  });

  // ---------- Hero Title Word Animation ----------
  // Wrap each line in a span.line and each word in a span.word, while
  // preserving any inline HTML (e.g. <span class="gradient-text-aurora">).
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    const lines = heroTitle.innerHTML.split(/<br\s*\/?>(?!\w)/i);
    heroTitle.innerHTML = lines
      .map((lineHTML, lineIndex) => {
        const offset = lineIndex * 200;
        // Wrap inline spans in a placeholder we can style, while still keeping
        // the inline element intact. We do this by splitting only on spaces
        // outside of any <...> tag using a simple regex.
        const fragment = lineHTML.replace(/\s+/g, ' ').trim();
        if (!fragment) return '';
        return `<span class="line" style="display:block;overflow:hidden;animation-delay:${offset}ms"><span class="line-inner" style="display:inline-block;opacity:0;transform:translateY(100%);animation:word-rise 0.8s cubic-bezier(0.16,1,0.3,1) forwards;animation-delay:${offset}ms">${fragment}</span></span>`;
      })
      .join('');
  }

  // ---------- Bar Chart Animation ----------
  const animateBars = () => {
    const bars = document.querySelectorAll('[data-bar-value]');
    bars.forEach(bar => {
      const value = bar.dataset.barValue;
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            bar.style.transition = 'width 1.5s cubic-bezier(0.16, 1, 0.3, 1)';
            bar.style.width = value + '%';
            observer.unobserve(bar);
          }
        });
      });
      observer.observe(bar);
    });
  };
  animateBars();

  // ---------- Data Stream Effect ----------
  const createDataStreams = (container) => {
    if (!container) return;
    const streams = [
      '> initializing system...',
      '> loading modules...',
      '> building interfaces...',
      '> privacy mode: enabled',
      '> design system: active',
      '> data processing: local',
      '> 01001000 01000101 01001100 01001100 01001111',
      '> framework.initialized()',
      '> secure connection established',
      '> compiling shaders...',
      '> ready for deployment'
    ];

    streams.forEach((stream, i) => {
      const el = document.createElement('div');
      el.className = 'data-stream';
      el.textContent = stream;
      el.style.left = (Math.random() * 90) + '%';
      el.style.animationDelay = (i * 1.5) + 's';
      el.style.animationDuration = (8 + Math.random() * 4) + 's';
      container.appendChild(el);
    });
  };

  const streamsContainer = document.querySelector('[data-streams]');
  if (streamsContainer) {
    createDataStreams(streamsContainer);
  }

  // ---------- Parallax Scroll Effect ----------
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  if (parallaxElements.length > 0 && window.matchMedia('(min-width: 1024px)').matches) {
    let ticking = false;
    const updateParallax = () => {
      parallaxElements.forEach(el => {
        const speed = parseFloat(el.dataset.parallax) || 0.5;
        const rect = el.getBoundingClientRect();
        const scrolled = window.pageYOffset;
        const offset = (rect.top + scrolled - window.innerHeight / 2) * speed;
        el.style.transform = `translateY(${offset * 0.1}px)`;
      });
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }, { passive: true });
  }

  // ---------- Stagger Animation for Grids ----------
  const staggerGrids = document.querySelectorAll('[data-stagger]');
  staggerGrids.forEach(grid => {
    const children = grid.children;
    const delay = parseInt(grid.dataset.staggerDelay) || 100;
    Array.from(children).forEach((child, i) => {
      child.style.transitionDelay = (i * delay) + 'ms';
    });
  });

  // ---------- Animated Underline on Scroll (Progress Bar) ----------
  const createProgressBar = () => {
    const progress = document.createElement('div');
    progress.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      height: 2px;
      background: linear-gradient(90deg, #22d3ee, #6366f1, #a855f7, #ec4899);
      z-index: 9999;
      transition: width 0.1s linear;
      box-shadow: 0 0 10px rgba(99, 102, 241, 0.5);
    `;
    document.body.appendChild(progress);

    let ticking = false;
    const updateProgress = () => {
      const winHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (window.pageYOffset / winHeight) * 100;
      progress.style.width = scrolled + '%';
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateProgress);
        ticking = true;
      }
    }, { passive: true });
    updateProgress();
  };
  createProgressBar();

  // ---------- SVG Line Drawing Animation ----------
  const lineDrawElements = document.querySelectorAll('[data-line-draw]');
  lineDrawElements.forEach(el => {
    const length = el.getTotalLength ? el.getTotalLength() : 1000;
    el.style.strokeDasharray = length;
    el.style.strokeDashoffset = length;
    el.style.transition = 'stroke-dashoffset 2s ease';

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          el.style.strokeDashoffset = '0';
          observer.unobserve(el);
        }
      });
    });
    observer.observe(el);
  });

  // ---------- Number Flip Animation ----------
  const flipNumbers = document.querySelectorAll('[data-flip-number]');
  flipNumbers.forEach(el => {
    const target = parseInt(el.dataset.flipNumber);
    el.textContent = '0';
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          let current = 0;
          const duration = 2000;
          const startTime = performance.now();
          const animate = (now) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            current = Math.floor(target * eased);
            el.textContent = current.toString().padStart(target.toString().length, '0');
            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              el.textContent = target;
            }
          };
          requestAnimationFrame(animate);
          observer.unobserve(el);
        }
      });
    });
    observer.observe(el);
  });

  // ---------- Keyboard Sequence Animation ----------
  let keySequence = '';
  const easterEgg = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight'];
  let keyIndex = 0;

  document.addEventListener('keydown', (e) => {
    if (e.key === easterEgg[keyIndex]) {
      keyIndex++;
      if (keyIndex === easterEgg.length) {
        triggerEasterEgg();
        keyIndex = 0;
      }
    } else {
      keyIndex = 0;
    }
  });

  function triggerEasterEgg() {
    const colors = ['#22d3ee', '#6366f1', '#a855f7', '#ec4899', '#d4af37'];
    for (let i = 0; i < 30; i++) {
      setTimeout(() => {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
          position: fixed;
          top: -10px;
          left: ${Math.random() * 100}vw;
          width: 8px;
          height: 8px;
          background: ${colors[Math.floor(Math.random() * colors.length)]};
          z-index: 99999;
          pointer-events: none;
          border-radius: 2px;
          box-shadow: 0 0 10px currentColor;
        `;
        document.body.appendChild(confetti);
        confetti.animate([
          { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
          { transform: `translateY(100vh) rotate(720deg)`, opacity: 0 }
        ], {
          duration: 3000,
          easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        });
        setTimeout(() => confetti.remove(), 3000);
      }, i * 50);
    }
  }

  // ---------- Live Code Demo (for home page) ----------
  const codeDemo = document.querySelector('[data-code-demo]');
  if (codeDemo) {
    const codeLines = [
      '<span class="comment">// Initialize the nova engine</span>',
      '<span class="keyword">const</span> <span class="variable">nova</span> = <span class="keyword">new</span> <span class="function">NovaEngine</span>({',
      '  <span class="variable">privacy</span>: <span class="string">"local-first"</span>,',
      '  <span class="variable">mode</span>: <span class="string">"minimalist"</span>,',
      '  <span class="variable">audio</span>: <span class="string">"procedural"</span>,',
      '  <span class="variable">design</span>: <span class="string">"zen-like"</span>',
      '});',
      '',
      '<span class="comment">// Deploy to your app</span>',
      '<span class="variable">nova</span>.<span class="function">deploy</span>({',
      '  <span class="variable">platform</span>: [<span class="string">"iOS"</span>, <span class="string">"Android"</span>],',
      '  <span class="variable">compliance</span>: <span class="string">"global"</span>',
      '});',
      '',
      '<span class="comment">// ✨ Ready to ship</span>'
    ];

    let currentLine = 0;
    const speed = 30;

    const typeLine = () => {
      if (currentLine >= codeLines.length) {
        setTimeout(() => {
          codeDemo.innerHTML = '';
          currentLine = 0;
          typeLine();
        }, 5000);
        return;
      }
      const line = codeLines[currentLine];
      let charIndex = 0;
      const codeElement = document.createElement('div');
      codeElement.style.cssText = 'line-height: 1.6; min-height: 1.6em;';
      codeDemo.appendChild(codeElement);

      const typeChar = () => {
        if (charIndex < line.length) {
          if (line[charIndex] === '<') {
            const endIdx = line.indexOf('>', charIndex);
            if (endIdx !== -1) {
              codeElement.innerHTML = line.substring(0, endIdx + 1);
              charIndex = endIdx + 1;
            } else {
              codeElement.textContent = line.substring(0, charIndex + 1);
              charIndex++;
            }
          } else {
            codeElement.innerHTML = line.substring(0, charIndex + 1);
            charIndex++;
          }
          setTimeout(typeChar, speed);
        } else {
          currentLine++;
          setTimeout(typeLine, 100);
        }
      };
      typeChar();
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          typeLine();
          observer.unobserve(entry.target);
        }
      });
    });
    observer.observe(codeDemo);
  }

  // ---------- Network Graph Animation ----------
  const animateNetwork = () => {
    const canvases = document.querySelectorAll('[data-network]');
    canvases.forEach(canvas => {
      const ctx = canvas.getContext('2d');
      const resize = () => {
        canvas.width = canvas.offsetWidth * window.devicePixelRatio;
        canvas.height = canvas.offsetHeight * window.devicePixelRatio;
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      };
      resize();
      window.addEventListener('resize', resize);

      const nodes = [];
      const nodeCount = 30;
      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          x: Math.random() * canvas.offsetWidth,
          y: Math.random() * canvas.offsetHeight,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5
        });
      }

      const animate = () => {
        ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
        nodes.forEach(node => {
          node.x += node.vx;
          node.y += node.vy;
          if (node.x < 0 || node.x > canvas.offsetWidth) node.vx *= -1;
          if (node.y < 0 || node.y > canvas.offsetHeight) node.vy *= -1;
        });
        // Draw connections
        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            const dx = nodes[i].x - nodes[j].x;
            const dy = nodes[i].y - nodes[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 150) {
              ctx.beginPath();
              ctx.moveTo(nodes[i].x, nodes[i].y);
              ctx.lineTo(nodes[j].x, nodes[j].y);
              ctx.strokeStyle = `rgba(99, 102, 241, ${(1 - dist / 150) * 0.4})`;
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          }
        }
        // Draw nodes
        nodes.forEach(node => {
          ctx.beginPath();
          ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(34, 211, 238, 0.8)';
          ctx.fill();
        });
        requestAnimationFrame(animate);
      };
      animate();
    });
  };
  animateNetwork();

  // ---------- 3D Card Tilt with Glare ----------
  const initCardEffects = () => {
    if (!window.matchMedia('(min-width: 1024px)').matches) return;
    const cards = document.querySelectorAll('[data-card-effect]');
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty('--mouse-x', x + '%');
        card.style.setProperty('--mouse-y', y + '%');
      });
    });
  };
  initCardEffects();

  // ---------- Smooth Number Transition for Prices ----------
  const animateNumber = (element, target, duration = 1000) => {
    const start = parseFloat(element.textContent) || 0;
    const startTime = performance.now();
    const step = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = start + (target - start) * eased;
      element.textContent = Math.floor(current);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  // ---------- Hover Sound Effect (optional, disabled by default) ----------
  // Uncomment to enable subtle audio feedback
  // const AudioContext = window.AudioContext || window.webkitAudioContext;
  // const audioCtx = new AudioContext();
  // document.querySelectorAll('.btn').forEach(btn => {
  //   btn.addEventListener('mouseenter', () => {
  //     const osc = audioCtx.createOscillator();
  //     const gain = audioCtx.createGain();
  //     osc.connect(gain);
  //     gain.connect(audioCtx.destination);
  //     osc.frequency.value = 800;
  //     gain.gain.value = 0.01;
  //     osc.start();
  //     osc.stop(audioCtx.currentTime + 0.05);
  //   });
  // });

  // ---------- Section Counter (for page views, etc.) ----------
  let pageViewCount = parseInt(sessionStorage.getItem('pageViewCount') || '0');
  pageViewCount++;
  sessionStorage.setItem('pageViewCount', pageViewCount);

  // ---------- Page Transition Effect ----------
  document.querySelectorAll('a[href]').forEach(link => {
    if (link.hostname === window.location.hostname && !link.hash && !link.target && link.href.endsWith('.html')) {
      link.addEventListener('click', (e) => {
        // Optional: add page transition
        // e.preventDefault();
        // document.body.classList.add('page-exit');
        // setTimeout(() => window.location.href = link.href, 400);
      });
    }
  });

})();
