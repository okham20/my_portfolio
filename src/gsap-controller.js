(() => {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  const EASE = {
    smooth: 'power3.out',
    soft: 'power2.out',
    punch: 'expo.out'
  };

  gsap.defaults({
    duration: 0.7,
    ease: EASE.smooth
  });

  const mm = gsap.matchMedia();

  function magneticEffect(selector) {
    const items = document.querySelectorAll(selector);
    items.forEach((item) => {
      item.classList.add('magnetic');
      const xTo = gsap.quickTo(item, 'x', { duration: 0.35, ease: EASE.punch, overwrite: 'auto' });
      const yTo = gsap.quickTo(item, 'y', { duration: 0.35, ease: EASE.punch, overwrite: 'auto' });

      item.addEventListener('mousemove', (e) => {
        const rect = item.getBoundingClientRect();
        const relX = e.clientX - (rect.left + rect.width / 2);
        const relY = e.clientY - (rect.top + rect.height / 2);
        xTo(relX * 0.22);
        yTo(relY * 0.22);
      });

      item.addEventListener('mouseleave', () => {
        xTo(0);
        yTo(0);
      });
    });
  }

  function heroTilt() {
    const hero = document.getElementById('hero');
    const left = document.querySelector('#hero .hero-left');
    const right = document.querySelector('#hero .hero-right');
    if (!hero || !left || !right) return;

    const rotateLeft = gsap.quickTo(left, 'rotationY', { duration: 0.5, ease: EASE.soft });
    const rotateRight = gsap.quickTo(right, 'rotationY', { duration: 0.5, ease: EASE.soft });
    const moveLeftY = gsap.quickTo(left, 'rotationX', { duration: 0.5, ease: EASE.soft });
    const moveRightY = gsap.quickTo(right, 'rotationX', { duration: 0.5, ease: EASE.soft });

    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      rotateLeft(nx * 8);
      rotateRight(nx * -10);
      moveLeftY(ny * -5);
      moveRightY(ny * -6);
    });

    hero.addEventListener('mouseleave', () => {
      rotateLeft(0);
      rotateRight(0);
      moveLeftY(0);
      moveRightY(0);
    });
  }

  function cursorReactivity() {
    const cursor = document.getElementById('cursor');
    const ring = document.getElementById('cursor-ring');
    if (!cursor || !ring) return;

    document.querySelectorAll('.proj-card, .arch-card, .btn-primary, .btn-ghost, .contact-link').forEach((el) => {
      el.addEventListener('mouseenter', () => {
        gsap.to(cursor, { scale: 2.2, backgroundColor: '#39ff14', duration: 0.2, overwrite: 'auto' });
        gsap.to(ring, { width: 56, height: 56, borderColor: 'rgba(57,255,20,0.85)', duration: 0.25, overwrite: 'auto' });
      });

      el.addEventListener('mouseleave', () => {
        gsap.to(cursor, { scale: 1, backgroundColor: '#00f5ff', duration: 0.2, overwrite: 'auto' });
        gsap.to(ring, { width: 32, height: 32, borderColor: 'rgba(0,245,255,0.5)', duration: 0.25, overwrite: 'auto' });
      });
    });
  }

  function revealSections() {
    gsap.utils.toArray('.section-header').forEach((header) => {
      const bits = header.querySelectorAll('.section-num, .section-title, .section-line');
      gsap.fromTo(
        bits,
        { autoAlpha: 0, y: 28 },
        {
          autoAlpha: 1,
          y: 0,
          stagger: 0.12,
          scrollTrigger: {
            trigger: header,
            start: 'top 85%',
            once: true
          }
        }
      );
    });

    const revealGroups = [
      { selector: '.metric-item', start: 'top 82%', stagger: 0.1 },
      { selector: '#architecture .arch-card', start: 'top 78%', stagger: 0.12 },
      { selector: '#impact thead th', start: 'top 84%', stagger: 0.05 },
      { selector: '#impact tbody tr', start: 'top 82%', stagger: 0.08 },
      { selector: '#projects .proj-card', start: 'top 78%', stagger: 0.14 },
      { selector: '#skills .skills-col', start: 'top 80%', stagger: 0.12 },
      { selector: '#skills .tech-item', start: 'top 84%', stagger: 0.03 },
      { selector: '#about .about-text p', start: 'top 82%', stagger: 0.12 },
      { selector: '#about .co-item', start: 'top 82%', stagger: 0.07 },
      { selector: '#contact .contact-left > *', start: 'top 80%', stagger: 0.1 },
      { selector: '#contact .contact-link', start: 'top 82%', stagger: 0.1 },
      { selector: 'footer .lh-metric, footer > div:first-child', start: 'top 94%', stagger: 0.05 }
    ];

    revealGroups.forEach((group) => {
      const list = document.querySelectorAll(group.selector);
      if (!list.length) return;
      gsap.fromTo(
        list,
        { autoAlpha: 0, y: 36, rotationX: -8, transformOrigin: '50% 100%' },
        {
          autoAlpha: 1,
          y: 0,
          rotationX: 0,
          stagger: group.stagger,
          scrollTrigger: {
            trigger: list[0].closest('section, .metrics-strip, footer') || list[0],
            start: group.start,
            once: true
          }
        }
      );
    });
  }

  function heroIntroTimeline() {
    const tl = gsap.timeline({ defaults: { ease: EASE.smooth } });

    tl.fromTo('#hero', { perspective: 900 }, { perspective: 1400, duration: 1.1 }, 0)
      .fromTo('#hero .hero-tag', { autoAlpha: 0, z: -60, y: 24 }, { autoAlpha: 1, z: 0, y: 0, duration: 0.6 }, 0)
      .fromTo('#hero .hero-title', { autoAlpha: 0, z: -140, y: 36, rotationX: 18 }, { autoAlpha: 1, z: 0, y: 0, rotationX: 0, duration: 0.85 }, 0.08)
      .fromTo('#hero .hero-role', { autoAlpha: 0, y: 22 }, { autoAlpha: 1, y: 0, duration: 0.55 }, 0.22)
      .fromTo('#hero .hero-desc', { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.62 }, 0.3)
      .fromTo('#hero .hero-btns > *', { autoAlpha: 0, y: 20, scale: 0.95 }, { autoAlpha: 1, y: 0, scale: 1, stagger: 0.1, duration: 0.5 }, 0.42)
      .fromTo('#hero .hero-right', { autoAlpha: 0, x: 48, z: -100, rotationY: -16 }, { autoAlpha: 1, x: 0, z: 0, rotationY: 0, duration: 0.92 }, 0.2)
      .fromTo('#hero .terminal-body .t-line', { autoAlpha: 0, x: -14 }, { autoAlpha: 1, x: 0, duration: 0.28, stagger: 0.035, ease: EASE.soft }, 0.5);
  }

  function scrubStorytelling() {
    gsap.to('#hero .hero-left', {
      y: -56,
      z: 48,
      ease: 'none',
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1
      }
    });

    gsap.to('#hero .hero-right', {
      y: 48,
      z: -20,
      rotationY: 10,
      ease: 'none',
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1
      }
    });

    gsap.to(':root', {
      '--bg-shift': 1,
      ease: 'none',
      scrollTrigger: {
        trigger: '#architecture',
        start: 'top bottom',
        end: '#contact bottom bottom',
        scrub: 1
      }
    });

    gsap.to('.arch-card, .proj-card', {
      rotationX: 3,
      rotationY: -4,
      transformOrigin: '50% 50%',
      ease: 'none',
      scrollTrigger: {
        trigger: '#projects',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.8
      }
    });
  }

  function counters() {
    const values = { m1: 0, m2: 0, m3: 0, m4: 0 };
    gsap.to(values, {
      m1: 30,
      m2: 150,
      m3: 3,
      m4: 5,
      duration: 1.9,
      ease: EASE.soft,
      scrollTrigger: {
        trigger: '.metrics-strip',
        start: 'top 82%',
        once: true
      },
      onUpdate: () => {
        const e1 = document.getElementById('m1');
        const e2 = document.getElementById('m2');
        const e3 = document.getElementById('m3');
        const e4 = document.getElementById('m4');
        if (e1) e1.textContent = `${Math.round(values.m1)}%`;
        if (e2) e2.textContent = `${Math.round(values.m2)}+`;
        if (e3) e3.textContent = `${Math.round(values.m3)}`;
        if (e4) e4.textContent = `${Math.round(values.m4)}+`;
      }
    });
  }

  function skillBars() {
    gsap.to('.skill-bar-fill', {
      scaleX: (i, el) => (parseFloat(el.dataset.pct) || 0) / 100,
      transformOrigin: 'left center',
      duration: 1.1,
      stagger: 0.11,
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: '#skills',
        start: 'top 74%',
        once: true
      }
    });
  }

  mm.add('(prefers-reduced-motion: reduce)', () => {
    gsap.set(
      '.hero-tag, .hero-title, .hero-role, .hero-desc, .hero-btns, .hero-right, .terminal-body .t-line, .metric-item, .section-header .section-num, .section-header .section-title, .section-header .section-line, .arch-card, #impact thead th, #impact tbody tr, .proj-card, #skills .skills-col, #skills .tech-item, #about .about-text p, #about .co-item, #contact .contact-left > *, #contact .contact-link, footer .lh-metric, footer > div:first-child',
      { autoAlpha: 1, clearProps: 'transform' }
    );

    document.querySelectorAll('.skill-bar-fill').forEach((bar) => {
      const t = (parseFloat(bar.dataset.pct) || 0) / 100;
      gsap.set(bar, { scaleX: t, transformOrigin: 'left center' });
    });

    const fallback = ['30%', '150+', '3', '5+'];
    ['m1', 'm2', 'm3', 'm4'].forEach((id, i) => {
      const el = document.getElementById(id);
      if (el) el.textContent = fallback[i];
    });
  });

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    heroIntroTimeline();
    heroTilt();
    magneticEffect('.btn-primary, .btn-ghost, #scan-btn, .contact-link, .nav-links a');
    cursorReactivity();
    revealSections();
    scrubStorytelling();
    counters();
    skillBars();
  });

  window.addEventListener('load', () => ScrollTrigger.refresh());
})();
