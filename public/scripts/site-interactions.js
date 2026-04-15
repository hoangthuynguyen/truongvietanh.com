/**
 * site-interactions.js — interactions for SiteLayout (v2).
 * Handles: announcement close, exit popup, cookie consent, back-to-top,
 * dark mode, scroll animations, FAQ toggle, stat counters, countdown.
 */
(function () {
  'use strict';

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // ========= ANNOUNCEMENT BAR =========
  function initAnnouncement() {
    const bar = $('.announcement-bar');
    if (!bar) return;
    const id = bar.dataset.announcementId;
    if (localStorage.getItem(`announcement-dismissed-${id}`)) { bar.hidden = true; return; }
    const close = bar.querySelector('.announcement-close');
    close?.addEventListener('click', () => {
      bar.hidden = true;
      localStorage.setItem(`announcement-dismissed-${id}`, '1');
    });
  }

  // ========= EXIT INTENT POPUP =========
  function initExitPopup() {
    const popup = $('#exit-popup');
    if (!popup) return;
    if (document.body.dataset.blockPopup === 'true') { popup.remove(); return; }
    if (localStorage.getItem('lead_submitted')) { popup.remove(); return; }

    const delaySeconds = Number(popup.dataset.popupSeconds || 15);
    let triggered = false;
    let timer = setTimeout(trigger, delaySeconds * 1000);

    function trigger() {
      if (triggered) return;
      triggered = true;
      popup.hidden = false;
      document.addEventListener('mouseleave', null);
      clearTimeout(timer);
    }

    document.addEventListener('mouseleave', (e) => {
      if (e.clientY <= 0) trigger();
    });

    $('.exit-popup-close', popup)?.addEventListener('click', () => { popup.hidden = true; });

    const form = $('#exit-form', popup);
    form?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const phone = form.querySelector('input[type=tel]').value.trim();
      if (!/^0[0-9]{9,10}$/.test(phone)) return;
      localStorage.setItem('lead_submitted', '1');
      form.innerHTML = '<p style="color:#22c55e;font-weight:700;padding:1rem 0">Cảm ơn! Tư vấn viên sẽ gọi bạn sớm.</p>';
      try {
        await fetch('/api/lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            step: 'exit_intent', phone, email: 'exit-intent@truongvietanh.com',
            source: 'exit-intent', funnel_code: 'exit-intent',
            page: location.href, submitted_at: new Date().toISOString(),
          }),
          keepalive: true,
        });
      } catch {}
      setTimeout(() => { popup.hidden = true; }, 3000);
    });
  }

  // ========= COOKIE CONSENT =========
  function initCookieConsent() {
    const banner = $('#cookie-consent');
    if (!banner) return;
    if (localStorage.getItem('cookie-consent')) return;
    banner.hidden = false;
    $('#cookie-accept')?.addEventListener('click', () => {
      localStorage.setItem('cookie-consent', 'accepted'); banner.hidden = true;
    });
    $('#cookie-decline')?.addEventListener('click', () => {
      localStorage.setItem('cookie-consent', 'declined'); banner.hidden = true;
    });
  }

  // ========= BACK TO TOP =========
  function initBackToTop() {
    const btn = $('#back-to-top');
    if (!btn) return;
    window.addEventListener('scroll', () => {
      btn.hidden = window.scrollY < 300;
    }, { passive: true });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // ========= DARK MODE =========
  function initDarkMode() {
    const btn = $('#dark-toggle');
    const saved = localStorage.getItem('dark-mode');
    if (saved === 'dark' || (saved == null && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    }
    btn?.addEventListener('click', () => {
      const isDark = document.documentElement.classList.toggle('dark');
      localStorage.setItem('dark-mode', isDark ? 'dark' : 'light');
    });
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
    $$('section, article').forEach((el) => io.observe(el));
  }

  // ========= FAQ =========
  function initFaq() {
    $$('.b-faq-item, .gi-faq-item').forEach((el) => {
      el.addEventListener('toggle', () => {
        if (el.open) {
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({ event: 'faq_open', question: el.querySelector('summary')?.textContent });
        }
      });
    });
  }

  // ========= STAT COUNTERS =========
  function initCounters() {
    if (!('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const el = e.target;
          const target = Number(el.dataset.animateCounter);
          if (!Number.isFinite(target)) return;
          let cur = 0;
          const step = target / 30;
          const t = setInterval(() => {
            cur += step;
            if (cur >= target) { cur = target; clearInterval(t); }
            const original = el.textContent || '';
            // Preserve suffix (+, %, k, etc.)
            const suffix = original.replace(/[\d.,]/g, '');
            el.textContent = Math.round(cur).toLocaleString('vi-VN') + suffix;
          }, 30);
          io.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    $$('[data-animate-counter]').forEach((el) => io.observe(el));
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

  // ========= MOBILE CTA =========
  function initMobileCta() {
    const bar = $('.mobile-sticky-cta');
    if (!bar) return;
    $$('.msc-call, .msc-form', bar).forEach((a) => {
      a.addEventListener('click', () => {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({ event: 'click_mobile_cta', action: a.classList.contains('msc-call') ? 'call' : 'form' });
      });
    });
    // Hide on scroll down, show on scroll up
    let lastY = 0;
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (y > lastY + 10 && y > 200) bar.classList.add('b-hidden');
      else if (y < lastY - 10) bar.classList.remove('b-hidden');
      lastY = y;
    }, { passive: true });
  }

  // ========= INIT =========
  function init() {
    initAnnouncement();
    initExitPopup();
    initCookieConsent();
    initBackToTop();
    initDarkMode();
    initScrollReveal();
    initFaq();
    initCounters();
    initCountdown();
    initMobileCta();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
