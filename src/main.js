// ===== CURSOR (unchanged — independent from GSAP) =====
const cursor = document.getElementById('cursor');
const cursorRing = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
function animCursor() {
  cursor.style.left = mx + 'px'; cursor.style.top = my + 'px';
  rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12;
  cursorRing.style.left = rx + 'px'; cursorRing.style.top = ry + 'px';
  requestAnimationFrame(animCursor);
}
animCursor();
document.querySelectorAll('a, button, .proj-card, .arch-card, .tech-item').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(2)';
    cursorRing.style.width = '48px'; cursorRing.style.height = '48px';
    cursorRing.style.borderColor = 'rgba(0,245,255,0.8)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(1)';
    cursorRing.style.width = '32px'; cursorRing.style.height = '32px';
    cursorRing.style.borderColor = 'rgba(0,245,255,0.5)';
  });
});

// ===== BACKGROUND CANVAS =====
const bgC = document.getElementById('bgCanvas');
const bgCtx = bgC.getContext('2d');
let W, H;
function resizeBg() { W = bgC.width = window.innerWidth; H = bgC.height = window.innerHeight; }
resizeBg();
window.addEventListener('resize', resizeBg);

const particles = Array.from({ length: 80 }, () => ({
  x: Math.random() * window.innerWidth,
  y: Math.random() * window.innerHeight,
  vx: (Math.random() - 0.5) * 0.3,
  vy: (Math.random() - 0.5) * 0.3,
  size: Math.random() * 1.5 + 0.5,
  cyan: Math.random() > 0.5
}));

function drawBg() {
  bgCtx.clearRect(0, 0, W, H);
  bgCtx.strokeStyle = 'rgba(0,245,255,0.04)';
  bgCtx.lineWidth = 1;
  for (let x = 0; x < W; x += 60) { bgCtx.beginPath(); bgCtx.moveTo(x, 0); bgCtx.lineTo(x, H); bgCtx.stroke(); }
  for (let y = 0; y < H; y += 60) { bgCtx.beginPath(); bgCtx.moveTo(0, y); bgCtx.lineTo(W, y); bgCtx.stroke(); }
  particles.forEach(p => {
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
    if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
    bgCtx.beginPath();
    bgCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    bgCtx.fillStyle = p.cyan ? 'rgba(0,245,255,0.7)' : 'rgba(57,255,20,0.5)';
    bgCtx.fill();
  });
  particles.forEach((a, i) => {
    particles.slice(i + 1).forEach(b => {
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      if (d < 120) {
        bgCtx.beginPath();
        bgCtx.moveTo(a.x, a.y); bgCtx.lineTo(b.x, b.y);
        bgCtx.strokeStyle = `rgba(0,245,255,${0.12 * (1 - d / 120)})`;
        bgCtx.lineWidth = 0.5;
        bgCtx.stroke();
      }
    });
  });
  requestAnimationFrame(drawBg);
}
drawBg();

// ===== PROJECT CANVASES =====
function drawFordCanvas() {
  const c = document.getElementById('c-ford');
  if (!c) return;
  c.width = c.offsetWidth || 300; c.height = c.offsetHeight || 160;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#06090f';
  ctx.fillRect(0, 0, c.width, c.height);
  ctx.strokeStyle = 'rgba(0,245,255,0.3)';
  ctx.lineWidth = 1;
  const nodes = [];
  for (let i = 0; i < 8; i++) nodes.push({ x: 20 + Math.random() * (c.width - 40), y: 20 + Math.random() * (c.height - 40) });
  nodes.forEach((n, i) => {
    if (i < nodes.length - 1) {
      ctx.beginPath(); ctx.moveTo(n.x, n.y);
      const nx = nodes[i + 1]; ctx.lineTo(nx.x, n.y); ctx.lineTo(nx.x, nx.y);
      ctx.stroke();
    }
    ctx.beginPath(); ctx.arc(n.x, n.y, 3, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0,245,255,0.8)'; ctx.fill();
  });
  ctx.fillStyle = 'rgba(255,107,43,0.7)';
  ctx.font = 'bold 11px JetBrains Mono,monospace';
  ctx.fillText('FNV AUTOMATION FRAMEWORK', 10, c.height - 15);
}
function drawNebulaCanvas() {
  const c = document.getElementById('c-nebula');
  if (!c) return;
  c.width = c.offsetWidth || 300; c.height = c.offsetHeight || 160;
  const ctx = c.getContext('2d');
  const grd = ctx.createRadialGradient(c.width / 2, c.height / 2, 10, c.width / 2, c.height / 2, 80);
  grd.addColorStop(0, '#1a0a2e'); grd.addColorStop(1, '#060a10');
  ctx.fillStyle = grd; ctx.fillRect(0, 0, c.width, c.height);
  for (let i = 0; i < 60; i++) {
    const x = Math.random() * c.width, y = Math.random() * c.height;
    const s = Math.random() * 2;
    ctx.beginPath(); ctx.arc(x, y, s, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${Math.random() > 0.5 ? '0,245,255' : '180,100,255'},${Math.random() * 0.8 + 0.2})`; ctx.fill();
  }
  ctx.fillStyle = 'rgba(0,245,255,0.06)';
  ctx.beginPath(); ctx.arc(c.width / 2, c.height / 2, 40, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = 'rgba(0,245,255,0.6)'; ctx.font = 'bold 11px JetBrains Mono,monospace';
  ctx.fillText('NEBULA GLITCH · UNITY', 10, c.height - 15);
}
function drawNetflixCanvas() {
  const c = document.getElementById('c-netflix');
  if (!c) return;
  c.width = c.offsetWidth || 300; c.height = c.offsetHeight || 160;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#08060f'; ctx.fillRect(0, 0, c.width, c.height);
  const bars = 8;
  for (let i = 0; i < bars; i++) {
    const h = 20 + Math.random() * 80;
    const x = (c.width / bars) * i + 4;
    const grd = ctx.createLinearGradient(x, c.height, x, c.height - h);
    grd.addColorStop(0, 'rgba(229,9,20,0.8)'); grd.addColorStop(1, 'rgba(229,9,20,0.15)');
    ctx.fillStyle = grd;
    ctx.fillRect(x, c.height - h, c.width / bars - 8, h);
  }
  ctx.fillStyle = 'rgba(229,9,20,0.7)'; ctx.font = 'bold 11px JetBrains Mono,monospace';
  ctx.fillText('QC PIPELINE · NETFLIX PARTNER', 10, c.height - 15);
}

setTimeout(() => {
  drawFordCanvas();
  drawNebulaCanvas();
  drawNetflixCanvas();
  if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
}, 300);

/** One gsap.context for the whole motion system — call .revert() on navigation/unmount to kill tweens + ScrollTriggers (avoids leaks). */
let motionContext = null;

/**
 * Shared “waterfall” stagger: one rhythm site-wide so grids/lists feel designed, not random.
 * Values are seconds between sibling starts (ScrollTrigger entry + hero terminal lines).
 */
const STAGGER = {
  /** Section labels: num → title → rule */
  typography: 0.12,
  /** Large cards (architecture, projects) */
  gridMajor: 0.14,
  /** Metrics & tighter rows */
  gridTight: 0.11,
  /** Table body, code-owner list */
  list: 0.076,
  /** Tech pills — quick ripple */
  micro: 0.036,
  /** Terminal log lines */
  terminal: 0.038
};

const EASE = {
  out: 'expo.out',
  soft: 'power2.out',
  section: 'power3.out'
};

/** ScrollTrigger presets: entry when block crosses upper viewport; play once keeps GPU work bounded. */
const scrollOnce = (trigger, start = 'top 82%') => ({
  trigger,
  start,
  toggleActions: 'play none none none'
});

/** Micro-interactions: only transform (GPU), overwrite avoids competing tweens on rapid hover. */
function bindMicroInteractions() {
  const { out: ex, soft: p2 } = EASE;

  document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('mouseenter', () => {
      gsap.to(a, { y: -4, duration: 0.38, ease: ex, overwrite: 'auto' });
    });
    a.addEventListener('mouseleave', () => {
      gsap.to(a, { y: 0, duration: 0.42, ease: p2, overwrite: 'auto' });
    });
  });

  const logo = document.querySelector('.nav-logo');
  if (logo) {
    logo.addEventListener('mouseenter', () => {
      gsap.to(logo, { scale: 1.04, duration: 0.45, ease: ex, overwrite: 'auto' });
    });
    logo.addEventListener('mouseleave', () => {
      gsap.to(logo, { scale: 1, duration: 0.5, ease: p2, overwrite: 'auto' });
    });
  }

  document.querySelectorAll('.btn-primary, .btn-ghost').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      gsap.to(btn, { scale: 1.045, duration: 0.35, ease: ex, overwrite: 'auto' });
    });
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { scale: 1, duration: 0.4, ease: p2, overwrite: 'auto' });
    });
  });

  const scanBtn = document.getElementById('scan-btn');
  if (scanBtn) {
    scanBtn.addEventListener('mouseenter', () => {
      gsap.to(scanBtn, { scale: 1.06, y: -3, duration: 0.4, ease: ex, overwrite: 'auto' });
    });
    scanBtn.addEventListener('mouseleave', () => {
      gsap.to(scanBtn, { scale: 1, y: 0, duration: 0.45, ease: p2, overwrite: 'auto' });
    });
  }

  document.querySelectorAll('.contact-link').forEach(link => {
    link.addEventListener('mouseenter', () => {
      gsap.to(link, { x: 8, duration: 0.42, ease: ex, overwrite: 'auto' });
    });
    link.addEventListener('mouseleave', () => {
      gsap.to(link, { x: 0, duration: 0.45, ease: p2, overwrite: 'auto' });
    });
  });
}

function initMotionSystem() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  motionContext = gsap.context(() => {
    const mm = gsap.matchMedia();

    // No motion: finalize DOM state, skip timelines & listeners.
    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.set('#hero .hero-tag, #hero .hero-title, #hero .hero-role, #hero .hero-desc, #hero .hero-btns, #hero .hero-right, #hero .terminal-body .t-line', {
        autoAlpha: 1, x: 0, y: 0, scale: 1, clearProps: 'transform'
      });
      const ids = ['m1', 'm2', 'm3', 'm4'];
      const vals = ['30%', '150+', '3', '5+'];
      ids.forEach((id, i) => {
        const el = document.getElementById(id);
        if (el) el.textContent = vals[i];
      });
      document.querySelectorAll('.skill-bar-fill').forEach(bar => {
        const t = (parseFloat(bar.dataset.pct) || 0) / 100;
        gsap.set(bar, { scaleX: t, transformOrigin: 'left center' });
      });
      return () => {};
    });

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      bindMicroInteractions();

      /* --- Hero: load timeline (transform + autoAlpha only; autoAlpha maps to opacity + visibility) --- */
      const heroIntro = gsap.timeline({ defaults: { ease: EASE.section } });
      heroIntro
        .fromTo('#hero .hero-tag', { autoAlpha: 0, y: 28 }, { autoAlpha: 1, y: 0, duration: 0.55 }, 0)
        .fromTo('#hero .hero-title', { autoAlpha: 0, y: 44 }, { autoAlpha: 1, y: 0, duration: 0.72 }, 0.08)
        .fromTo('#hero .hero-role', { autoAlpha: 0, y: 26 }, { autoAlpha: 1, y: 0, duration: 0.55 }, 0.22)
        .fromTo('#hero .hero-desc', { autoAlpha: 0, y: 32 }, { autoAlpha: 1, y: 0, duration: 0.62 }, 0.32)
        .fromTo('#hero .hero-btns', { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.55 }, 0.42)
        .fromTo('#hero .hero-right', { autoAlpha: 0, x: 48, scale: 0.97 }, { autoAlpha: 1, x: 0, scale: 1, duration: 0.85, ease: EASE.soft }, 0.28)
        .fromTo('#hero .terminal-body .t-line', { autoAlpha: 0, x: -18 }, { autoAlpha: 1, x: 0, duration: 0.32, stagger: STAGGER.terminal, ease: EASE.soft }, 0.5);

      /* Scroll-scrubbed parallax: pure translateY on hero columns (compositor-friendly). */
      gsap.to('#hero .hero-left', {
        y: -52,
        ease: 'none',
        scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 1 }
      });
      gsap.to('#hero .hero-right', {
        y: 40,
        ease: 'none',
        scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 1 }
      });

      /* Metrics: staggered entrance + object tween for counts (Numbers stay text — only DOM text updates). */
      gsap.timeline({ scrollTrigger: { trigger: '.metrics-strip', start: 'top 82%', once: true } })
        .from('.metric-item', { autoAlpha: 0, y: 42, stagger: STAGGER.gridTight, duration: 0.68, ease: EASE.section });

      const counts = { m1: 0, m2: 0, m3: 0, m4: 0 };
      gsap.to(counts, {
        m1: 30,
        m2: 150,
        m3: 3,
        m4: 5,
        duration: 2.1,
        ease: EASE.soft,
        scrollTrigger: { trigger: '.metrics-strip', start: 'top 82%', once: true },
        onUpdate: () => {
          const e1 = document.getElementById('m1');
          const e2 = document.getElementById('m2');
          const e3 = document.getElementById('m3');
          const e4 = document.getElementById('m4');
          if (e1) e1.textContent = Math.round(counts.m1) + '%';
          if (e2) e2.textContent = Math.round(counts.m2) + '+';
          if (e3) e3.textContent = String(Math.round(counts.m3));
          if (e4) e4.textContent = Math.round(counts.m4) + '+';
        }
      });

      /* Section headers: typography waterfall (ordinal → heading → line). */
      document.querySelectorAll('.section-header').forEach(header => {
        const parts = header.querySelectorAll('.section-num, .section-title, .section-line');
        gsap.fromTo(parts,
          { autoAlpha: 0, y: 32 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.75,
            stagger: STAGGER.typography,
            ease: EASE.section,
            scrollTrigger: scrollOnce(header, 'top 88%')
          }
        );
      });

      gsap.fromTo('#architecture .arch-card',
        { autoAlpha: 0, y: 56 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.78,
          stagger: STAGGER.gridMajor,
          ease: EASE.section,
          scrollTrigger: scrollOnce('#architecture .arch-grid', 'top 78%')
        }
      );

      gsap.fromTo('#impact thead th',
        { autoAlpha: 0, y: 16 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.45,
          stagger: STAGGER.micro,
          ease: EASE.soft,
          scrollTrigger: scrollOnce('#impact .impact-table-wrap', 'top 82%')
        }
      );
      gsap.fromTo('#impact tbody tr',
        { autoAlpha: 0, y: 28 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.52,
          stagger: STAGGER.list,
          ease: EASE.soft,
          scrollTrigger: scrollOnce('#impact tbody', 'top 80%')
        }
      );

      gsap.fromTo('#projects .proj-card',
        { autoAlpha: 0, y: 64 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.82,
          stagger: STAGGER.gridMajor + 0.04,
          ease: EASE.section,
          scrollTrigger: scrollOnce('#projects .projects-grid', 'top 76%')
        }
      );

      gsap.fromTo('#skills .skills-col',
        { autoAlpha: 0, y: 40 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          stagger: STAGGER.gridTight,
          ease: EASE.section,
          scrollTrigger: scrollOnce('#skills .skills-layout', 'top 80%')
        }
      );

      /* Skill fills: scaleX to pct/100 (no width animation — stays on compositor). */
      gsap.to('.skill-bar-fill', {
        scaleX: (i, el) => (parseFloat(el.dataset.pct) || 0) / 100,
        transformOrigin: 'left center',
        duration: 1.2,
        stagger: STAGGER.gridTight,
        ease: 'power2.inOut',
        scrollTrigger: { trigger: '#skills', start: 'top 72%', once: true }
      });

      gsap.fromTo('#skills .tech-item',
        { autoAlpha: 0, y: 20, scale: 0.96 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.48,
          stagger: { each: STAGGER.micro, from: 'center' },
          ease: 'back.out(1.15)',
          scrollTrigger: scrollOnce('#skills .tech-grid', 'top 82%')
        }
      );

      gsap.fromTo('#about .about-text p',
        { autoAlpha: 0, y: 28 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.62,
          stagger: STAGGER.typography,
          ease: EASE.section,
          scrollTrigger: scrollOnce('#about .about-text', 'top 82%')
        }
      );
      gsap.fromTo('#about .code-owner-card h3',
        { autoAlpha: 0, y: 20 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.55,
          ease: EASE.section,
          scrollTrigger: scrollOnce('#about .code-owner-card', 'top 84%')
        }
      );
      gsap.fromTo('#about .co-item',
        { autoAlpha: 0, y: 22 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.45,
          stagger: STAGGER.list,
          ease: EASE.soft,
          scrollTrigger: scrollOnce('#about .code-owner-card', 'top 78%')
        }
      );

      gsap.fromTo('#contact .contact-left > *',
        { autoAlpha: 0, y: 36 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          stagger: STAGGER.typography,
          ease: EASE.section,
          scrollTrigger: scrollOnce('#contact .contact-layout', 'top 78%')
        }
      );
      gsap.fromTo('#contact .contact-link',
        { autoAlpha: 0, y: 32 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.58,
          stagger: STAGGER.gridTight,
          ease: EASE.section,
          scrollTrigger: scrollOnce('#contact .contact-links', 'top 82%')
        }
      );

      gsap.fromTo('footer .lh-metric, footer > div:first-child',
        { autoAlpha: 0, y: 14 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.5,
          stagger: STAGGER.micro,
          ease: EASE.soft,
          scrollTrigger: scrollOnce('footer', 'top 94%')
        }
      );

      return () => {
        ScrollTrigger.getAll().forEach(t => t.kill());
      };
    });
  }, document.body);
}

initMotionSystem();

window.addEventListener('load', () => {
  if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
});

window.addEventListener('pagehide', () => {
  motionContext?.revert();
  motionContext = null;
});

// ===== LAYER DOTS =====
const sections = ['hero', 'architecture', 'impact', 'projects', 'skills', 'about'];
const dots = sections.map((_, i) => document.getElementById('dot-' + i));
const secEls = sections.map(s => document.getElementById(s));
window.addEventListener('scroll', () => {
  const sy = window.scrollY + window.innerHeight / 2;
  let active = 0;
  secEls.forEach((s, i) => { if (s && s.offsetTop <= sy) active = i; });
  dots.forEach((d, i) => { if (d) d.classList.toggle('active', i === active); });
});

function toggleScan() {
  const scanOverlay = document.getElementById('scan-overlay');
  const scanBtn = document.getElementById('scan-btn');
  if (!scanOverlay || !scanBtn || !document.body || !document.getElementById('bgCanvas')) return;
  const on = scanOverlay.classList.toggle('active');
  scanBtn.textContent = on ? '⬡ EXIT SCAN' : '⬡ SCAN MODE';
  document.body.style.filter = on ? 'hue-rotate(90deg) contrast(1.1) brightness(0.9)' : '';
  document.getElementById('bgCanvas').style.opacity = on ? '0.7' : '0.35';
}

document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const id = a.getAttribute('href').replace('#', '');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  });
});
