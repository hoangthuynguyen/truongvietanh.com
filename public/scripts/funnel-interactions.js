/**
 * funnel-interactions.js — interactions for FunnelLayout (v2).
 * Lighter than site-interactions — no exit popup, no cookie consent.
 *
 * Handles: scroll depth tracking, countdown, stat counters, Turnstile lazy-load,
 * scroll reveal, FAQ analytics.
 */
(function () {
  'use strict';

  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // ========= SCROLL DEPTH TRACKING =========
  function initScrollDepth() {
    const marks = [25, 50, 75, 100];
    const fired = new Set();
    window.addEventListener('scroll', () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      const pct = Math.round((window.scrollY / max) * 100);
      for (const m of marks) {
        if (pct >= m && !fired.has(m)) {
          fired.add(m);
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({ event: 'scroll_depth', depth: m, funnel_code: document.head.querySelector('meta[name="x-funnel-code"]')?.content });
        }
      }
    }, { passive: true });
  }

  // ========= COUNTDOWN =========
  function initCountdown() {
    $$('.b-urgency-bar[data-countdown-to]').forEach((bar) => {
      const target = new Date(bar.dataset.countdownTo).getTime();
      if (!Number.isFinite(target)) return;
      const dEl = bar.querySelector('[data-cd-days]');
      const hEl = bar.querySelector('[data-cd-hours]');
      const mEl = bar.querySelector('[data-cd-minutes]');
      const sEl = bar.querySelector('[data-cd-seconds]');
      function tick() {
        const diff = target - Date.now();
        if (diff <= 0) { bar.classList.add('b-cd-done'); return; }
        const d = Math.floor(diff / 86400000);
        const h = Math.floor(diff / 3600000) % 24;
        const m = Math.floor(diff / 60000) % 60;
        const s = Math.floor(diff / 1000) % 60;
        if (dEl) dEl.textContent = d;
        if (hEl) hEl.textContent = h.toString().padStart(2, '0');
        if (mEl) mEl.textContent = m.toString().padStart(2, '0');
        if (sEl) sEl.textContent = s.toString().padStart(2, '0');
      }
      tick();
      setInterval(tick, 1000);
    });
  }

  // ========= STAT COUNTERS =========
  function initCounters() {
    if (!('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const target = Number(el.dataset.animateCounter);
        if (!Number.isFinite(target)) return;
        let cur = 0;
        const step = target / 30;
        const t = setInterval(() => {
          cur += step;
          if (cur >= target) { cur = target; clearInterval(t); }
          const suffix = el.textContent.replace(/[\d.,]/g, '');
          el.textContent = Math.round(cur).toLocaleString('vi-VN') + suffix;
        }, 30);
        io.unobserve(el);
      });
    }, { threshold: 0.5 });
    $$('[data-animate-counter]').forEach((el) => io.observe(el));
  }

  // ========= TURNSTILE LAZY LOAD =========
  function initTurnstile() {
    if (!$$('.cf-turnstile').length) return;
    if (window.turnstile) return;
    const s = document.createElement('script');
    s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
    s.async = true;
    s.defer = true;
    document.head.appendChild(s);
  }

  // ========= SCROLL REVEAL =========
  function initScrollReveal() {
    if (!('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-revealed');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.08 });
    $$('section').forEach((el) => io.observe(el));
  }

  // ========= FAQ ANALYTICS =========
  function initFaq() {
    $$('details').forEach((el) => {
      el.addEventListener('toggle', () => {
        if (!el.open) return;
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: 'faq_open',
          question: el.querySelector('summary')?.textContent,
          funnel_code: document.head.querySelector('meta[name="x-funnel-code"]')?.content,
        });
      });
    });
  }

  // ========= PAGE_VIEW EVENT =========
  function firePageView() {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'funnel_page_view',
      funnel_code: document.head.querySelector('meta[name="x-funnel-code"]')?.content,
      school_level: document.head.querySelector('meta[name="x-school-level"]')?.content,
      campus_ref: document.head.querySelector('meta[name="x-campus-ref"]')?.content,
      page_variant: new URLSearchParams(location.search).get('v') || null,
    });
  }

  function init() {
    firePageView();
    initScrollDepth();
    initCountdown();
    initCounters();
    initTurnstile();
    initScrollReveal();
    initFaq();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
