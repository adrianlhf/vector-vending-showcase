/* Vector Vending — bespoke interactions; no third-party runtime. */
(() => {
  'use strict';
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const header = document.querySelector('.site-header');
  const menuButton = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const closeMenu = () => {
    header.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
    mobileMenu.inert = true;
  };
  menuButton.addEventListener('click', () => {
    const open = !header.classList.contains('is-open');
    header.classList.toggle('is-open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    mobileMenu.inert = !open;
  });
  mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && header.classList.contains('is-open')) {
      closeMenu();
      menuButton.focus();
    }
  });
  window.matchMedia('(min-width: 761px)').addEventListener('change', event => { if (event.matches) closeMenu(); });

  // Content stays visible; motion is reserved for the verified sales counter.
  let ticking = false;
  const progress = document.querySelector('.scroll-progress');
  const updateScroll = () => {
    const range = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.transform = `scaleX(${range > 0 ? window.scrollY / range : 0})`;
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) { window.requestAnimationFrame(updateScroll); ticking = true; }
  }, { passive: true });
  window.addEventListener('resize', updateScroll, { passive: true });
  updateScroll();
  document.querySelector('#year').textContent = String(new Date().getFullYear());

  // A real browser bookmark file, with no fabricated launch date or data collection.
  const saveLink = document.querySelector('#save-reveal');
  saveLink.addEventListener('click', event => {
    event.preventDefault();
    const url = new URL('#next', window.location.href).href;
    const blob = new Blob([`[InternetShortcut]\r\nURL=${url}\r\n`], { type: 'application/internet-shortcut' });
    const download = document.createElement('a');
    download.href = URL.createObjectURL(blob);
    download.download = 'Vector-next-chapter.url';
    document.body.append(download);
    download.click();
    download.remove();
    setTimeout(() => URL.revokeObjectURL(download.href), 1000);
    document.querySelector('#save-note').textContent = 'A shortcut to this chapter has been downloaded. Come back for the reveal.';
  });

  // Sales is populated only after the reporting period and machine scope are verified.
  const verifiedSales = {
    amount: 55000,
    label: 'PEAK MONTHLY SALES',
    scope: 'Uncle Lee Confectionery vending · Woodleigh Hawker launch'
  };
  if (verifiedSales) {
    const section = document.querySelector('#sales-metric');
    const counter = section.querySelector('[data-count-to]');
    section.hidden = false;
    document.querySelector('#metric-label').textContent = verifiedSales.label;
    document.querySelector('#metric-scope').textContent = verifiedSales.scope;
    section.querySelector('.sr-only').textContent = `Singapore dollars ${verifiedSales.amount.toLocaleString('en-SG')}`;
    const animate = () => {
      if (reduceMotion.matches) { counter.textContent = verifiedSales.amount.toLocaleString('en-SG'); return; }
      const start = performance.now();
      const frame = now => {
        const t = Math.min((now - start) / 2200, 1);
        counter.textContent = Math.round(verifiedSales.amount * (1 - (1 - t) ** 4)).toLocaleString('en-SG');
        if (t < 1) requestAnimationFrame(frame);
      };
      requestAnimationFrame(frame);
    };
    if ('IntersectionObserver' in window) {
      const metricObserver = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) { animate(); metricObserver.disconnect(); }
      }, { threshold: 0.35 });
      metricObserver.observe(section);
    } else animate();
  }
})();
