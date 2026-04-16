/**
 * dynamic-form.js — client-side handler for all DynamicForm instances.
 *
 * Binds to every [data-form-id] wrapper on the page. Reads config from
 * window.__TVA_FORMS__ which DynamicForm.astro pushes to.
 *
 * Handles:
 *  - Step navigation (1 → 2 → 3)
 *  - Field validation (email RFC 5322 approx, VN phone 10-11 digits)
 *  - UTM capture from URL + first-touch cookie
 *  - Partial email capture on step 1 (fires /api/lead with step=partial)
 *  - Full submit on final step → /api/lead → redirect or inline success
 *  - GTM dataLayer events: lead_step_complete, generate_lead
 *  - Lead score weight + form metadata embedded in payload
 */
(function () {
  'use strict';

  const LEAD_API = '/api/lead';
  const FIRST_TOUCH_COOKIE = 'tva_first_touch';

  // ========= UTILS =========
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const VN_PHONE_RE = /^0[0-9]{9,10}$/;
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function validateField(input) {
    const type = input.dataset.validate || input.type;
    const v = input.value.trim();
    if (input.required && !v) return 'Vui lòng điền thông tin';
    if (!v) return null;
    if (type === 'email' && !EMAIL_RE.test(v)) return 'Email không hợp lệ';
    if (type === 'vn_phone' && !VN_PHONE_RE.test(v.replace(/\s/g, ''))) return 'SĐT phải có 10-11 số, bắt đầu bằng 0';
    return null;
  }

  function showError(input, msg) {
    input.classList.add('df-error');
    let err = input.parentNode.querySelector('.df-error-msg');
    if (!err) {
      err = document.createElement('p');
      err.className = 'df-error-msg';
      input.parentNode.appendChild(err);
    }
    err.textContent = msg;
  }

  function clearError(input) {
    input.classList.remove('df-error');
    const err = input.parentNode.querySelector('.df-error-msg');
    if (err) err.remove();
  }

  // ========= UTM + FIRST-TOUCH =========
  function readCookie(name) {
    const m = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return m ? decodeURIComponent(m[2]) : null;
  }

  function writeCookie(name, value, days = 90) {
    const d = new Date(Date.now() + days * 86400000);
    document.cookie = `${name}=${encodeURIComponent(value)};expires=${d.toUTCString()};path=/;samesite=lax`;
  }

  function captureUtm() {
    const params = new URLSearchParams(location.search);
    const keys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'fbclid', 'gclid', 'ttclid'];
    const fresh = {};
    for (const k of keys) { if (params.has(k)) fresh[k] = params.get(k); }
    if (Object.keys(fresh).length > 0) writeCookie(FIRST_TOUCH_COOKIE, JSON.stringify(fresh));
    const stored = readCookie(FIRST_TOUCH_COOKIE);
    return stored ? JSON.parse(stored) : {};
  }

  function buildBasePayload(form, config) {
    const fd = new FormData(form);
    const payload = Object.fromEntries(fd.entries());
    delete payload._hp;  // honeypot
    const utm = captureUtm();
    return {
      ...payload,
      ...utm,
      form_id: config.formId,
      funnel_code: config.funnelCode,
      page: location.href,
      referrer: document.referrer,
      user_agent: navigator.userAgent.slice(0, 200),
      submitted_at: new Date().toISOString(),
    };
  }

  // ========= STEP NAVIGATION =========
  function getVisibleStep(wrapper) {
    return wrapper.querySelector('.df-step:not([hidden])');
  }

  function goToStep(wrapper, target) {
    $$('.df-step', wrapper).forEach((s) => {
      s.hidden = s.dataset.step !== String(target);
    });
    // Focus first input of new step
    const input = wrapper.querySelector(`.df-step[data-step="${target}"] input, .df-step[data-step="${target}"] select`);
    if (input) setTimeout(() => input.focus(), 50);
  }

  async function handleNext(wrapper, config) {
    const cur = getVisibleStep(wrapper);
    if (!cur) return;

    // Validate current step's inputs
    const inputs = $$('input, select, textarea', cur);
    let valid = true;
    for (const inp of inputs) {
      if (inp.type === 'hidden') continue;
      clearError(inp);
      const msg = validateField(inp);
      if (msg) { showError(inp, msg); valid = false; }
    }
    if (!valid) return;

    // Step 1 → fire partial capture (email first)
    const stepNum = Number(cur.dataset.step);
    if (stepNum === 1 && config.variant === 'two_step_email_first') {
      const email = $('input[type=email]', cur)?.value;
      if (email) {
        firePartialCapture({ email, form_id: config.formId, funnel_code: config.funnelCode });
      }
    }

    pushDataLayer('lead_step_complete', {
      form_id: config.formId,
      funnel_code: config.funnelCode,
      step: stepNum,
    });

    goToStep(wrapper, stepNum + 1);
  }

  function handlePrev(wrapper) {
    const cur = getVisibleStep(wrapper);
    if (!cur) return;
    const stepNum = Number(cur.dataset.step);
    if (stepNum > 1) goToStep(wrapper, stepNum - 1);
  }

  // ========= PARTIAL CAPTURE =========
  function firePartialCapture(data) {
    const payload = { step: 'partial_capture', ...data, page: location.href, submitted_at: new Date().toISOString() };
    // Fire-and-forget — don't block UI
    fetch(LEAD_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {});
  }

  // ========= FINAL SUBMIT =========
  async function handleSubmit(e, wrapper, config) {
    e.preventDefault();
    const form = wrapper.querySelector('form');
    const cur = getVisibleStep(wrapper);
    if (!cur) return;

    // Validate visible step
    const inputs = $$('input, select, textarea', cur);
    let valid = true;
    for (const inp of inputs) {
      if (inp.type === 'hidden') continue;
      clearError(inp);
      const msg = validateField(inp);
      if (msg) { showError(inp, msg); valid = false; }
    }
    if (!valid) return;

    const payload = buildBasePayload(form, config);
    payload.step = 'full_submit';

    // Turnstile token
    if (config.turnstile && window.turnstile) {
      const tsEl = wrapper.querySelector('.cf-turnstile');
      if (tsEl) payload.turnstile_token = window.turnstile.getResponse(tsEl);
    }

    const btn = form.querySelector('[type=submit]');
    if (btn) { btn.disabled = true; btn.dataset.original = btn.textContent; btn.textContent = 'Đang gửi…'; }

    try {
      const r = await fetch(LEAD_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const j = await r.json().catch(() => null);

      if (!r.ok) {
        console.error('[dynamic-form] Submit failed:', r.status, j);
        if (btn) { btn.disabled = false; btn.textContent = btn.dataset.original || 'Thử lại'; }
        showError(form, 'Có lỗi xảy ra. Vui lòng thử lại hoặc gọi 0916 961 409.');
        return;
      }

      pushDataLayer('generate_lead', {
        form_id: config.formId,
        funnel_code: config.funnelCode,
        lead_score: j?.results?.lead_score,
        is_hot_lead: j?.results?.is_hot_lead,
      });

      // Success
      localStorage.setItem('lead_submitted', '1');

      if (config.successMode === 'redirect' && config.thankYouPage) {
        const name = encodeURIComponent(payload.full_name || '');
        window.location.href = `${config.thankYouPage}?name=${name}&funnel=${encodeURIComponent(config.funnelCode)}`;
      } else {
        // Inline success
        form.style.display = 'none';
        const success = wrapper.querySelector('.df-success');
        if (success) success.hidden = false;
      }
    } catch (err) {
      console.error('[dynamic-form] Network error:', err);
      if (btn) { btn.disabled = false; btn.textContent = btn.dataset.original || 'Thử lại'; }
    }
  }

  function pushDataLayer(event, payload) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event, ...payload });
  }

  // ========= BINDINGS =========
  function bindForm(wrapper, config) {
    const form = wrapper.querySelector('form');
    if (!form) return;

    // Step navigation buttons
    wrapper.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-action]');
      if (!btn) return;
      if (btn.dataset.action === 'next-step') handleNext(wrapper, config);
      if (btn.dataset.action === 'prev-step') handlePrev(wrapper);
    });

    // Clear error on type
    form.addEventListener('input', (e) => { if (e.target.matches('input, select, textarea')) clearError(e.target); });

    // Submit
    form.addEventListener('submit', (e) => handleSubmit(e, wrapper, config));
  }

  // ========= INIT =========
  function init() {
    const configs = window.__TVA_FORMS__ || [];
    for (const config of configs) {
      const wrappers = $$(`[data-form-id="${config.formId}"]`);
      for (const w of wrappers) bindForm(w, config);
    }
    captureUtm();  // ensure first-touch cookie set on page load
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
